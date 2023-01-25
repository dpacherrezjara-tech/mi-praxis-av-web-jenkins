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
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX038S01A1698Filter;
import net.miatech.beans.PX038S04A1698Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ConciliationARCDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ConciliationARCDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ConciliationARCDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX038S01A1698Filter> loadPX038S01A1698(PX038S01A1698Filter filter) throws SQLException, Exception {
        List<PX038S01A1698Filter> lstRtn = new ArrayList<>(0);
        PX038S01A1698Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX038S01A1698(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FPRDA_FROM);
            cstmt01.setString(3, filter.IN_FPRDA_TO);
            cstmt01.setString(4, filter.IN_BANK);
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
                objRtn = new PX038S01A1698Filter();
                objRtn.PPED = rs01.getString("PPED");
                objRtn.A1698BANK = rs01.getString("A1698BANK");
                objRtn.A1698PAIS = rs01.getString("A1698PAIS");
                objRtn.A1698FPRDA = rs01.getString("A1698FPRDA");
                objRtn.A1698IDFIL = rs01.getString("A1698IDFIL");
                objRtn.CURRENCY = rs01.getString("CURRENCY");
                objRtn.QTY_TRANSACCS = rs01.getLong("QTY_TRANSACCS");
                objRtn.TOT_GROSS = rs01.getDouble("TOT_GROSS");
                objRtn.TOT_REMITTENCE = rs01.getDouble("TOT_REMITTENCE");
                objRtn.ARC_TAX = rs01.getDouble("ARC_TAX");
                objRtn.ARC_COMM = rs01.getDouble("ARC_COMM");
                objRtn.PRAXIS_TAX = rs01.getDouble("PRAXIS_TAX");
                objRtn.PRAXIS_COMM = rs01.getDouble("PRAXIS_COMM");
                objRtn.A1698STCON = rs01.getString("A1698STCON");
                objRtn.A1698STCON_00 = rs01.getString("A1698STCON_00");
                objRtn.A1698FFILE = rs01.getString("A1698FFILE");
                objRtn.A1698HFILE = rs01.getString("A1698HFILE");
                objRtn.A1698SOURC = rs01.getString("A1698SOURC");
                objRtn.A1698CCUST = rs01.getString("A1698CCUST");
                objRtn.A1698COMEN = rs01.getString("A1698COMEN");
                objRtn.IND_CUR = rs01.getString("IND_CUR");
                objRtn.A1530STPRO_00 = rs01.getString("A1530STPRO_00");

                objRtn.TOT_GROSS_PX = rs01.getDouble("TOT_GROSS_PX");
                objRtn.TOT_REMITTENCE_PX = rs01.getDouble("TOT_REMITTENCE_PX");
                objRtn.TOT_OTHER = rs01.getDouble("TOT_OTHER");

                objRtn.TOT_CASH_ARC = rs01.getDouble("TOT_CASH_ARC");
                objRtn.TOT_CREDIT_ARC = rs01.getDouble("TOT_CREDIT_ARC");
                objRtn.TOT_CASH_PX = rs01.getDouble("TOT_CASH_PX");
                objRtn.TOT_CREDIT_PX = rs01.getDouble("TOT_CREDIT_PX");
                objRtn.A1698STREC = rs01.getString("A1698STREC");
                
                objRtn.A1698UCONC = rs01.getString("A1698UCONC");
                objRtn.A1698FCONC = rs01.getString("A1698FCONC");
                objRtn.A1698HCONC = rs01.getString("A1698HCONC");

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

    public PX038S04A1698Filter loadPX038S04A1698(PX038S04A1698Filter filter, String strOption) throws SQLException, Exception {
        List<PX038S04A1698Filter> lstRtn = new ArrayList<PX038S04A1698Filter>(0);
        PX038S04A1698Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX038S04A1698(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(12, Types.VARCHAR);
            cstmt01.registerOutParameter(13, Types.VARCHAR);

            cstmt01.setString(1, strOption);
            cstmt01.setString(2, filter.VP_A1698CCUST);
            cstmt01.setString(3, filter.VP_A1698SOURC);
            cstmt01.setString(4, filter.VP_A1698PAIS);
            cstmt01.setString(5, filter.VP_A1698BANK);
            cstmt01.setString(6, filter.VP_A1698FPRDA);
            cstmt01.setString(7, filter.VP_A1698FFILE);
            cstmt01.setString(8, filter.VP_A1698HFILE);
            cstmt01.setString(9, filter.VP_IND_CUR);

            cstmt01.setString(10, filter.VP_A1698COMEN);
            cstmt01.setString(11, filter.VP_A1698STCON);

            cstmt01.execute();
            filter.dbException.SQLCODE = cstmt01.getString(12);
            filter.dbException.MESSAGE = cstmt01.getString(13);

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
        return filter;
    }
}
