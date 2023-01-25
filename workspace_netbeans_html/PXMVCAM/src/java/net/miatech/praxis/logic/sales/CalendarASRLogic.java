package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX036S01A1528Filter;
import net.miatech.beans.PX036S02A1528Filter;
import net.miatech.beans.SQP00347Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CalendarASRDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CalendarASRLogic {
    
    private CalendarASRDAO objDAO = new CalendarASRDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX036S01A1528Filter> loadPX036S01A1528(PX036S01A1528Filter filter) throws SQLException {
        return objDAO.loadPX036S01A1528(filter);
    }

    public PX036S02A1528Filter setPX036S02A1528(PX036S02A1528Filter filter, String strOption) throws SQLException {
        return objDAO.setPX036S02A1528(filter, strOption);
    }

    public void setSQP00347(SQP00347Filter filter) throws SQLException {
        objDAO.setSQP00347(filter);
    }
}
