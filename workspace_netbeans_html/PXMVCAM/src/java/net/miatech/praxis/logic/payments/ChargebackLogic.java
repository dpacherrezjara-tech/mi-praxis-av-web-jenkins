/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ChargebackDAO;
import net.miatech.praxis.payment.filter.A2295Filter;

/**
 *
 * @author 
 */
public class ChargebackLogic {

    private final ChargebackDAO ChargebackDAO = new ChargebackDAO();

    public void setSession(IServerSession ss) {
        ChargebackDAO.setSession(ss);
    }
    
    public List<A2295Filter> loadPX290SQP00852(A2295Filter filter) throws SQLException, Exception {
        return ChargebackDAO.loadPX290SQP00852(filter);
    }
    
    public A2295Filter loadPX290SQP00854(A2295Filter filter) throws Exception {
        return ChargebackDAO.loadPX290SQP00854(filter);
    }
    
    public String loadPX290SQP00853(A2295Filter filter, String option) throws SQLException, Exception {
        return ChargebackDAO.loadPX290SQP00853(filter, option);
    }
    
}
