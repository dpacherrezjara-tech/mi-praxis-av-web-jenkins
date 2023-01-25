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
import java.util.logging.Level;
import net.miatech.beans.A1737Filter;
import net.miatech.beans.A2462Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.flown.A1708;
import net.miatech.praxis.flown.A1737;
import net.miatech.praxis.flown.A1790;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingCalendarDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingCalendarDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingCalendarDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1790> loadPX090SQP0003(A1790 filter) throws SQLException, Exception {

        List<A1790> lstFechas = new ArrayList<>(0);
        A1790 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0003(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.dateTo);
            cstmt.setString(3, filter.dateTo);
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A1790();
                bean.yearFrom = filter.yearFrom.trim();
                bean.monthFrom = filter.monthFrom.trim();
                bean.yearTo = filter.yearTo.trim();
                bean.monthTo = filter.monthTo.trim();

                bean.TPOREG = rst.getString("TPOREG").trim();
                bean.DPERIOD = rst.getString("DPERIOD").trim();
                bean.strFormatDate = Functions.getMonthConvert(rst.getString("DPERIOD").trim());
                if (rst.getString("STATUS").trim().equals("A")) {
                    bean.STATUS = "Open";
                } else if (rst.getString("STATUS").trim().equals("C")) {
                    bean.STATUS = "Closed";
                } else {
                    bean.STATUS = rst.getString("STATUS").trim();
                }
                bean.LASTD = rst.getString("LASTD").trim();
                bean.USCR = rst.getString("USCR").trim();
                bean.FECR = Functions.getMonthConvert(rst.getString("FECR").trim());
                bean.HOCR = Functions.ConvertedTime(rst.getString("HOCR").trim());
                bean.USUP = rst.getString("USUP").trim();
                bean.FEUP = Functions.getMonthConvert(rst.getString("FEUP").trim());
                bean.HOUP = Functions.ConvertedTime(rst.getString("HOUP").trim());
                lstFechas.add(bean);
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstFechas;
    }

    public String loadPX090SQP0004(A1790 filter, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "";
        String NEWPERD = Functions.suma1Month(filter.DPERIOD.trim());
        String NEWLAST = Functions.sumXDaystoDate(NEWPERD + Functions.hallarFindeMes(NEWPERD), 1);

        //Validación para que la última fecha de cierre no pase de 5 días.
        /*if (filter.STATUS.trim().equals("A")) {
         String DPERIOD = filter.DPERIOD.trim() + Functions.hallarFindeMes(filter.DPERIOD.trim());
         String DPERIOD2 = Functions.sumXDaystoDate(DPERIOD, 5);
         if (Long.parseLong(filter.LASTD.trim()) > Long.parseLong(DPERIOD2)) {
         strMsj = "'Last Date' must be less than " + DPERIOD2;
         }
         }*/
        if (strMsj.equals("")) {
            strMsj = "Operation was successful.";
            CallableStatement cstmt = null;
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0004(?,?,?,?,?,?,?,?,?,?)}";
            Connection cnx = null;
            
            try {
                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt = cnx.prepareCall(SQLCLL01);

                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt.setString(2, filter.TPOREG.trim());
                cstmt.setString(3, filter.DPERIOD.trim());
                cstmt.setString(4, filter.LASTD.trim());
                cstmt.setString(5, filter.STATUS.trim());
                cstmt.setString(6, NEWPERD.trim());
                cstmt.setString(7, NEWLAST.trim());
                cstmt.setString(8, Functions.getFechaActual());
                cstmt.setString(9, Functions.getHoraActual());
                cstmt.setString(10, user.getUserInfo().USR);
                cstmt.execute();

            } catch (Exception e) {
                e.getMessage();
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
        }

        return strMsj;
    }
}
