package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.AccountingCalendarDAO;
import net.miatech.praxis.flown.A1790;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class AccountingCalendarLogic {

    private final AccountingCalendarDAO objDAO = new AccountingCalendarDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1790> loadPX090SQP0003(A1790 filter) throws SQLException, Exception {
        return objDAO.loadPX090SQP0003(filter);
    }

    public String loadPX090SQP0004(A1790 filter, UserView user) throws SQLException, Exception {
        return objDAO.loadPX090SQP0004(filter, user);
    }

}
