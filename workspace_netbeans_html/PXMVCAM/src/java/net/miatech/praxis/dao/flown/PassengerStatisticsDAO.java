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
import net.miatech.beans.A1693Filter;
import net.miatech.beans.A1744Filter;
import net.miatech.beans.A1952Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class PassengerStatisticsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public PassengerStatisticsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public PassengerStatisticsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1693Filter> loadPX035S01A1693(A1693Filter filter) throws SQLException, Exception {
        List<A1693Filter> lstRtn = new ArrayList<>(0);
        A1693Filter objRtn;
        int totQTYFLOW = 0, totQTYFLOWC = 0, totQTYPAX = 0, totQTYPAXC = 0;
        double totAMOPAX = 0, totAMOPAXC = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX035S01A1693(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TIPOFECHA);
            cstmt01.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt01.setString(4, filter.IN_FECHA_TO.trim());
            cstmt01.setString(5, Functions.getFechaActual());
            cstmt01.setString(6, filter.IN_CIA.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totQTYFLOW = rs01.getInt("QTYFLOW");
                totQTYFLOWC = rs01.getInt("QTYFLOWC");
                totQTYPAX = rs01.getInt("QTYPAX");
                totQTYPAXC = rs01.getInt("QTYPAXC");
                totAMOPAX = rs01.getDouble("AMOPAX");
                totAMOPAXC = rs01.getDouble("AMOPAXC");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1693Filter();
                    objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                    objRtn.IN_CIA = filter.IN_CIA;
                    objRtn.fecha = rs01.getString("fecha");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.fecha);
                    objRtn.QTYFLOW = rs01.getInt("QTYFLOW");
                    objRtn.QTYFLOWC = rs01.getInt("QTYFLOWC");
                    objRtn.QTYPAX = rs01.getInt("QTYPAX");
                    objRtn.QTYPAXC = rs01.getInt("QTYPAXC");
                    objRtn.AMOPAX = rs01.getDouble("AMOPAX");
                    objRtn.AMOPAXC = rs01.getDouble("AMOPAXC");
                    objRtn.CURRENC = rs01.getString("CURRENC");

                    objRtn.totQTYFLOW = totQTYFLOW;
                    objRtn.totQTYFLOWC = totQTYFLOWC;
                    objRtn.totQTYPAX = totQTYPAX;
                    objRtn.totQTYPAXC = totQTYPAXC;
                    objRtn.totAMOPAX = totAMOPAX;
                    objRtn.totAMOPAXC = totAMOPAXC;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            System.out.print("error: " + e.getMessage());
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

    public List<A1691Filter> loadPX095S13A1791(A1693Filter filter, String flag, boolean Excel) throws SQLException, Exception {

        //Para el Control Figures (PAX)
        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;
        double qtyPRAXIS = 0, qtyORACLE = 0;

        if (Excel) {
            filter.page.PAGROW = 5000;
            filter.page.PAGNUM = -1;
        }
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX095S13A1791(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_CIA);
            cstmt.setString(5, filter.IN_CURRENCY);
            cstmt.setString(6, flag);
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                qtyPRAXIS = rst.getDouble("A1791VALOR");
                qtyORACLE = rst.getDouble("A1791ORAV");
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanCons = new A1691Filter();
                    beanCons.DFLIGHT = rst.getString("A1791FVUEL").trim();
                    beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                    beanCons.NFLIGHT = rst.getString("A1791CURRE");
                    beanCons.CARRI = rst.getString("A1791CIA");
                    if (beanCons.CARRI.equals("AM")) {
                        beanCons.CARRI = "Aeroméxico";
                    } else if (beanCons.CARRI.equals("5D")) {
                        beanCons.CARRI = "AM Connect";
                    } else if (beanCons.CARRI.equals("VW")) {
                        beanCons.CARRI = "Aeromar";
                    } else {
                        beanCons.CARRI = "(None)";
                    }

                    beanCons.A1791VALOR = rst.getDouble("A1791VALOR");
                    beanCons.A1791ORAV = rst.getDouble("A1791ORAV");
                    beanCons.totDiff = beanCons.A1791VALOR - beanCons.A1791ORAV;

                    beanCons.totPRAXIS = qtyPRAXIS;
                    beanCons.totORACLE = qtyORACLE;

                    beanCons.page.PAGNUM = filter.page.PAGNUM;
                    beanCons.page.PAGROW = filter.page.PAGROW;
                    beanCons.page.TOTPAG = filter.page.TOTPAG;
                    beanCons.page.TOTROW = filter.page.TOTROW;

                    lstCons.add(beanCons);

                }
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstCons;
    }
    
    public List<A1691Filter> loadPX095S10A1691(A1693Filter filter, String flag, boolean Excel) throws SQLException, Exception {

        //Para el Control Figures (PAX)
        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;
        String NFLIGHT = filter.IN_NFLIGHT.trim(); //NFLIGHT + CARRI
        long QODS = 0, QVCR = 0;

        if (!NFLIGHT.equals("") && NFLIGHT.length() < 4) {
            NFLIGHT = Functions.fillZeros(4, NFLIGHT);
        }

        if (Excel) {
            filter.page.PAGROW = 5000;
            filter.page.PAGNUM = -1;
        }

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX095S10A1691(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_CIA.trim());
            cstmt.setString(5, NFLIGHT);
            cstmt.setString(6, flag.trim());
            cstmt.setString(7, filter.IN_FUENTE.trim());
            cstmt.setString(8, filter.FFLOW.trim());
            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                QODS = rst.getLong("QCPNOD");
                QVCR = rst.getLong("QCPNVC");
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanCons = new A1691Filter();
                    beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                    beanCons.NFLIGHT = rst.getString("NFLIGHT");
                    beanCons.IN_NFLIGHT = NFLIGHT;
                    beanCons.CARRI = rst.getString("CARRI");
                    beanCons.lngQODS = rst.getLong("QCPNOD");
                    beanCons.lngQVCR = rst.getLong("QCPNVC");
                    beanCons.lngQDIFF = beanCons.lngQODS - beanCons.lngQVCR;
                    beanCons.lngQSVOPEND = QODS;
                    beanCons.lngQSVOPRO = QVCR;
                    beanCons.page.PAGNUM = filter.page.PAGNUM;
                    beanCons.page.PAGROW = filter.page.PAGROW;
                    beanCons.page.TOTPAG = filter.page.TOTPAG;
                    beanCons.page.TOTROW = filter.page.TOTROW;

                    /*if(filter.IN_FUENTE.trim().equals("M")){
                     if(beanCons.lngQDIFF == 0){
                     lstCons.add(beanCons);
                     }
                     }else{
                     lstCons.add(beanCons);
                     }*/
                    lstCons.add(beanCons);
                }
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstCons;
    }
}
