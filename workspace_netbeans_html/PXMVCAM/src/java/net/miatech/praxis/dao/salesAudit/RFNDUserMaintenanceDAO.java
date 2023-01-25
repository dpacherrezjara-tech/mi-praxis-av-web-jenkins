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
import net.miatech.beans.SaleAudit.A3650Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RFNDUserMaintenanceDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public RFNDUserMaintenanceDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RFNDUserMaintenanceDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A3650Filter> SearchRefundUser(A3650Filter filter) throws SQLException, Exception {
        List<A3650Filter> lstRtn = new ArrayList<A3650Filter>(0);
        A3650Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP03093(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_STATUS);
            cstmt01.setString(6, filter.IN_AREA);
            cstmt01.setString(7, filter.IN_USER);

            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3650Filter();
                objRtn.A3650CCUST = rs01.getString("A3650CCUST");
                objRtn.A3650USER = rs01.getString("A3650USER");
                objRtn.A3650AREA = rs01.getString("A3650AREA");
                objRtn.A3650PAIS = rs01.getString("A3650PAIS");
                objRtn.A3650FLAG = rs01.getString("A3650FLAG");
                objRtn.A3650NAME = rs01.getString("A3650NAME");
                objRtn.A3650AREACOD = rs01.getString("A3650AREACOD");
                objRtn.A3650DESCR = rs01.getString("A3650DESCR");
                objRtn.A3650FALTA = rs01.getString("A3650FALTA");
                objRtn.A3650FBAJA = rs01.getString("A3650FBAJA");
                objRtn.A3650REGIS = rs01.getString("A3650REGIS");
                objRtn.A3650FREGI = rs01.getString("A3650FREGI");
                objRtn.A3650HREGI = rs01.getString("A3650HREGI");
                objRtn.A3650REVIS = rs01.getString("A3650REVIS");
                objRtn.A3650FREVI = rs01.getString("A3650FREVI");
                objRtn.A3650HREVI = rs01.getString("A3650HREVI");

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
    
    public String insertTKT(A3650Filter filter) throws SQLException, Exception {
        String strRtn = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP03094(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        String strUsuario, strFecha, strHora;
        try {
            strUsuario = session.getUserView().getUserInfo().USR;
            strFecha = Functions.getFechaActual();
            strHora = Functions.getHoraActual();

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
                
                cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt01.setString(2, filter.IN_OPTION);
                cstmt01.setString(3, filter.A3650NAME);
                cstmt01.setString(4, filter.A3650USER);
                cstmt01.setString(5, filter.A3650AREA);
                cstmt01.setString(6, filter.A3650FLAG);
                cstmt01.setString(7, filter.A3650FALTA);

                cstmt01.setString(8, strUsuario);
                cstmt01.setString(9, strFecha);
                cstmt01.setString(10, strHora);
                cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                strRtn = rs01.getString("VMESSAGE");
            }            

        } catch (Exception e) {
            //strRtn = "";
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    if (cnx != null) //cnx.rollback();
                    {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    if (cnx != null) //cnx.rollback();
                    {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return strRtn;
    }
    
    public List<A3389Filter> loadDataInit() throws SQLException, Exception {
        List<A3389Filter> lstRtn = new ArrayList<A3389Filter>(0);
        A3389Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP04582(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, "2");
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3389Filter();
                objRtn.A3389REGAS = rs01.getString("A3650USER");
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

}
