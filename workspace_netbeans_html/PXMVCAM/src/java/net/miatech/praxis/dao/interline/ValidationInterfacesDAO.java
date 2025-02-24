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
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.AccountingInterfacesResult;
import net.miatech.beans.SQP04091Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class ValidationInterfacesDAO {
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
            if (rs02 != null) try { rs02.close(); } catch (SQLException e) { e.printStackTrace(); }
            if (rs01 != null) try { rs01.close(); } catch (SQLException e) { e.printStackTrace(); }
            if (cstmt01 != null) try { cstmt01.close(); } catch (SQLException e) { e.printStackTrace(); }
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

}
