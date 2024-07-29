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
 * @author jsolano
 */
public class StatementRulesDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public StatementRulesDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public StatementRulesDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
   
    public List<A2353Filter> loadPX285MPS102(A2353Filter filter) throws SQLException, Exception {

        List<A2353Filter> lstData = new ArrayList<A2353Filter>(0);
        A2353Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS102(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_COREP.trim());

            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A2353Filter();

                bean.RN = rst.getLong("RN");
                bean.COREP = rst.getString("COREP").trim();
                bean.ACCOUNT = rst.getString("ACCOUNT").trim();
                bean.SOCIETY = rst.getString("SOCIETY").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.TEXTOLAR = rst.getString("TEXTOLAR").trim();

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
    
    public A2353Filter loadPX285MPS103(A2353Filter filter) throws SQLException, Exception {

        A2353Filter objRtn = new A2353Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS103(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.COREP.trim());
            cstmt01.setString(3, filter.ACCOUNT.trim());
            cstmt01.setString(4, filter.SOCIETY.trim());
            cstmt01.setString(5, filter.SCOUNTRY.trim());
            cstmt01.setString(6, filter.SCURRENCY.trim());
            cstmt01.setString(7, filter.TEXTOLAR.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.COREP = rs01.getString("COREP").trim();
                objRtn.ACCOUNT = rs01.getString("ACCOUNT").trim();
                objRtn.SOCIETY = rs01.getString("SOCIETY").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.TEXTOLAR = rs01.getString("TEXTOLAR").trim();

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
    
    public String loadPX285MPS104(A2353Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2284.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS104(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.IN_COREP.trim());
            cstmt.setString(4, filter.IN_ACCOUNT.trim());
            cstmt.setString(5, filter.IN_SOCIETY.trim());
            cstmt.setString(6, filter.IN_SCOUNTRY.trim());
            cstmt.setString(7, filter.IN_SCURRENCY.trim());
            cstmt.setString(8, filter.IN_TEXTOLAR.trim());
            cstmt.setString(9, filter.IN_ACCOUNTNEW.trim());
            cstmt.setString(10, filter.IN_SOCIETYNEW.trim());
            cstmt.setString(11, filter.IN_SCOUNTRYNEW.trim());
            cstmt.setString(12, filter.IN_SCURRENCYNEW.trim());
            cstmt.setString(13, filter.IN_TEXTOLARNEW.trim());

            cstmt.setString(14, session.getUserView().getUserInfo().USR);
            cstmt.setString(15, Functions.getFechaActual());
            cstmt.setString(16, Functions.getHoraActual());
            cstmt.execute();

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
