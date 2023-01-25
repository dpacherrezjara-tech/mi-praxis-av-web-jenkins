package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX132S01A1774Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSAIncentiveConditionsDAO {

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

    public List<PX132S01A1774Filter> loadPX132S01A1774(PX132S01A1774Filter filter) throws SQLException, Exception {
        List<PX132S01A1774Filter> lstRtn = new ArrayList<>(0);
        PX132S01A1774Filter objRtn;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX132S01A1774(?,?,?,?,?,?,?,?,?)}";
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
                objRtn = new PX132S01A1774Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1774CCUST = rst.getString("A1774CCUST");
                objRtn.A1774GSA = rst.getString("A1774GSA");
                objRtn.A1774AREA = rst.getString("A1774AREA");
                objRtn.A1774PAIS = rst.getString("A1774PAIS");
                objRtn.A1774CITY = rst.getString("A1774CITY");
                objRtn.A1774RINI = rst.getDouble("A1774RINI");
                objRtn.A1774RFIN = rst.getDouble("A1774RFIN");
                objRtn.A1774COMA = rst.getDouble("A1774COMA");
                objRtn.A1774COMM = rst.getDouble("A1774COMM");
                objRtn.A1774APLA = rst.getString("A1774APLA");
                objRtn.A1774APLM = rst.getString("A1774APLM");
                objRtn.A1774EXC = rst.getString("A1774EXC");
                objRtn.A1774FIVIG = rst.getString("A1774FIVIG");
                objRtn.A1774FFVIG = rst.getString("A1774FFVIG");
                objRtn.A1774REGIS = rst.getString("A1774REGIS");
                objRtn.A1774FREGI = rst.getString("A1774FREGI");
                objRtn.A1774HREGI = rst.getString("A1774HREGI");
                objRtn.A1774REVIS = rst.getString("A1774REVIS");
                objRtn.A1774FREVI = rst.getString("A1774FREVI");
                objRtn.A1774HREVI = rst.getString("A1774HREVI");
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
