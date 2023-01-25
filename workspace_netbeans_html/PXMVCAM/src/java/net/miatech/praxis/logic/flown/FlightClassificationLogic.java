package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.logic.flown.*;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX019S01A051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.dao.flown.FlightClassificationDAO;
import org.springframework.ui.ModelMap;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class FlightClassificationLogic {
    
    private FlightClassificationDAO objDAO = new FlightClassificationDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public   List<PX019S01A051Filter> loadPX019S01A051(PX019S01A051Filter filter) throws SQLException {
        return objDAO.loadPX019S01A051(filter);
    }
    
    public String FlightClassificationMaintance(PX019S01A051Filter filter, String strOption) throws SQLException, Exception {
        return objDAO.FlightClassificationMaintance(filter, strOption);
    }
}
