package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.WorkProgressOALDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class WorkProgressOALLogic {

    private WorkProgressOALDAO objDAO = new WorkProgressOALDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public HashMap loadPX234S01A1692(A020Filter filter) throws SQLException, Exception {
        return objDAO.loadPX234S01A1692(filter);
    }

    public HashMap loadPX234S01A1692_2(A020Filter filter) throws SQLException, Exception {
        return objDAO.loadPX234S01A1692_2(filter);
    }

    public List<A1692Filter> loadSQP01513(A1692Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP01513(filter);
    }
}
