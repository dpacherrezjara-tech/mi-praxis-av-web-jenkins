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
import net.miatech.beans.PX036S02A1527Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CalendarARCDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public CalendarARCDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX034S01A1527Filter> loadPX034S01A1527(PX034S01A1527Filter filter) {
        List<PX034S01A1527Filter> lstRtn = new ArrayList<>(0);
        PX034S01A1527Filter objRtn;

        strSQL = "{CALL PX034S01A1527(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(3, Types.INTEGER);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            
            cs.setInt(1, filter.IN_TFILTER);
            cs.setString(2, filter.IN_A1527PPED);
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
                objRtn = new PX034S01A1527Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1527PPED = Functions.getMonthConvertDate(rst.getString("A1527PPED"));
                objRtn.PPED = Functions.getMonthConvertDate(rst.getString("A1527PPED"));
                objRtn.QUARTER = rst.getString("QUARTER");
                objRtn.A1527ANIO = rst.getString("A1527ANIO");
                objRtn.A1527CUART = rst.getString("A1527CUART");
                objRtn.A1527PDIDM = rst.getString("A1527PDIDM");
                objRtn.A1527PDIDS = rst.getString("A1527PDIDS");
                objRtn.A1527PDIDC = rst.getString("A1527PDIDC");
                objRtn.PDIDC = rst.getString("PDIDC");
                objRtn.A1527SODA =  Functions.getMonthConvertDate(rst.getString("A1527SODA"));
                objRtn.A1527CINTA = Functions.getMonthConvertDate(rst.getString("A1527CINTA"));
                objRtn.A1527DESEM = Functions.getMonthConvertDate(rst.getString("A1527DESEM"));
                objRtn.A1527CNULO = rst.getString("A1527CNULO");
                objRtn.A1527OBS = rst.getString("A1527OBS");
                objRtn.A1527USRIN = rst.getString("A1527USRIN");
                objRtn.A1527FECIN = Functions.getMonthConvertDate(rst.getString("A1527FECIN"));
                objRtn.A1527HORIN = Functions.ConvertedTime(rst.getString("A1527HORIN"));
                objRtn.A1527USRAC = rst.getString("A1527USRAC");
                objRtn.A1527FECAC = Functions.getMonthConvertDate(rst.getString("A1527FECAC"));
                objRtn.A1527HORAC = Functions.ConvertedTime(rst.getString("A1527HORAC"));
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (SQLException ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        }finally {
            setClose();
        }
        return lstRtn;
    }
    
    public PX036S02A1527Filter  setPX036S02A1527(PX036S02A1527Filter filter, String strOption) {        
        //MANT. TABLA A1527: INSERT, UPDATE O DELETE.        
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX036S02A1527(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(13, Types.VARCHAR);
            cs.registerOutParameter(14, Types.VARCHAR);
            
            cs.setString(1, strOption.trim());
            cs.setString(2, filter.A1527PPED );
            cs.setString(3, filter.A1527ANIO );
            cs.setString(4, filter.A1527CUART);
            cs.setString(5, filter.A1527PDIDM);
            cs.setString(6, filter.A1527PDIDS);            
            cs.setString(7, filter.A1527PDIDC);
            cs.setString(8, filter.A1527SODA);
            cs.setString(9, filter.A1527CINTA);
            cs.setString(10, filter.A1527DESEM);
            cs.setString(11, filter.A1527CNULO);
            cs.setString(12, filter.A1527OBS.trim() );                                                
            cs.execute();                        
            filter.dbException.SQLCODE = cs.getString(13);
            filter.dbException.MESSAGE = cs.getString(14);                        
        } catch (SQLException ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }
        return filter;
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
