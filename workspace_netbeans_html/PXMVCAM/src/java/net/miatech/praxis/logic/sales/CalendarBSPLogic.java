package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX036S01A1529Filter;
import net.miatech.beans.PX036S02A1529Filter;
import net.miatech.beans.SQP02284Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CalendarBSPDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CalendarBSPLogic {
    
    private CalendarBSPDAO objDAO = new CalendarBSPDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX036S01A1529Filter> loadPX036S01A1529(PX036S01A1529Filter filter) throws SQLException {
        return objDAO.loadPX036S01A1529(filter);
    }
    
    public void setSQP02284(SQP02284Filter filter) throws SQLException {
        objDAO.setSQP02284(filter);
    }

    public PX036S02A1529Filter setPX036S02A1529(PX036S02A1529Filter filter, String strOption) throws SQLException {
        return objDAO.setPX036S02A1529(filter, strOption);
    }
}
