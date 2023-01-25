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
import net.miatech.beans.A1819Filter;
import net.miatech.beans.PX019S01A025Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterCCAMDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingMasterCCAMDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingMasterCCAMDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1819Filter> loadPX160S01A1819(A1819Filter filter) throws SQLException, Exception {
        List<A1819Filter> lstRtn = new ArrayList<A1819Filter>(0);
        A1819Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Connection cnx = null;
        try {
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX160S01A1819(?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1819CCUST.trim());
            cstmt01.setString(2, filter.IN_A1819TIPO.trim());
            cstmt01.setString(3, filter.IN_A1819CLIEN.trim());
            cstmt01.setString(4, filter.IN_A1819MODO.trim());
            cstmt01.setString(5, filter.A1819TACC.trim());
            cstmt01.setString(6, filter.A1819NATU.trim());
            cstmt01.setString(7, filter.A1819CTA.trim());
            cstmt01.setString(8, filter.A1819SCTA.trim());

            cstmt01.setInt(9, PAGINIT);
            cstmt01.setInt(10, totRowsPag);
            cstmt01.setInt(11, totRows);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(11)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(12);
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
                objRtn = new A1819Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1819CCUST = rs01.getString("A1819CCUST").trim();
                objRtn.A1819TACC = rs01.getString("A1819TACC").trim();
                objRtn.A1819NATU = rs01.getString("A1819NATU").trim();
                objRtn.A1819DESCR = rs01.getString("A1819DESCR");
                objRtn.A1819CLIEN = rs01.getString("A1819CLIEN");
                objRtn.A1819DIREC = rs01.getString("A1819DIREC");
                objRtn.A1819TIPO = rs01.getString("A1819TIPO");
                objRtn.A1819MODO = rs01.getString("A1819MODO");
                objRtn.A1819CIA = rs01.getString("A1819CIA");
                objRtn.A1819UNID = rs01.getString("A1819UNID");
                objRtn.A1819CECO = rs01.getString("A1819CECO");
                objRtn.A1819UBI = rs01.getString("A1819UBI");
                objRtn.A1819CTA = rs01.getString("A1819CTA");
                objRtn.A1819SCTA = rs01.getString("A1819SCTA");
                objRtn.A1819EQUI = rs01.getString("A1819EQUI");
                objRtn.A1819ICIA = rs01.getString("A1819ICIA");
                objRtn.A1819FINI = rs01.getString("A1819FINI");
                objRtn.A1819FFIN = rs01.getString("A1819FFIN");

                objRtn.A1819REGIS = rs01.getString("A1819REGIS");
                objRtn.A1819FREGI = Functions.getMonthConvertDate(rs01.getString("A1819FREGI"));
                objRtn.A1819HREGI = Functions.ConvertedTime(rs01.getString("A1819HREGI"));
                objRtn.A1819REGVI = rs01.getString("A1819REGVI");
                objRtn.A1819FREVI = Functions.getMonthConvertDate(rs01.getString("A1819FREVI"));
                objRtn.A1819HREVI = Functions.ConvertedTime(rs01.getString("A1819HREVI"));

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
            session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
        public String accountADMMaintance(A1819Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        Connection cnx = null;
        
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".PX160S02A1819(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, filter.A1819CCUST);
            cs.setString(3, filter.A1819TACC);
            cs.setString(4, filter.A1819NATU);
            cs.setString(5, filter.A1819DESCR);
            cs.setString(6, filter.A1819CLIEN);
            cs.setString(7, filter.A1819DIREC);
            cs.setString(8, filter.A1819TIPO);
            cs.setString(9, filter.A1819MODO);
            cs.setString(10, filter.A1819CIA);
            cs.setString(11, filter.A1819UNID);
            cs.setString(12, filter.A1819CECO);
            cs.setString(13, filter.A1819UBI);
            cs.setString(14, filter.A1819CTA);
            cs.setString(15, filter.A1819SCTA);
            cs.setString(16, filter.A1819EQUI);
            cs.setString(17, filter.A1819ICIA);
            cs.setString(18, filter.A1819FINI);
            cs.setString(19, filter.A1819FFIN);
            cs.setString(20, session.getUserView().getUserInfo().USR);
            cs.setString(21, Functions.getFechaActual());
            cs.setString(22, Functions.getHoraActual());
            cs.setString(23, filter.IN_A1819TACC_OLD);
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
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }
}
