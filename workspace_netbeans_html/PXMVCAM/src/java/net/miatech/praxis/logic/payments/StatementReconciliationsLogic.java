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

//    public List<A2280Filter> loadPX267SQP00671(A2280Filter filter) throws SQLException, Exception {
//        return StatementReconciliationsDAO.loadPX267SQP00671(filter);
//    }
//   
//   public String loadPX267SQP00672(A2280Filter filter, String option) throws SQLException, Exception {
//        return StatementReconciliationsDAO.loadPX267SQP00672(filter, option);
//    }
//   public A2280Filter loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {
//     return StatementReconciliationsDAO.loadPX267SQP00673(filter);
//   }
//   
//   public List<A1691Filter> loadPX330SQP01039(A1691Filter filter) throws SQLException, Exception {
//        return StatementReconciliationsDAO.loadPX330SQP01039(filter);
//    }
// 
//   public int loadPXSQPCLP(A1691Filter filter) throws Exception {
//        return StatementReconciliationsDAO.loadPXSQPCLP(filter);
//    }
//   
//   public A1691Filter loadPX265SQP01449(A1691Filter filter) throws Exception {
//        return StatementReconciliationsDAO.loadPX265SQP01449(filter);
//    }
//   
//   public String loadPX265SQP01448(A1691Filter filter, String option) throws SQLException, Exception {
//        return StatementReconciliationsDAO.loadPX265SQP01448(filter, option);
//    }
   
   public List<A2290Filter> loadPX287SQP00838(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00838(filter);
    }
   
   public List<A2290Filter> loadPX287SQP00839(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00839(filter);
    }
   
   public List<A2290Filter> loadPX287SQP00840(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00840(filter);
    }
   
   public List<A2290Filter> loadPX287SQP00841(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00841(filter);
    }
   
   public List<A2290Filter> loadPX287SQP05111Cross(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP05111Cross(filter);
    }
   
   public List<A2290Filter> loadPX287SQP00842(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00842(filter);
    }
    
   public List<A2290Filter> loadPX287SQP00839Stval(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00839Stval(filter);
    }
   
   
   
//   public List<A2290Filter> loadPX287SQP00924(A2290Filter filter) throws SQLException, Exception {
//        return StatementReconciliationsDAO.loadPX287SQP00924(filter);
//    }
//
//   public List<A2290Filter> loadPX287SQP00925(A2290Filter filter) throws SQLException, Exception {
//        return StatementReconciliationsDAO.loadPX287SQP00925(filter);
//    }
//   
//   public List<A2290Filter> loadPX287SQP00926(A2290Filter filter) throws SQLException, Exception {
//        return StatementReconciliationsDAO.loadPX287SQP00926(filter);
//    }
//   
//   public List<A2290Filter> loadPX287SQP02055(A2290Filter filter) throws SQLException, Exception {
//        return StatementReconciliationsDAO.loadPX287SQP02055(filter);
//    }
//   
   public A2290Filter loadPX287SQP00844(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00844(filter);
    }

}
