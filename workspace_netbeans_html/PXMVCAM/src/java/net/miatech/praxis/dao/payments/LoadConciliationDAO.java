package net.miatech.praxis.dao.payments;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2370Filter;
import net.miatech.praxis.payment.filter.MPF100Filter;
import net.miatech.praxis.payment.filter.MPF106Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadConciliationDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    /**
     * *************************** PX263
     * ***************************************
     */
    public List<A2290Filter> loadPX263SQP00652(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQSALES = 0, lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotQDIFF = 0, lngTotQPEND = 0, lngTotQPOLIC = 0, lngTotQPOLIPE = 0;
        String Fec = "";

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00652(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQPOLIC = rst.getLong("QPOLIC");
                    beanTkt.lngQPOLIPE = rst.getLong("QPOLIPE");
                    
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQPOLIC = lngTotQPOLIC;
                    beanTkt.lngTotQPOLIPE = lngTotQPOLIPE;
                    
                    beanTkt.lngQMATCHPercent = (beanTkt.lngQSALES > 0) ? (beanTkt.lngQMATCH * 100.0) / beanTkt.lngQSALES : 0.00;
                    beanTkt.lngTotQMATCHPercent = (lngTotQSALES > 0) ? (lngTotQMATCH * 100.0) / lngTotQSALES : 0.00;

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

                    beanTkt.lngQMATCHPercentRF = (beanTkt.lngQSALESRF > 0) ? (beanTkt.lngQMATCHRF * 100.0) / beanTkt.lngQSALESRF : 0.00;
                    beanTkt.lngQMATCHPercentCH = (beanTkt.lngQSALESCH > 0) ? (beanTkt.lngQMATCHCH * 100.0) / beanTkt.lngQSALESCH : 0.00;
                    beanTkt.lngQMATCHPercentAC = (beanTkt.lngQSALESAC > 0) ? (beanTkt.lngQMATCHAC * 100.0) / beanTkt.lngQSALESAC : 0.00;
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
    
    public List<A2290Filter> loadPX263SQP00655(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQSALES = 0, lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotQDIFF = 0, lngTotQPEND = 0, lngTotQPOLIC = 0, lngTotQPOLIPE = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00655(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim());
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_COUNTRY.trim());
            cstmt.setString(6, filter.IN_PAYMENT.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_TICKET.trim());
            cstmt.setString(9, filter.IN_FTE.trim());
            cstmt.setString(10, filter.IN_AFTE.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_STVAL.trim());
            cstmt.setString(13, filter.IN_MERCHN.trim());
            cstmt.setString(14, filter.IN_AUTHNBR.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());

            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            while (rst.next()) {
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQPEND = rst.getLong("QPEND");
                lngTotQPOLIC = rst.getLong("QPOLIC");
                lngTotQPOLIPE = rst.getLong("QPOLIPE");
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
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    if (rst.getString("SCOUNTRY").trim().isEmpty()) {
                        //Venta sin ACCB
                        beanTkt.SCOUNTRY = "**";
                        beanTkt.strDescCountry = "(Sales without Sett.)";
                    } else {
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                        /*if (hmPaises.containsKey(rst.getString("SCOUNTRY").trim().toUpperCase())) {
                         beanTkt.strDescCountry = hmPaises.get(rst.getString("SCOUNTRY").trim()).toString();
                         }*/
                        beanTkt.strDescCountry = rst.getString("NAME").trim();
                    }
                    
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQPOLIC = rst.getLong("QPOLIC");
                    beanTkt.lngQPOLIPE = rst.getLong("QPOLIPE");
                    
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQPOLIC = lngTotQPOLIC;
                    beanTkt.lngTotQPOLIPE = lngTotQPOLIPE;
                    
                    beanTkt.strTitulo = "Sales Date: " + filter.strFormatDate.trim();
                            
                    beanTkt.lngQMATCHPercent = (beanTkt.lngQSALES > 0) ? (beanTkt.lngQMATCH * 100.0) / beanTkt.lngQSALES : 0.00;
                    beanTkt.lngTotQMATCHPercent = (lngTotQSALES > 0) ? (lngTotQMATCH * 100.0) / lngTotQSALES : 0.00;

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

    public List<A2290Filter> loadPX263SQP00656(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQSALES = 0, lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotQDIFF = 0, lngTotQPEND = 0, lngTotQPOLIC = 0, lngTotQPOLIPE = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00656(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim());
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.SCOUNTRY.trim());
            cstmt.setString(6, filter.IN_PAYMENT.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_TICKET.trim());
            cstmt.setString(9, filter.IN_FTE.trim());
            cstmt.setString(10, filter.IN_AFTE.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_STVAL.trim());
            cstmt.setString(13, filter.IN_MERCHN.trim());
            cstmt.setString(14, filter.IN_AUTHNBR.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());

            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            while (rst.next()) {
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQPEND = rst.getLong("QPEND");
                lngTotQPOLIC = rst.getLong("QPOLIC");
                lngTotQPOLIPE = rst.getLong("QPOLIPE");
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
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAME").trim();

                    
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQPOLIC = rst.getLong("QPOLIC");
                    beanTkt.lngQPOLIPE = rst.getLong("QPOLIPE");
                    
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQPOLIC = lngTotQPOLIC;
                    beanTkt.lngTotQPOLIPE = lngTotQPOLIPE;
                    
                    System.out.println("str titulo" + filter.strTitulo.trim() );
                    beanTkt.strTitulo = filter.strTitulo.trim() + " - Country : " + beanTkt.SCOUNTRY;

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
    
    public List<A2290Filter> loadPX263SQP00657(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        //String strSCARF = "";
        long lngTotQSALES = 0, lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotQDIFF = 0, lngTotQPEND = 0, lngTotQPOLIC = 0, lngTotQPOLIPE = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00657(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim());
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.SCOUNTRY.trim());
            cstmt.setString(6, filter.IN_PAYMENT.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_TICKET.trim());
            cstmt.setString(9, filter.IN_FTE.trim());
            cstmt.setString(10, filter.IN_AFTE.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_STVAL.trim());
            cstmt.setString(13, filter.IN_MERCHN.trim());
            cstmt.setString(14, filter.IN_AUTHNBR.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());

            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            while (rst.next()) {
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQPEND = rst.getLong("QPEND");
                lngTotQPOLIC = rst.getLong("QPOLIC");
                lngTotQPOLIPE = rst.getLong("QPOLIPE");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQPOLIC = rst.getLong("QPOLIC");
                    beanTkt.lngQPOLIPE = rst.getLong("QPOLIPE");
                    
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQPOLIC = lngTotQPOLIC;
                    beanTkt.lngTotQPOLIPE = lngTotQPOLIPE;
                    
                    beanTkt.strTitulo = filter.strTitulo.trim() + " Card: " + filter.SCARCOD.trim() + " : " + filter.strDescCard.trim();

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

    public List<A2370Filter> loadPX263SQP00899(A2290Filter filter) throws SQLException, Exception {

        List<A2370Filter> lstTkts = new ArrayList<A2370Filter>(0);
        A2370Filter beanTkt;

        double SVFOP = 0, SVFOPRF = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00899(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);/////
            cstmt.setString(3, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(4, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_PAYMENT.trim());
            cstmt.setString(8, filter.IN_CARDC.trim());
            cstmt.setString(9, filter.IN_TICKET.trim());
            cstmt.setString(10, filter.IN_FTE.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_STVAL.trim());
            cstmt.setString(13, filter.IN_MERCHN.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                SVFOP = rst.getDouble("SVFOP");
                SVFOPRF = rst.getDouble("SVFOPRF");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2370Filter();
                    beanTkt.FTE = filter.FTE;
                    beanTkt.SCOUNTRY = filter.IN_COUNTRY;
                    beanTkt.IN_TICKET = filter.IN_TICKET;
                    beanTkt.SDATE = rst.getString("SDATE");
                    beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.SDATE);
                    beanTkt.SCURRENC = rst.getString("SCURRENCY");
                    beanTkt.SVFOPUSD = rst.getDouble("SVFOP");
                    beanTkt.SVFOPUSDRF = rst.getDouble("SVFOPRF");
                    beanTkt.CPSVFOPUSD = rst.getDouble("CPSVFOP");
                    beanTkt.CPSVFOPUSDRF = rst.getDouble("CPSVFOPRF");
                    beanTkt.CWSVFOPUSD = rst.getDouble("CWSVFOP");
                    beanTkt.CWSVFOPUSDRF = rst.getDouble("CWSVFOPRF");

                    beanTkt.totSVFOPUSD = SVFOP;
                    beanTkt.totSVFOPUSDRF = SVFOPRF;

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

    public HashMap<String, List<A2290Filter>> loadPX263SQP01960(A2290Filter filter) throws SQLException, Exception {

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
        hmDescEstados.put("2", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01960(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TICKET.substring(0, 3));//CIA
            cstmt.setString(3, filter.IN_TICKET.substring(3, 7));//FORMA
            cstmt.setString(4, filter.IN_TICKET.substring(7, 13));//SERIE
            cstmt.setString(5, filter.IN_TDOC);//SERIE

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblTotSVFOP += rst.getDouble("SVFOP");
                dblTotAVFOP += rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    //beanTkt.strFormatDate = filter.strFormatDate.trim();
                    // beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    // beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    // beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    //beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    // beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    // beanTkt.IN_FTE = filter.IN_FTE.trim();
                    // beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    // beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    // beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    // beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    // beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                    // beanTkt.strMoneda = filter.strMoneda.trim();
                    //beanTkt.strDescCard = filter.strDescCard.trim();
                    //beanTkt.strDescCountry = filter.strDescCountry.trim();
                    if (rst.getString("TDOC").trim().equals("R")) {
                        beanTkt.strPEM = "REFUND";
                    } else {
                        beanTkt.strPEM = "SALES";
                    }
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.TRNCU = rst.getString("TRNCU").trim();
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
                    //SALES
                    beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.STCNTR = rst.getString("STCNTR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.strDescCard = rst.getString("NAMECARS").trim();
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

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.dblTotAVFOP = dblTotAVFOP;
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    //TEF
                    beanTkt.TDATE = rst.getString("TDATE").trim();

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

                    beanTkt.lngQOBS = rst.getLong("QOB");
                    //Armando Título del Detalle
                    //if (beanTkt.strFecFiltro.equals("DATEC")) {
                    //    beanTkt.strTitulo = "Conciliation Date : ";
                    // } else {
                    if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    //  }
                    beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + beanTkt.strDescCountry.trim() + " - Card : "
                            + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(rst.getString("STVAL").trim()).toString() + "** ";

                    if (rst.getString("TKVOID").trim().equals("V")) {
                        beanTkt.strFlagStat = "Void";

                    } else if (rst.getString("FLAGC").trim().equals("C")) {
                        beanTkt.strFlagStat = "CNJ";
                    }

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

    public HashMap<String, List<A2290Filter>> loadPX263SQP01828(A2290Filter filter) throws SQLException, Exception {

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
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("2", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01828(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(3, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(4, filter.strYearTo + filter.strMonthTo);
            
            cstmt.setString(5, filter.IN_TDOC);//SERIE
            cstmt.setString(6, filter.IN_CARDN1);//PRIMEROS 6 DIGITOS DE LA TARJETA
            cstmt.setString(7, filter.IN_CARDN2);//ULTIMOS 4 DIGITOS DE LA TARJETA
            cstmt.setString(8, filter.IN_AUTHNBR);//NUMERO AUTORIZACION
            cstmt.setString(9, filter.IN_ADYEN);
            cstmt.setString(10, filter.IN_SAGENT);
            cstmt.setString(11, filter.IN_SPNR);
            cstmt.setString(12, filter.IN_TICKET);
            cstmt.setString(13, filter.IN_COUNTRY);
            cstmt.setString(14, filter.IN_CARDC);
            cstmt.setString(15, filter.IN_FTE);
            cstmt.setString(16, filter.IN_STVAL);
            cstmt.setString(17, filter.IN_strSVFOP);
            


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
                dblTotAVFOP += rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    //PRESENTACION SEGUN ESTADO
                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strYearFrom = filter.strYearFrom.trim();
                    beanTkt.strMonthFrom = filter.strMonthFrom.trim();
                    beanTkt.strYearTo = filter.strYearTo.trim();
                    beanTkt.strMonthTo = filter.strMonthTo.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (rst.getString("TDOC").trim().equals("R")) {
                        beanTkt.strPEM = "REFUND";
                    } else {
                        beanTkt.strPEM = "SALES";
                    }
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
                    beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.STCNTR = rst.getString("STCNTR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.strDescCard = rst.getString("NAMECARS").trim();
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

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.dblTotAVFOP = dblTotAVFOP;
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    //TEF
                    beanTkt.TDATE = rst.getString("TDATE").trim();

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

                    beanTkt.lngQOBS = rst.getLong("QOB");
                    //Armando Título del Detalle
                    if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                            + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **"  + "** ";

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

        hmResultado.put("TKT", lstTkts);
        hmResultado.put("ERROR", lstError);

        return hmResultado;
    }

    public HashMap<String, List<A2290Filter>> loadPX263SQP01976(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        List<A2290Filter> lstError = new ArrayList<A2290Filter>(0);
        String tipFecha = "Sales";
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01976(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(4, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(5, filter.IN_TDOC);//SERIE
            cstmt.setString(6, filter.IN_MERCHN);//SERIE
            cstmt.setString(7, filter.IN_AUTHNBR);
            cstmt.setString(8, filter.IN_ADYEN);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblTotSVFOP += rst.getDouble("SVFOP");
                dblTotAVFOP += rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    //PRESENTACION SEGUN ESTADO
                    beanTkt = new A2290Filter();
                    //beanTkt.strFormatDate = filter.strFormatDate.trim();
                    // beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    // beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    // beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    // beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    // beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    // beanTkt.IN_FTE = filter.IN_FTE.trim();
                    // beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    // beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    // beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    // beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    // beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                    // beanTkt.strMoneda = filter.strMoneda.trim();
                    //beanTkt.strDescCard = filter.strDescCard.trim();
                    //beanTkt.strDescCountry = filter.strDescCountry.trim();
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
                    beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.STCNTR = rst.getString("STCNTR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.strDescCard = rst.getString("NAMECARS").trim();
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

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.dblTotAVFOP = dblTotAVFOP;
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    //TEF
                    beanTkt.TDATE = rst.getString("TDATE").trim();

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

                    beanTkt.lngQOBS = rst.getLong("QOB");
                    //Armando Título del Detalle
                    //if (beanTkt.strFecFiltro.equals("DATEC")) {
                    //    beanTkt.strTitulo = "Conciliation Date : ";
                    // } else {
                    if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    //  }
                    beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                            + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(rst.getString("STVAL").trim()).toString() + "** ";

                    if (rst.getString("TKVOID").trim().equals("V")) {
                        beanTkt.strFlagStat = "Void";

                    } else if (rst.getString("FLAGC").trim().equals("C")) {
                        beanTkt.strFlagStat = "CNJ";
                    }

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

    public List<A2290Filter> loadPX263SQP00658(A2290Filter filter) throws SQLException, Exception {

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00658(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.SCOUNTRY.trim());
            cstmt.setString(6, filter.IN_PAYMENT.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_TICKET.trim());
            cstmt.setString(9, filter.IN_FTE.trim());
            cstmt.setString(10, filter.IN_AFTE.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_STVAL.trim());
            cstmt.setString(13, filter.IN_MERCHN.trim());
            cstmt.setString(14, filter.IN_AUTHNBR.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());

            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

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

                    
                    beanTkt.strTitulo = filter.strTitulo.trim() + " - Day : " + filter.IN_SDATE.trim();

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

    public List<A2290Filter> loadPX263SQP00900(A2370Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double SVFOP = 0, SVFOPUSD = 0, SVFOPRF = 0, SVFOPUSDRF = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00900(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE);/////
            cstmt.setString(3, filter.FTE);
            cstmt.setString(4, filter.SCOUNTRY);
            cstmt.setString(5, filter.IN_TICKET);

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);

            cstmt.execute();

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                //SVFOP = rst.getDouble("SVFOP");
                SVFOPUSD = rst.getDouble("SVFOPUSD");
                //SVFOPRF = rst.getDouble("SVFOPRF");
                SVFOPUSDRF = rst.getDouble("SVFOPUSDRF");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.FTE = filter.FTE;
                    beanTkt.SCOUNTRY = filter.SCOUNTRY;
                    beanTkt.IN_TICKET = filter.IN_TICKET;
                    beanTkt.SDATEL = filter.SDATE;
                    beanTkt.strFormatDate = filter.strFormatDate;
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY");
                    beanTkt.strDescCountry = rst.getString("DES_PAIS");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    //beanTkt.dblTotAMOUNT = SVFOP;
                    beanTkt.totSVFOPUSD = SVFOPUSD;

                    beanTkt.SCURRENCYRF = rst.getString("SCURRENCYRF");
                    beanTkt.SVFOPRF = rst.getDouble("SVFOPRF");
                    beanTkt.SVFOPUSDRF = rst.getDouble("SVFOPUSDRF");
                    beanTkt.totSVFOPUSDRF = SVFOPUSDRF;

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

    public List<A2290Filter> loadPX263SQP00901(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double SVFOPUSDRF = 0, SVFOPUSD = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00901(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATEL);/////
            cstmt.setString(3, filter.SCOUNTRY);
            cstmt.setString(4, filter.SCURRENCY);
            cstmt.setString(5, filter.IN_FTE);
            cstmt.setString(6, filter.IN_TICKET);

            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                //SVFOP = rst.getDouble("SVFOP");
                SVFOPUSD = rst.getDouble("SVFOPUSD");
                //SVFOPRF = rst.getDouble("SVFOPRF");
                SVFOPUSDRF = rst.getDouble("SVFOPUSDRF");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.FTE = filter.FTE;
                    beanTkt.SCOUNTRY = filter.SCOUNTRY;
                    beanTkt.strDescCountry = filter.strDescCountry;
                    beanTkt.SCURRENCY = filter.SCURRENCY;
                    beanTkt.IN_TICKET = filter.IN_TICKET;
                    beanTkt.SDATE = rst.getString("SDATE");
                    beanTkt.strDescripcion = Functions.getMonthConvert(beanTkt.SDATE);

                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    //beanTkt.dblTotAMOUNT = SVFOP;
                    beanTkt.totSVFOPUSD = SVFOPUSD;

                    //beanTkt.SCURRENCYRF = rst.getString("SCURRENCYRF");
                    beanTkt.SVFOPRF = rst.getDouble("SVFOPRF");
                    beanTkt.SVFOPUSDRF = rst.getDouble("SVFOPUSDRF");
                    beanTkt.totSVFOPUSDRF = SVFOPUSDRF;

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

    public A2290Filter loadPX263SQP00659(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();
        String strSCARF = "";

        if (filter.STVAL.trim().length() > 1) {
            if (filter.STVAL.trim().equals("Match")) {
                filter.STVAL = "1";
            } else if (filter.STVAL.trim().equals("Sales without Reconcili.") || filter.STVAL.trim().equals("Refund without Reconcili.")) {
                filter.STVAL = "";
            } else if (filter.STVAL.trim().equals("Reconcili. without Sales") || filter.STVAL.trim().equals("Reconcili. without Refund")) {
                filter.STVAL = "3";
            } else if (filter.STVAL.trim().equals("Match with Differences")) {
                filter.STVAL = "4";
            } else if (filter.STVAL.trim().equals("Match Manual")) {
                filter.STVAL = "5";
            }
        }

        /*if (!filter.STVAL.equals("2")) {
         filter.APAYMENT = filter.SPAYMENT;
         filter.SPAYMENT = "";
         }*/
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00659(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CCIA.trim());
            cstmt.setString(3, filter.FORMA.trim());
            cstmt.setString(4, filter.SERIE.trim());
            cstmt.setString(5, filter.TDOC.trim());
            cstmt.setString(6, filter.SPAYMENT.trim());
            cstmt.setString(7, filter.APAYMENT.trim());
            cstmt.setString(8, filter.SCARCOD.trim());
            cstmt.setString(9, filter.ACARCOD.trim());
            cstmt.setString(10, filter.STVAL.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt.TRNCU = rst.getString("TRNCU");
                beanTkt.strFormatDate = filter.strFormatDate.trim();
                beanTkt.strSCARF = strSCARF;
                beanTkt.strDescCountry = filter.strDescCountry.trim();

                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();

                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.FTE = rst.getString("FTE").trim();
                beanTkt.DATEC = rst.getString("DATEC").trim();
                beanTkt.FADYEN = rst.getString("FADYEN").trim();

                //SALES
                beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();

                beanTkt.strSDescCard = rst.getString("SNAMECAR").trim();

                beanTkt.STCNTR = rst.getString("STCNTR").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("SCARDN").trim());
                beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();

                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.SVFOPINST = rst.getString("SVFOPINST").trim();
                beanTkt.INSTPAY = rst.getString("INSTPAY").trim();
                beanTkt.INSTPLA = rst.getString("INSTPLA").trim();

                //TEF
                beanTkt.TDATE = rst.getString("TDATE").trim();
                beanTkt.DATEF = rst.getString("DATEF").trim();
                //Banks
                beanTkt.BDATEL = rst.getString("BDATEL").trim();
                beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                beanTkt.BDATEP = rst.getString("BDATEP").trim();
                beanTkt.BSTVALP = rst.getString("BSTVALP").trim();

                if (rst.getString("MENSA") != null) {
                    beanTkt.strComment = rst.getString("MENSA").trim();
                }
                beanTkt.CREJEC = rst.getString("CREJEC").trim();
                if (!rst.getString("DESCREJ").trim().isEmpty()) {
                    beanTkt.CREJEC += " : " + rst.getString("DESCREJ").trim();
                }
                beanTkt.FNOBANK = rst.getString("FNOBANK").trim();
                beanTkt.DATEC2 = rst.getString("DATEC2").trim();
                beanTkt.DATEC3 = rst.getString("DATEC3").trim();

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

    public List<A2290Filter> loadPX263SQP00817(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        if (!filter.IN_STVAL.equals("2")) {
            filter.APAYMENT = filter.SPAYMENT;
            filter.SPAYMENT = "";
        }

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00817(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SPAYMENT.trim());
            cstmt.setString(4, filter.APAYMENT.trim());
            cstmt.setString(5, filter.CCIA.trim());
            cstmt.setString(6, filter.FORMA.trim());
            cstmt.setString(7, filter.SERIE.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                //MATCH CON DIFERENCIAS
                //REGISTRO CON DATOS DE LA VENTA ===========================
                beanTkt = new A2290Filter();
                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                /*if (rst.getString("TDOC").trim().equals("R")) {
                 beanTkt.strPEM = "REFUND";
                 } else {
                 beanTkt.strPEM = "SALES";
                 }*/
                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanTkt.strDescStatus = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTkt.strDescStatus = rst.getString("STVAL").trim();
                }
                beanTkt.FTE = rst.getString("FTE").trim();
                if (rst.getString("FTE").trim().equals("A")) {
                    beanTkt.strDescFTE = "ARC";
                } else if (rst.getString("FTE").trim().equals("B")) {
                    beanTkt.strDescFTE = "BSP";
                } else if (rst.getString("FTE").trim().equals("S")) {
                    beanTkt.strDescFTE = "ASR";
                }
                beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.strDescCountry = rst.getString("COUNTRYS").trim();
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                beanTkt.STCNTR = rst.getString("STCNTR").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("SCARDN").trim());
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

                beanTkt.BDATEP = rst.getString("BDATEP").trim();
                if (!rst.getString("BDATEP").trim().equals("") && !beanTkt.SDATE.isEmpty()) {
                    beanTkt.lngDays = Functions.diferenciaDias(beanTkt.SDATE, beanTkt.BDATEP);
                } else if (!beanTkt.SDATE.isEmpty()) {
                    beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.SDATE);
                }
                if (!rst.getString("ERROR").trim().isEmpty()) {
                    beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                } else {
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                }
                beanTkt.strComment = rst.getString("MSJJ").trim();

                lstTkts.add(beanTkt);
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

    public List<A2290Filter> loadPX263SQP00676(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00676(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                lngTotCant += rst.getLong("CANT");
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
                    beanTkt.lngTotQACCB = lngTotCant;

                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    beanTkt.strTitulo += beanTkt.strFormatDate + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";

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
    
    public List<A2290Filter> loadPX263SQP00676_REFND(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        String tipFecha = "Refund";

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconcili.");
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00676_REFND(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                lngTotCant += rst.getLong("CANT");
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
                    beanTkt.lngTotQACCB = lngTotCant;

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
    
    public List<A2290Filter> loadPX263SQP00676_CHGBAK(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        String tipFecha = "Chargebak";

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconcili.");
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00676_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                lngTotCant += rst.getLong("CANT");
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
//                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();
                    /*if (hmCurr.containsKey(rst.getString("CURRENCY").trim().toUpperCase())) {
                     beanTkt.strMoneda = hmCurr.get(rst.getString("CURRENCY").trim()).toString();
                     } else {
                     beanTkt.strMoneda = rst.getString("CURRENCY").trim();
                     }*/
//                    if (rst.getString("MONEDA").trim().length() > 3) {
//                        beanTkt.strMoneda = rst.getString("MONEDA").trim().substring(3);
//                    } else {
//                        beanTkt.strMoneda = rst.getString("MONEDA").trim();
//                    }

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.AVFOP = rst.getDouble("AVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;

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
    
    public List<A2290Filter> loadPX263SQP00676_ACREDIT(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        String tipFecha = "Acredit";

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconcili.");
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00676_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                lngTotCant += rst.getLong("CANT");
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
                    beanTkt.lngTotQACCB = lngTotCant;

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

    public List<A2290Filter> loadPX263SQP00894(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        if (!filter.SCOUNTRY.trim().equals("")) {
            filter.IN_COUNTRY = filter.SCOUNTRY.trim();
        }
        if (!filter.SCARCOD.trim().equals("")) {
            filter.IN_CARDC = filter.SCARCOD.trim();
        }
        if (!filter.SDATE.trim().equals("")) {
            filter.IN_SDATE = filter.SDATE.trim();
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00894(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim());//ADATE
            cstmt.setString(3, filter.IN_SDATE.trim());//201510
            cstmt.setString(4, filter.IN_TDOC.trim());//S
            cstmt.setString(5, filter.IN_COUNTRY.trim());// VACIO US AR
            cstmt.setString(6, filter.IN_PAYMENT.trim());//CC
            cstmt.setString(7, filter.IN_CARDN.trim());//VACIO
            cstmt.setString(8, filter.IN_CARDC.trim());//VACIO
            cstmt.setString(9, filter.SCURRENCY.trim());//VACIO USD ARS
            cstmt.setString(10, filter.IN_TICKET.trim());//VACIO
            cstmt.setString(11, filter.IN_FTE.trim());//VACIO
            cstmt.setString(12, filter.IN_AFTE.trim());//VACIO
            cstmt.setString(13, filter.IN_STVAL.trim());//4
            cstmt.setString(14, filter.IN_MERCHN.trim());//VACIO
            cstmt.setString(15, filter.IN_AUTHNBR.trim());
            cstmt.setString(16, filter.CERROR.trim());//VACIO

            cstmt.execute();
            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();
                beanTkt.strFecFiltro = filter.strFecFiltro;
                beanTkt.IN_SDATE = filter.IN_SDATE;
                beanTkt.IN_TDOC = filter.IN_TDOC;
                beanTkt.IN_COUNTRY = filter.IN_COUNTRY;
                beanTkt.IN_PAYMENT = filter.IN_PAYMENT;
                beanTkt.IN_CARDN = filter.IN_CARDN;
                beanTkt.IN_CARDC = filter.IN_CARDC;
                beanTkt.SCURRENCY = filter.SCURRENCY;
                beanTkt.IN_TICKET = filter.IN_TICKET;
                beanTkt.IN_FTE = filter.IN_FTE;
                beanTkt.IN_AFTE = filter.IN_AFTE;
                beanTkt.IN_STVAL = filter.IN_STVAL;
                beanTkt.IN_MERCHN = filter.IN_MERCHN;
                beanTkt.SCOUNTRY = filter.IN_COUNTRY;
                beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR;
                beanTkt.CERROR = rst.getString("CERROR").trim();
                if (rst.getString("DESCERROR") != null && !rst.getString("DESCERROR").equals("")) {
                    beanTkt.strDescripcion = rst.getString("CERROR").trim() + " : " + rst.getString("DESCERROR").trim();
                } else {
                    beanTkt.strDescripcion = "(**) : (Empty)";
                }
                beanTkt.lngQACCB = rst.getLong("CANT");

                lstTkts.add(beanTkt);
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

    public List<A2290Filter> loadPX263SQP00677(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0, dblAVFOP = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00677(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim()); //ADATE
            cstmt.setString(3, filter.IN_SDATE.trim());//201510
            cstmt.setString(4, filter.IN_TDOC.trim());//S
            cstmt.setString(5, filter.SCOUNTRY.trim());//US AR
            cstmt.setString(6, filter.IN_PAYMENT.trim());//CC
            cstmt.setString(7, filter.IN_CARDN.trim());
            cstmt.setString(8, filter.IN_CARDC.trim());
            cstmt.setString(9, filter.IN_TICKET.trim());
            cstmt.setString(10, filter.IN_FTE.trim());
            cstmt.setString(11, filter.IN_AFTE.trim());
            cstmt.setString(12, filter.IN_STVAL.trim());//4
            cstmt.setString(13, filter.SCURRENCY.trim());//USD ARS
            cstmt.setString(14, filter.IN_MERCHN.trim());
            cstmt.setString(15, filter.IN_AUTHNBR.trim());
            cstmt.setString(16, filter.CERROR.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());
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
                dblSVFOP += rst.getDouble("SVFOP");
                dblAVFOP += rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.strMoneda = filter.strMoneda.trim();
                    beanTkt.CERROR = filter.CERROR.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    if (rst.getString("CARD").trim().isEmpty()) {
                        beanTkt.SCARCOD = "**";
                        beanTkt.strDescCard = "(Sales without Reconcili.)";
                    } else {
                        beanTkt.SCARCOD = rst.getString("CARD").trim();
                        /*if (hmDescCard.containsKey(rst.getString("CARD").trim().toUpperCase())) {
                         beanTkt.strDescCard = hmDescCard.get(rst.getString("CARD").trim()).toString();
                         }*/
                        beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                    }
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.AVFOP = rst.getDouble("AVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblSVFOP;
                    beanTkt.dblTotAVFOP = dblAVFOP;

                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    if (beanTkt.IN_SDATE.trim().length() == 8) {
                        beanTkt.strTitulo += beanTkt.IN_SDATE + " - Country : " + beanTkt.strDescCountry + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
                    } else {
                        beanTkt.strTitulo += beanTkt.strFormatDate + " - Country : " + beanTkt.strDescCountry + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
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

    public List<A2290Filter> loadPX263SQP00678(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00678(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim());
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.SCOUNTRY.trim());
            cstmt.setString(6, filter.IN_PAYMENT.trim());
            cstmt.setString(7, filter.IN_CARDN.trim());
            cstmt.setString(8, filter.SCARCOD.trim());
            cstmt.setString(9, filter.IN_TICKET.trim());
            cstmt.setString(10, filter.IN_FTE.trim());
            cstmt.setString(11, filter.IN_AFTE.trim());
            cstmt.setString(12, filter.IN_STVAL.trim());
            cstmt.setString(13, filter.SCURRENCY.trim());
            cstmt.setString(14, filter.IN_MERCHN.trim());
            cstmt.setString(15, filter.IN_AUTHNBR.trim());
            cstmt.setString(16, filter.CERROR.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());
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

            if (rst.next()) {
                lngTotCant = rst.getLong("CANT");
                dblTotSVFOP = rst.getDouble("SVFOP");
                dblTotAVFOP = rst.getDouble("AVFOP");
            }

            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strMoneda = filter.strMoneda.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    beanTkt.CERROR = filter.CERROR.trim();
                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.AVFOP = rst.getDouble("AVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.dblTotAVFOP = dblTotAVFOP;

                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    if (!beanTkt.SCARCOD.trim().isEmpty()) {
                        beanTkt.strTitulo += beanTkt.strFormatDate + " - Country : " + beanTkt.strDescCountry + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
                    } else {
                        beanTkt.strTitulo += beanTkt.strFormatDate + " - Country : " + beanTkt.strDescCountry
                                + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
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

    public List<A2290Filter> loadPX263SQP03986(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        String tipFecha = "Sales";
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03986(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PNR.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCUST = rst.getString("CCUST").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.TICKET = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SCARDN = rst.getString("SCARDN");
                beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                //beanTkt.TDOC = rst.getString("TDOC");
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.TDOC = "REFUND";
                } else {
                    beanTkt.TDOC = "SALES";
                }
                beanTkt.SEQ = rst.getString("SEQ");
                //beanTkt.STVAL = rst.getString("STVAL");
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                }
                beanTkt.FTE = rst.getString("FTE").trim();
                if (rst.getString("FTE").trim().equals("A")) {
                    beanTkt.FTE = "ARC";
                } else if (rst.getString("FTE").trim().equals("B")) {
                    beanTkt.FTE = "BSP";
                } else if (rst.getString("FTE").trim().equals("S")) {
                    beanTkt.FTE = "ASR";
                } else if (rst.getString("FTE").trim().equals("M")) {
                    beanTkt.FTE = "Manual";
                }
                beanTkt.SAGENT = rst.getString("SAGENT");
                beanTkt.TVENTA = rst.getString("TVENTA");
                beanTkt.SPAYMENT = rst.getString("SPAYMENT");
                beanTkt.SCARCOD = rst.getString("SCARCOD");
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SVFOPUSD = rst.getDouble("SVFOPUSD");

                lstTkts.add(beanTkt);
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
    
    public List<A2290Filter> loadPX263SQP05116(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        String tipFecha = "Sales";
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05116(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SAGENT.trim());
            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);

            cstmt.execute();

            rst = cstmt.getResultSet();
            
            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCUST = rst.getString("CCUST").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.TICKET = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SCARDN = rst.getString("SCARDN");
                beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                //beanTkt.TDOC = rst.getString("TDOC");
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.TDOC = "REFUND";
                } else {
                    beanTkt.TDOC = "SALES";
                }
                beanTkt.SEQ = rst.getString("SEQ");
                //beanTkt.STVAL = rst.getString("STVAL");
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                }
                beanTkt.FTE = rst.getString("FTE").trim();
                if (rst.getString("FTE").trim().equals("A")) {
                    beanTkt.FTE = "ARC";
                } else if (rst.getString("FTE").trim().equals("B")) {
                    beanTkt.FTE = "BSP";
                } else if (rst.getString("FTE").trim().equals("S")) {
                    beanTkt.FTE = "ASR";
                } else if (rst.getString("FTE").trim().equals("M")) {
                    beanTkt.FTE = "Manual";
                }
                beanTkt.SAGENT = rst.getString("SAGENT");
                beanTkt.TVENTA = rst.getString("TVENTA");
                beanTkt.SPAYMENT = rst.getString("SPAYMENT");
                beanTkt.SCARCOD = rst.getString("SCARCOD");
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SVFOPUSD = rst.getDouble("SVFOPUSD");
                
                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
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

    public HashMap<String, List<A2290Filter>> loadPX263SQP00715(A2290Filter filter) throws SQLException, Exception {

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
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00715(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_PAYMENT.trim());
            cstmt.setString(6, filter.IN_FTE.trim());
            cstmt.setString(7, filter.IN_AFTE.trim());
            cstmt.setString(8, filter.SCOUNTRY.trim());
            cstmt.setString(9, filter.IN_CARDN.trim());
            cstmt.setString(10, filter.SCARCOD.trim());
            cstmt.setString(11, filter.IN_TICKET.trim());
            cstmt.setString(12, filter.SCURRENCY.trim());
            cstmt.setString(13, filter.IN_STVAL.trim());
            cstmt.setString(14, filter.IN_MERCHN.trim());
            cstmt.setString(15, filter.IN_CERROR.trim());
            cstmt.setString(16, filter.IN_AUTHNBR.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());

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
                dblTotAVFOP += rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.TRNCU = rst.getString("TRNCU");
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                    beanTkt.strMoneda = filter.strMoneda.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    //beanTkt.strDescCard = filter.strDescCard.trim();
                    //beanTkt.strDescCountry = filter.strDescCountry.trim();
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
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.STCNTR = rst.getString("STCNTR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.strDescCard = rst.getString("NAMECARS").trim();
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

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.dblTotAVFOP = dblTotAVFOP;
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    //TEF
                    beanTkt.TDATE = rst.getString("TDATE").trim();

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

                    beanTkt.lngQOBS = rst.getLong("QOB");
                    //Armando Título del Detalle
                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    try {
                        beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
                    } catch (Exception e) {
                    }

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

    public HashMap<String, List<A2290Filter>> loadPX263SQP00715_REFND(A2290Filter filter) throws SQLException, Exception {

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
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00715_REFND(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_PAYMENT.trim());
            cstmt.setString(6, filter.IN_FTE.trim());
            cstmt.setString(7, filter.IN_AFTE.trim());
            cstmt.setString(8, filter.SCOUNTRY.trim());
            cstmt.setString(9, filter.IN_CARDN.trim());
            cstmt.setString(10, filter.SCARCOD.trim());
            cstmt.setString(11, filter.IN_TICKET.trim());
            cstmt.setString(12, filter.SCURRENCY.trim());
            cstmt.setString(13, filter.IN_STVAL.trim());
            cstmt.setString(14, filter.IN_MERCHN.trim());
            cstmt.setString(15, filter.IN_CERROR.trim());
            cstmt.setString(16, filter.IN_AUTHNBR.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());

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
                dblTotAVFOP += rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
//                    beanTkt.TRNCU = rst.getString("TRNCU");
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                    beanTkt.strMoneda = filter.strMoneda.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    //beanTkt.strDescCard = filter.strDescCard.trim();
                    //beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.strPEM = "";
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("TKT").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.TKT = rst.getString("TKT").trim();
//                    beanTkt.FORMA = rst.getString("FORMA").trim();
//                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
//                    beanTkt.SEQ = rst.getString("SEQ").trim();
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

//                    beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
//                    beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                    beanTkt.SCARCOD = rst.getString("FRANQUICIA").trim();
//                    beanTkt.STCNTR = rst.getString("STCNTR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SUBTOTAL");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                    //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();

                    beanTkt.SPNR = rst.getString("SPNR").trim();

                    if (beanTkt.SFLOAD.trim().equals("M")) {
                        beanTkt.SFLOAD = "Manual";
                    }
//                    beanTkt.MERCHN = rst.getString("MERCHN").trim();

                    //Banks
//                    beanTkt.BDATEL = rst.getString("BDATEL").trim();
//                    beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
//                    if (beanTkt.BSTVAL.trim().equals("1")) {
//                        beanTkt.BSTVAL = "Accepted";
//                    } else if (beanTkt.BSTVAL.trim().equals("2")) {
//                        beanTkt.BSTVAL = "Rejected";
//                    } else if (beanTkt.BSTVAL.trim().equals("3")) {
//                        beanTkt.BSTVAL = "Suspect";
//                    }

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.dblTotAVFOP = dblTotAVFOP;
//                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    //TEF
//                    beanTkt.TDATE = rst.getString("TDATE").trim();

//                    try {
//                        if (!beanTkt.BDATEP.trim().equals("") && !beanTkt.SDATE.trim().equals("")) {
//                            beanTkt.lngDays = Functions.diferenciaDias(beanTkt.SDATE, beanTkt.BDATEP);
//
//                        } else if (!beanTkt.TDATE.trim().equals("") && !beanTkt.SDATE.trim().equals("")) {
//                            beanTkt.lngDays = Functions.diferenciaDias(beanTkt.SDATE, beanTkt.TDATE);
//
//                        } else if (!beanTkt.SDATE.trim().equals("")) {
//                            beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.SDATE);
//                        }
//                    } catch (Exception e) {
//                    }

                    beanTkt.lngQOBS = rst.getLong("QOB");
                    //Armando Título del Detalle
                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    try {
                        beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
                    } catch (Exception e) {
                    }

//                    if (rst.getString("TKVOID").trim().equals("V")) {
//                        beanTkt.strFlagStat = "Void";
//
//                    } else if (rst.getString("FLAGC").trim().equals("C")) {
//                        beanTkt.strFlagStat = "CNJ";
//                    }

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
    
    public HashMap<String, List<A2290Filter>> loadPX263SQP00715_CHGBAK(A2290Filter filter) throws SQLException, Exception {

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
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00715_CHGBAK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_PAYMENT.trim());
            cstmt.setString(6, filter.IN_FTE.trim());
            cstmt.setString(7, filter.IN_AFTE.trim());
            cstmt.setString(8, filter.SCOUNTRY.trim());
            cstmt.setString(9, filter.IN_CARDN.trim());
            cstmt.setString(10, filter.SCARCOD.trim());
            cstmt.setString(11, filter.IN_TICKET.trim());
            cstmt.setString(12, filter.SCURRENCY.trim());
            cstmt.setString(13, filter.IN_STVAL.trim());
            cstmt.setString(14, filter.IN_MERCHN.trim());
            cstmt.setString(15, filter.IN_CERROR.trim());
            cstmt.setString(16, filter.IN_AUTHNBR.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());

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
                dblTotAVFOP += rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
//                    beanTkt.TRNCU = rst.getString("TRNCU");
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                    beanTkt.strMoneda = filter.strMoneda.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    //beanTkt.strDescCard = filter.strDescCard.trim();
                    //beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.strPEM = "";
//                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("TKT").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
//                    beanTkt.TKT = rst.getString("TKT").trim();
//                    beanTkt.FORMA = rst.getString("FORMA").trim();
//                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
//                    beanTkt.SEQ = rst.getString("SEQ").trim();
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

//                    beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("IDATE").trim();
//                    beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                    beanTkt.SCARCOD = rst.getString("FRANQUICIA").trim();
//                    beanTkt.STCNTR = rst.getString("STCNTR").trim();
//                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("VALLOCAL");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                    //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
//                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();

                    beanTkt.SPNR = rst.getString("NOMPAX").trim();

                    if (beanTkt.SFLOAD.trim().equals("M")) {
                        beanTkt.SFLOAD = "Manual";
                    }
//                    beanTkt.MERCHN = rst.getString("MERCHN").trim();

                    //Banks
//                    beanTkt.BDATEL = rst.getString("BDATEL").trim();
//                    beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
//                    if (beanTkt.BSTVAL.trim().equals("1")) {
//                        beanTkt.BSTVAL = "Accepted";
//                    } else if (beanTkt.BSTVAL.trim().equals("2")) {
//                        beanTkt.BSTVAL = "Rejected";
//                    } else if (beanTkt.BSTVAL.trim().equals("3")) {
//                        beanTkt.BSTVAL = "Suspect";
//                    }

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.dblTotAVFOP = dblTotAVFOP;
//                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    //TEF
//                    beanTkt.TDATE = rst.getString("TDATE").trim();

//                    try {
//                        if (!beanTkt.BDATEP.trim().equals("") && !beanTkt.SDATE.trim().equals("")) {
//                            beanTkt.lngDays = Functions.diferenciaDias(beanTkt.SDATE, beanTkt.BDATEP);
//
//                        } else if (!beanTkt.TDATE.trim().equals("") && !beanTkt.SDATE.trim().equals("")) {
//                            beanTkt.lngDays = Functions.diferenciaDias(beanTkt.SDATE, beanTkt.TDATE);
//
//                        } else if (!beanTkt.SDATE.trim().equals("")) {
//                            beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.SDATE);
//                        }
//                    } catch (Exception e) {
//                    }

                    beanTkt.lngQOBS = rst.getLong("QOB");
                    //Armando Título del Detalle
                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    try {
                        beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
                    } catch (Exception e) {
                    }

//                    if (rst.getString("TKVOID").trim().equals("V")) {
//                        beanTkt.strFlagStat = "Void";
//
//                    } else if (rst.getString("FLAGC").trim().equals("C")) {
//                        beanTkt.strFlagStat = "CNJ";
//                    }

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
    
    public HashMap<String, List<A2290Filter>> loadPX263SQP00715_ACREDIT(A2290Filter filter) throws SQLException, Exception {

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
        hmDescEstados.put("", tipFecha + " without Reconcili.");
        hmDescEstados.put("3", "Reconcili without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00715_ACREDIT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro.trim());
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_PAYMENT.trim());
            cstmt.setString(6, filter.IN_FTE.trim());
            cstmt.setString(7, filter.IN_AFTE.trim());
            cstmt.setString(8, filter.SCOUNTRY.trim());
            cstmt.setString(9, filter.IN_CARDN.trim());
            cstmt.setString(10, filter.SCARCOD.trim());
            cstmt.setString(11, filter.IN_TICKET.trim());
            cstmt.setString(12, filter.SCURRENCY.trim());
            cstmt.setString(13, filter.IN_STVAL.trim());
            cstmt.setString(14, filter.IN_MERCHN.trim());
            cstmt.setString(15, filter.IN_CERROR.trim());
            cstmt.setString(16, filter.IN_AUTHNBR.trim());
            cstmt.setString(17, filter.IN_ADYEN.trim());

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
                dblTotAVFOP += rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
//                    beanTkt.TRNCU = rst.getString("TRNCU");
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                    beanTkt.strMoneda = filter.strMoneda.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    //beanTkt.strDescCard = filter.strDescCard.trim();
                    //beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.strPEM = "";
//                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("TKT").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
//                    beanTkt.TKT = rst.getString("TKT").trim();
//                    beanTkt.FORMA = rst.getString("FORMA").trim();
//                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
//                    beanTkt.SEQ = rst.getString("SEQ").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
//                    if (!rst.getString("ERROR").trim().isEmpty()) {
//                        beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
//                    } else {
//                        beanTkt.CERROR = rst.getString("CERROR").trim();
//                    }
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

//                    beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();
//                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("PRDA").trim();
//                    beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                    beanTkt.SCARCOD = rst.getString("FRANQUICIA").trim();
//                    beanTkt.STCNTR = rst.getString("STCNTR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("VALOR");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                    //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDSATEXP").trim(), "MMyy", "yyyyMM");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();

                    beanTkt.SPNR = rst.getString("SPNR").trim();

                    if (beanTkt.SFLOAD.trim().equals("M")) {
                        beanTkt.SFLOAD = "Manual";
                    }
//                    beanTkt.MERCHN = rst.getString("MERCHN").trim();

                    //Banks
//                    beanTkt.BDATEL = rst.getString("BDATEL").trim();
//                    beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
//                    if (beanTkt.BSTVAL.trim().equals("1")) {
//                        beanTkt.BSTVAL = "Accepted";
//                    } else if (beanTkt.BSTVAL.trim().equals("2")) {
//                        beanTkt.BSTVAL = "Rejected";
//                    } else if (beanTkt.BSTVAL.trim().equals("3")) {
//                        beanTkt.BSTVAL = "Suspect";
//                    }

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblTotSVFOP;
                    beanTkt.dblTotAVFOP = dblTotAVFOP;
//                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    //TEF
//                    beanTkt.TDATE = rst.getString("TDATE").trim();

//                    try {
//                        if (!beanTkt.BDATEP.trim().equals("") && !beanTkt.SDATE.trim().equals("")) {
//                            beanTkt.lngDays = Functions.diferenciaDias(beanTkt.SDATE, beanTkt.BDATEP);
//
//                        } else if (!beanTkt.TDATE.trim().equals("") && !beanTkt.SDATE.trim().equals("")) {
//                            beanTkt.lngDays = Functions.diferenciaDias(beanTkt.SDATE, beanTkt.TDATE);
//
//                        } else if (!beanTkt.SDATE.trim().equals("")) {
//                            beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.SDATE);
//                        }
//                    } catch (Exception e) {
//                    }

                    beanTkt.lngQOBS = rst.getLong("QOB");
                    //Armando Título del Detalle
                    if (beanTkt.strFecFiltro.equals("DATEC")) {
                        beanTkt.strTitulo = "Conciliation Date : ";
                    } else if (beanTkt.IN_TDOC.equals("R")) {
                        beanTkt.strTitulo = "Refund Date : ";
                    } else {
                        beanTkt.strTitulo = "Sales Date : ";
                    }
                    try {
                        beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";
                    } catch (Exception e) {
                    }

//                    if (rst.getString("TKVOID").trim().equals("V")) {
//                        beanTkt.strFlagStat = "Void";
//
//                    } else if (rst.getString("FLAGC").trim().equals("C")) {
//                        beanTkt.strFlagStat = "CNJ";
//                    }

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
//                    beanTkt.CERROR = rst.getString("CERROR").trim();
//                    if (!rst.getString("ERROR").trim().isEmpty()) {
//                        beanTkt.strDescripcion = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
//                    } else {
//                        beanTkt.strDescripcion = rst.getString("CERROR").trim();
//                    }
                    lstError.add(beanTkt);
                }
                rst.close();
            }

            hmResultado.put("TKT", lstTkts);
            hmResultado.put("ERROR", lstError);

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
    
    public List<MPF106Filter> loadPX263getCorreosAV(MPF100Filter filter) throws SQLException, Exception {

        List<MPF106Filter> lstCorreos = new ArrayList<MPF106Filter>(0);
        MPF106Filter beanTkt;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".getCorreosAV(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);


            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA);
            cstmt.setString(3, session.getUserView().getCustomerInfo().USR);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new MPF106Filter();
                beanTkt.EMAILS = rst.getString("EMAILS");
                beanTkt.CAGENCY = rst.getString("CAGENCY");
                beanTkt.NAMEA = rst.getString("NAMEA");

                lstCorreos.add(beanTkt);

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

        return lstCorreos;
    }

    public List<MPF100Filter> loadPX263SQP00XXXJT(MPF100Filter filter) throws SQLException, Exception {

        List<MPF100Filter> lstTkts = new ArrayList<MPF100Filter>(0);
        MPF100Filter beanTkt;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00XXXJT(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);


            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(3, filter.IN_AGENT);
            cstmt.setString(4, filter.IN_FECHA);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new MPF100Filter();
                beanTkt.STVAL = rst.getString("STVAL");
                beanTkt.SAGENT = rst.getString("SAGENT");
                beanTkt.DIG_AGENT = rst.getString("DIG");
                beanTkt.strDescripcion = rst.getString("DESCAGT");
                beanTkt.CCIA = rst.getString("CCIA");
                beanTkt.FORMA = rst.getString("FORMA");
                beanTkt.SERIE = rst.getString("SERIE");
                beanTkt.SDATE = rst.getString("SDATE");
                beanTkt.SCARDN = rst.getString("SCARDN");
                beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                beanTkt.SVFOP = rst.getDouble("SVFOP");

                lstTkts.add(beanTkt);

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
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
