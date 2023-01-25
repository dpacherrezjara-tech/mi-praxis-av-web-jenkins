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
import net.miatech.beans.PX113S01A1772Filter;
import net.miatech.beans.PX113S02A1772Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class MasterEMDSubcodeDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public MasterEMDSubcodeDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX113S01A1772Filter> loadPX113S01A1772(PX113S01A1772Filter filter) {
        List<PX113S01A1772Filter> lstRtn = new ArrayList<>(0);
        PX113S01A1772Filter objRtn;

        strSQL = "{CALL PX113S01A1772(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(3, Types.INTEGER);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            
            cs.setString(1, filter.VP_A1772SUBCD);
            cs.setString(2, filter.VP_A1772RFIC);            
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
                objRtn = new PX113S01A1772Filter();                
                objRtn.A1772EMD = rst.getString("A1772EMD").trim();
                objRtn.A1772FEE = rst.getString("A1772FEE").trim();
                objRtn.A1772FFVIG = rst.getString("A1772FFVIG").trim();
                objRtn.A1772FIVIG = rst.getString("A1772FIVIG").trim();
                objRtn.A1772FREGI = rst.getString("A1772FREGI").trim();
                objRtn.A1772FREVI = rst.getString("A1772FREVI").trim();
                objRtn.A1772GRUPO = rst.getString("A1772GRUPO").trim();
                objRtn.A1772HREGI = rst.getString("A1772HREGI").trim();
                objRtn.A1772HREVI = rst.getString("A1772HREVI").trim();
                objRtn.A1772REGIS = rst.getString("A1772REGIS").trim();
                objRtn.A1772REVIS = rst.getString("A1772REVIS").trim();                
                objRtn.A1772RFIC = rst.getString("A1772RFIC").trim();
                objRtn.A1772SGRUP = rst.getString("A1772SGRUP").trim();
                objRtn.A1772SUBCD = rst.getString("A1772SUBCD").trim();
                //Pagin
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (SQLException e) {
            System.out.println("Mensaje: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Mensaje: " + e.getMessage());
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public PX113S02A1772Filter setPX113S02A1772(PX113S02A1772Filter filter) {        
        strSQL = "{CALL PX113S02A1772(?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(10, Types.VARCHAR);
            cs.registerOutParameter(11, Types.VARCHAR);           
            cs.setString(1, filter.VP_ACTION);
            cs.setString(2, filter.VP_A1772FEE);
            cs.setString(3, filter.VP_A1772GRUPO);
            cs.setString(4, filter.VP_A1772EMD);
            cs.setString(5, filter.VP_A1772SGRUP);
            cs.setString(6, filter.VP_A1772RFIC);
            cs.setString(7, filter.VP_A1772SUBCD);
            cs.setString(8, filter.VP_A1772FIVIG);
            cs.setString(9, filter.VP_A1772FFVIG);                       
            cs.execute();
            filter.dbException.SQLCODE = cs.getString(10);
            filter.dbException.MESSAGE = cs.getString(11); 
            
        } catch (SQLException e) {
            System.out.println("Mensaje: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Mensaje: " + e.getMessage());
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
