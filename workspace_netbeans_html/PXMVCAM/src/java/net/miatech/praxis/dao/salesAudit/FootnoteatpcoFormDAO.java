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
import net.miatech.beans.SaleAudit.A2468Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class FootnoteatpcoFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public FootnoteatpcoFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FootnoteatpcoFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2468Filter> lstsearch(A2468Filter filter) throws SQLException, Exception {
        List<A2468Filter> lstRtn = new ArrayList<A2468Filter>(0);
        A2468Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXFARES.SQP01029(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setInt(1, filter.VP_FILTER);
            cstmt01.setString(2, filter.VP_FROM_FILTER);
            cstmt01.setString(3, filter.VP_TO_FILTER);
            cstmt01.setString(4, filter.VP_CARRIER);
            cstmt01.setString(5, filter.VP_TARNO);
            cstmt01.setString(6, filter.VP_FTNT);
            cstmt01.setString(7, filter.VP_LOC1);
            cstmt01.setString(8, filter.VP_LOC2);

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2468Filter();
                objRtn.A2468TARNO = rs01.getString("A2468TARNO");//Tarriff
                objRtn.A2468CXRCO = rs01.getString("A2468CXRCO");//Carrier
                objRtn.A2468FTNT = rs01.getString("A2468FTNT");//Footnote
                objRtn.A2468CATNO = rs01.getString("A2468CATNO");//Category
                objRtn.A2468LOC1 = rs01.getString("A2468LOC1");	//Loc1
                objRtn.A2468LOC2 = rs01.getString("A2468LOC2"); 	//Loc2
                objRtn.A2468FCLAS = rs01.getString("A2468FCLAS");//Fare Class/ Family
                objRtn.A2468OWRT = rs01.getString("A2468OWRT");	//One Way/ Round Trip
                objRtn.A2468RTGNO = rs01.getString("A2468RTGNO");//Routing Number
                objRtn.A2468EFF = rs01.getString("A2468EFF");	//Eff
                objRtn.A2468DISC = rs01.getString("A2468DISC");  //Disc
                objRtn.A2468INTBLS = rs01.getInt("A2468INTBLS");

                objRtn.A2468RECTY = rs01.getString("A2468RECTY");
                objRtn.A2468ACTIO = rs01.getString("A2468ACTIO");
                objRtn.A2468TARNO1 = rs01.getString("A2468TARNO1");
                objRtn.A2468SEQNO = rs01.getString("A2468SEQNO");
                objRtn.A2468EFF1 = rs01.getString("A2468EFF1");

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

    public List<A2468Filter> lst_searchTbls(A2468Filter filter) throws SQLException, Exception {
        List<A2468Filter> lstRtn = new ArrayList<A2468Filter>(0);
        A2468Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXFARES.SQP01030(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_RECTY);
            cstmt01.setString(2, filter.VP_ACTIO);
            cstmt01.setString(3, filter.VP_TARNO);
            cstmt01.setString(4, filter.VP_CARRIER);
            cstmt01.setString(5, filter.VP_FTNT);
            cstmt01.setString(6, filter.VP_CATNO);
            cstmt01.setString(7, filter.VP_SEQNO);
            cstmt01.setString(8, filter.VP_EFF);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2468Filter();
                objRtn.A2468TABLE = rs01.getString("A2468TABLE");
                objRtn.A2468LOGIC = rs01.getString("A2468LOGIC");
                objRtn.A2468CATNO = rs01.getString("A2468CATNO");
                objRtn.A2468INFORMATION = rs01.getString("A2468INFORMATION");

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
