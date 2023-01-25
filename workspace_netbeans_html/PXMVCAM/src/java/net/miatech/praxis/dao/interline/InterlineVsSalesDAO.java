package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.interline.filter.SFI020Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author claudia
 */
public class InterlineVsSalesDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<SFI020Filter> loadPX209SQP03289(SFI020Filter filter) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;
        long QTYTKTHS = 0, QTYTKTLS = 0, QTYTKTHE = 0, QTYTKTLE = 0;
        double VALORSHS = 0, VALORSLS = 0, VALORSHE = 0, VALORSLE = 0;
        double GROSSIHS = 0, GROSSILS = 0, GROSSIHE = 0, GROSSILE = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        //</editor-fold>

        /*if (!filter.BDAIR.trim().equals("")) {
         filter.BDAIR = Functions.fillZeros(4, filter.BDAIR.trim());
         }*/
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03289(?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.trim() + filter.monthFrom.trim());
            cstmt01.setString(3, filter.yearTo.trim() + filter.monthTo.trim());
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.PERNUM.trim());
            cstmt01.setString(6, filter.BDAIR.trim());
            cstmt01.setString(7, filter.SOURCOD.trim());
            cstmt01.setString(8, filter.IN_FAREBASIS.trim());
            cstmt01.setString(9, filter.IN_IATA.trim());
            cstmt01.setString(10, filter.IN_FUENTE.trim());
            cstmt01.setString(11, filter.IN_CANAL.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QTYTKTHS = rs01.getLong("QTYTKTHS");
                QTYTKTLS = rs01.getLong("QTYTKTLS");
                QTYTKTHE = rs01.getLong("QTYTKTHE");
                QTYTKTLE = rs01.getLong("QTYTKTLE");
                VALORSHS = rs01.getDouble("VALORSHS");
                VALORSLS = rs01.getDouble("VALORSLS");
                VALORSHE = rs01.getDouble("VALORSHE");
                VALORSLE = rs01.getDouble("VALORSLE");
                GROSSIHS = rs01.getDouble("GROSSIHS");
                GROSSILS = rs01.getDouble("GROSSILS");
                GROSSIHE = rs01.getDouble("GROSSIHE");
                GROSSILE = rs01.getDouble("GROSSILE");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new SFI020Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.BDAIR = filter.BDAIR;

                    objRtn.BDATE = rs01.getString("BDATE").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.BDATE);

                    objRtn.QTYTKT = rs01.getLong("QTYTKTHS") + rs01.getLong("QTYTKTLS") + rs01.getLong("QTYTKTHE") + rs01.getLong("QTYTKTLE");
                    objRtn.VALORS = rs01.getDouble("VALORSHS") + rs01.getDouble("VALORSLS") + rs01.getDouble("VALORSHE") + rs01.getDouble("VALORSLE");
                    objRtn.GROSSI = rs01.getDouble("GROSSIHS") + rs01.getDouble("GROSSILS") + rs01.getDouble("GROSSIHE") + rs01.getDouble("GROSSILE");
                    objRtn.DIFF = objRtn.VALORS - objRtn.GROSSI;

                    objRtn.QTYTKTHS = rs01.getLong("QTYTKTHS");
                    objRtn.QTYTKTLS = rs01.getLong("QTYTKTLS");
                    objRtn.QTYTKTHE = rs01.getLong("QTYTKTHE");
                    objRtn.QTYTKTLE = rs01.getLong("QTYTKTLE");
                    objRtn.VALORSHS = rs01.getDouble("VALORSHS");
                    objRtn.VALORSLS = rs01.getDouble("VALORSLS");
                    objRtn.VALORSHE = rs01.getDouble("VALORSHE");
                    objRtn.VALORSLE = rs01.getDouble("VALORSLE");
                    objRtn.GROSSIHS = rs01.getDouble("GROSSIHS");
                    objRtn.GROSSILS = rs01.getDouble("GROSSILS");
                    objRtn.GROSSIHE = rs01.getDouble("GROSSIHE");
                    objRtn.GROSSILE = rs01.getDouble("GROSSILE");
                    objRtn.DIFFHS = rs01.getDouble("VALORSHS") - rs01.getDouble("GROSSIHS");
                    objRtn.DIFFLS = rs01.getDouble("VALORSLS") - rs01.getDouble("GROSSILS");
                    objRtn.DIFFHE = rs01.getDouble("VALORSHE") - rs01.getDouble("GROSSIHE");
                    objRtn.DIFFLE = rs01.getDouble("VALORSLE") - rs01.getDouble("GROSSILE");

                    objRtn.totQTYTKTHS = QTYTKTHS;
                    objRtn.totQTYTKTLS = QTYTKTLS;
                    objRtn.totQTYTKTHE = QTYTKTHE;
                    objRtn.totQTYTKTLE = QTYTKTLE;
                    objRtn.totVALORSHS = VALORSHS;
                    objRtn.totVALORSLS = VALORSLS;
                    objRtn.totVALORSHE = VALORSHE;
                    objRtn.totVALORSLE = VALORSLE;
                    objRtn.totGROSSIHS = GROSSIHS;
                    objRtn.totGROSSILS = GROSSILS;
                    objRtn.totGROSSIHE = GROSSIHE;
                    objRtn.totGROSSILE = GROSSILE;
                    objRtn.totDIFFHS = VALORSHS - GROSSIHS;
                    objRtn.totDIFFLS = VALORSLS - GROSSILS;
                    objRtn.totDIFFHE = VALORSHE - GROSSIHE;
                    objRtn.totDIFFLE = VALORSLE - GROSSILE;

                    objRtn.totQTYTKT = QTYTKTHS + QTYTKTLS + QTYTKTHE + QTYTKTLE;
                    objRtn.totVALORS = VALORSHS + VALORSLS + VALORSHE + VALORSLE;
                    objRtn.totGROSSI = GROSSIHS + GROSSILS + GROSSIHE + GROSSILE;
                    objRtn.totDIFF = objRtn.totVALORS - objRtn.totGROSSI;

                    lstRtn.add(objRtn);
                }
                rs01.close();
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.out.print(e.getMessage());
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
    
    public List<SFI020Filter> loadPX209SQP03290(SFI020Filter filter) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;
        long QTYTKTHS = 0, QTYTKTLS = 0, QTYTKTHE = 0, QTYTKTLE = 0;
        double VALORSHS = 0, VALORSLS = 0, VALORSHE = 0, VALORSLE = 0;
        double GROSSIHS = 0, GROSSILS = 0, GROSSIHE = 0, GROSSILE = 0;
        String strTitulo = "Billing Date : " + filter.strFormatDate;

        /*if (!filter.BDAIR.trim().equals("")) {
         filter.BDAIR = Functions.fillZeros(4, filter.BDAIR.trim());
         }*/
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03290(?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE.trim());
            cstmt01.setString(3, filter.BDAIR.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QTYTKTHS = rs01.getLong("QTYTKTHS");
                QTYTKTLS = rs01.getLong("QTYTKTLS");
                QTYTKTHE = rs01.getLong("QTYTKTHE");
                QTYTKTLE = rs01.getLong("QTYTKTLE");
                VALORSHS = rs01.getDouble("VALORSHS");
                VALORSLS = rs01.getDouble("VALORSLS");
                VALORSHE = rs01.getDouble("VALORSHE");
                VALORSLE = rs01.getDouble("VALORSLE");
                GROSSIHS = rs01.getDouble("GROSSIHS");
                GROSSILS = rs01.getDouble("GROSSILS");
                GROSSIHE = rs01.getDouble("GROSSIHE");
                GROSSILE = rs01.getDouble("GROSSILE");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new SFI020Filter();
                    objRtn.BDATE = filter.BDATE;

                    objRtn.BDAIR = rs01.getString("CCIA").trim();
                    objRtn.strOrigVta = rs01.getString("DES_AIR").trim();
                    objRtn.strTitulo = strTitulo;

                    objRtn.QTYTKT = rs01.getLong("QTYTKTHS") + rs01.getLong("QTYTKTLS") + rs01.getLong("QTYTKTHE") + rs01.getLong("QTYTKTLE");
                    objRtn.VALORS = rs01.getDouble("VALORSHS") + rs01.getDouble("VALORSLS") + rs01.getDouble("VALORSHE") + rs01.getDouble("VALORSLE");
                    objRtn.GROSSI = rs01.getDouble("GROSSIHS") + rs01.getDouble("GROSSILS") + rs01.getDouble("GROSSIHE") + rs01.getDouble("GROSSILE");
                    objRtn.DIFF = objRtn.VALORS - objRtn.GROSSI;

                    objRtn.QTYTKTHS = rs01.getLong("QTYTKTHS");
                    objRtn.QTYTKTLS = rs01.getLong("QTYTKTLS");
                    objRtn.QTYTKTHE = rs01.getLong("QTYTKTHE");
                    objRtn.QTYTKTLE = rs01.getLong("QTYTKTLE");
                    objRtn.VALORSHS = rs01.getDouble("VALORSHS");
                    objRtn.VALORSLS = rs01.getDouble("VALORSLS");
                    objRtn.VALORSHE = rs01.getDouble("VALORSHE");
                    objRtn.VALORSLE = rs01.getDouble("VALORSLE");
                    objRtn.GROSSIHS = rs01.getDouble("GROSSIHS");
                    objRtn.GROSSILS = rs01.getDouble("GROSSILS");
                    objRtn.GROSSIHE = rs01.getDouble("GROSSIHE");
                    objRtn.GROSSILE = rs01.getDouble("GROSSILE");
                    objRtn.DIFFHS = rs01.getDouble("VALORSHS") - rs01.getDouble("GROSSIHS");
                    objRtn.DIFFLS = rs01.getDouble("VALORSLS") - rs01.getDouble("GROSSILS");
                    objRtn.DIFFHE = rs01.getDouble("VALORSHE") - rs01.getDouble("GROSSIHE");
                    objRtn.DIFFLE = rs01.getDouble("VALORSLE") - rs01.getDouble("GROSSILE");

                    objRtn.totQTYTKTHS = QTYTKTHS;
                    objRtn.totQTYTKTLS = QTYTKTLS;
                    objRtn.totQTYTKTHE = QTYTKTHE;
                    objRtn.totQTYTKTLE = QTYTKTLE;
                    objRtn.totVALORSHS = VALORSHS;
                    objRtn.totVALORSLS = VALORSLS;
                    objRtn.totVALORSHE = VALORSHE;
                    objRtn.totVALORSLE = VALORSLE;
                    objRtn.totGROSSIHS = GROSSIHS;
                    objRtn.totGROSSILS = GROSSILS;
                    objRtn.totGROSSIHE = GROSSIHE;
                    objRtn.totGROSSILE = GROSSILE;
                    objRtn.totDIFFHS = VALORSHS - GROSSIHS;
                    objRtn.totDIFFLS = VALORSLS - GROSSILS;
                    objRtn.totDIFFHE = VALORSHE - GROSSIHE;
                    objRtn.totDIFFLE = VALORSLE - GROSSILE;

                    objRtn.totQTYTKT = QTYTKTHS + QTYTKTLS + QTYTKTHE + QTYTKTLE;
                    objRtn.totVALORS = VALORSHS + VALORSLS + VALORSHE + VALORSLE;
                    objRtn.totGROSSI = GROSSIHS + GROSSILS + GROSSIHE + GROSSILE;
                    objRtn.totDIFF = objRtn.totVALORS - objRtn.totGROSSI;

                    lstRtn.add(objRtn);
                }
                rs01.close();
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.out.print(e.getMessage());
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

    public List<SFI020Filter> loadPX209SQP03301(SFI020Filter filter) throws SQLException, Exception, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;
        //double totGROSS = 0, totVALOR = 0, totDIFF = 0;
        //String BDATE = filter.BDATE.trim().substring(2) + "00";
        String strTitulo = filter.strTitulo + " / Airline : " + filter.BDAIR + " " + filter.strOrigVta;

        if (filter.IN_TRNCU.trim().equals("EXCH")) {
            strTitulo += " / Type : Exchange";
        } else {
            strTitulo += " / Type : Sales";
        }

        if (filter.IN_FVALUE.trim().equals("H")) {
            strTitulo += " / Value : High";
        } else {
            strTitulo += " / Value : Low";
        }

        /*if (!filter.BDAIR.trim().equals("")) {
         filter.BDAIR = Functions.fillZeros(4, filter.BDAIR.trim());
         }*/
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03301(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);
            cstmt01.registerOutParameter(18, Types.DOUBLE);
            cstmt01.registerOutParameter(19, Types.DOUBLE);
            cstmt01.registerOutParameter(20, Types.DOUBLE);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE.trim());
            cstmt01.setString(3, filter.PERNUM.trim());
            cstmt01.setString(4, filter.BDAIR.trim());
            cstmt01.setString(5, filter.SOURCOD.trim());
            cstmt01.setString(6, filter.IN_FAREBASIS.trim());
            cstmt01.setString(7, filter.IN_IATA.trim());
            cstmt01.setString(8, filter.IN_FUENTE.trim());
            cstmt01.setString(9, filter.IN_CANAL.trim());
            cstmt01.setString(10, filter.IN_TRNCU.trim());
            cstmt01.setString(11, filter.IN_FVALUE.trim());
            cstmt01.setString(12, filter.TYPE);
            cstmt01.setString(13, filter.IN_ORDER);

            cstmt01.setInt(14, filter.page.PAGNUM);
            cstmt01.setInt(15, filter.page.PAGROW);
            cstmt01.setInt(16, filter.page.TOTPAG);
            cstmt01.setInt(17, filter.page.TOTROW);

            if (filter.page.TOTPAG == -1) {
                cstmt01.setDouble(18, 0);
                cstmt01.setDouble(19, 0);
                cstmt01.setDouble(20, 0);
            } else {
                cstmt01.setDouble(18, filter.totGROSSI);
                cstmt01.setDouble(19, filter.totVALORS);
                cstmt01.setDouble(20, filter.totDIFF);
            }

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(14);
            filter.page.PAGROW = cstmt01.getInt(15);
            filter.page.TOTPAG = cstmt01.getInt(16);
            filter.page.TOTROW = cstmt01.getInt(17);
            filter.totGROSSI = cstmt01.getDouble(18);
            filter.totVALORS = cstmt01.getDouble(19);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                objRtn = new SFI020Filter();
                objRtn.strTitulo = strTitulo;
                objRtn.BDATE = filter.BDATE.trim();
                objRtn.PERNUM = filter.PERNUM.trim();
                objRtn.BDAIR = filter.BDAIR.trim();
                objRtn.SOURCOD = filter.SOURCOD.trim();
                objRtn.IN_FAREBASIS = filter.IN_FAREBASIS.trim();
                objRtn.IN_IATA = filter.IN_IATA.trim();
                objRtn.IN_FUENTE = filter.IN_FUENTE.trim();
                objRtn.IN_CANAL = filter.IN_CANAL.trim();
                objRtn.IN_TRNCU = filter.IN_TRNCU.trim();
                objRtn.IN_FVALUE = filter.IN_FVALUE.trim();
                objRtn.TYPE = filter.TYPE;
                objRtn.IN_ORDER = filter.IN_ORDER;

                objRtn.RN = rs01.getLong("RN");
                objRtn.BDATE = rs01.getString("BDATE").trim();
                objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                objRtn.PERNUM = rs01.getString("PERNUM").trim();
                objRtn.BDAIR = rs01.getString("BDAIR").trim();
                objRtn.BAIR = rs01.getString("BAIR").trim();
                objRtn.BNUMBER = rs01.getString("AIRL");
                objRtn.SOURCOD = rs01.getString("SOURCOD").trim();
                objRtn.TTRAN = "IB";

                objRtn.AIRNUM = rs01.getString("AIRNUM").trim();
                objRtn.CPNNUM = rs01.getString("CPNNUM").trim();
                objRtn.TKTNUM = rs01.getString("TKTNUM").trim();
                objRtn.TKT = objRtn.AIRNUM + " " + objRtn.TKTNUM + " " + objRtn.CPNNUM;
                objRtn.FLIGHTN = rs01.getString("FLIGHTN").trim();
                objRtn.FLIGHTD = rs01.getString("FLIGHTD").trim();
                objRtn.GROSSSG = rs01.getString("GROSSSG").trim();

                /*if (rs01.getString("GROSSSG").trim().equals("M")) {
                 objRtn.GROSS = (rs01.getDouble("GROSS")) * -1;
                 } else {
                 objRtn.GROSS = rs01.getDouble("GROSS");
                 }*/
                objRtn.GROSS = rs01.getDouble("GROSS");

                objRtn.ACURREN = rs01.getString("ACURREN");
                objRtn.FROMCPN = rs01.getString("FROMCPN");
                objRtn.TOCPN = rs01.getString("TOCPN");

                if (rs01.getString("A720ORIG") != null
                        && !rs01.getString("A720ORIG").trim().equals("-")) {

                    objRtn.strOrigVta = rs01.getString("A720ORIG").trim();
                    objRtn.strFecVta = rs01.getString("A720FECVTA").trim();

                    objRtn.dblValorVta = rs01.getDouble("VALOR");
                    objRtn.AGRINDV = rs01.getString("INDPR");
                    objRtn.FAREBASIS = rs01.getString("FAREBASIS").trim();
                    objRtn.CLASE = rs01.getString("CLASE");
                    //objRtn.FUENTE = rs01.getString("A720ORIG");
                    //objRtn.CANAL = rs01.getString("A1530SFUEN");
                    objRtn.IATA = rs01.getString("A720AGENTE");

                }
                objRtn.AIROWUSE = rs01.getString("MONED");
                objRtn.OTHCOMPER = rs01.getDouble("DIFF");

                objRtn.totGROSSI = filter.totGROSSI;
                objRtn.totVALORS = filter.totVALORS;
                objRtn.totDIFF = filter.totDIFF;

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            System.out.print(e.getMessage());
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

    
    
    
    
    

    public List<SFI020Filter> loadPX209SQP00166(SFI020Filter filter) throws SQLException {

        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        //</editor-fold>

        if (!filter.BDAIR.trim().equals("")) {
            filter.BDAIR = Functions.fillZeros(4, filter.BDAIR.trim());
        }

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00166_2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(12, Types.INTEGER);
            cs.registerOutParameter(13, Types.INTEGER);
            cs.registerOutParameter(14, Types.INTEGER);
            cs.registerOutParameter(15, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.yearFrom.trim().substring(2, 4) + filter.monthFrom.trim());
            cs.setString(3, filter.yearTo.trim().substring(2, 4) + filter.monthTo.trim());
            cs.setString(4, Functions.getFechaActual().substring(1, 6));
            cs.setString(5, filter.PERNUM.trim());
            cs.setString(6, filter.BDAIR.trim());
            cs.setString(7, filter.SOURCOD.trim());
            cs.setString(8, filter.IN_FAREBASIS.trim());
            cs.setString(9, filter.IN_IATA.trim());
            cs.setString(10, filter.IN_FUENTE.trim());
            cs.setString(11, filter.IN_CANAL.trim());

            cs.setInt(12, filter.page.PAGNUM);
            cs.setInt(13, filter.page.PAGROW);
            cs.setInt(14, filter.page.TOTPAG);
            cs.setInt(15, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(12);
            filter.page.PAGROW = cs.getInt(13);
            filter.page.TOTPAG = cs.getInt(14);
            filter.page.TOTROW = cs.getInt(15);

            rst = cs.getResultSet();

            while (rst.next()) {

                objRtn = new SFI020Filter();
                objRtn.yearFrom = filter.yearFrom;
                objRtn.monthFrom = filter.monthFrom;
                objRtn.yearTo = filter.yearTo;
                objRtn.monthTo = filter.monthTo;

                objRtn.RN = rst.getLong("RN");
                objRtn.BDATE = rst.getString("BDATE").trim();
                objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                objRtn.PERNUM = rst.getString("PERNUM").trim();
                objRtn.BDAIR = rst.getString("BDAIR").trim();
                objRtn.BAIR = rst.getString("BAIR").trim();
                objRtn.BNUMBER = rst.getString("AIRL");
                objRtn.SOURCOD = rst.getString("SOURCOD").trim();
                objRtn.TTRAN = "IB";

                objRtn.AIRNUM = rst.getString("AIRNUM").trim();
                objRtn.CPNNUM = rst.getString("CPNNUM").trim();
                objRtn.TKTNUM = rst.getString("TKTNUM").trim();
                objRtn.TKT = objRtn.AIRNUM + " " + objRtn.TKTNUM + " " + objRtn.CPNNUM;
                objRtn.FLIGHTN = rst.getString("FLIGHTN").trim();
                objRtn.FLIGHTD = rst.getString("FLIGHTD").trim();
                objRtn.GROSSSG = rst.getString("GROSSSG").trim();
                if (rst.getString("GROSSSG").trim().equals("M")) {
                    objRtn.GROSS = (rst.getDouble("GROSS")) * -1;
                } else {
                    objRtn.GROSS = rst.getDouble("GROSS");
                }

                objRtn.ACURREN = rst.getString("ACURREN");
                objRtn.FROMCPN = rst.getString("FROMCPN");
                objRtn.TOCPN = rst.getString("TOCPN");

                if (rst.getString("A720ORIG") != null
                        && !rst.getString("A720ORIG").trim().equals("-")) {
                    objRtn.strOrigVta = rst.getString("A720ORIG").trim();
                    objRtn.strFecVta = rst.getString("A720FECVTA").trim();

                    objRtn.dblValorVta = rst.getDouble("VALOR");
                    objRtn.AGRINDV = rst.getString("INDPR");
                    objRtn.FAREBASIS = rst.getString("FAREBASIS").trim();
                    objRtn.CLASE = rst.getString("CLASE");
                    objRtn.FUENTE = rst.getString("A1530FUENT");
                    objRtn.CANAL = rst.getString("A1530SFUEN");
                    objRtn.IATA = rst.getString("A1530AGENT");

                }
                objRtn.AIROWUSE = rst.getString("MONED");
                objRtn.OTHCOMPER = rst.getDouble("DIFF");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            // e.getMessage();
            System.out.print(e.getMessage());
        } finally {
            setClose();
        }

        return lstRtn;
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
