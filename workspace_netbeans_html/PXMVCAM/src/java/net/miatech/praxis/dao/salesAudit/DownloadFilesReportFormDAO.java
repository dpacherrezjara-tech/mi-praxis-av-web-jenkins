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
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.beans.SaleAudit.A3280Filter;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class DownloadFilesReportFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public DownloadFilesReportFormDAO() {

    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DownloadFilesReportFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3280Filter> searchDowloadFiles(A3280Filter filter) throws SQLException, Exception {
        List<A3280Filter> lstRtn = new ArrayList<A3280Filter>(0);
        A3280Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02279(?,?,?,?,?,?,?)}";

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
                objRtn = new A3280Filter();
                objRtn.A3280CCUST = rs01.getString("A3279CCUST");
                objRtn.A3280PAIS = rs01.getString("A3279PAIS");
                objRtn.A3280FDATE = rs01.getString("A3279FDATE");
                objRtn.A3280SEQ = rs01.getString("A3279SEQ");
                objRtn.A3280TOTAL2 = rs01.getInt("A3279TOTAL");
                objRtn.A3280COUNT2 = rs01.getInt("A3279COUNT");
                objRtn.A3280ESTAD = rs01.getString("A3279ESTAD");
                objRtn.A3280FLAG = rs01.getString("A3279FLAG");
                objRtn.A3280REGIS = rs01.getString("A3279REGIS");
                objRtn.A3280FREGI = rs01.getString("A3279FREGI");
                objRtn.A3280HREGI = rs01.getString("A3279HREGI");
                objRtn.A3280TOTALPAGI = rs01.getInt("A3280TOTALPAGI");
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

    public List<A3280Filter> SearchDebitosDetail(A3280Filter filter) throws SQLException, Exception {
        List<A3280Filter> lstRtn = new ArrayList<A3280Filter>(0);
        A3280Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02279(?,?,?,?,?,?,?)}";

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
                objRtn = new A3280Filter();
                objRtn.A3280CCUST = rs01.getString("A3280CCUST");
                objRtn.A3280PAIS = rs01.getString("A3280PAIS");
                objRtn.A3280FDATE = rs01.getString("A3280FDATE");
                objRtn.A3280COUNT2 = rs01.getInt("A3280COUNT");
                objRtn.A3280SEQ = rs01.getString("A3280SEQ");
                objRtn.A3280DESCR = rs01.getString("A3280DESCR");
                objRtn.A3280NOMBR = rs01.getString("A3280NOMBR");
                objRtn.A3280ESTAD = rs01.getString("A3280ESTAD");
                objRtn.A3280FLAG = rs01.getString("A3280FLAG");

                objRtn.A3280REGIS = rs01.getString("A3280REGIS");
                objRtn.A3280FREGI = rs01.getString("A3280FREGI");
                objRtn.A3280HREGI = rs01.getString("A3280HREGI");
                objRtn.A3280TOTALPAGI = rs01.getInt("A3280TOTALPAGI");
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
    
    public List<A3280Filter> listFiles(A3280Filter filter) throws SQLException, Exception {
        List<A3280Filter> lstRtn = new ArrayList<A3280Filter>(0);
        A3280Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02279(?,?,?,?,?,?)}";

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

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3280Filter();
                objRtn.A3280CCUST = rs01.getString("A3283CCUST");
                objRtn.A3280PAIS = rs01.getString("A3283PAIS");
                objRtn.A3280FDATE = rs01.getString("A3283FDATE");
                objRtn.A3280SEQ = rs01.getString("A3283SEQ");
                objRtn.A3280DESCR = rs01.getString("A3283DIA");
                objRtn.A3280NOMBR = rs01.getString("A3283NOMBR");
                objRtn.A3280ESTAD = rs01.getString("A3283ESTAD");
                objRtn.A3280FLAG = rs01.getString("A3283FLAG"); 
                
                objRtn.A3280REGIS = rs01.getString("A3283REGIS");
                objRtn.A3280FREGI = rs01.getString("A3283FREGI");
                objRtn.A3280HREGI = rs01.getString("A3283HREGI");
                objRtn.A3280TOTALPAGI = rs01.getInt("A3280TOTALPAGI");
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
