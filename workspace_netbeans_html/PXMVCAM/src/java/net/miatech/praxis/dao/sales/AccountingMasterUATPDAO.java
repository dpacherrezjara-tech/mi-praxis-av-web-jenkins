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
import net.miatech.beans.A1820Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterUATPDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingMasterUATPDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingMasterUATPDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

     public List<A1820Filter> loadPX161S01A1820(A1820Filter filter) throws SQLException, Exception
    {
        List<A1820Filter> lstRtn = new ArrayList<>(0);
        A1820Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
     
        //String SQLCLL01 = "{CALL LIBSAP23.PX161S01A1820(?,?,?,?,?,?,?,?,?,?)}";
        
        Connection cnx = null;
         
        try {
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
             String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04221(?,?,?,?,?,?,?,?,?,?,?)}"; // CAMBIAMOS SP PRAXIS.PX161S01A1820
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, "139");//filter.IN_A1717CCUST
            cstmt01.setString(2, filter.IN_FILTRO);
            cstmt01.setString(3, filter.A1820CLIEN);
            cstmt01.setString(4, filter.A1820TCUAT);
            cstmt01.setString(5, filter.A1820CTA);
            cstmt01.setString(6, filter.A1820SCTA);
            cstmt01.setInt(7, PAGINIT);
            cstmt01.setInt(8, totRowsPag);     
            cstmt01.setInt(9, totRows);     
            cstmt01.setInt(10, filter.page.TOTROW);
            cstmt01.setString(11, filter.A1820MODO);
            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);
            
            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(8)) {
               totRows = filter.page.TOTROW;
               totPAGS = filter.page.TOTPAG;
            } else {
               try {
                   totRows = cstmt01.getInt(10);
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
                objRtn = new A1820Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1820TCUAT = rs01.getString("A1820TCUAT");
                objRtn.A1820DESCR = rs01.getString("A1820DESCR");
                objRtn.A1820CLIEN = rs01.getString("A1820CLIEN");
                objRtn.A1820DIREC = rs01.getString("A1820DIREC");
                objRtn.A1820TIPO = rs01.getString("A1820TIPO");
                objRtn.A1820DOCU = rs01.getString("A1820DOCU");
                objRtn.A1820CIA = rs01.getString("A1820CIA");
                objRtn.A1820UNID = rs01.getString("A1820UNID");
                objRtn.A1820CECO = rs01.getString("A1820CECO");
                objRtn.A1820UBI = rs01.getString("A1820UBI");
                objRtn.A1820CTA = rs01.getString("A1820CTA");
                objRtn.A1820SCTA = rs01.getString("A1820SCTA");
                objRtn.A1820EQUI = rs01.getString("A1820EQUI");
                objRtn.A1820ICIA = rs01.getString("A1820ICIA");                                
                objRtn.A1820FINI = Functions.getMonthConvertDate(rs01.getString("A1820FINI"));
                objRtn.A1820FFIN = Functions.getMonthConvertDate(rs01.getString("A1820FFIN"));
                objRtn.A1820MODO = rs01.getString("A1820MODO");
                
                objRtn.A1820REGVI = rs01.getString("A1820REGVI");
                objRtn.A1820FREVI = Functions.getMonthConvertDate(rs01.getString("A1820FREVI"));
                objRtn.A1820HREVI = Functions.ConvertedTime(rs01.getString("A1820HREVI"));
                objRtn.A1820REGIS = rs01.getString("A1820REGIS");
                objRtn.A1820FREGI = Functions.getMonthConvertDate(rs01.getString("A1820FREGI"));
                objRtn.A1820HREGI = Functions.ConvertedTime(rs01.getString("A1820HREGI"));
                
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
    
    public String salesAccountMaintanceClient(A1820Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        Connection cnx = null;
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".PX161S02A1820(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, "139");
            cs.setString(3, filter.A1820TCUAT);
            cs.setString(4, filter.A1820DESCR);
            cs.setString(5, filter.A1820CLIEN);
            cs.setString(6, filter.A1820DIREC);
            cs.setString(7, filter.A1820TIPO);
            cs.setString(8, filter.A1820DOCU);
            cs.setString(9, filter.A1820CIA);
            cs.setString(10, filter.A1820UNID);
            cs.setString(11, filter.A1820CECO);
            cs.setString(12, filter.A1820UBI);
            cs.setString(13, filter.A1820CTA);
            cs.setString(14, filter.A1820SCTA);
            cs.setString(15, filter.A1820EQUI);
            cs.setString(16, filter.A1820ICIA);
            
            cs.setString(17, filter.A1820FINI);
            cs.setString(18, filter.A1820FFIN);
            
            cs.setString(19, session.getUserView().getUserInfo().USR);
            cs.setString(20, Functions.getFechaActual());
            cs.setString(21, Functions.getHoraActual());
            cs.setString(22, filter.A1820MODO);
            cs.setString(23, filter.IN_A1820TCUAT_OLD);
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
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }    


}
