/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.interline;

import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.interline.filter.WRF170Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class FrequentFlyerDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public FrequentFlyerDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FrequentFlyerDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<WRF016Filter> loadPX198S01WRF002(WRF016Filter filter) throws SQLException, Exception {
        List<WRF016Filter> lstRtn = new ArrayList<>(0);
        WRF016Filter objRtn;

        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00134(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setInt(2, filter.IN_TIPOFECHA);
            cs.setString(3, filter.IN_FECHA_FROM);
            cs.setString(4, filter.IN_FECHA_TO);
            cs.setString(5, filter.IN_AIRLINE);
            cs.setString(6, filter.IN_PERIOD);//Periodo
            cs.setString(7, filter.IN_TYPE);//Close/Pending
            cs.setInt(8, filter.page.PAGNUM);
            cs.setInt(9, filter.page.PAGROW);
            cs.setInt(10, filter.page.TOTPAG);
            cs.setInt(11, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(8);
            filter.page.PAGROW = cs.getInt(9);
            filter.page.TOTPAG = cs.getInt(10);
            filter.page.TOTROW = cs.getInt(11);

            rs01 = cs.getResultSet();

            while (rs01.next()) {
                objRtn = new WRF016Filter();
                objRtn.FCLEAR = rs01.getString("FCLEAR");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FCLEAR);
                objRtn.FINVOICE = rs01.getString("FINVOICE");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.FINVOICE);
                objRtn.PERMONT = rs01.getString("PERMONT");
                objRtn.NROPRT = rs01.getString("NROPRT");
                objRtn.AIRLINE = rs01.getString("AIRLINE");
                //TKT + seq
                if (rs01.getString("DOC").length() >= 14) {
                    objRtn.strDescripcion = rs01.getString("DOC").substring(0, 3) + " " + rs01.getString("DOC").substring(3, 13) + " " + rs01.getString("DOC").substring(13, 14);
                } else {
                    objRtn.strDescripcion = rs01.getString("DOC");
                }
                objRtn.INVOICE = rs01.getString("INVOICE");
                objRtn.strDescripcion4 = rs01.getString("FBASE");
                objRtn.GROSSI = rs01.getDouble("GROSSI");
                objRtn.GROSSIA = rs01.getDouble("GROSSM");
                objRtn.ISCI = rs01.getDouble("ISCI");
                objRtn.ISCIA = rs01.getDouble("ISCM");
                objRtn.TAXI = rs01.getDouble("TAXI");
                objRtn.TAXIA = rs01.getDouble("TAXM");
                objRtn.NETI = rs01.getDouble("NETI");
                objRtn.NETIA = rs01.getDouble("NETM");
                if (rs01.getString("CODOB1").equals("SIS") || rs01.getString("CODOB2").equals("SIS") || rs01.getString("CODOB3").equals("SIS")
                        || rs01.getString("CODOB4").equals("SIS") || rs01.getString("CODOB5").equals("SIS")) {
                    objRtn.strDescripcion1 = "Closed";
                } else {
                    objRtn.strDescripcion1 = "Pending";
                }
                objRtn.strFlag = rs01.getString("PNR");

                //Paginación ===================================================
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<WRF170Filter> loadPX198SQP02620(WRF016Filter filter) throws SQLException, Exception {
        List<WRF170Filter> lstRtn = new ArrayList<>(0);
        WRF170Filter objRtn;

        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02620(?,?,?,?,?,?)}";

        double totDoubleGROSSI = 0.0;
        double totDoubleISCI = 0.0;
        double totDoubleSISCI = 0.0;
        double totDoubleTAXI = 0.0;
        double totDoubleNETI = 0.0;
        double totDoubleVCPN = 0.0;
        long totLongQTYI = 0;
        long totLongQTYP = 0;
        long totLongQTYE = 0;
        long totLongQTYSP = 0;

        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setInt(2, filter.IN_TIPOFECHA);
            cs.setString(3, filter.IN_FECHA_FROM);
            cs.setString(4, filter.IN_FECHA_TO);
            cs.setString(5, filter.IN_AIRLINE);
            cs.setString(6, filter.IN_PERIOD);//Periodo

            cs.execute();

            rs01 = cs.getResultSet();

            while (rs01.next()) {

                totDoubleGROSSI = rs01.getLong("GROSSI");
                totDoubleISCI = rs01.getDouble("ISCI");
                totDoubleSISCI = rs01.getDouble("SISCI");
                totDoubleTAXI = rs01.getDouble("TAXI");
                totDoubleNETI = rs01.getDouble("NETI");
                totDoubleVCPN = rs01.getDouble("VCPN");
                totLongQTYI = rs01.getLong("QTYI");
                totLongQTYP = rs01.getLong("QTYP");
                totLongQTYE = rs01.getLong("QTYE");
                totLongQTYSP = rs01.getLong("QTYSP");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cs.getMoreResults()) {
                rs01 = cs.getResultSet();

                while (rs01.next()) {
                    objRtn = new WRF170Filter();

                    if (filter.IN_TIPOFECHA == 1) {
                        objRtn.FINVOICE = rs01.getString("FCLEAR");
                    } else {
                        objRtn.FINVOICE = rs01.getString("FINVOICE");
                    }

                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);

                    objRtn.GROSSI = rs01.getDouble("GROSSI");
                    objRtn.ISCI = rs01.getDouble("ISCI");
                    objRtn.SISCI = rs01.getDouble("SISCI");
                    objRtn.TAXI = rs01.getDouble("TAXI");
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.QTYI = rs01.getLong("QTYI");
                    objRtn.QTYP = rs01.getLong("QTYP");
                    objRtn.QTYE = rs01.getLong("QTYE");
                    objRtn.QTYSP = rs01.getLong("QTYSP");

                    objRtn.totDoubleGROSSI = totDoubleGROSSI;
                    objRtn.totDoubleISCI = totDoubleISCI;
                    objRtn.totDoubleSISCI = totDoubleSISCI;
                    objRtn.totDoubleTAXI = totDoubleTAXI;
                    objRtn.totDoubleNETI = totDoubleNETI;
                    objRtn.totDoubleVCPN = totDoubleVCPN;
                    objRtn.totLongQTYI = totLongQTYI;
                    objRtn.totLongQTYP = totLongQTYP;
                    objRtn.totLongQTYE = totLongQTYE;
                    objRtn.totLongQTYSP = totLongQTYSP;

                    lstRtn.add(objRtn);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<WRF016Filter> loadPX198SQP02615(WRF016Filter filter) throws SQLException, Exception {
        List<WRF016Filter> lstRtn = new ArrayList<>(0);
        WRF016Filter objRtn;

        CallableStatement cs = null;
        ResultSet rs01 = null;

        String title = "";
        if (filter.IN_TIPOFECHA == 1) {
            title = " Clear Date : " + filter.strFormatDate;
        } else {
            title = " Invoice Date : " + filter.strFormatDate;
        }
        switch (filter.IN_FCLAS) {
            case "1":
                title += " / Errors";
                break;
            case "2":
                title += " / Sin PLM";
                break;
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02615_4(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

//      String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02615(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);
            cs.registerOutParameter(12, Types.INTEGER);
            cs.registerOutParameter(13, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setInt(2, filter.IN_TIPOFECHA);
            cs.setString(3, filter.IN_FECHA_FROM);
            cs.setString(4, filter.IN_FECHA_TO);
            cs.setString(5, filter.IN_AIRLINE);
            cs.setString(6, filter.IN_PERIOD);//Periodo
            cs.setString(7, filter.IN_TYPE);//Close/Pending
            cs.setString(8, filter.IN_SOURCE);
            cs.setString(9, filter.IN_FCLAS);
            cs.setInt(10, filter.page.PAGNUM);
            cs.setInt(11, filter.page.PAGROW);
            cs.setInt(12, filter.page.TOTPAG);
            cs.setInt(13, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(10);
            filter.page.PAGROW = cs.getInt(11);
            filter.page.TOTPAG = cs.getInt(12);
            filter.page.TOTROW = cs.getInt(13);

            rs01 = cs.getResultSet();

            while (rs01.next()) {
                objRtn = new WRF016Filter();

                objRtn.IN_FCLAS = filter.IN_FCLAS;
                objRtn.strTitle = title;
                objRtn.FINVOICE = rs01.getString("FINVOICE");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.FINVOICE);
                objRtn.AIRLINE = rs01.getString("AIRLINE");

                objRtn.strFormatDate = Functions.getMonthConvert(rs01.getString("FSALE"));
                objRtn.strFormatDate2 = Functions.getMonthConvert(rs01.getString("FFLIGHT"));
                objRtn.CAMARA = rs01.getString("TRNCU");

                objRtn.FORMA = rs01.getString("FROMCPN") + " - " + rs01.getString("TOCPN");
                objRtn.STVAL = rs01.getString("TOCPN");
                objRtn.CCIA = rs01.getString("BOOKIP");
                objRtn.totAud1 = rs01.getInt("KMSCL");
                objRtn.CURRENP = rs01.getString("CURR");
                objRtn.totNet1 = rs01.getDouble("TOTIV");
                objRtn.TUSO = rs01.getString("TUSO");

                objRtn.CURRENC = rs01.getString("MONFARE");
                objRtn.RUTAP = rs01.getString("RUTAP").substring(0, 3) + " - " + rs01.getString("RUTAP").substring(3, 6);
                objRtn.totNet3 = rs01.getDouble("MBASE");
                objRtn.totNet2 = rs01.getDouble("DIFF");
                objRtn.strDescripcion1 = rs01.getString("FCLAS");
                objRtn.strDescripcion2 = rs01.getString("FFBASE");
                objRtn.strDescripcion3 = rs01.getString("FCARR");

                objRtn.strDescripcion = rs01.getString("DOC") + " - " + rs01.getString("CUPON");
                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.SERIE = rs01.getString("AGTIA");
                objRtn.COMENT2 = rs01.getString("DES_AGTIA");
                objRtn.COMENT1 = rs01.getString("CANAL");
                objRtn.strDescripcion4 = rs01.getString("FBASE");
                objRtn.GROSSI = rs01.getDouble("GROSSI");
                objRtn.ISCI = rs01.getDouble("ISCI");
                objRtn.TAXI = rs01.getDouble("TAXI");
                objRtn.NETI = rs01.getDouble("NETI");

                //Paginación ===================================================
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<WRF016Filter> loadPX198S02WRF002(WRF016Filter filter) throws SQLException, Exception {
        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        WRF016Filter objRtn;

        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00135(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cs.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cs.setString(4, filter.IN_TKT.substring(7, 13));//SERIE

            cs.execute();

            rs01 = cs.getResultSet();

            while (rs01.next()) {
                objRtn = new WRF016Filter();
                objRtn.FCLEAR = rs01.getString("FCLEAR");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FCLEAR);
                objRtn.FINVOICE = rs01.getString("FINVOICE");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.FINVOICE);
                objRtn.PERMONT = rs01.getString("PERMONT");
                objRtn.NROPRT = rs01.getString("NROPRT");
                objRtn.AIRLINE = rs01.getString("AIRLINE");
                //TKT + seq
                if (rs01.getString("DOC").length() >= 14) {
                    objRtn.strDescripcion = rs01.getString("DOC").substring(0, 3) + " " + rs01.getString("DOC").substring(3, 13) + " " + rs01.getString("DOC").substring(13, 14);
                } else {
                    objRtn.strDescripcion = rs01.getString("DOC");
                }
                objRtn.INVOICE = rs01.getString("INVOICE");
                objRtn.strDescripcion4 = rs01.getString("FBASE");
                objRtn.GROSSI = rs01.getDouble("GROSSI");
                objRtn.GROSSIA = rs01.getDouble("GROSSM");
                objRtn.ISCI = rs01.getDouble("ISCI");
                objRtn.ISCIA = rs01.getDouble("ISCM");
                objRtn.TAXI = rs01.getDouble("TAXI");
                objRtn.TAXIA = rs01.getDouble("TAXM");
                objRtn.NETI = rs01.getDouble("NETI");
                objRtn.NETIA = rs01.getDouble("NETM");
                if (rs01.getString("CODOB1").equals("SIS") || rs01.getString("CODOB2").equals("SIS") || rs01.getString("CODOB3").equals("SIS")
                        || rs01.getString("CODOB4").equals("SIS") || rs01.getString("CODOB5").equals("SIS")) {
                    objRtn.strDescripcion1 = "Closed";
                } else {
                    objRtn.strDescripcion1 = "Pending";
                }
                objRtn.strFlag = rs01.getString("PNR");

                lstRtn.add(objRtn);
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    
}
