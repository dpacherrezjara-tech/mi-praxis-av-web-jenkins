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
import net.miatech.beans.A1789Filter;
import net.miatech.beans.PX124S01A1789Filter;
import net.miatech.beans.PX125S01A1802Filter;
import net.miatech.beans.SQP00112Filter;
import net.miatech.beans.SQP00168Filter;
import net.miatech.beans.SQP00169Filter;
import net.miatech.beans.SQP01170Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author Pool
 */
public class GranPlanProcessedDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();
    // </editor-fold>

    public static void pasarGarbageCollector() {
        //System.gc();
        //System.runFinalization();
        //System.gc();
    }    
    public GranPlanProcessedDAO() {        
    }    
    
    public GranPlanProcessedDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    /*Brow Comm GP - Paqueta GP(Reportado)
     */
    public List<PX124S01A1789Filter> loadPX124S01A1789(PX124S01A1789Filter filter) throws SQLException, Exception {
        List<PX124S01A1789Filter> lstRtn = new ArrayList<PX124S01A1789Filter>(0);
        PX124S01A1789Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX124S01A1789(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);            
            cstmt01.setInt(1, filter.VP_OPCION );
            cstmt01.setString(2, filter.VP_A1789CCUST );
            cstmt01.setString(3, filter.VP_TICKET );
            cstmt01.setString(4, filter.VP_A1789IATA );
            cstmt01.setString(5, filter.VP_A1789FECVT );
            cstmt01.setString(6, filter.VP_A1789FECVT2 );
            cstmt01.setString(7, filter.VP_A1789STAT );
            
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX124S01A1789Filter();                                
                objRtn.A1789CCUST = rs01.getString("A1789CCUST");
                objRtn.A1789CIA = rs01.getString("A1789CIA");                
                objRtn.A1789FECVT = rs01.getString("A1789FECVT");
                objRtn.A1789FORMA = rs01.getString("A1789FORMA");                
                objRtn.A1789IATA = rs01.getString("A1789IATA");                
                objRtn.A1789MDA = rs01.getString("A1789MDA");
                objRtn.A1789PNR = rs01.getString("A1789PNR");                
                objRtn.A1789SERIE = rs01.getString("A1789SERIE");
                objRtn.A1789STAT = rs01.getString("A1789STAT");
                objRtn.A1789STOTA = rs01.getDouble("A1789STOTA");
                objRtn.A1789TCAMB = rs01.getDouble("A1789TCAMB");
                objRtn.A1789TFORM = rs01.getString("A1789TFORM");
                objRtn.A1789TOTAL = rs01.getDouble("A1789TOTAL");
                objRtn.VP_TICKET =  rs01.getString("A1789CIA")+rs01.getString("A1789FORMA")+rs01.getString("A1789SERIE"); 
                objRtn.A003KEY3 =  rs01.getString("A003KEY3");
                objRtn.A1789STAT_00 =  rs01.getString("A1789STAT_00");
                objRtn.A1789NGPS =  rs01.getString("A1789NGPS");
                objRtn.A1789SRES =  rs01.getString("A1789SRES");
                objRtn.A1789NPAX =  rs01.getString("A1789NPAX");
                
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
    
    /*Comm Gran Plan:: Pending
     */
    public List<PX125S01A1802Filter> loadPX125S01A1802(PX125S01A1802Filter filter) throws SQLException, Exception {
        List<PX125S01A1802Filter> lstRtn = new ArrayList<PX125S01A1802Filter>(0);
        PX125S01A1802Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX125S01A1802(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);            
            cstmt01.registerOutParameter(9, Types.INTEGER);            
            cstmt01.setInt(1, filter.VP_OPCION );
            cstmt01.setString(2, filter.VP_A1802CCUST );            
            cstmt01.setString(3, filter.VP_TICKET );            
            cstmt01.setString(4, filter.VP_A1802IATA ); 
            cstmt01.setString(5, filter.VP_A1802LOTEI ); 
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
                objRtn = new PX125S01A1802Filter();                
                objRtn.A1802IATA = rs01.getString("A1802IATA");
                objRtn.A003KEY3 = rs01.getString("A003KEY3");                  
                objRtn.A1802PNR = rs01.getString("A1802PNR");                
                objRtn.A1802GRUPO = rs01.getString("A1802GRUPO");                
                objRtn.A1802IDFIL = rs01.getString("A1802IDFIL");
                objRtn.A1802LOTEI = rs01.getString("A1802LOTEI"); 
                objRtn.A1802STAT = rs01.getString("A1802STAT");                 
                objRtn.VP_TICKET =  rs01.getString("A1802CIA")+rs01.getString("A1802FORMA")+rs01.getString("A1802SERIE"); //+rs01.getString("A1802SEQ");                
                
                objRtn.A1802CIA =  rs01.getString("A1802CIA");
                objRtn.A1802FORMA =rs01.getString("A1802FORMA");
                objRtn.A1802SERIE =rs01.getString("A1802SERIE");
                objRtn.A1802SEQ =rs01.getString("A1802SEQ");                
                
                objRtn.A1802MDA = rs01.getString("A1802MDA");
                objRtn.A1802FARE = rs01.getDouble("A1802FARE");
                objRtn.A1802FECEM = rs01.getString("A1802FECEM");
                objRtn.A1802IATAG = rs01.getString("A1802IATAG");
                objRtn.A1802PNRGP = rs01.getString("A1802PNRGP");
                objRtn.A1802MDAGP = rs01.getString("A1802MDAGP");
                objRtn.A1802TOTGP = rs01.getDouble("A1802TOTGP");
                objRtn.A1802FEMGP = rs01.getString("A1802FEMGP");
                
                objRtn.A1789CIA = rs01.getString("A1789CIA");
                objRtn.A1789FORMA = rs01.getString("A1789FORMA");
                objRtn.A1789SERIE = rs01.getString("A1789SERIE");
                objRtn.A003KEY3_GP = rs01.getString("A003KEY3_GP");
                    
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
    
    public String get_ObtenerIATA( String VP_OPTION, String VP_PARAM  ) throws SQLException, Exception {        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String lstRtn = "";        
        String SQLCLL01 = "{CALL PX112S03A1757(?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.VARCHAR);
            cstmt01.setString(1, VP_OPTION );
            cstmt01.setString(2, VP_PARAM );
            cstmt01.execute();
            lstRtn = cstmt01.getString(3);
            
        } finally {
            if (rs01 != null) 
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null)
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    /*
     * Actualiza Paquete Gp     
     */
    public SQP00112Filter  setSQP00112( SQP00112Filter filter ) throws SQLException, Exception {        
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL SQP00112(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(19, Types.VARCHAR);
            cstmt.registerOutParameter(20, Types.VARCHAR);            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.A1789CCUST );            
            cstmt.setString(3, filter.A1789CIA);              
            cstmt.setString(4, filter.A1789FORMA );
            cstmt.setString(5, filter.A1789SERIE );
            cstmt.setString(6, filter.A1789IATA );
            cstmt.setString(7, filter.A1789PNR );
            cstmt.setString(8, filter.VP_TICKET_NEW );
            cstmt.setString(9, filter.VP_A1789IATA_NEW );
            cstmt.setDouble(10, filter.VP_A1789TOTAL_NEW );             
            cstmt.setString(11, filter.A1789NGPS );
            cstmt.setString(12, filter.A1789TFORM );
            cstmt.setString(13, filter.A1789FECVT );            
            cstmt.setString(14, filter.A1789MDA );            
            cstmt.setDouble(15, filter.A1789STOTA ); 
            cstmt.setDouble(16, filter.A1789TOTAL ); 
            cstmt.setString(17, filter.A1789NPAX );
            cstmt.setString(18, filter.A1789SRES );
             
            cstmt.execute();                   
            filter.dbException.SQLCODE = cstmt.getString(19);
            filter.dbException.MESSAGE = cstmt.getString(20);                        
        } finally {
            if (cstmt != null) {                
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    /* Agrega GP Pending
     */
    public SQP00168Filter  set_SQP00168( SQP00168Filter filter ) throws SQLException, Exception {        
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL SQP00168(?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(5, Types.VARCHAR);
            cstmt.registerOutParameter(6, Types.VARCHAR);            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.VP_CIA );            
            cstmt.setString(3, filter.VP_FORMA);              
            cstmt.setString(4, filter.VP_SERIE  );            
            cstmt.execute();                   
            filter.dbException.SQLCODE = cstmt.getString(5);
            filter.dbException.MESSAGE = cstmt.getString(6);                        
        } finally {
            if (cstmt != null) {                
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    /*Datos de Tkt
     */    
    public List<SQP00169Filter> get_SQP00169(SQP00169Filter filter) throws SQLException, Exception {
        List<SQP00169Filter> lstRtn = new ArrayList<SQP00169Filter>(0);
        SQP00169Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP00169(?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
         try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt01 = cnx.prepareCall(SQLCLL01);                             
            cstmt01.setString(1, filter.VP_CIA );
            cstmt01.setString(2, filter.VP_FORMA );            
            cstmt01.setString(3, filter.VP_SERIE );                        
            cstmt01.execute();            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00169Filter();                
                objRtn.A1530AGENT = rs01.getString("A1530AGENT");                
                objRtn.A1530CCUST = rs01.getString("A1530CCUST");                  
                objRtn.A1530GRUPO = rs01.getString("A1530GRUPO");                
                objRtn.A1530IDFIL = rs01.getString("A1530IDFIL");                
                objRtn.A1530MDA = rs01.getString("A1530MDA");
                objRtn.A720FARERV = rs01.getDouble("A720FARERV"); 
                objRtn.A720FECVTA = rs01.getString("A720FECVTA");
                objRtn.A720PNR =  rs01.getString("A720PNR");   
                objRtn.A003KEY3 =  rs01.getString("A003KEY3");
                objRtn.A720CIA =  rs01.getString("A720CIA");
                objRtn.A720FORMA =  rs01.getString("A720FORMA");
                objRtn.A720SERIE =  rs01.getString("A720SERIE");
                objRtn.A720TFORMA =  rs01.getString("A720TFORMA");                
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
    
    public void setSQP01117(A1789Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP01117("
                + "?,?,?,?,?,?,?,?,?,?,"
                + "?,?,?,?,?,?,?,?,?,?"
                + ")}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01117(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(19, Types.VARCHAR);
            cstmt01.registerOutParameter(20, Types.VARCHAR);
            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_FPERDES);
            cstmt01.setString(4, filter.VP_FPERHAS);
            cstmt01.setString(5, session.getUserView().getCustomerInfo().CCUST); //filter.A1789CIA);
            cstmt01.setString(6, filter.A1789FORMA);
            cstmt01.setString(7, filter.A1789SERIE);
            cstmt01.setString(8, filter.A1789IATA);
            cstmt01.setString(9, filter.A1789NGPS);
            cstmt01.setString(10, filter.A1789SRES);
            cstmt01.setString(11, filter.A1789PNR);
            cstmt01.setString(12, filter.A1789TFORM);
            cstmt01.setString(13, filter.A1789FECVT);
            cstmt01.setDouble(14, filter.A1789TCAMB);
            cstmt01.setString(15, filter.A1789MDA);
            cstmt01.setDouble(16, filter.A1789TOTAL);
            cstmt01.setString(17, filter.A1789NPAX);
            cstmt01.setDouble(18, filter.A1789STOTA);
            cstmt01.execute();
            filter.dbException.SQLCODE = cstmt01.getString(19);
            filter.dbException.MESSAGE = cstmt01.getString(20);
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
    }
    
     public List<SQP01170Filter> loadSQP01170(SQP01170Filter filter) throws SQLException, Exception {
        List<SQP01170Filter> lstRtn = new ArrayList<SQP01170Filter>(0);
        SQP01170Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP01170(?,?,?,?,?,?,?)}";
        Connection cnx = null; 
         try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt01 = cnx.prepareCall(SQLCLL01); 
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER); 
            cstmt01.registerOutParameter(6, Types.INTEGER); 
            cstmt01.registerOutParameter(7, Types.INTEGER); 
            
            cstmt01.setString(1, filter.VP_CCUST );
            cstmt01.setString(2, filter.VP_FCARGA1 );                        
            cstmt01.setString(3, filter.VP_FCARGA2 );  
            
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);
            
            cstmt01.execute();            
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);
                        
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01170Filter();                
                objRtn.CCUST = rs01.getString("CCUST");                
                objRtn.FCARGA = rs01.getString("FCARGA");                  
                objRtn.FPERDES = rs01.getString("FPERDES");                
                objRtn.FPERHAS = rs01.getString("FPERHAS");                
                objRtn.TOTALRE = rs01.getInt("TOTALRE");
                objRtn.ESTADO = rs01.getString("ESTADO"); 
                objRtn.USCREA = rs01.getString("USCREA");
                objRtn.FECREA =  rs01.getString("FECREA");   
                objRtn.HOCREA =  rs01.getString("HOCREA"); 
                
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

    public void setSession(net.miatech.beans.implement.IServerSession ss) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
