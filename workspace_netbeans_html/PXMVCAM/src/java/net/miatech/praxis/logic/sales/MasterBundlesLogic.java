package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.SQP00824Filter;
import net.miatech.beans.SQP00826Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A2534;
import net.miatech.praxis.dao.sales.MasterBundlesDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class MasterBundlesLogic {
    
    private MasterBundlesDAO objDAO = new MasterBundlesDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP00824Filter> loadSQP00824(SQP00824Filter filter) throws SQLException {
        return objDAO.loadSQP00824(filter);
    }
    
    public List<SQP00826Filter> loadAncillaries(SQP00826Filter filter) throws SQLException {
        return objDAO.loadAncillaries(filter);
    }

    public SQP00826Filter setSQP00826(SQP00826Filter listaAncillaries, A2534 filter, String strOption, int i) throws SQLException {
        return objDAO.setSQP00826(listaAncillaries, filter, strOption, i);
    }
}
