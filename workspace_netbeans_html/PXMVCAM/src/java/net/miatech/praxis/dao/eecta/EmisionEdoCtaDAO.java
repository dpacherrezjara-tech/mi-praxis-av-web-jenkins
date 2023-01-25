/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.eecta;

import java.io.FileOutputStream;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.eecta.SQP03976Filter;
import net.miatech.praxis.eecta.SQP03977Filter;
import net.miatech.praxis.eecta.SQP04001Filter;
import net.miatech.praxis.eecta.SQP04043Filter;
import net.miatech.praxis.eecta.SQP04050Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class EmisionEdoCtaDAO {
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public List<SQP03977Filter> getSQP03977Filter(SQP03977Filter filter) throws SQLException, Exception {
        List<SQP03977Filter> lstRtn = new ArrayList<SQP03977Filter>(0);
        SQP03977Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03977(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_FDATE1);
            cstmt01.setString(4, filter.VP_FDATE2);
            cstmt01.setString(5, filter.VP_CDCLI);
            cstmt01.setString(6, filter.VP_RSOCI);
            cstmt01.setString(7, filter.VP_NREDO);
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);            
            cstmt01.execute();            
            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03977Filter();
                objRtn.A3981CCUST = rs01.getString("A3981CCUST");
                objRtn.A3981NREDO = rs01.getString("A3981NREDO");
                objRtn.A3981CDCLI = rs01.getString("A3981CDCLI");
                objRtn.A3981SEQID = rs01.getString("A3981SEQID");                
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.A3981CONTR = rs01.getString("A3981CONTR");
                objRtn.A3981FEDOC = rs01.getString("A3981FEDOC");
                objRtn.A3981INIPR = rs01.getString("A3981INIPR"); //falta
                objRtn.A3981FINPR = rs01.getString("A3981FINPR"); //falta
//                objRtn.A3957REFBC = rs01.getString("A3957REFBC"); //falta                
                objRtn.A3981MDLOC = rs01.getString("A3981MDLOC");                
                objRtn.A3981TOT = rs01.getDouble("A3981TOT");
                objRtn.A3981TOTLT = rs01.getString("A3981TOTLT");                
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
    
     public List<SQP03976Filter> getSQP03976Filter(SQP03976Filter filter) throws SQLException, Exception {
        List<SQP03976Filter> lstRtn = new ArrayList<SQP03976Filter>(0);
         SQP03976Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null , rs03 = null, rs04 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03976(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A3981NREDO);
            cstmt01.setString(3, filter.VP_A3981CDCLI);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            
            //this.setSQP03875(); tmp
            
            /*pos 0*/
            while (rs01.next()) {
                objRtn = new SQP03976Filter();
                
                objRtn.rpteCab.A3981CCUST = rs01.getString("A3981CCUST");                                        
                objRtn.rpteCab.A3981NREDO = rs01.getString("A3981NREDO");                                        
                objRtn.rpteCab.A3981CDCLI = rs01.getString("A3981CDCLI");                
                objRtn.rpteCab.A3981SEQID = rs01.getString("A3981SEQID");                                
                objRtn.rpteCab.A3981CONTR = rs01.getString("A3981CONTR");                
                objRtn.rpteCab.A3981FEDOC = rs01.getString("A3981FEDOC");
                objRtn.rpteCab.A3981INIPR = rs01.getString("A3981INIPR");
                objRtn.rpteCab.A3981FINPR = rs01.getString("A3981FINPR");
                //objRtn.rpteCab.A3957REFBC = rs01.getString("A3957REFBC");
                objRtn.rpteCab.A3981MDLOC = rs01.getString("A3981MDLOC");
//                objRtn.rpteCab.A3957FARE = rs01.getDouble("A3957FARE");
//                objRtn.rpteCab.A3957IVA = rs01.getDouble("A3957IVA");
//                objRtn.rpteCab.A3957TUA = rs01.getDouble("A3957TUA");
//                objRtn.rpteCab.A3957YR = rs01.getDouble("A3957YR");
//                objRtn.rpteCab.A3957YQ = rs01.getDouble("A3957YQ");
//                objRtn.rpteCab.A3957OTR = rs01.getDouble("A3957OTR");
                objRtn.rpteCab.A3981TOT = rs01.getDouble("A3981TOT");
                objRtn.rpteCab.A3981TOTLT = rs01.getString("A3981TOTLT");
                //datos CLIENTE
                objRtn.tbl_client.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.tbl_client.A3953DIRE1 = rs01.getString("A3953DIRE1");
                objRtn.tbl_client.A3953COLON = rs01.getString("A3953COLON");
                objRtn.tbl_client.A3953DELEG = rs01.getString("A3953DELEG");
                objRtn.tbl_client.A3953CP = rs01.getString("A3953CP");
                objRtn.tbl_client.A3953LOGO = rs01.getString("A3953LOGO").trim();
                objRtn.tbl_client.A3953PLZCR = rs01.getInt("A3953PLZCR");
                objRtn.tbl_client.A3953TORGN = rs01.getString("A3953TORGN");                                                                                                                      
                //Fetch BLOB from DB
                Blob blb= rs01.getBlob("LOGOBLOB");                
                if( blb != null){
                    byte barr[]=blb.getBytes(1,(int)blb.length());
                    FileOutputStream fout=new FileOutputStream("/Dumps/"+ rs01.getString("A3953LOGO"));                
                    fout.write(barr);                
                    fout.close();  
                }                                
                lstRtn.add(objRtn);
            }
            /*pos 1*/
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new SQP03976Filter();
                    objRtn.tbl_misl.A3961DESC1 = rs02.getString("A3961DESC1");
                    objRtn.tbl_misl.A3961DESC2 = rs02.getString("A3961DESC2");
                    objRtn.tbl_misl.A3961COME1 = rs02.getString("A3961COME1");
                    objRtn.tbl_misl.A3961COME2 = rs02.getString("A3961COME2");
                    lstRtn.add(objRtn);                    
                }
            }
            /*pos 2*/
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objRtn = new SQP03976Filter();
                    objRtn.tbl_misl.A3961DESC1 = rs04.getString("A3961DESC1");
                    objRtn.tbl_misl.A3961DESC2 = rs04.getString("A3961DESC2");
                    objRtn.tbl_misl.A3961COME1 = rs04.getString("A3961COME1");
                    objRtn.tbl_misl.A3961COME2 = rs04.getString("A3961COME2");
                    lstRtn.add(objRtn);                    
                }
            }
            /*pos 3*/
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objRtn = new SQP03976Filter();
                    objRtn.tbl_saldos.A3990TOT  = rs03.getDouble("A3990TOT");
                    objRtn.tbl_saldos.A3990TTLS0 = rs03.getDouble("A3990TTLS0");
                    objRtn.tbl_saldos.A3990TTLS1 = rs03.getDouble("A3990TTLS1");
                    objRtn.tbl_saldos.A3990TTLS2 = rs03.getDouble("A3990TTLS2");
                    objRtn.tbl_saldos.A3990TTLS3 = rs03.getDouble("A3990TTLS3");
                    objRtn.tbl_saldos.A3990TTLS4 = rs03.getDouble("A3990TTLS4");
                    objRtn.tbl_saldos.A3990TTLS5 = rs03.getDouble("A3990TTLS5");
                    objRtn.tbl_saldos.A3990TTLS6 = rs03.getDouble("A3990TTLS6");
                    lstRtn.add(objRtn);                    
                }
            }
            /*pos 4*/
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objRtn = new SQP03976Filter();
                    objRtn.rpteDet.A3982CCUST = rs04.getString("A3982CCUST");
                    objRtn.rpteDet.A3982CDCLI = rs04.getString("A3982CDCLI");
                    objRtn.rpteDet.A3982NREDO = rs04.getString("A3982NREDO");
                    objRtn.rpteDet.A3982TREG = rs04.getString("A3982TREG");
                    objRtn.rpteDet.A3982SEQED = rs04.getString("A3982SEQED");                    
                    objRtn.rpteDet.A3982IDPRO = rs04.getString("A3982IDPRO");
                    objRtn.rpteDet.A3982FEDOC = rs04.getString("A3982FEDOC");
                    objRtn.rpteDet.A3982FECPR = rs04.getString("A3982FECPR");   
                    objRtn.rpteDet.A3982SEQID = rs04.getString("A3982SEQID");
                    objRtn.rpteDet.A3982QTYTX = rs04.getInt("A3982QTYTX");
                    objRtn.rpteDet.A3982REFBC = rs04.getString("A3982REFBC");   
                    objRtn.rpteDet.A3982INDPR = rs04.getString("A3982INDPR");   
                    objRtn.rpteDet.A3982INIPR = rs04.getString("A3982INIPR");   
                    objRtn.rpteDet.A3982FINPR = rs04.getString("A3982FINPR");                                          
                    objRtn.rpteDet.A3982BANCO= rs04.getString("A3982BANCO");   
                    objRtn.rpteDet.A3982MDLOC = rs04.getString("A3982MDLOC"); 
                    objRtn.rpteDet.NRRPT = rs04.getString("NRRPT");                     
//                    objRtn.rpteDet.A3958RUTA = rs03.getString("A3958RUTA");  
//                    objRtn.rpteDet.A3958FARE = rs03.getDouble("A3958FARE");
//                    objRtn.rpteDet.A3958IVA = rs03.getDouble("A3958IVA");
//                    objRtn.rpteDet.A3958TUA = rs03.getDouble("A3958TUA");
//                    objRtn.rpteDet.A3958YR = rs03.getDouble("A3958YR");
//                    objRtn.rpteDet.A3958YQ = rs03.getDouble("A3958YQ");
//                    objRtn.rpteDet.A3958OTR = rs03.getDouble("A3958OTR");
                    objRtn.rpteDet.A3982TOT = rs04.getDouble("A3982TOT");                                        
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
     public List<SQP04001Filter> getSQP04001(SQP04001Filter filter) throws SQLException, Exception {
        List<SQP04001Filter> lstRtn = new ArrayList<SQP04001Filter>(0);
        SQP04001Filter objRtn;

        CallableStatement cstmt01 = null;
         ResultSet rs01 = null, rs02 = null , rs03 = null, rs04 = null; 
        String SQLCLL01 = "{CALL PXUATP.SQP04001(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_NROEDO);
            cstmt01.setString(3, filter.VP_CDCLI);
            cstmt01.execute();            
            rs01 = cstmt01.getResultSet();
            /*pos 0*/
            while (rs01.next()) {
                objRtn = new SQP04001Filter();                
                objRtn.rpteCab.A3981CCUST = rs01.getString("A3981CCUST");                                        
                objRtn.rpteCab.A3981NREDO = rs01.getString("A3981NREDO");                                        
                objRtn.rpteCab.A3981CDCLI = rs01.getString("A3981CDCLI");                
                objRtn.rpteCab.A3981SEQID = rs01.getString("A3981SEQID");                                
                objRtn.rpteCab.A3981CONTR = rs01.getString("A3981CONTR");                
                objRtn.rpteCab.A3981FEDOC = rs01.getString("A3981FEDOC");
                objRtn.rpteCab.A3981INIPR = rs01.getString("A3981INIPR");
                objRtn.rpteCab.A3981FINPR = rs01.getString("A3981FINPR");                
                objRtn.rpteCab.A3981MDLOC = rs01.getString("A3981MDLOC");
                objRtn.rpteCab.A3981TOT = rs01.getDouble("A3981TOT");
                objRtn.rpteCab.A3981TOTLT = rs01.getString("A3981TOTLT");
                //datos CLIENTE
                objRtn.tbl_client.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.tbl_client.A3953DIRE1 = rs01.getString("A3953DIRE1");
                objRtn.tbl_client.A3953COLON = rs01.getString("A3953COLON");
                objRtn.tbl_client.A3953DELEG = rs01.getString("A3953DELEG");
                objRtn.tbl_client.A3953CP = rs01.getString("A3953CP");
                objRtn.tbl_client.A3953LOGO = rs01.getString("A3953LOGO").trim();
                objRtn.tbl_client.A3953PLZCR = rs01.getInt("A3953PLZCR");
                objRtn.tbl_client.A3953TORGN = rs01.getString("A3953TORGN");                                                                                                                      
                //Fetch BLOB from DB
                Blob blb= rs01.getBlob("LOGOBLOB");                
                if( blb != null){
                    byte barr[]=blb.getBytes(1,(int)blb.length());
                    FileOutputStream fout=new FileOutputStream("/Dumps/"+ rs01.getString("A3953LOGO"));                
                    fout.write(barr);                
                    fout.close();  
                }                                
                lstRtn.add(objRtn);
            }
            /*pos 1*/
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new SQP04001Filter();
                    objRtn.tbl_misl.A3961DESC1 = rs02.getString("A3961DESC1");
                    objRtn.tbl_misl.A3961DESC2 = rs02.getString("A3961DESC2");
                    objRtn.tbl_misl.A3961COME1 = rs02.getString("A3961COME1");
                    objRtn.tbl_misl.A3961COME2 = rs02.getString("A3961COME2");
                    lstRtn.add(objRtn);                    
                }
            }
            /*pos 2*/
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objRtn = new SQP04001Filter();
                    objRtn.tbl_misl.A3961DESC1 = rs03.getString("A3961DESC1");
                    objRtn.tbl_misl.A3961DESC2 = rs03.getString("A3961DESC2");
                    objRtn.tbl_misl.A3961COME1 = rs03.getString("A3961COME1");
                    objRtn.tbl_misl.A3961COME2 = rs03.getString("A3961COME2");
                    lstRtn.add(objRtn);                    
                }
            }
            /*pos 3*/
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objRtn = new SQP04001Filter();
                    objRtn.rpteDet.A3958CCUST = rs04.getString("A3958CCUST");
                    objRtn.rpteDet.A3958CIA = rs04.getString("A3958CIA");
                    objRtn.rpteDet.A3958FORMA = rs04.getString("A3958FORMA");
                    objRtn.rpteDet.A3958SERIE = rs04.getString("A3958SERIE");
                    objRtn.rpteDet.A3958SEQ = rs04.getString("A3958SEQ");                    
                    objRtn.rpteDet.A3958FEVTA = rs04.getString("A3958FEVTA");
                    objRtn.rpteDet.A3958NRRPT = rs04.getString("A3958NRRPT");
                    objRtn.rpteDet.A3958PAX = rs04.getString("A3958PAX"); 
                    objRtn.rpteDet.A3958SOLER = rs04.getString("A3958SOLER"); 
                    objRtn.rpteDet.A3958TRNCU = rs04.getString("A3958TRNCU"); 
                    objRtn.rpteDet.A3958RUTA = rs04.getString("A3958RUTA").trim(); 
                    objRtn.rpteDet.A3958CFDI = rs04.getString("A3958CFDI").trim();                    
                    objRtn.rpteDet.A3958MDLOC = rs04.getString("A3958MDLOC");                   
                    objRtn.rpteDet.A3958TOT = rs04.getDouble("A3958TOT");
                    objRtn.CANT_DIA = rs04.getInt("CANT_DIA");                                        
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
     
     public List<SQP04043Filter> getSQP04043Filter(SQP04043Filter filter) throws SQLException, Exception {
        List<SQP04043Filter> lstRtn = new ArrayList<SQP04043Filter>(0);
         SQP04043Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null , rs03 = null, rs04 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04043(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A3981FPERI);
            cstmt01.setString(3, filter.VP_A3981CDCLI);
            cstmt01.setString(4, filter.VP_A3981FEJEC);            
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();            
            /*pos 0*/
            while (rs01.next()) {
                objRtn = new SQP04043Filter();                
                objRtn.rpteCab.A3981CCUST = rs01.getString("A3981CCUST");                                        
                //objRtn.rpteCab.A3981NREDO = rs01.getString("A3981NREDO");                   
                objRtn.rpteCab.A3981CDCLI = rs01.getString("A3981CDCLI");                
                objRtn.rpteCab.A3981SEQID = rs01.getString("A3981SEQID");                                
                //objRtn.rpteCab.A3981CONTR = rs01.getString("A3981CONTR");                
                objRtn.rpteCab.A3981FEDOC = rs01.getString("A3981FEDOC");
                objRtn.rpteCab.A3981INIPR = rs01.getString("A3981INIPR");
                objRtn.rpteCab.A3981FINPR = rs01.getString("A3981FINPR");                
                objRtn.rpteCab.A3981MDLOC = rs01.getString("A3981MDLOC");
                objRtn.rpteCab.A3981TOT = rs01.getDouble("A3981TOT");
                objRtn.rpteCab.A3981TOTLT = rs01.getString("A3981TOTLT");
                //datos CLIENTE
                objRtn.tbl_client.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.tbl_client.A3953DIRE1 = rs01.getString("A3953DIRE1");
                objRtn.tbl_client.A3953COLON = rs01.getString("A3953COLON");
                objRtn.tbl_client.A3953DELEG = rs01.getString("A3953DELEG");
                objRtn.tbl_client.A3953CP = rs01.getString("A3953CP");
                objRtn.tbl_client.A3953LOGO = rs01.getString("A3953LOGO").trim();
                objRtn.tbl_client.A3953PLZCR = rs01.getInt("A3953PLZCR");
                objRtn.tbl_client.A3953TORGN = rs01.getString("A3953TORGN");                                                                                                                      
                //Fetch BLOB from DB
                Blob blb= rs01.getBlob("LOGOBLOB");                
                if( blb != null){
                    byte barr[]=blb.getBytes(1,(int)blb.length());
                    FileOutputStream fout=new FileOutputStream("/Dumps/"+ rs01.getString("A3953LOGO"));                
                    fout.write(barr);                
                    fout.close();  
                }                                
                lstRtn.add(objRtn);
            }
            /*pos 1*/
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new SQP04043Filter();
                    objRtn.tbl_misl.A3961DESC1 = rs02.getString("A3961DESC1");
                    objRtn.tbl_misl.A3961DESC2 = rs02.getString("A3961DESC2");
                    objRtn.tbl_misl.A3961COME1 = rs02.getString("A3961COME1");
                    objRtn.tbl_misl.A3961COME2 = rs02.getString("A3961COME2");
                    lstRtn.add(objRtn);                    
                }
            }
            /*pos 2*/
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objRtn = new SQP04043Filter();
                    objRtn.tbl_misl.A3961DESC1 = rs04.getString("A3961DESC1");
                    objRtn.tbl_misl.A3961DESC2 = rs04.getString("A3961DESC2");
                    objRtn.tbl_misl.A3961COME1 = rs04.getString("A3961COME1");
                    objRtn.tbl_misl.A3961COME2 = rs04.getString("A3961COME2");
                    lstRtn.add(objRtn);                    
                }
            }
            /*pos 3*/
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objRtn = new SQP04043Filter();
                    objRtn.tbl_saldos.A3990TOT  = rs03.getDouble("A3990TOT");
                    objRtn.tbl_saldos.A3990TTLS0 = rs03.getDouble("A3990TTLS0");
                    objRtn.tbl_saldos.A3990TTLS1 = rs03.getDouble("A3990TTLS1");
                    objRtn.tbl_saldos.A3990TTLS2 = rs03.getDouble("A3990TTLS2");
                    objRtn.tbl_saldos.A3990TTLS3 = rs03.getDouble("A3990TTLS3");
                    objRtn.tbl_saldos.A3990TTLS4 = rs03.getDouble("A3990TTLS4");
                    objRtn.tbl_saldos.A3990TTLS5 = rs03.getDouble("A3990TTLS5");
                    objRtn.tbl_saldos.A3990TTLS6 = rs03.getDouble("A3990TTLS6");
                    lstRtn.add(objRtn);                    
                }
            }
            /*pos 4*/
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objRtn = new SQP04043Filter();
                    objRtn.rpteDet.A3982CCUST = rs04.getString("A3982CCUST");
                    objRtn.rpteDet.A3982CDCLI = rs04.getString("A3982CDCLI");
                    //objRtn.rpteDet.A3982NREDO = rs04.getString("A3982NREDO");
                    objRtn.rpteDet.A3982TREG = rs04.getString("A3982TREG");
                    objRtn.rpteDet.A3982SEQED = rs04.getString("A3982SEQED");                    
                    objRtn.rpteDet.A3982IDPRO = rs04.getString("A3982IDPRO");
                    objRtn.rpteDet.A3982FEDOC = rs04.getString("A3982FEDOC");
                    objRtn.rpteDet.A3982FECPR = rs04.getString("A3982FECPR");   
                    objRtn.rpteDet.A3982SEQID = rs04.getString("A3982SEQID");
                    objRtn.rpteDet.A3982QTYTX = rs04.getInt("A3982QTYTX");
                    objRtn.rpteDet.A3982REFBC = rs04.getString("A3982REFBC");   
                    //objRtn.rpteDet.A3982INDPR = rs04.getString("A3982INDPR");   
                    objRtn.rpteDet.A3982INIPR = rs04.getString("A3982INIPR");   
                    objRtn.rpteDet.A3982FINPR = rs04.getString("A3982FINPR");                                          
                    objRtn.rpteDet.A3982BANCO= rs04.getString("A3982BANCO");   
                    objRtn.rpteDet.A3982MDLOC = rs04.getString("A3982MDLOC"); 
                    objRtn.rpteDet.NRRPT = rs04.getString("NRRPT");
                    objRtn.rpteDet.A3982TOT = rs04.getDouble("A3982TOT");                                        
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
     public List<SQP04050Filter> getSQP04050Filter(SQP04050Filter filter) throws SQLException, Exception {
        List<SQP04050Filter> lstRtn = new ArrayList<SQP04050Filter>(0);
         SQP04050Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null , rs03 = null, rs04 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04050(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A3981FPERI);
            cstmt01.setString(3, filter.VP_A3981CDCLI);
            cstmt01.setString(4, filter.VP_A3981FEJEC);            
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();            
            /*pos 0*/
            while (rs01.next()) {
                objRtn = new SQP04050Filter();                
                objRtn.rpteCab.A3981CCUST = rs01.getString("A3981CCUST");                                        
                //objRtn.rpteCab.A3981NREDO = rs01.getString("A3981NREDO");                   
                objRtn.rpteCab.A3981CDCLI = rs01.getString("A3981CDCLI");                
                objRtn.rpteCab.A3981SEQID = rs01.getString("A3981SEQID");                                
                //objRtn.rpteCab.A3981CONTR = rs01.getString("A3981CONTR");                
                objRtn.rpteCab.A3981FEDOC = rs01.getString("A3981FEDOC");
                objRtn.rpteCab.A3981INIPR = rs01.getString("A3981INIPR");
                objRtn.rpteCab.A3981FINPR = rs01.getString("A3981FINPR");                
                objRtn.rpteCab.A3981MDLOC = rs01.getString("A3981MDLOC");
                objRtn.rpteCab.A3981TOT = rs01.getDouble("A3981TOT");
                objRtn.rpteCab.A3981TOTLT = rs01.getString("A3981TOTLT");
                //datos CLIENTE
                objRtn.tbl_client.A3953CDCLI = rs01.getString("A3953CDCLI");
                objRtn.tbl_client.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.tbl_client.A3953DIRE1 = rs01.getString("A3953DIRE1");
                objRtn.tbl_client.A3953COLON = rs01.getString("A3953COLON");
                objRtn.tbl_client.A3953DELEG = rs01.getString("A3953DELEG");
                objRtn.tbl_client.A3953CP = rs01.getString("A3953CP");
                objRtn.tbl_client.A3953LOGO = rs01.getString("A3953LOGO").trim();
                objRtn.tbl_client.A3953PLZCR = rs01.getInt("A3953PLZCR");
                objRtn.tbl_client.A3953TORGN = rs01.getString("A3953TORGN");                                                                                                                      
                //Fetch BLOB from DB
                Blob blb= rs01.getBlob("LOGOBLOB");                
                if( blb != null){
                    byte barr[]=blb.getBytes(1,(int)blb.length());
                    FileOutputStream fout=new FileOutputStream("/Dumps/"+ rs01.getString("A3953LOGO"));                
                    fout.write(barr);                
                    fout.close();  
                }                                
                lstRtn.add(objRtn);
            }
            /*pos 1*/
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new SQP04050Filter();
                    objRtn.tbl_misl.A3961DESC1 = rs02.getString("A3961DESC1");
                    objRtn.tbl_misl.A3961DESC2 = rs02.getString("A3961DESC2");
                    objRtn.tbl_misl.A3961COME1 = rs02.getString("A3961COME1");
                    objRtn.tbl_misl.A3961COME2 = rs02.getString("A3961COME2");
                    lstRtn.add(objRtn);                    
                }
            }
            /*pos 2*/
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objRtn = new SQP04050Filter();
                    objRtn.tbl_misl.A3961DESC1 = rs04.getString("A3961DESC1");
                    objRtn.tbl_misl.A3961DESC2 = rs04.getString("A3961DESC2");
                    objRtn.tbl_misl.A3961COME1 = rs04.getString("A3961COME1");
                    objRtn.tbl_misl.A3961COME2 = rs04.getString("A3961COME2");
                    lstRtn.add(objRtn);                    
                }
            }
            /*pos 3*/
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objRtn = new SQP04050Filter();
                    objRtn.tbl_saldos.A3990TOT  = rs03.getDouble("A3990TOT");
                    objRtn.tbl_saldos.A3990TTLS0 = rs03.getDouble("A3990TTLS0");
                    objRtn.tbl_saldos.A3990TTLS1 = rs03.getDouble("A3990TTLS1");
                    objRtn.tbl_saldos.A3990TTLS2 = rs03.getDouble("A3990TTLS2");
                    objRtn.tbl_saldos.A3990TTLS3 = rs03.getDouble("A3990TTLS3");
                    objRtn.tbl_saldos.A3990TTLS4 = rs03.getDouble("A3990TTLS4");
                    objRtn.tbl_saldos.A3990TTLS5 = rs03.getDouble("A3990TTLS5");
                    objRtn.tbl_saldos.A3990TTLS6 = rs03.getDouble("A3990TTLS6");
                    lstRtn.add(objRtn);                    
                }
            }
            /*pos 4*/
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objRtn = new SQP04050Filter();
                    objRtn.rpteDet.A3958CCUST = rs04.getString("A3958CCUST");
                    objRtn.rpteDet.A3958CIA = rs04.getString("A3958CIA");
                    objRtn.rpteDet.A3958FORMA = rs04.getString("A3958FORMA");
                    objRtn.rpteDet.A3958SERIE = rs04.getString("A3958SERIE");
                    objRtn.rpteDet.A3958SEQ = rs04.getString("A3958SEQ");                    
                    objRtn.rpteDet.A3958FEVTA = rs04.getString("A3958FEVTA");
                    objRtn.rpteDet.A3958NRRPT = rs04.getString("A3958NRRPT");
                    objRtn.rpteDet.A3958PAX = rs04.getString("A3958PAX"); 
                    objRtn.rpteDet.A3958SOLER = rs04.getString("A3958SOLER"); 
                    objRtn.rpteDet.A3958TRNCU = rs04.getString("A3958TRNCU"); 
                    objRtn.rpteDet.A3958RUTA = rs04.getString("A3958RUTA").trim(); 
                    objRtn.rpteDet.A3958CFDI = rs04.getString("A3958CFDI").trim();                    
                    objRtn.rpteDet.A3958MDLOC = rs04.getString("A3958MDLOC");                   
                    objRtn.rpteDet.A3958TOT = rs04.getDouble("A3958TOT");
                    objRtn.rpteDet.ANT_SALDO = rs04.getInt("CANT_DIA");                      
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
}
