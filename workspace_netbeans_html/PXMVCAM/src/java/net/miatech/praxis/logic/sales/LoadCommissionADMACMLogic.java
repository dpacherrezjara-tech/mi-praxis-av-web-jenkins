package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2960Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.LoadCommissionADMACMDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadCommissionADMACMLogic {

    private LoadCommissionADMACMDAO objDAO = new LoadCommissionADMACMDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A2960Filter> lst_search(A2960Filter filter) throws SQLException, Exception {
        return objDAO.lstsearch(filter);
    }
    
    public String getLoadCommiADMACM(A2960Filter filter) throws SQLException, Exception {
        return objDAO.getLoadCommiADMACM(filter);
    }
}
