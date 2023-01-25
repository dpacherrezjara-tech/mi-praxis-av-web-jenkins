/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.IMF072Filter;
import net.miatech.beans.IMF140Filter;
import net.miatech.beans.IMF141Filter;
import net.miatech.beans.spring.implement.IServerSession;

import net.miatech.praxis.dao.flown.ForecastDAO;

public class ForecastLogic {

    private final ForecastDAO ForecastDAO = new ForecastDAO();

    public void setSession(IServerSession ss) {
        ForecastDAO.setSession(ss);
    }

    public List<IMF140Filter> loadPX551SQP04119(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP04119(filter);
    }
    
        public List<IMF140Filter> loadPX551SQP03895(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP03895(filter);
    }
    
    public List<IMF072Filter> loadPX551SQP04159(IMF072Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP04159(filter);
    }

    public List<IMF141Filter> loadPX551SQP03896(IMF141Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP03896(filter);
    }

    public List<IMF140Filter> loadPX551SQP03897(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP03897(filter);
    }
    
    public List<IMF140Filter> loadPX551SQP04160(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP04160(filter);
    }

    public List<IMF140Filter> loadPX551SQP03898(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP03898(filter);
    }

    public List<IMF140Filter> loadPX551SQP03936(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP03936(filter);
    }

    public List<IMF140Filter> loadPX551SQP03937(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP03937(filter);
    }

    public List<IMF140Filter> loadPX551SQP04015(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP04015(filter);
    }

    public List<IMF140Filter> loadPX551SQP04016(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP04016(filter);
    }

    public HashMap<String, List<IMF140Filter>> loadPX551SQP04017(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP04017(filter);
    }

    public HashMap<String, List<IMF140Filter>> loadPX551SQP04096(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP04096(filter);
    }

    public List<IMF140Filter> loadPX551SQP04097(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP04097(filter);
    }

    public List<IMF140Filter> loadPX551SQP04118(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP04118(filter);
    }

    
     
}
