/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.discharges;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX544S01A3963Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author jmeiggs
 */
public class ObservedCouponsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ObservedCouponsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ObservedCouponsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX544S01A3963Filter> loadPX549S01A1747(PX544S01A3963Filter filter) throws SQLException, Exception {
        List<PX544S01A3963Filter> lstRtn = new ArrayList<>(0);
        PX544S01A3963Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03902(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_FECHAFROM);
            cstmt01.setString(3, filter.IN_FECHATO);
            cstmt01.setString(4, filter.IN_TKT);
            //param pagin
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);
            cstmt01.execute();
            // Recupera paginacion SQL
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX544S01A3963Filter();
                objRtn.FCONT = rs01.getString("FCONT");
                objRtn.FVTA = rs01.getString("FVTA");
                objRtn.CCIA = rs01.getString("CCIA");
                objRtn.FORMASERIE = rs01.getString("FORMASERIE");
                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.TIPOC = rs01.getString("TIPOC");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FTE = rs01.getString("FTE");
                objRtn.AGTIA = rs01.getString("AGTIA");
                objRtn.PSVVTA = rs01.getString("PSVVTA");
                objRtn.CDOC = rs01.getString("CDOC");
                objRtn.CDEPART = rs01.getString("CDEPART");
                objRtn.CARRIVA = rs01.getString("CARRIVA");
                objRtn.CARR = rs01.getString("CARR");
                objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                objRtn.MDACP = rs01.getString("MDACP");
                objRtn.VCPN = rs01.getDouble("VCPN");
                objRtn.COMISI = rs01.getDouble("COMISI");
                objRtn.SCOMISI = rs01.getDouble("SCOMISI");
                objRtn.YQ = rs01.getDouble("YQ");
                
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
