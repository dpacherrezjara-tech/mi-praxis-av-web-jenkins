package net.miatech.praxis.logic.payments;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.LoadConciliationDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2370Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadConciliationLogic {
    
    private LoadConciliationDAO loadConciliationDAO = new LoadConciliationDAO();
    
    public void setSession(IServerSession ss) {
        loadConciliationDAO.setSession(ss);
    }
    
    public List<A2290Filter> loadPX263SQP00652(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00652(filter);
    }
    
    public List<A2370Filter> loadPX263SQP00899(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00899(filter);
    }
    
    public HashMap<String, List<A2290Filter>> loadPX263SQP01960(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP01960(filter);
    }
    
    public HashMap<String, List<A2290Filter>> loadPX263SQP01828(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP01828(filter);
    }
    
    public HashMap<String, List<A2290Filter>> loadPX263SQP01976(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP01976(filter);
    }
    
    public List<A2290Filter> loadPX263SQP00655(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00655(filter);
    }
    
    public List<A2290Filter> loadPX263SQP00656(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00656(filter);
    }
    
    public List<A2290Filter> loadPX263SQP00657(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00657(filter);
    }
    
    public List<A2290Filter> loadPX263SQP00658(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00658(filter);
    }
    
    public List<A2290Filter> loadPX263SQP00900(A2370Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00900(filter);
    }
    
    public List<A2290Filter> loadPX263SQP00901(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00901(filter);
    }
    
    public A2290Filter loadPX263SQP00659(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00659(filter);
    }
    
    public List<A2290Filter> loadPX263SQP00817(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00817(filter);
    }
    
    public List<A2290Filter> loadPX263SQP00676(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00676(filter);
    }
    
    public List<A2290Filter> loadPX263SQP00894(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00894(filter);
    }
    
    public List<A2290Filter> loadPX263SQP00677(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00677(filter);
    }
    
    public List<A2290Filter> loadPX263SQP00678(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00678(filter);
    }
    
    public List<A2290Filter> loadPX263SQP03986(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP03986(filter);
    }
    public List<A2290Filter> loadPX263SQP05116(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP05116(filter);
    }
    public HashMap<String, List<A2290Filter>> loadPX263SQP00715(A2290Filter filter) throws SQLException, Exception {
        return loadConciliationDAO.loadPX263SQP00715(filter);
    }
}
