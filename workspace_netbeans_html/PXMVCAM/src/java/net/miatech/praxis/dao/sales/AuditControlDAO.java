package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxisbi.A1955Filter;
import net.miatech.sql.biamdb.AuditFilter;
import net.miatech.sql.biamdb.ModuleFilter;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class AuditControlDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public AuditControlDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<AuditFilter> USP_BI_REPORTE_SEL(AuditFilter filter) {

        List<AuditFilter> lstRtn = new ArrayList(0);
        AuditFilter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        strSQL = "{CALL dbo.USP_BI_REPORTE_SEL(?,?,?,?,?,?,?,?,?,?)}";
        //ResultSet rs = null;
        try {
            cnx = session.getCNXIBMDB2().getSQLConnection41(session);
            cs = cnx.prepareCall(strSQL,ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_READ_ONLY);
            
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            cs.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cs.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cs.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cs.registerOutParameter("IO_TOTROW", Types.INTEGER);
            
            cs.setString(1, filter.IN_SEQ);
            cs.setString(2, filter.IN_MODULE);
            cs.setString(3, filter.IN_PROC_DATE);
            cs.setInt(4, filter.IN_STATUS);
            cs.setString(5, filter.IN_FROM_DATE);
            cs.setString(6, filter.IN_TO_DATE);
            
            cs.setInt("IO_PAGNUM", PAGINIT);
            cs.setInt("IO_PAGROW", totRowsPag);     
            cs.setInt("IO_TOTPAG", totRows);     
            cs.setInt("IO_TOTROW", filter.page.TOTROW); 
            
            boolean results = cs.execute();
            int rowsAffected = 0;
            while (results || rowsAffected != -1) {
                if (results) {
                    rst = cs.getResultSet();
                    break;
                } else {
                    rowsAffected = cs.getUpdateCount();
                }
                results = cs.getMoreResults();
            }
            
            //rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new AuditFilter();
                objRtn.MODULE = rst.getString("MODULE").trim();
                objRtn.SUB_MODULE = rst.getString("SUB_MODULE").trim();
                objRtn.SEQ = rst.getString("SEQ").trim();
                objRtn.PROC_DATE = rst.getString("PROC_DATE").trim();
                objRtn.DATE_CREATE = rst.getString("DATE_CREATE").trim();                                             
                objRtn.STATUS = rst.getString("STATUS").trim();                
                objRtn.STATUS_LABEL = rst.getString("STATUS_LABEL").trim();
                objRtn.TOTAL = rst.getInt("TOTAL");
                
                objRtn.USRIN = rst.getString("USRIN").trim();
                objRtn.FECAC = rst.getString("FECAC").trim();
                objRtn.USRAC = rst.getString("USRAC").trim();
                objRtn.FECIN = rst.getString("FECIN").trim();
                
                objRtn.page.PAGNUM = filter.page.PAGNUM/filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }  
            
            filter.page.PAGNUM = cs.getInt("IO_PAGNUM");
            filter.page.PAGROW = cs.getInt("IO_PAGROW");
            filter.page.TOTPAG = cs.getInt("IO_TOTPAG");
            filter.page.TOTROW = cs.getInt("IO_TOTROW");
            
            lstRtn.get(0).page.PAGNUM = filter.page.PAGNUM/filter.page.PAGROW + 1;
            lstRtn.get(0).page.PAGROW = filter.page.PAGROW;
            lstRtn.get(0).page.TOTPAG = filter.page.TOTPAG;
            lstRtn.get(0).page.TOTROW = filter.page.TOTROW;
            
            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cs.getInt("IO_PAGROW")) {
               totRows = filter.page.TOTROW;
               totPAGS = filter.page.TOTPAG;
            } else {
               try {
                   totRows = cs.getInt("IO_TOTROW");
                   int total =  (int)(totRows / totRowsPag);                                                                    
                   int resto =  (totRows % totRowsPag);                    

                   if(resto>0)
                       totPAGS = total + 1;
                   else
                       totPAGS = total;

               } catch (Exception e) {
                   totPAGS = totRows / totRowsPag;
               }
            }        
             
            filter.page.TOTPAG = totPAGS;            
            
        } catch (Exception e) {
            System.out.println("Mensaje loadPX_ACS: " + e.getMessage());
        } finally {
            setClose();
        }

        return lstRtn;

    }
    
    public List<ModuleFilter> USP_BI_REPORTE_MODULE_SEL() {

        List<ModuleFilter> lstRtn = new ArrayList(0);
        ModuleFilter objRtn;
        
        strSQL = "{CALL dbo.USP_BI_REPORTE_MODULE_SEL}";
        //ResultSet rs = null;
        try {
            cnx = session.getCNXIBMDB2().getSQLConnection41(session);
            cs = cnx.prepareCall(strSQL,ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_READ_ONLY);
            
            boolean results = cs.execute();
            int rowsAffected = 0;
            while (results || rowsAffected != -1) {
                if (results) {
                    rst = cs.getResultSet();
                    break;
                } else {
                    rowsAffected = cs.getUpdateCount();
                }
                results = cs.getMoreResults();
            }
            
            //rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new ModuleFilter();
                objRtn.MODULE = rst.getString("MODULE").trim();
                objRtn.SUB_MODULE = rst.getString("SUB_MODULE").trim();
                objRtn.PREFIX = rst.getString("PREFIX").trim();
                objRtn.LABEL = rst.getString("LABEL").trim();
                objRtn.DATE_CREATE = rst.getString("DATE_CREATE").trim();  
                lstRtn.add(objRtn);
            }         
            
        } catch (Exception e) {
            System.out.println("Mensaje USP_BI_REPORTE_MODULE_SEL: " + e.getMessage());
        } finally {
            setClose();
        }

        return lstRtn;

    }
    
    public AuditFilter USP_BI_REPORTE_UPD(AuditFilter filter) {

        AuditFilter objRtn = new AuditFilter();
        
        strSQL = "{CALL dbo.USP_BI_REPORTE_UPD(?,?,?,?,?)}";
        //ResultSet rs = null;
        try {
            cnx = session.getCNXIBMDB2().getSQLConnection41(session);
            cs = cnx.prepareCall(strSQL);
            
            cs.setString(1, filter.IN_SEQ);
            cs.setString(2, filter.IN_MODULE);
            cs.setString(3, filter.IN_PROC_DATE);
            cs.setString(4, session.getUserView().getUserInfo().USR);
            cs.setInt(5, filter.IN_STATUS);
            
            boolean results = cs.execute();
            /*int rowsAffected = 0;
            while (results || rowsAffected != -1) {
                if (results) {
                    rst = cs.getResultSet();
                    break;
                } else {
                    rowsAffected = cs.getUpdateCount();
                }
                results = cs.getMoreResults();
            }*/
            
            //rst = cs.getResultSet();
            /*while (rst.next()) {
                objRtn = new AuditFilter();
                objRtn.MODULE = rst.getString("MODULE").trim();
                objRtn.SUB_MODULE = rst.getString("SUB_MODULE").trim();
                objRtn.STATUS = rst.getString("STATUS").trim();
                objRtn.DATE_CREATE = rst.getString("DATE_CREATE").trim();                  
            }   */      
            
        } catch (Exception e) {
            System.out.println("Mensaje USP_BI_REPORTE_MODULE_SEL: " + e.getMessage());
        } finally {
            setClose();
        }

        return objRtn;

    }

   
    private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
