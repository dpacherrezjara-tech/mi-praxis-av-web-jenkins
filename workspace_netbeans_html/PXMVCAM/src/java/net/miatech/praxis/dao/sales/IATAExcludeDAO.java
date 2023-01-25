package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX166S1A1829Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class IATAExcludeDAO {

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

    public List<PX166S1A1829Filter> loadPX166S1A1829(PX166S1A1829Filter filter) throws SQLException, Exception {
        List<PX166S1A1829Filter> lstRtn = new ArrayList<>(0);
        PX166S1A1829Filter objRtn;
        
        strSQL = "{CALL PX166S1A1829(?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL); 
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            
            cs.setString(1, filter.VP_A1829CCUST);
            cs.setString(2, filter.VP_A1829GSA);
            cs.setString(3, filter.VP_A1829IATA); 
            cs.setInt(4, filter.page.PAGNUM);
            cs.setInt(5, filter.page.PAGROW);
            cs.setInt(6, filter.page.TOTPAG);
            cs.setInt(7, filter.page.TOTROW);              
            cs.execute();            
            
            filter.page.PAGNUM = cs.getInt(4);
            filter.page.PAGROW = cs.getInt(5);
            filter.page.TOTPAG = cs.getInt(6);
            filter.page.TOTROW = cs.getInt(7);
            
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX166S1A1829Filter();                                                     
                objRtn.A1829CCUST = rst.getString("A1829CCUST");
                objRtn.A1829GSA = rst.getString("A1829GSA");
                objRtn.A1829AREA = rst.getString("A1829AREA");
                objRtn.A1829PAIS = rst.getString("A1829PAIS");
                objRtn.A1829IATA = rst.getString("A1829IATA");                
                objRtn.A1829DESC1 = rst.getString("A1829DESC1");
                objRtn.A1829DESC2 = rst.getString("A1829DESC2");
                objRtn.A1829REGIS = rst.getString("A1829REGIS");
                objRtn.A1829FREGI = rst.getString("A1829FREGI");
                objRtn.A1829REVIS = rst.getString("A1829REVIS");
                objRtn.A1829FREVI = rst.getString("A1829FREVI");
                objRtn.A1829HREVI = rst.getString("A1829HREVI");  
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
