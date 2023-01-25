package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX125S01A1802Filter;
import net.miatech.beans.SQP00112Filter;
import net.miatech.beans.SQP00168Filter;
import net.miatech.beans.SQP00169Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.GranPlanPendingDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class GranPlanPendingLogic {

    private GranPlanPendingDAO objDAO = new GranPlanPendingDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX125S01A1802Filter> loadPX125S01A1802(PX125S01A1802Filter filter) throws SQLException, Exception {
        return objDAO.loadPX125S01A1802(filter);
    }

    public SQP00112Filter setSQP00112(SQP00112Filter filter) throws SQLException, Exception {
        return objDAO.setSQP00112(filter);
    }

    public String get_ObtenerIATA(String VP_OPTION, String VP_PARAM) throws SQLException, Exception {
        return objDAO.get_ObtenerIATA(VP_OPTION, VP_PARAM);
    }

    public List<SQP00169Filter> get_SQP00169(SQP00169Filter filter) throws SQLException, Exception {
        return objDAO.get_SQP00169(filter);
    }

    public SQP00168Filter set_SQP00168(SQP00168Filter filter) throws SQLException, Exception {
        return objDAO.set_SQP00168(filter);
    }
}
