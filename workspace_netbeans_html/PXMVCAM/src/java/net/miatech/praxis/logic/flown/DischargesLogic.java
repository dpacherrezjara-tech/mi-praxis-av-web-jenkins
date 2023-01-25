package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1785Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.DischargesDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class DischargesLogic {

    private DischargesDAO objDAO = new DischargesDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1785Filter> loadPX100S02A1785(A1692Filter filter) throws SQLException, Exception {
        return objDAO.loadPX100S02A1785(filter);
    }
    
    public List<A1785Filter> loadPX100S03A1785(A1785Filter filter) throws SQLException, Exception {
        return objDAO.loadPX100S03A1785(filter);
    }
    
    public List<A1785Filter> loadPX100S04A1785(A1785Filter filter) throws SQLException, Exception {
        return objDAO.loadPX100S04A1785(filter);
    }
    
}
