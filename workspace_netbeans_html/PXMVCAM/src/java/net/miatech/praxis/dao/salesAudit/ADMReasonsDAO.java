package net.miatech.praxis.dao.salesAudit;

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
import net.miatech.beans.SaleAudit.A2560Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ADMReasonsDAO {
    
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    
    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2560Filter> SearchADMReasons(A2560Filter filter) throws SQLException, Exception {
        List<A2560Filter> lstRtn = new ArrayList<A2560Filter>(0);
        A2560Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00937(?, ?, ?, ?, ?, ?, ?, ?)}";
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
            cstmt01.setString(3, filter.VP_CODRAZ);
            cstmt01.setString(4, filter.VP_FAM);

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
                objRtn = new A2560Filter();

                objRtn.A2560CCUST = rs01.getString("A2560CCUST").trim();
                objRtn.A2560CODRZ = rs01.getString("A2560CODRZ").trim();
                objRtn.A2560FAMIL = rs01.getString("A2560FAMIL").trim();
                objRtn.A2560COMRE = rs01.getString("A2560COMRE").trim();
                objRtn.A2560COMES = rs01.getString("A2560COMES").trim();
                objRtn.A2560COMEN = rs01.getString("A2560COMEN").trim();
                objRtn.A2560COMPO = rs01.getString("A2560COMPO").trim();
                objRtn.A2560COMFR = rs01.getString("A2560COMFR").trim();
                objRtn.A2560REGIS = rs01.getString("A2560REGIS").trim();
                objRtn.A2560FREGI = rs01.getString("A2560FREGI").trim();
                objRtn.A2560HREGI = rs01.getString("A2560HREGI").trim();
                objRtn.A2560REVIS = rs01.getString("A2560REVIS").trim();
                objRtn.A2560FREVI = rs01.getString("A2560FREVI").trim();
                objRtn.A2560HREVI = rs01.getString("A2560HREVI").trim();
               
     
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
    
    public List<A2560Filter> searchCodReason(A2560Filter filter) throws SQLException, Exception {
        List<A2560Filter> lstRtn = new ArrayList<A2560Filter>(0);
        A2560Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00937(?, ?, ?, ?, ?, ?, ?, ?)}";
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
            cstmt01.setString(3, filter.VP_CODRAZ);
            cstmt01.setString(4, filter.VP_FAM);

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
                objRtn = new A2560Filter();
                objRtn.A2560CODRZ = rs01.getString("A2560CODRZ");
                objRtn.A2560FAMIL = rs01.getString("A2560FAMIL");
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

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
    
    public A2560Filter  mantenimientoADMReasons( A2560Filter filter ) throws SQLException, Exception {           
        

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00938(?, ?, ?, ?, ?, ?, ?, ?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.VARCHAR);
            cstmt01.registerOutParameter(11, Types.VARCHAR);
            
            
            cstmt01.setString(1, filter.VP_OPCION );
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_CODRAZ );
            cstmt01.setString(4, filter.A2560FAMIL);
            cstmt01.setString(5, filter.A2560COMRE);
            cstmt01.setString(6, filter.A2560COMES);            
            cstmt01.setString(7, filter.A2560COMEN);
            cstmt01.setString(8, filter.A2560COMPO);
            cstmt01.setString(9, filter.A2560COMFR);

            cstmt01.execute();                        
            filter.dbException.SQLCODE = cstmt01.getString(10);
            filter.dbException.MESSAGE = cstmt01.getString(11);                        
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
             filter.dbException.MESSAGE=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
             filter.dbException.MESSAGE=e.getMessage();
        }finally {
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
