package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2353Filter;
import org.apache.log4j.Logger;

public class ProcessControlDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ProcessControlDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ProcessControlDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2353Filter> loadPX285SQP05105(A2353Filter filter) throws SQLException, Exception {

        List<A2353Filter> lstData = new ArrayList<A2353Filter>(0);
        A2353Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05105(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST.trim());
            cstmt.setString(2, filter.IN_FILE.trim());
            cstmt.setString(3, filter.IN_PRDA.trim());
            cstmt.setString(4, filter.IN_DATE.trim());
            cstmt.setString(5, filter.IN_CORE.trim());
            cstmt.setString(6, filter.IN_FUENTE.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A2353Filter();
                bean.TRAMA = rst.getString("TRAMA").trim();
                bean.COREP = rst.getString("COREP").trim();
                lstData.add(bean);
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

        return lstData;
    }

}
