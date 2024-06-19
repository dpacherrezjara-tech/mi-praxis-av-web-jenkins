/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ExchangeRateDAO;
import net.miatech.praxis.payment.filter.A2295Filter;
import net.miatech.praxis.payment.filter.A2353Filter;

/**
 *
 * @author 
 */
public class ExchangeRateLogic {

    private final ExchangeRateDAO ExchangeRateDAO = new ExchangeRateDAO();

    public void setSession(IServerSession ss) {
        ExchangeRateDAO.setSession(ss);
    }
    
    public List<A2295Filter> loadPX290MPS075(A2295Filter filter) throws SQLException, Exception {
        return ExchangeRateDAO.loadPX290MPS075(filter);
    }
    
    public A2353Filter loadPX638MPS075(A2353Filter filter) throws Exception {
        return ExchangeRateDAO.loadPX638MPS075(filter);
    }
 public String loadPX638MPS076(A2353Filter filter, String option) throws SQLException, Exception {
        return ExchangeRateDAO.loadPX638MPS076(filter, option);
    }
    
}
