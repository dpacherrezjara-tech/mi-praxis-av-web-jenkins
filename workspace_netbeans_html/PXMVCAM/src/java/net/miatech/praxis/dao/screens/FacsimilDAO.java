/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.screens;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A720Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.BSPF63;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class FacsimilDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public FacsimilDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FacsimilDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public FACSIMILFilter loadARCFacsimilRFND(String ccust, UserView user, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {

        CallableStatement cs = null;
        PreparedStatement stmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<>();
        List<String> lstConj = new ArrayList<>();
        BSPF63 reg63;
        List<A720Filter> lstRegA720 = new ArrayList<>();
        List<String> lstTaxes = new ArrayList<>();
        A720Filter beanCpn;
        HashMap hmValueA720 = new HashMap();
        String strCPUI = "", strConj = ""; //VOID
        String strSQL = "";

        Connection cnx = null;
        try {

            strSQL = "{CALL " + session.getMainLibrary() + ".PXARCFACSIMILRFND(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(3, Types.VARCHAR);
            cs.registerOutParameter(4, Types.VARCHAR);
            cs.registerOutParameter(5, Types.VARCHAR);
            cs.registerOutParameter(6, Types.VARCHAR);
            cs.registerOutParameter(7, Types.VARCHAR);
            cs.registerOutParameter(8, Types.VARCHAR);
            cs.registerOutParameter(9, Types.VARCHAR);
            cs.registerOutParameter(10, Types.VARCHAR);
            cs.registerOutParameter(11, Types.VARCHAR);
            cs.registerOutParameter(12, Types.VARCHAR);
            cs.registerOutParameter(13, Types.VARCHAR);
            cs.registerOutParameter(14, Types.VARCHAR);
            cs.registerOutParameter(15, Types.VARCHAR);
            cs.registerOutParameter(16, Types.VARCHAR);
            cs.registerOutParameter(17, Types.VARCHAR);
            cs.registerOutParameter(18, Types.VARCHAR);

            cs.setString(1, ccust);
            cs.setString(2, filter.TDNR.trim());
            cs.setString(3, filter.AGTN.trim());
            cs.setString(4, "");
            cs.setString(5, "");
            cs.setString(6, "");
            cs.setString(7, "");
            cs.setString(8, "");
            cs.setString(9, "");
            cs.setString(10, "");
            cs.setString(11, "");
            cs.setString(12, "");
            cs.setString(13, "");
            cs.setString(14, "");
            cs.setString(15, "");
            cs.setString(16, "");
            cs.setString(17, "");
            cs.setString(18, "");
            cs.execute();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.TDNR = filter.TDNR.trim();
            beanFacsimil.FUENTE = "ARC";
            strConj = beanFacsimil.TDNR.trim();
            lstConj.add(beanFacsimil.TDNR.trim());
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();

            // REGISTROS ARCF24 ================================================
            if (cs.getString(3) != null) {
                beanFacsimil.AGTN = cs.getString(3).trim();
            }
            if (cs.getString(4) != null) {
                beanFacsimil.PDAI = cs.getString(4).trim();
                if (!beanFacsimil.PDAI.trim().equals("")) {
                    beanFacsimil.periodo = Functions.getAbreviaturaMes(Functions.fillString(beanFacsimil.PDAI, 3).substring(0, 2))
                            + " - Week " + Functions.fillString(beanFacsimil.PDAI, 3).substring(2, 3);
                }
            }
            if (cs.getString(5) != null) {
                beanFacsimil.HRED = cs.getString(5).trim();
                if (!beanFacsimil.HRED.trim().equals("")) {
                    beanFacsimil.formatDate = "20" + beanFacsimil.HRED.substring(0, 2) + " " + Functions.getAbreviaturaMes(beanFacsimil.HRED.substring(2, 4))
                            + " " + beanFacsimil.HRED.substring(4, 6);
                }
            }
            if (cs.getString(6) != null) {
                strCPUI = Functions.fillString(cs.getString(6).trim(), 4);
                if (strCPUI.startsWith("V")) {
                    for (int i = 0; i < strCPUI.length(); i++) {
                        if (strCPUI.substring(i, i + 1).trim().equals("V")) {
                            reg63 = new BSPF63();
                            reg63.STPO = "Void";
                            reg63.ORAC = "Void";
                            reg63.DSTC = "Void";
                            reg63.CARR = "Void";
                            reg63.FTNR = "Void";
                            reg63.DAIS = "Void";
                            reg63.RBKD = "Void";
                            reg63.FTDA = "Void";
                            reg63.FTDT = "Void";
                            reg63.FBTD = "Void";
                            reg63.NBDA = "Void";
                            reg63.NADA = "Void";
                            reg63.strDescFrom = "Void";
                            reg63.strDescTo = "Void";
                            lstReg63.add(reg63);
                        }
                    }
                }
            }
            if (cs.getString(7) != null && cs.getString(8) != null) {
                beanFacsimil.TODC = cs.getString(7).trim() + cs.getString(8).trim();
            }
            if (cs.getString(9) != null) {
                beanFacsimil.CDGT = cs.getString(9).trim();
            }
            if (cs.getString(10) != null) {
                beanFacsimil.TOUR = cs.getString(10).trim();
            }
            // REGISTRO ARCF46 =================================================
            if (cs.getString(11) != null) {
                beanFacsimil.ENRS = cs.getString(11).trim();
            }
            if (cs.getString(12) != null) {
                beanFacsimil.ORIN = cs.getString(12).trim();
            }
            // REGISTROS ARCF48 ================================================
            if (cs.getString(13) != null) {
                beanFacsimil.PXNM = cs.getString(13).trim();
            }
            // REGISTROS ARCF66 ================================================
            if (cs.getString(14) != null) {
                beanFacsimil.FPSN = cs.getString(14).trim();
            }
            if (cs.getString(15) != null) {
                beanFacsimil.FPIN = cs.getString(15).trim();
            }
            // REGISTRO A003 ===================================================
            if (cs.getString(16) != null) {
                beanFacsimil.strNombreAgente = cs.getString(16).trim();
            }
            if (cs.getString(17) != null && cs.getString(18) != null) {
                beanFacsimil.strDirecAgente = cs.getString(17).trim() + " " + cs.getString(18).trim();
            }
            // REGISTROS ARCF24 ================================================
            // <editor-fold defaultstate="collapsed" desc="ARMANDO CONJUNCIÓN">
            rst = cs.getResultSet();
            String tkt = "";
            while (rst.next()) {
                tkt = rst.getString("TACN1").trim() + rst.getString("TDNR").trim();
                if (tkt.equals(filter.TDNR.trim())) {
                    int cpn = Integer.parseInt(rst.getString("TDNR").trim().substring(rst.getString("TDNR").trim().length() - 3));
                    strConj = rst.getString("TACN1").trim() + rst.getString("TDNR").trim().substring(0, rst.getString("TDNR").trim().length() - 3)
                            + Functions.fillZeros(3, String.valueOf(cpn - 1));
                    lstConj = new ArrayList<String>();
                    lstConj.add(strConj);
                }
                strConj += " - " + rst.getString("TDNR").trim().substring(rst.getString("TDNR").trim().length() - 2);
                lstConj.add(rst.getString("TACN1").trim() + rst.getString("TDNR").trim());
            }
            if (!strConj.contains("-")) {
                strConj = "";
                lstConj = new ArrayList<String>();
            }
            beanFacsimil.strConjuncion = strConj;
            beanFacsimil.lstConj = lstConj;
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            //</editor-fold>

            // REGISTROS BSPF64 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS BSPF64">
            /*if (cs.getMoreResults()) {
             rst = cs.getResultSet();
             if (rst.next()) {
             beanFacsimil.FARE = rst.getString("FARE");
             beanFacsimil.EQFR = rst.getString("EQFR");
             beanFacsimil.TAXA1 = rst.getString("TAXA1");
             beanFacsimil.TAXA2 = rst.getString("TAXA2");
             beanFacsimil.TAXA3 = rst.getString("TAXA3");
             beanFacsimil.FCMI = rst.getString("FCMI");
             beanFacsimil.FCPI = rst.getString("FCPI");
             beanFacsimil.TOTL = rst.getString("TOTL");
             }
             try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
             }*/
            //</editor-fold>
            // REGISTROS ARCF30 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS ARCF30">
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                int pos = 0;
                while (rst.next()) {
                    pos++;
                    if (pos == 1) {
                        beanFacsimil.FARE = rst.getString("FAMT");
                        beanFacsimil.CUTP1 = rst.getString("CUTP1");
                        beanFacsimil.TOTL = rst.getString("TDAM");
                    }
                    lstTaxes.add(rst.getString("TMFT1") + rst.getString("TMFS1") + rst.getString("TMFA1"));
                    lstTaxes.add(rst.getString("TMFT2") + rst.getString("TMFS2") + rst.getString("TMFA2"));
                }
                beanFacsimil.lstTaxes = lstTaxes;
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS ARCF81 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS BSPF81">
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.FRCS += rst.getString("FRCS").trim();
                    beanFacsimil.FRCA += rst.getString("FRCA").trim();
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS ARCF84 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS ARCF84">
            String strFPTP = "";
            double cash = 0, credit = 0;
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();

                while (rst.next()) {
                    beanFacsimil.FPTP = rst.getString("FPTP");
                    beanFacsimil.FPAM = rst.getString("FPAM");
                    beanFacsimil.FPAC = rst.getString("FPAC");
                    strFPTP = Functions.fillString(rst.getString("FPTP").trim(), 4);
                    if (strFPTP.startsWith("CA") || strFPTP.startsWith("CM")) {
                        beanFacsimil.strCash = beanFacsimil.CUTP1;
                        cash += rst.getDouble("FPAM");
                    } else if (strFPTP.startsWith("CC")) {
                        beanFacsimil.strCredit = beanFacsimil.CUTP1;
                        credit += rst.getDouble("FPAM");
                    } else if (strFPTP.substring(2, 4).equals("CA")) {
                        beanFacsimil.strCash = beanFacsimil.CUTP1;
                        cash += rst.getDouble("FPAM");
                    } else if (strFPTP.substring(2, 4).equals("CC")) {
                        beanFacsimil.strCredit = beanFacsimil.CUTP1;
                        credit += rst.getDouble("FPAM");
                    } else if (rst.getString("FPTP").trim().startsWith("RF")) {
                        beanFacsimil.strCash = beanFacsimil.CUTP1;
                        cash += rst.getDouble("FPAM");
                        beanFacsimil.strVD = "Refund";
                    } else if (rst.getString("FPTP").trim().startsWith("TC")) {
                        beanFacsimil.strCredit = beanFacsimil.CUTP1;
                        credit += rst.getDouble("FPAM");
                        beanFacsimil.strVD = "Refund";
                    } else if (strFPTP.trim().equals("EX")) {
                        if (!beanFacsimil.strIssExc.trim().equals("")) {
                            beanFacsimil.strIssExc += " / " + Functions.fillString(rst.getString("FPAC"), 13).substring(0, 13);
                        } else {
                            beanFacsimil.strIssExc += Functions.fillString(rst.getString("FPAC"), 13).substring(0, 13);
                        }
                    } else if (strFPTP.trim().equals("VD")) {
                        beanFacsimil.strVD = "VD";
                    } else {
                        beanFacsimil.strOthers = strFPTP.trim() + " : " + beanFacsimil.CUTP1 + " " + rst.getString("FPAM").trim();
                    }
                }
                beanFacsimil.strCash += " " + String.valueOf(cash);
                if (beanFacsimil.strCash.endsWith(".0")) {
                    beanFacsimil.strCash = beanFacsimil.strCash.replace(".0", ".00");
                }
                beanFacsimil.strCredit += " " + String.valueOf(credit);
                if (beanFacsimil.strCredit.endsWith(".0")) {
                    beanFacsimil.strCredit = beanFacsimil.strCredit.replace(".0", ".00");
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            strFPTP = null;
            //</editor-fold>

            // REGISTROS A713 ==================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS A713">
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {

                    beanFacsimil.A720REGIST = rst.getString("A713REGIST").trim();
                    beanFacsimil.A720FREGIS = rst.getString("A713FREGIS").trim();
                    beanFacsimil.A720REVISA = rst.getString("A713REVISA").trim();
                    beanFacsimil.A720FREVIS = rst.getString("A713FREVIS").trim();
                    beanFacsimil.A720GRUPO = rst.getString("A713GRUPO").trim();
                    beanFacsimil.A720ORIG = rst.getString("A713ORIG").trim();
                    beanFacsimil.A720FLAG = rst.getString("A713FLAG").trim();
                    beanFacsimil.A720CTKTC = rst.getLong("A713CTKTC");
                    beanFacsimil.A720PRO = rst.getString("A713PRO").trim();
                    beanFacsimil.A720MONREG = rst.getString("A713MONREG").trim();
                    beanFacsimil.A720FECVTA = rst.getString("A713FECVTA").trim();
                    beanFacsimil.A720CIUVTA = rst.getString("A713CIUVTA").trim();
                    beanFacsimil.A720PAIVTA = rst.getString("A713PAIVTA").trim();
                    beanFacsimil.A720CIUEMI = rst.getString("A713CIUEMI").trim();
                    beanFacsimil.A720PAIEMI = rst.getString("A713PAIEMI").trim();
                    beanFacsimil.A720COMMIS = rst.getDouble("A713COMMIS");
                    beanFacsimil.A720MDACOM = rst.getString("A713MDACOM").trim();
                    beanFacsimil.A720PORCOM = rst.getDouble("A713PORCOM");
                    beanFacsimil.A720CODIT = rst.getString("A713CODIT").trim();
                    beanFacsimil.A720INITRA = rst.getString("A713INITRA").trim();
                    beanFacsimil.A720TAJUST = rst.getDouble("A713TAJUST");
                    beanFacsimil.A720TAJUSQ = rst.getDouble("A713TAJUSQ");
                    beanFacsimil.A720TARIFA = rst.getDouble("A713TARIFA");
                    beanFacsimil.A720TRFPAG = rst.getDouble("A713TRFPAG");
                    beanFacsimil.A720TRFNUC = rst.getDouble("A713TRFNUC");
                    beanFacsimil.A720ROE = rst.getDouble("A713ROE");
                    beanFacsimil.A720CPLUSS = rst.getDouble("A713CPLUSS");
                    beanFacsimil.A720CSOVER = rst.getDouble("A713CSOVER");
                    beanFacsimil.A720QSOVER = rst.getLong("A713QSOVER");
                    beanFacsimil.A720MONEDA = rst.getString("A713MONEDA").trim();
                    beanFacsimil.A720MDAPAG = rst.getString("A713MDAPAG").trim();
                    beanFacsimil.A1345FEXCH = rst.getString("A1345FEXCH").trim();
                    beanFacsimil.A1345NRPRT = rst.getString("A1345NRPRT").trim();
                    beanFacsimil.A1345CURR = rst.getString("A1345CURR").trim();
                    beanFacsimil.A1345PGCUR = rst.getString("A1345PGCUR").trim();
                    beanFacsimil.A1345FARE = rst.getDouble("A1345FARE");
                    beanFacsimil.A1345PAGO = rst.getDouble("A1345PAGO");

                    beanCpn = null;
                    for (int i = 1; i < 5; i++) {
                        if (!rst.getString("A713RUTA" + i).trim().equals("")) {
                            beanCpn = new A720Filter();
                            beanCpn.A720RUTAO = rst.getString("A713RUTA" + (i - 1)).trim();
                            beanCpn.A720RUTAD = rst.getString("A713RUTA" + i).trim();
                            try {
                                if (!beanCpn.A720RUTAO.trim().equals("") && hmCiudades.containsKey(beanCpn.A720RUTAO.trim())) {
                                    beanCpn.strDescRutaO = hmCiudades.get(beanCpn.A720RUTAO.trim()).toString();
                                } else {
                                    beanCpn.strDescRutaO = "(EMPTY)";
                                }
                                if (!beanCpn.A720RUTAD.trim().equals("") && hmCiudades.containsKey(beanCpn.A720RUTAD.trim())) {
                                    beanCpn.strDescRutaD = hmCiudades.get(beanCpn.A720RUTAD.trim()).toString();
                                } else {
                                    beanCpn.strDescRutaD = "(EMPTY)";
                                }
                            } catch (Exception e) {
                            }
                            beanCpn.A720CONEX = rst.getString("A713CONEX" + i).trim();
                            beanCpn.A720CARRA = rst.getString("A713CARRA" + i).trim();
                            beanCpn.A720NVLO = rst.getString("A713NVLO" + i).trim();
                            beanCpn.A720FVLO = rst.getString("A713FVLO" + i).trim();
                            beanCpn.A720BOOKI = rst.getString("A713BOOKI" + i).trim();
                            beanCpn.A720CLASE = rst.getString("A713CLASE" + i).trim();
                            beanCpn.A720FBUSO = rst.getString("A713FBUSO" + i).trim();
                            beanCpn.A720FARE = rst.getDouble("A713FARE" + i);
                            beanCpn.A720TFARE = rst.getString("A713TFARE" + i).trim();
                            beanCpn.A720SS = rst.getDouble("A713SS" + i);
                            beanCpn.A720VLSRP = rst.getDouble("A713VLSRP" + i);
                            beanCpn.A720VLMPA = rst.getDouble("A713VLMPA" + i);
                            beanCpn.A720ACUE = rst.getDouble("A713ACUE" + i);
                            beanCpn.A720ISC = rst.getDouble("A713ISC" + i);
                            beanCpn.A720VALOR = rst.getDouble("A713VALOR" + i);
                            beanCpn.A720AJUST = rst.getDouble("A713AJUST" + i);
                            beanCpn.A720ACUEO = rst.getDouble("A713ACUEO" + i);
                            beanCpn.A720QIN = rst.getDouble("A713QIN" + i);
                            beanCpn.A720FACT = rst.getDouble("A713FACT" + i);
                            beanCpn.A720PPRO = rst.getDouble("A713PPRO" + i);
                            beanCpn.A720PROV = rst.getDouble("A713PROV" + i);
                            beanCpn.A720PRRCM = rst.getDouble("A713PRRCM" + i);
                            lstRegA720.add(beanCpn);
                            hmValueA720.put(rst.getString("A713CIA").trim() + rst.getString("A713FORMA").trim() + rst.getString("A713SERIE").trim() + i, rst.getDouble("A713VALOR" + i));
                        }
                    }

                    beanFacsimil.lstRegA720 = lstRegA720;
                    //Obteniendo Sale Exch. Rate =============================== 
                    if (beanFacsimil.A720MDAPAG.trim().equals("MXN")) {
                        beanFacsimil.A1526RATE = 1;
                        beanFacsimil.dblTarifa = beanFacsimil.A720TRFPAG;
                        beanFacsimil.strMonTarifa = "MXN";

                    } else if (!beanFacsimil.A720MDAPAG.trim().equals("")
                            && !beanFacsimil.A720MDAPAG.trim().equals("MXN")) {

                        //(A1526)
                        double rate = 0;
                        strSQL = "SELECT A1526RATE FROM " + session.getMainLibrary() + ".A1526 WHERE A1526CUR = '"
                                + beanFacsimil.A720MDAPAG.trim() + "' AND A1526CUR2 = 'MXN' "
                                + "AND A1526DIS = '" + beanFacsimil.A720FECVTA.trim() + "'";

                        stmt = cnx.prepareStatement(strSQL);
                        rst2 = stmt.executeQuery();
                        if (rst2.next()) {
                            rate = rst2.getDouble("A1526RATE");
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;
                        stmt.close();
                        stmt = null;

                        if (rate > 0) {
                            beanFacsimil.A1526RATE = rate;
                            beanFacsimil.dblTarifa = beanFacsimil.A720TRFPAG * rate;
                            beanFacsimil.strMonTarifa = "MXN";
                        }

                    } else {
                        if (beanFacsimil.A720MONEDA.trim().equals("MXN")) {
                            beanFacsimil.A1526RATE = 1;
                            beanFacsimil.dblTarifa = beanFacsimil.A720TARIFA;
                            beanFacsimil.strMonTarifa = "MXN";

                        } else if (!beanFacsimil.A720MONEDA.trim().equals("") && !beanFacsimil.A720MONEDA.trim().equals("MXN")) {
                            //(A1526)
                            double rate = 0;
                            strSQL = "SELECT A1526RATE FROM " + session.getMainLibrary() + ".A1526 WHERE A1526CUR = '"
                                    + beanFacsimil.A720MONEDA.trim() + "' AND A1526CUR2 = 'MXN' "
                                    + "AND A1526DIS = '" + beanFacsimil.A720FECVTA.trim() + "'";

                            stmt = cnx.prepareStatement(strSQL);
                            rst2 = stmt.executeQuery();
                            if (rst2.next()) {
                                rate = rst2.getDouble("A1526RATE");
                            }
                            try {
                                rst2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                            rst2 = null;
                            stmt.close();
                            stmt = null;
                            if (rate > 0) {
                                beanFacsimil.A1526RATE = rate;
                                beanFacsimil.dblTarifa = beanFacsimil.A720TARIFA * rate;
                                beanFacsimil.strMonTarifa = "MXN";
                            }
                        }
                    }

                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS ARCF63 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS ARCF63">
            int pos = 0;
            if (cs.getMoreResults()) {

                //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.DAIS = "20" + rst.getString("DAIS");
                    pos++;

                    try {
                        if (pos != rst.getInt("CPNR") && !strCPUI.trim().equals("")
                                && strCPUI.substring(pos - 1, pos).trim().equals("S")) {
                            reg63 = new BSPF63();
                            reg63.strDescFrom = lstReg63.get(pos - 2).DSTC + " SURFACE";
                            reg63.strDescTo = rst.getString("ACCD1") + " SURFACE";
                            reg63.RESD1 = "SURFACE";
                            reg63.CARR = "**";
                            lstReg63.add(reg63);
                        }
                    } catch (Exception e) {
                    }
                    reg63 = new BSPF63();
                    reg63.STPO = rst.getString("STPO");
                    reg63.ORAC = rst.getString("ACCD1");
                    reg63.DSTC = rst.getString("ACCD2");
                    reg63.CARR = rst.getString("TACN");
                    reg63.FTNR = rst.getString("FTNR");
                    reg63.DAIS = rst.getString("DAIS");
                    reg63.RBKD = rst.getString("RBKD");
                    reg63.FTDA = rst.getString("FTDA");
                    reg63.FTDT = rst.getString("FTDT");
                    reg63.FBST = rst.getString("FBST");
                    reg63.FBTD = rst.getString("FBTD");
                    reg63.NBDA = rst.getString("NBDA");
                    reg63.NADA = rst.getString("NADA");

                    try {
                        if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                            reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                        } else {
                            reg63.strDescFrom = reg63.ORAC;
                        }
                        if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                            reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                        } else {
                            reg63.strDescTo = reg63.DSTC;
                        }
                    } catch (Exception e) {
                    }

                    // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                    //OBTENIENDO DATOS DEL USO =================================
                    boolean encontroUso = false;
                    //Buscando el Uso en el A1538 ==============================
                    strSQL = "SELECT A1538UCRUC, A1538FCRUC, A1538VCPN FROM " + session.getMainLibrary() + ".A1538 "
                            + "WHERE A1538CCUST = '" + ccust.trim()
                            + "' AND A1538CIA = '" + filter.TDNR.trim().substring(0, 3)
                            + "' AND A1538FORMA = '" + filter.TDNR.trim().substring(3, 7)
                            + "' AND A1538SERIE = '" + filter.TDNR.trim().substring(7, 13)
                            + "' AND A1538CUPON = '" + rst.getString("CPNR").trim() + "' ";

                    stmt = cnx.prepareStatement(strSQL);
                    rst2 = stmt.executeQuery();
                    if (rst2.next()) {
                        encontroUso = true;
                        if (rst2.getString("A1538UCRUC").trim().equals("V")) {
                            reg63.strUso = "F";
                        } else {
                            reg63.strUso = rst2.getString("A1538UCRUC").trim();
                        }
                        if (rst2.getString("A1538UCRUC").trim().equals("F") || rst2.getString("A1538UCRUC").trim().equals("V")) {
                            reg63.strDesUso = "Flown";
                        } else if (rst2.getString("A1538UCRUC").trim().equals("E")) {
                            reg63.strDesUso = "Exchange";
                        } else if (rst2.getString("A1538UCRUC").trim().equals("R")) {
                            reg63.strDesUso = "Refund";
                        } else if (rst2.getString("A1538UCRUC").trim().equals("I")) {
                            reg63.strDesUso = "Interline";
                        }
                        reg63.strFecUso = rst2.getString("A1538FCRUC").trim();
                        reg63.dblMontoUso = rst2.getDouble("A1538VCPN");
                    }
                    try {
                        rst2.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                    rst2 = null;

                    if (!encontroUso) {
                        // VOLADO 
                        strSQL = "SELECT A1539FCONT FROM " + session.getMainLibrary() + ".A1539 "
                                + "WHERE A1539CCUST = '" + ccust.trim()
                                + "' AND A1539CIA = '" + filter.TDNR.trim().substring(0, 3)
                                + "' AND A1539FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                + "' AND A1539SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                + "' AND A1539CUPON = '" + rst.getString("CPNR").trim() + "' ";

                        rst2 = stmt.executeQuery(strSQL);
                        if (rst2.next()) {
                            encontroUso = true;
                            reg63.strUso = "F";
                            reg63.strDesUso = "Flown";
                            reg63.strFecUso = rst2.getString("A1539FCONT").trim();
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;

                        if (!encontroUso) {
                            // EXCHANGE 
                            strSQL = "SELECT A1540FCONT FROM " + session.getMainLibrary() + ".A1540 "
                                    + "WHERE A1540CCUST = '" + ccust.trim()
                                    + "' AND A1540CIA = '" + filter.TDNR.trim().substring(0, 3)
                                    + "' AND A1540FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                    + "' AND A1540SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                    + "' AND A1540CUPON = '" + rst.getString("CPNR").trim() + "' ";

                            rst2 = stmt.executeQuery(strSQL);
                            if (rst2.next()) {
                                encontroUso = true;
                                reg63.strUso = "E";
                                reg63.strDesUso = "Exchange";
                                reg63.strFecUso = rst2.getString("A1540FCONT").trim();
                            }
                            try {
                                rst2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                            rst2 = null;

                            if (!encontroUso) {
                                // REFUND 
                                strSQL = "SELECT A1541FCONT FROM " + session.getMainLibrary() + ".A1541 "
                                        + "WHERE A1541CCUST = '" + ccust.trim()
                                        + "' AND A1541CIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND A1541FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND A1541SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND A1541CUPON = '" + rst.getString("CPNR").trim() + "' ";

                                rst2 = stmt.executeQuery(strSQL);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "R";
                                    reg63.strDesUso = "Refund";
                                    reg63.strFecUso = rst2.getString("A1541FCONT").trim();
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;

                                if (!encontroUso) {
                                    // INTERLINE 
                                    strSQL = "SELECT A1542FCONT FROM " + session.getMainLibrary() + ".A1542 "
                                            + "WHERE A1542CCUST = '" + ccust.trim()
                                            + "' AND A1542CIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND A1542FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND A1542SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND A1542CUPON = '" + rst.getString("CPNR").trim() + "' ";

                                    rst2 = stmt.executeQuery(strSQL);
                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.strUso = "I";
                                        reg63.strDesUso = "Interline";
                                        reg63.strFecUso = rst2.getString("A1542FCONT").trim();
                                    }
                                    try {
                                        rst2.close();
                                    } catch (SQLException e) {
                                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                    }
                                    rst2 = null;
                                }
                            }
                        }
                    }

                    //</editor-fold>
                    if (hmValueA720.containsKey(rst.getString("TDNR").trim() + rst.getInt("CPNR"))) {
                        reg63.dblMontoUso = Double.parseDouble(hmValueA720.get(rst.getString("TDNR").trim() + rst.getInt("CPNR")).toString());
                    }

                    lstReg63.add(reg63);
                }
                stmt.close();
                stmt = null;
                beanFacsimil.lstReg63 = lstReg63;
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
            if (rst2 != null) {
                try {
                    rst2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (stmt != null) {
                stmt.close();
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();

            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return beanFacsimil;
    }

    public FACSIMILFilter loadARCFacsimil(String ccust, UserView user, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {

        CallableStatement cs = null;
        PreparedStatement stmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<>();
        List<String> lstConj = new ArrayList<>();
        BSPF63 reg63;
        List<A720Filter> lstRegA720 = new ArrayList<>();
        List<String> lstTaxes = new ArrayList<>();
        A720Filter beanCpn;
        HashMap hmValueA720 = new HashMap();
        String strCPUI = "", strConj = ""; //VOID
        String strSQL = "";

        Connection cnx = null;

        try {

            strSQL = "{CALL " + session.getMainLibrary() + ".PXARCFACSIMIL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(3, Types.VARCHAR);
            cs.registerOutParameter(4, Types.VARCHAR);
            cs.registerOutParameter(5, Types.VARCHAR);
            cs.registerOutParameter(6, Types.VARCHAR);
            cs.registerOutParameter(7, Types.VARCHAR);
            cs.registerOutParameter(8, Types.VARCHAR);
            cs.registerOutParameter(9, Types.VARCHAR);
            cs.registerOutParameter(10, Types.VARCHAR);
            cs.registerOutParameter(11, Types.VARCHAR);
            cs.registerOutParameter(12, Types.VARCHAR);
            cs.registerOutParameter(13, Types.VARCHAR);
            cs.registerOutParameter(14, Types.VARCHAR);
            cs.registerOutParameter(15, Types.VARCHAR);
            cs.registerOutParameter(16, Types.VARCHAR);
            cs.registerOutParameter(17, Types.VARCHAR);
            cs.registerOutParameter(18, Types.VARCHAR);

            cs.setString(1, ccust);
            cs.setString(2, filter.TDNR.trim());
            cs.setString(3, filter.AGTN.trim());
            cs.setString(4, "");
            cs.setString(5, "");
            cs.setString(6, "");
            cs.setString(7, "");
            cs.setString(8, "");
            cs.setString(9, "");
            cs.setString(10, "");
            cs.setString(11, "");
            cs.setString(12, "");
            cs.setString(13, "");
            cs.setString(14, "");
            cs.setString(15, "");
            cs.setString(16, "");
            cs.setString(17, "");
            cs.setString(18, "");
            cs.execute();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.TDNR = filter.TDNR.trim();
            beanFacsimil.FUENTE = "ARC";
            strConj = beanFacsimil.TDNR.trim();
            lstConj.add(beanFacsimil.TDNR.trim());
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();

            // REGISTROS ARCF24 ================================================
            if (cs.getString(3) != null) {
                beanFacsimil.AGTN = cs.getString(3).trim();
            }
            if (cs.getString(4) != null) {
                beanFacsimil.PDAI = cs.getString(4).trim();
                if (!beanFacsimil.PDAI.trim().equals("")) {
                    beanFacsimil.periodo = Functions.getAbreviaturaMes(Functions.fillString(beanFacsimil.PDAI, 3).substring(0, 2))
                            + " - Week " + Functions.fillString(beanFacsimil.PDAI, 3).substring(2, 3);
                }
            }
            if (cs.getString(5) != null) {
                beanFacsimil.HRED = cs.getString(5).trim();
                if (!beanFacsimil.HRED.trim().equals("")) {
                    beanFacsimil.formatDate = "20" + beanFacsimil.HRED.substring(0, 2) + " " + Functions.getAbreviaturaMes(beanFacsimil.HRED.substring(2, 4))
                            + " " + beanFacsimil.HRED.substring(4, 6);
                }
            }
            if (cs.getString(6) != null) {
                strCPUI = Functions.fillString(cs.getString(6).trim(), 4);
                if (strCPUI.startsWith("V")) {
                    for (int i = 0; i < strCPUI.length(); i++) {
                        if (strCPUI.substring(i, i + 1).trim().equals("V")) {
                            reg63 = new BSPF63();
                            reg63.STPO = "Void";
                            reg63.ORAC = "Void";
                            reg63.DSTC = "Void";
                            reg63.CARR = "Void";
                            reg63.FTNR = "Void";
                            reg63.DAIS = "Void";
                            reg63.RBKD = "Void";
                            reg63.FTDA = "Void";
                            reg63.FTDT = "Void";
                            reg63.FBTD = "Void";
                            reg63.NBDA = "Void";
                            reg63.NADA = "Void";
                            reg63.strDescFrom = "Void";
                            reg63.strDescTo = "Void";
                            lstReg63.add(reg63);
                        }
                    }
                }
            }
            if (cs.getString(7) != null && cs.getString(8) != null) {
                beanFacsimil.TODC = cs.getString(7).trim() + cs.getString(8).trim();
            }
            if (cs.getString(9) != null) {
                beanFacsimil.CDGT = cs.getString(9).trim();
            }
            if (cs.getString(10) != null) {
                beanFacsimil.TOUR = cs.getString(10).trim();
            }
            // REGISTRO ARCF46 =================================================
            if (cs.getString(11) != null) {
                beanFacsimil.ENRS = cs.getString(11).trim();
            }
            if (cs.getString(12) != null) {
                beanFacsimil.ORIN = cs.getString(12).trim();
            }
            // REGISTROS ARCF48 ================================================
            if (cs.getString(13) != null) {
                beanFacsimil.PXNM = cs.getString(13).trim();
            }
            // REGISTROS ARCF66 ================================================
            if (cs.getString(14) != null) {
                beanFacsimil.FPSN = cs.getString(14).trim();
            }
            if (cs.getString(15) != null) {
                beanFacsimil.FPIN = cs.getString(15).trim();
            }
            // REGISTRO A003 ===================================================
            if (cs.getString(16) != null) {
                beanFacsimil.strNombreAgente = cs.getString(16).trim();
            }
            if (cs.getString(17) != null && cs.getString(18) != null) {
                beanFacsimil.strDirecAgente = cs.getString(17).trim() + " " + cs.getString(18).trim();
            }
            // REGISTROS ARCF24 ================================================
            // <editor-fold defaultstate="collapsed" desc="ARMANDO CONJUNCIÓN">
            rst = cs.getResultSet();
            String tkt = "";
            while (rst.next()) {
                tkt = rst.getString("TACN1").trim() + rst.getString("TDNR").trim();
                if (tkt.equals(filter.TDNR.trim())) {
                    int cpn = Integer.parseInt(rst.getString("TDNR").trim().substring(rst.getString("TDNR").trim().length() - 3));
                    strConj = rst.getString("TACN1").trim() + rst.getString("TDNR").trim().substring(0, rst.getString("TDNR").trim().length() - 3)
                            + Functions.fillZeros(3, String.valueOf(cpn - 1));
                    lstConj = new ArrayList<String>();
                    lstConj.add(strConj);
                }
                strConj += " - " + rst.getString("TDNR").trim().substring(rst.getString("TDNR").trim().length() - 2);
                lstConj.add(rst.getString("TACN1").trim() + rst.getString("TDNR").trim());
            }
            if (!strConj.contains("-")) {
                strConj = "";
                lstConj = new ArrayList<String>();
            }
            beanFacsimil.strConjuncion = strConj;
            beanFacsimil.lstConj = lstConj;
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            //</editor-fold>

            // REGISTROS BSPF64 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS BSPF64">
            /*if (cs.getMoreResults()) {
             rst = cs.getResultSet();
             if (rst.next()) {
             beanFacsimil.FARE = rst.getString("FARE");
             beanFacsimil.EQFR = rst.getString("EQFR");
             beanFacsimil.TAXA1 = rst.getString("TAXA1");
             beanFacsimil.TAXA2 = rst.getString("TAXA2");
             beanFacsimil.TAXA3 = rst.getString("TAXA3");
             beanFacsimil.FCMI = rst.getString("FCMI");
             beanFacsimil.FCPI = rst.getString("FCPI");
             beanFacsimil.TOTL = rst.getString("TOTL");
             }
             try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
             }*/
            //</editor-fold>
            // REGISTROS ARCF30 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS ARCF30">
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                int pos = 0;
                while (rst.next()) {
                    pos++;
                    if (pos == 1) {
                        beanFacsimil.FARE = rst.getString("FAMT");
                        beanFacsimil.CUTP1 = rst.getString("CUTP1");
                        beanFacsimil.TOTL = rst.getString("TDAM");
                    }
                    lstTaxes.add(rst.getString("TMFT1") + rst.getString("TMFS1") + rst.getString("TMFA1"));
                    lstTaxes.add(rst.getString("TMFT2") + rst.getString("TMFS2") + rst.getString("TMFA2"));
                }
                beanFacsimil.lstTaxes = lstTaxes;
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS ARCF81 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS BSPF81">
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.FRCS += rst.getString("FRCS").trim();
                    beanFacsimil.FRCA += rst.getString("FRCA").trim();
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS ARCF84 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS ARCF84">
            String strFPTP = "";
            double cash = 0, credit = 0;
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();

                while (rst.next()) {
                    beanFacsimil.FPTP = rst.getString("FPTP");
                    beanFacsimil.FPAM = rst.getString("FPAM");
                    beanFacsimil.FPAC = rst.getString("FPAC");
                    strFPTP = Functions.fillString(rst.getString("FPTP").trim(), 4);
                    if (strFPTP.startsWith("CA") || strFPTP.startsWith("CM")) {
                        beanFacsimil.strCash = beanFacsimil.CUTP1;
                        cash += rst.getDouble("FPAM");
                    } else if (strFPTP.startsWith("CC")) {
                        beanFacsimil.strCredit = beanFacsimil.CUTP1;
                        credit += rst.getDouble("FPAM");
                    } else if (strFPTP.substring(2, 4).equals("CA")) {
                        beanFacsimil.strCash = beanFacsimil.CUTP1;
                        cash += rst.getDouble("FPAM");
                    } else if (strFPTP.substring(2, 4).equals("CC")) {
                        beanFacsimil.strCredit = beanFacsimil.CUTP1;
                        credit += rst.getDouble("FPAM");
                    } else if (rst.getString("FPTP").trim().startsWith("RF")) {
                        beanFacsimil.strCash = beanFacsimil.CUTP1;
                        cash += rst.getDouble("FPAM");
                        beanFacsimil.strVD = "Refund";
                    } else if (rst.getString("FPTP").trim().startsWith("TC")) {
                        beanFacsimil.strCredit = beanFacsimil.CUTP1;
                        credit += rst.getDouble("FPAM");
                        beanFacsimil.strVD = "Refund";
                    } else if (strFPTP.trim().equals("EX")) {
                        if (!beanFacsimil.strIssExc.trim().equals("")) {
                            beanFacsimil.strIssExc += " / " + Functions.fillString(rst.getString("FPAC"), 13).substring(0, 13);
                        } else {
                            beanFacsimil.strIssExc += Functions.fillString(rst.getString("FPAC"), 13).substring(0, 13);
                        }
                    } else if (strFPTP.trim().equals("VD")) {
                        beanFacsimil.strVD = "VD";
                    } else {
                        beanFacsimil.strOthers = strFPTP.trim() + " : " + beanFacsimil.CUTP1 + " " + rst.getString("FPAM").trim();
                    }
                }
                beanFacsimil.strCash += " " + String.valueOf(cash);
                if (beanFacsimil.strCash.endsWith(".0")) {
                    beanFacsimil.strCash = beanFacsimil.strCash.replace(".0", ".00");
                }
                beanFacsimil.strCredit += " " + String.valueOf(credit);
                if (beanFacsimil.strCredit.endsWith(".0")) {
                    beanFacsimil.strCredit = beanFacsimil.strCredit.replace(".0", ".00");
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            strFPTP = null;
            //</editor-fold>

            // REGISTROS A720 ==================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS A720">
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {

                    beanFacsimil.A720REGIST = rst.getString("A720REGIST").trim();
                    beanFacsimil.A720FREGIS = rst.getString("A720FREGIS").trim();
                    beanFacsimil.A720REVISA = rst.getString("A720REVISA").trim();
                    beanFacsimil.A720FREVIS = rst.getString("A720FREVIS").trim();
                    beanFacsimil.A720GRUPO = rst.getString("A720GRUPO").trim();
                    beanFacsimil.A720ORIG = rst.getString("A720ORIG").trim();
                    beanFacsimil.A720FLAG = rst.getString("A720FLAG").trim();
                    beanFacsimil.A720CTKTC = rst.getLong("A720CTKTC");
                    beanFacsimil.A720PRO = rst.getString("A720PRO").trim();
                    beanFacsimil.A720MONREG = rst.getString("A720MONREG").trim();
                    beanFacsimil.A720FECVTA = rst.getString("A720FECVTA").trim();
                    beanFacsimil.A720CIUVTA = rst.getString("A720CIUVTA").trim();
                    beanFacsimil.A720PAIVTA = rst.getString("A720PAIVTA").trim();
                    beanFacsimil.A720CIUEMI = rst.getString("A720CIUEMI").trim();
                    beanFacsimil.A720PAIEMI = rst.getString("A720PAIEMI").trim();
                    beanFacsimil.A720COMMIS = rst.getDouble("A720COMMIS");
                    beanFacsimil.A720MDACOM = rst.getString("A720MDACOM").trim();
                    beanFacsimil.A720PORCOM = rst.getDouble("A720PORCOM");
                    beanFacsimil.A720CODIT = rst.getString("A720CODIT").trim();
                    beanFacsimil.A720INITRA = rst.getString("A720INITRA").trim();
                    beanFacsimil.A720TAJUST = rst.getDouble("A720TAJUST");
                    beanFacsimil.A720TAJUSQ = rst.getDouble("A720TAJUSQ");
                    beanFacsimil.A720TARIFA = rst.getDouble("A720TARIFA");
                    beanFacsimil.A720TRFPAG = rst.getDouble("A720TRFPAG");
                    beanFacsimil.A720TRFNUC = rst.getDouble("A720TRFNUC");
                    beanFacsimil.A720ROE = rst.getDouble("A720ROE");
                    beanFacsimil.A720CPLUSS = rst.getDouble("A720CPLUSS");
                    beanFacsimil.A720CSOVER = rst.getDouble("A720CSOVER");
                    beanFacsimil.A720QSOVER = rst.getLong("A720QSOVER");
                    beanFacsimil.A720MONEDA = rst.getString("A720MONEDA").trim();
                    beanFacsimil.A720MDAPAG = rst.getString("A720MDAPAG").trim();
                    beanFacsimil.A1345FEXCH = rst.getString("A1345FEXCH").trim();
                    beanFacsimil.A1345NRPRT = rst.getString("A1345NRPRT").trim();
                    beanFacsimil.A1345CURR = rst.getString("A1345CURR").trim();
                    beanFacsimil.A1345PGCUR = rst.getString("A1345PGCUR").trim();
                    beanFacsimil.A1345FARE = rst.getDouble("A1345FARE");
                    beanFacsimil.A1345PAGO = rst.getDouble("A1345PAGO");

                    beanCpn = null;
                    for (int i = 1; i < 5; i++) {
                        if (!rst.getString("A720RUTA" + i).trim().equals("")) {
                            beanCpn = new A720Filter();
                            beanCpn.A720RUTAO = rst.getString("A720RUTA" + (i - 1)).trim();
                            beanCpn.A720RUTAD = rst.getString("A720RUTA" + i).trim();
                            try {
                                if (!beanCpn.A720RUTAO.trim().equals("") && hmCiudades.containsKey(beanCpn.A720RUTAO.trim())) {
                                    beanCpn.strDescRutaO = hmCiudades.get(beanCpn.A720RUTAO.trim()).toString();
                                } else {
                                    beanCpn.strDescRutaO = "(EMPTY)";
                                }
                                if (!beanCpn.A720RUTAD.trim().equals("") && hmCiudades.containsKey(beanCpn.A720RUTAD.trim())) {
                                    beanCpn.strDescRutaD = hmCiudades.get(beanCpn.A720RUTAD.trim()).toString();
                                } else {
                                    beanCpn.strDescRutaD = "(EMPTY)";
                                }
                            } catch (Exception e) {
                            }
                            beanCpn.A720CONEX = rst.getString("A720CONEX" + i).trim();
                            beanCpn.A720CARRA = rst.getString("A720CARRA" + i).trim();
                            beanCpn.A720NVLO = rst.getString("A720NVLO" + i).trim();
                            beanCpn.A720FVLO = rst.getString("A720FVLO" + i).trim();
                            beanCpn.A720BOOKI = rst.getString("A720BOOKI" + i).trim();
                            beanCpn.A720CLASE = rst.getString("A720CLASE" + i).trim();
                            beanCpn.A720FBUSO = rst.getString("A720FBUSO" + i).trim();
                            beanCpn.A720FARE = rst.getDouble("A720FARE" + i);
                            beanCpn.A720TFARE = rst.getString("A720TFARE" + i).trim();
                            beanCpn.A720SS = rst.getDouble("A720SS" + i);
                            beanCpn.A720VLSRP = rst.getDouble("A720VLSRP" + i);
                            beanCpn.A720VLMPA = rst.getDouble("A720VLMPA" + i);
                            beanCpn.A720ACUE = rst.getDouble("A720ACUE" + i);
                            beanCpn.A720ISC = rst.getDouble("A720ISC" + i);
                            beanCpn.A720VALOR = rst.getDouble("A720VALOR" + i);
                            beanCpn.A720AJUST = rst.getDouble("A720AJUST" + i);
                            beanCpn.A720ACUEO = rst.getDouble("A720ACUEO" + i);
                            beanCpn.A720QIN = rst.getDouble("A720QIN" + i);
                            beanCpn.A720FACT = rst.getDouble("A720FACT" + i);
                            beanCpn.A720PPRO = rst.getDouble("A720PPRO" + i);
                            beanCpn.A720PROV = rst.getDouble("A720PROV" + i);
                            beanCpn.A720PRRCM = rst.getDouble("A720PRRCM" + i);
                            beanCpn.A720YQ = rst.getDouble("A720YQ" + i);
                            lstRegA720.add(beanCpn);
                            hmValueA720.put(rst.getString("A720CIA").trim() + rst.getString("A720FORMA").trim() + rst.getString("A720SERIE").trim() + i, rst.getDouble("A720VALOR" + i));
                        }
                    }

                    beanFacsimil.lstRegA720 = lstRegA720;
                    //Obteniendo Sale Exch. Rate =============================== 
                    if (beanFacsimil.A720MDAPAG.trim().equals("MXN")) {
                        beanFacsimil.A1526RATE = 1;
                        beanFacsimil.dblTarifa = beanFacsimil.A720TRFPAG;
                        beanFacsimil.strMonTarifa = "MXN";

                    } else if (!beanFacsimil.A720MDAPAG.trim().equals("")
                            && !beanFacsimil.A720MDAPAG.trim().equals("MXN")) {

                        //(A1526)
                        double rate = 0;
                        strSQL = "SELECT A1526RATE FROM " + session.getMainLibrary() + ".A1526 WHERE A1526CUR = '"
                                + beanFacsimil.A720MDAPAG.trim() + "' AND A1526CUR2 = 'MXN' "
                                + "AND A1526DIS = '" + beanFacsimil.A720FECVTA.trim() + "'";

                        stmt = cnx.prepareStatement(strSQL);
                        rst2 = stmt.executeQuery();
                        if (rst2.next()) {
                            rate = rst2.getDouble("A1526RATE");
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;
                        stmt.close();
                        stmt = null;

                        if (rate > 0) {
                            beanFacsimil.A1526RATE = rate;
                            beanFacsimil.dblTarifa = beanFacsimil.A720TRFPAG * rate;
                            beanFacsimil.strMonTarifa = "MXN";
                        }

                    } else {
                        if (beanFacsimil.A720MONEDA.trim().equals("MXN")) {
                            beanFacsimil.A1526RATE = 1;
                            beanFacsimil.dblTarifa = beanFacsimil.A720TARIFA;
                            beanFacsimil.strMonTarifa = "MXN";

                        } else if (!beanFacsimil.A720MONEDA.trim().equals("") && !beanFacsimil.A720MONEDA.trim().equals("MXN")) {
                            //(A1526)
                            double rate = 0;
                            strSQL = "SELECT A1526RATE FROM " + session.getMainLibrary() + ".A1526 WHERE A1526CUR = '"
                                    + beanFacsimil.A720MONEDA.trim() + "' AND A1526CUR2 = 'MXN' "
                                    + "AND A1526DIS = '" + beanFacsimil.A720FECVTA.trim() + "'";

                            stmt = cnx.prepareStatement(strSQL);
                            rst2 = stmt.executeQuery();
                            if (rst2.next()) {
                                rate = rst2.getDouble("A1526RATE");
                            }
                            try {
                                rst2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                            rst2 = null;
                            stmt.close();
                            stmt = null;
                            if (rate > 0) {
                                beanFacsimil.A1526RATE = rate;
                                beanFacsimil.dblTarifa = beanFacsimil.A720TARIFA * rate;
                                beanFacsimil.strMonTarifa = "MXN";
                            }
                        }
                    }

                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS ARCF63 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS ARCF63">
            int pos = 0;
            if (cs.getMoreResults()) {

                //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.DAIS = "20" + rst.getString("DAIS");
                    pos++;

                    try {
                        if (pos != rst.getInt("CPNR") && !strCPUI.trim().equals("")
                                && strCPUI.substring(pos - 1, pos).trim().equals("S")) {
                            reg63 = new BSPF63();
                            reg63.strDescFrom = lstReg63.get(pos - 2).DSTC + " SURFACE";
                            reg63.strDescTo = rst.getString("ACCD1") + " SURFACE";
                            reg63.RESD1 = "SURFACE";
                            reg63.CARR = "**";
                            lstReg63.add(reg63);
                        }
                    } catch (Exception e) {
                    }
                    reg63 = new BSPF63();
                    reg63.STPO = rst.getString("STPO");
                    reg63.ORAC = rst.getString("ACCD1");
                    reg63.DSTC = rst.getString("ACCD2");
                    reg63.CARR = rst.getString("TACN");
                    reg63.FTNR = rst.getString("FTNR");
                    reg63.DAIS = rst.getString("DAIS");
                    reg63.RBKD = rst.getString("RBKD");
                    reg63.FTDA = rst.getString("FTDA");
                    reg63.FTDT = rst.getString("FTDT");
                    reg63.FBST = rst.getString("FBST");
                    reg63.FBTD = rst.getString("FBTD");
                    reg63.NBDA = rst.getString("NBDA");
                    reg63.NADA = rst.getString("NADA");

                    try {
                        if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                            reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                        } else {
                            reg63.strDescFrom = reg63.ORAC;
                        }
                        if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                            reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                        } else {
                            reg63.strDescTo = reg63.DSTC;
                        }
                    } catch (Exception e) {
                    }

                    // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                    //OBTENIENDO DATOS DEL USO =================================
                    boolean encontroUso = false;
                    // VOLADO 
                    strSQL = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                            + "' AND CUPON = '" + rst.getString("CPNR").trim() + "' ";

                    stmt = cnx.prepareStatement(strSQL);
                    rst2 = stmt.executeQuery();
                    if (rst2.next()) {
                        encontroUso = true;
                        reg63.strUso = "F";
                        reg63.strDesUso = "Flown";
                        reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                        reg63.dblMontoUso = rst2.getDouble("VCPN");
                    }
                    try {
                        rst2.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                    rst2 = null;

                    if (!encontroUso) {
                        strSQL = "SELECT FECR, VCPN FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                + "' AND CUPON = '" + rst.getString("CPNR").trim() + "' ";

                        rst2 = stmt.executeQuery(strSQL);
                        if (rst2.next()) {
                            encontroUso = true;
                            reg63.strUso = "D";
                            reg63.strDesUso = "Discharges";
                            reg63.strFecUso = rst2.getString("FECR").trim();
                            reg63.dblMontoUso = rst2.getDouble("VCPN");
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;
                    }

                    if (!encontroUso) {
                        //Buscando el Uso en el A1538 ==============================
                        strSQL = "SELECT A1538UCRUC, A1538FCRUC, A1538VCPN FROM " + session.getMainLibrary() + ".A1538 "
                                + "WHERE A1538CCUST = '" + ccust.trim()
                                + "' AND A1538CIA = '" + filter.TDNR.trim().substring(0, 3)
                                + "' AND A1538FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                + "' AND A1538SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                + "' AND A1538CUPON = '" + rst.getString("CPNR").trim() + "' ";

                        rst2 = stmt.executeQuery(strSQL);
                        if (rst2.next()) {
                            //No se considera el volado
                            if (!rst2.getString("A1538UCRUC").trim().equals("F") && !rst2.getString("A1538UCRUC").trim().equals("V")) {
                                encontroUso = true;
                                reg63.strUso = rst2.getString("A1538UCRUC").trim();
                                if (rst2.getString("A1538UCRUC").trim().equals("E")) {
                                    reg63.strDesUso = "Exchange";
                                } else if (rst2.getString("A1538UCRUC").trim().equals("R")) {
                                    reg63.strDesUso = "Refund";
                                } else if (rst2.getString("A1538UCRUC").trim().equals("I")) {
                                    reg63.strDesUso = "Interline";
                                }
                                reg63.strFecUso = rst2.getString("A1538FCRUC").trim();
                                reg63.dblMontoUso = rst2.getDouble("A1538VCPN");
                            }
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;

                        if (!encontroUso) {
                            // EXCHANGE 
                            strSQL = "SELECT A1540FCONT FROM " + session.getMainLibrary() + ".A1540 "
                                    + "WHERE A1540CCUST = '" + ccust.trim()
                                    + "' AND A1540CIA = '" + filter.TDNR.trim().substring(0, 3)
                                    + "' AND A1540FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                    + "' AND A1540SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                    + "' AND A1540CUPON = '" + rst.getString("CPNR").trim() + "' ";

                            rst2 = stmt.executeQuery(strSQL);
                            if (rst2.next()) {
                                encontroUso = true;
                                reg63.strUso = "E";
                                reg63.strDesUso = "Exchange";
                                reg63.strFecUso = rst2.getString("A1540FCONT").trim();
                            }
                            try {
                                rst2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                            rst2 = null;

                            if (!encontroUso) {
                                // REFUND 
                                strSQL = "SELECT A1541FCONT FROM " + session.getMainLibrary() + ".A1541 "
                                        + "WHERE A1541CCUST = '" + ccust.trim()
                                        + "' AND A1541CIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND A1541FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND A1541SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND A1541CUPON = '" + rst.getString("CPNR").trim() + "' ";

                                rst2 = stmt.executeQuery(strSQL);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "R";
                                    reg63.strDesUso = "Refund";
                                    reg63.strFecUso = rst2.getString("A1541FCONT").trim();
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;

                                if (!encontroUso) {
                                    // INTERLINE 
                                    strSQL = "SELECT A1542FCONT FROM " + session.getMainLibrary() + ".A1542 "
                                            + "WHERE A1542CCUST = '" + ccust.trim()
                                            + "' AND A1542CIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND A1542FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND A1542SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND A1542CUPON = '" + rst.getString("CPNR").trim() + "' ";

                                    rst2 = stmt.executeQuery(strSQL);
                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.strUso = "I";
                                        reg63.strDesUso = "Interline";
                                        reg63.strFecUso = rst2.getString("A1542FCONT").trim();
                                    }
                                    try {
                                        rst2.close();
                                    } catch (SQLException e) {
                                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                    }
                                    rst2 = null;
                                }
                            }
                        }
                    }

                    //</editor-fold>
                    if (hmValueA720.containsKey(rst.getString("TDNR").trim() + rst.getInt("CPNR"))) {
                        reg63.dblMontoUso = Double.parseDouble(hmValueA720.get(rst.getString("TDNR").trim() + rst.getInt("CPNR")).toString());
                    }

                    lstReg63.add(reg63);
                }
                stmt.close();
                stmt = null;
                beanFacsimil.lstReg63 = lstReg63;
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() + ". StackTrace:" + e.toString());
        } catch (Exception e) {
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() + ". StackTrace:" + e.toString());
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rst2 != null) {
                try {
                    rst2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (stmt != null) {
                stmt.close();
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();

            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return beanFacsimil;
    }

    public FACSIMILFilter loadASRFacsimil(String ccust, UserView user, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {

        CallableStatement cs = null;
        PreparedStatement stmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<>();
        List<String> lstConj = new ArrayList<>();
        BSPF63 reg63;
        List<A720Filter> lstRegA720 = new ArrayList<>();
        List<String> lstTaxes = new ArrayList<>();
        HashMap hmValueA720 = new HashMap();
        A720Filter beanCpn;
        String strCPUI = "", strConj = ""; //VOID

        Connection cnx = null;
        try {

            String strSQL = "{CALL " + session.getMainLibrary() + ".PXASRFACSIMIL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(3, Types.VARCHAR);
            cs.registerOutParameter(4, Types.VARCHAR);
            cs.registerOutParameter(5, Types.VARCHAR);
            cs.registerOutParameter(6, Types.VARCHAR);
            cs.registerOutParameter(7, Types.VARCHAR);
            cs.registerOutParameter(8, Types.VARCHAR);
            cs.registerOutParameter(9, Types.VARCHAR);
            cs.registerOutParameter(10, Types.VARCHAR);
            cs.registerOutParameter(11, Types.VARCHAR);
            cs.registerOutParameter(12, Types.DOUBLE);
            cs.registerOutParameter(13, Types.VARCHAR);
            cs.registerOutParameter(14, Types.VARCHAR);
            cs.registerOutParameter(15, Types.VARCHAR);
            cs.registerOutParameter(16, Types.VARCHAR);
            cs.registerOutParameter(17, Types.VARCHAR);
            cs.registerOutParameter(18, Types.VARCHAR);
            cs.registerOutParameter(19, Types.VARCHAR);
            cs.registerOutParameter(20, Types.VARCHAR);

            cs.setString(1, ccust);
            cs.setString(2, filter.TDNR.trim());
            cs.setString(3, filter.AGTN.trim());
            cs.setString(4, "");
            cs.setString(5, "");
            cs.setString(6, "");
            cs.setString(7, "");
            cs.setString(8, "");
            cs.setString(9, "");
            cs.setString(10, "");
            cs.setString(11, "");
            cs.setDouble(12, 0);
            cs.setString(13, "");
            cs.setString(14, "");
            cs.setString(15, "");
            cs.setString(16, "");
            cs.setString(17, "");
            cs.setString(18, "");
            cs.setString(19, "");
            cs.setString(20, "");
            cs.execute();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.TDNR = filter.TDNR.trim();
            beanFacsimil.FUENTE = "ASR";
            strConj = beanFacsimil.TDNR.trim();
            lstConj.add(beanFacsimil.TDNR.trim());
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();
            beanFacsimil.nombre = filter.nombre.trim();

            // REGISTROS ASRF24 ================================================
            if (cs.getString(3) != null) {
                beanFacsimil.AGTN = cs.getString(3).trim();
            }
            if (cs.getString(4) != null) {
                beanFacsimil.PDAI = cs.getString(4).trim();
                if (!beanFacsimil.PDAI.trim().equals("")) {
                    beanFacsimil.periodo = Functions.getAbreviaturaMes(Functions.fillString(beanFacsimil.PDAI, 3).substring(0, 2))
                            + " - Week " + Functions.fillString(beanFacsimil.PDAI, 3).substring(2, 3);
                }
            }
            if (cs.getString(5) != null) {
                beanFacsimil.HRED = cs.getString(5).trim();
                if (!beanFacsimil.HRED.trim().equals("")) {
                    beanFacsimil.formatDate = "20" + beanFacsimil.HRED.substring(0, 2) + " " + Functions.getAbreviaturaMes(beanFacsimil.HRED.substring(2, 4))
                            + " " + beanFacsimil.HRED.substring(4, 6);
                }
            }
            if (cs.getString(6) != null) {
                strCPUI = Functions.fillString(cs.getString(6).trim(), 4);
                if (strCPUI.startsWith("V")) {
                    for (int i = 0; i < strCPUI.length(); i++) {
                        if (strCPUI.substring(i, i + 1).trim().equals("V")) {
                            reg63 = new BSPF63();
                            reg63.STPO = "Void";
                            reg63.ORAC = "Void";
                            reg63.DSTC = "Void";
                            reg63.CARR = "Void";
                            reg63.FTNR = "Void";
                            reg63.DAIS = "Void";
                            reg63.RBKD = "Void";
                            reg63.FTDA = "Void";
                            reg63.FTDT = "Void";
                            reg63.FBTD = "Void";
                            reg63.NBDA = "Void";
                            reg63.NADA = "Void";
                            reg63.strDescFrom = "Void";
                            reg63.strDescTo = "Void";
                            lstReg63.add(reg63);
                        }
                    }
                }
            }
            if (cs.getString(7) != null) {
                beanFacsimil.TODC = cs.getString(7).trim();
            }
            if (cs.getString(8) != null) {
                beanFacsimil.CDGT = cs.getString(8).trim();
            }
            if (cs.getString(9) != null) {
                beanFacsimil.TOUR = cs.getString(9).trim();
            }
            if (cs.getString(10) != null) {
                beanFacsimil.CJCP = cs.getString(10).trim();
            }
            // REGISTRO ASRF30 =================================================
            if (cs.getString(11) != null) {
                beanFacsimil.CUTP1 = cs.getString(11).trim();
            }
            if (cs.getString(12) != null) {
                beanFacsimil.COBL += " " + String.valueOf(cs.getDouble(12)).trim();
                if (beanFacsimil.COBL.endsWith(".0")) {
                    beanFacsimil.COBL = beanFacsimil.COBL.replace(".0", ".00");
                }
            }
            // REGISTRO ASRF46 =================================================
            if (cs.getString(13) != null) {
                beanFacsimil.ENRS = cs.getString(13).trim();
            }
            if (cs.getString(14) != null) {
                beanFacsimil.ORIN = cs.getString(14).trim();
            }
            // REGISTROS ASRF65 ================================================
            if (cs.getString(15) != null) {
                beanFacsimil.PXNM = cs.getString(15).trim();
            }
            // REGISTROS ASRF66 ================================================
            if (cs.getString(16) != null) {
                beanFacsimil.FPSN = cs.getString(16).trim();
            }
            if (cs.getString(17) != null) {
                beanFacsimil.FPIN = cs.getString(17).trim();
            }
            // REGISTRO A003 ===================================================
            if (cs.getString(18) != null) {
                beanFacsimil.strNombreAgente = cs.getString(18).trim();
            }
            if (cs.getString(19) != null && cs.getString(20) != null) {
                beanFacsimil.strDirecAgente = cs.getString(19).trim() + " " + cs.getString(20).trim();
            }

            // REGISTROS ASRF64 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS ASRF64">
            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                if (pos == 1) {
                    beanFacsimil.FARE = rst.getString("BCUC").substring(0, 3) + rst.getString("FARE");
                    beanFacsimil.EQFR = rst.getString("EQFR");
                    beanFacsimil.FCMI = rst.getString("FCMI");
                }
                lstTaxes.add(rst.getString("TAXA"));
                lstTaxes.add(rst.getString("TAXB"));
                lstTaxes.add(rst.getString("TAXC"));
            }
            beanFacsimil.lstTaxes = lstTaxes;

            /*if (rst.next()) {
             beanFacsimil.FARE = rst.getString("FARE");
             beanFacsimil.EQFR = rst.getString("EQFR");
             beanFacsimil.TAXA1 = rst.getString("TAXA");
             beanFacsimil.TAXA2 = rst.getString("TAXB");
             beanFacsimil.TAXA3 = rst.getString("TAXC");
             beanFacsimil.FCMI = rst.getString("FCMI");
             }*/
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            //</editor-fold>

            // REGISTROS ASRF81 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS ASRF81">
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.FRCS += rst.getString("FRCS").trim();
                    beanFacsimil.FRCA += rst.getString("FRCA").trim();
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS ASRF84 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS ASRF84">
            String strFPTP = "";
            double cash = 0, credit = 0;
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.FPTP = rst.getString("FPTP");
                    beanFacsimil.FPAM = rst.getString("FPAM");
                    beanFacsimil.FPAC = rst.getString("FPAC");

                    strFPTP = Functions.fillString(rst.getString("FPTP").trim(), 4);
                    if (strFPTP.startsWith("CA") || strFPTP.startsWith("CM")) {
                        beanFacsimil.strCash = beanFacsimil.CUTP1;
                        cash += rst.getDouble("FPAM");
                    } else if (strFPTP.startsWith("CC")) {
                        beanFacsimil.strCredit = beanFacsimil.CUTP1;
                        credit += rst.getDouble("FPAM");
                    } else if (strFPTP.substring(2, 4).equals("CA")) {
                        beanFacsimil.strCash = beanFacsimil.CUTP1;
                        cash += rst.getDouble("FPAM");
                    } else if (strFPTP.substring(2, 4).equals("CC")) {
                        beanFacsimil.strCredit = beanFacsimil.CUTP1;
                        credit += rst.getDouble("FPAM");
                    } else if (strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) {
                        if (!beanFacsimil.strIssExc.trim().equals("")) {
                            beanFacsimil.strIssExc += " / " + Functions.fillString(rst.getString("FPAC"), 13).substring(0, 13);
                        } else {
                            beanFacsimil.strIssExc += Functions.fillString(rst.getString("FPAC"), 13).substring(0, 13);
                        }
                    } else if (strFPTP.trim().equals("VD")) {
                        beanFacsimil.strVD = "VD";
                    } else {
                        beanFacsimil.strOthers += strFPTP.trim() + " : " + beanFacsimil.CUTP1 + " " + rst.getString("FPAM").trim();
                    }
                }
                beanFacsimil.strCash += " " + String.valueOf(cash);
                if (beanFacsimil.strCash.endsWith(".0")) {
                    beanFacsimil.strCash = beanFacsimil.strCash.replace(".0", ".00");
                }
                beanFacsimil.strCredit += " " + String.valueOf(credit);
                if (beanFacsimil.strCredit.endsWith(".0")) {
                    beanFacsimil.strCredit = beanFacsimil.strCredit.replace(".0", ".00");
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            strFPTP = null;
            //</editor-fold>

            // REGISTROS A720 ==================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS A720">
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {

                    beanFacsimil.A720REGIST = rst.getString("A720REGIST").trim();
                    beanFacsimil.A720FREGIS = rst.getString("A720FREGIS").trim();
                    beanFacsimil.A720REVISA = rst.getString("A720REVISA").trim();
                    beanFacsimil.A720FREVIS = rst.getString("A720FREVIS").trim();
                    beanFacsimil.A720GRUPO = rst.getString("A720GRUPO").trim();
                    beanFacsimil.A720ORIG = rst.getString("A720ORIG").trim();
                    beanFacsimil.A720FLAG = rst.getString("A720FLAG").trim();
                    beanFacsimil.A720CTKTC = rst.getLong("A720CTKTC");
                    beanFacsimil.A720PRO = rst.getString("A720PRO").trim();
                    beanFacsimil.A720MONREG = rst.getString("A720MONREG").trim();
                    beanFacsimil.A720FECVTA = rst.getString("A720FECVTA").trim();
                    beanFacsimil.A720CIUVTA = rst.getString("A720CIUVTA").trim();
                    beanFacsimil.A720PAIVTA = rst.getString("A720PAIVTA").trim();
                    beanFacsimil.A720CIUEMI = rst.getString("A720CIUEMI").trim();
                    beanFacsimil.A720PAIEMI = rst.getString("A720PAIEMI").trim();
                    beanFacsimil.A720COMMIS = rst.getDouble("A720COMMIS");
                    beanFacsimil.A720MDACOM = rst.getString("A720MDACOM").trim();
                    beanFacsimil.A720PORCOM = rst.getDouble("A720PORCOM");
                    beanFacsimil.A720CODIT = rst.getString("A720CODIT").trim();
                    beanFacsimil.A720INITRA = rst.getString("A720INITRA").trim();
                    beanFacsimil.A720TAJUST = rst.getDouble("A720TAJUST");
                    beanFacsimil.A720TAJUSQ = rst.getDouble("A720TAJUSQ");
                    beanFacsimil.A720TARIFA = rst.getDouble("A720TARIFA");
                    beanFacsimil.A720TRFPAG = rst.getDouble("A720TRFPAG");
                    beanFacsimil.A720TRFNUC = rst.getDouble("A720TRFNUC");
                    beanFacsimil.A720ROE = rst.getDouble("A720ROE");
                    beanFacsimil.A720CPLUSS = rst.getDouble("A720CPLUSS");
                    beanFacsimil.A720CSOVER = rst.getDouble("A720CSOVER");
                    beanFacsimil.A720QSOVER = rst.getLong("A720QSOVER");
                    beanFacsimil.A720MONEDA = rst.getString("A720MONEDA").trim();
                    beanFacsimil.A720MDAPAG = rst.getString("A720MDAPAG").trim();
                    beanFacsimil.A1345FEXCH = rst.getString("A1345FEXCH").trim();
                    beanFacsimil.A1345NRPRT = rst.getString("A1345NRPRT").trim();
                    beanFacsimil.A1345CURR = rst.getString("A1345CURR").trim();
                    beanFacsimil.A1345PGCUR = rst.getString("A1345PGCUR").trim();
                    beanFacsimil.A1345FARE = rst.getDouble("A1345FARE");
                    beanFacsimil.A1345PAGO = rst.getDouble("A1345PAGO");

                    beanCpn = null;
                    for (int i = 1; i < 5; i++) {
                        if (!rst.getString("A720RUTA" + i).trim().equals("")) {
                            beanCpn = new A720Filter();
                            beanCpn.A720RUTAO = rst.getString("A720RUTA" + (i - 1)).trim();
                            beanCpn.A720RUTAD = rst.getString("A720RUTA" + i).trim();
                            try {
                                if (!beanCpn.A720RUTAO.trim().equals("") && hmCiudades.containsKey(beanCpn.A720RUTAO.trim())) {
                                    beanCpn.strDescRutaO = hmCiudades.get(beanCpn.A720RUTAO.trim()).toString();
                                } else {
                                    beanCpn.strDescRutaO = "(EMPTY)";
                                }
                                if (!beanCpn.A720RUTAD.trim().equals("") && hmCiudades.containsKey(beanCpn.A720RUTAD.trim())) {
                                    beanCpn.strDescRutaD = hmCiudades.get(beanCpn.A720RUTAD.trim()).toString();
                                } else {
                                    beanCpn.strDescRutaD = "(EMPTY)";
                                }
                            } catch (Exception e) {
                            }
                            beanCpn.A720CONEX = rst.getString("A720CONEX" + i).trim();
                            beanCpn.A720CARRA = rst.getString("A720CARRA" + i).trim();
                            beanCpn.A720NVLO = rst.getString("A720NVLO" + i).trim();
                            beanCpn.A720FVLO = rst.getString("A720FVLO" + i).trim();
                            beanCpn.A720BOOKI = rst.getString("A720BOOKI" + i).trim();
                            beanCpn.A720CLASE = rst.getString("A720CLASE" + i).trim();
                            beanCpn.A720FBUSO = rst.getString("A720FBUSO" + i).trim();
                            beanCpn.A720FARE = rst.getDouble("A720FARE" + i);
                            beanCpn.A720TFARE = rst.getString("A720TFARE" + i).trim();
                            beanCpn.A720SS = rst.getDouble("A720SS" + i);
                            beanCpn.A720VLSRP = rst.getDouble("A720VLSRP" + i);
                            beanCpn.A720VLMPA = rst.getDouble("A720VLMPA" + i);
                            beanCpn.A720ACUE = rst.getDouble("A720ACUE" + i);
                            beanCpn.A720ISC = rst.getDouble("A720ISC" + i);
                            beanCpn.A720VALOR = rst.getDouble("A720VALOR" + i);
                            beanCpn.A720AJUST = rst.getDouble("A720AJUST" + i);
                            beanCpn.A720ACUEO = rst.getDouble("A720ACUEO" + i);
                            beanCpn.A720QIN = rst.getDouble("A720QIN" + i);
                            beanCpn.A720FACT = rst.getDouble("A720FACT" + i);
                            beanCpn.A720PPRO = rst.getDouble("A720PPRO" + i);
                            beanCpn.A720PROV = rst.getDouble("A720PROV" + i);
                            beanCpn.A720PRRCM = rst.getDouble("A720PRRCM" + i);
                            beanCpn.A720YQ = rst.getDouble("A720YQ" + i);
                            lstRegA720.add(beanCpn);
                            hmValueA720.put(rst.getString("A720CIA").trim() + rst.getString("A720FORMA").trim() + rst.getString("A720SERIE").trim() + i, rst.getDouble("A720VALOR" + i));
                        }
                    }

                    beanFacsimil.lstRegA720 = lstRegA720;
                    //Obteniendo Sale Exch. Rate =============================== 
                    if (beanFacsimil.A720MDAPAG.trim().equals("MXN")) {
                        beanFacsimil.A1526RATE = 1;
                        beanFacsimil.dblTarifa = beanFacsimil.A720TRFPAG;
                        beanFacsimil.strMonTarifa = "MXN";

                    } else if (!beanFacsimil.A720MDAPAG.trim().equals("")
                            && !beanFacsimil.A720MDAPAG.trim().equals("MXN")) {

                        //(A1526)
                        double rate = 0;
                        strSQL = "SELECT A1526RATE FROM " + session.getMainLibrary() + ".A1526 WHERE A1526CUR = '"
                                + beanFacsimil.A720MDAPAG.trim() + "' AND A1526CUR2 = 'MXN' "
                                + "AND A1526DIS = '" + beanFacsimil.A720FECVTA.trim() + "'";

                        stmt = cnx.prepareStatement(strSQL);
                        rst2 = stmt.executeQuery();
                        if (rst2.next()) {
                            rate = rst2.getDouble("A1526RATE");
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;
                        stmt.close();
                        stmt = null;

                        if (rate > 0) {
                            beanFacsimil.A1526RATE = rate;
                            beanFacsimil.dblTarifa = beanFacsimil.A720TRFPAG * rate;
                            beanFacsimil.strMonTarifa = "MXN";
                        }

                    } else {
                        if (beanFacsimil.A720MONEDA.trim().equals("MXN")) {
                            beanFacsimil.A1526RATE = 1;
                            beanFacsimil.dblTarifa = beanFacsimil.A720TARIFA;
                            beanFacsimil.strMonTarifa = "MXN";

                        } else if (!beanFacsimil.A720MONEDA.trim().equals("") && !beanFacsimil.A720MONEDA.trim().equals("MXN")) {
                            //(A1526)
                            double rate = 0;
                            strSQL = "SELECT A1526RATE FROM " + session.getMainLibrary() + ".A1526 WHERE A1526CUR = '"
                                    + beanFacsimil.A720MONEDA.trim() + "' AND A1526CUR2 = 'MXN' "
                                    + "AND A1526DIS = '" + beanFacsimil.A720FECVTA.trim() + "'";

                            stmt = cnx.prepareStatement(strSQL);
                            rst2 = stmt.executeQuery();
                            if (rst2.next()) {
                                rate = rst2.getDouble("A1526RATE");
                            }
                            try {
                                rst2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                            rst2 = null;
                            stmt.close();
                            stmt = null;
                            if (rate > 0) {
                                beanFacsimil.A1526RATE = rate;
                                beanFacsimil.dblTarifa = beanFacsimil.A720TARIFA * rate;
                                beanFacsimil.strMonTarifa = "MXN";
                            }
                        }
                    }

                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS ASRF63 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS ASRF63">
            pos = 0;
            if (cs.getMoreResults()) {

                //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.DAIS = "20" + rst.getString("DAIS");
                    pos++;

                    try {
                        if (pos != rst.getInt("SEGI") && !strCPUI.trim().equals("")
                                && strCPUI.substring(pos - 1, pos).trim().equals("S")) {
                            reg63 = new BSPF63();
                            reg63.strDescFrom = lstReg63.get(pos - 2).DSTC + " SURFACE";
                            reg63.strDescTo = rst.getString("ORAC") + " SURFACE";
                            reg63.RESD1 = "SURFACE";
                            reg63.CARR = "**";
                            lstReg63.add(reg63);
                        }
                    } catch (Exception e) {
                    }
                    reg63 = new BSPF63();
                    reg63.STPO = rst.getString("STOP");
                    reg63.ORAC = rst.getString("ORAC");
                    reg63.DSTC = rst.getString("DSTC");
                    reg63.CARR = rst.getString("CARR");
                    reg63.FTNR = rst.getString("FTNR");
                    reg63.DAIS = rst.getString("DAIS");
                    reg63.RBKD = rst.getString("RBKD");
                    reg63.FTDA = rst.getString("FTDA");
                    reg63.FTDT = rst.getString("FTDT");
                    //reg63.FBST = rst.getString("FBST");
                    reg63.FBTD = rst.getString("FBTD");
                    //reg63.NBDA = rst.getString("NBDA");
                    //reg63.NADA = rst.getString("NADA");
                    try {
                        if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                            reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                        } else {
                            reg63.strDescFrom = reg63.ORAC;
                        }
                        if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                            reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                        } else {
                            reg63.strDescTo = reg63.DSTC;
                        }
                    } catch (Exception e) {
                    }

                    // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                    //OBTENIENDO DATOS DEL USO =================================
                    boolean encontroUso = false;
                    // VOLADO 
                    strSQL = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                            + "' AND CUPON = '" + rst.getString("SEGI").trim() + "' ";

                    rst2 = stmt.executeQuery(strSQL);
                    if (rst2.next()) {
                        encontroUso = true;
                        reg63.strUso = "F";
                        reg63.strDesUso = "Flown";
                        reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                        reg63.dblMontoUso = rst2.getDouble("VCPN");
                    }
                    try {
                        rst2.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                    rst2 = null;

                    if (!encontroUso) {
                        strSQL = "SELECT FECR, VCPN FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                + "' AND CUPON = '" + rst.getString("SEGI").trim() + "' ";

                        rst2 = stmt.executeQuery(strSQL);
                        if (rst2.next()) {
                            encontroUso = true;
                            reg63.strUso = "D";
                            reg63.strDesUso = "Discharges";
                            reg63.strFecUso = rst2.getString("FECR").trim();
                            reg63.dblMontoUso = rst2.getDouble("VCPN");
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;
                    }

                    if (!encontroUso) {
                        //Buscando el Uso en el A1538 ==============================
                        strSQL = "SELECT A1538UCRUC, A1538FCRUC, A1538VCPN FROM " + session.getMainLibrary() + ".A1538 "
                                + "WHERE A1538CCUST = '" + ccust.trim()
                                + "' AND A1538CIA = '" + filter.TDNR.trim().substring(0, 3)
                                + "' AND A1538FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                + "' AND A1538SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                + "' AND A1538CUPON = '" + rst.getString("SEGI").trim() + "' ";

                        rst2 = stmt.executeQuery(strSQL);
                        if (rst2.next()) {
                            //No se considera el volado
                            if (!rst2.getString("A1538UCRUC").trim().equals("F") && !rst2.getString("A1538UCRUC").trim().equals("V")) {
                                encontroUso = true;
                                reg63.strUso = rst2.getString("A1538UCRUC").trim();
                                if (rst2.getString("A1538UCRUC").trim().equals("E")) {
                                    reg63.strDesUso = "Exchange";
                                } else if (rst2.getString("A1538UCRUC").trim().equals("R")) {
                                    reg63.strDesUso = "Refund";
                                } else if (rst2.getString("A1538UCRUC").trim().equals("I")) {
                                    reg63.strDesUso = "Interline";
                                }
                                reg63.strFecUso = rst2.getString("A1538FCRUC").trim();
                                reg63.dblMontoUso = rst2.getDouble("A1538VCPN");
                            }
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;

                        if (!encontroUso) {
                            // EXCHANGE 
                            strSQL = "SELECT A1540FCONT FROM " + session.getMainLibrary() + ".A1540 "
                                    + "WHERE A1540CCUST = '" + ccust.trim()
                                    + "' AND A1540CIA = '" + filter.TDNR.trim().substring(0, 3)
                                    + "' AND A1540FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                    + "' AND A1540SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                    + "' AND A1540CUPON = '" + rst.getString("SEGI").trim() + "' ";

                            rst2 = stmt.executeQuery(strSQL);
                            if (rst2.next()) {
                                encontroUso = true;
                                reg63.strUso = "E";
                                reg63.strDesUso = "Exchange";
                                reg63.strFecUso = rst2.getString("A1540FCONT").trim();
                            }
                            try {
                                rst2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                            rst2 = null;

                            if (!encontroUso) {
                                // REFUND 
                                strSQL = "SELECT A1541FCONT FROM " + session.getMainLibrary() + ".A1541 "
                                        + "WHERE A1541CCUST = '" + ccust.trim()
                                        + "' AND A1541CIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND A1541FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND A1541SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND A1541CUPON = '" + rst.getString("SEGI").trim() + "' ";

                                rst2 = stmt.executeQuery(strSQL);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "R";
                                    reg63.strDesUso = "Refund";
                                    reg63.strFecUso = rst2.getString("A1541FCONT").trim();
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;

                                if (!encontroUso) {
                                    // INTERLINE 
                                    strSQL = "SELECT A1542FCONT FROM " + session.getMainLibrary() + ".A1542 "
                                            + "WHERE A1542CCUST = '" + ccust.trim()
                                            + "' AND A1542CIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND A1542FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND A1542SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND A1542CUPON = '" + rst.getString("SEGI").trim() + "' ";

                                    rst2 = stmt.executeQuery(strSQL);
                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.strUso = "I";
                                        reg63.strDesUso = "Interline";
                                        reg63.strFecUso = rst2.getString("A1542FCONT").trim();
                                    }
                                    try {
                                        rst2.close();
                                    } catch (SQLException e) {
                                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                    }
                                    rst2 = null;
                                }
                            }
                        }
                    }

                    //</editor-fold>
                    if (hmValueA720.containsKey(rst.getString("TDNR").trim() + rst.getInt("SEGI"))) {
                        reg63.dblMontoUso = Double.parseDouble(hmValueA720.get(rst.getString("TDNR").trim() + rst.getInt("SEGI")).toString());
                    }

                    lstReg63.add(reg63);
                }
                stmt.close();
                stmt = null;
                beanFacsimil.lstReg63 = lstReg63;
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS ASRF24 ================================================
            // <editor-fold defaultstate="collapsed" desc="ARMANDO CONJUNCIÓN">
            long tkt = Long.parseLong(filter.TDNR.trim());

            if (beanFacsimil.CJCP.trim().equals("CNJ")) {
                //Se busca al PADRE ============================================
                strSQL = "SELECT TDNR FROM " + session.getMainLibrary() + ".ASRF24C WHERE CCUST = '"
                        + ccust.trim() + "' AND TDNR < '" + tkt
                        + "' AND CJCP <> 'CNJ' ORDER BY TDNR DESC FETCH FIRST 1 ROWS ONLY ";

                stmt = cnx.prepareStatement(strSQL); //session.getCNXIBMDB2().getConnection().createStatement();
                rst = stmt.executeQuery(strSQL);
                if (rst.next()) {
                    strConj = rst.getString("TDNR").trim();
                    lstConj = new ArrayList<String>();
                    lstConj.add(strConj);
                    tkt = Long.parseLong(rst.getString("TDNR").trim());
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }

                //Se busca hacia adelante las conjunciones =====================
                for (int c = 1; c <= 4; c++) {
                    strSQL = "SELECT TDNR, CJCP FROM " + session.getMainLibrary() + ".ASRF24C WHERE CCUST = '"
                            + ccust.trim() + "' AND TDNR = '" + (tkt + c) + "' ";
                    rst = stmt.executeQuery(strSQL);
                    if (rst.next()) {
                        if (rst.getString("CJCP").trim().equals("CNJ")) {
                            strConj += " - " + rst.getString("TDNR").trim().substring(rst.getString("TDNR").trim().length() - 2);
                            lstConj.add(rst.getString("TDNR").trim());
                        } else {
                            break;
                        }
                    }
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
                stmt.close();

            } else {
                //Se buscará sólo hacia adelante en busca de conjunciones (Max 4).
                for (int c = 1; c <= 4; c++) {
                    strSQL = "SELECT TDNR, CJCP FROM " + session.getMainLibrary() + ".ASRF24C WHERE CCUST = '"
                            + ccust.trim() + "' AND TDNR = '" + (tkt + c) + "' ";

                    stmt = cnx.prepareStatement(strSQL);
                    rst = stmt.executeQuery();
                    if (rst.next()) {
                        if (rst.getString("CJCP").trim().equals("CNJ")) {
                            strConj += " - " + rst.getString("TDNR").trim().substring(rst.getString("TDNR").trim().length() - 2);
                            lstConj.add(rst.getString("TDNR").trim());
                        } else {
                            break;
                        }
                    }
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
                stmt.close();
            }
            beanFacsimil.strConjuncion = strConj;
            beanFacsimil.lstConj = lstConj;
            //</editor-fold>

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() + ". StackTrace:" + e.toString());
        } catch (Exception e) {
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() + ". StackTrace:" + e.toString());
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rst2 != null) {
                try {
                    rst2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (stmt != null) {
                stmt.close();
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();

            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return beanFacsimil;
    }

    public FACSIMILFilter loadBSPFacsimil(String ccust, UserView user, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {

        CallableStatement cs = null;
        PreparedStatement stmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<BSPF63>();
        List<String> lstConj = new ArrayList<String>();
        List<A720Filter> lstRegA720 = new ArrayList<A720Filter>();
        List<String> lstTaxes = new ArrayList<String>();
        A720Filter beanCpn;
        HashMap hmValueA720 = new HashMap();
        BSPF63 reg63;
        String strCPUI = "", strConj = ""; //VOID
        String strSQL = "";

        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            strSQL = "{CALL " + session.getMainLibrary() + ".PXBSPFACSIMIL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(3, Types.VARCHAR);
            cs.registerOutParameter(4, Types.VARCHAR);
            cs.registerOutParameter(5, Types.VARCHAR);
            cs.registerOutParameter(6, Types.VARCHAR);
            cs.registerOutParameter(7, Types.VARCHAR);
            cs.registerOutParameter(8, Types.VARCHAR);
            cs.registerOutParameter(9, Types.VARCHAR);
            cs.registerOutParameter(10, Types.VARCHAR);
            cs.registerOutParameter(11, Types.DOUBLE);
            cs.registerOutParameter(12, Types.VARCHAR);
            cs.registerOutParameter(13, Types.VARCHAR);
            cs.registerOutParameter(14, Types.VARCHAR);
            cs.registerOutParameter(15, Types.VARCHAR);
            cs.registerOutParameter(16, Types.VARCHAR);
            cs.registerOutParameter(17, Types.VARCHAR);
            cs.registerOutParameter(18, Types.VARCHAR);
            cs.registerOutParameter(19, Types.VARCHAR);

            cs.setString(1, ccust);
            cs.setString(2, filter.TDNR.trim());
            cs.setString(3, filter.AGTN.trim());
            cs.setString(4, "");
            cs.setString(5, "");
            cs.setString(6, "");
            cs.setString(7, "");
            cs.setString(8, "");
            cs.setString(9, "");
            cs.setString(10, "");
            cs.setDouble(11, 0);
            cs.setString(12, "");
            cs.setString(13, "");
            cs.setString(14, "");
            cs.setString(15, "");
            cs.setString(16, "");
            cs.setString(17, "");
            cs.setString(18, "");
            cs.setString(19, "");
            cs.execute();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.TDNR = filter.TDNR.trim();
            beanFacsimil.FUENTE = "BSP";
            strConj = beanFacsimil.TDNR.trim();
            lstConj.add(beanFacsimil.TDNR.trim());
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();
            beanFacsimil.nombre = filter.nombre.trim();

            // REGISTROS BSPF24 ================================================
            if (cs.getString(3) != null) {
                beanFacsimil.AGTN = cs.getString(3).trim();
            }
            if (cs.getString(4) != null) {
                beanFacsimil.PDAI = cs.getString(4).trim();
                if (!beanFacsimil.PDAI.trim().equals("")) {
                    beanFacsimil.periodo = Functions.getAbreviaturaMes(Functions.fillString(beanFacsimil.PDAI, 3).substring(0, 2))
                            + " - Week " + Functions.fillString(beanFacsimil.PDAI, 3).substring(2, 3);
                }
            }
            if (cs.getString(5) != null) {
                beanFacsimil.HRED = cs.getString(5).trim();
                if (!beanFacsimil.HRED.trim().equals("")) {
                    beanFacsimil.formatDate = "20" + beanFacsimil.HRED.substring(0, 2) + " " + Functions.getAbreviaturaMes(beanFacsimil.HRED.substring(2, 4))
                            + " " + beanFacsimil.HRED.substring(4, 6);
                }
            }
            if (cs.getString(6) != null) {
                strCPUI = Functions.fillString(cs.getString(6).trim(), 4);
                if (strCPUI.startsWith("V")) {
                    for (int i = 0; i < strCPUI.length(); i++) {
                        if (strCPUI.substring(i, i + 1).trim().equals("V")) {
                            reg63 = new BSPF63();
                            reg63.STPO = "Void";
                            reg63.ORAC = "Void";
                            reg63.DSTC = "Void";
                            reg63.CARR = "Void";
                            reg63.FTNR = "Void";
                            reg63.DAIS = "Void";
                            reg63.RBKD = "Void";
                            reg63.FTDA = "Void";
                            reg63.FTDT = "Void";
                            reg63.FBTD = "Void";
                            reg63.NBDA = "Void";
                            reg63.NADA = "Void";
                            reg63.strDescFrom = "Void";
                            reg63.strDescTo = "Void";
                            lstReg63.add(reg63);
                        }
                    }
                }
            }
            if (cs.getString(7) != null) {
                beanFacsimil.TODC = cs.getString(7).trim();
            }
            if (cs.getString(8) != null) {
                beanFacsimil.CDGT = cs.getString(8).trim();
            }
            if (cs.getString(9) != null) {
                beanFacsimil.TOUR = cs.getString(9).trim();
            }
            // REGISTRO BSPF30 =================================================
            if (cs.getString(10) != null) {
                beanFacsimil.CUTP1 = cs.getString(10).trim();
            }
            if (cs.getString(11) != null) {
                beanFacsimil.COBL += " " + String.valueOf(cs.getDouble(11)).trim();
                if (beanFacsimil.COBL.endsWith(".0")) {
                    beanFacsimil.COBL = beanFacsimil.COBL.replace(".0", ".00");
                }
            }
            // REGISTRO BSPF46 =================================================
            if (cs.getString(12) != null) {
                beanFacsimil.ENRS = cs.getString(12).trim();
            }
            if (cs.getString(13) != null) {
                beanFacsimil.ORIN = cs.getString(13).trim();
            }
            // REGISTROS BSPF65 ================================================
            if (cs.getString(14) != null) {
                beanFacsimil.PXNM = cs.getString(14).trim();
            }
            // REGISTROS BSPF66 ================================================
            if (cs.getString(15) != null) {
                beanFacsimil.FPSN = cs.getString(15).trim();
            }
            if (cs.getString(16) != null) {
                beanFacsimil.FPIN = cs.getString(16).trim();
            }
            // REGISTRO A003 ===================================================
            if (cs.getString(17) != null) {
                beanFacsimil.strNombreAgente = cs.getString(17).trim();
            }
            if (cs.getString(18) != null && cs.getString(19) != null) {
                beanFacsimil.strDirecAgente = cs.getString(18).trim() + " " + cs.getString(19).trim();
            }
            // REGISTROS BSPF24 ================================================
            // <editor-fold defaultstate="collapsed" desc="ARMANDO CONJUNCIÓN">
            rst = cs.getResultSet();
            while (rst.next()) {
                if (rst.getString("TDNR").trim().equals(filter.TDNR.trim())) {
                    int cpn = Integer.parseInt(rst.getString("TDNR").trim().substring(rst.getString("TDNR").trim().length() - 3));
                    strConj = rst.getString("TDNR").trim().substring(0, rst.getString("TDNR").trim().length() - 3)
                            + Functions.fillZeros(3, String.valueOf(cpn - 1));
                    lstConj = new ArrayList<String>();
                    lstConj.add(strConj);
                }
                strConj += " - " + rst.getString("TDNR").trim().substring(rst.getString("TDNR").trim().length() - 2);
                lstConj.add(rst.getString("TDNR").trim());
            }
            if (!strConj.contains("-")) {
                strConj = "";
                lstConj = new ArrayList<String>();
            }
            beanFacsimil.strConjuncion = strConj;
            beanFacsimil.lstConj = lstConj;
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            //</editor-fold>

            // REGISTROS BSPF64 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS BSPF64">
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                int pos = 0;
                while (rst.next()) {
                    pos++;
                    if (pos == 1) {
                        beanFacsimil.FARE = rst.getString("FARE");
                        beanFacsimil.EQFR = rst.getString("EQFR");
                        beanFacsimil.FCMI = rst.getString("FCMI");
                        beanFacsimil.FCPI = rst.getString("FCPI");
                        beanFacsimil.TOTL = rst.getString("TOTL");
                    }
                    lstTaxes.add(rst.getString("TAXA1"));
                    lstTaxes.add(rst.getString("TAXA2"));
                    lstTaxes.add(rst.getString("TAXA3"));
                }
                beanFacsimil.lstTaxes = lstTaxes;

                /*if (rst.next()) {
                 beanFacsimil.FARE = rst.getString("FARE");
                 beanFacsimil.EQFR = rst.getString("EQFR");
                 beanFacsimil.TAXA1 = rst.getString("TAXA1");
                 beanFacsimil.TAXA2 = rst.getString("TAXA2");
                 beanFacsimil.TAXA3 = rst.getString("TAXA3");
                 beanFacsimil.FCMI = rst.getString("FCMI");
                 beanFacsimil.FCPI = rst.getString("FCPI");
                 beanFacsimil.TOTL = rst.getString("TOTL");
                 }*/
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS BSPF81 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS BSPF81">
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.FRCS += rst.getString("FRCS").trim();
                    beanFacsimil.FRCA += rst.getString("FRCA").trim();
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS BSPF84 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS BSPF84">
            String strFPTP = "";
            double cash = 0, credit = 0;
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.FPTP = rst.getString("FPTP");
                    beanFacsimil.FPAM = rst.getString("FPAM");
                    beanFacsimil.FPAC = rst.getString("FPAC");
                    beanFacsimil.CUTP1 = rst.getString("CUTP1");
                    strFPTP = Functions.fillString(rst.getString("FPTP").trim(), 4);
                    if (strFPTP.startsWith("CA") || strFPTP.startsWith("CM")) {
                        //beanFacsimil.strCash = rst.getString("CUTP1").substring(0, 3) + " " + rst.getString("FPAM").trim();
                        beanFacsimil.strCash = rst.getString("CUTP1").substring(0, 3);
                        cash += rst.getDouble("FPAM");
                    } else if (strFPTP.startsWith("CC")) {
                        //beanFacsimil.strCredit = rst.getString("CUTP1").substring(0, 3) + " " + rst.getString("FPAM").trim();
                        beanFacsimil.strCredit = rst.getString("CUTP1").substring(0, 3);
                        credit += rst.getDouble("FPAM");
                    } else if (strFPTP.substring(2, 4).equals("CA")) {
                        //beanFacsimil.strCash = rst.getString("CUTP1").substring(0, 3) + " " + rst.getString("FPAM").trim();
                        beanFacsimil.strCash = rst.getString("CUTP1").substring(0, 3);
                        cash += rst.getDouble("FPAM");
                    } else if (strFPTP.substring(2, 4).equals("CC")) {
                        //beanFacsimil.strCredit = rst.getString("CUTP1").substring(0, 3) + " " + rst.getString("FPAM").trim();
                        beanFacsimil.strCredit = rst.getString("CUTP1").substring(0, 3);
                        credit += rst.getDouble("FPAM");
                    } else if (strFPTP.trim().equals("EX")) {
                        if (!beanFacsimil.strIssExc.trim().equals("")) {
                            beanFacsimil.strIssExc += " / " + Functions.fillString(rst.getString("FPAC"), 13).substring(0, 13);
                        } else {
                            beanFacsimil.strIssExc += Functions.fillString(rst.getString("FPAC"), 13).substring(0, 13);
                        }
                    } else if (strFPTP.trim().equals("VD")) {
                        beanFacsimil.strVD = "VD";
                    } else {
                        beanFacsimil.strOthers = strFPTP.trim() + " : " + rst.getString("CUTP1").substring(0, 3) + " " + rst.getString("FPAM").trim();
                    }
                }
                beanFacsimil.strCash += " " + String.valueOf(cash);
                if (beanFacsimil.strCash.endsWith(".0")) {
                    beanFacsimil.strCash = beanFacsimil.strCash.replace(".0", ".00");
                }
                beanFacsimil.strCredit += " " + String.valueOf(credit);
                if (beanFacsimil.strCredit.endsWith(".0")) {
                    beanFacsimil.strCredit = beanFacsimil.strCredit.replace(".0", ".00");
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            strFPTP = null;
            //</editor-fold>

            // REGISTROS A720 ==================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS A720">
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {

                    beanFacsimil.A720REGIST = rst.getString("A720REGIST").trim();
                    beanFacsimil.A720FREGIS = rst.getString("A720FREGIS").trim();
                    beanFacsimil.A720REVISA = rst.getString("A720REVISA").trim();
                    beanFacsimil.A720FREVIS = rst.getString("A720FREVIS").trim();
                    beanFacsimil.A720GRUPO = rst.getString("A720GRUPO").trim();
                    beanFacsimil.A720ORIG = rst.getString("A720ORIG").trim();
                    beanFacsimil.A720FLAG = rst.getString("A720FLAG").trim();
                    beanFacsimil.A720CTKTC = rst.getLong("A720CTKTC");
                    beanFacsimil.A720PRO = rst.getString("A720PRO").trim();
                    beanFacsimil.A720MONREG = rst.getString("A720MONREG").trim();
                    beanFacsimil.A720FECVTA = rst.getString("A720FECVTA").trim();
                    beanFacsimil.A720CIUVTA = rst.getString("A720CIUVTA").trim();
                    beanFacsimil.A720PAIVTA = rst.getString("A720PAIVTA").trim();
                    beanFacsimil.A720CIUEMI = rst.getString("A720CIUEMI").trim();
                    beanFacsimil.A720PAIEMI = rst.getString("A720PAIEMI").trim();
                    beanFacsimil.A720COMMIS = rst.getDouble("A720COMMIS");
                    beanFacsimil.A720MDACOM = rst.getString("A720MDACOM").trim();
                    beanFacsimil.A720PORCOM = rst.getDouble("A720PORCOM");
                    beanFacsimil.A720CODIT = rst.getString("A720CODIT").trim();
                    beanFacsimil.A720INITRA = rst.getString("A720INITRA").trim();
                    beanFacsimil.A720TAJUST = rst.getDouble("A720TAJUST");
                    beanFacsimil.A720TAJUSQ = rst.getDouble("A720TAJUSQ");
                    beanFacsimil.A720TARIFA = rst.getDouble("A720TARIFA");
                    beanFacsimil.A720TRFPAG = rst.getDouble("A720TRFPAG");
                    beanFacsimil.A720TRFNUC = rst.getDouble("A720TRFNUC");
                    beanFacsimil.A720ROE = rst.getDouble("A720ROE");
                    beanFacsimil.A720CPLUSS = rst.getDouble("A720CPLUSS");
                    beanFacsimil.A720CSOVER = rst.getDouble("A720CSOVER");
                    beanFacsimil.A720QSOVER = rst.getLong("A720QSOVER");
                    beanFacsimil.A720MONEDA = rst.getString("A720MONEDA").trim();
                    beanFacsimil.A720MDAPAG = rst.getString("A720MDAPAG").trim();
                    try {

                        if (rst.getString("A1345FEXCH") != null) {
                            beanFacsimil.A1345FEXCH = rst.getString("A1345FEXCH").trim();
                            beanFacsimil.A1345NRPRT = rst.getString("A1345NRPRT").trim();
                            beanFacsimil.A1345CURR = rst.getString("A1345CURR").trim();
                            beanFacsimil.A1345PGCUR = rst.getString("A1345PGCUR").trim();
                            beanFacsimil.A1345FARE = rst.getDouble("A1345FARE");
                            beanFacsimil.A1345PAGO = rst.getDouble("A1345PAGO");
                        }
                    } catch (Exception e) {
                    }

                    beanCpn = null;
                    for (int i = 1; i < 5; i++) {

                        if (!rst.getString("A720RUTA" + i).trim().equals("")) {

                            beanCpn = new A720Filter();
                            beanCpn.A720RUTAO = rst.getString("A720RUTA" + (i - 1)).trim();
                            beanCpn.A720RUTAD = rst.getString("A720RUTA" + i).trim();
                            try {
                                if (!beanCpn.A720RUTAO.trim().equals("") && hmCiudades.containsKey(beanCpn.A720RUTAO.trim())) {
                                    beanCpn.strDescRutaO = hmCiudades.get(beanCpn.A720RUTAO.trim()).toString();
                                } else {
                                    beanCpn.strDescRutaO = "(EMPTY)";
                                }
                                if (!beanCpn.A720RUTAD.trim().equals("") && hmCiudades.containsKey(beanCpn.A720RUTAD.trim())) {
                                    beanCpn.strDescRutaD = hmCiudades.get(beanCpn.A720RUTAD.trim()).toString();
                                } else {
                                    beanCpn.strDescRutaD = "(EMPTY)";
                                }
                            } catch (Exception e) {
                            }
                            beanCpn.A720CONEX = rst.getString("A720CONEX" + i).trim();
                            beanCpn.A720CARRA = rst.getString("A720CARRA" + i).trim();
                            beanCpn.A720NVLO = rst.getString("A720NVLO" + i).trim();
                            beanCpn.A720FVLO = rst.getString("A720FVLO" + i).trim();
                            beanCpn.A720BOOKI = rst.getString("A720BOOKI" + i).trim();
                            beanCpn.A720CLASE = rst.getString("A720CLASE" + i).trim();
                            beanCpn.A720FBUSO = rst.getString("A720FBUSO" + i).trim();
                            beanCpn.A720FARE = rst.getDouble("A720FARE" + i);
                            beanCpn.A720TFARE = rst.getString("A720TFARE" + i).trim();
                            beanCpn.A720SS = rst.getDouble("A720SS" + i);
                            beanCpn.A720VLSRP = rst.getDouble("A720VLSRP" + i);
                            beanCpn.A720VLMPA = rst.getDouble("A720VLMPA" + i);
                            beanCpn.A720ACUE = rst.getDouble("A720ACUE" + i);
                            beanCpn.A720ISC = rst.getDouble("A720ISC" + i);
                            beanCpn.A720VALOR = rst.getDouble("A720VALOR" + i);
                            beanCpn.A720AJUST = rst.getDouble("A720AJUST" + i);
                            beanCpn.A720ACUEO = rst.getDouble("A720ACUEO" + i);
                            beanCpn.A720QIN = rst.getDouble("A720QIN" + i);
                            beanCpn.A720FACT = rst.getDouble("A720FACT" + i);
                            beanCpn.A720PPRO = rst.getDouble("A720PPRO" + i);
                            beanCpn.A720PROV = rst.getDouble("A720PROV" + i);
                            beanCpn.A720PRRCM = rst.getDouble("A720PRRCM" + i);
                            beanCpn.A720YQ = rst.getDouble("A720YQ" + i);
                            lstRegA720.add(beanCpn);
                            hmValueA720.put(rst.getString("A720CIA").trim() + rst.getString("A720FORMA").trim()
                                    + rst.getString("A720SERIE").trim() + i, rst.getDouble("A720VALOR" + i));
                        }
                    }

                    beanFacsimil.lstRegA720 = lstRegA720;
                    //Obteniendo Sale Exch. Rate =============================== 
                    if (beanFacsimil.A720MDAPAG.trim().equals("MXN")) {
                        beanFacsimil.A1526RATE = 1;
                        beanFacsimil.dblTarifa = beanFacsimil.A720TRFPAG;
                        beanFacsimil.strMonTarifa = "MXN";

                    } else if (!beanFacsimil.A720MDAPAG.trim().equals("")
                            && !beanFacsimil.A720MDAPAG.trim().equals("MXN")) {

                        //(A1526)
                        double rate = 0;
                        strSQL = "SELECT A1526RATE FROM " + session.getMainLibrary() + ".A1526 WHERE A1526CUR = '"
                                + beanFacsimil.A720MDAPAG.trim() + "' AND A1526CUR2 = 'MXN' "
                                + "AND A1526DIS = '" + beanFacsimil.A720FECVTA.trim() + "'";

                        stmt = cnx.prepareStatement(strSQL);
                        rst2 = stmt.executeQuery();

                        if (rst2.next()) {
                            rate = rst2.getDouble("A1526RATE");
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;
                        stmt.close();
                        stmt = null;

                        if (rate > 0) {
                            beanFacsimil.A1526RATE = rate;
                            beanFacsimil.dblTarifa = beanFacsimil.A720TRFPAG * rate;
                            beanFacsimil.strMonTarifa = "MXN";
                        }

                    } else {
                        if (beanFacsimil.A720MONEDA.trim().equals("MXN")) {
                            beanFacsimil.A1526RATE = 1;
                            beanFacsimil.dblTarifa = beanFacsimil.A720TARIFA;
                            beanFacsimil.strMonTarifa = "MXN";

                        } else if (!beanFacsimil.A720MONEDA.trim().equals("") && !beanFacsimil.A720MONEDA.trim().equals("MXN")) {
                            //(A1526)
                            double rate = 0;
                            strSQL = "SELECT A1526RATE FROM " + session.getMainLibrary() + ".A1526 WHERE A1526CUR = '"
                                    + beanFacsimil.A720MONEDA.trim() + "' AND A1526CUR2 = 'MXN' "
                                    + "AND A1526DIS = '" + beanFacsimil.A720FECVTA.trim() + "'";

                            stmt = cnx.prepareStatement(strSQL);
                            rst2 = stmt.executeQuery();
                            if (rst2.next()) {
                                rate = rst2.getDouble("A1526RATE");
                            }
                            try {
                                rst2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                            rst2 = null;
                            stmt.close();
                            stmt = null;
                            if (rate > 0) {
                                beanFacsimil.A1526RATE = rate;
                                beanFacsimil.dblTarifa = beanFacsimil.A720TARIFA * rate;
                                beanFacsimil.strMonTarifa = "MXN";
                            }
                        }
                    }
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // REGISTROS BSPF63 ================================================
            // <editor-fold defaultstate="collapsed" desc="REGISTROS BSPF63">
            int pos = 0;
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.DAIS = "20" + rst.getString("DAIS");
                    pos++;

                    try {
                        if (pos != rst.getInt("SEGI") && !strCPUI.trim().equals("")
                                && strCPUI.substring(pos - 1, pos).trim().equals("S")) {
                            reg63 = new BSPF63();
                            reg63.strDescFrom = lstReg63.get(pos - 2).DSTC + " SURFACE";
                            reg63.strDescTo = rst.getString("ORAC") + " SURFACE";
                            reg63.RESD1 = "SURFACE";
                            reg63.CARR = "**";
                            lstReg63.add(reg63);
                        }
                    } catch (Exception e) {
                    }
                    reg63 = new BSPF63();
                    reg63.STPO = rst.getString("STPO");
                    reg63.ORAC = rst.getString("ORAC");
                    reg63.DSTC = rst.getString("DSTC");
                    reg63.CARR = rst.getString("CARR");
                    reg63.FTNR = rst.getString("FTNR");
                    reg63.DAIS = rst.getString("DAIS");
                    reg63.RBKD = rst.getString("RBKD");
                    reg63.FTDA = rst.getString("FTDA");
                    reg63.FTDT = rst.getString("FTDT");
                    reg63.FBST = rst.getString("FBST");
                    reg63.FBTD = rst.getString("FBTD");
                    reg63.NBDA = rst.getString("NBDA");
                    reg63.NADA = rst.getString("NADA");
                    try {
                        if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                            reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                        } else {
                            reg63.strDescFrom = reg63.ORAC;
                        }
                        if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                            reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                        } else {
                            reg63.strDescTo = reg63.DSTC;
                        }
                    } catch (Exception e) {
                    }

                    // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                    //OBTENIENDO DATOS DEL USO =================================
                    boolean encontroUso = false;
                    // VOLADO 
                    strSQL = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                            + "' AND CUPON = '" + rst.getString("SEGI").trim() + "' ";
                    stmt = cnx.prepareStatement(strSQL);
                    rst2 = stmt.executeQuery();

                    if (rst2.next()) {
                        encontroUso = true;
                        reg63.strUso = "F";
                        reg63.strDesUso = "Flown";
                        reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                        reg63.dblMontoUso = rst2.getDouble("VCPN");
                    }
                    try {
                        rst2.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                    rst2 = null;

                    if (!encontroUso) {
                        strSQL = "SELECT FECR, VCPN FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                + "' AND CUPON = '" + rst.getString("SEGI").trim() + "' ";

                        rst2 = stmt.executeQuery(strSQL);
                        if (rst2.next()) {
                            encontroUso = true;
                            reg63.strUso = "D";
                            reg63.strDesUso = "Discharges";
                            reg63.strFecUso = rst2.getString("FECR").trim();
                            reg63.dblMontoUso = rst2.getDouble("VCPN");
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;
                    }

                    if (!encontroUso) {
                        //Buscando el Uso en el A1538 ==============================
                        strSQL = "SELECT A1538UCRUC, A1538FCRUC, A1538VCPN FROM " + session.getMainLibrary() + ".A1538 "
                                + "WHERE A1538CCUST = '" + ccust.trim()
                                + "' AND A1538CIA = '" + filter.TDNR.trim().substring(0, 3)
                                + "' AND A1538FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                + "' AND A1538SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                + "' AND A1538CUPON = '" + rst.getString("SEGI").trim() + "' ";

                        rst2 = stmt.executeQuery(strSQL);
                        if (rst2.next()) {
                            //No se considera el volado
                            if (!rst2.getString("A1538UCRUC").trim().equals("F") && !rst2.getString("A1538UCRUC").trim().equals("V")) {
                                encontroUso = true;
                                reg63.strUso = rst2.getString("A1538UCRUC").trim();
                                if (rst2.getString("A1538UCRUC").trim().equals("E")) {
                                    reg63.strDesUso = "Exchange";
                                } else if (rst2.getString("A1538UCRUC").trim().equals("R")) {
                                    reg63.strDesUso = "Refund";
                                } else if (rst2.getString("A1538UCRUC").trim().equals("I")) {
                                    reg63.strDesUso = "Interline";
                                }
                                reg63.strFecUso = rst2.getString("A1538FCRUC").trim();
                                reg63.dblMontoUso = rst2.getDouble("A1538VCPN");
                            }
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;

                        if (!encontroUso) {
                            // EXCHANGE 
                            strSQL = "SELECT A1540FCONT FROM " + session.getMainLibrary() + ".A1540 WHERE A1540CCUST = '" + ccust.trim()
                                    + "' AND A1540CIA = '" + filter.TDNR.trim().substring(0, 3)
                                    + "' AND A1540FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                    + "' AND A1540SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                    + "' AND A1540CUPON = '" + rst.getString("SEGI").trim() + "' ";

                            rst2 = stmt.executeQuery(strSQL);
                            if (rst2.next()) {
                                encontroUso = true;
                                reg63.strUso = "E";
                                reg63.strDesUso = "Exchange";
                                reg63.strFecUso = rst2.getString("A1540FCONT").trim();
                            }
                            try {
                                rst2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                            rst2 = null;

                            if (!encontroUso) {
                                // REFUND 
                                strSQL = "SELECT A1541FCONT FROM " + session.getMainLibrary() + ".A1541 WHERE A1541CCUST = '" + ccust.trim()
                                        + "' AND A1541CIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND A1541FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND A1541SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND A1541CUPON = '" + rst.getString("SEGI").trim() + "' ";

                                rst2 = stmt.executeQuery(strSQL);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "R";
                                    reg63.strDesUso = "Refund";
                                    reg63.strFecUso = rst2.getString("A1541FCONT").trim();
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;

                                if (!encontroUso) {
                                    // INTERLINE 
                                    strSQL = "SELECT A1542FCONT FROM " + session.getMainLibrary() + ".A1542 WHERE A1542CCUST = '" + ccust.trim()
                                            + "' AND A1542CIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND A1542FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND A1542SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND A1542CUPON = '" + rst.getString("SEGI").trim() + "' ";

                                    rst2 = stmt.executeQuery(strSQL);
                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.strUso = "I";
                                        reg63.strDesUso = "Interline";
                                        reg63.strFecUso = rst2.getString("A1542FCONT").trim();
                                    }
                                    try {
                                        rst2.close();
                                    } catch (SQLException e) {
                                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                    }
                                    rst2 = null;
                                }
                            }
                        }
                    }

                    //</editor-fold>
                    if (hmValueA720.containsKey(rst.getString("TDNR").trim() + rst.getInt("SEGI"))) {
                        reg63.dblMontoUso = Double.parseDouble(hmValueA720.get(rst.getString("TDNR").trim() + rst.getInt("SEGI")).toString());
                    }

                    lstReg63.add(reg63);
                }

                beanFacsimil.lstReg63 = lstReg63;
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() + ". StackTrace:" + e.toString());
        } catch (Exception e) {
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() + ". StackTrace:" + e.toString());
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rst2 != null) {
                try {
                    rst2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (stmt != null) {
                stmt.close();
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return beanFacsimil;
    }

     public FACSIMILFilter loadFacsimileInterlineal(String ccust, String calfa, UserView user, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {

        CallableStatement cs = null;
        CallableStatement cs2 = null;
        PreparedStatement stmt = null;
        PreparedStatement stmt2 = null;
        ResultSet rst = null;
        ResultSet rst2 = null, rst3 = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<>();
        List<String> lstConj = new ArrayList<>();
        List<String> lstTaxes = new ArrayList<>();
        BSPF63 reg63;
        String strSQL = "", strConj = "";
        String strSQLLEG = "";

        boolean hayData = false;
        String TCNMAXLONG = "";
        long intFormaSerie = 0;
        try {
            intFormaSerie = Long.parseLong(Functions.fillZeros(13, filter.TDNR.trim()).substring(3, 13));
        } catch (Exception ex) {
        }

        Connection cnx = null;

        try {

            strSQL = "{CALL " + session.getMainLibrary() + ".PXFACINTERLINEAL(?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(4, Types.VARCHAR);
            cs.registerOutParameter(5, Types.VARCHAR);
            cs.registerOutParameter(6, Types.VARCHAR);
            cs.registerOutParameter(7, Types.VARCHAR);
            cs.registerOutParameter(8, Types.VARCHAR);

            cs.setString(1, ccust);
            cs.setString(2, calfa);
            cs.setString(3, filter.TDNR.trim());//"0051676020545"
            cs.setString(4, filter.AGTN.trim());
            cs.setString(5, "");
            cs.setString(6, "");
            cs.setString(7, "");
            cs.setString(8, "");
            cs.execute();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.TDNR = filter.TDNR.trim();
            beanFacsimil.FUENTE = "";
            lstConj.add(beanFacsimil.TDNR.trim());
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();
            beanFacsimil.nombre = filter.nombre.trim();

            // REGISTROS BSPF24 ================================================
            if (cs.getString(4) != null) {
                beanFacsimil.AGTN = cs.getString(4).trim();
            }
            // REGISTRO A003 ===================================================
            if (cs.getString(5) != null) {
                beanFacsimil.strNombreAgente = cs.getString(5).trim();
            }
            if (cs.getString(6) != null && cs.getString(7) != null) {
                beanFacsimil.strDirecAgente = cs.getString(6).trim() + " " + cs.getString(7).trim();
            }
            // REGISTRO A005 ===================================================
            if (cs.getString(8) != null) {
                beanFacsimil.strNomAero = cs.getString(8).trim();
            }

            //==================================================================
            //BUSCANDO DATOS EN ISR ============================================
            // <editor-fold defaultstate="collapsed" desc="BUSCANDO DATOS EN ISR">
            rst = cs.getResultSet();
            String booking = "", itinerario = "";
            while (rst.next()) {
                hayData = true;
                TCNMAXLONG = Functions.fillString(rst.getString("TCNMAXLONG"), 358);

                switch (Integer.parseInt(rst.getString("RCID"))) {
                    case 1:
                        beanFacsimil.DAIS = TCNMAXLONG.substring(114, 122);
                        if (beanFacsimil.AGTN.trim().equals("")) {
                            beanFacsimil.AGTN = TCNMAXLONG.substring(123, 131);
                        }
                        booking = TCNMAXLONG.substring(49, 62);
                        beanFacsimil.PXNM = TCNMAXLONG.substring(65, 114);

                        // <editor-fold defaultstate="collapsed" desc="Armando Conjunciones">
                        int posicion = Integer.parseInt(TCNMAXLONG.substring(12, 14).replace(" ", "0"));
                        int ttlConjun = Integer.parseInt(TCNMAXLONG.substring(14, 16).replace(" ", "0"));
                        switch (ttlConjun) {
                            case 2:
                                switch (posicion) {
                                    case 1:
                                        strConj = filter.TDNR.trim().substring(3, 13).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                        lstConj.add(rst.getString("TDNR").trim());
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                        break;
                                    case 2:
                                        strConj = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(filter.TDNR.trim().substring(3, 13));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                        lstConj.add(rst.getString("TDNR").trim());
                                }
                                break;
                            case 3:
                                switch (posicion) {
                                    case 1:
                                        strConj = filter.TDNR.trim().substring(3, 13).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10));
                                        lstConj.add(rst.getString("TDNR").trim());
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 2));
                                        break;
                                    case 2:
                                        strConj = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(filter.TDNR.trim().substring(3, 13)).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                        lstConj.add(rst.getString("TDNR").trim());
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                        break;
                                    case 3:
                                        strConj = String.valueOf(intFormaSerie - 2).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(filter.TDNR.trim().substring(3, 13));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 2));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                        lstConj.add(rst.getString("TDNR").trim());
                                }
                                break;
                            case 4:
                                switch (posicion) {
                                    case 1:
                                        strConj = filter.TDNR.trim().substring(3, 13).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 3).substring(8, 10));
                                        lstConj.add(rst.getString("TDNR").trim());
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 2));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 3));
                                        break;
                                    case 2:
                                        strConj = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(filter.TDNR.trim().substring(3, 13)).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                        lstConj.add(rst.getString("TDNR").trim());
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 2));
                                        break;
                                    case 3:
                                        strConj = String.valueOf(intFormaSerie - 2).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(filter.TDNR.trim().substring(3, 13)).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 2));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                        lstConj.add(rst.getString("TDNR").trim());
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                        break;
                                    case 4:
                                        strConj = String.valueOf(intFormaSerie - 3).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 2).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(filter.TDNR.trim().substring(3, 13));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 3));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 2));
                                        lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                        lstConj.add(rst.getString("TDNR").trim());
                                }

                        }
                        beanFacsimil.strConjuncion = strConj;
                        beanFacsimil.lstConj = lstConj;
                        //</editor-fold>
                        break;

                    case 3:
                        beanFacsimil.TODC = TCNMAXLONG.substring(10, 24);
                        beanFacsimil.ENRS = TCNMAXLONG.substring(204, 351);
                        beanFacsimil.TOUR = TCNMAXLONG.substring(105, 120);
                        beanFacsimil.FARE = TCNMAXLONG.substring(39, 50);
                        beanFacsimil.EQFR = TCNMAXLONG.substring(50, 61);
                        lstTaxes.add(TCNMAXLONG.substring(61, 72));
                        lstTaxes.add(TCNMAXLONG.substring(72, 83));
                        lstTaxes.add(TCNMAXLONG.substring(83, 94));
                        beanFacsimil.lstTaxes = lstTaxes;
                        beanFacsimil.TOTL = TCNMAXLONG.substring(94, 105);
                        beanFacsimil.ORIN = TCNMAXLONG.substring(172, 204);
                        break;

                    case 5:
                        itinerario = TCNMAXLONG;
                        break;

                    case 7:
                        beanFacsimil.FPIN = TCNMAXLONG.substring(0, 10).concat(TCNMAXLONG.substring(123, 133));
                        // ***  Hallando los Exchange *******************
                        String strIssue1 = "",
                         strIssue2 = "";
                        if (TCNMAXLONG.contains("EX")) {
                            strIssue1 = beanFacsimil.ORIN.substring(0, 13);
                            if (strIssue1.trim().equals("")) {
                                strIssue1 = TCNMAXLONG.substring(TCNMAXLONG.indexOf("EX") + 2, TCNMAXLONG.indexOf("EX") + 36);
                            }
                            strIssue2 = TCNMAXLONG.substring(144, 157);
                            if (!strIssue1.trim().startsWith("139")) {
                                strIssue1 = TCNMAXLONG.substring(144, 157);
                                strIssue2 = "";
                            }
                            if (!strIssue2.trim().startsWith("139")) {
                                strIssue2 = "";
                            }

                        }
                        // ***********************************************
                        beanFacsimil.strIssExc = strIssue1 + " " + strIssue2;
                        break;

                    case 8:
                        beanFacsimil.FRCA = TCNMAXLONG.substring(2);
                        break;
                }
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (hayData) {
                //Guardando Detalle ============================================
                itinerario = Functions.fillString(itinerario, 360);
                int p = 0;
                //stmt = session.getCNXIBMDB2().getConnection().createStatement();

                for (int i = 0; i < 4; i++) {
                    reg63 = new BSPF63();
                    reg63.CDGT = (i + 1);
                    reg63.RBKD = booking;
                    reg63.STPO = itinerario.substring(p + 2, p + 3);
                    reg63.ORAC = itinerario.substring(p + 3, p + 8);
                    reg63.DSTC = itinerario.substring(p + 8, p + 13);
                    reg63.CARR = itinerario.substring(p + 17, p + 21);
                    reg63.FTNR = itinerario.substring(p + 26, p + 31);
                    reg63.RBKD = itinerario.substring(p + 31, p + 33);
                    reg63.FTDA = itinerario.substring(p + 35, p + 40);
                    reg63.FTDT = itinerario.substring(p + 50, p + 55);
                    reg63.FBTD = itinerario.substring(p + 65, p + 80);
                    reg63.NBDA = itinerario.substring(p + 40, p + 45);
                    reg63.NADA = itinerario.substring(p + 45, p + 50);
                    reg63.FBST = itinerario.substring(p + 60, p + 62);
                    try {
                        if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                            reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                        } else {
                            reg63.strDescFrom = reg63.ORAC;
                        }
                        if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                            reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                        } else {
                            reg63.strDescTo = reg63.DSTC;
                        }
                    } catch (Exception e) {
                    }

                    // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                    //OBTENIENDO DATOS DEL USO =================================
                    // VOLADO 
                    strSQL = "SELECT DFLIGHT, VCPN, FINVO, FCONT, IDCON FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                            + "' AND CUPON = '" + (i + 1) + "' ";

                    stmt = cnx.prepareStatement(strSQL);
                    rst2 = stmt.executeQuery();

                    if (rst2.next()) {
                        if (rst2.getString("FINVO").trim().equals("3")) {
                            reg63.strUso = "B";
                            reg63.strDesUso = "Billed";
                        } else {
                            reg63.strUso = "F";
                            reg63.strDesUso = "Flown";
                        }
                        reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                        reg63.dblMontoUso = rst2.getDouble("VCPN");

                        reg63.FCONT = rst2.getString("FCONT");
                        reg63.IDCON = rst2.getString("IDCON");
                    }
                    try {
                        rst2.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                    rst2 = null;
                    stmt.close();

                    strSQLLEG = "SELECT FORMA FROM PRAXIS.A1897 "
                            + " WHERE CCUST = '" + ccust.trim()
                            + "' AND CIA   = '" + filter.TDNR.trim().substring(0, 3)
                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                            + "' AND CUPON = '" + (i + 1) + "' ";

                    stmt2 = cnx.prepareStatement(strSQLLEG);
                    rst3 = stmt2.executeQuery();
                    //stmt2 = session.getCNXIBMDB2().getConnection().createStatement();
                    //rst3 = stmt2.executeQuery(strSQLLEG);
                    reg63.strLeg = "N";
                    if (rst3.next()) {
                        reg63.strLeg = "Y";
                    }
                    try {
                        rst3.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                    rst3 = null;

                    //</editor-fold>
                    lstReg63.add(reg63);
                    p = p + 89;

                }
                beanFacsimil.lstReg63 = lstReg63;
                // =============================================================
            }
            //</editor-fold>
            //==================================================================
            //==================================================================
            if (!hayData && cs.getMoreResults()) {
                //BUSCANDO DATOS EN XL =========================================
                // <editor-fold defaultstate="collapsed" desc="BUSCANDO DATOS EN XL">
                String strQtySegment = "";
                rst = cs.getResultSet();
                if (rst.next()) {
                    hayData = true;
                    //System.out.println(rst.getString("A1414DATA"));
                    strQtySegment = rst.getString("A1414DATA").substring(54, 56);
                    beanFacsimil.ORIN = rst.getString("A1414DATA").substring(38, 51);
                    beanFacsimil.PXNM = rst.getString("A1414DATA").substring(91, 141);
                    beanFacsimil.FRCA = rst.getString("A1414DATA").substring(141, 396);

                    beanFacsimil.FARE = rst.getString("A1414DATA").substring(404, 407).trim() + rst.getString("A1414DATA").substring(396, 404);
                    beanFacsimil.EQFR = rst.getString("A1414DATA").substring(415, 418).trim() + rst.getString("A1414DATA").substring(407, 415);
                    lstTaxes.add(rst.getString("A1414DATA").substring(418, 426));
                    beanFacsimil.lstTaxes = lstTaxes;
                    beanFacsimil.TOTL = rst.getString("A1414DATA").substring(426, 434);

                    beanFacsimil.DAIS = rst.getString("A1414DATA").substring(449, 456);
                    beanFacsimil.FPIN = rst.getString("A1414DATA").substring(456, 547) + rst.getString("A1414DATA").substring(547, 638);
                    beanFacsimil.strIssExc = rst.getString("A1414DATA").substring(729, 766);
                    beanFacsimil.TOUR = rst.getString("A1414DATA").substring(768, 783);
                    beanFacsimil.ENRS = rst.getString("A1414DATA").substring(783, 903);

                    itinerario = rst.getString("A1414DATA").substring(3128);
                    //System.out.println(itinerario);
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }

                if (hayData) {
                    //Guardando Detalle ============================================
                    itinerario = Functions.fillString(itinerario, 968);
                    String cpn = "";
                    //stmt = session.getCNXIBMDB2().getConnection().createStatement();

                    for (int i = 0; i < 4; i++) {
                        reg63 = new BSPF63();

                        switch (i) {
                            case 0:
                                cpn = itinerario.substring(0, 1);
                                reg63.STPO = itinerario.substring(70, 71);//XO
                                reg63.ORAC = itinerario.substring(15, 20);
                                reg63.DSTC = itinerario.substring(20, 25);
                                reg63.CARR = itinerario.substring(25, 28);
                                reg63.FTNR = itinerario.substring(28, 33);//Vuelo
                                reg63.RBKD = itinerario.substring(33, 35);//Clase
                                reg63.FTDA = itinerario.substring(35, 40);//Date
                                reg63.FTDT = itinerario.substring(40, 45);//Time
                                reg63.FBST = itinerario.substring(45, 47);//Status
                                reg63.FBTD = itinerario.substring(47, 60);//Fare Basis
                                reg63.NBDA = itinerario.substring(60, 65);//Valid B
                                reg63.NADA = itinerario.substring(65, 70);//Valid A
                                break;
                            case 1:
                                cpn = itinerario.substring(242, 243);
                                reg63.STPO = itinerario.substring(312, 313);//XO
                                reg63.ORAC = itinerario.substring(257, 262);
                                reg63.DSTC = itinerario.substring(262, 267);
                                reg63.CARR = itinerario.substring(267, 270);
                                reg63.FTNR = itinerario.substring(270, 275);//Vuelo
                                reg63.RBKD = itinerario.substring(275, 277);//Clase
                                reg63.FTDA = itinerario.substring(277, 282);//Date
                                reg63.FTDT = itinerario.substring(282, 287);//Time
                                reg63.FBST = itinerario.substring(287, 289);//Status
                                reg63.FBTD = itinerario.substring(289, 302);//Fare Basis
                                reg63.NBDA = itinerario.substring(302, 307);//Valid B
                                reg63.NADA = itinerario.substring(307, 312);//Valid A
                                break;
                            case 2:
                                cpn = itinerario.substring(484, 485);
                                reg63.STPO = itinerario.substring(554, 555);//XO
                                reg63.ORAC = itinerario.substring(499, 504);
                                reg63.DSTC = itinerario.substring(504, 509);
                                reg63.CARR = itinerario.substring(509, 512);
                                reg63.FTNR = itinerario.substring(512, 517);//Vuelo
                                reg63.RBKD = itinerario.substring(517, 519);//Clase
                                reg63.FTDA = itinerario.substring(519, 524);//Date
                                reg63.FTDT = itinerario.substring(524, 529);//Time
                                reg63.FBST = itinerario.substring(529, 531);//Status
                                reg63.FBTD = itinerario.substring(531, 544);//Fare Basis
                                reg63.NBDA = itinerario.substring(544, 549);//Valid B
                                reg63.NADA = itinerario.substring(549, 554);//Valid A
                                break;
                            case 3:
                                cpn = itinerario.substring(726, 727);
                                reg63.STPO = itinerario.substring(796, 797);//XO
                                reg63.ORAC = itinerario.substring(741, 746);
                                reg63.DSTC = itinerario.substring(746, 751);
                                reg63.CARR = itinerario.substring(751, 754);
                                reg63.FTNR = itinerario.substring(754, 759);//Vuelo
                                reg63.RBKD = itinerario.substring(759, 761);//Clase
                                reg63.FTDA = itinerario.substring(761, 766);//Date
                                reg63.FTDT = itinerario.substring(766, 771);//Time
                                reg63.FBST = itinerario.substring(771, 773);//Status
                                reg63.FBTD = itinerario.substring(773, 786);//Fare Basis
                                reg63.NBDA = itinerario.substring(786, 791);//Valid B
                                reg63.NADA = itinerario.substring(791, 796);//Valid A
                                break;
                        }
                        try {
                            if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                                reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                            } else {
                                reg63.strDescFrom = reg63.ORAC;
                            }
                            if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                                reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                            } else {
                                reg63.strDescTo = reg63.DSTC;
                            }
                        } catch (Exception e) {
                        }

                        // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                        //OBTENIENDO DATOS DEL USO =================================
                        // VOLADO 
                        strSQL = "SELECT DFLIGHT, VCPN, FINVO, FCONT, IDCON FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                + "' AND CUPON = '" + (i + 1) + "' ";

                        stmt = cnx.prepareStatement(strSQL);
                        rst2 = stmt.executeQuery();

                        if (rst2.next()) {
                            if (rst2.getString("FINVO").trim().equals("Y")) {
                                reg63.strUso = "B";
                                reg63.strDesUso = "Billed";
                            } else {
                                reg63.strUso = "F";
                                reg63.strDesUso = "Flown";
                            }
                            reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                            reg63.dblMontoUso = rst2.getDouble("VCPN");

                            reg63.FCONT = rst2.getString("FCONT");
                            reg63.IDCON = rst2.getString("IDCON");
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;
                        stmt.close();

                        //</editor-fold>
                        lstReg63.add(reg63);

                    }
                    beanFacsimil.lstReg63 = lstReg63;

                    //Hallando Origen y Destino ================================
                    String strOri = "";
                    strOri = itinerario.substring(15, 20);
                    if (strQtySegment.equals("01")) {
                        beanFacsimil.TODC = strOri + itinerario.substring(20, 25);
                    }
                    if (strQtySegment.equals("02")) {
                        beanFacsimil.TODC = strOri + itinerario.substring(262, 267);
                    }
                    if (strQtySegment.equals("03")) {
                        beanFacsimil.TODC = strOri + itinerario.substring(504, 509);
                    }
                    if (Integer.parseInt(strQtySegment.trim()) >= 4) {
                        beanFacsimil.TODC = strOri + itinerario.substring(746, 751);
                    }

                    // =========================================================
                }
                //</editor-fold>
            }

            if (!hayData && cs.getMoreResults()) {
                //BUSCANDO DATOS EN TCN ========================================
                // <editor-fold defaultstate="collapsed" desc="BUSCANDO DATOS EN TCN">
                rst = cs.getResultSet();
                while (rst.next()) {
                    hayData = true;
                    TCNMAXLONG = Functions.fillString(rst.getString("TCNMAXLONG"), 358);

                    switch (Integer.parseInt(rst.getString("RCID"))) {
                        case 1:
                            beanFacsimil.DAIS = TCNMAXLONG.substring(114, 122);
                            if (beanFacsimil.AGTN.trim().equals("")) {
                                beanFacsimil.AGTN = TCNMAXLONG.substring(123, 131);
                            }
                            booking = TCNMAXLONG.substring(49, 62);
                            beanFacsimil.PXNM = TCNMAXLONG.substring(65, 114);

                            // <editor-fold defaultstate="collapsed" desc="Armando Conjunciones">
                            int posicion = Integer.parseInt(TCNMAXLONG.substring(12, 14).replace(" ", "0"));
                            int ttlConjun = Integer.parseInt(TCNMAXLONG.substring(14, 16).replace(" ", "0"));
                            switch (ttlConjun) {
                                case 2:
                                    switch (posicion) {
                                        case 1:
                                            strConj = filter.TDNR.trim().substring(3, 13).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                            lstConj.add(rst.getString("TDNR").trim());
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                            break;
                                        case 2:
                                            strConj = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(filter.TDNR.trim().substring(3, 13));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                            lstConj.add(rst.getString("TDNR").trim());
                                    }
                                    break;
                                case 3:
                                    switch (posicion) {
                                        case 1:
                                            strConj = filter.TDNR.trim().substring(3, 13).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10));
                                            lstConj.add(rst.getString("TDNR").trim());
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 2));
                                            break;
                                        case 2:
                                            strConj = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(filter.TDNR.trim().substring(3, 13)).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                            lstConj.add(rst.getString("TDNR").trim());
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                            break;
                                        case 3:
                                            strConj = String.valueOf(intFormaSerie - 2).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(filter.TDNR.trim().substring(3, 13));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 2));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                            lstConj.add(rst.getString("TDNR").trim());
                                    }
                                    break;
                                case 4:
                                    switch (posicion) {
                                        case 1:
                                            strConj = filter.TDNR.trim().substring(3, 13).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 3).substring(8, 10));
                                            lstConj.add(rst.getString("TDNR").trim());
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 2));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 3));
                                            break;
                                        case 2:
                                            strConj = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(filter.TDNR.trim().substring(3, 13)).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                            lstConj.add(rst.getString("TDNR").trim());
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 2));
                                            break;
                                        case 3:
                                            strConj = String.valueOf(intFormaSerie - 2).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(filter.TDNR.trim().substring(3, 13)).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 2));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                            lstConj.add(rst.getString("TDNR").trim());
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie + 1));
                                            break;
                                        case 4:
                                            strConj = String.valueOf(intFormaSerie - 3).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 2).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(filter.TDNR.trim().substring(3, 13));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 3));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 2));
                                            lstConj.add(rst.getString("TDNR").trim().substring(0, 3) + String.valueOf(intFormaSerie - 1));
                                            lstConj.add(rst.getString("TDNR").trim());
                                    }

                            }
                            beanFacsimil.strConjuncion = strConj;
                            beanFacsimil.lstConj = lstConj;
                            //</editor-fold>
                            break;

                        case 3:
                            beanFacsimil.TODC = TCNMAXLONG.substring(10, 24);
                            beanFacsimil.ENRS = TCNMAXLONG.substring(204, 351);
                            beanFacsimil.TOUR = TCNMAXLONG.substring(105, 120);
                            beanFacsimil.FARE = TCNMAXLONG.substring(39, 50);
                            beanFacsimil.EQFR = TCNMAXLONG.substring(50, 61);
                            lstTaxes.add(TCNMAXLONG.substring(61, 72));
                            lstTaxes.add(TCNMAXLONG.substring(72, 83));
                            lstTaxes.add(TCNMAXLONG.substring(83, 94));
                            beanFacsimil.lstTaxes = lstTaxes;
                            beanFacsimil.TOTL = TCNMAXLONG.substring(94, 105);
                            beanFacsimil.ORIN = TCNMAXLONG.substring(172, 204);
                            break;

                        case 5:
                            itinerario = TCNMAXLONG;
                            break;

                        case 7:
                            beanFacsimil.FPIN = TCNMAXLONG.substring(0, 10).concat(TCNMAXLONG.substring(123, 133));
                            // ***  Hallando los Exchange *******************
                            String strIssue1 = "",
                             strIssue2 = "";
                            if (TCNMAXLONG.contains("EX")) {
                                strIssue1 = beanFacsimil.ORIN.substring(0, 13);
                                if (strIssue1.trim().equals("")) {
                                    strIssue1 = TCNMAXLONG.substring(TCNMAXLONG.indexOf("EX") + 2, TCNMAXLONG.indexOf("EX") + 36);
                                }
                                strIssue2 = TCNMAXLONG.substring(144, 157);
                                if (!strIssue1.trim().startsWith("139")) {
                                    strIssue1 = TCNMAXLONG.substring(144, 157);
                                    strIssue2 = "";
                                }
                                if (!strIssue2.trim().startsWith("139")) {
                                    strIssue2 = "";
                                }

                            }
                            // ***********************************************
                            beanFacsimil.strIssExc = strIssue1 + " " + strIssue2;
                            break;

                        case 8:
                            beanFacsimil.FRCA = TCNMAXLONG.substring(2);
                            break;
                    }
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }

                if (hayData) {
                    //Guardando Detalle ============================================
                    itinerario = Functions.fillString(itinerario, 360);
                    int p = 0;
                    //stmt = session.getCNXIBMDB2().getConnection().createStatement();

                    for (int i = 0; i < 4; i++) {
                        reg63 = new BSPF63();
                        reg63.RBKD = booking;
                        reg63.STPO = itinerario.substring(p + 2, p + 3);
                        reg63.ORAC = itinerario.substring(p + 3, p + 8);
                        reg63.DSTC = itinerario.substring(p + 8, p + 13);
                        reg63.CARR = itinerario.substring(p + 17, p + 21);
                        reg63.FTNR = itinerario.substring(p + 26, p + 31);
                        reg63.RBKD = itinerario.substring(p + 31, p + 33);
                        reg63.FTDA = itinerario.substring(p + 35, p + 40);
                        reg63.FTDT = itinerario.substring(p + 50, p + 55);
                        reg63.FBTD = itinerario.substring(p + 65, p + 80);
                        reg63.NBDA = itinerario.substring(p + 40, p + 45);
                        reg63.NADA = itinerario.substring(p + 45, p + 50);
                        reg63.FBST = itinerario.substring(p + 60, p + 62);
                        try {
                            if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                                reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                            } else {
                                reg63.strDescFrom = reg63.ORAC;
                            }
                            if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                                reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                            } else {
                                reg63.strDescTo = reg63.DSTC;
                            }
                        } catch (Exception e) {
                        }

                        // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                        //OBTENIENDO DATOS DEL USO =================================
                        // VOLADO 
                        strSQL = "SELECT DFLIGHT, VCPN, FINVO, FCONT, IDCON FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                + "' AND CUPON = '" + (i + 1) + "' ";

                        stmt = cnx.prepareStatement(strSQL);
                        rst2 = stmt.executeQuery();

                        if (rst2.next()) {
                            if (rst2.getString("FINVO").trim().equals("Y")) {
                                reg63.strUso = "B";
                                reg63.strDesUso = "Billed";
                            } else {
                                reg63.strUso = "F";
                                reg63.strDesUso = "Flown";
                            }
                            reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                            reg63.dblMontoUso = rst2.getDouble("VCPN");

                            reg63.FCONT = rst2.getString("FCONT");
                            reg63.IDCON = rst2.getString("IDCON");
                        }
                        try {
                            rst2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                        rst2 = null;
                        stmt.close();

                        //</editor-fold>
                        lstReg63.add(reg63);
                        p = p + 89;

                    }
                    beanFacsimil.lstReg63 = lstReg63;
                    // =============================================================
                }
                //</editor-fold>
            }

            if (!hayData && cs.getMoreResults()) {
                //BUSCANDO DATOS EN VOLADO O EMD ===============================
                // <editor-fold defaultstate="collapsed" desc="BUSCANDO DATOS EN VOLADO/EMD">
                rst = cs.getResultSet();
                while (rst.next()) {
                    hayData = true;

                    beanFacsimil.AGTN = rst.getString("AGTIA").trim();
                    reg63 = new BSPF63();
                    reg63.RBKD = rst.getString("CLAS").trim();
                    reg63.ORAC = rst.getString("CDEPART").trim();
                    reg63.DSTC = rst.getString("CARRIVA").trim();
                    reg63.CARR = rst.getString("CARR").trim();
                    reg63.FTDA = rst.getString("DFLIGHT").trim();
                    reg63.FBTD = rst.getString("FBASE").trim();
                    reg63.NBDA = rst.getString("NFLIGHT").trim();
                    reg63.NADA = rst.getString("NFLIGHT").trim();
                    try {
                        if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                            reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                        } else {
                            reg63.strDescFrom = reg63.ORAC;
                        }
                        if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                            reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                        } else {
                            reg63.strDescTo = reg63.DSTC;
                        }
                    } catch (Exception e) {
                    }

                    //OBTENIENDO DATOS DEL USO =================================
                    if (rst.getString("FINVO").trim().equals("Y")) {
                        reg63.strUso = "B";
                        reg63.strDesUso = "Billed";
                    } else {
                        reg63.strUso = "F";
                        reg63.strDesUso = "Flown";
                    }
                    reg63.strFecUso = rst.getString("DFLIGHT").trim();
                    reg63.dblMontoUso = rst.getDouble("VCPN");

                    reg63.FCONT = rst.getString("FCONT");
                    reg63.IDCON = rst.getString("IDCON");

                    lstReg63.add(reg63);

                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }

                if (hayData) {
                    beanFacsimil.lstReg63 = lstReg63;
                }

                //</editor-fold>
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
            if (rst2 != null) {
                try {
                    rst2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
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
        return beanFacsimil;
    }
    
    
}
