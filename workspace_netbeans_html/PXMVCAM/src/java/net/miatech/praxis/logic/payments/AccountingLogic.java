/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.AccountingDAO;
import net.miatech.praxis.payment.filter.SQP05233Filter;
import net.miatech.praxis.payment.filter.SQP05252Filter;
import net.miatech.praxis.payment.filter.SQP05253Filter;
import net.miatech.praxis.payment.filter.SQP05352Filter;
import net.miatech.praxis.payment.filter.SQP05343Filter;

/**
 *
 * @author vhidalgo
 */
public class AccountingLogic {

    private final AccountingDAO accountingDAO = new AccountingDAO();

    public void setSession(IServerSession ss) {
        accountingDAO.setSession(ss);
    }

    public SQP05233Filter setSQP05233Filter(SQP05233Filter filter) throws SQLException, Exception {
        return accountingDAO.setSQP05233Filter(filter);
    }

    public List<SQP05253Filter> getSQP05253Filter(SQP05253Filter filter) throws SQLException, Exception {
        return accountingDAO.getSQP05253Filter(filter);
    }
    
    public List<SQP05352Filter> getSQP05352Filter(SQP05352Filter filter) throws SQLException, Exception {
        return accountingDAO.getSQP05352Filter(filter);
    }
    
    public SQP05343Filter setSQP05343Filter(SQP05343Filter filter) throws SQLException, Exception {
        return accountingDAO.setSQP05343Filter(filter);
    }

    public List<SQP05252Filter> getSQP05252Filter(SQP05252Filter filter) throws SQLException, Exception {
        return accountingDAO.getSQP05252Filter(filter);
    }

}
