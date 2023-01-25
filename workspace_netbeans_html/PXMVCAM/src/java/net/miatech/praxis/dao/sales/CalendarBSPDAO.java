package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
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
import net.miatech.beans.PX036S01A1529Filter;
import net.miatech.beans.PX036S02A1529Filter;
import net.miatech.beans.SQP02284Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CalendarBSPDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public CalendarBSPDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX036S01A1529Filter> loadPX036S01A1529(PX036S01A1529Filter filter) {
        List<PX036S01A1529Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1529Filter objRtn;
        strSQL = "{CALL PX036S01A1529(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(3, Types.INTEGER);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);            
            cs.setString(1, filter.IN_A1529ISOC);
            cs.setString(2, filter.IN_A1529ANIO);
            cs.setInt(3, filter.page.PAGNUM);
            cs.setInt(4, filter.page.PAGROW);
            cs.setInt(5, filter.page.TOTPAG);
            cs.setInt(6, filter.page.TOTROW);            
            cs.execute();
            filter.page.PAGNUM = cs.getInt(3);
            filter.page.PAGROW = cs.getInt(4);
            filter.page.TOTPAG = cs.getInt(5);
            filter.page.TOTROW = cs.getInt(6);            
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX036S01A1529Filter();
                objRtn.NO = rst.getLong("NO");
                objRtn.A1529ANIO = rst.getString("A1529ANIO");
                objRtn.A1529BAED = Functions.getMonthConvertDate(rst.getString("A1529BAED"));
                objRtn.A1529BAGT = Functions.getMonthConvertDate(rst.getString("A1529BAGT"));
                objRtn.A1529BAIR = Functions.getMonthConvertDate(rst.getString("A1529BAIR"));
                objRtn.A1529CLOS = rst.getString("A1529CLOS");
                objRtn.A1529CNULO = rst.getString("A1529CNULO");
                objRtn.A1529CUART = rst.getString("A1529CUART");
                objRtn.QUARTER = rst.getString("QUARTER");
                objRtn.A1529CUTO = Functions.getMonthConvertDate(rst.getString("A1529CUTO"));
                objRtn.A1529DIST = rst.getString("A1529DIST");
                objRtn.A1529FECAC = rst.getString("A1529FECAC");
                objRtn.A1529FECIN = rst.getString("A1529FECIN");
                objRtn.A1529HORAC = rst.getString("A1529HORAC");
                objRtn.A1529HORIN = rst.getString("A1529HORIN");
                objRtn.A1529ISOC = rst.getString("A1529ISOC");
                objRtn.A1529LADM = rst.getString("A1529LADM");                
                objRtn.A1529OBS = rst.getString("A1529OBS");                
                objRtn.A1529PCYC = rst.getString("A1529PCYC");
                objRtn.PCYC = rst.getString("PCYC");
                objRtn.A1529PDAIM = rst.getString("A1529PDAIM");                
                objRtn.A1529PDAIS = rst.getString("A1529PDAIS");                
                objRtn.A1529PERI = rst.getString("A1529PERI");                
                objRtn.A1529PRDA = Functions.getMonthConvertDate(rst.getString("A1529PRDA"));                
                objRtn.A1529REMQ = rst.getString("A1529REMQ");                
                objRtn.A1529REMW = Functions.getMonthConvertDate(rst.getString("A1529REMW"));                
                objRtn.A1529RPTO = Functions.getMonthConvertDate(rst.getString("A1529RPTO"));                
                objRtn.A1529SETF = rst.getString("A1529SETF");                
                objRtn.A1529SETM = rst.getString("A1529SETM");                
                objRtn.A1529SETW = Functions.getMonthConvertDate(rst.getString("A1529SETW"));                
                objRtn.A1529SUBM = rst.getString("A1529SUBM");                
                objRtn.A1529USRAC = rst.getString("A1529USRAC");                
                objRtn.A1529USRIN = rst.getString("A1529USRIN");                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                objRtn.A1529MESB = rst.getString("A1529MESB");
                lstRtn.add(objRtn);
            }
        } catch (SQLException ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    public PX036S02A1529Filter  setPX036S02A1529(PX036S02A1529Filter filter, String strOption) {        
        //MANT. TABLA A1527: INSERT, UPDATE O DELETE.        
        strSQL = "{CALL PX036S02A1529(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(27, Types.VARCHAR);
            cs.registerOutParameter(28, Types.VARCHAR);
            cs.setString(1, strOption.trim());
            cs.setString(2, filter.A1529ISOC );
            cs.setString(3, filter.A1529BAED );
            cs.setString(4, filter.A1529PERI);
            cs.setString(5, filter.A1529RPTO);
            cs.setString(6, filter.A1529ANIO);            
            cs.setString(7, filter.A1529CUART);
            cs.setString(8, filter.A1529PDAIM);
            cs.setString(9, filter.A1529PDAIS);
            cs.setString(10, filter.A1529PCYC);
            cs.setString(11, filter.A1529PRDA);
            cs.setString(12, filter.A1529CUTO);
            cs.setString(13, filter.A1529LADM);
            cs.setString(14, filter.A1529CLOS);
            cs.setString(15, filter.A1529SUBM);
            cs.setString(16, filter.A1529BAIR);
            cs.setString(17, filter.A1529BAGT);
            cs.setString(18, filter.A1529REMW);
            cs.setString(19, filter.A1529REMQ);
            cs.setString(20, filter.A1529SETW);
            cs.setString(21, filter.A1529SETF);
            cs.setString(22, filter.A1529SETM);
            cs.setString(23, filter.A1529DIST);
            cs.setString(24, filter.A1529CNULO);
            cs.setString(25, filter.A1529OBS.trim());
            cs.setString(26, filter.A1529MESB.trim());
            cs.execute();                        
            filter.dbException.SQLCODE = cs.getString(27);
            filter.dbException.MESSAGE = cs.getString(28);                        
        }
        catch(Exception e) { 
            System.out.println("Mensaje: " + e.getMessage());
        }
        finally {
            setClose();
        }
        return filter;
    }
    
    public void setSQP02284(SQP02284Filter filter) {
        strSQL = "{CALL PRAXIS.SQP02284(?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(4, Types.VARCHAR);
            cs.registerOutParameter(5, Types.VARCHAR);
            cs.setString(1, filter.IN_A1529ISOC);
            cs.setString(2, filter.IN_A1529ANIO);
            cs.setString(3, filter.IN_ISOCTO);
            cs.execute();
            filter.dbException.SQLCODE = cs.getString(4);
            filter.dbException.MESSAGE = cs.getString(5);                        
        } catch (SQLException ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
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
