/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.interline;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A094;
import net.miatech.praxis.A096;
import net.miatech.praxis.interline.filter.A508Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class InvoiceConciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InvoiceConciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InvoiceConciliationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A508Filter> loadPX197S01A508(A508Filter filter) throws SQLException, Exception {

        List<A508Filter> lstRtn = new ArrayList<>(0);
        A508Filter objRtn;
        double A508PASJP = 0, A508UATPP = 0, A508CARGOP = 0, A508MISCP = 0, A508NETOP = 0, A508PASJC = 0,
                A508UATPC = 0, A508CARGOC = 0, A508MISCC = 0, A508NETOC = 0, A508BALANC = 0, ISIDEC = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00147(?,?,?,?,?,?,?,?,?)}";
        // String SQLCLL01 = "{CALL LIBSAP05.SQP00147(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PERIOD);
            cstmt01.setString(5, filter.A508CAMARA);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                ISIDEC = rs01.getDouble("ISIDEC");

                if (!filter.A508CAMARA.equals("B")) {
                    A508PASJP = rs01.getDouble("A508PASJP");
                    A508UATPP = rs01.getDouble("A508UATPP");
                    A508CARGOP = rs01.getDouble("A508CARGOP");
                    A508MISCP = rs01.getDouble("A508MISCP");
                    A508NETOP = rs01.getDouble("A508NETOP");
                    A508PASJC = rs01.getDouble("A508PASJC");
                    A508UATPC = rs01.getDouble("A508UATPC");
                    A508CARGOC = rs01.getDouble("A508CARGOC");
                    A508MISCC = rs01.getDouble("A508MISCC");
                    A508NETOC = rs01.getDouble("A508NETOC");
                    A508BALANC = rs01.getDouble("A508BALANC");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A508Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PERIOD = filter.IN_PERIOD;
                    objRtn.A508CAMARA = filter.A508CAMARA;

                    objRtn.A508FCLEAR = rs01.getString("A508FCLEAR");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A508FCLEAR);
                    objRtn.A508PERIOD = rs01.getString("A508PERIOD");
                    objRtn.A508MNRCD = rs01.getString("A508MNRCD");

                    objRtn.ISIDEC = rs01.getDouble("ISIDEC");
                    objRtn.totISIDEC = ISIDEC;

                    if (!filter.A508CAMARA.equals("B")) {
                        objRtn.A508PASJP = rs01.getDouble("A508PASJP");
                        objRtn.A508UATPP = rs01.getDouble("A508UATPP");
                        objRtn.A508CARGOP = rs01.getDouble("A508CARGOP");
                        objRtn.A508MISCP = rs01.getDouble("A508MISCP");
                        objRtn.A508NETOP = rs01.getDouble("A508NETOP");
                        objRtn.A508PASJC = rs01.getDouble("A508PASJC");
                        objRtn.A508UATPC = rs01.getDouble("A508UATPC");
                        objRtn.A508CARGOC = rs01.getDouble("A508CARGOC");
                        objRtn.A508MISCC = rs01.getDouble("A508MISCC");
                        objRtn.A508NETOC = rs01.getDouble("A508NETOC");
                        objRtn.A508BALANC = rs01.getDouble("A508BALANC");

                        objRtn.totA508PASJP = A508PASJP;
                        objRtn.totA508UATPP = A508UATPP;
                        objRtn.totA508CARGOP = A508CARGOP;
                        objRtn.totA508MISCP = A508MISCP;
                        objRtn.totA508NETOP = A508NETOP;
                        objRtn.totA508PASJC = A508PASJC;
                        objRtn.totA508UATPC = A508UATPC;
                        objRtn.totA508CARGOC = A508CARGOC;
                        objRtn.totA508MISCC = A508MISCC;
                        objRtn.totA508NETOC = A508NETOC;
                        objRtn.totA508BALANC = A508BALANC;
                    }

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
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

        return lstRtn;
    }

    public List<A094> loadPX197S02A094(A508Filter filter) throws SQLException, Exception {

        List<A094> lstRtn = new ArrayList<>(0);
        A094 objRtn;
        int A094PASJC = 0, A094PASJP = 0, A094UATPC = 0, A094UATPP = 0, A094CARGOC = 0, A094CARGOP = 0, A094MISCC = 0, A094MISCP = 0, A094NETOC = 0, A094NETOP = 0;
        double ISIDEC = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00148(?,?,?,?,?,?,?,?)}";
        // String SQLCLL01 = "{CALL LIBSAP05.SQP00148(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A508FCLEAR);
            cstmt01.setString(3, filter.A508PERIOD);
            cstmt01.setString(4, filter.A508CAMARA);
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

                ISIDEC = rs01.getDouble("ISIDEC");

                if (!filter.A508CAMARA.equals("B")) {
                    A094PASJC = rs01.getInt("A094PASJC");
                    A094PASJP = rs01.getInt("A094PASJP");
                    A094UATPC = rs01.getInt("A094UATPC");
                    A094UATPP = rs01.getInt("A094UATPP");
                    A094CARGOC = rs01.getInt("A094CARGOC");
                    A094CARGOP = rs01.getInt("A094CARGOP");
                    A094MISCC = rs01.getInt("A094MISCC");
                    A094MISCP = rs01.getInt("A094MISCP");
                    A094NETOC = rs01.getInt("A094NETOC");
                    A094NETOP = rs01.getInt("A094NETOP");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A094();
                    objRtn.A094FCLEAR = filter.A508FCLEAR;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.A094PERIOD = filter.A508PERIOD;
                    objRtn.A094CIA = rs01.getString("A094CIA");
                    //objRtn.strDescripcion = rs01.getString("DES_CIA");
                    objRtn.ISIDEC = rs01.getDouble("ISIDEC");
                    objRtn.totISIDEC = ISIDEC;

                    if (!filter.A508CAMARA.equals("B")) {
                        objRtn.strDescripcion = rs01.getString("DES_CIA");
                        objRtn.A094PASJC = rs01.getInt("A094PASJC");
                        objRtn.A094PASJP = rs01.getInt("A094PASJP");
                        objRtn.A094UATPC = rs01.getInt("A094UATPC");
                        objRtn.A094UATPP = rs01.getInt("A094UATPP");
                        objRtn.A094CARGOC = rs01.getInt("A094CARGOC");
                        objRtn.A094CARGOP = rs01.getInt("A094CARGOP");
                        objRtn.A094MISCC = rs01.getInt("A094MISCC");
                        objRtn.A094MISCP = rs01.getInt("A094MISCP");
                        objRtn.A094NETOC = rs01.getInt("A094NETOC");
                        objRtn.A094NETOP = rs01.getInt("A094NETOP");

                        objRtn.totA094PASJC = A094PASJC;
                        objRtn.totA094PASJP = A094PASJP;
                        objRtn.totA094UATPC = A094UATPC;
                        objRtn.totA094UATPP = A094UATPP;
                        objRtn.totA094CARGOC = A094CARGOC;
                        objRtn.totA094CARGOP = A094CARGOP;
                        objRtn.totA094MISCC = A094MISCC;
                        objRtn.totA094MISCP = A094MISCP;
                        objRtn.totA094NETOC = A094NETOC;
                        objRtn.totA094NETOP = A094NETOP;
                    }

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
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

    public List<A096> loadPX197S03A096(A094 filter) throws SQLException, Exception {

        List<A096> lstRtn = new ArrayList<>(0);
        A096 objRtn;
        double A096TOTAL = 0, A096ISC = 0, A096UATP = 0, A096OTROS = 0, A096TAX = 0, A096NETO = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00150_GG(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A094FCLEAR);
            cstmt01.setString(3, filter.A094PERIOD);
            cstmt01.setString(4, filter.A094CIA);
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

                A096TOTAL = rs01.getDouble("A096TOTAL");
                A096ISC = rs01.getDouble("A096ISC");
                A096UATP = rs01.getDouble("A096UATP");
                A096OTROS = rs01.getDouble("A096OTROS");
                A096TAX = rs01.getDouble("A096TAX");
                A096NETO = rs01.getDouble("A096NETO");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A096();
                    objRtn.A096FCLEAR = filter.A094FCLEAR;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.A096PERIOD = filter.A094PERIOD;
                    objRtn.A096CIA = filter.A094CIA;
                    objRtn.strDescripcion = filter.strDescripcion;
                    objRtn.A096TUSO = rs01.getString("A096TUSO");
                    objRtn.strDescripcion2 = rs01.getString("DES_TUSO");
                    objRtn.A096NDOC = rs01.getString("A096NDOC");
                    objRtn.A096TOTAL = rs01.getDouble("A096TOTAL");
                    objRtn.A096ISC = rs01.getDouble("A096ISC");
                    objRtn.A096UATP = rs01.getDouble("A096UATP");
                    objRtn.A096OTROS = rs01.getDouble("A096OTROS");
                    objRtn.A096TAX = rs01.getDouble("A096TAX");
                    objRtn.A096NETO = rs01.getDouble("A096NETO");

                    objRtn.totA096TOTAL = A096TOTAL;
                    objRtn.totA096ISC = A096ISC;
                    objRtn.totA096UATP = A096UATP;
                    objRtn.totA096OTROS = A096OTROS;
                    objRtn.totA096TAX = A096TAX;
                    objRtn.totA096NETO = A096NETO;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.getMessage();
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
}
