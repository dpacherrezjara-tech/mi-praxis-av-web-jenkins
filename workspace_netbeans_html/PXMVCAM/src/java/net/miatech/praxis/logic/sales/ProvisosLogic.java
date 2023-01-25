package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX019S01A856Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ProvisosDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class ProvisosLogic {
    
    private ProvisosDAO objDAO = new ProvisosDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public   List<PX019S01A856Filter> loadPX019S01A856(PX019S01A856Filter filter) throws SQLException {
        return objDAO.loadPX019S01A856(filter);
    }
}
