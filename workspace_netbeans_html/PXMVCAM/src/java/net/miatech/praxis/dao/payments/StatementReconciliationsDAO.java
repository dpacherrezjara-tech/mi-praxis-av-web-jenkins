/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.payments.BankReconciliationDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.MPF101;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.MPF100Filter;
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
        long lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotTOTALE = 0, lngTotQPEND = 0, lngTotQPEND1 = 0, lngTotQPEND3 = 0, lngTotQSALES = 0;
        long lngTotQTMATCH = 0, lngTotQTMANUAL = 0, lngTotQTPEND = 0, lngTotTOTALL = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00838(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00838MAIN_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(5, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_BANK.trim());
            cstmt.setString(8, filter.IN_AFTE.trim());
            cstmt.setString(9, filter.IN_TTRAN.trim());
            cstmt.setString(10, filter.IN_COUNTRY.trim());
            cstmt.setString(11, filter.IN_COREP.trim());
            cstmt.setString(12, filter.IN_EXT.trim());

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rst = cstmt.getResultSet();

            while (rst.next()) {

                //QMATCH, QMANUAL, TOTALE, QPEND, QSALES,QTMATCH, QTMANUAL, QTPEND,  TOTALL
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotTOTALE = rst.getLong("TOTALE");
                lngTotQPEND = rst.getLong("QPEND");
                lngTotQPEND1 = rst.getLong("QPEND1");
                lngTotQPEND3 = rst.getLong("QPEND3");
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQTMATCH = rst.getLong("QTMATCH");
                lngTotQTMANUAL = rst.getLong("QTMANUAL");
                lngTotQTPEND = rst.getLong("QTPEND");
                lngTotTOTALL = rst.getLong("TOTALL");
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
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_COREP = filter.IN_COREP.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngTOTALE = rst.getLong("TOTALE");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQPEND1 = rst.getLong("QPEND1");
                    beanTkt.lngQPEND3 = rst.getLong("QPEND3");
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQMATCHPercent = ((beanTkt.lngQSALES - beanTkt.lngQPEND1) > 0) ? (beanTkt.lngQMATCH * 100.0) / (beanTkt.lngQSALES - beanTkt.lngQPEND1) : 0.00;

                    beanTkt.lngQTMATCH = rst.getLong("QTMATCH");
                    beanTkt.lngQTMANUAL = rst.getLong("QTMANUAL");
                    beanTkt.lngQTPEND = rst.getLong("QTPEND");
                    beanTkt.lngTOTALL = rst.getLong("TOTALL");
                    beanTkt.lngQTMATCHPercent = ((beanTkt.lngTOTALL - beanTkt.lngQTPEND) > 0) ? (beanTkt.lngQTMATCH * 100.0) / (beanTkt.lngTOTALL - beanTkt.lngQTPEND) : 0.00;

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotTOTALE = lngTotTOTALE;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQPEND1 = lngTotQPEND1;
                    beanTkt.lngTotQPEND3 = lngTotQPEND3;
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQTMATCH = lngTotQTMATCH;
                    beanTkt.lngTotQTMANUAL = lngTotQTMANUAL;
                    beanTkt.lngTotQTPEND = lngTotQTPEND;
                    beanTkt.lngTotTOTALL = lngTotTOTALL;

                    beanTkt.lngTotQMATCHPercent = ((beanTkt.lngTotQSALES - beanTkt.lngTotQPEND1) > 0) ? (beanTkt.lngTotQMATCH * 100.0) / (beanTkt.lngTotQSALES - beanTkt.lngTotQPEND1) : 0.00;
                    beanTkt.lngTotQTMATCHPercent = (beanTkt.lngTotTOTALL > 0) ? (beanTkt.lngTotQTMATCH * 100.0) / beanTkt.lngTotTOTALL : 0.00;

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


    public List<A2290Filter> loadPX287SQP00838PEND(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQWECC = 0, lngTotQPEND = 0, lngTotQDIFF = 0, lngTotQTOTSAL = 0, total = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("", "Bank whitout Liquidacion");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00838PEND(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_ADATE);
            cstmt.setString(3, filter.IN_ACCNUMBER);
            cstmt.setString(4, filter.IN_strNETO);
            cstmt.setString(5, filter.IN_MERCHAND);
            cstmt.setString(6, filter.IN_SDATE.trim());
            cstmt.setString(7, filter.IN_SCARCOD.trim());
            cstmt.setString(8, filter.IN_TDOC.trim());
            cstmt.setString(9, filter.IN_CODEBANK.trim());

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

                beanTkt = new A2290Filter();

//                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
//                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.MERCHAND = rst.getString("MERCHAND").trim();
//                beanTkt.BANDOC   = rst.getString("BANDOC").trim();
                beanTkt.ADATE = rst.getString("ADATE").trim();
//                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.NETO = rst.getDouble("NETO");
//                beanTkt.TOTAMOUNT = rst.getDouble("TOTAMOUNT");
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                beanTkt.QTYSETT = rst.getInt("QTY");
                beanTkt.CODEBANK = rst.getString("CODEBANK");
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                }
                beanTkt.descTDOC = hmDescDocType.containsKey(rst.getString("TDOC").trim().toUpperCase()) ? hmDescDocType.get(rst.getString("TDOC").trim()).toString() : rst.getString("TDOC").trim();
                lngTotQTOTSAL = lngTotQTOTSAL + beanTkt.QTYSETT;

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
            }
            for (int i = 0; i < lstTkts.size(); i++) {
                lstTkts.get(i).lngTotQTOTSAL = lngTotQTOTSAL;

            }
            rst.close();

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00839_PROCESS_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_MERCHN.trim());
            cstmt.setString(6, filter.IN_BANK.trim());
            cstmt.setString(7, filter.IN_TTRAN.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.IN_COREP.trim());
            cstmt.setString(10, filter.IN_EXT.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

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
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();
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

                    if (rst.getString("SCOUNTRY").trim().isEmpty()) {
                        beanTkt.SCOUNTRY = "**";
//                        beanTkt.strCREJEC = "(Empty)";
                        beanTkt.strDescripcionSCOUNTRY = "(Empty)";
                    } else {
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                        beanTkt.strCREJEC = rst.getString("BANKN").trim();
                        beanTkt.strDescripcionSCOUNTRY = rst.getString("SCOUNTRYN").trim();
                    }
//                    if (rst.getString("COREP").trim().isEmpty()) {
//                        beanTkt.COREP = "**";
////                        beanTkt.strCREJEC = "(Empty)";
//                        beanTkt.strDescripcionCOREP = "(Empty)";
//                    } else {
//                        beanTkt.COREP = rst.getString("COREP").trim();
////                        beanTkt.strCREJEC = rst.getString("BANKN").trim();
//                        beanTkt.strDescripcionCOREP = rst.getString("COREPN").trim();
//                    }

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00839STVAL_PROCESS_1(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_SDATE);
            cstmt.setString(4, filter.IN_STVAL.trim());
            cstmt.setString(5, filter.IN_BANK.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_COUNTRY.trim());
            cstmt.setString(8, filter.IN_COREP.trim());
            cstmt.setString(9, filter.IN_EXT.trim());

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
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_COREP = filter.IN_COREP.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();

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
                    if (rst.getString("SCOUNTRY").trim().isEmpty()) {
                        beanTkt.SCOUNTRY = "**";
//                        beanTkt.strCREJEC = "(Empty)";
                        beanTkt.strDescripcionSCOUNTRY = "(Empty)";
                    } else {
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                        beanTkt.strCREJEC = rst.getString("BANKN").trim();
                        beanTkt.strDescripcionSCOUNTRY = rst.getString("SCOUNTRYN").trim();
                    }
                    if (rst.getString("COREP").trim().isEmpty()) {
                        beanTkt.COREP = "**";
//                        beanTkt.strCREJEC = "(Empty)";
                        beanTkt.strDescripcionCOREP = "(Empty)";
                    } else {
                        beanTkt.COREP = rst.getString("COREP").trim();
//                        beanTkt.strCREJEC = rst.getString("BANKN").trim();
                        beanTkt.strDescripcionCOREP = rst.getString("COREPN").trim();
                    }
//                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                    beanTkt.COREP = rst.getString("COREP").trim();
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

    public List<A2290Filter> loadPX287SQP00839ProceLiqByS(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQACCB = 0, lngTotSVFOP = 0;
        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00839STVAL_PROCE_LIQ_1(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_STVAL.trim());
            cstmt.setString(4, filter.IN_BANK.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_COREP.trim());
            cstmt.setString(8, filter.IN_EXT.trim());

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

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
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_DATE);
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();

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
                    if (rst.getString("SCOUNTRY").trim().isEmpty()) {
                        beanTkt.SCOUNTRY = "**";
//                        beanTkt.strCREJEC = "(Empty)";
                        beanTkt.strDescripcionSCOUNTRY = "(Empty)";
                    } else {
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                        beanTkt.strCREJEC = rst.getString("BANKN").trim();
                        beanTkt.strDescripcionSCOUNTRY = rst.getString("SCOUNTRYN").trim();
                    }
                    if (rst.getString("COREP").trim().isEmpty()) {
                        beanTkt.COREP = "**";
//                        beanTkt.strCREJEC = "(Empty)";
                        beanTkt.strDescripcionCOREP = "(Empty)";
                    } else {
                        beanTkt.COREP = rst.getString("COREP").trim();
//                        beanTkt.strCREJEC = rst.getString("BANKN").trim();
                        beanTkt.strDescripcionCOREP = rst.getString("COREPN").trim();
                    }
//                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                    beanTkt.COREP = rst.getString("COREP").trim();
                    //beanTkt.lngTotTotal = total;

                    beanTkt.strTitulo = "Abono Date : " + beanTkt.strFormatDate + " - Status : " + hmDescEstados.get(filter.IN_STVAL.trim());

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

    public List<A2290Filter> loadPX287SQP00839ByPend(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQACCB = 0, lngTotSVFOP = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00839STVAL_PROCESS_PEND_1(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_SDATE);
            cstmt.setString(4, filter.IN_STVAL.trim());
            cstmt.setString(5, filter.IN_BANK.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_COUNTRY.trim());
            cstmt.setString(8, filter.IN_COREP.trim());
            cstmt.setString(9, filter.IN_EXT.trim());

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
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_COREP = filter.IN_COREP.trim();
                    beanTkt.COREP = filter.IN_COREP.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();

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
                    if (rst.getString("SCOUNTRY").trim().isEmpty()) {
                        beanTkt.SCOUNTRY = "**";
//                        beanTkt.strCREJEC = "(Empty)";
                        beanTkt.strDescripcionSCOUNTRY = "(Empty)";
                    } else {
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                        beanTkt.strCREJEC = rst.getString("BANKN").trim();
                        beanTkt.strDescripcionSCOUNTRY = rst.getString("SCOUNTRYN").trim();
                    }

//                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                    beanTkt.COREP = rst.getString("COREP").trim();
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00840_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_SDATEE);
            cstmt.setString(5, filter.IN_CBANK);
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_TTRAN.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.IN_COREP.trim());
            cstmt.setString(10, filter.IN_EXT.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

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
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_SDATE);
                    beanTkt.strCREJEC = filter.strCREJEC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_COREP = filter.IN_COREP.trim();
                    beanTkt.strDescripcion = filter.strDescripcion.trim();
                    beanTkt.strDescripcionSCOUNTRY = filter.strDescripcionSCOUNTRY.trim();
                    beanTkt.strDescripcionCOREP = filter.strDescripcionCOREP.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_SDATE);
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
                        beanTkt.strTitulo = "Value Date : " + beanTkt.strFormatDate + " - Country : " + beanTkt.strDescripcionSCOUNTRY + " - Bank : " + beanTkt.strDescripcion;
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00840Stval_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_SDATEE);
            cstmt.setString(5, filter.IN_CBANK);
            cstmt.setString(6, filter.IN_SCURRENCY);
            cstmt.setString(7, filter.IN_STVAL.trim());
            cstmt.setString(8, filter.IN_TTRAN.trim());
            cstmt.setString(9, filter.IN_COUNTRY.trim());
            cstmt.setString(10, filter.IN_COREP.trim());
            cstmt.setString(11, filter.IN_EXT.trim());

            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

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
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_COREP = filter.IN_COREP.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();
                    beanTkt.strDescripcion = filter.strDescripcion.trim();
                    beanTkt.strDescripcionSCOUNTRY = filter.strDescripcionSCOUNTRY.trim();
                    beanTkt.strDescripcionCOREP = filter.strDescripcionCOREP.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_SDATE);

                    beanTkt.SDATE = rst.getString("VALDATE");
                    beanTkt.lngQACCB = rst.getLong("QTY");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.SVFOP = rst.getLong("DAMOUNTR");

                    beanTkt.lngTotQACCB = lngTotQACCB;
                    beanTkt.lngTotSVFOP = lngTotSVFOP;

                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + beanTkt.strFormatDate + " - Process: " + beanTkt.strDescripcionCOREP + " - Country : " + beanTkt.strDescripcionSCOUNTRY + " - Bank : " + beanTkt.strDescripcion;
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

    public List<A2290Filter> loadPX287SQP00840DayProcLIQByS(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQACCB = 0, lngTotSVFOP = 0;
        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00840STVAL_DAY_PROCE_LIQ(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_CBANK);
            cstmt.setString(5, filter.IN_SCURRENCY);
            cstmt.setString(6, filter.IN_STVAL.trim());
            cstmt.setString(7, filter.IN_COUNTRY.trim());
            cstmt.setString(8, filter.IN_COREP.trim());

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

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
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_COREP = filter.IN_COREP.trim();
                    beanTkt.strDescripcion = filter.strDescripcion.trim();
                    beanTkt.strDescripcionSCOUNTRY = filter.strDescripcionSCOUNTRY.trim();
                    beanTkt.strDescripcionCOREP = filter.strDescripcionCOREP.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_DATE);

                    beanTkt.SDATE = rst.getString("ADATE");
                    beanTkt.lngQACCB = rst.getLong("QTY");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.SVFOP = rst.getLong("DAMOUNTR");

                    beanTkt.lngTotQACCB = lngTotQACCB;
                    beanTkt.lngTotSVFOP = lngTotSVFOP;

                    beanTkt.strTitulo = "Abono Date : " + beanTkt.strFormatDate + " - Bank : " + beanTkt.IN_COREP + " - Bank : " + beanTkt.IN_CBANK + " - Bank : " + beanTkt.IN_SCOUNTRY + " - Status : " + hmDescEstados.get(filter.IN_STVAL.trim());

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
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00841_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_CBANK);
            cstmt.setString(6, filter.IN_SCURRENCY);
            cstmt.setString(7, filter.IN_STVAL);
            cstmt.setString(8, filter.IN_TTRAN.trim());
            cstmt.setString(9, filter.IN_COUNTRY.trim());
            cstmt.setString(10, filter.IN_COREP.trim());
            cstmt.setString(11, filter.IN_EXT.trim());

            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

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
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();
                    beanTkt.strFormatDate = rst.getString("VALDATE").trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.descTDOC = hmDescDocType.containsKey(rst.getString("TDOC").trim().toUpperCase()) ? hmDescDocType.get(rst.getString("TDOC").trim()).toString() : rst.getString("TDOC").trim();
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
                    beanTkt.MERCHAND = rst.getString("MERCHAND").trim();
                    beanTkt.DATECI = rst.getString("DATECI").trim();
                    beanTkt.TRANCI = rst.getString("TRANCI").trim();
                    beanTkt.FSTVAL = rst.getString("STVAL").trim();
                    beanTkt.PENDINGDAYS = rst.getString("PENDINGDAYS").trim();
//                    beanTkt.RED = rst.getString("RED").trim();

                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + beanTkt.strFormatDate + " - Process: " + filter.strDescripcionCOREP + " - Country : " + filter.strDescripcionSCOUNTRY + " - Bank : " + filter.strDescripcion;
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
    
    public List<A2290Filter> loadPX002CASH(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETOEECC = 0, totNETOSETLEMENT = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("3", "Pending");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.MPS305_EECCFASE1 (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_ADATE);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_CBANK);
            cstmt.setString(6, filter.IN_SCURRENCY);
            cstmt.setString(7, filter.IN_STVAL);
            cstmt.setString(8, filter.IN_TTRAN.trim());
            cstmt.setString(9, filter.IN_COUNTRY.trim());
            cstmt.setString(10, filter.IN_COREP.trim());
            cstmt.setString(11, filter.IN_EXT.trim());

            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totNETOEECC = rst.getDouble("NETO");
                totNETOSETLEMENT = rst.getDouble("NETOC");
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
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();
                    beanTkt.strFormatDate = rst.getString("VALDATE").trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.ADATE = rst.getString("ADATE").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();  
                    beanTkt.MERCHAND = rst.getString("MERCHAND").trim();  
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();  
                    beanTkt.NETO = rst.getDouble("NETO");
                    beanTkt.NETOC = rst.getDouble("NETOC");
                    beanTkt.TINPUT = rst.getString("TINPUT");
                    beanTkt.QTYTRAN1 = rst.getLong("QTYTRAN1");
                    beanTkt.totNETOEECC = totNETOEECC;
                    beanTkt.totNETOSETLEMENT = totNETOSETLEMENT;
                    beanTkt.DATECI = rst.getString("DATECI").trim();
                    beanTkt.TRANCI = rst.getString("TRANCI").trim();

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
    
    public List<A2290Filter> loadPXSalesDirect(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETOEECC = 0, totNETOSETLEMENT = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("3", "Pending");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.MPS305_EECCFASE1_SALES_DIRECT (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_ADATE);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_CBANK);
            cstmt.setString(6, filter.IN_SCURRENCY);
            cstmt.setString(7, filter.IN_STVAL);
            cstmt.setString(8, filter.IN_TTRAN.trim());
            cstmt.setString(9, filter.IN_COUNTRY.trim());
            cstmt.setString(10, filter.IN_COREP.trim());
            cstmt.setString(11, filter.IN_EXT.trim());

            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totNETOEECC = rst.getDouble("NETO");
                totNETOSETLEMENT = rst.getDouble("NETOC");
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
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();
                    beanTkt.strFormatDate = rst.getString("VALDATE").trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.ADATE = rst.getString("ADATE").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();  
                    beanTkt.MERCHAND = rst.getString("MERCHAND").trim();  
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();  
                    beanTkt.NETO = rst.getDouble("NETO");
                    beanTkt.NETOC = rst.getDouble("NETOC");
                    beanTkt.QTYTRAN1 = rst.getLong("QTYTRAN1");
                    beanTkt.totNETOEECC = totNETOEECC;
                    beanTkt.totNETOSETLEMENT = totNETOSETLEMENT;
                    beanTkt.DATECI = rst.getString("DATECI").trim();
                    beanTkt.TRANCI = rst.getString("TRANCI").trim();

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

    public List<A2290Filter> loadPX287SQP00841DetailProceByS(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0, totNETOC = 0, totSVFOP = 0;
        long totQTYTRAS = 0, totQTYTRAN1 = 0, totQTYTRAN3 = 0, lngTotQTYTKT = 0;
        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00841DetailProceByS(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_SDATE);
            cstmt.setString(4, filter.IN_CBANK);
            cstmt.setString(5, filter.IN_SCURRENCY);
            cstmt.setString(6, filter.IN_STVAL);
            cstmt.setString(7, filter.IN_COUNTRY.trim());
            cstmt.setString(8, filter.IN_COREP.trim());

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totSVFOP = rst.getDouble("NETO");
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
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.strFormatDate = rst.getString("ADATE").trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.COREP = rst.getString("COREP").trim();
                    beanTkt.strDescripcionCOREP = rst.getString("COREPN").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("NETO");
                    beanTkt.COMISION = rst.getDouble("COMISION");
                    beanTkt.COMISTOTA = rst.getDouble("COMISTOTA");
                    beanTkt.totSVFOP = totSVFOP;
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.TRANC = rst.getString("TRANC").trim();
                    beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.PAYDATE = rst.getString("ADATE").trim();
                    beanTkt.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                    beanTkt.TERMI = rst.getString("TERMI").trim();
                    beanTkt.STCON = rst.getString("STCON").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.strCERROR = rst.getString("ERROR").trim();
                    beanTkt.FSTVAL = rst.getString("STVAL").trim();
                    beanTkt.PENDINGDAYS = rst.getString("PENDINGDAYS").trim();

                    if (hmDescSTCONL.containsKey(rst.getString("STCON").trim())) {
                        beanTkt.STCON = hmDescSTCONL.get(rst.getString("STCON").trim()).toString();
                    } else {
                        beanTkt.STCON = rst.getString("FREGLA").trim();
                    }
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.NEGOC = rst.getString("NEGOC").trim();
                    if (beanTkt.NEGOC.equals("1")) {
                        beanTkt.NEGOC = "PASAJES";
                    } else if (beanTkt.NEGOC.equals("2")) {
                        beanTkt.NEGOC = "CARGO";
                    } else if (beanTkt.NEGOC.equals("3")) {
                        beanTkt.NEGOC = "CORREO";
                    } else if (beanTkt.NEGOC.equals("S")) {
                        beanTkt.NEGOC = "STANDBY";
                    }
                    beanTkt.strTitulo = "Abono Date: " + filter.IN_SDATE + " - Bank: " + filter.strDescripcion + " - Scountry: " + filter.strDescripcionSCOUNTRY + " - Process: " + filter.strDescripcionCOREP + " - Scurrency: " + filter.IN_SCURRENCY + " - Status: " + hmDescEstados.get(filter.IN_STVAL.trim());

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

    public List<A2290Filter> loadPX287SQP00841DetLiqDetail(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0, totNETOC = 0, totSVFOP = 0;
        long totQTYTRAS = 0, totQTYTRAN1 = 0, totQTYTRAN3 = 0, lngTotQTYTKT = 0;
        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00841DetLiqDetail_1(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_STVAL.trim());
            cstmt.setString(4, filter.IN_BANK.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_COREP.trim());
            cstmt.setString(8, filter.IN_EXT.trim());

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totSVFOP = rst.getDouble("NETO");
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
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_DATE.trim());

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.COREP = rst.getString("COREP").trim();
                    beanTkt.strDescripcionCOREP = rst.getString("COREPN").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("NETO");
                    beanTkt.COMISION = rst.getDouble("COMISION");
                    beanTkt.COMISTOTA = rst.getDouble("COMISTOTA");
                    beanTkt.totSVFOP = totSVFOP;
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.TRANC = rst.getString("TRANC").trim();
                    beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.PAYDATE = rst.getString("ADATE").trim();
                    beanTkt.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                    beanTkt.TERMI = rst.getString("TERMI").trim();
                    beanTkt.STCON = rst.getString("STCON").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.strCERROR = rst.getString("ERROR").trim();
                    beanTkt.FSTVAL = rst.getString("STVAL").trim();
                    beanTkt.PENDINGDAYS = rst.getString("PENDINGDAYS").trim();
                    if (hmDescSTCONL.containsKey(rst.getString("STCON").trim())) {
                        beanTkt.STCON = hmDescSTCONL.get(rst.getString("STCON").trim()).toString();
                    } else {
                        beanTkt.STCON = rst.getString("FREGLA").trim();
                    }
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.NEGOC = rst.getString("NEGOC").trim();
                    if (beanTkt.NEGOC.equals("1")) {
                        beanTkt.NEGOC = "PASAJES";
                    } else if (beanTkt.NEGOC.equals("2")) {
                        beanTkt.NEGOC = "CARGO";
                    } else if (beanTkt.NEGOC.equals("3")) {
                        beanTkt.NEGOC = "CORREO";
                    } else if (beanTkt.NEGOC.equals("S")) {
                        beanTkt.NEGOC = "STANDBY";
                    }
                    beanTkt.strTitulo = "Abono Date : " + beanTkt.strFormatDate + " - Status : " + hmDescEstados.get(filter.IN_STVAL.trim());
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
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05111Cross(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_SDATE);
            cstmt.setString(4, filter.IN_CBANK);
            cstmt.setString(5, filter.IN_STVAL);
            cstmt.setString(6, filter.IN_COUNTRY);
            cstmt.setString(7, filter.IN_COREP);

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
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.strFormatDate = rst.getString("VALDATE").trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.descTDOC = hmDescDocType.containsKey(rst.getString("TDOC").trim().toUpperCase()) ? hmDescDocType.get(rst.getString("TDOC").trim()).toString() : rst.getString("TDOC").trim();
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
                    beanTkt.MERCHAND = rst.getString("MERCHAND").trim();
                    beanTkt.TRANCI = rst.getString("TRANCI").trim();
                    beanTkt.DATECI = rst.getString("DATECI").trim();
                    beanTkt.FSTVAL = rst.getString("STVAL").trim();
                    beanTkt.PENDINGDAYS = rst.getString("PENDINGDAYS").trim();
//                    beanTkt.RED = rst.getString("RED").trim();

                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + beanTkt.strFormatDate + " - Country : " + filter.strDescripcionSCOUNTRY + " - Bank : " + filter.strDescripcion;
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
        double totNETO = 0, totNETOC = 0;
        long totQTYTRAS = 0, totQTYTRAN1 = 0, totQTYTRAN3 = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00842_V1(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strYearFrom + filter.strMonthFrom + filter.strDayFrom);
            cstmt.setString(3, filter.strYearTo + filter.strMonthTo + filter.strDayTo);
            cstmt.setString(4, filter.IN_BANDOC);
            cstmt.setString(5, filter.IN_CODEBANK);
            cstmt.setString(6, filter.IN_TDOC);
            cstmt.setString(7, filter.IN_STVAL);
            cstmt.setString(8, filter.IN_SCOUNTRY);
            cstmt.setString(9, filter.IN_COREP);
            cstmt.setString(10, filter.IN_EXT.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

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

//                  CCUST|BANDOC|MERCHAND|STVAL|TDOC|SCOUNTRY|VALDATE|ADATE|SCURRENCY|NETO|NETOC|ACCOUNT|BENCENC|ACCCOMP|SOCIETY|CIACOME|REFER|CLAVE1|CLAVE3|TEXTO|TEXTOLAR|
                    beanTkt = new A2290Filter();
                    beanTkt.CCUST = session.getUserView().getCustomerInfo().CCUST;
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();

                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();

                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.MERCHAND = rst.getString("MERCHAND").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.descTDOC = hmDescDocType.containsKey(rst.getString("TDOC").trim().toUpperCase()) ? hmDescDocType.get(rst.getString("TDOC").trim()).toString() : rst.getString("TDOC").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.VALDATE = rst.getString("VALDATE").trim();
                    beanTkt.ADATE = rst.getString("ADATE").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.NETO = rst.getDouble("NETO");
                    beanTkt.NETOC = rst.getDouble("NETOC");
                    beanTkt.totNETO = totNETO;
                    beanTkt.totNETOC = totNETOC;
                    beanTkt.ACCOUNT = rst.getString("ACCOUNT").trim();
                    beanTkt.BENCENC = rst.getString("BENCENC").trim();
                    beanTkt.ACCCOMP = rst.getString("ACCCOMP").trim();
                    beanTkt.SOCIETY = rst.getString("SOCIETY").trim();
                    beanTkt.CIACOME = rst.getString("CIACOME").trim();
                    beanTkt.REFER = rst.getString("REFER").trim();
                    beanTkt.CLAVE1 = rst.getString("CLAVE1").trim();
                    beanTkt.CLAVE3 = rst.getString("CLAVE3").trim();
                    beanTkt.TEXTO = rst.getString("TEXTO").trim();
                    beanTkt.TEXTOLAR = rst.getString("TEXTOLAR").trim();

                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.QTYTRAS = rst.getInt("QTYTRAS");
                    beanTkt.QTYTRAN1 = rst.getInt("QTYTRAN1");
                    beanTkt.totQTYTRAN1 = totQTYTRAN1;
                    beanTkt.QTYTRAN3 = rst.getInt("QTYTRAN3");
                    beanTkt.totQTYTRAN3 = totQTYTRAN3;
                    beanTkt.totQTYTRAS = totQTYTRAS;
                    beanTkt.RED = rst.getString("RED").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.TRANCI = rst.getString("TRANCI").trim();
                    beanTkt.DATECI = rst.getString("DATECI").trim();
                    beanTkt.PENDINGDAYS = rst.getString("PENDINGDAYS").trim();
                    beanTkt.FSTVAL = rst.getString("STVAL").trim();
                    beanTkt.strTitulo = "";

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

    public List<A2290Filter> loadPX287SQP00842MPF060(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0, totNETOC = 0, totSVFOP = 0;
        long totQTYTRAS = 0, totQTYTRAN1 = 0, totQTYTRAN3 = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00841MPF060DETAIL_NEGOC(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strYearFrom + filter.strMonthFrom + filter.strDayFrom);
            cstmt.setString(3, filter.strYearTo + filter.strMonthTo + filter.strDayTo);
            cstmt.setString(4, filter.IN_BANDOC);
            cstmt.setString(5, filter.IN_CODEBANK);
            cstmt.setString(6, filter.IN_TDOC);
            cstmt.setString(7, filter.IN_STVAL);
            cstmt.setString(8, filter.IN_SCOUNTRY);
            cstmt.setString(9, filter.IN_COREP);
            cstmt.setString(10, filter.IN_EXT.trim());
            cstmt.setString(11, filter.IN_NEGOC);

            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totSVFOP = rst.getDouble("NETO");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.CCUST = session.getUserView().getCustomerInfo().CCUST;
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.strFormatDate = rst.getString("ADATE").trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.COREP = rst.getString("COREP").trim();
                    beanTkt.strDescripcionCOREP = rst.getString("COREPN").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("NETO");
                    beanTkt.COMISION = rst.getDouble("COMISION");
                    beanTkt.COMISTOTA = rst.getDouble("COMISTOTA");
                    beanTkt.totSVFOP = totSVFOP;
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.TRANC = rst.getString("TRANC").trim();
                    beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.PAYDATE = rst.getString("ADATE").trim();
                    beanTkt.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                    beanTkt.TERMI = rst.getString("TERMI").trim();
                    beanTkt.STCON = rst.getString("STCON").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.strCERROR = rst.getString("ERROR").trim();
                    beanTkt.FSTVAL = rst.getString("STVAL").trim();
                    beanTkt.PENDINGDAYS = rst.getString("PENDINGDAYS").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.SEQ = rst.getString("SEQ").trim();

                    if (hmDescSTCONL.containsKey(rst.getString("STCON").trim())) {
                        beanTkt.STCON = hmDescSTCONL.get(rst.getString("STCON").trim()).toString();
                    } else {
                        beanTkt.STCON = rst.getString("FREGLA").trim();
                    }
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.NEGOC = rst.getString("NEGOC").trim();
                    if (beanTkt.NEGOC.equals("1")) {
                        beanTkt.NEGOC = "PASAJES";
                    } else if (beanTkt.NEGOC.equals("2")) {
                        beanTkt.NEGOC = "CARGO";
                    } else if (beanTkt.NEGOC.equals("3")) {
                        beanTkt.NEGOC = "CORREO";
                    } else if (beanTkt.NEGOC.equals("S")) {
                        beanTkt.NEGOC = "STANDBY";
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

    public A2290Filter loadPX287SQP00844(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank w/o Sett.");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        String VALDATEL = "", MERCHANDL = "", BANDOCL = "", SCURRENCYL = "", ACCNUMBER = "", COREPL = "";
        Double NETOL = 0.0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00844(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_VALDATE.trim());
            cstmt.setString(3, filter.IN_CODEBANK.trim());
            cstmt.setString(4, filter.IN_MERCHAND.trim());
            cstmt.setString(5, filter.IN_BANDOC.trim());
            cstmt.setString(6, filter.IN_STVAL.trim());
            cstmt.setString(7, filter.IN_RED.trim());
            cstmt.setDouble(8, filter.IN_NETO);
            cstmt.setString(9, filter.IN_DATECI.trim());
            cstmt.setString(10, filter.IN_TRANCI.trim());
            
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
//                VALDATEL = rst.getString("VALDATE").trim();
//                MERCHANDL = rst.getString("MERCHAND").trim();
//                BANDOCL = rst.getString("BANDOC").trim();
//                SCURRENCYL = rst.getString("SCURRENCY").trim();
//                ACCNUMBER = rst.getString("ACCNUMBER").trim();
//                COREPL = rst.getString("COREP").trim();
//                NETOL = rst.getDouble("NETO");
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
                    beanTkt.CCUST = rst.getString("CCUST");
                    beanTkt.STVAL = rst.getString("STVAL").trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (beanTkt.TDOC.equals("S")) {
                        beanTkt.descTDOC = "Sales";
                    } else {
                        beanTkt.descTDOC = "Debits";
                    }

                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.CODEBANKA = rst.getString("CODEBANKA").trim();
                    beanTkt.COREP = rst.getString("COREP").trim();
                    beanTkt.NAME = rst.getString("CODEBANK").trim() + " - " + rst.getString("NAME").trim();
                    beanTkt.NAMEP = rst.getString("COREP").trim() + " - " + rst.getString("NAMEP").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.DESC_SCOUNTRY = rst.getString("SCOUNTRY").trim() + " - " + rst.getString("SCOUNTRYN").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.DATECI = rst.getString("DATECI").trim();
                    beanTkt.TRANCI = rst.getString("TRANCI").trim();
                    beanTkt.QTYTRAN1 = rst.getInt("QTYTRAN1");
                    beanTkt.FUNDSTRGK = rst.getString("FUNDSTRGK");
                    beanTkt.VALDATE = rst.getString("VALDATE").trim();
                    beanTkt.MERCHAND = rst.getString("MERCHAND").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.NETO = rst.getDouble("NETO");
                    beanTkt.NETOC = rst.getDouble("NETOC");
                    
                    beanTkt.CERROR= rst.getString("CERROR");
                    beanTkt.CERROR_DESC = rst.getString("CERROR_DESC");
                    

                    beanTkt.ACCOUNT = rst.getString("ACCOUNT").trim();
                    beanTkt.CLAVE1 = rst.getString("CLAVE1").trim();
                    beanTkt.CLAVE3 = rst.getString("CLAVE3").trim();
                    beanTkt.ACCNUMBER = rst.getString("ACCCOMP").trim();
                    beanTkt.ACCNUMBERL = ACCNUMBER;
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
    
    
    public A2290Filter loadPXSQP005CASH(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("5", "Match Manual");

        String VALDATEL = "", MERCHANDL = "", BANDOCL = "", SCURRENCYL = "", ACCNUMBER = "", COREPL = "";
        Double NETOL = 0.0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.SQP005CASH(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_VALDATE.trim());
            cstmt.setString(3, filter.IN_CODEBANK.trim());
            cstmt.setString(4, filter.IN_MERCHAND.trim());
            cstmt.setString(5, filter.IN_BANDOC.trim());
            cstmt.setString(6, filter.IN_STVAL.trim());
            cstmt.setString(7, filter.IN_RED.trim());
            cstmt.setDouble(8, filter.IN_NETO);
            cstmt.setString(9, filter.IN_DATECI.trim());
            cstmt.setString(10, filter.IN_TRANCI.trim());
            
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
//                VALDATEL = rst.getString("VALDATE").trim();
//                MERCHANDL = rst.getString("MERCHAND").trim();
//                BANDOCL = rst.getString("BANDOC").trim();
//                SCURRENCYL = rst.getString("SCURRENCY").trim();
//                ACCNUMBER = rst.getString("ACCNUMBER").trim();
//                COREPL = rst.getString("COREP").trim();
//                NETOL = rst.getDouble("NETO");
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
                    beanTkt.CCUST = rst.getString("CCUST");
                    beanTkt.STVAL = rst.getString("STVAL").trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (beanTkt.TDOC.equals("S")) {
                        beanTkt.descTDOC = "Sales";
                    } else {
                        beanTkt.descTDOC = "Debits";
                    }

                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.COREP = rst.getString("COREP").trim();
                    beanTkt.NAME = rst.getString("CODEBANK").trim() + " - " + rst.getString("NAME").trim();
                    beanTkt.NAMEP = rst.getString("COREP").trim() + " - " + rst.getString("NAMEP").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.DESC_SCOUNTRY = rst.getString("SCOUNTRY").trim() + " - " + rst.getString("SCOUNTRYN").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.DATECI = rst.getString("DATECI").trim();
                    beanTkt.TRANCI = rst.getString("TRANCI").trim();
                    beanTkt.QTYTRAN1 = rst.getInt("QTYTRAN1");
                    beanTkt.FUNDSTRGK = rst.getString("FUNDSTRGK");
                    beanTkt.VALDATE = rst.getString("VALDATE").trim();
                    beanTkt.MERCHAND = rst.getString("MERCHAND").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.NETO = rst.getDouble("NETO");
                    beanTkt.NETOC = rst.getDouble("NETOC");
                    beanTkt.ACCOUNT = rst.getString("ACCOUNT");
                    
                    beanTkt.CERROR= rst.getString("CERROR");
                    beanTkt.CERROR_DESC = rst.getString("CERROR_DESC");
                    

                    beanTkt.ACCOUNT = rst.getString("ACCOUNT").trim();
                    beanTkt.CLAVE1 = rst.getString("CLAVE1").trim();
                    beanTkt.CLAVE3 = rst.getString("CLAVE3").trim();
                    beanTkt.ACCNUMBER = rst.getString("ACCCOMP").trim();
                    beanTkt.ACCNUMBERL = ACCNUMBER;
                    beanTkt.SDATE = rst.getString("SDATE").trim();

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
    public A2290Filter loadPXSQP005CASHSALESDIRECT(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("5", "Match Manual");

        String VALDATEL = "", MERCHANDL = "", BANDOCL = "", SCURRENCYL = "", ACCNUMBER = "", COREPL = "";
        Double NETOL = 0.0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.MPS305_SALESDIRECT_TICKET(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_VALDATE.trim());
            cstmt.setString(3, filter.IN_CODEBANK.trim());
            cstmt.setString(4, filter.IN_MERCHAND.trim());
            cstmt.setString(5, filter.IN_BANDOC.trim());
            cstmt.setString(6, filter.IN_STVAL.trim());
            cstmt.setString(7, filter.IN_RED.trim());
            cstmt.setDouble(8, filter.IN_NETO);
            cstmt.setString(9, filter.IN_DATECI.trim());
            cstmt.setString(10, filter.IN_TRANCI.trim());
            
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
//                VALDATEL = rst.getString("VALDATE").trim();
//                MERCHANDL = rst.getString("MERCHAND").trim();
//                BANDOCL = rst.getString("BANDOC").trim();
//                SCURRENCYL = rst.getString("SCURRENCY").trim();
//                ACCNUMBER = rst.getString("ACCNUMBER").trim();
//                COREPL = rst.getString("COREP").trim();
//                NETOL = rst.getDouble("NETO");
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
                    beanTkt.CCUST = rst.getString("CCUST");
                    beanTkt.STVAL = rst.getString("STVAL").trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (beanTkt.TDOC.equals("S")) {
                        beanTkt.descTDOC = "Sales";
                    } else {
                        beanTkt.descTDOC = "Debits";
                    }

                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.COREP = rst.getString("COREP").trim();
                    beanTkt.NAME = rst.getString("CODEBANK").trim() + " - " + rst.getString("NAME").trim();
                    beanTkt.NAMEP = rst.getString("COREP").trim() + " - " + rst.getString("NAMEP").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.DESC_SCOUNTRY = rst.getString("SCOUNTRY").trim() + " - " + rst.getString("SCOUNTRYN").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.DATECI = rst.getString("DATECI").trim();
                    beanTkt.TRANCI = rst.getString("TRANCI").trim();
                    beanTkt.QTYTRAN1 = rst.getInt("QTYTRAN1");
                    beanTkt.FUNDSTRGK = rst.getString("FUNDSTRGK");
                    beanTkt.VALDATE = rst.getString("VALDATE").trim();
                    beanTkt.MERCHAND = rst.getString("MERCHAND").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.NETO = rst.getDouble("NETO");
                    beanTkt.NETOC = rst.getDouble("NETOC");
                    beanTkt.ACCOUNT = rst.getString("ACCOUNT");
                    
                    beanTkt.CERROR= rst.getString("CERROR");
                    beanTkt.CERROR_DESC = rst.getString("CERROR_DESC");
                    

                    beanTkt.ACCOUNT = rst.getString("ACCOUNT").trim();
                    beanTkt.CLAVE1 = rst.getString("CLAVE1").trim();
                    beanTkt.CLAVE3 = rst.getString("CLAVE3").trim();
                    beanTkt.ACCNUMBER = rst.getString("ACCCOMP").trim();
                    beanTkt.ACCNUMBERL = ACCNUMBER;
                    beanTkt.SDATE = rst.getString("SDATE").trim();

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

    public A2290Filter loadPX287SQP00844MPF060_DE(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank w/o Sett.");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");

        String VALDATEL = "", MERCHANDL = "", BANDOCL = "", SCURRENCYL = "", ACCNUMBER = "", COREPL = "";
        Double NETOL = 0.0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00844_MPF060_DE(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE.trim());
            cstmt.setString(3, filter.IN_SCOUNTRY.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CODEBANK.trim());
            cstmt.setString(6, filter.IN_SCARCOD.trim());
            cstmt.setString(7, filter.IN_SCARDN.trim());
            cstmt.setString(8, filter.IN_SAUTHOC);
            cstmt.setString(9, filter.IN_SEQ.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                beanTkt.IN_DATE = filter.IN_DATE.trim();
                beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                beanTkt.IN_CBANK = filter.IN_CBANK.trim();
                beanTkt.strFormatDate = filter.strFormatDate.trim();
                beanTkt.CCUST = rst.getString("CCUST");
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                }
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                beanTkt.COREP = rst.getString("COREP").trim();
                beanTkt.strDescripcionCOREP = rst.getString("COREPN").trim();
                beanTkt.MERCHN = rst.getString("MERCHN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SVFOP = rst.getDouble("NETO");
                beanTkt.COMISION = rst.getDouble("COMISION");
                beanTkt.COMISTOTA = rst.getDouble("COMISTOTA");
                beanTkt.DATEC = rst.getString("DATEC").trim();
                beanTkt.TRANC = rst.getString("TRANC").trim();
                beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.BANDOC = rst.getString("BANDOC").trim();
                beanTkt.PAYDATE = rst.getString("ADATE").trim();
                beanTkt.VALDATE = rst.getString("VALDATE").trim();
                beanTkt.SOCIETY = rst.getString("SOCIETY").trim();
                beanTkt.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                beanTkt.TERMI = rst.getString("TERMI").trim();
                beanTkt.STCON = rst.getString("STCON").trim();
                beanTkt.CERROR = rst.getString("CERROR").trim();
                beanTkt.strCERROR = rst.getString("ERROR").trim();
                beanTkt.FSTVAL = rst.getString("STVAL").trim();
                beanTkt.PENDINGDAYS = rst.getString("PENDINGDAYS").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.DESC_SCOUNTRY = rst.getString("SCOUNTRYN").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                beanTkt.DATECI = rst.getString("DATECI").trim();
                beanTkt.TRANCI = rst.getString("TRANCI").trim();

                if (hmDescSTCONL.containsKey(rst.getString("STCON").trim())) {
                    beanTkt.STCON = hmDescSTCONL.get(rst.getString("STCON").trim()).toString();
                } else {
                    beanTkt.STCON = rst.getString("FREGLA").trim();
                }
                beanTkt.FCONT = rst.getString("FCONT").trim();
                beanTkt.NEGOC = rst.getString("NEGOC").trim();
//                if (beanTkt.NEGOC.equals("1")) {
//                    beanTkt.NEGOC = "PASAJES";
//                } else if (beanTkt.NEGOC.equals("2")) {
//                    beanTkt.NEGOC = "CARGO";
//                } else if (beanTkt.NEGOC.equals("3")) {
//                    beanTkt.NEGOC = "CORREO";
//                } else if (beanTkt.NEGOC.equals("S")) {
//                    beanTkt.NEGOC = "STANDBY";
//                }

                beanTkt.USCR = rst.getString("USCR").trim();
                beanTkt.FECR = rst.getString("FECR").trim();
                beanTkt.HOCR = rst.getString("HOCR").trim();
                beanTkt.USUP = rst.getString("USUP").trim();
                beanTkt.FEUP = rst.getString("FEUP").trim();
                beanTkt.HOUP = rst.getString("HOUP").trim();
            }
            rst.close();

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

    public List<A2290Filter> loadPX269SQP05114Header(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0;
        long totQTYTRAS = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("", "Bank w/o Sett.");
        hmDescEstados.put("3", "Bank w/o Sett.");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescFselect = new HashMap<String, String>();
        hmDescFselect.put("L", "Match");
        hmDescFselect.put("", "Bank w/o Sett.");
        hmDescFselect.put("3", "Bank w/o Sett.");
        hmDescFselect.put("4", "Match with Differences");
        hmDescFselect.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05114Header(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FROMADATEHE.trim());
            cstmt.setString(3, filter.IN_TOADATEHE.trim());
            cstmt.setString(4, filter.IN_LIQUIDACIOHE.trim());
            cstmt.setString(5, filter.IN_MERCHANDHE.trim());
            cstmt.setString(6, filter.IN_NETOHE);
            cstmt.setString(7, filter.IN_STVAL.trim());
            cstmt.setString(8, filter.IN_BANDOC.trim());
            cstmt.setString(9, filter.IN_DATECI.trim());
            cstmt.setString(10, filter.IN_TRANCI.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();
                beanTkt.CCUST = rst.getString("CCUST");

                if (hmDescFselect.containsKey(rst.getString("FSELEC").trim())) {
                    beanTkt.descSTVAL = hmDescFselect.get(rst.getString("FSELEC").trim()).toString();
                } else {
                    beanTkt.descSTVAL = rst.getString("FSELEC").trim();
                }

                beanTkt.PRDA = rst.getString("PRDA");
                beanTkt.CODPRO = rst.getString("CODPRO");
                beanTkt.CCUSTPRO = rst.getString("CCUSTPRO");
                beanTkt.FLIQUIDACI = rst.getString("FLIQUIDACI");
                beanTkt.LIQUIDACIO = rst.getString("LIQUIDACIO");
                beanTkt.MERCHAND = rst.getString("MERCHAND");
                beanTkt.MONEDA = rst.getString("MONEDA");
                beanTkt.MONEDALIQ = rst.getString("MONEDALIQ");
                beanTkt.MONEDAPAGO = rst.getString("MONEDAPAGO");
                beanTkt.PAISLIQ = rst.getString("PAISLIQ");

                beanTkt.BANDOC = rst.getString("BANDOC");
                beanTkt.DATECI = rst.getString("DATECI");
                beanTkt.TRANCI = rst.getString("TRANCI");

                beanTkt.TOTAL = rst.getDouble("TOTAL");
                beanTkt.COMISION = rst.getDouble("COMISION");
                beanTkt.NETO = rst.getDouble("NETO");
                beanTkt.IMPORTEPAG = rst.getDouble("IMPORTEPAG");

                beanTkt.FEESTAXS = rst.getDouble("FEESTAXS");
                beanTkt.CHARGEBK = rst.getDouble("CHARGEBK");

                lstTkts.add(beanTkt);
            }
            rst.close();

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

    public List<A2290Filter> loadPX269SQP05114PreDetail(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0;
        long totQTYTRAS = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("", "Bank w/o Sett.");
        hmDescEstados.put("3", "Bank w/o Sett.");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05114PreDetail(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FROMADATE.trim());
            cstmt.setString(3, filter.IN_TOADATE.trim());
            cstmt.setString(4, filter.IN_FROMSDATE.trim());
            cstmt.setString(5, filter.IN_TOSDATE.trim());
            cstmt.setString(6, filter.IN_CODEBANK.trim());
            cstmt.setString(7, filter.IN_MERCHAND.trim());
            cstmt.setString(8, filter.IN_BANDOC.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.IN_RED.trim());
            cstmt.setString(11, filter.IN_SCARCOD.trim());
            cstmt.setString(12, filter.IN_ACCNUMBER.trim());
            cstmt.setString(13, filter.IN_SDATE.trim());
            cstmt.setString(14, filter.IN_strNETO.trim());
            cstmt.setString(15, filter.IN_TDOC.trim());
            cstmt.setString(16, filter.IN_SEQ.trim());
            cstmt.setString(17, filter.IN_DATECI.trim());
            cstmt.setString(18, filter.IN_TRANCI.trim());
            cstmt.setString(19, filter.IN_FUNDSTRGK.trim());
            cstmt.setString(20, filter.IN_LIQUIDACIO.trim());
            cstmt.execute();

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
                beanTkt.SCARCOD = rst.getString("SCARCOD");
                beanTkt.SCARDN = rst.getString("SCARDN");
                beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                beanTkt.ACCNUMBER = rst.getString("ACCNUMBER");
                beanTkt.MERCHAND = rst.getString("MERCHAND");
                beanTkt.FUNDSTRGK = rst.getString("FUNDSTRGK");
                beanTkt.BAID = rst.getString("BAID");
                if (!beanTkt.BAID.trim().equals("") && beanTkt.FUNDSTRGK.trim().equals("")) {
                    beanTkt.FUNDSTRGK = beanTkt.BAID;
                }
                beanTkt.ADATE = rst.getString("ADATE");
                beanTkt.BANDOC = rst.getString("BANDOC");
                beanTkt.TOTAL = rst.getDouble("TOTAL");
                beanTkt.NETO = rst.getDouble("NETO");
                beanTkt.COMISION = rst.getDouble("COMISION");
                beanTkt.COMISTOTA = rst.getDouble("COMISTOTA");
                beanTkt.TDOC = rst.getString("TDOC");
                beanTkt.SEQ = rst.getString("SEQ");
                beanTkt.MONEDAPAGO = rst.getString("MONEDAPAGO");
                beanTkt.IMPORTEPAG = rst.getDouble("IMPORTEPAG");
                beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC"));

                lstTkts.add(beanTkt);
            }
            rst.close();

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

    public List<A2290Filter> loadPX269SQP05114PreDetailFees(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0;
        long totQTYTRAS = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("", "Bank w/o Sett.");
        hmDescEstados.put("3", "Bank w/o Sett.");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05114PreDetailFees(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FROMADATE.trim());
            cstmt.setString(3, filter.IN_TOADATE.trim());
            cstmt.setString(4, filter.IN_FROMSDATE.trim());
            cstmt.setString(5, filter.IN_TOSDATE.trim());
            cstmt.setString(6, filter.IN_CODEBANK.trim());
            cstmt.setString(7, filter.IN_MERCHAND.trim());
            cstmt.setString(8, filter.IN_BANDOC.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.IN_RED.trim());
            cstmt.setString(11, filter.IN_SCARCOD.trim());
            cstmt.setString(12, filter.IN_ACCNUMBER.trim());
            cstmt.setString(13, filter.IN_SDATE.trim());
            cstmt.setString(14, filter.IN_strNETO.trim());
            cstmt.setString(15, filter.IN_TDOC.trim());
            cstmt.setString(16, filter.IN_SEQ.trim());
            cstmt.setString(17, filter.IN_DATECI.trim());
            cstmt.setString(18, filter.IN_TRANCI.trim());
            cstmt.setString(19, filter.IN_FUNDSTRGK.trim());
            cstmt.setString(20, filter.IN_LIQUIDACIO.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();
                beanTkt.CODIGO = rst.getString("CODIGO");
                beanTkt.MONEDA = rst.getString("MONEDA");
                beanTkt.IMPORTE = rst.getString("IMPORTE");
                beanTkt.MONEDAPAGO = rst.getString("MONEDAPAGO");
                beanTkt.IMPORTEPAG = rst.getDouble("IMPORTEPAG");
                beanTkt.DESCRIP = rst.getString("DESCRIP");
                lstTkts.add(beanTkt);
            }
            rst.close();

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

    public List<A2290Filter> loadPX269SQP05114Agrupa(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0;
        long totQTYTRAS = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("", "Bank w/o Sett.");
        hmDescEstados.put("3", "Bank w/o Sett.");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05114Agrupa(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FROMADATEAG.trim());
            cstmt.setString(3, filter.IN_TOADATEAG.trim());
            cstmt.setString(4, filter.IN_LIQUIDACIOAG.trim());
            cstmt.setString(5, filter.IN_MERCHANDAG.trim());
            cstmt.setString(6, filter.IN_NETOAG.trim());

            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();
                beanTkt.CCUST = rst.getString("CCUST");
                beanTkt.CID = rst.getString("CID");
                beanTkt.UUID = rst.getString("UUID");
                beanTkt.AFILIADO = rst.getString("AFILIADO");
                beanTkt.LIQUIDAC = rst.getString("LIQUIDAC");
                beanTkt.FECHA = rst.getString("FECHA");
                beanTkt.MONTO = rst.getDouble("MONTO");
                beanTkt.FSELECT = rst.getString("FSELECT");
                beanTkt.CODPRO = rst.getString("CODPRO");
                beanTkt.CCUSTPRO = rst.getString("CCUSTPRO");

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
            }
            rst.close();

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

    public List<A2290Filter> loadPX269SQP05114Detail(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0;
        long totQTYTRAS = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("", "Bank w/o Sett.");
        hmDescEstados.put("3", "Bank w/o Sett.");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05114DETAIL_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FROMADATE.trim());
            cstmt.setString(3, filter.IN_TOADATE.trim());
            cstmt.setString(4, filter.IN_FROMSDATE.trim());
            cstmt.setString(5, filter.IN_TOSDATE.trim());
            cstmt.setString(6, filter.IN_CODEBANK.trim());
            cstmt.setString(7, filter.IN_MERCHAND.trim());
            cstmt.setString(8, filter.IN_BANDOC.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.IN_RED.trim());
            cstmt.setString(11, filter.IN_SCARCOD.trim());
            cstmt.setString(12, filter.IN_ACCNUMBER.trim());
            cstmt.setString(13, filter.IN_SDATE.trim());
            cstmt.setString(14, filter.IN_strNETO.trim());
            cstmt.setString(15, filter.IN_TDOC.trim());
            cstmt.setString(16, filter.IN_SEQ.trim());
            cstmt.setString(17, filter.IN_TERMI.trim());
            cstmt.setString(18, filter.IN_SAGENT.trim());
            cstmt.setString(19, filter.IN_DATECI.trim());
            cstmt.setString(20, filter.IN_TRANCI.trim());
            cstmt.setString(21, filter.IN_FUNDSTRGK.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();
                beanTkt.CCUST = rst.getString("CCUST");
                beanTkt.CORES = rst.getString("COREP");
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
                beanTkt.SCARCOD = rst.getString("SCARCOD");
                beanTkt.SCARDN = rst.getString("SCARDN");
                beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                beanTkt.ACCNUMBER = rst.getString("ACCNUMBER");
                beanTkt.MERCHAND = rst.getString("MERCHAND");
                beanTkt.FUNDSTRGK = rst.getString("FUNDSTRGK");
                beanTkt.ADATE = rst.getString("ADATE");
                beanTkt.BANDOC = rst.getString("BANDOC");
                beanTkt.TOTAL = rst.getDouble("TOTAL");
                beanTkt.NETO = rst.getDouble("NETO");
                beanTkt.COMISION = rst.getDouble("COMISION");
                beanTkt.MONEDAPAGO = rst.getString("MONEDAPAGO");
                beanTkt.IMPORTEPAG = rst.getDouble("IMPORTEPAG");
                beanTkt.COMISTOTA = rst.getDouble("COMISTOTA");
                beanTkt.TDOC = rst.getString("TDOC");
                beanTkt.SEQ = rst.getString("SEQ");
                beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC"));

                lstTkts.add(beanTkt);
            }
            rst.close();

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
    
    public List<A2290Filter> loadPXDetailCASHLIQUID(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0;
        long totQTYTRAS = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("", "Bank w/o Sett.");
        hmDescEstados.put("3", "Pending");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.SQP006CASH(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FROMADATE.trim());
            cstmt.setString(3, filter.IN_TOADATE.trim());
            cstmt.setString(4, filter.IN_FROMSDATE.trim());
            cstmt.setString(5, filter.IN_TOSDATE.trim());
            cstmt.setString(6, filter.IN_CODEBANK.trim());
            cstmt.setString(7, filter.IN_MERCHAND.trim());
            cstmt.setString(8, filter.IN_BANDOC.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.IN_RED.trim());
            cstmt.setString(11, filter.IN_SCARCOD.trim());
            cstmt.setString(12, filter.IN_ACCNUMBER.trim());
            cstmt.setString(13, filter.IN_SDATE.trim());
            cstmt.setString(14, filter.IN_strNETO.trim());
            cstmt.setString(15, filter.IN_TDOC.trim());
            cstmt.setString(16, filter.IN_SEQ.trim());
            cstmt.setString(17, filter.IN_TERMI.trim());
            cstmt.setString(18, filter.IN_SAGENT.trim());
            cstmt.setString(19, filter.IN_DATECI.trim());
            cstmt.setString(20, filter.IN_TRANCI.trim());
            cstmt.setString(21, filter.IN_FUNDSTRGK.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();
                beanTkt.CCUST = rst.getString("CCUST");
                beanTkt.TINPUT = rst.getString("TINPUT");
                beanTkt.STVAL = rst.getString("STVAL");
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                    beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTkt.descSTVAL = rst.getString("STVAL").trim();
                }
                beanTkt.ADATE = rst.getString("ADATE");
                beanTkt.VALDATE = rst.getString("VALDATE");
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY");
                beanTkt.CFUENTE = rst.getString("CFUENTE");
                beanTkt.SAGENT = rst.getString("SAGENT");
                beanTkt.SCONSOL = rst.getString("SCONSOL");
                beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                beanTkt.NETO = rst.getDouble("NETO");
                beanTkt.PAYAMOU = rst.getDouble("PAYAMOU");
                beanTkt.SUM_NETO = rst.getDouble("SUM_NETO");
                beanTkt.SUM_PAYAMOU = rst.getDouble("SUM_PAYAMOU");
                
                
                
                beanTkt.SETADJ = rst.getDouble("SETADJ");
                beanTkt.BILADJ = rst.getDouble("BILADJ");
                beanTkt.DATECI = rst.getString("DATECI");
                beanTkt.TRANCI = rst.getString("TRANCI");
                beanTkt.DATEC = rst.getString("DATEC");
                beanTkt.TRANC = rst.getString("TRANC");
                beanTkt.CONCEPT = rst.getString("CONCEPT");
                beanTkt.STRDATE = rst.getString("STRDATE");
                beanTkt.ENDDATE = rst.getString("ENDDATE");
                beanTkt.REFERENCE  = rst.getString("REFERENCE");
                beanTkt.COMMENTS = rst.getString("COMMENTS");
                
                lstTkts.add(beanTkt);
            }
            rst.close();

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
    public List<A2290Filter> loadPXDetailSalesDirect(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0;
        long totQTYTRAS = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("", "Bank w/o Sett.");
        hmDescEstados.put("3", "Pending");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.MPS305_SALESDIRECT_DETAILTICKET(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FROMADATE.trim());
            cstmt.setString(3, filter.IN_TOADATE.trim());
            cstmt.setString(4, filter.IN_FROMSDATE.trim());
            cstmt.setString(5, filter.IN_TOSDATE.trim());
            cstmt.setString(6, filter.IN_CODEBANK.trim());
            cstmt.setString(7, filter.IN_MERCHAND.trim());
            cstmt.setString(8, filter.IN_BANDOC.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.IN_RED.trim());
            cstmt.setString(11, filter.IN_SCARCOD.trim());
            cstmt.setString(12, filter.IN_ACCNUMBER.trim());
            cstmt.setString(13, filter.IN_SDATE.trim());
            cstmt.setString(14, filter.IN_strNETO.trim());
            cstmt.setString(15, filter.IN_TDOC.trim());
            cstmt.setString(16, filter.IN_SEQ.trim());
            cstmt.setString(17, filter.IN_TERMI.trim());
            cstmt.setString(18, filter.IN_SAGENT.trim());
            cstmt.setString(19, filter.IN_DATECI.trim());
            cstmt.setString(20, filter.IN_TRANCI.trim());
            cstmt.setString(21, filter.IN_FUNDSTRGK.trim());
            cstmt.execute();

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
                beanTkt.CCUST = rst.getString("CCUST");
                beanTkt.CCIA = rst.getString("CCIA");
                beanTkt.FORMA = rst.getString("FORMA");
                beanTkt.SERIE = rst.getString("SERIE");
                beanTkt.TDOC = rst.getString("TDOC");
                beanTkt.SEQ = rst.getString("SEQ");
                beanTkt.PRDA = rst.getString("PRDA");
                beanTkt.TRAN = rst.getString("TRAN");
                beanTkt.CFUENTE = rst.getString("CFUENTE");
                beanTkt.SUBFTE = rst.getString("SUBFTE");
                beanTkt.COREP = rst.getString("COREP");
                beanTkt.CODPRO = rst.getString("CODPRO");
                beanTkt.SFLOAD = rst.getString("SFLOAD");
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY");
                beanTkt.SAGENT = rst.getString("SAGENT");
                beanTkt.SCONSOL = rst.getString("SCONSOL");
                beanTkt.SDATE = rst.getString("SDATE");
                beanTkt.SPNR = rst.getString("SPNR");
                beanTkt.TVENTA = rst.getString("TVENTA");
                beanTkt.NEGOC = rst.getString("NEGOC");
                beanTkt.MCLOS = rst.getString("MCLOS");
                beanTkt.SPAYMENT = rst.getString("SPAYMENT");
                beanTkt.SCARDN = rst.getString("SCARDN");
                beanTkt.SCARDNCOR = rst.getString("SCARDNCOR");
                beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                beanTkt.SDATEXP = rst.getString("SDATEXP");
                beanTkt.INSTPLA = rst.getString("INSTPLA");
                beanTkt.INSTPAY = rst.getString("INSTPAY");
                beanTkt.SVFOPINST = rst.getString("SVFOPINST");
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                beanTkt.SVFOPOT = rst.getDouble("SVFOPOT");
                beanTkt.SVFOPNETR = rst.getDouble("SVFOPNETR");
                beanTkt.SVFOPNETRU = rst.getDouble("SVFOPNETRU");
                beanTkt.SCURREVEN = rst.getString("SCURREVEN");
                beanTkt.ADMNUM = rst.getString("ADMNUM");
                beanTkt.NUMADM = rst.getString("NUMADM");
                beanTkt.FADM = rst.getString("FADM");
                beanTkt.CURRADM = rst.getString("CURRADM");
                beanTkt.MERCHN = rst.getString("MERCHN");
                beanTkt.DATECI = rst.getString("DATECI");
                beanTkt.TRANCI = rst.getString("TRANCI");
                beanTkt.DATEC = rst.getString("DATEC");
                beanTkt.TRANC = rst.getString("TRANC");
                beanTkt.DATCO = rst.getString("DATCO");
                beanTkt.FREGLA = rst.getString("FREGLA");
                beanTkt.TIPOTAR = rst.getString("TIPOTAR");
                beanTkt.TDATE = rst.getString("TDATE");
                beanTkt.DATEF = rst.getString("DATEF");
                beanTkt.FADYEN = rst.getString("FADYEN");
                beanTkt.CODEBANK = rst.getString("CODEBANK");
                beanTkt.BANDOC = rst.getString("BANDOC");
                beanTkt.BDATEL = rst.getString("BDATEL");
                beanTkt.BSTVAL = rst.getString("BSTVAL");
                beanTkt.CREJEC = rst.getString("CREJEC");
                beanTkt.BAID = rst.getString("BAID");
                beanTkt.GENCON = rst.getString("GENCON");
                beanTkt.STCON = rst.getString("STCON");
                beanTkt.FCONT = rst.getString("FCONT");
                beanTkt.BDATEP = rst.getString("BDATEP");
                beanTkt.BSTVALP = rst.getString("BSTVALP");
                beanTkt.FNOBANK = rst.getString("FNOBANK");
                beanTkt.INVOICE = rst.getString("INVOICE");
                beanTkt.FSELEC = rst.getString("FSELEC");
                beanTkt.FECSELEC = rst.getString("FECSELEC");
                beanTkt.CERROR = rst.getString("CERROR");
                beanTkt.DATET = rst.getString("DATET");
                beanTkt.STATT = rst.getString("STATT");
                beanTkt.DATEC2 = rst.getString("DATEC2");
                beanTkt.DATEC3 = rst.getString("DATEC3");
                beanTkt.ACCNUMA = rst.getString("ACCNUMA");
                beanTkt.COSTCEN = rst.getString("COSTCEN");
                beanTkt.SOCIETY = rst.getString("SOCIETY");
                beanTkt.GRUPO = rst.getString("GRUPO");
                beanTkt.FDESD = rst.getString("FDESD");
                beanTkt.FHAST = rst.getString("FHAST");
                beanTkt.FPROC = rst.getString("FPROC");
                beanTkt.BANKNAM = rst.getString("BANKNAM");
                beanTkt.ACCNUMB = rst.getString("ACCNUMB");
                beanTkt.BANKCM = rst.getString("BANKCM");
                beanTkt.USCR = rst.getString("USCR");
                beanTkt.FECR = rst.getString("FECR");
                beanTkt.HOCR = rst.getString("HOCR");
                beanTkt.PGMCR = rst.getString("PGMCR");
                beanTkt.USUP = rst.getString("USUP");
                beanTkt.FEUP = rst.getString("FEUP");
                beanTkt.HOUP = rst.getString("HOUP");
                beanTkt.PGMUP = rst.getString("PGMUP");
                
                lstTkts.add(beanTkt);
            }
            rst.close();

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

    public String loadPX269SQP05115(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05115CONCILIMPF102(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "U");
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.BANDOC.trim());
            cstmt.setString(4, filter.VALDATE.trim());
            cstmt.setString(5, filter.CODEBANK.trim());
            cstmt.setString(6, filter.MERCHAND.trim());
            cstmt.setString(7, filter.DATECI.trim());
            cstmt.setString(8, filter.TRANCI.trim());
            cstmt.setString(9, filter.TDOC.trim());
            cstmt.setString(10, filter.FECSELEC.trim());
            cstmt.setString(11, filter.FSELEC.trim());
            cstmt.setInt(12, filters.size());
            cstmt.setDouble(13, filter.NETOC);
            cstmt.setString(14, filter.COREPL.trim());
            cstmt.setString(15, user.getUserInfo().USR);
            cstmt.setString(16, Functions.getFechaActual());
            cstmt.setString(17, Functions.getHoraActual());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP05115CONCILIMPF060_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, "U");
                cstmt2.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(3, filter.BANDOC.trim());
                cstmt2.setString(4, filter.VALDATE.trim());
                cstmt2.setString(5, filter.CODEBANK.trim());
                cstmt2.setString(6, filter.MERCHAND.trim());
                cstmt2.setString(7, filterC.SDATE.trim());
                cstmt2.setString(8, filterC.SAGENT.trim());
                cstmt2.setString(9, filterC.TERMI.trim());
                cstmt2.setString(10, filterC.SCARDN.trim());
                cstmt2.setString(11, filterC.SAUTHOC.trim());
                cstmt2.setDouble(12, filterC.NETO);
                cstmt2.setString(13, filter.DATECI.trim());
                cstmt2.setString(14, filter.TRANCI.trim());
                cstmt2.setString(15, filter.TDOC.trim());
                cstmt2.setString(16, filterC.SEQ);
                cstmt2.setString(17, filterC.RED);
                cstmt2.setString(18, user.getUserInfo().USR);
                cstmt2.setString(19, Functions.getFechaActual());
                cstmt2.setString(20, Functions.getHoraActual());
                
                cstmt2.execute();
                cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    cstmt2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return strMsj;
    }

    public A2290Filter SQPREVERSA_MPF102_F1(A2290Filter filter, UserView user) throws SQLException, Exception {

        String strMsj = "Operation was successful.";
        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPREVERSA_MPF102_F1_V1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_BANDOC.trim());
            cstmt01.setString(3, filter.IN_DATECI.trim());
            cstmt01.setString(4, filter.IN_TRANCI);
            cstmt01.setString(5, user.getUserInfo().USR);
            cstmt01.setString(6, Functions.getFechaActual());
            cstmt01.setString(7, Functions.getHoraActual());

            cstmt01.registerOutParameter(8, Types.VARCHAR);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);
            cstmt01.registerOutParameter(18, Types.INTEGER);
            cstmt01.registerOutParameter(19, Types.INTEGER);
            cstmt01.registerOutParameter(20, Types.INTEGER);
            cstmt01.registerOutParameter(21, Types.INTEGER);
            cstmt01.registerOutParameter(22, Types.INTEGER);
            cstmt01.execute();
            objRtn.MESSAGE = cstmt01.getString(8);
            objRtn.QTYPROC102 = cstmt01.getInt(9);
            objRtn.QTYPROC060 = cstmt01.getInt(10);
            objRtn.QTYPROC101 = cstmt01.getInt(11);
            objRtn.QTYPROC100 = cstmt01.getInt(12);
            objRtn.QTYPROC075 = cstmt01.getInt(13);
            objRtn.QTYPROC076 = cstmt01.getInt(14);
            objRtn.QTYPROC077 = cstmt01.getInt(15);
            objRtn.QTYP102 = cstmt01.getInt(16);
            objRtn.QTYP060 = cstmt01.getInt(17);
            objRtn.QTYP101 = cstmt01.getInt(18);
            objRtn.QTYP100 = cstmt01.getInt(19);
            objRtn.QTYP075 = cstmt01.getInt(20);
            objRtn.QTYP076 = cstmt01.getInt(21);
            objRtn.QTYP077 = cstmt01.getInt(22);

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            strMsj = e.getMessage();
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
//        objRtn.MESSAGE = strMsj;
        return objRtn;
    }
    
    public A2290Filter SQPMPP082_MPF132(UserView user) throws SQLException, Exception {

        String strMsj = "Operation was successful.";
        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + "PRAXISMP" + ".MPS144(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(5, Types.VARCHAR);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, user.getUserInfo().USR);
            cstmt01.setString(3, Functions.getFechaActual());
            cstmt01.setString(4, Functions.getHoraActual());
            cstmt01.setString(5, objRtn.MESSAGE);
            

            cstmt01.execute();
            objRtn.MESSAGE = cstmt01.getString(5);

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            strMsj = e.getMessage();
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
//        objRtn.MESSAGE = strMsj;
        return objRtn;
    }

    public String loadPX269SQP05115Head(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        ResultSet rst = null;
        ResultSet rst1 = null;
        CallableStatement cstmt0 = null;
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        CallableStatement cstmt4 = null;
        Connection cnx0 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;
        Connection cnx4 = null;

        //VALIDO EL MONTO DEL ESTADO DE CUENTA CON LOS MONTOS DEL 60 BUSCADOS POR CABECERA
        double NETOC = filters.get(0).NETOC;
        double NETO = 0;
        String COREP = "";

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05114GETNETO(?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            for (int i = 0; i < filters.size(); i++) {

                cstmt = cnx.prepareCall(SQLCLL01);
                A2290Filter filterC = filters.get(i);
                cstmt.setString(1, filterC.PRDA.trim());
                cstmt.setString(2, filterC.CODPRO.trim());
                cstmt.setString(3, filterC.FLIQUIDACI.trim());
                cstmt.setString(4, filterC.LIQUIDACIO.trim());
                cstmt.setString(5, filterC.MERCHAND.trim());
                cstmt.setString(6, filterC.MONEDA.trim());
                cstmt.setString(7, filterC.MONEDALIQ.trim());
                cstmt.execute();

                rst = cstmt.getResultSet();

                while (rst.next()) {
                    NETO += rst.getDouble("NETO");
                }
                rst.close();
                cstmt.close();
            }
        } catch (Exception e) {
            strMsj = "Error: " + e;
            e.printStackTrace();
            e.getMessage();
        }

        String SQLCLL00 = "{CALL " + session.getMainLibrary() + ".SQP05114GETCOREP(?,?,?,?,?,?,?)}";

        try {
            cnx0 = session.getCNXIBMDB2().getIBMDB2Connection();

            for (int i = 0; i < filters.size(); i++) {

                cstmt0 = cnx0.prepareCall(SQLCLL00);
                A2290Filter filterC = filters.get(i);
                cstmt0.setString(1, filterC.PRDA.trim());
                cstmt0.setString(2, filterC.CODPRO.trim());
                cstmt0.setString(3, filterC.FLIQUIDACI.trim());
                cstmt0.setString(4, filterC.LIQUIDACIO.trim());
                cstmt0.setString(5, filterC.MERCHAND.trim());
                cstmt0.setString(6, filterC.MONEDA.trim());
                cstmt0.setString(7, filterC.MONEDALIQ.trim());
                cstmt0.execute();

                rst1 = cstmt0.getResultSet();

                while (rst1.next()) {
                    COREP = rst1.getString("COREP");
                }
                rst1.close();
                cstmt0.close();
            }
        } catch (Exception e) {
            strMsj = "Error: " + e;
            e.printStackTrace();
            e.getMessage();
        }

        NETO = Double.parseDouble(String.format("%014.2f", NETO).replace(",", "."));

        if (NETOC == NETO) {

            try {

                String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP05115CONCILIMPF102(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

                cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt2 = cnx2.prepareCall(SQLCLL02);

                A2290Filter filter = filters.get(0);

                cstmt2 = cnx2.prepareCall(SQLCLL02);

                cstmt2.setString(1, "U");
                cstmt2.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(3, filter.BANDOC.trim());
                cstmt2.setString(4, filter.VALDATE.trim());
                cstmt2.setString(5, filter.CODEBANK.trim());
                cstmt2.setString(6, filter.MERCHAND.trim());
                cstmt2.setString(7, filter.DATECI.trim());
                cstmt2.setString(8, filter.TRANCI.trim());
                cstmt2.setString(9, filter.TDOC.trim());
                cstmt2.setString(10, filter.FECSELEC.trim());
                cstmt2.setString(11, filter.FSELEC.trim());
                cstmt2.setInt(12, filters.size());
                cstmt2.setDouble(13, filter.NETOC);
                cstmt2.setString(14, COREP);
                cstmt2.setString(15, user.getUserInfo().USR);
                cstmt2.setString(16, Functions.getFechaActual());
                cstmt2.setString(17, Functions.getHoraActual());

                cstmt2.execute();
                cstmt2.close();

                String SQLCLL03 = "{CALL " + session.getMainLibrary() + ".SQP05115CONCILIMPF083(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

                cnx3 = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt3 = cnx3.prepareCall(SQLCLL03);

                for (int i = 0; i < filters.size(); i++) {

                    A2290Filter filterC = filters.get(i);

                    cstmt3.setString(1, filterC.PRDA.trim());
                    cstmt3.setString(2, filterC.CODPRO.trim());
                    cstmt3.setString(3, filterC.FLIQUIDACI.trim());
                    cstmt3.setString(4, filterC.LIQUIDACIO.trim());
                    cstmt3.setString(5, filterC.MERCHAND.trim());
                    cstmt3.setString(6, filterC.MONEDA.trim());
                    cstmt3.setString(7, filterC.MONEDALIQ.trim());
                    cstmt3.setString(8, filter.VALDATE.trim());
                    cstmt3.setString(9, filter.DATECI.trim());
                    cstmt3.setString(10, filter.TRANCI.trim());
                    cstmt3.setString(11, filter.BANDOC.trim());
                    cstmt3.setString(12, user.getUserInfo().USR);
                    cstmt3.setString(13, Functions.getFechaActual());
                    cstmt3.setString(14, Functions.getHoraActual());

                    cstmt3.execute();

                }
                cstmt3.close();

                String SQLCLL04 = "{CALL " + session.getMainLibrary() + ".SQP05115CONCILIMPF060HEAD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

                cnx4 = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt4 = cnx4.prepareCall(SQLCLL04);

                for (int i = 0; i < filters.size(); i++) {

                    A2290Filter filterC = filters.get(i);

                    cstmt4.setString(1, "U");
                    cstmt4.setString(2, session.getUserView().getCustomerInfo().CCUST);
                    cstmt4.setString(3, filter.BANDOC.trim());
                    cstmt4.setString(4, filter.VALDATE.trim());
                    cstmt4.setString(5, filter.CODEBANK.trim());
                    cstmt4.setString(6, filter.MERCHAND.trim());
                    cstmt4.setString(7, filterC.SDATE.trim());
                    cstmt4.setString(8, filterC.SAGENT.trim());
                    cstmt4.setString(9, filterC.TERMI.trim());
                    cstmt4.setString(10, filterC.SCARDN.trim());
                    cstmt4.setString(11, filterC.SAUTHOC.trim());
                    cstmt4.setDouble(12, filterC.NETO);
                    cstmt4.setString(13, filter.DATECI.trim());
                    cstmt4.setString(14, filter.TRANCI.trim());
                    cstmt4.setString(15, filter.TDOC.trim());
                    cstmt4.setString(16, filterC.FLIQUIDACI.trim());
                    cstmt4.setString(17, filterC.LIQUIDACIO.trim());
                    cstmt4.setString(18, filterC.MERCHAND.trim());
                    cstmt4.setString(19, user.getUserInfo().USR);
                    cstmt4.setString(20, Functions.getFechaActual());
                    cstmt4.setString(21, Functions.getHoraActual());
                    cstmt4.setString(22, filterC.SEQ);

                    cstmt4.execute();

                }
                cstmt4.close();

            } catch (Exception e) {
                strMsj = "Error: " + e;
                e.printStackTrace();
                strMsj = e.getMessage();
            } finally {
                if (cstmt != null) {
                    try {
                        cstmt0.close();
                        cstmt.close();
                        cstmt2.close();
                        cstmt3.close();
                        cstmt4.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
                pasarGarbageCollector();
            }

        } else {
            strMsj = "The Sum Amount is not equal to the Transaction Amount Stattement.";
        }

        return strMsj;
    }

    public String loadPX269SQP05115MPF060_UPDATE(A2290Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05115MPF060_UPDATE_NEGOC(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.TDOC.trim());
            cstmt.setString(6, filter.CODEBANK.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SEQ.trim());
            cstmt.setString(11, filter.NEGOC.trim());
            cstmt.setString(12, session.getUserView().getUserInfo().USR);
            cstmt.setString(13, Functions.getFechaActual());
            cstmt.setString(14, Functions.getHoraActual());
            cstmt.execute();

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
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

    public String loadPX287MPS100(List<MPF101> lstLIQ) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "Execute...";
        CallableStatement cstmt = null;
        Connection cnx = null;

        try {

            String SQLCLL02 = "{CALL PRAXISMP.MPS100(?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL02);

            for (int i = 0; i < lstLIQ.size(); i++) {

                MPF101 obj = lstLIQ.get(i);
//                cstmt = cnx.prepareCall(SQLCLL02);

                cstmt.registerOutParameter(5, Types.VARCHAR);

                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt.setString(2, session.getUserView().getCustomerInfo().USR);
                cstmt.setString(3, obj.liq.trim());
                cstmt.setString(4, obj.ec.trim());
                cstmt.setString(5, "");

                cstmt.execute();

                strMsj = strMsj + "**" + cstmt.getString(5);

            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
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
    
    public String loadPX287MPS106(List<MPF101> lstLIQ) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "Execute...";
        CallableStatement cstmt = null;
        Connection cnx = null;

        try {

            String SQLCLL02 = "{CALL PRAXISMP.MPS106(?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL02);

            for (int i = 0; i < lstLIQ.size(); i++) {

                MPF101 obj = lstLIQ.get(i);
//                cstmt = cnx.prepareCall(SQLCLL02);

                cstmt.registerOutParameter(6, Types.VARCHAR);

                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt.setString(2, obj.processR.trim());
                cstmt.setString(3, session.getUserView().getCustomerInfo().USR);
                cstmt.setString(4, obj.liq.trim());
                cstmt.setString(5, obj.ec.trim());
                cstmt.setString(6, "");

                cstmt.execute();

                strMsj = strMsj + "**" + cstmt.getString(6);

            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
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

    public List<MPF101> CONFIEC(String BANDOC) throws SQLException, Exception {

        List<MPF101> listBeanTkt = new ArrayList<MPF101>(0);
        MPF101 beanTkt = new MPF101();
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.CONFIEC(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, BANDOC);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new MPF101();
                beanTkt.BANDOC = rst.getString("BANDOC").trim();
                beanTkt.DATECI = rst.getString("DATECI").trim();
                beanTkt.TRANCI = rst.getString("TRANCI").trim();
                beanTkt.NETOS = rst.getString("NETO").trim();
                beanTkt.VALDATE = rst.getString("VALDATE").trim();
                beanTkt.PRDA = rst.getString("PRDA").trim();
                listBeanTkt.add(beanTkt);
            }
            rst.close();

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
        }

        return listBeanTkt;
    }

    public List<MPF101> CONFILIQ(String QUERY) throws SQLException, Exception {

        List<MPF101> listBeanTkt = new ArrayList<MPF101>(0);
        MPF101 beanTkt = new MPF101();
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.CONFILIQ(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, QUERY);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new MPF101();
                beanTkt.NETOS = rst.getString("NETO").trim();
                beanTkt.QTY = rst.getInt("QTY");
                listBeanTkt.add(beanTkt);
            }
            rst.close();

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
        }

        return listBeanTkt;
    }
    
    public List<MPF101> CONFILIQ_SEQ(String QUERY) throws SQLException, Exception {

        List<MPF101> listBeanTkt = new ArrayList<MPF101>(0);
        MPF101 beanTkt = new MPF101();
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.CONFILIQ_SEQ(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, QUERY);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new MPF101();
                beanTkt.NETOS = rst.getString("NETO").trim();
                beanTkt.QTY = rst.getInt("QTY");
                listBeanTkt.add(beanTkt);
            }
            rst.close();

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
        }

        return listBeanTkt;
    }

    public boolean CONCILIA1(String QUERY, String ban, String dateci, String tranci, int qty, String netos) throws SQLException, Exception {

        MPF101 beanTkt = new MPF101();
        CallableStatement cstmt = null;
        ResultSet rst = null;
        boolean val = true;

        String SQLCLL01 = "{CALL PRAXISMP.CONCILIA(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, QUERY);
            cstmt.setString(2, ban);
            cstmt.setString(3, dateci);
            cstmt.setString(4, tranci);
            cstmt.setInt(5, qty);
            cstmt.setString(6, netos);
            cstmt.setString(7, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(8, Functions.getFechaActual());
            cstmt.setString(9, Functions.getHoraActual());
            cstmt.execute();

        } catch (Exception e) {
            val = false;
            e.getMessage();
            e.printStackTrace();
        } finally {
            cstmt.close();
            cnx.close();
        }

        return val;
    }

    public boolean CONCILIA2(String inQuery, String inBandoc, String inDateci, String inTranci,String inValdate, String inPrda) throws SQLException, Exception {
        boolean result = false;
        String updateQuery = "UPDATE PRAXISMP.MPF060 "
                + "SET BANDOC = ?, DATECI = ?, TRANCI = ?, VALDATE = ?, PRDA = ?, STVAL = '5', USUP = ?, FEUP = ?, HOUP = ?, FREGLA = '9' , PGMUP = 'EXCEL-WEB' "
                + "WHERE STVAL = '3' AND TDOC = 'S' AND " + inQuery;

        try (Connection connection = session.getCNXIBMDB2().getIBMDB2Connection();
                PreparedStatement preparedStatement = connection.prepareStatement(updateQuery)) {

            // Asignación de valores a los parámetros
            preparedStatement.setString(1, inBandoc);
            preparedStatement.setString(2, inDateci);
            preparedStatement.setString(3, inTranci);
            preparedStatement.setString(4, inValdate);
            preparedStatement.setString(5, inPrda);
            preparedStatement.setString(6, session.getUserView().getCustomerInfo().USR);
            preparedStatement.setString(7, Functions.getFechaActual());
            preparedStatement.setString(8, Functions.getHoraActual());

            // Ejecuta el UPDATE
            int rowsUpdated = preparedStatement.executeUpdate();
            System.out.println("Filas actualizadas: " + rowsUpdated);
            result = rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            result = false;
        }

        return result;
    }
    
    public boolean CONCILIA2_SEQ(String inQuery, String inBandoc, String inDateci, String inTranci,String inValdate, String inPrda) throws SQLException, Exception {
        boolean result = false;
        String updateQuery = "UPDATE PRAXISMP.MPF060 "
                + "SET BANDOC = ?, DATECI = ?, TRANCI = ?, VALDATE = ?, PRDA = ?, STVAL = '5', USUP = ?, FEUP = ?, HOUP = ?, FREGLA = '9' , PGMUP = 'EXCEL-WEB' "
                + "WHERE STVAL = '3' AND SEQ = '' AND TDOC = 'S' AND " + inQuery;

        try (Connection connection = session.getCNXIBMDB2().getIBMDB2Connection();
                PreparedStatement preparedStatement = connection.prepareStatement(updateQuery)) {

            // Asignación de valores a los parámetros
            preparedStatement.setString(1, inBandoc);
            preparedStatement.setString(2, inDateci);
            preparedStatement.setString(3, inTranci);
            preparedStatement.setString(4, inValdate);
            preparedStatement.setString(5, inPrda);
            preparedStatement.setString(6, session.getUserView().getCustomerInfo().USR);
            preparedStatement.setString(7, Functions.getFechaActual());
            preparedStatement.setString(8, Functions.getHoraActual());

            // Ejecuta el UPDATE
            int rowsUpdated = preparedStatement.executeUpdate();
            System.out.println("Filas actualizadas: " + rowsUpdated);
            result = rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            result = false;
        }

        return result;
    }
    
    // CASH
    
        public List<MPF100Filter> loadCashSummaryMain(MPF100Filter filter) throws SQLException, Exception {

        List<MPF100Filter> lstTkts = new ArrayList<MPF100Filter>(0);
        MPF100Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotTOTALE = 0, lngTotQPEND = 0, lngTotQPEND1 = 0, lngTotQPEND3 = 0, lngTotQSALES = 0;
        long lngTotQTMATCH = 0, lngTotQTMANUAL = 0, lngTotQTPEND = 0, lngTotTOTALL = 0, lngTotQSALESDIRECT = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS305_MAINSUMMARY(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(3, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(4, filter.IN_COUNTRY.trim());
            cstmt.setString(5, filter.IN_SOURCE.trim());
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

                lngTotQMATCH = rst.getLong("TOTAL_AUTOMATICO");
                lngTotQMANUAL = rst.getLong("TOTAL_MANUAL");
                lngTotTOTALE = rst.getLong("TOTAL_GENERAL");
                lngTotQPEND = rst.getLong("TOTAL_PENDIENTE");
                lngTotQPEND1 = rst.getLong("TOTAL_OTHER");
                lngTotQSALESDIRECT = rst.getLong("TOTAL_VENTA_DIRECTA");
                lngTotQSALES = rst.getLong("TOTAL_CASH");
                lngTotQTMATCH = rst.getLong("TOTAL_AUTOMATICO_LIQUI");
                lngTotQTMANUAL = rst.getLong("TOTAL_MANUAL_LIQUI");
                lngTotQTPEND = rst.getLong("TOTAL_PENDIENTE_LIQUI");
                lngTotTOTALL = rst.getLong("TOTAL_GENERAL_LIQUI");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new MPF100Filter();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.SDATE = rst.getString("PERIOD").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("PERIOD").trim());
                    beanTkt.lngQMATCH = rst.getLong("AUTOMATICO");
                    beanTkt.lngQMANUAL = rst.getLong("MANUAL");
                    beanTkt.lngTOTALE = rst.getLong("TOTAL");
                    beanTkt.lngQPEND = rst.getLong("PENDIENTE");
                    beanTkt.lngQPEND1 = rst.getLong("OTHER");
                    beanTkt.lngQSALESDIRECT = rst.getLong("VENTA_DIRECTA");
//                    beanTkt.lngQPEND3 = rst.getLong("QPEND3");
                    beanTkt.lngQSALES = rst.getLong("TOTAL_CASH");
                    beanTkt.lngQMATCHPercent =  rst.getLong("PORCENTAJE");

                    beanTkt.lngQTMATCH = rst.getLong("AUTOMATICO_LIQUI");
                    beanTkt.lngQTMANUAL = rst.getLong("MANUAL_LIQUI");
                    beanTkt.lngQTPEND = rst.getLong("PENDIENTE_LIQUI");
                    beanTkt.lngTOTALL = rst.getLong("TOTAL_LIQUI");
                    beanTkt.lngQTMATCHPercent =  rst.getLong("PORCENTAJE_LIQUI");

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotTOTALE = lngTotTOTALE;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQPEND1 = lngTotQPEND1;
                    beanTkt.lngTotQPEND3 = lngTotQPEND3;
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQTMATCH = lngTotQTMATCH;
                    beanTkt.lngTotQTMANUAL = lngTotQTMANUAL;
                    beanTkt.lngTotQTPEND = lngTotQTPEND;
                    beanTkt.lngTotTOTALL = lngTotTOTALL;
                    beanTkt.lngTotQSALESDIRECT = lngTotQSALESDIRECT;

                    beanTkt.lngTotQMATCHPercent = (long) (((beanTkt.lngTotQSALES - beanTkt.lngTotQPEND1) > 0) ? (beanTkt.lngTotQMATCH * 100.0) / (beanTkt.lngTotQSALES - beanTkt.lngTotQPEND1) : 0.00);
                    beanTkt.lngTotQTMATCHPercent = (long) ((beanTkt.lngTotTOTALL > 0) ? (beanTkt.lngTotQTMATCH * 100.0) / beanTkt.lngTotTOTALL : 0.00);

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

}
