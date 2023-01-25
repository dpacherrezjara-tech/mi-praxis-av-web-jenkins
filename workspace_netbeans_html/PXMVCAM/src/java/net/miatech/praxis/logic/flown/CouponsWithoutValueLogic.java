package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.CouponsWithoutValueDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class CouponsWithoutValueLogic {

    private CouponsWithoutValueDAO objDAO = new CouponsWithoutValueDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1692Filter> loadPX123SQP0015(A1692Filter filter) throws SQLException, Exception {
        return objDAO.loadPX123SQP0015(filter);
    }
}
