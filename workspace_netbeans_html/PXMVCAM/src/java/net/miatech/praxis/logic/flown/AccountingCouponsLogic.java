package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A3084Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.AccountingCouponsDAO;

// </editor-fold>
/**
 *
 * @author jsolano
 */
public class AccountingCouponsLogic {

    private AccountingCouponsDAO objDAO = new AccountingCouponsDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3084Filter> loadSQP04611(A3084Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP04611(filter);
    }
}
