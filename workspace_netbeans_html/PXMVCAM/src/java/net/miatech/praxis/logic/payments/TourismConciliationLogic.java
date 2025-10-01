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
    
    public List<A2282Filter> loadMPF101SQP00909(A2282Filter filter) throws Exception {
        return TourismConciliationDAO.loadMPF101SQP00909(filter);
    }
    
    public List<A2282Filter> loadMPF101SQP00910(A2282Filter filter) throws Exception {
        return TourismConciliationDAO.loadMPF101SQP00910(filter);
    }
    
    public A2282Filter loadMPF101SQP00911(A2282Filter filter) throws Exception {
        return TourismConciliationDAO.loadMPF101SQP00911(filter);
    }
    
    public List<A2282Filter> loadMPF148MPS227(A2282Filter filter) throws Exception {
        return TourismConciliationDAO.loadMPF148MPS227(filter);
    }

}
