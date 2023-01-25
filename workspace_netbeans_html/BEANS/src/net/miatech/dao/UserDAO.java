/*
 * UserDAO.java
 *
 */
package net.miatech.dao;

import com.ibm.as400.access.AS400;
import com.ibm.as400.access.AS400DataType;
import com.ibm.as400.access.AS400Message;
import com.ibm.as400.access.AS400SecurityException;
import com.ibm.as400.access.AS400Structure;
import com.ibm.as400.access.ProgramCall;
import com.ibm.as400.access.ProgramParameter;
import java.beans.PropertyVetoException;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.S0007INF053Filter;
import net.miatech.beans.S0008INF020Filter;
import net.miatech.beans.S0010INF020Filter;
import net.miatech.beans.implement.IServerSession;
import net.miatech.dao.implement.IBaseDAO;
import net.miatech.dao.implement.IUserDAO;
import net.miatech.praxis.A2149;
import net.miatech.praxis.INF001;
import net.miatech.praxis.INF020;
import net.miatech.provider.ConnectionIBMDB2Server;
import net.miatech.utils.AS400Map;
import net.miatech.utils.Application;
import net.miatech.utils.Functions;
import net.miatech.utils.implement.IApp;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 *
 * @author rmayta
 */
public class UserDAO implements IBaseDAO, IUserDAO {

    //private static final Logger logError = Logger.getLogger("errorLog");
    private IServerSession session;
    private IApp app;
    private Application application;
    private static final Logger logError = Logger.getLogger("errorLog");

    /**
     * Creates a new instance of UserDAO
     */
    public UserDAO() {
    }

    public UserDAO(IServerSession ss) {
        session = ss;
    }

    @Override
    public void setSession(IServerSession ss) {
        session = ss;
    }

    @Override
    public void setApp(Application application) {
        this.application = application;
    }

    public void setIApp(IApp app) {
        this.app = app;
    }

    @Override
    //HashMap<Boolean,String> = HashMap<'resultado de autenticacion','mensaje adicional'>
    public Object[] autenthicateUser(INF001 user) {
        boolean bValidacion = false;
        String strError = "";
        Object[] result = new Object[2];

        long diasExpiracion = -1, diasMinimos = 0;
        AS400 system = null;
        try {
            system = new AS400(session.getProperty("DB_SERVER_" + session.getProperty("DB_SERVER_DEFAULT_CALF") + "_" + session.getProperty("DB_SERVER_DEFAULT_TYPE") + "_HOST"), user.USR, user.TOKEN);
            system.setGuiAvailable(false);
            bValidacion = system.authenticate(user.USR, user.TOKEN);

            if (bValidacion) {
                system.connectService(AS400.AUTHENTICATION_SCHEME_PROFILE_TOKEN);
                GregorianCalendar fechaExpiracion = system.getPasswordExpirationDate();//profile.getSystem().getPasswordExpirationDate();
                if (fechaExpiracion != null) {
                    GregorianCalendar fechaSistema = system.getSignonDate();

                    diasExpiracion = fechaExpiracion.getTime().getTime() - fechaSistema.getTime().getTime();

                    diasExpiracion = diasExpiracion / (1000 * 60 * 60 * 24);

                    diasMinimos = Integer.parseInt(session.getProperty("DB_SERVER_MINIMU_DAYS_NUMBER"));
                    if (diasExpiracion - 7 < diasMinimos && diasExpiracion > 7) {
                        strError = "Your password will expire in " + String.valueOf(diasExpiracion) + " days.";
                    }
                }
            }
        } //        catch (InterruptedException ex) {
        //            bValidacion = false;
        //            strError = ex.getMessage();
        //            
        //        } 
        //        catch (PropertyVetoException ex) {
        //            strError = ex.getMessage();
        //            bValidacion = false;
        //
        //        }         
        catch (AS400SecurityException ex) {
            strError = ex.getMessage();
            if(strError.toLowerCase().indexOf("not known") > -1 ) strError = "Username and password are incorrect.";
            
            int ret = ex.getReturnCode();
            System.out.println(ret);
            
            bValidacion = false;

        } catch (IOException ex) {
            strError = ex.getMessage();
            bValidacion = false;
        } catch (PropertyVetoException ex) {
            java.util.logging.Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            result[0] = bValidacion;
            result[1] = strError;
            if (system != null) {
                system.disconnectAllServices();
            }
        }

        return result;
    }

    @Override
    public Boolean autentificateUser(INF001 user) {
        Boolean validateUser = false;
        AS400 system = null;
        try {
            system = new AS400(session.getProperty("DB_SERVER_" + session.getProperty("DB_SERVER_DEFAULT_CALF") + "_" + session.getProperty("DB_SERVER_DEFAULT_TYPE") + "_HOST"));
            system.setGuiAvailable(false);
            system.authenticate(user.USR, user.TOKEN);
            validateUser = true;
        } catch (AS400SecurityException ase) {
            validateUser = false;

        } catch (IOException ase) {
            validateUser = false;
        } catch (PropertyVetoException ex) {
            java.util.logging.Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (system != null) {
                system.disconnectAllServices();
            }
        }

        return validateUser;
    }

    @Override
    public List<S0008INF020Filter> validateAirlinesAllowed(S0008INF020Filter filter) throws SQLException, Exception {
        List<S0008INF020Filter> listaAerolineas = new ArrayList<S0008INF020Filter>(0);
        S0008INF020Filter aerolinea;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.S0008INF020(?,?)}";
        ConnectionIBMDB2Server tmpCnx;
        tmpCnx = application.getConnection(filter.fileINF001.USR, filter.fileINF001.TOKEN);
        tmpCnx.open();
        try {
            cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.fileINF001.USR);
            cstmt01.setString(2, filter.APP);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                aerolinea = new S0008INF020Filter();
                aerolinea.fileINF020.CCUST = rs01.getString("CCUST");
                aerolinea.fileINF020.USR = rs01.getString("USR");
                aerolinea.fileINF020.APLICA = rs01.getString("APLICA");
                aerolinea.fileINF020.MODUL = rs01.getString("MODUL");
                aerolinea.fileINF020.MTYPE = rs01.getInt("MTYPE");

                aerolinea.fileA005.A005KEY2 = rs01.getString("A005KEY2");

                listaAerolineas.add(aerolinea);
            }
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }

        return listaAerolineas;
    }

    @Override
    public INF001 obtainUserInfo(INF001 filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL PRAXIS.S0009INF001()}";
        String SQLCLL01 = "{CALL PRAXIS.S0010INF001(?)}";

        ConnectionIBMDB2Server tmpCnx;
        tmpCnx = application.getConnection(filter.USR, filter.TOKEN);
        tmpCnx.open();
        try {
            cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.USR);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            if (rs01.next()) {
                filter.USR = rs01.getString("USR");
                filter.COPER = rs01.getString("COPER");
                filter.RMBDT = rs01.getString("RMBDT");
                if (filter.RMBDT.equals("Y")) {
                    filter.TOKEN = rs01.getString("TOKEN");
                }
                filter.CITY = rs01.getString("CITY");
                filter.COUNTRYG = rs01.getString("COUNTRYG");
                filter.STAT = rs01.getString("STAT");
                filter.USCR = rs01.getString("USCR");
                filter.DTCR = rs01.getString("DTCR");
                filter.USUP = rs01.getString("USUP");
                filter.DTUP = rs01.getString("DTUP");
            }
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
        return filter;
    }

    @Override
    public S0010INF020Filter obtainCustomerInfo(INF001 user, INF020 filter) throws SQLException, Exception {
        S0010INF020Filter file = new S0010INF020Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.S0010INF020(?,?)}";
        ConnectionIBMDB2Server tmpCnx;
        tmpCnx = application.getConnection(user.USR, user.TOKEN);
        tmpCnx.open();
        try {
            cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.CCUST);
            cstmt01.setString(2, filter.APLICA);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            if (rs01.next()) {
                file.fileINF020.CCUST = rs01.getString("CCUST");
                file.fileINF020.USR = rs01.getString("USR");
                file.fileINF020.APLICA = rs01.getString("APLICA");
                file.fileINF020.MODUL = rs01.getString("MODUL");
                file.fileINF020.MTYPE = rs01.getInt("MTYPE");
                file.fileINF020.SIATA = rs01.getString("SIATA");
                file.fileINF020.USCR = rs01.getString("USCR");
                file.fileINF020.DTCR = rs01.getString("DTCR");
                file.fileINF020.USUP = rs01.getString("USUP");
                file.fileINF020.DTUP = rs01.getString("DTUP");
                file.fileINF020.STAT = rs01.getString("STAT");
                file.fileA005.A005KEY1 = rs01.getString("A005KEY1");
                file.fileA005.A005KEY2 = rs01.getString("A005KEY2");
            }
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
        return file;
    }

    @Override
    public List<Map<?, ?>> obtainMenu(String appCode) throws SQLException, Exception {
        return obtainMenu(appCode, "0");
    }
    
    @Override
    public List<Map<?, ?>> obtainMenu(String appCode, String mnuType) throws SQLException, Exception {
        
        System.out.println("DAO : mnuType = " + mnuType);
        List<Map<?, ?>> lstMenu = new ArrayList<Map<?, ?>>(0);

        Map<String, Object> mapMenu;
        List<Map<String, ?>> lstMenuMenues;

        Map<String, Object> mapSubMenu00, mapSubMenu01, mapSubMenu02, mapSubMenu03;
        List<Map<String, ?>> lstSubMenu00Menues, lstSubMenu01Menues, lstSubMenu02Menues, lstSubMenu03Menues;

        //String SQLCLL01 = "{CALL PRAXIS.S0004INF021(?,?,?,?)}";
        //String SQLCLL01 = "{CALL PRAXIS.SPPROMENU(?,?,?,?,?,?,?)}";

        CallableStatement cstmt01 = null;
        String strXML;

        Node node;
        Element eleMAINS;
        Element eleMENU00, eleSMENU01, eleSMENU02, eleSMENU03;
        Element eleTRANSA00, eleTRANSA01, eleTRANSA02, eleTRANSA03;

        NodeList lstMAINS, lstMENUES;
        NodeList lstMENU00, lstSMENU01, lstSMENU02, lstSMENU03;
        NodeList lstTRANSA00, lstTRANSA01, lstTRANSA02, lstTRANSA03;
        strXML = "";

        //Connection cnx = null;
        session.getCNXIBMDB2().openSystem();
        ProgramCall program = new ProgramCall(session.getCNXIBMDB2().getSystem());

        try {
            /*cnx = session.getCNXIBMDB2().getIBMDB2Connection();
             cstmt01 = cnx.prepareCall(SQLCLL01);

             cstmt01.registerOutParameter(2, Types.CHAR);
             cstmt01.registerOutParameter(3, Types.CHAR);
             cstmt01.registerOutParameter(4, Types.CHAR);
             cstmt01.registerOutParameter(5, Types.CHAR);
             cstmt01.registerOutParameter(6, Types.CHAR);
             cstmt01.registerOutParameter(7, Types.CHAR);
             cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST + appCode + Functions.fillString(session.getUserView().getUserInfo().USR, 10));
             cstmt01.execute();
             strXML = cstmt01.getString(2);
             strXML += cstmt01.getString(3);
             strXML += cstmt01.getString(4);
             strXML += cstmt01.getString(5);
             strXML += cstmt01.getString(6);
             strXML += cstmt01.getString(7);
             strXML = strXML.replaceAll("  ", "").replaceAll(" \"", "\"").replaceAll("> ", ">");*/

            app.callCL3050(session.getCNXIBMDB2().getSystem(), session.getMainLibrary(), session.getUserView().getCustomerInfo().CCUST);
            String programName = "/QSYS.LIB/" + session.getMainLibrary() + ".LIB/PROMENU.PGM";
            //<editor-fold defaultstate="collapsed" desc="{...} Mapping">
            AS400Map mapping = new AS400Map();

            AS400DataType[] PARAM = new AS400DataType[1];
            class IDX_INPUT_DATA {
                static final int LK_CCUST = 0;
                static final int LK_APP = 1;
                static final int LK_USR = 2;
                static final int LK_MTYPE = 3;
            }
            AS400DataType[] INPUT_DATA = new AS400DataType[4];
            INPUT_DATA[IDX_INPUT_DATA.LK_CCUST] = mapping.Char(3);
            INPUT_DATA[IDX_INPUT_DATA.LK_APP] = mapping.Char(2);
            INPUT_DATA[IDX_INPUT_DATA.LK_USR] = mapping.Char(10);
            INPUT_DATA[IDX_INPUT_DATA.LK_MTYPE] = mapping.Numeric(1, 0);
            PARAM[0] = mapping.Char(mapping.GetDimension(INPUT_DATA));

            AS400DataType[] WS_TABLE = new AS400DataType[1];
            class IDX_WS_TEXT {

                static final int LS_XML = 0;
            }
            AS400DataType[] WS_TEXT = new AS400DataType[1];
            WS_TEXT[IDX_WS_TEXT.LS_XML] = mapping.Char(385000);
            WS_TABLE[0] = mapping.Char(mapping.GetDimension(WS_TEXT));

            AS400Structure structure01 = new AS400Structure(WS_TABLE);
            //</editor-fold>
            ProgramParameter[] parameterList = new ProgramParameter[2];
            parameterList[0] = new ProgramParameter(PARAM[0].toBytes(session.getUserView().getCustomerInfo().CCUST + appCode + Functions.fillString(session.getUserView().getUserInfo().USR, 10) + mnuType));
            parameterList[1] = new ProgramParameter(mapping.GetDimension(WS_TEXT));

            program.setProgram(programName, parameterList);

            if (program.run() != true) {
                System.out.println("Program failed!");
                AS400Message[] messagelist = program.getMessageList();
                for (int i = 0; i < messagelist.length; ++i) {
                    System.out.println(messagelist[i]);
                }
            } else {
                byte[] receiverVar = parameterList[1].getOutputData();
                Object[] N01_WS_TEXT = (Object[]) structure01.toObject(receiverVar, 0);
                strXML = mapping.getString(N01_WS_TEXT[IDX_WS_TEXT.LS_XML]);
                strXML = strXML.replaceAll("  ", "").replaceAll(" \"", "\"").replaceAll("> ", ">");

                DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
                DocumentBuilder db = dbf.newDocumentBuilder();
                Document document = db.parse(new ByteArrayInputStream(strXML.getBytes("UTF-8")));
                document.getDocumentElement().normalize();
                String strNavigation = "";
                String strTitle = "";
                lstMAINS = document.getChildNodes();
                for (int i2 = 0; i2 < lstMAINS.getLength(); i2++) {
                    node = lstMAINS.item(i2);
                    if (node.getNodeType() == Node.ELEMENT_NODE && node.getNodeName().equals("MAIN")) {
                        eleMAINS = (Element) node;
                        lstMENU00 = eleMAINS.getChildNodes();
                        for (int i = 0; i < lstMENU00.getLength(); i++) {
                            node = lstMENU00.item(i);
                            if (node.getNodeType() == Node.ELEMENT_NODE && node.getNodeName().equals("MENU")) {
                                eleMENU00 = (Element) node;

                                lstMenuMenues = new ArrayList<Map<String, ?>>(0);

                                mapMenu = new HashMap<String, Object>(0);
                                mapMenu.put("TYPE", "MENU");
                                mapMenu.put("CODE", eleMENU00.getAttribute("CODE").substring(0, 2));
                                mapMenu.put("TITLE", eleMENU00.getAttribute("TITLE"));
                                mapMenu.put("children", lstMenuMenues);
                                lstMenu.add(mapMenu);

                                lstSMENU01 = eleMENU00.getChildNodes();
                                //<editor-fold defaultstate="collapsed" desc="{...} SMENU_01">
                                for (int j = 0; j < lstSMENU01.getLength(); j++) {
                                    node = lstSMENU01.item(j);
                                    if (node.getNodeType() == Node.ELEMENT_NODE && node.getNodeName().equals("SMENU")) {
                                        eleSMENU01 = (Element) node;

                                        lstSubMenu00Menues = new ArrayList<Map<String, ?>>(0);

                                        mapSubMenu00 = new HashMap<String, Object>(0);
                                        mapSubMenu00.put("CODE", eleSMENU01.getAttribute("CODE")); //100
                                        mapSubMenu00.put("children", lstSubMenu00Menues);

                                        lstMenuMenues.add(mapSubMenu00);

                                        lstSubMenu01Menues = new ArrayList<Map<String, ?>>(0);

                                        mapSubMenu01 = new HashMap<String, Object>(0);
                                        mapSubMenu01.put("TYPE", "SMENU");
                                        mapSubMenu01.put("CODE", eleSMENU01.getAttribute("CODE"));
                                        mapSubMenu01.put("TITLE", eleSMENU01.getAttribute("TITLE"));
                                        mapSubMenu01.put("children", lstSubMenu01Menues);
                                        lstSubMenu00Menues.add(mapSubMenu01);

                                        lstSMENU02 = eleSMENU01.getChildNodes();
                                        //<editor-fold defaultstate="collapsed" desc="{...} SMENU_02">
                                        for (int k = 0; k < lstSMENU02.getLength(); k++) {
                                            node = lstSMENU02.item(k);
                                            if (node.getNodeType() == Node.ELEMENT_NODE && node.getNodeName().equals("SMENU")) {
                                                eleSMENU02 = (Element) node;

                                                lstSubMenu02Menues = new ArrayList<Map<String, ?>>(0);

                                                mapSubMenu02 = new HashMap<String, Object>(0);
                                                mapSubMenu02.put("TYPE", "SMENU");
                                                mapSubMenu02.put("CODE", eleSMENU02.getAttribute("CODE"));
                                                mapSubMenu02.put("TITLE", eleSMENU02.getAttribute("TITLE"));
                                                mapSubMenu02.put("children", lstSubMenu02Menues);
                                                lstSubMenu01Menues.add(mapSubMenu02);

                                                lstSMENU03 = eleSMENU02.getChildNodes();
                                                //<editor-fold defaultstate="collapsed" desc="{...} SMENU_03">
                                                for (int l = 0; l < lstSMENU03.getLength(); l++) {
                                                    node = lstSMENU03.item(l);
                                                    if (node.getNodeType() == Node.ELEMENT_NODE && node.getNodeName().equals("SMENU")) {
                                                        eleSMENU03 = (Element) node;

                                                        lstSubMenu03Menues = new ArrayList<Map<String, ?>>(0);

                                                        mapSubMenu03 = new HashMap<String, Object>(0);
                                                        mapSubMenu03.put("TYPE", "SMENU");
                                                        mapSubMenu03.put("CODE", eleSMENU03.getAttribute("CODE"));
                                                        mapSubMenu03.put("TITLE", eleSMENU03.getAttribute("TITLE"));
                                                        mapSubMenu03.put("children", lstSubMenu03Menues);
                                                        lstSubMenu02Menues.add(mapSubMenu03);

                                                        lstTRANSA03 = eleSMENU03.getElementsByTagName("TRANSA");
                                                        //<editor-fold defaultstate="collapsed" desc="{...} TRANSA_03">
                                                        for (int m = 0; m < lstTRANSA03.getLength(); m++) {
                                                            node = lstTRANSA03.item(m);
                                                            if (node.getNodeType() == Node.ELEMENT_NODE) {
                                                                eleTRANSA03 = (Element) node;

                                                                mapSubMenu03 = new HashMap<String, Object>(0);
                                                                mapSubMenu03.put("TYPE", "TRANSA");
                                                                mapSubMenu03.put("CODE", eleTRANSA03.getAttribute("CODE"));
                                                                mapSubMenu03.put("PROG", eleTRANSA03.getAttribute("PROG"));
                                                                mapSubMenu03.put("TITLE", eleTRANSA03.getAttribute("TITLE"));
                                                                /* BEGIN NAVIGATION */
                                                                strNavigation = eleMENU00.getAttribute("TITLE") + " > "
                                                                        + eleSMENU01.getAttribute("TITLE") + " > "
                                                                        + eleSMENU02.getAttribute("TITLE") + " > "
                                                                        + eleTRANSA03.getAttribute("TITLE");
                                                                strTitle = String.valueOf(eleSMENU01.getAttribute("TITLE")).toUpperCase();
                                                                strTitle = strTitle.replace(String.valueOf(eleMENU00.getAttribute("TITLE")).toUpperCase(), "");
                                                                strTitle = String.valueOf(eleMENU00.getAttribute("TITLE")).toUpperCase() + " : " + strTitle;
                                                                mapSubMenu03.put("NAVIGATION", strNavigation);
                                                                mapSubMenu03.put("MODULE", strTitle);
                                                                /* END NAVIGATION */
                                                                lstSubMenu03Menues.add(mapSubMenu03);
                                                            }
                                                        }
                                                        //</editor-fold>
                                                    }
                                                }
                                                //</editor-fold>

                                                lstTRANSA02 = eleSMENU02.getChildNodes();
                                                //<editor-fold defaultstate="collapsed" desc="{...} TRANSA_02">
                                                for (int l = 0; l < lstTRANSA02.getLength(); l++) {
                                                    node = lstTRANSA02.item(l);
                                                    if (node.getNodeType() == Node.ELEMENT_NODE && node.getNodeName().equals("TRANSA")) {
                                                        eleTRANSA02 = (Element) node;

                                                        mapSubMenu02 = new HashMap<String, Object>(0);
                                                        mapSubMenu02.put("TYPE", "TRANSA");
                                                        mapSubMenu02.put("CODE", eleTRANSA02.getAttribute("CODE"));
                                                        mapSubMenu02.put("PROG", eleTRANSA02.getAttribute("PROG"));
                                                        mapSubMenu02.put("TITLE", eleTRANSA02.getAttribute("TITLE"));
                                                        /* BEGIN NAVIGATION */
                                                        strNavigation = eleMENU00.getAttribute("TITLE") + " > "
                                                                + eleSMENU01.getAttribute("TITLE") + " > "
                                                                + eleSMENU02.getAttribute("TITLE") + " > "
                                                                + eleTRANSA02.getAttribute("TITLE");
                                                        mapSubMenu02.put("NAVIGATION", strNavigation);
                                                        strTitle = String.valueOf(eleSMENU01.getAttribute("TITLE")).toUpperCase();
                                                        strTitle = strTitle.replace(String.valueOf(eleMENU00.getAttribute("TITLE")).toUpperCase(), "");
                                                        strTitle = String.valueOf(eleMENU00.getAttribute("TITLE")).toUpperCase() + " : " + strTitle;
                                                        mapSubMenu02.put("MODULE", strTitle);
                                                        /* END NAVIGATION */
                                                        lstSubMenu02Menues.add(mapSubMenu02);
                                                    }
                                                }
                                                //</editor-fold>
                                            }
                                        }
                                        //</editor-fold>

                                        lstTRANSA01 = eleSMENU01.getChildNodes();
                                        //<editor-fold defaultstate="collapsed" desc="{...} TRANSA_01">
                                        for (int k = 0; k < lstTRANSA01.getLength(); k++) {
                                            node = lstTRANSA01.item(k);
                                            if (node.getNodeType() == Node.ELEMENT_NODE && node.getNodeName().equals("TRANSA")) {
                                                eleTRANSA01 = (Element) node;

                                                mapSubMenu01 = new HashMap<String, Object>(0);
                                                mapSubMenu01.put("TYPE", "TRANSA");
                                                mapSubMenu01.put("CODE", eleTRANSA01.getAttribute("CODE"));
                                                mapSubMenu01.put("PROG", eleTRANSA01.getAttribute("PROG"));
                                                mapSubMenu01.put("TITLE", eleTRANSA01.getAttribute("TITLE"));
                                                mapSubMenu01.put("ICON1", eleTRANSA01.getAttribute("ICON1"));
                                                mapSubMenu01.put("ICON2", eleTRANSA01.getAttribute("ICON2"));
                                                /* BEGIN NAVIGATION */
                                                strNavigation = eleMENU00.getAttribute("TITLE") + " > "
                                                        + eleSMENU01.getAttribute("TITLE") + " > "
                                                        + eleTRANSA01.getAttribute("TITLE");
                                                mapSubMenu01.put("NAVIGATION", strNavigation);
                                                strTitle = String.valueOf(eleSMENU01.getAttribute("TITLE")).toUpperCase();
                                                strTitle = strTitle.replace(String.valueOf(eleMENU00.getAttribute("TITLE")).toUpperCase(), "");
                                                strTitle = String.valueOf(eleMENU00.getAttribute("TITLE")).toUpperCase() + " : " + strTitle;
                                                mapSubMenu01.put("MODULE", strTitle);
                                                /* END NAVIGATION */

                                                lstSubMenu01Menues.add(mapSubMenu01);
                                            }
                                        }
                                        //</editor-fold>
                                    }
                                }
                                //</editor-fold>

                                lstTRANSA00 = eleMENU00.getChildNodes();
                                //<editor-fold defaultstate="collapsed" desc="{...} TRANSA_00">
                                for (int j = 0; j < lstTRANSA00.getLength(); j++) {
                                    node = lstTRANSA00.item(j);
                                    if (node.getNodeType() == Node.ELEMENT_NODE && node.getNodeName().equals("TRANSA")) {
                                        eleTRANSA00 = (Element) node;

                                        mapSubMenu00 = new HashMap<String, Object>(0);
                                        mapSubMenu00.put("TYPE", "TRANSA");
                                        mapSubMenu00.put("CODE", eleTRANSA00.getAttribute("CODE"));
                                        mapSubMenu00.put("PROG", eleTRANSA00.getAttribute("PROG"));
                                        mapSubMenu00.put("TITLE", eleTRANSA00.getAttribute("TITLE"));
                                        /* BEGIN NAVIGATION */
                                        strNavigation = eleMENU00.getAttribute("TITLE") + " > "
                                                + eleTRANSA00.getAttribute("TITLE");
                                        mapSubMenu00.put("NAVIGATION", strNavigation);
                                        mapSubMenu00.put("MODULE", eleMENU00.getAttribute("TITLE"));
                                        /* END NAVIGATION */
                                        lstMenuMenues.add(mapSubMenu00);
                                    }
                                }
                                //</editor-fold>
                                //System.out.println("Title : " + element.getElementsByTagName("").item(0).getChildNodes().item(0).getNodeValue());
                            }
                        }
                    }
                }

            }

        } catch(Exception e){e.printStackTrace();}finally {
            /*if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);*/
            session.getCNXIBMDB2().closeSystem();
        }
        return lstMenu;
    }

    @Override
    public boolean accessSecurity(S0007INF053Filter filter) throws SQLException, Exception {
        String SQLCLL01 = "{CALL PRAXIS.S0007INF053(?,?,?,?,?)}";
        CallableStatement cstmt01 = null;

        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.CHAR);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_APP);
            cstmt01.setString(3, filter.IN_PROG);
            cstmt01.setString(4, filter.IN_TPERM);
            cstmt01.execute();
            filter.OU_PERM = cstmt01.getString(5);
        } finally {
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return (filter.OU_PERM.equals("Y") ? true : false);
    }

    public PX041S01INF001Filter accessProgram(PX041S01INF001Filter filter) throws SQLException, Exception {
        PX041S01INF001Filter accessProgram = new PX041S01INF001Filter();
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXIS.PX041S02INF001(?,?,?,?)}";
        CallableStatement cstm01 = null;
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);

        //logError.error("Session Status:"+ getStatusSessionInfo());
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstm01 = cnx.prepareCall(SQLCLL01);
            cstm01.setString(1, "139");
            cstm01.setString(2, "PX");
            cstm01.setString(3, filter.VP_PROGRAM);
            cstm01.setString(4, filter.VP_USR);
            cstm01.execute();

            rst = cstm01.getResultSet();

            if (rst != null) {
                if (rst.next()) {
                    accessProgram.USR = rst.getString("USR");
                    accessProgram.NPROG = rst.getString("NPROG");
                    accessProgram.PERMA = rst.getString("PERMA");
                    accessProgram.PERMC = rst.getString("PERMC");
                    accessProgram.PERME = rst.getString("PERME");
                    accessProgram.PERML = rst.getString("PERML");
                    accessProgram.PERMM = rst.getString("PERMM");
                    accessProgram.PERMX = rst.getString("PERMX");
                } else {
                    accessProgram.USR = filter.VP_USR;
                    accessProgram.NPROG = filter.VP_PROGRAM;
                    accessProgram.PERMA = "N";
                    accessProgram.PERMC = "N";
                    accessProgram.PERME = "N";
                    accessProgram.PERML = "N";
                    accessProgram.PERMM = "N";
                    accessProgram.PERMX = "N";
                }
            } else {
                accessProgram.USR = filter.VP_USR;
                accessProgram.NPROG = filter.VP_PROGRAM;
                accessProgram.PERMA = "N";
                accessProgram.PERMC = "N";
                accessProgram.PERME = "N";
                accessProgram.PERML = "N";
                accessProgram.PERMM = "N";
                accessProgram.PERMX = "N";
            }
        } catch (Exception e) {
            e.printStackTrace(pw);
            sw.toString();
            //logError.error("accessProgram Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            if (cstm01 != null) {
                try {
                    cstm01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);

        }

        return accessProgram;
    }

    public List<PX041S01INF001Filter> accessUser(PX041S01INF001Filter filter) throws SQLException, Exception {
        List<PX041S01INF001Filter> lstAccessUser = new ArrayList<PX041S01INF001Filter>(0);
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXIS.PX041S03INF001(?,?,?)}";
        //String SQLCLL01 = "{CALL LIBSAP14.SQP02783(?,?,?)}";
        CallableStatement cstm01 = null;
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstm01 = cnx.prepareCall(SQLCLL01);
            cstm01.setString("VP_CCUST", "139");
            cstm01.setString("VP_APLICA", "PX");
            cstm01.setString("VP_USR", filter.VP_USR);
            cstm01.execute();

            rst = cstm01.getResultSet();

            if (rst != null) {
                while (rst.next()) {
                    PX041S01INF001Filter accessProgram = new PX041S01INF001Filter();
                    accessProgram.USR = rst.getString("USR");
                    accessProgram.NPROG = rst.getString("NPROG");
                    accessProgram.PERMA = rst.getString("PERMA");
                    accessProgram.PERMC = rst.getString("PERMC");
                    accessProgram.PERME = rst.getString("PERME");
                    accessProgram.PERML = rst.getString("PERML");
                    accessProgram.PERMM = rst.getString("PERMM");
                    accessProgram.PERMX = rst.getString("PERMX");

                    lstAccessUser.add(accessProgram);
                }
            }
        } catch (Exception e) {
            e.printStackTrace(pw);
            sw.toString();
            //logError.error("accessProgram Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            if (cstm01 != null) {
                try {
                    cstm01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstAccessUser;
    }

    private String getStatusSessionInfo() {
        String info = "";
        if (session == null) {
            info = "session is NULL";
        } else {
            if (session.getCNXIBMDB2() == null) {
                info = "session.getCNXIBMDB2() is NULL";
            } else {
                if (session.getCNXIBMDB2().getConnection() == null) {
                    info = "session.getCNXIBMDB2().getConnection() is NULL";
                } else {
                    info = "OK";
                }
            }
        }

        return info;
    }

    public List<A2149> obtainFavorite() throws SQLException {
        List<A2149> lstRtn = new ArrayList<A2149>(0);
        A2149 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Functions.msjConsola("PRAXIS", session.getUserView().getUserInfo().USR, "USERDAO : obtainFavorite");
        String SQLCLL01 = "{CALL " + "PRAXIS" + ".SQP00553(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, "2");
            cstmt01.setString(2, "");
            cstmt01.setString(3, "");
            cstmt01.setString(4, session.getUserView().getUserInfo().USR);
            cstmt01.setString(5, "");
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2149();
                objRtn.A2149IDMEN = rs01.getString("A2149IDMEN").trim();
                objRtn.A2149ICON = rs01.getString("A2149ICON").trim();
                objRtn.A2149MNUNM = rs01.getString("A2149MNUNM").trim();
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstRtn;
    }

    public void logAccessProgram(PX041S01INF001Filter filter) throws SQLException, Exception {
        PX041S01INF001Filter accessProgram = new PX041S01INF001Filter();
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXIS.PX041S01INFLOG(?,?,?,?)}";
        CallableStatement cstm01 = null;
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);

        //logError.error("Session Status:"+ getStatusSessionInfo());
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstm01 = cnx.prepareCall(SQLCLL01);
            cstm01.setString(1, "139");
            cstm01.setString(2, "PX");
            cstm01.setString(3, filter.NPROG);
            cstm01.setString(4, filter.USR);
            cstm01.execute();

            rst = cstm01.getResultSet();
        } catch (Exception e) {
            e.printStackTrace(pw);
            sw.toString();
            logError.error("logAccessProgram Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
            throw e;
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            if (cstm01 != null) {
                try {
                    cstm01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }

            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
    }   
    
    
    //Activar USUARIO (INF020 de "N" a "A")
    public void SQP02743(INF001 auth, INF020 usuario) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String user = auth.USR;
        String pass = auth.TOKEN;

        String SQLCLL01 = "{CALL PRAXIS.SQP02743(?,?,?)}"; //123
        ConnectionIBMDB2Server tmpCnx;
        tmpCnx = application.getConnection(user, pass);
        tmpCnx.open();

        try {
            cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, "139");
            cstmt01.setString(2, usuario.USR);
            cstmt01.setString(3, usuario.STAT);
            
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("SQP02743 Message: " + e.getMessage()); //ERROR
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // HABILITAR USUARIO AS400 SIN FECHA
    public void SQP02491(String usuario) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String user = session.getProperty("USR_HABILITAR_USUARIO");
        String pass = session.getProperty("PASS_HABILITAR_USUARIO");

        String SQLCLL01 = "{CALL PRAXIS.SQP02491(?)}";
        ConnectionIBMDB2Server tmpCnx;
        tmpCnx = application.getConnection(user, pass);
        tmpCnx.open();

        try {
            cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // HABILITAR USUARIO AS400 CON FECHA
    public void SQP03266(String usuario, String expiredDate) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String user = session.getProperty("USR_HABILITAR_USUARIO");
        String pass = session.getProperty("PASS_HABILITAR_USUARIO");
        String strDay = expiredDate.substring(6, 8); // YYMMAA
        String strMonth = expiredDate.substring(4, 6);
        String strYear = expiredDate.substring(2, 4);
        expiredDate = strDay + strMonth + strYear; // AAMMYYYY
        String SQLCLL01 = "{CALL PRAXIS.SQP03266(?,?)}";
        ConnectionIBMDB2Server tmpCnx;
        tmpCnx = application.getConnection(user, pass);
        tmpCnx.open();

        try {
            cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.setString(2, expiredDate);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // CAMBIAR PASSWORD USUARIO AS400
    public void SQP03218(String usuario, String clave) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String user = session.getProperty("USR_HABILITAR_USUARIO");
        String pass = session.getProperty("PASS_HABILITAR_USUARIO");

        String SQLCLL01 = "{CALL PRAXIS.SQP03218(?,?)}";
        ConnectionIBMDB2Server tmpCnx;
        tmpCnx = application.getConnection(user, pass);
        tmpCnx.open();

        try {
            cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.setString(2, clave);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // CREAR USUARIO AS400
    public void SQP03219(String usuario, String clave, String desc) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String user = session.getProperty("USR_HABILITAR_USUARIO");
        String pass = session.getProperty("PASS_HABILITAR_USUARIO");

        String SQLCLL01 = "{CALL PRAXIS.SQP03219(?,?,?)}";
        ConnectionIBMDB2Server tmpCnx;
        tmpCnx = application.getConnection(user, pass);
        tmpCnx.open();

        try {
            cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.setString(2, clave);
            cstmt01.setString(3, desc);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // VALIDAR EXISTE USUARIO AS400
    public boolean SQP03268(String usuario) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        boolean boValida = false;
        
        String user = session.getProperty("USR_HABILITAR_USUARIO");
        String pass = session.getProperty("PASS_HABILITAR_USUARIO");

        String SQLCLL01 = "{CALL PRAXIS.SQP03268(?)}";
        ConnectionIBMDB2Server tmpCnx;
        tmpCnx = application.getConnection(user, pass);
        tmpCnx.open();

        try {
            cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                boValida = true;
            }
            return boValida;
        } catch (Exception e) {
            logError.error("SQP03268 Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQP03268 Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
}
