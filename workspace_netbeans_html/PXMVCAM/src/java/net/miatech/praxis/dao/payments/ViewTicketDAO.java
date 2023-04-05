/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import com.ibm.as400.access.AS400DataType;
import com.ibm.as400.access.AS400Message;
import com.ibm.as400.access.AS400Structure;
import com.ibm.as400.access.ProgramCall;
import com.ibm.as400.access.ProgramParameter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.App;
import net.miatech.utils.AS400Map;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ViewTicketDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ViewTicketDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ViewTicketDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2290Filter> load(A2290Filter filter) throws SQLException, Exception {
        List<A2290Filter> lstRtn = new ArrayList<A2290Filter>(0);
        A2290Filter objRtn;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales without Reconcili.");
        hmDescEstados.put("3", "Reconcili. without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");

        HashMap<String, String> hmDescDocument = new HashMap<String, String>();
        hmDescDocument.put("S", "Sales");
        hmDescDocument.put("R", "Refund");

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP04906(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TICKET);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2290Filter();
                objRtn.TICKET = rs01.getString("CCIA").trim() + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim();
                objRtn.SAGENT = rs01.getString("SAGENT").trim() + " - " + rs01.getString("DESC_SAGENT").trim();
                objRtn.MERCHN = rs01.getString("MERCHN").trim();
                objRtn.SDATE = rs01.getString("SDATE").trim();
                //objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.SCOUNTRY = rs01.getString("DESC_SCOUNTRY").trim();
                objRtn.SPNR = rs01.getString("SPNR").trim();
                
                if (hmDescDocument.containsKey(rs01.getString("TDOC").trim().toUpperCase())) {
                    objRtn.TDOC = hmDescDocument.get(rs01.getString("TDOC").trim()).toString();
                } else {
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                }
                
                //EMD CODE
                //EMD SUB CODE

                //Account STATUS
                //Account Date
                //Account ID
                objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                objRtn.SDATEXP = rs01.getString("SDATEXP").trim();

                objRtn.INSTPAY = rs01.getString("INSTPAY").trim();
                objRtn.INSTPLA = rs01.getString("INSTPLA").trim();

                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.SVFOP = rs01.getDouble("SVFOP");

                objRtn.AFARE = rs01.getDouble("AFARE");
                objRtn.ATAX = rs01.getDouble("ATAX");
                objRtn.AIVA = rs01.getDouble("AIVA");
                objRtn.TOTAL = rs01.getDouble("TOTAL");

                if (hmDescEstados.containsKey(rs01.getString("STVAL").trim().toUpperCase())) {
                    objRtn.STVAL = hmDescEstados.get(rs01.getString("STVAL").trim()).toString();
                } else {
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                }
                
                objRtn.DATEC = rs01.getString("DATEC").trim();
                //VOID
                //REVERSE POLICY
                //REVERSE ADM
                //ADM

                objRtn.USCR = rs01.getString("USCR").trim();
                objRtn.FECR = rs01.getString("FECR").trim();
                objRtn.HOCR = rs01.getString("HOCR").trim();
                objRtn.PGMCR = rs01.getString("PGMCR").trim();
                objRtn.USUP = rs01.getString("USUP").trim();
                objRtn.FEUP = rs01.getString("FEUP").trim();
                objRtn.HOUP = rs01.getString("HOUP").trim();
                objRtn.PGMUP = rs01.getString("PGMUP").trim();

                lstRtn.add(objRtn);
            }
            rs01.close();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

}
