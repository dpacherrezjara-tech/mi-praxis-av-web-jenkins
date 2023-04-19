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
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2348;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class CreditCardDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CreditCardDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CreditCardDAO(IServerSession ss) {
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

                bean.CODBANKN = rst.getString("CODBANKN").trim();
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00672(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            //cstmt.setString(1, filter.option.trim());
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
            cstmt.setString(16, filter.FECFROM);
            cstmt.setString(17, filter.FECTO);
            
            cstmt.setString(18, session.getUserView().getUserInfo().USR);
            cstmt.setString(19, Functions.getFechaActual());
            cstmt.setString(20, Functions.getHoraActual());
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
                objRtn.CODBANKN = rs01.getString("CODBANKN").trim();
                objRtn.DOCNUM = rs01.getInt("DOCNUM");

                objRtn.USCR = rs01.getString("USCR").trim();
                objRtn.FECR = rs01.getString("FECR").trim();
                objRtn.HOCR = rs01.getString("HOCR").trim();
                objRtn.USUP = rs01.getString("USUP").trim();
                objRtn.FEUP = rs01.getString("FEUP").trim();
                objRtn.HOUP = rs01.getString("HOUP").trim();

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
                bean.FECFROM = rst.getString("FECFROM").trim();
                bean.FECTO = rst.getString("FECTO").trim();

                bean.RATCNAC = rst.getDouble("RATCNAC");
                bean.RATDNAC = rst.getDouble("RATDNAC");
                bean.RATCEXT = rst.getDouble("RATCEXT");
                bean.RATEIVA = rst.getDouble("RATEIVA");
                bean.CODEQUIV = rst.getString("CODEQUIV").trim();

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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00661_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(16, filter.FECFROM.trim());
            cstmt.setString(17, filter.FECTO.trim());
            cstmt.setString(18, filter.NEW_COUNTRY.trim());
            cstmt.setString(19, filter.NEW_CURRENC.trim());
            cstmt.setString(20, filter.NEW_CODEBANK.trim());
            cstmt.setString(21, filter.NEW_FNOBANK.trim());
            cstmt.setString(22, filter.NEW_CODECAR.trim());
            cstmt.setString(23, filter.NEW_FECFROM.trim());
            cstmt.setString(24, filter.NEW_FECTO.trim());
            cstmt.setString(25, filter.CODEQUIV.trim());
            cstmt.setString(26, filter.BSPBANK.trim());
            cstmt.setString(27, session.getUserView().getUserInfo().USR);
            cstmt.setString(28, Functions.getFechaActual());
            cstmt.setString(29, Functions.getHoraActual());
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00662(?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(7, filter.FECFROM.trim());
            cstmt01.setString(8, filter.FECTO.trim());

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
                objRtn.CODEQUIV = rs01.getString("CODEQUIV").trim();
                objRtn.BSPBANK = rs01.getString("BSPBANK").trim();
                objRtn.FECFROM = rs01.getString("FECFROM").trim();
                objRtn.FECTO = rs01.getString("FECTO").trim();
                objRtn.strBSPBANK = rs01.getString("strBSPBANK").trim();
                objRtn.USCR = rs01.getString("USCR").trim();
                objRtn.FECR = rs01.getString("FECR").trim();
                objRtn.HOCR = rs01.getString("HOCR").trim();
                objRtn.USUP = rs01.getString("USUP").trim();
                objRtn.FEUP = rs01.getString("FEUP").trim();
                objRtn.HOUP = rs01.getString("HOUP").trim();

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

    public List<A2280Filter> loadPX265SQP03398(A2280Filter filter) throws SQLException, Exception {

        List<A2280Filter> lstData = new ArrayList<A2280Filter>(0);
        A2280Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03398(?,?,?,?,?,?,?,?)}";

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
                bean.CCUST = rst.getString("CCUST").trim();
                bean.COUNTRY = rst.getString("COUNTRY").trim();
                bean.CODEBANK = rst.getString("CODEBANK").trim();
                bean.CURRENC = rst.getString("CURRENC").trim();
                bean.CODE = rst.getString("CODECAR").trim();
                bean.TCOMIS = rst.getString("TCOMIS").trim();
                bean.FECFROM = rst.getString("FECFROM").trim();
                bean.FECTO = rst.getString("FECTO").trim();
                bean.SEQ = rst.getString("SEQ").trim();
                bean.FSTAT = rst.getString("FSTAT").trim();
                bean.CODEQUIV = rst.getString("CODEQUIV");
                bean.NAMECAR = rst.getString("NAMECAR").trim();
                bean.FNOBANK = rst.getString("FNOBANK").trim();
                bean.DCOMIS = rst.getString("DCOMIS").trim();
                bean.BASEC = rst.getString("BASEC").trim();
                bean.MESES = rst.getString("MESES").trim();
                bean.MONTO = rst.getDouble("MONTO");
                bean.RATE = rst.getDouble("RATE");
                bean.RATEIVA = rst.getDouble("RATEIVA");
                bean.BSPBANK = rst.getString("BSPBANK").trim();
                bean.CLIENTE = rst.getString("CLIENTE").trim();
                bean.strAgrupacion = rst.getString("COUNTRY").trim() + " - " + rst.getString("CODEBANK").trim() + " - "
                        + rst.getString("CODECAR").trim() + " - " + rst.getString("CURRENC").trim() + " - " + rst.getString("FECFROM").trim() + " - " + rst.getString("FECTO").trim();
                bean.strDescPais = rst.getString("DESCPAIS").trim();
                bean.strDescBank = rst.getString("NAMEBANK").trim();

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
    
    //------------------------------------------------------------------------------------------------
    
    public List<A2280Filter> loadPX265SQP00663() throws SQLException, Exception {

        List<A2280Filter> lstRtn = new ArrayList<A2280Filter>(0);
        A2280Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00663()}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2280Filter();
                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                objRtn.BSPBANK = rs01.getString("BSPBANK").trim();
                objRtn.NAMEBANK = rs01.getString("NAMEBANK").trim();

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
    
    
    public List<A2280Filter> loadPX265SQP03423() throws SQLException, Exception, Exception {

        List<A2280Filter> lstRtn = new ArrayList<A2280Filter>(0);
        A2280Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03423()}";

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            
            while (rs01.next()) {
                objRtn = new A2280Filter();
                objRtn.TCOMIS = rs01.getString("TCOMIS").trim();
                objRtn.DCOMIS = rs01.getString("DCOMIS").trim();
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
    
    public A2280Filter loadPX265SQP03399(A2280Filter filter) throws SQLException, Exception {

        A2280Filter objRtn = new A2280Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        List<A2348> lstDetalle = new ArrayList<A2348>(0);
        A2348 beanDetalle = new A2348();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03399(?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CODE.trim());
            cstmt01.setString(3, filter.CODEBANK.trim());
            cstmt01.setString(4, filter.COUNTRY.trim());
            cstmt01.setString(5, filter.CURRENC.trim());
            cstmt01.setString(6, filter.FNOBANK.trim());
            cstmt01.setString(7, filter.FECFROM.trim());
            cstmt01.setString(8, filter.FECTO.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                beanDetalle = new A2348();
                beanDetalle.TCOMIS = rs01.getString("TCOMIS").trim();
                beanDetalle.FECFROM = rs01.getString("FECFROM").trim();
                beanDetalle.FECTO = rs01.getString("FECTO").trim();
                beanDetalle.SEQ = rs01.getString("SEQ").trim();
                beanDetalle.DCOMIS = rs01.getString("DCOMIS").trim();
                beanDetalle.BASEC = rs01.getString("BASEC").trim();
                beanDetalle.MONTO = rs01.getDouble("MONTO");
                beanDetalle.MESES = rs01.getInt("MESES");
                beanDetalle.RATE = rs01.getDouble("RATE");
                beanDetalle.RATEIVA = rs01.getDouble("RATEIVA");
                lstDetalle.add(beanDetalle);
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();

                if (rs01.next()) {

                    objRtn.CCUST = rs01.getString("CCUST");
                    objRtn.COUNTRY = rs01.getString("COUNTRY").trim();
                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.NAMEBANK = rs01.getString("NAMEBANK").trim();
                    objRtn.CURRENC = rs01.getString("CURRENC").trim();
                    objRtn.CODE = rs01.getString("CODECAR").trim();
                    objRtn.NAMECAR = rs01.getString("NAMECAR").trim();
                    objRtn.FSTAT = rs01.getString("FSTAT").trim();
                    objRtn.CODEQUIV = rs01.getString("CODEQUIV");
                    objRtn.FNOBANK = rs01.getString("FNOBANK").trim();
                    objRtn.BSPBANK = rs01.getString("BSPBANK").trim();
                    objRtn.CLIENTE = rs01.getString("CLIENTE").trim();
                    objRtn.strBSPBANK = rs01.getString("strBSPBANK").trim();
                    objRtn.USCR = rs01.getString("USCR");
                    objRtn.FECR = rs01.getString("FECR");
                    objRtn.HOCR = rs01.getString("HOCR");
                    objRtn.USUP = rs01.getString("USUP");
                    objRtn.FEUP = rs01.getString("FEUP");
                    objRtn.HOUP = rs01.getString("HOUP");
                    objRtn.lstDetalle = lstDetalle;

                }
                rs01.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            //e.getMessage();
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
    
    public String loadPX265SQP00941(A2280Filter filter) throws SQLException, Exception {

        CallableStatement cs = null;
        String strSQL;
        String msj = "";

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00941(?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(5, Types.VARCHAR);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.NEW_CODEBANK.trim());
            cs.setString(3, filter.NEW_COUNTRY.trim());
            cs.setString(4, filter.NEW_CURRENC.trim());
            cs.setString(5, "");//INOUT   IO_MSJ       VARCHAR(100), -- MENSAJE DE SALIDA
            cs.execute();

            //Obteniendo el mensaje de error ===================================    
            if (cs.getString(5) != null) {
                msj = cs.getString(5).trim();
            }

            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.getMessage();
        } finally {
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

        return msj;
    }

    public String loadPX265SQP03400(A2280Filter filter, String option) throws SQLException, Exception {
        
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";
        CallableStatement cstmt = null;
        Connection cnx = null;
        List<A2348> lstDetalle = filter.lstDetalle;
        A2348 beanDet = new A2348();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03400(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            if (lstDetalle != null && lstDetalle.size() > 0) {
                for (int i=0; i < lstDetalle.size(); i++) {
                    beanDet = lstDetalle.get(i);
                    
                    cstmt = cnx.prepareCall(SQLCLL01);
                    cstmt.setString(1, option);
                    cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
                    cstmt.setString(3, filter.COUNTRY.trim());
                    cstmt.setString(4, filter.CODEBANK.trim());
                    cstmt.setString(5, filter.CURRENC.trim());
                    cstmt.setString(6, filter.CODE.trim());
                    cstmt.setString(7, filter.NAME.trim());
                    cstmt.setString(8, beanDet.TCOMIS.trim());
                    cstmt.setString(9, beanDet.FECFROM.trim());
                    cstmt.setString(10, beanDet.FECTO.trim());
                    cstmt.setString(11, beanDet.SEQ.trim());
                    cstmt.setString(12, filter.FSTAT.trim());
                    cstmt.setString(13, filter.CODEQUIV.trim());
                    cstmt.setString(14, filter.FNOBANK.trim());
                    cstmt.setString(15, beanDet.DCOMIS.trim());
                    cstmt.setString(16, beanDet.BASEC.trim());
                    cstmt.setDouble(17, beanDet.MONTO);
                    cstmt.setInt(18, beanDet.MESES);
                    cstmt.setDouble(19, beanDet.RATE);
                    cstmt.setDouble(20, beanDet.RATEIVA);
                    cstmt.setString(21, filter.NEW_COUNTRY.trim());
                    cstmt.setString(22, filter.NEW_CURRENC.trim());
                    cstmt.setString(23, filter.NEW_CODEBANK.trim());
                    cstmt.setString(24, filter.NEW_FNOBANK.trim());
                    cstmt.setString(25, session.getUserView().getUserInfo().USR);
                    cstmt.setString(26, Functions.getFechaActual());
                    cstmt.setString(27, Functions.getHoraActual());
                    if(i==0){
                        cstmt.setString(28, "Y");
                    }else{
                        cstmt.setString(28, "0");
                    }
                    cstmt.execute();
                }
            }

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
