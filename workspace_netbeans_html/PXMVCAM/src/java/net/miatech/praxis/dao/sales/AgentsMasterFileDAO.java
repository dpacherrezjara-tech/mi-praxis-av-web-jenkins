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
import net.miatech.beans.PX019S01A025Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A003;
import net.miatech.praxis.exceptions.SpringException;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AgentsMasterFileDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AgentsMasterFileDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AgentsMasterFileDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A003> loadAgentReport(A003 filter) throws SQLException, Exception {
        List<A003> lstRtn = new ArrayList<A003>(0);
        A003 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03388(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, filter.VP_ACTION.trim());
            cstmt01.setString(2, filter.A003KEY1.trim());
            cstmt01.setString(3, filter.A003KEY2.trim().toUpperCase());
            cstmt01.setString(4, filter.A003KEY3.trim().toUpperCase());

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A003();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A003KEY = rs01.getString("A003KEY").trim();
                objRtn.A003TIPO = rs01.getString("A003TIPO").trim();
                objRtn.A003KEY3 = rs01.getString("A003KEY3").trim().toUpperCase();
                if (rs01.getString("A003KEY1").trim().isEmpty()) {
                    objRtn.A003KEY1 = rs01.getString("A003KEY3").trim().toUpperCase();
                } else {
                    objRtn.A003KEY1 = rs01.getString("A003KEY1").trim().toUpperCase();
                }
                objRtn.A003DIREC1 = rs01.getString("A003DIREC1").trim().toUpperCase();
                objRtn.A003DIREC2 = rs01.getString("A003DIREC2").trim().toUpperCase();
                objRtn.A003DISTRI = rs01.getString("A003DISTRI").trim().toUpperCase();
                objRtn.A003PROVIN = rs01.getString("A003PROVIN").trim().toUpperCase();
                objRtn.A003DEPART = rs01.getString("A003DEPART").trim().toUpperCase();
                objRtn.A003MAIL = rs01.getString("A003MAIL").trim().toLowerCase();
                objRtn.A003CONTA1 = rs01.getString("A003CONTA1").trim().toUpperCase();
                objRtn.A003PSALF = rs01.getString("A003PSALF").trim().toUpperCase();
                objRtn.A003CANAL = rs01.getString("A003CANAL").trim().toUpperCase();
                objRtn.A003CIUDAD = rs01.getString("A003CIUDAD").trim().toUpperCase();
                objRtn.A003ZIPCOD = rs01.getString("A003ZIPCOD").trim().toUpperCase();
                //}
                objRtn.A003SABCTY = rs01.getString("A003SABCTY").trim().toUpperCase();

                objRtn.A003CTACIA = rs01.getString("A003CTACIA");
                objRtn.A003CTANEG = rs01.getString("A003CTANEG");
                objRtn.A003CTACTO = rs01.getString("A003CTACTO");
                objRtn.A003CTAUBC = rs01.getString("A003CTAUBC");
                objRtn.A003CTACTA = rs01.getString("A003CTACTA");
                objRtn.A003CTASCT = rs01.getString("A003CTASCT");
                objRtn.A003CTAEQP = rs01.getString("A003CTAEQP");
                objRtn.A003CTAICI = rs01.getString("A003CTAICI");
                objRtn.A003TRPM = rs01.getString("A003TRPM");
                objRtn.A003OPERA = rs01.getString("A003OPERA");

                objRtn.A003AREA = rs01.getString("A003AREA");
                objRtn.A003CPROVE = rs01.getString("A003CPROVE");
                objRtn.A003CCLIEN = rs01.getString("A003CCLIEN");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

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

    /*
    public List<A003> loadAgentReport(A003 filter) throws SQLException, Exception {

        String strSQL;
        A003 agente;
        List<A003> listaData = new ArrayList<>();
        // int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.intPageRws, totRows = 0;
//        totRowsPag = 20;
        int rowsPag = 20;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = 0;

        if (filter.strExcel.equals("TRUE")) {
            totRowsPag = -1;
        }
        try {

            if (filter.intCurrentPg > 0) {
                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag + 1;
            }

            strSQL = "{CALL " + session.getMainLibrary() + ".PX018S05A003(?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setString(1, filter.VP_ACTION.trim());
            cs.setString(2, filter.A003KEY1.trim());
            cs.setString(3, filter.A003KEY2.trim().toUpperCase());
            cs.setString(4, filter.A003KEY3.trim().toUpperCase());
            cs.setInt(5, PAGINIT);
            cs.setInt(6, totRowsPag);
            cs.setInt(7, -1);
            cs.execute();

            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(5)) {
                totRows = filter.intTotalRws;
                totPAGS = filter.intTotalPgs;
            } else {
                try {
                    totRows = cs.getInt(7);
                    int total = (int) (totRows / totRowsPag);
                    int resto = (totRows % totRowsPag);

                    if (resto > 0) {
                        totPAGS = total + 1;
                    } else {
                        totPAGS = total;
                    }

                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                agente = new A003();
                agente.A003KEY = rst.getString("A003KEY").trim();
                agente.A003TIPO = rst.getString("A003TIPO").trim();
                agente.A003KEY3 = rst.getString("A003KEY3").trim().toUpperCase();
                if (rst.getString("A003KEY1").trim().isEmpty()) {
                    agente.A003KEY1 = rst.getString("A003KEY3").trim().toUpperCase();
                } else {
                    agente.A003KEY1 = rst.getString("A003KEY1").trim().toUpperCase();
                }
                agente.A003DIREC1 = rst.getString("A003DIREC1").trim().toUpperCase();
                agente.A003DIREC2 = rst.getString("A003DIREC2").trim().toUpperCase();
                agente.A003DISTRI = rst.getString("A003DISTRI").trim().toUpperCase();
                agente.A003PROVIN = rst.getString("A003PROVIN").trim().toUpperCase();
                agente.A003DEPART = rst.getString("A003DEPART").trim().toUpperCase();
                agente.A003MAIL = rst.getString("A003MAIL").trim().toLowerCase();
                agente.A003CONTA1 = rst.getString("A003CONTA1").trim().toUpperCase();
                agente.A003PSALF = rst.getString("A003PSALF").trim().toUpperCase();
                agente.A003CANAL = rst.getString("A003CANAL").trim().toUpperCase();

//                if (hmPaises.containsKey(rst.getString("A003PSALF").trim().toUpperCase())) {
//                    agente.strNomPais = hmPaises.get(rst.getString("A003PSALF").trim()).toString();
//                }
                agente.A003CIUDAD = rst.getString("A003CIUDAD").trim().toUpperCase();
//                if (hmCiudades.containsKey(rst.getString("A003CIUDAD").trim().toUpperCase())) {
//                    agente.strNomCiudad = hmCiudades.get(rst.getString("A003CIUDAD").trim()).toString();
//                }

                agente.A003ZIPCOD = rst.getString("A003ZIPCOD").trim().toUpperCase();
                //}
                agente.A003SABCTY = rst.getString("A003SABCTY").trim().toUpperCase();

                agente.A003CTACIA = rst.getString("A003CTACIA");
                agente.A003CTANEG = rst.getString("A003CTANEG");
                agente.A003CTACTO = rst.getString("A003CTACTO");
                agente.A003CTAUBC = rst.getString("A003CTAUBC");
                agente.A003CTACTA = rst.getString("A003CTACTA");
                agente.A003CTASCT = rst.getString("A003CTASCT");
                agente.A003CTAEQP = rst.getString("A003CTAEQP");
                agente.A003CTAICI = rst.getString("A003CTAICI");

                agente.A003AREA = rst.getString("A003AREA");
                agente.A003CPROVE = rst.getString("A003CPROVE");
                agente.A003CCLIEN = rst.getString("A003CCLIEN");

                //Paginación ===================================================
                if (filter.intCurrentPg > 0) {
                    agente.intCurrentPg = filter.intCurrentPg;
                } else {
                    agente.intCurrentPg = 1;
                }
                agente.pos = (20 * (agente.intCurrentPg - 1) + pos);
                agente.intPageRws = totRowsPag;
                agente.intTotalPgs = totPAGS;
                agente.intTotalRws = totRows;
                agente.page.PAGNUM = agente.intCurrentPg;
                agente.page.PAGROW = agente.intPageRws;
                agente.page.TOTPAG = agente.intTotalPgs;
                agente.page.TOTROW = agente.intTotalRws;

                listaData.add(agente);
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
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return listaData;
    }*/

    public int ValidationDownload (A003 filter)  throws SQLException, Exception  {
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        try{
            
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            
            String strSQL = "{CALL " + session.getMainLibrary() + ".SQP04493(?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            
            cs.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cs.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cs.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cs.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cs.setString("IN_OPTION", filter.VP_ACTION);
            cs.setString("IN_CODE",  filter.A003KEY1);
            cs.setString("IN_TIPO", filter.A003KEY2);
            cs.setString("IN_NOMBRE",  filter.A003KEY3);          
            
            cs.setInt("IO_PAGNUM", PAGINIT);
            cs.setInt("IO_PAGROW", totRowsPag);     
            cs.setInt("IO_TOTPAG", totRows);     
            cs.setInt("IO_TOTROW", filter.page.TOTROW); 

            cs.execute();
            
            filter.page.PAGNUM = cs.getInt("IO_PAGNUM");
            filter.page.PAGROW = cs.getInt("IO_PAGROW");
            filter.page.TOTPAG = cs.getInt("IO_TOTPAG");
            filter.page.TOTROW = cs.getInt("IO_TOTROW");
            
            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cs.getInt("IO_PAGROW")) {
               totRows = filter.page.TOTROW;
               totPAGS = filter.page.TOTPAG;
            } else {
               try {
                   totRows = cs.getInt("IO_TOTROW");
                   int total =  (int)(totRows / totRowsPag);                                                                    
                   int resto =  (totRows % totRowsPag);                    

                   if(resto>0)
                       totPAGS = total + 1;
                   else
                       totPAGS = total;

               } catch (Exception e) {
                   totPAGS = totRows / totRowsPag;
               }
            }        
             
            filter.page.TOTPAG = totPAGS;
            
            rst = cs.getResultSet();

            //while (rst.next()) {
            //    STR_RESULT = rst.getString("VMESSAGE");
            //}
            
        }
        finally {
            setClose();
        }
        
        return filter.page.TOTROW; 
    }
    
    public A003 loadAgentCompleteData(A003 filter) throws SQLException, Exception {

        String strSQL;
        A003 agente = new A003();

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX018S02A003(?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, filter.A003KEY);
            cs.execute();
            rst = cs.getResultSet();

            if (rst.next()) {
                agente.A003KEY = rst.getString("A003KEY");
                agente.A003TIPO = rst.getString("A003TIPO");
                agente.A003KEY3 = rst.getString("A003KEY3");
                if (rst.getString("A003KEY1").trim().isEmpty()) {
                    agente.A003KEY1 = rst.getString("A003KEY3").trim().toUpperCase();
                } else {
                    agente.A003KEY1 = rst.getString("A003KEY1").trim().toUpperCase();
                }
                agente.A003DIREC1 = rst.getString("A003DIREC1");
                agente.A003DIREC2 = rst.getString("A003DIREC2");
                agente.A003REFER = rst.getString("A003REFER");
                agente.A003DISTRI = rst.getString("A003DISTRI");
                agente.A003PROVIN = rst.getString("A003PROVIN");
                agente.A003DEPART = rst.getString("A003DEPART");
                agente.A003PSALF = rst.getString("A003PSALF");
                agente.A003PAIS = rst.getString("A003PAIS");
                agente.A003CIUDAD = rst.getString("A003CIUDAD");
                agente.A003ZIPCOD = rst.getString("A003ZIPCOD");
                agente.A003TELEF1 = rst.getString("A003TELEF1");
                agente.A003TELEF2 = rst.getString("A003TELEF2");
                agente.A003FAX = rst.getString("A003FAX");
                agente.A003MAIL = rst.getString("A003MAIL");
                agente.A003KEY2 = rst.getString("A003KEY2");
                agente.A003ANEXO = rst.getString("A003ANEXO");
                agente.A003INDICA = rst.getString("A003INDICA");
                agente.A003IATA = rst.getString("A003IATA");
                agente.A003REPRES = rst.getString("A003REPRES");
                agente.A003REPCAR = rst.getString("A003REPCAR");
                agente.A003REPDIR = rst.getString("A003REPDIR");
                agente.A003REPTLF = rst.getString("A003REPTLF");
                agente.A003CONTA1 = rst.getString("A003CONTA1");
                agente.A003CONTA2 = rst.getString("A003CONTA2");
                agente.A003PROCOD = rst.getString("A003PROCOD");
                agente.A003PROMOT = rst.getString("A003PROMOT");
                agente.A003CRMONE = rst.getString("A003CRMONE");
                agente.A003CRLIMI = rst.getLong("A003CRLIMI");
                agente.A003CRDIAS = rst.getLong("A003CRDIAS");
                agente.A003CNACON = rst.getDouble("A003CNACON");
                agente.A003CNACOF = rst.getDouble("A003CNACOF");
                agente.A003CINTON = rst.getDouble("A003CINTON");
                agente.A003CINTOF = rst.getDouble("A003CINTOF");
                agente.A003FIANT1 = rst.getString("A003FIANT1");
                agente.A003FIAND1 = rst.getString("A003FIAND1");
                agente.A003FIANM1 = rst.getString("A003FIANM1");
                agente.A003FIANI1 = rst.getDouble("A003FIANI1");
                agente.A003FIANB1 = rst.getString("A003FIANB1");
                if (rst.getLong("A003FIINI1") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003FIINI1 = rst.getInt("A003FIINI1");
                }
                if (rst.getLong("A003FITER1") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003FITER1 = rst.getInt("A003FITER1");
                }
                agente.A003FIANT2 = rst.getString("A003FIANT2");
                agente.A003FIAND2 = rst.getString("A003FIAND2");
                agente.A003FIANM2 = rst.getString("A003FIANM2");
                agente.A003FIANI2 = rst.getDouble("A003FIANI2");
                agente.A003FIANB2 = rst.getString("A003FIANB2");
                if (rst.getLong("A003FIINI2") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003FIINI2 = rst.getInt("A003FIINI2");
                }
                if (rst.getLong("A003FITER2") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003FITER2 = rst.getInt("A003FITER2");
                }
                if (rst.getLong("A003REPORT") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003REPORT = rst.getInt("A003REPORT");
                }
                if (rst.getLong("A003PERIDE") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003PERIDE = rst.getInt("A003PERIDE");
                }
                if (rst.getLong("A003PERIA") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003PERIA = rst.getInt("A003PERIA");
                }
                if (rst.getLong("A003FREMES") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003FREMES = rst.getInt("A003FREMES");
                }
                if (rst.getLong("A003REMESA") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003REMESA = rst.getInt("A003REMESA");
                }
                agente.A003STATUS = rst.getString("A003STATUS");
                if (rst.getLong("A003INICIO") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003INICIO = rst.getInt("A003INICIO");
                }
                if (rst.getLong("A003TERMIN") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003TERMIN = rst.getInt("A003TERMIN");
                }
                agente.A003COMENT = rst.getString("A003COMENT");
                agente.A003OPERA = rst.getString("A003OPERA");
                if (rst.getLong("A003FSIST") > 0) {
                    //Esto xq el campo esta declarado como numérico pero el valor debe ser cadena
                    agente.A003FSIST = rst.getInt("A003FSIST");
                }
                agente.A003TERMI = rst.getString("A003TERMI");
                agente.A003INDI1 = rst.getString("A003INDI1");
                agente.A003OFPRC = rst.getString("A003OFPRC");
                agente.A003CODS = rst.getString("A003CODS");
                agente.A003GENE = rst.getString("A003GENE");
                agente.A003TRPN = rst.getString("A003TRPN");
                agente.A003TRPI = rst.getString("A003TRPI");
                agente.A003TRPM = rst.getString("A003TRPM");
                agente.A003FRPN = rst.getString("A003FRPN");
                agente.A003FRPI = rst.getString("A003FRPI");
                agente.A003FRPM = rst.getString("A003FRPM");
                agente.A003TURNO = rst.getString("A003TURNO");
                agente.A003FIVA = rst.getString("A003FIVA");
                agente.A003FTAZA = rst.getString("A003FTAZA");
                agente.A003FLAG1 = rst.getString("A003FLAG1");
                agente.A003FLAG2 = rst.getString("A003FLAG2");
                agente.A003FLAG3 = rst.getString("A003FLAG3");
                agente.A003MONN = rst.getString("A003MONN");
                agente.A003MONI = rst.getString("A003MONI");
                agente.A003MONM = rst.getString("A003MONM");
                agente.A003ADMN = rst.getString("A003ADMN");
                agente.A003DPAG = rst.getInt("A003DPAG");
                agente.A003OVERPP = rst.getString("A003OVERPP");
                agente.A003OVERCL = rst.getString("A003OVERCL");
                agente.A003OVERNA = rst.getString("A003OVERNA");
                agente.A003OVERFN = rst.getString("A003OVERFN");
                agente.A003OVERIN = rst.getString("A003OVERIN");
                agente.A003OVERFI = rst.getString("A003OVERFI");
                agente.A003CANAL = rst.getString("A003CANAL");
                agente.A003SABCTY = rst.getString("A003SABCTY");
                //agente.A003UBICA = rst.getString("A003UBICA");
                agente.A003CTACIA = rst.getString("A003CTACIA");
                agente.A003CTANEG = rst.getString("A003CTANEG");
                agente.A003CTACTO = rst.getString("A003CTACTO");
                agente.A003CTAUBC = rst.getString("A003CTAUBC");
                agente.A003CTACTA = rst.getString("A003CTACTA");
                agente.A003CTASCT = rst.getString("A003CTASCT");
                agente.A003CTAEQP = rst.getString("A003CTAEQP");
                agente.A003CTAICI = rst.getString("A003CTAICI");

                agente.A003AREA = rst.getString("A003AREA");
                agente.A003CPROVE = rst.getString("A003CPROVE");
                agente.A003CCLIEN = rst.getString("A003CCLIEN");
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
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return agente;

    }

    public A003 setPX018S03A003(A003 filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PX018S03A003(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(82, Types.VARCHAR);
            cstmt.registerOutParameter(83, Types.VARCHAR);

            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, filter.A003KEY);
            cstmt.setString(3, filter.A003TIPO);
            cstmt.setString(4, filter.A003CANAL);
            cstmt.setString(5, filter.A003KEY3);

            cstmt.setString(6, filter.A003KEY1);
            cstmt.setString(7, filter.A003DIREC1);
            cstmt.setString(8, filter.A003REFER);
            cstmt.setString(9, filter.A003DISTRI);
            cstmt.setString(10, filter.A003PROVIN);

            cstmt.setString(11, filter.A003DEPART);
            cstmt.setString(12, filter.A003PSALF);
            cstmt.setString(13, filter.A003PAIS);
            cstmt.setString(14, filter.A003CIUDAD);
            cstmt.setString(15, filter.A003ZIPCOD);

            cstmt.setString(16, filter.A003TELEF1);
            cstmt.setString(17, filter.A003FAX);
            cstmt.setString(18, filter.A003MAIL);
            cstmt.setString(19, filter.A003KEY2);
            cstmt.setString(20, filter.A003ANEXO);

            cstmt.setString(21, filter.A003INDICA);
            cstmt.setString(22, filter.A003IATA);
            cstmt.setString(23, filter.A003REPRES);
            cstmt.setString(24, filter.A003REPCAR);
            cstmt.setString(25, filter.A003REPDIR);

            cstmt.setString(26, filter.A003REPTLF);
            cstmt.setString(27, filter.A003CONTA1);
            cstmt.setString(28, filter.A003CONTA2);
            cstmt.setString(29, filter.A003PROCOD);
            cstmt.setString(30, filter.A003PROMOT);

            cstmt.setString(31, filter.A003CRMONE);
            cstmt.setDouble(32, filter.A003CRLIMI);
            cstmt.setDouble(33, filter.A003CRDIAS);
            cstmt.setDouble(34, filter.A003CNACON);
            cstmt.setDouble(35, filter.A003CNACOF);

            cstmt.setDouble(36, filter.A003CINTON);
            cstmt.setDouble(37, filter.A003CINTOF);
            cstmt.setString(38, filter.A003FIANT1);
            cstmt.setString(39, filter.A003FIAND1);
            cstmt.setString(40, filter.A003FIANM1);

            cstmt.setDouble(41, filter.A003FIANI1);
            cstmt.setString(42, filter.A003FIANB1);
            cstmt.setString(43, filter.VP_A003FIINI1);
            cstmt.setString(44, filter.VP_A003FITER1);
            cstmt.setString(45, filter.A003FIANT2);

            cstmt.setString(46, filter.A003FIAND2);
            cstmt.setString(47, filter.A003FIANM2);
            cstmt.setDouble(48, filter.A003FIANI2);
            cstmt.setString(49, filter.A003FIANB2);
            cstmt.setString(50, filter.VP_A003FIINI2);

            cstmt.setString(51, filter.VP_A003FITER2);
            cstmt.setString(52, filter.VP_A003REPORT);
            cstmt.setString(53, filter.VP_A003PERIDE);
            cstmt.setString(54, filter.VP_A003PERIA);
            cstmt.setString(55, filter.VP_A003FREMES);

            cstmt.setInt(56, filter.A003REMESA);
            cstmt.setString(57, filter.A003STATUS);
            cstmt.setString(58, filter.VP_A003INICIO);
            cstmt.setString(59, filter.VP_A003TERMIN);
            cstmt.setString(60, filter.A003COMENT);

            cstmt.setString(61, filter.A003INDI1);
            cstmt.setString(62, filter.A003OFPRC);
            cstmt.setString(63, filter.A003OVERPP);
            cstmt.setString(64, filter.A003OVERCL);
            cstmt.setString(65, filter.A003OVERNA);

            cstmt.setString(66, filter.VP_A003OVERFN);
            cstmt.setString(67, filter.A003OVERIN);
            cstmt.setString(68, filter.VP_A003OVERFI);
            cstmt.setString(69, filter.A003SABCTY);

            //cstmt.setString(70, filter.A003UBICA );
            cstmt.setString(70, filter.A003CTACIA);
            cstmt.setString(71, filter.A003CTANEG);
            cstmt.setString(72, filter.A003CTACTO);
            cstmt.setString(73, filter.A003CTAUBC);
            cstmt.setString(74, filter.A003CTACTA);
            cstmt.setString(75, filter.A003CTASCT);
            cstmt.setString(76, filter.A003CTAEQP);
            cstmt.setString(77, filter.A003CTAICI);

            cstmt.setString(78, filter.A003AREA);
            cstmt.setString(79, filter.A003CPROVE);
            cstmt.setString(80, filter.A003CCLIEN);
            cstmt.setString(81, filter.A003DIREC2);

            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(82);
            filter.dbException.MESSAGE = cstmt.getString(83);
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

        private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }
    
}
