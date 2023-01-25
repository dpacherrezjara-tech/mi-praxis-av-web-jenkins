/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.dao.tnu;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1544Filter;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class AtlUsageNoSaleDAO {
    
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AtlUsageNoSaleDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AtlUsageNoSaleDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    public List<A1544Filter> loadPX224S01A1544(A1544Filter filter) throws Exception {
        List<A1544Filter> lstRtn = new ArrayList<A1544Filter>(0);
        A1544Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;        
        String SQLCLL01 = "{CALL PX224S01A1544(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST );
            cstmt01.setString(2, filter.VP_FILTRO);
            cstmt01.setString(3, filter.VP_TICKET);
            cstmt01.setString(4, filter.VP_FECHA1);
            cstmt01.setString(5, filter.VP_FECHA2);
            cstmt01.setString(6, filter.VP_IATA);
            cstmt01.setString(7, filter.VP_TRXN);
            cstmt01.setString(8, filter.VP_ESTA);
            
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1544Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1544FUENT = rs01.getString("A1544FUENT").trim();
                objRtn.A1544IATA = rs01.getString("A1544IATA").trim();
                objRtn.A1544SABRE = rs01.getString("A1544SABRE").trim();
                objRtn.A1544AGENT = rs01.getString("A1544AGENT").trim();
                objRtn.A1544TUSO = rs01.getString("A1544TUSO").trim();
                objRtn.A1544FUSO = rs01.getString("A1544FUSO").trim();
                objRtn.A1544CIA = rs01.getString("A1544CIA").trim();
                objRtn.A1544FORMA = rs01.getString("A1544FORMA").trim();
                objRtn.A1544SERIE = rs01.getString("A1544SERIE").trim();
                objRtn.A1544CUPON = rs01.getString("A1544CUPON").trim();
                objRtn.A1544DESDE = rs01.getString("A1544DESDE").trim();
                objRtn.A1544HACIA = rs01.getString("A1544HACIA").trim();
                objRtn.A1544NVUSO = rs01.getString("A1544NVUSO").trim();                
                objRtn.A1544TRUSO = rs01.getString("A1544TRUSO").trim();
                objRtn.A1544TARIF = rs01.getDouble("A1544TARIF");
                objRtn.A1544MDATF = rs01.getString("A1544MDATF").trim();
                objRtn.A1544FVENT = rs01.getString("A1544FVENT").trim();                
                objRtn.A1544DIAST = rs01.getInt("A1544DIAST");
                objRtn.A1544TARF1 = rs01.getDouble("A1544TARF1");
                objRtn.A1544TARF2 = rs01.getDouble("A1544TARF2");
                objRtn.A1544TARF3 = rs01.getDouble("A1544TARF3");
                objRtn.A1544EXCHR = rs01.getString("A1544EXCHR").trim();                
                objRtn.A1544TICKT = rs01.getString("A1544TICKT").trim();
                objRtn.A1544FCONT = rs01.getString("A1544FCONT").trim();
                objRtn.A1544FBAS = rs01.getString("A1544FBAS").trim();
                                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
//    public List<A1544Filter> loadPX224S01A1544(A1544Filter filter) throws Exception {
//        List<A1544Filter> lstRtn = new ArrayList<A1544Filter>(0);
//        A1544Filter objRtn;
//        CallableStatement cstmt01 = null;
//        ResultSet rs01 = null;
//        String SQLCLL01 = "{CALL PX224S01A1544(?,?,?,?,?)}";
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt01 = cnx.prepareCall(SQLCLL01);
//
//            cstmt01.registerOutParameter(2, Types.INTEGER);
//            cstmt01.registerOutParameter(3, Types.INTEGER);
//            cstmt01.registerOutParameter(4, Types.INTEGER);
//            cstmt01.registerOutParameter(5, Types.INTEGER);
//            
//            cstmt01.setString(1, filter.VP_TICKET);
//            cstmt01.setInt(2, filter.page.PAGE);
//            cstmt01.setInt(3, filter.page.LIMIT);
//            cstmt01.setInt(4, 0);//DEPRECATED
//            cstmt01.setInt(5, filter.page.TOTROWS);
//            /*
//            cstmt01.setInt(2, filter.page.PAGNUM);
//            cstmt01.setInt(3, filter.page.PAGROW);
//            cstmt01.setInt(4, filter.page.TOTPAG);
//            cstmt01.setInt(5, filter.page.TOTROW);
//            */
//            cstmt01.execute();
//            int TOTROWS = cstmt01.getInt(5);    
//            /*
//            filter.page.PAGNUM = cstmt01.getInt(2);
//            filter.page.PAGROW = cstmt01.getInt(3);
//            filter.page.TOTPAG = cstmt01.getInt(4);
//            filter.page.TOTROW = cstmt01.getInt(5);
//            */
//            rs01 = cstmt01.getResultSet();
//            int pos = 0;
//            while (rs01.next()) {
//                pos++;
//                objRtn = new A1544Filter();
//                objRtn.RN = rs01.getLong("RN");
//                objRtn.A1544FUENT = rs01.getString("A1544FUENT").trim();
//                objRtn.A1544IATA = rs01.getString("A1544IATA").trim();
//                objRtn.A1544SABRE = rs01.getString("A1544SABRE").trim();
//                objRtn.A1544AGENT = rs01.getString("A1544AGENT").trim();
//                objRtn.A1544TUSO = rs01.getString("A1544TUSO").trim();
//                objRtn.A1544FUSO = rs01.getString("A1544FUSO").trim();
//                objRtn.A1544CIA = rs01.getString("A1544CIA").trim();
//                objRtn.A1544FORMA = rs01.getString("A1544FORMA").trim();
//                objRtn.A1544SERIE = rs01.getString("A1544SERIE").trim();
//                objRtn.A1544CUPON = rs01.getString("A1544CUPON").trim();
//                objRtn.A1544DESDE = rs01.getString("A1544DESDE").trim();
//                objRtn.A1544HACIA = rs01.getString("A1544HACIA").trim();
//                objRtn.A1544NVUSO = rs01.getString("A1544NVUSO").trim();
//                objRtn.A1544TRUSO = rs01.getString("A1544TRUSO").trim();
//                objRtn.A1544TARIF = rs01.getDouble("A1544TARIF");
//                objRtn.A1544MDATF = rs01.getString("A1544MDATF").trim();
//                objRtn.A1544FVENT = rs01.getString("A1544FVENT").trim();
//                objRtn.A1544DIAST = rs01.getInt("A1544DIAST");
//                objRtn.A1544TARF1 = rs01.getDouble("A1544TARF1");
//                objRtn.A1544TARF2 = rs01.getDouble("A1544TARF2");
//                objRtn.A1544TARF3 = rs01.getDouble("A1544TARF3");
//                objRtn.A1544EXCHR = rs01.getString("A1544EXCHR").trim();
//                objRtn.A1544TICKT = rs01.getString("A1544TICKT").trim();
//                objRtn.page.TOTROWS = TOTROWS;
//                /*
//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
//                */
//                lstRtn.add(objRtn);
//            }
//        } catch (Exception ex) {
//            String err = ex.getMessage();
//        } finally {
//            if (rs01 != null) {
//                try {
//                    rs01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt01 != null) {
//                try {
//                    cstmt01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return lstRtn;
//    }
}
