/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.interline;

import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ReasonCodeReportDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ReasonCodeReportDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ReasonCodeReportDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SFI021Filter> loadPX203SQP00157(SFI021Filter filter) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<SFI021Filter> lstRtn = new ArrayList<>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0,
                totTUATP = 0, totTNET = 0, totOTHER = 0;
        long totQTY = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        //</editor-fold>

        if (!filter.BDAIR.trim().equals("")) {
            filter.BDAIR = Functions.fillZeros(4, filter.BDAIR.trim());
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00157(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.trim().substring(2, 4) + filter.monthFrom.trim());
            cstmt01.setString(3, filter.yearTo.trim().substring(2, 4) + filter.monthTo.trim());
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.PERNUM.trim());
            cstmt01.setString(6, filter.BDAIR.trim());

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
                if (rs01.getString("TGROSSDSG").trim().equals("M")) {
                    totTGROSS += (rs01.getInt("TGROSSD") * -1);
                } else {
                    totTGROSS += (rs01.getInt("TGROSSD"));
                }
                if (rs01.getString("TISCDSG").trim().equals("M")) {
                    totTISC += (rs01.getDouble("TISCD") * -1);
                } else {
                    totTISC += rs01.getDouble("TISCD");
                }
                if (rs01.getString("TTAXDSG").trim().equals("M")) {
                    totTTAX += (rs01.getDouble("TTAXD") * -1);
                } else {
                    totTTAX += rs01.getDouble("TTAXD");
                }
                if (rs01.getString("TOTHCDSG").trim().equals("M")) {
                    totOTHER += (rs01.getDouble("TOTHCD") * -1);
                } else {
                    totOTHER += rs01.getDouble("TOTHCD");
                }
                if (rs01.getString("THDFDSG").trim().equals("M")) {
                    totHFEEAM += (rs01.getDouble("THDFD") * -1);
                } else {
                    totHFEEAM += rs01.getDouble("THDFD");
                }
                if (rs01.getString("TUATPDSG").trim().equals("M")) {
                    totTUATP += (rs01.getDouble("TUATPD") * -1);
                } else {
                    totTUATP += rs01.getDouble("TUATPD");
                }
                if (rs01.getString("TNETRSG").trim().equals("M")) {
                    totTNET += (rs01.getDouble("TNETR") * -1);
                } else {
                    totTNET += rs01.getDouble("TNETR");
                }
                totQTY += rs01.getLong("QTY");
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
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BDATE = rs01.getString("BDATE").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.PERNUM = rs01.getString("PERNUM").trim();
                    objRtn.BDAIR = filter.BDAIR.trim();
                    objRtn.BAIR = filter.BAIR.trim();
                    objRtn.TTRAN = "IB";

                    objRtn.TGROSSD = (rs01.getDouble("TGROSSD"));
                    objRtn.TISCD = (rs01.getDouble("TISCD"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXD"));
                    objRtn.THDFD = (rs01.getDouble("THDFD"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPD"));
                    objRtn.TNETR = (rs01.getDouble("TNETR"));
                    objRtn.TOTHCD = (rs01.getDouble("TOTHCD"));
                    objRtn.QTY = (rs01.getLong("QTY"));

                    objRtn.totQTY = totQTY;
                    objRtn.totHFEEAMD = totHFEEAM;
                    objRtn.totTGROSSD = totTGROSS;
                    objRtn.totTISCD = totTISC;
                    objRtn.totTNETD = totTNET;
                    objRtn.totTTAXD = totTTAX;
                    objRtn.totTUATPD = totTUATP;
                    objRtn.totOTHER = totOTHER;

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

    public List<SFI021Filter> loadPX203SQP00158(SFI021Filter filter, HashMap<String, String> hmAerolineas) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<SFI021Filter> lstRtn = new ArrayList<SFI021Filter>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0,
                totTUATP = 0, totTNET = 0, totOTHER = 0;
        long totQTY = 0;

        if (!filter.BDAIR.trim().equals("")) {
            filter.BDAIR = Functions.fillZeros(4, filter.BDAIR.trim());
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00158(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE.trim());
            cstmt01.setString(3, filter.PERNUM.trim());
            cstmt01.setString(4, filter.BDAIR.trim());

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
                if (rs01.getString("TGROSSDSG").trim().equals("M")) {
                    totTGROSS += (rs01.getInt("TGROSSD") * -1);
                } else {
                    totTGROSS += (rs01.getInt("TGROSSD"));
                }
                if (rs01.getString("TISCDSG").trim().equals("M")) {
                    totTISC += (rs01.getDouble("TISCD") * -1);
                } else {
                    totTISC += rs01.getDouble("TISCD");
                }
                if (rs01.getString("TTAXDSG").trim().equals("M")) {
                    totTTAX += (rs01.getDouble("TTAXD") * -1);
                } else {
                    totTTAX += rs01.getDouble("TTAXD");
                }
                if (rs01.getString("TOTHCDSG").trim().equals("M")) {
                    totOTHER += (rs01.getDouble("TOTHCD") * -1);
                } else {
                    totOTHER += rs01.getDouble("TOTHCD");
                }
                if (rs01.getString("THDFDSG").trim().equals("M")) {
                    totHFEEAM += (rs01.getDouble("THDFD") * -1);
                } else {
                    totHFEEAM += rs01.getDouble("THDFD");
                }
                if (rs01.getString("TUATPDSG").trim().equals("M")) {
                    totTUATP += (rs01.getDouble("TUATPD") * -1);
                } else {
                    totTUATP += rs01.getDouble("TUATPD");
                }
                if (rs01.getString("TNETRSG").trim().equals("M")) {
                    totTNET += (rs01.getDouble("TNETR") * -1);
                } else {
                    totTNET += rs01.getDouble("TNETR");
                }
                totQTY += rs01.getLong("QTY");
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
                    objRtn.BDATE = filter.BDATE.trim();
                    objRtn.strFormatDate = filter.strFormatDate.trim();
                    objRtn.PERNUM = filter.PERNUM.trim();
                    objRtn.BDAIR = filter.BDAIR.trim();
                    objRtn.TTRAN = "IB";

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BAIR = rs01.getString("BAIR").trim();
                    if (hmAerolineas != null && hmAerolineas.containsKey(objRtn.BAIR.trim().toUpperCase().substring(1))) {
                        objRtn.AIROWUSE = hmAerolineas.get(objRtn.BAIR.trim().toUpperCase().substring(1)).toString();
                        objRtn.BAIR = objRtn.BAIR + " - " + objRtn.AIROWUSE.trim();
                    }
                    objRtn.TGROSSD = (rs01.getDouble("TGROSSD"));
                    objRtn.TISCD = (rs01.getDouble("TISCD"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXD"));
                    objRtn.THDFD = (rs01.getDouble("THDFD"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPD"));
                    objRtn.TNETR = (rs01.getDouble("TNETR"));
                    objRtn.TOTHCD = (rs01.getDouble("TOTHCD"));
                    objRtn.QTY = (rs01.getLong("QTY"));

                    objRtn.totQTY = totQTY;
                    objRtn.totHFEEAMD = totHFEEAM;
                    objRtn.totTGROSSD = totTGROSS;
                    objRtn.totTISCD = totTISC;
                    objRtn.totTNETD = totTNET;
                    objRtn.totTTAXD = totTTAX;
                    objRtn.totTUATPD = totTUATP;
                    objRtn.totOTHER = totOTHER;

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
    
    public List<SFI021Filter> loadPX203SQP00159(SFI021Filter filter) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<SFI021Filter> lstRtn = new ArrayList<>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0,
                totTUATP = 0, totTNET = 0, totOTHER = 0;
        long totQTY = 0;

        if (!filter.BDAIR.trim().equals("")) {
            filter.BDAIR = Functions.fillZeros(4, filter.BDAIR.trim());
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00159(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE.trim());
            cstmt01.setString(3, filter.PERNUM.trim());
            cstmt01.setString(4, filter.BAIR.trim().substring(0, 4));

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
                if (rs01.getString("TGROSSDSG").trim().equals("M")) {
                    totTGROSS += (rs01.getInt("TGROSSD") * -1);
                } else {
                    totTGROSS += (rs01.getInt("TGROSSD"));
                }
                if (rs01.getString("TISCDSG").trim().equals("M")) {
                    totTISC += (rs01.getDouble("TISCD") * -1);
                } else {
                    totTISC += rs01.getDouble("TISCD");
                }
                if (rs01.getString("TTAXDSG").trim().equals("M")) {
                    totTTAX += (rs01.getDouble("TTAXD") * -1);
                } else {
                    totTTAX += rs01.getDouble("TTAXD");
                }
                if (rs01.getString("TOTHCDSG").trim().equals("M")) {
                    totOTHER += (rs01.getDouble("TOTHCD") * -1);
                } else {
                    totOTHER += rs01.getDouble("TOTHCD");
                }
                if (rs01.getString("THDFDSG").trim().equals("M")) {
                    totHFEEAM += (rs01.getDouble("THDFD") * -1);
                } else {
                    totHFEEAM += rs01.getDouble("THDFD");
                }
                if (rs01.getString("TUATPDSG").trim().equals("M")) {
                    totTUATP += (rs01.getDouble("TUATPD") * -1);
                } else {
                    totTUATP += rs01.getDouble("TUATPD");
                }
                if (rs01.getString("TNETRSG").trim().equals("M")) {
                    totTNET += (rs01.getDouble("TNETR") * -1);
                } else {
                    totTNET += rs01.getDouble("TNETR");
                }
                totQTY += rs01.getLong("QTY");
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
                    objRtn.BDATE = filter.BDATE.trim();
                    objRtn.strFormatDate = filter.strFormatDate.trim();
                    objRtn.PERNUM = filter.PERNUM.trim();
                    objRtn.BDAIR = filter.BDAIR.trim();
                    objRtn.BAIR = filter.BAIR.trim();
                    objRtn.TTRAN = "IB";

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.REASCOD = rs01.getString("REASCOD").trim();
                    if (rs01.getString("DESCRIP") != null && !rs01.getString("DESCRIP").trim().equals("-")) {
                        objRtn.REASCOD += " - " + rs01.getString("DESCRIP").trim();
                    }
                    objRtn.TGROSSD = (rs01.getDouble("TGROSSD"));
                    objRtn.TISCD = (rs01.getDouble("TISCD"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXD"));
                    objRtn.THDFD = (rs01.getDouble("THDFD"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPD"));
                    objRtn.TNETR = (rs01.getDouble("TNETR"));
                    objRtn.TOTHCD = (rs01.getDouble("TOTHCD"));
                    objRtn.QTY = (rs01.getLong("QTY"));

                    objRtn.totQTY = totQTY;
                    objRtn.totHFEEAMD = totHFEEAM;
                    objRtn.totTGROSSD = totTGROSS;
                    objRtn.totTISCD = totTISC;
                    objRtn.totTNETD = totTNET;
                    objRtn.totTTAXD = totTTAX;
                    objRtn.totTUATPD = totTUATP;
                    objRtn.totOTHER = totOTHER;

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
}
