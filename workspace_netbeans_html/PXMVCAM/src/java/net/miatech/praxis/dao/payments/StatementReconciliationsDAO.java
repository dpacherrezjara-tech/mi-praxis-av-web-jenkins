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
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.payments.BankReconciliationDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.MPF101;
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
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00838MAIN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(4, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(5, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_BANK.trim());
            cstmt.setString(8, filter.IN_AFTE.trim());
            cstmt.setString(9, filter.IN_TTRAN.trim());
            cstmt.setString(10, filter.IN_COUNTRY.trim());
            cstmt.setString(11, filter.IN_COREP.trim());

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

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngTOTALE = rst.getLong("TOTALE");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQPEND1 = rst.getLong("QPEND1");
                    beanTkt.lngQPEND3 = rst.getLong("QPEND3");
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQMATCHPercent = (beanTkt.lngQSALES > 0) ? (beanTkt.lngQMATCH * 100.0) / beanTkt.lngQSALES : 0.00;
                    
                    
                    beanTkt.lngQTMATCH = rst.getLong("QTMATCH");
                    beanTkt.lngQTMANUAL = rst.getLong("QTMANUAL");
                    beanTkt.lngQTPEND = rst.getLong("QTPEND");
                    beanTkt.lngTOTALL = rst.getLong("TOTALL");
                    beanTkt.lngQTMATCHPercent = (beanTkt.lngTOTALL > 0) ? (beanTkt.lngQTMATCH * 100.0) / beanTkt.lngTOTALL : 0.00;

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
                    
                    beanTkt.lngTotQMATCHPercent = (beanTkt.lngTotQSALES > 0) ? (beanTkt.lngTotQMATCH * 100.0) / beanTkt.lngTotQSALES : 0.00;
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00839_PROCESS(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_MERCHN.trim());
            cstmt.setString(6, filter.IN_BANK.trim());
            cstmt.setString(7, filter.IN_TTRAN.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.IN_COREP.trim());

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
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00839STVAL_PROCESS(?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(3, filter.IN_SDATE);
            cstmt.setString(4, filter.IN_STVAL.trim());
            cstmt.setString(5, filter.IN_BANK.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
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
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.IN_SDATE);
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_COREP = filter.IN_COREP.trim();

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00839STVAL_PROCE_LIQ(?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(3, filter.IN_STVAL.trim());
            cstmt.setString(4, filter.IN_BANK.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_COREP.trim());

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00839STVAL_PROCESS_PEND(?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(3, filter.IN_SDATE);
            cstmt.setString(4, filter.IN_STVAL.trim());
            cstmt.setString(5, filter.IN_BANK.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
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
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.IN_SDATE);
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_COREP = filter.IN_COREP.trim();
                    beanTkt.COREP = filter.IN_COREP.trim();

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00840(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(4, filter.IN_SDATEE);
            cstmt.setString(5, filter.IN_CBANK);
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_TTRAN.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.IN_COREP.trim());

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00840Stval(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(6, filter.IN_SCURRENCY);
            cstmt.setString(7, filter.IN_STVAL.trim());
            cstmt.setString(8, filter.IN_TTRAN.trim());
            cstmt.setString(9, filter.IN_COUNTRY.trim());
            cstmt.setString(10, filter.IN_COREP.trim());

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00841(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(5, filter.IN_CBANK);
            cstmt.setString(6, filter.IN_SCURRENCY);
            cstmt.setString(7, filter.IN_STVAL);
            cstmt.setString(8, filter.IN_TTRAN.trim());
            cstmt.setString(9, filter.IN_COUNTRY.trim());
            cstmt.setString(10, filter.IN_COREP.trim());

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

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00841DetLiqDetail(?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(3, filter.IN_STVAL.trim());
            cstmt.setString(4, filter.IN_BANK.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_COREP.trim());

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00842(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_BANDOC);
            cstmt.setString(3, filter.IN_CODEBANK);
            cstmt.setString(4, filter.IN_TDOC);

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
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();

//                  beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_CBANK = filter.IN_CBANK.trim();
                    beanTkt.IN_SDATEE = filter.IN_SDATEE.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();

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
                    beanTkt.RED = rst.getString("RED").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.TRANCI = rst.getString("TRANCI").trim();
                    beanTkt.DATECI = rst.getString("DATECI").trim();
                    beanTkt.PENDINGDAYS = rst.getString("PENDINGDAYS").trim();
                    beanTkt.FSTVAL = rst.getString("STVAL").trim();
//                    if (filter.IN_DATE.trim().equals("VALDATE")) {
//                        beanTkt.strTitulo = "Value Date : " + beanTkt.VALDATE + " - Bank : " + beanTkt.IN_CBANK;
//                    } else {
//                        beanTkt.strTitulo = "Abono Date : " + beanTkt.ADATE + " - Bank : " + beanTkt.IN_CBANK;
//                    }
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05114Detail(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP05115CONCILIMPF060(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                cstmt2.setString(16, user.getUserInfo().USR);
                cstmt2.setString(17, Functions.getFechaActual());
                cstmt2.setString(18, Functions.getHoraActual());
                cstmt2.setString(19, filterC.SEQ);

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

    public String loadPX287MPS100(List<MPF101> lstLIQ) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "An Error Ocurred.";
        CallableStatement cstmt = null;
        Connection cnx = null;

        try {

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".MPS100(?,?,?,?,?)}";

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
}
