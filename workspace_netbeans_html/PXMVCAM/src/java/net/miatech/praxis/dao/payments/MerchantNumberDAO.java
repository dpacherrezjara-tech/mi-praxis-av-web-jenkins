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
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
public class MerchantNumberDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public MerchantNumberDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public MerchantNumberDAO(IServerSession ss) {
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

        HashMap<String, String> hmDescUNIOPE = new HashMap<String, String>();
        hmDescUNIOPE.put("1", "Aerovias MX");
        hmDescUNIOPE.put("2", "Aeromexico Cargo");
        hmDescUNIOPE.put("3", "PLM");

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
            cstmt.setString(2, filter.IN_MERCHN.trim());
            cstmt.setString(3, filter.IN_RSOCIAL.trim());
            cstmt.setString(4, filter.IN_UNIOPE.trim());
            cstmt.setString(5, filter.IN_CANAL.trim());
            cstmt.setString(6, filter.IN_STATUS.trim());
            cstmt.setString(7, filter.IN_COUNTRY.trim());
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
                bean.MERCHN = rst.getString("MERCHN").trim();
                bean.MERCHP = rst.getString("MERCHP").trim();
                bean.DESCR = rst.getString("DESCR").trim();
                bean.RSOCIAL = rst.getString("RSOCIAL").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.CANAL = rst.getString("CANAL").trim();
                bean.CIATA = rst.getString("CIATA").trim();
                bean.CODCLIT1 = rst.getString("CODCLIT1").trim();
                bean.DIRCLIT1 = rst.getString("DIRCLIT1").trim();
                bean.CODCLIT2 = rst.getString("CODCLIT2").trim();
                bean.DIRCLIT2 = rst.getString("DIRCLIT2").trim();
                bean.strDescrip = rst.getString("DES_IATA").trim();
                bean.STATUS = rst.getString("STATUS").trim();
                if(bean.STATUS.equals("1")){
                    bean.desSTATUS = "Enabled";
                }else if(bean.STATUS.equals("0")){
                    bean.desSTATUS = "Disabled";
                }
                bean.UNIOPE = rst.getString("UNIOPE").trim();
                if (hmDescUNIOPE.containsKey(rst.getString("UNIOPE").trim().toUpperCase())) {
                    bean.strDescripUNIOPE = hmDescUNIOPE.get(rst.getString("UNIOPE").trim()).toString();
                } else {
                    bean.strDescripUNIOPE = rst.getString("UNIOPE").trim();
                }

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

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2284.
        String strMsj = "Operation was successful.";
        List<A4202> lstDetalle = filter.lstDetalle;
        A4202 beanDet;

        CallableStatement cstmt = null;
        PreparedStatement pstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00934(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.MERCHN.trim());
            cstmt.setString(4, filter.DESCR.trim());
            cstmt.setString(5, filter.RSOCIAL.trim());
            cstmt.setString(6, filter.CIATA.trim());
            cstmt.setString(7, filter.CANAL.trim());
            cstmt.setString(8, filter.SCOUNTRY.trim());
            cstmt.setString(9, filter.UNIOPE.trim());

            cstmt.setString(10, filter.CODCLIT1.trim());
            cstmt.setString(11, filter.DIRCLIT1.trim());
            cstmt.setString(12, filter.CODCLIT2.trim());
            cstmt.setString(13, filter.DIRCLIT2.trim());
            cstmt.setString(14, filter.MERCHP.trim());
            cstmt.setString(15, filter.STATUS.trim());

            cstmt.setString(16, session.getUserView().getUserInfo().USR);
            cstmt.setString(17, Functions.getFechaActual());
            cstmt.setString(18, Functions.getHoraActual());
            cstmt.execute();
            
            String SQL_DELETE = "DELETE FROM LIBSAP12.A4202 WHERE MERCHN = ?";
            (pstmt = cnx.prepareStatement(SQL_DELETE)).setString(1, filter.MERCHN.trim());
            pstmt.execute();

            if (lstDetalle != null && lstDetalle.size() > 0 && !option.equals("D")) {
                String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP04436(?,?,?,?,?,?,?,?)}";
                cstmt = cnx.prepareCall(SQLCLL02);
                for (int i = 0; i < lstDetalle.size(); i++) {
                    beanDet = lstDetalle.get(i);
                    
                    cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
                    cstmt.setString(2, filter.MERCHN.trim());
                    cstmt.setString(3, beanDet.CIATA.trim());
                    cstmt.setString(4, beanDet.SCOUNTRY.trim());
                    cstmt.setString(5, beanDet.CANAL.trim());
                    cstmt.setString(6, session.getUserView().getUserInfo().USR);
                    cstmt.setString(7, Functions.getFechaActual());
                    cstmt.setString(8, Functions.getHoraActual());

                    cstmt.execute();
                }
            }

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00935(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.MERCHN.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.MERCHN = rs01.getString("MERCHN").trim();
                objRtn.MERCHP = rs01.getString("MERCHP").trim();
                objRtn.DESCR = rs01.getString("DESCR").trim();
                objRtn.RSOCIAL = rs01.getString("RSOCIAL").trim();
                objRtn.CIATA = rs01.getString("CIATA").trim();
                objRtn.CANAL = rs01.getString("CANAL").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.strCANAL = rs01.getString("DES_CANAL").trim();
                objRtn.strDescrip = rs01.getString("DES_IATA").trim();
                objRtn.strDescripCtry = rs01.getString("DES_COUNTRY").trim();
                objRtn.CODCLIT1 = rs01.getString("CODCLIT1").trim();
                objRtn.DIRCLIT1 = rs01.getString("DIRCLIT1").trim();
                objRtn.CODCLIT2 = rs01.getString("CODCLIT2").trim();
                objRtn.DIRCLIT2 = rs01.getString("DIRCLIT2").trim();
                objRtn.UNIOPE = rs01.getString("UNIOPE").trim();
                objRtn.STATUS = rs01.getString("STATUS").trim();

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

}
