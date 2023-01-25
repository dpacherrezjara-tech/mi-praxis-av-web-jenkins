/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.flown.filter.A4161Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class IvaReportDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public IvaReportDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public IvaReportDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4161Filter> search(A4161Filter filter) throws SQLException, Exception {
        List<A4161Filter> lstRtn = new ArrayList(0);
        A4161Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null, cstmt02 = null;
        ResultSet rs01 = null, rs02 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP04363(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setString("IN_A1955CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_A1955MODUL", filter.IN_MODULO);
            cstmt01.setString("IN_CIA", filter.IN_CIA);
            cstmt01.setString("IN_PFLIGHT", filter.IN_PFLIGHT);
            cstmt01.setString("IN_CARR", filter.IN_CARR);
            cstmt01.setString("IN_STOCK", filter.IN_STOCK);
            cstmt01.setString("IN_PERIODO", filter.IN_PERIODO);
            
            cstmt01.setInt("IO_PAGNUM", PAGINIT);
            cstmt01.setInt("IO_PAGROW", totRowsPag);
            cstmt01.setInt("IO_TOTPAG", totRows);
            cstmt01.setInt("IO_TOTROW", filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt("IO_PAGNUM");
            filter.page.PAGROW = cstmt01.getInt("IO_PAGROW");
            filter.page.TOTPAG = cstmt01.getInt("IO_TOTPAG");
            filter.page.TOTROW = cstmt01.getInt("IO_TOTROW");

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt("IO_PAGROW")) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt("IO_TOTROW");
                    int total = (int) (totRows / totRowsPag);
                    int resto = (totRows % totRowsPag);

                    if (resto > 0) {
                        totPAGS = total + 1;
                    } else {
                        totPAGS = total;
                    }

                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            filter.page.TOTPAG = totPAGS;

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A4161Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.CIA = rs01.getString("CIA").trim();
                objRtn.AIRCODE = rs01.getString("AIRCODE").trim();
                objRtn.AIRNAME = rs01.getString("AIRNAME").trim();
                objRtn.TICKET = rs01.getString("TICKET").trim();
                objRtn.CUPON = rs01.getString("CUPON").trim();
                objRtn.SEQ =  rs01.getString("SEQ").trim();
                objRtn.DFLIGHT =  rs01.getString("DFLIGHT").trim();
                objRtn.PFLIGHT =  rs01.getString("PFLIGHT").trim();
                objRtn.NFLIGHT =  rs01.getString("NFLIGHT").trim();
                objRtn.CARR =  rs01.getString("CARR").trim();
                objRtn.STOCK =  rs01.getString("STOCK").trim();
                objRtn.ORI =  rs01.getString("ORI").trim();
                objRtn.DES =  rs01.getString("DES").trim();
                objRtn.AMOUREV =  Double.parseDouble(rs01.getString("AMOUREV").trim());
                objRtn.TCREV =  Double.parseDouble(rs01.getString("TCREV").trim());
                objRtn.AMOULOC =  Double.parseDouble(rs01.getString("AMOULOC").trim());
                objRtn.CTACONT =  rs01.getString("CTACONT").trim();
                objRtn.CTA =  rs01.getString("CTA").trim();
                objRtn.SUBCTA =  rs01.getString("SUBCTA").trim();    
                objRtn.PERIODO =  rs01.getString("PERIODO").trim();
                objRtn.TITULO =  rs01.getString("TITULO").trim();
                objRtn.TIPOING =  rs01.getString("TIPOING").trim();  
                objRtn.ITEM =  rs01.getString("ITEM").trim();
                objRtn.CLASOD =  rs01.getString("CLASOD").trim();
                objRtn.TIDOCOD =  rs01.getString("TIDOCOD").trim();    
                objRtn.TITRANOD =  rs01.getString("TITRANOD").trim();
                objRtn.VOLINVOL =  rs01.getString("VOLINVOL").trim();
                objRtn.RUTAOD =  rs01.getString("RUTAOD").trim();           
                objRtn.BASEGRAOD =  rs01.getString("BASEGRAOD").trim();
                objRtn.IVAOD =  rs01.getString("IVAOD").trim();
                objRtn.OD =  rs01.getString("OD").trim();  
                objRtn.CNXOD =  rs01.getString("CNXOD").trim();
                objRtn.TASAOD2 =  rs01.getString("TASAOD2").trim();
                objRtn.BASEGRAOD2 =  rs01.getString("BASEGRAOD2").trim();    
                objRtn.IVAOD2 =  rs01.getString("IVAOD2").trim();
                objRtn.CURRLOCVT =  rs01.getString("CURRLOCVT").trim();
                objRtn.RUTFCALVT =  rs01.getString("RUTFCALVT").trim(); 
                objRtn.TARIFALOC =  Double.parseDouble(rs01.getString("TARIFALOC").trim());
                objRtn.YQLOCVT =  Double.parseDouble(rs01.getString("YQLOCVT").trim());
                objRtn.IVALOCVT =  Double.parseDouble(rs01.getString("IVALOCVT").trim());  
                objRtn.IVAVTA =  Double.parseDouble(rs01.getString("IVAVTA").trim());
                objRtn.BASEGRAVT =  rs01.getString("BASEGRAVT") == null ? "" : rs01.getString("BASEGRAVT").trim();
                objRtn.TASAIVAVT =  rs01.getString("TASAIVAVT") == null ? "" : rs01.getString("TASAIVAVT").trim(); 
                objRtn.ODFCALVT =  rs01.getString("ODFCALVT").trim();
                objRtn.RUTFCALOD =  rs01.getString("RUTFCALOD").trim();
                objRtn.CNXIR =  rs01.getString("CNXIR").trim();
                objRtn.TASAOD =  rs01.getString("TASAOD").trim();
                objRtn.ORIDES =  rs01.getString("ORIDES").trim();
                objRtn.MARCAIVA =  rs01.getString("MARCAIVA").trim();
                //
                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            String str = ex.getMessage();
            str = "";
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public String consistenciaFlown(A4161Filter filter) throws SQLException, Exception {       
        String strSQL;
        String STR_RESULT = "";       
       
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP02334(?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);            
            cs.setString(2, filter.IN_FECHA_PROCESO);            
            cs.execute();
            
            rst = cs.getResultSet();     
            STR_RESULT = "OK";
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
            STR_RESULT = "ERROR";
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }
    
      public String accountMaintance(A4161Filter filter, String strOption) throws SQLException, Exception {
       
        String strSQL;
        String STR_RESULT = "";        
        
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00902(?,?,?,?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.IN_FECHA_PROCESO);
            cs.setString(4, session.getUserView().getUserInfo().USR);
            cs.setString(5, Functions.getFechaActual());
            cs.setString(6, Functions.getHoraActual());
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }
      
    public String accountMaintancePendingFlown(A4161Filter filter, String strOption) throws SQLException, Exception  {
        String strSQL;
        String STR_RESULT = "";
        
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP02859(?,?,?,?,?,?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.MODULE);            
            cs.setString(4, filter.IN_FECHA_PROCESO);
            cs.setString(5, session.getUserView().getUserInfo().USR);
            cs.setString(6, Functions.getFechaActual());
            cs.setString(7, Functions.getHoraActual());
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }

    public String reversaFlown(A4161Filter filter) throws SQLException,Exception {
        String strSQL;
        String STR_RESULT = "";

        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".QRY_REVERTIR_FLOWN(?,?)}"; 
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, filter.IN_FECHA_PROCESO);            
            cs.setString(2, filter.IN_ENVIO.equals("true")? "Y" : "N");            
            cs.execute();
            
            rst = cs.getResultSet();            
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }
    
}
