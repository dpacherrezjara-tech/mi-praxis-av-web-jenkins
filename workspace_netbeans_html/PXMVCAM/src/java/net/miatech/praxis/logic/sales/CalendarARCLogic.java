package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX034S01A1527Filter;
import net.miatech.beans.PX036S02A1527Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CalendarARCDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CalendarARCLogic {
    
    private CalendarARCDAO objDAO = new CalendarARCDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX034S01A1527Filter> loadPX034S01A1527(PX034S01A1527Filter filter) throws SQLException {
        return objDAO.loadPX034S01A1527(filter);
    }

    public PX036S02A1527Filter setPX034S02A1527(PX036S02A1527Filter filter, String strOption) throws SQLException {
        return objDAO.setPX036S02A1527(filter, strOption);
    }
}
