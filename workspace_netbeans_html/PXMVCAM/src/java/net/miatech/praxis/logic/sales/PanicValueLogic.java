package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX019S01A725Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.PanicValueDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class PanicValueLogic {
    
    private PanicValueDAO objDAO = new PanicValueDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<PX019S01A725Filter> loadPX019S01A725(PX019S01A725Filter filter) throws SQLException {
        return objDAO.loadPX019S01A725(filter);
    }
}
