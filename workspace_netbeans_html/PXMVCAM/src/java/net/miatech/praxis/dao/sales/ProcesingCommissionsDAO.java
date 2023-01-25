/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1769Filter;
import net.miatech.beans.A1805Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ProcesingCommissionsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ProcesingCommissionsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ProcesingCommissionsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1769Filter> loadZonas() throws SQLException, Exception {
        List<A1769Filter> lstRtn = new ArrayList<>(0);
        A1769Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX214S01A1769}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1769Filter();
                objRtn.A1769DESC = rs01.getString("A1769DESC");
                objRtn.A1769VALOR = rs01.getString("A1769VALOR");
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

    public String getPX214S01A1878(A1805Filter filter) throws SQLException, Exception {
        String sRtn = "";

        CallableStatement cstmt01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX214S01A1878(?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().openNative();
        try {
            cstmt01 = session.getCNXIBMDB2().getIBMDB2Connection().prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(12, Types.VARCHAR);

            cstmt01.setString(1, filter.IN_A1805CCUST);
            cstmt01.setString(2, filter.IN_A1805APL);
            cstmt01.setString(3, filter.IN_A1805CLIEN);
            cstmt01.setString(4, filter.IN_A1805POLIZ);
            cstmt01.setString(5, filter.IN_A1805FECHA);
            cstmt01.setString(6, filter.IN_A1805BATCH);
            cstmt01.setString(7, filter.IN_A1805PROGA);
            cstmt01.setString(8, filter.IN_A1805MODO);
            cstmt01.setString(9, filter.IN_A1805FILE);
            cstmt01.setString(10, session.getUserView().getUserInfo().USR);
            cstmt01.setString(11, filter.IN_PARAM);
            cstmt01.setString(12, filter.OU_A1805STATU);
            cstmt01.execute();

            sRtn = cstmt01.getString("IN_A1805STATU");
            //sRtn = "C";

        } catch (SQLException ex) {
            String data = ex.getMessage();
        } catch (Exception e) {
            String data = e.getMessage();
        } finally {
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }

        return sRtn;
    }

    public List<A1805Filter> downloadText(String filter) throws SQLException, Exception {
        List<A1805Filter> lstRtn = new ArrayList<>(0);
        A1805Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX158S02A1717(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A1805Filter();

                objRtn.OU_TRAMATXT = rs01.getString("LOTE");
                objRtn.OU_TRAMATXT = objRtn.OU_TRAMATXT.trim();
                String[] line = objRtn.OU_TRAMATXT.split("\\|");

                BigDecimal doFix;
                int intFix = 0;
                boolean flg = false;
                String tipo = "";

                if (filter.substring(0, 3).equals("L27")) {
                    if (line[18].toString().trim().length() > 0) {
                        doFix = new BigDecimal(line[18].toString());
                        if (doFix == (new BigDecimal(0))) {
                            line[18] = "";
                        } else {
                            line[18] = String.valueOf(doFix);
                        }
                    }

                    if (line[19].toString().trim().length() > 0) {
                        doFix = new BigDecimal(line[19].toString());
                        if (doFix == (new BigDecimal(0))) {
                            line[19] = "";
                        } else {
                            line[19] = String.valueOf(doFix);
                        }
                    }

                    if (line[24].toString().trim().length() > 0) {
                        doFix = new BigDecimal(line[24].toString());
                        if (doFix == (new BigDecimal(0))) {
                            line[24] = "";
                        } else {
                            line[24] = String.valueOf(doFix);
                        }
                    }
                }

                if (filter.substring(0, 3).equals("L30")) {
                    if (line[6].toString().trim().length() > 0) {
                        doFix = new BigDecimal(line[6].toString());
                        if (doFix == (new BigDecimal(0))) {
                            line[6] = "";
                        } else {
                            line[6] = String.valueOf(doFix);
                        }
                    }

                    if (line[12].toString().trim().length() > 0) {
                        doFix = new BigDecimal(line[12].toString());
                        if (doFix == (new BigDecimal(0))) {
                            line[12] = "";
                        } else {
                            line[12] = String.valueOf(doFix);
                        }
                    }
                }

                if (filter.substring(0, 3).equals("L31")) {
                    if (line[2].toString().trim().length() > 0) {
                        doFix = new BigDecimal(line[2].toString());
                        if (doFix == (new BigDecimal(0))) {
                            line[2] = "";
                        } else {
                            line[2] = String.valueOf(doFix);
                        }
                    }
                }

                if (filter.substring(0, 3).equals("L27")) {
                    objRtn.OU_TRAMATXT = join(line, "|") + "|";
                } else {
                    objRtn.OU_TRAMATXT = join(line, "|");
                }

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

    public static String join(String[] list, String delim) {

        StringBuilder sb = new StringBuilder();
        String loopDelim = "";
        for (String s : list) {
            sb.append(loopDelim);
            sb.append(s);
            loopDelim = delim;
        }
        return sb.toString();
    }

}
