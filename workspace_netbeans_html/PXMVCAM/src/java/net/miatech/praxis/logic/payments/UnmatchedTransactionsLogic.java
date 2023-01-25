/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.UnmatchedTransactionsDAO;
import net.miatech.praxis.payment.filter.A2290Filter;

/**
 *
 * @author 
 */
public class UnmatchedTransactionsLogic {

    private final UnmatchedTransactionsDAO UnmatchedTransactionsDAO = new UnmatchedTransactionsDAO();

    public void setSession(IServerSession ss) {
        UnmatchedTransactionsDAO.setSession(ss);

    }
   
   public List<A2290Filter> loadPX297SQP00940(A2290Filter filter, HashMap<String, String> hmDescError,
                              HashMap<String, String> hmDescCard) throws SQLException, Exception {
        return UnmatchedTransactionsDAO.loadPX297SQP00940(filter, hmDescError, hmDescCard);
    }
   
   public List<A2290Filter> loadPX297SQP00891(A2290Filter filter, HashMap<String, String> hmDescError,
                              HashMap<String, String> hmDescCard) throws SQLException, Exception {
        return UnmatchedTransactionsDAO.loadPX297SQP00891(filter, hmDescError, hmDescCard);
   }
   
   public List<A2290Filter> loadPX297SQP00915(A2290Filter filter) throws SQLException, Exception {
        return UnmatchedTransactionsDAO.loadPX297SQP00915(filter);
   }
   
   public List<A2290Filter> loadPX297SQP00966(A2290Filter filter) throws SQLException, Exception {
        return UnmatchedTransactionsDAO.loadPX297SQP00966(filter);
   }
   
   public List<A2290Filter> loadPX297SQP01321(A2290Filter filter) throws SQLException, Exception {
        return UnmatchedTransactionsDAO.loadPX297SQP01321(filter);
   }
   
   public A2290Filter loadPX297SQP00893(A2290Filter filter) throws SQLException, Exception {
        return UnmatchedTransactionsDAO.loadPX297SQP00893(filter);
   }
   
   
}
