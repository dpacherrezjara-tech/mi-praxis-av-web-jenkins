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
import static net.miatech.praxis.dao.payments.BankReconciliationDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2356Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jsolano
 */
public class ReportsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ReportsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ReportsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2356Filter> loadSQP05120(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS356(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_SCOUNTRY);
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_SCARDNCOR.trim());
            cstmt.setString(8, filter.IN_DEBTYPE.trim());
            cstmt.setString(9, filter.IN_SAUTHOC.trim());
            cstmt.setString(10, filter.IN_CODEBANK.trim());
            cstmt.setString(11, filter.IN_STVAL.trim());
            cstmt.setString(12, filter.IN_TDOC.trim());
            cstmt.setString(13, filter.IN_FECFILTRO.trim());
            cstmt.setString(14, filter.IN_CODPRO.trim());

            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTOTAL = rst.getDouble("TOTAL");
                totNETO = rst.getDouble("NETO");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
                    bean.RN = rst.getInt("RN");

                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.NAME = rst.getString("NAME").trim();
                    bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    bean.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                    bean.PAYDATE = rst.getString("PAYDATE").trim();
                    bean.BANDOC = rst.getString("BANDOC").trim();
                    bean.REFERENCE = rst.getString("REFER").trim();
                    bean.CAR6 = rst.getString("CAR6").trim();
                    bean.CAR4 = rst.getString("CAR4").trim();
                    bean.SAUTHOC = rst.getString("SAUTHOC").trim();
                    bean.FTRAN = rst.getString("FTRAN").trim();
                    bean.MERCHAND = rst.getString("MERCHNC").trim();
                    bean.TOTAL = rst.getDouble("TOTAL");
                    bean.NETO = rst.getDouble("NETO");
                    bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                    bean.TYPE = rst.getString("TYPE").trim();
                    bean.STVAL = rst.getString("STVAL").trim();
                    if (bean.STVAL.equals("1")) {
                        bean.STVAL = "Match";
                    }else if (bean.STVAL.equals("5")) {
                        bean.STVAL = "Match Manual";
                    } else {
                        bean.STVAL = "Pend.";
                    }
                    bean.DEBSTVAL = rst.getString("DEBSTVAL").trim();
                    if (bean.DEBSTVAL.equals("1")) {
                        bean.DEBSTVAL = "Match";
                    }else if (bean.DEBSTVAL.equals("5")) {
                        bean.DEBSTVAL = "Manual";
                    } else {
                        bean.DEBSTVAL = "Pend.";
                    }

                    bean.totTOTAL = totTOTAL;
                    bean.totNETO = totNETO;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
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
    
    public List<A2356Filter> loadSQP05120_DETAIL(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        double totTOTAL = 0, totNETO = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS367(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_TDOC);
            cstmt.setString(4, filter.IN_FECFILTRO);
            cstmt.setString(5, filter.IN_CONT);
            cstmt.setString(6, filter.IN_CODPRO);


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
                totTOTAL = rst.getDouble("TOTAL");
                totNETO = rst.getDouble("NETO");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
                    bean.RN = rst.getInt("RN");

                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.NAME = rst.getString("NAME").trim();
                    bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    bean.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                    bean.PAYDATE = rst.getString("PAYDATE").trim();
                    bean.BANDOC = rst.getString("BANDOC").trim();
                    bean.REFERENCE = rst.getString("REFER").trim();
                    bean.CAR6 = rst.getString("CAR6").trim();
                    bean.CAR4 = rst.getString("CAR4").trim();
                    bean.SAUTHOC = rst.getString("SAUTHOC").trim();
                    bean.FTRAN = rst.getString("FTRAN").trim();
                    bean.MERCHAND = rst.getString("MERCHNC").trim();
                    bean.TOTAL = rst.getDouble("TOTAL");
                    bean.NETO = rst.getDouble("NETO");
                    bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                    bean.TYPE = rst.getString("TYPE").trim();
                    bean.STVAL = rst.getString("STVAL").trim();
                    if (bean.STVAL.equals("1")) {
                        bean.STVAL = "Match";
                    }else if (bean.STVAL.equals("5")) {
                        bean.STVAL = "Match Manual";
                    } else {
                        bean.STVAL = "Pend.";
                    }
                    bean.DEBSTVAL = rst.getString("DEBSTVAL").trim();
                    if (bean.DEBSTVAL.equals("1")) {
                        bean.DEBSTVAL = "Match";
                    }else if (bean.DEBSTVAL.equals("5")) {
                        bean.DEBSTVAL = "Manual";
                    } else {
                        bean.DEBSTVAL = "Pend.";
                    }

                    bean.totTOTAL = totTOTAL;
                    bean.totNETO = totNETO;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
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
    
    private double round2(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    
    public List<A2356Filter> loadSQP05120_SM(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;
        int QTY_TOTAL_REFUND = 0; double AMOUNT_TOTAL_REFUND_USD = 0, AMOUNT_TOTAL_REFUND_SEND = 0, AMOUNT_TOTAL_REFUND_SAP = 0,AMOUNT_TOTAL_REFUND_PENDING_USD = 0;
        int QTY_TOTAL_CHGBACK = 0; double AMOUNT_TOTAL_CHGBACK_USD = 0, AMOUNT_TOTAL_CHGBACK_SEND = 0, AMOUNT_TOTAL_CHGBACK_SAP = 0,AMOUNT_TOTAL_CHGBACK_PENDING_USD = 0;
        int QTY_TOTAL_REVERSE_CHGBACK = 0; double  AMOUNT_TOTAL_REVERSE_CHGBACK_USD = 0, AMOUNT_TOTAL_REVERSE_CHGBACK_SEND = 0, AMOUNT_TOTAL_REVERSE_CHGBACK_SAP = 0,AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD = 0;
        int QTY_TOTAL_ACRED = 0; double  AMOUNT_TOTAL_ACRED_USD = 0, AMOUNT_TOTAL_ACRED_SEND = 0, AMOUNT_TOTAL_ACRED_SAP = 0, AMOUNT_TOTAL_ACRED_PENDING_USD = 0;
        int QTY_TOTAL_PENDING = 0; double  AMOUNT_TOTAL_PENDING_USD = 0, AMOUNT_TOTAL_PENDING_SEND = 0, AMOUNT_TOTAL_PENDING_SAP = 0;
        int QTY_TOTAL_GRANT = 0; double  AMOUNT_TOTAL_GRANT_USD = 0;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS366(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_FECFILTRO);
            cstmt.setString(5, filter.IN_CODPRO);
 
            cstmt.execute();

            rst = cstmt.getResultSet();

//            while (rst.next()) {
//                
//            }
//            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A2356Filter();
                    bean.RN = rst.getInt("RN");

                    bean.CCUST = rst.getString("CCUST").trim();
                    bean.strFormatDate = Functions.getMonthConvertCbas(rst.getString("STRFORMATDATE").trim());
                    bean.IN_FECFILTRO = filter.IN_FECFILTRO;
                    bean.CURRENCY = rst.getString("CURRENCY").trim();
                    
                    bean.QTY_REFUND = rst.getInt("QTY_REFUND");
                    bean.AMOUNT_REFUND_USD = rst.getDouble("AMOUNT_REFUND_USD");
                    bean.AMOUNT_REFUND_SEND = rst.getDouble("AMOUNT_REFUND_SEND");
                    bean.AMOUNT_REFUND_SAP = rst.getDouble("AMOUNT_REFUND_SAP");
                    bean.AMOUNT_REFUND_PENDING_SAP = rst.getDouble("AMOUNT_REFUND_PENDING_SAP");
                    
                    bean.QTY_CHGBACK = rst.getInt("QTY_CHGBACK");
                    bean.AMOUNT_CHGBACK_USD = rst.getDouble("AMOUNT_CHGBACK_USD");
                    bean.AMOUNT_CHGBACK_SEND = rst.getDouble("AMOUNT_CHGBACK_SEND");
                    bean.AMOUNT_CHGBACK_SAP = rst.getDouble("AMOUNT_CHGBACK_SAP");
                     bean.AMOUNT_CHGBACK_PENDING_SAP = rst.getDouble("AMOUNT_CHGBACK_PENDING_SAP");
                    
                    bean.QTY_REVERSE_CHGBACK = rst.getInt("QTY_REVERSE_CHGBACK");
                    bean.AMOUNT_REVERSE_CHGBACK_USD = rst.getDouble("AMOUNT_REVERSE_CHGBACK_USD");
                    bean.AMOUNT_REVERSE_CHGBACK_SEND = rst.getDouble("AMOUNT_REVERSE_CHGBACK_SEND");
                    bean.AMOUNT_REVERSE_CHGBACK_SAP = rst.getDouble("AMOUNT_REVERSE_CHGBACK_SAP");
                    bean.AMOUNT_REVERSE_PENDING_CHGBACK_SAP = rst.getDouble("AMOUNT_REVERSE_PENDING_CHGBACK_SAP");
                    
                    bean.QTY_ACRED = rst.getInt("QTY_ACRED");
                    bean.AMOUNT_ACRED_USD = rst.getDouble("AMOUNT_ACRED_USD");
                    bean.AMOUNT_ACRED_SEND = rst.getDouble("AMOUNT_ACRED_SEND");
                    bean.AMOUNT_ACRED_SAP = rst.getDouble("AMOUNT_ACRED_SAP");
                    bean.AMOUNT_ACRED_PENDING_SAP = rst.getDouble("AMOUNT_ACRED_PENDING_SAP");
                    
                    bean.QTY_PENDING = rst.getInt("QTY_PENDING");
                    bean.AMOUNT_PENDING_USD = rst.getDouble("AMOUNT_PENDING_USD");
                    bean.AMOUNT_PENDING_SEND = rst.getDouble("AMOUNT_PENDING_SEND");
                    bean.AMOUNT_PENDING_SAP = rst.getDouble("AMOUNT_PENDING_SAP");
                    

                    bean.QTY_GRANT = bean.QTY_REFUND
                                   + bean.QTY_CHGBACK
                                   + bean.QTY_REVERSE_CHGBACK
                                   + bean.QTY_ACRED
                                    + bean.QTY_PENDING;

                    bean.AMOUNT_GRANT = bean.AMOUNT_REFUND_USD
                                          + bean.AMOUNT_CHGBACK_USD
                                          + bean.AMOUNT_REVERSE_CHGBACK_USD
                                          + bean.AMOUNT_ACRED_USD
                            + bean.AMOUNT_PENDING_USD;
                    
                    
                    QTY_TOTAL_REFUND += rst.getInt("QTY_REFUND");
                    AMOUNT_TOTAL_REFUND_USD += rst.getDouble("AMOUNT_REFUND_USD");
                    AMOUNT_TOTAL_REFUND_SEND += rst.getDouble("AMOUNT_REFUND_SEND");
                    AMOUNT_TOTAL_REFUND_SAP += rst.getDouble("AMOUNT_REFUND_SAP");
                    AMOUNT_TOTAL_REFUND_PENDING_USD += rst.getDouble("AMOUNT_REFUND_PENDING_SAP");

                    QTY_TOTAL_CHGBACK += rst.getInt("QTY_CHGBACK");
                    AMOUNT_TOTAL_CHGBACK_USD += rst.getDouble("AMOUNT_CHGBACK_USD");
                    AMOUNT_TOTAL_CHGBACK_SEND += rst.getDouble("AMOUNT_CHGBACK_SEND");
                    AMOUNT_TOTAL_CHGBACK_SAP += rst.getDouble("AMOUNT_CHGBACK_SAP");
                    AMOUNT_TOTAL_CHGBACK_PENDING_USD += rst.getDouble("AMOUNT_CHGBACK_PENDING_SAP");

                    QTY_TOTAL_REVERSE_CHGBACK += rst.getInt("QTY_REVERSE_CHGBACK");
                    AMOUNT_TOTAL_REVERSE_CHGBACK_USD += rst.getDouble("AMOUNT_REVERSE_CHGBACK_USD");
                    AMOUNT_TOTAL_REVERSE_CHGBACK_SEND += rst.getDouble("AMOUNT_REVERSE_CHGBACK_SEND");
                    AMOUNT_TOTAL_REVERSE_CHGBACK_SAP += rst.getDouble("AMOUNT_REVERSE_CHGBACK_SAP");
                    AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD += rst.getDouble("AMOUNT_REVERSE_PENDING_CHGBACK_SAP");

                    QTY_TOTAL_ACRED += rst.getInt("QTY_ACRED");
                    AMOUNT_TOTAL_ACRED_USD += rst.getDouble("AMOUNT_ACRED_USD");
                    AMOUNT_TOTAL_ACRED_SEND += rst.getDouble("AMOUNT_ACRED_SEND");
                    AMOUNT_TOTAL_ACRED_SAP += rst.getDouble("AMOUNT_ACRED_SAP");
                    AMOUNT_TOTAL_ACRED_PENDING_USD += rst.getDouble("AMOUNT_ACRED_PENDING_SAP");

                    QTY_TOTAL_PENDING += rst.getInt("QTY_PENDING");
                    AMOUNT_TOTAL_PENDING_USD += rst.getDouble("AMOUNT_PENDING_USD");
                    AMOUNT_TOTAL_PENDING_SEND += rst.getDouble("AMOUNT_PENDING_SEND");
                    AMOUNT_TOTAL_PENDING_SAP += rst.getDouble("AMOUNT_PENDING_SAP");
                    
                    QTY_TOTAL_GRANT += bean.QTY_GRANT;
                    AMOUNT_TOTAL_GRANT_USD += bean.AMOUNT_GRANT;

                    bean.QTY_TOTAL_REFUND = QTY_TOTAL_REFUND;
                    bean.AMOUNT_TOTAL_REFUND_USD = AMOUNT_TOTAL_REFUND_USD;
                    bean.AMOUNT_TOTAL_REFUND_SEND = AMOUNT_TOTAL_REFUND_SEND;
                    bean.AMOUNT_TOTAL_REFUND_SAP = AMOUNT_TOTAL_REFUND_SAP;
                    bean.AMOUNT_TOTAL_REFUND_PENDING_USD = AMOUNT_TOTAL_REFUND_PENDING_USD;
                    
                    bean.QTY_TOTAL_CHGBACK = QTY_TOTAL_CHGBACK;
                    bean.AMOUNT_TOTAL_CHGBACK_USD = AMOUNT_TOTAL_CHGBACK_USD;
                    bean.AMOUNT_TOTAL_CHGBACK_SEND = AMOUNT_TOTAL_CHGBACK_SEND;
                    bean.AMOUNT_TOTAL_CHGBACK_SAP = AMOUNT_TOTAL_CHGBACK_SAP;
                    bean.AMOUNT_TOTAL_CHGBACK_PENDING_USD = AMOUNT_TOTAL_CHGBACK_PENDING_USD;
                    
                    bean.QTY_TOTAL_REVERSE_CHGBACK = QTY_TOTAL_REVERSE_CHGBACK;
                    bean.AMOUNT_TOTAL_REVERSE_CHGBACK_USD = AMOUNT_TOTAL_REVERSE_CHGBACK_USD;
                    bean.AMOUNT_TOTAL_REVERSE_CHGBACK_SEND = AMOUNT_TOTAL_REVERSE_CHGBACK_SEND;
                    bean.AMOUNT_TOTAL_REVERSE_CHGBACK_SAP = AMOUNT_TOTAL_REVERSE_CHGBACK_SAP;
                    bean.AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD = AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD;
                    
                    bean.QTY_TOTAL_ACRED = QTY_TOTAL_ACRED;
                    bean.AMOUNT_TOTAL_ACRED_USD = AMOUNT_TOTAL_ACRED_USD;
                    bean.AMOUNT_TOTAL_ACRED_SEND = AMOUNT_TOTAL_ACRED_SEND;
                    bean.AMOUNT_TOTAL_ACRED_SAP = AMOUNT_TOTAL_ACRED_SAP;
                    bean.AMOUNT_TOTAL_ACRED_PENDING_USD = AMOUNT_TOTAL_ACRED_PENDING_USD;
                    
                    bean.QTY_TOTAL_PENDING = QTY_TOTAL_PENDING;
                    bean.AMOUNT_TOTAL_PENDING_USD = AMOUNT_TOTAL_PENDING_USD;
                    bean.AMOUNT_TOTAL_PENDING_SEND = AMOUNT_TOTAL_PENDING_SEND;
                    bean.AMOUNT_TOTAL_PENDING_SAP = AMOUNT_TOTAL_PENDING_SAP;
                    
                    bean.QTY_TOTAL_GRANT = QTY_TOTAL_GRANT;
                    bean.AMOUNT_TOTAL_GRANT_USD = AMOUNT_TOTAL_GRANT_USD;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
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

    public A2356Filter loadSQP02856(A2356Filter filter) throws SQLException, Exception {

        A2356Filter bean = new A2356Filter();
        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02856(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.SCOUNTRY.trim());
            cstmt01.setString(3, filter.CODEBANK.trim());
            cstmt01.setString(4, filter.SCURRENCY.trim());
            cstmt01.setString(5, filter.CODTRAN.trim());
            cstmt01.setString(6, filter.TIPREG.trim());
            cstmt01.setString(7, filter.CODCLIT.trim());

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            if (rst.next()) {
                bean.CCUST = rst.getString("CCUST");
                bean.CODTRAN = rst.getString("CODTRAN").trim();
                bean.DESCRI = rst.getString("DESCRI").trim();
                bean.TIPREG = rst.getString("TIPREG").trim();
                if (rst.getString("TIPREG").trim().equals("C")) {
                    bean.desTIPREG = "Cargo";
                } else {
                    bean.desTIPREG = "Abono";
                }
                bean.CODAGRU = rst.getString("CODAGRU").trim();
                bean.CLASE = rst.getString("CLASE").trim();
                bean.DIRCLIT = rst.getString("DIRCLIT").trim();
                bean.NROPOLIZ = rst.getString("NROPOLIZ").trim();
                bean.CODEBANK = rst.getString("CODEBANK").trim();
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.DESMLINE = rst.getString("DESMLINE").trim();
                bean.CODCLIT = rst.getString("CODCLIT").trim();
                bean.CIACTA = rst.getString("CIACTA").trim();
                bean.UNIDAD = rst.getString("UNIDAD").trim();
                bean.CECOS = rst.getString("CECOS").trim();
                bean.LOCAC = rst.getString("LOCAC").trim();
                bean.CODCTA = rst.getString("CODCTA").trim();
                bean.SUBCTA = rst.getString("SUBCTA").trim();
                bean.EQUIPO = rst.getString("EQUIPO").trim();
                bean.ICIA = rst.getString("ICIA").trim();
                bean.CTACTB = rst.getString("CTACTB").trim();
                bean.Field1 = bean.CIACTA + bean.UNIDAD + bean.CECOS + bean.LOCAC + bean.CODCTA + bean.SUBCTA + bean.EQUIPO + bean.ICIA;

                if (bean.Field1.equals("")) {
                    bean.Field2 = "";
                } else {
                    bean.Field2 = bean.CIACTA + "-" + bean.UNIDAD + "-" + bean.CECOS + "-" + bean.LOCAC + "-" + bean.CODCTA + "-" + bean.SUBCTA + "-" + bean.EQUIPO + "-" + bean.ICIA;
                }

                bean.COSTCEN = rst.getString("COSTCEN").trim();
                bean.NEGOC = rst.getString("NEGOC").trim();
                if (rst.getString("NEGOC").trim().equals("1")) {
                    bean.descNEGOC = "PASAJES";
                } else if (rst.getString("NEGOC").trim().equals("2")) {
                    bean.descNEGOC = "CARGA";
                } else if (rst.getString("NEGOC").trim().equals("3")) {
                    bean.descNEGOC = "CORREO";
                }
                bean.TTRAN = rst.getString("TTRAN").trim();
                bean.TOPER = rst.getString("TOPER").trim();
                bean.ACCNUMBER = rst.getString("ACCNUMBER").trim();

                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = rst.getString("HOCR");
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = rst.getString("HOUP");

            }
        } catch (Exception e) {
            // e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return bean;
    }

    public String loadSQP02857(A2356Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02857(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.CODTRAN.trim());
            cstmt.setString(4, filter.DESCRI.trim());
            cstmt.setString(5, filter.TIPREG.trim());
            cstmt.setString(6, filter.CODEBANK.trim());
            cstmt.setString(7, filter.SCURRENCY.trim());
            cstmt.setString(8, filter.SCOUNTRY.trim());
            cstmt.setString(9, filter.CODCLIT.trim());
            cstmt.setString(10, filter.CIACTA.trim());
            cstmt.setString(11, filter.UNIDAD.trim());
            cstmt.setString(12, filter.CECOS.trim());
            cstmt.setString(13, filter.LOCAC.trim());
            cstmt.setString(14, filter.CODCTA.trim());
            cstmt.setString(15, filter.SUBCTA.trim());
            cstmt.setString(16, filter.EQUIPO.trim());
            cstmt.setString(17, filter.ICIA.trim());
            cstmt.setString(18, filter.CTACTB.trim());
            cstmt.setString(19, filter.NROPOLIZ.trim());
            cstmt.setString(20, filter.CLASE.trim());
            cstmt.setString(21, filter.DIRCLIT.trim());
            cstmt.setString(22, filter.CODAGRU.trim());
            cstmt.setString(23, filter.DESMLINE.trim());
            cstmt.setString(24, filter.COSTCEN.trim());
            cstmt.setString(25, filter.NEGOC.trim());
            cstmt.setString(26, filter.TTRAN.trim());
            cstmt.setString(27, filter.TOPER.trim());
            cstmt.setString(28, filter.ACCNUMBER.trim());
            cstmt.setString(29, session.getUserView().getUserInfo().USR);
            cstmt.setString(30, Functions.getFechaActual());
            cstmt.setString(31, Functions.getHoraActual());
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

        public List<A2290Filter> loadPX269SQP05103_DEBITYPE(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05103_DEBITYPE(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt.execute();

            rst = cstmt.getResultSet();
            beanTkt = new A2290Filter();

            beanTkt.CODE = "";
            beanTkt.NAME = "All";
            lstData.add(beanTkt);
            while (rst.next()) {

                beanTkt = new A2290Filter();

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
        
        public List<A2290Filter> load_MPS350(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS350(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_FECFILTRO);
            cstmt.execute();

            rst = cstmt.getResultSet();
           
            while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.QTY = rst.getInt("QTY");

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
}
