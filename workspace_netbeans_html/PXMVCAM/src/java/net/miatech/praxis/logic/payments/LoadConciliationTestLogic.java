package net.miatech.praxis.logic.payments;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.LoadConciliationTestDAO;
import net.miatech.praxis.payment.filter.A4164Filter;
import net.miatech.praxis.payment.filter.A2370Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadConciliationTestLogic {

    private LoadConciliationTestDAO loadConciliationTestDAO = new LoadConciliationTestDAO();

    public void setSession(IServerSession ss) {
        loadConciliationTestDAO.setSession(ss);
    }

    public List<A4164Filter> loadPX584SQP04338(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04338(filter);
    }

    public List<A4164Filter> loadPX584SQP04730(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04730(filter);
    }

    public List<A2370Filter> loadPX584SQP00899(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00899(filter);
    }

    public HashMap<String, List<A4164Filter>> loadPX584SQP04347(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04347(filter);
    }

    public HashMap<String, List<A4164Filter>> loadPX584SQP04352(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04352(filter);
    }

    public HashMap<String, List<A4164Filter>> loadPX584SQP04353(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04353(filter);
    }

    public List<A4164Filter> loadPX584SQP04340(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04340(filter);
    }

    public List<A4164Filter> loadPX584SQP04731(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04731(filter);
    }

    public List<A4164Filter> loadPX584SQP04344(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04344(filter);
    }

    public List<A4164Filter> loadPX584SQP04732(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04732(filter);
    }

    public List<A4164Filter> loadPX584SQP04345(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04345(filter);
    }

    public List<A4164Filter> loadPX584SQP04346(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04346(filter);
    }

    public List<A4164Filter> loadPX584SQP00900(A2370Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00900(filter);
    }

    public List<A4164Filter> loadPX584SQP00901(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00901(filter);
    }

    public A4164Filter loadPX584SQP04348(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04348(filter);
    }

    public List<A4164Filter> loadPX584SQP04351(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04351(filter);
    }

    public List<A4164Filter> loadPX584SQP04339(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04339(filter);
    }

    public List<A4164Filter> loadPX584SQP04349(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04349(filter);
    }

    public List<A4164Filter> loadPX584SQP04341(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04341(filter);
    }

    public List<A4164Filter> loadPX584SQP04342(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04342(filter);
    }

    public List<A4164Filter> loadPX584SQP04350(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04350(filter);
    }

    public HashMap<String, List<A4164Filter>> loadPX584SQP04343(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04343(filter);
    }

    public List<A4164Filter> loadPX584SQP04604(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04604(filter);
    }

    public String loadPX584SQP04752(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04752(filter);
    }
}
