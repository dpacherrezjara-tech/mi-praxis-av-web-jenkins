/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A2537Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class WaiverDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public WaiverDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public WaiverDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2537Filter> lstsearch(A2537Filter filter) throws SQLException, Exception {
        List<A2537Filter> lstRtn = new ArrayList<A2537Filter>(0);
        A2537Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01443(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(20, Types.INTEGER);
            cstmt01.registerOutParameter(21, Types.INTEGER);
            cstmt01.registerOutParameter(22, Types.INTEGER);
            cstmt01.registerOutParameter(23, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FILTER);
            cstmt01.setString(3, filter.VP_Request1);
            cstmt01.setString(4, filter.VP_Request2);
            cstmt01.setString(5, filter.VP_Rfnd1);
            cstmt01.setString(6, filter.VP_Rfnd2);
            cstmt01.setString(7, filter.VP_Emission1);
            cstmt01.setString(8, filter.VP_Emission2);
            cstmt01.setString(9, filter.VP_Flown1);
            cstmt01.setString(10, filter.VP_Flown2);
            cstmt01.setString(11, filter.VP_System1);
            cstmt01.setString(12, filter.VP_System2);
            cstmt01.setString(13, filter.VP_IATA);
            cstmt01.setString(14, filter.VP_Frma);
            cstmt01.setString(15, filter.VP_Serie);
            cstmt01.setString(16, filter.VP_TourCode);
            cstmt01.setString(17, filter.VP_Country);
            cstmt01.setString(18, filter.VP_CodWeiver);
            cstmt01.setString(19, filter.A2537STAT);

            cstmt01.setInt(20, filter.page.PAGNUM);
            cstmt01.setInt(21, filter.page.PAGROW);
            cstmt01.setInt(22, filter.page.TOTPAG);
            cstmt01.setInt(23, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(20);
            filter.page.PAGROW = cstmt01.getInt(21);
            filter.page.TOTPAG = cstmt01.getInt(22);
            filter.page.TOTROW = cstmt01.getInt(23);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A2537Filter();

                objRtn.A2537CCUST = rs01.getString("A2537CCUST");
                objRtn.A2537TIKET = rs01.getString("A2537TIKET");
                objRtn.A2537KEY = rs01.getString("A2537KEY");
                objRtn.A2537ID = rs01.getString("A2537ID");
                objRtn.A2537CNTRY = rs01.getString("A2537CNTRY");
                objRtn.A2537APPS = rs01.getString("A2537APPS");
                objRtn.A2537APPR = rs01.getString("A2537APPR");
                objRtn.A2537APPE = rs01.getString("A2537APPE");
                objRtn.A2537DSOLI = rs01.getString("A2537DSOLI");
                objRtn.A2537ACTW = rs01.getString("A2537ACTW");
                objRtn.A2537DRFND = rs01.getString("A2537DRFND");
                objRtn.A2537DESC = rs01.getString("A2537DESC");
                objRtn.A2537DEMI = rs01.getString("A2537DEMI");
                objRtn.A2537DVOL = rs01.getString("A2537DVOL");
                objRtn.A2537AGENT = rs01.getString("A2537AGENT");
                objRtn.A2537NAGEN = rs01.getString("A2537NAGEN");
                objRtn.A2537IATA = rs01.getString("A2537IATA");
                objRtn.A2537CIA = rs01.getString("A2537CIA");
                objRtn.A2537FORMA = rs01.getString("A2537FORMA");
                objRtn.A2537SERIE = rs01.getString("A2537SERIE");
                objRtn.A2537TCODE = rs01.getString("A2537TCODE");
                objRtn.A2537CWAIV = rs01.getString("A2537CWAIV");
                objRtn.A2537PNR = rs01.getString("A2537PNR");
                objRtn.A2537FAPP = rs01.getString("A2537FAPP");
                objRtn.A2537MAPP = rs01.getString("A2537MAPP");
                objRtn.A2537TPAY = rs01.getString("A2537TPAY");
                objRtn.A2537MPAY = rs01.getString("A2537MPAY");
                objRtn.A2537FREB = rs01.getString("A2537FREB");
                objRtn.A2537MREB = rs01.getString("A2537MREB");
                objRtn.A2537RUTA = rs01.getString("A2537RUTA");
                objRtn.A2537NPAX = rs01.getString("A2537NPAX");
                objRtn.A2537NUPAX = rs01.getString("A2537NUPAX");
                objRtn.A2537CLASE = rs01.getString("A2537CLASE");
                objRtn.A2537OBS = rs01.getString("A2537OBS");
                objRtn.A2537RUTAF = rs01.getString("A2537RUTAF");
                objRtn.A2537INGRE = rs01.getString("A2537INGRE");
                objRtn.A2537FINGR = rs01.getString("A2537FINGR");
                objRtn.A2537HINGR = rs01.getString("A2537HINGR");
                objRtn.A2537MODIF = rs01.getString("A2537MODIF");
                objRtn.A2537FMODI = rs01.getString("A2537FMODI");
                objRtn.A2537HMODI = rs01.getString("A2537HMODI");
                objRtn.A2537STAT = rs01.getString("A2537STAT");
                objRtn.A2537NAMEF = rs01.getString("A2537NAMEF");

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

    public A2537Filter mantenimientoWaiver(A2537Filter filter) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01444(?,?, ?, ?,?, ?, ?, ?, ?, ?,?, ?, ?,?,?,?,?,?,?,?,?,?, ?, ?,?, ?, ?, ?, ?, ?,?, ?, ?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(37, Types.VARCHAR);//21
            cstmt01.registerOutParameter(38, Types.VARCHAR);

            cstmt01.setString(1, filter.VP_FILTER);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.A2537DSOLI);
            cstmt01.setString(4, filter.A2537DRFND);

            cstmt01.setString(5, filter.A2537DEMI);
            cstmt01.setString(6, filter.A2537DVOL);
            cstmt01.setString(7, filter.A2537CNTRY);
            cstmt01.setString(8, filter.A2537CCUST);
            cstmt01.setString(9, filter.A2537FORMA);
            cstmt01.setString(10, filter.A2537SERIE);
            cstmt01.setString(11, filter.A2537TCODE);
            cstmt01.setString(12, filter.A2537PNR);
            cstmt01.setString(13, filter.A2537IATA);
            cstmt01.setString(14, filter.A2537AGENT);
            cstmt01.setString(15, filter.A2537NAGEN);
            cstmt01.setString(16, filter.A2537NUPAX);
            cstmt01.setString(17, filter.A2537NPAX);
            cstmt01.setString(18, filter.A2537RUTA);
            cstmt01.setString(19, filter.A2537CLASE);
            cstmt01.setString(20, filter.A2537FAPP);
            cstmt01.setString(21, filter.A2537MAPP);
            cstmt01.setString(22, filter.A2537TPAY);
            cstmt01.setString(23, filter.A2537MPAY);
            cstmt01.setString(24, filter.A2537FREB);
            cstmt01.setString(25, filter.A2537MREB);
            cstmt01.setString(26, filter.A2537CWAIV);
            cstmt01.setString(27, filter.A2537APPS);
            cstmt01.setString(28, filter.A2537APPR);
            cstmt01.setString(29, filter.A2537APPE);
            cstmt01.setString(30, filter.A2537ACTW);
            cstmt01.setString(31, filter.A2537DESC);
            cstmt01.setString(32, filter.A2537KEY);
            cstmt01.setString(33, filter.A2537ID);

            cstmt01.setString(34, session.getUserView().getUserInfo().USR);
            cstmt01.setString(35, Functions.getFechaActual());
            cstmt01.setString(36, Functions.getHoraActual());

            cstmt01.execute();
            filter.dbException.SQLCODE = cstmt01.getString(37);
            filter.dbException.MESSAGE = cstmt01.getString(38);
        } finally {
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
        return filter;
    }
}
