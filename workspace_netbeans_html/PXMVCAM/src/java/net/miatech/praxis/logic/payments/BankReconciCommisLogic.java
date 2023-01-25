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
import net.miatech.praxis.dao.payments.BankReconciCommisDAO;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2345Filter;


public class BankReconciCommisLogic {

    private final BankReconciCommisDAO BankReconciCommisDAO = new BankReconciCommisDAO();

    public void setSession(IServerSession ss) {
        BankReconciCommisDAO.setSession(ss);
    }
    
    public List<A2345Filter> loadPX524SQP003375(A2345Filter filter) throws SQLException, Exception {
        return BankReconciCommisDAO.loadPX524SQP003375(filter);
    }
    
    public List<A2345Filter> loadPX524SQP003395(A2345Filter filter) throws SQLException, Exception {
        return BankReconciCommisDAO.loadPX524SQP003395(filter);
    }
    
    public List<A2345Filter> loadPX524SQP003396(A2345Filter filter) throws SQLException, Exception {
        return BankReconciCommisDAO.loadPX524SQP003396(filter);
    }
    
    public List<A2290Filter> loadPX524SQP003397(A2290Filter filter) throws SQLException, Exception {
        return BankReconciCommisDAO.loadPX524SQP003397(filter);
    }
    
    public List<A2290Filter> loadPX269SQP02492(A2290Filter filter) throws SQLException, Exception {
        return BankReconciCommisDAO.loadPX269SQP02492(filter);
    }

    public List<A2290Filter> loadPX269SQP00744(A2290Filter filter) throws SQLException, Exception {
        return BankReconciCommisDAO.loadPX269SQP00744(filter);
    }
}
