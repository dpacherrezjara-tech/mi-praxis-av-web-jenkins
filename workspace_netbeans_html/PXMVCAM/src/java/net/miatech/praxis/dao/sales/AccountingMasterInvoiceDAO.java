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
import net.miatech.beans.SQP02299Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class AccountingMasterInvoiceDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();
    String SQLCLL01 = "";

    public AccountingMasterInvoiceDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingMasterInvoiceDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP02299Filter> searchMaster(SQP02299Filter filter) throws SQLException, Exception {
        List<SQP02299Filter> lstRtn = new ArrayList<SQP02299Filter>(0);
        SQP02299Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02299(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.VP_CUENTA);
            cstmt01.setString(3, filter.VP_SUBCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP02299Filter();

                objRtn.CUENTA = rs01.getString("CUENTA").trim();
                objRtn.RECORD = rs01.getString("RECORD").trim();
                objRtn.IVA = rs01.getString("IVA").trim();
                objRtn.TCTA = rs01.getString("TCTA").trim();
                objRtn.OAL = rs01.getString("OAL").trim();
                objRtn.FACT = rs01.getString("FACT").trim();
                objRtn.DRFIC = rs01.getString("DRFIC").trim();
                objRtn.NVTA = rs01.getString("NVTA").trim();
                objRtn.INDAGRUP = rs01.getString("INDAGRUP").trim();
                objRtn.DESCAGRUP = rs01.getString("DESCAGRUP").trim();
                objRtn.DESCU = rs01.getString("DESCU").trim();
                objRtn.CUENT = rs01.getString("CUENT").trim();
                objRtn.SUBCU = rs01.getString("SUBCU").trim();

                objRtn.REGIS = rs01.getString("A3032REGIS").trim();
                objRtn.FREGI = rs01.getString("A3032FREGI").trim();
                objRtn.HREGI = rs01.getString("A3032HREGI").trim();
                objRtn.REVIS = rs01.getString("A3032REVIS").trim();
                objRtn.FREVI = rs01.getString("A3032FREVI").trim();
                objRtn.HREVI = rs01.getString("A3032HREVI").trim();

                lstRtn.add(objRtn);

            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

    public String setMasterInvoice(SQP02299Filter filter) throws SQLException, Exception {

        String result = "";

        CallableStatement cstmt = null;
        ResultSet rst = null;

        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02306(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.VP_OPCION);
            cstmt.setString(2, filter.CUENT);
            cstmt.setString(3, filter.SUBCU);
            cstmt.setString(4, filter.RECORD);
            cstmt.setString(5, filter.IVA);
            cstmt.setString(6, filter.TCTA);
            cstmt.setString(7, filter.OAL);
            cstmt.setString(8, filter.FACT);
            cstmt.setString(9, filter.DRFIC);
            cstmt.setString(10, filter.NVTA);
            cstmt.setString(11, filter.INDAGRUP);
            cstmt.setString(12, filter.DESCAGRUP);
            cstmt.setString(13, filter.DESCU);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                result = rst.getString("RESULTADO").trim();

            }
            rst.close();

        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            result = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            result = e.getMessage();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    result = e.getMessage();
                }
            }
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    result = e.getMessage();
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return result;
    }

    public List<SQP02299Filter> searchMasterFG(SQP02299Filter filter) throws SQLException, Exception {

        List<SQP02299Filter> lstData = new ArrayList<SQP02299Filter>(0);
        SQP02299Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        int count = 0;
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02299(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.VP_OPCION);
            cstmt.setString(2, filter.VP_CUENTA);
            cstmt.setString(3, filter.VP_SUBCU);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new SQP02299Filter();
                bean.INDAGRUP = rst.getString("A3335ID").trim();
                bean.DESCAGRUP = rst.getString("A3335AGRUP").trim();
                bean.REGIS = rst.getString("A3032REGIS").trim();
                bean.FREGI = rst.getString("A3032FREGI").trim();
                bean.HREGI = rst.getString("A3032HREGI").trim();
                bean.REVIS = rst.getString("A3032REVIS").trim();
                bean.FREVI = rst.getString("A3032FREVI").trim();
                bean.HREVI = rst.getString("A3032HREVI").trim();

                lstData.add(bean);
            }
            rst.close();

        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public String setMasterInvoiceFG(SQP02299Filter filter) throws SQLException, Exception {

        String result = "";

        CallableStatement cstmt = null;
        ResultSet rst = null;

        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02406(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.VP_OPCION);
            cstmt.setString(2, filter.DESCU);
            cstmt.setString(3, filter.DESCAGRUP);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                result = rst.getString("RESULTADO").trim();

            }
            rst.close();

        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return result;
    }

}
