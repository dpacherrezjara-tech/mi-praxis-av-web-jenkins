package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX125S01A1802Filter;
import net.miatech.beans.SQP00112Filter;
import net.miatech.beans.SQP00168Filter;
import net.miatech.beans.SQP00169Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GranPlanPendingDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    /*Comm Gran Plan:: Pending
     */
    public List<PX125S01A1802Filter> loadPX125S01A1802(PX125S01A1802Filter filter) throws SQLException, Exception {
        List<PX125S01A1802Filter> lstRtn = new ArrayList<>(0);
        PX125S01A1802Filter objRtn;
        String SQLCLL01 = "{CALL PX125S01A1802(?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);            
            cs.registerOutParameter(9, Types.INTEGER);            
            cs.setInt(1, filter.VP_OPCION );
            cs.setString(2, filter.VP_A1802CCUST );            
            cs.setString(3, filter.VP_TICKET );            
            cs.setString(4, filter.VP_A1802IATA ); 
            cs.setString(5, filter.VP_A1802LOTEI ); 
            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);
            cs.execute();
            filter.page.PAGNUM = cs.getInt(6);
            filter.page.PAGROW = cs.getInt(7);
            filter.page.TOTPAG = cs.getInt(8);
            filter.page.TOTROW = cs.getInt(9);

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX125S01A1802Filter();                
                objRtn.A1802IATA = rst.getString("A1802IATA");
                objRtn.A003KEY3 = rst.getString("A003KEY3");                  
                objRtn.A1802PNR = rst.getString("A1802PNR");                
                objRtn.A1802GRUPO = rst.getString("A1802GRUPO");                
                objRtn.A1802IDFIL = rst.getString("A1802IDFIL");
                objRtn.A1802LOTEI = rst.getString("A1802LOTEI"); 
                objRtn.A1802STAT = rst.getString("A1802STAT");                 
                objRtn.VP_TICKET =  rst.getString("A1802CIA")+rst.getString("A1802FORMA")+rst.getString("A1802SERIE"); //+rst.getString("A1802SEQ");                
                
                objRtn.A1802CIA =  rst.getString("A1802CIA");
                objRtn.A1802FORMA =rst.getString("A1802FORMA");
                objRtn.A1802SERIE =rst.getString("A1802SERIE");
                objRtn.A1802SEQ =rst.getString("A1802SEQ");                
                
                objRtn.A1802MDA = rst.getString("A1802MDA");
                objRtn.A1802FARE = rst.getDouble("A1802FARE");
                objRtn.A1802FECEM = rst.getString("A1802FECEM");
                objRtn.A1802IATAG = rst.getString("A1802IATAG");
                objRtn.A1802PNRGP = rst.getString("A1802PNRGP");
                objRtn.A1802MDAGP = rst.getString("A1802MDAGP");
                objRtn.A1802TOTGP = rst.getDouble("A1802TOTGP");
                objRtn.A1802FEMGP = rst.getString("A1802FEMGP");
                
                objRtn.A1789CIA = rst.getString("A1789CIA");
                objRtn.A1789FORMA = rst.getString("A1789FORMA");
                objRtn.A1789SERIE = rst.getString("A1789SERIE");
                objRtn.A003KEY3_GP = rst.getString("A003KEY3_GP");
                    
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    /*
     * Actualiza Paquete Gp     
     */
    public SQP00112Filter  setSQP00112( SQP00112Filter filter ) throws SQLException, Exception {        
        String SQLCLL01 = "{CALL SQP00112(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(19, Types.VARCHAR);
            cs.registerOutParameter(20, Types.VARCHAR);            
            cs.setString(1, filter.VP_ACTION );
            cs.setString(2, filter.A1789CCUST );            
            cs.setString(3, filter.A1789CIA);              
            cs.setString(4, filter.A1789FORMA );
            cs.setString(5, filter.A1789SERIE );
            cs.setString(6, filter.A1789IATA );
            cs.setString(7, filter.A1789PNR );
            cs.setString(8, filter.VP_TICKET_NEW );
            cs.setString(9, filter.VP_A1789IATA_NEW );
            cs.setDouble(10, filter.VP_A1789TOTAL_NEW );             
            cs.setString(11, filter.A1789NGPS );
            cs.setString(12, filter.A1789TFORM );
            cs.setString(13, filter.A1789FECVT );            
            cs.setString(14, filter.A1789MDA );            
            cs.setDouble(15, filter.A1789STOTA ); 
            cs.setDouble(16, filter.A1789TOTAL ); 
            cs.setString(17, filter.A1789NPAX );
            cs.setString(18, filter.A1789SRES );
             
            cs.execute();                   
            filter.dbException.SQLCODE = cs.getString(19);
            filter.dbException.MESSAGE = cs.getString(20);                        
        } finally {
            setClose();
        }
        return filter;
    }
    
    public String get_ObtenerIATA( String VP_OPTION, String VP_PARAM  ) throws SQLException, Exception {        
        String lstRtn = "";        
        String SQLCLL01 = "{CALL PX112S03A1757(?,?,?)}";
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(3, Types.VARCHAR);
            cs.setString(1, VP_OPTION );
            cs.setString(2, VP_PARAM );
            cs.execute();
            lstRtn = cs.getString(3);
            
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    /*Datos de Tkt
     */    
    public List<SQP00169Filter> get_SQP00169(SQP00169Filter filter) throws SQLException, Exception {
        List<SQP00169Filter> lstRtn = new ArrayList<>(0);
        SQP00169Filter objRtn;
        String SQLCLL01 = "{CALL SQP00169(?,?,?)}";
         try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(SQLCLL01);                             
            cs.setString(1, filter.VP_CIA );
            cs.setString(2, filter.VP_FORMA );            
            cs.setString(3, filter.VP_SERIE );                        
            cs.execute();            
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new SQP00169Filter();                
                objRtn.A1530AGENT = rst.getString("A1530AGENT");                
                objRtn.A1530CCUST = rst.getString("A1530CCUST");                  
                objRtn.A1530GRUPO = rst.getString("A1530GRUPO");                
                objRtn.A1530IDFIL = rst.getString("A1530IDFIL");                
                objRtn.A1530MDA = rst.getString("A1530MDA");
                objRtn.A720FARERV = rst.getDouble("A720FARERV"); 
                objRtn.A720FECVTA = rst.getString("A720FECVTA");
                objRtn.A720PNR =  rst.getString("A720PNR");   
                objRtn.A003KEY3 =  rst.getString("A003KEY3");
                objRtn.A720CIA =  rst.getString("A720CIA");
                objRtn.A720FORMA =  rst.getString("A720FORMA");
                objRtn.A720SERIE =  rst.getString("A720SERIE");
                objRtn.A720TFORMA =  rst.getString("A720TFORMA");                
                lstRtn.add(objRtn);
            }
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    /* Agrega GP Pending
     */
    public SQP00168Filter  set_SQP00168( SQP00168Filter filter ) throws SQLException, Exception {        
        String SQLCLL01 = "{CALL SQP00168(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(5, Types.VARCHAR);
            cs.registerOutParameter(6, Types.VARCHAR);            
            cs.setString(1, filter.VP_ACTION );
            cs.setString(2, filter.VP_CIA );            
            cs.setString(3, filter.VP_FORMA);              
            cs.setString(4, filter.VP_SERIE  );            
            cs.execute();                   
            filter.dbException.SQLCODE = cs.getString(5);
            filter.dbException.MESSAGE = cs.getString(6);                        
        } finally {
            setClose();
        }
        return filter;
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
