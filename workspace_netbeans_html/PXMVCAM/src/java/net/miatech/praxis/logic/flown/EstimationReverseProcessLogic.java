/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1716Filter;
import net.miatech.beans.A2166Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.EstimationReverseProcessDAO;

/**
 *
 * @author lmendoza
 */
public class EstimationReverseProcessLogic {

    private final EstimationReverseProcessDAO estimationReverseProcessDAO = new EstimationReverseProcessDAO();

    public void setSession(IServerSession ss) {
        estimationReverseProcessDAO.setSession(ss);

    }

    public List<A1716Filter> loadEstimationControl(A1716Filter filter) throws SQLException, Exception {
        return estimationReverseProcessDAO.loadEstimationControl(filter);
    }

    public List<A2166Filter> loadResultadoDownload(A2166Filter filter) throws SQLException, Exception {
        return estimationReverseProcessDAO.loadResultadoDownload(filter);
    }

    public List<A2166Filter> getTramaFile(A2166Filter filter) throws SQLException, Exception {
        return estimationReverseProcessDAO.getTramaFile(filter);
    }

}
