package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.SourceCodeDAO;
import net.miatech.praxis.interline.A1852;
import net.miatech.praxis.interline.filter.A1852Filter;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class SourceCodeLogic {

    private SourceCodeDAO objDAO = new SourceCodeDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1852Filter> loadPX188S01A1852(A1852Filter filter) throws Exception {
        return objDAO.loadPX188S01A1852(filter);
    }

    public String loadPX188S02A1852(A1852Filter filter, String option) throws SQLException, Exception {
        return objDAO.loadPX188S02A1852(filter, option);
    }

    public A1852Filter loadPX188S03A1852(A1852Filter filter) throws Exception {
        return objDAO.loadPX188S03A1852(filter);
    }

    public List<A1852> loadPX188S04A1852() throws Exception {
        return objDAO.loadPX188S04A1852();
    }
}
