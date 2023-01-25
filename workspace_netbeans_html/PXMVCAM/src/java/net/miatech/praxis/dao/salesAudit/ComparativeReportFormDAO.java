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
import net.miatech.beans.SaleAudit.A3950Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class ComparativeReportFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public ComparativeReportFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ComparativeReportFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3950Filter> Search(A3950Filter filter) throws SQLException, Exception {
        List<A3950Filter> lstRtn = new ArrayList<A3950Filter>(0);
        A3950Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP03917(?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(5, filter.IN_IATA);
            cstmt01.setString(6, filter.IN_COUNTRY);
            cstmt01.setString(7, filter.IN_TYPE);

            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3950Filter();
                if (filter.IN_TYPE.equals("1")) {
                    objRtn.A3950CCUST = rs01.getString("A3950CCUST");
                    objRtn.A3950PAIS = rs01.getString("A3950PAIS");
                    objRtn.A3950IATA = rs01.getString("A3950IATA");
                    objRtn.A3950IATANAME = rs01.getString("A3950IATANAME");
                    objRtn.A3950PERIO = rs01.getString("A3950PERIO");
                    objRtn.A3950CORRL = rs01.getString("A3950CORRL");
                    objRtn.A3950TVTA = rs01.getString("A3950TVTA");
                    objRtn.A3950MDA = rs01.getString("A3950MDA");
                    objRtn.A3950STAT = rs01.getString("A3950STAT");
                    objRtn.A3950FLAG = rs01.getString("A3950FLAG");
                    objRtn.A3950REGIS = rs01.getString("A3950REGIS");
                    objRtn.A3950FREGI = rs01.getString("A3950FREGI");
                    objRtn.A3950HREGI = rs01.getString("A3950HREGI");
                    objRtn.A3950REVIS = rs01.getString("A3950REVIS");
                    objRtn.A3950FREVI = rs01.getString("A3950FREVI");
                    objRtn.A3950HREVI = rs01.getString("A3950HREVI");

                    objRtn.A3950SALE = rs01.getDouble("A3950SALE");
                    objRtn.A3950NETO = rs01.getDouble("A3950NETO");
                    objRtn.A3950RANGO = rs01.getDouble("A3950RANGO");
                    objRtn.A3950PC = rs01.getInt("A3950PC");
                } else {
                    if (!filter.IN_OPTION.equals("3")) {
                        objRtn.A3950CCUST = rs01.getString("A3950CCUST");
                        objRtn.A3950PAIS = rs01.getString("A3950PAIS");
                        objRtn.A3950CANTI = rs01.getInt("A3950CANTI");
                        objRtn.A3950FLAG = rs01.getString("A3950FLAG");
                        objRtn.A3950STATO = rs01.getString("A3950STATO");
                        objRtn.A3950TOTAL = rs01.getInt("TOTAL");
                        objRtn.A3950FREGI = rs01.getString("A3950FREGI");
                    } else {
                        objRtn.A3950CCUST = rs01.getString("A3950CCUST");
                        objRtn.A3950PAIS = rs01.getString("A3950PAIS");
                        objRtn.A3950IATA = rs01.getString("A3950IATA");
                        objRtn.A3950IATANAME = rs01.getString("A3950IATANAME");
                        objRtn.A3950PERIO = rs01.getString("A3950PERIO");
                        objRtn.A3950CORRL = rs01.getString("A3950CORRL");
                        objRtn.A3950TVTA = rs01.getString("A3950TVTA");
                        objRtn.A3950MDA = rs01.getString("A3950MDA");
                        objRtn.A3950STAT = rs01.getString("A3950STAT");
                        objRtn.A3950FLAG = rs01.getString("A3950FLAG");
                        objRtn.A3950REGIS = rs01.getString("A3950REGIS");
                        objRtn.A3950FREGI = rs01.getString("A3950FREGI");
                        objRtn.A3950HREGI = rs01.getString("A3950HREGI");
                        objRtn.A3950REVIS = rs01.getString("A3950REVIS");
                        objRtn.A3950FREVI = rs01.getString("A3950FREVI");
                        objRtn.A3950HREVI = rs01.getString("A3950HREVI");

                        objRtn.A3950SALE = rs01.getDouble("A3950SALE");
                        objRtn.A3950NETO = rs01.getDouble("A3950NETO");
                        objRtn.A3950RANGO = rs01.getDouble("A3950RANGO");
                        objRtn.A3950PC = rs01.getInt("A3950PC");
                         objRtn.A3950TOTAL = rs01.getInt("TOTAL");
                    }
                }
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

}
