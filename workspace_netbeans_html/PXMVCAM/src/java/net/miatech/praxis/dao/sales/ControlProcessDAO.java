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
import net.miatech.beans.PX036S02A1530Filter;
import net.miatech.beans.PX036S03A1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ControlProcessDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ControlProcessDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ControlProcessDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX036S02A1530Filter> loadPX036S02A1530(PX036S02A1530Filter filter) throws SQLException, Exception {
        List<PX036S02A1530Filter> lstRtn = new ArrayList<>(0);
        PX036S02A1530Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S02A1530(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_FECHA);
            cstmt01.setInt(2, filter.VP_TIPO);
            cstmt01.setString(3, filter.VP_A1530FUENT);
            cstmt01.setString(4, filter.VP_A1530PSVTA);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S02A1530Filter();
                objRtn.VL_DATE_PROC_00 = rs01.getString("DATE_PROC_00");
                objRtn.VL_DATE_PROC = rs01.getString("DATE_PROC");
                objRtn.VL_RECEIVED = rs01.getInt("RECEIVED");
                objRtn.VL_GROUP_ACOUNT = rs01.getInt("GROUP_ACOUNT");
                objRtn.VL_GROUP_NOT_ACOUNT = rs01.getInt("GROUP_NOT_ACOUNT");
                objRtn.VL_GROUP_ASIG = rs01.getInt("GROUP_ASIG");
                objRtn.VL_GROUP_NOT_ASIG = rs01.getInt("GROUP_NOT_ASIG");

                objRtn.VL_RECEIVED_TOT = rs01.getInt("RECEIVED_TOT");
                objRtn.VL_GROUP_ACOUNT_TOT = rs01.getInt("GROUP_ACOUNT_TOT");
                objRtn.VL_GROUP_NOT_ACOUNT_TOT = rs01.getInt("GROUP_NOT_ACOUNT_TOT");
                objRtn.VL_GROUP_ASIG_TOT = rs01.getInt("GROUP_ASIG_TOT");
                objRtn.VL_GROUP_NOT_ASIG_TOT = rs01.getInt("GROUP_NOT_ASIG_TOT");

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

    public List<PX036S03A1530Filter> loadPX036S03A1530(PX036S03A1530Filter filter) throws SQLException, Exception {
        List<PX036S03A1530Filter> lstRtn = new ArrayList<>(0);
        PX036S03A1530Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S03A1530_1(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.setString(1, filter.VP_FECHA);
            cstmt01.setInt(2, filter.VP_TIPO);
            cstmt01.setString(3, filter.VP_A1530FUENT);
            cstmt01.setString(4, filter.VP_A1530PSVTA);
            cstmt01.setInt(5, filter.VP_INDICADOR);
            // param pagin
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            // Recupera paginacion SQL
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S03A1530Filter();
                objRtn.A1530CCUST = rs01.getString("A1530CCUST");
                objRtn.A1530PSVTA = rs01.getString("A1530PSVTA");
                objRtn.A1530GRUPO = rs01.getString("A1530GRUPO");
                objRtn.A1530CIUVT = rs01.getString("A1530CIUVT");
                objRtn.A1530BANCO = rs01.getString("A1530BANCO");
                objRtn.A1530AGENT = rs01.getString("A1530AGENT");
                objRtn.A1530TVENT = rs01.getString("A1530TVENT");
                objRtn.A1530FUENT = rs01.getString("A1530FUENT");
                objRtn.A1530SFUEN = rs01.getString("A1530SFUEN");
                objRtn.A1530FCONT = rs01.getString("A1530FCONT");
                objRtn.A1530IDCON = rs01.getString("A1530IDCON");
                objRtn.A1530FHAST = rs01.getString("A1530FHAST");
                objRtn.A1530FPROC = rs01.getString("A1530FPROC");
                objRtn.A1530MDA = rs01.getString("A1530MDA");
                objRtn.A1530POLGL = rs01.getString("A1530POLGL");
                objRtn.A1530POLAR = rs01.getString("A1530POLAR");
                objRtn.A1530POLAP = rs01.getString("A1530POLAP");
                objRtn.A1530STPRO_00 = rs01.getString("A1530STPRO_00");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
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
