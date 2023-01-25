package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX116S01A1738Filter;
import net.miatech.beans.PX116S02A1710Filter;
import net.miatech.beans.PX116S03A1738Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.InplantCommissionsDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class InplantCommissionsLogic {

    private InplantCommissionsDAO objDAO = new InplantCommissionsDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX116S01A1738Filter> loadPX116S01A1738(PX116S01A1738Filter filter) throws SQLException, Exception {
        return objDAO.loadPX116S01A1738(filter);
    }
    public PX116S03A1738Filter loadPX116S03A1738(PX116S03A1738Filter filter) throws SQLException, Exception {
        return objDAO.loadPX116S03A1738(filter);
    }
    public PX116S02A1710Filter loadPX116S02A1710() throws SQLException, Exception {
        return objDAO.loadPX116S02A1710();
    }
}
