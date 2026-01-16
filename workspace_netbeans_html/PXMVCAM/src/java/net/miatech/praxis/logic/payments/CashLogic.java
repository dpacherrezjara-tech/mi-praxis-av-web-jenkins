/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
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

//    CASH
    
    public List<MPF108> loadMPS441(MPF108Filter filter) throws SQLException, Exception {
        return CashDAO.loadMPS441(filter);
    }

    public List<MPF300> loadMPS442(MPF108Filter filter) throws SQLException, Exception {
        return CashDAO.loadMPS442(filter);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public List<MPF108> loadMPS520(MPF108Filter filter) throws SQLException, Exception {
        return CashDAO.loadMPS520(filter);
    }

    public Map<String, Object> executeMPS440(MPF108Filter filter) throws SQLException, Exception {
        return CashDAO.executeMPS440(filter);
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

}
