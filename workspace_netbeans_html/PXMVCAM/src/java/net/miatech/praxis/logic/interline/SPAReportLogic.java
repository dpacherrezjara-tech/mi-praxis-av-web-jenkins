package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.SPAReportDAO;
import net.miatech.praxis.interline.A1402;
import net.miatech.praxis.interline.WRF014;
import net.miatech.praxis.interline.filter.A1155Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class SPAReportLogic {

    private SPAReportDAO objDAO = new SPAReportDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1155Filter> loadPX154S01A1155(A1155Filter filter) throws SQLException, Exception {
        return objDAO.loadPX154S01A1155(filter);
    }

    public List<A1155Filter> loadPX154S01A1155_2(A1155Filter filter) throws SQLException, Exception {
        return objDAO.loadPX154S01A1155_2(filter);
    }

    public List<A1402> loadPX154S02A1402(A1155Filter filter) throws SQLException, Exception {
        return objDAO.loadPX154S02A1402(filter);
    }

    public List<WRF014> loadPX154S03WRF014(A1155Filter filter) throws SQLException, Exception {
        return objDAO.loadPX154S03WRF014(filter);
    }

    public List<A1155Filter> loadFileNames(A1155Filter filter) throws Exception {
        return objDAO.loadFileNames(filter);
    }

    public String InsertAddendum(WRF014 filter) throws Exception {
        return objDAO.loadPX154SQP00822(filter);
    }
}
