/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ReverseDAO;
import net.miatech.praxis.payment.filter.A2295Filter;

/**
 *
 * @author 
 */
public class ReverseLogic {

    private final ReverseDAO ReverseDAO = new ReverseDAO();

    public void setSession(IServerSession ss) {
        ReverseDAO.setSession(ss);
    }
    
    public List<A2295Filter> loadPX290MPS078(A2295Filter filter) throws SQLException, Exception {
        return ReverseDAO.loadPX290MPS078(filter);
    }
    

    
}
