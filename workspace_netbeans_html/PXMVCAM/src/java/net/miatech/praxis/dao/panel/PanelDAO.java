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
                //PAGIN
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
            cstmt.setString(2, filter.VP_CCUST );
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
    
}
