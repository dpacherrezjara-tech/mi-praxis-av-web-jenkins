/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.screens;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A720Filter;
import net.miatech.beans.DashboardFilter;
import net.miatech.beans.IMF111Filter;
import net.miatech.beans.IMF121Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.interline.filter.WRF016Filterwk;
import net.miatech.praxis.payment.filter.A2789Filter;
import net.miatech.praxis.payment.filter.A2790Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jtorres
 */
public class AbnormalValueDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private BigDecimal bd;

    public AbnormalValueDAO() {
    }

    public AbnormalValueDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }


    /********************************************Refund********************************************/
    
    public List<A2790Filter> loadPX414SQP02008(A2790Filter filter) throws SQLException, Exception {
        List<A2790Filter> lstRtn = new ArrayList<A2790Filter>(0);
        A2790Filter objRtn;
        int QTYTRAN = 0, QTYERR1 = 0, QTYERR2 = 0, QTYERR3 = 0, QTYERR4 = 0, TOTAL = 0;
        double SVFOPUSD = 0, RVFOPUSD = 0, DIFF = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02008(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.VARCHAR);
            cstmt01.registerOutParameter(7, Types.VARCHAR);
            cstmt01.registerOutParameter(8, Types.VARCHAR);
            cstmt01.registerOutParameter(9, Types.VARCHAR);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TIPOFECHA);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_RCARCOD);
            cstmt01.setString(6, "");
            cstmt01.setString(7, "");
            cstmt01.setString(8, "");
            cstmt01.setString(9, "");

            cstmt01.execute();
            filter.dscError1 = cstmt01.getString(6).trim();
            filter.dscError2 = cstmt01.getString(7).trim();
            filter.dscError3 = cstmt01.getString(8).trim();
            filter.dscError4 = cstmt01.getString(9).trim();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                SVFOPUSD = rs01.getDouble("SVFOPUSD");
                RVFOPUSD = rs01.getDouble("RVFOPUSD");
                DIFF = rs01.getDouble("DIFF");
                QTYTRAN = rs01.getInt("QTYTRAN");
                QTYERR1 = rs01.getInt("QTYERR1");
                QTYERR2 = rs01.getInt("QTYERR2");
                QTYERR3 = rs01.getInt("QTYERR3");
                QTYERR4 = rs01.getInt("QTYERR4");
                TOTAL = rs01.getInt("TOTAL");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2790Filter();
                    objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                    objRtn.IN_RCARCOD = filter.IN_RCARCOD;
                    objRtn.dscError1 = filter.dscError1;
                    objRtn.dscError2 = filter.dscError2;
                    objRtn.dscError3 = filter.dscError3;
                    objRtn.dscError4 = filter.dscError4;

                    objRtn.FECHA = rs01.getString("FECHA");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECHA);
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.SVFOPUSD = rs01.getDouble("SVFOPUSD");
                    objRtn.RVFOPUSD = rs01.getDouble("RVFOPUSD");
                    objRtn.Diff1 = rs01.getDouble("DIFF");;
                    objRtn.Perc1 = (objRtn.SVFOPUSD > 0) ? (objRtn.RVFOPUSD * 100) / objRtn.SVFOPUSD : 0;
                    objRtn.QTYTRAN = rs01.getInt("QTYTRAN");
                    objRtn.QTYERR1 = rs01.getInt("QTYERR1");
                    objRtn.QTYERR2 = rs01.getInt("QTYERR2");
                    objRtn.QTYERR3 = rs01.getInt("QTYERR3");
                    objRtn.QTYERR4 = rs01.getInt("QTYERR4");
                    objRtn.TOTAL = rs01.getInt("TOTAL");

                    objRtn.totSVFOPUSD = SVFOPUSD;
                    objRtn.totRVFOPUSD = RVFOPUSD;
                    objRtn.totDiff1 = DIFF;
                    objRtn.totPerc1 = (objRtn.totSVFOPUSD > 0) ? (objRtn.totRVFOPUSD * 100) / objRtn.totSVFOPUSD : 0;

                    objRtn.totQTYTRAN = QTYTRAN;
                    objRtn.totQTYERR1 = QTYERR1;
                    objRtn.totQTYERR2 = QTYERR2;
                    objRtn.totQTYERR3 = QTYERR3;
                    objRtn.totTOTAL = TOTAL;

                    lstRtn.add(objRtn);
                }
            }

        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }

    public List<A2790Filter> loadPX414SQP02015(A2790Filter filter) throws SQLException, Exception {
        List<A2790Filter> lstRtn = new ArrayList<A2790Filter>(0);
        A2790Filter objRtn;
        int TOTAL = 0, QERROR = 0;
        double SVFOPUSD = 0, RVFOPUSD = 0, DIFF = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02015(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TIPOFECHA);
            cstmt01.setString(3, filter.FECHA);
            cstmt01.setString(4, filter.IN_CERROR);
            cstmt01.setString(5, filter.IN_CARD1);
            cstmt01.setString(6, filter.IN_CARD2);
            cstmt01.setString(7, filter.IN_RCARCOD);
            cstmt01.setString(8, filter.IN_FECHA_FROM);
            cstmt01.setString(9, filter.IN_FECHA_TO);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                TOTAL = rs01.getInt("TOTAL");
                QERROR = rs01.getInt("QERROR");
                SVFOPUSD = rs01.getDouble("SVFOP");
                RVFOPUSD = rs01.getDouble("RVFOP");
                DIFF = rs01.getDouble("DIFF");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2790Filter();
                    objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                    objRtn.FECHA = filter.FECHA;
                    objRtn.IN_CERROR = filter.IN_CERROR;
                    objRtn.strFormatDate1 = Functions.getMonthConvert(filter.FECHA);
                    objRtn.RCARDN = rs01.getString("RCARDN");
                    objRtn.RCARCOD = rs01.getString("RCARCOD");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FPRDA);
                    objRtn.SVFOPUSD = rs01.getDouble("SVFOP");
                    objRtn.RVFOPUSD = rs01.getDouble("RVFOP");
                    objRtn.Diff1 = rs01.getDouble("DIFF");;
                    objRtn.Perc1 = (objRtn.SVFOPUSD > 0) ? (objRtn.RVFOPUSD * 100) / objRtn.SVFOPUSD : 0;
                    objRtn.SEM1 = rs01.getInt("SEM1");
                    objRtn.SEM2 = rs01.getInt("SEM2");
                    objRtn.SEM3 = rs01.getInt("SEM3");
                    objRtn.SEM4 = rs01.getInt("SEM4");
                    objRtn.SEM5 = rs01.getInt("SEM5");
                    objRtn.TOTAL = rs01.getInt("TOTAL");
                    objRtn.QTYERROR = rs01.getInt("QERROR");

                    objRtn.totTOTAL = TOTAL;
                    objRtn.totQTYERROR = QERROR;
                    objRtn.totSVFOPUSD = SVFOPUSD;
                    objRtn.totRVFOPUSD = RVFOPUSD;
                    objRtn.totDiff1 = DIFF;
                    objRtn.totPerc1 = (objRtn.totSVFOPUSD > 0) ? (objRtn.totRVFOPUSD * 100) / objRtn.totSVFOPUSD : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }

        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }

    public List<A2789Filter> loadPX414SQP02018(A2790Filter filter) throws SQLException, Exception {

        List<A2789Filter> lstRtn = new ArrayList<A2789Filter>(0);
        A2789Filter objRtn;
        double SVFOP = 0, RVFOP = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02018(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TIPOFECHA);
            cstmt01.setString(3, filter.FECHA);
            cstmt01.setString(4, filter.RCARDN);
            cstmt01.setString(5, filter.RCARCOD);
            cstmt01.setString(6, filter.IN_CERROR);
            cstmt01.setString(7, filter.IN_TKT);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                SVFOP = rs01.getDouble("SVFOP");
                RVFOP = rs01.getDouble("RVFOP");
            }
            //CCIA,FORMA,SERIE,SCOUNTRY,SAGENT,SCURRENCY,SVFOP
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2789Filter();
                    objRtn.FECHA = filter.FECHA;
                    objRtn.strFormatDate1 = filter.strFormatDate1;

                    objRtn.RCARDN = filter.RCARDN;
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.strTicket = objRtn.CCIA + objRtn.FORMA + objRtn.SERIE;
                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY");
                    objRtn.SAGENT = rs01.getString("SAGENT");
                    objRtn.strDescription2 = rs01.getString("DES_AGENT");
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY");
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.FPRDA = rs01.getString("FPRDA");
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FPRDA);
                    objRtn.TORIG = rs01.getString("TORIG");
                    objRtn.strDescription = rs01.getString("DESTORIG");

                    objRtn.SEQ = rs01.getString("SEQ");
                    objRtn.SDATE = rs01.getString("SDATE");
                    objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.SDATE);
                    objRtn.RDATE = rs01.getString("RDATE");
                    objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.RDATE);

                    objRtn.RCARCOD = rs01.getString("RCARCOD");
                    objRtn.SCARDN = rs01.getString("SCARDN");
                    objRtn.RVFOP = rs01.getDouble("RVFOP");
                    objRtn.CERROR = rs01.getString("CERROR");
                    objRtn.strDescription1 = rs01.getString("DES_ERROR");
                    objRtn.diffDate = rs01.getInt("DIFF");
                    //objRtn.diffAmount = rs01.getDouble("SVFOP") - rs01.getDouble("RVFOP");
                    objRtn.diffAmount = rs01.getDouble("DIFF_AMT");
                    objRtn.strDescription4 = rs01.getString("TRNCU");

                    objRtn.totSVFOP = SVFOP;
                    objRtn.totRVFOP = RVFOP;
                    objRtn.totdiffAmount = objRtn.totSVFOP - objRtn.totRVFOP;

                    lstRtn.add(objRtn);
                }
            }

        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }
    
    public List<A1007> loadPX037S05A1007() throws SQLException, Exception {

        List<A1007> lstRtn = new ArrayList<A1007>(0);
        A1007 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX037S05A1007()}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1007();

                objRtn.A1007CTATO = rs01.getString("A1007CTATO");
                objRtn.A1007NOMBR = rs01.getString("A1007NOMBR");
                objRtn.A1007PAIS = rs01.getString("A1007PAIS");
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }

    // =========================================================================
    // =============================== SALES ===================================
    // =========================================================================
    public List<IMF111Filter> loadPX414SQP02393(IMF111Filter filter) throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<IMF111Filter>(0);
        IMF111Filter objRtn;
        long QTKTS = 0, QTKTSMAX = 0, QTKTSBEL = 0;
        double AMOUNT = 0, AMOUNTMAX = 0, AMOUNTBEL = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02393_2(?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QTKTS = rs01.getLong("QTKTSMIMF");
                QTKTSMAX = rs01.getLong("QTKTSMAXF");
                QTKTSBEL = rs01.getLong("QTKTSBELF");
                /*  QTKTS1 = rs01.getLong("QTKTS1");
                 QTKTS2 = rs01.getLong("QTKTS2");
                 QTKTS3 = rs01.getLong("QTKTS3");
                 QTKTS4 = rs01.getLong("QTKTS4");
                 QTKTS5 = rs01.getLong("QTKTS5");
                 QTKTS6 = rs01.getLong("QTKTS6");*/

                AMOUNT = rs01.getDouble("VALORMIMF");
                AMOUNTMAX = rs01.getDouble("VALORMAXF");
                AMOUNTBEL = rs01.getDouble("VALORBELF");
                /* AMOUNT1 = rs01.getDouble("AMOUNT1");
                 AMOUNT2 = rs01.getDouble("AMOUNT2");
                 AMOUNT3 = rs01.getDouble("AMOUNT3");
                 AMOUNT4 = rs01.getDouble("AMOUNT4");
                 AMOUNT5 = rs01.getDouble("AMOUNT5");
                 AMOUNT6 = rs01.getDouble("AMOUNT6");*/

                //VALADM = rs01.getDouble("VALADM");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF111Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.FlagFactor = filter.FlagFactor;
                    objRtn.FECHA = rs01.getString("DSALES");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECHA);
                    objRtn.QTKTS = rs01.getLong("QTKTSMIM");
                    objRtn.QTKTSmax = rs01.getLong("QTKTSMAX");
                    objRtn.QTKTSbel = rs01.getLong("QTKTSBEL");
                    /* objRtn.QTKTS1 = rs01.getLong("QTKTS1");
                     objRtn.QTKTS2 = rs01.getLong("QTKTS2");
                     objRtn.QTKTS3 = rs01.getLong("QTKTS3");
                     objRtn.QTKTS4 = rs01.getLong("QTKTS4");
                     objRtn.QTKTS5 = rs01.getLong("QTKTS5");
                     objRtn.QTKTS6 = rs01.getLong("QTKTS6");*/

                    objRtn.AMOUNT = rs01.getDouble("VALORMIM");
                    objRtn.AMOUNTmax = rs01.getDouble("VALORMAX");
                    objRtn.AMOUNTbel = rs01.getDouble("VALORBEL");
                    /*objRtn.AMOUNT1 = rs01.getDouble("AMOUNT1");
                     objRtn.AMOUNT2 = rs01.getDouble("AMOUNT2");
                     objRtn.AMOUNT3 = rs01.getDouble("AMOUNT3");
                     objRtn.AMOUNT4 = rs01.getDouble("AMOUNT4");
                     objRtn.AMOUNT5 = rs01.getDouble("AMOUNT5");
                     objRtn.AMOUNT6 = rs01.getDouble("AMOUNT6");
                     objRtn.VALADM = rs01.getDouble("VALADM");*/

                    objRtn.lngTotQTKTS = QTKTS;
                    objRtn.lngTotQTKTSmax = QTKTSMAX;
                    objRtn.lngTotQTKTSbel = QTKTSBEL;
                    /*objRtn.lngTotQTKTS1 = QTKTS1;
                     objRtn.lngTotQTKTS2 = QTKTS2;
                     objRtn.lngTotQTKTS3 = QTKTS3;
                     objRtn.lngTotQTKTS4 = QTKTS4;
                     objRtn.lngTotQTKTS5 = QTKTS5;
                     objRtn.lngTotQTKTS6 = QTKTS6;*/

                    objRtn.dblTotAMOUNT = AMOUNT;
                    objRtn.dblTotAMOUNTmax = AMOUNTMAX;
                    objRtn.dblTotAMOUNTbel = AMOUNTBEL;
                    /*objRtn.dblTotAMOUNT1 = AMOUNT1;
                     objRtn.dblTotAMOUNT2 = AMOUNT2;
                     objRtn.dblTotAMOUNT3 = AMOUNT3;
                     objRtn.dblTotAMOUNT4 = AMOUNT4;
                     objRtn.dblTotAMOUNT5 = AMOUNT5;
                     objRtn.dblTotAMOUNT6 = AMOUNT6;
                     objRtn.totVALADM = VALADM;*/

                    objRtn.perMax = (objRtn.dblTotAMOUNTmax > 0) ? (objRtn.AMOUNTmax * 100) / objRtn.dblTotAMOUNTmax : 0;
                    objRtn.perMim = (objRtn.dblTotAMOUNT > 0) ? (objRtn.AMOUNT * 100) / objRtn.dblTotAMOUNT : 0;
                    objRtn.perBel = (objRtn.dblTotAMOUNTbel > 0) ? (objRtn.AMOUNTbel * 100) / objRtn.dblTotAMOUNTbel : 0;

                    objRtn.avgMax = (objRtn.QTKTSmax > 0) ? (objRtn.AMOUNTmax) / objRtn.QTKTSmax : 0;
                    objRtn.avgMim = (objRtn.QTKTS > 0) ? (objRtn.AMOUNT) / objRtn.QTKTS : 0;
                    objRtn.avgBel = (objRtn.QTKTSbel > 0) ? (objRtn.AMOUNTbel) / objRtn.QTKTSbel : 0;

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
        } finally {
            setClose(rs01, cstmt01, cnx);
//            if (rs01 != null) {
//                try {
//                    rs01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt01 != null) {
//                try {
//                    cstmt01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<IMF111Filter> loadPX414SQP02394(IMF111Filter filter) throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<IMF111Filter>(0);
        IMF111Filter objRtn;
        long PMP = 0, PMP1 = 0;
        double RATED = 0, VALOR = 0, VALOR1 = 0, VALOREX = 0, VALORCA = 0, VALORCC = 0, VALADM = 0, VALORMIN = 0, VALORBAS = 0, DIFFNORMAL = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);
        NumberFormat nfLng = NumberFormat.getInstance(java.util.Locale.US);
        nfLng.setMaximumFractionDigits(0);

        String SQLCLL01 = "{CALL PRAXIS.SQP02394(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA);
            cstmt01.setString(3, filter.IN_FLAGEX);
            cstmt01.setString(4, filter.IN_RATED);
            cstmt01.setString(5, filter.IN_TYPE);
            cstmt01.setString(6, filter.IN_ORDER);
            cstmt01.setString(7, filter.FlagFactor);
            cstmt01.setString(8, filter.CITYO);
            cstmt01.setString(9, filter.CITYD);
            cstmt01.setString(10, filter.FECR);
            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                PMP = rs01.getLong("PMP");
                PMP1 = rs01.getLong("PMP1");

                RATED = rs01.getDouble("RATED");
                VALOR = rs01.getDouble("VALOR");
                //VALOR1 = rs01.getDouble("VALOR1");
                //VALOREX = rs01.getDouble("VALOREX");
                //VALORCA = rs01.getDouble("VALORCA");
                //VALORCC = rs01.getDouble("VALORCC");
                // VALADM = rs01.getDouble("VALADM");
                VALORMIN = rs01.getDouble("VALORMIN");
                VALORBAS = rs01.getDouble("VALORBASE");
                DIFFNORMAL = rs01.getDouble("DIFFNORMAL");

            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF111Filter();
                    objRtn.FECHA = filter.FECHA;
                    objRtn.IN_FLAGEX = filter.IN_FLAGEX;
                    objRtn.IN_RATED = filter.IN_RATED;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.IN_TYPE = filter.IN_TYPE;
                    objRtn.IN_ORDER = filter.IN_ORDER;
                    objRtn.FlagFactor = filter.FlagFactor;
                    objRtn.CITYO = filter.CITYO;
                    objRtn.CITYD = filter.CITYD;
                    objRtn.SALICPN = rs01.getString("SALICPN");
                    objRtn.USEICPN = rs01.getString("USEICPN");
                    objRtn.FSAVUS = rs01.getString("FSAVUS");
                    //  objRtn.strColor = rs01.getString("strColor");
                    objRtn.strDescription1 = rs01.getString("FSAVUS");
                    objRtn.RATEPOR = rs01.getDouble("RATEPOR");
                    objRtn.CITYS = rs01.getString("CITYO") + " - " + rs01.getString("CITYD");
                    objRtn.COUNTRYS = rs01.getString("COUNTRYS");
                    objRtn.strCountry = rs01.getString("DES_COUN");
                    objRtn.DESC_ORIG = rs01.getString("DESC_ORIG") + " - " + rs01.getString("DESC_DEST");
                    objRtn.DESC_DEST = rs01.getString("DESC_A720RUTA0") + " - " + rs01.getString("DESC_A720RUTA1") + " - "
                            + rs01.getString("DESC_A720RUTA2") + " - " + rs01.getString("DESC_A720RUTA3") + " - "
                            + rs01.getString("DESC_A720RUTA4");
                    /*  objRtn.strA720CARRA1= rs01.getString("DESC_A720CARRA1");
                     objRtn.strA720CARRA2= rs01.getString("DESC_A720CARRA2");
                     objRtn.strA720CARRA3= rs01.getString("DESC_A720CARRA3");
                     objRtn.strA720CARRA4= rs01.getString("DESC_A720CARRA4");*/
                    objRtn.CLASEO = rs01.getString("CLASEO");
                    objRtn.FACRMI = rs01.getDouble("FACRMI");
                    objRtn.FACMIN = rs01.getDouble("FACMIN");
                    objRtn.FACMAX = rs01.getDouble("FACMAX");
                    objRtn.FACRBA = rs01.getDouble("FACRBA");
                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strDescription = rs01.getString("DESCAGT");
                    objRtn.VENDOR = rs01.getString("VENDOR");
                    objRtn.FEAC = Functions.getMonthConvert(rs01.getString("FEAC"));;
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.strTicket = rs01.getString("CCIA") + rs01.getString("FORMA") + rs01.getString("SERIE");
                    objRtn.TKT = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                    objRtn.FAREBASE = rs01.getString("FAREBASE").trim();
                    objRtn.DIFFNORMAL = rs01.getDouble("DIFFNORMAL");
                    objRtn.PMP = rs01.getLong("PMP");
                    objRtn.PMP1 = rs01.getLong("PMP1");
                    objRtn.RATED = rs01.getDouble("RATED");
                    objRtn.CURRENC = rs01.getString("CURRENC");
                    objRtn.VALOR = rs01.getDouble("VALOR");

                    objRtn.A720VALOR1 = rs01.getDouble("A720VALOR1");
                    objRtn.A720VALOR2 = rs01.getDouble("A720VALOR2");
                    objRtn.A720VALOR3 = rs01.getDouble("A720VALOR3");
                    objRtn.A720VALOR4 = rs01.getDouble("A720VALOR4");
                    objRtn.A720FACT1 = rs01.getLong("A720FACT1");
                    objRtn.A720FACT2 = rs01.getLong("A720FACT2");
                    objRtn.A720FACT3 = rs01.getLong("A720FACT3");
                    objRtn.A720FACT4 = rs01.getLong("A720FACT4");
                    /* objRtn.A720FBUSO1 = rs01.getString("A720FBUSO1");
                     objRtn.A720FBUSO2 = rs01.getString("A720FBUSO2");
                     objRtn.A720FBUSO3 = rs01.getString("A720FBUSO3");
                     objRtn.A720FBUSO4 = rs01.getString("A720FBUSO4");*/
                    objRtn.A720CARRA1 = rs01.getString("A720CARRA1");
                    objRtn.A720CARRA2 = rs01.getString("A720CARRA2");
                    objRtn.A720CARRA3 = rs01.getString("A720CARRA3");
                    objRtn.A720CARRA4 = rs01.getString("A720CARRA4");

                    if (objRtn.A720VALOR1 > 0) {
                        objRtn.strA720VALOR1 = nfDbl.format(objRtn.A720VALOR1);
                    }
                    if (objRtn.A720VALOR2 > 0) {
                        objRtn.strA720VALOR2 = nfDbl.format(objRtn.A720VALOR2);
                    }
                    if (objRtn.A720VALOR3 > 0) {
                        objRtn.strA720VALOR3 = nfDbl.format(objRtn.A720VALOR3);
                    }
                    if (objRtn.A720VALOR4 > 0) {
                        objRtn.strA720VALOR4 = nfDbl.format(objRtn.A720VALOR4);
                    }

                    if (objRtn.A720FACT1 > 0) {
                        objRtn.strA720FACT1 = nfLng.format(objRtn.A720FACT1);
                    }
                    if (objRtn.A720FACT2 > 0) {
                        objRtn.strA720FACT2 = nfLng.format(objRtn.A720FACT2);
                    }
                    if (objRtn.A720FACT3 > 0) {
                        objRtn.strA720FACT3 = nfLng.format(objRtn.A720FACT3);
                    }
                    if (objRtn.A720FACT4 > 0) {
                        objRtn.strA720FACT4 = nfLng.format(objRtn.A720FACT4);
                    }

                    objRtn.rout = rs01.getString("A720RUTA0") + " - " + rs01.getString("A720RUTA1") + " - "
                            + rs01.getString("A720RUTA2") + " - " + rs01.getString("A720RUTA3") + " - " + rs01.getString("A720RUTA4");
                    objRtn.totvalor01 = rs01.getDouble("A720VALOR1") + rs01.getDouble("A720VALOR2")
                            + rs01.getDouble("A720VALOR3") + rs01.getDouble("A720VALOR4");
                    objRtn.totmilla01 = rs01.getLong("A720FACT1") + rs01.getLong("A720FACT2") + rs01.getLong("A720FACT3")
                            + rs01.getLong("A720FACT4");
                    //   objRtn.VALOR1 = rs01.getDouble("VALOR1");
                    //   objRtn.VALOREX = rs01.getDouble("VALOREX");
                    //   objRtn.VALORCA = rs01.getDouble("VALORCA");
                    //   objRtn.VALORCC = rs01.getDouble("VALORCC");
                    //   objRtn.EXCHAN = rs01.getString("EXCHAN");
                    //   objRtn.VALADM = rs01.getDouble("VALADM");

                    objRtn.VALORMIN = rs01.getDouble("VALORMIN");
                    objRtn.VALORBAS = rs01.getDouble("VALORBASE");
                    objRtn.strDescription2 = rs01.getString("CANAVS").trim();
                    /*if (objRtn.CANAV.equals("B")) {
                     objRtn.strDescription2 = "BSP";
                     } else if (objRtn.CANAV.equals("A")) {
                     objRtn.strDescription2 = "ARC";
                     } else if (objRtn.CANAV.equals("S")) {
                     objRtn.strDescription2 = "ASR";
                     } else if (objRtn.CANAV.equals("T")) {
                     objRtn.strDescription2 = "TCN";
                     }*/

                    if (rs01.getString("CANAVS").trim().equals("ASR")) {
                        if (rs01.getString("TDOC").equals("INT")) {
                            objRtn.TDOC = "WEB";
                        } else {
                            objRtn.TDOC = rs01.getString("TDOC");
                        }
                    } else {
                        objRtn.TDOC = "";
                    }
                    objRtn.totPMP = PMP;
                    objRtn.totPMP1 = PMP1;
                    objRtn.totRATED = RATED;
                    objRtn.totVALOR = VALOR;
                    objRtn.totVALOR1 = VALOR1;
                    objRtn.totVALOREX = VALOREX;
                    objRtn.totVALORCA = VALORCA;
                    objRtn.totVALORCC = VALORCC;
                    objRtn.totVALADM = VALADM;

                    objRtn.totVALORBAS = VALORBAS;
                    objRtn.totVALORMIN = VALORMIN;
                    objRtn.totVALORMAX = DIFFNORMAL;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }

    public List<IMF111Filter> loadPX414SQP02395(IMF111Filter filter) throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<IMF111Filter>(0);
        IMF111Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02395(?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_AGENTE);
            cstmt01.setString(5, filter.IN_TKT);
            cstmt01.setString(6, filter.IN_TYPE);
            cstmt01.setString(7, filter.IN_ORDER);
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                objRtn = new IMF111Filter();
                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                objRtn.IN_AGENTE = filter.IN_AGENTE;
                objRtn.IN_TKT = filter.IN_TKT;
                objRtn.IN_TYPE = filter.IN_TYPE;
                objRtn.IN_ORDER = filter.IN_ORDER;

                objRtn.RATEPOR = rs01.getDouble("RATEPOR");
                objRtn.SALICPN = rs01.getString("SALICPN");
                objRtn.USEICPN = rs01.getString("USEICPN");
                objRtn.DSALES = rs01.getString("DSALES");
                objRtn.CITYS = rs01.getString("CITYO") + " - " + rs01.getString("CITYD");
                objRtn.DESC_ORIG = rs01.getString("DESC_ORIG") + "-" + rs01.getString("DESC_DEST");
                objRtn.COUNTRYS = rs01.getString("COUNTRYS");
                objRtn.strCountry = rs01.getString("DES_COUN");
                objRtn.CLASEO = rs01.getString("CLASEO");
                objRtn.FACRMI = rs01.getDouble("FACRMI");
                objRtn.FACMIN = rs01.getDouble("FACMIN");
                objRtn.FACMAX = rs01.getDouble("FACMAX");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                objRtn.VENDOR = rs01.getString("VENDOR");
                objRtn.strDescription = rs01.getString("DESCAGT");
                objRtn.strDescription1 = rs01.getString("TIPOFAC");
                objRtn.CCIA = rs01.getString("CCIA");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.TKT = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");

                objRtn.PMP = rs01.getLong("PMP");
                objRtn.PMP1 = rs01.getLong("PMP1");
                objRtn.RATED = rs01.getDouble("RATED");
                objRtn.CURRENC = rs01.getString("CURRENC");
                objRtn.VALOR = rs01.getDouble("VALOR");
                objRtn.VALOR1 = rs01.getDouble("VALOR1");
                objRtn.VALOREX = rs01.getDouble("VALOREX");
                objRtn.VALORCA = rs01.getDouble("VALORCA");
                objRtn.VALORCC = rs01.getDouble("VALORCC");
                objRtn.FACRBA = rs01.getDouble("FACRBA");
                objRtn.EXCHAN = rs01.getString("EXCHAN");
                objRtn.VALADM = rs01.getDouble("VALADM");
                objRtn.FAREBASE = rs01.getString("FAREBASE").trim();
                objRtn.DIFFNORMAL = rs01.getDouble("DIFFNORMAL");
                objRtn.VALORMIN = rs01.getDouble("VALORMIN");
                objRtn.VALORBAS = rs01.getDouble("VALORBASE");
                objRtn.CANAV = rs01.getString("CANAV").trim();
                if (objRtn.CANAV.equals("B")) {
                    objRtn.strDescription2 = "BSP";
                } else if (objRtn.CANAV.equals("A")) {
                    objRtn.strDescription2 = "ARC";
                } else if (objRtn.CANAV.equals("S")) {
                    objRtn.strDescription2 = "ASR";
                } else if (objRtn.CANAV.equals("T")) {
                    objRtn.strDescription2 = "TCN";
                }

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }

    // =========================================================================
    // ================= SALES AGENT CONTROL ===================================
    // =========================================================================    
    public List<WRF016Filterwk> loadPX109SQP01230_MESES(DashboardFilter filter) throws SQLException, Exception {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        int CP1 = 0, CP2 = 0, CP3 = 0, CP4 = 0, CP5 = 0, CP6 = 0, TKT1 = 0, TKT2 = 0, TKT3 = 0, TKT4 = 0, TKT5 = 0, TKT6 = 0;
        double AMT1 = 0, AMT2 = 0, AMT3 = 0, AMT4 = 0, AMT5 = 0, AMT6 = 0, TOTVAR = 0, TOTGEN = 0, PROMEDIO = 0;
        String mes1 = "", mes2 = "", mes3 = "", mes4 = "", mes5 = "", mes6 = "", fec_actual = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01230(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);
            cstmt.setString(5, filter.strTIPO);
            cstmt.setString(6, filter.FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.execute();
            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                AMT1 = rst.getDouble("M1");
                CP1 = rst.getInt("C1");
                TKT1 = rst.getInt("T1");
                AMT2 = rst.getDouble("M2");
                CP2 = rst.getInt("C2");
                TKT2 = rst.getInt("T2");
                AMT3 = rst.getDouble("M3");
                CP3 = rst.getInt("C3");
                TKT3 = rst.getInt("T3");
                AMT4 = rst.getDouble("M4");
                CP4 = rst.getInt("C4");
                TKT4 = rst.getInt("T4");
                AMT5 = rst.getDouble("M5");
                CP5 = rst.getInt("C5");
                TKT5 = rst.getInt("T5");
                AMT6 = rst.getDouble("M6");
                CP6 = rst.getInt("C6");
                TKT6 = rst.getInt("T6");
                //TOTGEN = rst.getDouble("TOTGEN");
                PROMEDIO = rst.getDouble("PROMEDIO");
                TOTVAR = rst.getDouble("TOTVAR");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("CODTRAN");

                    objRtn.Aud1 = rst.getDouble("M1");
                    objRtn.Rej1 = rst.getInt("C1");
                    objRtn.Sup1 = rst.getInt("T1");

                    objRtn.Aud2 = rst.getDouble("M2");
                    objRtn.Rej2 = rst.getInt("C2");
                    objRtn.Sup2 = rst.getInt("T2");

                    objRtn.Aud3 = rst.getDouble("M3");
                    objRtn.Rej3 = rst.getInt("C3");
                    objRtn.Sup3 = rst.getInt("T3");

                    objRtn.Aud4 = rst.getDouble("M4");
                    objRtn.Rej4 = rst.getInt("C4");
                    objRtn.Sup4 = rst.getInt("T4");

                    objRtn.Aud5 = rst.getDouble("M5");
                    objRtn.Rej5 = rst.getInt("C5");
                    objRtn.Sup5 = rst.getInt("T5");

                    objRtn.Aud6 = rst.getDouble("M6");
                    objRtn.Rej6 = rst.getInt("C6");
                    objRtn.Sup6 = rst.getInt("T6");

                    objRtn.Rate1 = rst.getDouble("DIFF");
                    objRtn.Rate2 = rst.getDouble("PROMEDIO");
                    objRtn.Rate3 = rst.getDouble("VAR");

                    //objRtn.Rate4 = TOTGEN;
                    objRtn.Rate5 = PROMEDIO;
                    objRtn.Rate6 = TOTVAR;

                    objRtn.dblPerRev = (AMT6 > 0) ? objRtn.Aud6 * 100 / AMT6 : 0;//Porcentajes del último mes
                    if (objRtn.dblPerRev < 0) {
                        objRtn.dblPerRev = objRtn.dblPerRev * -1;
                    }

                    objRtn.totNet1 = AMT1;
                    objRtn.totRej1 = CP1;
                    objRtn.totSup1 = TKT1;
                    objRtn.totNet2 = AMT2;
                    objRtn.totRej2 = CP2;
                    objRtn.totSup2 = TKT2;
                    objRtn.totNet3 = AMT3;
                    objRtn.totRej3 = CP3;
                    objRtn.totSup3 = TKT3;
                    objRtn.totNet4 = AMT4;
                    objRtn.totRej4 = CP4;
                    objRtn.totSup4 = TKT4;
                    objRtn.totNet5 = AMT5;
                    objRtn.totRej5 = CP5;
                    objRtn.totSup5 = TKT5;
                    objRtn.totNet6 = AMT6;
                    objRtn.totRej6 = CP6;
                    objRtn.totSup6 = TKT6;

                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                    lista.add(objRtn);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;

    }

    public List<WRF016Filterwk> loadPX109SQP02476_COUNTRY(DashboardFilter filter) throws SQLException, Exception {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        double AMT1 = 0;
        int REJ1 = 0;
        String mes1 = "", mes2 = "", mes3 = "", mes4 = "", mes5 = "", mes6 = "", fec_actual = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02476(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);
            cstmt.setString(5, filter.strTIPO);
            cstmt.setString(6, filter.FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);

            cstmt.execute();

            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                AMT1 = rst.getDouble("M6");
                REJ1 = rst.getInt("C6");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("COUNTRYS");
                    objRtn.strCountryName = rst.getString("DESCRIP");
                    objRtn.TDOC = rst.getString("TRNCU");
                    objRtn.FMETHOD = rst.getString("CANAV");
                    objRtn.Aud1 = rst.getDouble("M6");
                    objRtn.Rej1 = rst.getInt("C6");
                    objRtn.Avg1 = rst.getDouble("AVG");
                    objRtn.Diff1 = rst.getDouble("DIFF");
                    objRtn.Var1 = rst.getDouble("VAR");

                    objRtn.totNet1 = AMT1;
                    objRtn.totRej1 = REJ1;

                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lista.add(objRtn);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;

    }

    public List<WRF016Filterwk> loadPX109SQP01232_COUNTRY(DashboardFilter filter) throws SQLException, Exception {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        double AMT1 = 0;
        String mes1 = "", mes2 = "", mes3 = "", mes4 = "", mes5 = "", mes6 = "", fec_actual = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01232(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);
            cstmt.setString(5, filter.strTIPO);
            cstmt.setString(6, filter.FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);

            cstmt.execute();

            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                AMT1 = rst.getDouble("M6");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("COUNTRYS");
                    objRtn.strFlag = rst.getString("DESCRIP");

                    objRtn.Aud1 = rst.getDouble("M6");
                    objRtn.Avg1 = rst.getDouble("AVG");
                    objRtn.Diff1 = rst.getDouble("DIFF");
                    objRtn.Var1 = rst.getDouble("VAR");

                    objRtn.totNet1 = AMT1;

                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lista.add(objRtn);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;

    }

    public List<DashboardFilter> loadPX414SQP02022(DashboardFilter filter) throws SQLException, Exception {
        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02022(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.VENDOR);
            cstmt01.setString(5, filter.FTE);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new DashboardFilter();
                objRtn.FTE = filter.FTE;
                objRtn.VENDOR = rs01.getString("VENDOR");
                objRtn.strDescription = filter.strDescription;
                objRtn.DSALES = rs01.getString("DSALES");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                objRtn.strFormatDate1 = filter.strFormatDate1;
                objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                objRtn.AVG = rs01.getDouble("PROMEDIO");

                lstRtn.add(objRtn);
            }

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

        return lstRtn;
    }

    // =========================================================================
    // ======================= Difference Fare =================================
    // =========================================================================
    public List<IMF121Filter> loadPX414SQPGG121(IMF121Filter filter) throws SQLException, Exception {

        List<IMF121Filter> lstRtn = new ArrayList<>(0);
        IMF121Filter objRtn;
        long QTKTSH = 0;
        double VALORH = 0;
        long QTKTSL = 0;
        double VALORL = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);
        NumberFormat nfLng = NumberFormat.getInstance(java.util.Locale.US);
        nfLng.setMaximumFractionDigits(0);

        String SQLCLL01 = "{CALL PRAXIS.GG121(?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);

            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            System.out.println(filter.DSALES);
            System.out.println("");
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QTKTSH = rs01.getLong("QTKTSH");
                VALORH = rs01.getDouble("VALORH");
                QTKTSL = rs01.getLong("QTKTSL");
                VALORL = rs01.getDouble("VALORL");
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF121Filter();
                    objRtn.DSALES = rs01.getString("DSALES").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);

                    objRtn.QTTKT = rs01.getLong("QTKTSH") + rs01.getLong("QTKTSL");
                    objRtn.VALORT = rs01.getDouble("VALORH") + rs01.getDouble("VALORL");

                    objRtn.QTKTSH = rs01.getLong("QTKTSH");
                    objRtn.QTKTSL = rs01.getLong("QTKTSL");
                    objRtn.VALORH = rs01.getDouble("VALORH");
                    objRtn.VALORL = rs01.getDouble("VALORL");

                    objRtn.totQTKTSH = QTKTSH;
                    objRtn.totQTKTSL = QTKTSL;
                    objRtn.totVALORH = VALORH;
                    objRtn.totVALORL = VALORL;

                    objRtn.totQTTKT = QTKTSH + QTKTSL;
                    objRtn.totVALORT = VALORH + VALORL;

//                    objRtn.page.PAGNUM = filter.page.PAGNUM;
//                    objRtn.page.PAGROW = filter.page.PAGROW;
//                    objRtn.page.TOTPAG = filter.page.TOTPAG;
//                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
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

        return lstRtn;
    }

    public List<IMF121Filter> loadPX414SQPGG122(IMF121Filter filter) throws SQLException, Exception {

        List<IMF121Filter> lstRtn = new ArrayList<>(0);
        IMF121Filter objRtn;
        long QTKTSH = 0;
        double VALORH = 0;
        long QTKTSL = 0;
        double VALORL = 0;
        String strTitulo = "Sales Date : " + filter.strFormatDate;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);
        NumberFormat nfLng = NumberFormat.getInstance(java.util.Locale.US);
        nfLng.setMaximumFractionDigits(0);

        String SQLCLL01 = "{CALL PRAXIS.GG122(?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QTKTSH = rs01.getLong("QTKTSH");
                VALORH = rs01.getDouble("VALORH");
                QTKTSL = rs01.getLong("QTKTSL");
                VALORL = rs01.getDouble("VALORL");
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF121Filter();
                    objRtn.COUNTRYS = rs01.getString("COUNTRYS").trim();
                    objRtn.strTitulo = strTitulo;

                    objRtn.QTTKT = rs01.getLong("QTKTSH") + rs01.getLong("QTKTSL");
                    objRtn.VALORT = rs01.getLong("VALORH") + rs01.getLong("VALORL");

                    objRtn.QTKTSH = rs01.getLong("QTKTSH");
                    objRtn.QTKTSL = rs01.getLong("QTKTSL");
                    objRtn.VALORH = rs01.getLong("VALORH");
                    objRtn.VALORL = rs01.getLong("VALORL");

                    objRtn.totQTKTSH = QTKTSH;
                    objRtn.totQTKTSL = QTKTSL;
                    objRtn.totVALORH = VALORH;
                    objRtn.totVALORL = VALORL;

                    objRtn.totQTTKT = QTKTSH + QTKTSL;
                    objRtn.totVALORT = VALORH + VALORL;

                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
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

        return lstRtn;
    }

    public void setClose(ResultSet rs, CallableStatement cstmt, Connection cnx) {

        try {
            if (rs != null) {
                try {
                    rs.close();
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
        } catch (Exception e) {

        }

    }
    
    public List<WRF016Filterwk> loadPX109SQP01231_AGENT(DashboardFilter filter) throws SQLException, Exception {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        int CP1 = 0, CP2 = 0, CP3 = 0, CP4 = 0, CP5 = 0, CP6 = 0, TKT1 = 0, TKT2 = 0, TKT3 = 0, TKT4 = 0, TKT5 = 0, TKT6 = 0;
        double AMT1 = 0, AMT2 = 0, AMT3 = 0, AMT4 = 0, AMT5 = 0, AMT6 = 0, TOTVAR = 0, TOTDIFF = 0, PROMEDIO = 0;
        String mes1 = "", mes2 = "", mes3 = "", mes4 = "", mes5 = "", mes6 = "", fec_actual = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS364(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.CCUST = rst.getString("CCUST");
                    objRtn.VENDOR = rst.getString("VENDOR");
                    objRtn.CANAV = rst.getString("CANAV");
                    objRtn.NAGENT = rst.getString("NAGENT");
                    objRtn.TYPEAG = rst.getString("TYPEAG");
                    objRtn.ASTATUS = rst.getString("ASTATUS");
                    objRtn.RSTATUS = rst.getString("RSTATUS");
                    objRtn.SAGECTR = rst.getString("SAGECTR");
                    
                    objRtn.MONTHCRE = rst.getInt("MONTHCRE");
                    objRtn.QTYTKCRE = rst.getInt("QTYTKCRE");
                    
                    objRtn.AMOUNCRE = rst.getDouble("AMOUNCRE");
                    objRtn.FMOUNCRE = rst.getDouble("FMOUNCRE");
                    objRtn.DESVICRE = rst.getDouble("DESVICRE");
                    objRtn.ALERTCRE = rst.getDouble("ALERTCRE");
                    
                    objRtn.MONTHCAS = rst.getInt("MONTHCAS");
                    objRtn.QTYTKCAS = rst.getInt("QTYTKCAS");
                    
                    objRtn.AMOUNCAS = rst.getDouble("AMOUNCAS");
                    objRtn.FMOUNCAS = rst.getDouble("FMOUNCAS");
                    objRtn.DESVICAS = rst.getDouble("DESVICAS");
                    objRtn.ALERTCAS = rst.getDouble("ALERTCAS");
                    
                    lista.add(objRtn);
                }
            rst.close();

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;

    }
    
    public List<WRF016Filterwk> loadPX109SQP01231_AGENTBK(DashboardFilter filter) throws SQLException, Exception {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        int CP1 = 0, CP2 = 0, CP3 = 0, CP4 = 0, CP5 = 0, CP6 = 0, TKT1 = 0, TKT2 = 0, TKT3 = 0, TKT4 = 0, TKT5 = 0, TKT6 = 0;
        double AMT1 = 0, AMT2 = 0, AMT3 = 0, AMT4 = 0, AMT5 = 0, AMT6 = 0, TOTVAR = 0, TOTDIFF = 0, PROMEDIO = 0;
        String mes1 = "", mes2 = "", mes3 = "", mes4 = "", mes5 = "", mes6 = "", fec_actual = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01231(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);
            cstmt.setString(5, filter.strTIPO);
            cstmt.setString(6, filter.FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);

            cstmt.execute();

            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                AMT1 = rst.getDouble("M1");
                CP1 = rst.getInt("C1");
                TKT1 = rst.getInt("T1");
                AMT2 = rst.getDouble("M2");
                CP2 = rst.getInt("C2");
                TKT2 = rst.getInt("T2");
                AMT3 = rst.getDouble("M3");
                CP3 = rst.getInt("C3");
                TKT3 = rst.getInt("T3");
                AMT4 = rst.getDouble("M4");
                CP4 = rst.getInt("C4");
                TKT4 = rst.getInt("T4");
                AMT5 = rst.getDouble("M5");
                CP5 = rst.getInt("C5");
                TKT5 = rst.getInt("T5");
                AMT6 = rst.getDouble("M6");
                CP6 = rst.getInt("C6");
                TKT6 = rst.getInt("T6");
                //TOTDIFF = rst.getDouble("TOTDIFF");
                PROMEDIO = rst.getDouble("PROMEDIO");
                TOTVAR = rst.getDouble("TOTVAR");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("VENDOR");
                    objRtn.strFlag = rst.getString("DESCRIP");
                    objRtn.strFormatDate = rst.getString("DIRECC");
                    objRtn.strFormatDate1 = rst.getString("CANAV");
                    objRtn.COMENT1 = rst.getString("CANAL");//TYPE

                    objRtn.Aud1 = rst.getDouble("M1");
                    objRtn.Rej1 = rst.getInt("C1");
                    objRtn.Sup1 = rst.getInt("T1");

                    objRtn.Aud2 = rst.getDouble("M2");
                    objRtn.Rej2 = rst.getInt("C2");
                    objRtn.Sup2 = rst.getInt("T2");

                    objRtn.Aud3 = rst.getDouble("M3");
                    objRtn.Rej3 = rst.getInt("C3");
                    objRtn.Sup3 = rst.getInt("T3");

                    objRtn.Aud4 = rst.getDouble("M4");
                    objRtn.Rej4 = rst.getInt("C4");
                    objRtn.Sup4 = rst.getInt("T4");

                    objRtn.Aud5 = rst.getDouble("M5");
                    objRtn.Rej5 = rst.getInt("C5");
                    objRtn.Sup5 = rst.getInt("T5");

                    objRtn.Aud6 = rst.getDouble("M6");
                    objRtn.Rej6 = rst.getInt("C6");
                    objRtn.Sup6 = rst.getInt("T6");

                    //objRtn.Rate1 = rst.getDouble("TOTGEN");
                    objRtn.Rate2 = rst.getDouble("PROMEDIO");
                    objRtn.Diff1 = rst.getDouble("DIFF");
                    objRtn.Rate3 = rst.getDouble("VAR");

                    //objRtn.Rate4 = TOTGEN;
                    objRtn.Rate4 = TOTDIFF;
                    objRtn.Rate5 = PROMEDIO;
                    objRtn.Rate6 = TOTVAR;

                    objRtn.totNet1 = AMT1;
                    objRtn.totRej1 = CP1;
                    objRtn.totSup1 = TKT1;
                    objRtn.totNet2 = AMT2;
                    objRtn.totRej2 = CP2;
                    objRtn.totSup2 = TKT2;
                    objRtn.totNet3 = AMT3;
                    objRtn.totRej3 = CP3;
                    objRtn.totSup3 = TKT3;
                    objRtn.totNet4 = AMT4;
                    objRtn.totRej4 = CP4;
                    objRtn.totSup4 = TKT4;
                    objRtn.totNet5 = AMT5;
                    objRtn.totRej5 = CP5;
                    objRtn.totSup5 = TKT5;
                    objRtn.totNet6 = AMT6;
                    objRtn.totRej6 = CP6;
                    objRtn.totSup6 = TKT6;

                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lista.add(objRtn);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;

    }

    public HashMap loadPX109SQP02217(DashboardFilter filter) throws SQLException, Exception {

        HashMap hm = new HashMap();
        List<WRF016Filterwk> listaS = new ArrayList<WRF016Filterwk>(0);
        List<WRF016Filterwk> listaR = new ArrayList<WRF016Filterwk>(0);
        List<WRF016Filterwk> listaE = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        double AMT1 = 0;
        String mes1 = "", mes2 = "", mes3 = "", mes4 = "", mes5 = "", mes6 = "", fec_actual = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02217(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);
            cstmt.setString(5, filter.strTIPO);
            cstmt.setString(6, filter.FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);

            cstmt.execute();

            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                AMT1 = rst.getDouble("M6");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("VENDOR");
                    objRtn.strFlag = rst.getString("DESCRIP");
                    objRtn.FECHA = fec_actual;
                    objRtn.COMENT1 = "Country : " + filter.IN_PAIS + " - " + filter.strCountryS;

                    objRtn.Aud1 = rst.getDouble("M6");
                    objRtn.Avg1 = rst.getDouble("AVG");
                    //objRtn.Diff1 = rst.getDouble("M6") - rst.getDouble("AVG");
                    objRtn.Diff1 = rst.getDouble("DIFF");
                    objRtn.Var1 = rst.getDouble("VAR");

                    objRtn.totNet1 = AMT1;

                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    listaS.add(objRtn);
                }
            }
            hm.put("SALE", listaS);
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    AMT1 = rst.getDouble("M6");

                }
                rst.close();

                if (cstmt.getMoreResults()) {
                    rst = cstmt.getResultSet();

                    while (rst.next()) {
                        objRtn = new WRF016Filterwk();
                        objRtn.AIRLINE = rst.getString("VENDOR");
                        objRtn.strFlag = rst.getString("DESCRIP");
                        objRtn.FECHA = fec_actual;
                        objRtn.COMENT1 = "Country : " + filter.IN_PAIS + " - " + filter.strCountryS;

                        objRtn.Aud1 = rst.getDouble("M6");
                        objRtn.Avg1 = rst.getDouble("AVG");
                        //objRtn.Diff1 = rst.getDouble("M6") - rst.getDouble("AVG");
                        objRtn.Diff1 = rst.getDouble("DIFF");
                        objRtn.Var1 = rst.getDouble("VAR");

                        objRtn.totNet1 = AMT1;

                        objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                        objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                        objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                        objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                        objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                        //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                        objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                        objRtn.page.PAGNUM = filter.page.PAGNUM;
                        objRtn.page.PAGROW = filter.page.PAGROW;
                        objRtn.page.TOTPAG = filter.page.TOTPAG;
                        objRtn.page.TOTROW = filter.page.TOTROW;

                        listaR.add(objRtn);
                    }
                }
            }
            hm.put("REFUND", listaR);
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    AMT1 = rst.getDouble("M6");

                }
                rst.close();

                if (cstmt.getMoreResults()) {
                    rst = cstmt.getResultSet();

                    while (rst.next()) {
                        objRtn = new WRF016Filterwk();
                        objRtn.AIRLINE = rst.getString("VENDOR");
                        objRtn.strFlag = rst.getString("DESCRIP");
                        objRtn.FECHA = fec_actual;
                        objRtn.COMENT1 = "Country : " + filter.IN_PAIS + " - " + filter.strCountryS;

                        objRtn.Aud1 = rst.getDouble("M6");
                        objRtn.Avg1 = rst.getDouble("AVG");
                        //objRtn.Diff1 = rst.getDouble("M6") - rst.getDouble("AVG");
                        objRtn.Diff1 = rst.getDouble("DIFF");
                        objRtn.Var1 = rst.getDouble("VAR");

                        objRtn.totNet1 = AMT1;

                        objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                        objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                        objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                        objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                        objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                        //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                        objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                        objRtn.page.PAGNUM = filter.page.PAGNUM;
                        objRtn.page.PAGROW = filter.page.PAGROW;
                        objRtn.page.TOTPAG = filter.page.TOTPAG;
                        objRtn.page.TOTROW = filter.page.TOTROW;

                        listaE.add(objRtn);
                    }
                }
                hm.put("EXCHANGE", listaE);
                rst.close();
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return hm;

    }

    public List<A720Filter> loadPX109SQP01269(WRF016Filterwk filter) throws SQLException, Exception {

        List<A720Filter> lista = new ArrayList<A720Filter>();
        A720Filter objRtn;
        double AMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        String strTitulo = "";
        if (!filter.IN_TYPE.trim().isEmpty() && !filter.FECHA.trim().isEmpty()) {

            if (filter.IN_TYPE.trim().equals("RFND")) {
                strTitulo += "Refund Date : " + Functions.getMonthConvert(filter.FECHA.substring(0, 6)) + "  -  ";
            } else if (filter.IN_TYPE.trim().equals("EXCH")) {
                strTitulo += "Exchange Date : " + Functions.getMonthConvert(filter.FECHA.substring(0, 6)) + "  -  ";
            } else {
                strTitulo += "Sales Date : " + Functions.getMonthConvert(filter.FECHA.substring(0, 6)) + "  -  ";
            }

        }
        if (!filter.AIRLINE.trim().isEmpty()) {
            strTitulo += "Agent : " + filter.AIRLINE.trim() + "  -  ";
        }

        if (strTitulo.endsWith("  -  ")) {
            strTitulo = strTitulo.substring(0, strTitulo.length() - 3);
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01269(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FECHA);
            cstmt.setString(3, filter.AIRLINE);//Agente
            cstmt.setString(4, filter.IN_TYPE);

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                AMOUNT = rst.getDouble("VALOR");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new A720Filter();
                    objRtn.RN = rst.getLong("RN");
                    objRtn.strDescripcion5 = "Transaction : " + filter.IN_TYPE.replace("RFND", "Refund").replace("EXCH", "Exchange");
                    //objRtn.strFormatDate = "Sale Date " + Functions.getMonthConvert(filter.FECHA.substring(0, 6)) + " Agent : " + filter.AIRLINE + " - " + filter.strFlag;
                    objRtn.strFormatDate = strTitulo;
                    objRtn.A720FECVTA = Functions.getMonthConvert(filter.FECHA);

                    objRtn.A720CIA = rst.getString("A720CIA");
                    objRtn.A720FORMA = rst.getString("A720FORMA");
                    objRtn.A720SERIE = rst.getString("A720SERIE");
                    objRtn.A720SEQ = rst.getString("A720SEQ");
                    objRtn.strDescripcion = objRtn.A720CIA + " " + objRtn.A720FORMA + objRtn.A720SERIE;
                    objRtn.A720PAIVTA = rst.getString("A720PAIVTA");
                    objRtn.A720CIUVTA = rst.getString("A720CIUVTA");
                    objRtn.A720GRUPO = rst.getString("A720GRUPO");

                    objRtn.A720MONEDA = rst.getString("A720MONEDA");
                    //objRtn.A720TARIFA = rst.getString("A720TARIFA");
                    objRtn.A720MDAPAG = rst.getString("A720MDAPAG");
                    //objRtn.A720TRFPAG = rst.getString("A720TRFPAG");
                    objRtn.A720ORIG = rst.getString("A720ORIG");

                    objRtn.A720RUTA0 = rst.getString("A720RUTA0");
                    objRtn.A720RUTA1 = rst.getString("A720RUTA1");
                    objRtn.A720RUTA2 = rst.getString("A720RUTA2");
                    objRtn.A720RUTA3 = rst.getString("A720RUTA3");
                    objRtn.A720RUTA4 = rst.getString("A720RUTA4");

                    objRtn.strDescripcion1 = objRtn.A720RUTA0 + " - " + objRtn.A720RUTA1;
                    if (!objRtn.A720RUTA2.equals("")) {
                        objRtn.strDescripcion2 = objRtn.A720RUTA1 + " - " + objRtn.A720RUTA2;
                    }
                    if (!objRtn.A720RUTA3.equals("")) {
                        objRtn.strDescripcion3 = objRtn.A720RUTA2 + " - " + objRtn.A720RUTA3;
                    }
                    if (!objRtn.A720RUTA4.equals("")) {
                        objRtn.strDescripcion4 = objRtn.A720RUTA3 + " - " + objRtn.A720RUTA4;
                    }

                    objRtn.A720VALOR1 = rst.getDouble("A720VALOR1");
                    objRtn.A720VALOR2 = rst.getDouble("A720VALOR2");
                    objRtn.A720VALOR3 = rst.getDouble("A720VALOR3");
                    objRtn.A720VALOR4 = rst.getDouble("A720VALOR4");
                    objRtn.A720VALOR = rst.getDouble("VALOR");
                    objRtn.A720VALOL = AMOUNT;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lista.add(objRtn);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;

    }

    // =========================================================================
    // ======================= PARTICIPATION OAL =================================
    // =========================================================================
    public List<IMF111Filter> loadPX414SQP02545(IMF111Filter filter) throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<>(0);
        IMF111Filter objRtn;
        long QTKTS0 = 0;
        long QTKTS1 = 0;
        long QTKTS2 = 0;
        long QTKTS3 = 0;
        long QCPNS0 = 0;
        long QCPNS1 = 0;
        long QCPNS2 = 0;
        long QCPNS3 = 0;
        double VALOR0 = 0;
        double VALOR1 = 0;
        double VALOR2 = 0;
        double VALOR3 = 0;
        double VISC2 = 0;
        double VISC3 = 0;
        double VALOROA = 0;
        double VALOR0ATOT = 0;
        double PERKMSON = 0.0, PERKMSOF = 0.0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);
        NumberFormat nfLng = NumberFormat.getInstance(java.util.Locale.US);
        nfLng.setMaximumFractionDigits(0);

        String SQLCLL01 = "{CALL PRAXIS.SQP02545_1(?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.FECR);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QTKTS0 = rs01.getLong("QTKTS0");
                QCPNS0 = rs01.getLong("QCPNS0");
                VALOR0 = rs01.getDouble("VALOR0");
                QTKTS1 = rs01.getLong("QTKTS1");
                QCPNS1 = rs01.getLong("QCPNS1");
                VALOR1 = rs01.getDouble("VALOR1");
                QTKTS2 = rs01.getLong("QTKTS2");
                QCPNS2 = rs01.getLong("QCPNS2");
                VALOR2 = rs01.getDouble("VALOR2");
                VISC2 = rs01.getDouble("VISC2");
                QTKTS3 = rs01.getLong("QTKTS3");
                QCPNS3 = rs01.getLong("QCPNS3");
                VALOR3 = rs01.getDouble("VALOR3");
                VISC3 = rs01.getDouble("VISC3");
                VALOROA = rs01.getDouble("VALOROA");
                VALOR0ATOT = rs01.getDouble("VALOR0ATOT");
                PERKMSON = rs01.getDouble("PERKMSON");
                PERKMSOF = rs01.getDouble("PERKMSOF");
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF111Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.FECR = filter.FECR;

                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);

                    objRtn.VALOR0 = rs01.getDouble("VALOR0");
                    objRtn.VALOROA = rs01.getDouble("VALOROA");
                    objRtn.VALOR1 = rs01.getDouble("VALOR1");
                    objRtn.VALOR2 = rs01.getDouble("VALOR2");
                    objRtn.VALOR3 = rs01.getDouble("VALOR3");
                    objRtn.VISC2 = rs01.getDouble("VISC2");
                    objRtn.VISC3 = rs01.getDouble("VISC3");
                    objRtn.VALOR0ATOT = rs01.getDouble("VALOR0ATOT");
                    bd = new BigDecimal(objRtn.VISC2);
                    bd = bd.setScale(0, RoundingMode.HALF_UP);
                    objRtn.VISC2 = bd.doubleValue();
                    bd = new BigDecimal(objRtn.VISC3);
                    bd = bd.setScale(0, RoundingMode.HALF_UP);
                    objRtn.VISC3 = bd.doubleValue();

                    objRtn.QTKTS0 = rs01.getLong("QTKTS0");
                    objRtn.QTKTS1 = rs01.getLong("QTKTS1");
                    objRtn.QTKTS2 = rs01.getLong("QTKTS2");
                    objRtn.QTKTS3 = rs01.getLong("QTKTS3");
                    objRtn.QCPNS0 = rs01.getLong("QCPNS0");
                    objRtn.QCPNS1 = rs01.getLong("QCPNS1");
                    objRtn.QCPNS2 = rs01.getLong("QCPNS2");
                    objRtn.QCPNS3 = rs01.getLong("QCPNS3");

                    objRtn.PERKMSON = rs01.getDouble("PERKMSON");
                    objRtn.PERKMSOF = rs01.getDouble("PERKMSOF");

                    objRtn.totQTKTS0 = QTKTS0;
                    objRtn.totQTKTS1 = QTKTS1;
                    objRtn.totQTKTS2 = QTKTS2;
                    objRtn.totQTKTS3 = QTKTS3;

                    objRtn.totQCPNS0 = QCPNS0;
                    objRtn.totQCPNS1 = QCPNS1;
                    objRtn.totQCPNS2 = QCPNS2;
                    objRtn.totQCPNS3 = QCPNS3;
                    objRtn.totVALOR0 = VALOR0;
                    objRtn.totVALOROA = VALOROA;
                    objRtn.totVALOR0ATOT = VALOR0ATOT;
                    objRtn.totVALOR1 = VALOR1;
                    objRtn.totVALOR2 = VALOR2;
                    objRtn.totVALOR3 = VALOR3;
                    objRtn.totVISC2 = VISC2;
                    objRtn.totVISC3 = VISC3;

                    objRtn.totPERKMSON = PERKMSON;
                    objRtn.totPERKMSOF = PERKMSOF;

                    //Se juntan los valores de OAL y OAL Full en un solo campo ( OAL)
                    objRtn.QTKTS2 = objRtn.QTKTS1 + objRtn.QTKTS2;
                    objRtn.QCPNS2 = objRtn.QCPNS1 + objRtn.QCPNS2;
                    objRtn.VALOR2 = objRtn.VALOR1 + objRtn.VALOR2;
                    objRtn.totQTKTS2 = objRtn.totQTKTS1 + objRtn.totQTKTS2;
                    objRtn.totQCPNS2 = objRtn.totQCPNS1 + objRtn.totQCPNS2;
                    objRtn.totVALOR2 = objRtn.totVALOR1 + objRtn.totVALOR2;
                    objRtn.perVALOR0 = (objRtn.VALOR0ATOT > 0) ? (objRtn.VALOR0 * 100) / objRtn.VALOR0ATOT : 0;
                    objRtn.perVALOROA = (objRtn.VALOR0ATOT > 0) ? (objRtn.VALOROA * 100) / objRtn.VALOR0ATOT : 0;

                    objRtn.totperVALOR0 = (objRtn.totVALOR0ATOT > 0) ? (objRtn.totVALOR0 * 100) / objRtn.totVALOR0ATOT : 0;
                    objRtn.totperVALOROA = (objRtn.totVALOR0ATOT > 0) ? (objRtn.totVALOROA * 100) / objRtn.totVALOR0ATOT : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
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

        return lstRtn;
    }

    public List<IMF111Filter> loadPX414SQP02546(IMF111Filter filter) throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<>(0);
        IMF111Filter objRtn;
        long QKMS = 0;
        double PMP = 0;
        double VMPA = 0;
        double VSRP = 0;
        double VALOR = 0;
        double VCOMIS = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);
        NumberFormat nfLng = NumberFormat.getInstance(java.util.Locale.US);
        nfLng.setMaximumFractionDigits(0);

        String SQLCLL01 = "{CALL PRAXIS.SQP02546(?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.FECR);
            cstmt01.setString(4, filter.IN_OPTION);
            cstmt01.setString(5, filter.IN_TKT);
            cstmt01.setString(6, filter.IN_AGENTE);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            /*System.out.println(filter.DSALES);
            System.out.println(filter.IN_OPTION);*/
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QKMS = rs01.getLong("QKMS");
                PMP = rs01.getDouble("PMP");
                VMPA = rs01.getDouble("VMPA");
                VSRP = rs01.getDouble("VSRP");
                VALOR = rs01.getDouble("VALOR");
                VCOMIS = rs01.getDouble("VCOMIS");
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF111Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_OPTION = filter.IN_OPTION;
                    objRtn.FECR = filter.FECR;

                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strFormatDate = Functions.getMonthConvert(filter.DSALES);

                    objRtn.RN0 = rs01.getString("RN0");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.strTicket = rs01.getString("CCIA") + rs01.getString("FORMA") + rs01.getString("SERIE");
                    objRtn.TKT = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                    objRtn.COUNTRYS = rs01.getString("COUNTRYS");
                    objRtn.strCountry = rs01.getString("strCOUNTRYS");
                    objRtn.CITYS = rs01.getString("CITYS");
                    objRtn.strCITYS = rs01.getString("strCITYS");
                    objRtn.strDescription1 = rs01.getString("COUNTRYS") + " - " + rs01.getString("CITYS");
                    objRtn.strDescription5 = rs01.getString("strCOUNTRYS") + " - " + rs01.getString("strCITYS");

                    objRtn.VENDOR = rs01.getString("VENDOR");
                    objRtn.strDescription = rs01.getString("strVENDOR");
                    objRtn.TDISC = rs01.getString("TDISC");
                    objRtn.TSALES = rs01.getString("TSALES");
                    objRtn.CANAV = rs01.getString("CANAV").trim();
                    if (objRtn.CANAV.equals("B")) {
                        objRtn.strDescription2 = "BSP";
                    } else if (objRtn.CANAV.equals("A")) {
                        objRtn.strDescription2 = "ARC";
                    } else if (objRtn.CANAV.equals("S")) {
                        objRtn.strDescription2 = "ASR";
                    } else if (objRtn.CANAV.equals("T")) {
                        objRtn.strDescription2 = "TCN";
                    }
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.TRNCU = rs01.getString("TRNCU");
                    objRtn.QCPN = rs01.getString("QCPN");
                    objRtn.CURRENL = rs01.getString("CURRENL");

                    /*objRtn.CITYO = rs01.getString("CITYO");
                    objRtn.strCITYO = rs01.getString("strCITYO");*/
                    objRtn.CITYD = rs01.getString("CITYD");
                    objRtn.strCITYD = rs01.getString("strCITYD");
                    objRtn.CITYO = rs01.getString("CITYO") + " - " + rs01.getString("CITYD");
                    objRtn.strCITYO = rs01.getString("strCITYO") + "-" + rs01.getString("strCITYD");

                    objRtn.CARRIER = rs01.getString("CARRIER");
                    objRtn.strCARRIER = rs01.getString("strCARRIER");
                    objRtn.strDescription4 = rs01.getString("CARRIER") + " - " + rs01.getString("strCARRIER2");
                    objRtn.CURRENC = rs01.getString("CURRENC");
                    objRtn.INDPR = rs01.getString("INDPR");
                    switch (objRtn.INDPR) {
                        case "A":
                            objRtn.strDescription3 = "SPA";
                            break;
                        case "S":
                            objRtn.strDescription3 = "SRP";
                            break;
                        case "M":
                            objRtn.strDescription3 = "MPA";
                            break;
                        default:
                            objRtn.strDescription3 = objRtn.INDPR;
                            break;
                    }

                    objRtn.QKMS = rs01.getLong("QKMS");
                    objRtn.TARIFA = rs01.getDouble("TARIFA");
                    objRtn.VMPA = rs01.getDouble("VMPA");
                    objRtn.VSRP = rs01.getDouble("VSRP");
                    //objRtn.VISC2 = rs01.getDouble("VISC");
                    objRtn.VCOMIS = rs01.getDouble("VCOMIS");
                    bd = new BigDecimal(objRtn.VCOMIS);
                    bd = bd.setScale(2, RoundingMode.HALF_UP);
                    objRtn.VCOMIS = bd.doubleValue();
                    objRtn.REVXMILLA = rs01.getDouble("REVXMILLA");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.strColorValor = rs01.getString("strColorValor");
                    //Participacion respecto al Valor
                    objRtn.PORXPART = rs01.getDouble("PORXPART");
                    objRtn.strColor = rs01.getString("strColor");
                    objRtn.PMP = rs01.getDouble("PMP");
                    //Participacion respecto a las millas PMP
                    objRtn.PERKMSON = rs01.getDouble("PORXPMP");
                    //objRtn.PORXPART = (rs01.getDouble("VALOR") * 100) / rs01.getDouble("TARIFA");
                    objRtn.strColorPart = rs01.getString("strColorPart");
                    objRtn.strColorRevMil = rs01.getString("strColorRevMil");

                    objRtn.totQKMS = QKMS;
                    objRtn.totPMP = PMP;
                    objRtn.totVMPA = VMPA;
                    objRtn.totVSRP = VSRP;
                    objRtn.totVALOR = VALOR;
                    objRtn.totVCOMIS = VCOMIS;
                    if (PMP > 0) {
                        objRtn.totREVXMILLA = VALOR / PMP;
                    }
                    //System.out.println("RN0: " + objRtn.RN0 + " -->strTicket :  " + objRtn.strTicket + "--" + objRtn.CUPON + " --- " + objRtn.PORXPART);
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
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

        return lstRtn;
    }

    public List<IMF111Filter> loadPX414SQP02546_ex(IMF111Filter filter) throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<>(0);
        IMF111Filter objRtn;
        long QKMS = 0;
        double PMP = 0;
        double VMPA = 0;
        double VSRP = 0;
        double VALOR = 0;
        double VCOMIS = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);
        NumberFormat nfLng = NumberFormat.getInstance(java.util.Locale.US);
        nfLng.setMaximumFractionDigits(0);
        //no cambiar este procedure
        String SQLCLL01 = "{CALL PRAXIS.SQP02546_1(?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.DSALES);
            cstmt01.setString(4, filter.IN_OPTION);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            System.out.println(filter.DSALES);
            System.out.println(filter.IN_OPTION);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                //QKMS = rs01.getLong("QKMS");           
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF111Filter();

                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strFormatDate = Functions.getMonthConvert(filter.DSALES);

                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.strTicket = rs01.getString("CCIA") + rs01.getString("FORMA") + rs01.getString("SERIE");
                    objRtn.TKT = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                    objRtn.COUNTRYS = rs01.getString("COUNTRYS");
                    objRtn.strCountry = rs01.getString("strCOUNTRYS");
                    objRtn.CITYS = rs01.getString("CITYS");
                    objRtn.strCITYS = rs01.getString("strCITYS");

                    objRtn.VENDOR = rs01.getString("VENDOR");
                    objRtn.strDescription = rs01.getString("strVENDOR");
                    objRtn.TDISC = rs01.getString("TDISC");
                    objRtn.TSALES = rs01.getString("TSALES");
                    objRtn.CANAV = rs01.getString("CANAV").trim();
                    if (objRtn.CANAV.equals("B")) {
                        objRtn.strDescription2 = "BSP";
                    } else if (objRtn.CANAV.equals("A")) {
                        objRtn.strDescription2 = "ARC";
                    } else if (objRtn.CANAV.equals("S")) {
                        objRtn.strDescription2 = "ASR";
                    } else if (objRtn.CANAV.equals("T")) {
                        objRtn.strDescription2 = "TCN";
                    }
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.TRNCU = rs01.getString("TRNCU");
                    objRtn.QCPN = rs01.getString("QCPN");
                    objRtn.CURRENL = rs01.getString("CURRENL");

                    objRtn.CITYO = rs01.getString("CITYO");
                    objRtn.strCITYO = rs01.getString("strCITYO");
                    objRtn.CITYD = rs01.getString("CITYD");
                    objRtn.strCITYD = rs01.getString("strCITYD");
                    objRtn.CITYO = rs01.getString("CITYO") + " - " + rs01.getString("CITYD");
                    objRtn.strCITYO = rs01.getString("strCITYO") + "-" + rs01.getString("strCITYD");

                    objRtn.CARRIER = rs01.getString("CARRIER");
                    objRtn.strCARRIER = rs01.getString("strCARRIER");
                    objRtn.CURRENC = rs01.getString("CURRENC");

                    objRtn.QKMS = rs01.getLong("QKMS");
                    objRtn.TARIFA = rs01.getDouble("TARIFA");
                    objRtn.PMP = rs01.getDouble("PMP");
                    objRtn.VMPA = rs01.getDouble("VMPA");
                    objRtn.VSRP = rs01.getDouble("VSRP");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    //objRtn.VISC2 = rs01.getDouble("VISC");
                    objRtn.VCOMIS = rs01.getDouble("VISC");
                    objRtn.REVXMILLA = rs01.getDouble("REVXMILLA");
                    //objRtn.PORXPART = rs01.getDouble("PORXPART");
                    objRtn.PORXPART = (rs01.getDouble("VALOR") * 100) / rs01.getDouble("TARIFA");

                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
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

        return lstRtn;
    }

    public List<IMF111Filter> loadPX414SQP02546_1(IMF111Filter filter) throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<>(0);
        IMF111Filter objRtn;
        long QKMS = 0;
        double PMP = 0;
        double VMPA = 0;
        double VSRP = 0;
        double VALOR = 0;
        double VCOMIS = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);
        NumberFormat nfLng = NumberFormat.getInstance(java.util.Locale.US);
        nfLng.setMaximumFractionDigits(0);

        String SQLCLL01 = "{CALL PRAXIS.SQP02546_2(?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_TKT);
            cstmt01.setString(5, filter.IN_AGENTE);
            cstmt01.setString(6, filter.IN_OPTION);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            System.out.println(filter.DSALES);
            System.out.println(filter.IN_OPTION);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QKMS = rs01.getLong("QKMS");
                PMP = rs01.getDouble("PMP");
                VMPA = rs01.getDouble("VMPA");
                VSRP = rs01.getDouble("VSRP");
                VALOR = rs01.getDouble("VALOR");
                VCOMIS = rs01.getDouble("VCOMIS");
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF111Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_OPTION = filter.IN_OPTION;

                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strFormatDate = Functions.getMonthConvert(filter.DSALES);

                    objRtn.RN0 = rs01.getString("RN0");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.strTicket = rs01.getString("CCIA") + rs01.getString("FORMA") + rs01.getString("SERIE");
                    objRtn.TKT = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                    objRtn.COUNTRYS = rs01.getString("COUNTRYS");
                    objRtn.strCountry = rs01.getString("strCOUNTRYS");
                    objRtn.CITYS = rs01.getString("CITYS");
                    objRtn.strCITYS = rs01.getString("strCITYS");

                    objRtn.VENDOR = rs01.getString("VENDOR");
                    objRtn.strDescription = rs01.getString("strVENDOR");
                    objRtn.TDISC = rs01.getString("TDISC");
                    objRtn.TSALES = rs01.getString("TSALES");
                    objRtn.CANAV = rs01.getString("CANAV").trim();
                    if (objRtn.CANAV.equals("B")) {
                        objRtn.strDescription2 = "BSP";
                    } else if (objRtn.CANAV.equals("A")) {
                        objRtn.strDescription2 = "ARC";
                    } else if (objRtn.CANAV.equals("S")) {
                        objRtn.strDescription2 = "ASR";
                    } else if (objRtn.CANAV.equals("T")) {
                        objRtn.strDescription2 = "TCN";
                    }
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.TRNCU = rs01.getString("TRNCU");
                    objRtn.QCPN = rs01.getString("QCPN");
                    objRtn.CURRENL = rs01.getString("CURRENL");

                    objRtn.CITYO = rs01.getString("CITYO");
                    objRtn.strCITYO = rs01.getString("strCITYO");
                    objRtn.CITYD = rs01.getString("CITYD");
                    objRtn.strCITYD = rs01.getString("strCITYD");
                    objRtn.CITYO = rs01.getString("CITYO") + " - " + rs01.getString("CITYD");
                    objRtn.strCITYO = rs01.getString("strCITYO") + "-" + rs01.getString("strCITYD");

                    objRtn.CARRIER = rs01.getString("CARRIER");
                    objRtn.strCARRIER = rs01.getString("strCARRIER");
                    objRtn.CURRENC = rs01.getString("CURRENC");
                    objRtn.INDPR = rs01.getString("INDPR");
                    switch (objRtn.INDPR) {
                        case "A":
                            objRtn.strDescription3 = "SPA";
                            break;
                        case "S":
                            objRtn.strDescription3 = "SRP";
                            break;
                        case "M":
                            objRtn.strDescription3 = "MPA";
                            break;
                        default:
                            objRtn.strDescription3 = objRtn.INDPR;
                            break;
                    }

                    objRtn.QKMS = rs01.getLong("QKMS");
                    objRtn.TARIFA = rs01.getDouble("TARIFA");
                    objRtn.PMP = rs01.getDouble("PMP");
                    objRtn.VMPA = rs01.getDouble("VMPA");
                    objRtn.VSRP = rs01.getDouble("VSRP");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    //objRtn.VISC2 = rs01.getDouble("VISC");
                    objRtn.VCOMIS = rs01.getDouble("VCOMIS");
                    bd = new BigDecimal(objRtn.VCOMIS);
                    bd = bd.setScale(2, RoundingMode.HALF_UP);
                    objRtn.VCOMIS = bd.doubleValue();
                    objRtn.REVXMILLA = rs01.getDouble("REVXMILLA");
                    //objRtn.PORXPART = rs01.getDouble("PORXPART");
                    objRtn.PORXPART = (rs01.getDouble("VALOR") * 100) / rs01.getDouble("TARIFA");

                    objRtn.totQKMS = QKMS;
                    objRtn.totPMP = PMP;
                    objRtn.totVMPA = VMPA;
                    objRtn.totVSRP = VSRP;
                    objRtn.totVALOR = VALOR;
                    objRtn.totVCOMIS = VCOMIS;
                    if (PMP > 0) {
                        objRtn.totREVXMILLA = VALOR / PMP;
                    }
                    System.out.println("RN0: " + objRtn.RN0 + " -->strTicket :  " + objRtn.strTicket + "--" + objRtn.CUPON + " --- " + objRtn.PORXPART);
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
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

        return lstRtn;
    }
    
    // =========================================================================
    // ======================= CREDIT CARD ANALISIS =================================
    // =========================================================================
    public HashMap loadPX414SQP02248(DashboardFilter filter) throws SQLException, Exception {

        HashMap hm = new HashMap();
        List<WRF016Filterwk> listaS = new ArrayList<WRF016Filterwk>(0);
        List<WRF016Filterwk> listaR = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        double AMT1 = 0, AMOUNTSC = 0;
        long QTY1 = 0, QCCARDSC = 0;
        String mes1 = "", mes2 = "", mes3 = "", mes4 = "", mes5 = "", mes6 = "", fec_actual = "";

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02248(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.VARCHAR);
            cstmt.registerOutParameter(15, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);
            cstmt.setString(5, filter.strTIPO);
            cstmt.setString(6, filter.FLAG);
            cstmt.setString(7, filter.IN_CARD1);
            cstmt.setString(8, filter.IN_CARD2);
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");
            cstmt.setString(14, "");
            cstmt.setString(15, "");

            cstmt.execute();

            mes1 = cstmt.getString(9);
            mes2 = cstmt.getString(10);
            mes3 = cstmt.getString(11);
            mes4 = cstmt.getString(12);
            mes5 = cstmt.getString(13);
            mes6 = cstmt.getString(14);
            fec_actual = cstmt.getString(15);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                AMT1 = rst.getDouble("M6");
                QTY1 = rst.getLong("QTY6");
                AMOUNTSC = rst.getDouble("AMTCH");
                QCCARDSC = rst.getLong("QTYCH");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.IN_CARD1 = filter.IN_CARD1;
                    objRtn.IN_CARD2 = filter.IN_CARD2;
                    objRtn.SCARCOD = rst.getString("SCARCOD");
                    objRtn.strFlag = rst.getString("SCARCOD") + " - " + rst.getString("DESCRIP");
                    objRtn.FECHA = fec_actual;
                    if (!filter.IN_PAIS.trim().isEmpty()) {
                        objRtn.COMENT1 = "Country : " + filter.IN_PAIS + " - " + filter.strCountryS;
                    }

                    objRtn.Aud1 = rst.getDouble("M6");
                    objRtn.Avg1 = rst.getDouble("AVG");
                    objRtn.Diff1 = rst.getDouble("DIFF");

                    objRtn.Aud2 = rst.getLong("QTY6");
                    objRtn.Avg2 = rst.getDouble("AVGQ");
                    objRtn.Diff2 = rst.getDouble("DIFFQ");

                    objRtn.Var1 = rst.getDouble("VAR");

                    objRtn.QCCARDSC = rst.getLong("QTYCH");
                    objRtn.AMOUNTSC = rst.getDouble("AMTCH");

                    objRtn.totNet1 = AMT1;
                    objRtn.totNet2 = QTY1;
                    objRtn.totQCCARDSC = QCCARDSC;
                    objRtn.totAMOUNTSC = AMOUNTSC;

                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                    listaS.add(objRtn);
                }
            }
            hm.put("SALE", listaS);
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    AMT1 = rst.getDouble("M6");
                    QTY1 = rst.getLong("QTY6");
                }
                rst.close();

                if (cstmt.getMoreResults()) {
                    rst = cstmt.getResultSet();

                    while (rst.next()) {
                        objRtn = new WRF016Filterwk();
                        objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                        objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                        objRtn.IN_PAIS = filter.IN_PAIS;
                        objRtn.IN_CARD1 = filter.IN_CARD1;
                        objRtn.IN_CARD2 = filter.IN_CARD2;
                        objRtn.SCARCOD = rst.getString("SCARCOD");
                        objRtn.strFlag = rst.getString("SCARCOD") + " - " + rst.getString("DESCRIP");
                        objRtn.FECHA = fec_actual;
                        if (!filter.IN_PAIS.trim().isEmpty()) {
                            objRtn.COMENT1 = "Country : " + filter.IN_PAIS + " - " + filter.strCountryS;
                        }

                        objRtn.Aud1 = rst.getDouble("M6");
                        objRtn.Avg1 = rst.getDouble("AVG");
                        objRtn.Diff1 = rst.getDouble("DIFF");

                        objRtn.Aud2 = rst.getLong("QTY6");
                        objRtn.Avg2 = rst.getDouble("AVGQ");
                        objRtn.Diff2 = rst.getDouble("DIFFQ");

                        objRtn.Var1 = rst.getDouble("VAR");

                        objRtn.totNet1 = AMT1;
                        objRtn.totNet2 = QTY1;

                        objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                        objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                        objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                        objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                        objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                        //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                        objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                        listaR.add(objRtn);
                    }
                }
            }
            hm.put("REFUND", listaR);
            rst.close();

        } catch (Exception e) {
            //e.getMessage();
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

        return hm;

    }

    // =========================================================================
    // =============================== EXCHANGE ================================
    // =========================================================================
    public List<IMF111Filter> loadPX414SQP02212(IMF111Filter filter)  throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<IMF111Filter>(0);
        IMF111Filter objRtn;
        long QTKTS = 0, QTKTS1 = 0, QTKTS2 = 0, QTKTS3 = 0, QTKTS4 = 0, QTKTS5 = 0, QTKTS6 = 0;
        double AMOUNT = 0, AMOUNT1 = 0, AMOUNT2 = 0, AMOUNT3 = 0, AMOUNT4 = 0, AMOUNT5 = 0, AMOUNT6 = 0, VALADM = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02212(?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.TRNCU.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QTKTS = rs01.getLong("QTKTS");
                QTKTS1 = rs01.getLong("QTKTS1");
                QTKTS2 = rs01.getLong("QTKTS2");
                QTKTS3 = rs01.getLong("QTKTS3");
                QTKTS4 = rs01.getLong("QTKTS4");
                QTKTS5 = rs01.getLong("QTKTS5");
                QTKTS6 = rs01.getLong("QTKTS6");

                AMOUNT = rs01.getDouble("AMOUNT");
                AMOUNT1 = rs01.getDouble("AMOUNT1");
                AMOUNT2 = rs01.getDouble("AMOUNT2");
                AMOUNT3 = rs01.getDouble("AMOUNT3");
                AMOUNT4 = rs01.getDouble("AMOUNT4");
                AMOUNT5 = rs01.getDouble("AMOUNT5");
                AMOUNT6 = rs01.getDouble("AMOUNT6");

                VALADM = rs01.getDouble("VALADM");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF111Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.TRNCU = filter.TRNCU;
                    objRtn.FlagFactor = filter.FlagFactor;
                    objRtn.FECHA = rs01.getString("DSALES");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECHA);
                    objRtn.QTKTS = rs01.getLong("QTKTS");
                    objRtn.QTKTS1 = rs01.getLong("QTKTS1");
                    objRtn.QTKTS2 = rs01.getLong("QTKTS2");
                    objRtn.QTKTS3 = rs01.getLong("QTKTS3");
                    objRtn.QTKTS4 = rs01.getLong("QTKTS4");
                    objRtn.QTKTS5 = rs01.getLong("QTKTS5");
                    objRtn.QTKTS6 = rs01.getLong("QTKTS6");
                    objRtn.QTKTSmax = objRtn.QTKTS4+objRtn.QTKTS5+objRtn.QTKTS6;

                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.AMOUNT1 = rs01.getDouble("AMOUNT1");
                    objRtn.AMOUNT2 = rs01.getDouble("AMOUNT2");
                    objRtn.AMOUNT3 = rs01.getDouble("AMOUNT3");
                    objRtn.AMOUNT4 = rs01.getDouble("AMOUNT4");
                    objRtn.AMOUNT5 = rs01.getDouble("AMOUNT5");
                    objRtn.AMOUNT6 = rs01.getDouble("AMOUNT6");
                    objRtn.AMOUNTmax = objRtn.AMOUNT4+objRtn.AMOUNT5+objRtn.AMOUNT6;

                    objRtn.VALADM = rs01.getDouble("VALADM");

                    objRtn.lngTotQTKTS = QTKTS;
                    objRtn.lngTotQTKTS1 = QTKTS1;
                    objRtn.lngTotQTKTS2 = QTKTS2;
                    objRtn.lngTotQTKTS3 = QTKTS3;
                    objRtn.lngTotQTKTS4 = QTKTS4;
                    objRtn.lngTotQTKTS5 = QTKTS5;
                    objRtn.lngTotQTKTS6 = QTKTS6;

                    objRtn.dblTotAMOUNT = AMOUNT;
                    objRtn.dblTotAMOUNT1 = AMOUNT1;
                    objRtn.dblTotAMOUNT2 = AMOUNT2;
                    objRtn.dblTotAMOUNT3 = AMOUNT3;
                    objRtn.dblTotAMOUNT4 = AMOUNT4;
                    objRtn.dblTotAMOUNT5 = AMOUNT5;
                    objRtn.dblTotAMOUNT6 = AMOUNT6;

                    objRtn.totVALADM = VALADM;

                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }

    public List<IMF111Filter> loadPX414SQP02213(IMF111Filter filter)  throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<IMF111Filter>(0);
        IMF111Filter objRtn;
        long PMP = 0, PMP1 = 0;
        double RATED = 0, VALOR = 0, VALOR1 = 0, VALOREX = 0, VALORCA = 0, VALORCC = 0, VALADM = 0, VALORMIN = 0, VALORBAS = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02213(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA);
            cstmt01.setString(3, filter.IN_FLAGEX);
            cstmt01.setString(4, filter.IN_RATED);
            cstmt01.setString(5, filter.IN_TYPE);
            cstmt01.setString(6, filter.IN_ORDER);
            cstmt01.setString(7, filter.TRNCU);
            cstmt01.setString(8, filter.FlagFactor);
            cstmt01.setString(9, filter.CITYO);
            cstmt01.setString(10, filter.CITYD);
            cstmt01.setString(11, filter.FECR);
            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                PMP = rs01.getLong("PMP");
                PMP1 = rs01.getLong("PMP1");

                RATED = rs01.getDouble("RATED");
                VALOR = rs01.getDouble("VALOR");
                VALOR1 = rs01.getDouble("VALOR1");
                VALOREX = rs01.getDouble("VALOREX");
                VALORCA = rs01.getDouble("VALORCA");
                VALORCC = rs01.getDouble("VALORCC");
                VALADM = rs01.getDouble("VALADM");
                VALORMIN = rs01.getDouble("VALORMIN");
                VALORBAS = rs01.getDouble("VALORBASE");
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF111Filter();
                    objRtn.FECHA = filter.FECHA;
                    objRtn.IN_FLAGEX = filter.IN_FLAGEX;
                    objRtn.IN_RATED = filter.IN_RATED;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.IN_TYPE = filter.IN_TYPE;
                    objRtn.IN_ORDER = filter.IN_ORDER;
                    objRtn.FlagFactor = filter.FlagFactor;
                    objRtn.CITYO = filter.CITYO;
                    objRtn.CITYD = filter.CITYD;
                    objRtn.SALICPN = rs01.getString("SALICPN");
                    objRtn.USEICPN = rs01.getString("USEICPN");
                    objRtn.FSAVUS = rs01.getString("FSAVUS");
                    objRtn.strColor = rs01.getString("strColor");
                    objRtn.strDescription1 = rs01.getString("FSAVUS");
                    objRtn.RATEPOR = rs01.getDouble("RATEPOR");
                    objRtn.TRNCU = rs01.getString("TRNCU");
                    objRtn.CITYS = rs01.getString("CITYO") + " - " + rs01.getString("CITYD");
                    objRtn.COUNTRYS = rs01.getString("COUNTRYS");
                    objRtn.strCountry = rs01.getString("DES_COUN");
                    objRtn.DESC_ORIG = rs01.getString("DESC_ORIG") + "-" + rs01.getString("DESC_DEST");
                    objRtn.CLASEO = rs01.getString("CLASEO");
                    objRtn.FACRMI = rs01.getDouble("FACRMI");
                    objRtn.FACMIN = rs01.getDouble("FACMIN");
                    objRtn.FACMAX = rs01.getDouble("FACMAX");
                    objRtn.FACRBA = rs01.getDouble("FACRBA");
                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strDescription = rs01.getString("DESCAGT");
                    objRtn.VENDOR = rs01.getString("VENDOR");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.TKT = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE");

                    objRtn.PMP = rs01.getLong("PMP");
                    objRtn.PMP1 = rs01.getLong("PMP1");
                    objRtn.RATED = rs01.getDouble("RATED");
                    objRtn.CURRENC = rs01.getString("CURRENC");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.VALOR1 = rs01.getDouble("VALOR1");
                    objRtn.VALOREX = rs01.getDouble("VALOREX");
                    objRtn.VALORCA = rs01.getDouble("VALORCA");
                    objRtn.VALORCC = rs01.getDouble("VALORCC");
                    objRtn.EXCHAN = rs01.getString("EXCHAN");
                    objRtn.VALADM = rs01.getDouble("VALADM");

                    objRtn.VALORMIN = rs01.getDouble("VALORMIN");
                    objRtn.VALORBAS = rs01.getDouble("VALORBASE");

                    objRtn.CANAV = rs01.getString("CANAV").trim();
                    if (objRtn.CANAV.equals("B")) {
                        objRtn.strDescription2 = "BSP";
                    } else if (objRtn.CANAV.equals("A")) {
                        objRtn.strDescription2 = "ARC";
                    } else if (objRtn.CANAV.equals("S")) {
                        objRtn.strDescription2 = "ASR";
                    } else if (objRtn.CANAV.equals("T")) {
                        objRtn.strDescription2 = "TCN";
                    }

                    objRtn.totPMP = PMP;
                    objRtn.totPMP1 = PMP1;
                    objRtn.totRATED = RATED;
                    objRtn.totVALOR = VALOR;
                    objRtn.totVALOR1 = VALOR1;
                    objRtn.totVALOREX = VALOREX;
                    objRtn.totVALORCA = VALORCA;
                    objRtn.totVALORCC = VALORCC;
                    objRtn.totVALADM = VALADM;

                    objRtn.totVALORBAS = VALORBAS;
                    objRtn.totVALORMIN = VALORMIN;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }

    public List<IMF111Filter> loadPX414SQP02214(IMF111Filter filter)  throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<IMF111Filter>(0);
        IMF111Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02214(?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_AGENTE);
            cstmt01.setString(5, filter.IN_TKT);
            cstmt01.setString(6, filter.IN_TYPE);
            cstmt01.setString(7, filter.IN_ORDER);
            cstmt01.setString(8, filter.TRNCU);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                objRtn = new IMF111Filter();
                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                objRtn.IN_AGENTE = filter.IN_AGENTE;
                objRtn.IN_TKT = filter.IN_TKT;
                objRtn.IN_TYPE = filter.IN_TYPE;
                objRtn.IN_ORDER = filter.IN_ORDER;

                objRtn.RATEPOR = rs01.getDouble("RATEPOR");
                objRtn.SALICPN = rs01.getString("SALICPN");
                objRtn.USEICPN = rs01.getString("USEICPN");
                objRtn.DSALES = rs01.getString("DSALES");
                objRtn.TRNCU = rs01.getString("TRNCU");
                objRtn.CITYS = rs01.getString("CITYO") + " - " + rs01.getString("CITYD");
                objRtn.DESC_ORIG = rs01.getString("DESC_ORIG") + "-" + rs01.getString("DESC_DEST");
                objRtn.COUNTRYS = rs01.getString("COUNTRYS");
                objRtn.strCountry = rs01.getString("DES_COUN");
                objRtn.CLASEO = rs01.getString("CLASEO");
                objRtn.FACRMI = rs01.getDouble("FACRMI");
                objRtn.FACMIN = rs01.getDouble("FACMIN");
                objRtn.FACMAX = rs01.getDouble("FACMAX");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                objRtn.VENDOR = rs01.getString("VENDOR");
                objRtn.strDescription = rs01.getString("DESCAGT");
                objRtn.CCIA = rs01.getString("CCIA");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                objRtn.TKT = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE");

                objRtn.PMP = rs01.getLong("PMP");
                objRtn.PMP1 = rs01.getLong("PMP1");
                objRtn.RATED = rs01.getDouble("RATED");
                objRtn.CURRENC = rs01.getString("CURRENC");
                objRtn.VALOR = rs01.getDouble("VALOR");
                objRtn.VALOR1 = rs01.getDouble("VALOR1");
                objRtn.VALOREX = rs01.getDouble("VALOREX");
                objRtn.VALORCA = rs01.getDouble("VALORCA");
                objRtn.VALORCC = rs01.getDouble("VALORCC");

                objRtn.EXCHAN = rs01.getString("EXCHAN");
                objRtn.VALADM = rs01.getDouble("VALADM");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }
    
    public List<IMF111Filter> loadMPS365(IMF111Filter filter) throws SQLException, Exception {

        List<IMF111Filter> lstTkts = new ArrayList<IMF111Filter>(0);
        IMF111Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS365(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);


            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new IMF111Filter();
                beanTkt.CCUST = rst.getString("CCUST").trim();
                beanTkt.DSALES = rst.getString("DSALES").trim();
                beanTkt.AGENT = rst.getString("AGENT").trim();
                beanTkt.AMOUNT_SALE = rst.getDouble("AMOUNT_SALE");
                lstTkts.add(beanTkt);
            }
            rst.close();

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

        return lstTkts;
    }
    
    public String SQP05572() throws Exception {
        String msg = null;
        Connection cnx = null;
        CallableStatement cs = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS362()}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.execute(); 

            msg = "Proceso Culminado";
        } catch (Exception e) {
            e.printStackTrace();
            msg = "Error: " + e.getMessage();
        } finally {
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" 
                        + session.getUserView().getUserInfo().USR 
                        + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return msg;
    }

    
    public String MPS363() throws Exception {
        String msg = null;
        Connection cnx = null;
        CallableStatement cs = null;
        ResultSet rst = null;
        int anioActual = Calendar.getInstance().get(Calendar.YEAR);
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS363(?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setInt(2, anioActual);
            cs.setInt(3, anioActual);
            cs.setString(4, "");
            cs.setString(5, "");
            cs.setString(6, "");

            cs.execute();

            msg = "Proceso Culminado";
        } catch (Exception e) {
            e.printStackTrace();
            msg = "Error: " + e.getMessage();
        }  finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return msg;
    }


}
