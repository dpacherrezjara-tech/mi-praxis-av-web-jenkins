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
import net.miatech.beans.A1806Filter;
import net.miatech.beans.PX019S01A025Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingSupplierDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingSupplierDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingSupplierDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1806Filter> loadPX155S01A1806(A1806Filter filter) throws SQLException, Exception {
        List<A1806Filter> lstRtn = new ArrayList<>(0);
        A1806Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Connection cnx = null;
        try {
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX155S01A1806(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1806CCUST.trim());
            cstmt01.setString(2, filter.IN_A1806TIPOC.trim());
            cstmt01.setString(3, filter.IN_A1806NUM.trim());

            cstmt01.setInt(4, PAGINIT);
            cstmt01.setInt(5, totRowsPag);
            cstmt01.setInt(6, totRows);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(7)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(8);
                    int total = (int) (totRows / 20);
                    int resto = (totRows % 20);

                    if (resto > 0) {
                        totPAGS = total + 1;
                    } else {
                        totPAGS = total;
                    }

                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            filter.page.TOTPAG = totPAGS;

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A1806Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1806CCUST = rs01.getString("A1806CCUST").trim();
                objRtn.A1806TIPOC = rs01.getString("A1806TIPOC").trim();
                objRtn.A1806PROVE = rs01.getString("A1806PROVE").trim();
                objRtn.A1806NUM = rs01.getString("A1806NUM");
                objRtn.A1806REFE = rs01.getString("A1806REFE");
                objRtn.A1806CIA = rs01.getString("A1806CIA");
                objRtn.A1806UNIDA = rs01.getString("A1806UNIDA");
                objRtn.A1806CENCO = rs01.getString("A1806CENCO");
                objRtn.A1806UBICA = rs01.getString("A1806UBICA");
                objRtn.A1806CUENT = rs01.getString("A1806CUENT");
                objRtn.A1806SUBCT = rs01.getString("A1806SUBCT");
                objRtn.A1806EQUI = rs01.getString("A1806EQUI");
                objRtn.A1806INCIA = rs01.getString("A1806INCIA");
                objRtn.A1806FINI = rs01.getString("A1806FINI");
                objRtn.A1806FFIN = rs01.getString("A1806FFIN");
                objRtn.A1806REGIS = rs01.getString("A1806REGIS");
                objRtn.A1806FREGI = Functions.getMonthConvertDate(rs01.getString("A1806FREGI"));
                objRtn.A1806HREGI = Functions.ConvertedTime(rs01.getString("A1806HREGI"));
                objRtn.A1806REGVI = rs01.getString("A1806REGVI");
                objRtn.A1806FREVI = Functions.getMonthConvertDate(rs01.getString("A1806FREVI"));
                objRtn.A1806HREVI = Functions.ConvertedTime(rs01.getString("A1806HREVI"));

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
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
    
     public String accountSupplierMaintance(A1806Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        Connection cnx = null;
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".PX155S07A1806(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);   
            cs.setString(1, strOption);
            cs.setString(2, filter.A1806CCUST);
            cs.setString(3, filter.A1806TIPOC);
            cs.setString(4, filter.A1806PROVE);
            cs.setString(5, filter.A1806NUM);
            cs.setString(6, filter.A1806REFE);
            cs.setString(7, filter.A1806CIA);
            cs.setString(8, filter.A1806UNIDA);
            
            cs.setString(9, filter.A1806CENCO);
            cs.setString(10, filter.A1806UBICA);
            cs.setString(11, filter.A1806CUENT);
            cs.setString(12, filter.A1806SUBCT);
            cs.setString(13, filter.A1806EQUI);
            cs.setString(14, filter.A1806INCIA);
            cs.setString(15, filter.A1806FINI);
            cs.setString(16, filter.A1806FFIN);
            
            cs.setString(17, session.getUserView().getUserInfo().USR);
            cs.setString(18, Functions.getFechaActual());
            cs.setString(19, Functions.getHoraActual());
            cs.setString(20, filter.IN_A1806TIPOC_OLD);
            cs.setString(21, filter.IN_A1806NUM_OLD);
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }

}
