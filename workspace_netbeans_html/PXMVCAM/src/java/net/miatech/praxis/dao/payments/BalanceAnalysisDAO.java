/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2365Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
/**
 *
 * @author ctarazona
 */
public class BalanceAnalysisDAO {

    private net.miatech.beans.spring.implement.IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public BalanceAnalysisDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BalanceAnalysisDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    //**************************************************************************
    //***************************** PX307 **************************************
    //**************************************************************************
    public List<A2290Filter> loadPX307SQP00936_1(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;
        //antes = SQP00936_1

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01973(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.strCampo.trim());
            cstmt.setString(12, filter.strOrden.trim());
            cstmt.setString(13, filter.IN_CARDN.trim());
            cstmt.setString(14, filter.IN_CARDC.trim());
            cstmt.setString(15, filter.IN_FECHA.trim());
            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.TYPE = filter.strOrden;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.IN_FECHA = filter.IN_FECHA;

                    if (objRtn.IN_FECHA.equals("1")) {
                        objRtn.DATEC = rs01.getString("SDATE").trim();
                    } else {
                        objRtn.DATEC = rs01.getString("RDATE").trim();
                    }

                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    if (!filter.FLAGC.equals("USD")) {
                        objRtn.IN_PAYMENT = rs01.getString("SCURRENCY").trim();
                    }

                    /* if (!filter.strSQL.equals("CURR") && !filter.strSQL.equals("COUN") && filter.strSQL.equals("TARJ")) {
                     objRtn.SCOUNTRY = rs01.getString("SCARCOD").trim();
                     objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                     if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                     objRtn.strDescCountry = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                     }


                     // objRtn.strDescCountry = rs01.getString("DES_DATOS").trim(); 
                     } else if (!filter.strSQL.equals("CURR") && filter.strSQL.equals("COUN") && !filter.strSQL.equals("TARJ")) {
                     objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                     objRtn.IN_COUNTRY = rs01.getString("SCOUNTRY").trim();
                     objRtn.strDescCountry = rs01.getString("DES_DATO").trim();

                     }*/
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                    /*objRtn.TDATE = rs01.getString("TDATE").trim();
                     objRtn.DATEF = rs01.getString("DATEF").trim();
                     objRtn.BDATEP = rs01.getString("BDATEP").trim();*/
                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

                    //Perc
                    if (!filter.FLAGC.equals("LOC")) {
                        objRtn.dblPerc01 = (dblSVFOP > 0) ? (objRtn.SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblPerc02 = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.IN_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                        objRtn.dblPerc03 = 100 - objRtn.dblPerc02;
                        objRtn.strPEM = "100";
                        objRtn.dblPerc04 = (dblIN_SVFOP > 0 && dblSVFOP > 0) ? (dblIN_SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblAMOUNTR = 100 - objRtn.dblPerc04;
                    }

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

    public List<A2290Filter> loadPX307SQP00936_2(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

        // antes = SQP00936_2
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01974(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.strCampo.trim());
            cstmt.setString(12, filter.strOrden.trim());
            cstmt.setString(13, filter.IN_CARDN.trim());
            cstmt.setString(14, filter.IN_CARDC.trim());
            cstmt.setString(15, filter.IN_FECHA.trim());
            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.TYPE = filter.strOrden;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.IN_FECHA = filter.IN_FECHA;

                    if (objRtn.IN_FECHA.equals("1")) {
                        objRtn.DATEC = rs01.getString("SDATE").trim();
                    } else {
                        objRtn.DATEC = rs01.getString("RDATE").trim();
                    }

                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    if (!filter.FLAGC.equals("USD")) {
                        objRtn.IN_PAYMENT = rs01.getString("SCURRENCY").trim();
                    }

                    /* if (!filter.strSQL.equals("CURR") && !filter.strSQL.equals("COUN") && filter.strSQL.equals("TARJ")) {
                     objRtn.SCOUNTRY = rs01.getString("SCARCOD").trim();
                     objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                     if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                     objRtn.strDescCountry = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                     }*/
                    // objRtn.strDescCountry = rs01.getString("DES_DATOS").trim(); 
                    if (filter.strSQL.equals("COUN")) {
                        objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.IN_COUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescCountry = rs01.getString("DES_DATO").trim();

                    }

                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                    /*objRtn.TDATE = rs01.getString("TDATE").trim();
                     objRtn.DATEF = rs01.getString("DATEF").trim();
                     objRtn.BDATEP = rs01.getString("BDATEP").trim();*/
                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

                    //Perc
                    if (!filter.FLAGC.equals("LOC")) {
                        objRtn.dblPerc01 = (dblSVFOP > 0) ? (objRtn.SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblPerc02 = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.IN_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                        objRtn.dblPerc03 = 100 - objRtn.dblPerc02;
                        objRtn.strPEM = "100";
                        objRtn.dblPerc04 = (dblIN_SVFOP > 0 && dblSVFOP > 0) ? (dblIN_SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblAMOUNTR = 100 - objRtn.dblPerc04;
                    }

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

    public List<A2290Filter> loadPX307SQP00936_3(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

        //antes = SQP00936_3
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01975(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.strCampo.trim());
            cstmt.setString(12, filter.strOrden.trim());
            cstmt.setString(13, filter.IN_CARDN.trim());
            cstmt.setString(14, filter.IN_CARDC.trim());
            cstmt.setString(15, filter.IN_FECHA.trim());
            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.TYPE = filter.strOrden;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.IN_FECHA = filter.IN_FECHA;

                    if (objRtn.IN_FECHA.equals("1")) {
                        objRtn.DATEC = rs01.getString("SDATE").trim();
                    } else {
                        objRtn.DATEC = rs01.getString("RDATE").trim();
                    }

                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    if (!filter.FLAGC.equals("USD")) {
                        objRtn.IN_PAYMENT = rs01.getString("SCURRENCY").trim();
                    }

                    if (filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCARCOD").trim();
                        objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                        /*if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                         objRtn.strDescCountry = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                         }*/

                        // objRtn.strDescCountry = rs01.getString("DES_DATOS").trim(); 
                    }
                    /*else if (!filter.strSQL.equals("CURR") && filter.strSQL.equals("COUN") && !filter.strSQL.equals("TARJ")) {
                     objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                     objRtn.IN_COUNTRY = rs01.getString("SCOUNTRY").trim();
                     objRtn.strDescCountry = rs01.getString("DES_DATO").trim();

                     }*/

                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                    /*objRtn.TDATE = rs01.getString("TDATE").trim();
                     objRtn.DATEF = rs01.getString("DATEF").trim();
                     objRtn.BDATEP = rs01.getString("BDATEP").trim();*/
                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

                    //Perc
                    if (!filter.FLAGC.equals("LOC")) {
                        objRtn.dblPerc01 = (dblSVFOP > 0) ? (objRtn.SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblPerc02 = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.IN_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                        objRtn.dblPerc03 = 100 - objRtn.dblPerc02;
                        objRtn.strPEM = "100";
                        objRtn.dblPerc04 = (dblIN_SVFOP > 0 && dblSVFOP > 0) ? (dblIN_SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblAMOUNTR = 100 - objRtn.dblPerc04;
                    }

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

    public List<A2290Filter> loadPX307SQP00936(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00936(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.strCampo.trim());
            cstmt.setString(12, filter.strOrden.trim());
            cstmt.setString(13, filter.IN_CARDN.trim());
            cstmt.setString(14, filter.IN_CARDC.trim());
            cstmt.setString(15, filter.IN_FECHA.trim());
            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.TYPE = filter.strOrden;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.IN_FECHA = filter.IN_FECHA;

                    if (objRtn.IN_FECHA.equals("1")) {
                        objRtn.DATEC = rs01.getString("SDATE").trim();
                    } else {
                        objRtn.DATEC = rs01.getString("RDATE").trim();
                    }

                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    if (!filter.FLAGC.equals("USD")) {
                        objRtn.IN_PAYMENT = rs01.getString("SCURRENCY").trim();
                    }

                    if (!filter.strSQL.equals("CURR") && !filter.strSQL.equals("COUN") && filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCARCOD").trim();
                        objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                        /*if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                         objRtn.strDescCountry = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                         }*/

                        // objRtn.strDescCountry = rs01.getString("DES_DATOS").trim(); 
                    } else if (!filter.strSQL.equals("CURR") && filter.strSQL.equals("COUN") && !filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.IN_COUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescCountry = rs01.getString("DES_DATO").trim();

                    }

                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                    /*objRtn.TDATE = rs01.getString("TDATE").trim();
                     objRtn.DATEF = rs01.getString("DATEF").trim();
                     objRtn.BDATEP = rs01.getString("BDATEP").trim();*/
                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

                    //Perc
                    if (!filter.FLAGC.equals("LOC")) {
                        objRtn.dblPerc01 = (dblSVFOP > 0) ? (objRtn.SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblPerc02 = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.IN_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                        objRtn.dblPerc03 = 100 - objRtn.dblPerc02;
                        objRtn.strPEM = "100";
                        objRtn.dblPerc04 = (dblIN_SVFOP > 0 && dblSVFOP > 0) ? (dblIN_SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblAMOUNTR = 100 - objRtn.dblPerc04;
                    }

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

    public List<A2290Filter> loadPX307SQP01002(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        HashMap<String, String> hmDescBank = new HashMap<String, String>();
        hmDescBank.put("AM", "AM");
        hmDescBank.put("AX", "AMERICAN EXPRESS");
        hmDescBank.put("BA", "VISA");
        hmDescBank.put("BC", "UNION PAY");
        hmDescBank.put("BN", "BANCOMER");
        hmDescBank.put("BX", "BANAMEX");
        hmDescBank.put("CA", "MASTERCARD");
        hmDescBank.put("CN", "MASTERCARD");
        hmDescBank.put("CQ", "MASTERCARD");
        hmDescBank.put("DC", "DINNERS");
        hmDescBank.put("DS", "DISCOVERY");
        hmDescBank.put("EB", "UNION PAY");
        hmDescBank.put("GR", "IATAS");
        hmDescBank.put("HD", "UNION PAY");
        hmDescBank.put("HS", "HSBC");
        hmDescBank.put("IK", "MASTERCARD");
        hmDescBank.put("JC", "DISCOVER");
        hmDescBank.put("LC", "UNION PAY");
        hmDescBank.put("MC", "MASTERCARD");
        hmDescBank.put("NH", "UNION PAY");
        hmDescBank.put("PP", "PAYPAL");
        hmDescBank.put("PT", "PAGATODO");
        hmDescBank.put("SA", "SORIANA");
        hmDescBank.put("SB", "SANBORNS");
        hmDescBank.put("SH", "UNION PAY");
        hmDescBank.put("ST", "SANTANDER");
        hmDescBank.put("SW", "UNION PAY");
        hmDescBank.put("TL", "TELECOM");
        hmDescBank.put("TP", "UATP");
        hmDescBank.put("UP", "UNION PAY");
        hmDescBank.put("VI", "VISA");

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0, dblSVFOPCASH = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0, intQTYSVFOPCASH = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01002(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_FTE.trim());
            cstmt.setString(7, filter.IN_COUNTRY.trim());
            cstmt.setString(8, filter.strSQL.trim());
            cstmt.setString(9, filter.strCampo.trim());
            cstmt.setString(10, filter.strOrden.trim());
            cstmt.setString(11, filter.IN_CARDC.trim());
            cstmt.setString(12, filter.IN_FECHA.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                dblSVFOPCASH = rs01.getDouble("CASH");
                intQTYSVFOPCASH = rs01.getInt("CASHQTY");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.TYPE = filter.strOrden;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;

                    if (filter.strSQL.equals("CURR")) {
                        if (objRtn.IN_FECHA.equals("1")) {
                            objRtn.DATEC = rs01.getString("SDATE").trim();
                        } else {
                            objRtn.DATEC = rs01.getString("RDATE").trim();
                        }
                    }

                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DATEC);
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    if (!filter.strSQL.equals("CURR") && !filter.strSQL.equals("COUN") && filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCARCOD").trim();
                        objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                        if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                            objRtn.strDescCountry = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                        }
                    } else if (!filter.strSQL.equals("CURR") && filter.strSQL.equals("COUN") && !filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.IN_COUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescCountry = rs01.getString("DES_DATO").trim();
                    }
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                    objRtn.SVFOP_C = rs01.getDouble("CASH");
                    objRtn.QTYSVFOP_C = rs01.getInt("CASHQTY");

                    objRtn.totSVFOP_C = dblSVFOPCASH;
                    objRtn.totQTYSVFOP_C = intQTYSVFOPCASH;

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

                    //Perc
                    objRtn.dblPerc01 = (dblSVFOP > 0) ? (objRtn.SVFOP * 100.0) / dblSVFOP : 0.00;
                    objRtn.dblPerc02 = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.IN_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                    objRtn.dblPerc03 = 100 - objRtn.dblPerc02;
                    objRtn.dblPerc04 = (dblIN_SVFOP > 0 && dblSVFOP > 0) ? (dblIN_SVFOP * 100.0) / dblSVFOP : 0.00;
                    objRtn.dblAMOUNTR = 100 - objRtn.dblPerc04;
                    objRtn.strPEM = "100";

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

    public List<A2290Filter> loadPX307SQP01051(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01051(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.strSQL.trim());
            cstmt.setString(10, filter.strCampo.trim());
            cstmt.setString(11, filter.strOrden.trim());
            cstmt.setString(12, filter.IN_CARDN.trim());
            cstmt.setString(13, filter.IN_CARDC.trim());
            cstmt.setString(14, filter.IN_FECHA.trim());
            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.TYPE = filter.strOrden;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.IN_FECHA = filter.IN_FECHA;

                    /*if (objRtn.IN_FECHA.equals("1")) {
                     objRtn.DATEC = rs01.getString("SDATE").trim();
                     } else {
                     objRtn.DATEC = rs01.getString("RDATE").trim();
                     }*/
                    objRtn.DATEC = rs01.getString("FECHA").trim();

                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);

                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    if (!filter.FLAGC.equals("USD")) {
                        objRtn.IN_PAYMENT = rs01.getString("SCURRENCY").trim();
                    }

                    if (!filter.strSQL.equals("CURR") && !filter.strSQL.equals("COUN") && filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCARCOD").trim();
                        objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                        /*if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                         objRtn.strDescCountry = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                         }*/
                        objRtn.strDescCountry = rs01.getString("DES_CARD").trim();

                    } else if (!filter.strSQL.equals("CURR") && filter.strSQL.equals("COUN") && !filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.IN_COUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescCountry = rs01.getString("DES_DATO").trim();

                    }

                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

                    //Perc
                    objRtn.dblPerc01 = (dblSVFOP > 0) ? (objRtn.SVFOP * 100.0) / dblSVFOP : 0.00;
                    objRtn.dblPerc02 = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.IN_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                    if (objRtn.dblPerc02 == 99.99999999999999 || objRtn.dblPerc02 == 100.00000000000001) {
                        objRtn.dblPerc03 = 100 - Math.round(objRtn.dblPerc02);
                    } else {
                        objRtn.dblPerc03 = 100 - (objRtn.dblPerc02);
                    }
                    objRtn.strPEM = "100";
                    objRtn.dblPerc04 = (dblIN_SVFOP > 0 && dblSVFOP > 0) ? (dblIN_SVFOP * 100.0) / dblSVFOP : 0.00;
                    objRtn.dblAMOUNTR = 100 - objRtn.dblPerc04;

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

    public A2290Filter loadPX307SQP01052_1(A2290Filter filter) throws SQLException, Exception {

        A2290Filter objRtn = new A2290Filter();

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblSVFOP = 0, dblSVFOPCASH = 0;
        int intQTYSVFOP = 0, intQTYSVFOPCASH = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01052_2(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_FTE.trim());
            cstmt.setString(7, filter.IN_COUNTRY.trim());
            cstmt.setString(8, filter.strSQL.trim());
            cstmt.setString(9, filter.strCampo.trim());
            cstmt.setString(10, filter.strOrden.trim());
            cstmt.setString(11, filter.IN_CARDC.trim());
            cstmt.setString(12, filter.IN_FECHA.trim());

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dblSVFOP = rs01.getDouble("SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                //CASH
                dblSVFOPCASH = rs01.getDouble("CASH");
                intQTYSVFOPCASH = rs01.getInt("CASHQTY");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.IN_FECHA = filter.IN_FECHA;

                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;

                    objRtn.totSVFOP_C = dblSVFOPCASH;
                    objRtn.totQTYSVFOP_C = intQTYSVFOPCASH;

                    objRtn.totDAMOUNT = objRtn.totSVFOP_C + objRtn.totSVFOP;
                    objRtn.totSUMA_QTYSVFOP = objRtn.totQTYSVFOP_C + objRtn.totQTYSVFOP;

                    objRtn.dblPerCash = (objRtn.totDAMOUNT > 0) ? (objRtn.totSVFOP_C * 100.0) / (objRtn.totDAMOUNT) : 0.00;

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

        return objRtn;
    }

    public List<A2290Filter> loadPX307SQP01052(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0, dblSVFOPCASH = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0, intQTYSVFOPCASH = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01052(?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_FTE.trim());
            cstmt.setString(7, filter.IN_COUNTRY.trim());
            cstmt.setString(8, filter.strSQL.trim());
            cstmt.setString(9, filter.strCampo.trim());
            cstmt.setString(10, filter.strOrden.trim());
            cstmt.setString(11, filter.IN_CARDC.trim());
            cstmt.setString(12, filter.IN_FECHA.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                //dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("IN_SVFOP") - rs01.getDouble("SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                // intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("IN_QTYSVFOP") - rs01.getInt("QTYSVFOP");

                //CASH
                dblSVFOPCASH = rs01.getDouble("CASH");
                intQTYSVFOPCASH = rs01.getInt("CASHQTY");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.TYPE = filter.strOrden;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.IN_FECHA = filter.IN_FECHA;

                    if (filter.strSQL.equals("CURR")) {
                        /*if (objRtn.IN_FECHA.equals("1")) {
                         objRtn.DATEC = rs01.getString("SDATE").trim();
                         } else {
                         objRtn.DATEC = rs01.getString("RDATE").trim();
                         }*/
                        objRtn.DATEC = rs01.getString("FECHA").trim();
                    }
                    objRtn.strDayFrom = objRtn.DATEC;
                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DATEC);
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    if (!filter.strSQL.equals("CURR") && !filter.strSQL.equals("COUN") && filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCARCOD").trim();
                        objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                        /*if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                         objRtn.strDescCountry = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                         }*/
                        objRtn.strDescCountry = rs01.getString("DES_CARD").trim();

                    } else if (!filter.strSQL.equals("CURR") && filter.strSQL.equals("COUN") && !filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.IN_COUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescCountry = rs01.getString("DES_DATO").trim();
                    }

                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    // objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.DIFF_SVFOP = objRtn.IN_SVFOP - objRtn.SVFOP;
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    //objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = objRtn.IN_QTYSVFOP - objRtn.QTYSVFOP;

                    //CASH
                    objRtn.SVFOP_C = rs01.getDouble("CASH");
                    objRtn.QTYSVFOP_C = rs01.getInt("CASHQTY");

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

                    objRtn.totSVFOP_C = dblSVFOPCASH;
                    objRtn.totQTYSVFOP_C = intQTYSVFOPCASH;

                    objRtn.totDAMOUNT = objRtn.totSVFOP_C + objRtn.totSVFOP;
                    objRtn.totSUMA_QTYSVFOP = objRtn.totQTYSVFOP_C + objRtn.totQTYSVFOP;

                    objRtn.perSale = ((objRtn.SVFOP_C + objRtn.SVFOP) > 0) ? (objRtn.SVFOP * 100) / (objRtn.SVFOP_C + objRtn.SVFOP) : 0.00;
                    objRtn.TotperSale = ((objRtn.totSVFOP_C + objRtn.totSVFOP) > 0) ? (objRtn.totSVFOP * 100) / (objRtn.totSVFOP_C + objRtn.totSVFOP) : 0.00;
                    //Perc
                    if (!filter.FLAGC.equals("LOC")) {
                        //objRtn.dblPerc01 = (dblSVFOP > 0) ? (objRtn.SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblAMOUNT = (objRtn.QTYSVFOP + objRtn.QTYSVFOP_C > 0) ? (objRtn.SVFOP + objRtn.SVFOP_C) / (objRtn.QTYSVFOP + objRtn.QTYSVFOP_C) : 0.00;
                        objRtn.dblTotAMOUNT = (objRtn.totQTYSVFOP + objRtn.totQTYSVFOP_C > 0) ? (objRtn.totSVFOP + objRtn.totSVFOP_C) / (objRtn.totQTYSVFOP + objRtn.totQTYSVFOP_C) : 0.00;
                        //objRtn.dblPerc01 = (objRtn.SVFOP +objRtn.SVFOP_C > 0) ? (objRtn.SVFOP * 100.0) / (objRtn.SVFOP +objRtn.SVFOP_C ): 0.00;
                        objRtn.dblPerc01 = (objRtn.totSVFOP > 0) ? (objRtn.SVFOP * 100.0) / (objRtn.totSVFOP) : 0.00;
                        objRtn.totSUMA_SVFOP = (objRtn.totSVFOP + objRtn.totSVFOP_C > 0) ? (objRtn.totSVFOP * 100.0) / (objRtn.totSVFOP + objRtn.totSVFOP_C) : 0.00;;
                        objRtn.dblPerc02 = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.IN_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                        objRtn.dblPerc03 = 100 - objRtn.dblPerc02;
                        objRtn.dblPerc04 = (dblIN_SVFOP > 0 && dblSVFOP > 0) ? (dblIN_SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblAMOUNTR = 100 - objRtn.dblPerc04;
                        objRtn.strPEM = "100";
                    }

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

    public List<A2290Filter> loadPX307SQP01577(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0, dblOUT_SVFOP = 0, dblSOS_SVFOP = 0, dblIN_SVFOP2 = 0, dblDIFF_SVFOP2 = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0, intOUT_QTYSVFOP = 0, intSOS_QTYSVFOP = 0, intIN_QTYSVFOP2 = 0, intDIFF_QTYSVFOP2 = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01577_1(?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strDayFrom.trim());
            //cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            //cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            //cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(3, filter.IN_TDOC.trim());
            cstmt.setString(4, filter.IN_FTE.trim());
            cstmt.setString(5, filter.IN_COUNTRY.trim());
            cstmt.setString(6, filter.strCampo.trim());
            cstmt.setString(7, filter.strOrden.trim());
            cstmt.setString(8, filter.IN_CARDC.trim());
            cstmt.setString(9, filter.IN_FECHA.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                // dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("IN_SVFOP") - rs01.getDouble("SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                // intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("IN_QTYSVFOP") - rs01.getInt("QTYSVFOP");

                intIN_QTYSVFOP2 = rs01.getInt("IN_QTYSVFOP2");
                intDIFF_QTYSVFOP2 = rs01.getInt("DIFF_QTYSVFOP2");

                dblIN_SVFOP2 = rs01.getDouble("IN_SVFOP2");
                dblOUT_SVFOP = rs01.getDouble("OUT_SVFOP");
                dblSOS_SVFOP = rs01.getDouble("SOS_SVFOP");
                dblDIFF_SVFOP2 = rs01.getDouble("DIFF_SVFOP2");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.TYPE = filter.strOrden;
                    objRtn.DATEC = filter.DATEC;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.strDayFrom = filter.strDayFrom;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.IN_COUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.strDescCountry = rs01.getString("DES_DATO").trim();

                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    // objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.DIFF_SVFOP = objRtn.IN_SVFOP - objRtn.SVFOP;
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    // objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = objRtn.IN_QTYSVFOP - objRtn.QTYSVFOP;
                    objRtn.IN_SVFOP2 = rs01.getDouble("IN_SVFOP2");
                    objRtn.OUT_SVFOP = rs01.getDouble("OUT_SVFOP");
                    objRtn.SOS_SVFOP = rs01.getDouble("SOS_SVFOP");
                    objRtn.DIFF_SVFOP2 = rs01.getDouble("DIFF_SVFOP2");

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

                    objRtn.dblPerc01 = (dblSVFOP > 0) ? (objRtn.SVFOP * 100.0) / dblSVFOP : 0.00;
                    objRtn.dblPerc02 = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.IN_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                    objRtn.dblPerc03 = 100 - objRtn.dblPerc02;
                    objRtn.dblPerc04 = (dblIN_SVFOP > 0 && dblSVFOP > 0) ? (dblIN_SVFOP * 100.0) / dblSVFOP : 0.00;
                    objRtn.dblAMOUNTR = 100 - objRtn.dblPerc04;
                    objRtn.strPEM = "100";

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

    public List<A2290Filter> loadPX307SQP01053(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblOUT_SVFOP = 0, dblSOS_SVFOP = 0, dblSUMA_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intOUT_QTYSVFOP = 0, intSOS_QTYSVFOP = 0, intSUMA_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01053(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.strCampo.trim());
            cstmt.setString(12, filter.strOrden.trim());
            cstmt.setString(13, filter.IN_CARDN.trim());
            cstmt.setString(14, filter.IN_CARDC.trim());
            cstmt.setString(15, filter.IN_FECHA.trim());
            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblOUT_SVFOP = rs01.getDouble("OUT_SVFOP");
                dblSOS_SVFOP = rs01.getDouble("SOS_SVFOP");
                dblSUMA_SVFOP = rs01.getDouble("SUMA_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("SVFOP") - rs01.getDouble("SUMA_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intOUT_QTYSVFOP = rs01.getInt("OUT_QTYSVFOP");
                intSOS_QTYSVFOP = rs01.getInt("SOS_QTYSVFOP");
                intSUMA_QTYSVFOP = rs01.getInt("SUMA_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("QTYSVFOP") - rs01.getInt("SUMA_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.TYPE = filter.strOrden;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.IN_FECHA = filter.IN_FECHA;

                    if (objRtn.IN_FECHA.equals("1")) {
                        objRtn.DATEC = rs01.getString("SDATE").trim();
                    } else {
                        objRtn.DATEC = rs01.getString("RDATE").trim();
                    }

                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    if (!filter.FLAGC.equals("USD")) {
                        objRtn.IN_PAYMENT = rs01.getString("SCURRENCY").trim();
                    }

                    if (!filter.strSQL.equals("CURR") && !filter.strSQL.equals("COUN") && filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCARCOD").trim();
                        objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                        /*if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                         objRtn.strDescCountry = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                         }*/

                        // objRtn.strDescCountry = rs01.getString("DES_DATOS").trim(); 
                    } else if (!filter.strSQL.equals("CURR") && filter.strSQL.equals("COUN") && !filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.IN_COUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescCountry = rs01.getString("DES_DATO").trim();

                    }

                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.OUT_SVFOP = rs01.getDouble("OUT_SVFOP");
                    objRtn.SOS_SVFOP = rs01.getDouble("SOS_SVFOP");
                    objRtn.SUMA_SVFOP = rs01.getDouble("SUMA_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("SVFOP") - rs01.getDouble("SUMA_SVFOP");

                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.OUT_QTYSVFOP = rs01.getInt("OUT_QTYSVFOP");
                    objRtn.SOS_QTYSVFOP = rs01.getInt("SOS_QTYSVFOP");
                    objRtn.SUMA_QTYSVFOP = rs01.getInt("SUMA_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("QTYSVFOP") - rs01.getInt("SUMA_QTYSVFOP");

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totOUT_SVFOP = dblOUT_SVFOP;
                    objRtn.totSOS_SVFOP = dblSOS_SVFOP;
                    objRtn.totSUMA_SVFOP = dblSUMA_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totOUT_QTYSVFOP = intOUT_QTYSVFOP;
                    objRtn.totSOS_QTYSVFOP = intSOS_QTYSVFOP;
                    objRtn.totSUMA_QTYSVFOP = intSUMA_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

                    //Perc
                    if (!filter.FLAGC.equals("LOC")) {
                        objRtn.dblPerc01 = (dblSVFOP > 0) ? (objRtn.SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblPerc02 = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.IN_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                        objRtn.dblPerc02SUM = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.SUMA_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                        objRtn.dblPerc02OUT = (dblOUT_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.OUT_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                        objRtn.dblPerc02SOS = (dblSOS_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.SOS_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                        objRtn.dblPerc03 = 100 - objRtn.dblPerc02;
                        objRtn.strPEM = "100";
                        objRtn.dblPerc04 = (dblIN_SVFOP > 0 && dblSVFOP > 0) ? (dblIN_SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblPerc04SUM = (dblSUMA_SVFOP > 0 && dblSVFOP > 0) ? (dblSUMA_SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblPerc04OUT = (dblOUT_SVFOP > 0 && dblSVFOP > 0) ? (dblOUT_SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblPerc04SOS = (dblSOS_SVFOP > 0 && dblSVFOP > 0) ? (dblSOS_SVFOP * 100.0) / dblSVFOP : 0.00;
                        objRtn.dblAMOUNTR = 100 - objRtn.dblPerc04SUM;
                    }

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

    public List<A2290Filter> loadPX307SQP01054(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        HashMap<String, String> hmDescBank = new HashMap<String, String>();
        hmDescBank.put("AM", "AM");
        hmDescBank.put("AX", "AMERICAN EXPRESS");
        hmDescBank.put("BA", "VISA");
        hmDescBank.put("BC", "UNION PAY");
        hmDescBank.put("BN", "BANCOMER");
        hmDescBank.put("BX", "BANAMEX");
        hmDescBank.put("CA", "MASTERCARD");
        hmDescBank.put("CN", "MASTERCARD");
        hmDescBank.put("CQ", "MASTERCARD");
        hmDescBank.put("DC", "DINNERS");
        hmDescBank.put("DS", "DISCOVERY");
        hmDescBank.put("EB", "UNION PAY");
        hmDescBank.put("GR", "IATAS");
        hmDescBank.put("HD", "UNION PAY");
        hmDescBank.put("HS", "HSBC");
        hmDescBank.put("IK", "MASTERCARD");
        hmDescBank.put("JC", "DISCOVER");
        hmDescBank.put("LC", "UNION PAY");
        hmDescBank.put("MC", "MASTERCARD");
        hmDescBank.put("NH", "UNION PAY");
        hmDescBank.put("PP", "PAYPAL");
        hmDescBank.put("PT", "PAGATODO");
        hmDescBank.put("SA", "SORIANA");
        hmDescBank.put("SB", "SANBORNS");
        hmDescBank.put("SH", "UNION PAY");
        hmDescBank.put("ST", "SANTANDER");
        hmDescBank.put("SW", "UNION PAY");
        hmDescBank.put("TL", "TELECOM");
        hmDescBank.put("TP", "UATP");
        hmDescBank.put("UP", "UNION PAY");
        hmDescBank.put("VI", "VISA");

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblOUT_SVFOP = 0, dblSOS_SVFOP = 0, dblSUMA_SVFOP = 0, dblDIFF_SVFOP = 0, dblSVFOPCASH = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intOUT_QTYSVFOP = 0, intSOS_QTYSVFOP = 0, intSUMA_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0, intQTYSVFOPCASH = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01054_1(?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_FTE.trim());
            cstmt.setString(7, filter.IN_COUNTRY.trim());
            cstmt.setString(8, filter.strSQL.trim());
            cstmt.setString(9, filter.strCampo.trim());
            cstmt.setString(10, filter.strOrden.trim());
            cstmt.setString(11, filter.IN_CARDC.trim());
            cstmt.setString(12, filter.IN_FECHA.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblOUT_SVFOP = rs01.getDouble("OUT_SVFOP");
                dblSOS_SVFOP = rs01.getDouble("SOS_SVFOP");
                dblSUMA_SVFOP = rs01.getDouble("SUMA_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");

                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intOUT_QTYSVFOP = rs01.getInt("OUT_QTYSVFOP");
                intSOS_QTYSVFOP = rs01.getInt("SOS_QTYSVFOP");
                intSUMA_QTYSVFOP = rs01.getInt("SUMA_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                //CASH
                dblSVFOPCASH = rs01.getDouble("CASH");
                intQTYSVFOPCASH = rs01.getInt("CASHQTY");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.TYPE = filter.strOrden;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.IN_FECHA = filter.IN_FECHA;

                    if (filter.strSQL.equals("CURR")) {
                        if (objRtn.IN_FECHA.equals("1")) {
                            objRtn.DATEC = rs01.getString("SDATE").trim();
                        } else {
                            objRtn.DATEC = rs01.getString("RDATE").trim();
                        }
                    }

                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DATEC);
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    if (!filter.strSQL.equals("CURR") && !filter.strSQL.equals("COUN") && filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCARCOD").trim();
                        objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                        if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                            objRtn.strDescCountry = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                        }
                        // objRtn.strDescCountry = rs01.getString("DES_DATOS").trim(); 
                    } else if (!filter.strSQL.equals("CURR") && filter.strSQL.equals("COUN") && !filter.strSQL.equals("TARJ")) {
                        objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.IN_COUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescCountry = rs01.getString("DES_DATO").trim();
                    }
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.OUT_SVFOP = rs01.getDouble("OUT_SVFOP");
                    objRtn.SOS_SVFOP = rs01.getDouble("SOS_SVFOP");
                    objRtn.SUMA_SVFOP = rs01.getDouble("SUMA_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");

                    //CASH
                    objRtn.SVFOP_C = rs01.getDouble("CASH");
                    objRtn.QTYSVFOP_C = rs01.getInt("CASHQTY");

                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.OUT_QTYSVFOP = rs01.getInt("OUT_QTYSVFOP");
                    objRtn.SOS_QTYSVFOP = rs01.getInt("SOS_QTYSVFOP");
                    objRtn.SUMA_QTYSVFOP = rs01.getInt("SUMA_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totOUT_SVFOP = dblOUT_SVFOP;
                    objRtn.totSOS_SVFOP = dblSOS_SVFOP;
                    objRtn.totSUMA_SVFOP = dblSUMA_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totOUT_QTYSVFOP = intOUT_QTYSVFOP;
                    objRtn.totSOS_QTYSVFOP = intSOS_QTYSVFOP;
                    objRtn.totSUMA_QTYSVFOP = intSUMA_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;
                    objRtn.totSVFOP_C = dblSVFOPCASH;
                    objRtn.totQTYSVFOP_C = intQTYSVFOPCASH;

                    //Perc
                    objRtn.dblPerc01 = (dblSVFOP > 0) ? (objRtn.SVFOP * 100.0) / dblSVFOP : 0.00;
                    objRtn.dblPerc02 = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.IN_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                    objRtn.dblPerc02SUM = (dblIN_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.SUMA_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                    objRtn.dblPerc02OUT = (dblOUT_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.OUT_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                    objRtn.dblPerc02SOS = (dblSOS_SVFOP > 0 && objRtn.SVFOP > 0) ? (objRtn.SOS_SVFOP * 100.0) / objRtn.SVFOP : 0.00;
                    objRtn.dblPerc03 = 100 - objRtn.dblPerc02;
                    objRtn.strPEM = "100";

                    objRtn.dblPerc04 = (dblIN_SVFOP > 0 && dblSVFOP > 0) ? (dblIN_SVFOP * 100.0) / dblSVFOP : 0.00;
                    objRtn.dblPerc04OUT = (dblOUT_SVFOP > 0 && dblSVFOP > 0) ? (dblOUT_SVFOP * 100.0) / dblSVFOP : 0.00;
                    objRtn.dblPerc04SOS = (dblSOS_SVFOP > 0 && dblSVFOP > 0) ? (dblSOS_SVFOP * 100.0) / dblSVFOP : 0.00;

                    objRtn.dblPerc04SUM = (dblSUMA_SVFOP > 0 && dblSVFOP > 0) ? (dblSUMA_SVFOP * 100.0) / dblSVFOP : 0.00;
                    objRtn.dblAMOUNTR = 100 - objRtn.dblPerc04SUM;

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

    public List<A2290Filter> loadPX307SQP00943(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00943(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATEC.trim());
            cstmt.setString(3, filter.SCARCOD.trim());
            cstmt.setString(4, filter.IN_PAYMENT.trim()); //CURRENCY
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_CARDC.trim());
            cstmt.setString(13, filter.IN_FECHA.trim());
            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();

                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.DATEC = filter.DATEC;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.SCARCOD = filter.SCARCOD;
                    objRtn.SCOUNTRY = filter.SCOUNTRY;
                    objRtn.strDescCountry = filter.strDescCountry;
                    objRtn.SCURRENCY = filter.SCURRENCY;

                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);

                    if (filter.strSQL.equals("COUN") && !filter.strSQL.equals("TARJ")) {
                        objRtn.strCREJEC = rs01.getString("SCARCOD").trim();
                        //objRtn.SCARCOD= rs01.getString("SCARCOD").trim();
                        /*if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                         objRtn.strDescCard = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                         }*/

                    } else if (!filter.strSQL.equals("COUN") && filter.strSQL.equals("TARJ")) {
                        objRtn.strCREJEC = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescCard = rs01.getString("DES_DATO").trim();
                        //objRtn.IN_COUNTRY =rs01.getString("SCOUNTRY").trim();
                    }
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                    /*objRtn.TDATE = rs01.getString("TDATE").trim();
                     objRtn.DATEF = rs01.getString("DATEF").trim();
                     objRtn.BDATEP = rs01.getString("BDATEP").trim();*/
                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

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

    public List<A2290Filter> loadPX307SQP00945(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00945(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATEC.trim());
            cstmt.setString(3, filter.SCARCOD.trim());
            cstmt.setString(4, filter.IN_PAYMENT.trim()); //CURRENCY
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim()); //COUNTRY- CUANDO ES CEDIT CARD TENGO EL PAIS, CUANDO ES PAIS TENGO LA TARJETA 
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_CARDC.trim());
            cstmt.setString(13, filter.IN_FECHA.trim());
            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();

                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.SCARCOD = filter.SCARCOD;
                    objRtn.DATEC = filter.DATEC;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.SCOUNTRY = filter.SCOUNTRY;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.strDescCountry = filter.strDescCountry;
                    objRtn.SCURRENCY = filter.SCURRENCY;
                    objRtn.strCREJEC = filter.strCREJEC;
                    objRtn.strDescCard = filter.strDescCard;
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);

                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");

                    objRtn.SCARDN = rs01.getString("SCARDN");
                    objRtn.strSCARDN = Functions.enmascararNumTarjeta(rs01.getString("SCARDN").trim(), "");
                    objRtn.strTicket = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE;
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                    /*objRtn.TDATE = rs01.getString("TDATE").trim();
                     objRtn.DATEF = rs01.getString("DATEF").trim();
                     objRtn.BDATEP = rs01.getString("BDATEP").trim();*/
                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

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

    public List<A2290Filter> loadPX307SQP01055(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01055(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATEC.trim());
            cstmt.setString(3, filter.SCARCOD.trim());
            cstmt.setString(4, filter.IN_PAYMENT.trim()); //CURRENCY
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_CARDC.trim());
            cstmt.setString(13, filter.IN_FECHA.trim());
            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();

                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.DATEC = filter.DATEC;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.SCARCOD = filter.SCARCOD;
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.SCOUNTRY = filter.SCOUNTRY;
                    objRtn.strDescCountry = filter.strDescCountry;
                    objRtn.SCURRENCY = filter.SCURRENCY;
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);

                    if (filter.strSQL.equals("COUN") && !filter.strSQL.equals("TARJ")) {
                        objRtn.strCREJEC = rs01.getString("SCARCOD").trim();

                        /*if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                         objRtn.strDescCard = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                         }*/
                    } else if (!filter.strSQL.equals("COUN") && filter.strSQL.equals("TARJ")) {
                        objRtn.strCREJEC = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescCard = rs01.getString("DES_DATO").trim();

                    }
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

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

    public List<A2290Filter> loadPX307SQP01056(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01056(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATEC.trim());
            cstmt.setString(3, filter.SCARCOD.trim());
            cstmt.setString(4, filter.IN_PAYMENT.trim()); //CURRENCY
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim()); //COUNTRY- CUANDO ES CEDIT CARD TENGO EL PAIS, CUANDO ES PAIS TENGO LA TARJETA 
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_CARDC.trim());
            cstmt.setString(13, filter.IN_FECHA.trim());
            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();

                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.SCARCOD = filter.SCARCOD;
                    objRtn.DATEC = filter.DATEC;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.SCOUNTRY = filter.SCOUNTRY;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.strDescCountry = filter.strDescCountry;
                    objRtn.SCURRENCY = filter.SCURRENCY;
                    objRtn.strCREJEC = filter.strCREJEC;
                    objRtn.strDescCard = filter.strDescCard;
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);

                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");

                    objRtn.SCARDN = rs01.getString("SCARDN");
                    objRtn.strSCARDN = Functions.enmascararNumTarjeta(rs01.getString("SCARDN").trim(), "");
                    objRtn.strTicket = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE;
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

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

    public List<A2290Filter> loadPX307SQP01057(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblOUT_SVFOP = 0, dblSOS_SVFOP = 0, dblSUMA_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intOUT_QTYSVFOP = 0, intSOS_QTYSVFOP = 0, intSUMA_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01057(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATEC.trim());
            cstmt.setString(3, filter.SCARCOD.trim());
            cstmt.setString(4, filter.IN_PAYMENT.trim()); //CURRENCY
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_CARDC.trim());
            cstmt.setString(13, filter.IN_FECHA.trim());
            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblOUT_SVFOP = rs01.getDouble("OUT_SVFOP");
                dblSOS_SVFOP = rs01.getDouble("SOS_SVFOP");
                dblSUMA_SVFOP = rs01.getDouble("SUMA_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("SVFOP") - rs01.getDouble("SUMA_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intOUT_QTYSVFOP = rs01.getInt("OUT_QTYSVFOP");
                intSOS_QTYSVFOP = rs01.getInt("SOS_QTYSVFOP");
                intSUMA_QTYSVFOP = rs01.getInt("SUMA_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("QTYSVFOP") - rs01.getInt("SUMA_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();

                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.DATEC = filter.DATEC;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.SCARCOD = filter.SCARCOD;
                    objRtn.IN_FECHA = filter.IN_FECHA;

                    objRtn.SCOUNTRY = filter.SCOUNTRY;
                    objRtn.strDescCountry = filter.strDescCountry;
                    objRtn.SCURRENCY = filter.SCURRENCY;
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);

                    if (filter.strSQL.equals("COUN") && !filter.strSQL.equals("TARJ")) {
                        objRtn.strCREJEC = rs01.getString("SCARCOD").trim();

                        /*if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                         objRtn.strDescCard = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                         }*/
                    } else if (!filter.strSQL.equals("COUN") && filter.strSQL.equals("TARJ")) {
                        objRtn.strCREJEC = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescCard = rs01.getString("DES_DATO").trim();

                    }
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.OUT_SVFOP = rs01.getDouble("OUT_SVFOP");
                    objRtn.SOS_SVFOP = rs01.getDouble("SOS_SVFOP");
                    objRtn.SUMA_SVFOP = rs01.getDouble("SUMA_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("SVFOP") - rs01.getDouble("SUMA_SVFOP");

                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.OUT_QTYSVFOP = rs01.getInt("OUT_QTYSVFOP");
                    objRtn.SOS_QTYSVFOP = rs01.getInt("SOS_QTYSVFOP");
                    objRtn.SUMA_QTYSVFOP = rs01.getInt("SUMA_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("QTYSVFOP") - rs01.getInt("SUMA_QTYSVFOP");

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totOUT_SVFOP = dblOUT_SVFOP;
                    objRtn.totSOS_SVFOP = dblSOS_SVFOP;
                    objRtn.totSUMA_SVFOP = dblSUMA_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totOUT_QTYSVFOP = intOUT_QTYSVFOP;
                    objRtn.totSOS_QTYSVFOP = intSOS_QTYSVFOP;
                    objRtn.totSUMA_QTYSVFOP = intSUMA_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

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

    public List<A2290Filter> loadPX307SQP01058(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblOUT_SVFOP = 0, dblSOS_SVFOP = 0, dblSUMA_SVFOP = 0, dblDIFF_SVFOP = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intOUT_QTYSVFOP = 0, intSOS_QTYSVFOP = 0, intSUMA_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01058(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATEC.trim());
            cstmt.setString(3, filter.SCARCOD.trim());
            cstmt.setString(4, filter.IN_PAYMENT.trim()); //CURRENCY
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim()); //COUNTRY- CUANDO ES CEDIT CARD TENGO EL PAIS, CUANDO ES PAIS TENGO LA TARJETA 
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_CARDC.trim());
            cstmt.setString(13, filter.IN_FECHA.trim());
            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                dblOUT_SVFOP = rs01.getDouble("OUT_SVFOP");
                dblSOS_SVFOP = rs01.getDouble("SOS_SVFOP");
                dblSUMA_SVFOP = rs01.getDouble("SUMA_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("SVFOP") - rs01.getDouble("SUMA_SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                intOUT_QTYSVFOP = rs01.getInt("OUT_QTYSVFOP");
                intSOS_QTYSVFOP = rs01.getInt("SOS_QTYSVFOP");
                intSUMA_QTYSVFOP = rs01.getInt("SUMA_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("QTYSVFOP") - rs01.getInt("SUMA_QTYSVFOP");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();

                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.SCARCOD = filter.SCARCOD;
                    objRtn.DATEC = filter.DATEC;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.SCOUNTRY = filter.SCOUNTRY;
                    objRtn.strDescCountry = filter.strDescCountry;
                    objRtn.SCURRENCY = filter.SCURRENCY;
                    objRtn.strCREJEC = filter.strCREJEC;
                    objRtn.strDescCard = filter.strDescCard;
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);

                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");

                    objRtn.SCARDN = rs01.getString("SCARDN");
                    objRtn.strSCARDN = Functions.enmascararNumTarjeta(rs01.getString("SCARDN").trim(), "");
                    objRtn.strTicket = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE;

                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    objRtn.OUT_SVFOP = rs01.getDouble("OUT_SVFOP");
                    objRtn.SOS_SVFOP = rs01.getDouble("SOS_SVFOP");
                    objRtn.SUMA_SVFOP = rs01.getDouble("SUMA_SVFOP");
                    objRtn.DIFF_SVFOP = rs01.getDouble("SVFOP") - rs01.getDouble("SUMA_SVFOP");

                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    objRtn.OUT_QTYSVFOP = rs01.getInt("OUT_QTYSVFOP");
                    objRtn.SOS_QTYSVFOP = rs01.getInt("SOS_QTYSVFOP");
                    objRtn.SUMA_QTYSVFOP = rs01.getInt("SUMA_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = rs01.getInt("QTYSVFOP") - rs01.getInt("SUMA_QTYSVFOP");

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totOUT_SVFOP = dblOUT_SVFOP;
                    objRtn.totSOS_SVFOP = dblSOS_SVFOP;
                    objRtn.totSUMA_SVFOP = dblSUMA_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totOUT_QTYSVFOP = intOUT_QTYSVFOP;
                    objRtn.totSOS_QTYSVFOP = intSOS_QTYSVFOP;
                    objRtn.totSUMA_QTYSVFOP = intSUMA_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

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

    public List<A2290Filter> loadPX307SQP01154(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0, dblSVFOPCASH = 0;
        int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0, intQTYSVFOPCASH = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01154(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strDayFrom.trim());
            cstmt.setString(3, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(4, filter.IN_FECHA_FROM.trim());
            cstmt.setString(5, filter.IN_FECHA_TO.trim());
            cstmt.setString(6, filter.SCARCOD.trim());
            cstmt.setString(7, filter.IN_PAYMENT.trim()); //CURRENCY
            //  cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(8, filter.IN_TDOC.trim());
            cstmt.setString(9, filter.IN_FTE.trim());
            cstmt.setString(10, filter.IN_COUNTRY.trim());
            //  cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(11, filter.strSQL.trim());
            cstmt.setString(12, filter.IN_CARDN.trim());
            cstmt.setString(13, filter.IN_CARDC.trim());
            cstmt.setString(14, filter.IN_FECHA.trim());
            //  cstmt.setString(14, tipo);
            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblSVFOP = rs01.getDouble("SVFOP");
                dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
                //dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                dblDIFF_SVFOP = rs01.getDouble("IN_SVFOP") - rs01.getDouble("SVFOP");
                intQTYSVFOP = rs01.getInt("QTYSVFOP");
                intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                // intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");
                intDIFF_QTYSVFOP = rs01.getInt("IN_QTYSVFOP") - rs01.getInt("QTYSVFOP");
                dblSVFOPCASH = rs01.getDouble("CASH");
                intQTYSVFOPCASH = rs01.getInt("CASHQTY");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();

                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.DATEC = filter.DATEC;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.SCARCOD = filter.SCARCOD;
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.SCOUNTRY = filter.SCOUNTRY;
                    objRtn.strDescCountry = filter.strDescCountry;
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();

                    if (filter.strSQL.equals("TARJ")) {
                        objRtn.strCREJEC = rs01.getString("SCOUNTRY").trim();
                        objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                        objRtn.strDescCard = rs01.getString("DES_DATO").trim();

                    } else {
                        objRtn.strCREJEC = rs01.getString("SCARCOD").trim();
                        objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                        /*if (hmDescBank.containsKey(rs01.getString("SCARCOD").trim().toUpperCase())) {
                         objRtn.strDescCard = hmDescBank.get(rs01.getString("SCARCOD").trim()).toString();
                         }*/
                        objRtn.strDescCard = rs01.getString("DES_CARD").trim();
                    }

                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
                    // objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
                    objRtn.DIFF_SVFOP = objRtn.IN_SVFOP - objRtn.SVFOP;
                    objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
                    objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
                    //   objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");
                    objRtn.DIFF_QTYSVFOP = objRtn.IN_QTYSVFOP - objRtn.QTYSVFOP;

                    objRtn.SVFOP_C = rs01.getDouble("CASH");
                    objRtn.QTYSVFOP_C = rs01.getInt("CASHQTY");

                    objRtn.totSVFOP = dblSVFOP;
                    objRtn.totIN_SVFOP = dblIN_SVFOP;
                    objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
                    objRtn.totQTYSVFOP = intQTYSVFOP;
                    objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
                    objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

                    objRtn.totSVFOP_C = dblSVFOPCASH;
                    objRtn.totQTYSVFOP_C = intQTYSVFOPCASH;

                    objRtn.totDAMOUNT = objRtn.totSVFOP_C + objRtn.totSVFOP;
                    objRtn.totSUMA_QTYSVFOP = objRtn.totQTYSVFOP_C + objRtn.totQTYSVFOP;

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

    /*public List<A2290Filter> loadPX307SQP01155(A2290Filter filter, String tipo) throws SQLException, Exception {
     List<A2290Filter> list = new ArrayList<A2290Filter>();
     A2290Filter objRtn;
     CallableStatement cstmt = null;
     ResultSet rs01 = null;

     double dblSVFOP = 0, dblIN_SVFOP = 0, dblDIFF_SVFOP = 0;
     int intQTYSVFOP = 0, intIN_QTYSVFOP = 0, intDIFF_QTYSVFOP = 0;

     String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01155(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

     Connection cnx = null;
     try {
     cnx = session.getCNXIBMDB2().getIBMDB2Connection();
     cstmt = cnx.prepareCall(SQLCLL01);
     cstmt.registerOutParameter(15, Types.INTEGER);
     cstmt.registerOutParameter(16, Types.INTEGER);
     cstmt.registerOutParameter(17, Types.INTEGER);
     cstmt.registerOutParameter(18, Types.INTEGER);

     cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
     cstmt.setString(2, filter.DATEC.trim());
     cstmt.setString(3, filter.SCARCOD.trim());
     cstmt.setString(4, filter.IN_PAYMENT.trim()); //CURRENCY
     cstmt.setString(5, filter.IN_TICKET.trim());
     cstmt.setString(6, filter.IN_TDOC.trim());
     cstmt.setString(7, filter.IN_FTE.trim());
     cstmt.setString(8, filter.IN_COUNTRY.trim()); //COUNTRY- CUANDO ES CEDIT CARD TENGO EL PAIS, CUANDO ES PAIS TENGO LA TARJETA 
     cstmt.setString(9, filter.FLAGC.trim());
     cstmt.setString(10, filter.strSQL.trim());
     cstmt.setString(11, filter.IN_CARDN.trim());
     cstmt.setString(12, filter.IN_CARDC.trim());
     cstmt.setString(13, filter.IN_FECHA.trim());
     cstmt.setString(14, tipo);
     cstmt.setInt(15, filter.page.PAGNUM);
     cstmt.setInt(16, filter.page.PAGROW);
     cstmt.setInt(17, filter.page.TOTPAG);
     cstmt.setInt(18, filter.page.TOTROW);
     cstmt.execute();

     filter.page.PAGNUM = cstmt.getInt(15);
     filter.page.PAGROW = cstmt.getInt(16);
     filter.page.TOTPAG = cstmt.getInt(17);
     filter.page.TOTROW = cstmt.getInt(18);

     rs01 = cstmt.getResultSet();
     while (rs01.next()) {

     dblSVFOP = rs01.getDouble("SVFOP");
     dblIN_SVFOP = rs01.getDouble("IN_SVFOP");
     dblDIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
     intQTYSVFOP = rs01.getInt("QTYSVFOP");
     intIN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
     intDIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");

     }
     try {
     rs01.close();
     } catch (SQLException e) {
     logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
     }

     if (cstmt.getMoreResults()) {
     rs01 = cstmt.getResultSet();
     while (rs01.next()) {

     objRtn = new A2290Filter();

     objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
     objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
     objRtn.IN_TDOC = filter.IN_TDOC;
     objRtn.IN_FTE = filter.IN_FTE;
     objRtn.IN_TICKET = filter.IN_TICKET;
     objRtn.FLAGC = filter.FLAGC;
     objRtn.strSQL = filter.strSQL;
     objRtn.SCARCOD = filter.SCARCOD;
     objRtn.DATEC = filter.DATEC;
     objRtn.IN_PAYMENT = filter.IN_PAYMENT;
     objRtn.IN_COUNTRY = filter.IN_COUNTRY;
     objRtn.SCOUNTRY = filter.SCOUNTRY;
     objRtn.IN_CARDN = filter.IN_CARDN;
     objRtn.IN_CARDC = filter.IN_CARDC;
     objRtn.IN_FECHA = filter.IN_FECHA;
     objRtn.strDescCountry = filter.strDescCountry;
     objRtn.SCURRENCY = filter.SCURRENCY;
     objRtn.strCREJEC = filter.strCREJEC;
     objRtn.strDescCard = filter.strDescCard;
     objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);

     objRtn.CCIA = rs01.getString("CCIA");
     objRtn.FORMA = rs01.getString("FORMA");
     objRtn.SERIE = rs01.getString("SERIE");

     objRtn.SCARDN = rs01.getString("SCARDN");
     objRtn.strSCARDN = Functions.enmascararNumTarjeta(rs01.getString("SCARDN").trim(), "");
     objRtn.strTicket = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE;
     objRtn.SVFOP = rs01.getDouble("SVFOP");
     objRtn.IN_SVFOP = rs01.getDouble("IN_SVFOP");
     objRtn.DIFF_SVFOP = rs01.getDouble("DIFF_SVFOP");
     objRtn.QTYSVFOP = rs01.getInt("QTYSVFOP");
     objRtn.IN_QTYSVFOP = rs01.getInt("IN_QTYSVFOP");
     objRtn.DIFF_QTYSVFOP = rs01.getInt("DIFF_QTYSVFOP");


     objRtn.totSVFOP = dblSVFOP;
     objRtn.totIN_SVFOP = dblIN_SVFOP;
     objRtn.totDIFF_SVFOP = dblDIFF_SVFOP;
     objRtn.totQTYSVFOP = intQTYSVFOP;
     objRtn.totIN_QTYSVFOP = intIN_QTYSVFOP;
     objRtn.totDIFF_QTYSVFOP = intDIFF_QTYSVFOP;

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
     }*/
    public List<A2290Filter> loadPX307_COBOL_TKT(A2290Filter filter, String tipo) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;

        DatabaseMetaData dmd = null;
        CallableStatement cstmt = null;
        Connection cnx = null;
        String strBuffer = "";
        HashMap hmTemp = new HashMap();
        int num = 0;

        if (filter.page.PAGROW == -1) {
            num = 1;
        } else {
            if (filter.strPag.equals("Y")) {
                //Retroceder
                num = filter.pos - 20;
            } else {
                num = filter.pos + 1;
            }
        }

        if (tipo.equals("P")) {
            filter.IN_STVAL = "2";
        }

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            dmd = cnx.getMetaData();

            cstmt = cnx.prepareCall("{CALL PRAXIS".concat(dmd.getCatalogSeparator()).concat("SPRUT10550(?)}"));
            strBuffer = filter.bufferToString(session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(1, strBuffer);
            cstmt.registerOutParameter(1, Types.CHAR);
            cstmt.execute();

            String sBuffer = cstmt.getString(1);

            if (!sBuffer.trim().isEmpty()) {

                int itemp = 0;

                for (int i = 0; i < 20; i++) {

                    itemp = 271 + (i * 67);

                    objRtn = new A2290Filter();
                    objRtn.pos = num;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_FTE = filter.IN_FTE;
                    objRtn.IN_TICKET = filter.IN_TICKET;
                    objRtn.FLAGC = filter.FLAGC;
                    objRtn.strSQL = filter.strSQL;
                    objRtn.SCARCOD = filter.SCARCOD;
                    objRtn.DATEC = filter.DATEC;
                    objRtn.IN_PAYMENT = filter.IN_PAYMENT;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.SCOUNTRY = filter.SCOUNTRY;
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_FECHA = filter.IN_FECHA;
                    objRtn.strDescCountry = filter.strDescCountry;
                    objRtn.SCURRENCY = filter.SCURRENCY;
                    objRtn.strCREJEC = filter.strCREJEC;
                    objRtn.strDescCard = filter.strDescCard;
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DATEC);

                    //07 SDATE      PIC X(08).
                    objRtn.SDATE = sBuffer.substring(itemp + 0, itemp + 8);
                    //07 CCIA       PIC X(03).
                    objRtn.CCIA = sBuffer.substring(itemp + 8, itemp + 11);
                    //07 FORMA      PIC X(04).
                    objRtn.FORMA = sBuffer.substring(itemp + 11, itemp + 15);
                    //07 SERIE      PIC X(06).
                    objRtn.SERIE = sBuffer.substring(itemp + 15, itemp + 21);
                    objRtn.strTicket = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE;
                    if (num == 1) {
                        objRtn.strPrimerTicket = objRtn.CCIA + objRtn.FORMA + objRtn.SERIE;
                    }
                    //07 SCARDN     PIC X(19).
                    objRtn.SCARDN = sBuffer.substring(itemp + 21, itemp + 40);
                    objRtn.strSCARDN = Functions.enmascararNumTarjeta(objRtn.SCARDN.trim(), "");
                    //07 STVAL      PIC X(01).
                    objRtn.STVAL = sBuffer.substring(itemp + 40, itemp + 41);
                    //07 SVFOP      PIC 9(11)V99.
                    if (!sBuffer.substring(itemp + 41, itemp + 54).trim().isEmpty()) {
                        objRtn.SVFOP = Double.parseDouble(sBuffer.substring(itemp + 41, itemp + 54)) / 100;
                    }
                    //07 AVFOP      PIC 9(11)V99.
                    if (!sBuffer.substring(itemp + 54, itemp + 67).trim().isEmpty()) {
                        objRtn.AVFOP = Double.parseDouble(sBuffer.substring(itemp + 54, itemp + 67)) / 100;
                    }

                    if (!objRtn.strTicket.trim().isEmpty()) {
                        if (filter.strPag.equals("Y")) {
                            //Retroceder
                            hmTemp.put(objRtn.TDOC.trim() + objRtn.SDATE.trim() + objRtn.SCARDN.trim() + objRtn.strTicket.trim(), objRtn);
                        } else {
                            list.add(objRtn);
                        }
                    } else {
                        //Si esta vacio el campo quiere decir q no me devolvio data
                        break;
                    }
                    num++;

                }

                if (filter.strPag.equals("Y")) {
                    num = num - 20;
                    if (!hmTemp.isEmpty()) {
                        Vector v = new Vector(hmTemp.keySet());
                        Collections.sort(v);
                        Iterator it = v.iterator();
                        while (it.hasNext()) {
                            String keyI = (String) (it.next());
                            objRtn = (A2290Filter) hmTemp.get(keyI);
                            objRtn.pos = num;
                            num++;
                            list.add(objRtn);
                        }
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return list;
    }

    public HashMap loadPX307SQP01806(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> list = new ArrayList<A2290Filter>();
        List<A2290Filter> list2 = new ArrayList<A2290Filter>();
        HashMap hm = new HashMap();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double SALE = 0, PEND = 0, PAY = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01806(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TICKET.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.FLAGC.trim());
            cstmt.setString(10, filter.strSQL.trim());
            cstmt.setString(11, filter.strCampo.trim());
            cstmt.setString(12, filter.strOrden.trim());
            cstmt.setString(13, filter.IN_CARDN.trim());
            cstmt.setString(14, filter.IN_CARDC.trim());
            cstmt.setString(15, filter.IN_FECHA.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                SALE = rs01.getDouble("QTY1");
                PAY = rs01.getDouble("QTYSABO");//Pagado
                PEND = rs01.getDouble("PEND");//Pend

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();

                    objRtn.FTE = rs01.getString("dscFTE");
                    objRtn.totSVFOP = rs01.getInt("QTY1") + rs01.getInt("QTYSABO") + rs01.getInt("PEND");
                    objRtn.SVFOPUSD = rs01.getDouble("QTY1");
                    objRtn.SVFOP = rs01.getDouble("QTYSABO");//Pagado
                    objRtn.SVFOPRF = rs01.getDouble("PEND");//Pend

                    objRtn.totSVFOPUSD = SALE;
                    objRtn.totSVFOP = PAY;
                    objRtn.totSVFOPRF = PEND;

                    objRtn.dblPerc01 = (SALE > 0) ? (objRtn.SVFOPUSD * 100.00) / SALE : 0;
                    objRtn.dblPerc02 = (PAY > 0) ? (objRtn.SVFOP * 100.00) / PAY : 0;
                    objRtn.dblPerc03 = (PEND > 0) ? (objRtn.SVFOPRF * 100.00) / PEND : 0;

                    list2.add(objRtn);
                }
                hm.put("lstDataPIE", list2);
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();

                    objRtn.SDATE = rs01.getString("FECHA");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.SDATE);
                    objRtn.FTE = rs01.getString("dscFTE");
                    objRtn.SVFOPUSD = rs01.getDouble("QTY1");
//                SUM(QTY1) QTY1,SUM(QTYSABO) QTYSABO,(SUM(QTY1) - SUM(QTYSABO)) DIF

                    list.add(objRtn);
                }
                hm.put("lstDataAnual", list);
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

        return hm;
    }

    public List<A2365Filter> loadPX307SQP01812(A2290Filter filter) throws SQLException, Exception {

        List<A2365Filter> list = new ArrayList<A2365Filter>();
        A2365Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double SALE = 0, PEND = 0, PAY = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01812(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_TO.trim().substring(0, 4));
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDC.trim());
            cstmt.setString(6, filter.IN_FECHA.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2365Filter();

                    objRtn.SDATE = rs01.getString("SDATE");
                    objRtn.SCARCOD = rs01.getString("SCARCOD");
                    objRtn.strDescripcion = rs01.getString("dscSCARCOD");
                    objRtn.SCURREN = rs01.getString("SCURREN");

                    objRtn.SVFOP1 = rs01.getDouble("SVFOP1");
                    objRtn.QTY1 = rs01.getInt("QTY1");
                    objRtn.SVFOP2 = rs01.getDouble("SVFOP2");
                    objRtn.QTY2 = rs01.getInt("QTY2");
                    objRtn.SVFOP3 = rs01.getDouble("SVFOP3");
                    objRtn.QTY3 = rs01.getInt("QTY3");
                    objRtn.SVFOP4 = rs01.getDouble("SVFOP4");
                    objRtn.QTY4 = rs01.getInt("QTY4");
                    objRtn.SVFOP5 = rs01.getDouble("SVFOP5");
                    objRtn.QTY5 = rs01.getInt("QTY5");

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

}
