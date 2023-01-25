package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxisbi.SQP01257;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class OracleAccountingReportDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public OracleAccountingReportDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP01257> loadSQP01257(SQP01257 filter) throws SQLException, Exception
    {
        List<SQP01257> lstRtn = new ArrayList<>(0);
        SQP01257 objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        strSQL = "{CALL PRAXIS.SQP01257(?,?,?,?,?,?,?)}";

        try {
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
          
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cs.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cs.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cs.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_MODUL", filter.IN_MODULO);
            cs.setString("IN_FPROC", filter.IN_FECHA_PROCESO);

            cs.setInt("IO_PAGNUM", PAGINIT);
            cs.setInt("IO_PAGROW", totRowsPag);     
            cs.setInt("IO_TOTPAG", totRows);     
            cs.setInt("IO_TOTROW", filter.page.TOTROW); 

            cs.execute();
            
            filter.page.PAGNUM = cs.getInt("IO_PAGNUM");
            filter.page.PAGROW = cs.getInt("IO_PAGROW");
            filter.page.TOTPAG = cs.getInt("IO_TOTPAG");
            filter.page.TOTROW = cs.getInt("IO_TOTROW");
            
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
            
            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                objRtn = new SQP01257();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1955CCUST = rst.getString("A1955CCUST").trim();
                objRtn.A1955MODUL = rst.getString("A1955MODUL").trim();
                objRtn.A1955FPROC = rst.getString("A1955FPROC").trim();
                objRtn.A1955FECIN = rst.getString("A1955FECIN").trim();
                
                //Estados
                objRtn.N = rst.getInt("N");
                objRtn.P = rst.getInt("P");
                objRtn.Q = rst.getInt("Q");
                objRtn.C = rst.getInt("C");
                objRtn.X = rst.getInt("X");
                objRtn.E = rst.getInt("E");
                objRtn.VACIO = rst.getInt("VACIO");
                objRtn.TOTAL = rst.getInt("TOTAL");
                                
                objRtn.page.PAGNUM = filter.page.PAGNUM/filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }        
         } finally {
            setClose();
        }
         
         return lstRtn; 
    }
    
    public List<SQP01257> loadSQP01258(SQP01257 filter) throws SQLException, Exception
    {
        List<SQP01257> lstRtn = new ArrayList<>(0);
        SQP01257 objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        strSQL = "{CALL PRAXIS.SQP01258(?,?,?,?,?)}";
        try {
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
          
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cs = cnx.prepareCall(strSQL);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_MODUL", filter.A1955MODUL);
            cs.setString("IN_FPROC", filter.A1955FPROC);
            cs.setString("IN_FECIN", filter.A1955FECIN);
            cs.setString("IN_STATU", filter.A1955STATU);

            cs.execute();
            
            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                objRtn = new SQP01257();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1955CCUST = rst.getString("A1955CCUST").trim();
                objRtn.A1955MODUL = rst.getString("A1955MODUL").trim();
                objRtn.A1955FPROC = rst.getString("A1955FPROC").trim();
                objRtn.A1955TIPO = rst.getString("A1955TIPO").trim();
                objRtn.A1955FCONT = rst.getString("A1955FCONT").trim();
                objRtn.A1955FECAC = rst.getString("A1955FECAC").trim();
                objRtn.A1955FUENT = rst.getString("A1955FUENT").trim();
                objRtn.A1955KEY2 = rst.getString("A1955KEY2").trim();
                objRtn.A1955KEY3 = rst.getString("A1955KEY3").trim();
                                
                objRtn.page.PAGNUM = filter.page.PAGNUM/filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }        
         } finally {
            setClose();
        }
         
         return lstRtn; 
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
