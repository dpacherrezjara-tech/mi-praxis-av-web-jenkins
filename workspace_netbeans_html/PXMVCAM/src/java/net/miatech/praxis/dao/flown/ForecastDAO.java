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
import net.miatech.beans.IMF072Filter;
import net.miatech.beans.IMF140Filter;
import net.miatech.beans.IMF141Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ForecastDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ForecastDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ForecastDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<IMF140Filter> loadPX551SQP03895(IMF140Filter filter) throws SQLException, Exception {

        List<IMF140Filter> lst = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;
        long QTYPAX = 0;
        double VCPNUSD = 0, VPROUSD = 0, VCPNMXN = 0, VPROMXN = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03895(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            /*cstmt.registerOutParameter(16, Types.INTEGER);
             cstmt.registerOutParameter(17, Types.INTEGER);
             cstmt.registerOutParameter(18, Types.INTEGER);
             cstmt.registerOutParameter(19, Types.INTEGER);*/
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_TREG);

            /*cstmt.setInt(16, filter.page.PAGNUM);
             cstmt.setInt(17, filter.page.PAGROW);
             cstmt.setInt(18, filter.page.TOTPAG);
             cstmt.setInt(19, filter.page.TOTROW);*/
            cstmt.execute();

            /*filter.page.PAGNUM = cstmt.getInt(16);
             filter.page.PAGROW = cstmt.getInt(17);
             filter.page.TOTPAG = cstmt.getInt(18);
             filter.page.TOTROW = cstmt.getInt(19);*/
            rst = cstmt.getResultSet();

            while (rst.next()) {
                QTYPAX = rst.getLong("QTYPAXS");
                VCPNUSD = rst.getDouble("VCPNUSD");
                VPROUSD = rst.getDouble("VPROUSD");
                VCPNMXN = rst.getDouble("VCPNMXN");
                VPROMXN = rst.getDouble("VPROMXN");
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new IMF140Filter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    bean.IN_TREG = filter.IN_TREG.trim();

                    bean.FCONT = rst.getString("FCONT").trim();
                    bean.DFLIGHT = rst.getString("DFLIGHT").trim();
                    bean.QTYPAX = rst.getInt("QTYPAXS");
                    bean.VCPNUSD = rst.getDouble("VCPNUSD");
                    bean.VPROUSD = rst.getDouble("VPROUSD");
                    bean.VCPNMXN = rst.getDouble("VCPNMXN");
                    bean.VPROMXN = rst.getDouble("VPROMXN");

                    bean.totQTYPAX = QTYPAX;
                    bean.totVCPNUSD = VCPNUSD;
                    bean.totVPROUSD = VPROUSD;
                    bean.totVCPNMXN = VCPNMXN;
                    bean.totVPROMXN = VPROMXN;

                    /*bean.page.PAGNUM = filter.page.PAGNUM;
                     bean.page.PAGROW = filter.page.PAGROW;
                     bean.page.TOTPAG = filter.page.TOTPAG;
                     bean.page.TOTROW = filter.page.TOTROW;*/
                    lst.add(bean);
                }
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public List<IMF072Filter> loadPX551SQP04159(IMF072Filter filter) throws SQLException, Exception {

        List<IMF072Filter> lst = new ArrayList<IMF072Filter>(0);
        IMF072Filter bean;
        double VALOR = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04159(?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);

            cstmt.setInt(4, filter.page.PAGNUM);
            cstmt.setInt(5, filter.page.PAGROW);
            cstmt.setInt(6, filter.page.TOTPAG);
            cstmt.setInt(7, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(4);
            filter.page.PAGROW = cstmt.getInt(5);
            filter.page.TOTPAG = cstmt.getInt(6);
            filter.page.TOTROW = cstmt.getInt(7);
            rst = cstmt.getResultSet();

            while (rst.next()) {
                VALOR = rst.getDouble("VALOR");
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new IMF072Filter();

                    bean.CCIA = rst.getString("CCIA").trim();
                    bean.FORMA = rst.getString("FORMA").trim();
                    bean.SERIE = rst.getString("SERIE").trim();
                    bean.TICKET = bean.CCIA + bean.FORMA + bean.SERIE;
                    bean.CUPON = rst.getString("CUPON").trim();
                    bean.ZONA = rst.getString("ZONA").trim();
                    bean.DFLIGHT = rst.getString("DFLIGHT").trim();
                    bean.NFLIGHT = rst.getString("NFLIGHT").trim();
                    bean.TRNCU = rst.getString("TRNCU").trim();
                    bean.VALOR = rst.getDouble("VALOR");

                    bean.totVALOR = VALOR;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lst.add(bean);
                }
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public List<IMF141Filter> loadPX551SQP03896(IMF141Filter filter) throws SQLException, Exception {

        List<IMF141Filter> lst = new ArrayList<IMF141Filter>(0);
        IMF141Filter bean;
        long totASI = 0, totCAM = 0, totCAN = 0, totCAR = 0, totEUR = 0, totFRO = 0, totLOC = 0, totPLA = 0, totSUD = 0, totUSA = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03896(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            //cstmt.setString(4, filter.IN_TYPEFLG);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totASI = rst.getLong("ASI");
                totCAM = rst.getLong("CAM");
                totCAN = rst.getLong("CAN");
                totCAR = rst.getLong("CAR");
                totEUR = rst.getLong("EUR");
                totFRO = rst.getLong("FRO");
                totLOC = rst.getLong("LOC");
                totPLA = rst.getLong("PLA");
                totSUD = rst.getLong("SUD");
                totUSA = rst.getLong("USA");
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new IMF141Filter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    //bean.IN_TYPEFLG = filter.IN_TYPEFLG.trim();

                    bean.DFLIGHT = rst.getString("DFLIGHT").trim();
                    bean.TOTAL = rst.getLong("TOTAL");
                    bean.ASI = rst.getLong("ASI");
                    bean.CAM = rst.getLong("CAM");
                    bean.CAN = rst.getLong("CAN");
                    bean.CAR = rst.getLong("CAR");
                    bean.EUR = rst.getLong("EUR");
                    bean.FRO = rst.getLong("FRO");
                    bean.LOC = rst.getLong("LOC");
                    bean.PLA = rst.getLong("PLA");
                    bean.SUD = rst.getLong("SUD");
                    bean.USA = rst.getLong("USA");

                    bean.totZonas = (rst.getLong("ASI") + rst.getLong("CAM") + rst.getLong("CAN") + rst.getLong("CAR") + rst.getLong("EUR") + rst.getLong("FRO") + rst.getLong("LOC") + rst.getLong("PLA") + rst.getLong("SUD") + rst.getLong("USA"));

                    bean.totASI = totASI;
                    bean.totCAM = totCAM;
                    bean.totCAN = totCAN;
                    bean.totCAR = totCAR;
                    bean.totEUR = totEUR;
                    bean.totFRO = totFRO;
                    bean.totLOC = totLOC;
                    bean.totPLA = totPLA;
                    bean.totSUD = totSUD;
                    bean.totUSA = totUSA;

                    /*bean.page.PAGNUM = filter.page.PAGNUM;
                     bean.page.PAGROW = filter.page.PAGROW;
                     bean.page.TOTPAG = filter.page.TOTPAG;
                     bean.page.TOTROW = filter.page.TOTROW;*/
                    lst.add(bean);
                }
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public List<IMF140Filter> loadPX551SQP03897(IMF140Filter filter) throws SQLException, Exception {

        List<IMF140Filter> lst = new ArrayList<IMF140Filter>(0);
        List<IMF141Filter> lst_seats = new ArrayList<IMF141Filter>(0);
        List<IMF140Filter> lst_occupation_factor = new ArrayList<IMF140Filter>(0);
        List<IMF140Filter> lst_forecast_zone = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;

        IMF141Filter filter_imf141 = new IMF141Filter();
        filter_imf141.IN_FECHA_FROM = filter.IN_FECHA_FROM;
        filter_imf141.IN_FECHA_TO = filter.IN_FECHA_TO;

        long QTYPAX = 0;
        long QTYPAX_FORECAST = 0;
        double VCPNUSD_FORECAST = 0;
        double VCPNMXN_FORECAST = 0;
        double totVCPNMXN_FORECAST_REAL = 0;
        double VCPNUSD = 0, VPROUSD = 0, VCPNMXN = 0, VPROMXN = 0;
        int totalRegistros = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03897(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            /*cstmt.registerOutParameter(16, Types.INTEGER);
             cstmt.registerOutParameter(17, Types.INTEGER);
             cstmt.registerOutParameter(18, Types.INTEGER);
             cstmt.registerOutParameter(19, Types.INTEGER);*/
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);

            /*cstmt.setInt(16, filter.page.PAGNUM);
             cstmt.setInt(17, filter.page.PAGROW);
             cstmt.setInt(18, filter.page.TOTPAG);
             cstmt.setInt(19, filter.page.TOTROW);*/
            cstmt.execute();

            /*filter.page.PAGNUM = cstmt.getInt(16);
             filter.page.PAGROW = cstmt.getInt(17);
             filter.page.TOTPAG = cstmt.getInt(18);
             filter.page.TOTROW = cstmt.getInt(19);*/
            rst = cstmt.getResultSet();

            while (rst.next()) {
                QTYPAX = rst.getLong("QTYPAXS");
                VCPNUSD = rst.getDouble("VCPNUSD");
                VPROUSD = rst.getDouble("VPROUSD");
                VCPNMXN = rst.getDouble("VCPNMXN");
                VPROMXN = rst.getDouble("VPROMXN");
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new IMF140Filter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    bean.IN_TREG = filter.IN_TREG.trim();

                    //bean.FCONT = rst.getString("FCONT").trim();
                    bean.DFLIGHT = rst.getString("DFLIGHT").trim();
                    bean.QTYPAX = rst.getInt("QTYPAXS");
                    bean.VCPNUSD = rst.getDouble("VCPNUSD");
                    bean.VPROUSD = rst.getDouble("VPROUSD");
                    bean.VCPNMXN = rst.getDouble("VCPNMXN");
                    bean.VPROMXN = rst.getDouble("VPROMXN");
                    bean.TREG = rst.getString("TREG").trim();
                    bean.DWEEK = rst.getString("DWEEK").trim();

                    if (bean.TREG.equals("0")) {
//                        objRtn.strImagen1 = "assets/icons/16x16/greenP.png";
                        bean.strImagen1 = "resources/img/icon/16x16/circle_green.png";

                    } else if (bean.TREG.equals("2")) {
//                        objRtn.strImagen1 = "assets/icons/16x16/redP.png";
                        bean.strImagen1 = "resources/img/icon/16x16/Circle_Yellow.png";
                    }

                    bean.totQTYPAX = QTYPAX;
                    bean.totVCPNUSD = VCPNUSD;
                    bean.totVPROUSD = VPROUSD;
                    bean.totVCPNMXN = VCPNMXN;
                    bean.totVPROMXN = VPROMXN;

                    /*bean.page.PAGNUM = filter.page.PAGNUM;
                     bean.page.PAGROW = filter.page.PAGROW;
                     bean.page.TOTPAG = filter.page.TOTPAG;
                     bean.page.TOTROW = filter.page.TOTROW;*/
                    lst.add(bean);
                    if (bean.VCPNMXN > 0) {
                        totalRegistros++;
                    }
                }
            }

            if (lst.size() > 0) {
                lst_seats = loadPX551SQP03896(filter_imf141);
                lst_occupation_factor = loadPX551SQP03898(filter);
                lst_forecast_zone = loadPX551SQP03936(filter);

                for (int i = 0; i < lst.size(); i++) {

                    if (lst.get(i).TREG.equals("2")) {
                        //Pronosticando pasajeros
                        lst.get(i).QTYPAX_FORECAST = (int) Math.round(
                                lst_seats.get(i).FRO * lst_occupation_factor.get(i).percentageFRO / 100
                                + lst_seats.get(i).LOC * lst_occupation_factor.get(i).percentageLOC / 100
                                + lst_seats.get(i).PLA * lst_occupation_factor.get(i).percentagePLA / 100
                                + lst_seats.get(i).ASI * lst_occupation_factor.get(i).percentageASI / 100
                                + lst_seats.get(i).CAM * lst_occupation_factor.get(i).percentageCAM / 100
                                + lst_seats.get(i).CAN * lst_occupation_factor.get(i).percentageCAN / 100
                                + lst_seats.get(i).CAR * lst_occupation_factor.get(i).percentageCAR / 100
                                + lst_seats.get(i).EUR * lst_occupation_factor.get(i).percentageEUR / 100
                                + lst_seats.get(i).SUD * lst_occupation_factor.get(i).percentageSUD / 100
                                + lst_seats.get(i).USA * lst_occupation_factor.get(i).percentageUSA / 100
                        );
                        QTYPAX_FORECAST = QTYPAX_FORECAST + lst.get(i).QTYPAX_FORECAST;

                        //Pronosticando monto en USD
                        lst.get(i).VCPNUSD_FORECAST
                                = lst_forecast_zone.get(i).VCPNUSDFRO
                                + lst_forecast_zone.get(i).VCPNUSDLOC
                                + lst_forecast_zone.get(i).VCPNUSDPLA
                                + lst_forecast_zone.get(i).VCPNUSDASI
                                + lst_forecast_zone.get(i).VCPNUSDCAM
                                + lst_forecast_zone.get(i).VCPNUSDCAN
                                + lst_forecast_zone.get(i).VCPNUSDCAR
                                + lst_forecast_zone.get(i).VCPNUSDEUR
                                + lst_forecast_zone.get(i).VCPNUSDSUD
                                + lst_forecast_zone.get(i).VCPNUSDUSA;
                        VCPNUSD_FORECAST = VCPNUSD_FORECAST + lst.get(i).VCPNUSD_FORECAST;

                        //Pronosticando monto en MXN
                        lst.get(i).VCPNMXN_FORECAST
                                = lst_forecast_zone.get(i).VCPNMXNFRO
                                + lst_forecast_zone.get(i).VCPNMXNLOC
                                + lst_forecast_zone.get(i).VCPNMXNPLA
                                + lst_forecast_zone.get(i).VCPNMXNASI
                                + lst_forecast_zone.get(i).VCPNMXNCAM
                                + lst_forecast_zone.get(i).VCPNMXNCAN
                                + lst_forecast_zone.get(i).VCPNMXNCAR
                                + lst_forecast_zone.get(i).VCPNMXNEUR
                                + lst_forecast_zone.get(i).VCPNMXNSUD
                                + lst_forecast_zone.get(i).VCPNMXNUSA;
                        VCPNMXN_FORECAST = VCPNMXN_FORECAST + lst.get(i).VCPNMXN_FORECAST;
                    }

                }

                for (int i = 0; i < lst.size(); i++) {
                    lst.get(i).totQTYPAX_FORECAST = QTYPAX_FORECAST;
                    lst.get(i).totVCPNUSD_FORECAST = VCPNUSD_FORECAST;
                    lst.get(i).totVCPNMXN_FORECAST = VCPNMXN_FORECAST;
                }

                totVCPNMXN_FORECAST_REAL = VCPNMXN_FORECAST;

                for (int i = 0; i < lst.size(); i++) {
                    if (lst.get(i).TREG.equals("0")) {
                        totVCPNMXN_FORECAST_REAL = totVCPNMXN_FORECAST_REAL + lst.get(i).VCPNMXN;
                    }
                }

                for (int i = 0; i < lst.size(); i++) {
                    if (lst.get(i).VCPNMXN > 0) {
                        if (lst.get(i).TREG.equals("0")) {
                            lst.get(i).AVRG_VCPNMXN = ((lst.get(i).VCPNMXN - (totVCPNMXN_FORECAST_REAL / totalRegistros)) / (totVCPNMXN_FORECAST_REAL / totalRegistros)) * 100;
                        }

                        if (lst.get(i).TREG.equals("2")) {
                            lst.get(i).AVRG_VCPNMXN = ((lst.get(i).VCPNMXN_FORECAST - (totVCPNMXN_FORECAST_REAL / totalRegistros)) / (totVCPNMXN_FORECAST_REAL / totalRegistros)) * 100;
                        }

                        if (lst.get(i).AVRG_VCPNMXN >= 20) {
                            lst.get(i).strImagen2 = "resources/img/icon/16x16/circle_red.png";
                        }
                        if (lst.get(i).AVRG_VCPNMXN < 20 && lst.get(i).AVRG_VCPNMXN >= -25) {
                            lst.get(i).strImagen2 = "resources/img/icon/16x16/circle_green.png";
                        }
                        if (lst.get(i).AVRG_VCPNMXN < -25) {
                            lst.get(i).strImagen2 = "resources/img/icon/16x16/Circle_Yellow.png";
                        }

                        lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
                    }
                }
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public List<IMF140Filter> loadPX551SQP04160(IMF140Filter filter) throws SQLException, Exception {

        List<IMF140Filter> lst = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04160(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                bean = new IMF140Filter();
                bean.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                bean.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                bean.IN_TREG = filter.IN_TREG.trim();

                bean.QTYPAX = rst.getInt("QTYPAXS");
                bean.VCPNUSD = rst.getDouble("VCPNUSD");
                bean.VPROUSD = rst.getDouble("VPROUSD");
                bean.VCPNMXN = rst.getDouble("VCPNMXN");
                bean.VPROMXN = rst.getDouble("VPROMXN");
                bean.TREG = rst.getString("TREG").trim();

                if (bean.TREG.trim().equals("REAL")) {
                    bean.strImagen1 = "resources/img/icon/16x16/circle_green.png";

                } else if (bean.TREG.trim().equals("FUTURE")) {
                    bean.strImagen1 = "resources/img/icon/16x16/Circle_Yellow.png";
                }

                lst.add(bean);
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public List<IMF140Filter> loadPX551SQP03898(IMF140Filter filter) throws SQLException, Exception {

        List<IMF140Filter> lst = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;

        int totalRegistros = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03898(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            /*cstmt.registerOutParameter(16, Types.INTEGER);
             cstmt.registerOutParameter(17, Types.INTEGER);
             cstmt.registerOutParameter(18, Types.INTEGER);
             cstmt.registerOutParameter(19, Types.INTEGER);*/
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);

            /*cstmt.setInt(16, filter.page.PAGNUM);
             cstmt.setInt(17, filter.page.PAGROW);
             cstmt.setInt(18, filter.page.TOTPAG);
             cstmt.setInt(19, filter.page.TOTROW);*/
            cstmt.execute();

            /*filter.page.PAGNUM = cstmt.getInt(16);
             filter.page.PAGROW = cstmt.getInt(17);
             filter.page.TOTPAG = cstmt.getInt(18);
             filter.page.TOTROW = cstmt.getInt(19);*/
            rst = cstmt.getResultSet();

            while (rst.next()) {
                bean = new IMF140Filter();
                bean.DWEEK = rst.getString("DWEEK").trim();
                bean.DFLIGHT = rst.getString("DFLIGHT").trim();
                bean.TREG = rst.getString("TREG").trim();

                if (bean.TREG.trim().equals("0")) {
                    bean.strImagen1 = "resources/img/icon/16x16/circle_green.png";
                } else if (bean.TREG.trim().equals("2")) {
                    bean.strImagen1 = "resources/img/icon/16x16/Circle_Yellow.png";
                }

                bean.percentageASI = rst.getDouble("ASI");
                bean.percentageCAM = rst.getDouble("CAM");
                bean.percentageCAN = rst.getDouble("CAN");
                bean.percentageCAR = rst.getDouble("CAR");
                bean.percentageEUR = rst.getDouble("EUR");
                bean.percentageFRO = rst.getDouble("FRO");
                bean.percentageLOC = rst.getDouble("LOC");
                bean.percentagePLA = rst.getDouble("PLA");
                bean.percentageSUD = rst.getDouble("SUD");
                bean.percentageUSA = rst.getDouble("USA");
                bean.totalRegistros = rst.getDouble("TOTAL_REGISTROS");
                lst.add(bean);
            }
            rst.close();

            /*for (int i = 0; i < lst.size(); i++) {
             if (lst.get(i).VCPNMXN > 0) {
             lst.get(i).AVRG_VCPNMXN = ((lst.get(i).VCPNMXN - (lst.get(i).totVCPNMXN / totalRegistros)) / (lst.get(i).totVCPNMXN / totalRegistros)) * 100;
             lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
             }
             }*/
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public List<IMF140Filter> loadPX551SQP03936(IMF140Filter filter) throws SQLException, Exception {

        List<IMF140Filter> lst = new ArrayList<IMF140Filter>(0);
        List<IMF141Filter> lst_seats = new ArrayList<IMF141Filter>(0);
        List<IMF140Filter> lst_occupation_factor = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;
        IMF141Filter filter_imf141 = new IMF141Filter();
        filter_imf141.IN_FECHA_FROM = filter.IN_FECHA_FROM;
        filter_imf141.IN_FECHA_TO = filter.IN_FECHA_TO;

        double TOTPAXASI = 0;
        double TOTPAXCAM = 0;
        double TOTPAXCAN = 0;
        double TOTPAXCAR = 0;
        double TOTPAXEUR = 0;
        double TOTPAXFRO = 0;
        double TOTPAXLOC = 0;
        double TOTPAXPLA = 0;
        double TOTPAXSUD = 0;
        double TOTPAXUSA = 0;

        double TOTVCPNUSDASI = 0;
        double TOTVCPNUSDCAM = 0;
        double TOTVCPNUSDCAN = 0;
        double TOTVCPNUSDCAR = 0;
        double TOTVCPNUSDEUR = 0;
        double TOTVCPNUSDFRO = 0;
        double TOTVCPNUSDLOC = 0;
        double TOTVCPNUSDPLA = 0;
        double TOTVCPNUSDSUD = 0;
        double TOTVCPNUSDUSA = 0;

        double TOTVPROUSDASI = 0;
        double TOTVPROUSDCAM = 0;
        double TOTVPROUSDCAN = 0;
        double TOTVPROUSDCAR = 0;
        double TOTVPROUSDEUR = 0;
        double TOTVPROUSDFRO = 0;
        double TOTVPROUSDLOC = 0;
        double TOTVPROUSDPLA = 0;
        double TOTVPROUSDSUD = 0;
        double TOTVPROUSDUSA = 0;

        double TOTVCPNMXNASI = 0;
        double TOTVCPNMXNCAM = 0;
        double TOTVCPNMXNCAN = 0;
        double TOTVCPNMXNCAR = 0;
        double TOTVCPNMXNEUR = 0;
        double TOTVCPNMXNFRO = 0;
        double TOTVCPNMXNLOC = 0;
        double TOTVCPNMXNPLA = 0;
        double TOTVCPNMXNSUD = 0;
        double TOTVCPNMXNUSA = 0;

        int totalRegistrosASI = 0;
        int totalRegistrosCAM = 0;
        int totalRegistrosCAN = 0;
        int totalRegistrosCAR = 0;
        int totalRegistrosEUR = 0;
        int totalRegistrosFRO = 0;
        int totalRegistrosLOC = 0;
        int totalRegistrosPLA = 0;
        int totalRegistrosSUD = 0;
        int totalRegistrosUSA = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03936(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            /*cstmt.registerOutParameter(16, Types.INTEGER);
             cstmt.registerOutParameter(17, Types.INTEGER);
             cstmt.registerOutParameter(18, Types.INTEGER);
             cstmt.registerOutParameter(19, Types.INTEGER);*/
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);

            /*cstmt.setInt(16, filter.page.PAGNUM);
             cstmt.setInt(17, filter.page.PAGROW);
             cstmt.setInt(18, filter.page.TOTPAG);
             cstmt.setInt(19, filter.page.TOTROW);*/
            cstmt.execute();

            /*filter.page.PAGNUM = cstmt.getInt(16);
             filter.page.PAGROW = cstmt.getInt(17);
             filter.page.TOTPAG = cstmt.getInt(18);
             filter.page.TOTROW = cstmt.getInt(19);*/
            rst = cstmt.getResultSet();

            while (rst.next()) {
                TOTPAXASI = rst.getDouble("TOTPAXASI");
                TOTPAXCAM = rst.getDouble("TOTPAXCAM");
                TOTPAXCAN = rst.getDouble("TOTPAXCAN");
                TOTPAXCAR = rst.getDouble("TOTPAXCAR");
                TOTPAXEUR = rst.getDouble("TOTPAXEUR");
                TOTPAXFRO = rst.getDouble("TOTPAXFRO");
                TOTPAXLOC = rst.getDouble("TOTPAXLOC");
                TOTPAXPLA = rst.getDouble("TOTPAXPLA");
                TOTPAXSUD = rst.getDouble("TOTPAXSUD");
                TOTPAXUSA = rst.getDouble("TOTPAXUSA");

                TOTVCPNUSDASI = rst.getDouble("TOTVCPNUSDASI");
                TOTVCPNUSDCAM = rst.getDouble("TOTVCPNUSDCAM");
                TOTVCPNUSDCAN = rst.getDouble("TOTVCPNUSDCAN");
                TOTVCPNUSDCAR = rst.getDouble("TOTVCPNUSDCAR");
                TOTVCPNUSDEUR = rst.getDouble("TOTVCPNUSDEUR");
                TOTVCPNUSDFRO = rst.getDouble("TOTVCPNUSDFRO");
                TOTVCPNUSDLOC = rst.getDouble("TOTVCPNUSDLOC");
                TOTVCPNUSDPLA = rst.getDouble("TOTVCPNUSDPLA");
                TOTVCPNUSDSUD = rst.getDouble("TOTVCPNUSDSUD");
                TOTVCPNUSDUSA = rst.getDouble("TOTVCPNUSDUSA");

                if (rst.getDouble("TOTPAXASI") != 0) {
                    TOTVPROUSDASI = rst.getDouble("TOTVCPNUSDASI") / rst.getDouble("TOTPAXASI");
                }

                if (rst.getDouble("TOTPAXCAM") != 0) {
                    TOTVPROUSDCAM = rst.getDouble("TOTVCPNUSDCAM") / rst.getDouble("TOTPAXCAM");
                }

                if (rst.getDouble("TOTPAXCAN") != 0) {
                    TOTVPROUSDCAN = rst.getDouble("TOTVCPNUSDCAN") / rst.getDouble("TOTPAXCAN");
                }

                if (rst.getDouble("TOTPAXCAR") != 0) {
                    TOTVPROUSDCAR = rst.getDouble("TOTVCPNUSDCAR") / rst.getDouble("TOTPAXCAR");
                }

                if (rst.getDouble("TOTPAXEUR") != 0) {
                    TOTVPROUSDEUR = rst.getDouble("TOTVCPNUSDEUR") / rst.getDouble("TOTPAXEUR");
                }

                if (rst.getDouble("TOTPAXFRO") != 0) {
                    TOTVPROUSDFRO = rst.getDouble("TOTVCPNUSDFRO") / rst.getDouble("TOTPAXFRO");
                }

                if (rst.getDouble("TOTPAXLOC") != 0) {
                    TOTVPROUSDLOC = rst.getDouble("TOTVCPNUSDLOC") / rst.getDouble("TOTPAXLOC");
                }

                if (rst.getDouble("TOTPAXPLA") != 0) {
                    TOTVPROUSDPLA = rst.getDouble("TOTVCPNUSDPLA") / rst.getDouble("TOTPAXPLA");
                }

                if (rst.getDouble("TOTPAXSUD") != 0) {
                    TOTVPROUSDSUD = rst.getDouble("TOTVCPNUSDSUD") / rst.getDouble("TOTPAXSUD");
                }

                if (rst.getDouble("TOTPAXUSA") != 0) {
                    TOTVPROUSDUSA = rst.getDouble("TOTVCPNUSDUSA") / rst.getDouble("TOTPAXUSA");
                }

                TOTVCPNMXNASI = rst.getDouble("TOTVCPNMXNASI");
                TOTVCPNMXNCAM = rst.getDouble("TOTVCPNMXNCAM");
                TOTVCPNMXNCAN = rst.getDouble("TOTVCPNMXNCAN");
                TOTVCPNMXNCAR = rst.getDouble("TOTVCPNMXNCAR");
                TOTVCPNMXNEUR = rst.getDouble("TOTVCPNMXNEUR");
                TOTVCPNMXNFRO = rst.getDouble("TOTVCPNMXNFRO");
                TOTVCPNMXNLOC = rst.getDouble("TOTVCPNMXNLOC");
                TOTVCPNMXNPLA = rst.getDouble("TOTVCPNMXNPLA");
                TOTVCPNMXNSUD = rst.getDouble("TOTVCPNMXNSUD");
                TOTVCPNMXNUSA = rst.getDouble("TOTVCPNMXNUSA");
            }

            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new IMF140Filter();
                    bean.DWEEK = rst.getString("DWEEK").trim();
                    bean.DFLIGHT = rst.getString("DFLIGHT").trim();
                    bean.TREG = rst.getString("TREG").trim();
                    bean.TCAMB = rst.getDouble("TCAMB");

                    if (bean.TREG.equals("0")) {
                        bean.strImagen1 = "resources/img/icon/16x16/circle_green.png";

                    } else if (bean.TREG.equals("2")) {
                        bean.strImagen1 = "resources/img/icon/16x16/Circle_Yellow.png";
                    }

                    //ASI
                    bean.PAXASI = rst.getDouble("PAXASI");
                    if (rst.getDouble("PAXASI") != 0) {
                        bean.VPROUSDASI = rst.getDouble("VCPNUSDASI") / rst.getDouble("PAXASI");
                        bean.VPROUSDASI = Functions.redondear(bean.VPROUSDASI, 2);
                    }

                    if (bean.TREG.equals("2")) {
                        bean.VPROUSDASI = rst.getDouble("VPROUSDASI");
                    }

                    bean.VCPNUSDASI = rst.getDouble("VCPNUSDASI");
                    bean.VCPNMXNASI = rst.getDouble("VCPNMXNASI");

                    //CAM
                    bean.PAXCAM = rst.getDouble("PAXCAM");
                    if (rst.getDouble("PAXCAM") != 0) {
                        bean.VPROUSDCAM = rst.getDouble("VCPNUSDCAM") / rst.getDouble("PAXCAM");
                        bean.VPROUSDCAM = Functions.redondear(bean.VPROUSDCAM, 2);
                    }

                    if (bean.TREG.equals("2")) {
                        bean.VPROUSDCAM = rst.getDouble("VPROUSDCAM");
                    }

                    bean.VCPNUSDCAM = rst.getDouble("VCPNUSDCAM");
                    bean.VCPNMXNCAM = rst.getDouble("VCPNMXNCAM");
                    //CAN                
                    bean.PAXCAN = rst.getDouble("PAXCAN");
                    if (rst.getDouble("PAXCAN") != 0) {
                        bean.VPROUSDCAN = rst.getDouble("VCPNUSDCAN") / rst.getDouble("PAXCAN");
                        bean.VPROUSDCAN = Functions.redondear(bean.VPROUSDCAN, 2);
                    }

                    if (bean.TREG.equals("2")) {
                        bean.VPROUSDCAN = rst.getDouble("VPROUSDCAN");
                    }

                    bean.VCPNUSDCAN = rst.getDouble("VCPNUSDCAN");
                    bean.VCPNMXNCAN = rst.getDouble("VCPNMXNCAN");
                    //CAR                
                    bean.PAXCAR = rst.getDouble("PAXCAR");
                    if (rst.getDouble("PAXCAR") != 0) {
                        bean.VPROUSDCAR = rst.getDouble("VCPNUSDCAR") / rst.getDouble("PAXCAR");
                        bean.VPROUSDCAR = Functions.redondear(bean.VPROUSDCAR, 2);
                    }

                    if (bean.TREG.equals("2")) {
                        bean.VPROUSDCAR = rst.getDouble("VPROUSDCAR");
                    }

                    bean.VCPNUSDCAR = rst.getDouble("VCPNUSDCAR");
                    bean.VCPNMXNCAR = rst.getDouble("VCPNMXNCAR");
                    //EUR                
                    bean.PAXEUR = rst.getDouble("PAXEUR");
                    if (rst.getDouble("PAXEUR") != 0) {
                        bean.VPROUSDEUR = rst.getDouble("VCPNUSDEUR") / rst.getDouble("PAXEUR");
                        bean.VPROUSDEUR = Functions.redondear(bean.VPROUSDEUR, 2);
                    }

                    if (bean.TREG.equals("2")) {
                        bean.VPROUSDEUR = rst.getDouble("VPROUSDEUR");
                    }

                    bean.VCPNUSDEUR = rst.getDouble("VCPNUSDEUR");
                    bean.VCPNMXNEUR = rst.getDouble("VCPNMXNEUR");
                    //FRO                
                    bean.PAXFRO = rst.getDouble("PAXFRO");
                    if (rst.getDouble("PAXFRO") != 0) {
                        bean.VPROUSDFRO = rst.getDouble("VCPNUSDFRO") / rst.getDouble("PAXFRO");
                        bean.VPROUSDFRO = Functions.redondear(bean.VPROUSDFRO, 2);
                    }

                    if (bean.TREG.equals("2")) {
                        bean.VPROUSDFRO = rst.getDouble("VPROUSDFRO");
                    }

                    bean.VCPNUSDFRO = rst.getDouble("VCPNUSDFRO");
                    bean.VCPNMXNFRO = rst.getDouble("VCPNMXNFRO");
                    //LOC                
                    bean.PAXLOC = rst.getDouble("PAXLOC");
                    if (rst.getDouble("PAXLOC") != 0) {
                        bean.VPROUSDLOC = rst.getDouble("VCPNUSDLOC") / rst.getDouble("PAXLOC");
                        bean.VPROUSDLOC = Functions.redondear(bean.VPROUSDLOC, 2);
                    }

                    if (bean.TREG.equals("2")) {
                        bean.VPROUSDLOC = rst.getDouble("VPROUSDLOC");
                    }

                    bean.VCPNUSDLOC = rst.getDouble("VCPNUSDLOC");
                    bean.VCPNMXNLOC = rst.getDouble("VCPNMXNLOC");
                    //PLA                
                    bean.PAXPLA = rst.getDouble("PAXPLA");
                    if (rst.getDouble("PAXPLA") != 0) {
                        bean.VPROUSDPLA = rst.getDouble("VCPNUSDPLA") / rst.getDouble("PAXPLA");
                        bean.VPROUSDPLA = Functions.redondear(bean.VPROUSDPLA, 2);
                    }

                    if (bean.TREG.equals("2")) {
                        bean.VPROUSDPLA = rst.getDouble("VPROUSDPLA");
                    }

                    bean.VCPNUSDPLA = rst.getDouble("VCPNUSDPLA");
                    bean.VCPNMXNPLA = rst.getDouble("VCPNMXNPLA");
                    //SUD                
                    bean.PAXSUD = rst.getDouble("PAXSUD");
                    if (rst.getDouble("PAXSUD") != 0) {
                        bean.VPROUSDSUD = rst.getDouble("VCPNUSDSUD") / rst.getDouble("PAXSUD");
                        bean.VPROUSDSUD = Functions.redondear(bean.VPROUSDSUD, 2);
                    }

                    if (bean.TREG.equals("2")) {
                        bean.VPROUSDSUD = rst.getDouble("VPROUSDSUD");
                    }

                    bean.VCPNUSDSUD = rst.getDouble("VCPNUSDSUD");
                    bean.VCPNMXNSUD = rst.getDouble("VCPNMXNSUD");
                    //USA                
                    bean.PAXUSA = rst.getDouble("PAXUSA");
                    if (rst.getDouble("PAXUSA") != 0) {
                        bean.VPROUSDUSA = rst.getDouble("VCPNUSDUSA") / rst.getDouble("PAXUSA");
                        bean.VPROUSDUSA = Functions.redondear(bean.VPROUSDUSA, 2);
                    }

                    if (bean.TREG.equals("2")) {
                        bean.VPROUSDUSA = rst.getDouble("VPROUSDUSA");
                    }

                    bean.VCPNUSDUSA = rst.getDouble("VCPNUSDUSA");
                    bean.VCPNMXNUSA = rst.getDouble("VCPNMXNUSA");

                    lst.add(bean);

                    //Totales
                    bean.TOTPAXASI = TOTPAXASI;
                    bean.TOTPAXCAM = TOTPAXCAM;
                    bean.TOTPAXCAN = TOTPAXCAN;
                    bean.TOTPAXCAR = TOTPAXCAR;
                    bean.TOTPAXEUR = TOTPAXEUR;
                    bean.TOTPAXFRO = TOTPAXFRO;
                    bean.TOTPAXLOC = TOTPAXLOC;
                    bean.TOTPAXPLA = TOTPAXPLA;
                    bean.TOTPAXSUD = TOTPAXSUD;
                    bean.TOTPAXUSA = TOTPAXUSA;

                    bean.TOTVCPNUSDASI = TOTVCPNUSDASI;
                    bean.TOTVCPNUSDCAM = TOTVCPNUSDCAM;
                    bean.TOTVCPNUSDCAN = TOTVCPNUSDCAN;
                    bean.TOTVCPNUSDCAR = TOTVCPNUSDCAR;
                    bean.TOTVCPNUSDEUR = TOTVCPNUSDEUR;
                    bean.TOTVCPNUSDFRO = TOTVCPNUSDFRO;
                    bean.TOTVCPNUSDLOC = TOTVCPNUSDLOC;
                    bean.TOTVCPNUSDPLA = TOTVCPNUSDPLA;
                    bean.TOTVCPNUSDSUD = TOTVCPNUSDSUD;
                    bean.TOTVCPNUSDUSA = TOTVCPNUSDUSA;

                    bean.TOTVPROUSDASI = TOTVPROUSDASI;
                    bean.TOTVPROUSDCAM = TOTVPROUSDCAM;
                    bean.TOTVPROUSDCAN = TOTVPROUSDCAN;
                    bean.TOTVPROUSDCAR = TOTVPROUSDCAR;
                    bean.TOTVPROUSDEUR = TOTVPROUSDEUR;
                    bean.TOTVPROUSDFRO = TOTVPROUSDFRO;
                    bean.TOTVPROUSDLOC = TOTVPROUSDLOC;
                    bean.TOTVPROUSDPLA = TOTVPROUSDPLA;
                    bean.TOTVPROUSDSUD = TOTVPROUSDSUD;
                    bean.TOTVPROUSDUSA = TOTVPROUSDUSA;

                    bean.TOTVCPNMXNASI = TOTVCPNMXNASI;
                    bean.TOTVCPNMXNCAM = TOTVCPNMXNCAM;
                    bean.TOTVCPNMXNCAN = TOTVCPNMXNCAN;
                    bean.TOTVCPNMXNCAR = TOTVCPNMXNCAR;
                    bean.TOTVCPNMXNEUR = TOTVCPNMXNEUR;
                    bean.TOTVCPNMXNFRO = TOTVCPNMXNFRO;
                    bean.TOTVCPNMXNLOC = TOTVCPNMXNLOC;
                    bean.TOTVCPNMXNPLA = TOTVCPNMXNPLA;
                    bean.TOTVCPNMXNSUD = TOTVCPNMXNSUD;
                    bean.TOTVCPNMXNUSA = TOTVCPNMXNUSA;

                }

            }

            rst.close();

            if (lst.size() > 0) {
                lst_seats = loadPX551SQP03896(filter_imf141);
                lst_occupation_factor = loadPX551SQP03898(filter);

                TOTVCPNMXNFRO = 0;
                TOTVCPNMXNLOC = 0;
                TOTVCPNMXNPLA = 0;
                TOTVCPNMXNASI = 0;
                TOTVCPNMXNCAM = 0;
                TOTVCPNMXNCAN = 0;
                TOTVCPNMXNCAR = 0;
                TOTVCPNMXNEUR = 0;
                TOTVCPNMXNSUD = 0;
                TOTVCPNMXNUSA = 0;

                TOTVCPNUSDFRO = 0;
                TOTVCPNUSDLOC = 0;
                TOTVCPNUSDPLA = 0;
                TOTVCPNUSDASI = 0;
                TOTVCPNUSDCAM = 0;
                TOTVCPNUSDCAN = 0;
                TOTVCPNUSDCAR = 0;
                TOTVCPNUSDEUR = 0;
                TOTVCPNUSDSUD = 0;
                TOTVCPNUSDUSA = 0;

                TOTPAXASI = 0;
                TOTPAXCAM = 0;
                TOTPAXCAN = 0;
                TOTPAXCAR = 0;
                TOTPAXEUR = 0;
                TOTPAXFRO = 0;
                TOTPAXLOC = 0;
                TOTPAXPLA = 0;
                TOTPAXSUD = 0;
                TOTPAXUSA = 0;

                for (int i = 0; i < lst.size(); i++) {

                    if (lst.get(i).TREG.equals("0")) {
                        TOTVCPNUSDFRO = TOTVCPNUSDFRO + lst.get(i).VCPNUSDFRO;
                        TOTVCPNUSDLOC = TOTVCPNUSDLOC + lst.get(i).VCPNUSDLOC;
                        TOTVCPNUSDPLA = TOTVCPNUSDPLA + lst.get(i).VCPNUSDPLA;
                        TOTVCPNUSDASI = TOTVCPNUSDASI + lst.get(i).VCPNUSDASI;
                        TOTVCPNUSDCAM = TOTVCPNUSDCAM + lst.get(i).VCPNUSDCAM;
                        TOTVCPNUSDCAN = TOTVCPNUSDCAN + lst.get(i).VCPNUSDCAN;
                        TOTVCPNUSDCAR = TOTVCPNUSDCAR + lst.get(i).VCPNUSDCAR;
                        TOTVCPNUSDEUR = TOTVCPNUSDEUR + lst.get(i).VCPNUSDEUR;
                        TOTVCPNUSDSUD = TOTVCPNUSDSUD + lst.get(i).VCPNUSDSUD;
                        TOTVCPNUSDUSA = TOTVCPNUSDUSA + lst.get(i).VCPNUSDUSA;

                        TOTVCPNMXNFRO = TOTVCPNMXNFRO + lst.get(i).VCPNMXNFRO;
                        TOTVCPNMXNLOC = TOTVCPNMXNLOC + lst.get(i).VCPNMXNLOC;
                        TOTVCPNMXNPLA = TOTVCPNMXNPLA + lst.get(i).VCPNMXNPLA;
                        TOTVCPNMXNASI = TOTVCPNMXNASI + lst.get(i).VCPNMXNASI;
                        TOTVCPNMXNCAM = TOTVCPNMXNCAM + lst.get(i).VCPNMXNCAM;
                        TOTVCPNMXNCAN = TOTVCPNMXNCAN + lst.get(i).VCPNMXNCAN;
                        TOTVCPNMXNCAR = TOTVCPNMXNCAR + lst.get(i).VCPNMXNCAR;
                        TOTVCPNMXNEUR = TOTVCPNMXNEUR + lst.get(i).VCPNMXNEUR;
                        TOTVCPNMXNSUD = TOTVCPNMXNSUD + lst.get(i).VCPNMXNSUD;
                        TOTVCPNMXNUSA = TOTVCPNMXNUSA + lst.get(i).VCPNMXNUSA;

                        TOTPAXFRO = TOTPAXFRO + lst.get(i).PAXFRO;
                        TOTPAXLOC = TOTPAXLOC + lst.get(i).PAXLOC;
                        TOTPAXPLA = TOTPAXPLA + lst.get(i).PAXPLA;
                        TOTPAXASI = TOTPAXASI + lst.get(i).PAXASI;
                        TOTPAXCAM = TOTPAXCAM + lst.get(i).PAXCAM;
                        TOTPAXCAN = TOTPAXCAN + lst.get(i).PAXCAN;
                        TOTPAXCAR = TOTPAXCAR + lst.get(i).PAXCAR;
                        TOTPAXEUR = TOTPAXEUR + lst.get(i).PAXEUR;
                        TOTPAXSUD = TOTPAXSUD + lst.get(i).PAXSUD;
                        TOTPAXUSA = TOTPAXUSA + lst.get(i).PAXUSA;
                    }

                    if (lst.get(i).TREG.equals("2")) {

                        lst.get(i).PAXFRO = (int) Math.round(lst_seats.get(i).FRO * lst_occupation_factor.get(i).percentageFRO / 100);
                        lst.get(i).VCPNUSDFRO = lst.get(i).VPROUSDFRO * lst.get(i).PAXFRO;
                        lst.get(i).VCPNMXNFRO = lst.get(i).VCPNUSDFRO * lst.get(i).TCAMB;
                        TOTVCPNMXNFRO = TOTVCPNMXNFRO + lst.get(i).VCPNMXNFRO;
                        TOTVCPNUSDFRO = TOTVCPNUSDFRO + lst.get(i).VCPNUSDFRO;
                        TOTPAXFRO = TOTPAXFRO + lst.get(i).PAXFRO;

                        lst.get(i).PAXLOC = (int) Math.round(lst_seats.get(i).LOC * lst_occupation_factor.get(i).percentageLOC / 100);
                        lst.get(i).VCPNUSDLOC = lst.get(i).VPROUSDLOC * lst.get(i).PAXLOC;
                        lst.get(i).VCPNMXNLOC = lst.get(i).VCPNUSDLOC * lst.get(i).TCAMB;
                        TOTVCPNMXNLOC = TOTVCPNMXNLOC + lst.get(i).VCPNMXNLOC;
                        TOTVCPNUSDLOC = TOTVCPNUSDLOC + lst.get(i).VCPNUSDLOC;
                        TOTPAXLOC = TOTPAXLOC + lst.get(i).PAXLOC;

                        lst.get(i).PAXPLA = (int) Math.round(lst_seats.get(i).PLA * lst_occupation_factor.get(i).percentagePLA / 100);
                        lst.get(i).VCPNUSDPLA = lst.get(i).VPROUSDPLA * lst.get(i).PAXPLA;
                        lst.get(i).VCPNMXNPLA = lst.get(i).VCPNUSDPLA * lst.get(i).TCAMB;
                        TOTVCPNMXNPLA = TOTVCPNMXNPLA + lst.get(i).VCPNMXNPLA;
                        TOTVCPNUSDPLA = TOTVCPNUSDPLA + lst.get(i).VCPNUSDPLA;
                        TOTPAXPLA = TOTPAXPLA + lst.get(i).PAXPLA;

                        lst.get(i).PAXASI = (int) Math.round(lst_seats.get(i).ASI * lst_occupation_factor.get(i).percentageASI / 100);
                        if (lst.get(i).PAXASI == 0) {
                            lst.get(i).VPROUSDASI = 0;
                        }
                        lst.get(i).VCPNUSDASI = lst.get(i).VPROUSDASI * lst.get(i).PAXASI;
                        lst.get(i).VCPNMXNASI = lst.get(i).VCPNUSDASI * lst.get(i).TCAMB;
                        TOTVCPNMXNASI = TOTVCPNMXNASI + lst.get(i).VCPNMXNASI;
                        TOTVCPNUSDASI = TOTVCPNUSDASI + lst.get(i).VCPNUSDASI;
                        TOTPAXASI = TOTPAXASI + lst.get(i).PAXASI;

                        lst.get(i).PAXCAM = (int) Math.round(lst_seats.get(i).CAM * lst_occupation_factor.get(i).percentageCAM / 100);
                        lst.get(i).VCPNUSDCAM = lst.get(i).VPROUSDCAM * lst.get(i).PAXCAM;
                        lst.get(i).VCPNMXNCAM = lst.get(i).VCPNUSDCAM * lst.get(i).TCAMB;
                        TOTVCPNMXNCAM = TOTVCPNMXNCAM + lst.get(i).VCPNMXNCAM;
                        TOTVCPNUSDCAM = TOTVCPNUSDCAM + lst.get(i).VCPNUSDCAM;
                        TOTPAXCAM = TOTPAXCAM + lst.get(i).PAXCAM;

                        lst.get(i).PAXCAN = (int) Math.round(lst_seats.get(i).CAN * lst_occupation_factor.get(i).percentageCAN / 100);
                        lst.get(i).VCPNUSDCAN = lst.get(i).VPROUSDCAN * lst.get(i).PAXCAN;
                        lst.get(i).VCPNMXNCAN = lst.get(i).VCPNUSDCAN * lst.get(i).TCAMB;
                        TOTVCPNMXNCAN = TOTVCPNMXNCAN + lst.get(i).VCPNMXNCAN;
                        TOTVCPNUSDCAN = TOTVCPNUSDCAN + lst.get(i).VCPNUSDCAN;
                        TOTPAXCAN = TOTPAXCAN + lst.get(i).PAXCAN;

                        lst.get(i).PAXCAR = (int) Math.round(lst_seats.get(i).CAR * lst_occupation_factor.get(i).percentageCAR / 100);
                        lst.get(i).VCPNUSDCAR = lst.get(i).VPROUSDCAR * lst.get(i).PAXCAR;
                        lst.get(i).VCPNMXNCAR = lst.get(i).VCPNUSDCAR * lst.get(i).TCAMB;
                        TOTVCPNMXNCAR = TOTVCPNMXNCAR + lst.get(i).VCPNMXNCAR;
                        TOTVCPNUSDCAR = TOTVCPNUSDCAR + lst.get(i).VCPNUSDCAR;
                        TOTPAXCAR = TOTPAXCAR + lst.get(i).PAXCAR;

                        lst.get(i).PAXEUR = (int) Math.round(lst_seats.get(i).EUR * lst_occupation_factor.get(i).percentageEUR / 100);
                        lst.get(i).VCPNUSDEUR = lst.get(i).VPROUSDEUR * lst.get(i).PAXEUR;
                        lst.get(i).VCPNMXNEUR = lst.get(i).VCPNUSDEUR * lst.get(i).TCAMB;
                        TOTVCPNMXNEUR = TOTVCPNMXNEUR + lst.get(i).VCPNMXNEUR;
                        TOTVCPNUSDEUR = TOTVCPNUSDEUR + lst.get(i).VCPNUSDEUR;
                        TOTPAXEUR = TOTPAXEUR + lst.get(i).PAXEUR;

                        lst.get(i).PAXSUD = (int) Math.round(lst_seats.get(i).SUD * lst_occupation_factor.get(i).percentageSUD / 100);
                        lst.get(i).VCPNUSDSUD = lst.get(i).VPROUSDSUD * lst.get(i).PAXSUD;
                        lst.get(i).VCPNMXNSUD = lst.get(i).VCPNUSDSUD * lst.get(i).TCAMB;
                        TOTVCPNMXNSUD = TOTVCPNMXNSUD + lst.get(i).VCPNMXNSUD;
                        TOTVCPNUSDSUD = TOTVCPNUSDSUD + lst.get(i).VCPNUSDSUD;
                        TOTPAXSUD = TOTPAXSUD + lst.get(i).PAXSUD;

                        lst.get(i).PAXUSA = (int) Math.round(lst_seats.get(i).USA * lst_occupation_factor.get(i).percentageUSA / 100);
                        lst.get(i).VCPNUSDUSA = lst.get(i).VPROUSDUSA * lst.get(i).PAXUSA;
                        lst.get(i).VCPNMXNUSA = lst.get(i).VCPNUSDUSA * lst.get(i).TCAMB;
                        TOTVCPNMXNUSA = TOTVCPNMXNUSA + lst.get(i).VCPNMXNUSA;
                        TOTVCPNUSDUSA = TOTVCPNUSDUSA + lst.get(i).VCPNUSDUSA;
                        TOTPAXUSA = TOTPAXUSA + lst.get(i).PAXUSA;

                    }
                }

                for (int i = 0; i < lst.size(); i++) {
                    lst.get(i).TOTVCPNUSDFRO = TOTVCPNUSDFRO;
                    lst.get(i).TOTVCPNMXNFRO = TOTVCPNMXNFRO;
                    lst.get(i).TOTPAXFRO = TOTPAXFRO;

                    lst.get(i).TOTVCPNUSDLOC = TOTVCPNUSDLOC;
                    lst.get(i).TOTVCPNMXNLOC = TOTVCPNMXNLOC;
                    lst.get(i).TOTPAXLOC = TOTPAXLOC;

                    lst.get(i).TOTVCPNMXNPLA = TOTVCPNMXNPLA;
                    lst.get(i).TOTVCPNUSDPLA = TOTVCPNUSDPLA;
                    lst.get(i).TOTPAXPLA = TOTPAXPLA;

                    lst.get(i).TOTVCPNUSDASI = TOTVCPNUSDASI;
                    lst.get(i).TOTVCPNMXNASI = TOTVCPNMXNASI;
                    lst.get(i).TOTPAXASI = TOTPAXASI;

                    lst.get(i).TOTVCPNUSDCAM = TOTVCPNUSDCAM;
                    lst.get(i).TOTVCPNMXNCAM = TOTVCPNMXNCAM;
                    lst.get(i).TOTPAXCAM = TOTPAXCAM;

                    lst.get(i).TOTVCPNUSDCAN = TOTVCPNUSDCAN;
                    lst.get(i).TOTVCPNMXNCAN = TOTVCPNMXNCAN;
                    lst.get(i).TOTPAXCAN = TOTPAXCAN;

                    lst.get(i).TOTVCPNUSDCAR = TOTVCPNUSDCAR;
                    lst.get(i).TOTVCPNMXNCAR = TOTVCPNMXNCAR;
                    lst.get(i).TOTPAXCAR = TOTPAXCAR;

                    lst.get(i).TOTVCPNUSDEUR = TOTVCPNUSDEUR;
                    lst.get(i).TOTVCPNMXNEUR = TOTVCPNMXNEUR;
                    lst.get(i).TOTPAXEUR = TOTPAXEUR;

                    lst.get(i).TOTVCPNUSDSUD = TOTVCPNUSDSUD;
                    lst.get(i).TOTVCPNMXNSUD = TOTVCPNMXNSUD;
                    lst.get(i).TOTPAXSUD = TOTPAXSUD;

                    lst.get(i).TOTVCPNUSDUSA = TOTVCPNUSDUSA;
                    lst.get(i).TOTVCPNMXNUSA = TOTVCPNMXNUSA;
                    lst.get(i).TOTPAXUSA = TOTPAXUSA;

                    //PROMEDIOS TOTALES
                    if (TOTPAXASI > 0){
                        lst.get(i).TOTVPROUSDASI = TOTVCPNUSDASI / TOTPAXASI;
                    } else {
                        lst.get(i).TOTVPROUSDASI = 0;
                    }
                    
                    lst.get(i).TOTVPROUSDCAM = TOTVCPNUSDCAM / TOTPAXCAM;
                    lst.get(i).TOTVPROUSDCAN = TOTVCPNUSDCAN / TOTPAXCAN;
                    lst.get(i).TOTVPROUSDCAR = TOTVCPNUSDCAR / TOTPAXCAR;
                    lst.get(i).TOTVPROUSDEUR = TOTVCPNUSDEUR / TOTPAXEUR;
                    lst.get(i).TOTVPROUSDFRO = TOTVCPNUSDFRO / TOTPAXFRO;
                    lst.get(i).TOTVPROUSDLOC = TOTVCPNUSDLOC / TOTPAXLOC;
                    lst.get(i).TOTVPROUSDPLA = TOTVCPNUSDPLA / TOTPAXPLA;
                    lst.get(i).TOTVPROUSDSUD = TOTVCPNUSDSUD / TOTPAXSUD;
                    lst.get(i).TOTVPROUSDUSA = TOTVCPNUSDUSA / TOTPAXUSA;

                    //TOTAL DE REGISTROS
                    if (lst.get(i).VCPNMXNASI > 0) {
                        totalRegistrosASI++;
                    }
                    if (lst.get(i).VCPNMXNCAM > 0) {
                        totalRegistrosCAM++;
                    }
                    if (lst.get(i).VCPNMXNCAN > 0) {
                        totalRegistrosCAN++;
                    }
                    if (lst.get(i).VCPNMXNCAR > 0) {
                        totalRegistrosCAR++;
                    }
                    if (lst.get(i).VCPNMXNEUR > 0) {
                        totalRegistrosEUR++;
                    }
                    if (lst.get(i).VCPNMXNFRO > 0) {
                        totalRegistrosFRO++;
                    }
                    if (lst.get(i).VCPNMXNLOC > 0) {
                        totalRegistrosLOC++;
                    }
                    if (lst.get(i).VCPNMXNPLA > 0) {
                        totalRegistrosPLA++;
                    }
                    if (lst.get(i).VCPNMXNSUD > 0) {
                        totalRegistrosSUD++;
                    }
                    if (lst.get(i).VCPNMXNUSA > 0) {
                        totalRegistrosUSA++;
                    }

                }
            }

            for (int i = 0; i < lst.size(); i++) {

                //ASI
                if (lst.get(i).VCPNMXNASI > 0) {
                    lst.get(i).AVRG_VCPNMXN_ASI = ((lst.get(i).VCPNMXNASI - (TOTVCPNMXNASI / totalRegistrosASI)) / (TOTVCPNMXNASI / totalRegistrosASI)) * 100;

                    if (lst.get(i).AVRG_VCPNMXN_ASI >= 20) {
                        lst.get(i).strImagen_ASI = "resources/img/icon/16x16/circle_red.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_ASI < 20 && lst.get(i).AVRG_VCPNMXN_ASI >= -25) {
                        lst.get(i).strImagen_ASI = "resources/img/icon/16x16/circle_green.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_ASI < -25) {
                        lst.get(i).strImagen_ASI = "resources/img/icon/16x16/Circle_Yellow.png";
                    }
                    //lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
                }
                //CAM
                if (lst.get(i).VCPNMXNCAM > 0) {
                    lst.get(i).AVRG_VCPNMXN_CAM = ((lst.get(i).VCPNMXNCAM - (TOTVCPNMXNCAM / totalRegistrosCAM)) / (TOTVCPNMXNCAM / totalRegistrosCAM)) * 100;

                    if (lst.get(i).AVRG_VCPNMXN_CAM >= 20) {
                        lst.get(i).strImagen_CAM = "resources/img/icon/16x16/circle_red.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_CAM < 20 && lst.get(i).AVRG_VCPNMXN_CAM >= -25) {
                        lst.get(i).strImagen_CAM = "resources/img/icon/16x16/circle_green.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_CAM < -25) {
                        lst.get(i).strImagen_CAM = "resources/img/icon/16x16/Circle_Yellow.png";
                    }
                    //lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
                }
                //CAN
                if (lst.get(i).VCPNMXNCAN > 0) {
                    lst.get(i).AVRG_VCPNMXN_CAN = ((lst.get(i).VCPNMXNCAN - (TOTVCPNMXNCAN / totalRegistrosCAN)) / (TOTVCPNMXNCAN / totalRegistrosCAN)) * 100;

                    if (lst.get(i).AVRG_VCPNMXN_CAN >= 20) {
                        lst.get(i).strImagen_CAN = "resources/img/icon/16x16/circle_red.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_CAN < 20 && lst.get(i).AVRG_VCPNMXN_CAN >= -25) {
                        lst.get(i).strImagen_CAN = "resources/img/icon/16x16/circle_green.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_CAN < -25) {
                        lst.get(i).strImagen_CAN = "resources/img/icon/16x16/Circle_Yellow.png";
                    }
                    //lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
                }
                //CAR
                if (lst.get(i).VCPNMXNCAR > 0) {
                    lst.get(i).AVRG_VCPNMXN_CAR = ((lst.get(i).VCPNMXNCAR - (TOTVCPNMXNCAR / totalRegistrosCAR)) / (TOTVCPNMXNCAR / totalRegistrosCAR)) * 100;

                    if (lst.get(i).AVRG_VCPNMXN_CAR >= 20) {
                        lst.get(i).strImagen_CAR = "resources/img/icon/16x16/circle_red.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_CAR < 20 && lst.get(i).AVRG_VCPNMXN_CAR >= -25) {
                        lst.get(i).strImagen_CAR = "resources/img/icon/16x16/circle_green.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_CAR < -25) {
                        lst.get(i).strImagen_CAR = "resources/img/icon/16x16/Circle_Yellow.png";
                    }
                    //lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
                }
                //EUR
                if (lst.get(i).VCPNMXNEUR > 0) {
                    lst.get(i).AVRG_VCPNMXN_EUR = ((lst.get(i).VCPNMXNEUR - (TOTVCPNMXNEUR / totalRegistrosEUR)) / (TOTVCPNMXNEUR / totalRegistrosEUR)) * 100;

                    if (lst.get(i).AVRG_VCPNMXN_EUR >= 20) {
                        lst.get(i).strImagen_EUR = "resources/img/icon/16x16/circle_red.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_EUR < 20 && lst.get(i).AVRG_VCPNMXN_EUR >= -25) {
                        lst.get(i).strImagen_EUR = "resources/img/icon/16x16/circle_green.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_EUR < -25) {
                        lst.get(i).strImagen_EUR = "resources/img/icon/16x16/Circle_Yellow.png";
                    }
                    //lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
                }
                //FRO
                if (lst.get(i).VCPNMXNFRO > 0) {
                    lst.get(i).AVRG_VCPNMXN_FRO = ((lst.get(i).VCPNMXNFRO - (TOTVCPNMXNFRO / totalRegistrosFRO)) / (TOTVCPNMXNFRO / totalRegistrosFRO)) * 100;

                    if (lst.get(i).AVRG_VCPNMXN_FRO >= 20) {
                        lst.get(i).strImagen_FRO = "resources/img/icon/16x16/circle_red.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_FRO < 20 && lst.get(i).AVRG_VCPNMXN_FRO >= -25) {
                        lst.get(i).strImagen_FRO = "resources/img/icon/16x16/circle_green.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_FRO < -25) {
                        lst.get(i).strImagen_FRO = "resources/img/icon/16x16/Circle_Yellow.png";
                    }
                    //lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
                }
                //LOC
                if (lst.get(i).VCPNMXNLOC > 0) {
                    lst.get(i).AVRG_VCPNMXN_LOC = ((lst.get(i).VCPNMXNLOC - (TOTVCPNMXNLOC / totalRegistrosLOC)) / (TOTVCPNMXNLOC / totalRegistrosLOC)) * 100;

                    if (lst.get(i).AVRG_VCPNMXN_LOC >= 20) {
                        lst.get(i).strImagen_LOC = "resources/img/icon/16x16/circle_red.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_LOC < 20 && lst.get(i).AVRG_VCPNMXN_LOC >= -25) {
                        lst.get(i).strImagen_LOC = "resources/img/icon/16x16/circle_green.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_LOC < -25) {
                        lst.get(i).strImagen_LOC = "resources/img/icon/16x16/Circle_Yellow.png";
                    }
                    //lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
                }
                //PLA
                if (lst.get(i).VCPNMXNPLA > 0) {
                    lst.get(i).AVRG_VCPNMXN_PLA = ((lst.get(i).VCPNMXNPLA - (TOTVCPNMXNPLA / totalRegistrosPLA)) / (TOTVCPNMXNPLA / totalRegistrosPLA)) * 100;

                    if (lst.get(i).AVRG_VCPNMXN_PLA >= 20) {
                        lst.get(i).strImagen_PLA = "resources/img/icon/16x16/circle_red.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_PLA < 20 && lst.get(i).AVRG_VCPNMXN_PLA >= -25) {
                        lst.get(i).strImagen_PLA = "resources/img/icon/16x16/circle_green.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_PLA < -25) {
                        lst.get(i).strImagen_PLA = "resources/img/icon/16x16/Circle_Yellow.png";
                    }
                    //lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
                }
                //SUD
                if (lst.get(i).VCPNMXNSUD > 0) {
                    lst.get(i).AVRG_VCPNMXN_SUD = ((lst.get(i).VCPNMXNSUD - (TOTVCPNMXNSUD / totalRegistrosSUD)) / (TOTVCPNMXNSUD / totalRegistrosSUD)) * 100;

                    if (lst.get(i).AVRG_VCPNMXN_SUD >= 20) {
                        lst.get(i).strImagen_SUD = "resources/img/icon/16x16/circle_red.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_SUD < 20 && lst.get(i).AVRG_VCPNMXN_SUD >= -25) {
                        lst.get(i).strImagen_SUD = "resources/img/icon/16x16/circle_green.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_SUD < -25) {
                        lst.get(i).strImagen_SUD = "resources/img/icon/16x16/Circle_Yellow.png";
                    }
                    //lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
                }
                //USA
                if (lst.get(i).VCPNMXNUSA > 0) {
                    lst.get(i).AVRG_VCPNMXN_USA = ((lst.get(i).VCPNMXNUSA - (TOTVCPNMXNUSA / totalRegistrosUSA)) / (TOTVCPNMXNUSA / totalRegistrosUSA)) * 100;

                    if (lst.get(i).AVRG_VCPNMXN_USA >= 20) {
                        lst.get(i).strImagen_USA = "resources/img/icon/16x16/circle_red.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_USA < 20 && lst.get(i).AVRG_VCPNMXN_USA >= -25) {
                        lst.get(i).strImagen_USA = "resources/img/icon/16x16/circle_green.png";
                    }
                    if (lst.get(i).AVRG_VCPNMXN_USA < -25) {
                        lst.get(i).strImagen_USA = "resources/img/icon/16x16/Circle_Yellow.png";
                    }
                    //lst.get(i).AVRG_VCPMXN_PORCENTAJE = Functions.redondear(lst.get(i).AVRG_VCPNMXN, 2) + "%";
                }

            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public List<IMF140Filter> loadPX551SQP03937(IMF140Filter filter) throws SQLException, Exception {

        List<IMF140Filter> lst = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;
        long QTYPAX = 0;
        double VCPNUSD = 0, VPROUSD = 0, VCPNMXN = 0, VPROMXN = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03937(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                VCPNMXN = rst.getDouble("VCPNMXN");
                VCPNUSD = rst.getDouble("VCPNUSD");
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new IMF140Filter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    bean.IN_TREG = filter.IN_TREG.trim();

                    bean.ZONA = rst.getString("ZONA").trim();
                    bean.VCPNMXN = rst.getDouble("VCPNMXN");
                    bean.VCPNUSD = rst.getDouble("VCPNUSD");

                    bean.totVCPNMXN = VCPNMXN;
                    bean.totVCPNUSD = VCPNUSD;

                    lst.add(bean);
                }
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public List<IMF140Filter> loadPX551SQP04015(IMF140Filter filter) throws SQLException, Exception {

        List<IMF140Filter> lst = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;
        long QTYPAX = 0;
        double VCPNUSD = 0, VPROUSD = 0, VCPNMXN = 0, VPROMXN = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04015(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                VCPNMXN = rst.getDouble("VCPNMXN");
                VCPNUSD = rst.getDouble("VCPNUSD");
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new IMF140Filter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    bean.IN_TREG = filter.IN_TREG.trim();

                    bean.ZONA = rst.getString("ZONA").trim();
                    bean.VCPNMXN = rst.getDouble("VCPNMXN");
                    bean.VCPNUSD = rst.getDouble("VCPNUSD");
                    bean.LABEL_MXN = rst.getString("ZONA").trim() + ": " + rst.getDouble("VCPNMXN");
                    bean.LABEL_USD = rst.getString("ZONA").trim() + ": " + rst.getDouble("VCPNUSD");

                    bean.totVCPNMXN = VCPNMXN;
                    bean.totVCPNUSD = VCPNUSD;

                    lst.add(bean);
                }
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public List<IMF140Filter> loadPX551SQP04016(IMF140Filter filter) throws SQLException, Exception {

        List<IMF140Filter> lst = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;
        long QTYPAX = 0;
        double VCPNUSD = 0, VPROUSD = 0, VCPNMXN = 0, VPROMXN = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04016(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                VCPNMXN = rst.getDouble("VCPNMXN");
                VCPNUSD = rst.getDouble("VCPNUSD");
                QTYPAX = rst.getLong("QTYPAXS");
                VPROUSD = rst.getDouble("VPROUSD");
                VPROMXN = rst.getDouble("VPROMXN");
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new IMF140Filter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    bean.IN_TREG = filter.IN_TREG.trim();

                    bean.ZONA = rst.getString("ZONA").trim();
                    bean.VCPNMXN = rst.getDouble("VCPNMXN");
                    bean.VCPNUSD = rst.getDouble("VCPNUSD");
                    bean.VPROUSD = rst.getDouble("VPROUSD");
                    bean.VPROMXN = rst.getDouble("VPROMXN");
                    bean.LABEL_MXN = rst.getString("ZONA").trim() + ": " + rst.getDouble("VCPNMXN");
                    bean.LABEL_USD = rst.getString("ZONA").trim() + ": " + rst.getDouble("VCPNUSD");
                    bean.QTYPAX = rst.getInt("QTYPAXS");

                    bean.totVCPNMXN = VCPNMXN;
                    bean.totVCPNUSD = VCPNUSD;
                    bean.totQTYPAX = QTYPAX;
                    bean.totVPROUSD = VPROUSD;
                    bean.totVPROMXN = VPROMXN;

                    lst.add(bean);
                }
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public HashMap<String, List<IMF140Filter>> loadPX551SQP04017(IMF140Filter filter) throws SQLException, Exception {
        //Domestico
        long DQTYPAX = 0;
        double DVCPNUSD = 0, DVPROUSD = 0, DVCPNMXN = 0, DVPROMXN = 0;
        //Internacional
        long IQTYPAX = 0;
        double IVCPNUSD = 0, IVPROUSD = 0, IVCPNMXN = 0, IVPROMXN = 0;
        List<IMF140Filter> lstDomestic = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;
        List<IMF140Filter> lstInternational = new ArrayList<IMF140Filter>(0);
        IMF140Filter beanI;
        HashMap<String, List<IMF140Filter>> hmResultado = new HashMap<String, List<IMF140Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04017(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new IMF140Filter();
                bean.ZONA = rst.getString("ZONA").trim();
                bean.VCPNMXN = rst.getDouble("VCPNMXN");
                bean.VCPNUSD = rst.getDouble("VCPNUSD");
                bean.VPROUSD = rst.getDouble("VPROUSD");
                bean.VPROMXN = rst.getDouble("VPROMXN");
                bean.LABEL_MXN = rst.getString("ZONA").trim() + ": " + rst.getDouble("VCPNMXN");
                bean.LABEL_USD = rst.getString("ZONA").trim() + ": " + rst.getDouble("VCPNUSD");
                bean.QTYPAX = rst.getInt("QTYPAXS");

                DVCPNMXN = DVCPNMXN + rst.getDouble("VCPNMXN");
                DVCPNUSD = DVCPNUSD + rst.getDouble("VCPNUSD");
                DVPROUSD = DVPROUSD + rst.getDouble("VPROUSD");
                DVPROMXN = DVPROMXN + rst.getDouble("VPROMXN");
                DQTYPAX = DQTYPAX + rst.getInt("QTYPAXS");

                lstDomestic.add(bean);
            }

            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    beanI = new IMF140Filter();
                    beanI.ZONA = rst.getString("ZONA").trim();
                    beanI.VCPNMXN = rst.getDouble("VCPNMXN");
                    beanI.VCPNUSD = rst.getDouble("VCPNUSD");
                    beanI.VPROUSD = rst.getDouble("VPROUSD");
                    beanI.VPROMXN = rst.getDouble("VPROMXN");
                    beanI.QTYPAX = rst.getInt("QTYPAXS");

                    IVCPNMXN = IVCPNMXN + rst.getDouble("VCPNMXN");
                    IVCPNUSD = IVCPNUSD + rst.getDouble("VCPNUSD");
                    IVPROUSD = IVPROUSD + rst.getDouble("VPROUSD");
                    IVPROMXN = IVPROMXN + rst.getDouble("VPROMXN");
                    IQTYPAX = IQTYPAX + rst.getInt("QTYPAXS");

                    lstInternational.add(beanI);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        for (int i = 0; i < lstDomestic.size(); i++) {
            lstDomestic.get(i).totVCPNMXN = DVCPNMXN;
            lstDomestic.get(i).totVCPNUSD = DVCPNUSD;
            lstDomestic.get(i).totVPROUSD = DVCPNUSD / DQTYPAX;
            lstDomestic.get(i).totVPROMXN = DVCPNMXN / DQTYPAX;
            lstDomestic.get(i).totQTYPAX = DQTYPAX;
        }

        for (int i = 0; i < lstInternational.size(); i++) {
            lstInternational.get(i).totVCPNMXN = IVCPNMXN;
            lstInternational.get(i).totVCPNUSD = IVCPNUSD;
            lstInternational.get(i).totVPROUSD = IVCPNUSD / IQTYPAX;
            lstInternational.get(i).totVPROMXN = IVCPNMXN / IQTYPAX;
            lstInternational.get(i).totQTYPAX = IQTYPAX;
        }
        hmResultado.put("DOMESTIC", lstDomestic);
        hmResultado.put("INTERNATIONAL", lstInternational);
        return hmResultado;
    }

    public HashMap<String, List<IMF140Filter>> loadPX551SQP04096(IMF140Filter filter) throws SQLException, Exception {
        //Domestico
        long DQTYPAX = 0;
        double DVCPNUSD = 0, DVPROUSD = 0, DVCPNMXN = 0, DVPROMXN = 0;
        //Internacional
        long IQTYPAX = 0;
        double IVCPNUSD = 0, IVPROUSD = 0, IVCPNMXN = 0, IVPROMXN = 0;
        List<IMF140Filter> lstDomestic = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;
        List<IMF140Filter> lstInternational = new ArrayList<IMF140Filter>(0);
        IMF140Filter beanI;
        HashMap<String, List<IMF140Filter>> hmResultado = new HashMap<String, List<IMF140Filter>>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04096(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_YEAR);
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new IMF140Filter();
                bean.DFLIGHT = rst.getString("DFLIGHT").trim();
                bean.VCPNMXN = rst.getDouble("VCPNMXN");
                bean.VCPNUSD = rst.getDouble("VCPNUSD");
                /*bean.VPROUSD = rst.getDouble("VPROUSD");
                 bean.VPROMXN = rst.getDouble("VPROMXN");*/
                bean.LABEL_MXN = rst.getString("DFLIGHT").trim() + ": " + rst.getDouble("VCPNMXN");
                bean.LABEL_USD = rst.getString("DFLIGHT").trim() + ": " + rst.getDouble("VCPNUSD");
                bean.QTYPAX = rst.getInt("QTYPAXS");

                DVCPNMXN = DVCPNMXN + rst.getDouble("VCPNMXN");
                DVCPNUSD = DVCPNUSD + rst.getDouble("VCPNUSD");
                //DVPROUSD = DVPROUSD + rst.getDouble("VPROUSD");
                //DVPROMXN = DVPROMXN + rst.getDouble("VPROMXN");
                DQTYPAX = DQTYPAX + rst.getInt("QTYPAXS");

                lstDomestic.add(bean);
            }

            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    beanI = new IMF140Filter();
                    beanI.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanI.VCPNMXN = rst.getDouble("VCPNMXN");
                    beanI.VCPNUSD = rst.getDouble("VCPNUSD");
                    /*beanI.VPROUSD = rst.getDouble("VPROUSD");
                     beanI.VPROMXN = rst.getDouble("VPROMXN");*/
                    beanI.QTYPAX = rst.getInt("QTYPAXS");
                    beanI.LABEL_MXN = rst.getString("DFLIGHT").trim() + ": " + rst.getDouble("VCPNMXN");
                    beanI.LABEL_USD = rst.getString("DFLIGHT").trim() + ": " + rst.getDouble("VCPNUSD");

                    IVCPNMXN = IVCPNMXN + rst.getDouble("VCPNMXN");
                    IVCPNUSD = IVCPNUSD + rst.getDouble("VCPNUSD");
                    /*IVPROUSD = IVPROUSD + rst.getDouble("VPROUSD");
                     IVPROMXN = IVPROMXN + rst.getDouble("VPROMXN");*/
                    IQTYPAX = IQTYPAX + rst.getInt("QTYPAXS");

                    lstInternational.add(beanI);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        for (int i = 0; i < lstDomestic.size(); i++) { //lstDomestic.size()
            /*if (i > lstDomestic.size()) {
             IMF140Filter beanTemp = new IMF140Filter();
             lstDomestic.add(beanTemp);
             } else {
             }*/
            lstDomestic.get(i).totVCPNMXN = DVCPNMXN;
            lstDomestic.get(i).totVCPNUSD = DVCPNUSD;
            lstDomestic.get(i).totVPROUSD = DVCPNUSD / DQTYPAX;
            lstDomestic.get(i).totVPROMXN = DVCPNMXN / DQTYPAX;
            lstDomestic.get(i).totQTYPAX = DQTYPAX;
        }

        for (int i = 0; i < lstInternational.size(); i++) {//lstInternational.size()
            /*if (i > lstInternational.size()) {
             IMF140Filter beanITemp = new IMF140Filter();
             lstInternational.add(beanITemp);
             } else {

             }*/

            lstInternational.get(i).totVCPNMXN = IVCPNMXN;
            lstInternational.get(i).totVCPNUSD = IVCPNUSD;
            lstInternational.get(i).totVPROUSD = IVCPNUSD / IQTYPAX;
            lstInternational.get(i).totVPROMXN = IVCPNMXN / IQTYPAX;
            lstInternational.get(i).totQTYPAX = IQTYPAX;
        }
        hmResultado.put("DOMESTIC", lstDomestic);
        hmResultado.put("INTERNATIONAL", lstInternational);
        return hmResultado;
    }

    public List<IMF140Filter> loadPX551SQP04097(IMF140Filter filter) throws SQLException, Exception {

        List<IMF140Filter> lst = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        HashMap<String, String> hmDescMeses = new HashMap<String, String>();
        hmDescMeses.put("01", "Jan");
        hmDescMeses.put("02", "Feb");
        hmDescMeses.put("03", "Mar");
        hmDescMeses.put("04", "Apr");
        hmDescMeses.put("05", "May");
        hmDescMeses.put("06", "Jun");
        hmDescMeses.put("07", "Jul");
        hmDescMeses.put("08", "Aug");
        hmDescMeses.put("09", "Sep");
        hmDescMeses.put("10", "Oct");
        hmDescMeses.put("11", "Nov");
        hmDescMeses.put("12", "Dec");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04097(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, "2021");
            cstmt.setString(3, "2020");

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                bean = new IMF140Filter();
                //bean.MES = rst.getString("MES").trim();
                if (hmDescMeses.containsKey(rst.getString("MES").trim().toUpperCase())) {
                    bean.MES = hmDescMeses.get(rst.getString("MES").trim()).toString();
                } else {
                    bean.MES = rst.getString("MES").trim();
                }
                //GENERAL
                bean.GENERAL_VCPNUSD_CY = rst.getDouble("GENERAL_VCPNUSD_CY");
                bean.GENERAL_VCPNMXN_CY = rst.getDouble("GENERAL_VCPNMXN_CY");
                bean.GENERAL_VCPNUSD_LY = rst.getDouble("GENERAL_VCPNUSD_LY");
                bean.GENERAL_VCPNMXN_LY = rst.getDouble("GENERAL_VCPNMXN_LY");
                //DOMESTIC
                bean.DOMESTIC_VCPNUSD_CY = rst.getDouble("DOMESTIC_VCPNUSD_CY");
                bean.DOMESTIC_VCPNMXN_CY = rst.getDouble("DOMESTIC_VCPNMXN_CY");
                bean.DOMESTIC_VCPNUSD_LY = rst.getDouble("DOMESTIC_VCPNUSD_LY");
                bean.DOMESTIC_VCPNMXN_LY = rst.getDouble("DOMESTIC_VCPNMXN_LY");
                //INTERNATIONAL
                bean.INTERNATIONAL_VCPNUSD_CY = rst.getDouble("INTERNATIONAL_VCPNUSD_CY");
                bean.INTERNATIONAL_VCPNMXN_CY = rst.getDouble("INTERNATIONAL_VCPNMXN_CY");
                bean.INTERNATIONAL_VCPNUSD_LY = rst.getDouble("INTERNATIONAL_VCPNUSD_LY");
                bean.INTERNATIONAL_VCPNMXN_LY = rst.getDouble("INTERNATIONAL_VCPNMXN_LY");

                lst.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public List<IMF140Filter> loadPX551SQP04118(IMF140Filter filter) throws SQLException, Exception {

        List<IMF140Filter> lst = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        HashMap<String, String> hmDescMeses = new HashMap<String, String>();
        hmDescMeses.put("01", "Jan");
        hmDescMeses.put("02", "Feb");
        hmDescMeses.put("03", "Mar");
        hmDescMeses.put("04", "Apr");
        hmDescMeses.put("05", "May");
        hmDescMeses.put("06", "Jun");
        hmDescMeses.put("07", "Jul");
        hmDescMeses.put("08", "Aug");
        hmDescMeses.put("09", "Sep");
        hmDescMeses.put("10", "Oct");
        hmDescMeses.put("11", "Nov");
        hmDescMeses.put("12", "Dec");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04118(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, "2021");
            cstmt.setString(3, "2020");

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                bean = new IMF140Filter();
                //bean.MES = rst.getString("MES").trim();
                if (hmDescMeses.containsKey(rst.getString("MES").trim().toUpperCase())) {
                    bean.MES = hmDescMeses.get(rst.getString("MES").trim()).toString();
                } else {
                    bean.MES = rst.getString("MES").trim();
                }
                bean.DOMESTIC_B_QTYPAX = rst.getDouble("DOMESTIC_B_QTYPAX");
                bean.DOMESTIC_B_VCPNUSD = rst.getDouble("DOMESTIC_B_VCPNUSD");
                bean.DOMESTIC_B_VCPNMXN = rst.getDouble("DOMESTIC_B_VCPNMXN");
                bean.INTERNATIONAL_B_QTYPAX = rst.getDouble("INTERNATIONAL_B_QTYPAX");
                bean.INTERNATIONAL_B_VCPNUSD = rst.getDouble("INTERNATIONAL_B_VCPNUSD");
                bean.INTERNATIONAL_B_VCPNMXN = rst.getDouble("INTERNATIONAL_B_VCPNMXN");
                bean.GENERAL_B_QTYPAX = rst.getDouble("GENERAL_B_QTYPAX");
                bean.GENERAL_B_VCPNUSD = rst.getDouble("GENERAL_B_VCPNUSD");
                bean.GENERAL_B_VCPNMXN = rst.getDouble("GENERAL_B_VCPNMXN");

                lst.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        return lst;
    }

    public List<IMF140Filter> loadPX551SQP04119(IMF140Filter filter) throws SQLException, Exception {

        List<IMF140Filter> lst = new ArrayList<IMF140Filter>(0);
        IMF140Filter bean;

        double VCPNMXN = 0.0, VCPNUSD = 0.0;
        long QTYPAX = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04119(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_YEAR);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                bean = new IMF140Filter();

                bean = new IMF140Filter();
                bean.DFLIGHT = rst.getString("DFLIGHT").trim();
                bean.VCPNMXN = rst.getDouble("VCPNMXN");
                bean.VCPNUSD = rst.getDouble("VCPNUSD");
                bean.LABEL_MXN = rst.getString("DFLIGHT").trim() + ": " + rst.getDouble("VCPNMXN");
                bean.LABEL_USD = rst.getString("DFLIGHT").trim() + ": " + rst.getDouble("VCPNUSD");
                bean.QTYPAX = rst.getInt("QTYPAXS");

                VCPNMXN = VCPNMXN + rst.getDouble("VCPNMXN");
                VCPNUSD = VCPNUSD + rst.getDouble("VCPNUSD");
                QTYPAX = QTYPAX + rst.getInt("QTYPAXS");

                lst.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
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

        for (int i = 0; i < lst.size(); i++) { //lstDomestic.size()

            lst.get(i).totVCPNMXN = VCPNMXN;
            lst.get(i).totVCPNUSD = VCPNUSD;
            lst.get(i).totVPROUSD = VCPNUSD / QTYPAX;
            lst.get(i).totVPROMXN = VCPNMXN / QTYPAX;
            lst.get(i).totQTYPAX = QTYPAX;
        }

        return lst;
    }

}
