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
import net.miatech.praxis.eecta.SQP03873Filter;
import net.miatech.praxis.eecta.SQP03874Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class SalesListDAO {

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

    public List<SQP03873Filter> getSQP01558Filter(SQP03873Filter filter) throws SQLException, Exception {
        List<SQP03873Filter> lstRtn = new ArrayList<SQP03873Filter>(0);
        SQP03873Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03873(?,?,?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString(7, filter.VP_NRRPT);
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
                objRtn = new SQP03873Filter();
                objRtn.A3957NRRPT = rs01.getString("A3957NRRPT");
                objRtn.A3957CDCLI = rs01.getString("A3957CDCLI");
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.A3957CONTR = rs01.getString("A3957CONTR");
                objRtn.A3957FEECC = rs01.getString("A3957FEECC");
                objRtn.A3957INIPR = rs01.getString("A3957INIPR");
                objRtn.A3957FINPR = rs01.getString("A3957FINPR");
                objRtn.A3957REFBC = rs01.getString("A3957REFBC");
                
                objRtn.A3957MDLOC = rs01.getString("A3957MDLOC");
                objRtn.A3957FARE = rs01.getDouble("A3957FARE");
                objRtn.A3957IVA = rs01.getDouble("A3957IVA");
                objRtn.A3957TUA = rs01.getDouble("A3957TUA");
                objRtn.A3957YR = rs01.getDouble("A3957YR");
                objRtn.A3957YQ = rs01.getDouble("A3957YQ");
                objRtn.A3957OTR = rs01.getDouble("A3957OTR");
                objRtn.A3957TOT = rs01.getDouble("A3957TOT");
                objRtn.A3957TOTLT = rs01.getString("A3957TOTLT");
                
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
        
    public List<SQP03874Filter> getSQP03874Filter(SQP03874Filter filter) throws SQLException, Exception {
        List<SQP03874Filter> lstRtn = new ArrayList<SQP03874Filter>(0);
        SQP03874Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null , rs03 = null, rs04 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03874(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A3957NRRPT);
            cstmt01.setString(3, filter.VP_A3957CDCLI);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            
            //this.setSQP03875(); tmp
            
            /*pos 0*/
            while (rs01.next()) {
                objRtn = new SQP03874Filter();
                objRtn.rpteCab.A3957NRRPT = rs01.getString("A3957NRRPT");                                        
                objRtn.rpteCab.A3957CDCLI = rs01.getString("A3957CDCLI");                
                objRtn.rpteCab.A3957CONTR = rs01.getString("A3957CONTR");
                objRtn.rpteCab.A3957FEECC = rs01.getString("A3957FEECC");
                objRtn.rpteCab.A3957INIPR = rs01.getString("A3957INIPR");
                objRtn.rpteCab.A3957FINPR = rs01.getString("A3957FINPR");
                objRtn.rpteCab.A3957REFBC = rs01.getString("A3957REFBC");
                objRtn.rpteCab.A3957MDLOC = rs01.getString("A3957MDLOC");
                objRtn.rpteCab.A3957FARE = rs01.getDouble("A3957FARE");
                objRtn.rpteCab.A3957IVA = rs01.getDouble("A3957IVA");
                objRtn.rpteCab.A3957TUA = rs01.getDouble("A3957TUA");
                objRtn.rpteCab.A3957YR = rs01.getDouble("A3957YR");
                objRtn.rpteCab.A3957YQ = rs01.getDouble("A3957YQ");
                objRtn.rpteCab.A3957OTR = rs01.getDouble("A3957OTR");
                objRtn.rpteCab.A3957TOT = rs01.getDouble("A3957TOT");
                objRtn.rpteCab.A3957TOTLT = rs01.getString("A3957TOTLT");
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
                    objRtn = new SQP03874Filter();
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
                    objRtn = new SQP03874Filter();
                    objRtn.tbl_misl.A3961DESC1 = rs04.getString("A3961DESC1");
                    objRtn.tbl_misl.A3961DESC2 = rs04.getString("A3961DESC2");
                    objRtn.tbl_misl.A3961COME1 = rs04.getString("A3961COME1");
                    objRtn.tbl_misl.A3961COME2 = rs04.getString("A3961COME2");
                    lstRtn.add(objRtn);                    
                }
            }
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objRtn = new SQP03874Filter();
                    objRtn.rpteDet.A3958CCUST = rs03.getString("A3958CCUST");
                    objRtn.rpteDet.A3958CIA = rs03.getString("A3958CIA");
                    objRtn.rpteDet.A3958FORMA = rs03.getString("A3958FORMA");
                    objRtn.rpteDet.A3958SERIE = rs03.getString("A3958SERIE");
                    objRtn.rpteDet.A3958SEQ = rs03.getString("A3958SEQ");                    
                    objRtn.rpteDet.A3958FEECC = rs03.getString("A3958FEECC");
                    objRtn.rpteDet.A3958FECPR = rs03.getString("A3958FECPR");
                    objRtn.rpteDet.A3958SOLER = rs03.getString("A3958SOLER");   
                    objRtn.rpteDet.A3958GESTR = rs03.getString("A3958GESTR");   
                    objRtn.rpteDet.A3958CFDI = rs03.getString("A3958CFDI");   
                    objRtn.rpteDet.A3958RFC = rs03.getString("A3958RFC");   
                    objRtn.rpteDet.A3958FECTB = rs03.getString("A3958FECTB");   
                    objRtn.rpteDet.A3958TRNCU = rs03.getString("A3958TRNCU");                                          
                    objRtn.rpteDet.A3958FEVTA= rs03.getString("A3958FEVTA");   
                    objRtn.rpteDet.A3958PAX = rs03.getString("A3958PAX");  
                    objRtn.rpteDet.A3958RUTA = rs03.getString("A3958RUTA");  
                    objRtn.rpteDet.A3958FARE = rs03.getDouble("A3958FARE");
                    objRtn.rpteDet.A3958IVA = rs03.getDouble("A3958IVA");
                    objRtn.rpteDet.A3958TUA = rs03.getDouble("A3958TUA");
                    objRtn.rpteDet.A3958YR = rs03.getDouble("A3958YR");
                    objRtn.rpteDet.A3958YQ = rs03.getDouble("A3958YQ");
                    objRtn.rpteDet.A3958OTR = rs03.getDouble("A3958OTR");
                    objRtn.rpteDet.A3958TOT = rs03.getDouble("A3958TOT");                                        
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
