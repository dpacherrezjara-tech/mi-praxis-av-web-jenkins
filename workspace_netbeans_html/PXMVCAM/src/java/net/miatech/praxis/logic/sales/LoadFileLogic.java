package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1789Filter;
import net.miatech.beans.SQP01170Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.LoadFileDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadFileLogic {

    private LoadFileDAO objDAO = new LoadFileDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP01170Filter> loadSQP01170(SQP01170Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP01170(filter);
    }

    public void setSQP01117(A1789Filter filter) throws SQLException, Exception {
        objDAO.setSQP01117(filter);
    }
}
