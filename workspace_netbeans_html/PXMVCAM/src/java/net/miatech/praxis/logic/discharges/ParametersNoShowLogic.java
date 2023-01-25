/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.discharges;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP03893Filter;
import net.miatech.beans.SQP03894Filter;
import net.miatech.beans.SQP03901Filter;
import net.miatech.beans.SQP03922Filter;
import net.miatech.beans.SQP03923Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.discharges.ParametersNoShowDAO;

/**
 *
 * @author vhidalgo
 */
public class ParametersNoShowLogic {

    private final ParametersNoShowDAO parametersNoShowDAO = new ParametersNoShowDAO();

    public void setSession(IServerSession ss) {
        parametersNoShowDAO.setSession(ss);

    }

    public List<SQP03893Filter> loadSQP03893(SQP03893Filter filter) throws SQLException, Exception {
        return parametersNoShowDAO.loadSQP03893(filter);
    }

    public SQP03894Filter setSQP03894(SQP03894Filter filter) throws SQLException, Exception {
        return parametersNoShowDAO.setSQP03894(filter);
    }

    public List<SQP03901Filter> loadSQP03901(SQP03901Filter filter) throws SQLException, Exception {
        return parametersNoShowDAO.loadSQP03901(filter);
    }

    public List<SQP03922Filter> loadSQP03922(SQP03922Filter filter) throws SQLException, Exception {
        return parametersNoShowDAO.loadSQP03922(filter);
    }

    public SQP03923Filter setSQP03923(SQP03923Filter filter) throws SQLException, Exception {
        return parametersNoShowDAO.setSQP03923(filter);
    }

}
