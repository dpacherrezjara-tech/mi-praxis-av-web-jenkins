package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX036S01A1529Filter;
import net.miatech.beans.PX115S01A1529Filter;
import net.miatech.beans.SQP00149Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CalendarControlBSPDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX115S01A1529Filter> loadPX115S01A1529(PX115S01A1529Filter filter) throws SQLException, Exception {
        List<PX115S01A1529Filter> lstRtn = new ArrayList<PX115S01A1529Filter>(0);
        PX115S01A1529Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX115S01A1529(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_A1529ISOC);
            cstmt01.setString(3, filter.IN_A1529BAED);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX115S01A1529Filter();
                objRtn.A1529ISOC = rs01.getString("A1529ISOC");
                objRtn.A006NOMBRE = rs01.getString("A006NOMBRE");
                objRtn.A1529BAED = rs01.getString("A1529BAED");
                objRtn.A1529PERI = rs01.getString("A1529PERI");
                objRtn.A1529RPTO = rs01.getString("A1529RPTO");
                objRtn.A1529ANIO = rs01.getString("A1529ANIO");
                objRtn.A1529CUART = rs01.getString("A1529CUART");
                objRtn.A1529PDAIM = rs01.getString("A1529PDAIM");
                objRtn.A1529PDAIS = rs01.getString("A1529PDAIS");
                objRtn.A1529PCYC = rs01.getString("A1529PCYC");
                objRtn.A1529PRDA = rs01.getString("A1529PRDA");
                objRtn.A1529CNULO = rs01.getString("A1529CNULO");
                objRtn.A1529OBS = rs01.getString("A1529OBS");
                objRtn.A1529BAIR = rs01.getString("A1529BAIR");
                objRtn.A1529REMW = rs01.getString("A1529REMW");
                objRtn.A1529SETW = rs01.getString("A1529SETW");
                objRtn.A1529MESB = rs01.getString("A1529MESB");
                objRtn.A1529USRIN = rs01.getString("A1529USRIN");
                objRtn.A1529FECIN = rs01.getString("A1529FECIN");
                objRtn.A1529HORIN = rs01.getString("A1529HORIN");
                objRtn.A1529USRAC = rs01.getString("A1529USRAC");
                objRtn.A1529FECAC = rs01.getString("A1529FECAC");
                objRtn.A1529HORAC = rs01.getString("A1529HORAC");
                objRtn.A1698_TAPES = rs01.getInt("A1698_TAPES");
                objRtn.A1698_ERRORS = rs01.getInt("A1698_ERRORS");
                objRtn.A1698_SALEWO = rs01.getInt("A1698_SALEWO");
                objRtn.A1698_COMEN = rs01.getString("A1698_COMEN");

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
    public List<PX036S01A1529Filter> loadPX036S01A1529(PX036S01A1529Filter filter) throws SQLException, Exception {
        List<PX036S01A1529Filter> lstRtn = new ArrayList<PX036S01A1529Filter>(0);
        PX036S01A1529Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX036S01A1529(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);            
            //cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.IN_A1529ISOC);
            cstmt01.setString(2, filter.IN_A1529ANIO);
            
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
            while (rs01.next()) {
                objRtn = new PX036S01A1529Filter();
                objRtn.A1529ISOC = rs01.getString("A1529ISOC");                
                objRtn.A1529BAED = rs01.getString("A1529BAED");
                objRtn.A1529PERI = rs01.getString("A1529PERI");
                objRtn.A1529RPTO = rs01.getString("A1529RPTO");
                objRtn.A1529ANIO = rs01.getString("A1529ANIO");
                objRtn.A1529CUART = rs01.getString("A1529CUART");
                objRtn.A1529PDAIM = rs01.getString("A1529PDAIM");
                objRtn.A1529PDAIS = rs01.getString("A1529PDAIS");
                objRtn.A1529PCYC = rs01.getString("A1529PCYC");
                objRtn.A1529PRDA = rs01.getString("A1529PRDA");
                objRtn.A1529CNULO = rs01.getString("A1529CNULO");
                objRtn.A1529OBS = rs01.getString("A1529OBS");
                objRtn.A1529BAIR = rs01.getString("A1529BAIR");
                objRtn.A1529REMW = rs01.getString("A1529REMW");
                objRtn.A1529SETW = rs01.getString("A1529SETW");
                objRtn.A1529MESB = rs01.getString("A1529MESB");
                objRtn.A1529USRIN = rs01.getString("A1529USRIN");
                objRtn.A1529FECIN = rs01.getString("A1529FECIN");
                objRtn.A1529HORIN = rs01.getString("A1529HORIN");
                objRtn.A1529USRAC = rs01.getString("A1529USRAC");
                objRtn.A1529FECAC = rs01.getString("A1529FECAC");
                objRtn.A1529HORAC = rs01.getString("A1529HORAC");
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
    public void setSQP00149(SQP00149Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP00149(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_A1529ISOC);
            cstmt01.setString(3, filter.IN_A1529BAED);
            cstmt01.setString(4, filter.IN_A1529PRDA);
            cstmt01.setString(5, filter.IN_A1698COMEN);
            
            cstmt01.execute();
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
