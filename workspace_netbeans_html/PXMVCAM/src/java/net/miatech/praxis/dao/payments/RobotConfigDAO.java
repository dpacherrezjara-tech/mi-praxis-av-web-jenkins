/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A003;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.praxis.payment.filter.MPFRBTHFilter;
import net.miatech.praxis.payment.filter.MPFRBTDFilter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class RobotConfigDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public RobotConfigDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RobotConfigDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }


    public List<MPFRBTHFilter> loadPX622RBTAV_1(MPFRBTHFilter filter) throws SQLException, Exception {

        List<MPFRBTHFilter> lstData = new ArrayList<MPFRBTHFilter>(0);
        MPFRBTHFilter bean;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".RBTAV_1(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(2, Types.INTEGER);
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt.setInt(2, filter.page.PAGNUM);
            cstmt.setInt(3, filter.page.PAGROW);
            cstmt.setInt(4, filter.page.TOTPAG);
            cstmt.setInt(5, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(2);
            filter.page.PAGROW = cstmt.getInt(3);
            filter.page.TOTPAG = cstmt.getInt(4);
            filter.page.TOTROW = cstmt.getInt(5);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPFRBTHFilter();
                bean.RN = rst.getLong("RN");
                bean.CODES  = rst.getString("CODES").trim();
                bean.NAME  = rst.getString("NAME").trim();
                bean.DECRIPT      = rst.getString("DECRIPT").trim();
                bean.STVAL      = rst.getString("STVAL").trim();
                
                if (bean.STVAL.equals("1")){
                    bean.DESC_STVAL = "Enabled";
                } else {
                    bean.DESC_STVAL = "Disabled";
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
    
    public List<MPFRBTDFilter> loadPX622RBTAV_2(MPFRBTDFilter filter) throws SQLException, Exception {

        List<MPFRBTDFilter> lstData = new ArrayList<MPFRBTDFilter>(0);
        MPFRBTDFilter bean;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".RBTAV_2(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_CODES.trim());

            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPFRBTDFilter();
                bean.RN = rst.getLong("RN");
                bean.CODES    = rst.getString("CODES").trim();
                bean.ARCHIVO  = rst.getString("ARCHIVO").trim();
                bean.DEST     = rst.getString("DEST").trim();
                bean.STVAL    = rst.getString("STVAL").trim();
                
                if (bean.STVAL.equals("1")){
                    bean.DESC_STVAL = "Enabled";
                } else {
                    bean.DESC_STVAL = "Disabled";
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
    
    public MPFRBTHFilter loadPX622RBTAV_3(MPFRBTHFilter filter) throws SQLException, Exception {

        MPFRBTHFilter bean = new MPFRBTHFilter();;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".RBTAV_3(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CODES.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean.CODES    = rst.getString("CODES").trim();
                bean.NAME  = rst.getString("NAME").trim();
                bean.DECRIPT     = rst.getString("DECRIPT").trim();
                bean.STVAL    = rst.getString("STVAL").trim();
                
                if (bean.STVAL.equals("1")){
                    bean.DESC_STVAL = "Enabled";
                } else {
                    bean.DESC_STVAL = "Disabled";
                }
                
                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = rst.getString("HOCR");
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = rst.getString("HOUP");
                
                //lstData.add(bean);
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

        return bean;
    }
    
    public MPFRBTDFilter loadPX622RBTAV_4(MPFRBTDFilter filter) throws SQLException, Exception {

        MPFRBTDFilter bean = new MPFRBTDFilter();;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".RBTAV_4(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CODES.trim());
            cstmt.setString(3, filter.ARCHIVO.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean.CODES    = rst.getString("CODES").trim();
                bean.ARCHIVO  = rst.getString("ARCHIVO").trim();
                bean.DEST     = rst.getString("DEST").trim();
                bean.STVAL    = rst.getString("STVAL").trim();
                
                if (bean.STVAL.equals("1")){
                    bean.DESC_STVAL = "Enabled";
                } else {
                    bean.DESC_STVAL = "Disabled";
                }
                
                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = rst.getString("HOCR");
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = rst.getString("HOUP");
                
                //lstData.add(bean);
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

        return bean;
    }
    

    public String loadPX622RBTAV_5(MPFRBTHFilter filter, String option) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA MPF109.
        String strMsj = "Operation was successful.";
        
        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".RBTAV_5(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.CODES.trim());
            cstmt.setString(4, filter.NAME.trim());
            cstmt.setString(5, filter.DECRIPT.trim());
            cstmt.setString(6, filter.STVAL.trim());

            cstmt.setString(7, session.getUserView().getUserInfo().USR);
            cstmt.setString(8, Functions.getFechaActual());
            cstmt.setString(9, Functions.getHoraActual());
            cstmt.execute();            

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

    public String loadPX622RBTAV_6(MPFRBTDFilter filter, String option) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA MPF109.
        String strMsj = "Operation was successful.";
        
        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".RBTAV_6(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.CODES.trim());
            cstmt.setString(4, filter.ARCHIVO.trim());
            cstmt.setString(5, filter.DEST.trim());
            cstmt.setString(6, filter.STVAL.trim());
            cstmt.setString(7, filter.NEW_ARCHIVO.trim());

            cstmt.setString(8, session.getUserView().getUserInfo().USR);
            cstmt.setString(9, Functions.getFechaActual());
            cstmt.setString(10, Functions.getHoraActual());
            cstmt.execute();            

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


}
