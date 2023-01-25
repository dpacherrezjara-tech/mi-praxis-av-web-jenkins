/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1819Filter;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingMasterCCAMDAO;
import net.miatech.praxis.dao.sales.MinimunRuleDAO;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterCCAMLogic {

    private final AccountingMasterCCAMDAO accountingMasterCCAMDAO = new AccountingMasterCCAMDAO();

    public void setSession(IServerSession ss) {
        accountingMasterCCAMDAO.setSession(ss);

    }

    public List<A1819Filter> loadPX160S01A1819(A1819Filter filter) throws SQLException, Exception {
        return accountingMasterCCAMDAO.loadPX160S01A1819(filter);
    }

    public String accountADMMaintance(A1819Filter filter, String strOption) throws SQLException, Exception {
        return accountingMasterCCAMDAO.accountADMMaintance(filter, strOption);
    }

}
