package net.miatech.praxis.dao.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A2664Filter;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class IvaDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2664Filter> Search(A2664Filter filter) throws SQLException, Exception {
        List<A2664Filter> lstRtn = new ArrayList<A2664Filter>(0);
         A2664Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00961(?, ?, ?, ?, ?, ?, ? , ?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_CODPAIS);
            cstmt01.setString(4, filter.VP_PAIS);

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
                objRtn = new A2664Filter();
                objRtn.COUNTRY = rs01.getString("COUNTRY").trim();
                objRtn.CODCNTRY = rs01.getString("CODCNTRY").trim();
                objRtn.TYPEIVA = rs01.getString("TYPEIVA").trim();
                objRtn.CODIVA = rs01.getString("CODIVA").trim();
                objRtn.PORIVA = rs01.getDouble("PORIVA");
                objRtn.SEQ = rs01.getString("SEQ").trim();
                objRtn.A2664REGIS = rs01.getString("A2664REGIS").trim();
                objRtn.A2664FREGI = rs01.getString("A2664FREGI").trim();
                objRtn.A2664HREGI = rs01.getString("A2664HREGI").trim();
                objRtn.A2664REVIS = rs01.getString("A2664REVIS").trim();
                objRtn.A2664FREVI = rs01.getString("A2664FREVI").trim();
                objRtn.A2664HREVI = rs01.getString("A2664HREVI").trim();
     
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstRtn;


    }
    
    public A2664Filter  mantenimientoIVA( A2664Filter filter ) throws SQLException, Exception {           
        

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00962(?, ?, ?, ?, ?, ?,?, ?, ?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.VARCHAR);
            cstmt01.registerOutParameter(10, Types.VARCHAR);
            
            
            cstmt01.setString(1, filter.VP_OPCION );
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_PAIS);
            cstmt01.setString(4, filter.VP_CODPAIS );
            cstmt01.setString(5, filter.TYPEIVA);
            cstmt01.setString(6, filter.CODIVA);        
            cstmt01.setDouble(7, filter.PORIVA);
            cstmt01.setString(8, filter.SEQ);
            cstmt01.execute();                        
            filter.dbException.SQLCODE = cstmt01.getString(9);
            filter.dbException.MESSAGE = cstmt01.getString(10);                        
        } finally {
            if (cstmt01 != null) {                
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
