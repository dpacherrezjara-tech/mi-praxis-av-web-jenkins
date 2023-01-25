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
import net.miatech.beans.A1769Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterZoneGSADAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingMasterZoneGSADAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingMasterZoneGSADAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1769Filter> loadPX215S01A1769(A1769Filter filter) throws SQLException, Exception{
        List<A1769Filter> lstRtn = new ArrayList<>(0);
        A1769Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

      

        Connection cnx = null;         
        try {
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX215S01A1769(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1769CCUST.trim());
            cstmt01.setString(2, filter.IN_A1769CATEG.trim());            
            cstmt01.setString(3, filter.IN_A1769VALOR.trim());
            
            cstmt01.setInt(4, PAGINIT);
            cstmt01.setInt(5, totRowsPag);     
            cstmt01.setInt(6, totRows);     
            cstmt01.setInt(7, filter.page.TOTROW);     

            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);
            
            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(6)) {
               totRows = filter.page.TOTROW;
               totPAGS = filter.page.TOTPAG;
            } else {
               try {
                   totRows = cstmt01.getInt(7);
                   int total =  (int)(totRows / 20);                                                                    
                   int resto =  (totRows % 20);                    

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
                objRtn = new A1769Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1769CCUST = rs01.getString("A1769CCUST").trim();
                objRtn.A1769CATEG = rs01.getString("A1769CATEG").trim();
                objRtn.A1769CODIG = rs01.getString("A1769CODIG").trim();
                objRtn.A1769VALOR = rs01.getString("A1769VALOR");
                objRtn.A1769FINI = Functions.getMonthConvertDate(rs01.getString("A1769FINI"));
                objRtn.A1769FFIN= Functions.getMonthConvertDate(rs01.getString("A1769FFIN"));
                objRtn.A1769DESC = rs01.getString("A1769DESC");
                objRtn.A1769REGIS = rs01.getString("A1769REGIS");
                objRtn.A1769FREGI = Functions.getMonthConvertDate(rs01.getString("A1769FREGI"));
                objRtn.A1769HREGI = Functions.ConvertedTime(rs01.getString("A1769HREGI"));
                objRtn.A1769REGVI = rs01.getString("A1769REGVI");
                objRtn.A1769FREVI = Functions.getMonthConvertDate(rs01.getString("A1769FREVI"));
                objRtn.A1769HREVI = Functions.ConvertedTime(rs01.getString("A1769HREVI"));
                                
                objRtn.page.PAGNUM = filter.page.PAGNUM/filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
             
         }finally {
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

    public String accountMaintance(A1769Filter filter, String strOption) throws SQLException, Exception {
        
        String strSQL;
        String STR_RESULT = "";
        
       
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".PX215S02A1769(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, filter.A1769CCUST);
            cs.setString(3, filter.A1769CATEG);
            cs.setString(4, filter.A1769CODIG);
            cs.setString(5, filter.A1769VALOR);
            cs.setString(6, filter.A1769FINI);
            cs.setString(7, filter.A1769FFIN);
            cs.setString(8, filter.A1769DESC);                      
            cs.setString(9, session.getUserView().getUserInfo().USR);
            cs.setString(10, Functions.getFechaActual());
            cs.setString(11, Functions.getHoraActual());
            cs.setString(12, filter.IN_A1769CATEG_OLD);
            cs.setString(13, filter.IN_A1769CODIG_OLD);
            cs.setString(14, filter.IN_A1769FINI_OLD);
            cs.setString(15, filter.IN_A1769FFIN_OLD);
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
