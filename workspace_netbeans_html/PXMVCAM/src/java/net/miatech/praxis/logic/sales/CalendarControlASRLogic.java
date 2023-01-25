package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX111S01A1528Filter;
import net.miatech.beans.SQP00152Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CalendarControlASRDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CalendarControlASRLogic {

    private CalendarControlASRDAO objDAO = new CalendarControlASRDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<PX111S01A1528Filter> loadPX111S01A1528(PX111S01A1528Filter filter) throws SQLException, Exception {
        return objDAO.loadPX111S01A1528(filter);
    }
    
    public void setSQP00152(SQP00152Filter filter) throws SQLException, Exception {
        objDAO.setSQP00152(filter);
    }
}
