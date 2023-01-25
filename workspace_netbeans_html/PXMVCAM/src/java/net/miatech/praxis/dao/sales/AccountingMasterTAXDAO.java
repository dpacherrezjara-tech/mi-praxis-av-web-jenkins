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
import net.miatech.beans.A1741Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class AccountingMasterTAXDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public AccountingMasterTAXDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1741Filter> loadPX126S02A1741(A1741Filter filter) {
        List<A1741Filter> lstRtn = new ArrayList<>(0);
        A1741Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = 20, totRows = -1;

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04484(?,?,?,?,?,?,?,?,?,?,?)}"; // PX127S02A1741

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setString(1, filter.IN_A1741PAIS.trim());
            cs.setString(2, filter.IN_A1741MONED.trim());
            cs.setString(3, filter.IN_A1741CODE.trim());
            cs.setString(4, filter.IN_A1741TIPO.trim());
            cs.setString(5, filter.A1741CTA.trim());
            cs.setString(6, filter.A1741SCTA.trim());
            cs.setInt(7, PAGINIT);
            cs.setInt(8, filter.page.PAGROW);
            cs.setInt(9, totRows);
            cs.setInt(10, -1);
            cs.setString(11, filter.A1741CTRL.trim());
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
                objRtn = new A1741Filter();
                objRtn.RN = rst.getLong("NO");
                objRtn.A1741CCUST = rst.getString("A1741CCUST").trim();
                objRtn.A1741TIPO = rst.getString("A1741TIPO").trim();
                if (objRtn.A1741TIPO.equals("O")) {
                    objRtn.A1741TIPO_00 = "Origin";
                } else if (objRtn.A1741TIPO.equals("M")) {
                    objRtn.A1741TIPO_00 = "Multicurrency";
                } else if (objRtn.A1741TIPO.equals("C")) {
                    objRtn.A1741TIPO_00 = "Expired";
                } else if (objRtn.A1741TIPO.equals("R")) {
                    objRtn.A1741TIPO_00 = "RAC";
                } else if (objRtn.A1741TIPO.equals("N")) {
                    objRtn.A1741TIPO_00 = "No Show";
                } 

                objRtn.A1741PAIS = rst.getString("A1741PAIS").trim();
                objRtn.A1741CODE = rst.getString("A1741CODE").trim();
                objRtn.A1741MONED = rst.getString("A1741MONED").trim();
                objRtn.A1741CONCE = rst.getString("A1741CONCE").trim();
                objRtn.A1741CIA = rst.getString("A1741CIA").trim();
                objRtn.A1741UNIDA = rst.getString("A1741UNIDA").trim();
                objRtn.A1741CECOS = rst.getString("A1741CECOS").trim();
                objRtn.A1741UBICA = rst.getString("A1741UBICA").trim();
                objRtn.A1741CTA = rst.getString("A1741CTA").trim();
                objRtn.A1741SCTA = rst.getString("A1741SCTA").trim();
                objRtn.A1741EQUI = rst.getString("A1741EQUI").trim();
                objRtn.A1741ICIA = rst.getString("A1741ICIA").trim();
                objRtn.A1741FINI = Functions.getMonthConvertDate(rst.getString("A1741FINI").trim());
                objRtn.A1741FFIN = (rst.getString("A1741FFIN").equals("99999999") ? "" : Functions.getMonthConvertDate(rst.getString("A1741FFIN")));
                objRtn.A1741CTRL = rst.getString("A1741CTRL").trim();
                objRtn.A1741TPTAX = rst.getString("A1741TPTAX").trim();
                objRtn.A1741INTNU = rst.getString("A1741INTNU").trim();

                objRtn.A1741REGIS = rst.getString("A1741REGIS").trim();
                objRtn.A1741FREGI = Functions.getMonthConvertDate(rst.getString("A1741FREGI").trim());
                objRtn.A1741HREGI = Functions.ConvertedTime(rst.getString("A1741HREGI").trim());
                objRtn.A1741REGVI = rst.getString("A1741REGVI").trim();
                objRtn.A1741FREVI = Functions.getMonthConvertDate(rst.getString("A1741FREVI").trim());
                objRtn.A1741HREVI = Functions.ConvertedTime(rst.getString("A1741HREVI").trim());

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

    public List<A1741Filter> loadPX126S02A1741EXCEL(A1741Filter filter) throws SQLException, Exception {
        List<A1741Filter> lstRtn = new ArrayList<A1741Filter>(0);
        A1741Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04484(?,?,?,?,?,?,?,?,?,?,?)}"; // PX127S02A1741
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1741PAIS.trim());
            cstmt01.setString(2, filter.IN_A1741MONED.trim());
            cstmt01.setString(3, filter.IN_A1741CODE.trim());
            cstmt01.setString(4, filter.IN_A1741TIPO.trim());
            cstmt01.setString(5, filter.A1741CTA.trim());
            cstmt01.setString(6, filter.A1741SCTA.trim());

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);
            cstmt01.setString(11, filter.A1741CTRL.trim());

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A1741Filter();

                objRtn.RN = rs01.getLong("NO");
                objRtn.A1741CCUST = rs01.getString("A1741CCUST").trim();
                objRtn.A1741TIPO = rs01.getString("A1741TIPO").trim();
                if (objRtn.A1741TIPO.equals("O")) {
                    objRtn.A1741TIPO_00 = "Origin";
                } else if (objRtn.A1741TIPO.equals("M")) {
                    objRtn.A1741TIPO_00 = "Multicurrency";
                } else if (objRtn.A1741TIPO.equals("C")) {
                    objRtn.A1741TIPO_00 = "Expired";
                } else if (objRtn.A1741TIPO.equals("R")) {
                    objRtn.A1741TIPO_00 = "RAC";
                } else if (objRtn.A1741TIPO.equals("N")) {
                    objRtn.A1741TIPO_00 = "No Show";
                } 

                objRtn.A1741PAIS = rs01.getString("A1741PAIS").trim();
                objRtn.A1741CODE = rs01.getString("A1741CODE").trim();
                objRtn.A1741MONED = rs01.getString("A1741MONED").trim();
                objRtn.A1741CONCE = rs01.getString("A1741CONCE").trim();
                objRtn.A1741CIA = rs01.getString("A1741CIA").trim();
                objRtn.A1741UNIDA = rs01.getString("A1741UNIDA").trim();
                objRtn.A1741CECOS = rs01.getString("A1741CECOS").trim();
                objRtn.A1741UBICA = rs01.getString("A1741UBICA").trim();
                objRtn.A1741CTA = rs01.getString("A1741CTA").trim();
                objRtn.A1741SCTA = rs01.getString("A1741SCTA").trim();
                objRtn.A1741EQUI = rs01.getString("A1741EQUI").trim();
                objRtn.A1741ICIA = rs01.getString("A1741ICIA").trim();
                objRtn.A1741FINI = Functions.getMonthConvertDate(rs01.getString("A1741FINI").trim());
                objRtn.A1741FFIN = (rs01.getString("A1741FFIN").equals("99999999") ? "" : Functions.getMonthConvertDate(rs01.getString("A1741FFIN")));
                objRtn.A1741CTRL = rs01.getString("A1741CTRL").trim();
                objRtn.A1741TPTAX = rs01.getString("A1741TPTAX").trim();
                objRtn.A1741INTNU = rs01.getString("A1741INTNU").trim();

                objRtn.A1741REGIS = rs01.getString("A1741REGIS").trim();
                objRtn.A1741FREGI = Functions.getMonthConvertDate(rs01.getString("A1741FREGI").trim());
                objRtn.A1741HREGI = Functions.ConvertedTime(rs01.getString("A1741HREGI").trim());
                objRtn.A1741REGVI = rs01.getString("A1741REGVI").trim();
                objRtn.A1741FREVI = Functions.getMonthConvertDate(rs01.getString("A1741FREVI").trim());
                objRtn.A1741HREVI = Functions.ConvertedTime(rs01.getString("A1741HREVI").trim());

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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

    public String accountMasterTaxMaintance(A1741Filter filter, String strOption) {
        String STR_RESULT = "";
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04485(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; // PX127S03A1741
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.A1741TIPO);
            cs.setString(4, filter.A1741PAIS);
            cs.setString(5, filter.A1741CODE);
            cs.setString(6, filter.A1741MONED);
            cs.setString(7, filter.A1741CONCE);
            cs.setString(8, filter.A1741CIA);
            cs.setString(9, filter.A1741UNIDA);
            cs.setString(10, filter.A1741CECOS);
            cs.setString(11, filter.A1741UBICA);
            cs.setString(12, filter.A1741CTA);
            cs.setString(13, filter.A1741SCTA);
            cs.setString(14, filter.A1741EQUI);
            cs.setString(15, filter.A1741ICIA);
            cs.setString(16, filter.A1741FINI);
            cs.setString(17, filter.A1741FFIN);
            cs.setString(18, session.getUserView().getUserInfo().USR);
            cs.setString(19, Functions.getFechaActual());
            cs.setString(20, Functions.getHoraActual());
            cs.setString(21, filter.IN_A1741PAIS_OLD);
            cs.setString(22, filter.IN_A1741CODE_OLD);
            cs.setString(23, filter.IN_A1741TIPO_OLD);
            cs.setString(24, filter.A1741CTRL);
            cs.setString(25, filter.A1741TPTAX);
            cs.setString(26, filter.IN_A1741FINI_OLD);
            cs.setString(27, filter.IN_A1741FFIN_OLD);
            cs.setString(28, filter.A1741INTNU);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
        } catch (Exception ex) {
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
