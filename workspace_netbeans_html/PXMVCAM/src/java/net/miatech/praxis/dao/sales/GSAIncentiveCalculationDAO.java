package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX134S01A1778Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSAIncentiveCalculationDAO {

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

    public List<PX134S01A1778Filter> loadPX134S01A1778(PX134S01A1778Filter filter) throws SQLException, Exception {
        List<PX134S01A1778Filter> lstRtn = new ArrayList<>(0);
        PX134S01A1778Filter objRtn;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX134S01A1778(?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setInt(1, filter.IN_TFILTER);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.IN_GSA);
            cs.setString(4, filter.IN_YEAR_F);
            cs.setString(5, filter.IN_YEAR_T);
            cs.setString(6, filter.IN_FLAG_YM);
            cs.setInt(7, filter.page.PAGNUM);
            cs.setInt(8, filter.page.PAGROW);
            cs.setInt(9, filter.page.TOTPAG);
            cs.setInt(10, filter.page.TOTROW);
            
            cs.execute();

            filter.page.PAGNUM = cs.getInt(7);
            filter.page.PAGROW = cs.getInt(8);
            filter.page.TOTPAG = cs.getInt(9);
            filter.page.TOTROW = cs.getInt(10);
            
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX134S01A1778Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1778CCUST = rst.getString("A1778CCUST");
                objRtn.A1778GSA = rst.getString("A1778GSA");
                objRtn.A1778AREA = rst.getString("A1778AREA");
                objRtn.A1778PAIS = rst.getString("A1778PAIS");
                objRtn.A1778CITY = rst.getString("A1778CITY");
                objRtn.A1778YEAR = rst.getString("A1778YEAR");
                objRtn.A1778MES = rst.getString("A1778MES");
                objRtn.A1778MORIG = rst.getString("A1778MORIG");
                objRtn.A1778VTBSP = rst.getDouble("A1778VTBSP");
                objRtn.A1778VTGSA = rst.getDouble("A1778VTGSA");
                objRtn.A1778VTINT = rst.getDouble("A1778VTINT");
                objRtn.A1778TIPO = rst.getString("A1778TIPO");
                objRtn.A1778CUOTA = rst.getDouble("A1778CUOTA");
                objRtn.A1778MCAMB = rst.getString("A1778MCAMB");
                objRtn.A1778TCAMB = rst.getDouble("A1778TCAMB");
                objRtn.A1778BSPMC = rst.getDouble("A1778BSPMC");
                objRtn.A1778GSAMC = rst.getDouble("A1778GSAMC");
                objRtn.A1778INTMC = rst.getDouble("A1778INTMC");
                objRtn.A1778CUOMC = rst.getDouble("A1778CUOMC");
                objRtn.A1778EXCED = rst.getDouble("A1778EXCED");
                objRtn.A1778COMA = rst.getDouble("A1778COMA");
                objRtn.A1778INCEN = rst.getDouble("A1778INCEN");
                objRtn.A1778MPAG = rst.getString("A1778MPAG");
                objRtn.A1778TCPAG = rst.getDouble("A1778TCPAG");
                objRtn.A1778INPAG = rst.getDouble("A1778INPAG");
                objRtn.A1778APLA = rst.getString("A1778APLA");
                objRtn.A1778APLM = rst.getString("A1778APLM");
                objRtn.A1778REGIS = rst.getString("A1778REGIS");
                objRtn.A1778FREGI = rst.getString("A1778FREGI");
                objRtn.A1778HREGI = rst.getString("A1778HREGI");
                objRtn.A1778REVIS = rst.getString("A1778REVIS");
                objRtn.A1778FREVI = rst.getString("A1778FREVI");
                objRtn.A1778HREVI = rst.getString("A1778HREVI");
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
