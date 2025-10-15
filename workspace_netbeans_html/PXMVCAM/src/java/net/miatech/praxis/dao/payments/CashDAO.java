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

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2282Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author 
 */
public class CashDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CashDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CashDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2282Filter> loadPX268SQP00675(A2282Filter filter) throws SQLException, Exception {
        List<A2282Filter> list = new ArrayList<A2282Filter>();
        A2282Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblAmount = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00675(?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.PROCIND.trim());
            cstmt.setString(6, filter.TRANSTYPE.trim());
            //cstmt.setString(7, filter.CURRENC.trim());
            cstmt.setString(7, filter.AGENTE.trim());
            cstmt.setString(8, filter.ENTITY.trim());
            cstmt.setString(9, filter.PERIOD.trim());

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblAmount = rs01.getDouble("AMOUNT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2282Filter();

                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO;
                    objRtn.IN_PERIOD = filter.IN_PERIOD;

                    objRtn.AIRLINE = rs01.getString("AIRLINE").trim();
                    objRtn.PROCIND = rs01.getString("PROCIND").trim();
                    if (objRtn.PROCIND.equals("1")) {
                        objRtn.strDescrip = "1 - BILLED ELECTRONICALLY";
                    } else if (objRtn.PROCIND.equals("2")) {
                        objRtn.strDescrip = "2 - BILLED ELECTRONICALLY";
                    } else if (objRtn.PROCIND.equals("4")) {
                        objRtn.strDescrip = "4 - NOT PRESENTED TO CARD COMPANY";
                    } else {
                        objRtn.strDescrip = " ";
                    }
                    objRtn.TRANSTYPE = rs01.getString("TRANSTYPE").trim();
                    if (objRtn.TRANSTYPE.equals("S")) {
                        objRtn.strDescrip2 = "SALES";
                    } else if (objRtn.TRANSTYPE.equals("R")) {
                        objRtn.strDescrip2 = "REFUNDS";
                    }
                    objRtn.CURRENC = rs01.getString("CURRENC").trim();
                    objRtn.CREDITCARD = rs01.getString("CREDITCARD").trim();
                    objRtn.ISSUEDATE = rs01.getString("ISSUEDATE").trim();
                    objRtn.strFecha = Functions.getMonthConvert(objRtn.ISSUEDATE);
                    objRtn.DOCNUM = rs01.getString("AIRLINE").trim() + " " + rs01.getString("DOCNUM").trim();
                    objRtn.DOCIND = rs01.getString("DOCIND").trim();
                    objRtn.AGENTE = rs01.getString("AGENTE").trim();
                    objRtn.APPROVCOD = rs01.getString("APPROVCOD").trim();
                    objRtn.EXPDATE = rs01.getString("EXPDATE").trim();
                    objRtn.CUSTFILE = rs01.getString("CUSTFILE").trim();
                    objRtn.ENTITY = rs01.getString("ENTITY").trim();
                    //  objRtn.strDescrip3 = rs01.getString("DES_ENTITY"); 
                    objRtn.INVOICENUM = rs01.getString("INVOICENUM").trim();
                    objRtn.LCCBREF = rs01.getString("LCCBREF").trim();
                    objRtn.MERCHANTNU = rs01.getString("MERCHANTNU").trim();
                    objRtn.PERIOD = rs01.getString("PERIODE").trim();
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.RN = rs01.getLong("TTANSAC");

                    objRtn.TOTdblAmount = dblAmount;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
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

        return list;
    }
    
    public List<A2282Filter> loadPX268SQP00907(A2282Filter filter) throws SQLException, Exception {

        List<A2282Filter> lstObjetos = new ArrayList<A2282Filter>(0);
        A2282Filter objRtn;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00907(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cstmt.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cstmt.setString(4, filter.IN_TKT.substring(7, 13));//SERIE

            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                objRtn = new A2282Filter();
                objRtn.AIRLINE = rs01.getString("AIRLINE").trim();
                objRtn.PROCIND = rs01.getString("PROCIND").trim();
                if (objRtn.PROCIND.equals("1")) {
                    objRtn.strDescrip = "1 - BILLED ELECTRONICALLY";
                } else if (objRtn.PROCIND.equals("2")) {
                    objRtn.strDescrip = "2 - BILLED ELECTRONICALLY";
                } else if (objRtn.PROCIND.equals("4")) {
                    objRtn.strDescrip = "4 - NOT PRESENTED TO CARD COMPANY";
                } else {
                    objRtn.strDescrip = " ";
                }
                objRtn.TRANSTYPE = rs01.getString("TRANSTYPE").trim();
                if (objRtn.TRANSTYPE.equals("S")) {
                    objRtn.strDescrip2 = "SALES";
                } else if (objRtn.TRANSTYPE.equals("R")) {
                    objRtn.strDescrip2 = "REFUNDS";
                }
                objRtn.CURRENC = rs01.getString("CURRENC").trim();
                objRtn.CREDITCARD = rs01.getString("CREDITCARD").trim();
                objRtn.ISSUEDATE = rs01.getString("ISSUEDATE").trim();
                objRtn.strFecha = Functions.getMonthConvert5(objRtn.ISSUEDATE);
                objRtn.DOCNUM = rs01.getString("AIRLINE").trim() + " " + rs01.getString("DOCNUM").trim();
                objRtn.DOCIND = rs01.getString("DOCIND").trim();
                objRtn.AGENTE = rs01.getString("AGENTE").trim();
                objRtn.APPROVCOD = rs01.getString("APPROVCOD").trim();
                objRtn.EXPDATE = rs01.getString("EXPDATE").trim();
                objRtn.CUSTFILE = rs01.getString("CUSTFILE").trim();
                objRtn.ENTITY = rs01.getString("ENTITY").trim();
                //  objRtn.strDescrip3 = rs01.getString("DES_ENTITY"); 
                objRtn.INVOICENUM = rs01.getString("INVOICENUM").trim();
                objRtn.LCCBREF = rs01.getString("LCCBREF").trim();
                objRtn.MERCHANTNU = rs01.getString("MERCHANTNU").trim();
                objRtn.PERIOD = rs01.getString("PERIODE").trim();
                objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                objRtn.RN = rs01.getLong("TTANSAC");

                lstObjetos.add(objRtn);
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

        return lstObjetos;
    }
    
    public List<A2290Filter> loadPX263SQP00652(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTotQARC = 0, lngTotQBSP = 0, lngTotQVentaDirecta = 0, lngTotQARCConc = 0, lngTotQBSPConc = 0, lngTotQVentaDirectaConc = 0, lngTotQPOLIPE = 0, lngTotQEXT = 0;
        String Fec = "";

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        if (filter.strMonthTo == null || filter.strMonthTo.trim().isEmpty()) {
            filter.strMonthTo = "12";
        } else {
            filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        }
        
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00652_V2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.VARCHAR);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(4, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_PAYMENT.trim());
            cstmt.setString(8, filter.IN_CARDC.trim());
            cstmt.setString(9, filter.IN_TICKET.trim());
            cstmt.setString(10, filter.IN_FTE.trim());
            cstmt.setString(11, filter.IN_AFTE.trim());
            cstmt.setString(12, filter.IN_CARDN.trim());
            cstmt.setString(13, filter.IN_STVAL.trim());
            cstmt.setString(14, filter.IN_MERCHN.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());
            cstmt.setString(16, filter.IN_SCAR.trim());
            cstmt.setString(17, filter.IN_EXT.trim());
            cstmt.setString(18, "");

            cstmt.setInt(19, filter.page.PAGNUM);
            cstmt.setInt(20, filter.page.PAGROW);
            cstmt.setInt(21, filter.page.TOTPAG);
            cstmt.setInt(22, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            Fec = cstmt.getString(18);
            filter.page.PAGNUM = cstmt.getInt(19);
            filter.page.PAGROW = cstmt.getInt(20);
            filter.page.TOTPAG = cstmt.getInt(21);
            filter.page.TOTROW = cstmt.getInt(22);

            while (rst.next()) {
                lngTotQARC = rst.getLong("TOTAL_ARC");
                lngTotQBSP = rst.getLong("TOTAL_BSP");
                lngTotQVentaDirecta = rst.getLong("TOTAL_VENTADIRECTA");
                lngTotQARCConc = rst.getLong("TOTAL_ARCCONC");
                lngTotQBSPConc = rst.getLong("TOTAL_BSPCONC");
                lngTotQVentaDirectaConc = rst.getLong("TOTAL_VENTADIRECTACONC");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strDescripcion = "  " + Functions.getMonthConvert(Fec);
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.IN_SDATE = rst.getString("SDATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    beanTkt.IN_SCAR = filter.IN_SCAR.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();

                    beanTkt.lngARC = rst.getLong("CANT_ARC");
                    beanTkt.lngBSP = rst.getLong("CANT_BSP");
                    beanTkt.lngVentaDirecta = rst.getLong("CANT_VENTADIRECTA");
                    beanTkt.lngArcConc = rst.getLong("ARC_CONCILIATION");
                    beanTkt.lngBspConc = rst.getLong("BSP_CONCILIATION");
                    beanTkt.lngVentaDirectaConc = rst.getLong("VENTADIRECTA_CONCILIATION");

                                       
                    beanTkt.lngTotQARC = lngTotQARC;
                    beanTkt.lngTotQBSP = lngTotQBSP;
                    beanTkt.lngTotQVentaDirecta = lngTotQVentaDirecta;
                    beanTkt.lngTotQARCConc = lngTotQARCConc;
                    beanTkt.lngTotQBSPConc = lngTotQBSPConc;
                    beanTkt.lngTotQVentaDirectaConc = lngTotQVentaDirectaConc;
                    

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
    
    public List<A2290Filter> loadPX100NEW(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTot0_10 = 0, lngTot11_20 = 0, lngTot21_30 = 0, lngTot31_40 = 0, lngTot41_mas = 0, lngTotQVentaDirectaConc = 0, lngTotQPOLIPE = 0, lngTotQEXT = 0;
        String Fec = "";

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        if (filter.strMonthTo == null || filter.strMonthTo.trim().isEmpty()) {
            filter.strMonthTo = "12";
        } else {
            filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        }
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0004582(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.VARCHAR);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(4, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_PAYMENT.trim());
            cstmt.setString(8, filter.IN_CARDC.trim());
            cstmt.setString(9, filter.IN_TICKET.trim());
            cstmt.setString(10, filter.IN_FTE.trim());
            cstmt.setString(11, filter.IN_AFTE.trim());
            cstmt.setString(12, filter.IN_CARDN.trim());
            cstmt.setString(13, filter.IN_STVAL.trim());
            cstmt.setString(14, filter.IN_MERCHN.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());
            cstmt.setString(16, filter.IN_SCAR.trim());
            cstmt.setString(17, filter.IN_BANK.trim());
            cstmt.setString(18, "");

            cstmt.setInt(19, filter.page.PAGNUM);
            cstmt.setInt(20, filter.page.PAGROW);
            cstmt.setInt(21, filter.page.TOTPAG);
            cstmt.setInt(22, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            Fec = cstmt.getString(18);
            filter.page.PAGNUM = cstmt.getInt(19);
            filter.page.PAGROW = cstmt.getInt(20);
            filter.page.TOTPAG = cstmt.getInt(21);
            filter.page.TOTROW = cstmt.getInt(22);

            while (rst.next()) {
                lngTot0_10 = rst.getLong("TOTAL_0_10");
                lngTot11_20 = rst.getLong("TOTAL_11_20");
                lngTot21_30 = rst.getLong("TOTAL_21_30");
                lngTot31_40 = rst.getLong("TOTAL_31_40");
                lngTot41_mas = rst.getLong("TOTAL_41_MAS");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strDescripcion = "  " + Functions.getMonthConvert(Fec);
                    beanTkt.SDATE = rst.getString("FPAYMEN").trim();
                    beanTkt.IN_SDATE = rst.getString("FPAYMEN").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("FPAYMEN").trim());
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    beanTkt.IN_SCAR = filter.IN_SCAR.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();

                    beanTkt.lng0_10 = rst.getLong("CANT_0_10");
                    beanTkt.lng11_20 = rst.getLong("CANT_11_20");
                    beanTkt.lng21_30 = rst.getLong("CANT_21_30");
                    beanTkt.lng31_40 = rst.getLong("CANT_31_40");
                    beanTkt.lng41_MAS = rst.getLong("CANT_41_mas");
                                       
                    beanTkt.lngTot0_10 = lngTot0_10;
                    beanTkt.lngTot11_20 = lngTot11_20;
                    beanTkt.lngTot21_30 = lngTot21_30;
                    beanTkt.lngTot31_40 = lngTot31_40;
                    beanTkt.lngTot41_mas = lngTot41_mas;
                    

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
    
    public List<A2290Filter> loadPX100DetailDay(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstTkts = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        long lngTot0_10 = 0, lngTot11_20 = 0, lngTot21_30 = 0, lngTot31_40 = 0, lngTot41_mas = 0, lngTotQVentaDirectaConc = 0, lngTotQPOLIPE = 0, lngTotQEXT = 0;
        String Fec = "";

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strDayFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        if (filter.strMonthTo == null || filter.strMonthTo.trim().isEmpty()) {
            filter.strMonthTo = "12";
        } else {
            filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        }
        if (filter.strDayTo == null || filter.strDayTo.trim().isEmpty()) {
            filter.strDayTo = "30";
        } else {
            filter.strDayTo = Functions.fillZeros(2, filter.strDayTo).replace("00", "");
        }
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0001565(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(18, Types.VARCHAR);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);
            cstmt.registerOutParameter(21, Types.INTEGER);
            cstmt.registerOutParameter(22, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_SDATE+"00");
            cstmt.setString(4, filter.IN_SDATE+"31");
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_PAYMENT.trim());
            cstmt.setString(8, filter.IN_CARDC.trim());
            cstmt.setString(9, filter.IN_TICKET.trim());
            cstmt.setString(10, filter.IN_FTE.trim());
            cstmt.setString(11, filter.IN_AFTE.trim());
            cstmt.setString(12, filter.IN_CARDN.trim());
            cstmt.setString(13, filter.IN_STVAL.trim());
            cstmt.setString(14, filter.IN_MERCHN.trim());
            cstmt.setString(15, filter.IN_ADYEN.trim());
            cstmt.setString(16, filter.IN_SCAR.trim());
            cstmt.setString(17, filter.IN_BANK.trim());
            cstmt.setString(18, "");

            cstmt.setInt(19, filter.page.PAGNUM);
            cstmt.setInt(20, filter.page.PAGROW);
            cstmt.setInt(21, filter.page.TOTPAG);
            cstmt.setInt(22, filter.page.TOTROW);
            cstmt.execute();

            rst = cstmt.getResultSet();

            Fec = cstmt.getString(18);
            filter.page.PAGNUM = cstmt.getInt(19);
            filter.page.PAGROW = cstmt.getInt(20);
            filter.page.TOTPAG = cstmt.getInt(21);
            filter.page.TOTROW = cstmt.getInt(22);

            while (rst.next()) {
                lngTot0_10 = rst.getLong("TOTAL_0_10");
                lngTot11_20 = rst.getLong("TOTAL_11_20");
                lngTot21_30 = rst.getLong("TOTAL_21_30");
                lngTot31_40 = rst.getLong("TOTAL_31_40");
                lngTot41_mas = rst.getLong("TOTAL_41_MAS");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2290Filter();
                    beanTkt.strDescripcion = "  " + Functions.getMonthConvert(Fec);
                    beanTkt.SDATE = rst.getString("FPAYMEN").trim();
                    beanTkt.IN_SDATE = rst.getString("FPAYMEN").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("FPAYMEN").trim());
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    beanTkt.IN_PAYMENT = filter.IN_PAYMENT.trim();
                    beanTkt.IN_CARDN = filter.IN_CARDN.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
                    beanTkt.IN_TICKET = filter.IN_TICKET.trim();
                    beanTkt.IN_FTE = filter.IN_FTE.trim();
                    beanTkt.IN_AFTE = filter.IN_AFTE.trim();
                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
                    beanTkt.IN_ADYEN = filter.IN_ADYEN.trim();
                    beanTkt.IN_SCAR = filter.IN_SCAR.trim();
                    beanTkt.IN_EXT = filter.IN_EXT.trim();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();

                    beanTkt.lng0_10 = rst.getLong("CANT_0_10");
                    beanTkt.lng11_20 = rst.getLong("CANT_11_20");
                    beanTkt.lng21_30 = rst.getLong("CANT_21_30");
                    beanTkt.lng31_40 = rst.getLong("CANT_31_40");
                    beanTkt.lng41_MAS = rst.getLong("CANT_41_mas");
                                       
                    beanTkt.lngTot0_10 = lngTot0_10;
                    beanTkt.lngTot11_20 = lngTot11_20;
                    beanTkt.lngTot21_30 = lngTot21_30;
                    beanTkt.lngTot31_40 = lngTot31_40;
                    beanTkt.lngTot41_mas = lngTot41_mas;
                    

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
    
}
