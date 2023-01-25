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
import net.miatech.beans.A1880Filter;
import net.miatech.beans.A1881Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class CommissionsFOBDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CommissionsFOBDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CommissionsFOBDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1880Filter> loadPX159S01A1880(A1880Filter filter) throws SQLException, Exception {
        List<A1880Filter> lstRtn = new ArrayList<A1880Filter>(0);
        A1880Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX159S01A1880(?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();         
        try {

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1880CCUST);
            cstmt01.setString(2, filter.IN_A1880FECHA);

            cstmt01.setInt(3, PAGINIT);
            cstmt01.setInt(4, totRowsPag);
            cstmt01.setInt(5, totRows);
            cstmt01.setInt(6, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(5)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(6);
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
            while (rs01.next()) {
                objRtn = new A1880Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1880CCUST = rs01.getString("A1880CCUST");
                objRtn.A1880FECHA = Functions.getMonthConvertDate(rs01.getString("A1880FECHA"));
                objRtn.A1880NFACT = rs01.getString("A1880NFACT");
                objRtn.A1880UNID = rs01.getString("A1880UNID");
                objRtn.A1880INDAP = rs01.getString("A1880INDAP");
                objRtn.A1880PROV = rs01.getString("A1880PROV");
                objRtn.A1880SUPR = rs01.getString("A1880SUPR");
                objRtn.A1880FFACT = Functions.getMonthConvertDate(rs01.getString("A1880FFACT"));
                objRtn.A1880MONED = rs01.getString("A1880MONED");
                objRtn.A1880ACTIV = rs01.getDouble("A1880ACTIV");
                objRtn.A1880PASIV = rs01.getDouble("A1880PASIV");

                //Pagination
                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (Exception ex) {
            String err = ex.toString();
        }//
        finally {
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

    public List<A1881Filter> loadPX159S01A1881(A1881Filter filter) throws SQLException, Exception {
        List<A1881Filter> lstRtn = new ArrayList<A1881Filter>(0);
        A1881Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX159S01A1881(?,?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();         
        try {

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1881CCUST);
            cstmt01.setString(2, filter.IN_A1881FECHA);
            cstmt01.setString(3, filter.IN_A1881NFACT);

            cstmt01.setInt(4, PAGINIT);
            cstmt01.setInt(5, totRowsPag);
            cstmt01.setInt(6, totRows);
            cstmt01.setInt(7, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(6)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(7);
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
            while (rs01.next()) {
                objRtn = new A1881Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1881CUENT = rs01.getString("A1881CUENT");
                objRtn.A1881FECHA = Functions.getMonthConvertDate(rs01.getString("A1881FECHA"));
                objRtn.A1881NFACT = rs01.getString("A1881NFACT");
                objRtn.A1881DESCR = rs01.getString("A1881DESCR");
                objRtn.A1881ACTIV = rs01.getDouble("A1881ACTIV");
                objRtn.A1881PASIV = rs01.getDouble("A1881PASIV");

                //Pagination
                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (Exception ex) {
            String err = ex.toString();
        }//
        finally {
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
