package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ZonesMpDAO;
import net.miatech.praxis.payment.filter.A4170Filter;

public class ZonesMpLogic {

    private final ZonesMpDAO ZonesMpDAO = new ZonesMpDAO();

    public void setSession(IServerSession ss) {
        ZonesMpDAO.setSession(ss);
    }

    public List<A4170Filter> loadPX600SQP04543(A4170Filter filter) throws SQLException, Exception {
        return ZonesMpDAO.loadPX600SQP04543(filter);
    }
        
    public A4170Filter loadPX600SQP04544(A4170Filter filter) throws SQLException, Exception {
        return ZonesMpDAO.loadPX600SQP04544(filter);
    }
    
    public String loadPX600SQP04545(A4170Filter filter, String option) throws SQLException, Exception {
        return ZonesMpDAO.loadPX600SQP04545(filter, option);
    }
}
