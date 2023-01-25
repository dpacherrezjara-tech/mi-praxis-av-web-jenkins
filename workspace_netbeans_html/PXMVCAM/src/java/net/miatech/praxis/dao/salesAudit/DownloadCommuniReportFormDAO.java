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
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.SaleAudit.A3455Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class DownloadCommuniReportFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();
    HashMap<String, String> hmCiudades;

    public DownloadCommuniReportFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DownloadCommuniReportFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3455Filter> searchDowloadFiles(A3455Filter filter) throws SQLException, Exception {
        List<A3455Filter> lstRtn = new ArrayList<A3455Filter>(0);
        A3455Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02628(?,?,?,?,?,?,?)}";

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
            cstmt01.setString(7, filter.IN_NAME);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3455Filter();
                objRtn.A3455CCUST = rs01.getString("A3454CCUST");
                objRtn.A3455PAIS = rs01.getString("A3454PAIS");
                objRtn.A3455FDATE = rs01.getString("A3454FDATE");
                objRtn.A3455SEQ = rs01.getString("A3454SEQ");
                objRtn.A3455TOTAL = rs01.getInt("A3454TOTAL");
                objRtn.A3455COUNT = rs01.getInt("A3454COUNT");
                objRtn.A3455ESTAD = rs01.getString("A3454ESTAD");
                objRtn.A3455FLAG = rs01.getString("A3454FLAG");
                objRtn.A3455REGIS = rs01.getString("A3454REGIS");
                objRtn.A3455FREGI = rs01.getString("A3454FREGI");
                objRtn.A3455HREGI = rs01.getString("A3454HREGI");
                objRtn.A3455TOTALPAGI = rs01.getInt("A3455TOTALPAGI");
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

    public List<A3455Filter> SearchDowloadFilesDetail(A3455Filter filter) throws SQLException, Exception {
        List<A3455Filter> lstRtn = new ArrayList<A3455Filter>(0);
        A3455Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02628(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_FDATE);
            cstmt01.setString(4, filter.IN_SEQ);
            cstmt01.setString(5, filter.IN_STATUS);
            cstmt01.setString(6, filter.IN_COUNTRY);
            cstmt01.setString(7, filter.IN_NAME);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3455Filter();
                objRtn.A3455CCUST = rs01.getString("A3455CCUST");
                objRtn.A3455PAIS = rs01.getString("A3455PAIS");
                objRtn.A3455FDATE = rs01.getString("A3455FDATE");
                objRtn.A3455COUNT = rs01.getInt("A3455COUNT");
                objRtn.A3455SEQ = rs01.getString("A3455SEQ");
                objRtn.A3455DESCR = rs01.getString("A3455DESCR");
                objRtn.A3455NOMBR = rs01.getString("A3455NOMBR");
                objRtn.A3455ESTAD = rs01.getString("A3455ESTAD");
                objRtn.A3455FLAG = rs01.getString("A3455FLAG");

                objRtn.A3455REGIS = rs01.getString("A3455REGIS");
                objRtn.A3455FREGI = rs01.getString("A3455FREGI");
                objRtn.A3455HREGI = rs01.getString("A3455HREGI");
                objRtn.A3455TOTALPAGI = rs01.getInt("A3455TOTALPAGI");
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
