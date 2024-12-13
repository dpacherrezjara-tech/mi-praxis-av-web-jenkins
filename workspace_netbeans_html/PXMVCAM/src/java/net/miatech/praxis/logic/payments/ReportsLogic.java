/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ReportsDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2356Filter;

/**
 *
 * @author lmendoza
 */
public class ReportsLogic {

    private final ReportsDAO banksCatalogDAO = new ReportsDAO();

    public void setSession(IServerSession ss) {
        banksCatalogDAO.setSession(ss);

    }
    
    public List<A2356Filter> loadSQP05120(A2356Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadSQP05120(filter);
    }
    
    public List<A2356Filter> loadSQP05120_DETAIL(A2356Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadSQP05120_DETAIL(filter);
    }
    
    public List<A2356Filter> loadSQP05120_SM(A2356Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadSQP05120_SM(filter);
    }
    
    public A2356Filter loadSQP02856(A2356Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadSQP02856(filter);
    }
    
    public String loadSQP02857(A2356Filter filter, String option) throws SQLException, Exception {
        return banksCatalogDAO.loadSQP02857(filter, option);
    }
    public List<A2290Filter> loadPX269SQP05103_DEBITYPE(A2290Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX269SQP05103_DEBITYPE(filter);
    }
}
