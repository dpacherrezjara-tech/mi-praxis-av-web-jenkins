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
import net.miatech.beans.SaleAudit.A3951Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class NocomparativeReportFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public NocomparativeReportFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public NocomparativeReportFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3951Filter> Search(A3951Filter filter) throws SQLException, Exception {
        List<A3951Filter> lstRtn = new ArrayList<A3951Filter>(0);
        A3951Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP03918(?,?,?,?,?,?,?,?,?,?,?)}";

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
                objRtn = new A3951Filter();
                if (filter.IN_TYPE.equals("1")) {
                    objRtn.A3951CCUST = rs01.getString("A3951CCUST");
                    objRtn.A3951PAIS = rs01.getString("A3951PAIS");
                    objRtn.A3951IATA = rs01.getString("A3951IATA");
                    objRtn.A3951IATANAME = rs01.getString("A3951IATANAME");
                    objRtn.A3951FDESC = rs01.getString("A3951FDESC");
                    objRtn.A3951CORRL = rs01.getString("A3951CORRL");
                    objRtn.A3951TVTA = rs01.getString("A3951TVTA");
                    objRtn.A3951MDA = rs01.getString("A3951MDA");

                    objRtn.A3951PERIO = rs01.getString("A3951PERIO");
                    objRtn.A3951PER = rs01.getString("A3951PER");
                    objRtn.A3951STAT = rs01.getString("A3951STAT");
                    objRtn.A3951FLAG = rs01.getString("A3951FLAG");
                    objRtn.A3951REGIS = rs01.getString("A3951REGIS");
                    objRtn.A3951FREGI = rs01.getString("A3951FREGI");
                    objRtn.A3951HREGI = rs01.getString("A3951HREGI");
                    objRtn.A3951REVIS = rs01.getString("A3951REVIS");
                    objRtn.A3951FREVI = rs01.getString("A3951FREVI");
                    objRtn.A3951HREVI = rs01.getString("A3951HREVI");

                    objRtn.A3951CASH = rs01.getDouble("A3951CASH");
                    objRtn.A3951CTUC = rs01.getDouble("A3951CTUC");
                    objRtn.A3951CCAD = rs01.getDouble("A3951CCAD");
                    objRtn.A3951EPAY = rs01.getDouble("A3951EPAY");
                    objRtn.A3951CAMS = rs01.getDouble("A3951CAMS");
                    objRtn.A3951CCMS = rs01.getDouble("A3951CCMS");
                    objRtn.A3951NETO = rs01.getDouble("A3951NETO");
                    objRtn.A3951PROCE = rs01.getDouble("A3951PROCE");
                    objRtn.A3951PC = rs01.getInt("A3951PC");
                } else {
                    if (!filter.IN_OPTION.equals("3")) {
                        objRtn.A3951CCUST = rs01.getString("A3951CCUST");
                        objRtn.A3951PAIS = rs01.getString("A3951PAIS");
                        objRtn.A3951CANTI = rs01.getInt("A3951CANTI");
                        objRtn.A3951FLAG = rs01.getString("A3951FLAG");
                        objRtn.A3951STATO = rs01.getString("A3951STATO");
                        objRtn.A3951TOTAL = rs01.getInt("TOTAL");
                        objRtn.A3951FREGI = rs01.getString("A3951FREGI");
                        objRtn.A3951PERIO = rs01.getString("A3951PERIO");
                    } else {
                        objRtn.A3951CCUST = rs01.getString("A3951CCUST");
                        objRtn.A3951PAIS = rs01.getString("A3951PAIS");
                        objRtn.A3951IATA = rs01.getString("A3951IATA");
                        objRtn.A3951IATANAME = rs01.getString("A3951IATANAME");
                        objRtn.A3951FDESC = rs01.getString("A3951FDESC");
                        objRtn.A3951CORRL = rs01.getString("A3951CORRL");
                        objRtn.A3951TVTA = rs01.getString("A3951TVTA");
                        objRtn.A3951MDA = rs01.getString("A3951MDA");

                        objRtn.A3951PERIO = rs01.getString("A3951PERIO");
                        objRtn.A3951STAT = rs01.getString("A3951STAT");
                        objRtn.A3951FLAG = rs01.getString("A3951FLAG");
                        objRtn.A3951REGIS = rs01.getString("A3951REGIS");
                        objRtn.A3951FREGI = rs01.getString("A3951FREGI");
                        objRtn.A3951HREGI = rs01.getString("A3951HREGI");
                        objRtn.A3951REVIS = rs01.getString("A3951REVIS");
                        objRtn.A3951FREVI = rs01.getString("A3951FREVI");
                        objRtn.A3951HREVI = rs01.getString("A3951HREVI");

                        objRtn.A3951CASH = rs01.getDouble("A3951CASH");
                        objRtn.A3951CTUC = rs01.getDouble("A3951CTUC");
                        objRtn.A3951CCAD = rs01.getDouble("A3951CCAD");
                        objRtn.A3951EPAY = rs01.getDouble("A3951EPAY");
                        objRtn.A3951CAMS = rs01.getDouble("A3951CAMS");
                        objRtn.A3951CCMS = rs01.getDouble("A3951CCMS");
                        objRtn.A3951NETO = rs01.getDouble("A3951NETO");
                        objRtn.A3951PROCE = rs01.getDouble("A3951PROCE");
                        objRtn.A3951PER = rs01.getString("A3951PER");
                        objRtn.A3951PC = rs01.getInt("A3951PC");
                        objRtn.A3951TOTAL = rs01.getInt("TOTAL");
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
