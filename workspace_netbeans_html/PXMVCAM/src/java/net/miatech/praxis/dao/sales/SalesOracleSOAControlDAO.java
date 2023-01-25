/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.praxisbi.filter.A3701Filter;
import net.miatech.praxisbi.filter.A3702Filter;
import java.util.List;
import java.util.ArrayList;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;
import java.sql.Connection;

/**
 *
 * @author asifuentes
 */
public class SalesOracleSOAControlDAO {
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesOracleSOAControlDAO(){
        
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
        
    public SalesOracleSOAControlDAO(IServerSession ss) {
        session = ss;
    }
    
    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A3701Filter> SQP03245(A3701Filter filter) throws SQLException, Exception
    {
        List<A3701Filter> lstRtn = new ArrayList<A3701Filter>(0);
        A3701Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP03245(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
                        
            while (rs01.next()) {
                objRtn = new A3701Filter();
                objRtn.A3701CCUST = rs01.getString("A3701CCUST");
                objRtn.A3701MODUL = rs01.getString("A3701MODUL");
                objRtn.A3701MODS1 = rs01.getString("A3701MODS1");
                objRtn.A3701MODS2 = rs01.getString("A3701MODS2");
                objRtn.A3701FLAG = rs01.getInt("A3701FLAG");
                objRtn.A3701FECCR = rs01.getString("A3701FECCR");
                objRtn.A3701HORCR = rs01.getString("A3701HORCR");
                objRtn.A3701USRCR = rs01.getString("A3701USRCR");
                objRtn.A3701FECAC = rs01.getString("A3701FECAC");
                objRtn.A3701HORAC = rs01.getString("A3701HORAC");
                objRtn.A3701USRAC = rs01.getString("A3701USRAC");
                objRtn.A3701USRPR = rs01.getString("A3701USRPR");
                
                objRtn.FLAG = rs01.getString("FLAG");
                objRtn.SCHEDULE = rs01.getInt("SCHEDULE");
                objRtn.FECCR = rs01.getString("FECCR");
                objRtn.HORCR = rs01.getString("HORCR");
                objRtn.FECAC = rs01.getString("FECAC");
                objRtn.HORAC = rs01.getString("HORAC");
                objRtn.FPROGINI = rs01.getString("FPROGINI");
                objRtn.HPROGINI = rs01.getString("HPROGINI");
                objRtn.FPROGFIN = rs01.getString("FPROGFIN");
                objRtn.HPROGFIN = rs01.getString("HPROGFIN");

                lstRtn.add(objRtn);
            }        
         } catch(SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e);
         } finally {
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
    

    public String SQP03246(A3701Filter filter) throws SQLException , Exception{
        CallableStatement cs;
        ResultSet rst; 
        String STR_RESULT = "";
        
        session.getCNXIBMDB2().open();
        try {    
            String SQLCLL01 = "{CALL PRAXIS.SQP03246(?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_MODUL", filter.IN_MODUL.trim());
            cs.setInt("IN_FLAG", filter.IN_FLAG);
            cs.setString("IN_OBSER", filter.IN_OBSER);
            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e);
        } finally {
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }
    
    public List<A3702Filter> SQP03247(A3701Filter filter) throws SQLException, Exception
    {
        List<A3702Filter> lstRtn = new ArrayList<A3702Filter>(0);
        A3702Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP03247(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_MODUL",filter.A3701MODUL.trim());
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            
            while (rs01.next()) {
                objRtn = new A3702Filter();
                objRtn.A3702CCUST = rs01.getString("A3702CCUST");
                objRtn.A3702MODUL = rs01.getString("A3702MODUL");
                objRtn.A3702FLAG = rs01.getInt("A3702FLAG");
                objRtn.A3702OBSER = rs01.getString("A3702OBSER");
                
                objRtn.FLAG = rs01.getString("FLAG");
                objRtn.FECCR = rs01.getString("FECCR");
                objRtn.HORCR = rs01.getString("HORCR");
                objRtn.A3702USRCR = rs01.getString("A3702USRCR");

                lstRtn.add(objRtn);
            }        
         } catch(SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e);
         } finally {
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
    
    public String SQP03248(A3701Filter filter) throws SQLException , Exception{
        CallableStatement cs;
        ResultSet rst;
        String STR_RESULT = "";
        
        session.getCNXIBMDB2().open();
        try {    
            String SQLCLL01 = "{CALL PRAXIS.SQP03248(?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_FECHA_INI", filter.IN_FECHA_INI);
            cs.setString("IN_HORA_INI", filter.IN_HORA_INI);
            cs.setString("IN_FECHA_FIN", filter.IN_FECHA_FIN);
             cs.setString("IN_HORA_FIN", filter.IN_HORA_FIN);
            cs.setInt("IN_FLAG", filter.IN_FLAG);
            cs.setString("IN_OBSER", filter.IN_OBSER);
            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e);
        } finally {
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }
}