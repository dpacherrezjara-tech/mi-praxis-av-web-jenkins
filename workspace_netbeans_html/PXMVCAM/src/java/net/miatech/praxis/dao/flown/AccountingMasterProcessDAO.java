/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxisbi.A1955Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterProcessDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingMasterProcessDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingMasterProcessDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1955Filter> search(A1955Filter filter) throws SQLException, Exception {
        List<A1955Filter> lstRtn = new ArrayList(0);
        A1955Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null, cstmt02 = null;
        ResultSet rs01 = null, rs02 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP00892(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setString("IN_A1955CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_A1955MODUL", filter.IN_MODULO);
            cstmt01.setString("IN_FINI", filter.IN_FECHA_PROCESO);
            cstmt01.setString("IN_FFIN", filter.IN_FECHA_ACUSE);
            cstmt01.setString("IN_A1955STATU", filter.A1955STATU);

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
                    int total = (int) (totRows / totRowsPag);
                    int resto = (totRows % totRowsPag);

                    if (resto > 0) {
                        totPAGS = total + 1;
                    } else {
                        totPAGS = total;
                    }

                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            filter.page.TOTPAG = totPAGS;

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A1955Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1955CCUST = rs01.getString("A1955CCUST").trim();
                objRtn.A1955ENVIO = rs01.getString("A1955ENVIO").trim();
                objRtn.A1955MODUL = rs01.getString("A1955MODUL").trim();
                objRtn.MODULE = rs01.getString("MODULE").trim();
                objRtn.ACCION = rs01.getString("ACCION").trim();
                objRtn.ESTADO = rs01.getString("ESTADO").trim();
                objRtn.A1955FPROC = rs01.getString("A1955FPROC").trim();
                objRtn.A1955ACTIO = rs01.getString("A1955ACTIO").trim();
                objRtn.A1955STATU = rs01.getString("A1955STATU").trim();
                objRtn.A1955PRIOR = rs01.getString("A1955PRIOR").trim();
                objRtn.A1955USRIN = rs01.getString("A1955USRIN").trim();
                objRtn.A1955FECIN = rs01.getString("A1955FECIN").trim();
                objRtn.A1955HORIN = rs01.getString("A1955HORIN").trim();
                objRtn.A1955USRAC = rs01.getString("A1955USRAC").trim();
                objRtn.A1955FECAC = rs01.getString("A1955FECAC").trim();
                objRtn.A1955HORAC = rs01.getString("A1955HORAC").trim();
                objRtn.A1955KEY2 = rs01.getString("A1955KEY2").trim();
                objRtn.A1955KEY4 = rs01.getString("A1955KEY4").trim();

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            String str = ex.getMessage();
            str = "";
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public String consistenciaFlown(A1955Filter filter) throws SQLException, Exception {       
        String strSQL;
        String STR_RESULT = "";       
       
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP02334(?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);            
            cs.setString(2, filter.IN_FECHA_PROCESO);            
            cs.execute();
            
            rst = cs.getResultSet();     
            STR_RESULT = "OK";
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
            STR_RESULT = "ERROR";
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }
    
      public String accountMaintance(A1955Filter filter, String strOption) throws SQLException, Exception {
       
        String strSQL;
        String STR_RESULT = "";        
        
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00902(?,?,?,?,?,?,?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.A1955MODUL);            
            cs.setString(4, filter.IN_FECHA_PROCESO);
            cs.setString(5, session.getUserView().getUserInfo().USR);
            cs.setString(6, Functions.getFechaActual());
            cs.setString(7, Functions.getHoraActual());
            cs.setString(8, filter.A1955KEY2);
            cs.setString(9, filter.A1955KEY4);
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
      
    public String accountMaintancePendingFlown(A1955Filter filter, String strOption) throws SQLException, Exception  {
        String strSQL;
        String STR_RESULT = "";
        
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP02859(?,?,?,?,?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.A1955MODUL);            
            cs.setString(4, filter.IN_FECHA_PROCESO);
            cs.setString(5, session.getUserView().getUserInfo().USR);
            cs.setString(6, Functions.getFechaActual());
            cs.setString(7, Functions.getHoraActual());
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

    public String reversaFlown(A1955Filter filter) throws SQLException,Exception {
        String strSQL;
        String STR_RESULT = "";

        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".QRY_REVERTIR_FLOWN(?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, filter.IN_FECHA_PROCESO);            
            cs.setString(2, filter.IN_ENVIO.equals("true")? "Y" : "N");            
            cs.execute();
            
            rst = cs.getResultSet();            
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }
    
    public A1955Filter searchReversa(A1955Filter filter) throws SQLException,Exception
    {
        A1955Filter objRtn = new A1955Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        String SQLCLL01 = "{CALL PRAXIS.SQP02287(?,?,?)}";

        Connection cnx = null;
        
        try {            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();           
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_FPROC", filter.A1955FPROC);
            cstmt01.setString("IN_TIPO", filter.IN_MODULO);
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {                
                objRtn.A1955FPROC = rs01.getString("A1716FPRO").trim();                
                objRtn.A1955FECIN = rs01.getString("A1716FREGI").trim();
                objRtn.A1955QCPNR = rs01.getInt("CANTIDAD");              
            }        
         }catch(Exception ex){
             String str = ex.getMessage();
             str = "";
         }finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
         
         return objRtn; 
    }
}
