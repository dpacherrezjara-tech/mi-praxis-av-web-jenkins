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
import net.miatech.beans.A1691Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A2149;
import net.miatech.praxis.interline.filter.A1413Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class OwnerlessCouponDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public OwnerlessCouponDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public OwnerlessCouponDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1413Filter> loadPX235SQP00252(A1413Filter filter) throws SQLException, Exception {

        List<A1413Filter> lstObjetos = new ArrayList<>(0);
        A1413Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00252(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_STCRU);
            cstmt.setString(5, filter.IN_NVLOB);
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
                beanTkt = new A1413Filter();
                beanTkt.A1413STCRU = rst.getString("A1413STCRU").trim();

                if (beanTkt.A1413STCRU.equals("")) {
                    beanTkt.A1413STCRU = "Pending";
                } else if (beanTkt.A1413STCRU.equals("F")) {
                    beanTkt.A1413STCRU = "Extraido al Flown";
                } else if (beanTkt.A1413STCRU.equals("D")) {
                    beanTkt.A1413STCRU = "Duplicate";
                } else if (beanTkt.A1413STCRU.equals("C")) {
                    beanTkt.A1413STCRU = "Cancelled";
                }

                beanTkt.A1413CIA = rst.getString("A1413CIA");
                beanTkt.A1413FORSE = rst.getString("A1413FORSE");
                beanTkt.A1413CUPON = rst.getString("A1413CUPON");
                beanTkt.strTicket = rst.getString("A1413CIA") + " " + rst.getString("A1413FORSE") + " " + rst.getString("A1413CUPON");
                beanTkt.A1413FVLOB = rst.getString("A1413FVLOB");
                beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.A1413FVLOB);
                beanTkt.A1413NVLOB = rst.getString("A1413NVLOB");
                beanTkt.A1413DATE = rst.getString("A1413DATE");//Fecha de Trasaccion
                beanTkt.strFormatDate2 = Functions.getMonthConvert(beanTkt.A1413DATE);
                beanTkt.A1413FREGI = rst.getString("A1413FREGI");
                beanTkt.strDescripcion = Functions.getMonthConvert(beanTkt.A1413FREGI);//Fecha de Ingreso

                beanTkt.A1413FROM = rst.getString("A1413FROM");
                beanTkt.FFLOWN = rst.getString("FFLOWN");
                beanTkt.A1413TO = rst.getString("A1413TO");
                beanTkt.strFROM = rst.getString("DES_ORIG");
                beanTkt.strTO = rst.getString("DES_DEST");

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstObjetos.add(beanTkt);
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

        return lstObjetos;
    }

    public List<A1691Filter> loadPX235SQP00905(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A1691Filter> lstCarr = new ArrayList<>(0);
        A1691Filter beanCarr;

        long QCPNOD = 0, QCPNVC = 0, QCPAD = 0, QCPCHD = 0, QCPINF = 0, QCPTRA = 0, QCPNOCR = 0, QCPNMA = 0, QCPNTOT = 0, QCPNLEG = 0, QCPNVAL = 0;
        int QCPNFI = 0;

        CallableStatement cstmt = null;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00905(?,?,?,?,?,?,?)}";
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
                QCPNOD = rst.getLong("QCPNOD");
                QCPNVC = rst.getLong("QCPNVC");
                QCPNLEG = rst.getLong("QCPNLEG");
                QCPNOCR = rst.getLong("QCPNOCR");
                QCPNMA = rst.getLong("QCPNMA");
                QCPNTOT = rst.getLong("QCPNTOT");
                QCPNFI = rst.getInt("QCPNFI");

                QCPAD = rst.getLong("QCPAD");
                QCPCHD = rst.getLong("QCPCHD");
                QCPINF = rst.getLong("QCPINF");
                QCPTRA = rst.getLong("QCPTRA");
                QCPNVAL = rst.getLong("QCPNVAL");
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    beanCarr = new A1691Filter();

                    beanCarr.CARRI = rst.getString("CARRI").trim();
                    beanCarr.FCLOFO = rst.getString("FCLOFO");
                    if (rst.getString("FCLOFO").trim().equals("1")) {
                        beanCarr.strFCLOFO = "AUTOMATIC";
                        beanCarr.strDesFCLOFO = "FORCED AUTOMATIC";
                    } else if (rst.getString("FCLOFO").trim().equals("2")) {
                        beanCarr.strFCLOFO = "MANUAL";
                        beanCarr.strDesFCLOFO = "FORCED MANUAL";
                    } else {
                        beanCarr.strFCLOFO = "";
                        beanCarr.strDesFCLOFO = "";
                    }

                    beanCarr.FFLOW = rst.getString("FFLOW").trim();
                    if (rst.getString("FFLOW").trim().equals("C")) {
                        beanCarr.strDescFFLOW = "Charter";
                    } else if (rst.getString("FFLOW").trim().equals("X")) {
                        beanCarr.strDescFFLOW = "Canceled";
                    } else if (rst.getString("FFLOW").trim().equals("U")) {
                        beanCarr.strDescFFLOW = "Unscheduled";
                    } else if (rst.getString("FFLOW").trim().equals("P")) {
                        beanCarr.strDescFFLOW = "Scheduled";
                    } else {
                        beanCarr.strDescFFLOW = "(None)";
                    }
                    beanCarr.FSENDSS = rst.getString("FSENDSS").trim();
                    beanCarr.strFormatFSENDSS = Functions.getMonthConvert(rst.getString("FSENDSS").trim());
                    beanCarr.CDEPART = rst.getString("CDEPART").trim();
                    if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                        beanCarr.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                    }
                    beanCarr.CARRIVA = rst.getString("CARRIVA").trim();
                    if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                        beanCarr.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                    }
                    beanCarr.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanCarr.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanCarr.FSENDFI = rst.getString("FSENDFI").trim();
                    beanCarr.strFormatDate3 = Functions.getMonthConvert(beanCarr.FSENDFI);
                    beanCarr.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanCarr.strFormatDate = Functions.getMonthConvert(beanCarr.DFLIGHT);
                    beanCarr.FSENDOD = rst.getString("FSENDOD").trim();
                    beanCarr.strFormatFSENDOD = Functions.getMonthConvert(rst.getString("FSENDOD").trim());
                    beanCarr.FSENDVC = rst.getString("FSENDVC").trim();
                    beanCarr.strFormatFSENDVC = Functions.getMonthConvert(rst.getString("FSENDVC").trim());

                    beanCarr.FOPERZUL = rst.getString("FOPERZUL");
                    beanCarr.strFormatDate2 = Functions.getMonthConvert(beanCarr.FOPERZUL);

                    beanCarr.QCPNOD = rst.getLong("QCPNOD");
                    beanCarr.QCPNFI = rst.getInt("QCPNFI");
                    beanCarr.QCPNOCR = rst.getLong("QCPNOCR");
                    beanCarr.QCPNVC = rst.getLong("QCPNVC");
                    beanCarr.QCPNLEG = rst.getLong("QCPNLEG");
                    beanCarr.QCPNMA = rst.getLong("QCPNMA");
                    beanCarr.QCPNTOT = rst.getLong("QCPNTOT");
                    beanCarr.QCPNVAL = rst.getLong("QCPNVAL");
                    /*if(rst.getString("FMULTI").trim().equals("L")){
                     beanCons.lngQVCR = rst.getLong("QTOT");
                     }*/

                    beanCarr.QCPAD = rst.getLong("QCPAD");
                    beanCarr.QCPCHD = rst.getLong("QCPCHD");
                    beanCarr.QCPINF = rst.getLong("QCPINF");
                    beanCarr.QCPTRA = rst.getLong("QCPTRA");

                    beanCarr.totQCPNOD = QCPNOD;
                    beanCarr.totQCPNVC = QCPNVC;
                    beanCarr.totQCPNLEG = QCPNLEG;
                    beanCarr.totQCPNOCR = QCPNOCR;
                    beanCarr.totQCPNMA = QCPNMA;
                    beanCarr.totQCPNTOT = QCPNTOT;
                    beanCarr.totQCPAD = QCPAD;
                    beanCarr.totQCPCHD = QCPCHD;
                    beanCarr.totQCPINF = QCPINF;
                    beanCarr.totQCPTRA = QCPTRA;
                    beanCarr.totQCPNFI = QCPNFI;
                    beanCarr.totQCPNVAL = QCPNVAL;

                    beanCarr.page.PAGNUM = filter.page.PAGNUM;
                    beanCarr.page.PAGROW = filter.page.PAGROW;
                    beanCarr.page.TOTPAG = filter.page.TOTPAG;
                    beanCarr.page.TOTROW = filter.page.TOTROW;

                    lstCarr.add(beanCarr);
                }
            }
        } catch (Exception e) {
            //e.getMessage();
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

        return lstCarr;
    }

    public List<A1691Filter> loadPX235SQP04158(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A1691Filter> lstCarr = new ArrayList<>(0);
        A1691Filter beanCarr;

        HashMap<String, String> hmDescEstados_A1691 = new HashMap<String, String>();
        hmDescEstados_A1691.put("5", "Cancelled");

        HashMap<String, String> hmDescEstados_A3778 = new HashMap<String, String>();
        hmDescEstados_A3778.put("1", "");

        long PAXTOTAL = 0;

        CallableStatement cstmt = null;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04158(?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_NFLIGHT);
            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();
            
            while (rst.next()) {
                PAXTOTAL = rst.getLong("PAXTOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

            while (rst.next()) {
                beanCarr = new A1691Filter();

                beanCarr.DFLIGHT = Functions.getMonthConvert(rst.getString("DFLIGHT").trim());
                beanCarr.NFLIGHT = rst.getString("NFLIGHT").trim();

                beanCarr.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanCarr.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                beanCarr.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanCarr.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }

                //beanCarr.STVAL = rst.getString("STVAL").trim();
                if (hmDescEstados_A1691.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanCarr.STVAL = hmDescEstados_A1691.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanCarr.STVAL = rst.getString("STVAL").trim();
                }

                beanCarr.A3778STVAL = rst.getString("A3778STVAL").trim();
                beanCarr.A3778USCR = rst.getString("A3778USCR").trim();
                beanCarr.A3778FECR = Functions.getMonthConvert(rst.getString("A3778FECR").trim());
                beanCarr.A3778HOCR = Functions.ConvertedTime(rst.getString("A3778HOCR").trim());
                beanCarr.PAXTOTAL = rst.getLong("PAXTOTAL");
                beanCarr.A1688USCR = rst.getString("A1688USCR").trim();
                beanCarr.A1688FECR = Functions.getMonthConvert(rst.getString("A1688FECR").trim());
                beanCarr.A1688HOCR = Functions.ConvertedTime(rst.getString("A1688HOCR").trim());

                beanCarr.page.PAGNUM = filter.page.PAGNUM;
                beanCarr.page.PAGROW = filter.page.PAGROW;
                beanCarr.page.TOTPAG = filter.page.TOTPAG;
                beanCarr.page.TOTROW = filter.page.TOTROW;

                beanCarr.totPAXTOTAL = PAXTOTAL;

                lstCarr.add(beanCarr);
            }
              rst.close();
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lstCarr;
    }

    public List<A1413Filter> loadPX235SQP00253(A1413Filter filter) throws SQLException, Exception {

        List<A1413Filter> lstObjetos = new ArrayList<>(0);
        A1413Filter beanTkt;

        CallableStatement cstmt = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00253(?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cstmt.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cstmt.setString(4, filter.IN_TKT.substring(7, 13));//SERIE

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new A1413Filter();
                beanTkt.A1413CIA = rst.getString("A1413CIA");

                beanTkt.A1413STCRU = rst.getString("A1413STCRU").trim();

                if (beanTkt.A1413STCRU.equals("")) {
                    beanTkt.A1413STCRU = "Pending";
                } else if (beanTkt.A1413STCRU.equals("F")) {
                    beanTkt.A1413STCRU = "Extraido al Flown";
                } else if (beanTkt.A1413STCRU.equals("D")) {
                    beanTkt.A1413STCRU = "Duplicate";
                } else if (beanTkt.A1413STCRU.equals("C")) {
                    beanTkt.A1413STCRU = "Cancelled";
                }

                beanTkt.A1413FORSE = rst.getString("A1413FORSE");
                beanTkt.A1413CUPON = rst.getString("A1413CUPON");
                beanTkt.strTicket = rst.getString("A1413CIA") + " " + rst.getString("A1413FORSE") + " " + rst.getString("A1413CUPON");
                beanTkt.A1413FVLOB = rst.getString("A1413FVLOB");
                beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.A1413FVLOB);
                beanTkt.A1413NVLOB = rst.getString("A1413NVLOB");
                beanTkt.A1413DATE = rst.getString("A1413DATE");//Fecha de Trasaccion
                beanTkt.strFormatDate2 = Functions.getMonthConvert(beanTkt.A1413DATE);
                beanTkt.A1413FREGI = rst.getString("A1413FREGI");
                beanTkt.strDescripcion = Functions.getMonthConvert(beanTkt.A1413FREGI);//Fecha de Ingreso

                beanTkt.A1413FROM = rst.getString("A1413FROM");
                beanTkt.A1413TO = rst.getString("A1413TO");
                beanTkt.strFROM = rst.getString("DES_ORIG");
                beanTkt.strTO = rst.getString("DES_DEST");
                beanTkt.FFLOWN = rst.getString("FFLOWN");

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstObjetos.add(beanTkt);
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

        return lstObjetos;
    }

    public A1413Filter loadPX235SQP00257(A1413Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        A1413Filter beanCons = new A1413Filter();

        CallableStatement cstmt = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00257(?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.A1413DATE.trim());
            cstmt.setString(3, filter.A1413CIA.trim());
            cstmt.setString(4, filter.A1413FORSE.trim());
            cstmt.setString(5, filter.A1413CUPON.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();
            if (rst.next()) {
                beanCons = new A1413Filter();
                beanCons.A1413CCUST = rst.getString("A1413CCUST").trim();
                beanCons.A1413FROM = rst.getString("A1413FROM").trim();
                if (hmAeropuertos.containsKey(rst.getString("A1413FROM").trim().toUpperCase())) {
                    beanCons.strFROM = hmAeropuertos.get(rst.getString("A1413FROM").trim()).toString();
                }
                beanCons.A1413TO = rst.getString("A1413TO").trim();
                if (hmAeropuertos.containsKey(rst.getString("A1413TO").trim().toUpperCase())) {
                    beanCons.strTO = hmAeropuertos.get(rst.getString("A1413TO").trim()).toString();
                }
                beanCons.A1413DATE = rst.getString("A1413DATE").trim();
                beanCons.A1413CIA = rst.getString("A1413CIA").trim();
                beanCons.A1413FORSE = rst.getString("A1413FORSE").trim();
                beanCons.A1413CUPON = rst.getString("A1413CUPON").trim();
                beanCons.strTicket = beanCons.A1413CIA + " " + beanCons.A1413FORSE + " " + beanCons.A1413CUPON;
                beanCons.A1413SEC = rst.getString("A1413SEC").trim();
                beanCons.A1413DATA = rst.getString("A1413DATA").trim();
                beanCons.A1413STATU = rst.getString("A1413STATU").trim();
                beanCons.A1413STCRU = rst.getString("A1413STCRU").trim();
                beanCons.A1413FVLO = rst.getString("A1413FVLO").trim();
                beanCons.A1413TYPE = rst.getString("A1413TYPE").trim();
                beanCons.A1413SOURC = rst.getString("A1413SOURC").trim();
                beanCons.A1413PNROR = rst.getString("A1413PNROR").trim();
                beanCons.A1413PNR = rst.getString("A1413PNR").trim();
                beanCons.A1413FFCIA = rst.getString("A1413FFCIA").trim();
                beanCons.A1413FFCOD = rst.getString("A1413FFCOD").trim();
                beanCons.A1413FFCOD = rst.getString("A1413FFCOD").trim();
                beanCons.A1413NPAX = rst.getString("A1413NPAX").trim();
                beanCons.A1413FVLOB = rst.getString("A1413FVLOB").trim();
                beanCons.A1413NVLOB = rst.getString("A1413NVLOB").trim();
                beanCons.A1413CITYB = rst.getString("A1413CITYB").trim();
                beanCons.A1413FCONT = rst.getString("A1413FCONT").trim();

                beanCons.A1413REGIS = rst.getString("A1413REGIS").trim();
                beanCons.A1413FREGI = rst.getString("A1413FREGI").trim();
                beanCons.A1413HREGI = Functions.ConvertedTime(rst.getString("A1413HREGI").trim());

                beanCons.A1413REVIS = rst.getString("A1413REVIS").trim();
                beanCons.A1413FREVI = rst.getString("A1413FREVI").trim();
                beanCons.A1413HREVI = Functions.ConvertedTime(rst.getString("A1413HREVI").trim());

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

    public String loadPX235SQP00257VALID(A1413Filter filter) throws SQLException, Exception {

        CallableStatement cs = null;
        String strSQL;
        String msj = "";

        try {

            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00257VALID(?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(6, Types.VARCHAR);
            System.out.println("A1413FVLOB - " + filter.A1413FVLOB);
            System.out.println("A1413NVLOB - " + filter.A1413NVLOB);
            System.out.println("A1413FROM - " + filter.A1413FROM);
            System.out.println("A1413TO - " + filter.A1413TO);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.A1413FVLOB.trim());
            cs.setString(3, filter.A1413NVLOB.trim());
            cs.setString(4, filter.A1413FROM.trim());
            cs.setString(5, filter.A1413TO.trim());
            cs.setString(6, "");

            cs.execute();

            //Obteniendo el mensaje de error ===================================    
            if (cs.getString(6) != null) {
                msj = cs.getString(6).trim();
            }

            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            msj = e.getMessage();
        } finally {
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        System.out.println(" ----> DAO - Mensaje en la validación : " + msj);
        return msj;
    }

    public String loadPX235SQP00257ENTRY(A1413Filter filter, String strOption) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00257ENTRY(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, strOption.trim());
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.A1413DATE.trim());
            cstmt.setString(4, filter.A1413SEC.trim());
            cstmt.setString(5, filter.A1413DATA.trim());
            cstmt.setString(6, filter.A1413STATU.trim());
            cstmt.setString(7, filter.A1413CIA.trim());
            cstmt.setString(8, filter.A1413FORSE.trim());
            cstmt.setString(9, filter.A1413CUPON.trim());
            cstmt.setString(10, filter.A1413FROM.trim());
            cstmt.setString(11, filter.A1413TO.trim());
            cstmt.setString(12, filter.A1413STCRU.trim());
            cstmt.setString(13, filter.A1413FVLO.trim());
            cstmt.setString(14, filter.A1413TYPE.trim());
            cstmt.setString(15, filter.A1413SOURC.trim());
            cstmt.setString(16, filter.A1413PNROR.trim());
            cstmt.setString(17, filter.A1413PNR.trim());
            cstmt.setString(18, filter.A1413FFCIA.trim());
            cstmt.setString(19, filter.A1413FFCOD.trim());
            cstmt.setString(20, filter.A1413FVTA.trim());
            cstmt.setString(21, filter.A1413NPAX.trim());
            cstmt.setString(22, filter.A1413FVLOB.trim());
            cstmt.setString(23, filter.A1413NVLOB.trim());
            cstmt.setString(24, filter.A1413CITYB.trim());
            cstmt.setString(25, filter.A1413FCONT.trim());

            cstmt.setString(26, session.getUserView().getUserInfo().USR);
            cstmt.setString(27, Functions.getFechaActual());
            cstmt.setString(28, Functions.getHoraActual());

            cstmt.execute();

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;
    }

    public A1691Filter loadPX095S04A1691(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        A1691Filter beanCons = new A1691Filter();

        CallableStatement cstmt = null;
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
                beanCons.IN_CARRIER = session.getUserView().getUserInfo().USR;
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

    public A2149 insertFavoriteMenu(A2149 filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;

        try {
            Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            Functions.msjConsola("PRAXIS", session.getUserView().getUserInfo().USR, "insertFavoriteMenu");
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00553(?,?,?,?,?)}";
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, "1");
            cs.setString(2, filter.A2149IDMEN);
            cs.setString(3, filter.A2149ICON);
            cs.setString(4, session.getUserView().getUserInfo().USR);
            cs.setString(5, filter.A2149MNUNM);
            cs.execute();
            rst = cs.getResultSet();
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return filter;
    }

    public A2149 deleteFavoriteMenu(A2149 filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;

        try {
            Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            Functions.msjConsola("PRAXIS", session.getUserView().getUserInfo().USR, "deleteFavoriteMenu");
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00555(?,?)}";
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, filter.A2149IDMEN);
            cs.setString(2, session.getUserView().getUserInfo().USR);
            cs.execute();
            rst = cs.getResultSet();
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return filter;
    }
    
    public A1413Filter loadSQP04497(A1413Filter filter, String type) throws SQLException, Exception {

        CallableStatement cs = null;
        String strSQL;
        String msj = "";
        A1413Filter beanCons = new A1413Filter();

        try {

            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04497(?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(8, Types.VARCHAR);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.A1413FVLOB.trim());
            cs.setString(3, filter.A1413NVLOB.trim());
            cs.setString(4, filter.A1413FROM.trim());
            cs.setString(5, filter.A1413TO.trim());
            cs.setString(6, session.getUserView().getCustomerInfo().USR);
            cs.setString(7, type);
            cs.setString(8, "");

            cs.execute();

            //Obteniendo el mensaje de error ===================================    
            if (cs.getString(8) != null) {
                beanCons = new A1413Filter();
//                msj = cs.getString(6).trim();
                beanCons.strDescripcion = cs.getString(8).trim();
                beanCons.FFLOWN = type;
            }

            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            msj = e.getMessage();
        } finally {
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
//        System.out.println(" ----> DAO - Mensaje en la validación : " + msj);
        
        return beanCons;
    }

}
