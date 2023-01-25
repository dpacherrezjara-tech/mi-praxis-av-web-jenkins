package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP00234Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.BPOProductionDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class BPOProductionLogic {

    private BPOProductionDAO objDAO = new BPOProductionDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP00234Filter> loadSQP00234Filter(SQP00234Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP00234Filter(filter);
    }
}
