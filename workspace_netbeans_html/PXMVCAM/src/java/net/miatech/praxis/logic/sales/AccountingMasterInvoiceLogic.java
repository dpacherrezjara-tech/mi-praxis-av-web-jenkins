/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP02299Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingMasterInvoiceDAO;

/**
 *
 * @author vhidalgo
 */
public class AccountingMasterInvoiceLogic {
    private AccountingMasterInvoiceDAO MasterInvoiceDAO = new AccountingMasterInvoiceDAO();
    public void setSession(IServerSession ss) {
        MasterInvoiceDAO.setSession(ss);
    }    
    public List<SQP02299Filter> searchMaster(SQP02299Filter filter) throws SQLException, Exception {
        return MasterInvoiceDAO.searchMaster(filter);
    }
    public List<SQP02299Filter> searchMasterFG(SQP02299Filter filter) throws SQLException, Exception {
        return MasterInvoiceDAO.searchMasterFG(filter);
    }
    public String setMasterInvoice(SQP02299Filter filter) throws SQLException, Exception {
        return MasterInvoiceDAO.setMasterInvoice(filter);
    }
    public String setMasterInvoiceFG(SQP02299Filter filter) throws SQLException, Exception {
        return MasterInvoiceDAO.setMasterInvoiceFG(filter);
    }
    
    

}

