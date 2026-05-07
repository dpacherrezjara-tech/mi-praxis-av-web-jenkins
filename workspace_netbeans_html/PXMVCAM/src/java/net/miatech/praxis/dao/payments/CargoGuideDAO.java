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
import net.miatech.praxis.payment.MPF291;
import net.miatech.praxis.payment.MPF291Filter;
import net.miatech.praxis.payment.MPF295;
import net.miatech.praxis.payment.MPF295Filter;
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS587(?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(5, filter.IN_SCURRENCY.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
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
                bean.SFILE  = rst.getString("SFILE").trim();
                bean.BANDOC = rst.getString("BANDOC").trim();
                bean.TYPE   = rst.getString("TYPE").trim();
                bean.SEQ    = rst.getString("SEQ").trim();
                bean.CBATCH = rst.getString("CBATCH").trim();
                bean.DATEBAT = rst.getString("DATEBAT").trim();
                bean.STATE = rst.getString("STATE").trim();
                
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

        String SQLCLL = "{CALL " + session.getMainLibrary() + "MP.MPS588(?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL);

            // --- 1. SETEAMOS LAS LLAVES Y CAMPOS ---
            cstmt.setString(1, bean.IN_CCUST);
            cstmt.setString(2, bean.IN_SCOUNTRY);
            cstmt.setString(3, bean.IN_NPAGE);
            cstmt.setString(4, bean.IN_PAYDAY);
            cstmt.setString(5, bean.IN_TYPE);
            cstmt.setString(6, bean.IN_SEQ);
            cstmt.setDouble(7, bean.IN_MONTO);
            cstmt.setString(8, bean.IN_ADATE);
            cstmt.setString(9, bean.IN_CUSCA);
            cstmt.setString(10, bean.IN_CODPSE);
            cstmt.setString(11, bean.IN_CBATCH);
            cstmt.setString(12, bean.IN_DATEBAT);
            cstmt.setString(13, bean.IN_STATE);
            cstmt.setString(14, bean.option);
            cstmt.setString(15, session.getUserView().getUserInfo().USR);

            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.VARCHAR);

            cstmt.execute();

            int outCode = cstmt.getInt(16);
            String outMensaje = cstmt.getString(17);

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

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
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
                bean.NAMEFILE = rst.getString("NAMEFILE") != null ? rst.getString("NAMEFILE").trim() : "";

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
}
