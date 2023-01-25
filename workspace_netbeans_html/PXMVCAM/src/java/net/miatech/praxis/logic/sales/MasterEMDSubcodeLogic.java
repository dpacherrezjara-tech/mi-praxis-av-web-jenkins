package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX113S01A1772Filter;
import net.miatech.beans.PX113S02A1772Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.MasterEMDSubcodeDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class MasterEMDSubcodeLogic {
    
    private MasterEMDSubcodeDAO objDAO = new MasterEMDSubcodeDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<PX113S01A1772Filter> loadPX113S01A1772(PX113S01A1772Filter filter) throws SQLException {
        return objDAO.loadPX113S01A1772(filter);
    }
    
    public PX113S02A1772Filter setPX113S02A1772(PX113S02A1772Filter filter) throws SQLException {
        return objDAO.setPX113S02A1772(filter);
    }
}
