package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingMasterSalesDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AccountingMasterSalesLogic {
    
    private AccountingMasterSalesDAO objDAO = new AccountingMasterSalesDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1740Filter> setPX126S02A1740(A1740Filter filter) throws SQLException {
        return objDAO.loadPX126S02A1740(filter);
    }

    public String accountMasterMaintance(A1740Filter filter, String strOption) throws SQLException {
        return objDAO.accountMasterMaintance(filter, strOption);
    }
    public List<A1740Filter> loadPX126S02A1740EXCEL(A1740Filter filter) throws SQLException, Exception {
        return objDAO.loadPX126S02A1740EXCEL(filter);
    }
}
