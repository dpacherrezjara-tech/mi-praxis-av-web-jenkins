package net.miatech.praxis.dao.payments;

//<editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.filter.A2289Filter;
import org.apache.log4j.Logger;
import net.miatech.utils.Functions;

//</editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadPaymentDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2289Filter> loadSQP00885(A2289Filter filter) throws SQLException, Exception {
        List<A2289Filter> list = new ArrayList<A2289Filter>();
        A2289Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        double dblAmountS = 0, dblAmountA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00885(?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.IN_CIA.trim());
            cstmt.setString(6, filter.IN_FORMA.trim());
            cstmt.setString(7, filter.IN_SERIA.trim());

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                dblAmountS = rs01.getDouble("SVFOP");
                // dblAmountA = rs01.getDouble("AVFOP");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A2289Filter();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM;
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO;
                    objRtn.FECR = rs01.getString("FECR").trim();
                    objRtn.HOCR = rs01.getString("HOCR").trim();
                    objRtn.USCR = rs01.getString("USCR").trim();
                    objRtn.strACARCOD = rs01.getString("DES_ACARCOD").trim();
                    objRtn.strSCARCOD = rs01.getString("DES_SCARCOD").trim();
                    objRtn.CERROR = rs01.getString("CERROR").trim();
                    objRtn.A1531CAPL = rs01.getString("DES_ERROR").trim();
                    objRtn.strFecha = Functions.ConvertedTime(objRtn.HOCR);
                    //  objRtn.SEQ = rs01.getString("SEQ").trim();
                    objRtn.SDATEXP = Functions.FormatFecha(rs01.getString("SDATEXP").trim(), "MMyy", "yyyyMM");
                    objRtn.strFecha2 = Functions.getMonthConvert(objRtn.FECR);
                    objRtn.IN_TKT = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + " " + rs01.getString("SERIE").trim() + " " + rs01.getString("SEQ").trim();
                    //objRtn.TDOC = rs01.getString("TDOC").trim();
                    if (rs01.getString("TDOC").trim().equals("R")) {
                        objRtn.strDescrip = "RFND";
                    } else {
                        objRtn.strDescrip = "SALES";
                    }

                    objRtn.FTE = rs01.getString("FTE").trim();
                    // objRtn.SPAYMENT = rs01.getString("SPAYMENT").trim();
                    if (rs01.getString("SPAYMENT").trim().equals("CA")) {
                        objRtn.strDescrip2 = "CASH";
                    } else {
                        objRtn.strDescrip2 = "CREDIT CARD";
                    }
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    objRtn.SCARDN = rs01.getString("SCARDN").trim();
                    objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                    objRtn.SPNR = rs01.getString("SPNR").trim();
                    objRtn.SPNRSP = rs01.getString("SPNRSP").trim();
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    //  objRtn.STVAL = rs01.getString("STVAL").trim();
                    if (rs01.getString("STVAL").trim().equals("1")) {
                        objRtn.strDescrip3 = "MATCH";
                    } else if (rs01.getString("STVAL").trim().equals("2")) {
                        if (rs01.getString("TDOC").trim().equals("R")) {
                            objRtn.strDescrip3 = "Refund Without ACCB";
                        } else {
                            objRtn.strDescrip3 = "Sales Without ACCB";
                        }
                    } else if (rs01.getString("STVAL").trim().equals("3")) {
                        if (rs01.getString("TDOC").trim().equals("R")) {
                            objRtn.strDescrip3 = "ACCB  Without Refund";
                        } else {
                            objRtn.strDescrip3 = "ACCB  Without Sales";
                        }
                    } else if (rs01.getString("STVAL").trim().equals("4")) {
                        objRtn.strDescrip3 = "MATCH Diference";
                    } else if (rs01.getString("STVAL").trim().equals("5")) {
                        objRtn.strDescrip3 = "MATCH MANUAL";
                    } else if (rs01.getString("STVAL").trim().equals("6")) {
                        objRtn.strDescrip3 = "CLARIFICATIONS";
                    } else if (rs01.getString("STVAL").trim().equals("7")) {
                        objRtn.strDescrip3 = "BANK NOTICE";
                    }

                    objRtn.CPROGRAM = rs01.getString("CPROGRAM").trim();
                    objRtn.ACARCOD = rs01.getString("ACARCOD").trim();
                    objRtn.AVFOP = rs01.getDouble("AVFOP");
                    objRtn.ACURRENCY = rs01.getString("ACURRENCY").trim();
                    objRtn.ACARDN = rs01.getString("ACARDN").trim();
                    //objRtn.ADATEXP = Functions.FormatFecha(rs01.getString("ADATEXP").trim(), "MMyy", "yyyyMM");
                    objRtn.AAUTHOC = rs01.getString("AAUTHOC").trim();
                    objRtn.AINVN = rs01.getString("AINVN").trim();
                    objRtn.AIDATE = Functions.getMonthConvert(rs01.getString("AIDATE").trim());
                    objRtn.APNRSP = rs01.getString("APNRSP");
                    objRtn.APNR = rs01.getString("APNR").trim();
                    objRtn.MERCHN = rs01.getString("MERCHN");
                    objRtn.MENSA = rs01.getString("MENSA").trim();

                    objRtn.totSVFOP = dblAmountS;
                    // objRtn.totAVFOP = dblAmountA;

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
    
    public List<A2289Filter> loadSQP00888(A2289Filter filter) throws SQLException, Exception {
        List<A2289Filter> list = new ArrayList<A2289Filter>();
        A2289Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00888(?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_CIA.trim());
            cstmt01.setString(3, filter.IN_FORMA.trim());
            cstmt01.setString(4, filter.IN_SERIA.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A2289Filter();
                objRtn.A1531CFOP = rs01.getString("A1531CFOP");//cc
                objRtn.A1531TFOP = rs01.getString("A1531TFOP");//cc
                objRtn.A1531TTARJ = rs01.getString("A1531TTARJ");//ba
                objRtn.A1531VFOP = rs01.getDouble("A1531VFOP");
                objRtn.A1531MFOP = rs01.getString("A1531MFOP");//ars
                objRtn.A1531NREF = rs01.getString("A1531NREF");
                objRtn.A1531CAPL = rs01.getString("A1531CAPL");
                objRtn.A1531CORRL = rs01.getString("A1531CORRL");

                list.add(objRtn);
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt01.close();
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

        return list;
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
