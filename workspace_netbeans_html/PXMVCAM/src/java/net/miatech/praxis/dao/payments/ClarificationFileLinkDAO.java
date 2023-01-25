/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession; 
import net.miatech.praxis.payment.filter.A2282Filter;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author
 */
public class ClarificationFileLinkDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ClarificationFileLinkDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ClarificationFileLinkDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2331Filter> loadPX405SQP01914(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<>();
        A2331Filter objRtn;
        String strPermitir = "";

        //Se agrego la validacion dentro del  procedure
        //Le permite ver toda la información y no sólo la ligada a una IATA en específico
//        if (session.getUserView().getUserInfo().USR.trim().startsWith("SAP")
//                || session.getUserView().getUserInfo().USR.trim().equals("XJREFUGIO")
//                || session.getUserView().getUserInfo().USR.trim().equals("XELIZABETA")
//                || session.getUserView().getUserInfo().USR.trim().equals("XFROJO")) {
//            strPermitir = "Y";
//        }
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01914_1(?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_CODEBANK.trim());
            cstmt.setString(8, filter.IN_COUNTRY.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, session.getUserView().getUserInfo().USR);
            cstmt.setString(11, strPermitir);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01 != null) {
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_CARDN1 = filter.IN_CARDN1;
                    objRtn.IN_CARDN2 = filter.IN_CARDN2;
                    objRtn.IN_CODEBANK = filter.IN_CODEBANK;
                    objRtn.IN_STVAL = filter.IN_STVAL;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;

                    objRtn.IATADATE = rs01.getString("IATADATE").trim();
                    objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                    objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.SEQNUM = rs01.getString("SEQNUM").trim();
                    if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                        //Enmascarando
                        if (objRtn.SCARCOD.trim().equals("AX")) {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                        } else {
                            objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                        }
                    } else {
                        objRtn.strDescripcion = objRtn.CARDNBR;
                    }
                    try {
                        objRtn.IN_CARDN1 = rs01.getString("CARDNBR").trim().substring(0, 6);
                        objRtn.IN_CARDN2 = rs01.getString("CARDNBR").trim().substring(12);
                    } catch (Exception e) {
                    }
                    objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                    objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                    objRtn.FOLIO = rs01.getString("FOLIO").trim();
                    objRtn.VFOP = rs01.getDouble("VFOP");
                    objRtn.lngDocs = rs01.getLong("QTKT");
                    objRtn.MERCHN = rs01.getString("MERCHN").trim();
                    objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                    objRtn.strCANAL = rs01.getString("CANAL").trim();
                    if (objRtn.strCANAL.trim().equals("WEB") || objRtn.strCANAL.trim().equals("CCT")) {
                        objRtn.strFlag = "CC";
                    } else if (objRtn.MERCHNAM.trim().toUpperCase().contains("CALL CENT")) {
                        objRtn.strFlag = "CC";
                    }
                    objRtn.RUTA = rs01.getString("RUTA").trim();
                    if (!objRtn.RUTA.trim().isEmpty()) {
                        objRtn.strImgLink = "Y";
                    }
                    objRtn.days = Functions.diferenciaDiasEntreSistema(rs01.getString("SENTDATE").trim());
                    if (objRtn.STVAL.equals("4") || objRtn.STVAL.equals("5")) {
                        objRtn.strSemaforo = "VERDE";
                    } else {
                        if (objRtn.days < 8) {
                            objRtn.strSemaforo = "VERDE";
                        } else if (objRtn.days <= 10) {
                            objRtn.strSemaforo = "AMBAR";
                        } else {
                            objRtn.strSemaforo = "ROJO";
                        }
                    }
                    list.add(objRtn);
                }

                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

        return list;
    }

    public List<A2331Filter> loadPX405SQP01915(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01915(?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IATADATE.trim());
            cstmt.setString(3, filter.SENTDATE.trim());
            cstmt.setString(4, filter.CARDNBR.trim());
            cstmt.setString(5, filter.AUTHNBR.trim());
            cstmt.setString(6, filter.SALEDATE.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                objRtn = new A2331Filter();
                objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                objRtn.DATES = rs01.getString("DATES").trim();
                objRtn.MERCHN = rs01.getString("MERCHN").trim();
                objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                objRtn.FOLIO = rs01.getString("FOLIO").trim();
                objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.AGENTE = rs01.getString("AGENTE").trim();
                objRtn.RUTA = rs01.getString("RUTA").trim();
                if (!objRtn.RUTA.trim().isEmpty()) {
                    objRtn.strImgLink = "Y";
                }
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.FORMA = rs01.getString("FORMA").trim();
                objRtn.SERIE = rs01.getString("SERIE").trim();
                objRtn.strTicket = rs01.getString("CCIA").trim() + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                objRtn.VFOP = rs01.getDouble("VFOP");

                if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                    //Enmascarando
                    if (objRtn.SCARCOD.trim().equals("AX")) {
                        objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                    } else {
                        objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                    }
                } else {
                    objRtn.strDescripcion = objRtn.CARDNBR;
                }
                objRtn.strDescStatus = hmDescSTVAL.get(objRtn.STVAL).toString();

                list.add(objRtn);
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

        return list;
    }

    public A2331Filter loadPX405SQP01958(A2331Filter filter) throws SQLException, Exception {

        A2331Filter objRtn = new A2331Filter();
        String tkt = "";
        String strTkt = "", strPNR = "", strDesc = "", msj = "", strAuthor = "", strPAX = "", strSENTDATE = "";//, strSEQNUM = ""
        String strSCARCOD = "", strSCARDN = "", strMERCHN = "", strMERCHNAM = "", strSALEDATE = "", strFOLIO = "", strAGENTE = "", STUSO = "";
        //String strCANAL = "", strFLAG = "", strRuta = "", strImageLink = "";
        double dblAUTAMOUNT = 0;
        int i = 0;
        boolean hayData = false, hayVenta = false;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        HashMap hmPNR = new HashMap();
        HashMap hmAutho = new HashMap();
        HashMap hmPAX = new HashMap();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01958_1(?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SALEDATE.trim());
            cstmt.setString(3, filter.CARDNBR.trim());
            cstmt.setString(4, filter.AUTHNBR.trim());
            cstmt.setString(5, filter.MERCHN.trim());
            cstmt.setString(6, filter.FOLIO.trim());
            cstmt.setString(7, filter.SENTDATE.trim());
            //cstmt.setString(7, filter.SEQNUM.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                hayData = true;
                //if (i == 0) { COMENTADO 20180226
                //if(rs01.getString("TPDOC").trim().startsWith("TKT")){ //COMENTADO 20180227
                strAGENTE = rs01.getString("AGENTE").trim();
                strSENTDATE = rs01.getString("SENTDATE").trim();
                //strSEQNUM = rs01.getString("SEQNUM").trim();
                strSCARDN = rs01.getString("CARDNBR").trim();
                strSCARCOD = rs01.getString("SCARCOD").trim();
                strSALEDATE = rs01.getString("SALEDATE").trim();
                strMERCHNAM = rs01.getString("MERCHNAM").trim();
                strMERCHN = rs01.getString("MERCHN").trim();
                //A RAIZ DEL CAMBIO EN LA GENERACION DE LAS ACLARACIONES, EL MONTO SE TOMARÁ DEL PRIMER REGISTRO 20190520 DOMINIQUE
                if (i == 0) {
                    dblAUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                }
                if (strMERCHNAM.trim().isEmpty()) {
                    strMERCHNAM = rs01.getString("NMERCHN").trim();
                }
                strFOLIO = rs01.getString("FOLIO").trim();
                //==============================================================

                tkt = rs01.getString("CCIA").trim() + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                STUSO = rs01.getString("STUSO");
                if (!rs01.getString("RUTA0").trim().isEmpty() && !rs01.getString("PAX").trim().equals("")) {
                    hayVenta = true;
                    /*objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                     objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                     if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                     //Enmascarando
                     if (objRtn.SCARCOD.trim().equals("AX")) {
                     objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "*****" + rs01.getString("CARDNBR").trim().substring(11);
                     } else {
                     objRtn.strDescripcion = rs01.getString("CARDNBR").trim().substring(0, 6) + "******" + rs01.getString("CARDNBR").trim().substring(12);
                     }
                     } else {
                     objRtn.strDescripcion = objRtn.CARDNBR;
                     }
                     objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                     objRtn.MERCHNAM = rs01.getString("MERCHNAM").trim();
                     objRtn.MERCHN = rs01.getString("MERCHN").trim();
                     objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                     if (objRtn.MERCHNAM.trim().isEmpty()) {
                     objRtn.MERCHNAM = rs01.getString("NMERCHN").trim();
                     }
                     objRtn.FOLIO = rs01.getString("FOLIO").trim();*/
                    objRtn.RUTA = rs01.getString("RUTA").trim();
                    if (!objRtn.RUTA.trim().isEmpty()) {
                        objRtn.strImgLink = "Y";
                    }
                    objRtn.strCANAL = rs01.getString("CANAL").trim();
                    if (objRtn.strCANAL.trim().equals("WEB") || objRtn.strCANAL.trim().equals("CCT")) {
                        objRtn.strFlag = "CC";
                    } else if (objRtn.MERCHNAM.trim().toUpperCase().contains("CALL CENT")) {
                        objRtn.strFlag = "CC";
                    }

                    if (rs01.getString("NOMTARHAB") != null && !rs01.getString("NOMTARHAB").trim().equals("-")) {
                        objRtn.NOMTARHAB = rs01.getString("NOMTARHAB").trim().replaceAll("\"", "*").replaceAll(",", " ").replaceAll("'", "*");
                        objRtn.COMMENT = rs01.getString("COMMENT").trim().replaceAll("\"", "*").replaceAll(",", " ").replaceAll("'", "*").replaceAll("  ", " ");
                        objRtn.USCR = rs01.getString("USCR").trim();
                        objRtn.FECR = rs01.getString("FECR").trim();
                        objRtn.HOCR = rs01.getString("HOCR").trim();
                        objRtn.USUP = rs01.getString("USUP").trim();
                        objRtn.FEUP = rs01.getString("FEUP").trim();
                        objRtn.HOUP = rs01.getString("HOUP").trim();
                    }
                    objRtn.strDireccion = "Aeropuerto " + rs01.getString("DIRECCION").trim();
                    //objRtn.PAX = rs01.getString("PAX").trim();
                    objRtn.FVLO1 = rs01.getString("FVLO1").trim();
                    objRtn.FVLO2 = rs01.getString("FVLO2").trim();
                    objRtn.FVLO3 = rs01.getString("FVLO3").trim();
                    objRtn.FVLO4 = rs01.getString("FVLO4").trim();
                    objRtn.RUTA0 = rs01.getString("RUTA0").trim();
                    objRtn.RUTA1 = rs01.getString("RUTA1").trim();
                    objRtn.RUTA2 = rs01.getString("RUTA2").trim();
                    objRtn.RUTA3 = rs01.getString("RUTA3").trim();
                    objRtn.RUTA4 = rs01.getString("RUTA4").trim();
                    strDesc = Functions.FormatFecha(objRtn.FVLO1, "yyyyMMdd", "ddMMMyy") + " " + objRtn.RUTA0 + objRtn.RUTA1;
                    if (STUSO.substring(0, 1).equals("F")) {
                        strDesc = strDesc + "(" + getSeats(tkt, "1", objRtn.FVLO1) + ")";
                    }
                    if (!objRtn.FVLO2.isEmpty()) {
                        strDesc += " / " + Functions.FormatFecha(objRtn.FVLO2, "yyyyMMdd", "ddMMMyy") + " " + objRtn.RUTA1 + objRtn.RUTA2;
                        if (STUSO.substring(1, 2).equals("F")) {
                            strDesc = strDesc + "(" + getSeats(tkt, "2", objRtn.FVLO2) + ")";
                        }
                    }
                    if (!objRtn.FVLO3.isEmpty()) {
                        strDesc += " / " + Functions.FormatFecha(objRtn.FVLO3, "yyyyMMdd", "ddMMMyy") + " " + objRtn.RUTA2 + objRtn.RUTA3;
                        if (STUSO.substring(2, 3).equals("F")) {
                            strDesc = strDesc + "(" + getSeats(tkt, "3", objRtn.FVLO3) + ")";
                        }
                    }
                    if (!objRtn.FVLO4.isEmpty()) {
                        strDesc += " / " + Functions.FormatFecha(objRtn.FVLO4, "yyyyMMdd", "ddMMMyy") + " " + objRtn.RUTA3 + objRtn.RUTA4;
                        if (STUSO.substring(3, 4).equals("F")) {
                            strDesc = strDesc + "(" + getSeats(tkt, "4", objRtn.FVLO4) + ")";
                        }
                    }
                }
                //==============================================================
//                tkt = rs01.getString("CCIA").trim() + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
//                if(rs01.getString("STUSO").trim().contains("F")){
//                    String[] fechasVLO = {objRtn.FVLO1, objRtn.FVLO2, objRtn.FVLO3, objRtn.FVLO4};
//                    
//                    String TktSeat = tkt;
//                    String cupon ="";
//
//                    TktSeat = TktSeat + "(" ;
//
//                    for (int S = 0; S < 4; S++) {
//                        String flagVolado = rs01.getString("STUSO").substring(S,S+1).trim();
//                        if(flagVolado.trim().equals("F")){
//                            cupon = "" + (S+1);
//                            TktSeat = TktSeat + flagVolado+cupon + ":" + getSeats(tkt,cupon,fechasVLO[S]) + "-";
//                        }
//                    }
//                    TktSeat = TktSeat + ")" ;
//                    strTkt += TktSeat.replace("-)", ")") +  ", ";
//                }else{
//                    
//                }
                strTkt += tkt + ", ";
                if (!hmAutho.containsKey(rs01.getString("AUTHNBR").trim())) {
                    strAuthor += rs01.getString("AUTHNBR").trim() + ", ";
                }
                if (!hmPNR.containsKey(rs01.getString("PNR").trim())) {
                    strPNR += rs01.getString("PNR").trim() + ", ";
                }
                //VALIDACION QUITADA A PEDIDO DE AM/JUGAZ UAT 20171117
                /*//if(rs01.getString("TPDOC").trim().startsWith("TKT")){
                 strPAX += rs01.getString("PAX").trim() + ", ";
                 //}*/
                if (!hmPAX.containsKey(rs01.getString("PAX").trim())) {
                    strPAX += rs01.getString("PAX").trim() + ", ";
                }
                hmAutho.put(rs01.getString("AUTHNBR").trim(), rs01.getString("AUTHNBR").trim());
                hmPNR.put(rs01.getString("PNR").trim(), rs01.getString("PNR").trim());
                hmPAX.put(rs01.getString("PAX").trim(), rs01.getString("PAX").trim());
                i++;

            }

            if (hayData) {

                //objRtn.SEQNUM = strSEQNUM;
                objRtn.AGENTE = strAGENTE;
                objRtn.SENTDATE = strSENTDATE;
                objRtn.CARDNBR = strSCARDN;
                objRtn.SCARCOD = strSCARCOD;
                if (!objRtn.CARDNBR.contains("*") && !objRtn.CARDNBR.contains("X")) {
                    //Enmascarando
                    if (objRtn.SCARCOD.trim().equals("AX")) {
                        objRtn.strDescripcion = strSCARDN.substring(0, 6) + "*****" + strSCARDN.substring(11);
                    } else {
                        objRtn.strDescripcion = strSCARDN.substring(0, 6) + "******" + strSCARDN.substring(12);
                    }
                } else {
                    objRtn.strDescripcion = objRtn.CARDNBR;
                }
                objRtn.SALEDATE = strSALEDATE;
                objRtn.MERCHNAM = strMERCHNAM;
                objRtn.MERCHN = strMERCHN;
                objRtn.AUTAMOUNT = dblAUTAMOUNT;
                //==============================================================
                if (objRtn.strDireccion.trim().isEmpty()) {
                    objRtn.strDireccion = "REVISAR COMENTARIOS.";
                }
                if (objRtn.FVLO1.trim().isEmpty()) {
                    objRtn.FVLO1 = "REVISAR COMENTARIOS.";
                }
                if (strTkt.trim().isEmpty()) {
                    objRtn.strTicket = "TICKETS NO ENCONTRADOS";
                } else {
                    objRtn.strTicket = strTkt;
                }
                if (strAuthor.trim().isEmpty()) {
                    objRtn.AUTHNBR = "REVISAR COMENTARIOS.";
                } else {
                    objRtn.AUTHNBR = strAuthor;
                }
                if (strPNR.trim().isEmpty()) {
                    objRtn.PNR = "REVISAR COMENTARIOS.";
                } else {
                    objRtn.PNR = strPNR;
                }
                if (strPAX.trim().isEmpty()) {
                    objRtn.PAX = "REVISAR COMENTARIOS.";
                } else {
                    objRtn.PAX = strPAX;
                }
                if (strDesc.trim().isEmpty()) {
                    objRtn.strDescStatus = strPNR + "  " + "REVISAR COMENTARIOS.";
                } else {
                    objRtn.strDescStatus = strPNR + "  " + strDesc;
                }
                objRtn.FOLIO = strFOLIO;

            } else {
                msj = "Error. Information not found";
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

        } catch (Exception e) {
            e.printStackTrace();
            msj = "ERROR: " + e.getMessage();
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
        objRtn.strDescError = msj;

        return objRtn;
    }

    public String getSeats(String tkt, String cupon, String fechaVLO) throws Exception {
        String seat = "";
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03768(?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, tkt);
            cstmt.setString(3, cupon);
            cstmt.setString(4, fechaVLO);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                seat = rs01.getString("CHAIR");
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

        return seat;
    }

    public String loadPX405SQP01959(A2331Filter filter, String strOption) throws SQLException, Exception {

        String strMsj = "";
        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01959(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.VARCHAR);

            cstmt.setString(1, strOption);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.SALEDATE.trim());
            cstmt.setString(4, filter.CARDNBR.trim());
            cstmt.setString(5, "");//filter.AUTHNBR.trim()
            cstmt.setString(6, filter.MERCHN.trim());
            cstmt.setString(7, filter.FOLIO.trim());
            cstmt.setString(8, filter.SENTDATE.trim());
            //cstmt.setString(8, filter.SEQNUM.trim());
            cstmt.setString(9, filter.NOMTARHAB.trim());
            cstmt.setString(10, filter.COMMENT.trim());
            cstmt.setString(11, session.getUserView().getUserInfo().USR);
            cstmt.setString(12, Functions.getFechaActual());
            cstmt.setString(13, Functions.getHoraActual());
            cstmt.setString(14, "");
            cstmt.execute();

            strMsj = cstmt.getString(14);

        } catch (Exception e) {
            strMsj = "ERROR:" + e.getMessage();
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

        return strMsj;
    }

}
