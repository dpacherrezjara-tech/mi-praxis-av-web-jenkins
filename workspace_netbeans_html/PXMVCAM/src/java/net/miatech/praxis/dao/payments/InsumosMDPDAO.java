/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import net.miatech.praxis.dao.interline.*;
import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.payments.TableMessageDAO.pasarGarbageCollector;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class InsumosMDPDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InsumosMDPDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InsumosMDPDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2353Filter> loadPX633MPS010(A2353Filter filter) throws SQLException, Exception {

        List<A2353Filter> lstData = new ArrayList<A2353Filter>(0);
        A2353Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS010(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_APLIC.trim());
            cstmt.setString(3, filter.IN_INPNAME.trim());
            cstmt.setString(4, filter.IN_OUTNAME.trim());
            cstmt.setString(5, filter.IN_TABLA.trim());

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A2353Filter();
                bean.RN = rst.getLong("RN");
                bean.APLIC = rst.getString("APLIC").trim();
                bean.INPNAME = rst.getString("INPNAME").trim();
                bean.OUTNAME = rst.getString("OUTNAME").trim();
                bean.TABLA = rst.getString("TABLA").trim();
                bean.SEQNUM = rst.getString("SEQNUM").trim();
                bean.INPDESC = rst.getString("INPDESC").trim();
                bean.LIBNAME = rst.getString("LIBNAME").trim();
                bean.INPTYPE = rst.getString("INPTYPE").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
            }
            rst.close();

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
    
    public A2353Filter loadPX633MPS011(A2353Filter filter) throws SQLException, Exception {

        A2353Filter objRtn = new A2353Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS011(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.APLIC.trim());
            cstmt01.setString(3, filter.INPNAME.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.APLIC = rs01.getString("APLIC").trim();
                objRtn.SEQNUM = rs01.getString("SEQNUM").trim();
                objRtn.DENV = rs01.getString("DENV").trim();
                objRtn.INPNAME = rs01.getString("INPNAME").trim();
                objRtn.NETDIR = rs01.getString("NETDIR").trim();
                objRtn.INPEXTE = rs01.getString("INPEXTE").trim();
                objRtn.INPDESC = rs01.getString("INPDESC").trim();
                objRtn.INPTYPE = rs01.getString("INPTYPE").trim();
                objRtn.LIBNAME = rs01.getString("LIBNAME").trim();
                objRtn.OUTNAME = rs01.getString("OUTNAME").trim();
                objRtn.FECPROC = rs01.getString("FECPROC").trim();
                objRtn.STAT = rs01.getString("STAT").trim();
                objRtn.TABLA = rs01.getString("TABLA").trim();
                objRtn.QTYREG = rs01.getInt("QTYREG");
                objRtn.FASE = rs01.getString("FASE").trim();

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

                //lstRtn.add(objRtn);
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

        return objRtn;
    }
    
    public String loadPX633MPS012(A2353Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2284.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS012(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; // LLAMA AL PROCEDURE

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.APLIC.trim());
            cstmt.setString(4, filter.INPNAME.trim());
            cstmt.setString(5, filter.TABLA.trim());
            cstmt.setString(6, filter.NETDIR.trim());
            cstmt.setString(7, filter.INPDESC.trim());
            cstmt.setString(8, filter.STAT.trim());
            cstmt.setString(9, filter.INPEXTE.trim());
            cstmt.setString(10, filter.OUTNAME.trim());
            cstmt.setString(11, filter.FASE.trim());
            cstmt.setString(12, filter.INPTYPE.trim());
            cstmt.setString(13, filter.FECPROC.trim());
            cstmt.setString(14, filter.DENV.trim());
            cstmt.setInt(15, filter.QTYREG);
            cstmt.setString(16, filter.LIBNAME.trim());
            cstmt.setString(17, filter.SEQNUM.trim());

            cstmt.setString(18, session.getUserView().getUserInfo().USR);
            cstmt.setString(19, Functions.getFechaActual());
            cstmt.setString(20, Functions.getHoraActual());
            cstmt.execute(); // se ejcuta

        } catch (Exception e) {
            //e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
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
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;
    }
}
