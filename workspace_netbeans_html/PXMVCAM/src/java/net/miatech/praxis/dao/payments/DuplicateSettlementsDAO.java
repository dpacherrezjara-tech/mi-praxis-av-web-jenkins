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
import net.miatech.praxis.payment.MPF060Filter;
import net.miatech.praxis.payment.MPF060;
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

    public List<MPF060> loadMPS370(MPF060Filter filter) throws SQLException, Exception {

        List<MPF060> lstTkts = new ArrayList<MPF060>(0);
        MPF060 beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS370(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, filter.IN_FECHA_FROM);
            cstmt.setString(2, filter.IN_FECHA_TO);
            cstmt.setString(3, filter.IN_CCUST);
            cstmt.setString(4, filter.IN_PROCESSOR);
            cstmt.setString(5, filter.IN_STATUS);
            cstmt.setString(6, filter.IN_COUNTRY);
            cstmt.setString(7, filter.IN_NEGOC);
            cstmt.setString(8, filter.IN_CODEBANK);
            cstmt.setString(9, filter.IN_SEQ);
            cstmt.setString(10, filter.IN_SCARCOD);
            cstmt.setString(11, filter.IN_FASE2);
            cstmt.setString(12, filter.IN_SECUENCE);
            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rst = cstmt.getResultSet();
            while (rst.next()) {

                beanTkt = new MPF060();
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
                beanTkt.FSELEC = rst.getString("FSELEC").trim();
                beanTkt.checkActive = false;
                
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
    
    public String loadMPS371_MPS372(List<MPF060> lstLIQ, MPF060Filter filter) throws Exception {
        String strMsj = "Proceso Culminado";

        // Verifica si es masivo
        if ("Y".equals(filter.IN_MASSIVE.trim())) {
            String SQL_MASSIVE = "{CALL PRAXISMP.MPS372(?,?,?,?,?,?,?,?,?,?)}";

            try (Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                 CallableStatement cstmt = cnx.prepareCall(SQL_MASSIVE)) {
                cstmt.setString(1, filter.IN_FECHA_FROM.trim());
                cstmt.setString(2, filter.IN_FECHA_TO.trim());
                cstmt.setString(3, filter.IN_CCUST.trim());
                cstmt.setString(4, filter.IN_PROCESSOR.trim());
                cstmt.setString(5, filter.IN_STATUS.trim());
                cstmt.setString(6, filter.IN_COUNTRY.trim());
                cstmt.setString(7, filter.IN_NEGOC.trim());
                cstmt.setString(8, filter.IN_CODEBANK.trim());
                cstmt.setString(9, filter.IN_SEQ.trim());
                cstmt.setString(10, filter.IN_SCARCOD.trim());
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

                for (MPF060 obj : lstLIQ) {
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
    
    public List<MPF060> loadMPS439(MPF060Filter filter) throws SQLException, Exception {

        List<MPF060> lstTkts = new ArrayList<MPF060>(0);
        MPF060 beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS439(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, filter.IN_FECHA_FROM);
            cstmt.setString(2, filter.IN_FECHA_TO);
            cstmt.setString(3, filter.IN_CCUST);
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

                beanTkt = new MPF060();
                beanTkt.CCUST = rst.getString("CCUST").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                beanTkt.USUP = rst.getString("USUP").trim();
                beanTkt.FEUP = rst.getString("FEUP").trim();
                beanTkt.HOUP = rst.getString("HOUP").trim();
                beanTkt.PGMUP = rst.getString("PGMUP").trim();
                beanTkt.ADATE = rst.getString("ADATE").trim();
                beanTkt.QTY = rst.getInt("QTY");
               
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
    
    public List<MPF060> loadMPS373(MPF060Filter filter) throws SQLException, Exception {

        List<MPF060> lstTkts = new ArrayList<MPF060>(0);
        MPF060 beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS373(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_USUP);
            cstmt.setString(3, filter.IN_FEUP);
            cstmt.setString(4, filter.IN_HOUP);
            cstmt.setString(5, filter.IN_PGMUP);
            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rst = cstmt.getResultSet();
            while (rst.next()) {

                beanTkt = new MPF060();
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
                
                beanTkt.USUP = rst.getString("USUP").trim();
                beanTkt.FEUP = rst.getString("FEUP").trim();
                beanTkt.HOUP = rst.getString("HOUP").trim();
                beanTkt.PGMUP = rst.getString("PGMUP").trim();
                
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
    
    public String loadMPS374_MPS375(List<MPF060> lstLIQ, MPF060Filter filter) throws Exception {
        String strMsj = "Proceso Culminado";

        // Verifica si es masivo
        if ("Y".equals(filter.IN_MASSIVE.trim())) {
            String SQL_MASSIVE = "{CALL PRAXISMP.MPS374(?,?,?,?)}";

            try (Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                 CallableStatement cstmt = cnx.prepareCall(SQL_MASSIVE)) {

                cstmt.setString(1, filter.IN_USUP.trim());
                cstmt.setString(2, filter.IN_FEUP.trim());
                cstmt.setString(3, filter.IN_HOUP.trim());
                cstmt.setString(4, filter.IN_PGMUP.trim());
                cstmt.execute();

            } catch (SQLException e) {
                logError.error("Error ejecutando MPS374 para usuario " +
                    session.getUserView().getUserInfo().USR + " -> " + e.getMessage(), e);
                strMsj = e.getMessage();
            }

        } else {
            String SQL_DETAIL = "{CALL PRAXISMP.MPS375(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            try (Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                 CallableStatement cstmt = cnx.prepareCall(SQL_DETAIL)) {

                for (MPF060 obj : lstLIQ) {
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
                    cstmt.setString(11, obj.USUP.trim());
                    cstmt.setString(12, obj.FEUP.trim());
                    cstmt.setString(13, obj.HOUP.trim());
                    cstmt.setString(14, obj.PGMUP.trim());

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
