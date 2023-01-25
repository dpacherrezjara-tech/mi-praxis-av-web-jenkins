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
import net.miatech.beans.A1834Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterDecisionDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingMasterDecisionDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingMasterDecisionDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1834Filter> loadPX171S01A1834(A1834Filter filter) throws SQLException, Exception {
        List<A1834Filter> lstRtn = new ArrayList<>(0);
        A1834Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Connection cnx = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX171S01A1834(?,?,?,?,?,?,?,?,?)}";
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1834CCUST.trim());
            cstmt01.setString(2, filter.IN_A1834FP.trim());
            cstmt01.setString(3, filter.IN_A1834FUENT.trim());
            cstmt01.setString(4, filter.IN_A1834SUBFU.trim());
            cstmt01.setString(5, filter.IN_A1834CIAOP.trim());

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
                objRtn = new A1834Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1834CCUST = rs01.getString("A1834CCUST").trim();
                objRtn.A1834FP = rs01.getString("A1834FP").trim();
                objRtn.A1834FUENT = rs01.getString("A1834FUENT").trim();
                objRtn.A1834SUBFU = rs01.getString("A1834SUBFU");
                objRtn.A1834TTARJ = rs01.getString("A1834TTARJ");
                objRtn.A1834STTAR = rs01.getString("A1834STTAR");
                objRtn.A1834CIAOP = rs01.getString("A1834CIAOP");
                objRtn.A1834DESFP = rs01.getString("A1834DESFP");
                objRtn.A1834COMBI = rs01.getInt("A1834COMBI");
                objRtn.A1834TVISA = rs01.getString("A1834TVISA");
                objRtn.A1834TMCAR = rs01.getString("A1834TMCAR");
                objRtn.A1834OTROS = rs01.getString("A1834OTROS");
                objRtn.A1834TPOLI = rs01.getString("A1834TPOLI");
                objRtn.A1834ALF01 = rs01.getString("A1834ALF01");
                objRtn.A1834ALF02 = rs01.getString("A1834ALF02");
                objRtn.A1834ALF03 = rs01.getString("A1834ALF03");
                objRtn.A1834ALF04 = rs01.getString("A1834ALF04");
                objRtn.A1834ALF05 = rs01.getString("A1834ALF05");
                objRtn.A1834ALF06 = rs01.getString("A1834ALF06");
                objRtn.A1834ALF07 = rs01.getString("A1834ALF07");
                objRtn.A1834ALF08 = rs01.getString("A1834ALF08");
                objRtn.A1834ALF09 = rs01.getString("A1834ALF09");
                objRtn.A1834ALF10 = rs01.getString("A1834ALF10");
                objRtn.A1834ALF11 = rs01.getString("A1834ALF11");
                objRtn.A1834ALF12 = rs01.getString("A1834ALF12");
                objRtn.A1834NUM01 = rs01.getString("A1834NUM01");
                objRtn.A1834NUM02 = rs01.getString("A1834NUM02");
                objRtn.A1834NUM03 = rs01.getString("A1834NUM03");
                objRtn.A1834NUM04 = rs01.getString("A1834NUM04");
                objRtn.A1834NUM05 = rs01.getString("A1834NUM05");
                objRtn.A1834NUM06 = rs01.getString("A1834NUM06");
                objRtn.A1834NUM07 = rs01.getString("A1834NUM07");
                objRtn.A1834NUM08 = rs01.getString("A1834NUM08");
                objRtn.A1834NUM09 = rs01.getString("A1834NUM09");
                objRtn.A1834NUM10 = rs01.getString("A1834NUM10");
                objRtn.A1834NUM11 = rs01.getString("A1834NUM11");
                objRtn.A1834NUM12 = rs01.getString("A1834NUM12");
                objRtn.A1834FINI = Functions.getMonthConvertDate(rs01.getString("A1834FINI"));
                objRtn.A1834FFIN = Functions.getMonthConvertDate(rs01.getString("A1834FFIN"));

                objRtn.A1834REGIS = rs01.getString("A1834REGIS");
                objRtn.A1834FREGI = Functions.getMonthConvertDate(rs01.getString("A1834FREGI"));
                objRtn.A1834HREGI = Functions.ConvertedTime(rs01.getString("A1834HREGI"));
                objRtn.A1834REGVI = rs01.getString("A1834REGVI");
                objRtn.A1834FREVI = Functions.getMonthConvertDate(rs01.getString("A1834FREVI"));
                objRtn.A1834HREVI = Functions.ConvertedTime(rs01.getString("A1834HREVI"));

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            String dato = e.getMessage();
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

    public String Maintance(A1834Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        Connection cnx = null;

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX171S02A1834(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, filter.A1834CCUST);
            cs.setString(3, filter.A1834FP);
            cs.setString(4, filter.A1834FUENT);
            cs.setString(5, filter.A1834SUBFU);
            cs.setString(6, filter.A1834TTARJ);
            cs.setString(7, filter.A1834STTAR);
            cs.setString(8, filter.A1834CIAOP);
            cs.setString(9, filter.A1834DESFP);
            cs.setInt(10, filter.A1834COMBI);
            cs.setString(11, filter.A1834TVISA);
            cs.setString(12, filter.A1834TMCAR);
            cs.setString(13, filter.A1834OTROS);
            cs.setString(14, filter.A1834TPOLI);
            cs.setString(15, filter.A1834ALF01);
            cs.setString(16, filter.A1834ALF02);
            cs.setString(17, filter.A1834ALF03);
            cs.setString(18, filter.A1834ALF04);
            cs.setString(19, filter.A1834ALF05);
            cs.setString(20, filter.A1834ALF06);
            cs.setString(21, filter.A1834ALF07);
            cs.setString(22, filter.A1834ALF08);
            cs.setString(23, filter.A1834ALF09);
            cs.setString(24, filter.A1834ALF10);
            cs.setString(25, filter.A1834ALF11);
            cs.setString(26, filter.A1834ALF12);
            cs.setString(27, filter.A1834NUM01);
            cs.setString(28, filter.A1834NUM02);
            cs.setString(29, filter.A1834NUM03);
            cs.setString(30, filter.A1834NUM04);
            cs.setString(31, filter.A1834NUM05);
            cs.setString(32, filter.A1834NUM06);
            cs.setString(33, filter.A1834NUM07);
            cs.setString(34, filter.A1834NUM08);
            cs.setString(35, filter.A1834NUM09);
            cs.setString(36, filter.A1834NUM10);
            cs.setString(37, filter.A1834NUM11);
            cs.setString(38, filter.A1834NUM12);
            cs.setString(39, filter.A1834FINI);
            cs.setString(40, filter.A1834FFIN);
            cs.setString(41, session.getUserView().getUserInfo().USR);
            cs.setString(42, Functions.getFechaActual());
            cs.setString(43, Functions.getHoraActual());
            cs.setString(44, filter.IN_A1834FP_OLD);
            cs.setString(45, filter.IN_A1834FUENT_OLD);
            cs.setString(46, filter.IN_A1834SUBFU_OLD);
            cs.setString(47, filter.IN_A1834TTARJ_OLD);
            cs.setString(48, filter.IN_A1834STTAR_OLD);
            cs.setString(49, filter.IN_A1834CIAOP_OLD);
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
