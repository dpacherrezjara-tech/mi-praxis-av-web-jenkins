/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.EmisionEdoCtaDAO;
import net.miatech.praxis.eecta.SQP03976Filter;
import net.miatech.praxis.eecta.SQP03977Filter;
import net.miatech.praxis.eecta.SQP04001Filter;
import net.miatech.praxis.eecta.SQP04043Filter;
import net.miatech.praxis.eecta.SQP04050Filter;

/**
 *
 * @author vhidalgo
 */
public class EmisionEdoCtaLogic {
    private EmisionEdoCtaDAO objDAO = new EmisionEdoCtaDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP03977Filter> getSQP03977Filter(SQP03977Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03977Filter(filter);
    }

    public List<SQP03976Filter> getSQP03976Filter(SQP03976Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03976Filter(filter);
    }
    public List<SQP04001Filter> getSQP04001(SQP04001Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04001(filter);
    }
    public List<SQP04043Filter> getSQP04043Filter(SQP04043Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04043Filter(filter);
    }
    public List<SQP04050Filter> getSQP04050Filter(SQP04050Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04050Filter(filter);
    }
    
    
    
}
