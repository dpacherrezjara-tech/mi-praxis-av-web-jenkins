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
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jsolano
 */
public class InputsDesignDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InputsDesignDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InputsDesignDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2353Filter> loadPX285SQPMULTISEARCH(A2353Filter filter) throws SQLException, Exception {

        List<A2353Filter> lstData = new ArrayList<A2353Filter>(0);
        A2353Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMULTISEARCH(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_CODEM.trim());

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
                bean = new A2353Filter();
                bean.CPROGRAM = rst.getString("CPROGRAM").trim();
                bean.NPROGRAM = rst.getString("NPROGRAM").trim();

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

    public String loadPX285SQPMULTIUPDATE(A2353Filter filter) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2284.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMULTIUPDATE(?,?,?,?,?,?,?,?,?,?,"
                                                                              + "?,?,?,?,?,?,?,?,?,?,"
                                                                              + "?,?,?,?,?,?,?,?,?,?,"
                                                                              + "?,?,?,?,?,?,?,?,?,?,"
                                                                              + "?,?,?,?,?,?,?,?,?,?,"
                                                                              + "?,?,?,?,?,?,?,?,?,?,"
                                                                              + "?,?,?,?,?,?,?,?,?,?,"
                                                                              + "?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.option);
            cstmt.setString(2, filter.CPROGRAM.trim());
            cstmt.setString(3, filter.NPROGRAM.trim());
            cstmt.setString(4, filter.DELILNK.trim());
            cstmt.setString(5, filter.SCOUNTRY.trim());
            cstmt.setString(6, filter.RSCOUNTRY.trim());
            cstmt.setString(7, filter.CODEBANK.trim());
            cstmt.setString(8, filter.RCODEBANK.trim());
            cstmt.setString(9, filter.PRDA.trim());
            cstmt.setString(10, filter.RPRDA.trim());
            cstmt.setString(11, filter.TRANE.trim());
            cstmt.setString(12, filter.RTRAN.trim());
            cstmt.setString(13, filter.TDOC.trim());
            cstmt.setString(14, filter.RTDOC.trim());
            cstmt.setString(15, filter.SDATE.trim());
            cstmt.setString(16, filter.RSDATE.trim());
            cstmt.setString(17, filter.ADATE.trim());
            cstmt.setString(18, filter.RADATE.trim());
            cstmt.setString(19, filter.SAGENT.trim());
            cstmt.setString(20, filter.RSAGENT.trim());
            cstmt.setString(21, filter.MERCHAND.trim());
            cstmt.setString(22, filter.RMERCHAND.trim());
            cstmt.setString(23, filter.TERMI.trim());
            cstmt.setString(24, filter.RTERMI.trim());
            cstmt.setString(25, filter.SCARCOD.trim());
            cstmt.setString(26, filter.RSCARCOD.trim());
            cstmt.setString(27, filter.SCARDN.trim());
            cstmt.setString(28, filter.RSCARDN.trim());
            cstmt.setString(29, filter.SCARDNCOR.trim());
            cstmt.setString(30, filter.RSCARDNCOR.trim());
            cstmt.setString(31, filter.SAUTHOC.trim());
            cstmt.setString(32, filter.RSAUTHOC.trim());
            cstmt.setString(33, filter.SDATEXP.trim());
            cstmt.setString(34, filter.RSDATEXP.trim());
            cstmt.setString(35, filter.SPNR.trim());
            cstmt.setString(36, filter.RSPNR.trim());
            cstmt.setString(37, filter.TIPOTAR.trim());
            cstmt.setString(38, filter.RTIPOTAR.trim());
            cstmt.setString(39, filter.RED.trim());
            cstmt.setString(40, filter.RRED.trim());
            cstmt.setString(41, filter.ACCNUMBER.trim());
            cstmt.setString(42, filter.RACCNUMBER.trim());
            cstmt.setString(43, filter.CCIA.trim());
            cstmt.setString(44, filter.RCCIA.trim());
            cstmt.setString(45, filter.FORMA.trim());
            cstmt.setString(46, filter.RFORMA.trim());
            cstmt.setString(47, filter.SERIE.trim());
            cstmt.setString(48, filter.RSERIE.trim());
            cstmt.setString(49, filter.SCURRENCY.trim());
            cstmt.setString(50, filter.RSCURRENCY.trim());
            cstmt.setString(51, filter.SALEVAL.trim());
            cstmt.setString(52, filter.RSALEVAL.trim());
            cstmt.setString(53, filter.SVFOPE.trim());
            cstmt.setString(54, filter.RSVFOP.trim());
            cstmt.setString(55, filter.IVA.trim());
            cstmt.setString(56, filter.RIVA.trim());
            cstmt.setString(57, filter.PROPINA.trim());
            cstmt.setString(58, filter.RPROPINA.trim());
            cstmt.setString(59, filter.TOTAL.trim());
            cstmt.setString(60, filter.RTOTAL.trim());
            cstmt.setString(61, filter.COMISION.trim());
            cstmt.setString(62, filter.RCOMISION.trim());
            cstmt.setString(63, filter.BASEFUE.trim());
            cstmt.setString(64, filter.RBASEFUE.trim());
            cstmt.setString(65, filter.RTEFUE.trim());
            cstmt.setString(66, filter.RRTEFUE.trim());
            cstmt.setString(67, filter.RTEIVA.trim());
            cstmt.setString(68, filter.RRTEIVA.trim());
            cstmt.setString(69, filter.BASICA.trim());
            cstmt.setString(70, filter.RBASICA.trim());
            cstmt.setString(71, filter.RTEICA.trim());
            cstmt.setString(72, filter.RRTEICA.trim());
            cstmt.setString(73, filter.NETO.trim());
            cstmt.setString(74, filter.RNETO.trim());
            cstmt.setString(75, filter.FLOAD.trim());
            cstmt.setString(76, filter.LDATE.trim());
            cstmt.setString(77, filter.TDATE.trim());
            cstmt.setString(78, filter.SORIG.trim());
            cstmt.setString(79, session.getUserView().getUserInfo().USR);
            cstmt.setString(80, Functions.getFechaActual());
            cstmt.setString(81, Functions.getHoraActual());
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
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;
    }

    public A2353Filter loadPX285SQPMULTIENTRY(A2353Filter filter) throws SQLException, Exception {

        A2353Filter objRtn = new A2353Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMULTIENTRY(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CPROGRAM.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CPROGRAM = rs01.getString("CPROGRAM").trim();
                objRtn.NPROGRAM = rs01.getString("NPROGRAM").trim();
                objRtn.DELILNK = rs01.getString("DELILNK").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.RSCOUNTRY = rs01.getString("RSCOUNTRY").trim();
                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                objRtn.RCODEBANK = rs01.getString("RCODEBANK").trim();
                objRtn.PRDA = rs01.getString("PRDA").trim();
                objRtn.RPRDA = rs01.getString("RPRDA").trim();
                objRtn.TRANE = rs01.getString("TRAN").trim();
                objRtn.RTRAN = rs01.getString("RTRAN").trim();
                objRtn.TDOC = rs01.getString("TDOC").trim();
                objRtn.RTDOC = rs01.getString("RTDOC").trim();
                objRtn.SDATE = rs01.getString("SDATE").trim();
                objRtn.RSDATE = rs01.getString("RSDATE").trim();
                objRtn.ADATE = rs01.getString("ADATE").trim();
                objRtn.RADATE = rs01.getString("RADATE").trim();
                objRtn.SAGENT = rs01.getString("SAGENT").trim();
                objRtn.RSAGENT = rs01.getString("RSAGENT").trim();
                objRtn.MERCHAND = rs01.getString("MERCHAND").trim();
                objRtn.RMERCHAND = rs01.getString("RMERCHAND").trim();
                objRtn.TERMI = rs01.getString("TERMI").trim();
                objRtn.RTERMI = rs01.getString("RTERMI").trim();
                objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                objRtn.RSCARCOD = rs01.getString("RSCARCOD").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.RSCARDN = rs01.getString("RSCARDN").trim();
                objRtn.SCARDNCOR = rs01.getString("SCARDNCOR").trim();
                objRtn.RSCARDNCOR = rs01.getString("RSCARDNCOR").trim();
                objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                objRtn.RSAUTHOC = rs01.getString("RSAUTHOC").trim();
                objRtn.SDATEXP = rs01.getString("SDATEXP").trim();
                objRtn.RSDATEXP = rs01.getString("RSDATEXP").trim();
                objRtn.SPNR = rs01.getString("SPNR").trim();
                objRtn.RSPNR = rs01.getString("RSPNR").trim();
                objRtn.TIPOTAR = rs01.getString("TIPOTAR").trim();
                objRtn.RTIPOTAR = rs01.getString("RTIPOTAR").trim();
                objRtn.RED = rs01.getString("RED").trim();
                objRtn.RRED = rs01.getString("RRED").trim();
                objRtn.ACCNUMBER = rs01.getString("ACCNUMBER").trim();
                objRtn.RACCNUMBER = rs01.getString("RACCNUMBER").trim();
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.RCCIA = rs01.getString("RCCIA").trim();
                objRtn.FORMA = rs01.getString("FORMA").trim();
                objRtn.RFORMA = rs01.getString("RFORMA").trim();
                objRtn.SERIE = rs01.getString("SERIE").trim();
                objRtn.RSERIE = rs01.getString("RSERIE").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.RSCURRENCY = rs01.getString("RSCURRENCY").trim();
                objRtn.SALEVAL = rs01.getString("SALEVAL").trim();
                objRtn.RSALEVAL = rs01.getString("RSALEVAL").trim();
                objRtn.SVFOPE = rs01.getString("SVFOP").trim();
                objRtn.RSVFOP = rs01.getString("RSVFOP").trim();
                objRtn.IVA = rs01.getString("IVA").trim();
                objRtn.RIVA = rs01.getString("RIVA").trim();
                objRtn.PROPINA = rs01.getString("PROPINA").trim();
                objRtn.RPROPINA = rs01.getString("RPROPINA").trim();
                objRtn.TOTAL = rs01.getString("TOTAL").trim();
                objRtn.RTOTAL = rs01.getString("RTOTAL").trim();
                objRtn.COMISION = rs01.getString("COMISION").trim();
                objRtn.RCOMISION = rs01.getString("RCOMISION").trim();
                objRtn.BASEFUE = rs01.getString("BASEFUE").trim();
                objRtn.RBASEFUE = rs01.getString("RBASEFUE").trim();
                objRtn.RTEFUE = rs01.getString("RTEFUE").trim();
                objRtn.RRTEFUE = rs01.getString("RRTEFUE").trim();
                objRtn.RTEIVA = rs01.getString("RTEIVA").trim();
                objRtn.RRTEIVA = rs01.getString("RRTEIVA").trim();
                objRtn.BASICA = rs01.getString("BASICA").trim();
                objRtn.RBASICA = rs01.getString("RBASICA").trim();
                objRtn.RTEICA = rs01.getString("RTEICA").trim();
                objRtn.RRTEICA = rs01.getString("RRTEICA").trim();
                objRtn.NETO = rs01.getString("NETO").trim();
                objRtn.RNETO = rs01.getString("RNETO").trim();
                objRtn.FLOAD = rs01.getString("FLOAD").trim();
                objRtn.LDATE = rs01.getString("LDATE").trim();
                objRtn.TDATE = rs01.getString("TDATE").trim();
                objRtn.SORIG = rs01.getString("SORIG").trim();

                objRtn.USCR = rs01.getString("USCR").trim();
                objRtn.FECR = rs01.getString("FECR").trim();
                objRtn.HOCR = rs01.getString("HOCR").trim();
                objRtn.USUP = rs01.getString("USUP").trim();
                objRtn.FEUP = rs01.getString("FEUP").trim();
                objRtn.HOUP = rs01.getString("HOUP").trim();

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
