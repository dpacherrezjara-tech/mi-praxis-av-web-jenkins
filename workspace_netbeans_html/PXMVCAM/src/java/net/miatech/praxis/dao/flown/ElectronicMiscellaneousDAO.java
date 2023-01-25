/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1817Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ElectronicMiscellaneousDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ElectronicMiscellaneousDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ElectronicMiscellaneousDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1817Filter> loadPX135S01A1817(A1817Filter filter) throws SQLException, Exception {

        List<A1817Filter> lstData = new ArrayList<>(0);
        A1817Filter bean;
        String strFecha = "";
        String strQuiebre = "";
        int QCPNEMD = 0, QCPNUSEA = 0, QCPNSTAS = 0, QCPNOTHE = 0;
        String NFLIGHT = "", LEGSEQ = "", IN_NFLIGHT = filter.NFLIGHT.trim();
        CallableStatement cstmt = null;
        ResultSet rst = null;

        Connection cnx = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX135S01A1817(?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.NFLIGHT);
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                QCPNEMD = rst.getInt("QCPNEMD");
                QCPNUSEA = rst.getInt("QCPNUSEA");
                QCPNSTAS = rst.getInt("QCPNSTAS");
                QCPNOTHE = rst.getInt("QCPNOTHE");
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A1817Filter();
                    bean.DFLIGHT = rst.getString("DFLIGHT");
                    bean.NFLIGHT = filter.NFLIGHT;
                    bean.strFormatDate = Functions.getMonthConvert(bean.DFLIGHT);
                    bean.QCPNEMD = rst.getInt("QCPNEMD");
                    bean.QCPNUSEA = rst.getInt("QCPNUSEA");
                    bean.QCPNSTAS = rst.getInt("QCPNSTAS");
                    bean.QCPNOTHU = rst.getInt("QCPNOTHE");

                    bean.totQCPNEMD = QCPNEMD;
                    bean.totQCPNUSEA = QCPNUSEA;
                    bean.totQCPNSTAS = QCPNSTAS;
                    bean.totQCPNOTHU = QCPNOTHE;

                    lstData.add(bean);
                }
            }

        } catch (Exception e) {
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

        return lstData;
    }

    public List<A1817Filter> loadPX135S02A1817(A1817Filter filter) throws SQLException, Exception {

        List<A1817Filter> lstData = new ArrayList<A1817Filter>(0);
        A1817Filter bean;
        int QCPNEMD = 0, QCPNUSEA = 0, QCPNSTAS = 0, QCPNOTHE = 0, QCPNVAL = 0, QCPNOAL = 0, QCPNON = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX135S02A1817_1(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DFLIGHT);
            cstmt.setString(3, filter.NFLIGHT);
            cstmt.setString(4, filter.IN_FECHA_FROM);
            cstmt.setString(5, filter.IN_FECHA_TO);

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                QCPNEMD = rst.getInt("QCPNEMD");
                QCPNUSEA = rst.getInt("QCPNUSEA");
                QCPNSTAS = rst.getInt("QCPNSTAS");
                QCPNOTHE = rst.getInt("QCPNOTHE");
                QCPNVAL = rst.getInt("QCPNVAL");
                QCPNON = rst.getInt("QCPNON");
                QCPNOAL = rst.getInt("QCPNOAL");

            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    bean = new A1817Filter();
                    bean.DFLIGHT = rst.getString("DFLIGHT");
                    bean.strFormatDate = Functions.getMonthConvert(bean.DFLIGHT);
                    bean.strFormatDate3 = Functions.getMonthConvert(filter.DFLIGHT);
                    bean.NFLIGHT = rst.getString("NFLIGHT");
                    bean.ZONA = rst.getString("ZONA");
                    bean.CDEPART = rst.getString("CDEPART");
                    bean.CARRIVA = rst.getString("CARRIVA");

                    bean.QCPNOAL = rst.getInt("QCPNOAL");
                    bean.QCPNON = rst.getInt("QCPNON");
                    bean.QCPNEMD = rst.getInt("QCPNEMD");
                    bean.QCPNUSEA = rst.getInt("QCPNUSEA");
                    bean.QCPNSTAS = rst.getInt("QCPNSTAS");
                    bean.QCPNOTHU = rst.getInt("QCPNOTHE");
                    bean.QCPNVAL = rst.getInt("QCPNVAL");
                    bean.NPLANE = rst.getString("NPLANE");
                    bean.QCPNDIFF = bean.QCPNUSEA - bean.QCPNVAL;

                    bean.totQCPNON = QCPNON;
                    bean.totQCPNOAL = QCPNOAL;
                    bean.totQCPNEMD = QCPNEMD;
                    bean.totQCPNUSEA = QCPNUSEA;
                    bean.totQCPNSTAS = QCPNSTAS;
                    bean.totQCPNOTHU = QCPNOTHE;
                    bean.totQCPNVAL = QCPNVAL;
                    bean.totQCPNDIFF = QCPNUSEA - QCPNVAL;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lstData.add(bean);
                }
            }

        } catch (Exception e) {
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

        return lstData;
    }
    
    public List<A1692Filter> loadPX135S03A1818(A1817Filter filter) throws SQLException, Exception {
        List<A1692Filter> lstCons = new ArrayList<A1692Filter>(0);
        A1692Filter beanCons;
        String strDesc = "", tipo = "";
        strDesc = "Operation Date : " + filter.strFormatDate + " - Detail of Quantity " + tipo;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX135S03A1818(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DFLIGHT);
            cstmt.setString(3, filter.NFLIGHT);
            cstmt.setString(4, filter.ZONA);
            cstmt.setString(5, filter.CDEPART);
            cstmt.setString(6, filter.CARRIVA);
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
                beanCons = new A1692Filter();

                beanCons.DFLIGHT = filter.DFLIGHT;
                beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                beanCons.ZONA = filter.ZONA;
                beanCons.CDEPART = filter.CDEPART;
                beanCons.CARRIVA = filter.CARRIVA;
                beanCons.NFLIGHT = filter.NFLIGHT;
                beanCons.IDCON = rst.getString("IDCON");
                beanCons.FCONT = rst.getString("FCONT");
                beanCons.strFCON = Functions.getMonthConvert3(rst.getString("FCONT"));
                beanCons.CARR = rst.getString("CARR");
                beanCons.FTE = rst.getString("FTE");
                beanCons.TVTA = rst.getString("TVTA");
                if (beanCons.TVTA.equals("I")) {
                    beanCons.strDescripcion = "International";
                } else if (beanCons.TVTA.equals("D")) {
                    beanCons.strDescripcion = "Domestic";
                }
                beanCons.FVTA = rst.getString("FVTA");
                beanCons.strFormatDate2 = Functions.getMonthConvert(rst.getString("FVTA"));
                beanCons.PSVVTA = rst.getString("PSVVTA");
                beanCons.CCIA = rst.getString("CCIA");
                beanCons.FORMA = rst.getString("FORMA");
                beanCons.SERIE = rst.getString("SERIE");
                beanCons.CUPON = rst.getString("CUPON");
                beanCons.strTicket = rst.getString("CCIA") + " " + rst.getString("FORMA") + rst.getString("SERIE") + " " + rst.getString("CUPON");
                beanCons.RECODE = rst.getString("RECODE");
                beanCons.RFIC = rst.getString("RFIC");
                beanCons.DES_RECODE = rst.getString("DESC_RECODE");
                beanCons.MDACP = rst.getString("MDACP");
                beanCons.NPLANE = rst.getString("NPLANE");
                beanCons.SEQRO = rst.getString("SEQRO");
                beanCons.SEQ = rst.getString("SEQ");

                beanCons.VTAX = rst.getDouble("VTAX");
                beanCons.VCPMX = rst.getDouble("VCPMX");
                beanCons.TCMUS = rst.getDouble("TCMUS");
                beanCons.VCPUS = rst.getDouble("VCPUS");
                beanCons.COMISI = rst.getDouble("COMISI");
                beanCons.FVAL = rst.getString("FVAL");
                if (beanCons.FVAL.equals("1")) {
                    beanCons.strDescFVAL = "ISR Values/Sales";
                    beanCons.VCPN = rst.getDouble("VCPN");
                } else if (beanCons.FVAL.equals("2")) {
                    beanCons.strDescFVAL = "Average Value";
                    beanCons.VCPN = rst.getDouble("VCPMX");
                } else if (beanCons.FVAL.equals("3")) {
                    beanCons.strDescFVAL = "VTR";
                    beanCons.VCPN = rst.getDouble("VCPN");
                }
                if (rst.getString("FCRUC").trim().equals("1")) {
                    beanCons.TKTASO = rst.getString("TKTASO") + " - " + "Flown";
                } else {
                    beanCons.TKTASO = rst.getString("TKTASO");
                }

                beanCons.page.PAGNUM = filter.page.PAGNUM;
                beanCons.page.PAGROW = filter.page.PAGROW;
                beanCons.page.TOTPAG = filter.page.TOTPAG;
                beanCons.page.TOTROW = filter.page.TOTROW;

                lstCons.add(beanCons);
            }

        } catch (Exception e) {
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

        return lstCons;
    }


    public List<A1692Filter> loadPX135S05A1818(A1817Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX135S05A1818(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cstmt01.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cstmt01.setString(4, filter.IN_TKT.substring(7, 13));//SERIE
            cstmt01.setString(5, filter.DFLIGHT.trim());
            cstmt01.setString(6, filter.NFLIGHT.trim());
            cstmt01.setString(7, filter.ZONA.trim());
            cstmt01.setString(8, filter.CDEPART.trim());
            cstmt01.setString(9, filter.CARRIVA.trim());
            cstmt01.setString(10, filter.IN_SEQRO.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1692Filter();
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.FORMA = rs01.getString("FORMA").trim();
                objRtn.SERIE = rs01.getString("SERIE").trim();
                objRtn.CUPON = rs01.getString("CUPON").trim();
                objRtn.SEQRO = rs01.getString("SEQRO").trim();
                objRtn.SEQ = rs01.getString("SEQ").trim();
//                if (objRtn.SEQRO.equals("00")) {
//                    objRtn.SEQRO = "";
//                }
                objRtn.RFIC = rs01.getString("RFIC");
                objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                objRtn.ZONA = rs01.getString("ZONA");
                objRtn.CDEPART = rs01.getString("CDEPART");
                objRtn.CARRIVA = rs01.getString("CARRIVA");
                objRtn.NFLIGHT = rs01.getString("NFLIGHT");

                objRtn.CARR = rs01.getString("CARR");
                objRtn.FTE = rs01.getString("FTE");
                objRtn.TVTA = rs01.getString("TVTA");
                if (objRtn.TVTA.equals("I")) {
                    objRtn.strDescripcion = "International";
                } else if (objRtn.TVTA.equals("D")) {
                    objRtn.strDescripcion = "Domestic";
                }
                objRtn.FVTA = rs01.getString("FVTA");
                objRtn.strFormatDate2 = Functions.getMonthConvert(rs01.getString("FVTA"));
                objRtn.PSVVTA = rs01.getString("PSVVTA");
                objRtn.strTicket = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                objRtn.RECODE = rs01.getString("RECODE");
                objRtn.MDACP = rs01.getString("MDACP");

                objRtn.VTAX = rs01.getDouble("VTAX");
                objRtn.VCPMX = rs01.getDouble("VCPMX");
                objRtn.TCMUS = rs01.getDouble("TCMUS");
                objRtn.VCPUS = rs01.getDouble("VCPUS");
                objRtn.TKTASO = rs01.getString("TKTASO");
                objRtn.COMISI = rs01.getDouble("COMISI");
                objRtn.FVAL = rs01.getString("FVAL");
                objRtn.FLOAD = rs01.getString("FLOAD");
                objRtn.VCPN = rs01.getDouble("VCPN");
                if (objRtn.FVAL.equals("1")) {
                    objRtn.strDescFVAL = "ISR Values/Sales";
                    //objRtn.VCPN = rs01.getDouble("VCPN");
                } else if (objRtn.FVAL.equals("2")) {
                    objRtn.strDescFVAL = "Average Value";
                    objRtn.VCPN = rs01.getDouble("VCPMX");
                } else if (objRtn.FVAL.equals("3")) {
                    objRtn.strDescFVAL = "VTR";
                    //objRtn.VCPN = rs01.getDouble("VCPN");
                }
                objRtn.IDCON = rs01.getString("IDCON");
                objRtn.FCONT = rs01.getString("FCONT");
                objRtn.strFCON = Functions.getMonthConvert3(rs01.getString("FCONT"));

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

    public A1817Filter loadPX135S03A1817(A1817Filter filter) throws SQLException, Exception {

        A1817Filter objRtn = new A1817Filter();

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX135S03A1817(?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT.trim());
            cstmt01.setString(3, filter.NFLIGHT.trim());
            cstmt01.setString(4, filter.CDEPART.trim());
            cstmt01.setString(5, filter.CARRIVA.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.STVAL = rs01.getString("STVAL");
                objRtn.TEMD = rs01.getString("TEMD");
                objRtn.FFLOW = rs01.getString("FFLOW");
                objRtn.TOPER = rs01.getString("TOPER");
                objRtn.CDEPART = rs01.getString("CDEPART");
                objRtn.CARRIVA = rs01.getString("CARRIVA");
                objRtn.ZONA = rs01.getString("ZONA");
                objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                objRtn.FSENDEM = rs01.getString("FSENDEM");
                objRtn.QCPNEMD = rs01.getInt("QCPNEMD");
                objRtn.QCPNSTAS = rs01.getInt("QCPNSTAS");
                objRtn.QCPNUSEA = rs01.getInt("QCPNUSEA");
                objRtn.QCPNOTHE = rs01.getInt("QCPNOTHE");
                objRtn.FCLOSE = rs01.getString("FCLOSE");
                objRtn.QCPNVAL = rs01.getInt("QCPNVAL");
                objRtn.FSTAPO = rs01.getString("FSTAPO");

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = Functions.ConvertedTime(rs01.getString("HOCR").trim());
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = Functions.ConvertedTime(rs01.getString("HOUP").trim());

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

    public String loadPX135S04A1817(A1817Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1707.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX135S04A1817(?,?,?,?,?,?,?,?,?,?," + "?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.STVAL);
            cstmt.setString(4, filter.TEMD);
            cstmt.setString(5, filter.FFLOW);
            cstmt.setString(6, filter.TOPER);
            cstmt.setString(7, filter.CDEPART);
            cstmt.setString(8, filter.CARRIVA);
            cstmt.setString(9, filter.ZONA);
            cstmt.setString(10, filter.NFLIGHT);
            cstmt.setString(11, filter.DFLIGHT);
            cstmt.setString(12, filter.FSENDEM);
            cstmt.setInt(13, filter.QCPNEMD);
            cstmt.setInt(14, filter.QCPNSTAS);
            cstmt.setInt(15, filter.QCPNUSEA);
            cstmt.setInt(16, filter.QCPNOTHE);
            cstmt.setString(17, filter.FCLOSE);
            cstmt.setLong(18, filter.QCPNVAL);
            cstmt.setString(19, filter.FSTAPO);
            cstmt.execute();

        } catch (Exception e) {
            e.getMessage();
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

    public A1692Filter loadPX135S06A1818(A1692Filter filter) throws SQLException, Exception {

        A1692Filter objRtn = new A1692Filter();

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX135S06A1818(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CCIA.trim());
            cstmt01.setString(3, filter.FORMA.trim());
            cstmt01.setString(4, filter.SERIE.trim());
            cstmt01.setString(5, filter.CUPON.trim());
            cstmt01.setString(6, filter.SEQ.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.CCIA = rs01.getString("CCIA");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.SEQRO = rs01.getString("SEQRO");
                //objRtn.strTicket = objRtn.CCIA + objRtn.FORMA + objRtn.SERIE + objRtn.CUPON;
                objRtn.strTicket = objRtn.CCIA + objRtn.FORMA + objRtn.SERIE ;
                objRtn.DCHEQ = rs01.getString("DCHEQ");
                objRtn.SEQ = rs01.getString("SEQ");
                objRtn.STVAL = rs01.getString("STVAL");
                objRtn.FTE = rs01.getString("FTE");
                objRtn.TEMD = rs01.getString("TEMD");
                objRtn.FLOAD = rs01.getString("FLOAD");
                objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                objRtn.CDEPART = rs01.getString("CDEPART");
                objRtn.CARRIVA = rs01.getString("CARRIVA");
                objRtn.ITINERA = rs01.getString("ITINERA");
                //objRtn.LEGSEQ=rs01.getString("LEGSEQ");
                objRtn.NPLANE = rs01.getString("NPLANE");
                objRtn.ZONA = rs01.getString("ZONA");
                objRtn.RECODE = rs01.getString("RECODE");
                objRtn.TKTASO = rs01.getString("TKTASO");
                objRtn.STORG = rs01.getString("STORG");
                objRtn.CDOC = rs01.getString("CDOC");
                objRtn.TDOC = rs01.getString("TDOC");
                objRtn.PSVVTA = rs01.getString("PSVVTA");
                objRtn.AGTIA = rs01.getString("AGTIA");
                objRtn.FVTA = rs01.getString("FVTA");
                objRtn.TVTA = rs01.getString("TVTA");
                objRtn.TPAX = rs01.getString("TPAX");
                objRtn.TOPUS = rs01.getString("TOPUS");
                objRtn.CARR = rs01.getString("CARR");
                objRtn.CABI = rs01.getString("CABI");
                objRtn.CLAS = rs01.getString("CLAS");
                objRtn.FBASE = rs01.getString("FBASE");
                objRtn.CFF = rs01.getString("CFF");
                objRtn.VCPN = rs01.getDouble("VCPN");
                objRtn.COMISI = rs01.getDouble("COMISI");
                objRtn.VTAX = rs01.getDouble("VTAX");
                objRtn.FVAL = rs01.getString("FVAL");
                objRtn.FECVAL = rs01.getString("FECVAL");
                objRtn.MDACP = rs01.getString("MDACP");
                objRtn.VCPMX = rs01.getDouble("VCPMX");
                objRtn.TCMUS = rs01.getDouble("TCMUS");
                objRtn.VCPUS = rs01.getDouble("VCPUS");
                objRtn.FCONT = rs01.getString("FCONT");
                objRtn.IDCON = rs01.getString("IDCON");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR").trim();
                objRtn.HOCR = Functions.ConvertedTime(rs01.getString("HOCR").trim());
                objRtn.USUP = rs01.getString("USUP").trim();
                objRtn.FEUP = rs01.getString("FEUP").trim();
                objRtn.HOUP = Functions.ConvertedTime(rs01.getString("HOUP").trim());

            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
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


    public String loadPX135S04A1818(A1692Filter filter, String strOption) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1818.
        String strMsj = "Operation was successful.";
        if (strOption.trim().equals("I")) {
            filter.STVAL = "1";//Status Pendiente
            if (filter.VCPN > 0) {
                filter.STVAL = "2";//Status Valorizado
            }
        }

        CallableStatement cstmt = null;

        //PX13500004
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX135S04A1818(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,"
                + "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(49, Types.VARCHAR);

            cstmt.setString(1, strOption.trim());
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.CCIA.trim());
            cstmt.setString(4, filter.FORMA.trim());
            cstmt.setString(5, filter.SERIE.trim());
            cstmt.setString(6, filter.CUPON.trim());
            cstmt.setString(7, filter.DCHEQ.trim());
            cstmt.setString(8, filter.SEQ.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.FTE.trim());
            cstmt.setString(11, filter.TEMD.trim());
            cstmt.setString(12, filter.FLOAD.trim());
            cstmt.setString(13, filter.DFLIGHT.trim());
            cstmt.setString(14, filter.NFLIGHT.trim());
            cstmt.setString(15, filter.CDEPART.trim());
            cstmt.setString(16, filter.CARRIVA.trim());
            cstmt.setString(17, filter.ITINERA.trim());
            cstmt.setString(18, filter.LEGSEQ.trim());
            cstmt.setString(19, filter.NPLANE.trim());
            cstmt.setString(20, filter.ZONA.trim());
            cstmt.setString(21, filter.RECODE.trim());
            cstmt.setString(22, filter.TKTASO.trim());
            cstmt.setString(23, filter.STORG.trim());
            cstmt.setString(24, filter.CDOC.trim());
            cstmt.setString(25, filter.TDOC.trim());
            cstmt.setString(26, filter.PSVVTA.trim());
            cstmt.setString(27, filter.AGTIA.trim());
            cstmt.setString(28, filter.FVTA.trim());
            cstmt.setString(29, filter.TVTA.trim());
            cstmt.setString(30, filter.TPAX.trim());
            cstmt.setString(31, filter.TOPUS.trim());
            cstmt.setString(32, filter.CARR.trim());
            cstmt.setString(33, filter.CABI.trim());
            cstmt.setString(34, filter.CLAS.trim());
            cstmt.setString(35, filter.FBASE.trim());
            cstmt.setString(36, filter.CFF.trim());
            cstmt.setDouble(37, filter.VCPN);
            cstmt.setDouble(38, filter.COMISI);
            cstmt.setDouble(39, filter.VTAX);
            cstmt.setString(40, filter.FVAL);
            cstmt.setString(41, filter.MDACP.trim());
            cstmt.setDouble(42, filter.VCPMX);
            cstmt.setDouble(43, filter.TCMUS);
            cstmt.setDouble(44, filter.VCPUS);
            cstmt.setString(45, filter.FCONT.trim());
            cstmt.setString(46, filter.IDCON.trim());
            cstmt.setString(47, filter.FECVAL.trim());
            cstmt.setString(48, filter.CUPONNEW.trim());
            cstmt.setString(49, "");//MSJ
            cstmt.execute();

            //Obteniendo el mensaje de error ===================================    
            if (cstmt.getString(49) != null) {
                strMsj = cstmt.getString(49).trim();
            }

            if (strMsj.trim().isEmpty()) {
                strMsj = "Operation was successful.";
            }

        } catch (Exception e) {
            e.getMessage();
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
