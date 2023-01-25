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
import net.miatech.beans.ReportTaxA1530Filter;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00806Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class TaxDetailDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public TaxDetailDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public TaxDetailDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<ReportTaxA1530Filter> loadPXReportTax1530(ReportTaxA1530Filter filter) throws SQLException, Exception {

        List<ReportTaxA1530Filter> lstRtn = new ArrayList<>(0);
        ReportTaxA1530Filter objRtn;
        /* int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;*/

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00295(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        session.getCNXIBMDB2().open();
        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);
            cstmt01.registerOutParameter(18, Types.INTEGER);
            cstmt01.registerOutParameter(19, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.Opcion);
            cstmt01.setString(3, filter.DateFrom);
            cstmt01.setString(4, filter.DateTo);
            cstmt01.setString(5, filter.CONTABLE);
            cstmt01.setString(6, filter.Tax);
            cstmt01.setString(7, filter.GRUPO);
            cstmt01.setString(8, filter.SALES);
            cstmt01.setString(9, filter.Currency);
            cstmt01.setString(10, filter.COUNTRY);
            cstmt01.setString(11, filter.BANK);
            cstmt01.setString(12, filter.IATA);
            cstmt01.setString(13, filter.CHANNEL);
            cstmt01.setString(14, filter.ATO);
            cstmt01.setString(15, filter.COUNTRYTAX);

            cstmt01.setInt(16, filter.page.PAGNUM);
            cstmt01.setInt(17, filter.page.PAGROW);
            cstmt01.setInt(18, filter.page.TOTPAG);
            cstmt01.setInt(19, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(16);
            filter.page.PAGROW = cstmt01.getInt(17);
            filter.page.TOTPAG = cstmt01.getInt(18);
            filter.page.TOTROW = cstmt01.getInt(19);

            /* filter.page.TOTPAG = totPAGS;*/
            rs01 = cstmt01.getResultSet();
            int pos = 0;

            while (rs01.next()) { 
                pos++;
                objRtn = new ReportTaxA1530Filter();
                /*objRtn.FECPROC = rs01.getString("FECPROC");
                objRtn.FECVTA = rs01.getString("FVTA");
                objRtn.IATA = rs01.getString("IATA");
                objRtn.NOMBRE = rs01.getString("NOMBRE");
                objRtn.GRUPO = rs01.getString("A1716GRUPO");
                objRtn.NROBOLETO = rs01.getString("NROBOLETO");
                objRtn.ITINERARIO = rs01.getString("ITINERARIO");
                objRtn.TRANSACCION = rs01.getString("TRANSACCION");
                objRtn.ATO = rs01.getString("ATO");
                objRtn.CODMONEDA = rs01.getString("CODMONEDA");
                objRtn.IMPMDAORI = rs01.getDouble("IMPMDAORI");
                objRtn.IMPMDAREV = rs01.getDouble("IMPMDAREV");
                objRtn.ACOUNTID = rs01.getString("ACOUNTID");
                objRtn.Tax = rs01.getString("TAX");
                objRtn.FECCONT = rs01.getString("FECCONT");
                objRtn.TOTAL_LOC = rs01.getDouble("MONTO_EMD");
                objRtn.COUNTRYTAX = rs01.getString("COUNTRYTAX");
                //objRtn.CUENT = rs01.getString("CUENT");
                objRtn.RN = rs01.getInt("RN");*/

                objRtn.FECPROC = rs01.getString("FECPROC");
                objRtn.FECVTA = rs01.getString("FECVTA");
                objRtn.IATA = rs01.getString("IATA");
                objRtn.NOMBRE = rs01.getString("NOMBRE");
                objRtn.GRUPO = rs01.getString("GRUPO");
                objRtn.NROBOLETO = rs01.getString("NROBOLETO");
                objRtn.ITINERARIO = rs01.getString("ITINERARIO");
                objRtn.TRANSACCION = rs01.getString("TRANSACCION");
                objRtn.ATO = rs01.getString("ATO");
                objRtn.CODMONEDA = rs01.getString("CODMONEDA");
                objRtn.IMPMDAORI = rs01.getDouble("IMPMDAORI");
                //objRtn.CODMDAREV=rs01.getString("CODMDAREV");
                objRtn.IMPMDAREV = rs01.getDouble("IMPMDAREV");
                objRtn.ACOUNTID = rs01.getString("ACOUNTID");
                objRtn.Tax = rs01.getString("TAX");
                objRtn.FECCONT = rs01.getString("FECCONT");
                objRtn.TOTAL_LOC = rs01.getDouble("TOTAL_LOC");
                objRtn.TOTAL_REV = rs01.getDouble("TOTAL_REV");
                objRtn.COUNTRYTAX = rs01.getString("COUNTRYTAX");
                objRtn.FLAG = rs01.getString("FLAG");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            String error = e.toString();
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

    }

}
