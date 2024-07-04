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
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.beans.PX019S01A721Filter;

import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.sales.AgentsMasterFileDAO.pasarGarbageCollector;
import net.miatech.praxis.exceptions.SpringException;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class FareBasisDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public FareBasisDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FareBasisDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX019S01A721Filter> loadPX019S01A721(PX019S01A721Filter filter) throws SQLException, Exception {
        List<PX019S01A721Filter> lstRtn = new ArrayList<>(0);
        PX019S01A721Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

       

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX019S01A721(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_AIRLIN);
            cstmt01.setString(3, filter.IN_FBASIS);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX019S01A721Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A721AIRLIN = rs01.getString("A721AIRLIN");
                objRtn.A721AIRLN2 = rs01.getString("A721AIRLN2");
                objRtn.A721FBASIS = rs01.getString("A721FBASIS");
                objRtn.A721CODIGO = rs01.getString("A721CODIGO");
                objRtn.A721CLASE = rs01.getString("A721CLASE");
                objRtn.A721TEMPOR = rs01.getString("A721TEMPOR");
                objRtn.A721SEMANA = rs01.getString("A721SEMANA");
                objRtn.A721DIA = rs01.getString("A721DIA");
                objRtn.A721CODTRF = rs01.getString("A721CODTRF");
                objRtn.A721CODATP = rs01.getString("A721CODATP");
                objRtn.A721TIPIAT = rs01.getString("A721TIPIAT");
                objRtn.A721TIPTRF = rs01.getString("A721TIPTRF");
                objRtn.A721CANVLD = rs01.getString("A721CANVLD");
                objRtn.A721INDVLD = rs01.getString("A721INDVLD");
                objRtn.A721CANMIN = rs01.getString("A721CANMIN");
                objRtn.A721NVLTRF = rs01.getString("A721NVLTRF");
                objRtn.A721GI = rs01.getString("A721GI");
                objRtn.A721RBD = rs01.getString("A721RBD");
                objRtn.A721OBS = rs01.getString("A721OBS");
                objRtn.A721VIGEN = rs01.getString("A721VIGEN");
                objRtn.A721TERMI = rs01.getString("A721TERMI");
                objRtn.A721REGIST = rs01.getString("A721REGIST");
                objRtn.A721FREGIS = rs01.getString("A721FREGIS");
                objRtn.A721HREGIS = rs01.getString("A721AIRLIN");
                objRtn.A721TREGIS = rs01.getString("A721HREGIS");
                objRtn.A721REVISA = rs01.getString("A721REVISA");
                objRtn.A721FREVIS = rs01.getString("A721FREVIS");
                objRtn.A721HREVIS = rs01.getString("A721HREVIS");
                objRtn.A721TREVIS = rs01.getString("A721TREVIS");
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
    
    public int ValidationDownload(PX019S01A721Filter filter) throws SQLException, Exception {
        List<PX019S01A721Filter> lstRtn = new ArrayList<>(0);
        PX019S01A721Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX019S01A721(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_AIRLIN);
            cstmt01.setString(3, filter.IN_FBASIS);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();

        } 
        finally {
            setClose();
        }

        return filter.page.TOTROW;
    }
    
    private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }
    
    
}
