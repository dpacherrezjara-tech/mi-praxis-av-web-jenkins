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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.ExcelChargeBack;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.praxis.payment.filter.A2345Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class DataRequestedByBankDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public DataRequestedByBankDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DataRequestedByBankDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2331Filter> loadPX404SQP01885(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");
        hmDescSTVAL.put("6", "Reverse Chargeback");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        long QTKT = 0, QLINK = 0, QCARD = 0, QNOT = 0, QNMATCH = 0;
        double AUTAMOUNT = 0, VFOP = 0, ANOT = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01885_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        System.out.println("Ejecutando ----> " + SQLCLL01);
        System.out.println(filter.page.PAGNUM);
        System.out.println(filter.page.PAGROW);
        System.out.println(filter.page.TOTPAG);
        System.out.println(filter.page.TOTROW);
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_CARDC.trim());
            cstmt.setString(6, filter.IN_CARDN1.trim());
            cstmt.setString(7, filter.IN_CARDN2.trim());
            cstmt.setString(8, filter.IN_MERCHN.trim());
            cstmt.setString(9, filter.IN_AGENT.trim());
            cstmt.setString(10, filter.IN_AUTHNBR.trim());
            cstmt.setString(11, filter.IN_CODEBANK.trim());
            cstmt.setString(12, filter.IN_STVAL.trim());
            cstmt.setString(13, filter.IN_COUNTRY.trim());
            cstmt.setString(14, filter.IN_TCARD.trim());
            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            if (rs01.next()) {
                QTKT = rs01.getLong("QTKT");
                QLINK = rs01.getLong("QLINK");
                QCARD = rs01.getLong("QCARD");
                QNOT = rs01.getLong("QNOT");
                QNMATCH = rs01.getLong("QNMATCH");
                AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                VFOP = rs01.getDouble("VFOP");
                ANOT = rs01.getDouble("ANOT");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_MERCHN = filter.IN_MERCHN;
                    objRtn.IN_AGENT = filter.IN_AGENT;
                    objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                    objRtn.IN_CODEBANK = filter.IN_CODEBANK;
                    objRtn.IN_TCARD = filter.IN_TCARD;
                    objRtn.IN_STVAL = filter.IN_STVAL;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;

                    objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                    if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                        objRtn.MERCHN = rs01.getString("MERCHN").trim();
                        objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    } else {
                        objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                        objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                    }
                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.TCARD=rs01.getString("TCARD");
                    objRtn.strDescBank = rs01.getString("NAMEBANK").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.DATES = rs01.getString("DATES").trim();
                    objRtn.IATADATE = rs01.getString("IATADATE").trim();
                    objRtn.DATEN = rs01.getString("DATEN").trim();
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    objRtn.VFOP = rs01.getDouble("VFOP");
                    objRtn.lngDocs = rs01.getLong("QTKT");
                    objRtn.lngQLINK = rs01.getLong("QLINK");
                    objRtn.lngQCARD = rs01.getLong("QCARD");
                    objRtn.lngQNMATCH = rs01.getLong("QNMATCH");
                    objRtn.lngQNOT = rs01.getLong("QNOT");
                    if (rs01.getString("STVAL").trim().equals("5")) {
                        objRtn.dblANOT = Double.parseDouble("-" + rs01.getDouble("ANOT"));
                    } else {
                        objRtn.dblANOT = rs01.getDouble("ANOT");
                    }

                    objRtn.dblPercCharged = (objRtn.VFOP > 0) ? (objRtn.dblANOT * 100.0) / objRtn.VFOP : 0;
                    objRtn.days = Functions.diferenciaDiasEntreSistema(rs01.getString("SENTDATE").trim());
                    objRtn.strDescStatus = hmDescSTVAL.get(objRtn.STVAL).toString();

                    if (objRtn.STVAL.equals("4") || objRtn.STVAL.equals("5")) {
                        objRtn.strSemaforo = "VERDE";
                    } else {
                        if (objRtn.days < 8) {
                            objRtn.strSemaforo = "VERDE";
                        } else if (objRtn.days <= 10) {
                            objRtn.strSemaforo = "AMBAR";
                        } else {
                            objRtn.strSemaforo = "ROJO";
                        }
                    }

                    objRtn.lngTotDocs = QTKT;
                    objRtn.lngTotQLINK = QLINK;
                    objRtn.lngTotQCARD = QCARD;
                    objRtn.lngTotQNOT = QNOT;
                    objRtn.lngTotQNMATCH = QNMATCH;
                    objRtn.dblTotAUTAMOUNT = AUTAMOUNT;
                    objRtn.dblTotVFOP = VFOP;
                    objRtn.dblTotANOT = ANOT;
                    objRtn.dblTotPercCharged = (VFOP > 0) ? (ANOT * 100.0) / VFOP : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }

//                Collections.sort(list, new Comparator<A2331Filter>() {               
//                    @Override
//                    public int compare(A2331Filter o1, A2331Filter o2) {
//                         return o1.DATEN.compareTo(o2.DATEN);
//                    }
//                });
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

    public List<A2331Filter> loadPX404SQP01895(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        long QTYTRNX = 0, QNOMATCH = 0;
        double AUTAMOUNT = 0, OPEAMOUNT = 0, IVA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01895(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_CARDC.trim());
            cstmt.setString(6, filter.IN_CARDN1.trim());
            cstmt.setString(7, filter.IN_CARDN2.trim());
            cstmt.setString(8, filter.IN_MERCHN.trim());
            cstmt.setString(9, filter.IN_AUTHNBR.trim());
            cstmt.setString(10, filter.IN_CODEBANK.trim());
            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            if (rs01.next()) {
                QTYTRNX = rs01.getLong("QTYTRNX");
                QNOMATCH = rs01.getLong("QNOMATCH");
                AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                OPEAMOUNT = rs01.getDouble("OPEAMOUNT");
                IVA = rs01.getDouble("IVA");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_MERCHN = filter.IN_MERCHN;
                    objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                    objRtn.IN_CODEBANK = filter.IN_CODEBANK;

                    objRtn.APLIDATE = rs01.getString("APLIDATE").trim();
                    if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                        objRtn.MERCHN = rs01.getString("MERCHN").trim();
                        objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    } else {
                        objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                        objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                    }
                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    if (rs01.getString("STVAL").trim().equals("1")) {
                        objRtn.strDescStatus = "ChargeBack";
                    } else if (rs01.getString("STVAL").trim().equals("2")) {
                        objRtn.strDescStatus = "Notice Without Clarification";
                    } else if (rs01.getString("STVAL").trim().equals("3")) {
                        objRtn.strDescStatus = "Notice without Account Statement";
                    } else if (rs01.getString("STVAL").trim().equals("5")) {
                        objRtn.strDescStatus = "Reverse ChargeBack - Pending";
                    } else if (rs01.getString("STVAL").trim().equals("6")) {
                        objRtn.strDescStatus = "Reverse ChargeBack - Applied";
                    } else {
                        objRtn.strDescStatus = objRtn.STVAL;
                    }
                    if (rs01.getString("STVAL").equals("1") || rs01.getString("STVAL").equals("2")) {
                        objRtn.AUTAMOUNT = Double.parseDouble("-" + rs01.getDouble("AUTAMOUNT"));
                        objRtn.dblTotAUTAMOUNT = Double.parseDouble("-" + AUTAMOUNT);;
                    } else {
                        objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                        objRtn.dblTotAUTAMOUNT = AUTAMOUNT;
                    }

                    objRtn.OPEAMOUNT = rs01.getDouble("OPEAMOUNT");
                    objRtn.IVA = rs01.getDouble("IVA");
                    objRtn.QTYTRNX = rs01.getLong("QTYTRNX");
                    objRtn.lngQNMATCH = rs01.getLong("QNOMATCH");

                    objRtn.lngTotQTYTRNX = QTYTRNX;
                    objRtn.lngTotQNMATCH = QNOMATCH;
                    //objRtn.dblTotAUTAMOUNT = AUTAMOUNT;
                    objRtn.dblTotOPEAMOUNT = OPEAMOUNT;
                    objRtn.dblTotIVA = IVA;

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

    public List<A2331Filter> loadPX404SQP01884(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");
        hmDescSTVAL.put("6", "Reverse Chargeback");
        HashMap hmDescUse = new HashMap();
        hmDescUse.put("F", "Flown");
        hmDescUse.put("I", "Interline Flown");
        hmDescUse.put("E", "Exchange");
        hmDescUse.put("R", "Refund");
        hmDescUse.put("D", "Discharge");
        hmDescUse.put("", "No Use");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }

        } catch (Exception e) {
            filter.MERCHN = "";
        }

        long QTKT = 0, TOTCUP = 0;
        double AUTAMOUNT = 0, VFOP = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01884(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.SENTDATE.trim());
            cstmt.setString(6, filter.IN_CARDC.trim());
            //cstmt.setString(5, filter.IN_CARDN.trim());
            cstmt.setString(7, filter.IN_CARDN1.trim());
            cstmt.setString(8, filter.IN_CARDN2.trim());
            cstmt.setString(9, filter.MERCHN.trim());
            cstmt.setString(10, filter.IN_AGENT.trim());
            cstmt.setString(11, filter.IN_AUTHNBR.trim());
            cstmt.setString(12, filter.STVAL.trim());
            cstmt.setString(13, filter.DATES.trim());
            cstmt.setString(14, filter.CODEBANK.trim());
            cstmt.setString(15, filter.IN_COUNTRY.trim());
            cstmt.setString(16, filter.DATEN.trim());
            cstmt.setString(17, filter.IN_TCARD.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                TOTCUP = rs01.getLong("TOTCUP");
                QTKT = rs01.getLong("QTKT");
                AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                VFOP = rs01.getDouble("VFOP");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    //objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_MERCHN = filter.IN_MERCHN;
                    objRtn.IN_AGENT = filter.IN_AGENT;
                    objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                    objRtn.IN_CODEBANK = filter.IN_CODEBANK;
                    objRtn.IN_TCARD = filter.IN_TCARD;
                    objRtn.CODEBANK = filter.CODEBANK;
                    objRtn.strFormatDate = filter.SENTDATE.trim();
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY.trim();

                    objRtn.pos = 1;
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.SEQNUM = rs01.getString("SEQNUM").trim();
                    objRtn.NUMREFER = rs01.getString("NUMREFER").trim();
                    objRtn.SQCRFILE = rs01.getString("SQCRFILE").trim();
                    objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                    objRtn.DATES = rs01.getString("DATES").trim();
                    if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                        objRtn.MERCHN = rs01.getString("MERCHN").trim();
                        objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    } else {
                        objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                        objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                    }
                    objRtn.FOLIO = rs01.getString("FOLIO").trim();
                    objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                    objRtn.CODMOTI = rs01.getString("CODMOTI").trim();
                    objRtn.CLINAME = rs01.getString("CLINAME").trim();
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.DATEN = rs01.getString("DATEN").trim();
                    objRtn.STSND = rs01.getString("STSND").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    if (objRtn.STSND.trim().equals("1")) {
                        objRtn.STSND = "Bank Notice";
                    }
                    objRtn.AGENTE = rs01.getString("AGENTE").trim();
                    objRtn.strDescription1 = rs01.getString("desAGENTE").trim();
                    objRtn.STUSO = rs01.getString("STUSO").trim();
                    objRtn.TOTCUP = rs01.getInt("TOTCUP");
                    objRtn.strCANAL = rs01.getString("CANAL").trim();
                    if (objRtn.strCANAL.trim().equals("WEB") || objRtn.strCANAL.trim().equals("CCT")) {
                        objRtn.strFlag = "CC";
                    } else if (objRtn.MERCHNAM.trim().toUpperCase().contains("CALL CENT")) {
                        objRtn.strFlag = "CC";
                    }

                    if (!objRtn.STUSO.trim().isEmpty()) {
                        switch (objRtn.STUSO.trim().length()) {
                            case 4:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                objRtn.strUsoCpn3 = rs01.getString("STUSO").trim().substring(2, 3);
                                objRtn.strUsoCpn4 = rs01.getString("STUSO").trim().substring(3, 4);
                                break;
                            case 3:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                objRtn.strUsoCpn3 = rs01.getString("STUSO").trim().substring(2, 3);
                                break;
                            case 2:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                break;
                            case 1:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                break;
                        }
                    }
                    try {
                        objRtn.strDescUsoCpn1 = hmDescUse.get(objRtn.strUsoCpn1).toString();
                        objRtn.strDescUsoCpn2 = hmDescUse.get(objRtn.strUsoCpn2).toString();
                        objRtn.strDescUsoCpn3 = hmDescUse.get(objRtn.strUsoCpn3).toString();
                        objRtn.strDescUsoCpn4 = hmDescUse.get(objRtn.strUsoCpn4).toString();
                    } catch (Exception e) {
                    }
                    objRtn.CCIA = rs01.getString("CCIA").trim();
                    objRtn.FORMA = rs01.getString("FORMA").trim();
                    objRtn.SERIE = rs01.getString("SERIE").trim();
                    objRtn.strTicket = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                    objRtn.VFOP = rs01.getDouble("VFOP");
                    objRtn.LINKDATE = rs01.getString("LINKDATE").trim();
                    objRtn.LINKHORA = rs01.getString("LINKHORA").trim();
                    objRtn.RUTA = rs01.getString("RUTA").trim();
                    if (!objRtn.RUTA.trim().isEmpty()) {
                        objRtn.strImgLink = "Y";
                    }

                    if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                        //Enmascarando
                        if (objRtn.SCARCOD.trim().equals("AX")) {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                        } else {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                        }

                    } else {
                        objRtn.strDescripcion = objRtn.CARDNBR;
                    }
                    objRtn.strDescStatus = hmDescSTVAL.get(objRtn.STVAL).toString();

                    objRtn.lngTotDocs = QTKT;
                    objRtn.lngTotTOTCUP = TOTCUP;
                    objRtn.dblTotAUTAMOUNT = AUTAMOUNT;
                    objRtn.dblTotVFOP = VFOP;

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
    
    public List<A2331Filter> loadPX404SQP01947(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");
        hmDescSTVAL.put("6", "Reverse Chargeback");
        HashMap hmDescUse = new HashMap();
        hmDescUse.put("F", "Flown");
        hmDescUse.put("I", "Interline Flown");
        hmDescUse.put("E", "Exchange");
        hmDescUse.put("R", "Refund");
        hmDescUse.put("D", "Discharge");
        hmDescUse.put("", "No Use");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        long QTKT = 0, TOTCUP = 0;
        double AUTAMOUNT = 0, VFOP = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01947_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.SENTDATE.trim());
            cstmt.setString(6, filter.IN_CARDC.trim());
            cstmt.setString(7, filter.IN_CARDN1.trim());
            cstmt.setString(8, filter.IN_CARDN2.trim());
            cstmt.setString(9, filter.MERCHN.trim());
            cstmt.setString(10, filter.IN_AGENT.trim());
            cstmt.setString(11, filter.IN_AUTHNBR.trim());
            cstmt.setString(12, filter.STVAL.trim());
            cstmt.setString(13, filter.DATES.trim());
            cstmt.setString(14, filter.CODEBANK.trim());
            cstmt.setString(15, filter.IN_COUNTRY.trim());
            cstmt.setString(16, filter.IN_TCARD.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                TOTCUP = rs01.getLong("TOTCUP");
                QTKT = rs01.getLong("QTKT");
                AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                VFOP = rs01.getDouble("VFOP");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_MERCHN = filter.IN_MERCHN;
                    objRtn.IN_AGENT = filter.IN_AGENT;
                    objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                    objRtn.IN_CODEBANK = filter.IN_CODEBANK;
                    objRtn.CODEBANK = filter.CODEBANK;
                    objRtn.IN_TCARD = filter.IN_TCARD;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;

                    objRtn.pos = 1;
                    objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                    objRtn.DATES = rs01.getString("DATES").trim();
                    if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                        objRtn.MERCHN = rs01.getString("MERCHN").trim();
                        objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    } else {
                        objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                        objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                    }
                    objRtn.FOLIO = rs01.getString("FOLIO").trim();
                    objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.DATEN = rs01.getString("DATEN").trim();
                    objRtn.STSND = rs01.getString("STSND").trim();
                    if (objRtn.STSND.trim().equals("1")) {
                        objRtn.STSND = "Bank Notice";
                    }
                    objRtn.STUSO = rs01.getString("STUSO").trim();
                    objRtn.VFOP = rs01.getDouble("VFOP");
                    objRtn.LINKDATE = rs01.getString("LINKDATE").trim();
                    objRtn.LINKHORA = rs01.getString("LINKHORA").trim();
                    objRtn.RUTA = rs01.getString("RUTA").trim();
                    if (!objRtn.RUTA.trim().isEmpty()) {
                        objRtn.strImgLink = "Y";
                    }

                    if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                        //Enmascarando
                        if (objRtn.SCARCOD.trim().equals("AX")) {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                        } else {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                        }
                    } else {
                        objRtn.strDescripcion = objRtn.CARDNBR;
                    }
                    objRtn.strDescStatus = hmDescSTVAL.get(objRtn.STVAL).toString();

                    objRtn.lngTotDocs = QTKT;
                    objRtn.lngTotTOTCUP = TOTCUP;
                    objRtn.dblTotAUTAMOUNT = AUTAMOUNT;
                    objRtn.dblTotVFOP = VFOP;

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

    public List<A2331Filter> loadPX404SQP01916(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");
        hmDescSTVAL.put("6", "Reverse Chargeback");
        HashMap hmDescUse = new HashMap();
        hmDescUse.put("F", "Flown");
        hmDescUse.put("I", "Interline Flown");
        hmDescUse.put("E", "Exchange");
        hmDescUse.put("R", "Refund");
        hmDescUse.put("D", "Discharge");
        hmDescUse.put("", "No Use");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
//            if ("DATEN".equals(filter.IN_DATE)) {
//                filter.SENTDATE = filter.DATEN;
//            } 
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        long QTKT = 0, TOTCUP = 0;
        double AUTAMOUNT = 0, VFOP = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01916_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());

            cstmt.setString(5, filter.SENTDATE.trim());
            cstmt.setString(6, filter.IN_CARDC.trim());
            cstmt.setString(7, filter.IN_CARDN1.trim());
            cstmt.setString(8, filter.IN_CARDN2.trim());
            cstmt.setString(9, filter.MERCHN.trim());
            cstmt.setString(10, filter.IN_AGENT.trim());
            cstmt.setString(11, filter.IN_AUTHNBR.trim());
            cstmt.setString(12, filter.STVAL.trim());
            cstmt.setString(13, filter.DATEN.trim());
            cstmt.setString(14, filter.CODEBANK.trim());
            cstmt.setString(15, filter.IN_COUNTRY.trim());
            cstmt.setString(16, filter.IN_TCARD.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                TOTCUP = rs01.getLong("TOTCUP");
                QTKT = rs01.getLong("QTKT");
                AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                VFOP = rs01.getDouble("VFOP");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_MERCHN = filter.IN_MERCHN;
                    objRtn.IN_AGENT = filter.IN_AGENT;
                    objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                    objRtn.IN_CODEBANK = filter.IN_CODEBANK;
                    objRtn.IN_TCARD = filter.IN_TCARD;
                    objRtn.CODEBANK = filter.CODEBANK;
                    objRtn.strFormatDate = filter.SENTDATE;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;

                    objRtn.CCIAEX = rs01.getString("CCIAEX").trim();
                    objRtn.FORMAEX = rs01.getString("FORMAEX").trim();
                    objRtn.SERIEEX = rs01.getString("SERIEEX").trim();

                    objRtn.TKTEXCH = objRtn.CCIAEX + objRtn.FORMAEX + objRtn.SERIEEX;

                    objRtn.pos = 1;
                    objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                    objRtn.DATES = rs01.getString("DATES").trim();
                    if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                        objRtn.MERCHN = rs01.getString("MERCHN").trim();
                        objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    } else {
                        objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                        objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                    }
                    objRtn.FOLIO = rs01.getString("FOLIO").trim();
                    objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.DATEN = rs01.getString("DATEN").trim();
                    objRtn.STSND = rs01.getString("STSND").trim();
                    if (objRtn.STSND.trim().equals("1")) {
                        objRtn.STSND = "Bank Notice";
                    }
                    objRtn.AGENTE = rs01.getString("AGENTE").trim();
                    objRtn.TOTCUP = rs01.getInt("TOTCUP");
                    objRtn.STUSO = rs01.getString("STUSO").trim();

                    if (!objRtn.STUSO.trim().isEmpty()) {
                        switch (objRtn.STUSO.trim().length()) {
                            case 4:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                objRtn.strUsoCpn3 = rs01.getString("STUSO").trim().substring(2, 3);
                                objRtn.strUsoCpn4 = rs01.getString("STUSO").trim().substring(3, 4);
                                break;
                            case 3:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                objRtn.strUsoCpn3 = rs01.getString("STUSO").trim().substring(2, 3);
                                break;
                            case 2:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                break;
                            case 1:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                break;
                        }
                    }
                    try {
                        objRtn.strDescUsoCpn1 = hmDescUse.get(objRtn.strUsoCpn1).toString();
                        objRtn.strDescUsoCpn2 = hmDescUse.get(objRtn.strUsoCpn2).toString();
                        objRtn.strDescUsoCpn3 = hmDescUse.get(objRtn.strUsoCpn3).toString();
                        objRtn.strDescUsoCpn4 = hmDescUse.get(objRtn.strUsoCpn4).toString();
                    } catch (Exception e) {
                    }
                    //==========================================================
                    objRtn.STUSOS = rs01.getString("STUSOS").trim();

                    if (!objRtn.STUSOS.trim().isEmpty()) {
                        switch (objRtn.STUSOS.trim().length()) {
                            case 4:
                                objRtn.strUsoCpnF1 = rs01.getString("STUSOS").trim().substring(0, 1);
                                objRtn.strUsoCpnF2 = rs01.getString("STUSOS").trim().substring(1, 2);
                                objRtn.strUsoCpnF3 = rs01.getString("STUSOS").trim().substring(2, 3);
                                objRtn.strUsoCpnF4 = rs01.getString("STUSOS").trim().substring(3, 4);
                                break;
                            case 3:
                                objRtn.strUsoCpnF1 = rs01.getString("STUSOS").trim().substring(0, 1);
                                objRtn.strUsoCpnF2 = rs01.getString("STUSOS").trim().substring(1, 2);
                                objRtn.strUsoCpnF3 = rs01.getString("STUSOS").trim().substring(2, 3);
                                break;
                            case 2:
                                objRtn.strUsoCpnF1 = rs01.getString("STUSOS").trim().substring(0, 1);
                                objRtn.strUsoCpnF2 = rs01.getString("STUSOS").trim().substring(1, 2);
                                break;
                            case 1:
                                objRtn.strUsoCpnF1 = rs01.getString("STUSOS").trim().substring(0, 1);
                                break;
                        }
                    }
                    try {
                        objRtn.strDescUsoCpnF1 = hmDescUse.get(objRtn.strUsoCpnF1).toString();
                        objRtn.strDescUsoCpnF2 = hmDescUse.get(objRtn.strUsoCpnF2).toString();
                        objRtn.strDescUsoCpnF3 = hmDescUse.get(objRtn.strUsoCpnF3).toString();
                        objRtn.strDescUsoCpnF4 = hmDescUse.get(objRtn.strUsoCpnF4).toString();
                    } catch (Exception e) {
                    }

                    //==========================================================
                    objRtn.INDCPNS = rs01.getString("INDCPNS").trim();

                    if (!objRtn.INDCPNS.trim().isEmpty()) {
                        switch (objRtn.INDCPNS.trim().length()) {
                            case 4:
                                objRtn.strIndSabCpn1 = rs01.getString("INDCPNS").trim().substring(0, 1);
                                objRtn.strIndSabCpn2 = rs01.getString("INDCPNS").trim().substring(1, 2);
                                objRtn.strIndSabCpn3 = rs01.getString("INDCPNS").trim().substring(2, 3);
                                objRtn.strIndSabCpn4 = rs01.getString("INDCPNS").trim().substring(3, 4);
                                break;
                            case 3:
                                objRtn.strIndSabCpn1 = rs01.getString("INDCPNS").trim().substring(0, 1);
                                objRtn.strIndSabCpn2 = rs01.getString("INDCPNS").trim().substring(1, 2);
                                objRtn.strIndSabCpn3 = rs01.getString("INDCPNS").trim().substring(2, 3);
                                break;
                            case 2:
                                objRtn.strIndSabCpn1 = rs01.getString("INDCPNS").trim().substring(0, 1);
                                objRtn.strIndSabCpn2 = rs01.getString("INDCPNS").trim().substring(1, 2);
                                break;
                            case 1:
                                objRtn.strIndSabCpn1 = rs01.getString("INDCPNS").trim().substring(0, 1);
                                break;
                        }
                    }
                    try {
                        objRtn.strDesIndSabCpn1 = hmDescUse.get(objRtn.strIndSabCpn1).toString();
                        objRtn.strDesIndSabCpn2 = hmDescUse.get(objRtn.strIndSabCpn2).toString();
                        objRtn.strDesIndSabCpn3 = hmDescUse.get(objRtn.strIndSabCpn3).toString();
                        objRtn.strDesIndSabCpn4 = hmDescUse.get(objRtn.strIndSabCpn4).toString();
                    } catch (Exception e) {
                    }

                    objRtn.CCIA = rs01.getString("CCIA").trim();
                    objRtn.FORMA = rs01.getString("FORMA").trim();
                    objRtn.SERIE = rs01.getString("SERIE").trim();
                    objRtn.strTicket = rs01.getString("CCIA").trim() + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                    objRtn.VFOP = rs01.getDouble("VFOP");
                    objRtn.LINKDATE = rs01.getString("LINKDATE").trim();
                    objRtn.LINKHORA = rs01.getString("LINKHORA").trim();
                    objRtn.RUTA = rs01.getString("RUTA").trim();
                    if (!objRtn.RUTA.trim().isEmpty()) {
                        objRtn.strImgLink = "Y";
                    }
                    if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                        //Enmascarando
                        if (objRtn.SCARCOD.trim().equals("AX")) {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                        } else {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                        }
                    } else {
                        objRtn.strDescripcion = objRtn.CARDNBR;
                    }
                    objRtn.strDescStatus = hmDescSTVAL.get(objRtn.STVAL).toString();

                    objRtn.lngTotDocs = QTKT;
                    objRtn.lngTotTOTCUP = TOTCUP;
                    objRtn.dblTotAUTAMOUNT = AUTAMOUNT;
                    objRtn.dblTotVFOP = VFOP;

                    objRtn.FSELEC = rs01.getString("FSELEC");
                    objRtn.strFlag = rs01.getString("desFSELEC");
                    objRtn.FECSELEC = rs01.getString("FECSELEC");
                    objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.FECSELEC);

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

    public List<A2331Filter> loadPX404SQP01896(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        long QTYTRNX = 0;
        double AUTAMOUNT = 0, OPEAMOUNT = 0, IVA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01896(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.APLIDATE.trim());
            cstmt.setString(4, filter.IN_CARDC.trim());
            //cstmt.setString(5, filter.IN_CARDN.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.MERCHN.trim());
            cstmt.setString(8, filter.IN_AUTHNBR.trim());
            cstmt.setString(9, filter.CODEBANK.trim());
            cstmt.setString(10, filter.STVAL.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                QTYTRNX = rs01.getLong("QTYTRNX");
                AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                OPEAMOUNT = rs01.getDouble("OPEAMOUNT");
                IVA = rs01.getDouble("IVA");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    //objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_MERCHN = filter.IN_MERCHN;
                    objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                    objRtn.IN_CODEBANK = filter.IN_CODEBANK;

                    objRtn.strDescStatus = filter.strDescStatus;
                    objRtn.STVAL = filter.STVAL;

                    objRtn.APLIDATE = rs01.getString("APLIDATE").trim();
                    objRtn.CONCEPT = rs01.getString("CONCEPT").trim();
                    objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.SQCRFILE = rs01.getString("SQCRFILE").trim();
                    objRtn.SENTDATE = rs01.getString("REMEDATE").trim();
                    /*  objRtn.STVAL = rs01.getString("STVAL").trim();
                     if(rs01.getString("STVAL").trim().equals("1")){
                     objRtn.strDescStatus ="ChargeBack";
                     }else if(rs01.getString("STVAL").trim().equals("2")){
                     objRtn.strDescStatus ="Notice Without Clarification";
                     }else if(rs01.getString("STVAL").trim().equals("5")){
                     objRtn.strDescStatus ="Reverse ChargeBack - Pending";
                     }else if(rs01.getString("STVAL").trim().equals("6")){
                     objRtn.strDescStatus ="Reverse ChargeBack - Applied";
                     }else{
                     objRtn.strDescStatus=objRtn.STVAL;
                     }
                     }*/
                    if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                        //Enmascarando
                        if (objRtn.SCARCOD.trim().equals("AX")) {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                        } else {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                        }
                    } else {
                        objRtn.strDescripcion = objRtn.CARDNBR;
                    }
                    if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                        objRtn.MERCHN = rs01.getString("MERCHN").trim();
                        objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    } else {
                        objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                        objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                    }
                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    objRtn.QTYTRNX = rs01.getLong("QTYTRNX");

                    if (rs01.getString("CCIA") != null && !rs01.getString("CCIA").trim().equals("-")) {

                        objRtn.AUTAMOUNT = rs01.getDouble("VFOP");
                        objRtn.CCIA = rs01.getString("CCIA").trim();
                        objRtn.FORMA = rs01.getString("FORMA").trim();
                        objRtn.SERIE = rs01.getString("SERIE").trim();
                        objRtn.strTicket = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                        objRtn.AGENTE = rs01.getString("AGENTE").trim();
                        objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                        objRtn.STUSO = rs01.getString("STUSO").trim();
                        objRtn.STUSOS = rs01.getString("STUSOS").trim();

                        if (!objRtn.STUSOS.trim().isEmpty()) {
                            switch (objRtn.STUSOS.trim().length()) {
                                case 4:
                                    objRtn.strUsoCpn1 = rs01.getString("STUSOS").trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = rs01.getString("STUSOS").trim().substring(1, 2);
                                    objRtn.strUsoCpn3 = rs01.getString("STUSOS").trim().substring(2, 3);
                                    objRtn.strUsoCpn4 = rs01.getString("STUSOS").trim().substring(3, 4);
                                    break;
                                case 3:
                                    objRtn.strUsoCpn1 = rs01.getString("STUSOS").trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = rs01.getString("STUSOS").trim().substring(1, 2);
                                    objRtn.strUsoCpn3 = rs01.getString("STUSOS").trim().substring(2, 3);
                                    break;
                                case 2:
                                    objRtn.strUsoCpn1 = rs01.getString("STUSOS").trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = rs01.getString("STUSOS").trim().substring(1, 2);
                                    break;
                                case 1:
                                    objRtn.strUsoCpn1 = rs01.getString("STUSOS").trim().substring(0, 1);
                                    break;
                            }
                        } else if (!objRtn.STUSO.trim().isEmpty()) {
                            switch (objRtn.STUSO.trim().length()) {
                                case 4:
                                    objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                    objRtn.strUsoCpn3 = rs01.getString("STUSO").trim().substring(2, 3);
                                    objRtn.strUsoCpn4 = rs01.getString("STUSO").trim().substring(3, 4);
                                    break;
                                case 3:
                                    objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                    objRtn.strUsoCpn3 = rs01.getString("STUSO").trim().substring(2, 3);
                                    break;
                                case 2:
                                    objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                    break;
                                case 1:
                                    objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                    break;
                            }
                        }
                    }

                    /*
                     objRtn.NATURE = rs01.getString("NATURE").trim();
                     objRtn.REMESA = rs01.getString("REMESA").trim();
                     objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                     objRtn.FSELEC = rs01.getString("FSELEC").trim();
                     objRtn.FECSELEC = rs01.getString("FECSELEC").trim();
                     objRtn.SQCRFILE = rs01.getString("SQCRFILE").trim();

                     objRtn.OPEAMOUNT = rs01.getDouble("OPEAMOUNT");
                     objRtn.IVA = rs01.getDouble("IVA");*/
                    objRtn.lngTotQTYTRNX = QTYTRNX;
                    objRtn.dblTotAUTAMOUNT = AUTAMOUNT;
                    objRtn.dblTotOPEAMOUNT = OPEAMOUNT;
                    objRtn.dblTotIVA = IVA;

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

    public List<A2331Filter> loadPX404SQP03286(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        HashMap hmCard = new HashMap();

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        long QTYTRNX = 0;
        double AUTAMOUNT = 0, OPEAMOUNT = 0, IVA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03286(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.APLIDATE.trim());
            cstmt.setString(4, filter.IN_CARDC.trim());
            //cstmt.setString(5, filter.IN_CARDN.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.MERCHN.trim());
            cstmt.setString(8, filter.IN_AUTHNBR.trim());
            cstmt.setString(9, filter.CODEBANK.trim());
            cstmt.setString(10, filter.STVAL.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                QTYTRNX = rs01.getLong("QTYTRNX");
                AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                OPEAMOUNT = rs01.getDouble("OPEAMOUNT");
                IVA = rs01.getDouble("IVA");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    //objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_MERCHN = filter.IN_MERCHN;
                    objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                    objRtn.IN_CODEBANK = filter.IN_CODEBANK;

                    objRtn.strDescStatus = filter.strDescStatus;
                    objRtn.STVAL = filter.STVAL;

                    objRtn.APLIDATE = rs01.getString("APLIDATE").trim();
                    objRtn.CONCEPT = rs01.getString("CONCEPT").trim();
                    objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.SQCRFILE = rs01.getString("SQCRFILE").trim();
                    objRtn.SENTDATE = rs01.getString("REMEDATE").trim();
                    if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                        //Enmascarando
                        if (objRtn.SCARCOD.trim().equals("AX")) {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                        } else {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                        }
                    } else {
                        objRtn.strDescripcion = objRtn.CARDNBR;
                    }
                    if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                        objRtn.MERCHN = rs01.getString("MERCHN").trim();
                        objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    } else {
                        objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                        objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                    }
                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    objRtn.QTYTRNX = rs01.getLong("QTYTRNX");

                    if (rs01.getString("CCIA") != null && !rs01.getString("CCIA").trim().equals("-")
                            && !objRtn.AUTHNBR.trim().isEmpty()) {

                        objRtn.AUTAMOUNT = rs01.getDouble("SVFOP");
                        objRtn.CCIA = rs01.getString("CCIA").trim();
                        objRtn.FORMA = rs01.getString("FORMA").trim();
                        objRtn.SERIE = rs01.getString("SERIE").trim();
                        objRtn.strTicket = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                        objRtn.AGENTE = rs01.getString("SAGENT").trim();
                        objRtn.SALEDATE = rs01.getString("SDATE").trim();
                        //objRtn.STUSO = rs01.getString("STUSO").trim();
                        //objRtn.STUSOS = rs01.getString("STUSOS").trim();

                        //======================================================
                        //LLAMANDO A COBOL PARA OBTENER LOS USOS ===============
                        cstmt = cnx.prepareCall("{CALL PRAXIS.SPRUT01556(?)}");
                        cstmt.setString(1, rs01.getString("CCIA").trim() + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim() + "1" + "00");
                        cstmt.registerOutParameter(1, Types.CHAR);
                        cstmt.execute();

                        String strUso = cstmt.getString(1);
                        objRtn.STUSOS = Functions.fillString(strUso, 20).substring(16);//1392112974443100F   

                        if (!objRtn.STUSOS.trim().isEmpty()) {
                            switch (objRtn.STUSOS.trim().length()) {
                                case 4:
                                    objRtn.strUsoCpn1 = objRtn.STUSOS.trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = objRtn.STUSOS.trim().substring(1, 2);
                                    objRtn.strUsoCpn3 = objRtn.STUSOS.trim().substring(2, 3);
                                    objRtn.strUsoCpn4 = objRtn.STUSOS.trim().substring(3, 4);
                                    break;
                                case 3:
                                    objRtn.strUsoCpn1 = objRtn.STUSOS.trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = objRtn.STUSOS.trim().substring(1, 2);
                                    objRtn.strUsoCpn3 = objRtn.STUSOS.trim().substring(2, 3);
                                    break;
                                case 2:
                                    objRtn.strUsoCpn1 = objRtn.STUSOS.trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = objRtn.STUSOS.trim().substring(1, 2);
                                    break;
                                case 1:
                                    objRtn.strUsoCpn1 = objRtn.STUSOS.trim().substring(0, 1);
                                    break;
                            }
                        } else if (!objRtn.STUSO.trim().isEmpty()) {
                            switch (objRtn.STUSO.trim().length()) {
                                case 4:
                                    objRtn.strUsoCpn1 = objRtn.STUSO.trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = objRtn.STUSO.trim().substring(1, 2);
                                    objRtn.strUsoCpn3 = objRtn.STUSO.trim().substring(2, 3);
                                    objRtn.strUsoCpn4 = objRtn.STUSO.trim().substring(3, 4);
                                    break;
                                case 3:
                                    objRtn.strUsoCpn1 = objRtn.STUSO.trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = objRtn.STUSO.trim().substring(1, 2);
                                    objRtn.strUsoCpn3 = objRtn.STUSO.trim().substring(2, 3);
                                    break;
                                case 2:
                                    objRtn.strUsoCpn1 = objRtn.STUSO.trim().substring(0, 1);
                                    objRtn.strUsoCpn2 = objRtn.STUSO.trim().substring(1, 2);
                                    break;
                                case 1:
                                    objRtn.strUsoCpn1 = objRtn.STUSO.trim().substring(0, 1);
                                    break;
                            }
                        }
                    }

                    objRtn.lngTotQTYTRNX = QTYTRNX;
                    objRtn.dblTotAUTAMOUNT = AUTAMOUNT;
                    objRtn.dblTotOPEAMOUNT = OPEAMOUNT;
                    objRtn.dblTotIVA = IVA;

                    if (!hmCard.containsKey(objRtn.CARDNBR + objRtn.AUTHNBR + objRtn.strTicket)) {
                        //PARA EVITAR REPETIDOS EN LAS TARJETAS CON AUTORIZACION EN BLANCO
                        list.add(objRtn);
                        hmCard.put(objRtn.CARDNBR + objRtn.AUTHNBR + objRtn.strTicket, objRtn.CARDNBR + objRtn.AUTHNBR + objRtn.strTicket);
                    }

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
    
    public List<A2331Filter> loadPX404SQP01949(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        long QTYTRNX = 0;
        double AUTAMOUNT = 0, OPEAMOUNT = 0, IVA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01949_1(?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.APLIDATE.trim());
            cstmt.setString(6, filter.IN_CARDC.trim());
            cstmt.setString(7, filter.IN_CARDN1.trim());
            cstmt.setString(8, filter.IN_CARDN2.trim());
            cstmt.setString(9, filter.MERCHN.trim());
            cstmt.setString(10, filter.IN_AUTHNBR.trim());
            cstmt.setString(11, filter.CODEBANK.trim());
            cstmt.setString(12, filter.STVAL.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                QTYTRNX = rs01.getLong("QTYTRNX");
                AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                OPEAMOUNT = rs01.getDouble("OPEAMOUNT");
                IVA = rs01.getDouble("IVA");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_CARDC = filter.IN_CARDC;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_MERCHN = filter.IN_MERCHN;
                    objRtn.IN_AUTHNBR = filter.IN_AUTHNBR;
                    objRtn.CODEBANK = filter.CODEBANK;
                    objRtn.STVAL = filter.STVAL;

                    objRtn.APLIDATE = rs01.getString("APLIDATE").trim();
                    objRtn.CONCEPT = rs01.getString("CONCEPT").trim();
                    objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                        //Enmascarando
                        if (objRtn.SCARCOD.trim().equals("AX")) {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                        } else {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                        }
                    } else {
                        objRtn.strDescripcion = objRtn.CARDNBR;
                    }
                    objRtn.MERCHN = rs01.getString("MERCHN").trim();
                    objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    objRtn.QTYTRNX = rs01.getLong("QTYTRNX");
                    objRtn.SENTDATE = rs01.getString("REMEDATE").trim();
                    objRtn.OPEAMOUNT = rs01.getDouble("OPEAMOUNT");
                    objRtn.IVA = rs01.getDouble("IVA");

                    objRtn.lngTotQTYTRNX = QTYTRNX;
                    objRtn.dblTotAUTAMOUNT = AUTAMOUNT;
                    objRtn.dblTotOPEAMOUNT = OPEAMOUNT;
                    objRtn.dblTotIVA = IVA;

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

    public List<A2331Filter> loadPX404SQP01948(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        String strTkts = "", strKey = "", strUso = "";
        HashMap hmTkts = new HashMap();
        HashMap hmUse = new HashMap();
        HashMap hmTktsCant = new HashMap();
        int cantTkt = 0;

        /*HashMap hmDescUse = new HashMap();
         hmDescUse.put("F", "Flown");
         hmDescUse.put("I", "Interline Flown");
         hmDescUse.put("E", "Exchange");
         hmDescUse.put("R", "Refund");
         hmDescUse.put("D", "Discharge");
         hmDescUse.put("", "No Use");*/
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01948(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_CARDC.trim());
            cstmt.setString(6, filter.IN_CARDN1.trim());
            cstmt.setString(7, filter.IN_CARDN2.trim());
            cstmt.setString(8, filter.IN_MERCHN.trim());
            cstmt.setString(9, filter.IN_AGENT.trim());
            cstmt.setString(10, filter.IN_AUTHNBR.trim());
            cstmt.setString(11, filter.IN_STVAL.trim());
            cstmt.setString(12, filter.IN_CODEBANK.trim());
            cstmt.setString(13, filter.IN_COUNTRY.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                strTkts = "";
                strUso = "";
                strKey = rs01.getString("SENTDATE").trim() + rs01.getString("MERCHN").trim()
                        + rs01.getString("SALEDATE").trim() + rs01.getString("CARDNBR").trim()
                        + rs01.getString("AUTHNBR").trim();
                if (hmTkts.containsKey(strKey)) {
                    cantTkt++;
                    strTkts = hmTkts.get(strKey).toString() + ", " + rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                    strUso = hmUse.get(strKey).toString() + ", " + rs01.getString("STUSO").trim();
                    hmTkts.put(strKey, strTkts);
                    hmUse.put(strKey, strUso);
                    hmTktsCant.put(strKey, cantTkt);
                } else {
                    strTkts = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                    strUso = rs01.getString("STUSO").trim();
                    cantTkt = 1;
                    if (strTkts.trim().isEmpty()) {
                        cantTkt = 0;
                        strTkts = "No Tickets found.";
                        strUso = "No Use";
                    }
                    hmTkts.put(strKey, strTkts);
                    hmUse.put(strKey, strUso);
                    hmTktsCant.put(strKey, cantTkt);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();

                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.pos = 1;
                    objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                    if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                        objRtn.MERCHN = rs01.getString("MERCHN").trim();
                        objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    } else {
                        objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                        objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                    }
                    objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                    objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                        //Enmascarando
                        try {
                            if (objRtn.SCARCOD.trim().equals("AX")) {
                                objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                            } else {
                                objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                            }
                        } catch (Exception e) {
                            objRtn.strDescripcion = rs01.getString("CARDNBR");
                        }
                    } else {
                        objRtn.strDescripcion = objRtn.CARDNBR;
                    }
                    objRtn.CODMOTI = rs01.getString("CODMOTI");
                    objRtn.CLINAME = rs01.getString("CLINAME");
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT"); //// VFOP
                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.FOLIO = rs01.getString("FOLIO").trim();
                    try {
                        objRtn.strFormatDate = Functions.getFechaenTexto(Functions.sumXDaystoDate(objRtn.SENTDATE, 10));
                    } catch (Exception e) {
                        objRtn.strFormatDate = "";
                    }
                    objRtn.AGENTE = rs01.getString("AGENTE").trim();

                    strKey = rs01.getString("SENTDATE").trim() + rs01.getString("MERCHN").trim()
                            + rs01.getString("SALEDATE").trim() + rs01.getString("CARDNBR").trim()
                            + rs01.getString("AUTHNBR").trim();

                    if (hmTktsCant.containsKey(strKey)) {
                        cantTkt = Integer.parseInt(hmTktsCant.get(strKey).toString());
                        if (cantTkt > 10) {
                            String[] partsTkt = hmTkts.get(strKey).toString().split(",");
                            String[] partsUso = hmUse.get(strKey).toString().split(",");
                            int diez = 0;
                            strTkts = "";
                            strUso = "";
                            for (int a = 0; a < partsTkt.length; a++) {
                                if (diez == 10) {
                                    try {
                                        objRtn.strTicket = strTkts;
                                        objRtn.STUSO = strUso;
                                    } catch (Exception e) {
                                        objRtn.strTicket = "";
                                        objRtn.STUSO = "";
                                    }
                                    list.add(objRtn);
                                    strTkts = partsTkt[a] + ",";
                                    strUso = partsUso[a] + ",";
                                    diez = 1;

                                } else {
                                    diez++;
                                    strTkts += partsTkt[a] + ",";
                                    strUso += partsUso[a] + ",";
                                }
                            }
                            if (!strTkts.trim().isEmpty()) {
                                try {
                                    objRtn.strTicket = strTkts;
                                    objRtn.STUSO = strUso;
                                } catch (Exception e) {
                                    objRtn.strTicket = "";
                                    objRtn.STUSO = "";
                                }
                                list.add(objRtn);
                            }
                        } else {
                            try {
                                objRtn.strTicket = hmTkts.get(strKey).toString();
                                objRtn.STUSO = hmUse.get(strKey).toString();
                            } catch (Exception e) {
                                objRtn.strTicket = "";
                                objRtn.STUSO = "";
                            }
                            list.add(objRtn);
                        }
                    } else {
                        try {
                            objRtn.strTicket = hmTkts.get(strKey).toString();
                            objRtn.STUSO = hmUse.get(strKey).toString();
                        } catch (Exception e) {
                            objRtn.strTicket = "";
                            objRtn.STUSO = "";
                        }
                        list.add(objRtn);
                    }
                    /*System.out.println("SENTDATE : " + objRtn.SENTDATE + " *** MERCHN : " + objRtn.MERCHN + " *** SALEDATE : " + objRtn.SALEDATE 
                     + " *** strDescripcion : " + objRtn.strDescripcion + " *** AUTAMOUNT : " + objRtn.AUTAMOUNT 
                     + " *** AUTHNBR : " + objRtn.AUTHNBR + " *** FOLIO : " + objRtn.FOLIO + " *** strFormatDate : " + objRtn.strFormatDate 
                     + " *** MERCHNAM : " + objRtn.MERCHNAM + " *** strTicket : " + objRtn.strTicket + " *** AGENTE : " + objRtn.AGENTE 
                     + " *** STUSO : " + objRtn.STUSO);*/
                }
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

    public List<A2331Filter> loadPX404SQP03648(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        String strTkts = "", strKey = "", strUso = "";
        HashMap hmTkts = new HashMap();
        HashMap hmUse = new HashMap();
        HashMap hmSaleDate = new HashMap();

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03648(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_CARDC.trim());
            cstmt.setString(6, filter.IN_CARDN1.trim());
            cstmt.setString(7, filter.IN_CARDN2.trim());
            cstmt.setString(8, filter.IN_MERCHN.trim());
            cstmt.setString(9, filter.IN_AUTHNBR.trim());
            cstmt.setString(10, filter.IN_CODEBANK.trim());
            cstmt.execute();


            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
 /*cell0.setCellValue(bean.MERCHNAM);
                cell1.setCellValue(bean.MERCHN);

                cell2.setCellValue(bean.AUTAMOUNT);
                cell3.setCellValue(bean.APLIDATE);
                cell4.setCellValue(bean.CONCEPT);
                cell5.setCellValue(bean.strDescripcion);
                cell6.setCellValue(bean.strTicket);
                cell7.setCellValue(bean.STUSOS);
                cell8.setCellValue(bean.SALEDATE);
                cell9.setCellValue(bean.FECR);
                cell10.setCellValue(bean.strDescBank);

                if (bean.strCANAL.equals("CCT")) {
                    //CALL CENTER
                    dblTotCC += bean.AUTAMOUNT;
                } else {
                    //WEB
                    dblTotWEB += bean.AUTAMOUNT;
                }
                quiebreHoja = bean.SCARCOD.trim();
                quiebreCanal = bean.strCANAL.trim();*/

                objRtn = new A2331Filter();
                objRtn.pos = 1;
                objRtn.strTicket = rs01.getString("TKTS").trim();
                objRtn.STUSOS = rs01.getString("STUSOS").trim();
                if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                    objRtn.MERCHN = rs01.getString("MERCHN").trim();
                    objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                } else {
                    objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                    objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                }
                objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                objRtn.strDescCard = rs01.getString("NAMECAR").trim();
                objRtn.strCANAL = rs01.getString("CANAL").trim();
                objRtn.strTitulo = rs01.getString("desCANAL").trim();
    //                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                objRtn.strDescBank = rs01.getString("NAMEBANK").trim();
                objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                objRtn.APLIDATE = rs01.getString("APLIDATE").trim();
                objRtn.CONCEPT = rs01.getString("CONCEPT").trim();
                objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                    //Enmascarando
                    if (objRtn.SCARCOD.trim().equals("AX")) {
                        objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                    } else {
                        objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                    }
                } else {
                    objRtn.strDescripcion = objRtn.CARDNBR;
                }
    //                    objRtn.SENTDATE = rs01.getString("REMEDATE").trim();
    //                    try {
    //                        objRtn.strFormatDate = Functions.getFechaenTexto(Functions.sumXDaystoDate(objRtn.SENTDATE, 10));
    //                    } catch (Exception e) {
    //                    }
    //                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                objRtn.FECR = Functions.getFechaActual();

//                strKey = rs01.getString("SCARCOD").trim() + rs01.getString("CANAL").trim() + rs01.getString("CODEBANK").trim()
//                        + rs01.getString("REMEDATE").trim() + rs01.getString("MERCHN").trim()
//                        + rs01.getString("CARDNBR").trim() + rs01.getString("AUTHNBR").trim();
//                try {
//                    if (hmTkts.containsKey(strKey)) {
//                        objRtn.strTicket = hmTkts.get(strKey).toString();
//                    } else {
//                        objRtn.strTicket = "No Tickets found.";
//                    }
//                    if (hmUse.containsKey(strKey)) {
//                        objRtn.STUSOS = hmUse.get(strKey).toString();
//                    } else {
//                        objRtn.STUSOS = "No Use";
//                    }
//                    if (hmSaleDate.containsKey(strKey)) {
//                        objRtn.SALEDATE = hmSaleDate.get(strKey).toString();
//                    }
//                } catch (Exception e) {
//                }
                list.add(objRtn);
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
    
    public HashMap loadPX404SQP01917(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        List<String> lstEmails = new ArrayList<String>();
        A2331Filter objRtn;
        HashMap hmResult = new HashMap();

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01917_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.SENTDATE.trim());
            cstmt.setString(6, filter.IN_CARDC.trim());
            cstmt.setString(7, filter.IN_CARDN1.trim());
            cstmt.setString(8, filter.IN_CARDN2.trim());
            cstmt.setString(9, filter.MERCHN.trim());
            cstmt.setString(10, filter.IN_AGENT.trim());
            cstmt.setString(11, filter.IN_AUTHNBR.trim());
            cstmt.setString(12, filter.STVAL.trim());
            cstmt.setString(13, filter.IN_CODEBANK.trim());
            cstmt.setString(14, filter.TCARD);
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                objRtn = new A2331Filter();
                objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                objRtn.MERCHN = rs01.getString("MERCHN").trim();
                objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                objRtn.RUTA = rs01.getString("RUTA").trim();
                objRtn.FOLIO = rs01.getString("FOLIO").trim();
                objRtn.IATADATE = rs01.getString("IATADATE").trim();
                objRtn.DATES = rs01.getString("DATES").trim();
                objRtn.SCOUNTRY = rs01.getString("TCARD").trim();
                objRtn.TCARD = rs01.getString("TCARD").trim();
                objRtn.STVAL = filter.STVAL.trim();
                list.add(objRtn);
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    try {
                        lstEmails.add(rs01.getString("CREMP").trim().replace("-", ""));
                    } catch (Exception e) {
                    }
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

            hmResult.put("LISTA", list);
            hmResult.put("EMAIL", lstEmails);

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

        return hmResult;
    }

    public String loadPX404SQP01900(A2331Filter filter, String option) throws SQLException, Exception {

        String strMsj = "";
        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01900(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SENTDATE.trim());
            cstmt.setString(3, filter.MERCHN.trim());
            cstmt.setString(4, filter.CARDNBR.trim());
            cstmt.setString(5, filter.AUTHNBR.trim());
            cstmt.setString(6, filter.STVAL.trim());
            cstmt.setString(7, session.getUserView().getUserInfo().USR);
            cstmt.setString(8, Functions.getFechaActual());
            cstmt.setString(9, Functions.getHoraActual());
            cstmt.setString(10, option.trim());
            cstmt.setString(11, filter.FOLIO.trim());
            cstmt.setString(12, filter.TCARD);
            cstmt.setString(13, "");
            cstmt.execute();

            strMsj = cstmt.getString(13);

        } catch (Exception e) {
            strMsj = "ERROR:" + e.getMessage();
            e.printStackTrace();
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

        return strMsj;
    }

    public List<A2331Filter> loadPX404SQP01899(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01899_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.SENTDATE.trim());
            cstmt.setString(6, filter.IN_CARDC.trim());
            cstmt.setString(7, filter.IN_CARDN1.trim());
            cstmt.setString(8, filter.IN_CARDN2.trim());
            cstmt.setString(9, filter.MERCHN.trim());
            cstmt.setString(10, filter.IN_AGENT.trim());
            cstmt.setString(11, filter.IN_AUTHNBR.trim());
            cstmt.setString(12, filter.STVAL.trim());
            cstmt.setString(13, filter.IN_CODEBANK.trim());
            cstmt.setString(14, filter.TCARD);
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                objRtn = new A2331Filter();
                objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                objRtn.MERCHN = rs01.getString("MERCHN").trim();
                objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                objRtn.RUTA = rs01.getString("RUTA").trim();
                objRtn.FOLIO = rs01.getString("FOLIO").trim();
                objRtn.IATADATE = rs01.getString("IATADATE").trim();
                objRtn.DATES = rs01.getString("DATES").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.TCARD = rs01.getString("TCARD");
                objRtn.STVAL = filter.STVAL.trim();
                objRtn.strCANAL = rs01.getString("CANAL").trim();
                if (objRtn.strCANAL.trim().equals("WEB") || objRtn.strCANAL.trim().equals("CCT")) {
                    objRtn.strFlag = "CC";
                } else if (objRtn.MERCHNAM.trim().toUpperCase().contains("CALL CENT")) {
                    objRtn.strFlag = "CC";
                }
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

    public A2331Filter loadPX404SQP01945(A2331Filter filter) throws SQLException, Exception {

        A2331Filter beanAcla = new A2331Filter();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01945(?,?,?,?,?,?,?)}";

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SENTDATE.trim());
            cstmt.setString(3, filter.MERCHN.trim());
            cstmt.setString(4, filter.CARDNBR.trim());
            cstmt.setString(5, filter.AUTHNBR.trim());
            cstmt.setString(6, filter.NUMREFER.trim());
            cstmt.setString(7, filter.FOLIO.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {

                beanAcla.SENTDATE = rst.getString("SENTDATE").trim();
                beanAcla.DATEN = rst.getString("DATEN").trim();
                if (!rst.getString("MERCHN").trim().isEmpty()) {
                    beanAcla.MERCHN = rst.getString("MERCHN").trim();
                    beanAcla.MERCHNAM = rst.getString("MERCHNAM").trim();
                } else {
                    beanAcla.MERCHN = rst.getString("NAMEBANK").trim();
                    beanAcla.MERCHNAM = rst.getString("NAMEBANK").trim();
                }
                //beanAcla.strDescMerchn = rst.getString("NMERCHN").trim();
                beanAcla.CARDNBR = rst.getString("CARDNBR").trim();
                beanAcla.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("CARDNBR").trim(), "");
                beanAcla.AUTHNBR = rst.getString("AUTHNBR").trim();
                beanAcla.NUMREFER = rst.getString("NUMREFER").trim();
                beanAcla.SQCRFILE = rst.getString("SQCRFILE").trim();
                beanAcla.STVAL = rst.getString("STVAL").trim();
                beanAcla.FOLIO = rst.getString("FOLIO").trim();
                beanAcla.CODEBANK = rst.getString("CODEBANK").trim();
                beanAcla.SCARCOD = rst.getString("SCARCOD").trim();
                beanAcla.SALEDATE = rst.getString("SALEDATE").trim();
                beanAcla.AUTAMOUNT = rst.getDouble("AUTAMOUNT");
                beanAcla.CLINAME = rst.getString("CLINAME").trim();
                beanAcla.AGENTE = rst.getString("AGENTE").trim();
                beanAcla.TOTCUP = rst.getInt("TOTCUP");
                beanAcla.IATADATE = rst.getString("IATADATE").trim();
                beanAcla.DATES = rst.getString("DATES").trim();
                beanAcla.LINKDATE = rst.getString("LINKDATE").trim();
                beanAcla.LINKHORA = rst.getString("LINKHORA").trim();
                beanAcla.RUTA = rst.getString("RUTA").trim();
                beanAcla.CERROR = rst.getString("CERROR").trim();
                beanAcla.strDescBank = rst.getString("NAMEBANK").trim();
                beanAcla.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanAcla.strDescError = rst.getString("CERROR").trim() + " - " + rst.getString("DESCERROR").trim();

                beanAcla.USCR = rst.getString("USCR").trim();
                beanAcla.FECR = rst.getString("FECR").trim();
                beanAcla.HOCR = rst.getString("HOCR").trim();
                beanAcla.USUP = rst.getString("USUP").trim();
                beanAcla.FEUP = rst.getString("FEUP").trim();
                beanAcla.HOUP = rst.getString("HOUP").trim();

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

        return beanAcla;
    }

    public A2331Filter loadPX404SQP01979(A2331Filter filter) throws SQLException, Exception {

        A2331Filter beanAcla = new A2331Filter();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01979(?,?,?,?,?,?)}";

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SENTDATE.trim());
            cstmt.setString(3, filter.MERCHN.trim());
            cstmt.setString(4, filter.CARDNBR.trim());
            cstmt.setString(5, filter.AUTHNBR.trim());
            cstmt.setString(6, filter.SQCRFILE.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {

                beanAcla.CCUST = rst.getString("CCUST").trim();
                beanAcla.STVAL = rst.getString("STVAL").trim();
                if (!rst.getString("MERCHN").trim().isEmpty()) {
                    beanAcla.MERCHN = rst.getString("MERCHN").trim();
                    beanAcla.MERCHNAM = rst.getString("MERCHNAM").trim();
                } else {
                    beanAcla.MERCHN = rst.getString("NAMEBANK").trim();
                    beanAcla.MERCHNAM = rst.getString("NAMEBANK").trim();
                }
                beanAcla.AUTAMOUNT = rst.getDouble("AUTAMOUNT");
                beanAcla.OPEAMOUNT = rst.getDouble("OPEAMOUNT");
                beanAcla.IVA = rst.getDouble("IVA");
                beanAcla.APLIDATE = rst.getString("APLIDATE").trim();
                beanAcla.NATURE = rst.getString("NATURE").trim();
                beanAcla.CONCEPT = rst.getString("CONCEPT").trim();
                beanAcla.QTYTRNX = rst.getInt("QTYTRNX");

                beanAcla.REMESA = rst.getString("REMESA").trim();
                beanAcla.SENTDATE = rst.getString("REMEDATE").trim();
                beanAcla.strFlag = rst.getString("REMETIPO").trim();
                beanAcla.FOLIO = rst.getString("REMEFOLIO").trim();
                beanAcla.CODEBANK = rst.getString("CODEBANK").trim();
                beanAcla.strDescBank = rst.getString("NAMEBANK").trim();
                beanAcla.SCARCOD = rst.getString("SCARCOD").trim();
                beanAcla.CARDNBR = rst.getString("CARDNBR").trim();
                beanAcla.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("CARDNBR").trim(), "");
                beanAcla.AUTHNBR = rst.getString("AUTHNBR").trim();
                beanAcla.FSELEC = rst.getString("FSELEC").trim();
                beanAcla.FECSELEC = rst.getString("FECSELEC").trim();
                beanAcla.SQCRFILE = rst.getString("SQCRFILE").trim();

                beanAcla.USCR = rst.getString("USCR").trim();
                beanAcla.FECR = rst.getString("FECR").trim();
                beanAcla.HOCR = rst.getString("HOCR").trim();
                beanAcla.USUP = rst.getString("USUP").trim();
                beanAcla.FEUP = rst.getString("FEUP").trim();
                beanAcla.HOUP = rst.getString("HOUP").trim();

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

        return beanAcla;
    }
    
    public A2331Filter loadPX405SQP01958(A2331Filter filter) throws SQLException, Exception {

        A2331Filter objRtn = new A2331Filter();
        String tkt="";
        String strTkt = "", strPNR = "", strDesc = "", msj = "", strAuthor = "", strPAX = "", strSENTDATE = "";//, strSEQNUM = ""
        String strSCARCOD = "", strSCARDN = "", strMERCHN = "", strMERCHNAM = "", strSALEDATE = "", strFOLIO = "", strAGENTE="", STUSO ="";
        //String strCANAL = "", strFLAG = "", strRuta = "", strImageLink = "";
        double dblAUTAMOUNT = 0;
        int i = 0;
        boolean hayData = false, hayVenta = false;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        HashMap hmPNR = new HashMap();
        HashMap hmAutho = new HashMap();
        HashMap hmPAX = new HashMap();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01958_1(?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SALEDATE.trim());
            cstmt.setString(3, filter.CARDNBR.trim());
            cstmt.setString(4, filter.AUTHNBR.trim());
            cstmt.setString(5, filter.MERCHN.trim());
            cstmt.setString(6, filter.FOLIO.trim());
            cstmt.setString(7, filter.SENTDATE.trim());
            //cstmt.setString(7, filter.SEQNUM.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                hayData = true;
                //if (i == 0) { COMENTADO 20180226
                //if(rs01.getString("TPDOC").trim().startsWith("TKT")){ //COMENTADO 20180227
                strAGENTE = rs01.getString("AGENTE").trim();
                strSENTDATE = rs01.getString("SENTDATE").trim();
                //strSEQNUM = rs01.getString("SEQNUM").trim();
                strSCARDN = rs01.getString("CARDNBR").trim();
                strSCARCOD = rs01.getString("SCARCOD").trim();
                strSALEDATE = rs01.getString("SALEDATE").trim();
                strMERCHNAM = rs01.getString("MERCHNAM").trim();
                strMERCHN = rs01.getString("MERCHN").trim();
                //A RAIZ DEL CAMBIO EN LA GENERACION DE LAS ACLARACIONES, EL MONTO SE TOMARÁ DEL PRIMER REGISTRO 20190520 DOMINIQUE
                if (i == 0) {
                    dblAUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                }
                if (strMERCHNAM.trim().isEmpty()) {
                    strMERCHNAM = rs01.getString("NMERCHN").trim();
                }
                strFOLIO = rs01.getString("FOLIO").trim();
                //==============================================================
                
                tkt = rs01.getString("CCIA").trim() + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                STUSO =rs01.getString("STUSO");
                if (!rs01.getString("RUTA0").trim().isEmpty() && !rs01.getString("PAX").trim().equals("")) {
                    hayVenta = true;
                    /*objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                     objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                     if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                     //Enmascarando
                     if (objRtn.SCARCOD.trim().equals("AX")) {
                     objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                     } else {
                     objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                     }
                     } else {
                     objRtn.strDescripcion = objRtn.CARDNBR;
                     }
                     objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                     objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                     objRtn.MERCHN = rs01.getString("MERCHN").trim();
                     objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                     if (objRtn.MERCHNAM.trim().isEmpty()) {
                     objRtn.MERCHNAM = rs01.getString("NMERCHN").trim();
                     }
                    objRtn.FOLIO = rs01.getString("FOLIO").trim();*/
                    objRtn.RUTA = rs01.getString("RUTA").trim();
                    if (!objRtn.RUTA.trim().isEmpty()) {
                        objRtn.strImgLink = "Y";
                    }
                    objRtn.strCANAL = rs01.getString("CANAL").trim();
                    if (objRtn.strCANAL.trim().equals("WEB") || objRtn.strCANAL.trim().equals("CCT")) {
                        objRtn.strFlag = "CC";
                    } else if (objRtn.MERCHNAM.trim().toUpperCase().contains("CALL CENT")) {
                        objRtn.strFlag = "CC";
                    }

                    if (rs01.getString("NOMTARHAB") != null && !rs01.getString("NOMTARHAB").trim().equals("-")) {
                        objRtn.NOMTARHAB = rs01.getString("NOMTARHAB").trim().replaceAll("\"", "*").replaceAll(",", " ").replaceAll("'", "*");
                        objRtn.COMMENT = rs01.getString("COMMENT").trim().replaceAll("\"", "*").replaceAll(",", " ").replaceAll("'", "*").replaceAll("  ", " ");
                        objRtn.USCR = rs01.getString("USCR").trim();
                        objRtn.FECR = rs01.getString("FECR").trim();
                        objRtn.HOCR = rs01.getString("HOCR").trim();
                        objRtn.USUP = rs01.getString("USUP").trim();
                        objRtn.FEUP = rs01.getString("FEUP").trim();
                        objRtn.HOUP = rs01.getString("HOUP").trim();
                    }
                    objRtn.strDireccion = "Aeropuerto " + rs01.getString("DIRECCION").trim();
                    //objRtn.PAX = rs01.getString("PAX").trim();
                    objRtn.FVLO1 = rs01.getString("FVLO1").trim();
                    objRtn.FVLO2 = rs01.getString("FVLO2").trim();
                    objRtn.FVLO3 = rs01.getString("FVLO3").trim();
                    objRtn.FVLO4 = rs01.getString("FVLO4").trim();
                    objRtn.RUTA0 = rs01.getString("RUTA0").trim();
                    objRtn.RUTA1 = rs01.getString("RUTA1").trim();
                    objRtn.RUTA2 = rs01.getString("RUTA2").trim();
                    objRtn.RUTA3 = rs01.getString("RUTA3").trim();
                    objRtn.RUTA4 = rs01.getString("RUTA4").trim();
                    strDesc = Functions.FormatFecha(objRtn.FVLO1, "yyyyMMdd", "ddMMMyy") + " " + objRtn.RUTA0 + objRtn.RUTA1;
                    if(STUSO.substring(0, 1).equals("F")){
                        strDesc = strDesc + "(" + getSeats(tkt,"1",objRtn.FVLO1) + ")";
                    }
                    if (!objRtn.FVLO2.isEmpty()) {
                        strDesc += " / " + Functions.FormatFecha(objRtn.FVLO2, "yyyyMMdd", "ddMMMyy") + " " + objRtn.RUTA1 + objRtn.RUTA2;
                        if(STUSO.substring(1, 2).equals("F")){
                            strDesc = strDesc + "(" + getSeats(tkt,"2",objRtn.FVLO2) + ")";
                        }
                    }
                    if (!objRtn.FVLO3.isEmpty()) {
                        strDesc += " / " + Functions.FormatFecha(objRtn.FVLO3, "yyyyMMdd", "ddMMMyy") + " " + objRtn.RUTA2 + objRtn.RUTA3;
                        if(STUSO.substring(2, 3).equals("F")){
                            strDesc = strDesc + "(" + getSeats(tkt,"3",objRtn.FVLO3) + ")";
                        }
                    }
                    if (!objRtn.FVLO4.isEmpty()) {
                        strDesc += " / " + Functions.FormatFecha(objRtn.FVLO4, "yyyyMMdd", "ddMMMyy") + " " + objRtn.RUTA3 + objRtn.RUTA4;
                        if(STUSO.substring(3, 4).equals("F")){
                            strDesc = strDesc + "(" + getSeats(tkt,"4",objRtn.FVLO4) + ")";
                        }
                    }
                }
                //==============================================================
//                tkt = rs01.getString("CCIA").trim() + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
//                if(rs01.getString("STUSO").trim().contains("F")){
//                    String[] fechasVLO = {objRtn.FVLO1, objRtn.FVLO2, objRtn.FVLO3, objRtn.FVLO4};
//                    
//                    String TktSeat = tkt;
//                    String cupon ="";
//
//                    TktSeat = TktSeat + "(" ;
//
//                    for (int S = 0; S < 4; S++) {
//                        String flagVolado = rs01.getString("STUSO").substring(S,S+1).trim();
//                        if(flagVolado.trim().equals("F")){
//                            cupon = "" + (S+1);
//                            TktSeat = TktSeat + flagVolado+cupon + ":" + getSeats(tkt,cupon,fechasVLO[S]) + "-";
//                        }
//                    }
//                    TktSeat = TktSeat + ")" ;
//                    strTkt += TktSeat.replace("-)", ")") +  ", ";
//                }else{
//                    
//                }
                strTkt += tkt + ", ";
                if (!hmAutho.containsKey(rs01.getString("AUTHNBR").trim())) {
                    strAuthor += rs01.getString("AUTHNBR").trim() + ", ";
                }
                if (!hmPNR.containsKey(rs01.getString("PNR").trim())) {
                    strPNR += rs01.getString("PNR").trim() + ", ";
                }
                //VALIDACION QUITADA A PEDIDO DE AM/JUGAZ UAT 20171117
                /*//if(rs01.getString("TPDOC").trim().startsWith("TKT")){
                 strPAX += rs01.getString("PAX").trim() + ", ";
                 //}*/
                if (!hmPAX.containsKey(rs01.getString("PAX").trim())) {
                    strPAX += rs01.getString("PAX").trim() + ", ";
                }
                hmAutho.put(rs01.getString("AUTHNBR").trim(), rs01.getString("AUTHNBR").trim());
                hmPNR.put(rs01.getString("PNR").trim(), rs01.getString("PNR").trim());
                hmPAX.put(rs01.getString("PAX").trim(), rs01.getString("PAX").trim());
                i++;

            }

            if (hayData) {

                //objRtn.SEQNUM = strSEQNUM;
                objRtn.AGENTE = strAGENTE;
                objRtn.SENTDATE = strSENTDATE;
                objRtn.CARDNBR = strSCARDN;
                objRtn.SCARCOD = strSCARCOD;
                if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                    //Enmascarando
                    if (objRtn.SCARCOD.trim().equals("AX")) {
                        objRtn.strDescripcion = strSCARDN.substring(0, 6) + "*****" + strSCARDN.substring(11);
                    } else {
                        objRtn.strDescripcion = strSCARDN.substring(0, 6) + "******" + strSCARDN.substring(12);
                    }
                } else {
                    objRtn.strDescripcion = objRtn.CARDNBR;
                }
                objRtn.SALEDATE = strSALEDATE;
                objRtn.MERCHNAM = strMERCHNAM;
                objRtn.MERCHN = strMERCHN;
                objRtn.AUTAMOUNT = dblAUTAMOUNT;
                //==============================================================
                if(objRtn.strDireccion.trim().isEmpty()){
                    objRtn.strDireccion = "REVISAR COMENTARIOS.";
                }
                if(objRtn.FVLO1.trim().isEmpty()){
                    objRtn.FVLO1 = "REVISAR COMENTARIOS.";
                }
                if(strTkt.trim().isEmpty()){
                    objRtn.strTicket = "TICKETS NO ENCONTRADOS";
                }else{
                    objRtn.strTicket = strTkt;
                }
                if(strAuthor.trim().isEmpty()){
                    objRtn.AUTHNBR = "REVISAR COMENTARIOS.";
                }else{
                    objRtn.AUTHNBR = strAuthor;
                }
                if(strPNR.trim().isEmpty()){
                    objRtn.PNR = "REVISAR COMENTARIOS.";
                }else{
                    objRtn.PNR = strPNR;
                }
                if(strPAX.trim().isEmpty()){
                    objRtn.PAX = "REVISAR COMENTARIOS.";
                }else{
                    objRtn.PAX = strPAX;
                }
                if(strDesc.trim().isEmpty()){
                    objRtn.strDescStatus = strPNR + "  " + "REVISAR COMENTARIOS.";
                }else{
                    objRtn.strDescStatus = strPNR + "  " + strDesc;
                }
                objRtn.FOLIO = strFOLIO;

            } else {
                msj = "Error. Information not found";
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
            e.printStackTrace();
            msj = "ERROR: " + e.getMessage();
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
        objRtn.strDescError = msj;

        return objRtn;
    }

    public String getSeats(String tkt, String cupon, String fechaVLO) throws Exception{
        String seat ="";
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03768(?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, tkt);
            cstmt.setString(3, cupon);
            cstmt.setString(4, fechaVLO);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                seat = rs01.getString("CHAIR");
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

        return seat;
    }
    
    public List<A2331Filter> loadPX404SQP02000(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        String strTkts = "", strKey = "", strUso = "";
        HashMap hmTkts = new HashMap();
        HashMap hmUse = new HashMap();
        HashMap hmSaleDate = new HashMap();

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02000(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_CARDC.trim());
            cstmt.setString(6, filter.IN_CARDN1.trim());
            cstmt.setString(7, filter.IN_CARDN2.trim());
            cstmt.setString(8, filter.IN_MERCHN.trim());
            cstmt.setString(9, filter.IN_AUTHNBR.trim());
            cstmt.setString(10, filter.IN_CODEBANK.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                strTkts = "";
                strUso = "";
                strKey = rs01.getString("SCARCOD").trim() + rs01.getString("CANAL").trim() + rs01.getString("CODEBANK").trim()
                        + rs01.getString("REMEDATE").trim() + rs01.getString("MERCHN").trim()
                        + rs01.getString("CARDNBR").trim() + rs01.getString("AUTHNBR").trim();

                if (hmTkts.containsKey(strKey)) {
                    if (!rs01.getString("CCIA").trim().isEmpty()) {
                        strTkts = hmTkts.get(strKey).toString() + ", " + rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                        hmTkts.put(strKey, strTkts);
                    }
                } else {
                    if (!rs01.getString("CCIA").trim().isEmpty()) {
                        strTkts = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                        hmTkts.put(strKey, strTkts);
                    }
                }
                if (hmUse.containsKey(strKey)) {
                    if (!rs01.getString("STUSOS").trim().isEmpty()) {
                        strUso = hmUse.get(strKey).toString() + ", " + rs01.getString("STUSOS").trim();
                        hmUse.put(strKey, strUso);
                    }
                } else {
                    if (!rs01.getString("STUSOS").trim().isEmpty()) {
                        strUso = rs01.getString("STUSOS").trim();
                        hmUse.put(strKey, strUso);
                    }
                }
                hmSaleDate.put(strKey, rs01.getString("SALEDATE").trim());
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();

                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.pos = 1;
                    if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                        objRtn.MERCHN = rs01.getString("MERCHN").trim();
                        objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    } else {
                        objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                        objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                    }
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.strDescCard = rs01.getString("NAMECAR").trim();
                    objRtn.strCANAL = rs01.getString("CANAL").trim();
                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.strDescBank = rs01.getString("NAMEBANK").trim();
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    objRtn.APLIDATE = rs01.getString("APLIDATE").trim();
                    objRtn.CONCEPT = rs01.getString("CONCEPT").trim();
                    objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                    if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                        //Enmascarando
                        if (objRtn.SCARCOD.trim().equals("AX")) {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                        } else {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                        }
                    } else {
                        objRtn.strDescripcion = objRtn.CARDNBR;
                    }
                    objRtn.SENTDATE = rs01.getString("REMEDATE").trim();
                    try {
                        objRtn.strFormatDate = Functions.getFechaenTexto(Functions.sumXDaystoDate(objRtn.SENTDATE, 10));
                    } catch (Exception e) {
                    }
                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.FECR = Functions.getFechaActual();

                    strKey = rs01.getString("SCARCOD").trim() + rs01.getString("CANAL").trim() + rs01.getString("CODEBANK").trim()
                            + rs01.getString("REMEDATE").trim() + rs01.getString("MERCHN").trim()
                            + rs01.getString("CARDNBR").trim() + rs01.getString("AUTHNBR").trim();
                    try {
                        if (hmTkts.containsKey(strKey)) {
                            objRtn.strTicket = hmTkts.get(strKey).toString();
                        } else {
                            objRtn.strTicket = "No Tickets found.";
                        }
                        if (hmUse.containsKey(strKey)) {
                            objRtn.STUSOS = hmUse.get(strKey).toString();
                        } else {
                            objRtn.STUSOS = "No Use";
                        }
                        if (hmSaleDate.containsKey(strKey)) {
                            objRtn.SALEDATE = hmSaleDate.get(strKey).toString();
                        }
                    } catch (Exception e) {
                    }
                    list.add(objRtn);
                }
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

    public List<A2331Filter> loadPX404SQP03306(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        String strTkts = "", strKey = "", strUso = "";
        HashMap hmTkts = new HashMap();
        HashMap hmUse = new HashMap();
        HashMap hmSaleDate = new HashMap();

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03306(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_CARDC.trim());
            cstmt.setString(6, filter.IN_CARDN1.trim());
            cstmt.setString(7, filter.IN_CARDN2.trim());
            cstmt.setString(8, filter.IN_MERCHN.trim());
            cstmt.setString(9, filter.IN_AUTHNBR.trim());
            cstmt.setString(10, filter.IN_CODEBANK.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                strTkts = "";
                strUso = "";
                strKey = rs01.getString("SCARCOD").trim() + rs01.getString("CANAL").trim() + rs01.getString("CODEBANK").trim()
                        + rs01.getString("REMEDATE").trim() + rs01.getString("MERCHN").trim()
                        + rs01.getString("CARDNBR").trim() + rs01.getString("AUTHNBR").trim();

                if (hmTkts.containsKey(strKey)) {
                    if (!rs01.getString("CCIA").trim().isEmpty()) {
                        strTkts = hmTkts.get(strKey).toString() + ", " + rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                        hmTkts.put(strKey, strTkts);
                    }
                } else {
                    if (!rs01.getString("CCIA").trim().isEmpty()) {
                        strTkts = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                        hmTkts.put(strKey, strTkts);
                    }
                }
                if (hmUse.containsKey(strKey)) {
                    if (!rs01.getString("STUSOS").trim().isEmpty()) {
                        strUso = hmUse.get(strKey).toString() + ", " + rs01.getString("STUSOS").trim();
                        hmUse.put(strKey, strUso);
                    }
                } else {
                    if (!rs01.getString("STUSOS").trim().isEmpty()) {
                        strUso = rs01.getString("STUSOS").trim();
                        hmUse.put(strKey, strUso);
                    }
                }
                hmSaleDate.put(strKey, rs01.getString("SALEDATE").trim());
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();

                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.pos = 1;
                    if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                        objRtn.MERCHN = rs01.getString("MERCHN").trim();
                        objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    } else {
                        objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                        objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                    }
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.strDescCard = rs01.getString("NAMECAR").trim();
                    objRtn.strCANAL = rs01.getString("CANAL").trim();
                    objRtn.strTitulo = rs01.getString("desCANAL").trim();
                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.strDescBank = rs01.getString("NAMEBANK").trim();
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    objRtn.APLIDATE = rs01.getString("APLIDATE").trim();
                    objRtn.CONCEPT = rs01.getString("CONCEPT").trim();
                    objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                    if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                        //Enmascarando
                        if (objRtn.SCARCOD.trim().equals("AX")) {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                        } else {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                        }
                    } else {
                        objRtn.strDescripcion = objRtn.CARDNBR;
                    }
                    objRtn.SENTDATE = rs01.getString("REMEDATE").trim();
                    try {
                        objRtn.strFormatDate = Functions.getFechaenTexto(Functions.sumXDaystoDate(objRtn.SENTDATE, 10));
                    } catch (Exception e) {
                    }
                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.FECR = Functions.getFechaActual();

                    strKey = rs01.getString("SCARCOD").trim() + rs01.getString("CANAL").trim() + rs01.getString("CODEBANK").trim()
                            + rs01.getString("REMEDATE").trim() + rs01.getString("MERCHN").trim()
                            + rs01.getString("CARDNBR").trim() + rs01.getString("AUTHNBR").trim();
                    try {
                        if (hmTkts.containsKey(strKey)) {
                            objRtn.strTicket = hmTkts.get(strKey).toString();
                        } else {
                            objRtn.strTicket = "No Tickets found.";
                        }
                        if (hmUse.containsKey(strKey)) {
                            objRtn.STUSOS = hmUse.get(strKey).toString();
                        } else {
                            objRtn.STUSOS = "No Use";
                        }
                        if (hmSaleDate.containsKey(strKey)) {
                            objRtn.SALEDATE = hmSaleDate.get(strKey).toString();
                        }
                    } catch (Exception e) {
                    }
                    list.add(objRtn);
                }
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
    
    public String loadPX404SQP01946(A2331Filter filter) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "Operation was successful.";
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01946(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SENTDATE.trim());
            cstmt.setString(3, filter.MERCHN.trim());
            cstmt.setString(4, filter.MERCHNAM.trim());
            cstmt.setString(5, filter.CARDNBR.trim());
            cstmt.setString(6, filter.AUTHNBR.trim());
            cstmt.setString(7, filter.NUMREFER.trim());
            cstmt.setString(8, filter.SQCRFILE.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.FOLIO.trim());
            cstmt.setString(11, filter.CODEBANK.trim());
            cstmt.setString(12, filter.SCARCOD.trim());
            cstmt.setString(13, filter.SALEDATE.trim());
            cstmt.setDouble(14, filter.AUTAMOUNT);
            cstmt.setString(15, filter.CLINAME.trim());
            cstmt.setString(16, filter.AGENTE.trim());
            cstmt.setInt(17, filter.TOTCUP);
            cstmt.setString(18, filter.IATADATE.trim());
            cstmt.setString(19, filter.DATES.trim());
            cstmt.setString(20, filter.CERROR.trim());
            cstmt.setString(21, session.getUserView().getUserInfo().USR);
            cstmt.setString(22, Functions.getFechaActual());
            cstmt.setString(23, Functions.getHoraActual());
            cstmt.execute();

        } catch (Exception e) {
            e.printStackTrace();
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

        return strMsj;
    }

    public String loadPX404SQP02078(A2331Filter filter) throws SQLException, Exception {

        String strMsj = "";
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02078(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(15, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.SENTDATE.trim());
            cstmt.setString(4, filter.MERCHN.trim());
            cstmt.setString(5, filter.CARDNBR.trim());
            cstmt.setString(6, filter.AUTHNBR.trim());
            cstmt.setString(7, filter.NUMREFER.trim());
            cstmt.setString(8, filter.CCIA.trim());
            cstmt.setString(9, filter.FORMA.trim());
            cstmt.setString(10, filter.SERIE.trim());
            cstmt.setString(11, filter.SQCRFILE.trim());
            cstmt.setString(12, session.getUserView().getUserInfo().USR);
            cstmt.setString(13, Functions.getFechaActual());
            cstmt.setString(14, Functions.getHoraActual());
            cstmt.setString(15, "");
            cstmt.execute();

            strMsj = cstmt.getString(15);

            if (!strMsj.contains("ERROR")) {
                strMsj = "Clarification successfully deleted.";
            }

        } catch (Exception e) {
            strMsj = "ERROR:" + e.getMessage();
            e.printStackTrace();
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

        return strMsj;
    }

    public List<ExcelChargeBack> loadPX404SQP03580(A2331Filter filter,String TRFND) throws SQLException, Exception {

        List<ExcelChargeBack> list = new ArrayList<ExcelChargeBack>();
        ExcelChargeBack objRtn;
        String strTkts = "", strKey = "", strUso = "";
        HashMap hmTkts = new HashMap();
        HashMap hmUse = new HashMap();
        HashMap hmSaleDate = new HashMap();

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03580(?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, TRFND);

            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                objRtn = new ExcelChargeBack();
//                CCIA,FORMA,SERIE,NUMREFER,AGENTE,MFOP,TDOC,TPDOC,SALEDATE
                objRtn.CCIA = rs01.getString("CCIA");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                objRtn.strTicket = objRtn.CCIA + objRtn.FORMA + objRtn.SERIE;
                objRtn.NUMREFER = rs01.getString("NUMREFER");
                objRtn.AGENTE = rs01.getString("AGENTE");
                objRtn.MFOP = rs01.getString("MFOP");
                objRtn.TDOC = rs01.getString("TDOC");
                objRtn.TPDOC = rs01.getString("TPDOC");
                objRtn.SALEDATE = rs01.getString("SALEDATE");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.SALEDATE);

                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.A1531CFOP1 = rs01.getString("A1531CFOP1");
                objRtn.A1531TFOP1 = rs01.getString("A1531TFOP1");
                objRtn.A1531NREF1 = rs01.getString("A1531NREF1");
                objRtn.A1531VFOP1 = rs01.getDouble("A1531VFOP1");
                objRtn.A1531CFOP2 = rs01.getString("A1531CFOP2");
                objRtn.A1531TFOP2 = rs01.getString("A1531TFOP2");
                objRtn.A1531NREF2 = rs01.getString("A1531NREF2");
                objRtn.A1531VFOP2 = rs01.getDouble("A1531VFOP2");

                objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A720MDAPAG = rs01.getString("A720MDAPAG");
                objRtn.A720TRFPAG = rs01.getDouble("A720TRFPAG");

                objRtn.CTAX1 = rs01.getString("CTAX1");
                objRtn.ATO1 = rs01.getString("ATO1");
                objRtn.VTAX1 = rs01.getDouble("VTAX1");
                objRtn.CTAX2 = rs01.getString("CTAX2");
                objRtn.ATO2 = rs01.getString("ATO2");
                objRtn.VTAX2 = rs01.getDouble("VTAX2");
                objRtn.CTAX3 = rs01.getString("CTAX3");
                objRtn.ATO3 = rs01.getString("ATO3");
                objRtn.VTAX3 = rs01.getDouble("VTAX3");
                objRtn.CTAX4 = rs01.getString("CTAX4");
                objRtn.ATO4 = rs01.getString("ATO4");
                objRtn.VTAX4 = rs01.getDouble("VTAX4");
                objRtn.CTAX5 = rs01.getString("CTAX5");
                objRtn.ATO5 = rs01.getString("ATO5");
                objRtn.VTAX5 = rs01.getDouble("VTAX5");
                objRtn.CTAX6 = rs01.getString("CTAX6");
                objRtn.ATO6 = rs01.getString("ATO6");
                objRtn.VTAX6 = rs01.getDouble("VTAX6");
                objRtn.CTAX7 = rs01.getString("CTAX7");
                objRtn.ATO7 = rs01.getString("ATO7");
                objRtn.VTAX7 = rs01.getDouble("VTAX7");
                objRtn.CTAX8 = rs01.getString("CTAX8");
                objRtn.ATO8 = rs01.getString("ATO8");
                objRtn.VTAX8 = rs01.getDouble("VTAX8");
                objRtn.CTAX9 = rs01.getString("CTAX9");
                objRtn.ATO9 = rs01.getString("ATO9");
                objRtn.VTAX9 = rs01.getDouble("VTAX9");
                objRtn.CTAX10 = rs01.getString("CTAX10");
                objRtn.ATO10 = rs01.getString("ATO10");
                objRtn.VTAX10 = rs01.getDouble("VTAX10");
                objRtn.CTAX11 = rs01.getString("CTAX11");
                objRtn.ATO11 = rs01.getString("ATO11");
                objRtn.VTAX11 = rs01.getDouble("VTAX11");
                objRtn.CTAX12 = rs01.getString("CTAX12");
                objRtn.ATO12 = rs01.getString("ATO12");
                objRtn.VTAX12 = rs01.getDouble("VTAX12");
                objRtn.CTAX13 = rs01.getString("CTAX13");
                objRtn.ATO13 = rs01.getString("ATO13");
                objRtn.VTAX13 = rs01.getDouble("VTAX13");
                objRtn.CTAX14 = rs01.getString("CTAX14");
                objRtn.ATO14 = rs01.getString("ATO14");
                objRtn.VTAX14 = rs01.getDouble("VTAX14");

                objRtn.TOTAL = rs01.getDouble("TOTAL");
                objRtn.RATE1 = rs01.getDouble("RATE1");
                objRtn.VALOR1 = rs01.getDouble("VALOR1");
                objRtn.RATE2 = rs01.getDouble("RATE2");
                objRtn.VALOR2 = rs01.getDouble("VALOR2");

                list.add(objRtn);
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

    public List<A2331Filter> loadPX404SQP02680(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");
        hmDescSTVAL.put("6", "Reverse Chargeback");
        HashMap hmDescUse = new HashMap();
        hmDescUse.put("F", "Flown");
        hmDescUse.put("I", "Interline Flown");
        hmDescUse.put("E", "Exchange");
        hmDescUse.put("R", "Refund");
        hmDescUse.put("D", "Discharge");
        hmDescUse.put("", "No Use");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        try {
            //Para aquellos Merchant que tienen nombre de Banco
            if (Long.parseLong(filter.MERCHN) <= 0) {
                filter.MERCHN = "";
            }
        } catch (Exception e) {
            filter.MERCHN = "";
        }

        long QTKT = 0, TOTCUP = 0;
        double AUTAMOUNT = 0, VFOP = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02680(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC.substring(0, 3));//CIA
            cstmt.setString(3, filter.IN_TDOC.substring(3, 7));//FORMA
            cstmt.setString(4, filter.IN_TDOC.substring(7, 13));//SERIE
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                TOTCUP = rs01.getLong("TOTCUP");
                QTKT = rs01.getLong("QTKT");
                AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                VFOP = rs01.getDouble("VFOP");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = rs01.getString("SENTDATE").trim();;

                    /* objRtn.IN_CARDC = filter.IN_CARDC;
                     //objRtn.IN_CARDN = filter.IN_CARDN;
                     objRtn.IN_CARDN1 = filter.IN_CARDN1;
                     objRtn.IN_CARDN2 = filter.IN_CARDN2;*/
                    objRtn.IN_AGENT = rs01.getString("AGENTE").trim();
                    objRtn.IN_AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.IN_CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.strFormatDate = rs01.getString("SENTDATE").trim();
                    objRtn.IN_COUNTRY = rs01.getString("SCOUNTRY").trim();

                    objRtn.pos = 1;
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    objRtn.SEQNUM = rs01.getString("SEQNUM").trim();
                    objRtn.NUMREFER = rs01.getString("NUMREFER").trim();
                    objRtn.SQCRFILE = rs01.getString("SQCRFILE").trim();
                    objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                    objRtn.DATES = rs01.getString("DATES").trim();
                    if (!rs01.getString("MERCHN").trim().isEmpty() && !rs01.getString("MERCHN").trim().equals("0")) {
                        objRtn.MERCHN = rs01.getString("MERCHN").trim();
                        objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    } else {
                        objRtn.MERCHN = rs01.getString("NAMEBANK").trim();
                        objRtn.MERCHNAM = rs01.getString("NAMEBANK").trim();
                    }
                    objRtn.FOLIO = rs01.getString("FOLIO").trim();
                    objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.DATEN = rs01.getString("DATEN").trim();
                    objRtn.STSND = rs01.getString("STSND").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    if (objRtn.STSND.trim().equals("1")) {
                        objRtn.STSND = "Bank Notice";
                    }
                    objRtn.AGENTE = rs01.getString("AGENTE").trim();
                    objRtn.STUSO = rs01.getString("STUSO").trim();
                    objRtn.TOTCUP = rs01.getInt("TOTCUP");
                    objRtn.strCANAL = rs01.getString("CANAL").trim();
                    if (objRtn.strCANAL.trim().equals("WEB") || objRtn.strCANAL.trim().equals("CCT")) {
                        objRtn.strFlag = "CC";
                    } else if (objRtn.MERCHNAM.trim().toUpperCase().contains("CALL CENT")) {
                        objRtn.strFlag = "CC";
                    }

                    if (!objRtn.STUSO.trim().isEmpty()) {
                        switch (objRtn.STUSO.trim().length()) {
                            case 4:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                objRtn.strUsoCpn3 = rs01.getString("STUSO").trim().substring(2, 3);
                                objRtn.strUsoCpn4 = rs01.getString("STUSO").trim().substring(3, 4);
                                break;
                            case 3:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                objRtn.strUsoCpn3 = rs01.getString("STUSO").trim().substring(2, 3);
                                break;
                            case 2:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                objRtn.strUsoCpn2 = rs01.getString("STUSO").trim().substring(1, 2);
                                break;
                            case 1:
                                objRtn.strUsoCpn1 = rs01.getString("STUSO").trim().substring(0, 1);
                                break;
                        }
                    }
                    try {
                        objRtn.strDescUsoCpn1 = hmDescUse.get(objRtn.strUsoCpn1).toString();
                        objRtn.strDescUsoCpn2 = hmDescUse.get(objRtn.strUsoCpn2).toString();
                        objRtn.strDescUsoCpn3 = hmDescUse.get(objRtn.strUsoCpn3).toString();
                        objRtn.strDescUsoCpn4 = hmDescUse.get(objRtn.strUsoCpn4).toString();
                    } catch (Exception e) {
                    }
                    objRtn.CCIA = rs01.getString("CCIA").trim();
                    objRtn.FORMA = rs01.getString("FORMA").trim();
                    objRtn.SERIE = rs01.getString("SERIE").trim();
                    objRtn.strTicket = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                    objRtn.VFOP = rs01.getDouble("VFOP");
                    objRtn.LINKDATE = rs01.getString("LINKDATE").trim();
                    objRtn.LINKHORA = rs01.getString("LINKHORA").trim();
                    objRtn.RUTA = rs01.getString("RUTA").trim();
                    if (!objRtn.RUTA.trim().isEmpty()) {
                        objRtn.strImgLink = "Y";
                    }

                    if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                        //Enmascarando
                        if (objRtn.SCARCOD.trim().equals("AX")) {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                        } else {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                        }

                    } else {
                        objRtn.strDescripcion = objRtn.CARDNBR;
                    }
                    objRtn.strDescStatus = hmDescSTVAL.get(objRtn.STVAL).toString();

                    objRtn.lngTotDocs = QTKT;
                    objRtn.lngTotTOTCUP = TOTCUP;
                    objRtn.dblTotAUTAMOUNT = AUTAMOUNT;
                    objRtn.dblTotVFOP = VFOP;

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
