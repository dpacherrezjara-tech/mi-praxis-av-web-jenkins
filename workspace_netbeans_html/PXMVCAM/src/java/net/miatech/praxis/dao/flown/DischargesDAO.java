package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1785Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class DischargesDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public DischargesDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A1785Filter> loadPX100S02A1785(A1692Filter filter) throws SQLException, Exception {

        List<A1785Filter> lstRtn = new ArrayList<>(0);
        A1785Filter objRtn;
        long totQTYCPNS = 0;
        double totAMNCPNS = 0;

        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");

        strSQL = "{CALL " + session.getMainLibrary() + ".PX100S02A1785(?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.yearFrom.trim());
            cs.setString(3, filter.monthFrom.trim());
            cs.setString(4, filter.yearTo.trim());
            cs.setString(5, filter.monthTo.trim());
            cs.setString(6, filter.TIPOC);
            cs.setInt(7, filter.IN_TIPOFECHA);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                totQTYCPNS = rst.getLong("QTYCPNS");
                totAMNCPNS = rst.getDouble("AMNCPNS");
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
                    objRtn = new A1785Filter();
                    objRtn.RN = pos;
                    objRtn.ANOVTA = rst.getString("ANOVTA");
                    objRtn.MESVTA = rst.getString("MESVTA");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.ANOVTA + objRtn.MESVTA);
                    objRtn.TIPOCA = rst.getString("TIPOCA");
                    if (objRtn.TIPOCA.equals("1")) {
                        objRtn.strDesTIPO = "Expired";
                    } else if (objRtn.TIPOCA.equals("2")) {
                        objRtn.strDesTIPO = "Ethnics";
                    } else {
                        objRtn.strDesTIPO = "No Refund";
                    }
                    objRtn.CURCPNS = rst.getString("CURCPNS");
                    objRtn.QTYCPNS = rst.getInt("QTYCPNS");
                    objRtn.AMNCPNS = rst.getDouble("AMNCPNS");

                    objRtn.totQTYCPNS = totQTYCPNS;
                    objRtn.totAMNCPNS = totAMNCPNS;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public List<A1785Filter> loadPX100S03A1785(A1785Filter filter) throws SQLException, Exception {

        List<A1785Filter> lstRtn = new ArrayList<A1785Filter>(0);
        A1785Filter objRtn;
        long totQTYCPNS = 0;
        double totAMNCPNS = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX100S03A1785(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.ANOVTA);
            cstmt01.setString(3, filter.MESVTA);
            cstmt01.setString(4, filter.CURCPNS);
            cstmt01.setString(5, filter.TIPOCA);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totQTYCPNS = rs01.getLong("QTYCPNS");
                totAMNCPNS = rs01.getDouble("AMNCPNS");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int pos = 0;
                while (rs01.next()) {
                    pos++;
                    objRtn = new A1785Filter();
                    objRtn.RN = pos;
                    objRtn.ANOVTA = rs01.getString("ANOVTA");
                    objRtn.TIPOCA = rs01.getString("TIPOCA");
                    objRtn.MESVTA = rs01.getString("MESVTA");
                    objRtn.ZONADES = rs01.getString("ZONADES");
                    objRtn.strDesDEST = rs01.getString("DESDEST");
                    if (objRtn.strDesDEST == null || objRtn.strDesDEST.trim().equals("")) {
                        objRtn.strDesDEST = Functions.getNombreZonas(objRtn.ZONADES);
                    }
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.ANOVTA + objRtn.MESVTA);
                    objRtn.CURCPNS = rs01.getString("CURCPNS");
                    objRtn.QTYCPNS = rs01.getInt("QTYCPNS");
                    objRtn.AMNCPNS = rs01.getDouble("AMNCPNS");

                    objRtn.totQTYCPNS = totQTYCPNS;
                    objRtn.totAMNCPNS = totAMNCPNS;

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

    public List<A1785Filter> loadPX100S04A1785(A1785Filter filter) throws SQLException, Exception {

        List<A1785Filter> lstRtn = new ArrayList<A1785Filter>(0);
        A1785Filter objRtn;
        long totQTYCPNS = 0;
        double totAMNCPNS = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX100S04A1785(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.ANOVTA);
            cstmt01.setString(3, filter.MESVTA);
            cstmt01.setString(4, filter.CURCPNS);
            cstmt01.setString(5, filter.ZONADES);
            cstmt01.setString(6, filter.TIPOCA);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totQTYCPNS = rs01.getLong("QTYCPNS");
                totAMNCPNS = rs01.getDouble("AMNCPNS");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int pos = 0;
                while (rs01.next()) {
                    pos++;
                    objRtn = new A1785Filter();
                    objRtn.RN = pos;
                    objRtn.ANOVTA = rs01.getString("ANOVTA");
                    objRtn.MESVTA = rs01.getString("MESVTA");
                    objRtn.FVUELO = rs01.getString("FVUELO");
                    objRtn.TIPOCA = rs01.getString("TIPOCA");
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FVUELO);
                    objRtn.ZONADES = rs01.getString("ZONADES");
                    objRtn.strDesDEST = rs01.getString("DESDEST");
                    objRtn.FROMCITY = rs01.getString("FROMCITY");
                    objRtn.strDesORIG = rs01.getString("DESORIG");
                    objRtn.TOCITY = rs01.getString("TOCITY");
                    objRtn.strDesDEST = rs01.getString("DESDEST");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.ANOVTA + objRtn.MESVTA);
                    objRtn.CURCPNS = rs01.getString("CURCPNS");
                    objRtn.QTYCPNS = rs01.getInt("QTYCPNS");
                    objRtn.AMNCPNS = rs01.getDouble("AMNCPNS");
                    objRtn.strFormatDate3 = filter.strDesDEST;

                    objRtn.totQTYCPNS = totQTYCPNS;
                    objRtn.totAMNCPNS = totAMNCPNS;

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
