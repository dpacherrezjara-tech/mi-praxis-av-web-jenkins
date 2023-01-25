package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A1740;
import net.miatech.praxis.dao.flown.AccountingMasterFlownDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AccountingMasterFlownLogic {
    
    private AccountingMasterFlownDAO objDAO = new AccountingMasterFlownDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A1740Filter> setPX122S03A1740(A1740Filter filter) throws SQLException {
        return objDAO.loadPX122S03A1740(filter);
    }
    
    public String catalogueAccountMaintance(A1740Filter filter, String strOption) throws SQLException {
        return objDAO.catalogueAccountMaintance(filter, strOption);
    }
    
    public List<A1740> setDocumentType() throws SQLException {
        return objDAO.loadDocumentType();
    }

    public List<A1740Filter> setAccountType() throws SQLException {
        return objDAO.loadAccountType();
    }
    
    public List<A1740> setCategory() throws SQLException {
        return objDAO.loadCategory();
    }
}
