package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AuditControlDAO;
import net.miatech.praxisbi.A1955Filter;
import net.miatech.sql.biamdb.AuditFilter;
import net.miatech.sql.biamdb.ModuleFilter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class AuditControlLogic {

    private AuditControlDAO objDAO = new AuditControlDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<AuditFilter> USP_BI_REPORTE_SEL(AuditFilter filter) throws SQLException {
        return objDAO.USP_BI_REPORTE_SEL(filter);
    }
    
    public List<ModuleFilter> USP_BI_REPORTE_MODULE_SEL() throws SQLException {
        return objDAO.USP_BI_REPORTE_MODULE_SEL();
    }
    public AuditFilter USP_BI_REPORTE_UPD(AuditFilter filter) throws SQLException {
        return objDAO.USP_BI_REPORTE_UPD(filter);
    }
    
    
}
