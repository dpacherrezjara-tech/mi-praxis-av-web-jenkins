/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2345Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class IntalmentSalesDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public IntalmentSalesDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public IntalmentSalesDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2290Filter> loadPX290SQP03217(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        double TOTALCHRG_1 = 0, TOTALCHRG_2 = 0, TOTALCHRG_3 = 0, TOTALCHRG_5 = 0;
        double FIRSTINSAM_1 = 0, FIRSTINSAM_2 = 0, FIRSTINSAM_3 = 0, FIRSTINSAM_5 = 0;
        double TOTALCOM_1 = 0, TOTALCOM_2 = 0, TOTALCOM_3 = 0, TOTALCOM_5 = 0;
        double TCOMISCA_1 = 0, TCOMISCA_2 = 0, TCOMISCA_3 = 0, TCOMISCA_5 = 0;
        double T_DIFF_1 = 0, T_DIFF_2 = 0, T_DIFF_3 = 0, T_DIFF_5 = 0;
        int QTYTKT_1 = 0, QTYTKT_2 = 0, QTYTKT_3 = 0, QTYTKT_5 = 0, QTYTKT_6 = 0, QTYTKT_8 = 0;
        int QADMG = 0, QADMO = 0, QADCA = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03217(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_AUTHNBR.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_STVAL.trim());
            cstmt.setString(9, filter.IN_CARDN1.trim());
            cstmt.setString(10, filter.IN_CARDN2.trim());
            cstmt.setString(11, filter.IN_BANK.trim());
            cstmt.setString(12, filter.IN_PNR.trim());

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                TOTALCHRG_1 = rs01.getDouble("TOTALCHRG_1");
                TOTALCHRG_2 = rs01.getDouble("TOTALCHRG_2");
                TOTALCHRG_3 = rs01.getDouble("TOTALCHRG_3");
                TOTALCHRG_5 = rs01.getDouble("TOTALCHRG_5");

                FIRSTINSAM_1 = rs01.getDouble("FIRSTINSAM_1");
                FIRSTINSAM_2 = rs01.getDouble("FIRSTINSAM_2");
                FIRSTINSAM_3 = rs01.getDouble("FIRSTINSAM_3");
                FIRSTINSAM_5 = rs01.getDouble("FIRSTINSAM_5");

                TOTALCOM_1 = rs01.getDouble("TOTALCOM_1");
                TOTALCOM_2 = rs01.getDouble("TOTALCOM_2");
                TOTALCOM_3 = rs01.getDouble("TOTALCOM_3");
                TOTALCOM_5 = rs01.getDouble("TOTALCOM_5");

                TCOMISCA_1 = rs01.getDouble("TCOMISCA_1");
                TCOMISCA_2 = rs01.getDouble("TCOMISCA_2");
                TCOMISCA_3 = rs01.getDouble("TCOMISCA_3");
                TCOMISCA_5 = rs01.getDouble("TCOMISCA_5");

                QTYTKT_1 = rs01.getInt("QTYTKT_1");
                QTYTKT_2 = rs01.getInt("QTYTKT_2");
                QTYTKT_3 = rs01.getInt("QTYTKT_3");
                QTYTKT_5 = rs01.getInt("QTYTKT_5");
                QTYTKT_6 = rs01.getInt("QTYTKT_6");
                QTYTKT_8 = rs01.getInt("QTYTKT_8");

                T_DIFF_1 = rs01.getDouble("TOTALCOM_1") - rs01.getDouble("TCOMISCA_1");
                T_DIFF_2 = rs01.getDouble("TOTALCOM_2") - rs01.getDouble("TCOMISCA_2");
                T_DIFF_3 = rs01.getDouble("TOTALCOM_3") - rs01.getDouble("TCOMISCA_3");
                T_DIFF_5 = rs01.getDouble("TOTALCOM_5") - rs01.getDouble("TCOMISCA_5");

                QADMG = rs01.getInt("QADMG");
                QADMO = rs01.getInt("QADMO");
                QADCA = rs01.getInt("QADCA");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {

                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_STVAL = filter.IN_STVAL;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_BANK = filter.IN_BANK;
                    objRtn.IN_PNR = filter.IN_PNR;

                    objRtn.SDATE = rs01.getString("SDATE").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.SDATE);

                    objRtn.CURRENPAY = "MXN";

                    objRtn.TOTALCHRG_1 = rs01.getDouble("TOTALCHRG_1");
                    objRtn.TOTALCHRG_2 = rs01.getDouble("TOTALCHRG_2");
                    objRtn.TOTALCHRG_3 = rs01.getDouble("TOTALCHRG_3");
                    objRtn.TOTALCHRG_5 = rs01.getDouble("TOTALCHRG_5");

                    objRtn.FIRSTINSAM_1 = rs01.getDouble("FIRSTINSAM_1");
                    objRtn.FIRSTINSAM_2 = rs01.getDouble("FIRSTINSAM_2");
                    objRtn.FIRSTINSAM_3 = rs01.getDouble("FIRSTINSAM_3");
                    objRtn.FIRSTINSAM_5 = rs01.getDouble("FIRSTINSAM_5");

                    objRtn.TOTALCOM_1 = rs01.getDouble("TOTALCOM_1");
                    objRtn.TOTALCOM_2 = rs01.getDouble("TOTALCOM_2");
                    objRtn.TOTALCOM_3 = rs01.getDouble("TOTALCOM_3");
                    objRtn.TOTALCOM_5 = rs01.getDouble("TOTALCOM_5");

                    objRtn.TCOMISCA_1 = rs01.getDouble("TCOMISCA_1");
                    objRtn.TCOMISCA_2 = rs01.getDouble("TCOMISCA_2");
                    objRtn.TCOMISCA_3 = rs01.getDouble("TCOMISCA_3");
                    objRtn.TCOMISCA_5 = rs01.getDouble("TCOMISCA_5");

                    objRtn.QTYTKT_1 = rs01.getInt("QTYTKT_1");
                    objRtn.QTYTKT_2 = rs01.getInt("QTYTKT_2");
                    objRtn.QTYTKT_3 = rs01.getInt("QTYTKT_3");
                    objRtn.QTYTKT_5 = rs01.getInt("QTYTKT_5");
                    objRtn.QTYTKT_6 = rs01.getInt("QTYTKT_6");
                    objRtn.QTYTKT_8 = rs01.getInt("QTYTKT_8");

                    objRtn.T_DIFF_1 = rs01.getDouble("TOTALCOM_1") - rs01.getDouble("TCOMISCA_1");
                    objRtn.T_DIFF_2 = rs01.getDouble("TOTALCOM_2") - rs01.getDouble("TCOMISCA_2");
                    objRtn.T_DIFF_3 = rs01.getDouble("TOTALCOM_3") - rs01.getDouble("TCOMISCA_3");
                    objRtn.T_DIFF_5 = rs01.getDouble("TOTALCOM_5") - rs01.getDouble("TCOMISCA_5");

                    objRtn.QTYDOCS = rs01.getInt("QADMG");
                    objRtn.QTYDOCR = rs01.getInt("QADMO");
                    objRtn.QTYDOC = rs01.getInt("QADCA");

                    objRtn.totTOTALCHRG_1 = TOTALCHRG_1;
                    objRtn.totTOTALCHRG_2 = TOTALCHRG_2;
                    objRtn.totTOTALCHRG_3 = TOTALCHRG_3;
                    objRtn.totTOTALCHRG_5 = TOTALCHRG_5;

                    objRtn.totFIRSTINSAM_1 = FIRSTINSAM_1;
                    objRtn.totFIRSTINSAM_2 = FIRSTINSAM_2;
                    objRtn.totFIRSTINSAM_3 = FIRSTINSAM_3;
                    objRtn.totFIRSTINSAM_5 = FIRSTINSAM_5;

                    objRtn.totTOTALCOM_1 = TOTALCOM_1;
                    objRtn.totTOTALCOM_2 = TOTALCOM_2;
                    objRtn.totTOTALCOM_3 = TOTALCOM_3;
                    objRtn.totTOTALCOM_5 = TOTALCOM_5;

                    objRtn.totTCOMISCA_1 = TCOMISCA_1;
                    objRtn.totTCOMISCA_2 = TCOMISCA_2;
                    objRtn.totTCOMISCA_3 = TCOMISCA_3;
                    objRtn.totTCOMISCA_5 = TCOMISCA_5;

                    objRtn.totQTYTKT_1 = QTYTKT_1;
                    objRtn.totQTYTKT_2 = QTYTKT_2;
                    objRtn.totQTYTKT_3 = QTYTKT_3;
                    objRtn.totQTYTKT_5 = QTYTKT_5;
                    objRtn.totQTYTKT_6 = QTYTKT_6;
                    objRtn.totQTYTKT_8 = QTYTKT_8;

                    objRtn.totT_DIFF_1 = T_DIFF_1;
                    objRtn.totT_DIFF_2 = T_DIFF_2;
                    objRtn.totT_DIFF_3 = T_DIFF_3;
                    objRtn.totT_DIFF_5 = T_DIFF_5;

                    objRtn.lngTotQTYDOCS = QADMG;
                    objRtn.lngTotQTYDOCR = QADMO;
                    objRtn.lngTotQTYDOC = QADCA;

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

    public List<A2290Filter> loadPX290SQP03237(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        double TOTALCHRG_1 = 0, TOTALCHRG_2 = 0, TOTALCHRG_3 = 0, TOTALCHRG_5 = 0;
        double FIRSTINSAM_1 = 0, FIRSTINSAM_2 = 0, FIRSTINSAM_3 = 0, FIRSTINSAM_5 = 0;
        double TOTALCOM_1 = 0, TOTALCOM_2 = 0, TOTALCOM_3 = 0, TOTALCOM_5 = 0;
        double TCOMISCA_1 = 0, TCOMISCA_2 = 0, TCOMISCA_3 = 0, TCOMISCA_5 = 0;
        double T_DIFF_1 = 0, T_DIFF_2 = 0, T_DIFF_3 = 0, T_DIFF_5 = 0;
        int QTYTKT_1 = 0, QTYTKT_2 = 0, QTYTKT_3 = 0, QTYTKT_5 = 0, QTYTKT_6 = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03237_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE.trim());
            cstmt.setString(3, filter.IN_TDOC.trim());
            cstmt.setString(4, filter.IN_AUTHNBR.trim());
            cstmt.setString(5, filter.IN_FTE.trim());
            cstmt.setString(6, filter.IN_STVAL.trim());
            cstmt.setString(7, filter.IN_CARDN1.trim());
            cstmt.setString(8, filter.IN_CARDN2.trim());
            cstmt.setString(9, filter.IN_BANK.trim());
            cstmt.setString(10, filter.IN_PNR.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                TOTALCHRG_1 = rs01.getDouble("TOTALCHRG_1");
                TOTALCHRG_2 = rs01.getDouble("TOTALCHRG_2");
                TOTALCHRG_3 = rs01.getDouble("TOTALCHRG_3");
                TOTALCHRG_5 = rs01.getDouble("TOTALCHRG_5");

                FIRSTINSAM_1 = rs01.getDouble("FIRSTINSAM_1");
                FIRSTINSAM_2 = rs01.getDouble("FIRSTINSAM_2");
                FIRSTINSAM_3 = rs01.getDouble("FIRSTINSAM_3");
                FIRSTINSAM_5 = rs01.getDouble("FIRSTINSAM_5");

                TOTALCOM_1 = rs01.getDouble("TOTALCOM_1");
                TOTALCOM_2 = rs01.getDouble("TOTALCOM_2");
                TOTALCOM_3 = rs01.getDouble("TOTALCOM_3");
                TOTALCOM_5 = rs01.getDouble("TOTALCOM_5");

                TCOMISCA_1 = rs01.getDouble("TCOMISCA_1");
                TCOMISCA_2 = rs01.getDouble("TCOMISCA_2");
                TCOMISCA_3 = rs01.getDouble("TCOMISCA_3");
                TCOMISCA_5 = rs01.getDouble("TCOMISCA_5");

                QTYTKT_1 = rs01.getInt("QTYTKT_1");
                QTYTKT_2 = rs01.getInt("QTYTKT_2");
                QTYTKT_3 = rs01.getInt("QTYTKT_3");
                QTYTKT_5 = rs01.getInt("QTYTKT_5");
                QTYTKT_6 = rs01.getInt("QTYTKT_6");

                T_DIFF_1 = rs01.getDouble("TOTALCOM_1") - rs01.getDouble("TCOMISCA_1");
                T_DIFF_2 = rs01.getDouble("TOTALCOM_2") - rs01.getDouble("TCOMISCA_2");
                T_DIFF_3 = rs01.getDouble("TOTALCOM_3") - rs01.getDouble("TCOMISCA_3");
                T_DIFF_5 = rs01.getDouble("TOTALCOM_5") - rs01.getDouble("TCOMISCA_5");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {

                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_STVAL = filter.IN_STVAL;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_BANK = filter.IN_BANK;
                    objRtn.IN_PNR = filter.IN_PNR;
                    objRtn.SDATE = filter.SDATE;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.CURRENPAY = filter.CURRENPAY;

                    objRtn.IN_BANK = rs01.getString("CODEBANK").trim();
                    objRtn.strBankDeposit = rs01.getString("DES_CODEBANK").trim();
                    objRtn.TOTALCHRG_1 = rs01.getDouble("TOTALCHRG_1");
                    objRtn.TOTALCHRG_2 = rs01.getDouble("TOTALCHRG_2");
                    objRtn.TOTALCHRG_3 = rs01.getDouble("TOTALCHRG_3");
                    objRtn.TOTALCHRG_5 = rs01.getDouble("TOTALCHRG_5");

                    objRtn.FIRSTINSAM_1 = rs01.getDouble("FIRSTINSAM_1");
                    objRtn.FIRSTINSAM_2 = rs01.getDouble("FIRSTINSAM_2");
                    objRtn.FIRSTINSAM_3 = rs01.getDouble("FIRSTINSAM_3");
                    objRtn.FIRSTINSAM_5 = rs01.getDouble("FIRSTINSAM_5");

                    objRtn.TOTALCOM_1 = rs01.getDouble("TOTALCOM_1");
                    objRtn.TOTALCOM_2 = rs01.getDouble("TOTALCOM_2");
                    objRtn.TOTALCOM_3 = rs01.getDouble("TOTALCOM_3");
                    objRtn.TOTALCOM_5 = rs01.getDouble("TOTALCOM_5");

                    objRtn.TCOMISCA_1 = rs01.getDouble("TCOMISCA_1");
                    objRtn.TCOMISCA_2 = rs01.getDouble("TCOMISCA_2");
                    objRtn.TCOMISCA_3 = rs01.getDouble("TCOMISCA_3");
                    objRtn.TCOMISCA_5 = rs01.getDouble("TCOMISCA_5");

                    objRtn.QTYTKT_1 = rs01.getInt("QTYTKT_1");
                    objRtn.QTYTKT_2 = rs01.getInt("QTYTKT_2");
                    objRtn.QTYTKT_3 = rs01.getInt("QTYTKT_3");
                    objRtn.QTYTKT_5 = rs01.getInt("QTYTKT_5");
                    objRtn.QTYTKT_6 = rs01.getInt("QTYTKT_6");

                    objRtn.T_DIFF_1 = rs01.getDouble("TOTALCOM_1") - rs01.getDouble("TCOMISCA_1");
                    objRtn.T_DIFF_2 = rs01.getDouble("TOTALCOM_2") - rs01.getDouble("TCOMISCA_2");
                    objRtn.T_DIFF_3 = rs01.getDouble("TOTALCOM_3") - rs01.getDouble("TCOMISCA_3");
                    objRtn.T_DIFF_5 = rs01.getDouble("TOTALCOM_5") - rs01.getDouble("TCOMISCA_5");

                    objRtn.strTitulo += "Sales Date: " + objRtn.strFormatDate;

                    objRtn.totTOTALCHRG_1 = TOTALCHRG_1;
                    objRtn.totTOTALCHRG_2 = TOTALCHRG_2;
                    objRtn.totTOTALCHRG_3 = TOTALCHRG_3;
                    objRtn.totTOTALCHRG_5 = TOTALCHRG_5;

                    objRtn.totFIRSTINSAM_1 = FIRSTINSAM_1;
                    objRtn.totFIRSTINSAM_2 = FIRSTINSAM_2;
                    objRtn.totFIRSTINSAM_3 = FIRSTINSAM_3;
                    objRtn.totFIRSTINSAM_5 = FIRSTINSAM_5;

                    objRtn.totTOTALCOM_1 = TOTALCOM_1;
                    objRtn.totTOTALCOM_2 = TOTALCOM_2;
                    objRtn.totTOTALCOM_3 = TOTALCOM_3;
                    objRtn.totTOTALCOM_5 = TOTALCOM_5;

                    objRtn.totTCOMISCA_1 = TCOMISCA_1;
                    objRtn.totTCOMISCA_2 = TCOMISCA_2;
                    objRtn.totTCOMISCA_3 = TCOMISCA_3;
                    objRtn.totTCOMISCA_5 = TCOMISCA_5;

                    objRtn.totQTYTKT_1 = QTYTKT_1;
                    objRtn.totQTYTKT_2 = QTYTKT_2;
                    objRtn.totQTYTKT_3 = QTYTKT_3;
                    objRtn.totQTYTKT_5 = QTYTKT_5;
                    objRtn.totQTYTKT_6 = QTYTKT_6;

                    objRtn.totT_DIFF_1 = T_DIFF_1;
                    objRtn.totT_DIFF_2 = T_DIFF_2;
                    objRtn.totT_DIFF_3 = T_DIFF_3;
                    objRtn.totT_DIFF_5 = T_DIFF_5;

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

    public List<A2290Filter> loadPX290SQP03205(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double TOTALCHRG = 0, FIRSTINSAM = 0, TOTALCOM = 0, TCOMISCA = 0, T_DIFF = 0;
        int QTYTKT = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03205(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.SDATE.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_AUTHNBR.trim());
            cstmt.setString(8, filter.IN_FTE.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.IN_CARDN1.trim());
            cstmt.setString(11, filter.IN_CARDN2.trim());
            cstmt.setString(12, filter.IN_BANK.trim());
            cstmt.setString(13, filter.IN_PNR.trim());

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                TOTALCHRG = rs01.getDouble("TOTALCHRG");
                FIRSTINSAM = rs01.getDouble("FIRSTINSAM");
                TOTALCOM = rs01.getDouble("TOTALCOM");
                QTYTKT = rs01.getInt("QTYTKT");
                TCOMISCA = rs01.getDouble("TCOMISCA");
                T_DIFF = rs01.getDouble("TOTALCOM") - rs01.getDouble("TCOMISCA");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {

                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_STVAL = filter.IN_STVAL;
                    objRtn.IN_BANK = filter.IN_BANK;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_PNR = filter.IN_PNR;
                    objRtn.strDayFrom = Functions.getMonthConvert(filter.SDATE);//SOLO PARA EL TITULO
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.strDescStatus = rs01.getString("DES_STVAL").trim();
                    objRtn.SDATE = rs01.getString("SDATE").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.SDATE);
                    objRtn.SDATEVTA = rs01.getString("SDATE").trim();
                    objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.SDATEVTA);
                    objRtn.SPNR = rs01.getString("SPNRVTA").trim();
                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.strDescCard = rs01.getString("DES_SCARCOD").trim();
                    objRtn.FTE = rs01.getString("FTE").trim();
                    objRtn.strSCARF = rs01.getString("DES_FTE").trim();
                    objRtn.SCARDN = rs01.getString("SCARDN").trim();
                    objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                    objRtn.HOCR = rs01.getString("HORAL").trim();
                    objRtn.SDATEL = rs01.getString("DATEL").trim();
                    objRtn.CURRENPAY = rs01.getString("CURRENPAY").trim();
                    objRtn.TVENTA = rs01.getString("TVENTA").trim();
                    objRtn.strTVENTA = rs01.getString("DES_VTA_S").trim();
                    objRtn.strSORIG = rs01.getString("DES_VTA").trim();
                    objRtn.TOTALCHRG = rs01.getDouble("TOTALCHRG");
                    objRtn.INSTLCOUNT = rs01.getString("INSTLCOUNT").trim();
                    objRtn.SAGENT = rs01.getString("SAGENT").trim();
                    objRtn.strComment = rs01.getString("NOMAGENT").trim();
                    objRtn.SPNRSP = rs01.getString("SPNR").trim();
                    objRtn.NAID = rs01.getInt("NAID");
                    objRtn.FIRSTINSAM = rs01.getDouble("FIRSTINSAM");
                    objRtn.QTYTKT = rs01.getInt("QTYTKT");
                    objRtn.TOTALCOM = rs01.getDouble("TOTALCOM");
                    objRtn.TCOMISCA = rs01.getDouble("TCOMISCA");
                    objRtn.diffTCOMIS = rs01.getDouble("TOTALCOM") - rs01.getDouble("TCOMISCA");

                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    if (objRtn.TDOC.equals("S")) {
                        objRtn.strTOPER = "Sales";
                    } else if (objRtn.TDOC.equals("R")) {
                        objRtn.strTOPER = "Refund";
                    } else {
                        objRtn.strTOPER = " ";
                    }

                    objRtn.FADM = rs01.getString("FADM").trim();
                    if (rs01.getString("FADM").equals("1")) {
                        objRtn.strFADM = "PRE-ADM";
                    } else if (rs01.getString("FADM").equals("P")) {
                        objRtn.strFADM = "Generado";
                    } else if (rs01.getString("FADM").equals("Y")) {
                        objRtn.strFADM = "Por Defecto";
                    } else if (rs01.getString("FADM").equals("D")) {
                        objRtn.strFADM = "Deshabilitado";
                    } else if (rs01.getString("FADM").equals("C")) {
                        objRtn.strFADM = "Cliente No regitrado en PRAXIS";
                    } else if (rs01.getString("FADM").equals("R")) {
                        objRtn.strFADM = "Rechazado";
                    } else {
                        objRtn.strFADM = objRtn.FADM.trim();
                    }

                    objRtn.strTitulo += "Sales Date: " + objRtn.strDayFrom + "  " + " **" + objRtn.strDescStatus + "** ";

                    objRtn.totTOTALCHRG = TOTALCHRG;
                    objRtn.totFIRSTINSAM = FIRSTINSAM;
                    objRtn.totTOTALCOM = TOTALCOM;
                    objRtn.totQTYTKT = QTYTKT;
                    objRtn.totTCOMISCA = TCOMISCA;
                    objRtn.totDIFF_SVFOP = T_DIFF;

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

    public List<A2290Filter> loadPX290SQP03206(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblTotSVFOP = 0, dblTotAVFOP = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03206(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATEVTA.trim());//20190102
            cstmt.setString(3, filter.TDOC.trim());//S
            cstmt.setString(4, filter.SAUTHOC.trim());//184242
            cstmt.setString(5, filter.FTE.trim());//B
            if (filter.SCARDN.trim().length() >= 15) {//491573******6225
                cstmt.setString(6, filter.SCARDN.substring(0, 6).trim());
                cstmt.setString(7, filter.SCARDN.substring(filter.SCARDN.trim().length() - 4).trim());
            } else {
                cstmt.setString(6, "");
                cstmt.setString(7, "");
            }
            cstmt.setInt(8, filter.NAID);
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.SPNR.trim());
            cstmt.setString(11, filter.CODEBANK.trim());
            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                dblTotSVFOP = rs01.getDouble("SVFOP");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {

                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;

                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.strDescStatus = filter.strDescStatus;
                    objRtn.SDATE = rs01.getString("SDATE").trim();
                    objRtn.SPNR = rs01.getString("SPNR").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.SDATE);
                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.strDescCard = filter.strDescCard;
                    objRtn.FTE = rs01.getString("FTE").trim();
                    objRtn.strSCARF = filter.strSCARF;
                    objRtn.SCARDN = rs01.getString("SCARDN").trim();
                    objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    objRtn.TRNCU = rs01.getString("TRNCU");
                    objRtn.strTicket = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                    objRtn.CCIA = rs01.getString("CCIA").trim();
                    objRtn.FORMA = rs01.getString("FORMA").trim();
                    objRtn.SERIE = rs01.getString("SERIE").trim();
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    objRtn.SEQ = rs01.getString("RFIS1").trim();
                    objRtn.REFERENNUM = rs01.getString("RFIS1A").trim();
                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.strSCARDN = rs01.getString("ACARDN").trim();
                    objRtn.SAGENT = rs01.getString("SAGENT").trim();
                    objRtn.TRNCU = rs01.getString("RFIC").trim();
                    objRtn.strDescCountry = rs01.getString("NAMES").trim();
                    objRtn.strDescripcion = rs01.getString("DES_A1772FEE").trim();
                    objRtn.strFLOAD = rs01.getString("DES_A1772FEEA").trim();
                    objRtn.NAID = rs01.getInt("NAID");

                    if (rs01.getString("TKVOID").trim().equals("V")) {
                        objRtn.strFlagStat = "Void";

                    } else if (rs01.getString("FLAGC").trim().equals("C")) {
                        objRtn.strFlagStat = "CNJ";
                    }

                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    if (objRtn.TDOC.equals("S")) {
                        objRtn.strTOPER = "SALE";
                    } else if (objRtn.TDOC.equals("R")) {
                        objRtn.strTOPER = "REFUND";
                    } else {
                        objRtn.strTOPER = " ";
                    }

                    objRtn.strTitulo += "Sales Date: " + objRtn.strFormatDate + "     Country: " + objRtn.strDescCountry.trim() + "    Card: "
                            + objRtn.SCARCOD + "-" + objRtn.strDescCard + "  **" + objRtn.strDescStatus + "** ";

                    objRtn.dblTotSVFOP = dblTotSVFOP;

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

    public A2290Filter loadSQP03214(A2290Filter filter) throws SQLException, Exception {

        A2290Filter bean = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03214(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.SDATE.trim());
            cstmt01.setString(3, filter.SCOUNTRY.trim());
            cstmt01.setString(4, filter.TDOC.trim());
            cstmt01.setString(5, filter.CODEBANK.trim());
            cstmt01.setString(6, filter.SCARCOD.trim());
            cstmt01.setString(7, filter.SCARDN.trim());
            cstmt01.setString(8, filter.SAUTHOC.trim());

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            if (rst.next()) {
                bean.CCUST = rst.getString("CCUST");
                bean.STVAL = rst.getString("STVAL").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.strDescStatus = rst.getString("DES_STVAL").trim();
                bean.SDATE = rst.getString("SDATE").trim();
                bean.SPNR = rst.getString("SPNRVTA").trim();
                bean.strFormatDate = Functions.getMonthConvert(bean.SDATE);
                bean.CODEBANK = rst.getString("CODEBANK").trim();
                bean.SCARCOD = rst.getString("SCARCOD").trim();
                bean.strDescCard = rst.getString("DES_SCARCOD").trim();
                bean.FTE = rst.getString("FTE").trim();
                bean.strSCARF = rst.getString("DES_FTE").trim();
                bean.SCARDN = rst.getString("SCARDN").trim();
                bean.SAUTHOC = rst.getString("SAUTHOC").trim();
                bean.strDayTo = rst.getString("HORAL").trim();
                bean.SDATEL = rst.getString("DATEL").trim();
                bean.CURRENPAY = rst.getString("CURRENPAY").trim();
                bean.TVENTA = rst.getString("TVENTA").trim();
                bean.strTVENTA = rst.getString("DES_VTA_S").trim();
                bean.strSORIG = rst.getString("DES_VTA").trim();
                bean.TOTALCHRG = rst.getDouble("TOTALCHRG");
                bean.INSTLCOUNT = rst.getString("INSTLCOUNT").trim();
                bean.SAGENT = rst.getString("SAGENT").trim();
                bean.strComment = rst.getString("NOMAGENT").trim();
                bean.FIRSTINSAM = rst.getDouble("FIRSTINSAM");
                bean.QTYTKT = rst.getInt("QTYTKT");
                bean.TOTALCOM = rst.getDouble("TOTALCOM");
                bean.TCOMISCA = rst.getDouble("TCOMISCA");
                bean.diffTCOMIS = rst.getDouble("TOTALCOM") - rst.getDouble("TCOMISCA");
                bean.MERCHN = rst.getString("MERCHN").trim();
                bean.ADMNUM = rst.getString("ADMNUM").trim();
                bean.NUMADM = rst.getString("NUMADM").trim();
                bean.DATEADM = rst.getString("DATEADM").trim();
                bean.TOTADM = rst.getDouble("TOTADM");
                bean.CURRADM = rst.getString("CURRADM").trim();
                bean.FADM = rst.getString("FADM").trim();
                if (rst.getString("FADM").equals("1")) {
                    bean.strFADM = "PRE-ADM";
                } else {
                    bean.strFADM = bean.FADM.trim();
                }

                bean.TDOC = rst.getString("TDOC").trim();
                if (bean.TDOC.equals("S")) {
                    bean.strTOPER = "Sales";
                } else if (bean.TDOC.equals("R")) {
                    bean.strTOPER = "Refund";
                } else {
                    bean.strTOPER = " ";
                }

                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = rst.getString("HOCR");
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = rst.getString("HOUP");

            }
        } catch (Exception e) {
            // e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return bean;
    }

    public String loadSQP03215(A2290Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03215_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.FADM.trim());//check para habiliar que sea un ADM
            cstmt.setString(4, filter.SDATE.trim());
            cstmt.setString(5, filter.SCOUNTRY.trim());
            cstmt.setString(6, filter.TDOC.trim());
            cstmt.setString(7, filter.CODEBANK.trim());
            cstmt.setString(8, filter.SCARCOD.trim());
            cstmt.setString(9, filter.SCARDN.trim());
            cstmt.setString(10, filter.SAUTHOC.trim());
            cstmt.setDouble(11, filter.diffTCOMIS);
            cstmt.setString(12, filter.CURRENPAY.trim());
            cstmt.setString(13, session.getUserView().getUserInfo().USR);
            cstmt.setString(14, Functions.getFechaActual());
            cstmt.setString(15, Functions.getHoraActual());
            cstmt.execute();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
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

        return strMsj;
    }

    public List<A2290Filter> loadPX290SQP03221(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        //double dblTotSVFOP = 0, dblTotAVFOP = 0;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        //HashMap hmCard = new HashMap();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03221(?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.SDATE.trim());//DESCARGA ESCEL POR MES, MODIFICAR PROCEDURE PARA QUE DESCARGUE POR DIA
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_AUTHNBR.trim());
            cstmt.setString(8, filter.IN_FTE.trim());
            cstmt.setString(9, filter.IN_CARDN1.trim());
            cstmt.setString(10, filter.IN_CARDN2.trim());
            cstmt.setString(11, filter.STVAL.trim());
            cstmt.setString(12, filter.IN_BANK.trim());
            cstmt.setString(13, filter.IN_PNR.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            /*while (rs01.next()) {

             dblTotSVFOP = rs01.getDouble("SVFOP");

             }

             try {
             rs01.close();
             } catch (SQLException e) {
             logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
             }*/
            while (rs01.next()) {

                objRtn = new A2290Filter();
                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                objRtn.IN_TDOC = filter.IN_TDOC;
                objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                objRtn.IN_FTE = filter.IN_FTE;
                objRtn.IN_STVAL = filter.IN_STVAL;
                objRtn.IN_CARDN1 = filter.IN_CARDN1;
                objRtn.IN_CARDN2 = filter.IN_CARDN2;
                objRtn.strDescStatus = filter.strDescStatus;
                objRtn.strDescCard = filter.strDescCard;

                objRtn.SDATE = rs01.getString("SDATE").trim();
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.SDATE);
                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                objRtn.strBankDeposit = rs01.getString("NAMEBANK").trim();
                objRtn.FTE = rs01.getString("FTE").trim();
                objRtn.strSCARF = rs01.getString("DES_FTE").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                objRtn.strSORIG = rs01.getString("DES_VTA").trim();
                objRtn.TDOC = rs01.getString("TDOC").trim();
                if (objRtn.TDOC.equals("S")) {
                    objRtn.strTOPER = "SALE";
                } else if (objRtn.TDOC.equals("R")) {
                    objRtn.strTOPER = "REFUND";
                } else {
                    objRtn.strTOPER = " ";
                }

                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.SPNR = rs01.getString("SPNR").trim();
                objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.strTicket = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.FORMA = rs01.getString("FORMA").trim();
                objRtn.SERIE = rs01.getString("SERIE").trim();
                objRtn.SEQ = rs01.getString("RFIS1").trim();
                objRtn.REFERENNUM = rs01.getString("RFIS1A").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.SAGENT = rs01.getString("SAGENT").trim();
                objRtn.TRNCU = rs01.getString("RFIC").trim();
                objRtn.strDescripcion = rs01.getString("DES_A1772FEE").trim();
                objRtn.strFLOAD = rs01.getString("DES_A1772FEEA").trim();
                objRtn.SVFOP = rs01.getDouble("SVFOP");
                objRtn.MERCHN = rs01.getString("MERCHN").trim();
                objRtn.TOTADM = rs01.getDouble("TOTADM");
                objRtn.TOTALCOM = rs01.getDouble("TOTALCOM");
                objRtn.TCOMISCA = rs01.getDouble("TCOMISCA");

                objRtn.strTitulo += objRtn.SDATE + " - Country : " + objRtn.strDescCountry.trim() + " - Card : "
                        + objRtn.SCARCOD + " : " + objRtn.strDescCard + " **" + objRtn.strDescStatus + "** ";

                //objRtn.dblTotSVFOP = dblTotSVFOP;
                list.add(objRtn);

            }

            /*for(int i=0; i<list.size(); i++){
             if(!list.get(i).REFERENNUM.trim().startsWith("M") && !hmCard.containsKey(list.get(i).SCARDN)){
             System.out.println("CARD: " + list.get(i).SCARDN);
             }
             }*/
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
}
