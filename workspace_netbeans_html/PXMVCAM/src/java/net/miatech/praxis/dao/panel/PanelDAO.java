/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.panel;

/**
 *
 * @author lzambrano
 */
import java.sql.CallableStatement; 
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.PX075S01INF001Filter;
import net.miatech.beans.PX075S02INF001Filter;
import net.miatech.beans.PX076S01INF053Filter;
import net.miatech.beans.SQP05851Filter;
import net.miatech.beans.SQP05856Filter;
import net.miatech.beans.SQP05901Filter;
import net.miatech.beans.SQP05902Filter;
import net.miatech.beans.SQP05908Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class PanelDAO {
    private IServerSession session; 
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();
    public PanelDAO() {        
    }
     public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
    public PanelDAO(IServerSession ss) {
        session = ss;
    }
    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX041S01INF001Filter> loadPX038S01A1698(PX041S01INF001Filter filter) throws SQLException , Exception {
        List<PX041S01INF001Filter> lstRtn = new ArrayList<PX041S01INF001Filter>(0);
        PX041S01INF001Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX041S01INF001(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CCUST);
            cstmt01.setString(2, filter.VP_APLICA);
            cstmt01.setString(3, filter.VP_USR);
            cstmt01.setInt(4, filter.VP_TYPEF);
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX041S01INF001Filter();
                objRtn.DTCR = rs01.getString("DTCR");
                objRtn.DTUP = rs01.getString("DTUP");
                objRtn.NPROG = rs01.getString("NPROG");
                objRtn.MODUL = rs01.getString("MODUL");
                objRtn.PERMA = rs01.getString("PERMA");
                objRtn.PERMC = rs01.getString("PERMC");                
                objRtn.PERME = rs01.getString("PERME");
                objRtn.PERML = rs01.getString("PERML");
                objRtn.PERMM = rs01.getString("PERMM");
                objRtn.PERMX = rs01.getString("PERMX");
                objRtn.PROG = rs01.getString("PROG");
                objRtn.STAT = rs01.getString("STAT");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.USUP = rs01.getString("USUP"); 
                objRtn.USR  = rs01.getString("USR"); 
                objRtn.CITY  = rs01.getString("CITY"); 
                objRtn.CCUST  = rs01.getString("CCUST"); 
                //PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                
                lstRtn.add(objRtn);
            }
        }catch(SQLException e) { 
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
    
    public List<PX075S01INF001Filter> loadPX075S01INF001(PX075S01INF001Filter filter) throws SQLException , Exception {
        List<PX075S01INF001Filter> lstRtn = new ArrayList<PX075S01INF001Filter>(0);
        PX075S01INF001Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX075S01INF001(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            
            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_USR);
            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {//USR, CITY, STAT,USCR, DTCR, USUP, DTUP
                objRtn = new PX075S01INF001Filter();
                objRtn.USR = rs01.getString("USR");
                objRtn.CITY = rs01.getString("CITY");
                objRtn.STAT = rs01.getString("STAT");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.DTCR = rs01.getString("DTCR");                
                objRtn.USUP = rs01.getString("USUP");
                objRtn.DTUP = rs01.getString("DTUP");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
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

    public PX076S01INF053Filter  setPX076S01INF053( PX076S01INF053Filter filter ) throws SQLException , Exception {        
        //MANT. TABLA INF053: INSERT, UPDATE O DELETE.        
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL PX076S01INF053(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt = cnx.prepareCall(SQLCLL01);
            // OUT REGISTER
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.VARCHAR);             
            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.VP_CCUST );//ya no se usa en el store
            cstmt.setString(3, filter.VP_USR );
            cstmt.setString(4, filter.VP_APLICA);
            cstmt.setString(5, filter.VP_NPROG);            
            cstmt.setString(6, filter.VP_PERMA);            
            cstmt.setString(7, filter.VP_PERML);
            cstmt.setString(8, filter.VP_PERMC);
            cstmt.setString(9, filter.VP_PERMM);
            cstmt.setString(10, filter.VP_PERME);
            cstmt.setString(11, filter.VP_PERMX);
            cstmt.setString(12, filter.VP_STAT);
            cstmt.execute();                        
            filter.dbException.SQLCODE = cstmt.getString(13);
            filter.dbException.MESSAGE = cstmt.getString(14);                        
        } finally {
            if (cstmt != null) {                
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public PX076S01INF053Filter setSQP05412( PX076S01INF053Filter filter ) throws SQLException , Exception {        
        //MANT. TABLA INF053: INSERT, UPDATE O DELETE.        
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL SQP05412(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt = cnx.prepareCall(SQLCLL01);
            // OUT REGISTER
            cstmt.registerOutParameter(15, Types.VARCHAR);
            cstmt.registerOutParameter(16, Types.VARCHAR);             
            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.VP_CCUST );
            cstmt.setString(3, filter.VP_USR );
            cstmt.setString(4, filter.VP_USRCOPY );
            cstmt.setString(5, filter.VP_APLICA);
            cstmt.setString(6, filter.VP_NPROG);
            cstmt.setString(7, filter.VP_MODULE);
            cstmt.setString(8, filter.VP_PERMA);            
            cstmt.setString(9, filter.VP_PERML);
            cstmt.setString(10, filter.VP_PERMC);
            cstmt.setString(11, filter.VP_PERMM);
            cstmt.setString(12, filter.VP_PERME);
            cstmt.setString(13, filter.VP_PERMX);
            cstmt.setString(14, filter.VP_STAT);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(15);
            filter.dbException.MESSAGE = cstmt.getString(16);                        
        } finally {
            if (cstmt != null) {                
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public PX075S02INF001Filter  setPX075S02INF001( PX075S02INF001Filter filter ) throws SQLException , Exception {    
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL PX075S02INF001(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);             
            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.VP_CCUST );
            cstmt.setString(3, filter.VP_USR );
            cstmt.setString(4, filter.VP_CITY );
            cstmt.setString(5, filter.VP_STAT);
            cstmt.setString(6, filter.VP_APLICA);
            cstmt.execute();                        
            filter.dbException.SQLCODE = cstmt.getString(7);
            filter.dbException.MESSAGE = cstmt.getString(8);                        
        }catch(Exception ex){
            System.out.println(ex.getMessage());
        }
        finally {
            if (cstmt != null) {
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public List<SQP05908Filter> loadSQP05908(SQP05908Filter filter) throws SQLException , Exception {
        List<SQP05908Filter> lstRtn = new ArrayList<SQP05908Filter>(0);
        SQP05908Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP05908(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            
            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_USR);
            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {//USR, CITY, STAT,USCR, DTCR, USUP, DTUP
                objRtn = new SQP05908Filter();
                objRtn.USR = rs01.getString("USR");
                objRtn.CITY = rs01.getString("CITY");
                objRtn.STAT = rs01.getString("STAT");
                objRtn.NOM = rs01.getString("NOM");
                objRtn.APE = rs01.getString("APE");
                objRtn.CREMP = rs01.getString("CREMP");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.DTCR = rs01.getString("DTCR");                
                objRtn.USUP = rs01.getString("USUP");
                objRtn.DTUP = rs01.getString("DTUP");
                objRtn.CARGO = rs01.getString("CARGO");
                objRtn.DESC1 = rs01.getString("DESC1");
                objRtn.CODEM = rs01.getString("CODEM");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        }catch(SQLException e) { 
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
    
    public SQP05851Filter  setSQP05851( SQP05851Filter filter ) throws SQLException , Exception {        
        //MANT. LOG TABLE   
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL PRAXIS.SQP05851(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt = cnx.prepareCall(SQLCLL01);      
            
            cstmt.setString(1, filter.VP_ID_OPERATOR );
            cstmt.setString(2, filter.VP_OPER );
            cstmt.setString(3, filter.VP_NPROG );
            cstmt.setString(4, filter.VP_DESC1);
            cstmt.setString(5, filter.VP_ACTIO);
            cstmt.execute();                                             
        } finally {
            if (cstmt != null) {                
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public List<SQP05901Filter> loadSQP05901(SQP05901Filter filter) throws SQLException , Exception {
        List<SQP05901Filter> lstRtn = new ArrayList<SQP05901Filter>(0);
        SQP05901Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05901(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CCUST);
            cstmt01.setString(2, filter.VP_FILTER);
            cstmt01.setInt(3, filter.VP_TYPEF);
            
            cstmt01.setString(4, filter.IN_FECHA_PROCESO);
            cstmt01.setString(5, filter.IN_FECHA_ACUSE);
            
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05901Filter();
                objRtn.ID_OPERATOR = rs01.getString("ID_OPERATOR");
                objRtn.OPER = rs01.getString("OPER");
                objRtn.CITY = rs01.getString("CITY");
                objRtn.NPROG = rs01.getString("NPROG");                
                objRtn.DESC1 = rs01.getString("DESC1");
                objRtn.ACTIO = rs01.getString("ACTIO");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.DTCR = rs01.getString("DTCR");
                //PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                
                lstRtn.add(objRtn);
            }
        }catch(SQLException e) { 
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
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
    
    public List<SQP05902Filter> loadSQP05902(SQP05902Filter filter) throws SQLException , Exception {
        List<SQP05902Filter> lstRtn = new ArrayList<SQP05902Filter>(0);
        SQP05902Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05902(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CCUST);
            cstmt01.setString(2, filter.VP_FILTER);
            cstmt01.setInt(3, filter.VP_TYPEF);
            cstmt01.setString(4, filter.IN_FECHA_PROCESO);
            cstmt01.setString(5, filter.IN_FECHA_ACUSE);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05902Filter();
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.APLICA = rs01.getString("APLICA");
                objRtn.USR = rs01.getString("USR");               
                objRtn.CITY = rs01.getString("CITY");     
                objRtn.NPROG = rs01.getString("NPROG");
                objRtn.FECIN = rs01.getString("FECIN").replaceAll("(\\d{4})(\\d{2})(\\d{2})", "$1/$2/$3");
                objRtn.HORIN = rs01.getString("HORIN").replaceAll("(\\d{2})(\\d{2})(\\d{2})", "$1:$2:$3");
                //PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                
                lstRtn.add(objRtn);
            }
        }catch(SQLException e) { 
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
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
    
    public SQP05856Filter  setSQP05856( SQP05856Filter filter ) throws SQLException , Exception {    
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL PRAXIS.SQP05856(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.VARCHAR);             
            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.VP_CCUST );
            cstmt.setString(3, filter.VP_USR );
            cstmt.setString(4, filter.VP_CITY );
            cstmt.setString(5, filter.VP_STAT);
            cstmt.setString(6, filter.VP_APLICA);
            cstmt.setString(7, filter.VP_EMAIL);
            cstmt.setString(8, filter.VP_NOM);
            cstmt.setString(9, filter.VP_APE);
            cstmt.setString(10, filter.VP_CARGO);
            cstmt.setString(11, filter.VP_DESC);
            cstmt.setString(12, filter.VP_CODEM);
            cstmt.execute();                        
            filter.dbException.SQLCODE = cstmt.getString(13);
            filter.dbException.MESSAGE = cstmt.getString(14);                        
        }catch(Exception ex){
            System.out.println(ex.getMessage());
        }
        finally {
            if (cstmt != null) {
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
}
