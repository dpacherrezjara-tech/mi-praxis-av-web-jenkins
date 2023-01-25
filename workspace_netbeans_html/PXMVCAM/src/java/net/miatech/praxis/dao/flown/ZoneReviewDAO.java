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
import net.miatech.beans.A2826Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ZoneReviewDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ZoneReviewDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ZoneReviewDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public HashMap loadSQP01278(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<>(0);
        A2826Filter objRtn;
        double PAXFAV = 0, PAXFAV_LY = 0, AMTFAV_LY = 0, AMTFAV = 0;
        double AMTVCPN = 0, AMTVCPN_LY = 0;
        //Grafico
        List<A2826Filter> lstGraficoRtn = new ArrayList<>(0);
        A2826Filter objGraficoRtn;
        HashMap resultado = new HashMap();
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01278(?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                PAXFAV = rs01.getDouble("PAXFAV");
                AMTFAV = rs01.getDouble("AMTFAV");
                AMTVCPN = (rs01.getDouble("PAXFAV") > 0) ? rs01.getDouble("AMTVCPN") / rs01.getDouble("PAXFAV") : 0.00;

                PAXFAV_LY = rs01.getDouble("PAXFAV_LY");
                AMTFAV_LY = rs01.getDouble("AMTFAV_LY");
                AMTVCPN_LY = (rs01.getDouble("PAXFAV_LY") > 0) ? rs01.getDouble("AMTVCPN_LY") / rs01.getDouble("PAXFAV_LY") : 0.00;
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.ZONA = rs01.getString("ZONA");
                    //objRtn.strDescripcion6 = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion6 = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";

                    //---------AÑO DEL FILTRO-------
                    // AÑO NATERIOR
                    objRtn.QCFLOW15 = rs01.getDouble("AMTFAV_LY");
                    objRtn.QCPAX15 = rs01.getDouble("PAXFAV_LY");
                    objRtn.VCPN15 = (rs01.getDouble("PAXFAV_LY") > 0) ? rs01.getDouble("AMTVCPN_LY") / rs01.getDouble("PAXFAV_LY") : 0.00;

                    objRtn.totQCFLOW15 = AMTFAV_LY;
                    objRtn.totQCPAX15 = PAXFAV_LY;
                    objRtn.totVCPN15 = AMTVCPN_LY;

                    objRtn.AVG15 = (objRtn.QCFLOW15 > 0) ? (objRtn.QCPAX15) / objRtn.QCFLOW15 : 0.00;
                    objRtn.totAVG15avg = (objRtn.totQCFLOW15 > 0) ? (objRtn.totQCPAX15) / objRtn.totQCFLOW15 : 0.00;

                    //-------AÑO ACTUAL---------------
                    objRtn.QCFLOW16 = rs01.getDouble("AMTFAV");
                    objRtn.QCPAX16 = rs01.getDouble("PAXFAV");
                    objRtn.VCPN16 = (rs01.getDouble("PAXFAV") > 0) ? rs01.getDouble("AMTVCPN") / rs01.getDouble("PAXFAV") : 0.00;

                    objRtn.totQCFLOW16 = AMTFAV;
                    objRtn.totQCPAX16 = PAXFAV;
                    objRtn.totVCPN16 = AMTVCPN;

                    objRtn.AVG16 = (objRtn.QCFLOW16 > 0) ? (objRtn.QCPAX16) / objRtn.QCFLOW16 : 0.00;
                    objRtn.totAVG16avg = (objRtn.totQCFLOW16 > 0) ? (objRtn.totQCPAX16) / objRtn.totQCFLOW16 : 0.00;

                    //---------------DIFFERENCES ----------------------------- 
                    objRtn.VCPNavg = objRtn.VCPN16 - objRtn.VCPN15;
                    objRtn.totVCPNavg = objRtn.totVCPN16 - objRtn.totVCPN15;
                    objRtn.diffQCFLOW = objRtn.QCFLOW16 - objRtn.QCFLOW15;
                    objRtn.diffQCPAX = objRtn.QCPAX16 - objRtn.QCPAX15;
                    objRtn.diffAVG = (objRtn.diffQCFLOW > 0) ? (objRtn.diffQCPAX) / objRtn.diffQCFLOW : 0.00;
                    objRtn.totDiffQCFLOW = objRtn.totQCFLOW16 - objRtn.totQCFLOW15;
                    objRtn.totDiffQCPAX = objRtn.totQCPAX16 - objRtn.totQCPAX15;
                    objRtn.totDiffAVG = (objRtn.totDiffQCFLOW > 0) ? (objRtn.totDiffQCPAX) / objRtn.totDiffQCFLOW : 0.00;

                    if (objRtn.diffQCFLOW < 0) {
                        objRtn.strDescripcion = "rojo";
                    }
                    if (objRtn.diffQCPAX < 0) {
                        objRtn.strDescripcion1 = "rojo";
                    }
                    if (objRtn.diffAVG < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }

                    if (objRtn.VCPNavg < 0) {
                        objRtn.strDescripcion7 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }
            rs01.close();
            cstmt01.close();
            resultado.put("REPORTE", lstRtn);

            //Buscar información para el gráfico
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01291(?,?,?,?)}";
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objGraficoRtn = new A2826Filter();

                objGraficoRtn.yearFrom = filter.yearFrom;
                objGraficoRtn.monthFrom = filter.monthFrom;
                objGraficoRtn.IN_ZONA = filter.IN_ZONA;
                objGraficoRtn.IN_CARRI = filter.IN_CARRI;
                //---------AÑO DEL ANTERIOR -------

                objGraficoRtn.QCFLOWM15 = rs01.getDouble("AMTFAVM_LY");
                objGraficoRtn.QCPAXM15 = rs01.getDouble("PAXFAVM_LY");
                objGraficoRtn.QCFLOWT15 = rs01.getDouble("AMTFAVT_LY");
                objGraficoRtn.QCPAXT15 = rs01.getDouble("PAXFAVT_LY");
                objGraficoRtn.QCFLOWW15 = rs01.getDouble("AMTFAVW_LY");
                objGraficoRtn.QCPAXW15 = rs01.getDouble("PAXFAVW_LY");
                objGraficoRtn.QCFLOWTH15 = rs01.getDouble("AMTFAVTH_LY");
                objGraficoRtn.QCPAXTH15 = rs01.getDouble("PAXFAVTH_LY");
                objGraficoRtn.QCFLOWF15 = rs01.getDouble("AMTFAVF_LY");
                objGraficoRtn.QCPAXF15 = rs01.getDouble("PAXFAVF_LY");
                objGraficoRtn.QCFLOWS15 = rs01.getDouble("AMTFAVS_LY");
                objGraficoRtn.QCPAXS15 = rs01.getDouble("PAXFAVS_LY");
                objGraficoRtn.QCFLOWSA15 = rs01.getDouble("AMTFAVSA_LY");
                objGraficoRtn.QCPAXSA15 = rs01.getDouble("PAXFAVSA_LY");

                //-------AÑO ANTERIOR FILTRO---------------
                objGraficoRtn.QCFLOWM16 = rs01.getDouble("AMTFAVM");
                objGraficoRtn.QCPAXM16 = rs01.getDouble("PAXFAVM");
                objGraficoRtn.QCFLOWT16 = rs01.getDouble("AMTFAVT");
                objGraficoRtn.QCPAXT16 = rs01.getDouble("PAXFAVT");
                objGraficoRtn.QCFLOWW16 = rs01.getDouble("AMTFAVW");
                objGraficoRtn.QCPAXW16 = rs01.getDouble("PAXFAVW");
                objGraficoRtn.QCFLOWTH16 = rs01.getDouble("AMTFAVTH");
                objGraficoRtn.QCPAXTH16 = rs01.getDouble("PAXFAVTH");
                objGraficoRtn.QCFLOWF16 = rs01.getDouble("AMTFAVF");
                objGraficoRtn.QCPAXF16 = rs01.getDouble("PAXFAVF");
                objGraficoRtn.QCFLOWS16 = rs01.getDouble("AMTFAVS");
                objGraficoRtn.QCPAXS16 = rs01.getDouble("PAXFAVS");
                objGraficoRtn.QCFLOWSA16 = rs01.getDouble("AMTFAVSA");
                objGraficoRtn.QCPAXSA16 = rs01.getDouble("PAXFAVSA");

                lstGraficoRtn.add(objGraficoRtn);
            }
            resultado.put("GRAFICO", lstGraficoRtn);

        } catch (Exception e) {
            e.printStackTrace();
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

        return resultado;
    }

    public List<A2826Filter> loadSQP01317(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;

        double VCPNM = 0, VCPNT = 0, VCPNW = 0, VCPNTH = 0, VCPNF = 0, VCPNS = 0, VCPNSA = 0, VCPNTT = 0;
        double VCPNM_LY = 0, VCPNT_LY = 0, VCPNW_LY = 0, VCPNTH_LY = 0, VCPNF_LY = 0, VCPNS_LY = 0, VCPNSA_LY = 0, VCPNTT_LY = 0;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01317(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                VCPNM = rs01.getInt("VCPNM");
                VCPNT = rs01.getInt("VCPNT");
                VCPNW = rs01.getDouble("VCPNW");
                VCPNTH = rs01.getInt("VCPNTH");
                VCPNF = rs01.getInt("VCPNF");
                VCPNS = rs01.getInt("VCPNS");
                VCPNSA = rs01.getDouble("VCPNSA");
                VCPNTT = rs01.getInt("VCPNM") + rs01.getInt("VCPNT") + rs01.getDouble("VCPNW") + rs01.getInt("VCPNTH") + rs01.getInt("VCPNS") + rs01.getDouble("VCPNSA");

                VCPNM_LY = rs01.getInt("VCPNM_LY");
                VCPNT_LY = rs01.getInt("VCPNT_LY");
                VCPNW_LY = rs01.getDouble("VCPNW_LY");
                VCPNTH_LY = rs01.getInt("VCPNTH_LY");
                VCPNF_LY = rs01.getInt("VCPNF_LY");
                VCPNS_LY = rs01.getInt("VCPNS_LY");
                VCPNSA_LY = rs01.getDouble("VCPNSA_LY");
                VCPNTT_LY = rs01.getInt("VCPNM_LY") + rs01.getInt("VCPNT_LY") + rs01.getDouble("VCPNW_LY") + rs01.getInt("VCPNTH_LY") + rs01.getInt("VCPNS_LY") + rs01.getDouble("VCPNSA_LY");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.ZONA = rs01.getString("ZONA");
                    //objRtn.strDescripcion = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";
                    //---------AÑO  ANTERIOR -------

                    objRtn.VCPNM15 = rs01.getDouble("VCPNM_LY");
                    objRtn.VCPNT15 = rs01.getDouble("VCPNT_LY");
                    objRtn.VCPNW15 = rs01.getDouble("VCPNW_LY");
                    objRtn.VCPNTH15 = rs01.getDouble("VCPNTH_LY");
                    objRtn.VCPNF15 = rs01.getDouble("VCPNF_LY");
                    objRtn.VCPNS15 = rs01.getDouble("VCPNS_LY");
                    objRtn.VCPNSA15 = rs01.getDouble("VCPNSA_LY");
                    objRtn.VCPNTT15 = rs01.getDouble("VCPNM_LY") + rs01.getDouble("VCPNT_LY") + rs01.getDouble("VCPNW_LY")
                            + rs01.getDouble("VCPNTH_LY") + rs01.getDouble("VCPNF_LY") + rs01.getDouble("VCPNS_LY") + rs01.getDouble("VCPNSA_LY");

                    objRtn.totVCPNM15 = VCPNM_LY;
                    objRtn.totVCPNT15 = VCPNT_LY;
                    objRtn.totVCPNW15 = VCPNW_LY;
                    objRtn.totVCPNTH15 = VCPNTH_LY;
                    objRtn.totVCPNF15 = VCPNF_LY;
                    objRtn.totVCPNS15 = VCPNS_LY;
                    objRtn.totVCPNSA15 = VCPNSA_LY;
                    objRtn.totVCPNTT15 = VCPNTT_LY;

                    //-------AÑO  FILTRO---------------
                    objRtn.VCPNM16 = rs01.getDouble("VCPNM");
                    objRtn.VCPNT16 = rs01.getDouble("VCPNT");
                    objRtn.VCPNW16 = rs01.getDouble("VCPNW");
                    objRtn.VCPNTH16 = rs01.getDouble("VCPNTH");
                    objRtn.VCPNF16 = rs01.getDouble("VCPNF");
                    objRtn.VCPNS16 = rs01.getDouble("VCPNS");
                    objRtn.VCPNSA16 = rs01.getDouble("VCPNSA");
                    objRtn.VCPNTT16 = rs01.getDouble("VCPNM") + rs01.getDouble("VCPNT") + rs01.getDouble("VCPNW")
                            + rs01.getDouble("VCPNTH") + rs01.getDouble("VCPNF") + rs01.getDouble("VCPNS") + rs01.getDouble("VCPNSA");

                    objRtn.totVCPNM16 = VCPNM;
                    objRtn.totVCPNT16 = VCPNT;
                    objRtn.totVCPNW16 = VCPNW;
                    objRtn.totVCPNTH16 = VCPNTH;
                    objRtn.totVCPNF16 = VCPNF;
                    objRtn.totVCPNS16 = VCPNS;
                    objRtn.totVCPNSA16 = VCPNSA;
                    objRtn.totVCPNTT16 = VCPNTT;

                    //DIFERENCIAS
                    objRtn.diffVCPNM = objRtn.VCPNM16 - objRtn.VCPNM15;
                    objRtn.diffVCPNT = objRtn.VCPNT16 - objRtn.VCPNT15;
                    objRtn.diffVCPNW = objRtn.VCPNW16 - objRtn.VCPNW15;
                    objRtn.diffVCPNTH = objRtn.VCPNTH16 - objRtn.VCPNTH15;
                    objRtn.diffVCPNF = objRtn.VCPNF16 - objRtn.VCPNF15;
                    objRtn.diffVCPNS = objRtn.VCPNS16 - objRtn.VCPNS15;
                    objRtn.diffVCPNSA = objRtn.VCPNSA16 - objRtn.VCPNSA15;
                    objRtn.diffVCPNTT = objRtn.VCPNTT16 - objRtn.VCPNTT15;

                    objRtn.diffTotVCPNM = objRtn.totVCPNM16 - objRtn.totVCPNM15;
                    objRtn.diffTotVCPNT = objRtn.totVCPNT16 - objRtn.totVCPNT15;
                    objRtn.diffTotVCPNW = objRtn.totVCPNW16 - objRtn.totVCPNW15;
                    objRtn.diffTotVCPNTH = objRtn.totVCPNTH16 - objRtn.totVCPNTH15;
                    objRtn.diffTotVCPNF = objRtn.totVCPNF16 - objRtn.totVCPNF15;
                    objRtn.diffTotVCPNS = objRtn.totVCPNS16 - objRtn.totVCPNS15;
                    objRtn.diffTotVCPNSA = objRtn.totVCPNSA16 - objRtn.totVCPNSA15;
                    objRtn.diffTotVCPNTT = objRtn.totVCPNTT16 - objRtn.totVCPNTT15;

                    if (objRtn.diffVCPNM < 0) {
                        objRtn.strDescripcion1 = "rojo";
                    }
                    if (objRtn.diffVCPNT < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }
                    if (objRtn.diffVCPNW < 0) {
                        objRtn.strDescripcion3 = "rojo";
                    }
                    if (objRtn.diffVCPNTH < 0) {
                        objRtn.strDescripcion4 = "rojo";
                    }
                    if (objRtn.diffVCPNF < 0) {
                        objRtn.strDescripcion5 = "rojo";
                    }
                    if (objRtn.diffVCPNS < 0) {
                        objRtn.strDescripcion6 = "rojo";
                    }
                    if (objRtn.diffVCPNSA < 0) {
                        objRtn.strDescripcion7 = "rojo";
                    }
                    if (objRtn.diffVCPNTT < 0) {
                        objRtn.strDescripcion8 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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

    public List<A2826Filter> loadSQP01318(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;
        double QYIELD = 0, QYIELD_LY = 0, QBASICM_LY = 0, QBASICM = 0;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01318(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QYIELD = rs01.getDouble("QYIELD");
                QBASICM = rs01.getDouble("QBASICM");
                QYIELD_LY = rs01.getDouble("QYIELD_LY");
                QBASICM_LY = rs01.getDouble("QBASICM_LY");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.ZONA = rs01.getString("ZONA");
                    //objRtn.strDescripcion1 = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion1 = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";

                    //---------AÑO DEL FILTRO-------
                    // AÑO ACTUAL
                    objRtn.QYIELD15 = rs01.getDouble("QYIELD_LY");
                    objRtn.QBASICM15 = rs01.getDouble("QBASICM_LY");

                    //-------AÑO ANTERIOR---------------
                    objRtn.QYIELD16 = rs01.getDouble("QYIELD");
                    objRtn.QBASICM16 = rs01.getDouble("QBASICM");

                    //---------------DIFFERENCES ----------------------------- 
                    objRtn.diffQYIELD = objRtn.QYIELD16 - objRtn.QYIELD15;

                    if (objRtn.diffQYIELD < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
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

    public List<A2826Filter> loadSQP01297(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;
        int QBLOCKH = 0, QBLOCKH_LY = 0, QBLOCKM_LY = 0, QBLOCKM = 0;
        double AMTVCPN = 0, AMTVCPN_LY = 0;
        int p = 1, q = 0;
        int cociente = 0, residuo = 0;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01297(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QBLOCKH = rs01.getInt("QBLOCKH");
                QBLOCKM = rs01.getInt("QBLOCKM");
                AMTVCPN = rs01.getDouble("AMTVCPN");
                QBLOCKH_LY = rs01.getInt("QBLOCKH_LY");
                QBLOCKM_LY = rs01.getInt("QBLOCKM_LY");
                AMTVCPN_LY = rs01.getDouble("AMTVCPN_LY");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.ZONA = rs01.getString("ZONA");
                    //objRtn.strDescripcion6 = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion6 = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";

                    //---------AÑO DEL ANTERIOR -------
                    // AÑO pasado
                    objRtn.QBLOCKH15 = rs01.getInt("QBLOCKH_LY");
                    objRtn.QBLOCKM15 = rs01.getInt("QBLOCKM_LY");

                    objRtn.VCPN15 = rs01.getDouble("AMTVCPN_LY");
                    objRtn.HORASMIN15 = objRtn.QBLOCKH15 + " : " + Functions.fillZeros(2, String.valueOf(objRtn.QBLOCKM15));

                    //CALCULANDO EL RESIDUO
                    if (QBLOCKM_LY >= 60) {
                        cociente = (QBLOCKM_LY / 60);
                        residuo = (QBLOCKM_LY % 60);
                        objRtn.totQBLOCKH15 = QBLOCKH_LY + cociente;
                        objRtn.totQBLOCKM15 = residuo;
                    } else {
                        objRtn.totQBLOCKH15 = QBLOCKH_LY;
                        objRtn.totQBLOCKM15 = QBLOCKM_LY;
                    }
                    objRtn.totHORASMIN15 = objRtn.totQBLOCKH15 + " : " + Functions.fillZeros(2, String.valueOf(objRtn.totQBLOCKM15));
                    objRtn.totVCPN15 = AMTVCPN_LY;

                    objRtn.avgBLOCKH15 = (objRtn.QBLOCKH15 > 0) ? (objRtn.VCPN15) / objRtn.QBLOCKH15 : 0;
                    objRtn.totBLOCKH15avg = (objRtn.totQBLOCKH15 > 0) ? (objRtn.totVCPN15) / objRtn.totQBLOCKH15 : 0;

                    //-------AÑO FILTRO---------------
                    objRtn.QBLOCKH16 = rs01.getInt("QBLOCKH");
                    objRtn.QBLOCKM16 = rs01.getInt("QBLOCKM");
                    objRtn.VCPN16 = rs01.getDouble("AMTVCPN");
                    objRtn.HORASMIN16 = objRtn.QBLOCKH16 + " : " + Functions.fillZeros(2, String.valueOf(objRtn.QBLOCKM16));

                    //CALCULANDO EL RESIDUO
                    if (QBLOCKM >= 60) {
                        cociente = (QBLOCKM / 60);
                        residuo = (QBLOCKM % 60);
                        objRtn.totQBLOCKH16 = QBLOCKH + cociente;
                        objRtn.totQBLOCKM16 = residuo;
                    } else {
                        objRtn.totQBLOCKH16 = QBLOCKH;
                        objRtn.totQBLOCKM16 = QBLOCKM;
                    }

                    objRtn.totHORASMIN16 = objRtn.totQBLOCKH16 + " : " + Functions.fillZeros(2, String.valueOf(objRtn.totQBLOCKM16));
                    objRtn.totVCPN16 = AMTVCPN;

                    objRtn.avgBLOCKH16 = (objRtn.QBLOCKH16 > 0) ? (objRtn.VCPN16) / objRtn.QBLOCKH16 : 0;
                    objRtn.totBLOCKH16avg = (objRtn.totQBLOCKH16 > 0) ? (objRtn.totVCPN16) / objRtn.totQBLOCKH16 : 0;

                    //---------------DIFFERENCES ----------------------------- 
                    objRtn.diffVCPN = objRtn.VCPN16 - objRtn.VCPN15;
                    objRtn.totDiffVCPN = objRtn.totVCPN16 - objRtn.totVCPN15;
                    objRtn.diffQBLOCKH = objRtn.QBLOCKH16 - objRtn.QBLOCKH15;
                    objRtn.diffQBLOCKM = objRtn.QBLOCKM16 - objRtn.QBLOCKM15;
                    objRtn.diffHORASMIN16 = objRtn.diffQBLOCKH + " : " + Functions.fillZeros(2, String.valueOf(objRtn.diffQBLOCKM));
                    objRtn.totdiffQBLOCKH = objRtn.totQBLOCKH16 - objRtn.totQBLOCKH15;
                    objRtn.totdiffQBLOCKM = objRtn.totQBLOCKM16 - objRtn.totQBLOCKM15;
                    objRtn.totdiffHORASMIN16 = objRtn.totdiffQBLOCKH + " : " + Functions.fillZeros(2, String.valueOf(objRtn.totdiffQBLOCKM));
                    objRtn.diffAvgBLOCKH = (objRtn.diffQBLOCKH > 0) ? (objRtn.diffVCPN) / objRtn.diffQBLOCKH : 0;
                    objRtn.totdiffAvgBLOCKH = (objRtn.totdiffQBLOCKH > 0) ? (objRtn.totDiffVCPN) / objRtn.totdiffQBLOCKH : 0;

                    if (objRtn.diffVCPN < 0) {
                        objRtn.strDescripcion = "rojo";
                    }

                    if (objRtn.diffQBLOCKH < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }

                    if (objRtn.diffAvgBLOCKH < 0) {
                        objRtn.strDescripcion4 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
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

    public List<A2826Filter> loadSQP01302(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;

        double AMTFAVM_LY = 0, AMTFAVT_LY = 0, AMTFAVW_LY = 0, AMTFAVTH_LY = 0, AMTFAVF_LY = 0, AMTFAVS_LY = 0, AMTFAVSA_LY = 0, AMTFAVTT_LY = 0;
        double PAXFAVM_LY = 0, PAXFAVT_LY = 0, PAXFAVW_LY = 0, PAXFAVTH_LY = 0, PAXFAVF_LY = 0, PAXFAVS_LY = 0, PAXFAVSA_LY = 0, PAXFAVTT_LY = 0;
        double AMTFAVM = 0, AMTFAVT = 0, AMTFAVW = 0, AMTFAVTH = 0, AMTFAVF = 0, AMTFAVS = 0, AMTFAVSA = 0, AMTFAVTT = 0;
        double PAXFAVM = 0, PAXFAVT = 0, PAXFAVW = 0, PAXFAVTH = 0, PAXFAVF = 0, PAXFAVS = 0, PAXFAVSA = 0, PAXFAVTT = 0;
        double totAVGM = 0, totAVGT = 0, totAVGW = 0, totAVGTH = 0, totAVGF = 0, totAVGS = 0, totAVGSA = 0, totAVGTT = 0;
        double totAVGM_LY = 0, totAVGT_LY = 0, totAVGW_LY = 0, totAVGTH_LY = 0, totAVGF_LY = 0, totAVGS_LY = 0, totAVGSA_LY = 0, totAVGTT_LY = 0;
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01302(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                AMTFAVM_LY = rs01.getDouble("AMTFAVM_LY");
                AMTFAVT_LY = rs01.getDouble("AMTFAVT_LY");
                AMTFAVW_LY = rs01.getDouble("AMTFAVW_LY");
                AMTFAVTH_LY = rs01.getDouble("AMTFAVTH_LY");
                AMTFAVF_LY = rs01.getDouble("AMTFAVF_LY");
                AMTFAVS_LY = rs01.getDouble("AMTFAVS_LY");
                AMTFAVSA_LY = rs01.getDouble("AMTFAVSA_LY");
                //AMTFAVTT_LY = rs01.getDouble("AMTFAVM_LY") + rs01.getDouble("AMTFAVT_LY") + rs01.getDouble("AMTFAVW_LY") + rs01.getDouble("AMTFAVTH_LY") + rs01.getDouble("AMTFAVF_LY") + rs01.getDouble("AMTFAVS_LY") + rs01.getDouble("AMTFAVSA_LY");
                AMTFAVTT_LY = rs01.getDouble("TOTALAMT_LY");

                AMTFAVM = rs01.getDouble("AMTFAVM");
                AMTFAVT = rs01.getDouble("AMTFAVT");
                AMTFAVW = rs01.getDouble("AMTFAVW");
                AMTFAVTH = rs01.getDouble("AMTFAVTH");
                AMTFAVF = rs01.getDouble("AMTFAVF");
                AMTFAVS = rs01.getDouble("AMTFAVS");
                AMTFAVSA = rs01.getDouble("AMTFAVSA");
                //AMTFAVTT = rs01.getDouble("AMTFAVM") + rs01.getDouble("AMTFAVT") + rs01.getDouble("AMTFAVW") + rs01.getDouble("AMTFAVTH") + rs01.getDouble("AMTFAVF") + rs01.getDouble("AMTFAVS") + rs01.getDouble("AMTFAVSA");
                AMTFAVTT = rs01.getDouble("TOTALAMT");

                PAXFAVM_LY = rs01.getDouble("PAXFAVM_LY");
                PAXFAVT_LY = rs01.getDouble("PAXFAVT_LY");
                PAXFAVW_LY = rs01.getDouble("PAXFAVW_LY");
                PAXFAVTH_LY = rs01.getDouble("PAXFAVTH_LY");
                PAXFAVF_LY = rs01.getDouble("PAXFAVF_LY");
                PAXFAVS_LY = rs01.getDouble("PAXFAVS_LY");
                PAXFAVSA_LY = rs01.getDouble("PAXFAVSA_LY");
                //PAXFAVTT_LY = rs01.getDouble("PAXFAVM_LY") + rs01.getDouble("PAXFAVT_LY") + rs01.getDouble("PAXFAVW_LY") + rs01.getDouble("PAXFAVTH_LY") + rs01.getDouble("PAXFAVF_LY") + rs01.getDouble("PAXFAVS_LY") + rs01.getDouble("PAXFAVSA_LY");
                PAXFAVTT_LY = rs01.getDouble("TOTALPAX_LY");

                PAXFAVM = rs01.getDouble("PAXFAVM");
                PAXFAVT = rs01.getDouble("PAXFAVT");
                PAXFAVW = rs01.getDouble("PAXFAVW");
                PAXFAVTH = rs01.getDouble("PAXFAVTH");
                PAXFAVF = rs01.getDouble("PAXFAVF");
                PAXFAVS = rs01.getDouble("PAXFAVS");
                PAXFAVSA = rs01.getDouble("PAXFAVSA");
                //PAXFAVTT = rs01.getDouble("PAXFAVM") + rs01.getDouble("PAXFAVT") + rs01.getDouble("PAXFAVW") + rs01.getDouble("PAXFAVTH") + rs01.getDouble("PAXFAVF") + rs01.getDouble("PAXFAVS") + rs01.getDouble("PAXFAVSA");
                PAXFAVTT = rs01.getDouble("TOTALPAX");

                //totAVGM_LY = (rs01.getDouble("AMTFAVM_LY") > 0) ? (rs01.getDouble("PAXFAVM_LY")) / rs01.getDouble("AMTFAVM_LY") : 0.00;
                //totAVGT_LY = (rs01.getDouble("AMTFAVT_LY") > 0) ? (rs01.getDouble("PAXFAVT_LY")) / rs01.getDouble("AMTFAVT_LY") : 0.00;
                //totAVGW_LY = (rs01.getDouble("AMTFAVW_LY") > 0) ? (rs01.getDouble("PAXFAVW_LY")) / rs01.getDouble("AMTFAVW_LY") : 0.00;
                //totAVGTH_LY = (rs01.getDouble("AMTFAVTH_LY") > 0) ? (rs01.getDouble("PAXFAVTH_LY")) / rs01.getDouble("AMTFAVTH_LY") : 0.00;
                //totAVGF_LY = (rs01.getDouble("AMTFAVF_LY") > 0) ? (rs01.getDouble("PAXFAVF_LY")) / rs01.getDouble("AMTFAVF_LY") : 0.00;
                //totAVGS_LY = (rs01.getDouble("AMTFAVS_LY") > 0) ? (rs01.getDouble("PAXFAVS_LY")) / rs01.getDouble("AMTFAVS_LY") : 0.00;
                //totAVGSA_LY = (rs01.getDouble("AMTFAVSA_LY") > 0) ? (rs01.getDouble("PAXFAVSA_LY")) / rs01.getDouble("AMTFAVSA_LY") : 0.00;
                totAVGM_LY = rs01.getDouble("AVGM_LY");
                totAVGT_LY = rs01.getDouble("AVGT_LY");
                totAVGW_LY = rs01.getDouble("AVGW_LY");
                totAVGTH_LY = rs01.getDouble("AVGTH_LY");
                totAVGF_LY = rs01.getDouble("AVGF_LY");
                totAVGS_LY = rs01.getDouble("AVGS_LY");
                totAVGSA_LY = rs01.getDouble("AVGSA_LY");
                totAVGTT_LY = totAVGM_LY + totAVGT_LY + totAVGW_LY + totAVGTH_LY + totAVGF_LY + totAVGS_LY + totAVGSA_LY;

                //totAVGM = (rs01.getDouble("AMTFAVM") > 0) ? (rs01.getDouble("PAXFAVM")) / rs01.getDouble("AMTFAVM") : 0.00;
                //totAVGT = (rs01.getDouble("AMTFAVT") > 0) ? (rs01.getDouble("PAXFAVT")) / rs01.getDouble("AMTFAVT") : 0.00;
                //totAVGW = (rs01.getDouble("AMTFAVW") > 0) ? (rs01.getDouble("PAXFAVW")) / rs01.getDouble("AMTFAVW") : 0.00;
                //totAVGTH = (rs01.getDouble("AMTFAVTH") > 0) ? (rs01.getDouble("PAXFAVTH")) / rs01.getDouble("AMTFAVTH") : 0.00;
                //totAVGF = (rs01.getDouble("AMTFAVF") > 0) ? (rs01.getDouble("PAXFAVF")) / rs01.getDouble("AMTFAVF") : 0.00;
                //totAVGS = (rs01.getDouble("AMTFAVS") > 0) ? (rs01.getDouble("PAXFAVS")) / rs01.getDouble("AMTFAVS") : 0.00;
                //totAVGSA = (rs01.getDouble("AMTFAVSA") > 0) ? (rs01.getDouble("PAXFAVSA")) / rs01.getDouble("AMTFAVSA") : 0.00;
                totAVGM = rs01.getDouble("AVGM");
                totAVGT = rs01.getDouble("AVGT");
                totAVGW = rs01.getDouble("AVGW");
                totAVGTH = rs01.getDouble("AVGTH");
                totAVGF = rs01.getDouble("AVGF");
                totAVGS = rs01.getDouble("AVGS");
                totAVGSA = rs01.getDouble("AVGSA");
                totAVGTT = totAVGM_LY + totAVGT_LY + totAVGW_LY + totAVGTH_LY + totAVGF_LY + totAVGS_LY + totAVGSA_LY;

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.ZONA = rs01.getString("ZONA");
                    // objRtn.strDescripcion = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";
                    //---------AÑO DEL ANTERIOR -------

                    objRtn.QCFLOWM15 = rs01.getDouble("AMTFAVM_LY");
                    objRtn.QCPAXM15 = rs01.getDouble("PAXFAVM_LY");
                    objRtn.QCFLOWT15 = rs01.getDouble("AMTFAVT_LY");
                    objRtn.QCPAXT15 = rs01.getDouble("PAXFAVT_LY");
                    objRtn.QCFLOWW15 = rs01.getDouble("AMTFAVW_LY");
                    objRtn.QCPAXW15 = rs01.getDouble("PAXFAVW_LY");
                    objRtn.QCFLOWTH15 = rs01.getDouble("AMTFAVTH_LY");
                    objRtn.QCPAXTH15 = rs01.getDouble("PAXFAVTH_LY");
                    objRtn.QCFLOWF15 = rs01.getDouble("AMTFAVF_LY");
                    objRtn.QCPAXF15 = rs01.getDouble("PAXFAVF_LY");
                    objRtn.QCFLOWS15 = rs01.getDouble("AMTFAVS_LY");
                    objRtn.QCPAXS15 = rs01.getDouble("PAXFAVS_LY");
                    objRtn.QCFLOWSA15 = rs01.getDouble("AMTFAVSA_LY");
                    objRtn.QCPAXSA15 = rs01.getDouble("PAXFAVSA_LY");
                    //objRtn.QCPAXTT15 = objRtn.QCPAXM15 + objRtn.QCPAXT15 + objRtn.QCPAXW15 + objRtn.QCPAXTH15 + objRtn.QCPAXF15 + objRtn.QCPAXS15 + objRtn.QCPAXSA15;
                    //objRtn.QCFLOWTT15 = objRtn.QCFLOWM15 + objRtn.QCFLOWT15 + objRtn.QCFLOWW15 + objRtn.QCFLOWTH15 + objRtn.QCFLOWF15 + objRtn.QCFLOWS15 + objRtn.QCFLOWSA15;
                    objRtn.QCPAXTT15 = rs01.getDouble("TOTALPAX_LY");
                    objRtn.QCFLOWTT15 = rs01.getDouble("TOTALAMT_LY");
                    //TOTALES
                    objRtn.totQCFLOWM15 = AMTFAVM_LY;
                    objRtn.totQCPAXM15 = PAXFAVM_LY;
                    objRtn.totQCFLOWT15 = AMTFAVT_LY;
                    objRtn.totQCPAXT15 = PAXFAVT_LY;
                    objRtn.totQCFLOWW15 = AMTFAVW_LY;
                    objRtn.totQCPAXW15 = PAXFAVW_LY;
                    objRtn.totQCFLOWTH15 = AMTFAVTH_LY;
                    objRtn.totQCPAXTH15 = PAXFAVTH_LY;
                    objRtn.totQCFLOWF15 = AMTFAVF_LY;
                    objRtn.totQCPAXF15 = PAXFAVF_LY;
                    objRtn.totQCFLOWS15 = AMTFAVS_LY;
                    objRtn.totQCPAXS15 = PAXFAVS_LY;
                    objRtn.totQCFLOWSA15 = AMTFAVSA_LY;
                    objRtn.totQCPAXSA15 = PAXFAVSA_LY;

                    objRtn.totQCPAXTT15 = PAXFAVTT_LY;
                    objRtn.totQCFLOWTT15 = AMTFAVTT_LY;

                    //-------AÑO ANTERIOR FILTRO---------------
                    objRtn.QCFLOWM16 = rs01.getDouble("AMTFAVM");
                    objRtn.QCPAXM16 = rs01.getDouble("PAXFAVM");
                    objRtn.QCFLOWT16 = rs01.getDouble("AMTFAVT");
                    objRtn.QCPAXT16 = rs01.getDouble("PAXFAVT");
                    objRtn.QCFLOWW16 = rs01.getDouble("AMTFAVW");
                    objRtn.QCPAXW16 = rs01.getDouble("PAXFAVW");
                    objRtn.QCFLOWTH16 = rs01.getDouble("AMTFAVTH");
                    objRtn.QCPAXTH16 = rs01.getDouble("PAXFAVTH");
                    objRtn.QCFLOWF16 = rs01.getDouble("AMTFAVF");
                    objRtn.QCPAXF16 = rs01.getDouble("PAXFAVF");
                    objRtn.QCFLOWS16 = rs01.getDouble("AMTFAVS");
                    objRtn.QCPAXS16 = rs01.getDouble("PAXFAVS");
                    objRtn.QCFLOWSA16 = rs01.getDouble("AMTFAVSA");
                    objRtn.QCPAXSA16 = rs01.getDouble("PAXFAVSA");
                    //objRtn.QCPAXTT16 = objRtn.QCPAXM16 + objRtn.QCPAXT16 + objRtn.QCPAXW16 + objRtn.QCPAXTH16 + objRtn.QCPAXF16 + objRtn.QCPAXS16 + objRtn.QCPAXSA16;
                    //objRtn.QCFLOWTT16 = objRtn.QCFLOWM16 + objRtn.QCFLOWT16 + objRtn.QCFLOWW16 + objRtn.QCFLOWTH16 + objRtn.QCFLOWF16 + objRtn.QCFLOWS16 + objRtn.QCFLOWSA16;
                    objRtn.QCPAXTT16 = rs01.getDouble("TOTALPAX");
                    objRtn.QCFLOWTT16 = rs01.getDouble("TOTALAMT");
                    //TOTALES
                    objRtn.totQCFLOWM16 = AMTFAVM;
                    objRtn.totQCPAXM16 = PAXFAVM;
                    objRtn.totQCFLOWT16 = AMTFAVT;
                    objRtn.totQCPAXT16 = PAXFAVT;
                    objRtn.totQCFLOWW16 = AMTFAVW;
                    objRtn.totQCPAXW16 = PAXFAVW;
                    objRtn.totQCFLOWTH16 = AMTFAVTH;
                    objRtn.totQCPAXTH16 = PAXFAVTH;
                    objRtn.totQCFLOWF16 = AMTFAVF;
                    objRtn.totQCPAXF16 = PAXFAVF;
                    objRtn.totQCFLOWS16 = AMTFAVS;
                    objRtn.totQCPAXS16 = PAXFAVS;
                    objRtn.totQCFLOWSA16 = AMTFAVSA;
                    objRtn.totQCPAXSA16 = PAXFAVSA;

                    objRtn.totQCPAXTT16 = PAXFAVTT;
                    objRtn.totQCFLOWTT16 = AMTFAVTT;
                    //DIFERENCIA PAX
                    objRtn.diffQCPAXM = objRtn.QCPAXM16 - objRtn.QCPAXM15;
                    objRtn.diffQCPAXT = objRtn.QCPAXT16 - objRtn.QCPAXT15;
                    objRtn.diffQCPAXW = objRtn.QCPAXW16 - objRtn.QCPAXW15;
                    objRtn.diffQCPAXTH = objRtn.QCPAXTH16 - objRtn.QCPAXTH15;
                    objRtn.diffQCPAXF = objRtn.QCPAXF16 - objRtn.QCPAXF15;
                    objRtn.diffQCPAXS = objRtn.QCPAXS16 - objRtn.QCPAXS15;
                    objRtn.diffQCPAXSA = objRtn.QCPAXSA16 - objRtn.QCPAXSA15;
                    objRtn.diffQCPAXTT = objRtn.diffQCPAXM + objRtn.diffQCPAXT + objRtn.diffQCPAXW + objRtn.diffQCPAXTH + objRtn.diffQCPAXF + objRtn.diffQCPAXS + objRtn.diffQCPAXSA;

                    // TOTALES DIFERENCIA PAX
                    objRtn.difftotQCPAXM = objRtn.totQCPAXM16 - objRtn.totQCPAXM15;
                    objRtn.difftotQCPAXT = objRtn.totQCPAXT16 - objRtn.totQCPAXT15;
                    objRtn.difftotQCPAXW = objRtn.totQCPAXW16 - objRtn.totQCPAXW15;
                    objRtn.difftotQCPAXTH = objRtn.totQCPAXTH16 - objRtn.totQCPAXTH15;
                    objRtn.difftotQCPAXF = objRtn.totQCPAXF16 - objRtn.totQCPAXF15;
                    objRtn.difftotQCPAXS = objRtn.totQCPAXS16 - objRtn.totQCPAXS15;
                    objRtn.difftotQCPAXSA = objRtn.totQCPAXSA16 - objRtn.totQCPAXSA15;
                    objRtn.difftotQCPAXTT = objRtn.difftotQCPAXM + objRtn.difftotQCPAXT + objRtn.difftotQCPAXW + objRtn.difftotQCPAXTH + objRtn.difftotQCPAXF + objRtn.difftotQCPAXS + objRtn.difftotQCPAXSA;
                    //DIFERENCIA FLOWN
                    objRtn.diffQCFLOWM = objRtn.QCFLOWM16 - objRtn.QCFLOWM15;
                    objRtn.diffQCFLOWT = objRtn.QCFLOWT16 - objRtn.QCFLOWT15;
                    objRtn.diffQCFLOWW = objRtn.QCFLOWW16 - objRtn.QCFLOWW15;
                    objRtn.diffQCFLOWTH = objRtn.QCFLOWTH16 - objRtn.QCFLOWTH15;
                    objRtn.diffQCFLOWF = objRtn.QCFLOWF16 - objRtn.QCFLOWF15;
                    objRtn.diffQCFLOWS = objRtn.QCFLOWS16 - objRtn.QCFLOWS15;
                    objRtn.diffQCFLOWSA = objRtn.QCFLOWSA16 - objRtn.QCFLOWSA15;
                    objRtn.diffQCFLOWTT = objRtn.diffQCFLOWM + objRtn.diffQCFLOWT + objRtn.diffQCFLOWW + objRtn.diffQCFLOWTH + objRtn.diffQCFLOWF + objRtn.diffQCFLOWS + objRtn.diffQCFLOWSA;
                    // TOTALES DIFERENCIA FLOWN
                    objRtn.difftotQCFLOWM = objRtn.totQCFLOWM16 - objRtn.totQCFLOWM15;
                    objRtn.difftotQCFLOWT = objRtn.totQCFLOWT16 - objRtn.totQCFLOWT15;
                    objRtn.difftotQCFLOWW = objRtn.totQCFLOWW16 - objRtn.totQCFLOWW15;
                    objRtn.difftotQCFLOWTH = objRtn.totQCPAXTH16 - objRtn.totQCFLOWTH15;
                    objRtn.difftotQCFLOWF = objRtn.totQCFLOWF16 - objRtn.totQCFLOWF15;
                    objRtn.difftotQCFLOWS = objRtn.totQCFLOWS16 - objRtn.totQCFLOWS15;
                    objRtn.difftotQCFLOWSA = objRtn.totQCFLOWSA16 - objRtn.totQCFLOWSA15;
                    objRtn.difftotQCFLOWTT = objRtn.difftotQCFLOWM + objRtn.difftotQCFLOWT + objRtn.difftotQCFLOWW + objRtn.difftotQCFLOWTH + objRtn.difftotQCFLOWF + objRtn.difftotQCFLOWS + objRtn.difftotQCFLOWSA;
                    //AVG 2016
                    //objRtn.avgMONDAY16 = (objRtn.QCFLOWM16 > 0) ? (objRtn.QCPAXM16) / objRtn.QCFLOWM16 : 0.00;
                    //objRtn.avgTUESDAY16 = (objRtn.QCFLOWT16 > 0) ? (objRtn.QCPAXT16) / objRtn.QCFLOWT16 : 0.00;
                    //objRtn.avgWEDNESDAY16 = (objRtn.QCFLOWW16 > 0) ? (objRtn.QCPAXW16) / objRtn.QCFLOWW16 : 0.00;
                    //objRtn.avgTHURSDAY16 = (objRtn.QCFLOWTH16 > 0) ? (objRtn.QCPAXTH16) / objRtn.QCFLOWTH16 : 0.00;
                    //objRtn.avgFRIDAY16 = (objRtn.QCFLOWF16 > 0) ? (objRtn.QCPAXF16) / objRtn.QCFLOWF16 : 0.00;
                    //objRtn.avgSATURDAY16 = (objRtn.QCFLOWS16 > 0) ? (objRtn.QCPAXS16) / objRtn.QCFLOWS16 : 0.00;
                    //objRtn.avgSUNDAY16 = (objRtn.QCFLOWSA16 > 0) ? (objRtn.QCPAXSA16) / objRtn.QCFLOWSA16 : 0.00;
                    objRtn.avgMONDAY16 = rs01.getDouble("AVGM");
                    objRtn.avgTUESDAY16 = rs01.getDouble("AVGT");
                    objRtn.avgWEDNESDAY16 = rs01.getDouble("AVGW");
                    objRtn.avgTHURSDAY16 = rs01.getDouble("AVGTH");
                    objRtn.avgFRIDAY16 = rs01.getDouble("AVGF");
                    objRtn.avgSATURDAY16 = rs01.getDouble("AVGS");
                    objRtn.avgSUNDAY16 = rs01.getDouble("AVGSA");
                    objRtn.avgTOTAL16 = objRtn.avgMONDAY16 + objRtn.avgTUESDAY16 + objRtn.avgWEDNESDAY16 + objRtn.avgTHURSDAY16 + objRtn.avgFRIDAY16 + objRtn.avgSATURDAY16 + objRtn.avgSUNDAY16;

                    // TOTALES AVG 2016
                    objRtn.totavgMONDAY16 = totAVGM;
                    objRtn.totavgTUESDAY16 = totAVGT;
                    objRtn.totavgWEDNESDAY16 = totAVGW;
                    objRtn.totavgTHURSDAY16 = totAVGTH;
                    objRtn.totavgFRIDAY16 = totAVGF;
                    objRtn.totavgSATURDAY16 = totAVGS;
                    objRtn.totavgSUNDAY16 = totAVGSA;
                    objRtn.totavgTOTAL16 = totAVGTT;
                    //AVG 2015
                    //objRtn.avgMONDAY15 = (objRtn.QCFLOWM15 > 0) ? (objRtn.QCPAXM15) / objRtn.QCFLOWM15 : 0.00;
                    //objRtn.avgTUESDAY15 = (objRtn.QCFLOWT15 > 0) ? (objRtn.QCPAXT15) / objRtn.QCFLOWT15 : 0.00;
                    //objRtn.avgWEDNESDAY15 = (objRtn.QCFLOWW15 > 0) ? (objRtn.QCPAXW15) / objRtn.QCFLOWW15 : 0.00;
                    //objRtn.avgTHURSDAY15 = (objRtn.QCFLOWTH15 > 0) ? (objRtn.QCPAXTH15) / objRtn.QCFLOWTH15 : 0.00;
                    //objRtn.avgFRIDAY15 = (objRtn.QCFLOWF15 > 0) ? (objRtn.QCPAXF15) / objRtn.QCFLOWF15 : 0.00;
                    //objRtn.avgSATURDAY15 = (objRtn.QCFLOWS15 > 0) ? (objRtn.QCPAXS15) / objRtn.QCFLOWS15 : 0.00;
                    //objRtn.avgSUNDAY15 = (objRtn.QCFLOWSA15 > 0) ? (objRtn.QCPAXSA15) / objRtn.QCFLOWSA15 : 0.00;
                    objRtn.avgMONDAY15 = rs01.getDouble("AVGM_LY");
                    objRtn.avgTUESDAY15 = rs01.getDouble("AVGT_LY");
                    objRtn.avgWEDNESDAY15 = rs01.getDouble("AVGW_LY");
                    objRtn.avgTHURSDAY15 = rs01.getDouble("AVGTH_LY");
                    objRtn.avgFRIDAY15 = rs01.getDouble("AVGF_LY");
                    objRtn.avgSATURDAY15 = rs01.getDouble("AVGS_LY");
                    objRtn.avgSUNDAY15 = rs01.getDouble("AVGSA_LY");
                    objRtn.avgTOTAL15 = objRtn.avgMONDAY15 + objRtn.avgTUESDAY15 + objRtn.avgWEDNESDAY15 + objRtn.avgTHURSDAY15 + objRtn.avgFRIDAY15 + objRtn.avgSATURDAY15 + objRtn.avgSUNDAY15;

                    // TOTALES AVG 2015
                    objRtn.totavgMONDAY15 = totAVGM_LY;
                    objRtn.totavgTUESDAY15 = totAVGT_LY;
                    objRtn.totavgWEDNESDAY15 = totAVGW_LY;
                    objRtn.totavgTHURSDAY15 = totAVGTH_LY;
                    objRtn.totavgFRIDAY15 = totAVGF_LY;
                    objRtn.totavgSATURDAY15 = totAVGS_LY;
                    objRtn.totavgSUNDAY15 = totAVGSA_LY;
                    objRtn.totavgTOTAL15 = totAVGTT_LY;

                    //AVG DIFERENCIAS 
                    objRtn.diffavgMONDAY = objRtn.avgMONDAY16 - objRtn.avgMONDAY15;
                    objRtn.diffavgTUESDAY = objRtn.avgTUESDAY16 - objRtn.avgTUESDAY15;
                    objRtn.diffavgWEDNESDAY = objRtn.avgWEDNESDAY16 - objRtn.avgWEDNESDAY15;
                    objRtn.diffavgTHURSDAY = objRtn.avgTHURSDAY16 - objRtn.avgTHURSDAY15;
                    objRtn.diffavgFRIDAY = objRtn.avgFRIDAY16 - objRtn.avgFRIDAY15;
                    objRtn.diffavgSATURDAY = objRtn.avgSATURDAY16 - objRtn.avgSATURDAY15;
                    objRtn.diffavgSUNDAY = objRtn.avgSUNDAY16 - objRtn.avgSUNDAY15;
                    objRtn.diffavgTOTAL = objRtn.diffavgMONDAY + objRtn.diffavgTUESDAY + objRtn.diffavgWEDNESDAY + objRtn.diffavgTHURSDAY + objRtn.diffavgFRIDAY + objRtn.diffavgSATURDAY + objRtn.diffavgSUNDAY;
                    // TOTALES AVG DIFERENCIAS 
                    objRtn.totdiffavgMONDAY = objRtn.totavgMONDAY16 - objRtn.totavgMONDAY15;
                    objRtn.totdiffavgTUESDAY = objRtn.totavgTUESDAY16 - objRtn.totavgTUESDAY15;
                    objRtn.totdiffavgWEDNESDAY = objRtn.totavgWEDNESDAY16 - objRtn.totavgWEDNESDAY15;
                    objRtn.totdiffavgTHURSDAY = objRtn.totavgTHURSDAY16 - objRtn.totavgTHURSDAY15;
                    objRtn.totdiffavgFRIDAY = objRtn.totavgFRIDAY16 - objRtn.totavgFRIDAY15;
                    objRtn.totdiffavgSATURDAY = objRtn.totavgSATURDAY16 - objRtn.totavgSATURDAY15;
                    objRtn.totdiffavgSUNDAY = objRtn.totavgSUNDAY16 - objRtn.totavgSUNDAY15;
                    objRtn.totdiffavgTOTAL = objRtn.totdiffavgMONDAY + objRtn.totdiffavgTUESDAY + objRtn.totdiffavgWEDNESDAY + objRtn.totdiffavgTHURSDAY + objRtn.totdiffavgFRIDAY + objRtn.totdiffavgSATURDAY + objRtn.totdiffavgSUNDAY;

                    if (objRtn.diffavgMONDAY < 0) {
                        objRtn.strDescripcion1 = "rojo";
                    }
                    if (objRtn.diffavgTUESDAY < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }
                    if (objRtn.diffavgWEDNESDAY < 0) {
                        objRtn.strDescripcion3 = "rojo";
                    }
                    if (objRtn.diffavgTHURSDAY < 0) {
                        objRtn.strDescripcion4 = "rojo";
                    }
                    if (objRtn.diffavgFRIDAY < 0) {
                        objRtn.strDescripcion5 = "rojo";
                    }
                    if (objRtn.diffavgSATURDAY < 0) {
                        objRtn.strDescripcion6 = "rojo";
                    }
                    if (objRtn.diffavgSUNDAY < 0) {
                        objRtn.strDescripcion7 = "rojo";
                    }
                    if (objRtn.diffavgTOTAL < 0) {
                        objRtn.strDescripcion8 = "rojo";
                    }

                    if (objRtn.diffQCPAXM < 0) {
                        objRtn.strDescripcion1_1 = "rojo";
                    }
                    if (objRtn.diffQCPAXT < 0) {
                        objRtn.strDescripcion2_2 = "rojo";
                    }
                    if (objRtn.diffQCPAXW < 0) {
                        objRtn.strDescripcion3_3 = "rojo";
                    }
                    if (objRtn.diffQCPAXTH < 0) {
                        objRtn.strDescripcion4_4 = "rojo";
                    }
                    if (objRtn.diffQCPAXF < 0) {
                        objRtn.strDescripcion5_5 = "rojo";
                    }
                    if (objRtn.diffQCPAXS < 0) {
                        objRtn.strDescripcion6_6 = "rojo";
                    }
                    if (objRtn.diffQCPAXSA < 0) {
                        objRtn.strDescripcion7_7 = "rojo";
                    }
                    if (objRtn.diffQCPAXTT < 0) {
                        objRtn.strDescripcion10 = "rojo";
                    }

                    if (objRtn.diffQCFLOWM < 0) {
                        objRtn.strDescripcion11 = "rojo";
                    }
                    if (objRtn.diffQCFLOWT < 0) {
                        objRtn.strDescripcion22 = "rojo";
                    }
                    if (objRtn.diffQCFLOWW < 0) {
                        objRtn.strDescripcion33 = "rojo";
                    }
                    if (objRtn.diffQCFLOWTH < 0) {
                        objRtn.strDescripcion44 = "rojo";
                    }
                    if (objRtn.diffQCFLOWF < 0) {
                        objRtn.strDescripcion55 = "rojo";
                    }
                    if (objRtn.diffQCFLOWS < 0) {
                        objRtn.strDescripcion66 = "rojo";
                    }
                    if (objRtn.diffQCFLOWSA < 0) {
                        objRtn.strDescripcion77 = "rojo";
                    }
                    if (objRtn.diffQCFLOWTT < 0) {
                        objRtn.strDescripcion9 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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

    public List<A2826Filter> loadSQP01324(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;
        double PAXFAV = 0, PAXFAV_LY = 0, AMTFAV_LY = 0, AMTFAV = 0;
        double AMTVCPN = 0, AMTVCPN_LY = 0;

        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01324(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                PAXFAV = rs01.getDouble("PAXFAV");
                AMTFAV = rs01.getDouble("AMTFAV");
                PAXFAV_LY = rs01.getDouble("PAXFAV_LY");
                AMTFAV_LY = rs01.getDouble("AMTFAV_LY");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = rs01.getString("ZONA");
                    objRtn.ZONA = objRtn.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    //objRtn.strDescripcion = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";

                    //---------AÑO DEL FILTRO-------
                    // AÑO ACTUAL
                    objRtn.QCFLOW15 = rs01.getDouble("AMTFAV_LY");
                    objRtn.QCPAX15 = rs01.getDouble("PAXFAV_LY");

                    objRtn.totQCFLOW15 = AMTFAV_LY;
                    objRtn.totQCPAX15 = PAXFAV_LY;

                    objRtn.AVG15 = (objRtn.QCFLOW15 > 0) ? (objRtn.QCPAX15) / objRtn.QCFLOW15 : 0.00;
                    objRtn.totAVG15avg = (objRtn.totQCFLOW15 > 0) ? (objRtn.totQCPAX15) / objRtn.totQCFLOW15 : 0.00;

                    //-------AÑO ANTERIOR---------------
                    objRtn.QCFLOW16 = rs01.getDouble("AMTFAV");
                    objRtn.QCPAX16 = rs01.getDouble("PAXFAV");

                    objRtn.totQCFLOW16 = AMTFAV;
                    objRtn.totQCPAX16 = PAXFAV;

                    objRtn.AVG16 = (objRtn.QCFLOW16 > 0) ? (objRtn.QCPAX16) / objRtn.QCFLOW16 : 0.00;
                    objRtn.totAVG16avg = (objRtn.totQCFLOW16 > 0) ? (objRtn.totQCPAX16) / objRtn.totQCFLOW16 : 0.00;

                    //---------------DIFFERENCES ----------------------------- 
                    objRtn.diffQCFLOW = objRtn.QCFLOW16 - objRtn.QCFLOW15;
                    objRtn.diffQCPAX = objRtn.QCPAX16 - objRtn.QCPAX15;
                    objRtn.diffAVG = (objRtn.diffQCFLOW > 0) ? (objRtn.diffQCPAX) / objRtn.diffQCFLOW : 0.00;
                    objRtn.totDiffQCFLOW = objRtn.totQCFLOW16 - objRtn.totQCFLOW15;
                    objRtn.totDiffQCPAX = objRtn.totQCPAX16 - objRtn.totQCPAX15;
                    objRtn.totDiffAVG = (objRtn.totDiffQCFLOW > 0) ? (objRtn.totDiffQCPAX) / objRtn.totDiffQCFLOW : 0.00;

                    if (objRtn.diffQCFLOW < 0) {
                        objRtn.strDescripcion1 = "rojo";
                    }
                    if (objRtn.diffQCPAX < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }
                    if (objRtn.diffAVG < 0) {
                        objRtn.strDescripcion3 = "rojo";
                    }
                    if (objRtn.totDiffQCFLOW < 0) {
                        objRtn.strDescripcion4 = "rojo";
                    }
                    if (objRtn.totDiffQCPAX < 0) {
                        objRtn.strDescripcion5 = "rojo";
                    }
                    if (objRtn.totDiffAVG < 0) {
                        objRtn.strDescripcion6 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
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

    public List<A2826Filter> loadSQP01325(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;
        double PAXFAV = 0, PAXFAV_LY = 0, AMTFAV_LY = 0, AMTFAV = 0;
        double AMTVCPN = 0, AMTVCPN_LY = 0;

        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01325(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                PAXFAV = rs01.getDouble("PAXFAV");
                AMTFAV = rs01.getDouble("AMTFAV");
                PAXFAV_LY = rs01.getDouble("PAXFAV_LY");
                AMTFAV_LY = rs01.getDouble("AMTFAV_LY");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    //objRtn.ZONA= filter.ZONA;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.strDescripcion = filter.strDescripcion;

                    objRtn.CDEPART = rs01.getString("CDEPART") + " - " + rs01.getString("CARRIVA");
                    //  objRtn.CARRIVA = rs01.getString("CARRIVA");
                    objRtn.strCDEPART = rs01.getString("DESC_CDEPART") + " - " + rs01.getString("DESC_CARRIVA");
                    //objRtn.strCARRIVA = rs01.getString("DESC_CARRIVA");
                    objRtn.MDACP = "USD";
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");

                    //---------AÑO DEL FILTRO-------
                    // AÑO ACTUAL
                    objRtn.QCFLOW15 = rs01.getDouble("AMTFAV_LY");
                    objRtn.QCPAX15 = rs01.getDouble("PAXFAV_LY");

                    objRtn.totQCFLOW15 = AMTFAV_LY;
                    objRtn.totQCPAX15 = PAXFAV_LY;

                    objRtn.AVG15 = (objRtn.QCFLOW15 > 0) ? (objRtn.QCPAX15) / objRtn.QCFLOW15 : 0.00;
                    objRtn.totAVG15avg = (objRtn.totQCFLOW15 > 0) ? (objRtn.totQCPAX15) / objRtn.totQCFLOW15 : 0.00;

                    //-------AÑO ANTERIOR---------------
                    objRtn.QCFLOW16 = rs01.getDouble("AMTFAV");
                    objRtn.QCPAX16 = rs01.getDouble("PAXFAV");

                    objRtn.totQCFLOW16 = AMTFAV;
                    objRtn.totQCPAX16 = PAXFAV;

                    objRtn.AVG16 = (objRtn.QCFLOW16 > 0) ? (objRtn.QCPAX16) / objRtn.QCFLOW16 : 0.00;
                    objRtn.totAVG16avg = (objRtn.totQCFLOW16 > 0) ? (objRtn.totQCPAX16) / objRtn.totQCFLOW16 : 0.00;

                    //---------------DIFFERENCES ----------------------------- 
                    objRtn.diffQCFLOW = objRtn.QCFLOW16 - objRtn.QCFLOW15;
                    objRtn.diffQCPAX = objRtn.QCPAX16 - objRtn.QCPAX15;
                    objRtn.diffAVG = (objRtn.diffQCFLOW > 0) ? (objRtn.diffQCPAX) / objRtn.diffQCFLOW : 0.00;
                    objRtn.totDiffQCFLOW = objRtn.totQCFLOW16 - objRtn.totQCFLOW15;
                    objRtn.totDiffQCPAX = objRtn.totQCPAX16 - objRtn.totQCPAX15;
                    objRtn.totDiffAVG = (objRtn.totDiffQCFLOW > 0) ? (objRtn.totDiffQCPAX) / objRtn.totDiffQCFLOW : 0.00;

                    if (objRtn.diffQCFLOW < 0) {
                        objRtn.strDescripcion = "rojo";
                    }
                    if (objRtn.diffQCPAX < 0) {
                        objRtn.strDescripcion1 = "rojo";
                    }
                    if (objRtn.diffAVG < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }
                    if (objRtn.totDiffQCFLOW < 0) {
                        objRtn.strDescripcion3 = "rojo";
                    }
                    if (objRtn.totDiffQCPAX < 0) {
                        objRtn.strDescripcion4 = "rojo";
                    }
                    if (objRtn.totDiffAVG < 0) {
                        objRtn.strDescripcion5 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
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

    public List<A2826Filter> loadSQP01327(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;

        double AMTFAVM_LY = 0, AMTFAVT_LY = 0, AMTFAVW_LY = 0, AMTFAVTH_LY = 0, AMTFAVF_LY = 0, AMTFAVS_LY = 0, AMTFAVSA_LY = 0, AMTFAVTT_LY = 0;
        double PAXFAVM_LY = 0, PAXFAVT_LY = 0, PAXFAVW_LY = 0, PAXFAVTH_LY = 0, PAXFAVF_LY = 0, PAXFAVS_LY = 0, PAXFAVSA_LY = 0, PAXFAVTT_LY = 0;
        double AMTFAVM = 0, AMTFAVT = 0, AMTFAVW = 0, AMTFAVTH = 0, AMTFAVF = 0, AMTFAVS = 0, AMTFAVSA = 0, AMTFAVTT = 0;
        double PAXFAVM = 0, PAXFAVT = 0, PAXFAVW = 0, PAXFAVTH = 0, PAXFAVF = 0, PAXFAVS = 0, PAXFAVSA = 0, PAXFAVTT = 0;
        double totAVGM = 0, totAVGT = 0, totAVGW = 0, totAVGTH = 0, totAVGF = 0, totAVGS = 0, totAVGSA = 0, totAVGTT = 0;
        double totAVGM_LY = 0, totAVGT_LY = 0, totAVGW_LY = 0, totAVGTH_LY = 0, totAVGF_LY = 0, totAVGS_LY = 0, totAVGSA_LY = 0, totAVGTT_LY = 0;
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01327(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                AMTFAVM_LY = rs01.getDouble("AMTFAVM_LY");
                AMTFAVT_LY = rs01.getDouble("AMTFAVT_LY");
                AMTFAVW_LY = rs01.getDouble("AMTFAVW_LY");
                AMTFAVTH_LY = rs01.getDouble("AMTFAVTH_LY");
                AMTFAVF_LY = rs01.getDouble("AMTFAVF_LY");
                AMTFAVS_LY = rs01.getDouble("AMTFAVS_LY");
                AMTFAVSA_LY = rs01.getDouble("AMTFAVSA_LY");
                AMTFAVTT_LY = rs01.getDouble("TOTALAMT_LY");

                AMTFAVM = rs01.getDouble("AMTFAVM");
                AMTFAVT = rs01.getDouble("AMTFAVT");
                AMTFAVW = rs01.getDouble("AMTFAVW");
                AMTFAVTH = rs01.getDouble("AMTFAVTH");
                AMTFAVF = rs01.getDouble("AMTFAVF");
                AMTFAVS = rs01.getDouble("AMTFAVS");
                AMTFAVSA = rs01.getDouble("AMTFAVSA");
                AMTFAVTT = rs01.getDouble("TOTALAMT");

                PAXFAVM_LY = rs01.getDouble("PAXFAVM_LY");
                PAXFAVT_LY = rs01.getDouble("PAXFAVT_LY");
                PAXFAVW_LY = rs01.getDouble("PAXFAVW_LY");
                PAXFAVTH_LY = rs01.getDouble("PAXFAVTH_LY");
                PAXFAVF_LY = rs01.getDouble("PAXFAVF_LY");
                PAXFAVS_LY = rs01.getDouble("PAXFAVS_LY");
                PAXFAVSA_LY = rs01.getDouble("PAXFAVSA_LY");
                PAXFAVTT_LY = rs01.getDouble("TOTALPAX_LY");

                PAXFAVM = rs01.getDouble("PAXFAVM");
                PAXFAVT = rs01.getDouble("PAXFAVT");
                PAXFAVW = rs01.getDouble("PAXFAVW");
                PAXFAVTH = rs01.getDouble("PAXFAVTH");
                PAXFAVF = rs01.getDouble("PAXFAVF");
                PAXFAVS = rs01.getDouble("PAXFAVS");
                PAXFAVSA = rs01.getDouble("PAXFAVSA");
                PAXFAVTT = rs01.getDouble("TOTALPAX");

                totAVGM_LY = rs01.getDouble("AVGM_LY");
                totAVGT_LY = rs01.getDouble("AVGT_LY");
                totAVGW_LY = rs01.getDouble("AVGW_LY");
                totAVGTH_LY = rs01.getDouble("AVGTH_LY");
                totAVGF_LY = rs01.getDouble("AVGF_LY");
                totAVGS_LY = rs01.getDouble("AVGS_LY");
                totAVGSA_LY = rs01.getDouble("AVGSA_LY");
                totAVGTT_LY = totAVGM_LY + totAVGT_LY + totAVGW_LY + totAVGTH_LY + totAVGF_LY + totAVGS_LY + totAVGSA_LY;

                totAVGM = rs01.getDouble("AVGM");
                totAVGT = rs01.getDouble("AVGT");
                totAVGW = rs01.getDouble("AVGW");
                totAVGTH = rs01.getDouble("AVGTH");
                totAVGF = rs01.getDouble("AVGF");
                totAVGS = rs01.getDouble("AVGS");
                totAVGSA = rs01.getDouble("AVGSA");
                totAVGTT = totAVGM_LY + totAVGT_LY + totAVGW_LY + totAVGTH_LY + totAVGF_LY + totAVGS_LY + totAVGSA_LY;

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = rs01.getString("ZONA");
                    objRtn.ZONA = objRtn.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    //objRtn.strDescripcion = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";
                    //---------AÑO DEL ANTERIOR -------

                    objRtn.QCFLOWM15 = rs01.getDouble("AMTFAVM_LY");
                    objRtn.QCPAXM15 = rs01.getDouble("PAXFAVM_LY");
                    objRtn.QCFLOWT15 = rs01.getDouble("AMTFAVT_LY");
                    objRtn.QCPAXT15 = rs01.getDouble("PAXFAVT_LY");
                    objRtn.QCFLOWW15 = rs01.getDouble("AMTFAVW_LY");
                    objRtn.QCPAXW15 = rs01.getDouble("PAXFAVW_LY");
                    objRtn.QCFLOWTH15 = rs01.getDouble("AMTFAVTH_LY");
                    objRtn.QCPAXTH15 = rs01.getDouble("PAXFAVTH_LY");
                    objRtn.QCFLOWF15 = rs01.getDouble("AMTFAVF_LY");
                    objRtn.QCPAXF15 = rs01.getDouble("PAXFAVF_LY");
                    objRtn.QCFLOWS15 = rs01.getDouble("AMTFAVS_LY");
                    objRtn.QCPAXS15 = rs01.getDouble("PAXFAVS_LY");
                    objRtn.QCFLOWSA15 = rs01.getDouble("AMTFAVSA_LY");
                    objRtn.QCPAXSA15 = rs01.getDouble("PAXFAVSA_LY");
                    objRtn.QCPAXTT15 = rs01.getDouble("TOTALPAX_LY");
                    objRtn.QCFLOWTT15 = rs01.getDouble("TOTALAMT_LY");
                    //TOTALES
                    objRtn.totQCFLOWM15 = AMTFAVM_LY;
                    objRtn.totQCPAXM15 = PAXFAVM_LY;
                    objRtn.totQCFLOWT15 = AMTFAVT_LY;
                    objRtn.totQCPAXT15 = PAXFAVT_LY;
                    objRtn.totQCFLOWW15 = AMTFAVW_LY;
                    objRtn.totQCPAXW15 = PAXFAVW_LY;
                    objRtn.totQCFLOWTH15 = AMTFAVTH_LY;
                    objRtn.totQCPAXTH15 = PAXFAVTH_LY;
                    objRtn.totQCFLOWF15 = AMTFAVF_LY;
                    objRtn.totQCPAXF15 = PAXFAVF_LY;
                    objRtn.totQCFLOWS15 = AMTFAVS_LY;
                    objRtn.totQCPAXS15 = PAXFAVS_LY;
                    objRtn.totQCFLOWSA15 = AMTFAVSA_LY;
                    objRtn.totQCPAXSA15 = PAXFAVSA_LY;

                    objRtn.totQCPAXTT15 = PAXFAVTT_LY;
                    objRtn.totQCFLOWTT15 = AMTFAVTT_LY;

                    //-------AÑO ANTERIOR FILTRO---------------
                    objRtn.QCFLOWM16 = rs01.getDouble("AMTFAVM");
                    objRtn.QCPAXM16 = rs01.getDouble("PAXFAVM");
                    objRtn.QCFLOWT16 = rs01.getDouble("AMTFAVT");
                    objRtn.QCPAXT16 = rs01.getDouble("PAXFAVT");
                    objRtn.QCFLOWW16 = rs01.getDouble("AMTFAVW");
                    objRtn.QCPAXW16 = rs01.getDouble("PAXFAVW");
                    objRtn.QCFLOWTH16 = rs01.getDouble("AMTFAVTH");
                    objRtn.QCPAXTH16 = rs01.getDouble("PAXFAVTH");
                    objRtn.QCFLOWF16 = rs01.getDouble("AMTFAVF");
                    objRtn.QCPAXF16 = rs01.getDouble("PAXFAVF");
                    objRtn.QCFLOWS16 = rs01.getDouble("AMTFAVS");
                    objRtn.QCPAXS16 = rs01.getDouble("PAXFAVS");
                    objRtn.QCFLOWSA16 = rs01.getDouble("AMTFAVSA");
                    objRtn.QCPAXSA16 = rs01.getDouble("PAXFAVSA");
                    objRtn.QCPAXTT16 = rs01.getDouble("TOTALPAX");
                    objRtn.QCFLOWTT16 = rs01.getDouble("TOTALAMT");
                    //TOTALES
                    objRtn.totQCFLOWM16 = AMTFAVM;
                    objRtn.totQCPAXM16 = PAXFAVM;
                    objRtn.totQCFLOWT16 = AMTFAVT;
                    objRtn.totQCPAXT16 = PAXFAVT;
                    objRtn.totQCFLOWW16 = AMTFAVW;
                    objRtn.totQCPAXW16 = PAXFAVW;
                    objRtn.totQCFLOWTH16 = AMTFAVTH;
                    objRtn.totQCPAXTH16 = PAXFAVTH;
                    objRtn.totQCFLOWF16 = AMTFAVF;
                    objRtn.totQCPAXF16 = PAXFAVF;
                    objRtn.totQCFLOWS16 = AMTFAVS;
                    objRtn.totQCPAXS16 = PAXFAVS;
                    objRtn.totQCFLOWSA16 = AMTFAVSA;
                    objRtn.totQCPAXSA16 = PAXFAVSA;

                    objRtn.totQCPAXTT16 = PAXFAVTT;
                    objRtn.totQCFLOWTT16 = AMTFAVTT;
                    //DIFERENCIA PAX
                    objRtn.diffQCPAXM = objRtn.QCPAXM16 - objRtn.QCPAXM15;
                    objRtn.diffQCPAXT = objRtn.QCPAXT16 - objRtn.QCPAXT15;
                    objRtn.diffQCPAXW = objRtn.QCPAXW16 - objRtn.QCPAXW15;
                    objRtn.diffQCPAXTH = objRtn.QCPAXTH16 - objRtn.QCPAXTH15;
                    objRtn.diffQCPAXF = objRtn.QCPAXF16 - objRtn.QCPAXF15;
                    objRtn.diffQCPAXS = objRtn.QCPAXS16 - objRtn.QCPAXS15;
                    objRtn.diffQCPAXSA = objRtn.QCPAXSA16 - objRtn.QCPAXSA15;
                    objRtn.diffQCPAXTT = objRtn.diffQCPAXM + objRtn.diffQCPAXT + objRtn.diffQCPAXW + objRtn.diffQCPAXTH + objRtn.diffQCPAXF + objRtn.diffQCPAXS + objRtn.diffQCPAXSA;

                    // TOTALES DIFERENCIA PAX
                    objRtn.difftotQCPAXM = objRtn.totQCPAXM16 - objRtn.totQCPAXM15;
                    objRtn.difftotQCPAXT = objRtn.totQCPAXT16 - objRtn.totQCPAXT15;
                    objRtn.difftotQCPAXW = objRtn.totQCPAXW16 - objRtn.totQCPAXW15;
                    objRtn.difftotQCPAXTH = objRtn.totQCPAXTH16 - objRtn.totQCPAXTH15;
                    objRtn.difftotQCPAXF = objRtn.totQCPAXF16 - objRtn.totQCPAXF15;
                    objRtn.difftotQCPAXS = objRtn.totQCPAXS16 - objRtn.totQCPAXS15;
                    objRtn.difftotQCPAXSA = objRtn.totQCPAXSA16 - objRtn.totQCPAXSA15;
                    objRtn.difftotQCPAXTT = objRtn.difftotQCPAXM + objRtn.difftotQCPAXT + objRtn.difftotQCPAXW + objRtn.difftotQCPAXTH + objRtn.difftotQCPAXF + objRtn.difftotQCPAXS + objRtn.difftotQCPAXSA;
                    //DIFERENCIA FLOWN
                    objRtn.diffQCFLOWM = objRtn.QCFLOWM16 - objRtn.QCFLOWM15;
                    objRtn.diffQCFLOWT = objRtn.QCFLOWT16 - objRtn.QCFLOWT15;
                    objRtn.diffQCFLOWW = objRtn.QCFLOWW16 - objRtn.QCFLOWW15;
                    objRtn.diffQCFLOWTH = objRtn.QCFLOWTH16 - objRtn.QCFLOWTH15;
                    objRtn.diffQCFLOWF = objRtn.QCFLOWF16 - objRtn.QCFLOWF15;
                    objRtn.diffQCFLOWS = objRtn.QCFLOWS16 - objRtn.QCFLOWS15;
                    objRtn.diffQCFLOWSA = objRtn.QCFLOWSA16 - objRtn.QCFLOWSA15;
                    objRtn.diffQCFLOWTT = objRtn.diffQCFLOWM + objRtn.diffQCFLOWT + objRtn.diffQCFLOWW + objRtn.diffQCFLOWTH + objRtn.diffQCFLOWF + objRtn.diffQCFLOWS + objRtn.diffQCFLOWSA;
                    // TOTALES DIFERENCIA FLOWN
                    objRtn.difftotQCFLOWM = objRtn.totQCFLOWM16 - objRtn.totQCFLOWM15;
                    objRtn.difftotQCFLOWT = objRtn.totQCFLOWT16 - objRtn.totQCFLOWT15;
                    objRtn.difftotQCFLOWW = objRtn.totQCFLOWW16 - objRtn.totQCFLOWW15;
                    objRtn.difftotQCFLOWTH = objRtn.totQCFLOWTH16 - objRtn.totQCFLOWTH15;
                    objRtn.difftotQCFLOWF = objRtn.totQCFLOWF16 - objRtn.totQCFLOWF15;
                    objRtn.difftotQCFLOWS = objRtn.totQCFLOWS16 - objRtn.totQCFLOWS15;
                    objRtn.difftotQCFLOWSA = objRtn.totQCFLOWSA16 - objRtn.totQCFLOWSA15;
                    objRtn.difftotQCFLOWTT = objRtn.difftotQCFLOWM + objRtn.difftotQCFLOWT + objRtn.difftotQCFLOWW + objRtn.difftotQCFLOWTH + objRtn.difftotQCFLOWF + objRtn.difftotQCFLOWS + objRtn.difftotQCFLOWSA;
                    //AVG 2016
                    objRtn.avgMONDAY16 = rs01.getDouble("AVGM");
                    objRtn.avgTUESDAY16 = rs01.getDouble("AVGT");
                    objRtn.avgWEDNESDAY16 = rs01.getDouble("AVGW");
                    objRtn.avgTHURSDAY16 = rs01.getDouble("AVGTH");
                    objRtn.avgFRIDAY16 = rs01.getDouble("AVGF");
                    objRtn.avgSATURDAY16 = rs01.getDouble("AVGS");
                    objRtn.avgSUNDAY16 = rs01.getDouble("AVGSA");
                    objRtn.avgTOTAL16 = objRtn.avgMONDAY16 + objRtn.avgTUESDAY16 + objRtn.avgWEDNESDAY16 + objRtn.avgTHURSDAY16 + objRtn.avgFRIDAY16 + objRtn.avgSATURDAY16 + objRtn.avgSUNDAY16;

                    // TOTALES AVG 2016
                    objRtn.totavgMONDAY16 = totAVGM;
                    objRtn.totavgTUESDAY16 = totAVGT;
                    objRtn.totavgWEDNESDAY16 = totAVGW;
                    objRtn.totavgTHURSDAY16 = totAVGTH;
                    objRtn.totavgFRIDAY16 = totAVGF;
                    objRtn.totavgSATURDAY16 = totAVGS;
                    objRtn.totavgSUNDAY16 = totAVGSA;
                    objRtn.totavgTOTAL16 = totAVGTT;
                    //AVG 2015
                    objRtn.avgMONDAY15 = rs01.getDouble("AVGM_LY");
                    objRtn.avgTUESDAY15 = rs01.getDouble("AVGT_LY");
                    objRtn.avgWEDNESDAY15 = rs01.getDouble("AVGW_LY");
                    objRtn.avgTHURSDAY15 = rs01.getDouble("AVGTH_LY");
                    objRtn.avgFRIDAY15 = rs01.getDouble("AVGF_LY");
                    objRtn.avgSATURDAY15 = rs01.getDouble("AVGS_LY");
                    objRtn.avgSUNDAY15 = rs01.getDouble("AVGSA_LY");
                    objRtn.avgTOTAL15 = objRtn.avgMONDAY15 + objRtn.avgTUESDAY15 + objRtn.avgWEDNESDAY15 + objRtn.avgTHURSDAY15 + objRtn.avgFRIDAY15 + objRtn.avgSATURDAY15 + objRtn.avgSUNDAY15;

                    // TOTALES AVG 2015
                    objRtn.totavgMONDAY15 = totAVGM_LY;
                    objRtn.totavgTUESDAY15 = totAVGT_LY;
                    objRtn.totavgWEDNESDAY15 = totAVGW_LY;
                    objRtn.totavgTHURSDAY15 = totAVGTH_LY;
                    objRtn.totavgFRIDAY15 = totAVGF_LY;
                    objRtn.totavgSATURDAY15 = totAVGS_LY;
                    objRtn.totavgSUNDAY15 = totAVGSA_LY;
                    objRtn.totavgTOTAL15 = totAVGTT_LY;

                    //AVG DIFERENCIAS 
                    objRtn.diffavgMONDAY = objRtn.avgMONDAY16 - objRtn.avgMONDAY15;
                    objRtn.diffavgTUESDAY = objRtn.avgTUESDAY16 - objRtn.avgTUESDAY15;
                    objRtn.diffavgWEDNESDAY = objRtn.avgWEDNESDAY16 - objRtn.avgWEDNESDAY15;
                    objRtn.diffavgTHURSDAY = objRtn.avgTHURSDAY16 - objRtn.avgTHURSDAY15;
                    objRtn.diffavgFRIDAY = objRtn.avgFRIDAY16 - objRtn.avgFRIDAY15;
                    objRtn.diffavgSATURDAY = objRtn.avgSATURDAY16 - objRtn.avgSATURDAY15;
                    objRtn.diffavgSUNDAY = objRtn.avgSUNDAY16 - objRtn.avgSUNDAY15;
                    objRtn.diffavgTOTAL = objRtn.diffavgMONDAY + objRtn.diffavgTUESDAY + objRtn.diffavgWEDNESDAY + objRtn.diffavgTHURSDAY + objRtn.diffavgFRIDAY + objRtn.diffavgSATURDAY + objRtn.diffavgSUNDAY;
                    // TOTALES AVG DIFERENCIAS 
                    objRtn.totdiffavgMONDAY = objRtn.totavgMONDAY16 - objRtn.totavgMONDAY15;
                    objRtn.totdiffavgTUESDAY = objRtn.totavgTUESDAY16 - objRtn.totavgTUESDAY15;
                    objRtn.totdiffavgWEDNESDAY = objRtn.totavgWEDNESDAY16 - objRtn.totavgWEDNESDAY15;
                    objRtn.totdiffavgTHURSDAY = objRtn.totavgTHURSDAY16 - objRtn.totavgTHURSDAY15;
                    objRtn.totdiffavgFRIDAY = objRtn.totavgFRIDAY16 - objRtn.totavgFRIDAY15;
                    objRtn.totdiffavgSATURDAY = objRtn.totavgSATURDAY16 - objRtn.totavgSATURDAY15;
                    objRtn.totdiffavgSUNDAY = objRtn.totavgSUNDAY16 - objRtn.totavgSUNDAY15;
                    objRtn.totdiffavgTOTAL = objRtn.totdiffavgMONDAY + objRtn.totdiffavgTUESDAY + objRtn.totdiffavgWEDNESDAY + objRtn.totdiffavgTHURSDAY + objRtn.totdiffavgFRIDAY + objRtn.totdiffavgSATURDAY + objRtn.totdiffavgSUNDAY;

                    if (objRtn.diffavgMONDAY < 0) {
                        objRtn.strDescripcion1 = "rojo";
                    }
                    if (objRtn.diffavgTUESDAY < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }
                    if (objRtn.diffavgWEDNESDAY < 0) {
                        objRtn.strDescripcion3 = "rojo";
                    }
                    if (objRtn.diffavgTHURSDAY < 0) {
                        objRtn.strDescripcion4 = "rojo";
                    }
                    if (objRtn.diffavgFRIDAY < 0) {
                        objRtn.strDescripcion5 = "rojo";
                    }
                    if (objRtn.diffavgSATURDAY < 0) {
                        objRtn.strDescripcion6 = "rojo";
                    }
                    if (objRtn.diffavgSUNDAY < 0) {
                        objRtn.strDescripcion7 = "rojo";
                    }
                    if (objRtn.diffavgTOTAL < 0) {
                        objRtn.strDescripcion8 = "rojo";
                    }

                    if (objRtn.diffQCPAXM < 0) {
                        objRtn.strDescripcion1_1 = "rojo";
                    }
                    if (objRtn.diffQCPAXT < 0) {
                        objRtn.strDescripcion2_2 = "rojo";
                    }
                    if (objRtn.diffQCPAXW < 0) {
                        objRtn.strDescripcion3_3 = "rojo";
                    }
                    if (objRtn.diffQCPAXTH < 0) {
                        objRtn.strDescripcion4_4 = "rojo";
                    }
                    if (objRtn.diffQCPAXF < 0) {
                        objRtn.strDescripcion5_5 = "rojo";
                    }
                    if (objRtn.diffQCPAXS < 0) {
                        objRtn.strDescripcion6_6 = "rojo";
                    }
                    if (objRtn.diffQCPAXSA < 0) {
                        objRtn.strDescripcion7_7 = "rojo";
                    }
                    if (objRtn.diffQCPAXTT < 0) {
                        objRtn.strDescripcion10 = "rojo";
                    }

                    if (objRtn.diffQCFLOWM < 0) {
                        objRtn.strDescripcion11 = "rojo";
                    }
                    if (objRtn.diffQCFLOWT < 0) {
                        objRtn.strDescripcion22 = "rojo";
                    }
                    if (objRtn.diffQCFLOWW < 0) {
                        objRtn.strDescripcion33 = "rojo";
                    }
                    if (objRtn.diffQCFLOWTH < 0) {
                        objRtn.strDescripcion44 = "rojo";
                    }
                    if (objRtn.diffQCFLOWF < 0) {
                        objRtn.strDescripcion55 = "rojo";
                    }
                    if (objRtn.diffQCFLOWS < 0) {
                        objRtn.strDescripcion66 = "rojo";
                    }
                    if (objRtn.diffQCFLOWSA < 0) {
                        objRtn.strDescripcion77 = "rojo";
                    }
                    if (objRtn.diffQCFLOWTT < 0) {
                        objRtn.strDescripcion9 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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

    public List<A2826Filter> loadSQP01328(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;

        double AMTFAVM_LY = 0, AMTFAVT_LY = 0, AMTFAVW_LY = 0, AMTFAVTH_LY = 0, AMTFAVF_LY = 0, AMTFAVS_LY = 0, AMTFAVSA_LY = 0, AMTFAVTT_LY = 0;
        double PAXFAVM_LY = 0, PAXFAVT_LY = 0, PAXFAVW_LY = 0, PAXFAVTH_LY = 0, PAXFAVF_LY = 0, PAXFAVS_LY = 0, PAXFAVSA_LY = 0, PAXFAVTT_LY = 0;
        double AMTFAVM = 0, AMTFAVT = 0, AMTFAVW = 0, AMTFAVTH = 0, AMTFAVF = 0, AMTFAVS = 0, AMTFAVSA = 0, AMTFAVTT = 0;
        double PAXFAVM = 0, PAXFAVT = 0, PAXFAVW = 0, PAXFAVTH = 0, PAXFAVF = 0, PAXFAVS = 0, PAXFAVSA = 0, PAXFAVTT = 0;
        double totAVGM = 0, totAVGT = 0, totAVGW = 0, totAVGTH = 0, totAVGF = 0, totAVGS = 0, totAVGSA = 0, totAVGTT = 0;
        double totAVGM_LY = 0, totAVGT_LY = 0, totAVGW_LY = 0, totAVGTH_LY = 0, totAVGF_LY = 0, totAVGS_LY = 0, totAVGSA_LY = 0, totAVGTT_LY = 0;
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01328_1(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                AMTFAVM_LY = rs01.getDouble("AMTFAVM_LY");
                AMTFAVT_LY = rs01.getDouble("AMTFAVT_LY");
                AMTFAVW_LY = rs01.getDouble("AMTFAVW_LY");
                AMTFAVTH_LY = rs01.getDouble("AMTFAVTH_LY");
                AMTFAVF_LY = rs01.getDouble("AMTFAVF_LY");
                AMTFAVS_LY = rs01.getDouble("AMTFAVS_LY");
                AMTFAVSA_LY = rs01.getDouble("AMTFAVSA_LY");
                AMTFAVTT_LY = rs01.getDouble("TOTALAMT_LY");

                AMTFAVM = rs01.getDouble("AMTFAVM");
                AMTFAVT = rs01.getDouble("AMTFAVT");
                AMTFAVW = rs01.getDouble("AMTFAVW");
                AMTFAVTH = rs01.getDouble("AMTFAVTH");
                AMTFAVF = rs01.getDouble("AMTFAVF");
                AMTFAVS = rs01.getDouble("AMTFAVS");
                AMTFAVSA = rs01.getDouble("AMTFAVSA");
                AMTFAVTT = rs01.getDouble("TOTALAMT");

                PAXFAVM_LY = rs01.getDouble("PAXFAVM_LY");
                PAXFAVT_LY = rs01.getDouble("PAXFAVT_LY");
                PAXFAVW_LY = rs01.getDouble("PAXFAVW_LY");
                PAXFAVTH_LY = rs01.getDouble("PAXFAVTH_LY");
                PAXFAVF_LY = rs01.getDouble("PAXFAVF_LY");
                PAXFAVS_LY = rs01.getDouble("PAXFAVS_LY");
                PAXFAVSA_LY = rs01.getDouble("PAXFAVSA_LY");
                PAXFAVTT_LY = rs01.getDouble("TOTALPAX_LY");

                PAXFAVM = rs01.getDouble("PAXFAVM");
                PAXFAVT = rs01.getDouble("PAXFAVT");
                PAXFAVW = rs01.getDouble("PAXFAVW");
                PAXFAVTH = rs01.getDouble("PAXFAVTH");
                PAXFAVF = rs01.getDouble("PAXFAVF");
                PAXFAVS = rs01.getDouble("PAXFAVS");
                PAXFAVSA = rs01.getDouble("PAXFAVSA");
                PAXFAVTT = rs01.getDouble("TOTALPAX");

                totAVGM_LY = rs01.getDouble("AVGM_LY");
                totAVGT_LY = rs01.getDouble("AVGT_LY");
                totAVGW_LY = rs01.getDouble("AVGW_LY");
                totAVGTH_LY = rs01.getDouble("AVGTH_LY");
                totAVGF_LY = rs01.getDouble("AVGF_LY");
                totAVGS_LY = rs01.getDouble("AVGS_LY");
                totAVGSA_LY = rs01.getDouble("AVGSA_LY");
                totAVGTT_LY = totAVGM_LY + totAVGT_LY + totAVGW_LY + totAVGTH_LY + totAVGF_LY + totAVGS_LY + totAVGSA_LY;

                totAVGM = rs01.getDouble("AVGM");
                totAVGT = rs01.getDouble("AVGT");
                totAVGW = rs01.getDouble("AVGW");
                totAVGTH = rs01.getDouble("AVGTH");
                totAVGF = rs01.getDouble("AVGF");
                totAVGS = rs01.getDouble("AVGS");
                totAVGSA = rs01.getDouble("AVGSA");
                totAVGTT = totAVGM_LY + totAVGT_LY + totAVGW_LY + totAVGTH_LY + totAVGF_LY + totAVGS_LY + totAVGSA_LY;

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.strDescripcion = filter.strDescripcion;

                    objRtn.CDEPART = rs01.getString("CDEPART") + " - " + rs01.getString("CARRIVA");
                    //  objRtn.CARRIVA = rs01.getString("CARRIVA");
                    objRtn.strCDEPART = rs01.getString("DESC_CDEPART") + " - " + rs01.getString("DESC_CARRIVA");
                    //objRtn.strCARRIVA = rs01.getString("DESC_CARRIVA");
                    objRtn.MDACP = "USD";
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    //---------AÑO DEL ANTERIOR -------

                    objRtn.QCFLOWM15 = rs01.getDouble("AMTFAVM_LY");
                    objRtn.QCPAXM15 = rs01.getDouble("PAXFAVM_LY");
                    objRtn.QCFLOWT15 = rs01.getDouble("AMTFAVT_LY");
                    objRtn.QCPAXT15 = rs01.getDouble("PAXFAVT_LY");
                    objRtn.QCFLOWW15 = rs01.getDouble("AMTFAVW_LY");
                    objRtn.QCPAXW15 = rs01.getDouble("PAXFAVW_LY");
                    objRtn.QCFLOWTH15 = rs01.getDouble("AMTFAVTH_LY");
                    objRtn.QCPAXTH15 = rs01.getDouble("PAXFAVTH_LY");
                    objRtn.QCFLOWF15 = rs01.getDouble("AMTFAVF_LY");
                    objRtn.QCPAXF15 = rs01.getDouble("PAXFAVF_LY");
                    objRtn.QCFLOWS15 = rs01.getDouble("AMTFAVS_LY");
                    objRtn.QCPAXS15 = rs01.getDouble("PAXFAVS_LY");
                    objRtn.QCFLOWSA15 = rs01.getDouble("AMTFAVSA_LY");
                    objRtn.QCPAXSA15 = rs01.getDouble("PAXFAVSA_LY");
                    objRtn.QCPAXTT15 = rs01.getDouble("TOTALPAX_LY");
                    objRtn.QCFLOWTT15 = rs01.getDouble("TOTALAMT_LY");
                    //TOTALES
                    objRtn.totQCFLOWM15 = AMTFAVM_LY;
                    objRtn.totQCPAXM15 = PAXFAVM_LY;
                    objRtn.totQCFLOWT15 = AMTFAVT_LY;
                    objRtn.totQCPAXT15 = PAXFAVT_LY;
                    objRtn.totQCFLOWW15 = AMTFAVW_LY;
                    objRtn.totQCPAXW15 = PAXFAVW_LY;
                    objRtn.totQCFLOWTH15 = AMTFAVTH_LY;
                    objRtn.totQCPAXTH15 = PAXFAVTH_LY;
                    objRtn.totQCFLOWF15 = AMTFAVF_LY;
                    objRtn.totQCPAXF15 = PAXFAVF_LY;
                    objRtn.totQCFLOWS15 = AMTFAVS_LY;
                    objRtn.totQCPAXS15 = PAXFAVS_LY;
                    objRtn.totQCFLOWSA15 = AMTFAVSA_LY;
                    objRtn.totQCPAXSA15 = PAXFAVSA_LY;

                    objRtn.totQCPAXTT15 = PAXFAVTT_LY;
                    objRtn.totQCFLOWTT15 = AMTFAVTT_LY;

                    //-------AÑO ANTERIOR FILTRO---------------
                    objRtn.QCFLOWM16 = rs01.getDouble("AMTFAVM");
                    objRtn.QCPAXM16 = rs01.getDouble("PAXFAVM");
                    objRtn.QCFLOWT16 = rs01.getDouble("AMTFAVT");
                    objRtn.QCPAXT16 = rs01.getDouble("PAXFAVT");
                    objRtn.QCFLOWW16 = rs01.getDouble("AMTFAVW");
                    objRtn.QCPAXW16 = rs01.getDouble("PAXFAVW");
                    objRtn.QCFLOWTH16 = rs01.getDouble("AMTFAVTH");
                    objRtn.QCPAXTH16 = rs01.getDouble("PAXFAVTH");
                    objRtn.QCFLOWF16 = rs01.getDouble("AMTFAVF");
                    objRtn.QCPAXF16 = rs01.getDouble("PAXFAVF");
                    objRtn.QCFLOWS16 = rs01.getDouble("AMTFAVS");
                    objRtn.QCPAXS16 = rs01.getDouble("PAXFAVS");
                    objRtn.QCFLOWSA16 = rs01.getDouble("AMTFAVSA");
                    objRtn.QCPAXSA16 = rs01.getDouble("PAXFAVSA");
                    objRtn.QCPAXTT16 = rs01.getDouble("TOTALPAX");
                    objRtn.QCFLOWTT16 = rs01.getDouble("TOTALAMT");
                    //TOTALES
                    objRtn.totQCFLOWM16 = AMTFAVM;
                    objRtn.totQCPAXM16 = PAXFAVM;
                    objRtn.totQCFLOWT16 = AMTFAVT;
                    objRtn.totQCPAXT16 = PAXFAVT;
                    objRtn.totQCFLOWW16 = AMTFAVW;
                    objRtn.totQCPAXW16 = PAXFAVW;
                    objRtn.totQCFLOWTH16 = AMTFAVTH;
                    objRtn.totQCPAXTH16 = PAXFAVTH;
                    objRtn.totQCFLOWF16 = AMTFAVF;
                    objRtn.totQCPAXF16 = PAXFAVF;
                    objRtn.totQCFLOWS16 = AMTFAVS;
                    objRtn.totQCPAXS16 = PAXFAVS;
                    objRtn.totQCFLOWSA16 = AMTFAVSA;
                    objRtn.totQCPAXSA16 = PAXFAVSA;

                    objRtn.totQCPAXTT16 = PAXFAVTT;
                    objRtn.totQCFLOWTT16 = AMTFAVTT;
                    //DIFERENCIA PAX
                    objRtn.diffQCPAXM = objRtn.QCPAXM16 - objRtn.QCPAXM15;
                    objRtn.diffQCPAXT = objRtn.QCPAXT16 - objRtn.QCPAXT15;
                    objRtn.diffQCPAXW = objRtn.QCPAXW16 - objRtn.QCPAXW15;
                    objRtn.diffQCPAXTH = objRtn.QCPAXTH16 - objRtn.QCPAXTH15;
                    objRtn.diffQCPAXF = objRtn.QCPAXF16 - objRtn.QCPAXF15;
                    objRtn.diffQCPAXS = objRtn.QCPAXS16 - objRtn.QCPAXS15;
                    objRtn.diffQCPAXSA = objRtn.QCPAXSA16 - objRtn.QCPAXSA15;
                    objRtn.diffQCPAXTT = objRtn.diffQCPAXM + objRtn.diffQCPAXT + objRtn.diffQCPAXW + objRtn.diffQCPAXTH + objRtn.diffQCPAXF + objRtn.diffQCPAXS + objRtn.diffQCPAXSA;

                    // TOTALES DIFERENCIA PAX
                    objRtn.difftotQCPAXM = objRtn.totQCPAXM16 - objRtn.totQCPAXM15;
                    objRtn.difftotQCPAXT = objRtn.totQCPAXT16 - objRtn.totQCPAXT15;
                    objRtn.difftotQCPAXW = objRtn.totQCPAXW16 - objRtn.totQCPAXW15;
                    objRtn.difftotQCPAXTH = objRtn.totQCPAXTH16 - objRtn.totQCPAXTH15;
                    objRtn.difftotQCPAXF = objRtn.totQCPAXF16 - objRtn.totQCPAXF15;
                    objRtn.difftotQCPAXS = objRtn.totQCPAXS16 - objRtn.totQCPAXS15;
                    objRtn.difftotQCPAXSA = objRtn.totQCPAXSA16 - objRtn.totQCPAXSA15;
                    objRtn.difftotQCPAXTT = objRtn.difftotQCPAXM + objRtn.difftotQCPAXT + objRtn.difftotQCPAXW + objRtn.difftotQCPAXTH + objRtn.difftotQCPAXF + objRtn.difftotQCPAXS + objRtn.difftotQCPAXSA;
                    //DIFERENCIA FLOWN
                    objRtn.diffQCFLOWM = objRtn.QCFLOWM16 - objRtn.QCFLOWM15;
                    objRtn.diffQCFLOWT = objRtn.QCFLOWT16 - objRtn.QCFLOWT15;
                    objRtn.diffQCFLOWW = objRtn.QCFLOWW16 - objRtn.QCFLOWW15;
                    objRtn.diffQCFLOWTH = objRtn.QCFLOWTH16 - objRtn.QCFLOWTH15;
                    objRtn.diffQCFLOWF = objRtn.QCFLOWF16 - objRtn.QCFLOWF15;
                    objRtn.diffQCFLOWS = objRtn.QCFLOWS16 - objRtn.QCFLOWS15;
                    objRtn.diffQCFLOWSA = objRtn.QCFLOWSA16 - objRtn.QCFLOWSA15;
                    objRtn.diffQCFLOWTT = objRtn.diffQCFLOWM + objRtn.diffQCFLOWT + objRtn.diffQCFLOWW + objRtn.diffQCFLOWTH + objRtn.diffQCFLOWF + objRtn.diffQCFLOWS + objRtn.diffQCFLOWSA;
                    // TOTALES DIFERENCIA FLOWN
                    objRtn.difftotQCFLOWM = objRtn.totQCFLOWM16 - objRtn.totQCFLOWM15;
                    objRtn.difftotQCFLOWT = objRtn.totQCFLOWT16 - objRtn.totQCFLOWT15;
                    objRtn.difftotQCFLOWW = objRtn.totQCFLOWW16 - objRtn.totQCFLOWW15;
                    objRtn.difftotQCFLOWTH = objRtn.totQCFLOWTH16 - objRtn.totQCFLOWTH15;
                    objRtn.difftotQCFLOWF = objRtn.totQCFLOWF16 - objRtn.totQCFLOWF15;
                    objRtn.difftotQCFLOWS = objRtn.totQCFLOWS16 - objRtn.totQCFLOWS15;
                    objRtn.difftotQCFLOWSA = objRtn.totQCFLOWSA16 - objRtn.totQCFLOWSA15;
                    objRtn.difftotQCFLOWTT = objRtn.difftotQCFLOWM + objRtn.difftotQCFLOWT + objRtn.difftotQCFLOWW + objRtn.difftotQCFLOWTH + objRtn.difftotQCFLOWF + objRtn.difftotQCFLOWS + objRtn.difftotQCFLOWSA;
                    //AVG 2016
                    objRtn.avgMONDAY16 = rs01.getDouble("AVGM");
                    objRtn.avgTUESDAY16 = rs01.getDouble("AVGT");
                    objRtn.avgWEDNESDAY16 = rs01.getDouble("AVGW");
                    objRtn.avgTHURSDAY16 = rs01.getDouble("AVGTH");
                    objRtn.avgFRIDAY16 = rs01.getDouble("AVGF");
                    objRtn.avgSATURDAY16 = rs01.getDouble("AVGS");
                    objRtn.avgSUNDAY16 = rs01.getDouble("AVGSA");
                    objRtn.avgTOTAL16 = objRtn.avgMONDAY16 + objRtn.avgTUESDAY16 + objRtn.avgWEDNESDAY16 + objRtn.avgTHURSDAY16 + objRtn.avgFRIDAY16 + objRtn.avgSATURDAY16 + objRtn.avgSUNDAY16;

                    // TOTALES AVG 2016
                    objRtn.totavgMONDAY16 = totAVGM;
                    objRtn.totavgTUESDAY16 = totAVGT;
                    objRtn.totavgWEDNESDAY16 = totAVGW;
                    objRtn.totavgTHURSDAY16 = totAVGTH;
                    objRtn.totavgFRIDAY16 = totAVGF;
                    objRtn.totavgSATURDAY16 = totAVGS;
                    objRtn.totavgSUNDAY16 = totAVGSA;
                    objRtn.totavgTOTAL16 = totAVGTT;
                    //AVG 2015
                    objRtn.avgMONDAY15 = rs01.getDouble("AVGM_LY");
                    objRtn.avgTUESDAY15 = rs01.getDouble("AVGT_LY");
                    objRtn.avgWEDNESDAY15 = rs01.getDouble("AVGW_LY");
                    objRtn.avgTHURSDAY15 = rs01.getDouble("AVGTH_LY");
                    objRtn.avgFRIDAY15 = rs01.getDouble("AVGF_LY");
                    objRtn.avgSATURDAY15 = rs01.getDouble("AVGS_LY");
                    objRtn.avgSUNDAY15 = rs01.getDouble("AVGSA_LY");
                    objRtn.avgTOTAL15 = objRtn.avgMONDAY15 + objRtn.avgTUESDAY15 + objRtn.avgWEDNESDAY15 + objRtn.avgTHURSDAY15 + objRtn.avgFRIDAY15 + objRtn.avgSATURDAY15 + objRtn.avgSUNDAY15;

                    // TOTALES AVG 2015
                    objRtn.totavgMONDAY15 = totAVGM_LY;
                    objRtn.totavgTUESDAY15 = totAVGT_LY;
                    objRtn.totavgWEDNESDAY15 = totAVGW_LY;
                    objRtn.totavgTHURSDAY15 = totAVGTH_LY;
                    objRtn.totavgFRIDAY15 = totAVGF_LY;
                    objRtn.totavgSATURDAY15 = totAVGS_LY;
                    objRtn.totavgSUNDAY15 = totAVGSA_LY;
                    objRtn.totavgTOTAL15 = totAVGTT_LY;

                    //AVG DIFERENCIAS 
                    objRtn.diffavgMONDAY = objRtn.avgMONDAY16 - objRtn.avgMONDAY15;
                    objRtn.diffavgTUESDAY = objRtn.avgTUESDAY16 - objRtn.avgTUESDAY15;
                    objRtn.diffavgWEDNESDAY = objRtn.avgWEDNESDAY16 - objRtn.avgWEDNESDAY15;
                    objRtn.diffavgTHURSDAY = objRtn.avgTHURSDAY16 - objRtn.avgTHURSDAY15;
                    objRtn.diffavgFRIDAY = objRtn.avgFRIDAY16 - objRtn.avgFRIDAY15;
                    objRtn.diffavgSATURDAY = objRtn.avgSATURDAY16 - objRtn.avgSATURDAY15;
                    objRtn.diffavgSUNDAY = objRtn.avgSUNDAY16 - objRtn.avgSUNDAY15;
                    objRtn.diffavgTOTAL = objRtn.diffavgMONDAY + objRtn.diffavgTUESDAY + objRtn.diffavgWEDNESDAY + objRtn.diffavgTHURSDAY + objRtn.diffavgFRIDAY + objRtn.diffavgSATURDAY + objRtn.diffavgSUNDAY;
                    // TOTALES AVG DIFERENCIAS 
                    objRtn.totdiffavgMONDAY = objRtn.totavgMONDAY16 - objRtn.totavgMONDAY15;
                    objRtn.totdiffavgTUESDAY = objRtn.totavgTUESDAY16 - objRtn.totavgTUESDAY15;
                    objRtn.totdiffavgWEDNESDAY = objRtn.totavgWEDNESDAY16 - objRtn.totavgWEDNESDAY15;
                    objRtn.totdiffavgTHURSDAY = objRtn.totavgTHURSDAY16 - objRtn.totavgTHURSDAY15;
                    objRtn.totdiffavgFRIDAY = objRtn.totavgFRIDAY16 - objRtn.totavgFRIDAY15;
                    objRtn.totdiffavgSATURDAY = objRtn.totavgSATURDAY16 - objRtn.totavgSATURDAY15;
                    objRtn.totdiffavgSUNDAY = objRtn.totavgSUNDAY16 - objRtn.totavgSUNDAY15;
                    objRtn.totdiffavgTOTAL = objRtn.totdiffavgMONDAY + objRtn.totdiffavgTUESDAY + objRtn.totdiffavgWEDNESDAY + objRtn.totdiffavgTHURSDAY + objRtn.totdiffavgFRIDAY + objRtn.totdiffavgSATURDAY + objRtn.totdiffavgSUNDAY;

                    if (objRtn.diffavgMONDAY < 0) {
                        objRtn.strDescripcion1 = "rojo";
                    }
                    if (objRtn.diffavgTUESDAY < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }
                    if (objRtn.diffavgWEDNESDAY < 0) {
                        objRtn.strDescripcion3 = "rojo";
                    }
                    if (objRtn.diffavgTHURSDAY < 0) {
                        objRtn.strDescripcion4 = "rojo";
                    }
                    if (objRtn.diffavgFRIDAY < 0) {
                        objRtn.strDescripcion5 = "rojo";
                    }
                    if (objRtn.diffavgSATURDAY < 0) {
                        objRtn.strDescripcion6 = "rojo";
                    }
                    if (objRtn.diffavgSUNDAY < 0) {
                        objRtn.strDescripcion7 = "rojo";
                    }
                    if (objRtn.diffavgTOTAL < 0) {
                        objRtn.strDescripcion8 = "rojo";
                    }

                    if (objRtn.diffQCPAXM < 0) {
                        objRtn.strDescripcion1_1 = "rojo";
                    }
                    if (objRtn.diffQCPAXT < 0) {
                        objRtn.strDescripcion2_2 = "rojo";
                    }
                    if (objRtn.diffQCPAXW < 0) {
                        objRtn.strDescripcion3_3 = "rojo";
                    }
                    if (objRtn.diffQCPAXTH < 0) {
                        objRtn.strDescripcion4_4 = "rojo";
                    }
                    if (objRtn.diffQCPAXF < 0) {
                        objRtn.strDescripcion5_5 = "rojo";
                    }
                    if (objRtn.diffQCPAXS < 0) {
                        objRtn.strDescripcion6_6 = "rojo";
                    }
                    if (objRtn.diffQCPAXSA < 0) {
                        objRtn.strDescripcion7_7 = "rojo";
                    }
                    if (objRtn.diffQCPAXTT < 0) {
                        objRtn.strDescripcion10 = "rojo";
                    }

                    if (objRtn.diffQCFLOWM < 0) {
                        objRtn.strDescripcion11 = "rojo";
                    }
                    if (objRtn.diffQCFLOWT < 0) {
                        objRtn.strDescripcion22 = "rojo";
                    }
                    if (objRtn.diffQCFLOWW < 0) {
                        objRtn.strDescripcion33 = "rojo";
                    }
                    if (objRtn.diffQCFLOWTH < 0) {
                        objRtn.strDescripcion44 = "rojo";
                    }
                    if (objRtn.diffQCFLOWF < 0) {
                        objRtn.strDescripcion55 = "rojo";
                    }
                    if (objRtn.diffQCFLOWS < 0) {
                        objRtn.strDescripcion66 = "rojo";
                    }
                    if (objRtn.diffQCFLOWSA < 0) {
                        objRtn.strDescripcion77 = "rojo";
                    }
                    if (objRtn.diffQCFLOWTT < 0) {
                        objRtn.strDescripcion9 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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

    public HashMap loadSQP01278OAL(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;
        double PAXFAV = 0, PAXFAV_LY = 0, AMTFAV_LY = 0, AMTFAV = 0;
        double AMTVCPN = 0, AMTVCPN_LY = 0;

        double PAXFAVOAL = 0, PAXFAV_LYOAL = 0, AMTFAV_LYOAL = 0, AMTFAVOAL = 0;
        double AMTVCPNOAL = 0, AMTVCPN_LYOAL = 0;
        //Grafico
        List<A2826Filter> lstGraficoRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objGraficoRtn;
        HashMap resultado = new HashMap();
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01278_2(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                PAXFAV = rs01.getDouble("PAXFAV");
                AMTFAV = rs01.getDouble("AMTFAV");
                AMTVCPN = (rs01.getDouble("PAXFAV") > 0) ? rs01.getDouble("AMTVCPN") / rs01.getDouble("PAXFAV") : 0.00;

                PAXFAV_LY = rs01.getDouble("PAXFAV_LY");
                AMTFAV_LY = rs01.getDouble("AMTFAV_LY");
                AMTVCPN_LY = (rs01.getDouble("PAXFAV_LY") > 0) ? rs01.getDouble("AMTVCPN_LY") / rs01.getDouble("PAXFAV_LY") : 0.00;
                //-----OAL-------
                PAXFAVOAL = rs01.getDouble("PAXFAVOAL");
                AMTFAVOAL = rs01.getDouble("AMTFAVOAL");
                AMTVCPNOAL = (rs01.getDouble("PAXFAVOAL") > 0) ? rs01.getDouble("AMTVCPNOAL") / rs01.getDouble("PAXFAVOAL") : 0.00;

                PAXFAV_LYOAL = rs01.getDouble("PAXFAV_LYOAL");
                AMTFAV_LYOAL = rs01.getDouble("AMTFAV_LYOAL");
                AMTVCPN_LYOAL = (rs01.getDouble("PAXFAV_LYOAL") > 0) ? rs01.getDouble("AMTVCPN_LYOAL") / rs01.getDouble("PAXFAV_LYOAL") : 0.00;

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.ZONA = rs01.getString("ZONA");
                    //objRtn.strDescripcion6 = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion6 = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";

                    //---------AÑO DEL FILTRO-------
                    // AÑO NATERIOR
                    objRtn.QCFLOW15 = rs01.getDouble("AMTFAV_LY");
                    objRtn.QCPAX15 = rs01.getDouble("PAXFAV_LY");
                    objRtn.VCPN15 = (rs01.getDouble("PAXFAV_LY") > 0) ? rs01.getDouble("AMTVCPN_LY") / rs01.getDouble("PAXFAV_LY") : 0.00;

                    objRtn.totQCFLOW15 = AMTFAV_LY;
                    objRtn.totQCPAX15 = PAXFAV_LY;
                    objRtn.totVCPN15 = AMTVCPN_LY;

                    objRtn.AVG15 = (objRtn.QCFLOW15 > 0) ? (objRtn.QCPAX15) / objRtn.QCFLOW15 : 0.00;
                    objRtn.totAVG15avg = (objRtn.totQCFLOW15 > 0) ? (objRtn.totQCPAX15) / objRtn.totQCFLOW15 : 0.00;
                    //----OAL------
                    objRtn.QCFLOW15OAL = rs01.getDouble("AMTFAV_LYOAL");
                    objRtn.QCPAX15OAL = rs01.getDouble("PAXFAV_LYOAL");
                    objRtn.VCPN15OAL = (rs01.getDouble("PAXFAV_LYOAL") > 0) ? rs01.getDouble("AMTVCPN_LYOAL") / rs01.getDouble("PAXFAV_LYOAL") : 0.00;

                    objRtn.totQCFLOW15OAL = AMTFAV_LYOAL;
                    objRtn.totQCPAX15OAL = PAXFAV_LYOAL;
                    objRtn.totVCPN15OAL = AMTVCPN_LYOAL;

                    objRtn.AVG15OAL = (objRtn.QCFLOW15OAL > 0) ? (objRtn.QCPAX15OAL) / objRtn.QCFLOW15OAL : 0.00;
                    objRtn.totAVG15avgOAL = (objRtn.totQCFLOW15OAL > 0) ? (objRtn.totQCPAX15OAL) / objRtn.totQCFLOW15OAL : 0.00;

                    objRtn.per15FlownOAL = (objRtn.QCFLOW15 > 0) ? (objRtn.QCFLOW15OAL * 100) / objRtn.QCFLOW15 : 0.00;
                    objRtn.per15PaxOAL = (objRtn.QCPAX15 > 0) ? (objRtn.QCPAX15OAL * 100) / objRtn.QCPAX15 : 0.00;
                    objRtn.per15FareOAL = (objRtn.VCPN15 > 0) ? (objRtn.VCPN15OAL * 100) / objRtn.VCPN15 : 0.00;

                    objRtn.totper15FlownOAL = (objRtn.totQCFLOW15 > 0) ? (objRtn.totQCFLOW15OAL * 100) / objRtn.totQCFLOW15 : 0.00;
                    objRtn.totper15PaxOAL = (objRtn.totQCPAX15 > 0) ? (objRtn.totQCPAX15OAL * 100) / objRtn.totQCPAX15 : 0.00;
                    objRtn.totper15FareOAL = (objRtn.totVCPN15 > 0) ? (objRtn.totVCPN15OAL * 100) / objRtn.totVCPN15 : 0.00;

                    //-------AÑO ACTUAL---------------
                    objRtn.QCFLOW16 = rs01.getDouble("AMTFAV");
                    objRtn.QCPAX16 = rs01.getDouble("PAXFAV");
                    objRtn.VCPN16 = (rs01.getDouble("PAXFAV") > 0) ? rs01.getDouble("AMTVCPN") / rs01.getDouble("PAXFAV") : 0.00;

                    objRtn.totQCFLOW16 = AMTFAV;
                    objRtn.totQCPAX16 = PAXFAV;
                    objRtn.totVCPN16 = AMTVCPN;

                    objRtn.AVG16 = (objRtn.QCFLOW16 > 0) ? (objRtn.QCPAX16) / objRtn.QCFLOW16 : 0.00;
                    objRtn.totAVG16avg = (objRtn.totQCFLOW16 > 0) ? (objRtn.totQCPAX16) / objRtn.totQCFLOW16 : 0.00;

                    //----OAL------
                    objRtn.QCFLOW16OAL = rs01.getDouble("AMTFAVOAL");
                    objRtn.QCPAX16OAL = rs01.getDouble("PAXFAVOAL");
                    objRtn.VCPN16OAL = (rs01.getDouble("PAXFAVOAL") > 0) ? rs01.getDouble("AMTVCPNOAL") / rs01.getDouble("PAXFAVOAL") : 0.00;

                    objRtn.totQCFLOW16OAL = AMTFAVOAL;
                    objRtn.totQCPAX16OAL = PAXFAVOAL;
                    objRtn.totVCPN16OAL = AMTVCPNOAL;

                    objRtn.AVG16OAL = (objRtn.QCFLOW16OAL > 0) ? (objRtn.QCPAX16OAL) / objRtn.QCFLOW16OAL : 0.00;
                    objRtn.totAVG16avgOAL = (objRtn.totQCFLOW16OAL > 0) ? (objRtn.totQCPAX16OAL) / objRtn.totQCFLOW16OAL : 0.00;

                    objRtn.per16FlownOAL = (objRtn.QCFLOW16 > 0) ? (objRtn.QCFLOW16OAL * 100) / objRtn.QCFLOW16 : 0.00;
                    objRtn.per16PaxOAL = (objRtn.QCPAX16 > 0) ? (objRtn.QCPAX16OAL * 100) / objRtn.QCPAX16 : 0.00;
                    objRtn.per16FareOAL = (objRtn.VCPN16 > 0) ? (objRtn.VCPN16OAL * 100) / objRtn.VCPN16 : 0.00;

                    objRtn.totper16FlownOAL = (objRtn.totQCFLOW16 > 0) ? (objRtn.totQCFLOW16OAL * 100) / objRtn.totQCFLOW16 : 0.00;
                    objRtn.totper16PaxOAL = (objRtn.totQCPAX16 > 0) ? (objRtn.totQCPAX16OAL * 100) / objRtn.totQCPAX16 : 0.00;
                    objRtn.totper16FareOAL = (objRtn.totVCPN16 > 0) ? (objRtn.totVCPN16OAL * 100) / objRtn.totVCPN16 : 0.00;

                    //---------------DIFFERENCES ----------------------------- 
                    objRtn.VCPNavg = objRtn.VCPN16 - objRtn.VCPN15;
                    objRtn.totVCPNavg = objRtn.totVCPN16 - objRtn.totVCPN15;

                    objRtn.diffQCFLOW = objRtn.QCFLOW16 - objRtn.QCFLOW15;
                    objRtn.diffQCPAX = objRtn.QCPAX16 - objRtn.QCPAX15;
                    objRtn.diffAVG = (objRtn.diffQCFLOW > 0) ? (objRtn.diffQCPAX) / objRtn.diffQCFLOW : 0.00;
                    objRtn.totDiffQCFLOW = objRtn.totQCFLOW16 - objRtn.totQCFLOW15;
                    objRtn.totDiffQCPAX = objRtn.totQCPAX16 - objRtn.totQCPAX15;
                    objRtn.totDiffAVG = (objRtn.totDiffQCFLOW > 0) ? (objRtn.totDiffQCPAX) / objRtn.totDiffQCFLOW : 0.00;

                    objRtn.VCPNavgOAL = objRtn.VCPN16OAL - objRtn.VCPN15OAL;
                    objRtn.totVCPNavgOAL = objRtn.totVCPN16OAL - objRtn.totVCPN15OAL;

                    objRtn.diffQCFLOWOAL = objRtn.QCFLOW16OAL - objRtn.QCFLOW15OAL;
                    objRtn.diffQCPAXOAL = objRtn.QCPAX16OAL - objRtn.QCPAX15OAL;
                    objRtn.diffAVGOAL = (objRtn.diffQCFLOWOAL > 0) ? (objRtn.diffQCPAXOAL) / objRtn.diffQCFLOWOAL : 0.00;
                    objRtn.totDiffQCFLOWOAL = objRtn.totQCFLOW16OAL - objRtn.totQCFLOW15OAL;
                    objRtn.totDiffQCPAXOAL = objRtn.totQCPAX16OAL - objRtn.totQCPAX15OAL;
                    objRtn.totDiffAVGOAL = (objRtn.totDiffQCFLOWOAL > 0) ? (objRtn.totDiffQCPAXOAL) / objRtn.totDiffQCFLOWOAL : 0.00;

                    if (objRtn.diffQCFLOW < 0) {
                        objRtn.strDescripcion = "rojo";
                    }
                    if (objRtn.diffQCFLOWOAL < 0) {
                        objRtn.strDescripcion3 = "rojo";
                    }

                    if (objRtn.diffQCPAX < 0) {
                        objRtn.strDescripcion1 = "rojo";
                    }

                    if (objRtn.diffQCPAXOAL < 0) {
                        objRtn.strDescripcion4 = "rojo";
                    }
                    if (objRtn.diffAVG < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }

                    if (objRtn.diffAVGOAL < 0) {
                        objRtn.strDescripcion5 = "rojo";
                    }

                    if (objRtn.VCPNavg < 0) {
                        objRtn.strDescripcion7 = "rojo";
                    }

                    if (objRtn.VCPNavgOAL < 0) {
                        objRtn.strDescripcion8 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }
            rs01.close();
            cstmt01.close();
            resultado.put("REPORTE", lstRtn);

        } catch (Exception e) {
            e.printStackTrace();
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

        return resultado;
    }

    public List<A2826Filter> loadSQP01317OAL(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;

        double VCPNM = 0, VCPNT = 0, VCPNW = 0, VCPNTH = 0, VCPNF = 0, VCPNS = 0, VCPNSA = 0, VCPNTT = 0;
        double VCPNM_LY = 0, VCPNT_LY = 0, VCPNW_LY = 0, VCPNTH_LY = 0, VCPNF_LY = 0, VCPNS_LY = 0, VCPNSA_LY = 0, VCPNTT_LY = 0;

        double VCPNMOAL = 0, VCPNTOAL = 0, VCPNWOAL = 0, VCPNTHOAL = 0, VCPNFOAL = 0, VCPNSOAL = 0, VCPNSAOAL = 0, VCPNTTOAL = 0;
        double VCPNM_LYOAL = 0, VCPNT_LYOAL = 0, VCPNW_LYOAL = 0, VCPNTH_LYOAL = 0, VCPNF_LYOAL = 0, VCPNS_LYOAL = 0, VCPNSA_LYOAL = 0, VCPNTT_LYOAL = 0;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02363(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                VCPNM = rs01.getInt("VCPNM");
                VCPNT = rs01.getInt("VCPNT");
                VCPNW = rs01.getDouble("VCPNW");
                VCPNTH = rs01.getInt("VCPNTH");
                VCPNF = rs01.getInt("VCPNF");
                VCPNS = rs01.getInt("VCPNS");
                VCPNSA = rs01.getDouble("VCPNSA");
                VCPNTT = rs01.getInt("VCPNM") + rs01.getInt("VCPNT") + rs01.getDouble("VCPNW") + rs01.getInt("VCPNTH") + rs01.getInt("VCPNS") + rs01.getDouble("VCPNSA");

                VCPNM_LY = rs01.getInt("VCPNM_LY");
                VCPNT_LY = rs01.getInt("VCPNT_LY");
                VCPNW_LY = rs01.getDouble("VCPNW_LY");
                VCPNTH_LY = rs01.getInt("VCPNTH_LY");
                VCPNF_LY = rs01.getInt("VCPNF_LY");
                VCPNS_LY = rs01.getInt("VCPNS_LY");
                VCPNSA_LY = rs01.getDouble("VCPNSA_LY");
                VCPNTT_LY = rs01.getInt("VCPNM_LY") + rs01.getInt("VCPNT_LY") + rs01.getDouble("VCPNW_LY") + rs01.getInt("VCPNTH_LY") + rs01.getInt("VCPNS_LY") + rs01.getDouble("VCPNSA_LY");

                //***OAL***
                VCPNMOAL = rs01.getInt("VCPNMOAL");
                VCPNTOAL = rs01.getInt("VCPNTOAL");
                VCPNWOAL = rs01.getDouble("VCPNWOAL");
                VCPNTHOAL = rs01.getInt("VCPNTHOAL");
                VCPNFOAL = rs01.getInt("VCPNFOAL");
                VCPNSOAL = rs01.getInt("VCPNSOAL");
                VCPNSAOAL = rs01.getDouble("VCPNSAOAL");
                VCPNTTOAL = rs01.getInt("VCPNMOAL") + rs01.getInt("VCPNTOAL") + rs01.getDouble("VCPNWOAL") + rs01.getInt("VCPNTHOAL") + rs01.getInt("VCPNSOAL") + rs01.getDouble("VCPNSAOAL");

                VCPNM_LYOAL = rs01.getInt("VCPNM_LYOAL");
                VCPNT_LYOAL = rs01.getInt("VCPNT_LYOAL");
                VCPNW_LYOAL = rs01.getDouble("VCPNW_LYOAL");
                VCPNTH_LYOAL = rs01.getInt("VCPNTH_LYOAL");
                VCPNF_LYOAL = rs01.getInt("VCPNF_LYOAL");
                VCPNS_LYOAL = rs01.getInt("VCPNS_LYOAL");
                VCPNSA_LYOAL = rs01.getDouble("VCPNSA_LYOAL");
                VCPNTT_LYOAL = rs01.getInt("VCPNM_LYOAL") + rs01.getInt("VCPNT_LYOAL") + rs01.getDouble("VCPNW_LYOAL") + rs01.getInt("VCPNTH_LYOAL") + rs01.getInt("VCPNS_LYOAL") + rs01.getDouble("VCPNSA_LYOAL");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.ZONA = rs01.getString("ZONA");
                    //objRtn.strDescripcion = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";
                    //---------AÑO  ANTERIOR -------

                    objRtn.VCPNM15 = rs01.getDouble("VCPNM_LY");
                    objRtn.VCPNT15 = rs01.getDouble("VCPNT_LY");
                    objRtn.VCPNW15 = rs01.getDouble("VCPNW_LY");
                    objRtn.VCPNTH15 = rs01.getDouble("VCPNTH_LY");
                    objRtn.VCPNF15 = rs01.getDouble("VCPNF_LY");
                    objRtn.VCPNS15 = rs01.getDouble("VCPNS_LY");
                    objRtn.VCPNSA15 = rs01.getDouble("VCPNSA_LY");
                    objRtn.VCPNTT15 = rs01.getDouble("VCPNM_LY") + rs01.getDouble("VCPNT_LY") + rs01.getDouble("VCPNW_LY")
                            + rs01.getDouble("VCPNTH_LY") + rs01.getDouble("VCPNF_LY") + rs01.getDouble("VCPNS_LY") + rs01.getDouble("VCPNSA_LY");

                    objRtn.totVCPNM15 = VCPNM_LY;
                    objRtn.totVCPNT15 = VCPNT_LY;
                    objRtn.totVCPNW15 = VCPNW_LY;
                    objRtn.totVCPNTH15 = VCPNTH_LY;
                    objRtn.totVCPNF15 = VCPNF_LY;
                    objRtn.totVCPNS15 = VCPNS_LY;
                    objRtn.totVCPNSA15 = VCPNSA_LY;
                    objRtn.totVCPNTT15 = VCPNTT_LY;

                    //***OAL****
                    objRtn.VCPNM15OAL = rs01.getDouble("VCPNM_LYOAL");
                    objRtn.VCPNT15OAL = rs01.getDouble("VCPNT_LYOAL");
                    objRtn.VCPNW15OAL = rs01.getDouble("VCPNW_LYOAL");
                    objRtn.VCPNTH15OAL = rs01.getDouble("VCPNTH_LYOAL");
                    objRtn.VCPNF15OAL = rs01.getDouble("VCPNF_LYOAL");
                    objRtn.VCPNS15OAL = rs01.getDouble("VCPNS_LYOAL");
                    objRtn.VCPNSA15OAL = rs01.getDouble("VCPNSA_LYOAL");
                    objRtn.VCPNTT15OAL = rs01.getDouble("VCPNM_LYOAL") + rs01.getDouble("VCPNT_LYOAL") + rs01.getDouble("VCPNW_LYOAL")
                            + rs01.getDouble("VCPNTH_LYOAL") + rs01.getDouble("VCPNF_LYOAL") + rs01.getDouble("VCPNS_LYOAL") + rs01.getDouble("VCPNSA_LYOAL");

                    objRtn.totVCPNM15OAL = VCPNM_LYOAL;
                    objRtn.totVCPNT15OAL = VCPNT_LYOAL;
                    objRtn.totVCPNW15OAL = VCPNW_LYOAL;
                    objRtn.totVCPNTH15OAL = VCPNTH_LYOAL;
                    objRtn.totVCPNF15OAL = VCPNF_LYOAL;
                    objRtn.totVCPNS15OAL = VCPNS_LYOAL;
                    objRtn.totVCPNSA15OAL = VCPNSA_LYOAL;
                    objRtn.totVCPNTT15OAL = VCPNTT_LYOAL;

                    //-------AÑO  FILTRO---------------
                    objRtn.VCPNM16 = rs01.getDouble("VCPNM");
                    objRtn.VCPNT16 = rs01.getDouble("VCPNT");
                    objRtn.VCPNW16 = rs01.getDouble("VCPNW");
                    objRtn.VCPNTH16 = rs01.getDouble("VCPNTH");
                    objRtn.VCPNF16 = rs01.getDouble("VCPNF");
                    objRtn.VCPNS16 = rs01.getDouble("VCPNS");
                    objRtn.VCPNSA16 = rs01.getDouble("VCPNSA");
                    objRtn.VCPNTT16 = rs01.getDouble("VCPNM") + rs01.getDouble("VCPNT") + rs01.getDouble("VCPNW")
                            + rs01.getDouble("VCPNTH") + rs01.getDouble("VCPNF") + rs01.getDouble("VCPNS") + rs01.getDouble("VCPNSA");

                    objRtn.totVCPNM16 = VCPNM;
                    objRtn.totVCPNT16 = VCPNT;
                    objRtn.totVCPNW16 = VCPNW;
                    objRtn.totVCPNTH16 = VCPNTH;
                    objRtn.totVCPNF16 = VCPNF;
                    objRtn.totVCPNS16 = VCPNS;
                    objRtn.totVCPNSA16 = VCPNSA;
                    objRtn.totVCPNTT16 = VCPNTT;

                    //****OAL***
                    objRtn.VCPNM16OAL = rs01.getDouble("VCPNMOAL");
                    objRtn.VCPNT16OAL = rs01.getDouble("VCPNTOAL");
                    objRtn.VCPNW16OAL = rs01.getDouble("VCPNWOAL");
                    objRtn.VCPNTH16OAL = rs01.getDouble("VCPNTHOAL");
                    objRtn.VCPNF16OAL = rs01.getDouble("VCPNFOAL");
                    objRtn.VCPNS16OAL = rs01.getDouble("VCPNSOAL");
                    objRtn.VCPNSA16OAL = rs01.getDouble("VCPNSAOAL");
                    objRtn.VCPNTT16OAL = rs01.getDouble("VCPNMOAL") + rs01.getDouble("VCPNTOAL") + rs01.getDouble("VCPNWOAL")
                            + rs01.getDouble("VCPNTHOAL") + rs01.getDouble("VCPNFOAL") + rs01.getDouble("VCPNSOAL") + rs01.getDouble("VCPNSAOAL");

                    objRtn.totVCPNM16OAL = VCPNMOAL;
                    objRtn.totVCPNT16OAL = VCPNTOAL;
                    objRtn.totVCPNW16OAL = VCPNWOAL;
                    objRtn.totVCPNTH16OAL = VCPNTHOAL;
                    objRtn.totVCPNF16OAL = VCPNFOAL;
                    objRtn.totVCPNS16OAL = VCPNSOAL;
                    objRtn.totVCPNSA16OAL = VCPNSAOAL;
                    objRtn.totVCPNTT16OAL = VCPNTTOAL;

                    //DIFERENCIAS
                   /* objRtn.diffVCPNM = objRtn.VCPNM16 - objRtn.VCPNM15;
                     objRtn.diffVCPNT = objRtn.VCPNT16 - objRtn.VCPNT15;
                     objRtn.diffVCPNW = objRtn.VCPNW16 - objRtn.VCPNW15;
                     objRtn.diffVCPNTH = objRtn.VCPNTH16 - objRtn.VCPNTH15;
                     objRtn.diffVCPNF = objRtn.VCPNF16 - objRtn.VCPNF15;
                     objRtn.diffVCPNS = objRtn.VCPNS16 - objRtn.VCPNS15;
                     objRtn.diffVCPNSA = objRtn.VCPNSA16 - objRtn.VCPNSA15;
                     objRtn.diffVCPNTT = objRtn.VCPNTT16 - objRtn.VCPNTT15;

                     objRtn.diffTotVCPNM = objRtn.totVCPNM16 - objRtn.totVCPNM15;
                     objRtn.diffTotVCPNT = objRtn.totVCPNT16 - objRtn.totVCPNT15;
                     objRtn.diffTotVCPNW = objRtn.totVCPNW16 - objRtn.totVCPNW15;
                     objRtn.diffTotVCPNTH = objRtn.totVCPNTH16 - objRtn.totVCPNTH15;
                     objRtn.diffTotVCPNF = objRtn.totVCPNF16 - objRtn.totVCPNF15;
                     objRtn.diffTotVCPNS = objRtn.totVCPNS16 - objRtn.totVCPNS15;
                     objRtn.diffTotVCPNSA = objRtn.totVCPNSA16 - objRtn.totVCPNSA15;
                     objRtn.diffTotVCPNTT = objRtn.totVCPNTT16 - objRtn.totVCPNTT15;
                    
                     //***OAL***
                     objRtn.diffVCPNMOAL = objRtn.VCPNM16OAL - objRtn.VCPNM15OAL;
                     objRtn.diffVCPNTOAL = objRtn.VCPNT16OAL - objRtn.VCPNT15OAL;
                     objRtn.diffVCPNWOAL = objRtn.VCPNW16OAL - objRtn.VCPNW15OAL;
                     objRtn.diffVCPNTHOAL = objRtn.VCPNTH16OAL - objRtn.VCPNTH15OAL;
                     objRtn.diffVCPNFOAL = objRtn.VCPNF16OAL - objRtn.VCPNF15OAL;
                     objRtn.diffVCPNSOAL = objRtn.VCPNS16OAL - objRtn.VCPNS15OAL;
                     objRtn.diffVCPNSAOAL = objRtn.VCPNSA16OAL - objRtn.VCPNSA15OAL;
                     objRtn.diffVCPNTTOAL = objRtn.VCPNTT16OAL - objRtn.VCPNTT15OAL;

                     objRtn.diffTotVCPNMOAL = objRtn.totVCPNM16OAL - objRtn.totVCPNM15OAL;
                     objRtn.diffTotVCPNTOAL = objRtn.totVCPNT16OAL - objRtn.totVCPNT15OAL;
                     objRtn.diffTotVCPNWOAL = objRtn.totVCPNW16OAL - objRtn.totVCPNW15OAL;
                     objRtn.diffTotVCPNTHOAL = objRtn.totVCPNTH16OAL - objRtn.totVCPNTH15OAL;
                     objRtn.diffTotVCPNFOAL = objRtn.totVCPNF16OAL - objRtn.totVCPNF15OAL;
                     objRtn.diffTotVCPNSOAL = objRtn.totVCPNS16OAL - objRtn.totVCPNS15OAL;
                     objRtn.diffTotVCPNSAOAL = objRtn.totVCPNSA16OAL - objRtn.totVCPNSA15OAL;
                     objRtn.diffTotVCPNTTOAL = objRtn.totVCPNTT16OAL - objRtn.totVCPNTT15OAL;

                     if (objRtn.diffVCPNM < 0) {
                     objRtn.strDescripcion1 = "rojo";
                     }
                     if (objRtn.diffVCPNT < 0) {
                     objRtn.strDescripcion2 = "rojo";
                     }
                     if (objRtn.diffVCPNW < 0) {
                     objRtn.strDescripcion3 = "rojo";
                     }
                     if (objRtn.diffVCPNTH < 0) {
                     objRtn.strDescripcion4 = "rojo";
                     }
                     if (objRtn.diffVCPNF < 0) {
                     objRtn.strDescripcion5 = "rojo";
                     }
                     if (objRtn.diffVCPNS < 0) {
                     objRtn.strDescripcion6 = "rojo";
                     }
                     if (objRtn.diffVCPNSA < 0) {
                     objRtn.strDescripcion7 = "rojo";
                     }
                     if (objRtn.diffVCPNTT < 0) {
                     objRtn.strDescripcion8 = "rojo";
                     }
                     //***OAL**
                     if (objRtn.diffVCPNMOAL < 0) {
                     objRtn.strDescripcion11 = "rojo";
                     }
                     if (objRtn.diffVCPNTOAL < 0) {
                     objRtn.strDescripcion22 = "rojo";
                     }
                     if (objRtn.diffVCPNWOAL < 0) {
                     objRtn.strDescripcion33 = "rojo";
                     }
                     if (objRtn.diffVCPNTHOAL < 0) {
                     objRtn.strDescripcion44 = "rojo";
                     }
                     if (objRtn.diffVCPNFOAL < 0) {
                     objRtn.strDescripcion55 = "rojo";
                     }
                     if (objRtn.diffVCPNSOAL < 0) {
                     objRtn.strDescripcion66 = "rojo";
                     }
                     if (objRtn.diffVCPNSAOAL < 0) {
                     objRtn.strDescripcion77 = "rojo";
                     }
                     if (objRtn.diffVCPNTTOAL < 0) {
                     objRtn.strDescripcion9 = "rojo";
                     }*/
                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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

    public List<A2826Filter> loadSQP01318OAL(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;
        double QYIELD = 0, QYIELD_LY = 0, QBASICM_LY = 0, QBASICM = 0;
        double QYIELDOAL = 0, QYIELD_LYOAL = 0, QBASICM_LYOAL = 0, QBASICMOAL = 0;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02364(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QYIELD = rs01.getDouble("QYIELD");
                QBASICM = rs01.getDouble("QBASICM");
                QYIELD_LY = rs01.getDouble("QYIELD_LY");
                QBASICM_LY = rs01.getDouble("QBASICM_LY");

                QYIELDOAL = rs01.getDouble("QYIELDOAL");
                QBASICMOAL = rs01.getDouble("QBASICMOAL");
                QYIELD_LYOAL = rs01.getDouble("QYIELD_LYOAL");
                QBASICM_LYOAL = rs01.getDouble("QBASICM_LYOAL");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.ZONA = rs01.getString("ZONA");
                    //objRtn.strDescripcion1 = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion1 = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";

                    //---------AÑO DEL FILTRO-------
                    // AÑO ACTUAL
                    objRtn.QYIELD15 = rs01.getDouble("QYIELD_LY");
                    objRtn.QBASICM15 = rs01.getDouble("QBASICM_LY");

                    objRtn.QYIELD15OAL = rs01.getDouble("QYIELD_LYOAL");
                    objRtn.QBASICM15OAL = rs01.getDouble("QBASICM_LYOAL");

                    //-------AÑO ANTERIOR---------------
                    objRtn.QYIELD16 = rs01.getDouble("QYIELD");
                    objRtn.QBASICM16 = rs01.getDouble("QBASICM");

                    objRtn.QYIELD16OAL = rs01.getDouble("QYIELDOAL");
                    objRtn.QBASICM16OAL = rs01.getDouble("QBASICMOAL");

                    //---------------DIFFERENCES ----------------------------- 
                    objRtn.diffQYIELD = objRtn.QYIELD16 - objRtn.QYIELD15;

                    objRtn.diffQYIELDOAL = objRtn.QYIELD16OAL - objRtn.QYIELD15OAL;

                    if (objRtn.diffQYIELD < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }

                    if (objRtn.diffQYIELDOAL < 0) {
                        objRtn.strDescripcion3 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
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

    public List<A2826Filter> loadSQP01297OAL(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;
        int QBLOCKH = 0, QBLOCKH_LY = 0, QBLOCKM_LY = 0, QBLOCKM = 0;
        int QBLOCKHOAL = 0, QBLOCKH_LYOAL = 0, QBLOCKM_LYOAL = 0, QBLOCKMOAL = 0;
        double AMTVCPN = 0, AMTVCPN_LY = 0;
        double AMTVCPNOAL = 0, AMTVCPN_LYOAL = 0;
        int p = 1, q = 0;
        int pOAL = 1, qOAL = 0;
        int cociente = 0, residuo = 0;
        int cocienteOAL = 0, residuoOAL = 0;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02362(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QBLOCKH = rs01.getInt("QBLOCKH");
                QBLOCKM = rs01.getInt("QBLOCKM");
                AMTVCPN = rs01.getDouble("AMTVCPN");
                QBLOCKH_LY = rs01.getInt("QBLOCKH_LY");
                QBLOCKM_LY = rs01.getInt("QBLOCKM_LY");
                AMTVCPN_LY = rs01.getDouble("AMTVCPN_LY");

                QBLOCKHOAL = rs01.getInt("QBLOCKHOAL");
                QBLOCKMOAL = rs01.getInt("QBLOCKMOAL");
                AMTVCPNOAL = rs01.getDouble("AMTVCPNOAL");
                QBLOCKH_LYOAL = rs01.getInt("QBLOCKH_LYOAL");
                QBLOCKM_LYOAL = rs01.getInt("QBLOCKM_LYOAL");
                AMTVCPN_LYOAL = rs01.getDouble("AMTVCPN_LYOAL");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.ZONA = rs01.getString("ZONA");
                    //objRtn.strDescripcion6 = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion6 = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";

                    //---------AÑO DEL ANTERIOR -------
                    // AÑO pasado
                    objRtn.QBLOCKH15 = rs01.getInt("QBLOCKH_LY");
                    objRtn.QBLOCKM15 = rs01.getInt("QBLOCKM_LY");
                    objRtn.VCPN15 = rs01.getDouble("AMTVCPN_LY");
                    objRtn.HORASMIN15 = objRtn.QBLOCKH15 + " : " + Functions.fillZeros(2, String.valueOf(objRtn.QBLOCKM15));
                    //****OAL*****
                    objRtn.QBLOCKH15OAL = rs01.getInt("QBLOCKH_LYOAL");
                    objRtn.QBLOCKM15OAL = rs01.getInt("QBLOCKM_LYOAL");
                    objRtn.VCPN15OAL = rs01.getDouble("AMTVCPN_LYOAL");
                    objRtn.HORASMIN15OAL = objRtn.QBLOCKH15OAL + " : " + Functions.fillZeros(2, String.valueOf(objRtn.QBLOCKM15OAL));

                    //CALCULANDO EL RESIDUO
                    if (QBLOCKM_LY >= 60) {
                        cociente = (QBLOCKM_LY / 60);
                        residuo = (QBLOCKM_LY % 60);
                        objRtn.totQBLOCKH15 = QBLOCKH_LY + cociente;
                        objRtn.totQBLOCKM15 = residuo;
                    } else {
                        objRtn.totQBLOCKH15 = QBLOCKH_LY;
                        objRtn.totQBLOCKM15 = QBLOCKM_LY;
                    }
                    objRtn.totHORASMIN15 = objRtn.totQBLOCKH15 + " : " + Functions.fillZeros(2, String.valueOf(objRtn.totQBLOCKM15));
                    objRtn.totVCPN15 = AMTVCPN_LY;

                    objRtn.avgBLOCKH15 = (objRtn.QBLOCKH15 > 0) ? (objRtn.VCPN15) / objRtn.QBLOCKH15 : 0;
                    objRtn.totBLOCKH15avg = (objRtn.totQBLOCKH15 > 0) ? (objRtn.totVCPN15) / objRtn.totQBLOCKH15 : 0;

                    //*****OAL******
                    if (QBLOCKM_LYOAL >= 60) {
                        cocienteOAL = (QBLOCKM_LYOAL / 60);
                        residuoOAL = (QBLOCKM_LYOAL % 60);
                        objRtn.totQBLOCKH15OAL = QBLOCKH_LYOAL + cocienteOAL;
                        objRtn.totQBLOCKM15OAL = residuoOAL;
                    } else {
                        objRtn.totQBLOCKH15OAL = QBLOCKH_LYOAL;
                        objRtn.totQBLOCKM15OAL = QBLOCKM_LYOAL;
                    }
                    objRtn.totHORASMIN15OAL = objRtn.totQBLOCKH15OAL + " : " + Functions.fillZeros(2, String.valueOf(objRtn.totQBLOCKM15OAL));
                    objRtn.totVCPN15OAL = AMTVCPN_LY;

                    objRtn.avgBLOCKH15OAL = (objRtn.QBLOCKH15OAL > 0) ? (objRtn.VCPN15OAL) / objRtn.QBLOCKH15OAL : 0;
                    objRtn.totBLOCKH15avgOAL = (objRtn.totQBLOCKH15OAL > 0) ? (objRtn.totVCPN15OAL) / objRtn.totQBLOCKH15OAL : 0;

                    //-------AÑO FILTRO---------------
                    objRtn.QBLOCKH16 = rs01.getInt("QBLOCKH");
                    objRtn.QBLOCKM16 = rs01.getInt("QBLOCKM");
                    objRtn.VCPN16 = rs01.getDouble("AMTVCPN");
                    objRtn.HORASMIN16 = objRtn.QBLOCKH16 + " : " + Functions.fillZeros(2, String.valueOf(objRtn.QBLOCKM16));

                    //*****OAL****
                    objRtn.QBLOCKH16OAL = rs01.getInt("QBLOCKHOAL");
                    objRtn.QBLOCKM16OAL = rs01.getInt("QBLOCKMOAL");
                    objRtn.VCPN16OAL = rs01.getDouble("AMTVCPNOAL");
                    objRtn.HORASMIN16OAL = objRtn.QBLOCKH16OAL + " : " + Functions.fillZeros(2, String.valueOf(objRtn.QBLOCKM16OAL));

                    //CALCULANDO EL RESIDUO
                    if (QBLOCKM >= 60) {
                        cociente = (QBLOCKM / 60);
                        residuo = (QBLOCKM % 60);
                        objRtn.totQBLOCKH16 = QBLOCKH + cociente;
                        objRtn.totQBLOCKM16 = residuo;
                    } else {
                        objRtn.totQBLOCKH16 = QBLOCKH;
                        objRtn.totQBLOCKM16 = QBLOCKM;
                    }

                    objRtn.totHORASMIN16 = objRtn.totQBLOCKH16 + " : " + Functions.fillZeros(2, String.valueOf(objRtn.totQBLOCKM16));
                    objRtn.totVCPN16 = AMTVCPN;

                    objRtn.avgBLOCKH16 = (objRtn.QBLOCKH16 > 0) ? (objRtn.VCPN16) / objRtn.QBLOCKH16 : 0;
                    objRtn.totBLOCKH16avg = (objRtn.totQBLOCKH16 > 0) ? (objRtn.totVCPN16) / objRtn.totQBLOCKH16 : 0;

                    //*****OAL****
                    //CALCULANDO EL RESIDUO
                    if (QBLOCKMOAL >= 60) {
                        cocienteOAL = (QBLOCKMOAL / 60);
                        residuoOAL = (QBLOCKMOAL % 60);
                        objRtn.totQBLOCKH16OAL = QBLOCKHOAL + cocienteOAL;
                        objRtn.totQBLOCKM16OAL = residuoOAL;
                    } else {
                        objRtn.totQBLOCKH16OAL = QBLOCKHOAL;
                        objRtn.totQBLOCKM16OAL = QBLOCKMOAL;
                    }

                    objRtn.totHORASMIN16OAL = objRtn.totQBLOCKH16OAL + " : " + Functions.fillZeros(2, String.valueOf(objRtn.totQBLOCKM16OAL));
                    objRtn.totVCPN16OAL = AMTVCPNOAL;

                    objRtn.avgBLOCKH16OAL = (objRtn.QBLOCKH16OAL > 0) ? (objRtn.VCPN16OAL) / objRtn.QBLOCKH16OAL : 0;
                    objRtn.totBLOCKH16avgOAL = (objRtn.totQBLOCKH16OAL > 0) ? (objRtn.totVCPN16OAL) / objRtn.totQBLOCKH16OAL : 0;

                    objRtn.per16FlownOAL = (objRtn.QCFLOW16 > 0) ? (objRtn.QCFLOW16OAL * 100) / objRtn.QCFLOW16 : 0.00;
                    objRtn.totper16FlownOAL = (objRtn.totQCFLOW16 > 0) ? (objRtn.totQCFLOW16OAL * 100) / objRtn.totQCFLOW16 : 0.00;
                    //---------------DIFFERENCES ----------------------------- 
                    objRtn.diffVCPN = objRtn.VCPN16 - objRtn.VCPN15;
                    objRtn.diffVCPNOAL = objRtn.VCPN16OAL - objRtn.VCPN15OAL;

                    objRtn.totDiffVCPNOAL = objRtn.totVCPN16OAL - objRtn.totVCPN15OAL;
                    objRtn.diffQBLOCKHOAL = objRtn.QBLOCKH16OAL - objRtn.QBLOCKH15OAL;
                    objRtn.diffQBLOCKMOAL = objRtn.QBLOCKM16OAL - objRtn.QBLOCKM15OAL;
                    objRtn.diffHORASMIN16OAL = objRtn.diffQBLOCKHOAL + " : " + Functions.fillZeros(2, String.valueOf(objRtn.diffQBLOCKMOAL));
                    objRtn.totdiffQBLOCKHOAL = objRtn.totQBLOCKH16OAL - objRtn.totQBLOCKH15OAL;
                    objRtn.totdiffQBLOCKMOAL = objRtn.totQBLOCKM16OAL - objRtn.totQBLOCKM15OAL;
                    objRtn.totdiffHORASMIN16OAL = objRtn.totdiffQBLOCKHOAL + " : " + Functions.fillZeros(2, String.valueOf(objRtn.totdiffQBLOCKMOAL));
                    objRtn.diffAvgBLOCKHOAL = (objRtn.diffQBLOCKHOAL > 0) ? (objRtn.diffVCPNOAL) / objRtn.diffQBLOCKHOAL : 0;
                    objRtn.totdiffAvgBLOCKHOAL = (objRtn.totdiffQBLOCKHOAL > 0) ? (objRtn.totDiffVCPNOAL) / objRtn.totdiffQBLOCKHOAL : 0;

                    objRtn.totDiffVCPN = objRtn.totVCPN16 - objRtn.totVCPN15;
                    objRtn.diffQBLOCKH = objRtn.QBLOCKH16 - objRtn.QBLOCKH15;
                    objRtn.diffQBLOCKM = objRtn.QBLOCKM16 - objRtn.QBLOCKM15;
                    objRtn.diffHORASMIN16 = objRtn.diffQBLOCKH + " : " + Functions.fillZeros(2, String.valueOf(objRtn.diffQBLOCKM));
                    objRtn.totdiffQBLOCKH = objRtn.totQBLOCKH16 - objRtn.totQBLOCKH15;
                    objRtn.totdiffQBLOCKM = objRtn.totQBLOCKM16 - objRtn.totQBLOCKM15;
                    objRtn.totdiffHORASMIN16 = objRtn.totdiffQBLOCKH + " : " + Functions.fillZeros(2, String.valueOf(objRtn.totdiffQBLOCKM));
                    objRtn.diffAvgBLOCKH = (objRtn.diffQBLOCKH > 0) ? (objRtn.diffVCPN) / objRtn.diffQBLOCKH : 0;
                    objRtn.totdiffAvgBLOCKH = (objRtn.totdiffQBLOCKH > 0) ? (objRtn.totDiffVCPN) / objRtn.totdiffQBLOCKH : 0;

                    if (objRtn.diffVCPN < 0) {
                        objRtn.strDescripcion = "rojo";
                    }
                    if (objRtn.diffVCPNOAL < 0) {
                        objRtn.strDescripcion1 = "rojo";
                    }
                    if (objRtn.diffQBLOCKH < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }
                    if (objRtn.diffQBLOCKHOAL < 0) {
                        objRtn.strDescripcion3 = "rojo";
                    }

                    if (objRtn.diffAvgBLOCKH < 0) {
                        objRtn.strDescripcion4 = "rojo";
                    }
                    if (objRtn.diffAvgBLOCKHOAL < 0) {
                        objRtn.strDescripcion5 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
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
    public List<A2826Filter> loadSQP01302OALFli(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;

        double AMTFAVM_LY = 0, AMTFAVT_LY = 0, AMTFAVW_LY = 0, AMTFAVTH_LY = 0, AMTFAVF_LY = 0, AMTFAVS_LY = 0, AMTFAVSA_LY = 0, AMTFAVTT_LY = 0;
        double AMTFAVM = 0, AMTFAVT = 0, AMTFAVW = 0, AMTFAVTH = 0, AMTFAVF = 0, AMTFAVS = 0, AMTFAVSA = 0, AMTFAVTT = 0;
        //*****OAL****
        double AMTFAVMOAL_LY = 0, AMTFAVTOAL_LY = 0, AMTFAVWOAL_LY = 0, AMTFAVTHOAL_LY = 0, AMTFAVFOAL_LY = 0, AMTFAVSOAL_LY = 0, AMTFAVSAOAL_LY = 0, AMTFAVTTOAL_LY = 0;
        double AMTFAVMOAL = 0, AMTFAVTOAL = 0, AMTFAVWOAL = 0, AMTFAVTHOAL = 0, AMTFAVFOAL = 0, AMTFAVSOAL = 0, AMTFAVSAOAL = 0, AMTFAVTTOAL = 0;

        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02367(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                // ***********************FLOWN***************************
                AMTFAVM_LY = rs01.getDouble("AMTFAVM_LY");
                AMTFAVT_LY = rs01.getDouble("AMTFAVT_LY");
                AMTFAVW_LY = rs01.getDouble("AMTFAVW_LY");
                AMTFAVTH_LY = rs01.getDouble("AMTFAVTH_LY");
                AMTFAVF_LY = rs01.getDouble("AMTFAVF_LY");
                AMTFAVS_LY = rs01.getDouble("AMTFAVS_LY");
                AMTFAVSA_LY = rs01.getDouble("AMTFAVSA_LY");
                AMTFAVTT_LY = rs01.getDouble("TOTALAMT_LY");

                AMTFAVM = rs01.getDouble("AMTFAVM");
                AMTFAVT = rs01.getDouble("AMTFAVT");
                AMTFAVW = rs01.getDouble("AMTFAVW");
                AMTFAVTH = rs01.getDouble("AMTFAVTH");
                AMTFAVF = rs01.getDouble("AMTFAVF");
                AMTFAVS = rs01.getDouble("AMTFAVS");
                AMTFAVSA = rs01.getDouble("AMTFAVSA");
                AMTFAVTT = rs01.getDouble("TOTALAMT");

                //OAL
                AMTFAVMOAL_LY = rs01.getDouble("AMTFAVMOAL_LY");
                AMTFAVTOAL_LY = rs01.getDouble("AMTFAVTOAL_LY");
                AMTFAVWOAL_LY = rs01.getDouble("AMTFAVWOAL_LY");
                AMTFAVTHOAL_LY = rs01.getDouble("AMTFAVTHOAL_LY");
                AMTFAVFOAL_LY = rs01.getDouble("AMTFAVFOAL_LY");
                AMTFAVSOAL_LY = rs01.getDouble("AMTFAVSOAL_LY");
                AMTFAVSAOAL_LY = rs01.getDouble("AMTFAVSAOAL_LY");
                AMTFAVTTOAL_LY = rs01.getDouble("TOTALAMTOAL_LY");

                AMTFAVMOAL = rs01.getDouble("AMTFAVMOAL");
                AMTFAVTOAL = rs01.getDouble("AMTFAVTOAL");
                AMTFAVWOAL = rs01.getDouble("AMTFAVWOAL");
                AMTFAVTHOAL = rs01.getDouble("AMTFAVTHOAL");
                AMTFAVFOAL = rs01.getDouble("AMTFAVFOAL");
                AMTFAVSOAL = rs01.getDouble("AMTFAVSOAL");
                AMTFAVSAOAL = rs01.getDouble("AMTFAVSAOAL");
                AMTFAVTTOAL = rs01.getDouble("TOTALAMTOAL");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.ZONA = rs01.getString("ZONA");
                    // objRtn.strDescripcion = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";
                    //---------AÑO DEL ANTERIOR -------

                    objRtn.QCFLOWM15 = rs01.getDouble("AMTFAVM_LY");
                    objRtn.QCFLOWT15 = rs01.getDouble("AMTFAVT_LY");
                    objRtn.QCFLOWW15 = rs01.getDouble("AMTFAVW_LY");
                    objRtn.QCFLOWTH15 = rs01.getDouble("AMTFAVTH_LY");
                    objRtn.QCFLOWF15 = rs01.getDouble("AMTFAVF_LY");
                    objRtn.QCFLOWS15 = rs01.getDouble("AMTFAVS_LY");
                    objRtn.QCFLOWSA15 = rs01.getDouble("AMTFAVSA_LY");
                    objRtn.QCFLOWTT15 = rs01.getDouble("TOTALAMT_LY");
                    //TOTALES
                    objRtn.totQCFLOWM15 = AMTFAVM_LY;
                    objRtn.totQCFLOWT15 = AMTFAVT_LY;
                    objRtn.totQCFLOWW15 = AMTFAVW_LY;
                    objRtn.totQCFLOWTH15 = AMTFAVTH_LY;
                    objRtn.totQCFLOWF15 = AMTFAVF_LY;
                    objRtn.totQCFLOWS15 = AMTFAVS_LY;
                    objRtn.totQCFLOWSA15 = AMTFAVSA_LY;
                    objRtn.totQCFLOWTT15 = AMTFAVTT_LY;

                    //OAL
                    objRtn.QCFLOWM15OAL = rs01.getDouble("AMTFAVMOAL_LY");
                    objRtn.QCFLOWT15OAL = rs01.getDouble("AMTFAVTOAL_LY");
                    objRtn.QCFLOWW15OAL = rs01.getDouble("AMTFAVWOAL_LY");
                    objRtn.QCFLOWTH15OAL = rs01.getDouble("AMTFAVTHOAL_LY");
                    objRtn.QCFLOWF15OAL = rs01.getDouble("AMTFAVFOAL_LY");
                    objRtn.QCFLOWS15OAL = rs01.getDouble("AMTFAVSOAL_LY");
                    objRtn.QCFLOWSA15OAL = rs01.getDouble("AMTFAVSAOAL_LY");
                    objRtn.QCFLOWTT15OAL = rs01.getDouble("TOTALAMTOAL_LY");
                    //TOTALES
                    objRtn.totQCFLOWM15OAL = AMTFAVMOAL_LY;
                    objRtn.totQCFLOWT15OAL = AMTFAVTOAL_LY;
                    objRtn.totQCFLOWW15OAL = AMTFAVWOAL_LY;
                    objRtn.totQCFLOWTH15OAL = AMTFAVTHOAL_LY;
                    objRtn.totQCFLOWF15OAL = AMTFAVFOAL_LY;
                    objRtn.totQCFLOWS15OAL = AMTFAVSOAL_LY;
                    objRtn.totQCFLOWSA15OAL = AMTFAVSAOAL_LY;

                    objRtn.totQCFLOWTT15OAL = AMTFAVTTOAL_LY;

                    //-------AÑO ANTERIOR FILTRO---------------
                    objRtn.QCFLOWM16 = rs01.getDouble("AMTFAVM");
                    objRtn.QCFLOWT16 = rs01.getDouble("AMTFAVT");
                    objRtn.QCFLOWW16 = rs01.getDouble("AMTFAVW");
                    objRtn.QCFLOWTH16 = rs01.getDouble("AMTFAVTH");
                    objRtn.QCFLOWF16 = rs01.getDouble("AMTFAVF");
                    objRtn.QCFLOWS16 = rs01.getDouble("AMTFAVS");
                    objRtn.QCFLOWSA16 = rs01.getDouble("AMTFAVSA");
                    objRtn.QCFLOWTT16 = rs01.getDouble("TOTALAMT");
                    //TOTALES
                    objRtn.totQCFLOWM16 = AMTFAVM;
                    objRtn.totQCFLOWT16 = AMTFAVT;
                    objRtn.totQCFLOWW16 = AMTFAVW;
                    objRtn.totQCFLOWTH16 = AMTFAVTH;
                    objRtn.totQCFLOWF16 = AMTFAVF;
                    objRtn.totQCFLOWS16 = AMTFAVS;
                    objRtn.totQCFLOWSA16 = AMTFAVSA;
                    objRtn.totQCFLOWTT16 = AMTFAVTT;

                    //OAL
                    objRtn.QCFLOWM16OAL = rs01.getDouble("AMTFAVMOAL");
                    objRtn.QCFLOWT16OAL = rs01.getDouble("AMTFAVTOAL");
                    objRtn.QCFLOWW16OAL = rs01.getDouble("AMTFAVWOAL");
                    objRtn.QCFLOWTH16OAL = rs01.getDouble("AMTFAVTHOAL");
                    objRtn.QCFLOWF16OAL = rs01.getDouble("AMTFAVFOAL");
                    objRtn.QCFLOWS16OAL = rs01.getDouble("AMTFAVSOAL");
                    objRtn.QCFLOWSA16OAL = rs01.getDouble("AMTFAVSAOAL");
                    objRtn.QCFLOWTT16OAL = rs01.getDouble("TOTALAMTOAL");
                    //TOTALES
                    objRtn.totQCFLOWM16OAL = AMTFAVMOAL;
                    objRtn.totQCFLOWT16OAL = AMTFAVTOAL;
                    objRtn.totQCFLOWW16OAL = AMTFAVWOAL;
                    objRtn.totQCFLOWTH16OAL = AMTFAVTHOAL;
                    objRtn.totQCFLOWF16OAL = AMTFAVFOAL;
                    objRtn.totQCFLOWS16OAL = AMTFAVSOAL;
                    objRtn.totQCFLOWSA16OAL = AMTFAVSAOAL;
                    objRtn.totQCFLOWTT16OAL = AMTFAVTTOAL;

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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
     public List<A2826Filter> loadSQP01302OALPax(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;
        double PAXFAVM_LY = 0, PAXFAVT_LY = 0, PAXFAVW_LY = 0, PAXFAVTH_LY = 0, PAXFAVF_LY = 0, PAXFAVS_LY = 0, PAXFAVSA_LY = 0, PAXFAVTT_LY = 0;
        double PAXFAVM = 0, PAXFAVT = 0, PAXFAVW = 0, PAXFAVTH = 0, PAXFAVF = 0, PAXFAVS = 0, PAXFAVSA = 0, PAXFAVTT = 0;
        //*****OAL****

        double PAXFAVMOAL_LY = 0, PAXFAVTOAL_LY = 0, PAXFAVWOAL_LY = 0, PAXFAVTHOAL_LY = 0, PAXFAVFOAL_LY = 0, PAXFAVSOAL_LY = 0, PAXFAVSAOAL_LY = 0, PAXFAVTTOAL_LY = 0;
        double PAXFAVMOAL = 0, PAXFAVTOAL = 0, PAXFAVWOAL = 0, PAXFAVTHOAL = 0, PAXFAVFOAL = 0, PAXFAVSOAL = 0, PAXFAVSAOAL = 0, PAXFAVTTOAL = 0;

        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02366(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                // ***********************PAX***************************
                PAXFAVM_LY = rs01.getDouble("PAXFAVM_LY");
                PAXFAVT_LY = rs01.getDouble("PAXFAVT_LY");
                PAXFAVW_LY = rs01.getDouble("PAXFAVW_LY");
                PAXFAVTH_LY = rs01.getDouble("PAXFAVTH_LY");
                PAXFAVF_LY = rs01.getDouble("PAXFAVF_LY");
                PAXFAVS_LY = rs01.getDouble("PAXFAVS_LY");
                PAXFAVSA_LY = rs01.getDouble("PAXFAVSA_LY");
                PAXFAVTT_LY = rs01.getDouble("TOTALPAX_LY");

                PAXFAVM = rs01.getDouble("PAXFAVM");
                PAXFAVT = rs01.getDouble("PAXFAVT");
                PAXFAVW = rs01.getDouble("PAXFAVW");
                PAXFAVTH = rs01.getDouble("PAXFAVTH");
                PAXFAVF = rs01.getDouble("PAXFAVF");
                PAXFAVS = rs01.getDouble("PAXFAVS");
                PAXFAVSA = rs01.getDouble("PAXFAVSA");
                PAXFAVTT = rs01.getDouble("TOTALPAX");
                //OAL
                PAXFAVMOAL_LY = rs01.getDouble("PAXFAVMOAL_LY");
                PAXFAVTOAL_LY = rs01.getDouble("PAXFAVTOAL_LY");
                PAXFAVWOAL_LY = rs01.getDouble("PAXFAVWOAL_LY");
                PAXFAVTHOAL_LY = rs01.getDouble("PAXFAVTHOAL_LY");
                PAXFAVFOAL_LY = rs01.getDouble("PAXFAVFOAL_LY");
                PAXFAVSOAL_LY = rs01.getDouble("PAXFAVSOAL_LY");
                PAXFAVSAOAL_LY = rs01.getDouble("PAXFAVSAOAL_LY");
                PAXFAVTTOAL_LY = rs01.getDouble("TOTALPAXOAL_LY");

                PAXFAVMOAL = rs01.getDouble("PAXFAVMOAL");
                PAXFAVTOAL = rs01.getDouble("PAXFAVTOAL");
                PAXFAVWOAL = rs01.getDouble("PAXFAVWOAL");
                PAXFAVTHOAL = rs01.getDouble("PAXFAVTHOAL");
                PAXFAVFOAL = rs01.getDouble("PAXFAVFOAL");
                PAXFAVSOAL = rs01.getDouble("PAXFAVSOAL");
                PAXFAVSAOAL = rs01.getDouble("PAXFAVSAOAL");
                PAXFAVTTOAL = rs01.getDouble("TOTALPAXOAL");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.ZONA = rs01.getString("ZONA");
                    // objRtn.strDescripcion = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";
                    //---------AÑO DEL ANTERIOR -------

                    objRtn.QCPAXM15 = rs01.getDouble("PAXFAVM_LY");

                    objRtn.QCPAXT15 = rs01.getDouble("PAXFAVT_LY");

                    objRtn.QCPAXW15 = rs01.getDouble("PAXFAVW_LY");

                    objRtn.QCPAXTH15 = rs01.getDouble("PAXFAVTH_LY");

                    objRtn.QCPAXF15 = rs01.getDouble("PAXFAVF_LY");

                    objRtn.QCPAXS15 = rs01.getDouble("PAXFAVS_LY");

                    objRtn.QCPAXSA15 = rs01.getDouble("PAXFAVSA_LY");
                    objRtn.QCPAXTT15 = rs01.getDouble("TOTALPAX_LY");

                    //TOTALES
                    objRtn.totQCPAXM15 = PAXFAVM_LY;

                    objRtn.totQCPAXT15 = PAXFAVT_LY;

                    objRtn.totQCPAXW15 = PAXFAVW_LY;

                    objRtn.totQCPAXTH15 = PAXFAVTH_LY;

                    objRtn.totQCPAXF15 = PAXFAVF_LY;

                    objRtn.totQCPAXS15 = PAXFAVS_LY;

                    objRtn.totQCPAXSA15 = PAXFAVSA_LY;

                    objRtn.totQCPAXTT15 = PAXFAVTT_LY;

                    //OAL
                    objRtn.QCPAXM15OAL = rs01.getDouble("PAXFAVMOAL_LY");

                    objRtn.QCPAXT15OAL = rs01.getDouble("PAXFAVTOAL_LY");

                    objRtn.QCPAXW15OAL = rs01.getDouble("PAXFAVWOAL_LY");

                    objRtn.QCPAXTH15OAL = rs01.getDouble("PAXFAVTHOAL_LY");

                    objRtn.QCPAXF15OAL = rs01.getDouble("PAXFAVFOAL_LY");

                    objRtn.QCPAXS15OAL = rs01.getDouble("PAXFAVSOAL_LY");

                    objRtn.QCPAXSA15OAL = rs01.getDouble("PAXFAVSAOAL_LY");
                    objRtn.QCPAXTT15OAL = rs01.getDouble("TOTALPAXOAL_LY");

                    //TOTALES
                    objRtn.totQCPAXM15OAL = PAXFAVMOAL_LY;

                    objRtn.totQCPAXT15OAL = PAXFAVTOAL_LY;

                    objRtn.totQCPAXW15OAL = PAXFAVWOAL_LY;

                    objRtn.totQCPAXTH15OAL = PAXFAVTHOAL_LY;

                    objRtn.totQCPAXF15OAL = PAXFAVFOAL_LY;

                    objRtn.totQCPAXS15OAL = PAXFAVSOAL_LY;

                    objRtn.totQCPAXSA15OAL = PAXFAVSAOAL_LY;

                    objRtn.totQCPAXTT15OAL = PAXFAVTTOAL_LY;

                    //-------AÑO ANTERIOR FILTRO---------------
                    objRtn.QCPAXM16 = rs01.getDouble("PAXFAVM");

                    objRtn.QCPAXT16 = rs01.getDouble("PAXFAVT");

                    objRtn.QCPAXW16 = rs01.getDouble("PAXFAVW");

                    objRtn.QCPAXTH16 = rs01.getDouble("PAXFAVTH");

                    objRtn.QCPAXF16 = rs01.getDouble("PAXFAVF");

                    objRtn.QCPAXS16 = rs01.getDouble("PAXFAVS");

                    objRtn.QCPAXSA16 = rs01.getDouble("PAXFAVSA");
                    objRtn.QCPAXTT16 = rs01.getDouble("TOTALPAX");

                    //TOTALES
                    objRtn.totQCPAXM16 = PAXFAVM;

                    objRtn.totQCPAXT16 = PAXFAVT;

                    objRtn.totQCPAXW16 = PAXFAVW;

                    objRtn.totQCPAXTH16 = PAXFAVTH;

                    objRtn.totQCPAXF16 = PAXFAVF;

                    objRtn.totQCPAXS16 = PAXFAVS;

                    objRtn.totQCPAXSA16 = PAXFAVSA;

                    objRtn.totQCPAXTT16 = PAXFAVTT;

                    //OAL
                    objRtn.QCPAXM16OAL = rs01.getDouble("PAXFAVMOAL");

                    objRtn.QCPAXT16OAL = rs01.getDouble("PAXFAVTOAL");

                    objRtn.QCPAXW16OAL = rs01.getDouble("PAXFAVWOAL");

                    objRtn.QCPAXTH16OAL = rs01.getDouble("PAXFAVTHOAL");

                    objRtn.QCPAXF16OAL = rs01.getDouble("PAXFAVFOAL");

                    objRtn.QCPAXS16OAL = rs01.getDouble("PAXFAVSOAL");

                    objRtn.QCPAXSA16OAL = rs01.getDouble("PAXFAVSAOAL");
                    objRtn.QCPAXTT16OAL = rs01.getDouble("TOTALPAXOAL");

                    //TOTALES
                    objRtn.totQCPAXM16OAL = PAXFAVMOAL;

                    objRtn.totQCPAXT16OAL = PAXFAVTOAL;

                    objRtn.totQCPAXW16OAL = PAXFAVWOAL;

                    objRtn.totQCPAXTH16OAL = PAXFAVTHOAL;

                    objRtn.totQCPAXF16OAL = PAXFAVFOAL;

                    objRtn.totQCPAXS16OAL = PAXFAVSOAL;

                    objRtn.totQCPAXSA16OAL = PAXFAVSAOAL;

                    objRtn.totQCPAXTT16OAL = PAXFAVTTOAL;

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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
     public List<A2826Filter> loadSQP01324OAL(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;
        double PAXFAV = 0, PAXFAV_LY = 0, AMTFAV_LY = 0, AMTFAV = 0;
        double AMTVCPN = 0, AMTVCPN_LY = 0;
        double PAXFAVOAL = 0, PAXFAV_LYOAL = 0, AMTFAV_LYOAL = 0, AMTFAVOAL = 0;
        double AMTVCPNOAL = 0, AMTVCPN_LYOAL = 0;

        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01278_2(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                PAXFAV = rs01.getDouble("PAXFAV");
                AMTFAV = rs01.getDouble("AMTFAV");

                PAXFAV_LY = rs01.getDouble("PAXFAV_LY");
                AMTFAV_LY = rs01.getDouble("AMTFAV_LY");
                //-----OAL-------
                PAXFAVOAL = rs01.getDouble("PAXFAVOAL");
                AMTFAVOAL = rs01.getDouble("AMTFAVOAL");

                PAXFAV_LYOAL = rs01.getDouble("PAXFAV_LYOAL");
                AMTFAV_LYOAL = rs01.getDouble("AMTFAV_LYOAL");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.IN_ZONA = rs01.getString("ZONA");
                    objRtn.ZONA = objRtn.IN_ZONA;
                    //objRtn.strDescripcion6 = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion6 = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";

                    //---------AÑO DEL FILTRO-------
                    // AÑO NATERIOR
                    objRtn.QCFLOW15 = rs01.getDouble("AMTFAV_LY");
                    objRtn.QCPAX15 = rs01.getDouble("PAXFAV_LY");

                    objRtn.totQCFLOW15 = AMTFAV_LY;
                    objRtn.totQCPAX15 = PAXFAV_LY;

                    objRtn.AVG15 = (objRtn.QCFLOW15 > 0) ? (objRtn.QCPAX15) / objRtn.QCFLOW15 : 0.00;
                    objRtn.totAVG15avg = (objRtn.totQCFLOW15 > 0) ? (objRtn.totQCPAX15) / objRtn.totQCFLOW15 : 0.00;

                    //----OAL------
                    objRtn.QCFLOW15OAL = rs01.getDouble("AMTFAV_LYOAL");
                    objRtn.QCPAX15OAL = rs01.getDouble("PAXFAV_LYOAL");

                    objRtn.totQCFLOW15OAL = AMTFAV_LYOAL;
                    objRtn.totQCPAX15OAL = PAXFAV_LYOAL;

                    objRtn.AVG15OAL = (objRtn.QCFLOW15OAL > 0) ? (objRtn.QCPAX15OAL) / objRtn.QCFLOW15OAL : 0.00;
                    objRtn.totAVG15avgOAL = (objRtn.totQCFLOW15OAL > 0) ? (objRtn.totQCPAX15OAL) / objRtn.totQCFLOW15OAL : 0.00;

                    objRtn.per15FlownOAL = (objRtn.QCFLOW15 > 0) ? (objRtn.QCFLOW15OAL * 100) / objRtn.QCFLOW15 : 0.00;
                    objRtn.per15PaxOAL = (objRtn.QCPAX15 > 0) ? (objRtn.QCPAX15OAL * 100) / objRtn.QCPAX15 : 0.00;

                    objRtn.totper15FlownOAL = (objRtn.totQCFLOW15 > 0) ? (objRtn.totQCFLOW15OAL * 100) / objRtn.totQCFLOW15 : 0.00;
                    objRtn.totper15PaxOAL = (objRtn.totQCPAX15 > 0) ? (objRtn.totQCPAX15OAL * 100) / objRtn.totQCPAX15 : 0.00;

                    //-------AÑO ACTUAL---------------
                    objRtn.QCFLOW16 = rs01.getDouble("AMTFAV");
                    objRtn.QCPAX16 = rs01.getDouble("PAXFAV");

                    objRtn.totQCFLOW16 = AMTFAV;
                    objRtn.totQCPAX16 = PAXFAV;

                    objRtn.AVG16 = (objRtn.QCFLOW16 > 0) ? (objRtn.QCPAX16) / objRtn.QCFLOW16 : 0.00;
                    objRtn.totAVG16avg = (objRtn.totQCFLOW16 > 0) ? (objRtn.totQCPAX16) / objRtn.totQCFLOW16 : 0.00;

                    //----OAL------
                    objRtn.QCFLOW16OAL = rs01.getDouble("AMTFAVOAL");
                    objRtn.QCPAX16OAL = rs01.getDouble("PAXFAVOAL");

                    objRtn.totQCFLOW16OAL = AMTFAVOAL;
                    objRtn.totQCPAX16OAL = PAXFAVOAL;

                    objRtn.AVG16OAL = (objRtn.QCFLOW16OAL > 0) ? (objRtn.QCPAX16OAL) / objRtn.QCFLOW16OAL : 0.00;
                    objRtn.totAVG16avgOAL = (objRtn.totQCFLOW16OAL > 0) ? (objRtn.totQCPAX16OAL) / objRtn.totQCFLOW16OAL : 0.00;

                    objRtn.per16FlownOAL = (objRtn.QCFLOW16 > 0) ? (objRtn.QCFLOW16OAL * 100) / objRtn.QCFLOW16 : 0.00;
                    objRtn.per16PaxOAL = (objRtn.QCPAX16 > 0) ? (objRtn.QCPAX16OAL * 100) / objRtn.QCPAX16 : 0.00;

                    objRtn.totper16FlownOAL = (objRtn.totQCFLOW16 > 0) ? (objRtn.totQCFLOW16OAL * 100) / objRtn.totQCFLOW16 : 0.00;
                    objRtn.totper16PaxOAL = (objRtn.totQCPAX16 > 0) ? (objRtn.totQCPAX16OAL * 100) / objRtn.totQCPAX16 : 0.00;

                    //---------------DIFFERENCES ----------------------------- 
                    objRtn.diffQCFLOW = objRtn.QCFLOW16 - objRtn.QCFLOW15;
                    objRtn.diffQCPAX = objRtn.QCPAX16 - objRtn.QCPAX15;
                    objRtn.diffAVG = (objRtn.diffQCFLOW > 0) ? (objRtn.diffQCPAX) / objRtn.diffQCFLOW : 0.00;
                    objRtn.totDiffQCFLOW = objRtn.totQCFLOW16 - objRtn.totQCFLOW15;
                    objRtn.totDiffQCPAX = objRtn.totQCPAX16 - objRtn.totQCPAX15;
                    objRtn.totDiffAVG = (objRtn.totDiffQCFLOW > 0) ? (objRtn.totDiffQCPAX) / objRtn.totDiffQCFLOW : 0.00;

                    objRtn.diffQCFLOWOAL = objRtn.QCFLOW16OAL - objRtn.QCFLOW15OAL;
                    objRtn.diffQCPAXOAL = objRtn.QCPAX16OAL - objRtn.QCPAX15OAL;
                    objRtn.diffAVGOAL = (objRtn.diffQCFLOWOAL > 0) ? (objRtn.diffQCPAXOAL) / objRtn.diffQCFLOWOAL : 0.00;
                    objRtn.totDiffQCFLOWOAL = objRtn.totQCFLOW16OAL - objRtn.totQCFLOW15OAL;
                    objRtn.totDiffQCPAXOAL = objRtn.totQCPAX16OAL - objRtn.totQCPAX15OAL;
                    objRtn.totDiffAVGOAL = (objRtn.totDiffQCFLOWOAL > 0) ? (objRtn.totDiffQCPAXOAL) / objRtn.totDiffQCFLOWOAL : 0.00;

                    if (objRtn.diffQCFLOW < 0) {
                        objRtn.strDescripcion = "rojo";
                    }
                    if (objRtn.diffQCFLOWOAL < 0) {
                        objRtn.strDescripcion3 = "rojo";
                    }

                    if (objRtn.diffQCPAX < 0) {
                        objRtn.strDescripcion1 = "rojo";
                    }

                    if (objRtn.diffQCPAXOAL < 0) {
                        objRtn.strDescripcion4 = "rojo";
                    }
                    if (objRtn.diffAVG < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }

                    if (objRtn.diffAVGOAL < 0) {
                        objRtn.strDescripcion5 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
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
       public List<A2826Filter> loadSQP01325OAL(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;
        double PAXFAV = 0, PAXFAV_LY = 0, AMTFAV_LY = 0, AMTFAV = 0;
        double PAXFAVOAL = 0, PAXFAV_LYOAL = 0, AMTFAV_LYOAL = 0, AMTFAVOAL = 0;

        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02365(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                PAXFAV = rs01.getDouble("PAXFAV");
                AMTFAV = rs01.getDouble("AMTFAV");
                PAXFAV_LY = rs01.getDouble("PAXFAV_LY");
                AMTFAV_LY = rs01.getDouble("AMTFAV_LY");

                PAXFAVOAL = rs01.getDouble("PAXFAVOAL");
                AMTFAVOAL = rs01.getDouble("AMTFAVOAL");
                PAXFAV_LYOAL = rs01.getDouble("PAXFAV_LYOAL");
                AMTFAV_LYOAL = rs01.getDouble("AMTFAV_LYOAL");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    //objRtn.ZONA= filter.ZONA;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.strDescripcion6 = filter.strDescripcion6;
                    objRtn.CDEPART = rs01.getString("CDEPART") + " - " + rs01.getString("CARRIVA");
                    objRtn.strCDEPART = rs01.getString("DESC_CDEPART") + " - " + rs01.getString("DESC_CARRIVA");

                    objRtn.MDACP = "USD";
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");

                    //---------AÑO DEL FILTRO-------
                    // AÑO ACTUAL
                    objRtn.QCFLOW15 = rs01.getDouble("AMTFAV_LY");
                    objRtn.QCPAX15 = rs01.getDouble("PAXFAV_LY");

                    objRtn.totQCFLOW15 = AMTFAV_LY;
                    objRtn.totQCPAX15 = PAXFAV_LY;

                    objRtn.AVG15 = (objRtn.QCFLOW15 > 0) ? (objRtn.QCPAX15) / objRtn.QCFLOW15 : 0.00;
                    objRtn.totAVG15avg = (objRtn.totQCFLOW15 > 0) ? (objRtn.totQCPAX15) / objRtn.totQCFLOW15 : 0.00;

                    objRtn.QCFLOW15OAL = rs01.getDouble("AMTFAV_LYOAL");
                    objRtn.QCPAX15OAL = rs01.getDouble("PAXFAV_LYOAL");

                    objRtn.totQCFLOW15OAL = AMTFAV_LYOAL;
                    objRtn.totQCPAX15OAL = PAXFAV_LYOAL;

                    objRtn.AVG15OAL = (objRtn.QCFLOW15OAL > 0) ? (objRtn.QCPAX15OAL) / objRtn.QCFLOW15OAL : 0.00;
                    objRtn.totAVG15avgOAL = (objRtn.totQCFLOW15OAL > 0) ? (objRtn.totQCPAX15OAL) / objRtn.totQCFLOW15OAL : 0.00;

                    //-------AÑO ANTERIOR---------------
                    objRtn.QCFLOW16 = rs01.getDouble("AMTFAV");
                    objRtn.QCPAX16 = rs01.getDouble("PAXFAV");

                    objRtn.totQCFLOW16 = AMTFAV;
                    objRtn.totQCPAX16 = PAXFAV;

                    objRtn.AVG16 = (objRtn.QCFLOW16 > 0) ? (objRtn.QCPAX16) / objRtn.QCFLOW16 : 0.00;
                    objRtn.totAVG16avg = (objRtn.totQCFLOW16 > 0) ? (objRtn.totQCPAX16) / objRtn.totQCFLOW16 : 0.00;

                    objRtn.QCFLOW16OAL = rs01.getDouble("AMTFAVOAL");
                    objRtn.QCPAX16OAL = rs01.getDouble("PAXFAVOAL");

                    objRtn.totQCFLOW16OAL = AMTFAVOAL;
                    objRtn.totQCPAX16OAL = PAXFAVOAL;

                    objRtn.AVG16OAL = (objRtn.QCFLOW16OAL > 0) ? (objRtn.QCPAX16OAL) / objRtn.QCFLOW16OAL : 0.00;
                    objRtn.totAVG16avgOAL = (objRtn.totQCFLOW16OAL > 0) ? (objRtn.totQCPAX16OAL) / objRtn.totQCFLOW16OAL : 0.00;

                    //---------------DIFFERENCES ----------------------------- 
                    objRtn.diffQCFLOW = objRtn.QCFLOW16 - objRtn.QCFLOW15;
                    objRtn.diffQCPAX = objRtn.QCPAX16 - objRtn.QCPAX15;
                    objRtn.diffAVG = (objRtn.diffQCFLOW > 0) ? (objRtn.diffQCPAX) / objRtn.diffQCFLOW : 0.00;
                    objRtn.totDiffQCFLOW = objRtn.totQCFLOW16 - objRtn.totQCFLOW15;
                    objRtn.totDiffQCPAX = objRtn.totQCPAX16 - objRtn.totQCPAX15;
                    objRtn.totDiffAVG = (objRtn.totDiffQCFLOW > 0) ? (objRtn.totDiffQCPAX) / objRtn.totDiffQCFLOW : 0.00;

                    objRtn.diffQCFLOWOAL = objRtn.QCFLOW16OAL - objRtn.QCFLOW15OAL;
                    objRtn.diffQCPAXOAL = objRtn.QCPAX16OAL - objRtn.QCPAX15OAL;
                    objRtn.diffAVGOAL = (objRtn.diffQCFLOWOAL > 0) ? (objRtn.diffQCPAXOAL) / objRtn.diffQCFLOWOAL : 0.00;
                    objRtn.totDiffQCFLOWOAL = objRtn.totQCFLOW16OAL - objRtn.totQCFLOW15OAL;
                    objRtn.totDiffQCPAXOAL = objRtn.totQCPAX16OAL - objRtn.totQCPAX15OAL;
                    objRtn.totDiffAVGOAL = (objRtn.totDiffQCFLOWOAL > 0) ? (objRtn.totDiffQCPAXOAL) / objRtn.totDiffQCFLOWOAL : 0.00;

                    if (objRtn.diffQCFLOW < 0) {
                        objRtn.strDescripcion = "rojo";
                    }
                    if (objRtn.diffQCPAX < 0) {
                        objRtn.strDescripcion1 = "rojo";
                    }
                    if (objRtn.diffAVG < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }
                    if (objRtn.totDiffQCFLOW < 0) {
                        objRtn.strDescripcion3 = "rojo";
                    }
                    if (objRtn.totDiffQCPAX < 0) {
                        objRtn.strDescripcion4 = "rojo";
                    }
                    if (objRtn.totDiffAVG < 0) {
                        objRtn.strDescripcion5 = "rojo";
                    }

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
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

       public List<A2826Filter> loadSQP01327OALPax(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;

        double PAXFAVM_LY = 0, PAXFAVT_LY = 0, PAXFAVW_LY = 0, PAXFAVTH_LY = 0, PAXFAVF_LY = 0, PAXFAVS_LY = 0, PAXFAVSA_LY = 0, PAXFAVTT_LY = 0;
        double PAXFAVM = 0, PAXFAVT = 0, PAXFAVW = 0, PAXFAVTH = 0, PAXFAVF = 0, PAXFAVS = 0, PAXFAVSA = 0, PAXFAVTT = 0;

        double PAXFAVMOAL_LY = 0, PAXFAVTOAL_LY = 0, PAXFAVWOAL_LY = 0, PAXFAVTHOAL_LY = 0, PAXFAVFOAL_LY = 0, PAXFAVSOAL_LY = 0, PAXFAVSAOAL_LY = 0, PAXFAVTTOAL_LY = 0;
        double PAXFAVMOAL = 0, PAXFAVTOAL = 0, PAXFAVWOAL = 0, PAXFAVTHOAL = 0, PAXFAVFOAL = 0, PAXFAVSOAL = 0, PAXFAVSAOAL = 0, PAXFAVTTOAL = 0;

        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01327_1(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                PAXFAVM_LY = rs01.getDouble("PAXFAVM_LY");
                PAXFAVT_LY = rs01.getDouble("PAXFAVT_LY");
                PAXFAVW_LY = rs01.getDouble("PAXFAVW_LY");
                PAXFAVTH_LY = rs01.getDouble("PAXFAVTH_LY");
                PAXFAVF_LY = rs01.getDouble("PAXFAVF_LY");
                PAXFAVS_LY = rs01.getDouble("PAXFAVS_LY");
                PAXFAVSA_LY = rs01.getDouble("PAXFAVSA_LY");
                PAXFAVTT_LY = rs01.getDouble("TOTALPAX_LY");

                PAXFAVM = rs01.getDouble("PAXFAVM");
                PAXFAVT = rs01.getDouble("PAXFAVT");
                PAXFAVW = rs01.getDouble("PAXFAVW");
                PAXFAVTH = rs01.getDouble("PAXFAVTH");
                PAXFAVF = rs01.getDouble("PAXFAVF");
                PAXFAVS = rs01.getDouble("PAXFAVS");
                PAXFAVSA = rs01.getDouble("PAXFAVSA");
                PAXFAVTT = rs01.getDouble("TOTALPAX");

                //OAL
                PAXFAVMOAL_LY = rs01.getDouble("PAXFAVMOAL_LY");
                PAXFAVTOAL_LY = rs01.getDouble("PAXFAVTOAL_LY");
                PAXFAVWOAL_LY = rs01.getDouble("PAXFAVWOAL_LY");
                PAXFAVTHOAL_LY = rs01.getDouble("PAXFAVTHOAL_LY");
                PAXFAVFOAL_LY = rs01.getDouble("PAXFAVFOAL_LY");
                PAXFAVSOAL_LY = rs01.getDouble("PAXFAVSOAL_LY");
                PAXFAVSAOAL_LY = rs01.getDouble("PAXFAVSAOAL_LY");
                PAXFAVTTOAL_LY = rs01.getDouble("TOTALPAXOAL_LY");

                PAXFAVMOAL = rs01.getDouble("PAXFAVMOAL");
                PAXFAVTOAL = rs01.getDouble("PAXFAVTOAL");
                PAXFAVWOAL = rs01.getDouble("PAXFAVWOAL");
                PAXFAVTHOAL = rs01.getDouble("PAXFAVTHOAL");
                PAXFAVFOAL = rs01.getDouble("PAXFAVFOAL");
                PAXFAVSOAL = rs01.getDouble("PAXFAVSOAL");
                PAXFAVSAOAL = rs01.getDouble("PAXFAVSAOAL");
                PAXFAVTTOAL = rs01.getDouble("TOTALPAXOAL");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = rs01.getString("ZONA");
                    objRtn.ZONA = objRtn.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    //objRtn.strDescripcion = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";
                    //---------AÑO DEL ANTERIOR -------

                    objRtn.QCPAXM15 = rs01.getDouble("PAXFAVM_LY");
                    objRtn.QCPAXT15 = rs01.getDouble("PAXFAVT_LY");
                    objRtn.QCPAXW15 = rs01.getDouble("PAXFAVW_LY");
                    objRtn.QCPAXTH15 = rs01.getDouble("PAXFAVTH_LY");
                    objRtn.QCPAXF15 = rs01.getDouble("PAXFAVF_LY");
                    objRtn.QCPAXS15 = rs01.getDouble("PAXFAVS_LY");
                    objRtn.QCPAXSA15 = rs01.getDouble("PAXFAVSA_LY");
                    objRtn.QCPAXTT15 = rs01.getDouble("TOTALPAX_LY");

                    objRtn.QCPAXM15OAL = rs01.getDouble("PAXFAVMOAL_LY");
                    objRtn.QCPAXT15OAL = rs01.getDouble("PAXFAVTOAL_LY");
                    objRtn.QCPAXW15OAL = rs01.getDouble("PAXFAVWOAL_LY");
                    objRtn.QCPAXTH15OAL = rs01.getDouble("PAXFAVTHOAL_LY");
                    objRtn.QCPAXF15OAL = rs01.getDouble("PAXFAVFOAL_LY");
                    objRtn.QCPAXS15OAL = rs01.getDouble("PAXFAVSOAL_LY");
                    objRtn.QCPAXSA15OAL = rs01.getDouble("PAXFAVSAOAL_LY");
                    objRtn.QCPAXTT15OAL = rs01.getDouble("TOTALPAXOAL_LY");

                    //TOTALES
                    objRtn.totQCPAXM15 = PAXFAVM_LY;
                    objRtn.totQCPAXT15 = PAXFAVT_LY;
                    objRtn.totQCPAXW15 = PAXFAVW_LY;
                    objRtn.totQCPAXTH15 = PAXFAVTH_LY;
                    objRtn.totQCPAXF15 = PAXFAVF_LY;
                    objRtn.totQCPAXS15 = PAXFAVS_LY;
                    objRtn.totQCPAXSA15 = PAXFAVSA_LY;
                    objRtn.totQCPAXTT15 = PAXFAVTT_LY;

                    objRtn.totQCPAXM15OAL = PAXFAVMOAL_LY;
                    objRtn.totQCPAXT15OAL = PAXFAVTOAL_LY;
                    objRtn.totQCPAXW15OAL = PAXFAVWOAL_LY;
                    objRtn.totQCPAXTH15OAL = PAXFAVTHOAL_LY;
                    objRtn.totQCPAXF15OAL = PAXFAVFOAL_LY;
                    objRtn.totQCPAXS15OAL = PAXFAVSOAL_LY;
                    objRtn.totQCPAXSA15OAL = PAXFAVSAOAL_LY;
                    objRtn.totQCPAXTT15OAL = PAXFAVTTOAL_LY;

                    //-------AÑO ANTERIOR FILTRO---------------
                    objRtn.QCPAXM16 = rs01.getDouble("PAXFAVM");
                    objRtn.QCPAXT16 = rs01.getDouble("PAXFAVT");
                    objRtn.QCPAXW16 = rs01.getDouble("PAXFAVW");
                    objRtn.QCPAXTH16 = rs01.getDouble("PAXFAVTH");
                    objRtn.QCPAXF16 = rs01.getDouble("PAXFAVF");
                    objRtn.QCPAXS16 = rs01.getDouble("PAXFAVS");
                    objRtn.QCPAXSA16 = rs01.getDouble("PAXFAVSA");
                    objRtn.QCPAXTT16 = rs01.getDouble("TOTALPAX");

                    objRtn.QCPAXM16OAL = rs01.getDouble("PAXFAVMOAL");
                    objRtn.QCPAXT16OAL = rs01.getDouble("PAXFAVTOAL");
                    objRtn.QCPAXW16OAL = rs01.getDouble("PAXFAVWOAL");
                    objRtn.QCPAXTH16OAL = rs01.getDouble("PAXFAVTHOAL");
                    objRtn.QCPAXF16OAL = rs01.getDouble("PAXFAVFOAL");
                    objRtn.QCPAXS16OAL = rs01.getDouble("PAXFAVSOAL");
                    objRtn.QCPAXSA16OAL = rs01.getDouble("PAXFAVSAOAL");
                    objRtn.QCPAXTT16OAL = rs01.getDouble("TOTALPAXOAL");

                    //TOTALES
                    objRtn.totQCPAXM16 = PAXFAVM;
                    objRtn.totQCPAXT16 = PAXFAVT;
                    objRtn.totQCPAXW16 = PAXFAVW;
                    objRtn.totQCPAXTH16 = PAXFAVTH;
                    objRtn.totQCPAXF16 = PAXFAVF;
                    objRtn.totQCPAXS16 = PAXFAVS;
                    objRtn.totQCPAXSA16 = PAXFAVSA;
                    objRtn.totQCPAXTT16 = PAXFAVTT;

                    objRtn.totQCPAXM16OAL = PAXFAVMOAL;
                    objRtn.totQCPAXT16OAL = PAXFAVTOAL;
                    objRtn.totQCPAXW16OAL = PAXFAVWOAL;
                    objRtn.totQCPAXTH16OAL = PAXFAVTHOAL;
                    objRtn.totQCPAXF16OAL = PAXFAVFOAL;
                    objRtn.totQCPAXS16OAL = PAXFAVSOAL;
                    objRtn.totQCPAXSA16OAL = PAXFAVSAOAL;
                    objRtn.totQCPAXTT16OAL = PAXFAVTTOAL;

                    //DIFERENCIA PAX
                   /* objRtn.diffQCPAXM = objRtn.QCPAXM16 - objRtn.QCPAXM15;
                     objRtn.diffQCPAXT = objRtn.QCPAXT16 - objRtn.QCPAXT15;
                     objRtn.diffQCPAXW = objRtn.QCPAXW16 - objRtn.QCPAXW15;
                     objRtn.diffQCPAXTH = objRtn.QCPAXTH16 - objRtn.QCPAXTH15;
                     objRtn.diffQCPAXF = objRtn.QCPAXF16 - objRtn.QCPAXF15;
                     objRtn.diffQCPAXS = objRtn.QCPAXS16 - objRtn.QCPAXS15;
                     objRtn.diffQCPAXSA = objRtn.QCPAXSA16 - objRtn.QCPAXSA15;
                     objRtn.diffQCPAXTT = objRtn.diffQCPAXM + objRtn.diffQCPAXT + objRtn.diffQCPAXW + objRtn.diffQCPAXTH + objRtn.diffQCPAXF + objRtn.diffQCPAXS + objRtn.diffQCPAXSA;
                     */
                    // TOTALES DIFERENCIA PAX
                    /*objRtn.difftotQCPAXM = objRtn.totQCPAXM16 - objRtn.totQCPAXM15;
                     objRtn.difftotQCPAXT = objRtn.totQCPAXT16 - objRtn.totQCPAXT15;
                     objRtn.difftotQCPAXW = objRtn.totQCPAXW16 - objRtn.totQCPAXW15;
                     objRtn.difftotQCPAXTH = objRtn.totQCPAXTH16 - objRtn.totQCPAXTH15;
                     objRtn.difftotQCPAXF = objRtn.totQCPAXF16 - objRtn.totQCPAXF15;
                     objRtn.difftotQCPAXS = objRtn.totQCPAXS16 - objRtn.totQCPAXS15;
                     objRtn.difftotQCPAXSA = objRtn.totQCPAXSA16 - objRtn.totQCPAXSA15;
                     objRtn.difftotQCPAXTT = objRtn.difftotQCPAXM + objRtn.difftotQCPAXT + objRtn.difftotQCPAXW + objRtn.difftotQCPAXTH + objRtn.difftotQCPAXF + objRtn.difftotQCPAXS + objRtn.difftotQCPAXSA;
                    
                     if (objRtn.diffQCPAXM < 0) {
                     objRtn.strDescripcion1_1 = "rojo";
                     }
                     if (objRtn.diffQCPAXT < 0) {
                     objRtn.strDescripcion2_2 = "rojo";
                     }
                     if (objRtn.diffQCPAXW < 0) {
                     objRtn.strDescripcion3_3 = "rojo";
                     }
                     if (objRtn.diffQCPAXTH < 0) {
                     objRtn.strDescripcion4_4 = "rojo";
                     }
                     if (objRtn.diffQCPAXF < 0) {
                     objRtn.strDescripcion5_5 = "rojo";
                     }
                     if (objRtn.diffQCPAXS < 0) {
                     objRtn.strDescripcion6_6 = "rojo";
                     }
                     if (objRtn.diffQCPAXSA < 0) {
                     objRtn.strDescripcion7_7 = "rojo";
                     }
                     if (objRtn.diffQCPAXTT < 0) {
                     objRtn.strDescripcion10 = "rojo";
                     }*/
                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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
       
        public List<A2826Filter> loadSQP01327OALFli(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;

        double AMTFAVM_LY = 0, AMTFAVT_LY = 0, AMTFAVW_LY = 0, AMTFAVTH_LY = 0, AMTFAVF_LY = 0, AMTFAVS_LY = 0, AMTFAVSA_LY = 0, AMTFAVTT_LY = 0;
        double AMTFAVM = 0, AMTFAVT = 0, AMTFAVW = 0, AMTFAVTH = 0, AMTFAVF = 0, AMTFAVS = 0, AMTFAVSA = 0, AMTFAVTT = 0;

        double AMTFAVMOAL_LY = 0, AMTFAVTOAL_LY = 0, AMTFAVWOAL_LY = 0, AMTFAVTHOAL_LY = 0, AMTFAVFOAL_LY = 0, AMTFAVSOAL_LY = 0, AMTFAVSAOAL_LY = 0, AMTFAVTTOAL_LY = 0;
        double AMTFAVMOAL = 0, AMTFAVTOAL = 0, AMTFAVWOAL = 0, AMTFAVTHOAL = 0, AMTFAVFOAL = 0, AMTFAVSOAL = 0, AMTFAVSAOAL = 0, AMTFAVTTOAL = 0;

        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01327_2(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                AMTFAVM_LY = rs01.getDouble("AMTFAVM_LY");
                AMTFAVT_LY = rs01.getDouble("AMTFAVT_LY");
                AMTFAVW_LY = rs01.getDouble("AMTFAVW_LY");
                AMTFAVTH_LY = rs01.getDouble("AMTFAVTH_LY");
                AMTFAVF_LY = rs01.getDouble("AMTFAVF_LY");
                AMTFAVS_LY = rs01.getDouble("AMTFAVS_LY");
                AMTFAVSA_LY = rs01.getDouble("AMTFAVSA_LY");
                AMTFAVTT_LY = rs01.getDouble("TOTALAMT_LY");

                AMTFAVM = rs01.getDouble("AMTFAVM");
                AMTFAVT = rs01.getDouble("AMTFAVT");
                AMTFAVW = rs01.getDouble("AMTFAVW");
                AMTFAVTH = rs01.getDouble("AMTFAVTH");
                AMTFAVF = rs01.getDouble("AMTFAVF");
                AMTFAVS = rs01.getDouble("AMTFAVS");
                AMTFAVSA = rs01.getDouble("AMTFAVSA");
                AMTFAVTT = rs01.getDouble("TOTALAMT");
                //OAL
                AMTFAVMOAL_LY = rs01.getDouble("AMTFAVMOAL_LY");
                AMTFAVTOAL_LY = rs01.getDouble("AMTFAVTOAL_LY");
                AMTFAVWOAL_LY = rs01.getDouble("AMTFAVWOAL_LY");
                AMTFAVTHOAL_LY = rs01.getDouble("AMTFAVTHOAL_LY");
                AMTFAVFOAL_LY = rs01.getDouble("AMTFAVFOAL_LY");
                AMTFAVSOAL_LY = rs01.getDouble("AMTFAVSOAL_LY");
                AMTFAVSAOAL_LY = rs01.getDouble("AMTFAVSAOAL_LY");
                AMTFAVTTOAL_LY = rs01.getDouble("TOTALAMTOAL_LY");

                AMTFAVMOAL = rs01.getDouble("AMTFAVMOAL");
                AMTFAVTOAL = rs01.getDouble("AMTFAVTOAL");
                AMTFAVWOAL = rs01.getDouble("AMTFAVWOAL");
                AMTFAVTHOAL = rs01.getDouble("AMTFAVTHOAL");
                AMTFAVFOAL = rs01.getDouble("AMTFAVFOAL");
                AMTFAVSOAL = rs01.getDouble("AMTFAVSOAL");
                AMTFAVSAOAL = rs01.getDouble("AMTFAVSAOAL");
                AMTFAVTTOAL = rs01.getDouble("TOTALAMTOAL");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = rs01.getString("ZONA");
                    objRtn.ZONA = objRtn.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    //objRtn.strDescripcion = rs01.getString("DESC_ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescripcion = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    objRtn.MDACP = "USD";
                    //---------AÑO DEL ANTERIOR -------

                    objRtn.QCFLOWM15 = rs01.getDouble("AMTFAVM_LY");
                    objRtn.QCFLOWT15 = rs01.getDouble("AMTFAVT_LY");
                    objRtn.QCFLOWW15 = rs01.getDouble("AMTFAVW_LY");
                    objRtn.QCFLOWTH15 = rs01.getDouble("AMTFAVTH_LY");
                    objRtn.QCFLOWF15 = rs01.getDouble("AMTFAVF_LY");
                    objRtn.QCFLOWS15 = rs01.getDouble("AMTFAVS_LY");
                    objRtn.QCFLOWSA15 = rs01.getDouble("AMTFAVSA_LY");
                    objRtn.QCFLOWTT15 = rs01.getDouble("TOTALAMT_LY");

                    objRtn.QCFLOWM15OAL = rs01.getDouble("AMTFAVMOAL_LY");
                    objRtn.QCFLOWT15OAL = rs01.getDouble("AMTFAVTOAL_LY");
                    objRtn.QCFLOWW15OAL = rs01.getDouble("AMTFAVWOAL_LY");
                    objRtn.QCFLOWTH15OAL = rs01.getDouble("AMTFAVTHOAL_LY");
                    objRtn.QCFLOWF15OAL = rs01.getDouble("AMTFAVFOAL_LY");
                    objRtn.QCFLOWS15OAL = rs01.getDouble("AMTFAVSOAL_LY");
                    objRtn.QCFLOWSA15OAL = rs01.getDouble("AMTFAVSAOAL_LY");
                    objRtn.QCFLOWTT15OAL = rs01.getDouble("TOTALAMTOAL_LY");
                    //TOTALES
                    objRtn.totQCFLOWM15 = AMTFAVM_LY;
                    objRtn.totQCFLOWT15 = AMTFAVT_LY;
                    objRtn.totQCFLOWW15 = AMTFAVW_LY;
                    objRtn.totQCFLOWTH15 = AMTFAVTH_LY;
                    objRtn.totQCFLOWF15 = AMTFAVF_LY;
                    objRtn.totQCFLOWS15 = AMTFAVS_LY;
                    objRtn.totQCFLOWSA15 = AMTFAVSA_LY;
                    objRtn.totQCFLOWTT15 = AMTFAVTT_LY;

                    objRtn.totQCFLOWM15OAL = AMTFAVMOAL_LY;
                    objRtn.totQCFLOWT15OAL = AMTFAVTOAL_LY;
                    objRtn.totQCFLOWW15OAL = AMTFAVWOAL_LY;
                    objRtn.totQCFLOWTH15OAL = AMTFAVTHOAL_LY;
                    objRtn.totQCFLOWF15OAL = AMTFAVFOAL_LY;
                    objRtn.totQCFLOWS15OAL = AMTFAVSOAL_LY;
                    objRtn.totQCFLOWSA15OAL = AMTFAVSAOAL_LY;
                    objRtn.totQCFLOWTT15OAL = AMTFAVTTOAL_LY;

                    //-------AÑO ANTERIOR FILTRO---------------
                    objRtn.QCFLOWM16 = rs01.getDouble("AMTFAVM");
                    objRtn.QCFLOWT16 = rs01.getDouble("AMTFAVT");
                    objRtn.QCFLOWW16 = rs01.getDouble("AMTFAVW");
                    objRtn.QCFLOWTH16 = rs01.getDouble("AMTFAVTH");
                    objRtn.QCFLOWF16 = rs01.getDouble("AMTFAVF");
                    objRtn.QCFLOWS16 = rs01.getDouble("AMTFAVS");
                    objRtn.QCFLOWSA16 = rs01.getDouble("AMTFAVSA");
                    objRtn.QCFLOWTT16 = rs01.getDouble("TOTALAMT");

                    objRtn.QCFLOWM16OAL = rs01.getDouble("AMTFAVMOAL");
                    objRtn.QCFLOWT16OAL = rs01.getDouble("AMTFAVTOAL");
                    objRtn.QCFLOWW16OAL = rs01.getDouble("AMTFAVWOAL");
                    objRtn.QCFLOWTH16OAL = rs01.getDouble("AMTFAVTHOAL");
                    objRtn.QCFLOWF16OAL = rs01.getDouble("AMTFAVFOAL");
                    objRtn.QCFLOWS16OAL = rs01.getDouble("AMTFAVSOAL");
                    objRtn.QCFLOWSA16OAL = rs01.getDouble("AMTFAVSAOAL");
                    objRtn.QCFLOWTT16OAL = rs01.getDouble("TOTALAMTOAL");
                    //TOTALES
                    objRtn.totQCFLOWM16 = AMTFAVM;
                    objRtn.totQCFLOWT16 = AMTFAVT;
                    objRtn.totQCFLOWW16 = AMTFAVW;
                    objRtn.totQCFLOWTH16 = AMTFAVTH;
                    objRtn.totQCFLOWF16 = AMTFAVF;
                    objRtn.totQCFLOWS16 = AMTFAVS;
                    objRtn.totQCFLOWSA16 = AMTFAVSA;
                    objRtn.totQCFLOWTT16 = AMTFAVTT;

                    objRtn.totQCFLOWM16OAL = AMTFAVMOAL;
                    objRtn.totQCFLOWT16OAL = AMTFAVTOAL;
                    objRtn.totQCFLOWW16OAL = AMTFAVWOAL;
                    objRtn.totQCFLOWTH16OAL = AMTFAVTHOAL;
                    objRtn.totQCFLOWF16OAL = AMTFAVFOAL;
                    objRtn.totQCFLOWS16OAL = AMTFAVSOAL;
                    objRtn.totQCFLOWSA16OAL = AMTFAVSAOAL;
                    objRtn.totQCFLOWTT16OAL = AMTFAVTTOAL;

                    //DIFERENCIA FLOWN
                   /* objRtn.diffQCFLOWM = objRtn.QCFLOWM16 - objRtn.QCFLOWM15;
                     objRtn.diffQCFLOWT = objRtn.QCFLOWT16 - objRtn.QCFLOWT15;
                     objRtn.diffQCFLOWW = objRtn.QCFLOWW16 - objRtn.QCFLOWW15;
                     objRtn.diffQCFLOWTH = objRtn.QCFLOWTH16 - objRtn.QCFLOWTH15;
                     objRtn.diffQCFLOWF = objRtn.QCFLOWF16 - objRtn.QCFLOWF15;
                     objRtn.diffQCFLOWS = objRtn.QCFLOWS16 - objRtn.QCFLOWS15;
                     objRtn.diffQCFLOWSA = objRtn.QCFLOWSA16 - objRtn.QCFLOWSA15;
                     objRtn.diffQCFLOWTT = objRtn.diffQCFLOWM + objRtn.diffQCFLOWT + objRtn.diffQCFLOWW + objRtn.diffQCFLOWTH + objRtn.diffQCFLOWF + objRtn.diffQCFLOWS + objRtn.diffQCFLOWSA;
                     // TOTALES DIFERENCIA FLOWN
                     objRtn.difftotQCFLOWM = objRtn.totQCFLOWM16 - objRtn.totQCFLOWM15;
                     objRtn.difftotQCFLOWT = objRtn.totQCFLOWT16 - objRtn.totQCFLOWT15;
                     objRtn.difftotQCFLOWW = objRtn.totQCFLOWW16 - objRtn.totQCFLOWW15;
                     objRtn.difftotQCFLOWTH = objRtn.totQCFLOWTH16 - objRtn.totQCFLOWTH15;
                     objRtn.difftotQCFLOWF = objRtn.totQCFLOWF16 - objRtn.totQCFLOWF15;
                     objRtn.difftotQCFLOWS = objRtn.totQCFLOWS16 - objRtn.totQCFLOWS15;
                     objRtn.difftotQCFLOWSA = objRtn.totQCFLOWSA16 - objRtn.totQCFLOWSA15;
                     objRtn.difftotQCFLOWTT = objRtn.difftotQCFLOWM + objRtn.difftotQCFLOWT + objRtn.difftotQCFLOWW + objRtn.difftotQCFLOWTH + objRtn.difftotQCFLOWF + objRtn.difftotQCFLOWS + objRtn.difftotQCFLOWSA;
                    
                     
                     if (objRtn.diffQCFLOWM < 0) {
                     objRtn.strDescripcion11 = "rojo";
                     }
                     if (objRtn.diffQCFLOWT < 0) {
                     objRtn.strDescripcion22 = "rojo";
                     }
                     if (objRtn.diffQCFLOWW < 0) {
                     objRtn.strDescripcion33 = "rojo";
                     }
                     if (objRtn.diffQCFLOWTH < 0) {
                     objRtn.strDescripcion44 = "rojo";
                     }
                     if (objRtn.diffQCFLOWF < 0) {
                     objRtn.strDescripcion55 = "rojo";
                     }
                     if (objRtn.diffQCFLOWS < 0) {
                     objRtn.strDescripcion66 = "rojo";
                     }
                     if (objRtn.diffQCFLOWSA < 0) {
                     objRtn.strDescripcion77 = "rojo";
                     }
                     if (objRtn.diffQCFLOWTT < 0) {
                     objRtn.strDescripcion9 = "rojo";
                     }*/
                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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
     public List<A2826Filter> loadSQP01328OALPax(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;

        double PAXFAVM_LY = 0, PAXFAVT_LY = 0, PAXFAVW_LY = 0, PAXFAVTH_LY = 0, PAXFAVF_LY = 0, PAXFAVS_LY = 0, PAXFAVSA_LY = 0, PAXFAVTT_LY = 0;
        double PAXFAVM = 0, PAXFAVT = 0, PAXFAVW = 0, PAXFAVTH = 0, PAXFAVF = 0, PAXFAVS = 0, PAXFAVSA = 0, PAXFAVTT = 0;

        double PAXFAVMOAL_LY = 0, PAXFAVTOAL_LY = 0, PAXFAVWOAL_LY = 0, PAXFAVTHOAL_LY = 0, PAXFAVFOAL_LY = 0, PAXFAVSOAL_LY = 0, PAXFAVSAOAL_LY = 0, PAXFAVTTOAL_LY = 0;
        double PAXFAVMOAL = 0, PAXFAVTOAL = 0, PAXFAVWOAL = 0, PAXFAVTHOAL = 0, PAXFAVFOAL = 0, PAXFAVSOAL = 0, PAXFAVSAOAL = 0, PAXFAVTTOAL = 0;

        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01328_2(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                PAXFAVM_LY = rs01.getDouble("PAXFAVM_LY");
                PAXFAVT_LY = rs01.getDouble("PAXFAVT_LY");
                PAXFAVW_LY = rs01.getDouble("PAXFAVW_LY");
                PAXFAVTH_LY = rs01.getDouble("PAXFAVTH_LY");
                PAXFAVF_LY = rs01.getDouble("PAXFAVF_LY");
                PAXFAVS_LY = rs01.getDouble("PAXFAVS_LY");
                PAXFAVSA_LY = rs01.getDouble("PAXFAVSA_LY");
                PAXFAVTT_LY = rs01.getDouble("TOTALPAX_LY");

                PAXFAVM = rs01.getDouble("PAXFAVM");
                PAXFAVT = rs01.getDouble("PAXFAVT");
                PAXFAVW = rs01.getDouble("PAXFAVW");
                PAXFAVTH = rs01.getDouble("PAXFAVTH");
                PAXFAVF = rs01.getDouble("PAXFAVF");
                PAXFAVS = rs01.getDouble("PAXFAVS");
                PAXFAVSA = rs01.getDouble("PAXFAVSA");
                PAXFAVTT = rs01.getDouble("TOTALPAX");
                //OAL
                PAXFAVMOAL_LY = rs01.getDouble("PAXFAVMOAL_LY");
                PAXFAVTOAL_LY = rs01.getDouble("PAXFAVTOAL_LY");
                PAXFAVWOAL_LY = rs01.getDouble("PAXFAVWOAL_LY");
                PAXFAVTHOAL_LY = rs01.getDouble("PAXFAVTHOAL_LY");
                PAXFAVFOAL_LY = rs01.getDouble("PAXFAVFOAL_LY");
                PAXFAVSOAL_LY = rs01.getDouble("PAXFAVSOAL_LY");
                PAXFAVSAOAL_LY = rs01.getDouble("PAXFAVSAOAL_LY");
                PAXFAVTTOAL_LY = rs01.getDouble("TOTALPAXOAL_LY");

                PAXFAVMOAL = rs01.getDouble("PAXFAVMOAL");
                PAXFAVTOAL = rs01.getDouble("PAXFAVTOAL");
                PAXFAVWOAL = rs01.getDouble("PAXFAVWOAL");
                PAXFAVTHOAL = rs01.getDouble("PAXFAVTHOAL");
                PAXFAVFOAL = rs01.getDouble("PAXFAVFOAL");
                PAXFAVSOAL = rs01.getDouble("PAXFAVSOAL");
                PAXFAVSAOAL = rs01.getDouble("PAXFAVSAOAL");
                PAXFAVTTOAL = rs01.getDouble("TOTALPAXOAL");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.strDescripcion = filter.strDescripcion;

                    objRtn.CDEPART = rs01.getString("CDEPART") + " - " + rs01.getString("CARRIVA");
                    objRtn.strCDEPART = rs01.getString("DESC_CDEPART") + " - " + rs01.getString("DESC_CARRIVA");
                    objRtn.MDACP = "USD";
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    //---------AÑO DEL ANTERIOR -------

                    objRtn.QCPAXM15 = rs01.getDouble("PAXFAVM_LY");
                    objRtn.QCPAXT15 = rs01.getDouble("PAXFAVT_LY");
                    objRtn.QCPAXW15 = rs01.getDouble("PAXFAVW_LY");
                    objRtn.QCPAXTH15 = rs01.getDouble("PAXFAVTH_LY");
                    objRtn.QCPAXF15 = rs01.getDouble("PAXFAVF_LY");
                    objRtn.QCPAXS15 = rs01.getDouble("PAXFAVS_LY");
                    objRtn.QCPAXSA15 = rs01.getDouble("PAXFAVSA_LY");
                    objRtn.QCPAXTT15 = rs01.getDouble("TOTALPAX_LY");

                    objRtn.QCPAXM15OAL = rs01.getDouble("PAXFAVMOAL_LY");
                    objRtn.QCPAXT15OAL = rs01.getDouble("PAXFAVTOAL_LY");
                    objRtn.QCPAXW15OAL = rs01.getDouble("PAXFAVWOAL_LY");
                    objRtn.QCPAXTH15OAL = rs01.getDouble("PAXFAVTHOAL_LY");
                    objRtn.QCPAXF15OAL = rs01.getDouble("PAXFAVFOAL_LY");
                    objRtn.QCPAXS15OAL = rs01.getDouble("PAXFAVSOAL_LY");
                    objRtn.QCPAXSA15OAL = rs01.getDouble("PAXFAVSAOAL_LY");
                    objRtn.QCPAXTT15OAL = rs01.getDouble("TOTALPAXOAL_LY");

                    //TOTALES
                    objRtn.totQCPAXM15 = PAXFAVM_LY;
                    objRtn.totQCPAXT15 = PAXFAVT_LY;
                    objRtn.totQCPAXW15 = PAXFAVW_LY;
                    objRtn.totQCPAXTH15 = PAXFAVTH_LY;
                    objRtn.totQCPAXF15 = PAXFAVF_LY;
                    objRtn.totQCPAXS15 = PAXFAVS_LY;
                    objRtn.totQCPAXSA15 = PAXFAVSA_LY;
                    objRtn.totQCPAXTT15 = PAXFAVTT_LY;

                    objRtn.totQCPAXM15OAL = PAXFAVMOAL_LY;
                    objRtn.totQCPAXT15OAL = PAXFAVTOAL_LY;
                    objRtn.totQCPAXW15OAL = PAXFAVWOAL_LY;
                    objRtn.totQCPAXTH15OAL = PAXFAVTHOAL_LY;
                    objRtn.totQCPAXF15OAL = PAXFAVFOAL_LY;
                    objRtn.totQCPAXS15OAL = PAXFAVSOAL_LY;
                    objRtn.totQCPAXSA15OAL = PAXFAVSAOAL_LY;
                    objRtn.totQCPAXTT15OAL = PAXFAVTTOAL_LY;

                    //-------AÑO ANTERIOR FILTRO---------------
                    objRtn.QCPAXM16 = rs01.getDouble("PAXFAVM");
                    objRtn.QCPAXT16 = rs01.getDouble("PAXFAVT");
                    objRtn.QCPAXW16 = rs01.getDouble("PAXFAVW");
                    objRtn.QCPAXTH16 = rs01.getDouble("PAXFAVTH");
                    objRtn.QCPAXF16 = rs01.getDouble("PAXFAVF");
                    objRtn.QCPAXS16 = rs01.getDouble("PAXFAVS");
                    objRtn.QCPAXSA16 = rs01.getDouble("PAXFAVSA");
                    objRtn.QCPAXTT16 = rs01.getDouble("TOTALPAX");

                    objRtn.QCPAXM16OAL = rs01.getDouble("PAXFAVMOAL");
                    objRtn.QCPAXT16OAL = rs01.getDouble("PAXFAVTOAL");
                    objRtn.QCPAXW16OAL = rs01.getDouble("PAXFAVWOAL");
                    objRtn.QCPAXTH16OAL = rs01.getDouble("PAXFAVTHOAL");
                    objRtn.QCPAXF16OAL = rs01.getDouble("PAXFAVFOAL");
                    objRtn.QCPAXS16OAL = rs01.getDouble("PAXFAVSOAL");
                    objRtn.QCPAXSA16OAL = rs01.getDouble("PAXFAVSAOAL");
                    objRtn.QCPAXTT16OAL = rs01.getDouble("TOTALPAXOAL");

                    //TOTALES
                    objRtn.totQCPAXM16 = PAXFAVM;
                    objRtn.totQCPAXT16 = PAXFAVT;
                    objRtn.totQCPAXW16 = PAXFAVW;
                    objRtn.totQCPAXTH16 = PAXFAVTH;
                    objRtn.totQCPAXF16 = PAXFAVF;
                    objRtn.totQCPAXS16 = PAXFAVS;
                    objRtn.totQCPAXSA16 = PAXFAVSA;
                    objRtn.totQCPAXTT16 = PAXFAVTT;

                    objRtn.totQCPAXM16OAL = PAXFAVMOAL;
                    objRtn.totQCPAXT16OAL = PAXFAVTOAL;
                    objRtn.totQCPAXW16OAL = PAXFAVWOAL;
                    objRtn.totQCPAXTH16OAL = PAXFAVTHOAL;
                    objRtn.totQCPAXF16OAL = PAXFAVFOAL;
                    objRtn.totQCPAXS16OAL = PAXFAVSOAL;
                    objRtn.totQCPAXSA16OAL = PAXFAVSAOAL;
                    objRtn.totQCPAXTT16OAL = PAXFAVTTOAL;
                    //DIFERENCIA PAX
                   /* objRtn.diffQCPAXM = objRtn.QCPAXM16 - objRtn.QCPAXM15;
                     objRtn.diffQCPAXT = objRtn.QCPAXT16 - objRtn.QCPAXT15;
                     objRtn.diffQCPAXW = objRtn.QCPAXW16 - objRtn.QCPAXW15;
                     objRtn.diffQCPAXTH = objRtn.QCPAXTH16 - objRtn.QCPAXTH15;
                     objRtn.diffQCPAXF = objRtn.QCPAXF16 - objRtn.QCPAXF15;
                     objRtn.diffQCPAXS = objRtn.QCPAXS16 - objRtn.QCPAXS15;
                     objRtn.diffQCPAXSA = objRtn.QCPAXSA16 - objRtn.QCPAXSA15;
                     objRtn.diffQCPAXTT = objRtn.diffQCPAXM + objRtn.diffQCPAXT + objRtn.diffQCPAXW + objRtn.diffQCPAXTH + objRtn.diffQCPAXF + objRtn.diffQCPAXS + objRtn.diffQCPAXSA;

                     // TOTALES DIFERENCIA PAX
                     objRtn.difftotQCPAXM = objRtn.totQCPAXM16 - objRtn.totQCPAXM15;
                     objRtn.difftotQCPAXT = objRtn.totQCPAXT16 - objRtn.totQCPAXT15;
                     objRtn.difftotQCPAXW = objRtn.totQCPAXW16 - objRtn.totQCPAXW15;
                     objRtn.difftotQCPAXTH = objRtn.totQCPAXTH16 - objRtn.totQCPAXTH15;
                     objRtn.difftotQCPAXF = objRtn.totQCPAXF16 - objRtn.totQCPAXF15;
                     objRtn.difftotQCPAXS = objRtn.totQCPAXS16 - objRtn.totQCPAXS15;
                     objRtn.difftotQCPAXSA = objRtn.totQCPAXSA16 - objRtn.totQCPAXSA15;
                     objRtn.difftotQCPAXTT = objRtn.difftotQCPAXM + objRtn.difftotQCPAXT + objRtn.difftotQCPAXW + objRtn.difftotQCPAXTH + objRtn.difftotQCPAXF + objRtn.difftotQCPAXS + objRtn.difftotQCPAXSA;
                    

                     if (objRtn.diffQCPAXM < 0) {
                     objRtn.strDescripcion1_1 = "rojo";
                     }
                     if (objRtn.diffQCPAXT < 0) {
                     objRtn.strDescripcion2_2 = "rojo";
                     }
                     if (objRtn.diffQCPAXW < 0) {
                     objRtn.strDescripcion3_3 = "rojo";
                     }
                     if (objRtn.diffQCPAXTH < 0) {
                     objRtn.strDescripcion4_4 = "rojo";
                     }
                     if (objRtn.diffQCPAXF < 0) {
                     objRtn.strDescripcion5_5 = "rojo";
                     }
                     if (objRtn.diffQCPAXS < 0) {
                     objRtn.strDescripcion6_6 = "rojo";
                     }
                     if (objRtn.diffQCPAXSA < 0) {
                     objRtn.strDescripcion7_7 = "rojo";
                     }
                     if (objRtn.diffQCPAXTT < 0) {
                     objRtn.strDescripcion10 = "rojo";
                     }*/

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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
      public List<A2826Filter> loadSQP01328OALFli(A2826Filter filter) throws SQLException, Exception {

        List<A2826Filter> lstRtn = new ArrayList<A2826Filter>(0);
        A2826Filter objRtn;

        double AMTFAVM_LY = 0, AMTFAVT_LY = 0, AMTFAVW_LY = 0, AMTFAVTH_LY = 0, AMTFAVF_LY = 0, AMTFAVS_LY = 0, AMTFAVSA_LY = 0, AMTFAVTT_LY = 0;
        double AMTFAVM = 0, AMTFAVT = 0, AMTFAVW = 0, AMTFAVTH = 0, AMTFAVF = 0, AMTFAVS = 0, AMTFAVSA = 0, AMTFAVTT = 0;

        double AMTFAVMOAL_LY = 0, AMTFAVTOAL_LY = 0, AMTFAVWOAL_LY = 0, AMTFAVTHOAL_LY = 0, AMTFAVFOAL_LY = 0, AMTFAVSOAL_LY = 0, AMTFAVSAOAL_LY = 0, AMTFAVTTOAL_LY = 0;
        double AMTFAVMOAL = 0, AMTFAVTOAL = 0, AMTFAVWOAL = 0, AMTFAVTHOAL = 0, AMTFAVFOAL = 0, AMTFAVSOAL = 0, AMTFAVSAOAL = 0, AMTFAVTTOAL = 0;

        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01328_3(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom);
            cstmt01.setString(3, filter.IN_ZONA);
            cstmt01.setString(4, filter.IN_CARRI);
            cstmt01.setString(5, filter.CCIA);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                AMTFAVM_LY = rs01.getDouble("AMTFAVM_LY");
                AMTFAVT_LY = rs01.getDouble("AMTFAVT_LY");
                AMTFAVW_LY = rs01.getDouble("AMTFAVW_LY");
                AMTFAVTH_LY = rs01.getDouble("AMTFAVTH_LY");
                AMTFAVF_LY = rs01.getDouble("AMTFAVF_LY");
                AMTFAVS_LY = rs01.getDouble("AMTFAVS_LY");
                AMTFAVSA_LY = rs01.getDouble("AMTFAVSA_LY");
                AMTFAVTT_LY = rs01.getDouble("TOTALAMT_LY");

                AMTFAVM = rs01.getDouble("AMTFAVM");
                AMTFAVT = rs01.getDouble("AMTFAVT");
                AMTFAVW = rs01.getDouble("AMTFAVW");
                AMTFAVTH = rs01.getDouble("AMTFAVTH");
                AMTFAVF = rs01.getDouble("AMTFAVF");
                AMTFAVS = rs01.getDouble("AMTFAVS");
                AMTFAVSA = rs01.getDouble("AMTFAVSA");
                AMTFAVTT = rs01.getDouble("TOTALAMT");
                //OAL
                AMTFAVMOAL_LY = rs01.getDouble("AMTFAVMOAL_LY");
                AMTFAVTOAL_LY = rs01.getDouble("AMTFAVTOAL_LY");
                AMTFAVWOAL_LY = rs01.getDouble("AMTFAVWOAL_LY");
                AMTFAVTHOAL_LY = rs01.getDouble("AMTFAVTHOAL_LY");
                AMTFAVFOAL_LY = rs01.getDouble("AMTFAVFOAL_LY");
                AMTFAVSOAL_LY = rs01.getDouble("AMTFAVSOAL_LY");
                AMTFAVSAOAL_LY = rs01.getDouble("AMTFAVSAOAL_LY");
                AMTFAVTTOAL_LY = rs01.getDouble("TOTALAMTOAL_LY");

                AMTFAVMOAL = rs01.getDouble("AMTFAVMOAL");
                AMTFAVTOAL = rs01.getDouble("AMTFAVTOAL");
                AMTFAVWOAL = rs01.getDouble("AMTFAVWOAL");
                AMTFAVTHOAL = rs01.getDouble("AMTFAVTHOAL");
                AMTFAVFOAL = rs01.getDouble("AMTFAVFOAL");
                AMTFAVSOAL = rs01.getDouble("AMTFAVSOAL");
                AMTFAVSAOAL = rs01.getDouble("AMTFAVSAOAL");
                AMTFAVTTOAL = rs01.getDouble("TOTALAMTOAL");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2826Filter();

                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.IN_ZONA = filter.IN_ZONA;
                    objRtn.IN_CARRI = filter.IN_CARRI;
                    objRtn.strDescripcion = filter.strDescripcion;
                    objRtn.CDEPART = rs01.getString("CDEPART") + " - " + rs01.getString("CARRIVA");
                    //  objRtn.CARRIVA = rs01.getString("CARRIVA");
                    objRtn.strCDEPART = rs01.getString("DESC_CDEPART") + " - " + rs01.getString("DESC_CARRIVA");
                    //objRtn.strCARRIVA = rs01.getString("DESC_CARRIVA");
                    objRtn.MDACP = "USD";
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    //---------AÑO DEL ANTERIOR -------

                    objRtn.QCFLOWM15 = rs01.getDouble("AMTFAVM_LY");
                    objRtn.QCFLOWT15 = rs01.getDouble("AMTFAVT_LY");
                    objRtn.QCFLOWW15 = rs01.getDouble("AMTFAVW_LY");
                    objRtn.QCFLOWTH15 = rs01.getDouble("AMTFAVTH_LY");
                    objRtn.QCFLOWF15 = rs01.getDouble("AMTFAVF_LY");
                    objRtn.QCFLOWS15 = rs01.getDouble("AMTFAVS_LY");
                    objRtn.QCFLOWSA15 = rs01.getDouble("AMTFAVSA_LY");
                    objRtn.QCFLOWTT15 = rs01.getDouble("TOTALAMT_LY");

                    objRtn.QCFLOWM15OAL = rs01.getDouble("AMTFAVMOAL_LY");
                    objRtn.QCFLOWT15OAL = rs01.getDouble("AMTFAVTOAL_LY");
                    objRtn.QCFLOWW15OAL = rs01.getDouble("AMTFAVWOAL_LY");
                    objRtn.QCFLOWTH15OAL = rs01.getDouble("AMTFAVTHOAL_LY");
                    objRtn.QCFLOWF15OAL = rs01.getDouble("AMTFAVFOAL_LY");
                    objRtn.QCFLOWS15OAL = rs01.getDouble("AMTFAVSOAL_LY");
                    objRtn.QCFLOWSA15OAL = rs01.getDouble("AMTFAVSAOAL_LY");
                    objRtn.QCFLOWTT15OAL = rs01.getDouble("TOTALAMTOAL_LY");
                    //TOTALES
                    objRtn.totQCFLOWM15 = AMTFAVM_LY;
                    objRtn.totQCFLOWT15 = AMTFAVT_LY;
                    objRtn.totQCFLOWW15 = AMTFAVW_LY;
                    objRtn.totQCFLOWTH15 = AMTFAVTH_LY;
                    objRtn.totQCFLOWF15 = AMTFAVF_LY;
                    objRtn.totQCFLOWS15 = AMTFAVS_LY;
                    objRtn.totQCFLOWSA15 = AMTFAVSA_LY;
                    objRtn.totQCFLOWTT15 = AMTFAVTT_LY;

                    objRtn.totQCFLOWM15OAL = AMTFAVMOAL_LY;
                    objRtn.totQCFLOWT15OAL = AMTFAVTOAL_LY;
                    objRtn.totQCFLOWW15OAL = AMTFAVWOAL_LY;
                    objRtn.totQCFLOWTH15OAL = AMTFAVTHOAL_LY;
                    objRtn.totQCFLOWF15OAL = AMTFAVFOAL_LY;
                    objRtn.totQCFLOWS15OAL = AMTFAVSOAL_LY;
                    objRtn.totQCFLOWSA15OAL = AMTFAVSAOAL_LY;
                    objRtn.totQCFLOWTT15OAL = AMTFAVTTOAL_LY;

                    //-------AÑO ANTERIOR FILTRO---------------
                    objRtn.QCFLOWM16 = rs01.getDouble("AMTFAVM");
                    objRtn.QCFLOWT16 = rs01.getDouble("AMTFAVT");
                    objRtn.QCFLOWW16 = rs01.getDouble("AMTFAVW");
                    objRtn.QCFLOWTH16 = rs01.getDouble("AMTFAVTH");
                    objRtn.QCFLOWF16 = rs01.getDouble("AMTFAVF");
                    objRtn.QCFLOWS16 = rs01.getDouble("AMTFAVS");
                    objRtn.QCFLOWSA16 = rs01.getDouble("AMTFAVSA");
                    objRtn.QCFLOWTT16 = rs01.getDouble("TOTALAMT");

                    objRtn.QCFLOWM16OAL = rs01.getDouble("AMTFAVMOAL");
                    objRtn.QCFLOWT16OAL = rs01.getDouble("AMTFAVTOAL");
                    objRtn.QCFLOWW16OAL = rs01.getDouble("AMTFAVWOAL");
                    objRtn.QCFLOWTH16OAL = rs01.getDouble("AMTFAVTHOAL");
                    objRtn.QCFLOWF16OAL = rs01.getDouble("AMTFAVFOAL");
                    objRtn.QCFLOWS16OAL = rs01.getDouble("AMTFAVSOAL");
                    objRtn.QCFLOWSA16OAL = rs01.getDouble("AMTFAVSAOAL");
                    objRtn.QCFLOWTT16OAL = rs01.getDouble("TOTALAMTOAL");
                    //TOTALES
                    objRtn.totQCFLOWM16 = AMTFAVM;
                    objRtn.totQCFLOWT16 = AMTFAVT;
                    objRtn.totQCFLOWW16 = AMTFAVW;
                    objRtn.totQCFLOWTH16 = AMTFAVTH;
                    objRtn.totQCFLOWF16 = AMTFAVF;
                    objRtn.totQCFLOWS16 = AMTFAVS;
                    objRtn.totQCFLOWSA16 = AMTFAVSA;
                    objRtn.totQCFLOWTT16 = AMTFAVTT;

                    objRtn.totQCFLOWM16OAL = AMTFAVMOAL;
                    objRtn.totQCFLOWT16OAL = AMTFAVTOAL;
                    objRtn.totQCFLOWW16OAL = AMTFAVWOAL;
                    objRtn.totQCFLOWTH16OAL = AMTFAVTHOAL;
                    objRtn.totQCFLOWF16OAL = AMTFAVFOAL;
                    objRtn.totQCFLOWS16OAL = AMTFAVSOAL;
                    objRtn.totQCFLOWSA16OAL = AMTFAVSAOAL;
                    objRtn.totQCFLOWTT16OAL = AMTFAVTTOAL;

                    //DIFERENCIA FLOWN
                   /* objRtn.diffQCFLOWM = objRtn.QCFLOWM16 - objRtn.QCFLOWM15;
                     objRtn.diffQCFLOWT = objRtn.QCFLOWT16 - objRtn.QCFLOWT15;
                     objRtn.diffQCFLOWW = objRtn.QCFLOWW16 - objRtn.QCFLOWW15;
                     objRtn.diffQCFLOWTH = objRtn.QCFLOWTH16 - objRtn.QCFLOWTH15;
                     objRtn.diffQCFLOWF = objRtn.QCFLOWF16 - objRtn.QCFLOWF15;
                     objRtn.diffQCFLOWS = objRtn.QCFLOWS16 - objRtn.QCFLOWS15;
                     objRtn.diffQCFLOWSA = objRtn.QCFLOWSA16 - objRtn.QCFLOWSA15;
                     objRtn.diffQCFLOWTT = objRtn.diffQCFLOWM + objRtn.diffQCFLOWT + objRtn.diffQCFLOWW + objRtn.diffQCFLOWTH + objRtn.diffQCFLOWF + objRtn.diffQCFLOWS + objRtn.diffQCFLOWSA;
                     // TOTALES DIFERENCIA FLOWN
                     objRtn.difftotQCFLOWM = objRtn.totQCFLOWM16 - objRtn.totQCFLOWM15;
                     objRtn.difftotQCFLOWT = objRtn.totQCFLOWT16 - objRtn.totQCFLOWT15;
                     objRtn.difftotQCFLOWW = objRtn.totQCFLOWW16 - objRtn.totQCFLOWW15;
                     objRtn.difftotQCFLOWTH = objRtn.totQCFLOWTH16 - objRtn.totQCFLOWTH15;
                     objRtn.difftotQCFLOWF = objRtn.totQCFLOWF16 - objRtn.totQCFLOWF15;
                     objRtn.difftotQCFLOWS = objRtn.totQCFLOWS16 - objRtn.totQCFLOWS15;
                     objRtn.difftotQCFLOWSA = objRtn.totQCFLOWSA16 - objRtn.totQCFLOWSA15;
                     objRtn.difftotQCFLOWTT = objRtn.difftotQCFLOWM + objRtn.difftotQCFLOWT + objRtn.difftotQCFLOWW + objRtn.difftotQCFLOWTH + objRtn.difftotQCFLOWF + objRtn.difftotQCFLOWS + objRtn.difftotQCFLOWSA;
                  
                     if (objRtn.diffQCFLOWM < 0) {
                     objRtn.strDescripcion11 = "rojo";
                     }
                     if (objRtn.diffQCFLOWT < 0) {
                     objRtn.strDescripcion22 = "rojo";
                     }
                     if (objRtn.diffQCFLOWW < 0) {
                     objRtn.strDescripcion33 = "rojo";
                     }
                     if (objRtn.diffQCFLOWTH < 0) {
                     objRtn.strDescripcion44 = "rojo";
                     }
                     if (objRtn.diffQCFLOWF < 0) {
                     objRtn.strDescripcion55 = "rojo";
                     }
                     if (objRtn.diffQCFLOWS < 0) {
                     objRtn.strDescripcion66 = "rojo";
                     }
                     if (objRtn.diffQCFLOWSA < 0) {
                     objRtn.strDescripcion77 = "rojo";
                     }
                     if (objRtn.diffQCFLOWTT < 0) {
                     objRtn.strDescripcion9 = "rojo";
                     }*/
                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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
