package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX134S01A1778Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.GSAIncentiveCalculationDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSAIncentiveCalculationLogic {

    private GSAIncentiveCalculationDAO objDAO = new GSAIncentiveCalculationDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX134S01A1778Filter> loadPX134S01A1778(PX134S01A1778Filter filter) throws SQLException, Exception {
        return objDAO.loadPX134S01A1778(filter);
    }
}
