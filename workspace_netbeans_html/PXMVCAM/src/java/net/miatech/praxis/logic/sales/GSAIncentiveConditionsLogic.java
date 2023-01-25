package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX132S01A1774Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.GSAIncentiveConditionsDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSAIncentiveConditionsLogic {

    private GSAIncentiveConditionsDAO objDAO = new GSAIncentiveConditionsDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX132S01A1774Filter> loadPX132S01A1774(PX132S01A1774Filter filter) throws SQLException, Exception {
        return objDAO.loadPX132S01A1774(filter);
    }
}
