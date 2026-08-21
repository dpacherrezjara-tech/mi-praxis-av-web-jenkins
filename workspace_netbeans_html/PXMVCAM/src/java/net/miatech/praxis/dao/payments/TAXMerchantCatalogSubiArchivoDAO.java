/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Set;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.TAXMerchantCatalogRow;
import org.apache.log4j.Logger;

/**
 * CSR 1715 - Creacion y actualizacion masiva catalogo TAX.
 *
 * Llama a PRAXISMP.MPS262 (version parametrizada de MPS276 dedicada a la
 * carga masiva) para: obtener las llaves ya existentes en MPF154 (modo 'K',
 * usado tanto en /validateExcel como, de nuevo, en /processExcel para evitar
 * condiciones de carrera) y para insertar/actualizar cada fila (modos 'C'/'U').
 */
public class TAXMerchantCatalogSubiArchivoDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public TAXMerchantCatalogSubiArchivoDAO() {
    }

    public TAXMerchantCatalogSubiArchivoDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    private static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public static String buildKey(String proceso, String merchant, String saleAgent, String processor, String code) {
        return proceso.trim() + "|" + merchant.trim() + "|" + saleAgent.trim() + "|" + processor.trim() + "|" + code.trim();
    }

    /**
     * Llaves (PROCESO+MERCHANT+SALE_AGENT+PROCESSOR+CODE) que ya existen hoy
     * en PRAXISMP.MPF154 -- se usa para decidir, fila por fila, si corresponde
     * un alta o una actualizacion, sin hacer una consulta por fila.
     */
    public Set<String> loadExistingKeys() throws SQLException, Exception {
        Set<String> keys = new HashSet<String>();
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;
        String SQLCLL01 = "{CALL PRAXISMP.MPS262(" + placeholders() + ")}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            bindEmptyRow(cstmt, "K");
            cstmt.execute();
            rst = cstmt.getResultSet();
            while (rst.next()) {
                keys.add(buildKey(
                        rst.getString("PROCESO"),
                        rst.getString("MERCHANT"),
                        rst.getString("SALE_AGENT"),
                        rst.getString("PROCESSOR"),
                        rst.getString("CODE")));
            }
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
        return keys;
    }

    public String insertRow(TAXMerchantCatalogRow row) throws SQLException, Exception {
        return maintenance(row, "C");
    }

    public String updateRow(TAXMerchantCatalogRow row) throws SQLException, Exception {
        return maintenance(row, "U");
    }

    private String maintenance(TAXMerchantCatalogRow row, String option) throws SQLException, Exception {
        String strMsj = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;
        String SQLCLL01 = "{CALL PRAXISMP.MPS262(" + placeholders() + ")}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            bindRow(cstmt, row, option);
            cstmt.execute();
            rst = cstmt.getResultSet();
            if (rst != null && rst.next()) {
                strMsj = rst.getString("MENSAJE");
            }
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
        return strMsj;
    }

    private static String placeholders() {
        return "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?";
    }

    private void bindEmptyRow(CallableStatement cstmt, String type) throws SQLException, Exception {
        TAXMerchantCatalogRow empty = new TAXMerchantCatalogRow();
        bindRow(cstmt, empty, type);
    }

    private void bindRow(CallableStatement cstmt, TAXMerchantCatalogRow row, String type) throws SQLException, Exception {
        cstmt.setString(1, type);
        cstmt.setString(2, row.PROCESO);
        cstmt.setString(3, row.MERCHANT);
        cstmt.setString(4, row.SALE_AGENT);
        cstmt.setString(5, row.CODE);
        cstmt.setString(6, row.PROCESSOR);
        cstmt.setString(7, row.SOCIETY);
        cstmt.setString(8, row.CURRENCY);
        cstmt.setString(9, row.SALE_PROFIT);
        cstmt.setString(10, row.COUNTRY);
        cstmt.setString(11, row.STATEMENT_PROFIT);
        cstmt.setString(12, row.COST_CENTER);
        cstmt.setString(13, row.ACQUIRER);
        cstmt.setString(14, row.CHANNEL);
        cstmt.setString(15, row.COMPANY);
        cstmt.setString(16, row.BANK_CURRENCY);
        cstmt.setString(17, row.BANK_PROFIT);
        cstmt.setString(18, row.NIT_CODE);
        cstmt.setString(19, row.NIT_DESCRIPTION);
        cstmt.setString(20, row.ACCOUNT);
        cstmt.setString(21, row.TYPE_CB);
        cstmt.setString(22, row.TYPE_MEMOLINE);
        cstmt.setString(23, row.MEMOLINE);
        cstmt.setString(24, row.REFKEY1);
        cstmt.setString(25, row.REFKEY3);
        cstmt.setString(26, session.getUserView().getUserInfo().USR);
    }
}
