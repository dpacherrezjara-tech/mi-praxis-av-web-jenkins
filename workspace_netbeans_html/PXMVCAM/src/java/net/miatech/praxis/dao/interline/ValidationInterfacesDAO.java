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
import java.util.List;
import net.miatech.beans.AccountingInterfacesResult;
import net.miatech.beans.SQP04091Filter;
import net.miatech.beans.spring.implement.IServerSession;
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
    

}
