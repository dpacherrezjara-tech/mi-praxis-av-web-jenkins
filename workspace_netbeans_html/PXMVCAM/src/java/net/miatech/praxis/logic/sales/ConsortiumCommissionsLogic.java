package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1805Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ConsortiumCommissionsDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ConsortiumCommissionsLogic {

    private ConsortiumCommissionsDAO objDAO = new ConsortiumCommissionsDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public String setSQP01320(A1805Filter filter) throws SQLException, Exception
    {
        return objDAO.getSQP01320(filter);
    }
    
    public List<A1805Filter> downloadText(String filter) throws SQLException, Exception
    {
        return objDAO.downloadText(filter);
    }
}
