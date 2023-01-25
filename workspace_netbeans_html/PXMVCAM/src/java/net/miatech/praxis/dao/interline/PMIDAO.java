package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.interline.A1849;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class PMIDAO {

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

    public List<A1849> loadPX184S01A1849(A1849 filter) throws SQLException, Exception {
        List<A1849> lstRtn = new ArrayList<A1849>(0);
        A1849 objRtn;

        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX184S01A1849(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cs.execute();


            rs01 = cs.getResultSet();

            while (rs01.next()) {
                objRtn = new A1849();
                objRtn.AGREEINDS = rs01.getString("AGREEINDS");
                objRtn.PMI = rs01.getString("PMI");
                objRtn.AVAIBLE = rs01.getString("AVAIBLE");
                objRtn.DUPLICATE = rs01.getString("DUPLICATE");
                objRtn.CARRMATCH = rs01.getString("CARRMATCH");
                objRtn.FAREMATCH = rs01.getString("FAREMATCH");
                objRtn.TAXMATCH = rs01.getString("TAXMATCH");
                objRtn.UATPMATCH = rs01.getString("UATPMATCH");
                objRtn.VALIDPMI = rs01.getString("VALIDPMI");
                objRtn.AGREEINDV = rs01.getString("AGREEINDV");
                objRtn.COMMENTS = rs01.getString("COMMENTS");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

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
    
    public String loadPX184S02A1849(A1849 filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1849.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX184S02A1849(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.AGREEINDS);
            cstmt.setString(4, filter.PMI);
            cstmt.setString(5, filter.AVAIBLE);
            cstmt.setString(6, filter.DUPLICATE);
            cstmt.setString(7, filter.CARRMATCH);
            cstmt.setString(8, filter.FAREMATCH);
            cstmt.setString(9, filter.TAXMATCH);
            cstmt.setString(10, filter.UATPMATCH);
            cstmt.setString(11, filter.VALIDPMI);
            cstmt.setString(12, filter.AGREEINDV);
            cstmt.setString(13, filter.COMMENTS);
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
