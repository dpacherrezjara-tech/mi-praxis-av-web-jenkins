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
import net.miatech.beans.SaleAudit.A3406Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author lremicio
 */
public class BwrRefundUserMaintenanceDAO {
    
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public BwrRefundUserMaintenanceDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BwrRefundUserMaintenanceDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A3406Filter> SearchRefundUser(A3406Filter filter) throws SQLException, Exception {
        List<A3406Filter> lstRtn = new ArrayList<A3406Filter>(0);
        A3406Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02521(?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(6, filter.IN_COUNTRY);
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
                objRtn = new A3406Filter();
                objRtn.A3406CCUST = rs01.getString("A3406CCUST");
                objRtn.A3406USER = rs01.getString("A3406USER");
                objRtn.A3406PAIS = rs01.getString("A3406PAIS");
                objRtn.A3406FLAG = rs01.getString("A3406FLAG");
                objRtn.A3406DESCR = rs01.getString("A3406DESCR");
                objRtn.A3406FALTA = rs01.getString("A3406FALTA");
                objRtn.A3406FBAJA = rs01.getString("A3406FBAJA");
                objRtn.A3406REGIS = rs01.getString("A3406REGIS");
                objRtn.A3406FREGI = rs01.getString("A3406FREGI");
                objRtn.A3406HREGI = rs01.getString("A3406HREGI");
                objRtn.A3406REVIS = rs01.getString("A3406REVIS");
                objRtn.A3406FREVI = rs01.getString("A3406FREVI");
                objRtn.A3406HREVI = rs01.getString("A3406HREVI");

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
    
    public String insertTKT(A3406Filter filter) throws SQLException, Exception {
        String strRtn = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02522(?,?,?,?,?,?,?,?,?,?)}";
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
                cstmt01.setString(3, filter.A3406DESCR);
                cstmt01.setString(4, filter.A3406USER);
                cstmt01.setString(5, filter.A3406PAIS);
                cstmt01.setString(6, filter.A3406FLAG);
                cstmt01.setString(7, filter.A3406FALTA);

                cstmt01.setString(8, strUsuario);
                cstmt01.setString(9, strFecha);
                cstmt01.setString(10, strHora);
                cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                strRtn = rs01.getString("VMESSAGE");
            }            

        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            strRtn=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            strRtn=e.getMessage();
        }finally {
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
    
}
