package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX019S01A1348Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.DeliveryFileBSPDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class DeliveryFileBSPLogic {

    private DeliveryFileBSPDAO objDAO = new DeliveryFileBSPDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX019S01A1348Filter> loadPX019S01A1348(PX019S01A1348Filter filter) throws SQLException, Exception {
        return objDAO.loadPX019S01A1348(filter);
    }
}
