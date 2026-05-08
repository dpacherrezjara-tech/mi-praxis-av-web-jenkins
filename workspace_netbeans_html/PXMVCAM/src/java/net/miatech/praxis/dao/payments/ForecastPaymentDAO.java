/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2295Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author 
 */
public class ForecastPaymentDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ForecastPaymentDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ForecastPaymentDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2295Filter> loadPX290MPS074(A2295Filter filter) throws SQLException, Exception {
        List<A2295Filter> list = new ArrayList<A2295Filter>();
        A2295Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "ADM");
        hmDescDocType.put("R", "Rfnd");
        hmDescDocType.put("C", "ACM");
        hmDescDocType.put("A", "Acredit");

        double SVFOPOT = 0, SVFOPNETR = 0 ;
        double SVFOPCA = 0, SVFOPCC = 0 ;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS074_V1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SCOUNTRY.trim());
            cstmt.setString(3, filter.IN_SPAYMENT.trim());            
            cstmt.setString(4, filter.IN_DATE_FROM.trim());
            cstmt.setString(5, filter.IN_DATE_TO.trim());

            cstmt.setString(6, filter.IN_TKT.trim());
            cstmt.setString(7, filter.IN_SAGENT.trim());
            cstmt.setString(8, filter.IN_SAUTHOC.trim());
            cstmt.setString(9, filter.IN_PNR.trim());
            cstmt.setString(10, filter.IN_SCARDN1.trim());
            cstmt.setString(11, filter.IN_SCARDN2.trim());
            cstmt.setString(12, filter.IN_TDOC.trim());

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);          
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                SVFOPOT = rs01.getDouble("SVFOPOT");
                SVFOPNETR = rs01.getDouble("SVFOPNETR");
                SVFOPCA = rs01.getDouble("SVFOPCA");
                SVFOPCC = rs01.getDouble("SVFOPCC");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {

                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2295Filter();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO;

                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.TKT = rs01.getString("TKT").trim();
                    objRtn.SEQ = rs01.getString("SEQ").trim();
                    objRtn.CORRL = rs01.getString("CORRL").trim();
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    objRtn.descTDOC = hmDescDocType.get(rs01.getString("TDOC").trim());
                    objRtn.CFUENTE = rs01.getString("CFUENTE").trim();
                    objRtn.SUBFTE = rs01.getString("SUBFTE").trim();
                    objRtn.SDATE = rs01.getString("SDATE").trim();
                    objRtn.SAGENT = rs01.getString("SAGENT").trim();
                    objRtn.SCONSOL = rs01.getString("SCONSOL").trim();
                    objRtn.SVFOPCA = rs01.getString("SVFOPCA").trim();
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    objRtn.SCARDN1 = rs01.getString("SCARDN1").trim();
                    objRtn.SCARCOD1 = rs01.getString("SCARCOD1").trim();
                    objRtn.SVFOPCC = rs01.getString("SVFOPCC").trim();
                    objRtn.SVFOPOT = rs01.getDouble("SVFOPOT");
                    objRtn.INVOICE0 = rs01.getString("INVOICE0").trim();
                    objRtn.INVOICE1 = rs01.getString("INVOICE1").trim();
                    objRtn.SVFOPNETR = rs01.getDouble("SVFOPNETR");
                    objRtn.FPROC = rs01.getString("FPROC").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();

                    objRtn.TOT_SVFOPOT = SVFOPOT;
                    objRtn.TOT_SVFOPNETR = SVFOPNETR;
                    objRtn.TOT_SVFOPCA = SVFOPCA;
                    objRtn.TOT_SVFOPCC = SVFOPCC;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
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

        return list;
    }
    
    public List<A2295Filter> loadPX290MPS074TC(A2295Filter filter) throws SQLException, Exception {
        List<A2295Filter> list = new ArrayList<>();
        A2295Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXISMP.MPS586(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SCOUNTRY.trim());
            cstmt.setString(3, "CC");            
            cstmt.setString(4, filter.IN_DATE_FROM.trim());
            cstmt.setString(5, filter.IN_DATE_TO.trim());
            cstmt.setString(6, filter.IN_TKT.trim());
            cstmt.setString(7, filter.IN_SAGENT.trim());
            cstmt.setString(8, filter.IN_SAUTHOC.trim());
            cstmt.setString(9, filter.IN_PNR.trim());
            cstmt.setString(10, filter.IN_SCARDN1.trim());
            cstmt.setString(11, filter.IN_SCARDN2.trim());
            cstmt.setString(12, filter.IN_TDOC.trim());

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                objRtn = new A2295Filter();
                objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                objRtn.IN_DATE_TO = filter.IN_DATE_TO;

                objRtn.INVOICE1 = rs01.getString("INVOICE1").trim();
                objRtn.SPAYMENT    = rs01.getString("SPAYMENT");
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.SCARCOD1 = rs01.getString("SCARCOD1").trim();
                objRtn.CCUST = rs01.getString("CCUST").trim();
                objRtn.CFUENTE = rs01.getString("CFUENTE").trim();
                objRtn.SDATE = rs01.getString("SDATE").trim();
                objRtn.SUBFTE = rs01.getString("SUBFTE").trim();
                objRtn.SCONSOL = rs01.getString("SCONSOL").trim();
                objRtn.FDESD = rs01.getString("FDESD").trim();
                objRtn.MCLOS = rs01.getString("MCLOS").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.SCURREVEN = rs01.getString("SCURREVEN").trim();
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.FPAGO       = rs01.getString("FPAGO").trim();
                objRtn.FPAGOP       = rs01.getString("FPAGOP").trim();
                objRtn.COREP       = rs01.getString("COREP").trim();
                objRtn.CORPP       = rs01.getString("CORPP").trim();

                objRtn.SVFOPC1 = rs01.getDouble("SUMA_SVFOPC1"); // Si necesitas double, usa getDouble
                objRtn.SVFOPUSD = rs01.getDouble("SUMA_SVFOPUSD");

                list.add(objRtn);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) try { rs01.close(); } catch (SQLException e) { logError.error("Error closing ResultSet", e); }
            if (cstmt != null) try { cstmt.close(); } catch (SQLException e) { logError.error("Error closing CallableStatement", e); }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    
    public List<A2295Filter> loadPX290MPS074CASH(A2295Filter filter) throws SQLException, Exception {
        List<A2295Filter> list = new ArrayList<>();
        A2295Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXISMP.MPS428(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SCOUNTRY.trim());
            cstmt.setString(3, "CA");
            cstmt.setString(4, filter.IN_DATE_FROM.trim());
            cstmt.setString(5, filter.IN_DATE_TO.trim());
            cstmt.setString(6, filter.IN_TKT.trim());
            cstmt.setString(7, filter.IN_SAGENT.trim());
            cstmt.setString(8, filter.IN_SAUTHOC.trim());
            cstmt.setString(9, filter.IN_PNR.trim());
            cstmt.setString(10, filter.IN_SCARDN1.trim());
            cstmt.setString(11, filter.IN_SCARDN2.trim());
            cstmt.setString(12, filter.IN_TDOC.trim());

            cstmt.execute();
            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                objRtn = new A2295Filter();

                objRtn.INVOICE0    = rs01.getString("INVOICE0").trim();
                objRtn.SPAYMENT    = rs01.getString("SPAYMENT");
                objRtn.SCOUNTRY    = rs01.getString("SCOUNTRY").trim();
                objRtn.CCUST       = rs01.getString("CCUST").trim();
                objRtn.CFUENTE     = rs01.getString("CFUENTE").trim();
                objRtn.SUBFTE      = rs01.getString("SUBFTE").trim();
                objRtn.SCONSOL     = rs01.getString("SCONSOL").trim();
                objRtn.SDATE       = rs01.getString("SDATE").trim();
                objRtn.MCLOS       = rs01.getString("MCLOS").trim();
                objRtn.SCURRENCY   = rs01.getString("SCURRENCY").trim();
                objRtn.SCURREVEN   = rs01.getString("SCURREVEN").trim();
                objRtn.F_STVAL       = rs01.getString("STVAL").trim();
                objRtn.FPAGO       = rs01.getString("FPAGO").trim();
                objRtn.FPAGOP       = rs01.getString("FPAGOP").trim();
                objRtn.COREP       = rs01.getString("COREP").trim();

                objRtn.SVFOPNETR   = rs01.getDouble("SUMA_SVFOPNETR");
                objRtn.SVFOPUSD    = rs01.getDouble("SUMA_SVFOPUSD");


                objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                objRtn.IN_DATE_TO   = filter.IN_DATE_TO;

                list.add(objRtn);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) try { rs01.close(); } catch (SQLException e) { logError.error("Error closing ResultSet", e); }
            if (cstmt != null) try { cstmt.close(); } catch (SQLException e) { logError.error("Error closing CallableStatement", e); }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public A2295Filter getTotalRecords() throws SQLException, Exception {
        A2295Filter objRtn = new A2295Filter();
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPGETCOUNTMPF074()}";
        ResultSet rst = null;
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.execute();
            rst = cstmt.getResultSet();
            while (rst.next()) {
                objRtn.CANT = rst.getLong("CANT");
            }
            rst.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
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
        return objRtn;
    }
    
    }
