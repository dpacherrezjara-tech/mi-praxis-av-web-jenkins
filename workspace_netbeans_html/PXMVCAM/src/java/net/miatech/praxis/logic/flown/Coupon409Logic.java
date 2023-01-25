package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1690Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.Coupon409DAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class Coupon409Logic {

    private Coupon409DAO objDAO = new Coupon409DAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1690Filter> loadPX089SQP0002(A1690Filter filter) throws SQLException, Exception {
        return objDAO.loadPX089SQP0002(filter);
    }
}
