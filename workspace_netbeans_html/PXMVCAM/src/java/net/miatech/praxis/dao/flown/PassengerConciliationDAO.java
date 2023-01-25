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
import net.miatech.beans.A1952Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class PassengerConciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public PassengerConciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public PassengerConciliationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1691Filter> loadPX072S01A1691(A1691Filter filter) throws SQLException, Exception {

        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;
        String IN_NFLIGHT = filter.NFLIGHT.trim();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        if (!IN_NFLIGHT.equals("") && IN_NFLIGHT.length() < 4) {
            IN_NFLIGHT = Functions.fillZeros(4, IN_NFLIGHT);
        }

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        //</editor-fold>
        long totLngQPHY = 0;
        long totLngQCLO = 0;
        long totLngQPRO = 0;
        long totQCPNVAL = 0;
        long totQCPNOAL = 0;
        long totQCPNON = 0;
        long totLngQACC = 0;
        long totLngQDIFF = 0;
        long totQCPCON = 0;
        long totQCPNTOT = 0;
        double totA1791ORAV = 0;
        double totVCPNUSD = 0;
        double totVCPNLOC = 0;

        Connection cnx = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00203(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_CARRIER.trim());
            cstmt.setString(5, filter.FFLOW.trim());
            cstmt.setString(6, IN_NFLIGHT);
            cstmt.setString(7, filter.FSTAPO.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                beanCons = new A1691Filter();
                beanCons.DFLIGHT = rst.getString("FECHA");
                beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                beanCons.NFLIGHT = rst.getString("NFLIGHT");
                beanCons.LEGSEQ = rst.getString("LEGSEQ");
                beanCons.lngQPHY = rst.getInt("TOT");
                beanCons.lngQCLO = rst.getInt("QCLO");
                beanCons.lngQPRO = rst.getInt("QPROC");
                beanCons.QCPNVAL = rst.getInt("QVAL");
                beanCons.QCPNOAL = rst.getInt("QCPNOAL");
                beanCons.QCPNON = rst.getInt("QCPNON");
                beanCons.lngQACC = rst.getInt("QCPNVAL");//CPN Valorizado
                beanCons.lngQDIFF = rst.getInt("NVAL");//CPN No Valorizados
                beanCons.QCPCON = rst.getInt("QCPCON");
                beanCons.QCPNTOT = rst.getInt("QCPNTOT");
                beanCons.A1791ORAV = (beanCons.QCPNTOT > 0) ? (beanCons.QCPCON * 100) / beanCons.QCPNTOT : 0;
                beanCons.VCPNUSD = rst.getDouble("VCPNUSD");
                beanCons.VCPNLOC = rst.getDouble("VCPNLOC");
                beanCons.CARRI = filter.IN_CARRIER;
                beanCons.FSTAPO = filter.FSTAPO.trim();
                beanCons.IN_NFLIGHT = IN_NFLIGHT;

                totLngQPHY = totLngQPHY + beanCons.lngQPHY;
                totLngQCLO = totLngQCLO + beanCons.lngQCLO;
                totLngQPRO = totLngQPRO + beanCons.lngQPRO;
                totQCPNVAL = totQCPNVAL + beanCons.QCPNVAL;
                totQCPNOAL = totQCPNOAL + beanCons.QCPNOAL;
                totQCPNON = totQCPNON + beanCons.QCPNON;
                totLngQACC = totLngQACC + beanCons.lngQACC;
                totLngQDIFF = totLngQDIFF + beanCons.lngQDIFF;
                totQCPCON = totQCPCON + beanCons.QCPCON;
                totQCPNTOT = totQCPNTOT + beanCons.QCPNTOT;
                totA1791ORAV = totA1791ORAV + beanCons.A1791ORAV;
                totVCPNUSD = totVCPNUSD + beanCons.VCPNUSD;
                totVCPNLOC = totVCPNLOC + beanCons.VCPNLOC;

                lstCons.add(beanCons);
            }
            for (A1691Filter bean : lstCons) {
                bean.totQCPNVAL = totQCPNVAL;
                bean.totQCPNOAL = totQCPNOAL;
                bean.totQCPNON = totQCPNON;
                bean.totQCPCON = totQCPCON;
                bean.totQCPNTOT = totQCPNTOT;
                bean.totVCPNUSD = totVCPNUSD;
                bean.totVCPNLOC = totVCPNLOC;
                bean.totLngQPHY = totLngQPHY;
                bean.totLngQCLO = totLngQCLO;
                bean.totLngQPRO = totLngQPRO;

                bean.totA1791ORAV = ((double) totQCPCON / (double) totQCPNTOT) * 100;
                bean.totA1791ORAV = Math.ceil(bean.totA1791ORAV);

                bean.totLngQDIFF = totLngQDIFF;
                bean.totLngQACC = totLngQACC;
            }

        } catch (Exception e) {
            e.getStackTrace();
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

    public List<A1691Filter> loadPX072S02A1691(A1691Filter filter, String strTipo, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;
        String strDesc = "";
        long totQCPNVC = 0;
        long totQCPNVAL = 0;
        long totlngQDIFF = 0;
        long totQCPNOAL = 0;
        long totQCPNMA = 0;

        if (strTipo.equals("QREC")) {
            strDesc = " Detail of Quantity Processed";
        } else if (strTipo.equals("QCLO")) {
            strDesc = " Detail of Quantity Closed";
        } else if (strTipo.equals("QPEN")) {
            strDesc = " Detail of Quantity Pending";
        } else if (strTipo.equals("QVAL")) {
            strDesc = " Detail of Quantity Valued";
        }

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00204(?,?,?,?,?,?,?,?,?,?,?,?)}";//PX072S02A1691

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DFLIGHT);//.substring(0, 6)
            cstmt.setString(3, filter.NFLIGHT.trim());
            cstmt.setString(4, filter.LEGSEQ.trim());
            cstmt.setString(5, strTipo);
            cstmt.setString(6, filter.CARRI.trim());
            cstmt.setString(7, filter.FFLOW.trim());
            cstmt.setString(8, filter.FSTAPO.trim());
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
                beanCons = new A1691Filter();
                beanCons.CARRI = filter.CARRI;
                beanCons.FFLOW = filter.FFLOW;
                beanCons.strTitulo = strDesc;
                beanCons.FSTAPO = rst.getString("FSTAPO").trim();
                if (beanCons.FSTAPO.equals("1")) {
                    beanCons.strDescripcion = "Pending";
                } else if (beanCons.FSTAPO.equals("2")) {
                    beanCons.strDescripcion = "Valued";
                } else if (beanCons.FSTAPO.equals("3")) {
                    beanCons.strDescripcion = "Closed";
                } else {
                    beanCons.strDescripcion = "(None)";
                }
                beanCons.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanCons.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanCons.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                beanCons.QCPNVC = rst.getLong("QCPNVC");//ES QCPNTOT
                beanCons.QCPNVAL = rst.getLong("QCPNVAL");//CPN  Valorizados
                beanCons.QCPNOAL = rst.getLong("QCPNOAL");
                beanCons.QCPNMA = rst.getLong("QCPNON");//CUPONES AM
                beanCons.QCPNTOT = rst.getLong("QCPNTOT");
                beanCons.lngQDIFF = beanCons.QCPNTOT - beanCons.QCPNVAL;//CPN No Valorizados
                beanCons.page.PAGNUM = filter.page.PAGNUM;
                beanCons.page.PAGROW = filter.page.PAGROW;
                beanCons.page.TOTPAG = filter.page.TOTPAG;
                beanCons.page.TOTROW = filter.page.TOTROW;
                totQCPNVC += beanCons.QCPNVC;
                totQCPNVAL += beanCons.QCPNVAL;
                totlngQDIFF += beanCons.lngQDIFF;
                totQCPNOAL += beanCons.QCPNOAL;
                totQCPNMA += beanCons.QCPNMA;

                lstCons.add(beanCons);
            }
            for (A1691Filter bean : lstCons) {
                bean.totQCPNVC = totQCPNVC;
                bean.totQCPNVAL = totQCPNVAL;
                bean.totlngQDIFF = totlngQDIFF;
                bean.totQCPNOAL = totQCPNOAL;
                bean.totQCPNMA = totQCPNMA;
            }

        } catch (Exception e) {
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

    public List<A1692Filter> loadPX072S03A1692(A1691Filter filter, String strTipo, HashMap<String, String> hmPaises) throws SQLException, Exception {

        List<A1692Filter> lstTkts = new ArrayList<>(0);
        A1692Filter beanTkt;
        String strDesc = "";
        int QTYPAX = 0;

        if (strTipo.equals("QREC")) {
            strDesc = " Detail of Quantity Coupons Received";
        } else if (strTipo.equals("QOAL")) {
            strDesc = " Detail of Quantity Coupons OAL";
        } else if (strTipo.equals("QPEN")) {
            strDesc = " Detail of Quantity Coupons AM";
        }

        CallableStatement cstmt = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00205(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DFLIGHT);
            cstmt.setString(3, strTipo);
            cstmt.setString(4, filter.FSTAPO.trim());
            cstmt.setString(5, filter.NFLIGHT.trim());
            cstmt.setString(6, filter.CDEPART.trim());
            cstmt.setString(7, filter.CARRIVA.trim());
            cstmt.setString(8, filter.LEGSEQ.trim());
            cstmt.setString(9, filter.CARRI);
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                QTYPAX = rst.getInt("QTYPAX");
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {

                rst = cstmt.getResultSet();
                while (rst.next()) {
                    beanTkt = new A1692Filter();
                    beanTkt.CARR = filter.CARRI;
                    beanTkt.strDescripcion = strDesc;
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.CUPON = rst.getString("CUPON").trim();
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.strFormatDate2 = Functions.getMonthConvert(beanTkt.FCONT);
                    beanTkt.CDEPART = rst.getString("CDEPART").trim();
                    beanTkt.CARRIVA = rst.getString("CARRIVA").trim();
                    beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanTkt.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanTkt.FTE = rst.getString("FTE").trim();
                    /*if (rst.getString("A1711SOURC") != null && !rst.getString("A1711SOURC").trim().equals("-")) {
                     beanTkt.strFuente = rst.getString("A1711SOURC").trim();
                     beanTkt.FTE = rst.getString("A1711SOURC").trim();
                     }*/

                    beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.DFLIGHT);
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.PSVVTA = rst.getString("PSVVTA").trim();
                    if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                        beanTkt.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                    }
                    beanTkt.AGTIA = rst.getString("AGTIA").trim();
                    beanTkt.FVTA = rst.getString("FVTA").trim();
                    beanTkt.strFormatFVTA = Functions.getMonthConvert(beanTkt.FVTA);
                    beanTkt.TOPUS = rst.getString("TOPUS").trim();
                    if (beanTkt.TOPUS.equals("I")) {
                        beanTkt.TOPUS = "International";
                    } else if (beanTkt.TOPUS.equals("D")) {
                        beanTkt.TOPUS = "Domestic";
                    } else {
                        beanTkt.TOPUS = "(None)";
                    }
                    beanTkt.FVAL = rst.getString("FVAL");
                    if (rst.getString("STVAL").equals("2") && beanTkt.FVAL.trim().equals("")) {
                        beanTkt.strDescFVAL = "Sale";
                    } else {
                        if (beanTkt.FVAL.equals("1")) {
                            beanTkt.strDescFVAL = "Sale";//ISR Values
                        } else if (beanTkt.FVAL.equals("2")) {
                            beanTkt.strDescFVAL = "Average";//Average RBD
                        } else if (beanTkt.FVAL.equals("3")) {
                            beanTkt.strDescFVAL = "VTR";//Average FARE BASIS
                        } else if (beanTkt.FVAL.trim().equals("")) {
                            beanTkt.strDescFVAL = "Pending";//Sale
                        }
                    }

                    beanTkt.CARR = rst.getString("CARR").trim();
                    //beanTkt.CABI = rst.getString("CABI").trim();
                    beanTkt.CLAS = rst.getString("CLAS").trim();
                    beanTkt.FBASE = rst.getString("FBASE").trim();
                    beanTkt.MDACP = rst.getString("MDACP").trim();
                    if (beanTkt.FVAL.equals("2")) {
                        beanTkt.VCPN = rst.getDouble("VCPMX");
                    } else {
                        beanTkt.VCPN = rst.getDouble("VCPN");
                    }
                    beanTkt.TCMUS = rst.getDouble("TCMUS");
                    beanTkt.VCPUS = rst.getDouble("VCPUS");
                    beanTkt.QTYPAX = rst.getInt("QTYPAX");
                    beanTkt.totTAX = QTYPAX;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }

            }

        } catch (Exception e) {
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

        return lstTkts;
    }

    public List<A1692Filter> loadPX095S09A1692(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Connection cnx = null;

        try {
            //PX09500012
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX095S09A1692(?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cstmt01.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cstmt01.setString(4, filter.IN_TKT.substring(7, 13));//SERIE

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1692Filter();
                objRtn.QTYPAX = rs01.getInt("QTYPAX");
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.FORMA = rs01.getString("FORMA").trim();
                objRtn.SERIE = rs01.getString("SERIE").trim();
                objRtn.CUPON = rs01.getString("CUPON").trim();
                objRtn.SEQ = rs01.getString("SEQ").trim();
                objRtn.strTicket = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim() + " " + rs01.getString("CUPON").trim();
                objRtn.FCONT = rs01.getString("FCONT").trim();
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FCONT);
                objRtn.CDEPART = rs01.getString("CDEPART").trim();
                objRtn.CARRIVA = rs01.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rs01.getString("CDEPART").trim().toUpperCase())) {
                    objRtn.strDescCDEPART = hmAeropuertos.get(rs01.getString("CDEPART").trim()).toString();
                }
                if (hmAeropuertos.containsKey(rs01.getString("CARRIVA").trim().toUpperCase())) {
                    objRtn.strDescCARRIVA = hmAeropuertos.get(rs01.getString("CARRIVA").trim()).toString();
                }
                objRtn.CLAS = rs01.getString("CLAS");
                objRtn.IDCON = rs01.getString("IDCON").trim();
                objRtn.FBASE = rs01.getString("FBASE").trim();
                objRtn.NFLIGHT = rs01.getString("NFLIGHT").trim();
                objRtn.DFLIGHT = rs01.getString("DFLIGHT").trim();
                objRtn.LEGSEQ = rs01.getString("LEGSEQ").trim();
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                objRtn.TDOC = rs01.getString("TDOC").trim();
                objRtn.PSVVTA = rs01.getString("PSVVTA").trim();
                objRtn.AGTIA = rs01.getString("AGTIA").trim();
                objRtn.FVTA = rs01.getString("FVTA").trim();
                if (rs01.getString("FLOAD").trim().equals("2")) {
                    objRtn.FLOAD = "OCR";
                } else if (rs01.getString("FLOAD").trim().equals("3")) {
                    objRtn.FLOAD = "VCR";
                } else if (rs01.getString("FLOAD").trim().equals("4")) {
                    objRtn.FLOAD = "FIM";
                } else if (rs01.getString("FLOAD").trim().equals("M")) {
                    objRtn.FLOAD = "MANUAL";
                } else {
                    objRtn.FLOAD = rs01.getString("FLOAD").trim();
                }
                objRtn.strFormatFVTA = Functions.getMonthConvert(rs01.getString("FVTA").trim());
                objRtn.TOPUS = rs01.getString("TOPUS").trim();
                objRtn.CARR = rs01.getString("CARR").trim();
                objRtn.CABI = rs01.getString("CABI").trim();
                objRtn.FECVAL = rs01.getString("FECVAL").trim();
                objRtn.strFormatFECVAL = Functions.getMonthConvert(rs01.getString("FECVAL").trim());
                objRtn.MDACP = rs01.getString("MDACP").trim();
                objRtn.VCPMX = rs01.getDouble("VCPMX");
                objRtn.TCMUS = rs01.getDouble("TCMUS");
                objRtn.VCPUS = rs01.getDouble("VCPUS");
                objRtn.FVAL = rs01.getString("FVAL");
                objRtn.VCPN = rs01.getDouble("VCPN");
                if (objRtn.FVAL.equals("1")) {
                    objRtn.strDescFVAL = "ISR Values/Sales";
                } else if (objRtn.FVAL.equals("2")) {
                    objRtn.strDescFVAL = "Average Value";
                    objRtn.VCPN = rs01.getDouble("VCPMX");
                } else if (objRtn.FVAL.equals("3")) {
                    objRtn.strDescFVAL = "VTR";
                } else if (objRtn.FVAL.equals("4")) {
                    objRtn.strDescFVAL = "Manual Value";
                }
                objRtn.STCON = rs01.getString("STCON");
                if (objRtn.STCON.equals("1")) {
                    objRtn.strDescSTCON = "Contabilizado.";
                } else if (objRtn.STCON.equals("2")) {
                    objRtn.strDescSTCON = "Contabilizado Provisión.";
                } else if (objRtn.STCON.equals("3")) {
                    objRtn.strDescSTCON = "Extorno.";
                } else if (objRtn.STCON.equals("4")) {
                    objRtn.strDescSTCON = "Extorno contabilizado.";
                } else if (objRtn.STCON.equals("5")) {
                    objRtn.strDescSTCON = "VTR.";
                } else if (objRtn.STCON.equals("6")) {
                    objRtn.strDescSTCON = "GL 5D.";
                }

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

    public A1691Filter loadPX095S04A1691(A1691Filter filter, HashMap<String, String> hmAeropuertos, UserView user) throws SQLException, Exception {

        A1691Filter beanCons = new A1691Filter();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        Connection cnx = null;
        try {
            //PX09500004
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX095S04A1691(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.VARCHAR);
            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DFLIGHT.trim());
            cstmt.setString(3, filter.NFLIGHT.trim());
            cstmt.setString(4, filter.CDEPART.trim());
            cstmt.setString(5, filter.CARRIVA.trim());

            cstmt.setString(6, "");
            cstmt.setString(7, "");
            cstmt.execute();

            rst = cstmt.getResultSet();
            if (rst.next()) {
                beanCons = new A1691Filter();
                beanCons.CCUST = rst.getString("CCUST").trim();
                beanCons.STVAL = rst.getString("STVAL").trim();
                beanCons.CARRI = rst.getString("CARRI").trim();
                beanCons.FFLOW = rst.getString("FFLOW").trim();
                beanCons.IN_CARRIER = user.getUserInfo().USR;
                //beanCons.TOPER = rst.getString("TOPER").trim();
                //Obteniendo el Tipo de Operacion ==============================
                if (cstmt.getString(6) != null) {
                    beanCons.TOPER = cstmt.getString(6).trim();
                }
                //Obteniendo Descripción ODS ===================================
                if (cstmt.getString(7) != null) {
                    beanCons.strDescripcion = cstmt.getString(7).trim();
                }
                beanCons.FSENDSS = rst.getString("FSENDSS").trim();
                beanCons.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanCons.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanCons.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                beanCons.ZONE = rst.getString("ZONA").trim();
                beanCons.MINICONEC = rst.getString("MINICONEC").trim();
                beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanCons.NPLANE = rst.getString("NPLANE").trim();
                beanCons.FSTASS = rst.getString("FSTASS").trim();
                beanCons.LOCDEP = rst.getString("LOCDEP");
                beanCons.LOCARR = rst.getString("LOCARR");
                beanCons.UTCDEP = rst.getString("UTCDEP");
                beanCons.UTCARR = rst.getString("UTCARR");

                beanCons.FOPERZUL = rst.getString("FOPERZUL").trim();
                beanCons.FSENDOD = rst.getString("FSENDOD").trim();
                beanCons.QCPNOD = rst.getLong("QCPNOD");
                beanCons.FSTAOD = rst.getString("FSTAOD").trim();
                beanCons.FSENDVC = rst.getString("FSENDVC").trim();
                beanCons.FSTAVC = rst.getString("FSTAVC").trim();
                beanCons.QCPNVC = rst.getLong("QCPNVC");
                beanCons.QCPNMA = rst.getLong("QCPNMA");
                beanCons.QCPNTOT = rst.getLong("QCPNTOT");
                beanCons.QCPNOCR = rst.getLong("QCPNOCR");
                beanCons.QCPNON = rst.getLong("QCPNON");
                beanCons.QCPNOAL = rst.getLong("QCPNOAL");
                beanCons.QCPHARB = rst.getLong("QCPHARB");
                beanCons.QCPCFRE = rst.getLong("QCPNFRE");
                beanCons.QCPCABY = rst.getLong("QCPCABY");
                beanCons.QCPCABF = rst.getLong("QCPCABF");
                beanCons.QCPAD = rst.getLong("QCPAD");
                beanCons.QCPCHD = rst.getLong("QCPCHD");
                beanCons.QCPINF = rst.getLong("QCPINF");
                beanCons.QCPTRA = rst.getLong("QCPTRA");
                beanCons.FCLOSE = rst.getString("FCLOSE").trim();
                beanCons.QCPNVAL = rst.getLong("QCPNVAL");
                beanCons.FSTAPO = rst.getString("FSTAPO").trim();
                beanCons.FSENDFI = rst.getString("FSENDFI").trim();
                beanCons.QCPNFI = rst.getInt("QCPNFI");
                beanCons.FSTAFI = rst.getString("FSTAFI").trim();
                beanCons.USCR = rst.getString("USCR").trim();
                beanCons.FECR = rst.getString("FECR").trim();
                beanCons.HOCR = Functions.ConvertedTime(rst.getString("HOCR").trim());
                beanCons.USUP = rst.getString("USUP").trim();
                beanCons.FEUP = rst.getString("FEUP").trim();
                beanCons.HOUP = Functions.ConvertedTime(rst.getString("HOUP").trim());
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

        return beanCons;
    }

}
