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
import net.miatech.beans.SaleAudit.A2390Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class FareclassatpcoFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public FareclassatpcoFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FareclassatpcoFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2390Filter> lstsearch(A2390Filter filter) throws SQLException, Exception {
        List<A2390Filter> lstRtn = new ArrayList<A2390Filter>(0);
        A2390Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXFARES.SQP01007(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setInt(1, filter.VP_FILTER);
            cstmt01.setString(2, filter.VP_FROM_FILTER);
            cstmt01.setString(3, filter.VP_CARRIER);
            cstmt01.setString(4, filter.VP_CARRIER1);
            cstmt01.setString(5, filter.VP_CARRIER2);
            cstmt01.setString(6, filter.VP_TARRIF);
            cstmt01.setString(7, filter.VP_RULE);
            cstmt01.setString(8, filter.VP_FARECLASS);
            cstmt01.setString(9, filter.VP_FARECLASS1);

            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2390Filter();
                objRtn.A2390CCOD = rs01.getString("A2390CCOD");
                objRtn.A2390TARNO = rs01.getString("A2390TARNO");
                objRtn.A2390RULNO = rs01.getString("A2390RULNO");
                objRtn.A2390FCLAS = rs01.getString("A2390FCLAS");
                objRtn.A2390OWRT = rs01.getString("A2390OWRT");
                objRtn.A2390FARET = rs01.getString("A2390FARET");
                objRtn.A2390DICAT = rs01.getString("A2390DICAT");
                objRtn.A2390LLOC1 = rs01.getString("A2390LLOC1");
                objRtn.A2390LLOC2 = rs01.getString("A2390LLOC2");
                objRtn.A2390SEAS = rs01.getString("A2390SEAS");
                objRtn.A2390DOWT = rs01.getString("A2390DOWT");
                objRtn.A2390DEFEC = rs01.getString("A2390DEFEC");
                objRtn.A2390DDISC = rs01.getString("A2390DDISC");
                objRtn.A2390PRCAT = rs01.getString("A2390PRCAT");
                objRtn.A2390RTGNO = rs01.getString("A2390RTGNO");
                objRtn.A2390FTNT = rs01.getString("A2390FTNT");
                objRtn.A2390RBD = rs01.getString("A2390RBD");
                objRtn.A2390DI = rs01.getString("A2390DI");
                objRtn.A2390TYPE = rs01.getString("A2390TYPE");
                objRtn.A2390TKTCO = rs01.getString("A2390TKTCO");
                objRtn.A2390TCM = rs01.getString("A2390TCM");
                objRtn.A2390TKTDE = rs01.getString("A2390TKTDE");
                objRtn.A2390TDM = rs01.getString("A2390TDM");
                objRtn.A2390AMIN = rs01.getString("A2390AMIN");
                objRtn.A2390AMAX = rs01.getString("A2390AMAX");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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
