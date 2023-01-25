/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2288Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author 
 */
public class RejectionReportDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public RejectionReportDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RejectionReportDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2288Filter> loadPX273SQP00737(A2288Filter filter) throws SQLException, Exception {

        List<A2288Filter> lstData = new ArrayList<A2288Filter>(0);
        A2288Filter bean;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00737(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strDate.trim());
            cstmt.setString(3, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(4, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(5, filter.AFILN.trim());
            cstmt.setString(6, filter.CODAUT.trim());
            cstmt.setString(7, filter.ACCOUNT.trim());
            cstmt.setString(8, filter.CODREJ.trim());

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();

            while (rst.next()) {

                bean = new A2288Filter();
                bean.RN = rst.getLong("RN");
                bean.CVEGPRO = rst.getString("CVEGPRO").trim();
                bean.CADENA = rst.getString("CADENA").trim();
                bean.FECPROC = rst.getString("FECPROC").trim();
                bean.AFILN = rst.getString("AFILN").trim();
                bean.NAMEB = rst.getString("NAMEB").trim();
                bean.ACCOUNT = rst.getString("ACCOUNT").trim();
                bean.CODTRANS = rst.getString("CODTRANS").trim();
                bean.AMOUNT = rst.getDouble("AMOUNT");
                bean.CODAUT = rst.getString("CODAUT").trim();
                bean.FECVTA = rst.getString("FECVTA").trim();
                bean.REFERENCE = rst.getString("REFERENCE").trim();
                bean.CODREJ = rst.getString("CODREJ").trim();
                bean.STATUS = rst.getString("STATUS").trim();
                bean.PLATAFOR = rst.getString("PLATAFOR").trim();
                bean.TIPOPFOR = rst.getString("TIPOPFOR").trim();
                bean.strDescReject = rst.getString("DESREJ").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
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
    
    public List<A2288Filter> loadPX273SQP00758(A2288Filter filter) throws SQLException, Exception {

        List<A2288Filter> lstData = new ArrayList<A2288Filter>(0);
        A2288Filter bean;
        String strFechaI = "", strFechaF = "";
        long lngTotTrans = 0;
        double dblTotMonto = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00758(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strDate.trim());
            cstmt.setString(3, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(4, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(5, filter.AFILN.trim());
            cstmt.setString(6, filter.CODAUT.trim());
            cstmt.setString(7, filter.ACCOUNT.trim());
            cstmt.setString(8, filter.CODREJ.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();
            int pos = 0;
            while (rst.next()) {

                if (pos == 0) {
                    strFechaI = rst.getString("FECVTA").trim();
                }
                strFechaF = rst.getString("FECVTA").trim();
                lngTotTrans += rst.getLong("CANT");
                dblTotMonto += rst.getDouble("MONTO");
                pos++;
            }
            rst.close();

            if (cstmt.getMoreResults()) {

                rst = cstmt.getResultSet();

                while (rst.next()) {

                    bean = new A2288Filter();
                    bean.CODREJ = rst.getString("CODREJ").trim();
                    bean.DESREJ = rst.getString("DESREJ").trim();
                    bean.RN = rst.getLong("CANT");
                    bean.strFechaI = strFechaI;
                    bean.strFechaF = strFechaF;
                    bean.lngTotTrans = lngTotTrans;
                    bean.dblTotMonto = dblTotMonto;
                    lstData.add(bean);
                }
                rst.close();
            }

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
