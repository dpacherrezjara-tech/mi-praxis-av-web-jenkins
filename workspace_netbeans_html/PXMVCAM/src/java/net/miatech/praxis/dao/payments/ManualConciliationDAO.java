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
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.spring.INF020;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jsolano
 */
public class ManualConciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ManualConciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ManualConciliationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
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
        hmDescReglas.put("1", "By Credit Card");
        hmDescReglas.put("2", "By Authoc");
        hmDescReglas.put("3", "By PNR");
        hmDescReglas.put("4", "By Terminal Zeros");
        hmDescReglas.put("*", "Intercompany");
        hmDescReglas.put("A", "By Spreadsheet");
        hmDescReglas.put("B", "By IATA/Sdate");
        hmDescReglas.put("C", "By WEB-OPER");

        HashMap<String, String> hmDescFCOMPL = new HashMap<String, String>();
        hmDescFCOMPL.put("", "");
        hmDescFCOMPL.put("1", "PLUSGRADE");
        hmDescFCOMPL.put("2", "LIGAS");
        hmDescFCOMPL.put("3", "TABLET");
        hmDescFCOMPL.put("4", "BPO");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("D", "Debits");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");

        HashMap<String, String> hmDescDebitType = new HashMap<String, String>();
        hmDescDebitType.put("RFND", "Reembolsos");
        hmDescDebitType.put("RFND-DNG", "Reembolso Denegado");
        hmDescDebitType.put("ACRED", "Acreditacion");
        hmDescDebitType.put("CBCK-ID", "Chargeback con ID");
        hmDescDebitType.put("CBCK-IDM", "Chargeback Media");
        hmDescDebitType.put("DB-TKT", "Debito con Tkt");
        hmDescDebitType.put("DOBLE-DB", "Doble Debito");
        hmDescDebitType.put("ANL-NS", "Anulacion no Satisfactoria");
        hmDescDebitType.put("R-CBCK", "Reversal Chargeback");
        hmDescDebitType.put("NO-IDN", "Debito No Identificado");

        //SE DEJA TAMPA COMO '134'
        HashMap<String, String> hmCCUST = new HashMap<String, String>();
        hmCCUST.put("TA01", "202");
//        hmCCUST.put("QT01", "729");
        hmCCUST.put("QT01", "134");
        hmCCUST.put("AV01", "134");
        hmCCUST.put("A500", "134");
        hmCCUST.put("AB01", "134");
        hmCCUST.put("LR01", "133");
        hmCCUST.put("2K01", "547");

        //loadPX269SQP00833
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_1(?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(11, filter.TRANC.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.IN_TKT_ASIG = filter.IN_TKT_ASIG;
                objRtn.TQUERY = filter.TQUERY.trim();
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.SOCIETY = rs01.getString("SOCIETY");
                objRtn.SOCIETYL = rs01.getString("SOCIETYL");

                if (hmCCUST.containsKey(objRtn.SOCIETY)) {
                    objRtn.CCUSTCC = hmCCUST.get(objRtn.SOCIETY);
                } else {
                    objRtn.CCUSTCC = objRtn.CCUST;
                }

                objRtn.SAGENT = rs01.getString("SAGENT");
                objRtn.DESAGENT = objRtn.SAGENT + " - " + rs01.getString("DESAGENT");
                objRtn.SDATE = rs01.getString("SDATE");
                objRtn.TDOC = rs01.getString("TDOC");
                if (rs01.getString("TDOC").trim().equals("R")) {
                    objRtn.strPEM = "Refund";
                } else if (rs01.getString("TDOC").trim().equals("D")) {
                    objRtn.strPEM = "Debits";
                } else if (rs01.getString("TDOC").trim().equals("A")) {
                    objRtn.strPEM = "Acredit";
                } else if (rs01.getString("TDOC").trim().equals("C")) {
                    objRtn.strPEM = "Chargebak";
                } else {
                    objRtn.strPEM = "Sales";
                }
//                objRtn.descTDOC = hmDescTDOC.get(rs01.getString("TDOC").trim());
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
                objRtn.CODEBANK = rs01.getString("CODEBANK");
                objRtn.SCARDN = rs01.getString("SCARDN");
                objRtn.SAUTHOC = rs01.getString("SAUTHOC");
                objRtn.FREGLA = rs01.getString("FREGLA");
                objRtn.MERCHNC = rs01.getString("MERCHNC");
                objRtn.PRDA = rs01.getString("PRDA");
                objRtn.SDATEC = rs01.getString("SDATEC");
                objRtn.PAYDATE = rs01.getString("PAYDATE");
                objRtn.DATEC = rs01.getString("DATEC");
                objRtn.FSELEC = rs01.getString("FSELEC");
                objRtn.STVALS = rs01.getString("STVALS");
                objRtn.DEBTYPE = rs01.getString("DEBTYPE");
                objRtn.CHARNBR = rs01.getString("CHARNBR");
                objRtn.descDEBTYPE = rs01.getString("strDEBTYPE").trim();
                if (hmDescReglas.containsKey(rs01.getString("FREGLA").trim())) {
                    objRtn.descFREGLA = hmDescReglas.get(rs01.getString("FREGLA").trim()).toString();
                } else {
                    objRtn.descFREGLA = rs01.getString("FREGLA").trim();
                }
                objRtn.SVFOP = rs01.getDouble("SVFOP");
                objRtn.SVFOPC = rs01.getDouble("SVFOPC");
                objRtn.SVFOPD = rs01.getDouble("SVFOPD");
                objRtn.FAREO = rs01.getDouble("FAREO");
                objRtn.FAREC = rs01.getDouble("FAREC");
                objRtn.DIFF_FARE = rs01.getDouble("FAREDIFFC"); //CAMBIO SOLICITADO PARA UTILIZAR CAMPO EN LA BD
                //objRtn.DIFF_FARE = objRtn.FAREO - objRtn.FAREC;

                objRtn.COMMAMO = rs01.getDouble("COMMAMO");
                objRtn.COMMAMOC = rs01.getDouble("COMMAMOC");
                objRtn.DIFF_COMMAMO = rs01.getDouble("COMMDIFFC"); //CAMBIO SOLICITADO PARA UTILIZAR CAMPO EN LA BD

                objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                objRtn.CERROR = rs01.getString("CERROR").trim();
                objRtn.NEGOC = rs01.getString("NEGOC").trim();
                objRtn.descNEGOC = rs01.getString("DESCNEGOC").trim();
                objRtn.COREP = rs01.getString("COREP").trim();
                objRtn.desCOREP = rs01.getString("DESCCOREP").trim();
                objRtn.TERMI = rs01.getString("TERMI").trim();
                objRtn.descTERMI = rs01.getString("DESCTERMI").trim();
                objRtn.DES_CERROR = rs01.getString("DES_CERROR").trim();
                objRtn.CERROIN = rs01.getString("CERROIN").trim();
                objRtn.DES_CERROIN = rs01.getString("DES_CERROIN").trim();
                objRtn.ACCNUMA = rs01.getString("ACCNUMA").trim();
                objRtn.QTYTKT = rs01.getInt("QTYTKT");
                objRtn.QTYDOC = rs01.getInt("QTYDOC");

                objRtn.COMMFAREC = rs01.getDouble("COMMFAREC");
                objRtn.TOTAL_ADM = rs01.getDouble("ADMTOTAL");

                objRtn.BANDOC = rs01.getString("BANDOC");
                objRtn.DATEC = rs01.getString("DATEC").trim();
                objRtn.TRANC = rs01.getString("TRANC").trim();
                objRtn.DATECI = rs01.getString("DATECI").trim();
                objRtn.TRANCI = rs01.getString("TRANCI").trim();

                objRtn.IVA = rs01.getDouble("IVA");
                objRtn.PROPINA = rs01.getDouble("PROPINA");
                objRtn.COMISION = rs01.getDouble("COMISION");
                objRtn.BASEFUE = rs01.getDouble("BASEFUE");
                objRtn.RTEFUE = rs01.getDouble("RTEFUE");
                objRtn.RTEIVA = rs01.getDouble("RTEIVA");
                objRtn.BASICA = rs01.getDouble("BASICA");
                objRtn.RTEICA = rs01.getDouble("RTEICA");
                objRtn.NETO = rs01.getDouble("NETO");

                objRtn.IVAC = rs01.getDouble("IVAC");
                objRtn.PROPINAC = rs01.getDouble("PROPINAC");
                objRtn.COMISIOC = rs01.getDouble("COMISIOC");
                objRtn.BASEFUEC = rs01.getDouble("BASEFUEC");
                objRtn.RTEFUEC = rs01.getDouble("RTEFUEC");
                objRtn.RTEIVAC = rs01.getDouble("RTEIVAC");
                objRtn.BASICAC = rs01.getDouble("BASICAC");
                objRtn.RTEICAC = rs01.getDouble("RTEICAC");
                objRtn.NETOC = rs01.getDouble("NETOC");
                objRtn.STCON = rs01.getString("STCON").trim();
                if (hmDescSTCONL.containsKey(rs01.getString("STCON").trim())) {
                    objRtn.STCON = hmDescSTCONL.get(rs01.getString("STCON").trim()).toString();
                } else {
                    objRtn.STCON = rs01.getString("FREGLA").trim();
                }
                objRtn.FCONT = rs01.getString("FCONT").trim();

                objRtn.COREP = rs01.getString("COREP").trim();
                objRtn.CODPRO = rs01.getString("CODPRO").trim();
                objRtn.CCUSTPRO = rs01.getString("CCUSTPRO").trim();

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

    public String loadPX269SQP00834GRILL(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "";
        int count = 0;
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCF2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            for (int i = 0; i < filters.size(); i++) {
                cstmt = cnx.prepareCall(SQLCLL01);
                A2290Filter filter = filters.get(i);

                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt.setString(2, filter.RULE.trim());
                cstmt.setString(3, filter.TDOC.trim());
                cstmt.setString(4, filter.SDATE.trim());
                cstmt.setString(5, filter.PAYDATE.trim());
                cstmt.setString(6, filter.CODEBANK.trim());
                cstmt.setString(7, filter.MERCHNC.trim());
                cstmt.setString(8, filter.ACCNUMBER.trim());
                cstmt.setString(9, filter.TERMI.trim());
                cstmt.setString(10, filter.SAGENT.trim());
                cstmt.setString(11, filter.SCARCOD.trim());
                cstmt.setString(12, filter.SCARDN.trim());
                cstmt.setString(13, filter.SAUTHOC.trim());
                cstmt.setString(14, filter.SEQ.trim());
                cstmt.setString(15, filter.SCURRENCY.trim());
                cstmt.setDouble(16, filter.VFOP);
                cstmt.setString(17, filter.RQUERY.trim());
                cstmt.setString(18, filter.TQUERY.trim());
                cstmt.setString(19, user.getUserInfo().USR);
                cstmt.setString(20, Functions.getFechaActual());
                cstmt.setString(21, Functions.getHoraActual());
                cstmt.execute();
                cstmt.close();
                count++;
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    strMsj = "Successful," + count + " records have been reconciled.";

                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return strMsj;
    }

    public String loadPX269SQP00834ALL(A2290Filter filter, UserView user) throws SQLException, Exception {

        //REALIZA UN SELECT 
        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        lstTkts = this.loadPX269SQP00834SELECT(filter);

        //REALIZA UN INSERT 
        String proces = this.loadPX269SQP00834INSERT(lstTkts);

        //REALIZA CONCILIACION
        String strMsj = "";
        int count = 0;
        if (proces.equals("SUCCESSFUL")) {

            //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
            CallableStatement cstmt = null;
            Connection cnx = null;

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCF2ALL(?,?,?,?,?,?,?,?)}";

            try {
                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt = cnx.prepareCall(SQLCLL01);
                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt.setString(2, filter.CODRULE.trim()); 
                cstmt.setString(3, filter.RQUERY.trim());
                cstmt.setString(4, filter.TQUERY.trim());
                cstmt.setString(5, filter.TTABLE.trim());
                cstmt.setString(6, user.getUserInfo().USR);
                cstmt.setString(7, Functions.getFechaActual());
                cstmt.setString(8, Functions.getHoraActual());
                cstmt.execute();
                cstmt.close();
                count++;

            } catch (Exception e) {
                e.printStackTrace();
                strMsj = e.getMessage();
            } finally {
                if (cstmt != null) {
                    try {
                        cstmt.close();
                        strMsj = "Successful,All records have been reconciled.";

                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
                pasarGarbageCollector();
            }

        }

        return strMsj;

    }

    public List<A2290Filter> loadPX269SQP00834SELECT(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter row;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".REPF2SELEC(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA.trim());
            cstmt.setString(4, filter.strSQL.trim());
            cstmt.setString(5, filter.SCARDNCOR);
            cstmt.setString(6, filter.SAUTHOC);
            cstmt.setString(7, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(8, filter.SCARDN);
            cstmt.setString(9, filter.SCURRENCY);
            cstmt.setString(10, filter.RQUERY.trim());
            cstmt.setString(11, filter.TQUERY.trim());
            cstmt.setString(12, filter.TTABLE.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                // <editor-fold defaultstate="collapsed" desc="SELECT">
                row = new A2290Filter();
                row.ST_CCUST = rst.getString("CCUST").trim();
                row.ST_TDOC = rst.getString("TDOC").trim();
                row.ST_STVAL = rst.getString("STVAL").trim();
                row.ST_SCOUNTRY = rst.getString("SCOUNTRY").trim();
                row.ST_FTE = rst.getString("FTE").trim();
                row.ST_SDATE = rst.getString("SDATE").trim();
                row.ST_SAGENT = rst.getString("SAGENT").trim();
                row.ST_NEGOC = rst.getString("NEGOC").trim();
                row.ST_MERCHNC = rst.getString("MERCHNC").trim();
                row.ST_SUCMERCH = rst.getString("SUCMERCH").trim();
                row.ST_SPNR = rst.getString("SPNR").trim();
                row.ST_CODPRO = rst.getString("CODPRO").trim();
                row.ST_CCUSTPRO = rst.getString("CCUSTPRO").trim();
                row.ST_PRDA = rst.getString("PRDA").trim();
                row.ST_TRAN = rst.getString("TRAN").trim();
                row.ST_TDOCORG = rst.getString("TDOCORG").trim();
                row.ST_PAYDATE = rst.getString("PAYDATE").trim();
                row.ST_VALDATE = rst.getString("VALDATE").trim();
                row.ST_TIPOTAR = rst.getString("TIPOTAR").trim();
                row.ST_SCARCOD = rst.getString("SCARCOD").trim();
                row.ST_SCARDN = rst.getString("SCARDN").trim();
                row.ST_SCARDNCOR = rst.getString("SCARDNCOR").trim();
                row.ST_SAUTHOC = rst.getString("SAUTHOC").trim();
                row.ST_SDATEXP = rst.getString("SDATEXP").trim();
                row.ST_SOCIETY = rst.getString("SOCIETY").trim();
                row.ST_CODEBANK = rst.getString("CODEBANK").trim();
                row.ST_COREP = rst.getString("COREP").trim();
                row.ST_SOCIETYL = rst.getString("SOCIETYL").trim();
                row.ST_BANDOC = rst.getString("BANDOC").trim();
                row.ST_SEQ = rst.getString("SEQ").trim();
                row.ST_TERMI = rst.getString("TERMI").trim();
                row.ST_GENCON = rst.getString("GENCON").trim();
                row.ST_STCON = rst.getString("STCON").trim();
                row.ST_FCONT = rst.getString("FCONT").trim();
                row.ST_IDCONT = rst.getString("IDCONT").trim();
                row.ST_IDCDEB = rst.getString("IDCDEB").trim();
                row.ST_IDCADJ = rst.getString("IDCADJ").trim();
                row.ST_ACCNUMBER = rst.getString("ACCNUMBER").trim();
                row.ST_PERCONT = rst.getString("PERCONT").trim();
                row.ST_FDEBIT = rst.getString("FDEBIT").trim();
                row.ST_FAJUST = rst.getString("FAJUST").trim();
                row.ST_RED = rst.getString("RED").trim();
                row.ST_DATEF = rst.getString("DATEF").trim();
                row.ST_QTYTKT = rst.getString("QTYTKT").trim();
                row.ST_FREGLA = rst.getString("FREGLA").trim();
                row.ST_SCURRENCY = rst.getString("SCURRENCY").trim();
                row.ST_SVFOP = rst.getString("SVFOP").trim();
                row.ST_IVA = rst.getString("IVA").trim();
                row.ST_PROPINA = rst.getString("PROPINA").trim();
                row.ST_COMISION = rst.getString("COMISION").trim();
                row.ST_COMISTOTA = rst.getString("COMISTOTA").trim();
                row.ST_BASEFUE = rst.getString("BASEFUE").trim();
                row.ST_RTEFUE = rst.getString("RTEFUE").trim();
                row.ST_RTEIVA = rst.getString("RTEIVA").trim();
                row.ST_BASICA = rst.getString("BASICA").trim();
                row.ST_RTEICA = rst.getString("RTEICA").trim();
                row.ST_NETO = rst.getString("NETO").trim();
                row.ST_FAREO = rst.getString("FAREO").trim();
                row.ST_SVFOPC = rst.getString("SVFOPC").trim();
                row.ST_SVFOPD = rst.getString("SVFOPD").trim();
                row.ST_IVAC = rst.getString("IVAC").trim();
                row.ST_PROPINAC = rst.getString("PROPINAC").trim();
                row.ST_COMISIOC = rst.getString("COMISIOC").trim();
                row.ST_BASEFUEC = rst.getString("BASEFUEC").trim();
                row.ST_RTEFUEC = rst.getString("RTEFUEC").trim();
                row.ST_RTEIVAC = rst.getString("RTEIVAC").trim();
                row.ST_BASICAC = rst.getString("BASICAC").trim();
                row.ST_RTEICAC = rst.getString("RTEICAC").trim();
                row.ST_NETOC = rst.getString("NETOC").trim();
                row.ST_FAREC = rst.getString("FAREC").trim();
                row.ST_FAREDIFFC = rst.getString("FAREDIFFC").trim();
                row.ST_COMMFAREC = rst.getString("COMMFAREC").trim();
                row.ST_COMMDIFFC = rst.getString("COMMDIFFC").trim();
                row.ST_ADMTOTAL = rst.getString("ADMTOTAL").trim();
                row.ST_FLOAD = rst.getString("FLOAD").trim();
                row.ST_LDATE = rst.getString("LDATE").trim();
                row.ST_TDATE = rst.getString("TDATE").trim();
                row.ST_SORIG = rst.getString("SORIG").trim();
                row.ST_REASONREJ = rst.getString("REASONREJ").trim();
                row.ST_RECORDSTS = rst.getString("RECORDSTS").trim();
                row.ST_BSTVAL = rst.getString("BSTVAL").trim();
                row.ST_BDATEP = rst.getString("BDATEP").trim();
                row.ST_BAID = rst.getString("BAID").trim();
                row.ST_QTYDOC = rst.getString("QTYDOC").trim();
                row.ST_SDATE1 = rst.getString("SDATE1").trim();
                row.ST_SAUTHOC1 = rst.getString("SAUTHOC1").trim();
                row.ST_SCARCOD1 = rst.getString("SCARCOD1").trim();
                row.ST_FLOADE = rst.getString("FLOADE").trim();
                row.ST_LDATEE = rst.getString("LDATEE").trim();
                row.ST_RATECOM = rst.getString("RATECOM").trim();
                row.ST_COMISION1 = rst.getString("COMISION1").trim();
                row.ST_EMISOR = rst.getString("EMISOR").trim();
                row.ST_STATUSC = rst.getString("STATUSC").trim();
                row.ST_SDATEC = rst.getString("SDATEC").trim();
                row.ST_DEBTYPE = rst.getString("DEBTYPE").trim();
                row.ST_STVALS = rst.getString("STVALS").trim();
                row.ST_SDATES = rst.getString("SDATES").trim();
                row.ST_DATECS = rst.getString("DATECS").trim();
                row.ST_TRANCS = rst.getString("TRANCS").trim();
                row.ST_DATECI = rst.getString("DATECI").trim();
                row.ST_TRANCI = rst.getString("TRANCI").trim();
                row.ST_DATEC = rst.getString("DATEC").trim();
                row.ST_TRANC = rst.getString("TRANC").trim();
                row.ST_DATCO = rst.getString("DATCO").trim();
                row.ST_DATET = rst.getString("DATET").trim();
                row.ST_STATT = rst.getString("STATT").trim();
                row.ST_DATEL = rst.getString("DATEL").trim();
                row.ST_HORAL = rst.getString("HORAL").trim();
                row.ST_CCNCFT = rst.getString("CCNCFT").trim();
                row.ST_CCNTRN = rst.getString("CCNTRN").trim();
                row.ST_CERROIN = rst.getString("CERROIN").trim();
                row.ST_CERROR = rst.getString("CERROR").trim();
                row.ST_FSELEC = rst.getString("FSELEC").trim();
                row.ST_FECSELEC = rst.getString("FECSELEC").trim();
                row.ST_FUNDSTRGR = rst.getString("FUNDSTRGR").trim();
                row.ST_FUNDSTRGK = rst.getString("FUNDSTRGK").trim();
                row.ST_CHARNBR = rst.getString("CHARNBR").trim();
                row.ST_STVALCHG = rst.getString("STVALCHG").trim();
                row.ST_UAUDIT = rst.getString("UAUDIT").trim();
                row.ST_ORDERID = rst.getString("ORDERID").trim();
                row.ST_CCIA = rst.getString("CCIA").trim();
                row.ST_FORMA = rst.getString("FORMA").trim();
                row.ST_SERIE = rst.getString("SERIE").trim();
                row.ST_LIQUIDACIO = rst.getString("LIQUIDACIO").trim();
                row.ST_MONEDAPAGO = rst.getString("MONEDAPAGO").trim();
                row.ST_IMPORTEPAG = rst.getString("IMPORTEPAG").trim();
                row.ST_ACCNUMA = rst.getString("ACCNUMA").trim();
                row.ST_USCR = rst.getString("USCR").trim();
                row.ST_FECR = rst.getString("FECR").trim();
                row.ST_HOCR = rst.getString("HOCR").trim();
                row.ST_PGMCR = rst.getString("PGMCR").trim();
                row.ST_USUP = rst.getString("USUP").trim();
                row.ST_FEUP = rst.getString("FEUP").trim();
                row.ST_HOUP = rst.getString("HOUP").trim();
                row.ST_PGMUP = rst.getString("PGMUP").trim();
                lstTkts.add(row);
                // </editor-fold>

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

    public String loadPX269SQP00834INSERT(List<A2290Filter> listaData) throws SQLException, Exception {

        CallableStatement cstmt = null;
        ResultSet rst = null;
        String msg = "SUCCESSFUL";

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".REPF2INSERT("
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";

        Connection cnx = null;

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            for (int i = 0; i < listaData.size(); i++) {

                try {

                    // <editor-fold defaultstate="collapsed" desc="INSERT">
                    A2290Filter object = listaData.get(i);
                    cstmt.setString(1, object.ST_CCUST.trim());
                    cstmt.setString(2, object.ST_TDOC.trim());
                    cstmt.setString(3, object.ST_STVAL.trim());
                    cstmt.setString(4, object.ST_SCOUNTRY.trim());
                    cstmt.setString(5, object.ST_FTE.trim());
                    cstmt.setString(6, object.ST_SDATE.trim());
                    cstmt.setString(7, object.ST_SAGENT.trim());
                    cstmt.setString(8, object.ST_NEGOC.trim());
                    cstmt.setString(9, object.ST_MERCHNC.trim());
                    cstmt.setString(10, object.ST_SUCMERCH.trim());
                    cstmt.setString(11, object.ST_SPNR.trim());
                    cstmt.setString(12, object.ST_CODPRO.trim());
                    cstmt.setString(13, object.ST_CCUSTPRO.trim());
                    cstmt.setString(14, object.ST_PRDA.trim());
                    cstmt.setString(15, object.ST_TRAN.trim());
                    cstmt.setString(16, object.ST_TDOCORG.trim());
                    cstmt.setString(17, object.ST_PAYDATE.trim());
                    cstmt.setString(18, object.ST_VALDATE.trim());
                    cstmt.setString(19, object.ST_TIPOTAR.trim());
                    cstmt.setString(20, object.ST_SCARCOD.trim());
                    cstmt.setString(21, object.ST_SCARDN.trim());
                    cstmt.setString(22, object.ST_SCARDNCOR.trim());
                    cstmt.setString(23, object.ST_SAUTHOC.trim());
                    cstmt.setString(24, object.ST_SDATEXP.trim());
                    cstmt.setString(25, object.ST_SOCIETY.trim());
                    cstmt.setString(26, object.ST_CODEBANK.trim());
                    cstmt.setString(27, object.ST_COREP.trim());
                    cstmt.setString(28, object.ST_SOCIETYL.trim());
                    cstmt.setString(29, object.ST_BANDOC.trim());
                    cstmt.setString(30, object.ST_SEQ.trim());
                    cstmt.setString(31, object.ST_TERMI.trim());
                    cstmt.setString(32, object.ST_GENCON.trim());
                    cstmt.setString(33, object.ST_STCON.trim());
                    cstmt.setString(34, object.ST_FCONT.trim());
                    cstmt.setString(35, object.ST_IDCONT.trim());
                    cstmt.setString(36, object.ST_IDCDEB.trim());
                    cstmt.setString(37, object.ST_IDCADJ.trim());
                    cstmt.setString(38, object.ST_ACCNUMBER.trim());
                    cstmt.setString(39, object.ST_PERCONT.trim());
                    cstmt.setString(40, object.ST_FDEBIT.trim());
                    cstmt.setString(41, object.ST_FAJUST.trim());
                    cstmt.setString(42, object.ST_RED.trim());
                    cstmt.setString(43, object.ST_DATEF.trim());
                    cstmt.setString(44, object.ST_QTYTKT.trim());
                    cstmt.setString(45, object.ST_FREGLA.trim());
                    cstmt.setString(46, object.ST_SCURRENCY.trim());
                    cstmt.setString(47, object.ST_SVFOP.trim());
                    cstmt.setString(48, object.ST_IVA.trim());
                    cstmt.setString(49, object.ST_PROPINA.trim());
                    cstmt.setString(50, object.ST_COMISION.trim());
                    cstmt.setString(51, object.ST_COMISTOTA.trim());
                    cstmt.setString(52, object.ST_BASEFUE.trim());
                    cstmt.setString(53, object.ST_RTEFUE.trim());
                    cstmt.setString(54, object.ST_RTEIVA.trim());
                    cstmt.setString(55, object.ST_BASICA.trim());
                    cstmt.setString(56, object.ST_RTEICA.trim());
                    cstmt.setString(57, object.ST_NETO.trim());
                    cstmt.setString(58, object.ST_FAREO.trim());
                    cstmt.setString(59, object.ST_SVFOPC.trim());
                    cstmt.setString(60, object.ST_SVFOPD.trim());
                    cstmt.setString(61, object.ST_IVAC.trim());
                    cstmt.setString(62, object.ST_PROPINAC.trim());
                    cstmt.setString(63, object.ST_COMISIOC.trim());
                    cstmt.setString(64, object.ST_BASEFUEC.trim());
                    cstmt.setString(65, object.ST_RTEFUEC.trim());
                    cstmt.setString(66, object.ST_RTEIVAC.trim());
                    cstmt.setString(67, object.ST_BASICAC.trim());
                    cstmt.setString(68, object.ST_RTEICAC.trim());
                    cstmt.setString(69, object.ST_NETOC.trim());
                    cstmt.setString(70, object.ST_FAREC.trim());
                    cstmt.setString(71, object.ST_FAREDIFFC.trim());
                    cstmt.setString(72, object.ST_COMMFAREC.trim());
                    cstmt.setString(73, object.ST_COMMDIFFC.trim());
                    cstmt.setString(74, object.ST_ADMTOTAL.trim());
                    cstmt.setString(75, object.ST_FLOAD.trim());
                    cstmt.setString(76, object.ST_LDATE.trim());
                    cstmt.setString(77, object.ST_TDATE.trim());
                    cstmt.setString(78, object.ST_SORIG.trim());
                    cstmt.setString(79, object.ST_REASONREJ.trim());
                    cstmt.setString(80, object.ST_RECORDSTS.trim());
                    cstmt.setString(81, object.ST_BSTVAL.trim());
                    cstmt.setString(82, object.ST_BDATEP.trim());
                    cstmt.setString(83, object.ST_BAID.trim());
                    cstmt.setString(84, object.ST_QTYDOC.trim());
                    cstmt.setString(85, object.ST_SDATE1.trim());
                    cstmt.setString(86, object.ST_SAUTHOC1.trim());
                    cstmt.setString(87, object.ST_SCARCOD1.trim());
                    cstmt.setString(88, object.ST_FLOADE.trim());
                    cstmt.setString(89, object.ST_LDATEE.trim());
                    cstmt.setString(90, object.ST_RATECOM.trim());
                    cstmt.setString(91, object.ST_COMISION1.trim());
                    cstmt.setString(92, object.ST_EMISOR.trim());
                    cstmt.setString(93, object.ST_STATUSC.trim());
                    cstmt.setString(94, object.ST_SDATEC.trim());
                    cstmt.setString(95, object.ST_DEBTYPE.trim());
                    cstmt.setString(96, object.ST_STVALS.trim());
                    cstmt.setString(97, object.ST_SDATES.trim());
                    cstmt.setString(98, object.ST_DATECS.trim());
                    cstmt.setString(99, object.ST_TRANCS.trim());
                    cstmt.setString(100, object.ST_DATECI.trim());
                    cstmt.setString(101, object.ST_TRANCI.trim());
                    cstmt.setString(102, object.ST_DATEC.trim());
                    cstmt.setString(103, object.ST_TRANC.trim());
                    cstmt.setString(104, object.ST_DATCO.trim());
                    cstmt.setString(105, object.ST_DATET.trim());
                    cstmt.setString(106, object.ST_STATT.trim());
                    cstmt.setString(107, object.ST_DATEL.trim());
                    cstmt.setString(108, object.ST_HORAL.trim());
                    cstmt.setString(109, object.ST_CCNCFT.trim());
                    cstmt.setString(110, object.ST_CCNTRN.trim());
                    cstmt.setString(111, object.ST_CERROIN.trim());
                    cstmt.setString(112, object.ST_CERROR.trim());
                    cstmt.setString(113, object.ST_FSELEC.trim());
                    cstmt.setString(114, object.ST_FECSELEC.trim());
                    cstmt.setString(115, object.ST_FUNDSTRGR.trim());
                    cstmt.setString(116, object.ST_FUNDSTRGK.trim());
                    cstmt.setString(117, object.ST_CHARNBR.trim());
                    cstmt.setString(118, object.ST_STVALCHG.trim());
                    cstmt.setString(119, object.ST_UAUDIT.trim());
                    cstmt.setString(120, object.ST_ORDERID.trim());
                    cstmt.setString(121, object.ST_CCIA.trim());
                    cstmt.setString(122, object.ST_FORMA.trim());
                    cstmt.setString(123, object.ST_SERIE.trim());
                    cstmt.setString(124, object.ST_LIQUIDACIO.trim());
                    cstmt.setString(125, object.ST_MONEDAPAGO.trim());
                    cstmt.setString(126, object.ST_IMPORTEPAG.trim());
                    cstmt.setString(127, object.ST_ACCNUMA.trim());
                    cstmt.setString(128, object.ST_USCR.trim());
                    cstmt.setString(129, object.ST_FECR.trim());
                    cstmt.setString(130, object.ST_HOCR.trim());
                    cstmt.setString(131, object.ST_PGMCR.trim());
                    cstmt.setString(132, object.ST_USUP.trim());
                    cstmt.setString(133, object.ST_FEUP.trim());
                    cstmt.setString(134, object.ST_HOUP.trim());
                    cstmt.setString(135, object.ST_PGMUP.trim());

                    cstmt.execute();
                    // </editor-fold>

                    System.out.println("reg:" + i);

                } catch (Exception e) {
                    if (e.getMessage().contains("valor de clave duplicada")) {
                        System.out.println("Duplicado");
                    } else {
                        e.printStackTrace();
                        e.getMessage();
                    }
                }
            }
            cstmt.close();

        } catch (Exception e) {
            msg = " --Fallo insertando registros-- ";
            e.printStackTrace();
            e.getMessage();
        } finally {
            cstmt.close();
            cnx.close();
        }

        return msg;
    }

    public String loadPX269SQP00834(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF101(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "U");
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.PRDA.trim());
            cstmt.setString(4, filter.SDATE.trim());
            cstmt.setString(5, filter.SCARDNM.trim());
            cstmt.setString(6, filter.SAUTHOCM.trim());
            cstmt.setString(7, filter.DATEC.trim());
            cstmt.setString(8, filter.TRANC.trim());
            cstmt.setDouble(9, filter.VFOP);
            cstmt.setString(10, filter.CERROR);
            cstmt.setString(11, filter.CERROIN.trim());
            cstmt.setInt(12, filters.size());
            cstmt.setString(13, user.getUserInfo().USR);
            cstmt.setString(14, Functions.getFechaActual());
            cstmt.setString(15, Functions.getHoraActual());
            cstmt.setString(16, filter.strComment.toUpperCase());
            cstmt.setString(17, filter.FREGLA.trim());
            cstmt.setString(18, filter.SAGENT.trim());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF100_V1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, "U");
                cstmt2.setString(2, filterC.CCUSTCC.trim());
                cstmt2.setString(3, filterC.PRDA.trim());
                cstmt2.setString(4, filterC.SCARDN.trim());
                cstmt2.setString(5, filterC.SAUTHOC.trim());
                cstmt2.setDouble(6, filterC.VFOP);
                cstmt2.setString(7, filterC.SDATE.trim());
                cstmt2.setString(8, filterC.DATEC.trim());
                cstmt2.setString(9, filterC.TICKET.trim());
                cstmt2.setString(10, filterC.TRANC.trim());
                cstmt2.setString(11, filterC.BANDOC.trim());
                cstmt2.setString(12, filterC.CERROR.trim());
                cstmt2.setString(13, filterC.COREP.trim());
                cstmt2.setString(14, filterC.CODPRO.trim());
                cstmt2.setString(15, filterC.CCUSTPRO.trim());
                cstmt2.setString(16, filterC.DATECI.trim());
                cstmt2.setString(17, filterC.TRANCI.trim());
                cstmt2.setString(18, user.getUserInfo().USR);
                cstmt2.setString(19, Functions.getFechaActual());
                cstmt2.setString(20, Functions.getHoraActual());
                cstmt2.setString(21, filter.strComment.toUpperCase());

                cstmt2.execute();
                cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
            }

            A2290Filter filterA = filters.get(filters.size() - 1);

            if (filterA.ATDOC.equals("A")) {
                String SQLCLL03 = "{CALL " + session.getMainLibrary() + ".SQP00834INSERTMPF100_V1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

                cnx3 = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3.setString(1, "U");
//                cstmt3.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt3.setString(2, filterA.CCUSTCC.trim());
                cstmt3.setString(3, filterA.ASTVAL.trim());
                cstmt3.setString(4, filterA.ATDOC.trim());
                cstmt3.setString(5, filterA.ASCARCOD.trim());
                cstmt3.setString(6, filterA.ASCARDN.trim());
                cstmt3.setString(7, filterA.ASAUTHOC);
                cstmt3.setString(8, filterA.ACURRENCY.trim());
                cstmt3.setDouble(9, filterA.AAMOUNT);
                cstmt3.setString(10, filterA.ASDATE.trim());
                cstmt3.setString(11, filterA.ADATEC.trim());
                cstmt3.setString(12, filterA.APNR.trim());
                cstmt3.setString(13, filterA.ATICKET.substring(0, 3).trim());
                cstmt3.setString(14, filterA.ATICKET.substring(3, 7).trim());
                cstmt3.setString(15, filterA.ATICKET.substring(7, 13).trim());
                cstmt3.setString(16, filterA.ASAGENT.trim());
                cstmt3.setString(17, filterA.ATRANC.trim());
                cstmt3.setString(18, filterA.ADJCODE.trim());
                cstmt3.setString(19, filterA.BANDOC.trim());
                cstmt3.setString(20, filterA.CFUENTE.trim());
                cstmt3.setString(21, user.getUserInfo().USR);
                cstmt3.setString(22, Functions.getFechaActual());
                cstmt3.setString(23, Functions.getHoraActual());

                cstmt3.execute();
                cstmt3.close(); // Cerrar el CallableStatement después de cada ejecución

            } else {
                //NADA
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_SCAN(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.CCUSTCC.trim());
            cstmt.setString(2, filter.TICKET.trim());
            cstmt.setString(3, filter.CARD1.trim());
            cstmt.setString(4, filter.CARD2.trim());
            cstmt.setString(5, filter.SAUTHOC.trim());
            cstmt.setString(6, filter.SDATE.trim());
            cstmt.setString(7, filter.SPNR.trim());
            cstmt.setString(8, filter.SAGENT.trim());
            cstmt.setString(9, filter.SCURRENCY.trim());
            cstmt.setString(10, filter.SCARCOD.trim());
            cstmt.setString(11, filter.SCONSOL.trim());

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
                beanTkt.STVAL = rst.getString("STVAL").trim();

                beanTkt.FDESGLOSE = rst.getString("FDESGLOSE").trim(); //REVISAR
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
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

                beanTkt.A720SCOUNTRY = rst.getString("SCOUNTRY").trim();

                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();
                beanTkt.INVOICE = rst.getString("INVOICE").trim();
                beanTkt.ACCNUMA = rst.getString("ACCNUMA").trim();
                beanTkt.COSTCEN = rst.getString("COSTCEN").trim();
                beanTkt.SCONSOL = rst.getString("SCONSOL").trim();

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
        String tipFecha = "Debits";
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP_SCAN_PENDING(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.CCUSTCC.trim());
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATE.trim());//
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());//
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());//
            cstmt.setString(11, filter.TRANC.trim());
            cstmt.setString(12, filter.PRDA.trim());
            cstmt.setString(13, filter.RQUERY.trim());
            cstmt.setString(14, filter.TQUERY.trim());
            cstmt.setString(15, filter.TTABLE.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = filter.PRDA.trim();
                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.A720SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
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
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();
                beanTkt.INVOICE = rst.getString("INVOICE").trim();
                beanTkt.SCONSOL = rst.getString("SCONSOL").trim();

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

    public List<A2290Filter> loadRules() throws SQLException, Exception {

        List<A2290Filter> lista = new ArrayList<>();
        A2290Filter record;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".getRules(?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {

                record = new A2290Filter();
                record.CODRULE = rst.getString("CODRULE").trim();
                record.GRORULE = rst.getString("GRORULE").trim();
                record.RQUERY = rst.getString("RQUERY").trim();
                record.TQUERY = rst.getString("TQUERY").trim();
                record.TTABLE = rst.getString("TTABLE").trim();
                lista.add(record);
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

        return lista;
    }

    public List<A2290Filter> loadPX269SQP00871JS(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngQTYTKT = 0, lngQTYLIQ = 0;
        double dblSVFOPTKT = 0, dblSVFOPLIQ = 0;

        String estado = "", strTitulo = "";

        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        ResultSet rst = null;
        ResultSet rst2 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF101_F2(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA.trim());
            cstmt.setString(4, filter.strSQL.trim()); 
            cstmt.setString(5, filter.SCOUNTRY); 
            cstmt.setString(6, filter.RQUERY);
            cstmt.setString(7, filter.TQUERY);
            cstmt.setString(8, filter.TTABLE);

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

                String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQPMPF100_F2(?,?,?,?,?,?,?,?,?,?,?)}";

                Connection cnx2 = null;
                try {
                    cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
                    cstmt2 = cnx2.prepareCall(SQLCLL02);

                    cstmt2.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    cstmt2.setString(2, rst.getString("TDOC_101"));
                    cstmt2.setString(3, rst.getString("SDATE_101"));
                    cstmt2.setString(4, rst.getString("SCOUNTRY_101"));
                    cstmt2.setString(5, rst.getString("SCURRENCY_101"));
                    cstmt2.setString(6, rst.getString("SCARDN_101"));
                    cstmt2.setString(7, rst.getString("SAUTHOC_101"));
                    cstmt2.setString(8, rst.getString("SAGENT_101"));
                    cstmt2.setString(9, filter.RQUERY.trim());
                    cstmt2.setString(10, filter.TQUERY.trim());
                    cstmt2.setString(11, filter.TTABLE.trim());

                    cstmt2.execute();

                    rst2 = cstmt2.getResultSet();

                    while (rst2.next()) {
                        beanTkt = new A2290Filter();
                        beanTkt.TQUERY = filter.TQUERY.trim();
                        beanTkt.TKT = rst2.getString("TKT");
                        beanTkt.QTY_100 = rst2.getLong("QTY_100");
                        beanTkt.SVFOP_100 = rst2.getDouble("SVFOP_100");
                        beanTkt.SCURRENCY_100 = rst2.getString("SCURRENCY_100");
                        beanTkt.TDOC_100 = rst2.getString("TDOC_100");
                        beanTkt.SCOUNTRY_100 = rst2.getString("SCOUNTRY_100");
                        beanTkt.SDATE_100 = rst2.getString("SDATE_100");
                        beanTkt.SAGENT_100 = rst2.getString("SAGENT_100");
                        beanTkt.SCARCOD_100 = rst2.getString("SCARCOD_100");
                        beanTkt.SCARDN_100 = rst2.getString("SCARDN_100");
                        beanTkt.SAUTHOC_100 = rst2.getString("SAUTHOC_100");

                        beanTkt.UNIKEY = rst.getString("UNIKEY");
                        beanTkt.PAYDATE = rst.getString("PAYDATE");
                        beanTkt.CODEBANK = rst.getString("CODEBANK");
                        beanTkt.MERCHNC = rst.getString("MERCHNC");
                        beanTkt.ACCNUMBER = rst.getString("ACCNUMBER");
                        beanTkt.TERMI = rst.getString("TERMI");
                        beanTkt.NEGOC = rst.getString("NEGOC");
                        beanTkt.SEQNUM = rst.getString("SEQNUM");
                        beanTkt.QTY_101 = rst.getLong("QTY_101");
                        beanTkt.SVFOP_101 = rst.getDouble("SVFOP_101");
                        beanTkt.SCURRENCY_101 = rst.getString("SCURRENCY_101");
                        beanTkt.TDOC_101 = rst.getString("TDOC_101");
                        beanTkt.SCOUNTRY_101 = rst.getString("SCOUNTRY_101");
                        beanTkt.SDATE_101 = rst.getString("SDATE_101");
                        beanTkt.SAGENT_101 = rst.getString("SAGENT_101");
                        beanTkt.SCARCOD_101 = rst.getString("SCARCOD_101");
                        beanTkt.SCARDN_101 = rst.getString("SCARDN_101");
                        beanTkt.SAUTHOC_101 = rst.getString("SAUTHOC_101");

                        beanTkt.page.PAGNUM = filter.page.PAGNUM;
                        beanTkt.page.PAGROW = filter.page.PAGROW;
                        beanTkt.page.TOTPAG = filter.page.TOTPAG;
                        beanTkt.page.TOTROW = filter.page.TOTROW;

                        lstTkts.add(beanTkt);

                    }

                } catch (Exception e) {
                    e.getMessage();
                    e.printStackTrace();
                }
                rst2.close();
            }
            rst.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                    rst2.close();
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

    public List<A2290Filter> loadPX269SQP00871JS_LIQ(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngQTYTKT = 0, lngQTYLIQ = 0;
        double dblSVFOPTKT = 0, dblSVFOPLIQ = 0;

        String estado = "", strTitulo = "";

        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        ResultSet rst = null;
        ResultSet rst2 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF101_F2_EX(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA.trim());
            cstmt.setString(4, filter.strSQL.trim()); 
            cstmt.setString(5, filter.SCOUNTRY); 
            cstmt.setString(6, filter.RQUERY);
            cstmt.setString(7, filter.TQUERY);
            cstmt.setString(8, filter.TTABLE);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.UNIKEY = rst.getString("UNIKEY");
                beanTkt.PAYDATE = rst.getString("PAYDATE");
                beanTkt.CODEBANK = rst.getString("CODEBANK");
                beanTkt.MERCHNC = rst.getString("MERCHNC");
                beanTkt.ACCNUMBER = rst.getString("ACCNUMBER");
                beanTkt.TERMI = rst.getString("TERMI");
                beanTkt.NEGOC = rst.getString("NEGOC");
                beanTkt.SEQNUM = rst.getString("SEQNUM");
                beanTkt.QTY_101 = rst.getLong("QTY_101");
                beanTkt.SVFOP_101 = rst.getDouble("SVFOP_101");
                beanTkt.SCURRENCY_101 = rst.getString("SCURRENCY_101");
                beanTkt.TDOC_101 = rst.getString("TDOC_101");
                beanTkt.SDATE_101 = rst.getString("SDATE_101");
                beanTkt.SAGENT_101 = rst.getString("SAGENT_101");
                beanTkt.SCARCOD_101 = rst.getString("SCARCOD_101");
                beanTkt.SCARDN_101 = rst.getString("SCARDN_101");
                beanTkt.SAUTHOC_101 = rst.getString("SAUTHOC_101");

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

    public List<A1248> loadSQP03739(String tabla) throws Exception {
        List<A1248> lista = new ArrayList<>();
        A1248 record;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00871JT2(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, tabla);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                record = new A1248();
                record.TABNAME = rs01.getString("TABNAME").trim();
                record.ALIAS = rs01.getString("ALIAS");
                record.COLOR = rs01.getString("COLOR");
                record.USERFIELD = rs01.getString("USERFIELD").trim();
                record.DESCRIPT = rs01.getString("DESCRIPT").trim();
                record.SYSTFIELD = rs01.getString("SYSTFIELD").trim();
                record.DATATYPE = rs01.getString("DATATYPE").trim();
                record.SUBSTRFL = rs01.getString("SUBSTRFL").trim();
                //record.SUBSTRFL = rs01.getString("SUBSTRFL").trim();
                record.LENGHTF = rs01.getInt("LENGHTF");
                //record.FHELP = rs01.getString("FHELP").trim();
                record.DCOLHDG = rs01.getString("DCOLHDG").trim();
                record.strExample = rs01.getString("FHELP").trim();
                if (rs01.getString("DCOLHDG").contains("*")) {
                    record.FLAG = "1";
                    record.DCOLHDG = "\t " + rs01.getString("DCOLHDG").trim().replace("*", "\t \n \t");
                }

                lista.add(record);
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
        return lista;
    }

    public List<A1248> loadOperadores() throws SQLException, Exception {

        List<A1248> lista = new ArrayList<>();
        A1248 record;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02860(?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {

                record = new A1248();
                record.OPERADOR = rst.getString("USERFIELD").trim();
                record.DESCRIPT = rst.getString("DESCRIPT").trim();

                lista.add(record);
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

        return lista;
    }

    public INF020 loadUserInfo() throws SQLException, Exception {

        INF020 OBJ = new INF020();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".getUserInfo(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, session.getUserView().getCustomerInfo().USR);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {

                OBJ.NIVEL = rst.getString("CRTM").trim();

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

        return OBJ;
    }

    public A2290Filter loadPX285SQP00829Search(A2290Filter filter) throws SQLException, Exception {

        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00829SEARCH(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CODRULE.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.CODRULE = rs01.getString("CODRULE").trim();
                objRtn.GRORULE = rs01.getString("GRORULE").trim();
                objRtn.RQUERY = rs01.getString("RQUERY").trim();
                objRtn.TQUERY = rs01.getString("TQUERY").trim();
                objRtn.TTABLE = rs01.getString("TTABLE").trim();

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

                //lstRtn.add(objRtn);
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

    public String loadPX285SQP00829Update(A2290Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2284.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00829UPDATE(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.CODRULE.trim());
            cstmt.setString(4, filter.GRORULE.trim());
            cstmt.setString(5, filter.RQUERY.trim());
            cstmt.setString(6, filter.TQUERY.trim());
            cstmt.setString(7, filter.TTABLE.trim());

            cstmt.setString(8, session.getUserView().getUserInfo().USR);
            cstmt.setString(9, Functions.getFechaActual());
            cstmt.setString(10, Functions.getHoraActual());
            cstmt.execute();

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
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;
    }
}
