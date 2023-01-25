package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX036S01A1530Filter;
import net.miatech.beans.PX036S01A1720Filter;
import net.miatech.beans.PX063D01A1720Filter;
import net.miatech.beans.PX063S01A713Filter;
import net.miatech.beans.PX063S01A714Filter;
import net.miatech.beans.SQP00133Filter;
import net.miatech.beans.SQP01299Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ControlFiguresDAO {

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
    
    public List<PX036S01A1530Filter> loadPX036S01A1530(PX036S01A1530Filter filter) throws SQLException, Exception {
        List<PX036S01A1530Filter> lstRtn = new ArrayList<PX036S01A1530Filter>(0);
        PX036S01A1530Filter objRtn;
        CallableStatement cstmt01 = null;        
        ResultSet rs01 = null;        
        String SQLCLL01 = "{CALL PX036S04A1530(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; 
        Connection cnx = null; //session.getCNXIBMDB2().open();
        
        try {
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.VP_FECHA01);
            cstmt01.setString(3, filter.VP_FECHA02);            
            cstmt01.setString(4, filter.VP_A1530FUENT);
            cstmt01.setString(5, filter.VP_A1530SFUEN);
            cstmt01.setString(6, filter.VP_A1530AGENT);
            cstmt01.setString(7, filter.VP_A1530MDA);
            cstmt01.setString(8, filter.VP_A1530STPRO);
            cstmt01.setString(9, filter.VP_A1530PSVTA);
            cstmt01.setString(10, filter.VP_A1530CIUVT);
            cstmt01.setString(11, filter.VP_A1530CSABR);
            cstmt01.setString(12, filter.VP_A1530GRUPO);
            
            cstmt01.setInt(13, filter.page.PAGNUM);
            cstmt01.setInt(14, filter.page.PAGROW);
            cstmt01.setInt(15, filter.page.TOTPAG);
            cstmt01.setInt(16, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(13);
            filter.page.PAGROW = cstmt01.getInt(14);
            filter.page.TOTPAG = cstmt01.getInt(15);
            filter.page.TOTROW = cstmt01.getInt(16);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1530Filter();                 
                objRtn.RN = rs01.getInt("RN"); 
                objRtn.A1530CCUST = rs01.getString("A1530CCUST");
                objRtn.A1530PSVTA = rs01.getString("A1530PSVTA");
                objRtn.A1530GRUPO = rs01.getString("A1530GRUPO");
                objRtn.A1530CIUVT = rs01.getString("A1530CIUVT");
                objRtn.A1530BANCO = rs01.getString("A1530BANCO");
                objRtn.A1530AGENT = rs01.getString("A1530AGENT");                
                objRtn.A1530TVENT = rs01.getString("A1530TVENT");
                objRtn.A1530FUENT = rs01.getString("A1530FUENT");
                objRtn.A1530SFUEN = rs01.getString("A1530SFUEN");                
                objRtn.A1530FCONT = rs01.getString("A1530FCONT");
                objRtn.A1530IDCON = rs01.getString("A1530IDCON");
                objRtn.A1530FHAST = rs01.getString("A1530FHAST");
                objRtn.A1530FPROC = rs01.getString("A1530FPROC");
                objRtn.A1530MDA = rs01.getString("A1530MDA");    
                objRtn.A1530POLGL = rs01.getString("A1530POLGL");    
                objRtn.A1530POLAR = rs01.getString("A1530POLAR");    
                objRtn.A1530POLAP = rs01.getString("A1530POLAP"); 
                objRtn.A1530STPRO_00 = rs01.getString("A1530STPRO_00"); 
                objRtn.A1720DIFF = rs01.getDouble("A1720DIFF"); 
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<PX036S01A1720Filter> loadPX036S01A1720(PX036S01A1720Filter filter) throws SQLException, Exception {                                                     
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;        
        List listado = new ArrayList();
        
        String SQLCLL01 = "{CALL PX036S01A1720(?,?)}";                
         Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);                      
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt01 = cnx.prepareCall(SQLCLL01);            
            cstmt01.setString(1, filter.IN_A1720CCUST);
            cstmt01.setString(2, filter.IN_A1720GRUPO);            
            cstmt01.execute();            
            rs01 = cstmt01.getResultSet();
            
            while (rs01.next()) {                                
                HashMap hm = new HashMap(); 
                hm.put("A1720GRUPO", rs01.getString("A1720GRUPO"));
                hm.put("A1720NATUR", rs01.getString("A1720NATUR"));
                hm.put("A1720TIPO", rs01.getString("A1720TIPO"));
                hm.put("A1720STIPO", rs01.getString("A1720STIPO"));
                hm.put("A1720DESCR", rs01.getString("A1720DESCR"));              
                hm.put("A1720QDOSA", rs01.getInt("A1720QDOSA"));
                hm.put("A1720QTRSA", rs01.getInt("A1720QTRSA"));
                 
                hm.put("A1720QDORF", rs01.getInt("A1720QDORF"));
                hm.put("A1720QTRRF", rs01.getInt("A1720QTRRF"));                                 
                hm.put("A1720VSALC", rs01.getString("A1720VSALC"));
                hm.put("A1720VRFLC", rs01.getString("A1720VRFLC"));
                hm.put("A1720VNTLC", rs01.getString("A1720VNTLC"));                  
                
                hm.put("A1720MDARV", rs01.getString("A1720MDARV"));  
                hm.put("A1720VSARV", rs01.getString("A1720VSARV"));
                hm.put("A1720VRFRV", rs01.getString("A1720VRFRV"));
                hm.put("A1720VNTRV", rs01.getString("A1720VNTRV"));                                    
                hm.put("A1720NATUR_00", rs01.getString("A1720NATUR_00"));
                hm.put("A1720TIPO_00", rs01.getString("A1720TIPO_00"));
                hm.put("LINK_DETAIL", rs01.getString("LINK_DETAIL"));
                listado.add(hm);                          
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            //session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }
        return listado;
    }
    
    public List<SQP00133Filter> getSQP00133(SQP00133Filter filter) throws SQLException, Exception {                                                     
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;        
        List listado = new ArrayList();
        
        String SQLCLL01 = "{CALL SQP00133(?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_A1875CCUST);
            cstmt01.setString(2, filter.IN_A1875GRUPO);            
            cstmt01.execute();            
            rs01 = cstmt01.getResultSet();
            
            while (rs01.next()) {                                
                HashMap hm = new HashMap();                
                hm.put("A1875NATUR", rs01.getString("A1875NATUR"));
                hm.put("A1875TIPO", rs01.getString("A1875TIPO"));
                hm.put("A1875STIPO", rs01.getString("A1875STIPO"));
                hm.put("A1875DESCR", rs01.getString("A1875DESCR"));              
                hm.put("A1875QDOSA", rs01.getInt("A1875QDOSA"));
                hm.put("A1875QTRSA", rs01.getInt("A1875QTRSA"));
                 
                hm.put("A1875QDORF", rs01.getInt("A1875QDORF"));
                hm.put("A1875QTRRF", rs01.getInt("A1875QTRRF"));                                 
                hm.put("A1875VSALC", rs01.getString("A1875VSALC"));
                hm.put("A1875VRFLC", rs01.getString("A1875VRFLC"));
                hm.put("A1875VNTLC", rs01.getString("A1875VNTLC"));                  
                
                hm.put("A1875MDARV", rs01.getString("A1875MDARV"));  
                hm.put("A1875VSARV", rs01.getString("A1875VSARV"));
                hm.put("A1875VRFRV", rs01.getString("A1875VRFRV"));
                hm.put("A1875VNTRV", rs01.getString("A1875VNTRV"));                                    
                hm.put("A1875NATUR_00", rs01.getString("A1875NATUR_00"));
                hm.put("A1875TIPO_00", rs01.getString("A1875TIPO_00"));                
                listado.add(hm);                          
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            //session.getCNXIBMDB2().close();
             session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return listado;
    }
    
    public List<PX063D01A1720Filter> loadPX063D01A1720(PX063D01A1720Filter filter) throws SQLException, Exception {
        List<PX063D01A1720Filter> lstRtn = new ArrayList<PX063D01A1720Filter>(0);
        PX063D01A1720Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //String SQLCLL01 = "{CALL PX063D01A1720(?,?,?,?,?,?,?,?,?)}";  
        String SQLCLL01 = "{CALL PRAXIS.SQP00254(?,?,?,?,?,?,?,?,?)}";  
        
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);            
            cstmt01.setString(1, filter.VP_A1720CCUST);
            cstmt01.setString(2, filter.VP_A1720GRUPO);
            cstmt01.setString(3, filter.VP_A1720TIPO);
            cstmt01.setString(4, filter.VP_A1720STIPO);
            cstmt01.setString(5, filter.VP_TRANS);            
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX063D01A1720Filter();                                                                 
                objRtn.A720AIRLIN = rs01.getString("A720AIRLIN");
                objRtn.A720CIA =rs01.getString("A720CIA");
                objRtn.DOCUMENTO =rs01.getString("DOCUMENTO");
                objRtn.A720SEQ =rs01.getString("A720SEQ");
                objRtn.A1720GRUPO =rs01.getString("A1720GRUPO");
                objRtn.A720FECVTA =rs01.getString("A720FECVTA");
                objRtn.CNJ =rs01.getString("CNJ");
                objRtn.A720TDOC =rs01.getString("A720TDOC");
                objRtn.A720UFORMA =rs01.getString("A720UFORMA");
                objRtn.A720MONEDA =rs01.getString("A720MONEDA");
                objRtn.A720TARIFA =rs01.getDouble("A720TARIFA");
                objRtn.A720MDAPAG =rs01.getString("A720MDAPAG");
                objRtn.A720TRFPAG =rs01.getDouble("A720TRFPAG");
                objRtn.A720MIAERR =rs01.getString("A720MIAERR");
                objRtn.A720STAT =rs01.getString("A720STAT");
                objRtn.A720TRNCU =rs01.getString("A720TRNCU");
                objRtn.A720MDAAD =rs01.getString("A720MDAAD");
                objRtn.A720ADC =rs01.getDouble("A720ADC"); 
                objRtn.VALOR_CONCEPT =rs01.getDouble("VALOR_CONCEPT"); 
                objRtn.TOTALS =rs01.getDouble("TOTALS");                     
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            //session.getCNXIBMDB2().close();
             session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<PX063S01A713Filter> loadPX063S01A713(PX063S01A713Filter filter) throws SQLException, Exception {
        List<PX063S01A713Filter> lstRtn = new ArrayList<PX063S01A713Filter>(0);
        PX063S01A713Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX063S01A713(?,?,?,?,?,?,?,?)}";        
        Connection cnx = null; //session.getCNXIBMDB2().open();
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);            
            cstmt01.setString(1, filter.VP_A1720CCUST);
            cstmt01.setString(2, filter.VP_A1720GRUPO);
            cstmt01.setString(3, filter.VP_A1720TIPO);
            cstmt01.setString(4, filter.VP_A1720STIPO);                      
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
                objRtn = new PX063S01A713Filter();                                                                 
                objRtn.A713AIRLIN = rs01.getString("A713AIRLIN");
                objRtn.A713CIA =rs01.getString("A713CIA");
                objRtn.DOCUMENTO =rs01.getString("DOCUMENTO");
                objRtn.A713SEQD =rs01.getString("A713SEQD");
                objRtn.A713GRUPO =rs01.getString("A713GRUPO");
                objRtn.A713FECVTA =rs01.getString("A713FECVTA");
                objRtn.CNJ =rs01.getString("CNJ");
                objRtn.A713TDOC =rs01.getString("A713TDOC");
                objRtn.A713UFORMA =rs01.getString("A713UFORMA");
                objRtn.A713MONEDA =rs01.getString("A713MONEDA");
                objRtn.A713TARIFA =rs01.getDouble("A713TARIFA");
                objRtn.A713MDAPAG =rs01.getString("A713MDAPAG");
                objRtn.A713TRFPAG =rs01.getDouble("A713TRFPAG");
                objRtn.A713MIAERR =rs01.getString("A713MIAERR");                
                objRtn.A713TRNCU =rs01.getString("A713TRNCU");  
                objRtn.CUPON =rs01.getString("CUPON");                  
                objRtn.VALOR_CONCEPT =rs01.getDouble("VALOR_CONCEPT");
                objRtn.TOTALS =rs01.getDouble("TOTALS");                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            //session.getCNXIBMDB2().close();
             session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    // Cifras Control Detallado por grupo
    public List<PX036S01A1720Filter> loadSQP00397(PX036S01A1720Filter filter) throws SQLException, Exception {                                                     
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;        
        List listado = new ArrayList();
        
        String SQLCLL01 = "{CALL PRAXIS.SQP00397(?,?)}";                
         Connection cnx = null; 
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt01 = cnx.prepareCall(SQLCLL01);            
            cstmt01.setString(1, filter.IN_A1720CCUST);
            cstmt01.setString(2, filter.IN_A1720GRUPO);            
            cstmt01.execute();            
            rs01 = cstmt01.getResultSet();
            
            while (rs01.next()) {                                
                HashMap hm = new HashMap(); 
                hm.put("A1720GRUPO", rs01.getString("A1720GRUPO"));
                hm.put("A1720NATUR", rs01.getString("A1720NATUR"));
                hm.put("A1720TIPO", rs01.getString("A1720TIPO"));
                hm.put("A1720STIPO", rs01.getString("A1720STIPO"));
                hm.put("A1720DESCR", rs01.getString("A1720DESCR").trim());              
                hm.put("A1720QDOSA", rs01.getInt("A1720QDOSA"));
                hm.put("A1720QTRSA", rs01.getInt("A1720QTRSA"));
                 
                hm.put("A1720QDORF", rs01.getInt("A1720QDORF"));
                hm.put("A1720QTRRF", rs01.getInt("A1720QTRRF"));                                 
                hm.put("A1720VSALC", rs01.getString("A1720VSALC"));
                hm.put("A1720VRFLC", rs01.getString("A1720VRFLC"));
                hm.put("A1720VNTLC", rs01.getString("A1720VNTLC"));                  
                
                hm.put("A1720MDARV", rs01.getString("A1720MDARV"));  
                hm.put("A1720VSARV", rs01.getString("A1720VSARV"));
                hm.put("A1720VRFRV", rs01.getString("A1720VRFRV"));
                hm.put("A1720VNTRV", rs01.getString("A1720VNTRV"));                                    
                hm.put("A1720NATUR_00", rs01.getString("A1720NATUR_00"));
                hm.put("A1720TIPO_00", rs01.getString("A1720TIPO_00"));
                hm.put("LINK_DETAIL", rs01.getString("LINK_DETAIL"));
                listado.add(hm);                          
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return listado;
    }    
    
    // NEW
    public List<SQP01299Filter> SQP01299Filter(SQP01299Filter filter) throws SQLException, Exception {
        List<SQP01299Filter> lstRtn = new ArrayList<SQP01299Filter>(0);
        SQP01299Filter objRtn;
        CallableStatement cstmt01 = null;        
        ResultSet rs01 = null;        
        String SQLCLL01 = "{CALL PRAXIS.SQP01299(?,?,?,?,?,?,?,?,?,?,?,?)}"; 
        Connection cnx = null; 
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt01 = cnx.prepareCall(SQLCLL01);
            /*
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            */
            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.VP_FECHA01);
            cstmt01.setString(3, filter.VP_FECHA02);            
            cstmt01.setString(4, filter.VP_A1530FUENT);
            cstmt01.setString(5, filter.VP_A1530SFUEN);
            cstmt01.setString(6, filter.VP_A1530AGENT);
            cstmt01.setString(7, filter.VP_A1530MDA);
            cstmt01.setString(8, filter.VP_A1530STPRO);
            cstmt01.setString(9, filter.VP_A1530PSVTA);
            cstmt01.setString(10, filter.VP_A1530CIUVT);
            cstmt01.setString(11, filter.VP_A1530CSABR);
            cstmt01.setString(12, filter.VP_A1530GRUPO);
            /*
            cstmt01.setInt(13, filter.page.PAGNUM);
            cstmt01.setInt(14, filter.page.PAGROW);
            cstmt01.setInt(15, filter.page.TOTPAG);
            cstmt01.setInt(16, filter.page.TOTROW);
            */
            cstmt01.execute();
            
            /*
            filter.page.PAGNUM = cstmt01.getInt(13);
            filter.page.PAGROW = cstmt01.getInt(14);
            filter.page.TOTPAG = cstmt01.getInt(15);
            filter.page.TOTROW = cstmt01.getInt(16);
            */

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01299Filter();                                 
                objRtn.FUENT = rs01.getString("A1530FUENT");
                objRtn.PSVTA = rs01.getString("A1530PSVTA");
                objRtn.GRUPO = rs01.getString("A1530GRUPO");
                objRtn.CANAL = rs01.getString("A1530CIUVT");
                objRtn.GRUPO = rs01.getString("A1530GRUPO");
                objRtn.LOCAL_CUR = rs01.getString("A1530MDA");
                objRtn.FOPEN = rs01.getString("A1530FDESD");
                objRtn.NATUR = rs01.getString("A1720NATUR_00");
                objRtn.TIPO = rs01.getString("A1720TIPO_00");
                objRtn.DESCR = rs01.getString("A1720DESCR");
                objRtn.QTY_SALE = rs01.getInt("A1720QTRSA"); 
                objRtn.SALE_LOC = rs01.getDouble("A1720VSALC"); 
                objRtn.QTY_RFND = rs01.getInt("A1720QTRRF"); 
                objRtn.RFND_LOC = rs01.getInt("A1720VRFLC");                 
                objRtn.NET_LOC = rs01.getDouble("A1720VNTLC");                 
                objRtn.SALE_REV = rs01.getDouble("A1720VSARV"); 
                objRtn.RFND_REV = rs01.getDouble("A1720VRFRV"); 
                objRtn.NET_REV = rs01.getDouble("A1720VNTRV"); 
               
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
    
    public List<PX063S01A714Filter> loadPX063S01A714(PX063S01A714Filter filter) throws SQLException, Exception {
        List<PX063S01A714Filter> lstRtn = new ArrayList<PX063S01A714Filter>(0);
        PX063S01A714Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX063S01A714(?,?,?,?,?,?,?,?)}";        
         Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);            
            cstmt01.setString(1, filter.VP_A1720CCUST);
            cstmt01.setString(2, filter.VP_A1720GRUPO);
            cstmt01.setString(3, filter.VP_A1720TIPO);
            cstmt01.setString(4, filter.VP_A1720STIPO);                      
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
                
                objRtn = new PX063S01A714Filter();                                                                 
                objRtn.A714AIRLIN = rs01.getString("A714AIRLIN");
                objRtn.A714CIA =rs01.getString("A714CIA");
                objRtn.DOCUMENTO =rs01.getString("DOCUMENTO");
                objRtn.A714SEQ =rs01.getString("A714SEQ");
                objRtn.A714GRUPO =rs01.getString("A714GRUPO");
                objRtn.A714FECVTA =rs01.getString("A714FECVTA");
                objRtn.CNJ =rs01.getString("CNJ");
                objRtn.A714TDOC =rs01.getString("A714TDOC");                
                objRtn.A714MDAFA =rs01.getString("A714MDAFA");
                objRtn.A714MDAFP =rs01.getString("A714MDAFP");
                objRtn.A714FARE =rs01.getDouble("A714FARE");
                objRtn.A714MDAPAG =rs01.getString("A714MDAPAG");
                objRtn.A714TRFPAG =rs01.getDouble("A714TRFPAG");
                objRtn.A714MIAERR =rs01.getString("A714MIAERR");                
                objRtn.A714TRNCU =rs01.getString("A714TRNCU");  
                objRtn.A714VFOP =rs01.getDouble("A714VFOP");
                objRtn.TOTALS =rs01.getDouble("TOTALS");                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
