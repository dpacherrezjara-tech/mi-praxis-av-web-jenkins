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
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A2850Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class PaymentNotificationReportDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public PaymentNotificationReportDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2850Filter> SQP01877(A2850Filter filter) throws SQLException, Exception //public List<A2850Filter> loadA2850(A2850Filter filter) throws SQLException
    {
        List<A2850Filter> lstRtn = new ArrayList<A2850Filter>(0);
        A2850Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP01877(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_REFER", filter.IN_REFER);
            cstmt01.setString("IN_IATA", filter.IN_IATA);
            cstmt01.setString("IN_FPAG", filter.IN_FPAG);
            cstmt01.setString("IN_LOTE", filter.IN_LOTE);

            cstmt01.setInt("IO_PAGNUM", PAGINIT);
            cstmt01.setInt("IO_PAGROW", totRowsPag);
            cstmt01.setInt("IO_TOTPAG", totRows);
            cstmt01.setInt("IO_TOTROW", filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt("IO_PAGNUM");
            filter.page.PAGROW = cstmt01.getInt("IO_PAGROW");
            filter.page.TOTPAG = cstmt01.getInt("IO_TOTPAG");
            filter.page.TOTROW = cstmt01.getInt("IO_TOTROW");

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt("IO_PAGROW")) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt("IO_TOTROW");
                    int total = (int) (totRows / totRowsPag);
                    int resto = (totRows % totRowsPag);

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
                objRtn = new A2850Filter();

                objRtn.RN = rs01.getLong("RN");
                objRtn.A1728CCUST = rs01.getString("A1728CCUST").trim();
                objRtn.A1728REFER = rs01.getString("A1728REFER").trim();
                objRtn.A1728IATA = rs01.getString("A1728IATA").trim();
                objRtn.A1728LOTE = rs01.getString("A1728LOTE").trim();
                objRtn.strIATA = rs01.getString("IATA");
                objRtn.A2850PER = rs01.getString("A2850PER").trim();
                objRtn.A2850MDAPG = rs01.getString("A2850MDAPG").trim();
                objRtn.A2850REFP = rs01.getString("A2850REFP").trim();
                objRtn.A2850FPAG = rs01.getString("A2850FPAG").trim();
                objRtn.A2850CANAL = rs01.getString("A2850CANAL").trim();
                objRtn.A2850PAG = rs01.getDouble("A2850PAG");
                objRtn.A2850CAP = rs01.getDouble("A2850CAP");
                objRtn.A2850IMP = rs01.getDouble("A2850IMP");
                objRtn.A2850SUCB = rs01.getInt("A2850SUCB");
                objRtn.A2850NCAJ = rs01.getInt("A2850NCAJ");
                objRtn.A2850INT = rs01.getDouble("A2850INT");
                objRtn.A2850TPAG = rs01.getString("A2850TPAG").trim();
                objRtn.A2850TREP = rs01.getString("A2850TREP").trim();
                objRtn.A2850FREP = rs01.getString("A2850FREP").trim();
                objRtn.A2850IDTRX = rs01.getString("A2850IDTRX").trim();
                objRtn.A2850REGIS = rs01.getString("A2850REGIS").trim();
                objRtn.A2850FREGI = rs01.getString("A2850FREGI").trim();
                objRtn.A2850HREGI = rs01.getString("A2850HREGI").trim();

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);//session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }

        return lstRtn;
    }

}
