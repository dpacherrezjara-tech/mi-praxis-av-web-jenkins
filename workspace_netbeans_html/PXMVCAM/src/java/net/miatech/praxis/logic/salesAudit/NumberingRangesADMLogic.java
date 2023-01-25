package net.miatech.praxis.logic.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import net.miatech.praxis.logic.payments.*;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.SaleAudit.A2563Filter;
import net.miatech.beans.SaleAudit.A2665Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.LoadConciliationDAO;
import net.miatech.praxis.dao.salesAudit.NumberingRangesADMDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2370Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class NumberingRangesADMLogic {
    
    private NumberingRangesADMDAO rangeNumberADM = new NumberingRangesADMDAO();
    
    public void setSession(IServerSession ss) {
        rangeNumberADM.setSession(ss);
    }
    
    public List<A2563Filter> SearchRangeNum(A2563Filter filter) throws SQLException, Exception {

        return rangeNumberADM.SearchRangeNum(filter);
    }
    
    public A2563Filter mantenimientoRange(A2563Filter filter) throws SQLException, Exception {
        return rangeNumberADM.mantenimientoRange(filter);
    }
}
