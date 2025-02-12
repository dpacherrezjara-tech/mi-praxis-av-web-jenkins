/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.spring.INF020;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jsolano
 */
public class ManualConciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ManualConciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ManualConciliationDAO(IServerSession ss) {
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698MAIN_2(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_TDOC);
            cstmt.setString(5, filter.IN_COUNTRY);
            cstmt.setString(6, filter.IN_EXT);

            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

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
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
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

    public List<A2290Filter> loadPX287SQP00838(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotTOTALE = 0, lngTotQPEND = 0, lngTotQPEND1 = 0, lngTotQPEND3 = 0, lngTotQSALES = 0;
        long lngTotQTMATCH = 0, lngTotQTMANUAL = 0, lngTotQTPEND = 0, lngTotTOTALL = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00838MAIN_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(5, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_BANK.trim());
            cstmt.setString(8, filter.IN_AFTE.trim());
            cstmt.setString(9, filter.IN_TTRAN.trim());
            cstmt.setString(10, filter.IN_COUNTRY.trim());
            cstmt.setString(11, filter.IN_COREP.trim());
            cstmt.setString(12, filter.IN_EXT.trim());

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

                //QMATCH, QMANUAL, TOTALE, QPEND, QSALES,QTMATCH, QTMANUAL, QTPEND,  TOTALL
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotTOTALE = rst.getLong("TOTALE");
                lngTotQPEND = rst.getLong("QPEND");
                lngTotQPEND1 = rst.getLong("QPEND1");
                lngTotQPEND3 = rst.getLong("QPEND3");
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQTMATCH = rst.getLong("QTMATCH");
                lngTotQTMANUAL = rst.getLong("QTMANUAL");
                lngTotQTPEND = rst.getLong("QTPEND");
                lngTotTOTALL = rst.getLong("TOTALL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_COREP = filter.IN_COREP.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngTOTALE = rst.getLong("TOTALE");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQPEND1 = rst.getLong("QPEND1");
                    beanTkt.lngQPEND3 = rst.getLong("QPEND3");
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQMATCHPercent = ((beanTkt.lngQSALES - beanTkt.lngQPEND1) > 0) ? (beanTkt.lngQMATCH * 100.0) / (beanTkt.lngQSALES - beanTkt.lngQPEND1) : 0.00;

                    beanTkt.lngQTMATCH = rst.getLong("QTMATCH");
                    beanTkt.lngQTMANUAL = rst.getLong("QTMANUAL");
                    beanTkt.lngQTPEND = rst.getLong("QTPEND");
                    beanTkt.lngTOTALL = rst.getLong("TOTALL");
                    beanTkt.lngQTMATCHPercent = ((beanTkt.lngTOTALL - beanTkt.lngQTPEND) > 0) ? (beanTkt.lngQTMATCH * 100.0) / (beanTkt.lngTOTALL - beanTkt.lngQTPEND) : 0.00;

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotTOTALE = lngTotTOTALE;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQPEND1 = lngTotQPEND1;
                    beanTkt.lngTotQPEND3 = lngTotQPEND3;
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQTMATCH = lngTotQTMATCH;
                    beanTkt.lngTotQTMANUAL = lngTotQTMANUAL;
                    beanTkt.lngTotQTPEND = lngTotQTPEND;
                    beanTkt.lngTotTOTALL = lngTotTOTALL;

                    beanTkt.lngTotQMATCHPercent = ((beanTkt.lngTotQSALES - beanTkt.lngTotQPEND1) > 0) ? (beanTkt.lngTotQMATCH * 100.0) / (beanTkt.lngTotQSALES - beanTkt.lngTotQPEND1) : 0.00;
                    beanTkt.lngTotQTMATCHPercent = (beanTkt.lngTotTOTALL > 0) ? (beanTkt.lngTotQTMATCH * 100.0) / beanTkt.lngTotTOTALL : 0.00;

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
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
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

    public List<A2290Filter> loadPX269SQP00698Core(A2290Filter filter) throws SQLException, Exception {

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698CORE(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE);
            cstmt.setString(3, filter.IN_TDOC);
            cstmt.setString(4, filter.IN_CORE);
            cstmt.setString(5, filter.IN_SCURRENCY);

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
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_CORE = filter.IN_CORE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.IN_SDATE);
                    beanTkt.COREP = rst.getString("COREP").trim();
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

    public List<A2290Filter> loadPX269SQP00698CountryDebits(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQSALES = 0, lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotQDIFF = 0, lngTotQPEND = 0;
        long lngTotQSALESRF = 0, lngTotQMATCHRF = 0, lngTotQMANUALRF = 0, lngTotQDIFFRF = 0, lngTotQPENDRF = 0;
        long lngTotQSALESCH = 0, lngTotQMATCHCH = 0, lngTotQMANUALCH = 0, lngTotQDIFFCH = 0, lngTotQPENDCH = 0;
        long lngTotQSALESAC = 0, lngTotQMATCHAC = 0, lngTotQMANUALAC = 0, lngTotQDIFFAC = 0, lngTotQPENDAC = 0;
        long lngTotQPOLIC = 0, lngTotQPOLIPE = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698COUNTRY_DEBITS(?,?,?,?,?,?,?,?)}";

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

                lngTotQSALESRF = rst.getLong("QSALESRF");
                lngTotQMATCHRF = rst.getLong("QMATCHRF");
                lngTotQMANUALRF = rst.getLong("QMANUALRF");
                lngTotQDIFFRF = rst.getLong("QDIFFRF");
                lngTotQPENDRF = rst.getLong("QPENDRF");

                lngTotQSALESCH = rst.getLong("QSALESCH");
                lngTotQMATCHCH = rst.getLong("QMATCHCH");
                lngTotQMANUALCH = rst.getLong("QMANUALCH");
                lngTotQDIFFCH = rst.getLong("QDIFFCH");
                lngTotQPENDCH = rst.getLong("QPENDCH");

                lngTotQSALESAC = rst.getLong("QSALESAC");
                lngTotQMATCHAC = rst.getLong("QMATCHAC");
                lngTotQMANUALAC = rst.getLong("QMANUALAC");
                lngTotQDIFFAC = rst.getLong("QDIFFAC");
                lngTotQPENDAC = rst.getLong("QPENDAC");

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
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.IN_SDATE);

//                    if (rst.getString("COUNTRY").trim().isEmpty()) {
//                        beanTkt.SCOUNTRY = "**";
//                    }else {
//                        
//                    }
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.NAME = rst.getString("NAME").trim();

                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQPEND = rst.getLong("QPEND");

                    beanTkt.lngQSALESRF = rst.getLong("QSALESRF");
                    beanTkt.lngQMATCHRF = rst.getLong("QMATCHRF");
                    beanTkt.lngQDIFFRF = rst.getLong("QDIFFRF");
                    beanTkt.lngQMANUALRF = rst.getLong("QMANUALRF");
                    beanTkt.lngQPENDRF = rst.getLong("QPENDRF");

                    beanTkt.lngQSALESCH = rst.getLong("QSALESCH");
                    beanTkt.lngQMATCHCH = rst.getLong("QMATCHCH");
                    beanTkt.lngQDIFFCH = rst.getLong("QDIFFCH");
                    beanTkt.lngQMANUALCH = rst.getLong("QMANUALCH");
                    beanTkt.lngQPENDCH = rst.getLong("QPENDCH");

                    beanTkt.lngQSALESAC = rst.getLong("QSALESAC");
                    beanTkt.lngQMATCHAC = rst.getLong("QMATCHAC");
                    beanTkt.lngQDIFFAC = rst.getLong("QDIFFAC");
                    beanTkt.lngQMANUALAC = rst.getLong("QMANUALAC");
                    beanTkt.lngQPENDAC = rst.getLong("QPENDAC");

                    beanTkt.lngQPOLIC = rst.getLong("QPOLIC");
                    beanTkt.lngQPOLIPE = rst.getLong("QPOLIPE");

                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;

                    beanTkt.lngTotQSALESRF = lngTotQSALESRF;
                    beanTkt.lngTotQMATCHRF = lngTotQMATCHRF;
                    beanTkt.lngTotQMANUALRF = lngTotQMANUALRF;
                    beanTkt.lngTotQPENDRF = lngTotQPENDRF;

                    beanTkt.lngTotQSALESCH = lngTotQSALESCH;
                    beanTkt.lngTotQMATCHCH = lngTotQMATCHCH;
                    beanTkt.lngTotQMANUALCH = lngTotQMANUALCH;
                    beanTkt.lngTotQPENDCH = lngTotQPENDCH;

                    beanTkt.lngTotQSALESAC = lngTotQSALESAC;
                    beanTkt.lngTotQMATCHAC = lngTotQMATCHAC;
                    beanTkt.lngTotQMANUALAC = lngTotQMANUALAC;
                    beanTkt.lngTotQPENDAC = lngTotQPENDAC;

                    beanTkt.lngTotQPOLIC = lngTotQPOLIC;
                    beanTkt.lngTotQPOLIPE = lngTotQPOLIPE;

                    beanTkt.lngQMATCHPercent = (beanTkt.lngQSALES > 0) ? (beanTkt.lngQMATCH * 100.0) / beanTkt.lngQSALES : 0.00;

                    beanTkt.lngQMATCHPercentRF = (beanTkt.lngQSALESRF > 0) ? (beanTkt.lngQMATCHRF * 100.0) / beanTkt.lngQSALESRF : 0.00;
                    beanTkt.lngQMATCHPercentCH = (beanTkt.lngQSALESCH > 0) ? (beanTkt.lngQMATCHCH * 100.0) / beanTkt.lngQSALESCH : 0.00;
                    beanTkt.lngQMATCHPercentAC = (beanTkt.lngQSALESAC > 0) ? (beanTkt.lngQMATCHAC * 100.0) / beanTkt.lngQSALESAC : 0.00;

                    beanTkt.lngTotQMATCHPercent = (lngTotQSALES > 0) ? (lngTotQMATCH * 100.0) / lngTotQSALES : 0.00;
                    beanTkt.lngTotQMATCHPercentRF = (lngTotQSALESRF > 0) ? (lngTotQMATCHRF * 100.0) / lngTotQSALESRF : 0.00;
                    beanTkt.lngTotQMATCHPercentCH = (lngTotQSALESCH > 0) ? (lngTotQMATCHCH * 100.0) / lngTotQSALESCH : 0.00;
                    beanTkt.lngTotQMATCHPercentAC = (lngTotQSALESAC > 0) ? (lngTotQMATCHAC * 100.0) / lngTotQSALESAC : 0.00;

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
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
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
        long lngTotQTYTKT = 0;
        double totSVFOP = 0;
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698DETALLE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(22, Types.INTEGER);
            cstmt.registerOutParameter(23, Types.INTEGER);
            cstmt.registerOutParameter(24, Types.INTEGER);
            cstmt.registerOutParameter(25, Types.INTEGER);

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
            cstmt.setString(16, filter.IN_FTE.trim());
            cstmt.setString(17, filter.IN_COREP.trim());
            cstmt.setString(18, filter.IN_DATEC.trim());
            cstmt.setString(19, filter.IN_TRANC.trim());
            cstmt.setString(20, filter.IN_BANDOC.trim());
            cstmt.setString(21, filter.TYPEDATE.trim());

            cstmt.setInt(22, filter.page.PAGNUM);
            cstmt.setInt(23, filter.page.PAGROW);
            cstmt.setInt(24, filter.page.TOTPAG);
            cstmt.setInt(25, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(22);
            filter.page.PAGROW = cstmt.getInt(23);
            filter.page.TOTPAG = cstmt.getInt(24);
            filter.page.TOTROW = cstmt.getInt(25);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQTYTKT = rst.getLong("QTYTKT");
                totSVFOP = rst.getDouble("SVFOP");
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
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
                    beanTkt.lngTotQTYTKT = lngTotQTYTKT;
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.TRANC = rst.getString("TRANC").trim();
                    beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.PAYDATE = rst.getString("BDATEP").trim();
                    beanTkt.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                    beanTkt.TERMI = rst.getString("TERMI").trim();
                    beanTkt.STCON = rst.getString("STCON").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.strCERROR = rst.getString("ERROR").trim();
                    beanTkt.PENDINGDAYS = rst.getString("PENDINGDAYS").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.COREP = rst.getString("COREP").trim();
                    beanTkt.MERCHNC = rst.getString("MERCHNC").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.strDescripcionCOREP = rst.getString("COREPN").trim();
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698TICKET(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

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
            cstmt.setInt(13, filter.QTYDOC);

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

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
                    beanTkt.INVOICE = rst.getString("INVOICE").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();

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

    public List<A2290Filter> loadPX269SQP00698Table_REFND(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQTYTKT = 0, totSVFOP = 0;
        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Match");
        hmDescEstadosSTVAL.put("2", "Settlement w/o Paying");
        hmDescEstadosSTVAL.put("3", "Settlement w/o Sales");
        hmDescEstadosSTVAL.put("4", "Match with Difference");
        hmDescEstadosSTVAL.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        hmDescDocType.put("R", "Refund");
        hmDescDocType.put("C", "Chargebak");
        hmDescDocType.put("A", "Acredit");
        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698TABLE_REFND(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                totSVFOP = rst.getLong("TOTAL");
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
//                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
//                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.SCARCOD = rst.getString("FRANQUICIA").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SUBTOTAL");
                    beanTkt.totSVFOP = totSVFOP;
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.TKT = rst.getString("TKT").trim();
//                    beanTkt.FORMA = rst.getString("FORMA").trim();
//                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.TKT;
                    beanTkt.SPNR = rst.getString("SPNR").trim();

                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.TRANC = rst.getString("TRANC").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());

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

    public List<A2290Filter> loadPX269SQP00698Table_CHGBAK(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQTYTKT = 0, totSVFOP = 0;
        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Match");
        hmDescEstadosSTVAL.put("2", "Settlement w/o Paying");
        hmDescEstadosSTVAL.put("3", "Settlement w/o Sales");
        hmDescEstadosSTVAL.put("4", "Match with Difference");
        hmDescEstadosSTVAL.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        hmDescDocType.put("R", "Refund");
        hmDescDocType.put("C", "Chargebak");
        hmDescDocType.put("A", "Acredit");
        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698TABLE_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                totSVFOP = rst.getLong("VALLOCAL");
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
//                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    if (hmDescEstadosSTVAL.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstadosSTVAL.get(rst.getString("STVAL").trim()).toString();
                    }
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SCARCOD = rst.getString("FRANQUICIA").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
//                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
//                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
//                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("VALLOCAL");
                    beanTkt.totSVFOP = totSVFOP;
                    beanTkt.CCIA = rst.getString("CCIA").trim();
//                    beanTkt.FORMA = rst.getString("FORMA").trim();
//                    beanTkt.SERIE = rst.getString("SERIE").trim();
//                    beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
                    beanTkt.SPNR = rst.getString("NOMPAX").trim();
                    beanTkt.MPF076TRAN = rst.getInt("TRAN");

                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.TRANC = rst.getString("TRANC").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());

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

    public List<A2290Filter> loadPX269SQP00698Table_ACREDIT(A2290Filter filter) throws SQLException, Exception {

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698TABLE_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                totSVFOP = rst.getLong("VALOR");
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
//                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    if (hmDescEstadosSTVAL.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstadosSTVAL.get(rst.getString("STVAL").trim()).toString();
                    }
                    beanTkt.SAGENT = rst.getString("IATA").trim();
                    beanTkt.SCARCOD = rst.getString("FRANQUICIA").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
//                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("VALOR");
                    beanTkt.totSVFOP = totSVFOP;
                    beanTkt.CCIA = rst.getString("CCIA").trim();
//                    beanTkt.FORMA = rst.getString("FORMA").trim();
//                    beanTkt.SERIE = rst.getString("SERIE").trim();
//                    beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
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
        hmDescReglas.put("*", "Intercompany");
        hmDescReglas.put("A", "By Spreadsheet");
        hmDescReglas.put("B", "By IATA/Sdate");
        hmDescReglas.put("C", "By WEB-OPER");

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

        HashMap<String, String> hmDescDebitType = new HashMap<String, String>();
        hmDescDebitType.put("RFND", "Reembolsos");
        hmDescDebitType.put("RFND-DNG", "Reembolso Denegado");
        hmDescDebitType.put("ACRED", "Acreditacion");
        hmDescDebitType.put("CBCK-ID", "Chargeback con ID");
        hmDescDebitType.put("CBCK-IDM", "Chargeback Media");
        hmDescDebitType.put("DB-TKT", "Debito con Tkt");
        hmDescDebitType.put("DOBLE-DB", "Doble Debito");
        hmDescDebitType.put("ANL-NS", "Anulacion no Satisfactoria");
        hmDescDebitType.put("R-CBCK", "Reversal Chargeback");
        hmDescDebitType.put("NO-IDN", "Debito No Identificado");

        //SE DEJA TAMPA COMO '134'
        HashMap<String, String> hmCCUST = new HashMap<String, String>();
        hmCCUST.put("TA01", "202");
//        hmCCUST.put("QT01", "729");
        hmCCUST.put("QT01", "134");
        hmCCUST.put("AV01", "134");
        hmCCUST.put("A500", "134");
        hmCCUST.put("AB01", "134");
        hmCCUST.put("LR01", "133");
        hmCCUST.put("2K01", "547");

        //loadPX269SQP00833
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_1(?,?,?,?,?,?,?,?,?,?,?)}";

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
                objRtn.SOCIETY = rs01.getString("SOCIETY");
                objRtn.SOCIETYL = rs01.getString("SOCIETYL");

                if (hmCCUST.containsKey(objRtn.SOCIETY)) {
                    objRtn.CCUSTCC = hmCCUST.get(objRtn.SOCIETY);
                } else {
                    objRtn.CCUSTCC = objRtn.CCUST;
                }

                objRtn.SAGENT = rs01.getString("SAGENT");
                objRtn.DESAGENT = objRtn.SAGENT + " - " + rs01.getString("DESAGENT");
                objRtn.SDATE = rs01.getString("SDATE");
                objRtn.TDOC = rs01.getString("TDOC");
                if (rs01.getString("TDOC").trim().equals("R")) {
                    objRtn.strPEM = "Refund";
                } else if (rs01.getString("TDOC").trim().equals("D")) {
                    objRtn.strPEM = "Debits";
                } else if (rs01.getString("TDOC").trim().equals("A")) {
                    objRtn.strPEM = "Acredit";
                } else if (rs01.getString("TDOC").trim().equals("C")) {
                    objRtn.strPEM = "Chargebak";
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
                objRtn.STVALS = rs01.getString("STVALS");
                objRtn.DEBTYPE = rs01.getString("DEBTYPE");
                objRtn.CHARNBR = rs01.getString("CHARNBR");
                objRtn.descDEBTYPE = rs01.getString("strDEBTYPE").trim();
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
                objRtn.NEGOC = rs01.getString("NEGOC").trim();
                objRtn.descNEGOC = rs01.getString("DESCNEGOC").trim();
                objRtn.COREP = rs01.getString("COREP").trim();
                objRtn.desCOREP = rs01.getString("DESCCOREP").trim();
                objRtn.TERMI = rs01.getString("TERMI").trim();
                objRtn.descTERMI = rs01.getString("DESCTERMI").trim();
                objRtn.DES_CERROR = rs01.getString("DES_CERROR").trim();
                objRtn.CERROIN = rs01.getString("CERROIN").trim();
                objRtn.DES_CERROIN = rs01.getString("DES_CERROIN").trim();
                objRtn.ACCNUMA = rs01.getString("ACCNUMA").trim();
                objRtn.QTYTKT = rs01.getInt("QTYTKT");
                objRtn.QTYDOC = rs01.getInt("QTYDOC");

                objRtn.COMMFAREC = rs01.getDouble("COMMFAREC");
                objRtn.TOTAL_ADM = rs01.getDouble("ADMTOTAL");

                objRtn.BANDOC = rs01.getString("BANDOC");
                objRtn.DATEC = rs01.getString("DATEC").trim();
                objRtn.TRANC = rs01.getString("TRANC").trim();
                objRtn.DATECI = rs01.getString("DATECI").trim();
                objRtn.TRANCI = rs01.getString("TRANCI").trim();

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

                objRtn.COREP = rs01.getString("COREP").trim();
                objRtn.CODPRO = rs01.getString("CODPRO").trim();
                objRtn.CCUSTPRO = rs01.getString("CCUSTPRO").trim();

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

    public A2290Filter loadPX269SQPVALIADJ(A2290Filter filter) throws SQLException, Exception {

        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //loadPX269SQP00833
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPVALID_ADJ_MPF113(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.SCURRENCY.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.MINF2 = rs01.getDouble("MINF2");
                objRtn.MAXF2 = rs01.getDouble("MAXF2");

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

    public String loadPX269SQP00834GRILL(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "";
        int count = 0;
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCF2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            for (int i = 0; i < filters.size(); i++) {
                cstmt = cnx.prepareCall(SQLCLL01);
                A2290Filter filter = filters.get(i);

                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt.setString(2, filter.RULE.trim());
                cstmt.setString(3, filter.TDOC.trim());
                cstmt.setString(4, filter.SDATE.trim());
                cstmt.setString(5, filter.PAYDATE.trim());
                cstmt.setString(6, filter.CODEBANK.trim());
                cstmt.setString(7, filter.MERCHNC.trim());
                cstmt.setString(8, filter.ACCNUMBER.trim());
                cstmt.setString(9, filter.TERMI.trim());
                cstmt.setString(10, filter.SAGENT.trim());
                cstmt.setString(11, filter.SCARCOD.trim());
                cstmt.setString(12, filter.SCARDN.trim());
                cstmt.setString(13, filter.SAUTHOC.trim());
                cstmt.setString(14, filter.SEQ.trim());
                cstmt.setString(15, filter.SCURRENCY.trim());
                cstmt.setDouble(16, filter.VFOP);
                cstmt.setString(17, user.getUserInfo().USR);
                cstmt.setString(18, Functions.getFechaActual());
                cstmt.setString(19, Functions.getHoraActual());
                cstmt.execute();
                cstmt.close();
                count++;
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    strMsj = "Successful," + count + " records have been reconciled.";

                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return strMsj;
    }

    public String loadPX269SQP00834ALL(A2290Filter filter, UserView user) throws SQLException, Exception {

        //REALIZA UN SELECT 
        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        lstTkts = this.loadPX269SQP00834SELECT(filter);

        //REALIZA UN INSERT 
        String proces = this.loadPX269SQP00834INSERT(lstTkts);

        //REALIZA CONCILIACION
        String strMsj = "";
        int count = 0;
        if (proces.equals("SUCCESSFUL")) {

            //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
            CallableStatement cstmt = null;
            Connection cnx = null;

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCF2ALL(?,?,?,?,?)}";

            try {
                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt = cnx.prepareCall(SQLCLL01);
                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt.setString(2, filter.RULE.trim());
                cstmt.setString(3, user.getUserInfo().USR);
                cstmt.setString(4, Functions.getFechaActual());
                cstmt.setString(5, Functions.getHoraActual());
                cstmt.execute();
                cstmt.close();
                count++;

            } catch (Exception e) {
                e.printStackTrace();
                strMsj = e.getMessage();
            } finally {
                if (cstmt != null) {
                    try {
                        cstmt.close();
                        strMsj = "Successful," + count + " records have been reconciled.";

                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
                pasarGarbageCollector();
            }

        }

        return strMsj;

    }

    public List<A2290Filter> loadPX269SQP00834SELECT(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter row;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".REPF2SELEC(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA.trim());
            cstmt.setString(4, filter.strSQL.trim());
            cstmt.setString(5, filter.SCARDNCOR);
            cstmt.setString(6, filter.SAUTHOC);
            cstmt.setString(7, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(8, filter.SCARDN);
            cstmt.setString(9, filter.SCURRENCY);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                // <editor-fold defaultstate="collapsed" desc="SELECT">
                row = new A2290Filter();
                row.ST_CCUST = rst.getString("CCUST").trim();
                row.ST_TDOC = rst.getString("TDOC").trim();
                row.ST_STVAL = rst.getString("STVAL").trim();
                row.ST_SCOUNTRY = rst.getString("SCOUNTRY").trim();
                row.ST_FTE = rst.getString("FTE").trim();
                row.ST_SDATE = rst.getString("SDATE").trim();
                row.ST_SAGENT = rst.getString("SAGENT").trim();
                row.ST_NEGOC = rst.getString("NEGOC").trim();
                row.ST_MERCHNC = rst.getString("MERCHNC").trim();
                row.ST_SUCMERCH = rst.getString("SUCMERCH").trim();
                row.ST_SPNR = rst.getString("SPNR").trim();
                row.ST_CODPRO = rst.getString("CODPRO").trim();
                row.ST_CCUSTPRO = rst.getString("CCUSTPRO").trim();
                row.ST_PRDA = rst.getString("PRDA").trim();
                row.ST_TRAN = rst.getString("TRAN").trim();
                row.ST_TDOCORG = rst.getString("TDOCORG").trim();
                row.ST_PAYDATE = rst.getString("PAYDATE").trim();
                row.ST_VALDATE = rst.getString("VALDATE").trim();
                row.ST_TIPOTAR = rst.getString("TIPOTAR").trim();
                row.ST_SCARCOD = rst.getString("SCARCOD").trim();
                row.ST_SCARDN = rst.getString("SCARDN").trim();
                row.ST_SCARDNCOR = rst.getString("SCARDNCOR").trim();
                row.ST_SAUTHOC = rst.getString("SAUTHOC").trim();
                row.ST_SDATEXP = rst.getString("SDATEXP").trim();
                row.ST_SOCIETY = rst.getString("SOCIETY").trim();
                row.ST_CODEBANK = rst.getString("CODEBANK").trim();
                row.ST_COREP = rst.getString("COREP").trim();
                row.ST_SOCIETYL = rst.getString("SOCIETYL").trim();
                row.ST_BANDOC = rst.getString("BANDOC").trim();
                row.ST_SEQ = rst.getString("SEQ").trim();
                row.ST_TERMI = rst.getString("TERMI").trim();
                row.ST_GENCON = rst.getString("GENCON").trim();
                row.ST_STCON = rst.getString("STCON").trim();
                row.ST_FCONT = rst.getString("FCONT").trim();
                row.ST_IDCONT = rst.getString("IDCONT").trim();
                row.ST_IDCDEB = rst.getString("IDCDEB").trim();
                row.ST_IDCADJ = rst.getString("IDCADJ").trim();
                row.ST_ACCNUMBER = rst.getString("ACCNUMBER").trim();
                row.ST_PERCONT = rst.getString("PERCONT").trim();
                row.ST_FDEBIT = rst.getString("FDEBIT").trim();
                row.ST_FAJUST = rst.getString("FAJUST").trim();
                row.ST_RED = rst.getString("RED").trim();
                row.ST_DATEF = rst.getString("DATEF").trim();
                row.ST_QTYTKT = rst.getString("QTYTKT").trim();
                row.ST_FREGLA = rst.getString("FREGLA").trim();
                row.ST_SCURRENCY = rst.getString("SCURRENCY").trim();
                row.ST_SVFOP = rst.getString("SVFOP").trim();
                row.ST_IVA = rst.getString("IVA").trim();
                row.ST_PROPINA = rst.getString("PROPINA").trim();
                row.ST_COMISION = rst.getString("COMISION").trim();
                row.ST_COMISTOTA = rst.getString("COMISTOTA").trim();
                row.ST_BASEFUE = rst.getString("BASEFUE").trim();
                row.ST_RTEFUE = rst.getString("RTEFUE").trim();
                row.ST_RTEIVA = rst.getString("RTEIVA").trim();
                row.ST_BASICA = rst.getString("BASICA").trim();
                row.ST_RTEICA = rst.getString("RTEICA").trim();
                row.ST_NETO = rst.getString("NETO").trim();
                row.ST_FAREO = rst.getString("FAREO").trim();
                row.ST_SVFOPC = rst.getString("SVFOPC").trim();
                row.ST_SVFOPD = rst.getString("SVFOPD").trim();
                row.ST_IVAC = rst.getString("IVAC").trim();
                row.ST_PROPINAC = rst.getString("PROPINAC").trim();
                row.ST_COMISIOC = rst.getString("COMISIOC").trim();
                row.ST_BASEFUEC = rst.getString("BASEFUEC").trim();
                row.ST_RTEFUEC = rst.getString("RTEFUEC").trim();
                row.ST_RTEIVAC = rst.getString("RTEIVAC").trim();
                row.ST_BASICAC = rst.getString("BASICAC").trim();
                row.ST_RTEICAC = rst.getString("RTEICAC").trim();
                row.ST_NETOC = rst.getString("NETOC").trim();
                row.ST_FAREC = rst.getString("FAREC").trim();
                row.ST_FAREDIFFC = rst.getString("FAREDIFFC").trim();
                row.ST_COMMFAREC = rst.getString("COMMFAREC").trim();
                row.ST_COMMDIFFC = rst.getString("COMMDIFFC").trim();
                row.ST_ADMTOTAL = rst.getString("ADMTOTAL").trim();
                row.ST_FLOAD = rst.getString("FLOAD").trim();
                row.ST_LDATE = rst.getString("LDATE").trim();
                row.ST_TDATE = rst.getString("TDATE").trim();
                row.ST_SORIG = rst.getString("SORIG").trim();
                row.ST_REASONREJ = rst.getString("REASONREJ").trim();
                row.ST_RECORDSTS = rst.getString("RECORDSTS").trim();
                row.ST_BSTVAL = rst.getString("BSTVAL").trim();
                row.ST_BDATEP = rst.getString("BDATEP").trim();
                row.ST_BAID = rst.getString("BAID").trim();
                row.ST_QTYDOC = rst.getString("QTYDOC").trim();
                row.ST_SDATE1 = rst.getString("SDATE1").trim();
                row.ST_SAUTHOC1 = rst.getString("SAUTHOC1").trim();
                row.ST_SCARCOD1 = rst.getString("SCARCOD1").trim();
                row.ST_FLOADE = rst.getString("FLOADE").trim();
                row.ST_LDATEE = rst.getString("LDATEE").trim();
                row.ST_RATECOM = rst.getString("RATECOM").trim();
                row.ST_COMISION1 = rst.getString("COMISION1").trim();
                row.ST_EMISOR = rst.getString("EMISOR").trim();
                row.ST_STATUSC = rst.getString("STATUSC").trim();
                row.ST_SDATEC = rst.getString("SDATEC").trim();
                row.ST_DEBTYPE = rst.getString("DEBTYPE").trim();
                row.ST_STVALS = rst.getString("STVALS").trim();
                row.ST_SDATES = rst.getString("SDATES").trim();
                row.ST_DATECS = rst.getString("DATECS").trim();
                row.ST_TRANCS = rst.getString("TRANCS").trim();
                row.ST_DATECI = rst.getString("DATECI").trim();
                row.ST_TRANCI = rst.getString("TRANCI").trim();
                row.ST_DATEC = rst.getString("DATEC").trim();
                row.ST_TRANC = rst.getString("TRANC").trim();
                row.ST_DATCO = rst.getString("DATCO").trim();
                row.ST_DATET = rst.getString("DATET").trim();
                row.ST_STATT = rst.getString("STATT").trim();
                row.ST_DATEL = rst.getString("DATEL").trim();
                row.ST_HORAL = rst.getString("HORAL").trim();
                row.ST_CCNCFT = rst.getString("CCNCFT").trim();
                row.ST_CCNTRN = rst.getString("CCNTRN").trim();
                row.ST_CERROIN = rst.getString("CERROIN").trim();
                row.ST_CERROR = rst.getString("CERROR").trim();
                row.ST_FSELEC = rst.getString("FSELEC").trim();
                row.ST_FECSELEC = rst.getString("FECSELEC").trim();
                row.ST_FUNDSTRGR = rst.getString("FUNDSTRGR").trim();
                row.ST_FUNDSTRGK = rst.getString("FUNDSTRGK").trim();
                row.ST_CHARNBR = rst.getString("CHARNBR").trim();
                row.ST_STVALCHG = rst.getString("STVALCHG").trim();
                row.ST_UAUDIT = rst.getString("UAUDIT").trim();
                row.ST_ORDERID = rst.getString("ORDERID").trim();
                row.ST_CCIA = rst.getString("CCIA").trim();
                row.ST_FORMA = rst.getString("FORMA").trim();
                row.ST_SERIE = rst.getString("SERIE").trim();
                row.ST_LIQUIDACIO = rst.getString("LIQUIDACIO").trim();
                row.ST_MONEDAPAGO = rst.getString("MONEDAPAGO").trim();
                row.ST_IMPORTEPAG = rst.getString("IMPORTEPAG").trim();
                row.ST_ACCNUMA = rst.getString("ACCNUMA").trim();
                row.ST_USCR = rst.getString("USCR").trim();
                row.ST_FECR = rst.getString("FECR").trim();
                row.ST_HOCR = rst.getString("HOCR").trim();
                row.ST_PGMCR = rst.getString("PGMCR").trim();
                row.ST_USUP = rst.getString("USUP").trim();
                row.ST_FEUP = rst.getString("FEUP").trim();
                row.ST_HOUP = rst.getString("HOUP").trim();
                row.ST_PGMUP = rst.getString("PGMUP").trim();
                lstTkts.add(row);
                // </editor-fold>

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

        return lstTkts;
    }

    public String loadPX269SQP00834INSERT(List<A2290Filter> listaData) throws SQLException, Exception {

        CallableStatement cstmt = null;
        ResultSet rst = null;
        String msg = "SUCCESSFUL";

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".REPF2INSERT("
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";

        Connection cnx = null;

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            for (int i = 0; i < listaData.size(); i++) {

                try {

                    // <editor-fold defaultstate="collapsed" desc="INSERT">
                    A2290Filter object = listaData.get(i);
                    cstmt.setString(1, object.ST_CCUST.trim());
                    cstmt.setString(2, object.ST_TDOC.trim());
                    cstmt.setString(3, object.ST_STVAL.trim());
                    cstmt.setString(4, object.ST_SCOUNTRY.trim());
                    cstmt.setString(5, object.ST_FTE.trim());
                    cstmt.setString(6, object.ST_SDATE.trim());
                    cstmt.setString(7, object.ST_SAGENT.trim());
                    cstmt.setString(8, object.ST_NEGOC.trim());
                    cstmt.setString(9, object.ST_MERCHNC.trim());
                    cstmt.setString(10, object.ST_SUCMERCH.trim());
                    cstmt.setString(11, object.ST_SPNR.trim());
                    cstmt.setString(12, object.ST_CODPRO.trim());
                    cstmt.setString(13, object.ST_CCUSTPRO.trim());
                    cstmt.setString(14, object.ST_PRDA.trim());
                    cstmt.setString(15, object.ST_TRAN.trim());
                    cstmt.setString(16, object.ST_TDOCORG.trim());
                    cstmt.setString(17, object.ST_PAYDATE.trim());
                    cstmt.setString(18, object.ST_VALDATE.trim());
                    cstmt.setString(19, object.ST_TIPOTAR.trim());
                    cstmt.setString(20, object.ST_SCARCOD.trim());
                    cstmt.setString(21, object.ST_SCARDN.trim());
                    cstmt.setString(22, object.ST_SCARDNCOR.trim());
                    cstmt.setString(23, object.ST_SAUTHOC.trim());
                    cstmt.setString(24, object.ST_SDATEXP.trim());
                    cstmt.setString(25, object.ST_SOCIETY.trim());
                    cstmt.setString(26, object.ST_CODEBANK.trim());
                    cstmt.setString(27, object.ST_COREP.trim());
                    cstmt.setString(28, object.ST_SOCIETYL.trim());
                    cstmt.setString(29, object.ST_BANDOC.trim());
                    cstmt.setString(30, object.ST_SEQ.trim());
                    cstmt.setString(31, object.ST_TERMI.trim());
                    cstmt.setString(32, object.ST_GENCON.trim());
                    cstmt.setString(33, object.ST_STCON.trim());
                    cstmt.setString(34, object.ST_FCONT.trim());
                    cstmt.setString(35, object.ST_IDCONT.trim());
                    cstmt.setString(36, object.ST_IDCDEB.trim());
                    cstmt.setString(37, object.ST_IDCADJ.trim());
                    cstmt.setString(38, object.ST_ACCNUMBER.trim());
                    cstmt.setString(39, object.ST_PERCONT.trim());
                    cstmt.setString(40, object.ST_FDEBIT.trim());
                    cstmt.setString(41, object.ST_FAJUST.trim());
                    cstmt.setString(42, object.ST_RED.trim());
                    cstmt.setString(43, object.ST_DATEF.trim());
                    cstmt.setString(44, object.ST_QTYTKT.trim());
                    cstmt.setString(45, object.ST_FREGLA.trim());
                    cstmt.setString(46, object.ST_SCURRENCY.trim());
                    cstmt.setString(47, object.ST_SVFOP.trim());
                    cstmt.setString(48, object.ST_IVA.trim());
                    cstmt.setString(49, object.ST_PROPINA.trim());
                    cstmt.setString(50, object.ST_COMISION.trim());
                    cstmt.setString(51, object.ST_COMISTOTA.trim());
                    cstmt.setString(52, object.ST_BASEFUE.trim());
                    cstmt.setString(53, object.ST_RTEFUE.trim());
                    cstmt.setString(54, object.ST_RTEIVA.trim());
                    cstmt.setString(55, object.ST_BASICA.trim());
                    cstmt.setString(56, object.ST_RTEICA.trim());
                    cstmt.setString(57, object.ST_NETO.trim());
                    cstmt.setString(58, object.ST_FAREO.trim());
                    cstmt.setString(59, object.ST_SVFOPC.trim());
                    cstmt.setString(60, object.ST_SVFOPD.trim());
                    cstmt.setString(61, object.ST_IVAC.trim());
                    cstmt.setString(62, object.ST_PROPINAC.trim());
                    cstmt.setString(63, object.ST_COMISIOC.trim());
                    cstmt.setString(64, object.ST_BASEFUEC.trim());
                    cstmt.setString(65, object.ST_RTEFUEC.trim());
                    cstmt.setString(66, object.ST_RTEIVAC.trim());
                    cstmt.setString(67, object.ST_BASICAC.trim());
                    cstmt.setString(68, object.ST_RTEICAC.trim());
                    cstmt.setString(69, object.ST_NETOC.trim());
                    cstmt.setString(70, object.ST_FAREC.trim());
                    cstmt.setString(71, object.ST_FAREDIFFC.trim());
                    cstmt.setString(72, object.ST_COMMFAREC.trim());
                    cstmt.setString(73, object.ST_COMMDIFFC.trim());
                    cstmt.setString(74, object.ST_ADMTOTAL.trim());
                    cstmt.setString(75, object.ST_FLOAD.trim());
                    cstmt.setString(76, object.ST_LDATE.trim());
                    cstmt.setString(77, object.ST_TDATE.trim());
                    cstmt.setString(78, object.ST_SORIG.trim());
                    cstmt.setString(79, object.ST_REASONREJ.trim());
                    cstmt.setString(80, object.ST_RECORDSTS.trim());
                    cstmt.setString(81, object.ST_BSTVAL.trim());
                    cstmt.setString(82, object.ST_BDATEP.trim());
                    cstmt.setString(83, object.ST_BAID.trim());
                    cstmt.setString(84, object.ST_QTYDOC.trim());
                    cstmt.setString(85, object.ST_SDATE1.trim());
                    cstmt.setString(86, object.ST_SAUTHOC1.trim());
                    cstmt.setString(87, object.ST_SCARCOD1.trim());
                    cstmt.setString(88, object.ST_FLOADE.trim());
                    cstmt.setString(89, object.ST_LDATEE.trim());
                    cstmt.setString(90, object.ST_RATECOM.trim());
                    cstmt.setString(91, object.ST_COMISION1.trim());
                    cstmt.setString(92, object.ST_EMISOR.trim());
                    cstmt.setString(93, object.ST_STATUSC.trim());
                    cstmt.setString(94, object.ST_SDATEC.trim());
                    cstmt.setString(95, object.ST_DEBTYPE.trim());
                    cstmt.setString(96, object.ST_STVALS.trim());
                    cstmt.setString(97, object.ST_SDATES.trim());
                    cstmt.setString(98, object.ST_DATECS.trim());
                    cstmt.setString(99, object.ST_TRANCS.trim());
                    cstmt.setString(100, object.ST_DATECI.trim());
                    cstmt.setString(101, object.ST_TRANCI.trim());
                    cstmt.setString(102, object.ST_DATEC.trim());
                    cstmt.setString(103, object.ST_TRANC.trim());
                    cstmt.setString(104, object.ST_DATCO.trim());
                    cstmt.setString(105, object.ST_DATET.trim());
                    cstmt.setString(106, object.ST_STATT.trim());
                    cstmt.setString(107, object.ST_DATEL.trim());
                    cstmt.setString(108, object.ST_HORAL.trim());
                    cstmt.setString(109, object.ST_CCNCFT.trim());
                    cstmt.setString(110, object.ST_CCNTRN.trim());
                    cstmt.setString(111, object.ST_CERROIN.trim());
                    cstmt.setString(112, object.ST_CERROR.trim());
                    cstmt.setString(113, object.ST_FSELEC.trim());
                    cstmt.setString(114, object.ST_FECSELEC.trim());
                    cstmt.setString(115, object.ST_FUNDSTRGR.trim());
                    cstmt.setString(116, object.ST_FUNDSTRGK.trim());
                    cstmt.setString(117, object.ST_CHARNBR.trim());
                    cstmt.setString(118, object.ST_STVALCHG.trim());
                    cstmt.setString(119, object.ST_UAUDIT.trim());
                    cstmt.setString(120, object.ST_ORDERID.trim());
                    cstmt.setString(121, object.ST_CCIA.trim());
                    cstmt.setString(122, object.ST_FORMA.trim());
                    cstmt.setString(123, object.ST_SERIE.trim());
                    cstmt.setString(124, object.ST_LIQUIDACIO.trim());
                    cstmt.setString(125, object.ST_MONEDAPAGO.trim());
                    cstmt.setString(126, object.ST_IMPORTEPAG.trim());
                    cstmt.setString(127, object.ST_ACCNUMA.trim());
                    cstmt.setString(128, object.ST_USCR.trim());
                    cstmt.setString(129, object.ST_FECR.trim());
                    cstmt.setString(130, object.ST_HOCR.trim());
                    cstmt.setString(131, object.ST_PGMCR.trim());
                    cstmt.setString(132, object.ST_USUP.trim());
                    cstmt.setString(133, object.ST_FEUP.trim());
                    cstmt.setString(134, object.ST_HOUP.trim());
                    cstmt.setString(135, object.ST_PGMUP.trim());

                    cstmt.execute();
                    // </editor-fold>

                    System.out.println("reg:" + i);

                } catch (Exception e) {
                    if (e.getMessage().contains("valor de clave duplicada")) {
                        System.out.println("Duplicado");
                    } else {
                        e.printStackTrace();
                        e.getMessage();
                    }
                }
            }
            cstmt.close();

        } catch (Exception e) {
            msg = " --Fallo insertando registros-- ";
            e.printStackTrace();
            e.getMessage();
        } finally {
            cstmt.close();
            cnx.close();
        }

        return msg;
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF101(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(17, filter.FREGLA.trim());
            cstmt.setString(18, filter.SAGENT.trim());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF100_V1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, "U");
                cstmt2.setString(2, filterC.CCUSTCC.trim());
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
                cstmt2.setString(13, filterC.COREP.trim());
                cstmt2.setString(14, filterC.CODPRO.trim());
                cstmt2.setString(15, filterC.CCUSTPRO.trim());
                cstmt2.setString(16, filterC.DATECI.trim());
                cstmt2.setString(17, filterC.TRANCI.trim());
                cstmt2.setString(18, user.getUserInfo().USR);
                cstmt2.setString(19, Functions.getFechaActual());
                cstmt2.setString(20, Functions.getHoraActual());
                cstmt2.setString(21, filter.strComment.toUpperCase());

                cstmt2.execute();
                cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
            }

            A2290Filter filterA = filters.get(filters.size() - 1);

            if (filterA.ATDOC.equals("A")) {
                String SQLCLL03 = "{CALL " + session.getMainLibrary() + ".SQP00834INSERTMPF100_V1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

                cnx3 = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3 = cnx3.prepareCall(SQLCLL03);

                cstmt3.setString(1, "U");
//                cstmt3.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt3.setString(2, filterA.CCUSTCC.trim());
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

    public String loadPX269SQP00834_TKTTW(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        try {
            A2290Filter filter = filters.get(0);
            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF100_TKTTW(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
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
                String SQLCLL03 = "{CALL " + session.getMainLibrary() + ".SQP00834INSERTMPF100_TKTTW(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
        String strMsj = "UNDER CONSTRUCTION", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF101_REFND(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(12, filter.DEBTYPE.trim());
            cstmt.setInt(13, filters.size());
            cstmt.setString(14, user.getUserInfo().USR);
            cstmt.setString(15, Functions.getFechaActual());
            cstmt.setString(16, Functions.getHoraActual());
            cstmt.setString(17, filter.strComment.toUpperCase());
            cstmt.setString(18, filter.TDOC.trim());
            cstmt.registerOutParameter(19, Types.VARCHAR);
            cstmt.execute();
            strMsj = cstmt.getString(19);
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución
            if (!strMsj.contains("ROWS AFFECTED") && !filter.DEBTYPE.trim().equals("DB-TKT") && !filter.DEBTYPE.trim().contains("DBLEDB") && !filter.DEBTYPE.trim().equals("NO-IDN")) {
                String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF100_REFND(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                    cstmt2.setString(13, filterC.COREP.trim());
                    cstmt2.setString(14, filterC.CODPRO.trim());
                    cstmt2.setString(15, filterC.CCUSTPRO.trim());
                    cstmt2.setString(16, user.getUserInfo().USR);
                    cstmt2.setString(17, Functions.getFechaActual());
                    cstmt2.setString(18, Functions.getHoraActual());
                    cstmt2.setString(19, filter.strComment.toUpperCase());

                    cstmt2.execute();
                    cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    if (cstmt2 != null) {
                        try {
                            cstmt2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        ;
                    }

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
        String strMsj = "UNDER CONSTRUCTION", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF101_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(12, filter.DEBTYPE.trim());
            cstmt.setInt(13, filters.size());
            cstmt.setString(14, user.getUserInfo().USR);
            cstmt.setString(15, Functions.getFechaActual());
            cstmt.setString(16, Functions.getHoraActual());
            cstmt.setString(17, filter.strComment.toUpperCase());
            cstmt.setString(18, filter.TDOC.trim());
            cstmt.registerOutParameter(19, Types.VARCHAR);
            cstmt.execute();
            strMsj = cstmt.getString(19);
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución
            if (!strMsj.contains("ROWS AFFECTED") && !filter.DEBTYPE.trim().equals("DB-TKT") && !filter.DEBTYPE.trim().contains("DBLEDB") && !filter.DEBTYPE.trim().equals("NO-IDN")) {
                String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF100_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                    cstmt2.setString(13, filterC.COREP.trim());
                    cstmt2.setString(14, filterC.CODPRO.trim());
                    cstmt2.setString(15, filterC.CCUSTPRO.trim());
                    cstmt2.setString(16, user.getUserInfo().USR);
                    cstmt2.setString(17, Functions.getFechaActual());
                    cstmt2.setString(18, Functions.getHoraActual());
                    cstmt2.setString(19, filter.strComment.toUpperCase());
                    cstmt2.setInt(20, filterC.MPF076TRAN);
                    cstmt2.setString(21, filterC.SPNR.trim());

                    cstmt2.execute();
                    cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    if (cstmt2 != null) {
                        try {
                            cstmt2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        ;
                    }
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
        String strMsj = "UNDER CONSTRUCTION", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF101_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(12, filter.DEBTYPE.trim());
            cstmt.setInt(13, filters.size());
            cstmt.setString(14, user.getUserInfo().USR);
            cstmt.setString(15, Functions.getFechaActual());
            cstmt.setString(16, Functions.getHoraActual());
            cstmt.setString(17, filter.strComment.toUpperCase());
            cstmt.setString(18, filter.TDOC.trim());
            cstmt.registerOutParameter(19, Types.VARCHAR);
            cstmt.execute();
            strMsj = cstmt.getString(19);
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución
            if (!strMsj.contains("ROWS AFFECTED") && !filter.DEBTYPE.trim().equals("DB-TKT") && !filter.DEBTYPE.trim().contains("DBLEDB") && !filter.DEBTYPE.trim().equals("NO-IDN")) {
                String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP00834CONCILIMPF100_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                    cstmt2.setString(13, filterC.COREP.trim());
                    cstmt2.setString(14, filterC.CODPRO.trim());
                    cstmt2.setString(15, filterC.CCUSTPRO.trim());
                    cstmt2.setString(16, user.getUserInfo().USR);
                    cstmt2.setString(17, Functions.getFechaActual());
                    cstmt2.setString(18, Functions.getHoraActual());
                    cstmt2.setString(19, filter.strComment.toUpperCase());
                    cstmt2.setInt(20, filterC.MPF077TRAN);
                    cstmt2.setString(21, filterC.SPNR.trim());

                    cstmt2.execute();
                    cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
                }

            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    if (cstmt2 != null) {
                        try {
                            cstmt2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        ;
                    }
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

            String SQLCLL03 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF120(?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            A2290Filter filterI = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL03);

            cstmt.setString(1, "R");
            cstmt.setString(2, filterI.CCUSTCC.trim());
            cstmt.setString(3, filterI.DATEC.trim());
            cstmt.setString(4, filterI.TRANC.trim());
            cstmt.setString(5, filterI.BANDOC.trim());

            cstmt.execute();

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF100(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt = cnx.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt.setString(1, "R");
                cstmt.setString(2, filterC.CCUSTCC.trim());
                cstmt.setString(3, filterC.PRDA.trim());
                cstmt.setString(4, filterC.SCARDN.trim());
                cstmt.setString(5, filterC.SAUTHOC.trim());
                cstmt.setDouble(6, filterC.VFOP);
                cstmt.setString(7, filterC.SDATE.trim());
                cstmt.setString(8, filterC.DATEC.trim());
                cstmt.setString(9, filterC.TICKET.trim());
                cstmt.setString(10, filterC.TRANC.trim());
                cstmt.setString(11, filterC.BANDOC.trim());
                cstmt.setString(12, filter.CERROR);
                cstmt.setString(13, user.getUserInfo().USR);
                cstmt.setString(14, Functions.getFechaActual());
                cstmt.setString(15, Functions.getHoraActual());
                cstmt.setString(16, filter.strComment.toUpperCase());

                cstmt.execute();
//                cstmt.close(); // Cerrar el CallableStatement después de cada ejecución
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    cnx.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return strMsj;
    }

    public String loadPX269SQP05117_REFND(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        Connection cnx = null;
        Connection cnx2 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF101_REFND(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.PRDA.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.DATEC.trim());
            cstmt.setString(5, filter.TRANC.trim());
            cstmt.setDouble(6, filter.VFOP);
            cstmt.setString(7, filter.SAUTHOCM.trim());
            cstmt.setString(8, filter.SCARDNM.trim());
            cstmt.setString(9, filter.CERROR);
            cstmt.setInt(10, filters.size());
            cstmt.setString(11, user.getUserInfo().USR);
            cstmt.setString(12, Functions.getFechaActual());
            cstmt.setString(13, Functions.getHoraActual());
            cstmt.setString(14, filter.strComment.toUpperCase());
            cstmt.setString(15, filter.TDOC.trim());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF100_REFND(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(2, filterC.PRDA.trim());
                cstmt2.setString(3, filterC.SCARDN.trim());
                cstmt2.setString(4, filterC.SAUTHOC.trim());
                cstmt2.setDouble(5, filterC.VFOP);
                cstmt2.setString(6, filterC.SDATE.trim());
                cstmt2.setString(7, filterC.DATEC.trim());
                cstmt2.setString(8, filterC.TICKET.trim());
                cstmt2.setString(9, filterC.TRANC.trim());
                cstmt2.setString(10, filterC.BANDOC.trim());
                cstmt2.setString(11, filter.CERROR);
                cstmt2.setString(12, user.getUserInfo().USR);
                cstmt2.setString(13, Functions.getFechaActual());
                cstmt2.setString(14, Functions.getHoraActual());
                cstmt2.setString(15, filter.strComment.toUpperCase());

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

    public String loadPX269SQP05117_CHGBAK(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        Connection cnx = null;
        Connection cnx2 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF101_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.PRDA.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.DATEC.trim());
            cstmt.setString(5, filter.TRANC.trim());
            cstmt.setDouble(6, filter.VFOP);
            cstmt.setString(7, filter.SAUTHOCM.trim());
            cstmt.setString(8, filter.SCARDNM.trim());
            cstmt.setString(9, filter.CERROR);
            cstmt.setInt(10, filters.size());
            cstmt.setString(11, user.getUserInfo().USR);
            cstmt.setString(12, Functions.getFechaActual());
            cstmt.setString(13, Functions.getHoraActual());
            cstmt.setString(14, filter.strComment.toUpperCase());
            cstmt.setString(15, filter.TDOC.trim());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF100_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(2, filterC.PRDA.trim());
                cstmt2.setString(3, filterC.SCARDN.trim());
                cstmt2.setString(4, filterC.SAUTHOC.trim());
                cstmt2.setDouble(5, filterC.VFOP);
                cstmt2.setString(6, filterC.SDATE.trim());
                cstmt2.setString(7, filterC.DATEC.trim());
                cstmt2.setString(8, filterC.TICKET.trim());
                cstmt2.setString(9, filterC.TRANC.trim());
                cstmt2.setString(10, filterC.BANDOC.trim());
                cstmt2.setString(11, filter.CERROR);
                cstmt2.setString(12, user.getUserInfo().USR);
                cstmt2.setString(13, Functions.getFechaActual());
                cstmt2.setString(14, Functions.getHoraActual());
                cstmt2.setString(15, filter.strComment.toUpperCase());
                cstmt2.setInt(16, filterC.MPF076TRAN);
                cstmt2.setString(17, filterC.SPNR.trim());

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

    public String loadPX269SQP05117_ACREDIT(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        Connection cnx = null;
        Connection cnx2 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF101_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.PRDA.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.DATEC.trim());
            cstmt.setString(5, filter.TRANC.trim());
            cstmt.setDouble(6, filter.VFOP);
            cstmt.setString(7, filter.SAUTHOCM.trim());
            cstmt.setString(8, filter.SCARDNM.trim());
            cstmt.setString(9, filter.CERROR);
            cstmt.setInt(10, filters.size());
            cstmt.setString(11, user.getUserInfo().USR);
            cstmt.setString(12, Functions.getFechaActual());
            cstmt.setString(13, Functions.getHoraActual());
            cstmt.setString(14, filter.strComment.toUpperCase());
            cstmt.setString(15, filter.TDOC.trim());

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF100_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(2, filterC.PRDA.trim());
                cstmt2.setString(3, filterC.SCARDN.trim());
                cstmt2.setString(4, filterC.SAUTHOC.trim());
                cstmt2.setDouble(5, filterC.VFOP);
                cstmt2.setString(6, filterC.SDATE.trim());
                cstmt2.setString(7, filterC.DATEC.trim());
                cstmt2.setString(8, filterC.TICKET.trim());
                cstmt2.setString(9, filterC.TRANC.trim());
                cstmt2.setString(10, filterC.BANDOC.trim());
                cstmt2.setString(11, filter.CERROR);
                cstmt2.setString(12, user.getUserInfo().USR);
                cstmt2.setString(13, Functions.getFechaActual());
                cstmt2.setString(14, Functions.getHoraActual());
                cstmt2.setString(15, filter.strComment.toUpperCase());
                cstmt2.setInt(16, filterC.MPF077TRAN);
                cstmt2.setString(17, filterC.SPNR.trim());

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

    public String loadPX269SQP05117OnlyLiq_REFND(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF101_REFND(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.PRDA.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.DATEC.trim());
            cstmt.setString(5, filter.TRANC.trim());
            cstmt.setDouble(6, filter.VFOP);
            cstmt.setString(7, filter.SAUTHOCM.trim());
            cstmt.setString(8, filter.SCARDNM.trim());
            cstmt.setString(9, filter.CERROR);
            cstmt.setInt(10, filters.size());
            cstmt.setString(11, user.getUserInfo().USR);
            cstmt.setString(12, Functions.getFechaActual());
            cstmt.setString(13, Functions.getHoraActual());
            cstmt.setString(14, filter.strComment.toUpperCase());
            cstmt.setString(15, filter.TDOC.trim());

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

    public String loadPX269SQP05117OnlyLiq_CHGBAK(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF101_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.PRDA.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.DATEC.trim());
            cstmt.setString(5, filter.TRANC.trim());
            cstmt.setDouble(6, filter.VFOP);
            cstmt.setString(7, filter.SAUTHOCM.trim());
            cstmt.setString(8, filter.SCARDNM.trim());
            cstmt.setString(9, filter.CERROR);
            cstmt.setInt(10, filters.size());
            cstmt.setString(11, user.getUserInfo().USR);
            cstmt.setString(12, Functions.getFechaActual());
            cstmt.setString(13, Functions.getHoraActual());
            cstmt.setString(14, filter.strComment.toUpperCase());
            cstmt.setString(15, filter.TDOC.trim());

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

    public String loadPX269SQP05117OnlyLiq_ACREDIT(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05117DECONCILIMPF101_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter = filters.get(0);

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.PRDA.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.DATEC.trim());
            cstmt.setString(5, filter.TRANC.trim());
            cstmt.setDouble(6, filter.VFOP);
            cstmt.setString(7, filter.SAUTHOCM.trim());
            cstmt.setString(8, filter.SCARDNM.trim());
            cstmt.setString(9, filter.CERROR);
            cstmt.setInt(10, filters.size());
            cstmt.setString(11, user.getUserInfo().USR);
            cstmt.setString(12, Functions.getFechaActual());
            cstmt.setString(13, Functions.getHoraActual());
            cstmt.setString(14, filter.strComment.toUpperCase());
            cstmt.setString(15, filter.TDOC.trim());

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
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                    beanTkt.TERMI = rst.getString("TERMI").trim();
                    beanTkt.DATEF = rst.getString("DATEF").trim();
                    beanTkt.PENDINGDAYS = rst.getString("PENDINGDAYS").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
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
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");

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

    public List<A2290Filter> loadPX263SQP00652DEBITS(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQSALES = 0, lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotQDIFF = 0, lngTotQPEND = 0;
        long lngTotQSALESRF = 0, lngTotQMATCHRF = 0, lngTotQMANUALRF = 0, lngTotQDIFFRF = 0, lngTotQPENDRF = 0;
        long lngTotQSALESCH = 0, lngTotQMATCHCH = 0, lngTotQMANUALCH = 0, lngTotQDIFFCH = 0, lngTotQPENDCH = 0;
        long lngTotQSALESAC = 0, lngTotQMATCHAC = 0, lngTotQMANUALAC = 0, lngTotQDIFFAC = 0, lngTotQPENDAC = 0;
        long lngTotQPOLIC = 0, lngTotQPOLIPE = 0;
        String Fec = "";

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00652DEBITS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.VARCHAR);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(4, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_PAYMENT.trim());
            cstmt.setString(8, filter.IN_CARDC.trim());
            cstmt.setString(9, filter.IN_TICKET.trim());
            cstmt.setString(10, filter.IN_FTE.trim());
            cstmt.setString(11, filter.IN_AFTE.trim());
            cstmt.setString(12, filter.IN_CARDN.trim());
            cstmt.setString(13, filter.IN_STVAL.trim());
            cstmt.setString(14, filter.IN_MERCHN.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());
            cstmt.setString(16, "");

            cstmt.setInt(17, filter.page.PAGNUM);
            cstmt.setInt(18, filter.page.PAGROW);
            cstmt.setInt(19, filter.page.TOTPAG);
            cstmt.setInt(20, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            Fec = cstmt.getString(16);
            filter.page.PAGNUM = cstmt.getInt(17);
            filter.page.PAGROW = cstmt.getInt(18);
            filter.page.TOTPAG = cstmt.getInt(19);
            filter.page.TOTROW = cstmt.getInt(20);

            while (rst.next()) {
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQPEND = rst.getLong("QPEND");

                lngTotQSALESRF = rst.getLong("QSALESRF");
                lngTotQMATCHRF = rst.getLong("QMATCHRF");
                lngTotQMANUALRF = rst.getLong("QMANUALRF");
                lngTotQDIFFRF = rst.getLong("QDIFFRF");
                lngTotQPENDRF = rst.getLong("QPENDRF");

                lngTotQSALESCH = rst.getLong("QSALESCH");
                lngTotQMATCHCH = rst.getLong("QMATCHCH");
                lngTotQMANUALCH = rst.getLong("QMANUALCH");
                lngTotQDIFFCH = rst.getLong("QDIFFCH");
                lngTotQPENDCH = rst.getLong("QPENDCH");

                lngTotQSALESAC = rst.getLong("QSALESAC");
                lngTotQMATCHAC = rst.getLong("QMATCHAC");
                lngTotQMANUALAC = rst.getLong("QMANUALAC");
                lngTotQDIFFAC = rst.getLong("QDIFFAC");
                lngTotQPENDAC = rst.getLong("QPENDAC");

                lngTotQPOLIC = rst.getLong("QPOLIC");
                lngTotQPOLIPE = rst.getLong("QPOLIPE");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strDescripcion = "  " + Functions.getMonthConvert(Fec);
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.IN_SDATE = rst.getString("SDATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();

                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQPEND = rst.getLong("QPEND");

                    beanTkt.lngQSALESRF = rst.getLong("QSALESRF");
                    beanTkt.lngQMATCHRF = rst.getLong("QMATCHRF");
                    beanTkt.lngQDIFFRF = rst.getLong("QDIFFRF");
                    beanTkt.lngQMANUALRF = rst.getLong("QMANUALRF");
                    beanTkt.lngQPENDRF = rst.getLong("QPENDRF");

                    beanTkt.lngQSALESCH = rst.getLong("QSALESCH");
                    beanTkt.lngQMATCHCH = rst.getLong("QMATCHCH");
                    beanTkt.lngQDIFFCH = rst.getLong("QDIFFCH");
                    beanTkt.lngQMANUALCH = rst.getLong("QMANUALCH");
                    beanTkt.lngQPENDCH = rst.getLong("QPENDCH");

                    beanTkt.lngQSALESAC = rst.getLong("QSALESAC");
                    beanTkt.lngQMATCHAC = rst.getLong("QMATCHAC");
                    beanTkt.lngQDIFFAC = rst.getLong("QDIFFAC");
                    beanTkt.lngQMANUALAC = rst.getLong("QMANUALAC");
                    beanTkt.lngQPENDAC = rst.getLong("QPENDAC");

                    beanTkt.lngQPOLIC = rst.getLong("QPOLIC");
                    beanTkt.lngQPOLIPE = rst.getLong("QPOLIPE");

                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;

                    beanTkt.lngTotQSALESRF = lngTotQSALESRF;
                    beanTkt.lngTotQMATCHRF = lngTotQMATCHRF;
                    beanTkt.lngTotQMANUALRF = lngTotQMANUALRF;
                    beanTkt.lngTotQPENDRF = lngTotQPENDRF;

                    beanTkt.lngTotQSALESCH = lngTotQSALESCH;
                    beanTkt.lngTotQMATCHCH = lngTotQMATCHCH;
                    beanTkt.lngTotQMANUALCH = lngTotQMANUALCH;
                    beanTkt.lngTotQPENDCH = lngTotQPENDCH;

                    beanTkt.lngTotQSALESAC = lngTotQSALESAC;
                    beanTkt.lngTotQMATCHAC = lngTotQMATCHAC;
                    beanTkt.lngTotQMANUALAC = lngTotQMANUALAC;
                    beanTkt.lngTotQPENDAC = lngTotQPENDAC;

                    beanTkt.lngTotQPOLIC = lngTotQPOLIC;
                    beanTkt.lngTotQPOLIPE = lngTotQPOLIPE;

                    beanTkt.lngQMATCHPercent = (beanTkt.lngQSALES > 0) ? (beanTkt.lngQMATCH * 100.0) / beanTkt.lngQSALES : 0.00;

                    beanTkt.lngQMATCHPercentRF = (beanTkt.lngQSALESRF > 0) ? (beanTkt.lngQMATCHRF * 100.0) / beanTkt.lngQSALESRF : 0.00;
                    beanTkt.lngQMATCHPercentCH = (beanTkt.lngQSALESCH > 0) ? (beanTkt.lngQMATCHCH * 100.0) / beanTkt.lngQSALESCH : 0.00;
                    beanTkt.lngQMATCHPercentAC = (beanTkt.lngQSALESAC > 0) ? (beanTkt.lngQMATCHAC * 100.0) / beanTkt.lngQSALESAC : 0.00;

                    beanTkt.lngTotQMATCHPercent = (lngTotQSALES > 0) ? (lngTotQMATCH * 100.0) / lngTotQSALES : 0.00;
                    beanTkt.lngTotQMATCHPercentRF = (lngTotQSALESRF > 0) ? (lngTotQMATCHRF * 100.0) / lngTotQSALESRF : 0.00;
                    beanTkt.lngTotQMATCHPercentCH = (lngTotQSALESCH > 0) ? (lngTotQMATCHCH * 100.0) / lngTotQSALESCH : 0.00;
                    beanTkt.lngTotQMATCHPercentAC = (lngTotQSALESAC > 0) ? (lngTotQMATCHAC * 100.0) / lngTotQSALESAC : 0.00;

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

    public List<A2290Filter> loadPX263SQP00676_DEBITS(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        long lngTotCantFake = 0;
        long dblTotSVFOP = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        String tipFecha = "Debits";

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconcili.");
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00676_DEBITS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim()); //ADATE
            cstmt.setString(3, filter.IN_SDATE.trim());//201510
            cstmt.setString(4, filter.IN_TDOC.trim());//S
            cstmt.setString(5, filter.IN_COUNTRY.trim());
            cstmt.setString(6, filter.IN_PAYMENT.trim());//CC
            cstmt.setString(7, filter.IN_CARDN.trim());
            cstmt.setString(8, filter.IN_CARDC.trim());
            cstmt.setString(9, filter.IN_TICKET.trim());
            cstmt.setString(10, filter.IN_FTE.trim());
            cstmt.setString(11, filter.IN_AFTE.trim());
            cstmt.setString(12, filter.IN_STVAL.trim());//4
            cstmt.setString(13, filter.IN_MERCHN.trim());
            cstmt.setString(14, filter.CERROR.trim());
            cstmt.setString(15, filter.IN_AUTHNBR.trim());
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
                lngTotCantFake = rst.getLong("CANT");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.CERROR = filter.CERROR.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    if (rst.getString("COUNTRY").trim().isEmpty()) {
                        beanTkt.SCOUNTRY = "**";
                        beanTkt.strDescCountry = "(Sales without Reconcili.)";
                    } else {
                        beanTkt.SCOUNTRY = rst.getString("COUNTRY").trim();
                        /*if (hmPaises.containsKey(rst.getString("COUNTRY").trim().toUpperCase())) {
                         beanTkt.strDescCountry = hmPaises.get(rst.getString("COUNTRY").trim()).toString();
                         }*/
                        beanTkt.strDescCountry = rst.getString("NAME").trim();
                    }
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();
                    /*if (hmCurr.containsKey(rst.getString("CURRENCY").trim().toUpperCase())) {
                     beanTkt.strMoneda = hmCurr.get(rst.getString("CURRENCY").trim()).toString();
                     } else {
                     beanTkt.strMoneda = rst.getString("CURRENCY").trim();
                     }*/
                    if (rst.getString("MONEDA").trim().length() > 3) {
                        beanTkt.strMoneda = rst.getString("MONEDA").trim().substring(3);
                    } else {
                        beanTkt.strMoneda = rst.getString("MONEDA").trim();
                    }

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.AVFOP = rst.getDouble("AVFOP");

                    lngTotCant = lngTotCant + rst.getLong("CANT");
                    dblTotSVFOP = dblTotSVFOP + rst.getLong("SVFOP");
//                    beanTkt.lngTotQACCB = lngTotCant;

                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }

                    beanTkt.strTitulo += beanTkt.strFormatDate + " **" + hmDescEstados.get(beanTkt.IN_STVAL) + "** ";

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                for (int i = 0; i < lstTkts.size(); i++) {
                    lstTkts.get(i).lngTotQACCB = lngTotCant;
                    lstTkts.get(i).dblTotSVFOP = dblTotSVFOP;
//                    lngTotCant = lngTotCant + beanTkt.lngQACCB;
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

    public HashMap<String, List<A2290Filter>> loadPX263SQP00715_DEBITS(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        List<A2290Filter> lstError = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Debits";
        long lngTotCant = 0;
        long lngTotQTYTKT = 0, totSVFOP = 0;
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
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

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconcili.");
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00715_DEBITS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_TDOC);
            cstmt.setString(6, filter.SCOUNTRY);
            cstmt.setString(7, filter.SCURRENCY);
            cstmt.setString(8, filter.IN_CARDN1.trim());
            cstmt.setString(9, filter.IN_CARDN2.trim());
            cstmt.setString(10, filter.IN_SCARDNCOR.trim());
            cstmt.setString(11, filter.IN_SAUTHOC.trim());
            cstmt.setString(12, filter.IN_STVAL.trim());
            cstmt.setString(13, filter.IN_NEGOC.trim());
            cstmt.setString(14, filter.IN_COMENT.trim());
            cstmt.setString(15, filter.IN_AGENCY.trim());
            cstmt.setString(16, filter.IN_strSVFOP.trim());

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
                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }

                    beanTkt.strTitulo += filter.strFormatDate + " **" + hmDescEstados.get(filter.IN_STVAL) + "** " + " - " + filter.NAME;
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

            hmResultado.put("TKT", lstTkts);

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

        return hmResultado;
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_DETAIL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(1, filter.CCUSTCC.trim());
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
            cstmt.setInt(15, filter.QTYDOC);

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
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.A1531TTARJ = rst.getString("SCARCOD").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("SVFOP");
                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();
                beanTkt.INVOICE = rst.getString("INVOICE").trim();
                beanTkt.ACCNUMA = rst.getString("ACCNUMA").trim();
                beanTkt.COSTCEN = rst.getString("COSTCEN").trim();
                beanTkt.BANDOC = rst.getString("BANDOC").trim();
                beanTkt.SCONSOL = rst.getString("SCONSOL").trim();
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

    public List<A2290Filter> loadPX269SQP00833_MDP_REVERSED(A2290Filter filter) throws SQLException, Exception {

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_REVERSED(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.CCUSTCC.trim());
            cstmt.setString(2, filter.DATEC.trim());
            cstmt.setString(3, filter.TRANC.trim());
            cstmt.setString(4, filter.BANDOC.trim());

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
                beanTkt.INVOICE = rst.getString("INVOICE").trim();
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
        String tipFecha = "Debits";
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
                } else if (rst.getString("TDOC").trim().equals("D")) {
                    beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Debits.";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("SUBTOTAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.SCLOSE = rst.getString("SCLOSE").trim().toUpperCase().contains("DENEGADO") ? "DENEGADO" : "APROBADO";
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
        String tipFecha = "Debits";
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
                beanTkt.SDATE = rst.getString("IDATE").trim();
                beanTkt.SPNR = rst.getString("NOMPAX").trim();
                beanTkt.IDDEB = rst.getString("IDDEB").trim();
                beanTkt.NOMCONCEP = rst.getString("NOMCONCEP").trim();
                beanTkt.SCONTROL = rst.getString("SCONTROL").trim();
                beanTkt.MPF076TRAN = rst.getInt("TRAN");

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("C")) {
                    beanTkt.descTDOC = "Chargeback";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else if (rst.getString("TDOC").trim().equals("D")) {
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
                beanTkt.A720FECVTA = rst.getString("IDATE").trim();
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
        String tipFecha = "Debits";
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
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
//                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.MPF077TRAN = rst.getInt("TRAN");

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Acreditations";
                } else if (rst.getString("TDOC").trim().equals("D")) {
                    beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Acreditations";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("VALOR");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
//                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("IATA").trim();
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_MDP_SCAN(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.CCUSTCC.trim());
            cstmt.setString(2, filter.TICKET.trim());
            cstmt.setString(3, filter.CARD1.trim());
            cstmt.setString(4, filter.CARD2.trim());
            cstmt.setString(5, filter.SAUTHOC.trim());
            cstmt.setString(6, filter.SDATE.trim());
            cstmt.setString(7, filter.SPNR.trim());
            cstmt.setString(8, filter.SAGENT.trim());
            cstmt.setString(9, filter.SCURRENCY.trim());
            cstmt.setString(10, filter.SCARCOD.trim());
            cstmt.setString(11, filter.SCONSOL.trim());

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

                beanTkt.A720SCOUNTRY = rst.getString("SCOUNTRY").trim();

                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();
                beanTkt.INVOICE = rst.getString("INVOICE").trim();
                beanTkt.ACCNUMA = rst.getString("ACCNUMA").trim();
                beanTkt.COSTCEN = rst.getString("COSTCEN").trim();
                beanTkt.SCONSOL = rst.getString("SCONSOL").trim();

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
        String tipFecha = "Debits";
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP_SCAN_PENDING(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.CCUSTCC.trim());
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SDATE.trim());//
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SPNR.trim());
            cstmt.setString(6, filter.SCURRENCY.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());//
            cstmt.setString(9, filter.SAUTHOC.trim());
            cstmt.setString(10, filter.SAGENT.trim());//
            cstmt.setString(11, filter.TRANC.trim());
            cstmt.setString(12, filter.PRDA.trim());
            cstmt.setString(13, filter.RQUERY.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = filter.PRDA.trim();
                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.A720SCOUNTRY = rst.getString("SCOUNTRY").trim();
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
                beanTkt.INVOICE = rst.getString("INVOICE").trim();
                beanTkt.SCONSOL = rst.getString("SCONSOL").trim();

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
        String tipFecha = "Debits";
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
                } else if (rst.getString("TDOC").trim().equals("D")) {
                    beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Refund";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("SUBTOTAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.SCLOSE = rst.getString("SCLOSE").trim().toUpperCase().contains("DENEGADO") ? "DENEGADO" : "APROBADO";
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
        String tipFecha = "Debits";
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
                beanTkt.SDATE = rst.getString("IDATE").trim();
                beanTkt.SPNR = rst.getString("NOMPAX").trim();
                beanTkt.IDDEB = rst.getString("IDDEB").trim();
                beanTkt.NOMCONCEP = rst.getString("NOMCONCEP").trim();
                beanTkt.SCONTROL = rst.getString("SCONTROL").trim();
                beanTkt.MPF076TRAN = rst.getInt("TRAN");

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("C")) {
                    beanTkt.descTDOC = "Chargeback";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else if (rst.getString("TDOC").trim().equals("D")) {
                    beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Chargeback";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
//                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
//                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("VALLOCAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("IDATE").trim();
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
        String tipFecha = "Debits";
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
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
//                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.MPF077TRAN = rst.getInt("TRAN");

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Acreditations";
                } else if (rst.getString("TDOC").trim().equals("D")) {
                    beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Acreditations";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("VALOR");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
//                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("IATA").trim();
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

    public List<A2290Filter> loadPX269SQP00833_TktTw_SCAN_PENDING(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Debits";
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_TKTTW_SCAN_PENDING(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CCIA.trim());
            cstmt.setString(3, filter.FORMA.trim());
            cstmt.setString(4, filter.SERIE.trim());
            cstmt.setString(5, filter.TDOC.trim());
            cstmt.setString(6, filter.SCARDNCOR.trim());
            cstmt.setString(7, filter.SAUTHOC.trim());

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

    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Debits";
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_DEBITS_SCAN_RFND(?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(9, filter.SCARCOD.trim());

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
                beanTkt.A1531VFOP = rst.getDouble("SUBTOTAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.SCLOSE = rst.getString("SCLOSE").trim().toUpperCase().contains("DENEGADO") ? "DENEGADO" : "APROBADO";
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
        String tipFecha = "Debits";
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_DEBITS_SCAN_CHGBAK(?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(9, filter.SCARCOD.trim());

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
                beanTkt.SDATE = rst.getString("IDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.MPF076TRAN = rst.getInt("TRAN");
                beanTkt.IDDEB = rst.getString("IDDEB").trim();
                beanTkt.NOMCONCEP = rst.getString("NOMCONCEP").trim();
                beanTkt.SCONTROL = rst.getString("SCONTROL").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();

//                beanTkt.FDESGLOSE = rst.getString("FDESGLOSE").trim(); //REVISAR
                if (rst.getString("TDOC").trim().equals("C")) {
                    beanTkt.descTDOC = "ChargeBack";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else {
                    beanTkt.descTDOC = "ChargeBack";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
//                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
//                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("VALLOCAL");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("IDATE").trim();
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
        String tipFecha = "Debits";
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00833_DEBITS_SCAN_ACREDIT(?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(9, filter.SCARCOD.trim());

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
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
//                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
//                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.MPF077TRAN = rst.getInt("TRAN");

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Acreditations";
                } else if (rst.getString("TDOC").trim().equals("D")) {
                    beanTkt.descTDOC = "Debits.";
                } else {
                    beanTkt.descTDOC = "Acreditations";
                }
                beanTkt.A1531TTARJ = rst.getString("FRANQUICIA").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("VALOR");
//                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
//                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("IATA").trim();
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

    public List<A2290Filter> loadRules() throws SQLException, Exception {

        List<A2290Filter> lista = new ArrayList<>();
        A2290Filter record;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".getRules(?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {

                record = new A2290Filter();
                record.CODRULE = rst.getString("CODRULE").trim();
                record.GRORULE = rst.getString("GRORULE").trim();
                record.RQUERY = rst.getString("RQUERY").trim();
                record.TTABLE = rst.getString("TTABLE").trim();
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

    public List<A2290Filter> loadPX269SQP00871JT(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngQTYTKT = 0, lngQTYLIQ = 0;
        double dblSVFOPTKT = 0, dblSVFOPLIQ = 0;

        String estado = "", strTitulo = "";

        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        ResultSet rst = null;
        ResultSet rst2 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF101_F2(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA.trim());
            cstmt.setString(4, filter.strSQL.trim());
            cstmt.setString(5, filter.SCARDNCOR);
            cstmt.setString(6, filter.SAUTHOC);
            cstmt.setString(7, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(8, filter.SCARDN);
            cstmt.setString(9, filter.SCURRENCY);
            cstmt.setString(10, filter.RQUERY);

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            while (rst.next()) {

                String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQPMPF100_F2(?,?,?,?,?,?,?,?,?)}";

                Connection cnx2 = null;
                try {
                    cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
                    cstmt2 = cnx2.prepareCall(SQLCLL02);

                    cstmt2.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    cstmt2.setString(2, rst.getString("TDOC_101"));
                    cstmt2.setString(3, rst.getString("SDATE_101"));
                    cstmt2.setString(4, filter.SCOUNTRY.trim());
                    cstmt2.setString(5, rst.getString("SCURRENCY_101"));
                    cstmt2.setString(6, rst.getString("SCARDN_101"));
                    cstmt2.setString(7, rst.getString("SAUTHOC_101"));
                    cstmt2.setString(8, rst.getString("SAGENT_101"));
                    cstmt2.setString(9, filter.RQUERY.trim());

                    cstmt2.execute();

                    rst2 = cstmt2.getResultSet();

                    while (rst2.next()) {
                        beanTkt = new A2290Filter();
                        beanTkt.TKT = rst2.getString("TKT");
                        beanTkt.QTY_100 = rst2.getLong("QTY_100");
                        beanTkt.SVFOP_100 = rst2.getDouble("SVFOP_100");
                        beanTkt.SCURRENCY_100 = rst2.getString("SCURRENCY_100");
                        beanTkt.TDOC_100 = rst2.getString("TDOC_100");
                        beanTkt.SDATE_100 = rst2.getString("SDATE_100");
                        beanTkt.SAGENT_100 = rst2.getString("SAGENT_100");
                        beanTkt.SCARCOD_100 = rst2.getString("SCARCOD_100");
                        beanTkt.SCARDN_100 = rst2.getString("SCARDN_100");
                        beanTkt.SAUTHOC_100 = rst2.getString("SAUTHOC_100");

                        beanTkt.UNIKEY = rst.getString("UNIKEY");
                        beanTkt.PAYDATE = rst.getString("PAYDATE");
                        beanTkt.CODEBANK = rst.getString("CODEBANK");
                        beanTkt.MERCHNC = rst.getString("MERCHNC");
                        beanTkt.ACCNUMBER = rst.getString("ACCNUMBER");
                        beanTkt.TERMI = rst.getString("TERMI");
                        beanTkt.NEGOC = rst.getString("NEGOC");
                        beanTkt.SEQNUM = rst.getString("SEQNUM");
                        beanTkt.QTY_101 = rst.getLong("QTY_101");
                        beanTkt.SVFOP_101 = rst.getDouble("SVFOP_101");
                        beanTkt.SCURRENCY_101 = rst.getString("SCURRENCY_101");
                        beanTkt.TDOC_101 = rst.getString("TDOC_101");
                        beanTkt.SDATE_101 = rst.getString("SDATE_101");
                        beanTkt.SAGENT_101 = rst.getString("SAGENT_101");
                        beanTkt.SCARCOD_101 = rst.getString("SCARCOD_101");
                        beanTkt.SCARDN_101 = rst.getString("SCARDN_101");
                        beanTkt.SAUTHOC_101 = rst.getString("SAUTHOC_101");

                        beanTkt.page.PAGNUM = filter.page.PAGNUM;
                        beanTkt.page.PAGROW = filter.page.PAGROW;
                        beanTkt.page.TOTPAG = filter.page.TOTPAG;
                        beanTkt.page.TOTROW = filter.page.TOTROW;

                        lstTkts.add(beanTkt);

                    }

                } catch (Exception e) {

                }
            }
            rst.close();
            rst2.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                    rst2.close();
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

    public A2290Filter massiveReverseADM(List<A2290Filter> lstdata, UserView user) throws Exception {
        //REALIZA UPDATE DE CUPON EN LA TABLA A3729.

        boolean correct = false;
        boolean duplicateExists = false;
        String mensaje = "SUCCESSFUL. Information Updated.";
        List<A2290Filter> lst_tkt_error = new ArrayList<A2290Filter>();
        LoadSalesConciliationDAO objDao = new LoadSalesConciliationDAO();
        A2290Filter objRtn = new A2290Filter();
        A2290Filter objRtn2 = new A2290Filter();
        A2290Filter rspt = new A2290Filter();
        int QTY_UPDATE = 0, cont = 0, contDup = 0;
        double NETOC = 0;
        String mensajePost = "";
        CallableStatement cstmt = null;
        Connection cnx = null;
        int count = 0;
        int cantReg = 0;
        int loadedCount = 0;
        int notLoadedCount = 0;
        int duplicateCount = 0;
        PreparedStatement cstmtBS;
        cstmtBS = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP_MASSIVE_REVERSE_MPF100(?,?,?,?,?,?)}";
        try {
            int QTYTRAN1 = lstdata.size();
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
            cstmtBS = cnx.prepareStatement(SQLCLL01);
            try {
                for (int i = 0; i < lstdata.size(); i++) {
                    try {
                        cstmtBS.setString(1, lstdata.get(i).TKT.trim());
                        cstmtBS.setString(2, lstdata.get(i).SCARDN.trim());
                        cstmtBS.setString(3, lstdata.get(i).SAUTHOC.trim());
                        cstmtBS.setString(4, user.getUserInfo().USR);
                        cstmtBS.setString(5, Functions.getFechaActual());
                        cstmtBS.setString(6, Functions.getHoraActual());
                        cstmtBS.addBatch();
                        count++;

                        if (count % 10000 == 0) {
                            cstmtBS.executeBatch();
                            cstmtBS.clearBatch();
                        }
                        cantReg++;
                    } catch (Exception e) {
                        loadedCount++;
                        System.out.println("errorSQL");
                        System.out.println(e);
                        if (e.getMessage().contains("clave duplicada")) {
                            duplicateExists = true;
                            duplicateCount++;

                        }
                    }
                }
                cstmtBS.executeBatch();
                rspt.QTYREC = lstdata.size();
                rspt.QTYUPL = cantReg;
                rspt.QTYNOTUPL = loadedCount;

            } catch (Exception e2) {
                System.out.println("error" + e2);
                System.out.println("error" + cantReg);
            }

        } catch (Exception e) {
            System.out.println("Error en registro" + cont);
            mensaje = "Error" + e.getMessage();

        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {

                }
            }
            if (cstmtBS != null) {
                try {
                    cstmtBS.close();
                } catch (SQLException e) {

                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        rspt.MESSAGE = mensaje;
        return rspt;
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

    public A2290Filter loadPX285SQP00829Search(A2290Filter filter) throws SQLException, Exception {

        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00829SEARCH(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CODRULE.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.CODRULE = rs01.getString("CODRULE").trim();
                objRtn.GRORULE = rs01.getString("GRORULE").trim();
                objRtn.RQUERY = rs01.getString("RQUERY").trim();
                objRtn.TTABLE = rs01.getString("TTABLE").trim();

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

                //lstRtn.add(objRtn);
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

    public String loadPX285SQP00829Update(A2290Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2284.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00829UPDATE(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.CODRULE.trim());
            cstmt.setString(4, filter.GRORULE.trim());
            cstmt.setString(5, filter.RQUERY.trim());
            cstmt.setString(6, filter.TTABLE.trim());

            cstmt.setString(7, session.getUserView().getUserInfo().USR);
            cstmt.setString(8, Functions.getFechaActual());
            cstmt.setString(9, Functions.getHoraActual());
            cstmt.execute();

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
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;
    }
}
