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
import net.miatech.praxis.payment.MPF060D;
import net.miatech.praxis.payment.MPF060DFilter;
import net.miatech.praxis.payment.MPF075;
import net.miatech.praxis.payment.MPF075Filter;
import net.miatech.praxis.payment.MPF076;
import net.miatech.praxis.payment.MPF076Filter;
import net.miatech.praxis.payment.MPF077;
import net.miatech.praxis.payment.MPF077Filter;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.praxis.payment.MPF303Filter;
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
public class DebitsReportDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public DebitsReportDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DebitsReportDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
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

    public List<MPF076> loadMPS640(MPF076Filter filter) throws SQLException, Exception {

        List<MPF076> lstData = new ArrayList<MPF076>(0);
        MPF076 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS640(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);

            cstmt.setString(1, filter.IN_OPTION.trim());
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_CCUST.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_STATUS.trim());
            cstmt.setString(7, filter.IN_SCOUNTRY.trim());
            cstmt.setString(8, filter.IN_SCURRENCY.trim());
            cstmt.setString(9, filter.IN_NETO.trim());
            cstmt.setString(10, filter.IN_SCARCOD.trim());
            cstmt.setString(11, filter.IN_SCARDN6.trim());
            cstmt.setString(12, filter.IN_SCARDN4.trim());
            cstmt.setString(13, filter.IN_ID.trim());
            cstmt.setString(14, filter.IN_IDDEBCONCEPT.trim());

            cstmt.setInt(15, filter.page.PAGNUM);
            cstmt.setInt(16, filter.page.PAGROW);
            cstmt.setInt(17, filter.page.TOTPAG);
            cstmt.setInt(18, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(15);
            filter.page.PAGROW = cstmt.getInt(16);
            filter.page.TOTPAG = cstmt.getInt(17);
            filter.page.TOTROW = cstmt.getInt(18);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF076();
                bean.RN = rst.getLong("RN");
                bean.CCUST = rst.getString("CCUST").trim();
                bean.CCIA = rst.getString("CCIA").trim();
                bean.STVAL = rst.getString("STVAL").trim();
                bean.SCONTROL = rst.getString("SCONTROL").trim();
                bean.DEBTYPE = rst.getString("DEBTYPE").trim();
                bean.IDDEB = rst.getString("IDDEB").trim();
                bean.IDCONCEP = rst.getString("IDCONCEP").trim();
                bean.FECR = rst.getString("FECR").trim();
                bean.DATEC = rst.getString("DATEC").trim();
                bean.SCARCOD = rst.getString("SCARCOD").trim();
                bean.SCARDN = rst.getString("SCARDN").trim();
                bean.CURRLOCAL = rst.getString("CURRLOCAL").trim();
                bean.VALLOCAL = rst.getString("VALLOCAL").trim();

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

    public List<MPF075> loadMPS641(MPF075Filter filter) throws SQLException, Exception {

        List<MPF075> lstData = new ArrayList<MPF075>(0);
        MPF075 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS641(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);

            cstmt.setString(1, filter.IN_OPTION.trim());
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_CCUST.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_STATUS.trim());
            cstmt.setString(7, filter.IN_SCOUNTRY.trim());
            cstmt.setString(8, filter.IN_SCURRENCY.trim());
            cstmt.setString(9, filter.IN_NETO.trim());
            cstmt.setString(10, filter.IN_SCARCOD.trim());
            cstmt.setString(11, filter.IN_SCARDN6.trim());
            cstmt.setString(12, filter.IN_SCARDN4.trim());
            cstmt.setString(13, filter.IN_SAUTHOC.trim());
            cstmt.setString(14, filter.IN_SAGENT.trim());
            cstmt.setString(15, filter.IN_TICKET.trim());
            cstmt.setString(16, filter.IN_PNR.trim());
            cstmt.setString(17, filter.IN_REFUNDVENTA.trim());

            cstmt.setInt(18, filter.page.PAGNUM);
            cstmt.setInt(19, filter.page.PAGROW);
            cstmt.setInt(20, filter.page.TOTPAG);
            cstmt.setInt(21, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(18);
            filter.page.PAGROW = cstmt.getInt(19);
            filter.page.TOTPAG = cstmt.getInt(20);
            filter.page.TOTROW = cstmt.getInt(21);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF075();
                bean.RN = rst.getLong("RN");
                bean.CCUST = rst.getString("CCUST").trim();
                bean.CCIA = rst.getString("CCIA").trim();
                bean.TKT = rst.getString("TKT").trim();
                bean.STVAL = rst.getString("STVAL").trim();
                bean.DEBTYPE = rst.getString("DEBTYPE").trim();
                bean.FECR = rst.getString("FECR").trim();
                bean.SDATE = rst.getString("SDATE").trim();
                bean.RFNDATE = rst.getString("RFNDATE").trim();
                bean.SCARCOD = rst.getString("SCARCOD").trim();
                bean.SCARDN = rst.getString("SCARDN").trim();
                bean.SAUTHOC = rst.getString("SAUTHOC").trim();
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.TOTAL = rst.getString("TOTAL").trim();
                bean.SAGENT = rst.getString("SAGENT").trim();
                bean.SPNR = rst.getString("SPNR").trim();
                bean.ORIGEN = rst.getString("ORIGEN").trim();

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

    public List<MPF077> loadMPS642(MPF077Filter filter) throws SQLException, Exception {

        List<MPF077> lstData = new ArrayList<MPF077>(0);
        MPF077 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS642(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

            cstmt.setString(1, filter.IN_OPTION.trim());
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_CCUST.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_STATUS.trim());
            cstmt.setString(7, filter.IN_SCOUNTRY.trim());
            cstmt.setString(8, filter.IN_SCURRENCY.trim());
            cstmt.setString(9, filter.IN_NETO.trim());
            cstmt.setString(10, filter.IN_SCARCOD.trim());
            cstmt.setString(11, filter.IN_SCARDN6.trim());
            cstmt.setString(12, filter.IN_SCARDN4.trim());
            cstmt.setString(13, filter.IN_SAUTHOC.trim());
            cstmt.setString(14, filter.IN_SAGENT.trim());
            cstmt.setString(15, filter.IN_PNR.trim());
            cstmt.setString(16, filter.IN_CVS.trim());

            cstmt.setInt(17, filter.page.PAGNUM);
            cstmt.setInt(18, filter.page.PAGROW);
            cstmt.setInt(19, filter.page.TOTPAG);
            cstmt.setInt(20, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(17);
            filter.page.PAGROW = cstmt.getInt(18);
            filter.page.TOTPAG = cstmt.getInt(19);
            filter.page.TOTROW = cstmt.getInt(20);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF077();
                bean.RN = rst.getLong("RN");
                bean.CCUST = rst.getString("CCUST").trim();
                bean.CCIA = rst.getString("CCIA").trim();
                bean.STVAL = rst.getString("STVAL").trim();
                bean.DEBTYPE = rst.getString("DEBTYPE").trim();
                bean.FECR = rst.getString("FECR").trim();
                bean.DTRAN = rst.getString("DTRAN").trim();
                bean.FPROC = rst.getString("FPROC").trim();
                bean.SCARCOD = rst.getString("SCARCOD").trim();
                bean.SCARDN = rst.getString("SCARDN").trim();
                bean.SAUTHOC = rst.getString("SAUTHOC").trim();
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.VALOR = rst.getString("VALOR").trim();
                bean.SPNR = rst.getString("SPNR").trim();
                bean.CASOCVS = rst.getString("CASOCVS").trim();
                bean.IATA = rst.getString("IATA").trim();

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

    public List<MPF060D> loadMPS644(MPF060DFilter filter) throws SQLException, Exception {

        List<MPF060D> lstData = new ArrayList<MPF060D>(0);
        MPF060D bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS644(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);

            cstmt.setString(1, filter.IN_OPTION.trim());
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_CCUST.trim());
            cstmt.setString(5, filter.IN_CODPRO.trim());
            cstmt.setString(6, filter.IN_DEBTYPE.trim());
            cstmt.setString(7, filter.IN_CODEBANK.trim());
            cstmt.setString(8, filter.IN_SCOUNTRY.trim());
            cstmt.setString(9, filter.IN_BANDOC.trim());
            cstmt.setString(10, filter.IN_REFERENCE.trim());
            cstmt.setString(11, filter.IN_SAGENT.trim());
            cstmt.setString(12, filter.IN_IDACCOUNTING.trim());
            cstmt.setString(13, filter.IN_SCARDN6.trim());
            cstmt.setString(14, filter.IN_SCARDN4.trim());
            cstmt.setString(15, filter.IN_SAUTHOC.trim());
            cstmt.setString(16, filter.IN_FASE1.trim());
            cstmt.setString(17, filter.IN_FASE2.trim());
            cstmt.setString(18, filter.IN_BPOC.trim());

            cstmt.setInt(19, filter.page.PAGNUM);
            cstmt.setInt(20, filter.page.PAGROW);
            cstmt.setInt(21, filter.page.TOTPAG);
            cstmt.setInt(22, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(19);
            filter.page.PAGROW = cstmt.getInt(20);
            filter.page.TOTPAG = cstmt.getInt(21);
            filter.page.TOTROW = cstmt.getInt(22);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF060D();
                bean.RN = rst.getLong("RN");
                bean.CCUST = rst.getString("CCUST").trim();
                bean.CODPRO = rst.getString("CODPRO").trim();
                bean.CODEBANK = rst.getString("CODEBANK").trim();
                bean.ADATE = rst.getString("ADATE").trim();
                bean.FECR = rst.getString("FECR").trim();
                bean.BANDOC = rst.getString("BANDOC").trim();
                bean.REFER = rst.getString("REFER").trim();
                bean.SAGENT = rst.getString("SAGENT").trim();
                bean.MERCHAND = rst.getString("MERCHAND").trim();
                bean.SCARDN = rst.getString("SCARDN").trim();
                bean.SCARCOD = rst.getString("SCARCOD").trim();
                bean.SAUTHOC = rst.getString("SAUTHOC").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.NETO = rst.getString("NETO").trim();
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.TOTAL = rst.getString("TOTAL").trim();
                bean.MONEDA_DOLARES = rst.getString("MONEDA_DOLARES").trim();
                bean.MONTO_DOLARES = rst.getString("MONTO_DOLARES").trim();
                bean.DEBTYPE = rst.getString("DEBTYPE").trim();
                bean.FASE1 = rst.getString("FASE1").trim();
                bean.FASE2 = rst.getString("FASE2").trim();
                bean.IDCDEB = rst.getString("IDCDEB").trim();
                bean.FCONT = rst.getString("FCONT").trim();
                bean.STATUS_SAP = rst.getString("STATUS_SAP").trim();
                bean.BPO_COMMENT_DESC = rst.getString("BPO_COMMENT_DESC").trim();

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
    
    public Map<String, String> manageComment(MPF303Filter filter) throws SQLException, Exception {
        
        Map<String, String> response = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS645(?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_ACTION != null ? filter.IN_ACTION.trim() : "");
            cstmt.setString(2, filter.CODIGO != null ? filter.CODIGO.trim() : "");
            cstmt.setString(3, filter.DESCRIPTC != null ? filter.DESCRIPTC.trim() : "");
            cstmt.setString(4, session.getUserView().getUserInfo().USR); 

            cstmt.registerOutParameter(5, Types.VARCHAR); // OUT_CODE
            cstmt.registerOutParameter(6, Types.VARCHAR); // OUT_MSG
            cstmt.registerOutParameter(7, Types.VARCHAR); // OUT_NEW_CODIGO

            cstmt.execute();

            response.put("OUT_CODE", cstmt.getString(5));
            response.put("OUT_MSG", cstmt.getString(6));
            response.put("OUT_NEW_CODIGO", cstmt.getString(7));

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                }
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
        }

        return response;
    }

    public Map<String, String> assignComment(MPF303Filter filter) throws SQLException, Exception {
        
        Map<String, String> response = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS647(?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.IN_ACTION != null ? filter.IN_ACTION.trim() : "");
            cstmt.setString(2, filter.CCUST != null ? filter.CCUST.trim() : "");
            cstmt.setString(3, filter.IDCDEB != null ? filter.IDCDEB.trim() : "");
            cstmt.setString(4, filter.COMMENT_CODE != null ? filter.COMMENT_CODE.trim() : "");
            cstmt.setString(5, session.getUserView().getUserInfo().USR); 

            cstmt.registerOutParameter(6, Types.VARCHAR);
            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.execute();

            response.put("OUT_CODE", cstmt.getString(6));
            response.put("OUT_MSG", cstmt.getString(7));

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                }
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
        }

        return response;
    }
}
