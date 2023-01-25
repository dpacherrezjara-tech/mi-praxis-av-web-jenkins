package net.miatech.praxis.logic.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2560Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.ADMReasonsDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ADMReasonsLogic {
    
    private ADMReasonsDAO objDAO = new ADMReasonsDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A2560Filter> SearchADMReasons(A2560Filter filter) throws SQLException, Exception {
       return objDAO.SearchADMReasons(filter);
    }
    
    public List<A2560Filter> searchCodReason(A2560Filter filter) throws SQLException, Exception {
       return objDAO.searchCodReason(filter);
    }
    
    public A2560Filter mantenimientoADMReasons(A2560Filter filter) throws SQLException, Exception {
        return objDAO.mantenimientoADMReasons(filter);
    }
}
