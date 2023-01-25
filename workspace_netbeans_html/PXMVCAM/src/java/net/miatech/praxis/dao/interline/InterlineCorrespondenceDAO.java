package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class InterlineCorrespondenceDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A020Filter> loadPX183S01A020(A020Filter filter) throws SQLException, Exception {
        List<A020Filter> lstRtn = new ArrayList<A020Filter>(0);
        A020Filter objRtn;

        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX183S01A020(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cs.setInt(2, filter.IN_TIPOFECHA);
            cs.setString(3, filter.IN_FECHA_FROM);
            cs.setString(4, filter.IN_FECHA_TO);
            cs.setString(5, filter.IN_CIA);
            cs.setString(6, filter.IN_CODOBO);//Periodo
            cs.setString(7, filter.IN_STATUS);//Close/Pending
            cs.setInt(8, filter.page.PAGNUM);
            cs.setInt(9, filter.page.PAGROW);
            cs.setInt(10, filter.page.TOTPAG);
            cs.setInt(11, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(8);
            filter.page.PAGROW = cs.getInt(9);
            filter.page.TOTPAG = cs.getInt(10);
            filter.page.TOTROW = cs.getInt(11);

            rs01 = cs.getResultSet();

            while (rs01.next()) {
                objRtn = new A020Filter();
                objRtn.A020FRECHA = rs01.getString("A020FRECHA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A020FRECHA);
                objRtn.A020PSTRF = rs01.getString("A020PSTRF");
                objRtn.A020KEY = rs01.getString("A020KEY");
                objRtn.A020CIA = rs01.getString("A020CIA");
                objRtn.A020FORMA = rs01.getString("A020FORMA");
                objRtn.A020SERIE = rs01.getString("A020SERIE");
                objRtn.A020CUPON = rs01.getString("A020CUPON");
                objRtn.strDescripcion = objRtn.A020CIA + " " + objRtn.A020FORMA + objRtn.A020SERIE + " " + objRtn.A020CUPON;
                objRtn.A020AIRLI3 = rs01.getString("A020AIRLI3");
                objRtn.A020SUFACT = rs01.getString("A020SUFACT");
                objRtn.A020SUFECH = rs01.getString("A020SUFECH");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.A020SUFECH);
                objRtn.A020SUDEBI = rs01.getDouble("A020SUDEBI");
                objRtn.A020IMPNAC = rs01.getDouble("A020IMPNAC");
                objRtn.A020TOTDEB = rs01.getDouble("A020TOTDEB");
                objRtn.A020ACEPTA = rs01.getDouble("A020ACEPTA");
                objRtn.A020IMPINT = rs01.getDouble("A020IMPINT");
                objRtn.A020TOTHAB = rs01.getDouble("A020TOTHAB");
                objRtn.A020NETO = rs01.getDouble("A020NETO");
                
                if (rs01.getInt("QTYTUSO") > 0) {
                    objRtn.strDescripcion2 = "Billed";
                } else if(rs01.getString("A020CODOB1").equals("SIS") || rs01.getString("A020CODOB2").equals("SIS") || rs01.getString("A020CODOB3").equals("SIS")
                        || rs01.getString("A020CODOB4").equals("SIS") || rs01.getString("A020CODOB5").equals("SIS")) {
                    objRtn.strDescripcion2 = "Closed";
                }else {
                    objRtn.strDescripcion2 = "Pending";
                }

                //Paginación ===================================================
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public A020Filter loadPX183S02A020(A020Filter filter) throws SQLException, Exception {
        A020Filter objRtn = null;

        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX183S02A020(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cs.setString(2, filter.A020KEY);

            cs.execute();

            rs01 = cs.getResultSet();

            while (rs01.next()) {
                objRtn = new A020Filter();
                objRtn.strDescripcion = filter.strDescripcion2;
                objRtn.A020KEY = rs01.getString("A020KEY");
                objRtn.A020CODOB1 = rs01.getString("A020CODOB1");
                objRtn.A020CODOB2 = rs01.getString("A020CODOB2");
                objRtn.A020CODOB3 = rs01.getString("A020CODOB3");
                objRtn.A020CODOB4 = rs01.getString("A020CODOB4");
                objRtn.A020CODOB5 = rs01.getString("A020CODOB5");
                objRtn.A020COMME1 = rs01.getString("A020COMME1");
                objRtn.A020COMME2 = rs01.getString("A020COMME2");
                objRtn.A020COMME3 = rs01.getString("A020COMME3");
                objRtn.A020COMME4 = rs01.getString("A020COMME4");
                objRtn.A020COMME5 = rs01.getString("A020COMME5");
                objRtn.A020COMME6 = rs01.getString("A020COMME6");

            }
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return objRtn;
    }
    
    public String loadPX183S03A020(A020Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A020.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX183S03A020(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt.setString(3, filter.A020KEY);
            cstmt.setString(4, filter.A020CODOB1);
            cstmt.setString(5, filter.A020CODOB2);
            cstmt.setString(6, filter.A020CODOB3);
            cstmt.setString(7, filter.A020CODOB4);
            cstmt.setString(8, filter.A020CODOB5);
            cstmt.setString(9, filter.A020COMME1);
            cstmt.setString(10, filter.A020COMME2);
            cstmt.setString(11, filter.A020COMME3);
            cstmt.setString(12, filter.A020COMME4);
            cstmt.setString(13, filter.A020COMME5);
            cstmt.setString(14, filter.A020COMME6);
            cstmt.execute();

        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return strMsj;
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
