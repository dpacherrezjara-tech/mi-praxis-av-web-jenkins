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
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2295Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author 
 */
public class ChargebackDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ChargebackDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ChargebackDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2295Filter> loadPX290SQP00852(A2295Filter filter) throws SQLException, Exception {
        List<A2295Filter> list = new ArrayList<A2295Filter>();
        A2295Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblAUTAMOUNT = 0, dblOPEAMOUNT = 0, dblIVA = 0;
        int intQTYTRNX = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00852(?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_MERCHN.trim());
            cstmt.setString(7, filter.IN_FTE.trim());
            cstmt.setString(8, filter.IN_STATT.trim());

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
//                dblAUTAMOUNT = rs01.getDouble("AUTAMOUNT");
//                dblOPEAMOUNT = rs01.getDouble("OPEAMOUNT");
//                dblIVA = rs01.getDouble("IVA");
//                intQTYTRNX = rs01.getInt("QTYTRNX");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {

                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2295Filter();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO;

                    objRtn.CHARNBR = rs01.getString("CHARNBR").trim();
                    objRtn.CHGDATE = rs01.getString("CHGDATE").trim();
                    objRtn.CHGAMOUNT = rs01.getString("CHGAMOUNT").trim();
                    objRtn.CHGCURREN = rs01.getString("CHGCURREN").trim();
                    objRtn.CARDTYPE = rs01.getString("CARDTYPE").trim();
                    objRtn.SCARDN = rs01.getString("SCARDN").trim();
                    objRtn.SCARDNCOR = rs01.getString("SCARDNCOR").trim();
                    objRtn.TKTNUMER = rs01.getString("TKTNUMER").trim();
                    objRtn.PRDA = rs01.getString("PRDA").trim();
                    objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                    objRtn.ADATE = rs01.getString("ADATE").trim();
                    objRtn.SDATE = rs01.getString("SDATE").trim();
                    objRtn.SAGENT = rs01.getString("SAGENT").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.PROCESA = rs01.getString("PROCESA").trim();
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.ACCNUMBER = rs01.getString("ACCNUMBER").trim();
                    objRtn.CODEBANK = rs01.getString("SAUTHOC").trim();                  
                    objRtn.SOCIETY = rs01.getString("SOCIETY").trim();
                    objRtn.SOCIETYL = rs01.getString("SOCIETYL").trim();
                    objRtn.CANAL = rs01.getString("CANAL").trim();
                    objRtn.COREP = rs01.getString("COREP").trim();
                    objRtn.SEQ = rs01.getString("SEQ").trim();
                    objRtn.COMPANYID = rs01.getString("COMPANYID").trim();
                    objRtn.ARN = rs01.getString("ARN").trim();


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
    
    public A2295Filter loadPX290SQP00854(A2295Filter filter) throws SQLException, Exception {

        A2295Filter objRtn = new A2295Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00852(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CHGDATE.trim());
            cstmt01.setString(3, filter.CHARNBR);
            cstmt01.setString(4, filter.SCOUNTRY.trim());
            cstmt01.setString(5, filter.COMPANYID.trim());
            cstmt01.setString(6, filter.SCARDN.trim());
            cstmt01.setString(7, filter.SAUTHOC.trim());
            cstmt01.setString(8, filter.ARN.trim());
            cstmt01.setString(9, filter.TKTNUMER.trim());
            cstmt01.setString(10, filter.SEQ.trim());
              

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                    objRtn.CCUST = rs01.getString("CCUST");
                    objRtn.CHARNBR = rs01.getString("CHARNBR").trim();
                    objRtn.CHGDATE = rs01.getString("CHGDATE").trim();
                    objRtn.CHGAMOUNT = rs01.getString("CHGAMOUNT").trim();
                    objRtn.CHGCURREN = rs01.getString("CHGCURREN").trim();
                    objRtn.CARDTYPE = rs01.getString("CARDTYPE").trim();
                    objRtn.SCARDN = rs01.getString("SCARDN").trim();
                    objRtn.SCARDNCOR = rs01.getString("SCARDNCOR").trim();
                    objRtn.TKTNUMER = rs01.getString("TKTNUMER").trim();
                    objRtn.PRDA = rs01.getString("PRDA").trim();
                    objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                    objRtn.ADATE = rs01.getString("ADATE").trim();
                    objRtn.SDATE = rs01.getString("SDATE").trim();
                    objRtn.SAGENT = rs01.getString("SAGENT").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.PROCESA = rs01.getString("PROCESA").trim();
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.ACCNUMBER = rs01.getString("ACCNUMBER").trim();
                    objRtn.CODEBANK = rs01.getString("SAUTHOC").trim();                  
                    objRtn.SOCIETY = rs01.getString("SOCIETY").trim();
                    objRtn.SOCIETYL = rs01.getString("SOCIETYL").trim();
                    objRtn.CANAL = rs01.getString("CANAL").trim();
                    objRtn.COREP = rs01.getString("COREP").trim();
                    objRtn.SEQ = rs01.getString("SEQ").trim();
                    objRtn.COMPANYID = rs01.getString("COMPANYID").trim();
                    objRtn.ARN = rs01.getString("ARN").trim();
                
                
                    objRtn.USCR = rs01.getString("USCR");
                    objRtn.FECR = rs01.getString("FECR");
                    objRtn.HOCR = rs01.getString("HOCR");
                    objRtn.USUP = rs01.getString("USUP");
                    objRtn.FEUP = rs01.getString("FEUP");
                    objRtn.HOUP = rs01.getString("HOUP");

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
    
    public String loadPX290SQP00853(A2295Filter filter, String option) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary()
                + ".SQP00853(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.STATT.trim());
            cstmt.setString(4, filter.MERCHNREC);
            cstmt.setString(5, filter.MERCHNAM.trim());
            cstmt.setDouble(6, filter.AUTAMOUNT);
            cstmt.setDouble(7, filter.OPEAMOUNT);
            cstmt.setDouble(8, filter.IVA);
            cstmt.setString(9, filter.APLIDATE.trim());
            cstmt.setString(10, filter.NATURE.trim());
            cstmt.setString(11, filter.CONCEPT.trim());
            cstmt.setInt(12, filter.QTYTRNX);
            cstmt.setString(13, filter.REMESA.trim());
            cstmt.setString(14, filter.REMEDATE.trim());

            cstmt.setString(15, filter.REMETIPO.trim());
            cstmt.setString(16, filter.REMEFOLIO.trim());
            cstmt.setString(17, filter.CODEBANK.trim());
            cstmt.setString(18, filter.SCARCOD.trim());

            cstmt.setString(19, filter.CARDNBR.trim());
            cstmt.setString(20, filter.AUTHNBR.trim());
            
            cstmt.setString(21, filter.FSELEC.trim());
            cstmt.setString(22, filter.FECSELEC.trim());
            cstmt.setString(23, filter.SQCRFILE.trim());
            

            cstmt.setString(24, session.getUserView().getUserInfo().USR);
            cstmt.setString(25, Functions.getFechaActual());
            cstmt.setString(26, Functions.getHoraActual());
            cstmt.execute();

        } catch (Exception e) {
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

        return strMsj;
    }

}
