package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.SalesAdjustmentDAO;
import net.miatech.praxis.payment.filter.A4116Filter;

public class SalesAdjustmentLogic {

    private final SalesAdjustmentDAO SalesAdjustmentDAO = new SalesAdjustmentDAO();

    public void setSession(IServerSession ss) {
        SalesAdjustmentDAO.setSession(ss);

    }

    public List<A4116Filter> loadPX599SQP04472(A4116Filter filter) throws SQLException, Exception {
        return SalesAdjustmentDAO.loadPX599SQP04472(filter);
    }

    public List<A4116Filter> loadPX570SQP04470(A4116Filter filter) throws SQLException, Exception {
        return SalesAdjustmentDAO.loadPX570SQP04470(filter);
    }

    public List<A4116Filter> loadPX570SQP04540(A4116Filter filter) throws SQLException, Exception {
        return SalesAdjustmentDAO.loadPX570SQP04540(filter);
    }

    public A4116Filter loadPX570SQP04359(A4116Filter filter) throws SQLException, Exception {
        return SalesAdjustmentDAO.loadPX570SQP04359(filter);
    }

    public String loadPX599SQP04542(A4116Filter filter) throws SQLException, Exception {
        return SalesAdjustmentDAO.loadPX599SQP04542(filter);
    }

}
