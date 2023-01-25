/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import net.miatech.praxis.dao.payments.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.flown.filter.A729Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jsolano
 */
public class FlownInterlineDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public FlownInterlineDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FlownInterlineDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A729Filter> loadPX613SQP04692(A729Filter filter) throws SQLException, Exception {

        List<A729Filter> lstData = new ArrayList<A729Filter>(0);
        A729Filter bean;
        long totA729VALTAX = 0;
                
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04692(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totA729VALTAX = rst.getLong("A729VALTAX");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new A729Filter();
                    bean.TKT = rst.getString("TKT");
                    bean.A729CUPON = rst.getString("A729CUPON").trim();
                    bean.A729VALTAX = rst.getDouble("A729VALTAX");
                    bean.A729MONEDA = rst.getString("A729MONEDA").trim();
                    bean.A729FCAMBI = rst.getString("A729FCAMBI").trim();
                    bean.A729FREGIS = rst.getString("A729FREGIS").trim();
                    
                    bean.totA729VALTAX = totA729VALTAX;
//                if (rst.getString("A729FREGIS").trim().equals("I")) {
//                    bean.A729FREGIS = "Implemented";
//                } else if (rst.getString("A729FREGIS").trim().equals("P")) {
//                    bean.A729FREGIS = "In Progress";
//                } else {
//                    bean.A729FREGIS = "Pending";
//                }

                    lstData.add(bean);
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

//    public String loadPX267SQP00672(A729Filter filter, String option) throws SQLException, Exception  {
//        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
//        String strMsj = "Operation was successful.";
//
//        CallableStatement cstmt = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00672(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//            cstmt.setString(1, option);
//            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
//            cstmt.setString(3, filter.COUNTRY.trim());
//            cstmt.setString(4, filter.CURRENC.trim());
//            cstmt.setString(5, filter.CODEBANK.trim());
//            cstmt.setString(6, filter.NAMEBANK.trim());
//            cstmt.setString(7, filter.FSTAT.trim());
//            cstmt.setString(8, filter.FINSUMO.trim());
//            cstmt.setDouble(9, filter.RATECON);
//            cstmt.setDouble(10, filter.RATECOP1);
//            cstmt.setDouble(11, filter.RATECOP2);
//            cstmt.setDouble(12, filter.RATEIVA);
//            cstmt.setString(13, filter.CLIENTE.trim());
//            cstmt.setString(14, filter.CODBANKN.trim());
//            cstmt.setInt(15, filter.DOCNUM);
//            cstmt.setString(16, session.getUserView().getUserInfo().USR);
//            cstmt.setString(17, Functions.getFechaActual());
//            cstmt.setString(18, Functions.getHoraActual());
//            cstmt.execute();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            strMsj = e.getMessage();
//        } finally {
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return strMsj;
//
//    }
//
//    public A729Filter loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {
//
//        A729Filter objRtn = new A729Filter();
//        CallableStatement cstmt01 = null;
//        ResultSet rs01 = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00673(?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt01 = cnx.prepareCall(SQLCLL01);
//
//            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt01.setString(2, filter.CODEBANK.trim());
//            cstmt01.setString(3, filter.COUNTRY.trim());
//            cstmt01.setString(4, filter.CURRENC.trim());
//
//            cstmt01.execute();
//
//            rs01 = cstmt01.getResultSet();
//            while (rs01.next()) {
//                objRtn.CCUST = rs01.getString("CCUST");
//                objRtn.COUNTRY = rs01.getString("COUNTRY").trim();
//                objRtn.CURRENC = rs01.getString("CURRENC").trim();
//                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
//                objRtn.NAMEBANK = rs01.getString("NAMEBANK").trim();
//                objRtn.FSTAT = rs01.getString("FSTAT").trim();
//                objRtn.FINSUMO = rs01.getString("FINSUMO").trim();
//                objRtn.CLIENTE = rs01.getString("CLIENTE").trim();
//                objRtn.RATECON = rs01.getDouble("RATECON");
//                objRtn.RATECOP1 = rs01.getDouble("RATECOP1");
//                objRtn.RATECOP2 = rs01.getDouble("RATECOP2");
//                objRtn.RATEIVA = rs01.getDouble("RATEIVA");
//                objRtn.CODBANKN = rs01.getString("CODBANKN");
//                objRtn.DOCNUM = rs01.getInt("DOCNUM");
//
//                objRtn.USCR = rs01.getString("USCR");
//                objRtn.FECR = rs01.getString("FECR");
//                objRtn.HOCR = rs01.getString("HOCR");
//                objRtn.USUP = rs01.getString("USUP");
//                objRtn.FEUP = rs01.getString("FEUP");
//                objRtn.HOUP = rs01.getString("HOUP");
//
//                //lstRtn.add(objRtn);
//            }
//        } catch (Exception e) {
//            e.getMessage();
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
//        return objRtn;
//    }
}
