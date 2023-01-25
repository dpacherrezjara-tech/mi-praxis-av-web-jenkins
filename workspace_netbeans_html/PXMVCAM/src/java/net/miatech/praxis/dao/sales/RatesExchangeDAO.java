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
import net.miatech.beans.A018Filter;
import net.miatech.beans.A110Filter;
import net.miatech.beans.A1343Filter;
import net.miatech.beans.A1526Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class RatesExchangeDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public RatesExchangeDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RatesExchangeDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A018Filter> loadPX025S03A018(A018Filter filter) throws SQLException, Exception {
        List<A018Filter> lstRtn = new ArrayList<>(0);
        A018Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX025S03A018(?,?,?,?,?,?,?,?)}";
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setInt("IN_TIPO", filter.IN_TIPO);
            cstmt01.setString("IN_CURR", filter.IN_CURR);
            cstmt01.setString("IN_DATE", filter.IN_DATE);
            cstmt01.setString("IN_DATE_2", filter.IN_DATE_2);

            //Paginado
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
            int i = 0;
            while (rs01.next()) {
                objRtn = new A018Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A018ISO = rs01.getString("A018ISO");
                objRtn.A018DATE = rs01.getString("A018DATE");
                objRtn.A018XEU = rs01.getDouble("A018XEU");
                objRtn.A018GBP = rs01.getDouble("A018GBP");
                objRtn.A018URATE = rs01.getDouble("A018URATE");

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

    public List<A110Filter> loadPX025S01A110(A110Filter filter) throws SQLException, Exception {
        List<A110Filter> lstRtn = new ArrayList<>(0);
        A110Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX025S01A110(?,?,?,?,?,?,?,?)}";
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setInt("IN_TIPO", filter.IN_TIPO);
            cstmt01.setString("IN_CURR", filter.IN_CURR);
            cstmt01.setString("IN_DATE", filter.IN_DATE);
            cstmt01.setString("IN_DATE_2", filter.IN_DATE_2);

            //Paginado
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
            int i = 0;
            while (rs01.next()) {
                objRtn = new A110Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A110ISO = rs01.getString("A110ISO");
                objRtn.A110DATE = rs01.getString("A110DATE");
                objRtn.A110XEU = rs01.getDouble("A110XEU");
                objRtn.A110GBP = rs01.getDouble("A110GBP");
                objRtn.A110URATE = rs01.getDouble("A110URATE");

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

    public List<A1343Filter> loadPX025S03A1343(A1343Filter filter) throws SQLException, Exception {
        List<A1343Filter> lstRtn = new ArrayList<A1343Filter>(0);
        A1343Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX025S03A1343(?,?,?,?,?,?,?,?,?)}";
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setInt("IN_TIPO", filter.IN_TIPO);
            cstmt01.setString("IN_CURR_FROM", filter.IN_CURR_FROM);
            cstmt01.setString("IN_CURR_TO", filter.IN_CURR_TO);
            cstmt01.setString("IN_DATE", filter.IN_DATE);
            cstmt01.setString("IN_DATE_2", filter.IN_DATE_2);

            //Paginado
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
            int i = 0;
            while (rs01.next()) {
                objRtn = new A1343Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1343CUR = rs01.getString("A1343CUR");
                objRtn.A1343CUR2 = rs01.getString("A1343CUR2");
                objRtn.A1343DIS = rs01.getString("A1343DIS");
                objRtn.A1343RATE = rs01.getDouble("A1343RATE");
                objRtn.A13431RATE = rs01.getDouble("A13431RATE");

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

    public List<A1526Filter> loadPX025S01A1526(A1526Filter filter) throws SQLException, Exception {
        List<A1526Filter> lstRtn = new ArrayList<>(0);
        A1526Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX025S01A1526(?,?,?,?,?,?,?,?,?)}";
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setInt("IN_TIPO", filter.IN_TIPO);
            cstmt01.setString("IN_CURR_FROM", filter.IN_CURR_FROM);
            cstmt01.setString("IN_CURR_TO", filter.IN_CURR_TO);
            cstmt01.setString("IN_DATE", filter.IN_DATE);
            cstmt01.setString("IN_DATE_2", filter.IN_DATE_2);

            //Paginado
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
            int i = 0;
            while (rs01.next()) {
                objRtn = new A1526Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1526CUR = rs01.getString("A1526CUR");
                objRtn.A1526CUR2 = rs01.getString("A1526CUR2");
                objRtn.A1526DIS = rs01.getString("A1526DIS");
                objRtn.A1526RATE = rs01.getDouble("A1526RATE");

                objRtn.A1526UCRE = rs01.getString("A1526UCRE");
                objRtn.A1526DCRE = rs01.getString("A1526DCRE");
                objRtn.A1526TCRE = rs01.getString("A1526TCRE");

                objRtn.A1526UUPD = rs01.getString("A1526UUPD");
                objRtn.A1526DUPD = rs01.getString("A1526DUPD");
                objRtn.A1526TUPD = rs01.getString("A1526TUPD");

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
    
    public List<A1526Filter> loadPX025S01A4061(A1526Filter filter) throws SQLException, Exception {
        List<A1526Filter> lstRtn = new ArrayList<>(0);
        A1526Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04162(?,?,?,?,?,?,?,?,?)}";
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setInt("IN_TIPO", filter.IN_TIPO);
            cstmt01.setString("IN_CURR_FROM", filter.IN_CURR_FROM);
            cstmt01.setString("IN_CURR_TO", filter.IN_CURR_TO);
            cstmt01.setString("IN_DATE", filter.IN_DATE);
            cstmt01.setString("IN_DATE_2", filter.IN_DATE_2);

            //Paginado
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
            int i = 0;
            while (rs01.next()) {
                objRtn = new A1526Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1526CUR = rs01.getString("A1526CUR");
                objRtn.A1526CUR2 = rs01.getString("A1526CUR2");
                objRtn.A1526DIS = rs01.getString("A1526DIS");
                objRtn.A1526RATE = rs01.getDouble("A1526RATE");

                objRtn.A1526UCRE = rs01.getString("A1526UCRE");
                objRtn.A1526DCRE = rs01.getString("A1526DCRE");
                objRtn.A1526TCRE = rs01.getString("A1526TCRE");

                objRtn.A1526UUPD = rs01.getString("A1526UUPD");
                objRtn.A1526DUPD = rs01.getString("A1526DUPD");
                objRtn.A1526TUPD = rs01.getString("A1526TUPD");

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

    public String SQP00820(A1526Filter filter, String strOption) throws SQLException, Exception {

        String strSQL;
        String STR_RESULT = "";

        try {
            session.getCNXIBMDB2().open();
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00820(?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cs.setString("IN_ACTION", strOption);
            cs.setString("IN_A1526CUR", filter.A1526CUR);
            cs.setString("IN_A1526CUR2", filter.A1526CUR2);
            cs.setString("IN_A1526DIS", filter.A1526DIS);
            cs.setDouble("IN_A1526RATE", filter.A1526RATE);

            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FEC", Functions.getFechaActual());
            cs.setString("IN_HOR", Functions.getHoraActual());

            cs.setString("IN_A1526CUR_OLD", filter.IN_A1526CUR_OLD);
            cs.setString("IN_A1526CUR2_OLD", filter.IN_A1526CUR2_OLD);
            cs.setString("IN_A1526DIS_OLD", filter.IN_A1526DIS_OLD);

            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

}
