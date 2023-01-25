/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP01362Filter;
import net.miatech.beans.SaleAudit.SQP01600Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class DeterminationCommissionBackDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public DeterminationCommissionBackDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DeterminationCommissionBackDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A051> getListCountry() throws SQLException, Exception {
        List<A051> lstRtn = new ArrayList<>(0);
        A051 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.PX128S01A051()}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            objRtn = new A051();
            objRtn.A051KEY2 = "";
            objRtn.A051DESCR1 = "All";
            lstRtn.add(objRtn);

            while (rs01.next()) {
                objRtn = new A051();
                objRtn.A051KEY2 = rs01.getString("A051KEY2").trim();
                objRtn.A051DESCR1 = rs01.getString("A051DESCR1").trim();
                objRtn.A051DESCR1 = objRtn.A051KEY2 + " - " + objRtn.A051DESCR1;
                lstRtn.add(objRtn);
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

    public List<A051> getListSchema(SQP01362Filter filter) throws SQLException, Exception {
        List<A051> lstRtn = new ArrayList<A051>(0);
        A051 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXCOMM.SQP01680(?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_CIA);
            cstmt01.setString(2, filter.A2845INDAC);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A051();
                objRtn.A051KEY2 = rs01.getString("CODE").trim();
                objRtn.A051DESCR1 = rs01.getString("A3051TITLE").trim();

                lstRtn.add(objRtn);
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

    public List<SQP01600Filter> getListTypeProccessCMB(SQP01600Filter filter) throws SQLException, Exception {
        List<SQP01600Filter> lstRtn = new ArrayList<>(0);
        SQP01600Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXCOMM.SQP01600(?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_CIA);
            cstmt01.setString(2, filter.VP_CODAC);
            cstmt01.setString(3, filter.VP_INDAC);
            cstmt01.setString(4, filter.VP_VRSAC);
            cstmt01.setString(5, filter.VP_NAME);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new SQP01600Filter();
                objRtn.A3034CDESQ = rs01.getString("A3034CDESQ").trim();
                objRtn.A3034NAME = rs01.getString("A3034NAME").trim();
                objRtn.A3034DESCP = rs01.getString("A3034DESCP").trim();
                objRtn.A3034STAT = rs01.getString("A3034STAT").trim();
                lstRtn.add(objRtn);
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
