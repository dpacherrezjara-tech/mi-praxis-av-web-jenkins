/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1745Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class RevenueFlightDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public RevenueFlightDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RevenueFlightDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1745Filter> loadPX078S01A1745(A1745Filter filter, String tipo) throws SQLException, Exception {

        List<A1745Filter> lstRtn = new ArrayList<>(0);
        A1745Filter objRtn;
        int TOTSumPAX = 0, TOTQTY_EMD = 0;
        double TOTSumING = 0, TOTEMD = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //PX07800001
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX078S01A1745(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_CARRIER);
            cstmt01.setString(5, filter.FFLOW);
            cstmt01.setString(6, tipo);
            cstmt01.setString(7, Functions.getFechaActual());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                TOTSumPAX = rs01.getInt("TOTSumPAX");
                TOTSumING = rs01.getDouble("TOTSumING");
                TOTQTY_EMD = rs01.getInt("QCPNEMD");
                TOTEMD = rs01.getDouble("TOTEMD");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int pos = 0;
                while (rs01.next()) {
                    pos++;
                    //FUENTE,MENSA
                    objRtn = new A1745Filter();
                    objRtn.RN = pos;
                    //objRtn.CCUST="139";
                    objRtn.FECHA = rs01.getString("FECHA");
                    objRtn.FFLOW = rs01.getString("FFLOW");
                    if (objRtn.FFLOW.equals("P")) {
                        objRtn.strDescr_FFLOW = "Scheduled";
                    } else if (objRtn.FFLOW.equals("C")) {
                        objRtn.strDescr_FFLOW = "Charter";
                    } else if (objRtn.FFLOW.equals("X")) {
                        objRtn.strDescr_FFLOW = "Canceled";
                    } else if (objRtn.FFLOW.equals("U")) {
                        objRtn.strDescr_FFLOW = "Unscheduled";
                    }
                    objRtn.CARR = rs01.getString("CARR");
                    if (objRtn.CARR.equals("AM")) {
                        objRtn.strDescCarrier = "Aeroméxico";
                    } else if (objRtn.CARR.equals("5D")) {
                        objRtn.strDescCarrier = "AM Connect";
                    } else if (objRtn.CARR.equals("VW")) {
                        objRtn.strDescCarrier = "Aeromar";
                    } else {
                        objRtn.strDescCarrier = "(None)";
                    }
                    objRtn.CURREAM = "USD";
                    objRtn.strFormatDate = Functions.getMonthConvert(rs01.getString("FECHA"));
                    objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                    objRtn.SumPAX = rs01.getInt("SumPAX");
                    objRtn.SumING = rs01.getDouble("SumING");
                    objRtn.QTYEMD = rs01.getInt("QCPNEMD");
                    objRtn.TOTEMD = rs01.getDouble("TOTEMD");

                    objRtn.TOTSumPAX = TOTSumPAX;
                    objRtn.TOTSumING = TOTSumING;
                    objRtn.TotQTYEMD = TOTQTY_EMD;
                    objRtn.TotTOTEMD = TOTEMD;

                    lstRtn.add(objRtn);
                }
                /*objRtn = new A1745Filter();
                 objRtn.strFormatDate = "TOTAL";
                 objRtn.SumPAX = TOTSumPAX;
                 objRtn.SumING = TOTSumING;
                    
                 lstRtn.add(objRtn);*/
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

    public List<A1745Filter> loadPX078S02A1745(A1745Filter filter, String tipo) throws SQLException, Exception {
        List<A1745Filter> lstRtn = new ArrayList<A1745Filter>(0);
        A1745Filter objRtn;
        int totPAX = 0, TotFLIGHT = 0, TOTQTY_EMD = 0;
        double totINGPAX = 0, TOTEMD = 0;
        String fecha, formatFecha;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //PX07800002
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX078S02A1745(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA);
            cstmt01.setString(3, filter.CARR);
            cstmt01.setString(4, filter.FFLOW);
            cstmt01.setString(5, tipo);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totPAX = rs01.getInt("PAX");
                totINGPAX = rs01.getDouble("TOTPAX");
                TotFLIGHT = rs01.getInt("TotFLIGHT");
                TOTQTY_EMD = rs01.getInt("QCPNEMD");
                TOTEMD = rs01.getDouble("TOTEMD");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int pos = 0;
                while (rs01.next()) {
                    pos++;
                    //FUENTE,MENSA
                    fecha = rs01.getString("DFLIGHT");
                    formatFecha = Functions.getMonthConvert(rs01.getString("DFLIGHT"));

                    objRtn = new A1745Filter();
                    objRtn.DFLIGHT = fecha;
                    objRtn.FFLOW = rs01.getString("FFLOW");
                    if (objRtn.FFLOW.equals("P")) {
                        objRtn.strDescr_FFLOW = "Scheduled";
                    } else if (objRtn.FFLOW.equals("C")) {
                        objRtn.strDescr_FFLOW = "Charter";
                    } else if (objRtn.FFLOW.equals("X")) {
                        objRtn.strDescr_FFLOW = "Canceled";
                    } else if (objRtn.FFLOW.equals("U")) {
                        objRtn.strDescr_FFLOW = "Unscheduled";
                    }
                    objRtn.CARR = rs01.getString("CARR");
                    if (objRtn.CARR.equals("AM")) {
                        objRtn.strDescCarrier = "Aeroméxico";
                    } else if (objRtn.CARR.equals("5D")) {
                        objRtn.strDescCarrier = "AM Connect";
                    } else if (objRtn.CARR.equals("VW")) {
                        objRtn.strDescCarrier = "Aeromar";
                    } else {
                        objRtn.strDescCarrier = "(None)";
                    }
                    objRtn.CURREAM = "USD";
                    objRtn.strFormatDate = formatFecha;
                    objRtn.strDescTipo = "PAX";
                    objRtn.SumPAX = rs01.getInt("PAX");
                    objRtn.SumING = rs01.getDouble("TOTPAX");
                    objRtn.TotQTYFLIG = rs01.getInt("TotFLIGHT");
                    objRtn.QTYEMD = rs01.getInt("QCPNEMD");
                    objRtn.TOTEMD = rs01.getDouble("TOTEMD");

                    objRtn.TotFLIGHT = TotFLIGHT;
                    objRtn.TOTSumING = totINGPAX;
                    objRtn.TOTPAX = totPAX;
                    objRtn.TotQTYEMD = TOTQTY_EMD;
                    objRtn.TotTOTEMD = TOTEMD;
                    objRtn.TIPO = 1;

                    lstRtn.add(objRtn);
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

    public List<A1745Filter> loadPX078S03A1745(A1745Filter filter, String tipo) throws SQLException, Exception {
        List<A1745Filter> lstRtn = new ArrayList<A1745Filter>(0);
        A1745Filter objRtn;
        int totPAX = 0, totFlight = 0;
        double totINGPAX = 0;
        String fecha, formatFecha;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //PX07800003
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX078S03A1745(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            cstmt01.setString(3, filter.CARR);
            cstmt01.setString(4, filter.FFLOW);
            cstmt01.setString(5, tipo);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totPAX = rs01.getInt("QTYPAX") + rs01.getInt("QTYPAXO");
                totINGPAX = rs01.getDouble("TOTPAX") + rs01.getDouble("TOTPAXO");
                totFlight = rs01.getInt("TOTFLIGHT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int pos = 0;
                while (rs01.next()) {
                    pos++;
                    //FUENTE,MENSA
                    fecha = rs01.getString("DFLIGHT");
                    formatFecha = Functions.getMonthConvert(rs01.getString("DFLIGHT"));

                    objRtn = new A1745Filter();
                    objRtn.strDescStock = "139";
                    objRtn.DFLIGHT = fecha;
                    objRtn.FFLOW = rs01.getString("FFLOW");
                    if (objRtn.FFLOW.equals("P")) {
                        objRtn.strDescr_FFLOW = "Scheduled";
                    } else if (objRtn.FFLOW.equals("C")) {
                        objRtn.strDescr_FFLOW = "Charter";
                    } else if (objRtn.FFLOW.equals("X")) {
                        objRtn.strDescr_FFLOW = "Canceled";
                    } else if (objRtn.FFLOW.equals("U")) {
                        objRtn.strDescr_FFLOW = "Unscheduled";
                    }
                    objRtn.CARR = rs01.getString("CARR");
                    if (objRtn.CARR.equals("AM")) {
                        objRtn.strDescCarrier = "Aeroméxico";
                    } else if (objRtn.CARR.equals("5D")) {
                        objRtn.strDescCarrier = "AM Connect";
                    } else if (objRtn.CARR.equals("VW")) {
                        objRtn.strDescCarrier = "Aeromar";
                    } else {
                        objRtn.strDescCarrier = "(None)";
                    }
                    objRtn.CURREAM = "USD";
                    objRtn.strFormatDate = formatFecha;
                    objRtn.strDescTipo = "PAX";
                    objRtn.QTYPAX = rs01.getInt("QTYPAX");
                    objRtn.TOTPAX = rs01.getDouble("TOTPAX");
                    objRtn.QTYFLIG = rs01.getInt("QTYFLIG");
                    objRtn.SumPAX = totPAX;
                    objRtn.SumING = totINGPAX;
                    objRtn.TotFLIGHT = totFlight;

                    lstRtn.add(objRtn);

                    objRtn = new A1745Filter();
                    objRtn.strDescStock = "OAL";
                    objRtn.DFLIGHT = fecha;
                    objRtn.FFLOW = rs01.getString("FFLOW");
                    if (objRtn.FFLOW.equals("P")) {
                        objRtn.strDescr_FFLOW = "Scheduled";
                    } else if (objRtn.FFLOW.equals("C")) {
                        objRtn.strDescr_FFLOW = "Charter";
                    } else if (objRtn.FFLOW.equals("X")) {
                        objRtn.strDescr_FFLOW = "Canceled";
                    } else if (objRtn.FFLOW.equals("U")) {
                        objRtn.strDescr_FFLOW = "Unscheduled";
                    }
                    objRtn.CARR = rs01.getString("CARR");
                    if (objRtn.CARR.equals("AM")) {
                        objRtn.strDescCarrier = "Aeroméxico";
                    } else if (objRtn.CARR.equals("5D")) {
                        objRtn.strDescCarrier = "AM Connect";
                    } else if (objRtn.CARR.equals("VW")) {
                        objRtn.strDescCarrier = "Aeromar";
                    } else {
                        objRtn.strDescCarrier = "(None)";
                    }
                    objRtn.CURREAM = "USD";
                    objRtn.strFormatDate = formatFecha;
                    objRtn.strDescTipo = "PAX";
                    objRtn.QTYPAX = rs01.getInt("QTYPAXO");
                    objRtn.TOTPAX = rs01.getDouble("TOTPAXO");
                    //objRtn.QTYFLIG = rs01.getInt("QTYFLIGO");
                    objRtn.SumPAX = totPAX;
                    objRtn.SumING = totINGPAX;
                    objRtn.TotFLIGHT = totFlight;

                    lstRtn.add(objRtn);

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

    public List<A1745Filter> loadPX078S04A1745(A1745Filter filter, String tipo) throws SQLException, Exception {

        List<A1745Filter> lstRtn = new ArrayList<A1745Filter>(0);
        A1745Filter objRtn;
        int totPAX = 0;
        double totINGPAX = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //PX07800004
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX078S04A1745(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA);
            cstmt01.setString(3, filter.CARR);
            cstmt01.setString(4, filter.FFLOW);
            cstmt01.setString(5, tipo);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totPAX = rs01.getInt("QTYEMD");
                totINGPAX = rs01.getDouble("TOTEMD");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int pos = 0;
                while (rs01.next()) {
                    pos++;
                    objRtn = new A1745Filter();
                    objRtn.strDescTipo = "ALL FLIGHT";
                    objRtn.DFLIGHT = filter.FECHA;
                    objRtn.CURREAM = "USD";
                    objRtn.FFLOW = rs01.getString("FFLOW");
                    if (objRtn.FFLOW.equals("P")) {
                        objRtn.strDescr_FFLOW = "Scheduled";
                    } else if (objRtn.FFLOW.equals("C")) {
                        objRtn.strDescr_FFLOW = "Charter";
                    } else if (objRtn.FFLOW.equals("X")) {
                        objRtn.strDescr_FFLOW = "Canceled";
                    } else if (objRtn.FFLOW.equals("U")) {
                        objRtn.strDescr_FFLOW = "Unscheduled";
                    }
                    objRtn.CARR = rs01.getString("CARR");
                    if (objRtn.CARR.equals("AM")) {
                        objRtn.strDescCarrier = "Aeroméxico";
                    } else if (objRtn.CARR.equals("5D")) {
                        objRtn.strDescCarrier = "AM Connect";
                    } else if (objRtn.CARR.equals("VW")) {
                        objRtn.strDescCarrier = "Aeromar";
                    } else {
                        objRtn.strDescCarrier = "(None)";
                    }
                    objRtn.strDescStock = "";
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    objRtn.ZONA = rs01.getString("ZONA");
                    objRtn.strDescZONA = Functions.getNombreZonas(objRtn.ZONA);
                    objRtn.QTYPAX = rs01.getInt("QTYPAX");
                    objRtn.QTYPAXO = rs01.getInt("QTYPAXO");
                    objRtn.TOTPAX = rs01.getDouble("TOTPAX");
                    objRtn.TOTPAXO = rs01.getDouble("TOTPAXO");
                    objRtn.QTYEMD = rs01.getInt("QTYEMD");
                    objRtn.TOTEMD = rs01.getDouble("TOTEMD");
                    objRtn.QTYPAXO = rs01.getInt("QTYPAXO");
                    objRtn.TOTPAXO = rs01.getDouble("TOTPAXO");

                    objRtn.QTYFLIG = rs01.getInt("QTYFLIG");
                    //objRtn.QTYFLIGO = rs01.getInt("QTYFLIGO");
                    objRtn.TotFLIGHT = objRtn.QTYFLIG + objRtn.QTYFLIGO;

                    /*objRtn.SumPAX = objRtn.QTYPAX + objRtn.QTYPAXO + objRtn.QTYEMD;
                     objRtn.SumING = objRtn.TOTPAX + objRtn.TOTPAXO + objRtn.TOTEMD;*/
                    objRtn.SumPAX = objRtn.QTYPAX + objRtn.QTYPAXO;
                    objRtn.SumING = objRtn.TOTPAX + objRtn.TOTPAXO;

                    lstRtn.add(objRtn);
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

    public List<A1745Filter> loadPX078S04A1745_3(A1745Filter filter, String tipo) throws SQLException, Exception {

        List<A1745Filter> lstRtn = new ArrayList<>(0);

        A1745Filter objRtn;
        int totQTYPAX = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //PX07800004
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX078S04A1745_3(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA);
            cstmt01.setString(3, filter.CARR);
            cstmt01.setString(4, filter.FFLOW);
            cstmt01.setString(5, filter.ZONA);
            cstmt01.setString(6, tipo);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totQTYPAX = rs01.getInt("QTYPAX");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int pos = 0;
                while (rs01.next()) {
                    pos++;
                    objRtn = new A1745Filter();
                    objRtn.strDescTipo = "ALL FLIGHT";
                    objRtn.DFLIGHT = filter.FECHA;
                    objRtn.CURREAM = "USD";
                    objRtn.FFLOW = rs01.getString("FFLOW");
                    if (objRtn.FFLOW.equals("P")) {
                        objRtn.strDescr_FFLOW = "Scheduled";
                    } else if (objRtn.FFLOW.equals("C")) {
                        objRtn.strDescr_FFLOW = "Charter";
                    } else if (objRtn.FFLOW.equals("X")) {
                        objRtn.strDescr_FFLOW = "Canceled";
                    } else if (objRtn.FFLOW.equals("U")) {
                        objRtn.strDescr_FFLOW = "Unscheduled";
                    }
                    objRtn.CARR = rs01.getString("CARR");
                    if (objRtn.CARR.equals("AM")) {
                        objRtn.strDescCarrier = "Aeroméxico";
                    } else if (objRtn.CARR.equals("5D")) {
                        objRtn.strDescCarrier = "AM Connect";
                    } else if (objRtn.CARR.equals("VW")) {
                        objRtn.strDescCarrier = "Aeromar";
                    } else {
                        objRtn.strDescCarrier = "(None)";
                    }
                    objRtn.strDescStock = "";
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    objRtn.ZONA = rs01.getString("ZONA");
                    objRtn.strDescZONA = Functions.getNombreZonas(objRtn.ZONA);
                    objRtn.QTYPAX = rs01.getInt("QTYPAX");
                    objRtn.QTYPAXO = rs01.getInt("QTYPAXO");
                    objRtn.TOTPAX = rs01.getDouble("TOTPAX");
                    objRtn.TOTPAXO = rs01.getDouble("TOTPAXO");
                    objRtn.QTYEMD = rs01.getInt("QTYEMD");
                    objRtn.TOTEMD = rs01.getDouble("TOTEMD");
                    objRtn.QTYPAXO = rs01.getInt("QTYPAXO");
                    objRtn.TOTPAXO = rs01.getDouble("TOTPAXO");

                    objRtn.QTYFLIG = rs01.getInt("QTYFLIG");
                    //objRtn.QTYFLIGO = rs01.getInt("QTYFLIGO");
                    objRtn.TotFLIGHT = objRtn.QTYFLIG + objRtn.QTYFLIGO;

                    /*objRtn.SumPAX = objRtn.QTYPAX + objRtn.QTYPAXO + objRtn.QTYEMD;
                     objRtn.SumING = objRtn.TOTPAX + objRtn.TOTPAXO + objRtn.TOTEMD;*/
                    objRtn.SumPAX = objRtn.QTYPAX + objRtn.QTYPAXO;
                    objRtn.SumING = objRtn.TOTPAX + objRtn.TOTPAXO;

                    lstRtn.add(objRtn);
                }

            }
        } catch (Exception e) {
            System.out.println("-----");
            System.out.println(e.getMessage());
            System.out.println(e.getCause());
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

    public List<A1745Filter> loadPX078S05A1745(A1745Filter filter, String tipo) throws SQLException, Exception {

        //Para el Control Figures (PAX)
        List<A1745Filter> lstCons = new ArrayList<>(0);
        A1745Filter beanCons;
        double TOTPAX = 0, TOTPAXO = 0, TOTEMD = 0;
        long QTYPAX = 0, QTYFLIG = 0, QTYPAXO = 0, QTYFLIGO = 0, QTYEMD = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        //PX07800005
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX078S05A1745(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DFLIGHT);
            cstmt.setString(3, filter.ZONA);
            cstmt.setString(4, filter.CARR);
            cstmt.setString(5, filter.NFLIGHT);
            cstmt.setString(6, filter.FFLOW);
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

                QTYPAX = rst.getLong("QTYPAX");
                TOTPAX = rst.getDouble("TOTPAX");
                QTYFLIG = rst.getLong("QTYFLIG");
                QTYPAXO = rst.getLong("QTYPAXO");
                TOTPAXO = rst.getDouble("TOTPAXO");
                //QTYFLIGO = rst.getLong("QTYFLIGO");

                QTYEMD = rst.getLong("QTYEMD");
                TOTEMD = rst.getDouble("TOTEMD");
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanCons = new A1745Filter();
                    beanCons.strFormatDate2 = Functions.getMonthConvert(filter.DFLIGHT);
                    beanCons.DFLIGHT = rst.getString("DFLIGHT");
                    beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                    beanCons.NFLIGHT = rst.getString("NFLIGHT");
                    beanCons.ZONA = rst.getString("ZONA");
                    beanCons.FFLOW = rst.getString("FFLOW");
                    if (beanCons.FFLOW.equals("P")) {
                        beanCons.strDescr_FFLOW = "Scheduled";
                    } else if (beanCons.FFLOW.equals("C")) {
                        beanCons.strDescr_FFLOW = "Charter";
                    } else if (beanCons.FFLOW.equals("X")) {
                        beanCons.strDescr_FFLOW = "Canceled";
                    } else if (beanCons.FFLOW.equals("U")) {
                        beanCons.strDescr_FFLOW = "Unscheduled";
                    }
                    beanCons.CARR = rst.getString("CARR");
                    if (beanCons.CARR.equals("AM")) {
                        beanCons.strDescCarrier = "Aeroméxico";
                    } else if (beanCons.CARR.equals("5D")) {
                        beanCons.strDescCarrier = "AM Connect";
                    } else if (beanCons.CARR.equals("VW")) {
                        beanCons.strDescCarrier = "Aeromar";
                    } else {
                        beanCons.strDescCarrier = "(None)";
                    }
                    beanCons.CDEPART = rst.getString("CDEPART");
                    beanCons.CARRIVA = rst.getString("CARRIVA");
                    beanCons.CURREAM = rst.getString("CURRENCY");

                    beanCons.QTYPAX = rst.getInt("QTYPAX");
                    beanCons.TOTPAX = rst.getDouble("TOTPAX");
                    beanCons.QTYFLIG = rst.getInt("QTYFLIG");

                    beanCons.QTYPAXO = rst.getInt("QTYPAXO");
                    beanCons.TOTPAXO = rst.getDouble("TOTPAXO");
                    //beanCons.QTYFLIGO = rst.getInt("QTYFLIGO");

                    beanCons.QTYEMD = rst.getInt("QTYEMD");
                    beanCons.TOTEMD = rst.getDouble("TOTEMD");

                    beanCons.totQTYPAX = QTYPAX;
                    beanCons.totTOTPAX = TOTPAX;
                    beanCons.totQTYFLIG = QTYFLIG;
                    beanCons.totQTYPAXO = QTYPAXO;
                    beanCons.totTOTPAXO = TOTPAXO;
                    beanCons.totQTYFLIGO = QTYFLIGO;

                    beanCons.totQTYEMD = QTYEMD;
                    beanCons.totTOTEMD = TOTEMD;

                    beanCons.page.PAGNUM = filter.page.PAGNUM;
                    beanCons.page.PAGROW = filter.page.PAGROW;
                    beanCons.page.TOTPAG = filter.page.TOTPAG;
                    beanCons.page.TOTROW = filter.page.TOTROW;

                    lstCons.add(beanCons);

                }
            }
        } catch (Exception e) {
            e.getMessage();
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

        return lstCons;
    }

    public List<A1692Filter> loadPX078S06A1692(A1745Filter filter) throws SQLException, Exception {
        List<A1692Filter> lstRtn = new ArrayList<>(0);
        A1692Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        double totVCPN = 0;
        long totPAX = 0;

        //PX07900004
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX079S05A1692(?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04189(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            cstmt01.setString(3, filter.ZONA);
            cstmt01.setString(4, filter.CARR);
            cstmt01.setString(5, filter.CDEPART);
            cstmt01.setString(6, filter.CARRIVA);
            cstmt01.setString(7, filter.CURREAM);
            cstmt01.setString(8, filter.NFLIGHT);
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

                totVCPN = rs01.getDouble("VCPN");
                totPAX = rs01.getLong("QTYPAX");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1692Filter();
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.FBASE = rs01.getString("FBASE");
                    objRtn.strTicket = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                    objRtn.FCONT = rs01.getString("FCONT");
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FCONT);
                    objRtn.ZONA = rs01.getString("ZONA");
                    objRtn.CDEPART = rs01.getString("CDEPART");
                    objRtn.CARRIVA = rs01.getString("CARRIVA");
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    objRtn.LEGSEQ = rs01.getString("LEGSEQ");
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.PSVVTA = rs01.getString("PSVVTA");
                    objRtn.AGTIA = rs01.getString("AGTIA");
                    objRtn.FVTA = rs01.getString("FVTA");
                    if (filter.page.TOTPAG != -1) {
                        objRtn.FTE = Obtener_FTE(objRtn.CCIA, objRtn.FORMA, objRtn.SERIE, cstmt01);
                    } else {
                        objRtn.FTE = rs01.getString("FTE");
                    }
                    objRtn.strFormatFVTA = Functions.getMonthConvert(objRtn.FVTA);
                    objRtn.TOPUS = rs01.getString("TOPUS");
                    objRtn.CARR = rs01.getString("CARR");
                    objRtn.strDescripcion = filter.strDescCarrier;
                    objRtn.CABI = rs01.getString("CABI");
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.MDACP = rs01.getString("MDACP");
                    objRtn.VCPMX = rs01.getDouble("VCPMX");
                    objRtn.TCMUS = rs01.getDouble("TCMUS");
                    objRtn.VCPUS = rs01.getDouble("VCPUS");
                    objRtn.COMISI = rs01.getDouble("COMISI");
                    objRtn.QTYPAX = rs01.getInt("QTYPAX");
                    objRtn.difVakues = totVCPN;
                    objRtn.totCPN_Aud = totPAX;//Pasajeros

                    objRtn.FVAL = rs01.getString("FVAL");
                    objRtn.strDescFVAL = rs01.getString("DescFVAL");

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
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

    public String Obtener_FTE(String ccia, String forma, String serie, CallableStatement cstmt) throws SQLException, Exception {

        String SQLCLL01, fte;
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX079S06A1711(?,?,?,?,?)}";

        //cstmt = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
        cstmt = session.getCNXIBMDB2().getIBMDB2Connection().prepareCall(SQLCLL01);

        cstmt.registerOutParameter(5, Types.VARCHAR);

        cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
        cstmt.setString(2, ccia);
        cstmt.setString(3, forma);
        cstmt.setString(4, serie);
        cstmt.setString(5, "");

        cstmt.execute();

        fte = cstmt.getString(5);

        return fte;
    }
}
