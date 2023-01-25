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
import net.miatech.beans.PX113S01A1772Filter;
import net.miatech.beans.PX113S02A1772Filter;
import net.miatech.beans.SQP00904Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class BundlesReportDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public BundlesReportDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<SQP00904Filter> loadSQP00904(SQP00904Filter filter) {
        List<SQP00904Filter> lstRtn = new ArrayList<>(0);
        SQP00904Filter objRtn;

        strSQL = "{CALL PRAXIS.SQP00904(?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_TFILTER);
            cs.setString(3, filter.A2540CIA);
            cs.setString(4, filter.IN_TKT);

            cs.setInt(5, filter.page.PAGNUM);
            cs.setInt(6, filter.page.PAGROW);
            cs.setInt(7, filter.page.TOTPAG);
            cs.setInt(8, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(5);
            filter.page.PAGROW = cs.getInt(6);
            filter.page.TOTPAG = cs.getInt(7);
            filter.page.TOTROW = cs.getInt(8);

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new SQP00904Filter();

                objRtn.A2540CIA = rst.getString("A2540CIA");
                objRtn.TKT = rst.getString("TKT");
                objRtn.A2540CUPON = rst.getString("A2540CUPON");
                objRtn.A2540GRUPO = rst.getString("A2540GRUPO");
                objRtn.A2540BRFIS = rst.getString("A2540BRFIS");
                objRtn.A2540SEQBD = rst.getString("A2540SEQBD");
                objRtn.A2540ARFIS = rst.getString("A2540ARFIS");
                objRtn.A2540PORCA = rst.getDouble("A2540PORCA");
                objRtn.A2540MDABD = rst.getString("A2540MDABD");
                objRtn.A2540VALOL = rst.getDouble("A2540VALOL");
                objRtn.A2540VANCL = rst.getDouble("A2540VANCL");

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
