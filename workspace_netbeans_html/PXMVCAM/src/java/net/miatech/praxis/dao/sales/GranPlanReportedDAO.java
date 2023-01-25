package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX124S01A1789Filter;
import net.miatech.beans.SQP00169Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GranPlanReportedDAO {

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

    /*Brow Comm GP - Paqueta GP(Reportado)
     */
    public List<PX124S01A1789Filter> loadPX124S01A1789(PX124S01A1789Filter filter) throws SQLException, Exception {
        List<PX124S01A1789Filter> lstRtn = new ArrayList<>(0);
        PX124S01A1789Filter objRtn;
        String SQLCLL01 = "{CALL PX124S01A1789(?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);            
            cs.setInt(1, filter.VP_OPCION );
            cs.setString(2, filter.VP_A1789CCUST );
            cs.setString(3, filter.VP_TICKET );
            cs.setString(4, filter.VP_A1789IATA );
            cs.setString(5, filter.VP_A1789FECVT );
            cs.setString(6, filter.VP_A1789FECVT2 );
            cs.setString(7, filter.VP_A1789STAT );
            
            cs.setInt(8, filter.page.PAGNUM);
            cs.setInt(9, filter.page.PAGROW);
            cs.setInt(10, filter.page.TOTPAG);
            cs.setInt(11, filter.page.TOTROW);
            cs.execute();
            filter.page.PAGNUM = cs.getInt(8);
            filter.page.PAGROW = cs.getInt(9);
            filter.page.TOTPAG = cs.getInt(10);
            filter.page.TOTROW = cs.getInt(11);

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX124S01A1789Filter();                                
                objRtn.A1789CCUST = rst.getString("A1789CCUST");
                objRtn.A1789CIA = rst.getString("A1789CIA");                
                objRtn.A1789FECVT = rst.getString("A1789FECVT");
                objRtn.A1789FORMA = rst.getString("A1789FORMA");                
                objRtn.A1789IATA = rst.getString("A1789IATA");                
                objRtn.A1789MDA = rst.getString("A1789MDA");
                objRtn.A1789PNR = rst.getString("A1789PNR");                
                objRtn.A1789SERIE = rst.getString("A1789SERIE");
                objRtn.A1789STAT = rst.getString("A1789STAT");
                objRtn.A1789STOTA = rst.getDouble("A1789STOTA");
                objRtn.A1789TCAMB = rst.getDouble("A1789TCAMB");
                objRtn.A1789TFORM = rst.getString("A1789TFORM");
                objRtn.A1789TOTAL = rst.getDouble("A1789TOTAL");
                objRtn.VP_TICKET =  rst.getString("A1789CIA")+rst.getString("A1789FORMA")+rst.getString("A1789SERIE"); 
                objRtn.A003KEY3 =  rst.getString("A003KEY3");
                objRtn.A1789STAT_00 =  rst.getString("A1789STAT_00");
                objRtn.A1789NGPS =  rst.getString("A1789NGPS");
                objRtn.A1789SRES =  rst.getString("A1789SRES");
                objRtn.A1789NPAX =  rst.getString("A1789NPAX");
                
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
