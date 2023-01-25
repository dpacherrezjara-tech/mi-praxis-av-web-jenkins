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
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class RevenueZoneDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public RevenueZoneDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RevenueZoneDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1744Filter> loadPX079S01A1744(A1744Filter filter, String tipo) throws SQLException, Exception {

        List<A1744Filter> lstBeans = new ArrayList<A1744Filter>(0);
        A1744Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        int intTotQDOC = 0, TOTQTY_EMD = 0;
        double dblTotDOC = 0, TOTEMD = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        //</editor-fold>

        //PX07900001
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX079S01A1744(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt.setString(3, filter.yearTo + filter.monthTo);
            cstmt.setString(4, filter.IN_CARRIER);
            cstmt.setString(5, filter.FFLOW);
            cstmt.setString(6, tipo);
            cstmt.execute();

            rst = cstmt.getResultSet();
            if (rst.next()) {
                intTotQDOC = rst.getInt("QTYPAX") + rst.getInt("QTYPAXO");
                dblTotDOC = rst.getDouble("TOTPAX") + rst.getDouble("TOTPAXO");
                TOTQTY_EMD = rst.getInt("QTYEMD");
                TOTEMD = rst.getDouble("TOTEMD");
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new A1744Filter();
                    bean.strDescTipo = "All Revenues";
                    bean.FFLOW = rst.getString("FFLOW");
                    if (bean.FFLOW.equals("P")) {
                        bean.strDescr_FFLOW = "Scheduled";
                    } else if (bean.FFLOW.equals("C")) {
                        bean.strDescr_FFLOW = "Charter";
                    } else if (bean.FFLOW.equals("X")) {
                        bean.strDescr_FFLOW = "Canceled";
                    } else if (bean.FFLOW.equals("U")) {
                        bean.strDescr_FFLOW = "Unscheduled";
                    }
                    bean.DFLIGHT = rst.getString("DATE");
                    bean.CARR = rst.getString("CARR");
                    if (bean.CARR.equals("AM")) {
                        bean.strDescCarrier = "Aeroméxico";
                    } else if (bean.CARR.equals("5D")) {
                        bean.strDescCarrier = "AM Connect";
                    } else if (bean.CARR.equals("VW")) {
                        bean.strDescCarrier = "Aeromar";
                    } else {
                        bean.strDescCarrier = "(None)";
                    }
                    bean.strFormatDate = Functions.getMonthConvert(bean.DFLIGHT);
                    bean.intQDOC = rst.getInt("QTYPAX") + rst.getInt("QTYPAXO");
                    bean.dblDOC = rst.getDouble("TOTPAX") + rst.getDouble("TOTPAXO");
                    bean.intTotQDOC = intTotQDOC;
                    bean.dblTotDOC = dblTotDOC;
                    bean.QTYEMD = rst.getInt("QTYEMD");
                    bean.TOTEMD = rst.getDouble("TOTEMD");

                    bean.totQTYEMD = TOTQTY_EMD;
                    bean.totTOTEMD = TOTEMD;

                    lstBeans.add(bean);
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

        return lstBeans;
    }

    public List<A1744Filter> loadPX079S03A1744(A1744Filter filter, String tipo) throws SQLException, Exception {

        List<A1744Filter> lstBeans = new ArrayList<A1744Filter>(0);
        A1744Filter bean;
        int intTotQDOC = 0, intTotQTYFLIG = 0, intTotQTYPAX = 0, intTotQTYEMD = 0, intTotQAM = 0, intTotQTYPAXO = 0;
        double dblTotDOC = 0, dblTotTOTPAX = 0, dblTotTOTEMD = 0, dblTotAM = 0, dblTotTOTPAXO = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        //PX07900003
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX079S03A1744(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DFLIGHT.trim());
            cstmt.setString(3, filter.CARR);
            cstmt.setString(4, filter.FFLOW);
            cstmt.setString(5, tipo);
            cstmt.execute();

            rst = cstmt.getResultSet();
            if (rst.next()) {
                /*intTotQDOC = rst.getInt("QTYPAX") + rst.getInt("QTYPAXO") + rst.getInt("QTYEMD");
                 dblTotDOC = rst.getDouble("TOTPAX") + rst.getDouble("TOTPAXO") + rst.getDouble("TOTEMD");*/
                intTotQDOC = rst.getInt("QTYPAX") + rst.getInt("QTYPAXO");
                dblTotDOC = rst.getDouble("TOTPAX") + rst.getDouble("TOTPAXO");
                intTotQTYFLIG = rst.getInt("QTYFLIG");//+ rst.getInt("QTYFLIGO");
                intTotQTYPAX = rst.getInt("QTYPAX") + rst.getInt("QTYPAXO");
                dblTotTOTPAX = rst.getDouble("TOTPAX") + rst.getDouble("TOTPAXO");
                intTotQTYEMD = rst.getInt("QTYEMD");
                dblTotTOTEMD = rst.getDouble("TOTEMD");
                intTotQAM = rst.getInt("QTYPAX");
                dblTotAM = rst.getDouble("TOTPAX");
                intTotQTYPAXO = rst.getInt("QTYPAXO");
                dblTotTOTPAXO = rst.getDouble("TOTPAXO");
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    //PAX ==========================================================
                    bean = new A1744Filter();
                    bean.strDescTipo = "ALL ZONES";
                    bean.DFLIGHT = filter.DFLIGHT;
                    bean.FFLOW = rst.getString("FFLOW");
                    if (bean.FFLOW.equals("P")) {
                        bean.strDescr_FFLOW = "Scheduled";
                    } else if (bean.FFLOW.equals("C")) {
                        bean.strDescr_FFLOW = "Charter";
                    } else if (bean.FFLOW.equals("X")) {
                        bean.strDescr_FFLOW = "Canceled";
                    } else if (bean.FFLOW.equals("U")) {
                        bean.strDescr_FFLOW = "Unscheduled";
                    }
                    bean.CARR = filter.CARR;
                    if (bean.CARR.equals("AM")) {
                        bean.strDescCarrier = "Aeroméxico";
                    } else if (bean.CARR.equals("5D")) {
                        bean.strDescCarrier = "AM Connect";
                    } else if (bean.CARR.equals("VW")) {
                        bean.strDescCarrier = "Aeromar";
                    } else {
                        bean.strDescCarrier = "(None)";
                    }
                    bean.SERIE = "";
                    bean.strFormatDate = filter.strFormatDate;
                    bean.ZONA = rst.getString("ZONA").trim();
                    bean.strDescZONA = Functions.getNombreZonas(bean.ZONA);
                    bean.intQDOC = rst.getInt("QTYPAX") + rst.getInt("QTYPAXO");
                    bean.dblDOC = rst.getDouble("TOTPAX") + rst.getDouble("TOTPAXO");
                    bean.QTYFLIG = rst.getInt("QTYFLIG");// + rst.getInt("QTYFLIGO");
                    bean.QTYPAX = rst.getInt("QTYPAX") + rst.getInt("QTYPAXO");
                    bean.TOTPAX = rst.getDouble("TOTPAX") + rst.getDouble("TOTPAXO");
                    bean.QTYEMD = rst.getInt("QTYEMD");
                    bean.TOTEMD = rst.getDouble("TOTEMD");
                    bean.intQAM = rst.getInt("QTYPAX");
                    bean.dblAM = rst.getDouble("TOTPAX");
                    bean.QTYPAXO = rst.getInt("QTYPAXO");
                    bean.TOTPAXO = rst.getDouble("TOTPAXO");

                    bean.intTotQDOC = intTotQDOC;
                    bean.intTotQFLIG = intTotQTYFLIG;
                    bean.intTotQTYPAX = intTotQTYPAX;
                    bean.intTotQTYEMD = intTotQTYEMD;
                    bean.intTotQAM = intTotQAM;
                    bean.intTotQTYPAXO = intTotQTYPAXO;

                    bean.dblTotDOC = dblTotDOC;
                    bean.dblTotTOTPAX = dblTotTOTPAX;
                    bean.dblTotTOTEMD = dblTotTOTEMD;
                    bean.dblTotAM = dblTotAM;
                    bean.dblTotTOTPAXO = dblTotTOTPAXO;

                    lstBeans.add(bean);
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

        return lstBeans;
    }

    public List<A1744Filter> loadPX079S04A1800(A1744Filter filter) throws SQLException, Exception {

        //Para el Control Figures (PAX)
        List<A1744Filter> lstCons = new ArrayList<A1744Filter>(0);
        A1744Filter beanCons;
        double TOTPAX = 0, TOTPAXO = 0, TOTEMD = 0;
        long QTYPAX = 0, QTYFLIG = 0, QTYPAXO = 0, QTYFLIGO = 0, QTYEMD = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        //PX07900005
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX079S04A1744(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DFLIGHT);
            cstmt.setString(3, filter.ZONA);
            cstmt.setString(4, filter.CARR);
            cstmt.setString(5, filter.FFLOW);
            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rst = cstmt.getResultSet();
            while (rst.next()) {

                QTYPAX = rst.getLong("QTYPAX");
                TOTPAX = rst.getDouble("TOTPAX");
                QTYFLIG = rst.getLong("QTYFLIG");
                QTYPAXO = rst.getLong("QTYPAXO");
                TOTPAXO = rst.getDouble("TOTPAXO");
                //QTYFLIGO = rst.getLong("QTYFLIGO");

                QTYEMD = rst.getLong("QTYEMD");
                TOTEMD = rst.getDouble("TOTEMD");
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanCons = new A1744Filter();
                    beanCons.strFormatDate2 = Functions.getMonthConvert(filter.DFLIGHT);
                    beanCons.DFLIGHT = rst.getString("DFLIGHT");
                    beanCons.FFLOW = rst.getString("FFLOW");
                    if (beanCons.FFLOW.equals("P")) {
                        beanCons.strDescr_FFLOW = "Scheduled";
                    } else if (beanCons.FFLOW.equals("C")) {
                        beanCons.strDescr_FFLOW = "Charter";
                    } else if (beanCons.FFLOW.equals("X")) {
                        beanCons.strDescr_FFLOW = "Canceled";
                    } else if (beanCons.FFLOW.equals("U")) {
                        beanCons.strDescr_FFLOW = "Unscheduled";
                    }
                    beanCons.NFLIGHT = rst.getString("NFLIGHT");
                    beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                    beanCons.ZONA = rst.getString("ZONA");
                    beanCons.CARR = rst.getString("CARR");
                    if (beanCons.CARR.equals("AM")) {
                        beanCons.strDescCarrier = "Aeroméxico";
                    } else if (beanCons.CARR.equals("5D")) {
                        beanCons.strDescCarrier = "AM Connect";
                    } else if (beanCons.CARR.equals("VW")) {
                        beanCons.strDescCarrier = "Aeromar";
                    } else {
                        beanCons.strDescCarrier = "(None)";
                    }
                    beanCons.CDEPART = rst.getString("CDEPART");
                    beanCons.CARRIVA = rst.getString("CARRIVA");
                    beanCons.CURREAM = rst.getString("CURRENCY");

                    beanCons.QTYPAX = rst.getInt("QTYPAX");
                    beanCons.TOTPAX = rst.getDouble("TOTPAX");
                    beanCons.QTYFLIG = rst.getInt("QTYFLIG");

                    beanCons.QTYPAXO = rst.getInt("QTYPAXO");
                    beanCons.TOTPAXO = rst.getDouble("TOTPAXO");
                    //beanCons.QTYFLIGO = rst.getInt("QTYFLIGO");

                    beanCons.QTYEMD = rst.getInt("QTYEMD");
                    beanCons.TOTEMD = rst.getDouble("TOTEMD");

                    beanCons.totQTYPAX = QTYPAX;
                    beanCons.totTOTPAX = TOTPAX;
                    beanCons.totQTYFLIG = QTYFLIG;
                    beanCons.totQTYPAXO = QTYPAXO;
                    beanCons.totTOTPAXO = TOTPAXO;
                    beanCons.totQTYFLIGO = QTYFLIGO;

                    beanCons.totQTYEMD = QTYEMD;
                    beanCons.totTOTEMD = TOTEMD;

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
    
    public List<A1692Filter> loadPX079S05A1692(A1744Filter filter) throws SQLException, Exception {
        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        double totVCPN = 0;
        long totPAX = 0;

        //PX07900004
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX079S05A1692(?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04189(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            cstmt01.setString(3, filter.ZONA);
            cstmt01.setString(4, filter.CARR);
            cstmt01.setString(5, filter.CDEPART);
            cstmt01.setString(6, filter.CARRIVA);
            cstmt01.setString(7, filter.CURREAM);
            cstmt01.setString(8, filter.NFLIGHT);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totVCPN = rs01.getDouble("VCPN");
                totPAX = rs01.getLong("QTYPAX");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1692Filter();
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.strSQL = filter.strDescr_FFLOW;
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.FBASE = rs01.getString("FBASE");
                    objRtn.strTicket = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                    objRtn.FCONT = rs01.getString("FCONT");
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FCONT);
                    objRtn.ZONA = rs01.getString("ZONA");
                    objRtn.CDEPART = rs01.getString("CDEPART");
                    objRtn.CARRIVA = rs01.getString("CARRIVA");
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    objRtn.LEGSEQ = rs01.getString("LEGSEQ");
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.PSVVTA = rs01.getString("PSVVTA");
                    objRtn.AGTIA = rs01.getString("AGTIA");
                    objRtn.FVTA = rs01.getString("FVTA");
                    if (filter.page.TOTPAG != -1) {
                        objRtn.FTE = Obtener_FTE(objRtn.CCIA, objRtn.FORMA, objRtn.SERIE, cstmt01);
                    } else {
                        objRtn.FTE = rs01.getString("FTE");
                    }
                    objRtn.strFormatFVTA = Functions.getMonthConvert(objRtn.FVTA);
                    objRtn.TOPUS = rs01.getString("TOPUS");
                    objRtn.CARR = rs01.getString("CARR");
                    objRtn.strDescripcion = filter.strDescCarrier;
                    objRtn.CABI = rs01.getString("CABI");
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.MDACP = rs01.getString("MDACP");
                    objRtn.VCPMX = rs01.getDouble("VCPMX");
                    objRtn.TCMUS = rs01.getDouble("TCMUS");
                    objRtn.VCPUS = rs01.getDouble("VCPUS");
                    objRtn.COMISI = rs01.getDouble("COMISI");
                    objRtn.QTYPAX = rs01.getInt("QTYPAX");
                    objRtn.difVakues = totVCPN;
                    objRtn.totCPN_Aud = totPAX;//Pasajeros

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }

            }
        } catch (Exception e) {
            e.getMessage();
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
    
    public String Obtener_FTE(String ccia, String forma, String serie, CallableStatement cstmt) throws SQLException, Exception {

        String SQLCLL01, fte;
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX079S06A1711(?,?,?,?,?)}";

        //cstmt = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
        cstmt = session.getCNXIBMDB2().getIBMDB2Connection().prepareCall(SQLCLL01);

        cstmt.registerOutParameter(5, Types.VARCHAR);

        cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
        cstmt.setString(2, ccia);
        cstmt.setString(3, forma);
        cstmt.setString(4, serie);
        cstmt.setString(5, "");

        cstmt.execute();

        fte = cstmt.getString(5);

        return fte;
    }
    
    public List<A1744Filter> loadPX079S02A1744(A1744Filter filter, String tipo) throws SQLException, Exception {

        List<A1744Filter> lstBeans = new ArrayList<A1744Filter>(0);
        A1744Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        //PX07900002
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX079S02A1744(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DFLIGHT.trim());
            cstmt.setString(3, filter.CARR);
            cstmt.setString(4, filter.FFLOW);
            cstmt.setString(5, tipo);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                //PAX ==========================================================
                bean = new A1744Filter();
                bean.DFLIGHT = filter.DFLIGHT;
                bean.FFLOW = filter.FFLOW;
                if (bean.FFLOW.equals("P")) {
                    bean.strDescr_FFLOW = "Scheduled";
                } else if (bean.FFLOW.equals("C")) {
                    bean.strDescr_FFLOW = "Charter";
                } else if (bean.FFLOW.equals("X")) {
                    bean.strDescr_FFLOW = "Canceled";
                } else if (bean.FFLOW.equals("U")) {
                    bean.strDescr_FFLOW = "Unscheduled";
                }
                bean.CARR = filter.CARR;
                if (bean.CARR.equals("AM")) {
                    bean.strDescCarrier = "Aeroméxico";
                } else if (bean.CARR.equals("5D")) {
                    bean.strDescCarrier = "AM Connect";
                } else if (bean.CARR.equals("VW")) {
                    bean.strDescCarrier = "Aeromar";
                } else {
                    bean.strDescCarrier = "(None)";
                }
                bean.strFormatDate = filter.strFormatDate;
                bean.strDescTipo = "PAX";
                bean.QTYPAX = rst.getInt("QTYPAX");
                bean.QTYPAXO = rst.getInt("QTYPAXO");
                bean.QTYEMD = rst.getInt("QTYEMD");
                bean.QTYFLIG = rst.getInt("QTYFLIG");
                //bean.QTYFLIGO = rst.getInt("QTYFLIGO");
                bean.TOTPAX = rst.getDouble("TOTPAX");
                bean.TOTPAXO = rst.getDouble("TOTPAXO");
                bean.TOTEMD = rst.getDouble("TOTEMD");
                bean.intQDOC = rst.getInt("QTYPAX") + rst.getInt("QTYPAXO");
                bean.dblDOC = rst.getDouble("TOTPAX") + rst.getDouble("TOTPAXO");
                /*bean.intTotQDOC = rst.getInt("QTYPAX") + rst.getInt("QTYPAXO") + rst.getInt("QTYEMD");
                 bean.dblTotDOC = rst.getDouble("TOTPAX") + rst.getDouble("TOTPAXO") + rst.getDouble("TOTEMD");*/
                bean.intTotQDOC = rst.getInt("QTYPAX") + rst.getInt("QTYPAXO");
                bean.dblTotDOC = rst.getDouble("TOTPAX") + rst.getDouble("TOTPAXO");
                bean.QTYEMD = rst.getInt("QTYEMD");
                bean.TOTEMD = rst.getDouble("TOTEMD");
                bean.totQTYEMD = rst.getInt("QTYEMD");
                bean.totTOTEMD = rst.getDouble("TOTEMD");
                lstBeans.add(bean);
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

        return lstBeans;
    }

}
