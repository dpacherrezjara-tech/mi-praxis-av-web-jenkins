/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.SalesCompensationDAO;
import net.miatech.praxis.payment.filter.A4116Filter;

/**
 *
 * @author lmendoza
 */
public class SalesCompensationLogic {

    private final SalesCompensationDAO banksCatalogDAO = new SalesCompensationDAO();

    public void setSession(IServerSession ss) {
        banksCatalogDAO.setSession(ss);

    }

    public List<A4116Filter> loadPX588SQP04425(A4116Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX588SQP04425(filter);
    }
    
    public List<A4116Filter> loadPX588SQP04620(A4116Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX588SQP04620(filter);
    }
    
    public List<A4116Filter> loadPX588SQP04633(A4116Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX588SQP04633(filter);
    }
}
