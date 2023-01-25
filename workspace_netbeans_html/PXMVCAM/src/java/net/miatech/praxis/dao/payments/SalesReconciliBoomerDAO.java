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
import net.miatech.beans.PX040S01A1716Filter;
import net.miatech.beans.SQP00697Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2318Filter;
import net.miatech.praxis.payment.filter.A2324Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class SalesReconciliBoomerDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesReconciliBoomerDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesReconciliBoomerDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2324Filter> loadPX559SQP04019(A2324Filter filter) throws SQLException, Exception {

        List<A2324Filter> lstTkts = new ArrayList<A2324Filter>(0);
        A2324Filter beanTkt;
        long totQMATCH = 0, totQPAYMENT_WO = 0, totQSALES_WO = 0, totQMATCH_DIFF = 0, totQTOTSAL = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04019(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totQMATCH = rst.getLong("QMATCH");
                totQMATCH_DIFF = rst.getLong("QMATCH_DIFF");
                totQPAYMENT_WO = rst.getLong("QPAYMENT_WO");
                totQSALES_WO = rst.getLong("QSALES_WO");
                totQTOTSAL = rst.getLong("QTOTSAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new A2324Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    beanTkt.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();

                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());

                    beanTkt.QMATCH = rst.getLong("QMATCH");
                    beanTkt.QMATCH_DIFF = rst.getLong("QMATCH_DIFF");
                    beanTkt.QPAYMENT_WO = rst.getLong("QPAYMENT_WO");
                    beanTkt.QSALES_WO = rst.getLong("QSALES_WO");
                    beanTkt.QTOTSAL = rst.getLong("QTOTSAL");

                    beanTkt.totQMATCH = totQMATCH;
                    beanTkt.totQPAYMENT_WO = totQPAYMENT_WO;
                    beanTkt.totQSALES_WO = totQSALES_WO;
                    beanTkt.totQMATCH_DIFF = totQMATCH_DIFF;
                    beanTkt.totQTOTSAL = totQTOTSAL;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A2318Filter> loadPX559SQP03991(A2318Filter filter) throws SQLException, Exception {

        List<A2318Filter> lstTkts = new ArrayList<A2318Filter>(0);
        A2318Filter beanTkt;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("1", "Conciliate");
        hmDescEstados.put("2", "Difference");

        HashMap<String, String> hmDescTipos = new HashMap<String, String>();
        hmDescTipos.put("SG", "General Sale");
        hmDescTipos.put("SC", "Credit Sale");
        hmDescTipos.put("SE", "Cash Sale");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03991(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new A2318Filter();
                beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                beanTkt.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                beanTkt.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                beanTkt.IN_TDOC = filter.IN_TDOC.trim();

                beanTkt.DATSET = rst.getString("DATSET").trim();
                beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATSET").trim());

                beanTkt.WEEKMO = rst.getString("WEEKMO");
                beanTkt.STVAL = rst.getString("STVAL");
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                    beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTkt.descSTVAL = rst.getString("STVAL").trim();
                }
                beanTkt.DATSFROM = rst.getString("DATSFROM");
                beanTkt.DATSTO = rst.getString("DATSTO");
                beanTkt.TREG = rst.getString("TREG");
                if (hmDescTipos.containsKey(rst.getString("TREG").trim())) {
                    beanTkt.descTREG = hmDescTipos.get(rst.getString("TREG").trim()).toString();
                } else {
                    beanTkt.descTREG = rst.getString("TREG").trim();
                }

                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.AMTCOM = rst.getDouble("AMTCOM");
                beanTkt.AMTIVA = rst.getDouble("AMTIVA");
                beanTkt.AMTSET = rst.getDouble("AMTSET");

                beanTkt.SVFOPC = rst.getDouble("SVFOPC");
                beanTkt.SVFOPB = rst.getDouble("SVFOPB");
                beanTkt.AMTCOMC = rst.getDouble("AMTCOMC");
                beanTkt.AMTIVAC = rst.getDouble("AMTIVAC");
                beanTkt.AMTSETC = rst.getDouble("AMTSETC");

                beanTkt.QTYMATCH = rst.getInt("QTYMATCH");
                beanTkt.QTYMATMAN = rst.getInt("QTYMATMAN");
                beanTkt.QTYMATDIF = rst.getInt("QTYMATDIF");
                beanTkt.QTYSETSAL = rst.getInt("QTYSETSAL");

                beanTkt.ACCNBR = rst.getString("ACCNBR");

                if (beanTkt.QTYMATDIF > 0 || beanTkt.QTYSETSAL > 0) {
                    beanTkt.STVALC = "2";
                } else {
                    beanTkt.STVALC = "1";
                }

                if (hmDescEstados.containsKey(beanTkt.STVALC.trim())) {
                    beanTkt.descSTVALC = hmDescEstados.get(beanTkt.STVALC.trim()).toString();
                } else {
                    beanTkt.descSTVALC = beanTkt.STVALC.trim();
                }

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

    public HashMap<String, List<A2318Filter>> loadPX559SQP03992(A2318Filter filter) throws SQLException, Exception {

        List<A2318Filter> lstTkts = new ArrayList<A2318Filter>(0);
        A2318Filter beanTkt;
        List<A2318Filter> lstTotals = new ArrayList<A2318Filter>(0);
        A2318Filter beanTOTAL;
        HashMap<String, List<A2318Filter>> hmResultado = new HashMap<String, List<A2318Filter>>();

        double SVFOP_SG = 0.0, AMTCOM_SG = 0.0, AMTIVA_SG = 0.0, AMTSET_SG = 0.0;
        double SVFOP_SC = 0.0, AMTCOM_SC = 0.0, AMTIVA_SC = 0.0, AMTSET_SC = 0.0;
        double SVFOP_SE = 0.0, AMTCOM_SE = 0.0, AMTIVA_SE = 0.0, AMTSET_SE = 0.0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("1", "Conciliate");
        hmDescEstados.put("2", "Difference");

        HashMap<String, String> hmDescTipos = new HashMap<String, String>();
        hmDescTipos.put("SG", "General Sale");
        hmDescTipos.put("D", "Diary");
        hmDescTipos.put("SC", "Credit Sale");
        hmDescTipos.put("SE", "Cash Sale");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03992(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATSET);
            cstmt.setString(3, filter.IN_WEEKMO);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                /*beanTOTAL = new A2318Filter();
                 beanTOTAL.SVFOP_SG = rst.getLong("SVFOP_SG");
                 beanTOTAL.AMTCOM_SG = rst.getLong("AMTCOM_SG");
                 beanTOTAL.AMTIVA_SG = rst.getLong("AMTIVA_SG");
                 beanTOTAL.AMTSET_SG = rst.getLong("AMTSET_SG");

                 beanTOTAL.SVFOP_SC = rst.getLong("SVFOP_SC");
                 beanTOTAL.AMTCOM_SC = rst.getLong("AMTCOM_SC");
                 beanTOTAL.AMTIVA_SC = rst.getLong("AMTIVA_SC");
                 beanTOTAL.AMTSET_SC = rst.getLong("AMTSET_SC");

                 beanTOTAL.SVFOP_SE = rst.getLong("SVFOP_SE");
                 beanTOTAL.AMTCOM_SE = rst.getLong("AMTCOM_SE");
                 beanTOTAL.AMTIVA_SE = rst.getLong("AMTIVA_SE");
                 beanTOTAL.AMTSET_SE = rst.getLong("AMTSET_SE");
                 lstTotals.add(beanTOTAL);*/

                beanTOTAL = new A2318Filter();
                beanTOTAL.strFecFiltro = filter.strFecFiltro.trim();
                beanTOTAL.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                beanTOTAL.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                beanTOTAL.IN_TDOC = filter.IN_TDOC.trim();

                beanTOTAL.SDATE = rst.getString("SDATE").trim();
                beanTOTAL.strFormatDate = Functions.getStringConvertDate(rst.getString("SDATE").trim());

                beanTOTAL.WEEKMO = rst.getString("WEEKMO");
                beanTOTAL.STVAL = rst.getString("STVAL");
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                    beanTOTAL.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTOTAL.descSTVAL = rst.getString("STVAL").trim();
                }
                beanTOTAL.DATSFROM = rst.getString("DATSFROM");
                beanTOTAL.DATSTO = rst.getString("DATSTO");
                beanTOTAL.TREG = rst.getString("TREG");
                if (hmDescTipos.containsKey(rst.getString("TREG").trim())) {
                    beanTOTAL.descTREG = hmDescTipos.get(rst.getString("TREG").trim()).toString();
                } else {
                    beanTOTAL.descTREG = rst.getString("TREG").trim();
                }

                beanTOTAL.SVFOP = rst.getDouble("SVFOP");
                beanTOTAL.AMTCOM = rst.getDouble("AMTCOM");
                beanTOTAL.AMTIVA = rst.getDouble("AMTIVA");
                beanTOTAL.AMTSET = rst.getDouble("AMTSET");

                beanTOTAL.SVFOPC = rst.getDouble("SVFOPC");
                beanTOTAL.SVFOPB = rst.getDouble("SVFOPB");
                beanTOTAL.AMTCOMC = rst.getDouble("AMTCOMC");
                beanTOTAL.AMTIVAC = rst.getDouble("AMTIVAC");
                beanTOTAL.AMTSETC = rst.getDouble("AMTSETC");

                beanTOTAL.QTYMATCH = rst.getInt("QTYMATCH");
                beanTOTAL.QTYMATMAN = rst.getInt("QTYMATMAN");
                beanTOTAL.QTYMATDIF = rst.getInt("QTYMATDIF");
                beanTOTAL.QTYSETSAL = rst.getInt("QTYSETSAL");

                if (beanTOTAL.QTYMATDIF > 0 || beanTOTAL.QTYSETSAL > 0) {
                    beanTOTAL.STVALC = "2";
                } else {
                    beanTOTAL.STVALC = "1";
                }

                if (hmDescEstados.containsKey(beanTOTAL.STVALC.trim())) {
                    beanTOTAL.descSTVALC = hmDescEstados.get(beanTOTAL.STVALC.trim()).toString();
                } else {
                    beanTOTAL.descSTVALC = beanTOTAL.STVALC.trim();
                }

                //beanTOTAL.ACCNBR = rst.getString("ACCNBR");
                lstTotals.add(beanTOTAL);
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new A2318Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    beanTkt.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();

                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.strFormatDate = Functions.getStringConvertDate(rst.getString("SDATE").trim());

                    beanTkt.WEEKMO = rst.getString("WEEKMO");
                    beanTkt.STVAL = rst.getString("STVAL");
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.DATSFROM = rst.getString("DATSFROM");
                    beanTkt.DATSTO = rst.getString("DATSTO");
                    beanTkt.TREG = rst.getString("TREG");
                    if (hmDescTipos.containsKey(rst.getString("TREG").trim())) {
                        beanTkt.descTREG = hmDescTipos.get(rst.getString("TREG").trim()).toString();
                    } else {
                        beanTkt.descTREG = rst.getString("TREG").trim();
                    }

                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.AMTCOM = rst.getDouble("AMTCOM");
                    beanTkt.AMTIVA = rst.getDouble("AMTIVA");
                    beanTkt.AMTSET = rst.getDouble("AMTSET");

                    beanTkt.SVFOPC = rst.getDouble("SVFOPC");
                    beanTkt.SVFOPB = rst.getDouble("SVFOPB");
                    beanTkt.AMTCOMC = rst.getDouble("AMTCOMC");
                    beanTkt.AMTIVAC = rst.getDouble("AMTIVAC");
                    beanTkt.AMTSETC = rst.getDouble("AMTSETC");

                    beanTkt.QTYMATCH = rst.getInt("QTYMATCH");
                    beanTkt.QTYMATMAN = rst.getInt("QTYMATMAN");
                    beanTkt.QTYMATDIF = rst.getInt("QTYMATDIF");
                    beanTkt.QTYSETSAL = rst.getInt("QTYSETSAL");

                    beanTkt.ACCNBR = rst.getString("ACCNBR");

                    beanTkt.TITLE_DATE = filter.TITLE_DATE;

                    if (beanTkt.QTYMATDIF > 0 || beanTkt.QTYSETSAL > 0) {
                        beanTkt.STVALC = "2";
                    } else {
                        beanTkt.STVALC = "1";
                    }

                    if (hmDescEstados.containsKey(beanTkt.STVALC.trim())) {
                        beanTkt.descSTVALC = hmDescEstados.get(beanTkt.STVALC.trim()).toString();
                    } else {
                        beanTkt.descSTVALC = beanTkt.STVALC.trim();
                    }

                    /*beanTkt.SVFOP_SG = SVFOP_SG;
                     beanTkt.AMTCOM_SG = AMTCOM_SG;
                     beanTkt.AMTIVA_SG = AMTIVA_SG;
                     beanTkt.AMTSET_SG = AMTSET_SG;
                    
                     beanTkt.SVFOP_SC = SVFOP_SC;
                     beanTkt.AMTCOM_SC = AMTCOM_SC;
                     beanTkt.AMTIVA_SC = AMTIVA_SC;
                     beanTkt.AMTSET_SC = AMTSET_SC;
                    
                     beanTkt.SVFOP_SE = SVFOP_SE;                    
                     beanTkt.AMTCOM_SE = AMTCOM_SE;
                     beanTkt.AMTIVA_SE = AMTIVA_SE;
                     beanTkt.AMTSET_SE = AMTSET_SE;*/
                    lstTkts.add(beanTkt);
                }
                rst.close();
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
        hmResultado.put("DATA", lstTkts);
        hmResultado.put("TOTAL", lstTotals);

        return hmResultado;
    }

    public List<A2324Filter> loadPX559SQP04021(A2324Filter filter) throws SQLException, Exception {

        List<A2324Filter> lstTkts = new ArrayList<A2324Filter>(0);
        A2324Filter beanTkt;
        long totSVFOP = 0;
        long totSVFOPS = 0;
        long totTOTCOMISI = 0;
        long totIVA = 0;
        long totSVFOPOL = 0;
        long totTOT_DESC = 0;
        long totNET = 0;
        long totSVFOPN = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04021(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

//            cstmt.registerOutParameter(13, Types.INTEGER);
//            cstmt.registerOutParameter(14, Types.INTEGER);
//            cstmt.registerOutParameter(15, Types.INTEGER);
//            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_TDOC.trim());
            cstmt.setString(4, filter.DATE.trim());
            cstmt.setString(5, filter.IN_FECHA_FROM.trim());
            cstmt.setString(6, filter.IN_FECHA_TO.trim());
//            cstmt.setString(7, filter.IN_BANK);
//            cstmt.setString(8, filter.IN_CARDC.trim());
//            //cstmt.setString(9, filter.IN_CARDN.trim());
//            cstmt.setString(9, filter.IN_CARDN1.trim());
//            cstmt.setString(10, filter.IN_CARDN2.trim());
//            cstmt.setString(11, filter.IN_MERCHN.trim());
//            cstmt.setString(12, filter.IN_AGENT.trim());

//            cstmt.setInt(13, filter.page.PAGNUM);
//            cstmt.setInt(14, filter.page.PAGROW);
//            cstmt.setInt(15, filter.page.TOTPAG);
//            cstmt.setInt(16, filter.page.TOTROW);
            cstmt.execute();

//            filter.page.PAGNUM = cstmt.getInt(13);
//            filter.page.PAGROW = cstmt.getInt(14);
//            filter.page.TOTPAG = cstmt.getInt(15);
//            filter.page.TOTROW = cstmt.getInt(16);
            rst = cstmt.getResultSet();

            while (rst.next()) {
                totSVFOP = rst.getLong("SVFOP");
                totSVFOPS = rst.getLong("SVFOPS");
                totTOTCOMISI = rst.getLong("TOTCOMISI");
                totIVA = rst.getLong("IVA");
                totSVFOPOL = rst.getLong("SVFOPOL");
                totTOT_DESC = totTOTCOMISI + totIVA;
                //totNET = totSVFOP - totTOT_DESC;
                totNET = rst.getLong("SVFOPN");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new A2324Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    beanTkt.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();

//                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (beanTkt.STVAL.equals("1")) {
                        beanTkt.desSTVAL = "Match";
                    } else if (beanTkt.STVAL.equals("2")) {
                        beanTkt.desSTVAL = "Payment SB w/o Sales";
                    } else if (beanTkt.STVAL.equals("3")) {
                        beanTkt.desSTVAL = "Sales w/o Payment SB";
                    } else if (beanTkt.STVAL.equals("4")) {
                        beanTkt.desSTVAL = "Match Difference";
                    } else if (beanTkt.STVAL.equals("5")) {
                        beanTkt.desSTVAL = "Match Manual";
                    } else {
                        beanTkt.desSTVAL = "";
                    }
                    beanTkt.REFNBR = rst.getString("REFNBR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.TIPOTAR = rst.getString("TIPOTAR").trim();
                    beanTkt.COMMENT = rst.getString("COMMENT").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());

                    beanTkt.SVFOP = rst.getLong("SVFOP");
                    beanTkt.SVFOPS = rst.getLong("SVFOPS");
                    beanTkt.IMPORT = rst.getLong("IMPORT");
                    //beanTkt.difSVFOP = rst.getLong("SVFOP") - rst.getLong("SVFOPS");
                    beanTkt.difSVFOP = rst.getLong("SVFOPS") - (rst.getLong("SVFOPN") + rst.getLong("TOTCOMISI"));
                    if (beanTkt.difSVFOP >= -1 && beanTkt.difSVFOP <= 1) {
                        beanTkt.difSVFOP = 0;
                    }
                    beanTkt.difIMPORT = rst.getLong("SVFOP") - rst.getLong("IMPORT");

                    if (beanTkt.difIMPORT < 0) {
                        beanTkt.REVCON = "NC";
                    } else if (beanTkt.difIMPORT > 0) {
                        beanTkt.REVCON = "ND";
                    }

                    beanTkt.TOTCOMISI = rst.getLong("TOTCOMISI");
                    beanTkt.IVA = rst.getLong("IVA");
                    beanTkt.SVFOPOL = rst.getLong("SVFOPOL");
                    beanTkt.TOT_DESC = beanTkt.TOTCOMISI + beanTkt.IVA;
                    beanTkt.NET = beanTkt.SVFOP - beanTkt.TOT_DESC;
                    //beanTkt.NET = rst.getLong("SVFOPN"); SOLICITADO POR ING ELMER NEVES Y SARA VILCHEZ

                    beanTkt.totSVFOP = totSVFOP;
                    beanTkt.totSVFOPS = totSVFOPS;
                    //beanTkt.totdifSVFOP = totSVFOP - totSVFOPS;
                    beanTkt.totdifSVFOP = totSVFOPS - (totNET + totTOTCOMISI);
                    if (beanTkt.totdifSVFOP >= -1 && beanTkt.totdifSVFOP <= 1) {
                        beanTkt.totdifSVFOP = 0;
                    }

                    beanTkt.totTOTCOMISI = totTOTCOMISI;
                    beanTkt.totSVFOPOL = totSVFOPOL;
                    beanTkt.totIVA = totIVA;
                    beanTkt.totTOT_DESC = totTOT_DESC;
                    beanTkt.totNET = totNET;

//                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
//                    beanTkt.page.PAGROW = filter.page.PAGROW;
//                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
//                    beanTkt.page.TOTROW = filter.page.TOTROW;
                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A2324Filter> loadPX559SQP04020(A2324Filter filter) throws SQLException, Exception {

        List<A2324Filter> lstTkts = new ArrayList<A2324Filter>(0);
        A2324Filter beanTkt;
        long lngTotCant = 0, lngQtyDoc = 0;
        double dblSVFOP = 0;

        long totSVFOP = 0;
        long totSVFOPS = 0;
        long totTOTCOMISI = 0;
        long totIVA = 0;
        long totTOT_DESC = 0;
        long totNET = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");

        String estado = "", strTitulo = "";
        HashMap<String, String> hmDescEstadosTit = new HashMap<String, String>();
        hmDescEstadosTit.put("1", "Accepted");
        hmDescEstadosTit.put("2", "Rejected");
        hmDescEstadosTit.put("3", "Suspect");
        hmDescEstadosTit.put("P", "Paying w/o Sales");
        hmDescEstadosTit.put("C", "Clarifications");
        hmDescEstadosTit.put("H", "Chargebacks");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04020(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PNR);
            cstmt.setString(3, filter.IN_REFNUMBER);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new A2324Filter();
                beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                beanTkt.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                beanTkt.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                beanTkt.IN_TDOC = filter.IN_TDOC.trim();

//                    beanTkt.DATE = rst.getString("DATE").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                if (beanTkt.STVAL.equals("1")) {
                    beanTkt.desSTVAL = "Match";
                } else if (beanTkt.STVAL.equals("2")) {
                    beanTkt.desSTVAL = "Payment SB w/o Sales";
                } else if (beanTkt.STVAL.equals("3")) {
                    beanTkt.desSTVAL = "Sales w/o Payment SB";
                } else if (beanTkt.STVAL.equals("4")) {
                    beanTkt.desSTVAL = "Match Difference";
                } else if (beanTkt.STVAL.equals("5")) {
                    beanTkt.desSTVAL = "Match Manual";
                } else {
                    beanTkt.desSTVAL = "";
                }
                beanTkt.REFNBR = rst.getString("REFNBR").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.TIPOTAR = rst.getString("TIPOTAR").trim();
                beanTkt.COMMENT = rst.getString("COMMENT").trim();
                beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());

                beanTkt.SVFOP = rst.getLong("SVFOP");
                beanTkt.SVFOPOL = rst.getLong("SVFOPOL");
                beanTkt.SVFOPS = rst.getLong("SVFOPS");
                beanTkt.IMPORT = rst.getLong("IMPORT");
                //beanTkt.difSVFOP = rst.getLong("SVFOP") - rst.getLong("SVFOPS");
                beanTkt.difSVFOP = rst.getLong("SVFOPS") - (rst.getLong("SVFOPN") + rst.getLong("TOTCOMISI"));
                if (beanTkt.difSVFOP >= -1 && beanTkt.difSVFOP <= 1) {
                    beanTkt.difSVFOP = 0;
                }
                beanTkt.difIMPORT = rst.getLong("SVFOP") - rst.getLong("IMPORT");

                if (beanTkt.difIMPORT < 0) {
                    beanTkt.REVCON = "NC";
                } else if (beanTkt.difIMPORT > 0) {
                    beanTkt.REVCON = "ND";
                }

                beanTkt.TOTCOMISI = rst.getLong("TOTCOMISI");
                beanTkt.IVA = rst.getLong("IVA");
                beanTkt.TOT_DESC = beanTkt.TOTCOMISI + beanTkt.IVA;
                beanTkt.NET = beanTkt.SVFOP - beanTkt.TOT_DESC;
                //beanTkt.NET = rst.getLong("SVFOPN"); SOLICITADO POR ING ELMER NEVES Y SARA VILCHEZ

                beanTkt.totSVFOP = totSVFOP;
                beanTkt.totSVFOPS = totSVFOPS;
                beanTkt.totdifSVFOP = totSVFOP - totSVFOPS;
                if (beanTkt.totdifSVFOP >= -1 && beanTkt.totdifSVFOP <= 1) {
                    beanTkt.totdifSVFOP = 0;
                }

                beanTkt.totTOTCOMISI = totTOTCOMISI;
                beanTkt.totIVA = totIVA;
                beanTkt.totTOT_DESC = totTOT_DESC;
                beanTkt.totNET = totNET;

                lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public HashMap<String, List<A2324Filter>> loadPX559SQP04013(A2324Filter filter) throws SQLException, Exception {
        double totSVFOPA = 0.0, totSVFOPB = 0.0, totSVFOPAB = 0.0;
        double totGENCOMIPAY = 0.0, totCOMISIPROV = 0.0, totCOSTVERIFI = 0.0;
        double totVALCOLLECT = 0.0, totTOTCOMISI = 0.0, totIVA = 0.0, totSVFOPN = 0.0;
        List<A2324Filter> lstTkts = new ArrayList<A2324Filter>(0);
        A2324Filter beanTkt;
        List<A2324Filter> lstSett = new ArrayList<A2324Filter>(0);
        A2324Filter beanSett;
        HashMap<String, List<A2324Filter>> hmResultado = new HashMap<String, List<A2324Filter>>();

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("1", "Conciliate");
        hmDescEstados.put("2", "Difference");

        HashMap<String, String> hmDescTipos = new HashMap<String, String>();
        hmDescTipos.put("SG", "General Sale");
        hmDescTipos.put("SC", "Credit Sale");
        hmDescTipos.put("SE", "Cash Sale");

        HashMap<String, String> hmDescTipoDocumento = new HashMap<String, String>();
        hmDescTipoDocumento.put("S", "Sales");
        hmDescTipoDocumento.put("R", "Refund");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04013(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE);
            cstmt.setString(3, filter.IN_REFNBR);
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                //Settlement
                beanSett = new A2324Filter();
                beanSett.SDATE = rst.getString("SDATE").trim();
                beanSett.REFNBR = rst.getString("REFNBR").trim();
                beanSett.TDOCA = rst.getString("TDOCA").trim();
                if (hmDescTipoDocumento.containsKey(rst.getString("TDOCA").trim())) {
                    beanSett.descTDOCA = hmDescTipoDocumento.get(rst.getString("TDOCA").trim()).toString();
                } else {
                    beanSett.descTDOCA = rst.getString("TDOCA").trim();
                }
                beanSett.SVFOPA = rst.getDouble("SVFOPA");
                beanSett.SCARCODA = rst.getString("SCARCODA");
                beanSett.SCARDNA = rst.getString("SCARDNA");
                beanSett.SAUTHOCA = rst.getString("SAUTHOCA");
                beanSett.TPAYA = rst.getString("TPAYA");
                beanSett.CUR = rst.getString("CUR");
                beanSett.BANKA = rst.getString("BANKA");
                beanSett.ABCDA = rst.getString("ABCDA");
                beanSett.SCURRENCYA = rst.getString("SCURRENCYA");
                beanSett.FSELECA = rst.getString("FSELECA");
                beanSett.SPNR = rst.getString("SPNR");
                beanSett.SVFOPAB = rst.getDouble("SVFOPAB");
                beanSett.estadoTitulo = filter.estadoTitulo;
                beanSett.IN_STVAL = filter.IN_STVAL;
                beanSett.SDATE = filter.IN_SDATE;
                beanSett.REFNBR = filter.IN_REFNBR;
                totSVFOPA = totSVFOPA + beanSett.SVFOPA;
                totSVFOPAB = totSVFOPAB + beanSett.SVFOPAB;
                beanSett.GENCOMIPAY = rst.getDouble("GENCOMIPAY");
                totGENCOMIPAY = totGENCOMIPAY + beanSett.GENCOMIPAY;
                beanSett.COMISIPROV = rst.getDouble("COMISIPROV");
                totCOMISIPROV = totCOMISIPROV + beanSett.COMISIPROV;
                beanSett.COSTVERIFI = rst.getDouble("COSTVERIFI");
                totCOSTVERIFI = totCOSTVERIFI + beanSett.COSTVERIFI;
                beanSett.VALCOLLECT = rst.getDouble("VALCOLLECT");
                totVALCOLLECT = totVALCOLLECT + beanSett.VALCOLLECT;
                beanSett.TOTCOMISI = rst.getDouble("TOTCOMISI");
                totTOTCOMISI = totTOTCOMISI + beanSett.TOTCOMISI;
                beanSett.IVA = rst.getDouble("IVA");
                totIVA = totIVA + beanSett.IVA;
                beanSett.SVFOPN = rst.getDouble("SVFOPN");
                totSVFOPN = totSVFOPN + beanSett.SVFOPN;
                lstSett.add(beanSett);
            }

            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    beanTkt = new A2324Filter();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.REFNBR = rst.getString("REFNBR").trim();

                    //Boomer
                    beanTkt.TDOCB = rst.getString("TDOCB").trim();
                    beanTkt.SCURRENCYB = rst.getString("SCURRENCYB").trim();
                    beanTkt.SVFOPB = rst.getDouble("SVFOPB");
                    beanTkt.DOCTYPEB = rst.getString("DOCTYPEB").trim();
                    beanTkt.CHANNELID = rst.getString("CHANNELID").trim();
                    beanTkt.TDOCB = rst.getString("TDOCB").trim();
                    beanTkt.CCIAB = rst.getString("CCIAB");
                    beanTkt.FORMAB = rst.getString("FORMAB");
                    beanTkt.SERIEB = rst.getString("SERIEB");
                    beanTkt.TKT = rst.getString("CCIAB") + rst.getString("FORMAB") + rst.getString("SERIEB");
                    beanTkt.SCARCODB = rst.getString("SCARCODB");
                    beanTkt.SAUTHOCB = rst.getString("SAUTHOCB");
                    beanTkt.SCARDNB = rst.getString("SCARDNB");
                    beanTkt.SPNRB = rst.getString("SPNRB");
                    beanTkt.SPNRB = rst.getString("SPNRB");
                    beanTkt.difSVFOP = filter.difSVFOP;
                    beanTkt.IN_STVAL = filter.IN_STVAL;
                    totSVFOPB = totSVFOPB + beanTkt.SVFOPB;
                    lstTkts.add(beanTkt);

                }
                rst.close();
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

        for (int i = 0; i < lstTkts.size(); i++) {
            lstTkts.get(i).totSVFOPB = totSVFOPB;
        }

        for (int i = 0; i < lstSett.size(); i++) {
            lstSett.get(i).totSVFOPA = totSVFOPA;
            lstSett.get(i).totSVFOPAB = totSVFOPAB;

            lstSett.get(i).totGENCOMIPAY = totGENCOMIPAY;
            lstSett.get(i).totCOMISIPROV = totCOMISIPROV;
            lstSett.get(i).totCOSTVERIFI = totCOSTVERIFI;
            lstSett.get(i).totVALCOLLECT = totVALCOLLECT;
            lstSett.get(i).totTOTCOMISI = totTOTCOMISI;
            lstSett.get(i).totIVA = totIVA;
            lstSett.get(i).totSVFOPN = totSVFOPN;
        }

        hmResultado.put("DATA", lstTkts);
        hmResultado.put("SETT", lstSett);
        return hmResultado;
    }

    public List<SQP00697Filter> loadSQP04014(SQP00697Filter filter) throws SQLException, Exception {
        List<SQP00697Filter> lstRtn = new ArrayList<SQP00697Filter>(0);
        SQP00697Filter objRtn;

        double totAmount = 0.0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04014(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A720PNR.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00697Filter();
                //objRtn.ROWKEY = rs01.getString("ROWKEY");
                //objRtn.A720PAX = rs01.getString("A720PAX");
                objRtn.TICKET = rs01.getString("TICKET");
                objRtn.A1531NREF = rs01.getString("A1531NREF");
                //objRtn.A720CIUVTA = rs01.getString("A720CIUVTA");
                objRtn.A720AGENTE = rs01.getString("A720AGENTE");
                //objRtn.A720FECVTA = Functions.getMonthConvertDate(rs01.getString("A720FECVTA"));
                //objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                //objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                //objRtn.A720PNR = rs01.getString("A720PNR");
                objRtn.A1531VFOP = rs01.getDouble("A1531VFOP");
                totAmount = totAmount + rs01.getDouble("A1531VFOP");
                //objRtn.A720SEQ = rs01.getString("A720SEQ");
                lstRtn.add(objRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

        for (int i = 0; i < lstRtn.size(); i++) {
            lstRtn.get(i).totA1531VFOP = totAmount;
        }

        return lstRtn;
    }

    public List<PX040S01A1716Filter> loadPXSQP04092(PX040S01A1716Filter filter) throws SQLException, Exception {
        List<PX040S01A1716Filter> lstRtn = new ArrayList<PX040S01A1716Filter>(0);
        PX040S01A1716Filter objRtn;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04092(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.A1716FPRO);
            cstmt.setString(3, filter.A1716REFE);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                objRtn = new PX040S01A1716Filter();
                objRtn.A1716CCUST = rst.getString("CCUST");
                objRtn.A1716CIA = rst.getString("CIA");
                objRtn.A1716FORMA = rst.getString("FORMA");
                objRtn.A1716SERIE = rst.getString("SERIE");
                objRtn.TICKET = rst.getString("CIA") + rst.getString("FORMA") + rst.getString("SERIE");
                objRtn.A1716CUPON = rst.getString("CUPON");
                objRtn.A1716SEQT = rst.getString("SEQT");
                objRtn.A1716SEQ = rst.getString("SEQ");

                objRtn.A1716MODO = rst.getString("MODO");
                objRtn.A1716FUENT = rst.getString("FUENTE");
                objRtn.A1716SUBFU = rst.getString("SUBFUENTE");
                objRtn.A1716FP = rst.getString("SCARCOD");
                objRtn.A1716FPRO = rst.getString("SDATE");
                objRtn.A1716CUR = rst.getString("SCURRENCY");
                objRtn.A1716ACTIV = rst.getDouble("ACTIVO");
                objRtn.A1716PASIV = rst.getDouble("PASIV0");
                objRtn.A1716CURRV = "USD";
                objRtn.A1716ACTRV = rst.getDouble("ACTIVORV");
                objRtn.A1716PASRV = rst.getDouble("PASISVORV");
                objRtn.A1716CUENT = rst.getString("CIAF") + "-" + rst.getString("UNIDAD") + "-" + rst.getString("CECOSTO") + "-" + rst.getString("UBICA") + "-" + rst.getString("CUENTA") + "-" + rst.getString("SUBCUENTA") + "-" + rst.getString("EQUIPO") + "-" + rst.getString("ICIA");
                objRtn.A1716SUBCU = rst.getString("SUBCUENTA");
                //objRtn.A1716FCONT = rst.getString("ANNOMES") + rst.getString("PERIODO"); //PERIODO
                objRtn.A1716TITU = rst.getString("TITULO");
                objRtn.A1716COPE = rst.getString("CLIENTE");
                objRtn.A720ROE = rst.getDouble("TIPPOCAM");
                objRtn.A1716IDCON = rst.getString("IDCON");

                if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                    objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                }

                lstRtn.add(objRtn);
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

        return lstRtn;
    }

    public List<A2324Filter> loadPX559SQP04120(A2324Filter filter) throws SQLException, Exception {

        List<A2324Filter> lstTkts = new ArrayList<A2324Filter>(0);
        A2324Filter beanTkt;
        A2324Filter beanTktComplement;
        long totSVFOP = 0;
        long SVFOP = 0;
        long SVFOP_ACUMULADO = 0;
        long SVFOP_ACUMULADO_ANTERIOR = 0;
        Boolean acumulado = false;
        Boolean finalizar = false;
        Boolean recorrido = true;
        Boolean complemento = false;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04120(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATSET.trim());
            cstmt.setString(3, filter.IN_WEEKMO.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totSVFOP = rst.getLong("SVFOP");
                //totSVFOP = filter.AMTSET;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new A2324Filter();
                    beanTkt.IN_DATSET = filter.IN_DATSET.trim();
                    beanTkt.IN_WEEKMO = filter.IN_WEEKMO.trim();
                    beanTkt.AMTSET = filter.AMTSET;
                    beanTkt.totSVFOP_COMPLEMENTO = totSVFOP - filter.AMTSET;
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATSET").trim());

                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.SVFOP = rst.getLong("SVFOP");
                    SVFOP_ACUMULADO = SVFOP_ACUMULADO + beanTkt.SVFOP;

                    if (filter.AMTSET == SVFOP_ACUMULADO || acumulado) {
                        if (acumulado) {
                            beanTkt.FACUMULADO = 1;
                        }
                        acumulado = true;
                    }

                    beanTkt.SVFOP_ACUMULADO = SVFOP_ACUMULADO;

                    beanTkt.SPNR = rst.getString("SPNR");

                    beanTkt.totSVFOP = totSVFOP;

                    if (SVFOP_ACUMULADO > filter.AMTSET && recorrido) {
                        SVFOP = beanTkt.SVFOP;
                        beanTkt.SVFOP = filter.AMTSET - SVFOP_ACUMULADO_ANTERIOR;
                        beanTkt.SVFOP_ACUMULADO = filter.AMTSET;
                        finalizar = true;
                        recorrido = false;
                    }

                    if (complemento) {
                        beanTkt.FCOMPLEMENTO = "1";
                    }

                    lstTkts.add(beanTkt);
                    SVFOP_ACUMULADO_ANTERIOR = SVFOP_ACUMULADO;

                    if (finalizar) {
                        beanTktComplement = new A2324Filter();

                        beanTktComplement.IN_DATSET = filter.IN_DATSET.trim();
                        beanTktComplement.IN_WEEKMO = filter.IN_WEEKMO.trim();
                        beanTktComplement.AMTSET = filter.AMTSET;
                        beanTktComplement.strFormatDate = Functions.getMonthConvert(rst.getString("DATSET").trim());
                        beanTktComplement.SCURRENCY = rst.getString("SCURRENCY");
                        beanTktComplement.SPNR = rst.getString("SPNR");
                        beanTktComplement.totSVFOP = totSVFOP;
                        beanTktComplement.totSVFOP_COMPLEMENTO = totSVFOP - filter.AMTSET;

                        beanTktComplement.SVFOP = Math.abs(SVFOP - beanTkt.SVFOP);
                        //SVFOP_ACUMULADO = SVFOP_ACUMULADO + beanTktComplement.SVFOP;
                        beanTktComplement.SVFOP_ACUMULADO = SVFOP_ACUMULADO;

                        beanTktComplement.FCOMPLEMENTO = "1";
                        lstTkts.add(beanTktComplement);
                        finalizar = false;
                        complemento = true;
                    }

                }
                rst.close();
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

        return lstTkts;
    }

    public A2324Filter loadPX559SQP04121(A2324Filter filter) throws SQLException, Exception {
        A2324Filter beanTkt = new A2324Filter();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04121(?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CCIAB.trim());
            cstmt.setString(3, filter.FORMAB.trim());
            cstmt.setString(4, filter.SERIEB.trim());
            cstmt.setString(5, filter.SCARCODB.trim());
            cstmt.setString(6, filter.SCARDNB.trim());
            cstmt.setString(7, filter.SDATE.trim());
            cstmt.setString(8, filter.REFNBR.trim());
            cstmt.setString(9, filter.SPNRB.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {

                beanTkt.CCIAB = rst.getString("CCIA").trim();
                beanTkt.FORMAB = rst.getString("FORMA").trim();
                beanTkt.SERIEB = rst.getString("SERIE").trim();
                beanTkt.TICKET = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.REFNBR = rst.getString("REFNBR").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SVFOPB = rst.getDouble("SVFOP");
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.DATSET = rst.getString("DATSET").trim();
                beanTkt.WEEKMO = rst.getString("WEEKMO").trim();

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

    public String loadPX559SQP04122(A2324Filter filter) throws SQLException, Exception {
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
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04122(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.option.trim());
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            //Campos para actualizar
            cstmt.setString(3, filter.NEW_SDATE);
            cstmt.setString(4, filter.NEW_REFNBR);
            cstmt.setString(5, filter.NEW_DATSET);
            cstmt.setString(6, filter.NEW_WEEKMO);
            cstmt.setString(7, filter.NEW_CCIA);
            cstmt.setString(8, filter.NEW_FORMA);
            cstmt.setString(9, filter.NEW_SERIE);
            cstmt.setString(10, filter.NEW_TDOC);
            cstmt.setString(11, filter.NEW_SCARCOD);
            cstmt.setString(12, filter.NEW_SCARDN);
            cstmt.setString(13, filter.NEW_SAUTHOC);
            cstmt.setString(14, filter.NEW_SPNR);
            cstmt.setString(15, filter.NEW_SCOUNTRY);
            cstmt.setString(16, filter.NEW_STVAL);
            cstmt.setString(17, filter.NEW_SCURRENCY);
            cstmt.setDouble(18, filter.NEW_SVFOP);
            //Campos para el where
            cstmt.setString(19, filter.CCIAB.trim());
            cstmt.setString(20, filter.FORMAB.trim());
            cstmt.setString(21, filter.SERIEB.trim());
            //cstmt.setString(6, filter.SCARCOD.trim());
            //cstmt.setString(7, filter.SCARDN.trim());
            cstmt.setString(22, filter.SDATE.trim());
            cstmt.setString(23, filter.REFNBR.trim());
            cstmt.setString(24, filter.DATSET.trim());
            cstmt.setString(25, filter.WEEKMO.trim());
            cstmt.setString(26, filter.SPNR.trim());
            //Campos para auditoria
            cstmt.setString(27, session.getUserView().getUserInfo().USR);
            cstmt.setString(28, Functions.getFechaActual());
            cstmt.setString(29, Functions.getHoraActual());

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

    public List<A2324Filter> loadPX559SQP04285(A2324Filter filter) throws SQLException, Exception {

        List<A2324Filter> lstTkts = new ArrayList<A2324Filter>(0);
        A2324Filter beanTkt;
        long totSVFOP = 0;
        long totSVFOPS = 0;
        long totTOTCOMISI = 0;
        long totIVA = 0;
        long totTOT_DESC = 0;
        long totNET = 0;
        long totSVFOPOL = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04285(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

//            cstmt.registerOutParameter(13, Types.INTEGER);
//            cstmt.registerOutParameter(14, Types.INTEGER);
//            cstmt.registerOutParameter(15, Types.INTEGER);
//            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATSET.trim());
            cstmt.setString(3, filter.IN_WEEKMO.trim());
//            cstmt.setString(7, filter.IN_BANK);
//            cstmt.setString(8, filter.IN_CARDC.trim());
//            //cstmt.setString(9, filter.IN_CARDN.trim());
//            cstmt.setString(9, filter.IN_CARDN1.trim());
//            cstmt.setString(10, filter.IN_CARDN2.trim());
//            cstmt.setString(11, filter.IN_MERCHN.trim());
//            cstmt.setString(12, filter.IN_AGENT.trim());

//            cstmt.setInt(13, filter.page.PAGNUM);
//            cstmt.setInt(14, filter.page.PAGROW);
//            cstmt.setInt(15, filter.page.TOTPAG);
//            cstmt.setInt(16, filter.page.TOTROW);
            cstmt.execute();

//            filter.page.PAGNUM = cstmt.getInt(13);
//            filter.page.PAGROW = cstmt.getInt(14);
//            filter.page.TOTPAG = cstmt.getInt(15);
//            filter.page.TOTROW = cstmt.getInt(16);
            rst = cstmt.getResultSet();

            while (rst.next()) {
                totSVFOP = rst.getLong("SVFOP");
                totSVFOPS = rst.getLong("SVFOPS");
                totTOTCOMISI = rst.getLong("TOTCOMISI");
                totIVA = rst.getLong("IVA");
                totSVFOPOL = rst.getLong("SVFOPOL");
                totTOT_DESC = totTOTCOMISI + totIVA;
                //totNET = totSVFOP - totTOT_DESC;
                totNET = rst.getLong("SVFOPN");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new A2324Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    beanTkt.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();

//                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (beanTkt.STVAL.equals("1")) {
                        beanTkt.desSTVAL = "Match";
                    } else if (beanTkt.STVAL.equals("2")) {
                        beanTkt.desSTVAL = "Payment SB w/o Sales";
                    } else if (beanTkt.STVAL.equals("3")) {
                        beanTkt.desSTVAL = "Sales w/o Payment SB";
                    } else if (beanTkt.STVAL.equals("4")) {
                        beanTkt.desSTVAL = "Match Difference";
                    } else if (beanTkt.STVAL.equals("5")) {
                        beanTkt.desSTVAL = "Match Manual";
                    } else {
                        beanTkt.desSTVAL = "";
                    }
                    beanTkt.REFNBR = rst.getString("REFNBR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.TIPOTAR = rst.getString("TIPOTAR").trim();
                    beanTkt.COMMENT = rst.getString("COMMENT").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());

                    beanTkt.totSVFOP = totSVFOP;
                    beanTkt.totSVFOPS = totSVFOPS;
                    //beanTkt.totdifSVFOP = totSVFOP - totSVFOPS;
                    beanTkt.totdifSVFOP = totSVFOPS - (totNET + totTOTCOMISI);

                    beanTkt.SVFOP = rst.getLong("SVFOP");
                    beanTkt.SVFOPOL = rst.getLong("SVFOPOL");
                    beanTkt.SVFOPS = rst.getLong("SVFOPS");
                    beanTkt.IMPORT = rst.getLong("IMPORT");
                    //beanTkt.difSVFOP = rst.getLong("SVFOP") - rst.getLong("SVFOPS");
                    beanTkt.difSVFOP = rst.getLong("SVFOPS") - (rst.getLong("SVFOPN") + rst.getLong("TOTCOMISI"));
                    if (beanTkt.difSVFOP >= -1 && beanTkt.difSVFOP <= 1) {
                        beanTkt.difSVFOP = 0;
                    }
                    beanTkt.difIMPORT = rst.getLong("SVFOP") - rst.getLong("IMPORT");

                    if (beanTkt.difIMPORT < 0) {
                        beanTkt.REVCON = "NC";
                    } else if (beanTkt.difIMPORT > 0) {
                        beanTkt.REVCON = "ND";
                    }

                    beanTkt.TOTCOMISI = rst.getLong("TOTCOMISI");
                    beanTkt.IVA = rst.getLong("IVA");
                    beanTkt.TOT_DESC = beanTkt.TOTCOMISI + beanTkt.IVA;
                    beanTkt.NET = beanTkt.SVFOP - beanTkt.TOT_DESC;
                    //beanTkt.NET = rst.getLong("SVFOPN");

                    beanTkt.totTOTCOMISI = totTOTCOMISI;
                    beanTkt.totIVA = totIVA;
                    beanTkt.totTOT_DESC = totTOT_DESC;
                    beanTkt.totNET = totNET;

//                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
//                    beanTkt.page.PAGROW = filter.page.PAGROW;
//                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
//                    beanTkt.page.TOTROW = filter.page.TOTROW;
                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

}
