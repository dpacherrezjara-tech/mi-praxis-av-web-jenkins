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
import net.miatech.beans.PX036S01A1527Filter;
import net.miatech.beans.SQP00146Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class CalendarControlARCDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CalendarControlARCDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CalendarControlARCDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX036S01A1527Filter> loadPX036S01A1527(PX036S01A1527Filter filter) throws SQLException, Exception {
        List<PX036S01A1527Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1527Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQPCA0001(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_A1527PPED);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1527Filter();
                objRtn.A1527PPED = rs01.getString("A1527PPED");
                objRtn.A1527ANIO = rs01.getString("A1527ANIO");
                objRtn.A1527CUART = rs01.getString("A1527CUART");
                objRtn.A1527PDIDM = rs01.getString("A1527PDIDM");
                objRtn.A1527PDIDS = rs01.getString("A1527PDIDS");
                objRtn.A1527PDIDC = rs01.getString("A1527PDIDC");
                objRtn.A1527SODA = rs01.getString("A1527SODA");
                objRtn.A1527CINTA = rs01.getString("A1527CINTA");
                objRtn.A1527DESEM = rs01.getString("A1527DESEM");
                objRtn.A1527CNULO = rs01.getString("A1527CNULO");
                objRtn.A1527OBS = rs01.getString("A1527OBS");
                objRtn.A1527USRIN = rs01.getString("A1527USRIN");
                objRtn.A1527FECIN = rs01.getString("A1527FECIN");
                objRtn.A1527HORIN = rs01.getString("A1527HORIN");
                objRtn.A1527USRAC = rs01.getString("A1527USRAC");
                objRtn.A1527FECAC = rs01.getString("A1527FECAC");
                objRtn.A1527HORAC = rs01.getString("A1527HORAC");
                objRtn.A1698_TAPES = rs01.getInt("A1698_TAPES");
                objRtn.A1698_ERRORS = rs01.getInt("A1698_ERRORS");
                objRtn.A1698_SALEWO = rs01.getInt("A1698_SALEWO");
                objRtn.A1698_COMMEN_ELW = rs01.getString("A1698_COMMEN_ELW");
                objRtn.A1698_COMMEN_IAP = rs01.getString("A1698_COMMEN_IAP");
                objRtn.A1698_COMMEN_IAR = rs01.getString("A1698_COMMEN_IAR");
                objRtn.A1698_COUNT_ELW = rs01.getInt("A1698_COUNT_ELW");
                objRtn.A1698_COUNT_IAP = rs01.getInt("A1698_COUNT_IAP");
                objRtn.A1698_COUNT_IAR = rs01.getInt("A1698_COUNT_IAR");

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

    public void setSQP00146(SQP00146Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP00146(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_A1527PPED);
            cstmt01.setString(3, filter.IN_A1527PDIDC);
            cstmt01.setString(4, filter.IN_A1527SODA);
            cstmt01.setString(5, filter.IN_A1698BANK);
            cstmt01.setString(6, filter.IN_A1698COMEN);

            cstmt01.execute();
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
    }
}
