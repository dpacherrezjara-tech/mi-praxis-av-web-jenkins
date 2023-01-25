package net.miatech.praxis.logic.plm;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.praxis.plm.filter.A3379Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.plm.MasterClassificationsDAO;

// </editor-fold>
/**
 *
 * @author magalyb
 */
public class MasterClassificationsLogic {
    
    private MasterClassificationsDAO objDAO = new MasterClassificationsDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A3379Filter> SQP02547(A3379Filter filter) throws SQLException, Exception
    {
        return objDAO.SQP02547(filter);
    }
    
    public String CRUD(A3379Filter filter, String strOption) throws SQLException, Exception{
        return objDAO.CRUD(filter, strOption);
    }
}
