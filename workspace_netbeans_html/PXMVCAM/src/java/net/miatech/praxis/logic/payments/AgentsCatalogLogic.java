/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.AgentsCatalogDAO;
import net.miatech.praxis.payment.filter.MPF106Filter;

/**
 *
 * @author lmendoza
 */
public class AgentsCatalogLogic {

    private final AgentsCatalogDAO agentsCatalogDAO = new AgentsCatalogDAO();

    public void setSession(IServerSession ss) {
        agentsCatalogDAO.setSession(ss);

    }

    public List<MPF106Filter> loadPX616SQP04941(MPF106Filter filter) throws SQLException, Exception {
        return agentsCatalogDAO.loadPX616SQP04941(filter);
    }

    public String loadPX616SQP04942(MPF106Filter filter, String option) throws SQLException, Exception {
        return agentsCatalogDAO.loadPX616SQP04942(filter, option);
    }

    public MPF106Filter loadPX616SQP04943(MPF106Filter filter) throws SQLException, Exception {
        return agentsCatalogDAO.loadPX616SQP04943(filter);
    }

}
