package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.PMIDAO;
import net.miatech.praxis.interline.A1849;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class PMILogic {

    private PMIDAO objDAO = new PMIDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1849> loadPX184S01A1849(A1849 filter) throws SQLException, Exception {
        return objDAO.loadPX184S01A1849(filter);
    }

    public String loadPX184S02A1849(A1849 filter, String option) throws SQLException, Exception {
        return objDAO.loadPX184S02A1849(filter, option);
    }
}
