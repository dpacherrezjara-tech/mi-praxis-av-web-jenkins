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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class SourceControlDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SourceControlDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SourceControlDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2280Filter> loadPX267SQP00671(A2280Filter filter) throws SQLException, Exception {

        List<A2280Filter> lstData = new ArrayList<A2280Filter>(0);
        A2280Filter bean;

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
                bean = new A2280Filter();
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

                bean.RATCNAC = rst.getDouble("RATCNAC");
                bean.RATDNAC = rst.getDouble("RATDNAC");
                bean.RATCEXT = rst.getDouble("RATCEXT");
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

   
    public String loadPX267SQP00672(A2280Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00672(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setDouble(9, filter.RATCNAC);
            cstmt.setDouble(10, filter.RATDNAC);
            cstmt.setDouble(11, filter.RATCEXT);
            cstmt.setDouble(12, filter.RATEIVA);
            cstmt.setString(13, filter.CLIENTE.trim());
            cstmt.setString(14, session.getUserView().getUserInfo().USR);
            cstmt.setString(15, Functions.getFechaActual());
            cstmt.setString(16, Functions.getHoraActual());
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

    public A2280Filter loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {

        A2280Filter objRtn = new A2280Filter();
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
              
                objRtn.RATCNAC = rs01.getDouble("RATCNAC");
                objRtn.RATDNAC = rs01.getDouble("RATDNAC");
                objRtn.RATCEXT = rs01.getDouble("RATCEXT");
                objRtn.RATEIVA = rs01.getDouble("RATEIVA");

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
    
}
