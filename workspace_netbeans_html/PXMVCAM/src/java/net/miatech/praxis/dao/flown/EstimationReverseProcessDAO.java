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
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1716Filter;
import net.miatech.beans.A2166Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class EstimationReverseProcessDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public EstimationReverseProcessDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public EstimationReverseProcessDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1716Filter> loadEstimationControl(A1716Filter filter) throws SQLException, Exception {
        List<A1716Filter> lstRtn = new ArrayList<>(0);
        A1716Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02251(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.A1716CCUST);
            cstmt01.setString(2, filter.A1716FFILE);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            // A1716FFILE A1716CIA A1716FORMA A1716SERIE A1716CUPON A1716SUBFU A1716CUR
            while (rs01.next()) {
                objRtn = new A1716Filter();
                objRtn.QTY = rs01.getInt(("TOTAL"));
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

    public List<A2166Filter> loadResultadoDownload(A2166Filter filter) throws SQLException, Exception {
        List<A2166Filter> lstRtn = new ArrayList<>(0);
        A2166Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00636(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_FPROC);
            cstmt01.setString(2, filter.IN_TIPO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A2166Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.FPROC = rs01.getString("FPROC").trim();
                objRtn.AIRLIN = rs01.getString("AIR").trim();
                objRtn.CARRIER = rs01.getString("CARRIER").trim();
                objRtn.CUENTA = rs01.getString("CIA").trim();
                objRtn.POLIZA_GL = rs01.getString("POLIZA_GL").trim();

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

    public List<A2166Filter> getTramaFile(A2166Filter filter) throws SQLException, Exception {
        List<A2166Filter> lstRtn = new ArrayList<A2166Filter>(0);
        A2166Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00637(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.FPROC);
            cstmt01.setString(2, filter.AIRLIN);
            cstmt01.setString(3, filter.CARRIER);
            cstmt01.setString(4, filter.CUENTA);
            cstmt01.setString(5, filter.IN_TIPO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A2166Filter();
                objRtn.CADENA = rs01.getString("CADENA").trim();
                objRtn.NCAMPO = rs01.getString("NCAMPO").trim();

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
