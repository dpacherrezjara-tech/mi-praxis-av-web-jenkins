package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1702Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.flown.A1702;
import net.miatech.praxis.dao.flown.AircraftMasterDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AircraftMasterLogic {
    
    private AircraftMasterDAO objDAO = new AircraftMasterDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A1702Filter> loadPX102S01A1702(A1702Filter filter) throws SQLException, Exception {
        return objDAO.loadPX102S01A1702(filter);
    }

    public A1702 loadPX102S02A1702(A1702Filter filter) throws SQLException, Exception {
        return objDAO.loadPX102S02A1702(filter);
    }

    public String loadPX102S03A1702(A1702 filter, String option) throws SQLException, Exception {
        return objDAO.loadPX102S03A1702(filter, option);
    }
}
