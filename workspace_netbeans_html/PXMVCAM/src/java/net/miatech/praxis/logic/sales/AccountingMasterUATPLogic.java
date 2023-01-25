/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1820Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingMasterUATPDAO;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterUATPLogic {

    private final AccountingMasterUATPDAO accountingMasterUATPDAO = new AccountingMasterUATPDAO();

    public void setSession(IServerSession ss) {
        accountingMasterUATPDAO.setSession(ss);

    }

    public List<A1820Filter> loadPX161S01A1820(A1820Filter filter) throws SQLException, Exception {
        return accountingMasterUATPDAO.loadPX161S01A1820(filter);
    }

    public String salesAccountMaintanceClient(A1820Filter filter, String strOption) throws SQLException, Exception {
        return accountingMasterUATPDAO.salesAccountMaintanceClient(filter, strOption);
    }

}
