/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1834Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingMasterDecisionDAO;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterDecisionLogic {

    private final AccountingMasterDecisionDAO accountingMasterDecisionDAO = new AccountingMasterDecisionDAO();

    public void setSession(IServerSession ss) {
        accountingMasterDecisionDAO.setSession(ss);

    }

    public List<A1834Filter> loadPX171S01A1834(A1834Filter filter) throws SQLException, Exception {
        return accountingMasterDecisionDAO.loadPX171S01A1834(filter);
    }

    public String Maintance(A1834Filter filter, String strOption) throws SQLException, Exception {
        return accountingMasterDecisionDAO.Maintance(filter, strOption);
    }

}
