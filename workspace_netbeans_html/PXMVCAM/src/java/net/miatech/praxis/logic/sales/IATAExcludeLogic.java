package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX166S1A1829Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.IATAExcludeDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class IATAExcludeLogic {

    private IATAExcludeDAO objDAO = new IATAExcludeDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX166S1A1829Filter> loadPX166S1A1829(PX166S1A1829Filter filter) throws SQLException, Exception {
        return objDAO.loadPX166S1A1829(filter);
    }
}
