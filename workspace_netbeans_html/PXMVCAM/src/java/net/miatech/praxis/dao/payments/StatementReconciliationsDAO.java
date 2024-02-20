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
import static net.miatech.praxis.dao.payments.BankReconciliationDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class StatementReconciliationsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public StatementReconciliationsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public StatementReconciliationsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2290Filter> loadPX287SQP00838(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQWECC = 0, lngTotQPEND = 0, lngTotQDIFF = 0, lngTotQTOTSAL = 0, total = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00838(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(5, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_BANK.trim());
            cstmt.setString(8, filter.IN_AFTE.trim());
            cstmt.setString(9, filter.IN_TTRAN.trim());

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQTOTSAL = lngTotQMATCH + lngTotQDIFF;
                lngTotQWECC = rst.getLong("QWECC");
                lngTotQPEND = rst.getLong("QPEND");
                total = lngTotQMATCH + lngTotQWECC + lngTotQPEND + lngTotQDIFF;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QDIFF");
                    beanTkt.lngQWECC = rst.getLong("QWECC");
                    beanTkt.lngQPEND = rst.getLong("QPEND");

                    beanTkt.Total = beanTkt.lngQMATCH + beanTkt.lngQWECC + beanTkt.lngQPEND + beanTkt.lngQDIFF;

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQWECC = lngTotQWECC;
                    beanTkt.lngTotQTOTSAL = lngTotQTOTSAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotTotal = total;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX287SQP00839(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQWECC = 0, lngTotQPEND = 0, lngTotQDIFF = 0, lngTotQTOTSAL = 0, total = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00839(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_MERCHN.trim());
            cstmt.setString(6, filter.IN_BANK.trim());
            cstmt.setString(7, filter.IN_TTRAN.trim());

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQTOTSAL = lngTotQMATCH + lngTotQDIFF;
                lngTotQWECC = rst.getLong("QWECC");
                lngTotQPEND = rst.getLong("QPEND");
                total = lngTotQMATCH + lngTotQWECC + lngTotQPEND + lngTotQDIFF;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_CBANK = rst.getString("CBANK").trim();

                    if (rst.getString("CBANK").trim().isEmpty()) {
                        beanTkt.CBANK = "**";
                        beanTkt.strCREJEC = "(Empty)";
                        beanTkt.strDescripcion = "(Empty)";
                    } else {
                        beanTkt.CBANK = rst.getString("CBANK").trim();
                        beanTkt.strCREJEC = rst.getString("BANKN").trim();
                        beanTkt.strDescripcion = rst.getString("BANKN").trim();
                    }

                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QDIFF");
                    beanTkt.lngQWECC = rst.getLong("QWECC");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.Total = beanTkt.lngQMATCH + beanTkt.lngQWECC + beanTkt.lngQPEND + beanTkt.lngQDIFF;

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQWECC = lngTotQWECC;
                    beanTkt.lngTotQTOTSAL = lngTotQTOTSAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotTotal = total;

                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + filter.strFormatDate;
                    } else {
                        beanTkt.strTitulo = "Abono Date : " + filter.strFormatDate;
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX287SQP00839ByS(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQACCB = 0, lngTotSVFOP = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00839Stval(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_SDATE);
            cstmt.setString(4, filter.IN_STVAL.trim());

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQACCB = rst.getLong("QTY");
                lngTotSVFOP = rst.getLong("DAMOUNTR");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.IN_SDATE);
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();

                    beanTkt.IN_CBANK = rst.getString("CBANK").trim();

                    if (rst.getString("CBANK").trim().isEmpty()) {
                        beanTkt.CBANK = "**";
                        beanTkt.strCREJEC = "(Empty)";
                        beanTkt.strDescripcion = "(Empty)";
                    } else {
                        beanTkt.CBANK = rst.getString("CBANK").trim();
                        beanTkt.strCREJEC = rst.getString("BANKN").trim();
                        beanTkt.strDescripcion = rst.getString("BANKN").trim();
                    }

                    //beanTkt.lngTotTotal = total;
                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + beanTkt.strFormatDate;
                    } else {
                        beanTkt.strTitulo = "Abono Date : " + beanTkt.strFormatDate;
                    }
                    beanTkt.lngQACCB = rst.getLong("QTY");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.SVFOP = rst.getLong("DAMOUNTR");

                    beanTkt.lngTotQACCB = lngTotQACCB;
                    beanTkt.lngTotSVFOP = lngTotSVFOP;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX287SQP00840(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQWECC = 0, lngTotQPEND = 0, lngTotQDIFF = 0, lngTotQTOTSAL = 0, total = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00840(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_CBANK);
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_TTRAN.trim());

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQTOTSAL = lngTotQMATCH + lngTotQDIFF;
                lngTotQWECC = rst.getLong("QWECC");
                lngTotQPEND = rst.getLong("QPEND");
                total = lngTotQMATCH + lngTotQWECC + lngTotQPEND + lngTotQDIFF;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_SDATE);
                    beanTkt.strCREJEC = filter.strCREJEC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QDIFF");
                    beanTkt.lngQWECC = rst.getLong("QWECC");
                    beanTkt.lngQPEND = rst.getLong("QPEND");

                    beanTkt.Total = beanTkt.lngQMATCH + beanTkt.lngQWECC + beanTkt.lngQPEND + beanTkt.lngQDIFF;

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQWECC = lngTotQWECC;
                    beanTkt.lngTotQTOTSAL = lngTotQTOTSAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotTotal = total;

                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + beanTkt.strFormatDate + " - Bank : " + beanTkt.IN_CBANK;
                    } else {
                        beanTkt.strTitulo = "Abono Date : " + beanTkt.strFormatDate + " - Bank : " + beanTkt.IN_CBANK;
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX287SQP00840ByS(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQACCB = 0, lngTotSVFOP = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00840Stval(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_CBANK);
            cstmt.setString(6, filter.IN_STVAL.trim());
            cstmt.setString(7, filter.IN_TTRAN.trim());

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQACCB = rst.getLong("QTY");
                lngTotSVFOP = rst.getLong("DAMOUNTR");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_SDATE);

                    beanTkt.SDATE = rst.getString("VALDATE");
                    beanTkt.lngQACCB = rst.getLong("QTY");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.SVFOP = rst.getLong("DAMOUNTR");

                    beanTkt.lngTotQACCB = lngTotQACCB;
                    beanTkt.lngTotSVFOP = lngTotSVFOP;

                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + beanTkt.strFormatDate + " - Bank : " + beanTkt.IN_CBANK;
                    } else {
                        beanTkt.strTitulo = "Abono Date : " + beanTkt.strFormatDate + " - Bank : " + beanTkt.IN_CBANK;
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX287SQP00841(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0, totNETOC = 0;
        long totQTYTRAS = 0, totQTYTRAN1 = 0, totQTYTRAN3 = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00841(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_CBANK);
            cstmt.setString(6, filter.IN_STVAL);
            cstmt.setString(7, filter.IN_TTRAN.trim());

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totNETO = rst.getDouble("NETO");
                totNETOC = rst.getDouble("NETOC");
                totQTYTRAS = rst.getLong("QTYTRAS");
                totQTYTRAN1 = rst.getLong("QTYTRAN1");
                totQTYTRAN3 = rst.getLong("QTYTRAN3");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();
                    beanTkt.strFormatDate = rst.getString("VALDATE").trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.ADATE = rst.getString("ADATE").trim();
                    beanTkt.VALDATE = rst.getString("VALDATE").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.NETO = rst.getDouble("NETO");
                    beanTkt.NETOC = rst.getDouble("NETOC");
                    beanTkt.totNETO = totNETO;
                    beanTkt.totNETOC = totNETOC;
                    beanTkt.QTYTRAS = rst.getInt("QTYTRAS");
                    beanTkt.QTYTRAN1 = rst.getInt("QTYTRAN1");
                    beanTkt.totQTYTRAN1 = totQTYTRAN1;
                    beanTkt.QTYTRAN3 = rst.getInt("QTYTRAN3");
                    beanTkt.totQTYTRAN3 = totQTYTRAN3;
                    beanTkt.totQTYTRAS = totQTYTRAS;
                    beanTkt.VALDATE = rst.getString("VALDATE").trim();
                    beanTkt.UNICODE = rst.getString("UNICODE").trim();

                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + beanTkt.VALDATE + " - Bank : " + beanTkt.IN_CBANK;
                    } else {
                        beanTkt.strTitulo = "Abono Date : " + beanTkt.ADATE + " - Bank : " + beanTkt.IN_CBANK;
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX287SQP00841ByS(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0, totNETOC = 0;
        long totQTYTRAS = 0, totQTYTRAN1 = 0, totQTYTRAN3 = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05111Cross(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_SDATE);
            cstmt.setString(4, filter.IN_CBANK);
            cstmt.setString(5, filter.IN_STVAL);

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totNETO = rst.getDouble("NETO");
                totNETOC = rst.getDouble("NETOC");
                totQTYTRAS = rst.getLong("QTYTRAS");
                totQTYTRAN1 = rst.getLong("QTYTRAN1");
                totQTYTRAN3 = rst.getLong("QTYTRAN3");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();

                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.ADATE = rst.getString("ADATE").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.NETO = rst.getDouble("NETO");
                    beanTkt.NETOC = rst.getDouble("NETOC");
                    beanTkt.totNETO = totNETO;
                    beanTkt.totNETOC = totNETOC;
                    beanTkt.QTYTRAS = rst.getInt("QTYTRAS");
                    beanTkt.QTYTRAN1 = rst.getInt("QTYTRAN1");
                    beanTkt.totQTYTRAN1 = totQTYTRAN1;
                    beanTkt.QTYTRAN3 = rst.getInt("QTYTRAN3");
                    beanTkt.totQTYTRAN3 = totQTYTRAN3;
                    beanTkt.totQTYTRAS = totQTYTRAS;
                    beanTkt.VALDATE = rst.getString("VALDATE").trim();
                    beanTkt.UNICODE = rst.getString("UNICODE").trim();

                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + beanTkt.VALDATE + " - Bank : " + beanTkt.IN_CBANK;
                    } else {
                        beanTkt.strTitulo = "Abono Date : " + beanTkt.ADATE + " - Bank : " + beanTkt.IN_CBANK;
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX287SQP00842(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0;
        long totQTYTRAS = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00842(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.BANDOC);

            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totQTYTRAS = rst.getLong("QTYTRAS");
                totNETO = rst.getDouble("NETO");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();

//                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
//                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.CODEBANK = rst.getString("BANCODE").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.NETO = rst.getDouble("NETO");

                    beanTkt.totQTYTRAS = totQTYTRAS;
                    beanTkt.totNETO = totNETO;

                    beanTkt.strTitulo = filter.strTitulo.trim();

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return lstTkts;
    }

    public A2290Filter loadPX287SQP00844(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");
        String VALDATEL = "", UNICODEL = "", BANDOCL = "", SCURRENCYL = "", ACCNUMBER = "";
        Double NETOL = 0.0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00844(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_VALDATE.trim());
            cstmt.setString(3, filter.IN_CODEBANK.trim());
            cstmt.setString(4, filter.IN_UNICODE.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                VALDATEL = rst.getString("VALDATE").trim();
                UNICODEL = rst.getString("UNICODE").trim();
                BANDOCL = rst.getString("BANDOC").trim();
                SCURRENCYL = rst.getString("SCURRENCY").trim();
                ACCNUMBER = rst.getString("ACCNUMBER").trim();
                NETOL = rst.getDouble("NETO");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }

                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.CODEBANKA = rst.getString("CODEBANKA").trim();
                    beanTkt.NAME = rst.getString("NAME").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.QTYTRAN1 = rst.getInt("QTYTRAN1");
                    beanTkt.VALDATE = rst.getString("VALDATE").trim();
                    beanTkt.UNICODE = rst.getString("UNICODE").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.NETO = rst.getDouble("NETO");
                    beanTkt.VALDATEL = VALDATEL;
                    beanTkt.UNICODEL = UNICODEL;
                    beanTkt.BANDOCL = BANDOCL;
                    beanTkt.SCURRENCYL = SCURRENCYL;
                    beanTkt.NETOL = NETOL;
                    beanTkt.ACCNUMBER = ACCNUMBER;
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.DIFF = beanTkt.NETO - beanTkt.NETOL;

                    beanTkt.USCR = rst.getString("USCR").trim();
                    beanTkt.FECR = rst.getString("FECR").trim();
                    beanTkt.HOCR = rst.getString("HOCR").trim();
                    beanTkt.USUP = rst.getString("USUP").trim();
                    beanTkt.FEUP = rst.getString("FEUP").trim();
                    beanTkt.HOUP = rst.getString("HOUP").trim();
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return beanTkt;
    }

    public List<A2290Filter> loadPX269SQP05114Detail(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0;
        long totQTYTRAS = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05114Detail(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_VALDATE.trim());
            cstmt.setString(3, filter.IN_CODEBANK.trim());
            cstmt.setString(4, filter.IN_UNICODE.trim());

            cstmt.execute();

//            rst = cstmt.getResultSet();
//
//            while (rst.next()) {
//                totQTYTRAS = rst.getLong("QTYTRAS");
//                totNETO = rst.getDouble("NETO");
//            }
//            rst.close();
//
//            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.CCUST = rst.getString("CCUST");
                    beanTkt.STVAL = rst.getString("STVAL");
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SDATE = rst.getString("SDATE");
                    beanTkt.SAGENT = rst.getString("SAGENT");
                    beanTkt.TERMI = rst.getString("TERMI");
                    beanTkt.RED = rst.getString("RED");
                    beanTkt.CARDTYPE = rst.getString("CARDTYPE");
                    beanTkt.SCARDN = rst.getString("SCARDN");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.TOTAL = rst.getDouble("TOTAL");
                    beanTkt.NETO = rst.getDouble("NETO");

                    lstTkts.add(beanTkt);
                }
                rst.close();
//            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return lstTkts;
    }

}
