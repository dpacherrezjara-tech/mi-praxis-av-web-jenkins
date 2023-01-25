/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ClarificationDashboardDAO;
import net.miatech.praxis.payment.filter.A2331Filter;

/**
 *
 * @author 
 */
public class ClarificationDashboardLogic {

    private final ClarificationDashboardDAO ClarificationDashboardDAO = new ClarificationDashboardDAO();

    public void setSession(IServerSession ss) {
        ClarificationDashboardDAO.setSession(ss);

    }
   
   public List<A2331Filter> loadPX419SQP02079(A2331Filter filter) throws SQLException, Exception {
        return ClarificationDashboardDAO.loadPX419SQP02079(filter);
    }
   
   public List<A2331Filter> loadPX419SQP02104(A2331Filter filter) throws SQLException, Exception {
        return ClarificationDashboardDAO.loadPX419SQP02104(filter);
    }
   
}
