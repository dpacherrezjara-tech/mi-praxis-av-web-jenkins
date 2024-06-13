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
import static net.miatech.praxis.dao.payments.InsumosMDPDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.filter.A2295Filter;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author 
 */
public class ExchangeRateDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ExchangeRateDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ExchangeRateDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2295Filter> loadPX290MPS075(A2295Filter filter) throws SQLException, Exception {
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
        
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS075(?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SCOUNTRY.trim());          
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());

            cstmt.setString(5, filter.IN_CURRENCY1.trim());
            cstmt.setString(6, filter.IN_CURRENCY2.trim());

            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);


//            while (rs01.next()) {
//                SVFOPOT = rs01.getDouble("SVFOPOT");
//                SVFOPNETR = rs01.getDouble("SVFOPNETR");
//                SVFOPCA = rs01.getDouble("SVFOPCA");
//                SVFOPCC = rs01.getDouble("SVFOPCC");
//            }



                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2295Filter();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO;

                    //objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.DATECH = rs01.getString("DATECH").trim();
                    objRtn.SCURRENCY1 = rs01.getString("CURRENCY1").trim();
                    objRtn.SCURRENCY2 = rs01.getString("CURRENCY2").trim();
                    objRtn.RATE = rs01.getString("RATE").trim();
                    objRtn.FACTORD = rs01.getString("FACTORD").trim();
                    objRtn.TCCOTIND = rs01.getString("TCCOTIND").trim();
                    objRtn.TCCOTIND2 = rs01.getString("TCCOTIND2").trim();
                    objRtn.TCCOTDIR = rs01.getString("TCCOTDIR").trim();
                    objRtn.TCCOTDIR2 = rs01.getString("TCCOTDIR2").trim();
                    objRtn.USCR = rs01.getString("USCR").trim();
                    objRtn.USUP = rs01.getString("USUP").trim();
                    objRtn.FECR = rs01.getString("FECR").trim();
                    objRtn.FEUP = rs01.getString("FEUP").trim();
                    objRtn.HOCR = rs01.getString("HOCR").trim();
                    objRtn.HOUP = rs01.getString("HOUP").trim();
                    

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
    public A2353Filter loadPX638MPS075(A2353Filter filter) throws SQLException, Exception {

        A2353Filter objRtn = new A2353Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS075_DE(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DATECH.trim());
            cstmt01.setString(3, filter.SCURRENCY1.trim());
            cstmt01.setString(4, filter.SCURRENCY2.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.DATECH = rs01.getString("DATECH").trim();
                objRtn.SCURRENCY1 = rs01.getString("CURRENCY1").trim();
                objRtn.SCURRENCY2 = rs01.getString("CURRENCY2").trim();
                objRtn.RATE = rs01.getString("RATE").trim();
                objRtn.FACTORD = rs01.getString("FACTORD").trim();
                objRtn.FACTORA = rs01.getString("FACTORA").trim();
                objRtn.TCCOTIND = rs01.getString("TCCOTIND").trim();
                objRtn.TCCOTIND2 = rs01.getString("TCCOTIND2").trim();
                objRtn.TCCOTDIR = rs01.getString("TCCOTDIR").trim();
                objRtn.TCCOTDIR2 = rs01.getString("TCCOTDIR2").trim();
                objRtn.TREG = rs01.getString("TREG").trim();
                objRtn.SIGN = rs01.getString("SIGN").trim();
                objRtn.USCR = rs01.getString("USCR").trim();
                objRtn.USUP = rs01.getString("USUP").trim();
                objRtn.FECR = rs01.getString("FECR").trim();
                objRtn.FEUP = rs01.getString("FEUP").trim();
                objRtn.HOCR = rs01.getString("HOCR").trim();
                objRtn.HOUP = rs01.getString("HOUP").trim();


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
    public String loadPX638MPS076(A2353Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2284.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS075_CRUD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; // LLAMA AL PROCEDURE

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.DATECH.trim());
            cstmt.setString(4, filter.SCURRENCY1.trim());
            cstmt.setString(5, filter.SCURRENCY2.trim());
            cstmt.setString(6, filter.FACTORD.trim());
            cstmt.setString(7, filter.FACTORA.trim());
            cstmt.setString(8, filter.TREG.trim());
            cstmt.setString(9, filter.SIGN.trim());
            cstmt.setString(10, filter.RATE.trim());
            cstmt.setString(11, filter.TCCOTIND.trim());
            cstmt.setString(12, filter.TCCOTDIR.trim());
            cstmt.setString(13, filter.TCCOTIND2.trim());
            cstmt.setString(14, filter.TCCOTDIR2.trim());            

            cstmt.setString(15, session.getUserView().getUserInfo().USR);
            cstmt.setString(16, Functions.getFechaActual());
            cstmt.setString(17, Functions.getHoraActual());
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
