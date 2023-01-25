/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A2597Filter;
import net.miatech.beans.A2865Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.AccountingControlDAO;
import net.miatech.praxis.dao.flown.LogCouponsUpdateDAO;

/**
 *
 * @author lmendoza
 */
public class AccountingControlLogic {

    private final AccountingControlDAO accountingControlDAO = new AccountingControlDAO();

    public void setSession(IServerSession ss) {
        accountingControlDAO.setSession(ss);

    }
    
     public List<A2597Filter> searchAccount(A2597Filter filter) throws SQLException, Exception {
        return accountingControlDAO.search(filter);
    }

    
}
