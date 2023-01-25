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
import net.miatech.beans.A1462Filter2;
import net.miatech.beans.ReportEmdDetailsA1530Filter;
import net.miatech.beans.WRF070Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class GSACommisionReportDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public GSACommisionReportDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public GSACommisionReportDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<WRF070Filter> loadPX240S01(WRF070Filter filter) throws SQLException, Exception {
        List<WRF070Filter> list = new ArrayList<>();
        WRF070Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lngCupons = 0;
        double dblGross = 0, dblIsc = 0, dblTax = 0, dblNeto = 0, dblComm = 0, dblTotPer = 0, dblTotAvg = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00240(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            //cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(1, "139");
            cstmt.setString(2, filter.IN_TYPE);
            cstmt.setString(3, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(4, filter.IN_DATE_FROM.trim());
            cstmt.setString(5, filter.IN_DATE_TO.trim());
            cstmt.setString(6, filter.IN_MONED.trim());
            cstmt.setString(7, filter.IN_CAREA.trim());
            cstmt.setString(8, filter.IN_REGIO.trim());
            cstmt.setString(9, filter.IN_CPISO.trim());
            cstmt.setString(10, filter.IN_CCITY.trim());
            cstmt.setString(11, filter.IN_CIA.trim());
            cstmt.setString(12, filter.IN_GROUPA.trim());
            cstmt.setString(13, filter.IN_CZONA.trim());

//            System.out.println(session.getUserView().getCustomerInfo().CCUST);
//            System.out.println(filter.IN_TYPE);
//            System.out.println(Functions.getFechaActual().substring(0, 4));
//            System.out.println(filter.IN_DATE_FROM.trim());
//            System.out.println(filter.IN_DATE_TO.trim());
//            System.out.println(filter.IN_MONED.trim());
//            System.out.println(filter.IN_CAREA.trim());
//            System.out.println(filter.IN_REGIO.trim());
//            System.out.println(filter.IN_CPISO.trim());
//            System.out.println(filter.IN_CCITY.trim());
//            System.out.println(filter.IN_CIA.trim());
//            System.out.println(filter.IN_GROUPA.trim());
//            System.out.println(filter.IN_CZONA.trim());
            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lngCupons = rs01.getLong("QTYDOC");
                dblGross = rs01.getDouble("GROSS");
                dblIsc = rs01.getDouble("ISC");
                dblTax = rs01.getDouble("TAX");
                dblNeto = rs01.getDouble("NETO");
                dblComm = rs01.getDouble("COM");
                dblTotPer = (rs01.getDouble("COM") * 100) / rs01.getDouble("NETO");
                dblTotAvg = rs01.getDouble("GROSS") / rs01.getLong("QTYDOC");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF070Filter();
                    objRtn.IN_TYPE = filter.IN_TYPE;
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO;
                    objRtn.IN_CAREA = filter.IN_CAREA;
                    objRtn.IN_REGIO = filter.IN_REGIO;
                    objRtn.IN_MONED = filter.IN_MONED;
                    objRtn.IN_CPISO = filter.IN_CPISO;
                    objRtn.IN_CCITY = filter.IN_CCITY;
                    objRtn.IN_CIA = filter.IN_CIA;
                    objRtn.IN_GROUPA = filter.IN_GROUPA;
                    objRtn.IN_CZONA = filter.IN_CZONA;
                    if (filter.IN_TYPE.equals("1")) {
                        objRtn.IN_DATE = rs01.getString("DFLIGH").trim();
                        objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE);
                    } else {
                        objRtn.IN_DATE = rs01.getString("DSALES").trim();
                        objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE);
                    }
                    /*   if (!strTop.trim().equals("")) {
                     objRtn.intTop = Integer.parseInt(strTop);
                     }*/
                    objRtn.MONED = rs01.getString("MONED").trim();
                    objRtn.QTYDOC = rs01.getInt("QTYDOC");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.ISC = rs01.getDouble("ISC");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.COM = rs01.getDouble("COM");
                    objRtn.TAX = (objRtn.COM * 100) / objRtn.NETO;
                    objRtn.AVG = objRtn.GROSS / objRtn.QTYDOC;
                    objRtn.dblTotPer = dblTotPer;
                    objRtn.dblTotAvg = dblTotAvg;
                    objRtn.lngTotQdoc = lngCupons;
                    objRtn.dblTotGross = dblGross;
                    objRtn.dblTotIsc = dblIsc;
                    objRtn.dblTotTax = dblTax;
                    objRtn.dblTotNeto = dblNeto;
                    objRtn.dblTotCom = dblComm;
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

    public List<WRF070Filter> loadPX240S02(WRF070Filter filter) throws SQLException, Exception {
        List<WRF070Filter> list = new ArrayList<>();
        WRF070Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lngCupons = 0;
        double dblGross = 0, dblIsc = 0, dblTax = 0, dblNeto = 0, dblComm = 0, dblTotPer = 0, dblTotAvg = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00240S02(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            //cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(1, "139");
            cstmt.setString(2, filter.IN_TYPE);
            cstmt.setString(3, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(4, filter.IN_DATE_FROM.trim());
            cstmt.setString(5, filter.IN_DATE_TO.trim());
            cstmt.setString(6, filter.IN_MONED.trim());
            cstmt.setString(7, filter.IN_CAREA.trim());
            cstmt.setString(8, filter.IN_REGIO.trim());
            cstmt.setString(9, filter.IN_CPISO.trim());
            cstmt.setString(10, filter.IN_CCITY.trim());
            cstmt.setString(11, filter.IN_CIA.trim());
            cstmt.setString(12, filter.IN_GROUPA.trim());
            cstmt.setString(13, filter.IN_CZONA.trim());
            cstmt.setString(14, filter.IN_DATE.trim());

            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lngCupons = rs01.getLong("QTYDOC");
                dblGross = rs01.getDouble("GROSS");
                dblIsc = rs01.getDouble("ISC");
                dblTax = rs01.getDouble("TAX");
                dblNeto = rs01.getDouble("NETO");
                dblComm = rs01.getDouble("COM");
                dblTotPer = (rs01.getDouble("COM") * 100) / rs01.getDouble("NETO");
                dblTotAvg = rs01.getDouble("GROSS") / rs01.getLong("QTYDOC");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF070Filter();
                    objRtn.IN_TYPE = filter.IN_TYPE;
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO;
                    objRtn.IN_CAREA = filter.IN_CAREA;
                    objRtn.IN_REGIO = filter.IN_REGIO;
                    objRtn.IN_MONED = filter.IN_MONED;
                    objRtn.IN_CPISO = filter.IN_CPISO;
                    objRtn.IN_CCITY = filter.IN_CCITY;
                    //objRtn.IN_CIA=filter.IN_CIA;
                    objRtn.IN_GROUPA = filter.IN_GROUPA;
                    objRtn.IN_CZONA = filter.IN_CZONA;
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE);
                    /*   if (!strTop.trim().equals("")) {
                     objRtn.intTop = Integer.parseInt(strTop);
                     }*/
                    objRtn.IN_CIA = rs01.getString("CIA").trim();
                    objRtn.CIA = objRtn.IN_CIA;
                    objRtn.DES_CIA = rs01.getString("DES_CIA").trim();
                    objRtn.QTYDOC = rs01.getInt("QTYDOC");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.ISC = rs01.getDouble("ISC");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.COM = rs01.getDouble("COM");
                    if (objRtn.NETO > 0) {
                        objRtn.TAX = (objRtn.COM * 100) / objRtn.NETO;
                    }

                    if (objRtn.QTYDOC > 0) {
                        objRtn.AVG = objRtn.GROSS / objRtn.QTYDOC;
                    }

                    objRtn.dblTotPer = dblTotPer;
                    objRtn.dblTotAvg = dblTotAvg;
                    objRtn.lngTotQdoc = lngCupons;
                    objRtn.dblTotGross = dblGross;
                    objRtn.dblTotIsc = dblIsc;
                    objRtn.dblTotTax = dblTax;
                    objRtn.dblTotNeto = dblNeto;
                    objRtn.dblTotCom = dblComm;
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

    public List<A1462Filter2> loadPX240S01TKT(WRF070Filter filter) throws SQLException, Exception {
        List<A1462Filter2> list = new ArrayList<>();
        A1462Filter2 objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblGross = 0, dblIsc = 0, dblNeto = 0, dblComm = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00240S01TKT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            cstmt.setString(1, "139");
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TYPE);
            cstmt.setString(3, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(4, filter.IN_DATE_FROM.trim());
            cstmt.setString(5, filter.IN_DATE_TO.trim());
            cstmt.setString(6, filter.IN_MONED.trim());
            cstmt.setString(7, filter.IN_CAREA.trim());
            cstmt.setString(8, filter.IN_REGIO.trim());
            cstmt.setString(9, filter.IN_CPISO.trim());
            cstmt.setString(10, filter.IN_CCITY.trim());
            cstmt.setString(11, filter.IN_CIA.trim());
            cstmt.setString(12, filter.IN_GROUPA.trim());
            cstmt.setString(13, filter.IN_CZONA.trim());
            cstmt.setString(14, filter.IN_DATE.trim());

            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dblGross = rs01.getDouble("GROSS");
                dblIsc = rs01.getDouble("ISC");
                dblNeto = rs01.getDouble("NETO");
                dblComm = rs01.getDouble("COM");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1462Filter2();
                    objRtn.IN_TYPE = filter.IN_TYPE;
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO;
                    objRtn.IN_CAREA = filter.IN_CAREA;
                    objRtn.IN_REGIO = filter.IN_REGIO;
                    //objRtn.IN_MONED = filter.IN_MONED;
                    objRtn.A1462CPISO = filter.IN_CPISO;
                    // objRtn.IN_CCITY = filter.IN_CCITY;
                    objRtn.A1462CIA = filter.IN_CIA;
                    objRtn.IN_GROUPA = filter.IN_GROUPA;
                    objRtn.IN_CZONA = filter.IN_CZONA;
                    objRtn.IN_DATE = Functions.getMonthConvert(filter.IN_DATE);
                    // =============================================================
                    objRtn.IN_CIA = rs01.getString("A1462CIA").trim();
                    objRtn.A1462FORSE = rs01.getString("A1462FORSE").trim();
                    objRtn.A1462CPN = rs01.getString("A1462CPN").trim();
                    objRtn.IN_TKT = objRtn.IN_CIA + " " + objRtn.A1462FORSE + " " + objRtn.A1462CPN;
                    // =============================================================
                    objRtn.A1462ORIG = rs01.getString("A1462ORIG").trim();
                    objRtn.A1462DEST = rs01.getString("A1462DEST").trim();
                    objRtn.DES_AGENTE = objRtn.A1462ORIG + "-" + objRtn.A1462DEST;
                    objRtn.A1462CARR = rs01.getString("A1462CARR").trim();
                    objRtn.A1462NVLO = rs01.getString("A1462NVLO").trim();
                    objRtn.A1462FVLO = rs01.getString("A1462FVLO").trim();
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.A1462FVLO);
                    objRtn.IN_CCITY = rs01.getString("A1462CCITY").trim();
                    objRtn.IN_CPISO = rs01.getString("A1462CPISO").trim();
                    objRtn.A1462CTEMI = rs01.getString("A1462CTEMI").trim();
                    objRtn.A1462PSEMI = rs01.getString("A1462PSEMI").trim();
                    objRtn.A1462CTVTA = rs01.getString("A1462CTVTA").trim();
                    objRtn.A1462PSVTA = rs01.getString("A1462PSVTA").trim();
                    objRtn.A1462CTORI = rs01.getString("A1462CTORI").trim();
                    objRtn.A1462PSORI = rs01.getString("A1462PSORI").trim();
                    objRtn.IN_MONED = rs01.getString("A1462MONED").trim();
                    objRtn.A1462NTCOM = rs01.getDouble("A1462NTCOM");
                    objRtn.A1462GROSS = rs01.getDouble("A1462GROSS");
                    objRtn.A1462ISC = rs01.getDouble("A1462ISC");
                    objRtn.A1462COMIS = rs01.getDouble("A1462COMIS");
                    // =============================================================
                    objRtn.dblTotGross = dblGross;
                    objRtn.dblTotIsc = dblIsc;
                    objRtn.dblTotNeto = dblNeto;
                    objRtn.dblTotCom = dblComm;
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

    public List<WRF070Filter> loadPX240S03(WRF070Filter filter) throws SQLException, Exception {
        List<WRF070Filter> list = new ArrayList<>();
        WRF070Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lngCupons = 0;
        double dblGross = 0, dblIsc = 0, dblTax = 0, dblNeto = 0, dblComm = 0, dblTotPer = 0, dblTotAvg = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00240S03(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            cstmt.setString(1, "139");
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TYPE);
            cstmt.setString(3, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(4, filter.IN_DATE_FROM.trim());
            cstmt.setString(5, filter.IN_DATE_TO.trim());
            cstmt.setString(6, filter.IN_MONED.trim());
            cstmt.setString(7, filter.IN_CAREA.trim());
            cstmt.setString(8, filter.IN_REGIO.trim());
            cstmt.setString(9, filter.IN_CPISO.trim());
            cstmt.setString(10, filter.IN_CCITY.trim());
            cstmt.setString(11, filter.IN_CIA.trim());
            cstmt.setString(12, filter.IN_GROUPA.trim());
            cstmt.setString(13, filter.IN_CZONA.trim());
            cstmt.setString(14, filter.IN_DATE.trim());

            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lngCupons = rs01.getLong("QTYDOC");
                dblGross = rs01.getDouble("GROSS");
                dblIsc = rs01.getDouble("ISC");
                dblTax = rs01.getDouble("TAX");
                dblNeto = rs01.getDouble("NETO");
                dblComm = rs01.getDouble("COM");
                dblTotPer = (rs01.getDouble("COM") * 100) / rs01.getDouble("NETO");
                dblTotAvg = rs01.getDouble("GROSS") / rs01.getLong("QTYDOC");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF070Filter();
                    objRtn.IN_TYPE = filter.IN_TYPE;
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO;
                    objRtn.IN_CAREA = filter.IN_CAREA;
                    objRtn.IN_REGIO = filter.IN_REGIO;
                    objRtn.IN_MONED = filter.IN_MONED;
                    objRtn.CPISO = filter.IN_CPISO;
                    objRtn.IN_CCITY = filter.IN_CCITY;
                    objRtn.IN_CIA = filter.IN_CIA;
                    objRtn.IN_GROUPA = filter.IN_GROUPA;
                    objRtn.IN_CZONA = filter.IN_CZONA;
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE);
                    /*   if (!strTop.trim().equals("")) {
                     objRtn.intTop = Integer.parseInt(strTop);
                     }*/
                    objRtn.IN_CPISO = rs01.getString("CPISO").trim();
                    objRtn.DES_CPISO = rs01.getString("DES_CPISO").trim();
                    objRtn.QTYDOC = rs01.getInt("QTYDOC");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.ISC = rs01.getDouble("ISC");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.COM = rs01.getDouble("COM");
                    objRtn.TAX = (objRtn.COM * 100) / objRtn.NETO;
                    objRtn.AVG = objRtn.GROSS / objRtn.QTYDOC;
                    objRtn.dblTotPer = dblTotPer;
                    objRtn.dblTotAvg = dblTotAvg;
                    objRtn.lngTotQdoc = lngCupons;
                    objRtn.dblTotGross = dblGross;
                    objRtn.dblTotIsc = dblIsc;
                    objRtn.dblTotTax = dblTax;
                    objRtn.dblTotNeto = dblNeto;
                    objRtn.dblTotCom = dblComm;
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

    public List<WRF070Filter> loadPX240S04(WRF070Filter filter) throws SQLException, Exception {
        List<WRF070Filter> list = new ArrayList<>();
        WRF070Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lngCupons = 0;
        double dblGross = 0, dblIsc = 0, dblTax = 0, dblNeto = 0, dblComm = 0, dblTotPer = 0, dblTotAvg = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00240S04(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            cstmt.setString(1, "139");
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TYPE);
            cstmt.setString(3, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(4, filter.IN_DATE_FROM.trim());
            cstmt.setString(5, filter.IN_DATE_TO.trim());
            cstmt.setString(6, filter.IN_MONED.trim());
            cstmt.setString(7, filter.IN_CAREA.trim());
            cstmt.setString(8, filter.IN_REGIO.trim());
            cstmt.setString(9, filter.IN_CPISO.trim());
            cstmt.setString(10, filter.IN_CCITY.trim());
            cstmt.setString(11, filter.IN_CIA.trim());
            cstmt.setString(12, filter.IN_GROUPA.trim());
            cstmt.setString(13, filter.IN_CZONA.trim());
            cstmt.setString(14, filter.IN_DATE.trim());

            System.out.println(session.getUserView().getCustomerInfo().CCUST);
            System.out.println(filter.IN_TYPE);
            System.out.println(Functions.getFechaActual().substring(0, 4));
            System.out.println(filter.IN_DATE_FROM.trim());
            System.out.println(filter.IN_DATE_TO.trim());
            System.out.println(filter.IN_MONED.trim());
            System.out.println(filter.IN_CAREA.trim());
            System.out.println(filter.IN_REGIO.trim());
            System.out.println(filter.IN_CPISO.trim());
            System.out.println(filter.IN_CCITY.trim());
            System.out.println(filter.IN_CIA.trim());
            System.out.println(filter.IN_GROUPA.trim());
            System.out.println(filter.IN_CZONA.trim());
            System.out.println(filter.IN_DATE.trim());

            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lngCupons = rs01.getLong("QTYDOC");
                dblGross = rs01.getDouble("GROSS");
                dblIsc = rs01.getDouble("ISC");
                dblTax = rs01.getDouble("TAX");
                dblNeto = rs01.getDouble("NETO");
                dblComm = rs01.getDouble("COM");
                dblTotPer = (rs01.getDouble("COM") * 100) / rs01.getDouble("NETO");
                dblTotAvg = rs01.getDouble("GROSS") / rs01.getLong("QTYDOC");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new WRF070Filter();
                    objRtn.IN_TYPE = filter.IN_TYPE;
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO;
                    objRtn.IN_CAREA = filter.IN_CAREA;
                    objRtn.IN_REGIO = filter.IN_REGIO;
                    objRtn.IN_MONED = filter.IN_MONED;
                    objRtn.IN_CPISO = filter.IN_CPISO;
                    objRtn.IN_CCITY = filter.IN_CCITY;
                    objRtn.IN_CIA = filter.IN_CIA;
                    // objRtn.IN_GROUPA=filter.IN_GROUPA;
                    objRtn.IN_CZONA = filter.IN_CZONA;
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE);
                    // objRtn.GROUPA = rs01.getString("GROUPA").trim();
                    objRtn.IN_GROUPA = rs01.getString("GROUPA").trim();
                    objRtn.GROUPA = objRtn.IN_GROUPA;
                    objRtn.QTYDOC = rs01.getInt("QTYDOC");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.ISC = rs01.getDouble("ISC");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.COM = rs01.getDouble("COM");
                    if (objRtn.NETO > 0) {
                        objRtn.TAX = (objRtn.COM * 100) / objRtn.NETO;
                    }
                    if (objRtn.QTYDOC > 0) {
                        objRtn.AVG = objRtn.GROSS / objRtn.QTYDOC;
                    }

                    objRtn.dblTotPer = dblTotPer;
                    objRtn.dblTotAvg = dblTotAvg;
                    objRtn.lngTotQdoc = lngCupons;
                    objRtn.dblTotGross = dblGross;
                    objRtn.dblTotIsc = dblIsc;
                    objRtn.dblTotTax = dblTax;
                    objRtn.dblTotNeto = dblNeto;
                    objRtn.dblTotCom = dblComm;
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

    public List<A1462Filter2> loadPX240S02LIQUI(WRF070Filter filter) throws SQLException, Exception {
        List<A1462Filter2> list = new ArrayList<>();
        A1462Filter2 objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblComm = 0;
        int intcpn = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00240S02LIQUI(?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "139");
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_MONED.trim());
            cstmt.setString(3, filter.IN_CAREA.trim());
            cstmt.setString(4, filter.IN_REGIO.trim());
            cstmt.setString(5, filter.IN_CPISO.trim());
            cstmt.setString(6, filter.IN_CCITY.trim());
            cstmt.setString(7, filter.IN_CIA.trim());
            cstmt.setString(8, filter.IN_GROUPA.trim());
            cstmt.setString(9, filter.IN_CZONA.trim());
            cstmt.setString(10, filter.IN_DATE.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dblComm = rs01.getDouble("COMIS");
                intcpn = rs01.getInt("QTY");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1462Filter2();
                    objRtn.IN_CAREA = filter.IN_CAREA;
                    objRtn.IN_REGIO = filter.IN_REGIO;
                    objRtn.IN_MONED = filter.IN_MONED;
                    objRtn.IN_CPISO = filter.IN_CPISO;
                    objRtn.IN_CCITY = filter.IN_CCITY;
                    objRtn.IN_CIA = filter.IN_CIA;
                    objRtn.IN_CZONA = filter.IN_CZONA;
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE).trim();
                    // =============================================================
                    objRtn.IN_GROUPA = rs01.getString("A1462GROUP").trim();
                    objRtn.RN = rs01.getLong("QTY");
                    objRtn.A1462COMIS = rs01.getDouble("COMIS");
                    objRtn.dblTotCom = dblComm;
                    objRtn.QTYDOC = intcpn;
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

    public List<A1462Filter2> loadPX240S01POLIZ(WRF070Filter filter) throws SQLException, Exception {
        List<A1462Filter2> list = new ArrayList<>();
        A1462Filter2 objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblComm = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00240S01POLIZ(?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "139");
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_MONED.trim());
            cstmt.setString(3, filter.IN_CAREA.trim());
            cstmt.setString(4, filter.IN_REGIO.trim());
            cstmt.setString(5, filter.IN_CPISO.trim());
            cstmt.setString(6, filter.IN_CCITY.trim());
            cstmt.setString(7, filter.IN_CIA.trim());
            cstmt.setString(8, filter.IN_GROUPA.trim());
            cstmt.setString(9, filter.IN_CZONA.trim());
            cstmt.setString(10, filter.IN_DATE.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dblComm = rs01.getDouble("COMIS");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1462Filter2();
                    objRtn.IN_CAREA = filter.IN_CAREA;
                    objRtn.IN_REGIO = filter.IN_REGIO;
                    objRtn.IN_MONED = filter.IN_MONED;
                    objRtn.IN_CPISO = filter.IN_CPISO;
                    objRtn.IN_CCITY = filter.IN_CCITY;
                    objRtn.IN_CIA = filter.IN_CIA;
                    objRtn.IN_GROUPA = filter.IN_GROUPA;
                    objRtn.IN_CZONA = filter.IN_CZONA;
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_DATE_FROM = Functions.getMonthConvert(objRtn.IN_DATE).trim();
                    // =============================================================
                    objRtn.strDATE = Functions.getFechaActual().substring(0, 4) + "/" + Functions.getFechaActual().substring(4, 6) + "/" + Functions.getFechaActual().substring(6, 8);
                    objRtn.A1462CPISO = rs01.getString("A1462CPISO").trim() + " - " + rs01.getString("DES_CPISO").trim();
                    objRtn.A1462CTACO = rs01.getString("A1462CTACO").trim();
                    objRtn.DES_FTE = "Sobrecomm GSA S/VTAS Interlinea";
                    objRtn.A1462COMIS = rs01.getDouble("COMIS");
                    objRtn.DES_CPISO = "VN COMMINTL" + "  " + objRtn.IN_DATE_FROM;
                    objRtn.IN_TKT = session.getUserView().getUserInfo().USR;
                    objRtn.dblTotCom = dblComm;
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

    //DETALLE DE AGENTE
    public List<A1462Filter2> loadPX240S01LIQUI(A1462Filter2 filter) throws SQLException, Exception {
        List<A1462Filter2> list = new ArrayList<>();
        A1462Filter2 objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblComm = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00240S01LIQUI(?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(1, "139");
            cstmt.setString(2, filter.IN_MONED.trim());
            cstmt.setString(3, filter.IN_CAREA.trim());
            cstmt.setString(4, filter.IN_REGIO.trim());
            cstmt.setString(5, filter.IN_CPISO.trim());
            cstmt.setString(6, filter.IN_CCITY.trim());
            cstmt.setString(7, filter.IN_CIA.trim());
            cstmt.setString(8, filter.IN_GROUPA.trim());
            cstmt.setString(9, filter.IN_CZONA.trim());
            cstmt.setString(10, filter.IN_DATE.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();    
            while (rs01.next()) {
                dblComm = rs01.getDouble("COMIS");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1462Filter2();
                    objRtn.IN_CAREA = filter.IN_CAREA;
                    objRtn.IN_REGIO = filter.IN_REGIO;
                    objRtn.IN_MONED = filter.IN_MONED;
                    // objRtn.IN_CPISO = filter.IN_CPISO;
                    objRtn.IN_CCITY = filter.IN_CCITY;
                    //  objRtn.IN_CIA = filter.IN_CIA;
                    objRtn.IN_GROUPA = filter.IN_GROUPA;
                    objRtn.IN_CZONA = filter.IN_CZONA;
                    objRtn.IN_DATE = filter.IN_DATE;
                    // =============================================================
                    objRtn.IN_DATE_FROM = Functions.getMonthConvert(objRtn.IN_DATE).trim();
                    objRtn.strDATE = Functions.getFechaActual().substring(0, 4) + "/" + Functions.getFechaActual().substring(4, 6) + "/" + Functions.getFechaActual().substring(6, 8);
                    objRtn.A1462CPISO = rs01.getString("A1462CPISO").trim() + "-" + rs01.getString("DES_CPISO").trim();
                    objRtn.IN_CPISO = rs01.getString("A1462CPISO").trim();
                    objRtn.A1462CIA = rs01.getString("A1462CIA").trim() + "-" + rs01.getString("DES_CIA").trim();
                    objRtn.IN_CIA = rs01.getString("A1462CIA").trim();
                    objRtn.DES_FTE = "Ventas Interlineales";
                    objRtn.A1462COMIS = rs01.getDouble("COMIS");
                    objRtn.IN_TKT = session.getUserView().getUserInfo().USR;
                    objRtn.A1462RCOMI = rs01.getDouble("RATECOM");
                    objRtn.RN = rs01.getLong("QTY");
                    objRtn.dblTotCom = dblComm;
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
    
    public List<A1462Filter2> loadPX240S03LIQUI(A1462Filter2 filter) throws SQLException, Exception {
        List<A1462Filter2> list = new ArrayList<>();
        A1462Filter2 objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblComm = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00240S03LIQUI(?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(1, "139");    
            cstmt.setString(2, filter.IN_MONED.trim());
            cstmt.setString(3, filter.IN_CAREA.trim());
            cstmt.setString(4, filter.IN_REGIO.trim());
            cstmt.setString(5, filter.IN_CPISO.trim());
            cstmt.setString(6, filter.IN_CCITY.trim());
            cstmt.setString(7, filter.IN_CIA.trim());
            cstmt.setString(8, filter.IN_GROUPA.trim());
            cstmt.setString(9, filter.IN_CZONA.trim());
            cstmt.setString(10, filter.IN_DATE.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dblComm = rs01.getDouble("COMIS");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1462Filter2();
                    objRtn.IN_CAREA = filter.IN_CAREA;
                    objRtn.IN_REGIO = filter.IN_REGIO;
                    objRtn.IN_MONED = filter.IN_MONED;
                    objRtn.IN_CPISO = filter.IN_CPISO;
                    objRtn.IN_CCITY = filter.IN_CCITY;
                    objRtn.IN_CIA = filter.IN_CIA;
                    objRtn.IN_GROUPA = filter.IN_GROUPA;
                    objRtn.IN_CZONA = filter.IN_CZONA;
                    objRtn.IN_DATE = filter.IN_DATE;
                    // =============================================================
                    objRtn.IN_DATE_FROM = Functions.getMonthConvert(objRtn.IN_DATE).trim();
                    objRtn.strDATE = Functions.getFechaActual().substring(0, 4) + "/" + Functions.getFechaActual().substring(4, 6) + "/" + Functions.getFechaActual().substring(6, 8);
                    objRtn.DES_CIA = rs01.getString("A1462CIA").trim() + "-" + rs01.getString("DES_CIA").trim();
                    objRtn.DES_FTE = "Ventas Interlineales";
                    objRtn.A1462COMIS = rs01.getDouble("COMIS");
                    objRtn.A1462CPISO = session.getUserView().getUserInfo().USR;
                    objRtn.A1462RCOMI = rs01.getDouble("RATECOM");
                    objRtn.A1462CIA = rs01.getString("A1462CIA").trim();
                    objRtn.A1462FORSE = rs01.getString("A1462FORSE").trim();
                    objRtn.A1462CPN = rs01.getString("A1462CPN").trim();
                    objRtn.IN_TKT = objRtn.A1462CIA + " " + objRtn.A1462FORSE + " " + objRtn.A1462CPN;
                    objRtn.A1462ORIG = rs01.getString("A1462ORIG").trim();
                    objRtn.A1462DEST = rs01.getString("A1462DEST").trim();
                    objRtn.DES_AGENTE = objRtn.A1462ORIG + "-" + objRtn.A1462DEST;
                    objRtn.dblTotCom = dblComm;
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
}
