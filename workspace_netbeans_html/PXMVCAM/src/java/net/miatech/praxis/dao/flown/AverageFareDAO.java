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
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX086S01A1781Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.flown.A1803;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AverageFareDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AverageFareDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AverageFareDAO(IServerSession ss) {
        session = ss;
    }

    public List<PX086S01A1781Filter> loadPX086SQP0026(PX086S01A1781Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<PX086S01A1781Filter> lstRtn = new ArrayList<>(0);
        PX086S01A1781Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String fActual = Functions.getFechaActual();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0026(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A1781ORIG);
            cstmt01.setString(3, filter.VP_A1781DEST);
            cstmt01.setString(4, filter.VP_A1781RBD);
            cstmt01.setString(5, filter.VP_A1781FARE);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX086S01A1781Filter();
                objRtn.strTitulo = "Period included From " + Functions.getMonthConvert(rs01.getString("DPERI")) + " to " + Functions.getMonthConvert(rs01.getString("DPERF"));
                objRtn.VP_TFIL = filter.VP_TFIL;
                objRtn.A1781ORIG = rs01.getString("CITYO");
                objRtn.A1781DEST = rs01.getString("CITYD");
                if (hmAeropuertos.containsKey(rs01.getString("CITYO").trim().toUpperCase())) {
                    objRtn.strDescORIG = hmAeropuertos.get(rs01.getString("CITYO").trim()).toString();
                }
                if (hmAeropuertos.containsKey(rs01.getString("CITYD").trim().toUpperCase())) {
                    objRtn.strDescDEST = hmAeropuertos.get(rs01.getString("CITYD").trim()).toString();
                }
                objRtn.VP_A1781FARE = rs01.getString("FAREBASE");
                objRtn.A1781QCUPO = rs01.getInt("QTKT");
                objRtn.A1781TVALO = rs01.getDouble("VALOR");
                objRtn.A1781MONED = rs01.getString("CURRENC");
                objRtn.A1781PROME = rs01.getDouble("VALPRO");
                objRtn.A1781RBD = rs01.getString("BOOKI");
                //Paginación
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
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
    
    public List<A1803> loadPX086SQP00816(PX086S01A1781Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A1803> lstRtn = new ArrayList<>(0);
        A1803 objRtn;
        double totVAL = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00816(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A1781ORIG);
            cstmt01.setString(3, filter.A1781DEST);
            cstmt01.setString(4, filter.A1781RBD);
            cstmt01.setString(5, filter.VP_A1781FARE);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totVAL += (rs01.getDouble("VALOR"));
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1803();
                    objRtn.Titulo = " Route: " + rs01.getString("CITYO")
                            + "  -  " + rs01.getString("CITYD");
                    objRtn.strTicket = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + " " + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                    objRtn.CITYO = rs01.getString("CITYO");
                    objRtn.CITYD = rs01.getString("CITYD");
                    objRtn.BOOKI = rs01.getString("BOOKI");
                    objRtn.FAREBASE = rs01.getString("FAREBASE");
                    if (hmAeropuertos.containsKey(rs01.getString("CITYO").trim().toUpperCase())) {
                        objRtn.strDescORIG = hmAeropuertos.get(rs01.getString("CITYO").trim()).toString();
                    }
                    if (hmAeropuertos.containsKey(rs01.getString("CITYD").trim().toUpperCase())) {
                        objRtn.strDescDEST = hmAeropuertos.get(rs01.getString("CITYD").trim()).toString();
                    }
                    objRtn.DSALES = Functions.getMonthConvert(rs01.getString("DSALES"));
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.CLASE = rs01.getString("CLASE");
                    objRtn.CURRENC = rs01.getString("CURRENC");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.totVAL = totVAL;
                    //Pagin
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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
    public void setSession(IServerSession ss) {
        session = ss;
    }

}
