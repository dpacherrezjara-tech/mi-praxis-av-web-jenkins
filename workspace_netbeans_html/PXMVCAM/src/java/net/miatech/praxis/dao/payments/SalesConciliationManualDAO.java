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
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2295Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author
 */
public class SalesConciliationManualDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesConciliationManualDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesConciliationManualDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2295Filter> loadPX290MPS077(A2295Filter filter) throws SQLException, Exception {

        List<A2295Filter> lstTkts = new ArrayList<A2295Filter>(0);
        A2295Filter beanTkt;
        long lngTotTkt = 0, lngTotSett = 0, lngTotsettmatch = 0, lngTotSettpend = 0, lngTotTktmatch = 0, lngTotTktpend = 0;


        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS077_MAIN(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE_FROM.trim());
            cstmt.setString(3, filter.IN_DATE_TO.trim());
            
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
                lngTotSett = rst.getLong("QSETT");
                lngTotTkt = rst.getLong("QTKT");
                lngTotsettmatch = rst.getLong("QSETTMATCH");
                lngTotSettpend = rst.getLong("QSETTPEND");
                lngTotTktmatch = rst.getLong("QTKTMATCH");
                lngTotTktpend = rst.getLong("QTKTPEND");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2295Filter();

                    beanTkt.PRDA = rst.getString("DATE").trim();
                    
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());
                    beanTkt.lngQSETT = rst.getLong("QSETT");
                    beanTkt.lngQTKT = rst.getLong("QTKT");
                    beanTkt.lngQSETTMATCH = rst.getLong("QSETTMATCH");
                    beanTkt.lngQSETTPEND = rst.getLong("QSETTPEND");
                    beanTkt.lngQTKTMATCH = rst.getLong("QTKTMATCH");
                    beanTkt.lngQTKTPEND = rst.getLong("QTKTPEND");


                    beanTkt.lngTotQSETT = lngTotSett;
                    beanTkt.lngTotQTKT = lngTotTkt;
                    beanTkt.lngTotQSETTMATCH = lngTotsettmatch;
                    beanTkt.lngTotQSETTPEND = lngTotSettpend;
                    beanTkt.lngTotQTKTMATCH = lngTotTktmatch;
                    beanTkt.lngTotQTKTPEND = lngTotTktpend;


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
    
    public List<A2295Filter> loadPX290MPS077_MONTH(A2295Filter filter) throws SQLException, Exception {

        List<A2295Filter> lstTkts = new ArrayList<A2295Filter>(0);
        A2295Filter beanTkt;
        long lngTotTkt = 0, lngTotSett = 0, lngTotsettmatch = 0, lngTotSettpend = 0, lngTotTktmatch = 0, lngTotTktpend = 0;


        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS077_MONTH(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PRDA.trim());
            
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
// ESTA LISTA ES PARA EL SUMARIOS
            while (rst.next()) {
                lngTotSett = rst.getLong("QSETT");
                lngTotTkt = rst.getLong("QTKT");
                lngTotsettmatch = rst.getLong("QSETTMATCH");
                lngTotSettpend = rst.getLong("QSETTPEND");
                lngTotTktmatch = rst.getLong("QTKTMATCH");
                lngTotTktpend = rst.getLong("QTKTPEND");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
// LISTA PARA LA GRILLA
                    beanTkt = new A2295Filter();

                    beanTkt.PRDA = rst.getString("DATE").trim();

//                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());
                    beanTkt.lngQSETT = rst.getLong("QSETT");
                    beanTkt.lngQTKT = rst.getLong("QTKT");
                    beanTkt.lngQSETTMATCH = rst.getLong("QSETTMATCH");
                    beanTkt.lngQSETTPEND = rst.getLong("QSETTPEND");
                    beanTkt.lngQTKTMATCH = rst.getLong("QTKTMATCH");
                    beanTkt.lngQTKTPEND = rst.getLong("QTKTPEND");


                    beanTkt.lngTotQSETT = lngTotSett;
                    beanTkt.lngTotQTKT = lngTotTkt;
                    beanTkt.lngTotQSETTMATCH = lngTotsettmatch;
                    beanTkt.lngTotQSETTPEND = lngTotSettpend;
                    beanTkt.lngTotQTKTMATCH = lngTotTktmatch;
                    beanTkt.lngTotQTKTPEND = lngTotTktpend;


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
    
    public List<A2295Filter> loadPX290MPS077_DAY(A2295Filter filter) throws SQLException, Exception {

        List<A2295Filter> lstTkts = new ArrayList<A2295Filter>(0);
        A2295Filter beanTkt;
        long lngTotAmount = 0, lngTotQty = 0, lngTotProc = 0, lngTotNotProc = 0, totalTran = 0, totalProc = 0;


        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS077_DAY(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PRDA.trim());
            cstmt.setString(3, filter.IN_FCONCEP.trim());
            cstmt.setString(4, filter.IN_STVAL.trim());
            
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
                lngTotAmount = rst.getLong("MONTO");
                lngTotQty = rst.getLong("CANTIDAD");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2295Filter();

                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.strTitulo = filter.IN_TITLE.trim();
                    beanTkt.IN_PRDA = filter.IN_PRDA.trim();
                    beanTkt.IN_FCONCEP = filter.IN_FCONCEP.trim();
                    beanTkt.IN_FSELEC = filter.IN_FSELEC.trim();
                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
                    
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.TOT_QTY = rst.getLong("CANTIDAD");
                    beanTkt.TOT_SVFOP = rst.getLong("MONTO");
//                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());


                    beanTkt.lngTotAmount = lngTotAmount;
                    beanTkt.lngTotQty = lngTotQty;

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
    
    public List<A2295Filter> loadPX290MPS077_DET(A2295Filter filter) throws SQLException, Exception {
        List<A2295Filter> list = new ArrayList<A2295Filter>();
        A2295Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        hmDescDocType.put("R", "Rfnd");
        hmDescDocType.put("C", "Chargeback");
        hmDescDocType.put("A", "Acredit");

//        double SVFOPOT = 0, SVFOPNETR = 0 ;
//        double SVFOPCA = 0, SVFOPCC = 0 ;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS077_V1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE_FROM.trim());
            cstmt.setString(3, filter.IN_DATE_TO.trim());
            cstmt.setString(4, filter.IN_TKT.trim());
            cstmt.setString(5, filter.IN_FCONCEP.trim());
            cstmt.setString(6, filter.IN_STVAL.trim());
            cstmt.setString(7, filter.IN_TRANL.trim());
            cstmt.setString(8, filter.IN_SEQ.trim());
            cstmt.setString(9, filter.IN_SCARDN1.trim());
            cstmt.setString(10, filter.IN_SCARDN2.trim());
            cstmt.setString(11, filter.IN_SAUTHOC.trim());

            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                objRtn = new A2295Filter();
                objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                objRtn.IN_DATE_TO = filter.IN_DATE_TO;

                objRtn.PRDA = rs01.getString("PRDA").trim();
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.FCONCEP = rs01.getString("FCONCEP").trim();
                objRtn.TKT = rs01.getString("CCIA").trim()+rs01.getString("FORMA").trim()+rs01.getString("SERIE").trim();
                objRtn.SDATE = rs01.getString("SDATE").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                objRtn.SVFOP = rs01.getString("SVFOP").trim();
                objRtn.SVFOPACUM = rs01.getString("SVFOPACUM").trim();
                objRtn.SEQ = rs01.getString("SEQ").trim();
                objRtn.USERF = rs01.getString("USERF").trim();
                objRtn.CERROR = rs01.getString("ERROR").trim();
                objRtn.ACCNUMA = rs01.getString("ACCNUMA").trim();
                objRtn.COSTCEN = rs01.getString("COSTCEN").trim();
                objRtn.TRANL = rs01.getString("TRANL").trim();
                objRtn.DATEC = rs01.getString("DATEC").trim();
                objRtn.TRANC = rs01.getString("TRANC").trim();
                objRtn.SAGENT = rs01.getString("SAGENT").trim();
                objRtn.INVOICE = rs01.getString("INVOICE").trim();

                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);

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
    
    public List<A2295Filter> loadPX290MPS077_DET_BYF(A2295Filter filter) throws SQLException, Exception {
        List<A2295Filter> list = new ArrayList<A2295Filter>();
        A2295Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        hmDescDocType.put("R", "Rfnd");
        hmDescDocType.put("C", "Chargeback");
        hmDescDocType.put("A", "Acredit");

//        double SVFOPOT = 0, SVFOPNETR = 0 ;
//        double SVFOPCA = 0, SVFOPCC = 0 ;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS077_DET_BYF(?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PRDA.trim());
            cstmt.setString(3, filter.IN_SCURRENCY.trim());
            cstmt.setString(4, filter.IN_FCONCEP.trim());
            cstmt.setString(5, filter.IN_STVAL.trim());

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                objRtn = new A2295Filter();


                objRtn.PRDA = rs01.getString("PRDA").trim();
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.FCONCEP = rs01.getString("FCONCEP").trim();
                objRtn.TKT = rs01.getString("CCIA").trim()+rs01.getString("FORMA").trim()+rs01.getString("SERIE").trim();
                objRtn.SDATE = rs01.getString("SDATE").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                objRtn.SVFOP = rs01.getString("SVFOP").trim();
                objRtn.SEQ = rs01.getString("SEQ").trim();
                objRtn.USERF = rs01.getString("USERF").trim();
                objRtn.CERROR = rs01.getString("ERROR").trim();
                if(filter.IN_TITLE.contains("Not Processed")){
                    objRtn.strTitulo = "Proc Date : " + filter.IN_PRDA + " - Not Processed - " + " Currency: " + filter.IN_SCURRENCY;  
                }else if(filter.IN_TITLE.contains("Settlements")){
                    objRtn.strTitulo = "Proc Date : " + filter.IN_PRDA + " - Settlements - " + " Currency: " + filter.IN_SCURRENCY;
                }else if(filter.IN_TITLE.contains("Tickets")){
                    objRtn.strTitulo = "Proc Date : " + filter.IN_PRDA + " - Tickets - " + " Currency: " + filter.IN_SCURRENCY;
                }else{
                    objRtn.strTitulo = "Proc Date : " + filter.IN_PRDA + " - Processed - " + " Currency: " + filter.IN_SCURRENCY;
                }
                 

                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);

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
    
     public List<A2295Filter> loadPX290MPS077_DET_BYD(A2295Filter filter) throws SQLException, Exception {
        List<A2295Filter> list = new ArrayList<A2295Filter>();
        A2295Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        hmDescDocType.put("R", "Rfnd");
        hmDescDocType.put("C", "Chargeback");
        hmDescDocType.put("A", "Acredit");

//        double SVFOPOT = 0, SVFOPNETR = 0 ;
//        double SVFOPCA = 0, SVFOPCC = 0 ;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS077_DET_BYD(?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PRDA.trim());

            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                objRtn = new A2295Filter();


                objRtn.PRDA = rs01.getString("PRDA").trim();
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.FCONCEP = rs01.getString("FCONCEP").trim();
                objRtn.TKT = rs01.getString("CCIA").trim()+rs01.getString("FORMA").trim()+rs01.getString("SERIE").trim();
                objRtn.SDATE = rs01.getString("SDATE").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                objRtn.SVFOP = rs01.getString("SVFOP").trim();
                objRtn.SEQ = rs01.getString("SEQ").trim();
                objRtn.USERF = rs01.getString("USERF").trim();
                objRtn.CERROR = rs01.getString("ERROR").trim();
                
                objRtn.strTitulo = "Proc Date : " + filter.IN_PRDA;  
                
                 

                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);

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
     
    public List<A2295Filter> loadPX290MPS077_DET_BYS(A2295Filter filter) throws SQLException, Exception {
        List<A2295Filter> list = new ArrayList<A2295Filter>();
        A2295Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        hmDescDocType.put("R", "Rfnd");
        hmDescDocType.put("C", "Chargeback");
        hmDescDocType.put("A", "Acredit");
        String concept = "";
        String status = "";
        
//        double SVFOPOT = 0, SVFOPNETR = 0 ;
//        double SVFOPCA = 0, SVFOPCC = 0 ;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS077_DET_BYS(?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PRDA.trim());
            cstmt.setString(3, filter.IN_STVAL.trim());
            cstmt.setString(4, filter.IN_FCONCEP.trim());

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                objRtn = new A2295Filter();


                objRtn.PRDA = rs01.getString("PRDA").trim();
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.FCONCEP = rs01.getString("FCONCEP").trim();
                objRtn.TKT = rs01.getString("CCIA").trim()+rs01.getString("FORMA").trim()+rs01.getString("SERIE").trim();
                objRtn.SDATE = rs01.getString("SDATE").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                objRtn.SVFOP = rs01.getString("SVFOP").trim();
                objRtn.SEQ = rs01.getString("SEQ").trim();
                objRtn.USERF = rs01.getString("USERF").trim();
                objRtn.CERROR = rs01.getString("ERROR").trim();
                
                if(filter.IN_FCONCEP.equals("I")){
                    concept = "Settlement";
                }else{
                    concept = "Tickets";
                }
                if(filter.IN_STVAL.equals("5")){
                    status = "Match";
                }else if(filter.IN_STVAL.equals("3")){
                    status = "Not Processed";
                }
                objRtn.strTitulo = "Proc Date : " + filter.IN_PRDA + " - " + concept + " - " + status;  
                
                 

                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);

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
    
    public A2295Filter SQPMPF114_MANUAL_MONTH(A2295Filter filter, UserView user) throws SQLException, Exception {

        String strMsj = "Operation was successful.";
        A2295Filter objRtn = new A2295Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMANUAL_SAGENT_SDATE(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PRDA.trim());
            cstmt01.setString(3, filter.IN_TRANL.trim());
            cstmt01.setString(4, user.getUserInfo().USR);
            cstmt01.setString(5, Functions.getFechaActual());
            cstmt01.setString(6, Functions.getHoraActual());
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.VARCHAR);
            cstmt01.execute();
            objRtn.QTYRECORDS =  cstmt01.getInt(7);
            objRtn.QTYUP =  cstmt01.getInt(8);
            objRtn.MESSAGE =  cstmt01.getString(9);
            objRtn.USCR =  user.getUserInfo().USR;  
            objRtn.FECR =  Functions.getFechaActual();  
            objRtn.HOCR =  Functions.getHoraActual();
            
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            strMsj = e.getMessage();
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
