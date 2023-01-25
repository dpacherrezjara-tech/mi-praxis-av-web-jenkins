/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.SaleAudit.SQP00911;
import net.miatech.praxis.dao.program.ProrrateoNewDAO;
import net.miatech.praxis.dao.master.MasterDAO; //package net.miatech.praxis.dao.master;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class DownloadADMACMReportFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();
    private MasterDAO masterDAO;
    ProrrateoNewDAO prorrateoDAO;
    HashMap<String, String> hmCiudades;

    public DownloadADMACMReportFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DownloadADMACMReportFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP00911Filter> Search(SQP00911Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01781(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.OPCIONTYPE);
            cstmt01.setString(2, filter.COMBOBY);
            cstmt01.setString(3, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(4, filter.CIA);
            cstmt01.setString(5, filter.FORMA);
            cstmt01.setString(6, filter.SERIE);
            cstmt01.setString(7, filter.NUMBERADM);
            cstmt01.setString(8, filter.DATEFROM);
            cstmt01.setString(9, filter.DATETO);
            cstmt01.setString(10, filter.COUNTRY);
            cstmt01.setString(11, filter.CURRENCY);
            cstmt01.setString(12, filter.CHANNEL);
            cstmt01.setString(13, filter.AUTMAN);
            cstmt01.setString(14, filter.STATUS);
            cstmt01.setString(15, filter.COMBOCHANNEL);
            cstmt01.setString(16, filter.SEQ);
            cstmt01.setString(17, filter.CUPON);
            cstmt01.setString(18, filter.TRNCU);
            cstmt01.setString(19, filter.A2548CNXPA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548FTE = rs01.getString("A2548FTE");
                objRtn.A2548MDA = rs01.getString("A2548MDA");
                objRtn.A2548TRNCU = rs01.getString("A2548TRNCU");
                objRtn.A2548BASE = rs01.getString("A2548BASE");
                objRtn.A2548NMEMO = rs01.getString("A2548NMEMO");
                objRtn.A2548CNXPA = rs01.getString("A2548CNXPA");
                objRtn.A2548CATNNTD = rs01.getInt("A2548COUNT");
                objRtn.A2548FCONT = rs01.getString("A2548FCONT");
                objRtn.A2548FLAG = rs01.getString("A2548FLAG");
                objRtn.A2548IATA = rs01.getString("A2548IATA");
                objRtn.A2548FREGI = rs01.getString("A2548FREGI");
                objRtn.AGENCY = rs01.getString("AGENCY");
                objRtn.strNombreAgente = rs01.getString("STRNOMBREAGENTE");
                objRtn.strDirecAgente = rs01.getString("STRDIRECAGENTE");
                objRtn.strZIPCOD = rs01.getString("A003ZIPCOD");
                objRtn.strDISTRI = rs01.getString("A003DISTRI");
                objRtn.strDEPART = rs01.getString("A003DEPART");
                objRtn.strCOUNTRY = rs01.getString("A003PSALF");
                objRtn.STRNOMAEREO = rs01.getString("STRNOMAEREO");

                //AEROLINEA
                objRtn.A2548TARIF = rs01.getDouble("A2548TARIF");
                objRtn.A2548TTAX = rs01.getDouble("A2548TTAX");
                objRtn.A2548SERVI = rs01.getDouble("A2548SERVI");
                objRtn.A2548IVACS = rs01.getDouble("A2548IVACS");
                objRtn.A2548COMIS = rs01.getDouble("A2548COMIS");
                objRtn.A2548SCOM = rs01.getDouble("A2548SCOM");
                objRtn.A2548TAXCM = rs01.getDouble("A2548TAXCM");
                objRtn.A2548PORCO = rs01.getDouble("A2548PORCO");
                objRtn.A2548PENAL = rs01.getDouble("A2548PENAL");
                objRtn.A2548FEE = rs01.getDouble("A2548FEE");
                //objRtnTkt.A2548TASAC = rs03.getString("A2548TASAC");
                objRtn.A2548TOTAL = rs01.getDouble("A2548TOTAL");

                //AGENCIA
                objRtn.A2548TARIA = rs01.getDouble("A2548TARIA");
                objRtn.A2548TTAXA = rs01.getDouble("A2548TTAXA");
                objRtn.A2548SERVA = rs01.getDouble("A2548SERVA");
                objRtn.A2548IVACA = rs01.getDouble("A2548IVACA");
                objRtn.A2548COMIA = rs01.getDouble("A2548COMIA");
                objRtn.A2548SCOMA = rs01.getDouble("A2548SCOMA");
                objRtn.A2548TAXCA = rs01.getDouble("A2548TAXCA");
                objRtn.A2548PORCA = rs01.getDouble("A2548PORCA");
                objRtn.A2548PENAA = rs01.getDouble("A2548PENAA");
                objRtn.A2548FEEA = rs01.getDouble("A2548FEEA");
                //objRtnTkt.A2548TASAA = rs03.getString("A2548TASAA");
                objRtn.A2548TOTAA = rs01.getDouble("A2548TOTAA");

                //DIFENRENCIAS
                objRtn.A2548TARID = rs01.getDouble("A2548TARID");
                objRtn.A2548TTAXD = rs01.getDouble("A2548TTAXD");
                objRtn.A2548SERVD = rs01.getDouble("A2548SERVD");
                objRtn.A2548IVACD = rs01.getDouble("A2548IVACD");
                objRtn.A2548COMID = rs01.getDouble("A2548COMID");
                objRtn.A2548SCOMD = rs01.getDouble("A2548SCOMD");
                objRtn.A2548TAXCD = rs01.getDouble("A2548TAXCD");
                objRtn.A2548PORCD = rs01.getDouble("A2548PORCD");
                objRtn.A2548PENAD = rs01.getDouble("A2548PENAD");
                objRtn.A2548FEED = rs01.getDouble("A2548FEED");
                objRtn.A2548TTACD = rs01.getDouble("A2548TTACD");
                objRtn.A2548TTAMD = rs01.getDouble("A2548TTAMD");
                objRtn.A2548TCARD = rs01.getDouble("A2548TCARD");
                objRtn.A2548TOTAD = rs01.getDouble("A2548TOTAD");
                objRtn.A2548NETO = rs01.getDouble("A2548NETO");

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
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

    public List<SQP00911Filter> LisDownloadADMPDF(ArrayList<SQP00911Filter> filter) throws SQLException, Exception {

        List<SQP00911Filter> lstGeneral = new ArrayList<SQP00911Filter>(0);

        SQP00911Filter objRtnGeneral = null;
        SQP00911 objRtnTkt = null;
        SQP00911 objRazones = null;
        SQP00911 lstImpu = null;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs03 = null;
        ResultSet rs04 = null;
        String strSQL;
        session.getCNXIBMDB2().open();
        try {
            for (SQP00911Filter obj : filter) {
                String SQLCLL01 = "{CALL PXSAUDIT.SQP01783(?,?,?)}";
                cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
                cstmt01.setString(1, "1");
                cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt01.setString(3, obj.A2548CNXPA);
                cstmt01.execute();
                rs01 = cstmt01.getResultSet();

                objRtnGeneral = new SQP00911Filter();
                objRtnGeneral.A2548FTE = obj.A2548FTE;
                objRtnGeneral.A2548PAIS = obj.A2548PAIS;
                objRtnGeneral.A2548MDA = obj.A2548MDA;
                objRtnGeneral.A2548TRNCU = obj.A2548TRNCU;
                objRtnGeneral.A2548BASE = obj.A2548BASE;
                objRtnGeneral.A2548NMEMO = obj.A2548NMEMO;
                objRtnGeneral.A2548CNXPA = obj.A2548CNXPA;
                objRtnGeneral.A2548FCONT = obj.A2548FCONT;
                objRtnGeneral.A2548FLAG = obj.A2548FLAG;
                objRtnGeneral.A2548IATA = obj.A2548IATA;
                objRtnGeneral.A2548FREGI = obj.A2548FREGI;
                objRtnGeneral.A2548CATNNTD = obj.A2548CATNNTD;
                objRtnGeneral.AGENCY = obj.AGENCY;
                objRtnGeneral.strNombreAgente = obj.strNombreAgente;
                objRtnGeneral.strDirecAgente = obj.strDirecAgente;
                objRtnGeneral.strZIPCOD = obj.strZIPCOD;
                objRtnGeneral.strDISTRI = obj.strDISTRI;
                objRtnGeneral.strDEPART = obj.strDEPART;
                objRtnGeneral.strCOUNTRY = obj.strCOUNTRY;

                //AEROLINEA
                objRtnGeneral.A2548TARIF = obj.A2548TARIF;
                objRtnGeneral.A2548TTAX = obj.A2548TTAX;
                objRtnGeneral.A2548SERVI = obj.A2548SERVI;
                objRtnGeneral.A2548IVACS = obj.A2548IVACS;
                objRtnGeneral.A2548COMIS = obj.A2548COMIS;
                objRtnGeneral.A2548SCOM = obj.A2548SCOM;
                objRtnGeneral.A2548TAXCM = obj.A2548TAXCM;
                objRtnGeneral.A2548PORCO = obj.A2548PORCO;
                objRtnGeneral.A2548PENAL = obj.A2548PENAL;
                objRtnGeneral.A2548FEE = obj.A2548FEE;
                //objRtnTkt.A2548TASAC = rs03.getString("A2548TASAC");
                objRtnGeneral.A2548TOTAL = obj.A2548TOTAL;

                //AGENCIA
                objRtnGeneral.A2548TARIA = obj.A2548TARIA;
                objRtnGeneral.A2548TTAXA = obj.A2548TTAXA;
                objRtnGeneral.A2548SERVA = obj.A2548SERVA;
                objRtnGeneral.A2548IVACA = obj.A2548IVACA;
                objRtnGeneral.A2548COMIA = obj.A2548COMIA;
                objRtnGeneral.A2548SCOMA = obj.A2548SCOMA;
                objRtnGeneral.A2548TAXCA = obj.A2548TAXCA;
                objRtnGeneral.A2548PORCA = obj.A2548PORCA;
                objRtnGeneral.A2548PENAA = obj.A2548PENAA;
                objRtnGeneral.A2548FEEA = obj.A2548FEEA;
                //objRtnTkt.A2548TASAA = rs03.getString("A2548TASAA");
                objRtnGeneral.A2548TOTAA = obj.A2548TOTAA;

                //DIFENRENCIAS
                objRtnGeneral.A2548TARID = obj.A2548TARID;
                objRtnGeneral.A2548TTAXD = obj.A2548TTAXD;
                objRtnGeneral.A2548SERVD = obj.A2548SERVD;
                objRtnGeneral.A2548IVACD = obj.A2548IVACD;
                objRtnGeneral.A2548COMID = obj.A2548COMID;
                objRtnGeneral.A2548SCOMD = obj.A2548SCOMD;
                objRtnGeneral.A2548TAXCD = obj.A2548TAXCD;
                objRtnGeneral.A2548PORCD = obj.A2548PORCD;
                objRtnGeneral.A2548PENAD = obj.A2548PENAD;
                objRtnGeneral.A2548FEED = obj.A2548FEED;
                objRtnGeneral.A2548TTACD = obj.A2548TTACD;
                objRtnGeneral.A2548TTAMD = obj.A2548TTAMD;
                objRtnGeneral.A2548TCARD = obj.A2548TCARD;
                //objRtnTkt.A2548TASAD = rs03.getString("A2548TASAD");
                objRtnGeneral.A2548TOTAD = obj.A2548TOTAD;
                objRtnGeneral.A2548NETO = obj.A2548NETO;
                while (rs01.next()) {

                    objRazones = new SQP00911();
                    objRazones.A2548CODR1 = rs01.getString("A2673CODE");
                    objRazones.A2548EMISION = rs01.getString("A2673ERROR");
                    objRazones.A2548DESC1 = rs01.getString("A2673TYPE");
                    objRtnGeneral.lst_razones.add(objRazones);

                }
                if (cstmt01.getMoreResults()) {
                    rs03 = cstmt01.getResultSet();
                    while (rs03.next()) {
                        objRtnTkt = new SQP00911();

                        objRtnTkt.A2548TIKET = rs03.getString("A2548TIKET");
                        objRtnTkt.A2548CDGT = rs03.getString("A2548CDGT");
                        objRtnTkt.A2548CODIT = rs03.getString("A2548CODIT");
                        objRtnTkt.A2548TRNCO = rs03.getString("A2548TRNCO");
                        objRtnTkt.A2548FVTA = rs03.getString("A2548FVTA");
                        objRtnTkt.A2548PAX = rs03.getString("A2548PAX");
                        objRtnTkt.A2548PREME = rs03.getString("A2548PREME");
                        objRtnTkt.A2548REGIS = rs03.getString("A2548REGIS");
                        objRtnTkt.A2548EMPLE = rs03.getString("A2548EMPLE");
                        objRtnTkt.A2548OBSER = rs03.getString("A2548OBSER");
                        objRtnTkt.A2548CANAL = rs03.getString("A2548CANAL");
                        objRtnTkt.A2548CIUD = rs03.getString("A2548CIUD");
                        objRtnTkt.A2548NETO = rs03.getDouble("A2548NETO");
                        objRtnGeneral.lst_TKT.add(objRtnTkt);
                    }
                }
                if (cstmt01.getMoreResults()) {
                    rs04 = cstmt01.getResultSet();
                    while (rs04.next()) {
                        lstImpu = new SQP00911();

                        lstImpu.A1673CDTAX = rs04.getString("A1673CDTAX");
                        lstImpu.A1673TXORI = rs04.getDouble("A1673TXORI");
                        lstImpu.A1673TXMIA = rs04.getDouble("A1673TXMIA");
                        lstImpu.A1673TXDIF = rs04.getDouble("A1673TXDIF");
                        objRtnGeneral.lstImpues.add(lstImpu);
                    }
                }
                lstGeneral.add(objRtnGeneral);
            }
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
            strSQL = null;
            session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }
        return lstGeneral;
    }

    public List<SQP00911Filter> LisDownloadARCADMPDF(ArrayList<SQP00911Filter> filter) throws SQLException, Exception {
        List<SQP00911Filter> lstGeneral = new ArrayList<SQP00911Filter>(0);

        prorrateoDAO = new ProrrateoNewDAO();
        masterDAO = new MasterDAO();
        FACSIMILFilter beanFaximil = new FACSIMILFilter();

        String strSQL;
        int crrl = 0;
        String error;
        for (SQP00911Filter obj : filter) {
            BSPF104 filter2 = new BSPF104();

            SQP00911Filter objRtnGeneral = null;
            SQP00911 objRtnTkt = null;
            SQP00911 objRazones = null;
            SQP00911 lstImpu = null;
            CallableStatement cstmt01 = null;
            ResultSet rs01 = null;
            ResultSet rs03 = null;
            ResultSet rs04 = null;
            Connection cnx = null;
            try {
                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                crrl++;
                String SQLCLL01 = "{CALL PXSAUDIT.SQP01782(?,?,?)}";
                cstmt01 = cnx.prepareCall(SQLCLL01);
                cstmt01.setString(1, "1");
                cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt01.setString(3, obj.A2548CNXPA);
                cstmt01.execute();
                rs01 = cstmt01.getResultSet();

                objRtnGeneral = new SQP00911Filter();
                objRtnGeneral.A2548FTE = obj.A2548FTE;
                objRtnGeneral.A2548MDA = obj.A2548MDA;
                objRtnGeneral.A2548TRNCU = obj.A2548TRNCU;
                objRtnGeneral.A2548BASE = obj.A2548BASE;
                objRtnGeneral.A2548NMEMO = obj.A2548NMEMO;
                objRtnGeneral.A2548CNXPA = obj.A2548CNXPA;
                objRtnGeneral.A2548CATNNTD = obj.A2548CATNNTD;
                objRtnGeneral.A2548FCONT = obj.A2548FCONT;
                objRtnGeneral.A2548FLAG = obj.A2548FLAG;
                objRtnGeneral.A2548IATA = obj.A2548IATA;
                objRtnGeneral.A2548FREGI = obj.A2548FREGI;
                objRtnGeneral.AGENCY = obj.AGENCY;
                objRtnGeneral.strNombreAgente = obj.strNombreAgente;
                objRtnGeneral.strDirecAgente = obj.strDirecAgente;
                objRtnGeneral.strZIPCOD = obj.strZIPCOD;
                objRtnGeneral.strDISTRI = obj.strDISTRI;
                objRtnGeneral.strDEPART = obj.strDEPART;
                objRtnGeneral.strCOUNTRY = obj.strCOUNTRY;
                objRtnGeneral.STRNOMAEREO = obj.STRNOMAEREO;

                //AEROLINEA
                objRtnGeneral.A2548TARIF = obj.A2548TARIF;
                objRtnGeneral.A2548TTAX = obj.A2548TTAX;
                objRtnGeneral.A2548SERVI = obj.A2548SERVI;
                objRtnGeneral.A2548IVACS = obj.A2548IVACS;
                objRtnGeneral.A2548COMIS = obj.A2548COMIS;
                objRtnGeneral.A2548SCOM = obj.A2548SCOM;
                objRtnGeneral.A2548TAXCM = obj.A2548TAXCM;
                objRtnGeneral.A2548PORCO = obj.A2548PORCO;
                objRtnGeneral.A2548PENAL = obj.A2548PENAL;
                objRtnGeneral.A2548FEE = obj.A2548FEE;
                //objRtnTkt.A2548TASAC = rs03.getString("A2548TASAC");
                objRtnGeneral.A2548TOTAL = obj.A2548TOTAL;

                //AGENCIA
                objRtnGeneral.A2548TARIA = obj.A2548TARIA;
                objRtnGeneral.A2548TTAXA = obj.A2548TTAXA;
                objRtnGeneral.A2548SERVA = obj.A2548SERVA;
                objRtnGeneral.A2548IVACA = obj.A2548IVACA;
                objRtnGeneral.A2548COMIA = obj.A2548COMIA;
                objRtnGeneral.A2548SCOMA = obj.A2548SCOMA;
                objRtnGeneral.A2548TAXCA = obj.A2548TAXCA;
                objRtnGeneral.A2548PORCA = obj.A2548PORCA;
                objRtnGeneral.A2548PENAA = obj.A2548PENAA;
                objRtnGeneral.A2548FEEA = obj.A2548FEEA;
                //objRtnTkt.A2548TASAA = rs03.getString("A2548TASAA");
                objRtnGeneral.A2548TOTAA = obj.A2548TOTAA;

                //DIFENRENCIAS
                objRtnGeneral.A2548TARID = obj.A2548TARID;
                objRtnGeneral.A2548TTAXD = obj.A2548TTAXD;
                objRtnGeneral.A2548SERVD = obj.A2548SERVD;
                objRtnGeneral.A2548IVACD = obj.A2548IVACD;
                objRtnGeneral.A2548COMID = obj.A2548COMID;
                objRtnGeneral.A2548SCOMD = obj.A2548SCOMD;
                objRtnGeneral.A2548TAXCD = obj.A2548TAXCD;
                objRtnGeneral.A2548PORCD = obj.A2548PORCD;
                objRtnGeneral.A2548PENAD = obj.A2548PENAD;
                objRtnGeneral.A2548FEED = obj.A2548FEED;
                objRtnGeneral.A2548TTACD = obj.A2548TTACD;
                objRtnGeneral.A2548TTAMD = obj.A2548TTAMD;
                objRtnGeneral.A2548TCARD = obj.A2548TCARD;
                //objRtnTkt.A2548TASAD = rs03.getString("A2548TASAD");
                objRtnGeneral.A2548TOTAD = obj.A2548TOTAD;
                objRtnGeneral.A2548NETO = obj.A2548NETO;

                while (rs01.next()) {

                    objRazones = new SQP00911();
                    objRazones.A2548CODR1 = rs01.getString("A2673CODE");
                    objRazones.A2548EMISION = rs01.getString("A2673ERROR");
                    objRazones.A2548DESC1 = rs01.getString("A2673TYPE");
                    objRtnGeneral.lst_razones.add(objRazones);

                }
                if (cstmt01.getMoreResults()) {
                    rs03 = cstmt01.getResultSet();
                    while (rs03.next()) {
                        objRtnTkt = new SQP00911();

                        objRtnTkt.A2548TIKET = rs03.getString("A2548TIKET");
                        objRtnTkt.A2548CDGT = rs03.getString("A2548CDGT");
                        objRtnTkt.A2548CODIT = rs03.getString("A2548CODIT");
                        objRtnTkt.A2548TRNCO = rs03.getString("A2548TRNCO");
                        objRtnTkt.A2548FVTA = rs03.getString("A2548FVTA");
                        objRtnTkt.A2548PAX = rs03.getString("A2548PAX");
                        objRtnTkt.A2548NETO = rs03.getDouble("A2548NETO");
                        objRtnGeneral.lst_TKT.add(objRtnTkt);
                        //
                        if (obj.A2548CATNNTD.equals(1)) {
                            filter2.TDNR = objRtnTkt.A2548TIKET;
                            filter2.COUNTRY = "US";
                            filter2.nombre = "";
                            filter2.CPUI = "";

                            masterDAO.setSession(this.session);
                            hmCiudades = masterDAO.loadCiudadesHash();
                            prorrateoDAO.setSession(this.session);
                            beanFaximil = prorrateoDAO.loadARCFacsimilProrate(session.getUserView().getCustomerInfo().CCUST, filter2, hmCiudades);
                        }

                    }
                }
                if (cstmt01.getMoreResults()) {
                    rs04 = cstmt01.getResultSet();
                    while (rs04.next()) {
                        lstImpu = new SQP00911();

                        lstImpu.A1673CDTAX = rs04.getString("A1673CDTAX");
                        lstImpu.A1673TXORI = rs04.getDouble("A1673TXORI");
                        lstImpu.A1673TXMIA = rs04.getDouble("A1673TXMIA");
                        lstImpu.A1673TXDIF = rs04.getDouble("A1673TXDIF");
                        objRtnGeneral.lstImpues.add(lstImpu);
                    }
                }
                lstGeneral.add(objRtnGeneral);
                cstmt01.close();
            } catch (SQLException e) {

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
                strSQL = null;
                session.getCNXIBMDB2().close();
                pasarGarbageCollector();
            }

        }
        return lstGeneral;

    }

    public List<SQP00911Filter> SearchDownloadASRPDF(SQP00911Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01781(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.OPCIONTYPE);
            cstmt01.setString(2, filter.COMBOBY);
            cstmt01.setString(3, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(4, filter.CIA);
            cstmt01.setString(5, filter.FORMA);
            cstmt01.setString(6, filter.SERIE);
            cstmt01.setString(7, filter.NUMBERADM);
            cstmt01.setString(8, filter.DATEFROM);
            cstmt01.setString(9, filter.DATETO);
            cstmt01.setString(10, filter.COUNTRY);
            cstmt01.setString(11, filter.CURRENCY);
            cstmt01.setString(12, filter.CHANNEL);
            cstmt01.setString(13, filter.AUTMAN);
            cstmt01.setString(14, filter.STATUS);
            cstmt01.setString(15, filter.COMBOCHANNEL);
            cstmt01.setString(16, filter.SEQ);
            cstmt01.setString(17, filter.CUPON);
            cstmt01.setString(18, filter.TRNCU);
            cstmt01.setString(19, filter.A2548CNXPA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548FTE = rs01.getString("A2548FTE");
                objRtn.A2548PAIS = rs01.getString("A2548PAIS");
                objRtn.A2548MDA = rs01.getString("A2548MDA");
                objRtn.A2548TRNCU = rs01.getString("A2548TRNCU");
                objRtn.A2548BASE = rs01.getString("A2548BASE");
                objRtn.A2548NMEMO = rs01.getString("A2548NMEMO");
                objRtn.A2548CNXPA = rs01.getString("A2548CNXPA");
                objRtn.A2548FCONT = rs01.getString("A2548FCONT");
                objRtn.A2548FLAG = rs01.getString("A2548FLAG");
                objRtn.A2548IATA = rs01.getString("A2548IATA");
                objRtn.A2548FREGI = rs01.getString("A2548FREGI");
                objRtn.A2548CATNNTD = rs01.getInt("A2548COUNT");
                objRtn.AGENCY = rs01.getString("AGENCY");
                objRtn.strNombreAgente = rs01.getString("STRNOMBREAGENTE");
                objRtn.strDirecAgente = rs01.getString("STRDIRECAGENTE");
                objRtn.strZIPCOD = rs01.getString("A003ZIPCOD");
                objRtn.strDISTRI = rs01.getString("A003DISTRI");
                objRtn.strDEPART = rs01.getString("A003DEPART");
                objRtn.strCOUNTRY = rs01.getString("A003PSALF");

                //AEROLINEA
                objRtn.A2548TARIF = rs01.getDouble("A2548TARIF");
                objRtn.A2548TTAX = rs01.getDouble("A2548TTAX");
                objRtn.A2548SERVI = rs01.getDouble("A2548SERVI");
                objRtn.A2548IVACS = rs01.getDouble("A2548IVACS");
                objRtn.A2548COMIS = rs01.getDouble("A2548COMIS");
                objRtn.A2548SCOM = rs01.getDouble("A2548SCOM");
                objRtn.A2548TAXCM = rs01.getDouble("A2548TAXCM");
                objRtn.A2548PORCO = rs01.getDouble("A2548PORCO");
                objRtn.A2548PENAL = rs01.getDouble("A2548PENAL");
                objRtn.A2548FEE = rs01.getDouble("A2548FEE");
                //objRtnTkt.A2548TASAC = rs03.getString("A2548TASAC");
                objRtn.A2548TOTAL = rs01.getDouble("A2548TOTAL");

                //AGENCIA
                objRtn.A2548TARIA = rs01.getDouble("A2548TARIA");
                objRtn.A2548TTAXA = rs01.getDouble("A2548TTAXA");
                objRtn.A2548SERVA = rs01.getDouble("A2548SERVA");
                objRtn.A2548IVACA = rs01.getDouble("A2548IVACA");
                objRtn.A2548COMIA = rs01.getDouble("A2548COMIA");
                objRtn.A2548SCOMA = rs01.getDouble("A2548SCOMA");
                objRtn.A2548TAXCA = rs01.getDouble("A2548TAXCA");
                objRtn.A2548PORCA = rs01.getDouble("A2548PORCA");
                objRtn.A2548PENAA = rs01.getDouble("A2548PENAA");
                objRtn.A2548FEEA = rs01.getDouble("A2548FEEA");
                //objRtnTkt.A2548TASAA = rs03.getString("A2548TASAA");
                objRtn.A2548TOTAA = rs01.getDouble("A2548TOTAA");

                //DIFENRENCIAS
                objRtn.A2548TARID = rs01.getDouble("A2548TARID");
                objRtn.A2548TTAXD = rs01.getDouble("A2548TTAXD");
                objRtn.A2548SERVD = rs01.getDouble("A2548SERVD");
                objRtn.A2548IVACD = rs01.getDouble("A2548IVACD");
                objRtn.A2548COMID = rs01.getDouble("A2548COMID");
                objRtn.A2548SCOMD = rs01.getDouble("A2548SCOMD");
                objRtn.A2548TAXCD = rs01.getDouble("A2548TAXCD");
                objRtn.A2548PORCD = rs01.getDouble("A2548PORCD");
                objRtn.A2548PENAD = rs01.getDouble("A2548PENAD");
                objRtn.A2548FEED = rs01.getDouble("A2548FEED");
                objRtn.A2548TTACD = rs01.getDouble("A2548TTACD");
                objRtn.A2548TTAMD = rs01.getDouble("A2548TTAMD");
                objRtn.A2548TCARD = rs01.getDouble("A2548TCARD");
                //objRtnTkt.A2548TASAD = rs03.getString("A2548TASAD");
                objRtn.A2548TOTAD = rs01.getDouble("A2548TOTAD");
                objRtn.A2548NETO = rs01.getDouble("A2548NETO");

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
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
