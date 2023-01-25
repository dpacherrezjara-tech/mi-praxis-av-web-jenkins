/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1833Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingMasterTNUDAO;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterTNULogic {

    private final AccountingMasterTNUDAO accountingMasterTNUDAO = new AccountingMasterTNUDAO();

    public void setSession(IServerSession ss) {
        accountingMasterTNUDAO.setSession(ss);

    }

    public List<A1833Filter> loadPX168S01A1833(A1833Filter filter) throws SQLException, Exception {
        return accountingMasterTNUDAO.loadPX168S01A1833(filter);
    }

    public String salesAccountMaintanceTNU(A1833Filter filter, String strOption) throws SQLException, Exception {
        return accountingMasterTNUDAO.salesAccountMaintanceTNU(filter, strOption);
    }

}
