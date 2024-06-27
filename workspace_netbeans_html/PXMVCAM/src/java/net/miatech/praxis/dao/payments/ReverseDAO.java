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
public class ReverseDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ReverseDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ReverseDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2295Filter> loadPX290MPS078(A2295Filter filter) throws SQLException, Exception {
        List<A2295Filter> list = new ArrayList<A2295Filter>();
        A2295Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without LIQUI.");
        hmDescEstados.put("3", "LIQUI. Without Sales");
        hmDescEstados.put("4", "Match Diference");
        hmDescEstados.put("5", "Match Manual");
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("A", "Adjustment");
        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounting With Sales");
        hmDescSTCONL.put("2", "Accounting No Accounting Sales");
        hmDescSTCONL.put("3", "Regularization Accounting");
        hmDescSTCONL.put("4", "Adjustment");
        hmDescSTCONL.put("5", "");
        hmDescSTCONL.put("6", "");
        hmDescSTCONL.put("7", "");       
        hmDescSTCONL.put("8", "Accounted by AV");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS078(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE_FROM.trim());
            cstmt.setString(3, filter.IN_DATE_TO.trim());
            cstmt.setString(4, filter.IN_TKT.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_SCARDNCOR.trim());
            cstmt.setString(7, filter.IN_SAUTHOC.trim());
            cstmt.setString(8, filter.IN_SCOUNTRY.trim());
            cstmt.setString(9, filter.IN_SAGENT.trim());
            cstmt.setString(10, filter.IN_SPNR.trim());
            cstmt.setString(11, filter.IN_SCARDN1.trim());
            cstmt.setString(12, filter.IN_SCARDN2.trim());
            cstmt.setString(13, filter.IN_SVFOT.trim());
            cstmt.setString(14, filter.IN_STVAL.trim());

            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                objRtn = new A2295Filter();
                objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                objRtn.IN_DATE_TO = filter.IN_DATE_TO;

                objRtn.STVAL = rs01.getString("STVAL").trim();
                if (hmDescEstados.containsKey(rs01.getString("STVAL").trim().toUpperCase())) {
                    objRtn.STVAL = hmDescEstados.get(rs01.getString("STVAL").trim()).toString();
                } else {
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                }
                objRtn.TKT = rs01.getString("TKT").trim();               
                objRtn.TDOC = hmDescDocType.get(rs01.getString("TDOC").trim());
                objRtn.CERROR = rs01.getString("ERROR").trim();
                objRtn.SDATE = rs01.getString("SDATE").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.SVFOP = rs01.getString("SVFOP").trim();
                objRtn.SPNR = rs01.getString("SPNR").trim();
                objRtn.SAGENT = rs01.getString("SAGENT").trim();
                objRtn.STCON = rs01.getString("STCON").trim();
                if (hmDescSTCONL.containsKey(rs01.getString("STCON").trim())) {
                        objRtn.STCON = hmDescSTCONL.get(rs01.getString("STCON").trim()).toString();
                    } 
                objRtn.FCONT = rs01.getString("FCONT").trim();               
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
