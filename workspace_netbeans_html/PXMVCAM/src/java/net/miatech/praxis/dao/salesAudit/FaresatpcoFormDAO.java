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
import net.miatech.beans.SaleAudit.A2393Filter;
import net.miatech.beans.SaleAudit.A2419Filter;
import net.miatech.beans.SaleAudit.A2468Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class FaresatpcoFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public FaresatpcoFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FaresatpcoFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2419Filter> lstsearch(A2419Filter filter) throws SQLException, Exception {
        List<A2419Filter> lstRtn = new ArrayList<A2419Filter>(0);
        A2419Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXFARES.SQP01010(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, filter.VP_FROM_FILTER);
            cstmt01.setString(2, filter.VP_ORIGIN);
            cstmt01.setString(3, filter.VP_DESTIN);
            cstmt01.setString(4, filter.VP_CARRIER);
            cstmt01.setString(5, filter.VP_FARECLASS);
            cstmt01.setString(6, filter.V_PAX);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2419Filter();
                objRtn.A2419CXRCD = rs01.getString("A2419CXRCD");
                objRtn.A2419FCLAS = rs01.getString("A2419FCLAS");
                objRtn.A2419OCITY = rs01.getString("A2419OCITY");
                objRtn.A2419DCITY = rs01.getString("A2419DCITY");
                objRtn.A2419TARNO = rs01.getString("A2419TARNO");
                objRtn.A2419RULNO = rs01.getString("A2419RULNO");
                objRtn.A2419OWRT = rs01.getString("A2419OWRT");
                objRtn.A2419TARDT = rs01.getString("A2419TARDT");
                objRtn.A2419DISC = rs01.getString("A2419DISC");
                objRtn.A2419FTNT = rs01.getString("A2419FTNT");
                objRtn.A2419TARDT1 = rs01.getString("A2419TARDT1");
                objRtn.A2419TARNO1 = rs01.getString("A2419TARNO1");
                objRtn.A2419FARE = rs01.getInt("A2419FARE");
                objRtn.A2419DECIMAL = rs01.getInt("A2419DECIMAL");
                objRtn.A2419MONEDA = rs01.getString("A2419MONEDA");
                objRtn.A2419RTGNO = rs01.getString("A2419RTGNO");
                objRtn.A2419GLBL = rs01.getString("A2419GLBL");
                if (objRtn.A2419DECIMAL > 0) {
                    objRtn.A2419FAREFINAL = objRtn.A2419FARE / Math.pow(10, objRtn.A2419DECIMAL);
                } else {
                    objRtn.A2419FAREFINAL = (double) objRtn.A2419FARE;
                }

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

    public List<A2393Filter> loadFareRuleSearch(A2393Filter filter) throws SQLException, Exception {
        List<A2393Filter> lstRtn = new ArrayList<A2393Filter>(0);
        A2393Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXFARES.SQP01070(?, ?, ?, ?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_TARNO);
            cstmt01.setString(2, filter.VP_CARRIER);
            cstmt01.setString(3, filter.VP_RULNO);
            cstmt01.setString(4, filter.VP_EFF);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2393Filter();
                objRtn.A2393TARNO = rs01.getString("A2393TARNO");//Tarriff
                objRtn.A2393CXRCO = rs01.getString("A2393CXRCO");//Carrier
                objRtn.A2393RULNO = rs01.getString("A2393RULNO");//Rule
                objRtn.A2393CATNO = rs01.getString("A2393CATNO");//Category
                objRtn.A2393LOC1 = rs01.getString("A2393LOC1");	//Loc1
                objRtn.A2393LOC2 = rs01.getString("A2393LOC2"); 	//Loc2
                objRtn.A2393FCLAS = rs01.getString("A2393FCLAS");//Fare Class/ Family
                objRtn.A2393FTYPE = rs01.getString("A2393FTYPE");//Fare Type
                objRtn.A2393STYPE = rs01.getString("A2393STYPE");//Season Type
                objRtn.A2393DTYPE = rs01.getString("A2393DTYPE");//Day Type
                objRtn.A2393OWRT = rs01.getString("A2393OWRT");	//One Way/ Round Trip
                objRtn.A2393RTGNO = rs01.getString("A2393RTGNO");//Routing Number
                objRtn.A2393FTNT = rs01.getString("A2393FTNT");	//Foot Note
                objRtn.A2393EFFE = rs01.getString("A2393EFFE");	//Eff
                objRtn.A2393DISC = rs01.getString("A2393DISC");  //Disc
                objRtn.A2393GEAPP = rs01.getString("A2393GEAPP");//General Rule

                objRtn.A2393RECTY = rs01.getString("A2393RECTY");
                objRtn.A2393ACTIO = rs01.getString("A2393ACTIO");
                objRtn.A2393TARNO1 = rs01.getString("A2393TARNO1");
                objRtn.A2393SEQNO = rs01.getString("A2393SEQNO");
                objRtn.A2393EFFE1 = rs01.getString("A2393EFFE1");

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

    public List<A2468Filter> loadFareFootSearch(A2468Filter filter) throws SQLException, Exception {
        List<A2468Filter> lstRtn = new ArrayList<A2468Filter>(0);
        A2468Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXFARES.SQP01071(?, ?, ?, ?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_TARNO);
            cstmt01.setString(2, filter.VP_CXRCO);
            cstmt01.setString(3, filter.VP_FTNT);
            cstmt01.setString(4, filter.VP_EFF);

            cstmt01.execute();

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

                objRtn.A2468RECTY = rs01.getString("A2468RECTY");
                objRtn.A2468ACTIO = rs01.getString("A2468ACTIO");
                objRtn.A2468TARNO1 = rs01.getString("A2468TARNO1");
                objRtn.A2468SEQNO = rs01.getString("A2468SEQNO");
                objRtn.A2468EFF1 = rs01.getString("A2468EFF1");

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

    public List<A2393Filter> loadTableRuleSearch(A2393Filter filter) throws SQLException, Exception {
        List<A2393Filter> lstRtn = new ArrayList<A2393Filter>(0);
        A2393Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXFARES.SQP01009(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_RECTY);
            cstmt01.setString(2, filter.VP_ACTIO);
            cstmt01.setString(3, filter.VP_TARNO);
            cstmt01.setString(4, filter.VP_CARRIER);
            cstmt01.setString(5, filter.VP_RULNO);
            cstmt01.setString(6, filter.VP_CATNO);
            cstmt01.setString(7, filter.VP_SEQNO);
            cstmt01.setString(8, filter.VP_FCLAS);
            cstmt01.setString(9, filter.VP_EFF);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2393Filter();
                objRtn.A2393TABLE = rs01.getString("A2393TABLE");
                objRtn.A2393LOGIC = rs01.getString("A2393LOGIC");
                objRtn.A2393CATNO = rs01.getString("A2393CATNO");
                objRtn.A2393INFORMATION = rs01.getString("A2393INFORMATION");

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

    public List<A2468Filter> loadTableFootSearch(A2468Filter filter) throws SQLException, Exception {
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
