/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.eecta;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.eecta.SQP04163Filter;
import net.miatech.praxis.eecta.SQP04164Filter;
import net.miatech.praxis.eecta.SQP04173Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class RegistroVentaOALDAO {
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>
     public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
    
    public List<SQP04163Filter> getSQP04163Filter(SQP04163Filter filter) throws SQLException, Exception {
        List<SQP04163Filter> lstRtn = new ArrayList<SQP04163Filter>(0);
        SQP04163Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04163(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FILTRO);    
            cstmt01.setString(3, filter.VP_FECHA01);            
            cstmt01.setString(4, filter.VP_FECHA02);    
            cstmt01.setString(5, filter.VP_TICKET_NUMBER);
            cstmt01.setString(6, filter.VP_AIRLINE_CODE);           
            cstmt01.setString(7, filter.VP_SERVICE_TYPE);    
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);            
            cstmt01.execute();            
            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04163Filter();	
                objRtn.A4069CCUST = rs01.getString("A4069CCUST");
                objRtn.A4069CIA = rs01.getString("A4069CIA");                
                objRtn.A4069FORMA = rs01.getString("A4069FORMA");
                objRtn.A4069SERIE = rs01.getString("A4069SERIE");
                objRtn.A4069SEQ = rs01.getString("A4069SEQ");
                objRtn.A4069TRNCU = rs01.getString("A4069TRNCU");
                objRtn.A4069GRUPO = rs01.getString("A4069GRUPO");
                objRtn.A4069TKTOR = rs01.getString("A4069TKTOR");
                objRtn.A4069FEVTA = rs01.getString("A4069FEVTA");
                objRtn.A4069IATA = rs01.getString("A4069IATA");
                objRtn.A4069SERV = rs01.getString("A4069SERV");
                objRtn.A4069PAX = rs01.getString("A4069PAX").trim();
                objRtn.A4069RUTA = rs01.getString("A4069RUTA").trim();
                objRtn.A4069CARR = rs01.getString("A4069CARR").trim();
                objRtn.A4069FBAS = rs01.getString("A4069FBAS").trim();
                objRtn.A4069FVLO = rs01.getString("A4069FVLO").trim();
                
                objRtn.A4069MDLOC = rs01.getString("A4069MDLOC");
                objRtn.A4069FARE = rs01.getDouble("A4069FARE");
                objRtn.A4069IVA = rs01.getDouble("A4069IVA");
                objRtn.A4069IVAP = rs01.getDouble("A4069IVAP");
                objRtn.A4069TUA = rs01.getDouble("A4069TUA");
                objRtn.A4069YR = rs01.getDouble("A4069YR");
                objRtn.A4069YQ = rs01.getDouble("A4069YQ");
                objRtn.A4069OTR = rs01.getDouble("A4069OTR");
                objRtn.A4069TOTAL = rs01.getDouble("A4069TOTAL");
                
                objRtn.A4069FARER = rs01.getDouble("A4069FARER");
                objRtn.A4069IVARV = rs01.getDouble("A4069IVARV");
                objRtn.A4069TUARV = rs01.getDouble("A4069TUARV");
                objRtn.A4069YRRV = rs01.getDouble("A4069YRRV");
                objRtn.A4069YQRV = rs01.getDouble("A4069YQRV");
                objRtn.A4069OTRRV = rs01.getDouble("A4069OTRRV");
                objRtn.A4069TOTRV = rs01.getDouble("A4069TOTRV");
               
                objRtn.A4069MERNB = rs01.getString("A4069MERNB").trim();
                objRtn.A4069MERNM = rs01.getString("A4069MERNM").trim();
                objRtn.A4069ACCNB = rs01.getString("A4069ACCNB").trim();
                objRtn.A4069ACCNM = rs01.getString("A4069ACCNM").trim();
                objRtn.A4069CRDNB = rs01.getString("A4069CRDNB").trim();
                objRtn.A4069TTARJ = rs01.getString("A4069TTARJ").trim();
                objRtn.A4069NTARJ = rs01.getString("A4069NTARJ").trim();
                
                objRtn.A4069IDCON = rs01.getString("A4069IDCON").trim();
                objRtn.A4069FCONT = rs01.getString("A4069FCONT");
                objRtn.A4069PCONT = rs01.getString("A4069PCONT");
                objRtn.A4069FOP = rs01.getString("A4069FOP");
                objRtn.A4069MPG = rs01.getString("A4069MPG");
                objRtn.A4069CFDI = rs01.getString("A4069CFDI").trim();
                objRtn.A4069RFC = rs01.getString("A4069RFC");
                objRtn.A4069FECTB = rs01.getString("A4069FECTB");
                
                objRtn.A4069REGIS = rs01.getString("A4069REGIS");
                objRtn.A4069FREGI = rs01.getString("A4069FREGI");
                objRtn.A4069HREGI = rs01.getString("A4069HREGI");
                objRtn.A4069REVIS = rs01.getString("A4069REVIS");
                objRtn.A4069FREVI = rs01.getString("A4069FREVI");
                objRtn.A4069HREVI = rs01.getString("A4069HREVI");
                
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
    
    public SQP04164Filter setSQP04164Filter(SQP04164Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04164(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(47, Types.VARCHAR);
            cstmt.registerOutParameter(48, Types.VARCHAR);
            cstmt.registerOutParameter(49, Types.VARCHAR);
            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.A4069CIA);
            cstmt.setString(4, filter.A4069FORMA);
            cstmt.setString(5, filter.A4069SERIE);
            cstmt.setString(6, filter.A4069SEQ);
            cstmt.setString(7, filter.A4069TRNCU);
            cstmt.setString(8, filter.A4069GRUPO);
            cstmt.setString(9, filter.A4069TKTOR);
            cstmt.setString(10, filter.A4069FEVTA);
            cstmt.setString(11, filter.A4069IATA);
            cstmt.setString(12, filter.A4069SERV);
            cstmt.setString(13, filter.A4069PAX);
            cstmt.setString(14, filter.VP_ROUTING);            
            cstmt.setString(15, filter.A4069MDLOC);
            cstmt.setDouble(16, filter.A4069TCREV);
            cstmt.setDouble(17, filter.A4069FARE);
            cstmt.setDouble(18, filter.A4069IVA);
            cstmt.setDouble(19, filter.A4069IVAP);
            cstmt.setDouble(20, filter.A4069TUA);
            cstmt.setDouble(21, filter.A4069YR);
            cstmt.setDouble(22, filter.A4069YQ);
            cstmt.setDouble(23, filter.A4069OTR);
            cstmt.setDouble(24, filter.A4069TOTAL);
            cstmt.setDouble(25, filter.A4069FARER);
            cstmt.setDouble(26, filter.A4069IVARV);
            cstmt.setDouble(27, filter.A4069TUARV);
            cstmt.setDouble(28, filter.A4069YRRV);
            cstmt.setDouble(29, filter.A4069YQRV);
            cstmt.setDouble(30, filter.A4069OTRRV);
            cstmt.setDouble(31, filter.A4069TOTRV);
            
            cstmt.setString(32, filter.A4069MERNB);
            cstmt.setString(33, filter.A4069MERNM);
            cstmt.setString(34, filter.A4069ACCNB);
            cstmt.setString(35, filter.A4069ACCNM);
            cstmt.setString(36, filter.A4069CRDNB);
            cstmt.setString(37, filter.A4069TTARJ);            
            cstmt.setString(38, filter.A4069NTARJ);
            //Datos contables
            cstmt.setString(39, filter.A4069IDCON);
            cstmt.setString(40, filter.A4069FCONT);
            cstmt.setString(41, filter.A4069PCONT);
            //factura electronica
            cstmt.setString(42, filter.A4069FOP);          
            cstmt.setString(43, filter.A4069MPG);
            cstmt.setString(44, filter.A4069CFDI);
            cstmt.setString(45, filter.A4069RFC);
            cstmt.setString(46, filter.A4069FECTB);
                  
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(47);
            filter.dbException.MESSAGE = cstmt.getString(48);
            filter.OU_INTERNAL_NUMBER = cstmt.getString(49);
                        
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
    public List<SQP04173Filter> getSQP04173Filter(SQP04173Filter filter) throws SQLException, Exception {
        List<SQP04173Filter> lstRtn = new ArrayList<SQP04173Filter>(0);
        SQP04173Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04173(?,?,?,?,?)}";
        Connection cnx = null;        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A4069CIA);    
            cstmt01.setString(3, filter.VP_A4069FORMA);            
            cstmt01.setString(4, filter.VP_A4069SERIE);    
            cstmt01.setString(5, filter.VP_A4069SEQ);             
            cstmt01.execute(); 
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04173Filter();
                objRtn.A4069RUTA = rs01.getString("A4069RUTA").trim();
                objRtn.A4069CARR = rs01.getString("A4069CARR").trim();
                objRtn.A4069FBAS = rs01.getString("A4069FBAS").trim();
                objRtn.A4069FVLO = rs01.getString("A4069FVLO").trim();
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
}
