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
import net.miatech.beans.S0001A713Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jmeiggs
 */
public class RfndMaintenanceDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public RfndMaintenanceDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RfndMaintenanceDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public S0001A713Filter updateItinerary(S0001A713Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP00694(?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(6, Types.VARCHAR);
            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.setString(1, filter.VP_AIRLINE);
            cstmt.setString(2, filter.VP_CIA);
            cstmt.setString(3, filter.VP_FORMA);
            cstmt.setString(4, filter.VP_SERIE);
            cstmt.setString(5, filter.A713SEQ);

            cstmt.execute();

            filter.dbException.SQLCODE = cstmt.getString(6);
            filter.dbException.MESSAGE = cstmt.getString(7);
        }  catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            filter.dbException.MESSAGE = e.getMessage();
        } catch (Exception ex) {
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + ex.getMessage(), ex);
            filter.dbException.MESSAGE = ex.getMessage();
        }  finally {
            if (cstmt != null) {
                //try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public S0001A713Filter deleteTKT(S0001A713Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03449(?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(6, Types.VARCHAR);
            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.setString(1, filter.VP_AIRLINE);
            cstmt.setString(2, filter.VP_CIA);
            cstmt.setString(3, filter.VP_FORMA);
            cstmt.setString(4, filter.VP_SERIE);
            cstmt.setString(5, filter.A713SEQ);

            cstmt.execute();

            filter.dbException.SQLCODE = cstmt.getString(6);
            filter.dbException.MESSAGE = cstmt.getString(7);
        }  catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            filter.dbException.MESSAGE = e.getMessage();
        } catch (Exception ex) {
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + ex.getMessage(), ex);
            filter.dbException.MESSAGE = ex.getMessage();
        }  finally {
            if (cstmt != null) {
                //try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public String maintenanceRfnd(S0001A713Filter filter, String ListCupones, String ListCuponesEmd) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL SQP03466(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            
            //cs.setString("IN_A1731CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("VP_AIRLINE", filter.VP_AIRLINE);
            cs.setString("VP_CIA", filter.VP_CIA);
            cs.setString("VP_FORMA", filter.VP_FORMA);
            cs.setString("VP_SERIE", filter.VP_SERIE);
            cs.setString("VP_SEQ", filter.VP_SEQ);
            cs.setString("VP_A713DCHEQ", filter.A713DCHEQ);
            cs.setString("VP_A713TRNCU", filter.A713TRNCU);
            cs.setString("VP_A713TDOC", filter.A713TDOC);
            cs.setString("VP_A713TRNN", filter.A713TRNN);
            cs.setString("VP_A713TRNSQ", filter.A713TRNSQ);
            cs.setString("VP_A713AGENTE", filter.A713AGENTE);
            cs.setString("VP_A713CODIT", filter.A713CODIT);
            cs.setString("VP_A713MONEDA", filter.A713MONEDA);
            cs.setDouble("VP_A713TARIFA", filter.A713TARIFA);
            cs.setString("VP_A713MDAPAG", filter.A713MDAPAG);
            cs.setDouble("VP_A713TRFPAG", filter.A713TRFPAG);
            cs.setString("VP_A713MDDS", filter.A713MDDS);
            cs.setDouble("VP_A713VDSCT", filter.A713VDSCT);
            cs.setString("VP_A713GRUPO", filter.A713GRUPO);
            cs.setString("VP_A713IDFIL", filter.A713IDFIL);
            cs.setString("VP_A713ORIG", filter.A713ORIG);
            cs.setString("VP_A713PAIS", filter.A713PAIS);
            cs.setString("VP_A713FECVTA", filter.A713FECVTA);
            cs.setString("VP_TICKETAUTH", filter.TICKETAUTH);
            cs.setString("VP_A713MDAFA", filter.A713MDAFA);
            cs.setDouble("VP_A713FARE", filter.A713FARE);
            cs.setDouble("VP_A713TCAMB", filter.A713TCAMB);
            cs.setString("VP_REFERENCE", filter.REFERENCE);
            cs.setString("VP_RELATED", filter.RELATED);
            cs.setString("VP_JSONCPNS", ListCupones);
            cs.setString("VP_JSONEMD", ListCuponesEmd);
            cs.setString("VP_USER", session.getUserView().getUserInfo().USR);
            cs.setString("VP_FECHA", Functions.getFechaActual());
            cs.setString("VP_HORA", Functions.getHoraActual());
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("SQL_MESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            STR_RESULT = e.getMessage();
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            STR_RESULT = e.getMessage();
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }
    
}
