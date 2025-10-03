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

public class DuplicateSettlementsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public DuplicateSettlementsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DuplicateSettlementsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2358Filter> loadPX602SQP04601(A2358Filter filter) throws SQLException, Exception {

        List<A2358Filter> lstTkts = new ArrayList<A2358Filter>(0);
        A2358Filter beanTkt;

        double totQTYREG = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS370(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_CODEBANK);
            cstmt.setString(5, filter.IN_NEGOC);
            cstmt.setString(6, filter.IN_SCARCOD);
            cstmt.setString(7, filter.IN_STATUS);
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

                beanTkt = new A2358Filter();
                beanTkt.CCUST = rst.getString("CCUST").trim();
                beanTkt.ADATE = rst.getString("ADATE").trim();
                beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.MERCHAND = rst.getString("MERCHAND").trim();
                beanTkt.RED = rst.getString("RED").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.NEGOC = rst.getString("NEGOC").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.FECR = rst.getString("FECR").trim();
                beanTkt.HOCR = rst.getString("HOCR").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.TERMI = rst.getString("TERMI").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                
                beanTkt.TOTAL = rst.getDouble("TOTAL");
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.COMISION = rst.getDouble("COMISION");
                beanTkt.NETO = rst.getDouble("NETO");
               
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
    
    public String loadPX287MPS106(List<A2358> lstLIQ, A2358 filter) throws Exception {
        String strMsj = "Proceso Culminado";

        // Verifica si es masivo
        if ("Y".equals(filter.IN_MASSIVE.trim())) {
            String SQL_MASSIVE = "{CALL PRAXISMP.MPS372(?,?,?,?,?,?)}";

            try (Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                 CallableStatement cstmt = cnx.prepareCall(SQL_MASSIVE)) {

                cstmt.setString(1, filter.IN_CCUST.trim());
                cstmt.setString(2, filter.IN_FECHA_FROM.trim());
                cstmt.setString(3, filter.IN_FECHA_TO.trim());
                cstmt.setString(4, filter.IN_CODEBANK.trim());
                cstmt.setString(5, filter.IN_NEGOC.trim());
                cstmt.setString(6, filter.IN_SCARCOD.trim());

                cstmt.execute();

            } catch (SQLException e) {
                logError.error("Error ejecutando MPS372 para usuario " +
                    session.getUserView().getUserInfo().USR + " -> " + e.getMessage(), e);
                strMsj = e.getMessage();
            }

        } else {
            String SQL_DETAIL = "{CALL PRAXISMP.MPS371(?,?,?,?,?,?,?,?,?,?)}";

            try (Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                 CallableStatement cstmt = cnx.prepareCall(SQL_DETAIL)) {

                for (A2358 obj : lstLIQ) {
                    cstmt.setString(1, obj.CCUST.trim());
                    cstmt.setString(2, obj.SDATE.trim());
                    cstmt.setString(3, obj.SCOUNTRY.trim());
                    cstmt.setString(4, obj.TDOC.trim());
                    cstmt.setString(5, obj.CODEBANK.trim());
                    cstmt.setString(6, obj.SCARCOD.trim());
                    cstmt.setString(7, obj.SCARDN.trim());
                    cstmt.setString(8, obj.SAUTHOC.trim());
                    cstmt.setString(9, obj.SEQ.trim());
                    cstmt.setDouble(10, obj.SVFOP);

                    cstmt.execute();
                }

            } catch (SQLException e) {
                logError.error("Error ejecutando MPS371 para usuario " +
                    session.getUserView().getUserInfo().USR + " -> " + e.getMessage(), e);
                strMsj = e.getMessage();
            }
        }

        pasarGarbageCollector();
        return strMsj;
    }

    public List<A2358Filter> loadPX602SQP04601Delete(A2358Filter filter) throws SQLException, Exception {

        List<A2358Filter> lstTkts = new ArrayList<A2358Filter>(0);
        A2358Filter beanTkt;

        double totQTYREG = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS373(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_CODEBANK);
            cstmt.setString(5, filter.IN_NEGOC);
            cstmt.setString(6, filter.IN_SCARCOD);
            cstmt.setString(7, filter.IN_STATUS);
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

                beanTkt = new A2358Filter();
                beanTkt.CCUST = rst.getString("CCUST").trim();
                beanTkt.ADATE = rst.getString("ADATE").trim();
                beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.MERCHAND = rst.getString("MERCHAND").trim();
                beanTkt.RED = rst.getString("RED").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.NEGOC = rst.getString("NEGOC").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.ACCNUMBER = rst.getString("ACCNUMBER").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                beanTkt.FECR = rst.getString("FECR").trim();
                beanTkt.HOCR = rst.getString("HOCR").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.TERMI = rst.getString("TERMI").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SEQ = rst.getString("SEQ").trim();
                
                beanTkt.TOTAL = rst.getDouble("TOTAL");
                beanTkt.SVFOP = rst.getDouble("SVFOP");
                beanTkt.COMISION = rst.getDouble("COMISION");
                beanTkt.NETO = rst.getDouble("NETO");
               
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
    
    public String loadPX287MPS106Reverse(List<A2358> lstLIQ, A2358 filter) throws Exception {
        String strMsj = "Proceso Culminado";

        // Verifica si es masivo
        if ("Y".equals(filter.IN_MASSIVE.trim())) {
            String SQL_MASSIVE = "{CALL PRAXISMP.MPS374(?,?,?,?,?,?)}";

            try (Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                 CallableStatement cstmt = cnx.prepareCall(SQL_MASSIVE)) {

                cstmt.setString(1, filter.IN_CCUST.trim());
                cstmt.setString(2, filter.IN_FECHA_FROM.trim());
                cstmt.setString(3, filter.IN_FECHA_TO.trim());
                cstmt.setString(4, filter.IN_CODEBANK.trim());
                cstmt.setString(5, filter.IN_NEGOC.trim());
                cstmt.setString(6, filter.IN_SCARCOD.trim());

                cstmt.execute();

            } catch (SQLException e) {
                logError.error("Error ejecutando MPS374 para usuario " +
                    session.getUserView().getUserInfo().USR + " -> " + e.getMessage(), e);
                strMsj = e.getMessage();
            }

        } else {
            String SQL_DETAIL = "{CALL PRAXISMP.MPS375(?,?,?,?,?,?,?,?,?,?)}";

            try (Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                 CallableStatement cstmt = cnx.prepareCall(SQL_DETAIL)) {

                for (A2358 obj : lstLIQ) {
                    cstmt.setString(1, obj.CCUST.trim());
                    cstmt.setString(2, obj.SDATE.trim());
                    cstmt.setString(3, obj.SCOUNTRY.trim());
                    cstmt.setString(4, obj.TDOC.trim());
                    cstmt.setString(5, obj.CODEBANK.trim());
                    cstmt.setString(6, obj.SCARCOD.trim());
                    cstmt.setString(7, obj.SCARDN.trim());
                    cstmt.setString(8, obj.SAUTHOC.trim());
                    cstmt.setString(9, obj.SEQ.trim());
                    cstmt.setDouble(10, obj.SVFOP);

                    cstmt.execute();
                }

            } catch (SQLException e) {
                logError.error("Error ejecutando MPS375 para usuario " +
                    session.getUserView().getUserInfo().USR + " -> " + e.getMessage(), e);
                strMsj = e.getMessage();
            }
        }

        pasarGarbageCollector();
        return strMsj;
    }
}
