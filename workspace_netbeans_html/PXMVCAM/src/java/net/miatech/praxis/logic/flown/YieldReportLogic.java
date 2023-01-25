package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.YieldReportDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class YieldReportLogic {

    private YieldReportDAO objDAO = new YieldReportDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1692Filter> loadPX084S03A1784(A1692Filter filter, HashMap<String, String> hmPaises, HashMap<String, String> hmAeropuertos, int rowsPag) throws SQLException, Exception {
        return objDAO.loadPX084S03A1784(filter, hmPaises, hmAeropuertos, rowsPag);
    }

    public List<A1692Filter> loadPX084S02A1784(A1692Filter filter, int rowsPag) throws SQLException, Exception {
        return objDAO.loadPX084S02A1784(filter, rowsPag);
    }
}
