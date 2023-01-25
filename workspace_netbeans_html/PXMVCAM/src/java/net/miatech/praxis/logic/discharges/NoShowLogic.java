/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.discharges;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP03961Filter;
import net.miatech.beans.SQP03962Filter;
import net.miatech.beans.SQP03963Filter;
import net.miatech.beans.SQP03964Filter;
import net.miatech.beans.SQP03965Filter;
import net.miatech.beans.SQP03974Filter;
import net.miatech.beans.SQP04051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.discharges.NoShowDAO;

/**
 *
 * @author vhidalgo
 */
public class NoShowLogic {

    private final NoShowDAO noShowDAO = new NoShowDAO();

    public void setSession(IServerSession ss) {
        noShowDAO.setSession(ss);

    }

    public List<SQP03961Filter> loadSQP03961(SQP03961Filter filter) throws SQLException, Exception {
        return noShowDAO.loadSQP03961(filter);
    }

    public List<SQP03962Filter> loadSQP03962(SQP03962Filter filter) throws SQLException, Exception {
        return noShowDAO.loadSQP03962(filter);
    }

    public List<SQP03963Filter> loadSQP03963(SQP03963Filter filter) throws SQLException, Exception {
        return noShowDAO.loadSQP03963(filter);
    }

    public List<SQP03964Filter> loadSQP03964(SQP03964Filter filter) throws SQLException, Exception {
        return noShowDAO.loadSQP03964(filter);
    }
    public List<SQP03965Filter> getSQP03965Filter(SQP03965Filter filter) throws SQLException, Exception {
        return noShowDAO.getSQP03965Filter(filter);
    }
    public List<SQP03974Filter> loadSQP03974Filter(SQP03974Filter filter) throws SQLException, Exception {
        return noShowDAO.loadSQP03974Filter(filter);
    }
    public List<SQP04051Filter> loadSQP04051Filter(SQP04051Filter filter) throws SQLException, Exception {
        return noShowDAO.loadSQP04051Filter(filter);
    }
    

}
