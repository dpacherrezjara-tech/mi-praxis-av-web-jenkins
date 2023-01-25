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
import java.util.List;
import net.miatech.beans.A2865Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class LogCouponsUpdateDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public LogCouponsUpdateDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public LogCouponsUpdateDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2865Filter> SQP01369(A2865Filter filter) throws SQLException, Exception {
        List<A2865Filter> lstRtn = new ArrayList<A2865Filter>(0);
        A2865Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01369(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(2, Types.INTEGER);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A2865CCUST.trim());

            cstmt01.setInt(2, PAGINIT);
            cstmt01.setInt(3, totRowsPag);
            cstmt01.setInt(4, totRows);
            cstmt01.setInt(5, filter.page.TOTROW);
            cstmt01.setString(6, filter.IN_FINI);
            cstmt01.setString(7, filter.IN_FFIN);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(2);
            filter.page.PAGROW = cstmt01.getInt(3);
            filter.page.TOTPAG = cstmt01.getInt(4);
            filter.page.TOTROW = cstmt01.getInt(5);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(4)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(5);
                    int total = (int) (totRows / 20);
                    int resto = (totRows % 20);

                    if (resto > 0) {
                        totPAGS = total + 1;
                    } else {
                        totPAGS = total;
                    }

                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            filter.page.TOTPAG = totPAGS;

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A2865Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A2865CCUST = rs01.getString("A2865CCUST").trim();
                objRtn.A2865CIA = rs01.getString("A2865CIA").trim();
                objRtn.A2865FORMA = rs01.getString("A2865FORMA").trim();
                objRtn.A2865SERIE = rs01.getString("A2865SERIE");
                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.A2865SEQ = rs01.getString("A2865SEQ");
                objRtn.A2865FPROC = rs01.getString("A2865FPROC");
                objRtn.A2865REGIS = rs01.getString("A2865REGIS").trim();
                objRtn.A2865FREGI = rs01.getString("A2865FREGI").trim();
                objRtn.A2865HREGI = rs01.getString("A2865HREGI").trim();
                objRtn.VALOLD = rs01.getDouble("VALOLD");
                objRtn.COMOLD = rs01.getDouble("COMOLD");
                objRtn.VALNEW = rs01.getDouble("VALNEW");
                objRtn.COMNEW = rs01.getDouble("COMNEW");
                objRtn.VALFLO = rs01.getDouble("VALFLO");
                objRtn.COMFLO = rs01.getDouble("COMFLO");
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.FECVAL = rs01.getString("FECVAL").trim();
                objRtn.FCONT = rs01.getString("FCONT").trim();
                objRtn.IDCON = rs01.getString("IDCON").trim();

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
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

}
