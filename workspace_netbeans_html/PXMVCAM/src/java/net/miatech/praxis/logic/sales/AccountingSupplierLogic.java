/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1806Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingSupplierDAO;

/**
 *
 * @author lmendoza
 */
public class AccountingSupplierLogic {

    private final AccountingSupplierDAO ccountingSupplierDAO = new AccountingSupplierDAO();

    public void setSession(IServerSession ss) {
        ccountingSupplierDAO.setSession(ss);

    }

     public List<A1806Filter> loadPX155S01A1806(A1806Filter filter) throws SQLException, Exception
    {
        return ccountingSupplierDAO.loadPX155S01A1806(filter);
    }
     
     public String accountSupplierMaintance(A1806Filter filter, String strOption) throws SQLException, Exception {
        return ccountingSupplierDAO.accountSupplierMaintance(filter, strOption);
    }
}
