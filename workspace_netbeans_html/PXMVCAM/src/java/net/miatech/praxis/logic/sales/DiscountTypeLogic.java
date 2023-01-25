package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX033S01A864Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.DiscountTypeDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class DiscountTypeLogic {
    
    private DiscountTypeDAO objDAO = new DiscountTypeDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX033S01A864Filter> loadPX033S01A864(PX033S01A864Filter filter) throws SQLException {
        return objDAO.loadPX033S01A864(filter);
    }
}
