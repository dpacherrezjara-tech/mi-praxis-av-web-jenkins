package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX019S01A1633Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.TourCodeDAO;
import org.springframework.ui.ModelMap;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class TourCodeLogic {
    
    private TourCodeDAO objDAO = new TourCodeDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<PX019S01A1633Filter> loadPX019S01A1633(PX019S01A1633Filter filter, ModelMap map) throws SQLException {
        return objDAO.loadPX019S01A1633(filter, map);
    }
}
