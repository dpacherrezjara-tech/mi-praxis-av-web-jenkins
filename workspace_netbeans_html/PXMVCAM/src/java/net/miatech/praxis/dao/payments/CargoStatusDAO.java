/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.io.BufferedReader;
import net.miatech.praxis.dao.interline.*;
import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A003;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.praxis.payment.MPF287;
import net.miatech.praxis.payment.MPF287Filter;
import net.miatech.praxis.payment.MPF304;
import net.miatech.praxis.payment.MPF304Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class CargoStatusDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CargoStatusDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CargoStatusDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<MPF287> loadMPS657(MPF287Filter filter) throws SQLException, Exception {

        List<MPF287> lstData = new ArrayList<MPF287>(0);
        MPF287 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        long   totalQTotal = 0, totalQMatch = 0, totalQManual = 0, totalQPend = 0;
        double totalAmtTotal = 0, totalAmtMatch = 0, totalAmtManual = 0, totalAmtPend = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS657(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_SEARCH);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);
            cstmt.setString(5, filter.IN_COUNTRY);
            cstmt.setString(6, filter.IN_SCURRENCY);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF287();

                bean.ADATE = rst.getString("ADATE");
                bean.strFormatDate = Functions.getMonthConvert(bean.ADATE);

                long   qTotal  = rst.getLong("VL_QTY_TOTAL_EECC");
                long   qMatch  = rst.getLong("VL_QTY_MATCH_AUTO_EECC");
                long   qManual = rst.getLong("VL_QTY_MATCH_MANUAL_EECC");
                long   qPend   = rst.getLong("VL_QTY_PENDING_MANUAL_EECC");
                double aTotal  = rst.getDouble("VL_AMT_TOTAL_EECC");
                double aMatch  = rst.getDouble("VL_AMT_MATCH_AUTO_EECC");
                double aManual = rst.getDouble("VL_AMT_MATCH_MANUAL_EECC");
                double aPend   = rst.getDouble("VL_AMT_PENDING_MANUAL_EECC");

                bean.VL_QTY_TOTAL  = qTotal;
                bean.VL_QTY_MATCH  = qMatch;
                bean.VL_QTY_MANUAL = qManual;
                bean.VL_QTY_PEND   = qPend;
                bean.VL_AMT_TOTAL  = aTotal;
                bean.VL_AMT_MATCH  = aMatch + aManual;
                bean.VL_AMT_MANUAL = aManual;
                bean.VL_AMT_PEND   = aPend;

                bean.PCT_PROCESADO = (qTotal > 0) ? ((qMatch + qManual) * 100.0 / qTotal) : 0;

                totalQTotal    += qTotal;
                totalQMatch    += qMatch;
                totalQManual   += qManual;
                totalQPend     += qPend;
                totalAmtTotal  += aTotal;
                totalAmtMatch  += aMatch + aManual;
                totalAmtManual += aManual;
                totalAmtPend   += aPend;

                bean.TOTAL_QTOTAL    = totalQTotal;
                bean.TOTAL_QMATCH    = totalQMatch;
                bean.TOTAL_QMANUAL   = totalQManual;
                bean.TOTAL_QPEND     = totalQPend;
                bean.TOTAL_AMTTOTAL  = totalAmtTotal;
                bean.TOTAL_AMTMATCH  = totalAmtMatch;
                bean.TOTAL_AMTMANUAL = totalAmtManual;
                bean.TOTAL_AMTPEND   = totalAmtPend;
                bean.TOTAL_PCT = (totalQTotal > 0) ? ((totalQMatch + totalQManual) * 100.0 / totalQTotal) : 0;

                lstData.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (rst != null) {
                rst.close();
            }
            if (cstmt != null) {
                cstmt.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstData;
    }

    private String determineCountryFromFileName(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return ""; // Valor por defecto
        }

        String[] parts = fileName.split("_");
        if (parts.length > 0) {
            String clientCode = parts[0];

            switch (clientCode) {
                case "202":
                    return "SV";  // El Salvador
                case "134":
                    return "US";  // Estados Unidos
                default:
                    return "";
            }
        }

        return ""; // Si no se puede determinar
    }

    public List<MPF221> loadMPS446(MPF221Filter filter) throws SQLException, Exception {

        List<MPF221> lstData = new ArrayList<MPF221>(0);
        MPF221 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS446(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_OPTION.trim());
            cstmt.setString(5, filter.IN_SOCIETY.trim());
            cstmt.setString(6, filter.IN_COMAND.trim());
            cstmt.setString(7, filter.IN_FILE_NAME.trim());
            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF221();
                bean.RN = rst.getLong("RN");
                bean.CUSTOMER = rst.getString("CCUST").trim();
                bean.REPORTID = rst.getString("REPORTID").trim();
                bean.USERID = rst.getString("USERID").trim();
                bean.REFNBR = rst.getString("REFNBR").trim();
                bean.PEDARC = rst.getString("PEDARC").trim();
                bean.DATEARC = rst.getString("DATEARC").trim();
                bean.TIMEARC = rst.getString("TIMEARC").trim();
                bean.DISTNAME = rst.getString("DISTNAME").trim();
                bean.GROUPID = rst.getString("GROUPID").trim();
                bean.LINESARC = rst.getString("LINESARC").trim();
                bean.PAGESARC = rst.getString("PAGESARC").trim();
                bean.OBSERVAC = rst.getString("OBSERVAC").trim();
                bean.NAMEFILE = rst.getString("NAMEFILE").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
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

    public void insertFileRecord(String ccust, String dateSett, String fileName,
            String yearFile, String uscr, String fecr, String hocr) throws Exception {

        CallableStatement cstmt = null;
        Connection cnx = null;
        String SQLCLL01 = "{CALL PRAXISMP.MPS649(?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, ccust);
            cstmt.setString(2, dateSett);
            cstmt.setString(3, fileName);
            cstmt.setString(4, yearFile);
            cstmt.setString(5, uscr);
            cstmt.setString(6, fecr);
            cstmt.setString(7, hocr);

            cstmt.execute();

        } catch (Exception e) {
            System.err.println("Error insertando en BD archivo: " + fileName);
            e.printStackTrace();
            throw e;
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }
    }

    public List<MPF287> loadMPS658(MPF287Filter filter) throws Exception {

        List<MPF287> lstData = new ArrayList<>();
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;
        
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");

        // MPS658: 7 IN  + 4 INOUT paginacion  = 11 params
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS658(?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST     == null ? "" : filter.IN_CCUST.trim());
            cstmt.setString(2, filter.IN_SEARCH     == null ? "" : filter.IN_SEARCH.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM == null ? "" : filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO   == null ? "" : filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_COUNTRY    == null ? "" : filter.IN_COUNTRY.trim());
            cstmt.setString(6, filter.IN_SCURRENCY  == null ? "" : filter.IN_SCURRENCY.trim());
            cstmt.setString(7, filter.IN_STVAL      == null ? "" : filter.IN_STVAL.trim());

            cstmt.registerOutParameter(8,  Types.INTEGER);
            cstmt.registerOutParameter(9,  Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setInt(8,  filter.page.PAGNUM);
            cstmt.setInt(9,  filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

 
            double sumNeto = 0, sumNetoc = 0, sumLoc = 0;
            long   sumQ1   = 0, sumQ3    = 0, sumQT  = 0;

            rst = cstmt.getResultSet();
            while (rst != null && rst.next()) {
                sumNeto  += rst.getDouble("NETO");
                sumNetoc += rst.getDouble("NETOC");
                sumLoc   += rst.getDouble("LOCAMOUNT2");
                sumQ1    += rst.getLong("QTYTRAN1");
                sumQ3    += rst.getLong("QTYTRAN3");
                sumQT    += rst.getLong("QTYTRAS");
            }
            if (rst != null) rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst != null && rst.next()) {
                    MPF287 bean = new MPF287();

                    bean.RN           = rst.getLong("RN");
                    bean.ADATE        = safeStr(rst, "ADATE");
                    bean.SDATE        = safeStr(rst, "SDATE");
                    bean.strFormatDate = Functions.getMonthConvert(bean.ADATE);
                    bean.SCURRENCY    = safeStr(rst, "SCURRENCY");
                    bean.SCOUNTRY     = safeStr(rst, "SCOUNTRY");
                    bean.FECR         = safeStr(rst, "FECR");
                    bean.descTDOC = hmDescDocType.containsKey(rst.getString("TDOC").trim().toUpperCase()) ? hmDescDocType.get(rst.getString("TDOC").trim()).toString() : rst.getString("TDOC").trim();
                    bean.STVAL = rst.getString("STVAL").trim();
                    
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        bean.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        bean.descSTVAL = rst.getString("STVAL").trim();
                    }
                    
                    bean.NETO         = rst.getDouble("NETO");
                    bean.NETOC        = rst.getDouble("NETOC");
                    bean.LOCAMOUNT2   = rst.getDouble("LOCAMOUNT2");
                    bean.QTYTRAN1     = rst.getLong("QTYTRAN1");
                    bean.QTYTRAN3     = rst.getLong("QTYTRAN3");
                    bean.QTYTRAS      = rst.getLong("QTYTRAS");

                    bean.BANCODE      = safeStr(rst, "BANCODE");
                    bean.SAGENT       = safeStr(rst, "SAGENT");
                    bean.SCARDN       = safeStr(rst, "SCARDN");
                    bean.SAUTHOC      = safeStr(rst, "SAUTHOC");
                    bean.RED          = safeStr(rst, "RED");
                    bean.PENDINGDAYS  = rst.getLong("PENDINGDAYS");
                    
                    bean.MERCHAND = rst.getString("MERCHAND").trim();
                    bean.BANDOC = rst.getString("BANDOC").trim();
                    bean.VALDATE = rst.getString("VALDATE").trim();

                    bean.SUM_NETO       = sumNeto;
                    bean.SUM_NETOC      = sumNetoc;
                    bean.SUM_LOCAMOUNT2 = sumLoc;
                    bean.SUM_QTYTRAN1   = sumQ1;
                    bean.SUM_QTYTRAN3   = sumQ3;
                    bean.SUM_QTYTRAS    = sumQT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lstData.add(bean);
                }
                if (rst != null) rst.close();
            }

        } catch (Exception e) {
            logError.error("Error en loadMPS658", e);
            throw e;
        } finally {
            if (cstmt != null) { try { cstmt.close(); } catch (Exception ignore) {} }
            if (cnx   != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
            pasarGarbageCollector();
        }

        return lstData;
    }

    public List<MPF287> loadMPS659(MPF287Filter filter) throws Exception {

        List<MPF287> lstData = new ArrayList<>();
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        HashMap<String, String> hmDescEstados = new HashMap<>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, String> hmDescDocType = new HashMap<>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");

        // MPS659: 8 IN + 4 INOUT paginacion = 12 params
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS659(?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST      == null ? "" : filter.IN_CCUST.trim());
            cstmt.setString(2, filter.IN_SEARCH      == null ? "" : filter.IN_SEARCH.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM  == null ? "" : filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO    == null ? "" : filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_COUNTRY     == null ? "" : filter.IN_COUNTRY.trim());
            cstmt.setString(6, filter.IN_SCURRENCY   == null ? "" : filter.IN_SCURRENCY.trim());
            cstmt.setString(7, filter.IN_STVAL       == null ? "" : filter.IN_STVAL.trim());
            cstmt.setString(8, filter.IN_BANDOC      == null ? "" : filter.IN_BANDOC.trim());

            cstmt.registerOutParameter(9,  Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setInt(9,  filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            // RS1 — Resumen (acumular totales agrupados por moneda)
            double sumNeto = 0, sumNetoc = 0, sumLoc = 0;
            long   sumQ1   = 0, sumQ3    = 0, sumQT  = 0;

            rst = cstmt.getResultSet();
            while (rst != null && rst.next()) {
                sumNeto  += rst.getDouble("NETO");
                sumNetoc += rst.getDouble("NETOC");
                sumLoc   += rst.getDouble("LOCAMOUNT2");
                sumQ1    += rst.getLong("QTYTRAN1");
                sumQ3    += rst.getLong("QTYTRAN3");
                sumQT    += rst.getLong("QTYTRAS");
            }
            if (rst != null) rst.close();

            // RS2 — Detalle paginado
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst != null && rst.next()) {
                    MPF287 bean = new MPF287();

                    bean.RN            = rst.getLong("RN");
                    bean.ADATE         = safeStr(rst, "ADATE");
                    bean.SDATE         = safeStr(rst, "SDATE");
                    bean.strFormatDate = Functions.getMonthConvert(bean.ADATE);
                    bean.SCURRENCY     = safeStr(rst, "SCURRENCY");
                    bean.SCOUNTRY      = safeStr(rst, "SCOUNTRY");
                    bean.FECR          = safeStr(rst, "FECR");

                    String tdoc = rst.getString("TDOC") == null ? "" : rst.getString("TDOC").trim();
                    bean.descTDOC  = hmDescDocType.containsKey(tdoc.toUpperCase()) ? hmDescDocType.get(tdoc) : tdoc;

                    String stval = rst.getString("STVAL") == null ? "" : rst.getString("STVAL").trim();
                    bean.STVAL     = stval;
                    bean.descSTVAL = hmDescEstados.containsKey(stval) ? hmDescEstados.get(stval) : stval;

                    bean.NETO        = rst.getDouble("NETO");
                    bean.NETOC       = rst.getDouble("NETOC");
                    bean.LOCAMOUNT2  = rst.getDouble("LOCAMOUNT2");
                    bean.QTYTRAN1    = rst.getLong("QTYTRAN1");
                    bean.QTYTRAN3    = rst.getLong("QTYTRAN3");
                    bean.QTYTRAS     = rst.getLong("QTYTRAS");
                    bean.PENDINGDAYS = rst.getLong("PENDINGDAYS");

                    bean.BANCODE  = safeStr(rst, "BANCODE");
                    bean.SAGENT   = safeStr(rst, "SAGENT");
                    bean.SCARDN   = safeStr(rst, "SCARDN");
                    bean.SAUTHOC  = safeStr(rst, "SAUTHOC");
                    bean.RED      = safeStr(rst, "RED");
                    bean.MERCHAND = safeStr(rst, "MERCHAND");
                    bean.BANDOC   = safeStr(rst, "BANDOC");
                    bean.VALDATE  = safeStr(rst, "VALDATE");

                    bean.SUM_NETO       = sumNeto;
                    bean.SUM_NETOC      = sumNetoc;
                    bean.SUM_LOCAMOUNT2 = sumLoc;
                    bean.SUM_QTYTRAN1   = sumQ1;
                    bean.SUM_QTYTRAN3   = sumQ3;
                    bean.SUM_QTYTRAS    = sumQT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lstData.add(bean);
                }
                if (rst != null) rst.close();
            }

        } catch (Exception e) {
            logError.error("Error en loadMPS659", e);
            throw e;
        } finally {
            if (cstmt != null) { try { cstmt.close(); } catch (Exception ignore) {} }
            if (cnx   != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
            pasarGarbageCollector();
        }

        return lstData;
    }

    public List<Map<String, String>> loadMPS660(MPF287Filter filter) throws Exception {
        List<Map<String, String>> lstData = new ArrayList<>();
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;
        String SQLCLL = "{CALL PRAXISMP.MPS660(?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL);
            cstmt.setString(1, filter.IN_CCUST.trim());
            cstmt.setString(2, filter.IN_SEARCH.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.execute();
            rst = cstmt.getResultSet();
            while (rst != null && rst.next()) {
                Map<String, String> row = new HashMap<>();
                row.put("SOCIETY",    safeStr(rst, "SOCIETY"));
                row.put("LCOM",       safeStr(rst, "LCOM"));
                row.put("DIV",        safeStr(rst, "DIV"));
                row.put("CENBEN",     safeStr(rst, "CENBEN"));
                row.put("SCOUNTRY",   safeStr(rst, "SCOUNTRY"));
                row.put("BLOCPAG",    safeStr(rst, "BLOCPAG"));
                row.put("CLAVREF1",   safeStr(rst, "CLAVREF1"));
                row.put("CLAVREF3",   safeStr(rst, "CLAVREF3"));
                row.put("NOMBRE1",    safeStr(rst, "NOMBRE1"));
                row.put("NUMLEG",     safeStr(rst, "NUMLEG"));
                row.put("ACCOUNT",    safeStr(rst, "ACCOUNT"));
                row.put("REFERENCE",  safeStr(rst, "REFERENCE"));
                row.put("REF2",       safeStr(rst, "REFERENCIA_PAGO_2"));
                row.put("REFCLI",     safeStr(rst, "REFERENCIA_CLIENTE"));
                row.put("PSE",        safeStr(rst, "PSE"));
                row.put("LLAVE",      safeStr(rst, "LLAVE"));
                row.put("STVAL",      safeStr(rst, "STVAL"));
                row.put("BANDOCCAR",  safeStr(rst, "BANDOCCAR"));
                row.put("ADATE",      safeStr(rst, "ADATE"));
                row.put("NETOLOC",    safeStr(rst, "NETOLOC"));
                row.put("SCURRENCY",  safeStr(rst, "SCURRENCY"));
                row.put("TEXTO",      safeStr(rst, "TEXTO"));
                row.put("PAYMET",     safeStr(rst, "PAYMET"));
                row.put("FCONT",      safeStr(rst, "FCONT"));
                row.put("CLSDOC",     safeStr(rst, "CLSDOC"));
                row.put("FECBASE",    safeStr(rst, "FECBASE"));
                row.put("DELAYDAY",   safeStr(rst, "DELAYDAY"));
                row.put("FECVENC",    safeStr(rst, "FECVENC"));
                row.put("CONPAY",     safeStr(rst, "CONPAY"));
                row.put("CME",        safeStr(rst, "CME"));
                row.put("CLAVECONT",  safeStr(rst, "CLAVECONT"));
                row.put("NETOLOC_2",  safeStr(rst, "NETOLOC_2"));
                row.put("MONLOC",     safeStr(rst, "MONLOC"));
                row.put("IMPORTELOC", safeStr(rst, "IMPORTELOC"));
                row.put("MONSUC",     safeStr(rst, "MONSUC"));
                row.put("IMPORTLOC2", safeStr(rst, "IMPORTLOC2"));
                row.put("MONSUC2",    safeStr(rst, "MONSUC2"));
                row.put("DIFF",       safeStr(rst, "DIFF"));
                row.put("POR_DIF",    safeStr(rst, "POR_DIF"));
                lstData.add(row);
            }
        } catch (Exception e) {
            logError.error("Error en loadMPS660", e);
            throw e;
        } finally {
            if (rst   != null) { try { rst.close();   } catch (Exception ignore) {} }
            if (cstmt != null) { try { cstmt.close(); } catch (Exception ignore) {} }
            if (cnx   != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
            pasarGarbageCollector();
        }
        return lstData;
    }

    public List<Map<String, String>> loadMPS661(MPF287Filter filter) throws Exception {
        List<Map<String, String>> lstData = new ArrayList<>();
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;
        String SQLCLL = "{CALL PRAXISMP.MPS661(?,?,?,?,?,?)}";

        long   totalQTotal = 0, totalQMatch = 0, totalQManual = 0, totalQPend = 0;
        double totalAmtTotal = 0, totalAmtMatch = 0, totalAmtFaltaPago = 0, totalAmtFaltaFact = 0;
        double totalAmtFactPend = 0, totalAmtPendPago = 0, totalAmtNoLibera = 0;
        double totalAmtFaltaPagoDif = 0, totalAmtMatchObs = 0;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL);
            cstmt.setString(1, filter.IN_CCUST.trim());
            cstmt.setString(2, filter.IN_SEARCH.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_COUNTRY.trim());
            cstmt.setString(6, filter.IN_SCURRENCY.trim());
            cstmt.execute();
            rst = cstmt.getResultSet();
            while (rst != null && rst.next()) {
                Map<String, String> row = new HashMap<>();
                String adate       = safeStr(rst, "ADATE");
                String nombre1     = safeStr(rst, "NOMBRE1");
                long qTotal        = parseLong(safeStr(rst, "VL_QTY_TOTAL"));
                long qMatch        = parseLong(safeStr(rst, "VL_QTY_MATCH"));
                long qManual       = 0; // estado manual aún no existe
                long qMatchObs     = parseLong(safeStr(rst, "VL_QTY_MATCH_CON_OBSERVACIONES"));
                long qFaltaPago    = parseLong(safeStr(rst, "VL_QTY_FALTA_PAGO"));
                long qFaltaFact    = parseLong(safeStr(rst, "VL_QTY_FALTA_FACTURA"));
                long qFactPend     = parseLong(safeStr(rst, "VL_QTY_FACTURA_PENDIENTE"));
                long qPendPago     = parseLong(safeStr(rst, "VL_QTY_PENDIENTE_PAGO"));
                long qNoLibera     = parseLong(safeStr(rst, "VL_QTY_NO_ESTA_EN_LIBERA"));
                long qFaltaPagoDif = parseLong(safeStr(rst, "VL_QTY_FALTA_PAGO_DIFERENCIA_EN_LIBERA"));
                long qPend         = qTotal - qMatch - qManual;

                double amtTotal        = rst.getDouble("VL_AMT_TOTAL");
                double amtMatch        = rst.getDouble("VL_AMT_MATCH");
                double amtFaltaPago    = rst.getDouble("VL_AMT_FALTA_PAGO");
                double amtFaltaFact    = rst.getDouble("VL_AMT_FALTA_FACTURA");
                double amtFactPend     = rst.getDouble("VL_AMT_FACTURA_PENDIENTE");
                double amtPendPago     = rst.getDouble("VL_AMT_PENDIENTE_PAGO");
                double amtNoLibera     = rst.getDouble("VL_AMT_NO_ESTA_EN_LIBERA");
                double amtFaltaPagoDif = rst.getDouble("VL_AMT_FALTA_PAGO_DIFERENCIA_EN_LIBERA");
                double amtMatchObs     = rst.getDouble("VL_AMT_MATCH_CON_OBSERVACIONES");

                totalQTotal         += qTotal;
                totalQMatch         += qMatch;
                totalQManual        += qManual;
                totalQPend          += qPend;
                totalAmtTotal       += amtTotal;
                totalAmtMatch       += amtMatch;
                totalAmtFaltaPago   += amtFaltaPago;
                totalAmtFaltaFact   += amtFaltaFact;
                totalAmtFactPend    += amtFactPend;
                totalAmtPendPago    += amtPendPago;
                totalAmtNoLibera    += amtNoLibera;
                totalAmtFaltaPagoDif += amtFaltaPagoDif;
                totalAmtMatchObs    += amtMatchObs;

                row.put("ADATE",               adate);
                row.put("NOMBRE1",             nombre1);
                row.put("strFormatDate",        Functions.getMonthConvert(adate));
                row.put("VL_QTY_TOTAL",         String.valueOf(qTotal));
                row.put("VL_QTY_MATCH",         String.valueOf(qMatch));
                row.put("VL_QTY_MANUAL",        String.valueOf(qManual));
                row.put("VL_QTY_FALTA_PAGO",    String.valueOf(qFaltaPago));
                row.put("VL_QTY_FALTA_FACTURA", String.valueOf(qFaltaFact));
                row.put("VL_QTY_FACTURA_PENDIENTE",               String.valueOf(qFactPend));
                row.put("VL_QTY_PENDIENTE_PAGO",                  String.valueOf(qPendPago));
                row.put("VL_QTY_NO_ESTA_EN_LIBERA",               String.valueOf(qNoLibera));
                row.put("VL_QTY_FALTA_PAGO_DIFERENCIA_EN_LIBERA", String.valueOf(qFaltaPagoDif));
                row.put("VL_QTY_MATCH_CON_OBSERVACIONES",         String.valueOf(qMatchObs));
                row.put("PCT_PROCESADO",  String.valueOf(qTotal > 0 ? ((qMatch + qManual) * 100.0 / qTotal) : 0));
                row.put("VL_QTY_PEND",   String.valueOf(qPend));

                row.put("VL_AMT_TOTAL",                           String.valueOf(amtTotal));
                row.put("VL_AMT_MATCH",                           String.valueOf(amtMatch));
                row.put("VL_AMT_FALTA_PAGO",                      String.valueOf(amtFaltaPago));
                row.put("VL_AMT_FALTA_FACTURA",                   String.valueOf(amtFaltaFact));
                row.put("VL_AMT_FACTURA_PENDIENTE",               String.valueOf(amtFactPend));
                row.put("VL_AMT_PENDIENTE_PAGO",                  String.valueOf(amtPendPago));
                row.put("VL_AMT_NO_ESTA_EN_LIBERA",               String.valueOf(amtNoLibera));
                row.put("VL_AMT_FALTA_PAGO_DIFERENCIA_EN_LIBERA", String.valueOf(amtFaltaPagoDif));
                row.put("VL_AMT_MATCH_CON_OBSERVACIONES",         String.valueOf(amtMatchObs));

                row.put("TOTAL_QTOTAL",  String.valueOf(totalQTotal));
                row.put("TOTAL_QMATCH",  String.valueOf(totalQMatch));
                row.put("TOTAL_QMANUAL", String.valueOf(totalQManual));
                row.put("TOTAL_QPEND",   String.valueOf(totalQPend));
                row.put("TOTAL_AMT_TOTAL",                           String.valueOf(totalAmtTotal));
                row.put("TOTAL_AMT_MATCH",                           String.valueOf(totalAmtMatch));
                row.put("TOTAL_AMT_FALTA_PAGO",                      String.valueOf(totalAmtFaltaPago));
                row.put("TOTAL_AMT_FALTA_FACTURA",                   String.valueOf(totalAmtFaltaFact));
                row.put("TOTAL_AMT_FACTURA_PENDIENTE",               String.valueOf(totalAmtFactPend));
                row.put("TOTAL_AMT_PENDIENTE_PAGO",                  String.valueOf(totalAmtPendPago));
                row.put("TOTAL_AMT_NO_ESTA_EN_LIBERA",               String.valueOf(totalAmtNoLibera));
                row.put("TOTAL_AMT_FALTA_PAGO_DIFERENCIA_EN_LIBERA", String.valueOf(totalAmtFaltaPagoDif));
                row.put("TOTAL_AMT_MATCH_CON_OBSERVACIONES",         String.valueOf(totalAmtMatchObs));
                lstData.add(row);
            }
        } catch (Exception e) {
            logError.error("Error en loadMPS661", e);
            throw e;
        } finally {
            if (rst   != null) { try { rst.close();   } catch (Exception ignore) {} }
            if (cstmt != null) { try { cstmt.close(); } catch (Exception ignore) {} }
            if (cnx   != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
            pasarGarbageCollector();
        }
        return lstData;
    }

    private long parseLong(String s) {
        try { return s == null || s.isEmpty() ? 0L : Long.parseLong(s.trim()); }
        catch (NumberFormatException e) { return 0L; }
    }

    private String safeStr(ResultSet rs, String col) {
        try { String v = rs.getString(col); return v == null ? "" : v.trim(); }
        catch (Exception e) { return ""; }
    }

    public List<MPF304> loadMPS650(MPF304Filter filter) throws Exception {
        List<MPF304> lstData = new ArrayList<>(0);
        MPF304 bean;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXISMP.MPS650(?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_FECHA_FROM.trim());
            cstmt.setString(2, filter.IN_FECHA_TO.trim());
            cstmt.setString(3, filter.IN_SOCIETY.trim());
            cstmt.setString(4, filter.IN_FILE_NAME.trim());

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

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
                bean = new MPF304();
                bean.RN = rst.getLong("RN");
                bean.CCUST = rst.getString("CCUST").trim();
                bean.DATESETT = rst.getString("DATESETT").trim();
                bean.NAMEFILE = rst.getString("NAMEFILE").trim();
                bean.USCR = rst.getString("USCR").trim();
                bean.FECR = rst.getString("FECR").trim();
                bean.HOCR = rst.getString("HOCR").trim();
                bean.YEARFILE = rst.getString("YEARFILE").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                lstData.add(bean);
            }

        } catch (Exception e) {
            logError.error("Error en loadMPS650", e);
            throw e;
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (Exception e) {
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (Exception e) {
                }
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstData;
    }
}
