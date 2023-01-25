package net.miatech.praxis.dao.payments;

import net.miatech.praxis.dao.interline.*;
import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.praxis.payment.filter.A2358Filter;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.payment.A2358;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class InputsCatalogDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InputsCatalogDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InputsCatalogDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2358Filter> loadPX602SQP04601(A2358Filter filter) throws SQLException, Exception {

        List<A2358Filter> lstTkts = new ArrayList<A2358Filter>(0);
        A2358Filter beanTkt;

        HashMap<String, String> hmDescINPEXTE = new HashMap<String, String>();
        hmDescINPEXTE.put("", "");
        hmDescINPEXTE.put(".txt", ".TXT");
        hmDescINPEXTE.put(".TXT", ".TXT");
        hmDescINPEXTE.put(".DAT", ".DAT");
        hmDescINPEXTE.put(".CSV", ".CSV");
        hmDescINPEXTE.put(".cmp", ".CMP");

        HashMap<String, String> hmDescINPTYPE = new HashMap<String, String>();
        hmDescINPTYPE.put("", "");
        hmDescINPTYPE.put("D", "DATA");
        hmDescINPTYPE.put("C", "CONTROL");
        hmDescINPTYPE.put("M", "MISCELLANEOUS");

        HashMap<String, String> hmDescSTAT = new HashMap<String, String>();
        hmDescSTAT.put("", "");
        hmDescSTAT.put("A", "ACTIVE");
        hmDescSTAT.put("I", "INACTIVE");

        HashMap<String, String> hmDescFASE = new HashMap<String, String>();
        hmDescFASE.put("", "");
        hmDescFASE.put("0", "FASE 0");
        hmDescFASE.put("1", "FASE I");
        hmDescFASE.put("2", "FASE II");
        hmDescFASE.put("3", "FASE III");
        hmDescFASE.put("4", "FASE VI");

        double totQTYREG = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04601(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.STAT);
            cstmt.setString(3, filter.FASE);
            cstmt.setString(4, filter.INPTYPE);
            cstmt.setString(5, filter.INPEXTE);
            cstmt.setString(6, filter.INPNAME);
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

                beanTkt = new A2358Filter();
                beanTkt.APLIC = rst.getString("APLIC").trim();
                beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                beanTkt.DENV = rst.getString("DENV").trim();
                beanTkt.NETDIR = rst.getString("NETDIR").trim();
                beanTkt.INPNAME = rst.getString("INPNAME").trim();
                if (hmDescINPEXTE.containsKey(rst.getString("INPEXTE").trim())) {
                    beanTkt.descINPEXTE = hmDescINPEXTE.get(rst.getString("INPEXTE").trim()).toString();
                } else {
                    beanTkt.descINPEXTE = rst.getString("INPEXTE").trim();
                }
                if (hmDescINPTYPE.containsKey(rst.getString("INPTYPE").trim())) {
                    beanTkt.descINPTYPE = hmDescINPTYPE.get(rst.getString("INPTYPE").trim()).toString();
                } else {
                    beanTkt.descINPTYPE = rst.getString("INPTYPE").trim();
                }
                if (hmDescSTAT.containsKey(rst.getString("STAT").trim())) {
                    beanTkt.descSTAT = hmDescSTAT.get(rst.getString("STAT").trim()).toString();
                } else {
                    beanTkt.descSTAT = rst.getString("STAT").trim();
                }
                if (hmDescFASE.containsKey(rst.getString("FASE").trim())) {
                    beanTkt.descFASE = hmDescFASE.get(rst.getString("FASE").trim()).toString();
                } else {
                    beanTkt.descFASE = rst.getString("FASE").trim();
                }
                beanTkt.INPDESC = rst.getString("INPDESC").trim();
                beanTkt.LIBNAME = rst.getString("LIBNAME").trim();
                beanTkt.OUTNAME = rst.getString("OUTNAME").trim();
                beanTkt.FECPROC = rst.getString("FECPROC").trim();
                beanTkt.TABLA = rst.getString("TABLA").trim();
                beanTkt.QTYREG = rst.getInt("QTYREG");

                //TOTALEs
                // beanTkt.totQTYREG = totQTYREG;
//                    
//                    if (beanTkt.CERROR.equals("")) {
//                        beanTkt.desCERROR = "Conciliate";
//                    } else {
//                        beanTkt.desCERROR = "Difference";
//                    }
                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public A2358Filter loadPX602SQP04602(A2358Filter filter) throws SQLException, Exception {

        A2358Filter objRtn = new A2358Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04602(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.APLIC.trim());
            cstmt01.setString(3, filter.INPNAME.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.APLIC = rs01.getString("APLIC").trim();
                objRtn.SEQNUM = rs01.getString("SEQNUM").trim();
                objRtn.DENV = rs01.getString("DENV").trim();
                objRtn.NETDIR = rs01.getString("NETDIR").trim();
                objRtn.INPNAME = rs01.getString("INPNAME").trim();
                objRtn.INPEXTE = rs01.getString("INPEXTE").trim();
                objRtn.INPTYPE = rs01.getString("INPTYPE").trim();
                objRtn.STAT = rs01.getString("STAT").trim();
                objRtn.FASE = rs01.getString("FASE").trim();
                objRtn.INPDESC = rs01.getString("INPDESC").trim();
                objRtn.LIBNAME = rs01.getString("LIBNAME").trim();
                objRtn.OUTNAME = rs01.getString("OUTNAME").trim();
                objRtn.FECPROC = rs01.getString("FECPROC").trim();
                objRtn.TABLA = rs01.getString("TABLA").trim();
                objRtn.QTYREG = rs01.getInt("QTYREG");

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

    public String loadPX602SQP04603(A2358 filter, String option) throws SQLException, Exception {
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04603(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.APLIC.trim());
            cstmt.setString(4, filter.SEQNUM.trim());
            cstmt.setString(5, filter.DENV.trim());
            cstmt.setString(6, filter.NETDIR.trim());
            cstmt.setString(7, filter.INPNAME.trim());
            cstmt.setString(8, filter.INPEXTE.trim());
            cstmt.setString(9, filter.INPTYPE.trim());
            cstmt.setString(10, filter.STAT.trim());
            cstmt.setString(11, filter.FASE.trim());
            cstmt.setString(12, filter.INPDESC.trim());
            cstmt.setString(13, filter.LIBNAME.trim());
            cstmt.setString(14, filter.OUTNAME.trim());
            cstmt.setString(15, filter.FECPROC.trim());
            cstmt.setString(16, filter.TABLA.trim());
            cstmt.setDouble(17,  filter.QTYREG);
            cstmt.setString(18, session.getUserView().getUserInfo().USR);
            cstmt.setString(19, Functions.getFechaActual());
            cstmt.setString(20, Functions.getHoraActual());
            


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

        return strMsj;

    }
}
