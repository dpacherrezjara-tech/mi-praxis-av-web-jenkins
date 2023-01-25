package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A1155Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CloneSchemeDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class CloneSchemeLogic {

    private CloneSchemeDAO objDAO = new CloneSchemeDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public   List<A1155Filter> getListAgreement(A1155Filter filter) throws SQLException, Exception {
       return objDAO.getListAgreement(filter);
    }
    
    public   List<A1155Filter> setSaveClone(A1155Filter filter) throws SQLException, Exception {
       return objDAO.setSaveClone(filter);
    }
}
