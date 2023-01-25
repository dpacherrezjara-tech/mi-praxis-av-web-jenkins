package net.miatech.praxis.logic.program;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.dao.program.QueryFlightDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class QueryFlightLogic {

    private QueryFlightDAO objDAO = new QueryFlightDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1248> loadFieldsConditions() throws Exception {
        return objDAO.loadFieldsConditions();
    }
    
    public List<A1248> loadFields(String tabla) throws Exception {
        return objDAO.loadFields(tabla);
    }

    public List<A1691Filter> loadPX072S04A1691(A1691Filter filter, HashMap hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX072S04A1691(filter, hmAeropuertos);
    }

    public List<A1691Filter> loadPX072SQP00313(A1691Filter filter) throws SQLException, Exception {
        return objDAO.loadPX072SQP00313(filter);
    }

    public List<A1691Filter> loadPX072S11A1691(A1691Filter filter) throws SQLException, Exception {
        return objDAO.loadPX072S11A1691(filter);
    }

    public List<A1692Filter> loadSQP00212(A1691Filter filter, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return objDAO.loadSQP00212(filter, hmPaises);
    }

    public List<A1692Filter> loadPX072SQP00317(A1691Filter filter, HashMap<String, String> hmPaises, String flag) throws SQLException, Exception {
        return objDAO.loadPX072SQP00317(filter, hmPaises, flag);
    }
    
    public List<A1691Filter> loadPX072SQP00692(A1691Filter filter) throws SQLException, Exception {
        return objDAO.loadPX072SQP00692(filter);
    }

    public List<A1692Filter> loadPX072SQP00693(A1691Filter filter, HashMap<String, String> hmPaises, String flag) throws SQLException, Exception {
        return objDAO.loadPX072SQP00693(filter, hmPaises, flag);
    }

    public List<A1691Filter> loadPX072S08A1691(A1691Filter filter) throws SQLException, Exception {
        return objDAO.loadPX072S08A1691(filter);
    }

    public List<A1692Filter> loadPX072S02A1692(A1691Filter filter, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return objDAO.loadPX072S02A1692(filter, hmPaises);
    }
}
