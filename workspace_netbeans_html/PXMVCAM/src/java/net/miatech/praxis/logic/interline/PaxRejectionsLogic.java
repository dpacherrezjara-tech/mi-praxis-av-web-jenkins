package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.PaxRejectionsDAO;
import net.miatech.praxis.interline.filter.WRF016Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class PaxRejectionsLogic {

    private PaxRejectionsDAO objDAO = new PaxRejectionsDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public HashMap loadPX189S01WRF001(WRF016Filter filter) throws SQLException, Exception {
        return objDAO.loadPX189S01WRF001(filter);
    }

    public HashMap loadPX189S02WRF003(WRF016Filter filter) throws SQLException, Exception {
        return objDAO.loadPX189S02WRF003(filter);
    }

    public HashMap loadPX165S03WRF001(WRF016Filter filter) throws SQLException, Exception {
        return objDAO.loadPX165S03WRF001(filter);
    }

    public HashMap loadPX189S03A020(WRF016Filter filter) throws SQLException, Exception {
        return objDAO.loadPX189S03A020(filter);
    }

    public HashMap loadPX165S04WRF002(WRF016Filter filter) throws SQLException, Exception {
        return objDAO.loadPX165S04WRF002(filter);
    }

    public WRF016Filter loadPX165S05WRF001(WRF016Filter filter) throws SQLException, Exception {
        return objDAO.loadPX165S05WRF001(filter);
    }

    public HashMap loadPX189SQP03909(WRF016Filter filter) throws SQLException, Exception {
        return objDAO.loadPX189SQP03909(filter);
    }
    
    public HashMap loadPX189SQP03910(WRF016Filter filter) throws SQLException, Exception {
        return objDAO.loadPX189SQP03910(filter);
    }    
}
