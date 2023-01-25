package net.miatech.praxis.dao.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import net.miatech.praxis.dao.payments.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.SaleAudit.A2563Filter;
import net.miatech.beans.SaleAudit.A2665Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2370Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class NumberingRangesADMDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2563Filter> SearchRangeNum(A2563Filter filter) throws SQLException, Exception {
        List<A2563Filter> lstRtn = new ArrayList<A2563Filter>(0);
         A2563Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00947(?, ?, ?, ?, ?, ?, ?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_PAIS);

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
                objRtn = new A2563Filter();

                objRtn.A2563CCUST = rs01.getString("A2563CCUST");
                objRtn.A2563PAIS = rs01.getString("A2563PAIS");
                objRtn.A2563NPAIS = rs01.getString("A2563NPAIS");
                objRtn.A2563RINI = rs01.getString("A2563RINI");
                objRtn.A2563RFIN = rs01.getString("A2563RFIN");
                objRtn.A2563ADMAC = rs01.getString("A2563ADMAC");
                objRtn.A2563REGIS = rs01.getString("A2563REGIS");
                objRtn.A2563FREGI = rs01.getString("A2563FREGI");
                objRtn.A2563HREGI = rs01.getString("A2563HREGI");
                objRtn.A2563REVIS = rs01.getString("A2563REVIS");
                objRtn.A2563FREVI = rs01.getString("A2563FREVI");
                objRtn.A2563HREVI = rs01.getString("A2563HREVI");
                objRtn.A2563TYPE = rs01.getString("A2563TYPE");
               
     
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
            logError.error(e.getMessage());
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
    
    
      public A2563Filter  mantenimientoRange( A2563Filter filter ) throws SQLException, Exception {           
        

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00948(?, ?, ?, ?, ?, ?, ?, ?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.VARCHAR);
            cstmt01.registerOutParameter(10, Types.VARCHAR);
            
            
            cstmt01.setString(1, filter.VP_OPCION );
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_PAIS );
            cstmt01.setString(4, filter.A2563NPAIS);
            cstmt01.setString(5, filter.A2563RINI);
            cstmt01.setString(6, filter.A2563RFIN);            
            cstmt01.setString(7, filter.A2563ADMAC);
            cstmt01.setString(8, filter.A2563TYPE);

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
