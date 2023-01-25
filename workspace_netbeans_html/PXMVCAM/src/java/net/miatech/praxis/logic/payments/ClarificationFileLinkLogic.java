/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ClarificationFileLinkDAO;
import net.miatech.praxis.payment.filter.A2331Filter;

/**
 * 
 * @author
 */
public class ClarificationFileLinkLogic {

    private final ClarificationFileLinkDAO clarificationFileLinkDAO = new ClarificationFileLinkDAO();

    public void setSession(IServerSession ss) {
        clarificationFileLinkDAO.setSession(ss);

    }

    public List<A2331Filter> loadPX405SQP01914(A2331Filter filter) throws SQLException, Exception {
        return clarificationFileLinkDAO.loadPX405SQP01914(filter);
    }

    public List<A2331Filter> loadPX405SQP01915(A2331Filter filter) throws SQLException, Exception {
        return clarificationFileLinkDAO.loadPX405SQP01915(filter);
    }

    public A2331Filter loadPX405SQP01958(A2331Filter filter) throws SQLException, Exception {
        return clarificationFileLinkDAO.loadPX405SQP01958(filter);
    }

    public String loadPX405SQP01959(A2331Filter filter, String strOption) throws SQLException, Exception {
        return clarificationFileLinkDAO.loadPX405SQP01959(filter, strOption);
    }
}
