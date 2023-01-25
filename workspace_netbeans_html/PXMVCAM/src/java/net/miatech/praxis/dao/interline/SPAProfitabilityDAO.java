package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.TCNCoupon;
import net.miatech.beans.TCNFilter;
import net.miatech.beans.WRF001Filter;
import net.miatech.libmiatec.A729;
import net.miatech.praxis.flown.A728;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class SPAProfitabilityDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<WRF001Filter> loadPX241S01(WRF001Filter filter) throws SQLException, Exception {

        List<WRF001Filter> list = new ArrayList<WRF001Filter>();
        WRF001Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSFIM = 0, lnQAUDI = 0, lnQSUPAUD = 0, lnQRMSPA = 0, lnVALMPA = 0, lnQSPA = 0, lnPROF = 0;
        double dbQRM = 0, dbNETI = 0, dbRMVSPA = 0, dbNETO = 0, dbVALSRP = 0, dbVALSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00463(?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.IN_TOP.trim());
            // cstmt.setString(9, filter.IN_STVAL.trim());

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnQCUPON = rs01.getLong("QCUPON");
                lnQSPA = rs01.getLong("QSPA");
                lnQAUDI = rs01.getLong("QAUDI");
                dbQRM = rs01.getDouble("QRM");
                lnQRMSPA = rs01.getLong("QRMSPA");
                dbNETI = rs01.getDouble("NETI");
                dbNETO = rs01.getDouble("NETO");
                lnVALMPA = rs01.getLong("VALMPA");
                dbVALSRP = rs01.getDouble("VALSRP");
                dbVALSPA = rs01.getDouble("VALSPA");
                lnPROF = rs01.getLong("PROF");

                lnQSFIM = rs01.getLong("QSFIM");
                lnQSUPAUD = rs01.getLong("QSUPAUD");
                dbRMVSPA = rs01.getDouble("RMVSPA");


            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF001Filter();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    // objRtn.IN_AIRLINE = filter.IN_AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    // objRtn.IN_STVAL = filter.IN_STVAL.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.AIRLINE = rs01.getString("AIRLINE").trim();
                    objRtn.strAirlineName = rs01.getString("DES_BAIR").trim();
                    objRtn.FINVOICE = rs01.getString("FINVOICE").trim();
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.CURRENP = rs01.getString("CURRENP").trim();
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.QRM = rs01.getDouble("QRM");
                    objRtn.QRMSPA = rs01.getDouble("QRMSPA");
                    objRtn.QSPA = rs01.getDouble("QSPA");
                    objRtn.VALMPA = rs01.getDouble("VALMPA");
                    objRtn.VALSPA = rs01.getDouble("VALSPA");
                    objRtn.VALSRP = rs01.getDouble("VALSRP");
                    objRtn.RMVSPA = rs01.getDouble("RMVSPA");
                    if (rs01.getString("TDOC").trim().equals("4")) {
                        objRtn.QCUPON = rs01.getDouble("QSFIM");
                        objRtn.QAUDI = rs01.getLong("QSUPAUD");
                    } else {
                        objRtn.QCUPON = rs01.getDouble("QCUPON");
                        objRtn.QAUDI = rs01.getLong("QAUDI");
                    }

                    objRtn.lngPROF = rs01.getLong("PROF");
                    
                    objRtn.perQSPA = (rs01.getDouble("QSPA") * 100) / rs01.getDouble("QCUPON");
                    if (rs01.getDouble("QRM") != 0) {
                        objRtn.perQRMSPA = (rs01.getDouble("QRMSPA") * 100) / rs01.getDouble("QRM");
                    }

                    if (rs01.getLong("NETI") > 0) {
                        objRtn.dblPerRec = (rs01.getDouble("NETO") / rs01.getDouble("NETI")) * 100;
                    } else {
                        objRtn.dblPerRec = 0;
                    }

                    objRtn.lnQCUPON = lnQCUPON;
                    objRtn.lnQSFIM = lnQSFIM;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnQSUPAUD = lnQSUPAUD;
                    objRtn.lnQRMSPA = lnQRMSPA;
                    objRtn.lnVALMPA = lnVALMPA;
                    objRtn.lnQSPA = lnQSPA;
                    objRtn.lnPROF = lnPROF;
                    objRtn.dbQRM = dbQRM;
                    objRtn.dbNETI = dbNETI;
                    objRtn.dbRMVSPA = dbRMVSPA;
                    objRtn.dbNETO = dbNETO;
                    objRtn.dbVALSRP = dbVALSRP;
                    objRtn.dbVALSPA = dbVALSPA;

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
    
    public List<WRF001Filter> loadPX241S02(WRF001Filter filter) throws SQLException, Exception {
        List<WRF001Filter> list = new ArrayList<WRF001Filter>();
        WRF001Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSFIM = 0, lnQAUDI = 0, lnQSUPAUD = 0, lnQRMSPA = 0, lnVALMPA = 0, lnQSPA = 0, lnPROF = 0;
        double dbQRM = 0, dbNETI = 0, dbRMVSPA = 0, dbNETO = 0, dbVALSRP = 0, dbVALSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00464(?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.FINVOICE.trim());

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dbVALSPA = rs01.getDouble("VALSPA");
                dbNETI = rs01.getLong("NETI");
                lnQAUDI = rs01.getLong("NETM");
                dbNETO = rs01.getDouble("NETO");
                dbVALSRP = rs01.getDouble("VALSRP");
                lnVALMPA = rs01.getLong("VALMPA");


            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF001Filter();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.FINVOICE = filter.FINVOICE.trim();

                    objRtn.IN_DATE = rs01.getString("FINVOICE");
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE);
                    objRtn.IN_AIRLINE = rs01.getString("AIRLINE");
                    objRtn.NROPRT = rs01.getString("NROPRT");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.IN_TKT = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.CURRENP = rs01.getString("CURRENP");
                    objRtn.NETM = rs01.getDouble("NETM");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT");
                    if (objRtn.RMACCEPT.trim().equals("S")) {
                        objRtn.strASIGNED = "Y";
                    } else {
                        objRtn.strASIGNED = "N";
                    }
                    objRtn.GRUPO = rs01.getString("GRUPO");
                    objRtn.RUTAP = rs01.getString("RUTAP");
                    objRtn.strFDWORK = objRtn.RUTAP.substring(0, 3) + "-" + objRtn.RUTAP.substring(3, 6);
                    objRtn.VALMPA = rs01.getDouble("VALMPA");
                    objRtn.VALSPA = rs01.getDouble("VALSPA");
                    objRtn.VALSRP = rs01.getDouble("VALSRP");

                    objRtn.dbNETO = dbNETO;
                    objRtn.dbVALSRP = dbVALSRP;
                    objRtn.dbVALSPA = dbVALSPA;
                    objRtn.dbNETI = dbNETI;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnVALMPA = lnVALMPA;

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
    
    public List<WRF001Filter> loadPX241S03(WRF001Filter filter) throws SQLException, Exception {
        List<WRF001Filter> list = new ArrayList<WRF001Filter>();
        WRF001Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00480(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.GRUPO.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnQSPA = rs01.getLong("QCANSPA");
                lnQCUPON = rs01.getLong("QCANTID");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF001Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.STVAL = filter.STVAL.trim();
                    objRtn.GRUPO = filter.GRUPO.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.strFDWORK = rs01.getString("ARGUM").trim();
                    objRtn.strASIGNED = objRtn.strFDWORK.substring(0, 3) + "-" + objRtn.strFDWORK.substring(3, 6);
                    objRtn.QSPA = rs01.getLong("QCANSPA");
                    objRtn.QCUPON = rs01.getLong("QCANTID");

                    objRtn.lnQSPA = lnQSPA;
                    objRtn.lnQCUPON = lnQCUPON;

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
    
    public List<WRF001Filter> loadPX241S04(WRF001Filter filter) throws SQLException, Exception {
        List<WRF001Filter> list = new ArrayList<WRF001Filter>();
        WRF001Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00481(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.GRUPO.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnQSPA = rs01.getLong("QCANSPA");
                lnQCUPON = rs01.getLong("QCANTID");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF001Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.STVAL = filter.STVAL.trim();
                    objRtn.GRUPO = filter.GRUPO.trim();
                    objRtn.RN = rs01.getLong("RN");
                    if (rs01.getString("A021KEY") != null) {
                        objRtn.strASIGNED = rs01.getString("A021KEY").trim();
                    }
                    if (rs01.getString("A021COMEN1") != null) {
                        objRtn.COMME1 = rs01.getString("A021COMEN1").trim().replace("\"", "");
                    }
                    objRtn.QCUPON = rs01.getLong("QCANTID");
                    objRtn.QSPA = rs01.getLong("QCANSPA");

                    objRtn.lnQSPA = lnQSPA;
                    objRtn.lnQCUPON = lnQCUPON;
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
    
    public List<WRF001Filter> loadPX241S05(WRF001Filter filter) throws SQLException, Exception {
        List<WRF001Filter> list = new ArrayList<WRF001Filter>();
        WRF001Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00482(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.GRUPO.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnQSPA = rs01.getLong("QCANSPA");
                lnQCUPON = rs01.getLong("QCANTID");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF001Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.STVAL = filter.STVAL.trim();
                    objRtn.GRUPO = filter.GRUPO.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.strASIGNED = rs01.getString("ARGUM").trim();
                    if (rs01.getString("A051DESCR1") != null) {
                        objRtn.DES_FTE = rs01.getString("A051DESCR1").trim().replace("\"", "");
                    }
                    objRtn.QCUPON = rs01.getLong("QCANTID");
                    objRtn.QSPA = rs01.getLong("QCANSPA");

                    objRtn.lnQSPA = lnQSPA;
                    objRtn.lnQCUPON = lnQCUPON;
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
    
    public List<WRF001Filter> loadPX241S06(WRF001Filter filter) throws SQLException, Exception {
        List<WRF001Filter> list = new ArrayList<WRF001Filter>();
        WRF001Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00483(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.GRUPO.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnQSPA = rs01.getLong("QCANSPA");
                lnQCUPON = rs01.getLong("QCANTID");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF001Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.STVAL = filter.STVAL.trim();
                    objRtn.GRUPO = filter.GRUPO.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.strFDWORK = rs01.getString("ARGUM").trim();
                    objRtn.strASIGNED = objRtn.strFDWORK.substring(0, 3) + "-" + objRtn.strFDWORK.substring(3, 6);
                    objRtn.QCUPON = rs01.getLong("QCANTID");
                    objRtn.QSPA = rs01.getLong("QCANSPA");

                    objRtn.lnQSPA = lnQSPA;
                    objRtn.lnQCUPON = lnQCUPON;
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
    
    public List<WRF001Filter> loadPX241S07(WRF001Filter filter) throws SQLException, Exception {
        List<WRF001Filter> list = new ArrayList<WRF001Filter>();
        WRF001Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnPROF = 0, lnQAUDI = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00491(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_CURRENP.trim());
            cstmt.setString(8, filter.strFDWORK.trim());
            cstmt.setString(9, filter.GRUPO.trim());
            cstmt.setString(10, filter.FINVOICE.trim());
            cstmt.setString(11, filter.IN_DATE.trim());

            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

//            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnPROF = rs01.getLong("NETI");
                lnQAUDI = rs01.getLong("NETM");
                lnQCUPON = rs01.getLong("NETO");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF001Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    // objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();

                    // objRtn.GRUPO = filter.GRUPO.trim();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.AIRLINE = rs01.getString("AIRLINE").trim();
                    objRtn.GRUPO = rs01.getString("GRUPO").trim();
                    objRtn.FINVOICE = rs01.getString("FINVOICE").trim();
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.INVOICE = rs01.getString("INVOICE").trim();
                    objRtn.CURRENP = rs01.getString("CURRENP").trim();
                    objRtn.CCIA = rs01.getString("CCIA").trim();
                    objRtn.FORMA = rs01.getString("FORMA").trim();
                    objRtn.SERIE = rs01.getString("SERIE").trim();
                    objRtn.CUPON = rs01.getString("CUPON").trim();
                    objRtn.IN_TKT = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NROPRT = rs01.getString("NROPRT").trim();
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT").trim();
                    objRtn.TUSO = rs01.getString("TUSO").trim();
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.NETM = rs01.getDouble("NETM");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.FMETHOD = rs01.getString("FMETHOD").trim();
                    objRtn.strFDWORK = rs01.getString("RUTAP").trim();
                    objRtn.RUTAP = objRtn.strFDWORK.substring(0, 3) + "-" + objRtn.strFDWORK.substring(3, 6);

                    objRtn.lnPROF = lnPROF;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnQCUPON = lnQCUPON;
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
    
    public List<WRF001Filter> loadPX241S08(WRF001Filter filter) throws SQLException, Exception {
        List<WRF001Filter> list = new ArrayList<WRF001Filter>();
        WRF001Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnPROF = 0, lnQAUDI = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00492(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_CURRENP.trim());
            cstmt.setString(8, filter.strASIGNED.trim());
            cstmt.setString(9, filter.GRUPO.trim());
            cstmt.setString(10, filter.FINVOICE.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnPROF = rs01.getLong("NETI");
                lnQAUDI = rs01.getLong("NETM");
                lnQCUPON = rs01.getLong("NETO");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF001Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    // objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.strASIGNED = filter.strASIGNED.trim();

                    // objRtn.GRUPO = filter.GRUPO.trim();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.AIRLINE = rs01.getString("AIRLINE").trim();
                    objRtn.GRUPO = rs01.getString("GRUPO").trim();
                    objRtn.FINVOICE = rs01.getString("FINVOICE").trim();
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.INVOICE = rs01.getString("INVOICE").trim();
                    objRtn.CURRENP = rs01.getString("CURRENP").trim();
                    objRtn.CCIA = rs01.getString("CCIA").trim();
                    objRtn.FORMA = rs01.getString("FORMA").trim();
                    objRtn.SERIE = rs01.getString("SERIE").trim();
                    objRtn.CUPON = rs01.getString("CUPON").trim();
                    objRtn.IN_TKT = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NROPRT = rs01.getString("NROPRT").trim();
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT").trim();
                    objRtn.TUSO = rs01.getString("TUSO").trim();
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.NETM = rs01.getDouble("NETM");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.FMETHOD = rs01.getString("FMETHOD").trim();
                    objRtn.strFDWORK = rs01.getString("RUTAP").trim();
                    objRtn.RUTAP = objRtn.strFDWORK.substring(0, 3) + "-" + objRtn.strFDWORK.substring(3, 6);

                    objRtn.lnPROF = lnPROF;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnQCUPON = lnQCUPON;
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
    
    public List<WRF001Filter> loadPX241S09(WRF001Filter filter) throws SQLException, Exception {
        List<WRF001Filter> list = new ArrayList<WRF001Filter>();
        WRF001Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQAUDI = 0, lnVALMPA = 0;
        double dbNETI = 0, dbNETO = 0, dbVALSRP = 0, dbVALSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00503(?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strYearTo.substring(0, 3));//CIA
            cstmt.setString(3, filter.strYearTo.substring(3, 7));//FORMA
            cstmt.setString(4, filter.strYearTo.substring(7, 13));//SERIE

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dbVALSPA = rs01.getDouble("VALSPA");
                dbNETI = rs01.getLong("NETI");
                lnQAUDI = rs01.getLong("NETM");
                dbNETO = rs01.getDouble("NETO");
                dbVALSRP = rs01.getDouble("VALSRP");
                lnVALMPA = rs01.getLong("VALMPA");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF001Filter();
                    objRtn.IN_DATE = rs01.getString("FINVOICE");
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE);
                    objRtn.IN_AIRLINE = rs01.getString("AIRLINE");
                    objRtn.NROPRT = rs01.getString("NROPRT");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.IN_TKT = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.CURRENP = rs01.getString("CURRENP");
                    objRtn.NETM = rs01.getDouble("NETM");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT");
                    if (objRtn.RMACCEPT.trim().equals("S")) {
                        objRtn.strASIGNED = "Y";
                    } else {
                        objRtn.strASIGNED = "N";
                    }
                    objRtn.GRUPO = rs01.getString("GRUPO");
                    objRtn.RUTAP = rs01.getString("RUTAP");
                    objRtn.strFDWORK = objRtn.RUTAP.substring(0, 3) + "-" + objRtn.RUTAP.substring(3, 6);
                    objRtn.VALMPA = rs01.getDouble("VALMPA");
                    objRtn.VALSPA = rs01.getDouble("VALSPA");
                    objRtn.VALSRP = rs01.getDouble("VALSRP");
                    objRtn.dbNETO = dbNETO;
                    objRtn.dbVALSRP = dbVALSRP;
                    objRtn.dbVALSPA = dbVALSPA;
                    objRtn.dbNETI = dbNETI;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnVALMPA = lnVALMPA;

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
    
    public HashMap loadPX164SQP0038(A020Filter filter) throws SQLException, Exception {

        A020Filter data = new A020Filter();
        A728 dataA728 = new A728();

        //ROUNTING
        A728 sector;
        List<A728> list = new ArrayList<A728>();
        int intQty = 0;
        HashMap<String, Object> hmResultado = new HashMap<String, Object>();
        HashMap<String, String> hmAMTV = new HashMap<String, String>();
        hmAMTV.put("S", "SRP");
        hmAMTV.put("A", "SPA");
        hmAMTV.put("AZ", "ZED");
        hmAMTV.put("AM", "MXP");
        hmAMTV.put("AQ", "FQT");
        hmAMTV.put("AP", "SMP");
        hmAMTV.put("A&", "F&F");
        hmAMTV.put("AR", "RTW");
        hmAMTV.put("AL", "GLB");
        hmAMTV.put("M", "MPA");
        hmAMTV.put("P", "MPA");
        hmAMTV.put("R", "RTW");
        hmAMTV.put("H", "ACH");


        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00115(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt.setString(3, filter.A020KEY.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A020">

            if (rs01.next()) {

                data.A020KEY = filter.A020KEY;
                data.strTKT = rs01.getString("A020CIA").trim() + " " + rs01.getString("A020FORMA").trim() + rs01.getString("A020SERIE").trim()
                        + " " + rs01.getString("A020CUPON").trim();
                data.strTicket = rs01.getString("A020CIA").trim() + rs01.getString("A020FORMA").trim() + rs01.getString("A020SERIE").trim() + rs01.getString("A020CUPON").trim();
                data.A020SUDEBI = rs01.getDouble("A020SUDEBI");
                data.A020IMPNAC = rs01.getDouble("A020IMPNAC");
                data.A020ANALIZ = rs01.getDouble("A020ANALIZ");
                data.A020TOTDEB = rs01.getDouble("A020TOTDEB");
                data.A020ACEPTA = rs01.getDouble("A020ACEPTA");
                data.A020IMPINT = rs01.getDouble("A020IMPINT");
                data.A020COMISP = rs01.getDouble("A020COMISP");
                data.A020TOTHAB = rs01.getDouble("A020TOTHAB");
                data.A020REDEBI = rs01.getDouble("A020REDEBI");
                data.A020COMISI = rs01.getDouble("A020COMISI");
                data.A020TAX = rs01.getDouble("A020TAX");
                data.A020GRUPO = rs01.getString("A020GRUPO").trim();
                data.A020NROPRT = rs01.getString("A020NROPRT").trim();
                data.A020USER = rs01.getString("A020USER").trim();
                data.A020SDATE = rs01.getString("A020SDATE").trim();
                data.A020STIME = rs01.getString("A020STIME").trim();
                data.A020FRECHA = rs01.getString("A020FRECHA").trim();
                data.A020PSTRF = rs01.getString("A020PSTRF").trim();
                data.A020RMSN = rs01.getString("A020RMSN").trim();
                data.A020RMANT = rs01.getString("A020RMANT").trim();
                data.A020NETO = rs01.getDouble("A020NETO");
                data.A020SUFECH = rs01.getString("A020SUFECH").trim();
                data.A020TIPORM = rs01.getString("A020TIPORM").trim();
                if (rs01.getString("A020TIPORM").trim().equals("N") || rs01.getString("A020CLASRM").trim().equals("F")) {
                    data.A020SUFECH = rs01.getString("A020SUFECH").trim();
                } else {
                    data.A020SUFECH = rs01.getString("A020FUSO").trim();
                }
                data.A020FUSO = rs01.getString("A020FUSO").trim();
                data.A020CLASRM = rs01.getString("A020CLASRM").trim();
                data.A020CODMOT = rs01.getString("A020CODMOT").trim();
                data.A020BASE = rs01.getString("A020BASE").trim();
                data.A020TARIFA = rs01.getDouble("A020TARIFA");
                data.A020MONEDA = rs01.getString("A020MONEDA").trim();
                data.A020FAREUS = rs01.getDouble("A020FAREUS");
                data.A020MNRCD = rs01.getString("A020MNRCD").trim();
                data.A020DEBHAB = rs01.getString("A020DEBHAB").trim();
                data.A020QSEGUS = rs01.getDouble("A020QSEGUS");
                data.A020TUSO = rs01.getString("A020TUSO").trim();
                data.A020TCALC = rs01.getString("A020TCALC").trim();
                data.A020BOTCPR = rs01.getDouble("A020BOTCPR");
                data.A020BOTCRM = rs01.getDouble("A020BOTCRM");
                data.A020AOTCPM = rs01.getDouble("A020AOTCPM");
                data.A020AOTCRM = rs01.getDouble("A020AOTCRM");
                data.A020DOTCRM = rs01.getDouble("A020DOTCRM");

                //Guardando los comentarios ====================================
                /*data.A020CODOB1 = rs01.getString("A020CODOB1").trim();
                 data.A020CODOB2 = rs01.getString("A020CODOB2").trim();
                 data.A020CODOB3 = rs01.getString("A020CODOB3").trim();
                 data.A020CODOB4 = rs01.getString("A020CODOB4").trim();
                 data.A020CODOB5 = rs01.getString("A020CODOB5").trim();
                 data.A020COMME1 = rs01.getString("A020COMME1").trim();
                 data.A020COMME2 = rs01.getString("A020COMME2").trim();
                 data.A020COMME3 = rs01.getString("A020COMME3").trim();
                 data.A020COMME4 = rs01.getString("A020COMME4").trim();
                 data.A020COMME5 = rs01.getString("A020COMME5").trim();
                 data.A020COMME6 = rs01.getString("A020COMME6").trim();

                 for (int i = 1; i < 6; i++) {
                 comentario = new A021();
                    
                 if (rs01.getString("A020CODOB" + i) != null && !rs01.getString("A020CODOB" + i).trim().equals("")) {
                 comentario.A021KEY = rs01.getString("A020CODOB" + i).trim();
                 if (rs01.getString("A020COMME" + i) != null) {
                 comentario.A021COMEN1 = rs01.getString("A020COMME" + i).trim();
                 } else {
                 //(Consultar si se debe buscar el texto del comentario)
                 comentario.A021COMEN1 = "";
                 }
                 if ((i + 1) < 6) {
                 if (rs01.getString("A020CODOB" + (i + 1)) == null
                 || rs01.getString("A020CODOB" + (i + 1)).trim().equals("")) {
                 comentario.A021COMEN2 = rs01.getString("A020COMME" + (i + 1));
                 } else {
                 comentario.A021COMEN2 = "";
                 }
                 } else {
                 //Para el comentario 6
                 comentario.A021COMEN2 = rs01.getString("A020COMME" + (i + 1));
                 }
                 if (rs01.getString("A020DEBHAB") != null) {
                 comentario.A021CONCEP = Functions.fillString(rs01.getString("A020DEBHAB"), 5).substring(i - 1, i);
                 } else {
                 comentario.A021CONCEP = " ";
                 }

                 lstComentarios.add(comentario);
                 }

                 }

                 Functions.limpiarCamposA020Comentarios(data);
                 comentario = null;
                 for (int i = 0; i < listaComentarios.size(); i++) {
                 comentario = listaComentarios.get(i);
                 Functions.colocarComentarios(data, comentario);
                 }*/

                if (rs01.getString("A020TICKE1") != null && rs01.getString("A020TICKE2") != null) {
                    data.A020TICKE1 = rs01.getString("A020TICKE1").trim().concat("\n").concat(rs01.getString("A020TICKE2").trim());
                } else {
                    data.A020TICKE1 = "";
                }

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            //</editor-fold>

            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A728">
                rs01 = cstmt.getResultSet();
                boolean poseeSector = false;
                while (rs01.next()) {
                    if (intQty == 0) {
                        dataA728.A728CUPON = rs01.getString("A728CUPON").trim();
                        dataA728.A728FECVTA = rs01.getString("A728FECVTA").trim();
                        dataA728.A728AIRFAC = rs01.getString("A728AIRFAC").trim();
                        dataA728.A728CTYVTA = rs01.getString("A728CTYVTA").trim();
                        dataA728.A728CTYEMI = rs01.getString("A728CTYEMI").trim();
                        dataA728.A728GRUPO = rs01.getString("A728GRUPO").trim();
                        dataA728.A728COUVTA = rs01.getString("A728COUVTA").trim();
                        dataA728.A728COUEMI = rs01.getString("A728COUEMI").trim();
                        dataA728.A728AJTRAM = rs01.getString("A728AJTRAM").trim();
                        dataA728.A728SECOR = rs01.getString("A728SECOR").trim();
                        dataA728.A728SECDS = rs01.getString("A728SECDS").trim();
                        dataA728.A728ATBP = rs01.getDouble("A728ATBP");
                        dataA728.A728MDAATB = rs01.getString("A728MDAATB").trim();
                        dataA728.A728CODTAX = rs01.getString("A728CODTAX").trim();
                        dataA728.A728TDESC = rs01.getString("A728TDESC").trim();
                        dataA728.A728PORDES = rs01.getDouble("A728PORDES");
                        dataA728.A728CODIT = rs01.getString("A728CODIT").trim();
                        dataA728.A728CSOVER = rs01.getDouble("A728CSOVER");
                        dataA728.A728QSOVER = rs01.getInt("A728QSOVER");
                        dataA728.A728IPLUS = rs01.getString("A728IPLUS").trim();
                        dataA728.A728CPLUSS = rs01.getInt("A728CPLUSS");
                        dataA728.A728TAJUST = rs01.getDouble("A728TAJUST");
                        dataA728.A728RUTORG = rs01.getString("A728RUTORG").trim();
                        dataA728.A728MONSYS = rs01.getString("A728MONSYS").trim();
                        dataA728.A728LOHO = rs01.getString("A728LOHO").trim();
                        dataA728.A728TARIFA = rs01.getDouble("A728TARIFA");
                        dataA728.A728MONEDA = rs01.getString("A728MONEDA").trim();
                        dataA728.A728TRFPAG = rs01.getDouble("A728TRFPAG");
                        dataA728.A728MDAPAG = rs01.getString("A728MDAPAG").trim();
                        dataA728.A728ROE = rs01.getDouble("A728ROE");
                        //======================================================
                        //CAMPOS ADICIONALES QUE SON EXTRAIDOS PERO NO MAODIFICADOS EN EL FORMULARIO
                        dataA728.A728SEQPRT = rs01.getString("A728SEQPRT").trim();
                        dataA728.A728DCHEQ = rs01.getString("A728DCHEQ").trim();
                        dataA728.A728TVENTA = rs01.getString("A728TVENTA").trim();
                        dataA728.A728TCAREG = rs01.getDouble("A728TCAREG");
                        dataA728.A728MONREG = rs01.getString("A728MONREG").trim();
                        dataA728.A728TCASYS = rs01.getDouble("A728TCASYS");
                        dataA728.A728TCAPAG = rs01.getDouble("A728TCAPAG");
                        dataA728.A728INDSAM = rs01.getString("A728INDSAM").trim();
                        dataA728.A728INDPRT = rs01.getInt("A728INDPRT");
                        dataA728.A728SELEC = rs01.getString("A728SELEC").trim();
                        dataA728.valTiempoLimite = true;
                        dataA728.tieneComision = false;
                        //======================================================
                        //======================================================
                        sector = new A728();
                        sector.A728RUTAD = rs01.getString("A728RUTAO").trim();
                        sector.A728RERUT = rs01.getString("A728RERUT").trim();

                        list.add(sector);
                    }

                    if (rs01.getString("A728SECOR").trim().equals(rs01.getString("A728RUTAO").trim())
                            && rs01.getString("A728SECDS").trim().equals(rs01.getString("A728RUTAD").trim())) {
                        dataA728.A728FVLO1 = rs01.getString("A728FVLO1").trim();
                        dataA728.A728FBASE1 = rs01.getString("A728FBASE1").trim();
                    }

                    if (!rs01.getString("A728RUTAD").trim().equals("")) {

                        sector = new A728();
                        sector.A728RUTAD = rs01.getString("A728RUTAD").trim();
                        sector.A728CARRA1 = rs01.getString("A728CARRA1").trim();
                        sector.A728NVLO1 = rs01.getString("A728NVLO1").trim();
                        sector.A728BOOKI1 = rs01.getString("A728BOOKI1").trim();
                        sector.A728SS1 = rs01.getDouble("A728SS1");
                        sector.A728XO = rs01.getString("A728XO").trim();
                        sector.A728FACT1 = rs01.getLong("A728FACT1");
                        sector.A728PROV1 = rs01.getDouble("A728PROV1");
                        sector.A728PPRO1 = rs01.getDouble("A728PPRO1");
                        sector.A728TARI1 = rs01.getDouble("A728TARI1");
                        sector.A728ACUEO1 = rs01.getDouble("A728ACUEO1");
                        sector.A728VALOR1 = rs01.getDouble("A728VALOR1");

                        if (rs01.getString("A728INDPR1").trim().equals("A")) {
                            sector.strAMTV = "SPA";
                            if (hmAMTV.containsKey("A" + rs01.getString("A728ACUCO1").substring(9, 10))) {
                                sector.strAMTV = hmAMTV.get("A" + rs01.getString("A728ACUCO1").substring(9, 10)).toString();
                            }
                        } else {
                            if (hmAMTV.containsKey(rs01.getString("A728INDPR1").trim())) {
                                sector.strAMTV = hmAMTV.get(rs01.getString("A728INDPR1").trim()).toString();
                            }
                        }
                        sector.A728AJUST1 = rs01.getDouble("A728AJUST1");
                        //==============================================================
                        //CAMPOS ADICIONALES QUE SON EXTRAIDOS PERO NO MAODIFICADOS EN EL FORMULARIO
                        sector.A728VIA1 = rs01.getString("A728VIA1").trim();
                        sector.A728CARRN1 = rs01.getString("A728CARRN1").trim();
                        sector.A728FVLO1 = rs01.getString("A728FVLO1").trim();
                        sector.A728CLASE1 = rs01.getString("A728CLASE1").trim();
                        sector.A728FBASE1 = rs01.getString("A728FBASE1").trim();
                        sector.A728LOHO = rs01.getString("A728LOHO").trim();
                        sector.A728TBASE1 = rs01.getString("A728TBASE1").trim();
                        sector.A728STBAS1 = rs01.getString("A728STBAS1").trim();
                        sector.A728FARE1 = rs01.getDouble("A728FARE1");
                        sector.A728TFARE1 = rs01.getString("A728TFARE1").trim();
                        sector.A728DIFER1 = rs01.getDouble("A728DIFER1");
                        sector.A728FDIFE1 = rs01.getString("A728FDIFE1").trim();
                        sector.A728TRFM1 = rs01.getDouble("A728TRFM1");
                        sector.A728MNTFM1 = rs01.getString("A728MNTFM1").trim();
                        sector.A728CPLUSS = rs01.getDouble("A728CPLUSS");
                        sector.A728STOP1 = rs01.getDouble("A728STOP1");
                        sector.A728MNACU1 = rs01.getString("A728MNACU1").trim();
                        sector.A728ACUCO1 = rs01.getString("A728ACUCO1").trim();
                        sector.A728ACUE1 = rs01.getDouble("A728ACUE1");
                        sector.A728YANQ1 = rs01.getDouble("A728YANQ1");
                        sector.A728SUBPA1 = rs01.getString("A728SUBPA1").trim();
                        sector.A728VLMPA1 = rs01.getDouble("A728VLMPA1");
                        sector.A728VLSRP1 = rs01.getDouble("A728VLSRP1");
                        sector.A728INDPR1 = rs01.getString("A728INDPR1").trim();
                        sector.A728INDISC = rs01.getString("A728INDISC").trim();
                        sector.A728ISC = rs01.getDouble("A728ISC");
                        sector.A728COEFIC = rs01.getDouble("A728COEFIC");
                        sector.A728ACUBS1 = rs01.getString("A728ACUBS1").trim();
                        sector.A728ACUST1 = rs01.getString("A728ACUST1").trim();
                        sector.A728PRVST1 = rs01.getString("A728PRVST1").trim();
                        sector.A728RERUT = rs01.getString("A728RERUT").trim();
                        //=================================================================
                        /*Para saber si la ruta que viene pertenece al sector a prorratear.
                         Esto se hace para que se pueda mostrar "La pistolita" */
                        if (list.get(list.size() - 1).A728RUTAD.trim().equals(rs01.getString("A728SECOR").trim())
                                && rs01.getString("A728RUTAD").trim().equals(rs01.getString("A728SECDS").trim())) {
                            list.get(list.size() - 1).esSector = "solo";
                            sector.esSector = "todo";
                            dataA728.A728RERUT = rs01.getString("A728RERUT").trim();
                            poseeSector = true;
                        }
                        //=================================================================
                        list.add(sector);
                    }

                    intQty++;
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                if (!poseeSector) {
                    data.strMsgError = "DANGER : Error. The Ticket has errors on Prorate Route. (A728)";
                }

                //Esta porciÃ³n de cÃ³digo se hace para colocar el X/O en la ciudad correcta .. debido
                //a que el X/O q traÃ­a pertenecÃ­a al sector anterior
                for (int x = 0; x < list.size() - 1; x++) {
                    list.get(x).A728XO = list.get(x + 1).A728XO;
                }
                if (list != null && list.size() > 0) {
                    //Seteando el X/O de la Ãºltima ciudad del Routing ya q es imposible q 
                    //esta tenga ESCALA
                    list.get(list.size() - 1).A728XO = "";
                }
                //data.setSECTORS(list);

                //</editor-fold>
            }

            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A1200">
                rs01 = cstmt.getResultSet();
                if (rs01.next()) {
                    String file = rs01.getString("FILENAME");
                    data.strFileName = file;
                    data.strFileNameOrg = file;
                    data.strETKT = rs01.getString("ETKTIND");
                    data.strUSAC = rs01.getString("USAC");
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                //</editor-fold>
            }

            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A1292">
                rs01 = cstmt.getResultSet();
                String addInfo = "";
                if (rs01.next()) {
                    for (int i = 1; i < 16; i++) {
                        addInfo = addInfo.concat(rs01.getString("LINE" + i));
                    }
                }
                data.strAddInfo = addInfo;
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                //</editor-fold>
            }

            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A005">
                rs01 = cstmt.getResultSet();
                if (rs01.next()) {
                    if (rs01.getString("A005KEY3").trim().isEmpty()) {
                        data.strAirlineName = rs01.getString("A005KEY2");
                    } else {
                        data.strAirlineName = rs01.getString("A005KEY3");
                    }
                    data.strAlfa = rs01.getString("A005KEY1");
                    data.strCHS = rs01.getString("A005CHS");
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                //</editor-fold>
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

            hmResultado.put("A020", data);
            hmResultado.put("A728", dataA728);
            hmResultado.put("SECTORES", list);

        } catch (Exception e) {
            e.getMessage();
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

        return hmResultado;
    }
    
    public TCNFilter loadPX164SQP0077(String strTicket, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        NumberFormat nfDbl = NumberFormat.getInstance();
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);

        TCNFilter imagen = new TCNFilter();
        TCNCoupon cupon;
        List<TCNCoupon> lstCupones = new ArrayList<TCNCoupon>();
        String[] lstConjunciones = new String[4];
        String[] lstExchanges = new String[3];

        String strTCNMAXLONG = "";
        String cia = "", formaSerie = "";
        String taxes = "";
        boolean encontroData = false;
        long intFormaSerie = 0;
        if (!strTicket.equals("")) {
            strTicket = strTicket.trim().replace(" ", "").replace(" ", "");
            cia = strTicket.substring(0, 3);
            formaSerie = strTicket.substring(3, 13);
            intFormaSerie = Long.parseLong(formaSerie);
        }
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0077(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt.setString(3, formaSerie);
            cstmt.setString(4, cia);
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                encontroData = true;
                strTCNMAXLONG = Functions.fillString(rs01.getString("TCNMAXLONG"), 358);

                switch (Integer.parseInt(rs01.getString("RCID").trim())) {

                    case 1:
                        imagen.strIssuedBy = rs01.getString("CIA").trim();
                        imagen.strPassBagg = strTCNMAXLONG.substring(0, 4);
                        imagen.strDatePlaceIssue = strTCNMAXLONG.substring(114, 122);
                        imagen.strAgentNumber = strTCNMAXLONG.substring(123, 131);
                        imagen.strBooking = strTCNMAXLONG.substring(49, 62);
                        imagen.strPassenger = strTCNMAXLONG.substring(65, 114);
                        imagen.strNumTkt = rs01.getString("TDNR").trim();

                        // <editor-fold defaultstate="collapsed" desc="Armando Conjunciones">
                        //**************** Hallando las Conjunciones **************************************************
                        int posicion = Integer.parseInt(strTCNMAXLONG.substring(12, 14).replace(" ", "0"));
                        int ttlConjun = Integer.parseInt(strTCNMAXLONG.substring(14, 16).replace(" ", "0"));
                        //Asumiendo q vienen solo 4 conjunciones
                        switch (ttlConjun) {
                            case 2:
                                switch (posicion) {
                                    case 1:
                                        imagen.strConjTkts = formaSerie.concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                        lstConjunciones[0] = cia + formaSerie;
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie + 1);
                                        break;
                                    case 2:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(formaSerie);
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[1] = cia + formaSerie;
                                }
                                break;
                            case 3:
                                switch (posicion) {
                                    case 1:
                                        imagen.strConjTkts = formaSerie.concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10));
                                        lstConjunciones[0] = cia + formaSerie;
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie + 1);
                                        lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 2);
                                        break;
                                    case 2:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(formaSerie).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[1] = cia + formaSerie;
                                        lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 1);
                                        break;
                                    case 3:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 2).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(formaSerie);
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 2);
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[2] = cia + formaSerie;
                                }
                                break;
                            case 4:
                                switch (posicion) {
                                    case 1:
                                        imagen.strConjTkts = formaSerie.concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 3).substring(8, 10));
                                        lstConjunciones[0] = cia + formaSerie;
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie + 1);
                                        lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 2);
                                        lstConjunciones[3] = cia + String.valueOf(intFormaSerie + 3);
                                        break;
                                    case 2:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(formaSerie).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10));
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[1] = cia + formaSerie;
                                        lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 1);
                                        lstConjunciones[3] = cia + String.valueOf(intFormaSerie + 2);
                                        break;
                                    case 3:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 2).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(formaSerie).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 2);
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[2] = cia + formaSerie;
                                        lstConjunciones[3] = cia + String.valueOf(intFormaSerie + 1);
                                        break;
                                    case 4:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 3).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 2).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(formaSerie);
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 3);
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie - 2);
                                        lstConjunciones[2] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[3] = cia + formaSerie;
                                }


                        }
                        imagen.lstConjunciones = lstConjunciones;
                        //************************************************************************************************
                        //</editor-fold>
                        break;

                    case 3:
                        imagen.strOrigDestin = strTCNMAXLONG.substring(10, 24);
                        imagen.strEndorsRest = strTCNMAXLONG.substring(204, 351);
                        imagen.strTourCode = strTCNMAXLONG.substring(105, 120);
                        imagen.strFare = strTCNMAXLONG.substring(39, 50);
                        imagen.strEquivFare = strTCNMAXLONG.substring(50, 61);
                        imagen.strTax01 = strTCNMAXLONG.substring(61, 72);
                        imagen.strTax02 = strTCNMAXLONG.substring(72, 83);
                        imagen.strTax03 = strTCNMAXLONG.substring(83, 94);
                        imagen.strTotal = strTCNMAXLONG.substring(94, 105);
                        imagen.strOrigIssue = strTCNMAXLONG.substring(172, 204);
                        break;

                    case 4:
                        taxes = taxes.concat(strTCNMAXLONG.trim() + "\n" + "***************************************");
                        break;

                    case 5:
                        imagen.strItinerario = strTCNMAXLONG;
                        break;

                    case 7:
                        imagen.strFormPay = strTCNMAXLONG.substring(0, 10).concat(strTCNMAXLONG.substring(123, 133));
                        // ***  Hallando los Exchanged *******************
                        String strIssue1 = "",
                         strIssue2 = "";
                        if (strTCNMAXLONG.contains("EX")) {
                            strIssue1 = imagen.strOrigIssue.substring(0, 13);
                            if (strIssue1.trim().equals("")) {
                                strIssue1 = strTCNMAXLONG.substring(strTCNMAXLONG.indexOf("EX") + 2, strTCNMAXLONG.indexOf("EX") + 36);
                            }
                            strIssue2 = strTCNMAXLONG.substring(144, 157);
                            if (!strIssue1.trim().startsWith("139")) {
                                strIssue1 = strTCNMAXLONG.substring(144, 157);
                                strIssue2 = "";
                            }
                            if (!strIssue2.trim().startsWith("139")) {
                                strIssue2 = "";
                            }

                        }
                        // ***********************************************
                        imagen.strIssueExc1 = strIssue1;
                        imagen.strIssueExc2 = strIssue2;
                        lstExchanges[0] = cia + formaSerie;
                        lstExchanges[1] = strIssue1;
                        lstExchanges[2] = strIssue2;
                        imagen.lstExchanges = lstExchanges;
                        break;

                    case 8:
                        imagen.strFareCal = strTCNMAXLONG.substring(2);

                }
            }
            imagen.strTotalTaxes = taxes.trim();

            if (!encontroData) {
                imagen.msgError = "Record not found.";
            } else {
                //Guardando Detalle ============================================
                String itinerario = Functions.fillString(imagen.strItinerario, 360);
                int p = 0;

                for (int i = 0; i < 4; i++) {
                    cupon = new TCNCoupon();
                    cupon.strCPN = itinerario.substring(p, p + 1);
                    cupon.strXO = itinerario.substring(p + 2, p + 3);
                    cupon.strFROM = itinerario.substring(p + 3, p + 8);
                    cupon.strTO = itinerario.substring(p + 8, p + 13);
                    if (hmAeropuertos.containsKey(cupon.strFROM.trim().toUpperCase())) {
                        cupon.strDescFROM = hmAeropuertos.get(cupon.strFROM.trim().toUpperCase()).toString();
                    }
                    if (hmAeropuertos.containsKey(cupon.strTO.trim().toUpperCase())) {
                        cupon.strDescTO = hmAeropuertos.get(cupon.strTO.trim().toUpperCase()).toString();
                    }
                    cupon.strCR = itinerario.substring(p + 17, p + 21);
                    cupon.strFLIGHT = itinerario.substring(p + 26, p + 31);
                    cupon.strCLASS = itinerario.substring(p + 31, p + 33);
                    cupon.strDATE = itinerario.substring(p + 35, p + 40);
                    cupon.strTIME = itinerario.substring(p + 50, p + 55);
                    cupon.strFAREBASIS = itinerario.substring(p + 65, p + 80);
                    cupon.strNVB = itinerario.substring(p + 40, p + 45);
                    cupon.strNVA = itinerario.substring(p + 45, p + 50);
                    cupon.strST = itinerario.substring(p + 60, p + 62);
                    lstCupones.add(cupon);
                    p = p + 89;
                }
                imagen.lstCupones = lstCupones;
                // =============================================================
            }

        } catch (Exception e) {
            e.getMessage();
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

        return imagen;
    }
    
    public List<A729> loadPX164SQP00476(A020Filter filter) throws SQLException, Exception {

        //NOTA: MODIFICAR EL PROCEDURE PORQUE SÓLO TRAE LOS PRIMEROS 4 TAXES
        List<A729> lstTaxes = new ArrayList<A729>();
        A729 tax;
        //int cantTaxes = 0;
        //Para comprobar que taxes no se repitan (debido al nombre)
        HashMap<String, String> hmTaxes = new HashMap<String, String>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00476(?,?,?,?,?)}";
        Connection cnx = null;
        try {

            //==================================================================
            String strNroprt = "";
            /* if (filter.A020NROPRT.trim().length() == 0) {
             strNroprt = filter.strTicket.trim().substring(3, 13);
             } else if (filter.A020NROPRT.trim().length() == 9) {
             strNroprt = "0" + filter.A020NROPRT.trim();
             } else {
             strNroprt = filter.A020NROPRT.trim();
             }*/
            //==================================================================
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(5, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strTicket.trim().substring(0, 3));
            cstmt.setString(3, filter.A020KEY.trim());//strNroprt SIN CUPON
            cstmt.setString(4, "0");//CUPON
            cstmt.setInt(5, 0);
            cstmt.execute();

            //cantTaxes = cstmt.getInt(5);

            rst = cstmt.getResultSet();

            while (rst.next()) {

                tax = new A729();
                tax.A729CODTAX = rst.getString("A729CODTAX").trim();
                tax.A729TAXRES = rst.getDouble("A729TAXRES");
                tax.A729MDARES = rst.getString("A729MDARES").trim();
                tax.strNombre = rst.getString("A1202TNAME").trim();
                tax.A729VALTAX = rst.getDouble("A729VALTAX");

                if (!hmTaxes.containsKey(rst.getString("A729CODTAX").trim())) {
                    lstTaxes.add(tax);
                    hmTaxes.put(rst.getString("A729CODTAX").trim(), rst.getString("A729CODTAX").trim());
                }
            }

            try {
                rst.close();
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

        return lstTaxes;
    }
    
    private void setClose() {
        
        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
