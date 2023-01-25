package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX036S01A1529Filter;
import net.miatech.beans.PX115S01A1529Filter;
import net.miatech.beans.SQP00149Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CalendarControlBSPDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CalendarControlBSPLogic {

    private CalendarControlBSPDAO objDAO = new CalendarControlBSPDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<PX115S01A1529Filter> loadPX115S01A1529(PX115S01A1529Filter filter) throws SQLException, Exception {
        return objDAO.loadPX115S01A1529(filter);
    }
        
    public void setSQP00149(SQP00149Filter filter) throws SQLException, Exception {
        objDAO.setSQP00149(filter);
    }
    public List<PX036S01A1529Filter> loadPX036S01A1529(PX036S01A1529Filter filter) throws SQLException, Exception {
        return objDAO.loadPX036S01A1529(filter);
    }
}
