/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import net.miatech.praxis.dao.payments.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import net.miatech.beans.AccountingInterfacesResult;
import net.miatech.beans.SQP04091Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.payment.MPF091DTO;
import net.miatech.praxis.payment.MPF102DTO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.response.MPS419Response;
import static net.miatech.praxis.utils.CommonUtils.trimOrEmpty;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class TemplateReconciliationDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP04091Filter> searchAccountingInterfaces(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        // Variables para guardar los totales
        double TOTAL_LIQ = 0;
        double TOTAL_COMISION = 0;
        double TOTAL_RTEFUE = 0;
        double TOTAL_RTEIVA = 0;
        double TOTAL_RTEICA = 0;
        double TOTAL_NETO = 0;
        double TOTAL_LIQ_IMPORTE = 0;
        double TOTAL_TAX_IMPORTE = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;  // Para el segundo result set (registros agrupados)
        String SQLCLL01 = "{CALL PRAXISMP.LIST_ACCOUNTING_INTERFACES_V2(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_EXTRACTION_DATE);
            cstmt01.setString(3, filter.IN_INTERFACE);
            cstmt01.setString(4, filter.IN_REFERENCIA);
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            // Procesar el primer result set (totales)
            rs01 = cstmt01.getResultSet();
            if (rs01.next()) {
                TOTAL_LIQ = rs01.getDouble("VALOR_LIQ");
                TOTAL_COMISION = rs01.getDouble("COMISION");
                TOTAL_RTEFUE = rs01.getDouble("RTEFUE");
                TOTAL_RTEIVA = rs01.getDouble("RTEIVA");
                TOTAL_RTEICA = rs01.getDouble("RTEICA");
                TOTAL_NETO = rs01.getDouble("NETO");
                TOTAL_LIQ_IMPORTE = rs01.getDouble("LIQ_IMPORTE_PAG");
                TOTAL_TAX_IMPORTE = rs01.getDouble("TAX_IMPORTE_PAG");
            }

            // Procesar el segundo result set (registros agrupados)
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new SQP04091Filter();
                    objRtn.IDCONT = rs02.getString("IDCONT");
                    objRtn.INTERFACE = rs02.getString("INTERFACE");
                    objRtn.BANDOC = rs02.getString("BANDOC");
                    objRtn.PROCESADOR = rs02.getString("PROCESADOR");
                    objRtn.REFERENCIA = rs02.getString("REFERENCIA");
                    objRtn.FECHA_EXTRACION = rs02.getString("FECHA_EXTRACION");
                    objRtn.MONEDA_LIQ = rs02.getString("MONEDA_LIQ");
                    objRtn.VALOR_LIQ = rs02.getDouble("VALOR_LIQ");
                    objRtn.COMISION = rs02.getDouble("COMISION");
                    objRtn.RTEFUE = rs02.getDouble("RTEFUE");
                    objRtn.RTEIVA = rs02.getDouble("RTEIVA");
                    objRtn.RTEICA = rs02.getDouble("RTEICA");
                    objRtn.NETO = rs02.getDouble("NETO");
                    objRtn.MONEDA_PAGO = rs02.getString("MONEDA_PAGO");
                    objRtn.LIQ_IMPORTE_PAG = rs02.getDouble("LIQ_IMPORTE_PAG");
                    objRtn.TAX_IMPORTE_PAG = rs02.getDouble("TAX_IMPORTE_PAG");

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    // Asignar los totales al objeto actual
                    objRtn.TOTAL_LIQ = TOTAL_LIQ;
                    objRtn.TOTAL_COMISION = TOTAL_COMISION;
                    objRtn.TOTAL_RTEFUE = TOTAL_RTEFUE;
                    objRtn.TOTAL_RTEIVA = TOTAL_RTEIVA;
                    objRtn.TOTAL_RTEICA = TOTAL_RTEICA;
                    objRtn.TOTAL_NETO = TOTAL_NETO;
                    objRtn.TOTAL_LIQ_IMPORTE = TOTAL_LIQ_IMPORTE;
                    objRtn.TOTAL_TAX_IMPORTE = TOTAL_TAX_IMPORTE;

                    // Agregar el objeto a la lista
                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs02 != null) {
                try {
                    rs02.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<A2290Filter> loadPX269SQP00698Detalle(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQTYTKT = 0;
        double totSVFOP = 0;
        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");
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
        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698DETALLE_V_SEBAS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(22, Types.INTEGER);
            cstmt.registerOutParameter(23, Types.INTEGER);
            cstmt.registerOutParameter(24, Types.INTEGER);
            cstmt.registerOutParameter(25, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SDATE);
            cstmt.setString(5, filter.IN_TDOC);
            cstmt.setString(6, filter.IN_COUNTRY);
            cstmt.setString(7, filter.IN_CARDN1.trim());
            cstmt.setString(8, filter.IN_CARDN2.trim());
            cstmt.setString(9, filter.IN_SCARDNCOR.trim());
            cstmt.setString(10, filter.IN_SAUTHOC.trim());
            cstmt.setString(11, filter.IN_STVAL.trim());
            cstmt.setString(12, filter.IN_NEGOC.trim());
            cstmt.setString(13, filter.IN_COMENT.trim());
            cstmt.setString(14, filter.IN_AGENCY.trim());
            cstmt.setString(15, filter.IN_strSVFOP.trim());
            cstmt.setString(16, filter.IN_FTE.trim());
            cstmt.setString(17, filter.IN_COREP.trim());
            cstmt.setString(18, filter.IN_DATEC.trim());
            cstmt.setString(19, filter.IN_TRANC.trim());
            cstmt.setString(20, filter.IN_BANDOC.trim());
            cstmt.setString(21, filter.TYPEDATE.trim());

            cstmt.setInt(22, filter.page.PAGNUM);
            cstmt.setInt(23, filter.page.PAGROW);
            cstmt.setInt(24, filter.page.TOTPAG);
            cstmt.setInt(25, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(22);
            filter.page.PAGROW = cstmt.getInt(23);
            filter.page.TOTPAG = cstmt.getInt(24);
            filter.page.TOTROW = cstmt.getInt(25);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQTYTKT = rst.getLong("QTYTKT");
                totSVFOP = rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    if (hmDescEstadosSTVAL.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstadosSTVAL.get(rst.getString("STVAL").trim()).toString();
                    }
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.totSVFOP = totSVFOP;
                    beanTkt.lngQTYTKT = rst.getLong("QTYTKT");
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
                    beanTkt.lngTotQTYTKT = lngTotQTYTKT;
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.TRANC = rst.getString("TRANC").trim();
                    beanTkt.descTDOC = hmDescDocType.get(rst.getString("TDOC").trim());
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.PAYDATE = rst.getString("BDATEP").trim();
                    beanTkt.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                    beanTkt.TERMI = rst.getString("TERMI").trim();
                    beanTkt.STCON = rst.getString("STCON").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.strCERROR = rst.getString("ERROR").trim();
                    beanTkt.PENDINGDAYS = rst.getString("PENDINGDAYS").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.COREP = rst.getString("COREP").trim();
                    beanTkt.MERCHNC = rst.getString("MERCHNC").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.strDescripcionCOREP = rst.getString("COREPN").trim();
                    if (hmDescSTCONL.containsKey(rst.getString("STCON").trim())) {
                        beanTkt.STCON = hmDescSTCONL.get(rst.getString("STCON").trim()).toString();
                    } else {
                        beanTkt.STCON = rst.getString("FREGLA").trim();
                    }
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.NEGOC = rst.getString("NEGOC").trim();
                    if (beanTkt.NEGOC.equals("1")) {
                        beanTkt.NEGOC = "PASAJES";
                    } else if (beanTkt.NEGOC.equals("2")) {
                        beanTkt.NEGOC = "CARGO";
                    } else if (beanTkt.NEGOC.equals("3")) {
                        beanTkt.NEGOC = "CORREO";
                    } else if (beanTkt.NEGOC.equals("S")) {
                        beanTkt.NEGOC = "STANDBY";
                    }

                    beanTkt.DCONTA4545 = rst.getString("DCONTA4545").trim();
                    beanTkt.USERA4545 = rst.getString("USERA4545").trim();
                    beanTkt.BANDOC = rst.getString("COREPN").trim();
                    beanTkt.FREGLA = rst.getString("FREGLA").trim();
                    beanTkt.REFER = rst.getString("REFER").trim();

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> searchPendingSettlements(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);

        CallableStatement cstmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        A2290Filter record = null;
        List<A2290Filter> lista = new ArrayList<A2290Filter>();

        double TOTAL_LIQ = 0;
        double TOTAL_COMISION = 0;
        double TOTAL_COMISTOTA = 0;
        double TOTAL_NETO = 0;
        double TOTAL_IMPORTEPAG = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS113_V2(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_CODPRO);
            cstmt.setString(5, filter.IN_MERCHANT);
            cstmt.setString(6, filter.IN_LIQUIDATION);

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

            if (rst.next()) {
                TOTAL_LIQ = rst.getDouble("SUM_TOTAL");
                TOTAL_COMISION = rst.getDouble("SUM_COMISION");
                TOTAL_COMISTOTA = rst.getDouble("SUM_COMISTOTA");
                TOTAL_NETO = rst.getDouble("SUM_NETO");
                TOTAL_IMPORTEPAG = rst.getDouble("SUM_IMPORTEPAG");
            }

            if (cstmt.getMoreResults()) {
                rst2 = cstmt.getResultSet();
                while (rst2.next()) {
                    record = new A2290Filter();
                    record.RN = rst2.getLong("RN");
                    record.SDATE = rst2.getString("SDATE");
                    record.SCOUNTRY = rst2.getString("SCOUNTRY");
                    record.TDOC = rst2.getString("TDOC");
                    record.CODEBANK = rst2.getString("CODEBANK");
                    record.SCARCOD = rst2.getString("SCARCOD");
                    record.SCARDN = rst2.getString("SCARDN");
                    record.SAUTHOC = rst2.getString("SAUTHOC");
                    record.SEQ = rst2.getString("SEQ");
                    record.SVFOP = rst2.getDouble("SVFOP");
                    record.TOTAL = rst2.getDouble("TOTAL");
                    record.NETO = rst2.getDouble("NETO");
                    record.CODPRO = rst2.getString("CODPRO");
                    record.CCUSTPRO = rst2.getString("CCUSTPRO");
                    record.PRDA = rst2.getString("PRDA");
                    record.ADATE = rst2.getString("ADATE");
                    record.MERCHAND = rst2.getString("MERCHAND");

                    record.LIQUIDACIO = rst2.getString("LIQUIDACIO");
                    record.SCURRENCY = rst2.getString("SCURRENCY");
                    record.IMPORTEPAG = rst2.getDouble("IMPORTEPAG");

                    record.COMISION = rst2.getDouble("COMISION");
                    record.COMISTOTA = rst2.getDouble("COMISTOTA");
                    record.STVAL = rst2.getString("STVAL");

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    // Asignar los totales al objeto actual
                    record.TOTAL_LIQ = TOTAL_LIQ;
                    record.TOTAL_COMISION = TOTAL_COMISION;
                    record.TOTAL_COMISTOTA = TOTAL_COMISTOTA;
                    record.TOTAL_NETO = TOTAL_NETO;
                    record.TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;

                    // Agregar el objeto a la lista
                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> searchPendingDiscounts(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<>();
        List<A2290Filter> thirdList = new ArrayList<>();
        List<A2290Filter> combinedList = new ArrayList<>();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        ResultSet rst3 = null;
        A2290Filter record = null;

        double TOTAL_IMPORTE = 0;
        double TOTAL_IMPORTEPAG = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS112(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_CODPRO);
            cstmt.setString(5, filter.IN_MERCHANT);
            cstmt.setString(6, filter.IN_LIQUIDATION);
            cstmt.setString(7, filter.merchandIn);
            cstmt.setString(8, filter.liquidationIn);

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();
            if (rst.next()) {
                TOTAL_IMPORTE = rst.getDouble("SUM_IMPORTE");
                TOTAL_IMPORTEPAG = rst.getDouble("SUM_IMPORTEPAG");
            }

            // Segunda lista
            if (cstmt.getMoreResults()) {
                rst2 = cstmt.getResultSet();
                while (rst2.next()) {
                    record = new A2290Filter();
                    record.RN = rst2.getLong("RN");
                    record.CCUST = rst2.getString("CCUST");
                    record.CODPRO = rst2.getString("CODPRO");
                    record.FLIQUIDACI = rst2.getString("FLIQUIDACI");
                    record.MONEDA = rst2.getString("MONEDA");
                    record.CCUSTPRO = rst2.getString("CCUSTPRO");
                    record.PRDA = rst2.getString("PRDA");
                    record.ADATE = rst2.getString("ADATE");
                    record.MERCHAND = rst2.getString("MERCHAND");
                    record.MONEDAPAGO = rst2.getString("MONEDAPAGO");
                    record.LIQUIDACIO = rst2.getString("LIQUIDACIO");
                    record.IMPORTECeba = rst2.getDouble("IMPORTE");
                    record.IMPORTEPAG = rst2.getDouble("IMPORTEPAG");
                    record.checkActive = false;
                    
                    record.USCR = rst2.getString("USCR");
                    record.FECR = rst2.getString("FECR");
                    record.HOCR = rst2.getString("HOCR");
                    record.PGMCR = rst2.getString("PGMCR");
                    record.USUP = rst2.getString("USUP");
                    record.FEUP = rst2.getString("FEUP");
                    record.HOUP = rst2.getString("HOUP");
                    record.PGMUP = rst2.getString("PGMUP");

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.TOTAL_IMPORTE = TOTAL_IMPORTE;
                    record.TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;

                    lstTkts.add(record);
                }
            }

            // Tercera lista
            if (cstmt.getMoreResults()) {
                rst3 = cstmt.getResultSet();
                while (rst3.next()) {
                    A2290Filter thirdRecord = new A2290Filter();
                    thirdRecord.RN = rst3.getLong("RN");
                    thirdRecord.CCUST = rst3.getString("CCUST");
                    thirdRecord.CODPRO = rst3.getString("CODPRO");
                    thirdRecord.FLIQUIDACI = rst3.getString("FLIQUIDACI");
                    thirdRecord.MONEDA = rst3.getString("MONEDA");
                    thirdRecord.CCUSTPRO = rst3.getString("CCUSTPRO");
                    thirdRecord.PRDA = rst3.getString("PRDA");
                    thirdRecord.ADATE = rst3.getString("ADATE");
                    thirdRecord.MERCHAND = rst3.getString("MERCHAND");
                    thirdRecord.MONEDAPAGO = rst3.getString("MONEDAPAGO");
                    thirdRecord.LIQUIDACIO = rst3.getString("LIQUIDACIO");
                    thirdRecord.IMPORTECeba = rst3.getDouble("IMPORTE");
                    thirdRecord.IMPORTEPAG = rst3.getDouble("IMPORTEPAG");
                    thirdRecord.checkActive = false;
                    
                    record.USCR = rst3.getString("USCR");
                    record.FECR = rst3.getString("FECR");
                    record.HOCR = rst3.getString("HOCR");
                    record.PGMCR = rst3.getString("PGMCR");
                    record.USUP = rst3.getString("USUP");
                    record.FEUP = rst3.getString("FEUP");
                    record.HOUP = rst3.getString("HOUP");
                    record.PGMUP = rst3.getString("PGMUP");

                    thirdRecord.TOTAL_IMPORTE = TOTAL_IMPORTE;
                    thirdRecord.TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;
                    thirdList.add(thirdRecord);
                }
            }

            // Crear claves únicas del tercer resultset
            Set<String> thirdKeySet = new HashSet<>();
            for (A2290Filter f : thirdList) {
                String key = f.CODPRO.trim() + "|" + f.MERCHAND.trim() + "|" + f.LIQUIDACIO.trim() + "|" + f.CCUST.trim() + f.PRDA.trim()
                        + f.CCUSTPRO.trim() + f.FLIQUIDACI.trim() + f.MONEDA.trim();
                thirdKeySet.add(key);
            }

            // Crear lista combinada sin asignar RN aún
            for (A2290Filter item : lstTkts) {
                String key = item.CODPRO.trim() + "|" + item.MERCHAND.trim() + "|" + item.LIQUIDACIO.trim() + "|" + item.CCUST.trim() + item.PRDA.trim()
                        + item.CCUSTPRO.trim() + item.FLIQUIDACI.trim() + item.MONEDA.trim();
                boolean existsInThird = thirdKeySet.contains(key);
                item.checkActive = existsInThird;
                item.blockChange = existsInThird;
                combinedList.add(item);
            }

            // Ordenar: primero los checkActive = true
            combinedList.sort((a, b) -> Boolean.compare(!a.checkActive, !b.checkActive));

            // Reasignar RN y calcular totales solo para los activos
            TOTAL_IMPORTE = 0;
            TOTAL_IMPORTEPAG = 0;
            int countRn = 1;
            for (A2290Filter item : combinedList) {
                item.RN = countRn++;
                if (item.checkActive) {
                    TOTAL_IMPORTE += item.IMPORTECeba;
                    TOTAL_IMPORTEPAG += item.IMPORTEPAG;
                }
            }

            if (!combinedList.isEmpty()) {
                combinedList.get(0).TOTAL_IMPORTE = TOTAL_IMPORTE;
                combinedList.get(0).TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (rst2 != null) try {
                rst2.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (rst3 != null) try {
                rst3.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return combinedList;
    }

    public List<A2290Filter> searchPendingDeposits(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);

        CallableStatement cstmt = null;
        ResultSet rst = null;
        A2290Filter record = null;
        List<A2290Filter> lista = new ArrayList<A2290Filter>();
        double TOTAL_NETO = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS111_V2(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_BANDOC);
            cstmt.setString(5, filter.IN_CODPRO);

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

            if (rst.next()) {
                TOTAL_NETO = rst.getDouble("SUM_NETO");
            }

            // Segunda lista
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    record = new A2290Filter();
                    record.CCUST = rst.getString("CCUST");
                    record.BANDOC = rst.getString("BANDOC");
                    record.VALDATE = rst.getString("VALDATE");
                    record.ADATE = rst.getString("ADATE");
                    record.NETO = rst.getDouble("NETO");
                    record.ACCOUNT = rst.getString("ACCOUNT");
                    record.SOCIETY = rst.getString("SOCIETY");
                    record.CODEBANK_EC = rst.getString("CODEBANK");

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.TOTAL_NETO = TOTAL_NETO;

                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> searchPendingDepositsSales(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);

        CallableStatement cstmt = null;
        ResultSet rst = null;
        A2290Filter record = null;
        List<A2290Filter> lista = new ArrayList<A2290Filter>();
        double TOTAL_NETO = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS108(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_BANDOC);
            cstmt.setString(5, filter.IN_CODPRO);

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

            if (rst.next()) {
                TOTAL_NETO = rst.getDouble("SUM_NETO");
            }

            // Segunda lista
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    record = new A2290Filter();
                    record.RN = rst.getLong("RN");
                    record.CCUST = rst.getString("CCUST");
                    record.BANDOC = rst.getString("BANDOC");
                    record.VALDATE = rst.getString("VALDATE");
                    record.ADATE = rst.getString("ADATE");
                    record.NETO = rst.getDouble("NETO");
                    record.ACCOUNT = rst.getString("ACCOUNT");
                    record.SOCIETY = rst.getString("SOCIETY");
                    record.CODEBANK_EC = rst.getString("CODEBANK");
                    record.SCURRENCY = rst.getString("SCURRENCY");
                    record.checkActive = false;

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.TOTAL_NETO = 0;

                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> searchPendingSales(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);

        CallableStatement cstmt = null;
        ResultSet rst = null;
        A2290Filter record = null;
        List<A2290Filter> lista = new ArrayList<A2290Filter>();
        double TOTAL_SVFOP = 0;
        double TOTAL_SVFOP_CONVERTED = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS107(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_SAGENT);
            cstmt.setString(5, filter.IN_CODPRO);
            cstmt.setString(6, filter.IN_COUNTRY);

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

            if (rst.next()) {
                TOTAL_SVFOP = rst.getDouble("SUM_SVFOP");
                TOTAL_SVFOP_CONVERTED = rst.getDouble("SUM_SVFOP");
            }

            // Segunda lista
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    record = new A2290Filter();
                    record.RN = rst.getLong("RN");
                    record.CCUST = rst.getString("CCUST");
                    record.DATEC = rst.getString("DATEC");
                    record.TRANC = rst.getString("TRANC");
                    record.CCIA = rst.getString("CCIA");
                    record.FORMA = rst.getString("FORMA");
                    record.SERIE = rst.getString("SERIE");
                    record.TDOC = rst.getString("TDOC");
                    record.SCARDNCOR = rst.getString("SCARDNCOR");
                    record.SAUTHOC = rst.getString("SAUTHOC");
                    record.SEQ = rst.getString("SEQ");
                    record.CORRL = rst.getString("CORRL");
                    record.TKT = rst.getString("TKT");
                    record.SAGENT = rst.getString("SAGENT");
                    record.SVFOP = rst.getDouble("SVFOP");
                    record.TOTAL = rst.getDouble("TOTAL");
                    record.SVFOPCON = rst.getDouble("SVFOPCON");
                    record.SCURREVENCONVERT = rst.getString("SCURREVENCONVERT");
                    record.SDATE = rst.getString("SDATE");

                    record.SCOUNTRY = rst.getString("SCOUNTRY");
                    record.SAUTHOC = rst.getString("SAUTHOC");
                    record.SCARDN = rst.getString("SCARDN");
                    record.SCURREVEN = rst.getString("SCURREVEN");
                    record.checkActive = false;
//                    record.BANDOC = rst.getString("BANDOC");
//                    record.VALDATE = rst.getString("VALDATE");
//                    record.ADATE = rst.getString("ADATE");
//                    record.NETO = rst.getDouble("NETO");
//                    record.ACCOUNT = rst.getString("ACCOUNT");
//                    record.SOCIETY = rst.getString("SOCIETY");
//                    record.CODEBANK_EC = rst.getString("CODEBANK");

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.TOTAL_SVFOP = 0;
                    record.TOTAL_SVFOP_CONVERTED = 0;

                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> searchPendingHeads(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);

        CallableStatement cstmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        A2290Filter record = null;
        List<A2290Filter> lista = new ArrayList<A2290Filter>();

        double TOTAL_LIQ = 0;
        double TOTAL_NETO = 0;
        double TOTAL_IMPORTEPAG = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS110(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_CODPRO);
            cstmt.setString(5, filter.IN_MERCHANT);
            cstmt.setString(6, filter.IN_LIQUIDATION);

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

            if (rst.next()) {
                TOTAL_LIQ = rst.getDouble("SUM_TOTAL");
                TOTAL_NETO = rst.getDouble("SUM_NETO");
                TOTAL_IMPORTEPAG = rst.getDouble("SUM_IMPORTEPAG");
            }

            if (cstmt.getMoreResults()) {
                rst2 = cstmt.getResultSet();
                while (rst2.next()) {
                    record = new A2290Filter();
                    record.CCUST = rst2.getString("CCUST");
                    record.PRDA = rst2.getString("PRDA");
                    record.CODPRO = rst2.getString("CODPRO");
                    record.CCUSTPRO = rst2.getString("CCUSTPRO");
                    record.FLIQUIDACI = rst2.getString("FLIQUIDACI");
                    record.LIQUIDACIO = rst2.getString("LIQUIDACIO");
                    record.MERCHAND = rst2.getString("MERCHAND");
                    record.MONEDA = rst2.getString("MONEDA");
                    record.BANDOC = rst2.getString("BANDOC");
                    record.DATECI = rst2.getString("DATECI");
                    record.TRANCI = rst2.getString("TRANCI");
                    record.VALDATE = rst2.getString("VALDATE");
                    record.MONEDAPAGO = rst2.getString("MONEDAPAGO");
                    record.IMPORTEPAG = rst2.getDouble("IMPORTEPAG");
                    record.TOTAL = rst2.getDouble("TOTAL");
                    record.NETO = rst2.getDouble("NETO");

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    // Asignar los totales al objeto actual
                    record.TOTAL_LIQ = TOTAL_LIQ;
                    record.TOTAL_NETO = TOTAL_NETO;
                    record.TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;

                    // Agregar el objeto a la lista
                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public MPS419Response searchPendingDepositsSalesReview(A2290Filter filter)
            throws SQLException, Exception {

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        MPS419Response response = new MPS419Response();

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS419(?,?,?)}";
            cstmt = cnx.prepareCall(SQL);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_BANDOC);
            cstmt.setString(3, filter.IN_CODPRO);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                MPF102DTO dto = new MPF102DTO();
                dto.CCUST = rst.getString("CCUST");
                dto.RN = rst.getLong("RN");
                dto.REFER = rst.getString("REFER");
                dto.VALDATE = rst.getString("VALDATE");
                dto.ADATE = rst.getString("ADATE");
                dto.ACCOUNT = rst.getString("ACCOUNT");
                dto.SOCIETY = rst.getString("SOCIETY");
                dto.SCURRENCY = rst.getString("SCURRENCY");
                dto.BANDOC = rst.getString("BANDOC");
                dto.DATECI = rst.getString("DATECI");
                dto.TRANCI = rst.getString("TRANCI");
                dto.NETO = rst.getDouble("NETO");

                response.deposits.add(dto);
            }

        } finally {
            if (rst != null) {
                rst.close();
            }
            if (cstmt != null) {
                cstmt.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return response;
    }

    public MPS419Response searchPendingDiscoundCom(A2290Filter filter)
            throws SQLException, Exception {

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        MPS419Response response = new MPS419Response();

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS447(?,?,?,?,?)}";
            cstmt = cnx.prepareCall(SQL);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_BANDOC);
            cstmt.setString(3, filter.IN_CODPRO);
            cstmt.setString(4, filter.IN_DATECI);
            cstmt.setString(5, filter.IN_TRANCI);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                MPF091DTO dto = new MPF091DTO();
                dto.RN = rst.getLong("RN");
                dto.CCUST = rst.getString("CCUST");
                dto.PRDA = rst.getString("PRDA");
                dto.CODPRO = rst.getString("CODPRO");
                dto.CCUSTPRO = rst.getString("CCUSTPRO");
                dto.FLIQUIDACI = rst.getString("FLIQUIDACI");
                dto.LIQUIDACIO = rst.getString("LIQUIDACIO");
                dto.MERCHAND = rst.getString("MERCHAND");
                dto.MONEDA = rst.getString("MONEDA");
                dto.MONEDALIQ = rst.getString("MONEDALIQ");
                dto.PAISLIQ = rst.getString("PAISLIQ");
                dto.VALDATE = rst.getString("VALDATE");
                dto.BANDOC = rst.getString("BANDOC");
                dto.DATECI = rst.getString("DATECI");
                dto.TRANCI = rst.getString("TRANCI");
                dto.ADATE = rst.getString("ADATE");
                dto.ACCCOMP = rst.getString("ACCCOMP");
                dto.FSELEC = rst.getString("FSELEC");
                dto.FECSELEC = rst.getString("FECSELEC");
                dto.USCR = rst.getString("USCR");
                dto.FECR = rst.getString("FECR");
                dto.HOCR = rst.getString("HOCR");
                dto.PGMCR = rst.getString("PGMCR");
                dto.USUP = rst.getString("USUP");
                dto.FEUP = rst.getString("FEUP");
                dto.HOUP = rst.getString("HOUP");
                dto.PGMUP = rst.getString("PGMUP");
                dto.CODE = rst.getString("CODE");
                dto.CORRL = rst.getString("CORRL");
                dto.CODIGO = rst.getString("CODIGO");
                dto.TIPOARCH = rst.getString("TIPOARCH");
                dto.MONEDAPAGO = rst.getString("MONEDAPAGO");
                dto.IMPORTE = rst.getDouble("IMPORTE");
                dto.IMPORTEPAG = rst.getDouble("IMPORTEPAG");

                response.invoices.add(dto);
            }

        } finally {
            if (rst != null) {
                rst.close();
            }
            if (cstmt != null) {
                cstmt.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return response;
    }

    public String MaintenanceA2280(A2290Filter bean) throws SQLException, Exception {

        CallableStatement cstmt = null;
        Connection cnx = null;
        String outMensaje = "";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS420(?,?,?,?,?,?,?,?,?,?,?,?)}";
            cstmt = cnx.prepareCall(SQL);

            cstmt.setString(1, trimOrEmpty(bean.IN_CCUST));
            cstmt.setString(2, trimOrEmpty(bean.IN_PRDA));
            cstmt.setString(3, trimOrEmpty(bean.IN_CODPRO));
            cstmt.setString(4, trimOrEmpty(bean.IN_CCUSTPRO));
            cstmt.setString(5, trimOrEmpty(bean.IN_FLIQUIDACI));
            cstmt.setString(6, trimOrEmpty(bean.IN_LIQUIDACIO));
            cstmt.setString(7, trimOrEmpty(bean.IN_MERCHAND));
            cstmt.setString(8, trimOrEmpty(bean.IN_MONEDA));
            cstmt.setString(9, trimOrEmpty(bean.IN_CORRL));
            cstmt.setString(10, trimOrEmpty(bean.IN_CODIGO));
            cstmt.setDouble(11, bean.IN_IMPORTE);

            cstmt.registerOutParameter(12, java.sql.Types.VARCHAR);

            cstmt.execute();

            outMensaje = cstmt.getString(12);

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        } finally {
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException e) {
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return outMensaje;
    }

    public String addDiscountInternacional(A2290Filter bean) throws SQLException, Exception {

        CallableStatement cstmt = null;
        Connection cnx = null;
        String outMensaje = "";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS426(?,?,?,?,?)}";
            cstmt = cnx.prepareCall(SQL);

            cstmt.setString(1, bean.IN_CCUST);
            cstmt.setString(2, bean.IN_BANDOC);
            cstmt.setString(3, bean.IN_DATECI);
            cstmt.setString(4, bean.IN_TRANCI);

            cstmt.registerOutParameter(5, java.sql.Types.VARCHAR);

            cstmt.execute();

            outMensaje = cstmt.getString(5);

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        } finally {
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException ex) {
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return outMensaje;
    }

}
