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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.A2364;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jtorres
 */
public class BankAccountingVoucherDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public BankAccountingVoucherDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BankAccountingVoucherDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    //**************************************************************************
    //***************************** PX491 **************************************
    //**************************************************************************
    public List<A2364> loadPX491SQP02837(A2364 filter) throws SQLException, Exception {

        List<A2364> lstTkts = new ArrayList<A2364>(0);
        A2364 beanTkt;
        double totAMTCARGO = 0, totAMTDEPOS = 0;
        double totDEBIT = 0, totCREDIT = 0;//ABONO/CARGO
        filter.strYear = Functions.fillZeros(4, filter.strYear).replace("00", "");//YYYY
        filter.strMonth = Functions.fillZeros(2, filter.strMonth).replace("00", "");

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02837(?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            /*cstmt.registerOutParameter(16, Types.INTEGER);
             cstmt.registerOutParameter(17, Types.INTEGER);
             cstmt.registerOutParameter(18, Types.INTEGER);
             cstmt.registerOutParameter(19, Types.INTEGER);*/
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strYear + filter.strMonth);
            cstmt.setString(3, filter.IN_BANK.trim());
            cstmt.setString(4, filter.IN_AUTHOC.trim());
            cstmt.setString(5, filter.IN_SCURRENCY);

            /*cstmt.setInt(16, filter.page.PAGNUM);
             cstmt.setInt(17, filter.page.PAGROW);
             cstmt.setInt(18, filter.page.TOTPAG);
             cstmt.setInt(19, filter.page.TOTROW);*/
            cstmt.execute();

            /*filter.page.PAGNUM = cstmt.getInt(16);
             filter.page.PAGROW = cstmt.getInt(17);
             filter.page.TOTPAG = cstmt.getInt(18);
             filter.page.TOTROW = cstmt.getInt(19);*/
            rst = cstmt.getResultSet();

            while (rst.next()) {
                totAMTCARGO = rst.getDouble("AMTCARGOT");
                totAMTDEPOS = rst.getDouble("AMTDEPOST");
                totDEBIT = rst.getDouble("ABONOT");
                totCREDIT = rst.getDouble("CARGOT");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A2364();
                    beanTkt.strYear = filter.strYear.trim();
                    beanTkt.strMonth = filter.strMonth.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AUTHOC = filter.IN_AUTHOC.trim();
                    beanTkt.IN_SCURRENCY = filter.IN_SCURRENCY.trim();
                    beanTkt.DTRANS = rst.getString("DTRANS").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DTRANS").trim());
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();

                    beanTkt.AMTCARGO = rst.getDouble("AMTCARGO");
                    beanTkt.AMTDEPOS = rst.getDouble("AMTDEPOS");
                    beanTkt.DBLDIFF = rst.getDouble("AMTCARGO") - rst.getDouble("AMTDEPOS");
                    beanTkt.dblDEBIT = rst.getDouble("ABONO");
                    beanTkt.dblCREDIT = rst.getDouble("CARGO");
                    beanTkt.AMOUNT = rst.getDouble("CARGO") - rst.getDouble("ABONO");
                    beanTkt.MERCHN = rst.getString("MERCHN");
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    if(rst.getString("CERROR").trim().equals("01")){
                        beanTkt.desCERROR ="CHARGEBACK";  
                    }else if(rst.getString("CERROR").trim().equals("02")){
                        beanTkt.desCERROR ="W:NET-CHB-REV"; 
                    }else{
                        beanTkt.desCERROR =rst.getString("CERROR").trim();
                    }
                   
                    beanTkt.totAMTCARGO = totAMTCARGO;
                    beanTkt.totAMTDEPOS = totAMTDEPOS;
                    beanTkt.totDBLDIFF = totAMTCARGO - totAMTDEPOS;
                    beanTkt.totDEBIT = totDEBIT;
                    beanTkt.totCREDIT = totCREDIT;
                    beanTkt.totAMOUNT = totCREDIT - totDEBIT;

                    /*beanTkt.page.PAGNUM = filter.page.PAGNUM;
                     beanTkt.page.PAGROW = filter.page.PAGROW;
                     beanTkt.page.TOTPAG = filter.page.TOTPAG;
                     beanTkt.page.TOTROW = filter.page.TOTROW;*/
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
//mxn 2
    public List<A2364> loadPX491SQP02880(A2364 filter) throws SQLException, Exception {

        List<A2364> lstTkts = new ArrayList<A2364>(0);
        A2364 beanTkt;
        double totDEBIT = 0, totCREDIT = 0;//ABONO/CARGO

        filter.strYear = Functions.fillZeros(4, filter.strYear).replace("00", "");//YYYY
        filter.strMonth = Functions.fillZeros(2, filter.strMonth).replace("00", "");

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02880_1(?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DTRANS.trim());
            cstmt.setString(3, filter.IN_BANK.trim());
            cstmt.setString(4, filter.IN_AUTHOC.trim());
            cstmt.setString(5, filter.MERCHN.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                totDEBIT = rst.getDouble("REV");
                totCREDIT = rst.getDouble("REC");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A2364();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AUTHOC = filter.IN_AUTHOC.trim();
                    beanTkt.DTRANS = filter.DTRANS.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.MERCHN = filter.MERCHN.trim();
                    beanTkt.NUMPOL = rst.getString("NUMPOL").trim();
                    beanTkt.dblDEBIT = rst.getDouble("REV");
                    beanTkt.dblCREDIT = rst.getDouble("REC");
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    if(rst.getString("CERROR").trim().equals("01")){
                        beanTkt.desCERROR ="CHARGEBACK";  
                    }else if(rst.getString("CERROR").trim().equals("02")){
                        beanTkt.desCERROR ="W:NET-CHB-REV"; 
                    }else{
                        beanTkt.desCERROR =rst.getString("CERROR").trim();
                    }
                    // beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DTRANS").trim());
                    beanTkt.CTRAN = rst.getString("CTRAN");
                    beanTkt.strDescCTRAN = rst.getString("DES_CTRAN");
                    // beanTkt.CLASE = rst.getString("CLASE").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();

                    beanTkt.totDEBIT = totDEBIT;
                    beanTkt.totCREDIT = totCREDIT;
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
    
    public List<A2364> loadPX491SQP03447(A2364 filter) throws SQLException, Exception {

        List<A2364> lstTkts = new ArrayList<A2364>(0);
        A2364 beanTkt;
        double totDEBIT = 0, totCREDIT = 0;//ABONO/CARGO

        filter.strYear = Functions.fillZeros(4, filter.strYear).replace("00", "");//YYYY
        filter.strMonth = Functions.fillZeros(2, filter.strMonth).replace("00", "");

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03447_2(?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DTRANS.trim());
            cstmt.setString(3, filter.IN_BANK.trim());
            cstmt.setString(4, filter.IN_AUTHOC.trim());
            cstmt.setString(5, filter.SCURRENCY.trim());
            

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                totDEBIT = rst.getDouble("REV");
                totCREDIT = rst.getDouble("REC");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A2364();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AUTHOC = filter.IN_AUTHOC.trim();
                    beanTkt.DTRANS = filter.DTRANS.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                   
                    beanTkt.NUMPOL = rst.getString("NUMPOL").trim();
                    beanTkt.dblDEBIT = rst.getDouble("REV");
                    beanTkt.dblCREDIT = rst.getDouble("REC");
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    beanTkt.CERROR =  rst.getString("CERROR").trim();
                    if(rst.getString("CERROR").trim().equals("01")){
                        beanTkt.desCERROR ="CHARGEBACK";  
                    }else if(rst.getString("CERROR").trim().equals("02")){
                        beanTkt.desCERROR ="W:NET-CHB-REV"; 
                    }else{
                        beanTkt.desCERROR =rst.getString("CERROR").trim();
                    }
                    beanTkt.CTRAN = rst.getString("CTRAN");
                    beanTkt.strDescCTRAN = rst.getString("DES_CTRAN");
                    // beanTkt.CLASE = rst.getString("CLASE").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();

                    beanTkt.totDEBIT = totDEBIT;
                    beanTkt.totCREDIT = totCREDIT;
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
//DET
    public List<A2364> loadPX491SQP03448(A2364 filter) throws SQLException, Exception {

        List<A2364> lstTkts = new ArrayList<A2364>(0);
        A2364 beanTkt;
        double totDEBIT = 0, totCREDIT = 0;//ABONO/CARGO

        filter.strYear = Functions.fillZeros(4, filter.strYear).replace("00", "");//YYYY
        filter.strMonth = Functions.fillZeros(2, filter.strMonth).replace("00", "");

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03448(?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DTRANS.trim());
            cstmt.setString(3, filter.IN_BANK.trim());
            cstmt.setString(4, filter.NUMPOL.trim());
            cstmt.setString(5, filter.IN_AUTHOC.trim());
            cstmt.setString(6, filter.CTRAN.trim());
            cstmt.setString(7, filter.MERCHN.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                if (rst.getString("CLASE").trim().equals("REV")) {
                    totDEBIT = rst.getDouble("AMOUNT");
                } else {
                    totCREDIT = rst.getDouble("AMOUNT");
                }
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A2364();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AUTHOC = filter.IN_AUTHOC.trim();
                    beanTkt.CTRAN = filter.CTRAN.trim();
                    beanTkt.strDescCTRAN = filter.strDescCTRAN.trim();
                    beanTkt.DTRANS = filter.DTRANS.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.NUMPOL = filter.NUMPOL.trim();
                    beanTkt.MERCHN = filter.MERCHN.trim();
                    beanTkt.CERROR = filter.CERROR.trim();
                    beanTkt.desCERROR = filter.desCERROR.trim();
                    
                    beanTkt.NUMPOL = rst.getString("NUMPOL").trim();
                    beanTkt.NUMDOC = rst.getString("NUMDOC").trim();
                    beanTkt.TTRAN = rst.getString("TTRAN").trim();
                    beanTkt.CLASE = rst.getString("CLASE").trim();
                    if (beanTkt.CLASE.equals("REV")) {
                        beanTkt.strDescTTRAN = "Debit";
                        beanTkt.dblDEBIT = rst.getDouble("AMOUNT");
                    } else if (beanTkt.CLASE.equals("REC")) {
                        beanTkt.strDescTTRAN = "Credit";
                        beanTkt.dblCREDIT = rst.getDouble("AMOUNT");
                    }

                    beanTkt.EFTE = rst.getString("EFTE").trim();
                    if (beanTkt.EFTE.equals("AX")) {
                        beanTkt.strEFTE = "AMEX Deutsche Bank";
                    } else if (beanTkt.EFTE.equals("BC")) {
                        beanTkt.strEFTE = "BANCOMER";
                    } else if (beanTkt.EFTE.equals("BN")) {
                        beanTkt.strEFTE = "BANORTE";
                    } else if (beanTkt.EFTE.equals("BX")) {
                        beanTkt.strEFTE = "BANAMEX";
                    } else if (beanTkt.EFTE.equals("ST")) {
                        beanTkt.strEFTE = "SANTANDER";
                    } else if (beanTkt.EFTE.equals("4401")) {
                        beanTkt.strEFTE = "BANAMEX BOOMER Cta";
                    } else if (beanTkt.EFTE.equals("8221")) {
                        beanTkt.strEFTE = "BANAMEX BOOMER Cta";
                    } else if (beanTkt.EFTE.equals("9133")) {
                        beanTkt.strEFTE = "BANAMEX Oper. Franq.";
                    }

                    beanTkt.DCONTAB = rst.getString("DCONTAB").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.strDescBANK = rst.getString("NAMEBANK").trim();
                    beanTkt.CODCLI = rst.getString("CODCLI").trim();
                    beanTkt.DIRCLIT = rst.getString("DIRCLIT").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.COMPLEM = rst.getString("COMPLEM").trim();
                    beanTkt.strACCOUNT = rst.getString("CIACTA").trim() + " " + rst.getString("UNIDAD").trim() + " "
                            + rst.getString("CECOS").trim() + " " + rst.getString("LOCAC").trim() + " "
                            + rst.getString("CODCTA").trim() + " " + rst.getString("SUBCTA").trim() + " " + rst.getString("EQUIPO").trim();

                    beanTkt.totDEBIT = totDEBIT;
                    beanTkt.totCREDIT = totCREDIT;
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
    
    public List<A2364> loadPX491SQP02838(A2364 filter) throws SQLException, Exception {

        List<A2364> lstTkts = new ArrayList<A2364>(0);
        A2364 beanTkt;
        double totDEBIT = 0, totCREDIT = 0;//ABONO/CARGO

        filter.strYear = Functions.fillZeros(4, filter.strYear).replace("00", "");//YYYY
        filter.strMonth = Functions.fillZeros(2, filter.strMonth).replace("00", "");

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02838(?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DTRANS.trim());
            cstmt.setString(3, filter.IN_BANK.trim());
            cstmt.setString(4, filter.NUMPOL.trim());
            cstmt.setString(5, filter.IN_AUTHOC.trim());
            cstmt.setString(6, filter.CTRAN.trim());
           
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                if (rst.getString("CLASE").trim().equals("REV")) {
                    totDEBIT = rst.getDouble("AMOUNT");
                } else {
                    totCREDIT = rst.getDouble("AMOUNT");
                }
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A2364();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AUTHOC = filter.IN_AUTHOC.trim();
                    beanTkt.CTRAN = filter.CTRAN.trim();
                    beanTkt.strDescCTRAN = filter.strDescCTRAN.trim();
                    beanTkt.DTRANS = filter.DTRANS.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.NUMPOL = filter.NUMPOL.trim();
                  
                    beanTkt.NUMPOL = rst.getString("NUMPOL").trim();
                    beanTkt.NUMDOC = rst.getString("NUMDOC").trim();
                    beanTkt.TTRAN = rst.getString("TTRAN").trim();
                    beanTkt.CLASE = rst.getString("CLASE").trim();
                    if (beanTkt.CLASE.equals("REV")) {
                        beanTkt.strDescTTRAN = "Debit";
                        beanTkt.dblDEBIT = rst.getDouble("AMOUNT");
                    } else if (beanTkt.CLASE.equals("REC")) {
                        beanTkt.strDescTTRAN = "Credit";
                        beanTkt.dblCREDIT = rst.getDouble("AMOUNT");
                    }

                    beanTkt.EFTE = rst.getString("EFTE").trim();
                    if (beanTkt.EFTE.equals("AX")) {
                        beanTkt.strEFTE = "AMEX Deutsche Bank";
                    } else if (beanTkt.EFTE.equals("BC")) {
                        beanTkt.strEFTE = "BANCOMER";
                    } else if (beanTkt.EFTE.equals("BN")) {
                        beanTkt.strEFTE = "BANORTE";
                    } else if (beanTkt.EFTE.equals("BX")) {
                        beanTkt.strEFTE = "BANAMEX";
                    } else if (beanTkt.EFTE.equals("ST")) {
                        beanTkt.strEFTE = "SANTANDER";
                    } else if (beanTkt.EFTE.equals("4401")) {
                        beanTkt.strEFTE = "BANAMEX BOOMER Cta";
                    } else if (beanTkt.EFTE.equals("8221")) {
                        beanTkt.strEFTE = "BANAMEX BOOMER Cta";
                    } else if (beanTkt.EFTE.equals("9133")) {
                        beanTkt.strEFTE = "BANAMEX Oper. Franq.";
                    }

                    beanTkt.DCONTAB = rst.getString("DCONTAB").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.strDescBANK = rst.getString("NAMEBANK").trim();
                    beanTkt.CODCLI = rst.getString("CODCLI").trim();
                    beanTkt.DIRCLIT = rst.getString("DIRCLIT").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.COMPLEM = rst.getString("COMPLEM").trim();
                    beanTkt.strACCOUNT = rst.getString("CIACTA").trim() + " " + rst.getString("UNIDAD").trim() + " "
                            + rst.getString("CECOS").trim() + " " + rst.getString("LOCAC").trim() + " "
                            + rst.getString("CODCTA").trim() + " " + rst.getString("SUBCTA").trim() + " " + rst.getString("EQUIPO").trim();

                    beanTkt.totDEBIT = totDEBIT;
                    beanTkt.totCREDIT = totCREDIT;
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

    public List<A2364> loadPX491SQP02882(A2364 filter) throws SQLException, Exception {

        List<A2364> lstTkts = new ArrayList<A2364>(0);
        A2364 beanTkt;
        double totDEBIT = 0, totCREDIT = 0;//ABONO/CARGO

        filter.strYear = Functions.fillZeros(4, filter.strYear).replace("00", "");//YYYY
        filter.strMonth = Functions.fillZeros(2, filter.strMonth).replace("00", "");

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02882(?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DTRANS.trim());
            cstmt.setString(3, filter.IN_BANK.trim());
            cstmt.setString(4, filter.IN_AUTHOC.trim());
            cstmt.setString(5, filter.FSELEC.trim());
            cstmt.setString(6, filter.CTRAN.trim());
            cstmt.setString(7, filter.SCURRENCY.trim());
            //cstmt.setString(7, filter.MERCHN.trim()); A PEDIDO DE EN

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                totDEBIT = rst.getDouble("AMTDEPOS");
                totCREDIT = rst.getDouble("AMTCARGO");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A2364();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AUTHOC = filter.IN_AUTHOC.trim();
                    
                    beanTkt.TTRAN = rst.getString("TTRAN").trim();
                    if (beanTkt.TTRAN.equals("A")) {
                        beanTkt.strDescTTRAN = "Debit";

                    } else if (beanTkt.TTRAN.equals("C")) {
                        beanTkt.strDescTTRAN = "Credit";

                    }

                    beanTkt.EFTE = rst.getString("EFTE").trim();
                    if (beanTkt.EFTE.equals("AX")) {
                        beanTkt.strEFTE = "AMEX Deutsche Bank";
                    } else if (beanTkt.EFTE.equals("BC")) {
                        beanTkt.strEFTE = "BANCOMER";
                    } else if (beanTkt.EFTE.equals("BN")) {
                        beanTkt.strEFTE = "BANORTE";
                    } else if (beanTkt.EFTE.equals("BX")) {
                        beanTkt.strEFTE = "BANAMEX";
                    } else if (beanTkt.EFTE.equals("ST")) {
                        beanTkt.strEFTE = "SANTANDER";
                    } else if (beanTkt.EFTE.equals("4401")) {
                        beanTkt.strEFTE = "BANAMEX BOOMER Cta";
                    } else if (beanTkt.EFTE.equals("8221")) {
                        beanTkt.strEFTE = "BANAMEX BOOMER Cta";
                    } else if (beanTkt.EFTE.equals("9133")) {
                        beanTkt.strEFTE = "BANAMEX Oper. Franq.";
                    }
                    beanTkt.FSTVAL = rst.getString("FSTVAL").trim();
                    if (beanTkt.FSTVAL.equals("1")) {
                        beanTkt.strFSTVAL = "Match";
                        beanTkt.DesStrFSTVAL = "Aclaracion Vs Avisos";
                    } else if (beanTkt.FSTVAL.equals("2")) {
                        beanTkt.strFSTVAL = "No Match";
                        beanTkt.DesStrFSTVAL = "Aviso sin aclaracion";
                    }
                    beanTkt.CTRAN = rst.getString("CTRAN").trim();
                    beanTkt.DTRANS = rst.getString("DTRANS").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DTRANS").trim());
                    beanTkt.DESCRT = rst.getString("DESCRT").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    beanTkt.AUTHOC = rst.getString("AUTHOC").trim();
                    beanTkt.FSELEC = rst.getString("FSELEC").trim();
                    if (rst.getString("FSELEC").trim().equals("L")) {
                        beanTkt.strFSELEC = "Yes";
                    } else {
                        beanTkt.strFSELEC = "";
                    }
                    beanTkt.FECSELEC = rst.getString("FECSELEC").trim();
                    beanTkt.SEQ = rst.getString("SEQ").trim();
                    beanTkt.FECRFILE = rst.getString("DATEC").trim();

                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.strDescBANK = rst.getString("NAMEBANK").trim();
                    beanTkt.dblDEBIT = rst.getDouble("AMTDEPOS");
                    beanTkt.dblCREDIT = rst.getDouble("AMTCARGO");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();

                    beanTkt.totDEBIT = totDEBIT;
                    beanTkt.totCREDIT = totCREDIT;
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

    public List<A2364> loadPX491SQP02882POLI(A2364 filter) throws SQLException, Exception {

        List<A2364> lstTkts = new ArrayList<A2364>(0);
        A2364 beanTkt;
        double totDEBIT = 0, totCREDIT = 0;//ABONO/CARGO

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03187(?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.MERCHN.trim());
            cstmt.setString(3, filter.IN_CTRAN.trim());
            cstmt.setString(4, filter.IN_SCURRENCY.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                totDEBIT = rst.getDouble("AMTDEPOS");
                totCREDIT = rst.getDouble("AMTCARGO");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A2364();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AUTHOC = filter.IN_AUTHOC.trim();
                    beanTkt.IN_CTRAN = filter.IN_CTRAN.trim();
                    beanTkt.TTRAN = rst.getString("TTRAN").trim();
                    if (beanTkt.TTRAN.equals("A")) {
                        beanTkt.strDescTTRAN = "Debit";

                    } else if (beanTkt.TTRAN.equals("C")) {
                        beanTkt.strDescTTRAN = "Credit";

                    }

                    beanTkt.EFTE = rst.getString("EFTE").trim();
                    if (beanTkt.EFTE.equals("AX")) {
                        beanTkt.strEFTE = "AMEX Deutsche Bank";
                    } else if (beanTkt.EFTE.equals("BC")) {
                        beanTkt.strEFTE = "BANCOMER";
                    } else if (beanTkt.EFTE.equals("BN")) {
                        beanTkt.strEFTE = "BANORTE";
                    } else if (beanTkt.EFTE.equals("BX")) {
                        beanTkt.strEFTE = "BANAMEX";
                    } else if (beanTkt.EFTE.equals("ST")) {
                        beanTkt.strEFTE = "SANTANDER";
                    } else if (beanTkt.EFTE.equals("4401")) {
                        beanTkt.strEFTE = "BANAMEX BOOMER Cta";
                    } else if (beanTkt.EFTE.equals("8221")) {
                        beanTkt.strEFTE = "BANAMEX BOOMER Cta";
                    } else if (beanTkt.EFTE.equals("9133")) {
                        beanTkt.strEFTE = "BANAMEX Oper. Franq.";
                    }
                    beanTkt.FSTVAL = rst.getString("FSTVAL").trim();
                    if (beanTkt.FSTVAL.equals("1")) {
                        beanTkt.strFSTVAL = "Match";
                        beanTkt.DesStrFSTVAL = "Aclaracion Vs Avisos";
                    } else if (beanTkt.FSTVAL.equals("2")) {
                        beanTkt.strFSTVAL = "No Match";
                        beanTkt.DesStrFSTVAL = "Aviso sin aclaracion";
                    }
                    beanTkt.CTRAN = rst.getString("CTRAN").trim();
                    beanTkt.DTRANS = rst.getString("DTRANS").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DTRANS").trim());
                    beanTkt.DESCRT = rst.getString("DESCRT").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    beanTkt.AUTHOC = rst.getString("AUTHOC").trim();
                    beanTkt.FSELEC = rst.getString("FSELEC").trim();
                    if (rst.getString("FSELEC").trim().equals("L")) {
                        beanTkt.strFSELEC = "Yes";
                    } else {
                        beanTkt.strFSELEC = "";
                    }
                    beanTkt.FECSELEC = rst.getString("FECSELEC").trim();
                    beanTkt.SEQ = rst.getString("SEQ").trim();
                    beanTkt.FECRFILE = rst.getString("DATEC").trim();

                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.strDescBANK = rst.getString("NAMEBANK").trim();
                    beanTkt.dblDEBIT = rst.getDouble("AMTDEPOS");
                    beanTkt.dblCREDIT = rst.getDouble("AMTCARGO");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();

                    beanTkt.totDEBIT = totDEBIT;
                    beanTkt.totCREDIT = totCREDIT;
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

    public HashMap loadPX491SQP0491XX2(A2364 filter) throws SQLException, Exception {

        HashMap hm = new HashMap();
        List<A2364> lst = new ArrayList<A2364>(0);
        A2364 beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0491XX2_1(?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DTRANS.trim());
            cstmt.setString(3, filter.IN_BANK.trim());
            cstmt.setString(4, filter.IN_AUTHOC.trim());
            cstmt.setString(5, filter.MERCHN.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                beanTkt = new A2364();
                beanTkt.DTRANS = filter.DTRANS.trim();
                beanTkt.IN_BANK = filter.IN_BANK.trim();
                beanTkt.IN_AUTHOC = filter.IN_AUTHOC.trim();

                beanTkt.DESCRT = rst.getString("TRAMA");

                lst.add(beanTkt);

            }
            rst.close();

            hm.put("lstLINE", lst);
            lst = new ArrayList<A2364>(0);
            if (cstmt.getMoreResults()) {

                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A2364();
                    beanTkt.DTRANS = filter.DTRANS.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AUTHOC = filter.IN_AUTHOC.trim();

                    beanTkt.DESCRT = rst.getString("TRAMA");

                    lst.add(beanTkt);

                }
            }

            hm.put("lstDETA", lst);
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

        return hm;
    }
    
    public HashMap loadPX491SQP0491XX1(A2364 filter) throws SQLException, Exception {

        HashMap hm = new HashMap();
        List<A2364> lst = new ArrayList<A2364>(0);
        A2364 beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0491XX1(?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DTRANS.trim());
            cstmt.setString(3, filter.IN_BANK.trim());
            cstmt.setString(4, filter.IN_AUTHOC.trim());
            cstmt.setString(5, filter.SCURRENCY.trim());
            
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                beanTkt = new A2364();
                beanTkt.DTRANS = filter.DTRANS.trim();
                beanTkt.IN_BANK = filter.IN_BANK.trim();
                beanTkt.IN_AUTHOC = filter.IN_AUTHOC.trim();
                beanTkt.DESCRT = rst.getString("TRAMA");

                lst.add(beanTkt);

            }
            rst.close();

            hm.put("lstLINE", lst);
            lst = new ArrayList<A2364>(0);
            if (cstmt.getMoreResults()) {

                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A2364();
                    beanTkt.DTRANS = filter.DTRANS.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AUTHOC = filter.IN_AUTHOC.trim();

                    beanTkt.DESCRT = rst.getString("TRAMA");

                    lst.add(beanTkt);

                }
            }

            hm.put("lstDETA", lst);
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

        return hm;
    }

    
    
    
    
}
