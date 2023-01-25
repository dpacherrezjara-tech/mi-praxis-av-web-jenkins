/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1744Filter;
import net.miatech.beans.A1952Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.payments.IntalmentSalesDAO.pasarGarbageCollector;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ZoneAverageRatesDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ZoneAverageRatesDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ZoneAverageRatesDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1692Filter> loadSQP04262(A1692Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        cnx = null;
        A1692Filter row = null;
        List<A1692Filter> lista = new ArrayList<>();

        String SQLCLL01;
        try {
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04262(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEF);
            cstmt.setString(3, filter.IN_DATET);
            cstmt.setString(4, filter.IN_ZONA);
            cstmt.setString(5, filter.IN_CCIA);
            cstmt.setString(6, filter.IN_DATE);
            cstmt.setString(7, filter.FLAG_ALL);
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                row = new A1692Filter();

//                row.IN_DATEF = filter.IN_DATEF;
//                row.IN_DATET = filter.IN_DATET;
                row.IN_DATE = filter.IN_DATE;

                row.DATE = rs01.getString("DATE");
                row.IN_DATEF = row.DATE;
                row.IN_DATET = row.DATE;

                row.ZONA = rs01.getString("ZONA");
                row.DESCZONA = Functions.getNombreZonas(row.ZONA);
                row.COD_DESC_ZONA = row.ZONA + " - " + row.DESCZONA;
                row.MDACP = rs01.getString("MDACP");
                row.QTY_CUPONES = rs01.getInt("QTY_CUPONES");
                row.QTY_CUPONES_CONT = rs01.getInt("QTY_CUPONES_CONT");
                row.QTY_CUPONES_PEND = rs01.getInt("QTY_CUPONES_PEND");
                row.VALOR_CUPONES_CONT = rs01.getDouble("VALOR_CUPONES_CONT");
                row.VALOR_CUPONES_PEND = rs01.getDouble("VALOR_CUPONES_PEND");
                row.PROMEDIO_CUPONES_CONT = rs01.getDouble("PROMEDIO_CUPONES_CONT");
                row.PROMEDIO_CUPONES_PEND = rs01.getDouble("PROMEDIO_CUPONES_PEND");
                row.IN_ZONA = row.ZONA;

                lista.add(row);
            }

            rs01.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List<A1692Filter> loadSQP04263(A1692Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        cnx = null;
        A1692Filter row = null;
        List<A1692Filter> lista = new ArrayList<>();

        String SQLCLL01;
        try {
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04263(?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEF);
            cstmt.setString(3, filter.IN_DATET);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.FLAG_ALL);
            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                row = new A1692Filter();
                row.IN_DATE = filter.IN_DATE;
                row.RN = rs01.getInt("RN");
                row.DATE = rs01.getString("DATE");
                row.ZONA = rs01.getString("ZONA");
                row.DESCZONA = Functions.getNombreZonas(row.ZONA);
                row.COD_DESC_ZONA = row.ZONA + " - " + row.DESCZONA;
                row.MDACP = rs01.getString("MDACP");
                row.QTY_CUPONES = rs01.getInt("QTY_CUPONES");
                row.QTY_CUPONES_CONT = rs01.getInt("QTY_CUPONES_CONT");
                row.QTY_CUPONES_PEND = rs01.getInt("QTY_CUPONES_PEND");
                row.VALOR_CUPONES_CONT = rs01.getDouble("VALOR_CUPONES_CONT");
                row.VALOR_CUPONES_PEND = rs01.getDouble("VALOR_CUPONES_PEND");
                row.PROMEDIO_CUPONES_CONT = rs01.getDouble("PROMEDIO_CUPONES_CONT");
                row.PROMEDIO_CUPONES_PEND = rs01.getDouble("PROMEDIO_CUPONES_PEND");
                row.page.PAGNUM = filter.page.PAGNUM;
                row.page.PAGROW = filter.page.PAGROW;
                row.page.TOTPAG = filter.page.TOTPAG;
                row.page.TOTROW = filter.page.TOTROW;

                lista.add(row);
            }

            rs01.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List<A1692Filter> loadSQP04264(A1692Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        cnx = null;
        A1692Filter row = null;
        List<A1692Filter> lista = new ArrayList<>();

        String SQLCLL01;
        try {
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04264(?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEF);
            cstmt.setString(3, filter.IN_DATET);
            cstmt.setString(4, filter.IN_CCIA);
            cstmt.setString(5, filter.IN_DATE);
            cstmt.setString(6, filter.FLAG_ALL);
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                row = new A1692Filter();

//                row.IN_DATEF = filter.IN_DATEF;
//                row.IN_DATET = filter.IN_DATET;
                row.IN_DATE = filter.IN_DATE;

                row.DATE = rs01.getString("DATE");
                row.IN_DATEF = row.DATE;
                row.IN_DATET = row.DATE;

                row.AVRG_ASI = rs01.getDouble("AVRG_ASI");
                row.AVRG_CAM = rs01.getDouble("AVRG_CAM");
                row.AVRG_CAN = rs01.getDouble("AVRG_CAN");
                row.AVRG_CAR = rs01.getDouble("AVRG_CAR");
                row.AVRG_EUR = rs01.getDouble("AVRG_EUR");
                row.AVRG_FRO = rs01.getDouble("AVRG_FRO");
                row.AVRG_LOC = rs01.getDouble("AVRG_LOC");
                row.AVRG_PLA = rs01.getDouble("AVRG_PLA");
                row.AVRG_SUD = rs01.getDouble("AVRG_SUD");
                row.AVRG_USA = rs01.getDouble("AVRG_USA");

                lista.add(row);
            }

            rs01.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List<A1692Filter> loadSQP04265(A1692Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        cnx = null;
        A1692Filter row = null;
        List<A1692Filter> lista = new ArrayList<>();

        String SQLCLL01;
        try {
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04265(?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEF);
            cstmt.setString(3, filter.IN_CCIA);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.FLAG_ALL);
            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);
            cstmt.execute();
            
            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                row = new A1692Filter();

//                row.IN_DATEF = filter.IN_DATEF;
//                row.IN_DATET = filter.IN_DATET;
                row.IN_DATE = filter.IN_DATE;

                row.DATE = rs01.getString("DATE");
                row.IN_DATEF = row.DATE;
                row.IN_DATET = row.DATE;

                row.AVRG_ASI = rs01.getDouble("AVRG_ASI");
                row.AVRG_CAM = rs01.getDouble("AVRG_CAM");
                row.AVRG_CAN = rs01.getDouble("AVRG_CAN");
                row.AVRG_CAR = rs01.getDouble("AVRG_CAR");
                row.AVRG_EUR = rs01.getDouble("AVRG_EUR");
                row.AVRG_FRO = rs01.getDouble("AVRG_FRO");
                row.AVRG_LOC = rs01.getDouble("AVRG_LOC");
                row.AVRG_PLA = rs01.getDouble("AVRG_PLA");
                row.AVRG_SUD = rs01.getDouble("AVRG_SUD");
                row.AVRG_USA = rs01.getDouble("AVRG_USA");
                
                row.page.PAGNUM = filter.page.PAGNUM;
                row.page.PAGROW = filter.page.PAGROW;
                row.page.TOTPAG = filter.page.TOTPAG;
                row.page.TOTROW = filter.page.TOTROW;

                lista.add(row);
            }

            rs01.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List<A1692Filter> loadSQP04258(A1692Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        cnx = null;
        A1692Filter row = null;
        List<A1692Filter> lista = new ArrayList<>();

        String SQLCLL01;
        try {
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04258(?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEF);
            cstmt.setString(3, filter.IN_DATET);
            cstmt.setString(4, filter.IN_ZONA);
            cstmt.setString(5, filter.IN_DATE);
            cstmt.setString(6, filter.FLAG_ALL);

            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                row = new A1692Filter();

                row.IN_DATE = filter.IN_DATE;
                row.RN = rs01.getInt("RN");
                row.DATE = rs01.getString("DATE");
                row.ZONA = rs01.getString("ZONA");
                row.DESCZONA = Functions.getNombreZonas(row.ZONA);
                row.COD_DESC_ZONA = row.ZONA + " - " + row.DESCZONA;
                row.MDACP = rs01.getString("MDACP");
                row.CDEPART = rs01.getString("CDEPART");
                row.DESC_ORIG = rs01.getString("DESC_ORIG");
                row.COD_DESC_ORIG = row.CDEPART + " - " + row.DESC_ORIG;
                row.CARRIVA = rs01.getString("CARRIVA");
                row.DESC_ARRI = rs01.getString("DESC_ARRI");
                row.COD_DESC_ARRI = row.CARRIVA + " - " + row.DESC_ARRI;
                row.QTY_CUPONES = rs01.getInt("QTY_CUPONES");
                row.QTY_CUPONES_CONT = rs01.getInt("QTY_CUPONES_CONT");
                row.QTY_CUPONES_PEND = rs01.getInt("QTY_CUPONES_PEND");
                row.VALOR_CUPONES_CONT = rs01.getDouble("VALOR_CUPONES_CONT");
                row.VALOR_CUPONES_PEND = rs01.getDouble("VALOR_CUPONES_PEND");
                row.PROMEDIO_CUPONES_CONT = rs01.getDouble("PROMEDIO_CUPONES_CONT");
                row.PROMEDIO_CUPONES_PEND = rs01.getDouble("PROMEDIO_CUPONES_PEND");

                row.page.PAGNUM = filter.page.PAGNUM;
                row.page.PAGROW = filter.page.PAGROW;
                row.page.TOTPAG = filter.page.TOTPAG;
                row.page.TOTROW = filter.page.TOTROW;

                lista.add(row);
            }

            rs01.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

}
