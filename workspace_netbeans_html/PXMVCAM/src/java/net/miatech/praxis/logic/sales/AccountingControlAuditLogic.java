/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP04091Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingControlAuditDAO;

/**
 *
 * @author vhidalgo
 */
public class AccountingControlAuditLogic {
    private AccountingControlAuditDAO objDAO = new AccountingControlAuditDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<SQP04091Filter> getSQP04091Filter(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04091Filter(filter);
    }
    
}
