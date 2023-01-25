/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A3949Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class SendingcontrolReportFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public SendingcontrolReportFormDAO() {

    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SendingcontrolReportFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3949Filter> searchDowloadFiles(A3949Filter filter) throws SQLException, Exception {
        List<A3949Filter> lstRtn = new ArrayList<A3949Filter>(0);
        A3949Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP03861(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_STATUS);
            cstmt01.setString(6, filter.IN_COUNTRY);
            cstmt01.setString(7, filter.IN_TYPE);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3949Filter();
                objRtn.A3949CCUST = rs01.getString("A3949CCUST");
                objRtn.A3949PAIS = rs01.getString("A3949PAIS");
                objRtn.A3949FDATE = rs01.getString("A3949FDATE");
                objRtn.A3949SEQ = rs01.getInt("A3949SEQ");
                objRtn.A3949COUNT2 = rs01.getInt("A3949COUNT2");
                objRtn.A3949PERIO = rs01.getString("A3949PERIO");
                objRtn.A3949COUNT = rs01.getString("A3949COUNT");
                objRtn.A3949ESTAD = rs01.getString("A3949ESTAD");
                objRtn.A3949DESC = rs01.getString("A3949DESC");
                objRtn.A3949FREGI = rs01.getString("A3949FREGI");
                objRtn.A3949PERIO = rs01.getString("A3949PERIO");
                 objRtn.A3949TYPE = rs01.getString("A3949TYPE");
                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public List<A3949Filter> SearchDebitosDetail(A3949Filter filter) throws SQLException, Exception {
        List<A3949Filter> lstRtn = new ArrayList<A3949Filter>(0);
        A3949Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP03861(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_STATUS);
            cstmt01.setString(6, filter.IN_COUNTRY);
             cstmt01.setString(7, filter.IN_TYPE);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3949Filter();
                objRtn.A3949CCUST = rs01.getString("A3949CCUST");
                objRtn.A3949PAIS = rs01.getString("A3949PAIS");
                objRtn.A3949FDATE = rs01.getString("A3949FDATE");
                objRtn.A3949SEQ = rs01.getInt("A3949SEQ");
                objRtn.A3949PERIO = rs01.getString("A3949PERIO");
                objRtn.A3949COUNT = rs01.getString("A3949COUNT");
                objRtn.A3949NOMBR = rs01.getString("A3949NOMBR");
                objRtn.A3949ESTAD = rs01.getString("A3949ESTAD");
                objRtn.A3949TYPE = rs01.getString("A3949TYPE");
                 objRtn.A3949DESC = rs01.getString("A3949DESC");

                objRtn.A3949REGIS = rs01.getString("A3949REGIS");
                objRtn.A3949FREGI = rs01.getString("A3949FREGI");
                objRtn.A3949HREGI = rs01.getString("A3949HREGI");
                objRtn.A3949COUNT2 = rs01.getInt("A3949COUNT2");
                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

}
