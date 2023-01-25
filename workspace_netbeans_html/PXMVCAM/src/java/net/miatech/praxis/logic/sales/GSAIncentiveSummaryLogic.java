package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX133S01A1777Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.GSAIncentiveSummaryDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSAIncentiveSummaryLogic {

    private GSAIncentiveSummaryDAO objDAO = new GSAIncentiveSummaryDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX133S01A1777Filter> loadPX133S01A1777(PX133S01A1777Filter filter) throws SQLException, Exception {
        return objDAO.loadPX133S01A1777(filter);
    }
}
