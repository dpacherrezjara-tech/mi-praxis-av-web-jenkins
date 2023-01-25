package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX139S01A1773Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSACommissionConditionsDAO {

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

    public List<PX139S01A1773Filter> loadPX139S01A1773(PX139S01A1773Filter filter) throws SQLException, Exception {
        List<PX139S01A1773Filter> lstRtn = new ArrayList<>(0);
        PX139S01A1773Filter objRtn;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX139S01A1773(?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setInt(1, filter.IN_TFILTER);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.IN_GSA);
            cs.setString(4, filter.IN_PAIS);
            cs.setString(5, filter.IN_CITY);
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
                objRtn = new PX139S01A1773Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1773CCUST = rst.getString("A1773CCUST");
                objRtn.A1773GSA = rst.getString("A1773GSA");
                objRtn.A1773AREA = rst.getString("A1773AREA");
                objRtn.A1773PAIS = rst.getString("A1773PAIS");
                objRtn.A1773CITY = rst.getString("A1773CITY");
                objRtn.A1773CBSP = rst.getDouble("A1773CBSP");
                objRtn.A1773CASR = rst.getDouble("A1773CASR");
                objRtn.A1773FOP = rst.getString("A1773FOP");
                objRtn.A1773EXC = rst.getString("A1773EXC");
                objRtn.A1773FIVIG = rst.getString("A1773FIVIG");
                objRtn.A1773FFVIG = rst.getString("A1773FFVIG");
                objRtn.A1773REGIS = rst.getString("A1773REGIS");
                objRtn.A1773FREGI = rst.getString("A1773FREGI");
                objRtn.A1773HREGI = rst.getString("A1773HREGI");
                objRtn.A1773REVIS = rst.getString("A1773REVIS");
                objRtn.A1773FREVI = rst.getString("A1773FREVI");
                objRtn.A1773HREVI = rst.getString("A1773HREVI");
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
