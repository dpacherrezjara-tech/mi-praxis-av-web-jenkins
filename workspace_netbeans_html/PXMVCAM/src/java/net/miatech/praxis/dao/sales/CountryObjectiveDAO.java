package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX175S01A1841Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class CountryObjectiveDAO {

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

    public List<PX175S01A1841Filter> loadPX175S01A1841(PX175S01A1841Filter filter) throws SQLException, Exception {
        List<PX175S01A1841Filter> lstRtn = new ArrayList<>(0);
        PX175S01A1841Filter objRtn;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX175S01A1841(?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setInt(1, filter.IN_TFILTER);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.IN_GSA);
            cs.setString(4, filter.IN_AREA);
            cs.setString(5, filter.IN_PAIS);
            cs.setString(6, filter.IN_YEAR);
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
                objRtn = new PX175S01A1841Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1841CCUST = rst.getString("A1841CCUST");
                objRtn.A1841GSA = rst.getString("A1841GSA");
                objRtn.A1841AREA = rst.getString("A1841AREA");
                objRtn.A1841PAIS = rst.getString("A1841PAIS");
                objRtn.A1841YEAR = rst.getString("A1841YEAR");
                objRtn.A1841MPAG = rst.getString("A1841MPAG");
                objRtn.A1841TIPO = rst.getString("A1841TIPO");
                objRtn.A1841CUOTA = rst.getDouble("A1841CUOTA");
                objRtn.A1841CUO01 = rst.getDouble("A1841CUO01");
                objRtn.A1841CUO02 = rst.getDouble("A1841CUO02");
                objRtn.A1841CUO03 = rst.getDouble("A1841CUO03");
                objRtn.A1841CUO04 = rst.getDouble("A1841CUO04");
                objRtn.A1841CUO05 = rst.getDouble("A1841CUO05");
                objRtn.A1841CUO06 = rst.getDouble("A1841CUO06");
                objRtn.A1841CUO07 = rst.getDouble("A1841CUO07");
                objRtn.A1841CUO08 = rst.getDouble("A1841CUO08");
                objRtn.A1841CUO09 = rst.getDouble("A1841CUO09");
                objRtn.A1841CUO10 = rst.getDouble("A1841CUO10");
                objRtn.A1841CUO11 = rst.getDouble("A1841CUO11");
                objRtn.A1841CUO12 = rst.getDouble("A1841CUO12");
                objRtn.A1841REGIS = rst.getString("A1841REGIS");
                objRtn.A1841FREGI = rst.getString("A1841FREGI");
                objRtn.A1841HREGI = rst.getString("A1841HREGI");
                objRtn.A1841REVIS = rst.getString("A1841REVIS");
                objRtn.A1841FREVI = rst.getString("A1841FREVI");
                objRtn.A1841HREVI = rst.getString("A1841HREVI");
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
