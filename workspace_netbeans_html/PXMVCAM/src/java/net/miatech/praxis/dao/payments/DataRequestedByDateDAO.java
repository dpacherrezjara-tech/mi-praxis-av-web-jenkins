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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A3676Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.ExcelChargeBack;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.praxis.payment.filter.A2345Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class DataRequestedByDateDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public DataRequestedByDateDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DataRequestedByDateDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2331Filter> loadPX573SQP04266(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");
        hmDescSTVAL.put("6", "Reverse Chargeback");

        HashMap hmDescCRULE = new HashMap();
        hmDescCRULE.put("", "");
        hmDescCRULE.put("01", "Total");
        hmDescCRULE.put("02", "Parcial");
        hmDescCRULE.put("03", "Ya usado");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        long QTKT = 0, QLINK = 0, QCARD = 0, QNOT = 0, QNMATCH = 0;
        double AUTAMOUNT = 0, VFOP = 0, ANOT = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04266(?,?,?,?,?,?,?,?)}";
        System.out.println("Ejecutando ----> " + SQLCLL01);
        System.out.println(filter.page.PAGNUM);
        System.out.println(filter.page.PAGROW);
        System.out.println(filter.page.TOTPAG);
        System.out.println(filter.page.TOTROW);
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            while (rs01.next()) {

                objRtn = new A2331Filter();
                objRtn.IN_DATE = filter.IN_DATE;
                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;

                objRtn.DATE = rs01.getString(filter.IN_DATE.trim()).trim();
                objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                objRtn.AGENTE = rs01.getString("AGENTE").trim();
                objRtn.IATADATE = rs01.getString("IATADATE").trim();
                objRtn.LINKDATE = rs01.getString("LINKDATE").trim();
                objRtn.LINKHORA = rs01.getString("LINKHORA").trim();
                objRtn.DATES = rs01.getString("DATES").trim();
                objRtn.DATEN = rs01.getString("DATEN").trim();
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.FORMA = rs01.getString("FORMA").trim();
                objRtn.SERIE = rs01.getString("SERIE").trim();
                objRtn.TICKET = objRtn.CCIA + objRtn.FORMA + objRtn.SERIE;
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.strDescStatus = hmDescSTVAL.get(objRtn.STVAL).toString();
                //								

                objRtn.INDCPN = rs01.getString("INDCPN").trim();
                objRtn.STUSO = rs01.getString("STUSO").trim();
                objRtn.INDCPNS = rs01.getString("INDCPNS").trim();
                objRtn.DATSABF = rs01.getString("DATSABF").trim();
                objRtn.INDCPNSL = rs01.getString("INDCPNSL").trim();
                objRtn.STUSOS = rs01.getString("STUSOS").trim();
                objRtn.DATSABL = rs01.getString("DATSABL").trim();
                objRtn.FSELEC = rs01.getString("FSELEC").trim();
                objRtn.FECSELEC = rs01.getString("FECSELEC").trim();
                objRtn.FVCTO = rs01.getString("FVCTO").trim();
                objRtn.FCONT = rs01.getString("FCONT").trim();
                objRtn.IDCON = rs01.getString("IDCON").trim();
                objRtn.CRULE = rs01.getString("CRULE").trim();
                if (hmDescCRULE.containsKey(objRtn.CRULE)) {
                    objRtn.strDescCRULE = hmDescCRULE.get(objRtn.CRULE).toString();
                } else {
                    objRtn.strDescCRULE = objRtn.CRULE;
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

    public List<A3676Filter> loadPX573SQP04276(A3676Filter filter) throws SQLException, Exception {

        List<A3676Filter> list = new ArrayList<A3676Filter>();
        A3676Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");
        hmDescSTVAL.put("6", "Reverse Chargeback");

        HashMap hmDescCRULE = new HashMap();
        hmDescCRULE.put("", "");
        hmDescCRULE.put("01", "Total");
        hmDescCRULE.put("02", "Parcial");
        hmDescCRULE.put("03", "Ya usado");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04276(?,?,?,?,?,?,?)}";
        System.out.println("Ejecutando ----> " + SQLCLL01);
        System.out.println(filter.page.PAGNUM);
        System.out.println(filter.page.PAGROW);
        System.out.println(filter.page.TOTPAG);
        System.out.println(filter.page.TOTROW);
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM.trim());
            cstmt.setString(3, filter.IN_DATETO.trim());
            cstmt.setInt(4, filter.page.PAGNUM);
            cstmt.setInt(5, filter.page.PAGROW);
            cstmt.setInt(6, filter.page.TOTPAG);
            cstmt.setInt(7, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(4);
            filter.page.PAGROW = cstmt.getInt(5);
            filter.page.TOTPAG = cstmt.getInt(6);
            filter.page.TOTROW = cstmt.getInt(7);

            while (rs01.next()) {

                objRtn = new A3676Filter();
                objRtn.IN_DATEFROM = filter.IN_DATEFROM;
                objRtn.IN_DATETO = filter.IN_DATETO;               
                
                objRtn.A3676FRECE = rs01.getString("A3676FRECE").trim();
                objRtn.A3676CIA = rs01.getString("A3676CIA").trim();
                objRtn.A3676FORMA = rs01.getString("A3676FORMA").trim();
                objRtn.A3676SERIE = rs01.getString("A3676SERIE").trim();
                objRtn.TICKET = objRtn.A3676CIA + objRtn.A3676FORMA + objRtn.A3676SERIE;
                objRtn.A3676CUPON = rs01.getString("A3676CUPON").trim();
                objRtn.A3676SEQ = rs01.getString("A3676SEQ").trim();
                objRtn.A3676STCON = rs01.getString("A3676STCON").trim();
                objRtn.A3676STROB = rs01.getString("A3676STROB").trim();
                objRtn.A3676CUR = rs01.getString("A3676CUR").trim();
                objRtn.A3676MONTO = rs01.getDouble("A3676MONTO");
                objRtn.A3676CPNRB = rs01.getString("A3676CPNRB").trim();
                objRtn.A3676CURRB = rs01.getString("A3676CURRB").trim();
                objRtn.A3676MONRB = rs01.getDouble("A3676MONRB");
                objRtn.A3676STINI = rs01.getString("A3676STINI").trim();
                objRtn.A3676STFIN = rs01.getString("A3676STINI").trim();
                objRtn.A3676DESCR = rs01.getString("A3676DESCR").trim();
                objRtn.A3676RESUL = rs01.getString("A3676RESUL").trim();
                objRtn.A3676REFER = rs01.getString("A3676REFER").trim();
                objRtn.A3676REFRB = rs01.getString("A3676REFRB").trim();

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
