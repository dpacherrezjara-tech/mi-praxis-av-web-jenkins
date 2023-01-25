package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A728Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.ISRPricingDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ISRPricingLogic {

    private ISRPricingDAO objDAO = new ISRPricingDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A728Filter> loadPX088S01A728(A728Filter filter) throws SQLException, Exception {
        return objDAO.loadPX088S01A728(filter);
    }

    public List<A728Filter> loadPX088S02A720(A728Filter filter) throws SQLException, Exception {
        return objDAO.loadPX088S02A720(filter);
    }
}
