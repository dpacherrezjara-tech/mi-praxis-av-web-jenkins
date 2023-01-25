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
import net.miatech.beans.PX019S01A1633Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.springframework.ui.ModelMap;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class TourCodeDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public TourCodeDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX019S01A1633Filter> loadPX019S01A1633(PX019S01A1633Filter filter, ModelMap map) {
        List<PX019S01A1633Filter> lstRtn = new ArrayList<>(0);
        PX019S01A1633Filter objRtn;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX019S01A1633(?,?,?,?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(3, Types.INTEGER);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);

            cs.setString(1, filter.IN_CAMPO);
            cs.setString(2, filter.IN_VALOR);
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
                objRtn = new PX019S01A1633Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.IDTARIFA = rst.getInt("IDTARIFA");
                objRtn.IDTYPEIT = rst.getInt("IDTYPEIT");
                objRtn.TYPEIT = rst.getString("TYPEIT");
                objRtn.IDSUBTYPEI = rst.getInt("IDSUBTYPEI");
                objRtn.SUBTYPEIT = rst.getString("SUBTYPEIT");
                objRtn.CODEIT = rst.getString("CODEIT");
                objRtn.VIGEITFROM = rst.getString("VIGEITFROM");
                objRtn.VIGEITTO = rst.getString("VIGEITTO");
                objRtn.IDMOTIVO = rst.getInt("IDMOTIVO");
                objRtn.DESCRIPMOT = rst.getString("DESCRIPMOT");
                objRtn.CLAVERESER = rst.getString("CLAVERESER");
                objRtn.COMISIONAB = rst.getInt("COMISIONAB");
                objRtn.PORCENTCOM = rst.getDouble("PORCENTCOM");
                objRtn.LOCATION = rst.getString("LOCATION");
                objRtn.COMENTARIO = rst.getString("COMENTARIO");
                objRtn.RESTRICT = rst.getString("RESTRICT");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
            map.put("msj", ex.getMessage());
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
