package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1690Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class Coupon409DAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public Coupon409DAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1690Filter> loadPX089SQP0002(A1690Filter filter) throws SQLException, Exception {
        List<A1690Filter> lstRtn = new ArrayList<>(0);
        A1690Filter objRtn;
        String tkt = Functions.fillString(filter.IN_TKT, 13);
        String NFLIGHT = filter.NFLIGHT.trim(); //YYYYMM

        if (!NFLIGHT.equals("") && NFLIGHT.length() < 4) {
            NFLIGHT = Functions.fillZeros(4, NFLIGHT);
        }
        strSQL = "{CALL " + session.getMainLibrary() + ".PX089S01A1690(?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);
            cs.registerOutParameter(12, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cs.setString(2, filter.IN_FECHA_FROM.trim());
            cs.setString(3, filter.IN_FECHA_TO.trim());
            cs.setString(4, filter.FLAG_ORDERBY);
            cs.setString(5, tkt.substring(0, 3).trim());//CIA
            cs.setString(6, tkt.substring(3, 7).trim());//FORMA
            cs.setString(7, tkt.substring(7, 13).trim());//SERIE
            cs.setString(8, NFLIGHT);
            cs.setInt(9, filter.page.PAGNUM);
            cs.setInt(10, filter.page.PAGROW);
            cs.setInt(11, filter.page.TOTPAG);
            cs.setInt(12, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(9);
            filter.page.PAGROW = cs.getInt(10);
            filter.page.TOTPAG = cs.getInt(11);
            filter.page.TOTROW = cs.getInt(12);

            rst = cs.getResultSet();

            while (rst.next()) {

                objRtn = new A1690Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.PRDA = rst.getString("PRDA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.PRDA);
                objRtn.DFLIGHC = rst.getString("DFLIGHC");
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.DFLIGHC);
                objRtn.TREG = rst.getString("TREG");
                objRtn.TRNN = rst.getInt("TRNN");
                objRtn.CUPON = rst.getString("CUPON");
                objRtn.CCIA = rst.getString("CCIA");
                objRtn.FORMA = rst.getString("FORMA");
                objRtn.SERIE = rst.getString("SERIE");
                objRtn.BOX = rst.getString("BOX");
                objRtn.DCHEQ = rst.getString("DCHEQ");
                objRtn.RFER = rst.getString("RFER");
                objRtn.NFLIGHT = rst.getString("NFLIGHT");
                objRtn.CDEPART = rst.getString("CDEPART");
                objRtn.strDescORIG = rst.getString("DESC_ORIG");
                objRtn.CARRIVA = rst.getString("CARRIVA");
                objRtn.strDescDEST = rst.getString("DESC_DEST");
                objRtn.DFLIGHT = rst.getString("DFLIGHT");
                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.DFLIGHT);
                objRtn.strTicket = objRtn.CCIA + ' ' + objRtn.FORMA + objRtn.SERIE + ' ' + objRtn.CUPON;

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
