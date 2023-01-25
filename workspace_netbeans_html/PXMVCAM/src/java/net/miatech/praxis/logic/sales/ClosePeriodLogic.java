package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ClosePeriodDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ClosePeriodLogic {

    private ClosePeriodDAO objDAO = new ClosePeriodDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1691Filter> loadPX317S01SQP00979(A1691Filter filter) throws SQLException, Exception {
        return objDAO.loadPX317S01SQP00979(filter);
    }

    public String loadPX317S01SQP00980(A1691Filter filter) throws SQLException, Exception {
        return objDAO.loadPX317S01SQP00980(filter);
    }
}
