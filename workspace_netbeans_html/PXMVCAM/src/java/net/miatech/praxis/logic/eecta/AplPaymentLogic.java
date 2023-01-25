/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.AplPaymentDAO;
import net.miatech.praxis.eecta.SQP03942Filter;
import net.miatech.praxis.eecta.SQP03943Filter;
import net.miatech.praxis.eecta.SQP03951Filter;
import net.miatech.praxis.eecta.SQP03952Filter;
import net.miatech.praxis.eecta.SQP03955Filter;
import net.miatech.praxis.eecta.SQP03956Filter;
import net.miatech.praxis.eecta.SQP04053Filter;
import net.miatech.praxis.eecta.SQP04059Filter;

/**
 *
 * @author vhidalgo
 */
public class AplPaymentLogic {

    private AplPaymentDAO objDAO = new AplPaymentDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP03942Filter> getSQP03942Filter(SQP03942Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03942Filter(filter);
    }

    public List<SQP03951Filter> getSQP03951Filter(SQP03951Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03951Filter(filter);
    }

    public SQP03952Filter setSQP03952Filter(SQP03952Filter filter) throws SQLException, Exception {
        return objDAO.setSQP03952Filter(filter);
    }

    public List<SQP03955Filter> getSQP03955Filter(SQP03955Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03955Filter(filter);
    }

    public List<SQP03956Filter> getSQP03956Filter(SQP03956Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03956Filter(filter);
    }

    public SQP03943Filter setSQP03943Filter(SQP03943Filter filter) throws SQLException, Exception {
        return objDAO.setSQP03943Filter(filter);
    }

    public SQP04059Filter setSQP04059Filter(SQP04059Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04059Filter(filter);
    }

    public List<SQP04053Filter> getSQP04053Filter(SQP04053Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04053Filter(filter);
    }

}
