/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A2559Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.AccountedAmountsInvoicedDAO;

/**
 *
 * @author lmendoza
 */
public class AccountedAmountsInvoicedLogic {

    private final AccountedAmountsInvoicedDAO accountedAmountsInvoicedDAO = new AccountedAmountsInvoicedDAO();

    public void setSession(IServerSession ss) {
        accountedAmountsInvoicedDAO.setSession(ss);

    }

    public List<A2559Filter> searchAccount(A2559Filter filter) throws SQLException, Exception {
        return accountedAmountsInvoicedDAO.search(filter);
    }

}
