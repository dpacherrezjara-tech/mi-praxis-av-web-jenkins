package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class WorkProgressOALDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public HashMap loadPX234S01A1692(A020Filter filter) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        /*double totTGROSS = 0, totHFEEAM = 0;*/
        List LISTA = new ArrayList();
        List LISTATOT = new ArrayList();
        HashMap hm = new HashMap();
        HashMap hmap = new HashMap();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00242(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.VARCHAR);
            cstmt01.registerOutParameter(5, Types.VARCHAR);
            cstmt01.registerOutParameter(6, Types.VARCHAR);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, "");
            cstmt01.setString(5, "");
            cstmt01.setString(6, "");
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                hm.put("descr", cstmt01.getString(4));
                hm.put("tot" + rs01.getString("DVCR"), rs01.getInt("TOTDET"));
                hm.put("per" + rs01.getString("DVCR"), rs01.getDouble("PERC") + "%");
            }
            rs01.close();
            LISTATOT.add(hm);


            if (cstmt01.getMoreResults()) {
                hm = new HashMap();
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    hm.put("descr", cstmt01.getString(5));
                    hm.put("tot" + rs01.getString("DVCR"), rs01.getInt("TOTDIF"));
                    hm.put("per" + rs01.getString("DVCR"), rs01.getDouble("PERC") + "%");
                }
                rs01.close();
                LISTATOT.add(hm);

                if (cstmt01.getMoreResults()) {
                    hm = new HashMap();
                    rs01 = cstmt01.getResultSet();
                    while (rs01.next()) {
                        hm.put("descr", cstmt01.getString(6));
                        hm.put("tot" + rs01.getString("DVCR"), rs01.getDouble("TOT"));
                        hm.put("per" + rs01.getString("DVCR"), "100%");
                    }
                    rs01.close();
                    LISTATOT.add(hm);

                    hmap.put("TOTALES", LISTATOT);

                    if (cstmt01.getMoreResults()) {
                        hm = new HashMap();
                        rs01 = cstmt01.getResultSet();
                        String dflight = "";
                        String strdia = "";
                        while (rs01.next()) {

                            if (!dflight.equals("") && !dflight.equals(rs01.getString("DFLIGHT"))) {
                                //hmLista.put(objRtn.FECR.substring(6, 8), hm);
                                //hm = new HashMap();
                                for (int dia = 1; dia <= 31; dia++) {
                                    strdia = Functions.fillZeros(2, String.valueOf(dia));
                                    if (!hm.containsKey("dia" + strdia)) {
                                        //hm = (HashMap) hmLista.get(strdia);
                                        hm.put("DFLIGHT", Functions.getMonthConvert(dflight));
                                        //hm.put("dia"+strdia, 0);
                                    }

                                }

                                LISTA.add(hm);
                                hm = new HashMap();
                            }

                            hm.put("DFLIGHT", Functions.getMonthConvert(rs01.getString("DFLIGHT")));
                            hm.put("dia" + rs01.getString("DVCR").substring(6, 8), rs01.getInt("QTY"));
                            //hm.put("TOTAL", hmTot);

                            dflight = rs01.getString("DFLIGHT");

                        }
                        if (!dflight.equals("")) {
                            for (int dia = 1; dia <= 31; dia++) {
                                strdia = Functions.fillZeros(2, String.valueOf(dia));
                                if (!hm.containsKey("dia" + strdia)) {
                                    //hm = (HashMap) hmLista.get(strdia);
                                    hm.put("DFLIGHT", Functions.getMonthConvert(dflight));
                                    //hm.put("dia"+strdia, 0);
                                }

                            }
                            LISTA.add(hm);
                        }
                        hmap.put("DETALLE", LISTA);
                    }

                }
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
            pasarGarbageCollector();
        }

        return hmap;
    }
    
    public HashMap loadPX234S01A1692_2(A020Filter filter) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        /*double totTGROSS = 0, totHFEEAM = 0;*/
        List LISTA = new ArrayList();
        List LISTATOT = new ArrayList();
        HashMap hm = new HashMap();
        HashMap hmap = new HashMap();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00242_3(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.VARCHAR);
            cstmt01.registerOutParameter(5, Types.VARCHAR);
            cstmt01.registerOutParameter(6, Types.VARCHAR);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, "");
            cstmt01.setString(5, "");
            cstmt01.setString(6, "");
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                hm.put("descr", cstmt01.getString(4));
                hm.put("tot" + rs01.getString("DVCR"), rs01.getInt("TOTDET"));
                hm.put("per" + rs01.getString("DVCR"), rs01.getDouble("PERC") + "%");
            }
            rs01.close();
            LISTATOT.add(hm);


            if (cstmt01.getMoreResults()) {
                hm = new HashMap();
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    hm.put("descr", cstmt01.getString(5));
                    hm.put("tot" + rs01.getString("DVCR"), rs01.getInt("TOTDIF"));
                    hm.put("per" + rs01.getString("DVCR"), rs01.getDouble("PERC") + "%");
                }
                rs01.close();
                LISTATOT.add(hm);

                if (cstmt01.getMoreResults()) {
                    hm = new HashMap();
                    rs01 = cstmt01.getResultSet();
                    while (rs01.next()) {
                        hm.put("descr", cstmt01.getString(6));
                        hm.put("tot" + rs01.getString("DVCR"), rs01.getDouble("TOT"));
                        hm.put("per" + rs01.getString("DVCR"), "100%");
                    }
                    rs01.close();
                    LISTATOT.add(hm);

                    hmap.put("TOTALES", LISTATOT);

                    if (cstmt01.getMoreResults()) {
                        hm = new HashMap();
                        rs01 = cstmt01.getResultSet();
                        String dflight = "";
                        String strdia = "";
                        while (rs01.next()) {

                            if (!dflight.equals("") && !dflight.equals(rs01.getString("DFLIGHT"))) {
                                //hmLista.put(objRtn.FECR.substring(6, 8), hm);
                                //hm = new HashMap();
                                for (int dia = 1; dia <= 31; dia++) {
                                    strdia = Functions.fillZeros(2, String.valueOf(dia));
                                    if (!hm.containsKey("dia" + strdia)) {
                                        //hm = (HashMap) hmLista.get(strdia);
                                        hm.put("DFLIGHT", Functions.getMonthConvert(dflight));
                                        //hm.put("dia"+strdia, 0);
                                    }

                                }

                                LISTA.add(hm);
                                hm = new HashMap();
                            }

                            hm.put("DFLIGHT", Functions.getMonthConvert(rs01.getString("DFLIGHT")));
                            hm.put("dia" + rs01.getString("DVCR").substring(6, 8), rs01.getInt("QTY"));
                            //hm.put("TOTAL", hmTot);

                            dflight = rs01.getString("DFLIGHT");

                        }
                        if (!dflight.equals("")) {
                            for (int dia = 1; dia <= 31; dia++) {
                                strdia = Functions.fillZeros(2, String.valueOf(dia));
                                if (!hm.containsKey("dia" + strdia)) {
                                    //hm = (HashMap) hmLista.get(strdia);
                                    hm.put("DFLIGHT", Functions.getMonthConvert(dflight));
                                    //hm.put("dia"+strdia, 0);
                                }

                            }
                            LISTA.add(hm);
                        }
                        hmap.put("DETALLE", LISTA);
                    }

                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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
            pasarGarbageCollector();
        }

        return hmap;
    }
    
    public List<A1692Filter> loadSQP01513(A1692Filter filter) throws SQLException, Exception {

        List<A1692Filter> list = new ArrayList<A1692Filter>();
        A1692Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long dblCPN_Aud = 0,dblCPN_Bill=0,dblCPN_Proc=0, dbltotNETO=0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01513(?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
      

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);
                
           rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dblCPN_Aud = rs01.getLong("OCR");
                dblCPN_Bill = rs01.getLong("OAL");
                dblCPN_Proc = rs01.getLong("OWN");
                dbltotNETO= rs01.getLong("OCR") + rs01.getLong("OAL") + rs01.getLong("OWN");
            
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
           
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1692Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    
                    objRtn.FECVAL = rs01.getString("DVCR").trim();
                    objRtn.strFormatFECVAL = Functions.getMonthConvert(objRtn.FECVAL);
                    
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    
                    objRtn.FCONT = rs01.getString("FCONT").trim();
                    objRtn.strFCON = Functions.getMonthConvert(objRtn.FCONT);
                   
                    objRtn.CPN_Aud = rs01.getLong("OCR");
                    objRtn.CPN_Bill = rs01.getLong("OAL");
                    objRtn.CPN_Proc = rs01.getLong("OWN");
                    objRtn.NETO=rs01.getLong("OCR") + rs01.getLong("OAL") + rs01.getLong("OWN");
                    
                    objRtn.totCPN_Aud= dblCPN_Aud;
                    objRtn.totCPN_Bill= dblCPN_Bill;
                    objRtn.totCPN_Proc= dblCPN_Proc;
                    objRtn.totNETO=dbltotNETO;
                    
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }
    
    private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
