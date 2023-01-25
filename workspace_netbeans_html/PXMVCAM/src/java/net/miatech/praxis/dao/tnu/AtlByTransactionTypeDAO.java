/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.tnu;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX229S01Filter;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class AtlByTransactionTypeDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private ResultSet rst = null;
    private Connection cnx = null;
    private CallableStatement cs = null;

    public AtlByTransactionTypeDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AtlByTransactionTypeDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX229S01Filter> loadPX229S01(PX229S01Filter filter) throws Exception {
        List<PX229S01Filter> lstRtn = new ArrayList<PX229S01Filter>(0);
        PX229S01Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP00568(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_AÑO);
            cstmt01.setString(3, filter.IN_TRANSACCION);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX229S01Filter();
                objRtn.A1889TRTNU = rs01.getString("A1889TRTNU").trim();
                objRtn.A1889TRX01 = rs01.getString("A1889TRX01").trim();
                objRtn.A1889TRX02 = rs01.getString("A1889TRX02").trim();
                objRtn.A1889TRX03 = rs01.getString("A1889TRX03").trim();
                objRtn.A1889IMP01 = rs01.getDouble("A1889IMP01");
                objRtn.A1889IMP02 = rs01.getDouble("A1889IMP02");
                objRtn.A1889IMP03 = rs01.getDouble("A1889IMP03");
                objRtn.A1889IMP04 = rs01.getDouble("A1889IMP04");
                objRtn.A1889IMP05 = rs01.getDouble("A1889IMP05");
                objRtn.A1889IMP06 = rs01.getDouble("A1889IMP06");
                objRtn.A1889IMP07 = rs01.getDouble("A1889IMP07");
                objRtn.A1889IMP08 = rs01.getDouble("A1889IMP08");
                objRtn.A1889IMP09 = rs01.getDouble("A1889IMP09");
                objRtn.A1889IMP10 = rs01.getDouble("A1889IMP10");
                objRtn.A1889IMP11 = rs01.getDouble("A1889IMP11");
                objRtn.A1889IMP12 = rs01.getDouble("A1889IMP12");
                objRtn.TOTAL = rs01.getDouble("TOTAL");
                lstRtn.add(objRtn);
            }
        } catch (SQLException ex) {
            String err = ex.getMessage();
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + ex.getMessage(), ex);
        } catch (Exception ex) {
            String err = ex.getMessage();
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + ex.getMessage(), ex);
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
}
