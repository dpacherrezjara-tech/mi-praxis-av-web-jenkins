package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.A050Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A729;
import net.miatech.praxis.dao.interline.InvoicingDashboardDAO;
import net.miatech.praxis.interline.filter.WRF016Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class InvoicingDashboardLogic {
    
    private InvoicingDashboardDAO objDAO = new InvoicingDashboardDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<WRF016Filter> loadPX199S01WRF051(WRF016Filter filter) throws SQLException, Exception {
        return objDAO.loadPX199S01WRF051(filter);
    }

    public List<WRF016Filter> loadPX199S02WRF051(WRF016Filter filter) throws SQLException, Exception {
        return objDAO.loadPX199S02WRF051(filter);
    }

    public List<WRF016Filter> loadPX199S03WRF051(WRF016Filter filter) throws SQLException, Exception {
        return objDAO.loadPX199S03WRF051(filter);
    }

    public List<A050Filter> loadPX199SQP00235(WRF016Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX199SQP00235(filter, hmAeropuertos);
    }

    public List<A050Filter> loadPX199SQP00154(WRF016Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX199SQP00154(filter, hmAeropuertos);
    }

    public List<A729> loadPX164SQP0076(A020Filter filter) throws SQLException, Exception {
        return objDAO.loadPX164SQP0076(filter);
    }

    public List<A050Filter> loadPX199SQP00236(WRF016Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX199SQP00236(filter, hmAeropuertos);
    }
    public List<A050Filter> loadPX199_Reject(WRF016Filter filter, HashMap<String, String> hmAeropuertos) throws Exception {
        return objDAO.loadPX199_Reject(filter, hmAeropuertos );
    }
}
