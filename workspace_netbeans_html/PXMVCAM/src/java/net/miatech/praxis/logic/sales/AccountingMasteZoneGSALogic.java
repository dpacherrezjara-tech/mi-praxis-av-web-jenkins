/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1769Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingMasterZoneGSADAO;

/**
 *
 * @author lmendoza
 */
public class AccountingMasteZoneGSALogic {

    private final AccountingMasterZoneGSADAO accountingMasterZoneGSADAO = new AccountingMasterZoneGSADAO();

    public void setSession(IServerSession ss) {
        accountingMasterZoneGSADAO.setSession(ss);

    }

    public List<A1769Filter> loadPX215S01A1769(A1769Filter filter) throws SQLException, Exception
    {
        return accountingMasterZoneGSADAO.loadPX215S01A1769(filter);
    }
    
    public String accountMaintance(A1769Filter filter, String strOption) throws SQLException, Exception {
        return accountingMasterZoneGSADAO.accountMaintance(filter, strOption);
    }

}
