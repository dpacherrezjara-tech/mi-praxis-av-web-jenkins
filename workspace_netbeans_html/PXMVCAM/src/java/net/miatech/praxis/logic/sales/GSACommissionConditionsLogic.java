package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX139S01A1773Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.GSACommissionConditionsDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSACommissionConditionsLogic {

    private GSACommissionConditionsDAO objDAO = new GSACommissionConditionsDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX139S01A1773Filter> loadPX139S01A1773(PX139S01A1773Filter filter) throws SQLException, Exception {
        return objDAO.loadPX139S01A1773(filter);
    }
}
