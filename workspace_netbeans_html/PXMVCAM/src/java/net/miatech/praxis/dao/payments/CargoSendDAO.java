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
import net.miatech.praxis.payment.MPF304;
import net.miatech.praxis.payment.MPF304Filter;
import net.miatech.praxis.payment.MPF305;
import net.miatech.praxis.payment.MPF305Filter;
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
public class CargoSendDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CargoSendDAO() {
    }

    private String safeStr(ResultSet rs, String col) {
        try { String v = rs.getString(col); return v == null ? "" : v.trim(); }
        catch (Exception e) { return ""; }
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CargoSendDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<MPF218> loadMPS415(MPF218Filter filter) throws SQLException, Exception {

        List<MPF218> lstData = new ArrayList<MPF218>(0);
        MPF218 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS415(?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(6, filter.IN_COUNTRY.trim());
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
                bean = new MPF218();
                bean.RN = rst.getLong("RN");
                bean.CUSTOMER = rst.getString("CCUST").trim();
                String fileName = rst.getString("NAMEFILE").trim();
                bean.COUNTRY = rst.getString("COUNTRY").trim();

                bean.DATEPROC = rst.getString("DATEPROC").trim();
                bean.DATESETT = rst.getString("DATESETT").trim();
                bean.DATEUPLO = rst.getString("DATEUPLO").trim();
                bean.NAMEFILE = fileName;
                bean.TYPEFILE = rst.getString("TYPEFILE").trim();
                bean.SIZEFILE = rst.getString("SIZEFILE").trim();

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

    public List<MPF305> loadMPS715(MPF305Filter filter) throws Exception {
        List<MPF305> lstData = new ArrayList<>(0);
        MPF305 bean;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS715(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_FECHA_FROM.trim());
            cstmt.setString(2, filter.IN_FECHA_TO.trim());
            cstmt.setString(3, filter.IN_FILE_NAME.trim());
            cstmt.setString(4, filter.IN_STVAL   == null ? "" : filter.IN_STVAL.trim());
            cstmt.setString(5, filter.IN_TYPEDOC == null ? "" : filter.IN_TYPEDOC.trim());
            cstmt.setString(6, filter.IN_COUNTRY == null ? "" : filter.IN_COUNTRY.trim());

            cstmt.registerOutParameter(7,  Types.INTEGER);
            cstmt.registerOutParameter(8,  Types.INTEGER);
            cstmt.registerOutParameter(9,  Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setInt(7,  filter.page.PAGNUM);
            cstmt.setInt(8,  filter.page.PAGROW);
            cstmt.setInt(9,  filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF305();
                bean.RN        = rst.getLong("RN");
                bean.SREPID    = rst.getString("SREPID").trim();
                bean.STVAL     = rst.getString("STVAL").trim();
                bean.TYPEDOC   = rst.getString("TYPEDOC")  != null ? rst.getString("TYPEDOC").trim()  : "";
                bean.SCOUNTRY  = rst.getString("SCOUNTRY") != null ? rst.getString("SCOUNTRY").trim() : "";
                bean.NAMEFILE  = rst.getString("NAMEFILE").trim();
                bean.QTYREGIS  = rst.getInt("QTYREGIS");
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.FAMOUNT   = rst.getDouble("FAMOUNT");
                bean.FECR      = rst.getString("FECR").trim();
                bean.HOCR      = rst.getString("HOCR").trim();
                bean.USCR      = rst.getString("USCR").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                lstData.add(bean);
            }

        } catch (Exception e) {
            logError.error("Error en loadMPS715", e);
            throw e;
        } finally {
            if (rst != null) { try { rst.close(); } catch (Exception ex) { logError.error(ex.getMessage(), ex); } }
            if (cstmt != null) { try { cstmt.close(); } catch (Exception ex) { logError.error(ex.getMessage(), ex); } }
            if (cnx != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
            pasarGarbageCollector();
        }

        return lstData;
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

    public Map<String, Object> executeMPS718(String srepid, String stval) throws Exception {
        Map<String, Object> result = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL = "{CALL " + session.getMainLibrary() + "MP.MPS718(?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL);

            cstmt.setString(1, srepid);
            cstmt.setString(2, stval);
            cstmt.setString(3, session.getUserView().getUserInfo().USR);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.VARCHAR);

            cstmt.execute();

            int    code    = cstmt.getInt(4);
            String message = cstmt.getString(5);

            result.put("success", code == 1);
            result.put("OUT_CODE", code);
            result.put("Mensaje", message);

        } catch (Exception e) {
            logError.error("executeMPS718 -> " + e.getMessage(), e);
            result.put("success", false);
            result.put("Mensaje", e.getMessage());
        } finally {
            if (cstmt != null) { try { cstmt.close(); } catch (SQLException e) {} }
            if (cnx != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
        }

        return result;
    }

    public Map<String, Object> executeMPS719(String dateFrom, String dateTo) throws Exception {
        Map<String, Object> result = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL = "{CALL " + session.getMainLibrary() + "MP.MPS719(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL);

            cstmt.setString(1, dateFrom);
            cstmt.setString(2, dateTo);
            cstmt.setString(3, session.getUserView().getUserInfo().USR);
            cstmt.registerOutParameter(4, Types.VARCHAR);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.VARCHAR);

            cstmt.execute();

            result.put("OUT_SREPID",  cstmt.getString(4));
            result.put("OUT_CODE",    cstmt.getInt(5));
            result.put("OUT_MESSAGE", cstmt.getString(6));
            result.put("success",     cstmt.getInt(5) == 1);

        } catch (Exception e) {
            logError.error("executeMPS719 -> " + e.getMessage(), e);
            result.put("success",     false);
            result.put("OUT_CODE",    -99);
            result.put("OUT_MESSAGE", e.getMessage());
        } finally {
            if (cstmt != null) { try { cstmt.close(); } catch (SQLException e) {} }
            if (cnx   != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
        }

        return result;
    }

    public List<Map<String, String>> loadMPS750(String srepid) throws Exception {
        List<Map<String, String>> lstData = new ArrayList<>();
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL = "{CALL " + session.getMainLibrary() + "MP.MPS750(?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL);
            cstmt.setString(1, srepid.trim());
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
                row.put("COMENTARIO", safeStr(rst, "COMENTARIO"));
                lstData.add(row);
            }
        } catch (Exception e) {
            logError.error("loadMPS750 -> " + e.getMessage(), e);
            throw e;
        } finally {
            if (rst   != null) { try { rst.close();   } catch (SQLException e) {} }
            if (cstmt != null) { try { cstmt.close(); } catch (SQLException e) {} }
            if (cnx   != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
        }

        return lstData;
    }
}
