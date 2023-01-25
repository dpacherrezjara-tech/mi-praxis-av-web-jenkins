package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1782Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class HardBlockReportDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public HardBlockReportDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1782Filter> loadPX086S01A1782(A1782Filter filter) throws SQLException, Exception {

        List<A1782Filter> lstRtn = new ArrayList<>(0);
        A1782Filter objRtn;
        long totPAX = 0;
        double totAMTMX = 0, totAMTUS = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX086S01A1782(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
            cs.setString(4, filter.IN_HB_CIA);
            cs.setString(5, filter.IN_REV_TYPE);
            cs.setString(6, Functions.getFechaActual());
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                totPAX = rst.getLong("PAX");
                totAMTMX = rst.getDouble("AMTMX");
                totAMTUS = rst.getDouble("AMTUS");
            }
//            try {
//                rst.close();
//            } catch (SQLException e) {
//                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//            }

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                int pos = 0;
                while (rst.next()) {
                    pos++;
                    //FUENTE,MENSA
                    objRtn = new A1782Filter();
                    objRtn.RN = pos;
                    objRtn.PERIOD = rst.getString("PERIOD");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.PERIOD);
                    objRtn.CARRIER = rst.getString("CARRIER");
                    objRtn.CIAHB = rst.getString("CIAHB");
                    objRtn.REVFLAG = rst.getString("REVFLAG");
                    if (objRtn.REVFLAG.equals("1")) {
                        objRtn.SALESTYPE = "AM";
                    } else {
                        objRtn.SALESTYPE = "OAL";
                    }
                    objRtn.PAX = rst.getInt("PAX");
                    objRtn.AMTMX = rst.getDouble("AMTMX");
                    objRtn.AMTUS = rst.getDouble("AMTUS");
                    objRtn.totPAX = totPAX;
                    objRtn.totAMTMX = totAMTMX;
                    objRtn.totAMTUS = totAMTUS;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public List<A1782Filter> loadPX086S02A1782(A1782Filter filter) throws SQLException, Exception {

        List<A1782Filter> lstRtn = new ArrayList<>(0);
        A1782Filter objRtn;
        long totPAX = 0, totFLIGHTS = 0;
        double totAMTMX = 0, totAMTUS = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX086S02A1782(?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.PERIOD);
            cs.setString(3, filter.REVFLAG);
            cs.setString(4, filter.CIAHB);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                totFLIGHTS = rst.getLong("FLIGHTS");
                totPAX = rst.getLong("PAX");
                totAMTMX = rst.getDouble("AMTMX");
                totAMTUS = rst.getDouble("AMTUS");
            }
//            try {
//                rst.close();
//            } catch (SQLException e) {
//                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//            }

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                int pos = 0;
                while (rst.next()) {
                    pos++;
                    //FUENTE,MENSA
                    objRtn = new A1782Filter();
                    objRtn.RN = pos;
                    objRtn.PERIOD = rst.getString("PERIOD");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.PERIOD);
                    objRtn.CARRIER = rst.getString("CARRIER");
                    objRtn.REVFLAG = rst.getString("REVFLAG");
                    if (objRtn.REVFLAG.equals("1")) {
                        objRtn.SALESTYPE = "AM";
                    } else {
                        objRtn.SALESTYPE = "OAL";
                    }
                    objRtn.CIAHB = rst.getString("CIAHB");
                    objRtn.FLIGHTS = rst.getInt("FLIGHTS");
                    objRtn.PAX = rst.getInt("PAX");
                    objRtn.ORIG = rst.getString("ORIG");
                    objRtn.DEST = rst.getString("DEST");
                    objRtn.strDesOrig = rst.getString("DESORIG");
                    objRtn.strDesDest = rst.getString("DESDEST");
                    objRtn.AMTMX = rst.getDouble("AMTMX");
                    objRtn.AMTUS = rst.getDouble("AMTUS");
                    objRtn.totFLIGHTS = totFLIGHTS;
                    objRtn.totPAX = totPAX;
                    objRtn.totAMTMX = totAMTMX;
                    objRtn.totAMTUS = totAMTUS;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public List<A1782Filter> loadPX086S03A1783(A1782Filter filter) throws SQLException, Exception {

        List<A1782Filter> lstRtn = new ArrayList<>(0);
        A1782Filter objRtn;
        long totPAX = 0;
        double totAMTMX = 0, totAMTUS = 0;

        String strSQL = "{CALL " + session.getMainLibrary() + ".PX086S03A1783(?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.PERIOD);
            cs.setString(3, filter.ORIG);
            cs.setString(4, filter.DEST);
            cs.setString(5, filter.CIAHB);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                totPAX = rst.getLong("PAX");
                totAMTMX = rst.getDouble("AMTMX");
                totAMTUS = rst.getDouble("AMTUS");
            }
//            try {
//                rst.close();
//            } catch (SQLException e) {
//                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//            }

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                int pos = 0;
                while (rst.next()) {
                    pos++;
                    //FUENTE,MENSA
                    objRtn = new A1782Filter();
                    objRtn.RN = pos;
                    objRtn.PERIOD = rst.getString("PERIOD");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.PERIOD);
                    objRtn.CARRIER = rst.getString("CARRIER");
                    objRtn.REVFLAG = rst.getString("REVFLAG");
                    if (objRtn.REVFLAG.equals("1")) {
                        objRtn.SALESTYPE = "AM";
                    } else {
                        objRtn.SALESTYPE = "OAL";
                    }
                    objRtn.CIAHB = rst.getString("CIAHB");
                    objRtn.PAX = rst.getInt("PAX");
                    objRtn.ORIG = rst.getString("ORIG");
                    objRtn.DEST = rst.getString("DEST");
                    objRtn.strDesOrig = filter.strDesOrig;
                    objRtn.strDesDest = filter.strDesDest;
                    objRtn.NFLIGHT = rst.getString("NFLIGHT");
                    objRtn.AMTMX = rst.getDouble("AMTMX");
                    objRtn.AMTUS = rst.getDouble("AMTUS");
                    objRtn.totPAX = totPAX;
                    objRtn.totAMTMX = totAMTMX;
                    objRtn.totAMTUS = totAMTUS;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public List<A1782Filter> loadPX086S04A1783(A1782Filter filter) throws SQLException, Exception {

        List<A1782Filter> lstRtn = new ArrayList<>(0);
        A1782Filter objRtn;
        long totPAX = 0;
        double totAMTMX = 0, totAMTUS = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX086S04A1783(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.PERIOD);
            cs.setString(3, filter.ORIG);
            cs.setString(4, filter.DEST);
            cs.setString(5, filter.CIAHB);
            cs.setString(6, filter.NFLIGHT);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                totPAX = rst.getLong("PAX");
                totAMTMX = rst.getDouble("AMTMX");
                totAMTUS = rst.getDouble("AMTUS");
            }
//            try {
//                rst.close();
//            } catch (SQLException e) {
//                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//            }

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                int pos = 0;
                while (rst.next()) {
                    pos++;
                    //FUENTE,MENSA
                    objRtn = new A1782Filter();
                    objRtn.RN = pos;
                    objRtn.PERIOD = rst.getString("PERIOD");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.PERIOD);
                    objRtn.CARRIER = rst.getString("CARRIER");
                    objRtn.REVFLAG = rst.getString("REVFLAG");
                    if (objRtn.REVFLAG.equals("1")) {
                        objRtn.SALESTYPE = "AM";
                    } else {
                        objRtn.SALESTYPE = "OAL";
                    }
                    objRtn.CIAHB = rst.getString("CIAHB");
                    objRtn.PAX = rst.getInt("PAX");
                    objRtn.ORIG = rst.getString("ORIG");
                    objRtn.DEST = rst.getString("DEST");
                    objRtn.strDesOrig = filter.strDesOrig;
                    objRtn.strDesDest = filter.strDesDest;
                    objRtn.NFLIGHT = filter.NFLIGHT;
                    objRtn.CCIA = rst.getString("CCIA");
                    objRtn.FORMA = rst.getString("FORMA");
                    objRtn.SERIE = rst.getString("SERIE");
                    objRtn.CUPON = rst.getString("CUPON");
                    objRtn.FVTA = rst.getString("FVTA");
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FVTA);
                    objRtn.DFLIGHT = rst.getString("DFLIGHT");
                    objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.AMTMX = rst.getDouble("AMTMX");
                    objRtn.AMTUS = rst.getDouble("AMTUS");
                    objRtn.totPAX = totPAX;
                    objRtn.totAMTMX = totAMTMX;
                    objRtn.totAMTUS = totAMTUS;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
