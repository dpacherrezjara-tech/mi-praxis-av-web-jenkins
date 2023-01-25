package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX182S01A1848Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSAIncentiveIncentiveDAO {

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

    public List<PX182S01A1848Filter> loadPX182S01A1848(PX182S01A1848Filter filter) throws SQLException, Exception {
        List<PX182S01A1848Filter> lstRtn = new ArrayList<>(0);
        PX182S01A1848Filter objRtn;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX182S01A1848(?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setInt(1, filter.IN_TFILTER);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.IN_GSA);
            cs.setString(4, filter.IN_PAIS);
            cs.setString(5, filter.IN_LOTE);
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
                objRtn = new PX182S01A1848Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1848CCUST = rst.getString("A1848CCUST");
                objRtn.A1848GSA = rst.getString("A1848GSA");
                objRtn.A1848PAIS = rst.getString("A1848PAIS");
                objRtn.A1848LOTE = rst.getString("A1848LOTE");
                objRtn.A1848FINI = rst.getString("A1848FINI");
                objRtn.A1848FFIN = rst.getString("A1848FFIN");
                objRtn.A1848APLA = rst.getString("A1848APLA");
                objRtn.A1848APLM = rst.getString("A1848APLM");
                objRtn.A1848STAT = rst.getString("A1848STAT");
                objRtn.A1848UENV = rst.getString("A1848UENV");
                objRtn.A1848FENV = rst.getString("A1848FENV");
                objRtn.A1848HENV = rst.getString("A1848HENV");
                objRtn.A1848STRC = rst.getString("A1848STRC");
                objRtn.A1848UREC = rst.getString("A1848UREC");
                objRtn.A1848FREC = rst.getString("A1848FREC");
                objRtn.A1848HREC = rst.getString("A1848HREC");
                objRtn.A1848MCAMB = rst.getString("A1848MCAMB");
                objRtn.A1848BSPMC = rst.getDouble("A1848BSPMC");
                objRtn.A1848GSAMC = rst.getDouble("A1848GSAMC");
                objRtn.A1848INTMC = rst.getDouble("A1848INTMC");
                objRtn.A1848CUOMC = rst.getDouble("A1848CUOMC");
                objRtn.A1848EXCED = rst.getDouble("A1848EXCED");
                objRtn.A1848COMA = rst.getDouble("A1848COMA");
                objRtn.A1848INCEN = rst.getDouble("A1848INCEN");
                objRtn.A1848MPAG = rst.getString("A1848MPAG");
                objRtn.A1848TCPAG = rst.getDouble("A1848TCPAG");
                objRtn.A1848INPAG = rst.getDouble("A1848INPAG");
                objRtn.A1848REGIS = rst.getString("A1848REGIS");
                objRtn.A1848FREGI = rst.getString("A1848FREGI");
                objRtn.A1848HREGI = rst.getString("A1848HREGI");
                objRtn.A1848REVIS = rst.getString("A1848REVIS");
                objRtn.A1848FREVI = rst.getString("A1848FREVI");
                objRtn.A1848HREVI = rst.getString("A1848HREVI");
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
