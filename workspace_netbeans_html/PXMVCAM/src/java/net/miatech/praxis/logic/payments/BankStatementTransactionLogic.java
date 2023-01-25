/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.BankStatementTransactionDAO;
import net.miatech.praxis.payment.filter.A2357Filter;

/**
 *
 * @author lmendoza
 */
public class BankStatementTransactionLogic {

    private final BankStatementTransactionDAO bankStatementTransactionDAO = new BankStatementTransactionDAO();

    public void setSession(IServerSession ss) {
        bankStatementTransactionDAO.setSession(ss);

    }

    public List<A2357Filter> loadPX305SQP03124(A2357Filter filter) throws SQLException, Exception {
        return bankStatementTransactionDAO.loadPX305SQP03124(filter);
    }

    public String loadPX305SQP03125(A2357Filter filter, String option) throws SQLException, Exception {
        return bankStatementTransactionDAO.loadPX305SQP03125(filter, option);
    }

    public A2357Filter loadPX305SQP03126(A2357Filter filter) throws Exception {
        return bankStatementTransactionDAO.loadPX305SQP03126(filter);
    }
}
