/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import net.miatech.praxis.dao.interline.*;
import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1686Filter;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.A2359;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class InputsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InputsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InputsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2281> loadPX267SQP00671(A2280Filter filter) throws SQLException, Exception {

        List<A2281> lstData = new ArrayList<A2281>(0);
        A2281 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00671(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            // cstmt.setString(3, filter.CODEBANK.trim());
            cstmt.setString(2, filter.COUNTRY.trim());
            cstmt.setString(3, filter.CURRENC.trim());
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
                bean = new A2281();
                bean.RN = rst.getLong("RN");
                bean.COUNTRY = rst.getString("COUNTRY").trim();
                bean.CURRENC = rst.getString("CURRENC").trim();
                bean.CODEBANK = rst.getString("CODEBANK").trim();
                bean.NAMEBANK = rst.getString("NAMEBANK").trim();
                bean.FSTAT = rst.getString("FSTAT").trim();
                bean.CLIENTE = rst.getString("CLIENTE").trim();
                if (rst.getString("FINSUMO").trim().equals("I")) {
                    bean.FINSUMO = "Implemented";
                } else if (rst.getString("FINSUMO").trim().equals("P")) {
                    bean.FINSUMO = "In Progress";
                } else {
                    bean.FINSUMO = "Pending";
                }

                bean.CODBANKN = rst.getString("CODBANKN");
                bean.DOCNUM = rst.getInt("DOCNUM");
                bean.RATECON = rst.getDouble("RATECON");
                bean.RATECOP1 = rst.getDouble("RATECOP1");
                bean.RATECOP2 = rst.getDouble("RATECOP2");
                bean.RATEIVA = rst.getDouble("RATEIVA");

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
            }
            rst.close();

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

        return lstData;
    }

   
    public String loadPX267SQP00672(A2281 filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00672(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

           cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.COUNTRY.trim());
            cstmt.setString(4, filter.CURRENC.trim());
            cstmt.setString(5, filter.CODEBANK.trim());
            cstmt.setString(6, filter.NAMEBANK.trim());
            cstmt.setString(7, filter.FSTAT.trim());
            cstmt.setString(8, filter.FINSUMO.trim());
            cstmt.setDouble(9, filter.RATECON);
            cstmt.setDouble(10, filter.RATECOP1);
            cstmt.setDouble(11, filter.RATECOP2);
            cstmt.setDouble(12, filter.RATEIVA);
            cstmt.setString(13, filter.CLIENTE.trim());
            cstmt.setString(14, filter.CODBANKN.trim());
            cstmt.setInt(15, filter.DOCNUM);
            cstmt.setString(16, session.getUserView().getUserInfo().USR);
            cstmt.setString(17, Functions.getFechaActual());
            cstmt.setString(18, Functions.getHoraActual());
            cstmt.execute();

        } catch (Exception e) {
            e.printStackTrace();
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

    public A2281 loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {

        A2281 objRtn = new A2281();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00673(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CODEBANK.trim());
            cstmt01.setString(3, filter.COUNTRY.trim());
            cstmt01.setString(4, filter.CURRENC.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.COUNTRY = rs01.getString("COUNTRY").trim();
                objRtn.CURRENC = rs01.getString("CURRENC").trim();
                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                objRtn.NAMEBANK = rs01.getString("NAMEBANK").trim();
                objRtn.FSTAT = rs01.getString("FSTAT").trim();
                objRtn.FINSUMO = rs01.getString("FINSUMO").trim();
                objRtn.CLIENTE = rs01.getString("CLIENTE").trim();
                objRtn.RATECON = rs01.getDouble("RATECON");
                objRtn.RATECOP1 = rs01.getDouble("RATECOP1");
                objRtn.RATECOP2 = rs01.getDouble("RATECOP2");
                objRtn.RATEIVA = rs01.getDouble("RATEIVA");
                objRtn.CODBANKN = rs01.getString("CODBANKN");
                objRtn.DOCNUM = rs01.getInt("DOCNUM");

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

                //lstRtn.add(objRtn);
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

        return objRtn;
    }

    public List<A1691Filter> loadPX330SQP01039(A1691Filter filter) throws SQLException, Exception {

        List<A1691Filter> lstData = new ArrayList<A1691Filter>(0);
        A1691Filter obj;

        long TOTACU = 0, TOTDIA = 0, TOTFIN = 0, TOTREG = 0, DIFF = 0;
        long TOTACU_CONTROL = 0;
        String FECR = "";

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01039(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_FUENTE);
            cstmt.setString(5, filter.NOMFILE);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                TOTACU_CONTROL = rst.getInt("TOTACU");
                FECR = rst.getString("FECR");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    TOTACU = rst.getLong("TOTACU");
                    TOTDIA = rst.getLong("TOTDIA");
                    TOTFIN = rst.getLong("TOTFIN");
                    TOTREG = rst.getLong("TOTREG");
                    DIFF = rst.getLong("DIFF");
                }
                rst.close();

                if (cstmt.getMoreResults()) {
                    rst = cstmt.getResultSet();

                    while (rst.next()) {

                        obj = new A1691Filter();
                        obj.strDesFCLOFO = rst.getString("COLOR");
                        obj.strSQL = "";
                        obj.DFLIGHT = rst.getString("FPROC");
                        obj.strFormatDate = Functions.getMonthConvert(obj.DFLIGHT);
                        obj.HOCR = rst.getString("HOCR");
                        obj.strFecha = Functions.ConvertedTime(obj.HOCR);
                        obj.NOMFILE = filter.NOMFILE;
                        obj.TDOC = filter.IN_FUENTE;
                        obj.strDescripcion = rst.getString("MSJ").trim();

                        obj.QCPNVC = rst.getLong("TOTDIA");
                        obj.QCPNOD = rst.getLong("TOTACU");
                        obj.QCPNOCR = rst.getLong("TOTFIN");
                        obj.QCPNMA = rst.getLong("TOTREG");
                        obj.QCPNTOT = rst.getLong("DIFF");

                        obj.totQCPNOD = TOTACU;
                        obj.totQCPNVC = TOTDIA;
                        obj.totQCPNOCR = TOTFIN;
                        obj.totQCPNMA = TOTREG;
                        obj.totQCPNTOT = DIFF;

                        obj.FECR = FECR;
                        obj.strFormatDate2 = Functions.getMonthConvert(obj.FECR);
                        obj.totORACLE = TOTACU_CONTROL;

                        lstData.add(obj);
                    }

                    rst.close();
                }
                if (lstData.size() > 0 && lstData.get(lstData.size() - 1).strDesFCLOFO.equals("0xFF0000")) {
                    lstData.get(lstData.size() - 1).strSQL = "1";
                }

            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstData;
    }
    
    public int loadPXSQPCLP(A1691Filter filter) throws SQLException, Exception {

        int cant = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPCLP(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(2, Types.VARCHAR);

            cstmt01.setString(1, filter.NOMFILE.trim());
            cstmt01.setString(2, "0");
            cstmt01.execute();

            cant = Integer.parseInt(cstmt01.getString(2));
            // rs01 = cstmt01.getResultSet();

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return cant;
    }
    
    public A1691Filter loadPX265SQP01449(A1691Filter filter) throws SQLException, Exception {

        A1691Filter objRtn = new A1691Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01449(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.NOMFILE.trim());
            cstmt01.setString(3, filter.DFLIGHT.trim());
            cstmt01.setString(4, filter.HOCR.trim());
            //cstmt01.setString(5, filter.TDOC.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");

                objRtn.NOMFILE = rs01.getString("NOMFILE").trim();
                objRtn.FPROC = rs01.getString("FPROC").trim();
                objRtn.TDOC = rs01.getString("TDOC").trim();
                objRtn.STAT = rs01.getString("STAT").trim();
                objRtn.TOTACU = rs01.getInt("TOTACUM");
                objRtn.TOTDIA = rs01.getInt("TOTDIA");
                objRtn.TOTFIN = rs01.getInt("TOTFIN");
                objRtn.TOTREG = rs01.getInt("TOTREG");
                objRtn.TOTFAL = rs01.getInt("TOTFAL");
                objRtn.COMENT = rs01.getString("COMENT");

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

                //lstRtn.add(objRtn);
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

        return objRtn;
    }
    
    
    public String loadPX265SQP01448(A1691Filter filter, String option) throws SQLException, Exception {

        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01448(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.NOMFILE.trim());
            cstmt.setString(4, filter.FPROC.trim());
            cstmt.setString(5, filter.STAT.trim());
            cstmt.setInt(6, filter.TOTACU);
            cstmt.setInt(7, filter.TOTDIA);
            cstmt.setInt(8, filter.TOTFIN);
            cstmt.setInt(9, filter.TOTREG);
            cstmt.setInt(10, filter.TOTFAL);
            cstmt.setString(11, filter.COMENT.trim());
            cstmt.setString(12, filter.HOCR);
            cstmt.setString(13, session.getUserView().getUserInfo().USR);
            cstmt.setString(14, Functions.getFechaActual());
            cstmt.setString(15, Functions.getHoraActual());
            cstmt.execute(); 

        } catch (Exception e) {
            e.printStackTrace();
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
    
    
    public HashMap loadPX264SQP00664(A1686Filter filter, String consulta) throws SQLException, Exception {

        HashMap hmResultado = new HashMap();
        List<A1686Filter> lstRtn = new ArrayList<>(0);
        List<A1686Filter> lstRtn2 = new ArrayList<>(0);
        A1686Filter objRtn;
        objRtn = new A1686Filter();
//        objRtn.FUENTE = "";
        objRtn.FUENTE = "All";
        lstRtn.add(objRtn);

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00664(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, consulta);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1686Filter();
                objRtn.FUENTE = rs01.getString("FUENTE");//FUENTE

                lstRtn.add(objRtn);
            }
            hmResultado.put("lstFuentes", lstRtn);
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1686Filter();
                    objRtn.FUENTE = rs01.getString("CPROGRAM");//Cod de Programa
                    lstRtn2.add(objRtn);
                }
            }
            hmResultado.put("lstProgramas", lstRtn2);

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

        return hmResultado;
    }

    public List<A1686Filter> loadPX264SQP00665(A1686Filter filter, String consulta) throws SQLException, Exception {

        List<A1686Filter> lstRtn = new ArrayList<A1686Filter>(0);
        A1686Filter objRtn;
        int totQRECOR = 0, totQRECORG = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00665(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_FUENTE);
            cstmt01.setString(5, consulta);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1686Filter();
                objRtn.IN_FUENTE = filter.IN_FUENTE;
                objRtn.RN = pos;
                objRtn.FECR = rs01.getString("FECR");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECR);
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.strDescripcion1 = Functions.ConvertedTime(rs01.getString("HOCR"));
                objRtn.USCR = rs01.getString("USCR").trim();
                objRtn.DPRDA = filter.DPRDA;
                objRtn.strFormatDate2 = filter.strFormatDate2;
                objRtn.FECHA = rs01.getString("FECRFILE");
                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.FECHA);
//                objRtn.strFormatDate4 = rs01.getString("NLOT");
                objRtn.FUENTE = rs01.getString("FUENTE");
                objRtn.PPROGRAM = rs01.getString("PPROGRAM");
                objRtn.MENSA = rs01.getString("MENSA").trim();
                objRtn.QRECOR = rs01.getInt("QTYREAD");
                objRtn.QRECORG = rs01.getInt("QTYWRITE");
                objRtn.IN_TIPOFECHA = rs01.getInt("QTYRECEI");
                objRtn.QRECERR = rs01.getInt("QTYERROR");
                objRtn.totQRECOR = totQRECOR;
                objRtn.totQRECORG = totQRECORG;
                lstRtn.add(objRtn);
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

    public List<A1686Filter> loadPX264SQP002464(A1686Filter filter) throws SQLException, Exception {

        List<A1686Filter> lstRtn = new ArrayList<A1686Filter>(0);
        A1686Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02464(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_TFILE);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setString(6, filter.IN_FPROC);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1686Filter();
                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                objRtn.IN_TFILE = filter.IN_TFILE;
                objRtn.IN_PAIS = filter.IN_PAIS;
                objRtn.IN_FPROC = filter.IN_FPROC;

                objRtn.RN = pos;
                objRtn.COUNTRY = rs01.getString("COUNTRY");
                objRtn.strCountry = rs01.getString("DES_COUN");
                objRtn.TFILE = rs01.getString("TFILE");

                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.strHOCR = Functions.ConvertedTime(rs01.getString("HOCR"));

                objRtn.FPROC = rs01.getString("FPROC");
                objRtn.strFPROC = Functions.getMonthConvert(objRtn.FPROC);

                objRtn.FECR = rs01.getString("FECR");
                objRtn.strFECR = Functions.getMonthConvert(objRtn.FECR);

                lstRtn.add(objRtn);
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

    
    public List<A1686Filter> loadPX264SQP00667(A1686Filter filter, String consulta) throws SQLException, Exception {

        List<A1686Filter> lstRtn = new ArrayList<A1686Filter>(0);
        A1686Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        if (filter.IN_FUENTE.trim().equals("PLM")) {
            filter.FUENTE = "PLM";
            filter.FECR = filter.strFormatDate4;
        }
        
        HashMap hmTablaFuente = new HashMap();
        hmTablaFuente.put("ACCB", "A2301");
        hmTablaFuente.put("ACCBLO", "A2301");
        hmTablaFuente.put("ACCBNB", "A2301");
        hmTablaFuente.put("PAGATODO", "A2302");
        hmTablaFuente.put("BSPLINK", "A2307");
        hmTablaFuente.put("SETTLEMTAX", "A2314");
        hmTablaFuente.put("SETTLEMTBX", "A2303");
        hmTablaFuente.put("SETTLEMTCI", "A2303");
        hmTablaFuente.put("PLM", "A2710");
        hmTablaFuente.put("DFR", "A2710");
        hmTablaFuente.put("LIQUIDA.AX", "A2309");
        hmTablaFuente.put("LIQUIDA.BX", "A2304");
        hmTablaFuente.put("LIQUIDA.PT", "A2302");
        hmTablaFuente.put("RECHAZOSBX", "A2315");
        hmTablaFuente.put("SETTLEMTPT", "A2308");
        hmTablaFuente.put("ACLAFILEBN", "A2311");
        hmTablaFuente.put("ACLARBNMX", "A2311");
        hmTablaFuente.put("ACLARAMEX", "A2311");
        hmTablaFuente.put("ACLARPAYPA", "A2311");
        hmTablaFuente.put("ACLARSNTDR", "A2311");
        hmTablaFuente.put("AVISOSBNMX", "A2316");
        hmTablaFuente.put("EECCBX", "A2328");
        hmTablaFuente.put("AXGRRCN-D", "A4111");
        hmTablaFuente.put("AXPLUSGR-D", "A4123");
        hmTablaFuente.put("AXLIGATB-D", "A4125");
        hmTablaFuente.put("WORLDPAY-D", "A4039");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04393(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.VARCHAR);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA); // FECRFILE
            cstmt01.setString(3, filter.FECR);
            cstmt01.setString(4, filter.HOCR);
            cstmt01.setString(5, filter.FUENTE);//"PLM"
            cstmt01.setString(6, filter.PPROGRAM);
            cstmt01.setString(7, filter.IN_ERROR);
            cstmt01.setString(8, filter.IN_FECRFILE);            
            cstmt01.setString(9, consulta);
            cstmt01.setString(10, "");
            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);
            cstmt01.execute();

            filter.strFormatDate4 = cstmt01.getString(10);
            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1686Filter();
                objRtn.RN = rs01.getInt("RN");
                objRtn.FECR = rs01.getString("PRDA").trim();
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECR);
                objRtn.strFormatDate3 = Functions.getMonthConvert(filter.FECHA.trim());
                objRtn.TTIME = Functions.ConvertedTime(rs01.getString("TTIME").trim());
                objRtn.QRECOR = rs01.getInt("TRAN");
                objRtn.strDescripcion = rs01.getString("DDATA").trim();
                if(hmTablaFuente.containsKey(filter.FUENTE.trim())){
                    objRtn.strFormatDate4 = hmTablaFuente.get(filter.FUENTE.trim()).toString();
                }else{
                    objRtn.strFormatDate4 = filter.strFormatDate4;
                }
                objRtn.flagError = rs01.getString("FERROR");
                if(rs01.getString("FERROR").trim().equals("D")){
                    objRtn.strDescripcion1 = "Duplicated Record";
                }else if(rs01.getString("FERROR").trim().equals("H")){
                    objRtn.strDescripcion1 = "Header Record";
                }else{
                    objRtn.strDescripcion1 = rs01.getString("FERROR");
                }

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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
    
    public List<A1686Filter> loadPX264SQP00691(A1686Filter filter, String consulta) throws SQLException, Exception {

        A1686Filter objeto;
        List<A1686Filter> lista = new ArrayList();
        HashMap hm;
        String tipo = filter.IN_FUENTE;
        String anob = filter.IN_FECHA_FROM.substring(0, 4);

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00691(?,?,?,?)}";

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM.substring(0, 4));
            cstmt01.setString(3, filter.IN_FUENTE.trim());
            cstmt01.setString(4, consulta);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            hm = new HashMap();
            while (rs01.next()) {
                    
                objeto = new A1686Filter();                
                hm.put(rs01.getString("FECHA"), rs01.getInt("QTYRECEI"));                
                
            }

            String fecha;
            boolean bool = true;

            for (int mesx = 1; mesx <= 12; mesx++) {
                if (bool) {
                    for (int dia = 1; dia <= 31; dia++) {
                        fecha = anob + Functions.fillZeros(2, String.valueOf(mesx)) + Functions.fillZeros(2, String.valueOf(dia));
                        //if (fecha.equals(Functions.getFechaActual())) {
                        if (fecha.equals(Functions.sumXDaystoDate(Functions.getFechaActual(), 1))) {
                            bool = false;
                            break;
                        }
                        if (dia <= Functions.hallarFindeMes(fecha)) {
                            if (tipo.equals("ACCB")) {
                                objeto = new A1686Filter();
                                objeto.fecha = fecha;
                                objeto.strFormatDate = "AMBAR";
                                if (hm.containsKey(fecha)) {
                                    objeto.strFormatDate = "VERDE";
                                }
                                lista.add(objeto);
                            } else {
                                objeto = new A1686Filter();
                                objeto.fecha = fecha;
                                objeto.strFormatDate = "AMBAR";
                                if (hm.containsKey(fecha)) {
                                    objeto.strFormatDate = "VERDE";
                                    
                                    // Verificar si archivo vino vacio (pintar amarillo)
                                    if(filter.IN_FUENTE.trim().equals("AXGRRCN-D")){
                                        if(hm.get(fecha).toString().equals("0") ){
                                            objeto.strFormatDate = "YELLOW";
                                        }
                                    }
                                }
                                lista.add(objeto);
                            }
                        }

                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
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
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;

    }
    
    public List<A1686Filter> loadPX264SQP02957(A1686Filter filter) throws SQLException, Exception {

        List<A1686Filter> lstRtn = new ArrayList<A1686Filter>(0);
        A1686Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02957(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, Functions.getFechaActual());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A1686Filter();
                objRtn.IN_FUENTE = filter.IN_FUENTE;
                objRtn.RN = pos;
                objRtn.DTRANS = rs01.getString("PROCDATE");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DTRANS);
                //objRtn.QRECOR = rs01.getInt("TOTAL");
                objRtn.QEXPT = rs01.getInt("QEXP");
                objRtn.QEXPB = rs01.getInt("QEXPC");
                objRtn.QRECT = rs01.getInt("QRECT");
                objRtn.QRECL = rs01.getInt("QRECL");
                objRtn.QRECE = rs01.getInt("QRECE");
                objRtn.QRECN = rs01.getInt("QRECN");
                objRtn.QBSPT = rs01.getInt("QBSPT");
                objRtn.QBSPL = rs01.getInt("QBSPL");
                objRtn.QBSPE = rs01.getInt("QBSPE");
                objRtn.QBSPN = rs01.getInt("QBSPN");
                objRtn.QCONT = rs01.getInt("QCONT");
                objRtn.QCONL = rs01.getInt("QCONL");
                objRtn.QCONE = rs01.getInt("QCONE");
                objRtn.QCONN = rs01.getInt("QCONN");
                lstRtn.add(objRtn);
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

    public List<A2359> loadPX264SQP02958(A1686Filter filter) throws SQLException, Exception {

        List<A2359> lstRtn = new ArrayList<A2359>(0);
        A2359 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        String strTitulo = "";
        /*strTitulo = "Processing Date : " + filter.DTRANS + " - Generation Date : " + filter.FECR 
                + " - User Creator : " + filter.USCR;*/
        strTitulo = "Processing Date : " + filter.DTRANS;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02958(?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DTRANS);
            cstmt01.setString(3, filter.FECR);
            cstmt01.setString(4, filter.USCR);
            cstmt01.setString(5, filter.IN_ERROR);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A2359();
                objRtn.RN = pos;
                objRtn.CCUST = rs01.getString("CCUST").trim();
                objRtn.SEQNUM = rs01.getString("SEQNUM").trim();
                objRtn.INPNAME = rs01.getString("INPNAME").trim();
                objRtn.LIBNAME = rs01.getString("LIBNAME").trim();
                objRtn.OUTNAME = rs01.getString("OUTNAME").trim();
                objRtn.PROCDATE = rs01.getString("PROCDATE").trim();
                objRtn.LOADDATE = rs01.getString("LOADDATE").trim();
                objRtn.TRFSTAT = rs01.getString("TRFSTAT").trim();
                objRtn.QTYDOC = rs01.getInt("QTYDOC");
                
                if(objRtn.INPNAME.trim().toUpperCase().startsWith("X")){
                    objRtn.CONTROL = "CONTROL";
                }else{
                    objRtn.CONTROL = "DATA";
                }
                if(objRtn.TRFSTAT.trim().equals("L")){
                    objRtn.TRFSTAT = "LOADED";
                }else if(objRtn.TRFSTAT.trim().equals("E")){
                    objRtn.TRFSTAT = "ERROR";
                }else{
                    objRtn.TRFSTAT = "PENDING";
                }
                objRtn.strTitulo = strTitulo;
                
                objRtn.USCR = rs01.getString("USCR").trim();
                objRtn.FECR = rs01.getString("FECR").trim();

                lstRtn.add(objRtn);
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

