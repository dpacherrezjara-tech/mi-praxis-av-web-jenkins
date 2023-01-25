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

import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.payments.LoadPayment02DAO.pasarGarbageCollector;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author 
 */
public class UnmatchedTransactionsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public UnmatchedTransactionsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public UnmatchedTransactionsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2290Filter> loadPX297SQP00940(A2290Filter filter, HashMap<String, String> hmDescError,
            HashMap<String, String> hmDescCard) throws SQLException, Exception{ 

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        //String strSCARF = "";
        double dblTotAVFOP = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("2", "Sales without ACCB");
        hmDescEstados.put("3", "ACCB without Sales");

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00940(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(3, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_COUNTRY.trim());
            cstmt.setString(6, filter.IN_CARDC.trim());
            cstmt.setString(7, filter.IN_TICKET.trim());
            cstmt.setString(8, filter.IN_CARDN.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.IN_MERCHN.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            while (rst.next()) {
                dblTotAVFOP = rst.getDouble("AMOUNTDOC");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.strTicket = rst.getString("DOCNUM").trim() + " - " + rst.getString("SEQNUMD").trim();
                    beanTkt.CCIA = rst.getString("DOCNUM").trim().substring(0, 3);
                    beanTkt.FORMA = rst.getString("DOCNUM").trim().trim().substring(3, 7);
                    beanTkt.SERIE = rst.getString("DOCNUM").trim().trim().substring(7);
                    beanTkt.TDOC = rst.getString("TTRAN").trim();
                    beanTkt.SEQ = rst.getString("SEQNUMD").trim();
                    beanTkt.STVAL = "ACCB without Sales";
                    beanTkt.SDATE = rst.getString("ISSUEDATE").trim();
                    beanTkt.SCOUNTRY = rst.getString("COUNTRSALE").trim();
                    beanTkt.SCARCOD = rst.getString("CREDCARDT").trim();
                    beanTkt.SCARDN = rst.getString("CREDCARDN").trim();
                    beanTkt.SVFOP = rst.getDouble("AMOUNTDOC");
                    beanTkt.SAGENT = rst.getString("STATNUM").trim();
                    beanTkt.SCURRENCY = rst.getString("DOCCURR").trim();
                    beanTkt.SAUTHOC = rst.getString("TRAHORICOD").trim();
                    beanTkt.SINVN = rst.getString("INVNUM").trim();
                    try {
                        beanTkt.SPNR = rst.getString("PNRL").trim().substring(0, 6);
                        beanTkt.SPNRSP = rst.getString("PNRL").trim().substring(6);
                    } catch (Exception e) {
                    }
                    if (hmDescCard.containsKey(beanTkt.SCARCOD.trim())) {
                        beanTkt.strDescCard = hmDescCard.get(beanTkt.SCARCOD.trim()).toString();
                    }
                    beanTkt.MERCHN = rst.getString("MERCHNUM").trim();
                    beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();

                    beanTkt.dblTotAVFOP = dblTotAVFOP;

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
    
    public List<A2290Filter> loadPX297SQP00891(A2290Filter filter, HashMap<String, String> hmDescError,
            HashMap<String, String> hmDescCard) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        //String strSCARF = "";
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("2", "Sales without ACCB");
        hmDescEstados.put("3", "ACCB without Sales");

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00891(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(3, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_COUNTRY.trim());
            cstmt.setString(6, filter.IN_PAYMENT.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_TICKET.trim());
            cstmt.setString(9, filter.IN_FTE.trim());
            cstmt.setString(10, filter.IN_CARDN.trim());
            cstmt.setString(11, filter.IN_STVAL.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            while (rst.next()) {
                dblTotSVFOP = rst.getDouble("SVFOP");
                dblTotAVFOP = rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.SEQ = rst.getString("SEQ").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    if (hmDescError.containsKey(rst.getString("CERROR").trim().toUpperCase())) {
                        beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + hmDescError.get(rst.getString("CERROR").trim()).toString();
                    } else {
                        beanTkt.CERROR = rst.getString("CERROR").trim();
                    }
                    if (rst.getString("STVAL").trim().equals("2")) {
                        //SALES
                        beanTkt.FTE = rst.getString("FTE").trim();
                        if (rst.getString("FTE").trim().equals("A")) {
                            beanTkt.strSORIG = "ARC";
                        } else if (rst.getString("FTE").trim().equals("B")) {
                            beanTkt.strSORIG = "BSP";
                        } else if (rst.getString("FTE").trim().equals("S")) {
                            beanTkt.strSORIG = "ASR";
                        }
                        beanTkt.SDATEL = rst.getString("SDATEL").trim();
                        beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                        beanTkt.SAGENT = rst.getString("SAGENT").trim();
                        beanTkt.SDATE = rst.getString("SDATE").trim();
                        beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                        beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                        beanTkt.STCNTR = rst.getString("STCNTR").trim();
                        beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                        beanTkt.SVFOP = rst.getDouble("SVFOP");
                        if (!rst.getString("STVAL").trim().equals("2")) {
                            beanTkt.SCARDN = rst.getString("ACARDN").trim();
                            beanTkt.strSCARDN = rst.getString("ACARDN").trim();
                        } else {
                            beanTkt.SCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                        }
                        beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                        beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("SINVN").trim();
                        beanTkt.SIDATE = rst.getString("SIDATE").trim();
                        beanTkt.SPNR = rst.getString("SPNR").trim();
                        beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                    } else {
                        //PARA AQUELLOS QUE SEAN ACCB SIN VENTA
                        beanTkt.FTE = rst.getString("AFTE").trim();
                        if (rst.getString("AFTE").trim().equals("B")) {
                            beanTkt.strSORIG = "Billed";
                        } else if (rst.getString("AFTE").trim().equals("N")) {
                            beanTkt.strSORIG = "Not Billed";
                        } else if (rst.getString("AFTE").trim().equals("L")) {
                            beanTkt.strSORIG = "Local";
                        }
                        beanTkt.SDATEL = rst.getString("ADATEL").trim();
                        beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                        beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                        beanTkt.SAGENT = rst.getString("AAGENT").trim();
                        beanTkt.SDATE = rst.getString("ADATE").trim();
                        beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                        beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                        beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                        beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                        beanTkt.SVFOP = rst.getDouble("AVFOP");
                        beanTkt.SCARDN = rst.getString("ACARDN").trim();
                        beanTkt.strSCARDN = rst.getString("ACARDN").trim();
                        beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                        beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("AINVN").trim();
                        beanTkt.SIDATE = rst.getString("AIDATE").trim();
                        beanTkt.SPNR = rst.getString("APNR").trim();
                        beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                    }
                    if (hmDescCard.containsKey(beanTkt.SCARCOD.trim())) {
                        beanTkt.strDescCard = hmDescCard.get(beanTkt.SCARCOD.trim()).toString();
                    }
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();

                    if (rst.getString("TKVOID").trim().equals("V")) {
                        beanTkt.strFlagStat = "Void";

                    } else if (rst.getString("FLAGC").trim().equals("C")) {
                        beanTkt.strFlagStat = "CNJ";
                    }
                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.dblTotAVFOP = dblTotAVFOP;

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

    public List<A2290Filter> loadPX297SQP00915(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        //String strSCARF = "";
        double dblTotSVFOP = 0;
        long lngQtyDoc = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("2", "Settlement Without Paying");
        hmDescEstados.put("3", "Paying Without Settlement");
        HashMap<String, String> hmDescBSTVAL = new HashMap<String, String>();
        hmDescBSTVAL.put("1", "Accepted");
        hmDescBSTVAL.put("2", "Rejected");
        hmDescBSTVAL.put("3", "Suspect");
        
        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00915(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(3, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN.trim());
            cstmt.setString(6, filter.IN_CARDC.trim());
            cstmt.setString(7, filter.IN_STVAL.trim());
            cstmt.setString(8, filter.IN_MERCHN.trim());

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            while (rst.next()) {
                dblTotSVFOP = rst.getDouble("SVFOP");
                lngQtyDoc = rst.getLong("QTYDOC");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
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
                    if (hmDescBSTVAL.containsKey(rst.getString("BSTVAL").trim().toUpperCase())) {
                        beanTkt.BSTVAL = hmDescBSTVAL.get(rst.getString("BSTVAL").trim()).toString();
                    } else {
                        beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    }
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.strNUMREF = rst.getString("NUMREF").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.strFLOAD = rst.getString("FLOAD").trim();
                    if (beanTkt.strFLOAD.trim().equals("M")) {
                        beanTkt.strFLOAD = "Manual";
                    }
                    beanTkt.SDATEL = rst.getString("LDATE").trim();
                    beanTkt.strSORIG = rst.getString("SORIG").trim();
                    
                    if(hmDescOrigen.containsKey(rst.getString("SORIG").trim())){
                        beanTkt.strSORIG = hmDescOrigen.get(rst.getString("SORIG").trim());
                    }else{
                        beanTkt.strSORIG = rst.getString("SORIG").trim();
                    }
                    
                    beanTkt.BAID = rst.getString("BAID").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("FLAGC").trim().equals("C")) {
                        beanTkt.FLAGC = "Match";
                    } else {
                        beanTkt.FLAGC = "Paying w/o Sales";
                    }

                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.lngTotQTYDOC = lngQtyDoc;

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

    public List<A2290Filter> loadPX297SQP00966(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblDAMOUNT = 0, dblDAMOUNTR = 0;
        long lngTotQTYTRA = 0, lngTotQTYDOC = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("2", "Bank Without Payment");
        hmDescEstados.put("3", "Payment Without Bank");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00966(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(3, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(4, filter.IN_TDOC);
            cstmt.setString(5, filter.IN_MERCHN.trim());
            cstmt.setString(6, filter.IN_STVAL.trim());

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
                lngTotCant += rst.getLong("CANT");
                dblDAMOUNT += rst.getDouble("DAMOUNT");
                dblDAMOUNTR += rst.getDouble("DAMOUNTR");
                lngTotQTYTRA += rst.getLong("QTYTRA");
                lngTotQTYDOC += rst.getLong("QTYDOC");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strYearFrom = filter.strYearFrom.trim();
                    beanTkt.strMonthFrom = filter.strMonthFrom.trim();
                    beanTkt.strYearTo = filter.strYearTo.trim();
                    beanTkt.strMonthTo = filter.strMonthTo.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_PHASE = filter.IN_PHASE.trim();

                    beanTkt.SDATE = rst.getString("SDATE").trim();//Fecha de Venta
                    //beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.BAID = rst.getString("EAID").trim();
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();//Fecha de Arch. Liquidacion
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    beanTkt.dblAMOUNT = rst.getDouble("DAMOUNT");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.BDATEL = rst.getString("DATEP").trim();//Fecha de Deposito
                    beanTkt.CBANK = rst.getString("CBANK").trim();
                    beanTkt.MERCHNR = rst.getString("MERCHNR").trim();
                    if (rst.getString("NMERCHNR") != null && !rst.getString("NMERCHNR").trim().equals("-")) {
                        beanTkt.strDescMerchnR = rst.getString("NMERCHNR").trim();
                    }
                    beanTkt.dblAMOUNTR = rst.getDouble("DAMOUNTR");
                    beanTkt.ACURRENCY = rst.getString("CURRENCYR").trim();
                    beanTkt.strDescripcion = rst.getString("DESCRI").trim();
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.STATUSC = rst.getString("STATUSC").trim();
                    beanTkt.lngQTEF = rst.getLong("QTYTRA");
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");

                    beanTkt.lngTotQTYDOC = lngTotCant;
                    beanTkt.dblTotAMOUNT = dblDAMOUNT;
                    beanTkt.dblTotAMOUNTR = dblDAMOUNTR;
                    beanTkt.lngTotQTEF = lngTotQTYTRA;
                    beanTkt.lngTotQTYDOC = lngTotQTYDOC;

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
    
    public List<A2290Filter> loadPX297SQP01321(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        //String strSCARF = "";
        double dblTotSVFOP = 0, dblTotAVFOP = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01321(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(3, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_COUNTRY.trim());
            cstmt.setString(6, filter.IN_PAYMENT.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_TICKET.trim());
            cstmt.setString(9, filter.IN_FTE.trim());
            cstmt.setString(10, filter.IN_CARDN.trim());
            cstmt.setString(11, filter.IN_STVAL.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            while (rst.next()) {
                dblTotSVFOP = rst.getDouble("SVFOP");
                dblTotAVFOP = rst.getDouble("A1531VFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA");
                    beanTkt.FORMA = rst.getString("FORMA");
                    beanTkt.SERIE = rst.getString("SERIE");
                    beanTkt.strTicket = beanTkt.CCIA + " " + beanTkt.FORMA + beanTkt.SERIE;
                    beanTkt.STVAL = rst.getString("STVAL");
                    beanTkt.strDescripcion = rst.getString("DES_STVAL");
                    //beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SCARDN = rst.getString("CARDN");

                    beanTkt.GRUPO = rst.getString("GRUPO");
                    beanTkt.AFLOAD = rst.getString("DES_STPRO");

                    beanTkt.AVFOP = rst.getDouble("A1531VFOP");
                    beanTkt.AAGENT = rst.getString("A1531TFOP");
                    beanTkt.AAUTHOC = rst.getString("A1531TTARJ");
                    beanTkt.AFTE = rst.getString("A1531CAPL");

                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.dblTotAVFOP = dblTotAVFOP;

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

    public A2290Filter loadPX297SQP00893(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();
        String strSCARF = "";
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales without ACCB");
        hmDescEstados.put("3", "ACCB without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        if (filter.STVAL.trim().length() > 1) {
            if (filter.STVAL.trim().equals("Sales without ACCB")) {
                filter.STVAL = "2";
            } else if (filter.STVAL.trim().equals("ACCB without Sales")) {
                filter.STVAL = "3";
            }
        }

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00893(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CCIA.trim());
            cstmt.setString(3, filter.FORMA.trim());
            cstmt.setString(4, filter.SERIE.trim());
            cstmt.setString(5, filter.TDOC.trim());
            cstmt.setString(6, filter.APAYMENT.trim());
            cstmt.setString(7, filter.STVAL.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt.strFormatDate = filter.strFormatDate.trim();
                beanTkt.strSCARF = strSCARF;
                beanTkt.strDescCountry = filter.strDescCountry.trim();

                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();

                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.FTE = rst.getString("FTE").trim();
                beanTkt.DATEC = rst.getString("DATEC").trim();
                //SALES
                beanTkt.SDATEL = rst.getString("SDATEL").trim();
                beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.STCNTR = rst.getString("STCNTR").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("ACARDN").trim());
                beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SINVN = rst.getString("SINVN").trim();
                beanTkt.SIDATE = rst.getString("SIDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                //ACCB
                beanTkt.AFTE = rst.getString("AFTE").trim();
                beanTkt.ADATEL = rst.getString("ADATEL").trim();
                beanTkt.AFLOAD = rst.getString("AFLOAD").trim();
                beanTkt.ACOUNTRY = rst.getString("ACOUNTRY").trim();
                beanTkt.AAGENT = rst.getString("AAGENT").trim();
                beanTkt.ADATE = rst.getString("ADATE").trim();
                beanTkt.APAYMENT = rst.getString("APAYMENT").trim();
                beanTkt.ACARCOD = rst.getString("ACARCOD").trim();
                beanTkt.ATCNTR = rst.getString("ATCNTR").trim();
                beanTkt.AVFOP = rst.getDouble("AVFOP");
                beanTkt.ACURRENCY = rst.getString("ACURRENCY").trim();
                beanTkt.ACARDN = rst.getString("ACARDN").trim();
                beanTkt.ADATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                beanTkt.AAUTHOC = rst.getString("AAUTHOC").trim();
                beanTkt.AINVN = rst.getString("AINVN").trim();
                beanTkt.AIDATE = rst.getString("AIDATE").trim();
                beanTkt.APNR = rst.getString("APNR").trim();
                beanTkt.APNRSP = rst.getString("APNRSP").trim();
                beanTkt.MERCHN = rst.getString("MERCHN").trim();
                beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
                //TEF
                beanTkt.TDATE = rst.getString("TDATE").trim();
                beanTkt.DATEF = rst.getString("DATEF").trim();
                //Banks
                beanTkt.BDATEL = rst.getString("BDATEL").trim();
                beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                beanTkt.BDATEP = rst.getString("BDATEP").trim();
                beanTkt.BSTVALP = rst.getString("BSTVALP").trim();
                beanTkt.GRUPO = rst.getString("GRUPO").trim();
                beanTkt.IDFIL = rst.getString("IDFIL").trim();
                if (rst.getString("MENSA") != null) {
                    beanTkt.strComment = rst.getString("MENSA").trim();
                }

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



}
