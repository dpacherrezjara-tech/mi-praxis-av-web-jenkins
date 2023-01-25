package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1835Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.dao.sales.AccountingMasterPagaTodoDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class AccountingMasterPagaTodoLogic {

    private AccountingMasterPagaTodoDAO objDAO = new AccountingMasterPagaTodoDAO();
//    private MasterDAO masterDAO = new MasterDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
//        masterDAO.setSession(ss);
    }

    public List<A1835Filter> loadPX126S02A1835(A1835Filter filter) throws SQLException {
        return objDAO.loadPX170S01A1835(filter);
    }
    
    public String accountMasterBINESAllPayMaintance(A1835Filter filter, String strOption) throws SQLException {
        return objDAO.accountMasterTaxMaintance(filter, strOption);
    }
}
