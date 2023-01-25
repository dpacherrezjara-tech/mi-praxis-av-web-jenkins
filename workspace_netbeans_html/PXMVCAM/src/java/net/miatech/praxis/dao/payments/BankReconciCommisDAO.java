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
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2345Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class BankReconciCommisDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public BankReconciCommisDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BankReconciCommisDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2345Filter> loadPX524SQP003375(A2345Filter filter) throws SQLException, Exception {

        List<A2345Filter> lstTkts = new ArrayList<A2345Filter>(0);
        A2345Filter beanTkt;
        long QMATCH = 0, QLIQUI = 0, QBANK = 0, QDIFF = 0;
        double AMATCH = 0, ALIQUIL = 0, ALIQUIE = 0, ABANKL = 0, ABANKE = 0, ADIFFL = 0, ADIFFE = 0;
        /*double SVFOP = 0, MONBTCRE1 = 0, RATCNAC1 = 0;
         double COMITCRE1 = 0, IVACRE1 = 0, MONBTDEB1 = 0;
         double RATDNAC1 = 0, COMITDEB1 = 0, IVADEB1 = 0, MONBTEXT1 = 0;
         double RATCEXT1 = 0, COMITEXT1 = 0, IVAEXT1 = 0;

         double MONBTCRE2 = 0, RATCNAC2 = 0;
         double COMITCRE2 = 0, IVACRE2 = 0, MONBTDEB2 = 0;
         double RATDNAC2 = 0, COMITDEB2 = 0, IVADEB2 = 0, MONBTEXT2 = 0;
         double RATCEXT2 = 0, COMITEXT2 = 0, IVAEXT2 = 0;*/

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP003375(?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            /*cstmt.registerOutParameter(16, Types.INTEGER);
             cstmt.registerOutParameter(17, Types.INTEGER);
             cstmt.registerOutParameter(18, Types.INTEGER);
             cstmt.registerOutParameter(19, Types.INTEGER);*/
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(4, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(5, filter.IN_CODEBANK.trim());
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_STVAL);

            /*cstmt.setInt(16, filter.page.PAGNUM);
             cstmt.setInt(17, filter.page.PAGROW);
             cstmt.setInt(18, filter.page.TOTPAG);
             cstmt.setInt(19, filter.page.TOTROW);*/
            cstmt.execute();

            /*filter.page.PAGNUM = cstmt.getInt(16);
             filter.page.PAGROW = cstmt.getInt(17);
             filter.page.TOTPAG = cstmt.getInt(18);
             filter.page.TOTROW = cstmt.getInt(19);*/
            rst = cstmt.getResultSet();

            while (rst.next()) {

                QMATCH = rst.getLong("QMATCH");
                QLIQUI = rst.getLong("QLIQUI");
                QBANK = rst.getLong("QBANK");
                QDIFF = rst.getLong("QDIFF");

                AMATCH = rst.getDouble("AMATCH");
                ALIQUIL = rst.getDouble("ALIQUIL");
                ALIQUIE = rst.getDouble("ALIQUIE");
                ABANKL = rst.getDouble("ABANKL");
                ABANKE = rst.getDouble("ABANKE");
                ADIFFL = rst.getDouble("ADIFFL");
                ADIFFE = rst.getDouble("ADIFFE");

                /*SVFOP = rst.getDouble("SVFOP");
                 MONBTCRE1 = rst.getDouble("MONBTCRE1");
                 RATCNAC1 = rst.getDouble("RATCNAC1");
                 COMITCRE1 = rst.getDouble("COMITCRE1");
                 IVACRE1 = rst.getDouble("IVACRE1");
                 MONBTDEB1 = rst.getDouble("MONBTDEB1");
                 RATDNAC1 = rst.getDouble("RATDNAC1");
                 COMITDEB1 = rst.getDouble("COMITDEB1");
                 IVADEB1 = rst.getDouble("IVADEB1");
                 MONBTEXT1 = rst.getDouble("MONBTEXT1");
                 RATCEXT1 = rst.getDouble("RATCEXT1");
                 COMITEXT1 = rst.getDouble("COMITEXT1");
                 IVAEXT1 = rst.getDouble("IVAEXT1");

                 MONBTCRE2 = rst.getDouble("MONBTCRE2");
                 RATCNAC2 = rst.getDouble("RATCNAC2");
                 COMITCRE2 = rst.getDouble("COMITCRE2");
                 IVACRE2 = rst.getDouble("IVACRE2");
                 MONBTDEB2 = rst.getDouble("MONBTDEB2");
                 RATDNAC2 = rst.getDouble("RATDNAC2");
                 COMITDEB2 = rst.getDouble("COMITDEB2");
                 IVADEB2 = rst.getDouble("IVADEB2");
                 MONBTEXT2 = rst.getDouble("MONBTEXT2");
                 RATCEXT2 = rst.getDouble("RATCEXT2");
                 COMITEXT2 = rst.getDouble("COMITEXT2");
                 IVAEXT2 = rst.getDouble("IVAEXT2");*/
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2345Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strYearFrom = filter.strYearFrom.trim();
                    beanTkt.strYearTo = filter.strYearTo.trim();
                    beanTkt.strMonthFrom = filter.strMonthFrom.trim();
                    beanTkt.strMonthTo = filter.strMonthTo.trim();
                    beanTkt.IN_CODEBANK = filter.IN_CODEBANK.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();

                    beanTkt.BDATEP = rst.getString("FECHA").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("FECHA").trim());
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();

                    beanTkt.QMATCH = rst.getLong("QMATCH");
                    beanTkt.QLIQUI = rst.getLong("QLIQUI");
                    beanTkt.QBANK = rst.getLong("QBANK");
                    beanTkt.QDIFF = rst.getLong("QDIFF");

                    beanTkt.AMATCH = rst.getDouble("AMATCH");
                    beanTkt.ALIQUIL = rst.getDouble("ALIQUIL");
                    beanTkt.ALIQUIE = rst.getDouble("ALIQUIE");
                    beanTkt.ABANKL = rst.getDouble("ABANKL");
                    beanTkt.ABANKE = rst.getDouble("ABANKE");
                    beanTkt.ADIFFL = rst.getDouble("ADIFFL");
                    beanTkt.ADIFFE = rst.getDouble("ADIFFE");
                    beanTkt.ADIFF = rst.getDouble("ADIFFL") - rst.getDouble("ADIFFE");

                    beanTkt.totQMATCH = QMATCH;
                    beanTkt.totQLIQUI = QLIQUI;
                    beanTkt.totQBANK = QBANK;
                    beanTkt.totQDIFF = QDIFF;

                    beanTkt.totAMATCH = AMATCH;
                    beanTkt.totALIQUIL = ALIQUIL;
                    beanTkt.totALIQUIE = ALIQUIE;
                    beanTkt.totABANKL = ABANKL;
                    beanTkt.totABANKE = ABANKE;
                    beanTkt.totADIFFL = ADIFFL;
                    beanTkt.totADIFFE = ADIFFE;
                    beanTkt.totADIFF = ADIFFL - ADIFFE;

                    /*beanTkt.MONBTCRE1 = rst.getDouble("MONBTCRE1");
                     beanTkt.RATCNAC1 = rst.getDouble("RATCNAC1");
                     beanTkt.COMITCRE1 = rst.getDouble("COMITCRE1");
                     beanTkt.IVACRE1 = rst.getDouble("IVACRE1");
                     beanTkt.MONBTDEB1 = rst.getDouble("MONBTDEB1");
                     beanTkt.RATDNAC1 = rst.getDouble("RATDNAC1");
                     beanTkt.COMITDEB1 = rst.getDouble("COMITDEB1");
                     beanTkt.IVADEB1 = rst.getDouble("IVADEB1");
                     beanTkt.MONBTEXT1 = rst.getDouble("MONBTEXT1");
                     beanTkt.RATCEXT1 = rst.getDouble("RATCEXT1");
                     beanTkt.COMITEXT1 = rst.getDouble("COMITEXT1");
                     beanTkt.IVAEXT1 = rst.getDouble("IVAEXT1");

                     beanTkt.MONBTCRE2 = rst.getDouble("MONBTCRE2");
                     beanTkt.RATCNAC2 = rst.getDouble("RATCNAC2");
                     beanTkt.COMITCRE2 = rst.getDouble("COMITCRE2");
                     beanTkt.IVACRE2 = rst.getDouble("IVACRE2");
                     beanTkt.MONBTDEB2 = rst.getDouble("MONBTDEB2");
                     beanTkt.RATDNAC2 = rst.getDouble("RATDNAC2");
                     beanTkt.COMITDEB2 = rst.getDouble("COMITDEB2");
                     beanTkt.IVADEB2 = rst.getDouble("IVADEB2");
                     beanTkt.MONBTEXT2 = rst.getDouble("MONBTEXT2");
                     beanTkt.RATCEXT2 = rst.getDouble("RATCEXT2");
                     beanTkt.COMITEXT2 = rst.getDouble("COMITEXT2");
                     beanTkt.IVAEXT2 = rst.getDouble("IVAEXT2");

                     beanTkt.totSVFOP = SVFOP;

                     beanTkt.totMONBTCRE1 = MONBTCRE1;
                     beanTkt.totRATCNAC1 = RATCNAC1;
                     beanTkt.totCOMITCRE1 = COMITCRE1;
                     beanTkt.totIVACRE1 = IVACRE1;
                     beanTkt.totMONBTDEB1 = MONBTDEB1;
                     beanTkt.totRATDNAC1 = RATDNAC1;
                     beanTkt.totCOMITDEB1 = COMITDEB1;
                     beanTkt.totIVADEB1 = IVADEB1;
                     beanTkt.totMONBTEXT1 = MONBTEXT1;
                     beanTkt.totRATCEXT1 = RATCEXT1;
                     beanTkt.totCOMITEXT1 = COMITEXT1;
                     beanTkt.totIVAEXT1 = IVAEXT1;

                     beanTkt.totMONBTCRE2 = MONBTCRE2;
                     beanTkt.totRATCNAC2 = RATCNAC2;
                     beanTkt.totCOMITCRE2 = COMITCRE2;
                     beanTkt.totIVACRE2 = IVACRE2;
                     beanTkt.totMONBTDEB2 = MONBTDEB2;
                     beanTkt.totRATDNAC2 = RATDNAC2;
                     beanTkt.totCOMITDEB2 = COMITDEB2;
                     beanTkt.totIVADEB2 = IVADEB2;
                     beanTkt.totMONBTEXT2 = MONBTEXT2;
                     beanTkt.totRATCEXT2 = RATCEXT2;
                     beanTkt.totCOMITEXT2 = COMITEXT2;
                     beanTkt.totIVAEXT2 = IVAEXT2;*/

                    /*beanTkt.page.PAGNUM = filter.page.PAGNUM;
                     beanTkt.page.PAGROW = filter.page.PAGROW;
                     beanTkt.page.TOTPAG = filter.page.TOTPAG;
                     beanTkt.page.TOTROW = filter.page.TOTROW;*/
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

    public List<A2345Filter> loadPX524SQP003395(A2345Filter filter) throws SQLException, Exception {

        List<A2345Filter> lstTkts = new ArrayList<A2345Filter>(0);
        A2345Filter beanTkt;
        long QMATCH = 0, QLIQUI = 0, QBANK = 0, QDIFF = 0;
        double AMATCH = 0, ALIQUIL = 0, ALIQUIE = 0, ABANKL = 0, ABANKE = 0, ADIFFL = 0, ADIFFE = 0;
        String strTitulo = "Bank Payment Date : " + filter.strFormatDate;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP003395(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.BDATEP);
            cstmt.setString(4, filter.IN_CODEBANK.trim());
            cstmt.setString(5, filter.IN_MERCHN.trim());
            cstmt.setString(6, filter.IN_STVAL);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                QMATCH = rst.getLong("QMATCH");
                QLIQUI = rst.getLong("QLIQUI");
                QBANK = rst.getLong("QBANK");
                QDIFF = rst.getLong("QDIFF");

                AMATCH = rst.getDouble("AMATCH");
                ALIQUIL = rst.getDouble("ALIQUIL");
                ALIQUIE = rst.getDouble("ALIQUIE");
                ABANKL = rst.getDouble("ABANKL");
                ABANKE = rst.getDouble("ABANKE");
                ADIFFL = rst.getDouble("ADIFFL");
                ADIFFE = rst.getDouble("ADIFFE");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2345Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strYearFrom = filter.strYearFrom.trim();
                    beanTkt.strYearTo = filter.strYearTo.trim();
                    beanTkt.strMonthFrom = filter.strMonthFrom.trim();
                    beanTkt.strMonthTo = filter.strMonthTo.trim();
                    beanTkt.IN_CODEBANK = filter.IN_CODEBANK.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.strFormatDate = filter.strFormatDate;

                    beanTkt.BDATEP = rst.getString("FECHA").trim();
                    beanTkt.strTitulo = strTitulo;
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();

                    beanTkt.QMATCH = rst.getLong("QMATCH");
                    beanTkt.QLIQUI = rst.getLong("QLIQUI");
                    beanTkt.QBANK = rst.getLong("QBANK");
                    beanTkt.QDIFF = rst.getLong("QDIFF");

                    beanTkt.AMATCH = rst.getDouble("AMATCH");
                    beanTkt.ALIQUIL = rst.getDouble("ALIQUIL");
                    beanTkt.ALIQUIE = rst.getDouble("ALIQUIE");
                    beanTkt.ABANKL = rst.getDouble("ABANKL");
                    beanTkt.ABANKE = rst.getDouble("ABANKE");
                    beanTkt.ADIFFL = rst.getDouble("ADIFFL");
                    beanTkt.ADIFFE = rst.getDouble("ADIFFE");
                    beanTkt.ADIFF = rst.getDouble("ADIFFL") - rst.getDouble("ADIFFE");

                    beanTkt.totQMATCH = QMATCH;
                    beanTkt.totQLIQUI = QLIQUI;
                    beanTkt.totQBANK = QBANK;
                    beanTkt.totQDIFF = QDIFF;

                    beanTkt.totAMATCH = AMATCH;
                    beanTkt.totALIQUIL = ALIQUIL;
                    beanTkt.totALIQUIE = ALIQUIE;
                    beanTkt.totABANKL = ABANKL;
                    beanTkt.totABANKE = ABANKE;
                    beanTkt.totADIFFL = ADIFFL;
                    beanTkt.totADIFFE = ADIFFE;
                    beanTkt.totADIFF = ADIFFL - ADIFFE;

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

    public List<A2345Filter> loadPX524SQP003396(A2345Filter filter) throws SQLException, Exception {

        List<A2345Filter> lstTkts = new ArrayList<A2345Filter>(0);
        A2345Filter beanTkt;
        HashMap hmStatus = new HashMap();
        hmStatus.put("1", "Match");
        hmStatus.put("2", "Settlement w/o Bank Account");
        hmStatus.put("3", "Bank Account w/o Settlement");
        hmStatus.put("4", "MATCH Difference");

        String strTitulo = " Bank Payment Date : " + filter.BDATEP + " - Status : " + hmStatus.get(filter.IN_STVAL).toString();

        long QTYTRAN = 0;
        double SVFOP = 0, MONBTCRE1 = 0, RATCNAC1 = 0, COMITCRE1 = 0, IVACRE1 = 0;
        double MONBTDEB1 = 0, RATDNAC1 = 0, COMITDEB1 = 0, IVADEB1 = 0, MONBTEXT1 = 0;
        double RATCEXT1 = 0, COMITEXT1 = 0, IVAEXT1 = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP003396_1(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.BDATEP);
            cstmt.setString(4, filter.IN_CODEBANK.trim());
            cstmt.setString(5, filter.IN_MERCHN.trim());
            cstmt.setString(6, filter.IN_STVAL);

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

            if (rst.next()) {
                SVFOP = rst.getDouble("SVFOP");
                QTYTRAN = rst.getLong("QTYTRAN");
                MONBTCRE1 = rst.getDouble("MONBTCRE1");
                RATCNAC1 = rst.getDouble("RATCNAC1");
                COMITCRE1 = rst.getDouble("COMITCRE1");
                IVACRE1 = rst.getDouble("IVACRE1");
                MONBTDEB1 = rst.getDouble("MONBTDEB1");
                RATDNAC1 = rst.getDouble("RATDNAC1");
                COMITDEB1 = rst.getDouble("COMITDEB1");
                IVADEB1 = rst.getDouble("IVADEB1");
                MONBTEXT1 = rst.getDouble("MONBTEXT1");
                RATCEXT1 = rst.getDouble("RATCEXT1");
                COMITEXT1 = rst.getDouble("COMITEXT1");
                IVAEXT1 = rst.getDouble("IVAEXT1");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    for (int a = 0; a < 3; a++) {

                        beanTkt = new A2345Filter();
                        beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                        beanTkt.strYearFrom = filter.strYearFrom.trim();
                        beanTkt.strYearTo = filter.strYearTo.trim();
                        beanTkt.strMonthFrom = filter.strMonthFrom.trim();
                        beanTkt.strMonthTo = filter.strMonthTo.trim();
                        beanTkt.IN_CODEBANK = filter.IN_CODEBANK.trim();
                        beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                        beanTkt.IN_STVAL = filter.IN_STVAL.trim();

                        beanTkt.RN = rst.getLong("RN");
                        beanTkt.BDATEP = rst.getString("BDATEP").trim();
                        beanTkt.DATEF = rst.getString("DATEF").trim();
                        beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                        beanTkt.strDescBank = rst.getString("NAMEBANK").trim();
                        beanTkt.MERCHN = rst.getString("MERCHN").trim();
                        beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                        beanTkt.SVFOP = rst.getDouble("SVFOP");
                        beanTkt.QTYTRAN = rst.getLong("QTYTRAN");
                        beanTkt.strTitulo = strTitulo;

                        beanTkt.totSVFOP = SVFOP;
                        beanTkt.totQTYTRAN = QTYTRAN;
                        beanTkt.totMONBTCRE1 = MONBTCRE1;
                        beanTkt.totRATCNAC1 = RATCNAC1;
                        beanTkt.totCOMITCRE1 = COMITCRE1;
                        beanTkt.totIVACRE1 = IVACRE1;
                        beanTkt.totMONBTDEB1 = MONBTDEB1;
                        beanTkt.totRATDNAC1 = RATDNAC1;
                        beanTkt.totCOMITDEB1 = COMITDEB1;
                        beanTkt.totIVADEB1 = IVADEB1;
                        beanTkt.totMONBTEXT1 = MONBTEXT1;
                        beanTkt.totRATCEXT1 = RATCEXT1;
                        beanTkt.totCOMITEXT1 = COMITEXT1;
                        beanTkt.totIVAEXT1 = IVAEXT1;

                        beanTkt.page.PAGNUM = filter.page.PAGNUM;
                        beanTkt.page.PAGROW = filter.page.PAGROW;
                        beanTkt.page.TOTPAG = filter.page.TOTPAG;
                        beanTkt.page.TOTROW = filter.page.TOTROW;

                        if (a == 0) {
                            beanTkt.strDescripcion = "Settlement";
                            beanTkt.MONBTCRE1 = rst.getDouble("MONBTCRE1");
                            beanTkt.RATCNAC1 = rst.getDouble("RATCNAC1");
                            beanTkt.COMITCRE1 = rst.getDouble("COMITCRE1");
                            beanTkt.IVACRE1 = rst.getDouble("IVACRE1");
                            beanTkt.MONBTDEB1 = rst.getDouble("MONBTDEB1");
                            beanTkt.RATDNAC1 = rst.getDouble("RATDNAC1");
                            beanTkt.COMITDEB1 = rst.getDouble("COMITDEB1");
                            beanTkt.IVADEB1 = rst.getDouble("IVADEB1");
                            beanTkt.MONBTEXT1 = rst.getDouble("MONBTEXT1");
                            beanTkt.RATCEXT1 = rst.getDouble("RATCEXT1");
                            beanTkt.COMITEXT1 = rst.getDouble("COMITEXT1");
                            beanTkt.IVAEXT1 = rst.getDouble("IVAEXT1");

                        } else if (a == 1) {
                            beanTkt.strDescripcion = "Bank Account";
                            beanTkt.MONBTCRE1 = rst.getDouble("MONBTCRE2");
                            beanTkt.RATCNAC1 = rst.getDouble("RATCNAC2");
                            beanTkt.COMITCRE1 = rst.getDouble("COMITCRE2");
                            beanTkt.IVACRE1 = rst.getDouble("IVACRE2");
                            beanTkt.MONBTDEB1 = rst.getDouble("MONBTDEB2");
                            beanTkt.RATDNAC1 = rst.getDouble("RATDNAC2");
                            beanTkt.COMITDEB1 = rst.getDouble("COMITDEB2");
                            beanTkt.IVADEB1 = rst.getDouble("IVADEB2");
                            beanTkt.MONBTEXT1 = rst.getDouble("MONBTEXT2");
                            beanTkt.RATCEXT1 = rst.getDouble("RATCEXT2");
                            beanTkt.COMITEXT1 = rst.getDouble("COMITEXT2");
                            beanTkt.IVAEXT1 = rst.getDouble("IVAEXT2");

                        } else {
                            beanTkt.strDescripcion = "Difference";
                            beanTkt.MONBTCRE1 = rst.getDouble("MONBTCRE1") - rst.getDouble("MONBTCRE2");
                            beanTkt.RATCNAC1 = rst.getDouble("RATCNAC1") - rst.getDouble("RATCNAC2");
                            beanTkt.COMITCRE1 = rst.getDouble("COMITCRE1") - rst.getDouble("COMITCRE2");
                            beanTkt.IVACRE1 = rst.getDouble("IVACRE1") - rst.getDouble("IVACRE2");
                            beanTkt.MONBTDEB1 = rst.getDouble("MONBTDEB1") - rst.getDouble("MONBTDEB2");
                            beanTkt.RATDNAC1 = rst.getDouble("RATDNAC1") - rst.getDouble("RATDNAC2");
                            beanTkt.COMITDEB1 = rst.getDouble("COMITDEB1") - rst.getDouble("COMITDEB2");
                            beanTkt.IVADEB1 = rst.getDouble("IVADEB1") - rst.getDouble("IVADEB2");
                            beanTkt.MONBTEXT1 = rst.getDouble("MONBTEXT1") - rst.getDouble("MONBTEXT2");
                            beanTkt.RATCEXT1 = rst.getDouble("RATCEXT1") - rst.getDouble("RATCEXT2");
                            beanTkt.COMITEXT1 = rst.getDouble("COMITEXT1") - rst.getDouble("COMITEXT2");
                            beanTkt.IVAEXT1 = rst.getDouble("IVAEXT1") - rst.getDouble("IVAEXT2");
                        }

                        lstTkts.add(beanTkt);
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
    
    public List<A2290Filter> loadPX524SQP003397(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");

        double COMISION = 0, SVFOP = 0;
        int QTYDOC = 0;
        String strTitulo = filter.strTitulo;

        if (filter.page.TOTPAG == -1) {
            strTitulo = filter.strTitulo + " - Merchant : " + filter.MERCHN + " - Bank : " + filter.strBCard1;
        }

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP003397(?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.BDATEP);
            cstmt.setString(4, filter.CODEBANK.trim());
            cstmt.setString(5, filter.MERCHN.trim());
            cstmt.setString(6, filter.IN_STVAL);
            cstmt.setString(7, filter.DATEF);

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();

            if (rst.next()) {
                SVFOP = rst.getDouble("SVFOP");
                COMISION = rst.getDouble("COMISION");
                QTYDOC = rst.getInt("QTYDOC");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                
                rst = cstmt.getResultSet();
                
                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.CODEBANK = filter.CODEBANK.trim();
                    beanTkt.MERCHN = filter.MERCHN.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.strBCard1 = filter.strBCard1.trim();
                    beanTkt.BDATEP = filter.BDATEP.trim();
                    beanTkt.strTitulo = strTitulo;

                    beanTkt.RN = rst.getLong("RN");
                    beanTkt.FTE = rst.getString("FTE").trim();
                    if (rst.getString("FTE").trim().equals("S")) {
                        beanTkt.strDescFTE = "ASR";
                    } else if (rst.getString("FTE").trim().equals("A")) {
                        beanTkt.strDescFTE = "ARC";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        beanTkt.strDescFTE = "BSP";
                    } else {
                        beanTkt.strDescFTE = rst.getString("FTE").trim();
                    }
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.TIPOTAR = rst.getString("TIPOTAR").trim();
                    beanTkt.EMISOR = rst.getString("EMISOR").trim();
                    beanTkt.RATECOM = rst.getDouble("RATECOM");
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if(rst.getString("TDOC").trim().equals("R")){
                        beanTkt.strTOPER = "Refund";
                    }else{
                        beanTkt.strTOPER = "Sales";
                    }
                    
                    if(rst.getString("TDOC").trim().equals("R")){
                        beanTkt.COMISION = rst.getDouble("COMISION") * -1;
                    }else{
                        beanTkt.COMISION = rst.getDouble("COMISION");
                    }
                    
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.FCONC = rst.getString("FCONC").trim();

                    if (beanTkt.EMISOR.trim().equals("VISA") || beanTkt.EMISOR.trim().equals("MC")) {
                        beanTkt.strDescripcion = "Foreign";
                    } else {
                        if (beanTkt.TIPOTAR.trim().equals("DEB")) {
                            beanTkt.strDescripcion = "National Debit";
                        } else if (beanTkt.TIPOTAR.trim().equals("CRE")) {
                            beanTkt.strDescripcion = "National Credit";
                        } else {
                            beanTkt.strDescripcion = "National";
                        }
                    }

                    beanTkt.TDATE = rst.getString("TDATE").trim();
                    beanTkt.DATEF = rst.getString("DATEF").trim();
                    if (rst.getString("BDATEP").trim().length() == 6) {
                        beanTkt.BDATEP = Functions.FormatFecha(rst.getString("BDATEP").trim(), "yyMMdd", "yyyyMMdd");
                    } else {
                        beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    }
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    if (!rst.getString("DATEC").trim().equals("")) {
                        beanTkt.strBankDeposit = rst.getString("DATEC").trim();
                    } else {
                        if (!beanTkt.BDATEP.trim().isEmpty()) {
                            beanTkt.strBankDeposit = String.valueOf(Functions.diferenciaDiasEntreSistema(beanTkt.BDATEP)) + " days";
                        }
                    }
                    if (hmDescEstados.containsKey(rst.getString("BSTVAL").trim().toUpperCase())) {
                        beanTkt.BSTVAL = hmDescEstados.get(rst.getString("BSTVAL").trim()).toString();
                    } else {
                        beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    }
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");

                    beanTkt.strNUMREF = rst.getString("NUMREF").trim();
                    beanTkt.NUMREF = rst.getString("NUMREF").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.BAID = rst.getString("BAID").trim();
                    if (rst.getString("FLAGC").trim().equals("C")) {
                        beanTkt.FLAGC = "Match";
                    }
                    beanTkt.totQTYDOC = QTYDOC;
                    beanTkt.totSVFOP = SVFOP;
                    beanTkt.totCOMISION = COMISION;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

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

    public List<A2290Filter> loadPX269SQP02492(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02492(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE.trim());
            cstmt.setString(3, filter.SCOUNTRY.trim());
            cstmt.setString(4, filter.TDOC.trim());
            cstmt.setString(5, filter.CODEBANK.trim());
            cstmt.setString(6, filter.SCARCOD.trim());
            cstmt.setString(7, filter.SCARDN.trim());
            cstmt.setString(8, filter.SAUTHOC.trim());
            cstmt.setDouble(9, filter.SVFOP);
            cstmt.setString(10, filter.SEQNUM.trim());
            cstmt.setString(11, filter.NUMREF.trim());

            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

            rst = cstmt.getResultSet();

            if (rst.next()) {
                totAVFOP = rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.RN = rst.getLong("RN");
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.CODEBANK = filter.CODEBANK.trim();
                    beanTkt.NUMREF = filter.NUMREF.trim();
                    beanTkt.strTitulo = filter.strTitulo.trim();
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.SCARDN = filter.SCARDN.trim();
                    beanTkt.SAUTHOC = filter.SAUTHOC.trim();
                    beanTkt.FTE = filter.FTE.trim();

                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    //ACCB
                    beanTkt.AAGENT = rst.getString("AAGENT").trim();
                    beanTkt.strDescripcion = rst.getString("DESCAGT").trim();
                    beanTkt.ADATE = rst.getString("ADATE").trim();
                    beanTkt.AVFOP = rst.getDouble("AVFOP");
                    beanTkt.ACURRENCY = rst.getString("ACURRENCY").trim();
                    beanTkt.ACARDN = rst.getString("ACARDN").trim();
                    beanTkt.APNR = rst.getString("APNR").trim();
                    beanTkt.ACARCOD = rst.getString("ACARCOD").trim();
                    beanTkt.ACOUNTRY = rst.getString("ACOUNTRY").trim();
                    beanTkt.AAUTHOC = rst.getString("AAUTHOC").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    //Banks
                    beanTkt.BDATEL = rst.getString("BDATEL").trim();
                    beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    if (beanTkt.BSTVAL.trim().equals("1")) {
                        beanTkt.BSTVAL = "Accepted";
                    } else if (beanTkt.BSTVAL.trim().equals("2")) {
                        beanTkt.BSTVAL = "Rejected";
                    } else if (beanTkt.BSTVAL.trim().equals("3")) {
                        beanTkt.BSTVAL = "Suspect";
                    }
                    beanTkt.BAID = rst.getString("BAID").trim();
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    beanTkt.BSTVALP = rst.getString("BSTVALP").trim();
                    if (beanTkt.BSTVALP.trim().equals("1")) {
                        beanTkt.BSTVALP = "Paid";
                    }

                    if (!beanTkt.ADATE.trim().equals("")) {
                        if(!beanTkt.BDATEP.trim().equals("")){
                          beanTkt.lngDays = Functions.diferenciaDiasEntreSistemaPago(beanTkt.ADATE,beanTkt.BDATEP);   
                        }else{
                          beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.ADATE);
                      }
                    }

                    beanTkt.totSVFOP = totAVFOP;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;
                    lstData.add(beanTkt);
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

    public List<A2290Filter> loadPX269SQP00744(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Sales";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00744_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE.trim());//20190302
            cstmt.setString(3, filter.TDOC.trim());//R
            cstmt.setString(4, filter.SCARCOD.trim());//MC
            //cstmt.setString(5, filter.SCARDN.trim());
            if (filter.SCARDN.trim().length() >= 15) {//518899******6358
                cstmt.setString(5, filter.SCARDN.substring(0, 6).trim());
                cstmt.setString(6, filter.SCARDN.substring(filter.SCARDN.trim().length() - 4).trim());
            } else {
                cstmt.setString(5, "");
                cstmt.setString(6, "");
            }
            cstmt.setString(7, filter.BAID.trim());//20191205005214
            cstmt.setString(8, filter.SAUTHOC.trim());//509011
            cstmt.setString(9, filter.CODEBANK.trim()); //BN
            cstmt.setString(10, filter.NUMREF.trim());//75445509061250075522161
            cstmt.setString(11, filter.FTE.trim()); //

            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

            rst = cstmt.getResultSet();

            if (rst.next()) {
                totAVFOP = rst.getDouble("AVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.RN = rst.getLong("RN");
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.strDescCountry = filter.strDescCountry.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.CODEBANK = filter.CODEBANK.trim();
                    beanTkt.NUMREF = filter.NUMREF.trim();
                    beanTkt.strTitulo = filter.strTitulo.trim();
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.SCARDN = filter.SCARDN.trim();
                    beanTkt.SAUTHOC = filter.SAUTHOC.trim();
                    beanTkt.FTE = filter.FTE.trim();

                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    //ACCB
                    beanTkt.AAGENT = rst.getString("AAGENT").trim();
                    beanTkt.strDescripcion = rst.getString("DESCAGT").trim();
                    beanTkt.ADATE = rst.getString("ADATE").trim();
                    beanTkt.AVFOP = rst.getDouble("AVFOP");
                    beanTkt.ACURRENCY = rst.getString("ACURRENCY").trim();
                    beanTkt.ACARDN = rst.getString("ACARDN").trim();
                    beanTkt.APNR = rst.getString("APNR").trim();
                    beanTkt.ACARCOD = rst.getString("ACARCOD").trim();
                    beanTkt.ACOUNTRY = rst.getString("ACOUNTRY").trim();
                    beanTkt.AAUTHOC = rst.getString("AAUTHOC").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    //Banks
                    beanTkt.BDATEL = rst.getString("BDATEL").trim();
                    beanTkt.BSTVAL = rst.getString("BSTVAL").trim();
                    if (beanTkt.BSTVAL.trim().equals("1")) {
                        beanTkt.BSTVAL = "Accepted";
                    } else if (beanTkt.BSTVAL.trim().equals("2")) {
                        beanTkt.BSTVAL = "Rejected";
                    } else if (beanTkt.BSTVAL.trim().equals("3")) {
                        beanTkt.BSTVAL = "Suspect";
                    }
                    beanTkt.BAID = rst.getString("BAID").trim();
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    beanTkt.BSTVALP = rst.getString("BSTVALP").trim();
                    if (beanTkt.BSTVALP.trim().equals("1")) {
                        beanTkt.BSTVALP = "Paid";
                    }

                   // if (!beanTkt.ADATE.trim().equals("")) {
                   //     beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.ADATE);
                   // }
                    
                     if (!beanTkt.ADATE.trim().equals("")) {
                        if(!beanTkt.BDATEP.trim().equals("")){
                          beanTkt.lngDays = Functions.diferenciaDiasEntreSistemaPago(beanTkt.ADATE,beanTkt.BDATEP);   
                        }else{
                          beanTkt.lngDays = Functions.diferenciaDiasEntreSistema(beanTkt.ADATE);
                      }
                    }

                    beanTkt.totSVFOP = totAVFOP;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;
                    lstData.add(beanTkt);
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

    
    
    
}
