/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.StatementReconciliationsDAO;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;

/**
 *
 * @author lmendoza
 */
public class StatementReconciliationsLogic {

    private final StatementReconciliationsDAO StatementReconciliationsDAO = new StatementReconciliationsDAO();

    public void setSession(IServerSession ss) {
        StatementReconciliationsDAO.setSession(ss);
    }

   public List<A2290Filter> loadPX287SQP00838(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00838(filter);
    }
   
   public List<A2290Filter> loadPX287SQP00839(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00839(filter);
    }
   
   public List<A2290Filter> loadPX287SQP00839ByS(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00839ByS(filter);
    }
   
   public List<A2290Filter> loadPX287SQP00840(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00840(filter);
    }
   
   public List<A2290Filter> loadPX287SQP00840ByS(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00840ByS(filter);
    }
   
   public List<A2290Filter> loadPX287SQP00841(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00841(filter);
    }
   
   public List<A2290Filter> loadPX287SQP00841ByS(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00841ByS(filter);
    }
   
   public List<A2290Filter> loadPX287SQP00842(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00842(filter);
    }
    
   public A2290Filter loadPX287SQP00844(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00844(filter);
    }

}
