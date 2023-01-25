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
import net.miatech.beans.SaleAudit.A3907Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class LoadticketReportFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public LoadticketReportFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public LoadticketReportFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3907Filter> search(A3907Filter filter) throws SQLException, Exception {
        List<A3907Filter> lstRtn = new ArrayList<A3907Filter>(0);
        A3907Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03730(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_STATUS);
            cstmt01.setString(6, filter.IN_TICKET);
            cstmt01.setString(7, filter.IN_IATA);
            cstmt01.setString(8, filter.IN_COUNTRY);

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
                objRtn = new A3907Filter();

                objRtn.A3907CCUST = rs01.getString("A3907CCUST");
                objRtn.A3907TKT = rs01.getString("A3907TKT");
                objRtn.A3907CORRL = rs01.getString("A3907CORRL");
                objRtn.A3907PAIS = rs01.getString("A3907PAIS");
                objRtn.A3907IATA = rs01.getString("A3907IATA");
                objRtn.A3907NOMAGENCY = rs01.getString("A3907NOMAGENCY");
                objRtn.A3907PREME = rs01.getString("A3907PREME");
                objRtn.A3907NUMER = rs01.getString("A3907NUMER");
                objRtn.A3907FAUTO = rs01.getString("A3907FAUTO");
                objRtn.A3907HAUTO = rs01.getString("A3907HAUTO");
                objRtn.A3907FLAG = rs01.getString("A3907FLAG");
                objRtn.A3907REGIS = rs01.getString("A3907REGIS");
                objRtn.A3907FREGI = rs01.getString("A3907FREGI");
                objRtn.A3907HREGI = rs01.getString("A3907HREGI");
                objRtn.A3907REVIS = rs01.getString("A3907REVIS");
                objRtn.A3907FREVI = rs01.getString("A3907FREVI");
                objRtn.A3907HREVI = rs01.getString("A3907HREVI");
                objRtn.A3907STATR = rs01.getString("A3907STATR");

                objRtn.A3907TARID = rs01.getDouble("A3907TARID");
                objRtn.A3907COMID = rs01.getDouble("A3907COMID");
                objRtn.A3907PORCD = rs01.getDouble("A3907PORCD");
                objRtn.A3907TTAXD = rs01.getDouble("A3907TTAXD");
                objRtn.A3907PENAD = rs01.getDouble("A3907PENAD");
                objRtn.A3907PORPD = rs01.getDouble("A3907PORPD");
                objRtn.A3907NETO = rs01.getDouble("A3907NETO");

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

    public String subirExcel(ArrayList<A3907Filter> filter) throws SQLException, ClassNotFoundException, Exception {

        String mensaje = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03731(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        ResultSet rst = null;
        session.getCNXIBMDB2().open();
        //cnx = session.getCNXIBMDB2().getIBMDB2Connection();

        try {
            //cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A3907Filter obj : filter) {
                //INSERTAR DATOS A LA TABLA
                cstmt01.registerOutParameter(7, Types.VARCHAR);
                cstmt01.registerOutParameter(8, Types.VARCHAR);

                cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt01.setString(2, obj.IN_TICKET);
                cstmt01.setString(3, obj.IN_IATA);
                cstmt01.setString(4, obj.IN_COUNTRY);
                cstmt01.setString(5, obj.IN_NUMER);
                cstmt01.setDouble(6, obj.A3907NETO);
                cstmt01.execute();
                obj.dbException.SQLCODE = cstmt01.getString(7);
                obj.dbException.MESSAGE = cstmt01.getString(8);
                mensaje = obj.dbException.MESSAGE;

                if (!obj.dbException.SQLCODE.equals("0")) {
                    mensaje = obj.dbException.MESSAGE;
                    break;
                }
            }
            cstmt01.close();

        } catch (SQLException e) {
            if (cnx != null) {
                cnx.rollback();
            }
            mensaje = "ERROR DE INSERCION";
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            mensaje = "ERROR DE INSERCION";
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        }

        return mensaje;

    }

    public String mantenimiento(ArrayList<A3907Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP03732(?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A3907Filter obj : filter) {

                cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cs.setString(2, obj.A3907TKT);
                cs.setString(3, obj.A3907CORRL);

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

    public String procedimiento() throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP03733(?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cs.execute();
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
