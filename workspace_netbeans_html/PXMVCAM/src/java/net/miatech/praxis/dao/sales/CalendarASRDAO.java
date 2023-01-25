package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import static com.ibm.as400.data.PcmlMessageLog.logError;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.miatech.beans.PX034S01A1527Filter;
import net.miatech.beans.PX036S01A1528Filter;
import net.miatech.beans.PX036S02A1527Filter;
import net.miatech.beans.PX036S02A1528Filter;
import net.miatech.beans.SQP00347Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CalendarASRDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public CalendarASRDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX036S01A1528Filter> loadPX036S01A1528(PX036S01A1528Filter filter) {
        List<PX036S01A1528Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1528Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;
        
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX036S01A1528(?,?,?,?,?)}";
            
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }else{
               PAGINIT = 1;
            }
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(2, Types.INTEGER);
            cs.registerOutParameter(3, Types.INTEGER);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            
            cs.setString(1, filter.IN_A1528FPRO);
            cs.setInt(2, PAGINIT);
            cs.setInt(3, filter.page.PAGROW);
            cs.setInt(4, filter.page.TOTPAG);
            cs.setInt(5, filter.page.TOTROW);
                      
            cs.execute();

            filter.page.PAGNUM = cs.getInt(2);
            filter.page.PAGROW = cs.getInt(3);
            filter.page.TOTPAG = cs.getInt(4);
            filter.page.TOTROW = cs.getInt(5);
            
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
            while (rst.next()) {
                objRtn = new PX036S01A1528Filter();
                objRtn.NO = rst.getLong("NO");
                objRtn.A1528FPRO = Functions.getMonthConvertDate(rst.getString("A1528FPRO"));
                objRtn.A1528ANIO = rst.getString("A1528ANIO");
                objRtn.A1528CUART = rst.getString("A1528CUART");
                objRtn.QUARTER = rst.getString("QUARTER");
                objRtn.A1528PDIDM = rst.getString("A1528PDIDM");
                objRtn.A1528PDIDS = rst.getString("A1528PDIDS");
                objRtn.A1528PDIDC = rst.getString("A1528PDIDC");
                objRtn.PDIDC = rst.getString("PDIDC");
                objRtn.A1528PRDA = Functions.getMonthConvertDate(rst.getString("A1528PRDA"));
                objRtn.A1528CNULO = rst.getString("A1528CNULO");
                objRtn.A1528OBS = rst.getString("A1528OBS");
                objRtn.A1528USRIN = rst.getString("A1528USRIN");
                objRtn.A1528FECIN = rst.getString("A1528FECIN");
                objRtn.A1528HORIN = rst.getString("A1528HORIN");
                objRtn.A1528USRAC = rst.getString("A1528USRAC");
                objRtn.A1528FECAC = rst.getString("A1528FECAC");
                objRtn.A1528HORAC = rst.getString("A1528HORAC");
                
                objRtn.page.PAGNUM = filter.page.PAGNUM/filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }        
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    public PX036S02A1528Filter  setPX036S02A1528( PX036S02A1528Filter filter, String strOption) {        
        //MANT. TABLA A1527: INSERT, UPDATE O DELETE.        
        strSQL = "{CALL PX036S02A1528(?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(11, Types.VARCHAR);
            cs.registerOutParameter(12, Types.VARCHAR);            
            cs.setString(1, strOption.trim());
            cs.setString(2, filter.A1528FPRO );
            cs.setString(3, filter.A1528ANIO );
            cs.setString(4, filter.A1528CUART);
            cs.setString(5, filter.A1528PDIDM);
            cs.setString(6, filter.A1528PDIDS);            
            cs.setString(7, filter.A1528PDIDC);
            cs.setString(8, filter.A1528PRDA);
            cs.setString(9, filter.A1528CNULO);
            cs.setString(10, filter.A1528OBS.trim());            
            cs.execute();                        
            filter.dbException.SQLCODE = cs.getString(11);
            filter.dbException.MESSAGE = cs.getString(12);                        
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }
        return filter;
    }
    
    public void setSQP00347(SQP00347Filter filter) {
        strSQL = "{CALL SQP00347(?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(2, Types.INTEGER);
            cs.setString(1, filter.IN_YEAR);
            cs.execute();                        
            filter.OU_STAT = cs.getInt(2);
        }catch(Exception e){ 
            System.out.println("Mensaje: " + e.getMessage());
        }finally {
            setClose();
        }
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
