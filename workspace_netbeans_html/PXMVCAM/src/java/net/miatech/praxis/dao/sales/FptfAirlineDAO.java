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
import java.util.logging.Level;
import net.miatech.beans.PX019S01A004Filter;
import net.miatech.beans.PX019S01A823Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A881;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class FptfAirlineDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public FptfAirlineDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FptfAirlineDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX019S01A004Filter> loadPX019S01A004(PX019S01A004Filter filter) throws SQLException, Exception {
        List<PX019S01A004Filter> lstRtn = new ArrayList<>(0);
        PX019S01A004Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX019S01A004(?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);

            cstmt01.setString(1, filter.IN_CAMPO);
            cstmt01.setString(2, filter.IN_VALOR);
            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX019S01A004Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A004FORMA = rs01.getString("A004FORMA");
                objRtn.A004TIPODO = rs01.getString("A004TIPODO");
                objRtn.A004NROCUP = rs01.getInt("A004NROCUP");
                objRtn.FORMTYPE = rs01.getString("FORMTYPE");
                objRtn.FORMUSE = rs01.getString("FORMUSE");
                objRtn.SALESTYPE = rs01.getString("SALESTYPE");
                objRtn.METHOD = rs01.getString("METHOD");
                objRtn.SCN = rs01.getString("SCN");
                objRtn.DESCRIPTIO = rs01.getString("DESCRIPTIO");
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
