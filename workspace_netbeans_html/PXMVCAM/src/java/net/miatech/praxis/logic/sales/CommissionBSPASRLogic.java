package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX119S01A1775Filter;
import net.miatech.beans.PX119S01A1776Filter;
import net.miatech.beans.SQP00105Filter;
import net.miatech.beans.SQP0083Filter;
import net.miatech.beans.SQP0089Filter;
import net.miatech.beans.SQP0099Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CommissionBSPASRDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class CommissionBSPASRLogic {

    private CommissionBSPASRDAO objDAO = new CommissionBSPASRDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX119S01A1775Filter> loadPX119S01A1775(PX119S01A1775Filter filter) throws SQLException, Exception {
        return objDAO.loadPX119S01A1775(filter);
    }

    public List<PX119S01A1776Filter> loadPX119S01A1776(PX119S01A1776Filter filter) throws SQLException, Exception {
        return objDAO.loadPX119S01A1776(filter);
    }

    public List<SQP0089Filter> getSQP0089Filter(SQP0089Filter filter) throws SQLException, Exception {
        return objDAO.getSQP0089Filter(filter);
    }

    public SQP0099Filter getSQP0099Filter(SQP0099Filter filter) throws SQLException, Exception {
        return objDAO.getSQP0099Filter(filter);
    }

    public SQP0083Filter setSQP0083Filter(SQP0083Filter filter) throws SQLException, Exception {
        return objDAO.setSQP0083Filter(filter);
    }

    public SQP00105Filter setSQP00105Filter(SQP00105Filter filter) throws SQLException, Exception {
        return objDAO.setSQP00105Filter(filter);
    }
}
