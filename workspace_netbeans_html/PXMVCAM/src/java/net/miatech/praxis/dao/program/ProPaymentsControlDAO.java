/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.program;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.IMF145Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.praxis.payment.filter.A3020Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author ggutierrez
 */
public class ProPaymentsControlDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ProPaymentsControlDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ProPaymentsControlDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3020Filter> loadPX418SQP02084(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0, QTYA = 0, QTYDIF = 0, QTYR = 0;
        double SVFOPUS1 = 0, SVFOPUSA = 0, SVFOPDIF = 0, SVFOPUSR = 0;
        String flag = "";

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02084(?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setString(7, filter.IN_SCOUNTRY);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_FINSUMO);
            cstmt01.setString(10, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 = rs01.getInt("QTY1");
                SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                QTYA = rs01.getInt("QTYA");
                SVFOPUSA = rs01.getDouble("SVFOPUSA");
                QTYR = rs01.getInt("QTYR");
                SVFOPUSR = rs01.getDouble("SVFOPUSR");
                QTYDIF = rs01.getInt("QTYDIF");
                SVFOPDIF = rs01.getDouble("SVFOPDIF");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;

                    objRtn.SDATE = rs01.getString("SDATE");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.SDATE);
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc1 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;
                    objRtn.QTYA = rs01.getInt("QTYA");
                    objRtn.SVFOPUSA = rs01.getDouble("SVFOPUSA");
                    objRtn.QTYR = rs01.getInt("QTYR");
                    objRtn.SVFOPUSR = rs01.getInt("SVFOPUSR");

                    objRtn.diff1 = rs01.getInt("QTYDIF");
                    objRtn.diff2 = rs01.getDouble("SVFOPDIF");
                    objRtn.perc3 = (rs01.getDouble("SVFOPUS1") > 0) ? (rs01.getDouble("SVFOPDIF") * 100) / rs01.getDouble("SVFOPUS1") : 0;

                    flag = rs01.getString("FLAG");
                    objRtn.strDescription4 = flag.substring(0, 1);
                    objRtn.strDescription = flag.substring(1);
                    if (!objRtn.strDescription4.equals("1")) {//cuando sea 0 esta abierto y contiene fecha
                        objRtn.strDescription = Functions.getMonthConvert(objRtn.strDescription);
                    }

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;
                    objRtn.totQTYA = QTYA;
                    objRtn.totSVFOPUSA = SVFOPUSA;
                    objRtn.totQTYR = QTYR;
                    objRtn.totSVFOPUSR = SVFOPUSR;
                    objRtn.totdiff1 = QTYDIF;
                    objRtn.totdiff2 = SVFOPDIF;
                    objRtn.totperc3 = (SVFOPUS1 > 0) ? (SVFOPDIF * 100) / SVFOPUS1 : 0;

                    lstRtn.add(objRtn);
                }
            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02085(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0, BN = 0, QTYA = 0, QTYDIF = 0, QTYR = 0;
        double SVFOPUS1 = 0, SVFOPUSA = 0, SVFOPDIF = 0, SVFOPUSR = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02085(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setInt(7, filter.IN_TOP);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_FINSUMO);
            cstmt01.setString(10, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 = rs01.getInt("QTY1");
                SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                QTYA = rs01.getInt("QTYA");
                SVFOPUSA = rs01.getDouble("SVFOPUSA");
                QTYR = rs01.getInt("QTYR");
                SVFOPUSR = rs01.getDouble("SVFOPUSR");
                QTYDIF = rs01.getInt("QTYDIF");
                SVFOPDIF = rs01.getDouble("SVFOPDIF");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TOP = filter.IN_TOP;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;

                    if (rs01.getString("SCOUNTRY").trim().isEmpty()) {
                        objRtn.SCOUNTRY = "**";
                        objRtn.strDescription = "(Empty)";
                    } else {
                        objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescription = rs01.getString("dscSCOUNTRY");
                    }
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc1 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;
                    objRtn.QTYA = rs01.getInt("QTYA");
                    objRtn.SVFOPUSA = rs01.getDouble("SVFOPUSA");
                    objRtn.perc2 = 100;
                    objRtn.QTYR = rs01.getInt("QTYR");
                    objRtn.SVFOPUSR = rs01.getInt("SVFOPUSR");

                    objRtn.diff1 = rs01.getInt("QTYDIF");
                    objRtn.diff2 = rs01.getDouble("SVFOPDIF");
                    objRtn.perc3 = (rs01.getDouble("SVFOPUS1") > 0) ? (rs01.getDouble("SVFOPDIF") * 100) / rs01.getDouble("SVFOPUS1") : 0;

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;
                    objRtn.totQTYA = QTYA;
                    objRtn.totSVFOPUSA = SVFOPUSA;
                    objRtn.totQTYR = QTYR;
                    objRtn.totSVFOPUSR = SVFOPUSR;

                    objRtn.totdiff1 = QTYDIF;
                    objRtn.totdiff2 = SVFOPDIF;
                    objRtn.totperc3 = (SVFOPUS1 > 0) ? (SVFOPDIF * 100) / SVFOPUS1 : 0;

                    lstRtn.add(objRtn);
                }
            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02086(A3020Filter filter) throws SQLException, Exception {
        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0, BN = 0, QTYA = 0, QTYDIF = 0, QTYR = 0;
        double SVFOPUS1 = 0, SVFOPUSA = 0, SVFOPDIF = 0, SVFOPUSR = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02086(?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setString(7, filter.IN_SCOUNTRY);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_FINSUMO);
            cstmt01.setString(10, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 = rs01.getInt("QTY1");
                SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                QTYA = rs01.getInt("QTYA");
                SVFOPUSA = rs01.getDouble("SVFOPUSA");
                QTYR = rs01.getInt("QTYR");
                SVFOPUSR = rs01.getDouble("SVFOPUSR");
                QTYDIF = rs01.getInt("QTYDIF");
                SVFOPDIF = rs01.getDouble("SVFOPDIF");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;
                    objRtn.SCARCOD = rs01.getString("SCARCOD");
                    objRtn.strDescription = rs01.getString("dscSCARCOD");
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc1 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;
                    objRtn.QTYA = rs01.getInt("QTYA");
                    objRtn.SVFOPUSA = rs01.getDouble("SVFOPUSA");
                    objRtn.perc2 = 100;
                    objRtn.QTYR = rs01.getInt("QTYR");
                    objRtn.SVFOPUSR = rs01.getInt("SVFOPUSR");

                    objRtn.diff1 = rs01.getInt("QTYDIF");
                    objRtn.diff2 = rs01.getDouble("SVFOPDIF");
                    objRtn.perc3 = (rs01.getDouble("SVFOPUS1") > 0) ? (rs01.getDouble("SVFOPDIF") * 100) / rs01.getDouble("SVFOPUS1") : 0;

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;
                    objRtn.totQTYA = QTYA;
                    objRtn.totSVFOPUSA = SVFOPUSA;
                    objRtn.totQTYR = QTYR;
                    objRtn.totSVFOPUSR = SVFOPUSR;

                    objRtn.totdiff1 = QTYDIF;
                    objRtn.totdiff2 = SVFOPDIF;
                    objRtn.totperc3 = (SVFOPUS1 > 0) ? (SVFOPDIF * 100) / SVFOPUS1 : 0;

                    lstRtn.add(objRtn);
                }
            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02087(A3020Filter filter) throws SQLException, Exception {
        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0, BN = 0, QTYA = 0, QTYDIF = 0, QTYR = 0;
        double SVFOPUS1 = 0, SVFOPUSA = 0, SVFOPDIF = 0, SVFOPUSR = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02087(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, "");//filter.IN_FTE; DESHABILITADO ENS 20180124
            cstmt01.setString(7, filter.IN_SCOUNTRY);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_FINSUMO);
            cstmt01.setString(10, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 = rs01.getInt("QTY1");
                SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                QTYA = rs01.getInt("QTYA");
                SVFOPUSA = rs01.getDouble("SVFOPUSA");
                QTYR = rs01.getInt("QTYR");
                SVFOPUSR = rs01.getDouble("SVFOPUSR");
                QTYDIF = rs01.getInt("QTYDIF");
                SVFOPDIF = rs01.getDouble("SVFOPDIF");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;
                    objRtn.FTE = rs01.getString("FTE");
                    objRtn.strDescription = rs01.getString("dscFTE");
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc1 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;
                    objRtn.QTYA = rs01.getInt("QTYA");
                    objRtn.SVFOPUSA = rs01.getDouble("SVFOPUSA");
                    objRtn.perc2 = 100;
                    objRtn.QTYR = rs01.getInt("QTYR");
                    objRtn.SVFOPUSR = rs01.getInt("SVFOPUSR");

                    objRtn.diff1 = rs01.getInt("QTYDIF");
                    objRtn.diff2 = rs01.getDouble("SVFOPDIF");
                    objRtn.perc3 = (rs01.getDouble("SVFOPUS1") > 0) ? (rs01.getDouble("SVFOPDIF") * 100) / rs01.getDouble("SVFOPUS1") : 0;

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;
                    objRtn.totQTYA = QTYA;
                    objRtn.totSVFOPUSA = SVFOPUSA;
                    objRtn.totQTYR = QTYR;
                    objRtn.totSVFOPUSR = SVFOPUSR;

                    objRtn.totdiff1 = QTYDIF;
                    objRtn.totdiff2 = SVFOPDIF;
                    objRtn.totperc3 = (SVFOPUS1 > 0) ? (SVFOPDIF * 100) / SVFOPUS1 : 0;

                    lstRtn.add(objRtn);
                }
            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02240(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0, QTYA = 0, QTYDIF = 0, QTYR = 0;
        double SVFOPUS1 = 0, SVFOPUSA = 0, SVFOPDIF = 0, SVFOPUSR = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02240(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setInt(7, filter.IN_TOP);
            cstmt01.setString(8, filter.IN_SCOUNTRY);
            cstmt01.setString(9, filter.IN_FLAG);
            cstmt01.setString(10, filter.IN_BANK);
            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 = rs01.getInt("QTY1");
                SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                QTYA = rs01.getInt("QTYA");
                SVFOPUSA = rs01.getDouble("SVFOPUSA");
                QTYR = rs01.getInt("QTYR");
                SVFOPUSR = rs01.getDouble("SVFOPUSR");
                QTYDIF = rs01.getInt("QTYDIF");
                SVFOPDIF = rs01.getDouble("SVFOPDIF");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TOP = filter.IN_TOP;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_BANK = filter.IN_BANK;

                    if (rs01.getString("SAGENT").trim().isEmpty()) {
                        objRtn.SAGENT = "**";
                        objRtn.strDescription = "CASH";
                        objRtn.strDescription2 = "";
                    } else {
                        objRtn.SAGENT = rs01.getString("SAGENT").trim();
                        objRtn.strDescription = rs01.getString("dscSAGENT");
                        objRtn.strDescription2 = rs01.getString("A003CANAL");
                    }

                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY");
                    objRtn.strDescription1 = rs01.getString("dscSCOUNTRY");
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc1 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;
                    objRtn.QTYA = rs01.getInt("QTYA");
                    objRtn.SVFOPUSA = rs01.getDouble("SVFOPUSA");
                    objRtn.perc2 = 100;
                    objRtn.QTYR = rs01.getInt("QTYR");
                    objRtn.SVFOPUSR = rs01.getInt("SVFOPUSR");

                    objRtn.diff1 = rs01.getInt("QTYDIF");
                    objRtn.diff2 = rs01.getDouble("SVFOPDIF");
                    objRtn.perc3 = (rs01.getDouble("SVFOPUS1") > 0) ? (rs01.getDouble("SVFOPDIF") * 100) / rs01.getDouble("SVFOPUS1") : 0;

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;
                    objRtn.totQTYA = QTYA;
                    objRtn.totSVFOPUSA = SVFOPUSA;
                    objRtn.totQTYR = QTYR;
                    objRtn.totSVFOPUSR = SVFOPUSR;

                    objRtn.totdiff1 = QTYDIF;
                    objRtn.totdiff2 = SVFOPDIF;
                    objRtn.totperc3 = (SVFOPUS1 > 0) ? (SVFOPDIF * 100) / SVFOPUS1 : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02146(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0;
        double SVFOPUS1 = 0;//SE QUITARON CALCULOS DE 11 A 15 A PEDIDO MPH 20180320
        int QDAY5 = 0, QDAY10 = 0, QDAY15 = 0, QOTHER = 0, QPAY = 0, QTOT = 0;//, QDAY20 = 0
        double ADAY5 = 0, ADAY10 = 0, ADAY15 = 0, AOTHER = 0, APAY = 0, ATOT = 0;//, ADAY20 = 0

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02146(?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setString(7, filter.IN_FINSUMO);
            cstmt01.setString(8, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 = rs01.getInt("QTY1");
                SVFOPUS1 = rs01.getDouble("SVFOPUS1");

                QDAY5 = rs01.getInt("QDAY5");
                ADAY5 = rs01.getDouble("ADAY5");
                QDAY10 = rs01.getInt("QDAY10");
                ADAY10 = rs01.getDouble("ADAY10");
                QDAY15 = rs01.getInt("QDAY15");
                ADAY15 = rs01.getDouble("ADAY15");
                //QDAY20 = rs01.getInt("QDAY20");
                //ADAY20 = rs01.getDouble("ADAY20");
                QOTHER = rs01.getInt("QOTHER");
                AOTHER = rs01.getDouble("AOTHER");

                QTOT = rs01.getInt("QTOT");
                ATOT = rs01.getDouble("ATOT");
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;

                    objRtn.SDATE = rs01.getString("SDATE");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.SDATE);

                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc1 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;

                    objRtn.QDAY5 = rs01.getInt("QDAY5");
                    objRtn.QDAY10 = rs01.getInt("QDAY10");
                    objRtn.QDAY15 = rs01.getInt("QDAY15");
                    //objRtn.QDAY20 = rs01.getInt("QDAY20");
                    objRtn.QOTHER = rs01.getInt("QOTHER");

                    objRtn.ADAY5 = rs01.getDouble("ADAY5");
                    objRtn.ADAY10 = rs01.getDouble("ADAY10");
                    objRtn.ADAY15 = rs01.getDouble("ADAY15");
                    //objRtn.ADAY20 = rs01.getDouble("ADAY20");
                    objRtn.AOTHER = rs01.getDouble("AOTHER");

                    objRtn.diff1 = rs01.getInt("QTOT");
                    objRtn.diff2 = rs01.getDouble("ATOT");
                    objRtn.perc3 = (rs01.getDouble("SVFOPUS1") > 0) ? (rs01.getDouble("ATOT") * 100) / rs01.getDouble("SVFOPUS1") : 0;

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;

                    objRtn.totQDAY5 = QDAY5;
                    objRtn.totQDAY10 = QDAY10;
                    objRtn.totQDAY15 = QDAY15;
                    //objRtn.totQDAY20 = QDAY20;
                    objRtn.totQOTHER = QOTHER;
                    //objRtn.totQPAY = QPAY;
                    objRtn.totADAY5 = ADAY5;
                    objRtn.totADAY10 = ADAY10;
                    objRtn.totADAY15 = ADAY15;
                    //objRtn.totADAY20 = ADAY20;
                    objRtn.totAOTHER = AOTHER;
                    //objRtn.totAPAY = APAY;

                    objRtn.totdiff1 = QTOT;
                    objRtn.totdiff2 = ATOT;
                    objRtn.totperc3 = (SVFOPUS1 > 0) ? (ATOT * 100) / SVFOPUS1 : 0;

                    objRtn.perc_5 = (SVFOPUS1 > 0) ? (ADAY5 * 100) / SVFOPUS1 : 0;
                    objRtn.perc_10 = (SVFOPUS1 > 0) ? (ADAY10 * 100) / SVFOPUS1 : 0;
                    objRtn.perc_15 = (SVFOPUS1 > 0) ? (ADAY15 * 100) / SVFOPUS1 : 0;
                    //objRtn.perc_20 = (SVFOPUS1 > 0) ? (ADAY20 * 100) / SVFOPUS1 : 0;
                    objRtn.perc_O20 = (SVFOPUS1 > 0) ? (AOTHER * 100) / SVFOPUS1 : 0;

                    lstRtn.add(objRtn);
                }
            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02147(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0;
        double SVFOPUS1 = 0;
        int QDAY5 = 0, QDAY10 = 0, QDAY15 = 0, QOTHER = 0, QPAY = 0, QTOT = 0;//, QDAY20 = 0
        double ADAY5 = 0, ADAY10 = 0, ADAY15 = 0, AOTHER = 0, APAY = 0, ATOT = 0;//, ADAY20 = 0

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02147(?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setString(7, filter.IN_FINSUMO);
            cstmt01.setString(8, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 = rs01.getInt("QTY1");
                SVFOPUS1 = rs01.getDouble("SVFOPUS1");

                QDAY5 = rs01.getInt("QDAY5");
                ADAY5 = rs01.getDouble("ADAY5");
                QDAY10 = rs01.getInt("QDAY10");
                ADAY10 = rs01.getDouble("ADAY10");
                QDAY15 = rs01.getInt("QDAY15");
                ADAY15 = rs01.getDouble("ADAY15");
                //QDAY20 = rs01.getInt("QDAY20");
                //ADAY20 = rs01.getDouble("ADAY20");
                QOTHER = rs01.getInt("QOTHER");
                AOTHER = rs01.getDouble("AOTHER");

                QTOT = rs01.getInt("QTOT");
                ATOT = rs01.getDouble("ATOT");
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;

                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY");
                    objRtn.strDescription = rs01.getString("NAME");

                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc1 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;

                    objRtn.QDAY5 = rs01.getInt("QDAY5");
                    objRtn.QDAY10 = rs01.getInt("QDAY10");
                    objRtn.QDAY15 = rs01.getInt("QDAY15");
                    //objRtn.QDAY20 = rs01.getInt("QDAY20");
                    objRtn.QOTHER = rs01.getInt("QOTHER");

                    objRtn.ADAY5 = rs01.getDouble("ADAY5");
                    objRtn.ADAY10 = rs01.getDouble("ADAY10");
                    objRtn.ADAY15 = rs01.getDouble("ADAY15");
                    //objRtn.ADAY20 = rs01.getDouble("ADAY20");
                    objRtn.AOTHER = rs01.getDouble("AOTHER");

                    objRtn.diff1 = rs01.getInt("QTOT");
                    objRtn.diff2 = rs01.getDouble("ATOT");
                    objRtn.perc3 = (rs01.getDouble("SVFOPUS1") > 0) ? (rs01.getDouble("ATOT") * 100) / rs01.getDouble("SVFOPUS1") : 0;

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;

                    objRtn.totQDAY5 = QDAY5;
                    objRtn.totQDAY10 = QDAY10;
                    objRtn.totQDAY15 = QDAY15;
                    //objRtn.totQDAY20 = QDAY20;
                    objRtn.totQOTHER = QOTHER;

                    objRtn.totADAY5 = ADAY5;
                    objRtn.totADAY10 = ADAY10;
                    objRtn.totADAY15 = ADAY15;
                    //objRtn.totADAY20 = ADAY20;
                    objRtn.totAOTHER = AOTHER;

                    objRtn.totdiff1 = QTOT;
                    objRtn.totdiff2 = ATOT;
                    objRtn.totperc3 = (SVFOPUS1 > 0) ? (ATOT * 100) / SVFOPUS1 : 0;

                    objRtn.perc_5 = (SVFOPUS1 > 0) ? (ADAY5 * 100) / SVFOPUS1 : 0;
                    objRtn.perc_10 = (SVFOPUS1 > 0) ? (ADAY10 * 100) / SVFOPUS1 : 0;
                    objRtn.perc_15 = (SVFOPUS1 > 0) ? (ADAY15 * 100) / SVFOPUS1 : 0;
                    //objRtn.perc_20 = (SVFOPUS1 > 0) ? (ADAY20 * 100) / SVFOPUS1 : 0;
                    objRtn.perc_O20 = (SVFOPUS1 > 0) ? (AOTHER * 100) / SVFOPUS1 : 0;

                    lstRtn.add(objRtn);
                }
            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02148(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0;
        double SVFOPUS1 = 0;
        int QDAY5 = 0, QDAY10 = 0, QDAY15 = 0, QOTHER = 0, QPAY = 0, QTOT = 0;//, QDAY20 = 0
        double ADAY5 = 0, ADAY10 = 0, ADAY15 = 0, AOTHER = 0, APAY = 0, ATOT = 0;//, ADAY20 = 0

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02148_1(?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setString(7, filter.IN_FINSUMO);
            cstmt01.setString(8, filter.IN_BANK);
            cstmt01.setString(9, filter.SCARCOD);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 = rs01.getInt("QTY1");
                SVFOPUS1 = rs01.getDouble("SVFOPUS1");

                QDAY5 = rs01.getInt("QDAY5");
                ADAY5 = rs01.getDouble("ADAY5");
                QDAY10 = rs01.getInt("QDAY10");
                ADAY10 = rs01.getDouble("ADAY10");
                QDAY15 = rs01.getInt("QDAY15");
                ADAY15 = rs01.getDouble("ADAY15");
                //QDAY20 = rs01.getInt("QDAY20");
                //ADAY20 = rs01.getDouble("ADAY20");
                QOTHER = rs01.getInt("QOTHER");
                AOTHER = rs01.getDouble("AOTHER");

                QTOT = rs01.getInt("QTOT");
                ATOT = rs01.getDouble("ATOT");
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;

                    objRtn.SCARCOD = rs01.getString("SCARCOD");
                    objRtn.strDescription = rs01.getString("NAMECAR");

                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc1 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;

                    objRtn.QDAY5 = rs01.getInt("QDAY5");
                    objRtn.QDAY10 = rs01.getInt("QDAY10");
                    objRtn.QDAY15 = rs01.getInt("QDAY15");
                    //objRtn.QDAY20 = rs01.getInt("QDAY20");
                    objRtn.QOTHER = rs01.getInt("QOTHER");
                    //objRtn.QPAY = rs01.getInt("QPAY");

                    objRtn.ADAY5 = rs01.getDouble("ADAY5");
                    objRtn.ADAY10 = rs01.getDouble("ADAY10");
                    objRtn.ADAY15 = rs01.getDouble("ADAY15");
                    //objRtn.ADAY20 = rs01.getDouble("ADAY20");
                    objRtn.AOTHER = rs01.getDouble("AOTHER");

                    objRtn.diff1 = rs01.getInt("QTOT");
                    objRtn.diff2 = rs01.getDouble("ATOT");
                    objRtn.perc3 = (rs01.getDouble("SVFOPUS1") > 0) ? (rs01.getDouble("ATOT") * 100) / rs01.getDouble("SVFOPUS1") : 0;

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;

                    objRtn.totQDAY5 = QDAY5;
                    objRtn.totQDAY10 = QDAY10;
                    objRtn.totQDAY15 = QDAY15;
                    //objRtn.totQDAY20 = QDAY20;
                    objRtn.totQOTHER = QOTHER;

                    objRtn.totADAY5 = ADAY5;
                    objRtn.totADAY10 = ADAY10;
                    objRtn.totADAY15 = ADAY15;
                    //objRtn.totADAY20 = ADAY20;
                    objRtn.totAOTHER = AOTHER;

                    objRtn.totdiff1 = QTOT;
                    objRtn.totdiff2 = ATOT;
                    objRtn.totperc3 = (SVFOPUS1 > 0) ? (ATOT * 100) / SVFOPUS1 : 0;

                    objRtn.perc_5 = (SVFOPUS1 > 0) ? (ADAY5 * 100) / SVFOPUS1 : 0;
                    objRtn.perc_10 = (SVFOPUS1 > 0) ? (ADAY10 * 100) / SVFOPUS1 : 0;
                    objRtn.perc_15 = (SVFOPUS1 > 0) ? (ADAY15 * 100) / SVFOPUS1 : 0;
                    //objRtn.perc_20 = (SVFOPUS1 > 0) ? (ADAY20 * 100) / SVFOPUS1 : 0;
                    objRtn.perc_O20 = (SVFOPUS1 > 0) ? (AOTHER * 100) / SVFOPUS1 : 0;

                    lstRtn.add(objRtn);
                }
            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02215(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0, QTYA = 0, QTYDIF = 0, QTYR = 0;
        double SVFOPUS1 = 0, SVFOPUSA = 0, SVFOPDIF = 0, SVFOPUSR = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02215(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setInt(7, filter.IN_TOP);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 = rs01.getInt("QTY1");
                SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                QTYA = rs01.getInt("QTYA");
                SVFOPUSA = rs01.getDouble("SVFOPUSA");
                QTYR = rs01.getInt("QTYR");
                SVFOPUSR = rs01.getDouble("SVFOPUSR");
                QTYDIF = rs01.getInt("QTYDIF");
                SVFOPDIF = rs01.getDouble("SVFOPDIF");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TOP = filter.IN_TOP;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_BANK = filter.IN_BANK;

                    if (rs01.getString("CODST").trim().isEmpty()) {
                        objRtn.SAGENT = "**";
                        objRtn.strDescription1 = "(Empty)";
                        objRtn.strDescription2 = "**";
                    } else {
                        objRtn.SAGENT = rs01.getString("CODST").trim();
                        objRtn.strDescription1 = rs01.getString("STATE").trim();
                        objRtn.strDescription2 = rs01.getString("ST_ALF").trim();
                    }

                    objRtn.FTE = rs01.getString("FTE");
                    if (objRtn.FTE.trim().equals("S")) {
                        objRtn.strDescription3 = "ASR";
                    } else if (objRtn.FTE.trim().equals("A")) {
                        objRtn.strDescription3 = "ARC";
                    } else if (objRtn.FTE.trim().equals("B")) {
                        objRtn.strDescription3 = "BSP";
                    }
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc1 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;
                    objRtn.QTYA = rs01.getInt("QTYA");
                    objRtn.SVFOPUSA = rs01.getDouble("SVFOPUSA");
                    objRtn.perc2 = 100;
                    objRtn.QTYR = rs01.getInt("QTYR");
                    objRtn.SVFOPUSR = rs01.getInt("SVFOPUSR");

                    objRtn.diff1 = rs01.getInt("QTYDIF");
                    objRtn.diff2 = rs01.getDouble("SVFOPDIF");
                    objRtn.perc3 = (rs01.getDouble("SVFOPUS1") > 0) ? (rs01.getDouble("SVFOPDIF") * 100) / rs01.getDouble("SVFOPUS1") : 0;

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;
                    objRtn.totQTYA = QTYA;
                    objRtn.totSVFOPUSA = SVFOPUSA;
                    objRtn.totQTYR = QTYR;
                    objRtn.totSVFOPUSR = SVFOPUSR;

                    objRtn.totdiff1 = QTYDIF;
                    objRtn.totdiff2 = SVFOPDIF;
                    objRtn.totperc3 = (SVFOPUS1 > 0) ? (SVFOPDIF * 100) / SVFOPUS1 : 0;

                    lstRtn.add(objRtn);
                }
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

        return lstRtn;
    }

    public List<A3020Filter> loadPX109SQP02245(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lista = new ArrayList<A3020Filter>(0);
        A3020Filter bean;

        int CUPONS = 0;
        double AMOUNT = 0, COMISION = 0, TAX = 0, AYQ = 0, AYR = 0, FARE = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02245(?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAYMENT);
            cstmt.setString(5, filter.IN_TDOC);//trncu
            cstmt.setString(6, filter.IN_FTE);
            cstmt.setInt(7, filter.IN_TOP);
            cstmt.setString(8, filter.IN_SCOUNTRY);
            cstmt.setString(9, filter.IN_FLAG);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                CUPONS = rst.getInt("QTKTS1");
                AMOUNT = rst.getDouble("AMOUNT1");
                FARE = rst.getDouble("FARE");
                TAX = rst.getDouble("TAX");
                AYQ = rst.getDouble("AYQ");
                AYR = rst.getDouble("AYR");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new A3020Filter();
                    bean.FECHA = rst.getString("DSALES");
                    bean.strFormatDate = Functions.getMonthConvert6(bean.FECHA);

                    bean.QTY1 = rst.getInt("QTKTS1");
                    bean.SVFOPUS1 = rst.getDouble("AMOUNT1");
                    bean.FARE = rst.getDouble("FARE");
                    bean.TAX1 = rst.getDouble("TAX");
                    bean.AYQ1 = rst.getDouble("AYQ");
                    bean.AYR1 = rst.getDouble("AYR");

                    bean.totQTY1 = CUPONS;
                    bean.totSVFOPUS1 = AMOUNT;
                    bean.totCOMISION = COMISION;
                    bean.totFARE = FARE;
                    bean.totTAX1 = TAX;
                    bean.totAYQ1 = AYQ;
                    bean.totAYR1 = AYR;

                    bean.perc1 = (AMOUNT > 0) ? (rst.getDouble("AMOUNT1") * 100) / AMOUNT : 0;
                    if (rst.getDouble("AMOUNT1") < 0) {
                        bean.perc1 = bean.perc1 * -1.0;
                    }

                    bean.perc3 = (AMOUNT > 0) ? (TAX * 100.0) / AMOUNT : 0;
                    bean.perc4 = (AMOUNT > 0) ? (AYQ * 100.0) / AMOUNT : 0;
                    bean.perc_10 = (AMOUNT > 0) ? (AYR * 100.0) / AMOUNT : 0;
                    //bean.perc2 = (AMOUNT > 0) ? (FARE * 100.0) / AMOUNT : 0;
                    //SE SETEA PARA Q SIEMPRE LA SUMA DE 100 A PEDIDO DE MPH 20180212
                    bean.perc2 = 100 - (bean.perc3 + bean.perc4 + bean.perc_10);

                    lista.add(bean);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return lista;
    }

    public List<A3020Filter> loadPX418SQP02349(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0;
        double SVFOPUS1 = 0;

        HashMap POSDataCodes = new HashMap();
        POSDataCodes.put("**", "(Empty)");
        POSDataCodes.put("00", "Unknown");
        POSDataCodes.put("01", "Manual / Key Entry");
        POSDataCodes.put("02", "Magnetic Stripe,track 2 data will ignore");
        POSDataCodes.put("04", "OCR Code Read");
        POSDataCodes.put("05", "Chip EMV");
        POSDataCodes.put("07", "Contactless M / Chip or Visa Smart Card read");
        POSDataCodes.put("10", "Scanned MICR / check");
        POSDataCodes.put("79", "Chip Card capable - manual PAN read");
        POSDataCodes.put("80", "Fallback");
        POSDataCodes.put("81", "E-commerce MC (Internet)");
        POSDataCodes.put("82", "Contactless Mobile Commerce device");
        POSDataCodes.put("85", "Internet (not an ISO value)");
        POSDataCodes.put("90", "Deslizada (Magnetic stripe reading - CVV/CVC certified)");
        POSDataCodes.put("91", "Contactless magnetic stripe read");
        POSDataCodes.put("95", "Integrated circuit card read - CVV data unreliable");

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02349(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setString(7, filter.IN_SCOUNTRY);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_FINSUMO);
            cstmt01.setString(10, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 += rs01.getInt("CANT");
                SVFOPUS1 += rs01.getDouble("SVFOP");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;

                    if (rs01.getString("PEM").trim().isEmpty()) {
                        objRtn.PEM = "**";
                    } else {
                        objRtn.PEM = rs01.getString("PEM").trim();
                    }

                    if (POSDataCodes.containsKey(objRtn.PEM)) {
                        objRtn.strDescription = POSDataCodes.get(objRtn.PEM).toString();
                    } else {
                        objRtn.strDescription = objRtn.PEM;
                    }

                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("CANT");
                    //objRtn.perc1 = (QTY1 > 0) ? (objRtn.QTY1 * 100) / QTY1 : 0;
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOP");
                    //objRtn.perc2 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;
                    try {
                        objRtn.perc1 = (QTY1 > 0) ? (objRtn.QTY1 * 100) / QTY1 : 0;
                        objRtn.perc2 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;
                    } catch (Exception e) {
                    }

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;

                    lstRtn.add(objRtn);
                }

            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02315(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0;
        double SVFOPUS1 = 0;
        String strFecha = "";
        boolean hayData = false;
        HashMap hmTotFecha = new HashMap();
        HashMap POSDataCodes = new HashMap();
        POSDataCodes.put("**", "(Empty)");
        POSDataCodes.put("00", "Unknown");
        POSDataCodes.put("01", "Manual / Key Entry");
        POSDataCodes.put("02", "Magnetic Stripe,track 2 data will ignore");
        POSDataCodes.put("04", "OCR Code Read");
        POSDataCodes.put("05", "Chip EMV");
        POSDataCodes.put("07", "Contactless M / Chip or Visa Smart Card read");
        POSDataCodes.put("10", "Scanned MICR / check");
        POSDataCodes.put("79", "Chip Card capable - manual PAN read");
        POSDataCodes.put("80", "Fallback");
        POSDataCodes.put("81", "E-commerce MC (Internet)");
        POSDataCodes.put("82", "Contactless Mobile Commerce device");
        POSDataCodes.put("85", "Internet (not an ISO value)");
        POSDataCodes.put("90", "Deslizada (Magnetic stripe reading - CVV/CVC certified)");
        POSDataCodes.put("91", "Contactless magnetic stripe read");
        POSDataCodes.put("95", "Integrated circuit card read - CVV data unreliable");

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02315(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setString(7, filter.IN_SCOUNTRY);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_FINSUMO);
            cstmt01.setString(10, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A3020Filter();
                objRtn.QTY1 = rs01.getInt("CANT");
                objRtn.SVFOPUS1 = rs01.getDouble("SVFOP");
                hmTotFecha.put(rs01.getString("FECHA").trim() + rs01.getString("SCURRENCY").trim(), objRtn);

                QTY1 += rs01.getInt("CANT");
                SVFOPUS1 += rs01.getDouble("SVFOP");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    hayData = true;

                    /*if (!strFecha.isEmpty()){
                     System.out.println(strFecha.substring(0, 6));
                     System.out.println(strFecha.substring(6));
                     }*/
                    if (!strFecha.isEmpty() && (!rs01.getString("FECHA").trim().equals(strFecha.substring(0, 6))
                            || !rs01.getString("SCURRENCY").trim().equals(strFecha.substring(6)))) {
                        //INCLUYENDO REGISTRO TOTAL
                        objRtn = new A3020Filter();
                        objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                        objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                        objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                        objRtn.IN_TDOC = filter.IN_TDOC;
                        objRtn.IN_FTE = filter.IN_FTE;
                        objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                        objRtn.IN_FLAG = filter.IN_FLAG;
                        objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                        objRtn.IN_BANK = filter.IN_BANK;

                        objRtn.strDescription = "Total";

                        objRtn.SCURRENCY = strFecha.substring(6, 9);
                        objRtn.QTY1 = ((A3020Filter) hmTotFecha.get(strFecha)).QTY1;
                        objRtn.perc1 = 100;
                        objRtn.SVFOPUS1 = ((A3020Filter) hmTotFecha.get(strFecha)).SVFOPUS1;
                        objRtn.perc2 = 100;

                        objRtn.totQTY1 = QTY1;
                        objRtn.totSVFOPUS1 = SVFOPUS1;
                        lstRtn.add(objRtn);
                    }

                    strFecha = rs01.getString("FECHA").trim() + rs01.getString("SCURRENCY").trim();

                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;
                    objRtn.FECHA = rs01.getString("FECHA").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECHA);

                    if (rs01.getString("PEM").trim().isEmpty()) {
                        objRtn.PEM = "**";
                    } else {
                        objRtn.PEM = rs01.getString("PEM").trim();
                    }

                    if (POSDataCodes.containsKey(objRtn.PEM)) {
                        objRtn.strDescription = POSDataCodes.get(objRtn.PEM).toString();
                    } else {
                        objRtn.strDescription = objRtn.PEM;
                    }

                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("CANT");
                    //objRtn.perc1 = (QTY1 > 0) ? (objRtn.QTY1 * 100) / QTY1 : 0;
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOP");
                    //objRtn.perc2 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;
                    try {
                        objRtn.perc1 = (((A3020Filter) hmTotFecha.get(strFecha)).QTY1 > 0) ? (objRtn.QTY1 * 100) / ((A3020Filter) hmTotFecha.get(strFecha)).QTY1 : 0;
                        objRtn.perc2 = (((A3020Filter) hmTotFecha.get(strFecha)).SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / ((A3020Filter) hmTotFecha.get(strFecha)).SVFOPUS1 : 0;
                    } catch (Exception e) {
                    }

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;

                    lstRtn.add(objRtn);
                }

                if (hayData) {
                    //INCLUYENDO REGISTRO TOTAL
                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;

                    objRtn.strDescription = "Total";

                    objRtn.SCURRENCY = strFecha.substring(6, 9);
                    objRtn.QTY1 = ((A3020Filter) hmTotFecha.get(strFecha)).QTY1;
                    objRtn.perc1 = 100;
                    objRtn.SVFOPUS1 = ((A3020Filter) hmTotFecha.get(strFecha)).SVFOPUS1;
                    objRtn.perc2 = 100;

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;
                    lstRtn.add(objRtn);
                }

            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02323(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0;
        double SVFOPUS1 = 0;
        String strBanco = "", strBancoOpt = "", strTitulo = "";
        if (!filter.strFormatDate.isEmpty()) {
            strTitulo = "Sales Date : " + filter.strFormatDate + " - POS Entry Mode : " + filter.strDescription;
        } else {
            strTitulo = "POS Entry Mode : " + filter.strDescription;
        }

        boolean hayData = false;
        HashMap hmTotBank = new HashMap();

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02323(?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.FECHA);
            cstmt01.setString(5, filter.PEM);
            cstmt01.setString(6, filter.IN_PAYMENT);
            cstmt01.setString(7, filter.IN_TDOC);
            cstmt01.setString(8, filter.IN_FTE);
            cstmt01.setString(9, filter.IN_SCOUNTRY);
            cstmt01.setString(10, filter.IN_FLAG);
            cstmt01.setString(11, filter.IN_FINSUMO);
            cstmt01.setString(12, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A3020Filter();
                objRtn.QTY1 = rs01.getInt("CANT");
                objRtn.SVFOPUS1 = rs01.getDouble("SVFOP");

                if (rs01.getString("CODEBANK").trim().isEmpty()) {
                    hmTotBank.put("**" + rs01.getString("SCURRENCY").trim(), objRtn);
                } else {
                    hmTotBank.put(rs01.getString("CODEBANK").trim() + rs01.getString("SCURRENCY").trim(), objRtn);
                }

                QTY1 += rs01.getInt("CANT");
                SVFOPUS1 += rs01.getDouble("SVFOP");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    hayData = true;
                    if (rs01.getString("CODEBANK").trim().isEmpty()) {
                        strBancoOpt = "**";
                    } else {
                        strBancoOpt = rs01.getString("CODEBANK").trim();
                    }

                    if (!strBanco.isEmpty() && (!strBancoOpt.equals(strBanco.substring(0, 2))
                            || !rs01.getString("SCURRENCY").trim().equals(strBanco.substring(2)))) {
                        //INCLUYENDO REGISTRO TOTAL
                        objRtn = new A3020Filter();
                        objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                        objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                        objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                        objRtn.IN_TDOC = filter.IN_TDOC;
                        objRtn.IN_FTE = filter.IN_FTE;
                        objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                        objRtn.IN_FLAG = filter.IN_FLAG;
                        objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                        objRtn.IN_BANK = filter.IN_BANK;
                        objRtn.FECHA = filter.FECHA;
                        objRtn.PEM = filter.PEM;
                        objRtn.strFormatDate = filter.strFormatDate;
                        objRtn.strDescription = filter.strDescription;

                        objRtn.strDescription2 = "Total";
                        objRtn.strTitulo = strTitulo;

                        objRtn.SCURRENCY = strBanco.substring(2);
                        objRtn.QTY1 = ((A3020Filter) hmTotBank.get(strBanco)).QTY1;
                        objRtn.perc1 = 100;
                        objRtn.SVFOPUS1 = ((A3020Filter) hmTotBank.get(strBanco)).SVFOPUS1;
                        objRtn.perc2 = 100;

                        objRtn.totQTY1 = QTY1;
                        objRtn.totSVFOPUS1 = SVFOPUS1;
                        lstRtn.add(objRtn);
                    }

                    strBanco = strBancoOpt + rs01.getString("SCURRENCY").trim();

                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;
                    objRtn.FECHA = filter.FECHA;
                    objRtn.PEM = filter.PEM;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.strDescription = filter.strDescription;
                    objRtn.strTitulo = strTitulo;

                    //==========================================================
                    objRtn.CODEBANK = strBancoOpt;
                    if (rs01.getString("dscCODEBANK").trim().isEmpty()) {
                        objRtn.strDescription1 = objRtn.CODEBANK + " - (Empty)";
                    } else {
                        objRtn.strDescription1 = rs01.getString("dscCODEBANK").trim();
                    }
                    //==========================================================

                    //==========================================================
                    if (rs01.getString("SCARCOD").trim().isEmpty()) {
                        objRtn.SCARCOD = "**";
                    } else {
                        objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    }
                    if (rs01.getString("dscSCARCOD").trim().isEmpty()) {
                        objRtn.strDescription2 = objRtn.SCARCOD + " - (Empty)";
                    } else {
                        objRtn.strDescription2 = rs01.getString("dscSCARCOD").trim();
                    }
                    //==========================================================

                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("CANT");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOP");
                    try {
                        objRtn.perc1 = (((A3020Filter) hmTotBank.get(strBanco)).QTY1 > 0) ? (objRtn.QTY1 * 100) / ((A3020Filter) hmTotBank.get(strBanco)).QTY1 : 0;
                        objRtn.perc2 = (((A3020Filter) hmTotBank.get(strBanco)).SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / ((A3020Filter) hmTotBank.get(strBanco)).SVFOPUS1 : 0;
                    } catch (Exception e) {
                    }

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;

                    lstRtn.add(objRtn);
                }

                if (hayData) {
                    //INCLUYENDO REGISTRO TOTAL
                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;
                    objRtn.FECHA = filter.FECHA;
                    objRtn.PEM = filter.PEM;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.strDescription = filter.strDescription;

                    objRtn.strDescription2 = "Total";
                    objRtn.strTitulo = strTitulo;

                    objRtn.SCURRENCY = strBanco.substring(2);
                    objRtn.QTY1 = ((A3020Filter) hmTotBank.get(strBanco)).QTY1;
                    objRtn.perc1 = 100;
                    objRtn.SVFOPUS1 = ((A3020Filter) hmTotBank.get(strBanco)).SVFOPUS1;
                    objRtn.perc2 = 100;

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;
                    lstRtn.add(objRtn);
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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02324(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0;
        double SVFOPUS1 = 0;
        String strTitulo = filter.strTitulo + " - Bank : " + filter.strDescription1 + " - Credit Card : " + filter.strDescription2;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02324(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.FECHA);
            cstmt01.setString(5, filter.PEM);
            cstmt01.setString(6, filter.CODEBANK);
            cstmt01.setString(7, filter.SCARCOD);
            cstmt01.setString(8, filter.IN_PAYMENT);
            cstmt01.setString(9, filter.IN_TDOC);
            cstmt01.setString(10, filter.IN_FTE);
            cstmt01.setString(11, filter.IN_SCOUNTRY);
            cstmt01.setString(12, filter.IN_FLAG);
            cstmt01.setString(13, filter.IN_FINSUMO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTY1 += rs01.getInt("CANT");
                SVFOPUS1 += rs01.getDouble("SVFOP");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.FECHA = filter.FECHA;
                    objRtn.PEM = filter.PEM;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.strDescription = filter.strDescription;
                    objRtn.strTitulo = strTitulo;
                    objRtn.CODEBANK = filter.CODEBANK;
                    objRtn.strDescription1 = filter.strDescription1;
                    objRtn.SCARCOD = filter.SCARCOD;
                    objRtn.strDescription2 = filter.strDescription2;

                    if (rs01.getString("SAGENT").trim().isEmpty()) {
                        objRtn.SAGENT = "**";
                    } else {
                        objRtn.SAGENT = rs01.getString("SAGENT").trim();
                    }

                    if (rs01.getString("dscSAGENT").trim().isEmpty()) {
                        objRtn.strDescription3 = objRtn.SAGENT + " - (Empty)";
                    } else {
                        objRtn.strDescription3 = rs01.getString("dscSAGENT").trim();
                    }

                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("CANT");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOP");
                    try {
                        objRtn.perc1 = (QTY1 > 0) ? (objRtn.QTY1 * 100) / QTY1 : 0;
                        objRtn.perc2 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;
                    } catch (Exception e) {
                    }

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;

                    lstRtn.add(objRtn);
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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02325(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0, QTY2 = 0, QTYA = 0, QTYSABO = 0;
        double SVFOPUS1 = 0, SVFOPUS2 = 0, SVFOPUSA = 0, SVFOPUSABO = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02325_1(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setString(7, filter.IN_SCOUNTRY);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_FINSUMO);
            cstmt01.setString(10, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 += rs01.getInt("QTY1");
                SVFOPUS1 += rs01.getDouble("SVFOPUS1");

                QTY2 += rs01.getInt("QTY2");
                SVFOPUS2 += rs01.getDouble("SVFOPUS2");

                QTYA += rs01.getInt("QTYA");
                SVFOPUSA += rs01.getDouble("SVFOPUSA");

                QTYSABO += rs01.getInt("QTYSABO");
                SVFOPUSABO += rs01.getDouble("SVFOPUSABO");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;

                    if (rs01.getString("SCOUNTRY").trim().isEmpty()) {
                        objRtn.SCOUNTRY = "**";
                        objRtn.strDescription = "(Empty)";
                    } else {
                        objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescription = rs01.getString("dscSCOUNTRY").trim();
                    }

                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc4 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;

                    //FASE 1 - ACCB
                    objRtn.QTY2 = rs01.getInt("QTY2");
                    objRtn.SVFOPUS2 = rs01.getDouble("SVFOPUS2");
                    objRtn.perc1 = (objRtn.SVFOPUS1 > 0) ? (objRtn.SVFOPUS2 * 100) / objRtn.SVFOPUS1 : 0;
                    if (objRtn.perc1 >= 99) {
//                        objRtn.strImagen1 = "assets/icons/16x16/greenP.png";
                        objRtn.strImagen1 = "resources/img/icon/16x16/circle_green.png";

                    } else if (objRtn.perc1 == 0) {
//                        objRtn.strImagen1 = "assets/icons/16x16/redP.png";
                        objRtn.strImagen1 = "resources/img/icon/16x16/circle_red.png";
                    } else {
//                        objRtn.strImagen1 = "assets/icons/16x16/ambar.png";
                        objRtn.strImagen1 = "resources/img/icon/16x16/Circle_Yellow.png";
                    }

                    //FASE 2 - ACEPTADO
                    objRtn.QTYA = rs01.getInt("QTYA");
                    objRtn.SVFOPUSA = rs01.getDouble("SVFOPUSA");
                    objRtn.perc2 = (objRtn.SVFOPUS1 > 0) ? (objRtn.SVFOPUSA * 100) / objRtn.SVFOPUS1 : 0;
                    if (objRtn.perc2 >= 99) {
//                        objRtn.strImagen2 = "assets/icons/16x16/greenP.png";
                        objRtn.strImagen2 = "resources/img/icon/16x16/circle_green.png";
                    } else if (objRtn.perc2 == 0) {
//                        objRtn.strImagen2 = "assets/icons/16x16/redP.png";
                        objRtn.strImagen2 = "resources/img/icon/16x16/circle_red.png";
                    } else {
//                        objRtn.strImagen2 = "assets/icons/16x16/ambar.png";
                        objRtn.strImagen2 = "resources/img/icon/16x16/Circle_Yellow.png";
                    }

                    //FASE 3 - PAGADO
                    objRtn.QTYSABO = rs01.getInt("QTYSABO");
                    objRtn.SVFOPUSABO = rs01.getDouble("SVFOPUSABO");
                    objRtn.perc3 = (objRtn.SVFOPUS1 > 0) ? (objRtn.SVFOPUSABO * 100) / objRtn.SVFOPUS1 : 0;
                    if (objRtn.perc3 >= 99) {
//                        objRtn.strImagen3 = "assets/icons/16x16/greenP.png";
                        objRtn.strImagen3 = "resources/img/icon/16x16/circle_green.png";
                    } else if (objRtn.perc3 == 0) {
//                        objRtn.strImagen3 = "assets/icons/16x16/redP.png";
                        objRtn.strImagen3 = "resources/img/icon/16x16/circle_red.png";
                    } else {
//                        objRtn.strImagen3 = "assets/icons/16x16/ambar.png";
                        objRtn.strImagen3 = "resources/img/icon/16x16/Circle_Yellow.png";
                    }

                    objRtn.diff1 = objRtn.QTY2 - objRtn.QTY1;
                    objRtn.diff2 = objRtn.QTYA - objRtn.QTY1;
                    objRtn.diff3 = objRtn.QTYSABO - objRtn.QTY1;

                    objRtn.DiffConci1 = objRtn.SVFOPUS2 - objRtn.SVFOPUS1;
                    objRtn.DiffConci2 = objRtn.SVFOPUSA - objRtn.SVFOPUS1;
                    objRtn.DiffConci3 = objRtn.SVFOPUSABO - objRtn.SVFOPUS1;

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;
                    objRtn.totQTY2 = QTY2;
                    objRtn.totSVFOPUS2 = SVFOPUS2;
                    objRtn.totQTYA = QTYA;
                    objRtn.totSVFOPUSA = SVFOPUSA;
                    objRtn.totQTYSABO = QTYSABO;
                    objRtn.totSVFOPUSABO = SVFOPUSABO;

                    objRtn.totdiff1 = objRtn.totQTY2 - objRtn.totQTY1;
                    objRtn.totdiff2 = objRtn.totQTYA - objRtn.totQTY1;
                    objRtn.totdiff3 = objRtn.totQTYSABO - objRtn.totQTY1;

                    objRtn.TotDiffConci1 = objRtn.totSVFOPUS2 - objRtn.totSVFOPUS1;
                    objRtn.TotDiffConci2 = objRtn.totSVFOPUSA - objRtn.totSVFOPUS1;
                    objRtn.TotDiffConci3 = objRtn.totSVFOPUSABO - objRtn.totSVFOPUS1;

                    lstRtn.add(objRtn);
                }

            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02326(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0, QTY2 = 0, QTYA = 0, QTYSABO = 0;
        double SVFOPUS1 = 0, SVFOPUS2 = 0, SVFOPUSA = 0, SVFOPUSABO = 0;
        String strTitulo = "Country : " + filter.strDescription;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02326_1(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setString(7, filter.SCOUNTRY);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_FINSUMO);
            cstmt01.setString(10, filter.IN_BANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 += rs01.getInt("QTY1");
                SVFOPUS1 += rs01.getDouble("SVFOPUS1");

                QTY2 += rs01.getInt("QTY2");
                SVFOPUS2 += rs01.getDouble("SVFOPUS2");

                QTYA += rs01.getInt("QTYA");
                SVFOPUSA += rs01.getDouble("SVFOPUSA");

                QTYSABO += rs01.getInt("QTYSABO");
                SVFOPUSABO += rs01.getDouble("SVFOPUSABO");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.IN_BANK = filter.IN_BANK;
                    objRtn.SCOUNTRY = filter.SCOUNTRY;
                    objRtn.strDescription = filter.strDescription;
                    objRtn.strTitulo = strTitulo;

                    if (rs01.getString("CODEBANK").trim().isEmpty()) {
                        objRtn.CODEBANK = "**";
                        objRtn.strDescription1 = "(Empty)";
                    } else {
                        objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                        objRtn.strDescription1 = rs01.getString("dscCODEBANK").trim();
                    }

                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc4 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;

                    //FASE 1 - ACCB
                    objRtn.QTY2 = rs01.getInt("QTY2");
                    objRtn.SVFOPUS2 = rs01.getDouble("SVFOPUS2");
                    objRtn.perc1 = (objRtn.SVFOPUS1 > 0) ? (objRtn.SVFOPUS2 * 100) / objRtn.SVFOPUS1 : 0;
                    if (objRtn.perc1 >= 99) {
//                        objRtn.strImagen1 = "assets/icons/16x16/greenP.png";
                        objRtn.strImagen1 = "resources/img/icon/16x16/circle_green.png";
                    } else if (objRtn.perc1 == 0) {
//                        objRtn.strImagen1 = "assets/icons/16x16/redP.png";
                        objRtn.strImagen1 = "resources/img/icon/16x16/circle_red.png";
                    } else {
//                        objRtn.strImagen1 = "assets/icons/16x16/ambar.png";
                        objRtn.strImagen1 = "resources/img/icon/16x16/Circle_Yellow.png";
                    }

                    //FASE 2 - ACEPTADO
                    objRtn.QTYA = rs01.getInt("QTYA");
                    objRtn.SVFOPUSA = rs01.getDouble("SVFOPUSA");
                    objRtn.perc2 = (objRtn.SVFOPUS1 > 0) ? (objRtn.SVFOPUSA * 100) / objRtn.SVFOPUS1 : 0;
                    if (objRtn.perc2 >= 99) {
//                        objRtn.strImagen2 = "assets/icons/16x16/greenP.png";
                        objRtn.strImagen2 = "resources/img/icon/16x16/circle_green.png";
                    } else if (objRtn.perc2 == 0) {
//                        objRtn.strImagen2 = "assets/icons/16x16/redP.png";
                        objRtn.strImagen2 = "resources/img/icon/16x16/circle_red.png";
                    } else {
//                        objRtn.strImagen2 = "assets/icons/16x16/ambar.png";
                        objRtn.strImagen2 = "resources/img/icon/16x16/Circle_Yellow.png";
                    }

                    //FASE 3 - PAGADO
                    objRtn.QTYSABO = rs01.getInt("QTYSABO");
                    objRtn.SVFOPUSABO = rs01.getDouble("SVFOPUSABO");
                    objRtn.perc3 = (objRtn.SVFOPUS1 > 0) ? (objRtn.SVFOPUSABO * 100) / objRtn.SVFOPUS1 : 0;
                    if (objRtn.perc3 >= 99) {
//                        objRtn.strImagen3 = "assets/icons/16x16/greenP.png";
                        objRtn.strImagen3 = "resources/img/icon/16x16/circle_green.png";
                    } else if (objRtn.perc3 == 0) {
//                        objRtn.strImagen3 = "assets/icons/16x16/redP.png";
                        objRtn.strImagen3 = "resources/img/icon/16x16/circle_red.png";
                    } else {
//                        objRtn.strImagen3 = "assets/icons/16x16/ambar.png";
                        objRtn.strImagen3 = "resources/img/icon/16x16/Circle_Yellow.png";
                    }

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;
                    objRtn.totQTY2 = QTY2;
                    objRtn.totSVFOPUS2 = SVFOPUS2;
                    objRtn.totQTYA = QTYA;
                    objRtn.totSVFOPUSA = SVFOPUSA;
                    objRtn.totQTYSABO = QTYSABO;
                    objRtn.totSVFOPUSABO = SVFOPUSABO;

                    objRtn.diff1 = objRtn.QTY2 - objRtn.QTY1;
                    objRtn.diff2 = objRtn.QTYA - objRtn.QTY1;
                    objRtn.diff3 = objRtn.QTYSABO - objRtn.QTY1;

                    objRtn.DiffConci1 = objRtn.SVFOPUS2 - objRtn.SVFOPUS1;
                    objRtn.DiffConci2 = objRtn.SVFOPUSA - objRtn.SVFOPUS1;
                    objRtn.DiffConci3 = objRtn.SVFOPUSABO - objRtn.SVFOPUS1;

                    objRtn.totdiff1 = objRtn.totQTY2 - objRtn.totQTY1;
                    objRtn.totdiff2 = objRtn.totQTYA - objRtn.totQTY1;
                    objRtn.totdiff3 = objRtn.totQTYSABO - objRtn.totQTY1;

                    objRtn.TotDiffConci1 = objRtn.totSVFOPUS2 - objRtn.totSVFOPUS1;
                    objRtn.TotDiffConci2 = objRtn.totSVFOPUSA - objRtn.totSVFOPUS1;
                    objRtn.TotDiffConci3 = objRtn.totSVFOPUSABO - objRtn.totSVFOPUS1;

                    lstRtn.add(objRtn);
                }

            }

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

        return lstRtn;
    }

    public List<A3020Filter> loadPX418SQP02327(A3020Filter filter) throws SQLException, Exception {

        List<A3020Filter> lstRtn = new ArrayList<A3020Filter>(0);
        A3020Filter objRtn;
        int QTY1 = 0, QTY2 = 0, QTYA = 0, QTYSABO = 0;
        double SVFOPUS1 = 0, SVFOPUS2 = 0, SVFOPUSA = 0, SVFOPUSABO = 0;
        String strTitulo = filter.strTitulo + " - Bank : " + filter.strDescription1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02327(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAYMENT);
            cstmt01.setString(5, filter.IN_TDOC);
            cstmt01.setString(6, filter.IN_FTE);
            cstmt01.setString(7, filter.SCOUNTRY);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_FINSUMO);
            cstmt01.setString(10, filter.CODEBANK);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY1 += rs01.getInt("QTY1");
                SVFOPUS1 += rs01.getDouble("SVFOPUS1");

                QTY2 += rs01.getInt("QTY2");
                SVFOPUS2 += rs01.getDouble("SVFOPUS2");

                QTYA += rs01.getInt("QTYA");
                SVFOPUSA += rs01.getDouble("SVFOPUSA");

                QTYSABO += rs01.getInt("QTYSABO");
                SVFOPUSABO += rs01.getDouble("SVFOPUSABO");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new A3020Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    objRtn.IN_FLAG = filter.IN_FLAG;
                    objRtn.IN_FINSUMO = filter.IN_FINSUMO;
                    objRtn.SCOUNTRY = filter.SCOUNTRY;
                    objRtn.strDescription = filter.strDescription;
                    objRtn.CODEBANK = filter.CODEBANK;
                    objRtn.strDescription1 = filter.strDescription1;

                    objRtn.strTitulo = strTitulo;
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.strDescription2 = rs01.getString("dscSCARCOD").trim();

                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOPUS1 = rs01.getDouble("SVFOPUS1");
                    objRtn.perc4 = (SVFOPUS1 > 0) ? (objRtn.SVFOPUS1 * 100) / SVFOPUS1 : 0;

                    //FASE 1 - ACCB
                    objRtn.QTY2 = rs01.getInt("QTY2");
                    objRtn.SVFOPUS2 = rs01.getDouble("SVFOPUS2");
                    objRtn.perc1 = (objRtn.SVFOPUS1 > 0) ? (objRtn.SVFOPUS2 * 100) / objRtn.SVFOPUS1 : 0;
                    if (objRtn.perc1 >= 99) {
//                        objRtn.strImagen1 = "assets/icons/16x16/greenP.png";
                        objRtn.strImagen1 = "resources/img/icon/16x16/circle_green.png";
                    } else if (objRtn.perc1 == 0) {
//                        objRtn.strImagen1 = "assets/icons/16x16/redP.png";
                        objRtn.strImagen1 = "resources/img/icon/16x16/circle_red.png";
                    } else {
//                        objRtn.strImagen1 = "assets/icons/16x16/ambar.png";
                        objRtn.strImagen1 = "resources/img/icon/16x16/Circle_Yellow.png";
                    }

                    //FASE 2 - ACEPTADO
                    objRtn.QTYA = rs01.getInt("QTYA");
                    objRtn.SVFOPUSA = rs01.getDouble("SVFOPUSA");
                    objRtn.perc2 = (objRtn.SVFOPUS1 > 0) ? (objRtn.SVFOPUSA * 100) / objRtn.SVFOPUS1 : 0;
                    if (objRtn.perc2 >= 99) {
//                        objRtn.strImagen2 = "assets/icons/16x16/greenP.png";
                        objRtn.strImagen2 = "resources/img/icon/16x16/circle_green.png";
                    } else if (objRtn.perc2 == 0) {
//                        objRtn.strImagen2 = "assets/icons/16x16/redP.png";
                        objRtn.strImagen2 = "resources/img/icon/16x16/circle_red.png";
                    } else {
//                        objRtn.strImagen2 = "assets/icons/16x16/ambar.png";
                        objRtn.strImagen2 = "resources/img/icon/16x16/Circle_Yellow.png";
                    }

                    //FASE 3 - PAGADO
                    objRtn.QTYSABO = rs01.getInt("QTYSABO");
                    objRtn.SVFOPUSABO = rs01.getDouble("SVFOPUSABO");
                    objRtn.perc3 = (objRtn.SVFOPUS1 > 0) ? (objRtn.SVFOPUSABO * 100) / objRtn.SVFOPUS1 : 0;
                    if (objRtn.perc3 >= 99) {
//                        objRtn.strImagen3 = "assets/icons/16x16/greenP.png";
                        objRtn.strImagen3 = "resources/img/icon/16x16/circle_green.png";
                    } else if (objRtn.perc3 == 0) {
//                        objRtn.strImagen3 = "assets/icons/16x16/redP.png";
                        objRtn.strImagen3 = "resources/img/icon/16x16/circle_red.png";
                    } else {
//                        objRtn.strImagen3 = "assets/icons/16x16/ambar.png";
                        objRtn.strImagen3 = "resources/img/icon/16x16/Circle_Yellow.png";
                    }

                    objRtn.totQTY1 = QTY1;
                    objRtn.totSVFOPUS1 = SVFOPUS1;
                    objRtn.totQTY2 = QTY2;
                    objRtn.totSVFOPUS2 = SVFOPUS2;
                    objRtn.totQTYA = QTYA;
                    objRtn.totSVFOPUSA = SVFOPUSA;
                    objRtn.totQTYSABO = QTYSABO;
                    objRtn.totSVFOPUSABO = SVFOPUSABO;

                    objRtn.diff1 = objRtn.QTY2 - objRtn.QTY1;
                    objRtn.diff2 = objRtn.QTYA - objRtn.QTY1;
                    objRtn.diff3 = objRtn.QTYSABO - objRtn.QTY1;

                    objRtn.DiffConci1 = objRtn.SVFOPUS2 - objRtn.SVFOPUS1;
                    objRtn.DiffConci2 = objRtn.SVFOPUSA - objRtn.SVFOPUS1;
                    objRtn.DiffConci3 = objRtn.SVFOPUSABO - objRtn.SVFOPUS1;

                    objRtn.totdiff1 = objRtn.totQTY2 - objRtn.totQTY1;
                    objRtn.totdiff2 = objRtn.totQTYA - objRtn.totQTY1;
                    objRtn.totdiff3 = objRtn.totQTYSABO - objRtn.totQTY1;

                    objRtn.TotDiffConci1 = objRtn.totSVFOPUS2 - objRtn.totSVFOPUS1;
                    objRtn.TotDiffConci2 = objRtn.totSVFOPUSA - objRtn.totSVFOPUS1;
                    objRtn.TotDiffConci3 = objRtn.totSVFOPUSABO - objRtn.totSVFOPUS1;

                    lstRtn.add(objRtn);
                }

            }

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

        return lstRtn;
    }

    public List<A2331Filter> loadPX419SQP03203(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        A2331Filter objRtnNotFound = new A2331Filter();
        long QTYCLAR = 0, QTYCLARS = 0, QTYCLARP = 0, QTYCLARC = 0, QTYCLARN = 0, QTYBANK = 0, QTYBANKN = 0;
        long QTYCLART = 0, QTYBANKT = 0, QTYCHGBK = 0, QTYCLARR = 0;//Tkts
        double AMTSALE = 0, AMTCLAR = 0, AMTCLARU = 0, AMTBANK = 0, AMTBANKU = 0, AMTCHGBU = 0, AMTREVCU = 0;
        boolean hayNotFound = false;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03203(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_SELECT.trim());

            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                AMTSALE = rs01.getDouble("AMTSALE");
                QTYCLAR = rs01.getLong("QTYCLAR");
                QTYCLART = rs01.getLong("QTYCLART");
                QTYCLARS = rs01.getLong("QTYCLARS");
                QTYCLARP = rs01.getLong("QTYCLARP") + rs01.getLong("QTYCLARN");
                QTYCLARC = rs01.getLong("QTYCLARC");
                QTYCLARN = rs01.getLong("QTYCLARN");
                AMTCLAR = rs01.getDouble("AMTCLAR");
                AMTCLARU = rs01.getDouble("AMTCLARU");

                QTYCHGBK = rs01.getLong("QTYCHGBK");
                QTYCLARR = rs01.getLong("QTYCLARR");
                AMTCHGBU = rs01.getDouble("AMTCHGBU");
                AMTREVCU = rs01.getDouble("AMTREVCU");

                AMTBANK = rs01.getLong("AMTBANK");
                AMTBANKU = rs01.getLong("AMTBANKU");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_SELECT = filter.IN_SELECT;

                    objRtn.SENTDATE = rs01.getString("GROUPBY").trim();
                    if (objRtn.IN_SELECT.trim().equals("MONTH")) {
                        objRtn.strFormatDate = Functions.getMonthConvert(rs01.getString("GROUPBY").trim());
                    } else {
                        objRtn.strDescripcion = rs01.getString("DESCRIPT").trim();
                    }
                    objRtn.dblAMTSALE = rs01.getDouble("AMTSALE");
                    objRtn.lngQTYCLAR = rs01.getLong("QTYCLAR");
                    objRtn.lngQTYCLART = rs01.getLong("QTYCLART");
                    objRtn.lngQTYCLARS = rs01.getLong("QTYCLARS");
                    objRtn.lngQTYCLARP = rs01.getLong("QTYCLARP") + rs01.getLong("QTYCLARN");
                    objRtn.lngQTYCLARC = rs01.getLong("QTYCLARC");
                    objRtn.lngQNMATCH = rs01.getLong("QTYCLARN");
                    objRtn.dblAMTCLAR = rs01.getDouble("AMTCLAR");
                    objRtn.dblAMTCLARU = rs01.getDouble("AMTCLARU");

                    objRtn.QTYCHGBK = rs01.getLong("QTYCHGBK");
                    objRtn.AMTCHGBU = rs01.getDouble("AMTCHGBU");
                    objRtn.QTYCLARR = rs01.getLong("QTYCLARR");
                    objRtn.AMTREVCU = rs01.getDouble("AMTREVCU");

                    objRtn.perAnsw = (objRtn.lngQTYCLAR > 0) ? (double) (objRtn.lngQTYCLARP * 100) / objRtn.lngQTYCLAR : 0;
                    objRtn.perNoAnsw = (objRtn.lngQTYCLAR > 0) ? (double) (objRtn.lngQTYCLARS * 100) / objRtn.lngQTYCLAR : 0;

                    objRtn.lngQTYBANK = objRtn.QTYCHGBK - objRtn.QTYCLARR;
                    objRtn.dblAMTBANK = objRtn.AMTCHGBU - objRtn.AMTREVCU;
                    objRtn.per = (objRtn.dblAMTCLARU > 0) ? (objRtn.dblAMTBANK / objRtn.dblAMTCLARU) * 100 : 0;

                    // objRtn.dblAMTBANK = rs01.getDouble("AMTBANK");
                    objRtn.dblAMTBANKU = rs01.getDouble("AMTBANKU");

                    objRtn.dblTotAMTSALE = AMTSALE;
                    objRtn.lngTotQTYCLAR = QTYCLAR;
                    objRtn.lngTotQTYCLART = QTYCLART;
                    objRtn.lngTotQTYCLARS = QTYCLARS;
                    objRtn.lngTotQTYCLARP = QTYCLARP;
                    objRtn.lngTotQTYCLARC = QTYCLARC;
                    objRtn.lngTotQNMATCH = QTYCLARN;
                    objRtn.dblTotAMTCLAR = AMTCLAR;
                    objRtn.dblTotAMTCLARU = AMTCLARU;

                    objRtn.totQTYCHGBK = QTYCHGBK; //QTYCHGBK
                    objRtn.totQTYCLARR = QTYCLARR;//QTYCLARR
                    objRtn.totAMTCHGBU = AMTCHGBU;
                    objRtn.totAMTREVCU = AMTREVCU;

                    objRtn.TotperAnsw = ((objRtn.lngTotQTYCLAR > 0) ? (double) (objRtn.lngTotQTYCLARP * 100) / objRtn.lngTotQTYCLAR : 0.00);
                    objRtn.TotperNoAnsw = (objRtn.lngTotQTYCLAR > 0) ? (double) (objRtn.lngTotQTYCLARS * 100) / objRtn.lngTotQTYCLAR : 0.00;

                    objRtn.lngTotQTYBANK = objRtn.totQTYCHGBK - objRtn.totQTYCLARR;
                    objRtn.dblTotAMTBANK = objRtn.totAMTCHGBU - objRtn.totAMTREVCU;
                    objRtn.totper = (objRtn.dblTotAMTCLARU > 0) ? (objRtn.dblTotAMTBANK / objRtn.dblTotAMTCLARU) * 100 : 0;

                    //objRtn.dblTotAMTBANK = AMTBANK;
                    objRtn.dblTotAMTBANKU = AMTBANKU;

                    /*objRtn.page.PAGNUM = filter.page.PAGNUM;
                     objRtn.page.PAGROW = filter.page.PAGROW;
                     objRtn.page.TOTPAG = filter.page.TOTPAG;
                     objRtn.page.TOTROW = filter.page.TOTROW;*/
                    if (objRtn.SENTDATE.isEmpty()) {
                        hayNotFound = true;
                        objRtnNotFound = objRtn;
                    } else {
                        list.add(objRtn);
                    }
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

            if (hayNotFound) {
                list.add(objRtnNotFound);
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

    public List<A2331Filter> loadPX419SQP02079(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        A2331Filter objRtnNotFound = new A2331Filter();
        long QTYCLAR = 0, QTYCLARS = 0, QTYCLARP = 0, QTYCLARC = 0, QTYCLARN = 0, QTYBANK = 0, QTYBANKN = 0;
        long QTYCLART = 0, QTYBANKT = 0, QTYCHGBK = 0, QTYCLARR = 0;//Tkts
        double AMTSALE = 0, AMTCLAR = 0, AMTCLARU = 0, AMTBANK = 0, AMTBANKU = 0, AMTCHGBU = 0, AMTREVCU = 0;
        boolean hayNotFound = false;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02079_1(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            /*cstmt.registerOutParameter(13, Types.INTEGER);
             cstmt.registerOutParameter(14, Types.INTEGER);
             cstmt.registerOutParameter(15, Types.INTEGER);
             cstmt.registerOutParameter(16, Types.INTEGER);*/

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_SELECT.trim());
            /*cstmt.setInt(13, filter.page.PAGNUM);
             cstmt.setInt(14, filter.page.PAGROW);
             cstmt.setInt(15, filter.page.TOTPAG);
             cstmt.setInt(16, filter.page.TOTROW);*/
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            /*filter.page.PAGNUM = cstmt.getInt(13);
             filter.page.PAGROW = cstmt.getInt(14);
             filter.page.TOTPAG = cstmt.getInt(15);
             filter.page.TOTROW = cstmt.getInt(16);*/
            if (rs01.next()) {
                AMTSALE = rs01.getDouble("AMTSALE");
                QTYCLAR = rs01.getLong("QTYCLAR");
                QTYCLART = rs01.getLong("QTYCLART");
                QTYCLARS = rs01.getLong("QTYCLARS");
                QTYCLARP = rs01.getLong("QTYCLARP");
                QTYCLARC = rs01.getLong("QTYCLARC");
                QTYCLARN = rs01.getLong("QTYCLARN");
                AMTCLAR = rs01.getDouble("AMTCLAR");
                AMTCLARU = rs01.getDouble("AMTCLARU");

                QTYCHGBK = rs01.getLong("QTYCHGBK");
                QTYCLARR = rs01.getLong("QTYCLARR");
                AMTCHGBU = rs01.getDouble("AMTCHGBU");
                AMTREVCU = rs01.getDouble("AMTREVCU");

                AMTBANK = rs01.getLong("AMTBANK");
                AMTBANKU = rs01.getLong("AMTBANKU");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_SELECT = filter.IN_SELECT;

                    objRtn.SENTDATE = rs01.getString("GROUPBY").trim();
                    if (objRtn.IN_SELECT.trim().equals("MONTH")) {
                        objRtn.strFormatDate = Functions.getMonthConvert(rs01.getString("GROUPBY").trim());
                    } else {
                        objRtn.strDescripcion = rs01.getString("DESCRIPT").trim();
                    }
                    objRtn.dblAMTSALE = rs01.getDouble("AMTSALE");
                    objRtn.lngQTYCLAR = rs01.getLong("QTYCLAR");
                    objRtn.lngQTYCLART = rs01.getLong("QTYCLART");
                    objRtn.lngQTYCLARS = rs01.getLong("QTYCLARS");
                    objRtn.lngQTYCLARP = rs01.getLong("QTYCLARP");
                    objRtn.lngQTYCLARC = rs01.getLong("QTYCLARC");
                    objRtn.lngQNMATCH = rs01.getLong("QTYCLARN");
                    objRtn.dblAMTCLAR = rs01.getDouble("AMTCLAR");
                    objRtn.dblAMTCLARU = rs01.getDouble("AMTCLARU");

                    objRtn.QTYCHGBK = rs01.getLong("QTYCHGBK");
                    objRtn.AMTCHGBU = rs01.getDouble("AMTCHGBU");
                    objRtn.QTYCLARR = rs01.getLong("QTYCLARR");
                    objRtn.AMTREVCU = rs01.getDouble("AMTREVCU");

                    objRtn.lngQTYBANK = objRtn.QTYCHGBK - objRtn.QTYCLARR;
                    objRtn.dblAMTBANK = objRtn.AMTCHGBU - objRtn.AMTREVCU;

                    // objRtn.dblAMTBANK = rs01.getDouble("AMTBANK");
                    objRtn.dblAMTBANKU = rs01.getDouble("AMTBANKU");

                    objRtn.dblTotAMTSALE = AMTSALE;
                    objRtn.lngTotQTYCLAR = QTYCLAR;
                    objRtn.lngTotQTYCLART = QTYCLART;
                    objRtn.lngTotQTYCLARS = QTYCLARS;
                    objRtn.lngTotQTYCLARP = QTYCLARP;
                    objRtn.lngTotQTYCLARC = QTYCLARC;
                    objRtn.lngTotQNMATCH = QTYCLARN;
                    objRtn.dblTotAMTCLAR = AMTCLAR;
                    objRtn.dblTotAMTCLARU = AMTCLARU;

                    objRtn.totQTYCHGBK = QTYCHGBK; //QTYCHGBK
                    objRtn.totQTYCLARR = QTYCLARR;//QTYCLARR
                    objRtn.totAMTCHGBU = AMTCHGBU;
                    objRtn.totAMTREVCU = AMTREVCU;

                    objRtn.lngTotQTYBANK = objRtn.totQTYCHGBK - objRtn.totQTYCLARR;
                    objRtn.dblTotAMTBANK = objRtn.totAMTCHGBU - objRtn.totAMTREVCU;

                    //objRtn.dblTotAMTBANK = AMTBANK;
                    objRtn.dblTotAMTBANKU = AMTBANKU;

                    /*objRtn.page.PAGNUM = filter.page.PAGNUM;
                     objRtn.page.PAGROW = filter.page.PAGROW;
                     objRtn.page.TOTPAG = filter.page.TOTPAG;
                     objRtn.page.TOTROW = filter.page.TOTROW;*/
                    if (objRtn.SENTDATE.isEmpty()) {
                        hayNotFound = true;
                        objRtnNotFound = objRtn;
                    } else {
                        list.add(objRtn);
                    }
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

            if (hayNotFound) {
                list.add(objRtnNotFound);
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

    public List<A2331Filter> loadPX419SQP02104(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        A2331Filter objRtnNotFound = new A2331Filter();
        long QTYCLAR = 0, QTYCLARS = 0, QTYCLARP = 0, QTYCLARC = 0, QTYCLARN = 0, QTYBANK = 0, QTYBANKN = 0;
        long QTYCLART = 0, QTYBANKT = 0, QTYCHGBK = 0, QTYCLARR = 0;//Tkts
        double AMTSALE = 0, AMTCLAR = 0, AMTCLARU = 0, AMTBANK = 0, AMTBANKU = 0, AMTCHGBU = 0, AMTREVCU = 0;
        boolean hayNotFound = false;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02104_1(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.SENTDATE);
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                AMTSALE = rs01.getDouble("AMTSALE");
                QTYCLAR = rs01.getLong("QTYCLAR");
                QTYCLART = rs01.getLong("QTYCLART");
                QTYCLARS = rs01.getLong("QTYCLARS");
                QTYCLARP = rs01.getLong("QTYCLARP");
                QTYCLARC = rs01.getLong("QTYCLARC");
                QTYCLARN = rs01.getLong("QTYCLARN");
                AMTCLAR = rs01.getDouble("AMTCLAR");
                AMTCLARU = rs01.getDouble("AMTCLARU");
                QTYBANK = rs01.getLong("QTYBANK");
                QTYBANKT = rs01.getLong("QTYBANKT");
                QTYBANKN = rs01.getLong("QTYBANKN");
                AMTBANK = rs01.getLong("AMTBANK");
                AMTBANKU = rs01.getLong("AMTBANKU");

                QTYCHGBK = rs01.getLong("QTYCHGBK");
                QTYCLARR = rs01.getLong("QTYCLARR");
                AMTCHGBU = rs01.getDouble("AMTCHGBU");
                AMTREVCU = rs01.getDouble("AMTREVCU");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.SENTDATE = filter.SENTDATE;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.IN_TDOC = filter.IN_TDOC;

                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.strDescripcion = rs01.getString("DESCRIPT").trim();
                    objRtn.dblAMTSALE = rs01.getDouble("AMTSALE");
                    objRtn.lngQTYCLAR = rs01.getLong("QTYCLAR");
                    objRtn.lngQTYCLART = rs01.getLong("QTYCLART");
                    objRtn.lngQTYCLARS = rs01.getLong("QTYCLARS");
                    objRtn.lngQTYCLARP = rs01.getLong("QTYCLARP");
                    objRtn.lngQTYCLARC = rs01.getLong("QTYCLARC");
                    objRtn.lngQNMATCH = rs01.getLong("QTYCLARN");
                    objRtn.dblAMTCLAR = rs01.getDouble("AMTCLAR");
                    objRtn.dblAMTCLARU = rs01.getDouble("AMTCLARU");
                    //objRtn.lngQTYBANK = rs01.getLong("QTYBANK");
                    objRtn.lngQTYBANKT = rs01.getLong("QTYBANKT");
                    objRtn.lngQTYBANKN = rs01.getLong("QTYBANKN");
                    // objRtn.dblAMTBANK = rs01.getDouble("AMTBANK");
                    objRtn.dblAMTBANKU = rs01.getDouble("AMTBANKU");

                    objRtn.QTYCHGBK = rs01.getLong("QTYCHGBK");
                    objRtn.AMTCHGBU = rs01.getDouble("AMTCHGBU");
                    objRtn.QTYCLARR = rs01.getLong("QTYCLARR");
                    objRtn.AMTREVCU = rs01.getDouble("AMTREVCU");

                    objRtn.lngQTYBANK = objRtn.QTYCHGBK - objRtn.QTYCLARR;
                    objRtn.dblAMTBANK = objRtn.AMTCHGBU - objRtn.AMTREVCU;

                    objRtn.dblTotAMTSALE = AMTSALE;
                    objRtn.lngTotQTYCLAR = QTYCLAR;
                    objRtn.lngTotQTYCLART = QTYCLART;
                    objRtn.lngTotQTYCLARS = QTYCLARS;
                    objRtn.lngTotQTYCLARP = QTYCLARP;
                    objRtn.lngTotQTYCLARC = QTYCLARC;
                    objRtn.lngTotQNMATCH = QTYCLARN;
                    objRtn.dblTotAMTCLAR = AMTCLAR;
                    objRtn.dblTotAMTCLARU = AMTCLARU;
                    //objRtn.lngTotQTYBANK = QTYBANK;
                    objRtn.lngTotQTYBANKT = QTYBANKT;
                    objRtn.lngTotQTYBANKN = QTYBANKN;
                    // objRtn.dblTotAMTBANK = AMTBANK;
                    objRtn.dblTotAMTBANKU = AMTBANKU;

                    objRtn.totQTYCHGBK = QTYCHGBK; //QTYCHGBK
                    objRtn.totQTYCLARR = QTYCLARR;//QTYCLARR
                    objRtn.totAMTCHGBU = AMTCHGBU;
                    objRtn.totAMTREVCU = AMTREVCU;

                    objRtn.lngTotQTYBANK = objRtn.totQTYCHGBK - objRtn.totQTYCLARR;
                    objRtn.dblTotAMTBANK = objRtn.totAMTCHGBU - objRtn.totAMTREVCU;

                    if (objRtn.CODEBANK.isEmpty()) {
                        hayNotFound = true;
                        objRtnNotFound = objRtn;
                    } else {
                        list.add(objRtn);
                    }
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

            if (hayNotFound) {
                list.add(objRtnNotFound);
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

    // ---------------------------------------------------------------------------------------------------------------
    public List<IMF145Filter> loadSQP04546(IMF145Filter filter) throws SQLException, Exception {

        List<IMF145Filter> lista = new ArrayList<IMF145Filter>(0);
        IMF145Filter bean;

        long QTYSALES = 0, AMOUNTS = 0, QTYSALCA = 0, AMOUNTCA = 0, QTYSALCC = 0, AMOUNTCC = 0, QTYSALBA = 0, diffAMOUNTCC = 0, diffQTYSALCC = 0;
        long AMOUNTBA = 0, VALOREX = 0, VALORCA = 0, VALORCC = 0;
//        double AMOUNT = 0, COMISION = 0, TAX = 0, AYQ = 0, AYR = 0, FARE = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04546(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);

            cstmt.setString(5, filter.IN_FTE);
            cstmt.setString(6, filter.IN_PAYMENT);
            cstmt.setString(7, filter.IN_TDOC);
            cstmt.setString(8, filter.IN_SCOUNTRY);
            cstmt.setString(9, filter.IN_FLAG);
            cstmt.setString(10, filter.IN_FINSUMO);
            cstmt.setString(11, filter.IN_BANK);
            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                QTYSALES = rst.getLong("QTYSALES");
                AMOUNTS = rst.getLong("AMOUNTS");

                QTYSALCA = rst.getLong("QTYSALCA");
                AMOUNTCA = rst.getLong("AMOUNTCA");
                QTYSALCC = rst.getLong("QTYSALCC");
                AMOUNTCC = rst.getLong("AMOUNTCC");

                QTYSALBA = rst.getLong("QTYSALBA");
                AMOUNTBA = rst.getLong("AMOUNTBA");

                VALOREX = rst.getLong("VALOREX");
                VALORCA = rst.getLong("VALORCA");
                VALORCC = rst.getLong("VALORCC");
                
                diffAMOUNTCC = AMOUNTCC - AMOUNTBA;
                diffQTYSALCC = QTYSALCC - QTYSALBA;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new IMF145Filter();
                    bean.IN_DATE = filter.IN_DATE;
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO;
                    bean.IN_FTE = filter.IN_FTE;
                    bean.IN_PAYMENT = filter.IN_PAYMENT;
                    bean.IN_TDOC = filter.IN_TDOC;
                    bean.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    bean.IN_FLAG = filter.IN_FLAG;
                    bean.IN_FINSUMO = filter.IN_FINSUMO;
                    bean.IN_BANK = filter.IN_BANK;

                   
                    bean.DSALES = rst.getString("DSALES");
                    bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                    bean.SCOUNTRY = rst.getString("SCOUNTRY");
                    bean.SCARCOD = rst.getString("SCARCOD");

                    bean.QTYSALES = rst.getLong("QTYSALES");
                    bean.AMOUNTS = rst.getLong("AMOUNTS");

                    bean.QTYSALCA = rst.getLong("QTYSALCA");
                    bean.AMOUNTCA = rst.getLong("AMOUNTCA");
                    bean.QTYSALCC = rst.getLong("QTYSALCC");
                    bean.AMOUNTCC = rst.getLong("AMOUNTCC");

                    bean.QTYSALBA = rst.getLong("QTYSALBA");
                    bean.AMOUNTBA = rst.getLong("AMOUNTBA");

                    bean.VALOREX = rst.getLong("VALOREX");
                    bean.VALORCA = rst.getLong("VALORCA");
                    bean.VALORCC = rst.getLong("VALORCC");

                    bean.diffQTYSALCC = bean.QTYSALCC - bean.QTYSALBA;
                    bean.diffAMOUNTCC = bean.AMOUNTCC - bean.AMOUNTBA;

                    bean.totQTYSALES = QTYSALES;
                    bean.totAMOUNTS = AMOUNTS;

                    bean.totQTYSALCA = QTYSALCA;
                    bean.totAMOUNTCA = AMOUNTCA;
                    bean.totQTYSALCC = QTYSALCC;
                    bean.totAMOUNTCC = AMOUNTCC;

                    bean.totQTYSALBA = QTYSALBA;
                    bean.totAMOUNTBA = AMOUNTBA;
                    bean.totVALOREX = VALOREX;
                    bean.totVALORCA = VALORCA;
                    bean.totVALORCC = VALORCC;
                    bean.totdiffAMOUNTCC = diffAMOUNTCC;
                    bean.totdiffQTYSALCC = diffQTYSALCC;

                    if (AMOUNTS != 0) {
                        bean.totpercCA = AMOUNTCA * 100 / AMOUNTS;
                        bean.totpercCC = AMOUNTCC * 100 / AMOUNTS;
                    } else {
                        bean.totpercCA = 0;
                        bean.totpercCC = 0;
                    }
                    
                    if (AMOUNTCC != 0) {
                        bean.totpercBA = AMOUNTBA * 100 / AMOUNTCC;
                        bean.totpercPE = diffAMOUNTCC * 100 / AMOUNTCC;
                    } else {
                        bean.totpercBA = 0;
                        bean.totpercPE = 0;
                    }

                    if (bean.AMOUNTS != 0) {
                        bean.percSales = bean.AMOUNTS * 100 / bean.totAMOUNTS;
                    } else {
                        bean.percSales = 0;
                    }

//                    bean.percCA = bean.AMOUNTCA*100/bean.totAMOUNTCA;
//                    bean.percCC = bean.AMOUNTCC*100/bean.totAMOUNTCC;                   
                    if (bean.AMOUNTS != 0) {
                        bean.percCA = bean.AMOUNTCA * 100 / bean.AMOUNTS;
                        bean.percCC = bean.AMOUNTCC * 100 / bean.AMOUNTS;
                    } else {
                        bean.percCA = 0;
                        bean.percCC = 0;
                    }

                    if (bean.AMOUNTCC != 0) {
                        bean.percBA = bean.AMOUNTBA * 100 / bean.AMOUNTCC;
                        bean.percPE = bean.diffAMOUNTCC * 100 / bean.AMOUNTCC;
                    } else {
                        bean.percBA = 0;
                        bean.percPE = 0;
                    }

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lista.add(bean);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return lista;
    }

    public List<IMF145Filter> loadSQP04541(IMF145Filter filter) throws SQLException, Exception {

        List<IMF145Filter> lista = new ArrayList<IMF145Filter>(0);
        IMF145Filter bean;

        long QTYSALES = 0, AMOUNTS = 0, QTYSALCA = 0, AMOUNTCA = 0, QTYSALCC = 0, AMOUNTCC = 0, QTYSALBA = 0, diffAMOUNTCC = 0, diffQTYSALCC = 0;
        long AMOUNTBA = 0, VALOREX = 0, VALORCA = 0, VALORCC = 0;
//        double AMOUNT = 0, COMISION = 0, TAX = 0, AYQ = 0, AYR = 0, FARE = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04541(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.DSALES);

            cstmt.setString(4, filter.IN_FTE);
            cstmt.setString(5, filter.IN_PAYMENT);
            cstmt.setString(6, filter.IN_TDOC);
            cstmt.setString(7, filter.IN_SCOUNTRY);
            cstmt.setString(8, filter.IN_FLAG);
            cstmt.setString(9, filter.IN_FINSUMO);
            cstmt.setString(10, filter.IN_BANK);
            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                QTYSALES = rst.getLong("QTYSALES");
                AMOUNTS = rst.getLong("AMOUNTS");

                QTYSALCA = rst.getLong("QTYSALCA");
                AMOUNTCA = rst.getLong("AMOUNTCA");
                QTYSALCC = rst.getLong("QTYSALCC");
                AMOUNTCC = rst.getLong("AMOUNTCC");

                QTYSALBA = rst.getLong("QTYSALBA");
                AMOUNTBA = rst.getLong("AMOUNTBA");

                VALOREX = rst.getLong("VALOREX");
                VALORCA = rst.getLong("VALORCA");
                VALORCC = rst.getLong("VALORCC");
                
                diffAMOUNTCC = AMOUNTCC - AMOUNTBA;
                diffQTYSALCC = QTYSALCC - QTYSALBA;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new IMF145Filter();
                    bean.IN_DATE = filter.IN_DATE;
                    bean.IN_FECHA = filter.strFormatDate;

                    bean.IN_FTE = filter.IN_FTE;
                    bean.IN_PAYMENT = filter.IN_PAYMENT;
                    bean.IN_TDOC = filter.IN_TDOC;
                    bean.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                    bean.IN_FLAG = filter.IN_FLAG;
                    bean.IN_FINSUMO = filter.IN_FINSUMO;
                    bean.IN_BANK = filter.IN_BANK;

                    bean.DSALES = rst.getString("DSALES");
                    bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                    bean.SCOUNTRY = rst.getString("SCOUNTRY");
                    bean.SCARCOD = rst.getString("SCARCOD");

                    bean.QTYSALES = rst.getLong("QTYSALES");
                    bean.AMOUNTS = rst.getLong("AMOUNTS");

                    bean.QTYSALCA = rst.getLong("QTYSALCA");
                    bean.AMOUNTCA = rst.getLong("AMOUNTCA");
                    bean.QTYSALCC = rst.getLong("QTYSALCC");
                    bean.AMOUNTCC = rst.getLong("AMOUNTCC");

                    bean.QTYSALBA = rst.getLong("QTYSALBA");
                    bean.AMOUNTBA = rst.getLong("AMOUNTBA");

                    bean.VALOREX = rst.getLong("VALOREX");
                    bean.VALORCA = rst.getLong("VALORCA");
                    bean.VALORCC = rst.getLong("VALORCC");

                    bean.diffQTYSALCC = bean.QTYSALCC - bean.QTYSALBA;
                    bean.diffAMOUNTCC = bean.AMOUNTCC - bean.AMOUNTBA;

                    bean.totQTYSALES = QTYSALES;
                    bean.totAMOUNTS = AMOUNTS;

                    bean.totQTYSALCA = QTYSALCA;
                    bean.totAMOUNTCA = AMOUNTCA;
                    bean.totQTYSALCC = QTYSALCC;
                    bean.totAMOUNTCC = AMOUNTCC;

                    bean.totQTYSALBA = QTYSALBA;
                    bean.totAMOUNTBA = AMOUNTBA;
                    bean.totVALOREX = VALOREX;
                    bean.totVALORCA = VALORCA;
                    bean.totVALORCC = VALORCC;
                    bean.totdiffAMOUNTCC = diffAMOUNTCC;
                    bean.totdiffQTYSALCC = diffQTYSALCC;

                    if (AMOUNTS != 0) {
                        bean.totpercCA = AMOUNTCA * 100 / AMOUNTS;
                        bean.totpercCC = AMOUNTCC * 100 / AMOUNTS;
                    } else {
                        bean.totpercCA = 0;
                        bean.totpercCC = 0;
                    }
                    
                    if (AMOUNTCC != 0) {
                        bean.totpercBA = AMOUNTBA * 100 / AMOUNTCC;
                        bean.totpercPE = diffAMOUNTCC * 100 / AMOUNTCC;
                    } else {
                        bean.totpercBA = 0;
                        bean.totpercPE = 0;
                    }

                    if (bean.AMOUNTS != 0) {
                        bean.percSales = bean.AMOUNTS * 100 / bean.totAMOUNTS;
                    } else {
                        bean.percSales = 0;
                    }

//                    bean.percCA = bean.AMOUNTCA*100/bean.totAMOUNTCA;
//                    bean.percCC = bean.AMOUNTCC*100/bean.totAMOUNTCC;                   
                    if (bean.AMOUNTS != 0) {
                        bean.percCA = bean.AMOUNTCA * 100 / bean.AMOUNTS;
                        bean.percCC = bean.AMOUNTCC * 100 / bean.AMOUNTS;
                    } else {
                        bean.percCA = 0;
                        bean.percCC = 0;
                    }

                    if (bean.AMOUNTCC != 0) {
                        bean.percBA = bean.AMOUNTBA * 100 / bean.AMOUNTCC;
                        bean.percPE = bean.diffAMOUNTCC * 100 / bean.AMOUNTCC;
                    } else {
                        bean.percBA = 0;
                        bean.percPE = 0;
                    }

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lista.add(bean);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return lista;
    }
}
