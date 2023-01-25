/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX151S01A1530Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ProgressCorrectionvalidationDAO;

/**
 *
 * @author lmendoza
 */
public class ProgressCorrectionvalidationLogic {

    private final ProgressCorrectionvalidationDAO progressCorrectionvalidationDAO = new ProgressCorrectionvalidationDAO();

    public void setSession(IServerSession ss) {
        progressCorrectionvalidationDAO.setSession(ss);

    }

    public List<PX151S01A1530Filter> loadPX151S01A1530(PX151S01A1530Filter filter) throws SQLException, Exception {
        return progressCorrectionvalidationDAO.loadPX151S01A1530(filter);
    }

}
