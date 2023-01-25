package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.ClearingHouseDAO;
import net.miatech.praxis.interline.filter.IMF093Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ClearingHouseLogic {
    
    private ClearingHouseDAO objDAO = new ClearingHouseDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<IMF093Filter> loadPX197SQP00144(IMF093Filter filter) throws SQLException, Exception {
        return objDAO.loadPX197SQP00144(filter);
    }

    public List<IMF093Filter> loadPX197SQP00145(IMF093Filter filter) throws SQLException, Exception {
        return objDAO.loadPX197SQP00145(filter);
    }
}
