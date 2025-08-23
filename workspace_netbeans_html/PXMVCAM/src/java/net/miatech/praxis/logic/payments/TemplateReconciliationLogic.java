/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import net.miatech.praxis.logic.payments.*;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP04091Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.TemplateReconciliationDAO;
import net.miatech.praxis.payment.filter.A2290Filter;

/**
 *
 * @author vhidalgo
 */
public class TemplateReconciliationLogic {
    private TemplateReconciliationDAO objDAO = new TemplateReconciliationDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<SQP04091Filter> searchAccountingInterfaces(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchAccountingInterfaces(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00698Detalle(A2290Filter filter) throws SQLException, Exception {
        return objDAO.loadPX269SQP00698Detalle(filter);
    }
    
    public List<A2290Filter> searchPendingSettlements(A2290Filter filter) throws SQLException, Exception {
        return objDAO.searchPendingSettlements(filter);
    }
    
    public List<A2290Filter> searchPendingDiscounts(A2290Filter filter) throws SQLException, Exception {
        return objDAO.searchPendingDiscounts(filter);
    }
    
    public List<A2290Filter> searchPendingDeposits(A2290Filter filter) throws SQLException, Exception {
        return objDAO.searchPendingDeposits(filter);
    }
    
    public List<A2290Filter> searchPendingDepositsSales(A2290Filter filter) throws SQLException, Exception {
        return objDAO.searchPendingDepositsSales(filter);
    }
    
    public List<A2290Filter> searchPendingSales(A2290Filter filter) throws SQLException, Exception {
        return objDAO.searchPendingSales(filter);
    }
    
    public List<A2290Filter> searchPendingHeads(A2290Filter filter) throws SQLException, Exception {
        return objDAO.searchPendingHeads(filter);
    }
}
