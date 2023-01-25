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
import net.miatech.beans.PX111S01A1528Filter;
import net.miatech.beans.SQP00152Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CalendarControlASRDAO {

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

    public List<PX111S01A1528Filter> loadPX111S01A1528(PX111S01A1528Filter filter) throws SQLException, Exception {
        List<PX111S01A1528Filter> lstRtn = new ArrayList<PX111S01A1528Filter>(0);
        PX111S01A1528Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX111S01A1528(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_A1528FPRO);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX111S01A1528Filter();
                objRtn.A1528FPRO = rs01.getString("A1528FPRO");
                objRtn.A1528ANIO = rs01.getString("A1528ANIO");
                objRtn.A1528CUART = rs01.getString("A1528CUART");
                objRtn.A1528PDIDM = rs01.getString("A1528PDIDM");
                objRtn.A1528PDIDS = rs01.getString("A1528PDIDS");
                objRtn.A1528PDIDC = rs01.getString("A1528PDIDC");
                objRtn.A1528PRDA = rs01.getString("A1528PRDA");
                objRtn.A1528CNULO = rs01.getString("A1528CNULO");
                objRtn.A1528OBS = rs01.getString("A1528OBS");
                objRtn.A1528USRIN = rs01.getString("A1528USRIN");
                objRtn.A1528FECIN = rs01.getString("A1528FECIN");
                objRtn.A1528HORIN = rs01.getString("A1528HORIN");
                objRtn.A1528USRAC = rs01.getString("A1528USRAC");
                objRtn.A1528FECAC = rs01.getString("A1528FECAC");
                objRtn.A1528HORAC = rs01.getString("A1528HORAC");
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
    
    public void setSQP00152(SQP00152Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP00152(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_A1528FPRO);
            cstmt01.setString(3, filter.IN_A1528PDIDC);
            cstmt01.setString(4, filter.IN_A1528PRDA);
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
