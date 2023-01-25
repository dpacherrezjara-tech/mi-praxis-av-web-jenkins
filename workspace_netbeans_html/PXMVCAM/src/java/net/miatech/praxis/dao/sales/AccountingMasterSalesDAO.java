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
import net.miatech.beans.A1740Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class AccountingMasterSalesDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public AccountingMasterSalesDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1740Filter> loadPX126S02A1740(A1740Filter filter) {
        List<A1740Filter> lstRtn = new ArrayList<>(0);
        A1740Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = 20, totRows = -1;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04480(?,?,?,?,?,?,?,?,?,?)}"; // PX126S01A1740

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setString(1, filter.IN_A1740TITRA.trim());
            cs.setString(2, filter.IN_A1740TIPO.trim());
            cs.setString(3, filter.A1740SUBTI.trim());
            cs.setString(4, filter.A1740CATEG.trim());
            cs.setString(5, filter.A1740CTA.trim());
            cs.setString(6, filter.A1740SCTA.trim());
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
                objRtn = new A1740Filter();
                objRtn.RN = rst.getLong("NO");
                objRtn.A1740TITRA = rst.getString("A1740TITRA").trim();
                objRtn.A1740TIPO = rst.getString("A1740TIPO").trim();
                objRtn.A1740TIPODESC = rst.getString("A1740TIPODESC").trim();
                objRtn.A1740SUBTI = rst.getString("A1740SUBTI").trim();
                objRtn.A1740CATEG = rst.getString("A1740CATEG").trim();
                objRtn.A1740CIA = rst.getString("A1740CIA").trim();
                objRtn.A1740UNIDA = rst.getString("A1740UNIDA").trim();
                objRtn.A1740CECOS = rst.getString("A1740CECOS").trim();
                objRtn.A1740UBICA = rst.getString("A1740UBICA").trim();
                objRtn.A1740CTA = rst.getString("A1740CTA").trim();
                objRtn.A1740SCTA = rst.getString("A1740SCTA").trim();
                objRtn.A1740EQUI = rst.getString("A1740EQUI").trim();
                objRtn.A1740ICIA = rst.getString("A1740ICIA").trim();
                objRtn.A1740CLIE = rst.getString("A1740CLIE").trim();
                objRtn.A1740FINI = Functions.getMonthConvertDate(rst.getString("A1740FINI").trim());
                objRtn.A1740FFIN = Functions.getMonthConvertDate(rst.getString("A1740FFIN").trim());

                objRtn.A1740REGIS = rst.getString("A1740REGIS").trim();
                objRtn.A1740FREGI = Functions.getMonthConvertDate(rst.getString("A1740FREGI").trim());
                objRtn.A1740HREGI = Functions.ConvertedTime(rst.getString("A1740HREGI").trim());
                objRtn.A1740REGVI = rst.getString("A1740REGVI").trim();
                objRtn.A1740FREVI = Functions.getMonthConvertDate(rst.getString("A1740FREVI").trim());
                objRtn.A1740HREVI = Functions.ConvertedTime(rst.getString("A1740HREVI").trim());
                objRtn.A1740INTNU = rst.getString("A1740INTNU").trim();                

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (SQLException ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }

        return lstRtn;
    }

     public List<A1740Filter> loadPX126S02A1740EXCEL(A1740Filter filter) throws SQLException, Exception {
        List<A1740Filter> lstRtn = new ArrayList<A1740Filter>(0);
        A1740Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04480(?,?,?,?,?,?,?,?,?,?)}"; // PX126S01A1740
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1740TITRA.trim());
            cstmt01.setString(2, filter.IN_A1740TIPO.trim());
            cstmt01.setString(3, filter.A1740SUBTI.trim());
            cstmt01.setString(4, filter.A1740CATEG.trim());
            cstmt01.setString(5, filter.A1740CTA.trim());
            cstmt01.setString(6, filter.A1740SCTA.trim());

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A1740Filter();

                 objRtn.RN = rs01.getLong("NO");
                objRtn.A1740TITRA = rs01.getString("A1740TITRA").trim();
                objRtn.A1740TIPO = rs01.getString("A1740TIPO").trim();
                objRtn.A1740TIPODESC = rs01.getString("A1740TIPODESC").trim();
                objRtn.A1740SUBTI = rs01.getString("A1740SUBTI").trim();
                objRtn.A1740CATEG = rs01.getString("A1740CATEG").trim();
                objRtn.A1740CIA = rs01.getString("A1740CIA").trim();
                objRtn.A1740UNIDA = rs01.getString("A1740UNIDA").trim();
                objRtn.A1740CECOS = rs01.getString("A1740CECOS").trim();
                objRtn.A1740UBICA = rs01.getString("A1740UBICA").trim();
                objRtn.A1740CTA = rs01.getString("A1740CTA").trim();
                objRtn.A1740SCTA = rs01.getString("A1740SCTA").trim();
                objRtn.A1740EQUI = rs01.getString("A1740EQUI").trim();
                objRtn.A1740ICIA = rs01.getString("A1740ICIA").trim();
                objRtn.A1740CLIE = rs01.getString("A1740CLIE").trim();
                objRtn.A1740FINI = Functions.getMonthConvertDate(rs01.getString("A1740FINI").trim());
                objRtn.A1740FFIN = Functions.getMonthConvertDate(rs01.getString("A1740FFIN").trim());

                objRtn.A1740REGIS = rs01.getString("A1740REGIS").trim();
                objRtn.A1740FREGI = Functions.getMonthConvertDate(rs01.getString("A1740FREGI").trim());
                objRtn.A1740HREGI = Functions.ConvertedTime(rs01.getString("A1740HREGI").trim());
                objRtn.A1740REGVI = rs01.getString("A1740REGVI").trim();
                objRtn.A1740FREVI = Functions.getMonthConvertDate(rs01.getString("A1740FREVI").trim());
                objRtn.A1740HREVI = Functions.ConvertedTime(rs01.getString("A1740HREVI").trim());
                objRtn.A1740INTNU = rs01.getString("A1740INTNU").trim();
                
     
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
    
     public String accountMasterMaintance(A1740Filter filter, String strOption) {
        String STR_RESULT = "";
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04481(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; // PX126S02A1740
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.A1740TITRA);
            cs.setString(4, filter.A1740TIPO);
            cs.setString(5, filter.A1740SUBTI);
            cs.setString(6, filter.A1740CATEG);
            cs.setString(7, filter.A1740CIA);
            cs.setString(8, filter.A1740UNIDA);
            cs.setString(9, filter.A1740CECOS);
            cs.setString(10, filter.A1740UBICA);
            cs.setString(11, filter.A1740CTA);
            cs.setString(12, filter.A1740SCTA);
            cs.setString(13, filter.A1740EQUI);
            cs.setString(14, filter.A1740ICIA);
            cs.setString(15, filter.A1740CLIE);
            cs.setString(16, filter.A1740FINI);
            cs.setString(17, filter.A1740FFIN);
            cs.setString(18, session.getUserView().getUserInfo().USR);
            cs.setString(19, Functions.getFechaActual());
            cs.setString(20, Functions.getHoraActual());
            cs.setString(21, filter.IN_A1740TITRA_OLD);
            cs.setString(22, filter.IN_A1740TIPO_OLD);
            cs.setString(23, filter.IN_A1740SUBTI_OLD);
            cs.setString(24, filter.IN_A1740CATEG_OLD);
            cs.setString(25, filter.A1740INTNU);
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
