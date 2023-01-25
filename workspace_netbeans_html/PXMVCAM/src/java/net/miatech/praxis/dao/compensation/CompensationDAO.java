/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.compensation;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.compensation.SQP04067Filter;
import net.miatech.praxis.compensation.SQP04068Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class CompensationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CompensationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CompensationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
     public List<SQP04067Filter> loadSQP04067(SQP04067Filter filter) throws SQLException, Exception {
        List<SQP04067Filter> lstRtn = new ArrayList<>(0);
        SQP04067Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXREPTPT.SQP04067(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A4023FPROC1);
            cstmt01.setString(3, filter.VP_A4023FPROC2);
            cstmt01.setString(4, filter.VP_A4023STERR);
            //param pagin
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);
            cstmt01.execute();
            // Recupera paginacion SQL
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04067Filter();
                objRtn.A4023CCUST = rs01.getString("A4023CCUST");
                objRtn.A4023IDXLS = rs01.getString("A4023IDXLS");
                objRtn.A4023FPROC = rs01.getString("A4023FPROC");
                objRtn.A4023QTYR = rs01.getInt("A4023QTYR");
                objRtn.A4023QTYC = rs01.getInt("A4023QTYC");
                objRtn.A4023FNAMX = rs01.getString("A4023FNAMX").trim();
                objRtn.A4023STERR = rs01.getString("A4023STERR");
                objRtn.A4023CODER = rs01.getString("A4023CODER");
                objRtn.A4023INGRS = rs01.getString("A4023INGRS");                
                objRtn.A4023FECIN = rs01.getString("A4023FECIN");
                objRtn.A4023HORIN = rs01.getString("A4023HORIN");
                objRtn.A4023REVIS = rs01.getString("A4023REVIS");
                objRtn.A4023FREVI = rs01.getString("A4023FREVI");
                objRtn.A4023HREVI = rs01.getString("A4023HREVI");                
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
     public SQP04068Filter setSQP04068Filter(SQP04068Filter filter ) throws SQLException, Exception {        
        SQP04068Filter objRtn; 
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXREPTPT.SQP04068(?,?,?,?,?)}";
        Connection cnx = null;        
        ResultSet rst = null;        
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
                cstmt01 = cnx.prepareCall(SQLCLL01); 
                cstmt01.registerOutParameter(4, Types.VARCHAR);
                cstmt01.registerOutParameter(5, Types.VARCHAR);
                
                cstmt01.setString(1, filter.VP_ACTION);
                cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt01.setString(3, filter.VP_JSON);
                cstmt01.execute();
                objRtn = new SQP04068Filter();
                objRtn.dbException.SQLCODE = cstmt01.getString(4);
                objRtn.dbException.MESSAGE = cstmt01.getString(5);                                
        } finally {
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
        return objRtn;
    }
}
