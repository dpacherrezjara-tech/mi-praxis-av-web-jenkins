package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import net.miatech.beans.PX167S01WRF070Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.GSAIncentiveInterlineDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GSAIncentiveInterlineLogic {

    private GSAIncentiveInterlineDAO objDAO = new GSAIncentiveInterlineDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public void loadPX167S01WRF070(PX167S01WRF070Filter filter) throws SQLException, Exception {
        objDAO.loadPX167S01WRF070(filter);
    }
}
