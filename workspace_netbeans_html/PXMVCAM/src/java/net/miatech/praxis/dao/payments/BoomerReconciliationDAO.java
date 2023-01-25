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
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class BoomerReconciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public BoomerReconciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BoomerReconciliationDAO(IServerSession ss) {
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

    public List<A2290Filter> loadPX287SQP00838(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQBANK = 0, lngTotQBANK_R = 0, lngTotQPAY = 0, lngTotQDIFF = 0, total = 0;
        long lngTotQTYTRA = 0, lngTotQTYDOC = 0;

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
                lngTotQBANK = rst.getLong("QBANK");
                // lngTotQBANK_R = rst.getLong("QBANK_R");
                total = lngTotQBANK + lngTotQBANK_R;
                lngTotQPAY = rst.getLong("QPAY");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQTYTRA = rst.getLong("QTYTRA");
                lngTotQTYDOC = rst.getLong("QTYDOC");
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
                    beanTkt.lngQPAS48 = rst.getLong("QBANK");
                    //  beanTkt.QBANKRFND = rst.getLong("QBANK_R");
                    beanTkt.Total = beanTkt.lngQPAS48 + beanTkt.QBANKRFND;
                    beanTkt.lngQPAID = rst.getLong("QPAY");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QDIFF");
                    beanTkt.lngQTOTWS = rst.getLong("QMATCH") + rst.getLong("QDIFF") + rst.getLong("QBANK") + rst.getLong("QPAY");
                    beanTkt.lngQTEF = rst.getLong("QTYTRA");
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQPAS48 = lngTotQBANK;
                    //  beanTkt.totQBANKRFND = lngTotQBANK_R;
                    beanTkt.totTotal = total;
                    beanTkt.lngTotQPAID = lngTotQPAY;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQTOTSAL = lngTotQMATCH + lngTotQDIFF;
                    beanTkt.lngTotQTOTWS = lngTotQMATCH + lngTotQDIFF + lngTotQBANK + lngTotQPAY;
                    beanTkt.lngTotQTEF = lngTotQTYTRA;
                    beanTkt.lngTotQTYDOC = lngTotQTYDOC;

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
        long lngTotQMATCH = 0, lngTotQBANK = 0, lngTotQBANK_R = 0, lngTotQPAY = 0, lngTotQDIFF = 0;
        long lngTotQTYTRA = 0, lngTotQTYDOC = 0;

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
                lngTotQBANK = rst.getLong("QBANK");
                lngTotQBANK_R = rst.getLong("QBANKR");
                lngTotQPAY = rst.getLong("QPAY");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQTYTRA = rst.getLong("QTYTRA");
                lngTotQTYDOC = rst.getLong("QTYDOC");
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

                    /*if (rst.getString("CBANK").trim().isEmpty()) {
                     beanTkt.CBANK = "**";
                     beanTkt.strDescripcion = "(Empty)";
                     } else {
                     beanTkt.CBANK = rst.getString("CBANK").trim();
                     if (hmDescBank.containsKey(rst.getString("CBANK").trim().toUpperCase())) {
                     beanTkt.strDescripcion = hmDescBank.get(rst.getString("CBANK").trim()).toString();
                     }
                     }*/
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
                    beanTkt.lngQPAS48 = rst.getLong("QBANK");
                    beanTkt.QBANKRFND = rst.getLong("QBANKR");
                    beanTkt.lngQPAID = rst.getLong("QPAY");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQTEF = rst.getLong("QTYTRA");
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QDIFF");
                    beanTkt.lngQTOTWS = rst.getLong("QMATCH") + rst.getLong("QDIFF") + rst.getLong("QBANK") + rst.getLong("QPAY");
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQPAS48 = lngTotQBANK;
                    beanTkt.totQBANKRFND = lngTotQBANK_R;
                    beanTkt.lngTotQPAID = lngTotQPAY;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQTOTSAL = lngTotQMATCH + lngTotQDIFF;
                    beanTkt.lngTotQTOTWS = lngTotQMATCH + lngTotQDIFF + lngTotQBANK + lngTotQPAY;
                    beanTkt.lngTotQTEF = lngTotQTYTRA;
                    beanTkt.lngTotQTYDOC = lngTotQTYDOC;

                    if (filter.IN_DATE.trim().equals("DATEP")) {
                        beanTkt.strTitulo = "Deposit Date : " + filter.strFormatDate;
                    } else {
                        beanTkt.strTitulo = "Payment Date : " + filter.strFormatDate;
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
        long lngTotQMATCH = 0, lngTotQBANK = 0, lngTotQBANK_R = 0, lngTotQPAY = 0, lngTotQDIFF = 0;
        long lngTotQTYTRA = 0, lngTotQTYDOC = 0;

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
                lngTotQBANK = rst.getLong("QBANK");
                lngTotQBANK_R = rst.getLong("QBANKR");
                lngTotQPAY = rst.getLong("QPAY");
                lngTotQDIFF = rst.getLong("QDIFF");
                lngTotQTYTRA = rst.getLong("QTYTRA");
                lngTotQTYDOC = rst.getLong("QTYDOC");
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
                    beanTkt.lngQPAS48 = rst.getLong("QBANK");
                    beanTkt.QBANKRFND = rst.getLong("QBANKR");
                    beanTkt.lngQPAID = rst.getLong("QPAY");
                    beanTkt.lngQDIFF = rst.getLong("QDIFF");
                    beanTkt.lngQTEF = rst.getLong("QTYTRA");
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
                    beanTkt.lngQTOTSAL = rst.getLong("QMATCH") + rst.getLong("QDIFF");
                    beanTkt.lngQTOTWS = rst.getLong("QMATCH") + rst.getLong("QDIFF") + rst.getLong("QBANK") + rst.getLong("QPAY");
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQPAS48 = lngTotQBANK;
                    beanTkt.totQBANKRFND = lngTotQBANK_R;
                    beanTkt.lngTotQPAID = lngTotQPAY;
                    beanTkt.lngTotQDIFF = lngTotQDIFF;
                    beanTkt.lngTotQTOTSAL = lngTotQMATCH + lngTotQDIFF;
                    beanTkt.lngTotQTOTWS = lngTotQMATCH + lngTotQDIFF + lngTotQBANK + lngTotQPAY;
                    beanTkt.lngTotQTEF = lngTotQTYTRA;
                    beanTkt.lngTotQTYDOC = lngTotQTYDOC;

                    if (filter.IN_DATE.trim().equals("DATEP")) {
                        beanTkt.strTitulo = "Deposit Date : " + filter.strFormatDate + " - Bank : " + filter.strCREJEC;
                    } else {
                        beanTkt.strTitulo = "Payment Date : " + filter.strFormatDate + " - Bank : " + filter.strCREJEC;
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
        long lngTotCant = 0;
        double dblDAMOUNT = 0, dblDAMOUNTR = 0, AMT_RFND = 0;
        long lngTotQTYTRA = 0, lngTotQTYDOC = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Bank Without Payment");
        hmDescEstados.put("3", "Payment Without Bank");
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
                lngTotCant += rst.getLong("CANT");
                dblDAMOUNT += rst.getDouble("DAMOUNT");
                AMT_RFND += rst.getDouble("AMT_RFND");
                dblDAMOUNTR += rst.getDouble("DAMOUNTR");
                lngTotQTYTRA += rst.getLong("QTYTRA");
                // lngTotQTYDOC += rst.getLong("QTYDOC");
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
                    beanTkt.TTRAN = rst.getString("TTRAN").trim();
                    beanTkt.BAID = rst.getString("EAID").trim();
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();//Fecha de Arch. Liquidacion
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    beanTkt.dblAMOUNT = rst.getDouble("DAMOUNT");
                    beanTkt.AMTRFND = rst.getDouble("AMT_RFND");
                    beanTkt.DIFF_SVFOP = beanTkt.dblAMOUNT - beanTkt.AMTRFND;
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.BDATEL = rst.getString("DATEP").trim();//Fecha de Deposito
                    beanTkt.CBANK = rst.getString("CBANK").trim();
                    beanTkt.MERCHNR = rst.getString("MERCHNR").trim();
                    if (rst.getString("NMERCHNR") != null && !rst.getString("NMERCHNR").trim().equals("-")) {
                        beanTkt.strDescMerchnR = rst.getString("NMERCHNR").trim();
                    }
                    beanTkt.dblAMOUNTR = rst.getDouble("DAMOUNTR");
                    beanTkt.ACURRENCY = rst.getString("CURRENCYR").trim();
                    //beanTkt.strDescripcion = rst.getString("DESCRI").trim();
                    beanTkt.TTRAN = rst.getString("TTRAN").trim();
                    if (beanTkt.TTRAN.trim().equals("A")) {
                        beanTkt.strDescTTRAN = "Pay";
                    } else if (beanTkt.TTRAN.trim().equals("C")) {
                        beanTkt.strDescTTRAN = "Charge";
                    }
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.STATUSC = rst.getString("STATUSC").trim();
                    beanTkt.lngQTEF = rst.getLong("QTYTRA");
                    //   beanTkt.lngQTYDOC = rst.getLong("QTYDOC");

                    beanTkt.lngTotQTYDOC = lngTotCant;
                    beanTkt.dblTotAMOUNT = dblDAMOUNT;
                    //beanTkt.totDIFF_SVFOP=dblDAMOUNT-AMT_RFND;
                    beanTkt.dblTotAMOUNTR = dblDAMOUNTR;
                    beanTkt.lngTotQTEF = lngTotQTYTRA;
                    beanTkt.lngTotQTYDOC = lngTotQTYDOC;

                    if (filter.IN_DATE.trim().equals("DATEP")) {
                        beanTkt.strTitulo = "Deposit Date : " + filter.SDATE;
                    } else {
                        beanTkt.strTitulo = "Payment Date : " + filter.SDATE;
                    }

                    beanTkt.strTitulo = beanTkt.strTitulo + " - Bank : " + beanTkt.strCREJEC.trim();

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

    public List<A2290Filter> loadPX287SQP00924(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        //double dblTotDAMOUNTR = 0, dblTotDAMOUNT = 0, AMOUNTR = 0, AMOUNTS = 0;
        long lngTotQTYTRA = 0, lngTotQTYDOC = 0, lngTotQty = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("3", "Bank Statement without Settlement");
        hmDescEstados.put("2", "Settlement without Statement");
        hmDescEstados.put("4", "Match with Differences");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00924(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.SDATE);
            cstmt.setString(5, filter.IN_MERCHN.trim());
            cstmt.setString(6, filter.IN_STVAL.trim());
            cstmt.setString(7, filter.IN_BANK.trim());
            cstmt.setString(8, filter.IN_TTRAN.trim());

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQty = rst.getLong("QTY");
                lngTotQTYTRA = rst.getLong("QTYTRA");
                lngTotQTYDOC = rst.getLong("QTYDOC");
                //AMOUNTR = rst.getDouble("AMOUNTR");
                //AMOUNTS = rst.getDouble("AMOUNTS");
                //dblTotDAMOUNTR = rst.getDouble("DAMOUNTR");
                //dblTotDAMOUNT = rst.getDouble("DAMOUNT");
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
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();

                    if (rst.getString("CODEBANK").trim().isEmpty()) {
                        beanTkt.CBANK = "**";
                        beanTkt.strDescripcion = "(Empty)";
                        beanTkt.strCREJEC = "(Empty)";

                    } else {
                        beanTkt.CBANK = rst.getString("CODEBANK").trim();
                        if (rst.getString("NAMEBANK") != null && !rst.getString("NAMEBANK").trim().equals("-")) {
                            beanTkt.strDescripcion = rst.getString("NAMEBANK").trim();
                            beanTkt.strCREJEC = rst.getString("NAMEBANK").trim();
                        }
                    }

                    beanTkt.lngQACCB = rst.getLong("QTY");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.AMOUNTS = rst.getLong("AMOUNTS");
                    beanTkt.AMOUNTR = rst.getLong("AMOUNTR");
                    beanTkt.DAMOUNT = rst.getLong("DAMOUNT");
                    beanTkt.SVFOP = rst.getLong("DAMOUNTR");
                    beanTkt.lngQTEF = rst.getLong("QTYTRA");
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
                    beanTkt.lngTotQACCB = lngTotQty;
                    beanTkt.lngTotQTEF = lngTotQTYTRA;
                    beanTkt.lngTotQTYDOC = lngTotQTYDOC;
                    //beanTkt.dblTotAMOUNT = AMOUNTS;
                    //beanTkt.dblTotAMOUNTR = AMOUNTR;
                    //beanTkt.dblTotSVFOP = dblTotDAMOUNTR;
                    //beanTkt.dblTotAVFOP = dblTotDAMOUNT;
                    //beanTkt.totDIFF_SVFOP = dblTotDAMOUNT - dblTotDAMOUNTR;

                    if (filter.IN_DATE.trim().equals("DATEPR")) {
                        beanTkt.strTitulo = "Deposit Date : " + filter.strFormatDate + " ** " + hmDescEstados.get(filter.IN_STVAL.trim()).toString() + " **";
                    } else {
                        beanTkt.strTitulo = "Payment Date : " + filter.strFormatDate + " ** " + hmDescEstados.get(filter.IN_STVAL.trim()).toString() + " **";
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

    public List<A2290Filter> loadPX287SQP00925(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        //double dblTotDAMOUNTR = 0, dblTotDAMOUNT = 0;
        long lngTotQty = 0, lngTotQTYTRA = 0, lngTotQTYDOC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00925(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(4, filter.SDATE);
            cstmt.setString(5, filter.IN_MERCHN.trim());
            cstmt.setString(6, filter.CBANK.trim());
            cstmt.setString(7, filter.IN_STVAL.trim());
            cstmt.setString(8, filter.SCURRENCY.trim());
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
                lngTotQty = rst.getLong("QTY");
                lngTotQTYTRA = rst.getLong("QTYTRA");
                lngTotQTYDOC = rst.getLong("QTYDOC");
                //dblTotDAMOUNTR = rst.getDouble("DAMOUNTR");
                //dblTotDAMOUNT = rst.getDouble("DAMOUNT");
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
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.CBANK = filter.CBANK.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();
                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();

                    beanTkt.SDATE = rst.getString("DATE");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.lngQACCB = rst.getLong("QTY");
                    beanTkt.lngQTEF = rst.getLong("QTYTRA");
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
                    beanTkt.AMOUNTS = rst.getLong("AMOUNTS");
                    beanTkt.AMOUNTR = rst.getLong("AMOUNTR");
                    beanTkt.DAMOUNT = rst.getLong("DAMOUNT");
                    beanTkt.SVFOP = rst.getLong("DAMOUNTR");
                    beanTkt.lngTotQACCB = lngTotQty;
                    beanTkt.lngTotQTEF = lngTotQTYTRA;
                    beanTkt.lngTotQTYDOC = lngTotQTYDOC;
                    //beanTkt.dblTotSVFOP = dblTotDAMOUNTR;
                    //beanTkt.dblTotAVFOP = dblTotDAMOUNT;
                    //beanTkt.totDIFF_SVFOP = dblTotDAMOUNT - dblTotDAMOUNTR;

                    beanTkt.strTitulo = filter.strTitulo + "Bank : " + filter.CBANK.trim() + " - " + filter.strCREJEC;

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

    public List<A2290Filter> loadPX287SQP00926(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double dblTotDAMOUNTR = 0, dblTotDAMOUNT = 0, AMT_RFND = 0, AMOUNTS = 0, AMOUNTR = 0;
        long lngTotQTYTRA = 0, lngTotQTYDOC = 0, lngTotQty = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("3", "Bank Statement without Settlement");
        hmDescEstados.put("2", "Settlement without Statement");
        hmDescEstados.put("4", "Match with Differences");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00926(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(4, filter.SDATE);
            cstmt.setString(5, filter.IN_MERCHN.trim());
            cstmt.setString(6, filter.CBANK.trim());
            cstmt.setString(7, filter.IN_STVAL.trim());
            cstmt.setString(8, filter.SCURRENCY.trim());
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
                lngTotQty = rst.getLong("QTY");
                lngTotQTYTRA = rst.getLong("QTYTRA");
                lngTotQTYDOC = rst.getLong("QTYDOC");
                AMOUNTS = rst.getDouble("AMOUNTS");
                AMOUNTR = rst.getDouble("AMOUNTR");
                dblTotDAMOUNTR = rst.getDouble("DAMOUNTR");
                dblTotDAMOUNT = rst.getDouble("DAMOUNT");
                //  AMT_RFND = rst.getDouble("AMT_RFND");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.CBANK = filter.CBANK.trim();
                    beanTkt.SCURRENCY = filter.SCURRENCY.trim();
                    beanTkt.SDATE = filter.SDATE.trim();
                    beanTkt.strCREJEC = filter.strCREJEC.trim();
                    beanTkt.IN_TTRAN = filter.IN_TTRAN.trim();

                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.BAID = rst.getString("EAID").trim();
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    beanTkt.TDATE = rst.getString("TDATE").trim();
                    beanTkt.DATEF = rst.getString("DATEF").trim();
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.AMOUNTS = rst.getLong("AMOUNTS");
                    beanTkt.AMOUNTR = rst.getLong("AMOUNTR");

                    beanTkt.DAMOUNT = rst.getDouble("DAMOUNT");
                    // beanTkt.AMTRFND = rst.getDouble("AMT_RFND");
                    beanTkt.DIFF_SVFOP = beanTkt.dblAMOUNT - beanTkt.AMTRFND;
                    beanTkt.BDATEL = rst.getString("DATEP").trim();
                    beanTkt.CBANK = rst.getString("CBANK").trim();
                    beanTkt.MERCHNR = rst.getString("MERCHNR").trim();
                    if (rst.getString("NMERCHNR") != null && !rst.getString("NMERCHNR").trim().equals("-")) {
                        beanTkt.strDescMerchnR = rst.getString("NMERCHNR").trim();
                    }
                    beanTkt.dblAMOUNTR = rst.getDouble("DAMOUNTR");
                    beanTkt.ACURRENCY = rst.getString("CURRENCYR").trim();
                    beanTkt.strDescripcion = rst.getString("DESCRI").trim();
                    beanTkt.DATEC = rst.getString("DATEC").trim();
                    beanTkt.STATUSC = rst.getString("STATUSC").trim();
                    beanTkt.lngQTEF = rst.getLong("QTYTRA");
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
                    beanTkt.TTRAN = rst.getString("TTRAN").trim();
                    if (beanTkt.TTRAN.trim().equals("A")) {
                        beanTkt.strDescTTRAN = "Pay";
                    } else if (beanTkt.TTRAN.trim().equals("C")) {
                        beanTkt.strDescTTRAN = "Charge";
                    }

                    beanTkt.lngTotQTYDOC = lngTotQty;
                    beanTkt.lngTotQTEF = lngTotQTYTRA;
                    beanTkt.lngTotQTYDOC = lngTotQTYDOC;
                    beanTkt.dblTotAMOUNT = AMOUNTS;
                    beanTkt.dblTotAMOUNTR = AMOUNTR;
                    beanTkt.dblTotAVFOP = dblTotDAMOUNTR;
                    beanTkt.dblTotSVFOP = dblTotDAMOUNT;
                    beanTkt.totAMTRFND = AMT_RFND;
                    beanTkt.totDIFF_SVFOP = dblTotDAMOUNT - AMT_RFND;
                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    if (filter.IN_DATE.trim().equals("DATEP")) {
                        beanTkt.strTitulo = "Deposit Date : " + filter.SDATE + " ** " + hmDescEstados.get(filter.IN_STVAL.trim()).toString() + " **";
                    } else {
                        beanTkt.strTitulo = "Payment Date : " + filter.SDATE + " ** " + hmDescEstados.get(filter.IN_STVAL.trim()).toString() + " **";
                    }

                    beanTkt.strTitulo = beanTkt.strTitulo + "Bank : " + filter.CBANK.trim() + " - " + filter.strCREJEC;

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

    public List<A2290Filter> loadPX287SQP02055(A2290Filter filter) throws SQLException, Exception, Exception, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        double SVFOP = 0;
        int QTYDOC = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("3", "Bank Statement without Settlement");
        hmDescEstados.put("2", "Settlement without Statement");
        hmDescEstados.put("4", "Match with Differences");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02055(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(4, filter.SDATE);
            cstmt.setString(5, filter.MERCHN.trim());
            cstmt.setString(6, filter.CBANK.trim());
            cstmt.setString(7, filter.IN_STVAL.trim());
            cstmt.setString(8, filter.SCURRENCY.trim());
            cstmt.setString(9, filter.DATEF.trim());

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
                SVFOP = rst.getDouble("SVFOP");
                QTYDOC = rst.getInt("QTYDOC");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.SDATE = filter.SDATE;
                    beanTkt.CBANK = filter.CBANK;
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.strTitulo = filter.strTitulo;
                    beanTkt.DATEF = filter.DATEF;

                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY");
                    beanTkt.CODEBANK = rst.getString("CODEBANK");
                    beanTkt.DATEF = rst.getString("DATEF");
                    beanTkt.MERCHN = rst.getString("MERCHN");
                    beanTkt.strDescMerchn = rst.getString("DESC_MERCH");
                    beanTkt.TIPOTAR = rst.getString("TIPOTAR");
                    beanTkt.SCARCOD = rst.getString("SCARCOD");
                    beanTkt.strADescCard = rst.getString("DESC_CARCOD");
                    beanTkt.SCARDN = rst.getString("SCARDN");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                    beanTkt.TDOC = rst.getString("TDOC");
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.STVAL = rst.getString("STVAL").trim();
                    }
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.QTYDOC = rst.getInt("QTYDOC");
                    beanTkt.SAGENT = rst.getString("SAGENT");
                    beanTkt.strDescAFTE = rst.getString("strAgent");
                    beanTkt.FTE = rst.getString("FTE");

                    beanTkt.totSVFOP = SVFOP;
                    beanTkt.totQTYDOC = QTYDOC;;

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

    public A2290Filter loadPX287SQP00844(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00844(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TDOC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.SDATE);
            cstmt.setString(5, filter.BAID);
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {

                beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                beanTkt.IN_DATE = filter.IN_DATE.trim();
                beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                beanTkt.strFormatDate = filter.strFormatDate.trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.BAID = rst.getString("EAID").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.TDATE = rst.getString("TDATE").trim();
                beanTkt.DATEF = rst.getString("DATEf").trim();
                beanTkt.BDATEP = rst.getString("BDATEP").trim();//FECHA LIQUIDACION
                beanTkt.MERCHN = rst.getString("MERCHN").trim();
                if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                    beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                }
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.AMOUNTS = rst.getDouble("AMOUNTS");
                beanTkt.QTYTRAS = rst.getLong("QTYTRAS");
                beanTkt.QTYDOCS = rst.getLong("QTYDOCS");
                //beanTkt.dblAMOUNT = rst.getDouble("AMOUNTS") + rst.getDouble("AMOUNTR");
                beanTkt.AMOUNTR = rst.getDouble("AMOUNTR");
                beanTkt.QTYTRAR = rst.getLong("QTYTRAR");
                beanTkt.QTYDOCR = rst.getLong("QTYDOCR");

                beanTkt.dblAMOUNT = rst.getDouble("AMOUNTN");
                beanTkt.DATET = rst.getString("DATEP").trim();//FECHA DEPOSITO
                beanTkt.CBANK = rst.getString("CBANK").trim();
                beanTkt.MERCHNR = rst.getString("MERCHNR").trim();
                if (rst.getString("NMERCHNR") != null && !rst.getString("NMERCHNR").trim().equals("-")) {
                    beanTkt.strDescMerchnR = rst.getString("NMERCHNR").trim();
                }
                beanTkt.dblAMOUNTR = rst.getDouble("DAMOUNTR");
                beanTkt.ACURRENCY = rst.getString("CURRENCYR").trim();
                beanTkt.strDescripcion = rst.getString("DESCRI").trim();

                beanTkt.DATEC = rst.getString("DATEC").trim();
                beanTkt.STATUSC = rst.getString("STATUSC").trim();

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

    public List<A2290Filter> loadPX407SQP01938(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQTEF = 0, lngTotQPAS48 = 0;//Transacciones
        long lngTotQTOTSAL = 0, QMATCH_MAN = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01938(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_PAYMENT.trim());
            cstmt.setString(7, filter.IN_BANK);
            cstmt.setString(8, filter.IN_CARDC.trim());
            //cstmt.setString(9, filter.IN_CARDN.trim());
            cstmt.setString(9, filter.IN_CARDN1.trim());
            cstmt.setString(10, filter.IN_CARDN2.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQTEF = rst.getLong("QTEF");
                lngTotQPAS48 = rst.getLong("QPAS48");
                lngTotQTOTSAL = rst.getLong("QTOTSAL");
                QMATCH_MAN = rst.getLong("QMATCH_MAN");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.IN_SDATE = rst.getString("DATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    //beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK;

                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQTEF = rst.getLong("QTEF");
                    beanTkt.lngQPAS48 = rst.getLong("QPAS48");
                    beanTkt.lngQTOTSAL = rst.getLong("QTOTSAL");
                    beanTkt.lngQMANUAL = rst.getLong("QMATCH_MAN");

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQTEF = lngTotQTEF;
                    beanTkt.lngTotQPAS48 = lngTotQPAS48;
                    beanTkt.lngTotQTOTSAL = lngTotQTOTSAL;
                    beanTkt.lngTotQMANUAL = QMATCH_MAN;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A2290Filter> loadPX407SQP01939(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQTEF = 0, lngTotQPAS48 = 0;//Transacciones
        long QMATCH_MAN = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01939(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_PAYMENT.trim());
            cstmt.setString(6, filter.IN_BANK);
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_CARDN1.trim());
            cstmt.setString(9, filter.IN_CARDN2.trim());
            cstmt.setString(10, filter.SORIG.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQMATCH = rst.getLong("QMATCH");
                lngTotQTEF = rst.getLong("QTEF");
                lngTotQPAS48 = rst.getLong("QPAS48");
                QMATCH_MAN = rst.getLong("QMATCH_MAN");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    //beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.strSORIG = filter.strSORIG.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.lngQTEF = rst.getLong("QTEF");
                    beanTkt.lngQPAS48 = rst.getLong("QPAS48");
                    beanTkt.lngQMANUAL = rst.getLong("QMATCH_MAN");
                    //CUPONES CON LIQ BANCARIA (A2291) SIN ACCB EN LA VENTA (A2290)
                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQTEF = lngTotQTEF;
                    beanTkt.lngTotQPAS48 = lngTotQPAS48;
                    beanTkt.lngTotQMANUAL = QMATCH_MAN;

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

    public List<A2290Filter> loadPX407SQP01940(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0, lngQtyDoc = 0;
        double dblTotSVFOP = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01940(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_COUNTRY.trim());
            cstmt.setString(6, filter.IN_CARDN1.trim());
            cstmt.setString(7, filter.IN_CARDN2.trim());
            cstmt.setString(8, filter.IN_CARDC.trim());
            cstmt.setString(9, filter.SCURRENCY.trim());
            cstmt.setString(10, filter.SORIG.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_BANK.trim());

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                lngQtyDoc += rst.getLong("QTYDOC");
                dblTotSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.SEQ = rst.getString("SEQ").trim();
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    if (rst.getString("BDATEP").trim().length() == 6) {
                        beanTkt.BDATEP = Functions.FormatFecha(rst.getString("BDATEP").trim(), "yyMMdd", "yyyyMMdd");
                    } else {
                        beanTkt.BDATEP = rst.getString("BDATEP").trim();
                    }
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.BAID = rst.getString("BAID").trim();
                    beanTkt.MERCHN = rst.getString("MERCHNR").trim();
                    if (rst.getString("MERCHNR") != null && !rst.getString("MERCHNR").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("MERCHNR").trim();
                    }
                    beanTkt.REFBOOMER = rst.getString("REFBOOMER").trim();
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.lngTotQTYDOC = lngQtyDoc;
                    beanTkt.dblTotSVFOP = dblTotSVFOP;
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

    public List<A2290Filter> loadPX407SQP01941(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0;
        String estado = "", strTitulo = "";
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");
        hmDescEstados.put("P", "Paying w/o Sales");
        hmDescEstados.put("C", "Clarifications");
        hmDescEstados.put("H", "Chargebacks");

        HashMap<String, String> hmDescOrigen = new HashMap<String, String>();
        hmDescOrigen.put("B", "Banamex");
        hmDescOrigen.put("A", "American");
        hmDescOrigen.put("P", "Pagatodo");
        hmDescOrigen.put("C", "Citibank");
        hmDescOrigen.put("S", "Santander");
        hmDescOrigen.put("N", "Banorte");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01941(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.SDATE);
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.IN_CARDC.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.IN_MERCHN.trim());
            cstmt.setString(12, filter.IN_AGENT.trim());
            cstmt.setString(13, filter.IN_BANK.trim());

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.SDATE.trim());
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();
                    beanTkt.SDATE = filter.SDATE;

                    beanTkt.SCARCOD = rst.getString("CARD").trim();
                    beanTkt.strDescCard = rst.getString("NAMECAR").trim();
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();
                    beanTkt.SORIG = rst.getString("SORIG").trim();

                    if (hmDescOrigen.containsKey(rst.getString("SORIG").trim())) {
                        beanTkt.strSORIG = hmDescOrigen.get(rst.getString("SORIG").trim());
                    } else {
                        beanTkt.strSORIG = rst.getString("SORIG").trim();
                    }

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblSVFOP;

                    if (!filter.IN_BSTVAL.trim().equals("")) {
                        estado = hmDescEstados.get(beanTkt.IN_BSTVAL).toString();
                    }

                    if (filter.IN_STVAL.trim().equals("1")) {
                        estado = "Match";
                    } else if (filter.IN_STVAL.trim().equals("2")) {
                        estado = "Settlement w/o Paying";
                    } else if (filter.IN_STVAL.trim().equals("3")) {
                        estado = "Paying w/o Settlement";
                    } /*else if (filter.IN_STVAL.trim().equals("4")) {
                     estado = "Match with Differences";
                     } */ else if (filter.IN_STVAL.trim().equals("4")) {
                        estado = "Match Manual";
                    }

                    if (filter.strFecFiltro.trim().equals("BDATEP")) {
                        strTitulo = "Conciliaton Date : ";
                    } else {
                        if (filter.IN_TDOC.trim().equals("R")) {
                            strTitulo = "Refund Date : ";
                        } else {
                            strTitulo = "Sales Date : ";
                        }
                    }
                    strTitulo += beanTkt.strFormatDate + " *** " + estado + " ***";
                    beanTkt.strTitulo = strTitulo;

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

    public List<A2290Filter> loadPX407SQP01942(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0;
        double dblSVFOP = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01942(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.SORIG.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());
            cstmt.setString(13, filter.IN_AGENT.trim());
            cstmt.setString(14, filter.IN_BANK.trim());

            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.strSORIG = filter.strSORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.SCURRENCY = rst.getString("CURRENCY").trim();

                    beanTkt.lngQACCB = rst.getLong("CANT");
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.dblTotSVFOP = dblSVFOP;
                    beanTkt.strTitulo = filter.strTitulo + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard;

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

    public List<A2290Filter> loadPX407SQP01943(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0, lngQtyDoc = 0;
        double dblSVFOP = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");

        String estado = "", strTitulo = "";
        HashMap<String, String> hmDescEstadosTit = new HashMap<String, String>();
        hmDescEstadosTit.put("1", "Accepted");
        hmDescEstadosTit.put("2", "Rejected");
        hmDescEstadosTit.put("3", "Suspect");
        hmDescEstadosTit.put("P", "Paying w/o Sales");
        hmDescEstadosTit.put("C", "Clarifications");
        hmDescEstadosTit.put("H", "Chargebacks");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01943(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.SORIG.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());
            cstmt.setString(13, filter.IN_AGENT.trim());
            cstmt.setString(14, filter.IN_BANK.trim());

            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                lngQtyDoc += rst.getLong("QTYDOC");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();

                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.strDescStatus = rst.getString("NOMAGENT").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    if (beanTkt.strPEM.trim().equals("01")) {
                        beanTkt.strPEM = "Manual";
                    } else if (beanTkt.strPEM.trim().equals("05")) {
                        beanTkt.strPEM = "Chip EMV";
                    } else if (beanTkt.strPEM.trim().equals("80")) {
                        beanTkt.strPEM = "Fallback";
                    } else if (beanTkt.strPEM.trim().equals("90")) {
                        beanTkt.strPEM = "Deslizada";
                    }
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    if (beanTkt.strFLOAD.trim().equals("M")) {
                        beanTkt.strFLOAD = "Manual";
                    }
                    beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }

                    //**********************************************************
                    if (!filter.IN_BSTVAL.trim().equals("")) {
                        estado = hmDescEstadosTit.get(beanTkt.IN_BSTVAL).toString();
                    }

                    if (filter.IN_STVAL.trim().equals("1")) {
                        estado = "Match";
                    } else if (filter.IN_STVAL.trim().equals("2")) {
                        estado = "Settlement w/o Paying";
                    } else if (filter.IN_STVAL.trim().equals("3")) {
                        estado = "Paying w/o Settlement";
                    } /*else if (filter.IN_STVAL.trim().equals("4")) {
                     estado = "Match with Differences";
                     } */ else if (filter.IN_STVAL.trim().equals("4")) {
                        estado = "Match Manual";
                    }

                    strTitulo += beanTkt.SDATE + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " *** " + estado + " ***";
                    beanTkt.strTitulo = strTitulo;

                    beanTkt.REFBOOMER = rst.getString("REFBOOMER").trim();
                    beanTkt.BCURRENCY = rst.getString("BCURRENCY").trim();
                    beanTkt.DAMOUNT = rst.getDouble("DAMOUNT");
                    beanTkt.BCURRENCY = rst.getString("BCURRENCY").trim();
                    beanTkt.BCARCOD = rst.getString("BCARCOD").trim();
                    beanTkt.BCARDN = rst.getString("BCARDN").trim();
                    if (rst.getString("DESCERROR") != null && !rst.getString("DESCERROR").trim().equals("")) {
                        beanTkt.strDescripcion = rst.getString("CERROR").trim() + " : " + rst.getString("DESCERROR").trim();
                    } else {
                        beanTkt.strDescripcion = "(**) : (Empty)";
                    }

                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.lngTotQTYDOC = lngQtyDoc;
                    beanTkt.dblTotSVFOP = dblSVFOP;
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
    
    public List<A2290Filter> loadPX407SQP03990(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotCant = 0, lngQtyDoc = 0;
        double dblSVFOP = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");

        String estado = "", strTitulo = "";
        HashMap<String, String> hmDescEstadosTit = new HashMap<String, String>();
        hmDescEstadosTit.put("1", "Accepted");
        hmDescEstadosTit.put("2", "Rejected");
        hmDescEstadosTit.put("3", "Suspect");
        hmDescEstadosTit.put("P", "Paying w/o Sales");
        hmDescEstadosTit.put("C", "Clarifications");
        hmDescEstadosTit.put("H", "Chargebacks");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03990(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.SDATE.trim());
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_CARDN1.trim());
            cstmt.setString(6, filter.IN_CARDN2.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.IN_BSTVAL.trim());
            cstmt.setString(9, filter.IN_STVAL.trim());
            cstmt.setString(10, filter.SCURRENCY.trim());
            cstmt.setString(11, filter.SORIG.trim());
            cstmt.setString(12, filter.IN_MERCHN.trim());
            cstmt.setString(13, filter.IN_AGENT.trim());
            cstmt.setString(14, filter.IN_BANK.trim());
            cstmt.setString(15, filter.IN_PNR.trim());
            
            cstmt.setInt(16, filter.page.PAGNUM);
            cstmt.setInt(17, filter.page.PAGROW);
            cstmt.setInt(18, filter.page.TOTPAG);
            cstmt.setInt(19, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(16);
            filter.page.PAGROW = cstmt.getInt(17);
            filter.page.TOTPAG = cstmt.getInt(18);
            filter.page.TOTROW = cstmt.getInt(19);

            while (rst.next()) {
                lngTotCant += rst.getLong("CANT");
                lngQtyDoc += rst.getLong("QTYDOC");
                dblSVFOP += rst.getDouble("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.strFormatDate = filter.strFormatDate.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
                    beanTkt.SCARCOD = filter.SCARCOD.trim();
                    beanTkt.strDescCard = filter.strDescCard.trim();
                    beanTkt.SORIG = filter.SORIG.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
                    beanTkt.IN_BANK = filter.IN_BANK.trim();

                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    //beanTkt.strDescStatus = rst.getString("NOMAGENT").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    if (beanTkt.strPEM.trim().equals("01")) {
                        beanTkt.strPEM = "Manual";
                    } else if (beanTkt.strPEM.trim().equals("05")) {
                        beanTkt.strPEM = "Chip EMV";
                    } else if (beanTkt.strPEM.trim().equals("80")) {
                        beanTkt.strPEM = "Fallback";
                    } else if (beanTkt.strPEM.trim().equals("90")) {
                        beanTkt.strPEM = "Deslizada";
                    }
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SVFOP = rst.getDouble("SVFOP");
                    //beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    //beanTkt.strDescCountry = rst.getString("NAMES").trim();

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    if (beanTkt.strFLOAD.trim().equals("M")) {
                        beanTkt.strFLOAD = "Manual";
                    }
                    /*beanTkt.MERCHN = rst.getString("MERCHN").trim();
                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                    }*/

                    //**********************************************************
                    if (!filter.IN_BSTVAL.trim().equals("")) {
                        estado = hmDescEstadosTit.get(beanTkt.IN_BSTVAL).toString();
                    }

                    if (filter.IN_STVAL.trim().equals("1")) {
                        estado = "Match";
                    } else if (filter.IN_STVAL.trim().equals("2")) {
                        estado = "Settlement w/o Paying";
                    } else if (filter.IN_STVAL.trim().equals("3")) {
                        estado = "Paying w/o Settlement";
                    } /*else if (filter.IN_STVAL.trim().equals("4")) {
                     estado = "Match with Differences";
                     } */ else if (filter.IN_STVAL.trim().equals("4")) {
                        estado = "Match Manual";
                    }

                    strTitulo += beanTkt.SDATE + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " *** " + estado + " ***";
                    beanTkt.strTitulo = strTitulo;

                    beanTkt.REFBOOMER = rst.getString("REFBOOMER").trim();
                    beanTkt.BCURRENCY = rst.getString("BCURRENCY").trim();
                    beanTkt.DAMOUNT = rst.getDouble("DAMOUNT");
                    beanTkt.BCURRENCY = rst.getString("BCURRENCY").trim();
                    beanTkt.BCARCOD = rst.getString("BCARCOD").trim();
                    beanTkt.BCARDN = rst.getString("BCARDN").trim();
                    /*if (rst.getString("DESCERROR") != null && !rst.getString("DESCERROR").trim().equals("")) {
                        beanTkt.strDescripcion = rst.getString("CERROR").trim() + " : " + rst.getString("DESCERROR").trim();
                    } else {
                        beanTkt.strDescripcion = "(**) : (Empty)";
                    }*/
                    
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    
                    beanTkt.lngTotQACCB = lngTotCant;
                    beanTkt.lngTotQTYDOC = lngQtyDoc;
                    beanTkt.dblTotSVFOP = dblSVFOP;
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

    public A2290Filter loadPX407SQP02076(A2290Filter filter) throws SQLException, Exception {

        A2290Filter beanTkt = new A2290Filter();
        /*HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Settlement w/o Paying");
        hmDescEstados.put("3", "Paying w/o Settlement");
        hmDescEstados.put("4", "Match Manual");*/

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02076(?,?,?,?,?,?,?,?)}";

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TDOC.trim());
            cstmt.setString(3, filter.CCIA.trim());
            cstmt.setString(4, filter.FORMA.trim());
            cstmt.setString(5, filter.SERIE.trim());
            cstmt.setString(6, filter.SEQ.trim());
            cstmt.setString(7, filter.SCARCOD.trim());
            cstmt.setString(8, filter.SCARDN.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.strTicket = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                /*if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanTkt.strDescStatus = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                }*/
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.strDescFTE = rst.getString("DESAGENT").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                //beanTkt.strSDescCard = rst.getString("DESCCOD").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                if(rst.getString("SCARDN").trim().length() > 6){
                    beanTkt.IN_CARDN1 = rst.getString("SCARDN").trim().substring(0, 6);
                    beanTkt.IN_CARDN2 = rst.getString("SCARDN").trim().substring(rst.getString("SCARDN").trim().length() - 4);
                }
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.strMoneda = rst.getString("DESCURRENCY").trim();
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                //beanTkt.strDescCountry = rst.getString("DESCOUNTRY").trim();
                
                beanTkt.BCARCOD = rst.getString("BCARCOD").trim();
                //beanTkt.strADescCard = rst.getString("DESBCCOD").trim();
                beanTkt.BCARDN = rst.getString("BCARDN").trim();
                if(rst.getString("BCARDN").trim().length() > 6){
                    beanTkt.strBCard1 = rst.getString("BCARDN").trim().substring(0, 6);
                    beanTkt.strBCard2 = rst.getString("BCARDN").trim().substring(rst.getString("BCARDN").trim().length() - 4);
                }
                beanTkt.BCURRENCY = rst.getString("BCURRENCY").trim();
                beanTkt.strBMoneda = rst.getString("DESBCURRENCY").trim();
                beanTkt.DAMOUNT = rst.getDouble("DAMOUNT");
                if (rst.getString("BDATEP").trim().length() == 6) {
                    beanTkt.BDATEP = Functions.FormatFecha(rst.getString("BDATEP").trim(), "yyMMdd", "yyyyMMdd");
                } else {
                    beanTkt.BDATEP = rst.getString("BDATEP").trim();
                }
                beanTkt.BDATEL = rst.getString("DATEP").trim();
                beanTkt.CBANK = rst.getString("CODEBANK").trim();
                //beanTkt.CODEBANK = rst.getString("NAMEBANK").trim();
                beanTkt.MERCHNR = rst.getString("MERCHNR").trim();
                beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
                
                beanTkt.dblAMOUNTR = rst.getDouble("DAMOUNTR");
                beanTkt.SCURRENCYRF = rst.getString("CURRENCYR").trim();
                beanTkt.strDescripcion = rst.getString("DESCRI").trim();
                beanTkt.CERROR = rst.getString("CERROR").trim();
                beanTkt.strDescError = rst.getString("DESCERROR").trim();
                beanTkt.DATEC = rst.getString("DATEC").trim();
                beanTkt.STATUSC = rst.getString("STATUSC").trim();

                beanTkt.strComment = rst.getString("MSJJ").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();

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
    
    public List<A2290Filter> loadPX407SQP02030(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Settlement without Paying");
        hmDescEstados.put("3", "Paying without Settlement");

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02030(?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TICKET.substring(0, 3));//CIA
            cstmt.setString(3, filter.IN_TICKET.substring(3, 7));//FORMA
            cstmt.setString(4, filter.IN_TICKET.substring(7, 13));//SERIE
            cstmt.setString(5, filter.IN_TDOC);//SERIE

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();
                beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.strPEM = "REFUND";
                } else {
                    beanTkt.strPEM = "SALES";
                }
                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();

                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                    beanTkt.STVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                }
                if (!rst.getString("ERROR").trim().isEmpty()) {
                    beanTkt.CERROR = rst.getString("CERROR").trim() + " : " + rst.getString("ERROR").trim();
                } else {
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                }
                //SALES
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                beanTkt.strDescCard = rst.getString("NAMECARS").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.MERCHN = rst.getString("MERCHNR").trim();
                
                beanTkt.ACARCOD = rst.getString("BCARCOD").trim();
                beanTkt.ACARDN = rst.getString("BCARDN").trim();
                beanTkt.BCURRENCY = rst.getString("BCURRENCY").trim();
                beanTkt.AVFOP = rst.getDouble("DAMOUNT");

                beanTkt.BDATEP = rst.getString("BDATEP").trim();
                beanTkt.CBANK = rst.getString("CODEBANK").trim();
                
                beanTkt.DAMOUNT = rst.getDouble("DAMOUNTR");
                beanTkt.ACURRENCY = rst.getString("CURRENCYR").trim();
                beanTkt.strDescripcion = rst.getString("DESCRI").trim();
               
                lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public String loadPX407SQP02077(A2290Filter filter) throws SQLException, Exception {

        //REALIZA EL UPDATE DE UN REGISTRO EN LA TABLA A2298.
        String strMsj = "SUCCESSFUL. Information Updated.";
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02077(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, "U");
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.CCIA.trim());
            cstmt.setString(4, filter.FORMA.trim());
            cstmt.setString(5, filter.SERIE.trim());
            cstmt.setString(6, filter.SEQ.trim());
            cstmt.setString(7, filter.STVAL.trim());
            cstmt.setString(8, filter.TDOC.trim());
            cstmt.setString(9, filter.SCARCOD.trim());
            cstmt.setString(10, filter.SCARDN.trim());
            cstmt.setString(11, session.getUserView().getUserInfo().USR);
            cstmt.setString(12, Functions.getFechaActual());
            cstmt.setString(13, Functions.getHoraActual());
            cstmt.setString(14, filter.strComment.toUpperCase());
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
