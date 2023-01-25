/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.IntalmentSalesDAO;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2345Filter;

public class IntalmentSalesLogic {

    private final IntalmentSalesDAO IntalmentSalesDAO = new IntalmentSalesDAO();

    public void setSession(IServerSession ss) {
        IntalmentSalesDAO.setSession(ss);
    }

    public List<A2290Filter> loadPX290SQP03217(A2290Filter filter) throws SQLException, Exception {
        return IntalmentSalesDAO.loadPX290SQP03217(filter);
    }

    public List<A2290Filter> loadPX290SQP03237(A2290Filter filter) throws SQLException, Exception {
        return IntalmentSalesDAO.loadPX290SQP03237(filter);
    }

    public List<A2290Filter> loadPX290SQP03205(A2290Filter filter) throws SQLException, Exception {
        return IntalmentSalesDAO.loadPX290SQP03205(filter);
    }

    public List<A2290Filter> loadPX290SQP03206(A2290Filter filter) throws SQLException, Exception {
        return IntalmentSalesDAO.loadPX290SQP03206(filter);
    }

    public A2290Filter loadSQP03214(A2290Filter filter) throws SQLException, Exception {
        return IntalmentSalesDAO.loadSQP03214(filter);
    }

    public String loadSQP03215(A2290Filter filter, String option) throws SQLException, Exception {
        return IntalmentSalesDAO.loadSQP03215(filter, option);
    }

    public List<A2290Filter> loadPX290SQP03221(A2290Filter filter) throws SQLException, Exception {
        return IntalmentSalesDAO.loadPX290SQP03221(filter);
    }

}
