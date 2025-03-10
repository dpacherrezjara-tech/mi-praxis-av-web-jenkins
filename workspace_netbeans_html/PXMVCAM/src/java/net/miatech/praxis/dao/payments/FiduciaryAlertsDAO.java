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
import java.sql.Statement;
import java.sql.Types;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import net.miatech.beans.AccountingInterfacesResult;
import net.miatech.beans.SQP04091Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.librfnd.filter.CPF031Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class FiduciaryAlertsDAO {

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

    public List<SQP04091Filter> searchMain(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        CallableStatement cstmt02 = null;
        ResultSet rs02 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXISMP.LIST_FIDUCIARY_ALERTS_MAIN(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_NUMBER_ACCOUNT);
            cstmt01.setString(3, filter.IN_VALUE_DATE);
            cstmt01.setString(4, filter.IN_PROCESSOR);
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            // Obtener el primer y único ResultSet directamente
            rs02 = cstmt01.getResultSet();

            // Crear un DecimalFormat con punto como separador decimal
            DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.US); // Usar punto como separador
            DecimalFormat df = new DecimalFormat("#.##", symbols); // Formato de 2 decimales

            // Procesar registros del ResultSet
            while (rs02 != null && rs02.next()) {

                String SQLCLL02 = "{CALL PRAXISMP.LIST_FIDUCIARY_ALERTS_DETA(?,?,?)}";
                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt02 = cnx.prepareCall(SQLCLL02);
                cstmt02.setString(1, filter.IN_CCUST);
                cstmt02.setString(2, filter.IN_NUMBER_ACCOUNT);
                cstmt02.setString(3, rs02.getString("VALDATE"));
                cstmt02.execute();

                rs01 = cstmt02.getResultSet();
                
                while (rs01 != null && rs01.next()) {

                    objRtn = new SQP04091Filter();

                    objRtn.VALDATE = rs02.getString("VALDATE");
                    objRtn.DAY_NAME = rs02.getString("DAY_NAME");
                    objRtn.AXAV = rs02.getDouble("AXAV");
                    objRtn.AXTA = rs02.getDouble("AXTA");
                    objRtn.DS = rs02.getDouble("DS");
                    objRtn.WQ = rs02.getDouble("WQ");
                    objRtn.WP = rs02.getDouble("WP");

                    objRtn.RR = objRtn.AXAV + objRtn.AXTA + objRtn.DS + objRtn.WQ + objRtn.WP;

                    objRtn.PAXAV = rs01.getDouble("PAXAV");
                    objRtn.PAXTA = rs01.getDouble("PAXTA");
                    objRtn.PDS = rs01.getDouble("PDS");
                    objRtn.PWQ = rs01.getDouble("PWQ");
                    objRtn.PWP = rs01.getDouble("PWP");
                    
                    objRtn.PORAXAV = ((rs02.getDouble("AXAV") - rs01.getDouble("PAXAV")) / rs01.getDouble("PAXAV")) * 100;
                    objRtn.PORAXTA = ((rs02.getDouble("AXTA") - rs01.getDouble("PAXTA")) / rs01.getDouble("PAXTA")) * 100;
                    objRtn.PORDS = ((rs02.getDouble("DS") - rs01.getDouble("PDS")) / rs01.getDouble("PDS")) * 100;
                    objRtn.PORWQ = ((rs02.getDouble("WQ") - rs01.getDouble("PWQ")) / rs01.getDouble("PWQ")) * 100;
                    objRtn.PORWP = ((rs02.getDouble("WP") - rs01.getDouble("PWP")) / rs01.getDouble("PWP")) * 100;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (rs02 != null) {
                try {
                    rs02.close();
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<SQP04091Filter> search(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs02 = null;
        String SQLCLL01 = "{CALL PRAXISMP.LIST_FIDUCIARY_ALERTS(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_NUMBER_ACCOUNT);
            cstmt01.setString(3, filter.IN_SALES_DATE);
            cstmt01.setString(4, filter.IN_PROCESSOR);
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            // Obtener el primer y único ResultSet directamente
            rs02 = cstmt01.getResultSet();

            // Crear un DecimalFormat con punto como separador decimal
            DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.US); // Usar punto como separador
            DecimalFormat df = new DecimalFormat("#.##", symbols); // Formato de 2 decimales

            // Procesar registros del ResultSet
            while (rs02 != null && rs02.next()) {
                objRtn = new SQP04091Filter();

                objRtn.CODPRO = rs02.getString("CODPRO");
                objRtn.TDOC = rs02.getString("TDOC");
                objRtn.SDATE = rs02.getString("SDATE");
                objRtn.SAGENT = rs02.getString("SAGENT");
                objRtn.SCURRENCY = rs02.getString("SCURRENCY");
                objRtn.MERCHAND = rs02.getString("MERCHAND");
                objRtn.ACCNUMA = rs02.getString("ACCNUMA");
                objRtn.TOTAL = rs02.getDouble("TOTAL");
                objRtn.COMISION = rs02.getDouble("COMISION");
                objRtn.IMPORTE = rs02.getDouble("IMPORTE");
                objRtn.NETO = rs02.getDouble("NETO");
                objRtn.SDATE100 = rs02.getString("SDATE100");
                objRtn.SAGENT100 = rs02.getString("SAGENT100");
                objRtn.SCURRENCY100 = rs02.getString("SCURRENCY100");
                objRtn.SVFOP100W = rs02.getDouble("SVFOP100W");
                objRtn.SVFOP100O = rs02.getDouble("SVFOP100O");
                objRtn.SVFOP100P = rs02.getDouble("SVFOP100P");
                objRtn.SVFOP100T = objRtn.SVFOP100W + objRtn.SVFOP100O + objRtn.SVFOP100P;
                objRtn.VARIACION = rs02.getDouble("VARIACION");

                // Calcular el porcentaje de variación
                if (objRtn.SVFOP100W != 0) { // Evitar división por cero
                    double porcentajeVariacion = ((objRtn.TOTAL - objRtn.SVFOP100W) / objRtn.SVFOP100W) * 100;
                    // Formatear a 2 decimales
                    String porcentajeVariacionStr = df.format(porcentajeVariacion); // Formatea a 2 decimales
                    double porcentajeVariacionFormateado = Double.parseDouble(porcentajeVariacionStr); // Convierte a double
                    objRtn.PORCENTAJE_VARIACION = porcentajeVariacionFormateado; // Asignar el valor formateado
                } else {
                    objRtn.PORCENTAJE_VARIACION = 0.0; // Si SVFOP100W es cero, el porcentaje de variación es 0
                }

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (rs02 != null) {
                try {
                    rs02.close();
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
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

    public List<CPF031Filter> lstProcessor() {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<CPF031Filter> listaProcessor = new ArrayList<>();
        CPF031Filter Processor;

        try {
            Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            strSQL = "SELECT CODPRO,COREP, (SELECT CORE FROM PRAXISMP.MPF109 B WHERE A.COREP = B.CODE LIMIT 1) DESCRIP FROM PRAXISMP.MPF060 A WHERE CODPRO <> '' GROUP BY CODPRO,COREP";

            //con = Proveedor.getConnectionIS(user);
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);
            Processor = new CPF031Filter();
            Processor.VALUE = "";
            Processor.NAME = "All";
            listaProcessor.add(Processor);

            while (rst.next()) {
                Processor = new CPF031Filter();
                Processor.VALUE = rst.getString("CODPRO").trim();
                Processor.NAME = Processor.VALUE + " - " + rst.getString("DESCRIP").trim();

                listaProcessor.add(Processor);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return listaProcessor;
    }

}
