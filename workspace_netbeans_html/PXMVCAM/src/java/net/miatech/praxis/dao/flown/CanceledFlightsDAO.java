package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.flown.filter.A3778Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author jsolano
 */
public class CanceledFlightsDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public CanceledFlightsDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3778Filter> loadPX089SQP04419(A3778Filter filter) throws SQLException, Exception {
        List<A3778Filter> lstRtn = new ArrayList<>(0);
        A3778Filter objRtn;
       
        strSQL = "{CALL " + session.getMainLibrary() + ".SQP04419(?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cs.setInt(2, filter.IN_TIPOFECHA);
            cs.setString(3, filter.IN_FECHA_FROM.trim());
            cs.setString(4, filter.IN_FECHA_TO.trim());
            cs.setString(5, filter.IN_NFLIGHT.trim());
            cs.setString(6, filter.IN_STVAL.trim());
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

                objRtn = new A3778Filter();
                objRtn.DFLIGHT = rst.getString("DFLIGHT");
                objRtn.NFLIGHT = rst.getString("NFLIGHT");
                objRtn.STVAL = rst.getString("STVAL");
                if (rst.getString("STVAL").equals("1")) {
                    objRtn.STVAL = "Cancelado";
                } else if (rst.getString("STVAL").equals("3")) {
                    objRtn.STVAL = "Operado";
                }
                objRtn.CDEPART = rst.getString("CDEPART");
                objRtn.CARRIVA = rst.getString("CARRIVA");
                objRtn.LOCDEP = rst.getString("LOCDEP");
                objRtn.LOCARR = rst.getString("LOCARR");
                objRtn.UTCDEP = rst.getString("UTCDEP");
                objRtn.UTCARR = rst.getString("UTCARR");
                objRtn.USCR = rst.getString("USCR");
                objRtn.FECR = rst.getString("FECR");
                objRtn.HOCR = rst.getString("HOCR");
                
                

                //Paginación ===================================================
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
