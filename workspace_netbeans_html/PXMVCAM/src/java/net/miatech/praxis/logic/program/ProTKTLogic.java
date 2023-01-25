package net.miatech.praxis.logic.program;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.S0007A730Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.program.ProTKTDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ProTKTLogic {

    private ProTKTDAO objDAO = new ProTKTDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public   List<S0007A720Filter> loadS0007A720(S0007A720Filter filter) throws SQLException, Exception {
        return objDAO.loadS0007A720(filter);
    }
    
    public   List<S0007A720Filter> loadS0007A720Grilla(S0007A720Filter filter) throws SQLException, Exception {
        return objDAO.loadS0007A720Grilla(filter);
    }
    
    public   List<S0007A730Filter> loadS0007A730(S0007A720Filter filter) throws SQLException, Exception {
        return objDAO.loadS0007A730(filter);
    }
    
    public   List<S0007A720Filter> loadS0007A720Tot(S0007A720Filter filter) throws SQLException, Exception {
        return objDAO.loadS0007A720Tot(filter);
    }
}
