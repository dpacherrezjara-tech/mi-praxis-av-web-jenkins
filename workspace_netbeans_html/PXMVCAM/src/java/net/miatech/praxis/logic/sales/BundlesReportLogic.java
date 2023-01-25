package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.SQP00904Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.BundlesReportDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class BundlesReportLogic {
    
    private BundlesReportDAO objDAO = new BundlesReportDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP00904Filter> loadSQP00904(SQP00904Filter filter) throws SQLException {
        return objDAO.loadSQP00904(filter);
    }
    
}
