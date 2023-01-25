/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.discharges;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SQP03893Filter;
import net.miatech.beans.SQP03894Filter;
import net.miatech.beans.SQP03901Filter;
import net.miatech.beans.SQP03922Filter;
import net.miatech.beans.SQP03923Filter;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class ParametersNoShowDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ParametersNoShowDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ParametersNoShowDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP03893Filter> loadSQP03893(SQP03893Filter filter) throws SQLException, Exception {
        List<SQP03893Filter> lstRtn = new ArrayList<>(0);
        SQP03893Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03893(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_CPARM);
            cstmt01.setString(4, filter.VP_DESCR);
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
                objRtn = new SQP03893Filter();
                objRtn.A3931CCUST = rs01.getString("A3931CCUST");
                objRtn.A3931CPARM = rs01.getString("A3931CPARM").trim();
                objRtn.A3931DESCR = rs01.getString("A3931DESCR").trim();
                objRtn.A3931ORDEN = rs01.getInt("A3931ORDEN");
                objRtn.A3931APLIC = rs01.getString("A3931APLIC");
                objRtn.A3931TIPO1 = rs01.getString("A3931TIPO1");
                objRtn.A3931PARM1 = rs01.getString("A3931PARM1").trim();
                objRtn.A3931TIPO2 = rs01.getString("A3931TIPO2");
                objRtn.A3931PARM2 = rs01.getString("A3931PARM2").trim();
                objRtn.A3931ARCHI = rs01.getString("A3931ARCHI").trim();
                objRtn.A3931ESTAD = rs01.getString("A3931ESTAD");
                objRtn.A3931USRIN = rs01.getString("A3931USRIN");
                objRtn.A3931FECIN = rs01.getString("A3931FECIN");
                objRtn.A3931HORIN = rs01.getString("A3931HORIN");
                objRtn.A3931USRAC = rs01.getString("A3931USRAC");
                objRtn.A3931FECAC = rs01.getString("A3931FECAC");
                objRtn.A3931HORAC = rs01.getString("A3931HORAC");
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

    public SQP03894Filter setSQP03894(SQP03894Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL SQP03894(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.VARCHAR);

            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.A3931CPARM);
            cstmt.setString(4, filter.A3931DESCR);
            cstmt.setInt(5, filter.A3931ORDEN);
            cstmt.setString(6, filter.A3931APLIC);
            cstmt.setString(7, filter.A3931TIPO1);
            cstmt.setString(8, filter.A3931PARM1);
            cstmt.setString(9, filter.A3931TIPO2);
            cstmt.setString(10, filter.A3931PARM2);
            cstmt.setString(11, filter.A3931ARCHI);
            cstmt.setString(12, filter.A3931ESTAD);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(13);
            filter.dbException.MESSAGE = cstmt.getString(14);

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

    public List<SQP03901Filter> loadSQP03901(SQP03901Filter filter) throws SQLException, Exception {
        List<SQP03901Filter> lstRtn = new ArrayList<>(0);
        SQP03901Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03901(?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03901Filter();
                objRtn.A3968CCUST = rs01.getString("A3968CCUST");
                objRtn.A3968CATAL = rs01.getString("A3968CATAL").trim();
                objRtn.A3968CATAL_2 = rs01.getString("A3968CATAL_2").trim();
                objRtn.A3968KEY1 = rs01.getString("A3968KEY1").trim();
                objRtn.A3968DESCR = rs01.getString("A3968DESCR").trim();
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

    public List<SQP03922Filter> loadSQP03922(SQP03922Filter filter) throws SQLException, Exception {
        List<SQP03922Filter> lstRtn = new ArrayList<>(0);
        SQP03922Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03922(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.VP_A3975KEY1);
            cstmt01.setString(3, filter.VP_A3975KEY2);
            cstmt01.setString(4, filter.VP_A3975DESC1);
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
                objRtn = new SQP03922Filter();
                objRtn.A3975KEY1 = rs01.getString("A3975KEY1");
                objRtn.A3975KEY2 = rs01.getString("A3975KEY2").trim();
                objRtn.A3975DESC1 = rs01.getString("A3975DESC1").trim();
                objRtn.A3975STATU = rs01.getString("A3975STATU").trim();
                objRtn.A3975REGIS = rs01.getString("A3975REGIS").trim();
                objRtn.A3975FREGI = rs01.getString("A3975FREGI").trim();
                objRtn.A3975HREGI = rs01.getString("A3975HREGI").trim();
                objRtn.A3975REVIS = rs01.getString("A3975REVIS").trim();
                objRtn.A3975FREVI = rs01.getString("A3975FREVI").trim();
                objRtn.A3975HREVI = rs01.getString("A3975HREVI").trim();                    
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
    public SQP03923Filter setSQP03923(SQP03923Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL SQP03923(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(15, Types.VARCHAR);
            cstmt.registerOutParameter(16, Types.VARCHAR);
            cstmt.setString(1, filter.VP_ACTION);            
            cstmt.setString(2, filter.A3975KEY1);
            cstmt.setString(3, filter.A3975KEY2);
            cstmt.setString(4, filter.A3975DESC1);
            cstmt.setString(5, filter.A3975DESC2);
            cstmt.setInt(6, filter.A3975CANT1);
            cstmt.setInt(7, filter.A3975CANT2);
            cstmt.setString(8, filter.A3975FECH1);
            cstmt.setString(9, filter.A3975FECH2);
            cstmt.setString(10, filter.A3975COME1);
            cstmt.setString(11, filter.A3975COME2);
            cstmt.setString(12, filter.A3975STAT1);
            cstmt.setString(13, filter.A3975STAT2);
            cstmt.setString(14, filter.A3975STATU);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(15);
            filter.dbException.MESSAGE = cstmt.getString(16);

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
