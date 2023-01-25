package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.dao.flown.*;
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
import net.miatech.beans.PX019S01A051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.ui.ModelMap;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class BaseOdDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>
    private static final Logger logError = Logger.getLogger("errorLog");

    public BaseOdDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX019S01A051Filter> loadPX019S01A051(PX019S01A051Filter filter) {
        List<PX019S01A051Filter> lstRtn = new ArrayList<>(0);
        PX019S01A051Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04364(?,?,?,?,?)}";

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(2, Types.INTEGER);
            cs.registerOutParameter(3, Types.INTEGER);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);

            cs.setString(1, filter.IN_A051KEY1);
            cs.setInt(2, PAGINIT);
            cs.setInt(3, filter.page.PAGROW);
            cs.setInt(4, filter.page.TOTPAG);
            cs.setInt(5, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(2);
            filter.page.PAGROW = cs.getInt(3);
            filter.page.TOTPAG = cs.getInt(4);
            filter.page.TOTROW = cs.getInt(5);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cs.getInt("IO_PAGROW")) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cs.getInt("IO_TOTROW");
                    int total = (int) (totRows / totRowsPag);
                    int resto = (totRows % totRowsPag);

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
            while (rst.next()) {
                objRtn = new PX019S01A051Filter();
                objRtn.NO = rst.getInt("NO");
                objRtn.A051KEY1 = rst.getString("A051KEY1").trim();
                objRtn.A051KEY2 = rst.getString("A051KEY2").trim();
                objRtn.A051FECHA1 = rst.getString("A051FECHA1").trim();
                objRtn.A051FECHA2 = rst.getString("A051FECHA2").trim();
                objRtn.A051CANTI1 = rst.getDouble("A051CANTI1");
                objRtn.A051CANTI2 = rst.getDouble("A051CANTI2");
                objRtn.A051DESCR1 = rst.getString("A051DESCR1").trim();
                objRtn.A051DESCR2 = rst.getString("A051DESCR2").trim();
                objRtn.A051COMENT = rst.getString("A051COMENT").trim();
                objRtn.A051STATUS = rst.getString("A051STATUS").trim();
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                //Paginado
                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            String err;
            err = ex.getMessage();
        } finally {
            setClose();
        }

        return lstRtn;
    }

    public String BaseOdMaintance(A051 filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            //strSQL = "{CALL " + session.getMainLibrary() + ".SQP04332(?,?,?,?,?,?,?,?,?,?,?,?)}";
            strSQL = "{CALL LIBSAP50.SQP04332(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            
            cs.registerOutParameter("VL_MESSAGE", Types.VARCHAR);
            cs.registerOutParameter("VL_SQLCODE", Types.INTEGER);
            
            cs.setString("IN_ACTION", strOption);
            //cs.setString("A051KEY1", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A051KEY1", filter.A051KEY1);
            cs.setString("IN_A051KEY2", filter.A051KEY2);
            cs.setString("IN_A051DESCR1", filter.A051DESCR1);
            cs.setString("IN_A051DESCR2", filter.A051DESCR2);
            cs.setDouble("IN_A051CANTI1", filter.A051CANTI1);
            cs.setDouble("IN_A051CANTI2", filter.A051CANTI2);
            cs.setString("IN_A051FECHA1", filter.A051FECHA1);
            cs.setString("IN_A051FECHA2", filter.A051FECHA2);
            cs.setString("IN_A051COMENT", filter.A051COMENT);
            cs.setString("IN_A051STATUS", filter.A051STATUS);
            cs.setString("IN_A051KEY2_OLD", filter.IN_A051KEY2_OLD);
            cs.setString("VL_MESSAGE", "");
            cs.setInt("VL_SQLCODE", 0);
            cs.execute();
            STR_RESULT = cs.getString("VL_MESSAGE");
            /*rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }*/
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
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
