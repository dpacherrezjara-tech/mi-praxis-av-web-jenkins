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
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.Functions;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author lremicio
 */
public class BwrTaskAssignmentDAO {
    
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();
    
    public BwrTaskAssignmentDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BwrTaskAssignmentDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A3389Filter> SearchGroupTaskAssignment(A3389Filter filter) throws SQLException, Exception {
        List<A3389Filter> lstRtn = new ArrayList<A3389Filter>(0);
        A3389Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02593(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_USER);
            cstmt01.setString(5, filter.IN_COUNTRY);
            cstmt01.setString(6, filter.IN_DOCUMET);
            cstmt01.setString(7, filter.IN_FORMA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3389Filter();
                objRtn.A3389REGAS = rs01.getString("A3389REGAS");
                objRtn.A3389CANTPEDI = rs01.getString("PEDIEN");
                objRtn.A3389CANTPROC = rs01.getString("PROCE");
                 objRtn.A3389FAPPI = rs01.getString("A3389FAPPI");
                objRtn.A3389SEMAF = rs01.getString("RN");
                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
    
    public List<A3389Filter> SearchTaskAssignment(A3389Filter filter) throws SQLException, Exception {
        List<A3389Filter> lstRtn = new ArrayList<A3389Filter>(0);
        A3389Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02588(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_CIA);
            cstmt01.setString(4, filter.IN_FORMA);
            cstmt01.setString(5, filter.IN_SERIE);
            cstmt01.setString(6, filter.IN_SEQ);
            cstmt01.setString(7, filter.IN_DOCUMET);
            cstmt01.setString(8, filter.IN_DATEFROM);
            cstmt01.setString(9, filter.IN_DATETO);
            cstmt01.setString(10, filter.IN_COUNTRY);
            cstmt01.setString(11, filter.IN_STATUS);
            cstmt01.setString(12, filter.IN_USER);
            cstmt01.setString(13, filter.IN_IATA);

            cstmt01.setInt(14, filter.page.PAGNUM);
            cstmt01.setInt(15, filter.page.PAGROW);
            cstmt01.setInt(16, filter.page.TOTPAG);
            cstmt01.setInt(17, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(14);
            filter.page.PAGROW = cstmt01.getInt(15);
            filter.page.TOTPAG = cstmt01.getInt(16);
            filter.page.TOTROW = cstmt01.getInt(17);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3389Filter();
                objRtn.A3389REGAS = rs01.getString("A3389REGAS");
                objRtn.A3389PAIS = rs01.getString("A3389PAIS");
                objRtn.A3389FREAS = rs01.getString("A3389FREAS");
                objRtn.A3389CANTPEDI = rs01.getString("PEDIEN");
                objRtn.A3389CANTPROC = rs01.getString("PROCE");
                // A2548EMISION
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
    
    public List<A3389Filter> SearchTaskAssignmentDetail(A3389Filter filter) throws SQLException, Exception {
        List<A3389Filter> lstRtn = new ArrayList<A3389Filter>(0);
        A3389Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02756(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_DOCUMET);
            cstmt01.setString(6, filter.IN_FORMA);
            cstmt01.setString(7, filter.IN_STATUS);
            cstmt01.setString(8, filter.IN_COUNTRY);
            cstmt01.setString(9, "99");//filter.IN_ROBOT
            cstmt01.setString(10, filter.IN_USER);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3389Filter();
                objRtn.A3389CCUST = rs01.getString("A3389CCUST");
                objRtn.A3389REGAS = rs01.getString("A3389REGAS");
                objRtn.A3389PAIS = rs01.getString("A3389PAIS");
                objRtn.A3389NUMER = rs01.getString("A3389NUMER");
                objRtn.A3389PREME = rs01.getString("A3389PREME");
                objRtn.A3389FLAG = rs01.getString("A3389FLAG");
                objRtn.A3389FREAS = rs01.getString("A3389FREAS");

                lstRtn.add(objRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
    
    public String insertAuditor(ArrayList<A3389Filter> filter, String Auditor) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00953(?,?,?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL PXSAUDIT.SQP02589(?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A3389Filter obj : filter) {

                cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);

                cs.setString("IN_A3389REGAS", obj.A3389REGAS);
                cs.setString("IN_A3389NUMER", obj.A3389NUMER);
                cs.setString("IN_A3389PAIS", obj.A3389PAIS);
                cs.setString("IN_A3389FREAS", obj.A3389FREAS);
                cs.setString("IN_A3389FLAG", obj.A3389FLAG);
                cs.setString("IN_A3389PREME", obj.A3389PREME);
                cs.setString("IN_NewAuditor", Auditor);

                cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
                cs.setString("IN_FREGI", Functions.getFechaActual());
                cs.setString("IN_HREGI", Functions.getHoraActual());
                //cs.setString("IN_OLD", filter.CAMPO);

                cs.execute();
            }
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }
    
}
