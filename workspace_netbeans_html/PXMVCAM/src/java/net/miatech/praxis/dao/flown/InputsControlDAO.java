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
import net.miatech.beans.A1686Filter;
import net.miatech.beans.A1690Filter;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1693Filter;
import net.miatech.beans.A1952Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.flown.A1419;
import net.miatech.praxis.flown.A1687;
import net.miatech.praxis.flown.A1688;
import net.miatech.praxis.flown.A1689;
import net.miatech.praxis.interline.filter.A1413Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class InputsControlDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InputsControlDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InputsControlDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A1686Filter> loadPX077S14A1910(A1686Filter filter) throws SQLException, Exception {

        List<A1686Filter> lstRtn = new ArrayList<A1686Filter>(0);
        A1686Filter objRtn;
        int totQRECOR = 0, totQRECORG = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S14A1910(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A1686Filter();
                objRtn.FUENTE = rs01.getString("CPROGRAM");//Cod de Programa

                lstRtn.add(objRtn);
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

    public List<A1686Filter> loadPX077S01A1686(A1686Filter filter) throws SQLException, Exception {

        List<A1686Filter> lstRtn = new ArrayList<>(0);
        A1686Filter objRtn;
        int totQRECOR = 0;
        int totQRECORG = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S01A1686(?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TIPOFECHA);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_FUENTE);
            cstmt01.setString(6, Functions.getFechaActual());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totQRECOR = rs01.getInt("QRECOR");
                totQRECORG = rs01.getInt("QRECORG");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int pos = 0;
                while (rs01.next()) {
                    pos++;
                    //FUENTE,MENSA
                    objRtn = new A1686Filter();
                    objRtn.RN = pos;
                    objRtn.FECHA = rs01.getString("FECHA").trim();
                    objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.FECHA);
                    objRtn.FECR = rs01.getString("FECR").trim();
                    objRtn.HOCR = Functions.ConvertedTime(rs01.getString("HOCR").trim());
                    objRtn.USCR = rs01.getString("USCR").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECR);
                    objRtn.DPRDA = rs01.getString("DPRDA").trim();
                    objRtn.strFormatDate2 = Functions.getMonthConvert(rs01.getString("DPRDA").trim());
                    objRtn.DTRANS = rs01.getString("DTRANS").trim();
                    objRtn.strFormatDate3 = Functions.getMonthConvert(rs01.getString("DTRANS").trim());
                    objRtn.FUENTE = rs01.getString("FUENTE").trim();
                    objRtn.MENSA = rs01.getString("MENSA").trim();
                    objRtn.QRECOR = rs01.getInt("QRECOR");
                    objRtn.QRECORG = rs01.getInt("QRECORG");
                    objRtn.QRECERR = rs01.getInt("QRECERR");
                    objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                    objRtn.strDescripcion = "20" + objRtn.DTRANS.substring(0, 2) + " " + Functions.getAbreviaturaMes(objRtn.DTRANS.substring(2, 4)) + " - " + objRtn.DTRANS.substring(6, 8);
                    objRtn.totQRECOR = totQRECOR;
                    objRtn.totQRECORG = totQRECORG;
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

    public List<A1686Filter> loadPX077S03A1686(A1686Filter filter) throws SQLException, Exception {

        List<A1686Filter> lstRtn = new ArrayList<A1686Filter>(0);
        A1686Filter objRtn;
        int totQRECOR = 0, totQRECORG = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "";

        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S03A1686(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TIPOFECHA);
            cstmt01.setString(3, filter.FECHA.trim());
            cstmt01.setString(4, filter.FUENTE.trim());
            cstmt01.setString(5, filter.HOCR.trim().replace(":", ""));
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totQRECOR = rs01.getInt("QRECOR");
                totQRECORG = rs01.getInt("QRECORG");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int pos = 0;
                while (rs01.next()) {
                    pos++;
                    //FUENTE,MENSA
                    objRtn = new A1686Filter();
                    objRtn.RN = pos;
                    objRtn.FECHA = rs01.getString("FECHA").trim();
                    objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.FECHA);
                    objRtn.FECR = rs01.getString("FECR").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECR);
                    objRtn.HOCR = Functions.ConvertedTime(rs01.getString("HOCR").trim());
                    objRtn.USCR = rs01.getString("USCR").trim();
                    objRtn.DPRDA = rs01.getString("DPRDA").trim();
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.DPRDA);
                    objRtn.DTRANS = rs01.getString("DTRANS").trim();
                    objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.DTRANS);
                    objRtn.FUENTE = rs01.getString("FUENTE").trim();
                    objRtn.MENSA = rs01.getString("MENSA");
//                    objRtn.QRECOR = rs01.getInt("QRECOR");
                    objRtn.QRECORG = rs01.getInt("QRECORG");

                    if (filter.FUENTE.trim().equals("SSIM") || filter.FUENTE.trim().equals("EMD")) {
                        objRtn.QRECOR = filter.QRECOR;
                        objRtn.QRECERR = filter.QRECERR;
                    } else {
                        objRtn.QRECOR = rs01.getInt("QRECOR");
                        objRtn.QRECERR = rs01.getInt("QRECERR");
                    }

                    objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                    objRtn.QRECORG2 = filter.QRECORG;
                    objRtn.totQRECOR = totQRECOR;
                    objRtn.totQRECORG = totQRECORG;
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

    public List<A1686Filter> loadPX077S02A1686(A1686Filter filter) throws SQLException, Exception {

        List<A1686Filter> lstRtn = new ArrayList<>(0);
        A1686Filter objRtn;
        int totQRECOR = 0, totQRECORG = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S02A1686(?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TIPOFECHA);
            cstmt01.setString(3, filter.FECHA.trim());
            cstmt01.setString(4, filter.HOCR.replace(":", ""));
            cstmt01.setString(5, filter.FUENTE.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totQRECOR = rs01.getInt("QRECOR");
                totQRECORG = rs01.getInt("QRECORG");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int pos = 0;
                while (rs01.next()) {
                    pos++;
                    //FUENTE,MENSA
                    objRtn = new A1686Filter();
                    objRtn.RN = pos;
                    objRtn.FECR = rs01.getString("FECR").trim();
                    objRtn.HOCR = Functions.ConvertedTime(rs01.getString("HOCR").trim());
                    objRtn.USCR = rs01.getString("USCR").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECR);
                    objRtn.DPRDA = filter.DPRDA;
                    objRtn.strFormatDate2 = filter.strFormatDate2;
                    objRtn.FECHA = rs01.getString("FECHA").trim();
                    objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.FECHA);
                    objRtn.strFormatDate4 = filter.strFormatDate4;
                    objRtn.FUENTE = rs01.getString("FUENTE").trim();
                    objRtn.MENSA = rs01.getString("MENSA").trim();
                    objRtn.QRECOR = rs01.getInt("QRECOR");
                    objRtn.QRECORG = rs01.getInt("QRECORG");
                    objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                    objRtn.totQRECOR = totQRECOR;
                    objRtn.totQRECORG = totQRECORG;
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

    public List<A1413Filter> loadPX077SQP03979(A1686Filter filter) throws SQLException, Exception {

        List<A1413Filter> lstRtn = new ArrayList<>(0);
        A1413Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03979(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA.trim());
            cstmt01.setString(3, filter.FUENTE.trim());
            cstmt01.setString(4, filter.DPRDA.trim());
            cstmt01.setString(5, filter.DTRANS.trim());
            cstmt01.setString(6, filter.FECR.trim());
            cstmt01.setString(7, filter.HOCR.replace(":", ""));
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A1413Filter();
                objRtn.RN = pos;
                objRtn.A1413DATE = rs01.getString("A1413DATE").trim();
                objRtn.A1413SEC = rs01.getString("A1413SEC").trim();
                objRtn.A1413DATA = rs01.getString("A1413DATA").trim();
                objRtn.A1413CIA = rs01.getString("A1413CIA").trim();
                objRtn.A1413FORSE = rs01.getString("A1413FORSE").trim();
                objRtn.A1413CUPON = rs01.getString("A1413CUPON").trim();
                objRtn.A1413FROM = rs01.getString("A1413FROM").trim();
                objRtn.A1413TO = rs01.getString("A1413TO").trim();
//                objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.FECHA);
//                objRtn.FECR = rs01.getString("FECR").trim();
//                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECR);
//                objRtn.HOCR = Functions.ConvertedTime(rs01.getString("HOCR").trim());
//                objRtn.USCR = rs01.getString("USCR").trim();
//                objRtn.DPRDA = rs01.getString("DPRDA").trim();
//                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.DPRDA);
//                objRtn.DTRANS = rs01.getString("DTRANS").trim();
//                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.DTRANS);
//                objRtn.FUENTE = rs01.getString("FUENTE").trim();
//                objRtn.MENSA = rs01.getString("SDATA").trim();
//                objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                lstRtn.add(objRtn);
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

    public List<A1686Filter> loadPX077S04A1696(A1686Filter filter) throws SQLException, Exception {

        List<A1686Filter> lstRtn = new ArrayList<>(0);
        A1686Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S04A1696(?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.HOCR.replace(":", ""));
            cstmt01.setString(3, filter.FECHA.trim());
            cstmt01.setString(4, filter.FUENTE.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1686Filter();
                objRtn.RN = pos;
                objRtn.FECHA = rs01.getString("FECHA").trim();
                objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.FECHA);
                objRtn.FECR = rs01.getString("FECR").trim();
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECR);
                objRtn.HOCR = Functions.ConvertedTime(rs01.getString("HOCR").trim());
                objRtn.USCR = rs01.getString("USCR").trim();
                objRtn.DPRDA = rs01.getString("DPRDA").trim();
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.DPRDA);
                objRtn.DTRANS = rs01.getString("DTRANS").trim();
                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.DTRANS);
                objRtn.FUENTE = rs01.getString("FUENTE").trim();
                objRtn.MENSA = rs01.getString("SDATA").trim();
                objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                lstRtn.add(objRtn);
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

    public List<A1687> loadPX077S05A1687(A1686Filter filter) throws SQLException, Exception {//SSIM

        List<A1687> lstRtn = new ArrayList<>(0);
        A1687 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S05A1687(?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA.trim());
            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1687();
                objRtn.Nbr = rs01.getInt("RN");
                objRtn.PRDA = rs01.getString("PRDA").trim();
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.PRDA);
                objRtn.strFormatDate3 = Functions.getMonthConvert(filter.FECHA.trim());
                objRtn.TTIME = Functions.ConvertedTime(rs01.getString("TTIME").trim());
                objRtn.TRNN = rs01.getInt("TRNN");
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.SSIMDATA = rs01.getString("SSIMDATA").trim();

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
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

    public List<A1688> loadPX077S06A1688(A1686Filter filter) throws SQLException, Exception {

        List<A1688> lstRtn = new ArrayList<>(0);
        A1688 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S06A1688_GG(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA);
            cstmt01.setString(3, filter.HOCR.replace(":", ""));
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1688();
                objRtn.Nbr = rs01.getInt("RN");
                objRtn.FFLOW = rs01.getString("DATAORIG");
                objRtn.strFormatDate2 = filter.strFormatDate2;
                objRtn.strFormatDate3 = Functions.getMonthConvert(filter.FECHA.trim());
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
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

    public List<A1689> loadPX077S07A1689(A1686Filter filter) throws SQLException, Exception {//EMD

        List<A1689> lstRtn = new ArrayList<>(0);
        A1689 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S07A1689(?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA.trim());
            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1689();
                objRtn.RN = rs01.getInt("RN");
                objRtn.DFLIGHT = rs01.getString("DFLIGHT").trim();
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                objRtn.TRNN = rs01.getInt("TRNN");
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.EMDDATA = rs01.getString("EMDDATA").trim();
                objRtn.strFormatDate2 = filter.strFormatDate2;
                objRtn.strFormatDate3 = filter.strFormatDate3;
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
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

    public List<A1689> loadPX077S09A1413(A1686Filter filter) throws SQLException, Exception {

        List<A1689> lstRtn = new ArrayList<>(0);
        A1689 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S09A1413_J(?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.strFormatDate4.trim().replace("-", ""));
            cstmt01.setString(3, filter.strFormatDate.trim().replace("-", ""));
            cstmt01.setString(4, filter.FECHA.trim());
            cstmt01.setString(5, filter.HOCR.replace(":", ""));
            cstmt01.setString(6, filter.FUENTE.trim());
            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1689();
                objRtn.RN = rs01.getInt("RN");
                objRtn.EMDDATA = rs01.getString("A1413DATA").trim();
                objRtn.strFormatDate3 = Functions.getMonthConvert(filter.FECHA.trim());
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
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

    public List<A1419> loadPX077S11A1419(A1686Filter filter) throws SQLException, Exception {

        List<A1419> lstRtn = new ArrayList<A1419>(0);
        A1419 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S11A1419(?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA.trim());
            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1419();
                objRtn.Nbr = rs01.getInt("RN");
                objRtn.TCNMAXLONG = rs01.getString("TCNMAXLONG").trim();
                objRtn.TDNR = rs01.getString("TDNR").trim();
                objRtn.SEQ = rs01.getString("SEQ").trim();
                objRtn.strFormatDate3 = Functions.getMonthConvert(filter.FECHA.trim());
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
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

    public List<A1686Filter> loadPX077S12A1690(A1686Filter filter) throws SQLException, Exception {

        List<A1686Filter> lstRtn = new ArrayList<A1686Filter>(0);
        A1686Filter objRtn;
        int totQRECOR = 0, totQRECORG = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S12A1690(?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1686Filter();
                objRtn.RN = pos;
                objRtn.FECHA = rs01.getString("PRDA").trim();
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECHA);
                objRtn.QRECOR = rs01.getInt("QTY");
                objRtn.FUENTE = "OCR";
                lstRtn.add(objRtn);
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

    public List<A1690Filter> loadPX077S08A1690(A1686Filter filter) throws SQLException, Exception {//OCR

        List<A1690Filter> lstRtn = new ArrayList<>(0);
        A1690Filter objRtn;
        long tot1690 = 0, tot1280 = 0, totOAL = 0, totAM = 0;
        String gmin = "", gmax = "";

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S08A1690(?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA.trim());
            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            String fec;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1690Filter();
                //objRtn.extrafields.Nbr = rs01.getInt("RN");
                objRtn.RN = rs01.getInt("RN");
                //objRtn.PRDA = rs01.getString("PRDA");
                objRtn.DFLIGHC = rs01.getString("DFLIGHC");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHC);
                //objRtn.extrafields.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHC);
                //objRtn.TREG = rs01.getString("TREG");
                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.CCIA = rs01.getString("CCIA");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                //objRtn.extrafields.strTicket = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                objRtn.strTicket = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                //objRtn.DCHEQ = rs01.getString("DCHEQ");
                //objRtn.BOX = rs01.getString("BOX");
                //objRtn.RFER = rs01.getString("RFER");
                objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                objRtn.CDEPART = rs01.getString("CDEPART");
//                objRtn.strCDEPART = rs01.getString("DESCDEPART");
                objRtn.CARRIVA = rs01.getString("CARRIVA");
//                objRtn.strCARRIVA = rs01.getString("DESCARRIVA");
                objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                fec = objRtn.DFLIGHT.replace("-", "");

                objRtn.NROPRT = rs01.getString("NROPRT");
                objRtn.GRUPO = rs01.getString("GRUPO");
                objRtn.totIXC = tot1280;
                objRtn.totOCR = tot1690;
                objRtn.totOAL = totOAL;
                objRtn.totAM = totAM;
                objRtn.FLAG = (rs01.getString("FLAG").equals("NF") ? "" : "Y");
                objRtn.GrupoMin = gmin;
                objRtn.GrupoMax = gmax;

                objRtn.strFormatDate2 = Functions.getMonthConvert(fec);
                objRtn.strFormatDate3 = Functions.getMonthConvert(filter.FECHA.trim());
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

            /*
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                gmin = rs01.getString("G_MIN");
                gmax = rs01.getString("G_MAX");
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    tot1690 = rs01.getLong("F_1690");
                    tot1280 = rs01.getLong("F_1280");
                    totOAL = rs01.getLong("QTY_OAL");
                    totAM = rs01.getLong("QTY_AM");
                }
                rs01.close();
                if (cstmt01.getMoreResults()) {
                    rs01 = cstmt01.getResultSet();
                    int pos = 0;
                    String fec;
                    while (rs01.next()) {
                        pos++;
                        //FUENTE,MENSA
                        objRtn = new A1690Filter();
                        //objRtn.extrafields.Nbr = rs01.getInt("RN");
                        objRtn.RN = rs01.getInt("RN");
                        //objRtn.PRDA = rs01.getString("PRDA");
                        objRtn.DFLIGHC = rs01.getString("DFLIGHC");
                        objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHC);
                        //objRtn.extrafields.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHC);
                        //objRtn.TREG = rs01.getString("TREG");
                        objRtn.CUPON = rs01.getString("CUPON");
                        objRtn.CCIA = rs01.getString("CCIA");
                        objRtn.FORMA = rs01.getString("FORMA");
                        objRtn.SERIE = rs01.getString("SERIE");
                        //objRtn.extrafields.strTicket = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                        objRtn.strTicket = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                        //objRtn.DCHEQ = rs01.getString("DCHEQ");
                        //objRtn.BOX = rs01.getString("BOX");
                        //objRtn.RFER = rs01.getString("RFER");
                        objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                        objRtn.CDEPART = rs01.getString("CDEPART");
                        objRtn.strCDEPART = rs01.getString("DESCDEPART");
                        objRtn.CARRIVA = rs01.getString("CARRIVA");
                        objRtn.strCARRIVA = rs01.getString("DESCARRIVA");
                        objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                        fec = objRtn.DFLIGHT.replace("-", "");

                        objRtn.NROPRT = rs01.getString("NROPRT");
                        objRtn.GRUPO = rs01.getString("GRUPO");
                        objRtn.totIXC = tot1280;
                        objRtn.totOCR = tot1690;
                        objRtn.totOAL = totOAL;
                        objRtn.totAM = totAM;
                        objRtn.FLAG = (rs01.getString("FLAG").equals("NF") ? "" : "Y");
                        objRtn.GrupoMin = gmin;
                        objRtn.GrupoMax = gmax;

                        objRtn.strFormatDate2 = Functions.getMonthConvert(fec);
                        objRtn.strFormatDate3 = Functions.getMonthConvert(filter.FECHA.trim());
                        objRtn.page.PAGNUM = filter.page.PAGNUM;
                        objRtn.page.PAGROW = filter.page.PAGROW;
                        objRtn.page.TOTPAG = filter.page.TOTPAG;
                        objRtn.page.TOTROW = filter.page.TOTROW;

                        lstRtn.add(objRtn);
                    }
                }

            }
            
             */
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

    public List<A1688> loadPX077S06A2735(A1686Filter filter) throws SQLException, Exception {

        List<A1688> lstRtn = new ArrayList<>(0);
        A1688 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01160(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA);
            cstmt01.setString(3, filter.IN_ERROR);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1688();
                objRtn.Nbr = rs01.getInt("RN");
                objRtn.FFLOW = rs01.getString("DDATA");
                objRtn.strFormatDate2 = filter.strFormatDate2;
                objRtn.strFormatDate3 = Functions.getMonthConvert(filter.FECHA.trim());
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
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

    public List<A1693Filter> loadPX077S10A1686_PRUEBA(A1691Filter filter) throws SQLException, Exception {
        System.out.println("DAOOOOOOOOOO");
        A1693Filter objeto;
        List<A1693Filter> lista = new ArrayList();
        HashMap hm;
        String tipo = filter.IN_FUENTE;
        String anob = filter.IN_FECHA_FROM.substring(0, 4);

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Connection cnx = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S10A1686(?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TIPOFECHA);
            cstmt01.setString(3, filter.IN_FECHA_FROM.substring(0, 4));
            cstmt01.setString(4, filter.IN_FUENTE.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            hm = new HashMap();
            while (rs01.next()) {
                /*objeto = new A1693Filter();
                 objeto.fecha = rs01.getString("FECHA");
                 lista.add(objeto);*/
                hm.put(rs01.getString("FECHA"), "");
            }

            String fecha;
            boolean bool = true;

            for (int mesx = 1; mesx <= 12; mesx++) {
                if (bool) {
                    for (int dia = 1; dia <= 31; dia++) {
                        fecha = anob + Functions.fillZeros(2, String.valueOf(mesx)) + Functions.fillZeros(2, String.valueOf(dia));
                        //if (fecha.equals(Functions.getFechaActual())) {
                        if (fecha.equals(Functions.sumXDaystoDate(Functions.getFechaActual(), 1))) {
                            bool = false;
                            break;
                        }
                        if (dia <= Functions.hallarFindeMes(fecha)) {
                            int diax = Functions.getDayOfTheWeek(fecha);
                            if (tipo.equals("SSIM")) {
                                if (diax == 5) {
                                    objeto = new A1693Filter();
                                    objeto.fecha = fecha;
                                    objeto.strFormatDate = "ROJO";
                                    if (hm.containsKey(fecha)) {
                                        objeto.strFormatDate = "VERDE";
                                    }
                                    lista.add(objeto);
                                } else {
                                    if (hm.containsKey(fecha)) {
                                        objeto = new A1693Filter();
                                        objeto.fecha = fecha;
                                        objeto.strFormatDate = "VERDE";
                                        lista.add(objeto);
                                    }
                                }
                            } else { //if (tipo.equals("ODS")) {
                                objeto = new A1693Filter();
                                objeto.fecha = fecha;
                                objeto.strFormatDate = "ROJO";
                                if (hm.containsKey(fecha)) {
                                    objeto.strFormatDate = "VERDE";
                                }
                                lista.add(objeto);
                            }/* else {
                             if (hm.containsKey(fecha)) {
                             objeto = new A1693Filter();
                             objeto.fecha = fecha;
                             objeto.strFormatDate = "VERDE";
                             lista.add(objeto);
                             }
                             }*/

                        }

                    }
                }
            }

        } catch (Exception e) {
            System.out.println("--> " + e.getMessage());
            e.getMessage();
        } finally {
            try {
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
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
                ex.printStackTrace();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lista;

    }

    public List<A1686Filter> loadPX077S13A1910(A1686Filter filter) throws SQLException, Exception {

        List<A1686Filter> lstRtn = new ArrayList<A1686Filter>(0);
        A1686Filter objRtn;
        int totQRECOR = 0, totQRECORG = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX077S13A1910(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.MENSA);//NRO PROGRAMA
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A1686Filter();
                objRtn.RN = pos;
                objRtn.STVAL = rs01.getString("STATP");
                objRtn.strFormatDate4 = rs01.getString("DESCRIP");
                objRtn.MENSA = rs01.getString("MENSA");
                objRtn.FUENTE = rs01.getString("CPROGRAM");//Cod de Programa
                objRtn.QRECOR = rs01.getInt("QTYREAD");
                objRtn.QRECORG = rs01.getInt("QTYWRITE");
                objRtn.FECR = Functions.getMonthConvert(rs01.getString("FECR"));
                objRtn.HOCR = Functions.ConvertedTime(rs01.getString("HOCR").substring(0, 6));
                objRtn.USCR = rs01.getString("USCR");
                objRtn.strFormatDate = Functions.ConvertedTime(rs01.getString("HOFIN"));
                //objRtn.strFormatDate4 = Functions.restBetween2HoursMinSeg(rs01.getString("HOFIN"), rs01.getString("HOCR").substring(0, 6));
                objRtn.strFormatDate4 = Functions.ConvertedTime(Functions.restBetween2HoursMinSeg_HF_HI(rs01.getString("HOFIN"), rs01.getString("HOCR").substring(0, 6)));
                objRtn.strFormatDate2 = rs01.getString("DESCRIP");
                objRtn.PPROGRAM = rs01.getString("PPROGRAM");

                lstRtn.add(objRtn);
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

    
    
    
    
    
    
    
}
