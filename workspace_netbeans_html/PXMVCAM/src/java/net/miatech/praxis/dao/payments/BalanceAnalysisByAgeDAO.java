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
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.praxis.payment.filter.A2356Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jsolano
 */
public class BalanceAnalysisByAgeDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public BalanceAnalysisByAgeDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BalanceAnalysisByAgeDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2356Filter> loadSQP05120(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0, totQTYTKT10 = 0, totQTYTKT30 = 0, totQTYTKT60 = 0, totQTYTKT90 = 0, totQTYTKT120 = 0, totQTYTKT999 = 0, totSVFOPUSD10 = 0, totSVFOPUSD30 = 0, totSVFOPUSD60 = 0, totSVFOPUSD90 = 0, totSVFOPUSD120 = 0, totSVFOPUSD999 = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF117_REPORT_V1(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTQTYTKT");
                totNETO = rst.getDouble("TOTSVFOPUSD");
                totQTYTKT10 = rst.getDouble("TOTQTYTKT10");
                totQTYTKT30 = rst.getDouble("TOTQTYTKT30");
                totQTYTKT60 = rst.getDouble("TOTQTYTKT60");
                totQTYTKT90 = rst.getDouble("TOTQTYTKT90");
                totQTYTKT120 = rst.getDouble("TOTQTYTKT120");
                totQTYTKT999 = rst.getDouble("TOTQTYTKT999");
                totSVFOPUSD10 = rst.getDouble("TOTSVFOPUSD10");
                totSVFOPUSD30 = rst.getDouble("TOTSVFOPUSD30");
                totSVFOPUSD60 = rst.getDouble("TOTSVFOPUSD60");
                totSVFOPUSD90 = rst.getDouble("TOTSVFOPUSD90");
                totSVFOPUSD120 = rst.getDouble("TOTSVFOPUSD120");
                totSVFOPUSD999 = rst.getDouble("TOTSVFOPUSD999");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
                    bean.RN = rst.getInt("RN");

                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.SDATE = rst.getString("SDATE").trim();
                    bean.SAGENT = rst.getString("SAGENT").trim();
                    bean.descSAGENT = rst.getString("SAGENTN").trim();
                    bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    bean.descSCOUNTRY = rst.getString("SCOUNTRYN").trim();
                    bean.SCURREVEN = rst.getString("SCURREVEN").trim();

                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.SVFOPUS10 = rst.getDouble("SVFOPUS10");
                    bean.SVFOPUS30 = rst.getDouble("SVFOPUS30");
                    bean.SVFOPUS60 = rst.getDouble("SVFOPUS60");
                    bean.SVFOPUS90 = rst.getDouble("SVFOPUS90");
                    bean.SVFOPUS120 = rst.getDouble("SVFOPUS120");
                    bean.SVFOPUS999 = rst.getDouble("SVFOPUS999");
                    bean.QTYTKT = rst.getInt("QTYTKT");
                    bean.QTYTKT10 = rst.getInt("QTYTKT10");
                    bean.QTYTKT30 = rst.getInt("QTYTKT30");
                    bean.QTYTKT60 = rst.getInt("QTYTKT60");
                    bean.QTYTKT90 = rst.getInt("QTYTKT90");
                    bean.QTYTKT120 = rst.getInt("QTYTKT120");
                    bean.QTYTKT999 = rst.getInt("QTYTKT999");

                    bean.totTOTAL = totTOTAL;
                    bean.totNETO = totNETO;
                    bean.totSVFOPUSD10 = totSVFOPUSD10;
                    bean.totSVFOPUSD30 = totSVFOPUSD30;
                    bean.totSVFOPUSD60 = totSVFOPUSD60;
                    bean.totSVFOPUSD90 = totSVFOPUSD90;
                    bean.totSVFOPUSD120 = totSVFOPUSD120;
                    bean.totSVFOPUSD999 = totSVFOPUSD999;
                    bean.totQTYTKT10 = totQTYTKT10;
                    bean.totQTYTKT30 = totQTYTKT30;
                    bean.totQTYTKT60 = totQTYTKT60;
                    bean.totQTYTKT90 = totQTYTKT90;
                    bean.totQTYTKT120 = totQTYTKT120;
                    bean.totQTYTKT999 = totQTYTKT999;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_RD2(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0, totPEND = 0, totPENDAMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF118_REPORT2_V2(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

//            cstmt.registerOutParameter(8, Types.INTEGER);
//            cstmt.registerOutParameter(9, Types.INTEGER);
//            cstmt.registerOutParameter(10, Types.INTEGER);
//            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);
            cstmt.setString(5, filter.IN_SAGENT);
            cstmt.setString(6, filter.IN_PERCENTAGE);
            cstmt.setString(7, filter.IN_CANAL);
            cstmt.setString(8, filter.IN_ORDER);
            cstmt.setString(9, filter.IN_TYPEPERC);
            cstmt.setString(10, filter.IN_CUTDAYS);
            cstmt.setString(11, filter.IN_TREG);
            cstmt.setString(12, filter.IN_SURPLUS);

//            cstmt.setInt(8, filter.page.PAGNUM);
//            cstmt.setInt(9, filter.page.PAGROW);
//            cstmt.setInt(10, filter.page.TOTPAG);
//            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

//            filter.page.PAGNUM = cstmt.getInt(8);
//            filter.page.PAGROW = cstmt.getInt(9);
//            filter.page.TOTPAG = cstmt.getInt(10);
//            filter.page.TOTROW = cstmt.getInt(11);
            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTQTYTKT");
                totNETO = rst.getDouble("TOTSVFOPUSD");
                totPEND = rst.getDouble("TOTQTYTKTP");
                totPENDAMOUNT = rst.getDouble("TOTSVFOPUSDP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
                    bean.RN = rst.getInt("RN");

                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.SDATE = rst.getString("SDATE").trim();
                    bean.SAGENT = rst.getString("SAGENT").trim();
                    bean.CANAL = rst.getString("CFUENTE").trim();
                    bean.descSAGENT = rst.getString("SAGENTN").trim();
                    bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    bean.descSCOUNTRY = rst.getString("SCOUNTRYN").trim();
                    bean.SCURREVEN = rst.getString("SCURREVEN").trim();
                    bean.DIFFDAYS = rst.getString("DIFFDAYS").trim();

                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.SVFOPUSDP = rst.getDouble("SVFOPUSDP");
                    bean.PERCPAID = rst.getDouble("PERCPAID");
                    bean.PERCPENDING = rst.getDouble("PERCPENDING");

                    bean.QTYTKT = rst.getDouble("QTYTKT");
                    bean.QTYTKTP = rst.getDouble("QTYTKTP");

                    bean.totQTYTKT = totTOTAL;
                    bean.totSVFOPUSD = totNETO;
                    bean.totQTYTKTP = totPEND;
                    bean.totSVFOPUSDP = totPENDAMOUNT;

//                    bean.page.PAGNUM = filter.page.PAGNUM;
//                    bean.page.PAGROW = filter.page.PAGROW;
//                    bean.page.TOTPAG = filter.page.TOTPAG;
//                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_ST(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;

        int totQSALES = 0, totQMATCH = 0, totQPEND = 0, totQPOLIC = 0, totQPOLIPE = 0;
        double totASALES = 0, totAMATCH = 0, totAPEND = 0, totAPOLIC = 0, totAPOLIPE = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF108_REPORT_ST(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totQSALES = rst.getInt("QSALES");
                totQMATCH = rst.getInt("QMATCH");
                totQPEND = rst.getInt("QPEND");
                totQPOLIC = rst.getInt("QPOLIC");
                totQPOLIPE = rst.getInt("QPOLIPE");
                totASALES = rst.getDouble("ASALES");
                totAMATCH = rst.getDouble("AMATCH");
                totAPEND = rst.getDouble("APEND");
                totAPOLIC = rst.getDouble("APOLIC");
                totAPOLIPE = rst.getDouble("APOLIPE");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
                    bean.RN = rst.getInt("RN");

//                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.SDATE = rst.getString("SDATE").trim();
                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());

                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.FCHILD = rst.getString("FCHILD").trim();
                    bean.QSALES = rst.getInt("QSALES");
                    bean.QMATCH = rst.getInt("QMATCH");
                    bean.QPEND = rst.getInt("QPEND");
                    bean.QPOLIC = rst.getInt("QPOLIC");
                    bean.QPOLIPE = rst.getInt("QPOLIPE");
                    bean.ASALES = rst.getDouble("ASALES");
                    bean.AMATCH = rst.getDouble("AMATCH");
                    bean.APEND = rst.getDouble("APEND");
                    bean.APOLIC = rst.getDouble("APOLIC");
                    bean.APOLIPE = rst.getDouble("APOLIPE");

                    bean.totQSALES = totQSALES;
                    bean.totQMATCH = totQMATCH;
                    bean.totQPEND = totQPEND;
                    bean.totQPOLIC = totQPOLIC;
                    bean.totQPOLIPE = totQPOLIPE;
                    bean.totASALES = totASALES;
                    bean.totAMATCH = totAMATCH;
                    bean.totAPEND = totAPEND;
                    bean.totAPOLIC = totAPOLIC;
                    bean.totAPOLIPE = totAPOLIPE;

                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_ST_BARD(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;

        int totQSALES = 0, totQMATCH = 0, totQPEND = 0, totQPOLIC = 0, totQPOLIPE = 0;
        double totASALES = 0, totAMATCH = 0, totAPEND = 0, totAPOLIC = 0, totAPOLIPE = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF108_REPORT_ST_BARD(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totQSALES = rst.getInt("QSALES");
                totQMATCH = rst.getInt("QMATCH");
                totQPEND = rst.getInt("QPEND");
                totQPOLIC = rst.getInt("QPOLIC");
                totQPOLIPE = rst.getInt("QPOLIPE");
                totASALES = rst.getDouble("ASALES");
                totAMATCH = rst.getDouble("AMATCH");
                totAPEND = rst.getDouble("APEND");
                totAPOLIC = rst.getDouble("APOLIC");
                totAPOLIPE = rst.getDouble("APOLIPE");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
                    bean.RN = rst.getInt("RN");

//                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.SDATE = rst.getString("SDATE").trim();
                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());

                    bean.QSALES = rst.getInt("QSALES");
                    bean.QMATCH = rst.getInt("QMATCH");
                    bean.QPEND = rst.getInt("QPEND");
                    bean.QPOLIC = rst.getInt("QPOLIC");
                    bean.QPOLIPE = rst.getInt("QPOLIPE");
                    bean.ASALES = rst.getDouble("ASALES");
                    bean.AMATCH = rst.getDouble("AMATCH");
                    bean.APEND = rst.getDouble("APEND");
                    bean.APOLIC = rst.getDouble("APOLIC");
                    bean.APOLIPE = rst.getDouble("APOLIPE");

                    bean.totQSALES = totQSALES;
                    bean.totQMATCH = totQMATCH;
                    bean.totQPEND = totQPEND;
                    bean.totQPOLIC = totQPOLIC;
                    bean.totQPOLIPE = totQPOLIPE;
                    bean.totASALES = totASALES;
                    bean.totAMATCH = totAMATCH;
                    bean.totAPEND = totAPEND;
                    bean.totAPOLIC = totAPOLIC;
                    bean.totAPOLIPE = totAPOLIPE;

                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_CT(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;

        int totQSALES = 0, totQMATCH = 0, totQPEND = 0, totQPOLIC = 0, totQPOLIPE = 0;
        double totASALES = 0, totAMATCH = 0, totAPEND = 0, totAPOLIC = 0, totAPOLIPE = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF108_REPORT_CT(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_SDATE);

            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totQSALES = rst.getInt("QSALES");
                totQMATCH = rst.getInt("QMATCH");
                totQPEND = rst.getInt("QPEND");
                totQPOLIC = rst.getInt("QPOLIC");
                totQPOLIPE = rst.getInt("QPOLIPE");
                totASALES = rst.getDouble("ASALES");
                totAMATCH = rst.getDouble("AMATCH");
                totAPEND = rst.getDouble("APEND");
                totAPOLIC = rst.getDouble("APOLIC");
                totAPOLIPE = rst.getDouble("APOLIPE");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
                    bean.RN = rst.getInt("RN");

//                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    bean.IN_CCUST = filter.IN_CCUST;
                    bean.IN_SDATE = filter.IN_SDATE;
                    bean.descSCOUNTRY = rst.getString("DESCOUNTRY").trim();
//                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    bean.strDescripcion = Functions.getMonthConvert(filter.IN_SDATE);
//                    bean.CCUST = rst.getString("CCUST").trim();
//                    bean.FCHILD = rst.getString("FCHILD").trim();
                    bean.QSALES = rst.getInt("QSALES");
                    bean.QMATCH = rst.getInt("QMATCH");
                    bean.QPEND = rst.getInt("QPEND");
                    bean.QPOLIC = rst.getInt("QPOLIC");
                    bean.QPOLIPE = rst.getInt("QPOLIPE");
                    bean.ASALES = rst.getDouble("ASALES");
                    bean.AMATCH = rst.getDouble("AMATCH");
                    bean.APEND = rst.getDouble("APEND");
                    bean.APOLIC = rst.getDouble("APOLIC");
                    bean.APOLIPE = rst.getDouble("APOLIPE");

                    bean.totQSALES = totQSALES;
                    bean.totQMATCH = totQMATCH;
                    bean.totQPEND = totQPEND;
                    bean.totQPOLIC = totQPOLIC;
                    bean.totQPOLIPE = totQPOLIPE;
                    bean.totASALES = totASALES;
                    bean.totAMATCH = totAMATCH;
                    bean.totAPEND = totAPEND;
                    bean.totAPOLIC = totAPOLIC;
                    bean.totAPOLIPE = totAPOLIPE;
                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_CT2(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;

        int totQSALES = 0, totQMATCH = 0, totQPEND = 0, totQPOLIC = 0, totQPOLIPE = 0;
        double totASALES = 0, totAMATCH = 0, totAPEND = 0, totAPOLIC = 0, totAPOLIPE = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF108_REPORT_CT2(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_SDATE);

            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totQSALES = rst.getInt("QSALES");
                totQMATCH = rst.getInt("QMATCH");
                totQPEND = rst.getInt("QPEND");
                totQPOLIC = rst.getInt("QPOLIC");
                totQPOLIPE = rst.getInt("QPOLIPE");
                totASALES = rst.getDouble("ASALES");
                totAMATCH = rst.getDouble("AMATCH");
                totAPEND = rst.getDouble("APEND");
                totAPOLIC = rst.getDouble("APOLIC");
                totAPOLIPE = rst.getDouble("APOLIPE");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
                    bean.RN = rst.getInt("RN");

//                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    bean.IN_CCUST = filter.IN_CCUST;
                    bean.IN_SDATE = filter.IN_SDATE;
                    bean.descSCOUNTRY = rst.getString("DESCOUNTRY").trim();
//                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    bean.strDescripcion = Functions.getMonthConvert(filter.IN_SDATE);
//                    bean.CCUST = rst.getString("CCUST").trim();
//                    bean.FCHILD = rst.getString("FCHILD").trim();
                    bean.QSALES = rst.getInt("QSALES");
                    bean.QMATCH = rst.getInt("QMATCH");
                    bean.QPEND = rst.getInt("QPEND");
                    bean.QPOLIC = rst.getInt("QPOLIC");
                    bean.QPOLIPE = rst.getInt("QPOLIPE");
                    bean.ASALES = rst.getDouble("ASALES");
                    bean.AMATCH = rst.getDouble("AMATCH");
                    bean.APEND = rst.getDouble("APEND");
                    bean.APOLIC = rst.getDouble("APOLIC");
                    bean.APOLIPE = rst.getDouble("APOLIPE");

                    bean.totQSALES = totQSALES;
                    bean.totQMATCH = totQMATCH;
                    bean.totQPEND = totQPEND;
                    bean.totQPOLIC = totQPOLIC;
                    bean.totQPOLIPE = totQPOLIPE;
                    bean.totASALES = totASALES;
                    bean.totAMATCH = totAMATCH;
                    bean.totAPEND = totAPEND;
                    bean.totAPOLIC = totAPOLIC;
                    bean.totAPOLIPE = totAPOLIPE;
                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_RD(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0, totPEND = 0, totPENDAMOUNT = 0, totPENDINGAMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF118_REPORT_V2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);
            cstmt.setString(5, filter.IN_SAGENT);
            cstmt.setString(6, filter.IN_PERCENTAGE);
            cstmt.setString(7, filter.IN_CANAL);
            cstmt.setString(8, filter.IN_ORDER);
            cstmt.setString(9, filter.IN_TYPEPERC);
            cstmt.setString(10, filter.IN_CUTDAYS);
            cstmt.setString(11, filter.IN_TREG);
            cstmt.setString(12, filter.IN_SURPLUS);

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTQTYTKT");
                totNETO = rst.getDouble("TOTSVFOPUSD");
                totPEND = rst.getDouble("TOTQTYTKTP");
                totPENDAMOUNT = rst.getDouble("TOTSVFOPUSDP");
                totPENDINGAMOUNT = rst.getDouble("TOTSVFOPUSDPENDING");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
                    bean.RN = rst.getInt("RN");

                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.SDATE = rst.getString("SDATE").trim();
                    bean.SAGENT = rst.getString("SAGENT").trim();
                    bean.CANAL = rst.getString("CFUENTE").trim();
                    bean.descSAGENT = rst.getString("SAGENTN").trim();
                    bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    bean.descSCOUNTRY = rst.getString("SCOUNTRYN").trim();
                    bean.SCURREVEN = rst.getString("SCURREVEN").trim();
                    bean.DIFFDAYS = rst.getString("DIFFDAYS").trim();
                    bean.FECR = rst.getString("FECR").trim();
                    bean.HOCR = rst.getString("HOCR").trim();

                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.SVFOPUSDP = rst.getDouble("SVFOPUSDP");
                    bean.SVFOPUSDPENDING = rst.getDouble("SVFOPUSDPENDING");
                    bean.PERCPAID = rst.getDouble("PERCPAID");
                    bean.PERCPENDING = rst.getDouble("PERCPENDING");

                    bean.QTYTKT = rst.getDouble("QTYTKT");
                    bean.QTYTKTP = rst.getDouble("QTYTKTP");

                    bean.totQTYTKT = totTOTAL;
                    bean.totSVFOPUSD = totNETO;
                    bean.totQTYTKTP = totPEND;
                    bean.totSVFOPUSDP = totPENDAMOUNT;
                    bean.totSVFOPUSDPENDING = totPENDINGAMOUNT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_RM(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0, totPEND = 0, totPENDAMOUNT = 0, totPENDINGAMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF118_REPORT_MONTH_V2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);
            cstmt.setString(5, filter.IN_SAGENT);
            cstmt.setString(6, filter.IN_PERCENTAGE);
            cstmt.setString(7, filter.IN_CANAL);
            cstmt.setString(8, filter.IN_ORDER);
            cstmt.setString(9, filter.IN_TYPEPERC);
            cstmt.setString(10, filter.IN_CUTDAYS);
            cstmt.setString(11, filter.IN_TREG);
            cstmt.setString(12, filter.IN_SURPLUS);

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTQTYTKT");
                totNETO = rst.getDouble("TOTSVFOPUSD");
                totPEND = rst.getDouble("TOTQTYTKTP");
                totPENDAMOUNT = rst.getDouble("TOTSVFOPUSDP");
                totPENDINGAMOUNT = rst.getDouble("TOTSVFOPUSDPENDING");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
//                    bean.RN = rst.getInt("RN");
//                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    bean.CCUST = rst.getString("CCUST").trim();
//                    bean.SDATE = rst.getString("SDATE").trim();
                    bean.SAGENT = rst.getString("SAGENT").trim();
                    bean.descSAGENT = rst.getString("SAGENTN").trim();
                    bean.CANAL = rst.getString("CFUENTE").trim();
//                    bean.SCURREVEN = rst.getString("SCURREVEN").trim();
//                    bean.DIFFDAYS = rst.getString("DIFFDAYS").trim();
//                    bean.FECR = rst.getString("FECR").trim();
//                    bean.HOCR = rst.getString("HOCR").trim();

                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.SVFOPUSDP = rst.getDouble("SVFOPUSDP");
                    bean.SVFOPUSDPENDING = rst.getDouble("SVFOPUSDPENDING");
                    bean.PERCPAID = rst.getDouble("PERCPAID");
                    bean.PERCPENDING = rst.getDouble("PERCPENDING");

                    bean.QTYTKT = rst.getDouble("QTYTKT");
                    bean.QTYTKTP = rst.getDouble("QTYTKTP");

                    bean.totQTYTKT = totTOTAL;
                    bean.totSVFOPUSD = totNETO;
                    bean.totQTYTKTP = totPEND;
                    bean.totSVFOPUSDP = totPENDAMOUNT;
                    bean.totSVFOPUSDPENDING = totPENDINGAMOUNT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_RM2(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0, totPEND = 0, totPENDAMOUNT = 0, totPENDINGAMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF118_REPORT_MONTH_2_V2(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

//            cstmt.registerOutParameter(8, Types.INTEGER);
//            cstmt.registerOutParameter(9, Types.INTEGER);
//            cstmt.registerOutParameter(10, Types.INTEGER);
//            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);
            cstmt.setString(5, filter.IN_SAGENT);
            cstmt.setString(6, filter.IN_PERCENTAGE);
            cstmt.setString(7, filter.IN_CANAL);
            cstmt.setString(8, filter.IN_ORDER);
            cstmt.setString(9, filter.IN_TYPEPERC);
            cstmt.setString(10, filter.IN_CUTDAYS);
            cstmt.setString(11, filter.IN_TOP);
            cstmt.setString(12, filter.IN_TREG);
            cstmt.setString(13, filter.IN_SURPLUS);

//            cstmt.setInt(8, filter.page.PAGNUM);
//            cstmt.setInt(9, filter.page.PAGROW);
//            cstmt.setInt(10, filter.page.TOTPAG);
//            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

//            filter.page.PAGNUM = cstmt.getInt(8);
//            filter.page.PAGROW = cstmt.getInt(9);
//            filter.page.TOTPAG = cstmt.getInt(10);
//            filter.page.TOTROW = cstmt.getInt(11);
            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTQTYTKT");
                totNETO = rst.getDouble("TOTSVFOPUSD");
                totPEND = rst.getDouble("TOTQTYTKTP");
                totPENDAMOUNT = rst.getDouble("TOTSVFOPUSDP");
                totPENDINGAMOUNT = rst.getDouble("TOTSVFOPUSDPENDING");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
//                    bean.RN = rst.getInt("RN");
//                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    bean.CCUST = rst.getString("CCUST").trim();
//                    bean.SDATE = rst.getString("SDATE").trim();
                    bean.SAGENT = rst.getString("SAGENT").trim();
                    bean.descSAGENT = rst.getString("SAGENTN").trim();
                    bean.CANAL = rst.getString("CFUENTE").trim();
//                    bean.SCURREVEN = rst.getString("SCURREVEN").trim();
//                    bean.DIFFDAYS = rst.getString("DIFFDAYS").trim();
//                    bean.FECR = rst.getString("FECR").trim();
//                    bean.HOCR = rst.getString("HOCR").trim();

                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.SVFOPUSDP = rst.getDouble("SVFOPUSDP");
                    bean.SVFOPUSDPENDING = rst.getDouble("SVFOPUSDPENDING");
                    bean.PERCPAID = rst.getDouble("PERCPAID");
                    bean.PERCPENDING = rst.getDouble("PERCPENDING");

                    bean.QTYTKT = rst.getDouble("QTYTKT");
                    bean.QTYTKTP = rst.getDouble("QTYTKTP");

                    bean.totQTYTKT = totTOTAL;
                    bean.totSVFOPUSD = totNETO;
                    bean.totQTYTKTP = totPEND;
                    bean.totSVFOPUSDP = totPENDAMOUNT;
                    bean.totSVFOPUSDPENDING = totPENDINGAMOUNT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_RC(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0, totPEND = 0, totPENDAMOUNT = 0, totPENDINGAMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF118_REPORT_CANAL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);
            cstmt.setString(5, filter.IN_SAGENT);
            cstmt.setString(6, filter.IN_PERCENTAGE);
            cstmt.setString(7, filter.IN_CANAL);
            cstmt.setString(8, filter.IN_ORDER);
            cstmt.setString(9, filter.IN_TYPEPERC);
            cstmt.setString(10, filter.IN_CUTDAYS);
            cstmt.setString(11, filter.IN_TREG);
            cstmt.setString(12, filter.IN_SURPLUS);

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTQTYTKT");
                totNETO = rst.getDouble("TOTSVFOPUSD");
                totPEND = rst.getDouble("TOTQTYTKTP");
                totPENDAMOUNT = rst.getDouble("TOTSVFOPUSDP");
                totPENDINGAMOUNT = rst.getDouble("TOTSVFOPUSDPENDING");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
//                    bean.RN = rst.getInt("RN");
//                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    bean.CCUST = rst.getString("CCUST").trim();
//                    bean.SDATE = rst.getString("SDATE").trim();
//                    bean.SAGENT = rst.getString("SAGENT").trim();
//                    bean.descSAGENT = rst.getString("SAGENTN").trim();
                    bean.CANAL = rst.getString("CFUENTE").trim();
//                    bean.SCURREVEN = rst.getString("SCURREVEN").trim();
//                    bean.DIFFDAYS = rst.getString("DIFFDAYS").trim();
//                    bean.FECR = rst.getString("FECR").trim();
//                    bean.HOCR = rst.getString("HOCR").trim();

                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.SVFOPUSDP = rst.getDouble("SVFOPUSDP");
                    bean.SVFOPUSDPENDING = rst.getDouble("SVFOPUSDPENDING");
                    bean.PERCPAID = rst.getDouble("PERCPAID");
                    bean.PERCPENDING = rst.getDouble("PERCPENDING");

                    bean.QTYTKT = rst.getDouble("QTYTKT");
                    bean.QTYTKTP = rst.getDouble("QTYTKTP");

                    bean.totQTYTKT = totTOTAL;
                    bean.totSVFOPUSD = totNETO;
                    bean.totQTYTKTP = totPEND;
                    bean.totSVFOPUSDP = totPENDAMOUNT;
                    bean.totSVFOPUSDPENDING = totPENDINGAMOUNT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_RC2(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0, totPEND = 0, totPENDAMOUNT = 0, totPENDINGAMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF118_REPORT_CANAL_2(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

//            cstmt.registerOutParameter(8, Types.INTEGER);
//            cstmt.registerOutParameter(9, Types.INTEGER);
//            cstmt.registerOutParameter(10, Types.INTEGER);
//            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);
            cstmt.setString(5, filter.IN_SAGENT);
            cstmt.setString(6, filter.IN_PERCENTAGE);
            cstmt.setString(7, filter.IN_CANAL);
            cstmt.setString(8, filter.IN_ORDER);
            cstmt.setString(9, filter.IN_TYPEPERC);
            cstmt.setString(10, filter.IN_CUTDAYS);
            cstmt.setString(11, filter.IN_TOP);
            cstmt.setString(12, filter.IN_TREG);
            cstmt.setString(13, filter.IN_SURPLUS);

//            cstmt.setInt(8, filter.page.PAGNUM);
//            cstmt.setInt(9, filter.page.PAGROW);
//            cstmt.setInt(10, filter.page.TOTPAG);
//            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

//            filter.page.PAGNUM = cstmt.getInt(8);
//            filter.page.PAGROW = cstmt.getInt(9);
//            filter.page.TOTPAG = cstmt.getInt(10);
//            filter.page.TOTROW = cstmt.getInt(11);
            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTQTYTKT");
                totNETO = rst.getDouble("TOTSVFOPUSD");
                totPEND = rst.getDouble("TOTQTYTKTP");
                totPENDAMOUNT = rst.getDouble("TOTSVFOPUSDP");
                totPENDINGAMOUNT = rst.getDouble("TOTSVFOPUSDPENDING");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
//                    bean.RN = rst.getInt("RN");
//                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    bean.CCUST = rst.getString("CCUST").trim();
//                    bean.SDATE = rst.getString("SDATE").trim();
//                    bean.SAGENT = rst.getString("SAGENT").trim();
//                    bean.descSAGENT = rst.getString("SAGENTN").trim();
                    bean.CANAL = rst.getString("CFUENTE").trim();
//                    bean.SCURREVEN = rst.getString("SCURREVEN").trim();
//                    bean.DIFFDAYS = rst.getString("DIFFDAYS").trim();
//                    bean.FECR = rst.getString("FECR").trim();
//                    bean.HOCR = rst.getString("HOCR").trim();

                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.SVFOPUSDP = rst.getDouble("SVFOPUSDP");
                    bean.SVFOPUSDPENDING = rst.getDouble("SVFOPUSDPENDING");
                    bean.PERCPAID = rst.getDouble("PERCPAID");
                    bean.PERCPENDING = rst.getDouble("PERCPENDING");

                    bean.QTYTKT = rst.getDouble("QTYTKT");
                    bean.QTYTKTP = rst.getDouble("QTYTKTP");

                    bean.totQTYTKT = totTOTAL;
                    bean.totSVFOPUSD = totNETO;
                    bean.totQTYTKTP = totPEND;
                    bean.totSVFOPUSDP = totPENDAMOUNT;
                    bean.totSVFOPUSDPENDING = totPENDINGAMOUNT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_RP(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0, totPEND = 0, totPENDAMOUNT = 0, totPENDINGAMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF118_REPORT_COMPANY_V2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);
            cstmt.setString(5, filter.IN_SAGENT);
            cstmt.setString(6, filter.IN_PERCENTAGE);
            cstmt.setString(7, filter.IN_CANAL);
            cstmt.setString(8, filter.IN_ORDER);
            cstmt.setString(9, filter.IN_TYPEPERC);
            cstmt.setString(10, filter.IN_CUTDAYS);
            cstmt.setString(11, filter.IN_TREG);
            cstmt.setString(12, filter.IN_SURPLUS);

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTQTYTKT");
                totNETO = rst.getDouble("TOTSVFOPUSD");
                totPEND = rst.getDouble("TOTQTYTKTP");
                totPENDAMOUNT = rst.getDouble("TOTSVFOPUSDP");
                totPENDINGAMOUNT = rst.getDouble("TOTSVFOPUSDPENDING");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
//                    bean.RN = rst.getInt("RN");
//                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    bean.CCUST = rst.getString("CCUST").trim();
//                    bean.SDATE = rst.getString("SDATE").trim();
//                    bean.SAGENT = rst.getString("SAGENT").trim();
//                    bean.descSAGENT = rst.getString("SAGENTN").trim();
//                    bean.CANAL = rst.getString("CFUENTE").trim();
//                    bean.SCURREVEN = rst.getString("SCURREVEN").trim();
//                    bean.DIFFDAYS = rst.getString("DIFFDAYS").trim();
//                    bean.FECR = rst.getString("FECR").trim();
//                    bean.HOCR = rst.getString("HOCR").trim();

                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.SVFOPUSDP = rst.getDouble("SVFOPUSDP");
                    bean.SVFOPUSDPENDING = rst.getDouble("SVFOPUSDPENDING");
                    bean.PERCPAID = rst.getDouble("PERCPAID");
                    bean.PERCPENDING = rst.getDouble("PERCPENDING");

                    bean.QTYTKT = rst.getDouble("QTYTKT");
                    bean.QTYTKTP = rst.getDouble("QTYTKTP");

                    bean.totQTYTKT = totTOTAL;
                    bean.totSVFOPUSD = totNETO;
                    bean.totQTYTKTP = totPEND;
                    bean.totSVFOPUSDP = totPENDAMOUNT;
                    bean.totSVFOPUSDPENDING = totPENDINGAMOUNT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_RP2(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0, totPEND = 0, totPENDAMOUNT = 0, totPENDINGAMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF118_REPORT_COMPANY_2_V2(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

//            cstmt.registerOutParameter(8, Types.INTEGER);
//            cstmt.registerOutParameter(9, Types.INTEGER);
//            cstmt.registerOutParameter(10, Types.INTEGER);
//            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);
            cstmt.setString(5, filter.IN_SAGENT);
            cstmt.setString(6, filter.IN_PERCENTAGE);
            cstmt.setString(7, filter.IN_CANAL);
            cstmt.setString(8, filter.IN_ORDER);
            cstmt.setString(9, filter.IN_TYPEPERC);
            cstmt.setString(10, filter.IN_CUTDAYS);
            cstmt.setString(11, filter.IN_TOP);
            cstmt.setString(12, filter.IN_TREG);
            cstmt.setString(13, filter.IN_SURPLUS);

//            cstmt.setInt(8, filter.page.PAGNUM);
//            cstmt.setInt(9, filter.page.PAGROW);
//            cstmt.setInt(10, filter.page.TOTPAG);
//            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

//            filter.page.PAGNUM = cstmt.getInt(8);
//            filter.page.PAGROW = cstmt.getInt(9);
//            filter.page.TOTPAG = cstmt.getInt(10);
//            filter.page.TOTROW = cstmt.getInt(11);
            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTQTYTKT");
                totNETO = rst.getDouble("TOTSVFOPUSD");
                totPEND = rst.getDouble("TOTQTYTKTP");
                totPENDAMOUNT = rst.getDouble("TOTSVFOPUSDP");
                totPENDINGAMOUNT = rst.getDouble("TOTSVFOPUSDPENDING");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
//                    bean.RN = rst.getInt("RN");
//                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    bean.CCUST = rst.getString("CCUST").trim();
//                    bean.SDATE = rst.getString("SDATE").trim();
//                    bean.SAGENT = rst.getString("SAGENT").trim();
//                    bean.descSAGENT = rst.getString("SAGENTN").trim();
//                    bean.CANAL = rst.getString("CFUENTE").trim();
//                    bean.SCURREVEN = rst.getString("SCURREVEN").trim();
//                    bean.DIFFDAYS = rst.getString("DIFFDAYS").trim();
//                    bean.FECR = rst.getString("FECR").trim();
//                    bean.HOCR = rst.getString("HOCR").trim();

                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.SVFOPUSDP = rst.getDouble("SVFOPUSDP");
                    bean.SVFOPUSDPENDING = rst.getDouble("SVFOPUSDPENDING");
                    bean.PERCPAID = rst.getDouble("PERCPAID");
                    bean.PERCPENDING = rst.getDouble("PERCPENDING");

                    bean.QTYTKT = rst.getDouble("QTYTKT");
                    bean.QTYTKTP = rst.getDouble("QTYTKTP");

                    bean.totQTYTKT = totTOTAL;
                    bean.totSVFOPUSD = totNETO;
                    bean.totQTYTKTP = totPEND;
                    bean.totSVFOPUSDP = totPENDAMOUNT;
                    bean.totSVFOPUSDPENDING = totPENDINGAMOUNT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_RS(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0, totPEND = 0, totPENDAMOUNT = 0, totPENDINGAMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF118_REPORT_SCOUNTRY_V2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);
            cstmt.setString(5, filter.IN_SAGENT);
            cstmt.setString(6, filter.IN_PERCENTAGE);
            cstmt.setString(7, filter.IN_CANAL);
            cstmt.setString(8, filter.IN_ORDER);
            cstmt.setString(9, filter.IN_TYPEPERC);
            cstmt.setString(10, filter.IN_CUTDAYS);
            cstmt.setString(11, filter.IN_TREG);
            cstmt.setString(12, filter.IN_SURPLUS);

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTQTYTKT");
                totNETO = rst.getDouble("TOTSVFOPUSD");
                totPEND = rst.getDouble("TOTQTYTKTP");
                totPENDAMOUNT = rst.getDouble("TOTSVFOPUSDP");
                totPENDINGAMOUNT = rst.getDouble("TOTSVFOPUSDPENDING");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
//                    bean.RN = rst.getInt("RN");
//                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    bean.CCUST = rst.getString("CCUST").trim();
//                    bean.SDATE = rst.getString("SDATE").trim();
//                    bean.SAGENT = rst.getString("SAGENT").trim();
//                    bean.descSAGENT = rst.getString("SAGENTN").trim();
                    bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    bean.descSCOUNTRY = rst.getString("SCOUNTRYN").trim();
//                    bean.SCURREVEN = rst.getString("SCURREVEN").trim();
//                    bean.DIFFDAYS = rst.getString("DIFFDAYS").trim();
//                    bean.FECR = rst.getString("FECR").trim();
//                    bean.HOCR = rst.getString("HOCR").trim();

                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.SVFOPUSDP = rst.getDouble("SVFOPUSDP");
                    bean.SVFOPUSDPENDING = rst.getDouble("SVFOPUSDPENDING");
                    bean.PERCPAID = rst.getDouble("PERCPAID");
                    bean.PERCPENDING = rst.getDouble("PERCPENDING");

                    bean.QTYTKT = rst.getDouble("QTYTKT");
                    bean.QTYTKTP = rst.getDouble("QTYTKTP");

                    bean.totQTYTKT = totTOTAL;
                    bean.totSVFOPUSD = totNETO;
                    bean.totQTYTKTP = totPEND;
                    bean.totSVFOPUSDP = totPENDAMOUNT;
                    bean.totSVFOPUSDPENDING = totPENDINGAMOUNT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

    public List<A2356Filter> loadSQP05120_RS2(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0, totPEND = 0, totPENDAMOUNT = 0, totPENDINGAMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF118_REPORT_SCOUNTRY_2_V2(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

//            cstmt.registerOutParameter(8, Types.INTEGER);
//            cstmt.registerOutParameter(9, Types.INTEGER);
//            cstmt.registerOutParameter(10, Types.INTEGER);
//            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);
            cstmt.setString(5, filter.IN_SAGENT);
            cstmt.setString(6, filter.IN_PERCENTAGE);
            cstmt.setString(7, filter.IN_CANAL);
            cstmt.setString(8, filter.IN_ORDER);
            cstmt.setString(9, filter.IN_TYPEPERC);
            cstmt.setString(10, filter.IN_CUTDAYS);
            cstmt.setString(11, filter.IN_TOP);
            cstmt.setString(12, filter.IN_TREG);
            cstmt.setString(13, filter.IN_SURPLUS);

//            cstmt.setInt(8, filter.page.PAGNUM);
//            cstmt.setInt(9, filter.page.PAGROW);
//            cstmt.setInt(10, filter.page.TOTPAG);
//            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

//            filter.page.PAGNUM = cstmt.getInt(8);
//            filter.page.PAGROW = cstmt.getInt(9);
//            filter.page.TOTPAG = cstmt.getInt(10);
//            filter.page.TOTROW = cstmt.getInt(11);
            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTQTYTKT");
                totNETO = rst.getDouble("TOTSVFOPUSD");
                totPEND = rst.getDouble("TOTQTYTKTP");
                totPENDAMOUNT = rst.getDouble("TOTSVFOPUSDP");
                totPENDINGAMOUNT = rst.getDouble("TOTSVFOPUSDPENDING");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
//                    bean.RN = rst.getInt("RN");
//                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    bean.CCUST = rst.getString("CCUST").trim();
//                    bean.SDATE = rst.getString("SDATE").trim();
//                    bean.SAGENT = rst.getString("SAGENT").trim();
//                    bean.descSAGENT = rst.getString("SAGENTN").trim();
                    bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                    bean.SCURREVEN = rst.getString("SCURREVEN").trim();
//                    bean.DIFFDAYS = rst.getString("DIFFDAYS").trim();
//                    bean.FECR = rst.getString("FECR").trim();
//                    bean.HOCR = rst.getString("HOCR").trim();

                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.SVFOPUSDP = rst.getDouble("SVFOPUSDP");
                    bean.SVFOPUSDPENDING = rst.getDouble("SVFOPUSDPENDING");
                    bean.PERCPAID = rst.getDouble("PERCPAID");
                    bean.PERCPENDING = rst.getDouble("PERCPENDING");

                    bean.QTYTKT = rst.getDouble("QTYTKT");
                    bean.QTYTKTP = rst.getDouble("QTYTKTP");

                    bean.totQTYTKT = totTOTAL;
                    bean.totSVFOPUSD = totNETO;
                    bean.totQTYTKTP = totPEND;
                    bean.totSVFOPUSDP = totPENDAMOUNT;
                    bean.totSVFOPUSDPENDING = totPENDINGAMOUNT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

    public A2356Filter loadSQP05120_AD() throws SQLException, Exception {

        String strMsj = "Operation was successful.";
        A2356Filter objRtn = new A2356Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF118_AD(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(1, Types.VARCHAR);
            cstmt01.registerOutParameter(2, Types.VARCHAR);
            cstmt01.registerOutParameter(3, Types.VARCHAR);

            cstmt01.execute();
            objRtn.MESSAGE = cstmt01.getString(1);
            objRtn.strFormatDate = Functions.getMonthConvert(cstmt01.getString(2).substring(0, 6)) + '-' + cstmt01.getString(2).substring(6);
            objRtn.FECR = cstmt01.getString(2);
            objRtn.HOCR = cstmt01.getString(3).substring(0, 2) + ':' + cstmt01.getString(3).substring(2, 4) + ':' + cstmt01.getString(3).substring(4);

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            strMsj = e.getMessage();
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
//        objRtn.MESSAGE = strMsj;
        return objRtn;
    }

    public A2356Filter loadSQP02856(A2356Filter filter) throws SQLException, Exception {

        A2356Filter bean = new A2356Filter();
        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02856(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.SCOUNTRY.trim());
            cstmt01.setString(3, filter.CODEBANK.trim());
            cstmt01.setString(4, filter.SCURRENCY.trim());
            cstmt01.setString(5, filter.CODTRAN.trim());
            cstmt01.setString(6, filter.TIPREG.trim());
            cstmt01.setString(7, filter.CODCLIT.trim());

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            if (rst.next()) {
                bean.CCUST = rst.getString("CCUST");
                bean.CODTRAN = rst.getString("CODTRAN").trim();
                bean.DESCRI = rst.getString("DESCRI").trim();
                bean.TIPREG = rst.getString("TIPREG").trim();
                if (rst.getString("TIPREG").trim().equals("C")) {
                    bean.desTIPREG = "Cargo";
                } else {
                    bean.desTIPREG = "Abono";
                }
                bean.CODAGRU = rst.getString("CODAGRU").trim();
                bean.CLASE = rst.getString("CLASE").trim();
                bean.DIRCLIT = rst.getString("DIRCLIT").trim();
                bean.NROPOLIZ = rst.getString("NROPOLIZ").trim();
                bean.CODEBANK = rst.getString("CODEBANK").trim();
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.DESMLINE = rst.getString("DESMLINE").trim();
                bean.CODCLIT = rst.getString("CODCLIT").trim();
                bean.CIACTA = rst.getString("CIACTA").trim();
                bean.UNIDAD = rst.getString("UNIDAD").trim();
                bean.CECOS = rst.getString("CECOS").trim();
                bean.LOCAC = rst.getString("LOCAC").trim();
                bean.CODCTA = rst.getString("CODCTA").trim();
                bean.SUBCTA = rst.getString("SUBCTA").trim();
                bean.EQUIPO = rst.getString("EQUIPO").trim();
                bean.ICIA = rst.getString("ICIA").trim();
                bean.CTACTB = rst.getString("CTACTB").trim();
                bean.Field1 = bean.CIACTA + bean.UNIDAD + bean.CECOS + bean.LOCAC + bean.CODCTA + bean.SUBCTA + bean.EQUIPO + bean.ICIA;

                if (bean.Field1.equals("")) {
                    bean.Field2 = "";
                } else {
                    bean.Field2 = bean.CIACTA + "-" + bean.UNIDAD + "-" + bean.CECOS + "-" + bean.LOCAC + "-" + bean.CODCTA + "-" + bean.SUBCTA + "-" + bean.EQUIPO + "-" + bean.ICIA;
                }

                bean.COSTCEN = rst.getString("COSTCEN").trim();
                bean.NEGOC = rst.getString("NEGOC").trim();
                if (rst.getString("NEGOC").trim().equals("1")) {
                    bean.descNEGOC = "PASAJES";
                } else if (rst.getString("NEGOC").trim().equals("2")) {
                    bean.descNEGOC = "CARGA";
                } else if (rst.getString("NEGOC").trim().equals("3")) {
                    bean.descNEGOC = "CORREO";
                }
                bean.TTRAN = rst.getString("TTRAN").trim();
                bean.TOPER = rst.getString("TOPER").trim();
                bean.ACCNUMBER = rst.getString("ACCNUMBER").trim();

                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = rst.getString("HOCR");
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = rst.getString("HOUP");

            }
        } catch (Exception e) {
            // e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return bean;
    }

    public String loadSQP02857(A2356Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02857(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.CODTRAN.trim());
            cstmt.setString(4, filter.DESCRI.trim());
            cstmt.setString(5, filter.TIPREG.trim());
            cstmt.setString(6, filter.CODEBANK.trim());
            cstmt.setString(7, filter.SCURRENCY.trim());
            cstmt.setString(8, filter.SCOUNTRY.trim());
            cstmt.setString(9, filter.CODCLIT.trim());
            cstmt.setString(10, filter.CIACTA.trim());
            cstmt.setString(11, filter.UNIDAD.trim());
            cstmt.setString(12, filter.CECOS.trim());
            cstmt.setString(13, filter.LOCAC.trim());
            cstmt.setString(14, filter.CODCTA.trim());
            cstmt.setString(15, filter.SUBCTA.trim());
            cstmt.setString(16, filter.EQUIPO.trim());
            cstmt.setString(17, filter.ICIA.trim());
            cstmt.setString(18, filter.CTACTB.trim());
            cstmt.setString(19, filter.NROPOLIZ.trim());
            cstmt.setString(20, filter.CLASE.trim());
            cstmt.setString(21, filter.DIRCLIT.trim());
            cstmt.setString(22, filter.CODAGRU.trim());
            cstmt.setString(23, filter.DESMLINE.trim());
            cstmt.setString(24, filter.COSTCEN.trim());
            cstmt.setString(25, filter.NEGOC.trim());
            cstmt.setString(26, filter.TTRAN.trim());
            cstmt.setString(27, filter.TOPER.trim());
            cstmt.setString(28, filter.ACCNUMBER.trim());
            cstmt.setString(29, session.getUserView().getUserInfo().USR);
            cstmt.setString(30, Functions.getFechaActual());
            cstmt.setString(31, Functions.getHoraActual());
            cstmt.execute();

        } catch (Exception e) {
            //e.printStackTrace();
            strMsj = e.getMessage();
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
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;

    }

    public List<A2290Filter> loadPX269SQP05103_DEBITYPE(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05103_DEBITYPE(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt.execute();

            rst = cstmt.getResultSet();
            beanTkt = new A2290Filter();

            beanTkt.CODE = "";
            beanTkt.NAME = "All";
            lstData.add(beanTkt);
            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("NAME").trim();

                lstData.add(beanTkt);
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

    public List<A2331Filter> loadPX419SQP03203(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        A2331Filter objRtnNotFound = new A2331Filter();
        long QTYCLAR = 0, QTYCLARS = 0, QTYCLARP = 0, QTYCLARC = 0, QTYCLARN = 0, QTYBANK = 0, QTYBANKN = 0;
        long QTYCLART = 0, QTYBANKT = 0, QTYCHGBK = 0, QTYCLARR = 0;//Tkts
        double AMTSALE = 0, AMTCLAR = 0, AMTCLARU = 0, AMTBANK = 0, AMTBANKU = 0, AMTCHGBU = 0, AMTREVCU = 0;
        boolean hayNotFound = false;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03203_1(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_SELECT.trim());

            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                AMTSALE = rs01.getDouble("AMTSALE");
                QTYCLAR = rs01.getLong("QTYCLAR");
                QTYCLART = rs01.getLong("QTYCLART");
                QTYCLARS = rs01.getLong("QTYCLARS");
                QTYCLARP = rs01.getLong("QTYCLARP") + rs01.getLong("QTYCLARN");
                QTYCLARC = rs01.getLong("QTYCLARC");
                QTYCLARN = rs01.getLong("QTYCLARN");
                AMTCLAR = rs01.getDouble("AMTCLAR");
                AMTCLARU = rs01.getDouble("AMTCLARU");

                QTYCHGBK = rs01.getLong("QTYCHGBK");
                QTYCLARR = rs01.getLong("QTYCLARR");
                AMTCHGBU = rs01.getDouble("AMTCHGBU");
                AMTREVCU = rs01.getDouble("AMTREVCU");

                AMTBANK = rs01.getLong("AMTBANK");
                AMTBANKU = rs01.getLong("AMTBANKU");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_SELECT = filter.IN_SELECT;

                    objRtn.SENTDATE = rs01.getString("GROUPBY").trim();
                    if (objRtn.IN_SELECT.trim().equals("MONTH")) {
                        objRtn.strFormatDate = Functions.getMonthConvert(rs01.getString("GROUPBY").trim());
                    } else {
                        objRtn.strDescripcion = rs01.getString("DESCRIPT").trim();
                    }
                    objRtn.dblAMTSALE = rs01.getDouble("AMTSALE");
                    objRtn.lngQTYCLAR = rs01.getLong("QTYCLAR");
                    objRtn.lngQTYCLART = rs01.getLong("QTYCLART");
                    objRtn.lngQTYCLARS = rs01.getLong("QTYCLARS");
                    objRtn.lngQTYCLARP = rs01.getLong("QTYCLARP") + rs01.getLong("QTYCLARN");
                    objRtn.lngQTYCLARC = rs01.getLong("QTYCLARC");
                    objRtn.lngQNMATCH = rs01.getLong("QTYCLARN");
                    objRtn.dblAMTCLAR = rs01.getDouble("AMTCLAR");
                    objRtn.dblAMTCLARU = rs01.getDouble("AMTCLARU");

                    objRtn.QTYCHGBK = rs01.getLong("QTYCHGBK");
                    objRtn.AMTCHGBU = rs01.getDouble("AMTCHGBU");
                    objRtn.QTYCLARR = rs01.getLong("QTYCLARR");
                    objRtn.AMTREVCU = rs01.getDouble("AMTREVCU");

                    objRtn.perAnsw = (objRtn.lngQTYCLAR > 0) ? (double) (objRtn.lngQTYCLARP * 100) / objRtn.lngQTYCLAR : 0;
                    objRtn.perNoAnsw = (objRtn.lngQTYCLAR > 0) ? (double) (objRtn.lngQTYCLARS * 100) / objRtn.lngQTYCLAR : 0;

                    objRtn.lngQTYBANK = objRtn.QTYCHGBK - objRtn.QTYCLARR;
                    objRtn.dblAMTBANK = objRtn.AMTCHGBU - objRtn.AMTREVCU;
                    objRtn.per = (objRtn.dblAMTCLARU > 0) ? (objRtn.dblAMTBANK / objRtn.dblAMTCLARU) * 100 : 0;

                    // objRtn.dblAMTBANK = rs01.getDouble("AMTBANK");
                    objRtn.dblAMTBANKU = rs01.getDouble("AMTBANKU");

                    objRtn.dblTotAMTSALE = AMTSALE;
                    objRtn.lngTotQTYCLAR = QTYCLAR;
                    objRtn.lngTotQTYCLART = QTYCLART;
                    objRtn.lngTotQTYCLARS = QTYCLARS;
                    objRtn.lngTotQTYCLARP = QTYCLARP;
                    objRtn.lngTotQTYCLARC = QTYCLARC;
                    objRtn.lngTotQNMATCH = QTYCLARN;
                    objRtn.dblTotAMTCLAR = AMTCLAR;
                    objRtn.dblTotAMTCLARU = AMTCLARU;

                    objRtn.totQTYCHGBK = QTYCHGBK; //QTYCHGBK
                    objRtn.totQTYCLARR = QTYCLARR;//QTYCLARR
                    objRtn.totAMTCHGBU = AMTCHGBU;
                    objRtn.totAMTREVCU = AMTREVCU;

                    objRtn.TotperAnsw = ((objRtn.lngTotQTYCLAR > 0) ? (double) (objRtn.lngTotQTYCLARP * 100) / objRtn.lngTotQTYCLAR : 0.00);
                    objRtn.TotperNoAnsw = (objRtn.lngTotQTYCLAR > 0) ? (double) (objRtn.lngTotQTYCLARS * 100) / objRtn.lngTotQTYCLAR : 0.00;

                    objRtn.lngTotQTYBANK = objRtn.totQTYCHGBK - objRtn.totQTYCLARR;
                    objRtn.dblTotAMTBANK = objRtn.totAMTCHGBU - objRtn.totAMTREVCU;
                    objRtn.totper = (objRtn.dblTotAMTCLARU > 0) ? (objRtn.dblTotAMTBANK / objRtn.dblTotAMTCLARU) * 100 : 0;

                    //objRtn.dblTotAMTBANK = AMTBANK;
                    objRtn.dblTotAMTBANKU = AMTBANKU;

                    /*objRtn.page.PAGNUM = filter.page.PAGNUM;
                     objRtn.page.PAGROW = filter.page.PAGROW;
                     objRtn.page.TOTPAG = filter.page.TOTPAG;
                     objRtn.page.TOTROW = filter.page.TOTROW;*/
                    if (objRtn.SENTDATE.isEmpty()) {
                        hayNotFound = true;
                        objRtnNotFound = objRtn;
                    } else {
                        list.add(objRtn);
                    }
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

            if (hayNotFound) {
                list.add(objRtnNotFound);
            }

        } catch (Exception e) {
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

    public List<A2331Filter> loadPX419SQP02079(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        A2331Filter objRtnNotFound = new A2331Filter();
        long QTYCLAR = 0, QTYCLARS = 0, QTYCLARP = 0, QTYCLARC = 0, QTYCLARN = 0, QTYBANK = 0, QTYBANKN = 0;
        long QTYCLART = 0, QTYBANKT = 0, QTYCHGBK = 0, QTYCLARR = 0;//Tkts
        double AMTSALE = 0, AMTCLAR = 0, AMTCLARU = 0, AMTBANK = 0, AMTBANKU = 0, AMTCHGBU = 0, AMTREVCU = 0;
        boolean hayNotFound = false;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02079_2(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            /*cstmt.registerOutParameter(13, Types.INTEGER);
             cstmt.registerOutParameter(14, Types.INTEGER);
             cstmt.registerOutParameter(15, Types.INTEGER);
             cstmt.registerOutParameter(16, Types.INTEGER);*/

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_SELECT.trim());
            /*cstmt.setInt(13, filter.page.PAGNUM);
             cstmt.setInt(14, filter.page.PAGROW);
             cstmt.setInt(15, filter.page.TOTPAG);
             cstmt.setInt(16, filter.page.TOTROW);*/
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            /*filter.page.PAGNUM = cstmt.getInt(13);
             filter.page.PAGROW = cstmt.getInt(14);
             filter.page.TOTPAG = cstmt.getInt(15);
             filter.page.TOTROW = cstmt.getInt(16);*/
            if (rs01.next()) {
                AMTSALE = rs01.getDouble("AMTSALE");
                QTYCLAR = rs01.getLong("QTYCLAR");
                QTYCLART = rs01.getLong("QTYCLART");
                QTYCLARS = rs01.getLong("QTYCLARS");
                QTYCLARP = rs01.getLong("QTYCLARP");
                QTYCLARC = rs01.getLong("QTYCLARC");
                QTYCLARN = rs01.getLong("QTYCLARN");
                AMTCLAR = rs01.getDouble("AMTCLAR");
                AMTCLARU = rs01.getDouble("AMTCLARU");

                QTYCHGBK = rs01.getLong("QTYCHGBK");
                QTYCLARR = rs01.getLong("QTYCLARR");
                AMTCHGBU = rs01.getDouble("AMTCHGBU");
                AMTREVCU = rs01.getDouble("AMTREVCU");

                AMTBANK = rs01.getLong("AMTBANK");
                AMTBANKU = rs01.getLong("AMTBANKU");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_SELECT = filter.IN_SELECT;

                    objRtn.SENTDATE = rs01.getString("GROUPBY").trim();
                    if (objRtn.IN_SELECT.trim().equals("MONTH")) {
                        objRtn.strFormatDate = Functions.getMonthConvert(rs01.getString("GROUPBY").trim());
                    } else {
                        objRtn.strDescripcion = rs01.getString("DESCRIPT").trim();
                    }
                    objRtn.dblAMTSALE = rs01.getDouble("AMTSALE");
                    objRtn.lngQTYCLAR = rs01.getLong("QTYCLAR");
                    objRtn.lngQTYCLART = rs01.getLong("QTYCLART");
                    objRtn.lngQTYCLARS = rs01.getLong("QTYCLARS");
                    objRtn.lngQTYCLARP = rs01.getLong("QTYCLARP");
                    objRtn.lngQTYCLARC = rs01.getLong("QTYCLARC");
                    objRtn.lngQNMATCH = rs01.getLong("QTYCLARN");
                    objRtn.dblAMTCLAR = rs01.getDouble("AMTCLAR");
                    objRtn.dblAMTCLARU = rs01.getDouble("AMTCLARU");

                    objRtn.QTYCHGBK = rs01.getLong("QTYCHGBK");
                    objRtn.AMTCHGBU = rs01.getDouble("AMTCHGBU");
                    objRtn.QTYCLARR = rs01.getLong("QTYCLARR");
                    objRtn.AMTREVCU = rs01.getDouble("AMTREVCU");

                    objRtn.lngQTYBANK = objRtn.QTYCHGBK - objRtn.QTYCLARR;
                    objRtn.dblAMTBANK = objRtn.AMTCHGBU - objRtn.AMTREVCU;

                    // objRtn.dblAMTBANK = rs01.getDouble("AMTBANK");
                    objRtn.dblAMTBANKU = rs01.getDouble("AMTBANKU");

                    objRtn.dblTotAMTSALE = AMTSALE;
                    objRtn.lngTotQTYCLAR = QTYCLAR;
                    objRtn.lngTotQTYCLART = QTYCLART;
                    objRtn.lngTotQTYCLARS = QTYCLARS;
                    objRtn.lngTotQTYCLARP = QTYCLARP;
                    objRtn.lngTotQTYCLARC = QTYCLARC;
                    objRtn.lngTotQNMATCH = QTYCLARN;
                    objRtn.dblTotAMTCLAR = AMTCLAR;
                    objRtn.dblTotAMTCLARU = AMTCLARU;

                    objRtn.totQTYCHGBK = QTYCHGBK; //QTYCHGBK
                    objRtn.totQTYCLARR = QTYCLARR;//QTYCLARR
                    objRtn.totAMTCHGBU = AMTCHGBU;
                    objRtn.totAMTREVCU = AMTREVCU;

                    objRtn.lngTotQTYBANK = objRtn.totQTYCHGBK - objRtn.totQTYCLARR;
                    objRtn.dblTotAMTBANK = objRtn.totAMTCHGBU - objRtn.totAMTREVCU;

                    //objRtn.dblTotAMTBANK = AMTBANK;
                    objRtn.dblTotAMTBANKU = AMTBANKU;

                    /*objRtn.page.PAGNUM = filter.page.PAGNUM;
                     objRtn.page.PAGROW = filter.page.PAGROW;
                     objRtn.page.TOTPAG = filter.page.TOTPAG;
                     objRtn.page.TOTROW = filter.page.TOTROW;*/
                    if (objRtn.SENTDATE.isEmpty()) {
                        hayNotFound = true;
                        objRtnNotFound = objRtn;
                    } else {
                        list.add(objRtn);
                    }
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

            if (hayNotFound) {
                list.add(objRtnNotFound);
            }

        } catch (Exception e) {
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

    public List<A2331Filter> loadPX419SQP02104(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        A2331Filter objRtnNotFound = new A2331Filter();
        long QTYCLAR = 0, QTYCLARS = 0, QTYCLARP = 0, QTYCLARC = 0, QTYCLARN = 0, QTYBANK = 0, QTYBANKN = 0;
        long QTYCLART = 0, QTYBANKT = 0, QTYCHGBK = 0, QTYCLARR = 0;//Tkts
        double AMTSALE = 0, AMTCLAR = 0, AMTCLARU = 0, AMTBANK = 0, AMTBANKU = 0, AMTCHGBU = 0, AMTREVCU = 0;
        boolean hayNotFound = false;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02104_2(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.SENTDATE);
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                AMTSALE = rs01.getDouble("AMTSALE");
                QTYCLAR = rs01.getLong("QTYCLAR");
                QTYCLART = rs01.getLong("QTYCLART");
                QTYCLARS = rs01.getLong("QTYCLARS");
                QTYCLARP = rs01.getLong("QTYCLARP");
                QTYCLARC = rs01.getLong("QTYCLARC");
                QTYCLARN = rs01.getLong("QTYCLARN");
                AMTCLAR = rs01.getDouble("AMTCLAR");
                AMTCLARU = rs01.getDouble("AMTCLARU");
                QTYBANK = rs01.getLong("QTYBANK");
                QTYBANKT = rs01.getLong("QTYBANKT");
                QTYBANKN = rs01.getLong("QTYBANKN");
                AMTBANK = rs01.getLong("AMTBANK");
                AMTBANKU = rs01.getLong("AMTBANKU");

                QTYCHGBK = rs01.getLong("QTYCHGBK");
                QTYCLARR = rs01.getLong("QTYCLARR");
                AMTCHGBU = rs01.getDouble("AMTCHGBU");
                AMTREVCU = rs01.getDouble("AMTREVCU");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.SENTDATE = filter.SENTDATE;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.IN_TDOC = filter.IN_TDOC;

                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.strDescripcion = rs01.getString("DESCRIPT").trim();
                    objRtn.dblAMTSALE = rs01.getDouble("AMTSALE");
                    objRtn.lngQTYCLAR = rs01.getLong("QTYCLAR");
                    objRtn.lngQTYCLART = rs01.getLong("QTYCLART");
                    objRtn.lngQTYCLARS = rs01.getLong("QTYCLARS");
                    objRtn.lngQTYCLARP = rs01.getLong("QTYCLARP");
                    objRtn.lngQTYCLARC = rs01.getLong("QTYCLARC");
                    objRtn.lngQNMATCH = rs01.getLong("QTYCLARN");
                    objRtn.dblAMTCLAR = rs01.getDouble("AMTCLAR");
                    objRtn.dblAMTCLARU = rs01.getDouble("AMTCLARU");
                    //objRtn.lngQTYBANK = rs01.getLong("QTYBANK");
                    objRtn.lngQTYBANKT = rs01.getLong("QTYBANKT");
                    objRtn.lngQTYBANKN = rs01.getLong("QTYBANKN");
                    // objRtn.dblAMTBANK = rs01.getDouble("AMTBANK");
                    objRtn.dblAMTBANKU = rs01.getDouble("AMTBANKU");

                    objRtn.QTYCHGBK = rs01.getLong("QTYCHGBK");
                    objRtn.AMTCHGBU = rs01.getDouble("AMTCHGBU");
                    objRtn.QTYCLARR = rs01.getLong("QTYCLARR");
                    objRtn.AMTREVCU = rs01.getDouble("AMTREVCU");

                    objRtn.lngQTYBANK = objRtn.QTYCHGBK - objRtn.QTYCLARR;
                    objRtn.dblAMTBANK = objRtn.AMTCHGBU - objRtn.AMTREVCU;

                    objRtn.dblTotAMTSALE = AMTSALE;
                    objRtn.lngTotQTYCLAR = QTYCLAR;
                    objRtn.lngTotQTYCLART = QTYCLART;
                    objRtn.lngTotQTYCLARS = QTYCLARS;
                    objRtn.lngTotQTYCLARP = QTYCLARP;
                    objRtn.lngTotQTYCLARC = QTYCLARC;
                    objRtn.lngTotQNMATCH = QTYCLARN;
                    objRtn.dblTotAMTCLAR = AMTCLAR;
                    objRtn.dblTotAMTCLARU = AMTCLARU;
                    //objRtn.lngTotQTYBANK = QTYBANK;
                    objRtn.lngTotQTYBANKT = QTYBANKT;
                    objRtn.lngTotQTYBANKN = QTYBANKN;
                    // objRtn.dblTotAMTBANK = AMTBANK;
                    objRtn.dblTotAMTBANKU = AMTBANKU;

                    objRtn.totQTYCHGBK = QTYCHGBK; //QTYCHGBK
                    objRtn.totQTYCLARR = QTYCLARR;//QTYCLARR
                    objRtn.totAMTCHGBU = AMTCHGBU;
                    objRtn.totAMTREVCU = AMTREVCU;

                    objRtn.lngTotQTYBANK = objRtn.totQTYCHGBK - objRtn.totQTYCLARR;
                    objRtn.dblTotAMTBANK = objRtn.totAMTCHGBU - objRtn.totAMTREVCU;

                    if (objRtn.CODEBANK.isEmpty()) {
                        hayNotFound = true;
                        objRtnNotFound = objRtn;
                    } else {
                        list.add(objRtn);
                    }
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

            if (hayNotFound) {
                list.add(objRtnNotFound);
            }

        } catch (Exception e) {
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

    public List<A2331Filter> loadPX419SQP02080(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        A2331Filter objRtnNotFound = new A2331Filter();
        long QTY_TF1 = 0, QTY_MF1 = 0, QTY_PF1 = 0, QTY_TF2 = 0, QTY_MF2 = 0, QTY_PF2 = 0, QTY_SE = 0, QTY_PE = 0;
        double AMOUNT_TF1 = 0, AMOUNT_MF1 = 0, AMOUNT_PF1 = 0, AMOUNT_TF2 = 0, AMOUNT_MF2 = 0, AMOUNT_PF2 = 0, AMOUNT_SE = 0, AMOUNT_PE = 0;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPSUMPROV(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.SENTDATE.trim());
            cstmt.setString(4, filter.IN_COUNTRY.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();
           
            if (rs01.next()) {
                QTY_TF1 = rs01.getLong("QTY_TF1");
                QTY_MF1 = rs01.getLong("QTY_MF1");
                QTY_PF1 = QTY_TF1 - QTY_MF1;
                QTY_TF2 = rs01.getLong("QTY_TF2");
                QTY_MF2 = rs01.getLong("QTY_MF2");
                QTY_PF2 = QTY_TF2 - QTY_MF2;
                QTY_SE = rs01.getLong("QTY_SE");
                QTY_PE = rs01.getLong("QTY_PE");
                AMOUNT_TF1 = rs01.getDouble("AMOUNT_TF1");
                AMOUNT_MF1 = rs01.getDouble("AMOUNT_MF1");
                AMOUNT_PF1 = AMOUNT_TF1 - AMOUNT_MF1;
                AMOUNT_TF2 = rs01.getDouble("AMOUNT_TF2");
                AMOUNT_MF2 = rs01.getDouble("AMOUNT_MF2");
                AMOUNT_PF2 = AMOUNT_TF2 - AMOUNT_MF2;
                AMOUNT_SE = rs01.getDouble("AMOUNT_SE");
                AMOUNT_PE = rs01.getDouble("AMOUNT_PE");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.SENTDATE = filter.SENTDATE;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.IN_TDOC = filter.IN_TDOC;

                    objRtn.VALDATE = rs01.getString("VALDATE").trim();
                    objRtn.QTY_TF1 = rs01.getLong("QTY_TF1");
                    objRtn.QTY_MF1 = rs01.getLong("QTY_MF1");
                    objRtn.QTY_PF1 = objRtn.QTY_TF1 - objRtn.QTY_MF1;
                    objRtn.QTY_TF2 = rs01.getLong("QTY_TF2");
                    objRtn.QTY_MF2 = rs01.getLong("QTY_MF2");
                    objRtn.QTY_PF2 = objRtn.QTY_TF2 - objRtn.QTY_MF2;
                    objRtn.QTY_SE = rs01.getLong("QTY_SE");
                    objRtn.QTY_PE = rs01.getLong("QTY_PE");
                    
                    objRtn.QTY_PR = objRtn.QTY_PF1 + objRtn.QTY_PF2 + objRtn.QTY_PE;

                    objRtn.AMOUNT_TF1 = rs01.getDouble("AMOUNT_TF1");
                    objRtn.AMOUNT_MF1 = rs01.getDouble("AMOUNT_MF1");
                    objRtn.AMOUNT_PF1 = objRtn.AMOUNT_TF1 - objRtn.AMOUNT_MF1;
                    objRtn.AMOUNT_TF2 = rs01.getDouble("AMOUNT_TF2");
                    objRtn.AMOUNT_MF2 = rs01.getDouble("AMOUNT_MF2");
                    objRtn.AMOUNT_PF2 = objRtn.AMOUNT_TF2 - objRtn.AMOUNT_MF2;
                    objRtn.AMOUNT_SE = rs01.getDouble("AMOUNT_SE");
                    objRtn.AMOUNT_PE = rs01.getDouble("AMOUNT_PE");
                    
                    objRtn.AMOUNT_PR = objRtn.AMOUNT_PF1 + objRtn.AMOUNT_PF2 + objRtn.AMOUNT_PE;

                    objRtn.totQTY_TF1 = QTY_TF1;
                    objRtn.totQTY_MF1 = QTY_MF1;
                    objRtn.totQTY_PF1 = QTY_TF1 - QTY_MF1;
                    objRtn.totQTY_TF2 = QTY_TF2;
                    objRtn.totQTY_MF2 = QTY_MF2;
                    objRtn.totQTY_PF2 = QTY_TF2 - QTY_MF2;
                    objRtn.totQTY_SE = QTY_SE;
                    objRtn.totQTY_PE = QTY_PE;
                    
                    objRtn.totQTY_PR = objRtn.totQTY_PF1 + objRtn.totQTY_PF2 + objRtn.totQTY_PE;

                    objRtn.totAMOUNT_TF1 = AMOUNT_TF1;
                    objRtn.totAMOUNT_MF1 = AMOUNT_MF1;
                    objRtn.totAMOUNT_PF1 = AMOUNT_TF1 - AMOUNT_MF1;
                    objRtn.totAMOUNT_TF2 = AMOUNT_TF2;
                    objRtn.totAMOUNT_MF2 = AMOUNT_MF2;
                    objRtn.totAMOUNT_PF2 = AMOUNT_TF2 - AMOUNT_MF2;
                    objRtn.totAMOUNT_SE = AMOUNT_SE;
                    objRtn.totAMOUNT_PE = AMOUNT_PE;
                    
                    objRtn.totAMOUNT_PR = objRtn.totAMOUNT_PF1 + objRtn.totAMOUNT_PF2 + objRtn.totAMOUNT_PE;

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
