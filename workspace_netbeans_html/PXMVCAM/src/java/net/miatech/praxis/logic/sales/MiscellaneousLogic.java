package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX019S01A051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.MiscellaneousDAO;
import org.springframework.ui.ModelMap;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class MiscellaneousLogic {
    
    private MiscellaneousDAO objDAO = new MiscellaneousDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public   List<PX019S01A051Filter> loadPX019S01A051(PX019S01A051Filter filter) throws SQLException {
        return objDAO.loadPX019S01A051(filter);
    }
}
