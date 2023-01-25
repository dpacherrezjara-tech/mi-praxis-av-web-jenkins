/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A2672Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class LoadGranPlanDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public LoadGranPlanDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public LoadGranPlanDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2672Filter> lstsearch(A2672Filter filter) throws SQLException, Exception {
        List<A2672Filter> lstRtn = new ArrayList<>(0);
        A2672Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00997(?,?,?,?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00807(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setInt(1, filter.VP_FILTER);
            cstmt01.setString(2, filter.VP_FROM_FILTER);
            cstmt01.setString(3, filter.VP_TO_FILTER);
            cstmt01.setString(4, filter.VP_FROM_FILTER2);
            cstmt01.setString(5, filter.VP_TO_FILTER2);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A2672Filter();
                if (!filter.VP_FILTER.equals(3)) {
                    objRtn.A2672FEPRO = rs01.getString("A2672FEPRO");
                    objRtn.A2672FINGR = rs01.getString("A2672FINGR");
                    objRtn.A2672CTRAL = rs01.getDouble("A2672CTRAL");
                    objRtn.A2672CTPYT = rs01.getDouble("A2672CTPYT");
                    objRtn.A2672STATS = rs01.getString("A2672STATS");

                } else {
                    objRtn.A2672FEPRO = rs01.getString("A1796FREGI");
                    objRtn.A2672LOTE = rs01.getString("A1796LOTE");
                }


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

    public String setLoadGP(A2672Filter filter) throws SQLException, Exception {

        CallableStatement cstmt = null;
        ResultSet rst = null;
        String STR_RESULT = "";
        String strSQL;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01006(?,?,?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00807(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            //cstmt.registerOutParameter(6, Types.VARCHAR);
            //cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString("VP_DATE_FILTER", filter.VP_DATE_FILTER);
            cstmt.setString("VP_LOTE", filter.VP_LOTE);
            cstmt.setString("VP_IATA", filter.VP_IATA);
            cstmt.setString("IN_BASE", filter.VP_BASE);

            cstmt.setString("IN_USER", session.getUserView().getUserInfo().USR);
            cstmt.setString("IN_FREGI", Functions.getFechaActual());
            cstmt.setString("IN_HREGI", Functions.getHoraActual());

            cstmt.execute();
            rst = cstmt.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cstmt.close();
            //filter.dbException.SQLCODE = cstmt.getString(6);
            //filter.dbException.MESSAGE = cstmt.getString(7);
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }
}
