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
import net.miatech.beans.A1833Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterTNUDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingMasterTNUDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingMasterTNUDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1833Filter> loadPX168S01A1833(A1833Filter filter) throws SQLException, Exception
    {
        List<A1833Filter> lstRtn = new ArrayList<A1833Filter>(0);
        A1833Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
       
        
        Connection cnx = null;         
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX168S01A1833(?,?,?,?,?,?,?,?)}";
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
          
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);
            
            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_TIPO", filter.IN_TIPO);
            cstmt01.setString("IN_A1833TDOC", filter.IN_A1833TDOC);
            cstmt01.setString("IN_A1833CODIV", filter.IN_A1833CODIV);
                    
            cstmt01.setInt("IO_PAGNUM", PAGINIT);
            cstmt01.setInt("IO_PAGROW", totRowsPag);     
            cstmt01.setInt("IO_TOTPAG", totRows);     
            cstmt01.setInt("IO_TOTROW", filter.page.TOTROW);
            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt("IO_PAGNUM");
            filter.page.PAGROW = cstmt01.getInt("IO_PAGROW");
            filter.page.TOTPAG = cstmt01.getInt("IO_TOTPAG");
            filter.page.TOTROW = cstmt01.getInt("IO_TOTROW");
            
            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt("IO_PAGROW")) {
               totRows = filter.page.TOTROW;
               totPAGS = filter.page.TOTPAG;
            } else {
               try {
                   totRows = cstmt01.getInt("IO_TOTROW");
                   int total =  (int)(totRows / totRowsPag);                                                                    
                   int resto =  (totRows % totRowsPag);                    

                   if(resto>0)
                       totPAGS = total + 1;
                   else
                       totPAGS = total;

               } catch (Exception e) {
                   totPAGS = totRows / totRowsPag;
               }
            }
            
            filter.page.TOTPAG = totPAGS;
            
            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A1833Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1833CCUST = rs01.getString("A1833CCUST");
                objRtn.A1833TDOC = rs01.getString("A1833TDOC");
                objRtn.A1833CONC = rs01.getString("A1833CONC");
                objRtn.A1833CODIV = rs01.getString("A1833CODIV");
                objRtn.A1833SUBTI = rs01.getInt("A1833SUBTI");
                objRtn.A1833TASIN = rs01.getDouble("A1833TASIN");
                objRtn.A1833TASFI = rs01.getDouble("A1833TASFI");
                objRtn.A1833FINI = rs01.getString("A1833FINI");
                objRtn.A1833FFIN = rs01.getString("A1833FFIN");
                objRtn.A1833DESCR = rs01.getString("A1833DESCR");
                objRtn.A1833REGIS = rs01.getString("A1833REGIS");
                objRtn.A1833FREGI = rs01.getString("A1833FREGI");
                objRtn.A1833HREGI = rs01.getString("A1833HREGI");
                objRtn.A1833REGVI = rs01.getString("A1833REGVI");                
                objRtn.A1833FREVI = rs01.getString("A1833FREVI");
                objRtn.A1833HREVI = rs01.getString("A1833HREVI");
                
                objRtn.page.PAGNUM = filter.page.PAGNUM/filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                        
                lstRtn.add(objRtn);
            }            
            
        }
        catch(Exception e){
            String err = e.toString();
        }
        finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        
        return lstRtn;
    }
    
    public String salesAccountMaintanceTNU(A1833Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        Connection cnx = null;
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".PX168S02A1833(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.setString("IN_ACTION",strOption);
            cs.setString("IN_A1833CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A1833TDOC", filter.A1833TDOC);
            cs.setString("IN_A1833CONC", filter.A1833CONC);
            cs.setString("IN_A1833CODIV", filter.A1833CODIV);
            cs.setInt("IN_A1833SUBTI", filter.A1833SUBTI);
            cs.setDouble("IN_A1833TASIN", filter.A1833TASIN);
            cs.setDouble("IN_A1833TASFI", filter.A1833TASFI);
            cs.setString("IN_A1833FINI", filter.A1833FINI);            
            cs.setString("IN_A1833FFIN", filter.A1833FFIN);
            cs.setString("IN_A1833DESCR", filter.A1833DESCR);            
            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FEC", Functions.getFechaActual());
            cs.setString("IN_HOR", Functions.getHoraActual());            
            cs.setString("IN_A1833TDOC_OLD", filter.IN_A1833TDOC_OLD);
            cs.setString("IN_A1833CONC_OLD", filter.IN_A1833CONC_OLD);
            cs.setString("IN_A1833CODIV_OLD", filter.IN_A1833CODIV_OLD);
            cs.setDouble("IN_A1833TASIN_OLD", Double.parseDouble("0" + filter.IN_A1833TASIN_OLD));
            cs.setDouble("IN_A1833TASFI_OLD", Double.parseDouble("0" + filter.IN_A1833TASFI_OLD));
            cs.setString("IN_A1833FINI_OLD", filter.IN_A1833FINI_OLD);
            cs.setString("IN_A1833FFIN_OLD", filter.IN_A1833FFIN_OLD);
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }    
}
