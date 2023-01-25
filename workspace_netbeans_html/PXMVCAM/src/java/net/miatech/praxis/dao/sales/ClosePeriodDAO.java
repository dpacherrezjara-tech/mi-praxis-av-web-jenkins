package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.utils.Functions;
import net.miatech.beans.A1691Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ClosePeriodDAO {

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

    public List<A1691Filter> loadPX317S01SQP00979(A1691Filter filter) throws SQLException, Exception {
        List<A1691Filter> lista = new ArrayList<>(0);
        A1691Filter bean;
        int CUPONS=0;
        double AMOUNT=0;

        strSQL = "{CALL " + session.getMainLibrary() + ".SQP00979(?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
            
            cs.execute();
            
            rst = cs.getResultSet();

            while (rst.next()) {
                bean = new A1691Filter();
                bean.DFLIGHT = rst.getString("DSALES");
                bean.strFormatDate = Functions.getMonthConvert(bean.DFLIGHT);
                bean.STVAL = rst.getString("FLAG");
                bean.strDescripcion = rst.getString("COMM1").trim();
                bean.strSQL = rst.getString("COMM2");
                bean.strFCLOFO = "1";

                lista.add(bean);
            }
        } finally {
            setClose();
        }

        return lista;
    }
    
    public String loadPX317S01SQP00980(A1691Filter filter)  throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1786.
        String strMsj = "An Unexpected Error Ocurred.";

        strSQL = "{CALL PRAXIS.SQP00980(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(6, Types.VARCHAR);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT);
            cs.setString(3, filter.STVAL.trim());
            cs.setString(4, filter.strDescripcion.trim());
            cs.setString(5, session.getUserView().getUserInfo().USR);
            cs.setString(6, "");
            cs.execute();

            strMsj = cs.getString(6);
        } finally {
            setClose();
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
