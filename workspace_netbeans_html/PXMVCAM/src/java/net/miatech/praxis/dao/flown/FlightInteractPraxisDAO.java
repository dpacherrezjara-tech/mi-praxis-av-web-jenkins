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
import java.util.List;
import net.miatech.beans.PX038S01A1779Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class FlightInteractPraxisDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public FlightInteractPraxisDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FlightInteractPraxisDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

     public List<PX038S01A1779Filter> loadPX038S01A1797(PX038S01A1779Filter filter) throws SQLException, Exception {
        List<PX038S01A1779Filter> lstRtn = new ArrayList<>(0);
        PX038S01A1779Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //PX03800021
        String SQLCLL01 = "{CALL PX038S01A1779(?,?,?,?,?)}";       
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(2, Types.INTEGER);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);

            cstmt01.setString(1, filter.strFlightDate);
            cstmt01.setInt(2, filter.page.PAGNUM);
            cstmt01.setInt(3, filter.page.PAGROW);
            cstmt01.setInt(4, filter.page.TOTPAG);
            cstmt01.setInt(5, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(2);
            filter.page.PAGROW = cstmt01.getInt(3);
            filter.page.TOTPAG = cstmt01.getInt(4);
            filter.page.TOTROW = cstmt01.getInt(5);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX038S01A1779Filter();
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.CCIA = rs01.getString("CCIA");
                objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                //  objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                objRtn.DFLIGHT = Functions.getMonthConvert(rs01.getString("DFLIGHT"));
                objRtn.CDEPART = rs01.getString("CDEPART");
                objRtn.CARRIVA = rs01.getString("CARRIVA");
                objRtn.CARR = rs01.getString("CARR");
                objRtn.OBSERV = rs01.getString("OBSERV");
                //Pagin
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
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
