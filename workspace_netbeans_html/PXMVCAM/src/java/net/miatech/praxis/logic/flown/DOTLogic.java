package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A3084Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.DOTDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class DOTLogic {

    private DOTDAO objDAO = new DOTDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3084Filter> loadSQP01807(A3084Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP01807(filter);
    }

    public List<A3084Filter> loadSQP01808(A3084Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP01808(filter);
    }

    public List<A3084Filter> loadDOT_COBOL(A3084Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadDOT_COBOL(filter, hmAeropuertos);
    }
}
