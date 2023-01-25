/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SQP00790Filter;
import net.miatech.beans.SQP00791Filter;
import net.miatech.beans.SQP00792Filter;
import net.miatech.beans.SQP00793Filter;
import net.miatech.beans.SQP00794Filter;
import net.miatech.beans.SQP00795Filter;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00806Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ConsortiaDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ConsortiaDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ConsortiaDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    /*
     * Carga el grid Principal FOB Report
     */
    public List<SQP00790Filter> loadPX117A1728(SQP00790Filter filter) throws SQLException, Exception {
        List<SQP00790Filter> lstRtn = new ArrayList<SQP00790Filter>(0);
        SQP00790Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP00790(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A2444CCUST);
            cstmt01.setString(2, filter.IN_A2444IATA);
            cstmt01.setString(3, filter.IN_A2444LOTE);
            cstmt01.setString(4, filter.IN_A2444FINI);
            cstmt01.setString(5, filter.IN_A2444FINI2);
            cstmt01.setString(6, filter.A2444STAT);
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
            while (rs01.next()) {
                objRtn = new SQP00790Filter();                
                objRtn.A2444CCUST = rs01.getString("A2444CCUST");
                objRtn.A2444IATA = rs01.getString("A2444IATA");
                objRtn.A2444LOTE = rs01.getString("A2444LOTE");
                objRtn.A2444FUENT = rs01.getString("A2444FUENT");
                objRtn.A2444SFUEN = rs01.getString("A2444SFUEN");
                objRtn.A2444TFUEN = rs01.getString("A2444TFUEN");
                objRtn.A2444FINI = rs01.getString("A2444FINI");
                objRtn.A2444FFIN = rs01.getString("A2444FFIN");
                objRtn.A2444STAT = rs01.getString("A2444STAT");
                objRtn.A2444UENV = rs01.getString("A2444UENV");
                objRtn.A2444FENV = rs01.getString("A2444FENV");
                objRtn.A2444HENV = rs01.getString("A2444HENV");
                objRtn.A2444STRC = rs01.getString("A2444STRC");
                objRtn.A2444UREC = rs01.getString("A2444UREC");
                objRtn.A2444FREC = rs01.getString("A2444FREC");
                objRtn.A2444HREC = rs01.getString("A2444HREC");
                objRtn.A2444TCAMB = rs01.getDouble("A2444TCAMB");
                objRtn.A2444TCOM = rs01.getDouble("A2444TCOM");
                objRtn.A2444TIVA = rs01.getDouble("A2444TIVA");
                objRtn.A2444TCOMI = rs01.getDouble("A2444TCOMI");
                objRtn.A2444TTCAS = rs01.getDouble("A2444TTCAS");
                objRtn.A2444TCAMC = rs01.getDouble("A2444TCAMC");
                objRtn.A2444FARE = rs01.getDouble("A2444FARE");
                objRtn.A2444OBSER = rs01.getString("A2444OBSER");
                objRtn.A003KEY3 = rs01.getString("A003KEY3");
                objRtn.A2444MDARV = rs01.getString("A2444MDARV");
                objRtn.A2447INDCO = rs01.getString("A2447INDCO");
                objRtn.A2444FACUS  = rs01.getString("A2444FACUS");
                objRtn.A2444HACUS = rs01.getString("A2444HACUS");
                objRtn.A2447INDAP = rs01.getString("A2447INDAP");
                objRtn.A2444OTHCH = rs01.getDouble("A2444OTHCH");
                objRtn.A2444BANKC = rs01.getDouble("A2444BANKC");
                objRtn.A2444OTHBK = rs01.getDouble("A2444OTHBK");
                objRtn.A2444IVA16 = rs01.getDouble("A2444IVA16");
                objRtn.A2444OBK16 = rs01.getDouble("A2444OBK16");
                objRtn.ACUSE = rs01.getString("ACUSE");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
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

    public List<SQP00792Filter> loadPX117A1729(SQP00792Filter filter) throws SQLException, Exception {
        List<SQP00792Filter> lstRtn = new ArrayList<SQP00792Filter>(0);
        SQP00792Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP00792(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_A2445CCUST);
            cstmt01.setString(3, filter.IN_A2445IATA);
            cstmt01.setString(4, filter.IN_A2445LOTE);
            cstmt01.setString(5, filter.IN_TKT);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00792Filter();
                objRtn.A2445CCUST = rs01.getString("A2445CCUST");
                objRtn.A2445SOURC = rs01.getString("A2445SOURC");
                objRtn.A2445LOTE = rs01.getString("A2445LOTE");
                objRtn.A2445CIA = rs01.getString("A2445CIA");
                objRtn.A2445FORMA = rs01.getString("A2445FORMA");
                objRtn.A2445SERIE = rs01.getString("A2445SERIE");
                objRtn.TKT = rs01.getString("TKT");
                objRtn.A2445CUPON = rs01.getString("A2445CUPON");
                objRtn.A2445FLAG = rs01.getString("A2445FLAG");
                objRtn.A2445SECU = rs01.getString("A2445SECU");
                objRtn.A2445IATA = rs01.getString("A2445IATA");
                objRtn.A2445GRUPO = rs01.getString("A2445GRUPO");
                objRtn.A2445IDFIL = rs01.getString("A2445IDFIL");
                objRtn.A2445TCAMB = rs01.getDouble("A2445TCAMB");
                objRtn.A2445FECVT = rs01.getString("A2445FECVT");
                objRtn.A2445TRNCU = rs01.getString("A2445TRNCU");
                objRtn.A2445CODIT = rs01.getString("A2445CODIT");
                objRtn.A2445CFOP = rs01.getString("A2445CFOP");
                objRtn.A2445PCSC = rs01.getDouble("A2445PCSC");
                objRtn.A2445ACSC = rs01.getDouble("A2445ACSC");
                objRtn.A2445CARR = rs01.getString("A2445CARR");
                objRtn.A2445FBAS = rs01.getString("A2445FBAS");
                objRtn.A2445CLAS = rs01.getString("A2445CLAS");
                objRtn.A2445FARE = rs01.getDouble("A2445FARE");
                objRtn.A2445MDAFA = rs01.getString("A2445MDAFA");
                objRtn.A2445ADC = rs01.getDouble("A2445ADC");
                objRtn.A2445MDAAD = rs01.getString("A2445MDAAD");
                objRtn.A2445OBSER = rs01.getString("A2445OBSER");
                objRtn.A2445FREGI = rs01.getString("A2445FREGI");
                objRtn.A2445ACCOD = rs01.getString("A2445ACCOD");
                objRtn.A2445VCPN = rs01.getDouble("A2445VCPN");

                objRtn.A2445POCAN = rs01.getDouble("A2445POCAN");
                objRtn.A2445OCAN = rs01.getDouble("A2445OCAN");
                objRtn.A2445OCANR = rs01.getDouble("A2445OCANR");
                objRtn.A2445COCAR = rs01.getDouble("A2445COCAR");
                objRtn.A2445IATAE = rs01.getString("A2445IATAE");
                objRtn.A2445CCST = rs01.getString("A2445CCST");
                objRtn.A2445AGRAN = rs01.getString("A2445AGRAN");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
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

    /*
     * Recupera Datos de Envio 
     */
    public List<SQP00794Filter> loadPX117S04A1728(SQP00794Filter filter) throws SQLException, Exception {
        List<SQP00794Filter> lstRtn = new ArrayList<>(0);
        SQP00794Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP01189(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_A2444CCUST);
            cstmt01.setString(2, filter.VP_A2444IATA);
            cstmt01.setString(3, filter.VP_A2444LOTE);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new SQP00794Filter();
                objRtn.A2444IATA = rs01.getString("A2444IATA");
                objRtn.A2444LOTE = rs01.getString("A2444LOTE");
                objRtn.A2444FINI = rs01.getString("A2444FINI");
                objRtn.A2444FFIN = rs01.getString("A2444FFIN");
                objRtn.A2444FUENT = rs01.getString("A2444FUENT");
                objRtn.A003KEY1 = rs01.getString("A003KEY1");
                objRtn.A003MAIL = rs01.getString("A003MAIL");
                objRtn.EmailCcp = rs01.getString("EmailCcp");
                objRtn.EmailRe = rs01.getString("EmailRe");
                objRtn.Asunto = rs01.getString("Asunto");
                objRtn.Mensaje = rs01.getString("Mensaje");

                lstRtn.add(objRtn);
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

    /*Datos para envio del Mail
     */
    public SQP00794Filter loadDataEnvioMail(SQP00794Filter filter) throws SQLException, Exception {
        SQP00794Filter beanDataMail = new SQP00794Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP01189(?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_A2444CCUST);
            cstmt01.setString(2, filter.VP_A2444IATA);
            cstmt01.setString(3, filter.VP_A2444LOTE);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                beanDataMail = new SQP00794Filter();
                beanDataMail.A2444IATA = rs01.getString("A2444IATA");
                beanDataMail.A2444LOTE = rs01.getString("A2444LOTE");
                beanDataMail.A2444FINI = rs01.getString("A2444FINI");
                beanDataMail.A2444FFIN = rs01.getString("A2444FFIN");
                beanDataMail.A2444FUENT = rs01.getString("A2444FUENT");
                beanDataMail.A003KEY1 = rs01.getString("A003KEY1");
                beanDataMail.A003MAIL = rs01.getString("A003MAIL");
                beanDataMail.EmailCcp = rs01.getString("EmailCcp");
                beanDataMail.EmailRe = rs01.getString("EmailRe");
                beanDataMail.Asunto = rs01.getString("Asunto");
                beanDataMail.Mensaje = rs01.getString("Mensaje");
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
        return beanDataMail;
    }

    /* Genera Reporte PDF
     */
    public SQP00795Filter loadPX117S03A1728(SQP00795Filter filter) throws SQLException, Exception {
        SQP00795Filter beanData = new SQP00795Filter();

        List<SQP00792Filter> lstRws = new ArrayList<>();
        SQP00792Filter regA1729;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        int rTotal;

        String SQLCLL01 = "{CALL SQP00795(?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_A2444CCUST);
            cstmt01.setString(2, filter.VP_A2444IATA);
            cstmt01.setString(3, filter.VP_A2444LOTE);
            cstmt01.execute();
            // Datos de Cabecera            
            rs01 = cstmt01.getResultSet();
            rTotal = 0;
            while (rs01.next()) {
                rTotal++;
                if (rTotal == 1) {  // Datos de Cabecera
                    beanData = new SQP00795Filter();
                    beanData.A2444IATA  = rs01.getString("A2444IATA");
                    beanData.A003KEY1   = rs01.getString("A003KEY1");
                    beanData.A2444LOTE  = rs01.getString("A2444LOTE");  
                    beanData.A2444FINI  = rs01.getString("A2444FINI");  
                    beanData.A2444FFIN  = rs01.getString("A2444FFIN");                
                    beanData.A2444TCAMB  = rs01.getDouble("A2444TCAMB");
                    beanData.A2444MDARV  = rs01.getString("A2444MDARV");                
                    beanData.A2444FARE  = rs01.getDouble("A2444FARE");
                    beanData.A2444TCOM  = rs01.getDouble("A2444TCOM");                
                    beanData.A2444TIVA  = rs01.getDouble("A2444TIVA");
                    beanData.A2444TCOMI  = rs01.getDouble("A2444TCOMI");
                    beanData.A2444TTCAS  = rs01.getDouble("A2444TTCAS");
                    beanData.A2444TCAMC  = rs01.getDouble("A2444TCAMC"); 
                    beanData.A2444FENV  = rs01.getString("A2444FENV");
                    beanData.A2444OTHCH  = rs01.getDouble("A2444OTHCH"); 
                    beanData.A2444BANKC  = rs01.getDouble("A2444BANKC"); 
                    beanData.A2444OTHBK  = rs01.getDouble("A2444OTHBK"); 
                    beanData.A2444IVA16  = rs01.getDouble("A2444IVA16"); 
                    beanData.A2444OBK16  = rs01.getDouble("A2444OBK16");
                }
                regA1729 = new SQP00792Filter();
                regA1729.TKT = rs01.getString("TKT");
                regA1729.A2445CUPON = rs01.getString("A2445CUPON");
                regA1729.A2445SECU = rs01.getString("A2445SECU");
                regA1729.A2445FLAG = rs01.getString("A2445FLAG");
                regA1729.A2445IATAE = rs01.getString("A2445IATAE");
                regA1729.A2445MDALC = rs01.getString("A2445MDALC");
                regA1729.A2445TCAMB = rs01.getDouble("A2445TCAMB");
                regA1729.A2445MDARV = rs01.getString("A2445MDARV");
                regA1729.A2445FECVT = rs01.getString("A2445FECVT");
                regA1729.A2445FUSO = rs01.getString("A2445FUSO");
                regA1729.A2445TRNCU = rs01.getString("A2445TRNCU");
                regA1729.A2445CODIT = rs01.getString("A2445CODIT");
                regA1729.A2445CFOP = rs01.getString("A2445CFOP");
                regA1729.A2445TTARJ = rs01.getString("A2445TTARJ");
                regA1729.A2445VCPN = rs01.getDouble("A2445VCPN");
                regA1729.A2445ACSC = rs01.getDouble("A2445ACSC");
                regA1729.A2445ORIG = rs01.getString("A2445ORIG");
                regA1729.A2445DEST = rs01.getString("A2445DEST");
                regA1729.A2445CARR = rs01.getString("A2445CARR");
                regA1729.A2445NVLO = rs01.getString("A2445NVLO");
                regA1729.A2445FBAS = rs01.getString("A2445FBAS");
                regA1729.A2445CLAS = rs01.getString("A2445CLAS");
                regA1729.A2445PCSC = rs01.getDouble("A2445PCSC");
                regA1729.A2445CCST = rs01.getString("A2445CCST");
                regA1729.A2445POCAN = rs01.getDouble("A2445POCAN");
                regA1729.A2445OCAN = rs01.getDouble("A2445OCAN");
                regA1729.A2445OCANR = rs01.getDouble("A2445OCANR");
                regA1729.A2445COCAR = rs01.getDouble("A2445COCAR");
                regA1729.A2445LOTE = rs01.getString("A2445LOTE");
                regA1729.A2445IATA = rs01.getString("A2445IATA");
                regA1729.A2445AGRAN = rs01.getString("A2445AGRAN");

                lstRws.add(regA1729);
            }
            beanData.lstRws = lstRws;

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
        return beanData;
    }

    /*
     * Actualiza envio de reporte a las Franquicias
     * Proceso Individual
     */
    public SQP00791Filter setPX117S01A1728(SQP00791Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL SQP00791(?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(6, Types.VARCHAR);
            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, filter.VP_A2447CCUST);
            cstmt.setString(3, filter.VP_A2447IATA);
            cstmt.setString(4, filter.VP_A2447LOTE);
            cstmt.setString(5, filter.VP_TIPO_ENVIO);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(6);
            filter.dbException.MESSAGE = cstmt.getString(7);
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //session.getCNXIBMDB2().open();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
      /*
     * Actualiza ACUSE 
     */
    public SQP00793Filter  setPX117S2A1728( SQP00793Filter filter ) throws SQLException, Exception {        
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL SQP00793(?,?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);                      
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt = cnx.prepareCall(SQLCLL01); 
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.VP_A2444CCUST );
            cstmt.setString(3, filter.VP_A2444IATA );            
            cstmt.setString(4, filter.VP_A2444LOTE);  
            cstmt.setString(5, filter.VP_A2444FACUS );
            cstmt.setString(6, filter.VP_A2444HACUS );            
            cstmt.execute();                        
            filter.dbException.SQLCODE = cstmt.getString(7);
            filter.dbException.MESSAGE = cstmt.getString(8); 
            
        } finally {
            if (cstmt != null) {                
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public List<SQP00792Filter> downLoadDetalleCTIA(SQP00792Filter filter) throws SQLException, Exception {   
        List<SQP00792Filter> lstRtn = new ArrayList<SQP00792Filter>(0);
        SQP00792Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP02650(?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            
            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_A2445CCUST);
            cstmt01.setString(3, filter.IN_A2445LOTE);
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
            while (rs01.next()) {
                objRtn = new SQP00792Filter();                
                objRtn.A2445CCUST = rs01.getString("A2445CCUST");
                objRtn.A2445SOURC = rs01.getString("A2445SOURC");
                objRtn.A2445LOTE = rs01.getString("A2445LOTE");
                objRtn.A2445CIA = rs01.getString("A2445CIA");
                objRtn.A2445FORMA = rs01.getString("A2445FORMA");
                objRtn.A2445SERIE = rs01.getString("A2445SERIE");
                objRtn.TKT = rs01.getString("TKT");
                objRtn.A2445CUPON = rs01.getString("A2445CUPON");
                objRtn.A2445FLAG = rs01.getString("A2445FLAG");
                objRtn.A2445SECU = rs01.getString("A2445SECU");
                objRtn.A2445IATA = rs01.getString("A2445IATA");
                objRtn.A2445GRUPO = rs01.getString("A2445GRUPO");
                objRtn.A2445IDFIL = rs01.getString("A2445IDFIL");
                objRtn.A2445TCAMB = rs01.getDouble("A2445TCAMB");
                objRtn.A2445FECVT = rs01.getString("A2445FECVT");
                objRtn.A2445TRNCU = rs01.getString("A2445TRNCU");
                objRtn.A2445CODIT = rs01.getString("A2445CODIT");
                objRtn.A2445CFOP = rs01.getString("A2445CFOP");
                objRtn.A2445PCSC = rs01.getDouble("A2445PCSC");
                objRtn.A2445ACSC = rs01.getDouble("A2445ACSC");
                objRtn.A2445CARR = rs01.getString("A2445CARR");
                objRtn.A2445FBAS = rs01.getString("A2445FBAS");
                objRtn.A2445CLAS = rs01.getString("A2445CLAS");
                objRtn.A2445FARE = rs01.getDouble("A2445FARE");
                objRtn.A2445MDAFA = rs01.getString("A2445MDAFA");
                objRtn.A2445ADC = rs01.getDouble("A2445ADC");
                objRtn.A2445MDAAD = rs01.getString("A2445MDAAD");
                objRtn.A2445OBSER = rs01.getString("A2445OBSER");
                objRtn.A2445FREGI = rs01.getString("A2445FREGI");
                objRtn.A2445ACCOD = rs01.getString("A2445ACCOD");
                objRtn.A2445VCPN = rs01.getDouble("A2445VCPN");
                
                objRtn.A2445POCAN = rs01.getDouble("A2445POCAN");
                objRtn.A2445OCAN = rs01.getDouble("A2445OCAN");
                objRtn.A2445OCANR = rs01.getDouble("A2445OCANR");
                objRtn.A2445COCAR = rs01.getDouble("A2445COCAR");
                objRtn.A2445IATAE = rs01.getString("A2445IATAE");
                objRtn.A2445CCST = rs01.getString("A2445CCST");
                objRtn.A2445AGRAN = rs01.getString("A2445AGRAN");
                objRtn.A2445ORIG = rs01.getString("A2445ORIG");
                objRtn.A2445DEST = rs01.getString("A2445DEST");
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
}
