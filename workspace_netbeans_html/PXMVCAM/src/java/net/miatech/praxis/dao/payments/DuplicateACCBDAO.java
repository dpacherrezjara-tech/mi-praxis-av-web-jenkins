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
import net.miatech.praxis.payment.filter.A2271Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author 
 */
public class DuplicateACCBDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public DuplicateACCBDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DuplicateACCBDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2271Filter> loadPX370SQP01475(A2271Filter filter) throws SQLException, Exception {
        List<A2271Filter> list = new ArrayList<A2271Filter>();
        A2271Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblAMOUNTDOC = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01475(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());   //ttran 
            cstmt.setString(6, filter.IN_AGENT.trim());  //authorization
            cstmt.setString(7, filter.IN_TICKET.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.IN_FTE.trim());
            cstmt.setString(10, filter.strOrden.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblAMOUNTDOC = rs01.getDouble("AMOUNTDOC");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2271Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;

                    objRtn.DOCNUM = rs01.getString("DOCNUM").trim();
                    objRtn.ISSUEDATE = rs01.getString("ISSUEDATE").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.ISSUEDATE);
                    objRtn.TRAHORICOD = rs01.getString("TRAHORICOD").trim();
                    objRtn.COUNTRSALE = rs01.getString("COUNTRSALE").trim();
                    objRtn.TTRAN = rs01.getString("TTRAN").trim();
                    if (objRtn.TTRAN.equals("S")) {
                        objRtn.strDescFTE = "Sale";
                    } else {
                        objRtn.strDescFTE = "Refund";
                    }

                    objRtn.AMOUNTDOC = rs01.getDouble("AMOUNTDOC");
                    objRtn.SEQNUM = rs01.getString("SEQNUM").trim();
                    objRtn.CREDCARDT = rs01.getString("CREDCARDT").trim();
                    objRtn.DOCCURR = rs01.getString("DOCCURR").trim();
                    objRtn.CREDCARDN = rs01.getString("CREDCARDN").trim();
                    objRtn.PNRL = rs01.getString("PNRL").trim();
                    objRtn.FDUPLI = rs01.getString("FDUPLI").trim();
                    objRtn.FSELEC = rs01.getString("FSELEC").trim();
                    if (objRtn.FSELEC.equals("L")) {
                        objRtn.strComment = "Load";
                    } else if (objRtn.FSELEC.equals("S")) {
                        objRtn.strComment = "Stand by";
                    } else {
                        objRtn.strComment = "Pending";
                    }
                    objRtn.FTEA = rs01.getString("FTEA").trim();
                    if (objRtn.FTEA.equals("B")) {
                        objRtn.strDescAFTE = "Billed";
                    } else if (objRtn.FTEA.equals("N")) {
                        objRtn.strDescAFTE = "No Billed";
                    } else {
                        objRtn.strDescAFTE = "Local";
                    }

                    objRtn.dblAMOUNT = dblAMOUNTDOC;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
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
    
    public List<A2271Filter> loadPX370SQP01527(A2271Filter filter) throws SQLException, Exception {
        List<A2271Filter> list = new ArrayList<A2271Filter>();
        A2271Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblAMOUNTDOC = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01527(?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TICKET.substring(0, 3));//CIA
            cstmt.setString(3, filter.IN_TICKET.substring(3, 7));//FORMA
            cstmt.setString(4, filter.IN_TICKET.substring(7, 13));//SERIE 

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblAMOUNTDOC = rs01.getDouble("AMOUNTDOC");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2271Filter();

                    objRtn.DOCNUM = rs01.getString("DOCNUM").trim();
                    objRtn.ISSUEDATE = rs01.getString("ISSUEDATE").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.ISSUEDATE);
                    objRtn.TRAHORICOD = rs01.getString("TRAHORICOD").trim();
                    objRtn.COUNTRSALE = rs01.getString("COUNTRSALE").trim();
                    objRtn.TTRAN = rs01.getString("TTRAN").trim();
                    if (objRtn.TTRAN.equals("S")) {
                        objRtn.strDescFTE = "Sale";
                    } else {
                        objRtn.strDescFTE = "Refund";
                    }

                    objRtn.AMOUNTDOC = rs01.getDouble("AMOUNTDOC");
                    objRtn.SEQNUM = rs01.getString("SEQNUM").trim();
                    objRtn.CREDCARDT = rs01.getString("CREDCARDT").trim();
                    objRtn.DOCCURR = rs01.getString("DOCCURR").trim();
                    objRtn.CREDCARDN = rs01.getString("CREDCARDN").trim();
                    objRtn.PNRL = rs01.getString("PNRL").trim();
                    objRtn.FDUPLI = rs01.getString("FDUPLI").trim();
                    objRtn.FSELEC = rs01.getString("FSELEC").trim();
                    if (objRtn.FSELEC.equals("L")) {
                        objRtn.strComment = "Load";
                    } else if (objRtn.FSELEC.equals("S")) {
                        objRtn.strComment = "Stand by";
                    } else {
                        objRtn.strComment = "Pending";
                    }
                    objRtn.FTEA = rs01.getString("FTEA").trim();
                    if (objRtn.FTEA.equals("B")) {
                        objRtn.strDescAFTE = "Billed";
                    } else if (objRtn.FTEA.equals("N")) {
                        objRtn.strDescAFTE = "No Billed";
                    } else {
                        objRtn.strDescAFTE = "Local";
                    }

                    objRtn.dblAMOUNT = dblAMOUNTDOC;

                    list.add(objRtn);
                }
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
