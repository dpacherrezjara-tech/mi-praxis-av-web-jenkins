package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SQP01432Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class StatisticalsReportBySourceDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP01432Filter> getSQP01432Filter(SQP01432Filter filter) throws SQLException, Exception {
        List<SQP01432Filter> lstRtn = new ArrayList<SQP01432Filter>(0);
        SQP01432Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP01432(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, filter.VP_CUSTOM);
            cstmt01.setString(2, filter.VP_TIPO);
            cstmt01.setString(3, filter.VP_AGRUPA);
            cstmt01.setString(4, filter.VP_AFETNU);
            cstmt01.setString(5, filter.VP_MONEDA);
            cstmt01.setString(6, filter.VP_PERIOD);
            cstmt01.setString(7, filter.VP_FUENTE);
            cstmt01.setString(8, filter.VP_SFUENT);
            cstmt01.setString(9, filter.VP_PAISVE);
            cstmt01.setString(10, filter.VP_AGENTE);
            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01432Filter();
                objRtn.RN = rs01.getString("RN");
                objRtn.A2775ANIO = rs01.getString("A2775ANIO");
                objRtn.A2775FTE = rs01.getString("A2775FTE");
                objRtn.A2775PAIS = rs01.getString("A2775PAIS");
                objRtn.A2775SFTE = rs01.getString("A2775SFTE");
                objRtn.A2775IATA = rs01.getString("A2775IATA");
                objRtn.A2775NAME = rs01.getString("A2775NAME");
                objRtn.VL_MONEDA = "L".equals(filter.VP_MONEDA) ? rs01.getString("A2775MDAL") : rs01.getString("A2775MDAR");
                objRtn.TOTAL = rs01.getDouble("TOTAL");
                objRtn.ENE = rs01.getDouble("ENE");
                objRtn.FEB = rs01.getDouble("FEB");
                objRtn.MAR = rs01.getDouble("MAR");
                objRtn.ABR = rs01.getDouble("ABR");
                objRtn.MAY = rs01.getDouble("MAY");
                objRtn.JUN = rs01.getDouble("JUN");
                objRtn.JUL = rs01.getDouble("JUL");
                objRtn.AGO = rs01.getDouble("AGO");
                objRtn.SET = rs01.getDouble("SET");
                objRtn.OCT = rs01.getDouble("OCT");
                objRtn.NOV = rs01.getDouble("NOV");
                objRtn.DIC = rs01.getDouble("DIC");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
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
