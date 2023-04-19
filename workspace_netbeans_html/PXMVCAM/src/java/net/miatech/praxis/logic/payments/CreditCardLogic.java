/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.CreditCardDAO;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.filter.A2280Filter;

/**
 *
 * @author lmendoza
 */
public class CreditCardLogic {

    private final CreditCardDAO CreditCardDAO = new CreditCardDAO();

    public void setSession(IServerSession ss) {
        CreditCardDAO.setSession(ss);

    }

    public List<A2280Filter> loadPX265SQP00660(A2280Filter filter) throws SQLException, Exception {
        return CreditCardDAO.loadPX265SQP00660(filter);
    }

    public String loadPX267SQP00672(A2281 filter, String option) throws SQLException, Exception {
        return CreditCardDAO.loadPX267SQP00672(filter, option);
    }

    public A2281 loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {
        return CreditCardDAO.loadPX267SQP00673(filter);
    }

    public String loadPX265SQP00661(A2280Filter filter, String option) throws SQLException, Exception {
        return CreditCardDAO.loadPX265SQP00661(filter, option);
    }

    public A2280Filter loadPX265SQP00662(A2280Filter filter) throws Exception {
        return CreditCardDAO.loadPX265SQP00662(filter);
    }

    public List<A2280Filter> loadPX265SQP03398(A2280Filter filter) throws SQLException, Exception {
        return CreditCardDAO.loadPX265SQP03398(filter);
    }
    
    // ----------------------------------------------------------------------------------------------------
    
    public List<A2280Filter> loadPX265SQP00663() throws Exception {
        return CreditCardDAO.loadPX265SQP00663();
    }
    
    public List<A2280Filter> loadPX265SQP03423() throws SQLException, Exception {
        return CreditCardDAO.loadPX265SQP03423();
    }
    
    public A2280Filter loadPX265SQP03399(A2280Filter filter) throws SQLException, Exception  {
        return CreditCardDAO.loadPX265SQP03399(filter);
    }
    
    public String loadPX265SQP00941(A2280Filter filter) throws SQLException, Exception {
        return CreditCardDAO.loadPX265SQP00941(filter);
    }
    
    public String loadPX265SQP03400(A2280Filter filter, String option) throws SQLException, Exception {
        return CreditCardDAO.loadPX265SQP03400(filter, option);
    }
    
    
}
