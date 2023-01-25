package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxisbi.A1955Filter;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ConsortiaAdjDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public ConsortiaAdjDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1955Filter> search(A1955Filter filter) throws SQLException, Exception {
        List<A1955Filter> lstRtn = new ArrayList(0);
        A1955Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        strSQL = "{CALL PRAXIS.SQP00892(?,?,?,?,?,?,?,?,?)}";
        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cs.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cs.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cs.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cs.setString("IN_A1955CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A1955MODUL", filter.IN_MODULO);
            cs.setString("IN_FINI", filter.IN_FECHA_PROCESO);
            cs.setString("IN_FFIN", filter.IN_FECHA_ACUSE);
            cs.setString("IN_A1955STATU", filter.A1955STATU);            
            
            cs.setInt("IO_PAGNUM", PAGINIT);
            cs.setInt("IO_PAGROW", totRowsPag);     
            cs.setInt("IO_TOTPAG", totRows);     
            cs.setInt("IO_TOTROW", filter.page.TOTROW); 

            cs.execute();
            
            filter.page.PAGNUM = cs.getInt("IO_PAGNUM");
            filter.page.PAGROW = cs.getInt("IO_PAGROW");
            filter.page.TOTPAG = cs.getInt("IO_TOTPAG");
            filter.page.TOTROW = cs.getInt("IO_TOTROW");
            
            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cs.getInt("IO_PAGROW")) {
               totRows = filter.page.TOTROW;
               totPAGS = filter.page.TOTPAG;
            } else {
               try {
                   totRows = cs.getInt("IO_TOTROW");
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
            
            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                objRtn = new A1955Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1955CCUST = rst.getString("A1955CCUST").trim();
                objRtn.A1955ENVIO = rst.getString("A1955ENVIO").trim();
                objRtn.A1955MODUL = rst.getString("A1955MODUL").trim();
                objRtn.MODULE = rst.getString("MODULE").trim();
                objRtn.ACCION = rst.getString("ACCION").trim();
                objRtn.ESTADO = rst.getString("ESTADO").trim();                
                objRtn.A1955FPROC = rst.getString("A1955FPROC").trim();
                objRtn.A1955ACTIO = rst.getString("A1955ACTIO").trim();
                objRtn.A1955STATU = rst.getString("A1955STATU").trim();                                             
                objRtn.A1955PRIOR = rst.getString("A1955PRIOR").trim();                
                objRtn.A1955USRIN = rst.getString("A1955USRIN").trim();
                objRtn.A1955FECIN = rst.getString("A1955FECIN").trim();
                objRtn.A1955HORIN = rst.getString("A1955HORIN").trim();
                objRtn.A1955USRAC = rst.getString("A1955USRAC").trim();
                objRtn.A1955FECAC = rst.getString("A1955FECAC").trim();
                objRtn.A1955HORAC = rst.getString("A1955HORAC").trim();
                objRtn.A1955KEY2 = rst.getString("A1955KEY2").trim();
                objRtn.A1955KEY4 = rst.getString("A1955KEY4").trim();
                
                objRtn.page.PAGNUM = filter.page.PAGNUM/filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }        
         }finally {
            setClose();
        }
         
         return lstRtn; 
    }
    
    public List<A1955Filter> SQP04042(A1955Filter filter) throws SQLException, Exception {
        List<A1955Filter> lstRtn = new ArrayList(0);
        A1955Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        strSQL = "{CALL " + session.getMainLibrary() + ".SQP04042(?,?)}";
        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(strSQL);
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_FPROC", filter.IN_FECHA_PROCESO);            
            cs.execute();
            
            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                objRtn = new A1955Filter();
                objRtn.A1955ERRLG = rst.getString("A3991GRUPO").trim();
                lstRtn.add(objRtn);
            }        
         }finally {
            setClose();
        }
         
         return lstRtn; 
    }
    
    public String accountMaintance(A1955Filter filter, String strOption) throws SQLException, Exception {
        String STR_RESULT = "";
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00902(?,?,?,?,?,?,?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
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
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } finally {
            setClose();
        }

        return STR_RESULT;
    }   
    
    public A1955Filter searchReversa(A1955Filter filter) throws SQLException
    {
        A1955Filter objRtn = new A1955Filter();       
        
        try {            
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP02287(?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();           
            cs = cnx.prepareCall(strSQL);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_FPROC", filter.A1955FPROC);
            cs.setString("IN_TIPO", filter.IN_MODULO);
            cs.execute();
            
            rst = cs.getResultSet();     
            while (rst.next()) {            
                objRtn.A1955FPROC = rst.getString("A1716FPRO").trim();                
                objRtn.A1955FECIN = rst.getString("A1716FREGI").trim();
                objRtn.A1955QCPNR = rst.getInt("CANTIDAD");              
            }        
         }catch(Exception ex){
             String str = ex.getMessage();
         }finally {
            setClose();
        }
         
         return objRtn; 
    }
    
     public String reversaSales(A1955Filter filter,String fuente, String tipo) throws SQLException {
        String STR_RESULT = "";
        
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00690(?,?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, filter.IN_FECHA_PROCESO);            
            cs.setString(2, fuente);
            cs.setString(3, tipo);
            cs.setString(4, filter.IN_FECHA_CONTABLE);
            cs.execute();
            
            rst = cs.getResultSet();            
            //try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            STR_RESULT = e.getMessage();
        } finally {
            setClose();
        }

        return STR_RESULT;
    }
     
     public String reversaSalesReg(String fechaproceso, String fecharegistro,String tipo) throws SQLException {
        String STR_RESULT = "";
        
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00884(?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, tipo);            
            cs.setString(2, fecharegistro);
            cs.setString(3, fechaproceso);
            cs.execute();
            
            rst = cs.getResultSet();            
            //try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            STR_RESULT = e.getMessage();
        } finally {
            setClose();
        }

        return STR_RESULT;
    }
     
     public String reversaInterlineAP(A1955Filter filter) throws SQLException {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        Connection cnx = null;
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04149(?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);            
            cs.setString(2, filter.IN_FECHA_PROCESO);
            cs.execute();
            
            rst = cs.getResultSet();            
            //try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            setClose();
        }

        return STR_RESULT;
    }
    
    public String reversaInterlineAR(A1955Filter filter) throws SQLException {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        Connection cnx = null;
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04148(?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);            
            cs.setString(2, filter.IN_FECHA_PROCESO.substring(0, 6));
            cs.setString(3, filter.IN_FECHA_PROCESO.substring(6, 8));
            cs.execute();
            
            rst = cs.getResultSet();            
            //try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            setClose();
        }

        return STR_RESULT;
    }
    
    public String reversaFlown(A1955Filter filter) throws SQLException {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        Connection cnx = null;
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".QRY_REVERTIR_FLOWN(?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, filter.IN_FECHA_PROCESO);            
            cs.setString(2, filter.IN_ENVIO.equals("true")? "Y" : "N");            
            cs.execute();
            
            rst = cs.getResultSet();            
            //try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            setClose();
        }

        return STR_RESULT;
    }
    
    public String consistenciaFlown(A1955Filter filter) throws SQLException {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        Connection cnx = null;
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP02334(?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);            
            cs.setString(2, filter.IN_FECHA_PROCESO);            
            cs.execute();
            
            rst = cs.getResultSet();     
            STR_RESULT = "OK";
            //try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
            STR_RESULT = "ERROR";
        } finally {
            strSQL = null;
            setClose();
        }

        return STR_RESULT;
    }
     
    public String reversaCaducos(A1955Filter filter) throws SQLException{
        String STR_RESULT = "";
        
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP02790(?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);            
            cs.setString(2, filter.IN_FECHA_PROCESO.substring(0, 6));
            cs.execute();
            
            rst = cs.getResultSet();            
            //try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            STR_RESULT = e.getMessage();
        } finally {
            setClose();
        }

        return STR_RESULT;
    }
    
    public String accountMaintancePending(A1955Filter filter, String strOption) throws SQLException {
        String STR_RESULT = "";
        
        Connection cnx = null;
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP02858(?,?,?,?,?,?,?)}"; 
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
            //try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            STR_RESULT = e.getMessage();
        } finally {
            setClose();
        }

        return STR_RESULT;
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

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
