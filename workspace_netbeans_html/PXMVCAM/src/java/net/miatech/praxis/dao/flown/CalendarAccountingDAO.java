/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import net.miatech.beans.A1737Filter;
import net.miatech.beans.PX245S01A1980Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.flown.A1708;
import net.miatech.praxis.flown.A1737;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class CalendarAccountingDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CalendarAccountingDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CalendarAccountingDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX245S01A1980Filter> loadPX245S01A1980(PX245S01A1980Filter filter) throws SQLException, Exception {
        List<PX245S01A1980Filter> lstRtn = new ArrayList<>(0);
        PX245S01A1980Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP00549(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FPRDA_FROM);
            cstmt01.setString(3, filter.IN_FPRDA_TO);
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
                objRtn = new PX245S01A1980Filter();
                objRtn.A1980CCUST = rs01.getString("A1980CCUST");
                objRtn.A1980FECMX = rs01.getString("A1980FECMX");
                objRtn.A1980FECPR = rs01.getString("A1980FECPR");
                objRtn.A1980FECCO = rs01.getString("A1980FECCO");
                objRtn.A1980GL = rs01.getString("A1980GL");
                if (objRtn.A1980GL.equals("0")) {
                    objRtn.A1980GL = "OPEN";
                } else {
                    objRtn.A1980GL = "CLOSED";
                }
                objRtn.A1980HMXGL = rs01.getString("A1980HMXGL");
                objRtn.A1980HPRGL = rs01.getString("A1980HPRGL");
                objRtn.A1980AR = rs01.getString("A1980AR");
                if (objRtn.A1980AR.equals("0")) {
                    objRtn.A1980AR = "OPEN";
                } else {
                    objRtn.A1980AR = "CLOSED";
                }
                objRtn.A1980HMXAR = rs01.getString("A1980HMXAR");
                objRtn.A1980HPRAR = rs01.getString("A1980HPRAR");
                objRtn.A1980AP = rs01.getString("A1980AP");
                if (objRtn.A1980AP.equals("0")) {
                    objRtn.A1980AP = "OPEN";
                } else {
                    objRtn.A1980AP = "CLOSED";
                }
                objRtn.A1980HMXAP = rs01.getString("A1980HMXAP");
                objRtn.A1980HPRAP = rs01.getString("A1980HPRAP");
                objRtn.A1980FECIN = rs01.getString("A1980FECIN");
                if (objRtn.A1980FECIN.trim().length() < 10) {
                    objRtn.A1980FECIN = "";
                }
                objRtn.A1980FECFN = rs01.getString("A1980FECFN");
                if (objRtn.A1980FECFN.trim().length() < 10) {
                    objRtn.A1980FECFN = "";
                }
                objRtn.A1980REGIS = rs01.getString("A1980REGIS");
                objRtn.A1980FREGI = rs01.getString("A1980FREGI");
                if (objRtn.A1980FREGI.trim().length() < 10) {
                    objRtn.A1980FREGI = "";
                }
                objRtn.A1980HREGI = rs01.getString("A1980HREGI");
                objRtn.A1980REVIS = rs01.getString("A1980REVIS");
                objRtn.A1980FREVI = rs01.getString("A1980FREVI");
                if (objRtn.A1980FREVI.trim().length() < 10) {
                    objRtn.A1980FREVI = "";
                }
                objRtn.A1980HREVI = rs01.getString("A1980HREVI");
                //Pagin
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(CalendarAccountingDAO.class.getName()).log(Level.SEVERE, null, ex);
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

    public PX245S01A1980Filter setPX112S02A1757(PX245S01A1980Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL SQP00554(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(17, Types.VARCHAR);
            cstmt.registerOutParameter(18, Types.VARCHAR);

            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2,  session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.A1980FECMX);
            cstmt.setString(4, filter.A1980FECPR);
            cstmt.setString(5, filter.A1980FECCO);
            cstmt.setString(6, filter.A1980GL);
            cstmt.setString(7, filter.A1980HMXGL);
            cstmt.setString(8, filter.A1980HPRGL);
            cstmt.setString(9, filter.A1980AR);
            cstmt.setString(10, filter.A1980HMXAR);
            cstmt.setString(11, filter.A1980HPRAR);
            cstmt.setString(12, filter.A1980AP);
            cstmt.setString(13, filter.A1980HMXAP);
            cstmt.setString(14, filter.A1980HPRAP);
            cstmt.setString(15, filter.A1980FECIN);
            cstmt.setString(16, filter.A1980FECFN);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(17);
            filter.dbException.MESSAGE = cstmt.getString(18);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(CalendarAccountingDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
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
