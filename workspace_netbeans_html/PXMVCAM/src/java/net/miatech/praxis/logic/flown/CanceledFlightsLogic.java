package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.praxis.flown.filter.A3778Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.CanceledFlightsDAO;

// </editor-fold>

public class CanceledFlightsLogic {

    private CanceledFlightsDAO objDAO = new CanceledFlightsDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3778Filter> loadPX089SQP04419(A3778Filter filter) throws SQLException, Exception {
        return objDAO.loadPX089SQP04419(filter);
    }
}
