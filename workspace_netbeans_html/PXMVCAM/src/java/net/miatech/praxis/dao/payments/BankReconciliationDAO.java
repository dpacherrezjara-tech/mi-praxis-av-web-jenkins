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
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.payments.LoadConciliationDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2309AFilter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jtorres
 */
public class BankReconciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public BankReconciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BankReconciliationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    //**************************************************************************
    //***************************** PX269 **************************************
    //**************************************************************************
    public List<A2290Filter> loadPX269SQP00698(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQACEP = 0, lngTotQRECH = 0, lngTotQSOSP = 0;//Transacciones
        long lngTotQACEPT = 0, lngTotQRECHT = 0, lngTotQSOSPT = 0;//Tickets
        long lngTotQMATCH = 0, lngTotQTEF = 0, lngTotQPAS48 = 0, lngTotQWSAL = 0;//Transacciones
        long lngTotQTOTSAL = 0, lngTotQTOTBK = 0, lngTotQTOTBKT = 0, lngTotQMANUAL = 0;//Transacciones
        long lngTotQCLAR = 0, lngTotQCHRG = 0, lngTotQDIFF = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(4, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_PAYMENT.trim());
            cstmt.setString(7, filter.IN_BANK);
            cstmt.setString(8, filter.IN_CARDC.trim());
            cstmt.setString(9, filter.IN_CARDN1.trim());
            cstmt.setString(10, filter.IN_CARDN2.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_COUNTRY.trim());
            cstmt.setString(14, filter.IN_FTE.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());

            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQTEF = rst.getLong("QTEF");
                lngTotQPAS48 = rst.getLong("QPAS48");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQTOTSAL = rst.getLong("QTOTSAL");
                lngTotQACEP = rst.getLong("QACEP");
                lngTotQRECH = rst.getLong("QRECH");
                lngTotQSOSP = rst.getLong("QSOSP");
                lngTotQACEPT = rst.getLong("QACEPT");
                lngTotQRECHT = rst.getLong("QRECHT");
                lngTotQSOSPT = rst.getLong("QSOSPT");
                lngTotQTOTBK = rst.getLong("QTOTBK");
                lngTotQTOTBKT = rst.getLong("QTOTBKT");
                lngTotQWSAL = rst.getLong("QWSAL");
                lngTotQCLAR = rst.getLong("QCLAR");
                lngTotQCHRG = rst.getLong("QCHRG");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.IN_SDATE = rst.getString("DATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1;
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2;
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK;
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY;
                    beanTkt.IN_FTE = filter.IN_FTE;
                    beanTkt.IN_ADYEN = filter.IN_ADYEN;

                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQTEF = rst.getLong("QTEF");
                    beanTkt.lngQPAS48 = rst.getLong("QPAS48");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQTOTSAL = rst.getLong("QTOTSAL");

                    beanTkt.lngQACEP = rst.getLong("QACEP");
                    beanTkt.lngQRECH = rst.getLong("QRECH");
                    beanTkt.lngQSOSP = rst.getLong("QSOSP");
                    beanTkt.lngQACEPT = rst.getLong("QACEPT");
                    beanTkt.lngQRECHT = rst.getLong("QRECHT");
                    beanTkt.lngQSOSPT = rst.getLong("QSOSPT");
                    beanTkt.lngQTOTBK = rst.getLong("QTOTBK");
                    beanTkt.lngQTOTBKT = rst.getLong("QTOTBKT");
                    //CUPONES CON LIQ BANCARIA (A2291) SIN ACCB EN LA VENTA (A2290)
                    beanTkt.lngQTOTWS = rst.getLong("QWSAL");
                    beanTkt.lngQCLAR = rst.getLong("QCLAR");
                    beanTkt.lngQCHRG = rst.getLong("QCHRG");

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQTEF = lngTotQTEF;
                    beanTkt.lngTotQPAS48 = lngTotQPAS48;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQTOTSAL = lngTotQTOTSAL;

                    beanTkt.lngTotQACEP = lngTotQACEP;
                    beanTkt.lngTotQRECH = lngTotQRECH;
                    beanTkt.lngTotQSOSP = lngTotQSOSP;
                    beanTkt.lngTotQACEPT = lngTotQACEPT;
                    beanTkt.lngTotQRECHT = lngTotQRECHT;
                    beanTkt.lngTotQSOSPT = lngTotQSOSPT;
                    beanTkt.lngTotQTOTBK = lngTotQTOTBK;
                    beanTkt.lngTotQTOTBKT = lngTotQTOTBKT;
                    beanTkt.lngTotQCLAR = lngTotQCLAR;
                    beanTkt.lngTotQCHRG = lngTotQCHRG;

                    beanTkt.lngTotQTOTWS = lngTotQWSAL;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
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

    public List<A2290Filter> loadPX269SQP03988(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Match");
        hmDescEstadosSTVAL.put("2", "Settlement w/o Paying");
        hmDescEstadosSTVAL.put("3", "Paying w/o Settlement");
        hmDescEstadosSTVAL.put("4", "Match with Difference");
        hmDescEstadosSTVAL.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03988(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PNR);

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

                beanTkt = new A2290Filter();
                beanTkt.CCUST = rst.getString("CCUST").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim(); //
                beanTkt.TDOC = rst.getString("TDOC").trim();//
                beanTkt.STVAL = rst.getString("STVAL").trim();
                if (hmDescEstadosSTVAL.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanTkt.strDescStatus = hmDescEstadosSTVAL.get(rst.getString("STVAL").trim()).toString();
                }
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();//
                beanTkt.TRNXCODE = rst.getString("TRNXCODE").trim();
                beanTkt.FTE = rst.getString("FTE").trim();
                if (rst.getString("FTE").trim().equals("S")) {
                    beanTkt.strDescFTE = "ASR";
                } else if (rst.getString("FTE").trim().equals("A")) {
                    beanTkt.strDescFTE = "ARC";
                } else if (rst.getString("FTE").trim().equals("B")) {
                    beanTkt.strDescFTE = "BSP";
                } else {
                    beanTkt.strDescFTE = rst.getString("FTE").trim();
                }
                beanTkt.NUMREF = rst.getString("NUMREF").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim(); //
                beanTkt.MERCHN = rst.getString("MERCHN").trim();//
                beanTkt.SCARDN = rst.getString("SCARDN").trim();//
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();//
                beanTkt.TIPOTAR = rst.getString("TIPOTAR").trim();//
                beanTkt.CODEBANK = rst.getString("CODEBANK").trim();//
                beanTkt.FCONC = rst.getString("FCONC").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();//
                beanTkt.SVFOP = rst.getDouble("SVFOP");//
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim(); //
                beanTkt.SAGENT = rst.getString("SAGENT").trim();//
                beanTkt.SORIG = rst.getString("SORIG").trim();
                beanTkt.FADYEN = rst.getString("FADYEN").trim();

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
            }
            rst.close();

        } catch (Exception e) {
            e.getMessage();
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

    public List<A2290Filter> loadPX269SQP00699(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQACEP = 0, lngTotQRECH = 0, lngTotQSOSP = 0, lngTotQTOTSAL = 0;
        long lngTotQACEPT = 0, lngTotQRECHT = 0, lngTotQSOSPT = 0, lngTotQTOTBK = 0, lngTotQTOTBKT = 0;
        long lngTotQMATCH = 0, lngTotQTEF = 0, lngTotQPAS48 = 0, lngTotQWSAL = 0;//Transacciones

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00699(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_PAYMENT.trim());
            cstmt.setString(6, filter.IN_BANK);
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_CARDN.trim());
            cstmt.setString(9, filter.IN_MERCHN.trim());
            cstmt.setString(10, filter.IN_AGENT.trim());
            cstmt.setString(11, filter.IN_FTE.trim());
            cstmt.setString(12, filter.IN_ADYEN.trim());

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
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQTEF = rst.getLong("QTEF");
                lngTotQPAS48 = rst.getLong("QPAS48");
                lngTotQTOTSAL = rst.getLong("QTOTSAL");
                lngTotQACEP = rst.getLong("QACEP");
                lngTotQRECH = rst.getLong("QRECH");
                lngTotQSOSP = rst.getLong("QSOSP");
                lngTotQACEPT = rst.getLong("QACEPT");
                lngTotQRECHT = rst.getLong("QRECHT");
                lngTotQSOSPT = rst.getLong("QSOSPT");
                lngTotQTOTBK = rst.getLong("QTOTBK");
                lngTotQTOTBKT = rst.getLong("QTOTBKT");

                lngTotQWSAL = rst.getLong("QWSAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    /*if (hmDescCard.containsKey(rst.getString("SCARCOD").trim().toUpperCase())) {
                     beanTkt.strDescCard = hmDescCard.get(rst.getString("SCARCOD").trim()).toString();
                     } else {
                     beanTkt.strDescCard = "(Not Found)";
                     }*/
                    if (!rst.getString("NAMECAR").trim().isEmpty()) {
                        beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                    } else {
                        beanTkt.strDescCard = "(Not Found)";
                    }
                    beanTkt.SORIG = rst.getString("SORIG").trim();

                    if (hmDescOrigen.containsKey(rst.getString("SORIG").trim())) {
                        beanTkt.strSORIG = hmDescOrigen.get(rst.getString("SORIG").trim());
                    } else {
                        beanTkt.strSORIG = rst.getString("SORIG").trim();
                    }

                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQTEF = rst.getLong("QTEF");
                    beanTkt.lngQPAS48 = rst.getLong("QPAS48");
                    beanTkt.lngQACEP = rst.getLong("QACEP");
                    beanTkt.lngQRECH = rst.getLong("QRECH");
                    beanTkt.lngQSOSP = rst.getLong("QSOSP");
                    beanTkt.lngQACEPT = rst.getLong("QACEPT");
                    beanTkt.lngQRECHT = rst.getLong("QRECHT");
                    beanTkt.lngQSOSPT = rst.getLong("QSOSPT");
                    beanTkt.lngQTOTSAL = rst.getLong("QTOTSAL");
                    beanTkt.lngQTOTBK = rst.getLong("QTOTBK");
                    beanTkt.lngQTOTBKT = rst.getLong("QTOTBKT");
                    //CUPONES CON LIQ BANCARIA (A2291) SIN ACCB EN LA VENTA (A2290)
                    beanTkt.lngQTOTWS = rst.getLong("QWSAL");
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQTEF = lngTotQTEF;
                    beanTkt.lngTotQPAS48 = lngTotQPAS48;
                    beanTkt.lngTotQACEP = lngTotQACEP;
                    beanTkt.lngTotQRECH = lngTotQRECH;
                    beanTkt.lngTotQSOSP = lngTotQSOSP;
                    beanTkt.lngTotQACEPT = lngTotQACEPT;
                    beanTkt.lngTotQRECHT = lngTotQRECHT;
                    beanTkt.lngTotQSOSPT = lngTotQSOSPT;
                    beanTkt.lngTotQTOTWS = lngTotQWSAL;
                    beanTkt.lngTotQTOTSAL = lngTotQTOTSAL;
                    beanTkt.lngTotQTOTBK = lngTotQTOTBK;
                    beanTkt.lngTotQTOTBKT = lngTotQTOTBKT;

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

    public List<A2290Filter> loadPX269SQP00700(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQACEP = 0, lngTotQRECH = 0, lngTotQSOSP = 0;
        long lngTotQACEPT = 0, lngTotQRECHT = 0, lngTotQSOSPT = 0, lngTotQMANUAL = 0;
        long lngTotQMATCH = 0, lngTotQTEF = 0, lngTotQPAS48 = 0, lngTotQDIFF = 0, lngTotQWSAL = 0;//Transacciones

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00700(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_PAYMENT.trim());
            cstmt.setString(6, filter.IN_BANK);
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_CARDN1.trim());
            cstmt.setString(9, filter.IN_CARDN2.trim());
            cstmt.setString(10, filter.SORIG.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_COUNTRY.trim());
            cstmt.setString(14, filter.IN_FTE.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());

            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQTEF = rst.getLong("QTEF");
                lngTotQPAS48 = rst.getLong("QPAS48");
                lngTotQACEP = rst.getLong("QACEP");
                lngTotQRECH = rst.getLong("QRECH");
                lngTotQSOSP = rst.getLong("QSOSP");
                lngTotQACEPT = rst.getLong("QACEPT");
                lngTotQRECHT = rst.getLong("QRECHT");
                lngTotQSOSPT = rst.getLong("QSOSPT");
                lngTotQWSAL = rst.getLong("QWSAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1;
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2;
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.strSORIG = filter.strSORIG.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY;
                    beanTkt.IN_FTE = filter.IN_FTE;
                    beanTkt.IN_ADYEN = filter.IN_ADYEN;

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQTEF = rst.getLong("QTEF");
                    beanTkt.lngQPAS48 = rst.getLong("QPAS48");
                    beanTkt.lngQACEP = rst.getLong("QACEP");
                    beanTkt.lngQRECH = rst.getLong("QRECH");
                    beanTkt.lngQSOSP = rst.getLong("QSOSP");
                    beanTkt.lngQACEPT = rst.getLong("QACEPT");
                    beanTkt.lngQRECHT = rst.getLong("QRECHT");
                    beanTkt.lngQSOSPT = rst.getLong("QSOSPT");
                    //CUPONES CON LIQ BANCARIA (A2291) SIN ACCB EN LA VENTA (A2290)
                    beanTkt.lngQTOTWS = rst.getLong("QWSAL");
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQTEF = lngTotQTEF;
                    beanTkt.lngTotQPAS48 = lngTotQPAS48;
                    beanTkt.lngTotQACEP = lngTotQACEP;
                    beanTkt.lngTotQRECH = lngTotQRECH;
                    beanTkt.lngTotQSOSP = lngTotQSOSP;
                    beanTkt.lngTotQACEPT = lngTotQACEPT;
                    beanTkt.lngTotQRECHT = lngTotQRECHT;
                    beanTkt.lngTotQSOSPT = lngTotQSOSPT;
                    beanTkt.lngTotQTOTWS = lngTotQWSAL;

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

    public List<A2290Filter> loadPX269SQP00717(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0, lngQTYTKT = 0;
        double dblTotSVFOP = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");

        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Match");
        hmDescEstadosSTVAL.put("2", "Settlement w/o Paying");
        hmDescEstadosSTVAL.put("3", "Paying w/o Settlement");
        hmDescEstadosSTVAL.put("4", "Match with Difference");
        hmDescEstadosSTVAL.put("5", "Match Manual");

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00717(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_COUNTRY.trim());
            cstmt.setString(6, filter.IN_CARDN1.trim());
            cstmt.setString(7, filter.IN_CARDN2.trim());
            cstmt.setString(8, filter.SCARCOD.trim());
            cstmt.setString(9, filter.SCURRENCY.trim());
            cstmt.setString(10, filter.SORIG.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_BANK.trim());
            cstmt.setString(14, filter.IN_FTE.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());
            cstmt.setString(16, filter.IN_STVAL.trim());

            cstmt.setInt(17, filter.page.PAGNUM);
            cstmt.setInt(18, filter.page.PAGROW);
            cstmt.setInt(19, filter.page.TOTPAG);
            cstmt.setInt(20, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(17);
            filter.page.PAGROW = cstmt.getInt(18);
            filter.page.TOTPAG = cstmt.getInt(19);
            filter.page.TOTROW = cstmt.getInt(20);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                lngQTYTKT += rst.getLong("QTYTKT");
                dblTotSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1;
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2;
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();

                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (hmDescEstadosSTVAL.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstadosSTVAL.get(rst.getString("STVAL").trim()).toString();
                    }
                    beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.strDescripcion = rst.getString("DESCAGT").trim();
                    beanTkt.FTE = rst.getString("FTE").trim();
                    if (rst.getString("FTE").trim().equals("S")) {
                        beanTkt.strDescFTE = "ASR";
                    } else if (rst.getString("FTE").trim().equals("A")) {
                        beanTkt.strDescFTE = "ARC";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        beanTkt.strDescFTE = "BSP";
                    } else {
                        beanTkt.strDescFTE = rst.getString("FTE").trim();
                    }
                    beanTkt.strTRNXCODE = rst.getString("TRNXCODE").trim();
                    beanTkt.strPEM = rst.getString("PEM").trim();
                    if (beanTkt.strPEM.trim().equals("01")) {
                        beanTkt.strPEM = "Manual";
                    } else if (beanTkt.strPEM.trim().equals("05")) {
                        beanTkt.strPEM = "Chip EMV";
                    } else if (beanTkt.strPEM.trim().equals("80")) {
                        beanTkt.strPEM = "Fallback";
                    } else if (beanTkt.strPEM.trim().equals("90")) {
                        beanTkt.strPEM = "Deslizada";
                    }
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.TDATE = rst.getString("TDATE").trim();
                    beanTkt.DATEF = rst.getString("DATEF").trim();
                    if (rst.getString("BDATEP").trim().length() == 6) {
                        beanTkt.BDATEP = Functions.FormatFecha(rst.getString("BDATEP").trim(), "yyMMdd", "yyyyMMdd");
                    } else {
                        beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    }
                    if (hmDescEstados.containsKey(rst.getString("BSTVAL").trim().toUpperCase())) {
                        beanTkt.BSTVAL = hmDescEstados.get(rst.getString("BSTVAL").trim()).toString();
                    } else {
                        beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    }
                    beanTkt.lngQTYTKT = rst.getLong("QTYTKT");

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.strNUMREF = rst.getString("NUMREF").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.strFLOAD = rst.getString("FLOAD").trim();
                    if (beanTkt.strFLOAD.trim().equals("M")) {
                        beanTkt.strFLOAD = "Manual";
                    }
                    beanTkt.SDATEL = rst.getString("LDATE").trim();
                    beanTkt.strSORIG = rst.getString("SORIG").trim();

                    if (hmDescOrigen.containsKey(rst.getString("SORIG").trim())) {
                        beanTkt.strSORIG = hmDescOrigen.get(rst.getString("SORIG").trim());
                    } else {
                        beanTkt.strSORIG = rst.getString("SORIG").trim();
                    }
                    beanTkt.BAID = rst.getString("BAID").trim();
                    beanTkt.MERCHN = rst.getString("MERCHNC").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    if (rst.getString("FLAGC").trim().equals("C")) {
                        beanTkt.FLAGC = "Match";
                    }/* else {
                     beanTkt.FLAGC = "Paying w/o Sales";
                     }*/

                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    if (!rst.getString("DATEC").trim().equals("")) {
                        beanTkt.strBankDeposit = rst.getString("DATEC").trim();
                    } else if (!beanTkt.BDATEP.trim().isEmpty()) {
                        beanTkt.strBankDeposit = String.valueOf(Functions.diferenciaDiasEntreSistema(beanTkt.BDATEP));
                    }
                    if (beanTkt.SCARCOD.equals("AX")) {
                        beanTkt.FCONC = rst.getString("FCONC").trim();
                        if (beanTkt.FCONC.trim().equals("T")) {
                            beanTkt.strDescFCONC = "Conciliation by Ticket";
                        } else if (beanTkt.FCONC.trim().equals("G")) {
                            beanTkt.strDescFCONC = "Conciliation by Group";
                        }
                    }

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.lngTotQTYTKT = lngQTYTKT;
                    beanTkt.dblTotSVFOP = dblTotSVFOP;
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

    public List<A2290Filter> loadPX269SQP00744(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00744_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE.trim());//20190302
            cstmt.setString(3, filter.TDOC.trim());//R
            cstmt.setString(4, filter.SCARCOD.trim());//MC
            //cstmt.setString(5, filter.SCARDN.trim());
            if (filter.SCARDN.trim().length() >= 15) {//518899******6358
                cstmt.setString(5, filter.SCARDN.substring(0, 6).trim());
                cstmt.setString(6, filter.SCARDN.substring(filter.SCARDN.trim().length() - 4).trim());
            } else {
                cstmt.setString(5, "");
                cstmt.setString(6, "");
            }
            cstmt.setString(7, filter.BAID.trim());//20191205005214
            cstmt.setString(8, filter.SAUTHOC.trim());//509011
            cstmt.setString(9, filter.CODEBANK.trim()); //BN
            cstmt.setString(10, filter.NUMREF.trim());//75445509061250075522161
            cstmt.setString(11, filter.FTE.trim()); //

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

            if (rst.next()) {
                totAVFOP = rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.RN = rst.getLong("RN");
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.CODEBANK = filter.CODEBANK.trim();
                    beanTkt.NUMREF = filter.NUMREF.trim();
                    beanTkt.strTitulo = filter.strTitulo.trim();
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.SCARDN = filter.SCARDN.trim();
                    beanTkt.SAUTHOC = filter.SAUTHOC.trim();
                    beanTkt.FTE = filter.FTE.trim();

                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    //ACCB
                    beanTkt.AAGENT = rst.getString("AAGENT").trim();
                    beanTkt.strDescripcion = rst.getString("DESCAGT").trim();
                    beanTkt.ADATE = rst.getString("ADATE").trim();
                    beanTkt.AVFOP = rst.getDouble("AVFOP");
                    beanTkt.ACURRENCY = rst.getString("ACURRENCY").trim();
                    beanTkt.ACARDN = rst.getString("ACARDN").trim();
                    beanTkt.APNR = rst.getString("APNR").trim();
                    beanTkt.ACARCOD = rst.getString("ACARCOD").trim();
                    beanTkt.ACOUNTRY = rst.getString("ACOUNTRY").trim();
                    beanTkt.AAUTHOC = rst.getString("AAUTHOC").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    //Banks
                    beanTkt.BDATEL = rst.getString("BDATEL").trim();
                    beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    if (beanTkt.BSTVAL.trim().equals("1")) {
                        beanTkt.BSTVAL = "Accepted";
                    } else if (beanTkt.BSTVAL.trim().equals("2")) {
                        beanTkt.BSTVAL = "Rejected";
                    } else if (beanTkt.BSTVAL.trim().equals("3")) {
                        beanTkt.BSTVAL = "Suspect";
                    }
                    beanTkt.BAID = rst.getString("BAID").trim();
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    beanTkt.BSTVALP = rst.getString("BSTVALP").trim();
                    if (beanTkt.BSTVALP.trim().equals("1")) {
                        beanTkt.BSTVALP = "Paid";
                    }

                    // if (!beanTkt.ADATE.trim().equals("")) {
                    //     beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.ADATE);
                    // }
                    if (!beanTkt.ADATE.trim().equals("")) {
                        if (!beanTkt.BDATEP.trim().equals("")) {
                            beanTkt.lngDays = Functions.diferenciaDiasEntreSistemaPago(beanTkt.ADATE, beanTkt.BDATEP);
                        } else {
                            beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.ADATE);
                        }
                    }

                    beanTkt.totSVFOP = totAVFOP;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;
                    lstData.add(beanTkt);
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

        return lstData;
    }

    public List<A2290Filter> loadPX269SQP02492(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02492(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE.trim());
            cstmt.setString(3, filter.SCOUNTRY.trim());
            cstmt.setString(4, filter.TDOC.trim());
            cstmt.setString(5, filter.CODEBANK.trim());
            cstmt.setString(6, filter.SCARCOD.trim());
            cstmt.setString(7, filter.SCARDN.trim());
            cstmt.setString(8, filter.SAUTHOC.trim());
            cstmt.setDouble(9, filter.SVFOP);
            cstmt.setString(10, filter.SEQNUM.trim());
            cstmt.setString(11, filter.NUMREF.trim());

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

            if (rst.next()) {
                totAVFOP = rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.RN = rst.getLong("RN");
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.CODEBANK = filter.CODEBANK.trim();
                    beanTkt.NUMREF = filter.NUMREF.trim();
                    beanTkt.strTitulo = filter.strTitulo.trim();
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.SCARDN = filter.SCARDN.trim();
                    beanTkt.SAUTHOC = filter.SAUTHOC.trim();
                    beanTkt.FTE = filter.FTE.trim();

                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    //ACCB
                    beanTkt.AAGENT = rst.getString("AAGENT").trim();
                    beanTkt.strDescripcion = rst.getString("DESCAGT").trim();
                    beanTkt.ADATE = rst.getString("ADATE").trim();
                    beanTkt.AVFOP = rst.getDouble("AVFOP");
                    beanTkt.ACURRENCY = rst.getString("ACURRENCY").trim();
                    beanTkt.ACARDN = rst.getString("ACARDN").trim();
                    beanTkt.APNR = rst.getString("APNR").trim();
                    beanTkt.ACARCOD = rst.getString("ACARCOD").trim();
                    beanTkt.ACOUNTRY = rst.getString("ACOUNTRY").trim();
                    beanTkt.AAUTHOC = rst.getString("AAUTHOC").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    //Banks
                    beanTkt.BDATEL = rst.getString("BDATEL").trim();
                    beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    if (beanTkt.BSTVAL.trim().equals("1")) {
                        beanTkt.BSTVAL = "Accepted";
                    } else if (beanTkt.BSTVAL.trim().equals("2")) {
                        beanTkt.BSTVAL = "Rejected";
                    } else if (beanTkt.BSTVAL.trim().equals("3")) {
                        beanTkt.BSTVAL = "Suspect";
                    }
                    beanTkt.BAID = rst.getString("BAID").trim();
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    beanTkt.BSTVALP = rst.getString("BSTVALP").trim();
                    if (beanTkt.BSTVALP.trim().equals("1")) {
                        beanTkt.BSTVALP = "Paid";
                    }

                    if (!beanTkt.ADATE.trim().equals("")) {
                        if (!beanTkt.BDATEP.trim().equals("")) {
                            beanTkt.lngDays = Functions.diferenciaDiasEntreSistemaPago(beanTkt.ADATE, beanTkt.BDATEP);
                        } else {
                            beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.ADATE);
                        }
                    }

                    beanTkt.totSVFOP = totAVFOP;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;
                    lstData.add(beanTkt);
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

        return lstData;
    }

    public A2290Filter loadPX269SQP00833(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Settlement w/o Paying");
        hmDescEstados.put("3", "Paying w/o Settlement");
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.strTRNXCODE.trim());
            cstmt.setString(4, filter.strNUMREF.trim());
            cstmt.setString(5, filter.SCARDN.trim());
            cstmt.setString(6, filter.SAUTHOC.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {

                //GUARDANDO DATOS CLAVE ORIGINALES =============================
                beanTkt.origSDATE = rst.getString("SDATE").trim();
                beanTkt.origSCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.origTDOC = rst.getString("TDOC").trim();
                beanTkt.origCODEBANK = rst.getString("CODEBANK").trim();
                beanTkt.origSCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.origSCARDN = rst.getString("SCARDN").trim();
                beanTkt.origSAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.origSCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.origSVFOP = rst.getDouble("SVFOP");
                beanTkt.origSEQNUM = rst.getString("SEQNUM").trim();
                //==============================================================
                beanTkt.FADYEN = rst.getString("FADYEN").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.CBANK = rst.getString("CODEBANK").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                //beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                beanTkt.IN_CARDN1 = rst.getString("SCARDN").trim().substring(0, 6);
                beanTkt.IN_CARDN2 = rst.getString("SCARDN").trim().substring(rst.getString("SCARDN").trim().length() - 4);
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.strDescAFTE = rst.getString("DESMONEDA").trim();
                beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanTkt.strDescStatus = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                }
                beanTkt.MERCHN = rst.getString("MERCHN").trim();
                beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                beanTkt.strTRNXCODE = rst.getString("TRNXCODE").trim();
                beanTkt.strNUMREF = rst.getString("NUMREF").trim();
                beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                beanTkt.TIPOTAR = rst.getString("TIPOTAR").trim();
                beanTkt.strPEM = rst.getString("PEM").trim();
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.strDescripcion = rst.getString("DESAGENT").trim();
                beanTkt.SFLOAD = rst.getString("FLOAD").trim();
                beanTkt.SDATEL = rst.getString("LDATE").trim();
                beanTkt.CREJEC = rst.getString("REASONREJ").trim();
                beanTkt.strCREJEC = rst.getString("DESCREJ").trim();
                beanTkt.TDATE = rst.getString("TDATE").trim();
                beanTkt.DATEF = rst.getString("DATEF").trim();
                beanTkt.strSORIG = rst.getString("SORIG").trim();
                if (rst.getString("BDATEP").trim().length() == 6) {
                    beanTkt.BDATEP = Functions.FormatFecha(rst.getString("BDATEP").trim(), "yyMMdd", "yyyyMMdd");
                } else {
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                }
                beanTkt.lngQTYTKT = rst.getLong("QTYTKT");
                beanTkt.BAID = rst.getString("BAID").trim();
                beanTkt.FLOADE = rst.getString("FLOADE").trim();
                beanTkt.LDATEE = rst.getString("LDATEE").trim();
                beanTkt.STATUSC = rst.getString("STATUSC").trim();
                beanTkt.DATEC = rst.getString("DATEC").trim();
                beanTkt.STATT = rst.getString("STATT").trim();
                beanTkt.DATET = rst.getString("DATET").trim();

                beanTkt.strComment = rst.getString("MSJJ").trim();

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

    public A2290Filter loadPX269SQPXXX(A2290Filter filter) throws SQLException, Exception {

        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
//        hmDescEstados.put("6", "Forced Match");
//        hmDescEstados.put("7", "Compensation Match");
//        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "Tkt");
        hmDescReglas.put("2", "PNR");
        hmDescReglas.put("3", "CCard");
        hmDescReglas.put("4", "Manual");
        hmDescReglas.put("5", "Transact.");

        HashMap<String, String> hmDescFCOMPL = new HashMap<String, String>();
        hmDescFCOMPL.put("", "");
        hmDescFCOMPL.put("1", "PLUSGRADE");
        hmDescFCOMPL.put("2", "LIGAS");
        hmDescFCOMPL.put("3", "TABLET");
        hmDescFCOMPL.put("4", "BPO");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");
        //loadPX269SQP00833
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TDOC.trim());
            cstmt01.setString(3, filter.SDATE.trim());
            cstmt01.setString(4, filter.SCOUNTRY.trim());
            cstmt01.setString(5, filter.SPNR.trim());
            cstmt01.setString(6, filter.SCURRENCY.trim());
            cstmt01.setString(7, filter.SCARCOD.trim());
            cstmt01.setString(8, filter.SCARDN.trim());
            cstmt01.setString(9, filter.SAUTHOC.trim());
            cstmt01.setString(10, filter.SAGENT.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.SAGENT = rs01.getString("SAGENT");
                objRtn.DESAGENT = objRtn.SAGENT + " - " + rs01.getString("DESAGENT");
                objRtn.SDATE = rs01.getString("SDATE");
                objRtn.TDOC = rs01.getString("TDOC");
                if (rs01.getString("TDOC").trim().equals("R")) {
                    objRtn.strPEM = "Refund";
                } else {
                    objRtn.strPEM = "Sales";
                }
                objRtn.STVAL = rs01.getString("STVAL");
                if (hmDescEstados.containsKey(rs01.getString("STVAL").trim())) {
                    objRtn.descSTVAL = hmDescEstados.get(rs01.getString("STVAL").trim()).toString();
                } else {
                    objRtn.descSTVAL = rs01.getString("STVAL").trim();
                }
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY");
                objRtn.DESC_SCOUNTRY = objRtn.SCOUNTRY + " - " + rs01.getString("DESC_SCOUNTRY");
                objRtn.SPNR = rs01.getString("SPNR");
                objRtn.SCARCOD = rs01.getString("SCARCOD");
                objRtn.SCARDN = rs01.getString("SCARDN");
                objRtn.SAUTHOC = rs01.getString("SAUTHOC");
                objRtn.FREGLA = rs01.getString("FREGLA");
                objRtn.MERCHNC = rs01.getString("MERCHNC");
                objRtn.PRDA = rs01.getString("PRDA");
                objRtn.PAYDATE = rs01.getString("PAYDATE");
                objRtn.DATEC = rs01.getString("DATEC");
                if (hmDescReglas.containsKey(rs01.getString("FREGLA").trim())) {
                    objRtn.descFREGLA = hmDescReglas.get(rs01.getString("FREGLA").trim()).toString();
                } else {
                    objRtn.descFREGLA = rs01.getString("FREGLA").trim();
                }

                objRtn.SVFOP = rs01.getDouble("SVFOP");
                objRtn.FAREO = rs01.getDouble("FAREO");
                objRtn.FAREC = rs01.getDouble("FAREC");
                //objRtn.DIFF_FARE = rs01.getDouble("FAREDIFFC"); //CAMBIO SOLICITADO PARA UTILIZAR CAMPO EN LA BD
                objRtn.DIFF_FARE = objRtn.FAREO - objRtn.FAREC;
                
                objRtn.COMMAMO = rs01.getDouble("COMMAMO");
                objRtn.COMMAMOC = rs01.getDouble("COMMAMOC");
                objRtn.DIFF_COMMAMO = rs01.getDouble("COMMDIFFC"); //CAMBIO SOLICITADO PARA UTILIZAR CAMPO EN LA BD
                
                objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                objRtn.CERROR = rs01.getString("CERROR").trim();
                objRtn.DES_CERROR = rs01.getString("DES_CERROR").trim();
                objRtn.CERROIN = rs01.getString("CERROIN").trim();
                objRtn.DES_CERROIN = rs01.getString("DES_CERROIN").trim();
                objRtn.QTYTKT = rs01.getInt("QTYTKT");
                
                objRtn.COMMFAREC = rs01.getDouble("COMMFAREC"); 
                objRtn.TOTAL_ADM = rs01.getDouble("ADMTOTAL"); 

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

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

        return objRtn;
    }

    public String loadPX269SQP00834(A2290Filter filter, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        Connection cnx = null;

        if (filter.SCARCOD.trim().equals("AX")) {
            strCardn = filter.IN_CARDN1 + "*****" + filter.IN_CARDN2;
        } else {
            strCardn = filter.IN_CARDN1 + "******" + filter.IN_CARDN2;
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary()
                + ".SQP00834(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "U");
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.origSDATE.trim());
            cstmt.setString(4, filter.origSCOUNTRY.trim());
            cstmt.setString(5, filter.origTDOC.trim());
            cstmt.setString(6, filter.origCODEBANK.trim());
            cstmt.setString(7, filter.origSCARCOD.trim());
            cstmt.setString(8, filter.origSCARDN.trim());
            cstmt.setString(9, filter.origSAUTHOC.trim());
            cstmt.setDouble(10, filter.origSVFOP);
            cstmt.setString(11, filter.origSCURRENCY.trim());
            cstmt.setString(12, filter.origSEQNUM.trim());
            cstmt.setString(13, filter.TDOC.trim());
            cstmt.setString(14, filter.SCOUNTRY.trim());
            cstmt.setString(15, filter.strTRNXCODE.trim());
            cstmt.setString(16, filter.FTE.trim());
            cstmt.setString(17, filter.strNUMREF.trim());
            cstmt.setString(18, filter.MERCHN.trim());
            cstmt.setString(19, strCardn);
            cstmt.setString(20, filter.SCARCOD.trim());
            cstmt.setString(21, filter.TIPOTAR.trim());
            cstmt.setString(22, filter.CBANK.trim());
            cstmt.setString(23, filter.STVAL.trim());
            cstmt.setString(24, filter.BSTVAL.trim());
            cstmt.setString(25, filter.CREJEC.trim());
            cstmt.setString(26, filter.SAUTHOC.trim());
            cstmt.setDouble(27, filter.SVFOP);
            cstmt.setString(28, filter.SCURRENCY.trim());
            cstmt.setString(29, filter.strPEM.trim());
            cstmt.setString(30, filter.SAGENT.trim());
            cstmt.setString(31, filter.SDATE.trim());
            cstmt.setString(32, filter.SFLOAD.trim());
            cstmt.setString(33, filter.SDATEL.trim());
            cstmt.setString(34, filter.TDATE.trim());
            cstmt.setString(35, filter.DATEF.trim());
            cstmt.setString(36, filter.strSORIG.trim());
            cstmt.setString(37, filter.SEQNUM.trim());
            cstmt.setString(38, filter.BDATEP.trim());
            cstmt.setString(39, filter.BAID.trim());
            cstmt.setLong(40, filter.lngQTYTKT);
            cstmt.setString(41, filter.FLOADE.trim());
            cstmt.setString(42, filter.LDATEE.trim());
            cstmt.setString(43, filter.STATUSC.trim());
            cstmt.setString(44, filter.DATEC.trim());
            cstmt.setString(45, filter.DATET.trim());
            cstmt.setString(46, filter.STATT.trim());
            cstmt.setString(47, filter.FADYEN.trim());
            cstmt.setString(48, user.getUserInfo().USR);
            cstmt.setString(49, Functions.getFechaActual());
            cstmt.setString(50, Functions.getHoraActual());
            cstmt.setString(51, filter.strComment.toUpperCase());
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

    public List<A2290Filter> loadPX269SQP00869(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0;
        String estado = "", strTitulo = "";
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");
        hmDescEstados.put("P", "Paying w/o Sales");
        hmDescEstados.put("C", "Clarifications");
        hmDescEstados.put("H", "Chargebacks");

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00869(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_BANK.trim());
            cstmt.setString(14, filter.IN_COUNTRY.trim());
            cstmt.setString(15, filter.IN_FTE.trim());
            cstmt.setString(16, filter.IN_ADYEN.trim());

            cstmt.setInt(17, filter.page.PAGNUM);
            cstmt.setInt(18, filter.page.PAGROW);
            cstmt.setInt(19, filter.page.TOTPAG);
            cstmt.setInt(20, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(17);
            filter.page.PAGROW = cstmt.getInt(18);
            filter.page.TOTPAG = cstmt.getInt(19);
            filter.page.TOTROW = cstmt.getInt(20);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    beanTkt.SCARCOD = rst.getString("CARD").trim();
                    /*if (hmDescCard.containsKey(rst.getString("CARD").trim().toUpperCase())) {
                     beanTkt.strDescCard = hmDescCard.get(rst.getString("CARD").trim()).toString();
                     }*/
                    beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAME").trim();
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();
                    beanTkt.SORIG = rst.getString("SORIG").trim();

                    if (hmDescOrigen.containsKey(rst.getString("SORIG").trim())) {
                        beanTkt.strSORIG = hmDescOrigen.get(rst.getString("SORIG").trim());
                    } else {
                        beanTkt.strSORIG = rst.getString("SORIG").trim();
                    }

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblSVFOP;

                    if (!filter.IN_BSTVAL.trim().equals("")) {
                        estado = hmDescEstados.get(beanTkt.IN_BSTVAL).toString();
                    }

                    if (filter.IN_STVAL.trim().equals("1")) {
                        estado = "Match";
                    } else if (filter.IN_STVAL.trim().equals("2")) {
                        estado = "Settlement w/o Paying";
                    } else if (filter.IN_STVAL.trim().equals("3")) {
                        estado = "Paying w/o Settlement";
                    } else if (filter.IN_STVAL.trim().equals("4")) {
                        estado = "Match with Difference";
                    } else if (filter.IN_STVAL.trim().equals("5")) {
                        estado = "Match Manual";
                    }

                    if (filter.strFecFiltro.trim().equals("BDATEP")) {
                        strTitulo = "Conciliaton Date : ";
                    } else if (filter.IN_TDOC.trim().equals("R")) {
                        strTitulo = "Refund Date : ";
                    } else {
                        strTitulo = "Sales Date : ";
                    }
                    strTitulo += beanTkt.strFormatDate + " *** " + estado + " ***";
                    beanTkt.strTitulo = strTitulo;

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

    public List<A2290Filter> loadPX269SQP00869_TV(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0;
        String estado = "", strTitulo = "";

        //Sales Reconciliation
        String tipFecha = "Sales";
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        //Sales Reconciliation

        /*HashMap<String, String> hmDescEstados = new HashMap<String, String>();
         hmDescEstados.put("1", "Accepted");
         hmDescEstados.put("2", "Rejected");
         hmDescEstados.put("3", "Suspect");
         hmDescEstados.put("P", "Paying w/o Sales");
         hmDescEstados.put("C", "Clarifications");
         hmDescEstados.put("H", "Chargebacks");*/
        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00869_TV(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_BANK.trim());
            cstmt.setString(14, filter.IN_COUNTRY.trim());
            cstmt.setString(15, filter.IN_FTE.trim());
            cstmt.setString(16, filter.IN_ADYEN.trim());
            cstmt.setString(17, filter.IN_CERROR.trim());

            cstmt.setInt(18, filter.page.PAGNUM);
            cstmt.setInt(19, filter.page.PAGROW);
            cstmt.setInt(20, filter.page.TOTPAG);
            cstmt.setInt(21, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(18);
            filter.page.PAGROW = cstmt.getInt(19);
            filter.page.TOTPAG = cstmt.getInt(20);
            filter.page.TOTROW = cstmt.getInt(21);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.CERROR = filter.CERROR.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    if (rst.getString("COUNTRY").trim().isEmpty()) {
                        beanTkt.SCOUNTRY = "**";
                        beanTkt.strDescCountry = "(Sales without ACCB)";
                    } else {
                        beanTkt.SCOUNTRY = rst.getString("COUNTRY").trim();
                        /*if (hmPaises.containsKey(rst.getString("COUNTRY").trim().toUpperCase())) {
                         beanTkt.strDescCountry = hmPaises.get(rst.getString("COUNTRY").trim()).toString();
                         }*/
                        beanTkt.strDescCountry = rst.getString("NAME").trim();
                    }
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();
                    /*if (hmCurr.containsKey(rst.getString("CURRENCY").trim().toUpperCase())) {
                     beanTkt.strMoneda = hmCurr.get(rst.getString("CURRENCY").trim()).toString();
                     } else {
                     beanTkt.strMoneda = rst.getString("CURRENCY").trim();
                     }*/
                    if (rst.getString("MONEDA").trim().length() > 3) {
                        beanTkt.strMoneda = rst.getString("MONEDA").trim().substring(3);
                    } else {
                        beanTkt.strMoneda = rst.getString("MONEDA").trim();
                    }

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    //beanTkt.AVFOP = rst.getDouble("AVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;

                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    beanTkt.strTitulo += beanTkt.strFormatDate + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";

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

    public List<A2290Filter> loadPX269SQP03983(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0;
        String estado = "", strTitulo = "";

        //Sales Reconciliation
        String tipFecha = "Sales";
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        //Sales Reconciliation

        /*HashMap<String, String> hmDescEstados = new HashMap<String, String>();
         hmDescEstados.put("1", "Accepted");
         hmDescEstados.put("2", "Rejected");
         hmDescEstados.put("3", "Suspect");
         hmDescEstados.put("P", "Paying w/o Sales");
         hmDescEstados.put("C", "Clarifications");
         hmDescEstados.put("H", "Chargebacks");*/
        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03983(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_BANK.trim());
            cstmt.setString(14, filter.IN_COUNTRY.trim());
            cstmt.setString(15, filter.IN_FTE.trim());
            cstmt.setString(16, filter.IN_ADYEN.trim());
            cstmt.setString(17, filter.IN_CERROR.trim());

            cstmt.setInt(18, filter.page.PAGNUM);
            cstmt.setInt(19, filter.page.PAGROW);
            cstmt.setInt(20, filter.page.TOTPAG);
            cstmt.setInt(21, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(18);
            filter.page.PAGROW = cstmt.getInt(19);
            filter.page.TOTPAG = cstmt.getInt(20);
            filter.page.TOTROW = cstmt.getInt(21);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.strMoneda = filter.strMoneda.trim();
                    beanTkt.CERROR = filter.CERROR.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    if (rst.getString("CARD").trim().isEmpty()) {
                        beanTkt.SCARCOD = "**";
                        beanTkt.strDescCard = "(Sales without ACCB)";
                    } else {
                        beanTkt.SCARCOD = rst.getString("CARD").trim();
                        /*if (hmDescCard.containsKey(rst.getString("CARD").trim().toUpperCase())) {
                         beanTkt.strDescCard = hmDescCard.get(rst.getString("CARD").trim()).toString();
                         }*/
                        beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                    }
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblSVFOP;

                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    if (beanTkt.IN_SDATE.trim().length() == 8) {
                        beanTkt.strTitulo += beanTkt.IN_SDATE + " - Country : " + beanTkt.strDescCountry + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
                    } else {
                        beanTkt.strTitulo += beanTkt.strFormatDate + " - Country : " + beanTkt.strDescCountry + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
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

    public List<A2290Filter> loadPX269SQP03984(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0;
        String estado = "", strTitulo = "";

        //Sales Reconciliation
        String tipFecha = "Sales";
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        //Sales Reconciliation

        /*HashMap<String, String> hmDescEstados = new HashMap<String, String>();
         hmDescEstados.put("1", "Accepted");
         hmDescEstados.put("2", "Rejected");
         hmDescEstados.put("3", "Suspect");
         hmDescEstados.put("P", "Paying w/o Sales");
         hmDescEstados.put("C", "Clarifications");
         hmDescEstados.put("H", "Chargebacks");*/
        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03984(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_BANK.trim());
            cstmt.setString(14, filter.IN_COUNTRY.trim());
            cstmt.setString(15, filter.IN_FTE.trim());
            cstmt.setString(16, filter.IN_ADYEN.trim());
            cstmt.setString(17, filter.IN_CERROR.trim());

            cstmt.setInt(18, filter.page.PAGNUM);
            cstmt.setInt(19, filter.page.PAGROW);
            cstmt.setInt(20, filter.page.TOTPAG);
            cstmt.setInt(21, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(18);
            filter.page.PAGROW = cstmt.getInt(19);
            filter.page.TOTPAG = cstmt.getInt(20);
            filter.page.TOTROW = cstmt.getInt(21);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strMoneda = filter.strMoneda.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    beanTkt.CERROR = filter.CERROR.trim();
                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    //beanTkt.AVFOP = rst.getDouble("AVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblSVFOP;

                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    if (!beanTkt.SCARCOD.trim().isEmpty()) {
                        beanTkt.strTitulo += beanTkt.strFormatDate + " - Country : " + beanTkt.strDescCountry + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
                    } else {
                        beanTkt.strTitulo += beanTkt.strFormatDate + " - Country : " + beanTkt.strDescCountry
                                + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
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

    public List<A2290Filter> loadPX269SQP00869_TV_ERRORS(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        if (!filter.SCOUNTRY.trim().equals("")) {
            filter.IN_COUNTRY = filter.SCOUNTRY.trim();
        }
        if (!filter.SCARCOD.trim().equals("")) {
            filter.IN_CARDC = filter.SCARCOD.trim();
        }
        if (!filter.SDATE.trim().equals("")) {
            filter.IN_SDATE = filter.SDATE.trim();
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00869_TV_ERRORS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_BANK.trim());
            cstmt.setString(14, filter.IN_COUNTRY.trim());
            cstmt.setString(15, filter.IN_FTE.trim());
            cstmt.setString(16, filter.IN_ADYEN.trim());

            cstmt.execute();
            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();
                beanTkt.strFecFiltro = filter.strFecFiltro;
                beanTkt.IN_SDATE = filter.IN_SDATE;
                beanTkt.IN_TDOC = filter.IN_TDOC;
                beanTkt.IN_COUNTRY = filter.IN_COUNTRY;
                beanTkt.IN_PAYMENT = filter.IN_PAYMENT;
                beanTkt.IN_CARDN = filter.IN_CARDN;
                beanTkt.IN_CARDC = filter.IN_CARDC;
                beanTkt.SCURRENCY = filter.SCURRENCY;
                beanTkt.IN_TICKET = filter.IN_TICKET;
                beanTkt.IN_FTE = filter.IN_FTE;
                beanTkt.IN_AFTE = filter.IN_AFTE;
                beanTkt.IN_STVAL = filter.IN_STVAL;
                beanTkt.IN_MERCHN = filter.IN_MERCHN;
                beanTkt.SCOUNTRY = filter.IN_COUNTRY;
                beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR;
                beanTkt.CERROR = rst.getString("CERROR").trim();
                if (rst.getString("DESCERROR") != null && !rst.getString("DESCERROR").equals("")) {
                    beanTkt.strDescripcion = rst.getString("CERROR").trim() + " : " + rst.getString("DESCERROR").trim();
                } else {
                    beanTkt.strDescripcion = "(**) : (Empty)";
                }
                beanTkt.lngQACCB = rst.getLong("CANT");

                lstTkts.add(beanTkt);
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

    public List<A2290Filter> loadPX269SQP00870(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0;
        String strTitulo = "";

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00870(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.SORIG.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());
            cstmt.setString(13, filter.IN_AGENT.trim());
            cstmt.setString(14, filter.IN_BANK.trim());
            cstmt.setString(15, filter.SCOUNTRY.trim());
            cstmt.setString(16, filter.IN_FTE.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());

            cstmt.setInt(18, filter.page.PAGNUM);
            cstmt.setInt(19, filter.page.PAGROW);
            cstmt.setInt(20, filter.page.TOTPAG);
            cstmt.setInt(21, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(18);
            filter.page.PAGROW = cstmt.getInt(19);
            filter.page.TOTPAG = cstmt.getInt(20);
            filter.page.TOTROW = cstmt.getInt(21);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.strSORIG = filter.strSORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblSVFOP;
                    strTitulo = filter.strTitulo + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard;
                    if (!beanTkt.SCOUNTRY.trim().isEmpty()) {
                        strTitulo += " - Country : " + beanTkt.SCOUNTRY + " : " + filter.strDescCountry.trim();
                    }
                    beanTkt.strTitulo = strTitulo;

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

    public List<A2290Filter> loadPX269SQP00871(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0, lngQTYTKT = 0;
        double dblSVFOP = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");

        String estado = "", strTitulo = "";
        HashMap<String, String> hmDescEstadosTit = new HashMap<String, String>();
        hmDescEstadosTit.put("1", "Accepted");
        hmDescEstadosTit.put("2", "Rejected");
        hmDescEstadosTit.put("3", "Suspect");
        hmDescEstadosTit.put("P", "Paying w/o Sales");
        hmDescEstadosTit.put("C", "Clarifications");
        hmDescEstadosTit.put("H", "Chargebacks");

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00871(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.SORIG.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());
            cstmt.setString(13, filter.IN_AGENT.trim());
            cstmt.setString(14, filter.IN_BANK.trim());
            cstmt.setString(15, filter.SCOUNTRY.trim());
            cstmt.setString(16, filter.IN_FTE.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());

            cstmt.setInt(18, filter.page.PAGNUM);
            cstmt.setInt(19, filter.page.PAGROW);
            cstmt.setInt(20, filter.page.TOTPAG);
            cstmt.setInt(21, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(18);
            filter.page.PAGROW = cstmt.getInt(19);
            filter.page.TOTPAG = cstmt.getInt(20);
            filter.page.TOTROW = cstmt.getInt(21);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                lngQTYTKT += rst.getLong("QTYTKT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    beanTkt.FCONC = rst.getString("FCONC").trim();

                    if (beanTkt.IN_ADYEN.equals("Y") && (beanTkt.IN_STVAL.equals("2") || beanTkt.IN_STVAL.equals("3"))) {
                        beanTkt.strCampo = "assets/icons/16x16/Change.png";
                    } else {
                        beanTkt.strCampo = "assets/icons/16x16/1326498593_018.png";
                    }

                    beanTkt.FTE = rst.getString("FTE").trim();
                    if (rst.getString("FTE").trim().equals("S")) {
                        beanTkt.strDescFTE = "ASR";
                    } else if (rst.getString("FTE").trim().equals("A")) {
                        beanTkt.strDescFTE = "ARC";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        beanTkt.strDescFTE = "BSP";
                    } else {
                        beanTkt.strDescFTE = rst.getString("FTE").trim();
                    }
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    beanTkt.NUMREF = rst.getString("NUMREF").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.strDescripcion = rst.getString("DESCAGT").trim();
                    beanTkt.strTRNXCODE = rst.getString("TRNXCODE").trim();
                    beanTkt.strPEM = rst.getString("PEM").trim();
                    if (beanTkt.strPEM.trim().equals("01")) {
                        beanTkt.strPEM = "Manual";
                    } else if (beanTkt.strPEM.trim().equals("05")) {
                        beanTkt.strPEM = "Chip EMV";
                    } else if (beanTkt.strPEM.trim().equals("80")) {
                        beanTkt.strPEM = "Fallback";
                    } else if (beanTkt.strPEM.trim().equals("90")) {
                        beanTkt.strPEM = "Deslizada";
                    }
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.TDATE = rst.getString("TDATE").trim();
                    beanTkt.DATEF = rst.getString("DATEF").trim();
                    if (rst.getString("BDATEP").trim().length() == 6) {
                        beanTkt.BDATEP = Functions.FormatFecha(rst.getString("BDATEP").trim(), "yyMMdd", "yyyyMMdd");
                    } else {
                        beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    }
                    if (hmDescEstados.containsKey(rst.getString("BSTVAL").trim().toUpperCase())) {
                        beanTkt.BSTVAL = hmDescEstados.get(rst.getString("BSTVAL").trim()).toString();
                    } else {
                        beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    }
                    beanTkt.lngQTYTKT = rst.getLong("QTYTKT");

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.strNUMREF = rst.getString("NUMREF").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.strFLOAD = rst.getString("FLOAD").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    if (beanTkt.strFLOAD.trim().equals("M")) {
                        beanTkt.strFLOAD = "Manual";
                    }
                    beanTkt.SDATEL = rst.getString("LDATE").trim();
                    beanTkt.strSORIG = rst.getString("SORIG").trim();

                    if (hmDescOrigen.containsKey(rst.getString("SORIG").trim())) {
                        beanTkt.strSORIG = hmDescOrigen.get(rst.getString("SORIG").trim());
                    } else {
                        beanTkt.strSORIG = rst.getString("SORIG").trim();
                    }

                    beanTkt.BAID = rst.getString("BAID").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    if (rst.getString("FLAGC").trim().equals("C")) {
                        beanTkt.FLAGC = "Match";
                    }/* else {
                     beanTkt.FLAGC = "Paying w/o Sales";
                     }*/

                    //**********************************************************
                    if (!filter.IN_BSTVAL.trim().equals("")) {
                        estado = hmDescEstadosTit.get(beanTkt.IN_BSTVAL).toString();
                    }

                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    if (!rst.getString("DATEC").trim().equals("")) {
                        beanTkt.strBankDeposit = rst.getString("DATEC").trim();
                    } else if (!beanTkt.BDATEP.trim().isEmpty()) {
                        beanTkt.strBankDeposit = String.valueOf(Functions.diferenciaDiasEntreSistema(beanTkt.BDATEP)) + " days";
                    }

                    if (filter.IN_STVAL.trim().equals("1")) {
                        estado = "Match";
                    } else if (filter.IN_STVAL.trim().equals("2")) {
                        estado = "Settlement w/o Paying";
                    } else if (filter.IN_STVAL.trim().equals("3")) {
                        estado = "Paying w/o Settlement";
                    } else if (filter.IN_STVAL.trim().equals("4")) {
                        estado = "Match with Differences";
                    } else if (filter.IN_STVAL.trim().equals("5")) {
                        estado = "Match Manual";
                    }

                    if (filter.strFecFiltro.trim().equals("BDATEP")) {
                        strTitulo = "Conciliaton Date : ";
                    } else if (filter.IN_TDOC.trim().equals("R")) {
                        strTitulo = "Refund Date : ";
                    } else {
                        strTitulo = "Sales Date : ";
                    }
                    strTitulo += beanTkt.SDATE + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " *** " + estado + " ***";
                    if (!beanTkt.SCOUNTRY.trim().isEmpty()) {
                        strTitulo += " - Country : " + beanTkt.SCOUNTRY + " : " + filter.strDescCountry.trim();
                    }
                    beanTkt.strTitulo = strTitulo;

                    beanTkt.FAREO = rst.getDouble("FAREO");
                    beanTkt.FAREC = rst.getDouble("FAREC");
                    beanTkt.DIFF_FARE = beanTkt.FAREC - beanTkt.FAREO;

                    beanTkt.COMMAMO = rst.getDouble("COMMAMO");
                    beanTkt.COMMAMOC = rst.getDouble("COMMAMOC");
                    beanTkt.DIFF_COMMAMO = beanTkt.COMMAMOC - beanTkt.COMMAMO;

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.lngTotQTYTKT = lngQTYTKT;
                    beanTkt.dblTotSVFOP = dblSVFOP;
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

    public HashMap loadPX269SQP02478(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        List<A2290Filter> lstTkts2 = new ArrayList<A2290Filter>(0);
        HashMap hm = new HashMap();
        A2290Filter beanTkt;
        long lngTotCant = 0, lngQTYTKT = 0;
        double dblSVFOP = 0;
        String estado = "", strTitulo = "", tabla1 = "A720", tabla2 = "A1531";

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "";

        if (filter.IN_TDOC.trim().equals("R")) {
            tabla1 = "A713";
            tabla2 = "A1731";
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02479(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        } else {
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02478(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        }

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.SORIG.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());
            cstmt.setString(13, filter.IN_AGENT.trim());
            cstmt.setString(14, filter.IN_BANK.trim());
            cstmt.setString(15, filter.SCOUNTRY.trim());
            cstmt.setString(16, filter.IN_FTE.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());
            cstmt.setString(18, filter.IN_AGENTA1531.trim());
            cstmt.setString(19, filter.IN_SDATE1531.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                dblSVFOP = rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    beanTkt.NUMREF = rst.getString("NUMREF").trim();

                    beanTkt.FTE = rst.getString("FTE").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.DATEF = rst.getString("DATEF").trim();
                    if (rst.getString("FTE").trim().equals("S")) {
                        beanTkt.strDescFTE = "ASR";
                    } else if (rst.getString("FTE").trim().equals("A")) {
                        beanTkt.strDescFTE = "ARC";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        beanTkt.strDescFTE = "BSP";
                    } else {
                        beanTkt.strDescFTE = rst.getString("FTE").trim();
                    }
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.strSORIG = rst.getString("SORIG").trim();

                    if (hmDescOrigen.containsKey(rst.getString("SORIG").trim())) {
                        beanTkt.strSORIG = hmDescOrigen.get(rst.getString("SORIG").trim());
                    } else {
                        beanTkt.strSORIG = rst.getString("SORIG").trim();
                    }
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();

                    if (filter.strFecFiltro.trim().equals("BDATEP")) {
                        strTitulo = "Conciliaton Date : ";
                    } else if (filter.IN_TDOC.trim().equals("R")) {
                        strTitulo = "Refund Date : ";
                    } else {
                        strTitulo = "Sales Date : ";
                    }
                    strTitulo += beanTkt.SDATE + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " *** " + estado + " ***";
                    if (!beanTkt.SCOUNTRY.trim().isEmpty()) {
                        strTitulo += " - Country : " + beanTkt.SCOUNTRY + " : " + filter.strDescCountry.trim();
                    }
                    beanTkt.strTitulo = strTitulo;

                    beanTkt.dblTotSVFOP = dblSVFOP;

                    lstTkts.add(beanTkt);
                }

                rst.close();

                hm.put("lista1", lstTkts);

                int cont = 0;
                if (cstmt.getMoreResults()) {
                    rst = cstmt.getResultSet();

                    while (rst.next()) {

                        beanTkt = new A2290Filter();
                        beanTkt.RN = cont++;
                        beanTkt.QTYTRAS = 99999;

                        beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                        beanTkt.strFormatDate = filter.strFormatDate.trim();
                        beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                        beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                        beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                        beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                        beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                        beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                        beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                        beanTkt.SCARCOD = filter.SCARCOD.trim();
                        beanTkt.strDescCard = filter.strDescCard.trim();
                        beanTkt.SORIG = filter.SORIG.trim();
                        beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                        beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                        beanTkt.IN_BANK = filter.IN_BANK.trim();
                        beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                        beanTkt.strDescCountry = filter.strDescCountry.trim();
                        beanTkt.IN_FTE = filter.IN_FTE.trim();
                        beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                        beanTkt.NUMREF = "12";
                        beanTkt.CCIA = rst.getString(tabla1 + "CIA");
                        beanTkt.FORMA = rst.getString(tabla1 + "FORMA");
                        beanTkt.SERIE = rst.getString(tabla1 + "SERIE");
                        beanTkt.SEQ = rst.getString(tabla1 + "SEQ");
                        beanTkt.strTicket = beanTkt.CCIA + " " + beanTkt.FORMA + beanTkt.SERIE;
                        beanTkt.AAGENT = rst.getString(tabla1 + "AGENTE");
                        beanTkt.AFLOAD = rst.getString(tabla1 + "ORIG");

                        beanTkt.FCONC = rst.getString(tabla2 + "TFOP");
                        beanTkt.AMOUNTR = rst.getDouble(tabla2 + "VFOP");
                        beanTkt.CURRENPAY = rst.getString(tabla2 + "MFOP");
                        beanTkt.CMNO = rst.getString(tabla2 + "CFOP");
                        beanTkt.ACARCOD = rst.getString(tabla2 + "TTARJ");
                        beanTkt.REFERENNUM = rst.getString(tabla2 + "NREF");
                        beanTkt.STATT = rst.getString(tabla1 + "PNR");

                        lstTkts2.add(beanTkt);
                    }
                    rst.close();

                    hm.put("lista2", lstTkts2);

                }

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

        return hm;
    }

    //Datos A2290
    public List<A2290Filter> loadPX269SQP03808(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);

        HashMap hm = new HashMap();
        A2290Filter beanTkt;
        long lngTotCant = 0, lngQTYTKT = 0;
        double dblSVFOP = 0;
        String estado = "", strTitulo = "", tabla1 = "A720", tabla2 = "A1531";

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "";

        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03808(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);
            cstmt.registerOutParameter(23, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.SORIG.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());
            cstmt.setString(13, filter.IN_AGENT.trim());
            cstmt.setString(14, filter.IN_BANK.trim());
            cstmt.setString(15, filter.SCOUNTRY.trim());
            cstmt.setString(16, filter.IN_FTE.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());
            cstmt.setString(18, filter.IN_AGENTA1531.trim());
            cstmt.setString(19, filter.IN_SDATE1531.trim());

            cstmt.setInt(20, filter.page.PAGNUM);
            cstmt.setInt(21, filter.page.PAGROW);
            cstmt.setInt(22, filter.page.TOTPAG);
            cstmt.setInt(23, filter.page.TOTROW);

            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(20);
            filter.page.PAGROW = cstmt.getInt(21);
            filter.page.TOTPAG = cstmt.getInt(22);
            filter.page.TOTROW = cstmt.getInt(23);

            while (rst.next()) {
                dblSVFOP = rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    beanTkt.RN = rst.getLong("RN");
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    beanTkt.NUMREF = rst.getString("NUMREF").trim();

                    beanTkt.FTE = rst.getString("FTE").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.DATEF = rst.getString("DATEF").trim();
                    if (rst.getString("FTE").trim().equals("S")) {
                        beanTkt.strDescFTE = "ASR";
                    } else if (rst.getString("FTE").trim().equals("A")) {
                        beanTkt.strDescFTE = "ARC";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        beanTkt.strDescFTE = "BSP";
                    } else {
                        beanTkt.strDescFTE = rst.getString("FTE").trim();
                    }
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.strSORIG = rst.getString("SORIG").trim();

                    if (hmDescOrigen.containsKey(rst.getString("SORIG").trim())) {
                        beanTkt.strSORIG = hmDescOrigen.get(rst.getString("SORIG").trim());
                    } else {
                        beanTkt.strSORIG = rst.getString("SORIG").trim();
                    }
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();

                    if (filter.strFecFiltro.trim().equals("BDATEP")) {
                        strTitulo = "Conciliaton Date : ";
                    } else if (filter.IN_TDOC.trim().equals("R")) {
                        strTitulo = "Refund Date : ";
                    } else {
                        strTitulo = "Sales Date : ";
                    }
                    strTitulo += beanTkt.SDATE + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " *** " + estado + " ***";
                    if (!beanTkt.SCOUNTRY.trim().isEmpty()) {
                        strTitulo += " - Country : " + beanTkt.SCOUNTRY + " : " + filter.strDescCountry.trim();
                    }
                    beanTkt.strTitulo = strTitulo;

                    beanTkt.dblTotSVFOP = dblSVFOP;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
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

    public List<A2290Filter> loadPX269SQP03808_S_R(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts2 = new ArrayList<A2290Filter>(0);
        HashMap hm = new HashMap();
        A2290Filter beanTkt;
        long lngTotCant = 0, lngQTYTKT = 0;
        double dblSVFOP = 0;
        String estado = "", strTitulo = "", tabla1 = "A720", tabla2 = "A1531";

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "";

        if (filter.IN_TDOC.trim().equals("R")) {
            tabla1 = "A713";
            tabla2 = "A1731";
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03810(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        } else {
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03809(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        }

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.SORIG.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());
            cstmt.setString(13, filter.IN_AGENT.trim());
            cstmt.setString(14, filter.IN_BANK.trim());
            cstmt.setString(15, filter.SCOUNTRY.trim());
            cstmt.setString(16, filter.IN_FTE.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());
            cstmt.setString(18, filter.IN_AGENTA1531.trim());
            cstmt.setString(19, filter.IN_SDATE1531.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();
            int cont = 0;
            while (rst.next()) {

                beanTkt = new A2290Filter();
                beanTkt.RN = cont++;
                beanTkt.QTYTRAS = 99999;

                beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                beanTkt.strFormatDate = filter.strFormatDate.trim();
                beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                beanTkt.SCARCOD = filter.SCARCOD.trim();
                beanTkt.strDescCard = filter.strDescCard.trim();
                beanTkt.SORIG = filter.SORIG.trim();
                beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                beanTkt.IN_BANK = filter.IN_BANK.trim();
                beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                beanTkt.strDescCountry = filter.strDescCountry.trim();
                beanTkt.IN_FTE = filter.IN_FTE.trim();
                beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                beanTkt.NUMREF = "12";
                beanTkt.CCIA = rst.getString(tabla1 + "CIA");
                beanTkt.FORMA = rst.getString(tabla1 + "FORMA");
                beanTkt.SERIE = rst.getString(tabla1 + "SERIE");
                beanTkt.SEQ = rst.getString(tabla1 + "SEQ");
                beanTkt.strTicket = beanTkt.CCIA + " " + beanTkt.FORMA + beanTkt.SERIE;
                beanTkt.AAGENT = rst.getString(tabla1 + "AGENTE");
                beanTkt.AFLOAD = rst.getString(tabla1 + "ORIG");

                beanTkt.FCONC = rst.getString(tabla2 + "TFOP");
                beanTkt.AMOUNTR = rst.getDouble(tabla2 + "VFOP");
                beanTkt.CURRENPAY = rst.getString(tabla2 + "MFOP");
                beanTkt.CMNO = rst.getString(tabla2 + "CFOP");
                beanTkt.ACARCOD = rst.getString(tabla2 + "TTARJ");
                beanTkt.REFERENNUM = rst.getString(tabla2 + "NREF");
                beanTkt.STATT = rst.getString(tabla1 + "PNR");

                lstTkts2.add(beanTkt);
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

        return lstTkts2;
    }

    /*
     public List<A2290Filter> loadPX269SQP02478(A2290Filter filter) throws SQLException, Exception {

     List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
     A2290Filter beanTkt;
     long lngTotCant = 0, lngQTYTKT = 0;
     double dblSVFOP = 0;

     CallableStatement cstmt = null;
     ResultSet rst = null;

     String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02478(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

     Connection cnx = null;
     try {
     cnx = session.getCNXIBMDB2().getIBMDB2Connection();
     cstmt = cnx.prepareCall(SQLCLL01);


     cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
     cstmt.setString(2, filter.strFecFiltro);
     cstmt.setString(3, filter.SDATE.trim());
     cstmt.setString(4, filter.IN_TDOC.trim());
     cstmt.setString(5, filter.IN_CARDN1.trim());
     cstmt.setString(6, filter.IN_CARDN2.trim());
     cstmt.setString(7, filter.SCARCOD.trim());
     cstmt.setString(8, filter.IN_BSTVAL.trim());
     cstmt.setString(9, filter.IN_STVAL.trim());
     cstmt.setString(10, filter.SCURRENCY.trim());
     cstmt.setString(11, filter.SORIG.trim());
     cstmt.setString(12, filter.IN_MERCHN.trim());
     cstmt.setString(13, filter.IN_AGENT.trim());
     cstmt.setString(14, filter.IN_BANK.trim());
     cstmt.setString(15, filter.SCOUNTRY.trim());
     cstmt.setString(16, filter.IN_FTE.trim());
     cstmt.setString(17, filter.IN_ADYEN.trim());
     cstmt.setString(18, filter.IN_AGENTA1531.trim());

     cstmt.execute();

     rst = cstmt.getResultSet();

     while (rst.next()) {

     beanTkt = new A2290Filter();
     beanTkt.strFecFiltro = filter.strFecFiltro.trim();
     beanTkt.strFormatDate = filter.strFormatDate.trim();
     beanTkt.IN_SDATE = filter.IN_SDATE.trim();
     beanTkt.IN_TDOC = filter.IN_TDOC.trim();
     beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
     beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
     beanTkt.IN_CARDC = filter.IN_CARDC.trim();
     beanTkt.IN_STVAL = filter.IN_STVAL.trim();
     beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
     beanTkt.SCARCOD = filter.SCARCOD.trim();
     beanTkt.strDescCard = filter.strDescCard.trim();
     beanTkt.SORIG = filter.SORIG.trim();
     beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
     beanTkt.IN_AGENT = filter.IN_AGENT.trim();
     beanTkt.IN_BANK = filter.IN_BANK.trim();
     beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
     beanTkt.strDescCountry = filter.strDescCountry.trim();
     beanTkt.IN_FTE = filter.IN_FTE.trim();
     beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

     beanTkt.CCIA = rst.getString("A720CIA");
     beanTkt.FORMA = rst.getString("A720FORMA");
     beanTkt.SERIE = rst.getString("A720SERIE");
     beanTkt.strTicket= beanTkt.CCIA + " " + beanTkt.FORMA + beanTkt.SERIE;
     beanTkt.AAGENT = rst.getString("A720AGENTE");

     beanTkt.FCONC = rst.getString("A1531TFOP");
     beanTkt.AMOUNTR = rst.getDouble("A1531VFOP");
     beanTkt.CURRENPAY = rst.getString("A1531MFOP");
     beanTkt.CMNO = rst.getString("A1531CFOP");
     beanTkt.ACARCOD = rst.getString("A1531TTARJ");
     beanTkt.REFERENNUM = rst.getString("A1531NREF");

     lstTkts.add(beanTkt);
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
     }*/
    public String loadPX269SQP01950(A2290Filter filter) throws SQLException, Exception {

        //Obtiene la lista de Tickets (A2290) tomando como base el registro del A2291
        //List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        //A2290Filter beanTkt;
        String strMsj = "";
        //HashMap hmResult = new HashMap();

        CallableStatement cstmt = null;
        //ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01950(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE.trim());
            cstmt.setString(3, filter.TDOC.trim());
            cstmt.setString(4, filter.SCARCOD.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.MERCHN.trim());
            cstmt.setString(8, filter.SAUTHOC.trim());
            cstmt.setString(9, filter.BAID.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setDouble(11, filter.SVFOP);
            cstmt.setString(12, filter.strNUMREF.trim());
            cstmt.setString(13, filter.SAGENT.trim());
            cstmt.setInt(14, 0);
            cstmt.setString(15, "");

            cstmt.execute();

            filter.lngQTYTKT = cstmt.getInt(14);
            strMsj = cstmt.getString(15);

            /*if (strMsj.trim().isEmpty()) {
                
             rst = cstmt.getResultSet();

             while (rst.next()) {

             beanTkt = new A2290Filter();
             beanTkt.CCIA = rst.getString("CCIA").trim();
             beanTkt.FORMA = rst.getString("FORMA").trim();
             beanTkt.SERIE = rst.getString("SERIE").trim();
             beanTkt.SEQ = rst.getString("SEQ").trim();
             beanTkt.STVAL = rst.getString("STVAL").trim();
             beanTkt.TDOC = rst.getString("TDOC").trim();
             beanTkt.FTE = rst.getString("FTE").trim();
             beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
             beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
             beanTkt.SVFOP = rst.getDouble("SVFOP");
             beanTkt.SCARDN = rst.getString("SCARDN").trim();
             beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
             beanTkt.SPNR = rst.getString("SPNR").trim();
             beanTkt.ACARCOD = rst.getString("ACARCOD").trim();
             beanTkt.AVFOP = rst.getDouble("AVFOP");
             beanTkt.ACARDN = rst.getString("ACARDN").trim();
             beanTkt.AAUTHOC = rst.getString("AAUTHOC").trim();
             beanTkt.APNR = rst.getString("APNR").trim();
             beanTkt.SDATE = rst.getString("SDATE").trim();
             beanTkt.MERCHN = rst.getString("MERCHN").trim();
             beanTkt.BAID = rst.getString("BAID").trim();

             lstData.add(beanTkt);
             }
             rst.close();
             }
            
             hmResult.put("MSJ", strMsj);
             hmResult.put("LISTA", lstData);*/
        } catch (Exception e) {
            e.printStackTrace();
            strMsj = "Error : " + e.getMessage();
        } finally {
            /*if (rst != null) {
             try {
             rst.close();
             } catch (SQLException e) {
             logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
             }
             }*/
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

    public List<A2290Filter> loadPX269SQP02193(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = null;
        List<A2290Filter> lstLista = new ArrayList<A2290Filter>();

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Settlement w/o Paying");
        hmDescEstados.put("3", "Paying w/o Settlement");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02193(?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.strTRNXCODE.trim());
            cstmt.setString(4, filter.strNUMREF.trim());
            cstmt.setString(5, filter.SCARDN.trim());
            cstmt.setString(6, filter.SAUTHOC.trim());
            cstmt.setString(7, filter.BAID.trim());
            cstmt.setString(8, filter.SDATE.trim());
            cstmt.setString(9, filter.CODEBANK.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {

                beanTkt = new A2290Filter();
                beanTkt.SORIG = "BANK";
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                beanTkt.MERCHN = rst.getString("MERCHN").trim();
                beanTkt.strTRNXCODE = rst.getString("TRNXCODE").trim();
                beanTkt.strNUMREF = rst.getString("NUMREF").trim();
                beanTkt.BAID = rst.getString("BAID").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                lstLista.add(beanTkt);

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                if (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.SORIG = "SALES";
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    beanTkt.BAID = rst.getString("BAID").trim();
                    lstLista.add(beanTkt);

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

        return lstLista;
    }

    public String loadPX263SQP02194(A2290Filter filter, UserView user, String accion) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "";

        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02194(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(23, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.origSDATE.trim());
            cstmt.setString(3, filter.origSCARCOD.trim());
            cstmt.setString(4, filter.origSCARDN.trim());
            cstmt.setString(5, filter.origSAUTHOC.trim());
            cstmt.setString(6, filter.origSCURRENCY.trim());
            cstmt.setDouble(7, filter.origSVFOP);
            cstmt.setString(8, filter.SEQNUM.trim());
            cstmt.setString(9, filter.TDOC.trim());
            cstmt.setString(10, filter.strTRNXCODE.trim());
            cstmt.setString(11, filter.strNUMREF.trim());
            cstmt.setString(12, filter.STVAL.trim());

            cstmt.setString(13, filter.SDATE.trim());
            cstmt.setString(14, filter.SCARCOD.trim());
            cstmt.setString(15, filter.SCARDN.trim());
            cstmt.setString(16, filter.SAUTHOC.trim());
            cstmt.setString(17, filter.SCURRENCY.trim());
            cstmt.setDouble(18, filter.SVFOP);
            cstmt.setString(19, user.getUserInfo().USR);
            cstmt.setString(20, Functions.getFechaActual());
            cstmt.setString(21, Functions.getHoraActual());
            cstmt.setString(22, filter.strComment);
            cstmt.setString(23, "");
            cstmt.execute();

            strMsj = cstmt.getString(23);

            if (strMsj.trim().equals("")) {
                strMsj = "The ticket was modified successfully.";
            }

        } catch (Exception e) {
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

    public List<A2290Filter> loadPX269SQP02368(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0;
        String estado = "", strTitulo = "";

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02368(?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE.trim());
            cstmt.setString(3, filter.IN_TDOC.trim());
            cstmt.setString(4, filter.IN_CARDN1.trim());
            cstmt.setString(5, filter.IN_CARDN2.trim());
            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.SCARCOD = rst.getString("CARD").trim();
                    beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblSVFOP;

                    estado = "Paying w/o Settlement";

                    if (filter.IN_TDOC.trim().equals("R")) {
                        strTitulo = "Refund Date : ";
                    } else {
                        strTitulo = "Sales Date : ";
                    }
                    strTitulo += beanTkt.strFormatDate + " *** " + estado + " ***";
                    beanTkt.strTitulo = strTitulo;

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

    public List<A2290Filter> loadPX269SQP02369(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double dblSVFOP = 0, dblFIRST = 0, dblSUBSEQ = 0;

        String estado = "", strTitulo = "";

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02369(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE.trim());
            cstmt.setString(3, filter.IN_TDOC.trim());
            cstmt.setString(4, filter.IN_CARDN1.trim());
            cstmt.setString(5, filter.IN_CARDN2.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());

            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            while (rst.next()) {
                dblSVFOP += rst.getDouble("SVFOP");
                dblFIRST += rst.getDouble("FIRSTINSAM");
                dblSUBSEQ += rst.getDouble("SUBSQINAM");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.SDATE = rst.getString("CHARGEDT").trim();
                    beanTkt.SEREFNO = rst.getString("SEREFNO").trim();
                    beanTkt.CHARGEDT = rst.getString("CHARGEDT").trim();
                    beanTkt.strCHARGEDT = Functions.getMonthConvert(rst.getString("CHARGEDT").trim());
                    beanTkt.SETTLNUMBE = rst.getString("NMERCHN").trim();
                    beanTkt.NUMREF = rst.getString("REFERENNUM");
                    beanTkt.SCARDN = rst.getString("CMNO").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("CMNO").trim(), "");
                    beanTkt.SAUTHOC = rst.getString("AUTHCD").trim();
                    beanTkt.BDATEP = rst.getString("SETTLDATE");
                    beanTkt.SETTLDATE = rst.getString("SETTLDATE");
                    beanTkt.strSETTLDATE = Functions.getMonthConvert(rst.getString("SETTLDATE").trim());
                    beanTkt.strPEM = rst.getString("SETTLNUMBE");
                    beanTkt.SORIG = rst.getString("DIFF");
                    beanTkt.SCURRENCY = rst.getString("CURRENPAY").trim();
                    beanTkt.SVFOP = rst.getDouble("TOTALCHRG");
                    beanTkt.AMOUNTR = rst.getDouble("FIRSTINSAM");
                    beanTkt.AMOUNTS = rst.getDouble("SUBSQINAM");
                    beanTkt.FTE = rst.getString("INSTLCOUNT");

                    estado = "Paying w/o Settlement";

                    if (filter.IN_TDOC.trim().equals("R")) {
                        strTitulo = "Refund Date : ";
                    } else {
                        strTitulo = "Sales Date : ";
                    }
                    strTitulo += beanTkt.SDATE + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " *** " + estado + " ***";
                    beanTkt.strTitulo = strTitulo;

                    beanTkt.dblTotSVFOP = dblSVFOP;
                    beanTkt.dblTotAMOUNTR = dblFIRST;
                    beanTkt.dblTotAMOUNT = dblSUBSEQ;
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

    public String loadPX269SQP02488(A2290Filter filter, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "An error was ocurred.", strCardn = "";
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary()
                + ".SQP02488(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(21, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE.trim());
            cstmt.setString(3, filter.SCOUNTRY.trim());
            cstmt.setString(4, filter.TDOC.trim());
            cstmt.setString(5, filter.CODEBANK.trim());
            cstmt.setString(6, filter.SCARCOD.trim());
            cstmt.setString(7, filter.SCARDN.trim());
            cstmt.setString(8, filter.SAUTHOC.trim());
            cstmt.setDouble(9, filter.SVFOP);
            cstmt.setString(10, filter.SEQNUM.trim());
            cstmt.setString(11, filter.NUMREF.trim());
            cstmt.setString(12, filter.MERCHN.trim());
            cstmt.setString(13, filter.FTE.trim());
            cstmt.setString(14, filter.SCURRENCY.trim());
            cstmt.setString(15, filter.SPNR.trim());
            cstmt.setString(16, filter.STVAL.trim());
            cstmt.setString(17, filter.DATEF.trim());
            cstmt.setString(18, filter.strCampo.trim());
            cstmt.setString(19, filter.strTCOLLECT.trim());
            cstmt.setString(20, user.getUserInfo().USR);

            cstmt.setString(21, "");
            cstmt.execute();

            strMsj = cstmt.getString(21);

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

    public HashMap<String, List<A2309AFilter>> loadPX269SQP03940(A2309AFilter filter) throws SQLException, Exception {

        HashMap<String, List<A2309AFilter>> hmResultado = new HashMap<String, List<A2309AFilter>>();
        List<A2309AFilter> lst = new ArrayList<A2309AFilter>(0);
        List<A2309AFilter> lst_settlement_1 = new ArrayList<A2309AFilter>(0);
        List<A2309AFilter> lst_settlement_2 = new ArrayList<A2309AFilter>(0);
        A2309AFilter bean;
        A2309AFilter beanSet1 = new A2309AFilter();
        A2309AFilter beanSet2;
        String lista_batchs = "";
        int row_count = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03940(?,?,?)}";
        String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP03940_TV_REG_P(?,?)}";
        String SQLCLL03 = "{CALL " + session.getMainLibrary() + ".SQP03940_TV_REG_P_INFO(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE.trim());
            cstmt.setString(3, filter.IN_EPAAMEDATA.trim());
            //cstmt.setString(4, filter.IN_MERCHN.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                bean = new A2309AFilter();

                bean.CCUST = rst.getString("CCUST").trim();
                bean.PRDA = rst.getString("PRDA").trim();
                bean.EPAAMEDATA = rst.getString("EPAAMEDATA").trim();
                bean.MERCHN = rst.getString("MERCHN").trim();
                bean.SETTLD = rst.getString("SETTLD").trim();
                bean.NBATCH = rst.getString("NBATCH").trim();
                lista_batchs = lista_batchs + "'" + rst.getString("NBATCH").trim() + "',";
                bean.TREGI = rst.getString("TREGI");
                bean.SDATE = rst.getString("SDATE").trim();
                bean.FLAG_CARD = rst.getInt("FLAG_CARD");
                bean.SCARDN = filter.IN_EPAAMEDATA.trim();

                /*bean.SCARCOD = filter.SCARCOD.trim();
                 bean.strDescCard = filter.strDescCard.trim();
                 bean.strFecFiltro = filter.strFecFiltro.trim();
                 bean.IN_TDOC = filter.IN_TDOC.trim();*/
                bean.strTitulo = filter.strTitulo;

                lst.add(bean);
            }
            rst.close();

            beanSet1.FTE_PREV = filter.FTE_PREV.trim();
            beanSet1.SCARCOD_PREV = filter.SCARCOD_PREV.trim();
            beanSet1.SCARDN_PREV = filter.SCARDN_PREV.trim();
            beanSet1.SEQNUM_PREV = filter.SEQNUM_PREV.trim();
            beanSet1.SORIG_PREV = filter.SORIG_PREV.trim();
            beanSet1.MERCHN_PREV = filter.MERCHN_PREV.trim();
            beanSet1.SAUTHOC_PREV = filter.SAUTHOC_PREV.trim();
            beanSet1.SCURRENCY_PREV = filter.SCURRENCY_PREV.trim();
            beanSet1.SVFOP_PREV = filter.SVFOP_PREV.trim();
            beanSet1.TYPE = "Settlement";

            lst_settlement_1.add(beanSet1);

            hmResultado.put("BATCH", lst);
            hmResultado.put("SETTLEMENT_1", lst_settlement_1);

            //Vamos al A2309C a buscar si existen registros P en los Batchs
            if (lista_batchs.length() > 0) {
                lista_batchs = lista_batchs.substring(0, lista_batchs.length() - 1);

                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt = cnx.prepareCall(SQLCLL02);
                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt.setString(2, lista_batchs);
                cstmt.execute();

                rst = cstmt.getResultSet();

                while (rst.next()) {
                    row_count++;
                }

                if (row_count > 0) {
                    cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                    cstmt = cnx.prepareCall(SQLCLL03);
                    cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    cstmt.setString(2, filter.IN_SDATE.trim());
                    cstmt.setString(3, filter.IN_EPAAMEDATA.trim());
                    cstmt.execute();

                    rst = cstmt.getResultSet();

                    while (rst.next()) {
                        beanSet2 = new A2309AFilter();

                        beanSet2.FTE_PREV = filter.FTE_PREV.trim();
                        beanSet2.SCARCOD_PREV = filter.SCARCOD_PREV.trim();
                        beanSet2.SEQNUM_PREV = filter.SEQNUM_PREV.trim();
                        beanSet2.SORIG_PREV = filter.SORIG_PREV.trim();
                        beanSet2.MERCHN_PREV = filter.MERCHN_PREV.trim();

                        beanSet2.SCARDN_PREV = rst.getString("CMNO").trim();
                        beanSet2.SAUTHOC_PREV = rst.getString("AUTHCD").trim();
                        beanSet2.SCURRENCY_PREV = rst.getString("CURRENPAY").trim();
                        beanSet2.SVFOP_PREV = rst.getString("TOTALCHRG").trim();
                        beanSet2.TYPE = "Liquidación";

                        lst_settlement_1.add(beanSet2);
                    }
                }
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

        return hmResultado;
    }

    public List<A2309AFilter> loadPX269SQP03940_TV(A2309AFilter filter) throws SQLException, Exception {

        List<A2309AFilter> lst = new ArrayList<A2309AFilter>(0);
        A2309AFilter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03940_TV(?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_EPAAMEDATA.trim());
            cstmt.setString(3, filter.IN_PRDA.trim());
            cstmt.setString(4, filter.IN_SETTLD.trim());
            cstmt.setString(5, filter.IN_NBATCH.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                bean = new A2309AFilter();

                bean.CCUST = rst.getString("CCUST").trim();
                bean.PRDA = rst.getString("PRDA").trim();
                bean.EPAAMEDATA = rst.getString("EPAAMEDATA").trim();
                bean.MERCHN = rst.getString("MERCHN").trim();
                bean.SETTLD = rst.getString("SETTLD").trim();
                bean.NBATCH = rst.getString("NBATCH").trim();
                bean.TREGI = rst.getString("TREGI");
                bean.SDATE = rst.getString("SDATE").trim();
                bean.FLAG_CARD = rst.getInt("FLAG_CARD");

                bean.strTitulo = filter.strTitulo;

                lst.add(bean);
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

        return lst;
    }

    public HashMap<String, List<A2290Filter>> loadPX263SQP03989(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        List<A2290Filter> lstError = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        long lngTotCant = 0;
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03989(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_BANK.trim());
            cstmt.setString(14, filter.IN_COUNTRY.trim());
            cstmt.setString(15, filter.IN_FTE.trim());
            cstmt.setString(16, filter.IN_ADYEN.trim());
            cstmt.setString(17, filter.IN_CERROR.trim());

            cstmt.setInt(18, filter.page.PAGNUM);
            cstmt.setInt(19, filter.page.PAGROW);
            cstmt.setInt(20, filter.page.TOTPAG);
            cstmt.setInt(21, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(18);
            filter.page.PAGROW = cstmt.getInt(19);
            filter.page.TOTPAG = cstmt.getInt(20);
            filter.page.TOTROW = cstmt.getInt(21);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblTotSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    //PRESENTACION SEGUN ESTADO
                    //MATCH CON DIFERENCIAS
                    //REGISTRO CON DATOS DE LA VENTA =======================
                    beanTkt = new A2290Filter();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.strMoneda = filter.strMoneda.trim();
                    beanTkt.strTicket = "";//rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    if (rst.getString("TDOC").trim().equals("R")) {
                        beanTkt.strPEM = "REFUND";
                    } else {
                        beanTkt.strPEM = "SALES";
                    }
                    /*beanTkt.TRNCU = rst.getString("TRNCU").trim();
                     if (!rst.getString("TRNCU").trim().isEmpty()) {
                     beanTkt.strCampo = rst.getString("TRNCU").trim().substring(0, 1);
                     }*/
                    //beanTkt.CCIA = rst.getString("CCIA").trim();
                    //beanTkt.FORMA = rst.getString("FORMA").trim();
                    //beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    //beanTkt.SEQ = rst.getString("SEQ").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    }
                    /*if (hmDescError.containsKey(rst.getString("CERROR").trim().toUpperCase())) {
                     beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + hmDescError.get(rst.getString("CERROR").trim()).toString();
                     } else {
                     beanTkt.CERROR = rst.getString("CERROR").trim();
                     }*/
 /*if (!rst.getString("ERROR").trim().isEmpty()) {
                        beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                    } else {
                        beanTkt.CERROR = rst.getString("CERROR").trim();
                    }*/
                    //beanTkt.FTE = rst.getString("FTE").trim();
                    /*if (rst.getString("FTE").trim().equals("A")) {
                        beanTkt.strSORIG = "ARC";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        beanTkt.strSORIG = "BSP";
                    } else if (rst.getString("FTE").trim().equals("S")) {
                        beanTkt.strSORIG = "ASR";
                    }*/
                    //beanTkt.SDATEL = rst.getString("SDATEL").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    /*if (hmPaises.containsKey(beanTkt.SCOUNTRY.trim())) {
                     beanTkt.strDescCountry = hmPaises.get(beanTkt.SCOUNTRY.trim()).toString();
                     }*/
 /*if (!rst.getString("NCOUNTRYS").trim().isEmpty()) {
                        beanTkt.strDescCountry = rst.getString("NCOUNTRYS").trim();
                    }*/
                    //beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    //beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    /*if (hmDescCard.containsKey(rst.getString("SCARCOD").trim().toUpperCase())) {
                     beanTkt.strDescCard = hmDescCard.get(rst.getString("SCARCOD").trim()).toString();
                     }*/
 /*if (!rst.getString("NCARDS").trim().isEmpty()) {
                        beanTkt.strDescCard = rst.getString("NCARDS").trim();
                    }*/
                    //beanTkt.STCNTR = rst.getString("STCNTR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("SCARDN").trim());
                    //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    //beanTkt.SINVN = rst.getString("SINVN").trim();
                    //beanTkt.SIDATE = rst.getString("SIDATE").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();

                    beanTkt.TDATE = rst.getString("TDATE").trim();
                    beanTkt.DATEF = rst.getString("DATEF").trim();
                    beanTkt.SAUTHOC1 = rst.getString("SAUTHOC1").trim();
                    beanTkt.SCARCOD1 = rst.getString("SCARCOD1").trim();
                    beanTkt.NUMREF = rst.getString("NUMREF").trim();
                    //beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                    //beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    //beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    //beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
                    //Banks
                    //beanTkt.BDATEL = rst.getString("BDATEL").trim();
                    /*beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    if (beanTkt.BSTVAL.trim().equals("1")) {
                        beanTkt.BSTVAL = "Accepted";
                    } else if (beanTkt.BSTVAL.trim().equals("2")) {
                        beanTkt.BSTVAL = "Rejected";
                    } else if (beanTkt.BSTVAL.trim().equals("3")) {
                        beanTkt.BSTVAL = "Suspect";
                    }*/
                    //beanTkt.GRUPO = rst.getString("GRUPO").trim();
                    //beanTkt.IDFIL = rst.getString("IDFIL").trim();

                    /*beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    try {
                        if (!rst.getString("BDATEP").trim().equals("")) {
                            beanTkt.lngDays = Functions.diferenciaDias(beanTkt.SDATE, beanTkt.BDATEP);
                        } else if (!beanTkt.SDATE.trim().equals("")) {
                            beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.SDATE);
                        }
                    } catch (Exception e) {
                    }*/
                    //Armando Título del Detalle
                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : " + beanTkt.SDATE;
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : " + beanTkt.SDATE;
                    } else {
                        beanTkt.strTitulo = "Sales Date : " + beanTkt.SDATE;
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();

            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    //PRESENTACION SEGUN ERROR
                    beanTkt = new A2290Filter();
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    if (!rst.getString("ERROR").trim().isEmpty()) {
                        beanTkt.strDescripcion = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                    } else {
                        beanTkt.strDescripcion = rst.getString("CERROR").trim();
                    }
                    lstError.add(beanTkt);
                }
                rst.close();
            }

            hmResultado.put("TKT", lstTkts);
            hmResultado.put("ERROR", lstError);

        } catch (Exception e) {
            e.getMessage();
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

        return hmResultado;
    }

    public List<A2290Filter> loadPX269SQP00833_MDP_DETAIL(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_DETAIL(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();

                beanTkt.FDESGLOSE = "1";
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else {
                    beanTkt.descTDOC = "Sales";
                }
                beanTkt.A1531TTARJ = rst.getString("SCARCOD").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("SVFOP");
                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();

                lstData.add(beanTkt);
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

        return lstData;
    }

    public List<A2290Filter> loadPX269SQP00833_MDP_SCAN(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_SCAN(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TICKET.trim());
            cstmt.setString(3, filter.CARD1.trim());
            cstmt.setString(4, filter.CARD2.trim());
            cstmt.setString(5, filter.SAUTHOC.trim());
            cstmt.setString(6, filter.SDATE.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();

                beanTkt.FDESGLOSE = rst.getString("FDESGLOSE").trim(); //REVISAR
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else {
                    beanTkt.descTDOC = "Sales";
                }
                beanTkt.A1531TTARJ = rst.getString("SCARCOD").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("SVFOP");
                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();

                lstData.add(beanTkt);
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

        return lstData;
    }

    public List<A2290Filter> loadPX269SQP00833_MDP_SCAN_PENDING(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_SCAN_PENDING(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else {
                    beanTkt.descTDOC = "Sales";
                }
                beanTkt.A1531TTARJ = rst.getString("SCARCOD").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("SVFOP");
                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();

                lstData.add(beanTkt);
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

        return lstData;
    }
}
