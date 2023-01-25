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
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.interline.filter.A2858Filter;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class InterlineConciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InterlineConciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InterlineConciliationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2858Filter> loadSQP01357(A2858Filter filter) throws SQLException, Exception {

        List<A2858Filter> list = new ArrayList<>();
        A2858Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lngQCPN = 0, lngQEXCH = 0, lngQINV = 0;
        double dblVALOR = 0, dblGROSS = 0, dblVREJECT = 0;
        double dblTotDiffNeg = 0, dblTotDiffPos = 0;

        if (filter.IN_CITYPAIR.trim().length() < 6) {
            filter.IN_CITYPAIR = Functions.fillString(filter.IN_CITYPAIR, 6);
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01357(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_CARRIER.trim());
            cstmt.setString(5, filter.IN_CITYPAIR.substring(0, 3).trim());
            cstmt.setString(6, filter.IN_CITYPAIR.substring(3, 6).trim());
            cstmt.setString(7, filter.IN_FECHA.trim());
            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            while (rs01.next()) {

                lngQCPN = rs01.getLong("CPN");
                lngQEXCH = rs01.getLong("QEXCH");
                lngQINV = rs01.getLong("QINV");
                dblVALOR = rs01.getLong("VALOR");
                dblGROSS = rs01.getDouble("GROSS");
                dblVREJECT = rs01.getDouble("VREJECT");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2858Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    objRtn.IN_CARRIER = filter.IN_CARRIER.trim();
                    objRtn.IN_CITYPAIR = filter.IN_CITYPAIR.trim();
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.RN = rs01.getLong("RN");

                    if (objRtn.IN_FECHA.equals("1")) {
                        objRtn.FINVOICE = rs01.getString("DATEI").trim();
                    } else {
                        objRtn.FINVOICE = rs01.getString("DATEF").trim();
                    }
                    //objRtn.FINVOICE = rs01.getString("DATE").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.CARRIA = rs01.getString("CARRIA").trim();
                    objRtn.strDescCarrier = rs01.getString("DESCAR").trim();
                    objRtn.CURRENC = rs01.getString("CURRENC").trim();
                    objRtn.CURRENCI = rs01.getString("CURRENCI").trim();
                    objRtn.lngQCPN = rs01.getLong("CPN");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.VREJECT = rs01.getDouble("VREJECT");
                    objRtn.lngQEXCH = rs01.getLong("QEXCH");
                    objRtn.lngQINV = rs01.getLong("QINV");
                    //objRtn.dblDiff = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");
                    if (rs01.getDouble("VALOR") - rs01.getDouble("GROSS") < 0) {
                        objRtn.dblDiffNeg = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");
                    } else {
                        objRtn.dblDiffPos = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");
                    }
                    if (rs01.getDouble("GROSS") - rs01.getDouble("VREJECT") < 0) {
                        objRtn.dblDiffRejNeg = rs01.getDouble("GROSS") - rs01.getDouble("VREJECT");
                    } else {
                        objRtn.dblDiffRejPos = rs01.getDouble("GROSS") - rs01.getDouble("VREJECT");
                    }

                    objRtn.lngTotQCPN = lngQCPN;
                    objRtn.lngTotQEXCH = lngQEXCH;
                    objRtn.lngTotQINV = lngQINV;
                    objRtn.dblTotVALOR = dblVALOR;
                    objRtn.dblTotGROSS = dblGROSS;
                    objRtn.dblTotVREJECT = dblVREJECT;

                    dblTotDiffNeg += objRtn.dblDiffNeg;
                    dblTotDiffPos += objRtn.dblDiffPos;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }

                if (list.size() > 0) {

                    list.get(0).dblTotDiffNeg = dblTotDiffNeg;
                    list.get(0).dblTotDiffPos = dblTotDiffPos;
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

    public List<A2858Filter> loadSQP01358(A2858Filter filter) throws SQLException, Exception {

        List<A2858Filter> list = new ArrayList<>();
        A2858Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lngQCPN = 0;
        double dblVALOR = 0, dblGROSS = 0, dblVREJECT = 0;
        double dblTotDiffNeg = 0, dblTotDiffPos = 0;

        if (filter.IN_CITYPAIR.trim().length() < 6) {
            filter.IN_CITYPAIR = Functions.fillString(filter.IN_CITYPAIR, 6);
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01358(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FINVOICE.trim());
            cstmt.setString(3, filter.CARRIA.trim());
            cstmt.setString(4, filter.CURRENC.trim());
            cstmt.setString(5, filter.CURRENCI.trim());
            cstmt.setString(6, filter.IN_CITYPAIR.substring(0, 3).trim());
            cstmt.setString(7, filter.IN_CITYPAIR.substring(3, 6).trim());
            cstmt.setString(8, filter.IN_TRNCU.trim());
            cstmt.setString(9, filter.IN_FECHA.trim());
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            while (rs01.next()) {

                lngQCPN = rs01.getLong("CPN");
                dblVALOR = rs01.getLong("VALOR");
                dblGROSS = rs01.getDouble("GROSS");
                dblVREJECT = rs01.getDouble("VREJECT");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2858Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    objRtn.IN_CARRIER = filter.IN_CARRIER.trim();
                    objRtn.IN_CITYPAIR = filter.IN_CITYPAIR.trim();
                    objRtn.IN_TRNCU = filter.IN_TRNCU.trim();
                    objRtn.IN_FECHA = filter.IN_FECHA.trim();
                    objRtn.FINVOICE = filter.FINVOICE.trim();
                    objRtn.strFormatDate = filter.strFormatDate.trim();
                    objRtn.CARRIA = filter.CARRIA.trim();
                    objRtn.strDescCarrier = filter.strDescCarrier.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CITYO = rs01.getString("CITYO").trim();
                    objRtn.CITYD = rs01.getString("CITYD").trim();
                    objRtn.strDescCityO = rs01.getString("DESCCITYO").trim();
                    objRtn.strDescCityD = rs01.getString("DESCCITYD").trim();
                    objRtn.CURRENC = rs01.getString("CURRENC").trim();
                    objRtn.CURRENCI = rs01.getString("CURRENCI").trim();
                    objRtn.lngQCPN = rs01.getLong("CPN");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.VREJECT = rs01.getDouble("VREJECT");
                    //objRtn.dblDiff = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");
                    if (rs01.getDouble("VALOR") - rs01.getDouble("GROSS") < 0) {
                        objRtn.dblDiffNeg = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");
                    } else {
                        objRtn.dblDiffPos = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");
                    }
                    if (rs01.getDouble("GROSS") - rs01.getDouble("VREJECT") < 0) {
                        objRtn.dblDiffRejNeg = rs01.getDouble("GROSS") - rs01.getDouble("VREJECT");
                    } else {
                        objRtn.dblDiffRejPos = rs01.getDouble("GROSS") - rs01.getDouble("VREJECT");
                    }

                    objRtn.lngTotQCPN = lngQCPN;
                    objRtn.dblTotVALOR = dblVALOR;
                    objRtn.dblTotGROSS = dblGROSS;
                    objRtn.dblTotVREJECT = dblVREJECT;

                    dblTotDiffNeg += objRtn.dblDiffNeg;
                    dblTotDiffPos += objRtn.dblDiffPos;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
                if (list.size() > 0) {

                    list.get(0).dblTotDiffNeg = dblTotDiffNeg;
                    list.get(0).dblTotDiffPos = dblTotDiffPos;
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

    public List<A2858Filter> loadSQP01349(A2858Filter filter) throws SQLException, Exception {

        List<A2858Filter> list = new ArrayList<>();
        A2858Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblTARIFA = 0, dblVMPA = 0, dblVSRP = 0, dblVSPA = 0, dblVALOR = 0;
        double dblGROSS = 0, dblVMPAI = 0, dblVSRPI = 0, dblVSPAI = 0, dblVREJECT = 0;
        double dblVOVER = 0, dblVUNDER = 0, dblVMATCH = 0;
        double dblTotDiffNeg = 0, dblTotDiffPos = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01349(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FINVOICE.trim());
            cstmt.setString(3, filter.CARRIA.trim());
            cstmt.setString(4, filter.CURRENC.trim());
            cstmt.setString(5, filter.CURRENCI.trim());
            cstmt.setString(6, filter.CITYO.trim());
            cstmt.setString(7, filter.CITYD.trim());
            cstmt.setString(8, filter.IN_TRNCU.trim());
            cstmt.setString(9, filter.IN_FECHA.trim());
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            while (rs01.next()) {

                dblTARIFA = rs01.getLong("TARIFA");
                dblVMPA = rs01.getLong("VMPA");
                dblVSRP = rs01.getLong("VSRP");
                dblVSPA = rs01.getDouble("VSPA");
                dblVALOR = rs01.getLong("VALOR");
                dblGROSS = rs01.getDouble("GROSS");
                dblVMPAI = rs01.getDouble("VMPAI");
                dblVSRPI = rs01.getLong("VSRPI");
                dblVSPAI = rs01.getDouble("VSPAI");
                dblVREJECT = rs01.getDouble("VREJECT");
                dblVOVER = rs01.getDouble("VOVER");
                dblVUNDER = rs01.getDouble("VUNDER");
                dblVMATCH = rs01.getDouble("VMATCH");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2858Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    objRtn.IN_CARRIER = filter.IN_CARRIER.trim();
                    objRtn.IN_CITYPAIR = filter.IN_CITYPAIR.trim();
                    objRtn.strFormatDate = filter.strFormatDate.trim();
                    objRtn.CARRIA = filter.CARRIA.trim();
                    objRtn.IN_TRNCU = filter.IN_TRNCU.trim();
                    objRtn.IN_FECHA = filter.IN_FECHA.trim();
                    objRtn.strDescCarrier = filter.strDescCarrier.trim();
                    objRtn.strDescCityO = filter.strDescCityO.trim();
                    objRtn.strDescCityD = filter.strDescCityD.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CCIA = rs01.getString("CCIA").trim();
                    objRtn.FORMA = rs01.getString("FORMA").trim();
                    objRtn.SERIE = rs01.getString("SERIE").trim();
                    objRtn.CUPON = rs01.getString("CUPON").trim();
                    objRtn.strTicket = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim() + " " + rs01.getString("CUPON").trim();
                    objRtn.SEQ = rs01.getString("SEQ").trim();
                    objRtn.FINVOICE = rs01.getString("FINVOICE").trim();
                    objRtn.VENDOR = rs01.getString("VENDOR").trim();
                    objRtn.TSALES = rs01.getString("TSALES").trim();
                    objRtn.CANAV = rs01.getString("CANAV").trim();
                    objRtn.EXCHAN = rs01.getString("EXCHAN").trim();
                    objRtn.BOOKI = rs01.getString("BOOKI").trim();
                    objRtn.CLASE = rs01.getString("CLASE").trim();
                    objRtn.FAREBASE = rs01.getString("FAREBASE").trim();
                    objRtn.CURRENL = rs01.getString("CURRENL").trim();
                    objRtn.CITYO = rs01.getString("CITYO").trim();
                    objRtn.CITYD = rs01.getString("CITYD").trim();
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT").trim();
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT").trim();
                    objRtn.CCIAO = rs01.getString("CCIAO").trim();
                    objRtn.FORMAO = rs01.getString("FORMAO").trim();
                    objRtn.SERIEO = rs01.getString("SERIEO").trim();
                    objRtn.strTicketOrig = rs01.getString("CCIAO").trim() + " " + rs01.getString("FORMAO").trim() + rs01.getString("SERIEO").trim();
                    objRtn.DESFRCA = rs01.getString("DESFRCA").trim();
                    objRtn.FINVOL = rs01.getString("FINVOL").trim();
                    objRtn.CURRENC = rs01.getString("CURRENC").trim();
                    objRtn.CURRENCI = rs01.getString("CURRENCI").trim();
                    objRtn.TARIFA = rs01.getDouble("TARIFA");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.dblDiff = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");
                    if (!objRtn.FLAGI.trim().equals("1")) {
                        objRtn.strDescripcion = "Audit Pending";
                    }
                    objRtn.VREJECT = rs01.getDouble("VREJECT");
                    objRtn.FREJE = rs01.getString("FREJE").trim();
                    objRtn.VOVER = rs01.getDouble("VOVER");
                    objRtn.VUNDER = rs01.getDouble("VUNDER");
                    objRtn.VMATCH = rs01.getDouble("VMATCH");
                    if (rs01.getDouble("VALOR") - rs01.getDouble("GROSS") < 0) {
                        objRtn.dblDiffNeg = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");
                    } else {
                        objRtn.dblDiffPos = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");
                    }
                    if (rs01.getDouble("GROSS") - rs01.getDouble("VREJECT") < 0) {
                        objRtn.dblDiffRejNeg = rs01.getDouble("GROSS") - rs01.getDouble("VREJECT");
                    } else {
                        objRtn.dblDiffRejPos = rs01.getDouble("GROSS") - rs01.getDouble("VREJECT");
                    }

                    objRtn.FLAGI = rs01.getString("FLAGI").trim();
                    if (rs01.getString("INDPR").trim().equals("S")) {
                        objRtn.INDPR = "SRP";
                    } else if (rs01.getString("INDPR").trim().equals("M")) {
                        objRtn.INDPR = "MPA";
                    } else if (rs01.getString("INDPR").trim().equals("A")) {
                        objRtn.INDPR = "SPA";
                    } else {
                        objRtn.INDPR = rs01.getString("INDPR").trim();
                    }
                    if (rs01.getString("INDPRI").trim().equals("S")) {
                        objRtn.INDPRI = "SRP";
                    } else if (rs01.getString("INDPRI").trim().equals("M")) {
                        objRtn.INDPRI = "MPA";
                    } else if (rs01.getString("INDPRI").trim().equals("A")) {
                        objRtn.INDPRI = "SPA";
                    } else {
                        objRtn.INDPRI = rs01.getString("INDPRI").trim();
                    }
                    objRtn.VMPA = rs01.getDouble("VMPA");
                    objRtn.VSRP = rs01.getDouble("VSRP");
                    objRtn.VSPA = rs01.getDouble("VSPA");
                    objRtn.VMPAI = rs01.getDouble("VMPAI");
                    objRtn.VSRPI = rs01.getDouble("VSRPI");
                    objRtn.VSPAI = rs01.getDouble("VSPAI");

                    objRtn.dblTotTARIFA = dblTARIFA;
                    objRtn.dblTotVALOR = dblVALOR;
                    objRtn.dblTotGROSS = dblGROSS;
                    objRtn.dblTotDiff = dblVALOR - dblGROSS;
                    objRtn.dblTotVREJECT = dblVREJECT;
                    objRtn.dblTotVOVER = dblVOVER;
                    objRtn.dblTotVUNDER = dblVUNDER;
                    objRtn.dblTotVMATCH = dblVMATCH;

                    objRtn.dblTotVMPA = dblVMPA;
                    objRtn.dblTotVSRP = dblVSRP;
                    objRtn.dblTotVSPA = dblVSPA;
                    objRtn.dblTotVMPAI = dblVMPAI;
                    objRtn.dblTotVSRPI = dblVSRPI;
                    objRtn.dblTotVSPAI = dblVSPAI;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    dblTotDiffNeg += objRtn.dblDiffNeg;
                    dblTotDiffPos += objRtn.dblDiffPos;

                    list.add(objRtn);
                }

                if (list.size() > 0) {

                    list.get(0).dblTotDiffNeg = dblTotDiffNeg;
                    list.get(0).dblTotDiffPos = dblTotDiffPos;
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

    public List<A2858Filter> loadSQP01347(A2858Filter filter) throws SQLException, Exception {

        List<A2858Filter> list = new ArrayList<>();
        A2858Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblTARIFA = 0, dblVMPA = 0, dblVSRP = 0, dblVSPA = 0, dblVALOR = 0;
        double dblGROSS = 0, dblVMPAI = 0, dblVSRPI = 0, dblVSPAI = 0, dblVREJECT = 0;

        if (filter.IN_CITYPAIR.trim().length() < 6) {
            filter.IN_CITYPAIR = Functions.fillString(filter.IN_CITYPAIR, 6);
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01347(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_CARRIER.trim());
            cstmt.setString(5, filter.IN_CITYPAIR.substring(0, 3).trim());
            cstmt.setString(6, filter.IN_CITYPAIR.substring(3, 6).trim());
            cstmt.setString(7, filter.IN_FECHA.trim());
            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            while (rs01.next()) {

                dblTARIFA = rs01.getLong("TARIFA");
                dblVMPA = rs01.getLong("VMPA");
                dblVSRP = rs01.getLong("VSRP");
                dblVSPA = rs01.getDouble("VSPA");
                dblVALOR = rs01.getLong("VALOR");
                dblGROSS = rs01.getDouble("GROSS");
                dblVMPAI = rs01.getDouble("VMPAI");
                dblVSRPI = rs01.getLong("VSRPI");
                dblVSPAI = rs01.getDouble("VSPAI");
                dblVREJECT = rs01.getDouble("VREJECT");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2858Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    objRtn.IN_CARRIER = filter.IN_CARRIER.trim();
                    objRtn.IN_CITYPAIR = filter.IN_CITYPAIR.trim();
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.RN = rs01.getLong("RN");

                    if (objRtn.IN_FECHA.equals("1")) {
                        objRtn.FINVOICE = rs01.getString("DATE").trim();
                    } else {
                        objRtn.FINVOICE = rs01.getString("DATE").trim();
                    }
                    // objRtn.FINVOICE = rs01.getString("DATE").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.CARRIA = rs01.getString("CARRIA").trim();
                    objRtn.strDescCarrier = rs01.getString("DESCAR").trim();
                    objRtn.CURRENC = rs01.getString("CURRENC").trim();
                    objRtn.CURRENCI = rs01.getString("CURRENCI").trim();
                    objRtn.TARIFA = rs01.getDouble("TARIFA");
                    objRtn.VMPA = rs01.getDouble("VMPA");
                    objRtn.VSRP = rs01.getDouble("VSRP");
                    objRtn.VSPA = rs01.getDouble("VSPA");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.VMPAI = rs01.getDouble("VMPAI");
                    objRtn.VSRPI = rs01.getDouble("VSRPI");
                    objRtn.VSPAI = rs01.getDouble("VSPAI");
                    objRtn.VREJECT = rs01.getDouble("VREJECT");
                    objRtn.dblDiff = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");

                    objRtn.dblTotTARIFA = dblTARIFA;
                    objRtn.dblTotVMPA = dblVMPA;
                    objRtn.dblTotVSRP = dblVSRP;
                    objRtn.dblTotVSPA = dblVSPA;
                    objRtn.dblTotVALOR = dblVALOR;
                    objRtn.dblTotGROSS = dblGROSS;
                    objRtn.dblTotVMPAI = dblVMPAI;
                    objRtn.dblTotVSRPI = dblVSRPI;
                    objRtn.dblTotVSPAI = dblVSPAI;
                    objRtn.dblTotVREJECT = dblVREJECT;
                    objRtn.dblTotDiff = dblVALOR - dblGROSS;

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

    public List<A2858Filter> loadSQP01348(A2858Filter filter) throws SQLException, Exception {

        List<A2858Filter> list = new ArrayList<>();
        A2858Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblTARIFA = 0, dblVMPA = 0, dblVSRP = 0, dblVSPA = 0, dblVALOR = 0;
        double dblGROSS = 0, dblVMPAI = 0, dblVSRPI = 0, dblVSPAI = 0, dblVREJECT = 0;

        if (filter.IN_CITYPAIR.trim().length() < 6) {
            filter.IN_CITYPAIR = Functions.fillString(filter.IN_CITYPAIR, 6);
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01348(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FINVOICE.trim());
            cstmt.setString(3, filter.CARRIA.trim());
            cstmt.setString(4, filter.CURRENC.trim());
            cstmt.setString(5, filter.CURRENCI.trim());
            cstmt.setString(6, filter.IN_CITYPAIR.substring(0, 3).trim());
            cstmt.setString(7, filter.IN_CITYPAIR.substring(3, 6).trim());
            cstmt.setString(8, filter.IN_FECHA.trim());
            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            while (rs01.next()) {

                dblTARIFA = rs01.getLong("TARIFA");
                dblVMPA = rs01.getLong("VMPA");
                dblVSRP = rs01.getLong("VSRP");
                dblVSPA = rs01.getDouble("VSPA");
                dblVALOR = rs01.getLong("VALOR");
                dblGROSS = rs01.getDouble("GROSS");
                dblVMPAI = rs01.getDouble("VMPAI");
                dblVSRPI = rs01.getLong("VSRPI");
                dblVSPAI = rs01.getDouble("VSPAI");
                dblVREJECT = rs01.getDouble("VREJECT");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2858Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    objRtn.IN_CARRIER = filter.IN_CARRIER.trim();
                    objRtn.IN_CITYPAIR = filter.IN_CITYPAIR.trim();
                    objRtn.IN_FECHA = filter.IN_FECHA.trim();
                    objRtn.FINVOICE = filter.FINVOICE.trim();
                    objRtn.strFormatDate = filter.strFormatDate.trim();
                    objRtn.CARRIA = filter.CARRIA.trim();
                    objRtn.strDescCarrier = filter.strDescCarrier.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CITYO = rs01.getString("CITYO").trim();
                    objRtn.CITYD = rs01.getString("CITYD").trim();
                    objRtn.strDescCityO = rs01.getString("DESCCITYO").trim();
                    objRtn.strDescCityD = rs01.getString("DESCCITYD").trim();
                    objRtn.CURRENC = rs01.getString("CURRENC").trim();
                    objRtn.CURRENCI = rs01.getString("CURRENCI").trim();
                    objRtn.TARIFA = rs01.getDouble("TARIFA");
                    objRtn.VMPA = rs01.getDouble("VMPA");
                    objRtn.VSRP = rs01.getDouble("VSRP");
                    objRtn.VSPA = rs01.getDouble("VSPA");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.VMPAI = rs01.getDouble("VMPAI");
                    objRtn.VSRPI = rs01.getDouble("VSRPI");
                    objRtn.VSPAI = rs01.getDouble("VSPAI");
                    objRtn.VREJECT = rs01.getDouble("VREJECT");
                    objRtn.dblDiff = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");

                    objRtn.dblTotTARIFA = dblTARIFA;
                    objRtn.dblTotVMPA = dblVMPA;
                    objRtn.dblTotVSRP = dblVSRP;
                    objRtn.dblTotVSPA = dblVSPA;
                    objRtn.dblTotVALOR = dblVALOR;
                    objRtn.dblTotGROSS = dblGROSS;
                    objRtn.dblTotVMPAI = dblVMPAI;
                    objRtn.dblTotVSRPI = dblVSRPI;
                    objRtn.dblTotVSPAI = dblVSPAI;
                    objRtn.dblTotVREJECT = dblVREJECT;
                    objRtn.dblTotDiff = dblVALOR - dblGROSS;

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

    public List<A2858Filter> loadPX362SQP01360(A2858Filter filter) throws SQLException, Exception {

        List<A2858Filter> list = new ArrayList<>();
        A2858Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lngQCPN = 0;
        double dblVALOR = 0, dblGROSS = 0, dblVREJECT = 0;
        double dblVOVER = 0, dblVUNDER = 0, dblVMATCH = 0, dblTotVMATCH = 0;

        if (filter.IN_CITYPAIR.trim().length() < 6) {
            filter.IN_CITYPAIR = Functions.fillString(filter.IN_CITYPAIR, 6);
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01360_2(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_CARRIER.trim());
            cstmt.setString(5, filter.IN_CITYPAIR.substring(0, 3).trim());
            cstmt.setString(6, filter.IN_CITYPAIR.substring(3, 6).trim());
            cstmt.setString(7, filter.FLAGI);
            cstmt.setString(8, filter.IN_FECHA);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                dblVALOR = rs01.getLong("VALOR");
                dblGROSS = rs01.getDouble("GROSS");
                lngQCPN = rs01.getLong("QTY");
                dblTotVMATCH = rs01.getLong("VALOR") - rs01.getLong("GROSS");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2858Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.IN_CARRIER = filter.IN_CARRIER;
                    objRtn.IN_CITYPAIR = filter.IN_CITYPAIR;
                    objRtn.FLAGI = filter.FLAGI;
                    objRtn.CARRIA = rs01.getString("CARRIA");
                    objRtn.strDescCarrier = rs01.getString("DESCAR");
                    objRtn.lngQCPN = rs01.getInt("QTY");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.VMATCH = rs01.getDouble("VALOR") - rs01.getDouble("GROSS");

                    objRtn.dblTotVALOR = dblVALOR;
                    objRtn.dblTotGROSS = dblGROSS;
                    objRtn.lngTotQCPN = lngQCPN;
                    objRtn.dblTotVMATCH = dblTotVMATCH;
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
    
     public List<A2858Filter> loadPX362SQP01366(A2858Filter filter) throws SQLException, Exception {

        List<A2858Filter> list = new ArrayList<>();
        A2858Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lngQCPN = 0;
        double dblVALOR = 0, dblGROSS = 0, dblVREJECT = 0;
        double dblVOVER = 0, dblVUNDER = 0, dblVMATCH = 0;

        if (filter.IN_CITYPAIR.trim().length() < 6) {
            filter.IN_CITYPAIR = Functions.fillString(filter.IN_CITYPAIR, 6);
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01366(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.CARRIA);
            cstmt.setString(5, filter.IN_CITYPAIR.substring(0, 3).trim());
            cstmt.setString(6, filter.IN_CITYPAIR.substring(3, 6).trim());
            cstmt.setString(7, filter.FLAGI);
             cstmt.setString(8, filter.IN_FECHA);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                dblVALOR = rs01.getLong("VALOR");
                dblGROSS = rs01.getDouble("GROSS");
                lngQCPN = rs01.getLong("QTY");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2858Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.CARRIA = filter.CARRIA;
                    objRtn.strDescCarrier = filter.strDescCarrier;
                    objRtn.IN_CITYPAIR = filter.IN_CITYPAIR;
                    if (!objRtn.IN_FECHA_FROM.equals(objRtn.IN_FECHA_TO)) {
                        objRtn.strFormatDate = Functions.getMonthConvert(objRtn.IN_FECHA_FROM) + " - " + Functions.getMonthConvert(objRtn.IN_FECHA_TO);
                    } else {
                        objRtn.strFormatDate = Functions.getMonthConvert(objRtn.IN_FECHA_FROM);
                    }
                    objRtn.CITYO = rs01.getString("CITYO");
                    objRtn.CITYD = rs01.getString("CITYD");
                    objRtn.strDescripcion = objRtn.CITYO + " - " + objRtn.CITYD;
                    objRtn.strDescCityO = rs01.getString("DESCCITYO").trim();
                    objRtn.strDescCityD = rs01.getString("DESCCITYD").trim();
                    objRtn.lngQCPN = rs01.getInt("QTY");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.GROSS = rs01.getDouble("GROSS");

                    objRtn.dblTotVALOR = dblVALOR;
                    objRtn.dblTotGROSS = dblGROSS;
                    objRtn.lngTotQCPN = lngQCPN;

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
}
