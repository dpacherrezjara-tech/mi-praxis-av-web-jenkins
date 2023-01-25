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
import net.miatech.beans.SQP04091Filter;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class AccountingControlAuditDAO {
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

    public List<SQP04091Filter> getSQP04091Filter(SQP04091Filter filter) throws SQLException, Exception {
        List<SQP04091Filter> lstRtn = new ArrayList<SQP04091Filter>(0);
        SQP04091Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP04091(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);                      
            cstmt01.setString(5, filter.IN_MODULO);
            cstmt01.setString(6, filter.IN_TIPOM);
            cstmt01.setString(7, filter.IN_STATO);
            cstmt01.setString(8, filter.IN_STAT1);
            cstmt01.setString(9, filter.IN_STAT2);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);
            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04091Filter();                 
                objRtn.A4022AIRLI = rs01.getString("A4022AIRLI");
                objRtn.A4022MODUL = rs01.getString("A4022MODUL");
                objRtn.A4022TIPOM = rs01.getString("A4022TIPOM");                
                objRtn.A4022STAT = rs01.getString("A4022STAT");
                objRtn.A4022FPROC = rs01.getString("A4022FPROC");
                objRtn.A4022FCONT = rs01.getString("A4022FCONT");
                objRtn.A4022CORRL = rs01.getInt("A4022CORRL");
                objRtn.A4022PROGR = rs01.getString("A4022PROGR");
                objRtn.A4022DESCR = rs01.getString("A4022DESCR").trim();
                objRtn.A4022FFILE = rs01.getString("A4022FFILE");
                //objRtn.A4022NARCH = rs01.getString("A4022NARCH").trim();
                objRtn.A4022QTYAF = rs01.getInt("A4022QTYAF");                
                objRtn.A4022CARGO = rs01.getDouble("A4022CARGO");
                objRtn.A4022ABONO = rs01.getDouble("A4022ABONO");
                objRtn.A4022MDA = rs01.getString("A4022MDA");
                objRtn.A4022STSAF = rs01.getString("A4022STSAF");
                objRtn.A4022USAF = rs01.getString("A4022USAF");                
                objRtn.A4022FISAF = rs01.getString("A4022FISAF");                
                objRtn.A4022HISAF = rs01.getString("A4022HISAF");
                objRtn.A4022STSDB = rs01.getString("A4022STSDB");
                objRtn.A4022SEDB = rs01.getString("A4022SEDB");                
                objRtn.A4022FISDB = rs01.getString("A4022FISDB");
                objRtn.A4022HISDB = rs01.getString("A4022HISDB");
                
                objRtn.A4022USUAR = rs01.getString("A4022USUAR");
                objRtn.A4022FECIN = rs01.getString("A4022FECIN");
                objRtn.A4022HORIN = rs01.getString("A4022HORIN");
                objRtn.A4022REVIS = rs01.getString("A4022REVIS");
                objRtn.A4022FREVI = rs01.getString("A4022FREVI");
                objRtn.A4022HREVI = rs01.getString("A4022HREVI");
                
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
}
