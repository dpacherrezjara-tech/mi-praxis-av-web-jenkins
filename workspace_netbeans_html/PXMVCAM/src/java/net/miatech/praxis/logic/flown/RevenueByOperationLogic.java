package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1971Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.RevenueByOperationDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class RevenueByOperationLogic {

    private RevenueByOperationDAO objDAO = new RevenueByOperationDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1971Filter> loadPX246SQP00328(A1971Filter filter) throws SQLException, Exception {
        return objDAO.loadPX246SQP00328(filter);
    }

    public List<A1971Filter> loadPX246SQP00335(A1971Filter filter) throws SQLException, Exception {
        return objDAO.loadPX246SQP00335(filter);
    }

    public List<A1971Filter> loadPX246SQP00334(A1971Filter filter) throws SQLException, Exception {
        return objDAO.loadPX246SQP00334(filter);
    }

    public List<A1971Filter> loadPX246SQP00333(A1971Filter filter) throws SQLException, Exception {
        return objDAO.loadPX246SQP00333(filter);
    }
}
