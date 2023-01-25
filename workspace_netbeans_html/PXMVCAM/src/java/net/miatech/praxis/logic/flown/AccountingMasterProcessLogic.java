/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.AccountingMasterProcessDAO;
import net.miatech.praxisbi.A1955Filter;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterProcessLogic {

    private final AccountingMasterProcessDAO accountingMasterProcessDAO = new AccountingMasterProcessDAO();

    public void setSession(IServerSession ss) {
        accountingMasterProcessDAO.setSession(ss);

    }

    public List<A1955Filter> search(A1955Filter filter) throws SQLException, Exception {
        return accountingMasterProcessDAO.search(filter);
    }
    
    public String consistenciaFlown(A1955Filter filter) throws SQLException, Exception {
        return accountingMasterProcessDAO.consistenciaFlown(filter);
    } 
    
     public String accountMaintance(A1955Filter filter, String strOption) throws SQLException, Exception {
        return accountingMasterProcessDAO.accountMaintance(filter, strOption);
    }
     
    public String reversaFlown(A1955Filter filter) throws SQLException, Exception {
        return accountingMasterProcessDAO.reversaFlown(filter);
    }
    
    public String accountMaintancePendingFlown(A1955Filter filter, String strOption) throws SQLException, Exception {
        return accountingMasterProcessDAO.accountMaintancePendingFlown(filter, strOption);
    }
    
    public A1955Filter searchReversa(A1955Filter filter) throws SQLException, Exception {
        return accountingMasterProcessDAO.searchReversa(filter);
    }
}
