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
import net.miatech.beans.PX019S01A725Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class PanicValueDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public PanicValueDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX019S01A725Filter> loadPX019S01A725(PX019S01A725Filter filter) {
        List<PX019S01A725Filter> lstRtn = new ArrayList<>(0);
        PX019S01A725Filter objRtn;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX019S01A725(?,?,?,?,?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setInt(1, filter.IN_OPCION);
            cs.setString(2, filter.IN_TREGI);
            cs.setString(3, filter.IN_FREGIS);
            cs.setInt(4, filter.page.PAGNUM);
            cs.setInt(5, filter.page.PAGROW);
            cs.setInt(6, filter.page.TOTPAG);
            cs.setInt(7, filter.page.TOTROW);
            
            cs.execute();

            filter.page.PAGNUM = cs.getInt(4);
            filter.page.PAGROW = cs.getInt(5);
            filter.page.TOTPAG = cs.getInt(6);
            filter.page.TOTROW = cs.getInt(7);
            
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX019S01A725Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A725TREGI = rst.getString("A725TREGI");
                objRtn.A725FDESDE = rst.getString("A725FDESDE");
                objRtn.A725FHASTA = rst.getString("A725FHASTA");
                objRtn.A725TARIFD = rst.getDouble("A725TARIFD");
                objRtn.A725TARIFA = rst.getDouble("A725TARIFA");
                objRtn.A725EQPAGD = rst.getDouble("A725EQPAGD");
                objRtn.A725EQPAGA = rst.getDouble("A725EQPAGA");
                objRtn.A725TCAMBD = rst.getDouble("A725TCAMBD");
                objRtn.A725TCAMBA = rst.getDouble("A725TCAMBA");
                objRtn.A725TFNUCD = rst.getDouble("A725TFNUCD");
                objRtn.A725TFNUCA = rst.getDouble("A725TFNUCA");
                objRtn.A725ROED = rst.getDouble("A725ROED");
                objRtn.A725ROEA = rst.getDouble("A725ROEA");
                objRtn.A725PRDESD = rst.getDouble("A725PRDESD");
                objRtn.A725PRDESA = rst.getDouble("A725PRDESA");
                objRtn.A725CSVERD = rst.getDouble("A725CSVERD");
                objRtn.A725CSVERA = rst.getDouble("A725CSVERA");
                objRtn.A725PLUSSD = rst.getDouble("A725PLUSSD");
                objRtn.A725PLUSSA = rst.getDouble("A725PLUSSA");
                objRtn.A725FARED = rst.getDouble("A725FARED");
                objRtn.A725FAREA = rst.getDouble("A725FAREA");
                objRtn.A725ACUERD = rst.getDouble("A725ACUERD");
                objRtn.A725ACUERA = rst.getDouble("A725ACUERA");
                objRtn.A725DIFGRO = rst.getDouble("A725DIFGRO");
                objRtn.A725DIFTAX = rst.getDouble("A725DIFTAX");
                objRtn.A725REGIST = rst.getString("A725REGIST");
                objRtn.A725FREGIS = rst.getString("A725FREGIS");
                objRtn.A725HREGIS = rst.getString("A725HREGIS");
                objRtn.A725REVISA = rst.getString("A725REVISA");
                objRtn.A725FREVIS = rst.getString("A725FREVIS");
                objRtn.A725HREVIS = rst.getString("A725HREVIS");
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
