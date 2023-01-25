/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.ControlUATPDAO;
import net.miatech.praxis.eecta.SQP03347Filter;
import net.miatech.praxis.eecta.SQP03348Filter;
import net.miatech.praxis.eecta.SQP04108Filter;
import net.miatech.praxis.eecta.SQP04109Filter;
import net.miatech.praxis.eecta.SQP04110Filter;
import net.miatech.praxis.eecta.SQP04145Filter;
import net.miatech.praxis.eecta.SQP04146Filter;

/**
 *
 * @author vhidalgo
 */
public class ControlUATPLogic {

    private ControlUATPDAO objDAO = new ControlUATPDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP04108Filter> getSQP04108Filter(SQP04108Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04108Filter(filter);
    }

    public List<SQP04109Filter> getSQP04109Filter(SQP04109Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04109Filter(filter);
    }

    public SQP04110Filter setSQP04110Filter(SQP04110Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04110Filter(filter);
    }

    public List<SQP03347Filter> getSQP03347Filter(SQP03347Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03347Filter(filter);
    }

    public SQP03348Filter setSQP03348Filter(SQP03348Filter filter) throws SQLException, Exception {
        return objDAO.setSQP03348Filter(filter);
    }
    
     public List<SQP04145Filter> getSQP04145Filter(SQP04145Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04145Filter(filter);
    }
    public List<SQP04146Filter> getSQP04146Filter(SQP04146Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04146Filter(filter);
    }

}
