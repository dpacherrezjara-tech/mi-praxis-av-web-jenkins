package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX133S01A1777Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSAIncentiveSummaryDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX133S01A1777Filter> loadPX133S01A1777(PX133S01A1777Filter filter) throws SQLException, Exception {
        List<PX133S01A1777Filter> lstRtn = new ArrayList<>(0);
        PX133S01A1777Filter objRtn;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX133S01A1777(?,?,?,?,?,?,?,?,?)}";
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setInt(1, filter.IN_TFILTER);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.IN_GSA);
            cs.setString(4, filter.IN_AAMM_F);
            cs.setString(5, filter.IN_AAMM_T);
            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);
            
            cs.execute();

            filter.page.PAGNUM = cs.getInt(6);
            filter.page.PAGROW = cs.getInt(7);
            filter.page.TOTPAG = cs.getInt(8);
            filter.page.TOTROW = cs.getInt(9);
            
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX133S01A1777Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1777CCUST = rst.getString("A1777CCUST");
                objRtn.A1777GSA = rst.getString("A1777GSA");
                objRtn.A1777AREA = rst.getString("A1777AREA");
                objRtn.A1777PAIS = rst.getString("A1777PAIS");
                objRtn.A1777CITY = rst.getString("A1777CITY");
                objRtn.A1777AAMM = rst.getString("A1777AAMM");
                objRtn.A1777MORIG = rst.getString("A1777MORIG");
                objRtn.A1777VTBSP = rst.getDouble("A1777VTBSP");
                objRtn.A1777VTGSA = rst.getDouble("A1777VTGSA");
                objRtn.A1777VTINT = rst.getDouble("A1777VTINT");
                objRtn.A1777CUOTA = rst.getDouble("A1777CUOTA");
                objRtn.A1777MCAMB = rst.getString("A1777MCAMB");
                objRtn.A1777TCAMB = rst.getDouble("A1777TCAMB");
                objRtn.A1777BSPMC = rst.getDouble("A1777BSPMC");
                objRtn.A1777GSAMC = rst.getDouble("A1777GSAMC");
                objRtn.A1777INTMC = rst.getDouble("A1777INTMC");
                objRtn.A1777CUOMC = rst.getDouble("A1777CUOMC");
                objRtn.A1777APLA = rst.getString("A1777APLA");
                objRtn.A1777APLM = rst.getString("A1777APLM");
                objRtn.A1777REGIS = rst.getString("A1777REGIS");
                objRtn.A1777FREGI = rst.getString("A1777FREGI");
                objRtn.A1777HREGI = rst.getString("A1777HREGI");
                objRtn.A1777REVIS = rst.getString("A1777REVIS");
                objRtn.A1777FREVI = rst.getString("A1777FREVI");
                objRtn.A1777HREVI = rst.getString("A1777HREVI");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
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
