/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.interline;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.InterlineConciliationDAO;
import net.miatech.praxis.dao.interline.ReasonCodeReportDAO;
import net.miatech.praxis.interline.filter.A2858Filter;
import net.miatech.praxis.interline.filter.SFI021Filter;

/**
 *
 * @author lmendoza
 */
public class InterlineConciliationLogic {

    private final InterlineConciliationDAO interlineConciliationDAO = new InterlineConciliationDAO();

    public void setSession(IServerSession ss) {
        interlineConciliationDAO.setSession(ss);

    }

    public List<A2858Filter> loadSQP01357(A2858Filter filter) throws SQLException, Exception {
        return interlineConciliationDAO.loadSQP01357(filter);
    }

    public List<A2858Filter> loadSQP01358(A2858Filter filter) throws SQLException, Exception {
        return interlineConciliationDAO.loadSQP01358(filter);
    }

    public List<A2858Filter> loadSQP01349(A2858Filter filter) throws SQLException, Exception {
        return interlineConciliationDAO.loadSQP01349(filter);
    }
    public List<A2858Filter> loadSQP01347(A2858Filter filter) throws SQLException, Exception {
        return interlineConciliationDAO.loadSQP01347(filter);
    }
    public List<A2858Filter> loadSQP01348(A2858Filter filter) throws SQLException, Exception {
        return interlineConciliationDAO.loadSQP01348(filter);
    }
    public List<A2858Filter> loadPX362SQP01360(A2858Filter filter) throws SQLException, Exception {
        return interlineConciliationDAO.loadPX362SQP01360(filter);
    }
    public List<A2858Filter> loadPX362SQP01366(A2858Filter filter) throws SQLException, Exception {
        return interlineConciliationDAO.loadPX362SQP01366(filter);
    }

}
