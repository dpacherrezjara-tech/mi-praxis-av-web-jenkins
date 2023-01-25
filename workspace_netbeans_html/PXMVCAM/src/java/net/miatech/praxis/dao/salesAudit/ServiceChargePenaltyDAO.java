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
import net.miatech.beans.SaleAudit.A2252Filter;
import net.miatech.beans.SaleAudit.SQP00874Filter;
import net.miatech.beans.SaleAudit.SQP00942Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ServiceChargePenaltyDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ServiceChargePenaltyDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ServiceChargePenaltyDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2252Filter> lstsearch(A2252Filter filter) throws SQLException, Exception {
        List<A2252Filter> lstRtn = new ArrayList<A2252Filter>(0);
        A2252Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01439(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FILTER);
            cstmt01.setString(3, filter.VP_Type);
            cstmt01.setString(4, filter.VP_DATEFROM);
            cstmt01.setString(5, filter.VP_DATETO);
            cstmt01.setString(6, filter.VP_STATUS);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A2252Filter();

                objRtn.A2252CCUST = rs01.getString("A2252CCUST");
                objRtn.A2252TRNCU = rs01.getString("A2252TRNCU");
                objRtn.A2252COD = rs01.getString("A2252COD");
                objRtn.A2252LEVEL = rs01.getString("A2252LEVEL");
                objRtn.A2252TRNPS = rs01.getString("A2252TRNPS");
                objRtn.A2252IVA = rs01.getString("A2252IVA");
                objRtn.A2252INDIC = rs01.getString("A2252INDIC");
                objRtn.A2252VALOR = rs01.getDouble("A2252VALOR");
                objRtn.A2252MDA = rs01.getString("A2252MDA");
                objRtn.A2252DATEF = rs01.getString("A2252DATEF");
                objRtn.A2252DATET = rs01.getString("A2252DATET");
                objRtn.A2252DESCR = rs01.getString("A2252DESCR");
                objRtn.A2252REGIS = rs01.getString("A2252REGIS");
                objRtn.A2252FREGI = rs01.getString("A2252FREGI");
                objRtn.A2252HREGI = rs01.getString("A2252HREGI");
                objRtn.A2252REVIS = rs01.getString("A2252REVIS");
                objRtn.A2252FREVI = rs01.getString("A2252FREVI");
                objRtn.A2252HREVI = rs01.getString("A2252HREVI");
                objRtn.A2252SEQ = rs01.getString("A2252SEQ");
                objRtn.A2252FLAG = rs01.getString("A2252FLAG");

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

    public A2252Filter mantenimientoCharge(A2252Filter filter) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01440(?,?, ?, ?,?, ?, ?, ?, ?, ?,?, ?, ?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(17, Types.VARCHAR);
            cstmt01.registerOutParameter(18, Types.VARCHAR);

            cstmt01.setString(1, filter.VP_FILTER);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_Type);
            cstmt01.setString(4, filter.A2252COD);
            cstmt01.setString(5, filter.A2252INDIC);
            cstmt01.setString(6, filter.A2252IVA);
            cstmt01.setDouble(7, filter.A2252VALOR);
            cstmt01.setString(8, filter.A2252DATEF.replaceAll("/", ""));
            cstmt01.setString(9, filter.A2252DATET.replaceAll("/", ""));
            cstmt01.setString(10, filter.A2252DESCR);
            cstmt01.setString(11, filter.A2252MDA);
            cstmt01.setString(12, filter.A2252TRNCU);
            cstmt01.setString(13, filter.A2252SEQ);
            cstmt01.setString(14, session.getUserView().getUserInfo().USR);
            cstmt01.setString(15, Functions.getFechaActual());
            cstmt01.setString(16, Functions.getHoraActual());

            cstmt01.execute();
            filter.dbException.SQLCODE = cstmt01.getString(17);
            filter.dbException.MESSAGE = cstmt01.getString(18);
        } catch (Exception e) {
            System.out.println("E---->"+e.getMessage());
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
        return filter;
    }
}
