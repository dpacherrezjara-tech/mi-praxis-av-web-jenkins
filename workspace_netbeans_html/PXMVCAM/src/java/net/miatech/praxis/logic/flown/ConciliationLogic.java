package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.ConciliationDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class ConciliationLogic {
    
    private ConciliationDAO objDAO = new ConciliationDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1692Filter> loadPX352_PAPER_TICKET(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, ClassNotFoundException {
        return objDAO.loadPX352_PAPER_TICKET(filter, hmAeropuertos);
    }
    
    public HashMap loadPX362SQP01273(String fecha, HashMap<String, String> hmAeropuertos) throws SQLException, ClassNotFoundException {
        return objDAO.loadPX362SQP01273(fecha, hmAeropuertos);
    }

    public List<A1692Filter> loadPX_TKTACS(A1691Filter filter) throws SQLException, ClassNotFoundException {
        return objDAO.loadPX_TKTACS(filter);
    }
}
