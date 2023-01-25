package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import static com.ibm.as400.data.PcmlMessageLog.logError;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import net.miatech.beans.A1835Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class AccountingMasterPagaTodoDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public AccountingMasterPagaTodoDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1835Filter> loadPX170S01A1835(A1835Filter filter) {
        List<A1835Filter> lstRtn = new ArrayList<>(0);
        A1835Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = 20, totRows = -1;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX170S01A1835(?,?,?,?,?,?,?,?,?,?)}";

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setInt(1, Integer.parseInt(filter.IN_FILTRO.trim()));
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.IN_A1835FOPID.trim());
            cs.setString(4, filter.IN_A1835TARPT.trim());
            cs.setString(5, filter.A1835CUENT.trim());
            cs.setString(6, filter.A1835SUBCT.trim());

            cs.setInt(7, PAGINIT);
            cs.setInt(8, filter.page.PAGROW);
            cs.setInt(9, totRows);
            cs.setInt(10, -1);

            cs.execute();

            filter.page.PAGROW = cs.getInt(8);
            filter.page.TOTPAG = cs.getInt(9);
            filter.page.TOTROW = cs.getInt(10);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cs.getInt(9)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cs.getInt(10);
                    int total = (int) (totRows / 20);
                    int resto = (totRows % 20);

                    if (resto > 0) {
                        totPAGS = total + 1;
                    } else {
                        totPAGS = total;
                    }

                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            filter.page.TOTPAG = totPAGS;

            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                objRtn = new A1835Filter();
                objRtn.RN = rst.getLong("NO");
                objRtn.A1835CCUST = rst.getString("A1835CCUST").trim();
                objRtn.A1835FOPID = rst.getString("A1835FOPID").trim();
                objRtn.A1835TARPT = rst.getString("A1835TARPT").trim();
                objRtn.A1835CONC = rst.getString("A1835CONC").trim();
                objRtn.A1835CIA = rst.getString("A1835CIA").trim();
                objRtn.A1835UNIDA = rst.getString("A1835UNIDA").trim();
                objRtn.A1835CENCO = rst.getString("A1835CENCO").trim();
                objRtn.A1835UBICA = rst.getString("A1835UBICA").trim();
                objRtn.A1835CUENT = rst.getString("A1835CUENT").trim();
                objRtn.A1835SUBCT = rst.getString("A1835SUBCT").trim();
                objRtn.A1835EQUI = rst.getString("A1835EQUI").trim();
                objRtn.A1835INCIA = rst.getString("A1835INCIA").trim();

                objRtn.A1835FINI = rst.getString("A1835FINI").trim();
                objRtn.A1835FFIN = rst.getString("A1835FFIN").trim();

                objRtn.A1835REGIS = rst.getString("A1835REGIS").trim();
                objRtn.A1835FREGI = Functions.getMonthConvertDate(rst.getString("A1835FREGI"));
                objRtn.A1835HREGI = Functions.ConvertedTime(rst.getString("A1835HREGI"));
                objRtn.A1835REGVI = rst.getString("A1835REGVI").trim();
                objRtn.A1835FREVI = Functions.getMonthConvertDate(rst.getString("A1835FREVI"));
                objRtn.A1835HREVI = Functions.ConvertedTime(rst.getString("A1835HREVI"));

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }

        return lstRtn;
    }

    public String accountMasterTaxMaintance(A1835Filter filter, String strOption) {
        String STR_RESULT = "";
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX170S02A1835(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, "139");
            cs.setString(3, filter.A1835FOPID);
            cs.setString(4, filter.A1835TARPT);
            cs.setString(5, filter.A1835CONC);
            cs.setString(6, filter.A1835CIA);
            cs.setString(7, filter.A1835UNIDA);
            cs.setString(8, filter.A1835CENCO);
            cs.setString(9, filter.A1835UBICA);
            cs.setString(10, filter.A1835CUENT);
            cs.setString(11, filter.A1835SUBCT);
            cs.setString(12, filter.A1835EQUI);
            cs.setString(13, filter.A1835INCIA);
            cs.setString(14, session.getUserView().getUserInfo().USR);
            cs.setString(15, Functions.getFechaActual());
            cs.setString(16, Functions.getHoraActual());
            cs.setString(17, filter.IN_A1835FOPID_OLD);
            cs.setString(18, filter.IN_A1835TARPT_OLD);
            cs.setString(19, filter.A1835FINI);
            cs.setString(20, filter.A1835FFIN);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("Mensaje: " + ex.getMessage());
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
