/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.interline;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.interline.LoadInterlineDAO.pasarGarbageCollector;
import net.miatech.praxis.interline.SFI010;
import net.miatech.praxis.interline.SFI021;
import net.miatech.praxis.interline.SFI022;
import net.miatech.praxis.interline.SFI030;
import net.miatech.praxis.interline.SFI031;
import net.miatech.praxis.interline.SFI032;
import net.miatech.praxis.interline.SFI033;
import net.miatech.praxis.interline.SFI041;
import net.miatech.praxis.interline.filter.SFI010Filter;
import net.miatech.praxis.interline.filter.SFI020Filter;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.SFI022Filter;
import net.miatech.praxis.interline.filter.SFI030Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class PassengerInvoicesIpDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public PassengerInvoicesIpDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public PassengerInvoicesIpDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SFI040Filter> loadPX190S01SFI040(SFI040Filter filter) throws SQLException, Exception {
        List<SFI040Filter> lstRtn = new ArrayList<SFI040Filter>(0);
        SFI040Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, TNETOCAR_LY = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI040(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BAIR);

            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += (rs01.getInt("TGROSSRT"));
                totTISC += rs01.getDouble("TISCRT");
                totTTAX += rs01.getDouble("TTAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("TUATPRT");
                totTNET += rs01.getDouble("TNETRT");
                totTVAT += rs01.getDouble("TOHCOMRT");
                TNETOCAR_LY += rs01.getDouble("TVATRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI040Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.TGROSS = (rs01.getDouble("TGROSSRT"));
                    objRtn.TISC = (rs01.getDouble("TISCRT"));
                    objRtn.TTAX = (rs01.getDouble("TTAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.TUATP = (rs01.getDouble("TUATPRT"));
                    objRtn.TNET = (rs01.getDouble("TNETRT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOMRT"));
                    objRtn.TNETOCAR = (rs01.getDouble("TVATRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.TNETOCAR_LY = TNETOCAR_LY;
                    objRtn.BAIR = filter.BAIR;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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

    public List<SFI030Filter> loadPX190SSQP766(SFI030Filter filter) throws SQLException, Exception {
        List<SFI030Filter> lstRtn = new ArrayList<>(0);
        SFI030Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00766(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BAIR);
            cstmt01.setString(8, filter.SOURCOD);

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += (rs01.getInt("TGROSSRT"));
                totTISC += rs01.getDouble("TISCRT");
                totTTAX += rs01.getDouble("TTAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("TUATPRT");
                totTNET += rs01.getDouble("TNETRT");
                totTVAT += rs01.getDouble("TOHCOMRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI030Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.TGROSS = (rs01.getDouble("TGROSSRT"));
                    objRtn.TISC = (rs01.getDouble("TISCRT"));
                    objRtn.TTAX = (rs01.getDouble("TTAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.TUATP = (rs01.getDouble("TUATPRT"));
                    objRtn.TNET = (rs01.getDouble("TNETRT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOMRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.BAIR = filter.BAIR;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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

    public List<SFI030Filter> loadPX190S01SFI030(SFI040Filter filter) throws SQLException, Exception {
        List<SFI030Filter> lstRtn = new ArrayList<SFI030Filter>(0);
        SFI030Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, TNETOCAR_LY = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI030(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BAIR);
            cstmt01.setString(8, filter.BDATE);

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += rs01.getDouble("TGROSSRT");
                totTISC += rs01.getDouble("TISCRT");
                totTTAX += rs01.getDouble("TTAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("TUATPRT");
                totTNET += rs01.getDouble("TNETRT");
                totTVAT += rs01.getDouble("TOHCOMRT");
                TNETOCAR_LY += rs01.getDouble("TVATRT");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI030Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.SOURCOD = rs01.getString("SOURCOD");
                    objRtn.IN_FECHA_FROM = rs01.getString("DES_SOURCOD");
                    objRtn.TGROSS = (rs01.getDouble("TGROSSRT"));
                    objRtn.TISC = (rs01.getDouble("TISCRT"));
                    objRtn.TTAX = (rs01.getDouble("TTAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.TUATP = (rs01.getDouble("TUATPRT"));
                    objRtn.TNET = (rs01.getDouble("TNETRT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOMRT"));
                    objRtn.TNETOCAR = (rs01.getDouble("TVATRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.TNETOCAR_LY = TNETOCAR_LY;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BAIR = filter.BAIR;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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

        return lstRtn;
    }

    public List<SFI020Filter> loadPX190S02SFI020(SFI030Filter filter) throws SQLException, Exception {
        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, TOTHCD = 0;
        double peruatp = 0, perisc = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S02SFI020(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BAIR);
            cstmt01.setString(8, filter.BDATE);
            cstmt01.setString(9, filter.SOURCOD);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += rs01.getDouble("GROSSRT");
                totTISC += rs01.getDouble("ISCAMTRT");
                totTTAX += rs01.getDouble("TAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("UATPAMTRT");
                totTNET += rs01.getDouble("CPNTAMRT");
                totTVAT += rs01.getDouble("OTHCOMAMRT");
                TOTHCD += rs01.getDouble("VATAMTRT");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI020Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BAIR = rs01.getString("BAIR");
                    objRtn.DES_BAIR = rs01.getString("DES_BAIR");
                    objRtn.GROSS = (rs01.getDouble("GROSSRT"));
                    objRtn.ISCAMT = (rs01.getDouble("ISCAMTRT"));
                    objRtn.TAX = (rs01.getDouble("TAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.UATPAMT = (rs01.getDouble("UATPAMTRT"));
                    objRtn.CPNTAM = (rs01.getDouble("CPNTAMRT"));
                    objRtn.OTHCOMAM = (rs01.getDouble("OTHCOMAMRT"));
                    objRtn.UATPPER = (rs01.getDouble("UATPPERRT"));
                    objRtn.ISCCH = (rs01.getDouble("ISCCHRT"));
                    objRtn.VATAMT = (rs01.getDouble("VATAMTRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;//OTHER
                    objRtn.TOTHCD = TOTHCD; //VAT
                    objRtn.FROMTO = objRtn.FROMCPN + "-" + objRtn.TOCPN;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI021Filter> loadPX190S02SFI021(SFI030Filter filter) throws SQLException, Exception {
        List<SFI021Filter> lstRtn = new ArrayList<>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        double totTGROSSA = 0, totTISCA = 0, totTTAXA = 0, totHFEEAMA = 0, totTUATPA = 0, totTNETA = 0, totTVATA = 0;
        double totTGROSSD = 0, totTISCD = 0, totTTAXD = 0, totHFEEAMD = 0, totTUATPD = 0, totTNETD = 0, totTVATD = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S02SFI021_5(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BAIR);
            cstmt01.setString(8, filter.BDATE);
            cstmt01.setString(9, filter.SOURCOD);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += rs01.getDouble("TGROSSBRT");
                totTISC += rs01.getDouble("TISCALRT");
                totTTAX += rs01.getDouble("TTAXBRT");
                totHFEEAM += rs01.getDouble("THDFALRT");
                totTUATP += rs01.getDouble("TUATPALRT");
                totTNET += rs01.getDouble("TNETRRT");
                totTGROSSA += rs01.getDouble("TGROSSART");
                totTISCA += rs01.getDouble("TISCART");
                totTTAXA += rs01.getDouble("TTAXART");
                totHFEEAMA += rs01.getDouble("THDFART");
                totTUATPA += rs01.getDouble("TUATPART");
                totTGROSSD += rs01.getDouble("TGROSSDRT");
                totTISCD += rs01.getDouble("TISCDRT");
                totTTAXD += rs01.getDouble("TTAXDRT");
                totHFEEAMD += rs01.getDouble("THDFDRT");
                totTUATPD += rs01.getDouble("TUATPDRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {

                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BAIR = rs01.getString("BAIR");
                    objRtn.DES_BAIR = rs01.getString("DES_BAIR");
                    objRtn.TGROSSB = (rs01.getDouble("TGROSSBRT"));
                    objRtn.TISCAL = (rs01.getDouble("TISCALRT"));
                    objRtn.TTAXB = (rs01.getDouble("TTAXBRT"));
                    objRtn.THDFAL = (rs01.getDouble("THDFALRT"));
                    objRtn.TUATPAL = (rs01.getDouble("TUATPALRT"));
                    objRtn.TNETR = (rs01.getDouble("TNETRRT"));
                    objRtn.TGROSSA = (rs01.getDouble("TGROSSART"));
                    objRtn.TISCA = (rs01.getDouble("TISCART"));
                    objRtn.TTAXA = (rs01.getDouble("TTAXART"));
                    objRtn.THDFA = (rs01.getDouble("THDFART"));
                    objRtn.TUATPA = (rs01.getDouble("TUATPART"));
                    objRtn.TGROSSD = (rs01.getDouble("TGROSSDRT"));
                    objRtn.TISCD = (rs01.getDouble("TISCDRT"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXDRT"));
                    objRtn.THDFD = (rs01.getDouble("THDFDRT"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPDRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totHFEEAMA = totHFEEAMA;
                    objRtn.totTGROSSA = totTGROSSA;
                    objRtn.totTISCA = totTISCA;
                    objRtn.totTTAXA = totTTAXA;
                    objRtn.totTUATPA = totTUATPA;
                    objRtn.totHFEEAMD = totHFEEAMD;
                    objRtn.totTGROSSD = totTGROSSD;
                    objRtn.totTISCD = totTISCD;
                    objRtn.totTTAXD = totTTAXD;
                    objRtn.totTUATPD = totTUATPD;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI022Filter> loadPX190S02SFI022(SFI030Filter filter) throws SQLException, Exception {
        List<SFI022Filter> lstRtn = new ArrayList<>(0);
        SFI022Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S02SFI022_3(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BAIR);
            cstmt01.setString(8, filter.BDATE);
            cstmt01.setString(9, filter.SOURCOD);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += rs01.getDouble("TGROSSRT");
                totTISC += rs01.getDouble("TISCRT");
                totTTAX += rs01.getDouble("TTAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("TUATPRT");
                totTNET += rs01.getDouble("NETRT");
                totTVAT += rs01.getDouble("TOHCOMRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI022Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BAIR = rs01.getString("BAIR");
                    objRtn.DES_BAIR = rs01.getString("DES_BAIR");
                    objRtn.TGROSS = (rs01.getDouble("TGROSSRT"));
                    objRtn.TISC = (rs01.getDouble("TISCRT"));
                    objRtn.TTAX = (rs01.getDouble("TTAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.TUATP = (rs01.getDouble("TUATPRT"));
                    objRtn.NET = (rs01.getDouble("NETRT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOMRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI020Filter> loadPX190S01SFI020(SFI020Filter filter) throws SQLException, Exception {

        List<SFI020Filter> lstRtn = new ArrayList<>(0);
        SFI020Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI020(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
            cstmt01.setString(7, filter.VALDPMI);

            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totTGROSS += rs01.getDouble("GROSSRT");
                totTISC += rs01.getDouble("ISCAMTRT");
                totTTAX += rs01.getDouble("TAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("UATPAMTRT");
                totTNET += rs01.getDouble("CPNTAMRT");
                totTVAT += rs01.getDouble("OTHCOMAMRT");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI020Filter();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CPNNUM = rs01.getString("CPNNUM");
                    objRtn.TKTNUM = rs01.getString("TKTNUM");
                    objRtn.AIRNUM = rs01.getString("AIRNUM");
                    objRtn.TKT = objRtn.AIRNUM + " " + objRtn.TKTNUM + " " + objRtn.CPNNUM;
                    objRtn.FROMCPN = rs01.getString("FROMCPN");
                    if (rs01.getString("DES_FTE") != null) {
                        objRtn.DES_FTE = rs01.getString("DES_FTE");
                    } else {
                        if (rs01.getString("ORIG") != null) {
                            objRtn.DES_FTE = rs01.getString("ORIG");
                        } else {
                            objRtn.DES_FTE = "";
                        }
                    }

                    objRtn.TOCPN = rs01.getString("TOCPN");
                    objRtn.ACURREN = rs01.getString("ACURREN");
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.ETKTIND = rs01.getString("ETKTIND");
                    objRtn.FLIGHTD = rs01.getString("FLIGHTD");
                    objRtn.DES_SOURCOD = Functions.getMonthConvert3(objRtn.FLIGHTD);
                    objRtn.BAIR = filter.BAIR;
                    objRtn.VALDPMI = rs01.getString("VALDPMI");
                    objRtn.GROSS = (rs01.getDouble("GROSSRT"));
                    objRtn.ISCAMT = (rs01.getDouble("ISCAMTRT"));
                    objRtn.TAX = (rs01.getDouble("TAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.UATPAMT = (rs01.getDouble("UATPAMTRT"));
                    objRtn.CPNTAM = (rs01.getDouble("CPNTAMRT"));
                    objRtn.OTHCOMAM = (rs01.getDouble("OTHCOMAMRT"));
                    objRtn.OTHCOMPER = (rs01.getDouble("OTHCOMPERRT"));
                    objRtn.UATPPER = (rs01.getDouble("UATPPERRT"));
                    objRtn.ISCCH = (rs01.getDouble("ISCCHRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.FROMTO = objRtn.FROMCPN + "-" + objRtn.TOCPN;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.AccountingDate = Functions.getMonthConvert(rs01.getString("A1965FCONT"));
                    objRtn.AccountingID = rs01.getString("A1965IDCON");

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI021Filter> loadPX190S01SFI021(SFI021Filter filter) throws SQLException, Exception {
        List<SFI021Filter> lstRtn = new ArrayList<>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        double totTGROSSA = 0, totTISCA = 0, totTTAXA = 0, totHFEEAMA = 0, totTUATPA = 0, totTNETA = 0, totTVATA = 0;
        double totTGROSSD = 0, totTISCD = 0, totTTAXD = 0, totHFEEAMD = 0, totTUATPD = 0, totTNETD = 0, totTVATD = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI021_5(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totTGROSS += rs01.getDouble("TGROSSBRT");
                totTISC += rs01.getDouble("TISCALRT");
                totTTAX += rs01.getDouble("TTAXBRT");
                totHFEEAM += rs01.getDouble("THDFALRT");
                totTUATP += rs01.getDouble("TUATPALRT");
                totTNET += rs01.getDouble("TNETRRT");
                totTGROSSA += rs01.getDouble("TGROSSART");
                totTISCA += rs01.getDouble("TISCART");
                totTTAXA += rs01.getDouble("TTAXART");
                totHFEEAMA += rs01.getDouble("THDFART");
                totTUATPA += rs01.getDouble("TUATPART");
                totTGROSSD += rs01.getDouble("TGROSSDRT");
                totTISCD += rs01.getDouble("TISCDRT");
                totTTAXD += rs01.getDouble("TTAXDRT");
                totHFEEAMD += rs01.getDouble("THDFDRT");
                totTUATPD += rs01.getDouble("TUATPDRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021Filter();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.REJNUM = rs01.getString("REJNUM");
                    objRtn.BAIR = filter.BAIR;
                    objRtn.REASCOD = rs01.getString("REASCOD");
                    objRtn.TGROSSB = (rs01.getDouble("TGROSSBRT"));
                    objRtn.TISCAL = (rs01.getDouble("TISCALRT"));
                    objRtn.TTAXB = (rs01.getDouble("TTAXBRT"));
                    objRtn.THDFAL = (rs01.getDouble("THDFALRT"));
                    objRtn.TUATPAL = (rs01.getDouble("TUATPALRT"));
                    objRtn.TNETR = (rs01.getDouble("TNETRRT"));
                    objRtn.TGROSSA = (rs01.getDouble("TGROSSART"));
                    objRtn.TISCA = (rs01.getDouble("TISCART"));
                    objRtn.TTAXA = (rs01.getDouble("TTAXART"));
                    objRtn.THDFA = (rs01.getDouble("THDFART"));
                    objRtn.TUATPA = (rs01.getDouble("TUATPART"));
                    objRtn.TGROSSD = (rs01.getDouble("TGROSSDRT"));
                    objRtn.TISCD = (rs01.getDouble("TISCDRT"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXDRT"));
                    objRtn.THDFD = (rs01.getDouble("THDFDRT"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPDRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totHFEEAMA = totHFEEAMA;
                    objRtn.totTGROSSA = totTGROSSA;
                    objRtn.totTISCA = totTISCA;
                    objRtn.totTTAXA = totTTAXA;
                    objRtn.totTUATPA = totTUATPA;
                    objRtn.totHFEEAMD = totHFEEAMD;
                    objRtn.totTGROSSD = totTGROSSD;
                    objRtn.totTISCD = totTISCD;
                    objRtn.totTTAXD = totTTAXD;
                    objRtn.totTUATPD = totTUATPD;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI022Filter> loadPX190S01SFI022(SFI022Filter filter) throws SQLException, Exception {
        List<SFI022Filter> lstRtn = new ArrayList<>(0);
        SFI022Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI022_3(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += rs01.getDouble("TGROSSRT");
                totTISC += rs01.getDouble("TISCRT");
                totTTAX += rs01.getDouble("TTAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("TUATPRT");
                totTNET += rs01.getDouble("NETRT");
                totTVAT += rs01.getDouble("TOHCOMRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI022Filter();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BCMNUM = rs01.getString("BCMNUM").trim();
                    objRtn.REFNUM = rs01.getString("REFNUM").trim();
                    objRtn.FIMNUM = rs01.getString("FIMNUM").trim();
                    objRtn.FIMCPNUM = rs01.getString("FIMCPNUM").trim();
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.REASCOD = rs01.getString("REASCOD");
                    objRtn.BAIR = filter.BAIR;
                    objRtn.TGROSS = (rs01.getDouble("TGROSSRT"));
                    objRtn.TISC = (rs01.getDouble("TISCRT"));
                    objRtn.TTAX = (rs01.getDouble("TTAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.TUATP = (rs01.getDouble("TUATPRT"));
                    objRtn.NET = (rs01.getDouble("NETRT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOMRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI030Filter> loadPX190S02SFI030(SFI040Filter filter) throws SQLException, Exception {
        List<SFI030Filter> lstRtn = new ArrayList<SFI030Filter>(0);
        SFI030Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, totTAXI_LY = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S02SFI030(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BAIR);
            cstmt01.setString(8, filter.BDATE);

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += rs01.getDouble("TGROSSRT");
                totTISC += rs01.getDouble("TISCRT");
                totTTAX += rs01.getDouble("TTAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("TUATPRT");
                totTNET += rs01.getDouble("TNETRT");
                totTVAT += rs01.getDouble("TOHCOMRT");
                totTAXI_LY += rs01.getDouble("TVATRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI030Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BAIR = rs01.getString("BAIR");
                    objRtn.IN_FECHA_FROM = rs01.getString("DES_BAIR");
                    objRtn.TGROSS = (rs01.getDouble("TGROSSRT"));
                    objRtn.TISC = (rs01.getDouble("TISCRT"));
                    objRtn.TTAX = (rs01.getDouble("TTAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.TUATP = (rs01.getDouble("TUATPRT"));
                    objRtn.TNET = (rs01.getDouble("TNETRT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOMRT"));
                    objRtn.TVAT = (rs01.getDouble("TVATRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.totTAXI_LY = totTAXI_LY;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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

        return lstRtn;
    }

    public List<SFI030Filter> loadPX190S03SFI030(SFI030Filter filter) throws SQLException, Exception {
        List<SFI030Filter> lstRtn = new ArrayList<SFI030Filter>(0);
        SFI030Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, totTAXI_LY = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S03SFI030(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BAIR);
            cstmt01.setString(8, filter.BDATE);

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += rs01.getDouble("TGROSSRT");
                totTISC += rs01.getDouble("TISCRT");
                totTTAX += rs01.getDouble("TTAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("TUATPRT");
                totTNET += rs01.getDouble("TNETRT");
                totTVAT += rs01.getDouble("TOHCOMRT");
                totTAXI_LY += rs01.getDouble("TVATRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI030Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.SOURCOD = rs01.getString("SOURCOD");
                    objRtn.IN_FECHA_FROM = rs01.getString("DES_SOURCOD");

                    objRtn.TGROSS = (rs01.getDouble("TGROSSRT"));
                    objRtn.TISC = (rs01.getDouble("TISCRT"));
                    objRtn.TTAX = (rs01.getDouble("TTAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.TUATP = (rs01.getDouble("TUATPRT"));
                    objRtn.TNET = (rs01.getDouble("TNETRT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOMRT"));
                    objRtn.TVAT = (rs01.getDouble("TVATRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;//OTHER
                    objRtn.totTAXI_LY = totTAXI_LY; //VAT
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BAIR = filter.BAIR;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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

        return lstRtn;
    }

    public List<SFI020Filter> loadPX190S03SFI020(SFI030Filter filter) throws SQLException, Exception {
        List<SFI020Filter> lstRtn = new ArrayList<>(0);
        SFI020Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        double peruatp = 0, perisc = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI020_4(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totTGROSS += rs01.getDouble("GROSSRT");
                totTISC += rs01.getDouble("ISCAMTRT");
                totTTAX += rs01.getDouble("TAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("UATPAMTRT");
                totTNET += rs01.getDouble("CPNTAMRT");
                totTVAT += rs01.getDouble("OTHCOMAMRT");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI020Filter();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CPNNUM = rs01.getString("CPNNUM");
                    objRtn.TKTNUM = rs01.getString("TKTNUM");
                    objRtn.AIRNUM = rs01.getString("AIRNUM");
                    objRtn.TKT = objRtn.AIRNUM + " " + objRtn.TKTNUM + " " + objRtn.CPNNUM;
                    objRtn.FROMCPN = rs01.getString("FROMCPN");
                    objRtn.TOCPN = rs01.getString("TOCPN");
                    objRtn.ACURREN = rs01.getString("ACURREN");
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.ETKTIND = rs01.getString("ETKTIND");
                    objRtn.BAIR = filter.BAIR;
//                    if (rs01.getString("DES_FTE") != null) {
//                        objRtn.DES_FTE = rs01.getString("DES_FTE");
//                    } else {
//                        objRtn.DES_FTE = "";
//                    }

                    objRtn.FLIGHTD = rs01.getString("FLIGHTD");
                    objRtn.DES_SOURCOD = Functions.getMonthConvert3(objRtn.FLIGHTD);
                    objRtn.VALDPMI = rs01.getString("VALDPMI");
                    objRtn.GROSS = (rs01.getDouble("GROSSRT"));
                    objRtn.ISCAMT = (rs01.getDouble("ISCAMTRT"));
                    objRtn.TAX = (rs01.getDouble("TAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.UATPAMT = (rs01.getDouble("UATPAMTRT"));
                    objRtn.CPNTAM = (rs01.getDouble("CPNTAMRT"));
                    objRtn.OTHCOMAM = (rs01.getDouble("OTHCOMAMRT"));
                    objRtn.OTHCOMPER = (rs01.getDouble("OTHCOMPERRT"));
                    objRtn.UATPPER = (rs01.getDouble("UATPPERRT"));
                    objRtn.ISCCH = (rs01.getDouble("ISCCHRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.FROMTO = objRtn.FROMCPN + "-" + objRtn.TOCPN;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.AccountingDate = Functions.getMonthConvert(rs01.getString("A1965FCONT"));
                    objRtn.AccountingID = rs01.getString("A1965IDCON");

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI021Filter> loadPX190S03SFI021(SFI030Filter filter) throws SQLException, Exception {
        List<SFI021Filter> lstRtn = new ArrayList<>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        double totTGROSSA = 0, totTISCA = 0, totTTAXA = 0, totHFEEAMA = 0, totTUATPA = 0, totTNETA = 0, totTVATA = 0;
        double totTGROSSD = 0, totTISCD = 0, totTTAXD = 0, totHFEEAMD = 0, totTUATPD = 0, totTNETD = 0, totTVATD = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI021_5(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTNET += rs01.getDouble("TNETRRT");
                totHFEEAM += rs01.getDouble("THDFALRT");
                totTGROSS += rs01.getDouble("TGROSSBRT");
                totTISC += rs01.getDouble("TISCALRT");
                totTTAX += rs01.getDouble("TTAXBRT");
                totTUATP += rs01.getDouble("TUATPALRT");
                totTGROSSA += rs01.getDouble("TGROSSART");
                totTISCA += rs01.getDouble("TISCART");
                totTTAXA += rs01.getDouble("TTAXART");
                totHFEEAMA += rs01.getDouble("THDFART");
                totTUATPA += rs01.getDouble("TUATPART");
                totTGROSSD += rs01.getDouble("TGROSSDRT");
                totTISCD += rs01.getDouble("TISCDRT");
                totTTAXD += rs01.getDouble("TTAXDRT");
                totHFEEAMD += rs01.getDouble("THDFDRT");
                totTUATPD += rs01.getDouble("TUATPDRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021Filter();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.REJNUM = rs01.getString("REJNUM");
                    objRtn.BAIR = filter.BAIR;
                    objRtn.REASCOD = rs01.getString("REASCOD");
                    objRtn.TGROSSB = (rs01.getDouble("TGROSSBRT"));
                    objRtn.TISCAL = (rs01.getDouble("TISCALRT"));
                    objRtn.TTAXB = (rs01.getDouble("TTAXBRT"));
                    objRtn.THDFAL = (rs01.getDouble("THDFALRT"));
                    objRtn.TUATPAL = (rs01.getDouble("TUATPALRT"));
                    objRtn.TNETR = (rs01.getDouble("TNETRRT"));
                    objRtn.TGROSSA = (rs01.getDouble("TGROSSART"));
                    objRtn.TISCA = (rs01.getDouble("TISCART"));
                    objRtn.TTAXA = (rs01.getDouble("TTAXART"));
                    objRtn.THDFA = (rs01.getDouble("THDFART"));
                    objRtn.TUATPA = (rs01.getDouble("TUATPART"));
                    objRtn.TGROSSD = (rs01.getDouble("TGROSSDRT"));
                    objRtn.TISCD = (rs01.getDouble("TISCDRT"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXDRT"));
                    objRtn.THDFD = (rs01.getDouble("THDFDRT"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPDRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totHFEEAMA = totHFEEAMA;
                    objRtn.totTGROSSA = totTGROSSA;
                    objRtn.totTISCA = totTISCA;
                    objRtn.totTTAXA = totTTAXA;
                    objRtn.totTUATPA = totTUATPA;
                    objRtn.totHFEEAMD = totHFEEAMD;
                    objRtn.totTGROSSD = totTGROSSD;
                    objRtn.totTISCD = totTISCD;
                    objRtn.totTTAXD = totTTAXD;
                    objRtn.totTUATPD = totTUATPD;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI022Filter> loadPX190S03SFI022(SFI030Filter filter) throws SQLException, Exception {
        List<SFI022Filter> lstRtn = new ArrayList<>(0);
        SFI022Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI022_3(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += rs01.getDouble("TGROSSRT");
                totTISC += rs01.getDouble("TISCRT");
                totTTAX += rs01.getDouble("TTAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("TUATPRT");
                totTNET += rs01.getDouble("NETRT");
                totTVAT += rs01.getDouble("TOHCOMRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI022Filter();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BCMNUM = rs01.getString("BCMNUM").trim();
                    objRtn.REFNUM = rs01.getString("REFNUM").trim();
                    objRtn.FIMNUM = rs01.getString("FIMNUM").trim();
                    objRtn.FIMCPNUM = rs01.getString("FIMCPNUM").trim();
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.REASCOD = rs01.getString("REASCOD");
                    objRtn.BAIR = filter.BAIR;

                    objRtn.TGROSS = (rs01.getDouble("TGROSSRT"));
                    objRtn.TISC = (rs01.getDouble("TISCRT"));
                    objRtn.TTAX = (rs01.getDouble("TTAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.TUATP = (rs01.getDouble("TUATPRT"));
                    objRtn.NET = (rs01.getDouble("NETRT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOMRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI020Filter> loadPX190SSQP788(SFI030Filter filter) throws SQLException, Exception {
        List<SFI020Filter> lstRtn = new ArrayList<>(0);
        SFI020Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00788(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PERNUM);
            cstmt01.setString(3, filter.BDAIR);
            cstmt01.setString(4, filter.BDATE);
            cstmt01.setString(5, filter.SOURCOD);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totTGROSS += rs01.getDouble("GROSSRT");
                totTISC += rs01.getDouble("ISCAMTRT");
                totTTAX += rs01.getDouble("TAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("UATPAMTRT");
                totTNET += rs01.getDouble("CPNTAMRT");
                totTVAT += rs01.getDouble("OTHCOMAMRT");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI020Filter();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.CPNNUM = rs01.getString("CPNNUM");
                    objRtn.TKTNUM = rs01.getString("TKTNUM");
                    objRtn.AIRNUM = rs01.getString("AIRNUM");
                    objRtn.TKT = objRtn.AIRNUM + " " + objRtn.TKTNUM + " " + objRtn.CPNNUM;
                    objRtn.FROMCPN = rs01.getString("FROMCPN");
                    objRtn.TOCPN = rs01.getString("TOCPN");
                    objRtn.FROMTO = objRtn.FROMCPN + "-" + objRtn.TOCPN;

                    objRtn.FLIGHTN = rs01.getString("FLIGHTN");
                    objRtn.ORIGPMI = rs01.getString("ORIGPMI");
                    objRtn.VALDPMI = rs01.getString("VALDPMI");

                    objRtn.ACURREN = rs01.getString("ACURREN");
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.FLIGHTD = rs01.getString("FLIGHTD");
                    objRtn.DES_SOURCOD = Functions.getMonthConvert3(objRtn.FLIGHTD);

                    objRtn.GROSS = (rs01.getDouble("GROSSRT"));
                    objRtn.ISCAMT = (rs01.getDouble("ISCAMTRT"));
                    objRtn.TAX = (rs01.getDouble("TAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.UATPAMT = (rs01.getDouble("UATPAMTRT"));
                    objRtn.CPNTAM = (rs01.getDouble("CPNTAMRT"));
                    objRtn.OTHCOMAM = (rs01.getDouble("OTHCOMAMRT"));
                    /* objRtn.OTHCOMPER = (rs01.getDouble("OTHCOMPER"));
                     objRtn.UATPPER = (rs01.getDouble("UATPPER"));
                     objRtn.ISCCH = (rs01.getDouble("ISCCH"));*/
                    objRtn.AccountingDate = Functions.getMonthConvert(rs01.getString("A1965FCONT"));
                    objRtn.AccountingID = rs01.getString("A1965IDCON");

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI021Filter> loadPX190SSQP789(SFI030Filter filter) throws SQLException, Exception {
        List<SFI021Filter> lstRtn = new ArrayList<>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0;
        double totTGROSSA = 0, totTISCA = 0, totTTAXA = 0, totHFEEAMA = 0, totTUATPA = 0;
        double totTGROSSD = 0, totTISCD = 0, totTTAXD = 0, totHFEEAMD = 0, totTUATPD = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00789(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PERNUM);
            cstmt01.setString(3, filter.BDAIR);
            cstmt01.setString(4, filter.BDATE);
            cstmt01.setString(5, filter.SOURCOD);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totTGROSS += rs01.getDouble("TGROSSBRT");
                totTISC += rs01.getDouble("TISCALRT");
                totTTAX += rs01.getDouble("TTAXBRT");
                totHFEEAM += rs01.getDouble("THDFALRT");
                totTUATP += rs01.getDouble("TUATPALRT");
                totTNET += rs01.getDouble("TNETRRT");
                totTGROSSA += rs01.getDouble("TGROSSART");
                totTISCA += rs01.getDouble("TISCART");
                totTTAXA += rs01.getDouble("TTAXART");
                totHFEEAMA += rs01.getDouble("THDFART");
                totTUATPA += rs01.getDouble("TUATPART");
                totTGROSSD += rs01.getDouble("TGROSSDRT");
                totTISCD += rs01.getDouble("TISCDRT");
                totTTAXD += rs01.getDouble("TTAXDRT");
                totHFEEAMD += rs01.getDouble("THDFDRT");
                totTUATPD += rs01.getDouble("TUATPDRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021Filter();
                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.REJNUM = rs01.getString("REJNUM");
                    objRtn.REASCOD = rs01.getString("REASCOD");
                    objRtn.TGROSSB = (rs01.getDouble("TGROSSBRT"));
                    objRtn.TISCAL = (rs01.getDouble("TISCALRT"));
                    objRtn.TTAXB = (rs01.getDouble("TTAXBRT"));
                    objRtn.THDFAL = (rs01.getDouble("THDFALRT"));
                    objRtn.TUATPAL = (rs01.getDouble("TUATPALRT"));
                    objRtn.TNETR = (rs01.getDouble("TNETRRT"));
                    objRtn.TGROSSA = (rs01.getDouble("TGROSSART"));
                    objRtn.TISCA = (rs01.getDouble("TISCART"));
                    objRtn.TTAXA = (rs01.getDouble("TTAXART"));
                    objRtn.THDFA = (rs01.getDouble("THDFART"));
                    objRtn.TUATPA = (rs01.getDouble("TUATPART"));
                    objRtn.TGROSSD = (rs01.getDouble("TGROSSDRT"));
                    objRtn.TISCD = (rs01.getDouble("TISCDRT"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXDRT"));
                    objRtn.THDFD = (rs01.getDouble("THDFDRT"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPDRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totHFEEAMA = totHFEEAMA;
                    objRtn.totTGROSSA = totTGROSSA;
                    objRtn.totTISCA = totTISCA;
                    objRtn.totTTAXA = totTTAXA;
                    objRtn.totTUATPA = totTUATPA;
                    objRtn.totHFEEAMD = totHFEEAMD;
                    objRtn.totTGROSSD = totTGROSSD;
                    objRtn.totTISCD = totTISCD;
                    objRtn.totTTAXD = totTTAXD;
                    objRtn.totTUATPD = totTUATPD;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI022Filter> loadPX190SSQP805(SFI030Filter filter) throws SQLException, Exception {
        List<SFI022Filter> lstRtn = new ArrayList<>(0);
        SFI022Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00805(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PERNUM);
            cstmt01.setString(3, filter.BDAIR);
            cstmt01.setString(4, filter.BDATE);
            cstmt01.setString(5, filter.SOURCOD);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += rs01.getDouble("TGROSSRT");
                totTISC += rs01.getDouble("TISCRT");
                totTTAX += rs01.getDouble("TTAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("TUATPRT");
                totTNET += rs01.getDouble("NETRT");
                totTVAT += rs01.getDouble("TOHCOMRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI022Filter();
                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BCMNUM = rs01.getString("BCMNUM").trim();
                    objRtn.REFNUM = rs01.getString("REFNUM").trim();
                    objRtn.FIMNUM = rs01.getString("FIMNUM").trim();
                    objRtn.FIMCPNUM = rs01.getString("FIMCPNUM").trim();
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.REASCOD = rs01.getString("REASCOD");

                    objRtn.TGROSS = (rs01.getDouble("TGROSSRT"));
                    objRtn.TISC = (rs01.getDouble("TISCRT"));
                    objRtn.TTAX = (rs01.getDouble("TTAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.TUATP = (rs01.getDouble("TUATPRT"));
                    objRtn.NET = (rs01.getDouble("NETRT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOMRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI041> loadPX190S01SFI041(SFI020Filter filter) throws SQLException, Exception {

        List<SFI041> lstRtn = new ArrayList<>(0);
        SFI041 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI041(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt01.setString(2, filter.TTRAN.trim());
            cstmt01.setString(3, filter.CPNNUM.trim());
            cstmt01.setString(4, filter.AIRNUM.trim());
            cstmt01.setString(5, filter.TKTNUM.trim());
            cstmt01.setString(6, filter.BAIR.trim());
            cstmt01.setString(7, filter.BDATE.trim());
            cstmt01.setString(8, filter.PERNUM.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SFI041();
                objRtn.TAXCODE1 = rs01.getString("TAXCODE1").trim();
                objRtn.TAXBILED1 = rs01.getDouble("TAXBILED1");
                objRtn.TAXCODE2 = rs01.getString("TAXCODE2").trim();
                objRtn.TAXBILED2 = rs01.getDouble("TAXBILED2");
                objRtn.TAXCODE3 = rs01.getString("TAXCODE3").trim();
                objRtn.TAXBILED3 = rs01.getDouble("TAXBILED3");
                objRtn.TAXCODE4 = rs01.getString("TAXCODE4").trim();
                objRtn.TAXBILED4 = rs01.getDouble("TAXBILED4");
                objRtn.TAXCODE5 = rs01.getString("TAXCODE5").trim();
                objRtn.TAXBILED5 = rs01.getDouble("TAXBILED5");
                objRtn.CPNNUM = rs01.getString("CPNNUM").trim();
                objRtn.AIRNUM = rs01.getString("AIRNUM").trim();
                objRtn.TKTNUM = rs01.getString("TKTNUM").trim();
                objRtn.BDATE = Functions.getMonthConvert2(filter.BDATE);
                objRtn.PERNUM = filter.PERNUM;
                objRtn.TKT = filter.AIRNUM + " " + filter.TKTNUM + " " + filter.CPNNUM;
                lstRtn.add(objRtn);
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

    public List<SFI020Filter> loadPX190S09SFI020(SFI020Filter filter) throws SQLException, Exception {

        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S09SFI020_1(?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cstmt01.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cstmt01.setString(4, filter.IN_TKT.substring(7, 13));//SERIE

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totTGROSS += rs01.getDouble("GROSSRT");
                totTISC += rs01.getDouble("ISCAMTRT");
                totTTAX += rs01.getDouble("TAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("UATPAMTRT");
                totTNET += rs01.getDouble("CPNTAMRT");
                totTVAT += rs01.getDouble("OTHCOMAMRT");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                e.printStackTrace();
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
//1396771757671 
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI020Filter();
                    objRtn.CPNNUM = rs01.getString("CPNNUM");
                    objRtn.TKTNUM = rs01.getString("TKTNUM");
                    objRtn.AIRNUM = rs01.getString("AIRNUM");
                    objRtn.TKT = objRtn.AIRNUM + " " + objRtn.TKTNUM + " " + objRtn.CPNNUM;
                    if (rs01.getString("DES_FTE") != null) {
                        objRtn.DES_FTE = rs01.getString("DES_FTE");
                    } else {
                        objRtn.DES_FTE = "";
                    }
                    objRtn.FROMCPN = rs01.getString("FROMCPN");
                    objRtn.TOCPN = rs01.getString("TOCPN");
                    objRtn.ACURREN = rs01.getString("ACURREN");
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.ETKTIND = rs01.getString("ETKTIND");
                    objRtn.FLIGHTD = rs01.getString("FLIGHTD");
                    objRtn.DES_SOURCOD = Functions.getMonthConvert3(objRtn.FLIGHTD);
                    objRtn.BAIR = rs01.getString("BAIR");
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.VALDPMI = rs01.getString("VALDPMI");
                    objRtn.SOURCOD = rs01.getString("SOURCOD");
                    objRtn.FROMTO = objRtn.FROMCPN + "-" + objRtn.TOCPN;
                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.GROSS = (rs01.getDouble("GROSSRT"));
                    objRtn.ISCAMT = (rs01.getDouble("ISCAMTRT"));
                    objRtn.TAX = (rs01.getDouble("TAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.UATPAMT = (rs01.getDouble("UATPAMTRT"));
                    objRtn.CPNTAM = (rs01.getDouble("CPNTAMRT"));
                    objRtn.OTHCOMAM = (rs01.getDouble("OTHCOMAMRT"));
                    objRtn.OTHCOMPER = (rs01.getDouble("OTHCOMPERRT"));
                    objRtn.UATPPER = (rs01.getDouble("UATPPERRT"));
                    objRtn.ISCCH = (rs01.getDouble("ISCCHRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    lstRtn.add(objRtn);
                }
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

        return lstRtn;
    }

    public SFI031 loadPX190S01SFI031(SFI021Filter filter) throws SQLException, Exception {
        SFI031 objRtn = new SFI031();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI031(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt01.setString(2, filter.TTRAN.trim());
            cstmt01.setString(3, filter.REJNUM.trim());
            cstmt01.setString(4, filter.BDAIR.trim());
            cstmt01.setString(5, filter.BDATE.trim());
            cstmt01.setString(6, filter.PERNUM.trim());
            cstmt01.setString(7, filter.SOURCOD.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn.REMARK1 = rs01.getString("REMARK1").trim();
                objRtn.REMARK2 = rs01.getString("REMARK2").trim();
                objRtn.REMARK3 = rs01.getString("REMARK3").trim();
                objRtn.REMARK4 = rs01.getString("REMARK4").trim();
                objRtn.REMARK5 = rs01.getString("REMARK5").trim();
                objRtn.NUMRMK = rs01.getString("NUMRMK").trim();
                objRtn.RBCNUM = filter.REJNUM;

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

    public SFI031 loadPX190S02SFI031(SFI022Filter filter) throws SQLException, Exception {
        SFI031 objRtn = new SFI031();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI031(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt01.setString(2, filter.TTRAN.trim());
            cstmt01.setString(3, filter.BCMNUM.trim());
            cstmt01.setString(4, filter.BDAIR.trim());
            cstmt01.setString(5, filter.BDATE.trim());
            cstmt01.setString(6, filter.PERNUM.trim());
            cstmt01.setString(7, filter.SOURCOD.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn.REMARK1 = rs01.getString("REMARK1").trim();
                objRtn.REMARK2 = rs01.getString("REMARK2").trim();
                objRtn.REMARK3 = rs01.getString("REMARK3").trim();
                objRtn.REMARK4 = rs01.getString("REMARK4").trim();
                objRtn.REMARK5 = rs01.getString("REMARK5").trim();
                objRtn.NUMRMK = rs01.getString("NUMRMK").trim();
                objRtn.RBCNUM = filter.BCMNUM;

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

    public List<SFI021Filter> loadPX185S01SFI021_rejected(SFI021Filter filter) throws SQLException, Exception {
        List<SFI021Filter> lstRtn = new ArrayList<>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        double totTGROSSA = 0, totTISCA = 0, totTTAXA = 0, totHFEEAMA = 0, totTUATPA = 0, totTNETA = 0, totTVATA = 0;
        double totTGROSSD = 0, totTISCD = 0, totTTAXD = 0, totHFEEAMD = 0, totTUATPD = 0, totTNETD = 0, totTVATD = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX190S01SFI021_TV(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.REJNUMBER);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totTGROSS += rs01.getDouble("TGROSSBRT");
                totTISC += rs01.getDouble("TISCALRT");
                totTTAX += rs01.getDouble("TTAXBRT");
                totHFEEAM += rs01.getDouble("THDFALRT");
                totTUATP += rs01.getDouble("TUATPALRT");
                totTNET += rs01.getDouble("TNETRRT");
                totTGROSSA += rs01.getDouble("TGROSSART");
                totTISCA += rs01.getDouble("TISCART");
                totTTAXA += rs01.getDouble("TTAXART");
                totHFEEAMA += rs01.getDouble("THDFART");
                totTUATPA += rs01.getDouble("TUATPART");
                totTGROSSD += rs01.getDouble("TGROSSDRT");
                totTISCD += rs01.getDouble("TISCDRT");
                totTTAXD += rs01.getDouble("TTAXDRT");
                totHFEEAMD += rs01.getDouble("THDFDRT");
                totTUATPD += rs01.getDouble("TUATPDRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021Filter();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.REJNUM = rs01.getString("REJNUM");
                    objRtn.BAIR = filter.BAIR;
                    objRtn.REASCOD = rs01.getString("REASCOD");
                    objRtn.TGROSSB = (rs01.getDouble("TGROSSBRT"));
                    objRtn.TISCAL = (rs01.getDouble("TISCALRT"));
                    objRtn.TTAXB = (rs01.getDouble("TTAXBRT"));
                    objRtn.THDFAL = (rs01.getDouble("THDFALRT"));
                    objRtn.TUATPAL = (rs01.getDouble("TUATPALRT"));
                    objRtn.TNETR = (rs01.getDouble("TNETRRT"));
                    objRtn.TGROSSA = (rs01.getDouble("TGROSSART"));
                    objRtn.TISCA = (rs01.getDouble("TISCART"));
                    objRtn.TTAXA = (rs01.getDouble("TTAXART"));
                    objRtn.THDFA = (rs01.getDouble("THDFART"));
                    objRtn.TUATPA = (rs01.getDouble("TUATPART"));
                    objRtn.TGROSSD = (rs01.getDouble("TGROSSDRT"));
                    objRtn.TISCD = (rs01.getDouble("TISCDRT"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXDRT"));
                    objRtn.THDFD = (rs01.getDouble("THDFDRT"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPDRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totHFEEAMA = totHFEEAMA;
                    objRtn.totTGROSSA = totTGROSSA;
                    objRtn.totTISCA = totTISCA;
                    objRtn.totTTAXA = totTTAXA;
                    objRtn.totTUATPA = totTUATPA;
                    objRtn.totHFEEAMD = totHFEEAMD;
                    objRtn.totTGROSSD = totTGROSSD;
                    objRtn.totTISCD = totTISCD;
                    objRtn.totTTAXD = totTTAXD;
                    objRtn.totTUATPD = totTUATPD;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    lstRtn.add(objRtn);
                }
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
        return lstRtn;

    }

    
    public List<SFI010> loadPX538_register_10(SFI010Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI010> lstRtn = new ArrayList<SFI010>(0);
        SFI010 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03907_M(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SFI010();

                objRtn.SMI = rs01.getString("SMI");
                objRtn.RSN = rs01.getString("RSN");
                objRtn.SFI = rs01.getString("SFI");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BCODE = rs01.getInt("BCODE");
                objRtn.BNUMBER = rs01.getString("BNUMBER");
                objRtn.BATSEQ = rs01.getInt("BATSEQ");
                objRtn.RECSEQ = rs01.getInt("RECSEQ");
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.LCURREN = rs01.getString("LCURREN");
                objRtn.BCURREN = rs01.getString("BCURREN");
                objRtn.PERNUM = rs01.getString("PERNUM");
                objRtn.SETMETH = rs01.getString("SETMETH");
                objRtn.DSFLAG = rs01.getString("DSFLAG");
                objRtn.IDATE = rs01.getString("IDATE");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                objRtn.PBMONTH = rs01.getString("PBMONTH");
                objRtn.NILFORM = rs01.getString("NILFORM");
                objRtn.SINVFLAG = rs01.getString("SINVFLAG");
                objRtn.BAIRLOC1 = rs01.getString("BAIRLOC1");
                objRtn.BAIRLOC2 = rs01.getString("BAIRLOC2");
                objRtn.BTYPE = rs01.getString("BTYPE");

                lstRtn.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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
    
    public List<SFI030> loadPX538_register_30(SFI030Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI030> lstRtn = new ArrayList<SFI030>(0);
        SFI030 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03908_M(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SFI030();

                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BDATE2 = rs01.getString("BDATE2");
                objRtn.PERNUM = rs01.getString("PERNUM");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BDAIR2 = rs01.getString("BDAIR2");
                objRtn.BNUMBER = rs01.getString("BNUMBER");
                objRtn.NUMBILL = rs01.getInt("NUMBILL");
                objRtn.BCODE = rs01.getInt("BCODE");
                objRtn.SOURCOD = rs01.getString("SOURCOD");
                
                objRtn.TGROSS = rs01.getDouble("TGROSS");
                objRtn.TISC = rs01.getDouble("TISC");
                objRtn.TTAX = rs01.getDouble("TTAX");
                objRtn.TVAT = rs01.getDouble("TVAT");
                objRtn.TOHCOM = rs01.getDouble("TOHCOM");
                objRtn.HFEEAM = rs01.getDouble("HFEEAM");
                objRtn.TUATP = rs01.getDouble("TUATP");
                objRtn.TNET = rs01.getDouble("TNET");
                
                objRtn.TGROSSG = rs01.getString("TGROSSG");
                if(objRtn.TGROSSG.trim().equals("M")){
                    objRtn.TGROSS = objRtn.TGROSS * -1;
                }
                
                objRtn.TISCSG = rs01.getString("TISCSG");
                if(objRtn.TISCSG.trim().equals("M")){
                    objRtn.TISC = objRtn.TISC * -1;
                }
                
                objRtn.TTAXSG = rs01.getString("TTAXSG");
                if(objRtn.TTAXSG.trim().equals("M")){
                    objRtn.TTAX = objRtn.TTAX * -1;
                }
                
                objRtn.TVATSG = rs01.getString("TVATSG");
                if(objRtn.TVATSG.trim().equals("M")){
                    objRtn.TVAT = objRtn.TVAT * -1;
                }
                
                objRtn.TOHCOMSG = rs01.getString("TOHCOMSG");
                if(objRtn.TOHCOMSG.trim().equals("M")){
                    objRtn.TOHCOM = objRtn.TOHCOM * -1;
                }
                
                objRtn.HFEEAMSG = rs01.getString("HFEEAMSG");
                if(objRtn.HFEEAMSG.trim().equals("M")){
                    objRtn.HFEEAM = objRtn.HFEEAM * -1;
                }
                
                objRtn.TUATPSG = rs01.getString("TUATPSG");
                if(objRtn.TUATPSG.trim().equals("M")){
                    objRtn.TUATP = objRtn.TUATP * -1;
                }
                
                objRtn.NETSG = rs01.getString("NETSG");
                if(objRtn.NETSG.trim().equals("M")){
                    objRtn.TNET = objRtn.TNET * -1;
                }
                

                lstRtn.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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
    
    
    // ------------------------------- SFI 20 ------------------------------------------------------
    public List<SFI020Filter> loadPX538_register20(SFI020Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03933_M(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SFI020Filter();

                objRtn.TKTNUM = rs01.getString("TKTNUM");
                objRtn.GROSS = rs01.getDouble("GROSS");
                objRtn.TAX = rs01.getDouble("TAX");
                objRtn.SOURCOD = rs01.getString("SOURCOD");

                objRtn.FLIGHTN = rs01.getString("FLIGHTN");
                objRtn.FLIGHTD = rs01.getString("FLIGHTD");

                objRtn.FROMCPN = rs01.getString("FROMCPN");
                objRtn.TOCPN = rs01.getString("TOCPN");
                
                objRtn.HFEETYPE = rs01.getString("HFEETYPE");
                objRtn.HFEEAM = rs01.getDouble("HFEEAM");
                objRtn.VATAMT = rs01.getDouble("VATAMT");

                objRtn.ISCAMT = rs01.getDouble("ISCAMT");
                objRtn.OTHCOMAM = rs01.getDouble("OTHCOMAM");
                objRtn.CPNTAM = rs01.getDouble("CPNTAM");
                objRtn.PERNUM = rs01.getString("PERNUM");
                
                objRtn.CPNNUM = rs01.getString("CPNNUM");
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BDATE2 = rs01.getString("BDATE2");
                
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BDAIR2 = rs01.getString("BDAIR2");
                objRtn.CPNNUM = rs01.getString("CPNNUM");
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BNUMBER = rs01.getString("BNUMBER");
                objRtn.UATPAMT = rs01.getDouble("UATPAMT");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                
                objRtn.GROSSSG = rs01.getString("GROSSSG");
                if(objRtn.GROSSSG.trim().equals("M")){
                   objRtn.GROSS = objRtn.GROSS*-1;
                }
                
                objRtn.TAXSG = rs01.getString("TAXSG");
                if(objRtn.TAXSG.trim().equals("M")){
                   objRtn.TAX = objRtn.TAX*-1;
                }
                
                objRtn.HFEEAMSG = rs01.getString("HFEEAMSG");
                if(objRtn.HFEEAMSG.trim().equals("M")){
                   objRtn.HFEEAM = objRtn.HFEEAM*-1;
                }
                
                objRtn.VATAMTSG = rs01.getString("VATAMTSG");
                if(objRtn.VATAMTSG.trim().equals("M")){
                   objRtn.VATAMT = objRtn.VATAMT*-1;
                }
                
                objRtn.ISCAMTSG = rs01.getString("ISCAMTSG");
                if(objRtn.ISCAMTSG.trim().equals("M")){
                   objRtn.ISCAMT = rs01.getDouble("ISCAMT")*-1;
                }
                
                objRtn.OTHCOMASG = rs01.getString("OTHCOMASG");
                if(objRtn.OTHCOMASG.trim().equals("M")){
                   objRtn.OTHCOMAM = rs01.getDouble("OTHCOMAM")*-1;
                }
                
                objRtn.CPNTAMSG = rs01.getString("CPNTAMSG");
                if(objRtn.CPNTAMSG.trim().equals("M")){
                   objRtn.CPNTAM = rs01.getDouble("CPNTAM")*-1;
                }
                
                objRtn.UATPAMTSG = rs01.getString("UATPAMTSG");
                if(objRtn.UATPAMTSG.trim().equals("M")){
                   objRtn.UATPAMT = rs01.getDouble("UATPAMT")*-1;
                }

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
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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

    
    // ------------------------------- SFI 21 y 22 y 23------------------------------------------------------
    public List<SFI021> loadPX538_register_21(SFI021Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI021> lstRtn = new ArrayList<SFI021>(0);
        SFI021 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03934_M(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SFI021();
                                
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BDATE2 = rs01.getString("BDATE2");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.PERNUM = rs01.getString("PERNUM");
                objRtn.SOURCOD = rs01.getString("SOURCOD");
                objRtn.REJNUM = rs01.getString("REJNUM");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                
                objRtn.TGROSSD = rs01.getDouble("TGROSSD");
                objRtn.TGROSSDSG = rs01.getString("TGROSSDSG");
                if(objRtn.TGROSSDSG.trim().equals("M")){
                    objRtn.TGROSSD = objRtn.TGROSSD * -1;
                }
                
                objRtn.TISCD = rs01.getDouble("TISCD");
                objRtn.TISCDSG = rs01.getString("TISCDSG");
                if(objRtn.TISCDSG.trim().equals("M")){
                    objRtn.TISCD = objRtn.TISCD * -1;
                }
                
                objRtn.TOTHCD = rs01.getDouble("TOTHCD");
                objRtn.TOTHCDSG = rs01.getString("TOTHCDSG");
                if(objRtn.TOTHCDSG.trim().equals("M")){
                    objRtn.TOTHCD = objRtn.TOTHCD * -1;
                }
                
                objRtn.TUATPD = rs01.getDouble("TUATPD");
                objRtn.TUATPDSG = rs01.getString("TUATPDSG");
                if(objRtn.TUATPDSG.trim().equals("M")){
                    objRtn.TUATPD = objRtn.TUATPD * -1;
                }
                
                objRtn.TTAXD = rs01.getDouble("TTAXD");
                objRtn.TTAXDSG = rs01.getString("TTAXDSG");
                if(objRtn.TTAXDSG.trim().equals("M")){
                    objRtn.TTAXD = objRtn.TTAXD * -1;
                }
                
                objRtn.THDFD = rs01.getDouble("THDFD");
                objRtn.THDFDSG = rs01.getString("THDFDSG");
                if(objRtn.THDFDSG.trim().equals("M")){
                    objRtn.THDFD = objRtn.THDFD * -1;
                }
                
                objRtn.TVATD = rs01.getDouble("TVATD");
                objRtn.TVATDSG = rs01.getString("TVATDSG");
                if(objRtn.TVATDSG.trim().equals("M")){
                    objRtn.TVATD = objRtn.TVATD * -1;
                }
                
                objRtn.TNETR = rs01.getDouble("TNETR");
                objRtn.TNETRSG = rs01.getString("TNETRSG");
                if(objRtn.TNETRSG.trim().equals("M")){
                    objRtn.TNETR = objRtn.TNETR * -1;
                }
                
                lstRtn.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021();

                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.BDATE2 = rs01.getString("BDATE2");
                    objRtn.BAIR = rs01.getString("BAIR");
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.SOURCOD = rs01.getString("SOURCOD");
                    objRtn.REJNUM = rs01.getString("BCMNUM");
                    objRtn.LBRATE = rs01.getDouble("LBRATE");

                    objRtn.TGROSSD = rs01.getDouble("TGROSS");
                    objRtn.TISCD = rs01.getDouble("TISC");
                    objRtn.TOTHCD = rs01.getDouble("TOHCOM");
                    objRtn.TUATPD = rs01.getDouble("TUATP");
                    objRtn.TTAXD = rs01.getDouble("TTAX");
                    objRtn.THDFD = rs01.getDouble("HFEEAM");
                    objRtn.TVATD = rs01.getDouble("TVAT");
                    objRtn.TNETR = rs01.getDouble("NET");

                    objRtn.TGROSSDSG = rs01.getString("TGROSSG");
                    if(objRtn.TGROSSDSG.trim().equals("M")){
                        objRtn.TGROSSD = objRtn.TGROSSD * -1;
                    }

                    objRtn.TISCDSG = rs01.getString("TISCSG");
                    if(objRtn.TISCDSG.trim().equals("M")){
                        objRtn.TISCD = objRtn.TISCD * -1;
                    }

                    objRtn.TOTHCDSG = rs01.getString("TOHCOMSG");
                    if(objRtn.TOTHCDSG.trim().equals("M")){
                        objRtn.TOTHCD = objRtn.TOTHCD * -1;
                    }

                    objRtn.TUATPDSG = rs01.getString("TUATPSG");
                    if(objRtn.TUATPDSG.trim().equals("M")){
                        objRtn.TUATPD = objRtn.TUATPD * -1;
                    }

                    objRtn.TTAXDSG = rs01.getString("TTAXSG");
                    if(objRtn.TTAXDSG.trim().equals("M")){
                        objRtn.TTAXD = objRtn.TTAXD * -1;
                    }

                    objRtn.THDFDSG = rs01.getString("HFEEAMSG");
                    if(objRtn.THDFDSG.trim().equals("M")){
                        objRtn.THDFD = objRtn.THDFD * -1;
                    }

                    objRtn.TVATDSG = rs01.getString("TVATSG");
                    if(objRtn.TVATDSG.trim().equals("M")){
                        objRtn.TVATD = objRtn.TVATD * -1;
                    }

                    objRtn.TNETRSG = rs01.getString("NETSG");
                    if(objRtn.TNETRSG.trim().equals("M")){
                        objRtn.TNETR = objRtn.TNETR * -1;
                    }

                    lstRtn.add(objRtn);
                }
            }
            
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021();

                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.BDATE2 = rs01.getString("BDATE2");
                    objRtn.BAIR = rs01.getString("BAIR");
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.SOURCOD = rs01.getString("SOURCOD");
                    objRtn.REJNUM = rs01.getString("BCMNUM");
                    objRtn.LBRATE = rs01.getDouble("LBRATE");

                    objRtn.TGROSSD = rs01.getDouble("TGROSS");
                    objRtn.TISCD = rs01.getDouble("TISC");
                    objRtn.TOTHCD = rs01.getDouble("TOHCOM");
                    objRtn.TUATPD = rs01.getDouble("TUATP");
                    objRtn.TTAXD = rs01.getDouble("TTAX");
                    objRtn.THDFD = rs01.getDouble("HFEEAM");
                    objRtn.TVATD = rs01.getDouble("TVAT");
                    objRtn.TNETR = rs01.getDouble("NET");

                    objRtn.TGROSSDSG = rs01.getString("TGROSSG");
                    if(objRtn.TGROSSDSG.trim().equals("M")){
                        objRtn.TGROSSD = objRtn.TGROSSD * -1;
                    }

                    objRtn.TISCDSG = rs01.getString("TISCSG");
                    if(objRtn.TISCDSG.trim().equals("M")){
                        objRtn.TISCD = objRtn.TISCD * -1;
                    }

                    objRtn.TOTHCDSG = rs01.getString("TOHCOMSG");
                    if(objRtn.TOTHCDSG.trim().equals("M")){
                        objRtn.TOTHCD = objRtn.TOTHCD * -1;
                    }

                    objRtn.TUATPDSG = rs01.getString("TUATPSG");
                    if(objRtn.TUATPDSG.trim().equals("M")){
                        objRtn.TUATPD = objRtn.TUATPD * -1;
                    }

                    objRtn.TTAXDSG = rs01.getString("TTAXSG");
                    if(objRtn.TTAXDSG.trim().equals("M")){
                        objRtn.TTAXD = objRtn.TTAXD * -1;
                    }

                    objRtn.THDFDSG = rs01.getString("HFEEAMSG");
                    if(objRtn.THDFDSG.trim().equals("M")){
                        objRtn.THDFD = objRtn.THDFD * -1;
                    }

                    objRtn.TVATDSG = rs01.getString("TVATSG");
                    if(objRtn.TVATDSG.trim().equals("M")){
                        objRtn.TVATD = objRtn.TVATD * -1;
                    }

                    objRtn.TNETRSG = rs01.getString("NETSG");
                    if(objRtn.TNETRSG.trim().equals("M")){
                        objRtn.TNETR = objRtn.TNETR * -1;
                    }

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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

    // ------------------------------- SFI 31 ------------------------------------------------------
    public List<SFI031> loadPX538_register_31(SFI020Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI031> lstRtn = new ArrayList<SFI031>(0);
        SFI031 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04280(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SFI031();

                objRtn.SMI = rs01.getString("SMI");
                objRtn.RSN = rs01.getInt("RSN");
                objRtn.SFI = rs01.getString("SFI");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BCODE = rs01.getInt("BCODE");
                objRtn.BNUMBER = rs01.getString("BNUMBER");
                objRtn.RBCNUM = rs01.getString("RBCNUM");
                objRtn.NUMRMK = rs01.getString("NUMRMK");
                objRtn.REMARK1 = rs01.getString("REMARK1");
                objRtn.REMARK2 = rs01.getString("REMARK2");
                objRtn.REMARK3 = rs01.getString("REMARK3");
                objRtn.REMARK4 = rs01.getString("REMARK4");
                objRtn.REMARK5 = rs01.getString("REMARK5");
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.PERNUM = rs01.getString("PERNUM");

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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
    
    // ------------------------------- SFI 32 ------------------------------------------------------
    public List<SFI032> loadPX538_register_32(SFI020Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI032> lstRtn = new ArrayList<SFI032>(0);
        SFI032 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03935_M(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SFI032();

                objRtn.SMI = rs01.getString("SMI");
                objRtn.RSN = rs01.getInt("RSN");
                objRtn.SFI = rs01.getString("SFI");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BAIR2 = rs01.getString("BAIR2");
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BDAIR2 = rs01.getString("BDAIR2");
                objRtn.BCODE = rs01.getInt("BCODE");
                objRtn.BNUMBER = rs01.getString("BNUMBER");
                objRtn.REJNUM = rs01.getString("REJNUM");
                objRtn.BKSNUM = rs01.getString("BKSNUM");
                objRtn.AIRNUM = rs01.getString("AIRNUM");
                objRtn.CPNNUM = rs01.getString("CPNNUM");
                objRtn.TKTNUM = rs01.getString("TKTNUM");
                objRtn.DCHEQ = rs01.getString("DCHEQ");
                objRtn.FROMCPN = rs01.getString("FROMCPN");
                objRtn.TOCPN = rs01.getString("TOCPN");
                objRtn.TGROSSB = rs01.getDouble("TGROSSB");
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BDATE2 = rs01.getString("BDATE2");
                objRtn.PERNUM = rs01.getString("PERNUM");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                
                objRtn.GAD = rs01.getDouble("GAD");
                objRtn.IAD = rs01.getDouble("IAD");
                objRtn.TAD = rs01.getDouble("TAD");
                objRtn.OCDA = rs01.getDouble("OCDA");
                objRtn.HFAD = rs01.getDouble("HFAD");
                objRtn.UAD = rs01.getDouble("UAD");
                objRtn.NRA = rs01.getDouble("NRA");
                objRtn.SOURCOD = rs01.getString("SOURCOD");
                
                objRtn.TGROSSBSG = rs01.getString("TGROSSBSG");
                if(objRtn.TGROSSBSG.trim().equals("M")){
                    objRtn.TGROSSB = objRtn.TGROSSB * -1;
                }
                
                objRtn.TGROSSDSG = rs01.getString("TGROSSDSG");
                if(objRtn.TGROSSDSG.trim().equals("M")){
                    objRtn.GAD = objRtn.GAD * -1;
                }
                
                objRtn.TISCDSG = rs01.getString("TISCDSG");
                if(objRtn.TISCDSG.trim().equals("M")){
                    objRtn.IAD = objRtn.IAD * -1;
                }
                
                objRtn.TTAXDSG = rs01.getString("TTAXDSG");
                if(objRtn.TTAXDSG.trim().equals("M")){
                    objRtn.TAD = objRtn.TAD * -1;
                }
                
                objRtn.TOTHCDSG = rs01.getString("TOTHCDSG");
                if(objRtn.TOTHCDSG.trim().equals("M")){
                    objRtn.OCDA = objRtn.OCDA * -1;
                }
                
                objRtn.THDFDSG = rs01.getString("THDFDSG");
                if(objRtn.THDFDSG.trim().equals("M")){
                    objRtn.HFAD = objRtn.HFAD * -1;
                }
                
                objRtn.TUATPDSG = rs01.getString("TUATPDSG");
                if(objRtn.TUATPDSG.trim().equals("M")){
                    objRtn.UAD = objRtn.UAD * -1;
                }
                
                objRtn.TNETRSG = rs01.getString("TNETRSG");
                if(objRtn.TNETRSG.trim().equals("M")){
                    objRtn.NRA = objRtn.NRA * -1;
                }

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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
    
    // ------------------------------- SFI 33 ------------------------------------------------------
    public List<SFI033> loadPX538_register_33(SFI020Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI033> lstRtn = new ArrayList<SFI033>(0);
        SFI033 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03939_M(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SFI033();

                objRtn.SMI = rs01.getString("SMI");
                objRtn.RSN = rs01.getInt("RSN");
                objRtn.SFI = rs01.getString("SFI");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BAIR2 = rs01.getString("BAIR2");
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BDAIR2 = rs01.getString("BDAIR2");
                objRtn.BCODE = rs01.getInt("BCODE");
                objRtn.BNUMBER = rs01.getString("BNUMBER");
                objRtn.REJNUM = rs01.getString("REJNUM");
                objRtn.BKSNUM = rs01.getString("BKSNUM");
                objRtn.AIRNUM = rs01.getString("AIRNUM");
                objRtn.CPNNUM = rs01.getString("CPNNUM");
                objRtn.TKTNUM = rs01.getString("TKTNUM");
                objRtn.DCHEQ = rs01.getString("DCHEQ");
                objRtn.FROMCPN = rs01.getString("FROMCPN");
                objRtn.TOCPN = rs01.getString("TOCPN");
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BDATE2 = rs01.getString("BDATE2");
                objRtn.PERNUM = rs01.getString("PERNUM");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                
                objRtn.TGROSSB = rs01.getDouble("TGROSSB");
                objRtn.TTAXB = rs01.getDouble("TTAXB");
                objRtn.TISC = rs01.getDouble("TISC");
                objRtn.TOTHC = rs01.getDouble("TOTHC");
                objRtn.HFEEAM = rs01.getDouble("HFEEAM");
                objRtn.NET = rs01.getDouble("NET");
                objRtn.SOURCOD = rs01.getString("SOURCOD");
                objRtn.TVAT = rs01.getDouble("TVAT");
                
                objRtn.TGROSSBSG = rs01.getString("TGROSSBSG");
                if(objRtn.TGROSSBSG.trim().equals("M")){
                    objRtn.TGROSSB = objRtn.TGROSSB * -1;
                }
                
                objRtn.TTAXBSG = rs01.getString("TTAXBSG");
                if(objRtn.TTAXBSG.trim().equals("M")){
                    objRtn.TTAXB = objRtn.TTAXB * -1;
                }
                
                objRtn.TISCSG = rs01.getString("TISCSG");
                if(objRtn.TISCSG.trim().equals("M")){
                    objRtn.TISC = objRtn.TISC * -1;
                }
                
                objRtn.TOTHCSG = rs01.getString("TOTHCSG");
                if(objRtn.TOTHCSG.trim().equals("M")){
                    objRtn.TOTHC = objRtn.TOTHC * -1;
                }
                
                objRtn.HFEEAMSG = rs01.getString("HFEEAMSG");
                if(objRtn.HFEEAMSG.trim().equals("M")){
                    objRtn.HFEEAM = objRtn.HFEEAM * -1;
                }
                
                objRtn.NETSG = rs01.getString("NETSG");
                if(objRtn.NETSG.trim().equals("M")){
                    objRtn.NET = objRtn.NET * -1;
                }
                
                objRtn.TVATSG = rs01.getString("TVATSG");
                if(objRtn.TVATSG.trim().equals("M")){
                    objRtn.TVAT = objRtn.TVAT * -1;
                }

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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
    
    // ------------------------------- SFI 41 ------------------------------------------------------
    public List<SFI041> loadPX538_register_41(SFI020Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI041> lstRtn = new ArrayList<SFI041>(0);
        SFI041 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03938_M(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SFI041();

                objRtn.TKTNUM = rs01.getString("TKTNUM");
                objRtn.TKTNUM2 = rs01.getString("TKTNUM2");
                objRtn.TAXCODE1 = rs01.getString("TAXCODE1");
                objRtn.TAXBILED1 = rs01.getDouble("TAXBILED1");
                objRtn.CPNNUM = rs01.getString("CPNNUM");
                objRtn.CPNNUM2 = rs01.getString("CPNNUM2");
                
                objRtn.FLIGHTD = rs01.getString("FLIGHTD");
                objRtn.FROMCPN = rs01.getString("FROMCPN");
                objRtn.TOCPN = rs01.getString("TOCPN");

                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BDATE2 = rs01.getString("BDATE2");
                objRtn.PERNUM = rs01.getString("PERNUM");
                
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BDAIR2 = rs01.getString("BDAIR2");
                
                objRtn.CODE_YQ = rs01.getString("CODE_YQ");
                objRtn.CODE_YR = rs01.getString("CODE_YR");
                objRtn.AMOUNT_YQ = rs01.getDouble("AMOUNT_YQ");
                objRtn.AMOUNT_YR = rs01.getDouble("AMOUNT_YR");
                
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                
                objRtn.SIGN_TAX = rs01.getString("SIGN_TAX");
                if(objRtn.SIGN_TAX.trim().equals("M")){
                    objRtn.TAXBILED1 = objRtn.TAXBILED1 * -1;
                }
                
                objRtn.SIGN_YQ = rs01.getString("SIGN_YQ");
                if(objRtn.SIGN_YQ.trim().equals("M")){
                    objRtn.AMOUNT_YQ = objRtn.AMOUNT_YQ * -1;
                }
                
                objRtn.SIGN_YR = rs01.getString("SIGN_YR");
                if(objRtn.SIGN_YR.trim().equals("M")){
                    objRtn.AMOUNT_YR = objRtn.AMOUNT_YR * -1;
                }
                

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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
    
    
    // ------------------------------- SFI 22 ------------------------------------------------------
    public List<SFI022> loadPX538_register_22(SFI020Filter filter) throws SQLException, Exception {
        List<SFI022> lstRtn = new ArrayList<SFI022>(0);
        SFI022 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04003(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);

            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SFI022();

//                objRtn.NAID = rs01.getLong("NAID");
//                objRtn.STCONS = rs01.getString("STCONS");
//                objRtn.SMI = rs01.getString("SMI");
//                objRtn.RSN = rs01.getString("RSN");
//                objRtn.SFI = rs01.getString("SFI");
//                objRtn.BDAIR = rs01.getString("BDAIR");
//                objRtn.BCODE = rs01.getInt("BCODE");
//                objRtn.BNUMBER = rs01.getString("BNUMBER");
//                objRtn.BATSEQ = rs01.getInt("BATSEQ");
//                objRtn.RECSEQ = rs01.getInt("RECSEQ");
//                objRtn.REASCOD = rs01.getString("REASCOD");
//                objRtn.OURREF = rs01.getString("OURREF");
//                objRtn.REFNUM = rs01.getString("REFNUM");
//                objRtn.FIMNUM = rs01.getString("FIMNUM");
//                objRtn.FIMCPNUM = rs01.getString("FIMCPNUM");
//                objRtn.YBNUMBER = rs01.getString("YBNUMBER");
//                objRtn.YBDATE = rs01.getString("YBDATE");
                
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.PERNUM = rs01.getString("PERNUM");
                objRtn.SOURCOD = rs01.getString("SOURCOD");
                objRtn.BCMNUM = rs01.getString("BCMNUM");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                
                objRtn.TGROSS = rs01.getDouble("TGROSS");
                objRtn.TISC = rs01.getDouble("TISC");
                objRtn.TOHCOM = rs01.getDouble("TOHCOM");
                objRtn.TUATP = rs01.getDouble("TUATP");
                objRtn.TTAX = rs01.getDouble("TTAX");
                objRtn.HFEEAM = rs01.getDouble("HFEEAM");
                objRtn.TVAT = rs01.getDouble("TVAT");
                objRtn.NET = rs01.getDouble("NET");
                
                objRtn.TGROSSG = rs01.getString("TGROSSG");
                if(objRtn.TGROSSG.trim().equals("M")){
                    objRtn.TGROSS = objRtn.TGROSS * -1;
                }
                
                objRtn.TISCSG = rs01.getString("TISCSG");
                if(objRtn.TISCSG.trim().equals("M")){
                    objRtn.TISC = objRtn.TISC * -1;
                }
                
                objRtn.TOHCOMSG = rs01.getString("TOHCOMSG");
                if(objRtn.TOHCOMSG.trim().equals("M")){
                    objRtn.TOHCOM = objRtn.TOHCOM * -1;
                }
                
                objRtn.TUATPSG = rs01.getString("TUATPSG");
                if(objRtn.TUATPSG.trim().equals("M")){
                    objRtn.TUATP = objRtn.TUATP * -1;
                }
                
                objRtn.TTAXSG = rs01.getString("TTAXSG");
                if(objRtn.TTAXSG.trim().equals("M")){
                    objRtn.TTAX = objRtn.TTAX * -1;
                }
                
                objRtn.HFEEAMSG = rs01.getString("HFEEAMSG");
                if(objRtn.HFEEAMSG.trim().equals("M")){
                    objRtn.HFEEAM = objRtn.HFEEAM * -1;
                }
                
                objRtn.TVATSG = rs01.getString("TVATSG");
                if(objRtn.TVATSG.trim().equals("M")){
                    objRtn.TVAT = objRtn.TVAT * -1;
                }
                
                objRtn.NETSG = rs01.getString("NETSG");
                if(objRtn.NETSG.trim().equals("M")){
                    objRtn.NET = objRtn.NET * -1;
                }

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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
    

}
