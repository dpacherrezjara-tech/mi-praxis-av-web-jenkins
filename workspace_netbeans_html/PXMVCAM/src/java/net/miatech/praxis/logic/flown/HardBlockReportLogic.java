package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1782Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.HardBlockReportDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class HardBlockReportLogic {

    private HardBlockReportDAO objDAO = new HardBlockReportDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1782Filter> loadPX086S01A1782(A1782Filter filter) throws SQLException, Exception {
        return objDAO.loadPX086S01A1782(filter);
    }

    public List<A1782Filter> loadPX086S02A1782(A1782Filter filter) throws SQLException, Exception {
        return objDAO.loadPX086S02A1782(filter);
    }

    public List<A1782Filter> loadPX086S03A1783(A1782Filter filter) throws SQLException, Exception {
        return objDAO.loadPX086S03A1783(filter);
    }

    public List<A1782Filter> loadPX086S04A1783(A1782Filter filter) throws SQLException, Exception {
        return objDAO.loadPX086S04A1783(filter);
    }
}
