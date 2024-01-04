/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.BankReconciliationDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2309AFilter;

/**
 *
 * @author jtorres
 */
public class BankReconciliationLogic {

    private final BankReconciliationDAO bankReconciliationDAO = new BankReconciliationDAO();

    public void setSession(IServerSession ss) {
        bankReconciliationDAO.setSession(ss);
    }

    public List<A2290Filter> loadPX269SQP00698Main(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Main(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00698Country(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Country(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00698Day(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Day(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00698Detalle(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Detalle(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00698(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698(filter);
    }

    public List<A2290Filter> loadPX269SQP00699(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00699(filter);
    }

    public List<A2290Filter> loadPX269SQP00700(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00700(filter);
    }

    public List<A2290Filter> loadPX269SQP00717(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00717(filter);
    }

    public List<A2290Filter> loadPX269SQP00744(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00744(filter);
    }

    public List<A2290Filter> loadPX269SQP02492(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP02492(filter);
    }

    public A2290Filter loadPX269SQP00833(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833(filter);
    }

    public A2290Filter loadPX269SQPXXX(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQPXXX(filter);
    }

    public String loadPX269SQP00834(A2290Filter filter, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00834(filter, user);
    }

    public List<A2290Filter> loadPX269SQP00869(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00869(filter);
    }

    public List<A2290Filter> loadPX269SQP00869_TV(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00869_TV(filter);
    }

    public List<A2290Filter> loadPX269SQP00869_TV_ERRORS(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00869_TV_ERRORS(filter);
    }

    public List<A2290Filter> loadPX269SQP03983(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP03983(filter);
    }

    public List<A2290Filter> loadPX269SQP03984(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP03984(filter);
    }

    public List<A2290Filter> loadPX269SQP00870(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00870(filter);
    }

    public List<A2290Filter> loadPX269SQP00871(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00871(filter);
    }

    public HashMap loadPX269SQP02478(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP02478(filter);
    }

    public String loadPX269SQP01950(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP01950(filter);
    }

    public List<A2290Filter> loadPX269SQP02193(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP02193(filter);
    }

    public String loadPX263SQP02194(A2290Filter filter, UserView user, String accion) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX263SQP02194(filter, user, accion);
    }

    public List<A2290Filter> loadPX269SQP02368(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP02368(filter);
    }

    public List<A2290Filter> loadPX269SQP02369(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP02369(filter);
    }

    public String loadPX269SQP02488(A2290Filter filter, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP02488(filter, user);
    }

    public List<A2290Filter> loadPX269SQP03808(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP03808(filter);
    }

    public List<A2290Filter> loadPX269SQP03808_S_R(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP03808_S_R(filter);
    }

    public HashMap<String, List<A2309AFilter>> loadPX269SQP03940(A2309AFilter filter) throws SQLException, Exception {

        return bankReconciliationDAO.loadPX269SQP03940(filter);
    }

    public List<A2309AFilter> loadPX269SQP03940_TV(A2309AFilter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP03940_TV(filter);
    }

    public List<A2290Filter> loadPX269SQP03988(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP03988(filter);
    }

    public HashMap<String, List<A2290Filter>> loadPX263SQP03989(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX263SQP03989(filter);
    }

    public List<A2290Filter> loadPX269SQP00833_MDP_DETAIL(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_MDP_DETAIL(filter);
    }

    public List<A2290Filter> loadPX269SQP00833_MDP_SCAN(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_MDP_SCAN(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00833_MDP_SCAN_PENDING(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_MDP_SCAN_PENDING(filter);
    }
}
