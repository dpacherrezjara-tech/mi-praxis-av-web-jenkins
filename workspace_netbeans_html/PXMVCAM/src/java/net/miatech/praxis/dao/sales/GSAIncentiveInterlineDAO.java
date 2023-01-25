package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import net.miatech.beans.PX167S01WRF070Filter;
import net.miatech.beans.WRF070Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSAIncentiveInterlineDAO {

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

    public void loadPX167S01WRF070(PX167S01WRF070Filter filter) throws SQLException, Exception {
        filter.lstFilterRows.clear();
        WRF070Filter objRtn;

        strSQL = "{CALL PX167S01WRF070(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(17, Types.INTEGER);
            cs.registerOutParameter(18, Types.INTEGER);
            cs.registerOutParameter(19, Types.INTEGER);
            cs.registerOutParameter(20, Types.INTEGER);

            cs.setString(1, filter.IN_AGRUP);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.IN_FFILTRO);
            cs.setString(4, filter.IN_DATE_FROM);
            cs.setString(5, filter.IN_DATE_TO);
            cs.setString(6, filter.IN_CURRENCY);
            cs.setString(7, filter.IN_AREA);
            cs.setString(8, filter.IN_REGION);
            cs.setString(9, filter.IN_COUNTRY);
            cs.setString(10, filter.IN_CITY);
            cs.setString(11, filter.IN_CCIA);
            cs.setString(12, filter.IN_GROUPA);
            cs.setString(13, filter.IN_CZONA);
            cs.setString(14, filter.IN_FACTUAL);
            cs.setInt(15, filter.IN_COLUMNA);
            cs.setString(16, filter.IN_BOOLASC);
            cs.setInt(17, filter.page.PAGNUM);
            cs.setInt(18, filter.page.PAGROW);
            cs.setInt(19, filter.page.TOTPAG);
            cs.setInt(20, filter.page.TOTROW);
            
            cs.execute();

            filter.page.PAGNUM = cs.getInt(17);
            filter.page.PAGROW = cs.getInt(18);
            filter.page.TOTPAG = cs.getInt(19);
            filter.page.TOTROW = cs.getInt(20);
            
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new WRF070Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.GROUPA = rst.getString("GROUPA");
                objRtn.CPISO = rst.getString("CPISO");
                objRtn.MONED = rst.getString("MONED");
                objRtn.QTYDOC = rst.getInt("QTYDOC");
                objRtn.GROSS = rst.getDouble("GROSS");
                objRtn.ISC = rst.getDouble("ISC");
                objRtn.TAX = rst.getDouble("TAX");
                objRtn.NETO = rst.getDouble("NETO");
                objRtn.COM = rst.getDouble("COM");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                filter.lstFilterRows.add(objRtn);
            }
        } finally {
            setClose();
        }
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
