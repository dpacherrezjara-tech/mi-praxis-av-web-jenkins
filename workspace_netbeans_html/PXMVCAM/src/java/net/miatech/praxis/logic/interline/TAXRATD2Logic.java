package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.PX032S01A1202Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.TAXRATD2DAO;
import net.miatech.praxis.interline.A1224Filter;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class TAXRATD2Logic {

    private TAXRATD2DAO objDAO = new TAXRATD2DAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX032S01A1202Filter> loadPX145S01A1202(PX032S01A1202Filter filter) throws SQLException, Exception {
        return objDAO.loadPX145S01A1202(filter);
    }

    public List<A1224Filter> loadPX145S02A1224(PX032S01A1202Filter filter) throws SQLException, Exception {
        return objDAO.loadPX145S02A1224(filter);
    }

    public List<A1692Filter> loadPX145S03A1141(PX032S01A1202Filter filter) throws SQLException, Exception {
        return objDAO.loadPX145S03A1141(filter);
    }
}
