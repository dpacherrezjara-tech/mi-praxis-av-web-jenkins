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
import net.miatech.praxis.payment.filter.A4164Filter;
import net.miatech.praxis.payment.filter.A2370Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadConciliationTestDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    /**
     * *************************** PX263
     * ***************************************
     */
    public List<A4164Filter> loadPX584SQP04338(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQSALES = 0, lngTotQACCB = 0, lngTotQDIFF = 0;
        long lngTotQACEP = 0, lngTotQRECH = 0, lngTotQSOSP = 0, lngTotQPAID = 0;
        long lngTotQMANUAL = 0, lngTotQWSET = 0, lngTotQTHTEF = 0, lngTotQCLAR = 0, lngTotQCHRG = 0;
        String Fec = "";

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04338(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.VARCHAR);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

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
            cstmt.setString(16, filter.IN_CURRENCY.trim());
            cstmt.setString(17, "");

            cstmt.setInt(18, filter.page.PAGNUM);
            cstmt.setInt(19, filter.page.PAGROW);
            cstmt.setInt(20, filter.page.TOTPAG);
            cstmt.setInt(21, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            Fec = cstmt.getString(17);
            filter.page.PAGNUM = cstmt.getInt(18);
            filter.page.PAGROW = cstmt.getInt(19);
            filter.page.TOTPAG = cstmt.getInt(20);
            filter.page.TOTROW = cstmt.getInt(21);

            while (rst.next()) {
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQACCB = rst.getLong("QACCB");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQMANUAL = rst.getLong("QMANU");
                lngTotQACEP = rst.getLong("QACEP");
                lngTotQRECH = rst.getLong("QRECH");
                lngTotQSOSP = rst.getLong("QSOSP");
                lngTotQPAID = rst.getLong("QPAID");
                lngTotQWSET = rst.getLong("QTOTWS");
                lngTotQTHTEF = rst.getLong("QTHTEF");
                lngTotQCLAR = rst.getLong("QCLAR");
                lngTotQCHRG = rst.getLong("QCHRG");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A4164Filter();
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

                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQACCB = rst.getLong("QACCB");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQMANUAL = rst.getLong("QMANU");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QSALES")
                            + rst.getLong("QACCB") + rst.getLong("QDIFF") + rst.getLong("QMANU");

                    beanTkt.lngQACEP = rst.getLong("QACEP");
                    beanTkt.lngQRECH = rst.getLong("QRECH");
                    beanTkt.lngQSOSP = rst.getLong("QSOSP");
                    beanTkt.lngQTHTEF = rst.getLong("QTHTEF");
                    //Sin Settlement
                    /*beanTkt.lngQTOTWS = beanTkt.lngQTOTSAL - (rst.getLong("QACEP")
                     + rst.getLong("QRECH") + rst.getLong("QSOSP"));*/
                    beanTkt.lngQTOTWS = rst.getLong("QTOTWS");
                    beanTkt.lngQTOTBK = rst.getLong("QACEP") + rst.getLong("QRECH")
                            + rst.getLong("QSOSP") + rst.getLong("QTOTWS") + rst.getLong("QTHTEF");

                    beanTkt.lngQPAID = rst.getLong("QPAID");
                    beanTkt.lngQCLAR = rst.getLong("QCLAR");
                    beanTkt.lngQCHRG = rst.getLong("QCHRG");
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQACCB = lngTotQACCB;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQTOTSAL = lngTotQMATCH + lngTotQSALES + lngTotQACCB + lngTotQDIFF + lngTotQMANUAL;

                    beanTkt.lngTotQACEP = lngTotQACEP;
                    beanTkt.lngTotQRECH = lngTotQRECH;
                    beanTkt.lngTotQSOSP = lngTotQSOSP;
                    beanTkt.lngTotQTHTEF = lngTotQTHTEF;
                    beanTkt.lngTotQCLAR = lngTotQCLAR;
                    beanTkt.lngTotQCHRG = lngTotQCHRG;
                    //Sin Settlement
                    //beanTkt.lngTotQTOTWS = beanTkt.lngTotQTOTSAL - (lngTotQACEP + lngTotQRECH + lngTotQSOSP);
                    beanTkt.lngTotQTOTWS = lngTotQWSET;
                    beanTkt.lngTotQTOTBK = lngTotQWSET + lngTotQACEP + lngTotQRECH + lngTotQSOSP + lngTotQTHTEF;

                    beanTkt.lngTotQPAID = lngTotQPAID;

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
    
    public List<A4164Filter> loadPX584SQP04730(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        long lngTotQSALES = 0, lngTotQMATCH = 0, lngTotQMANUAL = 0, lngTotQPEND = 0;
        long lngTotQVSALES = 0, lngTotQVMATCH = 0, lngTotQVMANUAL = 0, lngTotQVPEND = 0;
        long lngTotQCOMPS = 0, lngTotQCOMPM = 0, lngTotQPLUSS = 0, lngTotQPLUSM = 0;
        long lngTotQTABES = 0, lngTotQTABEM = 0, lngTotQLIGEA = 0, lngTotQLIGEM = 0;
        String Fec = "";

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04730(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(16, filter.IN_CURRENCY.trim());

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
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQPEND = rst.getLong("QPEND");
                lngTotQCOMPS = rst.getLong("QCOMPS");
                lngTotQCOMPM = rst.getLong("QCOMPM");
                lngTotQPLUSS = rst.getLong("QPLUSS");
                lngTotQPLUSM = rst.getLong("QPLUSM");
                lngTotQTABES = rst.getLong("QTABES");
                lngTotQTABEM = rst.getLong("QTABEM");
                lngTotQLIGEA = rst.getLong("QLIGEA");
                lngTotQLIGEM = rst.getLong("QLIGEM");
                //Void
                lngTotQVSALES = rst.getLong("QVSALES");
                lngTotQVMATCH = rst.getLong("QVMATCH");
                lngTotQVMANUAL = rst.getLong("QVMANUAL");
                lngTotQVPEND = rst.getLong("QVPEND");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A4164Filter();
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
                    beanTkt.lngQCOMPS = rst.getLong("QCOMPS");
                    beanTkt.lngQCOMPM = rst.getLong("QCOMPM");
                    beanTkt.lngQCOMPP = beanTkt.lngQCOMPS - beanTkt.lngQCOMPM;
                    beanTkt.lngQPLUSS = rst.getLong("QPLUSS");
                    beanTkt.lngQPLUSM = rst.getLong("QPLUSM");
                    beanTkt.lngQPLUSP = beanTkt.lngQPLUSS - beanTkt.lngQPLUSM;
                    beanTkt.lngQTABES = rst.getLong("QTABES");
                    beanTkt.lngQTABEM = rst.getLong("QTABEM");
                    beanTkt.lngQTABEP = beanTkt.lngQTABES - beanTkt.lngQTABEM;
                    beanTkt.lngQLIGEA = rst.getLong("QLIGEA");
                    beanTkt.lngQLIGEM = rst.getLong("QLIGEM");
                    beanTkt.lngQLIGEP = beanTkt.lngQLIGEA - beanTkt.lngQLIGEM;
                    
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QMANUAL") + rst.getLong("QSALES");
                    
                    //Void
                    beanTkt.lngQVSALES = rst.getLong("QVSALES");
                    beanTkt.lngQVMATCH = rst.getLong("QVMATCH");
                    beanTkt.lngQVMANUAL = rst.getLong("QVMANUAL");
                    beanTkt.lngQVPEND = rst.getLong("QVPEND");
                
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQCOMPS = lngTotQCOMPS;
                    beanTkt.lngTotQCOMPM = lngTotQCOMPM;
                    beanTkt.lngTotQCOMPP = beanTkt.lngTotQCOMPS - beanTkt.lngTotQCOMPM;
                    beanTkt.lngTotQPLUSS = lngTotQPLUSS;
                    beanTkt.lngTotQPLUSM = lngTotQPLUSM;
                    beanTkt.lngTotQPLUSP = beanTkt.lngTotQPLUSS - beanTkt.lngTotQPLUSM;
                    beanTkt.lngTotQTABES = lngTotQTABES;
                    beanTkt.lngTotQTABEM = lngTotQTABEM;
                    beanTkt.lngTotQTABEP = beanTkt.lngTotQTABES - beanTkt.lngTotQTABEM;
                    beanTkt.lngTotQLIGEA = lngTotQLIGEA;
                    beanTkt.lngTotQLIGEM = lngTotQLIGEM;
                    beanTkt.lngTotQLIGEP = beanTkt.lngTotQLIGEA - beanTkt.lngTotQLIGEM;
                    beanTkt.lngTotQTOTSAL = lngTotQMATCH + lngTotQSALES + lngTotQMANUAL;
                    //Void
                    beanTkt.lngTotQVSALES = lngTotQVSALES;
                    beanTkt.lngTotQVMATCH = lngTotQVMATCH;
                    beanTkt.lngTotQVMANUAL = lngTotQVMANUAL;
                    beanTkt.lngTotQVPEND = lngTotQVPEND;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
           // }
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

    public List<A2370Filter> loadPX584SQP00899(A4164Filter filter) throws SQLException, Exception {

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP00899(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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

    public HashMap<String, List<A4164Filter>> loadPX584SQP04347(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        List<A4164Filter> lstError = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        String tipFecha = "Sales";
        long lngTotCant = 0;
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconciliation");
        hmDescEstados.put("3", "Reconciliation without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Stand By");

        HashMap<String, String> hmDescCompl = new HashMap<String, String>();
        hmDescCompl.put("", "");
        hmDescCompl.put("1", "PLUSGRADE");
        hmDescCompl.put("2", "LIGAS");
        hmDescCompl.put("3", "TABLET");

        HashMap<String, List<A4164Filter>> hmResultado = new HashMap<String, List<A4164Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04347(?,?,?,?,?)}";

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

                    //PRESENTACION SEGUN ESTADO
                    if (!rst.getString("STVAL").trim().equals("4") && !rst.getString("STVAL").trim().equals("5")) {
                        beanTkt = new A4164Filter();
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
                        beanTkt.RFIC = rst.getString("RFIC").trim();
                        beanTkt.RFIS1 = rst.getString("RFIS1").trim();                        
                        
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
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
                        if (rst.getString("STVAL").trim().equals("2") || rst.getString("STVAL").trim().equals("6")) {
                            //SALES
                            beanTkt.SDATEL = rst.getString("SDATEL").trim();
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
                            beanTkt.AVFOP = rst.getDouble("AVFOP");
                            beanTkt.SCARDN = rst.getString("SCARDN").trim();
                            //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                            beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                            //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                            beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                            beanTkt.SINVN = rst.getString("SINVN").trim();
                            beanTkt.SIDATE = rst.getString("SIDATE").trim();
                            beanTkt.SPNR = rst.getString("SPNR").trim();
                            beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                        } else {
                            /*beanTkt.FTE = rst.getString("AFTE").trim();
                             if (rst.getString("AFTE").trim().equals("B")) {
                             beanTkt.strSORIG = "Billed";
                             } else if (rst.getString("AFTE").trim().equals("N")) {
                             beanTkt.strSORIG = "Not Billed";
                             } else if (rst.getString("AFTE").trim().equals("L")) {
                             beanTkt.strSORIG = "Local";
                             }*/
                            beanTkt.SDATEL = rst.getString("ADATEL").trim();
                            beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                            beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                            beanTkt.strDescCountry = rst.getString("NAMEA").trim();
                            beanTkt.SAGENT = rst.getString("AAGENT").trim();
                            beanTkt.SDATE = rst.getString("ADATE").trim();
                            beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                            beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                            beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                            beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                            beanTkt.SVFOP = rst.getDouble("SVFOP");
                            beanTkt.AVFOP = rst.getDouble("AVFOP");
                            beanTkt.SCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strDescCard = rst.getString("NAMECARA").trim();
                            //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                            beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                            beanTkt.SINVN = rst.getString("AINVN").trim();
                            beanTkt.SIDATE = rst.getString("AIDATE").trim();
                            beanTkt.SPNR = rst.getString("APNR").trim();
                            beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                        }
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        lstTkts.add(beanTkt);

                    } else {
                        //MATCH CON DIFERENCIAS
                        //REGISTRO CON DATOS DE LA VENTA =======================
                        beanTkt = new A4164Filter();
                        // beanTkt.strFormatDate = filter.strFormatDate.trim();
                        // beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                        // beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                        beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                        // beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                        //  beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                        // beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                        // beanTkt.IN_FTE = filter.IN_FTE.trim();
                        // beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                        // beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                        // beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                        //beanTkt.strDescCard = filter.strDescCard.trim();
                        //beanTkt.strDescCountry = filter.strDescCountry.trim();
                        beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                        //  beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                        // beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                        // beanTkt.strMoneda = filter.strMoneda.trim();
                        beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                        if (rst.getString("TDOC").trim().equals("R")) {
                            beanTkt.strPEM = "REFUND";
                        } else {
                            beanTkt.strPEM = "SALES";
                        }
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
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
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
                        beanTkt.SDATEL = rst.getString("SDATEL").trim();
                        beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                        beanTkt.strDescCountry = rst.getString("NAMES").trim();
                        beanTkt.SAGENT = rst.getString("SAGENT").trim();
                        beanTkt.SDATE = rst.getString("SDATE").trim();
                        beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                        beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                        beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                        beanTkt.STCNTR = rst.getString("STCNTR").trim();
                        beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                        beanTkt.SVFOP = rst.getDouble("SVFOP");
                        beanTkt.AVFOP = rst.getDouble("AVFOP");
                        beanTkt.SCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("ACARDN").trim());
                        beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                        beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("SINVN").trim();
                        beanTkt.SIDATE = rst.getString("SIDATE").trim();
                        beanTkt.SPNR = rst.getString("SPNR").trim();
                        beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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
                        //}
                        beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(rst.getString("STVAL").trim()).toString() + "** ";

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        lstTkts.add(beanTkt);
                        //REGISTRO CON DATOS DEL ACCB ==============================
                        beanTkt = new A4164Filter();
                        //beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                        // beanTkt.strFormatDate = filter.strFormatDate.trim();
                        // beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                        beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                        // beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                        //  beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                        //beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                        // beanTkt.IN_FTE = filter.IN_FTE.trim();
                        // beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                        // beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                        // beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                        //beanTkt.strDescCard = filter.strDescCard.trim();
                        //beanTkt.strDescCountry = filter.strDescCountry.trim();
                        beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                        // beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                        //beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                        //beanTkt.strMoneda = filter.strMoneda.trim();
                        if (rst.getString("AFTE").trim().equals("X")) {
                            beanTkt.strPEM = "Settlement BSP";
                        } else if (rst.getString("AFTE").trim().equals("A")) {
                            beanTkt.strPEM = "Settlement ARC";
                        } else if (rst.getString("AFTE").trim().equals("B")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else if (rst.getString("AFTE").trim().equals("N")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else if (rst.getString("AFTE").trim().equals("L")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else {
                            beanTkt.strPEM = "Settlement";
                        }
                        beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                        beanTkt.CCIA = rst.getString("CCIA").trim();
                        beanTkt.FORMA = rst.getString("FORMA").trim();
                        beanTkt.SERIE = rst.getString("SERIE").trim();
                        beanTkt.TDOC = rst.getString("TDOC").trim();
                        beanTkt.TRNCU = rst.getString("TRNCU").trim();
                        beanTkt.SEQ = rst.getString("SEQ").trim();
                        beanTkt.RFIS1 = rst.getString("RFIS1").trim(); 
                        if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                            beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                        } else {
                            beanTkt.STVAL = rst.getString("STVAL").trim();
                        }
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
                        }
                        if (!rst.getString("ERROR").trim().isEmpty()) {
                            beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                        } else {
                            beanTkt.CERROR = rst.getString("CERROR").trim();
                        }
                        //PARA AQUELLOS QUE SEAN ACCB SIN VENTA
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
                        beanTkt.SDATEL = rst.getString("ADATEL").trim();
                        beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                        beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                        beanTkt.strDescCountry = rst.getString("NAMEA").trim();
                        beanTkt.SAGENT = rst.getString("AAGENT").trim();
                        beanTkt.SDATE = rst.getString("ADATE").trim();
                        beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                        beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                        beanTkt.strDescCard = rst.getString("NAMECARA").trim();
                        beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                        beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                        beanTkt.SVFOP = rst.getDouble("SVFOP");
                        beanTkt.AVFOP = rst.getDouble("AVFOP");
                        beanTkt.SCARDN = rst.getString("SCARDN").trim();
                        beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                        beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("AINVN").trim();
                        beanTkt.SIDATE = rst.getString("AIDATE").trim();
                        beanTkt.SPNR = rst.getString("APNR").trim();
                        beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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
                        // if (beanTkt.strFecFiltro.equals("DATEC")) {
                        //     beanTkt.strTitulo = "Conciliation Date : ";
                        // } else {
                        if (beanTkt.IN_TDOC.equals("R")) {
                            beanTkt.strTitulo = "Refund Date : ";
                        } else {
                            beanTkt.strTitulo = "Sales Date : ";
                        }
                        //  }
                        beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(rst.getString("STVAL").trim()).toString() + "** ";

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        lstTkts.add(beanTkt);
                    }
                }
                rst.close();

            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    //PRESENTACION SEGUN ERROR
                    beanTkt = new A4164Filter();
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

    public HashMap<String, List<A4164Filter>> loadPX584SQP04352(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        List<A4164Filter> lstError = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        String tipFecha = "Sales";
        long lngTotCant = 0;
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconciliation");
        hmDescEstados.put("3", "Reconciliation without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Stand By");

        HashMap<String, String> hmDescCompl = new HashMap<String, String>();
        hmDescCompl.put("", "");
        hmDescCompl.put("1", "PLUSGRADE");
        hmDescCompl.put("2", "LIGAS");
        hmDescCompl.put("3", "TABLET");

        HashMap<String, List<A4164Filter>> hmResultado = new HashMap<String, List<A4164Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04352(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(4, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(5, filter.IN_TDOC);//SERIE
            cstmt.setString(6, filter.IN_CARDN1);//PRIMEROS 6 DIGITOS DE LA TARJETA
            cstmt.setString(7, filter.IN_CARDN2);//ULTIMOS 4 DIGITOS DE LA TARJETA
            cstmt.setString(8, filter.IN_AUTHNBR);//NUMERO AUTORIZACION
            cstmt.setString(9, filter.IN_ADYEN);

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

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
                    if (!rst.getString("STVAL").trim().equals("4") && !rst.getString("STVAL").trim().equals("5")) {
                        beanTkt = new A4164Filter();
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
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
                        }
                        if (!rst.getString("ERROR").trim().isEmpty()) {
                            beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                        } else {
                            beanTkt.CERROR = rst.getString("CERROR").trim();
                        }
                        if (rst.getString("STVAL").trim().equals("2") || rst.getString("STVAL").trim().equals("6")) {
                            //SALES
                            beanTkt.SDATEL = rst.getString("SDATEL").trim();
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
                            beanTkt.AVFOP = rst.getDouble("AVFOP");
                            beanTkt.SCARDN = rst.getString("SCARDN").trim();
                            //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                            beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                            beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                            beanTkt.SINVN = rst.getString("SINVN").trim();
                            beanTkt.SIDATE = rst.getString("SIDATE").trim();
                            beanTkt.SPNR = rst.getString("SPNR").trim();
                            beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                        } else {
                            beanTkt.SDATEL = rst.getString("ADATEL").trim();
                            beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                            beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                            beanTkt.strDescCountry = rst.getString("NAMEA").trim();
                            beanTkt.SAGENT = rst.getString("AAGENT").trim();
                            beanTkt.SDATE = rst.getString("ADATE").trim();
                            beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                            beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                            beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                            beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                            beanTkt.SVFOP = rst.getDouble("SVFOP");
                            beanTkt.AVFOP = rst.getDouble("AVFOP");
                            beanTkt.SCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strDescCard = rst.getString("NAMECARA").trim();
                            beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                            beanTkt.SINVN = rst.getString("AINVN").trim();
                            beanTkt.SIDATE = rst.getString("AIDATE").trim();
                            beanTkt.SPNR = rst.getString("APNR").trim();
                            beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                        }
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.RFIC = rst.getString("RFIC").trim();
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard /* + " **" + hmDescEstados.get(rst.getString("STVAL").trim()).toString() + "** " */ ;

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        beanTkt.page.PAGNUM = filter.page.PAGNUM;
                        beanTkt.page.PAGROW = filter.page.PAGROW;
                        beanTkt.page.TOTPAG = filter.page.TOTPAG;
                        beanTkt.page.TOTROW = filter.page.TOTROW;

                        lstTkts.add(beanTkt);

                    } else {
                        //MATCH CON DIFERENCIAS
                        //REGISTRO CON DATOS DE LA VENTA =======================
                        beanTkt = new A4164Filter();
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
                        if (rst.getString("TDOC").trim().equals("R")) {
                            beanTkt.strPEM = "REFUND";
                        } else {
                            beanTkt.strPEM = "SALES";
                        }
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
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
                        }
                        if (!rst.getString("ERROR").trim().isEmpty()) {
                            beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                        } else {
                            beanTkt.CERROR = rst.getString("CERROR").trim();
                        }
                        beanTkt.SDATEL = rst.getString("SDATEL").trim();
                        beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                        beanTkt.strDescCountry = rst.getString("NAMES").trim();
                        beanTkt.SAGENT = rst.getString("SAGENT").trim();
                        beanTkt.SDATE = rst.getString("SDATE").trim();
                        beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                        beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                        beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                        beanTkt.STCNTR = rst.getString("STCNTR").trim();
                        beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                        beanTkt.SVFOP = rst.getDouble("SVFOP");
                        beanTkt.AVFOP = rst.getDouble("AVFOP");
                        beanTkt.SCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("ACARDN").trim());
                        beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                        beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("SINVN").trim();
                        beanTkt.SIDATE = rst.getString("SIDATE").trim();
                        beanTkt.SPNR = rst.getString("SPNR").trim();
                        beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(rst.getString("STVAL").trim()).toString() + "** ";

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        beanTkt.page.PAGNUM = filter.page.PAGNUM;
                        beanTkt.page.PAGROW = filter.page.PAGROW;
                        beanTkt.page.TOTPAG = filter.page.TOTPAG;
                        beanTkt.page.TOTROW = filter.page.TOTROW;

                        lstTkts.add(beanTkt);
                        //REGISTRO CON DATOS DEL ACCB ==========================
                        beanTkt = new A4164Filter();
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
                        if (rst.getString("AFTE").trim().equals("X")) {
                            beanTkt.strPEM = "Settlement BSP";
                        } else if (rst.getString("AFTE").trim().equals("A")) {
                            beanTkt.strPEM = "Settlement ARC";
                        } else if (rst.getString("AFTE").trim().equals("B")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else if (rst.getString("AFTE").trim().equals("N")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else if (rst.getString("AFTE").trim().equals("L")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else {
                            beanTkt.strPEM = "Settlement";
                        }
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
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
                        }
                        if (!rst.getString("ERROR").trim().isEmpty()) {
                            beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                        } else {
                            beanTkt.CERROR = rst.getString("CERROR").trim();
                        }
                        //PARA AQUELLOS QUE SEAN ACCB SIN VENTA
                        beanTkt.SDATEL = rst.getString("ADATEL").trim();
                        beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                        beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                        beanTkt.strDescCountry = rst.getString("NAMEA").trim();
                        beanTkt.SAGENT = rst.getString("AAGENT").trim();
                        beanTkt.SDATE = rst.getString("ADATE").trim();
                        beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                        beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                        beanTkt.strDescCard = rst.getString("NAMECARA").trim();
                        beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                        beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                        beanTkt.SVFOP = rst.getDouble("SVFOP");
                        beanTkt.AVFOP = rst.getDouble("AVFOP");
                        beanTkt.SCARDN = rst.getString("SCARDN").trim();
                        beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                        beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("AINVN").trim();
                        beanTkt.SIDATE = rst.getString("AIDATE").trim();
                        beanTkt.SPNR = rst.getString("APNR").trim();
                        beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(rst.getString("STVAL").trim()).toString() + "** ";

                        if (rst.getString("FVOID").trim().equals("V")) {
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
                }
                rst.close();

            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    //PRESENTACION SEGUN ERROR
                    beanTkt = new A4164Filter();
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

    public HashMap<String, List<A4164Filter>> loadPX584SQP04353(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        List<A4164Filter> lstError = new ArrayList<A4164Filter>(0);
        String tipFecha = "Sales";
        A4164Filter beanTkt;
        long lngTotCant = 0;
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconciliation");
        hmDescEstados.put("3", "Reconciliation without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Stand By");

        HashMap<String, List<A4164Filter>> hmResultado = new HashMap<String, List<A4164Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04353(?,?,?,?,?,?,?,?)}";

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
                    if (!rst.getString("STVAL").trim().equals("4") && !rst.getString("STVAL").trim().equals("5")) {
                        beanTkt = new A4164Filter();
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
                        if (rst.getString("STVAL").trim().equals("2") || rst.getString("STVAL").trim().equals("6")) {
                            //SALES
                            /*beanTkt.FTE = rst.getString("FTE").trim();
                             if (rst.getString("FTE").trim().equals("A")) {
                             beanTkt.strSORIG = "ARC";
                             } else if (rst.getString("FTE").trim().equals("B")) {
                             beanTkt.strSORIG = "BSP";
                             } else if (rst.getString("FTE").trim().equals("S")) {
                             beanTkt.strSORIG = "ASR";
                             }*/
                            beanTkt.SDATEL = rst.getString("SDATEL").trim();
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
                            beanTkt.AVFOP = rst.getDouble("AVFOP");
                            beanTkt.SCARDN = rst.getString("SCARDN").trim();
                            //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                            beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                            //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                            beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                            beanTkt.SINVN = rst.getString("SINVN").trim();
                            beanTkt.SIDATE = rst.getString("SIDATE").trim();
                            beanTkt.SPNR = rst.getString("SPNR").trim();
                            beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                        } else {
                            /*beanTkt.FTE = rst.getString("AFTE").trim();
                             if (rst.getString("AFTE").trim().equals("B")) {
                             beanTkt.strSORIG = "Billed";
                             } else if (rst.getString("AFTE").trim().equals("N")) {
                             beanTkt.strSORIG = "Not Billed";
                             } else if (rst.getString("AFTE").trim().equals("L")) {
                             beanTkt.strSORIG = "Local";
                             }*/
                            beanTkt.SDATEL = rst.getString("ADATEL").trim();
                            beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                            beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                            beanTkt.strDescCountry = rst.getString("NAMEA").trim();
                            beanTkt.SAGENT = rst.getString("AAGENT").trim();
                            beanTkt.SDATE = rst.getString("ADATE").trim();
                            beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                            beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                            beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                            beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                            beanTkt.SVFOP = rst.getDouble("SVFOP");
                            beanTkt.AVFOP = rst.getDouble("AVFOP");
                            beanTkt.SCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strDescCard = rst.getString("NAMECARA").trim();
                            //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                            beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                            beanTkt.SINVN = rst.getString("AINVN").trim();
                            beanTkt.SIDATE = rst.getString("AIDATE").trim();
                            beanTkt.SPNR = rst.getString("APNR").trim();
                            beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                        }
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        lstTkts.add(beanTkt);

                    } else {
                        //MATCH CON DIFERENCIAS
                        //REGISTRO CON DATOS DE LA VENTA =======================
                        beanTkt = new A4164Filter();
                        // beanTkt.strFormatDate = filter.strFormatDate.trim();
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
                        //beanTkt.strDescCard = filter.strDescCard.trim();
                        //beanTkt.strDescCountry = filter.strDescCountry.trim();
                        // beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                        beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                        beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                        beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                        // beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                        // beanTkt.strMoneda = filter.strMoneda.trim();
                        beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                        if (rst.getString("TDOC").trim().equals("R")) {
                            beanTkt.strPEM = "REFUND";
                        } else {
                            beanTkt.strPEM = "SALES";
                        }
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
                        /*beanTkt.FTE = rst.getString("FTE").trim();
                         if (rst.getString("FTE").trim().equals("A")) {
                         beanTkt.strSORIG = "ARC";
                         } else if (rst.getString("FTE").trim().equals("B")) {
                         beanTkt.strSORIG = "BSP";
                         } else if (rst.getString("FTE").trim().equals("S")) {
                         beanTkt.strSORIG = "ASR";
                         }*/
                        beanTkt.SDATEL = rst.getString("SDATEL").trim();
                        beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                        beanTkt.strDescCountry = rst.getString("NAMES").trim();
                        beanTkt.SAGENT = rst.getString("SAGENT").trim();
                        beanTkt.SDATE = rst.getString("SDATE").trim();
                        beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                        beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                        beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                        beanTkt.STCNTR = rst.getString("STCNTR").trim();
                        beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                        beanTkt.SVFOP = rst.getDouble("SVFOP");
                        beanTkt.AVFOP = rst.getDouble("AVFOP");
                        beanTkt.SCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("ACARDN").trim());
                        beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                        beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("SINVN").trim();
                        beanTkt.SIDATE = rst.getString("SIDATE").trim();
                        beanTkt.SPNR = rst.getString("SPNR").trim();
                        beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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
                        //}
                        beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(rst.getString("STVAL").trim()).toString() + "** ";

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        lstTkts.add(beanTkt);
                        //REGISTRO CON DATOS DEL ACCB ==============================
                        beanTkt = new A4164Filter();
                        //beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                        // beanTkt.strFormatDate = filter.strFormatDate.trim();
                        // beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                        beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                        // beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                        // beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                        //beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                        // beanTkt.IN_FTE = filter.IN_FTE.trim();
                        // beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                        // beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                        // beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                        //beanTkt.strDescCard = filter.strDescCard.trim();
                        //beanTkt.strDescCountry = filter.strDescCountry.trim();
                        //  beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                        beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                        beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                        beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                        //beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                        //beanTkt.strMoneda = filter.strMoneda.trim();
                        if (rst.getString("AFTE").trim().equals("X")) {
                            beanTkt.strPEM = "Settlement BSP";
                        } else if (rst.getString("AFTE").trim().equals("A")) {
                            beanTkt.strPEM = "Settlement ARC";
                        } else if (rst.getString("AFTE").trim().equals("B")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else if (rst.getString("AFTE").trim().equals("N")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else if (rst.getString("AFTE").trim().equals("L")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else {
                            beanTkt.strPEM = "Settlement";
                        }
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
                        //PARA AQUELLOS QUE SEAN ACCB SIN VENTA
                        /*beanTkt.FTE = rst.getString("AFTE").trim();
                         if (rst.getString("AFTE").trim().equals("B")) {
                         beanTkt.strSORIG = "Billed";
                         } else if (rst.getString("AFTE").trim().equals("N")) {
                         beanTkt.strSORIG = "Not Billed";
                         } else if (rst.getString("AFTE").trim().equals("L")) {
                         beanTkt.strSORIG = "Local";
                         }*/
                        beanTkt.SDATEL = rst.getString("ADATEL").trim();
                        beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                        beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                        beanTkt.strDescCountry = rst.getString("NAMEA").trim();
                        beanTkt.SAGENT = rst.getString("AAGENT").trim();
                        beanTkt.SDATE = rst.getString("ADATE").trim();
                        beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                        beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                        beanTkt.strDescCard = rst.getString("NAMECARA").trim();
                        beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                        beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                        beanTkt.SVFOP = rst.getDouble("SVFOP");
                        beanTkt.AVFOP = rst.getDouble("AVFOP");
                        beanTkt.SCARDN = rst.getString("SCARDN").trim();
                        beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                        beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("AINVN").trim();
                        beanTkt.SIDATE = rst.getString("AIDATE").trim();
                        beanTkt.SPNR = rst.getString("APNR").trim();
                        beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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
                        // if (beanTkt.strFecFiltro.equals("DATEC")) {
                        //     beanTkt.strTitulo = "Conciliation Date : ";
                        // } else {
                        if (beanTkt.IN_TDOC.equals("R")) {
                            beanTkt.strTitulo = "Refund Date : ";
                        } else {
                            beanTkt.strTitulo = "Sales Date : ";
                        }
                        //  }
                        beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(rst.getString("STVAL").trim()).toString() + "** ";

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        lstTkts.add(beanTkt);
                    }
                }
                rst.close();

            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    //PRESENTACION SEGUN ERROR
                    beanTkt = new A4164Filter();
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

    public List<A4164Filter> loadPX584SQP04340(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQSALES = 0, lngTotQACCB = 0, lngTotQDIFF = 0;
        long lngTotQACEP = 0, lngTotQRECH = 0, lngTotQSOSP = 0, lngTotQPAID = 0;
        long lngTotQMANUAL = 0, lngTotQWSET = 0, lngTotQTHTEF = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04340(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

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
            cstmt.setString(16, filter.IN_CURRENCY.trim());

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
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQACCB = rst.getLong("QACCB");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQMANUAL = rst.getLong("QMANU");
                lngTotQACEP = rst.getLong("QACEP");
                lngTotQRECH = rst.getLong("QRECH");
                lngTotQSOSP = rst.getLong("QSOSP");
                lngTotQPAID = rst.getLong("QPAID");
                lngTotQWSET = rst.getLong("QTOTWS");
                lngTotQTHTEF = rst.getLong("QTHTEF");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A4164Filter();
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
                        beanTkt.strDescCountry = "(Sales without Reconciliation)";
                    } else {
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                        /*if (hmPaises.containsKey(rst.getString("ACOUNTRY").trim().toUpperCase())) {
                         beanTkt.strDescCountry = hmPaises.get(rst.getString("ACOUNTRY").trim()).toString();
                         }*/
                        beanTkt.strDescCountry = rst.getString("NAME").trim();
                    }
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQACCB = rst.getLong("QACCB");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQMANUAL = rst.getLong("QMANU");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QSALES")
                            + rst.getLong("QACCB") + rst.getLong("QDIFF") + rst.getLong("QMANU");

                    beanTkt.lngQACEP = rst.getLong("QACEP");
                    beanTkt.lngQRECH = rst.getLong("QRECH");
                    beanTkt.lngQSOSP = rst.getLong("QSOSP");
                    beanTkt.lngQTHTEF = rst.getLong("QTHTEF");
                    //Sin Settlement
                    /*beanTkt.lngQTOTWS = beanTkt.lngQTOTSAL - (rst.getLong("QACEP")
                     + rst.getLong("QRECH") + rst.getLong("QSOSP"));*/
                    beanTkt.lngQTOTWS = rst.getLong("QTOTWS");
                    beanTkt.lngQTOTBK = rst.getLong("QACEP") + rst.getLong("QRECH")
                            + rst.getLong("QSOSP") + rst.getLong("QTOTWS") + rst.getLong("QTHTEF");

                    beanTkt.lngQPAID = rst.getLong("QPAID");
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQACCB = lngTotQACCB;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQTOTSAL = lngTotQMATCH + lngTotQSALES + lngTotQACCB + lngTotQDIFF + lngTotQMANUAL;

                    beanTkt.lngTotQACEP = lngTotQACEP;
                    beanTkt.lngTotQRECH = lngTotQRECH;
                    beanTkt.lngTotQSOSP = lngTotQSOSP;
                    beanTkt.lngTotQTHTEF = lngTotQTHTEF;
                    //Sin Settlement
                    //beanTkt.lngTotQTOTWS = beanTkt.lngTotQTOTSAL - (lngTotQACEP + lngTotQRECH + lngTotQSOSP);
                    beanTkt.lngTotQTOTWS = lngTotQWSET;
                    beanTkt.lngTotQTOTBK = lngTotQWSET + lngTotQACEP + lngTotQRECH + lngTotQSOSP + lngTotQTHTEF;

                    beanTkt.lngTotQPAID = lngTotQPAID;

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
    
    public List<A4164Filter> loadPX584SQP04731(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQSALES = 0, lngTotQACCB = 0, lngTotQDIFF = 0;
        long lngTotQVSALES = 0, lngTotQVMATCH = 0, lngTotQVMANUAL = 0, lngTotQVPEND = 0;
        long lngTotQACEP = 0, lngTotQRECH = 0, lngTotQSOSP = 0, lngTotQPAID = 0;
        long lngTotQMANUAL = 0, lngTotQWSET = 0, lngTotQTHTEF = 0, lngTotQPEND = 0;
        long lngTotQCOMPS = 0, lngTotQCOMPM = 0, lngTotQPLUSS = 0, lngTotQPLUSM = 0;
        long lngTotQTABES = 0, lngTotQTABEM = 0, lngTotQLIGEA = 0, lngTotQLIGEM = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04731(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

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
            cstmt.setString(16, filter.IN_CURRENCY.trim());

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
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQACCB = rst.getLong("QACCB");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQACEP = rst.getLong("QACEP");
                lngTotQRECH = rst.getLong("QRECH");
                lngTotQSOSP = rst.getLong("QSOSP");
                lngTotQPAID = rst.getLong("QPAID");
                lngTotQWSET = rst.getLong("QTOTWS");
                lngTotQTHTEF = rst.getLong("QTHTEF");
                lngTotQPEND = rst.getLong("QPEND");
                lngTotQCOMPS = rst.getLong("QCOMPS");
                lngTotQCOMPM = rst.getLong("QCOMPM");
                lngTotQPLUSS = rst.getLong("QPLUSS");
                lngTotQPLUSM = rst.getLong("QPLUSM");
                lngTotQTABES = rst.getLong("QTABES");
                lngTotQTABEM = rst.getLong("QTABEM");
                lngTotQLIGEA = rst.getLong("QLIGEA");
                lngTotQLIGEM = rst.getLong("QLIGEM");
                //Void
                lngTotQVSALES = rst.getLong("QVSALES");
                lngTotQVMATCH = rst.getLong("QVMATCH");
                lngTotQVMANUAL = rst.getLong("QVMANUAL");
                lngTotQVPEND = rst.getLong("QVPEND");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A4164Filter();
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
                        beanTkt.strDescCountry = "(Sales without Reconciliation)";
                    } else {
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                        /*if (hmPaises.containsKey(rst.getString("ACOUNTRY").trim().toUpperCase())) {
                         beanTkt.strDescCountry = hmPaises.get(rst.getString("ACOUNTRY").trim()).toString();
                         }*/
                        beanTkt.strDescCountry = rst.getString("NAME").trim();
                    }
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQACCB = rst.getLong("QACCB");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");

                    beanTkt.lngQACEP = rst.getLong("QACEP");
                    beanTkt.lngQRECH = rst.getLong("QRECH");
                    beanTkt.lngQSOSP = rst.getLong("QSOSP");
                    beanTkt.lngQTHTEF = rst.getLong("QTHTEF");
                    //Sin Settlement
                    /*beanTkt.lngQTOTWS = beanTkt.lngQTOTSAL - (rst.getLong("QACEP")
                     + rst.getLong("QRECH") + rst.getLong("QSOSP"));*/
                    beanTkt.lngQTOTWS = rst.getLong("QTOTWS");
                    beanTkt.lngQTOTBK = rst.getLong("QACEP") + rst.getLong("QRECH")
                            + rst.getLong("QSOSP") + rst.getLong("QTOTWS") + rst.getLong("QTHTEF");

                    beanTkt.lngQPAID = rst.getLong("QPAID");
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQACCB = lngTotQACCB;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    
                    //Void
                    beanTkt.lngQVSALES = rst.getLong("QVSALES");
                    beanTkt.lngQVMATCH = rst.getLong("QVMATCH");
                    beanTkt.lngQVMANUAL = rst.getLong("QVMANUAL");
                    beanTkt.lngQVPEND = rst.getLong("QVPEND");
                   
                    beanTkt.lngTotQACEP = lngTotQACEP;
                    beanTkt.lngTotQRECH = lngTotQRECH;
                    beanTkt.lngTotQSOSP = lngTotQSOSP;
                    beanTkt.lngTotQTHTEF = lngTotQTHTEF;
                    //Sin Settlement
                    //beanTkt.lngTotQTOTWS = beanTkt.lngTotQTOTSAL - (lngTotQACEP + lngTotQRECH + lngTotQSOSP);
                    beanTkt.lngTotQTOTWS = lngTotQWSET;
                    beanTkt.lngTotQTOTBK = lngTotQWSET + lngTotQACEP + lngTotQRECH + lngTotQSOSP + lngTotQTHTEF;

                    beanTkt.lngTotQPAID = lngTotQPAID;
                    
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQCOMPS = rst.getLong("QCOMPS");
                    beanTkt.lngQCOMPM = rst.getLong("QCOMPM");
                    beanTkt.lngQCOMPP = beanTkt.lngQCOMPS - beanTkt.lngQCOMPM;
                    beanTkt.lngQPLUSS = rst.getLong("QPLUSS");
                    beanTkt.lngQPLUSM = rst.getLong("QPLUSM");
                    beanTkt.lngQPLUSP = beanTkt.lngQPLUSS - beanTkt.lngQPLUSM;
                    beanTkt.lngQTABES = rst.getLong("QTABES");
                    beanTkt.lngQTABEM = rst.getLong("QTABEM");
                    beanTkt.lngQTABEP = beanTkt.lngQTABES - beanTkt.lngQTABEM;
                    beanTkt.lngQLIGEA = rst.getLong("QLIGEA");
                    beanTkt.lngQLIGEM = rst.getLong("QLIGEM");
                    beanTkt.lngQLIGEP = beanTkt.lngQLIGEA - beanTkt.lngQLIGEM;
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QMANUAL") + rst.getLong("QSALES");
                
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQCOMPS = lngTotQCOMPS;
                    beanTkt.lngTotQCOMPM = lngTotQCOMPM;
                    beanTkt.lngTotQCOMPP = beanTkt.lngTotQCOMPS - beanTkt.lngTotQCOMPM;
                    beanTkt.lngTotQPLUSS = lngTotQPLUSS;
                    beanTkt.lngTotQPLUSM = lngTotQPLUSM;
                    beanTkt.lngTotQPLUSP = beanTkt.lngTotQPLUSS - beanTkt.lngTotQPLUSM;
                    beanTkt.lngTotQTABES = lngTotQTABES;
                    beanTkt.lngTotQTABEM = lngTotQTABEM;
                    beanTkt.lngTotQTABEP = beanTkt.lngTotQTABES - beanTkt.lngTotQTABEM;
                    beanTkt.lngTotQLIGEA = lngTotQLIGEA;
                    beanTkt.lngTotQLIGEM = lngTotQLIGEM;
                    beanTkt.lngTotQLIGEP = beanTkt.lngTotQLIGEA - beanTkt.lngTotQLIGEM;
                    beanTkt.lngTotQTOTSAL = lngTotQMATCH + lngTotQSALES + lngTotQMANUAL;
                    //Void
                    beanTkt.lngTotQVSALES = lngTotQVSALES;
                    beanTkt.lngTotQVMATCH = lngTotQVMATCH;
                    beanTkt.lngTotQVMANUAL = lngTotQVMANUAL;
                    beanTkt.lngTotQVPEND = lngTotQVPEND;
                    
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

    public List<A4164Filter> loadPX584SQP04344(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQSALES = 0, lngTotQACCB = 0, lngTotQDIFF = 0;
        long lngTotQACEP = 0, lngTotQRECH = 0, lngTotQSOSP = 0, lngTotQPAID = 0;
        long lngTotQMANUAL = 0, lngTotQWSET = 0, lngTotQTHTEF = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04344(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(3, filter.IN_SDATE.trim()); //202101
            cstmt.setString(4, filter.IN_TDOC.trim()); //S
            cstmt.setString(5, filter.SCOUNTRY.trim()); //MX
            cstmt.setString(6, filter.IN_PAYMENT.trim()); //CC
            cstmt.setString(7, filter.IN_CARDC.trim()); //
            cstmt.setString(8, filter.IN_TICKET.trim()); //
            cstmt.setString(9, filter.IN_FTE.trim()); //
            cstmt.setString(10, filter.IN_AFTE.trim()); //
            cstmt.setString(11, filter.IN_CARDN.trim()); //
            cstmt.setString(12, filter.IN_STVAL.trim()); //
            cstmt.setString(13, filter.IN_MERCHN.trim()); //
            cstmt.setString(14, filter.IN_AUTHNBR.trim()); //
            cstmt.setString(15, filter.IN_ADYEN.trim()); //
            cstmt.setString(16, filter.IN_FCOMPL.trim()); //
            cstmt.setString(17, filter.IN_CURRENCY.trim()); //

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
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQACCB = rst.getLong("QACCB");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQACEP = rst.getLong("QACEP");
                lngTotQRECH = rst.getLong("QRECH");
                lngTotQSOSP = rst.getLong("QSOSP");
                lngTotQPAID = rst.getLong("QPAID");
                lngTotQWSET = rst.getLong("QWSET");
                lngTotQTHTEF = rst.getLong("QTHTEF");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A4164Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.SCOUNTRY = filter.SCOUNTRY.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();

                    if (rst.getString("SCARCOD").trim().isEmpty()) {
                        //Venta sin ACCB
                        beanTkt.SCARCOD = "**";
                        beanTkt.strDescCard = "(Sales without Reconciliation)";
                    } else {
                        beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                        beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                    }
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQACCB = rst.getLong("QACCB");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QSALES")
                            + rst.getLong("QACCB") + rst.getLong("QDIFF") + rst.getLong("QMANUAL");

                    beanTkt.lngQACEP = rst.getLong("QACEP");
                    beanTkt.lngQRECH = rst.getLong("QRECH");
                    beanTkt.lngQSOSP = rst.getLong("QSOSP");
                    beanTkt.lngQTHTEF = rst.getLong("QTHTEF");
                    beanTkt.lngQTOTWS = rst.getLong("QWSET");
                    beanTkt.lngQTOTBK = rst.getLong("QACEP") + rst.getLong("QRECH")
                            + rst.getLong("QSOSP") + rst.getLong("QWSET") + rst.getLong("QTHTEF");

                    beanTkt.lngQPAID = rst.getLong("QPAID");
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQACCB = lngTotQACCB;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;
                    beanTkt.lngTotQTOTSAL = lngTotQMATCH + lngTotQSALES + lngTotQACCB + lngTotQDIFF + lngTotQMANUAL;
                    beanTkt.lngTotQACEP = lngTotQACEP;
                    beanTkt.lngTotQRECH = lngTotQRECH;
                    beanTkt.lngTotQSOSP = lngTotQSOSP;
                    beanTkt.lngTotQTHTEF = lngTotQTHTEF;
                    beanTkt.lngTotQTOTWS = lngTotQWSET;
                    beanTkt.lngTotQTOTBK = lngTotQWSET + lngTotQACEP + lngTotQRECH + lngTotQSOSP + lngTotQTHTEF;
                    beanTkt.lngTotQPAID = lngTotQPAID;

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
    
    public List<A4164Filter> loadPX584SQP04732(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQSALES = 0, lngTotQACCB = 0, lngTotQDIFF = 0;
        long lngTotQVSALES = 0, lngTotQVMATCH = 0, lngTotQVMANUAL = 0, lngTotQVPEND = 0;
        long lngTotQACEP = 0, lngTotQRECH = 0, lngTotQSOSP = 0, lngTotQPAID = 0;
        long lngTotQMANUAL = 0, lngTotQWSET = 0, lngTotQTHTEF = 0, lngTotQPEND = 0;
        long lngTotQCOMPS = 0, lngTotQCOMPM = 0, lngTotQPLUSS = 0, lngTotQPLUSM = 0;
        long lngTotQTABES = 0, lngTotQTABEM = 0, lngTotQLIGEA = 0, lngTotQLIGEM = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04732(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(3, filter.IN_SDATE.trim()); //202101
            cstmt.setString(4, filter.IN_TDOC.trim()); //S
            cstmt.setString(5, filter.SCOUNTRY.trim()); //MX
            cstmt.setString(6, filter.IN_PAYMENT.trim()); //CC
            cstmt.setString(7, filter.IN_CARDC.trim()); //
            cstmt.setString(8, filter.IN_TICKET.trim()); //
            cstmt.setString(9, filter.IN_FTE.trim()); //
            cstmt.setString(10, filter.IN_AFTE.trim()); //
            cstmt.setString(11, filter.IN_CARDN.trim()); //
            cstmt.setString(12, filter.IN_STVAL.trim()); //
            cstmt.setString(13, filter.IN_MERCHN.trim()); //
            cstmt.setString(14, filter.IN_AUTHNBR.trim()); //
            cstmt.setString(15, filter.IN_ADYEN.trim()); //
            cstmt.setString(16, filter.IN_FCOMPL.trim()); //
            cstmt.setString(17, filter.IN_CURRENCY.trim()); //

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
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQACCB = rst.getLong("QACCB");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQMANUAL = rst.getLong("QMANUAL");
                lngTotQACEP = rst.getLong("QACEP");
                lngTotQRECH = rst.getLong("QRECH");
                lngTotQSOSP = rst.getLong("QSOSP");
                lngTotQPAID = rst.getLong("QPAID");
                lngTotQWSET = rst.getLong("QTOTWS");
                lngTotQTHTEF = rst.getLong("QTHTEF");
                lngTotQPEND = rst.getLong("QPEND");
                lngTotQCOMPS = rst.getLong("QCOMPS");
                lngTotQCOMPM = rst.getLong("QCOMPM");
                lngTotQPLUSS = rst.getLong("QPLUSS");
                lngTotQPLUSM = rst.getLong("QPLUSM");
                lngTotQTABES = rst.getLong("QTABES");
                lngTotQTABEM = rst.getLong("QTABEM");
                lngTotQLIGEA = rst.getLong("QLIGEA");
                lngTotQLIGEM = rst.getLong("QLIGEM");
                //Void
                lngTotQVSALES = rst.getLong("QVSALES");
                lngTotQVMATCH = rst.getLong("QVMATCH");
                lngTotQVMANUAL = rst.getLong("QVMANUAL");
                lngTotQVPEND = rst.getLong("QVPEND");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A4164Filter();
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
                    
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQACCB = rst.getLong("QACCB");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");
                    
                    //Void
                    beanTkt.lngQVSALES = rst.getLong("QVSALES");
                    beanTkt.lngQVMATCH = rst.getLong("QVMATCH");
                    beanTkt.lngQVMANUAL = rst.getLong("QVMANUAL");
                    beanTkt.lngQVPEND = rst.getLong("QVPEND");

                    beanTkt.lngQACEP = rst.getLong("QACEP");
                    beanTkt.lngQRECH = rst.getLong("QRECH");
                    beanTkt.lngQSOSP = rst.getLong("QSOSP");
                    beanTkt.lngQTHTEF = rst.getLong("QTHTEF");
                    //Sin Settlement
                    /*beanTkt.lngQTOTWS = beanTkt.lngQTOTSAL - (rst.getLong("QACEP")
                     + rst.getLong("QRECH") + rst.getLong("QSOSP"));*/
                    beanTkt.lngQTOTWS = rst.getLong("QTOTWS");
                    beanTkt.lngQTOTBK = rst.getLong("QACEP") + rst.getLong("QRECH")
                            + rst.getLong("QSOSP") + rst.getLong("QTOTWS") + rst.getLong("QTHTEF");

                    beanTkt.lngQPAID = rst.getLong("QPAID");
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQACCB = lngTotQACCB;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;

                    beanTkt.lngTotQACEP = lngTotQACEP;
                    beanTkt.lngTotQRECH = lngTotQRECH;
                    beanTkt.lngTotQSOSP = lngTotQSOSP;
                    beanTkt.lngTotQTHTEF = lngTotQTHTEF;
                    //Sin Settlement
                    //beanTkt.lngTotQTOTWS = beanTkt.lngTotQTOTSAL - (lngTotQACEP + lngTotQRECH + lngTotQSOSP);
                    beanTkt.lngTotQTOTWS = lngTotQWSET;
                    beanTkt.lngTotQTOTBK = lngTotQWSET + lngTotQACEP + lngTotQRECH + lngTotQSOSP + lngTotQTHTEF;

                    beanTkt.lngTotQPAID = lngTotQPAID;
                    
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.lngQCOMPS = rst.getLong("QCOMPS");
                    beanTkt.lngQCOMPM = rst.getLong("QCOMPM");
                    beanTkt.lngQCOMPP = beanTkt.lngQCOMPS - beanTkt.lngQCOMPM;
                    beanTkt.lngQPLUSS = rst.getLong("QPLUSS");
                    beanTkt.lngQPLUSM = rst.getLong("QPLUSM");
                    beanTkt.lngQPLUSP = beanTkt.lngQPLUSS - beanTkt.lngQPLUSM;
                    beanTkt.lngQTABES = rst.getLong("QTABES");
                    beanTkt.lngQTABEM = rst.getLong("QTABEM");
                    beanTkt.lngQTABEP = beanTkt.lngQTABES - beanTkt.lngQTABEM;
                    beanTkt.lngQLIGEA = rst.getLong("QLIGEA");
                    beanTkt.lngQLIGEM = rst.getLong("QLIGEM");
                    beanTkt.lngQLIGEP = beanTkt.lngQLIGEA - beanTkt.lngQLIGEM;
                    
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QMANUAL") + rst.getLong("QSALES");
                
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQCOMPS = lngTotQCOMPS;
                    beanTkt.lngTotQCOMPM = lngTotQCOMPM;
                    beanTkt.lngTotQCOMPP = beanTkt.lngTotQCOMPS - beanTkt.lngTotQCOMPM;
                    beanTkt.lngTotQPLUSS = lngTotQPLUSS;
                    beanTkt.lngTotQPLUSM = lngTotQPLUSM;
                    beanTkt.lngTotQPLUSP = beanTkt.lngTotQPLUSS - beanTkt.lngTotQPLUSM;
                    beanTkt.lngTotQTABES = lngTotQTABES;
                    beanTkt.lngTotQTABEM = lngTotQTABEM;
                    beanTkt.lngTotQTABEP = beanTkt.lngTotQTABES - beanTkt.lngTotQTABEM;
                    beanTkt.lngTotQLIGEA = lngTotQLIGEA;
                    beanTkt.lngTotQLIGEM = lngTotQLIGEM;
                    beanTkt.lngTotQLIGEP = beanTkt.lngTotQLIGEA - beanTkt.lngTotQLIGEM;
                    beanTkt.lngTotQTOTSAL = lngTotQMATCH + lngTotQSALES + lngTotQMANUAL;
                    //Void
                    beanTkt.lngTotQVSALES = lngTotQVSALES;
                    beanTkt.lngTotQVMATCH = lngTotQVMATCH;
                    beanTkt.lngTotQVMANUAL = lngTotQVMANUAL;
                    beanTkt.lngTotQVPEND = lngTotQVPEND;                    
                    
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

    public List<A4164Filter> loadPX584SQP04345(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        //String strSCARF = "";
        long lngTotQMATCH = 0, lngTotQSALES = 0, lngTotQACCB = 0, lngTotQDIFF = 0;
        long lngTotQACEP = 0, lngTotQRECH = 0, lngTotQSOSP = 0, lngTotQPAID = 0;
        long lngTotQMANUAL = 0, lngTotQWSET = 0, lngTotQTHTEF = 0, lngTotQVOID = 0;
        long lngTotQVOIDMATCH = 0, lngTotQVOIDMANUAL = 0, lngTotQVOIDSALES = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04345(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_TICKET.trim());
            cstmt.setString(9, filter.IN_FTE.trim());
            cstmt.setString(10, filter.IN_AFTE.trim());
            cstmt.setString(11, filter.IN_CARDN.trim());
            cstmt.setString(12, filter.IN_STVAL.trim());
            cstmt.setString(13, filter.IN_MERCHN.trim());
            cstmt.setString(14, filter.IN_AUTHNBR.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());
            cstmt.setString(16, filter.IN_FCOMPL.trim());
            cstmt.setString(17, filter.IN_CURRENCY.trim());

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
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQSALES = rst.getLong("QSALES");
                lngTotQACCB = rst.getLong("QACCB");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQMANUAL = rst.getLong("QMANUAL");                
                lngTotQACEP = rst.getLong("QACEP");
                lngTotQRECH = rst.getLong("QRECH");
                lngTotQSOSP = rst.getLong("QSOSP");
                lngTotQPAID = rst.getLong("QPAID");
                lngTotQWSET = rst.getLong("QWSET");
                lngTotQTHTEF = rst.getLong("QTHTEF");
                //VOID
                lngTotQVOID = rst.getLong("QVOID");
                lngTotQVOIDMATCH = rst.getLong("QVOIDMATCH");
                lngTotQVOIDMANUAL = rst.getLong("QVOIDMANUAL"); 
                lngTotQVOIDSALES = rst.getLong("QVOIDSALES");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A4164Filter();
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
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQSALES = rst.getLong("QSALES");
                    beanTkt.lngQACCB = rst.getLong("QACCB");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQMANUAL = rst.getLong("QMANUAL");                    
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QSALES")
                            + rst.getLong("QACCB") + rst.getLong("QDIFF") + rst.getLong("QMANUAL");

                    beanTkt.lngQACEP = rst.getLong("QACEP");
                    beanTkt.lngQRECH = rst.getLong("QRECH");
                    beanTkt.lngQSOSP = rst.getLong("QSOSP");
                    beanTkt.lngQTHTEF = rst.getLong("QTHTEF");
                    
                    //VOID
                    beanTkt.lngQVOID = rst.getLong("QVOID");
                    beanTkt.lngQVOIDMATCH = rst.getLong("QVOIDMATCH");
                    beanTkt.lngQVOIDMANUAL = rst.getLong("QVOIDMANUAL");
                    beanTkt.lngQVOIDSALES = rst.getLong("QVOIDSALES");                                        
                    //Sin Settlement
                    /*beanTkt.lngQTOTWS = beanTkt.lngQTOTSAL - (rst.getLong("QACEP")
                     + rst.getLong("QRECH") + rst.getLong("QSOSP"));*/
                    beanTkt.lngQTOTWS = rst.getLong("QWSET");
                    beanTkt.lngQTOTBK = rst.getLong("QACEP") + rst.getLong("QRECH")
                            + rst.getLong("QSOSP") + rst.getLong("QWSET") + rst.getLong("QTHTEF");

                    beanTkt.lngQPAID = rst.getLong("QPAID");
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQSALES = lngTotQSALES;
                    beanTkt.lngTotQACCB = lngTotQACCB;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQMANUAL = lngTotQMANUAL;                    
                    beanTkt.lngTotQTOTSAL = lngTotQMATCH + lngTotQSALES + lngTotQACCB + lngTotQDIFF + lngTotQMANUAL;
                    beanTkt.lngTotQACEP = lngTotQACEP;
                    beanTkt.lngTotQRECH = lngTotQRECH;
                    beanTkt.lngTotQSOSP = lngTotQSOSP;
                    beanTkt.lngTotQTHTEF = lngTotQTHTEF;
                    //VOID
                    beanTkt.lngTotQVOID = lngTotQVOID;
                    beanTkt.lngTotQVOIDMATCH = lngTotQVOIDMATCH;
                    beanTkt.lngTotQVOIDMANUAL = lngTotQVOIDMANUAL;
                    beanTkt.lngTotQVOIDSALES = lngTotQVOIDSALES;
                    //Sin Settlement
                    //beanTkt.lngTotQTOTWS = beanTkt.lngTotQTOTSAL - (lngTotQACEP + lngTotQRECH + lngTotQSOSP);
                    beanTkt.lngTotQTOTWS = lngTotQWSET;
                    beanTkt.lngTotQTOTBK = beanTkt.lngTotQTOTWS + lngTotQACEP + lngTotQRECH + lngTotQSOSP + lngTotQTHTEF;
                    beanTkt.lngTotQPAID = lngTotQPAID;

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

    public List<A4164Filter> loadPX584SQP04346(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        //String strSCARF = "";
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        String tipFecha = "Sales";
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconciliation");
        hmDescEstados.put("3", "Reconciliation without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Stand By");

        HashMap<String, String> hmDescCompl = new HashMap<String, String>();
        hmDescCompl.put("", "");
        hmDescCompl.put("1", "PLUSGRADE");
        hmDescCompl.put("2", "LIGAS");
        hmDescCompl.put("3", "TABLET");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04346(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);

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
            cstmt.setString(16, filter.IN_FCOMPL.trim());
            cstmt.setString(17, filter.IN_CURRENCY.trim());
            cstmt.setString(18, filter.IN_FVOID.trim());

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
                dblTotSVFOP = rst.getDouble("SVFOP");
                dblTotAVFOP = rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    //PRESENTACION SEGUN ESTADO
                    if (!rst.getString("STVAL").trim().equals("4") || !rst.getString("STVAL").trim().equals("5")) {
                        beanTkt = new A4164Filter();
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
                        if (rst.getString("TDOC").trim().equals("R")) {
                            beanTkt.strPEM = "REFUND";
                        } else {
                            beanTkt.strPEM = "SALES";
                        }
                        beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                        beanTkt.CCIA = rst.getString("CCIA").trim();
                        beanTkt.RFIC = rst.getString("RFIC").trim();
                        beanTkt.FORMA = rst.getString("FORMA").trim();
                        beanTkt.SERIE = rst.getString("SERIE").trim();
                        beanTkt.TDOC = rst.getString("TDOC").trim();
                        beanTkt.SEQ = rst.getString("SEQ").trim();
                        beanTkt.RFIS1 = rst.getString("RFIS1").trim();
                        if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                            beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                        } else {
                            beanTkt.STVAL = rst.getString("STVAL").trim();
                        }
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
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
                        if (rst.getString("STVAL").trim().equals("2") || rst.getString("STVAL").trim().equals("6")) {
                            //SALES
                            //COMENTADO A PEDIDO DE ENS 20160119
                            /*beanTkt.FTE = rst.getString("FTE").trim();
                             if (rst.getString("FTE").trim().equals("A")) {
                             beanTkt.strSORIG = "ARC";
                             } else if (rst.getString("FTE").trim().equals("B")) {
                             beanTkt.strSORIG = "BSP";
                             } else if (rst.getString("FTE").trim().equals("S")) {
                             beanTkt.strSORIG = "ASR";
                             }*/
                            beanTkt.SDATEL = rst.getString("SDATEL").trim();
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
                            beanTkt.AVFOP = rst.getDouble("AVFOP");
                            beanTkt.SCARDN = rst.getString("SCARDN").trim();
                            //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                            beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                            //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                            beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                            beanTkt.SINVN = rst.getString("SINVN").trim();
                            beanTkt.SIDATE = rst.getString("SIDATE").trim();
                            beanTkt.SPNR = rst.getString("SPNR").trim();
                            beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                        } else {
                            /*beanTkt.FTE = rst.getString("AFTE").trim();
                             if (rst.getString("AFTE").trim().equals("B")) {
                             beanTkt.strSORIG = "Billed";
                             } else if (rst.getString("AFTE").trim().equals("N")) {
                             beanTkt.strSORIG = "Not Billed";
                             } else if (rst.getString("AFTE").trim().equals("L")) {
                             beanTkt.strSORIG = "Local";
                             }*/
                            beanTkt.SDATEL = rst.getString("ADATEL").trim();
                            beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                            beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                            beanTkt.SAGENT = rst.getString("SAGENT").trim();
                            beanTkt.SDATE = rst.getString("ADATE").trim();
                            beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                            beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                            beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                            beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                            if (rst.getString("MONEDAA").trim().length() > 3) {
                                beanTkt.strMoneda = rst.getString("MONEDAA").trim().substring(3);
                            } else {
                                beanTkt.strMoneda = rst.getString("MONEDAA").trim();
                            }
                            beanTkt.SVFOP = rst.getDouble("SVFOP");
                            beanTkt.AVFOP = rst.getDouble("AVFOP");
                            beanTkt.SCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                            //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                            beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                            beanTkt.SINVN = rst.getString("AINVN").trim();
                            beanTkt.SIDATE = rst.getString("AIDATE").trim();
                            beanTkt.SPNR = rst.getString("APNR").trim();
                            beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                        }
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();
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

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        beanTkt.page.PAGNUM = filter.page.PAGNUM;
                        beanTkt.page.PAGROW = filter.page.PAGROW;
                        beanTkt.page.TOTPAG = filter.page.TOTPAG;
                        beanTkt.page.TOTROW = filter.page.TOTROW;
                        lstTkts.add(beanTkt);

                    } else {
                        //MATCH CON DIFERENCIAS
                        //REGISTRO CON DATOS DE LA VENTA =======================
                        beanTkt = new A4164Filter();
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
                        beanTkt.SEQ = rst.getString("SEQ").trim();
                        if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                            beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                        } else {
                            beanTkt.STVAL = rst.getString("STVAL").trim();
                        }
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
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
                        /*beanTkt.FTE = rst.getString("FTE").trim();
                         if (rst.getString("FTE").trim().equals("A")) {
                         beanTkt.strSORIG = "ARC";
                         } else if (rst.getString("FTE").trim().equals("B")) {
                         beanTkt.strSORIG = "BSP";
                         } else if (rst.getString("FTE").trim().equals("S")) {
                         beanTkt.strSORIG = "ASR";
                         }*/
                        beanTkt.SDATEL = rst.getString("SDATEL").trim();
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
                        beanTkt.AVFOP = rst.getDouble("AVFOP");
                        beanTkt.SCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("ACARDN").trim());
                        beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                        beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("SINVN").trim();
                        beanTkt.SIDATE = rst.getString("SIDATE").trim();
                        beanTkt.SPNR = rst.getString("SPNR").trim();
                        beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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

                        if (beanTkt.strFecFiltro.equals("DATEC")) {
                            beanTkt.strTitulo = "Conciliation Date : ";
                        } else if (beanTkt.IN_TDOC.equals("R")) {
                            beanTkt.strTitulo = "Refund Date : ";
                        } else {
                            beanTkt.strTitulo = "Sales Date : ";
                        }
                        beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + beanTkt.strDescCountry + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard;

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        beanTkt.page.PAGNUM = filter.page.PAGNUM;
                        beanTkt.page.PAGROW = filter.page.PAGROW;
                        beanTkt.page.TOTPAG = filter.page.TOTPAG;
                        beanTkt.page.TOTROW = filter.page.TOTROW;
                        lstTkts.add(beanTkt);
                        //REGISTRO CON DATOS DEL ACCB ==============================
                        beanTkt = new A4164Filter();
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
                        if (rst.getString("AFTE").trim().equals("X")) {
                            beanTkt.strPEM = "Settlement BSP";
                        } else if (rst.getString("AFTE").trim().equals("A")) {
                            beanTkt.strPEM = "Settlement ARC";
                        } else {
                            beanTkt.strPEM = "Settlement ASR";
                        }
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
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
                        }
                        if (!rst.getString("ERROR").trim().isEmpty()) {
                            beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                        } else {
                            beanTkt.CERROR = rst.getString("CERROR").trim();
                        }
                        //PARA AQUELLOS QUE SEAN ACCB SIN VENTA
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
                        /*beanTkt.FTE = rst.getString("AFTE").trim();
                         if (rst.getString("AFTE").trim().equals("B")) {
                         beanTkt.strSORIG = "Billed";
                         } else if (rst.getString("AFTE").trim().equals("N")) {
                         beanTkt.strSORIG = "Not Billed";
                         } else if (rst.getString("AFTE").trim().equals("L")) {
                         beanTkt.strSORIG = "Local";
                         }*/
                        beanTkt.SDATEL = rst.getString("ADATEL").trim();
                        beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                        beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                        beanTkt.SAGENT = rst.getString("AAGENT").trim();
                        beanTkt.SDATE = rst.getString("ADATE").trim();
                        beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                        beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                        beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                        beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                        if (rst.getString("MONEDAA").trim().length() > 3) {
                            beanTkt.strMoneda = rst.getString("MONEDAA").trim().substring(3);
                        } else {
                            beanTkt.strMoneda = rst.getString("MONEDAA").trim();
                        }
                        beanTkt.SVFOP = rst.getDouble("SVFOP");
                        beanTkt.AVFOP = rst.getDouble("AVFOP");
                        beanTkt.SCARDN = rst.getString("SCARDN").trim();
                        beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                        beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("AINVN").trim();
                        beanTkt.SIDATE = rst.getString("AIDATE").trim();
                        beanTkt.SPNR = rst.getString("APNR").trim();
                        beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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
                        //TEF
                        beanTkt.TDATE = rst.getString("TDATE").trim();
                        
                        beanTkt.RFIS1 = rst.getString("RFIS1").trim();

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

                        if (rst.getString("FVOID").trim().equals("V")) {
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

    public List<A4164Filter> loadPX584SQP00900(A2370Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        double SVFOP = 0, SVFOPUSD = 0, SVFOPRF = 0, SVFOPUSDRF = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP00900(?,?,?,?,?,?,?,?,?)}";

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

                    beanTkt = new A4164Filter();
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

    public List<A4164Filter> loadPX584SQP00901(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        double SVFOPUSDRF = 0, SVFOPUSD = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP00901(?,?,?,?,?,?,?,?,?,?)}";

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

                    beanTkt = new A4164Filter();
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

    public A4164Filter loadPX584SQP04348(A4164Filter filter) throws SQLException, Exception {

        A4164Filter beanTkt = new A4164Filter();
        String strSCARF = "";

        if (filter.STVAL.trim().length() > 1) {
            if (filter.STVAL.trim().equals("Match")) {
                filter.STVAL = "1";
            } else if (filter.STVAL.trim().equals("Sales without Reconciliation") || filter.STVAL.trim().equals("Refund without Reconciliation")) {
                filter.STVAL = "2";
            } else if (filter.STVAL.trim().equals("Reconciliation without Sales") || filter.STVAL.trim().equals("Reconciliation without Refund")) {
                filter.STVAL = "3";
            } else if (filter.STVAL.trim().equals("Match with Differences")) {
                filter.STVAL = "4";
            } else if (filter.STVAL.trim().equals("Match Manual")) {
                filter.STVAL = "5";
            } else if (filter.STVAL.trim().equals("Stand By")) {
                filter.STVAL = "6";
            }
        }

        /*if (!filter.STVAL.equals("2")) {
         filter.APAYMENT = filter.SPAYMENT;
         filter.SPAYMENT = "";
         }*/
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04348(?,?,?,?,?,?,?,?,?,?)}";

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
                beanTkt.OBSERV_BPO = rst.getString("OBSERV_BPO").trim();

                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                
                beanTkt.OBSERV = rst.getString("OBSERV").trim();
                beanTkt.SVFOP_ADJ = rst.getDouble("SVFOP_ADJ");

                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.FTE = rst.getString("FTE").trim();
                beanTkt.DATEC = rst.getString("DATEC").trim();
                beanTkt.FADYEN = rst.getString("FADYEN").trim();

                //SALES
                beanTkt.SDATEL = rst.getString("SDATEL").trim();
                beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.SAGNAME = rst.getString("SAGNAME").trim();
                beanTkt.AAGNAME = rst.getString("AAGNAME").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();

                beanTkt.strSDescCard = rst.getString("SNAMECAR").trim();

                beanTkt.STCNTR = rst.getString("STCNTR").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("ACARDN").trim());
                beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                beanTkt.ACARDN = rst.getString("ACARDN").trim();                
                beanTkt.strACARDN = rst.getString("ACARDN").trim();
                beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SINVN = rst.getString("SINVN").trim();
                beanTkt.SIDATE = rst.getString("SIDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                //ACCB
                beanTkt.AFTE = rst.getString("AFTE").trim();
                if (rst.getString("AFTE").trim().equals("B")) {
                    beanTkt.strDescAFTE = "Settlement Billed";
                } else if (rst.getString("AFTE").trim().equals("N")) {
                    beanTkt.strDescAFTE = "Settlement Not Billed";
                } else if (rst.getString("AFTE").trim().equals("L")) {
                    beanTkt.strDescAFTE = "Settlement Local";
                } else if (rst.getString("AFTE").trim().equals("X")) {
                    beanTkt.strDescAFTE = "Settlement BSP";
                } else if (rst.getString("AFTE").trim().equals("A")) {
                    beanTkt.strDescAFTE = "Settlement ARC";
                } else if (rst.getString("AFTE").trim().equals("")) {
                    beanTkt.strDescAFTE = "(Empty)";
                }
                beanTkt.ADATEL = rst.getString("ADATEL").trim();
                beanTkt.AFLOAD = rst.getString("AFLOAD").trim();
                beanTkt.ACOUNTRY = rst.getString("ACOUNTRY").trim();
                beanTkt.AAGENT = rst.getString("AAGENT").trim();
                beanTkt.ADATE = rst.getString("ADATE").trim();
                beanTkt.APAYMENT = rst.getString("APAYMENT").trim();
                beanTkt.ACARCOD = rst.getString("ACARCOD").trim();
                beanTkt.CERROR = rst.getString("CERROR").trim();
                beanTkt.strDescripcion = rst.getString("ERROR").trim();
                beanTkt.strADescCard = rst.getString("ANAMECAR").trim();

                beanTkt.ATCNTR = rst.getString("ATCNTR").trim();
                beanTkt.AVFOP = rst.getDouble("AVFOP");
                beanTkt.ACURRENCY = rst.getString("ACURRENCY").trim();
                beanTkt.ACARDN = rst.getString("ACARDN").trim();
                if (!rst.getString("ADATEXP").trim().isEmpty() && !rst.getString("ADATEXP").trim().contains("*")) {
                    beanTkt.ADATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                }
                beanTkt.AAUTHOC = rst.getString("AAUTHOC").trim();
                beanTkt.AINVN = rst.getString("AINVN").trim();
                beanTkt.AIDATE = rst.getString("AIDATE").trim();
                beanTkt.APNR = rst.getString("APNR").trim();
                beanTkt.APNRSP = rst.getString("APNRSP").trim();
                beanTkt.MERCHN = rst.getString("MERCHNC").trim(); //MERCHN
                if (rst.getString("NMERCHANT") != null && !rst.getString("NMERCHANT").trim().equals("-")) {
                    beanTkt.strDescMerchn = rst.getString("NMERCHANT").trim();
                }
                beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
                //TEF
                beanTkt.TDATE = rst.getString("TDATE").trim();
                beanTkt.DATEF = rst.getString("DATEF").trim();
                //Banks
                beanTkt.BDATEL = rst.getString("BDATEL").trim();
                beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                beanTkt.BDATEP = rst.getString("BDATEP").trim();
                beanTkt.BSTVALP = rst.getString("BSTVALP").trim();
                beanTkt.GRUPO = rst.getString("GRUPO").trim();
                beanTkt.IDFIL = rst.getString("IDFIL").trim();
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
                
                if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }
                
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

    public List<A4164Filter> loadPX584SQP04351(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconciliation");
        hmDescEstados.put("3", "Reconciliation without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Stand By");

        if (!filter.IN_STVAL.equals("2")) {
            filter.APAYMENT = filter.SPAYMENT;
            filter.SPAYMENT = "";
        }

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04351(?,?,?,?,?,?,?)}";

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
                beanTkt = new A4164Filter();
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
                beanTkt.SDATEL = rst.getString("SDATEL").trim();
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
                //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("ACARDN").trim());
                beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SINVN = rst.getString("SINVN").trim();
                beanTkt.SIDATE = rst.getString("SIDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                if (beanTkt.SFLOAD.trim().equals("M")) {
                    beanTkt.SFLOAD = "Manual";
                }
                beanTkt.MERCHN = rst.getString("MERCHN").trim();
                beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                beanTkt.GRUPO = rst.getString("GRUPO").trim();
                beanTkt.IDFIL = rst.getString("IDFIL").trim();
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

                // DATOS DEL ACCB ==============================================
                beanTkt.AFTE = rst.getString("AFTE").trim();
                if (rst.getString("AFTE").trim().equals("B")) {
                    beanTkt.strDescAFTE = "Settlement Billed";
                } else if (rst.getString("AFTE").trim().equals("N")) {
                    beanTkt.strDescAFTE = "Settlement Not Billed";
                } else if (rst.getString("AFTE").trim().equals("L")) {
                    beanTkt.strDescAFTE = "Settlement Local";
                } else if (rst.getString("AFTE").trim().equals("X")) {
                    beanTkt.strDescAFTE = "Settlement BSP";
                } else if (rst.getString("AFTE").trim().equals("A")) {
                    beanTkt.strDescAFTE = "Settlement ARC";
                }
                beanTkt.ADATEL = rst.getString("ADATEL").trim();
                beanTkt.AFLOAD = rst.getString("AFLOAD").trim();
                if (beanTkt.AFLOAD.trim().equals("M")) {
                    beanTkt.AFLOAD = "Manual";
                }
                beanTkt.ACOUNTRY = rst.getString("ACOUNTRY").trim();
                beanTkt.strDescripcion = rst.getString("COUNTRYA").trim();
                beanTkt.AAGENT = rst.getString("AAGENT").trim();
                beanTkt.ADATE = rst.getString("ADATE").trim();
                beanTkt.APAYMENT = rst.getString("APAYMENT").trim();
                beanTkt.ACARCOD = rst.getString("ACARCOD").trim();
                beanTkt.strADescCard = rst.getString("NAMECARA").trim();
                beanTkt.ATCNTR = rst.getString("ATCNTR").trim();
                beanTkt.ACURRENCY = rst.getString("ACURRENCY").trim();
                beanTkt.AVFOP = rst.getDouble("AVFOP");
                beanTkt.ACARDN = rst.getString("ACARDN").trim();
                beanTkt.AAUTHOC = rst.getString("AAUTHOC").trim();
                beanTkt.AINVN = rst.getString("AINVN").trim();
                beanTkt.AIDATE = rst.getString("AIDATE").trim();
                beanTkt.APNR = rst.getString("APNR").trim();
                beanTkt.APNRSP = rst.getString("APNRSP").trim();

                lstTkts.add(beanTkt);
                //REGISTRO CON DATOS DEL ACCB ==============================
                /*beanTkt = new A4164Filter();
                 if (rst.getString("AFTE").trim().equals("X")) {
                 beanTkt.strPEM = "ACCB BSP";
                 } else if (rst.getString("AFTE").trim().equals("A")) {
                 beanTkt.strPEM = "ACCB ARC";
                 } else if (rst.getString("AFTE").trim().equals("B")) {
                 beanTkt.strPEM = "ACCB ASR";
                 } else if (rst.getString("AFTE").trim().equals("N")) {
                 beanTkt.strPEM = "ACCB ASR";
                 } else if (rst.getString("AFTE").trim().equals("L")) {
                 beanTkt.strPEM = "ACCB ASR";
                 } else {
                 beanTkt.strPEM = "ACCB";
                 }
                 beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
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
                 beanTkt.FTE = rst.getString("AFTE").trim();
                 if (rst.getString("AFTE").trim().equals("B")) {
                 beanTkt.strDescFTE = "ACCB Billed";
                 } else if (rst.getString("AFTE").trim().equals("N")) {
                 beanTkt.strDescFTE = "ACCB Not Billed";
                 } else if (rst.getString("AFTE").trim().equals("L")) {
                 beanTkt.strDescFTE = "ACCB Local";
                 } else if (rst.getString("AFTE").trim().equals("X")) {
                 beanTkt.strDescFTE = "ACCB BSP";
                 } else if (rst.getString("AFTE").trim().equals("A")) {
                 beanTkt.strDescFTE = "ACCB ARC";
                 }
                 beanTkt.SDATEL = rst.getString("ADATEL").trim();
                 beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                 beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                 beanTkt.strDescCountry = rst.getString("COUNTRYA").trim();
                 beanTkt.SAGENT = rst.getString("AAGENT").trim();
                 beanTkt.SDATE = rst.getString("ADATE").trim();
                 beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                 beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                 beanTkt.strDescCard = rst.getString("NAMECARA").trim();
                 beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                 beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                 beanTkt.SVFOP = rst.getDouble("AVFOP");
                 beanTkt.SCARDN = rst.getString("ACARDN").trim();
                 beanTkt.strSCARDN = rst.getString("ACARDN").trim();
                 //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                 beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                 beanTkt.SINVN = rst.getString("AINVN").trim();
                 beanTkt.SIDATE = rst.getString("AIDATE").trim();
                 beanTkt.SPNR = rst.getString("APNR").trim();
                 beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                 if (beanTkt.SFLOAD.trim().equals("M")) {
                 beanTkt.SFLOAD = "Manual";
                 }
                 beanTkt.MERCHN = rst.getString("MERCHN").trim();
                 beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                 beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                 beanTkt.GRUPO = rst.getString("GRUPO").trim();
                 beanTkt.IDFIL = rst.getString("IDFIL").trim();
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
                 lstTkts.add(beanTkt);*/

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

    public List<A4164Filter> loadPX584SQP04339(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        long lngTotCant = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        String tipFecha = "Sales";
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconciliation");
        hmDescEstados.put("3", "Reconciliation without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Stand By");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04339(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);

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
            cstmt.setString(17, filter.IN_FCOMPL.trim());
            cstmt.setString(18, filter.IN_CURRENCY.trim());

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
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A4164Filter();
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
                        beanTkt.strDescCountry = "(Sales without Reconciliation)";
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
    
    public List<A4164Filter> loadPX584SQP04349(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04349(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(17, filter.IN_CURRENCY.trim());//VACIO

            cstmt.execute();
            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4164Filter();
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
   
    public List<A4164Filter> loadPX584SQP04341(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0, dblAVFOP = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        String tipFecha = "Sales";
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconciliation");
        hmDescEstados.put("3", "Reconciliation without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Stand By");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04341(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);

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
            cstmt.setString(18, filter.IN_FCOMPL.trim());
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
                dblAVFOP += rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A4164Filter();
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
                        beanTkt.strDescCard = "(Sales without Reconciliation)";
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
                    if (beanTkt.SVFOP == beanTkt.AVFOP) {
                        beanTkt.valVFOP = 1;
                    } else {
                        beanTkt.valVFOP = 2;
                    }
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

    public List<A4164Filter> loadPX584SQP04342(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        long lngTotCant = 0;
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        String tipFecha = "Sales";
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconciliation");
        hmDescEstados.put("3", "Reconciliation without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Stand By");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04342(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);

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
            cstmt.setString(18, filter.IN_FCOMPL.trim());
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

            if (rst.next()) {
                lngTotCant = rst.getLong("CANT");
                dblTotSVFOP = rst.getDouble("SVFOP");
                dblTotAVFOP = rst.getDouble("AVFOP");
            }

            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A4164Filter();
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
                    if (beanTkt.SVFOP == beanTkt.AVFOP) {
                        beanTkt.valVFOP = 1;
                    } else {
                        beanTkt.valVFOP = 2;
                    }
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

    public List<A4164Filter> loadPX584SQP04350(A4164Filter filter) throws SQLException, Exception {
        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        String tipFecha = "Sales";
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconciliation");
        hmDescEstados.put("3", "Reconciliation without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Stand By");

        HashMap<String, String> hmDescCompl = new HashMap<String, String>();
        hmDescCompl.put("", "");
        hmDescCompl.put("1", "PLUSGRADE");
        hmDescCompl.put("2", "LIGAS");
        hmDescCompl.put("3", "TABLET");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04350(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PNR.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4164Filter();

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
                if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                    beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                } else {
                    beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
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
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

    public HashMap<String, List<A4164Filter>> loadPX584SQP04343(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        List<A4164Filter> lstError = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;
        String tipFecha = "Sales";
        long lngTotCant = 0;
        double dblTotSVFOP = 0, dblTotAVFOP = 0;
        if (filter.IN_TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without Reconciliation");
        hmDescEstados.put("3", "Reconciliation without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Stand By");

        HashMap<String, String> hmDescCompl = new HashMap<String, String>();
        hmDescCompl.put("", "");
        hmDescCompl.put("1", "PLUSGRADE");
        hmDescCompl.put("2", "LIGAS");
        hmDescCompl.put("3", "TABLET");

        HashMap<String, List<A4164Filter>> hmResultado = new HashMap<String, List<A4164Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04343(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);

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
            cstmt.setString(17, filter.IN_DIFF.trim());
            cstmt.setString(18, filter.IN_FCOMPL.trim());

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
                dblTotSVFOP += rst.getDouble("SVFOP");
                dblTotAVFOP += rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    //PRESENTACION SEGUN ESTADO
                    if (!rst.getString("STVAL").trim().equals("4") && !rst.getString("STVAL").trim().equals("5")) {
                        beanTkt = new A4164Filter();
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
                        beanTkt.RFIS1 = rst.getString("RFIS1").trim();
                        if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                            beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                        } else {
                            beanTkt.STVAL = rst.getString("STVAL").trim();
                        }
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
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
                        if (rst.getString("STVAL").trim().equals("2") || rst.getString("STVAL").trim().equals("6")) {
                            //SALES
                            /*beanTkt.FTE = rst.getString("FTE").trim();
                             if (rst.getString("FTE").trim().equals("A")) {
                             beanTkt.strSORIG = "ARC";
                             } else if (rst.getString("FTE").trim().equals("B")) {
                             beanTkt.strSORIG = "BSP";
                             } else if (rst.getString("FTE").trim().equals("S")) {
                             beanTkt.strSORIG = "ASR";
                             }*/
                            beanTkt.SDATEL = rst.getString("SDATEL").trim();
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
                            beanTkt.AVFOP = rst.getDouble("AVFOP");
                            if (beanTkt.SVFOP == beanTkt.AVFOP) {
                                beanTkt.valVFOP = 1;
                            } else {
                                beanTkt.valVFOP = 2;
                            }
                            beanTkt.SCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                            //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                            beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                            beanTkt.SINVN = rst.getString("SINVN").trim();
                            beanTkt.SIDATE = rst.getString("SIDATE").trim();
                            beanTkt.SPNR = rst.getString("SPNR").trim();
                            beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                        } else {
                            /*beanTkt.FTE = rst.getString("AFTE").trim();
                             if (rst.getString("AFTE").trim().equals("B")) {
                             beanTkt.strSORIG = "Billed";
                             } else if (rst.getString("AFTE").trim().equals("N")) {
                             beanTkt.strSORIG = "Not Billed";
                             } else if (rst.getString("AFTE").trim().equals("L")) {
                             beanTkt.strSORIG = "Local";
                             }*/
                            //CAMBIO DE A -> S POR MATCH AUTOMATICO
                            beanTkt.SDATEL = rst.getString("ADATEL").trim();
                            beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                            beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                            beanTkt.strDescCountry = rst.getString("NAMEA").trim();
                            beanTkt.SAGENT = rst.getString("SAGENT").trim();
                            beanTkt.SDATE = rst.getString("ADATE").trim();
                            beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                            beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                            beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                            beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                            beanTkt.SVFOP = rst.getDouble("SVFOP");
                            beanTkt.AVFOP = rst.getDouble("AVFOP");
                            if (beanTkt.SVFOP == beanTkt.AVFOP) {
                                beanTkt.valVFOP = 1;
                            } else {
                                beanTkt.valVFOP = 2;
                            }
                            beanTkt.SCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                            beanTkt.strDescCard = rst.getString("NAMECARA").trim();
                            //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                            beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                            beanTkt.SINVN = rst.getString("SINVN").trim();
                            beanTkt.SIDATE = rst.getString("AIDATE").trim();
                            beanTkt.SPNR = rst.getString("SPNR").trim();
                            beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                        }
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        beanTkt.page.PAGNUM = filter.page.PAGNUM;
                        beanTkt.page.PAGROW = filter.page.PAGROW;
                        beanTkt.page.TOTPAG = filter.page.TOTPAG;
                        beanTkt.page.TOTROW = filter.page.TOTROW;
                        lstTkts.add(beanTkt);

                    } else {
                        //MATCH CON DIFERENCIAS
                        //REGISTRO CON DATOS DE LA VENTA =======================
                        beanTkt = new A4164Filter();
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
                        beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                        beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                        //beanTkt.strDescCard = filter.strDescCard.trim();
                        //beanTkt.strDescCountry = filter.strDescCountry.trim();
                        beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                        beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                        beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                        beanTkt.strMoneda = filter.strMoneda.trim();
                        beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                        if (rst.getString("TDOC").trim().equals("R")) {
                            beanTkt.strPEM = "REFUND";
                        } else {
                            beanTkt.strPEM = "SALES";
                        }
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
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
                        }
                        if (!rst.getString("ERROR").trim().isEmpty()) {
                            beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                        } else {
                            beanTkt.CERROR = rst.getString("CERROR").trim();
                        }
                        /*beanTkt.FTE = rst.getString("FTE").trim();
                         if (rst.getString("FTE").trim().equals("A")) {
                         beanTkt.strSORIG = "ARC";
                         } else if (rst.getString("FTE").trim().equals("B")) {
                         beanTkt.strSORIG = "BSP";
                         } else if (rst.getString("FTE").trim().equals("S")) {
                         beanTkt.strSORIG = "ASR";
                         }*/
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
                        beanTkt.SDATEL = rst.getString("SDATEL").trim();
                        beanTkt.SFLOAD = rst.getString("SFLOAD").trim();
                        beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                        beanTkt.strDescCountry = rst.getString("NAMES").trim();
                        beanTkt.SAGENT = rst.getString("SAGENT").trim();
                        beanTkt.SDATE = rst.getString("SDATE").trim();
                        beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                        beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                        beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                        beanTkt.STCNTR = rst.getString("STCNTR").trim();
                        beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                        beanTkt.SVFOP = rst.getDouble("SVFOP");
                        beanTkt.AVFOP = rst.getDouble("AVFOP");
                        if (beanTkt.SVFOP == beanTkt.AVFOP) {
                            beanTkt.valVFOP = 1;
                        } else {
                            beanTkt.valVFOP = 2;
                        }
                        ;
                        beanTkt.SCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), rst.getString("ACARDN").trim());
                        beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                        beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("SINVN").trim();
                        beanTkt.SIDATE = rst.getString("SIDATE").trim();
                        beanTkt.SPNR = rst.getString("SPNR").trim();
                        beanTkt.SPNRSP = rst.getString("SPNRSP").trim();
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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
                        beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";

                        if (rst.getString("FVOID").trim().equals("V")) {
                            beanTkt.strFlagStat = "Void";

                        } else if (rst.getString("FLAGC").trim().equals("C")) {
                            beanTkt.strFlagStat = "CNJ";
                        }

                        beanTkt.page.PAGNUM = filter.page.PAGNUM;
                        beanTkt.page.PAGROW = filter.page.PAGROW;
                        beanTkt.page.TOTPAG = filter.page.TOTPAG;
                        beanTkt.page.TOTROW = filter.page.TOTROW;

                        lstTkts.add(beanTkt);
                        //REGISTRO CON DATOS DEL ACCB ==============================
                        beanTkt = new A4164Filter();
                        beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                        beanTkt.strFormatDate = filter.strFormatDate.trim();
                        beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                        beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                        beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                        beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                        beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                        beanTkt.IN_FTE = filter.IN_FTE.trim();
                        beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                        beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                        beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                        beanTkt.IN_AUTHNBR = filter.IN_AUTHNBR.trim();
                        beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                        //beanTkt.strDescCard = filter.strDescCard.trim();
                        //beanTkt.strDescCountry = filter.strDescCountry.trim();
                        beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                        beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                        beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                        beanTkt.strMoneda = filter.strMoneda.trim();
                        if (rst.getString("AFTE").trim().equals("X")) {
                            beanTkt.strPEM = "Settlement BSP";
                        } else if (rst.getString("AFTE").trim().equals("A")) {
                            beanTkt.strPEM = "Settlement ARC";
                        } else if (rst.getString("AFTE").trim().equals("B")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else if (rst.getString("AFTE").trim().equals("N")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else if (rst.getString("AFTE").trim().equals("L")) {
                            beanTkt.strPEM = "Settlement ASR";
                        } else {
                            beanTkt.strPEM = "Settlement";
                        }
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
                        if (hmDescCompl.containsKey(rst.getString("FCOMPL").trim().toUpperCase())) {
                            beanTkt.strFCOMPL = hmDescCompl.get(rst.getString("FCOMPL").trim()).toString();
                        } else {
                            beanTkt.strFCOMPL = rst.getString("FCOMPL").trim();
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
                        //PARA AQUELLOS QUE SEAN ACCB SIN VENTA
                        /*beanTkt.FTE = rst.getString("AFTE").trim();
                         if (rst.getString("AFTE").trim().equals("B")) {
                         beanTkt.strSORIG = "Billed";
                         } else if (rst.getString("AFTE").trim().equals("N")) {
                         beanTkt.strSORIG = "Not Billed";
                         } else if (rst.getString("AFTE").trim().equals("L")) {
                         beanTkt.strSORIG = "Local";
                         }*/
                        beanTkt.SDATEL = rst.getString("ADATEL").trim();
                        beanTkt.SFLOAD = rst.getString("AFLOAD").trim();
                        beanTkt.SCOUNTRY = rst.getString("ACOUNTRY").trim();
                        beanTkt.strDescCountry = rst.getString("NAMEA").trim();
                        beanTkt.SAGENT = rst.getString("AAGENT").trim();
                        beanTkt.SDATE = rst.getString("ADATE").trim();
                        beanTkt.SPAYMENT = rst.getString("APAYMENT").trim();
                        beanTkt.SCARCOD = rst.getString("ACARCOD").trim();
                        beanTkt.strDescCard = rst.getString("NAMECARA").trim();
                        beanTkt.STCNTR = rst.getString("ATCNTR").trim();
                        beanTkt.SCURRENCY = rst.getString("ACURRENCY").trim();
                        beanTkt.SVFOP = rst.getDouble("SVFOP");
                        beanTkt.AVFOP = rst.getDouble("AVFOP");
                        beanTkt.SCARDN = rst.getString("SCARDN").trim();
                        beanTkt.strSCARDN = rst.getString("SCARDN").trim();
                        //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                        beanTkt.SAUTHOC = rst.getString("AAUTHOC").trim();
                        beanTkt.SINVN = rst.getString("AINVN").trim();
                        beanTkt.SIDATE = rst.getString("AIDATE").trim();
                        beanTkt.SPNR = rst.getString("APNR").trim();
                        beanTkt.SPNRSP = rst.getString("APNRSP").trim();
                        if (beanTkt.SFLOAD.trim().equals("M")) {
                            beanTkt.SFLOAD = "Manual";
                        }
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                        beanTkt.SEQCOUNT = rst.getString("SEQCOUNT").trim();
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
                        beanTkt.GRUPO = rst.getString("GRUPO").trim();
                        beanTkt.IDFIL = rst.getString("IDFIL").trim();

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
                        beanTkt.strTitulo += beanTkt.SDATE + " - Country : " + filter.strDescCountry.trim() + " - Card : "
                                + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " **" + hmDescEstados.get(beanTkt.IN_STVAL).toString() + "** ";

                        if (rst.getString("FVOID").trim().equals("V")) {
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
                }
                rst.close();

            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    //PRESENTACION SEGUN ERROR
                    beanTkt = new A4164Filter();
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
    
    public List<A4164Filter> loadPX584SQP04604(A4164Filter filter) throws SQLException, Exception {

        List<A4164Filter> lstTkts = new ArrayList<A4164Filter>(0);
        A4164Filter beanTkt;

        A4164Filter objRtn;
        objRtn = new A4164Filter();
        objRtn.CODE = "";
        objRtn.NAME = "All";
        lstTkts.add(objRtn);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04604(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4164Filter();

                beanTkt.CODE = rst.getString("SCURRENCY").trim();
                beanTkt.NAME = rst.getString("SCURRENCY").trim();
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
    
    public String loadPX584SQP04752(A4164Filter filter) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //lstSendManual

        String msj = "";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04752(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CCIA.trim() + filter.FORMA.trim() + filter.SERIE.trim());
            cstmt01.setString(3, filter.SDATE.trim());
            cstmt01.setString(4, filter.TDOC.trim());
            cstmt01.setString(5, filter.OBSERV_BPO.trim());
            cstmt01.setString(6, session.getUserView().getUserInfo().USR);
            cstmt01.setString(7, Functions.getFechaActual());
            cstmt01.setString(8, Functions.getHoraActual());

            cstmt01.execute();

        } catch (Exception e) {
            msj = e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
