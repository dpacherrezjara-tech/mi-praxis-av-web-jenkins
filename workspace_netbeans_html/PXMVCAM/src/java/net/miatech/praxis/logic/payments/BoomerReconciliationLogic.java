/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.BoomerReconciliationDAO;
import net.miatech.praxis.payment.filter.A2290Filter;

/**
 *
 * @author lmendoza
 */
public class BoomerReconciliationLogic {

    private final BoomerReconciliationDAO BoomerReconciliationDAO = new BoomerReconciliationDAO();

    public void setSession(IServerSession ss) {
        BoomerReconciliationDAO.setSession(ss);

    }

    public List<A2290Filter> loadPX287SQP00839(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX287SQP00839(filter);
    }

    public List<A2290Filter> loadPX287SQP00840(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX287SQP00840(filter);
    }

    public List<A2290Filter> loadPX287SQP00841(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX287SQP00841(filter);
    }

    public List<A2290Filter> loadPX287SQP00924(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX287SQP00924(filter);
    }

    public List<A2290Filter> loadPX287SQP00925(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX287SQP00925(filter);
    }

    public List<A2290Filter> loadPX287SQP00926(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX287SQP00926(filter);
    }

    public List<A2290Filter> loadPX287SQP02055(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX287SQP02055(filter);
    }

    public A2290Filter loadPX407SQP02076(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX407SQP02076(filter);
    }

    public List<A2290Filter> loadPX407SQP01938(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX407SQP01938(filter);
    }

    public List<A2290Filter> loadPX407SQP01939(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX407SQP01939(filter);
    }

    public List<A2290Filter> loadPX407SQP01940(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX407SQP01940(filter);
    }

    public List<A2290Filter> loadPX407SQP01941(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX407SQP01941(filter);
    }

    public List<A2290Filter> loadPX407SQP01942(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX407SQP01942(filter);
    }

    public List<A2290Filter> loadPX407SQP01943(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX407SQP01943(filter);
    }

    public List<A2290Filter> loadPX407SQP02030(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX407SQP02030(filter);
    }

    public String loadPX407SQP02077(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX407SQP02077(filter);
    }

    public List<A2290Filter> loadPX407SQP03990(A2290Filter filter) throws SQLException, Exception {
        return BoomerReconciliationDAO.loadPX407SQP03990(filter);
    }

}
