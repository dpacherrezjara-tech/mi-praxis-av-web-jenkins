/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX112S01A1728Filter;
import net.miatech.beans.PX112S01A1757Filter;
import net.miatech.beans.PX112S02A1757Filter;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00801Filter;
import net.miatech.beans.SQP00802Filter;
import net.miatech.beans.SQP00806Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class InvoiceCommissionFOBDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InvoiceCommissionFOBDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InvoiceCommissionFOBDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX112S01A1757Filter> loadPX112S01A1757(PX112S01A1757Filter filter) throws SQLException, Exception {
        List<PX112S01A1757Filter> lstRtn = new ArrayList<PX112S01A1757Filter>(0);
        PX112S01A1757Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX112S01A1757(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, filter.VP_A1757CCUST);
            cstmt01.setString(2, filter.VP_A1757IATA);
            cstmt01.setString(3, filter.VP_A1757LOTE);
            cstmt01.setString(4, filter.VP_A1757FFACT);
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX112S01A1757Filter();
                objRtn.A1757CCUST = rs01.getString("A1757CCUST");
                objRtn.A1757LOTE = rs01.getString("A1757LOTE");
                objRtn.A1757IATA = rs01.getString("A1757IATA");
                objRtn.A003KEY3 = rs01.getString("A003KEY3");
                objRtn.A1757NFACT = rs01.getString("A1757NFACT");
                objRtn.A1757FFACT = rs01.getString("A1757FFACT");
                objRtn.A1757COMM = rs01.getDouble("A1757COMM");
                objRtn.A1757IVA = rs01.getDouble("A1757IVA");
                objRtn.A1757COMIV = rs01.getDouble("A1757COMIV");
                objRtn.A1757TCASH = rs01.getDouble("A1757TCASH");
                objRtn.A1757CAMCO = rs01.getDouble("A1757CAMCO");
                objRtn.A1757MONED = rs01.getString("A1757MONED");
                objRtn.A1757SEQ = rs01.getString("A1757SEQ");
                objRtn.A1757REGIS = rs01.getString("A1757REGIS");
                objRtn.A1757FREGI = rs01.getString("A1757FREGI");
                objRtn.A1757HREGI = rs01.getString("A1757HREGI");
                objRtn.A1757REVIS = rs01.getString("A1757REVIS");
                objRtn.A1757FREVI = rs01.getString("A1757FREVI");
                objRtn.A1757HREVI = rs01.getString("A1757HREVI");
                objRtn.A1757INDAP = rs01.getString("A1757INDAP");
                // Total a1728 Pre-Factura
                objRtn.A1728TCAMC = rs01.getDouble("A1728TCAMC");
                objRtn.A1728TCOM = rs01.getDouble("A1728TCOM");
                objRtn.A1728TCOMI = rs01.getDouble("A1728TCOMI");
                objRtn.A1728TIVA = rs01.getDouble("A1728TIVA");
                objRtn.A1728TTCAS = rs01.getDouble("A1728TTCAS");
                objRtn.A1757STATU = rs01.getString("A1757STATU");
                objRtn.A1757INDCO = rs01.getString("A1757INDCO");
                //Pagin
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
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

        return lstRtn;
    }

    public String get_PX112S03A1757(String VP_OPTION, String VP_PARAM) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String lstRtn = "";

        String SQLCLL01 = "{CALL PX112S03A1757(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.VARCHAR);
            cstmt01.setString(1, VP_OPTION);
            cstmt01.setString(2, VP_PARAM);
            cstmt01.execute();
            lstRtn = cstmt01.getString(3);

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

        return lstRtn;
    }

    public PX112S02A1757Filter setPX112S02A1757(PX112S02A1757Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PX112S02A1757(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(17, Types.VARCHAR);
            cstmt.registerOutParameter(18, Types.VARCHAR);

            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, filter.VP_A1757CCUST);
            cstmt.setString(3, filter.VP_A1757LOTE);
            cstmt.setString(4, filter.VP_A1757IATA);
            cstmt.setString(5, filter.VP_A1757FPROC);
            cstmt.setString(6, filter.VP_A1757MONED);
            cstmt.setDouble(7, filter.VP_A1757COMM);
            cstmt.setDouble(8, filter.VP_A1757IVA);
            cstmt.setDouble(9, filter.VP_A1757COMIV);
            cstmt.setDouble(10, filter.VP_A1757TCASH);
            cstmt.setDouble(11, filter.VP_A1757CAMCO);
            cstmt.setString(12, filter.VP_A1757NFACT.trim());
            cstmt.setString(13, filter.VP_A1757FFACT);
            cstmt.setString(14, filter.VP_A1757STATU);
            cstmt.setString(15, filter.VP_A1757SEQ);
            cstmt.setString(16, filter.VP_A1757INDAP);

            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(17);
            filter.dbException.MESSAGE = cstmt.getString(18);
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
        return filter;
    }
    
//    NEW. VH
   public List<PX112S01A1728Filter> loadPX112S01A1728(PX112S01A1728Filter filter) throws SQLException, Exception {
        List<PX112S01A1728Filter> lstRtn = new ArrayList<PX112S01A1728Filter>(0);
        PX112S01A1728Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX112S01A1728(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();              
            cstmt01 = cnx.prepareCall(SQLCLL01);            
            cstmt01.setString(1, filter.VP_A1728CCUST);
            cstmt01.setString(2, filter.VP_A1728IATA);
            cstmt01.setString(3, filter.VP_A1728LOTE);                        
            cstmt01.execute();            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX112S01A1728Filter();                                
                objRtn.A1728TCAMC = rs01.getDouble("A1728TCAMC");
                objRtn.A1728TCOM = rs01.getDouble("A1728TCOM");
                objRtn.A1728TCOMI = rs01.getDouble("A1728TCOMI");
                objRtn.A1728TIVA = rs01.getDouble("A1728TIVA");
                objRtn.A1728TTCAS = rs01.getDouble("A1728TTCAS");
                objRtn.A1728MDARV = rs01.getString("A1728MDARV");                
                objRtn.A1757COMM = rs01.getDouble("A1757COMM");
                objRtn.A1757IVA = rs01.getDouble("A1757IVA");
                objRtn.A1757COMIV = rs01.getDouble("A1757COMIV");
                objRtn.A1757TCASH = rs01.getDouble("A1757TCASH");
                objRtn.A1757CAMCO = rs01.getDouble("A1757CAMCO");                
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
   }
   
   public String subirExcel(ArrayList<PX112S02A1757Filter> filter, String nameFile) throws SQLException, Exception {
        String mensaje = "";
        String mensajeErr = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP03824(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        PreparedStatement stmt = null;
        ResultSet rst = null;
        String nuevalinea = System.getProperty("line.separator");
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();

        try {
            cstmt01 = cnx.prepareCall(SQLCLL01);
            for (PX112S02A1757Filter obj : filter) {
                cstmt01.registerOutParameter(12, Types.VARCHAR);
                cstmt01.registerOutParameter(13, Types.VARCHAR);
                cstmt01.setString(1, obj.VP_ACTION);
                cstmt01.setString(2, obj.VP_A1757CCUST);
                cstmt01.setString(3, obj.VP_A1757LOTE.trim());
                cstmt01.setString(4, obj.VP_A1757IATA.trim());
                cstmt01.setDouble(5, obj.VP_A1757COMM);
                cstmt01.setDouble(6, obj.VP_A1757IVA);
                cstmt01.setString(7, obj.VP_A1757NFACT.trim());
                cstmt01.setString(8, obj.VP_A1757FFACT.trim());
                cstmt01.setString(9, obj.VP_A1757STATU.trim());
                cstmt01.setString(10, obj.VP_A1757SEQ.trim());
                cstmt01.setString(11, obj.VP_A1757INDAP.trim());
                cstmt01.execute();
                obj.dbException.SQLCODE = cstmt01.getString(12);
                obj.dbException.MESSAGE = cstmt01.getString(13);
                mensaje=cstmt01.getString(13);
                if (!obj.dbException.SQLCODE.equals("0")) {
                    mensajeErr += obj.dbException.MESSAGE.trim()+ "\r\n";
                }
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            mensaje = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            mensaje = e.getMessage();
        } finally {
            cnx.rollback();
            session.getCNXIBMDB2().close();
        }
        if (!mensajeErr.equals("")){
            mensaje = "El archivo '" + nameFile + "' contiene los siguientes errores: \r\n" + mensajeErr;
        }
        return mensaje;
    }
    
}
