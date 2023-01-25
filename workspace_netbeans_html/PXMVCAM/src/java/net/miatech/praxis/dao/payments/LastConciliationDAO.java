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
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A3800Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author
 */
public class LastConciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public LastConciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public LastConciliationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3800Filter> loadPX565SQP04093(A3800Filter filter) throws SQLException, Exception {
        List<A3800Filter> list = new ArrayList<A3800Filter>();
        A3800Filter objRtn;
        double SVFOP = 0, SVFOPS = 0, DIFSVFOP = 0;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04093(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Conciliate");

        HashMap<String, String> hmDescEstadosSTAAVIS = new HashMap<String, String>();
        hmDescEstadosSTAAVIS.put("0", "Emission");
        hmDescEstadosSTAAVIS.put("1", "Payment");
        hmDescEstadosSTAAVIS.put("2", "Reject");

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_SPNR.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            if (filter.IN_CARDC == null) {
                cstmt.setString(7, "");
            } else {
                cstmt.setString(7, filter.IN_CARDC.trim());
            }
            cstmt.setString(8, filter.IN_SVFOPSG.trim());
            cstmt.setString(9, filter.IN_STAAVIS.trim());
            cstmt.setString(10, filter.IN_SAGENT.trim());
            cstmt.setString(11, filter.strFecFiltro.trim());

            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                SVFOP = rs01.getDouble("SVFOP");
                SVFOPS = rs01.getDouble("SVFOPS");
                DIFSVFOP = rs01.getDouble("SVFOP") - rs01.getDouble("SVFOPS");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A3800Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;

                    objRtn.SDATE = rs01.getString("SDATE").trim();
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    if (hmDescEstadosSTVAL.containsKey(rs01.getString("STVAL").trim().toUpperCase())) {
                        objRtn.strDescStatus = hmDescEstadosSTVAL.get(rs01.getString("STVAL").trim()).toString();
                    }
                    objRtn.SCARDN = rs01.getString("SCARDN").trim();
                    objRtn.SDATEXP = rs01.getString("SDATEXP").trim();
                    objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                    objRtn.SPNR = rs01.getString("SPNR").trim();
                    objRtn.TRNCU = rs01.getString("TRNCU").trim();
                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.SAGENT = rs01.getString("SAGENT").trim();
                    objRtn.SPAYMENT = rs01.getString("SPAYMENT").trim();
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    objRtn.SVFOPS = rs01.getDouble("SVFOPS");
                    objRtn.SCURRENCYS = rs01.getString("SCURRENCYS").trim();
                    objRtn.DIFF = rs01.getDouble("SVFOP") - rs01.getDouble("SVFOPS");

                    objRtn.DATAVIS = rs01.getString("DATAVIS").trim();
                    objRtn.NUMAVIS = Functions.fillZeros(6, rs01.getString("NUMAVIS").trim().replace(".00", ""));
                    objRtn.STAAVIS = rs01.getString("STAAVIS").trim();
                    if (hmDescEstadosSTAAVIS.containsKey(rs01.getString("STAAVIS").trim().toUpperCase())) {
                        objRtn.descSTAAVIS = hmDescEstadosSTAAVIS.get(rs01.getString("STAAVIS").trim()).toString();
                    } else {
                        objRtn.descSTAAVIS = "Pending";
                    }

                    objRtn.totSVFOP = SVFOP;
                    objRtn.totSVFOPS = SVFOPS;
                    objRtn.totDIFSVFOP = DIFSVFOP;

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

    public List<A2290Filter> loadPX565SQP04094(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04094(?,?,?,?)}";//" + session.getMainLibrary() + "
        double totSVFOP = 0;

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE.trim());
            cstmt.setString(3, filter.IN_CARDN.trim());
            cstmt.setString(4, filter.IN_SAUTHOC.trim());

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                totSVFOP = rs01.getDouble("SVFOP");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2290Filter();
                    objRtn.IN_SDATE = filter.IN_SDATE;
                    objRtn.descSDATE = Functions.getMonthConvert(filter.IN_SDATE);
                    objRtn.IN_CARDN = filter.IN_CARDN;
                    objRtn.IN_SAUTHOC = filter.IN_SAUTHOC;

                    objRtn.CCIA = rs01.getString("CCIA").trim();
                    objRtn.FORMA = rs01.getString("FORMA").trim();
                    objRtn.SERIE = rs01.getString("SERIE").trim();
                    objRtn.TICKET = rs01.getString("CCIA").trim() + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    objRtn.SPNR = rs01.getString("SPNR").trim();
                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.SAGENT = rs01.getString("SAGENT").trim();
                    if (!rs01.getString("CERROR").trim().equals("")) {
                        objRtn.CERROR = rs01.getString("CERROR").trim() + " : " + rs01.getString("ERROR").trim();
                    }

                    if (rs01.getString("AFTE").trim().equals("X")) {
                        objRtn.strPEM = "ACCB BSP";
                    } else if (rs01.getString("AFTE").trim().equals("A")) {
                        objRtn.strPEM = "ACCB ARC";
                    } else if (rs01.getString("AFTE").trim().equals("B")) {
                        objRtn.strPEM = "ACCB ASR";
                    } else if (rs01.getString("AFTE").trim().equals("N")) {
                        objRtn.strPEM = "ACCB ASR";
                    } else if (rs01.getString("AFTE").trim().equals("L")) {
                        objRtn.strPEM = "ACCB ASR";
                    } else {
                        objRtn.strPEM = "ACCB";
                    }

                    objRtn.totSVFOP = totSVFOP;

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

    public List<A2290Filter> loadPX565SQP04095(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> list = new ArrayList<A2290Filter>();
        A2290Filter beanTkt;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04095(?,?,?,?)}";//" + session.getMainLibrary() + "

        double totSVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");

        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Match");
        hmDescEstadosSTVAL.put("2", "Settlement w/o Paying");
        hmDescEstadosSTVAL.put("3", "Paying w/o Settlement");
        hmDescEstadosSTVAL.put("4", "Match with Difference");
        hmDescEstadosSTVAL.put("5", "Match Manual");

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");
        hmDescOrigen.put("E", "Elavon");

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE.trim());
            cstmt.setString(3, filter.IN_CARDN.trim());
            cstmt.setString(4, filter.IN_SAUTHOC.trim());

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                totSVFOP = rs01.getDouble("SVFOP");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();

                    beanTkt.STVAL = rs01.getString("STVAL").trim();
                    if (hmDescEstadosSTVAL.containsKey(rs01.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstadosSTVAL.get(rs01.getString("STVAL").trim()).toString();
                    }
                    beanTkt.SEQNUM = rs01.getString("SEQNUM").trim();
                    beanTkt.SAGENT = rs01.getString("SAGENT").trim();
                    //beanTkt.strDescripcion = rs01.getString("DESCAGT").trim();
                    beanTkt.FTE = rs01.getString("FTE").trim();
                    if (rs01.getString("FTE").trim().equals("S")) {
                        beanTkt.strDescFTE = "ASR";
                    } else if (rs01.getString("FTE").trim().equals("A")) {
                        beanTkt.strDescFTE = "ARC";
                    } else if (rs01.getString("FTE").trim().equals("B")) {
                        beanTkt.strDescFTE = "BSP";
                    } else {
                        beanTkt.strDescFTE = rs01.getString("FTE").trim();
                    }
                    beanTkt.strTRNXCODE = rs01.getString("TRNXCODE").trim();
                    beanTkt.strPEM = rs01.getString("PEM").trim();
                    if (beanTkt.strPEM.trim().equals("01")) {
                        beanTkt.strPEM = "Manual";
                    } else if (beanTkt.strPEM.trim().equals("05")) {
                        beanTkt.strPEM = "Chip EMV";
                    } else if (beanTkt.strPEM.trim().equals("80")) {
                        beanTkt.strPEM = "Fallback";
                    } else if (beanTkt.strPEM.trim().equals("90")) {
                        beanTkt.strPEM = "Deslizada";
                    }
                    beanTkt.MERCHN = rs01.getString("MERCHN").trim();
                    if (rs01.getString("NMERCHN") != null && !rs01.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rs01.getString("NMERCHN").trim();
                    }
                    beanTkt.SCARCOD = rs01.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rs01.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rs01.getString("SCARDN").trim(), "");
                    beanTkt.SAUTHOC = rs01.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rs01.getDouble("SVFOP");
                    beanTkt.TDATE = rs01.getString("TDATE").trim();
                    beanTkt.DATEF = rs01.getString("DATEF").trim();
                    if (rs01.getString("BDATEP").trim().length() == 6) {
                        beanTkt.BDATEP = Functions.FormatFecha(rs01.getString("BDATEP").trim(), "yyMMdd", "yyyyMMdd");
                    } else {
                        beanTkt.BDATEP = rs01.getString("BDATEP").trim();
                    }
                    if (hmDescEstados.containsKey(rs01.getString("BSTVAL").trim().toUpperCase())) {
                        beanTkt.BSTVAL = hmDescEstados.get(rs01.getString("BSTVAL").trim()).toString();
                    } else {
                        beanTkt.BSTVAL = rs01.getString("BSTVAL").trim();
                    }

                    beanTkt.TDOC = rs01.getString("TDOC").trim();
                    beanTkt.strNUMREF = rs01.getString("NUMREF").trim();
                    beanTkt.SDATE = rs01.getString("SDATE").trim();
                    beanTkt.strFLOAD = rs01.getString("FLOAD").trim();
                    if (beanTkt.strFLOAD.trim().equals("M")) {
                        beanTkt.strFLOAD = "Manual";
                    }
                    beanTkt.SDATEL = rs01.getString("LDATE").trim();
                    beanTkt.strSORIG = rs01.getString("SORIG").trim();

                    if (hmDescOrigen.containsKey(rs01.getString("SORIG").trim())) {
                        beanTkt.strSORIG = hmDescOrigen.get(rs01.getString("SORIG").trim());
                    } else {
                        beanTkt.strSORIG = rs01.getString("SORIG").trim();
                    }
                    beanTkt.BAID = rs01.getString("BAID").trim();
                    if (rs01.getString("FLAGC").trim().equals("C")) {
                        beanTkt.FLAGC = "Match";
                    }/* else {
                     beanTkt.FLAGC = "Paying w/o Sales";
                     }*/

                    beanTkt.DATEC = rs01.getString("DATEC").trim();
                    if (!rs01.getString("DATEC").trim().equals("")) {
                        beanTkt.strBankDeposit = rs01.getString("DATEC").trim();
                    } else {
                        if (!beanTkt.BDATEP.trim().isEmpty()) {
                            beanTkt.strBankDeposit = String.valueOf(Functions.diferenciaDiasEntreSistema(beanTkt.BDATEP));
                        }
                    }
                    if (beanTkt.SCARCOD.equals("AX")) {
                        beanTkt.FCONC = rs01.getString("FCONC").trim();
                        if (beanTkt.FCONC.trim().equals("T")) {
                            beanTkt.strDescFCONC = "Conciliation by Ticket";
                        } else if (beanTkt.FCONC.trim().equals("G")) {
                            beanTkt.strDescFCONC = "Conciliation by Group";
                        }
                    }

                    beanTkt.totSVFOP = totSVFOP;

                    list.add(beanTkt);
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

    public List<A3800Filter> loadPX565SQP04125(A3800Filter filter) throws SQLException, Exception {
        List<A3800Filter> list = new ArrayList<A3800Filter>();
        A3800Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04125(?,?,?,?)}";//" + session.getMainLibrary() + "
        double totSVFOP = 0;

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE.trim());
            cstmt.setString(3, filter.IN_CARDN.trim());
            cstmt.setString(4, filter.IN_SAUTHOC.trim());

            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                objRtn = new A3800Filter();

                objRtn.DATAVIS = rs01.getString("DATAVIS");
                objRtn.NUMAVIS = rs01.getString("NUMAVIS");
                objRtn.STAAVIS = rs01.getString("STAAVIS");

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

    public A3800Filter loadPX559SQP04126(A3800Filter filter) throws SQLException, Exception {
        A3800Filter beanTkt = new A3800Filter();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04126(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE.trim());
            cstmt.setString(3, filter.SCARDN.trim());
            cstmt.setString(4, filter.SAUTHOC.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {

                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SDATEXP = rst.getString("SDATEXP").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.TRNCU = rst.getString("TRNCU").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.SPAYMENT = rst.getString("SPAYMENT").trim();
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SVFOPS = rst.getDouble("SVFOPS");
                beanTkt.SCURRENCYS = rst.getString("SCURRENCYS").trim();
                beanTkt.DIFF = rst.getDouble("SVFOP") - rst.getDouble("SVFOPS");

                beanTkt.DATAVIS = rst.getString("DATAVIS").trim();
                beanTkt.NUMAVIS = Functions.fillZeros(6, rst.getString("NUMAVIS").trim().replace(".00", ""));
                beanTkt.STAAVIS = rst.getString("STAAVIS").trim();

                beanTkt.USCR = rst.getString("USCR").trim();
                beanTkt.FECR = rst.getString("FECR").trim();
                beanTkt.HOCR = rst.getString("HOCR").trim();
                beanTkt.USUP = rst.getString("USUP").trim();
                beanTkt.FEUP = rst.getString("FEUP").trim();
                beanTkt.HOUP = rst.getString("HOUP").trim();

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

        return beanTkt;
    }

    public String loadPX565SQP04127(A3800Filter filter) throws SQLException, Exception {
        String strMsj = "";
        if (filter.option.trim().equals("U")) {
            strMsj = "SUCCESSFUL. Information Updated.";
        } else if (filter.option.trim().equals("I")) {
            strMsj = "SUCCESSFUL. Information Saved.";
        } else if (filter.option.trim().equals("D")) {
            strMsj = "SUCCESSFUL. Information Deleted.";
        }

        //strMsj = "SUCCESSFUL. Information Created.";
        CallableStatement cstmt = null;
        Connection cnx = null;
        //SQP02077
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04127(?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.option.trim());
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.IN_SDATE);
            cstmt.setString(4, filter.IN_CARDN);
            cstmt.setString(5, filter.IN_SAUTHOC);
            cstmt.setString(6, filter.IN_STAAVIS);
            //Campos para auditoria
            cstmt.setString(7, session.getUserView().getUserInfo().USR);
            cstmt.setString(8, Functions.getFechaActual());
            cstmt.setString(9, Functions.getHoraActual());

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

    public String loadPX565SQP04157(A3800Filter filter) throws SQLException, Exception {
        String strMsj = "SUCCESSFUL. Notices emited";

        CallableStatement cstmt = null;
        Connection cnx = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04157(?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);

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
}
