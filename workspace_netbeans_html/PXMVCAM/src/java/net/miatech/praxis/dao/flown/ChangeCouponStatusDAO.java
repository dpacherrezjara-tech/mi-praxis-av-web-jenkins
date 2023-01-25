/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ChangeCouponStatusDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ChangeCouponStatusDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ChangeCouponStatusDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1692Filter> loadPX067S01A1692(A1692Filter filter, HashMap<String, String> hmPaises, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A1692Filter> lstTkts = new ArrayList<>(0);
        A1692Filter beanTkt;
        String NFLIGHT = filter.NFLIGHT.trim();
        HashMap<String, String> hmStatus = new HashMap<>();
        //STVAL
        hmStatus.put("10", "Hard Block");
        hmStatus.put("11", "Pending/Without Sale");
        hmStatus.put("12", "Valued");
        hmStatus.put("13", "Closed");
        //FVAL
        hmStatus.put("21", "ISR/Sales Value");
        hmStatus.put("22", "Average Value");
        hmStatus.put("23", "VTR");
        //STCON
        hmStatus.put("31", "Posted");
        hmStatus.put("32", "Provisional Post");
        hmStatus.put("33", "Reverse");
        hmStatus.put("34", "Accounting Reverse");

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        //</editor-fold>

        if (filter.monthFrom.trim().equals("")) {
            filter.monthFrom = Functions.getFechaActual().substring(4, 6);
        }
        if (filter.monthTo.trim().equals("")) {
            filter.monthTo = Functions.getFechaActual().substring(4, 6);
        }

        if (!NFLIGHT.equals("") && NFLIGHT.length() < 4) {
            NFLIGHT = Functions.fillZeros(4, NFLIGHT);
        }
        CallableStatement cstmt = null;
        ResultSet rst = null;

        //PX06700001
        Connection cnx = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX067S01A1692(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            //cstmt = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
            cstmt.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
            cstmt.setString(4, Functions.getFechaActual());
            cstmt.setString(5, NFLIGHT);
            cstmt.setString(6, filter.CDEPART.trim());
            cstmt.setString(7, filter.CARRIVA.trim());
            cstmt.setString(8, filter.strTicket.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new A1692Filter();
                beanTkt.yearFrom = filter.yearFrom.trim();
                beanTkt.monthFrom = filter.monthFrom.trim();
                beanTkt.dayFrom = filter.dayFrom.trim();
                beanTkt.yearTo = filter.yearTo.trim();
                beanTkt.monthTo = filter.monthTo.trim();
                beanTkt.dayTo = filter.dayTo.trim();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.CUPON = rst.getString("CUPON").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                beanTkt.FCONT = rst.getString("FCONT").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                //beanTkt.strFormatDate2 = Functions.getMonthConvert(beanTkt.FCONT);
                if (hmStatus.containsKey("1" + rst.getString("STVAL").trim())) {
                    beanTkt.strFormatDate2 = hmStatus.get("1" + rst.getString("STVAL").trim()).toString();
                }
                beanTkt.STCON = rst.getString("STCON").trim();
                if (hmStatus.containsKey("3" + rst.getString("STCON").trim())) {
                    beanTkt.strFormatDate2 = hmStatus.get("3" + rst.getString("STCON").trim()).toString();
                }
                beanTkt.CDEPART = rst.getString("CDEPART").trim();
                beanTkt.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanTkt.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanTkt.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanTkt.IN_NFLIGHT = NFLIGHT;
                beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanTkt.LEGSEQ = rst.getString("LEGSEQ").trim();
                beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.DFLIGHT);
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.PSVVTA = rst.getString("PSVVTA").trim();
                if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                    beanTkt.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                }
                beanTkt.AGTIA = rst.getString("AGTIA").trim();
                beanTkt.FVTA = rst.getString("FVTA").trim();
                beanTkt.strFormatFVTA = Functions.getMonthConvert(beanTkt.FVTA);
                beanTkt.TOPUS = rst.getString("TOPUS").trim();
                beanTkt.CARR = rst.getString("CARR").trim();
                beanTkt.CABI = rst.getString("CABI").trim();
                beanTkt.VCPN = rst.getDouble("VCPN");
                beanTkt.COMISI = rst.getDouble("COMISI");
                beanTkt.MDACP = rst.getString("MDACP").trim();
                beanTkt.VCPMX = rst.getDouble("VCPMX");
                beanTkt.TCMUS = rst.getDouble("TCMUS");
                beanTkt.VCPUS = rst.getDouble("VCPUS");

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public List<A1692Filter> loadPX067S03A1792(A1692Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstTkts = new ArrayList<>(0);
        A1692Filter beanTkt;
        HashMap<String, String> hmStatus = new HashMap<>();
        hmStatus.put("0", "Hard Block");
        hmStatus.put("1", "Pending/Without Sale");
        hmStatus.put("2", "Valued");
        hmStatus.put("3", "Closed");
        hmStatus.put("4", "Valued (ISR/Sale)");
        hmStatus.put("5", "Valued (Average)");
        hmStatus.put("6", "Posted");
        hmStatus.put("7", "Provisional Post");
        hmStatus.put("8", "Reverse");
        hmStatus.put("9", "Accounting Reverse");
        hmStatus.put("10", "Deleted");
        hmStatus.put("12", "Deleted-Reverse");

        CallableStatement cstmt = null;

        //PX06700003      
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX067S03A1792(?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CCIA.trim());
            cstmt.setString(3, filter.FORMA.trim());
            cstmt.setString(4, filter.SERIE.trim());
            cstmt.setString(5, filter.CUPON.trim());
            cstmt.setString(6, filter.SEQ.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A1692Filter();
                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.CUPON = rst.getString("CUPON").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                if (hmStatus.containsKey(rst.getString("STVAL").trim())) {
                    beanTkt.strDescSTVAL = hmStatus.get(rst.getString("STVAL").trim()).toString();
                }
                beanTkt.STNEW = rst.getString("STNEW").trim();
                if (hmStatus.containsKey(rst.getString("STNEW").trim())) {
                    beanTkt.strDescSTNEW = hmStatus.get(rst.getString("STNEW").trim()).toString();
                }
                beanTkt.CDEPART = rst.getString("CDEPART").trim();
                beanTkt.CARRIVA = rst.getString("CARRIVA").trim();
                beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.DFLIGHT);
                beanTkt.USCR = rst.getString("USCR").trim();
                beanTkt.FECR = rst.getString("FECR").trim();
                beanTkt.HOCR = rst.getString("HOCR").trim();

                lstTkts.add(beanTkt);
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public List<A1692Filter> loadPX067S04A1792(A1692Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A1692Filter> lstTkts = new ArrayList<A1692Filter>(0);
        A1692Filter beanTkt;
        String NFLIGHT = filter.NFLIGHT.trim();
        HashMap<String, String> hmStatus = new HashMap<String, String>();
        hmStatus.put("0", "Hard Block");
        hmStatus.put("1", "Pending/Without Sale");
        hmStatus.put("2", "Valued");
        hmStatus.put("3", "Closed");
        hmStatus.put("4", "Valued (ISR/Sale)");
        hmStatus.put("5", "Valued (Average)");
        hmStatus.put("6", "Posted");
        hmStatus.put("7", "Provisional Post");
        hmStatus.put("8", "Reverse");
        hmStatus.put("9", "Accounting Reverse");
        hmStatus.put("10", "Deleted");
        hmStatus.put("12", "Deleted-Reverse");

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        //</editor-fold>

        if (filter.monthFrom.trim().equals("")) {
            filter.monthFrom = Functions.getFechaActual().substring(4, 6);
        }
        if (filter.monthTo.trim().equals("")) {
            filter.monthTo = Functions.getFechaActual().substring(4, 6);
        }

        if (!NFLIGHT.equals("") && NFLIGHT.length() < 4) {
            NFLIGHT = Functions.fillZeros(4, NFLIGHT);
        }

        CallableStatement cstmt = null;
        ResultSet rst = null;

        //PX06700004
        Connection cnx = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX067S04A1792(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
            cstmt.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
            cstmt.setString(4, Functions.getFechaActual());
            cstmt.setString(5, NFLIGHT);
            cstmt.setString(6, filter.CDEPART.trim());
            cstmt.setString(7, filter.CARRIVA.trim());
            cstmt.setString(8, filter.strTicket.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A1692Filter();
                beanTkt.yearFrom = filter.yearFrom.trim();
                beanTkt.monthFrom = filter.monthFrom.trim();
                beanTkt.dayFrom = filter.dayFrom.trim();
                beanTkt.yearTo = filter.yearTo.trim();
                beanTkt.monthTo = filter.monthTo.trim();
                beanTkt.dayTo = filter.dayTo.trim();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.CUPON = rst.getString("CUPON").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                if (hmStatus.containsKey(rst.getString("STVAL").trim())) {
                    beanTkt.strDescSTVAL = hmStatus.get(rst.getString("STVAL").trim()).toString();
                }
                beanTkt.STNEW = rst.getString("STNEW").trim();
                if (hmStatus.containsKey(rst.getString("STNEW").trim())) {
                    beanTkt.strDescSTNEW = hmStatus.get(rst.getString("STNEW").trim()).toString();
                }
                beanTkt.CDEPART = rst.getString("CDEPART").trim();
                beanTkt.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanTkt.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanTkt.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanTkt.IN_NFLIGHT = NFLIGHT;
                beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.DFLIGHT);
                beanTkt.BATCHP = rst.getString("BATCHP").trim();
                beanTkt.USCR = rst.getString("USCR").trim();
                beanTkt.FECR = rst.getString("FECR").trim();
                beanTkt.HOCR = rst.getString("HOCR").trim();

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }

    public A1692Filter loadPX095S06A1692(String strTicket, String strSeq, HashMap<String, String> hmAeropuertos, HashMap<String, String> hmPaises) throws SQLException, Exception {

        A1692Filter beanCons = new A1692Filter();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        int seq = 0;
        String Flag = "", tktpadre = "";

        Connection cnx = null;
        try {
            //PX09500007
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX095S06A1692(?,?,?,?,?,?)}";//Schema

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, strTicket.substring(0, 3));
            cstmt.setString(3, strTicket.substring(3, 7));
            cstmt.setString(4, strTicket.substring(7, 13));
            cstmt.setString(5, strTicket.substring(13, 14));
            cstmt.setString(6, strSeq);
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {
                seq = rst.getInt("A720NSEQ");
                Flag = rst.getString("A720FLAG");
                tktpadre = rst.getString("A720CIAI") + rst.getString("A720FORMAI") + rst.getString("A720SERIEI");
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                if (rst.next()) {
                    beanCons = new A1692Filter();
                    beanCons.monthTo = tktpadre;
                    beanCons.yearTo = Flag;
                    beanCons.CPN_Billed = seq;

                    if (rst.getString("STAT") != null && !rst.getString("STAT").trim().equals("-")) {
                        beanCons.strDescSTVAL = rst.getString("STAT").trim();
                    }
                    beanCons.CCUST = rst.getString("CCUST").trim();
                    beanCons.CCIA = rst.getString("CCIA").trim();
                    beanCons.FORMA = rst.getString("FORMA").trim();
                    beanCons.SERIE = rst.getString("SERIE").trim();
                    beanCons.CUPON = rst.getString("CUPON").trim();
                    beanCons.strTicket = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + rst.getString("CUPON").trim();
                    beanCons.DCHEQ = rst.getString("DCHEQ").trim();
                    beanCons.SEQ = rst.getString("SEQ").trim();
                    beanCons.STVAL = rst.getString("STVAL").trim();
                    beanCons.FVAL = rst.getString("FVAL").trim();
                    beanCons.STCON = rst.getString("STCON").trim();
                    beanCons.FTE = rst.getString("FTE").trim();
                    beanCons.FLOAD = rst.getString("FLOAD").trim();
                    beanCons.FOPERZUL = rst.getString("FOPERZUL").trim();
                    beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanCons.CDEPART = rst.getString("CDEPART").trim();
                    if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                        beanCons.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                    }
                    beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                    if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                        beanCons.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                    }
                    beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanCons.NPLANE = rst.getString("NPLANE").trim();
                    beanCons.ZONA = rst.getString("ZONA").trim();
                    //beanCons.STORG = rst.getString("STORG").trim();
                    beanCons.CDOC = rst.getString("CDOC").trim();
                    beanCons.TDOC = rst.getString("TDOC").trim();
                    beanCons.PSVVTA = rst.getString("PSVVTA").trim();
                    if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                        beanCons.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                    }
                    beanCons.AGTIA = rst.getString("AGTIA").trim();
                    beanCons.FVTA = rst.getString("FVTA").trim();
                    beanCons.TVTA = rst.getString("TVTA").trim();
                    beanCons.TPAX = rst.getString("TPAX").trim();
                    if (rst.getString("TOPER") != null && !rst.getString("TOPER").trim().equals("")) {
                        beanCons.TOPUS = rst.getString("TOPER").trim();
                    } else {
                        beanCons.TOPUS = rst.getString("TOPUS").trim();
                    }
                    beanCons.CARR = rst.getString("CARR").trim();
                    beanCons.CABI = rst.getString("CABI").trim();
                    beanCons.CLAS = rst.getString("CLAS").trim();
                    beanCons.FBASE = rst.getString("FBASE").trim();
                    beanCons.CFF = rst.getString("CFF").trim();
                    beanCons.VCPN = rst.getDouble("VCPN");
                    beanCons.COMISI = rst.getDouble("COMISI");
                    beanCons.VTAX = rst.getDouble("VTAX");
                    beanCons.MDACP = rst.getString("MDACP").trim();
                    beanCons.VCPMX = rst.getDouble("VCPMX");
                    beanCons.TCMUS = rst.getDouble("TCMUS");
                    beanCons.VCPUS = rst.getDouble("VCPUS");
                    beanCons.QTYPAX = rst.getInt("QTYPAX");
                    beanCons.FCONT = rst.getString("FCONT").trim();
                    beanCons.IDCON = rst.getString("IDCON").trim();
                    beanCons.USCR = rst.getString("USCR").trim();
                    beanCons.FECR = rst.getString("FECR").trim();
                    beanCons.HOCR = Functions.ConvertedTime(rst.getString("HOCR").trim());
                    beanCons.USUP = rst.getString("USUP").trim();
                    beanCons.FEUP = rst.getString("FEUP").trim();
                    beanCons.HOUP = Functions.ConvertedTime(rst.getString("HOUP").trim());
                    //Deshabiltado a Raíz del cambio del A720 A PRAXIS.
                    if (rst.getString("A1711SOURC") != null && !rst.getString("A1711SOURC").trim().equals("-")) {
                        beanCons.strFuente = rst.getString("A1711SOURC").trim();
                        beanCons.FTE = rst.getString("A1711SOURC").trim();
                    }
                    beanCons.FECVAL = rst.getString("FECVAL");
                    beanCons.FINVO = rst.getString("FINVO").trim();
                    //beanCons.strFuente = rst.getString("FTE").trim();
                }
            }

        } catch (Exception e) {
            e.getMessage();
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

        return beanCons;
    }

    public String loadPX067S02A1692(A1692Filter filter, String strOption, UserView user) throws SQLException, Exception {

        //REALIZA EL UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1692.
        String strMsj = "Operation was successful.";
        CallableStatement cstmt = null;

        //PX06700002
        Connection cnx = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX067S02A1692(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, strOption.trim());
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.CCIA.trim());
            cstmt.setString(4, filter.FORMA.trim());
            cstmt.setString(5, filter.SERIE.trim());
            cstmt.setString(6, filter.CUPON.trim());
            cstmt.setString(7, filter.SEQ.trim());
            cstmt.setString(8, filter.STVAL.trim());
            cstmt.setString(9, filter.STNEW.trim());
            cstmt.setString(10, filter.CDEPART.trim());
            cstmt.setString(11, filter.CARRIVA.trim());
            cstmt.setString(12, filter.NFLIGHT.trim());
            cstmt.setString(13, filter.DFLIGHT.trim());
            cstmt.setString(14, user.getUserInfo().USR);
            cstmt.setString(15, Functions.getFechaActual());
            cstmt.setString(16, Functions.getHoraActual());
            cstmt.execute();

        } catch (Exception e) {
            e.getMessage();
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
    
    public String loadPX095S12QCAL(UserView user, A1692Filter filter, String recalculo) throws SQLException, Exception {

        CallableStatement cs = null;
        String strSQL;
        String msj;

        Connection cnx = null;
        try {

            //INDICA SI SE HACE EL CALCULO DE VUELO (SOLO CUANDO CAMBIO DE VUELO) : Y/'' FECHAVUELO/NROVUELO/ORIGEN/DESTINO
            if (recalculo.startsWith("Y") && recalculo.trim().length() == 19) {
                //PARA DESCONTAR DE LAS CANTIDADES DE CPNS DEL VUELO ORIGINAL
                //PX09500009
                strSQL = "{CALL " + session.getMainLibrary() + ".PX095S12QCAL(?,?,?,?,?,?,?,?,?,?)}";

                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                cs = cnx.prepareCall(strSQL);

                //YDDDDDDDDNNNNOOODDD
                cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cs.setString(2, recalculo.substring(13, 16));
                cs.setString(3, recalculo.substring(16, 19));
                cs.setString(4, recalculo.substring(9, 13));
                cs.setString(5, recalculo.substring(1, 9));
                cs.setString(6, "");
                cs.setString(7, user.getUserInfo().USR);
                cs.setString(8, Functions.getFechaActual());
                cs.setString(9, Functions.getHoraActual());
                cs.setString(10, "");
                //Indica si el vuelo ha cambiado (Ruta o Nro) para restar del anterior y sumar el nuevo.
                cs.execute();
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }

            //Recalculo del vuelo modificado ===================================
            //PX09500009
            strSQL = "{CALL " + session.getMainLibrary() + ".PX095S12QCAL(?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.CDEPART.trim());
            cs.setString(3, filter.CARRIVA.trim());
            cs.setString(4, filter.NFLIGHT.trim());
            cs.setString(5, filter.DFLIGHT.trim());
            cs.setString(6, filter.LEGSEQ.trim());
            cs.setString(7, user.getUserInfo().USR);
            cs.setString(8, Functions.getFechaActual());
            cs.setString(9, Functions.getHoraActual());
            cs.setString(10, "");
            //Indica si el vuelo ha cambiado (Ruta o Nro) para restar del anterior y sumar el nuevo.
            cs.execute();
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } finally {
            msj = "Operation was successful";
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }



}
