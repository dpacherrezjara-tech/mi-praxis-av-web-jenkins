package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.AccountingMasterInterliDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AccountingMasterInterliLogic {

    private AccountingMasterInterliDAO objDAO = new AccountingMasterInterliDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1740Filter> setPX126S02A1740(A1740Filter filter) throws SQLException, Exception {
        return objDAO.loadPX126S02A1740(filter);
    }

    public String accountMasterMaintance(A1740Filter filter, String strOption) throws SQLException, Exception {
        return objDAO.accountMasterMaintance(filter, strOption);
    }
}
