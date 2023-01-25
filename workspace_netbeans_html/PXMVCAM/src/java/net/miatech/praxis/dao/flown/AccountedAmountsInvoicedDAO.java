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
import net.miatech.beans.A2559Filter;
import net.miatech.beans.A2865Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountedAmountsInvoicedDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountedAmountsInvoicedDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountedAmountsInvoicedDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2559Filter> search(A2559Filter filter) throws SQLException, Exception {
        List<A2559Filter> lstRtn = new ArrayList<A2559Filter>(0);
        A2559Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01;

        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00865(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A2559CCUST);
            cstmt01.setString(2, filter.IN_FINI);
            cstmt01.setString(3, filter.IN_FFIN);
            cstmt01.setString(4, filter.IN_PARAM);
            cstmt01.setInt(5, PAGINIT);
            cstmt01.setInt(6, totRowsPag);
            cstmt01.setInt(7, totRows);
            cstmt01.setInt(8, filter.page.TOTROW);
            cstmt01.setString(9, filter.IN_A2559MODO);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(6)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(8);
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

            while (rs01.next()) {
                objRtn = new A2559Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A2559CIA = rs01.getString("A2559CIA").trim();
                objRtn.A2559FORMA = rs01.getString("A2559FORMA").trim();
                objRtn.A2559SERIE = rs01.getString("A2559SERIE").trim();
                objRtn.A2559CUPON = rs01.getString("A2559CUPON").trim();
                objRtn.A2559FFILE = Functions.FormatFecha(rs01.getString("A2559FFILE").trim(), "yyyyMMdd", "yyyy-MM-dd");
                objRtn.A2559FPRO = Functions.FormatFecha(rs01.getString("A2559FPRO").trim(), "yyyyMMdd", "yyyy-MM-dd");
                objRtn.A2559FCLEA = rs01.getString("A2559FCLEA").trim();
                objRtn.A2559PERID = rs01.getString("A2559PERID").trim();
                objRtn.A2559INVOI = rs01.getString("A2559INVOI").trim();
                objRtn.A2559FACT = rs01.getString("A2559FACT").trim();
                objRtn.A2559FCONT = Functions.FormatFecha(rs01.getString("A2559FCONT").trim(), "yyyyMMdd", "yyyy-MM-dd");
                objRtn.A2559FACTU = rs01.getString("A2559FACTU").trim();
                objRtn.A2559PFARE = rs01.getDouble("A2559PFARE");
                objRtn.A2559PTAX = rs01.getDouble("A2559PTAX");
                objRtn.A2559PISC = rs01.getDouble("A2559PISC");
                objRtn.A2559FFARE = rs01.getDouble("A2559FFARE");
                objRtn.A2559FTAX = rs01.getDouble("A2559FTAX");
                objRtn.A2559FISC = rs01.getDouble("A2559FISC");
                objRtn.A2559DFARE = rs01.getDouble("DFARE");
                objRtn.A2559DTAX = rs01.getDouble("DTAX");
                objRtn.A2559DISC = rs01.getDouble("DISC");

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (SQLException ex) {
            String data = ex.getMessage();
        } catch (Exception e) {
            String data = e.getMessage();
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
