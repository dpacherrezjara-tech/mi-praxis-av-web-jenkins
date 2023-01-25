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
import net.miatech.beans.PX173S01A1839Filter;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00806Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class GSAIncentiveGSACountryDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public GSAIncentiveGSACountryDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public GSAIncentiveGSACountryDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
     public List<PX173S01A1839Filter> loadPX173S01A1839(PX173S01A1839Filter filter) throws SQLException, Exception {
        List<PX173S01A1839Filter> lstRtn = new ArrayList<PX173S01A1839Filter>(0);
        PX173S01A1839Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX173S01A1839(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_TFILTER);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_GSA);
            cstmt01.setString(4, filter.IN_AREA);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX173S01A1839Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1839CCUST = rs01.getString("A1839CCUST");
                objRtn.A1839GSA = rs01.getString("A1839GSA");
                objRtn.A1839AREA = rs01.getString("A1839AREA");
                objRtn.A1839PAIS = rs01.getString("A1839PAIS");
                objRtn.A1839DPAIS = rs01.getString("A1839DPAIS");
                objRtn.A1839IATA = rs01.getString("A1839IATA");
                objRtn.A1839MLOC = rs01.getString("A1839MLOC");
                objRtn.A1839MPAG = rs01.getString("A1839MPAG");
                objRtn.A1839RSOC = rs01.getString("A1839RSOC");
                objRtn.A1839CONT = rs01.getString("A1839CONT");
                objRtn.A1839EMAIL = rs01.getString("A1839EMAIL");
                objRtn.A1839REGIS = rs01.getString("A1839REGIS");
                objRtn.A1839FREGI = rs01.getString("A1839FREGI");
                objRtn.A1839HREGI = rs01.getString("A1839HREGI");
                objRtn.A1839REVIS = rs01.getString("A1839REVIS");
                objRtn.A1839FREVI = rs01.getString("A1839FREVI");
                objRtn.A1839HREVI = rs01.getString("A1839HREVI");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

  
}
