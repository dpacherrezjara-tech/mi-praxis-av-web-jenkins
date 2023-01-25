package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;
import net.miatech.beans.A3084Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author jsolano
 */
public class AccountingCouponsDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public AccountingCouponsDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A3084Filter> loadSQP04611(A3084Filter filter) throws SQLException, Exception {
        List<A3084Filter> lstRtn = new ArrayList<>(0);
        A3084Filter objRtn;

        int TOTQTY_CPN = 0;
        double TOTVALOR = 0, TOTVALOR_YQ = 0;
        double TOTVALOR_MXN = 0, TOTVALOR__YQ_MXN = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".SQP04611(?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.CARRYER);
            cs.setString(4, filter.CIAF);
            cs.setString(5, filter.FTYPE);

            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                TOTQTY_CPN += rst.getInt("QTY_CPN");
                
                TOTVALOR += rst.getDouble("VALOR");
                TOTVALOR_YQ += rst.getDouble("VALOR_YQ");
                
                TOTVALOR_MXN += rst.getDouble("VALOR_MXN");
                TOTVALOR__YQ_MXN += rst.getDouble("VALOR__YQ_MXN");

            }
            try {
                rst.close();
            } catch (SQLException e) {
                //logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    objRtn = new A3084Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.FCONT = rst.getString("FCONT").trim();
                    objRtn.QTY_CPN = rst.getInt("QTY_CPN");
                    
                    objRtn.VALOR = rst.getDouble("VALOR");
                    objRtn.VALOR_YQ = rst.getDouble("VALOR_YQ");
                    objRtn.totVALOR = objRtn.VALOR + objRtn.VALOR_YQ;
                    
                    objRtn.VALOR_MXN = rst.getDouble("VALOR_MXN");
                    objRtn.VALOR__YQ_MXN = rst.getDouble("VALOR__YQ_MXN");
                    objRtn.totVALOR_MXN = objRtn.VALOR_MXN + objRtn.VALOR__YQ_MXN;

                    objRtn.TOTQTY_CPN = TOTQTY_CPN;
                    
                    objRtn.TOTVALOR = TOTVALOR;
                    objRtn.TOTVALOR_YQ = TOTVALOR_YQ;
                    objRtn.TOTtotVALOR = objRtn.TOTVALOR + objRtn.TOTVALOR_YQ;
                    
                    objRtn.TOTVALOR_MXN = TOTVALOR_MXN;
                    objRtn.TOTVALOR__YQ_MXN = TOTVALOR__YQ_MXN;
                    objRtn.TOTtotVALOR_MXN = objRtn.TOTVALOR_MXN + objRtn.TOTVALOR__YQ_MXN;
                    
                    lstRtn.add(objRtn);
                }
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
