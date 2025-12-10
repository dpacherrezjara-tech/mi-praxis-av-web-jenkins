/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.MPF108;
import net.miatech.praxis.MPF108Filter;
import net.miatech.praxis.MPF300;
import net.miatech.praxis.dao.payments.CashDAO;
import net.miatech.praxis.payment.filter.A2282Filter;
import net.miatech.praxis.payment.filter.A2290Filter;

/**
 *
 * @author 
 */
public class CashLogic {

    private final CashDAO CashDAO = new CashDAO();

    public void setSession(IServerSession ss) {
        CashDAO.setSession(ss);

    }
    
    public List<MPF108> loadMPS441(MPF108Filter filter) throws SQLException, Exception {
        return CashDAO.loadMPS441(filter);
    }
    
    public List<MPF300> loadMPS442(MPF108Filter filter) throws SQLException, Exception {
        return CashDAO.loadMPS442(filter);
    }
    
    public List<MPF300> loadMPS443(MPF108Filter filter) throws SQLException, Exception {
        return CashDAO.loadMPS443(filter);
    }
    
    public List<MPF300> loadMPS444(MPF108Filter filter) throws SQLException, Exception {
        return CashDAO.loadMPS444(filter);
    }
    
    public List<MPF300> loadMPS445(MPF108Filter filter) throws SQLException, Exception {
        return CashDAO.loadMPS445(filter);
    }
    
    
    
    
    
    
    
    
    
    
    public List<A2282Filter> loadPX268SQP00675(A2282Filter filter) throws SQLException, Exception {
        return CashDAO.loadPX268SQP00675(filter);
    }
    
    public List<A2282Filter> loadPX268SQP00907(A2282Filter filter) throws SQLException, Exception {
        return CashDAO.loadPX268SQP00907(filter);
    }
    
    public List<A2290Filter> loadPX100NEW(A2290Filter filter) throws SQLException, Exception {
        return CashDAO.loadPX100NEW(filter);
    }
    public List<A2290Filter> loadPX100DetailDay(A2290Filter filter) throws SQLException, Exception {
        return CashDAO.loadPX100DetailDay(filter);
    }

}
