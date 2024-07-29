/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import net.miatech.praxis.logic.interline.*;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.ReasonCodeReportDAO;
import net.miatech.praxis.dao.payments.StatementRulesDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author jsolano
 */
public class StatementRulesLogic {

    private final StatementRulesDAO StatementRulesDAO = new StatementRulesDAO();

    public void setSession(IServerSession ss) {
        StatementRulesDAO.setSession(ss);
    }

    public List<A2353Filter> loadPX285MPS102(A2353Filter filter) throws SQLException, Exception {
        return StatementRulesDAO.loadPX285MPS102(filter);
    }
    
    public A2353Filter loadPX285MPS103(A2353Filter filter) throws Exception {
        return StatementRulesDAO.loadPX285MPS103(filter);
    }

    public String loadPX285MPS104(A2353Filter filter, String option) throws SQLException, Exception {
        return StatementRulesDAO.loadPX285MPS104(filter, option);
    }
    
}
