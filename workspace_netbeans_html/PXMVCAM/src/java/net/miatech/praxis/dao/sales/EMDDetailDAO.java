/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author ZPEREZ
 */
public class EMDDetailDAO {

   private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public EMDDetailDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public EMDDetailDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<ReportEmdDetailsA1530Filter> loadPXReportEmdDetailsA1530(ReportEmdDetailsA1530Filter filter) throws SQLException, Exception {
        List<ReportEmdDetailsA1530Filter> lstRtn = new ArrayList<ReportEmdDetailsA1530Filter>(0);
        ReportEmdDetailsA1530Filter objRtn;
        int pos = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00297(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.Opcion);
            cstmt01.setString(3, filter.DateFrom);
            cstmt01.setString(4, filter.DateTo);
            cstmt01.setString(5, filter.CONTABLE);
            cstmt01.setString(6, filter.GRUPO);
            cstmt01.setString(7, filter.SALES);
            cstmt01.setString(8, filter.COUNTRY);
            cstmt01.setString(9, filter.BANK);
            cstmt01.setString(10, filter.IATA);
            cstmt01.setString(11, filter.CHANNEL);
            cstmt01.setString(12, filter.RFIC);
            cstmt01.setString(13, filter.ServiceCode);
            //cstmt01.setString(14, filter.ATO);

            cstmt01.setInt(14, filter.page.PAGNUM);
            cstmt01.setInt(15, filter.page.PAGROW);
            cstmt01.setInt(16, filter.page.TOTPAG);
            cstmt01.setInt(17, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(14);
            filter.page.PAGROW = cstmt01.getInt(15);
            filter.page.TOTPAG = cstmt01.getInt(16);
            filter.page.TOTROW = cstmt01.getInt(17);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                pos++;
                objRtn = new ReportEmdDetailsA1530Filter();
                objRtn.FECPROC=rs01.getString("FPROC");
                   objRtn.FECVTA=rs01.getString("FECVTA");
                   //objRtn.IATA=rs01.getString("IATA");
                   objRtn.GRUPO=rs01.getString("GRUPO");
                   objRtn.ACOUNTID=rs01.getString("IDCON");
                   objRtn.FECCONT=rs01.getString("FCONT");
                   
                   objRtn.TIPO_DOC=rs01.getString("TIPO_DOC"); 
                   objRtn.Source=rs01.getString("FUENTE"); 
                   objRtn.Transaction=rs01.getString("A720TRNCU");	
                   objRtn.Agent=rs01.getString("A1530AGENT");
                   objRtn.NBR_EMD=rs01.getString("NBR_EMD");
                   objRtn.COD_SER=rs01.getString("COD_SER");	
                   objRtn.Concept=rs01.getString("CONCEPTO");
                   objRtn.Currency=rs01.getString("MONEDA");		
                   objRtn.Amount=rs01.getDouble("IMPORTE");
                   objRtn.ADC=rs01.getDouble("ADC");	
                   objRtn.ADC_REV=rs01.getDouble("ADC_REV");
                   objRtn.IMPORTE_REV=rs01.getDouble("IMPORTE_REV");
                   objRtn.Tax=rs01.getDouble("IMPUESTO");	
                   objRtn.Tax_Revenue=rs01.getDouble("IMPUESTO_REV");		
                   objRtn.Aerial_Ticket=rs01.getString("TKT_AEREO");	 
                   objRtn.PNR=rs01.getString("PNR");		
                   objRtn.ROUTE=rs01.getString("RUTA");
                   objRtn.FARE_BASIS=rs01.getString("FAREBASIS");		
                   objRtn.Fare =rs01.getDouble("TARIFA");
                   objRtn.IVA=rs01.getDouble("IVA");	
                   objRtn.others_taxes=rs01.getDouble("OTROSIMPUESTOS");	
                   objRtn.Commission=rs01.getDouble("COMISION");	
                   objRtn.Total=rs01.getDouble("TOTAL");
                   
                  objRtn.TOTAL_LOC=objRtn.Amount + objRtn.Tax ;
                  objRtn.TOTAL_REV=objRtn.IMPORTE_REV + objRtn.Tax_Revenue ;

                //objRtn.TOTAL_LOC=rs01.getDouble("TOTAL_LOC");
                //objRtn.TOTAL_REV=rs01.getDouble("TOTAL_REV");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
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
    /*public List<ReportEmdDetailsA1530Filter> loadPXReportEmdDetailsA1530(ReportEmdDetailsA1530Filter filter) throws SQLException, Exception {

        List<ReportEmdDetailsA1530Filter> lstRtn = new ArrayList<>(0);
        ReportEmdDetailsA1530Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String error;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00297(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        ///String SQLCLL01 = "{CALL LIBSAP25.SQP00297(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.Opcion);
            cstmt01.setString(3, filter.DateFrom);
            cstmt01.setString(4, filter.DateTo);
            cstmt01.setString(5, filter.CONTABLE);
            // cstmt01.setString(6, filter.Tax);
            cstmt01.setString(6, filter.GRUPO);
            cstmt01.setString(7, filter.SALES);
            //cstmt01.setString(9, filter.Currency);
            cstmt01.setString(8, filter.COUNTRY);
            cstmt01.setString(9, filter.BANK);
            cstmt01.setString(10, filter.IATA);
            cstmt01.setString(11, filter.CHANNEL);
            //cstmt01.setString(14, filter.ATO);

            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);
            //cstmt01.setString(19, filter.COUNTRYTAX);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();
            int pos = 0;

            while (rs01.next()) {
                pos++;
                objRtn = new ReportEmdDetailsA1530Filter();
                objRtn.FECPROC = rs01.getString("FPROC");
                objRtn.FECVTA = rs01.getString("FECVTA");
                //objRtn.IATA=rs01.getString("IATA");
                objRtn.GRUPO = rs01.getString("GRUPO");
                objRtn.ACOUNTID = rs01.getString("IDCON");
                objRtn.FECCONT = rs01.getString("FCONT");

                objRtn.TIPO_DOC = rs01.getString("TIPO_DOC");
                objRtn.Source = rs01.getString("FUENTE");
                objRtn.Transaction = rs01.getString("A720TRNCU");
                objRtn.Agent = rs01.getString("A1530AGENT");
                objRtn.NBR_EMD = rs01.getString("NBR_EMD");
                objRtn.COD_SER = rs01.getString("COD_SER");
                objRtn.Concept = rs01.getString("CONCEPTO");
                objRtn.Currency = rs01.getString("MONEDA");
                objRtn.Amount = rs01.getDouble("IMPORTE");
                objRtn.ADC = rs01.getDouble("ADC");
                objRtn.ADC_REV = rs01.getDouble("ADC_REV");
                objRtn.IMPORTE_REV = rs01.getDouble("IMPORTE_REV");
                objRtn.Tax = rs01.getDouble("IMPUESTO");
                objRtn.Tax_Revenue = rs01.getDouble("IMPUESTO_REV");
                objRtn.Aerial_Ticket = rs01.getString("TKT_AEREO");
                objRtn.PNR = rs01.getString("PNR");
                objRtn.ROUTE = rs01.getString("RUTA");
                objRtn.FARE_BASIS = rs01.getString("FAREBASIS");
                objRtn.Fare = rs01.getDouble("TARIFA");
                objRtn.IVA = rs01.getDouble("IVA");
                objRtn.others_taxes = rs01.getDouble("OTROSIMPUESTOS");
                objRtn.Commission = rs01.getDouble("COMISION");
                objRtn.Total = rs01.getDouble("TOTAL");

                //objRtn.TOTAL_LOC=rs01.getDouble("TOTAL_LOC");
                //objRtn.TOTAL_REV=rs01.getDouble("TOTAL_REV");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

            }

        } catch (Exception e) {
            error = e.toString();
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
            session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }

        return lstRtn;

    }*/

}
