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
import net.miatech.beans.SaleAudit.A3456Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RejectedReportFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public RejectedReportFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RejectedReportFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3456Filter> searchDowloadFiles(A3456Filter filter) throws SQLException, Exception {
        List<A3456Filter> lstRtn = new ArrayList<A3456Filter>(0);
        A3456Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02631(?,?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(7, filter.IN_Ticcket);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_Error);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3456Filter();
                if (filter.IN_OPTION.equals("1") || filter.IN_OPTION.equals("7")) {
                    objRtn.A3456CCUST = rs01.getString("A3456CCUST");
                    objRtn.A3456PAIS = rs01.getString("A3456PAIS");
                    objRtn.A3456FDATE = rs01.getString("A3456FDATE");
                    objRtn.A3456SEQ = rs01.getString("A3456SEQ");
                    objRtn.A3456TOTAL = rs01.getInt("A3456TOTAL");
                    objRtn.A3456COUNT = rs01.getInt("A3456COUNT");
                    objRtn.A3456ESTAD = rs01.getString("A3456ESTAD");
                    objRtn.A3456FLAG = rs01.getString("A3456FLAG");
                    objRtn.A3456REGIS = rs01.getString("A3456REGIS");
                    objRtn.A3456FREGI = rs01.getString("A3456FREGI");
                    objRtn.A3456HREGI = rs01.getString("A3456HREGI");
                    objRtn.A3456TOTALPAGI = rs01.getInt("A3456TOTALPAGI");
                } else {
                    objRtn.A3456CCUST = rs01.getString("A3457CCUST");
                    objRtn.A3456CIA = rs01.getString("A3457CIA");
                    objRtn.A3456PAIS = rs01.getString("A3457PAIS");
                    objRtn.A3456FDATE = rs01.getString("A3457FDATE");
                    objRtn.A3456COUNT = rs01.getInt("A3457COUNT");
                    objRtn.A3456SEQ = rs01.getString("A3457SEQ");
                    objRtn.A3456TKT = rs01.getString("A3457TKT");
                    objRtn.A3456TRN = rs01.getString("A3457TRN");
                    objRtn.A3456IATA = rs01.getString("A3457IATA");
                    objRtn.A3456DESIATA = rs01.getString("AGENCY");
                    objRtn.A3456DESCR = rs01.getString("A3457DESCR");
                    objRtn.A3456FLAG = rs01.getString("A3457FLAG");
                    objRtn.A3456TKTAS = rs01.getString("A3457TKTAS");
                    objRtn.A3456GDSNA = rs01.getString("A3457GDSNA");
                    objRtn.A3456PERIO = rs01.getString("A3457PERIO");
                    objRtn.A3456DATE = rs01.getString("A3457DATE");
                    objRtn.A3456TOTALPAGI = rs01.getInt("A3457TOTALPAGI");
                    objRtn.A3456ESTAD = rs01.getString("A3457ESTAD");
                    objRtn.A3456ESTAT = rs01.getString("A3457ESTA");
                    objRtn.A3456FREGI = rs01.getString("A3457FREGI");
                }
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

    public List<A3456Filter> SearchRejectedDocDetail(A3456Filter filter) throws SQLException, Exception {
        List<A3456Filter> lstRtn = new ArrayList<A3456Filter>(0);
        A3456Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02631(?,?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3456Filter();
                objRtn.A3456CCUST = rs01.getString("A3457CCUST");
                objRtn.A3456CIA = rs01.getString("A3457CIA");
                objRtn.A3456PAIS = rs01.getString("A3457PAIS");
                objRtn.A3456FDATE = rs01.getString("A3457FDATE");
                objRtn.A3456COUNT = rs01.getInt("A3457COUNT");
                objRtn.A3456SEQ = rs01.getString("A3457SEQ");
                objRtn.A3456TKT = rs01.getString("A3457TKT");
                objRtn.A3456TRN = rs01.getString("A3457TRN");
                objRtn.A3456IATA = rs01.getString("A3457IATA");
                objRtn.A3456DESIATA = rs01.getString("AGENCY");
                objRtn.A3456DESCR = rs01.getString("A3457DESCR");
                objRtn.A3456FLAG = rs01.getString("A3457FLAG");
                objRtn.A3456TKTAS = rs01.getString("A3457TKTAS");
                objRtn.A3456GDSNA = rs01.getString("A3457GDSNA");
                objRtn.A3456PERIO = rs01.getString("A3457PERIO");
                objRtn.A3456DATE = rs01.getString("A3457DATE");
                objRtn.A3456TOTALPAGI = rs01.getInt("A3457TOTALPAGI");
                objRtn.A3456ESTAD = rs01.getString("A3457ESTAD");
                objRtn.A3456ESTAT = rs01.getString("A3457ESTA");
                objRtn.A3456FREGI = rs01.getString("A3457FREGI");
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
