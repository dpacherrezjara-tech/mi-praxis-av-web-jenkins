package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A2960Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadCommissionADMACMDAO {

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

    public List<A2960Filter> lstsearch(A2960Filter filter) throws SQLException, Exception {
        List<A2960Filter> lstRtn = new ArrayList<>(0);
        A2960Filter objRtn;

        String SQLCLL01 = "{CALL PXCOMM.SQP01507(?,?,?,?,?,?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00807(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_OPTION);
            cs.setString(3, filter.IN_DATEFROM);
            cs.setString(4, filter.IN_DATETO);
            cs.setString(5, filter.IN_SELET_TYPE);
            cs.setString(6, filter.IN_DATEPER1);
            cs.setString(7, filter.IN_DATEPER2);

            cs.setInt(8, filter.page.PAGNUM);
            cs.setInt(9, filter.page.PAGROW);
            cs.setInt(10, filter.page.TOTPAG);
            cs.setInt(11, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(8);
            filter.page.PAGROW = cs.getInt(9);
            filter.page.TOTPAG = cs.getInt(10);
            filter.page.TOTROW = cs.getInt(11);

            rst = cs.getResultSet();
            while (rst.next()) {

                objRtn = new A2960Filter();
                if (!filter.IN_OPTION.equals("5")) {
                    objRtn.A2960AIRLI = rst.getString("A2960AIRLI");
                    objRtn.A2960LOTE = rst.getString("A2960LOTE");
                    objRtn.A2960FPERI = rst.getString("A2960FPERI");
                    objRtn.A2960SEQ = rst.getInt("A2960SEQ");
                    objRtn.A2960NETOR = rst.getDouble("A2960NETOR");
                    objRtn.A2960CTRAL = rst.getInt("A2960CTRAL");
                    objRtn.A2960NETOP = rst.getDouble("A2960NETOP");
                    objRtn.A2960CTPYT = rst.getInt("A2960CTPYT");
                    objRtn.A2960FEPRO = rst.getString("A2960FEPRO");
                    objRtn.A2960TYPE = rst.getString("A2960TYPE");
                    objRtn.A2960UINGR = rst.getString("A2960UINGR");
                    objRtn.A2960FINGR = rst.getString("A2960FINGR");
                    objRtn.A2960HINGR = rst.getString("A2960HINGR");
                    objRtn.A2960UMODI = rst.getString("A2960UMODI");
                    objRtn.A2960FMODI = rst.getString("A2960FMODI");
                    objRtn.A2960HMODI = rst.getString("A2960HMODI");
                } else {
                    objRtn.A2960FPERI = rst.getString("A2959FPERI");
                    objRtn.A2960TYPE = rst.getString("A2959TYPE");
                    objRtn.IN_SELET_TYPE = rst.getString("A2959INDAC");
                    objRtn.A2960PAIVT = rst.getString("A2959PAIVT");
                    objRtn.A2960CODAC = rst.getString("A2959CODAC");
//                    objRtn.A2960LOTE = rst.getString("A2959LOTE");
                }
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

    public String getLoadCommiADMACM(A2960Filter filter) throws SQLException, Exception {
        String STR_RESULT = "";
        strSQL = "{CALL PXCOMM.SQP01508(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00807(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("VP_FROM_FILTER", filter.IN_DATEFROM);
            cs.setString("VP_TO_FILTER", filter.IN_DATETO);
            cs.setString("VP_TO_PERIODO", filter.IN_DATEPER1);
            cs.setString("VP_LOTE", filter.IN_LOTE);
            cs.setString("VP_IATA", filter.IN_IATA);
            cs.setString("VP_TYPE", filter.IN_SELET_TYPE);
            cs.setString("IN_BASE", filter.IN_SELET_BASE);
            cs.setString("IN_PAIS", filter.IN_PAIS);
            cs.setString("IN_CODAC", filter.IN_CODAC);                    
            cs.setString("IN_USER", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());

            cs.execute();
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } finally {
            setClose();
        }
        return STR_RESULT;
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
