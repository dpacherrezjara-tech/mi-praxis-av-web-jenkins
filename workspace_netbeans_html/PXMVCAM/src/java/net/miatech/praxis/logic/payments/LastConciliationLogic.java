/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.LastConciliationDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A3800Filter;

/**
 *
 * @author
 */
public class LastConciliationLogic {

    private final LastConciliationDAO LastConciliationDAO = new LastConciliationDAO();

    public void setSession(IServerSession ss) {
        LastConciliationDAO.setSession(ss);

    }

    public List<A3800Filter> loadPX565SQP04093(A3800Filter filter) throws SQLException, Exception {
        return LastConciliationDAO.loadPX565SQP04093(filter);
    }

    public List<A2290Filter> loadPX565SQP04094(A2290Filter filter) throws SQLException, Exception {
        return LastConciliationDAO.loadPX565SQP04094(filter);
    }

    public List<A2290Filter> loadPX565SQP04095(A2290Filter filter) throws SQLException, Exception {
        return LastConciliationDAO.loadPX565SQP04095(filter);
    }

    public List<A3800Filter> loadPX565SQP04125(A3800Filter filter) throws SQLException, Exception {
        return LastConciliationDAO.loadPX565SQP04125(filter);
    }

    public A3800Filter loadPX559SQP04126(A3800Filter filter) throws SQLException, Exception {
        return LastConciliationDAO.loadPX559SQP04126(filter);
    }

    public String loadPX565SQP04127(A3800Filter filter) throws SQLException, Exception {
        return LastConciliationDAO.loadPX565SQP04127(filter);
    }

    public String loadPX565SQP04157(A3800Filter filter) throws SQLException, Exception {
        return LastConciliationDAO.loadPX565SQP04157(filter);
    }
}
