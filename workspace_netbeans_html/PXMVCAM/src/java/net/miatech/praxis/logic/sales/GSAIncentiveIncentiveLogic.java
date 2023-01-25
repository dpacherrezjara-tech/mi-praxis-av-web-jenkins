package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX182S01A1848Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.GSAIncentiveIncentiveDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSAIncentiveIncentiveLogic {

    private GSAIncentiveIncentiveDAO objDAO = new GSAIncentiveIncentiveDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX182S01A1848Filter> loadPX182S01A1848(PX182S01A1848Filter filter) throws SQLException, Exception {
        return objDAO.loadPX182S01A1848(filter);
    }
}
