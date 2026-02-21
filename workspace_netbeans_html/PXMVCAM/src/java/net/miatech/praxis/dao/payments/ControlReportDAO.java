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
import net.miatech.praxis.payment.A4169;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF102;
import net.miatech.praxis.payment.MPF102Filter;
import net.miatech.praxis.payment.MPF102RP;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ControlReportDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ControlReportDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ControlReportDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A4169> loadMPS449(MPF102Filter filter) throws SQLException, Exception {

        List<A4169> lstData = new ArrayList<A4169>(0);
        A4169 beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS449(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt.execute();

            rst = cstmt.getResultSet();

            // ---------------- OBJETOS EN DURO ----------------
            beanTkt = new A4169();
            beanTkt.CODE = "A";
            beanTkt.NAME = "ALL CODES";
            lstData.add(beanTkt);
            
            beanTkt = new A4169();
            beanTkt.CODE = "";
            beanTkt.NAME = "ALL";
            lstData.add(beanTkt);
            // -------------------------------------------------

            while (rst.next()) {

                beanTkt = new A4169();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("CODE").trim() + " - " + rst.getString("NAME").trim();

                lstData.add(beanTkt);
            }

            rst.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error(
                            "SQLException -> User:" + session.getUserView().getUserInfo().USR
                            + " Message: " + e.getMessage(), e
                    );
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error(
                            "SQLException -> User:" + session.getUserView().getUserInfo().USR
                            + " Message: " + e.getMessage(), e
                    );
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public List<MPF102RP> loadMPS390(MPF102Filter filter) throws SQLException, Exception {

        List<MPF102RP> lstData = new ArrayList<MPF102RP>(0);
        MPF102RP bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS390(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_BANDOC);
            cstmt.setString(5, filter.IN_REFER);
            cstmt.setString(6, filter.IN_CODPRO);
            cstmt.setString(7, filter.IN_IDCONT);
            cstmt.setString(8, filter.IN_HEADER);
            cstmt.setString(9, filter.IN_PROVISION);
            cstmt.setString(10, filter.IN_CODEERROR);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                bean = new MPF102RP();
                bean.RN = rst.getInt("RN");

                bean.VALDATE = rst.getString("VALDATE").trim();
                bean.strFormatDate = Functions.getMonthConvert(rst.getString("VALDATE").trim());
                bean.CCUST = rst.getString("CCUST").trim();

                bean.F1_TOTAL = rst.getInt("F1_TOTAL");
                bean.F1_TOTAL_STVAL3 = rst.getInt("F1_TOTAL_STVAL3");
                bean.F1_TOTAL_STVAL1 = rst.getInt("F1_TOTAL_STVAL1");
                bean.F1_TOTAL_TAXES = rst.getInt("F1_TOTAL_TAXES");
                bean.F1_TOTAL_PENDING_TO_F2 = rst.getInt("F1_TOTAL_PENDING_TO_F2");
                bean.F1_TOTAL_ERROR = rst.getInt("F1_TOTAL_ERROR");

                bean.F2_F1_TOTAL_COMPLETED = rst.getInt("F2_F1_TOTAL_COMPLETED");
                bean.F2_TOTAL_PENDING_OVER50 = rst.getInt("F2_TOTAL_PENDING_OVER50");
                bean.F2_TOTAL_MATCH_OVER50 = rst.getInt("F2_TOTAL_MATCH_OVER50");

                bean.F3_F2_TOTAL_COMPLETED = rst.getInt("F3_F2_TOTAL_COMPLETED");
                bean.F3_TOTAL_WO_ACC = rst.getInt("F3_TOTAL_WO_ACC");
                bean.F3_TOTAL_COMPLETED = rst.getInt("F3_TOTAL_COMPLETED");
                bean.F3_TOTAL_PENDING_SENT = rst.getInt("F3_TOTAL_PENDING_SENT");
                bean.F3_TOTAL_COMPLETED_SAP = rst.getInt("F3_TOTAL_COMPLETED_SAP");
                bean.F3_TOTAL_ERROR = rst.getInt("F3_TOTAL_ERROR");

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
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    public List<MPF218> loadMPS415(MPF218Filter filter) throws SQLException, Exception {

        List<MPF218> lstData = new ArrayList<MPF218>(0);
        MPF218 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS415(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_OPTION.trim());
            cstmt.setString(5, filter.IN_SOCIETY.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_FILE_NAME.trim());
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
                bean = new MPF218();
                bean.RN = rst.getLong("RN");
                bean.CUSTOMER = rst.getString("CCUST").trim();
                String fileName = rst.getString("NAMEFILE").trim();
                bean.COUNTRY = rst.getString("COUNTRY").trim();

                bean.DATEPROC = rst.getString("DATEPROC").trim();
                bean.DATESETT = rst.getString("DATESETT").trim();
                bean.DATEUPLO = rst.getString("DATEUPLO").trim();
                bean.NAMEFILE = fileName;
                bean.TYPEFILE = rst.getString("TYPEFILE").trim();
                bean.SIZEFILE = rst.getString("SIZEFILE").trim();

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

    private String determineCountryFromFileName(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return ""; // Valor por defecto
        }

        String[] parts = fileName.split("_");
        if (parts.length > 0) {
            String clientCode = parts[0];

            switch (clientCode) {
                case "202":
                    return "SV";  // El Salvador
                case "134":
                    return "US";  // Estados Unidos
                default:
                    return "";
            }
        }

        return ""; // Si no se puede determinar
    }

    public List<MPF221> loadMPS446(MPF221Filter filter) throws SQLException, Exception {

        List<MPF221> lstData = new ArrayList<MPF221>(0);
        MPF221 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS446(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_OPTION.trim());
            cstmt.setString(5, filter.IN_SOCIETY.trim());
            cstmt.setString(6, filter.IN_COMAND.trim());
            cstmt.setString(7, filter.IN_FILE_NAME.trim());
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
                bean = new MPF221();
                bean.RN = rst.getLong("RN");
                bean.CUSTOMER = rst.getString("CCUST").trim();
                bean.REPORTID = rst.getString("REPORTID").trim();
                bean.USERID = rst.getString("USERID").trim();
                bean.REFNBR = rst.getString("REFNBR").trim();
                bean.PEDARC = rst.getString("PEDARC").trim();
                bean.DATEARC = rst.getString("DATEARC").trim();
                bean.TIMEARC = rst.getString("TIMEARC").trim();
                bean.DISTNAME = rst.getString("DISTNAME").trim();
                bean.GROUPID = rst.getString("GROUPID").trim();
                bean.LINESARC = rst.getString("LINESARC").trim();
                bean.PAGESARC = rst.getString("PAGESARC").trim();
                bean.OBSERVAC = rst.getString("OBSERVAC").trim();
                bean.NAMEFILE = rst.getString("NAMEFILE").trim();

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
