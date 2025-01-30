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
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.payments.LoadSalesConciliationDAO.pasarGarbageCollector;
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
public class OutputsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public OutputsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public OutputsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2353Filter> loadPX285SQP05106(A2353Filter filter) throws SQLException, Exception {

        List<A2353Filter> lstData = new ArrayList<A2353Filter>(0);
        A2353Filter beanTkt;
        
        A2353Filter objRtn = new A2353Filter();
        objRtn.CODE = "";
        objRtn.NAME = "All";
        lstData.add(objRtn);
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05106CORES(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2353Filter();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("NAME").trim();

                lstData.add(beanTkt);
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
    
    public List<A2353Filter> loadPX285SQP05104(A2353Filter filter) throws SQLException, Exception {

        List<A2353Filter> lstData = new ArrayList<A2353Filter>(0);
        A2353Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05104(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST.trim());
            cstmt.setString(2, filter.IN_FILE.trim());
            cstmt.setString(3, filter.IN_PRDA.trim());
            cstmt.setString(4, filter.IN_DATE.trim());
            cstmt.setString(5, filter.IN_CORE.trim());
            cstmt.setString(6, filter.IN_FUENTE.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A2353Filter();
                bean.DDATA = rst.getString("DDATA").trim();
                bean.DATEC = rst.getString("DATEC").trim();
                bean.TRANC = rst.getString("TRANC").trim();
                bean.COREP = rst.getString("COREP").trim();
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
    
    public List<A2353Filter> loadPX285SQP05105(A2353Filter filter) throws SQLException, Exception {

        List<A2353Filter> lstData = new ArrayList<A2353Filter>(0);
        A2353Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05105_V1(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST.trim());
            cstmt.setString(2, filter.IN_FILE.trim());
            cstmt.setString(3, filter.IN_PRDA.trim());
            cstmt.setString(4, filter.IN_DATE.trim());
            cstmt.setString(5, filter.IN_CORE.trim());
            cstmt.setString(6, filter.IN_FUENTE.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A2353Filter();
                bean.TRAMA = rst.getString("TRAMA").trim();
                bean.COREP = rst.getString("COREP").trim();
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
    
    public A2353Filter SQP05105_UPDATE(A2353Filter filter, UserView user) throws SQLException, Exception {

        String strMsj = "Operation was successful.";
        A2353Filter objRtn = new A2353Filter();
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05105_UPDATE(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST.trim());
            cstmt.setString(2, filter.IN_FILE.trim());
            cstmt.setString(3, filter.IN_PRDA.trim());
            cstmt.setString(4, filter.IN_DATE.trim());
            cstmt.setString(5, filter.IN_CORE.trim());
            cstmt.setString(6, filter.IN_FUENTE.trim());
            cstmt.setString(7, filter.IN_LDATE.trim());
            cstmt.execute();

            
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
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
        objRtn.MESSAGE = strMsj;
        return objRtn;
    }

}
