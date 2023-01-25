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
import net.miatech.beans.PX226S01Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class MonthlyTNUBalanceDAO {
    private IServerSession session; 
    private static final Logger logError = Logger.getLogger("errorLog");
    private ResultSet rst = null;
    private Connection cnx = null;
    private CallableStatement cs = null;
    public MonthlyTNUBalanceDAO(){        
    }
    
        public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
        
    public MonthlyTNUBalanceDAO(IServerSession ss) {
        session = ss;
    }
    
    public void setSession(IServerSession ss) {
        session = ss;
    }
    public List<PX226S01Filter> loadPX226S01(PX226S01Filter filter) throws Exception
    {
        List<PX226S01Filter> lstRtn = new ArrayList<PX226S01Filter>(0);
        PX226S01Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP00880(?,?)}";
        Connection cnx = null;         
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PERIODO);
            
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();            
            while (rs01.next()) {
                
                objRtn = new PX226S01Filter();
                objRtn.CCUST = rs01.getString("CCUST").trim();
                objRtn.PERIODO = rs01.getString("PERIODO");
                objRtn.ORDEN = rs01.getString("ORDEN");
                objRtn.CODIGO = rs01.getString("CODIGO");
                objRtn.CONCEPTO = rs01.getString("CONCEPTO").trim();
                
                objRtn.ENE = rs01.getDouble("ENE");
                objRtn.FEB = rs01.getDouble("FEB");
                objRtn.MAR = rs01.getDouble("MAR");
                objRtn.ABR = rs01.getDouble("ABR");                
                objRtn.MAY = rs01.getDouble("MAY");
                objRtn.JUN = rs01.getDouble("JUN");
                objRtn.JUL = rs01.getDouble("JUL");
                objRtn.AGO = rs01.getDouble("AGO");                
                objRtn.SET = rs01.getDouble("SET");
                objRtn.OCT = rs01.getDouble("OCT");
                objRtn.NOV = rs01.getDouble("NOV");
                objRtn.DIC = rs01.getDouble("DIC");                                              
                objRtn.TOT = rs01.getDouble("ENE")+ 
                             rs01.getDouble("FEB")+
                             rs01.getDouble("MAR")+
                             rs01.getDouble("ABR")+
                             rs01.getDouble("MAY")+
                             rs01.getDouble("JUN")+
                             rs01.getDouble("JUL")+
                             rs01.getDouble("AGO")+
                             rs01.getDouble("SET")+
                             rs01.getDouble("OCT")+
                             rs01.getDouble("NOV")+
                             rs01.getDouble("DIC");
                
                lstRtn.add(objRtn);
            }        
        }
        catch(SQLException ex)
        {
            String err = ex.getMessage();
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + ex.getMessage() ,ex);
        }        
        catch(Exception ex)
        {
            String err = ex.getMessage();
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + ex.getMessage() ,ex);
        }
        finally {
            setClose();
        }
         
         return lstRtn; 
    }
    
      private void setClose() {
        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }
    
} 
