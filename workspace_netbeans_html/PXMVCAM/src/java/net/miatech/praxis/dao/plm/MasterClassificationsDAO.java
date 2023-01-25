package net.miatech.praxis.dao.plm;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.praxis.plm.filter.A3379Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author magalyb
 */
public class MasterClassificationsDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
    
    public List<A3379Filter> SQP02547(A3379Filter filter) throws SQLException, Exception
    {
        List<A3379Filter> lstRtn = new ArrayList<A3379Filter>(0);
        A3379Filter objRtn;
    
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02547(?,?)}";

        Connection cnx = null;
        try {          
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_A3379CLASI", filter.IN_A3379CLASI);           
            cstmt01.execute();          
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3379Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A3379AIRLI = rs01.getString("A3379AIRLI").trim();
                objRtn.A3379CLASI = rs01.getString("A3379CLASI").trim();
                objRtn.A3379DCLAS = rs01.getString("A3379DCLAS").trim();
                objRtn.A3379USCR = rs01.getString("A3379USCR").trim();
                objRtn.A3379FHCR = rs01.getString("A3379FHCR").trim();
                objRtn.A3379USUP = rs01.getString("A3379USUP").trim();
                objRtn.A3379FCUP = rs01.getString("A3379FCUP").trim();
                lstRtn.add(objRtn);
            }        
         } catch(SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e);
         } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e);
         } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);//session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }
         
         return lstRtn; 
    }
    
    public String CRUD(A3379Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null; 
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        session.getCNXIBMDB2().open();
        try {    
            String SQLCLL01 = "{CALL PRAXIS.SQP02548(?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cs.setString("IN_ACTION",strOption);
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A3379CLASI", filter.IN_A3379CLASI);
            cs.setString("IN_A3379DCLAS", filter.IN_A3379DCLAS);
            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            cs.setString("IN_A3379CLASI_OLD", filter.IN_A3379CLASI_OLD);
            
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }
}
