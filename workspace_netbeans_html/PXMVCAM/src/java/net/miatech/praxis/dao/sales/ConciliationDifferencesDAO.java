/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SQP04369Filter;
import net.miatech.beans.SQP04370ASRBYTRXFilter;
import net.miatech.beans.SQP04370ASRFilter;
import net.miatech.beans.SQP04370Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.sales.ConciliationASRDAO.fijarNumero;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class ConciliationDifferencesDAO {
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ConciliationDifferencesDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ConciliationDifferencesDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    public List<SQP04370Filter> loadSQP04370Filter(SQP04370Filter filter) throws SQLException, Exception {
        List<SQP04370Filter> lstRtn = new ArrayList<>(0);
        SQP04370Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP04370(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FPRDA_FROM);
            cstmt01.setString(3, filter.IN_FPRDA_TO);
            cstmt01.setString(4, filter.IN_BANK);           
            cstmt01.setString(5, filter.IN_FUENTE);
            cstmt01.setString(6, filter.IN_PAIS);
            cstmt01.setString(7, filter.IN_IATA);
            cstmt01.setString(8, filter.IN_MDA);
            cstmt01.setString(9, filter.IN_TFILTER);            
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04370Filter();
                objRtn.PPED = rs01.getString("PPED");
                objRtn.A1698BANK = rs01.getString("A1698BANK");
                objRtn.A1698PAIS = rs01.getString("A1698PAIS");
                objRtn.A1698FPRDA = rs01.getString("A1698FPRDA");
                objRtn.A1698IDFIL = rs01.getString("A1698IDFIL");
                objRtn.CURRENCY = rs01.getString("CURRENCY");
                objRtn.QTY_TRANSACCS = rs01.getLong("QTY_TRANSACCS");
                objRtn.TOT_GROSS = rs01.getDouble("TOT_GROSS");
                objRtn.TOT_REMITTENCE = rs01.getDouble("TOT_REMITTENCE");
                objRtn.BSP_TAX = rs01.getDouble("BSP_TAX");
                objRtn.BSP_COMM = rs01.getDouble("BSP_COMM");
                objRtn.PRAXIS_TAX = rs01.getDouble("PRAXIS_TAX");
                objRtn.PRAXIS_COMM = rs01.getDouble("PRAXIS_COMM");
                objRtn.A1698STCON = rs01.getString("A1698STCON");
                objRtn.A1698STCON_00 = rs01.getString("A1698STCON_00");
                objRtn.A1698FFILE = rs01.getString("A1698FFILE");
                objRtn.A1698HFILE = rs01.getString("A1698HFILE");
                objRtn.A1698SOURC = rs01.getString("A1698SOURC");
                objRtn.A1698CCUST = rs01.getString("A1698CCUST");
                objRtn.A1698COMEN = rs01.getString("A1698COMEN");
                objRtn.IND_CUR = rs01.getString("IND_CUR");

                objRtn.A1530STPRO_00 = rs01.getString("A1530STPRO_00");
                objRtn.TOT_GROSS_PX = rs01.getDouble("TOT_GROSS_PX");
                objRtn.TOT_REMITTENCE_PX = rs01.getDouble("TOT_REMITTENCE_PX");
                objRtn.TOT_OTHER = rs01.getDouble("TOT_OTHER");

                objRtn.TOT_CASH_BSP = rs01.getDouble("TOT_CASH_BSP");
                objRtn.TOT_CREDIT_BSP = rs01.getDouble("TOT_CREDIT_BSP");
                objRtn.TOT_CASH_PX = rs01.getDouble("TOT_CASH_PX");
                objRtn.TOT_CREDIT_PX = rs01.getDouble("TOT_CREDIT_PX");
                objRtn.A1698STREC = rs01.getString("A1698STREC");
//                news
                objRtn.DIFF_GROSS = rs01.getDouble("DIFF_GROSS");
                objRtn.DIFF_REMITTENCE  = rs01.getDouble("DIFF_REMITTENCE");                
                objRtn.DIFF_TAX = rs01.getDouble("DIFF_TAX");
                objRtn.DIFF_COMM = rs01.getDouble("DIFF_COMM");
                objRtn.DIFF_CASH = rs01.getDouble("DIFF_CASH");
                objRtn.DIFF_CREDIT = rs01.getDouble("DIFF_CREDIT");
                objRtn.DIFF_GROSS_DET = rs01.getDouble("DIFF_GROSS_DET");
                objRtn.DIFF_REMITTENCE_DET = rs01.getDouble("DIFF_REMITTENCE_DET");
                objRtn.DIFF_TAX_DET = rs01.getDouble("DIFF_TAX_DET");
                objRtn.DIFF_COMM_DET = rs01.getDouble("DIFF_COMM_DET");                 
                objRtn.DIFF_CASH_DET = rs01.getDouble("DIFF_CASH_DET");                 
                objRtn.DIFF_CREDIT_DET = rs01.getDouble("DIFF_CREDIT_DET");                 
                objRtn.DIFF_QTY_TKT = rs01.getInt("DIFF_QTY_TKT");                 
                objRtn.STATUS_DIFF = rs01.getString("STATUS_DIFF");                                 
                objRtn.STATUS_DIFF_00 = rs01.getString("STATUS_DIFF_00");                                 
                                                     
//                objRtn.A1698UCONC = rs01.getString("A1698UCONC");
//                objRtn.A1698FCONC = rs01.getString("A1698FCONC");
//                objRtn.A1698HCONC = rs01.getString("A1698HCONC");
                
                // PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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
    
    //ASR
    public List<SQP04370ASRFilter> loadSQP04370ASRFilter(SQP04370Filter filter) throws SQLException, Exception {
        
        List<SQP04370ASRFilter> lstRtn = new ArrayList<>(0);
        SQP04370ASRFilter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP04370(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FPRDA_FROM);
            cstmt01.setString(3, filter.IN_FPRDA_TO);
            cstmt01.setString(4, filter.IN_BANK);           
            cstmt01.setString(5, filter.IN_FUENTE);
            cstmt01.setString(6, filter.IN_PAIS);
            cstmt01.setString(7, filter.IN_IATA);
            cstmt01.setString(8, filter.IN_MDA);
            cstmt01.setString(9, filter.IN_TFILTER);            
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04370ASRFilter();
                objRtn.RN = rs01.getLong("ID");                
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.WKSTAT = rs01.getString("WKSTAT");
                objRtn.FREPOR = rs01.getString("FREPOR");
                objRtn.MDA = rs01.getString("MDA");
                objRtn.HDTE = rs01.getString("HDTE");
                objRtn.HNAME = rs01.getString("HNAME");
                objRtn.HSTATUS = rs01.getString("HSTATUS");
                objRtn.SCASH = rs01.getDouble("SCASH");
                objRtn.SCREDIT = rs01.getDouble("SCREDIT");
                objRtn.SEXCHA = rs01.getDouble("SEXCHA");
                objRtn.STVOUCHER = rs01.getDouble("STVOUCHER");
                objRtn.RCASH = rs01.getDouble("RCASH");
                objRtn.RCREDIT = rs01.getDouble("RCREDIT");
                objRtn.REXCHA = rs01.getDouble("REXCHA");
                objRtn.RTVOUCHER = rs01.getDouble("RTVOUCHER");
                objRtn.NCASH = rs01.getDouble("NCASH");
                objRtn.NCREDIT = rs01.getDouble("NCREDIT");
                objRtn.NEXCHA = rs01.getDouble("NEXCHA");
                objRtn.NTVOUCHER = rs01.getDouble("NTVOUCHER");
                objRtn.TCASH = rs01.getDouble("TCASH");
                objRtn.TCREDIT = rs01.getDouble("TCREDIT");
                objRtn.TEXCHA = rs01.getDouble("TEXCHA");
                objRtn.TTVOUCHER = rs01.getDouble("TTVOUCHER");
                objRtn.STOTAL = rs01.getDouble("STOTAL");
                objRtn.RTOTAL = rs01.getDouble("RTOTAL");
                objRtn.NTOTAL = rs01.getDouble("NTOTAL");
                objRtn.TTOTAL = rs01.getDouble("TTOTAL");

                objRtn.A1530_A1720_CA_SUM = rs01.getDouble("A1530_A1720_CA_SUM");
                objRtn.A1530_A1720_CC_SUM = rs01.getDouble("A1530_A1720_CC_SUM");
                objRtn.A1530_A1720_EX_SUM = rs01.getDouble("A1530_A1720_EX_SUM");
                objRtn.A1530_A1720_TV_SUM = rs01.getDouble("A1530_A1720_TV_SUM");

                objRtn.STATUS = rs01.getString("STATUS");
                objRtn.STATUS_RECORD = "";
                double intA1530_A1720_CA_SUM = rs01.getDouble("SCASH") - rs01.getDouble("RCASH");                
                double intA1530_A1720_CC_SUM = rs01.getDouble("SCREDIT") -  rs01.getDouble("RCREDIT");    
                intA1530_A1720_CA_SUM = fijarNumero(intA1530_A1720_CA_SUM,2);
                intA1530_A1720_CC_SUM = fijarNumero(intA1530_A1720_CC_SUM,2);
                
                double diff_CA_SUM = intA1530_A1720_CA_SUM - rs01.getDouble("A1530_A1720_CA_SUM"); 
                double diff_CC_SUM = intA1530_A1720_CC_SUM - rs01.getDouble("A1530_A1720_CC_SUM");
                diff_CA_SUM = fijarNumero(diff_CA_SUM,2);
                diff_CC_SUM = fijarNumero(diff_CC_SUM,2);
                    
                switch (objRtn.STATUS) {
                    case "A": objRtn.STATUS_RECORD = "MATCH"; //MATCH AUTOMATIC.
                        break;
                    case "M": objRtn.STATUS_RECORD = "MATCH"; //MATCH MANUAL.
                        break;
                    case "D": objRtn.STATUS_RECORD = "DIFF"; //DIFFERENCE.
                        break;
                    case "": //CALCULATE.
                        if ( diff_CA_SUM == 0 && diff_CC_SUM == 0 ){
                            objRtn.STATUS_RECORD = "MATCH";                            
                        } else {
                            objRtn.STATUS_RECORD = "DIFF";
                        }
                        break;
                    default:
                        objRtn.STATUS_RECORD = objRtn.STATUS;
                }
                //NEW
                objRtn.A1530AGENT = rs01.getString("WKSTAT");
                objRtn.A1530FDESD = rs01.getString("FREPOR");
                objRtn.A1530MDA = rs01.getString("MDA");
                objRtn.A1530GRUPO = rs01.getString("GRUPO");                
                        
                objRtn.CA_SUM_D = rs01.getDouble("CA_SUM_D");
                objRtn.CC_SUM_D = rs01.getDouble("CC_SUM_D");
                objRtn.CA_SUM_DET = rs01.getDouble("CA_SUM_DET");
                objRtn.CC_SUM_DET = rs01.getDouble("CC_SUM_DET");                
                objRtn.STATUS_DIFF = rs01.getString("STATUS_DIFF");
                objRtn.STATUS_DIFF_00 = rs01.getString("STATUS_DIFF_00");
                
                // PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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
    
    //ASR by transaction    
    public List<SQP04370ASRBYTRXFilter> loadSQP04370ASRBYTRXFilter(SQP04370Filter filter) throws SQLException, Exception {
        
        List<SQP04370ASRBYTRXFilter> lstRtn = new ArrayList<>(0);
        SQP04370ASRBYTRXFilter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP04370(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FPRDA_FROM);
            cstmt01.setString(3, filter.IN_FPRDA_TO);
            cstmt01.setString(4, filter.IN_BANK);           
            cstmt01.setString(5, filter.IN_FUENTE);
            cstmt01.setString(6, filter.IN_PAIS);
            cstmt01.setString(7, filter.IN_IATA);
            cstmt01.setString(8, filter.IN_MDA);
            cstmt01.setString(9, filter.IN_TFILTER);            
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04370ASRBYTRXFilter();                
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.WKSTAT = rs01.getString("WKSTAT");
                objRtn.FREPOR = rs01.getString("FREPOR");
                objRtn.SEC = rs01.getInt("SEC");
                objRtn.BSEC = rs01.getInt("BSEC");
                objRtn.PSTATE = rs01.getInt("PSTATE");
                objRtn.SEQ = rs01.getString("SEQ");
                objRtn.STATION = rs01.getString("STATION");
                objRtn.CODE = rs01.getString("CODE");
                objRtn.OPDT = rs01.getString("OPDT");
                objRtn.OPTM = rs01.getString("OPTM");
                objRtn.ST = rs01.getString("ST");
                objRtn.CLDT = rs01.getString("CLDT");
                objRtn.CLTM = rs01.getString("CLTM");
                objRtn.XTDT = rs01.getString("XTDT");
                objRtn.XTTM = rs01.getString("XTTM");
                objRtn.XTST = rs01.getInt("XTST");
                objRtn.VOIDS = rs01.getInt("VOIDS");
                objRtn.FTRANS = rs01.getString("FTRANS");
                objRtn.TTRANS = rs01.getInt("TTRANS");
                objRtn.MANUP = rs01.getString("MANUP");
                objRtn.FTRANSP = rs01.getString("FTRANSP");
                objRtn.TTRANSP = rs01.getInt("TTRANSP"); //--.
                objRtn.SAMT = rs01.getString("SAMT");
                objRtn.COMENT = rs01.getString("COMENT");                
                objRtn.diffTransactions = rs01.getInt("XTST") - rs01.getInt("TTRANSP");
                objRtn.processState = objRtn.diffTransactions != 0 ? "DIFF" : "MATCH";
                
                //NEW
//                objRtn.A1530AGENT = rs01.getString("WKSTAT");
//                objRtn.A1530FDESD = rs01.getString("FREPOR");
//                objRtn.A1530MDA = rs01.getString("MDA");
//                objRtn.A1530GRUPO = rs01.getString("GRUPO");                
                        
                objRtn.TTRANSP_DIF = rs01.getInt("TTRANSP_DIF");
                objRtn.TTRANSP_DET = rs01.getInt("TTRANSP_DET");                
                objRtn.STATUS_DIFF = rs01.getString("STATUS_DIFF");
                objRtn.STATUS_DIFF_00 = rs01.getString("STATUS_DIFF_00");
                
                // PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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
        
    
    //DATALLE DIFERENCIAS
    public List<SQP04369Filter> loadSQP04369Filter(SQP04369Filter filter) throws SQLException, Exception {
        List<SQP04369Filter> lstRtn = new ArrayList<>(0);
        SQP04369Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP04369(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FPRDA1);
            cstmt01.setString(3, filter.IN_FPRDA2);
            cstmt01.setString(4, filter.IN_BANK);           
            cstmt01.setString(5, filter.IN_FUENTE);
            cstmt01.setString(6, filter.IN_PAIS);
            cstmt01.setString(7, filter.IN_IATA);
            cstmt01.setString(8, filter.IN_MDA);
            cstmt01.setString(9, filter.IN_IDFIL);            
            cstmt01.setString(10, filter.IN_STATUS);
            cstmt01.setString(11, filter.IN_TIPO);            
            
            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04369Filter();
                objRtn.PROCESSING_DATE = rs01.getString("PROCESSING_DATE");
                objRtn.OPEN_DATE = rs01.getString("OPEN_DATE");
                objRtn.GRUPO = rs01.getString("GRUPO");
                objRtn.MDA_LOCAL = rs01.getString("MDA_LOCAL");
                objRtn.PAIS = rs01.getString("PAIS");
                objRtn.FUENTE = rs01.getString("FUENTE");
                objRtn.IATA = rs01.getString("IATA");
                objRtn.TICKET = rs01.getString("TICKET");
                objRtn.TRNC = rs01.getString("TRNC");
                objRtn.CONCEPTO = rs01.getString("CONCEPTO");
                objRtn.CODIGO1 = rs01.getString("CODIGO1");
                objRtn.IMPORTE1_LOC = rs01.getDouble("IMPORTE1_LOC");
                objRtn.CODIGO2 = rs01.getString("CODIGO2");
                objRtn.IMPORTE2_LOC = rs01.getDouble("IMPORTE2_LOC");
                objRtn.DESCRIPCION = rs01.getString("DESCRIPCION");
                objRtn.COD_DESC = rs01.getString("COD_DESC");
                // PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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
    
}
