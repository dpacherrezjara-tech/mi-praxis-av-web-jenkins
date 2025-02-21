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
        List<SQP04091Filter> lstRtn = new ArrayList<SQP04091Filter>(0);
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXISMP.LIST_ACCOUNTING_INTERFACES(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_EXTRACTION_DATE);
            cstmt01.setString(3, filter.IN_INTERFACE);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            
            double TOTAL_LIQ = 0;
            double TOTAL_COMISION = 0;
            double TOTAL_RTEFUE = 0;
            double TOTAL_RTEIVA = 0;
            double TOTAL_RTEICA = 0;
            double TOTAL_NETO = 0;
            double TOTAL_LIQ_IMPORTE = 0;
            double TOTAL_TAX_IMPORTE = 0;
            
            while (rs01.next()) {
                objRtn = new SQP04091Filter();                 
                objRtn.IDCONT = rs01.getString("IDCONT");
                objRtn.INTERFACE = rs01.getString("INTERFACE");
                objRtn.BANDOC = rs01.getString("BANDOC");                
                objRtn.PROCESADOR = rs01.getString("PROCESADOR");
                objRtn.REFERENCIA = rs01.getString("REFERENCIA");
                objRtn.FECHA_EXTRACION = rs01.getString("FECHA_EXTRACION");
                objRtn.MONEDA_LIQ = rs01.getString("MONEDA_LIQ");
                objRtn.VALOR_LIQ = rs01.getDouble("VALOR_LIQ");
                objRtn.COMISION = rs01.getDouble("COMISION");
                objRtn.RTEFUE = rs01.getDouble("RTEFUE");
                objRtn.RTEIVA = rs01.getDouble("RTEIVA");
                objRtn.RTEICA = rs01.getDouble("RTEICA");
                objRtn.NETO = rs01.getDouble("NETO");
                objRtn.MONEDA_PAGO = rs01.getString("MONEDA_PAGO");
                objRtn.LIQ_IMPORTE_PAG = rs01.getDouble("LIQ_IMPORTE_PAG");
                objRtn.TAX_IMPORTE_PAG = rs01.getDouble("TAX_IMPORTE_PAG");
                
                TOTAL_LIQ += rs01.getDouble("VALOR_LIQ");
                TOTAL_COMISION += rs01.getDouble("COMISION");
                TOTAL_RTEFUE += rs01.getDouble("RTEFUE");
                TOTAL_RTEIVA += rs01.getDouble("RTEIVA");
                TOTAL_RTEICA += rs01.getDouble("RTEICA");
                TOTAL_NETO += rs01.getDouble("NETO");
                TOTAL_LIQ_IMPORTE += rs01.getDouble("LIQ_IMPORTE_PAG");
                TOTAL_TAX_IMPORTE += rs01.getDouble("TAX_IMPORTE_PAG");
                
                objRtn.TOTAL_LIQ = TOTAL_LIQ;
                objRtn.TOTAL_COMISION = TOTAL_COMISION;
                objRtn.TOTAL_RTEFUE = TOTAL_RTEFUE;
                objRtn.TOTAL_RTEIVA = TOTAL_RTEIVA;
                objRtn.TOTAL_RTEICA = TOTAL_RTEICA;
                objRtn.TOTAL_NETO = TOTAL_NETO;
                objRtn.TOTAL_LIQ_IMPORTE = TOTAL_LIQ_IMPORTE;
                objRtn.TOTAL_TAX_IMPORTE = TOTAL_TAX_IMPORTE;
                
                lstRtn.add(objRtn);

            }
        } catch (Exception e) {
            e.printStackTrace();
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
    
}
