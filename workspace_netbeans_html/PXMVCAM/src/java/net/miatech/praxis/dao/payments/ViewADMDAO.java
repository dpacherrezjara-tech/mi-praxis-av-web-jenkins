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
import static net.miatech.praxis.dao.payments.BankReconciliationDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2295Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author
 */
public class ViewADMDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ViewADMDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ViewADMDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2295Filter> loadPX644SQPMPF100ADM(A2295Filter filter) throws SQLException, Exception {

        List<A2295Filter> lstTkts = new ArrayList<A2295Filter>(0);
        A2295Filter beanTkt;
        long lngTot = 0, lngTotSent = 0, lngTotNotSent = 0, lngTotSentAns = 0, lngTotSentPend = 0, lngTotSentAccep = 0, lngTotSentRej = 0;


        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF100ADM(?,?,?,?,?,?,?)}"; //SQPMPF100ADM

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
                lngTot = rst.getLong("QTOTAL");
                lngTotSent = rst.getLong("QSEND");
                lngTotNotSent = rst.getLong("QNSEND");
                lngTotSentAns = rst.getLong("QANS");
                lngTotSentPend = rst.getLong("QSENDPEND");
                lngTotSentAccep = rst.getLong("QSENDA");
                lngTotSentRej = rst.getLong("QSENDR");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2295Filter();

                    beanTkt.SDATE = rst.getString("DATE").trim();
                    
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());
                    beanTkt.lngQTKT = rst.getLong("QTOTAL");
                    beanTkt.lngQSENT = rst.getLong("QSEND");
                    beanTkt.lngQNSENT = rst.getLong("QNSEND");
                    beanTkt.lngQSENTANS = rst.getLong("QANS");
                    beanTkt.lngQSENTPEND = rst.getLong("QSENDPEND");
                    beanTkt.lngQSENTACCEP = rst.getLong("QSENDA");
                    beanTkt.lngQSENTREJ = rst.getLong("QSENDR");


                    beanTkt.lngTotQTKT = lngTot;
                    beanTkt.lngTotQSENT = lngTotSent;
                    beanTkt.lngTotQNSENT = lngTotNotSent;
                    beanTkt.lngTotQSENTANS = lngTotSentAns;
                    beanTkt.lngTotQSENTPEND = lngTotSentPend;
                    beanTkt.lngTotQSENTACCEP = lngTotSentAccep;
                    beanTkt.lngTotQSENTREJ = lngTotSentRej;


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
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_COUNTRYBYF(A2295Filter filter) throws SQLException, Exception {

        List<A2295Filter> lstTkts = new ArrayList<A2295Filter>(0);
        A2295Filter beanTkt;
        long lngTotAmount = 0, lngTotQty = 0, lngTotProc = 0, lngTotNotProc = 0, totalTran = 0, totalProc = 0;


        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF100ADM_COUNTRYBYF(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE.trim());
            cstmt.setString(3, filter.IN_FSEND.trim());
            cstmt.setString(4, filter.IN_FRCV.trim());
            
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

//                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.strTitulo = filter.IN_TITLE.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_FSEND = filter.IN_FSEND.trim();
                    beanTkt.IN_FRCV = filter.IN_FRCV.trim();
                    
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("SCOUNTRYN").trim();
                    beanTkt.TOT_QTY = rst.getLong("CANTIDAD");
                    beanTkt.TOT_SVFOP = rst.getLong("MONTO");
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_SDATE.trim());
                    


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
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_CARDBYF(A2295Filter filter) throws SQLException, Exception {

        List<A2295Filter> lstTkts = new ArrayList<A2295Filter>(0);
        A2295Filter beanTkt;
        long lngTotAmount = 0, lngTotQty = 0, lngTotProc = 0, lngTotNotProc = 0, totalTran = 0, totalProc = 0;


        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF100ADM_SAGENTBYF(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE.trim());
            cstmt.setString(3, filter.IN_FSEND.trim());
            cstmt.setString(4, filter.IN_FRCV.trim());
            cstmt.setString(5, filter.IN_SCURRENCY.trim());
            cstmt.setString(6, filter.IN_SCOUNTRY.trim());
            
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
                lngTotAmount = rst.getLong("MONTO");
                lngTotQty = rst.getLong("CANTIDAD");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2295Filter();

//                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.strTitulo = filter.IN_TITLE.trim() + " - " + filter.IN_SCURRENCY.trim() + " - " + filter.IN_SCOUNTRY.trim() ;
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_FSEND = filter.IN_FSEND.trim();
                    beanTkt.IN_FRCV = filter.IN_FRCV.trim();
                    beanTkt.IN_SCURRENCY = filter.IN_SCURRENCY.trim();
                    beanTkt.IN_SCOUNTRY = filter.IN_SCOUNTRY.trim();
                    
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
//                    beanTkt.strDescCard = rst.getString("SCARCODN").trim();
                    beanTkt.TOT_QTY = rst.getLong("CANTIDAD");
                    beanTkt.TOT_SVFOP = rst.getLong("MONTO");
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_SDATE.trim());
                    
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
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_DETAILBYF(A2295Filter filter) throws SQLException, Exception {

        List<A2295Filter> lstTkts = new ArrayList<A2295Filter>(0);
        A2295Filter beanTkt;
        long lngTotAmount = 0, lngTotQty = 0, lngTotProc = 0, lngTotNotProc = 0, totalTran = 0, totalProc = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF100ADM_DETAILBYF(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE.trim());
            cstmt.setString(3, filter.IN_FSEND.trim());
            cstmt.setString(4, filter.IN_FRCV.trim());
            cstmt.setString(5, filter.IN_SCURRENCY.trim());
            cstmt.setString(6, filter.IN_SCOUNTRY.trim());
            cstmt.setString(7, filter.IN_SAGENT.trim());
            
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
                lngTotAmount = rst.getLong("SVFOP");
                
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2295Filter();

//                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.strTitulo = filter.IN_TITLE.trim() + " - " + filter.IN_SCARCOD.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_FSEND = filter.IN_FSEND.trim();
                    beanTkt.IN_FRCV = filter.IN_FRCV.trim();
                    beanTkt.IN_SCURRENCY = filter.IN_SCURRENCY.trim();
                    beanTkt.IN_SCOUNTRY = filter.IN_SCOUNTRY.trim();
                    beanTkt.IN_SCARCOD = filter.IN_SCARCOD.trim();
                    
                    
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDNCOR = rst.getString("SCARDNCOR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.ERROR = rst.getString("ERROR").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    }
//                    beanTkt.strSCURRENCY = rst.getString("MONEDAS").trim();
                    beanTkt.SVFOPS = rst.getDouble("SVFOP");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strDescCard = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.STCON = rst.getString("STCON").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_SDATE.trim());
                    
                    beanTkt.lngTotAmount = lngTotAmount;

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
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_DETAILBYEYES(A2295Filter filter) throws SQLException, Exception {

        List<A2295Filter> lstTkts = new ArrayList<A2295Filter>(0);
        A2295Filter beanTkt;
        long lngTotAmount = 0, lngTotQty = 0, lngTotProc = 0, lngTotNotProc = 0, totalTran = 0, totalProc = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF100ADM_DETAILBYEYES(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE.trim());
            cstmt.setString(3, filter.IN_FSEND.trim());
            cstmt.setString(4, filter.IN_FRCV.trim());
            
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
                lngTotAmount = rst.getLong("SVFOP");
                
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2295Filter();

//                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.strTitulo = filter.IN_TITLE.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_FSEND = filter.IN_FSEND.trim();
                    beanTkt.IN_FRCV = filter.IN_FRCV.trim();

                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDNCOR = rst.getString("SCARDNCOR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.ERROR = rst.getString("ERROR").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    }
//                    beanTkt.strSCURRENCY = rst.getString("MONEDAS").trim();
                    beanTkt.SVFOPS = rst.getDouble("SVFOP");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strDescCard = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.STCON = rst.getString("STCON").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_SDATE.trim());
                    
                    beanTkt.lngTotAmount = lngTotAmount;

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
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_DETAILBYEYESCOUNTRY(A2295Filter filter) throws SQLException, Exception {

        List<A2295Filter> lstTkts = new ArrayList<A2295Filter>(0);
        A2295Filter beanTkt;
        long lngTotAmount = 0, lngTotQty = 0, lngTotProc = 0, lngTotNotProc = 0, totalTran = 0, totalProc = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF100ADM_DETAILBYEYESCOUNTRY(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SDATE.trim());
            cstmt.setString(3, filter.IN_FSEND.trim());
            cstmt.setString(4, filter.IN_FRCV.trim());
            cstmt.setString(5, filter.IN_SCURRENCY.trim());
            cstmt.setString(6, filter.IN_SCOUNTRY.trim());
            
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
                lngTotAmount = rst.getLong("SVFOP");
                
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2295Filter();

//                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.strTitulo = filter.IN_TITLE.trim() + " - " + filter.IN_SCOUNTRY.trim()+ " - " + filter.IN_SCURRENCY.trim();
                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
                    beanTkt.IN_FSEND = filter.IN_FSEND.trim();
                    beanTkt.IN_FRCV = filter.IN_FRCV.trim();

                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.strDescCountry = rst.getString("NAMES").trim();
                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDNCOR = rst.getString("SCARDNCOR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.ERROR = rst.getString("ERROR").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim().toUpperCase())) {
                        beanTkt.strDescStatus = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    }
//                    beanTkt.strSCURRENCY = rst.getString("MONEDAS").trim();
                    beanTkt.SVFOPS = rst.getDouble("SVFOP");
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.strDescCard = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
                    //beanTkt.SDATEXP = Functions.FormatFecha(rst.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.STCON = rst.getString("STCON").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(filter.IN_SDATE.trim());
                    
                    beanTkt.lngTotAmount = lngTotAmount;

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
    
        public List<A2290Filter> loadPX644SQPMPF100ADM_MSSG(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05103(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("NAME").trim();

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
        
    public List<A2290Filter> loadPX644SQPMPF100ADM_BEANTKT(A2290Filter filter) throws SQLException, Exception {

        List<A2290Filter> lstData = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt;
        String tipFecha = "Debits";
        if (filter.TDOC.trim().equals("R")) {
            tipFecha = "Refund";
        }
        double totAVFOP = 0;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", tipFecha + " without ACCB");
        hmDescEstados.put("3", "ACCB without " + tipFecha);
        hmDescEstados.put("4", "Match with Difference");
        hmDescEstados.put("5", "Match Manual");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF100ADM_BEANTKT(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CCIA.trim());
            cstmt.setString(3, filter.FORMA.trim());
            cstmt.setString(4, filter.SERIE.trim());
            cstmt.setString(5, filter.TDOC.trim());
            cstmt.setString(6, filter.SCARDNCOR.trim());
            cstmt.setString(7, filter.SAUTHOC.trim());
 


            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A2290Filter();

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.A1531TKT = beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE;
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();

                beanTkt.FDESGLOSE = "2";
                if (rst.getString("TDOC").trim().equals("R")) {
                    beanTkt.descTDOC = "Refund";
                } else if (rst.getString("TDOC").trim().equals("A")) {
                    beanTkt.descTDOC = "Adjust.";
                } else {
                    beanTkt.descTDOC = "Sales";
                }
                beanTkt.A1531TTARJ = rst.getString("SCARCOD").trim();
                beanTkt.A1531NREF = rst.getString("SCARDN").trim();
                beanTkt.SCARDNCOR = rst.getString("SCARDNCOR").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.A1531CAPL = rst.getString("SAUTHOC").trim();
                beanTkt.A1531MFOP = rst.getString("SCURRENCY").trim();
                beanTkt.A1531VFOP = rst.getDouble("SVFOP");
                beanTkt.tot_VFOP = rst.getDouble("SVFOP");
                beanTkt.A720FECVTA = rst.getString("SDATE").trim();
                beanTkt.A720PNR = rst.getString("SPNR").trim();
                beanTkt.A720AGENTE = rst.getString("SAGENT").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.CFUENTE = rst.getString("CFUENTE").trim();
                beanTkt.ERROR = rst.getString("ERROR").trim();

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
    
    public String loadPX644SQPMPF100ADM_EXECUTION(List<A2290Filter> filters, UserView user) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;

        try {
            A2290Filter filter = filters.get(0);
            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQPMPF100ADM_UPDATETKT(?,?,?,?,?,?,?,?,?,?)}";
            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt2 = cnx2.prepareCall(SQLCLL02);

            for (int i = 0; i < filters.size(); i++) {

                cstmt2 = cnx2.prepareCall(SQLCLL02);
                A2290Filter filterC = filters.get(i);

                cstmt2.setString(1, "U");
                cstmt2.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt2.setString(3, filterC.SCARDNCOR.trim());
                cstmt2.setString(4, filterC.SAUTHOC.trim());
                cstmt2.setString(5, filterC.TDOC.trim());
                cstmt2.setString(6, filterC.TICKET.trim());
                cstmt2.setString(7, filterC.CERROR.trim());
                cstmt2.setString(8, user.getUserInfo().USR);
                cstmt2.setString(9, Functions.getFechaActual());
                cstmt2.setString(10, Functions.getHoraActual());

                cstmt2.execute();
                cstmt2.close(); // Cerrar el CallableStatement después de cada ejecución
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    cstmt2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return strMsj;
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
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS077(?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE_FROM.trim());
            cstmt.setString(3, filter.IN_DATE_TO.trim());
            cstmt.setString(4, filter.IN_TKT.trim());
            cstmt.setString(5, filter.IN_FCONCEP.trim());

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
                objRtn.SEQ = rs01.getString("SEQ").trim();
                objRtn.USERF = rs01.getString("USERF").trim();

                
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
    
}
