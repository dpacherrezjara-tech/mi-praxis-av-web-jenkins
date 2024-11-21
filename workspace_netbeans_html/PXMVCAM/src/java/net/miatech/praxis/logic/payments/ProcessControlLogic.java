package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ProcessControlDAO;
import net.miatech.praxis.payment.filter.A2353Filter;

public class ProcessControlLogic {

    private final ProcessControlDAO ProcessControlDAO = new ProcessControlDAO();

    public void setSession(IServerSession ss) {
        ProcessControlDAO.setSession(ss);
    }

    public List<A2353Filter> loadPX285SQP05105(A2353Filter filter) throws SQLException, Exception {
        return ProcessControlDAO.loadPX285SQP05105(filter);
    }
    
}
