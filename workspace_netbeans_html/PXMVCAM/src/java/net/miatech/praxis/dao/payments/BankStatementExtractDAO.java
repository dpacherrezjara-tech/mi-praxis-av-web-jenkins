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
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.librfnd.filter.CPF031Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2356Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class BankStatementExtractDAO {

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

    public List<SQP04091Filter> searchUsaflowDiary(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        double TOTAL_AMOUNT_WP_UK_CO = 0, TOTAL_AMOUNT_BANCARD_CO = 0, TOTAL_AMOUNT_AMEX_CO = 0,
        TOTAL_AMOUNT_DISCOVER_CO = 0, TOTAL_AMOUNT_WP_UK_SA = 0, TOTAL_AMOUNT_BANCARD_SA = 0,
        TOTAL_AMOUNT_AMEX_SA = 0, TOTAL_AMOUNT_DISCOVER_SA = 0, TOTAL_TOTAL_CO = 0,
        TOTAL_TOTAL_SA = 0, TOTAL_TOTAL_CO_AND_SA = 0, TOTAL_AVG_WP_UK_CO = 0, TOTAL_AVG_BANCARD_CO = 0,
        TOTAL_AVG_AMEX_CO = 0, TOTAL_AVG_DISCOVER_CO = 0, TOTAL_AVG_WP_UK_SA = 0, TOTAL_AVG_BANCARD_SA = 0,
        TOTAL_AVG_AMEX_SA = 0, TOTAL_AVG_DISCOVER_SA = 0, TOTAL_AVG_TOTAL_CO = 0, TOTAL_AVG_TOTAL_SA = 0,
        TOTAL_AVG_TOTAL_CO_SA = 0, TOTAL_VAR_WP_UK_CO = 0, TOTAL_VAR_BANCARD_CO = 0, TOTAL_VAR_AMEX_CO = 0,
        TOTAL_VAR_DISCOVER_CO = 0, TOTAL_VAR_WP_UK_SA = 0, TOTAL_VAR_BANCARD_SA = 0, TOTAL_VAR_AMEX_SA = 0,
        TOTAL_VAR_DISCOVER_SA = 0, TOTAL_VAR_TOTAL_CO = 0, TOTAL_VAR_TOTAL_SA = 0, TOTAL_VAR_TOTAL_CO_SA = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS122_V2(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            // Obtener el primer ResultSet (totales)
            rs01 = cstmt01.getResultSet();
            if (rs01 != null && rs01.next()) {
                TOTAL_AMOUNT_WP_UK_CO = rs01.getDouble("TOTAL_AMOUNT_WP_UK_CO");
                TOTAL_AMOUNT_BANCARD_CO = rs01.getDouble("TOTAL_AMOUNT_BANCARD_CO");
                TOTAL_AMOUNT_AMEX_CO = rs01.getDouble("TOTAL_AMOUNT_AMEX_CO");
                TOTAL_AMOUNT_DISCOVER_CO = rs01.getDouble("TOTAL_AMOUNT_DISCOVER_CO");
                
                TOTAL_AMOUNT_WP_UK_SA = rs01.getDouble("TOTAL_AMOUNT_WP_UK_SA");
                TOTAL_AMOUNT_BANCARD_SA = rs01.getDouble("TOTAL_AMOUNT_BANCARD_SA");
                TOTAL_AMOUNT_AMEX_SA = rs01.getDouble("TOTAL_AMOUNT_AMEX_SA");
                TOTAL_AMOUNT_DISCOVER_SA = rs01.getDouble("TOTAL_AMOUNT_DISCOVER_SA");
                
                TOTAL_TOTAL_CO = rs01.getDouble("TOTAL_TOTAL_CO");
                TOTAL_TOTAL_SA = rs01.getDouble("TOTAL_TOTAL_SA");
                TOTAL_TOTAL_CO_AND_SA = rs01.getDouble("TOTAL_TOTAL_CO_AND_SA");
                
                TOTAL_AVG_WP_UK_CO = rs01.getDouble("TOTAL_AVG_WP_UK_CO");
                TOTAL_AVG_BANCARD_CO = rs01.getDouble("TOTAL_AVG_BANCARD_CO");
                TOTAL_AVG_AMEX_CO = rs01.getDouble("TOTAL_AVG_AMEX_CO");
                TOTAL_AVG_DISCOVER_CO = rs01.getDouble("TOTAL_AVG_DISCOVER_CO");
                
                TOTAL_AVG_WP_UK_SA = rs01.getDouble("TOTAL_AVG_WP_UK_SA");
                TOTAL_AVG_BANCARD_SA = rs01.getDouble("TOTAL_AVG_BANCARD_SA");
                TOTAL_AVG_AMEX_SA = rs01.getDouble("TOTAL_AVG_AMEX_SA");
                TOTAL_AVG_DISCOVER_SA = rs01.getDouble("TOTAL_AVG_DISCOVER_SA");
                
                TOTAL_AVG_TOTAL_CO = rs01.getDouble("TOTAL_AVG_TOTAL_CO");
                TOTAL_AVG_TOTAL_SA = rs01.getDouble("TOTAL_AVG_TOTAL_SA");
                TOTAL_AVG_TOTAL_CO_SA = rs01.getDouble("TOTAL_AVG_TOTAL_CO_SA");
                
                TOTAL_VAR_WP_UK_CO = rs01.getDouble("TOTAL_VAR_WP_UK_CO");
                TOTAL_VAR_BANCARD_CO = rs01.getDouble("TOTAL_VAR_BANCARD_CO");
                TOTAL_VAR_AMEX_CO = rs01.getDouble("TOTAL_VAR_AMEX_CO");
                TOTAL_VAR_DISCOVER_CO = rs01.getDouble("TOTAL_VAR_DISCOVER_CO");
                
                TOTAL_VAR_WP_UK_SA = rs01.getDouble("TOTAL_VAR_WP_UK_SA");
                TOTAL_VAR_BANCARD_SA = rs01.getDouble("TOTAL_VAR_BANCARD_SA");
                TOTAL_VAR_AMEX_SA = rs01.getDouble("TOTAL_VAR_AMEX_SA");
                TOTAL_VAR_DISCOVER_SA = rs01.getDouble("TOTAL_VAR_DISCOVER_SA");
                
                TOTAL_VAR_TOTAL_CO = rs01.getDouble("TOTAL_VAR_TOTAL_CO");
                TOTAL_VAR_TOTAL_SA = rs01.getDouble("TOTAL_VAR_TOTAL_SA");
                TOTAL_VAR_TOTAL_CO_SA = rs01.getDouble("TOTAL_VAR_TOTAL_CO_SA");
            }

            // Mover al segundo ResultSet (datos detallados)
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();

                // Procesar registros del segundo ResultSet
                while (rs02 != null && rs02.next()) {
                    objRtn = new SQP04091Filter();

                    objRtn.CURRENCY = "USD";
                    objRtn.DAY_NAME = rs02.getString("DAY_NAME");
                    objRtn.MONTH_NAME = rs02.getString("MONTH_NAME");
                    objRtn.HOLIDAY_WP_UK = rs02.getString("HOLIDAY_WP_UK");
                    objRtn.HOLIDAY_WP_BANCARD = rs02.getString("HOLIDAY_WP_BANCARD");
                    objRtn.HOLIDAY_AMEX = rs02.getString("HOLIDAY_AMEX");
                    objRtn.HOLIDAY_DISCOVER = rs02.getString("HOLIDAY_DISCOVER");
                    objRtn.DATE_FROM = rs02.getString("DATE_FROM");
                    objRtn.NUMBER_WEAK = rs02.getString("NUMBER_WEEK");
                    objRtn.DAY_NUMBER_EKED = rs02.getString("DAY_NUMBER_EKED");

                    objRtn.AMOUNT_WP_UK_CO = rs02.getDouble("AMOUNT_WP_UK_CO");
                    objRtn.AMOUNT_BANCARD_CO = rs02.getDouble("AMOUNT_BANCARD_CO");
                    objRtn.AMOUNT_AMEX_CO = rs02.getDouble("AMOUNT_AMEX_CO");
                    objRtn.AMOUNT_DISCOVER_CO = rs02.getDouble("AMOUNT_DISCOVER_CO");

                    objRtn.AMOUNT_WP_UK_SA = rs02.getDouble("AMOUNT_WP_UK_SA");
                    objRtn.AMOUNT_BANCARD_SA = rs02.getDouble("AMOUNT_BANCARD_SA");
                    objRtn.AMOUNT_AMEX_SA = rs02.getDouble("AMOUNT_AMEX_SA");
                    objRtn.AMOUNT_DISCOVER_SA = rs02.getDouble("AMOUNT_DISCOVER_SA");

                    objRtn.TOTAL_CO = rs02.getDouble("TOTAL_CO");
                    objRtn.TOTAL_SA = rs02.getDouble("TOTAL_SA");
                    objRtn.TOTAL_CO_AND_SA = rs02.getDouble("TOTAL_CO_AND_SA");

                    objRtn.AVG_WP_UK_CO = rs02.getDouble("AVG_WP_UK_CO");
                    objRtn.AVG_BANCARD_CO = rs02.getDouble("AVG_BANCARD_CO");
                    objRtn.AVG_AMEX_CO = rs02.getDouble("AVG_AMEX_CO");
                    objRtn.AVG_DISCOVER_CO = rs02.getDouble("AVG_DISCOVER_CO");

                    objRtn.AVG_WP_UK_SA = rs02.getDouble("AVG_WP_UK_SA");
                    objRtn.AVG_BANCARD_SA = rs02.getDouble("AVG_BANCARD_SA");
                    objRtn.AVG_AMEX_SA = rs02.getDouble("AVG_AMEX_SA");
                    objRtn.AVG_DISCOVER_SA = rs02.getDouble("AVG_DISCOVER_SA");

                    objRtn.AVG_TOTAL_CO = rs02.getDouble("AVG_TOTAL_CO");
                    objRtn.AVG_TOTAL_SA = rs02.getDouble("AVG_TOTAL_SA");
                    objRtn.AVG_TOTAL_CO_SA = rs02.getDouble("AVG_TOTAL_CO_SA");

                    objRtn.VAR_WP_UK_CO = rs02.getDouble("VAR_WP_UK_CO");
                    objRtn.VAR_BANCARD_CO = rs02.getDouble("VAR_BANCARD_CO");
                    objRtn.VAR_AMEX_CO = rs02.getDouble("VAR_AMEX_CO");
                    objRtn.VAR_DISCOVER_CO = rs02.getDouble("VAR_DISCOVER_CO");

                    objRtn.VAR_WP_UK_SA = rs02.getDouble("VAR_WP_UK_SA");
                    objRtn.VAR_BANCARD_SA = rs02.getDouble("VAR_BANCARD_SA");
                    objRtn.VAR_AMEX_SA = rs02.getDouble("VAR_AMEX_SA");
                    objRtn.VAR_DISCOVER_SA = rs02.getDouble("VAR_DISCOVER_SA");

                    objRtn.VAR_TOTAL_CO = rs02.getDouble("VAR_TOTAL_CO");
                    objRtn.VAR_TOTAL_SA = rs02.getDouble("VAR_TOTAL_SA");
                    objRtn.VAR_TOTAL_CO_SA = rs02.getDouble("VAR_TOTAL_CO_SA");

                    // Asignar los totales al objeto de retorno
                    objRtn.TOTAL_AMOUNT_WP_UK_CO = TOTAL_AMOUNT_WP_UK_CO;
                    objRtn.TOTAL_AMOUNT_BANCARD_CO = TOTAL_AMOUNT_BANCARD_CO;
                    objRtn.TOTAL_AMOUNT_AMEX_CO = TOTAL_AMOUNT_AMEX_CO;
                    objRtn.TOTAL_AMOUNT_DISCOVER_CO = TOTAL_AMOUNT_DISCOVER_CO;
                    objRtn.TOTAL_AMOUNT_WP_UK_SA = TOTAL_AMOUNT_WP_UK_SA;
                    objRtn.TOTAL_AMOUNT_BANCARD_SA = TOTAL_AMOUNT_BANCARD_SA;
                    objRtn.TOTAL_AMOUNT_AMEX_SA = TOTAL_AMOUNT_AMEX_SA;
                    objRtn.TOTAL_AMOUNT_DISCOVER_SA = TOTAL_AMOUNT_DISCOVER_SA;
                    objRtn.TOTAL_TOTAL_CO = TOTAL_TOTAL_CO;
                    objRtn.TOTAL_TOTAL_SA = TOTAL_TOTAL_SA;
                    objRtn.TOTAL_TOTAL_CO_AND_SA = TOTAL_TOTAL_CO_AND_SA;
                    objRtn.TOTAL_AVG_WP_UK_CO = TOTAL_AVG_WP_UK_CO;
                    objRtn.TOTAL_AVG_BANCARD_CO = TOTAL_AVG_BANCARD_CO;
                    objRtn.TOTAL_AVG_AMEX_CO = TOTAL_AVG_AMEX_CO;
                    objRtn.TOTAL_AVG_DISCOVER_CO = TOTAL_AVG_DISCOVER_CO;
                    objRtn.TOTAL_AVG_WP_UK_SA = TOTAL_AVG_WP_UK_SA;
                    objRtn.TOTAL_AVG_BANCARD_SA = TOTAL_AVG_BANCARD_SA;
                    objRtn.TOTAL_AVG_AMEX_SA = TOTAL_AVG_AMEX_SA;
                    objRtn.TOTAL_AVG_DISCOVER_SA = TOTAL_AVG_DISCOVER_SA;
                    objRtn.TOTAL_AVG_TOTAL_CO = TOTAL_AVG_TOTAL_CO;
                    objRtn.TOTAL_AVG_TOTAL_SA = TOTAL_AVG_TOTAL_SA;
                    objRtn.TOTAL_AVG_TOTAL_CO_SA = TOTAL_AVG_TOTAL_CO_SA;
                    objRtn.TOTAL_VAR_WP_UK_CO = TOTAL_VAR_WP_UK_CO;
                    objRtn.TOTAL_VAR_BANCARD_CO = TOTAL_VAR_BANCARD_CO;
                    objRtn.TOTAL_VAR_AMEX_CO = TOTAL_VAR_AMEX_CO;
                    objRtn.TOTAL_VAR_DISCOVER_CO = TOTAL_VAR_DISCOVER_CO;
                    objRtn.TOTAL_VAR_WP_UK_SA = TOTAL_VAR_WP_UK_SA;
                    objRtn.TOTAL_VAR_BANCARD_SA = TOTAL_VAR_BANCARD_SA;
                    objRtn.TOTAL_VAR_AMEX_SA = TOTAL_VAR_AMEX_SA;
                    objRtn.TOTAL_VAR_DISCOVER_SA = TOTAL_VAR_DISCOVER_SA;
                    objRtn.TOTAL_VAR_TOTAL_CO = TOTAL_VAR_TOTAL_CO;
                    objRtn.TOTAL_VAR_TOTAL_SA = TOTAL_VAR_TOTAL_SA;
                    objRtn.TOTAL_VAR_TOTAL_CO_SA = TOTAL_VAR_TOTAL_CO_SA;

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
            // Cerrar recursos en orden inverso
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<SQP04091Filter> searchUsaflowDiaryDetail(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        double 
//        COLOMBIA
        TOTAL_STATEMENT_WP_UK_CO = 0, TOTAL_SETTLEMENT_WP_UK_CO = 0, TOTAL_SALE_WP_UK_CO = 0, TOTAL_COMISION_WP_UK_CO = 0, TOTAL_OTHERS_WP_UK_CO = 0,
        TOTAL_STATEMENT_BANCARD_CO = 0, TOTAL_SETTLEMENT_BANCARD_CO = 0, TOTAL_SALE_BANCARD_CO = 0, TOTAL_COMISION_BANCARD_CO = 0, TOTAL_OTHERS_BANCARD_CO = 0,
        TOTAL_STATEMENT_AMEX_CO = 0, TOTAL_SETTLEMENT_AMEX_CO = 0, TOTAL_SALE_AMEX_CO = 0, TOTAL_COMISION_AMEX_CO = 0, TOTAL_OTHERS_AMEX_CO = 0,
        TOTAL_STATEMENT_DISCOVER_CO = 0, TOTAL_SETTLEMENT_DISCOVER_CO = 0, TOTAL_SALE_DISCOVER_CO = 0, TOTAL_COMISION_DISCOVER_CO = 0, TOTAL_OTHERS_DISCOVER_CO = 0,
//         SALVADOR
        TOTAL_STATEMENT_WP_UK_SA = 0, TOTAL_SETTLEMENT_WP_UK_SA = 0, TOTAL_SALE_WP_UK_SA = 0, TOTAL_COMISION_WP_UK_SA = 0, TOTAL_OTHERS_WP_UK_SA = 0,
        TOTAL_STATEMENT_BANCARD_SA = 0, TOTAL_SETTLEMENT_BANCARD_SA = 0, TOTAL_SALE_BANCARD_SA = 0, TOTAL_COMISION_BANCARD_SA = 0, TOTAL_OTHERS_BANCARD_SA = 0,
        TOTAL_STATEMENT_AMEX_SA = 0, TOTAL_SETTLEMENT_AMEX_SA = 0, TOTAL_SALE_AMEX_SA = 0, TOTAL_COMISION_AMEX_SA = 0, TOTAL_OTHERS_AMEX_SA = 0,
        TOTAL_STATEMENT_DISCOVER_SA = 0, TOTAL_SETTLEMENT_DISCOVER_SA = 0, TOTAL_SALE_DISCOVER_SA = 0, TOTAL_COMISION_DISCOVER_SA = 0, TOTAL_OTHERS_DISCOVER_SA = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS132(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            // Obtener el primer ResultSet (totales)
            rs01 = cstmt01.getResultSet();
            if (rs01 != null && rs01.next()) {
                TOTAL_STATEMENT_WP_UK_CO = rs01.getDouble("TOTAL_STATEMENT_WP_UK_CO");
                TOTAL_COMISION_WP_UK_CO = rs01.getDouble("TOTAL_COMISION_WP_UK_CO");
                TOTAL_OTHERS_WP_UK_CO = rs01.getDouble("TOTAL_OTHERS_WP_UK_CO");
                TOTAL_SETTLEMENT_WP_UK_CO = rs01.getDouble("TOTAL_SETTLEMENT_WP_UK_CO");
                TOTAL_SALE_WP_UK_CO = rs01.getDouble("TOTAL_SALE_WP_UK_CO");
                
                TOTAL_STATEMENT_BANCARD_CO = rs01.getDouble("TOTAL_STATEMENT_BANCARD_CO");
                TOTAL_SETTLEMENT_BANCARD_CO = rs01.getDouble("TOTAL_SETTLEMENT_BANCARD_CO");
                TOTAL_SALE_BANCARD_CO = rs01.getDouble("TOTAL_SALE_BANCARD_CO");
                TOTAL_COMISION_BANCARD_CO = rs01.getDouble("TOTAL_COMISION_BANCARD_CO");
                TOTAL_OTHERS_BANCARD_CO = rs01.getDouble("TOTAL_OTHERS_BANCARD_CO");
                
                TOTAL_STATEMENT_AMEX_CO = rs01.getDouble("TOTAL_STATEMENT_AMEX_CO");
                TOTAL_SETTLEMENT_AMEX_CO = rs01.getDouble("TOTAL_SETTLEMENT_AMEX_CO");
                TOTAL_SALE_AMEX_CO = rs01.getDouble("TOTAL_SALE_AMEX_CO");
                TOTAL_COMISION_AMEX_CO = rs01.getDouble("TOTAL_COMISION_AMEX_CO");
                TOTAL_OTHERS_AMEX_CO = rs01.getDouble("TOTAL_OTHERS_AMEX_CO");
                
                TOTAL_STATEMENT_DISCOVER_CO = rs01.getDouble("TOTAL_STATEMENT_DISCOVER_CO");
                TOTAL_SETTLEMENT_DISCOVER_CO = rs01.getDouble("TOTAL_SETTLEMENT_DISCOVER_CO");
                TOTAL_SALE_DISCOVER_CO = rs01.getDouble("TOTAL_SALE_DISCOVER_CO");
                TOTAL_COMISION_DISCOVER_CO = rs01.getDouble("TOTAL_COMISION_DISCOVER_CO");
                TOTAL_OTHERS_DISCOVER_CO = rs01.getDouble("TOTAL_OTHERS_DISCOVER_CO");
                
                TOTAL_STATEMENT_WP_UK_SA = rs01.getDouble("TOTAL_STATEMENT_WP_UK_SA");
                TOTAL_SETTLEMENT_WP_UK_SA = rs01.getDouble("TOTAL_SETTLEMENT_WP_UK_SA");
                TOTAL_SALE_WP_UK_SA = rs01.getDouble("TOTAL_SALE_WP_UK_SA");
                TOTAL_COMISION_WP_UK_SA = rs01.getDouble("TOTAL_COMISION_WP_UK_SA");
                TOTAL_OTHERS_WP_UK_SA = rs01.getDouble("TOTAL_OTHERS_WP_UK_SA");
                
                TOTAL_STATEMENT_BANCARD_SA = rs01.getDouble("TOTAL_STATEMENT_BANCARD_SA");
                TOTAL_SETTLEMENT_BANCARD_SA = rs01.getDouble("TOTAL_SETTLEMENT_BANCARD_SA");
                TOTAL_SALE_BANCARD_SA = rs01.getDouble("TOTAL_SALE_BANCARD_SA");
                TOTAL_COMISION_BANCARD_SA = rs01.getDouble("TOTAL_COMISION_BANCARD_SA");
                TOTAL_OTHERS_BANCARD_SA = rs01.getDouble("TOTAL_OTHERS_BANCARD_SA");
                
                TOTAL_STATEMENT_AMEX_SA = rs01.getDouble("TOTAL_STATEMENT_AMEX_SA");
                TOTAL_SETTLEMENT_AMEX_SA = rs01.getDouble("TOTAL_SETTLEMENT_AMEX_SA");
                TOTAL_SALE_AMEX_SA = rs01.getDouble("TOTAL_SALE_AMEX_SA");
                TOTAL_COMISION_AMEX_SA = rs01.getDouble("TOTAL_COMISION_AMEX_SA");
                TOTAL_OTHERS_AMEX_SA = rs01.getDouble("TOTAL_OTHERS_AMEX_SA");
                
                TOTAL_STATEMENT_DISCOVER_SA = rs01.getDouble("TOTAL_STATEMENT_DISCOVER_SA");
                TOTAL_SETTLEMENT_DISCOVER_SA = rs01.getDouble("TOTAL_SETTLEMENT_DISCOVER_SA");
                TOTAL_SALE_DISCOVER_SA = rs01.getDouble("TOTAL_SALE_DISCOVER_SA");
                TOTAL_COMISION_DISCOVER_SA = rs01.getDouble("TOTAL_COMISION_DISCOVER_SA");
                TOTAL_OTHERS_DISCOVER_SA = rs01.getDouble("TOTAL_OTHERS_DISCOVER_SA");
                
            }

            // Mover al segundo ResultSet (datos detallados)
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();

                // Procesar registros del segundo ResultSet
                while (rs02 != null && rs02.next()) {
                    objRtn = new SQP04091Filter();

                    objRtn.DATE_FROM = rs02.getString("VALDATE");
                    objRtn.CURRENCY = "USD";
                    
                    objRtn.STATEMENT_WP_UK_CO = rs02.getDouble("STATEMENT_WP_UK_CO");
                    objRtn.COMISION_WP_UK_CO_SUM = rs02.getDouble("COMISION_WP_UK_CO_SUM");
                    objRtn.OTHERS_WP_UK_CO = rs02.getDouble("OTHERS_WP_UK_CO");
                    objRtn.SETTLEMENT_WP_UK_CO = rs02.getDouble("SETTLEMENT_WP_UK_CO");
                    objRtn.SALE_WP_UK_CO = rs02.getDouble("SALE_WP_UK_CO");
                    objRtn.VAR_WP_CO = rs02.getDouble("VAR_WP_CO");
                    
                    
                    objRtn.STATEMENT_BANCARD_CO = rs02.getDouble("STATEMENT_BANCARD_CO");
                    objRtn.COMISION_BANCARD_CO_SUM = rs02.getDouble("COMISION_BANCARD_CO_SUM");
                    objRtn.OTHERS_BANCARD_CO = rs02.getDouble("OTHERS_BANCARD_CO");
                    objRtn.SETTLEMENT_BANCARD_CO = rs02.getDouble("SETTLEMENT_BANCARD_CO");
                    objRtn.SALE_BANCARD_CO = rs02.getDouble("SALE_BANCARD_CO");
                    objRtn.VAR_BANCARD_CO = rs02.getDouble("VAR_BANCARD_CO");
                    
                    
                    objRtn.STATEMENT_AMEX_CO = rs02.getDouble("STATEMENT_AMEX_CO");
                    objRtn.COMISION_AMEX_CO_SUM = rs02.getDouble("COMISION_AMEX_CO_SUM");
                    objRtn.OTHERS_AMEX_CO = rs02.getDouble("OTHERS_AMEX_CO");
                    objRtn.SETTLEMENT_AMEX_CO = rs02.getDouble("SETTLEMENT_AMEX_CO");
                    objRtn.SALE_AMEX_CO = rs02.getDouble("SALE_AMEX_CO");
                    objRtn.VAR_AMEX_CO = rs02.getDouble("VAR_AMEX_CO");
                    
                    
                    objRtn.STATEMENT_DISCOVER_CO = rs02.getDouble("STATEMENT_DISCOVER_CO");
                    objRtn.COMISION_DISCOVER_CO_SUM = rs02.getDouble("COMISION_DISCOVER_CO_SUM");
                    objRtn.OTHERS_DISCOVER_CO = rs02.getDouble("OTHERS_DISCOVER_CO");
                    objRtn.SETTLEMENT_DISCOVER_CO = rs02.getDouble("SETTLEMENT_DISCOVER_CO");
                    objRtn.SALE_DISCOVER_CO = rs02.getDouble("SALE_DISCOVER_CO");
                    objRtn.VAR_DISCOVER_CO = rs02.getDouble("VAR_DISCOVER_CO");
                    
                    
                    objRtn.STATEMENT_WP_UK_SA = rs02.getDouble("STATEMENT_WP_UK_SA");
                    objRtn.COMISION_WP_UK_SA_SUM = rs02.getDouble("COMISION_WP_UK_SA_SUM");
                    objRtn.OTHERS_WP_UK_SA = rs02.getDouble("OTHERS_WP_UK_SA");
                    objRtn.SETTLEMENT_WP_UK_SA = rs02.getDouble("SETTLEMENT_WP_UK_SA");
                    objRtn.SALE_WP_UK_SA = rs02.getDouble("SALE_WP_UK_SA");
                    objRtn.VAR_WP_SA = rs02.getDouble("VAR_WP_SA");
                    
                    
                    objRtn.STATEMENT_BANCARD_SA = rs02.getDouble("STATEMENT_BANCARD_SA");
                    objRtn.COMISION_BANCARD_SA_SUM = rs02.getDouble("COMISION_BANCARD_SA_SUM");
                    objRtn.OTHERS_BANCARD_SA = rs02.getDouble("OTHERS_BANCARD_SA");
                    objRtn.SETTLEMENT_BANCARD_SA = rs02.getDouble("SETTLEMENT_BANCARD_SA");
                    objRtn.SALE_BANCARD_SA = rs02.getDouble("SALE_BANCARD_SA");
                    objRtn.VAR_BANCARD_SA = rs02.getDouble("VAR_BANCARD_SA");
                    
                    
                    objRtn.STATEMENT_AMEX_SA = rs02.getDouble("STATEMENT_AMEX_SA");
                    objRtn.COMISION_AMEX_SA_SUM = rs02.getDouble("COMISION_AMEX_SA_SUM");
                    objRtn.OTHERS_AMEX_SA = rs02.getDouble("OTHERS_AMEX_SA");
                    objRtn.SETTLEMENT_AMEX_SA = rs02.getDouble("SETTLEMENT_AMEX_SA");
                    objRtn.SALE_AMEX_SA = rs02.getDouble("SALE_AMEX_SA");
                    objRtn.VAR_AMEX_SA = rs02.getDouble("VAR_AMEX_SA");
                    
                    
                    objRtn.STATEMENT_DISCOVER_SA = rs02.getDouble("STATEMENT_DISCOVER_SA");
                    objRtn.COMISION_DISCOVER_SA_SUM = rs02.getDouble("COMISION_DISCOVER_SA_SUM");
                    objRtn.OTHERS_DISCOVER_SA = rs02.getDouble("OTHERS_DISCOVER_SA");
                    objRtn.SETTLEMENT_DISCOVER_SA = rs02.getDouble("SETTLEMENT_DISCOVER_SA");
                    objRtn.SALE_DISCOVER_SA = rs02.getDouble("SALE_DISCOVER_SA");
                    objRtn.VAR_DISCOVER_SA = rs02.getDouble("VAR_DISCOVER_SA");
                    
                    
                    // Asignar los totales al objeto de retorno
                    objRtn.TOTAL_STATEMENT_WP_UK_CO = TOTAL_STATEMENT_WP_UK_CO;
                    objRtn.TOTAL_COMISION_WP_UK_CO = TOTAL_COMISION_WP_UK_CO;
                    objRtn.TOTAL_OTHERS_WP_UK_CO = TOTAL_OTHERS_WP_UK_CO;
                    objRtn.TOTAL_SETTLEMENT_WP_UK_CO = TOTAL_SETTLEMENT_WP_UK_CO;
                    objRtn.TOTAL_SALE_WP_UK_CO = TOTAL_SALE_WP_UK_CO;
                    
                    
                    objRtn.TOTAL_STATEMENT_BANCARD_CO = TOTAL_STATEMENT_BANCARD_CO;
                    objRtn.TOTAL_COMISION_BANCARD_CO = TOTAL_COMISION_BANCARD_CO;
                    objRtn.TOTAL_OTHERS_BANCARD_CO = TOTAL_OTHERS_BANCARD_CO;
                    objRtn.TOTAL_SETTLEMENT_BANCARD_CO = TOTAL_SETTLEMENT_BANCARD_CO;
                    objRtn.TOTAL_SALE_BANCARD_CO = TOTAL_SALE_BANCARD_CO;
                    
                    
                    objRtn.TOTAL_STATEMENT_AMEX_CO = TOTAL_STATEMENT_AMEX_CO;
                    objRtn.TOTAL_COMISION_AMEX_CO = TOTAL_COMISION_AMEX_CO;
                    objRtn.TOTAL_OTHERS_AMEX_CO = TOTAL_OTHERS_AMEX_CO;
                    objRtn.TOTAL_SETTLEMENT_AMEX_CO = TOTAL_SETTLEMENT_AMEX_CO;
                    objRtn.TOTAL_SALE_AMEX_CO = TOTAL_SALE_AMEX_CO;
                    
                    
                    objRtn.TOTAL_STATEMENT_DISCOVER_CO = TOTAL_STATEMENT_DISCOVER_CO;
                    objRtn.TOTAL_COMISION_DISCOVER_CO = TOTAL_COMISION_DISCOVER_CO;
                    objRtn.TOTAL_OTHERS_DISCOVER_CO = TOTAL_OTHERS_DISCOVER_CO;
                    objRtn.TOTAL_SETTLEMENT_DISCOVER_CO = TOTAL_SETTLEMENT_DISCOVER_CO;
                    objRtn.TOTAL_SALE_DISCOVER_CO = TOTAL_SALE_DISCOVER_CO;
                    
                    
                    objRtn.TOTAL_STATEMENT_WP_UK_SA = TOTAL_STATEMENT_WP_UK_SA;
                    objRtn.TOTAL_COMISION_WP_UK_SA = TOTAL_COMISION_WP_UK_SA;
                    objRtn.TOTAL_OTHERS_WP_UK_SA = TOTAL_OTHERS_WP_UK_SA;
                    objRtn.TOTAL_SETTLEMENT_WP_UK_SA = TOTAL_SETTLEMENT_WP_UK_SA;
                    objRtn.TOTAL_SALE_WP_UK_SA = TOTAL_SALE_WP_UK_SA;
                    
                    
                    objRtn.TOTAL_STATEMENT_BANCARD_SA = TOTAL_STATEMENT_BANCARD_SA;
                    objRtn.TOTAL_COMISION_BANCARD_SA = TOTAL_COMISION_BANCARD_SA;
                    objRtn.TOTAL_OTHERS_BANCARD_SA = TOTAL_OTHERS_BANCARD_SA;
                    objRtn.TOTAL_SETTLEMENT_BANCARD_SA = TOTAL_SETTLEMENT_BANCARD_SA;
                    objRtn.TOTAL_SALE_BANCARD_SA = TOTAL_SALE_BANCARD_SA;
                    
                    
                    objRtn.TOTAL_STATEMENT_AMEX_SA = TOTAL_STATEMENT_AMEX_SA;
                    objRtn.TOTAL_COMISION_AMEX_SA = TOTAL_COMISION_AMEX_SA;
                    objRtn.TOTAL_OTHERS_AMEX_SA = TOTAL_OTHERS_AMEX_SA;
                    objRtn.TOTAL_SETTLEMENT_AMEX_SA = TOTAL_SETTLEMENT_AMEX_SA;
                    objRtn.TOTAL_SALE_AMEX_SA = TOTAL_SALE_AMEX_SA;
                    
                    
                    objRtn.TOTAL_STATEMENT_DISCOVER_SA = TOTAL_STATEMENT_DISCOVER_SA;
                    objRtn.TOTAL_COMISION_DISCOVER_SA = TOTAL_COMISION_DISCOVER_SA;
                    objRtn.TOTAL_OTHERS_DISCOVER_SA = TOTAL_OTHERS_DISCOVER_SA;
                    objRtn.TOTAL_SETTLEMENT_DISCOVER_SA = TOTAL_SETTLEMENT_DISCOVER_SA;
                    objRtn.TOTAL_SALE_DISCOVER_SA = TOTAL_SALE_DISCOVER_SA;
                    
                    

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
            // Cerrar recursos en orden inverso
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<SQP04091Filter> searchTacaflowDiaryDetail(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        double TOTAL_STATEMENT_TACA = 0, TOTAL_COMISION_TACA = 0, TOTAL_OTHERS_TACA = 0,
        TOTAL_SETTLEMENT_TACA = 0, TOTAL_SALE_TACA = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS266(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            // Obtener el primer ResultSet (totales)
            rs01 = cstmt01.getResultSet();
            if (rs01 != null && rs01.next()) {
                TOTAL_STATEMENT_TACA = rs01.getDouble("TOTAL_STATEMENT_TACA");
                TOTAL_COMISION_TACA = rs01.getDouble("TOTAL_COMISION_TACA");
                TOTAL_OTHERS_TACA = rs01.getDouble("TOTAL_OTHERS_TACA");
                TOTAL_SETTLEMENT_TACA = rs01.getDouble("TOTAL_SETTLEMENT_TACA");
                TOTAL_SALE_TACA = rs01.getDouble("TOTAL_SALE_TACA");
            }

            // Mover al segundo ResultSet (datos detallados)
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();

                // Procesar registros del segundo ResultSet
                while (rs02 != null && rs02.next()) {
                    objRtn = new SQP04091Filter();

                    objRtn.DATE_FROM = rs02.getString("VALDATE");
                    objRtn.CURRENCY = "USD";
                    
                    objRtn.STATEMENT_TACA = rs02.getDouble("STATEMENT_TACA");
                    objRtn.COMISION_TACA = rs02.getDouble("COMISION_TACA");
                    objRtn.OTHERS_TACA = rs02.getDouble("OTHERS_TACA");
                    objRtn.SETTLEMENT_TACA = rs02.getDouble("SETTLEMENT_TACA");
                    objRtn.SALE_TACA = rs02.getDouble("SALE_TACA");
                    objRtn.VAR_TACA = rs02.getDouble("VAR_TACA");
                    
                    objRtn.TOTAL_STATEMENT_TACA = TOTAL_STATEMENT_TACA;
                    objRtn.TOTAL_COMISION_TACA = TOTAL_COMISION_TACA;
                    objRtn.TOTAL_OTHERS_TACA = TOTAL_OTHERS_TACA;
                    objRtn.TOTAL_SETTLEMENT_TACA = TOTAL_SETTLEMENT_TACA;
                    objRtn.TOTAL_SALE_TACA = TOTAL_SALE_TACA;
                    
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
            // Cerrar recursos en orden inverso
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<A2356Filter> getListTotalConciliation_Bard(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter objRtn;

        double 
//        COLOMBIA
        TOTAL_STATEMENT_WP_UK_CO = 0, TOTAL_SETTLEMENT_WP_UK_CO = 0, TOTAL_SALE_WP_UK_CO = 0,
        TOTAL_STATEMENT_BANCARD_CO = 0, TOTAL_SETTLEMENT_BANCARD_CO = 0, TOTAL_SALE_BANCARD_CO = 0,
        TOTAL_STATEMENT_AMEX_CO = 0, TOTAL_SETTLEMENT_AMEX_CO = 0, TOTAL_SALE_AMEX_CO = 0,
        TOTAL_STATEMENT_DISCOVER_CO = 0, TOTAL_SETTLEMENT_DISCOVER_CO = 0, TOTAL_SALE_DISCOVER_CO = 0,
//            SALVADOR
        TOTAL_STATEMENT_WP_UK_SA = 0, TOTAL_SETTLEMENT_WP_UK_SA = 0, TOTAL_SALE_WP_UK_SA = 0,
        TOTAL_STATEMENT_BANCARD_SA = 0, TOTAL_SETTLEMENT_BANCARD_SA = 0, TOTAL_SALE_BANCARD_SA = 0,
        TOTAL_STATEMENT_AMEX_SA = 0, TOTAL_SETTLEMENT_AMEX_SA = 0, TOTAL_SALE_AMEX_SA = 0, 
        TOTAL_STATEMENT_DISCOVER_SA = 0, TOTAL_SETTLEMENT_DISCOVER_SA = 0, TOTAL_SALE_DISCOVER_SA = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS267(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);

            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst != null && rst.next()) {
                TOTAL_STATEMENT_WP_UK_CO = rst.getDouble("TOTAL_STATEMENT_WP_UK_CO");
                TOTAL_SETTLEMENT_WP_UK_CO = rst.getDouble("TOTAL_SETTLEMENT_WP_UK_CO");
                TOTAL_SALE_WP_UK_CO = rst.getDouble("TOTAL_SALE_WP_UK_CO");
                
                TOTAL_STATEMENT_BANCARD_CO = rst.getDouble("TOTAL_STATEMENT_BANCARD_CO");
                TOTAL_SETTLEMENT_BANCARD_CO = rst.getDouble("TOTAL_SETTLEMENT_BANCARD_CO");
                TOTAL_SALE_BANCARD_CO = rst.getDouble("TOTAL_SALE_BANCARD_CO");
                
                TOTAL_STATEMENT_AMEX_CO = rst.getDouble("TOTAL_STATEMENT_AMEX_CO");
                TOTAL_SETTLEMENT_AMEX_CO = rst.getDouble("TOTAL_SETTLEMENT_AMEX_CO");
                TOTAL_SALE_AMEX_CO = rst.getDouble("TOTAL_SALE_AMEX_CO");
                
                TOTAL_STATEMENT_DISCOVER_CO = rst.getDouble("TOTAL_STATEMENT_DISCOVER_CO");
                TOTAL_SETTLEMENT_DISCOVER_CO = rst.getDouble("TOTAL_SETTLEMENT_DISCOVER_CO");
                TOTAL_SALE_DISCOVER_CO = rst.getDouble("TOTAL_SALE_DISCOVER_CO");
                
                TOTAL_STATEMENT_WP_UK_SA = rst.getDouble("TOTAL_STATEMENT_WP_UK_SA");
                TOTAL_SETTLEMENT_WP_UK_SA = rst.getDouble("TOTAL_SETTLEMENT_WP_UK_SA");
                TOTAL_SALE_WP_UK_SA = rst.getDouble("TOTAL_SALE_WP_UK_SA");
                
                TOTAL_STATEMENT_BANCARD_SA = rst.getDouble("TOTAL_STATEMENT_BANCARD_SA");
                TOTAL_SETTLEMENT_BANCARD_SA = rst.getDouble("TOTAL_SETTLEMENT_BANCARD_SA");
                TOTAL_SALE_BANCARD_SA = rst.getDouble("TOTAL_SALE_BANCARD_SA");
                
                TOTAL_STATEMENT_AMEX_SA = rst.getDouble("TOTAL_STATEMENT_AMEX_SA");
                TOTAL_SETTLEMENT_AMEX_SA = rst.getDouble("TOTAL_SETTLEMENT_AMEX_SA");
                TOTAL_SALE_AMEX_SA = rst.getDouble("TOTAL_SALE_AMEX_SA");
                
                TOTAL_STATEMENT_DISCOVER_SA = rst.getDouble("TOTAL_STATEMENT_DISCOVER_SA");
                TOTAL_SETTLEMENT_DISCOVER_SA = rst.getDouble("TOTAL_SETTLEMENT_DISCOVER_SA");
                TOTAL_SALE_DISCOVER_SA = rst.getDouble("TOTAL_SALE_DISCOVER_SA");
                
            }
            
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                   objRtn = new A2356Filter();

                    objRtn.DATE_FROM = rst.getString("VALDATE");
                    objRtn.CURRENCY = "USD";
                    
                    objRtn.STATEMENT_WP_UK_CO = rst.getDouble("STATEMENT_WP_UK_CO");
                    objRtn.SETTLEMENT_WP_UK_CO = rst.getDouble("SETTLEMENT_WP_UK_CO");
                    objRtn.SALE_WP_UK_CO = rst.getDouble("SALE_WP_UK_CO");
                    objRtn.VAR_WP_CO = rst.getDouble("VAR_WP_CO");
                    
                    objRtn.STATEMENT_BANCARD_CO = rst.getDouble("STATEMENT_BANCARD_CO");
                    objRtn.SETTLEMENT_BANCARD_CO = rst.getDouble("SETTLEMENT_BANCARD_CO");
                    objRtn.SALE_BANCARD_CO = rst.getDouble("SALE_BANCARD_CO");
                    objRtn.VAR_BANCARD_CO = rst.getDouble("VAR_BANCARD_CO");
                    
                    objRtn.STATEMENT_AMEX_CO = rst.getDouble("STATEMENT_AMEX_CO");
                    objRtn.SETTLEMENT_AMEX_CO = rst.getDouble("SETTLEMENT_AMEX_CO");
                    objRtn.SALE_AMEX_CO = rst.getDouble("SALE_AMEX_CO");
                    objRtn.VAR_AMEX_CO = rst.getDouble("VAR_AMEX_CO");
                    
                    objRtn.STATEMENT_DISCOVER_CO = rst.getDouble("STATEMENT_DISCOVER_CO");
                    objRtn.SETTLEMENT_DISCOVER_CO = rst.getDouble("SETTLEMENT_DISCOVER_CO");
                    objRtn.SALE_DISCOVER_CO = rst.getDouble("SALE_DISCOVER_CO");
                    objRtn.VAR_DISCOVER_CO = rst.getDouble("VAR_DISCOVER_CO");
                    
                    objRtn.STATEMENT_WP_UK_SA = rst.getDouble("STATEMENT_WP_UK_SA");
                    objRtn.SETTLEMENT_WP_UK_SA = rst.getDouble("SETTLEMENT_WP_UK_SA");
                    objRtn.SALE_WP_UK_SA = rst.getDouble("SALE_WP_UK_SA");
                    objRtn.VAR_WP_SA = rst.getDouble("VAR_WP_SA");
                    
                    objRtn.STATEMENT_BANCARD_SA = rst.getDouble("STATEMENT_BANCARD_SA");
                    objRtn.SETTLEMENT_BANCARD_SA = rst.getDouble("SETTLEMENT_BANCARD_SA");
                    objRtn.SALE_BANCARD_SA = rst.getDouble("SALE_BANCARD_SA");
                    objRtn.VAR_BANCARD_SA = rst.getDouble("VAR_BANCARD_SA");
                    
                    objRtn.STATEMENT_AMEX_SA = rst.getDouble("STATEMENT_AMEX_SA");
                    objRtn.SETTLEMENT_AMEX_SA = rst.getDouble("SETTLEMENT_AMEX_SA");
                    objRtn.SALE_AMEX_SA = rst.getDouble("SALE_AMEX_SA");
                    objRtn.VAR_AMEX_SA = rst.getDouble("VAR_AMEX_SA");
                    
                    objRtn.STATEMENT_DISCOVER_SA = rst.getDouble("STATEMENT_DISCOVER_SA");
                    objRtn.SETTLEMENT_DISCOVER_SA = rst.getDouble("SETTLEMENT_DISCOVER_SA");
                    objRtn.SALE_DISCOVER_SA = rst.getDouble("SALE_DISCOVER_SA");
                    objRtn.VAR_DISCOVER_SA = rst.getDouble("VAR_DISCOVER_SA");
                    

                    // Asignar los totales al objeto de retorno
                    objRtn.TOTAL_STATEMENT_WP_UK_CO = TOTAL_STATEMENT_WP_UK_CO;
                    objRtn.TOTAL_SETTLEMENT_WP_UK_CO = TOTAL_SETTLEMENT_WP_UK_CO;
                    objRtn.TOTAL_SALE_WP_UK_CO = TOTAL_SALE_WP_UK_CO;
                    
                    objRtn.TOTAL_STATEMENT_BANCARD_CO = TOTAL_STATEMENT_BANCARD_CO;
                    objRtn.TOTAL_SETTLEMENT_BANCARD_CO = TOTAL_SETTLEMENT_BANCARD_CO;
                    objRtn.TOTAL_SALE_BANCARD_CO = TOTAL_SALE_BANCARD_CO;
                    
                    objRtn.TOTAL_STATEMENT_AMEX_CO = TOTAL_STATEMENT_AMEX_CO;
                    objRtn.TOTAL_SETTLEMENT_AMEX_CO = TOTAL_SETTLEMENT_AMEX_CO;
                    objRtn.TOTAL_SALE_AMEX_CO = TOTAL_SALE_AMEX_CO;
                    
                    objRtn.TOTAL_STATEMENT_DISCOVER_CO = TOTAL_STATEMENT_DISCOVER_CO;
                    objRtn.TOTAL_SETTLEMENT_DISCOVER_CO = TOTAL_SETTLEMENT_DISCOVER_CO;
                    objRtn.TOTAL_SALE_DISCOVER_CO = TOTAL_SALE_DISCOVER_CO;
                    
                    objRtn.TOTAL_STATEMENT_WP_UK_SA = TOTAL_STATEMENT_WP_UK_SA;
                    objRtn.TOTAL_SETTLEMENT_WP_UK_SA = TOTAL_SETTLEMENT_WP_UK_SA;
                    objRtn.TOTAL_SALE_WP_UK_SA = TOTAL_SALE_WP_UK_SA;
                    
                    objRtn.TOTAL_STATEMENT_BANCARD_SA = TOTAL_STATEMENT_BANCARD_SA;
                    objRtn.TOTAL_SETTLEMENT_BANCARD_SA = TOTAL_SETTLEMENT_BANCARD_SA;
                    objRtn.TOTAL_SALE_BANCARD_SA = TOTAL_SALE_BANCARD_SA;
                    
                    objRtn.TOTAL_STATEMENT_AMEX_SA = TOTAL_STATEMENT_AMEX_SA;
                    objRtn.TOTAL_SETTLEMENT_AMEX_SA = TOTAL_SETTLEMENT_AMEX_SA;
                    objRtn.TOTAL_SALE_AMEX_SA = TOTAL_SALE_AMEX_SA;
                    
                    objRtn.TOTAL_STATEMENT_DISCOVER_SA = TOTAL_STATEMENT_DISCOVER_SA;
                    objRtn.TOTAL_SETTLEMENT_DISCOVER_SA = TOTAL_SETTLEMENT_DISCOVER_SA;
                    objRtn.TOTAL_SALE_DISCOVER_SA = TOTAL_SALE_DISCOVER_SA;
                    

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstData.add(objRtn);

                }
                rst.close();
            }

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
    
    public List<A2356Filter> getListTotalConciliation_BardTaca(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter objRtn;

        double TOTAL_STATEMENT_TACA = 0, TOTAL_COMISION_TACA = 0, TOTAL_OTHERS_TACA = 0,
        TOTAL_SETTLEMENT_TACA = 0, TOTAL_SALE_TACA = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS268(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);

            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst != null && rst.next()) {
                TOTAL_STATEMENT_TACA = rst.getDouble("TOTAL_STATEMENT_TACA");
                TOTAL_COMISION_TACA = rst.getDouble("TOTAL_COMISION_TACA");
                TOTAL_OTHERS_TACA = rst.getDouble("TOTAL_OTHERS_TACA");
                TOTAL_SETTLEMENT_TACA = rst.getDouble("TOTAL_SETTLEMENT_TACA");
                TOTAL_SALE_TACA = rst.getDouble("TOTAL_SALE_TACA");
                
            }
            
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                   objRtn = new A2356Filter();

                    objRtn.DATE_FROM = rst.getString("VALDATE");
                    objRtn.CURRENCY = "USD";
                    
                    objRtn.STATEMENT_TACA = rst.getDouble("STATEMENT_TACA");
                    objRtn.COMISION_TACA = rst.getDouble("COMISION_TACA");
                    objRtn.OTHERS_TACA = rst.getDouble("OTHERS_TACA");
                    objRtn.SETTLEMENT_TACA = rst.getDouble("SETTLEMENT_TACA");
                    objRtn.SALE_TACA = rst.getDouble("SALE_TACA");
                    objRtn.VAR_TACA = rst.getDouble("VAR_TACA");
                    
                    objRtn.TOTAL_STATEMENT_TACA = TOTAL_STATEMENT_TACA;
                    objRtn.TOTAL_COMISION_TACA = TOTAL_COMISION_TACA;
                    objRtn.TOTAL_OTHERS_TACA = TOTAL_OTHERS_TACA;
                    objRtn.TOTAL_SETTLEMENT_TACA = TOTAL_SETTLEMENT_TACA;
                    objRtn.TOTAL_SALE_TACA = TOTAL_SALE_TACA;
                    
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstData.add(objRtn);

                }
                rst.close();
            }

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
    
    public List<SQP04091Filter> searchUsaflowDiaryHistoric(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        double TOTAL_AMOUNT_WP_UK_CO = 0, TOTAL_AMOUNT_BANCARD_CO = 0, TOTAL_AMOUNT_AMEX_CO = 0,
        TOTAL_AMOUNT_DISCOVER_CO = 0, TOTAL_AMOUNT_WP_UK_SA = 0, TOTAL_AMOUNT_BANCARD_SA = 0,
        TOTAL_AMOUNT_AMEX_SA = 0, TOTAL_AMOUNT_DISCOVER_SA = 0, TOTAL_TOTAL_CO = 0,
        TOTAL_TOTAL_SA = 0, TOTAL_TOTAL_CO_AND_SA = 0, TOTAL_AVG_WP_UK_CO = 0, TOTAL_AVG_BANCARD_CO = 0,
        TOTAL_AVG_AMEX_CO = 0, TOTAL_AVG_DISCOVER_CO = 0, TOTAL_AVG_WP_UK_SA = 0, TOTAL_AVG_BANCARD_SA = 0,
        TOTAL_AVG_AMEX_SA = 0, TOTAL_AVG_DISCOVER_SA = 0, TOTAL_AVG_TOTAL_CO = 0, TOTAL_AVG_TOTAL_SA = 0,
        TOTAL_AVG_TOTAL_CO_SA = 0, TOTAL_VAR_WP_UK_CO = 0, TOTAL_VAR_BANCARD_CO = 0, TOTAL_VAR_AMEX_CO = 0,
        TOTAL_VAR_DISCOVER_CO = 0, TOTAL_VAR_WP_UK_SA = 0, TOTAL_VAR_BANCARD_SA = 0, TOTAL_VAR_AMEX_SA = 0,
        TOTAL_VAR_DISCOVER_SA = 0, TOTAL_VAR_TOTAL_CO = 0, TOTAL_VAR_TOTAL_SA = 0, TOTAL_VAR_TOTAL_CO_SA = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS130(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            // Obtener el primer ResultSet (totales)
            rs01 = cstmt01.getResultSet();
            if (rs01 != null && rs01.next()) {
                TOTAL_AMOUNT_WP_UK_CO = rs01.getDouble("TOTAL_AMOUNT_WP_UK_CO");
                TOTAL_AMOUNT_BANCARD_CO = rs01.getDouble("TOTAL_AMOUNT_BANCARD_CO");
                TOTAL_AMOUNT_AMEX_CO = rs01.getDouble("TOTAL_AMOUNT_AMEX_CO");
                TOTAL_AMOUNT_DISCOVER_CO = rs01.getDouble("TOTAL_AMOUNT_DISCOVER_CO");
                
                TOTAL_AMOUNT_WP_UK_SA = rs01.getDouble("TOTAL_AMOUNT_WP_UK_SA");
                TOTAL_AMOUNT_BANCARD_SA = rs01.getDouble("TOTAL_AMOUNT_BANCARD_SA");
                TOTAL_AMOUNT_AMEX_SA = rs01.getDouble("TOTAL_AMOUNT_AMEX_SA");
                TOTAL_AMOUNT_DISCOVER_SA = rs01.getDouble("TOTAL_AMOUNT_DISCOVER_SA");
                
                TOTAL_TOTAL_CO = rs01.getDouble("TOTAL_TOTAL_CO");
                TOTAL_TOTAL_SA = rs01.getDouble("TOTAL_TOTAL_SA");
                TOTAL_TOTAL_CO_AND_SA = rs01.getDouble("TOTAL_TOTAL_CO_AND_SA");
                
                TOTAL_AVG_WP_UK_CO = rs01.getDouble("TOTAL_AVG_WP_UK_CO");
                TOTAL_AVG_BANCARD_CO = rs01.getDouble("TOTAL_AVG_BANCARD_CO");
                TOTAL_AVG_AMEX_CO = rs01.getDouble("TOTAL_AVG_AMEX_CO");
                TOTAL_AVG_DISCOVER_CO = rs01.getDouble("TOTAL_AVG_DISCOVER_CO");
                
                TOTAL_AVG_WP_UK_SA = rs01.getDouble("TOTAL_AVG_WP_UK_SA");
                TOTAL_AVG_BANCARD_SA = rs01.getDouble("TOTAL_AVG_BANCARD_SA");
                TOTAL_AVG_AMEX_SA = rs01.getDouble("TOTAL_AVG_AMEX_SA");
                TOTAL_AVG_DISCOVER_SA = rs01.getDouble("TOTAL_AVG_DISCOVER_SA");
                
                TOTAL_AVG_TOTAL_CO = rs01.getDouble("TOTAL_AVG_TOTAL_CO");
                TOTAL_AVG_TOTAL_SA = rs01.getDouble("TOTAL_AVG_TOTAL_SA");
                TOTAL_AVG_TOTAL_CO_SA = rs01.getDouble("TOTAL_AVG_TOTAL_CO_SA");
                
                TOTAL_VAR_WP_UK_CO = rs01.getDouble("TOTAL_VAR_WP_UK_CO");
                TOTAL_VAR_BANCARD_CO = rs01.getDouble("TOTAL_VAR_BANCARD_CO");
                TOTAL_VAR_AMEX_CO = rs01.getDouble("TOTAL_VAR_AMEX_CO");
                TOTAL_VAR_DISCOVER_CO = rs01.getDouble("TOTAL_VAR_DISCOVER_CO");
                
                TOTAL_VAR_WP_UK_SA = rs01.getDouble("TOTAL_VAR_WP_UK_SA");
                TOTAL_VAR_BANCARD_SA = rs01.getDouble("TOTAL_VAR_BANCARD_SA");
                TOTAL_VAR_AMEX_SA = rs01.getDouble("TOTAL_VAR_AMEX_SA");
                TOTAL_VAR_DISCOVER_SA = rs01.getDouble("TOTAL_VAR_DISCOVER_SA");
                
                TOTAL_VAR_TOTAL_CO = rs01.getDouble("TOTAL_VAR_TOTAL_CO");
                TOTAL_VAR_TOTAL_SA = rs01.getDouble("TOTAL_VAR_TOTAL_SA");
                TOTAL_VAR_TOTAL_CO_SA = rs01.getDouble("TOTAL_VAR_TOTAL_CO_SA");
            }

            // Mover al segundo ResultSet (datos detallados)
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();

                // Procesar registros del segundo ResultSet
                while (rs02 != null && rs02.next()) {
                    objRtn = new SQP04091Filter();

                    objRtn.CURRENCY = "USD";
                    objRtn.DAY_NAME = rs02.getString("DAY_NAME");
                    objRtn.MONTH_NAME = rs02.getString("MONTH_NAME");
                    objRtn.HOLIDAY_WP_UK = rs02.getString("HOLIDAY_WP_UK");
                    objRtn.HOLIDAY_WP_BANCARD = rs02.getString("HOLIDAY_WP_BANCARD");
                    objRtn.HOLIDAY_AMEX = rs02.getString("HOLIDAY_AMEX");
                    objRtn.HOLIDAY_DISCOVER = rs02.getString("HOLIDAY_DISCOVER");
                    objRtn.DATE_FROM = rs02.getString("DATE_FROM");
                    objRtn.NUMBER_WEAK = rs02.getString("NUMBER_WEAK");
                    objRtn.DAY_NUMBER_EKED = rs02.getString("DAY_NUMBER_EKED");

                    objRtn.AMOUNT_WP_UK_CO = rs02.getDouble("AMOUNT_WP_UK_CO");
                    objRtn.AMOUNT_BANCARD_CO = rs02.getDouble("AMOUNT_BANCARD_CO");
                    objRtn.AMOUNT_AMEX_CO = rs02.getDouble("AMOUNT_AMEX_CO");
                    objRtn.AMOUNT_DISCOVER_CO = rs02.getDouble("AMOUNT_DISCOVER_CO");

                    objRtn.AMOUNT_WP_UK_SA = rs02.getDouble("AMOUNT_WP_UK_SA");
                    objRtn.AMOUNT_BANCARD_SA = rs02.getDouble("AMOUNT_BANCARD_SA");
                    objRtn.AMOUNT_AMEX_SA = rs02.getDouble("AMOUNT_AMEX_SA");
                    objRtn.AMOUNT_DISCOVER_SA = rs02.getDouble("AMOUNT_DISCOVER_SA");

                    objRtn.TOTAL_CO = rs02.getDouble("TOTAL_CO");
                    objRtn.TOTAL_SA = rs02.getDouble("TOTAL_SA");
                    objRtn.TOTAL_CO_AND_SA = rs02.getDouble("TOTAL_CO_AND_SA");

                    objRtn.AVG_WP_UK_CO = rs02.getDouble("AVG_WP_UK_CO");
                    objRtn.AVG_BANCARD_CO = rs02.getDouble("AVG_BANCARD_CO");
                    objRtn.AVG_AMEX_CO = rs02.getDouble("AVG_AMEX_CO");
                    objRtn.AVG_DISCOVER_CO = rs02.getDouble("AVG_DISCOVER_CO");

                    objRtn.AVG_WP_UK_SA = rs02.getDouble("AVG_WP_UK_SA");
                    objRtn.AVG_BANCARD_SA = rs02.getDouble("AVG_BANCARD_SA");
                    objRtn.AVG_AMEX_SA = rs02.getDouble("AVG_AMEX_SA");
                    objRtn.AVG_DISCOVER_SA = rs02.getDouble("AVG_DISCOVER_SA");

                    objRtn.AVG_TOTAL_CO = rs02.getDouble("AVG_TOTAL_CO");
                    objRtn.AVG_TOTAL_SA = rs02.getDouble("AVG_TOTAL_SA");
                    objRtn.AVG_TOTAL_CO_SA = rs02.getDouble("AVG_TOTAL_CO_SA");

                    objRtn.VAR_WP_UK_CO = rs02.getDouble("VAR_WP_UK_CO");
                    objRtn.VAR_BANCARD_CO = rs02.getDouble("VAR_BANCARD_CO");
                    objRtn.VAR_AMEX_CO = rs02.getDouble("VAR_AMEX_CO");
                    objRtn.VAR_DISCOVER_CO = rs02.getDouble("VAR_DISCOVER_CO");

                    objRtn.VAR_WP_UK_SA = rs02.getDouble("VAR_WP_UK_SA");
                    objRtn.VAR_BANCARD_SA = rs02.getDouble("VAR_BANCARD_SA");
                    objRtn.VAR_AMEX_SA = rs02.getDouble("VAR_AMEX_SA");
                    objRtn.VAR_DISCOVER_SA = rs02.getDouble("VAR_DISCOVER_SA");

                    objRtn.VAR_TOTAL_CO = rs02.getDouble("VAR_TOTAL_CO");
                    objRtn.VAR_TOTAL_SA = rs02.getDouble("VAR_TOTAL_SA");
                    objRtn.VAR_TOTAL_CO_SA = rs02.getDouble("VAR_TOTAL_CO_SA");

                    // Asignar los totales al objeto de retorno
                    objRtn.TOTAL_AMOUNT_WP_UK_CO = TOTAL_AMOUNT_WP_UK_CO;
                    objRtn.TOTAL_AMOUNT_BANCARD_CO = TOTAL_AMOUNT_BANCARD_CO;
                    objRtn.TOTAL_AMOUNT_AMEX_CO = TOTAL_AMOUNT_AMEX_CO;
                    objRtn.TOTAL_AMOUNT_DISCOVER_CO = TOTAL_AMOUNT_DISCOVER_CO;
                    objRtn.TOTAL_AMOUNT_WP_UK_SA = TOTAL_AMOUNT_WP_UK_SA;
                    objRtn.TOTAL_AMOUNT_BANCARD_SA = TOTAL_AMOUNT_BANCARD_SA;
                    objRtn.TOTAL_AMOUNT_AMEX_SA = TOTAL_AMOUNT_AMEX_SA;
                    objRtn.TOTAL_AMOUNT_DISCOVER_SA = TOTAL_AMOUNT_DISCOVER_SA;
                    objRtn.TOTAL_TOTAL_CO = TOTAL_TOTAL_CO;
                    objRtn.TOTAL_TOTAL_SA = TOTAL_TOTAL_SA;
                    objRtn.TOTAL_TOTAL_CO_AND_SA = TOTAL_TOTAL_CO_AND_SA;
                    objRtn.TOTAL_AVG_WP_UK_CO = TOTAL_AVG_WP_UK_CO;
                    objRtn.TOTAL_AVG_BANCARD_CO = TOTAL_AVG_BANCARD_CO;
                    objRtn.TOTAL_AVG_AMEX_CO = TOTAL_AVG_AMEX_CO;
                    objRtn.TOTAL_AVG_DISCOVER_CO = TOTAL_AVG_DISCOVER_CO;
                    objRtn.TOTAL_AVG_WP_UK_SA = TOTAL_AVG_WP_UK_SA;
                    objRtn.TOTAL_AVG_BANCARD_SA = TOTAL_AVG_BANCARD_SA;
                    objRtn.TOTAL_AVG_AMEX_SA = TOTAL_AVG_AMEX_SA;
                    objRtn.TOTAL_AVG_DISCOVER_SA = TOTAL_AVG_DISCOVER_SA;
                    objRtn.TOTAL_AVG_TOTAL_CO = TOTAL_AVG_TOTAL_CO;
                    objRtn.TOTAL_AVG_TOTAL_SA = TOTAL_AVG_TOTAL_SA;
                    objRtn.TOTAL_AVG_TOTAL_CO_SA = TOTAL_AVG_TOTAL_CO_SA;
                    objRtn.TOTAL_VAR_WP_UK_CO = TOTAL_VAR_WP_UK_CO;
                    objRtn.TOTAL_VAR_BANCARD_CO = TOTAL_VAR_BANCARD_CO;
                    objRtn.TOTAL_VAR_AMEX_CO = TOTAL_VAR_AMEX_CO;
                    objRtn.TOTAL_VAR_DISCOVER_CO = TOTAL_VAR_DISCOVER_CO;
                    objRtn.TOTAL_VAR_WP_UK_SA = TOTAL_VAR_WP_UK_SA;
                    objRtn.TOTAL_VAR_BANCARD_SA = TOTAL_VAR_BANCARD_SA;
                    objRtn.TOTAL_VAR_AMEX_SA = TOTAL_VAR_AMEX_SA;
                    objRtn.TOTAL_VAR_DISCOVER_SA = TOTAL_VAR_DISCOVER_SA;
                    objRtn.TOTAL_VAR_TOTAL_CO = TOTAL_VAR_TOTAL_CO;
                    objRtn.TOTAL_VAR_TOTAL_SA = TOTAL_VAR_TOTAL_SA;
                    objRtn.TOTAL_VAR_TOTAL_CO_SA = TOTAL_VAR_TOTAL_CO_SA;

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
            // Cerrar recursos en orden inverso
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<SQP04091Filter> searchUsaflowWeekly(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        double TOTAL_AMOUNT_WP_UK_CO = 0, TOTAL_AMOUNT_BANCARD_CO = 0, TOTAL_AMOUNT_AMEX_CO = 0,
        TOTAL_AMOUNT_DISCOVER_CO = 0, TOTAL_AMOUNT_WP_UK_SA = 0, TOTAL_AMOUNT_BANCARD_SA = 0,
        TOTAL_AMOUNT_AMEX_SA = 0, TOTAL_AMOUNT_DISCOVER_SA = 0, 
        TOTAL_TOTAL_CO = 0,TOTAL_TOTAL_SA = 0, TOTAL_TOTAL_CO_AND_SA = 0, TOTAL_AVG_WP_UK_CO = 0, TOTAL_AVG_BANCARD_CO = 0,
        TOTAL_AVG_AMEX_CO = 0, TOTAL_AVG_DISCOVER_CO = 0, TOTAL_AVG_WP_UK_SA = 0, TOTAL_AVG_BANCARD_SA = 0,
        TOTAL_AVG_AMEX_SA = 0, TOTAL_AVG_DISCOVER_SA = 0, TOTAL_AVG_TOTAL_CO = 0, TOTAL_AVG_TOTAL_SA = 0,
        TOTAL_AVG_TOTAL_CO_SA = 0, TOTAL_VAR_WP_UK_CO = 0, TOTAL_VAR_BANCARD_CO = 0, TOTAL_VAR_AMEX_CO = 0,
        TOTAL_VAR_DISCOVER_CO = 0, TOTAL_VAR_WP_UK_SA = 0, TOTAL_VAR_BANCARD_SA = 0, TOTAL_VAR_AMEX_SA = 0,
        TOTAL_VAR_DISCOVER_SA = 0, TOTAL_VAR_TOTAL_CO = 0, TOTAL_VAR_TOTAL_SA = 0, TOTAL_VAR_TOTAL_CO_SA = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS127_v2(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            // Obtener el primer ResultSet (totales)
            rs01 = cstmt01.getResultSet();
            if (rs01 != null && rs01.next()) {
                TOTAL_AMOUNT_WP_UK_CO = rs01.getDouble("TOTAL_AMOUNT_WP_UK_CO");
                TOTAL_AMOUNT_BANCARD_CO = rs01.getDouble("TOTAL_AMOUNT_BANCARD_CO");
                TOTAL_AMOUNT_AMEX_CO = rs01.getDouble("TOTAL_AMOUNT_AMEX_CO");
                TOTAL_AMOUNT_DISCOVER_CO = rs01.getDouble("TOTAL_AMOUNT_DISCOVER_CO");
                
                TOTAL_AMOUNT_WP_UK_SA = rs01.getDouble("TOTAL_AMOUNT_WP_UK_SA");
                TOTAL_AMOUNT_BANCARD_SA = rs01.getDouble("TOTAL_AMOUNT_BANCARD_SA");
                TOTAL_AMOUNT_AMEX_SA = rs01.getDouble("TOTAL_AMOUNT_AMEX_SA");
                TOTAL_AMOUNT_DISCOVER_SA = rs01.getDouble("TOTAL_AMOUNT_DISCOVER_SA");
                
                TOTAL_TOTAL_CO = rs01.getDouble("TOTAL_TOTAL_CO");
                TOTAL_TOTAL_SA = rs01.getDouble("TOTAL_TOTAL_SA");
                TOTAL_TOTAL_CO_AND_SA = rs01.getDouble("TOTAL_TOTAL_CO_AND_SA");
                
                TOTAL_AVG_WP_UK_CO = rs01.getDouble("TOTAL_AVG_WP_UK_CO");
                TOTAL_AVG_BANCARD_CO = rs01.getDouble("TOTAL_AVG_BANCARD_CO");
                TOTAL_AVG_AMEX_CO = rs01.getDouble("TOTAL_AVG_AMEX_CO");
                TOTAL_AVG_DISCOVER_CO = rs01.getDouble("TOTAL_AVG_DISCOVER_CO");
                
                TOTAL_AVG_WP_UK_SA = rs01.getDouble("TOTAL_AVG_WP_UK_SA");
                TOTAL_AVG_BANCARD_SA = rs01.getDouble("TOTAL_AVG_BANCARD_SA");
                TOTAL_AVG_AMEX_SA = rs01.getDouble("TOTAL_AVG_AMEX_SA");
                TOTAL_AVG_DISCOVER_SA = rs01.getDouble("TOTAL_AVG_DISCOVER_SA");
                
                TOTAL_AVG_TOTAL_CO = rs01.getDouble("TOTAL_AVG_TOTAL_CO");
                TOTAL_AVG_TOTAL_SA = rs01.getDouble("TOTAL_AVG_TOTAL_SA");
                TOTAL_AVG_TOTAL_CO_SA = rs01.getDouble("TOTAL_AVG_TOTAL_CO_SA");
                
                TOTAL_VAR_WP_UK_CO = rs01.getDouble("TOTAL_VAR_WP_UK_CO");
                TOTAL_VAR_BANCARD_CO = rs01.getDouble("TOTAL_VAR_BANCARD_CO");
                TOTAL_VAR_AMEX_CO = rs01.getDouble("TOTAL_VAR_AMEX_CO");
                TOTAL_VAR_DISCOVER_CO = rs01.getDouble("TOTAL_VAR_DISCOVER_CO");
                
                TOTAL_VAR_WP_UK_SA = rs01.getDouble("TOTAL_VAR_WP_UK_SA");
                TOTAL_VAR_BANCARD_SA = rs01.getDouble("TOTAL_VAR_BANCARD_SA");
                TOTAL_VAR_AMEX_SA = rs01.getDouble("TOTAL_VAR_AMEX_SA");
                TOTAL_VAR_DISCOVER_SA = rs01.getDouble("TOTAL_VAR_DISCOVER_SA");
                
                TOTAL_VAR_TOTAL_CO = rs01.getDouble("TOTAL_VAR_TOTAL_CO");
                TOTAL_VAR_TOTAL_SA = rs01.getDouble("TOTAL_VAR_TOTAL_SA");
                TOTAL_VAR_TOTAL_CO_SA = rs01.getDouble("TOTAL_VAR_TOTAL_CO_SA");
            }

            // Mover al segundo ResultSet (datos detallados)
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();

                // Procesar registros del segundo ResultSet
                while (rs02 != null && rs02.next()) {
                    objRtn = new SQP04091Filter();

                    objRtn.CURRENCY = "USD";
                    objRtn.NUMBERWEAK = rs02.getString("NUMBERWEAK");
                    objRtn.WEEK_START_DATE = rs02.getString("WEEK_START_DATE");
                    objRtn.WEEK_END_DATE = rs02.getString("WEEK_END_DATE");
                
                    objRtn.AMOUNT_WP_UK_CO = rs02.getDouble("AMOUNT_WP_UK_CO");
                    objRtn.AMOUNT_BANCARD_CO = rs02.getDouble("AMOUNT_BANCARD_CO");
                    objRtn.AMOUNT_AMEX_CO = rs02.getDouble("AMOUNT_AMEX_CO");
                    objRtn.AMOUNT_DISCOVER_CO = rs02.getDouble("AMOUNT_DISCOVER_CO");

                    objRtn.AMOUNT_WP_UK_SA = rs02.getDouble("AMOUNT_WP_UK_SA");
                    objRtn.AMOUNT_BANCARD_SA = rs02.getDouble("AMOUNT_BANCARD_SA");
                    objRtn.AMOUNT_AMEX_SA = rs02.getDouble("AMOUNT_AMEX_SA");
                    objRtn.AMOUNT_DISCOVER_SA = rs02.getDouble("AMOUNT_DISCOVER_SA");

                    objRtn.TOTAL_CO = rs02.getDouble("TOTAL_CO");
                    objRtn.TOTAL_SA = rs02.getDouble("TOTAL_SA");
                    objRtn.TOTAL_CO_AND_SA = rs02.getDouble("TOTAL_CO_AND_SA");

                    objRtn.AVG_WP_UK_CO = rs02.getDouble("AVG_WP_UK_CO");
                    objRtn.AVG_BANCARD_CO = rs02.getDouble("AVG_BANCARD_CO");
                    objRtn.AVG_AMEX_CO = rs02.getDouble("AVG_AMEX_CO");
                    objRtn.AVG_DISCOVER_CO = rs02.getDouble("AVG_DISCOVER_CO");

                    objRtn.AVG_WP_UK_SA = rs02.getDouble("AVG_WP_UK_SA");
                    objRtn.AVG_BANCARD_SA = rs02.getDouble("AVG_BANCARD_SA");
                    objRtn.AVG_AMEX_SA = rs02.getDouble("AVG_AMEX_SA");
                    objRtn.AVG_DISCOVER_SA = rs02.getDouble("AVG_DISCOVER_SA");

                    objRtn.AVG_TOTAL_CO = rs02.getDouble("AVG_TOTAL_CO");
                    objRtn.AVG_TOTAL_SA = rs02.getDouble("AVG_TOTAL_SA");
                    objRtn.AVG_TOTAL_CO_SA = rs02.getDouble("AVG_TOTAL_CO_SA");

                    objRtn.VAR_WP_UK_CO = rs02.getDouble("VAR_WP_UK_CO");
                    objRtn.VAR_BANCARD_CO = rs02.getDouble("VAR_BANCARD_CO");
                    objRtn.VAR_AMEX_CO = rs02.getDouble("VAR_AMEX_CO");
                    objRtn.VAR_DISCOVER_CO = rs02.getDouble("VAR_DISCOVER_CO");

                    objRtn.VAR_WP_UK_SA = rs02.getDouble("VAR_WP_UK_SA");
                    objRtn.VAR_BANCARD_SA = rs02.getDouble("VAR_BANCARD_SA");
                    objRtn.VAR_AMEX_SA = rs02.getDouble("VAR_AMEX_SA");
                    objRtn.VAR_DISCOVER_SA = rs02.getDouble("VAR_DISCOVER_SA");

                    objRtn.VAR_TOTAL_CO = rs02.getDouble("VAR_TOTAL_CO");
                    objRtn.VAR_TOTAL_SA = rs02.getDouble("VAR_TOTAL_SA");
                    objRtn.VAR_TOTAL_CO_SA = rs02.getDouble("VAR_CO_AND_SA");

                    // Asignar los totales al objeto de retorno
                    objRtn.TOTAL_AMOUNT_WP_UK_CO = TOTAL_AMOUNT_WP_UK_CO;
                    objRtn.TOTAL_AMOUNT_BANCARD_CO = TOTAL_AMOUNT_BANCARD_CO;
                    objRtn.TOTAL_AMOUNT_AMEX_CO = TOTAL_AMOUNT_AMEX_CO;
                    objRtn.TOTAL_AMOUNT_DISCOVER_CO = TOTAL_AMOUNT_DISCOVER_CO;
                    objRtn.TOTAL_AMOUNT_WP_UK_SA = TOTAL_AMOUNT_WP_UK_SA;
                    objRtn.TOTAL_AMOUNT_BANCARD_SA = TOTAL_AMOUNT_BANCARD_SA;
                    objRtn.TOTAL_AMOUNT_AMEX_SA = TOTAL_AMOUNT_AMEX_SA;
                    objRtn.TOTAL_AMOUNT_DISCOVER_SA = TOTAL_AMOUNT_DISCOVER_SA;
                    objRtn.TOTAL_TOTAL_CO = TOTAL_TOTAL_CO;
                    objRtn.TOTAL_TOTAL_SA = TOTAL_TOTAL_SA;
                    objRtn.TOTAL_TOTAL_CO_AND_SA = TOTAL_TOTAL_CO_AND_SA;
                    objRtn.TOTAL_AVG_WP_UK_CO = TOTAL_AVG_WP_UK_CO;
                    objRtn.TOTAL_AVG_BANCARD_CO = TOTAL_AVG_BANCARD_CO;
                    objRtn.TOTAL_AVG_AMEX_CO = TOTAL_AVG_AMEX_CO;
                    objRtn.TOTAL_AVG_DISCOVER_CO = TOTAL_AVG_DISCOVER_CO;
                    objRtn.TOTAL_AVG_WP_UK_SA = TOTAL_AVG_WP_UK_SA;
                    objRtn.TOTAL_AVG_BANCARD_SA = TOTAL_AVG_BANCARD_SA;
                    objRtn.TOTAL_AVG_AMEX_SA = TOTAL_AVG_AMEX_SA;
                    objRtn.TOTAL_AVG_DISCOVER_SA = TOTAL_AVG_DISCOVER_SA;
                    objRtn.TOTAL_AVG_TOTAL_CO = TOTAL_AVG_TOTAL_CO;
                    objRtn.TOTAL_AVG_TOTAL_SA = TOTAL_AVG_TOTAL_SA;
                    objRtn.TOTAL_AVG_TOTAL_CO_SA = TOTAL_AVG_TOTAL_CO_SA;
                    objRtn.TOTAL_VAR_WP_UK_CO = TOTAL_VAR_WP_UK_CO;
                    objRtn.TOTAL_VAR_BANCARD_CO = TOTAL_VAR_BANCARD_CO;
                    objRtn.TOTAL_VAR_AMEX_CO = TOTAL_VAR_AMEX_CO;
                    objRtn.TOTAL_VAR_DISCOVER_CO = TOTAL_VAR_DISCOVER_CO;
                    objRtn.TOTAL_VAR_WP_UK_SA = TOTAL_VAR_WP_UK_SA;
                    objRtn.TOTAL_VAR_BANCARD_SA = TOTAL_VAR_BANCARD_SA;
                    objRtn.TOTAL_VAR_AMEX_SA = TOTAL_VAR_AMEX_SA;
                    objRtn.TOTAL_VAR_DISCOVER_SA = TOTAL_VAR_DISCOVER_SA;
                    objRtn.TOTAL_VAR_TOTAL_CO = TOTAL_VAR_TOTAL_CO;
                    objRtn.TOTAL_VAR_TOTAL_SA = TOTAL_VAR_TOTAL_SA;
                    objRtn.TOTAL_VAR_TOTAL_CO_SA = TOTAL_VAR_TOTAL_CO_SA;

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
            // Cerrar recursos en orden inverso
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<SQP04091Filter> searchUsaflowWeeklyHistoric(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        double TOTAL_AMOUNT_WP_UK_CO = 0, TOTAL_AMOUNT_BANCARD_CO = 0, TOTAL_AMOUNT_AMEX_CO = 0,
        TOTAL_AMOUNT_DISCOVER_CO = 0, TOTAL_AMOUNT_WP_UK_SA = 0, TOTAL_AMOUNT_BANCARD_SA = 0,
        TOTAL_AMOUNT_AMEX_SA = 0, TOTAL_AMOUNT_DISCOVER_SA = 0, 
        TOTAL_TOTAL_CO = 0,TOTAL_TOTAL_SA = 0, TOTAL_TOTAL_CO_AND_SA = 0, TOTAL_AVG_WP_UK_CO = 0, TOTAL_AVG_BANCARD_CO = 0,
        TOTAL_AVG_AMEX_CO = 0, TOTAL_AVG_DISCOVER_CO = 0, TOTAL_AVG_WP_UK_SA = 0, TOTAL_AVG_BANCARD_SA = 0,
        TOTAL_AVG_AMEX_SA = 0, TOTAL_AVG_DISCOVER_SA = 0, TOTAL_AVG_TOTAL_CO = 0, TOTAL_AVG_TOTAL_SA = 0,
        TOTAL_AVG_TOTAL_CO_SA = 0, TOTAL_VAR_WP_UK_CO = 0, TOTAL_VAR_BANCARD_CO = 0, TOTAL_VAR_AMEX_CO = 0,
        TOTAL_VAR_DISCOVER_CO = 0, TOTAL_VAR_WP_UK_SA = 0, TOTAL_VAR_BANCARD_SA = 0, TOTAL_VAR_AMEX_SA = 0,
        TOTAL_VAR_DISCOVER_SA = 0, TOTAL_VAR_TOTAL_CO = 0, TOTAL_VAR_TOTAL_SA = 0, TOTAL_VAR_TOTAL_CO_SA = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS131(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            // Obtener el primer ResultSet (totales)
            rs01 = cstmt01.getResultSet();
            if (rs01 != null && rs01.next()) {
                TOTAL_AMOUNT_WP_UK_CO = rs01.getDouble("TOTAL_AMOUNT_WP_UK_CO");
                TOTAL_AMOUNT_BANCARD_CO = rs01.getDouble("TOTAL_AMOUNT_BANCARD_CO");
                TOTAL_AMOUNT_AMEX_CO = rs01.getDouble("TOTAL_AMOUNT_AMEX_CO");
                TOTAL_AMOUNT_DISCOVER_CO = rs01.getDouble("TOTAL_AMOUNT_DISCOVER_CO");
                
                TOTAL_AMOUNT_WP_UK_SA = rs01.getDouble("TOTAL_AMOUNT_WP_UK_SA");
                TOTAL_AMOUNT_BANCARD_SA = rs01.getDouble("TOTAL_AMOUNT_BANCARD_SA");
                TOTAL_AMOUNT_AMEX_SA = rs01.getDouble("TOTAL_AMOUNT_AMEX_SA");
                TOTAL_AMOUNT_DISCOVER_SA = rs01.getDouble("TOTAL_AMOUNT_DISCOVER_SA");
                
                TOTAL_TOTAL_CO = rs01.getDouble("TOTAL_TOTAL_CO");
                TOTAL_TOTAL_SA = rs01.getDouble("TOTAL_TOTAL_SA");
                TOTAL_TOTAL_CO_AND_SA = rs01.getDouble("TOTAL_TOTAL_CO_AND_SA");
                
                TOTAL_AVG_WP_UK_CO = rs01.getDouble("TOTAL_AVG_WP_UK_CO");
                TOTAL_AVG_BANCARD_CO = rs01.getDouble("TOTAL_AVG_BANCARD_CO");
                TOTAL_AVG_AMEX_CO = rs01.getDouble("TOTAL_AVG_AMEX_CO");
                TOTAL_AVG_DISCOVER_CO = rs01.getDouble("TOTAL_AVG_DISCOVER_CO");
                
                TOTAL_AVG_WP_UK_SA = rs01.getDouble("TOTAL_AVG_WP_UK_SA");
                TOTAL_AVG_BANCARD_SA = rs01.getDouble("TOTAL_AVG_BANCARD_SA");
                TOTAL_AVG_AMEX_SA = rs01.getDouble("TOTAL_AVG_AMEX_SA");
                TOTAL_AVG_DISCOVER_SA = rs01.getDouble("TOTAL_AVG_DISCOVER_SA");
                
                TOTAL_AVG_TOTAL_CO = rs01.getDouble("TOTAL_AVG_TOTAL_CO");
                TOTAL_AVG_TOTAL_SA = rs01.getDouble("TOTAL_AVG_TOTAL_SA");
                TOTAL_AVG_TOTAL_CO_SA = rs01.getDouble("TOTAL_AVG_TOTAL_CO_SA");
                
                TOTAL_VAR_WP_UK_CO = rs01.getDouble("TOTAL_VAR_WP_UK_CO");
                TOTAL_VAR_BANCARD_CO = rs01.getDouble("TOTAL_VAR_BANCARD_CO");
                TOTAL_VAR_AMEX_CO = rs01.getDouble("TOTAL_VAR_AMEX_CO");
                TOTAL_VAR_DISCOVER_CO = rs01.getDouble("TOTAL_VAR_DISCOVER_CO");
                
                TOTAL_VAR_WP_UK_SA = rs01.getDouble("TOTAL_VAR_WP_UK_SA");
                TOTAL_VAR_BANCARD_SA = rs01.getDouble("TOTAL_VAR_BANCARD_SA");
                TOTAL_VAR_AMEX_SA = rs01.getDouble("TOTAL_VAR_AMEX_SA");
                TOTAL_VAR_DISCOVER_SA = rs01.getDouble("TOTAL_VAR_DISCOVER_SA");
                
                TOTAL_VAR_TOTAL_CO = rs01.getDouble("TOTAL_VAR_TOTAL_CO");
                TOTAL_VAR_TOTAL_SA = rs01.getDouble("TOTAL_VAR_TOTAL_SA");
                TOTAL_VAR_TOTAL_CO_SA = rs01.getDouble("TOTAL_VAR_TOTAL_CO_SA");
            }

            // Mover al segundo ResultSet (datos detallados)
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();

                // Procesar registros del segundo ResultSet
                while (rs02 != null && rs02.next()) {
                    objRtn = new SQP04091Filter();

                    objRtn.CURRENCY = "USD";
                    objRtn.NUMBERWEAK = rs02.getString("NUMBERWEAK");
                    objRtn.NUMBER_WEAK = rs02.getString("NUMBER_WEAK");
                    objRtn.WEEK_START_DATE = rs02.getString("WEEK_START_DATE");
                    objRtn.WEEK_END_DATE = rs02.getString("WEEK_END_DATE");
                    
                
                    objRtn.AMOUNT_WP_UK_CO = rs02.getDouble("AMOUNT_WP_UK_CO");
                    objRtn.AMOUNT_BANCARD_CO = rs02.getDouble("AMOUNT_BANCARD_CO");
                    objRtn.AMOUNT_AMEX_CO = rs02.getDouble("AMOUNT_AMEX_CO");
                    objRtn.AMOUNT_DISCOVER_CO = rs02.getDouble("AMOUNT_DISCOVER_CO");

                    objRtn.AMOUNT_WP_UK_SA = rs02.getDouble("AMOUNT_WP_UK_SA");
                    objRtn.AMOUNT_BANCARD_SA = rs02.getDouble("AMOUNT_BANCARD_SA");
                    objRtn.AMOUNT_AMEX_SA = rs02.getDouble("AMOUNT_AMEX_SA");
                    objRtn.AMOUNT_DISCOVER_SA = rs02.getDouble("AMOUNT_DISCOVER_SA");

                    objRtn.TOTAL_CO = rs02.getDouble("TOTAL_CO");
                    objRtn.TOTAL_SA = rs02.getDouble("TOTAL_SA");
                    objRtn.TOTAL_CO_AND_SA = rs02.getDouble("TOTAL_CO_AND_SA");

                    objRtn.AVG_WP_UK_CO = rs02.getDouble("AVG_WP_UK_CO");
                    objRtn.AVG_BANCARD_CO = rs02.getDouble("AVG_BANCARD_CO");
                    objRtn.AVG_AMEX_CO = rs02.getDouble("AVG_AMEX_CO");
                    objRtn.AVG_DISCOVER_CO = rs02.getDouble("AVG_DISCOVER_CO");

                    objRtn.AVG_WP_UK_SA = rs02.getDouble("AVG_WP_UK_SA");
                    objRtn.AVG_BANCARD_SA = rs02.getDouble("AVG_BANCARD_SA");
                    objRtn.AVG_AMEX_SA = rs02.getDouble("AVG_AMEX_SA");
                    objRtn.AVG_DISCOVER_SA = rs02.getDouble("AVG_DISCOVER_SA");

                    objRtn.AVG_TOTAL_CO = rs02.getDouble("AVG_TOTAL_CO");
                    objRtn.AVG_TOTAL_SA = rs02.getDouble("AVG_TOTAL_SA");
                    objRtn.AVG_TOTAL_CO_SA = rs02.getDouble("AVG_TOTAL_CO_SA");

                    objRtn.VAR_WP_UK_CO = rs02.getDouble("VAR_WP_UK_CO");
                    objRtn.VAR_BANCARD_CO = rs02.getDouble("VAR_BANCARD_CO");
                    objRtn.VAR_AMEX_CO = rs02.getDouble("VAR_AMEX_CO");
                    objRtn.VAR_DISCOVER_CO = rs02.getDouble("VAR_DISCOVER_CO");

                    objRtn.VAR_WP_UK_SA = rs02.getDouble("VAR_WP_UK_SA");
                    objRtn.VAR_BANCARD_SA = rs02.getDouble("VAR_BANCARD_SA");
                    objRtn.VAR_AMEX_SA = rs02.getDouble("VAR_AMEX_SA");
                    objRtn.VAR_DISCOVER_SA = rs02.getDouble("VAR_DISCOVER_SA");

                    objRtn.VAR_TOTAL_CO = rs02.getDouble("VAR_TOTAL_CO");
                    objRtn.VAR_TOTAL_SA = rs02.getDouble("VAR_TOTAL_SA");
                    objRtn.VAR_TOTAL_CO_SA = rs02.getDouble("VAR_TOTAL_CO_SA");

                    // Asignar los totales al objeto de retorno
                    objRtn.TOTAL_AMOUNT_WP_UK_CO = TOTAL_AMOUNT_WP_UK_CO;
                    objRtn.TOTAL_AMOUNT_BANCARD_CO = TOTAL_AMOUNT_BANCARD_CO;
                    objRtn.TOTAL_AMOUNT_AMEX_CO = TOTAL_AMOUNT_AMEX_CO;
                    objRtn.TOTAL_AMOUNT_DISCOVER_CO = TOTAL_AMOUNT_DISCOVER_CO;
                    objRtn.TOTAL_AMOUNT_WP_UK_SA = TOTAL_AMOUNT_WP_UK_SA;
                    objRtn.TOTAL_AMOUNT_BANCARD_SA = TOTAL_AMOUNT_BANCARD_SA;
                    objRtn.TOTAL_AMOUNT_AMEX_SA = TOTAL_AMOUNT_AMEX_SA;
                    objRtn.TOTAL_AMOUNT_DISCOVER_SA = TOTAL_AMOUNT_DISCOVER_SA;
                    objRtn.TOTAL_TOTAL_CO = TOTAL_TOTAL_CO;
                    objRtn.TOTAL_TOTAL_SA = TOTAL_TOTAL_SA;
                    objRtn.TOTAL_TOTAL_CO_AND_SA = TOTAL_TOTAL_CO_AND_SA;
                    objRtn.TOTAL_AVG_WP_UK_CO = TOTAL_AVG_WP_UK_CO;
                    objRtn.TOTAL_AVG_BANCARD_CO = TOTAL_AVG_BANCARD_CO;
                    objRtn.TOTAL_AVG_AMEX_CO = TOTAL_AVG_AMEX_CO;
                    objRtn.TOTAL_AVG_DISCOVER_CO = TOTAL_AVG_DISCOVER_CO;
                    objRtn.TOTAL_AVG_WP_UK_SA = TOTAL_AVG_WP_UK_SA;
                    objRtn.TOTAL_AVG_BANCARD_SA = TOTAL_AVG_BANCARD_SA;
                    objRtn.TOTAL_AVG_AMEX_SA = TOTAL_AVG_AMEX_SA;
                    objRtn.TOTAL_AVG_DISCOVER_SA = TOTAL_AVG_DISCOVER_SA;
                    objRtn.TOTAL_AVG_TOTAL_CO = TOTAL_AVG_TOTAL_CO;
                    objRtn.TOTAL_AVG_TOTAL_SA = TOTAL_AVG_TOTAL_SA;
                    objRtn.TOTAL_AVG_TOTAL_CO_SA = TOTAL_AVG_TOTAL_CO_SA;
                    objRtn.TOTAL_VAR_WP_UK_CO = TOTAL_VAR_WP_UK_CO;
                    objRtn.TOTAL_VAR_BANCARD_CO = TOTAL_VAR_BANCARD_CO;
                    objRtn.TOTAL_VAR_AMEX_CO = TOTAL_VAR_AMEX_CO;
                    objRtn.TOTAL_VAR_DISCOVER_CO = TOTAL_VAR_DISCOVER_CO;
                    objRtn.TOTAL_VAR_WP_UK_SA = TOTAL_VAR_WP_UK_SA;
                    objRtn.TOTAL_VAR_BANCARD_SA = TOTAL_VAR_BANCARD_SA;
                    objRtn.TOTAL_VAR_AMEX_SA = TOTAL_VAR_AMEX_SA;
                    objRtn.TOTAL_VAR_DISCOVER_SA = TOTAL_VAR_DISCOVER_SA;
                    objRtn.TOTAL_VAR_TOTAL_CO = TOTAL_VAR_TOTAL_CO;
                    objRtn.TOTAL_VAR_TOTAL_SA = TOTAL_VAR_TOTAL_SA;
                    objRtn.TOTAL_VAR_TOTAL_CO_SA = TOTAL_VAR_TOTAL_CO_SA;

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
            // Cerrar recursos en orden inverso
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<SQP04091Filter> searchTacaDiary(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        double  TOTAL_AMOUNT_TACA = 0, TOTAL_AMOUNT_CRC = 0, TOTAL_AMOUNT_TACA_CRC = 0, 
                TOTAL_AVG_TACA = 0, TOTAL_AVG_CRC = 0, TOTAL_AVG_TACA_CRC = 0, 
                TOTAL_VAR_TACA = 0, TOTAL_VAR_CRC = 0, TOTAL_VAR_TACA_CRC = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS123_v2(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            // Obtener el primer ResultSet (totales)
            rs01 = cstmt01.getResultSet();
            if (rs01 != null && rs01.next()) {
                TOTAL_AMOUNT_TACA = rs01.getDouble("TOTAL_AMOUNT_TACA");
                TOTAL_AMOUNT_CRC = rs01.getDouble("TOTAL_AMOUNT_CRC");
                TOTAL_AMOUNT_TACA_CRC = rs01.getDouble("TOTAL_AMOUNT_TACA_CRC");
                
                TOTAL_AVG_TACA = rs01.getDouble("TOTAL_AVG_TACA");
                TOTAL_AVG_CRC = rs01.getDouble("TOTAL_AVG_CRC");
                TOTAL_AVG_TACA_CRC = rs01.getDouble("TOTAL_AVG_TACA_CRC");
                
                TOTAL_VAR_TACA = rs01.getDouble("TOTAL_VAR_TACA");
                TOTAL_VAR_CRC = rs01.getDouble("TOTAL_VAR_CRC");
                TOTAL_VAR_TACA_CRC = rs01.getDouble("TOTAL_VAR_TACA_CRC");
            }

            // Mover al segundo ResultSet (datos detallados)
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();

                // Procesar registros del segundo ResultSet
                while (rs02 != null && rs02.next()) {
                    objRtn = new SQP04091Filter();

                    objRtn.DAY_NAME = rs02.getString("DAY_NAME");
                    objRtn.MONTH_NAME = rs02.getString("MONTH_NAME");
                    objRtn.HOLIDAY_TACA = rs02.getString("HOLIDAY_TACA");
                   
                    objRtn.DATE_FROM = rs02.getString("DATE_FROM");
                    objRtn.NUMBER_WEAK = rs02.getString("NUMBER_WEEK");
                    objRtn.DAY_NUMBER_EKED = rs02.getString("DAY_NUMBER_EKED");

                    objRtn.AMOUNT_TACA = rs02.getDouble("AMOUNT_TACA");
                    objRtn.AMOUNT_CRC = rs02.getDouble("AMOUNT_CRC");
                    objRtn.TOTAL_TACA_CRC = rs02.getDouble("TOTAL_TACA_CRC");

                    objRtn.AVG_TACA = rs02.getDouble("AVG_TACA");
                    objRtn.AVG_CRC = rs02.getDouble("AVG_CRC");
                    objRtn.AVG_TOTAL_TACA_CRC = rs02.getDouble("AVG_TOTAL");

                    objRtn.VAR_TACA = rs02.getDouble("VAR_TACA");
                    objRtn.VAR_CRC = rs02.getDouble("VAR_CRC");
                    objRtn.VAR_TOTAL_TACA_CRC = rs02.getDouble("VAR_TOTAL");

                    // Asignar los totales al objeto de retorno
                    objRtn.TOTAL_AMOUNT_TACA = TOTAL_AMOUNT_TACA;
                    objRtn.TOTAL_AMOUNT_CRC = TOTAL_AMOUNT_CRC;
                    objRtn.TOTAL_AMOUNT_TACA_CRC = TOTAL_AMOUNT_TACA_CRC;
                    
                    objRtn.TOTAL_AVG_TACA = TOTAL_AVG_TACA;
                    objRtn.TOTAL_AVG_CRC = TOTAL_AVG_CRC;
                    objRtn.TOTAL_AVG_TACA_CRC = TOTAL_AVG_TACA_CRC;
                    
                    objRtn.TOTAL_VAR_TACA = TOTAL_VAR_TACA;
                    objRtn.TOTAL_VAR_CRC = TOTAL_VAR_CRC;
                    objRtn.TOTAL_VAR_TACA_CRC = TOTAL_VAR_TACA_CRC;

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
            // Cerrar recursos en orden inverso
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<SQP04091Filter> searchTacaDiaryHistoric(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        double TOTAL_AMOUNT_TACA = 0, TOTAL_AMOUNT_CRC = 0,
        TOTAL_TOTAL_TACA = 0, TOTAL_TOTAL_CRC = 0, TOTAL_TOTAL_TACA_CRC = 0, 
                
        TOTAL_AVG_TACA = 0, TOTAL_AVG_CRC = 0,
        TOTAL_AVG_TOTAL_TACA = 0, TOTAL_AVG_TOTAL_CRC = 0, TOTAL_AVG_TOTAL_TACA_CRC = 0, 
        
        TOTAL_VAR_TACA = 0, TOTAL_VAR_CRC = 0,
        TOTAL_VAR_TOTAL_TACA = 0, TOTAL_VAR_TOTAL_CRC = 0,TOTAL_VAR_TOTAL_TACA_CRC = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS128(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            // Obtener el primer ResultSet (totales)
            rs01 = cstmt01.getResultSet();
            if (rs01 != null && rs01.next()) {
                
                TOTAL_AMOUNT_TACA = rs01.getDouble("TOTAL_AMOUNT_TACA");
                TOTAL_AVG_TACA = rs01.getDouble("TOTAL_AVG_TACA");
                TOTAL_VAR_TACA = rs01.getDouble("TOTAL_VARIATION_TACA");
                
            }

            // Mover al segundo ResultSet (datos detallados)
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();

                // Procesar registros del segundo ResultSet
                while (rs02 != null && rs02.next()) {
                    objRtn = new SQP04091Filter();

                    objRtn.DAY_NAME = rs02.getString("DAY_NAME");
                    objRtn.MONTH_NAME = rs02.getString("MONTH_NAME");
                    objRtn.HOLIDAY_TACA = rs02.getString("HOLIDAY_TACA");
                   
                    objRtn.DATE_FROM = rs02.getString("DATE_FROM");
                    objRtn.NUMBER_WEAK = rs02.getString("NUMBER_WEAK");
                    objRtn.DAY_NUMBER_EKED = rs02.getString("DAY_NUMBER_EKED");

                    objRtn.AMOUNT_TACA = rs02.getDouble("AMOUNT_TACA");
                    objRtn.AVG_TACA = rs02.getDouble("AVG_TACA");
                    objRtn.VAR_TACA = rs02.getDouble("VAR_TACA");

                    // Asignar los totales al objeto de retorno
                    objRtn.TOTAL_AMOUNT_TACA = TOTAL_AMOUNT_TACA;
                    objRtn.TOTAL_AVG_TACA = TOTAL_AVG_TACA;
                    objRtn.TOTAL_VAR_TACA = TOTAL_VAR_TACA;

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
            // Cerrar recursos en orden inverso
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<SQP04091Filter> searchTacaWeekly(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        double TOTAL_AMOUNT_TACA = 0, TOTAL_AVG_TACA = 0,
        TOTAL_VAR_TACA = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS126_v2(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            // Obtener el primer ResultSet (totales)
            rs01 = cstmt01.getResultSet();
            if (rs01 != null && rs01.next()) {
                
                TOTAL_AMOUNT_TACA = rs01.getDouble("TOTAL_AMOUNT_TACA");
                TOTAL_AVG_TACA = rs01.getDouble("TOTAL_AVG_TACA");
                TOTAL_VAR_TACA = rs01.getDouble("TOTAL_VAR_TACA");
                
            }

            // Mover al segundo ResultSet (datos detallados)
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();

                // Procesar registros del segundo ResultSet
                while (rs02 != null && rs02.next()) {
                    objRtn = new SQP04091Filter();
                    
                    objRtn.NUMBERWEAK = rs02.getString("NUMBERWEAK");
                    
                    objRtn.WEEK_START_DATE = rs02.getString("WEEK_START_DATE");
                    objRtn.WEEK_END_DATE = rs02.getString("WEEK_END_DATE");
                   
                    objRtn.AMOUNT_TACA = rs02.getDouble("AMOUNT_TACA");
                    objRtn.AVG_TACA = rs02.getDouble("AVG_TACA");
                    objRtn.VAR_TACA = rs02.getDouble("VAR_TACA");
                    
                    // Asignar los totales al objeto de retorno
                    objRtn.TOTAL_AMOUNT_TACA = TOTAL_AMOUNT_TACA;
                    objRtn.TOTAL_AVG_TACA = TOTAL_AVG_TACA;
                    objRtn.TOTAL_VAR_TACA = TOTAL_VAR_TACA;

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
            // Cerrar recursos en orden inverso
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
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<SQP04091Filter> searchTacaWeeklyHistoric(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<>();
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        double TOTAL_AMOUNT_TACA = 0, TOTAL_AVG_TACA = 0,
        TOTAL_VAR_TACA = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS129(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // Registrar parámetros de salida
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            // Establecer parámetros de entrada
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            // Ejecutar el procedimiento almacenado
            cstmt01.execute();

            // Actualizar valores de paginación
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            // Obtener el primer ResultSet (totales)
            rs01 = cstmt01.getResultSet();
            if (rs01 != null && rs01.next()) {
                
                TOTAL_AMOUNT_TACA = rs01.getDouble("TOTAL_AMOUNT_TACA");
                TOTAL_AVG_TACA = rs01.getDouble("TOTAL_AVG_TACA");
                TOTAL_VAR_TACA = rs01.getDouble("TOTAL_VAR_TACA");
                
            }

            // Mover al segundo ResultSet (datos detallados)
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();

                // Procesar registros del segundo ResultSet
                while (rs02 != null && rs02.next()) {
                    objRtn = new SQP04091Filter();
                    
                    objRtn.NUMBERWEAK = rs02.getString("NUMBERWEAK");
                    objRtn.NUMBER_WEAK = rs02.getString("NUMBER_WEAK");
                    
                    objRtn.WEEK_START_DATE = rs02.getString("WEEK_START_DATE");
                    objRtn.WEEK_END_DATE = rs02.getString("WEEK_END_DATE");
                   
                    objRtn.AMOUNT_TACA = rs02.getDouble("AMOUNT_TACA");
                    objRtn.AVG_TACA = rs02.getDouble("AVG_TACA");
                    objRtn.VAR_TACA = rs02.getDouble("VAR_TACA");
                    
                    // Asignar los totales al objeto de retorno
                    objRtn.TOTAL_AMOUNT_TACA = TOTAL_AMOUNT_TACA;
                    objRtn.TOTAL_AVG_TACA = TOTAL_AVG_TACA;
                    objRtn.TOTAL_VAR_TACA = TOTAL_VAR_TACA;

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
            // Cerrar recursos en orden inverso
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00698DETALLE_V_SEBAS(?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?)}";

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
    
    
    public List<SQP04091Filter> searchLog(SQP04091Filter filter) throws SQLException, Exception {
    List<SQP04091Filter> resultList = new ArrayList<>();
    String procedureCall = "{CALL PRAXISMP.MPS231(?,?,?,?,?,?,?,?,?)}";

    try (
        Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        CallableStatement cstmt = cnx.prepareCall(procedureCall)
    ) {
        // Input
        cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
        cstmt.setString(2, filter.IN_PROCESSOR);
        cstmt.setString(3, filter.IN_STATE);
        cstmt.setString(4, filter.IN_FECHA_FROM);
        cstmt.setString(5, filter.IN_FECHA_TO);

        // Output
        cstmt.setInt(6, filter.page.PAGNUM);
        cstmt.setInt(7, filter.page.PAGROW);
        cstmt.setInt(8, filter.page.TOTPAG);
        cstmt.setInt(9, filter.page.TOTROW);

        // Register OUT
        cstmt.registerOutParameter(6, Types.INTEGER);
        cstmt.registerOutParameter(7, Types.INTEGER);
        cstmt.registerOutParameter(8, Types.INTEGER);
        cstmt.registerOutParameter(9, Types.INTEGER);

        boolean hasResults = cstmt.execute();

        if (hasResults) {
            try (ResultSet rst = cstmt.getResultSet()) {
                while (rst.next()) {
                    SQP04091Filter bean = new SQP04091Filter();
                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.FECRFILE = rst.getString("FECRFILE").trim();
                    bean.CODEPROC = rst.getString("NOMCOD").trim();
                    bean.SEQ = rst.getString("SEQ").trim();
                    bean.STATP = rst.getString("STATP").trim();
                    bean.MENSA = rst.getString("MENSA").trim();
                    bean.NAMEPROC = rst.getString("NAMEPROC").trim();
                    bean.HOSEND = rst.getString("HOSEND").trim();
                    bean.USCR = rst.getString("USCR").trim();
                    bean.FECR = rst.getString("FECR").trim();
                    bean.HOCR = rst.getString("HOCR").trim();
                    bean.HOFIN = rst.getString("HOFIN").trim();
                    bean.FERECV = rst.getString("FERECV").trim();
                    bean.HORECV = rst.getString("HORECV").trim();

                    bean.page.PAGNUM = cstmt.getInt(6);
                    bean.page.PAGROW = cstmt.getInt(7);
                    bean.page.TOTPAG = cstmt.getInt(8);
                    bean.page.TOTROW = cstmt.getInt(9);
                    resultList.add(bean);
                }
            }
        }

    } catch (SQLException e) {
        logError.error("SQL Exception in searchLog: " + e.getMessage(), e);
        throw e;
    }

    return resultList;
}
     public String updateLOG(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA MPF131.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        try {
            A2290Filter filter = filters.get(0);
            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQPUPDLOG(?,?,?,?,?,?,?,?,?,?,?)}";
            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, "U");
                cstmt2.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(3, filterC.MENSA.trim());
                cstmt2.setString(4, filterC.FECRFILE.trim());
                cstmt2.setString(5, filterC.CODEPROCESS .trim());
                cstmt2.setString(6, filterC.STATP .trim());
                cstmt2.setString(7, filterC.HOSEND .trim());
                cstmt2.setString(8, filterC.FECR  .trim());
                cstmt2.setString(9, filterC.HOCR  .trim());
                cstmt2.setString(10, filterC.FERECV  .trim());
                cstmt2.setString(11, filterC.HORECV  .trim());

                cstmt2.execute();
                cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    cstmt2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return strMsj;
    }    

    

    
}
