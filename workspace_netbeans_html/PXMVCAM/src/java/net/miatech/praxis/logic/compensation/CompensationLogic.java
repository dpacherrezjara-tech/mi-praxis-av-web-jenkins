/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.compensation;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.compensation.SQP04067Filter;
import net.miatech.praxis.compensation.SQP04068Filter;
import net.miatech.praxis.dao.compensation.CompensationDAO;

/**
 *
 * @author vhidalgo
 */
public class CompensationLogic {

    private final CompensationDAO compensationDAO = new CompensationDAO();

    public void setSession(IServerSession ss) {
        compensationDAO.setSession(ss);

    }

    public List<SQP04067Filter> loadSQP04067(SQP04067Filter filter) throws SQLException, Exception {
        return compensationDAO.loadSQP04067(filter);
    }

    public SQP04068Filter setSQP04068Filter(SQP04068Filter filter) throws SQLException, Exception {
        return compensationDAO.setSQP04068Filter(filter);
    }

}
