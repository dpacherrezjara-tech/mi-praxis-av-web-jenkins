/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1830Filter;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingMasterBINESDAO;
import net.miatech.praxis.dao.sales.MinimunRuleDAO;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterBINESLogic {

    private final AccountingMasterBINESDAO accountingMasterBINESDAO = new AccountingMasterBINESDAO();

    public void setSession(IServerSession ss) {
        accountingMasterBINESDAO.setSession(ss);

    }

    public List<A1830Filter> loadBank() throws SQLException, Exception {
        return accountingMasterBINESDAO.loadBank();
    }
     public List<A1830Filter> loadBank2() throws SQLException, Exception {
        return accountingMasterBINESDAO.loadBank2();
    }

    public List<A1830Filter> loadPX163S01A1830(A1830Filter filter) throws SQLException, Exception {
        return accountingMasterBINESDAO.loadPX163S01A1830(filter);
    }

    public String salesAccountMaintanceBINES(A1830Filter filter, String strOption) throws SQLException, Exception {
        return accountingMasterBINESDAO.salesAccountMaintanceBINES(filter, strOption);
    }

}
