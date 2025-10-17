/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.io.BufferedReader;
import net.miatech.praxis.dao.interline.*;
import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A003;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class InvoiceControlDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InvoiceControlDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InvoiceControlDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
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

    public List<A2280Filter> loadPX265SQP00660(A2280Filter filter) throws SQLException, Exception {

        List<A2280Filter> lstData = new ArrayList<A2280Filter>(0);
        A2280Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00660(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CODE.trim());
            // cstmt.setString(3, filter.CODEBANK.trim());
            cstmt.setString(3, filter.COUNTRY.trim());
            cstmt.setString(4, filter.CURRENC.trim());

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A2280Filter();
                bean.RN = rst.getLong("RN");
                bean.CODE = rst.getString("CODECAR").trim();
                bean.NAME = rst.getString("NAMECAR").trim();
                bean.COUNTRY = rst.getString("COUNTRY").trim();
                bean.CURRENC = rst.getString("CURRENC").trim();
                bean.CODEBANK = rst.getString("CODEBANK").trim();
                bean.NAMEBANK = rst.getString("NAMEBANK").trim();
                bean.FSTAT = rst.getString("FSTAT").trim();
                bean.FNOBANK = rst.getString("FNOBANK").trim();
                bean.CLIENTE = rst.getString("CLIENTE").trim();

                bean.RATCNAC = rst.getDouble("RATCNAC");
                bean.RATDNAC = rst.getDouble("RATDNAC");
                bean.RATCEXT = rst.getDouble("RATCEXT");
                bean.RATEIVA = rst.getDouble("RATEIVA");
                bean.CODEQUIV = rst.getString("CODEQUIV");

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

    public String loadPX265SQP00661(A2280Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00661(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.CODE.trim());
            cstmt.setString(4, filter.NAME.trim());
            cstmt.setString(5, filter.COUNTRY.trim());
            cstmt.setString(6, filter.CURRENC.trim());
            cstmt.setString(7, filter.CODEBANK.trim());
            cstmt.setString(8, filter.NAMEBANK.trim());
            cstmt.setString(9, filter.FSTAT.trim());
            cstmt.setString(10, filter.FNOBANK.trim());
            cstmt.setDouble(11, filter.RATCNAC);
            cstmt.setDouble(12, filter.RATDNAC);
            cstmt.setDouble(13, filter.RATCEXT);
            cstmt.setDouble(14, filter.RATEIVA);
            cstmt.setString(15, filter.CLIENTE.trim());
            cstmt.setString(16, filter.NEW_COUNTRY.trim());
            cstmt.setString(17, filter.NEW_CURRENC.trim());
            cstmt.setString(18, filter.NEW_CODEBANK.trim());
            cstmt.setString(19, filter.NEW_FNOBANK.trim());
            cstmt.setString(20, filter.CODEQUIV.trim());
            cstmt.setString(21, session.getUserView().getUserInfo().USR);
            cstmt.setString(22, Functions.getFechaActual());
            cstmt.setString(23, Functions.getHoraActual());
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

    public A2280Filter loadPX265SQP00662(A2280Filter filter) throws SQLException, Exception {

        A2280Filter objRtn = new A2280Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00662(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CODE.trim());
            cstmt01.setString(3, filter.CODEBANK.trim());
            cstmt01.setString(4, filter.COUNTRY.trim());
            cstmt01.setString(5, filter.CURRENC.trim());
            cstmt01.setString(6, filter.FNOBANK.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.CODE = rs01.getString("CODECAR").trim();
                objRtn.NAME = rs01.getString("NAMECAR").trim();
                objRtn.COUNTRY = rs01.getString("COUNTRY").trim();
                objRtn.CURRENC = rs01.getString("CURRENC").trim();
                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                objRtn.NAMEBANK = rs01.getString("NAMEBANK").trim();
                objRtn.FSTAT = rs01.getString("FSTAT").trim();
                objRtn.FNOBANK = rs01.getString("FNOBANK").trim();
                objRtn.CLIENTE = rs01.getString("CLIENTE").trim();
                objRtn.RATCNAC = rs01.getDouble("RATCNAC");
                objRtn.RATDNAC = rs01.getDouble("RATDNAC");
                objRtn.RATCEXT = rs01.getDouble("RATCEXT");
                objRtn.RATEIVA = rs01.getDouble("RATEIVA");
                objRtn.CODEQUIV = rs01.getString("CODEQUIV");
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

    public List<A2354Filter> loadPX305SQP00933(A2354Filter filter) throws SQLException, Exception {

        List<A2354Filter> lstData = new ArrayList<A2354Filter>(0);
        A2354Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00933(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_CMERCHAN.trim());
            cstmt.setString(3, filter.IN_BMERCHAN.trim());
            cstmt.setString(4, filter.IN_SCARCOD.trim());
            cstmt.setString(5, filter.IN_CTABANK.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_COREP.trim());
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
                bean = new A2354Filter();
                bean.RN = rst.getLong("RN");
                bean.CMERCHAN = rst.getString("CMERCHAN").trim();
                bean.SUCMERCH = rst.getString("SUCMERCH").trim();
                bean.CODE = rst.getString("CODE").trim();
                bean.CORE = rst.getString("CORE").trim();
                bean.DREPORT = rst.getString("DREPORT").trim();
                bean.FRANC1 = rst.getString("FRANC1").trim();
                bean.FRANC2 = rst.getString("FRANC2").trim();
                bean.FRANC3 = rst.getString("FRANC3").trim();
                bean.FRANC4 = rst.getString("FRANC4").trim();
                
                bean.EQUIVA1 = rst.getString("EQUIVA1").trim();
                bean.EQUIVA2 = rst.getString("EQUIVA2").trim();
                bean.EQUIVA3 = rst.getString("EQUIVA3").trim();
                bean.EQUIVA4 = rst.getString("EQUIVA4").trim();
                bean.EQUIVA5 = rst.getString("EQUIVA5").trim();
                bean.EQUIVA6 = rst.getString("EQUIVA6").trim();
                bean.EQUIVA7 = rst.getString("EQUIVA7").trim();
                bean.EQUIVA8 = rst.getString("EQUIVA8").trim();
                bean.EQUIVA9 = rst.getString("EQUIVA9").trim();
                bean.CODPRO = rst.getString("CODPRO").trim();
//                bean.CODEBANK  = rst.getString("CODEBANK").trim();
//                bean.BANKNAM   = rst.getString("BANKNAM").trim();
//                bean.BANKCM    = rst.getString("BANKCM").trim();
//                bean.BANKCUR   = rst.getString("BANKCUR").trim();
//                bean.ACCNUMB   = rst.getString("ACCNUMB").trim();
//                bean.ACCNUMA   = rst.getString("ACCNUMA").trim();
//                bean.BENCEN    = rst.getString("BENCEN").trim();
//                bean.DEUSAP    = rst.getString("DEUSAP").trim();
//                bean.SAGENT    = rst.getString("SAGENT").trim();
//                bean.CANAL     = rst.getString("CANAL").trim();
//                bean.PROCES    = rst.getString("PROCES").trim();
//                bean.SCOUNTRY  = rst.getString("SCOUNTRY").trim();
////                bean.NAME      = rst.getString("NAME").trim();
//                bean.SOCIETY   = rst.getString("SOCIETY").trim();
//                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
//                bean.SBENCEN   = rst.getString("SBENCEN").trim();

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

    public List<A2354Filter> loadPX305SQP04580(A2354Filter filter) throws SQLException, Exception {

        List<A2354Filter> lstTkts = new ArrayList<A2354Filter>(0);
        A2354Filter beanTkt;

        A2354Filter objRtn;
        objRtn = new A2354Filter();
        objRtn.CODE = "";
        objRtn.NAME = "All";
        lstTkts.add(objRtn);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04580(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2354Filter();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("NAME").trim();
                lstTkts.add(beanTkt);
                System.out.println(beanTkt.NAME);
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

    public List<A003> loadPX305SQP04435(String IATA) throws SQLException, Exception {

        List<A003> lstData = new ArrayList<A003>(0);
        A003 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04435(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, IATA.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A003();

                bean.A003KEY = rst.getString("A003KEY").trim();
                bean.A003KEY1 = rst.getString("A003KEY1").trim();
                bean.A003CANAL = rst.getString("A003CANAL").trim();
                bean.A003PAIS = rst.getString("A003PAIS").trim();

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

    public List<A4202> loadPX305SQP04415(String MERCHN) throws SQLException, Exception {

        List<A4202> lstData = new ArrayList<A4202>(0);
        A4202 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04415(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, MERCHN.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A4202();
                bean.CIATA = rst.getString("CIATA").trim();
                bean.strDESCRIP = rst.getString("strDESCRIP").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.CANAL = rst.getString("CANAL").trim();

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

    public String loadPX305SQP00934(A2354Filter filter, String option) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA MPF109.
        String strMsj = "Operation was successful.";

//        List<A2354Filter> lstBank = filter.lstBank;
//        List<A2354Filter> lstIata = filter.lstIata;
//        A2354Filter beanDet;
        CallableStatement cstmt = null;
        PreparedStatement pstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00934(?,?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
//            for (int i = 0; i < lstBank.size(); i++){

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.CMERCHAN.trim());
            cstmt.setString(4, filter.SUCMERCH.trim());
            cstmt.setString(5, filter.CODEBANK.trim());
            cstmt.setString(6, filter.ACCNUMB.trim());
            cstmt.setString(7, filter.SAGENT.trim());
            cstmt.setString(8, filter.IN_CMERCHAN.trim());
            cstmt.setString(9, filter.IN_SUCMERCH.trim());
            cstmt.setString(10, filter.IN_CODEBANK.trim());
            cstmt.setString(11, filter.IN_ACCNUMB.trim());
            cstmt.setString(12, filter.IN_SAGENT.trim());
            cstmt.setString(13, filter.IN_BANKNAM.trim());
            cstmt.setString(14, filter.IN_DREPORT.trim());
            cstmt.setString(15, filter.IN_CODE.trim());
            cstmt.setString(16, filter.IN_CORE.trim());
            cstmt.setString(17, filter.IN_FRANC1.trim());
            cstmt.setString(18, filter.IN_FRANC2.trim());
            cstmt.setString(19, filter.IN_FRANC3.trim());
            cstmt.setString(20, filter.IN_FRANC4.trim());
            cstmt.setString(21, filter.IN_BANKCM.trim());
            cstmt.setString(22, filter.IN_BANKCUR.trim());
            cstmt.setString(23, filter.IN_ACCNUMOLD.trim());
            cstmt.setString(24, filter.IN_DDISCON.trim());
            cstmt.setString(25, filter.IN_ACCNUMA.trim());
            cstmt.setString(26, filter.IN_IDFISCAL.trim());
            cstmt.setString(27, filter.IN_BENCEN.trim());
            cstmt.setString(28, filter.IN_DEUSAP.trim());
            cstmt.setString(29, filter.IN_CANAL.trim());
            cstmt.setString(30, filter.IN_PROCES.trim());
            cstmt.setString(31, filter.IN_SCOUNTRY.trim());
            cstmt.setString(32, filter.IN_SOCIETY.trim());
            cstmt.setString(33, filter.IN_SCURRENCY.trim());
            cstmt.setString(34, filter.IN_SBENCEN.trim());
            cstmt.setString(35, filter.IN_COSTCEN.trim());
            cstmt.setString(36, filter.IN_CODPRO.trim());
            
            cstmt.setString(37, filter.IN_IDFBENEF.trim());
            
            cstmt.setString(38, filter.IN_EQUIVA1.trim());
            cstmt.setString(39, filter.IN_EQUIVA2.trim());
            cstmt.setString(40, filter.IN_EQUIVA3.trim());
            cstmt.setString(41, filter.IN_EQUIVA4.trim());
            cstmt.setString(42, filter.IN_EQUIVA5.trim());
            cstmt.setString(43, filter.IN_EQUIVA6.trim());
            cstmt.setString(44, filter.IN_EQUIVA7.trim());
            cstmt.setString(45, filter.IN_EQUIVA8.trim());
            cstmt.setString(46, filter.IN_EQUIVA9.trim());
            
            
            
            cstmt.setString(47, session.getUserView().getUserInfo().USR);
            cstmt.setString(48, Functions.getFechaActual());
            cstmt.setString(49, Functions.getHoraActual());
            cstmt.execute();
            cstmt.close();
//            }

//            if (lstBank != null && lstBank.size() > 0 && !option.equals("D")) {
//                String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP04436(?,?,?,?,?,?,?,?)}";
//                cstmt = cnx.prepareCall(SQLCLL02);
//                for (int i = 0; i < lstDetalle.size(); i++) {
//                    beanDet = lstDetalle.get(i);
//                    
//                    cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
//                    cstmt.setString(2, filter.MERCHN.trim());
//                    cstmt.setString(3, beanDet.CIATA.trim());
//                    cstmt.setString(4, beanDet.SCOUNTRY.trim());
//                    cstmt.setString(5, beanDet.CANAL.trim());
//                    cstmt.setString(6, session.getUserView().getUserInfo().USR);
//                    cstmt.setString(7, Functions.getFechaActual());
//                    cstmt.setString(8, Functions.getHoraActual());
//
//                    cstmt.execute();
//                }
//            }
        } catch (Exception e) {
            // e.printStackTrace();
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
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;
    }

    public String loadPX305SQP00934_INSERT(A2354Filter filter, String option) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA MPF109.
        String strMsj = "Operation was successful.";

//        List<A2354Filter> lstBank = filter.lstBank;
//        List<A2354Filter> lstIata = filter.lstIata;
//        A2354Filter beanDet;
        CallableStatement cstmt = null;
        PreparedStatement pstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00934_INSERT(?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?,?,"
                + "?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.CMERCHAN.trim());
            cstmt.setString(4, filter.SUCMERCH.trim());
            cstmt.setString(5, filter.CODE.trim());
            cstmt.setString(6, filter.CORE.trim());
            cstmt.setString(7, filter.DREPORT.trim());
            cstmt.setString(8, filter.FRANC1.trim());
            cstmt.setString(9, filter.FRANC2.trim());
            cstmt.setString(10, filter.FRANC3.trim());
            cstmt.setString(11, filter.FRANC4.trim());
            cstmt.setString(12, filter.CODEBANK.trim());
            cstmt.setString(13, filter.BANKNAM.trim());
            cstmt.setString(14, filter.BANKCM.trim());
            cstmt.setString(15, filter.BANKCUR.trim());
            cstmt.setString(16, filter.ACCNUMB.trim());
            cstmt.setString(17, filter.ACCNUMOLD.trim());
            cstmt.setString(18, filter.DDISCON.trim());
            cstmt.setString(19, filter.ACCNUMA.trim());
            cstmt.setString(20, filter.IDFISCAL.trim());
            cstmt.setString(21, filter.BENCEN.trim());
            cstmt.setString(22, filter.DEUSAP.trim());
            cstmt.setString(23, filter.SAGENT.trim());
            cstmt.setString(24, filter.CANAL.trim());
            cstmt.setString(25, filter.PROCES.trim());
            cstmt.setString(26, filter.SCOUNTRY.trim());
            cstmt.setString(27, filter.SOCIETY.trim());
            cstmt.setString(28, filter.SCURRENCY.trim());
            cstmt.setString(29, filter.SBENCEN.trim());
            cstmt.setString(30, filter.COSTCEN.trim());
            cstmt.setString(31, filter.IDFBENEF.trim());
            cstmt.setString(32, filter.CODPRO.trim());
            
            cstmt.setString(33, filter.IN_EQUIVA1.trim());
            cstmt.setString(34, filter.IN_EQUIVA2.trim());
            cstmt.setString(35, filter.IN_EQUIVA3.trim());
            cstmt.setString(36, filter.IN_EQUIVA4.trim());
            cstmt.setString(37, filter.IN_EQUIVA5.trim());
            cstmt.setString(38, filter.IN_EQUIVA6.trim());
            cstmt.setString(39, filter.IN_EQUIVA7.trim());
            cstmt.setString(40, filter.IN_EQUIVA8.trim());
            cstmt.setString(41, filter.IN_EQUIVA9.trim());
            
            cstmt.setString(42, session.getUserView().getUserInfo().USR);
            cstmt.setString(43, Functions.getFechaActual());
            cstmt.setString(44, Functions.getHoraActual());
            cstmt.execute();
            cstmt.close();

        } catch (Exception e) {
            // e.printStackTrace();
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
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;
    }

    public A2354Filter loadPX305SQP00935(A2354Filter filter) throws SQLException, Exception {

        A2354Filter objRtn = new A2354Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00935(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CMERCHAN.trim());
            cstmt01.setString(3, filter.SUCMERCH.trim());
            cstmt01.setString(4, filter.CODE.trim());
            cstmt01.setString(5, filter.CORE.trim());
            cstmt01.setString(6, filter.DREPORT.trim());
            cstmt01.setString(7, filter.FRANC1.trim());
            cstmt01.setString(8, filter.FRANC2.trim());
            cstmt01.setString(9, filter.FRANC3.trim());
            cstmt01.setString(10, filter.FRANC4.trim());
            cstmt01.setString(11, filter.CODEBANK.trim());
            cstmt01.setString(12, filter.BANKNAM.trim());
            cstmt01.setString(13, filter.BANKCM.trim());
            cstmt01.setString(14, filter.BANKCUR.trim());
            cstmt01.setString(15, filter.ACCNUMB.trim());
            cstmt01.setString(16, filter.ACCNUMA.trim());
            cstmt01.setString(17, filter.BENCEN.trim());
            cstmt01.setString(18, filter.DEUSAP.trim());
            cstmt01.setString(19, filter.SAGENT.trim());
            cstmt01.setString(20, filter.CANAL.trim());
            cstmt01.setString(21, filter.PROCES.trim());
            cstmt01.setString(22, filter.SCOUNTRY.trim());
            cstmt01.setString(23, filter.NAME.trim());
            cstmt01.setString(24, filter.SOCIETY.trim());
            cstmt01.setString(25, filter.SCURRENCY.trim());
            cstmt01.setString(26, filter.SBENCEN.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.CMERCHAN = rs01.getString("CMERCHAN").trim();
                objRtn.SUCMERCH = rs01.getString("SUCMERCH").trim();
                objRtn.CODE = rs01.getString("CODE").trim();
                objRtn.CORE = rs01.getString("CORE").trim();
                objRtn.DREPORT = rs01.getString("DREPORT").trim();
                objRtn.FRANC1 = rs01.getString("FRANC1").trim();
                objRtn.FRANC2 = rs01.getString("FRANC2").trim();
                objRtn.FRANC3 = rs01.getString("FRANC3").trim();
                objRtn.FRANC4 = rs01.getString("FRANC4").trim();
                
                objRtn.EQUIVA1 = rs01.getString("EQUIVA1").trim();
                objRtn.EQUIVA2 = rs01.getString("EQUIVA2").trim();
                objRtn.EQUIVA3 = rs01.getString("EQUIVA3").trim();
                objRtn.EQUIVA4 = rs01.getString("EQUIVA4").trim();
                objRtn.EQUIVA5 = rs01.getString("EQUIVA5").trim();
                objRtn.EQUIVA6 = rs01.getString("EQUIVA6").trim();
                objRtn.EQUIVA7 = rs01.getString("EQUIVA7").trim();
                objRtn.EQUIVA8 = rs01.getString("EQUIVA8").trim();
                objRtn.EQUIVA9 = rs01.getString("EQUIVA9").trim();
                
                
                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                objRtn.BANKNAM = rs01.getString("BANKNAM").trim();
                objRtn.BANKCM = rs01.getString("BANKCM").trim();
                objRtn.BANKCUR = rs01.getString("BANKCUR").trim();
                objRtn.ACCNUMB = rs01.getString("ACCNUMB").trim();
                objRtn.ACCNUMA = rs01.getString("ACCNUMA").trim();
                objRtn.BENCEN = rs01.getString("BENCEN").trim();
                objRtn.DEUSAP = rs01.getString("DEUSAP").trim();
                objRtn.SAGENT = rs01.getString("SAGENT").trim();
                objRtn.CANAL = rs01.getString("CANAL").trim();
                objRtn.PROCES = rs01.getString("PROCES").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.NAME = rs01.getString("NAME").trim();
                objRtn.SOCIETY = rs01.getString("SOCIETY").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.SBENCEN = rs01.getString("SBENCEN").trim();
                objRtn.COSTCEN = rs01.getString("COSTCEN").trim();
                objRtn.IDFBENEF = rs01.getString("IDFBENEF").trim();

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

    public List<A2354Filter> loadPX305SQP00938(A2354Filter filter) throws SQLException, Exception {

        A2354Filter objRtn = new A2354Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<A2354Filter> lstRtn = new ArrayList<A2354Filter>(0);
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00938_MERCH(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CMERCHAN.trim());
            cstmt01.setString(3, filter.SUCMERCH.trim());
            cstmt01.setString(4, filter.CODE.trim());
            cstmt01.setString(5, filter.CORE.trim());
            cstmt01.setString(6, filter.DREPORT.trim());
            cstmt01.setString(7, filter.FRANC1.trim());
            cstmt01.setString(8, filter.FRANC2.trim());
            cstmt01.setString(9, filter.FRANC3.trim());
            cstmt01.setString(10, filter.FRANC4.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2354Filter();
                objRtn.CMERCHAN = rs01.getString("CMERCHAN").trim();
                objRtn.SUCMERCH = rs01.getString("SUCMERCH").trim();
                objRtn.DREPORT = rs01.getString("DREPORT").trim();
                objRtn.CODE = rs01.getString("CODE").trim();
                objRtn.CORE = rs01.getString("CORE").trim();
                objRtn.FRANC1 = rs01.getString("FRANC1").trim();
                objRtn.FRANC2 = rs01.getString("FRANC2").trim();
                objRtn.FRANC3 = rs01.getString("FRANC3").trim();
                objRtn.FRANC4 = rs01.getString("FRANC4").trim();
                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                objRtn.BANKNAM = rs01.getString("BANKNAM").trim();
                objRtn.BANKCM = rs01.getString("BANKCM").trim();
                objRtn.BANKCUR = rs01.getString("BANKCUR").trim();
                objRtn.ACCNUMB = rs01.getString("ACCNUMB").trim();
                objRtn.ACCNUMOLD = rs01.getString("ACCNUMOLD").trim();
                objRtn.DDISCON = rs01.getString("DDISCON").trim();
                objRtn.ACCNUMA = rs01.getString("ACCNUMA").trim();
                objRtn.IDFISCAL = rs01.getString("IDFISCAL").trim();
                objRtn.BENCEN = rs01.getString("BENCEN").trim();
                objRtn.DEUSAP = rs01.getString("DEUSAP").trim();
                objRtn.SAGENT = rs01.getString("SAGENT").trim();
                objRtn.CANAL = rs01.getString("CANAL").trim();
                objRtn.PROCES = rs01.getString("PROCES").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.SOCIETY = rs01.getString("SOCIETY").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.SBENCEN = rs01.getString("SBENCEN").trim();
                objRtn.COSTCEN = rs01.getString("COSTCEN").trim();
                objRtn.IDFBENEF = rs01.getString("IDFBENEF").trim();
                objRtn.CODPRO = rs01.getString("CODPRO").trim();
                
                objRtn.EQUIVA1 = rs01.getString("EQUIVA1").trim();
                objRtn.EQUIVA2 = rs01.getString("EQUIVA2").trim();
                objRtn.EQUIVA3 = rs01.getString("EQUIVA3").trim();
                objRtn.EQUIVA4 = rs01.getString("EQUIVA4").trim();
                objRtn.EQUIVA5 = rs01.getString("EQUIVA5").trim();
                objRtn.EQUIVA6 = rs01.getString("EQUIVA6").trim();
                objRtn.EQUIVA7 = rs01.getString("EQUIVA7").trim();
                objRtn.EQUIVA8 = rs01.getString("EQUIVA8").trim();
                objRtn.EQUIVA9 = rs01.getString("EQUIVA9").trim();
                
                objRtn.DEFFEC = rs01.getString("DEFFEC").trim();

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

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

    public List<A2354Filter> loadPX305SQP00939(A2354Filter filter) throws SQLException, Exception {

        A2354Filter objRtn = new A2354Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<A2354Filter> lstRtn = new ArrayList<A2354Filter>(0);
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00939(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CMERCHAN.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2354Filter();
                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                objRtn.BANKNAM = rs01.getString("BANKNAM").trim();
                objRtn.BANKCM = rs01.getString("BANKCM").trim();
                objRtn.BANKCUR = rs01.getString("BANKCUR").trim();
                objRtn.ACCNUMB = rs01.getString("ACCNUMB").trim();
                objRtn.ACCNUMA = rs01.getString("ACCNUMA").trim();
                objRtn.BENCEN = rs01.getString("BENCEN").trim();

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

    public List<A2354Filter> loadPX305SQP00940(A2354Filter filter) throws SQLException, Exception {

        A2354Filter objRtn = new A2354Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<A2354Filter> lstRtn = new ArrayList<A2354Filter>(0);
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00939_IAT(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.SUCMERCH.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2354Filter();
                objRtn.SAGENT = rs01.getString("SAGENT").trim();
                objRtn.DEUSAP = rs01.getString("DEUSAP").trim();
                objRtn.CANAL = rs01.getString("CANAL").trim();
                objRtn.PROCES = rs01.getString("PROCES").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.NAME = rs01.getString("NAME").trim();
                objRtn.SOCIETY = rs01.getString("SOCIETY").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.SBENCEN = rs01.getString("SBENCEN").trim();
                objRtn.COSTCEN = rs01.getString("COSTCEN").trim();
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

    public Map<String, Integer> loadMPS351(List<A2354Filter> filter, int contador, String option) throws Exception {

        Map<String, Integer> result = new HashMap<>();
        int leidos = 0;
        int escritos = 0;
        int duplicados = 0;
        int errores = 0;

        Connection cnx = null;
        CallableStatement cs = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS351(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();

        try {
            cs = cnx.prepareCall(SQLCLL01);

            for (A2354Filter f : filter) {
                leidos++;
                try {
                    cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    cs.setString(2, f.SOCIETY.trim());
                    cs.setString(3, f.PAIS.trim());
                    cs.setString(4, f.IATA.trim());
                    cs.setString(5, f.IATANAME.trim());
                    cs.setString(6, f.INVOICE.trim());
                    cs.setString(7, f.CLASEDOC.trim());
                    cs.setString(8, f.SDATE.trim());
                    cs.setString(9, f.SCURRENCYL.trim());
                    cs.setDouble(10, f.SVFOPL);
                    cs.setString(11, f.CURUSD.trim());
                    cs.setDouble(12, f.SVFOPUSD);
                    cs.registerOutParameter(13, Types.INTEGER);

                    cs.execute();

                    int qty = cs.getInt(13);
                    if (qty > 0) {
                        escritos++; 
                    } else {
                        duplicados++;
                    }

                } catch (Exception e) {
                    errores++;
                    System.err.println("Error procesando registro: " + e.getMessage());
                }
            }

        } catch (Exception e) {
            errores++;
            e.printStackTrace();
        } finally {
            if (cs != null) cs.close();
            if (cnx != null) cnx.close();
        }

        result.put("leidos", leidos);
        result.put("escritos", escritos);
        result.put("duplicados", duplicados);
        result.put("errores", errores);

        return result;
    }

     public String loadMPS352(int totalLeidos, int totalEscritos, int totalErrores, int totalDuplicados, String horaInicio) throws Exception {

            String message = "";
            String messageLoad = "";

            if (totalErrores > 0) {
                messageLoad = "Cargado con Errores";
            } else if (totalDuplicados > 0) {
                messageLoad = "Cargado Correctamente";
            } else {
                messageLoad = "Cargado Correctamente";
            }

            Connection cnx = null;
            CallableStatement cs = null;
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS352(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            try {
                cs = cnx.prepareCall(SQLCLL01);

                cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cs.setString(2, "");
                cs.setString(3, "INVOICE");
                cs.setString(4, "");
                cs.setString(5, "INVOICE");
                cs.setString(6, messageLoad);
                cs.setInt(7, totalLeidos);
                cs.setInt(8, totalEscritos);
                cs.setInt(9, totalDuplicados);
                cs.setInt(10, totalErrores);
                cs.setInt(11, totalLeidos);
                cs.setString(12, horaInicio);
                cs.registerOutParameter(13, Types.INTEGER);

                cs.execute();

                int qty = cs.getInt(13);
                message = "Proceso culminado: " + messageLoad;

            } catch (Exception e) {
                message = "Error al ejecutar MPS352: " + e.getMessage();
                e.printStackTrace();
            } finally {
                if (cs != null) cs.close();
                if (cnx != null) cnx.close();
            }

            return message;
        }

    
    public String load_MPS114(A2354Filter filterNew, A2354Filter filterOld, String option) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA MPF109.
        String strMsj = "Operation was successful.";
        CallableStatement cstmt = null;
        PreparedStatement pstmt = null;
        String responseMPS = "";

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS114("
        + "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; // 45 signos de pregunta

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            
            cstmt.registerOutParameter(45, Types.VARCHAR);
            
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(2, filterOld.CMERCHAN);
            cstmt.setString(3, filterOld.SUCMERCH.trim());
            cstmt.setString(4, filterOld.CODEBANK.trim());
            cstmt.setString(5, filterOld.ACCNUMB.trim());
            cstmt.setString(6, filterOld.SAGENT.trim());
            cstmt.setString(7, filterNew.IN_CMERCHAN.trim());
            cstmt.setString(8, filterNew.IN_SUCMERCH.trim());
            cstmt.setString(9, filterNew.IN_CODEBANK.trim());
            cstmt.setString(10, filterNew.IN_ACCNUMB.trim());
            cstmt.setString(11, filterNew.IN_SAGENT.trim());
            cstmt.setString(12, filterNew.IN_CODE.trim());
            cstmt.setString(13, filterNew.IN_CORE.trim());
            cstmt.setString(14, filterNew.IN_DREPORT.trim());
            cstmt.setString(15, filterNew.IN_FRANC1.trim());
            cstmt.setString(16, filterNew.IN_FRANC2.trim());
            cstmt.setString(17, filterNew.IN_FRANC3.trim());
            cstmt.setString(18, filterNew.IN_FRANC4.trim());
            cstmt.setString(19, filterNew.IN_EQUIVA1.trim());
            cstmt.setString(20, filterNew.IN_EQUIVA2.trim());
            cstmt.setString(21, filterNew.IN_EQUIVA3.trim());
            cstmt.setString(22, filterNew.IN_EQUIVA4.trim());
            cstmt.setString(23, filterNew.IN_EQUIVA5.trim());
            cstmt.setString(24, filterNew.IN_EQUIVA6.trim());
            cstmt.setString(25, filterNew.IN_EQUIVA7.trim());
            cstmt.setString(26, filterNew.IN_EQUIVA8.trim());
            cstmt.setString(27, filterNew.IN_EQUIVA9.trim());
            cstmt.setString(28, filterNew.IN_BANKNAM.trim());
            cstmt.setString(29, filterNew.IN_BANKCM.trim());
            cstmt.setString(30, filterNew.IN_BANKCUR.trim());
            cstmt.setString(31, filterNew.IN_ACCNUMOLD.trim());
            cstmt.setString(32, filterNew.IN_DDISCON.trim());
            cstmt.setString(33, filterNew.IN_ACCNUMA.trim());
            cstmt.setString(34, filterNew.IN_IDFISCAL.trim());
            cstmt.setString(35, filterNew.IN_IDFBENEF.trim());
            cstmt.setString(36, filterNew.IN_BENCEN.trim());
            cstmt.setString(37, filterNew.IN_DEUSAP.trim());
            cstmt.setString(38, filterNew.IN_CANAL.trim());
            cstmt.setString(39, filterNew.IN_PROCES.trim());
            cstmt.setString(40, filterNew.IN_SCOUNTRY.trim());
            cstmt.setString(41, filterNew.IN_SOCIETY.trim());
            cstmt.setString(42, filterNew.IN_SCURRENCY.trim());
            cstmt.setString(43, filterNew.IN_SBENCEN.trim());
            cstmt.setString(44, filterNew.IN_COSTCEN.trim());
            
            cstmt.execute();
            
            responseMPS = cstmt.getString(45);
            
            cstmt.close();
            
        } catch (Exception e) {
            // e.printStackTrace();
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
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;
    }
    
    public List<A2354Filter> load_MPS115(A2354Filter filter) throws SQLException, Exception {

        List<A2354Filter> lstData = new ArrayList<A2354Filter>(0);
        A2354Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS115(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_CMERCHAN.trim());
            cstmt.setString(3, filter.IN_BMERCHAN.trim());
            cstmt.setString(4, filter.IN_SCARCOD.trim());
            cstmt.setString(5, filter.IN_CTABANK.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_COREP.trim());
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
                bean = new A2354Filter();
                bean.RN = rst.getLong("RN");
                bean.CMERCHAN = rst.getString("CMERCHAN").trim();
                bean.SUCMERCH = rst.getString("SUCMERCH").trim();
                bean.CODE = rst.getString("CODE").trim();
                bean.CORE = rst.getString("CORE").trim();
                bean.DREPORT = rst.getString("DREPORT").trim();
                bean.FRANC1 = rst.getString("FRANC1").trim();
                bean.FRANC2 = rst.getString("FRANC2").trim();
                bean.FRANC3 = rst.getString("FRANC3").trim();
                bean.FRANC4 = rst.getString("FRANC4").trim();
                
                bean.EQUIVA1 = rst.getString("EQUIVA1").trim();
                bean.EQUIVA2 = rst.getString("EQUIVA2").trim();
                bean.EQUIVA3 = rst.getString("EQUIVA3").trim();
                bean.EQUIVA4 = rst.getString("EQUIVA4").trim();
                bean.EQUIVA5 = rst.getString("EQUIVA5").trim();
                bean.EQUIVA6 = rst.getString("EQUIVA6").trim();
                bean.EQUIVA7 = rst.getString("EQUIVA7").trim();
                bean.EQUIVA8 = rst.getString("EQUIVA8").trim();
                bean.EQUIVA9 = rst.getString("EQUIVA9").trim();
                bean.CODEBANK  = rst.getString("CODEBANK").trim();
                bean.BANKNAM   = rst.getString("BANKNAM").trim();
                bean.BANKCM    = rst.getString("BANKCM").trim();
                bean.BANKCUR   = rst.getString("BANKCUR").trim();
                bean.ACCNUMB   = rst.getString("ACCNUMB").trim();
                bean.ACCNUMA   = rst.getString("ACCNUMA").trim();
                bean.BENCEN    = rst.getString("BENCEN").trim();
                bean.DEUSAP    = rst.getString("DEUSAP").trim();
                bean.SAGENT    = rst.getString("SAGENT").trim();
                bean.CANAL     = rst.getString("CANAL").trim();
                bean.PROCES    = rst.getString("PROCES").trim();
                bean.SCOUNTRY  = rst.getString("SCOUNTRY").trim();
                bean.SOCIETY   = rst.getString("SOCIETY").trim();
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.SBENCEN   = rst.getString("SBENCEN").trim();
                bean.COSTCEN   = rst.getString("COSTCEN").trim();
                bean.ACCNUMOLD   = rst.getString("ACCNUMOLD").trim();
                bean.DDISCON   = rst.getString("DDISCON").trim();
                bean.IDFISCAL   = rst.getString("IDFISCAL").trim();
                bean.IDFBENEF   = rst.getString("IDFBENEF").trim();
                bean.COSTCEN   = rst.getString("COSTCEN").trim();
                bean.DEFFEC   = rst.getString("DEFFEC").trim();
                bean.DFINAL   = rst.getString("DFINAL").trim();
                bean.SEQ   = rst.getString("SEQ").trim();
                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = rst.getString("HOCR");
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = rst.getString("HOUP");

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
    
    public String load_MPS116(A2354Filter filterNew, String merchant, String option) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA MPF109.
        String strMsj = "Operation was successful.";
        CallableStatement cstmt = null;
        PreparedStatement pstmt = null;
        String responseMPS = "";

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS116("
        + "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; // 45 signos de pregunta

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            
            cstmt.registerOutParameter(41, Types.VARCHAR);
            
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(2, merchant);
            cstmt.setString(3, filterNew.IN_CMERCHAN.trim());
            cstmt.setString(4, filterNew.IN_SUCMERCH.trim());
            cstmt.setString(5, filterNew.IN_CODEBANK.trim());
            cstmt.setString(6, filterNew.IN_ACCNUMB.trim());
            cstmt.setString(7, filterNew.IN_SAGENT.trim());
            cstmt.setString(8, filterNew.IN_CODE.trim());
            cstmt.setString(9, filterNew.IN_CORE.trim());
            cstmt.setString(10, filterNew.IN_DREPORT.trim());
            cstmt.setString(11, filterNew.IN_FRANC1.trim());
            cstmt.setString(12, filterNew.IN_FRANC2.trim());
            cstmt.setString(13, filterNew.IN_FRANC3.trim());
            cstmt.setString(14, filterNew.IN_FRANC4.trim());
            cstmt.setString(15, filterNew.IN_EQUIVA1.trim());
            cstmt.setString(16, filterNew.IN_EQUIVA2.trim());
            cstmt.setString(17, filterNew.IN_EQUIVA3.trim());
            cstmt.setString(18, filterNew.IN_EQUIVA4.trim());
            cstmt.setString(19, filterNew.IN_EQUIVA5.trim());
            cstmt.setString(20, filterNew.IN_EQUIVA6.trim());
            cstmt.setString(21, filterNew.IN_EQUIVA7.trim());
            cstmt.setString(22, filterNew.IN_EQUIVA8.trim());
            cstmt.setString(23, filterNew.IN_EQUIVA9.trim());
            cstmt.setString(24, filterNew.IN_BANKNAM.trim());
            cstmt.setString(25, filterNew.IN_BANKCM.trim());
            cstmt.setString(26, filterNew.IN_BANKCUR.trim());
            cstmt.setString(27, filterNew.IN_ACCNUMOLD.trim());
            cstmt.setString(28, filterNew.IN_DDISCON.trim());
            cstmt.setString(29, filterNew.IN_ACCNUMA.trim());
            cstmt.setString(30, filterNew.IN_IDFISCAL.trim());
            cstmt.setString(31, filterNew.IN_IDFBENEF.trim());
            cstmt.setString(32, filterNew.IN_BENCEN.trim());
            cstmt.setString(33, filterNew.IN_DEUSAP.trim());
            cstmt.setString(34, filterNew.IN_CANAL.trim());
            cstmt.setString(35, filterNew.IN_PROCES.trim());
            cstmt.setString(36, filterNew.IN_SCOUNTRY.trim());
            cstmt.setString(37, filterNew.IN_SOCIETY.trim());
            cstmt.setString(38, filterNew.IN_SCURRENCY.trim());
            cstmt.setString(39, filterNew.IN_SBENCEN.trim());
            cstmt.setString(40, filterNew.IN_COSTCEN.trim());
            
            cstmt.execute();
            
            responseMPS = cstmt.getString(41);
            
            cstmt.close();
            
        } catch (Exception e) {
            // e.printStackTrace();
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
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;
    }
    
    public String load_MPS265(A2354Filter filterNew) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA MPF109.
        String strMsj = "Operation was successful.";
        CallableStatement cstmt = null;
        PreparedStatement pstmt = null;
        String responseMPS = "";

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS265(?,?,?,?,?,?,?)}"; 

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            
            cstmt.registerOutParameter(7, Types.VARCHAR);
            
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(2, filterNew.CMERCHAN.trim());
            cstmt.setString(3, filterNew.SUCMERCH.trim());
            cstmt.setString(4, filterNew.CODEBANK.trim());
            cstmt.setString(5, filterNew.ACCNUMB.trim());
            cstmt.setString(6, filterNew.SAGENT.trim());
            
            cstmt.execute();
            
            responseMPS = cstmt.getString(7);
            
            cstmt.close();
            
        } catch (Exception e) {
            // e.printStackTrace();
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
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;
    }
    
    public List<A2354Filter> load_MPS354(A2354Filter filter) throws SQLException, Exception {

        List<A2354Filter> lstData = new ArrayList<A2354Filter>(0);
        A2354Filter bean;
        int QTY_TOTAL = 0; double AMOUNT_TOTAL_USD = 0, AMOUNT_TOTAL_ACTIVE = 0, AMOUNT_TOTAL_DIFFERENCE = 0;
        double AMOUNT_TOTAL_MPF100 = 0, AMOUNT_TOTAL_DIFFERENCE_100 = 0, AMOUNT_TOTAL_PENDING_MPF100 = 0;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS354(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_COUNTRY);

            cstmt.execute();
            rst = cstmt.getResultSet();

            if (rst != null) {
                while (rst.next()) {

                    bean = new A2354Filter();
                    bean.RN = rst.getInt("RN");
                    bean.SOCIETY = rst.getString("SOCIETY").trim();
                    bean.strFormatDate = Functions.getMonthConvert(rst.getString("STRFORMATDATE").trim());
                    bean.CURRENCY = rst.getString("CURRENCY").trim();

                    bean.QTY_INVOICES = rst.getInt("QTY_INVOICES");
                    bean.SVFOPL = rst.getDouble("SVFOPL");
                    
                    bean.QTY_100_ALL = rst.getInt("QTY_100_ALL");
                    bean.QTY_100_PENDING = rst.getInt("QTY_100_PENDING");
                    bean.QTY_NOT_FOUND = rst.getInt("QTY_NOT_FOUND");

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lstData.add(bean);
                }
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

        return lstData;
    }

    public List<A2354Filter> load_MPS355(A2354Filter filter) throws SQLException, Exception {

        List<A2354Filter> lstData = new ArrayList<A2354Filter>(0);
        A2354Filter bean;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS355(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SOCIETY);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_INVOICE);
            cstmt.setString(5, filter.IN_COUNTRY);
            cstmt.setString(6, filter.IN_NOTFOUND);
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A2354Filter();
                bean.RN = rst.getInt("RN");

                bean.INVOICE = rst.getString("INVOICE").trim();
                bean.CURRENCY = rst.getString("CURRENCY").trim();
                bean.SDATE = rst.getString("STRFORMATDATE").trim();
                bean.SVFOPL = rst.getDouble("SVFOPL");
                bean.SUM_ACTIVE = rst.getDouble("SUM_ACTIVE");
                bean.SUM_MPF100 = rst.getDouble("SUM_MPF100");
                bean.DIFFERENCE = rst.getDouble("DIFFERENCE");
                bean.DIFFERENCE_100 = rst.getDouble("DIFFERENCE_100");
                bean.PENDING_MPF100 = rst.getDouble("PENDING_MPF100");
                bean.SUM_GENCON = rst.getDouble("SUM_GENCON");

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


}
