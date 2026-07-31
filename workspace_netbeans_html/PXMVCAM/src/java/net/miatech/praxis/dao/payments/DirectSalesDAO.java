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
import net.miatech.praxis.payment.MPF101Cielo;
import net.miatech.praxis.payment.MPF101CieloFilter;
import net.miatech.praxis.payment.MPF190;
import net.miatech.praxis.payment.MPF190Filter;
import net.miatech.praxis.payment.MPF190ExchangePending;
import net.miatech.praxis.payment.MPF190Update;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
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
public class DirectSalesDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public DirectSalesDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DirectSalesDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<MPF101Cielo> loadMPS580(MPF101CieloFilter filter) throws SQLException, Exception {

        List<MPF101Cielo> lstTkts = new ArrayList<MPF101Cielo>(0);
        MPF101Cielo beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        hmDescDocType.put("R", "Rfnd");
        hmDescDocType.put("C", "Chargebak");
        hmDescDocType.put("A", "Acredit");
        
        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Match");
        hmDescEstadosSTVAL.put("2", "Settlement w/o Paying");
        hmDescEstadosSTVAL.put("3", "Settlement w/o Sales");
        hmDescEstadosSTVAL.put("4", "Match with Difference");
        hmDescEstadosSTVAL.put("5", "Match Manual");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS580(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.TYPEDATE.trim());
            
            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);
            
            // Ejecutamos el Store Procedure
            boolean hasResults = cstmt.execute();

            // Rescatamos los parámetros de paginación
            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            // CORRECCIÓN: Validamos si la ejecución devolvió directamente el primer Result Set
            if (hasResults) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new MPF101Cielo();
                    
                    beanTkt.RN = rst.getLong("RN");
                    
                    beanTkt.NEGOC = rst.getString("NEGOC").trim();
                    if (beanTkt.NEGOC.equals("1")) {
                        beanTkt.NEGOC = "PASAJES";
                    } else if (beanTkt.NEGOC.equals("2")) {
                        beanTkt.NEGOC = "CARGO";
                    } else if (beanTkt.NEGOC.equals("3")) {
                        beanTkt.NEGOC = "CORREO";
                    } else if (beanTkt.NEGOC.equals("S")) {
                        beanTkt.NEGOC = "STANDBY";
                    } else if (beanTkt.NEGOC.equals("4")) {
                        beanTkt.NEGOC = "TURISMO";
                    }
                    
                    // Blindaje contra NULLs antes de hacer el .trim()
                    beanTkt.strDescripcionCOREP = rst.getString("COREPN").trim();
                    beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());
                    beanTkt.CCUST = rst.getString("CCUST") != null ? rst.getString("CCUST").trim() : "";
                    beanTkt.SDATE = rst.getString("SDATE") != null ? rst.getString("SDATE").trim() : "";
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY") != null ? rst.getString("SCOUNTRY").trim() : "";
                    beanTkt.TDOC = rst.getString("TDOC") != null ? rst.getString("TDOC").trim() : "";
                    beanTkt.CODEBANK = rst.getString("CODEBANK") != null ? rst.getString("CODEBANK").trim() : "";
                    beanTkt.STVAL = rst.getString("STVAL") != null ? rst.getString("STVAL").trim() : "";
                    beanTkt.SCARCOD = rst.getString("SCARCOD") != null ? rst.getString("SCARCOD").trim() : "";
                    beanTkt.COREP = rst.getString("COREP") != null ? rst.getString("COREP").trim() : "";
                    beanTkt.CODPRO = rst.getString("CODPRO") != null ? rst.getString("CODPRO").trim() : "";
                    beanTkt.BANDOC = rst.getString("BANDOC") != null ? rst.getString("BANDOC").trim() : "";
                    beanTkt.PNR_SALE = rst.getString("PNR_SALE") != null ? rst.getString("PNR_SALE").trim() : "";
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY") != null ? rst.getString("SCURRENCY").trim() : "";
                   
                    beanTkt.SCARDN = rst.getString("SCARDN") != null ? rst.getString("SCARDN").trim() : "";
                    beanTkt.SCARDNCOR = rst.getString("SCARDNCOR") != null ? rst.getString("SCARDNCOR").trim() : "";
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC") != null ? rst.getString("SAUTHOC").trim() : "";
                    beanTkt.SEQ = rst.getString("SEQ") != null ? rst.getString("SEQ").trim() : "";
                    beanTkt.MERCHNC = rst.getString("MERCHNC") != null ? rst.getString("MERCHNC").trim() : "";
                    beanTkt.SEEDCODE = rst.getString("SEEDCODE") != null ? rst.getString("SEEDCODE").trim() : "";
                    beanTkt.PAYDATE = rst.getString("PAYDATE") != null ? rst.getString("PAYDATE").trim() : "";
                    
                    beanTkt.PAYDATE_LAST = rst.getString("PAYDATE_LAST") != null ? rst.getString("PAYDATE_LAST").trim() : "";
                    beanTkt.NCUOTA_LAST = rst.getString("NCUOTA_LAST") != null ? rst.getString("NCUOTA_LAST").trim() : "";
                    beanTkt.SVFOP_LAST = rst.getFloat("SVFOP_LAST");
                    beanTkt.TOTAMOU_LAST = rst.getFloat("TOTAMOU_LAST");
                    
                    if (hmDescEstadosSTVAL.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstadosSTVAL.get(rst.getString("STVAL").trim()).toString();
                    }
                    
                    beanTkt.SVFOP = rst.getFloat("SVFOP");
                    beanTkt.TOTCUOTA = rst.getFloat("TOTCUOTA");
                    beanTkt.NCUOTA = rst.getFloat("NCUOTA");
                    beanTkt.ABALANCE = rst.getFloat("ABALANCE");
                    beanTkt.TOTAMOU = rst.getFloat("TOTAMOU");
                    beanTkt.ABALANCE_LAST = rst.getFloat("ABALANCE_LAST");
                    
                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
            }

        } catch (Exception e) {
            logError.error("Exception -> " + e.getMessage(), e);
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstTkts;
    }

     public List<MPF101Cielo> loadMPS582(MPF101CieloFilter filter) throws SQLException, Exception {

        List<MPF101Cielo> lstTkts = new ArrayList<MPF101Cielo>(0);
        MPF101Cielo beanTkt;
        
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        hmDescDocType.put("R", "Rfnd");
        hmDescDocType.put("C", "Chargebak");
        hmDescDocType.put("A", "Acredit");
        
        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Match");
        hmDescEstadosSTVAL.put("2", "Pending");
        hmDescEstadosSTVAL.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS582(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SCARDN);
            cstmt.setString(3, filter.IN_SAUTHOC);

            cstmt.setInt(4, filter.page.PAGNUM);
            cstmt.setInt(5, filter.page.PAGROW);
            cstmt.setInt(6, filter.page.TOTPAG);
            cstmt.setInt(7, filter.page.TOTROW);
            
            boolean hasResults = cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(4);
            filter.page.PAGROW = cstmt.getInt(5);
            filter.page.TOTPAG = cstmt.getInt(6);
            filter.page.TOTROW = cstmt.getInt(7);

            if (hasResults) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new MPF101Cielo();
                    beanTkt.RN = rst.getLong("RN");
                     beanTkt.STVAL = rst.getString("STVAL") != null ? rst.getString("STVAL").trim() : "";
                     beanTkt.SCURRENCY = rst.getString("SCURRENCY") != null ? rst.getString("SCURRENCY").trim() : "";
                     beanTkt.SAGENT = rst.getString("SAGENT") != null ? rst.getString("SAGENT").trim() : "";
                     beanTkt.CFUENTE = rst.getString("CFUENTE") != null ? rst.getString("CFUENTE").trim() : "";
                     beanTkt.SCONSOL = rst.getString("SCONSOL") != null ? rst.getString("SCONSOL").trim() : "";
                     beanTkt.INVOICE = rst.getString("INVOICE") != null ? rst.getString("INVOICE").trim() : "";
                    if (hmDescEstadosSTVAL.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstadosSTVAL.get(rst.getString("STVAL").trim()).toString();
                    }
                    beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());
                    beanTkt.CCUST = rst.getString("CCUST") != null ? rst.getString("CCUST").trim() : "";
                    beanTkt.TICKET = rst.getString("TICKET") != null ? rst.getString("TICKET").trim() : "";
                    beanTkt.SPNR = rst.getString("SPNR") != null ? rst.getString("SPNR").trim() : "";
                    beanTkt.SDATE = rst.getString("SDATE") != null ? rst.getString("SDATE").trim() : "";
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY") != null ? rst.getString("SCOUNTRY").trim() : "";
                    beanTkt.TDOC = rst.getString("TDOC") != null ? rst.getString("TDOC").trim() : "";
                    beanTkt.SCARDN = rst.getString("SCARDN") != null ? rst.getString("SCARDN").trim() : "";
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC") != null ? rst.getString("SAUTHOC").trim() : "";
                    beanTkt.SCARCOD = rst.getString("SCARCOD") != null ? rst.getString("SCARCOD").trim() : "";
                    beanTkt.SVFOP = rst.getFloat("SVFOP");
                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;
                    lstTkts.add(beanTkt);
                }
            }

        } catch (Exception e) {
            logError.error("Exception -> " + e.getMessage(), e);
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstTkts;
    }

      public List<MPF190> loadMPS774(MPF190Filter filter) throws SQLException, Exception {

        List<MPF190> lstData = new ArrayList<MPF190>(0);
        MPF190 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        long   totalQTotal = 0, totalQMatch = 0, totalQManual = 0, totalQPend = 0;
        double totalAmtTotal = 0, totalAmtMatch = 0, totalAmtManual = 0, totalAmtPend = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS774(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_SEARCH);
            cstmt.setString(3, filter.IN_DATE_FROM);
            cstmt.setString(4, filter.IN_DATE_TO);
            cstmt.setString(5, filter.IN_SCOUNTRY);
            cstmt.setString(6, filter.IN_SAGENT);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF190();

                bean.ADATE = rst.getString("ADATE");
                bean.strFormatDate = Functions.getMonthConvert(bean.ADATE);
                bean.CCUST = rst.getString("CCUST") != null ? rst.getString("CCUST").trim() : "";

                long   qTotal  = rst.getLong("VL_QTY_TOTAL");
                long   qMatch  = rst.getLong("VL_QTY_MATCH");
                long   qManual = rst.getLong("VL_QTY_MANUAL");
                long   qPend   = rst.getLong("VL_QTY_PEND");
                double aTotal  = rst.getDouble("VL_AMT_TOTAL");
                double aMatch  = rst.getDouble("VL_AMT_MATCH");
                double aManual = rst.getDouble("VL_AMT_MANUAL");
                double aPend   = rst.getDouble("VL_AMT_PEND");

                bean.VL_QTY_TOTAL  = qTotal;
                bean.VL_QTY_MATCH  = qMatch;
                bean.VL_QTY_MANUAL = qManual;
                bean.VL_QTY_PEND   = qPend;
                bean.VL_AMT_TOTAL  = aTotal;
                bean.VL_AMT_MATCH  = aMatch + aManual;
                bean.VL_AMT_MANUAL = aManual;
                bean.VL_AMT_PEND   = aPend;

                bean.PCT_PROCESADO = (qTotal > 0) ? ((qMatch + qManual) * 100.0 / qTotal) : 0;

                lstData.add(bean);

                totalQTotal    += qTotal;
                totalQMatch    += qMatch;
                totalQManual   += qManual;
                totalQPend     += qPend;
                totalAmtTotal  += aTotal;
                totalAmtMatch  += aMatch + aManual;
                totalAmtManual += aManual;
                totalAmtPend   += aPend;
            }
            rst.close();

            // Fila sintética con los totales generales, al final de la lista
            // (misma convención que MPS657: la UI toma el último elemento como "totales")
            MPF190 totals = new MPF190();
            totals.TOTAL_QTOTAL    = totalQTotal;
            totals.TOTAL_QMATCH    = totalQMatch;
            totals.TOTAL_QMANUAL   = totalQManual;
            totals.TOTAL_QPEND     = totalQPend;
            totals.TOTAL_AMTTOTAL  = totalAmtTotal;
            totals.TOTAL_AMTMATCH  = totalAmtMatch;
            totals.TOTAL_AMTMANUAL = totalAmtManual;
            totals.TOTAL_AMTPEND   = totalAmtPend;
            totals.TOTAL_PCT = (totalQTotal > 0) ? ((totalQMatch + totalQManual) * 100.0 / totalQTotal) : 0;
            lstData.add(totals);

        } catch (Exception e) {
            logError.error("Exception -> " + e.getMessage(), e);
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstData;
    }

    public List<MPF190ExchangePending> loadMPS776(MPF190Filter filter) throws SQLException, Exception {

        List<MPF190ExchangePending> lstData = new ArrayList<MPF190ExchangePending>(0);
        MPF190ExchangePending bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS776(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_SEARCH);
            cstmt.setString(3, filter.IN_DATE_FROM);
            cstmt.setString(4, filter.IN_DATE_TO);
            cstmt.setString(5, filter.IN_SCOUNTRY);
            cstmt.setString(6, filter.IN_SAGENT);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF190ExchangePending();

                bean.SDATE = rst.getString("SDATE") != null ? rst.getString("SDATE").trim() : "";
                bean.SCURRENCY = rst.getString("SCURRENCY") != null ? rst.getString("SCURRENCY").trim() : "";

                lstData.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            logError.error("Exception -> " + e.getMessage(), e);
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstData;
    }

    public Map<String, Object> executeMPS320() throws SQLException, Exception {

        Map<String, Object> result = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS320(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setInt(1, 0);
            cstmt.registerOutParameter(1, Types.INTEGER);
            cstmt.setString(2, "");
            cstmt.registerOutParameter(2, Types.VARCHAR);

            cstmt.execute();

            int sqlCode = cstmt.getInt(1);
            String message = cstmt.getString(2);

            result.put("success", sqlCode != 0);
            result.put("sqlCode", sqlCode);
            result.put("message", message);

        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "SQL Error: " + e.getMessage());
            logError.error("Exception -> " + e.getMessage(), e);
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return result;
    }

    public String updateMPS777(MPF190Update bean) throws SQLException, Exception {

        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS777(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, bean.CCUST);
            cstmt.setString(2, bean.TREG);
            cstmt.setString(3, bean.ADATE_OLD);
            cstmt.setString(4, bean.SCOUNTRY);
            cstmt.setString(5, bean.SAGENT);
            cstmt.setString(6, bean.SCURRENCY);
            cstmt.setString(7, bean.CBATCH);
            cstmt.setString(8, bean.SEQ);

            cstmt.setString(9, bean.ADATE);
            cstmt.setDouble(10, Double.parseDouble(bean.NETO.trim()));
            cstmt.setDouble(11, Double.parseDouble(bean.PAYAMOU.trim()));
            cstmt.setString(12, bean.SDATE);
            cstmt.setString(13, bean.REFERENCE);
            cstmt.setString(14, bean.SFILE);
            cstmt.setString(15, bean.NPAG);
            cstmt.setString(16, bean.COMMENTS);

            cstmt.setString(17, session.getUserView().getUserInfo().USR);

            cstmt.execute();

        } catch (Exception e) {
            strMsj = "Error: " + e.getMessage();
            logError.error("Exception -> " + e.getMessage(), e);
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return strMsj;
    }

    public List<MPF190> loadMPS775(MPF190Filter filter) throws SQLException, Exception {

        List<MPF190> lstData = new ArrayList<MPF190>(0);
        MPF190 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS775(?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_SEARCH);
            cstmt.setString(3, filter.IN_PERIODO);
            cstmt.setString(4, filter.IN_STVAL);
            cstmt.setString(5, filter.IN_SCOUNTRY);

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF190();

                bean.NBR = rst.getLong("NBR");
                bean.CCUST = rst.getString("CCUST") != null ? rst.getString("CCUST").trim() : "";
                bean.TREG = rst.getString("TREG") != null ? rst.getString("TREG").trim() : "";
                bean.CBATCH = rst.getString("CBATCH") != null ? rst.getString("CBATCH").trim() : "";
                bean.SEQ = rst.getString("SEQ") != null ? rst.getString("SEQ").trim() : "";
                bean.COMMENTS = rst.getString("COMMENTS") != null ? rst.getString("COMMENTS").trim() : "";
                bean.SCOUNTRY = rst.getString("SCOUNTRY") != null ? rst.getString("SCOUNTRY").trim() : "";
                bean.SCURRENCY = rst.getString("SCURRENCY") != null ? rst.getString("SCURRENCY").trim() : "";
                bean.NETO = rst.getDouble("NETO");
                bean.PAYAMOU = rst.getDouble("PAYAMOU");
                bean.ADATE = rst.getString("ADATE") != null ? rst.getString("ADATE").trim() : "";
                bean.SDATE = rst.getString("SDATE") != null ? rst.getString("SDATE").trim() : "";
                bean.REFERENCE = rst.getString("REFERENCE") != null ? rst.getString("REFERENCE").trim() : "";
                bean.SFILE = rst.getString("SFILE") != null ? rst.getString("SFILE").trim() : "";
                bean.NPAG = rst.getString("NPAG") != null ? rst.getString("NPAG").trim() : "";
                bean.SAGENT = rst.getString("SAGENT") != null ? rst.getString("SAGENT").trim() : "";
                bean.STVAL = rst.getString("STVAL") != null ? rst.getString("STVAL").trim() : "";

                bean.USCR = rst.getString("USCR") != null ? rst.getString("USCR").trim() : "";
                bean.FECR = rst.getString("FECR") != null ? rst.getString("FECR").trim() : "";
                bean.HOCR = rst.getString("HOCR") != null ? rst.getString("HOCR").trim() : "";
                bean.PGMCR = rst.getString("PGMCR") != null ? rst.getString("PGMCR").trim() : "";
                bean.USUP = rst.getString("USUP") != null ? rst.getString("USUP").trim() : "";
                bean.FEUP = rst.getString("FEUP") != null ? rst.getString("FEUP").trim() : "";
                bean.HOUP = rst.getString("HOUP") != null ? rst.getString("HOUP").trim() : "";
                bean.PGMUP = rst.getString("PGMUP") != null ? rst.getString("PGMUP").trim() : "";

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                lstData.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            logError.error("Exception -> " + e.getMessage(), e);
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> " + e.getMessage(), e);
                }
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstData;
    }

      public List<MPF101Cielo> loadMPS581(MPF101CieloFilter filter) throws SQLException, Exception {

        List<MPF101Cielo> lstTkts = new ArrayList<MPF101Cielo>(0);
        MPF101Cielo beanTkt;
        
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        hmDescDocType.put("R", "Rfnd");
        hmDescDocType.put("C", "Chargebak");
        hmDescDocType.put("A", "Acredit");
        
        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Match");
        hmDescEstadosSTVAL.put("2", "Settlement w/o Paying");
        hmDescEstadosSTVAL.put("3", "Settlement w/o Sales");
        hmDescEstadosSTVAL.put("4", "Match with Difference");
        hmDescEstadosSTVAL.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS581(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_SDATE);
            cstmt.setString(3, filter.IN_SCOUNTRY);
            cstmt.setString(4, filter.IN_TDOC);
            cstmt.setString(5, filter.IN_SCARCOD);
            cstmt.setString(6, filter.IN_SCARDN);
            cstmt.setString(7, filter.IN_SCARDNCOR);

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            
            boolean hasResults = cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            if (hasResults) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new MPF101Cielo();
                    
                    beanTkt.RN = rst.getLong("RN");
                    if (hmDescEstadosSTVAL.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstadosSTVAL.get(rst.getString("STVAL").trim()).toString();
                    }
                    beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());
                    beanTkt.CCUST = rst.getString("CCUST") != null ? rst.getString("CCUST").trim() : "";
                    beanTkt.SDATE = rst.getString("SDATE") != null ? rst.getString("SDATE").trim() : "";
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY") != null ? rst.getString("SCOUNTRY").trim() : "";
                    beanTkt.TDOC = rst.getString("TDOC") != null ? rst.getString("TDOC").trim() : "";
                    beanTkt.CODEBANK = rst.getString("CODEBANK") != null ? rst.getString("CODEBANK").trim() : "";
                    beanTkt.STVAL = rst.getString("STVAL") != null ? rst.getString("STVAL").trim() : "";
                    beanTkt.SCARCOD = rst.getString("SCARCOD") != null ? rst.getString("SCARCOD").trim() : "";
                    beanTkt.COREP = rst.getString("COREP") != null ? rst.getString("COREP").trim() : "";
                    beanTkt.CODPRO = rst.getString("CODPRO") != null ? rst.getString("CODPRO").trim() : "";
                    beanTkt.NEGOC = rst.getString("NEGOC") != null ? rst.getString("NEGOC").trim() : "";
                    
                     if (beanTkt.NEGOC.equals("1")) {
                        beanTkt.NEGOC = "PASAJES";
                    } else if (beanTkt.NEGOC.equals("2")) {
                        beanTkt.NEGOC = "CARGO";
                    } else if (beanTkt.NEGOC.equals("3")) {
                        beanTkt.NEGOC = "CORREO";
                    } else if (beanTkt.NEGOC.equals("S")) {
                        beanTkt.NEGOC = "STANDBY";
                    } else if (beanTkt.NEGOC.equals("4")) {
                        beanTkt.NEGOC = "TURISMO";
                    }
                    
                    beanTkt.SCARDN = rst.getString("SCARDN") != null ? rst.getString("SCARDN").trim() : "";
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY") != null ? rst.getString("SCURRENCY").trim() : "";
                    beanTkt.SCARDNCOR = rst.getString("SCARDNCOR") != null ? rst.getString("SCARDNCOR").trim() : "";
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC") != null ? rst.getString("SAUTHOC").trim() : "";
                    beanTkt.SEQ = rst.getString("SEQ") != null ? rst.getString("SEQ").trim() : "";
                    beanTkt.MERCHNC = rst.getString("MERCHNC") != null ? rst.getString("MERCHNC").trim() : "";
                    beanTkt.SEEDCODE = rst.getString("SEEDCODE") != null ? rst.getString("SEEDCODE").trim() : "";
                    beanTkt.PAYDATE = rst.getString("PAYDATE") != null ? rst.getString("PAYDATE").trim() : "";
                    beanTkt.SVFOP_LAST = rst.getFloat("SVFOP_LAST");
                    beanTkt.SVFOP = rst.getFloat("SVFOP");
                    beanTkt.TOTCUOTA = rst.getFloat("TOTCUOTA");
                    beanTkt.TOTAMOU = rst.getFloat("TOTAMOU");
                    beanTkt.NCUOTA = rst.getFloat("NCUOTA");
                    beanTkt.ABALANCE = rst.getFloat("ABALANCE");
                    
                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
            }

        } catch (Exception e) {
            logError.error("Exception -> " + e.getMessage(), e);
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstTkts;
    }
    
}
