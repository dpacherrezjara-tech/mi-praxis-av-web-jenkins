package net.miatech.praxis.logic.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.SQP00989Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.SalesAuditReportDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class SalesAuditReportLogic {
    
    private SalesAuditReportDAO objDAO = new SalesAuditReportDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public   List<A1672Filter> lst_search(A1672Filter filter) throws SQLException, Exception {
        return objDAO.lstsearch(filter);
    }
    
    public List<A1580Filter> lstComponent(A1672Filter filter) throws SQLException, Exception {
        return objDAO.lstComponent(filter);
    }

    public List<A1580Filter> lstComponentUsed(A1672Filter filter) throws SQLException, Exception {
        return objDAO.lstComponentUsed(filter);
    }

    public List<A1580Filter> lstComponentOld(A1672Filter filter) throws SQLException, Exception {
        return objDAO.lstComponentOld(filter);
    }

    public List<A1673Filter> lstTax(A1672Filter filter) throws SQLException, Exception {
        return objDAO.lstTax(filter);
    }
    
    public SQP00989Filter searchADMData(A1672Filter filter) throws SQLException, Exception {
        return objDAO.searchADMData(filter);
    }
    
    public List<A1672Filter> lstItinerary(A1672Filter filter) throws SQLException, Exception {
        return objDAO.lstItinerary(filter);
    }
}
