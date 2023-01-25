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
import net.miatech.beans.PX033S01A864Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class DiscountTypeDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public DiscountTypeDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX033S01A864Filter> loadPX033S01A864(PX033S01A864Filter filter) {
        List<PX033S01A864Filter> lstRtn = new ArrayList<>(0);
        PX033S01A864Filter objRtn;

        strSQL = "{CALL PX033S01A864(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(3, Types.INTEGER);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);

            cs.setInt(1, filter.IN_TFILTER);
            cs.setString(2, filter.IN_A864TIPO);
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
                objRtn = new PX033S01A864Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A864TIPO = rst.getString("A864TIPO");
                objRtn.A864DESC = rst.getString("A864DESC");
                objRtn.A864IND1 = rst.getString("A864IND1");
                objRtn.A864IND2 = rst.getString("A864IND2");
                objRtn.A864IND3 = rst.getString("A864IND3");
                objRtn.A864USAR = rst.getString("A864USAR");
                objRtn.A864FING = rst.getString("A864FING");
                objRtn.A864HING = rst.getString("A864HING");
                objRtn.A864TING = rst.getString("A864TING");
                objRtn.A864USARM = rst.getString("A864USARM");
                objRtn.A864FMOD = rst.getString("A864FMOD");
                objRtn.A864HMOD = rst.getString("A864HMOD");
                objRtn.A864TMOD = rst.getString("A864TMOD");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
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
