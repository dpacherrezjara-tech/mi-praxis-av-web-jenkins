package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX036S01A1530Filter;
import net.miatech.beans.PX036S01A1720Filter;
import net.miatech.beans.PX063D01A1720Filter;
import net.miatech.beans.PX063S01A713Filter;
import net.miatech.beans.PX063S01A714Filter;
import net.miatech.beans.SQP00133Filter;
import net.miatech.beans.SQP01299Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ControlFiguresDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ControlFiguresLogic {

    private ControlFiguresDAO salesControlFiguresDAO = new ControlFiguresDAO();

    public void setSession(IServerSession ss) {
        salesControlFiguresDAO.setSession(ss);
    }

    public List<PX036S01A1530Filter> loadPX036S01A1530(PX036S01A1530Filter filter) throws SQLException, Exception {
        return salesControlFiguresDAO.loadPX036S01A1530(filter);
    }

    public List<PX036S01A1720Filter> loadPX036S01A1720(PX036S01A1720Filter filter) throws SQLException, Exception {
        return salesControlFiguresDAO.loadPX036S01A1720(filter);
    }
    
    public List<SQP00133Filter> getSQP00133(SQP00133Filter filter) throws SQLException, Exception {
        return salesControlFiguresDAO.getSQP00133(filter);
    }

    public List loadPX063D01A1720(PX063D01A1720Filter filter) throws SQLException, Exception {
        return salesControlFiguresDAO.loadPX063D01A1720(filter);
    }
    
    public List loadPX063S01A713(PX063S01A713Filter filter) throws SQLException, Exception {
        return salesControlFiguresDAO.loadPX063S01A713(filter);
    }
    
    public List<PX036S01A1720Filter> loadSQP00397(PX036S01A1720Filter filter) throws SQLException, Exception {
        return salesControlFiguresDAO.loadSQP00397(filter);
    }
    
    public List SQP01299Filter(SQP01299Filter filter) throws SQLException, Exception {
        return salesControlFiguresDAO.SQP01299Filter(filter);
    }
     
    public List loadPX063S01A714(PX063S01A714Filter filter) throws SQLException, Exception {
        return salesControlFiguresDAO.loadPX063S01A714(filter);
    }
}
