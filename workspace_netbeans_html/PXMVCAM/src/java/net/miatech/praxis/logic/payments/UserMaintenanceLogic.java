package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A4717Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.UserMaintenanceDAO;

/**
 *
 * @author zperez
 */
public class UserMaintenanceLogic {

    private final UserMaintenanceDAO UserMaintenanceDAO = new UserMaintenanceDAO();

    public void setSession(IServerSession ss) {
        UserMaintenanceDAO.setSession(ss);
    }

    public List<A4717Filter> SearchUserMant(A4717Filter filter) throws SQLException, Exception {
        return UserMaintenanceDAO.SearchUserMant(filter);
    }
    
     public String mantenimientoUser(A4717Filter filter) throws SQLException, Exception {
        return UserMaintenanceDAO.mantenimientoUser(filter);
    }

}
