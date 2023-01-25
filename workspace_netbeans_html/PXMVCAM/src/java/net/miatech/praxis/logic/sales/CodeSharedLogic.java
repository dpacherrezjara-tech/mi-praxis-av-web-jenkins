package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX031S01A766Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CodeSharedDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CodeSharedLogic {
    
    private CodeSharedDAO objDAO = new CodeSharedDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX031S01A766Filter> loadPX031S01A766(PX031S01A766Filter filter) throws SQLException {
        return objDAO.loadPX031S01A766(filter);
    }
    
    public String SQP02417(PX031S01A766Filter filter, String strOption) throws SQLException, Exception {
        return objDAO.SQP02417(filter, strOption);
    }
}
