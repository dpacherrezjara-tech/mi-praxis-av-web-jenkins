package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP01432Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.StatisticalsReportBySourceDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class StatisticalsReportBySourceLogic {

    private StatisticalsReportBySourceDAO objDAO = new StatisticalsReportBySourceDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP01432Filter> getSQP01432Filter(SQP01432Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01432Filter(filter);
    }
}
