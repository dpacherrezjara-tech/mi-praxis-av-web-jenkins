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
import net.miatech.beans.A1838Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterTravelDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingMasterTravelDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingMasterTravelDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1838Filter> loadPX172S01A1838(A1838Filter filter) throws SQLException, Exception {
        List<A1838Filter> lstRtn = new ArrayList<>(0);
        A1838Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Connection cnx = null;
        try {
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX172S01A1838(?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1838CCUST.trim());
            cstmt01.setString(2, filter.IN_A1838TIPO.trim());
            cstmt01.setString(3, filter.IN_A1838AGENT.trim());
            cstmt01.setString(4, filter.A1838CUENT.trim());
            cstmt01.setString(5, filter.A1838SUBCT.trim());

            cstmt01.setInt(6, PAGINIT);
            cstmt01.setInt(7, totRowsPag);
            cstmt01.setInt(8, totRows);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(8)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(9);
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
                objRtn = new A1838Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1838CCUST = rs01.getString("A1838CCUST").trim();
                objRtn.A1838TIPO = rs01.getString("A1838TIPO").trim();
                objRtn.A1838AGENT = rs01.getString("A1838AGENT").trim();
                objRtn.A1838DESCR = rs01.getString("A1838DESCR");
                objRtn.A1838CIA = rs01.getString("A1838CIA");
                objRtn.A1838UNIDA = rs01.getString("A1838UNIDA");
                objRtn.A1838CENCO = rs01.getString("A1838CENCO");
                objRtn.A1838UBICA = rs01.getString("A1838UBICA");
                objRtn.A1838CUENT = rs01.getString("A1838CUENT");
                objRtn.A1838SUBCT = rs01.getString("A1838SUBCT");
                objRtn.A1838EQUI = rs01.getString("A1838EQUI");
                objRtn.A1838INCIA = rs01.getString("A1838INCIA");
                objRtn.A1838FINI = Functions.getMonthConvertDate(rs01.getString("A1838FINI"));
                objRtn.A1838FFIN = Functions.getMonthConvertDate(rs01.getString("A1838FFIN"));

                objRtn.A1838REGIS = rs01.getString("A1838REGIS");
                objRtn.A1838FREGI = Functions.getMonthConvertDate(rs01.getString("A1838FREGI"));
                objRtn.A1838HREGI = Functions.ConvertedTime(rs01.getString("A1838HREGI"));
                objRtn.A1838REGVI = rs01.getString("A1838REGVI");
                objRtn.A1838FREVI = Functions.getMonthConvertDate(rs01.getString("A1838FREVI"));
                objRtn.A1838HREVI = Functions.ConvertedTime(rs01.getString("A1838HREVI"));

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

    public String Maintance(A1838Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX172S02A1838(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, strOption);
            cs.setString(2, filter.A1838CCUST);
            cs.setString(3, filter.A1838TIPO);
            cs.setString(4, filter.A1838AGENT);
            cs.setString(5, filter.A1838DESCR);
            cs.setString(6, filter.A1838CIA);
            cs.setString(7, filter.A1838UNIDA);
            cs.setString(8, filter.A1838CENCO);
            cs.setString(9, filter.A1838UBICA);
            cs.setString(10, filter.A1838CUENT);
            cs.setString(11, filter.A1838SUBCT);
            cs.setString(12, filter.A1838EQUI);
            cs.setString(13, filter.A1838INCIA);
            cs.setString(14, filter.A1838FINI);
            cs.setString(15, filter.A1838FFIN);
            cs.setString(16, session.getUserView().getUserInfo().USR);
            cs.setString(17, Functions.getFechaActual());
            cs.setString(18, Functions.getHoraActual());
            cs.setString(19, filter.IN_A1838TIPO_OLD);
            cs.setString(20, filter.IN_A1838AGENT_OLD);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }

}
