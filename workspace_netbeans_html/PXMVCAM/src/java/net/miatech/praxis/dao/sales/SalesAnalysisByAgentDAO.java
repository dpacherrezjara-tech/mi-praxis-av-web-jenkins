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
import net.miatech.beans.SQP01237BFilter;
import net.miatech.beans.SQP01237Filter;
import net.miatech.beans.SQP01267Filter;
import net.miatech.beans.SQP01500Filter;
import net.miatech.beans.SQP01512Filter;
import net.miatech.beans.SQP01536Filter;
import net.miatech.beans.SQP01548Filter;
import net.miatech.beans.SQP01970Filter;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class SalesAnalysisByAgentDAO {
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }
   
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
    public List<SQP01500Filter> getSQP01500Filter(SQP01500Filter filter) throws SQLException, Exception {
        List<SQP01500Filter> lstRtn = new ArrayList<SQP01500Filter>(0);
        SQP01500Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP01500(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_ANIO);
            cstmt01.setString(4, filter.VP_SFTE);
            cstmt01.setString(5, filter.VP_TRNC);
            cstmt01.setString(6, filter.VP_IATA);
            cstmt01.setString(7, filter.VP_PSVTA);
            cstmt01.setString(8, filter.VP_PARM1);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01500Filter();
                objRtn.A2775IATA = rs01.getString("A2775IATA");
                objRtn.A2775FTE = rs01.getString("A2775FTE");
                objRtn.A2775NAME = rs01.getString("A2775NAME");
                objRtn.A2775SFTE = "";
                if (objRtn.A2775FTE.equals("ASR")) {
                    objRtn.A2775SFTE = rs01.getString("A2775SFTE");
                }

                objRtn.A2775PAISE = rs01.getString("A2775PAISE");
                objRtn.A2775STAT = rs01.getString("A2775STAT");
                objRtn.A2775ANIO = rs01.getString("A2775ANIO");
                objRtn.A2775TOTAL = rs01.getDouble("A2775TOTAL");
                objRtn.A2775ENE = rs01.getDouble("A2775ENE");
                objRtn.A2775FEB = rs01.getDouble("A2775FEB");
                objRtn.A2775MAR = rs01.getDouble("A2775MAR");
                objRtn.A2775ABR = rs01.getDouble("A2775ABR");
                objRtn.A2775MAY = rs01.getDouble("A2775MAY");
                objRtn.A2775JUN = rs01.getDouble("A2775JUN");
                objRtn.A2775JUL = rs01.getDouble("A2775JUL");
                objRtn.A2775AGO = rs01.getDouble("A2775AGO");
                objRtn.A2775SET = rs01.getDouble("A2775SET");
                objRtn.A2775OCT = rs01.getDouble("A2775OCT");
                objRtn.A2775NOV = rs01.getDouble("A2775NOV");
                objRtn.A2775DIC = rs01.getDouble("A2775DIC");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
            if (cstmt01.getMoreResults()) {
                //objRtn = new SQP01500Filter();
                //objRtn.typeColumn = 1;
                //lstRtn.add(objRtn);
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new SQP01500Filter();
                    objRtn.A2775IATA = rs02.getString("A2775IATA");
                    objRtn.A2775FTE = rs02.getString("A2775FTE");
                    objRtn.A2775NAME = rs02.getString("A2775NAME");
                    objRtn.A2775SFTE = "";
                    if (objRtn.A2775FTE.equals("ASR")) {
                        objRtn.A2775SFTE = rs02.getString("A2775SFTE");
                    }

                    objRtn.A2775PAISE = rs02.getString("A2775PAISE");
                    objRtn.A2775STAT = rs02.getString("A2775STAT");
                    objRtn.A2775ANIO = rs02.getString("A2775ANIO");
                    objRtn.A2775TOTAL = rs02.getDouble("A2775TOTAL");
                    objRtn.A2775ENE = rs02.getDouble("A2775ENE");
                    objRtn.A2775FEB = rs02.getDouble("A2775FEB");
                    objRtn.A2775MAR = rs02.getDouble("A2775MAR");
                    objRtn.A2775ABR = rs02.getDouble("A2775ABR");
                    objRtn.A2775MAY = rs02.getDouble("A2775MAY");
                    objRtn.A2775JUN = rs02.getDouble("A2775JUN");
                    objRtn.A2775JUL = rs02.getDouble("A2775JUL");
                    objRtn.A2775AGO = rs02.getDouble("A2775AGO");
                    objRtn.A2775SET = rs02.getDouble("A2775SET");
                    objRtn.A2775OCT = rs02.getDouble("A2775OCT");
                    objRtn.A2775NOV = rs02.getDouble("A2775NOV");
                    objRtn.A2775DIC = rs02.getDouble("A2775DIC");
                    objRtn.typeColumn = 2;

                    lstRtn.add(objRtn);
                }
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
    
    public List<SQP01500Filter> getSQP03944Filter(SQP01500Filter filter) throws SQLException, Exception {
        List<SQP01500Filter> lstRtn = new ArrayList<SQP01500Filter>(0);
        SQP01500Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP03944(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_ANIO);
            cstmt01.setString(4, filter.VP_SFTE);
            cstmt01.setString(5, filter.VP_TRNC);
            cstmt01.setString(6, filter.VP_IATA);
            cstmt01.setString(7, filter.VP_PSVTA);
            cstmt01.setString(8, filter.VP_PARM1);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01500Filter();
                objRtn.A2775IATA = rs01.getString("A2775IATA");
                objRtn.A2775FTE = rs01.getString("A2775FTE");
                objRtn.A2775NAME = rs01.getString("A2775NAME");
                objRtn.A2775SFTE = "";
                if (objRtn.A2775FTE.equals("ASR")) {
                    objRtn.A2775SFTE = rs01.getString("A2775SFTE");
                }

                objRtn.A2775PAISE = rs01.getString("A2775PAISE");
                objRtn.A2775STAT = rs01.getString("A2775STAT");
                objRtn.A2775ANIO = rs01.getString("A2775ANIO");
                objRtn.A2775TOTAL = rs01.getDouble("A2775TOTAL");
                objRtn.A2775ENE = rs01.getDouble("A2775ENE");
                objRtn.A2775FEB = rs01.getDouble("A2775FEB");
                objRtn.A2775MAR = rs01.getDouble("A2775MAR");
                objRtn.A2775ABR = rs01.getDouble("A2775ABR");
                objRtn.A2775MAY = rs01.getDouble("A2775MAY");
                objRtn.A2775JUN = rs01.getDouble("A2775JUN");
                objRtn.A2775JUL = rs01.getDouble("A2775JUL");
                objRtn.A2775AGO = rs01.getDouble("A2775AGO");
                objRtn.A2775SET = rs01.getDouble("A2775SET");
                objRtn.A2775OCT = rs01.getDouble("A2775OCT");
                objRtn.A2775NOV = rs01.getDouble("A2775NOV");
                objRtn.A2775DIC = rs01.getDouble("A2775DIC");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
            if (cstmt01.getMoreResults()) {
                //objRtn = new SQP01500Filter();
                //objRtn.typeColumn = 1;
                //lstRtn.add(objRtn);
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new SQP01500Filter();
                    objRtn.A2775IATA = rs02.getString("A2775IATA");
                    objRtn.A2775FTE = rs02.getString("A2775FTE");
                    objRtn.A2775NAME = rs02.getString("A2775NAME");
                    objRtn.A2775SFTE = "";
                    if (objRtn.A2775FTE.equals("ASR")) {
                        objRtn.A2775SFTE = rs02.getString("A2775SFTE");
                    }

                    objRtn.A2775PAISE = rs02.getString("A2775PAISE");
                    objRtn.A2775STAT = rs02.getString("A2775STAT");
                    objRtn.A2775ANIO = rs02.getString("A2775ANIO");
                    objRtn.A2775TOTAL = rs02.getDouble("A2775TOTAL");
                    objRtn.A2775ENE = rs02.getDouble("A2775ENE");
                    objRtn.A2775FEB = rs02.getDouble("A2775FEB");
                    objRtn.A2775MAR = rs02.getDouble("A2775MAR");
                    objRtn.A2775ABR = rs02.getDouble("A2775ABR");
                    objRtn.A2775MAY = rs02.getDouble("A2775MAY");
                    objRtn.A2775JUN = rs02.getDouble("A2775JUN");
                    objRtn.A2775JUL = rs02.getDouble("A2775JUL");
                    objRtn.A2775AGO = rs02.getDouble("A2775AGO");
                    objRtn.A2775SET = rs02.getDouble("A2775SET");
                    objRtn.A2775OCT = rs02.getDouble("A2775OCT");
                    objRtn.A2775NOV = rs02.getDouble("A2775NOV");
                    objRtn.A2775DIC = rs02.getDouble("A2775DIC");
                    objRtn.typeColumn = 2;

                    lstRtn.add(objRtn);
                }
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
     
     //QRY_VENTAS_AGENTES_SUMARY
     public List<SQP01237Filter> getSQP01237Filter(SQP01237Filter filter) throws SQLException, Exception {
        List<SQP01237Filter> lstRtn = new ArrayList<SQP01237Filter>(0);
        SQP01237Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP01237A(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_ANIO);
            cstmt01.setString(3, filter.VP_TDOC);
            cstmt01.execute();            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01237Filter();
                objRtn.A2775ANIO = rs01.getString("A2775ANIO");
                objRtn.A2775FTE = rs01.getString("A2775FTE");
                objRtn.A2775SFTE = rs01.getString("A2775SFTE");
                objRtn.A2775TOTAL = rs01.getDouble("A2775TOTAL");
                objRtn.A2775ENE = rs01.getDouble("A2775ENE");
                objRtn.A2775FEB = rs01.getDouble("A2775FEB");
                objRtn.A2775MAR = rs01.getDouble("A2775MAR");
                objRtn.A2775ABR = rs01.getDouble("A2775ABR");
                objRtn.A2775MAY = rs01.getDouble("A2775MAY");
                objRtn.A2775JUN = rs01.getDouble("A2775JUN");
                objRtn.A2775JUL = rs01.getDouble("A2775JUL");
                objRtn.A2775AGO = rs01.getDouble("A2775AGO");
                objRtn.A2775SET = rs01.getDouble("A2775SET");
                objRtn.A2775OCT = rs01.getDouble("A2775OCT");
                objRtn.A2775NOV = rs01.getDouble("A2775NOV");
                objRtn.A2775DIC = rs01.getDouble("A2775DIC");
                objRtn.A2775POR = rs01.getDouble("A2775POR");                
                objRtn.A2775QTY = rs01.getInt("A2775QTY");
                objRtn.NRO = rs01.getString("NRO");

                lstRtn.add(objRtn);

                if ("".equals(objRtn.A2775SFTE.trim())) {
                    objRtn = new SQP01237Filter();
                    lstRtn.add(objRtn);
                }
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
     
     /*Lista de agencias
     */
    public List<SQP01512Filter> getSQP01512Filter(SQP01512Filter filter) throws SQLException, Exception {
        List<SQP01512Filter> lstRtn = new ArrayList<SQP01512Filter>(0);
        SQP01512Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP01512(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.VP_IATA);
            cstmt01.setString(3, filter.VP_FTE);
            cstmt01.setString(4, filter.VP_PSVTA);
            cstmt01.setString(5, filter.VP_NAME);
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
                objRtn = new SQP01512Filter();
                objRtn.RANK = rs01.getString("RANK");
                objRtn.A003KEY = rs01.getString("A003KEY");
                objRtn.A003TIPO = rs01.getString("A003TIPO");
                objRtn.A003KEY1 = rs01.getString("A003KEY1");
                objRtn.A003CANAL = rs01.getString("A003CANAL");
                objRtn.A003PSALF = rs01.getString("A003PSALF");
                objRtn.A003DEPART = rs01.getString("A003DEPART");
                objRtn.A003DIREC1 = rs01.getString("A003DIREC1");

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
    
    public List<SQP01267Filter> getSQP01267Filter(SQP01267Filter filter) throws SQLException, Exception {
        List<SQP01267Filter> lstRtn = new ArrayList<SQP01267Filter>(0);
        SQP01267Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL SQP01267(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_ANIO);
            cstmt01.setString(4, filter.VP_FTE);
            cstmt01.setString(5, filter.VP_SFTE);
            cstmt01.setString(6, filter.VP_PSVTA);
            cstmt01.setString(7, filter.VP_PARM1);
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01267Filter();

                objRtn.RN = rs01.getInt("RN");
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.ANIO = rs01.getString("ANIO");
                objRtn.IATA = rs01.getString("IATA");
                objRtn.AGENTE = rs01.getString("AGENTE");
                objRtn.FUENTE = rs01.getString("FUENTE");
                objRtn.SUBFUENTE = rs01.getString("SUBFUENTE");
                objRtn.PAIS = rs01.getString("PAIS");
                objRtn.ESTADO = rs01.getString("ESTADO");
                objRtn.VENTAS = rs01.getDouble("VENTAS");
                objRtn.CANJES = rs01.getDouble("CANJES");
                objRtn.TOTALVENT = rs01.getDouble("TOTALVENT");
                objRtn.CANTCPN = rs01.getInt("CANTCPN");
                objRtn.COMISION = rs01.getDouble("COMISION");
                objRtn.INTERLINE = rs01.getDouble("INTERLINE");
                objRtn.COMMINTER = rs01.getDouble("COMMINTER");
                objRtn.REEMBOLSO = rs01.getDouble("REEMBOLSO");
                objRtn.REVISADOS = rs01.getDouble("REVISADOS");
                objRtn.NETO = rs01.getDouble("NETO");
                objRtn.GDS = rs01.getDouble("GDS");
                objRtn.PORVTANET = rs01.getDouble("PORVTANET");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
            if (cstmt01.getMoreResults()) {
                objRtn = new SQP01267Filter();
                objRtn.typeColumn = 1;
                lstRtn.add(objRtn);
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new SQP01267Filter();
                    objRtn.CCUST = rs02.getString("CCUST");
                    objRtn.ANIO = rs02.getString("ANIO");
                    objRtn.IATA = rs02.getString("IATA");
                    objRtn.AGENTE = rs02.getString("AGENTE");
                    objRtn.VENTAS = rs02.getDouble("VENTAS");
                    objRtn.CANJES = rs02.getDouble("CANJES");
                    objRtn.TOTALVENT = rs02.getDouble("TOTALVENT");
                    objRtn.CANTCPN = rs02.getInt("CANTCPN");
                    objRtn.COMISION = rs02.getDouble("COMISION");
                    objRtn.INTERLINE = rs02.getDouble("INTERLINE");
                    objRtn.COMMINTER = rs02.getDouble("COMMINTER");
                    objRtn.REEMBOLSO = rs02.getDouble("REEMBOLSO");
                    objRtn.REVISADOS = rs02.getDouble("REVISADOS");
                    objRtn.NETO = rs02.getDouble("NETO");
                    objRtn.GDS = rs02.getDouble("GDS");
                    objRtn.typeColumn = 2;
                    lstRtn.add(objRtn);
                }
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
    
    
    public List<SQP01970Filter> getLoadSQP01970Filter(SQP01970Filter filter) throws  SQLException, Exception {
        List<SQP01970Filter> lstRtn = new ArrayList<SQP01970Filter>(0);
        SQP01970Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL SQP01970(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_ANIO);
            cstmt01.setString(4, filter.VP_FTE);
            cstmt01.setString(5, filter.VP_SFTE);
            cstmt01.setString(6, filter.VP_PSVTA);
            cstmt01.setString(7, filter.VP_PARM1);
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01970Filter();

                objRtn.RN = rs01.getInt("RN");
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.ANIO = rs01.getString("ANIO");
                objRtn.IATA = rs01.getString("IATA");
                objRtn.AGENTE = rs01.getString("AGENTE");
                objRtn.FUENTE = rs01.getString("FUENTE");
                objRtn.SUBFUENTE = rs01.getString("SUBFUENTE");
                objRtn.PAIS = rs01.getString("PAIS");
                objRtn.ESTADO = rs01.getString("ESTADO");
                objRtn.VENTAS = rs01.getDouble("VENTAS");
                objRtn.CANJES = rs01.getDouble("CANJES");
                objRtn.TOTALVENT = rs01.getDouble("TOTALVENT");
                objRtn.CANTCPN = rs01.getInt("CANTCPN");
                objRtn.COMISION = rs01.getDouble("COMISION");
                objRtn.INTERLINE = rs01.getDouble("INTERLINE");
                objRtn.COMMINTER = rs01.getDouble("COMMINTER");
                objRtn.REEMBOLSO = rs01.getDouble("REEMBOLSO");
                objRtn.REVISADOS = rs01.getDouble("REVISADOS");
                objRtn.NETO = rs01.getDouble("NETO");
                objRtn.GDS = rs01.getDouble("GDS");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
            if (cstmt01.getMoreResults()) {
                objRtn = new SQP01970Filter();
                objRtn.typeColumn = 1;
                lstRtn.add(objRtn);
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new SQP01970Filter();

                    objRtn.CCUST = rs02.getString("CCUST");
                    objRtn.ANIO = rs02.getString("ANIO");
                    objRtn.IATA = rs02.getString("IATA");
                    objRtn.AGENTE = rs02.getString("AGENTE");
                    objRtn.VENTAS = rs02.getDouble("VENTAS");
                    objRtn.CANJES = rs02.getDouble("CANJES");
                    objRtn.TOTALVENT = rs02.getDouble("TOTALVENT");
                    objRtn.CANTCPN = rs02.getInt("CANTCPN");
                    objRtn.COMISION = rs02.getDouble("COMISION");
                    objRtn.INTERLINE = rs02.getDouble("INTERLINE");
                    objRtn.COMMINTER = rs02.getDouble("COMMINTER");
                    objRtn.REEMBOLSO = rs02.getDouble("REEMBOLSO");
                    objRtn.REVISADOS = rs02.getDouble("REVISADOS");
                    objRtn.NETO = rs02.getDouble("NETO");
                    objRtn.GDS = rs02.getDouble("GDS");

                    objRtn.typeColumn = 2;

                    lstRtn.add(objRtn);
                }
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
    
    public List<SQP01548Filter> getSQP01548Filter(SQP01548Filter filter) throws SQLException, Exception {
        List<SQP01548Filter> lstRtn = new ArrayList<SQP01548Filter>(0);
        SQP01548Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP01548(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PER);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01548Filter();

                objRtn.MES = rs01.getString("MES");
                objRtn.QTY_ON = rs01.getInt("QTY_ON");
                objRtn.FARE_ON = rs01.getDouble("FARE_ON");
                objRtn.QTY_OFF = rs01.getInt("QTY_OFF");
                objRtn.FARE_OFF = rs01.getDouble("FARE_OFF");
                objRtn.VAL_EST_OFF = rs01.getDouble("VAL_EST_OFF");
                objRtn.DIFF = rs01.getDouble("DIFF");

                objRtn.QTY_ON_ALL = rs01.getInt("QTY_ON_ALL");
                objRtn.KM_ON_ALL = rs01.getInt("KM_ON_ALL");
                objRtn.FARE_ON_ALL = rs01.getDouble("FARE_ON_ALL");
                objRtn.QTY_OFF_ALL = rs01.getInt("QTY_OFF_ALL");
                objRtn.KM_OFF_ALL = rs01.getInt("KM_OFF_ALL");
                objRtn.FARE_OFF_ALL = rs01.getDouble("FARE_OFF_ALL");
                objRtn.KM_ON = rs01.getInt("KM_ON");
                objRtn.KM_OFF = rs01.getInt("KM_OFF");

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
    public List<SQP01536Filter> getSQP01536Filter(SQP01536Filter filter) throws SQLException, Exception {
        List<SQP01536Filter> lstRtn = new ArrayList<SQP01536Filter>(0);
        SQP01536Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP01536(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PARM1);
            cstmt01.setString(3, filter.VP_FLAG);
            cstmt01.setString(4, filter.VP_PER);
            cstmt01.setString(5, filter.VP_CARR);
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
                objRtn = new SQP01536Filter();

                objRtn.A2159CCUST = rs01.getString("A2159CCUST");
                objRtn.A2159TKT = rs01.getString("A2159TKT");
                objRtn.A2159SEQ = rs01.getString("A2159SEQ");
                objRtn.A2159TKTI = rs01.getString("A2159TKTI");
                objRtn.A2159CPN = rs01.getInt("A2159CPN");
                objRtn.A2159CNJ = rs01.getString("A2159CNJ");
                objRtn.A2159FUENT = rs01.getString("A2159FUENT");
                objRtn.A2159FPROC = rs01.getString("A2159FPROC");
                objRtn.A2159FEVTA = rs01.getString("A2159FEVTA");
                objRtn.A2159AGENT = rs01.getString("A2159AGENT");
                objRtn.A2159PSVTA = rs01.getString("A2159PSVTA");
                objRtn.A2159CIVTA = rs01.getString("A2159CIVTA");
                objRtn.A2159CUR = rs01.getString("A2159CUR");
                objRtn.A2159FARE = rs01.getDouble("A2159FARE");
                objRtn.A2159MILLA = rs01.getInt("A2159MILLA");
                objRtn.A2159ORIG = rs01.getString("A2159ORIG");
                objRtn.A2159DEST = rs01.getString("A2159DEST");
                objRtn.A2159RUTA = rs01.getString("A2159RUTA");
                objRtn.A2159CARRM = rs01.getString("A2159CARRM");
                objRtn.A2159CARRO = rs01.getString("A2159CARRO");
                objRtn.A2159NVLO = rs01.getString("A2159NVLO");
                objRtn.A2159FVLO = rs01.getString("A2159FVLO");
                objRtn.A2159CLASE = rs01.getString("A2159CLASE");
                objRtn.A2159FBASI = rs01.getString("A2159FBASI");
                objRtn.A2159FAREC = rs01.getDouble("A2159FAREC");
                objRtn.A2159PRFAR = rs01.getDouble("A2159PRFAR");
                objRtn.A2159MILLC = rs01.getInt("A2159MILLC");
                objRtn.A2159PRMIL = rs01.getDouble("A2159PRMIL");
                objRtn.A2159FOAL = rs01.getString("A2159FOAL");
                objRtn.A2159RVMIL = rs01.getDouble("A2159RVMIL");
                objRtn.A2159VAL = rs01.getDouble("A2159VAL");
                objRtn.A2159PRDIF = rs01.getDouble("A2159PRDIF");
                objRtn.A2159DIFF = rs01.getDouble("A2159DIFF");
                objRtn.CARR_DES = rs01.getString("CARR_DES");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

            /*if (cstmt01.getMoreResults()) {
             objRtn = new SQP01536Filter();
             objRtn.typeColumn = 1;
             lstRtn.add(objRtn);
             rs02 = cstmt01.getResultSet();
             while (rs02.next()) {
             objRtn = new SQP01536Filter();

             objRtn.typeColumn = 2;
                    
             lstRtn.add(objRtn);
             }
             }*/
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
