/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A3093Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;
import java.sql.Connection;
import java.sql.Types;

/**
 *
 * @author zperez
 */
public class ControlBsplinkFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public ControlBsplinkFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ControlBsplinkFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3093Filter> SearchReport(A3093Filter filter) throws SQLException, Exception {
        List<A3093Filter> lstRtn = new ArrayList<A3093Filter>(0);
        A3093Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP01836(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_COUNTRY);
            cstmt01.setString(4, filter.VP_DATE1.replaceAll("/", ""));
            cstmt01.setString(5, filter.VP_DETE2.replaceAll("/", ""));
            cstmt01.setString(6, filter.VP_FLAG);

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
                objRtn = new A3093Filter();
                objRtn.A3093CCUST = rs01.getString("A3093CCUST");
                objRtn.A3093PAIS = rs01.getString("A3093PAIS");
                objRtn.A3093CORRL = rs01.getString("A3093CORRL");
                objRtn.A3093USER = rs01.getString("A3093USER");
                objRtn.A3093PASS = rs01.getString("A3093PASS");
                objRtn.A3093URL = rs01.getString("A3093URL");
                objRtn.A3093NPAIS = rs01.getString("A3093NPAIS");
                objRtn.A3093EFECT = rs01.getString("A3093EFECT");
                objRtn.A3093DESCO = rs01.getString("A3093DESCO");
                objRtn.A3093FLAG = rs01.getString("A3093FLAG");
                objRtn.A3093REGIS = rs01.getString("A3093REGIS");
                objRtn.A3093FREGI = rs01.getString("A3093FREGI");
                objRtn.A3093HREGI = rs01.getString("A3093HREGI");
                objRtn.A3093REVIS = rs01.getString("A3093REVIS");
                objRtn.A3093FREVI = rs01.getString("A3093FREVI");
                objRtn.A3093HREVI = rs01.getString("A3093HREVI");
                objRtn.A3093ESTA = rs01.getString("A3093ESTA");
                objRtn.A3093CUENT = rs01.getString("A3093CUENT");
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

    public String ProcesaMantenimiento(A3093Filter beanGuardar) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00953(?,?,?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL PXSAUDIT.SQP01838(?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cs.registerOutParameter(8, Types.VARCHAR);
            cs.registerOutParameter(9, Types.VARCHAR);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, beanGuardar.VP_OPTION);
            cs.setString(3, beanGuardar.A3093PAIS);
            cs.setString(4, beanGuardar.A3093USER);
            cs.setString(5, beanGuardar.A3093PASS);
            cs.setString(6, beanGuardar.A3093CORRL);
            cs.setString(7, beanGuardar.A3093FLAG);
            cs.execute();
            STR_RESULT = cs.getString(9);//rst.getString("VMESSAGE");encryptPassword(

            if (!cs.getString(8).equals("0")) {
                return STR_RESULT;
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
