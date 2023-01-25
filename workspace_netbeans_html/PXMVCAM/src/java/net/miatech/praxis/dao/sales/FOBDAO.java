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
import net.miatech.beans.PX117A1728Filter;
import net.miatech.beans.PX117A1729Filter;
import net.miatech.beans.PX117S01A1728Filter;
import net.miatech.beans.PX117S03A1728Filter;
import net.miatech.beans.PX117S04A1728Filter;
import net.miatech.beans.PX117S2A1728Filter;
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
public class FOBDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public FOBDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FOBDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    /*
     * Carga el grid Principal FOB Report
     */
    public List<PX117A1728Filter> loadPX117A1728(PX117A1728Filter filter) throws SQLException, Exception {
        List<PX117A1728Filter> lstRtn = new ArrayList<PX117A1728Filter>(0);
        PX117A1728Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX117A1728(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1728CCUST);
            cstmt01.setString(2, filter.IN_A1728IATA);
            cstmt01.setString(3, filter.IN_A1728LOTE);
            cstmt01.setString(4, filter.IN_A1728FINI);
            cstmt01.setString(5, filter.IN_A1728FINI2);
            cstmt01.setString(6, filter.A1728STAT);
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
                objRtn = new PX117A1728Filter();
                objRtn.A1728CCUST = rs01.getString("A1728CCUST");
                objRtn.A1728IATA = rs01.getString("A1728IATA");
                objRtn.A1728LOTE = rs01.getString("A1728LOTE");
                objRtn.A1728FUENT = rs01.getString("A1728FUENT");
                objRtn.A1728SFUEN = rs01.getString("A1728SFUEN");
                objRtn.A1728TFUEN = rs01.getString("A1728TFUEN");
                objRtn.A1728FINI = rs01.getString("A1728FINI");
                objRtn.A1728FFIN = rs01.getString("A1728FFIN");
                objRtn.A1728STAT = rs01.getString("A1728STAT");
                objRtn.A1728UENV = rs01.getString("A1728UENV");
                objRtn.A1728FENV = rs01.getString("A1728FENV");
                objRtn.A1728HENV = rs01.getString("A1728HENV");
                objRtn.A1728STRC = rs01.getString("A1728STRC");
                objRtn.A1728UREC = rs01.getString("A1728UREC");
                objRtn.A1728FREC = rs01.getString("A1728FREC");
                objRtn.A1728HREC = rs01.getString("A1728HREC");
                objRtn.A1728TCAMB = rs01.getDouble("A1728TCAMB");
                objRtn.A1728TCOM = rs01.getDouble("A1728TCOM");
                objRtn.A1728TIVA = rs01.getDouble("A1728TIVA");
                objRtn.A1728TCOMI = rs01.getDouble("A1728TCOMI");
                objRtn.A1728TTCAS = rs01.getDouble("A1728TTCAS");
                objRtn.A1728TCAMC = rs01.getDouble("A1728TCAMC");
                objRtn.A1728FARE = rs01.getDouble("A1728FARE");
                objRtn.A1728OBSER = rs01.getString("A1728OBSER");
                objRtn.A003KEY3 = rs01.getString("A003KEY3");
                objRtn.A1728MDARV = rs01.getString("A1728MDARV");
                objRtn.A1728MDALC = rs01.getString("A1728MDALC");
                objRtn.A1757INDCO = rs01.getString("A1757INDCO");
                objRtn.A1728FACUS = rs01.getString("A1728FACUS");
                objRtn.A1728HACUS = rs01.getString("A1728HACUS");
                objRtn.A1757INDAP = rs01.getString("A1757INDAP");
                objRtn.ACUSE = rs01.getString("ACUSE");
                objRtn.A1728REFER = rs01.getString("A1728REFER");
                objRtn.A1728FVIGF = rs01.getString("A1728FVIGF");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            String err = ex.getMessage();
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

    public List<PX117A1729Filter> loadPX117A1729(PX117A1729Filter filter) throws SQLException, Exception {
        List<PX117A1729Filter> lstRtn = new ArrayList<PX117A1729Filter>(0);
        PX117A1729Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX117A1729(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_A1729CCUST);
            cstmt01.setString(3, filter.IN_A1729IATA);
            cstmt01.setString(4, filter.IN_A1729LOTE);
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
                objRtn = new PX117A1729Filter();
                objRtn.A1729CCUST = rs01.getString("A1729CCUST");
                objRtn.A1729SOURC = rs01.getString("A1729SOURC");
                objRtn.A1729LOTE = rs01.getString("A1729LOTE");
                objRtn.A1729CIA = rs01.getString("A1729CIA");
                objRtn.A1729FORMA = rs01.getString("A1729FORMA");
                objRtn.A1729SERIE = rs01.getString("A1729SERIE");
                objRtn.TKT = rs01.getString("TKT");
                objRtn.A1729CUPON = rs01.getString("A1729CUPON");
                objRtn.A1729FLAG = rs01.getString("A1729FLAG");
                objRtn.A1729SECU = rs01.getString("A1729SECU");
                objRtn.A1729IATA = rs01.getString("A1729IATA");
                objRtn.A1729GRUPO = rs01.getString("A1729GRUPO");
                objRtn.A1729IDFIL = rs01.getString("A1729IDFIL");
                objRtn.A1729TCAMB = rs01.getDouble("A1729TCAMB");
                objRtn.A1729FECVT = rs01.getString("A1729FECVT");
                objRtn.A1729TRNCU = rs01.getString("A1729TRNCU");
                objRtn.A1729CODIT = rs01.getString("A1729CODIT");
                objRtn.A1729CFOP = rs01.getString("A1729CFOP");
                objRtn.A1729PCSC = rs01.getDouble("A1729PCSC");
                objRtn.A1729ACSC = rs01.getDouble("A1729ACSC");
                objRtn.A1729CARR = rs01.getString("A1729CARR");
                objRtn.A1729FBAS = rs01.getString("A1729FBAS");
                objRtn.A1729CLAS = rs01.getString("A1729CLAS");
                objRtn.A1729FARE = rs01.getDouble("A1729FARE");
                objRtn.A1729MDAFA = rs01.getString("A1729MDAFA");
                objRtn.A1729ADC = rs01.getDouble("A1729ADC");
                objRtn.A1729MDAAD = rs01.getString("A1729MDAAD");
                objRtn.A1729OBSER = rs01.getString("A1729OBSER");
                objRtn.A1729FREGI = rs01.getString("A1729FREGI");
                objRtn.A1729ACCOD = rs01.getString("A1729ACCOD");
                objRtn.A1729VCPN = rs01.getDouble("A1729VCPN");

                objRtn.A1729POCAN = rs01.getDouble("A1729POCAN");
                objRtn.A1729OCAN = rs01.getDouble("A1729OCAN");
                objRtn.A1729OCANR = rs01.getDouble("A1729OCANR");
                objRtn.A1729COCAR = rs01.getDouble("A1729COCAR");
                objRtn.A1729IATAE = rs01.getString("A1729IATAE");
                objRtn.A1729CCST = rs01.getString("A1729CCST");
                objRtn.A1729AGRAN = rs01.getString("A1729AGRAN");

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
     * Actualiza ACUSE 
     */
    public PX117S2A1728Filter setPX117S2A1728(PX117S2A1728Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PX117S2A1728(?,?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);                      
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);

            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, filter.VP_A1728CCUST);
            cstmt.setString(3, filter.VP_A1728IATA);
            cstmt.setString(4, filter.VP_A1728LOTE);
            cstmt.setString(5, filter.VP_A1728FACUS);
            cstmt.setString(6, filter.VP_A1728HACUS);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(7);
            filter.dbException.MESSAGE = cstmt.getString(8);

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

    /*
     * Recupera Datos de Envio 
     */
    public List<PX117S04A1728Filter> loadPX117S04A1728(PX117S04A1728Filter filter) throws SQLException, Exception {
        List<PX117S04A1728Filter> lstRtn = new ArrayList<PX117S04A1728Filter>(0);
        PX117S04A1728Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX117S04A1728(?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_A1728CCUST);
            cstmt01.setString(2, filter.VP_A1728IATA);
            cstmt01.setString(3, filter.VP_A1728LOTE);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new PX117S04A1728Filter();
                objRtn.A1728IATA = rs01.getString("A1728IATA");
                objRtn.A1728LOTE = rs01.getString("A1728LOTE");
                objRtn.A1728FINI = rs01.getString("A1728FINI");
                objRtn.A1728FFIN = rs01.getString("A1728FFIN");
                objRtn.A1728FUENT = rs01.getString("A1728FUENT");
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
    public PX117S04A1728Filter loadDataEnvioMail(PX117S04A1728Filter filter) throws SQLException, Exception {
        PX117S04A1728Filter beanDataMail = new PX117S04A1728Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX117S04A1728(?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_A1728CCUST);
            cstmt01.setString(2, filter.VP_A1728IATA);
            cstmt01.setString(3, filter.VP_A1728LOTE);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                beanDataMail = new PX117S04A1728Filter();
                beanDataMail.A1728IATA = rs01.getString("A1728IATA");
                beanDataMail.A1728LOTE = rs01.getString("A1728LOTE");
                beanDataMail.A1728FINI = rs01.getString("A1728FINI");
                beanDataMail.A1728FFIN = rs01.getString("A1728FFIN");
                beanDataMail.A1728FUENT = rs01.getString("A1728FUENT");
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
    public PX117S03A1728Filter loadPX117S03A1728(PX117S03A1728Filter filter) throws SQLException, Exception {
        PX117S03A1728Filter beanData = new PX117S03A1728Filter();

        List<PX117A1729Filter> lstRws = new ArrayList<PX117A1729Filter>();
        PX117A1729Filter regA1729;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        int rTotal;

        String SQLCLL01 = "{CALL PX117S03A1728(?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_A1728CCUST);
            cstmt01.setString(2, filter.VP_A1728IATA);
            cstmt01.setString(3, filter.VP_A1728LOTE);
            cstmt01.execute();
            // Datos de Cabecera            
            rs01 = cstmt01.getResultSet();
            rTotal = 0;
            while (rs01.next()) {
                rTotal++;
                if (rTotal == 1) {  // Datos de Cabecera
                    beanData = new PX117S03A1728Filter();
                    beanData.A1728IATA = rs01.getString("A1728IATA");
                    beanData.A003KEY1 = rs01.getString("A003KEY1");
                    beanData.A1728LOTE = rs01.getString("A1728LOTE");
                    beanData.A1728FINI = rs01.getString("A1728FINI");
                    beanData.A1728FFIN = rs01.getString("A1728FFIN");
                    beanData.A1728TCAMB = rs01.getDouble("A1728TCAMB");
                    beanData.A1728MDARV = rs01.getString("A1728MDARV");
                    beanData.A1728MDALC = rs01.getString("A1728MDALC");
                    beanData.A1728FARE = rs01.getDouble("A1728FARE");
                    beanData.A1728TCOM = rs01.getDouble("A1728TCOM");
                    beanData.A1728TIVA = rs01.getDouble("A1728TIVA");
                    beanData.A1728TCOMI = rs01.getDouble("A1728TCOMI");
                    beanData.A1728TTCAS = rs01.getDouble("A1728TTCAS");
                    beanData.A1728TCAMC = rs01.getDouble("A1728TCAMC");
                    beanData.A1728FENV = rs01.getString("A1728FENV");
                }
                regA1729 = new PX117A1729Filter();
                regA1729.TKT = rs01.getString("TKT");
                regA1729.A1729CUPON = rs01.getString("A1729CUPON");
                regA1729.A1729SECU = rs01.getString("A1729SECU");
                regA1729.A1729FLAG = rs01.getString("A1729FLAG");
                regA1729.A1729IATAE = rs01.getString("A1729IATAE");
                regA1729.A1729MDALC = rs01.getString("A1729MDALC");
                regA1729.A1729TCAMB = rs01.getDouble("A1729TCAMB");
                regA1729.A1729MDARV = rs01.getString("A1729MDARV");
                regA1729.A1729FECVT = rs01.getString("A1729FECVT");
                regA1729.A1729FUSO = rs01.getString("A1729FUSO");
                regA1729.A1729TRNCU = rs01.getString("A1729TRNCU");
                regA1729.A1729CODIT = rs01.getString("A1729CODIT");
                regA1729.A1729CFOP = rs01.getString("A1729CFOP");
                regA1729.A1729TTARJ = rs01.getString("A1729TTARJ");
                regA1729.A1729VCPN = rs01.getDouble("A1729VCPN");
                regA1729.A1729ACSC = rs01.getDouble("A1729ACSC");
                regA1729.A1729ORIG = rs01.getString("A1729ORIG");
                regA1729.A1729DEST = rs01.getString("A1729DEST");
                regA1729.A1729CARR = rs01.getString("A1729CARR");
                regA1729.A1729NVLO = rs01.getString("A1729NVLO");
                regA1729.A1729FBAS = rs01.getString("A1729FBAS");
                regA1729.A1729CLAS = rs01.getString("A1729CLAS");
                regA1729.A1729PCSC = rs01.getDouble("A1729PCSC");
                regA1729.A1729CCST = rs01.getString("A1729CCST");
                regA1729.A1729POCAN = rs01.getDouble("A1729POCAN");
                regA1729.A1729OCAN = rs01.getDouble("A1729OCAN");
                regA1729.A1729OCANR = rs01.getDouble("A1729OCANR");
                regA1729.A1729COCAR = rs01.getDouble("A1729COCAR");
                regA1729.A1729LOTE = rs01.getString("A1729LOTE");
                regA1729.A1729IATA = rs01.getString("A1729IATA");
                regA1729.A1729AGRAN = rs01.getString("A1729AGRAN");

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
    public PX117S01A1728Filter setPX117S01A1728(PX117S01A1728Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PX117S01A1728(?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(6, Types.VARCHAR);
            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, filter.VP_A1757CCUST);
            cstmt.setString(3, filter.VP_A1757IATA);
            cstmt.setString(4, filter.VP_A1757LOTE);
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
    
//    NEW. VH
    public List<PX117A1729Filter> loadSQP02647(PX117A1729Filter filter) throws SQLException, Exception {
        List<PX117A1729Filter> lstRtn = new ArrayList<PX117A1729Filter>(0);
        PX117A1729Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP02647(?,?,?,?,?,?,?)}";
        Connection cnx = null; 
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);            
            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_A1729CCUST);            
            cstmt01.setString(3, filter.IN_A1729LOTE);            
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
                objRtn = new PX117A1729Filter();
                objRtn.A1729CCUST = rs01.getString("A1729CCUST");
                objRtn.A1729SOURC = rs01.getString("A1729SOURC");
                objRtn.A1729LOTE = rs01.getString("A1729LOTE");
                objRtn.A1729CIA = rs01.getString("A1729CIA");
                objRtn.A1729FORMA = rs01.getString("A1729FORMA");
                objRtn.A1729SERIE = rs01.getString("A1729SERIE");
                objRtn.TKT = rs01.getString("TKT");
                objRtn.A1729CUPON = rs01.getString("A1729CUPON");
                objRtn.A1729FLAG = rs01.getString("A1729FLAG");
                objRtn.A1729SECU = rs01.getString("A1729SECU");
                objRtn.A1729IATA = rs01.getString("A1729IATA");
                objRtn.A1729GRUPO = rs01.getString("A1729GRUPO");
                objRtn.A1729IDFIL = rs01.getString("A1729IDFIL");
                objRtn.A1729TCAMB = rs01.getDouble("A1729TCAMB");
                objRtn.A1729FECVT = rs01.getString("A1729FECVT");
                objRtn.A1729TRNCU = rs01.getString("A1729TRNCU");
                objRtn.A1729CODIT = rs01.getString("A1729CODIT");
                objRtn.A1729CFOP = rs01.getString("A1729CFOP");
                objRtn.A1729PCSC = rs01.getDouble("A1729PCSC");
                objRtn.A1729ACSC = rs01.getDouble("A1729ACSC");
                objRtn.A1729CARR = rs01.getString("A1729CARR");
                objRtn.A1729FBAS = rs01.getString("A1729FBAS");
                objRtn.A1729CLAS = rs01.getString("A1729CLAS");
                objRtn.A1729FARE = rs01.getDouble("A1729FARE");
                objRtn.A1729MDAFA = rs01.getString("A1729MDAFA");
                objRtn.A1729ADC = rs01.getDouble("A1729ADC");
                objRtn.A1729MDAAD = rs01.getString("A1729MDAAD");
                objRtn.A1729OBSER = rs01.getString("A1729OBSER");
                objRtn.A1729FREGI = rs01.getString("A1729FREGI");
                objRtn.A1729ACCOD = rs01.getString("A1729ACCOD");
                objRtn.A1729VCPN = rs01.getDouble("A1729VCPN");
                objRtn.A1729POCAN = rs01.getDouble("A1729POCAN");
                objRtn.A1729OCAN = rs01.getDouble("A1729OCAN");
                objRtn.A1729OCANR = rs01.getDouble("A1729OCANR");
                objRtn.A1729COCAR = rs01.getDouble("A1729COCAR");
                objRtn.A1729IATAE = rs01.getString("A1729IATAE");
                objRtn.A1729CCST = rs01.getString("A1729CCST");
                objRtn.A1729AGRAN = rs01.getString("A1729AGRAN");
                objRtn.A1729ORIG = rs01.getString("A1729ORIG");
                objRtn.A1729DEST = rs01.getString("A1729DEST");                
//                //new NO ESTA EN PROD
//                objRtn.A1729POCCA = rs01.getDouble("A1729POCCA");
//                objRtn.A1729COCCR = rs01.getDouble("A1729COCCR");
//                objRtn.A1729AGRCA = rs01.getString("A1729AGRCA");                
//                objRtn.A1729MDCA = rs01.getString("A1729MDCA");
//                objRtn.A1729OCCA = rs01.getDouble("A1729OCCA");
//                objRtn.A1729OCCAR = rs01.getDouble("A1729OCCAR");
                
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
}
