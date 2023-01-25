package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX124S01A1789Filter;
import net.miatech.beans.SQP00169Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.GranPlanReportedDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GranPlanReportedLogic {

    private GranPlanReportedDAO objDAO = new GranPlanReportedDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX124S01A1789Filter> loadPX124S01A1789(PX124S01A1789Filter filter) throws SQLException, Exception {
        return objDAO.loadPX124S01A1789(filter);
    }

    public String get_ObtenerIATA(String VP_OPTION, String VP_PARAM) throws SQLException, Exception {
        return objDAO.get_ObtenerIATA(VP_OPTION, VP_PARAM);
    }

    public List<SQP00169Filter> get_SQP00169(SQP00169Filter filter) throws SQLException, Exception {
        return objDAO.get_SQP00169(filter);
    }
}
