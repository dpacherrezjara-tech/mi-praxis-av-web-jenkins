/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2357Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class BankStatementTransactionDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public BankStatementTransactionDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BankStatementTransactionDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2357Filter> loadPX305SQP03124(A2357Filter filter) throws SQLException, Exception {

        List<A2357Filter> lstData = new ArrayList<>(0);
        A2357Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03124(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SCOUNTRY.trim());
            cstmt.setString(3, filter.IN_CODEBANK.trim());
            cstmt.setString(4, filter.IN_TTRAN.trim());
            cstmt.setString(5, filter.IN_CTRAN.trim());
            cstmt.setString(6, filter.IN_FECHA_TO.trim());//DESCEECC
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A2357Filter();
                bean.RN = rst.getInt("RN");

                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.CODEBANK = rst.getString("CODEBANK").trim();
                bean.TTRAN = rst.getString("TTRAN").trim();
                if (bean.TTRAN.equals("C")) {
                    bean.strTTRAN = "Debit";
                } else if (bean.TTRAN.equals("A")) {
                    bean.strTTRAN = "Credit";
                }

                bean.CTRAN = rst.getString("CTRAN").trim();
                bean.CODDES = rst.getString("CODDES").trim();
                bean.DESCEECC = rst.getString("DESCEECC").trim();
                bean.DESCRI = rst.getString("DESCRI").trim();

                bean.strSCOUNTRY = rst.getString("DES_COUNTRY").trim();
                bean.strCODEBANK = rst.getString("NAMEBANK").trim();
                bean.strCTRAN = rst.getString("DES_CTRAN").trim();

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

    public String loadPX305SQP03125(A2357Filter filter, String option) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2284.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03125(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.SCOUNTRY.trim());
            cstmt.setString(4, filter.CODEBANK.trim());
            cstmt.setString(5, filter.TTRAN.trim());
            cstmt.setString(6, filter.CTRAN.trim());
            cstmt.setString(7, filter.CODDES.trim());
            cstmt.setString(8, filter.DESCEECC.trim());
            cstmt.setString(9, filter.DESCRI.trim());
            cstmt.setString(10, session.getUserView().getUserInfo().USR);
            cstmt.setString(11, Functions.getFechaActual());
            cstmt.setString(12, Functions.getHoraActual());
            cstmt.execute();

        } catch (Exception e) {
            // e.printStackTrace();
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

    public A2357Filter loadPX305SQP03126(A2357Filter filter) throws SQLException, Exception {

        A2357Filter objRtn = new A2357Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03126(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            
            cstmt01.setString(2, filter.SCOUNTRY.trim());
            cstmt01.setString(3, filter.CODEBANK.trim());
            cstmt01.setString(4, filter.CTRAN.trim());
            cstmt01.setString(5, filter.CODDES.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                objRtn.TTRAN = rs01.getString("TTRAN").trim();
                objRtn.CTRAN = rs01.getString("CTRAN").trim();
                objRtn.CODDES = rs01.getString("CODDES").trim();
                objRtn.DESCEECC = rs01.getString("DESCEECC").trim();
                objRtn.DESCRI = rs01.getString("DESCRI").trim();
                objRtn.strSCOUNTRY = rs01.getString("DES_COUNTRY").trim();
                objRtn.strCODEBANK = rs01.getString("NAMEBANK").trim();
                objRtn.strCTRAN = rs01.getString("DES_CTRAN").trim();

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

}
