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
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import static net.miatech.praxis.dao.payments.LoadConciliationDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2309AFilter;
import net.miatech.praxis.spring.INF020;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jtorres
 */
public class BankReconciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public BankReconciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BankReconciliationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    //**************************************************************************
    //***************************** PX269 **************************************
    //**************************************************************************
    public List<A2290Filter> loadPX269SQP00698Main(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQSALES = 0, lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotQDIFF = 0, lngTotQPEND = 0, lngTotQTICKET = 0, lngTotQTMATCH = 0, lngTotQTMANUAL = 0, lngTotQTPEND = 0;
        long lngTotQTOTS2 = 0, lngTotQPOLI2 = 0, lngTotQTOTS3 = 0, lngTotQPOLI3 = 0;
        long lngTotQPOLIC = 0, lngTotQPOLIPE = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698Main(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_TDOC);
            cstmt.setString(5, filter.IN_COUNTRY);

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQPEND = rst.getLong("QPEND");
                lngTotQTICKET = rst.getLong("QTICKET");
                lngTotQTMATCH = rst.getLong("QTMATCH");
                lngTotQTMANUAL = rst.getLong("QTMANUAL");
                lngTotQTPEND = rst.getLong("QTPEND");
                lngTotQTOTS2 = rst.getLong("QTOTS2");
                lngTotQPOLI2 = rst.getLong("QPOLI2");
                lngTotQTOTS3 = rst.getLong("QTOTS3");
                lngTotQPOLI3 = rst.getLong("QPOLI3");
                lngTotQPOLIC = rst.getLong("QPOLIC");
                lngTotQPOLIPE = rst.getLong("QPOLIPE");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.IN_SDATE = rst.getString("DATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());

                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQMATCHPercent = (beanTkt.lngQSALES > 0) ? (beanTkt.lngQMATCH * 100.0) / beanTkt.lngQSALES : 0.00;
                    beanTkt.lngTotQMATCHPercent = (lngTotQSALES > 0) ? (lngTotQMATCH * 100.0) / lngTotQSALES : 0.00;
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQTICKET = rst.getLong("QTICKET");
                    beanTkt.lngQTMATCH = rst.getLong("QTMATCH");
                    beanTkt.lngQTMANUAL = rst.getLong("QTMANUAL");
                    beanTkt.lngQTPEND = rst.getLong("QTPEND");
                    beanTkt.lngQTOTS2 = rst.getLong("QTOTS2");
                    beanTkt.lngQPOLI2 = rst.getLong("QPOLI2");
                    beanTkt.lngQTOTS3 = rst.getLong("QTOTS3");
                    beanTkt.lngQPOLI3 = rst.getLong("QPOLI3");
                    beanTkt.lngQPOLIC = rst.getLong("QPOLIC");
                    beanTkt.lngQPOLIPE = rst.getLong("QPOLIPE");

                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQTICKET = lngTotQTICKET;
                    beanTkt.lngTotQTMATCH = lngTotQTMATCH;
                    beanTkt.lngTotQTMANUAL = lngTotQTMANUAL;
                    beanTkt.lngTotQTPEND = lngTotQTPEND;
                    beanTkt.lngTotQTOTS2 = lngTotQTOTS2;
                    beanTkt.lngTotQPOLI2 = lngTotQPOLI2;
                    beanTkt.lngTotQTOTS3 = lngTotQTOTS3;
                    beanTkt.lngTotQPOLI3 = lngTotQPOLI3;
                    beanTkt.lngTotQPOLIC = lngTotQPOLIC;
                    beanTkt.lngTotQPOLIPE = lngTotQPOLIPE;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX269SQP00698Country(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQSALES = 0, lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotQDIFF = 0, lngTotQPEND = 0, lngTotQTICKET = 0, lngTotQTMATCH = 0, lngTotQTMANUAL = 0, lngTotQTPEND = 0;
        long lngTotQTOTS2 = 0, lngTotQPOLI2 = 0, lngTotQTOTS3 = 0, lngTotQPOLI3 = 0;
        long lngTotQPOLIC = 0, lngTotQPOLIPE = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698Country(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE);
            cstmt.setString(3, filter.IN_TDOC);
            cstmt.setString(4, filter.IN_COUNTRY);

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
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQPEND = rst.getLong("QPEND");
                lngTotQTICKET = rst.getLong("QTICKET");
                lngTotQTMATCH = rst.getLong("QTMATCH");
                lngTotQTMANUAL = rst.getLong("QTMANUAL");
                lngTotQTPEND = rst.getLong("QTPEND");
                lngTotQTOTS2 = rst.getLong("QTOTS2");
                lngTotQPOLI2 = rst.getLong("QPOLI2");
                lngTotQTOTS3 = rst.getLong("QTOTS3");
                lngTotQPOLI3 = rst.getLong("QPOLI3");
                lngTotQPOLIC = rst.getLong("QPOLIC");
                lngTotQPOLIPE = rst.getLong("QPOLIPE");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.IN_SDATE);
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.NAME = rst.getString("NAME").trim();

                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQMATCHPercent = (beanTkt.lngQSALES > 0) ? (beanTkt.lngQMATCH * 100.0) / beanTkt.lngQSALES : 0.00;
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQTICKET = rst.getLong("QTICKET");
                    beanTkt.lngQTMATCH = rst.getLong("QTMATCH");
                    beanTkt.lngQTMANUAL = rst.getLong("QTMANUAL");
                    beanTkt.lngQTPEND = rst.getLong("QTPEND");
                    beanTkt.lngQTOTS2 = rst.getLong("QTOTS2");
                    beanTkt.lngQPOLI2 = rst.getLong("QPOLI2");
                    beanTkt.lngQTOTS3 = rst.getLong("QTOTS3");
                    beanTkt.lngQPOLI3 = rst.getLong("QPOLI3");
                    beanTkt.lngQPOLIC = rst.getLong("QPOLIC");
                    beanTkt.lngQPOLIPE = rst.getLong("QPOLIPE");

                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQTICKET = lngTotQTICKET;
                    beanTkt.lngTotQTMATCH = lngTotQTMATCH;
                    beanTkt.lngTotQTMANUAL = lngTotQTMANUAL;
                    beanTkt.lngTotQTPEND = lngTotQTPEND;
                    beanTkt.lngTotQTOTS2 = lngTotQTOTS2;
                    beanTkt.lngTotQPOLI2 = lngTotQPOLI2;
                    beanTkt.lngTotQTOTS3 = lngTotQTOTS3;
                    beanTkt.lngTotQPOLI3 = lngTotQPOLI3;
                    beanTkt.lngTotQPOLIC = lngTotQPOLIC;
                    beanTkt.lngTotQPOLIPE = lngTotQPOLIPE;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX269SQP00698Day(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQSALES = 0, lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotQDIFF = 0, lngTotQPEND = 0, lngTotQTICKET = 0, lngTotQTMATCH = 0, lngTotQTMANUAL = 0, lngTotQTPEND = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698Day(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE);
            cstmt.setString(3, filter.IN_TDOC);
            cstmt.setString(4, filter.IN_COUNTRY);

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
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQPEND = rst.getLong("QPEND");
                lngTotQTICKET = rst.getLong("QTICKET");
                lngTotQTMATCH = rst.getLong("QTMATCH");
                lngTotQTMANUAL = rst.getLong("QTMANUAL");
                lngTotQTPEND = rst.getLong("QTPEND");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
//                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
//                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                    beanTkt.NAME = rst.getString("NAME").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();

                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQMATCHPercent = (beanTkt.lngQSALES > 0) ? (beanTkt.lngQMATCH * 100.0) / beanTkt.lngQSALES : 0.00;
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQTICKET = rst.getLong("QTICKET");
                    beanTkt.lngQTMATCH = rst.getLong("QTMATCH");
                    beanTkt.lngQTMANUAL = rst.getLong("QTMANUAL");
                    beanTkt.lngQTPEND = rst.getLong("QTPEND");

                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQTICKET = lngTotQTICKET;
                    beanTkt.lngTotQTMATCH = lngTotQTMATCH;
                    beanTkt.lngTotQTMANUAL = lngTotQTMANUAL;
                    beanTkt.lngTotQTPEND = lngTotQTPEND;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX269SQP00698Detalle(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQTYTKT = 0, totSVFOP = 0;
        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        hmDescDocType.put("R", "Rfnd");
        hmDescDocType.put("C", "Chargebak");
        hmDescDocType.put("A", "Acredit");

        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Match");
        hmDescEstadosSTVAL.put("2", "Settlement w/o Paying");
        hmDescEstadosSTVAL.put("3", "Settlement w/o Sales");
        hmDescEstadosSTVAL.put("4", "Match with Difference");
        hmDescEstadosSTVAL.put("5", "Match Manual");
        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698Detalle(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_TDOC);
            cstmt.setString(6, filter.IN_COUNTRY);
            cstmt.setString(7, filter.IN_CARDN1.trim());
            cstmt.setString(8, filter.IN_CARDN2.trim());
            cstmt.setString(9, filter.IN_SCARDNCOR.trim());
            cstmt.setString(10, filter.IN_SAUTHOC.trim());
            cstmt.setString(11, filter.IN_STVAL.trim());
            cstmt.setString(12, filter.IN_NEGOC.trim());
            cstmt.setString(13, filter.IN_COMENT.trim());
            cstmt.setString(14, filter.IN_AGENCY.trim());
            cstmt.setString(15, filter.IN_strSVFOP.trim());

            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQTYTKT = rst.getLong("QTYTKT");
                totSVFOP = rst.getLong("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    if (hmDescEstadosSTVAL.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstadosSTVAL.get(rst.getString("STVAL").trim()).toString();
                    }
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.totSVFOP = totSVFOP;
                    beanTkt.lngQTYTKT = rst.getLong("QTYTKT");
                    beanTkt.lngTotQTYTKT = lngTotQTYTKT;
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.TRANC = rst.getString("TRANC").trim();
                    beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.STCON = rst.getString("STCON").trim();
                    if (hmDescSTCONL.containsKey(rst.getString("STCON").trim())) {
                        beanTkt.STCON = hmDescSTCONL.get(rst.getString("STCON").trim()).toString();
                    } else {
                        beanTkt.STCON = rst.getString("FREGLA").trim();
                    }
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.NEGOC = rst.getString("NEGOC").trim();
                    if (beanTkt.NEGOC.equals("1")) {
                        beanTkt.NEGOC = "PASAJES";
                    } else if (beanTkt.NEGOC.equals("2")) {
                        beanTkt.NEGOC = "CARGO";
                    } else if (beanTkt.NEGOC.equals("3")) {
                        beanTkt.NEGOC = "CORREO";
                    } else if (beanTkt.NEGOC.equals("S")) {
                        beanTkt.NEGOC = "STANDBY";
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX269SQP00698Ticket(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQTYTKT = 0, totSVFOP = 0;
        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Match");
        hmDescEstadosSTVAL.put("2", "Settlement w/o Paying");
        hmDescEstadosSTVAL.put("3", "Settlement w/o Sales");
        hmDescEstadosSTVAL.put("4", "Match with Difference");
        hmDescEstadosSTVAL.put("5", "Match Manual");
        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698Ticket(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE);
            cstmt.setString(3, filter.IN_TDOC);
            cstmt.setString(4, filter.IN_COUNTRY);
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_SCARDNCOR.trim());
            cstmt.setString(8, filter.SAUTHOC.trim());
            cstmt.setString(9, filter.DATEC.trim());
            cstmt.setString(10, filter.TRANC.trim());
            cstmt.setString(11, filter.PRDA.trim());
            cstmt.setString(12, filter.BANDOC.trim());

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
//                lngTotQTYTKT = rst.getLong("QTYTKT");
                totSVFOP = rst.getLong("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    if (hmDescEstadosSTVAL.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstadosSTVAL.get(rst.getString("STVAL").trim()).toString();
                    }
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.totSVFOP = totSVFOP;
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
                    beanTkt.SPNR = rst.getString("SPNR").trim();

                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.TRANC = rst.getString("TRANC").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public A2290Filter loadPX269SQP00833(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Settlement w/o Paying");
        hmDescEstados.put("3", "Settlement w/o Sales");
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.strTRNXCODE.trim());
            cstmt.setString(4, filter.strNUMREF.trim());
            cstmt.setString(5, filter.SCARDN.trim());
            cstmt.setString(6, filter.SAUTHOC.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {

                //GUARDANDO DATOS CLAVE ORIGINALES =============================
                beanTkt.origSDATE = rst.getString("SDATE").trim();
                beanTkt.origSCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.origTDOC = rst.getString("TDOC").trim();
                beanTkt.origCODEBANK = rst.getString("CODEBANK").trim();
                beanTkt.origSCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.origSCARDN = rst.getString("SCARDN").trim();
                beanTkt.origSAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.origSCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.origSVFOP = rst.getDouble("SVFOP");
                beanTkt.origSEQNUM = rst.getString("SEQNUM").trim();
                //==============================================================
                beanTkt.FADYEN = rst.getString("FADYEN").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.CBANK = rst.getString("CODEBANK").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                //beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                beanTkt.IN_CARDN1 = rst.getString("SCARDN").trim().substring(0, 6);
                beanTkt.IN_CARDN2 = rst.getString("SCARDN").trim().substring(rst.getString("SCARDN").trim().length() - 4);
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.strDescAFTE = rst.getString("DESMONEDA").trim();
                beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanTkt.strDescStatus = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                }
                beanTkt.MERCHN = rst.getString("MERCHN").trim();
                beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                beanTkt.strTRNXCODE = rst.getString("TRNXCODE").trim();
                beanTkt.strNUMREF = rst.getString("NUMREF").trim();
                beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                beanTkt.TIPOTAR = rst.getString("TIPOTAR").trim();
                beanTkt.strPEM = rst.getString("PEM").trim();
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.strDescripcion = rst.getString("DESAGENT").trim();
                beanTkt.SFLOAD = rst.getString("FLOAD").trim();
                beanTkt.SDATEL = rst.getString("LDATE").trim();
                beanTkt.CREJEC = rst.getString("REASONREJ").trim();
                beanTkt.strCREJEC = rst.getString("DESCREJ").trim();
                beanTkt.TDATE = rst.getString("TDATE").trim();
                beanTkt.DATEF = rst.getString("DATEF").trim();
                beanTkt.strSORIG = rst.getString("SORIG").trim();
                if (rst.getString("BDATEP").trim().length() == 6) {
                    beanTkt.BDATEP = Functions.FormatFecha(rst.getString("BDATEP").trim(), "yyMMdd", "yyyyMMdd");
                } else {
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                }
                beanTkt.lngQTYTKT = rst.getLong("QTYTKT");
                beanTkt.BAID = rst.getString("BAID").trim();
                beanTkt.FLOADE = rst.getString("FLOADE").trim();
                beanTkt.LDATEE = rst.getString("LDATEE").trim();
                beanTkt.STATUSC = rst.getString("STATUSC").trim();
                beanTkt.DATEC = rst.getString("DATEC").trim();
                beanTkt.STATT = rst.getString("STATT").trim();
                beanTkt.DATET = rst.getString("DATET").trim();

                beanTkt.strComment = rst.getString("MSJJ").trim();

                beanTkt.USCR = rst.getString("USCR").trim();
                beanTkt.FECR = rst.getString("FECR").trim();
                beanTkt.HOCR = rst.getString("HOCR").trim();
                beanTkt.USUP = rst.getString("USUP").trim();
                beanTkt.FEUP = rst.getString("FEUP").trim();
                beanTkt.HOUP = rst.getString("HOUP").trim();

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

        return beanTkt;
    }

    public A2290Filter loadPX269SQPXXX(A2290Filter filter) throws SQLException, Exception {

        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
//        hmDescEstados.put("6", "Forced Match");
//        hmDescEstados.put("7", "Compensation Match");
//        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "By Credit Card");
        hmDescReglas.put("2", "By Authoc");
        hmDescReglas.put("3", "By PNR");
        hmDescReglas.put("4", "By Terminal Zeros");

        HashMap<String, String> hmDescFCOMPL = new HashMap<String, String>();
        hmDescFCOMPL.put("", "");
        hmDescFCOMPL.put("1", "PLUSGRADE");
        hmDescFCOMPL.put("2", "LIGAS");
        hmDescFCOMPL.put("3", "TABLET");
        hmDescFCOMPL.put("4", "BPO");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("D", "Debits");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");
        //loadPX269SQP00833
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TDOC.trim());
            cstmt01.setString(3, filter.SDATE.trim());
            cstmt01.setString(4, filter.SCOUNTRY.trim());
            cstmt01.setString(5, filter.SPNR.trim());
            cstmt01.setString(6, filter.SCURRENCY.trim());
            cstmt01.setString(7, filter.SCARCOD.trim());
            cstmt01.setString(8, filter.SCARDN.trim());
            cstmt01.setString(9, filter.SAUTHOC.trim());
            cstmt01.setString(10, filter.SAGENT.trim());
            cstmt01.setString(11, filter.TRANC.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.IN_TKT_ASIG = filter.IN_TKT_ASIG;
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.SAGENT = rs01.getString("SAGENT");
                objRtn.DESAGENT = objRtn.SAGENT + " - " + rs01.getString("DESAGENT");
                objRtn.SDATE = rs01.getString("SDATE");
                objRtn.TDOC = rs01.getString("TDOC");
                if (rs01.getString("TDOC").trim().equals("R")) {
                    objRtn.strPEM = "Refund";
                } else if( rs01.getString("TDOC").trim().equals("D")){
                    objRtn.strPEM = "Debits";
                } else {
                    objRtn.strPEM = "Sales";
                }
//                objRtn.descTDOC = hmDescTDOC.get(rs01.getString("TDOC").trim());
                objRtn.STVAL = rs01.getString("STVAL");
                if (hmDescEstados.containsKey(rs01.getString("STVAL").trim())) {
                    objRtn.descSTVAL = hmDescEstados.get(rs01.getString("STVAL").trim()).toString();
                } else {
                    objRtn.descSTVAL = rs01.getString("STVAL").trim();
                }
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY");
                objRtn.DESC_SCOUNTRY = objRtn.SCOUNTRY + " - " + rs01.getString("DESC_SCOUNTRY");
                objRtn.SPNR = rs01.getString("SPNR");
                objRtn.SCARCOD = rs01.getString("SCARCOD");
                objRtn.CODEBANK = rs01.getString("CODEBANK");
                objRtn.SCARDN = rs01.getString("SCARDN");
                objRtn.SAUTHOC = rs01.getString("SAUTHOC");
                objRtn.FREGLA = rs01.getString("FREGLA");
                objRtn.MERCHNC = rs01.getString("MERCHNC");
                objRtn.PRDA = rs01.getString("PRDA");
                objRtn.SDATEC = rs01.getString("SDATEC");
                objRtn.PAYDATE = rs01.getString("PAYDATE");
                objRtn.DATEC = rs01.getString("DATEC");
                objRtn.FSELEC = rs01.getString("FSELEC");
                objRtn.DEBTYPE = rs01.getString("DEBTYPE");
                
                
                if (hmDescReglas.containsKey(rs01.getString("FREGLA").trim())) {
                    objRtn.descFREGLA = hmDescReglas.get(rs01.getString("FREGLA").trim()).toString();
                } else {
                    objRtn.descFREGLA = rs01.getString("FREGLA").trim();
                }

                objRtn.SVFOP = rs01.getDouble("SVFOP");
                objRtn.SVFOPC = rs01.getDouble("SVFOPC");
                objRtn.SVFOPD = rs01.getDouble("SVFOPD");
                objRtn.FAREO = rs01.getDouble("FAREO");
                objRtn.FAREC = rs01.getDouble("FAREC");
                objRtn.DIFF_FARE = rs01.getDouble("FAREDIFFC"); //CAMBIO SOLICITADO PARA UTILIZAR CAMPO EN LA BD
                //objRtn.DIFF_FARE = objRtn.FAREO - objRtn.FAREC;

                objRtn.COMMAMO = rs01.getDouble("COMMAMO");
                objRtn.COMMAMOC = rs01.getDouble("COMMAMOC");
                objRtn.DIFF_COMMAMO = rs01.getDouble("COMMDIFFC"); //CAMBIO SOLICITADO PARA UTILIZAR CAMPO EN LA BD

                objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                objRtn.CERROR = rs01.getString("CERROR").trim();
                objRtn.DES_CERROR = rs01.getString("DES_CERROR").trim();
                objRtn.CERROIN = rs01.getString("CERROIN").trim();
                objRtn.DES_CERROIN = rs01.getString("DES_CERROIN").trim();
                objRtn.QTYTKT = rs01.getInt("QTYTKT");

                objRtn.COMMFAREC = rs01.getDouble("COMMFAREC");
                objRtn.TOTAL_ADM = rs01.getDouble("ADMTOTAL");

                objRtn.BANDOC = rs01.getString("BANDOC");
                objRtn.DATEC = rs01.getString("DATEC").trim();
                objRtn.TRANC = rs01.getString("TRANC").trim();

                objRtn.IVA = rs01.getDouble("IVA");
                objRtn.PROPINA = rs01.getDouble("PROPINA");
                objRtn.COMISION = rs01.getDouble("COMISION");
                objRtn.BASEFUE = rs01.getDouble("BASEFUE");
                objRtn.RTEFUE = rs01.getDouble("RTEFUE");
                objRtn.RTEIVA = rs01.getDouble("RTEIVA");
                objRtn.BASICA = rs01.getDouble("BASICA");
                objRtn.RTEICA = rs01.getDouble("RTEICA");
                objRtn.NETO = rs01.getDouble("NETO");

                objRtn.IVAC = rs01.getDouble("IVAC");
                objRtn.PROPINAC = rs01.getDouble("PROPINAC");
                objRtn.COMISIOC = rs01.getDouble("COMISIOC");
                objRtn.BASEFUEC = rs01.getDouble("BASEFUEC");
                objRtn.RTEFUEC = rs01.getDouble("RTEFUEC");
                objRtn.RTEIVAC = rs01.getDouble("RTEIVAC");
                objRtn.BASICAC = rs01.getDouble("BASICAC");
                objRtn.RTEICAC = rs01.getDouble("RTEICAC");
                objRtn.NETOC = rs01.getDouble("NETOC");
                objRtn.STCON = rs01.getString("STCON").trim();
                if (hmDescSTCONL.containsKey(rs01.getString("STCON").trim())) {
                    objRtn.STCON = hmDescSTCONL.get(rs01.getString("STCON").trim()).toString();
                } else {
                    objRtn.STCON = rs01.getString("FREGLA").trim();
                }
                objRtn.FCONT = rs01.getString("FCONT").trim();

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

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

        return objRtn;
    }

    public String loadPX269SQP00834(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF101(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "U");
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.PRDA.trim());
            cstmt.setString(4, filter.SDATE.trim());
            cstmt.setString(5, filter.SCARDNM.trim());
            cstmt.setString(6, filter.SAUTHOCM.trim());
            cstmt.setString(7, filter.DATEC.trim());
            cstmt.setString(8, filter.TRANC.trim());
            cstmt.setDouble(9, filter.VFOP);
            cstmt.setString(10, filter.CERROR);
            cstmt.setString(11, filter.CERROIN.trim());
            cstmt.setInt(12, filters.size());
            cstmt.setString(13, user.getUserInfo().USR);
            cstmt.setString(14, Functions.getFechaActual());
            cstmt.setString(15, Functions.getHoraActual());
            cstmt.setString(16, filter.strComment.toUpperCase());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF100(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, "U");
                cstmt2.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(3, filterC.PRDA.trim());
                cstmt2.setString(4, filterC.SCARDN.trim());
                cstmt2.setString(5, filterC.SAUTHOC.trim());
                cstmt2.setDouble(6, filterC.VFOP);
                cstmt2.setString(7, filterC.SDATE.trim());
                cstmt2.setString(8, filterC.DATEC.trim());
                cstmt2.setString(9, filterC.TICKET.trim());
                cstmt2.setString(10, filterC.TRANC.trim());
                cstmt2.setString(11, filterC.BANDOC.trim());
                cstmt2.setString(12, filterC.CERROR.trim());
                cstmt2.setString(13, user.getUserInfo().USR);
                cstmt2.setString(14, Functions.getFechaActual());
                cstmt2.setString(15, Functions.getHoraActual());
                cstmt2.setString(16, filter.strComment.toUpperCase());

                cstmt2.execute();
                cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
            }

            A2290Filter filterA = filters.get(filters.size() - 1);

            if (filterA.ATDOC.equals("A")) {
                String SQLCLL03 = "{CALL " + session.getMainLibrary() + ".SQP00834INSERTMPF100(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

                cnx3 = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3.setString(1, "U");
                cstmt3.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt3.setString(3, filterA.ASTVAL.trim());
                cstmt3.setString(4, filterA.ATDOC.trim());
                cstmt3.setString(5, filterA.ASCARCOD.trim());
                cstmt3.setString(6, filterA.ASCARDN.trim());
                cstmt3.setString(7, filterA.ASAUTHOC);
                cstmt3.setString(8, filterA.ACURRENCY.trim());
                cstmt3.setDouble(9, filterA.AAMOUNT);
                cstmt3.setString(10, filterA.ASDATE.trim());
                cstmt3.setString(11, filterA.ADATEC.trim());
                cstmt3.setString(12, filterA.APNR.trim());
                cstmt3.setString(13, filterA.ATICKET.substring(0, 3).trim());
                cstmt3.setString(14, filterA.ATICKET.substring(3, 7).trim());
                cstmt3.setString(15, filterA.ATICKET.substring(7, 13).trim());
                cstmt3.setString(16, filterA.ASAGENT.trim());
                cstmt3.setString(17, filterA.ATRANC.trim());
                cstmt3.setString(18, filterA.ADJCODE.trim());
                cstmt3.setString(19, filterA.BANDOC.trim());
                cstmt3.setString(20, filterA.CFUENTE.trim());
                cstmt3.setString(21, user.getUserInfo().USR);
                cstmt3.setString(22, Functions.getFechaActual());
                cstmt3.setString(23, Functions.getHoraActual());

                cstmt3.execute();
                cstmt3.close(); // Cerrar el CallableStatement después de cada ejecución

            } else {
                //NADA
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    cstmt2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return strMsj;
    }

    public String loadPX269SQP00834_REFND(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF101_REFND(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "U");
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.PRDA.trim());
            cstmt.setString(4, filter.SDATE.trim());
            cstmt.setString(5, filter.SCARDNM.trim());
            cstmt.setString(6, filter.SAUTHOCM.trim());
            cstmt.setString(7, filter.DATEC.trim());
            cstmt.setString(8, filter.TRANC.trim());
            cstmt.setDouble(9, filter.VFOP);
            cstmt.setString(10, filter.CERROR);
            cstmt.setString(11, filter.CERROIN.trim());
            cstmt.setInt(12, filters.size());
            cstmt.setString(13, user.getUserInfo().USR);
            cstmt.setString(14, Functions.getFechaActual());
            cstmt.setString(15, Functions.getHoraActual());
            cstmt.setString(16, filter.strComment.toUpperCase());
            cstmt.setString(17, filter.TDOC.trim());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF100_REFND(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, "U");
                cstmt2.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(3, filterC.PRDA.trim());
                cstmt2.setString(4, filterC.SCARDN.trim());
                cstmt2.setString(5, filterC.SAUTHOC.trim());
                cstmt2.setDouble(6, filterC.VFOP);
                cstmt2.setString(7, filterC.SDATE.trim());
                cstmt2.setString(8, filterC.DATEC.trim());
                cstmt2.setString(9, filterC.TICKET.trim());
                cstmt2.setString(10, filterC.TRANC.trim());
                cstmt2.setString(11, filterC.BANDOC.trim());
                cstmt2.setString(12, filterC.CERROR.trim());
                cstmt2.setString(13, user.getUserInfo().USR);
                cstmt2.setString(14, Functions.getFechaActual());
                cstmt2.setString(15, Functions.getHoraActual());
                cstmt2.setString(16, filter.strComment.toUpperCase());

                cstmt2.execute();
                cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
            }

            A2290Filter filterA = filters.get(filters.size() - 1);

            if (filterA.ATDOC.equals("A")) {
                String SQLCLL03 = "{CALL " + session.getMainLibrary() + ".SQP00834INSERTMPF100(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

                cnx3 = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3.setString(1, "U");
                cstmt3.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt3.setString(3, filterA.ASTVAL.trim());
                cstmt3.setString(4, filterA.ATDOC.trim());
                cstmt3.setString(5, filterA.ASCARCOD.trim());
                cstmt3.setString(6, filterA.ASCARDN.trim());
                cstmt3.setString(7, filterA.ASAUTHOC);
                cstmt3.setString(8, filterA.ACURRENCY.trim());
                cstmt3.setDouble(9, filterA.AAMOUNT);
                cstmt3.setString(10, filterA.ASDATE.trim());
                cstmt3.setString(11, filterA.ADATEC.trim());
                cstmt3.setString(12, filterA.APNR.trim());
                cstmt3.setString(13, filterA.ATICKET.substring(0, 3).trim());
                cstmt3.setString(14, filterA.ATICKET.substring(3, 7).trim());
                cstmt3.setString(15, filterA.ATICKET.substring(7, 13).trim());
                cstmt3.setString(16, filterA.ASAGENT.trim());
                cstmt3.setString(17, filterA.ATRANC.trim());
                cstmt3.setString(18, filterA.ADJCODE.trim());
                cstmt3.setString(19, filterA.BANDOC.trim());
                cstmt3.setString(20, filterA.CFUENTE.trim());
                cstmt3.setString(21, user.getUserInfo().USR);
                cstmt3.setString(22, Functions.getFechaActual());
                cstmt3.setString(23, Functions.getHoraActual());

                cstmt3.execute();
                cstmt3.close(); // Cerrar el CallableStatement después de cada ejecución

            } else {
                //NADA
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    cstmt2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return strMsj;
    }
    
    public String loadPX269SQP00834_CHGBAK(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF101_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "U");
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.PRDA.trim());
            cstmt.setString(4, filter.SDATE.trim());
            cstmt.setString(5, filter.SCARDNM.trim());
            cstmt.setString(6, filter.SAUTHOCM.trim());
            cstmt.setString(7, filter.DATEC.trim());
            cstmt.setString(8, filter.TRANC.trim());
            cstmt.setDouble(9, filter.VFOP);
            cstmt.setString(10, filter.CERROR);
            cstmt.setString(11, filter.CERROIN.trim());
            cstmt.setInt(12, filters.size());
            cstmt.setString(13, user.getUserInfo().USR);
            cstmt.setString(14, Functions.getFechaActual());
            cstmt.setString(15, Functions.getHoraActual());
            cstmt.setString(16, filter.strComment.toUpperCase());
            cstmt.setString(17, filter.TDOC.trim());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF100_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, "U");
                cstmt2.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(3, filterC.PRDA.trim());
                cstmt2.setString(4, filterC.SCARDN.trim());
                cstmt2.setString(5, filterC.SAUTHOC.trim());
                cstmt2.setDouble(6, filterC.VFOP);
                cstmt2.setString(7, filterC.SDATE.trim());
                cstmt2.setString(8, filterC.DATEC.trim());
                cstmt2.setString(9, filterC.TICKET.trim());
                cstmt2.setString(10, filterC.TRANC.trim());
                cstmt2.setString(11, filterC.BANDOC.trim());
                cstmt2.setString(12, filterC.CERROR.trim());
                cstmt2.setString(13, user.getUserInfo().USR);
                cstmt2.setString(14, Functions.getFechaActual());
                cstmt2.setString(15, Functions.getHoraActual());
                cstmt2.setString(16, filter.strComment.toUpperCase());
                cstmt2.setString(17, filterC.MPF076TRAN.trim());
                cstmt2.setString(18, filterC.SPNR.trim());
                

                cstmt2.execute();
                cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
            }

            A2290Filter filterA = filters.get(filters.size() - 1);

            if (filterA.ATDOC.equals("A")) {
                String SQLCLL03 = "{CALL " + session.getMainLibrary() + ".SQP00834INSERTMPF100_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

                cnx3 = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3.setString(1, "U");
                cstmt3.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt3.setString(3, filterA.ASTVAL.trim());
                cstmt3.setString(4, filterA.ATDOC.trim());
                cstmt3.setString(5, filterA.ASCARCOD.trim());
                cstmt3.setString(6, filterA.ASCARDN.trim());
                cstmt3.setString(7, filterA.ASAUTHOC);
                cstmt3.setString(8, filterA.ACURRENCY.trim());
                cstmt3.setDouble(9, filterA.AAMOUNT);
                cstmt3.setString(10, filterA.ASDATE.trim());
                cstmt3.setString(11, filterA.ADATEC.trim());
                cstmt3.setString(12, filterA.APNR.trim());
                cstmt3.setString(13, filterA.ATICKET.substring(0, 3).trim());
                cstmt3.setString(14, filterA.ATICKET.substring(3, 7).trim());
                cstmt3.setString(15, filterA.ATICKET.substring(7, 13).trim());
                cstmt3.setString(16, filterA.ASAGENT.trim());
                cstmt3.setString(17, filterA.ATRANC.trim());
                cstmt3.setString(18, filterA.ADJCODE.trim());
                cstmt3.setString(19, filterA.BANDOC.trim());
                cstmt3.setString(20, filterA.CFUENTE.trim());
                cstmt3.setString(21, user.getUserInfo().USR);
                cstmt3.setString(22, Functions.getFechaActual());
                cstmt3.setString(23, Functions.getHoraActual());

                cstmt3.execute();
                cstmt3.close(); // Cerrar el CallableStatement después de cada ejecución

            } else {
                //NADA
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    cstmt2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return strMsj;
    }
    
    public String loadPX269SQP00834_ACREDIT(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF101_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "U");
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.PRDA.trim());
            cstmt.setString(4, filter.SDATE.trim());
            cstmt.setString(5, filter.SCARDNM.trim());
            cstmt.setString(6, filter.SAUTHOCM.trim());
            cstmt.setString(7, filter.DATEC.trim());
            cstmt.setString(8, filter.TRANC.trim());
            cstmt.setDouble(9, filter.VFOP);
            cstmt.setString(10, filter.CERROR);
            cstmt.setString(11, filter.CERROIN.trim());
            cstmt.setInt(12, filters.size());
            cstmt.setString(13, user.getUserInfo().USR);
            cstmt.setString(14, Functions.getFechaActual());
            cstmt.setString(15, Functions.getHoraActual());
            cstmt.setString(16, filter.strComment.toUpperCase());
            cstmt.setString(17, filter.TDOC.trim());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF100_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, "U");
                cstmt2.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(3, filterC.PRDA.trim());
                cstmt2.setString(4, filterC.SCARDN.trim());
                cstmt2.setString(5, filterC.SAUTHOC.trim());
                cstmt2.setDouble(6, filterC.VFOP);
                cstmt2.setString(7, filterC.SDATE.trim());
                cstmt2.setString(8, filterC.DATEC.trim());
                cstmt2.setString(9, filterC.TICKET.trim());
                cstmt2.setString(10, filterC.TRANC.trim());
                cstmt2.setString(11, filterC.BANDOC.trim());
                cstmt2.setString(12, filterC.CERROR.trim());
                cstmt2.setString(13, user.getUserInfo().USR);
                cstmt2.setString(14, Functions.getFechaActual());
                cstmt2.setString(15, Functions.getHoraActual());
                cstmt2.setString(16, filter.strComment.toUpperCase());
                cstmt2.setString(17, filterC.MPF077TRAN.trim());
                cstmt2.setString(18, filterC.SPNR.trim());
                

                cstmt2.execute();
                cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
            }

            A2290Filter filterA = filters.get(filters.size() - 1);

            if (filterA.ATDOC.equals("A")) {
                String SQLCLL03 = "{CALL " + session.getMainLibrary() + ".SQP00834INSERTMPF100_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

                cnx3 = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3.setString(1, "U");
                cstmt3.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt3.setString(3, filterA.ASTVAL.trim());
                cstmt3.setString(4, filterA.ATDOC.trim());
                cstmt3.setString(5, filterA.ASCARCOD.trim());
                cstmt3.setString(6, filterA.ASCARDN.trim());
                cstmt3.setString(7, filterA.ASAUTHOC);
                cstmt3.setString(8, filterA.ACURRENCY.trim());
                cstmt3.setDouble(9, filterA.AAMOUNT);
                cstmt3.setString(10, filterA.ASDATE.trim());
                cstmt3.setString(11, filterA.ADATEC.trim());
                cstmt3.setString(12, filterA.APNR.trim());
                cstmt3.setString(13, filterA.ATICKET.substring(0, 3).trim());
                cstmt3.setString(14, filterA.ATICKET.substring(3, 7).trim());
                cstmt3.setString(15, filterA.ATICKET.substring(7, 13).trim());
                cstmt3.setString(16, filterA.ASAGENT.trim());
                cstmt3.setString(17, filterA.ATRANC.trim());
                cstmt3.setString(18, filterA.ADJCODE.trim());
                cstmt3.setString(19, filterA.BANDOC.trim());
                cstmt3.setString(20, filterA.CFUENTE.trim());
                cstmt3.setString(21, user.getUserInfo().USR);
                cstmt3.setString(22, Functions.getFechaActual());
                cstmt3.setString(23, Functions.getHoraActual());

                cstmt3.execute();
                cstmt3.close(); // Cerrar el CallableStatement después de cada ejecución

            } else {
                //NADA
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    cstmt2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return strMsj;
    }
    
    public String loadPX269SQP05117(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        Connection cnx = null;
        Connection cnx2 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF101(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "R");
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.PRDA.trim());
            cstmt.setString(4, filter.SDATE.trim());
            cstmt.setString(5, filter.DATEC.trim());
            cstmt.setString(6, filter.TRANC.trim());
            cstmt.setDouble(7, filter.VFOP);
            cstmt.setString(8, filter.SAUTHOCM.trim());
            cstmt.setString(9, filter.SCARDNM.trim());
            cstmt.setString(10, filter.CERROR);
            cstmt.setInt(11, filters.size());
            cstmt.setString(12, user.getUserInfo().USR);
            cstmt.setString(13, Functions.getFechaActual());
            cstmt.setString(14, Functions.getHoraActual());
            cstmt.setString(15, filter.strComment.toUpperCase());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF100(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, "R");
                cstmt2.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(3, filterC.PRDA.trim());
                cstmt2.setString(4, filterC.SCARDN.trim());
                cstmt2.setString(5, filterC.SAUTHOC.trim());
                cstmt2.setDouble(6, filterC.VFOP);
                cstmt2.setString(7, filterC.SDATE.trim());
                cstmt2.setString(8, filterC.DATEC.trim());
                cstmt2.setString(9, filterC.TICKET.trim());
                cstmt2.setString(10, filterC.TRANC.trim());
                cstmt2.setString(11, filterC.BANDOC.trim());
                cstmt2.setString(12, filter.CERROR);
                cstmt2.setString(13, user.getUserInfo().USR);
                cstmt2.setString(14, Functions.getFechaActual());
                cstmt2.setString(15, Functions.getHoraActual());
                cstmt2.setString(16, filter.strComment.toUpperCase());

                cstmt2.execute();
                cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    cstmt2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return strMsj;
    }

    public String loadPX269SQP05117OnlyLiq(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF101(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "R");
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.PRDA.trim());
            cstmt.setString(4, filter.SDATE.trim());
            cstmt.setString(5, filter.DATEC.trim());
            cstmt.setString(6, filter.TRANC.trim());
            cstmt.setDouble(7, filter.VFOP);
            cstmt.setString(8, filter.SAUTHOCM.trim());
            cstmt.setString(9, filter.SCARDNM.trim());
            cstmt.setString(10, filter.CERROR);
            cstmt.setInt(11, filters.size());
            cstmt.setString(12, user.getUserInfo().USR);
            cstmt.setString(13, Functions.getFechaActual());
            cstmt.setString(14, Functions.getHoraActual());
            cstmt.setString(15, filter.strComment.toUpperCase());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

        } catch (Exception e) {
            e.printStackTrace();
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

        return strMsj;
    }

    public List<A2290Filter> loadPX269SQP00869(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0;
        String estado = "", strTitulo = "";
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");
        hmDescEstados.put("P", "Paying w/o Sales");
        hmDescEstados.put("C", "Clarifications");
        hmDescEstados.put("H", "Chargebacks");

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00869(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_BANK.trim());
            cstmt.setString(14, filter.IN_COUNTRY.trim());
            cstmt.setString(15, filter.IN_FTE.trim());
            cstmt.setString(16, filter.IN_ADYEN.trim());

            cstmt.setInt(17, filter.page.PAGNUM);
            cstmt.setInt(18, filter.page.PAGROW);
            cstmt.setInt(19, filter.page.TOTPAG);
            cstmt.setInt(20, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(17);
            filter.page.PAGROW = cstmt.getInt(18);
            filter.page.TOTPAG = cstmt.getInt(19);
            filter.page.TOTROW = cstmt.getInt(20);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.SCARCOD = rst.getString("CARD").trim();
                    /*if (hmDescCard.containsKey(rst.getString("CARD").trim().toUpperCase())) {
                     beanTkt.strDescCard = hmDescCard.get(rst.getString("CARD").trim()).toString();
                     }*/
                    beanTkt.NAMEBANK = rst.getString("NAMEBANK").trim();
                    beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAME").trim();
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();
                    beanTkt.SORIG = rst.getString("SORIG").trim();

                    if (hmDescOrigen.containsKey(rst.getString("SORIG").trim())) {
                        beanTkt.strSORIG = hmDescOrigen.get(rst.getString("SORIG").trim());
                    } else {
                        beanTkt.strSORIG = rst.getString("SORIG").trim();
                    }

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblSVFOP;

                    if (!filter.IN_BSTVAL.trim().equals("")) {
                        estado = hmDescEstados.get(beanTkt.IN_BSTVAL).toString();
                    }

                    if (filter.IN_STVAL.trim().equals("1")) {
                        estado = "Match";
                    } else if (filter.IN_STVAL.trim().equals("2")) {
                        estado = "Settlement w/o Paying";
                    } else if (filter.IN_STVAL.trim().equals("3")) {
                        estado = "Settlement w/o Sales";
                    } else if (filter.IN_STVAL.trim().equals("4")) {
                        estado = "Match with Difference";
                    } else if (filter.IN_STVAL.trim().equals("5")) {
                        estado = "Match Manual";
                    }

                    if (filter.strFecFiltro.trim().equals("BDATEP")) {
                        strTitulo = "Conciliaton Date : ";
                    } else if (filter.IN_TDOC.trim().equals("R")) {
                        strTitulo = "Refund Date : ";
                    } else {
                        strTitulo = "Sales Date : ";
                    }
                    strTitulo += beanTkt.strFormatDate + " *** " + estado + " ***";
                    beanTkt.strTitulo = strTitulo;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX269SQP00870(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0;
        String strTitulo = "";

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00870(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.SORIG.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());
            cstmt.setString(13, filter.IN_AGENT.trim());
            cstmt.setString(14, filter.IN_BANK.trim());
            cstmt.setString(15, filter.SCOUNTRY.trim());
            cstmt.setString(16, filter.IN_FTE.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());
            cstmt.setString(18, filter.IN_CODEBANK.trim());

            cstmt.setInt(19, filter.page.PAGNUM);
            cstmt.setInt(20, filter.page.PAGROW);
            cstmt.setInt(21, filter.page.TOTPAG);
            cstmt.setInt(22, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(19);
            filter.page.PAGROW = cstmt.getInt(20);
            filter.page.TOTPAG = cstmt.getInt(21);
            filter.page.TOTROW = cstmt.getInt(22);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.strSORIG = filter.strSORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblSVFOP;
                    strTitulo = filter.strTitulo;
                    if (!beanTkt.SCOUNTRY.trim().isEmpty()) {
                        strTitulo += " - Country : " + beanTkt.SCOUNTRY + " : " + filter.strDescCountry.trim();
                    }
                    strTitulo = strTitulo + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " - Bank Code : " + beanTkt.CODEBANK;
                    beanTkt.strTitulo = strTitulo;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX269SQP00871(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0, lngQTYTKT = 0;
        double dblSVFOP = 0;
        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");

        String estado = "", strTitulo = "";
        HashMap<String, String> hmDescEstadosTit = new HashMap<String, String>();
        hmDescEstadosTit.put("1", "Accepted");
        hmDescEstadosTit.put("2", "Rejected");
        hmDescEstadosTit.put("3", "Suspect");
        hmDescEstadosTit.put("P", "Paying w/o Sales");
        hmDescEstadosTit.put("C", "Clarifications");
        hmDescEstadosTit.put("H", "Chargebacks");

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00871(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.SORIG.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());
            cstmt.setString(13, filter.IN_AGENT.trim());
            cstmt.setString(14, filter.IN_BANK.trim());
            cstmt.setString(15, filter.SCOUNTRY.trim());
            cstmt.setString(16, filter.IN_FTE.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());
            cstmt.setString(18, filter.IN_CODEBANK.trim());

            cstmt.setInt(19, filter.page.PAGNUM);
            cstmt.setInt(20, filter.page.PAGROW);
            cstmt.setInt(21, filter.page.TOTPAG);
            cstmt.setInt(22, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(19);
            filter.page.PAGROW = cstmt.getInt(20);
            filter.page.TOTPAG = cstmt.getInt(21);
            filter.page.TOTROW = cstmt.getInt(22);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                lngQTYTKT += rst.getLong("QTYTKT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    beanTkt.FCONC = rst.getString("FCONC").trim();

                    if (beanTkt.IN_ADYEN.equals("Y") && (beanTkt.IN_STVAL.equals("2") || beanTkt.IN_STVAL.equals("3"))) {
                        beanTkt.strCampo = "assets/icons/16x16/Change.png";
                    } else {
                        beanTkt.strCampo = "assets/icons/16x16/1326498593_018.png";
                    }

                    beanTkt.FTE = rst.getString("FTE").trim();
                    if (rst.getString("FTE").trim().equals("S")) {
                        beanTkt.strDescFTE = "ASR";
                    } else if (rst.getString("FTE").trim().equals("A")) {
                        beanTkt.strDescFTE = "ARC";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        beanTkt.strDescFTE = "BSP";
                    } else {
                        beanTkt.strDescFTE = rst.getString("FTE").trim();
                    }
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.TRANC = rst.getString("TRANC").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    beanTkt.NUMREF = rst.getString("NUMREF").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.strDescripcion = rst.getString("DESCAGT").trim();
                    beanTkt.strTRNXCODE = rst.getString("TRNXCODE").trim();
                    beanTkt.strPEM = rst.getString("PEM").trim();
                    if (beanTkt.strPEM.trim().equals("01")) {
                        beanTkt.strPEM = "Manual";
                    } else if (beanTkt.strPEM.trim().equals("05")) {
                        beanTkt.strPEM = "Chip EMV";
                    } else if (beanTkt.strPEM.trim().equals("80")) {
                        beanTkt.strPEM = "Fallback";
                    } else if (beanTkt.strPEM.trim().equals("90")) {
                        beanTkt.strPEM = "Deslizada";
                    }
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.TDATE = rst.getString("TDATE").trim();
                    beanTkt.DATEF = rst.getString("DATEF").trim();
                    if (rst.getString("BDATEP").trim().length() == 6) {
                        beanTkt.BDATEP = Functions.FormatFecha(rst.getString("BDATEP").trim(), "yyMMdd", "yyyyMMdd");
                    } else {
                        beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    }
                    if (hmDescEstados.containsKey(rst.getString("BSTVAL").trim().toUpperCase())) {
                        beanTkt.BSTVAL = hmDescEstados.get(rst.getString("BSTVAL").trim()).toString();
                    } else {
                        beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    }
                    beanTkt.lngQTYTKT = rst.getLong("QTYTKT");

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.strNUMREF = rst.getString("NUMREF").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.strFLOAD = rst.getString("FLOAD").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    if (beanTkt.strFLOAD.trim().equals("M")) {
                        beanTkt.strFLOAD = "Manual";
                    }
                    beanTkt.SDATEL = rst.getString("LDATE").trim();
                    beanTkt.strSORIG = rst.getString("SORIG").trim();

                    if (hmDescOrigen.containsKey(rst.getString("SORIG").trim())) {
                        beanTkt.strSORIG = hmDescOrigen.get(rst.getString("SORIG").trim());
                    } else {
                        beanTkt.strSORIG = rst.getString("SORIG").trim();
                    }

                    beanTkt.BAID = rst.getString("BAID").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    if (rst.getString("FLAGC").trim().equals("C")) {
                        beanTkt.FLAGC = "Match";
                    }/* else {
                     beanTkt.FLAGC = "Paying w/o Sales";
                     }*/

                    //**********************************************************
                    if (!filter.IN_BSTVAL.trim().equals("")) {
                        estado = hmDescEstadosTit.get(beanTkt.IN_BSTVAL).toString();
                    }

                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    if (!rst.getString("DATEC").trim().equals("")) {
                        beanTkt.strBankDeposit = rst.getString("DATEC").trim();
                    } else if (!beanTkt.BDATEP.trim().isEmpty()) {
                        beanTkt.strBankDeposit = String.valueOf(Functions.diferenciaDiasEntreSistema(beanTkt.BDATEP)) + " days";
                    }

                    if (filter.IN_STVAL.trim().equals("1")) {
                        estado = "Match";
                    } else if (filter.IN_STVAL.trim().equals("2")) {
                        estado = "Settlement w/o Paying";
                    } else if (filter.IN_STVAL.trim().equals("3")) {
                        estado = "Settlement w/o Sales";
                    } else if (filter.IN_STVAL.trim().equals("4")) {
                        estado = "Match with Differences";
                    } else if (filter.IN_STVAL.trim().equals("5")) {
                        estado = "Match Manual";
                    }

                    if (filter.strFecFiltro.trim().equals("BDATEP")) {
                        strTitulo = "Conciliaton Date : ";
                    } else if (filter.IN_TDOC.trim().equals("R")) {
                        strTitulo = "Refund Date : ";
                    } else {
                        strTitulo = "Sales Date : ";
                    }
                    strTitulo += beanTkt.SDATE + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " *** " + estado + " ***";
                    if (!beanTkt.SCOUNTRY.trim().isEmpty()) {
                        strTitulo += " - Country : " + beanTkt.SCOUNTRY + " : " + filter.strDescCountry.trim();
                    }
                    beanTkt.strTitulo = strTitulo;

                    beanTkt.FAREO = rst.getDouble("FAREO");
                    beanTkt.FAREC = rst.getDouble("FAREC");
                    beanTkt.DIFF_FARE = rst.getDouble("FAREDIFFC");

                    beanTkt.COMMAMO = rst.getDouble("COMMAMO");
                    beanTkt.COMMAMOC = rst.getDouble("COMMAMOC");
                    beanTkt.DIFF_COMMAMO = rst.getDouble("COMMDIFFC");
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.STCON = rst.getString("STCON").trim();
                    if (hmDescSTCONL.containsKey(rst.getString("STCON").trim())) {
                        beanTkt.STCON = hmDescSTCONL.get(rst.getString("STCON").trim()).toString();
                    } else {
                        beanTkt.STCON = rst.getString("FREGLA").trim();
                    }
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.NEGOC = rst.getString("NEGOC").trim();
                    if (beanTkt.NEGOC.equals("1")) {
                        beanTkt.NEGOC = "PASAJES";
                    } else if (beanTkt.NEGOC.equals("2")) {
                        beanTkt.NEGOC = "CARGO";
                    } else if (beanTkt.NEGOC.equals("3")) {
                        beanTkt.NEGOC = "CORREO";
                    } else if (beanTkt.NEGOC.equals("S")) {
                        beanTkt.NEGOC = "STANDBY";
                    }

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.lngTotQTYTKT = lngQTYTKT;
                    beanTkt.dblTotSVFOP = dblSVFOP;
                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public String loadPX269SQP01950(A2290Filter filter) throws SQLException, Exception {

        //Obtiene la lista de Tickets (A2290) tomando como base el registro del A2291
        //List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        //A2290Filter beanTkt;
        String strMsj = "";
        //HashMap hmResult = new HashMap();

        CallableStatement cstmt = null;
        //ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01950(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE.trim());
            cstmt.setString(3, filter.TDOC.trim());
            cstmt.setString(4, filter.SCARCOD.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.MERCHN.trim());
            cstmt.setString(8, filter.SAUTHOC.trim());
            cstmt.setString(9, filter.BAID.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setDouble(11, filter.SVFOP);
            cstmt.setString(12, filter.strNUMREF.trim());
            cstmt.setString(13, filter.SAGENT.trim());
            cstmt.setInt(14, 0);
            cstmt.setString(15, "");

            cstmt.execute();

            filter.lngQTYTKT = cstmt.getInt(14);
            strMsj = cstmt.getString(15);

            /*if (strMsj.trim().isEmpty()) {
                
             rst = cstmt.getResultSet();

             while (rst.next()) {

             beanTkt = new A2290Filter();
             beanTkt.CCIA = rst.getString("CCIA").trim();
             beanTkt.FORMA = rst.getString("FORMA").trim();
             beanTkt.SERIE = rst.getString("SERIE").trim();
             beanTkt.SEQ = rst.getString("SEQ").trim();
             beanTkt.STVAL = rst.getString("STVAL").trim();
             beanTkt.TDOC = rst.getString("TDOC").trim();
             beanTkt.FTE = rst.getString("FTE").trim();
             beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
             beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
             beanTkt.SVFOP = rst.getDouble("SVFOP");
             beanTkt.SCARDN = rst.getString("SCARDN").trim();
             beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
             beanTkt.SPNR = rst.getString("SPNR").trim();
             beanTkt.ACARCOD = rst.getString("ACARCOD").trim();
             beanTkt.AVFOP = rst.getDouble("AVFOP");
             beanTkt.ACARDN = rst.getString("ACARDN").trim();
             beanTkt.AAUTHOC = rst.getString("AAUTHOC").trim();
             beanTkt.APNR = rst.getString("APNR").trim();
             beanTkt.SDATE = rst.getString("SDATE").trim();
             beanTkt.MERCHN = rst.getString("MERCHN").trim();
             beanTkt.BAID = rst.getString("BAID").trim();

             lstData.add(beanTkt);
             }
             rst.close();
             }
            
             hmResult.put("MSJ", strMsj);
             hmResult.put("LISTA", lstData);*/
        } catch (Exception e) {
            e.printStackTrace();
            strMsj = "Error : " + e.getMessage();
        } finally {
            /*if (rst != null) {
             try {
             rst.close();
             } catch (SQLException e) {
             logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
             }
             }*/
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

        return strMsj;
    }

    public List<A2290Filter> loadPX269SQP02193(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = null;
        List<A2290Filter> lstLista = new ArrayList<A2290Filter>();

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Settlement w/o Paying");
        hmDescEstados.put("3", "Settlement w/o Sales");
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02193(?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.strTRNXCODE.trim());
            cstmt.setString(4, filter.strNUMREF.trim());
            cstmt.setString(5, filter.SCARDN.trim());
            cstmt.setString(6, filter.SAUTHOC.trim());
            cstmt.setString(7, filter.BAID.trim());
            cstmt.setString(8, filter.SDATE.trim());
            cstmt.setString(9, filter.CODEBANK.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {

                beanTkt = new A2290Filter();
                beanTkt.SORIG = "BANK";
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                beanTkt.MERCHN = rst.getString("MERCHN").trim();
                beanTkt.strTRNXCODE = rst.getString("TRNXCODE").trim();
                beanTkt.strNUMREF = rst.getString("NUMREF").trim();
                beanTkt.BAID = rst.getString("BAID").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                lstLista.add(beanTkt);

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                if (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.SORIG = "SALES";
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    beanTkt.BAID = rst.getString("BAID").trim();
                    lstLista.add(beanTkt);

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

        return lstLista;
    }

    public String loadPX263SQP02194(A2290Filter filter, UserView user, String accion) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "";

        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02194(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(23, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.origSDATE.trim());
            cstmt.setString(3, filter.origSCARCOD.trim());
            cstmt.setString(4, filter.origSCARDN.trim());
            cstmt.setString(5, filter.origSAUTHOC.trim());
            cstmt.setString(6, filter.origSCURRENCY.trim());
            cstmt.setDouble(7, filter.origSVFOP);
            cstmt.setString(8, filter.SEQNUM.trim());
            cstmt.setString(9, filter.TDOC.trim());
            cstmt.setString(10, filter.strTRNXCODE.trim());
            cstmt.setString(11, filter.strNUMREF.trim());
            cstmt.setString(12, filter.STVAL.trim());

            cstmt.setString(13, filter.SDATE.trim());
            cstmt.setString(14, filter.SCARCOD.trim());
            cstmt.setString(15, filter.SCARDN.trim());
            cstmt.setString(16, filter.SAUTHOC.trim());
            cstmt.setString(17, filter.SCURRENCY.trim());
            cstmt.setDouble(18, filter.SVFOP);
            cstmt.setString(19, user.getUserInfo().USR);
            cstmt.setString(20, Functions.getFechaActual());
            cstmt.setString(21, Functions.getHoraActual());
            cstmt.setString(22, filter.strComment);
            cstmt.setString(23, "");
            cstmt.execute();

            strMsj = cstmt.getString(23);

            if (strMsj.trim().equals("")) {
                strMsj = "The ticket was modified successfully.";
            }

        } catch (Exception e) {
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

        return strMsj;
    }

    public HashMap<String, List<A2290Filter>> loadPX263SQP03989(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        List<A2290Filter> lstError = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        long lngTotCant = 0;
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03989(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_BANK.trim());
            cstmt.setString(14, filter.IN_COUNTRY.trim());
            cstmt.setString(15, filter.IN_FTE.trim());
            cstmt.setString(16, filter.IN_ADYEN.trim());
            cstmt.setString(17, filter.IN_CERROR.trim());

            cstmt.setInt(18, filter.page.PAGNUM);
            cstmt.setInt(19, filter.page.PAGROW);
            cstmt.setInt(20, filter.page.TOTPAG);
            cstmt.setInt(21, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(18);
            filter.page.PAGROW = cstmt.getInt(19);
            filter.page.TOTPAG = cstmt.getInt(20);
            filter.page.TOTROW = cstmt.getInt(21);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblTotSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    //PRESENTACION SEGUN ESTADO
                    //MATCH CON DIFERENCIAS
                    //REGISTRO CON DATOS DE LA VENTA =======================
                    beanTkt = new A2290Filter();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.strMoneda = filter.strMoneda.trim();
                    beanTkt.strTicket = "";//rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    if (rst.getString("TDOC").trim().equals("R")) {
                        beanTkt.strPEM = "REFUND";
                    } else {
                        beanTkt.strPEM = "SALES";
                    }
                    /*beanTkt.TRNCU = rst.getString("TRNCU").trim();
                     if (!rst.getString("TRNCU").trim().isEmpty()) {
                     beanTkt.strCampo = rst.getString("TRNCU").trim().substring(0, 1);
                     }*/
                    //beanTkt.CCIA = rst.getString("CCIA").trim();
                    //beanTkt.FORMA = rst.getString("FORMA").trim();
                    //beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    //beanTkt.SEQ = rst.getString("SEQ").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    }
                    /*if (hmDescError.containsKey(rst.getString("CERROR").trim().toUpperCase())) {
                     beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + hmDescError.get(rst.getString("CERROR").trim()).toString();
                     } else {
                     beanTkt.CERROR = rst.getString("CERROR").trim();
                     }*/
 /*if (!rst.getString("ERROR").trim().isEmpty()) {
                        beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                    } else {
                        beanTkt.CERROR = rst.getString("CERROR").trim();
                    }*/
                    //beanTkt.FTE = rst.getString("FTE").trim();
                    /*if (rst.getString("FTE").trim().equals("A")) {
                        beanTkt.strSORIG = "ARC";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        beanTkt.strSORIG = "BSP";
                    } else if (rst.getString("FTE").trim().equals("S")) {
                        beanTkt.strSORIG = "ASR";
                    }*/
                    //beanTkt.SDATEL = rst.getString("SDATEL").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    /*if (hmPaises.containsKey(beanTkt.SCOUNTRY.trim())) {
                     beanTkt.strDescCountry = hmPaises.get(beanTkt.SCOUNTRY.trim()).toString();
                     }*/
 /*if (!rst.getString("NCOUNTRYS").trim().isEmpty()) {
                        beanTkt.strDescCountry = rst.getString("NCOUNTRYS").trim();
                    }*/
                    //beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    //beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    /*if (hmDescCard.containsKey(rst.getString("SCARCOD").trim().toUpperCase())) {
                     beanTkt.strDescCard = hmDescCard.get(rst.getString("SCARCOD").trim()).toString();
                     }*/
 /*if (!rst.getString("NCARDS").trim().isEmpty()) {
                        beanTkt.strDescCard = rst.getString("NCARDS").trim();
                    }*/
                    //beanTkt.STCNTR = rst.getString("STCNTR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("SCARDN").trim());
                    //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    //beanTkt.SINVN = rst.getString("SINVN").trim();
                    //beanTkt.SIDATE = rst.getString("SIDATE").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();

                    beanTkt.TDATE = rst.getString("TDATE").trim();
                    beanTkt.DATEF = rst.getString("DATEF").trim();
                    beanTkt.SAUTHOC1 = rst.getString("SAUTHOC1").trim();
                    beanTkt.SCARCOD1 = rst.getString("SCARCOD1").trim();
                    beanTkt.NUMREF = rst.getString("NUMREF").trim();
                    //beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                    //beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    //beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    //beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
                    //Banks
                    //beanTkt.BDATEL = rst.getString("BDATEL").trim();
                    /*beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    if (beanTkt.BSTVAL.trim().equals("1")) {
                        beanTkt.BSTVAL = "Accepted";
                    } else if (beanTkt.BSTVAL.trim().equals("2")) {
                        beanTkt.BSTVAL = "Rejected";
                    } else if (beanTkt.BSTVAL.trim().equals("3")) {
                        beanTkt.BSTVAL = "Suspect";
                    }*/
                    //beanTkt.GRUPO = rst.getString("GRUPO").trim();
                    //beanTkt.IDFIL = rst.getString("IDFIL").trim();

                    /*beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    try {
                        if (!rst.getString("BDATEP").trim().equals("")) {
                            beanTkt.lngDays = Functions.diferenciaDias(beanTkt.SDATE, beanTkt.BDATEP);
                        } else if (!beanTkt.SDATE.trim().equals("")) {
                            beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.SDATE);
                        }
                    } catch (Exception e) {
                    }*/
                    //Armando Título del Detalle
                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : " + beanTkt.SDATE;
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : " + beanTkt.SDATE;
                    } else {
                        beanTkt.strTitulo = "Sales Date : " + beanTkt.SDATE;
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();

            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    //PRESENTACION SEGUN ERROR
                    beanTkt = new A2290Filter();
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    if (!rst.getString("ERROR").trim().isEmpty()) {
                        beanTkt.strDescripcion = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                    } else {
                        beanTkt.strDescripcion = rst.getString("CERROR").trim();
                    }
                    lstError.add(beanTkt);
                }
                rst.close();
            }

            hmResultado.put("TKT", lstTkts);
            hmResultado.put("ERROR", lstError);

        } catch (Exception e) {
            e.getMessage();
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

        return hmResultado;
    }

    public List<A2290Filter> loadPX269SQP00833_MDP_DETAIL(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_DETAIL(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATEC.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());
            cstmt.setString(11, filter.DATEC.trim());
            cstmt.setString(12, filter.TRANC.trim());
            cstmt.setString(13, filter.PRDA.trim());
            cstmt.setString(14, filter.BANDOC.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();

                beanTkt.FDESGLOSE = "1";
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else {
                    beanTkt.descTDOC = "Sales";
                }
                beanTkt.A1531TTARJ = rst.getString("SCARCOD").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("SVFOP");
                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();
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

    public List<A2290Filter> loadPX269SQP00833_REFND_DETAIL(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_REFND_DETAIL(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATEC.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());
            cstmt.setString(11, filter.DATEC.trim());
            cstmt.setString(12, filter.TRANC.trim());
            cstmt.setString(13, filter.PRDA.trim());
            cstmt.setString(14, filter.BANDOC.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.TKT = rst.getString("TKT").trim();
//                beanTkt.FORMA = rst.getString("FORMA").trim();
//                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.TKT;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else if(rst.getString("TDOC").trim().equals("D")){
                      beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Debits.";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("TOTAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
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
    
    public List<A2290Filter> loadPX269SQP00833_CHGBAK_DETAIL(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_CHGBAK_DETAIL(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATEC.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());
            cstmt.setString(11, filter.DATEC.trim());
            cstmt.setString(12, filter.TRANC.trim());
            cstmt.setString(13, filter.PRDA.trim());
            cstmt.setString(14, filter.BANDOC.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
//                beanTkt.TKT = rst.getString("TKT").trim();
//                beanTkt.FORMA = rst.getString("FORMA").trim();
//                beanTkt.SERIE = rst.getString("SERIE").trim();
//                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.TKT;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
//                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
//                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
//                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("NOMPAX").trim();
                beanTkt.MPF076TRAN = rst.getString("TRAN").trim();
                

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("C")) {
                    beanTkt.descTDOC = "Chargebak";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else if(rst.getString("TDOC").trim().equals("D")){
                      beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Debits.";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
//                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
//                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("VALLOCAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
//                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("NOMPAX").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
//                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();
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
    
    public List<A2290Filter> loadPX269SQP00833_ACREDIT_DETAIL(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_ACREDIT_DETAIL(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATEC.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());
            cstmt.setString(11, filter.DATEC.trim());
            cstmt.setString(12, filter.TRANC.trim());
            cstmt.setString(13, filter.PRDA.trim());
            cstmt.setString(14, filter.BANDOC.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
//                beanTkt.TKT = rst.getString("TKT").trim();
//                beanTkt.FORMA = rst.getString("FORMA").trim();
//                beanTkt.SERIE = rst.getString("SERIE").trim();
//                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.TKT;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
//                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
//                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
//                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("NOMPAX").trim();
                beanTkt.MPF076TRAN = rst.getString("TRAN").trim();
                

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("C")) {
                    beanTkt.descTDOC = "Chargebak";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Acredits";
                } else if(rst.getString("TDOC").trim().equals("D")){
                      beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Debits.";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
//                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
//                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("VALLOCAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
//                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("NOMPAX").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
//                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();
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
    
    public List<A2290Filter> loadPX269SQP05103(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05103(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt.execute();

            rst = cstmt.getResultSet();

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

    public List<A2290Filter> loadPX269SQP05103F(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;

        A2290Filter objRtn0;
        objRtn0 = new A2290Filter();
        objRtn0.CODE = "";
        objRtn0.NAME = "All";
        lstData.add(objRtn0);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05103(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt.execute();

            rst = cstmt.getResultSet();

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

    public List<A2290Filter> loadPX269SQP05103T(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;

        A2290Filter objRtn0;
        objRtn0 = new A2290Filter();
        objRtn0.CODE = "";
        objRtn0.NAME = "All";
        lstData.add(objRtn0);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05103Termi(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt.execute();

            rst = cstmt.getResultSet();

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

    public List<A2290Filter> loadPX269SQP00833_MDP_SCAN(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_SCAN(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TICKET.trim());
            cstmt.setString(3, filter.CARD1.trim());
            cstmt.setString(4, filter.CARD2.trim());
            cstmt.setString(5, filter.SAUTHOC.trim());
            cstmt.setString(6, filter.SDATE.trim());
            cstmt.setString(7, filter.SPNR.trim());
            cstmt.setString(8, filter.SAGENT.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();

                beanTkt.FDESGLOSE = rst.getString("FDESGLOSE").trim(); //REVISAR
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else {
                    beanTkt.descTDOC = "Sales";
                }
                beanTkt.A1531TTARJ = rst.getString("SCARCOD").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("SVFOP");
                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();

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

    public List<A2290Filter> loadPX269SQP00833_MDP_SCAN_PENDING(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_SCAN_PENDING(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());
            cstmt.setString(11, filter.TRANC.trim());
            cstmt.setString(12, filter.PRDA.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else {
                    beanTkt.descTDOC = "Sales";
                }
                beanTkt.A1531TTARJ = rst.getString("SCARCOD").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("SVFOP");
                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();

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

    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN_PENDING(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_DEBITS_SCAN_PENDING(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());
            cstmt.setString(11, filter.TRANC.trim());
            cstmt.setString(12, filter.PRDA.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.TKT = rst.getString("TKT").trim();
//                beanTkt.FORMA = rst.getString("FORMA").trim();
//                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.TKT;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else if(rst.getString("TDOC").trim().equals("D")){
                      beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Refund";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("TOTAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
//                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();

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
    
    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN_PENDING_CHGBAK(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_DEBITS_SCAN_PENDING_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());
            cstmt.setString(11, filter.TRANC.trim());
            cstmt.setString(12, filter.PRDA.trim());
            cstmt.setString(13, String.valueOf(filter.SVFOP));

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
//                beanTkt.TKT = rst.getString("TKT").trim();
//                beanTkt.FORMA = rst.getString("FORMA").trim();
//                beanTkt.SERIE = rst.getString("SERIE").trim();
//                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.TKT;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
//                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
//                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
//                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("NOMPAX").trim();
                beanTkt.MPF076TRAN = rst.getString("TRAN").trim();
                

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("C")) {
                    beanTkt.descTDOC = "Chargebak";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else if(rst.getString("TDOC").trim().equals("D")){
                      beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Chargebak";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
//                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
//                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("VALLOCAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
//                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("NOMPAX").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
//                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();

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
    
    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN_PENDING_ACREDIT(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_DEBITS_SCAN_PENDING_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());
            cstmt.setString(11, filter.TRANC.trim());
            cstmt.setString(12, filter.PRDA.trim());
            cstmt.setString(13, String.valueOf(filter.SVFOP));

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
//                beanTkt.TKT = rst.getString("TKT").trim();
//                beanTkt.FORMA = rst.getString("FORMA").trim();
//                beanTkt.SERIE = rst.getString("SERIE").trim();
//                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.TKT;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
//                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
//                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
//                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("NOMPAX").trim();
                beanTkt.MPF077TRAN = rst.getString("TRAN").trim();
                

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Acreditations";
                } else if(rst.getString("TDOC").trim().equals("D")){
                      beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Acreditations";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
//                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
//                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("VALLOCAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
//                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("NOMPAX").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
//                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();

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
    
    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_DEBITS_SCAN(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TICKET.trim());
            cstmt.setString(3, filter.CARD1.trim());
            cstmt.setString(4, filter.CARD2.trim());
            cstmt.setString(5, filter.SAUTHOC.trim());
            cstmt.setString(6, filter.SDATE.trim());
            cstmt.setString(7, filter.SPNR.trim());
            cstmt.setString(8, filter.SAGENT.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.TKT = rst.getString("TKT").trim();
//                beanTkt.FORMA = rst.getString("FORMA").trim();
//                beanTkt.SERIE = rst.getString("SERIE").trim();

                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.TKT;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();

//                beanTkt.FDESGLOSE = rst.getString("FDESGLOSE").trim(); //REVISAR
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else {
                    beanTkt.descTDOC = "Refund";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("TOTAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
//                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();

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

    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN_CHGBAK(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_DEBITS_SCAN_CHGBAK(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TICKET.trim());
            cstmt.setString(3, filter.CARD1.trim());
            cstmt.setString(4, filter.CARD2.trim());
            cstmt.setString(5, filter.SAUTHOC.trim());
            cstmt.setString(6, filter.SDATE.trim());
            cstmt.setString(7, filter.SPNR.trim());
            cstmt.setString(8, filter.SAGENT.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
//                beanTkt.TKT = rst.getString("TKT").trim();
//                beanTkt.FORMA = rst.getString("FORMA").trim();
//                beanTkt.SERIE = rst.getString("SERIE").trim();

//                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.TKT;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
//                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
//                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
//                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.MPF076TRAN = rst.getString("TRAN").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();

//                beanTkt.FDESGLOSE = rst.getString("FDESGLOSE").trim(); //REVISAR
                if (rst.getString("TDOC").trim().equals("C")) {
                    beanTkt.descTDOC = "ChargeBak";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else {
                    beanTkt.descTDOC = "ChargeBak";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
//                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
//                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("VALLOCAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
//                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("NOMPAX").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
//                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();

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
    
    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN_ACREDIT(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_DEBITS_SCAN_ACREDIT(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TICKET.trim());
            cstmt.setString(3, filter.CARD1.trim());
            cstmt.setString(4, filter.CARD2.trim());
            cstmt.setString(5, filter.SAUTHOC.trim());
            cstmt.setString(6, filter.SDATE.trim());
            cstmt.setString(7, filter.SPNR.trim());
            cstmt.setString(8, filter.SAGENT.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
//                beanTkt.TKT = rst.getString("TKT").trim();
//                beanTkt.FORMA = rst.getString("FORMA").trim();
//                beanTkt.SERIE = rst.getString("SERIE").trim();

//                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.TKT;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
//                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
//                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
//                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("NOMPAX").trim();
                beanTkt.MPF077TRAN = rst.getString("TRAN").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();

//                beanTkt.FDESGLOSE = rst.getString("FDESGLOSE").trim(); //REVISAR
                if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Acreditations";
                } else {
                    beanTkt.descTDOC = "Acreditations";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
//                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
//                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("VALLOCAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
//                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("NOMPAX").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
//                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();

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
    
    public List<A2290Filter> loadPX269SQP00871JT(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0, lngQTYTKT = 0;
        double dblSVFOP = 0;
        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");

        String estado = "", strTitulo = "";
        HashMap<String, String> hmDescEstadosTit = new HashMap<String, String>();
        hmDescEstadosTit.put("1", "Accepted");
        hmDescEstadosTit.put("2", "Rejected");
        hmDescEstadosTit.put("3", "Suspect");
        hmDescEstadosTit.put("P", "Paying w/o Sales");
        hmDescEstadosTit.put("C", "Clarifications");
        hmDescEstadosTit.put("H", "Chargebacks");

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00871JT(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA.trim());
            cstmt.setString(4, filter.strSQL.trim());
            cstmt.setString(5, filter.SCARDNCOR);
            cstmt.setString(6, filter.SAUTHOC);
            cstmt.setString(7, session.getUserView().getCustomerInfo().USR);

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                lngQTYTKT += rst.getLong("QTYTKT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    beanTkt.IN_TKT_ASIG = filter.CCIA + filter.FORMA + filter.SERIE;

                    beanTkt.FCONC = rst.getString("FCONC").trim();

                    if (beanTkt.IN_ADYEN.equals("Y") && (beanTkt.IN_STVAL.equals("2") || beanTkt.IN_STVAL.equals("3"))) {
                        beanTkt.strCampo = "assets/icons/16x16/Change.png";
                    } else {
                        beanTkt.strCampo = "assets/icons/16x16/1326498593_018.png";
                    }

                    beanTkt.FTE = rst.getString("FTE").trim();
                    if (rst.getString("FTE").trim().equals("S")) {
                        beanTkt.strDescFTE = "ASR";
                    } else if (rst.getString("FTE").trim().equals("A")) {
                        beanTkt.strDescFTE = "ARC";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        beanTkt.strDescFTE = "BSP";
                    } else {
                        beanTkt.strDescFTE = rst.getString("FTE").trim();
                    }
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.TRANC = rst.getString("TRANC").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    beanTkt.NUMREF = rst.getString("NUMREF").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.strDescripcion = rst.getString("DESCAGT").trim();
                    beanTkt.strTRNXCODE = rst.getString("TRNXCODE").trim();
                    beanTkt.strPEM = rst.getString("PEM").trim();
                    if (beanTkt.strPEM.trim().equals("01")) {
                        beanTkt.strPEM = "Manual";
                    } else if (beanTkt.strPEM.trim().equals("05")) {
                        beanTkt.strPEM = "Chip EMV";
                    } else if (beanTkt.strPEM.trim().equals("80")) {
                        beanTkt.strPEM = "Fallback";
                    } else if (beanTkt.strPEM.trim().equals("90")) {
                        beanTkt.strPEM = "Deslizada";
                    }
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.TDATE = rst.getString("TDATE").trim();
                    beanTkt.DATEF = rst.getString("DATEF").trim();
                    if (rst.getString("BDATEP").trim().length() == 6) {
                        beanTkt.BDATEP = Functions.FormatFecha(rst.getString("BDATEP").trim(), "yyMMdd", "yyyyMMdd");
                    } else {
                        beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    }
                    if (hmDescEstados.containsKey(rst.getString("BSTVAL").trim().toUpperCase())) {
                        beanTkt.BSTVAL = hmDescEstados.get(rst.getString("BSTVAL").trim()).toString();
                    } else {
                        beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    }
                    beanTkt.lngQTYTKT = rst.getLong("QTYTKT");

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.strNUMREF = rst.getString("NUMREF").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.strFLOAD = rst.getString("FLOAD").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    if (beanTkt.strFLOAD.trim().equals("M")) {
                        beanTkt.strFLOAD = "Manual";
                    }
                    beanTkt.SDATEL = rst.getString("LDATE").trim();
                    beanTkt.strSORIG = rst.getString("SORIG").trim();

                    if (hmDescOrigen.containsKey(rst.getString("SORIG").trim())) {
                        beanTkt.strSORIG = hmDescOrigen.get(rst.getString("SORIG").trim());
                    } else {
                        beanTkt.strSORIG = rst.getString("SORIG").trim();
                    }

                    beanTkt.BAID = rst.getString("BAID").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    if (rst.getString("FLAGC").trim().equals("C")) {
                        beanTkt.FLAGC = "Match";
                    }/* else {
                     beanTkt.FLAGC = "Paying w/o Sales";
                     }*/

                    //**********************************************************
                    if (!filter.IN_BSTVAL.trim().equals("")) {
                        estado = hmDescEstadosTit.get(beanTkt.IN_BSTVAL).toString();
                    }

                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    if (!rst.getString("DATEC").trim().equals("")) {
                        beanTkt.strBankDeposit = rst.getString("DATEC").trim();
                    } else if (!beanTkt.BDATEP.trim().isEmpty()) {
                        beanTkt.strBankDeposit = String.valueOf(Functions.diferenciaDiasEntreSistema(beanTkt.BDATEP)) + " days";
                    }

                    if (filter.IN_STVAL.trim().equals("1")) {
                        estado = "Match";
                    } else if (filter.IN_STVAL.trim().equals("2")) {
                        estado = "Settlement w/o Paying";
                    } else if (filter.IN_STVAL.trim().equals("3")) {
                        estado = "Settlement w/o Sales";
                    } else if (filter.IN_STVAL.trim().equals("4")) {
                        estado = "Match with Differences";
                    } else if (filter.IN_STVAL.trim().equals("5")) {
                        estado = "Match Manual";
                    }

                    if (filter.strFecFiltro.trim().equals("BDATEP")) {
                        strTitulo = "Conciliaton Date : ";
                    } else if (filter.IN_TDOC.trim().equals("R")) {
                        strTitulo = "Refund Date : ";
                    } else {
                        strTitulo = "Sales Date : ";
                    }
                    strTitulo += beanTkt.SDATE + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " *** " + estado + " ***";
                    if (!beanTkt.SCOUNTRY.trim().isEmpty()) {
                        strTitulo += " - Country : " + beanTkt.SCOUNTRY + " : " + filter.strDescCountry.trim();
                    }
                    beanTkt.strTitulo = strTitulo;

                    beanTkt.FAREO = rst.getDouble("FAREO");
                    beanTkt.FAREC = rst.getDouble("FAREC");
                    beanTkt.DIFF_FARE = rst.getDouble("FAREDIFFC");

                    beanTkt.COMMAMO = rst.getDouble("COMMAMO");
                    beanTkt.COMMAMOC = rst.getDouble("COMMAMOC");
                    beanTkt.DIFF_COMMAMO = rst.getDouble("COMMDIFFC");
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.STCON = rst.getString("STCON").trim();
                    if (hmDescSTCONL.containsKey(rst.getString("STCON").trim())) {
                        beanTkt.STCON = hmDescSTCONL.get(rst.getString("STCON").trim()).toString();
                    } else {
                        beanTkt.STCON = rst.getString("FREGLA").trim();
                    }
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.NEGOC = rst.getString("NEGOC").trim();
                    if (beanTkt.NEGOC.equals("1")) {
                        beanTkt.NEGOC = "PASAJES";
                    } else if (beanTkt.NEGOC.equals("2")) {
                        beanTkt.NEGOC = "CARGO";
                    } else if (beanTkt.NEGOC.equals("3")) {
                        beanTkt.NEGOC = "CORREO";
                    } else if (beanTkt.NEGOC.equals("S")) {
                        beanTkt.NEGOC = "STANDBY";
                    }

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.lngTotQTYTKT = lngQTYTKT;
                    beanTkt.dblTotSVFOP = dblSVFOP;
                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<A1248> loadSQP03739(String tabla) throws Exception {
        List<A1248> lista = new ArrayList<>();
        A1248 record;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00871JT2(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, tabla);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                record = new A1248();
                record.TABNAME = rs01.getString("TABNAME").trim();
                record.ALIAS = rs01.getString("ALIAS");
                record.COLOR = rs01.getString("COLOR");
                record.USERFIELD = rs01.getString("USERFIELD").trim();
                record.DESCRIPT = rs01.getString("DESCRIPT").trim();
                record.SYSTFIELD = rs01.getString("SYSTFIELD").trim();
                record.DATATYPE = rs01.getString("DATATYPE").trim();
                record.SUBSTRFL = rs01.getString("SUBSTRFL").trim();
                //record.SUBSTRFL = rs01.getString("SUBSTRFL").trim();
                record.LENGHTF = rs01.getInt("LENGHTF");
                //record.FHELP = rs01.getString("FHELP").trim();
                record.DCOLHDG = rs01.getString("DCOLHDG").trim();
                record.strExample = rs01.getString("FHELP").trim();
                if (rs01.getString("DCOLHDG").contains("*")) {
                    record.FLAG = "1";
                    record.DCOLHDG = "\t " + rs01.getString("DCOLHDG").trim().replace("*", "\t \n \t");
                }

                lista.add(record);
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
        return lista;
    }

    public List<A1248> loadOperadores() throws SQLException, Exception {

        List<A1248> lista = new ArrayList<>();
        A1248 record;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02860(?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {

                record = new A1248();
                record.OPERADOR = rst.getString("USERFIELD").trim();
                record.DESCRIPT = rst.getString("DESCRIPT").trim();

                lista.add(record);
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List<A2290Filter> loadAuditores() throws SQLException, Exception {

        List<A2290Filter> lista = new ArrayList<>();
        A2290Filter record;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".getAuditores(?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {

                record = new A2290Filter();
                record.UASIG = rst.getString("UASIG").trim();
                record.QTYDOC = rst.getInt("PEND");

                lista.add(record);
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public INF020 loadUserInfo() throws SQLException, Exception {

        INF020 OBJ = new INF020();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".getUserInfo(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, session.getUserView().getCustomerInfo().USR);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {

                OBJ.NIVEL = rst.getString("CRTM").trim();

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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return OBJ;
    }

    public String asginarTW(A2290Filter filter) throws SQLException, Exception {

        String strMsj = "";

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".asginarTW(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA.trim());
            cstmt.setString(4, filter.strSQL.trim());
            cstmt.setString(5, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(6, filter.USUP);
            cstmt.setString(7, "");

            cstmt.execute();

            strMsj = cstmt.getString(7);

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

        return strMsj;
    }

    public List<A2290Filter> loadPX269SQPMPF100(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        //String strSCARF = "";
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        String tipFecha = "Sales";
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF100(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA.trim());
            cstmt.setString(4, filter.strSQL.trim());
            cstmt.setString(5, session.getUserView().getCustomerInfo().USR);

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            while (rst.next()) {
                dblTotSVFOP = rst.getDouble("SVFOP");
                dblTotAVFOP = rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.TRNCU = rst.getString("TRNCU");

                    beanTkt.SCARDNCOR = rst.getString("SCARDNCOR").trim();

                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strPEM = "";
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.SEQ = rst.getString("SEQ").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    if (!rst.getString("ERROR").trim().isEmpty()) {
                        beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                    } else {
                        beanTkt.CERROR = rst.getString("CERROR").trim();
                    }
                    //VUELTO A ACTIVAR A PEDIDO DE ENS 20171025
                    beanTkt.FTE = rst.getString("FTE").trim();
                    if (rst.getString("FTE").trim().equals("A")) {
                        beanTkt.strSORIG = "ARC";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        beanTkt.strSORIG = "BSP";
                    } else if (rst.getString("FTE").trim().equals("S")) {
                        beanTkt.strSORIG = "ASR";
                    } else if (rst.getString("FTE").trim().equals("M")) {
                        beanTkt.strSORIG = "Manual";
                    }

                    beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.STCNTR = rst.getString("STCNTR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    if (rst.getString("MONEDAS").trim().length() > 3) {
                        beanTkt.strMoneda = rst.getString("MONEDAS").trim().substring(3);
                    } else {
                        beanTkt.strMoneda = rst.getString("MONEDAS").trim();
                    }
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();

                    beanTkt.SPNR = rst.getString("SPNR").trim();

                    if (beanTkt.SFLOAD.trim().equals("M")) {
                        beanTkt.SFLOAD = "Manual";
                    }
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();

                    //Banks
                    beanTkt.BDATEL = rst.getString("BDATEL").trim();
                    beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    if (beanTkt.BSTVAL.trim().equals("1")) {
                        beanTkt.BSTVAL = "Accepted";
                    } else if (beanTkt.BSTVAL.trim().equals("2")) {
                        beanTkt.BSTVAL = "Rejected";
                    } else if (beanTkt.BSTVAL.trim().equals("3")) {
                        beanTkt.BSTVAL = "Suspect";
                    }
                    //TEF
                    beanTkt.TDATE = rst.getString("TDATE").trim();

                    //Pago
                    if (rst.getString("BDATEP").trim().length() == 6) {
                        beanTkt.BDATEP = Functions.FormatFecha(rst.getString("BDATEP").trim(), "yyMMdd", "yyyyMMdd");
                    } else {
                        beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    }
                    beanTkt.BSTVALP = rst.getString("BSTVALP").trim();
                    if (beanTkt.BSTVALP.trim().equals("1")) {
                        beanTkt.BSTVALP = "Paid";
                    }

                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.dblTotAVFOP = dblTotAVFOP;

                    try {
                        if (!beanTkt.BDATEP.trim().equals("") && !beanTkt.SDATE.trim().equals("")) {
                            beanTkt.lngDays = Functions.diferenciaDias(beanTkt.SDATE, beanTkt.BDATEP);

                        } else if (!beanTkt.TDATE.trim().equals("") && !beanTkt.SDATE.trim().equals("")) {
                            beanTkt.lngDays = Functions.diferenciaDias(beanTkt.SDATE, beanTkt.TDATE);

                        } else if (!beanTkt.SDATE.trim().equals("")) {
                            beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.SDATE);
                        }
                    } catch (Exception e) {
                    }

                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + beanTkt.strDescCountry + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard;

                    if (rst.getString("TKVOID").trim().equals("V")) {
                        beanTkt.strFlagStat = "Void";

                    } else if (rst.getString("FLAGC").trim().equals("C")) {
                        beanTkt.strFlagStat = "CNJ";
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;
                    lstTkts.add(beanTkt);

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

        return lstTkts;
    }

    public List<A2290Filter> loadgetIatas(String fecha) throws SQLException, Exception {

        List<A2290Filter> lista = new ArrayList<>();
        A2290Filter record;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".getIatas(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, fecha);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {

                record = new A2290Filter();
                record.SAGENT = rst.getString("SAGENT").trim();
                record.strDescripcion = rst.getString("DESCAGT").trim();
                record.QTYDOC = rst.getInt("PEND");

                lista.add(record);
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }
}
