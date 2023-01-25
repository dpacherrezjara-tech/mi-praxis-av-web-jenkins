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
import net.miatech.praxis.payment.filter.A4116Filter;
import net.miatech.praxis.payment.filter.A4183Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class AccountingTransactAmexDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingTransactAmexDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingTransactAmexDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4116Filter> loadPX590SQP04416(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        double totTGROSAMOUN = 0;
        double totTGROSAMOUN_ACCOUNTED = 0;
        double totTGROSAMOUN_PENDING = 0;
        int totQTY_ACCOUNTED = 0;
        int totQTY_PENDING = 0;
        int totQTY_TOTAL = 0;
        int totQTY_ALL = 0;
        double totTGROSAMOUN_ALL = 0;
        int totQTY_DIFF = 0;
        double totTGROSAMOUN_DIFF = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04416(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_STCONL);
            cstmt.setString(6, filter.IN_TDOC);
            cstmt.setString(7, filter.IN_COMPLEMENT);
            cstmt.setString(8, filter.IN_SCURRENCY);
            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totTGROSAMOUN = rst.getDouble("TGROSAMOUN");
                totTGROSAMOUN_ACCOUNTED = rst.getDouble("TGROSAMOUN_ACCOUNTED");
                totTGROSAMOUN_PENDING = rst.getDouble("TGROSAMOUN_PENDING");
                totQTY_ACCOUNTED = rst.getInt("QTY_ACCOUNTED");
                totQTY_PENDING = rst.getInt("QTY_PENDING");
                totQTY_TOTAL = rst.getInt("QTY_TOTAL");
                totQTY_ALL = rst.getInt("QTY_ALL");
                totTGROSAMOUN_ALL = rst.getDouble("TGROSAMOUN_ALL");
                totQTY_DIFF = totQTY_TOTAL - totQTY_ALL;
                totTGROSAMOUN_DIFF = totTGROSAMOUN - totTGROSAMOUN_ALL;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_COMPLEMENT = filter.IN_COMPLEMENT.trim();

                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.PAYDATE);
                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.TGROSAMOUN_ACCOUNTED = rst.getDouble("TGROSAMOUN_ACCOUNTED");
                    beanTkt.TGROSAMOUN_PENDING = rst.getDouble("TGROSAMOUN_PENDING");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.QTY_ACCOUNTED = rst.getInt("QTY_ACCOUNTED");
                    beanTkt.QTY_PENDING = rst.getInt("QTY_PENDING");
                    beanTkt.QTY_TOTAL = rst.getInt("QTY_TOTAL");
                    beanTkt.QTY_ALL = rst.getInt("QTY_ALL");
                    beanTkt.TGROSAMOUN_ALL = rst.getDouble("TGROSAMOUN_ALL");

                    //TOTALEs
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totTGROSAMOUN_ACCOUNTED = totTGROSAMOUN_ACCOUNTED;
                    beanTkt.totTGROSAMOUN_PENDING = totTGROSAMOUN_PENDING;
                    beanTkt.totQTY_ACCOUNTED = totQTY_ACCOUNTED;
                    beanTkt.totQTY_PENDING = totQTY_PENDING;
                    beanTkt.totQTY_TOTAL = totQTY_TOTAL;
                    beanTkt.totQTY_ALL = totQTY_ALL;
                    beanTkt.totTGROSAMOUN_ALL = totTGROSAMOUN_ALL;
                    beanTkt.totQTY_DIFF = totQTY_DIFF;
                    beanTkt.totTGROSAMOUN_DIFF = totTGROSAMOUN_DIFF;

                    //DIFERENCIAs
                    beanTkt.QTY_DIFF = beanTkt.QTY_TOTAL - beanTkt.QTY_ALL;
                    beanTkt.TGROSAMOUN_DIFF = beanTkt.TGROSAMOUN - beanTkt.TGROSAMOUN_ALL;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
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
        return lstTkts;
    }

    public List<A4116Filter> loadPX590SQP04454(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        double totTGROSAMOUN = 0;
        double totTGROSAMOUN_ACCOUNTED = 0;
        double totTGROSAMOUN_PENDING = 0;
        int totQTY_ACCOUNTED = 0;
        int totQTY_PENDING = 0;
        int totQTY_TOTAL = 0;
        int totQTY_ALL = 0;
        double totTGROSAMOUN_ALL = 0;
        int totQTY_DIFF = 0;
        double totTGROSAMOUN_DIFF = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "Tkt");
        hmDescReglas.put("2", "PNR");
        hmDescReglas.put("3", "CCard");
        hmDescReglas.put("4", "Manual");

        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "Pending");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04454(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_DATE_VALUE);
            cstmt.setString(4, filter.IN_TDOC);
            cstmt.setString(5, filter.IN_COMPLEMENT);
            cstmt.setString(6, filter.IN_SCURRENCY);
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
                totTGROSAMOUN = rst.getDouble("TGROSAMOUN");
                totTGROSAMOUN_ACCOUNTED = rst.getDouble("TGROSAMOUN_ACCOUNTED");
                totTGROSAMOUN_PENDING = rst.getDouble("TGROSAMOUN_PENDING");
                totQTY_ACCOUNTED = rst.getInt("QTY_ACCOUNTED");
                totQTY_PENDING = rst.getInt("QTY_PENDING");
                totQTY_TOTAL = rst.getInt("QTY_TOTAL");
                totQTY_ALL = rst.getInt("QTY_ALL");
                totTGROSAMOUN_ALL = rst.getDouble("TGROSAMOUN_ALL");
                totQTY_DIFF = totQTY_TOTAL - totQTY_ALL;
                totTGROSAMOUN_DIFF = totTGROSAMOUN - totTGROSAMOUN_ALL;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_COMPLEMENT = filter.IN_COMPLEMENT.trim();

                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.TGROSAMOUN_ACCOUNTED = rst.getDouble("TGROSAMOUN_ACCOUNTED");
                    beanTkt.TGROSAMOUN_PENDING = rst.getDouble("TGROSAMOUN_PENDING");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.QTY_ACCOUNTED = rst.getInt("QTY_ACCOUNTED");
                    beanTkt.QTY_PENDING = rst.getInt("QTY_PENDING");
                    beanTkt.QTY_TOTAL = rst.getInt("QTY_TOTAL");
                    beanTkt.QTY_ALL = rst.getInt("QTY_ALL");
                    beanTkt.TGROSAMOUN_ALL = rst.getDouble("TGROSAMOUN_ALL");

                    //TOTALEs
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totTGROSAMOUN_ACCOUNTED = totTGROSAMOUN_ACCOUNTED;
                    beanTkt.totTGROSAMOUN_PENDING = totTGROSAMOUN_PENDING;
                    beanTkt.totQTY_ACCOUNTED = totQTY_ACCOUNTED;
                    beanTkt.totQTY_PENDING = totQTY_PENDING;
                    beanTkt.totQTY_TOTAL = totQTY_TOTAL;
                    beanTkt.totQTY_ALL = totQTY_ALL;
                    beanTkt.totTGROSAMOUN_ALL = totTGROSAMOUN_ALL;
                    beanTkt.totQTY_DIFF = totQTY_DIFF;
                    beanTkt.totTGROSAMOUN_DIFF = totTGROSAMOUN_DIFF;

                    //DIFERENCIAs
                    beanTkt.QTY_DIFF = beanTkt.QTY_TOTAL - beanTkt.QTY_ALL;
                    beanTkt.TGROSAMOUN_DIFF = beanTkt.TGROSAMOUN - beanTkt.TGROSAMOUN_ALL;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX590SQP04417(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        double totTGROSAMOUN = 0;
        double SVFOPS = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "Tkt");
        hmDescReglas.put("2", "PNR");
        hmDescReglas.put("3", "CCard");
        hmDescReglas.put("4", "Manual");

        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "Pending");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04417(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_DATE_VALUE);
            cstmt.setString(4, filter.IN_STCONL);
            cstmt.setString(5, filter.IN_TDOC);
            cstmt.setString(6, filter.IN_PNR);
            cstmt.setString(7, filter.IN_COMPLEMENT);
            cstmt.setString(8, filter.BSUMDATE);
            cstmt.setString(9, filter.SCURRENCY);
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
                totTGROSAMOUN = rst.getDouble("TGROSAMOUN");
                SVFOPS = rst.getDouble("SVFOPS");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_DATE_VALUE = filter.IN_DATE_VALUE.trim();
                    beanTkt.IN_COMPLEMENT = filter.IN_COMPLEMENT.trim();

                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (beanTkt.TDOC.equals("S")) {
                        beanTkt.TDOC = "Sales";
                    }
                    if (beanTkt.TDOC.equals("R")) {
                        beanTkt.TDOC = "Refund";
                    }
                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.SVFOPS = rst.getDouble("SVFOPS");
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }

                    beanTkt.FREGLA = rst.getString("FREGLA").trim();
                    if (hmDescReglas.containsKey(rst.getString("FREGLA").trim())) {
                        beanTkt.descFREGLA = hmDescReglas.get(rst.getString("FREGLA").trim()).toString();
                    } else {
                        beanTkt.descFREGLA = rst.getString("FREGLA").trim();
                    }

                    beanTkt.QTYTKT = rst.getInt("QTYTKT");
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.DES_CERROR = rst.getString("DES_CERROR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.STCONL = rst.getString("STCONL").trim();
                    if (hmDescSTCONL.containsKey(rst.getString("STCONL").trim())) {
                        beanTkt.descSTCONL = hmDescSTCONL.get(rst.getString("STCONL").trim()).toString();
                    } else {
                        beanTkt.descSTCONL = rst.getString("STCONL").trim();
                    }
                    beanTkt.FCONTL = rst.getString("FCONTL").trim();
                    beanTkt.IDCONL = rst.getString("IDCONL").trim();
                    beanTkt.IDITEMS = rst.getString("IDITEMS").trim();
                    beanTkt.IDITEMT = rst.getString("IDITEMT").trim();
                    beanTkt.AREFNBR = rst.getString("AREFNBR").trim();

                    //TOTALEs
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.SVFOPS_TOTAL = SVFOPS;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX590SQP04418(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        double totSVFOPS = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "Tkt");
        hmDescReglas.put("2", "PNR");
        hmDescReglas.put("3", "CCard");
        hmDescReglas.put("4", "Manual");

        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04418(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE_VALUE);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_SPNR);
            cstmt.setString(5, filter.IN_ISREFNBR);
            cstmt.setString(6, filter.IN_BSUMDATE);
            cstmt.setString(7, filter.IN_FREGLA);
            cstmt.setString(8, filter.IN_SCARDN);
            cstmt.setString(9, filter.IN_SAUTHOC);
            cstmt.setString(10, filter.IDITEMS);
            cstmt.setString(11, filter.IDITEMT);
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
            while (rst.next()) {
                totSVFOPS = rst.getDouble("SVFOPS");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_DATE_VALUE = filter.IN_DATE_VALUE.trim();
                    beanTkt.IN_ISREFNBR = filter.IN_ISREFNBR.trim();
                    beanTkt.IN_SPNR = filter.IN_SPNR.trim();
                    beanTkt.IN_BSUMDATE = filter.IN_BSUMDATE.trim();

                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.TKT = rst.getString("TKT").trim();
                    beanTkt.SEQ = rst.getString("SEQ").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.SVFOPS = rst.getDouble("SVFOPS");
                    beanTkt.STCONL = rst.getString("STCONL").trim();
                    if (hmDescSTCONL.containsKey(rst.getString("STCONL").trim())) {
                        beanTkt.descSTCONL = hmDescSTCONL.get(rst.getString("STCONL").trim()).toString();
                    } else {
                        beanTkt.descSTCONL = rst.getString("STCONL").trim();
                    }
                    beanTkt.IDCON = rst.getString("IDCON").trim();
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.IDCONL = rst.getString("IDCONL").trim();
                    beanTkt.FCONTL = rst.getString("FCONTL").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }

                    //TOTALEs
                    beanTkt.totSVFOPS = totSVFOPS;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
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

        return lstTkts;
    }
    
    public List<A4183Filter> loadPX590SQP04464(A4183Filter filter) throws SQLException, Exception {

        List<A4183Filter> lstTkts = new ArrayList<A4183Filter>(0);
        A4183Filter beanTkt;
        
        double totA4183ACTIV = 0,totA4183PASIV = 0,totA4183ACTRV = 0,totA4183PASRV = 0;
       
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04464(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TKT.trim());
            cstmt.setString(3, filter.IN_AREFNBR.trim());
            cstmt.setInt(4, filter.page.PAGNUM);
            cstmt.setInt(5, filter.page.PAGROW);
            cstmt.setInt(6, filter.page.TOTPAG);
            cstmt.setInt(7, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(4);
            filter.page.PAGROW = cstmt.getInt(5);
            filter.page.TOTPAG = cstmt.getInt(6);
            filter.page.TOTROW = cstmt.getInt(7);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                    totA4183ACTIV = rst.getDouble("A4183ACTIV");        
                    totA4183PASIV = rst.getDouble("A4183PASIV");        
                    totA4183ACTRV = rst.getDouble("A4183ACTRV");        
                    totA4183PASRV = rst.getDouble("A4183PASRV");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4183Filter();
                   
                    beanTkt.TKT = filter.IN_TKT.trim();
                    beanTkt.IDCON = filter.IDCON.trim();
                    beanTkt.AREFNBR = filter.IN_AREFNBR.trim();
                    beanTkt.PAYDATE = filter.PAYDATE.trim();
                    beanTkt.BSUMDATE = filter.BSUMDATE.trim();
                    beanTkt.A4183TICKET = rst.getString("A4183CIA").trim()+rst.getString("A4183FORMA").trim()+rst.getString("A4183SERIE").trim();        
                    beanTkt.A4183MODO = rst.getString("A4183MODO").trim();        
                    beanTkt.A4183FUENT = rst.getString("A4183FUENT").trim();        
                    beanTkt.A4183SUBFU = rst.getString("A4183SUBFU").trim();        
                    beanTkt.A4183FP = rst.getString("A4183FP").trim();        
                    beanTkt.A4183CUPON = rst.getString("A4183CUPON").trim();        
                    beanTkt.A4183SEQ = rst.getString("A4183SEQ").trim();        
                    beanTkt.A4183FPRO = rst.getString("A4183FPRO").trim();        
                    beanTkt.A4183FCONT = rst.getString("A4183FCONT").trim();        
                    beanTkt.A4183CUENT = rst.getString("ACCOUNT").trim();        
                    beanTkt.A4183CUR = rst.getString("A4183CUR").trim();        
                    beanTkt.A4183ACTIV = rst.getDouble("A4183ACTIV");        
                    beanTkt.A4183PASIV = rst.getDouble("A4183PASIV");        
                    beanTkt.A4183ACTRV = rst.getDouble("A4183ACTRV");        
                    beanTkt.A4183PASRV = rst.getDouble("A4183PASRV");        
                    beanTkt.A4183TITU = rst.getString("A4183TITU").trim();        
                    beanTkt.A4183COPE = rst.getString("A4183COPE").trim();        
                    beanTkt.A4183PROV = rst.getString("A4183PROV").trim();        
                    beanTkt.A4183IDCON = rst.getString("A4183IDCON").trim();        
                    
                    beanTkt.totA4183ACTIV = totA4183ACTIV;        
                    beanTkt.totA4183PASIV = totA4183PASIV;        
                    beanTkt.totA4183ACTRV = totA4183ACTRV;        
                    beanTkt.totA4183PASRV = totA4183PASRV;
                    
                    lstTkts.add(beanTkt);
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
        return lstTkts;
    }

}
