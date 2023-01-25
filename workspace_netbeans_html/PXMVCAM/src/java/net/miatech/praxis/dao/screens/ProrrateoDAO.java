/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.screens;

//<editor-fold defaultstate="collapsed" desc="import">
import com.ibm.as400.access.AS400DataType;
import com.ibm.as400.access.AS400Message;
import com.ibm.as400.access.AS400Structure;
import com.ibm.as400.access.ProgramCall;
import com.ibm.as400.access.ProgramParameter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.A720Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.TCNCoupon;
import net.miatech.beans.TCNFilter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A729;
import net.miatech.praxis.A720;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.BSPF63;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.flown.A728;
import net.miatech.utils.AS400Map;
import net.miatech.utils.Functions;
import net.miatech.utils.Util;
import org.apache.log4j.Logger;

//</editor-fold>

/**
 *
 * @author lmendoza
 */
public class ProrrateoDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ProrrateoDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ProrrateoDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public FACSIMILFilter loadASRFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {

        CallableStatement cs = null;
        CallableStatement cs2 = null;
        ResultSet rst = null, rst2 = null;
        PreparedStatement stmt = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<>();
        List<String> lstTaxes = new ArrayList<>();
        List<String> lstReg46Restrict = new ArrayList<>();
        List<String> lstReg46OrigIssue = new ArrayList<>();
        List<String> lstFC = new ArrayList<>();
        List<String> lstFOP = new ArrayList<>();
        BSPF63 reg63;
        String strConj = "";
        String strSQLUSO = "";

        Connection cnx = null;
        try {
            String strSQL = "{CALL " + session.getMainLibrary() + ".PXASRFACSIMILNEW(?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, filter.TDNR.trim());
            cs.execute();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.FUENTE = "ASR";
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();
            beanFacsimil.nombre = filter.nombre.trim();

            rst = cs.getResultSet();
            while (rst.next()) {
                beanFacsimil.strError = rst.getString("ASR").substring(45, 46);
                if (beanFacsimil.strError.equals("0") || beanFacsimil.strError.trim().equals("")) {
                    //RECORD 24 - Ticket Document Identification
                    beanFacsimil.DAIS = "20" + rst.getString("ASR").substring(281, 287);
                    beanFacsimil.TODC = rst.getString("ASR").substring(364, 378);
                    beanFacsimil.TOUR = rst.getString("ASR").substring(345, 360);
                    beanFacsimil.PNRR = rst.getString("ASR").substring(382, 395);
                    beanFacsimil.TDNR = rst.getString("ASR").substring(293, 306);
                    beanFacsimil.CDGT = rst.getString("ASR").substring(308, 309);
                    beanFacsimil.TRNC = rst.getString("ASR").substring(360, 364);
                    beanFacsimil.AGTN = rst.getString("ASR").substring(15304, 15312);
                    //RECORD 46 - Endorsements/Restrictions Information
                    int x46 = 136;
                    for (int i = 0; i < 3; i++) {
                        if (rst.getString("ASR").substring(9996 + (i * x46), 9999 + (i * x46)).trim().length() > 0) {
                            String reg46Restrict = rst.getString("ASR").substring(10037 + (i * x46), 10097 + (i * x46));
                            String reg46OrigIssue = "";
                            lstReg46Restrict.add(reg46Restrict);
                            lstReg46OrigIssue.add(reg46OrigIssue);
                        }
                    }
                    //RECORD 63 - Itinerary Data Segment
                    //session.getCNXIBMDB2().getConnection().createStatement();

                    int x63 = 136;
                    for (int i = 0; i < 4; i++) {
                        if (rst.getString("ASR").substring(10858 + (i * x63), 10861 + (i * x63)).trim().length() > 0 || rst.getString("ASR").substring(10918 + (i * x63), 10923 + (i * x63)).length() > 0) {
                            //if (rst.getString("ASR").substring(7308 + (i * x63), 7311 + (i * x63)).trim().length() > 0 || rst.getString("ASR").substring(7368 + (i * x63), 7373 + (i * x63)).length() > 0) {
                            reg63 = new BSPF63();
                            reg63.CDGT = (i + 1);
                            reg63.STPO = rst.getString("ASR").substring(10900 + (i * x63), 10901 + (i * x63));
                            reg63.ORAC = rst.getString("ASR").substring(10918 + (i * x63), 10923 + (i * x63));
                            reg63.DSTC = rst.getString("ASR").substring(10923 + (i * x63), 10928 + (i * x63));
                            reg63.CARR = rst.getString("ASR").substring(10928 + (i * x63), 10932 + (i * x63));
                            reg63.FTNR = rst.getString("ASR").substring(10933 + (i * x63), 10938 + (i * x63));
                            reg63.DAIS = rst.getString("ASR").substring(10871 + (i * x63), 10877 + (i * x63));
                            reg63.RBKD = rst.getString("ASR").substring(10938 + (i * x63), 10940 + (i * x63));
                            reg63.FTDA = rst.getString("ASR").substring(10940 + (i * x63), 10945 + (i * x63));
                            reg63.FTDT = rst.getString("ASR").substring(10946 + (i * x63), 10951 + (i * x63));
                            reg63.FBST = "";
                            reg63.FBTD = rst.getString("ASR").substring(10958 + (i * x63), 10973 + (i * x63));
                            reg63.NBDA = "";
                            reg63.NADA = "";
                            /*reg63.STPO = rst.getString("ASR").substring(7350 + (i * x63), 7351 + (i * x63));
                             reg63.ORAC = rst.getString("ASR").substring(7368 + (i * x63), 7373 + (i * x63));
                             reg63.DSTC = rst.getString("ASR").substring(7373 + (i * x63), 7378 + (i * x63));
                             reg63.CARR = rst.getString("ASR").substring(7378 + (i * x63), 7382 + (i * x63));
                             reg63.FTNR = rst.getString("ASR").substring(7383 + (i * x63), 7388 + (i * x63));
                             reg63.DAIS = rst.getString("ASR").substring(7321 + (i * x63), 7327 + (i * x63));
                             reg63.RBKD = rst.getString("ASR").substring(7388 + (i * x63), 7390 + (i * x63));
                             reg63.FTDA = rst.getString("ASR").substring(7390 + (i * x63), 7395 + (i * x63));
                             reg63.FTDT = rst.getString("ASR").substring(7396 + (i * x63), 7401 + (i * x63));
                             reg63.FBST = "";//rst.getString("ASR").substring();
                             reg63.FBTD = rst.getString("ASR").substring(7408 + (i * x63), 7423 + (i * x63));
                             reg63.NBDA = "";//rst.getString("ASR").substring();
                             reg63.NADA = "";//rst.getString("ASR").substring();*/
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
                            strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                    + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                    + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                    + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                    + "' AND CUPON = '" + (i + 1) + "' ";
                            stmt = cnx.prepareStatement(strSQLUSO);
                            stmt.execute();
                            rst2 = stmt.getResultSet();
                            //rst2 = stmt.executeQuery(strSQLUSO);
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

                            //DISCHARGE
                            if (!encontroUso) {
                                strSQLUSO = "SELECT FECR, VCPN FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
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

                            //EMD
                            if (!encontroUso) {
                                strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
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
                            }

                            //BILLED
                            if (!encontroUso) {
                                strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                        + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND A020CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "B";
                                    reg63.strDesUso = "Billed";
                                    reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                    reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;
                            }

                            //</editor-fold>
                            lstReg63.add(reg63);
                        }
                    }
                    if (stmt != null) {
                        stmt.close();
                    }

                    //RECORD 64 - Document Amounts
                    //if (rst.getString("ASR").substring(7852, 7855).trim().length() > 0) {
                    if (rst.getString("ASR").substring(11402, 11405).trim().length() > 0) {
                        double total;
                        String total_s;
                        String equivalent_s;
                        String regTax;
                        String regTax2 = "MXN 0.00";
                        String regTax3 = "MXN 0.00";
                        beanFacsimil.CUTP1 = rst.getString("ASR").substring(11540, 11543);
                        beanFacsimil.FARE = rst.getString("ASR").substring(11443, 11454) + "." + rst.getString("ASR").substring(11454, 11456);
                        equivalent_s = rst.getString("ASR").substring(11457, 11468) + "." + rst.getString("ASR").substring(11468, 11470);
                        if (rst.getString("ASR").substring(11544, 11547).trim().length() > 0) {
                            beanFacsimil.EQFR = rst.getString("ASR").substring(11544, 11547) + equivalent_s;
                        } else {
                            beanFacsimil.EQFR = beanFacsimil.CUTP1 + equivalent_s;
                        }
                        regTax = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(11490, 11501)) + "." + rst.getString("ASR").substring(11501, 11503);
                        lstTaxes.add(regTax);
                        if (Long.parseLong(rst.getString("ASR").substring(11504, 11515)) > 0) {
                            regTax2 = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(11504, 11515)) + "." + rst.getString("ASR").substring(11515, 11517);
                            lstTaxes.add(regTax2);
                        }
                        if (Long.parseLong(rst.getString("ASR").substring(11518, 11529)) > 0) {
                            regTax3 = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(11518, 11529)) + "." + rst.getString("ASR").substring(11529, 11531);
                            lstTaxes.add(regTax3);
                        }
                        /*beanFacsimil.CUTP1 = rst.getString("ASR").substring(7990, 7993);
                         beanFacsimil.FARE = rst.getString("ASR").substring(7893, 7904) + "." + rst.getString("ASR").substring(7904, 7906);
                         equivalent_s = rst.getString("ASR").substring(7907, 7918) + "." + rst.getString("ASR").substring(7918, 7920);
                         if (rst.getString("ASR").substring(7994, 7997).trim().length() > 0) {
                         beanFacsimil.EQFR = rst.getString("ASR").substring(7994, 7997) + equivalent_s;
                         } else {
                         beanFacsimil.EQFR = beanFacsimil.CUTP1 + equivalent_s;
                         }
                         regTax = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(7940, 7951)) + "." + rst.getString("ASR").substring(7951, 7953);
                         lstTaxes.add(regTax);
                         if (Long.parseLong(rst.getString("ASR").substring(7954, 7965)) > 0) {
                         regTax2 = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(7954, 7965)) + "." + rst.getString("ASR").substring(7965, 7967);
                         lstTaxes.add(regTax2);
                         }
                         if (Long.parseLong(rst.getString("ASR").substring(7968, 7979)) > 0) {
                         regTax3 = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(7968, 7979)) + "." + rst.getString("ASR").substring(7979, 7981);
                         lstTaxes.add(regTax3);
                         }*/
                        if (Double.parseDouble(equivalent_s) > 0) {
                            total = Double.parseDouble(equivalent_s) + Double.parseDouble(regTax.substring(4)) + Double.parseDouble(regTax2.substring(4)) + Double.parseDouble(regTax3.substring(4));
                        } else {
                            total = Double.parseDouble(beanFacsimil.FARE) + Double.parseDouble(regTax.substring(4)) + Double.parseDouble(regTax2.substring(4)) + Double.parseDouble(regTax3.substring(4));
                        }
                        total_s = total + "";
                        beanFacsimil.TOTL = total_s;
                    }
                    //RECORD 65 - Passenger Information
                    //beanFacsimil.PXNM = rst.getString("ASR").substring(8039, 8088);
                    beanFacsimil.PXNM = rst.getString("ASR").substring(11589, 11638);
                    //RECORD 81 - Fare Calculation
                    int x81 = 136;
                    for (int i = 0; i < 4; i++) {
                        if (rst.getString("ASR").substring(13348 + (i * x81), 13351 + (i * x81)).trim().length() > 0) {
                            String FC = rst.getString("ASR").substring(13392 + (i * x81), 13479 + (i * x81));
                            lstFC.add(FC);
                        }
                        /*if (rst.getString("ASR").substring(9798 + (i * x81), 9801 + (i * x81)).trim().length() > 0) {
                         String FC = rst.getString("ASR").substring(9842 + (i * x81), 9929 + (i * x81));
                         lstFC.add(FC);
                         }*/
                    }
                    //Verificando Cantidad de Conjunciones
                    //if (Integer.parseInt(rst.getString("ASR").substring(11762, 11763)) == 0) {
                    if (Integer.parseInt(rst.getString("ASR").substring(15312, 15313)) == 0) {
                        //RECORD 84 - Form of Payment
                        int x84 = 138;
                        for (int i = 0; i < 6; i++) {
                            if (rst.getString("ASR").substring(13892 + (i * x84), 13895 + (i * x84)).trim().length() > 0) {
                                String strFPTP = rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim();
                                if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                    beanFacsimil.strIssExc += " / " + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84));
                                }
                                if (Long.parseLong(rst.getString("ASR").substring(13927 + (i * x84), 13938 + (i * x84))) > 0) {
                                    String monto = Long.parseLong(rst.getString("ASR").substring(13927 + (i * x84), 13938 + (i * x84))) + "." + rst.getString("ASR").substring(13938 + (i * x84), 13940 + (i * x84));
                                    if (rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim().equals("CC") || rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim().equals("TC")) {
                                        if (rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim().length() > 0) {
                                            lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84)).trim() + "  Approval Code:" + rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim());
                                        } else {
                                            lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84)).trim());
                                        }
                                    } else {
                                        if (rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim().length() > 0) {
                                            lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim());
                                        } else {
                                            lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto);
                                        }
                                    }
                                }
                            }
                            /*if (rst.getString("ASR").substring(10342 + (i * x84), 10345 + (i * x84)).trim().length() > 0) {
                             String strFPTP = rst.getString("ASR").substring(10367, 10369).trim();
                             if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) && i == 0) {
                             beanFacsimil.strIssExc += " / " + rst.getString("ASR").substring(10390, 10409);
                             }
                             if (Long.parseLong(rst.getString("ASR").substring(10377 + (i * x84), 10388 + (i * x84))) > 0) {
                             String monto = Long.parseLong(rst.getString("ASR").substring(10377 + (i * x84), 10388 + (i * x84))) + "." + rst.getString("ASR").substring(10388 + (i * x84), 10390 + (i * x84));
                             if (rst.getString("ASR").substring(10367 + (i * x84), 10369 + (i * x84)).trim().equals("CC") || rst.getString("ASR").substring(10367 + (i * x84), 10369 + (i * x84)).trim().equals("TC")) {
                             if (rst.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim().length() > 0) {
                             lstFOP.add("Type:" + rst.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(10390 + (i * x84), 10409 + (i * x84)).trim() + "  Approval Code:" + rst.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim());
                             } else {
                             lstFOP.add("Type:" + rst.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(10390 + (i * x84), 10409 + (i * x84)).trim());
                             }
                             } else {
                             if (rst.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim().length() > 0) {
                             lstFOP.add("Type:" + rst.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim());
                             } else {
                             lstFOP.add("Type:" + rst.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto);
                             }
                             }
                             }
                             }*/
                        }
                    } else {
                        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                        cs2 = cnx.prepareCall(strSQL);
                        //long newTDNR = Long.parseLong(filter.TDNR.substring(0, 13).trim()) + Integer.parseInt(rst.getString("ASR").substring(11762, 11763));
                        long newTDNR = Long.parseLong(filter.TDNR.substring(0, 13).trim()) + Integer.parseInt(rst.getString("ASR").substring(15312, 15313));
                        String newTDNR_s = newTDNR + "  " + rst.getString("ASR").substring(15, 31) + filter.TDNR.substring(0, 13).trim();
                        cs2.setString(1, newTDNR_s);
                        cs2.execute();

                        rst2 = cs2.getResultSet();
                        while (rst2.next()) {
                            //RECORD 84 - Form of Payment
                            int x84 = 138;
                            for (int i = 0; i < 6; i++) {
                                if (rst.getString("ASR").substring(13892 + (i * x84), 13895 + (i * x84)).trim().length() > 0) {
                                    //String strFPTP = rst.getString("ASR").substring(13917, 13919).trim();
                                    String strFPTP = rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim();
                                    if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                        beanFacsimil.strIssExc += " / " + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84));
                                    }
                                    if (Long.parseLong(rst.getString("ASR").substring(13927 + (i * x84), 13938 + (i * x84))) > 0) {
                                        String monto = Long.parseLong(rst.getString("ASR").substring(13927 + (i * x84), 13938 + (i * x84))) + "." + rst.getString("ASR").substring(13938 + (i * x84), 13940 + (i * x84));
                                        if (rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim().equals("CC") || rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim().equals("TC")) {
                                            if (rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84)).trim() + "  Approval Code:" + rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84)).trim());
                                            }
                                        } else {
                                            if (rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto);
                                            }
                                        }
                                    }
                                }
                                /*if (rst2.getString("ASR").substring(10342 + (i * x84), 10345 + (i * x84)).trim().length() > 0) {
                                 String strFPTP = rst2.getString("ASR").substring(10367, 10369).trim();
                                 if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) && i == 0) {
                                 beanFacsimil.strIssExc += " / " + rst2.getString("ASR").substring(10390, 10409);
                                 }
                                 if (Long.parseLong(rst2.getString("ASR").substring(10377 + (i * x84), 10388 + (i * x84))) > 0) {
                                 String monto = Long.parseLong(rst2.getString("ASR").substring(10377 + (i * x84), 10388 + (i * x84))) + "." + rst2.getString("ASR").substring(10388 + (i * x84), 10390 + (i * x84));
                                 if (rst2.getString("ASR").substring(10367 + (i * x84), 10369 + (i * x84)).trim().equals("CC") || rst2.getString("ASR").substring(10367 + (i * x84), 10369 + (i * x84)).trim().equals("TC")) {
                                 if (rst2.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim().length() > 0) {
                                 lstFOP.add("Type:" + rst2.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("ASR").substring(10390 + (i * x84), 10409 + (i * x84)).trim() + "  Approval Code:" + rst2.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim());
                                 } else {
                                 lstFOP.add("Type:" + rst2.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("ASR").substring(10390 + (i * x84), 10409 + (i * x84)).trim());
                                 }
                                 } else {
                                 if (rst2.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim().length() > 0) {
                                 lstFOP.add("Type:" + rst2.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst2.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim());
                                 } else {
                                 lstFOP.add("Type:" + rst2.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto);
                                 }
                                 }
                                 }
                                 }*/
                            }
                        }
                        try {
                            cs2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                    }
                    beanFacsimil.strFinCjn = rst.getString("ASR").substring(44, 45);
                    beanFacsimil.strEsCjn = rst.getString("ASR").substring(30, 31);
                    strConj = rst.getString("ASR").substring(31, 44);
                    //for (int i = 0; i < Integer.parseInt(rst.getString("ASR").substring(11762, 11763)); i++) {
                    for (int i = 0; i < Integer.parseInt(rst.getString("ASR").substring(15312, 15313)); i++) {
                        long cjn = Long.parseLong(rst.getString("ASR").substring(31, 44)) + (i + 1);
                        String cjn_s = cjn + "";
                        strConj = strConj + " - " + cjn_s.substring(9);
                    }
                } else {
                    beanFacsimil.strMsj = rst.getString("ASR").substring(52, 132);
                    //NOT-FOUND - A pedido de ENS 20140905, si no se encuentra el Ticket de todas maneras se busca
                    //el uso del cupón consultado (VENTA NO REPORTADA)
                    if (beanFacsimil.strMsj.contains("NOT-FOUND")) {
                        try {
                            //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                            int VL_CPUI = 0;

                            //for (int i = 1; i <= Integer.parseInt(filter.CPUI); i++) {
                            for (int i = 1; i <= VL_CPUI; i++) {
                                //if (i == Integer.parseInt(filter.CPUI)) {
                                if (i == VL_CPUI) {
                                    reg63 = new BSPF63();

                                    // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                                    //OBTENIENDO DATOS DEL USO =================================
                                    boolean encontroUso = false;
                                    // VOLADO 
                                    strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                            + "FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND CUPON = '" + i + "' ";

                                    stmt = cnx.prepareStatement(strSQLUSO);
                                    stmt.execute();
                                    rst2 = stmt.getResultSet();
                                    //rst2 = stmt.executeQuery(strSQLUSO);

                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.ORAC = rst2.getString("CDEPART").trim();
                                        reg63.DSTC = rst2.getString("CARRIVA").trim();
                                        reg63.CARR = rst2.getString("CARR").trim();
                                        reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                        reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                        reg63.RBKD = rst2.getString("CLAS").trim();
                                        reg63.FBTD = rst2.getString("FBASE").trim();
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

                                    //DISCHARGE
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT CDEPART, CARRIVA, FECR, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                + "FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND CUPON = '" + i + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);

                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.ORAC = rst2.getString("CDEPART").trim();
                                            reg63.DSTC = rst2.getString("CARRIVA").trim();
                                            reg63.CARR = rst2.getString("CARR").trim();
                                            reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                            reg63.DAIS = rst2.getString("FECR").trim();
                                            reg63.RBKD = rst2.getString("CLAS").trim();
                                            reg63.FBTD = rst2.getString("FBASE").trim();
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

                                    //EMD
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                + "FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND CUPON = '" + i + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);

                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.ORAC = rst2.getString("CDEPART").trim();
                                            reg63.DSTC = rst2.getString("CARRIVA").trim();
                                            reg63.CARR = rst2.getString("CARR").trim();
                                            reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                            reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                            reg63.RBKD = rst2.getString("CLAS").trim();
                                            reg63.FBTD = rst2.getString("FBASE").trim();
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
                                    }

                                    //BILLED
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                                + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND A020CUPON = '" + (i + 1) + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);
                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.strUso = "B";
                                            reg63.strDesUso = "Billed";
                                            reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                            reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                        }
                                        try {
                                            rst2.close();
                                        } catch (SQLException e) {
                                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                        }
                                        rst2 = null;
                                    }

                                    //</editor-fold>
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
                                    lstReg63.add(reg63);
                                } else {
                                    reg63 = new BSPF63();
                                    lstReg63.add(reg63);
                                }
                            }
                            if (stmt != null) {
                                stmt.close();
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
            beanFacsimil.lstReg46Restrict = lstReg46Restrict;
            beanFacsimil.lstReg46OrigIssue = lstReg46OrigIssue;
            beanFacsimil.lstReg63 = lstReg63;
            beanFacsimil.lstFC = lstFC;
            beanFacsimil.lstFOP = lstFOP;
            beanFacsimil.lstTaxes = lstTaxes;
            beanFacsimil.strConjuncion = strConj;
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (stmt != null) {
                stmt.close();
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
            if (cs2 != null) {
                try {
                    cs2.close();
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

    public FACSIMILFilter loadBSPFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {

        CallableStatement cs = null;
        CallableStatement cs2 = null;
        ResultSet rst = null, rst2 = null, rst3 = null;
        PreparedStatement stmt = null;
        PreparedStatement stmt2 = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<>();
        List<String> lstTaxes = new ArrayList<>();
        List<String> lstReg46Restrict = new ArrayList<>();
        List<String> lstReg46OrigIssue = new ArrayList<>();
        List<String> lstFC = new ArrayList<>();
        List<String> lstFOP = new ArrayList<>();
        BSPF63 reg63;
        String strConj = "";
        int totalTax = 0;
        String strSQLUSO = "";
        String strSQLLEG = "";
        String OU_SEQ = "";
        String OU_NROID = "";

        Connection cnx = null;
        try {
            //String strSQL = "{CALL " + session.getMainLibrary() + ".PXBSPFACSIMILNEW(?)}";
            String strSQL = "{CALL PXBSPFACSIMILNEW(?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(2, Types.CHAR);
            cs.registerOutParameter(3, Types.CHAR);

            cs.setString(1, filter.TDNR.trim());
            cs.execute();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.FUENTE = "BSP";
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();
            beanFacsimil.nombre = filter.nombre.trim();

            OU_SEQ = cs.getString(2);
            if (OU_SEQ.equals("220")) {
                OU_NROID = cs.getString(3);
                session.getCNXIBMDB2().openSystem();
                ProgramCall program = new ProgramCall(session.getCNXIBMDB2().getSystem());
                try {
                    App.CALL_CL3050(session.getCNXIBMDB2().getSystem(), session.getMainLibrary(), session.getUserView().getCustomerInfo().CCUST);
                    String programName = "/QSYS.LIB/" + session.getMainLibrary() + ".LIB/PRO10468.PGM";

                    //<editor-fold defaultstate="collapsed" desc="{...} Mapping">
                    AS400Map mapping = new AS400Map();

                    //<editor-fold defaultstate="collapsed" desc="{...} 01 RECEIVING_DATA_IN    ">
                    AS400DataType[] RECEIVING_DATA_IN = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}    02 RECEIVING_IN      ">
                    class IDX_RECEIVING_IN {

                        static final int LK_CIA = 0;
                        static final int LK_FORMA = 1;
                        static final int LK_SERIE = 2;
                        static final int LK_FILL = 3;
                        static final int LK_IDFILE = 4;
                    }
                    AS400DataType[] RECEIVING_IN = new AS400DataType[5];
                    RECEIVING_IN[IDX_RECEIVING_IN.LK_CIA] = mapping.Char(3);
                    RECEIVING_IN[IDX_RECEIVING_IN.LK_FORMA] = mapping.Char(4);
                    RECEIVING_IN[IDX_RECEIVING_IN.LK_SERIE] = mapping.Char(6);
                    RECEIVING_IN[IDX_RECEIVING_IN.LK_FILL] = mapping.Char(2);
                    RECEIVING_IN[IDX_RECEIVING_IN.LK_IDFILE] = mapping.Char(9);
                    //</editor-fold>

                    //<editor-fold defaultstate="collapsed" desc="{...} 01 RECEIVING_DATA_9879  ">
                    AS400DataType[] RECEIVING_DATA_9879 = new AS400DataType[3];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}    02 RECEIVING_I_9879  ">
                    class IDX_RECEIVING_I_9879 {

                        static final int LK_CIA = 0;
                        static final int LK_FORMA = 1;
                        static final int LK_SERIE = 2;
                        static final int LK_FILL = 3;
                    }
                    AS400DataType[] RECEIVING_I_9879 = new AS400DataType[4];
                    RECEIVING_I_9879[IDX_RECEIVING_I_9879.LK_CIA] = mapping.Char(3);
                    RECEIVING_I_9879[IDX_RECEIVING_I_9879.LK_FORMA] = mapping.Char(4);
                    RECEIVING_I_9879[IDX_RECEIVING_I_9879.LK_SERIE] = mapping.Char(6);
                    RECEIVING_I_9879[IDX_RECEIVING_I_9879.LK_FILL] = mapping.Char(2);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}    02 RECEIVING_IO_9879 ">
                    class IDX_RECEIVING_IO_9879 {

                        static final int LK_IDFILE = 0;
                        static final int LK_TRANSC = 1;
                        static final int LK_STSCNJ = 2;                         //(N= TKT UNICO,Y= CONJUNCION)
                        static final int LK_CNJPADRE = 3;
                        static final int LK_FINCNJ = 4;                         //(N= TKT UNICO,Y= CONJUNCION)
                        static final int LK_STSERR = 5;                         //(0= OK,1= ERROR)
                        static final int LK_COBERR = 6;
                        static final int LK_MSJERR = 7;
                    }
                    AS400DataType[] RECEIVING_IO_9879 = new AS400DataType[8];
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_IDFILE] = mapping.Char(9);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_TRANSC] = mapping.Char(6);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_STSCNJ] = mapping.Char(1);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_CNJPADRE] = mapping.Char(13);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_FINCNJ] = mapping.Char(1);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_STSERR] = mapping.Char(1);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_COBERR] = mapping.Char(6);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_MSJERR] = mapping.Char(80);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}    02 RECEIVING_O_9879  ">
                    AS400DataType[] RECEIVING_O_9879 = new AS400DataType[16];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKT06       ">
                    class IDX_LK_BKT06 {

                        static final int R06_SMSG = 0;
                        static final int R06_SQNR = 1;
                        static final int R06_STNQ = 2;
                        static final int R06_TRNN = 3;
                        static final int R06_NRID = 4;
                        static final int R06_TREC = 5;
                        static final int R06_TACN = 6;
                        static final int R06_CARF = 7;
                        static final int R06_CSTF = 8;
                        static final int R06_RPSI = 9;
                        static final int R06_ESAC = 10;
                        static final int R06_DISI = 11;
                        static final int R06_NRMI = 12;
                        static final int R06_NRCT = 13;
                        static final int R06_AREI = 14;
                        static final int R06_RESD = 15;
                    }
                    AS400DataType[] LK_BKT06 = new AS400DataType[16];
                    LK_BKT06[IDX_LK_BKT06.R06_SMSG] = mapping.Char(3);
                    LK_BKT06[IDX_LK_BKT06.R06_SQNR] = mapping.Numeric(8, 0);
                    LK_BKT06[IDX_LK_BKT06.R06_STNQ] = mapping.Numeric(2, 0);
                    LK_BKT06[IDX_LK_BKT06.R06_TRNN] = mapping.Numeric(6, 0);
                    LK_BKT06[IDX_LK_BKT06.R06_NRID] = mapping.Char(2);
                    LK_BKT06[IDX_LK_BKT06.R06_TREC] = mapping.Numeric(3, 0);
                    LK_BKT06[IDX_LK_BKT06.R06_TACN] = mapping.Char(3);
                    LK_BKT06[IDX_LK_BKT06.R06_CARF] = mapping.Char(10);
                    LK_BKT06[IDX_LK_BKT06.R06_CSTF] = mapping.Char(27);
                    LK_BKT06[IDX_LK_BKT06.R06_RPSI] = mapping.Char(4);
                    LK_BKT06[IDX_LK_BKT06.R06_ESAC] = mapping.Char(14);
                    LK_BKT06[IDX_LK_BKT06.R06_DISI] = mapping.Char(1);
                    LK_BKT06[IDX_LK_BKT06.R06_NRMI] = mapping.Char(1);
                    LK_BKT06[IDX_LK_BKT06.R06_NRCT] = mapping.Char(1);
                    LK_BKT06[IDX_LK_BKT06.R06_AREI] = mapping.Char(1);
                    LK_BKT06[IDX_LK_BKT06.R06_RESD] = mapping.Char(50);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS24       ">
                    class IDX_LK_BKS24 {

                        static final int R24_SMSG = 0;
                        static final int R24_SQNR = 1;
                        static final int R24_STNQ = 2;
                        static final int R24_DAIS = 3;
                        static final int R24_TRNN = 4;
                        static final int R24_TDNR = 5;
                        static final int R24_CDGT = 6;
                        static final int R24_CPUI = 7;
                        static final int R24_CJCP = 8;
                        static final int R24_AGTN = 9;
                        static final int R24_RFIC = 10;
                        static final int R24_TOUR = 11;
                        static final int R24_TRNC = 12;
                        static final int R24_TODC = 13;
                        static final int R24_PNRR = 14;
                        static final int R24_TIIS = 15;
                        static final int R24_RESD = 16;
                    }
                    AS400DataType[] LK_BKS24 = new AS400DataType[17];
                    LK_BKS24[IDX_LK_BKS24.R24_SMSG] = mapping.Char(3);
                    LK_BKS24[IDX_LK_BKS24.R24_SQNR] = mapping.Numeric(8, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_STNQ] = mapping.Numeric(2, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_DAIS] = mapping.Numeric(6, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_TRNN] = mapping.Numeric(6, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_TDNR] = mapping.Char(14);
                    LK_BKS24[IDX_LK_BKS24.R24_CDGT] = mapping.Numeric(1, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_CPUI] = mapping.Char(4);
                    LK_BKS24[IDX_LK_BKS24.R24_CJCP] = mapping.Char(3);
                    LK_BKS24[IDX_LK_BKS24.R24_AGTN] = mapping.Numeric(8, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_RFIC] = mapping.Char(1);
                    LK_BKS24[IDX_LK_BKS24.R24_TOUR] = mapping.Char(15);
                    LK_BKS24[IDX_LK_BKS24.R24_TRNC] = mapping.Char(4);
                    LK_BKS24[IDX_LK_BKS24.R24_TODC] = mapping.Char(10);
                    LK_BKS24[IDX_LK_BKS24.R24_PNRR] = mapping.Char(13);
                    LK_BKS24[IDX_LK_BKS24.R24_TIIS] = mapping.Char(4);
                    LK_BKS24[IDX_LK_BKS24.R24_RESD] = mapping.Char(34);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS30       ">
                    AS400DataType[] LK_BKS30 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC30     ">
                    class IDX_LO_RC30 {

                        static final int R30_SMSG = 0;
                        static final int R30_SQNR = 1;
                        static final int R30_STNQ = 2;
                        static final int R30_DAIS = 3;
                        static final int R30_TRNN = 4;
                        static final int R30_TDNR = 5;
                        static final int R30_CDGT = 6;
                        static final int R30_COBL = 7;
                        static final int R30_NTFA = 8;
                        static final int R30_TMFT1 = 9;
                        static final int R30_TMFA1 = 10;
                        static final int R30_TMFT2 = 11;
                        static final int R30_TMFA2 = 12;
                        static final int R30_TMFT3 = 13;
                        static final int R30_TMFA3 = 14;
                        static final int R30_TDAM = 15;
                        static final int R30_RESD = 16;
                        static final int R30_CUTP = 17;
                    }
                    AS400DataType[] LO_RC30 = new AS400DataType[18];
                    LO_RC30[IDX_LO_RC30.R30_SMSG] = mapping.Char(3);
                    LO_RC30[IDX_LO_RC30.R30_SQNR] = mapping.Numeric(8, 0);
                    LO_RC30[IDX_LO_RC30.R30_STNQ] = mapping.Numeric(2, 0);
                    LO_RC30[IDX_LO_RC30.R30_DAIS] = mapping.Numeric(6, 0);
                    LO_RC30[IDX_LO_RC30.R30_TRNN] = mapping.Numeric(6, 0);
                    LO_RC30[IDX_LO_RC30.R30_TDNR] = mapping.Char(14);
                    LO_RC30[IDX_LO_RC30.R30_CDGT] = mapping.Numeric(1, 0);
                    LO_RC30[IDX_LO_RC30.R30_COBL] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_NTFA] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_TMFT1] = mapping.Char(8);
                    LO_RC30[IDX_LO_RC30.R30_TMFA1] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_TMFT2] = mapping.Char(8);
                    LO_RC30[IDX_LO_RC30.R30_TMFA2] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_TMFT3] = mapping.Char(8);
                    LO_RC30[IDX_LO_RC30.R30_TMFA3] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_TDAM] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_RESD] = mapping.Char(2);
                    LO_RC30[IDX_LO_RC30.R30_CUTP] = mapping.Char(4);

                    LK_BKS30[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC30)), 15);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS39       ">
                    AS400DataType[] LK_BKS39 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC39     ">
                    class IDX_LO_RC39 {

                        static final int R39_SMSG = 0;
                        static final int R39_SQNR = 1;
                        static final int R39_STNQ = 2;
                        static final int R39_DAIS = 3;
                        static final int R39_TRNN = 4;
                        static final int R39_TDNR = 5;
                        static final int R39_CDGT = 6;
                        static final int R39_STAT = 7;
                        static final int R39_COTP = 8;
                        static final int R39_CORT = 9;
                        static final int R39_COAM = 10;
                        static final int R39_SPTP = 11;
                        static final int R39_SPRT = 12;
                        static final int R39_SPAM = 13;
                        static final int R39_EFRT = 14;
                        static final int R39_EFCO = 15;
                        static final int R39_APBC = 16;
                        static final int R39_RDII = 17;
                        static final int R39_RESD = 18;
                        static final int R39_CUTP = 19;
                    }
                    AS400DataType[] LO_RC39 = new AS400DataType[20];
                    LO_RC39[IDX_LO_RC39.R39_SMSG] = mapping.Char(3);
                    LO_RC39[IDX_LO_RC39.R39_SQNR] = mapping.Numeric(8, 0);
                    LO_RC39[IDX_LO_RC39.R39_STNQ] = mapping.Numeric(2, 0);
                    LO_RC39[IDX_LO_RC39.R39_DAIS] = mapping.Numeric(6, 0);
                    LO_RC39[IDX_LO_RC39.R39_TRNN] = mapping.Numeric(6, 0);
                    LO_RC39[IDX_LO_RC39.R39_TDNR] = mapping.Char(14);
                    LO_RC39[IDX_LO_RC39.R39_CDGT] = mapping.Numeric(1, 0);
                    LO_RC39[IDX_LO_RC39.R39_STAT] = mapping.Char(3);
                    LO_RC39[IDX_LO_RC39.R39_COTP] = mapping.Char(6);
                    LO_RC39[IDX_LO_RC39.R39_CORT] = mapping.Numeric(5, 2, true);
                    LO_RC39[IDX_LO_RC39.R39_COAM] = mapping.Numeric(11, 2, true);
                    LO_RC39[IDX_LO_RC39.R39_SPTP] = mapping.Char(6);
                    LO_RC39[IDX_LO_RC39.R39_SPRT] = mapping.Numeric(5, 0);
                    LO_RC39[IDX_LO_RC39.R39_SPAM] = mapping.Numeric(11, 2, true);
                    LO_RC39[IDX_LO_RC39.R39_EFRT] = mapping.Numeric(5, 0);
                    LO_RC39[IDX_LO_RC39.R39_EFCO] = mapping.Numeric(11, 2, true);
                    LO_RC39[IDX_LO_RC39.R39_APBC] = mapping.Numeric(11, 2, true);
                    LO_RC39[IDX_LO_RC39.R39_RDII] = mapping.Char(1);
                    LO_RC39[IDX_LO_RC39.R39_RESD] = mapping.Char(17);
                    LO_RC39[IDX_LO_RC39.R39_CUTP] = mapping.Char(4);

                    LK_BKS39[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC39)), 3);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS42       ">
                    AS400DataType[] LK_BKS42 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC42     ">
                    class IDX_LO_RC42 {

                        static final int R42_SMSG = 0;
                        static final int R42_SQNR = 1;
                        static final int R42_STNQ = 2;
                        static final int R42_DAIS = 3;
                        static final int R42_TRNN = 4;
                        static final int R42_TDNR = 5;
                        static final int R42_CDGT = 6;
                        static final int R42_TCTP1 = 7;
                        static final int R42_TOCA1 = 8;
                        static final int R42_TCTP2 = 9;
                        static final int R42_TOCA2 = 10;
                        static final int R42_TCTP3 = 11;
                        static final int R42_TOCA3 = 12;
                        static final int R42_TCTP4 = 13;
                        static final int R42_TOCA4 = 14;
                        static final int R42_RESD = 15;
                        static final int R42_CUTP = 16;
                    }
                    AS400DataType[] LO_RC42 = new AS400DataType[17];
                    LO_RC42[IDX_LO_RC42.R42_SMSG] = mapping.Char(3);
                    LO_RC42[IDX_LO_RC42.R42_SQNR] = mapping.Numeric(8, 0);
                    LO_RC42[IDX_LO_RC42.R42_STNQ] = mapping.Numeric(2, 0);
                    LO_RC42[IDX_LO_RC42.R42_DAIS] = mapping.Numeric(6, 0);
                    LO_RC42[IDX_LO_RC42.R42_TRNN] = mapping.Numeric(6, 0);
                    LO_RC42[IDX_LO_RC42.R42_TDNR] = mapping.Char(14);
                    LO_RC42[IDX_LO_RC42.R42_CDGT] = mapping.Numeric(1, 0);
                    LO_RC42[IDX_LO_RC42.R42_TCTP1] = mapping.Char(6);
                    LO_RC42[IDX_LO_RC42.R42_TOCA1] = mapping.Numeric(11, 2, true);
                    LO_RC42[IDX_LO_RC42.R42_TCTP2] = mapping.Char(6);
                    LO_RC42[IDX_LO_RC42.R42_TOCA2] = mapping.Numeric(11, 2, true);
                    LO_RC42[IDX_LO_RC42.R42_TCTP3] = mapping.Char(6);
                    LO_RC42[IDX_LO_RC42.R42_TOCA3] = mapping.Numeric(11, 2, true);
                    LO_RC42[IDX_LO_RC42.R42_TCTP4] = mapping.Char(6);
                    LO_RC42[IDX_LO_RC42.R42_TOCA4] = mapping.Numeric(11, 2, true);
                    LO_RC42[IDX_LO_RC42.R42_RESD] = mapping.Char(24);
                    LO_RC42[IDX_LO_RC42.R42_CUTP] = mapping.Char(4);

                    LK_BKS42[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC42)), 3);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS45       ">
                    AS400DataType[] LK_BKS45 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC45     ">
                    class IDX_LO_RC45 {

                        static final int R45_SMSG = 0;
                        static final int R45_SQNR = 1;
                        static final int R45_STNQ = 2;
                        static final int R45_RMED = 3;
                        static final int R45_TRNN = 4;
                        static final int R45_RTDN = 5;
                        static final int R45_CDGT = 6;
                        static final int R45_WAVR = 7;
                        static final int R45_RMIC = 8;
                        static final int R45_RCPN = 9;
                        static final int R45_DIRD = 10;
                        static final int R45_RESD = 11;
                    }
                    AS400DataType[] LO_RC45 = new AS400DataType[12];
                    LO_RC45[IDX_LO_RC45.R45_SMSG] = mapping.Char(3);
                    LO_RC45[IDX_LO_RC45.R45_SQNR] = mapping.Numeric(8, 0);
                    LO_RC45[IDX_LO_RC45.R45_STNQ] = mapping.Numeric(2, 0);
                    LO_RC45[IDX_LO_RC45.R45_RMED] = mapping.Char(6);
                    LO_RC45[IDX_LO_RC45.R45_TRNN] = mapping.Char(6);
                    LO_RC45[IDX_LO_RC45.R45_RTDN] = mapping.Char(14);
                    LO_RC45[IDX_LO_RC45.R45_CDGT] = mapping.Numeric(1, 0);
                    LO_RC45[IDX_LO_RC45.R45_WAVR] = mapping.Char(14);
                    LO_RC45[IDX_LO_RC45.R45_RMIC] = mapping.Char(5);
                    LO_RC45[IDX_LO_RC45.R45_RCPN] = mapping.Numeric(4, 0);
                    LO_RC45[IDX_LO_RC45.R45_DIRD] = mapping.Numeric(6, 0);
                    LO_RC45[IDX_LO_RC45.R45_RESD] = mapping.Char(67);

                    LK_BKS45[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC45)), 20);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS46       ">
                    AS400DataType[] LK_BKS46 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC46     ">
                    class IDX_LO_RC46 {

                        static final int R46_SMSG = 0;
                        static final int R46_SQNR = 1;
                        static final int R46_STNQ = 2;
                        static final int R46_DAIS = 3;
                        static final int R46_TRNN = 4;
                        static final int R46_TDNR = 5;
                        static final int R46_CDGT = 6;
                        static final int R46_ORIT = 7;
                        static final int R46_ORIL = 8;
                        static final int R46_ORID = 9;
                        static final int R46_ORIA = 10;
                        static final int R46_ENRS = 11;
                        static final int R46_RESD = 12;
                    }
                    AS400DataType[] LO_RC46 = new AS400DataType[13];
                    LO_RC46[IDX_LO_RC46.R46_SMSG] = mapping.Char(3);
                    LO_RC46[IDX_LO_RC46.R46_SQNR] = mapping.Numeric(8, 0);
                    LO_RC46[IDX_LO_RC46.R46_STNQ] = mapping.Numeric(2, 0);
                    LO_RC46[IDX_LO_RC46.R46_DAIS] = mapping.Numeric(6, 0);
                    LO_RC46[IDX_LO_RC46.R46_TRNN] = mapping.Numeric(6, 0);
                    LO_RC46[IDX_LO_RC46.R46_TDNR] = mapping.Char(14);
                    LO_RC46[IDX_LO_RC46.R46_CDGT] = mapping.Numeric(1, 0);
                    LO_RC46[IDX_LO_RC46.R46_ORIT] = mapping.Char(14);
                    LO_RC46[IDX_LO_RC46.R46_ORIL] = mapping.Char(3);
                    LO_RC46[IDX_LO_RC46.R46_ORID] = mapping.Char(7);
                    LO_RC46[IDX_LO_RC46.R46_ORIA] = mapping.Char(8);
                    LO_RC46[IDX_LO_RC46.R46_ENRS] = mapping.Char(49);
                    LO_RC46[IDX_LO_RC46.R46_RESD] = mapping.Char(15);

                    LK_BKS46[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC46)), 5);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKI63       ">
                    AS400DataType[] LK_BKI63 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC63     ">
                    class IDX_LO_RC63 {

                        static final int R63_SMSG = 0;
                        static final int R63_SQNR = 1;
                        static final int R63_STNQ = 2;
                        static final int R63_DAIS = 3;
                        static final int R63_TRNN = 4;
                        static final int R63_TDNR = 5;
                        static final int R63_CDGT = 6;
                        static final int R63_SEGI = 7;
                        static final int R63_STPO = 8;
                        static final int R63_NBDA = 9;
                        static final int R63_NADA = 10;
                        static final int R63_ORAC = 11;
                        static final int R63_DSTC = 12;
                        static final int R63_CARR = 13;
                        static final int R63_CABI = 14;
                        static final int R63_FTNR = 15;
                        static final int R63_RBKD = 16;
                        static final int R63_FTDA = 17;
                        static final int R63_FTDT = 18;
                        static final int R63_FBST = 19;
                        static final int R63_FBAL = 20;
                        static final int R63_FBTD = 21;
                        static final int R63_FFRF = 22;
                        static final int R63_FCPT = 23;
                        static final int R63_RESD = 24;
                    }
                    AS400DataType[] LO_RC63 = new AS400DataType[25];
                    LO_RC63[IDX_LO_RC63.R63_SMSG] = mapping.Char(3);
                    LO_RC63[IDX_LO_RC63.R63_SQNR] = mapping.Numeric(8, 0);
                    LO_RC63[IDX_LO_RC63.R63_STNQ] = mapping.Numeric(2, 0);
                    LO_RC63[IDX_LO_RC63.R63_DAIS] = mapping.Numeric(6, 0);
                    LO_RC63[IDX_LO_RC63.R63_TRNN] = mapping.Numeric(6, 0);
                    LO_RC63[IDX_LO_RC63.R63_TDNR] = mapping.Char(14);
                    LO_RC63[IDX_LO_RC63.R63_CDGT] = mapping.Numeric(1, 0);
                    LO_RC63[IDX_LO_RC63.R63_SEGI] = mapping.Numeric(1, 0);
                    LO_RC63[IDX_LO_RC63.R63_STPO] = mapping.Char(1);
                    LO_RC63[IDX_LO_RC63.R63_NBDA] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_NADA] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_ORAC] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_DSTC] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_CARR] = mapping.Char(3);
                    LO_RC63[IDX_LO_RC63.R63_CABI] = mapping.Char(1);
                    LO_RC63[IDX_LO_RC63.R63_FTNR] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_RBKD] = mapping.Char(2);
                    LO_RC63[IDX_LO_RC63.R63_FTDA] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_FTDT] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_FBST] = mapping.Char(2);
                    LO_RC63[IDX_LO_RC63.R63_FBAL] = mapping.Char(3);
                    LO_RC63[IDX_LO_RC63.R63_FBTD] = mapping.Char(15);
                    LO_RC63[IDX_LO_RC63.R63_FFRF] = mapping.Char(20);
                    LO_RC63[IDX_LO_RC63.R63_FCPT] = mapping.Char(3);
                    LO_RC63[IDX_LO_RC63.R63_RESD] = mapping.Char(10);

                    LK_BKI63[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC63)), 4);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BAR64       ">
                    class IDX_LK_BAR64 {

                        static final int R64_SMSG = 0;
                        static final int R64_SQNR = 1;
                        static final int R64_STNQ = 2;
                        static final int R64_DAIS = 3;
                        static final int R64_TRNN = 4;
                        static final int R64_TDNR = 5;
                        static final int R64_CDGT = 6;
                        static final int R64_FARE = 7;
                        static final int R64_TKMI = 8;
                        static final int R64_EQFR = 9;
                        static final int R64_TOTL = 10;
                        static final int R64_SASI = 11;
                        static final int R64_FCMI = 12;
                        static final int R64_BAID = 13;
                        static final int R64_BEOT = 14;
                        static final int R64_FCPI = 15;
                        static final int R64_TAXA1 = 16;
                        static final int R64_TAXA2 = 17;
                        static final int R64_TAXA3 = 18;
                        static final int R64_RESD = 19;
                    }
                    AS400DataType[] LK_BAR64 = new AS400DataType[20];
                    LK_BAR64[IDX_LK_BAR64.R64_SMSG] = mapping.Char(3);
                    LK_BAR64[IDX_LK_BAR64.R64_SQNR] = mapping.Numeric(8, 0);
                    LK_BAR64[IDX_LK_BAR64.R64_STNQ] = mapping.Numeric(2, 0);
                    LK_BAR64[IDX_LK_BAR64.R64_DAIS] = mapping.Numeric(6, 0);
                    LK_BAR64[IDX_LK_BAR64.R64_TRNN] = mapping.Numeric(6, 0);
                    LK_BAR64[IDX_LK_BAR64.R64_TDNR] = mapping.Char(14);
                    LK_BAR64[IDX_LK_BAR64.R64_CDGT] = mapping.Numeric(1, 0);
                    LK_BAR64[IDX_LK_BAR64.R64_FARE] = mapping.Char(12);
                    LK_BAR64[IDX_LK_BAR64.R64_TKMI] = mapping.Char(1);
                    LK_BAR64[IDX_LK_BAR64.R64_EQFR] = mapping.Char(12);
                    LK_BAR64[IDX_LK_BAR64.R64_TOTL] = mapping.Char(12);
                    LK_BAR64[IDX_LK_BAR64.R64_SASI] = mapping.Char(4);
                    LK_BAR64[IDX_LK_BAR64.R64_FCMI] = mapping.Char(1);
                    LK_BAR64[IDX_LK_BAR64.R64_BAID] = mapping.Char(6);
                    LK_BAR64[IDX_LK_BAR64.R64_BEOT] = mapping.Char(1);
                    LK_BAR64[IDX_LK_BAR64.R64_FCPI] = mapping.Char(1);
                    LK_BAR64[IDX_LK_BAR64.R64_TAXA1] = mapping.Char(11);
                    LK_BAR64[IDX_LK_BAR64.R64_TAXA2] = mapping.Char(11);
                    LK_BAR64[IDX_LK_BAR64.R64_TAXA3] = mapping.Char(11);
                    LK_BAR64[IDX_LK_BAR64.R64_RESD] = mapping.Char(46);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 WS_BAR65       ">
                    class IDX_WS_BAR65 {

                        static final int R65_SMSG = 0;
                        static final int R65_SQNR = 1;
                        static final int R65_STNQ = 2;
                        static final int R65_DAIS = 3;
                        static final int R65_TRNN = 4;
                        static final int R65_TDNR = 5;
                        static final int R65_CDGT = 6;
                        static final int R65_PXNM = 7;
                        static final int R65_PXDA = 8;
                        static final int R65_DOBR = 9;
                        static final int R65_PXTP = 10;
                        static final int R65_RESD = 11;
                    }
                    AS400DataType[] WS_BAR65 = new AS400DataType[12];
                    WS_BAR65[IDX_WS_BAR65.R65_SMSG] = mapping.Char(3);
                    WS_BAR65[IDX_WS_BAR65.R65_SQNR] = mapping.Numeric(8, 0);
                    WS_BAR65[IDX_WS_BAR65.R65_STNQ] = mapping.Numeric(2, 0);
                    WS_BAR65[IDX_WS_BAR65.R65_DAIS] = mapping.Numeric(6, 0);
                    WS_BAR65[IDX_WS_BAR65.R65_TRNN] = mapping.Numeric(6, 0);
                    WS_BAR65[IDX_WS_BAR65.R65_TDNR] = mapping.Char(14);
                    WS_BAR65[IDX_WS_BAR65.R65_CDGT] = mapping.Numeric(1, 0);
                    WS_BAR65[IDX_WS_BAR65.R65_PXNM] = mapping.Char(49);
                    WS_BAR65[IDX_WS_BAR65.R65_PXDA] = mapping.Char(29);
                    WS_BAR65[IDX_WS_BAR65.R65_DOBR] = mapping.Char(7);
                    WS_BAR65[IDX_WS_BAR65.R65_PXTP] = mapping.Char(3);
                    WS_BAR65[IDX_WS_BAR65.R65_RESD] = mapping.Char(8);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BAR66       ">
                    AS400DataType[] LK_BAR66 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC66     ">
                    class IDX_LO_RC66 {

                        static final int R66_SMSG = 0;
                        static final int R66_SQNR = 1;
                        static final int R66_STNQ = 2;
                        static final int R66_DAIS = 3;
                        static final int R66_TRNN = 4;
                        static final int R66_TDNR = 5;
                        static final int R66_CDGT = 6;
                        static final int R66_FPSN = 7;
                        static final int R66_FPIN = 8;
                        static final int R66_RESD = 9;
                    }
                    AS400DataType[] LO_RC66 = new AS400DataType[10];
                    LO_RC66[IDX_LO_RC66.R66_SMSG] = mapping.Char(3);
                    LO_RC66[IDX_LO_RC66.R66_SQNR] = mapping.Numeric(8, 0);
                    LO_RC66[IDX_LO_RC66.R66_STNQ] = mapping.Numeric(2, 0);
                    LO_RC66[IDX_LO_RC66.R66_DAIS] = mapping.Numeric(6, 0);
                    LO_RC66[IDX_LO_RC66.R66_TRNN] = mapping.Numeric(6, 0);
                    LO_RC66[IDX_LO_RC66.R66_TDNR] = mapping.Char(14);
                    LO_RC66[IDX_LO_RC66.R66_CDGT] = mapping.Numeric(1, 0);
                    LO_RC66[IDX_LO_RC66.R66_FPSN] = mapping.Numeric(1, 0);
                    LO_RC66[IDX_LO_RC66.R66_FPIN] = mapping.Char(50);
                    LO_RC66[IDX_LO_RC66.R66_RESD] = mapping.Char(45);

                    LK_BAR66[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC66)), 6);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 WS_REC75       ">
                    AS400DataType[] WS_REC75 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC75     ">
                    class IDX_LO_RC75 {

                        static final int R75_SMSG = 0;
                        static final int R75_SQNR = 1;
                        static final int R75_STNQ = 2;
                        static final int R75_DAIS = 3;
                        static final int R75_TRNN = 4;
                        static final int R75_TDNR = 5;
                        static final int R75_CDGT = 6;
                        static final int R75_EMCP = 7;
                        static final int R75_EMCV = 8;
                        static final int R75_EMRT = 9;
                        static final int R75_EMRC = 10;
                        static final int R75_EMST = 11;
                        static final int R75_EMSC = 12;
                        static final int R75_EMOC = 13;
                        static final int R75_XBOA = 14;
                        static final int R75_XBCT = 15;
                        static final int R75_XBRU = 16;
                        static final int R75_XBNE = 17;
                        static final int R75_EMCI = 18;
                        static final int R75_EMNS = 19;
                        static final int R75_EMCR = 20;
                        static final int R75_EMAG = 21;
                        static final int R75_EMSG = 22;
                        static final int R75_EMIC = 23;
                        static final int R75_RESD = 24;
                        static final int R75_CUTP = 25;
                    }
                    AS400DataType[] LO_RC75 = new AS400DataType[26];
                    LO_RC75[IDX_LO_RC75.R75_SMSG] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_SQNR] = mapping.Numeric(8, 0);
                    LO_RC75[IDX_LO_RC75.R75_STNQ] = mapping.Numeric(2, 0);
                    LO_RC75[IDX_LO_RC75.R75_DAIS] = mapping.Numeric(6, 0);
                    LO_RC75[IDX_LO_RC75.R75_TRNN] = mapping.Numeric(6, 0);
                    LO_RC75[IDX_LO_RC75.R75_TDNR] = mapping.Char(14);
                    LO_RC75[IDX_LO_RC75.R75_CDGT] = mapping.Numeric(1, 0);
                    LO_RC75[IDX_LO_RC75.R75_EMCP] = mapping.Numeric(1, 0);
                    LO_RC75[IDX_LO_RC75.R75_EMCV] = mapping.Numeric(11, 2, true);
                    LO_RC75[IDX_LO_RC75.R75_EMRT] = mapping.Char(14);
                    LO_RC75[IDX_LO_RC75.R75_EMRC] = mapping.Char(1);
                    LO_RC75[IDX_LO_RC75.R75_EMST] = mapping.Char(1);
                    LO_RC75[IDX_LO_RC75.R75_EMSC] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_EMOC] = mapping.Char(2);
                    LO_RC75[IDX_LO_RC75.R75_XBOA] = mapping.Char(1);
                    LO_RC75[IDX_LO_RC75.R75_XBCT] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_XBRU] = mapping.Char(12);
                    LO_RC75[IDX_LO_RC75.R75_XBNE] = mapping.Char(12);
                    LO_RC75[IDX_LO_RC75.R75_EMCI] = mapping.Char(1);
                    LO_RC75[IDX_LO_RC75.R75_EMNS] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_EMCR] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_EMAG] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_EMSG] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_EMIC] = mapping.Char(1);
                    LO_RC75[IDX_LO_RC75.R75_RESD] = mapping.Char(16);
                    LO_RC75[IDX_LO_RC75.R75_CUTP] = mapping.Char(4);

                    WS_REC75[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC75)), 5);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BMD76       ">
                    AS400DataType[] LK_BMD76 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC76     ">
                    class IDX_LO_RC76 {

                        static final int R76_SMSG = 0;
                        static final int R76_SQNR = 1;
                        static final int R76_STNQ = 2;
                        static final int R76_DAIS = 3;
                        static final int R76_TRNN = 4;
                        static final int R76_TDNR = 5;
                        static final int R76_CDGT = 6;
                        static final int R76_EMCP = 7;
                        static final int R76_EMRM = 8;
                        static final int R76_RESD = 9;
                    }
                    AS400DataType[] LO_RC76 = new AS400DataType[10];
                    LO_RC76[IDX_LO_RC76.R76_SMSG] = mapping.Char(3);
                    LO_RC76[IDX_LO_RC76.R76_SQNR] = mapping.Numeric(8, 0);
                    LO_RC76[IDX_LO_RC76.R76_STNQ] = mapping.Numeric(2, 0);
                    LO_RC76[IDX_LO_RC76.R76_DAIS] = mapping.Numeric(6, 0);
                    LO_RC76[IDX_LO_RC76.R76_TRNN] = mapping.Numeric(6, 0);
                    LO_RC76[IDX_LO_RC76.R76_TDNR] = mapping.Char(14);
                    LO_RC76[IDX_LO_RC76.R76_CDGT] = mapping.Numeric(1, 0);
                    LO_RC76[IDX_LO_RC76.R76_EMCP] = mapping.Numeric(1, 0);
                    LO_RC76[IDX_LO_RC76.R76_EMRM] = mapping.Char(70);
                    LO_RC76[IDX_LO_RC76.R76_RESD] = mapping.Char(25);

                    LK_BMD76[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC76)), 5);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKF81       ">
                    AS400DataType[] LK_BKF81 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC81     ">
                    class IDX_LO_RC81 {

                        static final int R81_SMSG = 0;
                        static final int R81_SQNR = 1;
                        static final int R81_STNQ = 2;
                        static final int R81_DAIS = 3;
                        static final int R81_TRNN = 4;
                        static final int R81_TDNR = 5;
                        static final int R81_CDGT = 6;
                        static final int R81_FRCS = 7;
                        static final int R81_FRCA = 8;
                        static final int R81_RESD = 9;
                    }
                    AS400DataType[] LO_RC81 = new AS400DataType[10];
                    LO_RC81[IDX_LO_RC81.R81_SMSG] = mapping.Char(3);
                    LO_RC81[IDX_LO_RC81.R81_SQNR] = mapping.Numeric(8, 0);
                    LO_RC81[IDX_LO_RC81.R81_STNQ] = mapping.Numeric(2, 0);
                    LO_RC81[IDX_LO_RC81.R81_DAIS] = mapping.Numeric(6, 0);
                    LO_RC81[IDX_LO_RC81.R81_TRNN] = mapping.Numeric(6, 0);
                    LO_RC81[IDX_LO_RC81.R81_TDNR] = mapping.Char(14);
                    LO_RC81[IDX_LO_RC81.R81_CDGT] = mapping.Numeric(1, 0);
                    LO_RC81[IDX_LO_RC81.R81_FRCS] = mapping.Numeric(1, 0);
                    LO_RC81[IDX_LO_RC81.R81_FRCA] = mapping.Char(87);
                    LO_RC81[IDX_LO_RC81.R81_RESD] = mapping.Char(8);

                    LK_BKF81[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC81)), 5);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKP84       ">
                    AS400DataType[] LK_BKP84 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC84     ">
                    class IDX_LO_RC84 {

                        static final int R84_SMSG = 0;
                        static final int R84_SQNR = 1;
                        static final int R84_STNQ = 2;
                        static final int R84_DAIS = 3;
                        static final int R84_TRNN = 4;
                        static final int R84_FPTP = 5;
                        static final int R84_FPAM = 6;
                        static final int R84_FPAC = 7;
                        static final int R84_EXDA = 8;
                        static final int R84_EXPC = 9;
                        static final int R84_APLC = 10;
                        static final int R84_INVN = 11;
                        static final int R84_INVD = 12;
                        static final int R84_REMT = 13;
                        static final int R84_CVVR = 14;
                        static final int R84_RESD = 15;
                        static final int R84_CUTP = 16;
                    }
                    AS400DataType[] LO_RC84 = new AS400DataType[17];
                    LO_RC84[IDX_LO_RC84.R84_SMSG] = mapping.Char(3);
                    LO_RC84[IDX_LO_RC84.R84_SQNR] = mapping.Numeric(8, 0);
                    LO_RC84[IDX_LO_RC84.R84_STNQ] = mapping.Numeric(2, 0);
                    LO_RC84[IDX_LO_RC84.R84_DAIS] = mapping.Numeric(6, 0);
                    LO_RC84[IDX_LO_RC84.R84_TRNN] = mapping.Numeric(6, 0);
                    LO_RC84[IDX_LO_RC84.R84_FPTP] = mapping.Char(10);
                    LO_RC84[IDX_LO_RC84.R84_FPAM] = mapping.Numeric(11, 2, true);
                    LO_RC84[IDX_LO_RC84.R84_FPAC] = mapping.Char(19);
                    LO_RC84[IDX_LO_RC84.R84_EXDA] = mapping.Char(4);
                    LO_RC84[IDX_LO_RC84.R84_EXPC] = mapping.Char(2);
                    LO_RC84[IDX_LO_RC84.R84_APLC] = mapping.Char(6);
                    LO_RC84[IDX_LO_RC84.R84_INVN] = mapping.Char(14);
                    LO_RC84[IDX_LO_RC84.R84_INVD] = mapping.Char(6);
                    LO_RC84[IDX_LO_RC84.R84_REMT] = mapping.Numeric(11, 2, true);
                    LO_RC84[IDX_LO_RC84.R84_CVVR] = mapping.Char(1);
                    LO_RC84[IDX_LO_RC84.R84_RESD] = mapping.Char(23);
                    LO_RC84[IDX_LO_RC84.R84_CUTP] = mapping.Char(4);

                    LK_BKP84[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC84)), 6);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_AGTN        ">
                    AS400DataType[] LK_AGTN = new AS400DataType[1];
                    LK_AGTN[0] = mapping.Char(8);
                    //</editor-fold>

                    RECEIVING_DATA_IN[0] = mapping.Char(mapping.GetDimension(RECEIVING_IN));
                    AS400Structure structure = new AS400Structure(RECEIVING_DATA_IN);
                    AS400Structure structure00 = new AS400Structure(RECEIVING_IN);

                    int dim = mapping.GetDimension(RECEIVING_I_9879)
                            + mapping.GetDimension(RECEIVING_IO_9879)
                            + mapping.GetDimension(LK_BKT06)
                            + mapping.GetDimension(LK_BKS24)
                            + (mapping.GetDimension(LO_RC30) * mapping.getOccursSize(LK_BKS30[0]))
                            + (mapping.GetDimension(LO_RC39) * mapping.getOccursSize(LK_BKS39[0]))
                            + (mapping.GetDimension(LO_RC42) * mapping.getOccursSize(LK_BKS42[0]))
                            + (mapping.GetDimension(LO_RC45) * mapping.getOccursSize(LK_BKS45[0]))
                            + (mapping.GetDimension(LO_RC46) * mapping.getOccursSize(LK_BKS46[0]))
                            + (mapping.GetDimension(LO_RC63) * mapping.getOccursSize(LK_BKI63[0]))
                            + mapping.GetDimension(LK_BAR64)
                            + mapping.GetDimension(WS_BAR65)
                            + (mapping.GetDimension(LO_RC66) * mapping.getOccursSize(LK_BAR66[0]))
                            + (mapping.GetDimension(LO_RC75) * mapping.getOccursSize(WS_REC75[0]))
                            + (mapping.GetDimension(LO_RC76) * mapping.getOccursSize(LK_BMD76[0]))
                            + (mapping.GetDimension(LO_RC81) * mapping.getOccursSize(LK_BKF81[0]))
                            + (mapping.GetDimension(LO_RC84) * mapping.getOccursSize(LK_BKP84[0]))
                            + mapping.GetDimension(LK_AGTN);

                    RECEIVING_O_9879[0] = mapping.Char(mapping.GetDimension(LK_BKT06));
                    RECEIVING_O_9879[1] = mapping.Char(mapping.GetDimension(LK_BKS24));
                    RECEIVING_O_9879[2] = mapping.Char((mapping.GetDimension(LO_RC30) * mapping.getOccursSize(LK_BKS30[0])));
                    RECEIVING_O_9879[3] = mapping.Char((mapping.GetDimension(LO_RC39) * mapping.getOccursSize(LK_BKS39[0])));
                    RECEIVING_O_9879[4] = mapping.Char((mapping.GetDimension(LO_RC42) * mapping.getOccursSize(LK_BKS42[0])));
                    RECEIVING_O_9879[5] = mapping.Char((mapping.GetDimension(LO_RC45) * mapping.getOccursSize(LK_BKS45[0])));
                    RECEIVING_O_9879[6] = mapping.Char((mapping.GetDimension(LO_RC46) * mapping.getOccursSize(LK_BKS46[0])));
                    RECEIVING_O_9879[7] = mapping.Char((mapping.GetDimension(LO_RC63) * mapping.getOccursSize(LK_BKI63[0])));
                    RECEIVING_O_9879[8] = mapping.Char(mapping.GetDimension(LK_BAR64));
                    RECEIVING_O_9879[9] = mapping.Char(mapping.GetDimension(WS_BAR65));
                    RECEIVING_O_9879[10] = mapping.Char((mapping.GetDimension(LO_RC66) * mapping.getOccursSize(LK_BAR66[0])));
                    RECEIVING_O_9879[11] = mapping.Char((mapping.GetDimension(LO_RC75) * mapping.getOccursSize(WS_REC75[0])));
                    RECEIVING_O_9879[12] = mapping.Char((mapping.GetDimension(LO_RC76) * mapping.getOccursSize(LK_BMD76[0])));
                    RECEIVING_O_9879[13] = mapping.Char((mapping.GetDimension(LO_RC81) * mapping.getOccursSize(LK_BKF81[0])));
                    RECEIVING_O_9879[14] = mapping.Char((mapping.GetDimension(LO_RC84) * mapping.getOccursSize(LK_BKP84[0])));
                    RECEIVING_O_9879[15] = mapping.Char(mapping.GetDimension(LK_AGTN));

                    RECEIVING_DATA_9879[0] = mapping.Char(mapping.GetDimension(RECEIVING_I_9879));
                    RECEIVING_DATA_9879[1] = mapping.Char(mapping.GetDimension(RECEIVING_IO_9879));
                    RECEIVING_DATA_9879[2] = mapping.Char(mapping.GetDimension(RECEIVING_O_9879));

                    AS400Structure structure01 = new AS400Structure(RECEIVING_DATA_9879);
                    AS400Structure structure02 = new AS400Structure(RECEIVING_I_9879);
                    AS400Structure structure03 = new AS400Structure(RECEIVING_IO_9879);
                    AS400Structure structure04 = new AS400Structure(RECEIVING_O_9879);
                    AS400Structure structure05 = new AS400Structure(LK_BKT06);
                    AS400Structure structure06 = new AS400Structure(LK_BKS24);
                    AS400Structure structure07 = new AS400Structure(LK_BKS30);
                    AS400Structure structure08 = new AS400Structure(LO_RC30);
                    AS400Structure structure09 = new AS400Structure(LK_BKS39);
                    AS400Structure structure10 = new AS400Structure(LO_RC39);
                    AS400Structure structure11 = new AS400Structure(LK_BKS42);
                    AS400Structure structure12 = new AS400Structure(LO_RC42);
                    AS400Structure structure13 = new AS400Structure(LK_BKS45);
                    AS400Structure structure14 = new AS400Structure(LO_RC45);
                    AS400Structure structure15 = new AS400Structure(LK_BKS46);
                    AS400Structure structure16 = new AS400Structure(LO_RC46);
                    AS400Structure structure17 = new AS400Structure(LK_BKI63);
                    AS400Structure structure18 = new AS400Structure(LO_RC63);
                    AS400Structure structure19 = new AS400Structure(LK_BAR64);
                    AS400Structure structure20 = new AS400Structure(WS_BAR65);
                    AS400Structure structure21 = new AS400Structure(LK_BAR66);
                    AS400Structure structure22 = new AS400Structure(LO_RC66);
                    AS400Structure structure23 = new AS400Structure(WS_REC75);
                    AS400Structure structure24 = new AS400Structure(LO_RC75);
                    AS400Structure structure25 = new AS400Structure(LK_BMD76);
                    AS400Structure structure26 = new AS400Structure(LO_RC76);
                    AS400Structure structure27 = new AS400Structure(LK_BKF81);
                    AS400Structure structure28 = new AS400Structure(LO_RC81);
                    AS400Structure structure29 = new AS400Structure(LK_BKP84);
                    AS400Structure structure30 = new AS400Structure(LO_RC84);
                    AS400Structure structure31 = new AS400Structure(LK_AGTN);
                    //</editor-fold>

                    ProgramParameter[] parameterList = new ProgramParameter[2];
                    parameterList[0] = new ProgramParameter(RECEIVING_DATA_IN[0].toBytes(filter.TDNR.trim() + "  " + OU_NROID));
                    parameterList[1] = new ProgramParameter(dim);

                    program.setProgram(programName, parameterList);

                    if (program.run() != true) {
                        System.out.println("Program failed!");
                        AS400Message[] messagelist = program.getMessageList();
                        for (int i = 0; i < messagelist.length; ++i) {
                            System.out.println(messagelist[i]);
                        }
                    } else {
                        byte[] receiverVar = parameterList[1].getOutputData();
                        //<editor-fold defaultstate="collapsed" desc="{...} Load Trama">
                        Object[] N01_RECEIVING_DATA_9879 = (Object[]) structure01.toObject(receiverVar, 0);
                        Object[] N02_RECEIVING_I_9879 = (Object[]) structure02.toObject(RECEIVING_DATA_9879[0].toBytes(N01_RECEIVING_DATA_9879[0]), 0);
                        Object[] N02_RECEIVING_IO_9879 = (Object[]) structure03.toObject(RECEIVING_DATA_9879[1].toBytes(N01_RECEIVING_DATA_9879[1]), 0);
                        Object[] N02_RECEIVING_O_9879 = (Object[]) structure04.toObject(RECEIVING_DATA_9879[2].toBytes(N01_RECEIVING_DATA_9879[2]), 0);

                        Object[] N05_LK_BKT06 = (Object[]) structure05.toObject(RECEIVING_O_9879[0].toBytes(N02_RECEIVING_O_9879[0]), 0);
                        Object[] N05_LK_BKS24 = (Object[]) structure06.toObject(RECEIVING_O_9879[1].toBytes(N02_RECEIVING_O_9879[1]), 0);
                        Object[] N05_LK_BKS30 = (Object[]) ((Object[]) structure07.toObject(RECEIVING_O_9879[2].toBytes(N02_RECEIVING_O_9879[2]), 0))[0];
                        List<Object[]> N07_LO_RC30 = new ArrayList<Object[]>(N05_LK_BKS30.length);
                        for (int i = 0; i < N05_LK_BKS30.length; i++) {
                            N07_LO_RC30.add((Object[]) structure08.toObject(mapping.Char(mapping.GetDimension(LO_RC30)).toBytes(N05_LK_BKS30[i]), 0));
                        }
                        Object[] N05_LK_BKS39 = (Object[]) ((Object[]) structure09.toObject(RECEIVING_O_9879[3].toBytes(N02_RECEIVING_O_9879[3]), 0))[0];
                        List<Object[]> N07_LO_RC39 = new ArrayList<Object[]>(N05_LK_BKS39.length);
                        for (int i = 0; i < N05_LK_BKS39.length; i++) {
                            N07_LO_RC39.add((Object[]) structure10.toObject(mapping.Char(mapping.GetDimension(LO_RC39)).toBytes(N05_LK_BKS39[i]), 0));
                        }
                        Object[] N07_LK_BKS42 = (Object[]) ((Object[]) structure11.toObject(RECEIVING_O_9879[4].toBytes(N02_RECEIVING_O_9879[4]), 0))[0];
                        List<Object[]> N07_LO_RC42 = new ArrayList<Object[]>(N07_LK_BKS42.length);
                        for (int i = 0; i < N07_LK_BKS42.length; i++) {
                            N07_LO_RC42.add((Object[]) structure12.toObject(mapping.Char(mapping.GetDimension(LO_RC42)).toBytes(N07_LK_BKS42[i]), 0));
                        }
                        Object[] N07_LK_BKS45 = (Object[]) ((Object[]) structure13.toObject(RECEIVING_O_9879[5].toBytes(N02_RECEIVING_O_9879[5]), 0))[0];
                        List<Object[]> N07_LO_RC45 = new ArrayList<Object[]>(N07_LK_BKS45.length);
                        for (int i = 0; i < N07_LK_BKS45.length; i++) {
                            N07_LO_RC45.add((Object[]) structure14.toObject(mapping.Char(mapping.GetDimension(LO_RC45)).toBytes(N07_LK_BKS45[i]), 0));
                        }
                        Object[] N07_LK_BKS46 = (Object[]) ((Object[]) structure15.toObject(RECEIVING_O_9879[6].toBytes(N02_RECEIVING_O_9879[6]), 0))[0];
                        List<Object[]> N07_LO_RC46 = new ArrayList<Object[]>(N07_LK_BKS46.length);
                        for (int i = 0; i < N07_LK_BKS46.length; i++) {
                            N07_LO_RC46.add((Object[]) structure16.toObject(mapping.Char(mapping.GetDimension(LO_RC46)).toBytes(N07_LK_BKS46[i]), 0));
                        }
                        Object[] N07_LK_BKI63 = (Object[]) ((Object[]) structure17.toObject(RECEIVING_O_9879[7].toBytes(N02_RECEIVING_O_9879[7]), 0))[0];
                        List<Object[]> N07_LO_RC63 = new ArrayList<Object[]>(N07_LK_BKI63.length);
                        for (int i = 0; i < N07_LK_BKI63.length; i++) {
                            N07_LO_RC63.add((Object[]) structure18.toObject(mapping.Char(mapping.GetDimension(LO_RC63)).toBytes(N07_LK_BKI63[i]), 0));
                        }
                        Object[] N07_LK_BAR64 = (Object[]) structure19.toObject(RECEIVING_O_9879[8].toBytes(N02_RECEIVING_O_9879[8]), 0);
                        Object[] N07_WS_BAR65 = (Object[]) structure20.toObject(RECEIVING_O_9879[9].toBytes(N02_RECEIVING_O_9879[9]), 0);
                        Object[] N07_LK_BAR66 = (Object[]) ((Object[]) structure21.toObject(RECEIVING_O_9879[10].toBytes(N02_RECEIVING_O_9879[10]), 0))[0];
                        List<Object[]> N07_LO_RC66 = new ArrayList<Object[]>(N07_LK_BAR66.length);
                        for (int i = 0; i < N07_LK_BAR66.length; i++) {
                            N07_LO_RC66.add((Object[]) structure22.toObject(mapping.Char(mapping.GetDimension(LO_RC66)).toBytes(N07_LK_BAR66[i]), 0));
                        }
                        Object[] N07_WS_REC75 = (Object[]) ((Object[]) structure23.toObject(RECEIVING_O_9879[11].toBytes(N02_RECEIVING_O_9879[11]), 0))[0];
                        List<Object[]> N07_LO_RC75 = new ArrayList<Object[]>(N07_WS_REC75.length);
                        for (int i = 0; i < N07_WS_REC75.length; i++) {
                            N07_LO_RC75.add((Object[]) structure24.toObject(mapping.Char(mapping.GetDimension(LO_RC75)).toBytes(N07_WS_REC75[i]), 0));
                        }
                        Object[] N07_LK_BMD76 = (Object[]) ((Object[]) structure25.toObject(RECEIVING_O_9879[12].toBytes(N02_RECEIVING_O_9879[12]), 0))[0];
                        List<Object[]> N07_LO_RC76 = new ArrayList<Object[]>(N07_LK_BMD76.length);
                        for (int i = 0; i < N07_LK_BMD76.length; i++) {
                            N07_LO_RC76.add((Object[]) structure26.toObject(mapping.Char(mapping.GetDimension(LO_RC76)).toBytes(N07_LK_BMD76[i]), 0));
                        }
                        Object[] N07_LK_BKF81 = (Object[]) ((Object[]) structure27.toObject(RECEIVING_O_9879[13].toBytes(N02_RECEIVING_O_9879[13]), 0))[0];
                        List<Object[]> N07_LO_RC81 = new ArrayList<Object[]>(N07_LK_BKF81.length);
                        for (int i = 0; i < N07_LK_BKF81.length; i++) {
                            N07_LO_RC81.add((Object[]) structure28.toObject(mapping.Char(mapping.GetDimension(LO_RC81)).toBytes(N07_LK_BKF81[i]), 0));
                        }
                        Object[] N07_LK_BKP84 = (Object[]) ((Object[]) structure29.toObject(RECEIVING_O_9879[14].toBytes(N02_RECEIVING_O_9879[14]), 0))[0];
                        List<Object[]> N07_LO_RC84 = new ArrayList<Object[]>(N07_LK_BKP84.length);
                        for (int i = 0; i < N07_LK_BKP84.length; i++) {
                            N07_LO_RC84.add((Object[]) structure30.toObject(mapping.Char(mapping.GetDimension(LO_RC84)).toBytes(N07_LK_BKP84[i]), 0));
                        }
                        String N07_LK_AGTN = (String) ((Object[]) structure31.toObject(RECEIVING_O_9879[15].toBytes(N02_RECEIVING_O_9879[15]), 0))[0];
                        //</editor-fold>
                        beanFacsimil.strError = mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_STSERR]);
                        if (beanFacsimil.strError.equals("0") || beanFacsimil.strError.trim().equals("")) {
                            //RECORD 24 - Ticket Document Identification
                            beanFacsimil.DAIS = "20" + Util.fillZeros(6, mapping.getInt(N05_LK_BKS24[IDX_LK_BKS24.R24_DAIS]));
                            beanFacsimil.TODC = mapping.getString(N05_LK_BKS24[IDX_LK_BKS24.R24_TODC]);
                            beanFacsimil.TOUR = mapping.getString(N05_LK_BKS24[IDX_LK_BKS24.R24_TOUR]);
                            beanFacsimil.PNRR = mapping.getString(N05_LK_BKS24[IDX_LK_BKS24.R24_PNRR]);
                            beanFacsimil.TDNR = mapping.getString(N05_LK_BKS24[IDX_LK_BKS24.R24_TDNR]);
                            beanFacsimil.CDGT = Util.fillZeros(1, mapping.getInt(N05_LK_BKS24[IDX_LK_BKS24.R24_CDGT]));
                            beanFacsimil.TRNC = mapping.getString(N05_LK_BKS24[IDX_LK_BKS24.R24_TRNC]);
                            beanFacsimil.AGTN = Util.fillZeros(8, mapping.getInt(N05_LK_BKS24[IDX_LK_BKS24.R24_AGTN]));

                            //RECORD 46 - Qualifying Issue Information for Sales Transactions Record
                            for (int i = 0; i < N07_LO_RC46.size(); i++) {
                                lstReg46Restrict.add(mapping.getString(N07_LO_RC46.get(i)[IDX_LO_RC46.R46_ENRS]));
                                lstReg46OrigIssue.add("");
                            }
                            //RECORD 63 - Itinerary Data Segment
                            for (int i = 0; i < 4; i++) {
                                reg63 = new BSPF63();
                                reg63.CDGT = mapping.getInt(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_CDGT]);
                                reg63.STPO = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_STPO]);
                                reg63.ORAC = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_ORAC]);
                                reg63.DSTC = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_DSTC]);
                                reg63.CARR = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_CARR]);
                                reg63.FTNR = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_FTNR]);
                                reg63.DAIS = Util.fillZeros(6, mapping.getInt(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_DAIS]));
                                reg63.RBKD = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_RBKD]);
                                reg63.FTDA = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_FTDA]);
                                reg63.FTDT = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_FTDT]);
                                reg63.FBST = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_FBST]);
                                reg63.FBTD = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_FBTD]);
                                reg63.NBDA = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_NBDA]);
                                reg63.NADA = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_NADA]);
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
                                //</editor-fold>
                                lstReg63.add(reg63);
                            }
                             //RECORD 30 - taxes
                               if (IDX_LO_RC30.R30_SQNR > 0) {
                                String R30_TMFT1,R30_TMFT2,R30_TMFT3 ="";
                                double R30_TMFA1,R30_TMFA2,R30_TMFA3 =0;
                                for (int n = 0; n < N07_LO_RC30.size(); n++) {
                                     R30_TMFT1="";R30_TMFT2="";R30_TMFT3="";
                                     R30_TMFA1=0;R30_TMFA2=0;R30_TMFA3=0;
                                    if(!mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT1]).trim().equals("")){
                                        R30_TMFT1 = mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT1]).trim();
                                        R30_TMFA1 = mapping.getDouble(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFA1]);
                                        if(R30_TMFA1 != 0){
                                            lstTaxes.add(R30_TMFT1+" "+R30_TMFA1);
                                        }
                                    }
                                    if(!mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT2]).trim().equals("")){
                                        R30_TMFT2 = mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT2]).trim();
                                        R30_TMFA2 = mapping.getDouble(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFA2]);
                                        if(R30_TMFA2 != 0){
                                            lstTaxes.add(R30_TMFT2+" "+R30_TMFA2);
                                        }
                                    }
                                    if(!mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT3]).trim().equals("")){
                                        R30_TMFT3 = mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT3]).trim();
                                        R30_TMFA3 = mapping.getDouble(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFA3]);
                                        if(R30_TMFA3 != 0){
                                            lstTaxes.add(R30_TMFT3+" "+R30_TMFA3);
                                        }
                                    }
                                  
                                 
                            }
                                
                                
                                /*
                                   if (Integer.parseInt(mapping.getString(N05_LK_BKS30[IDX_LO_RC30.R30_TMFA1]).trim()) > 0) {
                                        R30_TMFT1 = mapping.getString(N05_LK_BKS30[IDX_LO_RC30.R30_TMFT1]);
                                        //R30_TMFA1 = mapping.getDouble(N05_LK_BKS30[IDX_LO_RC30.R30_TMFA1]);
                                        lstTaxes.add(R30_TMFT1);
                                    }
                                   if (Integer.parseInt(mapping.getString(N05_LK_BKS30[IDX_LO_RC30.R30_TMFA2]).trim()) > 0) {
                                        R30_TMFT2 = mapping.getString(N05_LK_BKS30[IDX_LO_RC30.R30_TMFT2]);
                                        //R30_TMFA2 = mapping.getDouble(N05_LK_BKS30[IDX_LO_RC30.R30_TMFA2]);
                                        lstTaxes.add(R30_TMFT2);
                                    }
                                   if (Integer.parseInt(mapping.getString(N05_LK_BKS30[IDX_LO_RC30.R30_TMFA3]).trim()) > 0) {
                                        R30_TMFT3 = mapping.getString(N05_LK_BKS30[IDX_LO_RC30.R30_TMFT3]);
                                        //R30_TMFA3 = mapping.getDouble(N05_LK_BKS30[IDX_LO_RC30.R30_TMFA3]);
                                        lstTaxes.add(R30_TMFT3);
                                    }*/
                               }
                            
                            //RECORD 64 - Document Amounts
                            if (mapping.getInt(N07_LK_BAR64[IDX_LK_BAR64.R64_SQNR]) > 0) {
                                String equivalent_s;
                                String regTax;
                                String regTax2;
                                String regTax3;
                                beanFacsimil.FARE = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_FARE]);
                                beanFacsimil.CUTP1 = beanFacsimil.FARE.substring(0, 3);
                                beanFacsimil.FARE = beanFacsimil.FARE.substring(3);
                                equivalent_s = Util.fillZeros(8, mapping.getInt(N07_LK_BAR64[IDX_LK_BAR64.R64_SQNR]));
                                if (mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_EQFR]).trim().length() > 0) {
//                                    beanFacsimil.EQFR = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_EQFR]) + equivalent_s;
                                    beanFacsimil.EQFR = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_EQFR]);
                                } else {
//                                  beanFacsimil.EQFR = beanFacsimil.CUTP1 + equivalent_s;
                                    beanFacsimil.EQFR = "";
                                }
                                if (Integer.parseInt(mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA1]).trim()) > 0) {
                                    regTax = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA1]);
                                    lstTaxes.add(regTax);
                                }
                                if (Integer.parseInt(mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA2]).trim()) > 0) {
                                    regTax2 = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA2]);
                                    lstTaxes.add(regTax2);
                                }
                                if (Integer.parseInt(mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA3]).trim()) > 0) {
                                    regTax3 = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA3]);
                                    lstTaxes.add(regTax3);
                                }
                                beanFacsimil.TOTL = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TOTL]);
                            }
                            //RECORD 65 - Passenger Information
                            beanFacsimil.PXNM = mapping.getString(N07_WS_BAR65[IDX_WS_BAR65.R65_PXNM]);
                            //RECORD 81 - Fare Calculation
                            for (int i = 0; i < 5; i++) {
                                if (mapping.getString(N07_LO_RC81.get(i)[IDX_LO_RC81.R81_FRCA]).trim().length() > 0) {
                                    lstFC.add(mapping.getString(N07_LO_RC81.get(i)[IDX_LO_RC81.R81_FRCA]));
                                }
                            }
                            //Verificando Cantidad de Conjunciones
                            String strFPTP, strAPLC, strFPAC;
                            Double dblFPAM;
                            for (int i = 0; i < N07_LO_RC84.size(); i++) {
                                strFPTP = mapping.getString(N07_LO_RC84.get(i)[IDX_LO_RC84.R84_FPTP]).trim();
                                strAPLC = mapping.getString(N07_LO_RC84.get(i)[IDX_LO_RC84.R84_APLC]).trim();
                                strFPAC = mapping.getString(N07_LO_RC84.get(i)[IDX_LO_RC84.R84_FPAC]).trim();
                                dblFPAM = mapping.getDouble(N07_LO_RC84.get(i)[IDX_LO_RC84.R84_FPAM]);
                                if (strFPTP.length() > 0) {
                                    if (strFPTP.equals("EX") || strFPTP.equals("ET")) {
                                        beanFacsimil.strIssExc += " / " + strFPAC;
                                    }
                                    if (dblFPAM > 0) {
                                        if (strFPTP.equals("CC") || strFPTP.equals("TC")) {
                                            if (strAPLC.length() > 0) {
                                                lstFOP.add("Type:" + strFPTP + "  Amount: " + dblFPAM + "  Account:" + strFPAC + "  Approval Code:" + strAPLC);
                                            } else {
                                                lstFOP.add("Type:" + strFPTP + "  Amount: " + dblFPAM + "  Account:" + strFPAC);
                                            }
                                        } else {
                                            if (strAPLC.length() > 0) {
                                                lstFOP.add("Type:" + strFPTP + "  Amount: " + dblFPAM + "  Approval Code:" + strAPLC);
                                            } else {
                                                lstFOP.add("Type:" + strFPTP + "  Amount: " + dblFPAM);
                                            }
                                        }
                                    }
                                }
                            }
                            //Verificando Cantidad de Conjunciones
                            //beanFacsimil.strIssExc = "";

                            beanFacsimil.strFinCjn = mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_FINCNJ]);
                            beanFacsimil.strEsCjn = mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_STSCNJ]);
                            strConj = mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_CNJPADRE]);
                            long cjn;
                            String cjn_s;
                            for (int i = 0; i < 1; i++) {
                                cjn = Long.parseLong(mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_CNJPADRE])) + (i + 1);
                                cjn_s = cjn + "";
                                strConj = strConj + " - " + cjn_s.substring(9);
                            }
                        } else {
                            beanFacsimil.strMsj = mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_MSJERR]);
                            //NOT-FOUND - A pedido de ENS 20140905, si no se encuentra el Ticket de todas maneras se busca
                            //el uso del cupón consultado (VENTA NO REPORTADA)
                            if (beanFacsimil.strMsj.contains("NOT-FOUND")) {
                                try {
                                    for (int i = 1; i <= Integer.parseInt(filter.CPUI); i++) {
                                        if (i == Integer.parseInt(filter.CPUI)) {
                                            reg63 = new BSPF63();
                                            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                                            //OBTENIENDO DATOS DEL USO =================================
                                            boolean encontroUso = false;
                                            // VOLADO 
                                            strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                    + "FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                                    + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                    + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                    + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                    + "' AND CUPON = '" + i + "' ";

                                            stmt = cnx.prepareStatement(strSQLUSO);
                                            stmt.execute();
                                            rst2 = stmt.getResultSet();
                                            //rst2 = stmt.executeQuery(strSQLUSO);
                                            if (rst2.next()) {
                                                encontroUso = true;
                                                reg63.ORAC = rst2.getString("CDEPART").trim();
                                                reg63.DSTC = rst2.getString("CARRIVA").trim();
                                                reg63.CARR = rst2.getString("CARR").trim();
                                                reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                                reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                                reg63.RBKD = rst2.getString("CLAS").trim();
                                                reg63.FBTD = rst2.getString("FBASE").trim();
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

                                            //DISCHARGE
                                            if (!encontroUso) {
                                                strSQLUSO = "SELECT CDEPART, CARRIVA, FECR, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                        + "FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                        + "' AND CUPON = '" + i + "' ";

                                                stmt = cnx.prepareStatement(strSQLUSO);
                                                stmt.execute();
                                                rst2 = stmt.getResultSet();
                                                //rst2 = stmt.executeQuery(strSQLUSO);

                                                if (rst2.next()) {
                                                    encontroUso = true;
                                                    reg63.ORAC = rst2.getString("CDEPART").trim();
                                                    reg63.DSTC = rst2.getString("CARRIVA").trim();
                                                    reg63.CARR = rst2.getString("CARR").trim();
                                                    reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                                    reg63.DAIS = rst2.getString("FECR").trim();
                                                    reg63.RBKD = rst2.getString("CLAS").trim();
                                                    reg63.FBTD = rst2.getString("FBASE").trim();
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

                                            //EMD
                                            if (!encontroUso) {
                                                strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                        + "FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                        + "' AND CUPON = '" + i + "' ";

                                                stmt = cnx.prepareStatement(strSQLUSO);
                                                stmt.execute();
                                                rst2 = stmt.getResultSet();
                                                //rst2 = stmt.executeQuery(strSQLUSO);
                                                if (rst2.next()) {
                                                    encontroUso = true;
                                                    reg63.ORAC = rst2.getString("CDEPART").trim();
                                                    reg63.DSTC = rst2.getString("CARRIVA").trim();
                                                    reg63.CARR = rst2.getString("CARR").trim();
                                                    reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                                    reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                                    reg63.RBKD = rst2.getString("CLAS").trim();
                                                    reg63.FBTD = rst2.getString("FBASE").trim();
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
                                            }

                                            //BILLED
                                            if (!encontroUso) {
                                                strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                                        + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                                        + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                        + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                        + "' AND A020CUPON = '" + (i + 1) + "' ";

                                                stmt = cnx.prepareStatement(strSQLUSO);
                                                stmt.execute();
                                                rst2 = stmt.getResultSet();
                                                //rst2 = stmt.executeQuery(strSQLUSO);
                                                if (rst2.next()) {
                                                    encontroUso = true;
                                                    reg63.strUso = "B";
                                                    reg63.strDesUso = "Billed";
                                                    reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                                    reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                                }
                                                try {
                                                    rst2.close();
                                                } catch (SQLException e) {
                                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                                }
                                                rst2 = null;
                                            }
                                            //</editor-fold>
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
                                            lstReg63.add(reg63);
                                        } else {
                                            reg63 = new BSPF63();
                                            lstReg63.add(reg63);
                                        }
                                    }
                                    if (stmt != null) {
                                        stmt.close();
                                    }
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    }
                } finally {
                    session.getCNXIBMDB2().closeSystem();
                }
            } else {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.strError = rst.getString("BSP").substring(45, 46);
                    if (beanFacsimil.strError.equals("0") || beanFacsimil.strError.trim().equals("")) {
                        //RECORD 24 - Ticket Document Identification
                        beanFacsimil.DAIS = "20" + rst.getString("BSP").substring(281, 287);
                        beanFacsimil.TODC = rst.getString("BSP").substring(364, 370);
                        beanFacsimil.TOUR = rst.getString("BSP").substring(345, 360);
                        beanFacsimil.PNRR = rst.getString("BSP").substring(382, 395);
                        beanFacsimil.TDNR = rst.getString("BSP").substring(293, 306);
                        beanFacsimil.CDGT = rst.getString("BSP").substring(308, 309);
                        beanFacsimil.TRNC = rst.getString("BSP").substring(360, 364);
                        beanFacsimil.AGTN = rst.getString("BSP").substring(13886, 13894);
                        //RECORD 46 - Qualifying Issue Information for Sales Transactions Record
                        int x46 = 136;
                        for (int i = 0; i < 3; i++) {
                            if (rst.getString("BSP").substring(3444 + (i * x46), 3447 + (i * x46)).trim().length() > 0) {
                                String reg46Restrict = rst.getString("BSP").substring(3517 + (i * x46), 3575 + (i * x46));
                                String reg46OrigIssue = rst.getString("BSP").substring(3485 + (i * x46), 3517 + (i * x46));
                                lstReg46Restrict.add(reg46Restrict);
                                lstReg46OrigIssue.add(reg46OrigIssue);
                            }
                        }
                        //RECORD 63 - Itinerary Data Segment
                        //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                        int x63 = 136;
                        for (int i = 0; i < 4; i++) {
                            if ((rst.getString("BSP").substring(3852 + (i * x63), 3855 + (i * x63)).trim().length() > 0) || (rst.getString("BSP").substring(3912 + (i * x63), 3915 + (i * x63)).trim().length() > 0)) {
                                reg63 = new BSPF63();
                                reg63.CDGT = (i + 1);
                                reg63.STPO = rst.getString("BSP").substring(3894 + (i * x63), 3895 + (i * x63));
                                reg63.ORAC = rst.getString("BSP").substring(3912 + (i * x63), 3915 + (i * x63));
                                reg63.DSTC = rst.getString("BSP").substring(3917 + (i * x63), 3920 + (i * x63));
                                reg63.CARR = rst.getString("BSP").substring(3922 + (i * x63), 3926 + (i * x63));
                                reg63.FTNR = rst.getString("BSP").substring(3927 + (i * x63), 3932 + (i * x63));
                                reg63.DAIS = rst.getString("BSP").substring(3865 + (i * x63), 3871 + (i * x63));
                                reg63.RBKD = rst.getString("BSP").substring(3932 + (i * x63), 3934 + (i * x63));
                                reg63.FTDA = rst.getString("BSP").substring(3934 + (i * x63), 3939 + (i * x63));
                                reg63.FTDT = rst.getString("BSP").substring(3940 + (i * x63), 3945 + (i * x63));
                                reg63.FBST = rst.getString("BSP").substring(3948 + (i * x63), 3950 + (i * x63));
                                reg63.FBTD = rst.getString("BSP").substring(3954 + (i * x63), 3969 + (i * x63));
                                reg63.NBDA = rst.getString("BSP").substring(3895 + (i * x63), 3900 + (i * x63));
                                reg63.NADA = rst.getString("BSP").substring(3900 + (i * x63), 3905 + (i * x63));
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
                                strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
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

                                //DISCHARGE
                                if (!encontroUso) {
                                    strSQLUSO = "SELECT FECR, VCPN FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND CUPON = '" + (i + 1) + "' ";

                                    stmt = cnx.prepareStatement(strSQLUSO);
                                    stmt.execute();
                                    rst2 = stmt.getResultSet();
                                    //rst2 = stmt.executeQuery(strSQLUSO);
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

                                //EMD
                                if (!encontroUso) {
                                    strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND CUPON = '" + (i + 1) + "' ";

                                    stmt = cnx.prepareStatement(strSQLUSO);
                                    stmt.execute();
                                    rst2 = stmt.getResultSet();
                                    //rst2 = stmt.executeQuery(strSQLUSO);
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
                                }

                                //BILLED
                                if (!encontroUso) {
                                    strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                            + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND A020CUPON = '" + (i + 1) + "' ";

                                    stmt = cnx.prepareStatement(strSQLUSO);
                                    stmt.execute();
                                    rst2 = stmt.getResultSet();
                                    //rst2 = stmt.executeQuery(strSQLUSO);
                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.strUso = "B";
                                        reg63.strDesUso = "Billed";
                                        reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                        reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                    }
                                    try {
                                        rst2.close();
                                    } catch (SQLException e) {
                                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                    }
                                    rst2 = null;
                                }

                                strSQLLEG = "SELECT FORMA FROM PRAXIS.A1897 "
                                        + " WHERE CCUST = '" + ccust.trim()
                                        + "' AND CIA   = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt2 = cnx.prepareStatement(strSQLLEG);
                                stmt2.execute();
                                rst3 = stmt2.getResultSet();
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
                            }
                        }
                        if (stmt != null) {
                            stmt.close();
                        }
                        //RECORD 64 - Document Amounts
                        if (rst.getString("BSP").substring(4396, 4399).trim().length() > 0) {
                            String equivalent_s;
                            String regTax;
                            String regTax2;
                            String regTax3;
                            beanFacsimil.CUTP1 = rst.getString("BSP").substring(4437, 4440);
                            beanFacsimil.FARE = rst.getString("BSP").substring(4440, 4448);
                            equivalent_s = rst.getString("BSP").substring(4452, 4460);
                            if (rst.getString("BSP").substring(4449, 4452).trim().length() > 0) {
                                //  beanFacsimil.EQFR = rst.getString("BSP").substring(4449, 4452) + equivalent_s;
                                beanFacsimil.EQFR = rst.getString("BSP").substring(4449, 4452);
                            } else {
                                //  beanFacsimil.EQFR = beanFacsimil.CUTP1 + equivalent_s;
                                beanFacsimil.EQFR = "";
                            }
                            regTax = rst.getString("BSP").substring(4460, 4471);
                            lstTaxes.add(regTax);
                            if (rst.getString("BSP").substring(4471, 4482).trim().length() > 0) {
                                regTax2 = rst.getString("BSP").substring(4471, 4482);
                                lstTaxes.add(regTax2);
                            }
                            if (rst.getString("BSP").substring(4482, 4493).trim().length() > 0) {
                                regTax3 = rst.getString("BSP").substring(4482, 4493);
                                lstTaxes.add(regTax3);
                            }
                            beanFacsimil.TOTL = rst.getString("BSP").substring(4493, 4504);
                        }
                        //RECORD 65 - Passenger Information
                        beanFacsimil.PXNM = rst.getString("BSP").substring(4573, 4622);
                        //RECORD 81 - Fare Calculation
                        int x81 = 136;
                        for (int i = 0; i < 4; i++) {
                            if (rst.getString("BSP").substring(11674 + (i * x81), 11677 + (i * x81)).trim().length() > 0) {
                                String FC = rst.getString("BSP").substring(11718 + (i * x81), 11805 + (i * x81));
                                lstFC.add(FC);
                            }
                        }
                        //Verificando Cantidad de Conjunciones
                        if (Integer.parseInt(rst.getString("BSP").substring(13894, 13895)) == 0) {
                            //RECORD 84 - Form of Payment
                            int x84 = 142;
                            for (int i = 0; i < 6; i++) {
                                if (rst.getString("BSP").substring(13034 + (i * x84), 13037 + (i * x84)).trim().length() > 0) {
                                    //String strFPTP = rst.getString("BSP").substring(13059, 13061).trim();
                                    String strFPTP = rst.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim();
                                    if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                        beanFacsimil.strIssExc += " / " + rst.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84));
                                    }
                                    if (Long.parseLong(rst.getString("BSP").substring(13069 + (i * x84), 13080 + (i * x84))) > 0) {
                                        String monto = Long.parseLong(rst.getString("BSP").substring(13069 + (i * x84), 13080 + (i * x84))) + "." + rst.getString("BSP").substring(13080 + (i * x84), 13082 + (i * x84));
                                        if (rst.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim().equals("CC") || rst.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim().equals("TC")) {
                                            if (rst.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84)).trim() + "  Approval Code:" + rst.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84)).trim());
                                            }
                                        } else {
                                            if (rst.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto);
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            //cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                            cs2 = cnx.prepareCall(strSQL);
                            cs2.registerOutParameter(2, Types.CHAR);
                            cs2.registerOutParameter(3, Types.CHAR);
                            long newTDNR = Long.parseLong(filter.TDNR.substring(0, 13).trim()) + Integer.parseInt(rst.getString("BSP").substring(13894, 13895));
                            String newTDNR_s = newTDNR + "  " + rst.getString("BSP").substring(15, 31) + filter.TDNR.substring(0, 13).trim();
                            cs2.setString(1, newTDNR_s);
                            cs2.execute();

                            rst2 = cs2.getResultSet();
                            while (rst2.next()) {
                                //RECORD 84 - Form of Payment
                                int x84 = 142;
                                for (int i = 0; i < 6; i++) {
                                    if (rst2.getString("BSP").substring(13034 + (i * x84), 13037 + (i * x84)).trim().length() > 0) {
                                        // String strFPTP = rst2.getString("BSP").substring(13059, 13061).trim();
                                        String strFPTP = rst.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim();
                                        if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                            beanFacsimil.strIssExc += " / " + rst2.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84));
                                        }
                                        if (Long.parseLong(rst2.getString("BSP").substring(13069 + (i * x84), 13080 + (i * x84))) > 0) {
                                            String monto = Long.parseLong(rst2.getString("BSP").substring(13069 + (i * x84), 13080 + (i * x84))) + "." + rst2.getString("BSP").substring(13080 + (i * x84), 13082 + (i * x84));
                                            if (rst2.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim().equals("CC") || rst2.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim().equals("TC")) {
                                                if (rst2.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim().length() > 0) {
                                                    lstFOP.add("Type:" + rst2.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84)).trim() + "  Approval Code:" + rst2.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim());
                                                } else {
                                                    lstFOP.add("Type:" + rst2.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84)).trim());
                                                }
                                            } else {
                                                if (rst2.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim().length() > 0) {
                                                    lstFOP.add("Type:" + rst2.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst2.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim());
                                                } else {
                                                    lstFOP.add("Type:" + rst2.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            try {
                                cs2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                        }
                        beanFacsimil.strFinCjn = rst.getString("BSP").substring(44, 45);
                        beanFacsimil.strEsCjn = rst.getString("BSP").substring(30, 31);
                        strConj = rst.getString("BSP").substring(31, 44);
                        for (int i = 0; i < Integer.parseInt(rst.getString("BSP").substring(13894, 13895)); i++) {
                            long cjn = Long.parseLong(rst.getString("BSP").substring(31, 44)) + (i + 1);
                            String cjn_s = cjn + "";
                            strConj = strConj + " - " + cjn_s.substring(9);
                        }
                    } else {
                        beanFacsimil.strMsj = rst.getString("BSP").substring(52, 132);
                        //NOT-FOUND - A pedido de ENS 20140905, si no se encuentra el Ticket de todas maneras se busca
                        //el uso del cupón consultado (VENTA NO REPORTADA)
                        if (beanFacsimil.strMsj.contains("NOT-FOUND")) {
                            try {
                                //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                                for (int i = 1; i <= Integer.parseInt(filter.CPUI); i++) {
                                    if (i == Integer.parseInt(filter.CPUI)) {
                                        reg63 = new BSPF63();

                                        // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                                        //OBTENIENDO DATOS DEL USO =================================
                                        boolean encontroUso = false;
                                        // VOLADO 
                                        strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                + "FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND CUPON = '" + i + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);
                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.ORAC = rst2.getString("CDEPART").trim();
                                            reg63.DSTC = rst2.getString("CARRIVA").trim();
                                            reg63.CARR = rst2.getString("CARR").trim();
                                            reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                            reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                            reg63.RBKD = rst2.getString("CLAS").trim();
                                            reg63.FBTD = rst2.getString("FBASE").trim();
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

                                        //DISCHARGE
                                        if (!encontroUso) {
                                            strSQLUSO = "SELECT CDEPART, CARRIVA, FECR, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                    + "FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                                    + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                    + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                    + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                    + "' AND CUPON = '" + i + "' ";

                                            stmt = cnx.prepareStatement(strSQLUSO);
                                            stmt.execute();
                                            rst2 = stmt.getResultSet();
                                            //rst2 = stmt.executeQuery(strSQLUSO);

                                            if (rst2.next()) {
                                                encontroUso = true;
                                                reg63.ORAC = rst2.getString("CDEPART").trim();
                                                reg63.DSTC = rst2.getString("CARRIVA").trim();
                                                reg63.CARR = rst2.getString("CARR").trim();
                                                reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                                reg63.DAIS = rst2.getString("FECR").trim();
                                                reg63.RBKD = rst2.getString("CLAS").trim();
                                                reg63.FBTD = rst2.getString("FBASE").trim();
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

                                        //EMD
                                        if (!encontroUso) {
                                            strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                    + "FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                                    + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                    + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                    + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                    + "' AND CUPON = '" + i + "' ";

                                            stmt = cnx.prepareStatement(strSQLUSO);
                                            stmt.execute();
                                            rst2 = stmt.getResultSet();
                                            //rst2 = stmt.executeQuery(strSQLUSO);
                                            if (rst2.next()) {
                                                encontroUso = true;
                                                reg63.ORAC = rst2.getString("CDEPART").trim();
                                                reg63.DSTC = rst2.getString("CARRIVA").trim();
                                                reg63.CARR = rst2.getString("CARR").trim();
                                                reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                                reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                                reg63.RBKD = rst2.getString("CLAS").trim();
                                                reg63.FBTD = rst2.getString("FBASE").trim();
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
                                        }

                                        //BILLED
                                        if (!encontroUso) {
                                            strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                                    + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                                    + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                    + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                    + "' AND A020CUPON = '" + (i + 1) + "' ";

                                            stmt = cnx.prepareStatement(strSQLUSO);
                                            stmt.execute();
                                            rst2 = stmt.getResultSet();
                                            //rst2 = stmt.executeQuery(strSQLUSO);
                                            if (rst2.next()) {
                                                encontroUso = true;
                                                reg63.strUso = "B";
                                                reg63.strDesUso = "Billed";
                                                reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                                reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                            }
                                            try {
                                                rst2.close();
                                            } catch (SQLException e) {
                                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                            }
                                            rst2 = null;
                                        }

                                        //</editor-fold>
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
                                        lstReg63.add(reg63);
                                    } else {
                                        reg63 = new BSPF63();
                                        lstReg63.add(reg63);
                                    }
                                }
                                if (stmt != null) {
                                    stmt.close();
                                }
                            } catch (Exception e) {
                                e.printStackTrace();
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
            beanFacsimil.lstReg46Restrict = lstReg46Restrict;
            beanFacsimil.lstReg46OrigIssue = lstReg46OrigIssue;
            beanFacsimil.lstReg63 = lstReg63;
            beanFacsimil.lstFC = lstFC;
            beanFacsimil.lstFOP = lstFOP;
            beanFacsimil.lstTaxes = lstTaxes;
            beanFacsimil.strConjuncion = strConj;
            if (stmt != null) {
                stmt.close();
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
            if (rst3 != null) {
                try {
                    rst3.close();
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
            if (cs2 != null) {
                try {
                    cs2.close();
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

    public FACSIMILFilter loadARCFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {

        CallableStatement cs = null;
        CallableStatement cs2 = null;
        ResultSet rst = null, rst2 = null;
        PreparedStatement stmt = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<>();
        List<String> lstTaxes = new ArrayList<>();
        List<String> lstReg46Restrict = new ArrayList<>();
        List<String> lstReg46OrigIssue = new ArrayList<>();
        List<String> lstFC = new ArrayList<>();
        List<String> lstFOP = new ArrayList<>();
        BSPF63 reg63;
        String strConj = "", strCompanion = "";
        String strSQLUSO = "";

        Connection cnx = null;
        try {
            String strSQL = "{CALL " + session.getMainLibrary() + ".PXARCFACSIMILNEW(?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, filter.TDNR.trim());
            cs.execute();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.FUENTE = "ARC";
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();
            beanFacsimil.nombre = filter.nombre.trim();

            rst = cs.getResultSet();
            while (rst.next()) {
                beanFacsimil.strError = rst.getString("ARC").substring(45, 46);
                if (beanFacsimil.strError.equals("0") || beanFacsimil.strError.trim().equals("")) {
                    //RECORD 24 - Ticket Document Identification
                    beanFacsimil.DAIS = "20" + rst.getString("ARC").substring(281, 287);
                    beanFacsimil.TODC = rst.getString("ARC").substring(377, 383);
                    beanFacsimil.TOUR = rst.getString("ARC").substring(346, 360);
                    beanFacsimil.PNRR = rst.getString("ARC").substring(390, 403);
                    beanFacsimil.TDNR = rst.getString("ARC").substring(293, 306);
                    beanFacsimil.CDGT = rst.getString("ARC").substring(308, 309);
                    beanFacsimil.TRNC = rst.getString("ARC").substring(361, 363);
                    beanFacsimil.AGTN = rst.getString("ARC").substring(9514, 9522);
                    //RECORD 30 - Fare/Tax Amounts
                    int x30 = 146;
                    for (int i = 0; i < 10; i++) {
                        if (rst.getString("ARC").substring(406 + (i * x30), 409 + (i * x30)).trim().length() > 0) {
                            //beanFacsimil.CUTP1 = rst.getString("ARC").substring(460, 463);
                            if (Long.parseLong(rst.getString("ARC").substring(528, 539)) != 0 && rst.getString("ARC").substring(528, 539).length() != 0) {//INFR
                                beanFacsimil.CUTP1 = rst.getString("ARC").substring(544, 547);
                                beanFacsimil.FARE = rst.getString("ARC").substring(528, 539) + "." + rst.getString("ARC").substring(539, 541);
                                beanFacsimil.EQFR = rst.getString("ARC").substring(460, 463) + rst.getString("ARC").substring(447, 458) + "." + rst.getString("ARC").substring(458, 460);
                            } else {
                                beanFacsimil.CUTP1 = rst.getString("ARC").substring(460, 463);
                                beanFacsimil.FARE = rst.getString("ARC").substring(447, 458) + "." + rst.getString("ARC").substring(458, 460);
                                beanFacsimil.EQFR = rst.getString("ARC").substring(544, 547) + rst.getString("ARC").substring(528, 539) + "." + rst.getString("ARC").substring(539, 541);
                            }
                            //beanFacsimil.FARE = rst.getString("ARC").substring(447, 458) + "." + rst.getString("ARC").substring(458, 460);
                            //beanFacsimil.EQFR = rst.getString("ARC").substring(544, 547) + rst.getString("ARC").substring(527, 538) + "." + rst.getString("ARC").substring(538, 540);
                            beanFacsimil.TOTL = rst.getString("ARC").substring(514, 525) + "." + rst.getString("ARC").substring(525, 527);
                            String regTax = rst.getString("ARC").substring(472 + (i * x30), 474 + (i * x30)) + " " + rst.getString("ARC").substring(474 + (i * x30), 480 + (i * x30)) + " " + Long.parseLong(rst.getString("ARC").substring(480 + (i * x30), 491 + (i * x30))) + "." + rst.getString("ARC").substring(491 + (i * x30), 493 + (i * x30));
                            lstTaxes.add(regTax);
                            if ((rst.getString("ARC").substring(493 + (i * x30), 495 + (i * x30))).trim().length() > 0) {
                                String regTax2 = rst.getString("ARC").substring(493 + (i * x30), 495 + (i * x30)) + " " + rst.getString("ARC").substring(495 + (i * x30), 501 + (i * x30)) + " " + Long.parseLong(rst.getString("ARC").substring(501 + (i * x30), 512 + (i * x30))) + "." + rst.getString("ARC").substring(512 + (i * x30), 514 + (i * x30));
                                lstTaxes.add(regTax2);
                            }
                        }
                    }
                    //RECORD 46 - Endorsements/Restrictions Information
                    int x46 = 136;
                    for (int i = 0; i < 3; i++) {
                        if (rst.getString("ARC").substring(4022 + (i * x46), 4025 + (i * x46)).trim().length() > 0) {
                            String reg46Restrict = rst.getString("ARC").substring(4063 + (i * x46), 4112 + (i * x46));
                            String reg46OrigIssue = rst.getString("ARC").substring(4112 + (i * x46), 4144 + (i * x46));
                            lstReg46Restrict.add(reg46Restrict);
                            lstReg46OrigIssue.add(reg46OrigIssue);
                        }
                    }
                    //RECORD 48 - Passenger Information
                    beanFacsimil.PXNM = rst.getString("ARC").substring(4474, 4523);
                    //RECORD 63 - Itinerary Data Segment
                    //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                    int x63 = 136;
                    for (int i = 0; i < 4; i++) {
                        if (rst.getString("ARC").substring(4566 + (i * x63), 4569 + (i * x63)).trim().length() > 0 || rst.getString("ARC").substring(4626 + (i * x63), 4629 + (i * x63)).trim().length() > 0) {
                            reg63 = new BSPF63();
                            reg63.CDGT = (i + 1);
                            reg63.STPO = rst.getString("ARC").substring(4608 + (i * x63), 4609 + (i * x63));
                            reg63.ORAC = rst.getString("ARC").substring(4626 + (i * x63), 4629 + (i * x63));
                            reg63.DSTC = rst.getString("ARC").substring(4631 + (i * x63), 4634 + (i * x63));
                            reg63.CARR = rst.getString("ARC").substring(4636 + (i * x63), 4638 + (i * x63));
                            reg63.FTNR = rst.getString("ARC").substring(4641 + (i * x63), 4646 + (i * x63));
                            reg63.DAIS = rst.getString("ARC").substring(4579 + (i * x63), 4585 + (i * x63));
                            reg63.RBKD = rst.getString("ARC").substring(4646 + (i * x63), 4648 + (i * x63));
                            reg63.FTDA = rst.getString("ARC").substring(4648 + (i * x63), 4654 + (i * x63));
                            reg63.FTDT = rst.getString("ARC").substring(4654 + (i * x63), 4659 + (i * x63));
                            reg63.FBST = rst.getString("ARC").substring(4662 + (i * x63), 4664 + (i * x63));
                            reg63.FBTD = rst.getString("ARC").substring(4668 + (i * x63), 4683 + (i * x63));
                            reg63.NBDA = rst.getString("ARC").substring(4609 + (i * x63), 4614 + (i * x63));
                            reg63.NADA = rst.getString("ARC").substring(4614 + (i * x63), 4619 + (i * x63));
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
                            strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                    + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                    + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                    + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                    + "' AND CUPON = '" + (i + 1) + "' ";

                            stmt = cnx.prepareStatement(strSQLUSO);
                            stmt.execute();
                            rst2 = stmt.getResultSet();
                            //rst2 = stmt.executeQuery(strSQLUSO);
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

                            //DISCHARGE
                            if (!encontroUso) {
                                strSQLUSO = "SELECT FECR, VCPN FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);

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

                            //EMD
                            if (!encontroUso) {
                                strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
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
                            }

                            //BILLED
                            if (!encontroUso) {
                                strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                        + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND A020CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "B";
                                    reg63.strDesUso = "Billed";
                                    reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                    reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;
                            }

                            //</editor-fold>
                            lstReg63.add(reg63);
                        }
                    }
                    if (stmt != null) {
                        stmt.close();
                    }
                    //RECORD 81 - Fare Calculation
                    int x81 = 136;
                    for (int i = 0; i < 4; i++) {
                        if (rst.getString("ARC").substring(8198 + (i * x81), 8285 + (i * x81)).trim().length() > 0) {
                            String FC = rst.getString("ARC").substring(8198 + (i * x81), 8285 + (i * x81));
                            lstFC.add(FC);
                        }
                    }
                    beanFacsimil.strEsCjn = rst.getString("ARC").substring(30, 31);
                    //Verificando Cantidad de Conjunciones
                    if (Integer.parseInt(rst.getString("ARC").substring(9652, 9653)) == 0) {
                        if (beanFacsimil.strEsCjn.equals("C") && rst.getString("ARC").substring(9522, 9652).length() > 0) {
                            if (rst.getString("ARC").substring(9522, 9535).trim().equals(filter.TDNR.trim().substring(0, 13))) {
                                //RECORD 84 - Form of Payment
                                int x84 = 136;
                                for (int i = 0; i < 6; i++) {
                                    if (rst.getString("ARC").substring(8698 + (i * x84), 8701 + (i * x84)).trim().length() > 0) {
                                        // String strFPTP = rst.getString("ARC").substring(8723, 8725).trim();
                                        String strFPTP = rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim();
                                        if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                            beanFacsimil.strIssExc += " / " + rst.getString("ARC").substring(8746 + (i * x84), 8765 + (i * x84));
                                        }
                                        if (Long.parseLong(rst.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) > 0) {
                                            String monto = Long.parseLong(rst.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) + "." + rst.getString("ARC").substring(8742 + (i * x84), 8744 + (i * x84));
                                            if (rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("CC") || rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("TC")) {
                                                if (rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                    lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim() + "  Approval Code:" + rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                                } else {
                                                    lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim());
                                                }
                                            } else {
                                                if (rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                    lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                                } else {
                                                    lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            //RECORD 84 - Form of Payment
                            int x84 = 136;
                            for (int i = 0; i < 6; i++) {
                                if (rst.getString("ARC").substring(8698 + (i * x84), 8701 + (i * x84)).trim().length() > 0) {
                                    //String strFPTP = rst.getString("ARC").substring(8723, 8725).trim();
                                    String strFPTP = rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim();
                                    if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                        beanFacsimil.strIssExc += " / " + rst.getString("ARC").substring(8746 + (i * x84), 8765 + (i * x84));
                                    }
                                    if (Long.parseLong(rst.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) > 0) {
                                        String monto = Long.parseLong(rst.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) + "." + rst.getString("ARC").substring(8742 + (i * x84), 8744 + (i * x84));
                                        if (rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("CC") || rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("TC")) {
                                            if (rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim() + "  Approval Code:" + rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim());
                                            }
                                        } else {
                                            if (rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                        cs2 = cnx.prepareCall(strSQL);
                        long newTDNR = Long.parseLong(filter.TDNR.substring(0, 13).trim()) + Integer.parseInt(rst.getString("ARC").substring(9652, 9653));
                        String newTDNR_s = newTDNR + "  " + rst.getString("ARC").substring(15, 31) + filter.TDNR.substring(0, 13).trim();
                        cs2.setString(1, newTDNR_s);
                        cs2.execute();

                        rst2 = cs2.getResultSet();
                        while (rst2.next()) {
                            //RECORD 84 - Form of Payment
                            int x84 = 136;
                            for (int i = 0; i < 6; i++) {
                                if (rst2.getString("ARC").substring(8698 + (i * x84), 8701 + (i * x84)).trim().length() > 0) {
                                    //String strFPTP = rst2.getString("ARC").substring(8723, 8725).trim();
                                    String strFPTP = rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim();
                                    if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                        beanFacsimil.strIssExc += " / " + rst2.getString("ARC").substring(8746 + (i * x84), 8765 + (i * x84));
                                    }
                                    if (Long.parseLong(rst2.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) > 0) {
                                        String monto = Long.parseLong(rst2.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) + "." + rst2.getString("ARC").substring(8742 + (i * x84), 8744 + (i * x84));
                                        if (rst2.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("CC") || rst2.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("TC")) {
                                            if (rst2.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst2.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim() + "  Approval Code:" + rst2.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst2.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim());
                                            }
                                        } else {
                                            if (rst2.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst2.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst2.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst2.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        try {
                            cs2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                    }
                    beanFacsimil.strFinCjn = rst.getString("ARC").substring(44, 45);
                    if (beanFacsimil.strEsCjn.equals("C")) {
                        strConj = rst.getString("ARC").substring(9522, 9535);
                        int xCT = 13;
                        int cant = rst.getString("ARC").substring(9522, 9652).trim().length() / 13;
                        strCompanion = rst.getString("ARC").substring(9522, 9652).trim();
                        for (int i = 1; i < cant; i++) {
                            strConj = strConj + " - " + rst.getString("ARC").substring(9522 + (i * xCT), 9535 + (i * xCT));
                        }
                    } else {
                        strConj = rst.getString("ARC").substring(31, 44);
                        for (int i = 0; i < Integer.parseInt(rst.getString("ARC").substring(9652, 9653)); i++) {
                            long cjn = Long.parseLong(rst.getString("ARC").substring(31, 44)) + (i + 1);
                            String cjn_s = cjn + "";
                            strConj = strConj + " - " + cjn_s.substring(9);
                        }
                    }
                } else {
                    beanFacsimil.strMsj = rst.getString("ARC").substring(52, 132);
                    //NOT-FOUND - A pedido de ENS 20140905, si no se encuentra el Ticket de todas maneras se busca
                    //el uso del cupón consultado (VENTA NO REPORTADA)
                    if (beanFacsimil.strMsj.contains("NOT-FOUND")) {
                        try {
                            //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                            for (int i = 1; i <= Integer.parseInt(filter.CPUI); i++) {
                                if (i == Integer.parseInt(filter.CPUI)) {
                                    reg63 = new BSPF63();

                                    // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                                    //OBTENIENDO DATOS DEL USO =================================
                                    boolean encontroUso = false;
                                    // VOLADO 
                                    strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                            + "FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND CUPON = '" + i + "' ";

                                    stmt = cnx.prepareStatement(strSQLUSO);
                                    stmt.execute();
                                    rst2 = stmt.getResultSet();
                                    //rst2 = stmt.executeQuery(strSQLUSO);

                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.ORAC = rst2.getString("CDEPART").trim();
                                        reg63.DSTC = rst2.getString("CARRIVA").trim();
                                        reg63.CARR = rst2.getString("CARR").trim();
                                        reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                        reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                        reg63.RBKD = rst2.getString("CLAS").trim();
                                        reg63.FBTD = rst2.getString("FBASE").trim();
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

                                    //DISCHARGE
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT CDEPART, CARRIVA, FECR, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                + "FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND CUPON = '" + i + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);

                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.ORAC = rst2.getString("CDEPART").trim();
                                            reg63.DSTC = rst2.getString("CARRIVA").trim();
                                            reg63.CARR = rst2.getString("CARR").trim();
                                            reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                            reg63.DAIS = rst2.getString("FECR").trim();
                                            reg63.RBKD = rst2.getString("CLAS").trim();
                                            reg63.FBTD = rst2.getString("FBASE").trim();
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

                                    //EMD
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                + "FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND CUPON = '" + i + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);

                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.ORAC = rst2.getString("CDEPART").trim();
                                            reg63.DSTC = rst2.getString("CARRIVA").trim();
                                            reg63.CARR = rst2.getString("CARR").trim();
                                            reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                            reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                            reg63.RBKD = rst2.getString("CLAS").trim();
                                            reg63.FBTD = rst2.getString("FBASE").trim();
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
                                    }

                                    //BILLED
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                                + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND A020CUPON = '" + (i + 1) + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);
                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.strUso = "B";
                                            reg63.strDesUso = "Billed";
                                            reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                            reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                        }
                                        try {
                                            rst2.close();
                                        } catch (SQLException e) {
                                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                        }
                                        rst2 = null;
                                    }

                                    //</editor-fold>
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
                                    lstReg63.add(reg63);
                                } else {
                                    reg63 = new BSPF63();
                                    lstReg63.add(reg63);
                                }
                            }
                            if (stmt != null) {
                                stmt.close();
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
            beanFacsimil.lstReg46Restrict = lstReg46Restrict;
            beanFacsimil.lstReg46OrigIssue = lstReg46OrigIssue;
            beanFacsimil.lstReg63 = lstReg63;
            beanFacsimil.lstFC = lstFC;
            beanFacsimil.lstFOP = lstFOP;
            beanFacsimil.lstTaxes = lstTaxes;
            beanFacsimil.strConjuncion = strConj;
            beanFacsimil.strCompanion = strCompanion;
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (stmt != null) {
                stmt.close();
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
            if (cs2 != null) {
                try {
                    cs2.close();
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

    public List<FACSIMILFilter> searchA713(String TDNR, String Seq) throws SQLException, Exception {

        List<FACSIMILFilter> lstRtn = new ArrayList<>(0);
        FACSIMILFilter beanFacsimil;
        A720 beanCpn;
        List<A720> lstRegA720 = new ArrayList<>();
        HashMap hmValueA720 = new HashMap();
        TDNR = Functions.fillZeros(13, TDNR);

        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PXA713(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, "139");
            cstmt01.setString(2, TDNR.substring(0, 3));
            cstmt01.setString(3, TDNR.substring(3, 7));
            cstmt01.setString(4, TDNR.substring(7));
            cstmt01.setString(5, Seq);
            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {
                beanFacsimil = new FACSIMILFilter();
                beanFacsimil.A720REGIST = rst.getString("A713REGIST").trim();
                beanFacsimil.A720FREGIS = rst.getString("A713FREGIS").trim();
                beanFacsimil.A720REVISA = rst.getString("A713REVISA").trim();
                beanFacsimil.A720FREVIS = rst.getString("A713FREVIS").trim();
                beanFacsimil.A720GRUPO = rst.getString("A713GRUPO").trim();
                beanFacsimil.A720ORIG = rst.getString("A713ORIG").trim();
                beanFacsimil.A720FLAG = rst.getString("A713FLAG").trim();
                beanFacsimil.A720CTKTC = rst.getInt("A713CTKTC");
                beanFacsimil.A720BASE = rst.getString("A713BASE").trim();
                beanFacsimil.A720PRO = rst.getString("A713PRO").trim();
                beanFacsimil.A720MONREG = rst.getString("A713MONREG").trim();
                beanFacsimil.A720MONSYS = rst.getString("A713MONSYS").trim();
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
                beanFacsimil.A720QSOVER = rst.getInt("A713QSOVER");
                beanFacsimil.A720MONEDA = rst.getString("A713MONEDA").trim();
                beanFacsimil.A720MDAPAG = rst.getString("A713MDAPAG").trim();

                beanFacsimil.A720STAT = rst.getString("A713STAT").trim();
                beanFacsimil.A1345FEXCH = rst.getString("A713TRNCU").trim();
                beanFacsimil.A1345NRPRT = "";//rst.getString("A1345NRPRT").trim();
                beanFacsimil.A1345CURR = rst.getString("A713MDAFA").trim();
                beanFacsimil.A1345FARE = rst.getDouble("A713FARE");
                beanFacsimil.A720MDAFA = rst.getString("A713MDAFA").trim();
                beanFacsimil.A720FARE = rst.getDouble("A713FARE");
                beanFacsimil.A720MDARV = rst.getString("A713MDARV").trim();
                beanFacsimil.A720FARERV = rst.getDouble("A713FARERV");

                beanFacsimil.A1345PGCUR = "";//rst.getString("A720MDAAD").trim();
                beanFacsimil.A1345PAGO = 0.00;//rst.getDouble("A720ADC");

                beanCpn = null;
                for (int i = 1; i < 5; i++) {
                    if (!rst.getString("A713RUTA" + i).trim().equals("")) {
                        beanCpn = new A720();//beanCpn = new A720Filter();
                        beanCpn.TKT = rst.getString("A713CIA").trim() + rst.getString("A713FORMA").trim() + rst.getString("A713SERIE").trim();
                        beanCpn.CPNPR = i + "";
                        beanCpn.A720RUTAO = rst.getString("A713RUTA" + (i - 1)).trim();
                        beanCpn.A720RUTAD = rst.getString("A713RUTA" + i).trim();
                        beanCpn.A720CONEX = rst.getString("A713CONEX" + i).trim();
                        beanCpn.A720CARRA = rst.getString("A713CARRA" + i).trim();
                        beanCpn.A720NVLO = rst.getString("A713NVLO" + i).trim();
                        beanCpn.A720FVLO = rst.getString("A713FVLO" + i).trim();
                        beanCpn.A720BOOKI = rst.getString("A713BOOKI" + i).trim();
                        beanCpn.A720CLASE = rst.getString("A713CLASE" + i).trim();
                        beanCpn.A720FBUSO = rst.getString("A713FBUSO" + i).trim();
                        if (beanCpn.A720FBUSO.equals("")) {
                            beanCpn.A720FBUSO = rst.getString("A713FBORI" + i).trim();
                        }
                        beanCpn.A720TBASE = rst.getString("A713TBASE" + i).trim();
                        beanCpn.A720TDESC = rst.getString("A713TDESC" + i).trim();
                        beanCpn.A720PORDS = rst.getDouble("A713PORDS" + i);
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
                        beanCpn.A720Q = rst.getDouble("A713Q" + i);
                        beanCpn.A720QIN = rst.getDouble("A713Q" + i);
                        beanCpn.A720YQ = rst.getDouble("A713YQ" + i);
                        beanCpn.A720FACT = rst.getDouble("A713FACT" + i);
                        beanCpn.A720YANQ = rst.getDouble("A713YANQ" + i);
                        beanCpn.A720PPRO = rst.getDouble("A713PPRO" + i);
                        beanCpn.A720PROV = rst.getDouble("A713PROV" + i);
                        beanCpn.A720PRRCM = rst.getDouble("A713PRRCM" + i);
                        beanCpn.A720TCAMB = rst.getDouble("A713TCAMB");
                        beanCpn.A720LOHO = rst.getString("A713LOHO" + i).trim();
                        beanCpn.A720VIA = rst.getString("A713VIA" + i).trim();
                        beanCpn.A720STBAS = rst.getString("A713STBAS" + i).trim();
                        beanCpn.A720DIFER = rst.getDouble("A713DIFER" + i);
                        beanCpn.A720FDIFE = rst.getString("A713FDIFE" + i).trim();
                        beanCpn.A720TRFM = rst.getDouble("A713TRFM" + i);
                        beanCpn.A720MNTFM = rst.getString("A713MNTFM" + i).trim();
                        beanCpn.A720IV = rst.getDouble("A713IV" + i);
                        lstRegA720.add(beanCpn);
                        hmValueA720.put(rst.getString("A713CIA").trim() + rst.getString("A713FORMA").trim() + rst.getString("A713SERIE").trim() + i, rst.getDouble("A713VALOR" + i));
                    }
                }

                beanFacsimil.lstRegA713 = lstRegA720;
                beanFacsimil.A1526RATE = rst.getDouble("A713TCAMB");
                beanFacsimil.dblTarifa = 0.00;
                beanFacsimil.strMonTarifa = "";
                beanFacsimil.A720TKVOID = "";
                if (rst.getString("A713TDOC").trim().equals("VOID")) {
                    beanFacsimil.A720TKVOID = "V";
                }
                lstRtn.add(beanFacsimil);
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

    public List<FACSIMILFilter> searchA720(String TDNR, String VTR) throws SQLException, Exception {
        List<FACSIMILFilter> lstRtn = new ArrayList<>(0);
        FACSIMILFilter beanFacsimil;
        A720Filter beanCpn;
        List<A720Filter> lstRegA720 = new ArrayList<>();
        HashMap hmValueA720 = new HashMap();
        CallableStatement cstmt01 = null;
        ResultSet rst = null;
        String SQLCLL01 = "";
        if (VTR.equals("VTR")) {
            SQLCLL01 = "{CALL PXVTR(?,?,?,?)}";
        } else if (VTR.equals("OLD")) {
            SQLCLL01 = "{CALL PXOLD(?,?,?,?)}";
        } else {
            SQLCLL01 = "{CALL PXA720_1(?,?,?,?)}";
        }

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, "139");
            cstmt01.setString(2, TDNR.substring(0, 3));
            cstmt01.setString(3, TDNR.substring(3, 7));
            cstmt01.setString(4, TDNR.substring(7));
            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {
                beanFacsimil = new FACSIMILFilter();
                beanFacsimil.A720REGIST = rst.getString("A720REGIST").trim();
                beanFacsimil.A720FREGIS = rst.getString("A720FREGIS").trim();
                beanFacsimil.A720REVISA = rst.getString("A720REVISA").trim();
                beanFacsimil.A720FREVIS = rst.getString("A720FREVIS").trim();
                beanFacsimil.A720GRUPO = rst.getString("A720GRUPO").trim();
                beanFacsimil.A720ORIG = rst.getString("A720ORIG").trim();
                beanFacsimil.A720FLAG = rst.getString("A720FLAG").trim();
                beanFacsimil.A720CTKTC = rst.getInt("A720CTKTC");
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
                beanFacsimil.A720QSOVER = rst.getInt("A720QSOVER");
                beanFacsimil.A720MONEDA = rst.getString("A720MONEDA").trim();
                beanFacsimil.A720MDAPAG = rst.getString("A720MDAPAG").trim();
                beanFacsimil.A1530STPRO = "VTR";
                if (!VTR.equals("VTR") && !VTR.equals("OLD")) {
                    if (rst.getString("A1530STPRO").trim().equals("1")) {
                        beanFacsimil.A1530STPRO = "CLOSED";
                    } else {
                        beanFacsimil.A1530STPRO = "OPEN";
                    }
                    beanFacsimil.strOthers = "User of Update : " + rst.getString("A1530USRAC").trim()
                            + " / " + rst.getString("A1530FECAC").trim() + " / " + rst.getString("A1530HORAC").trim();
                }


                /*
                 if(rst.getString("A720STAT").trim().equals("0")){
                 beanFacsimil.A720STAT = "Without Prorate";
                 }else if(rst.getString("A720STAT").trim().equals("1")){
                 beanFacsimil.A720STAT = "Prorated";
                 }else if(rst.getString("A720STAT").trim().equals("2")){
                 beanFacsimil.A720STAT = "Prorate Error";
                 }else if(rst.getString("A720STAT").trim().equals("3")){
                 beanFacsimil.A720STAT = "Original Data Error";
                 }else{
                 beanFacsimil.A720STAT = rst.getString("A720STAT").trim();
                 }
                 */
                beanFacsimil.A720STAT = rst.getString("A720STAT").trim();
                if (VTR.equals("VTR") || VTR.equals("OLD")) {
                    beanFacsimil.A1345FEXCH = "";
                    beanFacsimil.A1345CURR = "";
                    beanFacsimil.A1345FARE = 0.00;
                    beanFacsimil.A1345PGCUR = "";
                    beanFacsimil.A1345PAGO = 0.00;
                    beanFacsimil.A720STAT = rst.getString("A720STAT").trim() + "-VTR";
                } else {
                    beanFacsimil.A1345FEXCH = rst.getString("A720TRNCU").trim();
                    beanFacsimil.A1345CURR = rst.getString("A720MDAFA").trim();
                    beanFacsimil.A1345FARE = rst.getDouble("A720FARE");
                    beanFacsimil.A1345PGCUR = rst.getString("A720MDAAD").trim();
                    beanFacsimil.A1345PAGO = rst.getDouble("A720ADC");
                }
                beanFacsimil.A1345NRPRT = "";//rst.getString("A1345NRPRT").trim();
                beanCpn = null;
                for (int i = 1; i < 5; i++) {
                    if (!rst.getString("A720RUTA" + i).trim().equals("")) {
                        beanCpn = new A720Filter();
                        beanCpn.A720RUTAO = rst.getString("A720RUTA" + (i - 1)).trim();
                        beanCpn.A720RUTAD = rst.getString("A720RUTA" + i).trim();
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
                        beanCpn.A720QIN = rst.getDouble("A720Q" + i);
                        beanCpn.A720YQ = rst.getDouble("A720YQ" + i);
                        beanCpn.A720FACT = rst.getDouble("A720FACT" + i);
                        beanCpn.A720PPRO = rst.getDouble("A720PPRO" + i);
                        beanCpn.A720PROV = rst.getDouble("A720PROV" + i);
                        beanCpn.A720PRRCM = rst.getDouble("A720PRRCM" + i);
                        beanCpn.A720PRSCM = rst.getDouble("A720PRSCM" + i);
                        beanCpn.A720INDPR = rst.getString("A720INDPR" + i);
                        //Temporal
                        beanCpn.A720LRRCM = rst.getDouble("A720PRRCM" + i);
                        beanCpn.A720LRSCM = rst.getDouble("A720PRSCM" + i);

                        beanCpn.A720LYQ = rst.getDouble("A720LYQ" + i);
                        beanCpn.A720LIV = rst.getDouble("A720LIV" + i);

                        lstRegA720.add(beanCpn);
                        hmValueA720.put(rst.getString("A720CIA").trim() + rst.getString("A720FORMA").trim() + rst.getString("A720SERIE").trim() + i, rst.getDouble("A720VALOR" + i));
                    }
                }

                beanFacsimil.lstRegA720 = lstRegA720;
                beanFacsimil.A1526RATE = rst.getDouble("A720TCAMB");
                beanFacsimil.A720TCAMB = rst.getDouble("A720TCAMB");
                if (VTR.equals("VTR") || VTR.equals("OLD")) {
                    beanFacsimil.A720TRNCU = "";
                    beanFacsimil.A720TKVOID = "";
                } else {
                    beanFacsimil.A720TRNCU = rst.getString("A720TRNCU");
                    beanFacsimil.A720TKVOID = rst.getString("A720TKVOID");
                }
                beanFacsimil.dblTarifa = 0.00;
                beanFacsimil.strMonTarifa = "";
                lstRtn.add(beanFacsimil);
            }
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

    public S0007A720Filter verifyTKT(String TDNR) throws SQLException, Exception {
        CallableStatement cstmt = null;
        S0007A720Filter filter = new S0007A720Filter();
        String SQLCLL01 = "{CALL PXVerifyTKT(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(5, Types.VARCHAR);
            cstmt.registerOutParameter(6, Types.VARCHAR);

            cstmt.setString(1, "139");
            cstmt.setString(2, TDNR.substring(0, 3));
            cstmt.setString(3, TDNR.substring(3, 7));
            cstmt.setString(4, TDNR.substring(7));

            cstmt.execute();

            filter.dbException.SQLCODE = cstmt.getString(5);
            filter.dbException.MESSAGE = cstmt.getString(6);
        } catch (Exception e) {
            e.printStackTrace();
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
        return filter;
    }
   

    public String searchDelivery(String ccust, FACSIMILFilter filter, String fuente) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String strTEXTO = "";
        Connection cnx = null;
        try {
            if (fuente.trim().equals("A") || fuente.trim().equals("ARC")) {
                //ARC
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S01A1347(?,?)}";
            } else if (fuente.trim().equals("S") || fuente.trim().equals("ASR")) {
                //ASR
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S02A1536(?,?)}";
            } else {
                //BSP
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S03A1348(?,?)}";
            }
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, ccust);
            cs.setString(2, filter.TDNR.trim());
            cs.execute();
            if (fuente.trim().equals("A") || fuente.trim().equals("ARC")) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
                            + rst.getString("TRNN") + rst.getString("TKTN")
                            + rst.getString("CDGT") + rst.getString("ARCMAXLONG") + "\n";
                }
            } else {
                rst = cs.getResultSet();
                while (rst.next()) {
                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
                            + rst.getString("TRNN") + rst.getString("TDNR")
                            + rst.getString("CDGT") + rst.getString("BSPMAXLONG") + "\n";
                }
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
        return strTEXTO;
    }
    
    public List<FACSIMILFilter> searchAgent(String AGTN) throws SQLException , Exception {
        List<FACSIMILFilter> lstRtn = new ArrayList<FACSIMILFilter>(0);
        FACSIMILFilter beanFacsimil;

        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PXA003(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, "139");
            cstmt01.setString(2, AGTN);
            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {
                beanFacsimil = new FACSIMILFilter();
                beanFacsimil.strNomAero = rst.getString("STRNOMAEREO").trim();
                beanFacsimil.AGTN = AGTN;
                beanFacsimil.strNombreAgente = rst.getString("STRNOMBREAGENTE").trim();
                beanFacsimil.strDirecAgente = rst.getString("STRDIRECAGENTE").trim();
                beanFacsimil.COUNTRY=rst.getString("A003PSALF");
                beanFacsimil.A720DISTRI=rst.getString("A003DISTRI");
                beanFacsimil.A720DEPART=rst.getString("A003DEPART");
                beanFacsimil.A720ZIPCOD=rst.getString("A003ZIPCOD"); 
                beanFacsimil.A720NAME=rst.getString("A003KEY3");
                beanFacsimil.A720PROMOT=rst.getString("A003PROMOT");
                beanFacsimil.A720CONTA1=rst.getString("A003CONTA1");
                beanFacsimil.A720CONTA2=rst.getString("A003CONTA2");
                
                
                
                lstRtn.add(beanFacsimil);
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
    
    public HashMap loadPX164SQP0038(A020Filter filter) throws SQLException, Exception {

        A020Filter data = new A020Filter();
        A728 dataA728 = new A728();

        //ROUNTING
        A728 sector;
        List<A728> list = new ArrayList<A728>();
        int intQty = 0;
        HashMap<String, Object> hmResultado = new HashMap<String, Object>();
        HashMap<String, String> hmAMTV = new HashMap<String, String>();
        hmAMTV.put("S", "SRP");
        hmAMTV.put("A", "SPA");
        hmAMTV.put("AZ", "ZED");
        hmAMTV.put("AM", "MXP");
        hmAMTV.put("AQ", "FQT");
        hmAMTV.put("AP", "SMP");
        hmAMTV.put("A&", "F&F");
        hmAMTV.put("AR", "RTW");
        hmAMTV.put("AL", "GLB");
        hmAMTV.put("M", "MPA");
        hmAMTV.put("P", "MPA");
        hmAMTV.put("R", "RTW");
        hmAMTV.put("H", "ACH");


        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00115(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt.setString(3, filter.A020KEY.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A020">

            if (rs01.next()) {

                data.A020KEY = filter.A020KEY;
                data.strTKT = rs01.getString("A020CIA").trim() + " " + rs01.getString("A020FORMA").trim() + rs01.getString("A020SERIE").trim()
                        + " " + rs01.getString("A020CUPON").trim();
                data.strTicket = rs01.getString("A020CIA").trim() + rs01.getString("A020FORMA").trim() + rs01.getString("A020SERIE").trim() + rs01.getString("A020CUPON").trim();
                data.A020SUDEBI = rs01.getDouble("A020SUDEBI");
                data.A020IMPNAC = rs01.getDouble("A020IMPNAC");
                data.A020ANALIZ = rs01.getDouble("A020ANALIZ");
                data.A020TOTDEB = rs01.getDouble("A020TOTDEB");
                data.A020ACEPTA = rs01.getDouble("A020ACEPTA");
                data.A020IMPINT = rs01.getDouble("A020IMPINT");
                data.A020COMISP = rs01.getDouble("A020COMISP");
                data.A020TOTHAB = rs01.getDouble("A020TOTHAB");
                data.A020REDEBI = rs01.getDouble("A020REDEBI");
                data.A020COMISI = rs01.getDouble("A020COMISI");
                data.A020TAX = rs01.getDouble("A020TAX");
                data.A020GRUPO = rs01.getString("A020GRUPO").trim();
                data.A020NROPRT = rs01.getString("A020NROPRT").trim();
                data.A020USER = rs01.getString("A020USER").trim();
                data.A020SDATE = rs01.getString("A020SDATE").trim();
                data.A020STIME = rs01.getString("A020STIME").trim();
                data.A020FRECHA = rs01.getString("A020FRECHA").trim();
                data.A020PSTRF = rs01.getString("A020PSTRF").trim();
                data.A020RMSN = rs01.getString("A020RMSN").trim();
                data.A020RMANT = rs01.getString("A020RMANT").trim();
                data.A020NETO = rs01.getDouble("A020NETO");
                data.A020SUFECH = rs01.getString("A020SUFECH").trim();
                data.A020TIPORM = rs01.getString("A020TIPORM").trim();
                if (rs01.getString("A020TIPORM").trim().equals("N") || rs01.getString("A020CLASRM").trim().equals("F")) {
                    data.A020SUFECH = rs01.getString("A020SUFECH").trim();
                } else {
                    data.A020SUFECH = rs01.getString("A020FUSO").trim();
                }
                data.A020FUSO = rs01.getString("A020FUSO").trim();
                data.A020CLASRM = rs01.getString("A020CLASRM").trim();
                data.A020CODMOT = rs01.getString("A020CODMOT").trim();
                data.A020BASE = rs01.getString("A020BASE").trim();
                data.A020TARIFA = rs01.getDouble("A020TARIFA");
                data.A020MONEDA = rs01.getString("A020MONEDA").trim();
                data.A020FAREUS = rs01.getDouble("A020FAREUS");
                data.A020MNRCD = rs01.getString("A020MNRCD").trim();
                data.A020DEBHAB = rs01.getString("A020DEBHAB").trim();
                data.A020QSEGUS = rs01.getDouble("A020QSEGUS");
                data.A020TUSO = rs01.getString("A020TUSO").trim();
                data.A020TCALC = rs01.getString("A020TCALC").trim();
                data.A020BOTCPR = rs01.getDouble("A020BOTCPR");
                data.A020BOTCRM = rs01.getDouble("A020BOTCRM");
                data.A020AOTCPM = rs01.getDouble("A020AOTCPM");
                data.A020AOTCRM = rs01.getDouble("A020AOTCRM");
                data.A020DOTCRM = rs01.getDouble("A020DOTCRM");

                //Guardando los comentarios ====================================
                /*data.A020CODOB1 = rs01.getString("A020CODOB1").trim();
                 data.A020CODOB2 = rs01.getString("A020CODOB2").trim();
                 data.A020CODOB3 = rs01.getString("A020CODOB3").trim();
                 data.A020CODOB4 = rs01.getString("A020CODOB4").trim();
                 data.A020CODOB5 = rs01.getString("A020CODOB5").trim();
                 data.A020COMME1 = rs01.getString("A020COMME1").trim();
                 data.A020COMME2 = rs01.getString("A020COMME2").trim();
                 data.A020COMME3 = rs01.getString("A020COMME3").trim();
                 data.A020COMME4 = rs01.getString("A020COMME4").trim();
                 data.A020COMME5 = rs01.getString("A020COMME5").trim();
                 data.A020COMME6 = rs01.getString("A020COMME6").trim();

                 for (int i = 1; i < 6; i++) {
                 comentario = new A021();
                    
                 if (rs01.getString("A020CODOB" + i) != null && !rs01.getString("A020CODOB" + i).trim().equals("")) {
                 comentario.A021KEY = rs01.getString("A020CODOB" + i).trim();
                 if (rs01.getString("A020COMME" + i) != null) {
                 comentario.A021COMEN1 = rs01.getString("A020COMME" + i).trim();
                 } else {
                 //(Consultar si se debe buscar el texto del comentario)
                 comentario.A021COMEN1 = "";
                 }
                 if ((i + 1) < 6) {
                 if (rs01.getString("A020CODOB" + (i + 1)) == null
                 || rs01.getString("A020CODOB" + (i + 1)).trim().equals("")) {
                 comentario.A021COMEN2 = rs01.getString("A020COMME" + (i + 1));
                 } else {
                 comentario.A021COMEN2 = "";
                 }
                 } else {
                 //Para el comentario 6
                 comentario.A021COMEN2 = rs01.getString("A020COMME" + (i + 1));
                 }
                 if (rs01.getString("A020DEBHAB") != null) {
                 comentario.A021CONCEP = Functions.fillString(rs01.getString("A020DEBHAB"), 5).substring(i - 1, i);
                 } else {
                 comentario.A021CONCEP = " ";
                 }

                 lstComentarios.add(comentario);
                 }

                 }

                 Functions.limpiarCamposA020Comentarios(data);
                 comentario = null;
                 for (int i = 0; i < listaComentarios.size(); i++) {
                 comentario = listaComentarios.get(i);
                 Functions.colocarComentarios(data, comentario);
                 }*/

                if (rs01.getString("A020TICKE1") != null && rs01.getString("A020TICKE2") != null) {
                    data.A020TICKE1 = rs01.getString("A020TICKE1").trim().concat("\n").concat(rs01.getString("A020TICKE2").trim());
                } else {
                    data.A020TICKE1 = "";
                }

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            //</editor-fold>

            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A728">
                rs01 = cstmt.getResultSet();
                boolean poseeSector = false;
                while (rs01.next()) {
                    if (intQty == 0) {
                        dataA728.A728CUPON = rs01.getString("A728CUPON").trim();
                        dataA728.A728FECVTA = rs01.getString("A728FECVTA").trim();
                        dataA728.A728AIRFAC = rs01.getString("A728AIRFAC").trim();
                        dataA728.A728CTYVTA = rs01.getString("A728CTYVTA").trim();
                        dataA728.A728CTYEMI = rs01.getString("A728CTYEMI").trim();
                        dataA728.A728GRUPO = rs01.getString("A728GRUPO").trim();
                        dataA728.A728COUVTA = rs01.getString("A728COUVTA").trim();
                        dataA728.A728COUEMI = rs01.getString("A728COUEMI").trim();
                        dataA728.A728AJTRAM = rs01.getString("A728AJTRAM").trim();
                        dataA728.A728SECOR = rs01.getString("A728SECOR").trim();
                        dataA728.A728SECDS = rs01.getString("A728SECDS").trim();
                        dataA728.A728ATBP = rs01.getDouble("A728ATBP");
                        dataA728.A728MDAATB = rs01.getString("A728MDAATB").trim();
                        dataA728.A728CODTAX = rs01.getString("A728CODTAX").trim();
                        dataA728.A728TDESC = rs01.getString("A728TDESC").trim();
                        dataA728.A728PORDES = rs01.getDouble("A728PORDES");
                        dataA728.A728CODIT = rs01.getString("A728CODIT").trim();
                        dataA728.A728CSOVER = rs01.getDouble("A728CSOVER");
                        dataA728.A728QSOVER = rs01.getInt("A728QSOVER");
                        dataA728.A728IPLUS = rs01.getString("A728IPLUS").trim();
                        dataA728.A728CPLUSS = rs01.getInt("A728CPLUSS");
                        dataA728.A728TAJUST = rs01.getDouble("A728TAJUST");
                        dataA728.A728RUTORG = rs01.getString("A728RUTORG").trim();
                        dataA728.A728MONSYS = rs01.getString("A728MONSYS").trim();
                        dataA728.A728LOHO = rs01.getString("A728LOHO").trim();
                        dataA728.A728TARIFA = rs01.getDouble("A728TARIFA");
                        dataA728.A728MONEDA = rs01.getString("A728MONEDA").trim();
                        dataA728.A728TRFPAG = rs01.getDouble("A728TRFPAG");
                        dataA728.A728MDAPAG = rs01.getString("A728MDAPAG").trim();
                        dataA728.A728ROE = rs01.getDouble("A728ROE");
                        //======================================================
                        //CAMPOS ADICIONALES QUE SON EXTRAIDOS PERO NO MAODIFICADOS EN EL FORMULARIO
                        dataA728.A728SEQPRT = rs01.getString("A728SEQPRT").trim();
                        dataA728.A728DCHEQ = rs01.getString("A728DCHEQ").trim();
                        dataA728.A728TVENTA = rs01.getString("A728TVENTA").trim();
                        dataA728.A728TCAREG = rs01.getDouble("A728TCAREG");
                        dataA728.A728MONREG = rs01.getString("A728MONREG").trim();
                        dataA728.A728TCASYS = rs01.getDouble("A728TCASYS");
                        dataA728.A728TCAPAG = rs01.getDouble("A728TCAPAG");
                        dataA728.A728INDSAM = rs01.getString("A728INDSAM").trim();
                        dataA728.A728INDPRT = rs01.getInt("A728INDPRT");
                        dataA728.A728SELEC = rs01.getString("A728SELEC").trim();
                        dataA728.valTiempoLimite = true;
                        dataA728.tieneComision = false;
                        //======================================================
                        //======================================================
                        sector = new A728();
                        sector.A728RUTAD = rs01.getString("A728RUTAO").trim();
                        sector.A728RERUT = rs01.getString("A728RERUT").trim();

                        list.add(sector);
                    }

                    if (rs01.getString("A728SECOR").trim().equals(rs01.getString("A728RUTAO").trim())
                            && rs01.getString("A728SECDS").trim().equals(rs01.getString("A728RUTAD").trim())) {
                        dataA728.A728FVLO1 = rs01.getString("A728FVLO1").trim();
                        dataA728.A728FBASE1 = rs01.getString("A728FBASE1").trim();
                    }

                    if (!rs01.getString("A728RUTAD").trim().equals("")) {

                        sector = new A728();
                        sector.A728RUTAD = rs01.getString("A728RUTAD").trim();
                        sector.A728CARRA1 = rs01.getString("A728CARRA1").trim();
                        sector.A728NVLO1 = rs01.getString("A728NVLO1").trim();
                        sector.A728BOOKI1 = rs01.getString("A728BOOKI1").trim();
                        sector.A728SS1 = rs01.getDouble("A728SS1");
                        sector.A728XO = rs01.getString("A728XO").trim();
                        sector.A728FACT1 = rs01.getLong("A728FACT1");
                        sector.A728PROV1 = rs01.getDouble("A728PROV1");
                        sector.A728PPRO1 = rs01.getDouble("A728PPRO1");
                        sector.A728TARI1 = rs01.getDouble("A728TARI1");
                        sector.A728ACUEO1 = rs01.getDouble("A728ACUEO1");
                        sector.A728VALOR1 = rs01.getDouble("A728VALOR1");

                        if (rs01.getString("A728INDPR1").trim().equals("A")) {
                            sector.strAMTV = "SPA";
                            if (hmAMTV.containsKey("A" + rs01.getString("A728ACUCO1").substring(9, 10))) {
                                sector.strAMTV = hmAMTV.get("A" + rs01.getString("A728ACUCO1").substring(9, 10)).toString();
                            }
                        } else {
                            if (hmAMTV.containsKey(rs01.getString("A728INDPR1").trim())) {
                                sector.strAMTV = hmAMTV.get(rs01.getString("A728INDPR1").trim()).toString();
                            }
                        }
                        sector.A728AJUST1 = rs01.getDouble("A728AJUST1");
                        //==============================================================
                        //CAMPOS ADICIONALES QUE SON EXTRAIDOS PERO NO MAODIFICADOS EN EL FORMULARIO
                        sector.A728VIA1 = rs01.getString("A728VIA1").trim();
                        sector.A728CARRN1 = rs01.getString("A728CARRN1").trim();
                        sector.A728FVLO1 = rs01.getString("A728FVLO1").trim();
                        sector.A728CLASE1 = rs01.getString("A728CLASE1").trim();
                        sector.A728FBASE1 = rs01.getString("A728FBASE1").trim();
                        sector.A728LOHO = rs01.getString("A728LOHO").trim();
                        sector.A728TBASE1 = rs01.getString("A728TBASE1").trim();
                        sector.A728STBAS1 = rs01.getString("A728STBAS1").trim();
                        sector.A728FARE1 = rs01.getDouble("A728FARE1");
                        sector.A728TFARE1 = rs01.getString("A728TFARE1").trim();
                        sector.A728DIFER1 = rs01.getDouble("A728DIFER1");
                        sector.A728FDIFE1 = rs01.getString("A728FDIFE1").trim();
                        sector.A728TRFM1 = rs01.getDouble("A728TRFM1");
                        sector.A728MNTFM1 = rs01.getString("A728MNTFM1").trim();
                        sector.A728CPLUSS = rs01.getDouble("A728CPLUSS");
                        sector.A728STOP1 = rs01.getDouble("A728STOP1");
                        sector.A728MNACU1 = rs01.getString("A728MNACU1").trim();
                        sector.A728ACUCO1 = rs01.getString("A728ACUCO1").trim();
                        sector.A728ACUE1 = rs01.getDouble("A728ACUE1");
                        sector.A728YANQ1 = rs01.getDouble("A728YANQ1");
                        sector.A728SUBPA1 = rs01.getString("A728SUBPA1").trim();
                        sector.A728VLMPA1 = rs01.getDouble("A728VLMPA1");
                        sector.A728VLSRP1 = rs01.getDouble("A728VLSRP1");
                        sector.A728INDPR1 = rs01.getString("A728INDPR1").trim();
                        sector.A728INDISC = rs01.getString("A728INDISC").trim();
                        sector.A728ISC = rs01.getDouble("A728ISC");
                        sector.A728COEFIC = rs01.getDouble("A728COEFIC");
                        sector.A728ACUBS1 = rs01.getString("A728ACUBS1").trim();
                        sector.A728ACUST1 = rs01.getString("A728ACUST1").trim();
                        sector.A728PRVST1 = rs01.getString("A728PRVST1").trim();
                        sector.A728RERUT = rs01.getString("A728RERUT").trim();
                        //=================================================================
                        /*Para saber si la ruta que viene pertenece al sector a prorratear.
                         Esto se hace para que se pueda mostrar "La pistolita" */
                        if (list.get(list.size() - 1).A728RUTAD.trim().equals(rs01.getString("A728SECOR").trim())
                                && rs01.getString("A728RUTAD").trim().equals(rs01.getString("A728SECDS").trim())) {
                            list.get(list.size() - 1).esSector = "solo";
                            sector.esSector = "todo";
                            dataA728.A728RERUT = rs01.getString("A728RERUT").trim();
                            poseeSector = true;
                        }
                        //=================================================================
                        list.add(sector);
                    }

                    intQty++;
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                if (!poseeSector) {
                    data.strMsgError = "DANGER : Error. The Ticket has errors on Prorate Route. (A728)";
                }

                //Esta porciÃ³n de cÃ³digo se hace para colocar el X/O en la ciudad correcta .. debido
                //a que el X/O q traÃ­a pertenecÃ­a al sector anterior
                for (int x = 0; x < list.size() - 1; x++) {
                    list.get(x).A728XO = list.get(x + 1).A728XO;
                }
                if (list != null && list.size() > 0) {
                    //Seteando el X/O de la Ãºltima ciudad del Routing ya q es imposible q 
                    //esta tenga ESCALA
                    list.get(list.size() - 1).A728XO = "";
                }
                //data.setSECTORS(list);

                //</editor-fold>
            }

            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A1200">
                rs01 = cstmt.getResultSet();
                if (rs01.next()) {
                    String file = rs01.getString("FILENAME");
                    data.strFileName = file;
                    data.strFileNameOrg = file;
                    data.strETKT = rs01.getString("ETKTIND");
                    data.strUSAC = rs01.getString("USAC");
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                //</editor-fold>
            }

            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A1292">
                rs01 = cstmt.getResultSet();
                String addInfo = "";
                if (rs01.next()) {
                    for (int i = 1; i < 16; i++) {
                        addInfo = addInfo.concat(rs01.getString("LINE" + i));
                    }
                }
                data.strAddInfo = addInfo;
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                //</editor-fold>
            }

            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A005">
                rs01 = cstmt.getResultSet();
                if (rs01.next()) {
                    if (rs01.getString("A005KEY3").trim().isEmpty()) {
                        data.strAirlineName = rs01.getString("A005KEY2");
                    } else {
                        data.strAirlineName = rs01.getString("A005KEY3");
                    }
                    data.strAlfa = rs01.getString("A005KEY1");
                    data.strCHS = rs01.getString("A005CHS");
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                //</editor-fold>
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            hmResultado.put("A020", data);
            hmResultado.put("A728", dataA728);
            hmResultado.put("SECTORES", list);

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

        return hmResultado;
    }
    
    public TCNFilter loadPX164SQP0077(String strTicket, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        NumberFormat nfDbl = NumberFormat.getInstance();
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);

        TCNFilter imagen = new TCNFilter();
        TCNCoupon cupon;
        List<TCNCoupon> lstCupones = new ArrayList<TCNCoupon>();
        String[] lstConjunciones = new String[4];
        String[] lstExchanges = new String[3];

        String strTCNMAXLONG = "";
        String cia = "", formaSerie = "";
        String taxes = "";
        boolean encontroData = false;
        long intFormaSerie = 0;
        if (!strTicket.equals("")) {
            strTicket = strTicket.trim().replace(" ", "").replace(" ", "");
            cia = strTicket.substring(0, 3);
            formaSerie = strTicket.substring(3, 13);
            intFormaSerie = Long.parseLong(formaSerie);
        }
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0077(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt.setString(3, formaSerie);
            cstmt.setString(4, cia);
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                encontroData = true;
                strTCNMAXLONG = Functions.fillString(rs01.getString("TCNMAXLONG"), 358);

                switch (Integer.parseInt(rs01.getString("RCID").trim())) {

                    case 1:
                        imagen.strIssuedBy = rs01.getString("CIA").trim();
                        imagen.strPassBagg = strTCNMAXLONG.substring(0, 4);
                        imagen.strDatePlaceIssue = strTCNMAXLONG.substring(114, 122);
                        imagen.strAgentNumber = strTCNMAXLONG.substring(123, 131);
                        imagen.strBooking = strTCNMAXLONG.substring(49, 62);
                        imagen.strPassenger = strTCNMAXLONG.substring(65, 114);
                        imagen.strNumTkt = rs01.getString("TDNR").trim();

                        // <editor-fold defaultstate="collapsed" desc="Armando Conjunciones">
                        //**************** Hallando las Conjunciones **************************************************
                        int posicion = Integer.parseInt(strTCNMAXLONG.substring(12, 14).replace(" ", "0"));
                        int ttlConjun = Integer.parseInt(strTCNMAXLONG.substring(14, 16).replace(" ", "0"));
                        //Asumiendo q vienen solo 4 conjunciones
                        switch (ttlConjun) {
                            case 2:
                                switch (posicion) {
                                    case 1:
                                        imagen.strConjTkts = formaSerie.concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                        lstConjunciones[0] = cia + formaSerie;
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie + 1);
                                        break;
                                    case 2:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(formaSerie);
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[1] = cia + formaSerie;
                                }
                                break;
                            case 3:
                                switch (posicion) {
                                    case 1:
                                        imagen.strConjTkts = formaSerie.concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10));
                                        lstConjunciones[0] = cia + formaSerie;
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie + 1);
                                        lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 2);
                                        break;
                                    case 2:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(formaSerie).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[1] = cia + formaSerie;
                                        lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 1);
                                        break;
                                    case 3:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 2).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(formaSerie);
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 2);
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[2] = cia + formaSerie;
                                }
                                break;
                            case 4:
                                switch (posicion) {
                                    case 1:
                                        imagen.strConjTkts = formaSerie.concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 3).substring(8, 10));
                                        lstConjunciones[0] = cia + formaSerie;
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie + 1);
                                        lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 2);
                                        lstConjunciones[3] = cia + String.valueOf(intFormaSerie + 3);
                                        break;
                                    case 2:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(formaSerie).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10));
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[1] = cia + formaSerie;
                                        lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 1);
                                        lstConjunciones[3] = cia + String.valueOf(intFormaSerie + 2);
                                        break;
                                    case 3:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 2).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(formaSerie).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 2);
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[2] = cia + formaSerie;
                                        lstConjunciones[3] = cia + String.valueOf(intFormaSerie + 1);
                                        break;
                                    case 4:
                                        imagen.strConjTkts = String.valueOf(intFormaSerie - 3).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 2).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(formaSerie);
                                        lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 3);
                                        lstConjunciones[1] = cia + String.valueOf(intFormaSerie - 2);
                                        lstConjunciones[2] = cia + String.valueOf(intFormaSerie - 1);
                                        lstConjunciones[3] = cia + formaSerie;
                                }


                        }
                        imagen.lstConjunciones = lstConjunciones;
                        //************************************************************************************************
                        //</editor-fold>
                        break;

                    case 3:
                        imagen.strOrigDestin = strTCNMAXLONG.substring(10, 24);
                        imagen.strEndorsRest = strTCNMAXLONG.substring(204, 351);
                        imagen.strTourCode = strTCNMAXLONG.substring(105, 120);
                        imagen.strFare = strTCNMAXLONG.substring(39, 50);
                        imagen.strEquivFare = strTCNMAXLONG.substring(50, 61);
                        imagen.strTax01 = strTCNMAXLONG.substring(61, 72);
                        imagen.strTax02 = strTCNMAXLONG.substring(72, 83);
                        imagen.strTax03 = strTCNMAXLONG.substring(83, 94);
                        imagen.strTotal = strTCNMAXLONG.substring(94, 105);
                        imagen.strOrigIssue = strTCNMAXLONG.substring(172, 204);
                        break;

                    case 4:
                        taxes = taxes.concat(strTCNMAXLONG.trim() + "\n" + "***************************************");
                        break;

                    case 5:
                        imagen.strItinerario = strTCNMAXLONG;
                        break;

                    case 7:
                        imagen.strFormPay = strTCNMAXLONG.substring(0, 10).concat(strTCNMAXLONG.substring(123, 133));
                        // ***  Hallando los Exchanged *******************
                        String strIssue1 = "",
                         strIssue2 = "";
                        if (strTCNMAXLONG.contains("EX")) {
                            strIssue1 = imagen.strOrigIssue.substring(0, 13);
                            if (strIssue1.trim().equals("")) {
                                strIssue1 = strTCNMAXLONG.substring(strTCNMAXLONG.indexOf("EX") + 2, strTCNMAXLONG.indexOf("EX") + 36);
                            }
                            strIssue2 = strTCNMAXLONG.substring(144, 157);
                            if (!strIssue1.trim().startsWith("139")) {
                                strIssue1 = strTCNMAXLONG.substring(144, 157);
                                strIssue2 = "";
                            }
                            if (!strIssue2.trim().startsWith("139")) {
                                strIssue2 = "";
                            }

                        }
                        // ***********************************************
                        imagen.strIssueExc1 = strIssue1;
                        imagen.strIssueExc2 = strIssue2;
                        lstExchanges[0] = cia + formaSerie;
                        lstExchanges[1] = strIssue1;
                        lstExchanges[2] = strIssue2;
                        imagen.lstExchanges = lstExchanges;
                        break;

                    case 8:
                        imagen.strFareCal = strTCNMAXLONG.substring(2);

                }
            }
            imagen.strTotalTaxes = taxes.trim();

            if (!encontroData) {
                imagen.msgError = "Record not found.";
            } else {
                //Guardando Detalle ============================================
                String itinerario = Functions.fillString(imagen.strItinerario, 360);
                int p = 0;

                for (int i = 0; i < 4; i++) {
                    cupon = new TCNCoupon();
                    cupon.strCPN = itinerario.substring(p, p + 1);
                    cupon.strXO = itinerario.substring(p + 2, p + 3);
                    cupon.strFROM = itinerario.substring(p + 3, p + 8);
                    cupon.strTO = itinerario.substring(p + 8, p + 13);
                    if (hmAeropuertos.containsKey(cupon.strFROM.trim().toUpperCase())) {
                        cupon.strDescFROM = hmAeropuertos.get(cupon.strFROM.trim().toUpperCase()).toString();
                    }
                    if (hmAeropuertos.containsKey(cupon.strTO.trim().toUpperCase())) {
                        cupon.strDescTO = hmAeropuertos.get(cupon.strTO.trim().toUpperCase()).toString();
                    }
                    cupon.strCR = itinerario.substring(p + 17, p + 21);
                    cupon.strFLIGHT = itinerario.substring(p + 26, p + 31);
                    cupon.strCLASS = itinerario.substring(p + 31, p + 33);
                    cupon.strDATE = itinerario.substring(p + 35, p + 40);
                    cupon.strTIME = itinerario.substring(p + 50, p + 55);
                    cupon.strFAREBASIS = itinerario.substring(p + 65, p + 80);
                    cupon.strNVB = itinerario.substring(p + 40, p + 45);
                    cupon.strNVA = itinerario.substring(p + 45, p + 50);
                    cupon.strST = itinerario.substring(p + 60, p + 62);
                    lstCupones.add(cupon);
                    p = p + 89;
                }
                imagen.lstCupones = lstCupones;
                // =============================================================
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

        return imagen;
    }
    
    public List<A729> loadPX164SQP00476(A020Filter filter) throws SQLException, Exception {

        //NOTA: MODIFICAR EL PROCEDURE PORQUE SÓLO TRAE LOS PRIMEROS 4 TAXES
        List<A729> lstTaxes = new ArrayList<A729>();
        A729 tax;
        //int cantTaxes = 0;
        //Para comprobar que taxes no se repitan (debido al nombre)
        HashMap<String, String> hmTaxes = new HashMap<String, String>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00476(?,?,?,?,?)}";
        Connection cnx = null;
        try {

            //==================================================================
            String strNroprt = "";
            /* if (filter.A020NROPRT.trim().length() == 0) {
             strNroprt = filter.strTicket.trim().substring(3, 13);
             } else if (filter.A020NROPRT.trim().length() == 9) {
             strNroprt = "0" + filter.A020NROPRT.trim();
             } else {
             strNroprt = filter.A020NROPRT.trim();
             }*/
            //==================================================================
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(5, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strTicket.trim().substring(0, 3));
            cstmt.setString(3, filter.A020KEY.trim());//strNroprt SIN CUPON
            cstmt.setString(4, "0");//CUPON
            cstmt.setInt(5, 0);
            cstmt.execute();

            //cantTaxes = cstmt.getInt(5);

            rst = cstmt.getResultSet();

            while (rst.next()) {

                tax = new A729();
                tax.A729CODTAX = rst.getString("A729CODTAX").trim();
                tax.A729TAXRES = rst.getDouble("A729TAXRES");
                tax.A729MDARES = rst.getString("A729MDARES").trim();
                tax.strNombre = rst.getString("A1202TNAME").trim();
                tax.A729VALTAX = rst.getDouble("A729VALTAX");

                if (!hmTaxes.containsKey(rst.getString("A729CODTAX").trim())) {
                    lstTaxes.add(tax);
                    hmTaxes.put(rst.getString("A729CODTAX").trim(), rst.getString("A729CODTAX").trim());
                }
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
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

        return lstTaxes;
    }
}
