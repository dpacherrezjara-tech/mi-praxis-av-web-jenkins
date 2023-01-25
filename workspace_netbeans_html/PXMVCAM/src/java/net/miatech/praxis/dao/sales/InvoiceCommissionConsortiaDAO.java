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
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00801Filter;
import net.miatech.beans.SQP00802Filter;
import net.miatech.beans.SQP00804Filter;
import net.miatech.beans.SQP00806Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class InvoiceCommissionConsortiaDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InvoiceCommissionConsortiaDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InvoiceCommissionConsortiaDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP00801Filter> loadPX112S01A1757(SQP00801Filter filter) throws SQLException, Exception {
        List<SQP00801Filter> lstRtn = new ArrayList<>(0);
        SQP00801Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP00801(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, filter.VP_A2447CCUST);
            cstmt01.setString(2, filter.VP_A2447IATA);
            cstmt01.setString(3, filter.VP_A2447LOTE);
            cstmt01.setString(4, filter.VP_A2447FFACT);
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
                objRtn = new SQP00801Filter();
                objRtn.A2447CCUST = rs01.getString("A2447CCUST");
                objRtn.A2447LOTE = rs01.getString("A2447LOTE");
                objRtn.A2447IATA = rs01.getString("A2447IATA");
                objRtn.A003KEY3 = rs01.getString("A003KEY3");
                objRtn.A2447NFACT = rs01.getString("A2447NFACT");
                objRtn.A2447FFACT = rs01.getString("A2447FFACT");
                objRtn.A2447COMM = rs01.getDouble("A2447COMM");
                objRtn.A2447IVA = rs01.getDouble("A2447IVA");
                objRtn.A2447COMIV = rs01.getDouble("A2447COMIV");
                objRtn.A2447TCASH = rs01.getDouble("A2447TCASH");
                objRtn.A2447CAMCO = rs01.getDouble("A2447CAMCO");
                objRtn.A2447MONED = rs01.getString("A2447MONED");
                objRtn.A2447SEQ = rs01.getString("A2447SEQ");
                objRtn.A2447REGIS = rs01.getString("A2447REGIS");
                objRtn.A2447FREGI = rs01.getString("A2447FREGI");
                objRtn.A2447HREGI = rs01.getString("A2447HREGI");
                objRtn.A2447REVIS = rs01.getString("A2447REVIS");
                objRtn.A2447FREVI = rs01.getString("A2447FREVI");
                objRtn.A2447HREVI = rs01.getString("A2447HREVI");
                objRtn.A2447INDAP = rs01.getString("A2447INDAP");
                // Total a1728 Pre-Factura
                objRtn.A2444TCAMC = rs01.getDouble("A2444TCAMC");
                objRtn.A2444TCOM = rs01.getDouble("A2444TCOM");
                objRtn.A2444TCOMI = rs01.getDouble("A2444TCOMI");
                objRtn.A2444TIVA = rs01.getDouble("A2444TIVA");
                objRtn.A2444TTCAS = rs01.getDouble("A2444TTCAS");
                objRtn.A2447STATU = rs01.getString("A2447STATU");
                objRtn.A2447INDCO = rs01.getString("A2447INDCO");
                objRtn.A2444BANKC = rs01.getDouble("A2444BANKC");
                objRtn.A2444IVA16 = rs01.getDouble("A2444IVA16");
                //New
                objRtn.A2447COD = rs01.getString("A2447COD");
                objRtn.A2447COMBA = rs01.getDouble("A2447COMBA");
                objRtn.A2447IVACB = rs01.getDouble("A2447IVACB");
                /*objRtn.A2447COD2 = rs01.getString("A2447COD2");
                objRtn.A2447COMB2 = rs01.getDouble("A2447COMB2");
                objRtn.A2447IVAC2 = rs01.getDouble("A2447IVAC2");
                objRtn.A2447NFAC1 = rs01.getString("A2447NFAC1");
                objRtn.A2447NFAC2 = rs01.getString("A2447NFAC2");
                objRtn.A2447FFAC1 = rs01.getString("A2447FFAC1");
                objRtn.A2447FFAC2 = rs01.getString("A2447FFAC2");*/
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

        String SQLCLL01 = "{CALL SQP00803(?,?,?)}";
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

    public SQP00802Filter setPX112S02A1757(SQP00802Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL SQP00802(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(20, Types.VARCHAR);
            cstmt.registerOutParameter(21, Types.VARCHAR);

            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, filter.VP_A2447CCUST);
            cstmt.setString(3, filter.VP_A2447LOTE);
            cstmt.setString(4, filter.VP_A2447IATA);
            cstmt.setString(5, filter.VP_A2447FPROC);
            cstmt.setString(6, filter.VP_A2447MONED);
            cstmt.setDouble(7, filter.VP_A2447COMM);
            cstmt.setDouble(8, filter.VP_A2447IVA);
            cstmt.setDouble(9, filter.VP_A2447COMIV);
            cstmt.setDouble(10, filter.VP_A2447TCASH);
            cstmt.setDouble(11, filter.VP_A2447CAMCO);
            cstmt.setString(12, filter.VP_A2447NFACT.trim());
            cstmt.setString(13, filter.VP_A2447FFACT);
            cstmt.setString(14, filter.VP_A2447STATU);
            cstmt.setString(15, filter.VP_A2447SEQ);
            cstmt.setString(16, filter.VP_A2447INDAP);
            cstmt.setString(17, filter.VP_A2447COD);
            cstmt.setDouble(18, filter.VP_A2447COMBA);
            cstmt.setDouble(19, filter.VP_A2447IVACB);
            /*cstmt.setString(20, filter.VP_A2447COD2);
            cstmt.setDouble(21, filter.VP_A2447COMB2);
            cstmt.setDouble(22, filter.VP_A2447IVAC2);
            cstmt.setString(23, filter.VP_A2447NFAC1);
            cstmt.setString(24, filter.VP_A2447NFAC2);
            cstmt.setString(25, filter.VP_A2447FFAC1);
            cstmt.setString(26, filter.VP_A2447FFAC2);*/

            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(20);
            filter.dbException.MESSAGE = cstmt.getString(21);
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
   public List<SQP00804Filter> loadPX112S01A1728(SQP00804Filter filter) throws SQLException, Exception {
        List<SQP00804Filter> lstRtn = new ArrayList<SQP00804Filter>(0);
        SQP00804Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP00804(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);            
            cstmt01.setString(1, filter.VP_A2444CCUST);
            cstmt01.setString(2, filter.VP_A2444IATA);
            cstmt01.setString(3, filter.VP_A2444LOTE);                        
            cstmt01.execute();            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00804Filter();                                
                objRtn.A2444TCAMC = rs01.getDouble("A2444TCAMC");
                objRtn.A2444TCOM = rs01.getDouble("A2444TCOM");
                objRtn.A2444TCOMI = rs01.getDouble("A2444TCOMI");
                objRtn.A2444TIVA = rs01.getDouble("A2444TIVA");
                objRtn.A2444TTCAS = rs01.getDouble("A2444TTCAS");
                objRtn.A2444BANKC = rs01.getDouble("A2444BANKC");
                objRtn.A2444IVA16 = rs01.getDouble("A2444IVA16");
                objRtn.A2444MDARV = rs01.getString("A2444MDARV");
                
                objRtn.A2447COMM = rs01.getDouble("A2447COMM");
                objRtn.A2447IVA = rs01.getDouble("A2447IVA");
                objRtn.A2447COMIV = rs01.getDouble("A2447COMIV");
                objRtn.A2447TCASH = rs01.getDouble("A2447TCASH");
                objRtn.A2447CAMCO = rs01.getDouble("A2447CAMCO");
                objRtn.A2447COMBA = rs01.getDouble("A2447COMBA");
                objRtn.A2447IVACB = rs01.getDouble("A2447IVACB");
                /*objRtn.A2447COMB2 = rs01.getDouble("A2447COMB2");
                objRtn.A2447IVAC2 = rs01.getDouble("A2447IVAC2");*/
                
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
   
   public String subirExcel(ArrayList<SQP00802Filter> filter, String nameFile) throws SQLException, Exception {
        String mensaje = "";
        String mensajeErr = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP03832(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        PreparedStatement stmt = null;
        ResultSet rst = null;
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();

        try {
            cstmt01 = cnx.prepareCall(SQLCLL01);
            for (SQP00802Filter obj : filter) {
                cstmt01.registerOutParameter(13, Types.VARCHAR);
                cstmt01.registerOutParameter(14, Types.VARCHAR);
                cstmt01.setString(1, obj.VP_ACTION);
                cstmt01.setString(2, obj.VP_A2447CCUST);
                cstmt01.setString(3, obj.VP_A2447LOTE.trim());
                cstmt01.setString(4, obj.VP_A2447IATA.trim());
                cstmt01.setDouble(5, obj.VP_A2447COMM);
                cstmt01.setDouble(6, obj.VP_A2447IVA);
                cstmt01.setString(7, obj.VP_A2447NFACT.trim());
                cstmt01.setString(8, obj.VP_A2447FFACT.trim());
                cstmt01.setString(9, obj.VP_A2447STATU.trim());
                cstmt01.setString(10, obj.VP_A2447SEQ.trim());
                cstmt01.setString(11, obj.VP_A2447INDAP.trim());
                cstmt01.setString(12, obj.VP_A2447COD.trim());
                cstmt01.execute();
                obj.dbException.SQLCODE = cstmt01.getString(13);
                obj.dbException.MESSAGE = cstmt01.getString(14);
                mensaje=cstmt01.getString(14);
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
