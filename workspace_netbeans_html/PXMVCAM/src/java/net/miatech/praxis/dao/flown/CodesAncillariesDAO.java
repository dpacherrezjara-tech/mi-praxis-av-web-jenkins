/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX520S01A051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class CodesAncillariesDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CodesAncillariesDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CodesAncillariesDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
   
    public List<PX520S01A051Filter> loadPX520S01A051(PX520S01A051Filter filter) throws SQLException, Exception {
        List<PX520S01A051Filter> lstRtn = new ArrayList<PX520S01A051Filter>(0);
        PX520S01A051Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP03262(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FPRDA_FROM);
            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX520S01A051Filter();
                objRtn.A051KEY1 = rs01.getString("A051KEY1");
                objRtn.A051KEY2 = rs01.getString("A051KEY2");
                objRtn.A051DESCR1 = rs01.getString("A051DESCR1");
                objRtn.A051FECHA1 = rs01.getString("A051FECHA1");
                objRtn.A051FECHA2 = rs01.getString("A051FECHA2");
                objRtn.A051COMENT = rs01.getString("A051COMENT");
                objRtn.A051STATUS = rs01.getString("A051STATUS");
                if (objRtn.A051STATUS.equals("A")) {
                    objRtn.A051STATUS = "ACTIVED";
                } else {
                    objRtn.A051STATUS = "DISABLED";
                }
                //Pagin
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
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
    
    public PX520S01A051Filter setPX520S01A051(PX520S01A051Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL SQP03263(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);

            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, filter.A051KEY1);
            cstmt.setString(3, filter.A051KEY2);
            cstmt.setString(4, filter.A051DESCR1);
            cstmt.setString(5, filter.A051DESCR2);
            cstmt.setDouble(6, filter.A051CANTI1);
            cstmt.setDouble(7, filter.A051CANTI2);
            cstmt.setString(8, filter.A051FECHA1);
            cstmt.setString(9, filter.A051FECHA2);
            cstmt.setString(10, filter.A051COMENT);
            cstmt.setString(11, filter.A051STATUS);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(12);
            filter.dbException.MESSAGE = cstmt.getString(13);
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
        return filter;
    }

}
