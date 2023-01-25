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
import net.miatech.beans.PX019S01A856Filter;
import net.miatech.beans.PX023S01A128Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A128;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class ProvisosDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public ProvisosDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX019S01A856Filter> loadPX019S01A856(PX019S01A856Filter filter) {
        List<PX019S01A856Filter> lstRtn = new ArrayList<>(0);
        PX019S01A856Filter objRtn;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX019S03A856(?,?,?,?,?,?,?,?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            
            cs.setString(1, filter.IN_A856LINAER);
            cs.setString(2, filter.IN_A856VIGDES);
            cs.setString(3, filter.IN_A856TIPTAR);
            cs.setString(4, filter.IN_A856CLASE);
            cs.setString(5, filter.IN_A856TRADES);
            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);
            cs.setString(10, filter.A856TRAHAS);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(6);
            filter.page.PAGROW = cs.getInt(7);
            filter.page.TOTPAG = cs.getInt(8);
            filter.page.TOTROW = cs.getInt(9);

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX019S01A856Filter(); 
                objRtn.NO = rst.getInt("NO");
                objRtn.A856LINAER = rst.getString("A856LINAER");
                objRtn.A856VIGDES = rst.getString("A856VIGDES");
                objRtn.A856TIPTAR = rst.getString("A856TIPTAR");
                objRtn.A856CLASE = rst.getString("A856CLASE");
                objRtn.A856TRADES = rst.getString("A856TRADES");
                objRtn.A856TRAHAS = rst.getString("A856TRAHAS");                
                objRtn.A856PORCEN = rst.getDouble("A856PORCEN");
                objRtn.A856IMPORT = rst.getDouble("A856IMPORT");
                objRtn.A856ATBPDE = rst.getString("A856ATBPDE");
                objRtn.A856ATBPHA = rst.getString("A856ATBPHA");
                objRtn.A856MONEDA = rst.getString("A856MONEDA");
                objRtn.A856SUBPAR = rst.getString("A856SUBPAR");
                objRtn.A856CODSHA = rst.getString("A856CODSHA");
                objRtn.A856DESADI = rst.getString("A856DESADI");
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            System.out.println("Mensaje: " + e.getMessage());
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
