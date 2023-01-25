package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.InterlineVsSalesDAO;
import net.miatech.praxis.interline.filter.SFI020Filter;

// </editor-fold>
/**
 *
 * @author claudia
 */
public class InterlineVsSalesLogic {

    private InterlineVsSalesDAO objDAO = new InterlineVsSalesDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

//    public List<SFI020Filter> loadPX209SQP00166(SFI020Filter filter) throws SQLException {
//        return objDAO.loadPX209SQP00166(filter);
//    }
    
    public List<SFI020Filter> loadPX209SQP03289(SFI020Filter filter) throws SQLException, Exception {
        return objDAO.loadPX209SQP03289(filter);
    }
    
    public List<SFI020Filter> loadPX209SQP03290(SFI020Filter filter) throws SQLException, Exception {
        return objDAO.loadPX209SQP03290(filter);
    }
    
    public List<SFI020Filter> loadPX209SQP03301(SFI020Filter filter) throws SQLException, Exception {
        return objDAO.loadPX209SQP03301(filter);
    }
    
    
}
