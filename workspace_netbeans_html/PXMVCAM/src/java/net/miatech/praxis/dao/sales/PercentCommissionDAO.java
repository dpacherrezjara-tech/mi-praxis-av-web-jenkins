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
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00806Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class PercentCommissionDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public PercentCommissionDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public PercentCommissionDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP00796Filter> getSQP00132Filter(SQP00796Filter filter) throws SQLException, Exception {
        List<SQP00796Filter> lstRtn = new ArrayList<>(0);
        SQP00796Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP00796(?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, filter.VP_A2448CCUST);
            cstmt01.setString(2, filter.VP_A2448IATA);
            cstmt01.setString(3, filter.VP_A2448CODEA);
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
                objRtn = new SQP00796Filter();
                objRtn.A2448CCUST = rs01.getString("A2448CCUST");
                objRtn.A2448IATA = rs01.getString("A2448IATA");
                objRtn.A2448CODEA = rs01.getString("A2448CODEA");
                objRtn.A2448DESCR = rs01.getString("A2448DESCR");
                objRtn.A2448FORMA = rs01.getString("A2448FORMA");
                objRtn.A2448TRNCU = rs01.getString("A2448TRNCU");//
                objRtn.A2448CLASX = rs01.getString("A2448CLASX");
                objRtn.A2448CODEX = rs01.getString("A2448CODEX");
                objRtn.A2448SCODX = rs01.getString("A2448SCODX");
                objRtn.A2448IATAX = rs01.getString("A2448IATAX");//
                objRtn.A2448MCARR = rs01.getString("A2448MCARR");
                objRtn.A2448TPASS = rs01.getString("A2448TPASS");
                objRtn.A2448ACODE = rs01.getString("A2448ACODE");
                objRtn.A2448FBASI = rs01.getString("A2448FBASI");
                objRtn.A2448TDESI = rs01.getString("A2448TDESI");
                objRtn.A2448TDESI = rs01.getString("A2448TDESI");
                objRtn.A2448CLASS = rs01.getString("A2448CLASS");
                objRtn.A2448CODE = rs01.getString("A2448CODE");
                objRtn.A2448SCODE = rs01.getString("A2448SCODE");
                objRtn.A2448MOPAY = rs01.getString("A2448MOPAY");
                objRtn.A2448ANCIL = rs01.getString("A2448ANCIL");
                objRtn.A2448COMM = rs01.getDouble("A2448COMM");
                objRtn.A2448FINIV = rs01.getString("A2448FINIV");
                objRtn.A2448FFINV = rs01.getString("A2448FFINV");
                objRtn.A2448REGIS = rs01.getString("A2448REGIS");
                objRtn.A2448FREGI = rs01.getString("A2448FREGI");
                objRtn.A2448HREGI = rs01.getString("A2448HREGI");
                objRtn.A2448REGVI = rs01.getString("A2448REGVI");
                objRtn.A2448FREVI = rs01.getString("A2448FREVI");
                objRtn.A2448HREVI = rs01.getString("A2448HREVI");
                objRtn.A003KEY3 = rs01.getString("A003KEY3");
                objRtn.A2448TOUR = rs01.getString("A2448TOUR");
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

    public String get_PX112S03A1757(String VP_OPTION, String VP_PARAM) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String lstRtn = "";

        String SQLCLL01 = "{CALL PX112S03A1757(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.VARCHAR);
            cstmt01.setString(1, VP_OPTION);
            cstmt01.setString(2, VP_PARAM);
            cstmt01.execute();
            lstRtn = cstmt01.getString(3);

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

    public SQP00806Filter setSQP00651(SQP00806Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL SQP00806(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(26, Types.VARCHAR);
            cstmt.registerOutParameter(27, Types.VARCHAR);

            cstmt.setString(1, filter.OPCION);
            cstmt.setString(2, filter.A2448IATA);
            cstmt.setString(3, filter.A2448CCUST);
            cstmt.setString(4, filter.A2448CODEA);
            cstmt.setString(5, filter.A2448DESCR);
            cstmt.setString(6, filter.A2448FORMA);
            cstmt.setString(7, filter.A2448TRNCU);
            cstmt.setString(8, filter.A2448CLASX);
            cstmt.setString(9, filter.A2448CODEX);
            cstmt.setString(10, filter.A2448SCODX);
            cstmt.setString(11, filter.A2448IATAX);
            cstmt.setString(12, filter.A2448MCARR);
            cstmt.setString(13, filter.A2448TPASS);
            cstmt.setString(14, filter.A2448ACODE);
            cstmt.setString(15, filter.A2448TOUR);
            cstmt.setString(16, filter.A2448FBASI);
            cstmt.setString(17, filter.A2448TDESI);
            cstmt.setString(18, filter.A2448CLASS);
            cstmt.setString(19, filter.A2448CODE);
            cstmt.setString(20, filter.A2448SCODE);
            cstmt.setString(21, filter.A2448MOPAY);
            cstmt.setString(22, filter.A2448ANCIL);
            cstmt.setDouble(23, filter.A2448COMM);
            cstmt.setString(24, filter.A2448FINIV);
            cstmt.setString(25, filter.A2448FFINV);
            //cstmt.setString22, filter.OU_SQLCODE);
            //cstmt.setString(23, filter.OU_MESSAGE);

            cstmt.execute();

            filter.dbException.SQLCODE = cstmt.getString(26);
            filter.dbException.MESSAGE = cstmt.getString(27);
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
