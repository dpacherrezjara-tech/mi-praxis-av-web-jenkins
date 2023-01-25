/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.AccountingPlanDAO;
import net.miatech.praxis.payment.filter.A2356Filter;

/**
 *
 * @author lmendoza
 */
public class AccountingPlanLogic {

    private final AccountingPlanDAO banksCatalogDAO = new AccountingPlanDAO();

    public void setSession(IServerSession ss) {
        banksCatalogDAO.setSession(ss);

    }
    
    public List<A2356Filter> loadSQP02848(A2356Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadSQP02848(filter);
    }
    
    public A2356Filter loadSQP02856(A2356Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadSQP02856(filter);
    }
    
    public String loadSQP02857(A2356Filter filter, String option) throws SQLException, Exception {
        return banksCatalogDAO.loadSQP02857(filter, option);
    }

}
