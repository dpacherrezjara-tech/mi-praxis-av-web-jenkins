package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1736Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.A051;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.dao.sales.AccountingMasterClientDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AccountingMasterClientLogic {
    
    private AccountingMasterClientDAO objDAO = new AccountingMasterClientDAO();
    private MasterDAO masterDAO = new MasterDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
        masterDAO.setSession(ss);
    }

    public List<A051> loadCountry() throws SQLException {
        return masterDAO.loadCountry();
    }

    public List<A006> loadCurrency() throws SQLException, Exception {
        return objDAO.loadCurrency();
    }
    
    public List<String> loadSubFu() throws SQLException, Exception {
        return objDAO.loadSubFu();
    }
    
    public List<String> loadFP() throws SQLException
    {
        return masterDAO.loadFP();
    }
    
    public List<A051> loadTypeCC() throws SQLException
    {
        return masterDAO.loadTypeCC();
    }
    
    public List<A1736Filter> loadPX128S01A1736(A1736Filter filter) throws SQLException
    {
        return objDAO.loadPX128S01A1736(filter);
    }
    
    public String salesAccountMaintanceClient(A1736Filter filter, String strOption) throws SQLException {
        return objDAO.salesAccountMaintanceClient(filter,strOption);
    }
    
    public List<A1736Filter> loadPX128S01A1736EXCEL(A1736Filter filter) throws SQLException, Exception
    {
        return objDAO.loadPX128S01A1736EXCEL(filter);
    }
}
