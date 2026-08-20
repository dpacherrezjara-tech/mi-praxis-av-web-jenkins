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
import net.miatech.beans.spring.ServerSession;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A003;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.praxis.payment.MPF287Mov;
import net.miatech.praxis.payment.MPF287MovFilter;
import net.miatech.praxis.payment.MPF288;
import net.miatech.praxis.payment.MPF288Filter;
import net.miatech.praxis.payment.MPF291;
import net.miatech.praxis.payment.MPF291Filter;
import net.miatech.praxis.payment.MPF295ReconcilePayload;
import net.miatech.praxis.payment.MPF292;
import net.miatech.praxis.payment.MPF292Filter;
import net.miatech.praxis.payment.MPF293;
import net.miatech.praxis.payment.MPF293Filter;
import net.miatech.praxis.payment.MPF294;
import net.miatech.praxis.payment.MPF294Filter;
import net.miatech.praxis.payment.MPF295;
import net.miatech.praxis.payment.MPF295Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import org.json.JSONObject;

/**
 *
 * @author lmendoza
 */
public class CargoGuideDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CargoGuideDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CargoGuideDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<MPF295> loadMPS587(MPF295Filter filter) throws SQLException, Exception {

        List<MPF295> lstData = new ArrayList<MPF295>(0);
        MPF295 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        // NOTA: IN_BANDOC/IN_MONTO (posiciones 8/9) y FUENTEMON (SELECT) son nuevos;
        // MPS587 debe actualizarse en BD para aceptar estos 2 IN adicionales antes de
        // la paginación y para incluir FUENTEMON en su SELECT. Mientras tanto la lectura
        // de FUENTEMON es defensiva para no romper el search.
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS587(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_OPTION.trim());
            cstmt.setString(5, filter.IN_SCURRENCY.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_STVAL.trim());
            cstmt.setString(8, filter.IN_BANDOC != null ? filter.IN_BANDOC.trim() : "");
            cstmt.setDouble(9, filter.IN_MONTO);
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF295();
                bean.RN = rst.getLong("RN");
                bean.CCUST = rst.getString("CCUST").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.NCICLO = rst.getString("NCICLO").trim();
                bean.METPAGO = rst.getString("METPAGO").trim();
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.ADATE = rst.getString("ADATE").trim();
                bean.PAYDAY = rst.getString("PAYDAY").trim();
                bean.NPAGE = rst.getString("NPAGE").trim();
                bean.MONTO = rst.getDouble("MONTO");
                bean.CUSCA = rst.getString("CUSCA").trim();
                bean.CODPSE = rst.getString("CODPSE").trim();
                bean.REFERENCE = rst.getString("REFERENCE").trim();
                bean.SFILE  = rst.getString("SFILE").trim();
                bean.BANDOC = rst.getString("BANDOC").trim();
                bean.TYPE   = rst.getString("TYPE").trim();
                bean.SEQ    = rst.getString("SEQ").trim();
                bean.CBATCH = rst.getString("CBATCH").trim();
                bean.DATEBAT = rst.getString("DATEBAT").trim();
                bean.STATE = rst.getString("STATE").trim();
                // STVAL/SALDO: columnas nuevas, requieren que MPS587 las agregue a su
                // SELECT. Defensivo para no romper el search mientras no se actualice el SP.
                try { bean.STVAL = rst.getString("STVAL") != null ? rst.getString("STVAL").trim() : ""; } catch (Exception ex) { bean.STVAL = ""; }
                try { bean.SALDO = rst.getDouble("SALDO"); } catch (Exception ex) { bean.SALDO = 0; }
                try { bean.FUENTEMON = rst.getString("FUENTEMON") != null ? rst.getString("FUENTEMON").trim() : ""; } catch (Exception ex) { bean.FUENTEMON = ""; }

                bean.USCR = rst.getString("USCR").trim();
                bean.FECR = rst.getString("FECR").trim();
                bean.HOCR = rst.getString("HOCR").trim();
                
                bean.USUP = rst.getString("USUP").trim();
                bean.FEUP = rst.getString("FEUP").trim();
                bean.HOUP = rst.getString("HOUP").trim();
                
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
    
    public Map<String, Object> updateMPS588(MPF295Filter bean) throws SQLException, Exception {
        Map<String, Object> response = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        // NOTA: MPS588 debe actualizarse para aceptar IN_STVAL/IN_SALDO en las
        // posiciones 15/16 (antes de option/USR) y hacer SET STVAL=IN_STVAL,
        // SALDO=IN_SALDO en su UPDATE.
        String SQLCLL = "{CALL " + session.getMainLibrary() + "MP.MPS588(?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL);

            // --- 1. SETEAMOS LAS LLAVES Y CAMPOS ---
            cstmt.setString(1,  bean.IN_CCUST);
            cstmt.setString(2,  bean.IN_SCOUNTRY);
            cstmt.setString(3,  bean.IN_NPAGE);
            cstmt.setString(4,  bean.IN_PAYDAY);
            cstmt.setString(5,  bean.IN_TYPE);
            cstmt.setString(6,  bean.IN_SEQ);
            cstmt.setDouble(7,  bean.IN_MONTO);
            cstmt.setString(8,  bean.IN_ADATE);
            cstmt.setString(9,  bean.IN_CUSCA);
            cstmt.setString(10, bean.IN_CODPSE);
            cstmt.setString(11, bean.IN_REFERENCE);
            cstmt.setString(12, bean.IN_CBATCH);
            cstmt.setString(13, bean.IN_DATEBAT);
            cstmt.setString(14, bean.IN_STATE);
            cstmt.setString(15, bean.IN_STVAL);
            cstmt.setDouble(16, bean.IN_SALDO);
            cstmt.setString(17, bean.option);
            cstmt.setString(18, session.getUserView().getUserInfo().USR);

            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.VARCHAR);

            cstmt.execute();

            int outCode = cstmt.getInt(19);
            String outMensaje = cstmt.getString(20);

            response.put("success", (outCode == 1)); 
            response.put("mensaje", outMensaje);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("mensaje", "Error en BD: " + e.getMessage());
        } finally {
            // Cerramos conexiones para evitar memory leaks
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }

        return response;
    }

    public List<MPF291> loadMPS600(MPF291Filter filter) throws SQLException, Exception {

        List<MPF291> lstData = new ArrayList<MPF291>(0);
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS600(?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SFILE.trim());
            cstmt.setString(3, filter.IN_CCUST.trim());
            cstmt.setInt(4, filter.page.PAGNUM);
            cstmt.setInt(5, filter.page.PAGROW);
            cstmt.setInt(6, filter.page.TOTPAG);
            cstmt.setInt(7, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(4);
            filter.page.PAGROW = cstmt.getInt(5);
            filter.page.TOTPAG = cstmt.getInt(6);
            filter.page.TOTROW = cstmt.getInt(7);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                MPF291 bean = new MPF291();
                bean.RN        = rst.getLong("RN");
                bean.CCUST     = rst.getString("CCUST").trim();
                bean.AWBNO     = rst.getString("AWBNO").trim();
                bean.NCICLO    = rst.getString("NCICLO").trim();
                bean.METPAGO   = rst.getString("METPAGO").trim();
                bean.NPAGPAGO  = rst.getString("NPAGPAGO").trim();
                bean.SCOUNTRY  = rst.getString("SCOUNTRY").trim();
                bean.ADATE     = rst.getString("ADATE").trim();
                bean.SFILE     = rst.getString("SFILE").trim();
                bean.NPAGE     = rst.getString("NPAGE").trim();
                bean.MONTO     = rst.getDouble("MONTO");
                bean.REFERENCE = rst.getString("REFERENCE").trim();
                bean.PAYDAY    = rst.getString("PAYDAY").trim();
                bean.STVAL     = rst.getString("STVAL").trim();
                bean.BANDOC    = rst.getString("BANDOC").trim();
                bean.TYPE      = rst.getString("TYPE").trim();
                bean.SEQ       = rst.getString("SEQ").trim();
                bean.CBATCH    = rst.getString("CBATCH").trim();
                bean.STATE     = rst.getString("STATE").trim();
                bean.USCR      = rst.getString("USCR").trim();
                bean.FECR      = rst.getString("FECR").trim();
                bean.HOCR      = rst.getString("HOCR").trim();
                bean.USUP      = rst.getString("USUP").trim();
                bean.FEUP      = rst.getString("FEUP").trim();
                bean.HOUP      = rst.getString("HOUP").trim();
                try { bean.PRDA = rst.getString("PRDA") != null ? rst.getString("PRDA").trim() : ""; } catch (Exception ex) { bean.PRDA = ""; }

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
                try { rst.close(); } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public List<MPF287Mov> loadMPS734(MPF287MovFilter filter) throws SQLException, Exception {

        List<MPF287Mov> lstData = new ArrayList<MPF287Mov>(0);
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS734(?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST.trim());
            cstmt.setString(2, filter.IN_ADATE.trim());
            cstmt.setString(3, filter.IN_MONTO.trim());
            cstmt.setString(4, filter.IN_ACCOUNT.trim());
            cstmt.setString(5, filter.IN_TEXTO.trim());
            cstmt.setString(6, filter.IN_BANDOC.trim());
            cstmt.setString(7, filter.IN_STVAL.trim());
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
                MPF287Mov bean = new MPF287Mov();
                bean.RN       = rst.getLong("RN");
                bean.CCUST    = rst.getString("CCUST").trim();
                bean.STVAL    = rst.getString("STVAL").trim();
                bean.ACCOUNT  = rst.getString("ACCOUNT").trim();
                bean.BANDOC   = rst.getString("BANDOC").trim();
                bean.ADATE    = rst.getString("ADATE").trim();
                bean.NETO     = rst.getDouble("NETO");
                bean.TEXTO    = rst.getString("TEXTO").trim();
                bean.TEXTOLAR = rst.getString("TEXTOLAR") != null ? rst.getString("TEXTOLAR").trim() : "";

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
                try { rst.close(); } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public Map<String, Object> updateMPS601(MPF291Filter bean) throws SQLException, Exception {
        Map<String, Object> response = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS601(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            cstmt.setString(1,  session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2,  bean.IN_AWBNO);
            cstmt.setString(3,  bean.IN_NCICLO);
            cstmt.setString(4,  bean.IN_SFILE);
            cstmt.setString(5,  bean.IN_NPAGE);
            cstmt.setString(6,  bean.IN_PAYDAY);
            cstmt.setString(7,  bean.IN_TYPE);
            cstmt.setString(8,  bean.IN_SEQ);
            cstmt.setString(9,  bean.IN_CBATCH);
            cstmt.setString(10,  bean.IN_DATEBAT);
            cstmt.setString(11, bean.option);
            cstmt.setString(12, session.getUserView().getUserInfo().USR);

            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.execute();

            int outCode = cstmt.getInt(13);
            response.put("success", (outCode == 1));
            response.put("mensaje", outCode == 1 ? "Record linked successfully." : "Error linking record.");

        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("mensaje", "Error en BD: " + e.getMessage());
        } finally {
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return response;
    }

    public Map<String, Object> updateMPS735(MPF295ReconcilePayload bean) throws SQLException, Exception {
        Map<String, Object> result = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        // 11 IN + 2 INOUT (OUT_CODE, OUT_MESSAGE)
        String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS735(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            cstmt.setString(1,  bean.IN_CCUST);
            cstmt.setString(2,  bean.IN_SFILE);
            cstmt.setString(3,  bean.IN_SCOUNTRY);
            cstmt.setString(4,  bean.IN_NPAGE);
            cstmt.setString(5,  bean.IN_SEQ);
            cstmt.setDouble(6,  bean.IN_MONTO);
            cstmt.setString(7,  bean.IN_BANDOC);
            cstmt.setString(8,  bean.IN_ADATE);
            cstmt.setString(9,  bean.IN_TEXTO);
            cstmt.setDouble(10, bean.IN_NETO);
            cstmt.setString(11, session.getUserView().getUserInfo().USR);

            // Valores iniciales de los INOUT antes de registrarlos
            cstmt.setInt(12, 0);
            cstmt.setString(13, "");

            cstmt.registerOutParameter(12, Types.INTEGER); // OUT_CODE
            cstmt.registerOutParameter(13, Types.VARCHAR); // OUT_MESSAGE

            cstmt.execute();

            int outCode = cstmt.getInt(12);
            String outMensaje = cstmt.getString(13);

            result.put("success", (outCode == 1));
            result.put("mensaje", outMensaje);

        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", false);
            result.put("mensaje", "Error en BD: " + e.getMessage());
        } finally {
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return result;
    }

    public List<MPF291> loadMPS609(MPF291Filter filter) throws SQLException, Exception {

        List<MPF291> lstData = new ArrayList<MPF291>(0);
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS609(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, filter.IN_NUMGUIA != null ? filter.IN_NUMGUIA.trim() : "");
            cstmt.setString(2, filter.IN_NUMFAC  != null ? filter.IN_NUMFAC.trim()  : "");
            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                MPF291 bean = new MPF291();
                bean.RN        = rst.getLong("RN");
                bean.CCUST     = rst.getString("CCUST")     != null ? rst.getString("CCUST").trim()     : "";
                bean.AWBNO     = rst.getString("AWBNO")     != null ? rst.getString("AWBNO").trim()     : "";
                bean.NCICLO    = rst.getString("NCICLO")    != null ? rst.getString("NCICLO").trim()    : "";
                bean.METPAGO   = rst.getString("METPAGO")   != null ? rst.getString("METPAGO").trim()   : "";
                bean.NPAGPAGO  = rst.getString("NPAGPAGO")  != null ? rst.getString("NPAGPAGO").trim()  : "";
                bean.SCOUNTRY  = rst.getString("SCOUNTRY")  != null ? rst.getString("SCOUNTRY").trim()  : "";
                bean.ADATE     = rst.getString("ADATE")     != null ? rst.getString("ADATE").trim()     : "";
                bean.SFILE     = rst.getString("SFILE")     != null ? rst.getString("SFILE").trim()     : "";
                bean.NPAGE     = rst.getString("NPAGE")     != null ? rst.getString("NPAGE").trim()     : "";
                bean.PRDA      = rst.getString("PRDA")      != null ? rst.getString("PRDA").trim()      : "";
                bean.MONTO     = rst.getDouble("MONTO");
                bean.REFERENCE = rst.getString("REFERENCE") != null ? rst.getString("REFERENCE").trim() : "";
                bean.PAYDAY    = rst.getString("PAYDAY")    != null ? rst.getString("PAYDAY").trim()    : "";
                bean.STVAL     = rst.getString("STVAL")     != null ? rst.getString("STVAL").trim()     : "";
                bean.BANDOC    = rst.getString("BANDOC")    != null ? rst.getString("BANDOC").trim()    : "";
                bean.TYPE      = rst.getString("TYPE")      != null ? rst.getString("TYPE").trim()      : "";
                bean.SEQ       = rst.getString("SEQ")       != null ? rst.getString("SEQ").trim()       : "";
                bean.CBATCH    = rst.getString("CBATCH")    != null ? rst.getString("CBATCH").trim()    : "";
                bean.STATE     = rst.getString("STATE")     != null ? rst.getString("STATE").trim()     : "";

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
            if (rst   != null) { try { rst.close();   } catch (SQLException e) { logError.error("SQLException -> " + e.getMessage(), e); } }
            if (cstmt != null) { try { cstmt.close(); } catch (SQLException e) { logError.error("SQLException -> " + e.getMessage(), e); } }
            if (cnx   != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
            pasarGarbageCollector();
        }
        return lstData;
    }

    public List<MPF291> loadMPS573(MPF291Filter filter) throws SQLException, Exception {

        List<MPF291> lstData = new ArrayList<MPF291>(0);
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS573(?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            cstmt.registerOutParameter(9,  Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST      != null ? filter.IN_CCUST.trim()      : session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM  != null ? filter.IN_FECHA_FROM.trim()  : "");
            cstmt.setString(3, filter.IN_FECHA_TO    != null ? filter.IN_FECHA_TO.trim()    : "");
            cstmt.setString(4, filter.IN_OPTION      != null ? filter.IN_OPTION.trim()      : "P");
            cstmt.setString(5, filter.IN_SCURRENCY   != null ? filter.IN_SCURRENCY.trim()   : "");
            cstmt.setString(6, filter.IN_COUNTRY     != null ? filter.IN_COUNTRY.trim()     : "");
            cstmt.setString(7, filter.IN_STVAL       != null ? filter.IN_STVAL.trim()       : "");
            cstmt.setString(8, filter.IN_SFILE       != null ? filter.IN_SFILE.trim()       : "");
            cstmt.setInt(9,  filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                MPF291 bean = new MPF291();
                bean.RN        = rst.getLong("RN");
                bean.CCUST     = rst.getString("CCUST") != null ? rst.getString("CCUST").trim() : "";
                bean.AWBNO     = rst.getString("AWBNO") != null ? rst.getString("AWBNO").trim() : "";
                bean.NCICLO    = rst.getString("NCICLO") != null ? rst.getString("NCICLO").trim() : "";
                bean.METPAGO   = rst.getString("METPAGO") != null ? rst.getString("METPAGO").trim() : "";
                bean.NPAGPAGO  = rst.getString("NPAGPAGO") != null ? rst.getString("NPAGPAGO").trim() : "";
                bean.SCOUNTRY  = rst.getString("SCOUNTRY") != null ? rst.getString("SCOUNTRY").trim() : "";
                bean.ADATE     = rst.getString("ADATE") != null ? rst.getString("ADATE").trim() : "";
                bean.SFILE     = rst.getString("SFILE") != null ? rst.getString("SFILE").trim() : "";
                bean.NPAGE     = rst.getString("NPAGE") != null ? rst.getString("NPAGE").trim() : "";
                bean.PRDA      = rst.getString("PRDA") != null ? rst.getString("PRDA").trim() : "";
                bean.MONTO     = rst.getDouble("MONTO");
                bean.REFERENCE = rst.getString("REFERENCE") != null ? rst.getString("REFERENCE").trim() : "";
                bean.PAYDAY    = rst.getString("PAYDAY") != null ? rst.getString("PAYDAY").trim() : "";
                bean.STVAL     = rst.getString("STVAL") != null ? rst.getString("STVAL").trim() : "";
                bean.BANDOC    = rst.getString("BANDOC") != null ? rst.getString("BANDOC").trim() : "";
                bean.TYPE      = rst.getString("TYPE") != null ? rst.getString("TYPE").trim() : "";
                bean.SEQ       = rst.getString("SEQ") != null ? rst.getString("SEQ").trim() : "";
                bean.CBATCH    = rst.getString("CBATCH") != null ? rst.getString("CBATCH").trim() : "";
                bean.STATE     = rst.getString("STATE") != null ? rst.getString("STATE").trim() : "";

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
            if (rst != null) { try { rst.close(); } catch (SQLException e) { logError.error("SQLException -> " + e.getMessage(), e); } }
            if (cstmt != null) { try { cstmt.close(); } catch (SQLException e) { logError.error("SQLException -> " + e.getMessage(), e); } }
            if (cnx != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
            pasarGarbageCollector();
        }
        return lstData;
    }

    public List<MPF291> loadMPS602(MPF291Filter filter) throws SQLException, Exception {

        List<MPF291> lstData = new ArrayList<MPF291>(0);
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS602(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            cstmt.setString(1, filter.IN_CBATCH.trim());
            cstmt.setString(2, filter.IN_DATEBAT.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                MPF291 bean = new MPF291();
                bean.RN = rst.getLong("RN");
                bean.CCUST     = rst.getString("CCUST").trim();
                bean.AWBNO     = rst.getString("AWBNO").trim();
                bean.NCICLO    = rst.getString("NCICLO").trim();
                bean.DATEBAT    = rst.getString("DATEBAT").trim();
                bean.METPAGO   = rst.getString("METPAGO").trim();
                bean.NPAGPAGO  = rst.getString("NPAGPAGO").trim();
                bean.SCOUNTRY  = rst.getString("SCOUNTRY").trim();
                bean.ADATE     = rst.getString("ADATE").trim();
                bean.SFILE     = rst.getString("SFILE").trim();
                bean.NPAGE     = rst.getString("NPAGE").trim();
                bean.MONTO     = rst.getDouble("MONTO");
                bean.REFERENCE = rst.getString("REFERENCE").trim();
                bean.PAYDAY    = rst.getString("PAYDAY").trim();
                bean.STVAL     = rst.getString("STVAL").trim();
                bean.BANDOC    = rst.getString("BANDOC").trim();
                bean.TYPE      = rst.getString("TYPE").trim();
                bean.SEQ       = rst.getString("SEQ").trim();
                bean.CBATCH    = rst.getString("CBATCH").trim();
                bean.STATE     = rst.getString("STATE").trim();
                bean.USCR      = rst.getString("USCR").trim();
                bean.FECR      = rst.getString("FECR").trim();
                bean.HOCR      = rst.getString("HOCR").trim();
                bean.USUP      = rst.getString("USUP").trim();
                bean.FEUP      = rst.getString("FEUP").trim();
                bean.HOUP      = rst.getString("HOUP").trim();
                lstData.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try { rst.close(); } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public List<Map<String, Object>> loadMPS603(String country, String sfile) throws SQLException, Exception {

        List<Map<String, Object>> lstData = new ArrayList<Map<String, Object>>();
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS603(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.setString(1, country.trim());
            cstmt.setString(2, sfile.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();
            java.sql.ResultSetMetaData meta = rst.getMetaData();
            int colCount = meta.getColumnCount();
            while (rst.next()) {
                Map<String, Object> row = new java.util.LinkedHashMap<String, Object>();
                for (int i = 1; i <= colCount; i++) {
                    Object val = rst.getObject(i);
                    if (val instanceof String) val = ((String) val).trim();
                    row.put(meta.getColumnName(i), val);
                }
                lstData.add(row);
            }
            rst.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try { rst.close(); } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public List<Map<String, Object>> loadMPS751(MPF295Filter filter) throws SQLException, Exception {

        List<Map<String, Object>> lstData = new ArrayList<Map<String, Object>>();
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS751(?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.setString(1, filter.IN_CCUST   != null ? filter.IN_CCUST.trim()      : "");
            cstmt.setString(2, filter.IN_OPTION   != null ? filter.IN_OPTION.trim()     : "P");
            cstmt.setString(3, filter.IN_FECHA_FROM != null ? filter.IN_FECHA_FROM.trim() : "");
            cstmt.setString(4, filter.IN_FECHA_TO   != null ? filter.IN_FECHA_TO.trim()   : "");
            cstmt.setString(5, filter.IN_SCOUNTRY  != null ? filter.IN_SCOUNTRY.trim()  : "");
            cstmt.execute();

            rst = cstmt.getResultSet();
            java.sql.ResultSetMetaData meta = rst.getMetaData();
            int colCount = meta.getColumnCount();

            long totalQTotalSett    = 0, totalQMatchAutoSett = 0, totalQMatchManualSett = 0, totalQPendingSett = 0;
            long totalQTotalSale    = 0, totalQMatchAutoSale = 0, totalQMatchManualSale = 0, totalQPendingSale = 0;

            while (rst.next()) {
                Map<String, Object> row = new java.util.LinkedHashMap<String, Object>();
                for (int i = 1; i <= colCount; i++) {
                    Object val = rst.getObject(i);
                    if (val instanceof String) val = ((String) val).trim();
                    row.put(meta.getColumnName(i), val);
                }
                String adate = row.get("ADATE") != null ? row.get("ADATE").toString() : "";
                row.put("strFormatDate", Functions.getMonthConvert(adate));

                long qTotalSett       = parseLong(row.get("VL_QTY_TOTAL_SETT"));
                long qMatchAutoSett   = parseLong(row.get("VL_QTY_MATCH_AUTO_SETT"));
                long qMatchManualSett = parseLong(row.get("VL_QTY_MATCH_MANUAL_SETT"));
                long qPendingSett     = parseLong(row.get("VL_QTY_PENDING_MANUAL_SETT"));
                long qTotalSale       = parseLong(row.get("VL_QTY_TOTAL_SALE"));
                long qMatchAutoSale   = parseLong(row.get("VL_QTY_MATCH_AUTO_SALE"));
                long qMatchManualSale = parseLong(row.get("VL_QTY_MATCH_MANUAL_SALE"));
                long qPendingSale     = parseLong(row.get("VL_QTY_PENDING_MANUAL_SALE"));

                totalQTotalSett       += qTotalSett;
                totalQMatchAutoSett   += qMatchAutoSett;
                totalQMatchManualSett += qMatchManualSett;
                totalQPendingSett     += qPendingSett;
                totalQTotalSale       += qTotalSale;
                totalQMatchAutoSale   += qMatchAutoSale;
                totalQMatchManualSale += qMatchManualSale;
                totalQPendingSale     += qPendingSale;

                double pctSett = (qTotalSett > 0) ? ((qMatchAutoSett + qMatchManualSett) * 100.0 / qTotalSett) : 0;
                double pctSale = (qTotalSale > 0) ? ((qMatchAutoSale + qMatchManualSale) * 100.0 / qTotalSale) : 0;
                double totalPctSett = (totalQTotalSett > 0) ? ((totalQMatchAutoSett + totalQMatchManualSett) * 100.0 / totalQTotalSett) : 0;
                double totalPctSale = (totalQTotalSale > 0) ? ((totalQMatchAutoSale + totalQMatchManualSale) * 100.0 / totalQTotalSale) : 0;

                row.put("PCT_SETT", pctSett);
                row.put("PCT_SALE", pctSale);
                row.put("TOTAL_QTY_TOTAL_SETT",          String.valueOf(totalQTotalSett));
                row.put("TOTAL_QTY_MATCH_AUTO_SETT",     String.valueOf(totalQMatchAutoSett));
                row.put("TOTAL_QTY_MATCH_MANUAL_SETT",   String.valueOf(totalQMatchManualSett));
                row.put("TOTAL_QTY_PENDING_MANUAL_SETT", String.valueOf(totalQPendingSett));
                row.put("TOTAL_QTY_TOTAL_SALE",          String.valueOf(totalQTotalSale));
                row.put("TOTAL_QTY_MATCH_AUTO_SALE",     String.valueOf(totalQMatchAutoSale));
                row.put("TOTAL_QTY_MATCH_MANUAL_SALE",   String.valueOf(totalQMatchManualSale));
                row.put("TOTAL_QTY_PENDING_MANUAL_SALE", String.valueOf(totalQPendingSale));
                row.put("TOTAL_PCT_SETT", totalPctSett);
                row.put("TOTAL_PCT_SALE", totalPctSale);

                lstData.add(row);
            }
            rst.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try { rst.close(); } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public Map<String, Object> runMPS556() throws Exception {
        return executeRunProc("MPS556");
    }

    public Map<String, Object> runMPS557() throws Exception {
        return executeRunProc("MPS557");
    }

    private Map<String, Object> executeRunProc(String procName) throws Exception {
        Map<String, Object> response = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQL = "{CALL PRAXISMP." + procName + "(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            // INOUT params: register as OUT and set initial value
            cstmt.registerOutParameter(1, Types.INTEGER);
            cstmt.setInt(1, 0);
            cstmt.registerOutParameter(2, Types.VARCHAR);
            cstmt.setString(2, "");

            cstmt.execute();

            int    sqlCode = cstmt.getInt(1);
            String message = cstmt.getString(2);

            response.put("success", (sqlCode >= 0));
            response.put("mensaje", message != null ? message.trim() : procName + " executed.");

        } catch (Exception e) {
            e.printStackTrace();
            logError.error("executeRunProc [" + procName + "] -> " + e.getMessage(), e);
            response.put("success", false);
            response.put("mensaje", "Error executing " + procName + ": " + e.getMessage());
        } finally {
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return response;
    }

    /**
     * Conciliación HN — YA NO es un store DB2: dispara CONCILIACION_HN en el
     * backend Python (Django) vía REST (GET /api/conciliacionHN/?fecr=...).
     * `baseUrl` ya viene resuelto por ambiente desde el controller
     * (ver CargoGuideController.getPythonApiBaseUrl()).
     */
    public Map<String, Object> runConciliacionHN(String baseUrl, String fecr) {
        return llamarConciliacionPais(baseUrl, "/api/conciliacionHN/", fecr, "HN");
    }

    /**
     * Conciliación SV — mismo patrón que HN: dispara MPS_CONCILIACION_SALVADOR
     * en el backend Python vía REST (GET /api/conciliacionSV/?fecr=...).
     * Mismo contrato de request/response que conciliacionHN.
     */
    public Map<String, Object> runConciliacionSV(String baseUrl, String fecr) {
        return llamarConciliacionPais(baseUrl, "/api/conciliacionSV/", fecr, "SV");
    }

    /**
     * Llamada genérica a los endpoints de conciliación por país del backend
     * Python (conciliacionHN/conciliacionSV/...): todos comparten el mismo
     * contrato — IN: fecr (YYYYMMDD, opcional); OUT JSON: {ok, archivos_procesados,
     * conciliados_total, detalle} o {ok:false, error}.
     */
    private Map<String, Object> llamarConciliacionPais(String baseUrl, String path, String fecr, String pais) {
        Map<String, Object> response = new HashMap<>();
        try {
            String url = baseUrl + path;
            Unirest.setTimeouts(600000, 300000);
            HttpResponse<JsonNode> resp = Unirest.get(url)
                    .queryString("fecr", fecr != null ? fecr.trim() : "")
                    .asJson();

            JSONObject body = resp.getBody().getObject();

            if (resp.getStatus() >= 200 && resp.getStatus() < 300 && body.optBoolean("ok", false)) {
                int archivos    = body.optInt("archivos_procesados", 0);
                int conciliados = body.optInt("conciliados_total", 0);
                response.put("success", true);
                response.put("mensaje", "Conciliación " + pais + " completada. Archivos procesados: " + archivos
                        + " | Pagos conciliados: " + conciliados);
            } else {
                String err = body.has("error") ? body.getString("error") : "Error desconocido en el servicio de conciliación.";
                response.put("success", false);
                response.put("mensaje", err);
            }

        } catch (Exception e) {
            e.printStackTrace();
            logError.error("llamarConciliacionPais [" + pais + "] -> " + e.getMessage(), e);
            response.put("success", false);
            response.put("mensaje", "Error al llamar al servicio de conciliación " + pais + ": " + e.getMessage());
        }

        return response;
    }

    /**
     * Extracción de Bancos EC — dispara EXTRACCION_BANCOS_EC (PRAXISMP.MPF102 ->
     * PRAXISMP.MPF287) en el backend Python vía REST (GET /api/extraccionBancosEC/).
     * No recibe parámetros: siempre recorre TODA la cuenta configurada del lado
     * Python (_ACCOUNT_EXTRACCION_EC), por eso no hay `fecr` aquí.
     */
    public Map<String, Object> runExtraccionBancosEC(String baseUrl) {
        Map<String, Object> response = new HashMap<>();
        try {
            String url = baseUrl + "/api/extraccionBancosEC/";
            Unirest.setTimeouts(600000, 300000);
            HttpResponse<JsonNode> resp = Unirest.get(url).asJson();

            JSONObject body = resp.getBody().getObject();

            if (resp.getStatus() >= 200 && resp.getStatus() < 300 && body.optBoolean("ok", false)) {
                int nuevos = body.optInt("nuevos", 0);
                int yaExistian = body.optInt("ya_existian", 0);
                int total = body.optInt("total", 0);
                response.put("success", true);
                response.put("mensaje", "Extracción de Bancos EC completada. Nuevos: " + nuevos
                        + " | Ya existían: " + yaExistian + " | Total procesados: " + total);
            } else {
                String err = body.has("error") ? body.getString("error") : "Error desconocido en el servicio de extracción de bancos.";
                response.put("success", false);
                response.put("mensaje", err);
            }

        } catch (Exception e) {
            e.printStackTrace();
            logError.error("runExtraccionBancosEC -> " + e.getMessage(), e);
            response.put("success", false);
            response.put("mensaje", "Error al llamar al servicio de extracción de bancos EC: " + e.getMessage());
        }

        return response;
    }

    public List<MPF295> loadMPS603(MPF295Filter filter) throws SQLException, Exception {

        List<MPF295> lstData = new ArrayList<>(0);
        MPF295 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS603(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST.trim());
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_COUNTRY.trim());
            
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
                bean = new MPF295();
                
                bean.RN = rst.getLong("RN");
                
                bean.SOCIETY_T1    = rst.getString("SOCIETY_T1") != null ? rst.getString("SOCIETY_T1").trim() : "";
                bean.SCOUNTRY_T1   = rst.getString("SCOUNTRY_T1") != null ? rst.getString("SCOUNTRY_T1").trim() : "";
                bean.BENCENC_T1    = rst.getString("BENCENC_T1") != null ? rst.getString("BENCENC_T1").trim() : "";
                bean.ACCOUNT_T1    = rst.getString("ACCOUNT_T1") != null ? rst.getString("ACCOUNT_T1").trim() : "";
                bean.ASSIGNMEN_T1  = rst.getString("ASSIGNMEN_T1") != null ? rst.getString("ASSIGNMEN_T1").trim() : "";
                bean.REFER_T1      = rst.getString("REFER_T1") != null ? rst.getString("REFER_T1").trim() : "";
                bean.CLAVE1_T1     = rst.getString("CLAVE1_T1") != null ? rst.getString("CLAVE1_T1").trim() : "";
                bean.TXTCABDOC_T1  = rst.getString("TXTCABDOC_T1") != null ? rst.getString("TXTCABDOC_T1").trim() : "";
                bean.BANDOC_T1     = rst.getString("BANDOC_T1") != null ? rst.getString("BANDOC_T1").trim() : "";
                bean.CLAVE3_T1     = rst.getString("CLAVE3_T1") != null ? rst.getString("CLAVE3_T1").trim() : "";
                bean.CLASEDOC_T1   = rst.getString("CLASEDOC_T1") != null ? rst.getString("CLASEDOC_T1").trim() : "";
                bean.DOCDATE_T1    = rst.getString("DOCDATE_T1") != null ? rst.getString("DOCDATE_T1").trim() : "";
                bean.CLAVECONT_T1  = rst.getString("CLAVECONT_T1") != null ? rst.getString("CLAVECONT_T1").trim() : "";
                bean.SCURRENCY_T1  = rst.getString("SCURRENCY_T1") != null ? rst.getString("SCURRENCY_T1").trim() : "";
                bean.NETO_T1       = rst.getDouble("NETO_T1");
                bean.LOCAMOUNT2_T1 = rst.getDouble("LOCAMOUNT2_T1");
                bean.LOCRENCY2_T1  = rst.getString("LOCRENCY2_T1") != null ? rst.getString("LOCRENCY2_T1").trim() : "";
                bean.TEXTO_T1      = rst.getString("TEXTO_T1") != null ? rst.getString("TEXTO_T1").trim() : "";

                bean.SOCIETY_T2    = rst.getString("SOCIETY_T2") != null ? rst.getString("SOCIETY_T2").trim() : "";
                bean.ACCOUNT_T2    = rst.getString("ACCOUNT_T2") != null ? rst.getString("ACCOUNT_T2").trim() : "";
                bean.FECBASE_T2    = rst.getString("FECBASE_T2") != null ? rst.getString("FECBASE_T2").trim() : "";
                bean.BANDOCCAR_T2  = rst.getString("BANDOCCAR_T2") != null ? rst.getString("BANDOCCAR_T2").trim() : "";
                bean.NUMLEG_T2     = rst.getString("NUMLEG_T2") != null ? rst.getString("NUMLEG_T2").trim() : "";
                bean.FCONT_T2      = rst.getString("FCONT_T2") != null ? rst.getString("FCONT_T2").trim() : "";
                bean.IMPORTLOC2_T2 = rst.getDouble("IMPORTLOC2_T2");
                bean.MONSUC2_T2    = rst.getString("MONSUC2_T2") != null ? rst.getString("MONSUC2_T2").trim() : "";
                bean.TEXTO_T2      = rst.getString("TEXTO_T2") != null ? rst.getString("TEXTO_T2").trim() : "";
                bean.CLAVREF1_T2   = rst.getString("CLAVREF1_T2") != null ? rst.getString("CLAVREF1_T2").trim() : "";
                bean.CLAVREF3_T2   = rst.getString("CLAVREF3_T2") != null ? rst.getString("CLAVREF3_T2").trim() : "";
                bean.CENBEN_T2     = rst.getString("CENBEN_T2") != null ? rst.getString("CENBEN_T2").trim() : "";
                bean.SCOUNTRY_T2   = rst.getString("SCOUNTRY_T2") != null ? rst.getString("SCOUNTRY_T2").trim() : "";

                bean.DIFERENCIA         = rst.getDouble("DIFERENCIA");
                bean.COMENTARIO         = rst.getString("COMENTARIO") != null ? rst.getString("COMENTARIO").trim() : "";
                bean.FECHA_ENVIO_VB     = rst.getString("FECHA_ENVIO_VB") != null ? rst.getString("FECHA_ENVIO_VB").trim() : "";
                bean.FECHA_COMPENSACION = rst.getString("FECHA_COMPENSACION") != null ? rst.getString("FECHA_COMPENSACION").trim() : "";
                bean.NAMEFILE     = rst.getString("NAMEFILE") != null ? rst.getString("NAMEFILE").trim() : "";
                bean.IS_PENDIENTE = rst.getInt("IS_PENDIENTE");

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
                try { rst.close(); } catch (SQLException e) { logError.error("Error cerrado RST", e); }
            }
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) { logError.error("Error cerrado CSTM", e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public Map<String, Object> deleteMPS604(MPF295Filter filter) throws Exception {
        Map<String, Object> result = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        // Ahora son 7 parámetros en total (5 IN + 2 INOUT)
        String SQLCLL = "{CALL " + session.getMainLibrary() + "MP.MPS604(?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL);

            // 1. Parámetros IN
            cstmt.setString(1, filter.IN_CCUST != null ? filter.IN_CCUST.trim() : "");
            cstmt.setString(2, filter.IN_CBATCH != null ? filter.IN_CBATCH.trim() : "");
            cstmt.setString(3, filter.IN_DATEBAT != null ? filter.IN_DATEBAT.trim() : "");
            cstmt.setString(4, filter.IN_AWBNO != null ? filter.IN_AWBNO.trim() : "");   // NUEVO
            cstmt.setString(5, filter.IN_SFILE != null ? filter.IN_SFILE.trim() : "");   // NUEVO

            // FIX: Set initial values for INOUT parameters (ahora en posiciones 6 y 7)
            cstmt.setInt(6, 0); 
            cstmt.setString(7, "");

            // 2. Parámetros OUT
            cstmt.registerOutParameter(6, Types.INTEGER); // OUT_CODE
            cstmt.registerOutParameter(7, Types.VARCHAR); // OUT_MESSAGE

            // 3. Ejecutar SP
            cstmt.execute();

            // 4. Leer resultados de salida
            result.put("OUT_CODE", cstmt.getInt(6));
            result.put("OUT_MESSAGE", cstmt.getString(7));

        } finally {
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) { logError.error("Error CSTM", e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return result;
    }

    public List<MPF292> loadMPS605(MPF292Filter filter) throws SQLException, Exception {

        List<MPF292> lstData = new ArrayList<>();
        MPF292 bean;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS605(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, filter.IN_NUMGUIA != null ? filter.IN_NUMGUIA.trim() : "");
            cstmt.setString(2, filter.IN_NUMFAC  != null ? filter.IN_NUMFAC.trim()  : "");

            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF292();
                
                bean.RN = rst.getLong("RN");
                bean.CCUST = rst.getString("CCUST") != null ? rst.getString("CCUST").trim() : "";
                bean.SCOUNTRY = rst.getString("SCOUNTRY") != null ? rst.getString("SCOUNTRY").trim() : "";
                bean.AWBNO = rst.getString("AWBNO") != null ? rst.getString("AWBNO").trim() : "";
                bean.ORGCOD = rst.getString("ORGCOD") != null ? rst.getString("ORGCOD").trim() : "";
                bean.DSTCOD = rst.getString("DSTCOD") != null ? rst.getString("DSTCOD").trim() : "";
                bean.CHGWGT = rst.getString("CHGWGT") != null ? rst.getString("CHGWGT").trim() : "";
                bean.IMPEXPFLG = rst.getString("IMPEXPFLG") != null ? rst.getString("IMPEXPFLG").trim() : "";
                bean.CUSCOD = rst.getString("CUSCOD") != null ? rst.getString("CUSCOD").trim() : "";
                bean.CUSNAM = rst.getString("CUSNAM") != null ? rst.getString("CUSNAM").trim() : "";
                bean.CCAREFNUM = rst.getString("CCAREFNUM") != null ? rst.getString("CCAREFNUM").trim() : "";
                bean.PAYADVNUM = rst.getString("PAYADVNUM") != null ? rst.getString("PAYADVNUM").trim() : "";
                bean.PAYTYP = rst.getString("PAYTYP") != null ? rst.getString("PAYTYP").trim() : "";
                bean.FNLAMT = rst.getString("FNLAMT") != null ? rst.getString("FNLAMT").trim() : "";
                bean.FCCHDAMT = rst.getString("FCCHDAMT") != null ? rst.getString("FCCHDAMT").trim() : "";
                bean.OTHCHGAMT = rst.getString("OTHCHGAMT") != null ? rst.getString("OTHCHGAMT").trim() : "";
                bean.AGTCOM = rst.getString("AGTCOM") != null ? rst.getString("AGTCOM").trim() : "";
                bean.DISCOUNT = rst.getString("DISCOUNT") != null ? rst.getString("DISCOUNT").trim() : "";
                bean.PACURCOD = rst.getString("PACURCOD") != null ? rst.getString("PACURCOD").trim() : "";
                bean.AWBCURCOD = rst.getString("AWBCURCOD") != null ? rst.getString("AWBCURCOD").trim() : "";
                bean.EXCRAT = rst.getString("EXCRAT") != null ? rst.getString("EXCRAT").trim() : "";
                bean.PAYMTD = rst.getString("PAYMTD") != null ? rst.getString("PAYMTD").trim() : "";
                bean.FLTNUM = rst.getString("FLTNUM") != null ? rst.getString("FLTNUM").trim() : "";
                
                
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                lstData.add(bean);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try { rst.close(); } catch (SQLException e) {}
            }
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) {}
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
        }

        return lstData;
    }

    public List<MPF294> loadMPS606(MPF294Filter filter) throws SQLException, Exception {

        List<MPF294> lstData = new ArrayList<>();
        MPF294 bean;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS606(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, filter.IN_NUMGUIA != null ? filter.IN_NUMGUIA.trim() : "");
            cstmt.setString(2, filter.IN_NUMFAC  != null ? filter.IN_NUMFAC.trim()  : "");

            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF294(); 
                
                bean.RN = rst.getLong("RN");

                bean.CCUST = rst.getString("CCUST") != null ? rst.getString("CCUST").trim() : "";
                bean.RESPAY = rst.getString("RESPAY") != null ? rst.getString("RESPAY").trim() : "";
                bean.REFCLI = rst.getString("REFCLI") != null ? rst.getString("REFCLI").trim() : "";
                bean.LUGCOM = rst.getString("LUGCOM") != null ? rst.getString("LUGCOM").trim() : "";
                bean.NUMFAC = rst.getString("NUMFAC") != null ? rst.getString("NUMFAC").trim() : "";
                bean.NETO = rst.getString("NETO") != null ? rst.getString("NETO").trim() : "";
                bean.INFSALES = rst.getString("INFSALES") != null ? rst.getString("INFSALES").trim() : "";
                bean.MATERIAL = rst.getString("MATERIAL") != null ? rst.getString("MATERIAL").trim() : "";
                bean.DESCPOS = rst.getString("DESCPOS") != null ? rst.getString("DESCPOS").trim() : "";
                bean.CENTRO = rst.getString("CENTRO") != null ? rst.getString("CENTRO").trim() : "";
                bean.REFERENCE = rst.getString("REFERENCE") != null ? rst.getString("REFERENCE").trim() : "";
                bean.IMPORTE = rst.getString("IMPORTE") != null ? rst.getString("IMPORTE").trim() : "";
                bean.REFGUIA = rst.getString("REFGUIA") != null ? rst.getString("REFGUIA").trim() : "";
                bean.GUIA = rst.getString("GUIA") != null ? rst.getString("GUIA").trim() : "";
                bean.SCURRENCY = rst.getString("SCURRENCY") != null ? rst.getString("SCURRENCY").trim() : "";
                bean.STVAL = rst.getString("STVAL") != null ? rst.getString("STVAL").trim() : "";
                bean.BANDOC = rst.getString("BANDOC") != null ? rst.getString("BANDOC").trim() : "";
                
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                lstData.add(bean);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try { rst.close(); } catch (SQLException e) {}
            }
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) {}
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
        }

        return lstData;
    }
    
    public List<MPF288> loadMPS607(MPF288Filter filter) throws SQLException, Exception {

        List<MPF288> lstData = new ArrayList<>();
        MPF288 bean;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS607(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, filter.IN_NUMGUIA != null ? filter.IN_NUMGUIA.trim() : "");
            cstmt.setString(2, filter.IN_NUMFAC  != null ? filter.IN_NUMFAC.trim()  : "");

            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF288(); 
                
                bean.RN = rst.getLong("RN");
                
                bean.CCUST = rst.getString("CCUST") != null ? rst.getString("CCUST").trim() : "";
                bean.SOCIETY = rst.getString("SOCIETY") != null ? rst.getString("SOCIETY").trim() : "";
                bean.LCOM = rst.getString("LCOM") != null ? rst.getString("LCOM").trim() : "";
                bean.DIV = rst.getString("DIV") != null ? rst.getString("DIV").trim() : "";
                bean.CENBEN = rst.getString("CENBEN") != null ? rst.getString("CENBEN").trim() : "";
                bean.SCOUNTRY = rst.getString("SCOUNTRY") != null ? rst.getString("SCOUNTRY").trim() : "";
                bean.STVAL = rst.getString("STVAL") != null ? rst.getString("STVAL").trim() : "";
                bean.BLOCPAG = rst.getString("BLOCPAG") != null ? rst.getString("BLOCPAG").trim() : "";
                bean.CLAVREF1 = rst.getString("CLAVREF1") != null ? rst.getString("CLAVREF1").trim() : "";
                bean.CLAVREF3 = rst.getString("CLAVREF3") != null ? rst.getString("CLAVREF3").trim() : "";
                bean.NOMBRE1 = rst.getString("NOMBRE1") != null ? rst.getString("NOMBRE1").trim() : "";
                bean.NUMLEG = rst.getString("NUMLEG") != null ? rst.getString("NUMLEG").trim() : "";
                bean.ACCOUNT = rst.getString("ACCOUNT") != null ? rst.getString("ACCOUNT").trim() : "";
                bean.REFERENCE = rst.getString("REFERENCE") != null ? rst.getString("REFERENCE").trim() : "";
                bean.BANDOCCAR = rst.getString("BANDOCCAR") != null ? rst.getString("BANDOCCAR").trim() : "";
                bean.ADATE = rst.getString("ADATE") != null ? rst.getString("ADATE").trim() : "";
                bean.SCURRENCY = rst.getString("SCURRENCY") != null ? rst.getString("SCURRENCY").trim() : "";
                bean.TEXTO = rst.getString("TEXTO") != null ? rst.getString("TEXTO").trim() : "";
                bean.PAYMET = rst.getString("PAYMET") != null ? rst.getString("PAYMET").trim() : "";
                bean.FCONT = rst.getString("FCONT") != null ? rst.getString("FCONT").trim() : "";
                bean.CLSDOC = rst.getString("CLSDOC") != null ? rst.getString("CLSDOC").trim() : "";
                bean.FECBASE = rst.getString("FECBASE") != null ? rst.getString("FECBASE").trim() : "";
                bean.DELAYDAY = rst.getString("DELAYDAY") != null ? rst.getString("DELAYDAY").trim() : "";
                bean.FECVENC = rst.getString("FECVENC") != null ? rst.getString("FECVENC").trim() : "";
                bean.CONPAY = rst.getString("CONPAY") != null ? rst.getString("CONPAY").trim() : "";
                bean.CME = rst.getString("CME") != null ? rst.getString("CME").trim() : "";
                bean.CLAVECONT = rst.getString("CLAVECONT") != null ? rst.getString("CLAVECONT").trim() : "";
                bean.NETOLOC = rst.getString("NETOLOC") != null ? rst.getString("NETOLOC").trim() : "";
                bean.IMPORTELOC = rst.getString("IMPORTELOC") != null ? rst.getString("IMPORTELOC").trim() : "";
                bean.IMPORTLOC2 = rst.getString("IMPORTLOC2") != null ? rst.getString("IMPORTLOC2").trim() : "";
                bean.MONLOC = rst.getString("MONLOC") != null ? rst.getString("MONLOC").trim() : "";
                bean.MONSUC = rst.getString("MONSUC") != null ? rst.getString("MONSUC").trim() : "";
                bean.MONSUC2 = rst.getString("MONSUC2") != null ? rst.getString("MONSUC2").trim() : "";
                bean.DOCCOMP = rst.getString("DOCCOMP") != null ? rst.getString("DOCCOMP").trim() : "";
                bean.PRDA = rst.getString("PRDA") != null ? rst.getString("PRDA").trim() : "";
                bean.TRAN = rst.getString("TRAN") != null ? rst.getString("TRAN").trim() : "";
                bean.BANDOC = rst.getString("BANDOC") != null ? rst.getString("BANDOC").trim() : "";
                bean.SEQ = rst.getString("SEQ") != null ? rst.getString("SEQ").trim() : "";
                bean.ACCNUMBER = rst.getString("ACCNUMBER") != null ? rst.getString("ACCNUMBER").trim() : "";
                bean.FREGLA = rst.getString("FREGLA") != null ? rst.getString("FREGLA").trim() : "";
                bean.CBATCH = rst.getString("CBATCH") != null ? rst.getString("CBATCH").trim() : "";
                bean.TPERIOD = rst.getString("TPERIOD") != null ? rst.getString("TPERIOD").trim() : "";
                bean.DCYCLE = rst.getString("DCYCLE") != null ? rst.getString("DCYCLE").trim() : "";
                
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                lstData.add(bean);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try { rst.close(); } catch (SQLException e) {}
            }
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) {}
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
        }

        return lstData;
    }
    
    public List<MPF293> loadMPS608(MPF293Filter filter) throws SQLException, Exception {

        List<MPF293> lstData = new ArrayList<>();
        MPF293 bean;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS608(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, filter.IN_NUMGUIA != null ? filter.IN_NUMGUIA.trim() : "");
            cstmt.setString(2, filter.IN_NUMFAC  != null ? filter.IN_NUMFAC.trim()  : "");

            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF293(); 
                
                bean.RN = rst.getLong("RN");
                bean.CCUST = rst.getString("CCUST") != null ? rst.getString("CCUST").trim() : "";
                bean.FDATE = rst.getString("FDATE") != null ? rst.getString("FDATE").trim() : "";
                bean.IDUNI = rst.getString("IDUNI") != null ? rst.getString("IDUNI").trim() : "";
                bean.COMERCIO = rst.getString("COMERCIO") != null ? rst.getString("COMERCIO").trim() : "";
                bean.TDOC = rst.getString("TDOC") != null ? rst.getString("TDOC").trim() : "";
                bean.NRUT = rst.getString("NRUT") != null ? rst.getString("NRUT").trim() : "";
                bean.IDTAQ = rst.getString("IDTAQ") != null ? rst.getString("IDTAQ").trim() : "";
                bean.CODAPLI = rst.getString("CODAPLI") != null ? rst.getString("CODAPLI").trim() : "";
                bean.DOC = rst.getString("DOC") != null ? rst.getString("DOC").trim() : "";
                bean.NDOC = rst.getString("NDOC") != null ? rst.getString("NDOC").trim() : "";
                bean.NOM = rst.getString("NOM") != null ? rst.getString("NOM").trim() : "";
                bean.TELF = rst.getString("TELF") != null ? rst.getString("TELF").trim() : "";
                bean.REFERENCE = rst.getString("REFERENCE") != null ? rst.getString("REFERENCE").trim() : "";
                bean.CONCEPTO = rst.getString("CONCEPTO") != null ? rst.getString("CONCEPTO").trim() : "";
                bean.MONTO = rst.getString("MONTO") != null ? rst.getString("MONTO").trim() : "";
                bean.TPAYMENT = rst.getString("TPAYMENT") != null ? rst.getString("TPAYMENT").trim() : "";
                bean.REFERPAY = rst.getString("REFERPAY") != null ? rst.getString("REFERPAY").trim() : "";
                bean.FPAYMENT = rst.getString("FPAYMENT") != null ? rst.getString("FPAYMENT").trim() : "";
                bean.STATE = rst.getString("STATE") != null ? rst.getString("STATE").trim() : "";
                bean.CUOTAS = rst.getString("CUOTAS") != null ? rst.getString("CUOTAS").trim() : "";
                bean.TTARJET = rst.getString("TTARJET") != null ? rst.getString("TTARJET").trim() : "";
                bean.MSGRESP = rst.getString("MSGRESP") != null ? rst.getString("MSGRESP").trim() : "";
                bean.CODAUTH = rst.getString("CODAUTH") != null ? rst.getString("CODAUTH").trim() : "";
                bean.CYCPSE = rst.getString("CYCPSE") != null ? rst.getString("CYCPSE").trim() : "";
                bean.CUS = rst.getString("CUS") != null ? rst.getString("CUS").trim() : "";
                bean.MULFACT = rst.getString("MULFACT") != null ? rst.getString("MULFACT").trim() : "";
                bean.CAMP1 = rst.getString("CAMP1") != null ? rst.getString("CAMP1").trim() : "";
                bean.CAMP2 = rst.getString("CAMP2") != null ? rst.getString("CAMP2").trim() : "";
                bean.CAMP3 = rst.getString("CAMP3") != null ? rst.getString("CAMP3").trim() : "";
                bean.CAMP4 = rst.getString("CAMP4") != null ? rst.getString("CAMP4").trim() : "";
                bean.CAMP5 = rst.getString("CAMP5") != null ? rst.getString("CAMP5").trim() : "";
                bean.STVAL = rst.getString("STVAL") != null ? rst.getString("STVAL").trim() : "";
                
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                lstData.add(bean);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try { rst.close(); } catch (SQLException e) {}
            }
            if (cstmt != null) {
                try { cstmt.close(); } catch (SQLException e) {}
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
        }

        return lstData;
    }

    public List<MPF295> loadMPS717(String srepid) throws Exception {
        List<MPF295> lstData = new ArrayList<>(0);
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL = "{CALL " + session.getMainLibrary() + "MP.MPS717(?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL);
            cstmt.setString(1, srepid);
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                MPF295 bean = new MPF295();
                bean.RN            = rst.getLong("RN");
                bean.SOCIETY_T1    = rst.getString("SOCIETY_T1").trim();
                bean.SCOUNTRY_T1   = rst.getString("SCOUNTRY_T1").trim();
                bean.BENCENC_T1    = rst.getString("BENCENC_T1").trim();
                bean.ACCOUNT_T1    = rst.getString("ACCOUNT_T1").trim();
                bean.ASSIGNMEN_T1  = rst.getString("ASSIGNMEN_T1").trim();
                bean.REFER_T1      = rst.getString("REFER_T1").trim();
                bean.CLAVE1_T1     = rst.getString("CLAVE1_T1").trim();
                bean.TXTCABDOC_T1  = rst.getString("TXTCABDOC_T1").trim();
                bean.BANDOC_T1     = rst.getString("BANDOC_T1").trim();
                bean.CLAVE3_T1     = rst.getString("CLAVE3_T1").trim();
                bean.CLASEDOC_T1   = rst.getString("CLASEDOC_T1").trim();
                bean.DOCDATE_T1    = rst.getString("DOCDATE_T1").trim();
                bean.CLAVECONT_T1  = rst.getString("CLAVECONT_T1").trim();
                bean.SCURRENCY_T1  = rst.getString("SCURRENCY_T1").trim();
                bean.NETO_T1       = rst.getDouble("NETO_T1");
                bean.LOCAMOUNT2_T1 = rst.getDouble("LOCAMOUNT2_T1");
                bean.LOCRENCY2_T1  = rst.getString("LOCRENCY2_T1").trim();
                bean.TEXTO_T1      = rst.getString("TEXTO_T1").trim();
                bean.SOCIETY_T2    = rst.getString("SOCIETY_T2").trim();
                bean.ACCOUNT_T2    = rst.getString("ACCOUNT_T2").trim();
                bean.FECBASE_T2    = rst.getString("FECBASE_T2").trim();
                bean.BANDOCCAR_T2  = rst.getString("BANDOCCAR_T2").trim();
                bean.NUMLEG_T2     = rst.getString("NUMLEG_T2").trim();
                bean.FCONT_T2      = rst.getString("FCONT_T2").trim();
                bean.IMPORTLOC2_T2 = rst.getDouble("IMPORTLOC2_T2");
                bean.MONSUC2_T2    = rst.getString("MONSUC2_T2").trim();
                bean.TEXTO_T2      = rst.getString("TEXTO_T2").trim();
                bean.CLAVREF1_T2   = rst.getString("CLAVREF1_T2").trim();
                bean.CLAVREF3_T2   = rst.getString("CLAVREF3_T2").trim();
                bean.CENBEN_T2     = rst.getString("CENBEN_T2").trim();
                bean.SCOUNTRY_T2   = rst.getString("SCOUNTRY_T2").trim();
                bean.DIFERENCIA    = rst.getDouble("DIFERENCIA");
                bean.NAMEFILE      = rst.getString("NAMEFILE").trim();
                lstData.add(bean);
            }

        } catch (Exception e) {
            logError.error("loadMPS717 -> " + e.getMessage(), e);
            throw e;
        } finally {
            if (rst   != null) { try { rst.close();   } catch (SQLException e) {} }
            if (cstmt != null) { try { cstmt.close(); } catch (SQLException e) {} }
            if (cnx   != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
        }

        return lstData;
    }

    public Map<String, Object> executeMPS716(String dateFrom, String dateTo, String country) throws Exception {
        Map<String, Object> result = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL = "{CALL " + session.getMainLibrary() + "MP.MPS716(?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL);

            cstmt.setString(1, dateFrom);
            cstmt.setString(2, dateTo);
            cstmt.setString(3, country);
            cstmt.setString(4, session.getUserView().getUserInfo().USR);
            cstmt.registerOutParameter(5, Types.VARCHAR);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.execute();

            result.put("OUT_SREPID",  cstmt.getString(5));
            result.put("OUT_CODE",    cstmt.getInt(6));
            result.put("OUT_MESSAGE", cstmt.getString(7));
            result.put("success", cstmt.getInt(6) == 1);

        } catch (Exception e) {
            logError.error("executeMPS716 -> " + e.getMessage(), e);
            result.put("success", false);
            result.put("OUT_CODE", -99);
            result.put("OUT_MESSAGE", e.getMessage());
        } finally {
            if (cstmt != null) { try { cstmt.close(); } catch (SQLException e) {} }
            if (cnx != null) { session.getCNXIBMDB2().closeIBMDB2Connection(cnx); }
        }

        return result;
    }

    private long parseLong(Object val) {
        try { return val == null ? 0L : Long.parseLong(val.toString().trim()); }
        catch (NumberFormatException e) { return 0L; }
    }
}
