package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1741Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.A051;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.dao.sales.AccountingMasterTAXDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AccountingMasterTAXLogic {
    
    private AccountingMasterTAXDAO objDAO = new AccountingMasterTAXDAO();
    private MasterDAO masterDAO = new MasterDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
        masterDAO.setSession(ss);
    }

    public List<A051> loadCountry() throws SQLException {
        return masterDAO.loadCountry();
    }

    public List<A006> loadCurrency() throws SQLException {
        return masterDAO.loadCurrency();
    }

    public List<A051> loadTax() throws SQLException {
        return masterDAO.loadTax();
    }

    public List<A1741Filter> loadPX126S02A1741(A1741Filter filter) throws SQLException {
        return objDAO.loadPX126S02A1741(filter);
    }

    public String accountMasterTaxMaintance(A1741Filter filter, String strOption) throws SQLException {
        return objDAO.accountMasterTaxMaintance(filter, strOption);
    }
    public List<A1741Filter> loadPX126S02A1741EXCEL(A1741Filter filter) throws SQLException, Exception {
        return objDAO.loadPX126S02A1741EXCEL(filter);
    }
}
