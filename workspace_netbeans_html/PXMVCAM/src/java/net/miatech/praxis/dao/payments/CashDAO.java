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
import net.miatech.praxis.MPF108;
import net.miatech.praxis.MPF108Filter;
import net.miatech.praxis.MPF300;
import net.miatech.praxis.payment.filter.A2282Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author
 */
public class CashDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CashDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CashDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<MPF108> loadMPS441(MPF108Filter filter) throws SQLException, Exception {

        List<MPF108> lstData = new ArrayList<>();
        MPF108 bean;

        int totalQSales = 0;
        int totalQMatch = 0;
        int totalQManual = 0;
        int totalQPend = 0;
        int totalQPolipe = 0;
        int totalQPolic = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS441(?,?,?, ?, ?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_COUNTRY);
            cstmt.setString(5, filter.IN_SOURCE);
            cstmt.setString(6, filter.IN_TREG);

            cstmt.execute();
            rst = cstmt.getResultSet();

            while (rst.next()) {
                bean = new MPF108();
                bean.RN = rst.getInt("RN");
                bean.SDATE = rst.getString("SDATE").trim();
                bean.strFormatDate = Functions.getMonthConvert(bean.SDATE);
                bean.CCUST = rst.getString("CCUST").trim();

                bean.QSALES = rst.getInt("QSALES");
                bean.QMATCH = rst.getInt("QMATCH");
                bean.QMANUAL = rst.getInt("QMANUAL");
                bean.QPEND = rst.getInt("QPEND");
                bean.QPOLIPE = rst.getInt("QPOLIPE");
                bean.QPOLIC = rst.getInt("QPOLIC");

                int matchTotal = bean.QMATCH + bean.QMANUAL;
                if (bean.QSALES > 0) {
                    bean.PCT_MATCH = (matchTotal * 100.0) / bean.QSALES;
                } else {
                    bean.PCT_MATCH = 0.0;
                }

                totalQSales += bean.QSALES;
                totalQMatch += bean.QMATCH;
                totalQManual += bean.QMANUAL;
                totalQPend += bean.QPEND;
                totalQPolipe += bean.QPOLIPE;
                totalQPolic += bean.QPOLIC;

                bean.TOTAL_QSALES = totalQSales;
                bean.TOTAL_QMATCH = totalQMatch;
                bean.TOTAL_QMANUAL = totalQManual;
                bean.TOTAL_QPEND = totalQPend;
                bean.TOTAL_QPOLIPE = totalQPolipe;
                bean.TOTAL_QPOLIC = totalQPolic;

                int totalMatch = totalQMatch + totalQManual;

                if (totalQSales > 0) {
                    bean.TOTAL_PCT_MATCH = (totalMatch * 100.0) / totalQSales;
                } else {
                    bean.TOTAL_PCT_MATCH = 0.0;
                }

                lstData.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException e) {
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException e) {
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public List<MPF300> loadMPS442(MPF108Filter filter) throws SQLException, Exception {

        List<MPF300> lstData = new ArrayList<MPF300>(0);
        MPF300 bean;

        int totalQSales = 0;
        int totalQMatch = 0;
        int totalQManual = 0;
        int totalQPend = 0;
        int totalQPolipe = 0;
        int totalQPolic = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS442(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SOCIETY);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);
            cstmt.setString(5, filter.IN_COUNTRY);
            cstmt.setString(6, filter.IN_SOURCE);
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF300();
                bean.RN = rst.getInt("RN");
                bean.SDATE = rst.getString("SDATE").trim();
                bean.CFUENTE = rst.getString("CFUENTE");
                bean.QSALES = rst.getInt("QSALES");
                bean.QMATCH = rst.getInt("QMATCH");
                bean.QMANUAL = rst.getInt("QMANUAL");
                bean.QPEND = rst.getInt("QPEND");
                bean.QPOLIPE = rst.getInt("QPOLIPE");
                bean.QPOLIC = rst.getInt("QPOLIC");

                int matchTotal = bean.QMATCH + bean.QMANUAL;
                if (bean.QSALES > 0) {
                    bean.PCT_MATCH = (matchTotal * 100.0) / bean.QSALES;
                } else {
                    bean.PCT_MATCH = 0.0;
                }

                totalQSales += bean.QSALES;
                totalQMatch += bean.QMATCH;
                totalQManual += bean.QMANUAL;
                totalQPend += bean.QPEND;
                totalQPolipe += bean.QPOLIPE;
                totalQPolic += bean.QPOLIC;

                bean.TOTAL_QSALES = totalQSales;
                bean.TOTAL_QMATCH = totalQMatch;
                bean.TOTAL_QMANUAL = totalQManual;
                bean.TOTAL_QPEND = totalQPend;
                bean.TOTAL_QPOLIPE = totalQPolipe;
                bean.TOTAL_QPOLIC = totalQPolic;

                int totalMatch = totalQMatch + totalQManual;

                if (totalQSales > 0) {
                    bean.TOTAL_PCT_MATCH = (totalMatch * 100.0) / totalQSales;
                } else {
                    bean.TOTAL_PCT_MATCH = 0.0;
                }

                lstData.add(bean);
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

        return lstData;
    }

    public List<MPF300> loadMPS443(MPF108Filter filter) throws SQLException, Exception {

        List<MPF300> lstData = new ArrayList<MPF300>(0);
        MPF300 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS443(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SOCIETY);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);
            cstmt.setString(5, filter.IN_ACCOUNT);
            cstmt.setString(6, filter.IN_COUNTRY);
            cstmt.setString(7, filter.IN_SOURCE);
            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF300();
                bean.RN = rst.getInt("RN");
                bean.DIFFDAYS = rst.getInt("DIFFDAYS");
                bean.QTYDOC = rst.getInt("QTYDOC");
                bean.CCUST = rst.getString("CCUST");
                bean.CCIA = rst.getString("CCIA");
                bean.FORMA = rst.getString("FORMA");
                bean.SERIE = rst.getString("SERIE");
                bean.TDOC = rst.getString("TDOC");
                bean.SEQ = rst.getString("SEQ");
                bean.CORRL = rst.getString("CORRL");
                bean.STVAL = rst.getString("STVAL");
                bean.CFUENTE = rst.getString("CFUENTE");
                bean.TRNCU = rst.getString("TRNCU");
                bean.SCOUNTRY = rst.getString("SCOUNTRY");
                bean.SAGENT = rst.getString("SAGENT");
                bean.SCONSOL = rst.getString("SCONSOL");
                bean.SDATE = rst.getString("SDATE");
                bean.SCURRENCY = rst.getString("SCURRENCY");
                bean.SPAYMENT = rst.getString("SPAYMENT");

                bean.SVFOP = rst.getDouble("SVFOP");
                bean.SVFOPNETR = rst.getDouble("SVFOPNETR");
                bean.SVFOPNETRU = rst.getDouble("SVFOPNETRU");
                bean.SVFOPUSD = rst.getDouble("SVFOPUSD");

                if (rst.getString("TDOC").trim().equals("A")) {
                    bean.strPEM = "ADJUST.";
                } else if (rst.getString("TDOC").trim().equals("R")) {
                    bean.strPEM = "REFUND";
                } else {
                    bean.strPEM = "SALES";
                }

                bean.strTicket = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
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

        return lstData;
    }

    public List<MPF300> loadMPS444(MPF108Filter filter) throws SQLException, Exception {

        List<MPF300> lstData = new ArrayList<MPF300>(0);
        MPF300 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS444(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SOCIETY);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);
            cstmt.setString(5, filter.IN_COUNTRY);
            cstmt.setString(6, filter.IN_STATUS);
            cstmt.setString(7, filter.IN_AGENT);
            cstmt.setString(8, filter.IN_TICKET);
            cstmt.setString(9, filter.IN_STATUSACC);
            cstmt.setString(10, filter.IN_SPAYMENT);
            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF300();
                bean.RN = rst.getInt("RN");
                bean.DIFFDAYS = rst.getInt("DIFFDAYS");
                bean.QTYDOC = rst.getInt("QTYDOC");
                bean.CCUST = rst.getString("CCUST");
                bean.CCIA = rst.getString("CCIA");
                bean.FORMA = rst.getString("FORMA");
                bean.SERIE = rst.getString("SERIE");
                bean.TDOC = rst.getString("TDOC");
                bean.SEQ = rst.getString("SEQ");
                bean.CORRL = rst.getString("CORRL");
                bean.STVAL = rst.getString("STVAL");
                bean.CFUENTE = rst.getString("CFUENTE");
                bean.TRNCU = rst.getString("TRNCU");
                bean.SCOUNTRY = rst.getString("SCOUNTRY");
                bean.SAGENT = rst.getString("SAGENT");
                bean.SCONSOL = rst.getString("SCONSOL");
                bean.SDATE = rst.getString("SDATE");
                bean.SCURRENCY = rst.getString("SCURRENCY");
                bean.BANDOC = rst.getString("BANDOC");
                bean.DATCO = rst.getString("DATCO");
                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = rst.getString("HOCR");
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = rst.getString("HOUP");
                bean.SPAYMENT = rst.getString("SPAYMENT");

                bean.SVFOP = rst.getDouble("SVFOP");
                bean.SVFOPNETR = rst.getDouble("SVFOPNETR");
                bean.SVFOPNETRU = rst.getDouble("SVFOPNETRU");
                bean.SVFOPUSD = rst.getDouble("SVFOPUSD");

                if (rst.getString("TDOC").trim().equals("A")) {
                    bean.strPEM = "ADJUST.";
                } else if (rst.getString("TDOC").trim().equals("R")) {
                    bean.strPEM = "REFUND";
                } else {
                    bean.strPEM = "SALES";
                }

                bean.strTicket = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                bean.strDATECTRANC = rst.getString("TRANC").trim() + " - " + rst.getString("DATEC").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
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

        return lstData;
    }

    public List<MPF300> loadMPS445(MPF108Filter filter) throws SQLException, Exception {

        List<MPF300> lstData = new ArrayList<MPF300>(0);
        MPF300 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS445(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SOCIETY);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);
            cstmt.setString(5, filter.IN_ACCOUNT);
            cstmt.setString(6, filter.IN_CFUENTE);
            cstmt.setString(7, filter.IN_COUNTRY);
            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF300();
                bean.RN = rst.getInt("RN");
                bean.DIFFDAYS = rst.getInt("DIFFDAYS");
                bean.QTYDOC = rst.getInt("QTYDOC");
                bean.CCUST = rst.getString("CCUST");
                bean.CCIA = rst.getString("CCIA");
                bean.FORMA = rst.getString("FORMA");
                bean.SERIE = rst.getString("SERIE");
                bean.TDOC = rst.getString("TDOC");
                bean.SEQ = rst.getString("SEQ");
                bean.CORRL = rst.getString("CORRL");
                bean.STVAL = rst.getString("STVAL");
                bean.CFUENTE = rst.getString("CFUENTE");
                bean.TRNCU = rst.getString("TRNCU");
                bean.SCOUNTRY = rst.getString("SCOUNTRY");
                bean.SAGENT = rst.getString("SAGENT");
                bean.SCONSOL = rst.getString("SCONSOL");
                bean.SDATE = rst.getString("SDATE");
                bean.SCURRENCY = rst.getString("SCURRENCY");
                bean.SPAYMENT = rst.getString("SPAYMENT");

                bean.SVFOP = rst.getDouble("SVFOP");
                bean.SVFOPNETR = rst.getDouble("SVFOPNETR");
                bean.SVFOPNETRU = rst.getDouble("SVFOPNETRU");
                bean.SVFOPUSD = rst.getDouble("SVFOPUSD");

                if (rst.getString("TDOC").trim().equals("A")) {
                    bean.strPEM = "ADJUST.";
                } else if (rst.getString("TDOC").trim().equals("R")) {
                    bean.strPEM = "REFUND";
                } else {
                    bean.strPEM = "SALES";
                }

                bean.strTicket = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
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

        return lstData;
    }
}
