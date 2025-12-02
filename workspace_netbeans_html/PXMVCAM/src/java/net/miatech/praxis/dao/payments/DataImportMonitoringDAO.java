package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.MPFER90;
import org.apache.log4j.Logger;

public class DataImportMonitoringDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public DataImportMonitoringDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DataImportMonitoringDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        this.session = ss;
    }

    public List<MPFER90> listProcesses(MPFER90 filter) throws SQLException, Exception {

        List<MPFER90> listaData = new ArrayList<>();
        MPFER90 bean;

        String SQL = "{CALL PRAXISMP.MPS388(?,?,?)}";
        Connection cnx = null;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            cstmt.setString(1, filter.IN_PROCPAIS.trim());
            cstmt.setString(2, filter.IN_DATETYPE.trim());
            cstmt.setString(3, filter.IN_PROCDATE.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst != null && rst.next()) {
                bean = new MPFER90();

                bean.PROCID = rst.getString("PROCID");
                bean.PROCNAME = rst.getString("PROCNAME");
                bean.PROCDESC = rst.getString("DESCRIP");
                bean.PROCSTATUS = rst.getString("PROCSTAT");
                bean.PROCPAIS = rst.getString("PROCPAIS");
                bean.PROCMESSAG = rst.getString("MENSA");
                bean.PROCFILE = rst.getString("PROCFILE");
                bean.PROCDATE = rst.getString("PROCDATE");
                bean.PROCINI = rst.getString("PROCINI");
                bean.PROCFIN = rst.getString("PROCFIN");
                bean.CPROGRAM = rst.getString("CPROGRAM");

                listaData.add(bean);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException ignored) {
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException ignored) {
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return listaData;

    }

//    UPS
    public List<MPFER90> getListMonitoringRPA(MPFER90 filter) throws SQLException, Exception {

        List<MPFER90> listaData = new ArrayList<>();
        MPFER90 bean;

        String SQL = "{CALL PRAXISMP.MPS417(?)}";
        Connection cnx = null;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.setString(1, filter.IN_CCUST.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst != null && rst.next()) {
                bean = new MPFER90();
                bean.RN = rst.getString("RN");
                bean.CCUST = rst.getString("CCUST");
                bean.ROBOTNAME = rst.getString("ROBOTNAME");
                bean.FREQTYPE = rst.getString("FREQTYPE");
                bean.FREQDAYS = rst.getString("FREQDAYS");
                bean.TIMEEXEC = rst.getString("TIMEEXEC");
                bean.STATUSRO = rst.getString("STATUSRO");
                bean.LASTEXECD = rst.getString("LAST_EXECD");
                bean.LASTEXECH = rst.getString("LAST_EXECH");
                bean.LASTSTATR = rst.getString("LASTSTATR");
                bean.LASTMESSA = rst.getString("LASTMESSA");
                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = rst.getString("HOCR");
                bean.PGMCR = rst.getString("PGMCR");
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = rst.getString("HOUP");
                bean.PGMUP = rst.getString("PGMUP");
                listaData.add(bean);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException ignored) {
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException ignored) {
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return listaData;
    }

    public String loadPX265SQP00661(MPFER90 filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS418(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, filter.IN_CLIENT.trim());
            cstmt.setString(3, filter.IN_NAME.trim());
            cstmt.setString(4, filter.IN_FREQTYPE.trim());
            cstmt.setString(5, filter.IN_FREQDAYS.trim());
            cstmt.setString(6, filter.IN_TIMEEXEC.trim());
            cstmt.setString(7, filter.IN_STATUSRO.trim());
            cstmt.setString(8, filter.IN_CRON.trim());
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
