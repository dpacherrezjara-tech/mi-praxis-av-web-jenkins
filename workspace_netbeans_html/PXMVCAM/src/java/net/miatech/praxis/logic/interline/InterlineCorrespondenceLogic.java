package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.InterlineCorrespondenceDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class InterlineCorrespondenceLogic {
    
    private InterlineCorrespondenceDAO objDAO = new InterlineCorrespondenceDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A020Filter> loadPX183S01A020(A020Filter filter) throws SQLException, Exception {
        return objDAO.loadPX183S01A020(filter);
    }

    public A020Filter loadPX183S02A020(A020Filter filter) throws SQLException, Exception {
        return objDAO.loadPX183S02A020(filter);
    }

    public String loadPX183S03A020(A020Filter filter, String option) throws SQLException, Exception {
        return objDAO.loadPX183S03A020(filter, option);
    }
}
