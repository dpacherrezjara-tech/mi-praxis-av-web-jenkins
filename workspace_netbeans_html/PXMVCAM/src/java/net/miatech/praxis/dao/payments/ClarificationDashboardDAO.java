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
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ClarificationDashboardDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ClarificationDashboardDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ClarificationDashboardDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2331Filter> loadPX419SQP02079(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        A2331Filter objRtnNotFound = new A2331Filter();
        long QTYCLAR = 0, QTYCLARS = 0, QTYCLARP = 0, QTYCLARC = 0, QTYCLARN = 0, QTYBANK = 0, QTYBANKN = 0;
        long QTYCLART = 0, QTYBANKT = 0, QTYCHGBK = 0, QTYCLARR = 0;//Tkts
        double AMTSALE = 0, AMTCLAR = 0, AMTCLARU = 0, AMTBANK = 0, AMTBANKU = 0, AMTCHGBU = 0, AMTREVCU = 0;
        boolean hayNotFound = false;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02079_1(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            /*cstmt.registerOutParameter(13, Types.INTEGER);
             cstmt.registerOutParameter(14, Types.INTEGER);
             cstmt.registerOutParameter(15, Types.INTEGER);
             cstmt.registerOutParameter(16, Types.INTEGER);*/

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_SELECT.trim());
            /*cstmt.setInt(13, filter.page.PAGNUM);
             cstmt.setInt(14, filter.page.PAGROW);
             cstmt.setInt(15, filter.page.TOTPAG);
             cstmt.setInt(16, filter.page.TOTROW);*/
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            /*filter.page.PAGNUM = cstmt.getInt(13);
             filter.page.PAGROW = cstmt.getInt(14);
             filter.page.TOTPAG = cstmt.getInt(15);
             filter.page.TOTROW = cstmt.getInt(16);*/
            if (rs01.next()) {
                AMTSALE = rs01.getDouble("AMTSALE");
                QTYCLAR = rs01.getLong("QTYCLAR");
                QTYCLART = rs01.getLong("QTYCLART");
                QTYCLARS = rs01.getLong("QTYCLARS");
                QTYCLARP = rs01.getLong("QTYCLARP");
                QTYCLARC = rs01.getLong("QTYCLARC");
                QTYCLARN = rs01.getLong("QTYCLARN");
                AMTCLAR = rs01.getDouble("AMTCLAR");
                AMTCLARU = rs01.getDouble("AMTCLARU");

                QTYCHGBK = rs01.getLong("QTYCHGBK");
                QTYCLARR = rs01.getLong("QTYCLARR");
                AMTCHGBU = rs01.getDouble("AMTCHGBU");
                AMTREVCU = rs01.getDouble("AMTREVCU");

                AMTBANK = rs01.getLong("AMTBANK");
                AMTBANKU = rs01.getLong("AMTBANKU");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TDOC = filter.IN_TDOC;
                    objRtn.IN_SELECT = filter.IN_SELECT;

                    objRtn.SENTDATE = rs01.getString("GROUPBY").trim();
                    if (objRtn.IN_SELECT.trim().equals("MONTH")) {
                        objRtn.strFormatDate = Functions.getMonthConvert(rs01.getString("GROUPBY").trim());
                    } else {
                        objRtn.strDescripcion = rs01.getString("DESCRIPT").trim();
                    }
                    objRtn.dblAMTSALE = rs01.getDouble("AMTSALE");
                    objRtn.lngQTYCLAR = rs01.getLong("QTYCLAR");
                    objRtn.lngQTYCLART = rs01.getLong("QTYCLART");
                    objRtn.lngQTYCLARS = rs01.getLong("QTYCLARS");
                    objRtn.lngQTYCLARP = rs01.getLong("QTYCLARP");
                    objRtn.lngQTYCLARC = rs01.getLong("QTYCLARC");
                    objRtn.lngQNMATCH = rs01.getLong("QTYCLARN");
                    objRtn.dblAMTCLAR = rs01.getDouble("AMTCLAR");
                    objRtn.dblAMTCLARU = rs01.getDouble("AMTCLARU");

                    objRtn.QTYCHGBK = rs01.getLong("QTYCHGBK");
                    objRtn.AMTCHGBU = rs01.getDouble("AMTCHGBU");
                    objRtn.QTYCLARR = rs01.getLong("QTYCLARR");
                    objRtn.AMTREVCU = rs01.getDouble("AMTREVCU");

                    objRtn.lngQTYBANK = objRtn.QTYCHGBK - objRtn.QTYCLARR;
                    objRtn.dblAMTBANK = objRtn.AMTCHGBU - objRtn.AMTREVCU;

                    // objRtn.dblAMTBANK = rs01.getDouble("AMTBANK");
                    objRtn.dblAMTBANKU = rs01.getDouble("AMTBANKU");

                    objRtn.dblTotAMTSALE = AMTSALE;
                    objRtn.lngTotQTYCLAR = QTYCLAR;
                    objRtn.lngTotQTYCLART = QTYCLART;
                    objRtn.lngTotQTYCLARS = QTYCLARS;
                    objRtn.lngTotQTYCLARP = QTYCLARP;
                    objRtn.lngTotQTYCLARC = QTYCLARC;
                    objRtn.lngTotQNMATCH = QTYCLARN;
                    objRtn.dblTotAMTCLAR = AMTCLAR;
                    objRtn.dblTotAMTCLARU = AMTCLARU;

                    objRtn.totQTYCHGBK = QTYCHGBK; //QTYCHGBK
                    objRtn.totQTYCLARR = QTYCLARR;//QTYCLARR
                    objRtn.totAMTCHGBU = AMTCHGBU;
                    objRtn.totAMTREVCU = AMTREVCU;

                    objRtn.lngTotQTYBANK = objRtn.totQTYCHGBK - objRtn.totQTYCLARR;
                    objRtn.dblTotAMTBANK = objRtn.totAMTCHGBU - objRtn.totAMTREVCU;

                    //objRtn.dblTotAMTBANK = AMTBANK;
                    objRtn.dblTotAMTBANKU = AMTBANKU;

                    /*objRtn.page.PAGNUM = filter.page.PAGNUM;
                     objRtn.page.PAGROW = filter.page.PAGROW;
                     objRtn.page.TOTPAG = filter.page.TOTPAG;
                     objRtn.page.TOTROW = filter.page.TOTROW;*/
                    if (objRtn.SENTDATE.isEmpty()) {
                        hayNotFound = true;
                        objRtnNotFound = objRtn;
                    } else {
                        list.add(objRtn);
                    }
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

            if (hayNotFound) {
                list.add(objRtnNotFound);
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

        return list;
    }
    
    public List<A2331Filter> loadPX419SQP02104(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        A2331Filter objRtnNotFound = new A2331Filter();
        long QTYCLAR = 0, QTYCLARS = 0, QTYCLARP = 0, QTYCLARC = 0, QTYCLARN = 0, QTYBANK = 0, QTYBANKN = 0;
        long QTYCLART = 0, QTYBANKT = 0, QTYCHGBK = 0, QTYCLARR = 0;//Tkts
        double AMTSALE = 0, AMTCLAR = 0, AMTCLARU = 0, AMTBANK = 0, AMTBANKU = 0, AMTCHGBU = 0, AMTREVCU = 0;
        boolean hayNotFound = false;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02104_1(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.SENTDATE);
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                AMTSALE = rs01.getDouble("AMTSALE");
                QTYCLAR = rs01.getLong("QTYCLAR");
                QTYCLART = rs01.getLong("QTYCLART");
                QTYCLARS = rs01.getLong("QTYCLARS");
                QTYCLARP = rs01.getLong("QTYCLARP");
                QTYCLARC = rs01.getLong("QTYCLARC");
                QTYCLARN = rs01.getLong("QTYCLARN");
                AMTCLAR = rs01.getDouble("AMTCLAR");
                AMTCLARU = rs01.getDouble("AMTCLARU");
                QTYBANK = rs01.getLong("QTYBANK");
                QTYBANKT = rs01.getLong("QTYBANKT");
                QTYBANKN = rs01.getLong("QTYBANKN");
                AMTBANK = rs01.getLong("AMTBANK");
                AMTBANKU = rs01.getLong("AMTBANKU");

                QTYCHGBK = rs01.getLong("QTYCHGBK");
                QTYCLARR = rs01.getLong("QTYCLARR");
                AMTCHGBU = rs01.getDouble("AMTCHGBU");
                AMTREVCU = rs01.getDouble("AMTREVCU");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2331Filter();
                    objRtn.IN_DATE = filter.IN_DATE;
                    objRtn.SENTDATE = filter.SENTDATE;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.IN_TDOC = filter.IN_TDOC;

                    objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                    objRtn.strDescripcion = rs01.getString("DESCRIPT").trim();
                    objRtn.dblAMTSALE = rs01.getDouble("AMTSALE");
                    objRtn.lngQTYCLAR = rs01.getLong("QTYCLAR");
                    objRtn.lngQTYCLART = rs01.getLong("QTYCLART");
                    objRtn.lngQTYCLARS = rs01.getLong("QTYCLARS");
                    objRtn.lngQTYCLARP = rs01.getLong("QTYCLARP");
                    objRtn.lngQTYCLARC = rs01.getLong("QTYCLARC");
                    objRtn.lngQNMATCH = rs01.getLong("QTYCLARN");
                    objRtn.dblAMTCLAR = rs01.getDouble("AMTCLAR");
                    objRtn.dblAMTCLARU = rs01.getDouble("AMTCLARU");
                    //objRtn.lngQTYBANK = rs01.getLong("QTYBANK");
                    objRtn.lngQTYBANKT = rs01.getLong("QTYBANKT");
                    objRtn.lngQTYBANKN = rs01.getLong("QTYBANKN");
                    // objRtn.dblAMTBANK = rs01.getDouble("AMTBANK");
                    objRtn.dblAMTBANKU = rs01.getDouble("AMTBANKU");

                    objRtn.QTYCHGBK = rs01.getLong("QTYCHGBK");
                    objRtn.AMTCHGBU = rs01.getDouble("AMTCHGBU");
                    objRtn.QTYCLARR = rs01.getLong("QTYCLARR");
                    objRtn.AMTREVCU = rs01.getDouble("AMTREVCU");

                    objRtn.lngQTYBANK = objRtn.QTYCHGBK - objRtn.QTYCLARR;
                    objRtn.dblAMTBANK = objRtn.AMTCHGBU - objRtn.AMTREVCU;

                    objRtn.dblTotAMTSALE = AMTSALE;
                    objRtn.lngTotQTYCLAR = QTYCLAR;
                    objRtn.lngTotQTYCLART = QTYCLART;
                    objRtn.lngTotQTYCLARS = QTYCLARS;
                    objRtn.lngTotQTYCLARP = QTYCLARP;
                    objRtn.lngTotQTYCLARC = QTYCLARC;
                    objRtn.lngTotQNMATCH = QTYCLARN;
                    objRtn.dblTotAMTCLAR = AMTCLAR;
                    objRtn.dblTotAMTCLARU = AMTCLARU;
                    //objRtn.lngTotQTYBANK = QTYBANK;
                    objRtn.lngTotQTYBANKT = QTYBANKT;
                    objRtn.lngTotQTYBANKN = QTYBANKN;
                    // objRtn.dblTotAMTBANK = AMTBANK;
                    objRtn.dblTotAMTBANKU = AMTBANKU;

                    objRtn.totQTYCHGBK = QTYCHGBK; //QTYCHGBK
                    objRtn.totQTYCLARR = QTYCLARR;//QTYCLARR
                    objRtn.totAMTCHGBU = AMTCHGBU;
                    objRtn.totAMTREVCU = AMTREVCU;

                    objRtn.lngTotQTYBANK = objRtn.totQTYCHGBK - objRtn.totQTYCLARR;
                    objRtn.dblTotAMTBANK = objRtn.totAMTCHGBU - objRtn.totAMTREVCU;

                    if (objRtn.CODEBANK.isEmpty()) {
                        hayNotFound = true;
                        objRtnNotFound = objRtn;
                    } else {
                        list.add(objRtn);
                    }
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

            if (hayNotFound) {
                list.add(objRtnNotFound);
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

        return list;
    }

    
}
