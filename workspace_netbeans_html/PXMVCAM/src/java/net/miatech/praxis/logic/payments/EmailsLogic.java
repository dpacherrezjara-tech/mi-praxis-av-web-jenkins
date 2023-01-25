package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.EmailsDAO;
import net.miatech.praxis.payment.filter.A4171Filter;
import net.miatech.praxis.payment.filter.A4172Filter;

public class EmailsLogic {

    private final EmailsDAO EmailsDAO = new EmailsDAO();

    public void setSession(IServerSession ss) {
        EmailsDAO.setSession(ss);
    }

    public List<A4172Filter> loadPX601SQP04566(A4172Filter filter) throws SQLException, Exception {
        return EmailsDAO.loadPX601SQP04566(filter);
    }
        
    public A4172Filter loadPX601SQP04567(A4172Filter filter) throws SQLException, Exception {
        return EmailsDAO.loadPX601SQP04567(filter);
    }
    
    public String loadPX601SQP04568(A4172Filter filter, String option) throws SQLException, Exception {
        return EmailsDAO.loadPX601SQP04568(filter, option);
    }
            
    public List<A4171Filter> loadPX601SQP04547(String CODIGO) throws SQLException, Exception {
        return EmailsDAO.loadPX601SQP04547(CODIGO);
    }
}
