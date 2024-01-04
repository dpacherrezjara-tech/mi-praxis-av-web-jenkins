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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class StatementReconciliationsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public StatementReconciliationsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public StatementReconciliationsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

//    public List<A2280Filter> loadPX267SQP00671(A2280Filter filter) throws SQLException, Exception {
//
//        List<A2280Filter> lstData = new ArrayList<A2280Filter>(0);
//        A2280Filter bean;
//
//        CallableStatement cstmt = null;
//        ResultSet rst = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00671(?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//            cstmt.registerOutParameter(4, Types.INTEGER);
//            cstmt.registerOutParameter(5, Types.INTEGER);
//            cstmt.registerOutParameter(6, Types.INTEGER);
//            cstmt.registerOutParameter(7, Types.INTEGER);
//
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            // cstmt.setString(3, filter.CODEBANK.trim());
//            cstmt.setString(2, filter.COUNTRY.trim());
//            cstmt.setString(3, filter.CURRENC.trim());
//            cstmt.setInt(4, filter.page.PAGNUM);
//            cstmt.setInt(5, filter.page.PAGROW);
//            cstmt.setInt(6, filter.page.TOTPAG);
//            cstmt.setInt(7, filter.page.TOTROW);
//
//            cstmt.execute();
//
//            filter.page.PAGNUM = cstmt.getInt(4);
//            filter.page.PAGROW = cstmt.getInt(5);
//            filter.page.TOTPAG = cstmt.getInt(6);
//            filter.page.TOTROW = cstmt.getInt(7);
//
//            rst = cstmt.getResultSet();
//            while (rst.next()) {
//                bean = new A2280Filter();
//                bean.RN = rst.getLong("RN");
//                bean.COUNTRY = rst.getString("COUNTRY").trim();
//                bean.CURRENC = rst.getString("CURRENC").trim();
//                bean.CODEBANK = rst.getString("CODEBANK").trim();
//                bean.NAMEBANK = rst.getString("NAMEBANK").trim();
//                bean.FSTAT = rst.getString("FSTAT").trim();
//                bean.CLIENTE = rst.getString("CLIENTE").trim();
//                if (rst.getString("FINSUMO").trim().equals("I")) {
//                    bean.FINSUMO = "Implemented";
//                } else if (rst.getString("FINSUMO").trim().equals("P")) {
//                    bean.FINSUMO = "In Progress";
//                } else {
//                    bean.FINSUMO = "Pending";
//                }
//
//             
//                bean.RATCNAC = rst.getDouble("RATCNAC");
//                bean.RATDNAC = rst.getDouble("RATDNAC");
//                bean.RATCEXT = rst.getDouble("RATCEXT");
//                bean.RATEIVA = rst.getDouble("RATEIVA");
//
//                bean.page.PAGNUM = filter.page.PAGNUM;
//                bean.page.PAGROW = filter.page.PAGROW;
//                bean.page.TOTPAG = filter.page.TOTPAG;
//                bean.page.TOTROW = filter.page.TOTROW;
//                lstData.add(bean);
//            }
//            rst.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try {
//                    rst.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return lstData;
//    }
//
//   
//    public String loadPX267SQP00672(A2280Filter filter, String option) throws SQLException, Exception {
//        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
//        String strMsj = "Operation was successful.";
//
//        CallableStatement cstmt = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00672(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//            cstmt.setString(1, option);
//            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
//            cstmt.setString(3, filter.COUNTRY.trim());
//            cstmt.setString(4, filter.CURRENC.trim());
//            cstmt.setString(5, filter.CODEBANK.trim());
//            cstmt.setString(6, filter.NAMEBANK.trim());
//            cstmt.setString(7, filter.FSTAT.trim());
//            cstmt.setString(8, filter.FINSUMO.trim());
//            cstmt.setDouble(9, filter.RATCNAC);
//            cstmt.setDouble(10, filter.RATDNAC);
//            cstmt.setDouble(11, filter.RATCEXT);
//            cstmt.setDouble(12, filter.RATEIVA);
//            cstmt.setString(13, filter.CLIENTE.trim());
//            cstmt.setString(14, session.getUserView().getUserInfo().USR);
//            cstmt.setString(15, Functions.getFechaActual());
//            cstmt.setString(16, Functions.getHoraActual());
//            cstmt.execute();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            strMsj = e.getMessage();
//        } finally {
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return strMsj;
//
//    }
//
//    public A2280Filter loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {
//
//        A2280Filter objRtn = new A2280Filter();
//        CallableStatement cstmt01 = null;
//        ResultSet rs01 = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00673(?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt01 = cnx.prepareCall(SQLCLL01);
//
//            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt01.setString(2, filter.CODEBANK.trim());
//            cstmt01.setString(3, filter.COUNTRY.trim());
//            cstmt01.setString(4, filter.CURRENC.trim());
//
//            cstmt01.execute();
//
//            rs01 = cstmt01.getResultSet();
//            while (rs01.next()) {
//                objRtn.CCUST = rs01.getString("CCUST");
//                objRtn.COUNTRY = rs01.getString("COUNTRY").trim();
//                objRtn.CURRENC = rs01.getString("CURRENC").trim();
//                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
//                objRtn.NAMEBANK = rs01.getString("NAMEBANK").trim();
//                objRtn.FSTAT = rs01.getString("FSTAT").trim();
//                objRtn.FINSUMO = rs01.getString("FINSUMO").trim();
//                objRtn.CLIENTE = rs01.getString("CLIENTE").trim();
//                      
//                objRtn.RATCNAC = rs01.getDouble("RATCNAC");
//                objRtn.RATDNAC = rs01.getDouble("RATDNAC");
//                objRtn.RATCEXT = rs01.getDouble("RATCEXT");
//                objRtn.RATEIVA = rs01.getDouble("RATEIVA");
//
//                objRtn.USCR = rs01.getString("USCR");
//                objRtn.FECR = rs01.getString("FECR");
//                objRtn.HOCR = rs01.getString("HOCR");
//                objRtn.USUP = rs01.getString("USUP");
//                objRtn.FEUP = rs01.getString("FEUP");
//                objRtn.HOUP = rs01.getString("HOUP");
//
//                //lstRtn.add(objRtn);
//            }
//        } catch (Exception e) {
//            e.getMessage();
//        } finally {
//            if (rs01 != null) {
//                try {
//                    rs01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt01 != null) {
//                try {
//                    cstmt01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return objRtn;
//    }
//
//    public List<A1691Filter> loadPX330SQP01039(A1691Filter filter) throws SQLException, Exception {
//
//        List<A1691Filter> lstData = new ArrayList<A1691Filter>(0);
//        A1691Filter obj;
//
//        long TOTACU = 0, TOTDIA = 0, TOTFIN = 0, TOTREG = 0, DIFF = 0;
//        long TOTACU_CONTROL = 0;
//        String FECR = "";
//
//        CallableStatement cstmt = null;
//        ResultSet rst = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01039(?,?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt.setString(2, filter.IN_FECHA_FROM);
//            cstmt.setString(3, filter.IN_FECHA_TO);
//            cstmt.setString(4, filter.IN_FUENTE);
//            cstmt.setString(5, filter.NOMFILE);
//
//            cstmt.execute();
//
//            rst = cstmt.getResultSet();
//
//            while (rst.next()) {
//                TOTACU_CONTROL = rst.getInt("TOTACU");
//                FECR = rst.getString("FECR");
//            }
//            rst.close();
//
//            if (cstmt.getMoreResults()) {
//                rst = cstmt.getResultSet();
//
//                while (rst.next()) {
//                    TOTACU = rst.getLong("TOTACU");
//                    TOTDIA = rst.getLong("TOTDIA");
//                    TOTFIN = rst.getLong("TOTFIN");
//                    TOTREG = rst.getLong("TOTREG");
//                    DIFF = rst.getLong("DIFF");
//                }
//                rst.close();
//
//                if (cstmt.getMoreResults()) {
//                    rst = cstmt.getResultSet();
//
//                    while (rst.next()) {
//
//                        obj = new A1691Filter();
//                        obj.strDesFCLOFO = rst.getString("COLOR");
//                        obj.strSQL = "";
//                        obj.DFLIGHT = rst.getString("FPROC");
//                        obj.strFormatDate = Functions.getMonthConvert(obj.DFLIGHT);
//                        obj.HOCR = rst.getString("HOCR");
//                        obj.strFecha = Functions.ConvertedTime(obj.HOCR);
//                        obj.NOMFILE = filter.NOMFILE;
//                        obj.TDOC = filter.IN_FUENTE;
//                        obj.strDescripcion = rst.getString("MSJ").trim();
//
//                        obj.QCPNVC = rst.getLong("TOTDIA");
//                        obj.QCPNOD = rst.getLong("TOTACU");
//                        obj.QCPNOCR = rst.getLong("TOTFIN");
//                        obj.QCPNMA = rst.getLong("TOTREG");
//                        obj.QCPNTOT = rst.getLong("DIFF");
//
//                        obj.totQCPNOD = TOTACU;
//                        obj.totQCPNVC = TOTDIA;
//                        obj.totQCPNOCR = TOTFIN;
//                        obj.totQCPNMA = TOTREG;
//                        obj.totQCPNTOT = DIFF;
//
//                        obj.FECR = FECR;
//                        obj.strFormatDate2 = Functions.getMonthConvert(obj.FECR);
//                        obj.totORACLE = TOTACU_CONTROL;
//
//                        lstData.add(obj);
//                    }
//
//                    rst.close();
//                }
//                if (lstData.size() > 0 && lstData.get(lstData.size() - 1).strDesFCLOFO.equals("0xFF0000")) {
//                    lstData.get(lstData.size() - 1).strSQL = "1";
//                }
//
//            }
//
//        } catch (Exception e) {
//            e.getMessage();
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try {
//                    rst.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return lstData;
//    }
//    
//    public int loadPXSQPCLP(A1691Filter filter) throws SQLException, Exception {
//
//        int cant = 0;
//        CallableStatement cstmt01 = null;
//        ResultSet rs01 = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPCLP(?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt01 = cnx.prepareCall(SQLCLL01);
//
//            cstmt01.registerOutParameter(2, Types.VARCHAR);
//
//            cstmt01.setString(1, filter.NOMFILE.trim());
//            cstmt01.setString(2, "0");
//            cstmt01.execute();
//
//            cant = Integer.parseInt(cstmt01.getString(2));
//            // rs01 = cstmt01.getResultSet();
//
//            try {
//                rs01.close();
//            } catch (SQLException e) {
//                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//            }
//            try {
//                cstmt01.close();
//            } catch (SQLException e) {
//                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//            }
//
//        } catch (Exception e) {
//            //e.getMessage();
//            e.printStackTrace();
//        } finally {
//            if (rs01 != null) {
//                try {
//                    rs01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt01 != null) {
//                try {
//                    cstmt01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return cant;
//    }
//    
//    public A1691Filter loadPX265SQP01449(A1691Filter filter) throws SQLException, Exception {
//
//        A1691Filter objRtn = new A1691Filter();
//        CallableStatement cstmt01 = null;
//        ResultSet rs01 = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01449(?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt01 = cnx.prepareCall(SQLCLL01);
//
//            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt01.setString(2, filter.NOMFILE.trim());
//            cstmt01.setString(3, filter.DFLIGHT.trim());
//            cstmt01.setString(4, filter.HOCR.trim());
//            //cstmt01.setString(5, filter.TDOC.trim());
//
//            cstmt01.execute();
//
//            rs01 = cstmt01.getResultSet();
//            while (rs01.next()) {
//                objRtn.CCUST = rs01.getString("CCUST");
//
//                objRtn.NOMFILE = rs01.getString("NOMFILE").trim();
//                objRtn.FPROC = rs01.getString("FPROC").trim();
//                objRtn.TDOC = rs01.getString("TDOC").trim();
//                objRtn.STAT = rs01.getString("STAT").trim();
//                objRtn.TOTACU = rs01.getInt("TOTACUM");
//                objRtn.TOTDIA = rs01.getInt("TOTDIA");
//                objRtn.TOTFIN = rs01.getInt("TOTFIN");
//                objRtn.TOTREG = rs01.getInt("TOTREG");
//                objRtn.TOTFAL = rs01.getInt("TOTFAL");
//                objRtn.COMENT = rs01.getString("COMENT");
//
//                objRtn.USCR = rs01.getString("USCR");
//                objRtn.FECR = rs01.getString("FECR");
//                objRtn.HOCR = rs01.getString("HOCR");
//                objRtn.USUP = rs01.getString("USUP");
//                objRtn.FEUP = rs01.getString("FEUP");
//                objRtn.HOUP = rs01.getString("HOUP");
//
//                //lstRtn.add(objRtn);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rs01 != null) {
//                try {
//                    rs01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt01 != null) {
//                try {
//                    cstmt01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return objRtn;
//    }
//    
//    public String loadPX265SQP01448(A1691Filter filter, String option) throws SQLException, Exception {
//
//        String strMsj = "Operation was successful.";
//
//        CallableStatement cstmt = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01448(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//            cstmt.setString(1, option);
//            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
//            cstmt.setString(3, filter.NOMFILE.trim());
//            cstmt.setString(4, filter.FPROC.trim());
//            cstmt.setString(5, filter.STAT.trim());
//            cstmt.setInt(6, filter.TOTACU);
//            cstmt.setInt(7, filter.TOTDIA);
//            cstmt.setInt(8, filter.TOTFIN);
//            cstmt.setInt(9, filter.TOTREG);
//            cstmt.setInt(10, filter.TOTFAL);
//            cstmt.setString(11, filter.COMENT.trim());
//            cstmt.setString(12, filter.HOCR);
//            cstmt.setString(13, session.getUserView().getUserInfo().USR);
//            cstmt.setString(14, Functions.getFechaActual());
//            cstmt.setString(15, Functions.getHoraActual());
//            cstmt.execute(); 
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            strMsj = e.getMessage();
//        } finally {
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return strMsj;
//    }
//    
    public List<A2290Filter> loadPX287SQP00838(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQWECC = 0, lngTotQPEND = 0, lngTotQDIFF = 0, lngTotQTOTSAL = 0, total = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00838(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(5, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_BANK.trim());
            cstmt.setString(8, filter.IN_AFTE.trim());
            cstmt.setString(9, filter.IN_TTRAN.trim());

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQTOTSAL = lngTotQMATCH + lngTotQDIFF;
                lngTotQWECC = rst.getLong("QWECC");
                lngTotQPEND = rst.getLong("QPEND");
                total = lngTotQMATCH + lngTotQWECC + lngTotQPEND + lngTotQDIFF;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QDIFF");
                    beanTkt.lngQWECC = rst.getLong("QWECC");
                    beanTkt.lngQPEND = rst.getLong("QPEND");

                    beanTkt.Total = beanTkt.lngQMATCH + beanTkt.lngQWECC + beanTkt.lngQPEND + beanTkt.lngQDIFF;

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQWECC = lngTotQWECC;
                    beanTkt.lngTotQTOTSAL = lngTotQTOTSAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotTotal = total;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX287SQP00839(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQWECC = 0, lngTotQPEND = 0, lngTotQDIFF = 0, lngTotQTOTSAL = 0, total = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00839(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.SDATE);
            cstmt.setString(5, filter.IN_MERCHN.trim());
            cstmt.setString(6, filter.IN_BANK.trim());
            cstmt.setString(7, filter.IN_TTRAN.trim());

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQTOTSAL = lngTotQMATCH + lngTotQDIFF;
                lngTotQWECC = rst.getLong("QWECC");
                lngTotQPEND = rst.getLong("QPEND");
                total = lngTotQMATCH + lngTotQWECC + lngTotQPEND + lngTotQDIFF;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();

                    if (rst.getString("CBANK").trim().isEmpty()) {
                        beanTkt.CBANK = "**";
                        beanTkt.strCREJEC = "(Empty)";
                        beanTkt.strDescripcion = "(Empty)";
                    } else {
                        beanTkt.CBANK = rst.getString("CBANK").trim();
                        beanTkt.strCREJEC = rst.getString("BANKN").trim();
                        beanTkt.strDescripcion = rst.getString("BANKN").trim();
                    }

                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QDIFF");
                    beanTkt.lngQWECC = rst.getLong("QWECC");
                    beanTkt.lngQPEND = rst.getLong("QPEND");
                    beanTkt.Total = beanTkt.lngQMATCH + beanTkt.lngQWECC + beanTkt.lngQPEND + beanTkt.lngQDIFF;

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQWECC = lngTotQWECC;
                    beanTkt.lngTotQTOTSAL = lngTotQTOTSAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotTotal = total;

                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + filter.strFormatDate;
                    } else {
                        beanTkt.strTitulo = "Abono Date : " + filter.strFormatDate;
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX287SQP00840(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQWECC = 0, lngTotQPEND = 0, lngTotQDIFF = 0, lngTotQTOTSAL = 0, total = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00840(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.SDATE);
            cstmt.setString(5, filter.CBANK);
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_TTRAN.trim());

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQTOTSAL = lngTotQMATCH + lngTotQDIFF;
                lngTotQWECC = rst.getLong("QWECC");
                lngTotQPEND = rst.getLong("QPEND");
                total = lngTotQMATCH + lngTotQWECC + lngTotQPEND + lngTotQDIFF;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.CBANK = filter.CBANK.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();
                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QDIFF");
                    beanTkt.lngQWECC = rst.getLong("QWECC");
                    beanTkt.lngQPEND = rst.getLong("QPEND");

                    beanTkt.Total = beanTkt.lngQMATCH + beanTkt.lngQWECC + beanTkt.lngQPEND + beanTkt.lngQDIFF;

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQWECC = lngTotQWECC;
                    beanTkt.lngTotQTOTSAL = lngTotQTOTSAL;
                    beanTkt.lngTotQPEND = lngTotQPEND;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotTotal = total;

                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + filter.strFormatDate + " - Bank : " + filter.strCREJEC;
                    } else {
                        beanTkt.strTitulo = "Abono Date : " + filter.strFormatDate + " - Bank : " + filter.strCREJEC;
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX287SQP00841(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0, totNETOC = 0;
        long totQTYTRAS = 0, totQTYTRAN1 = 0, totQTYTRAN3 = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00841(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.SDATE);
            cstmt.setString(5, filter.CBANK);
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_TTRAN.trim());

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totNETO = rst.getDouble("NETO");
                totNETOC = rst.getDouble("NETOC");
                totQTYTRAS = rst.getLong("QTYTRAS");
                totQTYTRAN1 = rst.getLong("QTYTRAN1");
                totQTYTRAN3 = rst.getLong("QTYTRAN3");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.ADATE = rst.getString("ADATE").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.NETO = rst.getDouble("NETO");
                    beanTkt.NETOC = rst.getDouble("NETOC");
                    beanTkt.totNETO = totNETO;
                    beanTkt.totNETOC = totNETOC;
                    beanTkt.QTYTRAS = rst.getInt("QTYTRAS");
                    beanTkt.QTYTRAN1 = rst.getInt("QTYTRAN1");
                    beanTkt.totQTYTRAN1 = totQTYTRAN1;
                    beanTkt.QTYTRAN3 = rst.getInt("QTYTRAN3");
                    beanTkt.totQTYTRAN3 = totQTYTRAN3;
                    beanTkt.totQTYTRAS = totQTYTRAS;
                    beanTkt.VALDATE = rst.getString("VALDATE").trim();

                    if (filter.IN_DATE.trim().equals("VALDATE")) {
                        beanTkt.strTitulo = "Value Date : " + filter.SDATE;
                    } else {
                        beanTkt.strTitulo = "Abono Date : " + filter.SDATE;
                    }

                    beanTkt.strTitulo = beanTkt.strTitulo + " - Bank : " + beanTkt.CODEBANK.trim() + "-" + beanTkt.strCREJEC.trim();

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX287SQP00842(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double totNETO = 0;
        long totQTYTRAS = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00842(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.BANDOC);
            cstmt.setString(3, filter.CODEBANK);

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
                totQTYTRAS = rst.getLong("QTYTRAS");
                totNETO = rst.getDouble("NETO");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.MERCHNC = rst.getString("MERCHNC").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.TIPOTAR = rst.getString("TIPOTAR").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.BANDOC = rst.getString("BANDOC").trim();
                    beanTkt.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.NETO = rst.getDouble("NETO");
                    beanTkt.QTYDOC = rst.getInt("QTYDOC");

                    beanTkt.totQTYTRAS = totQTYTRAS;
                    beanTkt.totNETO = totNETO;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return lstTkts;
    }
//    
//    public List<A2290Filter> loadPX287SQP00924(A2290Filter filter) throws SQLException, Exception {
//
//        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
//        A2290Filter beanTkt;
//        //double dblTotDAMOUNTR = 0, dblTotDAMOUNT = 0, AMOUNTR = 0, AMOUNTS = 0;
//        long lngTotQTYTRA = 0, lngTotQTYDOC = 0, lngTotQty = 0;
//        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
//        hmDescEstados.put("1", "Match");
//        hmDescEstados.put("2", "Liq. Without EECC");
//        hmDescEstados.put("3", "Bank whitout Liquidacion");
//        hmDescEstados.put("4", "Match with Differences");
//
//        CallableStatement cstmt = null;
//        ResultSet rst = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00924(?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//            cstmt.registerOutParameter(9, Types.INTEGER);
//            cstmt.registerOutParameter(10, Types.INTEGER);
//            cstmt.registerOutParameter(11, Types.INTEGER);
//            cstmt.registerOutParameter(12, Types.INTEGER);
//
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt.setString(2, filter.IN_TDOC);
//            cstmt.setString(3, filter.IN_DATE);
//            cstmt.setString(4, filter.SDATE);
//            cstmt.setString(5, filter.IN_MERCHN.trim());
//            cstmt.setString(6, filter.IN_STVAL.trim());
//            cstmt.setString(7, filter.IN_BANK.trim());
//            cstmt.setString(8, filter.IN_TTRAN.trim());
//
//            cstmt.setInt(9, filter.page.PAGNUM);
//            cstmt.setInt(10, filter.page.PAGROW);
//            cstmt.setInt(11, filter.page.TOTPAG);
//            cstmt.setInt(12, filter.page.TOTROW);
//            cstmt.execute();
//
//            filter.page.PAGNUM = cstmt.getInt(9);
//            filter.page.PAGROW = cstmt.getInt(10);
//            filter.page.TOTPAG = cstmt.getInt(11);
//            filter.page.TOTROW = cstmt.getInt(12);
//
//            rst = cstmt.getResultSet();
//
//            while (rst.next()) {
//                lngTotQty = rst.getLong("QTY");
//                lngTotQTYTRA = rst.getLong("QTYTRA");
//                lngTotQTYDOC = rst.getLong("QTYDOC");
//                //AMOUNTR = rst.getDouble("AMOUNTR");
//                //AMOUNTS = rst.getDouble("AMOUNTS");
//                //dblTotDAMOUNTR = rst.getDouble("DAMOUNTR");
//                //dblTotDAMOUNT = rst.getDouble("DAMOUNT");
//            }
//            rst.close();
//
//            if (cstmt.getMoreResults()) {
//                rst = cstmt.getResultSet();
//
//                while (rst.next()) {
//
//                    beanTkt = new A2290Filter();
//                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
//                    beanTkt.IN_DATE = filter.IN_DATE.trim();
//                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
//                    beanTkt.SDATE = filter.SDATE.trim();
//                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
//                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();
//                    beanTkt.strFormatDate = filter.strFormatDate.trim();
//                    beanTkt.IN_BANK = filter.IN_BANK.trim();
//
//                    if (rst.getString("CODEBANK").trim().isEmpty()) {
//                        beanTkt.CBANK = "**";
//                        beanTkt.strDescripcion = "(Empty)";
//                        beanTkt.strCREJEC = "(Empty)";
//                        
//                    } else {
//                        beanTkt.CBANK = rst.getString("CODEBANK").trim();
//                        if (rst.getString("NAMEBANK") != null && !rst.getString("NAMEBANK").trim().equals("-")) {
//                            beanTkt.strDescripcion = rst.getString("NAMEBANK").trim();
//                            beanTkt.strCREJEC = rst.getString("NAMEBANK").trim();
//                        }
//                    }
//
//                    beanTkt.lngQACCB = rst.getLong("QTY");
//                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
//                    beanTkt.AMOUNTS = rst.getLong("AMOUNTS");
//                    beanTkt.AMOUNTR = rst.getLong("AMOUNTR");
//                    beanTkt.DAMOUNT = rst.getLong("DAMOUNT");
//                    beanTkt.SVFOP = rst.getLong("DAMOUNTR");
//                    beanTkt.lngQTEF = rst.getLong("QTYTRA");
//                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
//                    beanTkt.lngTotQACCB = lngTotQty;
//                    beanTkt.lngTotQTEF = lngTotQTYTRA;
//                    beanTkt.lngTotQTYDOC = lngTotQTYDOC;
//                    //beanTkt.dblTotAMOUNT = AMOUNTS;
//                    //beanTkt.dblTotAMOUNTR = AMOUNTR;
//                    //beanTkt.dblTotSVFOP = dblTotDAMOUNTR;
//                    //beanTkt.dblTotAVFOP = dblTotDAMOUNT;
//                    //beanTkt.totDIFF_SVFOP = dblTotDAMOUNT - dblTotDAMOUNTR;
//
//                    if (filter.IN_DATE.trim().equals("DATEPR")) {
//                        beanTkt.strTitulo = "Deposit Date : " + filter.strFormatDate + " ** " + hmDescEstados.get(filter.IN_STVAL.trim()).toString() + " **";
//                    } else {
//                        beanTkt.strTitulo = "Payment Date : " + filter.strFormatDate + " ** " + hmDescEstados.get(filter.IN_STVAL.trim()).toString() + " **";
//                    }
//
//                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
//                    beanTkt.page.PAGROW = filter.page.PAGROW;
//                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
//                    beanTkt.page.TOTROW = filter.page.TOTROW;
//
//                    lstTkts.add(beanTkt);
//                }
//                rst.close();
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            e.getMessage();
//        } finally {
//            if (rst != null) {
//                try {
//                    rst.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return lstTkts;
//    }
//    
//    public List<A2290Filter> loadPX287SQP00925(A2290Filter filter) throws SQLException, Exception {
//
//        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
//        A2290Filter beanTkt;
//        //double dblTotDAMOUNTR = 0, dblTotDAMOUNT = 0;
//        long lngTotQty = 0, lngTotQTYTRA = 0, lngTotQTYDOC = 0;
//
//        CallableStatement cstmt = null;
//        ResultSet rst = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00925(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//            cstmt.registerOutParameter(10, Types.INTEGER);
//            cstmt.registerOutParameter(11, Types.INTEGER);
//            cstmt.registerOutParameter(12, Types.INTEGER);
//            cstmt.registerOutParameter(13, Types.INTEGER);
//
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt.setString(2, filter.IN_TDOC);
//            cstmt.setString(3, filter.IN_DATE);
//            cstmt.setString(4, filter.SDATE);
//            cstmt.setString(5, filter.IN_MERCHN.trim());
//            cstmt.setString(6, filter.CBANK.trim());
//            cstmt.setString(7, filter.IN_STVAL.trim());
//            cstmt.setString(8, filter.SCURRENCY.trim());
//            cstmt.setString(9, filter.IN_TTRAN.trim());
//
//            cstmt.setInt(10, filter.page.PAGNUM);
//            cstmt.setInt(11, filter.page.PAGROW);
//            cstmt.setInt(12, filter.page.TOTPAG);
//            cstmt.setInt(13, filter.page.TOTROW);
//            cstmt.execute();
//
//            filter.page.PAGNUM = cstmt.getInt(10);
//            filter.page.PAGROW = cstmt.getInt(11);
//            filter.page.TOTPAG = cstmt.getInt(12);
//            filter.page.TOTROW = cstmt.getInt(13);
//
//            rst = cstmt.getResultSet();
//
//            while (rst.next()) {
//                lngTotQty = rst.getLong("QTY");
//                lngTotQTYTRA = rst.getLong("QTYTRA");
//                lngTotQTYDOC = rst.getLong("QTYDOC");
//                //dblTotDAMOUNTR = rst.getDouble("DAMOUNTR");
//                //dblTotDAMOUNT = rst.getDouble("DAMOUNT");
//            }
//            rst.close();
//
//            if (cstmt.getMoreResults()) {
//                rst = cstmt.getResultSet();
//
//                while (rst.next()) {
//
//                    beanTkt = new A2290Filter();
//                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
//                    beanTkt.IN_DATE = filter.IN_DATE.trim();
//                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
//                    beanTkt.SDATE = filter.SDATE.trim();
//                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
//                    beanTkt.strFormatDate = filter.strFormatDate.trim();
//                    beanTkt.CBANK = filter.CBANK.trim();
//                    beanTkt.strCREJEC = filter.strCREJEC.trim();
//                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();
//
//                    beanTkt.SDATE = rst.getString("DATE");
//                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
//                    beanTkt.lngQACCB = rst.getLong("QTY");
//                    beanTkt.lngQTEF = rst.getLong("QTYTRA");
//                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
//                    beanTkt.AMOUNTS = rst.getLong("AMOUNTS");
//                    beanTkt.AMOUNTR = rst.getLong("AMOUNTR");
//                    beanTkt.DAMOUNT = rst.getLong("DAMOUNT");
//                    beanTkt.SVFOP = rst.getLong("DAMOUNTR");
//                    beanTkt.lngTotQACCB = lngTotQty;
//                    beanTkt.lngTotQTEF = lngTotQTYTRA;
//                    beanTkt.lngTotQTYDOC = lngTotQTYDOC;
//                    //beanTkt.dblTotSVFOP = dblTotDAMOUNTR;
//                    //beanTkt.dblTotAVFOP = dblTotDAMOUNT;
//                    //beanTkt.totDIFF_SVFOP = dblTotDAMOUNT - dblTotDAMOUNTR;
//
//                    beanTkt.strTitulo = filter.strTitulo + "Bank : " + filter.CBANK.trim() + " - " + filter.strCREJEC;
//
//                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
//                    beanTkt.page.PAGROW = filter.page.PAGROW;
//                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
//                    beanTkt.page.TOTROW = filter.page.TOTROW;
//
//                    lstTkts.add(beanTkt);
//                }
//                rst.close();
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            e.getMessage();
//        } finally {
//            if (rst != null) {
//                try {
//                    rst.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return lstTkts;
//    }
//    
//    public List<A2290Filter> loadPX287SQP00926(A2290Filter filter) throws SQLException, Exception {
//
//        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
//        A2290Filter beanTkt;
//        double dblTotDAMOUNTR = 0, dblTotDAMOUNT = 0, AMT_RFND = 0, AMOUNTS = 0, AMOUNTR = 0;
//        long lngTotQTYTRA = 0, lngTotQTYDOC = 0, lngTotQty = 0;
//        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
//        hmDescEstados.put("1", "Match");
//        hmDescEstados.put("2", "Liq. Without EECC");
//        hmDescEstados.put("3", "Bank whitout Liquidacion");
//        hmDescEstados.put("4", "Match with Differences");
//
//        CallableStatement cstmt = null;
//        ResultSet rst = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00926(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//            cstmt.registerOutParameter(10, Types.INTEGER);
//            cstmt.registerOutParameter(11, Types.INTEGER);
//            cstmt.registerOutParameter(12, Types.INTEGER);
//            cstmt.registerOutParameter(13, Types.INTEGER);
//
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt.setString(2, filter.IN_TDOC);
//            cstmt.setString(3, filter.IN_DATE);
//            cstmt.setString(4, filter.SDATE);
//            cstmt.setString(5, filter.IN_MERCHN.trim());
//            cstmt.setString(6, filter.CBANK.trim());
//            cstmt.setString(7, filter.IN_STVAL.trim());
//            cstmt.setString(8, filter.SCURRENCY.trim());
//            cstmt.setString(9, filter.IN_TTRAN.trim());
//
//            cstmt.setInt(10, filter.page.PAGNUM);
//            cstmt.setInt(11, filter.page.PAGROW);
//            cstmt.setInt(12, filter.page.TOTPAG);
//            cstmt.setInt(13, filter.page.TOTROW);
//            cstmt.execute();
//
//            filter.page.PAGNUM = cstmt.getInt(10);
//            filter.page.PAGROW = cstmt.getInt(11);
//            filter.page.TOTPAG = cstmt.getInt(12);
//            filter.page.TOTROW = cstmt.getInt(13);
//
//            rst = cstmt.getResultSet();
//
//            while (rst.next()) {
//                lngTotQty = rst.getLong("QTY");
//                lngTotQTYTRA = rst.getLong("QTYTRA");
//                lngTotQTYDOC = rst.getLong("QTYDOC");
//                AMOUNTS = rst.getDouble("AMOUNTS");
//                AMOUNTR = rst.getDouble("AMOUNTR");
//                dblTotDAMOUNTR = rst.getDouble("DAMOUNTR");
//                dblTotDAMOUNT = rst.getDouble("DAMOUNT");
//                //  AMT_RFND = rst.getDouble("AMT_RFND");
//            }
//            rst.close();
//
//            if (cstmt.getMoreResults()) {
//                rst = cstmt.getResultSet();
//
//                while (rst.next()) {
//
//                    beanTkt = new A2290Filter();
//                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
//                    beanTkt.IN_DATE = filter.IN_DATE.trim();
//                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
//                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
//                    beanTkt.strFormatDate = filter.strFormatDate.trim();
//                    beanTkt.CBANK = filter.CBANK.trim();
//                    beanTkt.SCURRENCY = filter.SCURRENCY.trim();
//                    beanTkt.SDATE = filter.SDATE.trim();
//                    beanTkt.strCREJEC = filter.strCREJEC.trim();
//                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();
//                    
//                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
//                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
//                    } else {
//                        beanTkt.STVAL = rst.getString("STVAL").trim();
//                    }
//                    beanTkt.BAID = rst.getString("EAID").trim();
//                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
//                    beanTkt.TDATE = rst.getString("TDATE").trim();
//                    beanTkt.DATEF = rst.getString("DATEF").trim();
//                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
//                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
//                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
//                    }
//                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
//                    beanTkt.AMOUNTS = rst.getLong("AMOUNTS");
//                    beanTkt.AMOUNTR = rst.getLong("AMOUNTR");
//                    
//                    beanTkt.DAMOUNT = rst.getDouble("DAMOUNT");
//                    // beanTkt.AMTRFND = rst.getDouble("AMT_RFND");
//                    beanTkt.DIFF_SVFOP = beanTkt.dblAMOUNT - beanTkt.AMTRFND;
//                    beanTkt.BDATEL = rst.getString("DATEP").trim();
//                    beanTkt.CBANK = rst.getString("CBANK").trim();
//                    beanTkt.MERCHNR = rst.getString("MERCHNR").trim();
//                    if (rst.getString("NMERCHNR") != null && !rst.getString("NMERCHNR").trim().equals("-")) {
//                        beanTkt.strDescMerchnR = rst.getString("NMERCHNR").trim();
//                    }
//                    beanTkt.dblAMOUNTR = rst.getDouble("DAMOUNTR");
//                    beanTkt.ACURRENCY = rst.getString("CURRENCYR").trim();
//                    beanTkt.strDescripcion = rst.getString("DESCRI").trim();
//                    beanTkt.DATEC = rst.getString("DATEC").trim();
//                    beanTkt.STATUSC = rst.getString("STATUSC").trim();
//                    beanTkt.lngQTEF = rst.getLong("QTYTRA");
//                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
//                    beanTkt.TTRAN = rst.getString("TTRAN").trim();
//                    if(beanTkt.TTRAN.trim().equals("A")){
//                        beanTkt.strDescTTRAN = "Pay";
//                    }else if(beanTkt.TTRAN.trim().equals("C")){
//                        beanTkt.strDescTTRAN = "Charge";
//                    }
//
//                    beanTkt.lngTotQTYDOC = lngTotQty;
//                    beanTkt.lngTotQTEF = lngTotQTYTRA;
//                    beanTkt.lngTotQTYDOC = lngTotQTYDOC;
//                    beanTkt.dblTotAMOUNT = AMOUNTS;
//                    beanTkt.dblTotAMOUNTR = AMOUNTR;
//                    beanTkt.dblTotAVFOP = dblTotDAMOUNTR;
//                    beanTkt.dblTotSVFOP = dblTotDAMOUNT;
//                    beanTkt.totAMTRFND = AMT_RFND;
//                    beanTkt.totDIFF_SVFOP = dblTotDAMOUNT - AMT_RFND;
//                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
//                    beanTkt.page.PAGROW = filter.page.PAGROW;
//                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
//                    beanTkt.page.TOTROW = filter.page.TOTROW;
//
//                    if (filter.IN_DATE.trim().equals("DATEP")) {
//                        beanTkt.strTitulo = "Deposit Date : " + filter.SDATE + " ** " + hmDescEstados.get(filter.IN_STVAL.trim()).toString() + " **";
//                    } else {
//                        beanTkt.strTitulo = "Payment Date : " + filter.SDATE + " ** " + hmDescEstados.get(filter.IN_STVAL.trim()).toString() + " **";
//                    }
//
//                    beanTkt.strTitulo = beanTkt.strTitulo + "Bank : " + filter.CBANK.trim() + " - " + filter.strCREJEC;
//
//                    lstTkts.add(beanTkt);
//                }
//                rst.close();
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            e.getMessage();
//        } finally {
//            if (rst != null) {
//                try {
//                    rst.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return lstTkts;
//    }
//    
//    public List<A2290Filter> loadPX287SQP02055(A2290Filter filter) throws SQLException, Exception, Exception, Exception {
//
//        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
//        A2290Filter beanTkt;
//        double SVFOP = 0;
//        int QTYDOC = 0;
//        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
//        hmDescEstados.put("1", "Match");
//        hmDescEstados.put("2", "Liq. Without EECC");
//        hmDescEstados.put("3", "Bank whitout Liquidacion");
//        hmDescEstados.put("4", "Match with Differences");
//
//        CallableStatement cstmt = null;
//        ResultSet rst = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02055(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//            cstmt.registerOutParameter(10, Types.INTEGER);
//            cstmt.registerOutParameter(11, Types.INTEGER);
//            cstmt.registerOutParameter(12, Types.INTEGER);
//            cstmt.registerOutParameter(13, Types.INTEGER);
//
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt.setString(2, filter.IN_TDOC);
//            cstmt.setString(3, filter.IN_DATE);
//            cstmt.setString(4, filter.SDATE);
//            cstmt.setString(5, filter.MERCHN.trim());
//            cstmt.setString(6, filter.CBANK.trim());
//            cstmt.setString(7, filter.IN_STVAL.trim());
//            cstmt.setString(8, filter.SCURRENCY.trim());
//            cstmt.setString(9, filter.DATEF.trim());
//
//            cstmt.setInt(10, filter.page.PAGNUM);
//            cstmt.setInt(11, filter.page.PAGROW);
//            cstmt.setInt(12, filter.page.TOTPAG);
//            cstmt.setInt(13, filter.page.TOTROW);
//            cstmt.execute();
//
//            filter.page.PAGNUM = cstmt.getInt(10);
//            filter.page.PAGROW = cstmt.getInt(11);
//            filter.page.TOTPAG = cstmt.getInt(12);
//            filter.page.TOTROW = cstmt.getInt(13);
//
//            rst = cstmt.getResultSet();
//
//            while (rst.next()) {
//                SVFOP = rst.getDouble("SVFOP");
//                QTYDOC = rst.getInt("QTYDOC");
//            }
//            rst.close();
//
//            if (cstmt.getMoreResults()) {
//                rst = cstmt.getResultSet();
//
//                while (rst.next()) {
//
//                    beanTkt = new A2290Filter();
//                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
//                    beanTkt.IN_DATE = filter.IN_DATE.trim();
//                    beanTkt.SDATE = filter.SDATE;
//                    beanTkt.CBANK = filter.CBANK;
//                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
//                    beanTkt.strFormatDate = filter.strFormatDate.trim();
//                    beanTkt.strTitulo = filter.strTitulo;
//                    beanTkt.DATEF = filter.DATEF;
//
//                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY");
//                    beanTkt.CODEBANK = rst.getString("CODEBANK");
//                    beanTkt.DATEF = rst.getString("DATEF");
//                    beanTkt.MERCHN = rst.getString("MERCHN");
//                    beanTkt.strDescMerchn = rst.getString("DESC_MERCH");
//                    beanTkt.TIPOTAR = rst.getString("TIPOTAR");
//                    beanTkt.SCARCOD = rst.getString("SCARCOD");
//                    beanTkt.strADescCard = rst.getString("DESC_CARCOD");
//                    beanTkt.SCARDN = rst.getString("SCARDN");
//                    beanTkt.SAUTHOC = rst.getString("SAUTHOC");
//                    beanTkt.TDOC = rst.getString("TDOC");
//                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
//                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
//                    } else {
//                        beanTkt.STVAL = rst.getString("STVAL").trim();
//                    }
//                    beanTkt.SVFOP = rst.getDouble("SVFOP");
//                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
//                    beanTkt.QTYDOC = rst.getInt("QTYDOC");
//                    beanTkt.SAGENT = rst.getString("SAGENT");
//                    beanTkt.strDescAFTE = rst.getString("strAgent");
//                    beanTkt.FTE = rst.getString("FTE");
//
//                    beanTkt.totSVFOP = SVFOP;
//                    beanTkt.totQTYDOC = QTYDOC;;
//
//                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
//                    beanTkt.page.PAGROW = filter.page.PAGROW;
//                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
//                    beanTkt.page.TOTROW = filter.page.TOTROW;
//
//                    lstTkts.add(beanTkt);
//                }
//                rst.close();
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            e.getMessage();
//        } finally {
//            if (rst != null) {
//                try {
//                    rst.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return lstTkts;
//    }
//

    public A2290Filter loadPX287SQP00844(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Liq. Without EECC");
        hmDescEstados.put("3", "Bank whitout Liquidacion");
        hmDescEstados.put("4", "Match with Differences");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00844(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.SDATE);
            cstmt.setString(5, filter.BANDOC);
            cstmt.setString(6, filter.SAUTHOC);
            cstmt.setString(7, filter.SCARDN);
            cstmt.setString(8, filter.SCARCOD);
            cstmt.setString(9, filter.IN_MERCHN.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {

                beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                beanTkt.IN_DATE = filter.IN_DATE.trim();
                beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                beanTkt.strFormatDate = filter.strFormatDate.trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();

                if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                }
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                    beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.ADATE = rst.getString("ADATE").trim();
                beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                beanTkt.BANDOC = rst.getString("BANDOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.NETO = rst.getDouble("NETO");
                beanTkt.NETOC = rst.getDouble("NETOC");
                beanTkt.QTYTRAS = rst.getInt("QTYTRAS");
                beanTkt.QTYTRAN1 = rst.getInt("QTYTRAN1");
                beanTkt.QTYTRAN3 = rst.getInt("QTYTRAN3");
                beanTkt.VALDATE = rst.getString("VALDATE").trim();

                beanTkt.USCR = rst.getString("USCR").trim();
                beanTkt.FECR = rst.getString("FECR").trim();
                beanTkt.HOCR = rst.getString("HOCR").trim();
                beanTkt.USUP = rst.getString("USUP").trim();
                beanTkt.FEUP = rst.getString("FEUP").trim();
                beanTkt.HOUP = rst.getString("HOUP").trim();
            }
            rst.close();

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
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

        return beanTkt;
    }
}
