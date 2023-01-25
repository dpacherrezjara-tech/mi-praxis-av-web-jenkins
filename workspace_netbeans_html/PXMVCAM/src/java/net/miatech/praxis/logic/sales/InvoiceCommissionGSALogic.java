package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX144S01A1775Filter;
import net.miatech.beans.PX144S01A1826Filter;
import net.miatech.beans.PX144S02A1826Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.InvoiceCommissionGSADAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class InvoiceCommissionGSALogic {

    private InvoiceCommissionGSADAO objDAO = new InvoiceCommissionGSADAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX144S01A1826Filter> loadPX144S01A1826(PX144S01A1826Filter filter) throws SQLException, Exception {
        return objDAO.loadPX144S01A1826(filter);
    }

    public PX144S02A1826Filter setPX144S02A1826(PX144S02A1826Filter filter) throws SQLException, Exception {
        return objDAO.setPX144S02A1826(filter);
    }

    public List<PX144S01A1775Filter> loadPX144S01A1775(PX144S01A1775Filter filter) throws SQLException, Exception {
        return objDAO.loadPX144S01A1775(filter);
    }

    public String get_PX112S03A1757(String VP_OPTION, String VP_PARAM) throws SQLException, Exception {
        return objDAO.get_PX112S03A1757(VP_OPTION, VP_PARAM);
    }
}
