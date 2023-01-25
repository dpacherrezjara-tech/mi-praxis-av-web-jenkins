package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX175S01A1841Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CountryObjectiveDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class CountryObjectiveLogic {

    private CountryObjectiveDAO objDAO = new CountryObjectiveDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX175S01A1841Filter> loadPX175S01A1841(PX175S01A1841Filter filter) throws SQLException, Exception {
        return objDAO.loadPX175S01A1841(filter);
    }
}
