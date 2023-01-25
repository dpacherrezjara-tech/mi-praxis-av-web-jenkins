/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.daoimpl;

import com.ibm.as400.access.AS400;
import com.ibm.as400.access.AS400SecurityException;
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
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.S0007INF053Filter;
import net.miatech.beans.S0008INF020Filter;
import net.miatech.beans.spring.S0010INF020Filter;
import net.miatech.beans.spring.ServerSession;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.persistence.dao.BaseDao;
import net.miatech.praxis.persistence.dao.UserDao;
import net.miatech.praxis.persistence.tracking.DaoException;
import net.miatech.praxis.spring.INF001;
import net.miatech.praxis.spring.INF020;
import net.miatech.praxis.spring.INF021;
import net.miatech.provider.ConnectionIBMDB2Server;
import net.miatech.utils.Functions;
import net.miatech.utils.spring.Application;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 *
 * @author rmayta
 */
public class UserDaoImpl implements BaseDao, UserDao {

    //private static final Logger logError = Logger.getLogger("errorLog");
    private IServerSession session;
    private Application app;
    //private static final Logger logError = Logger.getLogger(UserDaoImpl.class);

    /**
     * Creates a new instance of UserDAOimpl
     */
    public UserDaoImpl() {
    }

    public UserDaoImpl(ServerSession ss) {
        session = ss;
    }

    @Override
    public void setSession(IServerSession ss) {
        session = ss;
    }

    @Override
    public void setApp(Application application) {
        app = application;
    }

    @Override
    //HashMap<Boolean,String> = HashMap<'resultado de autenticacion','mensaje adicional'>
    public Object[] autenthicateUser(INF001 user) throws Exception {
        boolean bValidacion = false;
        String strError = "";
        Object[] result = new Object[2];

        long diasExpiracion = -1, diasMinimos = 0;
        AS400 system = null;
        try {
            system = new AS400(String.valueOf(session.getAttribute("DB_SERVER_" + String.valueOf(session.getAttribute("DB_SERVER_DEFAULT_CALF")) + "_" + String.valueOf(session.getAttribute("DB_SERVER_DEFAULT_TYPE")) + "_HOST")), user.USR, user.TOKEN);
            bValidacion = system.authenticate(user.USR, user.TOKEN);

            if (bValidacion) {
                system.connectService(AS400.AUTHENTICATION_SCHEME_PROFILE_TOKEN);
                GregorianCalendar fechaExpiracion = system.getPasswordExpirationDate();//profile.getSystem().getPasswordExpirationDate();
                if (fechaExpiracion != null) {
                    GregorianCalendar fechaSistema = system.getSignonDate();

                    diasExpiracion = fechaExpiracion.getTime().getTime() - fechaSistema.getTime().getTime();

                    diasExpiracion = diasExpiracion / (1000 * 60 * 60 * 24);

                    diasMinimos = Integer.parseInt(String.valueOf(session.getAttribute("DB_SERVER_MINIMU_DAYS_NUMBER")));
                    if (diasExpiracion - 7 < diasMinimos && diasExpiracion > 7) {
                        strError = "Your password will expire in " + String.valueOf(diasExpiracion) + " days.";
                    }
                }
            }
        } catch (AS400SecurityException e) {
            strError = e.getMessage();
            bValidacion = false;
            throw new DaoException(e, user);

        } catch (IOException ex) {
            strError = ex.getMessage();
            bValidacion = false;
            throw new DaoException(ex, user);

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
    public Boolean autentificateUser(INF001 user) throws Exception {
        Boolean validateUser = false;
        AS400 system = null;
        try {
            system = new AS400(String.valueOf(session.getAttribute("DB_SERVER_" + String.valueOf(session.getAttribute("DB_SERVER_DEFAULT_CALF")) + "_" + String.valueOf(session.getAttribute("DB_SERVER_DEFAULT_TYPE")) + "_HOST")));
            system.authenticate(user.USR, user.TOKEN);
            validateUser = true;
        } catch (AS400SecurityException ase) {
            validateUser = false;
        } catch (IOException ase) {
            validateUser = false;
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
        tmpCnx = app.getConnection(filter.fileINF001.USR, filter.fileINF001.TOKEN);
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
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
        tmpCnx = app.getConnection(filter.USR, filter.TOKEN);
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
        } catch (Exception e) {
            throw new DaoException(e, filter);
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
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
        tmpCnx = app.getConnection(user.USR, user.TOKEN);
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
                file.fileINF020.USCR = rs01.getString("USCR");
                file.fileINF020.DTCR = rs01.getString("DTCR");
                file.fileINF020.USUP = rs01.getString("USUP");
                file.fileINF020.DTUP = rs01.getString("DTUP");

                file.fileA005.A005KEY1 = rs01.getString("A005KEY1");
                file.fileA005.A005KEY2 = rs01.getString("A005KEY2");
            }
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                // try { cstmt01.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            }
            tmpCnx.close();
        }
        return file;
    }

    @Override
    public List<Map<?, ?>> obtainMenu(String appCode) throws SQLException, Exception {
        List<Map<?, ?>> lstMenu = new ArrayList<Map<?, ?>>(0);

        Map<String, Object> mapMenu;
        List<Map<String, ?>> lstMenuMenues;

        Map<String, Object> mapSubMenu00, mapSubMenu01, mapSubMenu02, mapSubMenu03;
        List<Map<String, ?>> lstSubMenu00Menues, lstSubMenu01Menues, lstSubMenu02Menues, lstSubMenu03Menues;

        //String SQLCLL01 = "{CALL PRAXIS.S0004INF021(?,?,?,?)}";
        String SQLCLL01 = "{CALL PRAXIS.SPPROMENU(?,?,?,?,?,?,?)}";

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

        Connection cnx = null;
        try {
            /*
             cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
             cstmt01.registerOutParameter(3, Types.CLOB);
             cstmt01.registerOutParameter(4, Types.CLOB);
             cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
             cstmt01.setString(2, appCode);
             cstmt01.execute();
             strXML = cstmt01.getString(3);
             strXML += cstmt01.getString(4);
             */
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
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
                                                            strTitle = String.valueOf(eleMENU00.getAttribute("TITLE")).toUpperCase() + " " + strTitle;
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
                                                    strTitle = String.valueOf(eleMENU00.getAttribute("TITLE")).toUpperCase() + " " + strTitle;
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
                                            /* BEGIN NAVIGATION */
                                            strNavigation = eleMENU00.getAttribute("TITLE") + " > "
                                                    + eleSMENU01.getAttribute("TITLE") + " > "
                                                    + eleTRANSA01.getAttribute("TITLE");
                                            mapSubMenu01.put("NAVIGATION", strNavigation);
                                            strTitle = String.valueOf(eleSMENU01.getAttribute("TITLE")).toUpperCase();
                                            strTitle = strTitle.replace(String.valueOf(eleMENU00.getAttribute("TITLE")).toUpperCase(), "");
                                            strTitle = String.valueOf(eleMENU00.getAttribute("TITLE")).toUpperCase() + " " + strTitle;
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
        } finally {
            if (cstmt01 != null) {
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return lstMenu;
    }

    @Override
    public List<INF021> getMenu(INF020 customerInfo, String appCode) throws SQLException, Exception {
        List<INF021> lstMenu = new ArrayList<INF021>(0);
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXIS.RFINF021(?,?,?)}";
        CallableStatement cstm01 = null;
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstm01 = cnx.prepareCall(SQLCLL01);
            cstm01.setString("IN_CCUST", customerInfo.CCUST);
            cstm01.setString("IN_APLICA", appCode);
            cstm01.setInt("IN_MTYPE", customerInfo.MTYPE);
            cstm01.execute();

            rst = cstm01.getResultSet();

            if (rst != null) {
                while (rst.next()) {
                    INF021 menu = new INF021();
                    menu.CCUST = rst.getString("CCUST");
                    menu.APLICA = rst.getString("APLICA").trim();
                    menu.MODUL = rst.getString("MODUL").trim();
                    menu.MTYPE = rst.getInt("MTYPE");
                    menu.MENU = rst.getString("MENU").trim();
                    menu.SMENU = rst.getString("SMENU").trim();
                    menu.TRANSA = rst.getString("TRANSA").trim();
                    menu.DESC1 = rst.getString("DESC1").trim();
                    menu.NPROG = rst.getString("NPROG").trim();
                    //menu.ICONO = rst.getString("ICONO").trim();
                    //menu.STAT = rst.getString("STAT").trim();
                    menu.DESC2 = rst.getString("DESC2").trim();

                    lstMenu.add(menu);
                }
            }
        } catch (Exception e) {
            e.printStackTrace(pw);
            sw.toString();
            //logError.error("accessProgram Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        } finally {
            if (rst != null) {
                //try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            }
            if (cstm01 != null) {
                //try { cstm01.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstMenu;
    }

    @Override
    public List<INF021> getMenuHTML(INF020 customerInfo, String appCode, String mtypeMenu) throws SQLException, Exception {
        List<INF021> lstMenu = new ArrayList<>(0);
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP01393_1(?,?,?,?)}";
       //String SQLCLL01 = "{CALL PRAXIS.SQP01393(?,?,?)}";
        CallableStatement cstm01 = null;
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        System.out.println(mtypeMenu);
        Connection cnx = null;
        if (mtypeMenu.equals(null) || mtypeMenu.equals("null")) {
            mtypeMenu = "1";
        }
        System.out.println("**getMenuHTML*** -> " + mtypeMenu);
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
  
            cstm01 = cnx.prepareCall(SQLCLL01);
            cstm01.setString("IN_CCUST", customerInfo.CCUST);
            cstm01.setString("IN_APLICA", appCode);
            cstm01.setInt("IN_MTYPE", Integer.parseInt(mtypeMenu));
            cstm01.setString("IN_USER", customerInfo.USR.trim()); //customerInfo.USCR
//             cstm01.setInt("IN_MTYPE", customerInfo.MTYPE);
            cstm01.execute();

            rst = cstm01.getResultSet();

            if (rst != null) {
                while (rst.next()) {
                    INF021 menu = new INF021();
                    menu.CCUST = rst.getString("CCUST");
                    menu.APLICA = rst.getString("APLICA").trim();
                    menu.MODUL = rst.getString("MODUL").trim();
                    menu.MTYPE = rst.getInt("MTYPE");
                    menu.MENU = rst.getString("MENU").trim();
                    menu.SMENU = rst.getString("SMENU").trim();
                    menu.TRANSA = rst.getString("TRANSA").trim();
                    menu.DESC1 = rst.getString("DESC1").trim();
                    menu.NPROG = rst.getString("NPROG").trim();
                    menu.ICONO = rst.getString("ICONO").trim();
                    //menu.STAT = rst.getString("STAT").trim();
                    menu.DESC2 = rst.getString("DESC2").trim();
                    menu.MODULO = rst.getString("MODULO").trim();
                    menu.MENU1 = rst.getString("MENU1").trim();
                    lstMenu.add(menu);
                }
            }
        } catch (Exception e) {
            e.printStackTrace(pw);
            sw.toString();
            //logError.error("accessProgram Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        } finally {
            if (rst != null) {
                //try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            }
            if (cstm01 != null) {
                //try { cstm01.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
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
                //try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            }
            if (cstm01 != null) {
                //try { cstm01.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);

        }

        return accessProgram;
    }

    public List<PX041S01INF001Filter> accessUser(PX041S01INF001Filter filter) throws SQLException, Exception {
        List<PX041S01INF001Filter> lstAccessUser = new ArrayList<PX041S01INF001Filter>(0);
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXIS.PX041S03INF001(?,?,?)}";
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
                //try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            }
            if (cstm01 != null) {
                //try { cstm01.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstAccessUser;
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
            //logError.error("logAccessProgram Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
            throw e;
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    //logError.error("Message: " + e.getMessage(), e);
                }
            }
            if (cstm01 != null) {
                try {
                    cstm01.close();
                } catch (SQLException e) {
                    //logError.error("Message: " + e.getMessage(), e);
                }
            }

            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
    }
}
