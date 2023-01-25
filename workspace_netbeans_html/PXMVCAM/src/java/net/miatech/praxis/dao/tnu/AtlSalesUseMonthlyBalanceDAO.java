/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.dao.tnu;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX228S01Filter;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class AtlSalesUseMonthlyBalanceDAO {
    private IServerSession session; 
    private static final Logger logError = Logger.getLogger("errorLog");
    public AtlSalesUseMonthlyBalanceDAO(){        
    }
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
     public AtlSalesUseMonthlyBalanceDAO(IServerSession ss) {
        session = ss;
    }
    
    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX228S01Filter> loadPX228S01A1890(PX228S01Filter filter) throws Exception
    {
        List<PX228S01Filter> lstRtn = new ArrayList<>(0);
        PX228S01Filter objRtn;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX228S01A1890(?,?)}";

        Connection cnx = null;         
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PER);
            cstmt01.execute();            
            rs01 = cstmt01.getResultSet();            
            while (rs01.next()) {                
                objRtn = new PX228S01Filter();
                objRtn.CCUST    = rs01.getString("CCUST");
                objRtn.PER      = rs01.getString("PER").trim();
                objRtn.MES      = rs01.getString("MES").trim();
                objRtn.MES2     = rs01.getString("MES2").trim();
                objRtn.SALE     = rs01.getDouble("SALE");
                objRtn.ENE      = rs01.getDouble("ENE");
                objRtn.FEB      = rs01.getDouble("FEB");               
                objRtn.MAR      = rs01.getDouble("MAR");
                objRtn.ABR      = rs01.getDouble("ABR");
                objRtn.MAY      = rs01.getDouble("MAY");
                objRtn.JUN      = rs01.getDouble("JUN");
                objRtn.JUL      = rs01.getDouble("JUL");
                objRtn.AGO      = rs01.getDouble("AGO");
                objRtn.SET      = rs01.getDouble("SET");
                objRtn.OCT      = rs01.getDouble("OCT");
                objRtn.NOV      = rs01.getDouble("NOV");
                objRtn.DIC      = rs01.getDouble("DIC");
                objRtn.SALDO    = rs01.getDouble("SALDO");
                objRtn.LAST    = rs01.getDouble("LAST");
                objRtn.POST    = rs01.getDouble("POST");
                lstRtn.add(objRtn);
            }        
         }catch(Exception ex){
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
}
