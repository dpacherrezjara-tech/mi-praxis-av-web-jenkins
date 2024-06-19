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
import java.util.HashMap;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2295Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author
 */
public class SalesConciliationManualDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesConciliationManualDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesConciliationManualDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2295Filter> loadPX290MPS077(A2295Filter filter) throws SQLException, Exception {
        List<A2295Filter> list = new ArrayList<A2295Filter>();
        A2295Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        hmDescDocType.put("R", "Rfnd");
        hmDescDocType.put("C", "Chargeback");
        hmDescDocType.put("A", "Acredit");

//        double SVFOPOT = 0, SVFOPNETR = 0 ;
//        double SVFOPCA = 0, SVFOPCC = 0 ;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS077(?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE_FROM.trim());
            cstmt.setString(3, filter.IN_DATE_TO.trim());
            cstmt.setString(4, filter.IN_TKT.trim());
            cstmt.setString(5, filter.IN_FCONCEP.trim());

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                objRtn = new A2295Filter();
                objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                objRtn.IN_DATE_TO = filter.IN_DATE_TO;

                objRtn.PRDA = rs01.getString("PRDA").trim();
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.FCONCEP = rs01.getString("FCONCEP").trim();
                objRtn.TKT = rs01.getString("CCIA").trim()+rs01.getString("FORMA").trim()+rs01.getString("SERIE").trim();
                objRtn.SDATE = rs01.getString("SDATE").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                objRtn.SVFOP = rs01.getString("SVFOP").trim();
                objRtn.SEQ = rs01.getString("SEQ").trim();
                objRtn.USERF = rs01.getString("USERF").trim();

                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
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

        return list;
    }
}
