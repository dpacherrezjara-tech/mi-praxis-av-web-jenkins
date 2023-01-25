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
import net.miatech.beans.A1830Filter;
import net.miatech.beans.PX019S01A025Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterBINESDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingMasterBINESDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingMasterBINESDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1830Filter> loadBank() throws SQLException, Exception {
        List<A1830Filter> lstRtn = new ArrayList<>(0);
        A1830Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Connection cnx = null; //session.getCNXIBMDB2().open();         
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX163S03A1830(?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.execute();
            objRtn = new A1830Filter();
            objRtn.A1830BANCO = "All";
            lstRtn.add(objRtn);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1830Filter();
                objRtn.A1830BANCO = rs01.getString("A1830BANCO");
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
     public List<A1830Filter> loadBank2() throws SQLException, Exception {
        List<A1830Filter> lstRtn = new ArrayList<>(0);
        A1830Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Connection cnx = null; //session.getCNXIBMDB2().open();         
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX163S03A1830(?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.execute();
            objRtn = new A1830Filter();
            objRtn.A1830BANCO = "Select";
            lstRtn.add(objRtn);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1830Filter();
                objRtn.A1830BANCO = rs01.getString("A1830BANCO");
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

    public List<A1830Filter> loadPX163S01A1830(A1830Filter filter) throws SQLException, Exception {
        List<A1830Filter> lstRtn = new ArrayList<>(0);
        A1830Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Connection cnx = null; //session.getCNXIBMDB2().open();         
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX163S01A1830(?,?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString("IN_CODIGO", filter.IN_CODIGO);
            cstmt01.setString("IN_BANCO", filter.IN_BANCO);
            cstmt01.setString("IN_PRODUCTO", filter.IN_PRODUCTO);
            cstmt01.setString("IN_NATURALEZA", filter.IN_NATURALEZA);
            cstmt01.setString("IN_MARCA", filter.IN_MARCA);

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
                objRtn = new A1830Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1830CCUST = rs01.getString("A1830CCUST");
                objRtn.A1830PREFI = rs01.getString("A1830PREFI");
                objRtn.A1830BANCO = rs01.getString("A1830BANCO");
                objRtn.A1830PRODU = rs01.getString("A1830PRODU");
                objRtn.A1830NATUR = rs01.getString("A1830NATUR");
                objRtn.A1830MARCA = rs01.getString("A1830MARCA");
                objRtn.A1830FINI = rs01.getString("A1830FINI");
                objRtn.A1830FFIN = rs01.getString("A1830FFIN");
                objRtn.A1830REGVI = rs01.getString("A1830REGVI");
                objRtn.A1830FREVI = rs01.getString("A1830FREVI");
                objRtn.A1830HREVI = rs01.getString("A1830HREVI");
                objRtn.A1830REGIS = rs01.getString("A1830REGIS");
                objRtn.A1830FREGI = rs01.getString("A1830FREGI");
                objRtn.A1830HREGI = rs01.getString("A1830HREGI");

                objRtn.A1830CODNA = rs01.getString("A1830CODNA");
                objRtn.A1830CODM = rs01.getString("A1830CODM");
                objRtn.A1830CODMA = rs01.getString("A1830CODMA");
                objRtn.A1830CODM2 = rs01.getString("A1830CODM2");
                objRtn.A1830CODM3 = rs01.getString("A1830CODM3");
                objRtn.A1830CODM4 = rs01.getString("A1830CODM4");
                objRtn.A1830CODM5 = rs01.getString("A1830CODM5");
                objRtn.A1830CODM6 = rs01.getString("A1830CODM6");

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            String err = e.toString();
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

    public String salesAccountMaintanceBINES(A1830Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX163S02A1830(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString("IN_ACTION", strOption);
            cs.setString("IN_A1830CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A1830PREFI", filter.A1830PREFI);
            cs.setString("IN_A1830BANCO", filter.A1830BANCO);
            cs.setString("IN_A1830PRODU", filter.A1830PRODU);
            cs.setString("IN_A1830NATUR", filter.A1830NATUR);
            cs.setString("IN_A1830MARCA", filter.A1830MARCA);
            cs.setString("IN_A1830FINI", filter.A1830FINI);
            cs.setString("IN_A1830FFIN", filter.A1830FFIN);

            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FEC", Functions.getFechaActual());
            cs.setString("IN_HOR", Functions.getHoraActual());
            cs.setString("IN_A1830PREFI_OLD", filter.A1830PREFI);

            cs.setString("IN_A1830CODNA", filter.A1830CODNA);
            cs.setString("IN_A1830CODMA", filter.A1830CODMA);
            cs.setString("IN_A1830CODM2", filter.A1830CODM2);
            cs.setString("IN_A1830CODM3", filter.A1830CODM3);
            cs.setString("IN_A1830CODM4", filter.A1830CODM4);
            cs.setString("IN_A1830CODM5", filter.A1830CODM5);
            cs.setString("IN_A1830CODM6", filter.A1830CODM6);

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
