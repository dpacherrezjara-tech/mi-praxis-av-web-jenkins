package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.MiscellaneousPaymentDAO;
import net.miatech.praxis.payment.A4169;
import net.miatech.praxis.payment.filter.A4169Filter;

public class MiscellaneousPaymentLogic {

    private final MiscellaneousPaymentDAO MiscellaneousPaymentDAO = new MiscellaneousPaymentDAO();

    public void setSession(IServerSession ss) {
        MiscellaneousPaymentDAO.setSession(ss);
    }

    public List<A4169Filter> loadPX598SQP04518(A4169Filter filter) throws SQLException, Exception {
        return MiscellaneousPaymentDAO.loadPX598SQP04518(filter);
    }
    
    public List<A4169Filter> loadPX598SQP04519(A4169Filter filter) throws SQLException, Exception {
        return MiscellaneousPaymentDAO.loadPX598SQP04519(filter);
    }
    
    public A4169 loadPX598SQP04520(A4169Filter filter) throws SQLException, Exception {
        return MiscellaneousPaymentDAO.loadPX598SQP04520(filter);
    }
    
    public String loadPX598SQP04521(A4169 filter, String option) throws SQLException, Exception {
        return MiscellaneousPaymentDAO.loadPX598SQP04521(filter, option);
    }
}
