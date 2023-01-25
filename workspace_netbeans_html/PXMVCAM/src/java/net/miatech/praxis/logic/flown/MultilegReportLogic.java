package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1786Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.MultilegReportDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class MultilegReportLogic {

    private MultilegReportDAO objDAO = new MultilegReportDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1786Filter> loadPX087S02A1786(A1786Filter filter) throws SQLException, Exception {
        return objDAO.loadPX087S02A1786(filter);
    }

    public List<A1786Filter> loadPX087S01A1786(A1786Filter filter) throws SQLException, Exception {
        return objDAO.loadPX087S01A1786(filter);
    }

    public List<A1692Filter> loadPX087S08A1692(A1691Filter filter, String strTipo, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return objDAO.loadPX087S08A1692(filter, strTipo, hmPaises);
    }

    public List<A1692Filter> loadPX087S05A1897(A1692Filter filter) throws SQLException, Exception {
        return objDAO.loadPX087S05A1897(filter);
    }

    public String loadPX087SQP04261(A1786Filter filter) throws SQLException, Exception {
        return objDAO.loadPX087SQP04261(filter);
    }
}
