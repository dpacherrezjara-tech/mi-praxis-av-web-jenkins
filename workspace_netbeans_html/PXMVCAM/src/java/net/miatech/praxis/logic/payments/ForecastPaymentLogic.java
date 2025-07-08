/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ForecastPaymentDAO;
import net.miatech.praxis.payment.filter.A2295Filter;

/**
 *
 * @author 
 */
public class ForecastPaymentLogic {

    private final ForecastPaymentDAO ForecastPaymentDAO = new ForecastPaymentDAO();

    public void setSession(IServerSession ss) {
        ForecastPaymentDAO.setSession(ss);
    }
    
    public List<A2295Filter> loadPX290MPS074(A2295Filter filter) throws SQLException, Exception {
        return ForecastPaymentDAO.loadPX290MPS074(filter);
    }
    public List<A2295Filter> loadPX290MPS074TC(A2295Filter filter) throws SQLException, Exception {
        return ForecastPaymentDAO.loadPX290MPS074TC(filter);
    }
    public List<A2295Filter> loadPX290MPS074CASH(A2295Filter filter) throws SQLException, Exception {
        return ForecastPaymentDAO.loadPX290MPS074CASH(filter);
    }
    
    public A2295Filter getTotalRecords() throws SQLException, Exception {
        return ForecastPaymentDAO.getTotalRecords();
    }
    

    
}
