package net.miatech.praxis.logic.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.SaleAudit.A2664Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.IvaDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class IvaLogic {
    
    private IvaDAO objDAO = new IvaDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A2664Filter> Search(A2664Filter filter) throws SQLException, Exception {
        
       return objDAO.Search(filter);
    }
    
    public A2664Filter mantenimientoRange(A2664Filter filter) throws SQLException, Exception {
        return objDAO.mantenimientoIVA(filter);
    }
}
