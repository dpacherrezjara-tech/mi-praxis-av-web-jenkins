package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.TCNFilter;
import net.miatech.beans.WRF001Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A729;
import net.miatech.praxis.dao.interline.SPAProfitabilityDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class SPAProfitabilityLogic {
    
    private SPAProfitabilityDAO objDAO = new SPAProfitabilityDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<WRF001Filter> loadPX241S01(WRF001Filter filter) throws SQLException, Exception {
        return objDAO.loadPX241S01(filter);
    }

    public List<WRF001Filter> loadPX241S02(WRF001Filter filter) throws SQLException, Exception {
        return objDAO.loadPX241S02(filter);
    }

    public List<WRF001Filter> loadPX241S03(WRF001Filter filter) throws SQLException, Exception {
        return objDAO.loadPX241S03(filter);
    }

    public List<WRF001Filter> loadPX241S04(WRF001Filter filter) throws SQLException, Exception {
        return objDAO.loadPX241S04(filter);
    }

    public List<WRF001Filter> loadPX241S05(WRF001Filter filter) throws SQLException, Exception {
        return objDAO.loadPX241S05(filter);
    }

    public List<WRF001Filter> loadPX241S06(WRF001Filter filter) throws SQLException, Exception {
        return objDAO.loadPX241S06(filter);
    }

    public List<WRF001Filter> loadPX241S07(WRF001Filter filter) throws SQLException, Exception {
        return objDAO.loadPX241S07(filter);
    }

    public List<WRF001Filter> loadPX241S08(WRF001Filter filter) throws SQLException, Exception {
        return objDAO.loadPX241S08(filter);
    }

    public List<WRF001Filter> loadPX241S09(WRF001Filter filter) throws SQLException, Exception {
        return objDAO.loadPX241S09(filter);
    }

    public HashMap loadPX164SQP0038(A020Filter filter) throws SQLException, Exception {
        return objDAO.loadPX164SQP0038(filter);
    }

    public TCNFilter loadPX164SQP0077(String strTicket, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX164SQP0077(strTicket, hmAeropuertos);
    }

    public List<A729> loadPX164SQP00476(A020Filter filter) throws SQLException, Exception {
        return objDAO.loadPX164SQP00476(filter);
    }
}
