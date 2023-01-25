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

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class MinimunRuleDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public MinimunRuleDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public MinimunRuleDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX019S01A025Filter> loadPX019S01A025(PX019S01A025Filter filter) throws SQLException, Exception {
        List<PX019S01A025Filter> lstRtn = new ArrayList<>(0);
        PX019S01A025Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
      
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX019S01A025(?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(2, Types.INTEGER);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A025KEY);
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
                objRtn = new PX019S01A025Filter();
                objRtn.NO = rs01.getInt("NO");
                objRtn.A025KEY = rs01.getString("A025KEY");
                objRtn.A025COEFIC = rs01.getDouble("A025COEFIC");
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
