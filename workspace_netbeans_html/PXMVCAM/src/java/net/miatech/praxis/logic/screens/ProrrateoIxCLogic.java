package net.miatech.praxis.logic.screens;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A729;
import net.miatech.praxis.dao.screens.ProrrateoIxCDAO;
/**
 *
 * @author gsanchez
 */
public class ProrrateoIxCLogic {

    private final ProrrateoIxCDAO prorrateoDAO = new ProrrateoIxCDAO();

    public void setSession(IServerSession ss) {
        prorrateoDAO.setSession(ss);
    }

    public HashMap loadPX164SQP0074(A020Filter filter) throws SQLException, Exception {
        return prorrateoDAO.loadPX164SQP0074(filter);
    }

    public List<A729> loadPX164SQP0076(A020Filter filter) throws SQLException, Exception {
        return prorrateoDAO.loadPX164SQP0076(filter);
    }

    public String CAMBIAR_USO(String uso, String tkt) throws SQLException, Exception {
        return prorrateoDAO.CAMBIAR_USO(uso, tkt);
    }
}
