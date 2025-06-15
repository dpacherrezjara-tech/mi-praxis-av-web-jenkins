/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.TourismConciliationDAO;
import net.miatech.praxis.payment.filter.A2282Filter;

/**
 *
 * @author 
 */
public class TourismConciliationLogic {

    private final TourismConciliationDAO TourismConciliationDAO = new TourismConciliationDAO();

    public void setSession(IServerSession ss) {
        TourismConciliationDAO.setSession(ss);

    }
    
    public List<A2282Filter> loadMPF146SQP00905(A2282Filter filter) throws SQLException, Exception {
        return TourismConciliationDAO.loadMPF146SQP00905(filter);
    }
    
    public List<A2282Filter> loadPX268SQP00907(A2282Filter filter) throws SQLException, Exception {
        return TourismConciliationDAO.loadPX268SQP00907(filter);
    }

}
