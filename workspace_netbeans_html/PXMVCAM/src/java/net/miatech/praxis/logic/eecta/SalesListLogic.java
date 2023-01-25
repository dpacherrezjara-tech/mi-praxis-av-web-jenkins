/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.SalesListDAO;
import net.miatech.praxis.eecta.SQP03873Filter;
import net.miatech.praxis.eecta.SQP03874Filter;

/**
 *
 * @author vhidalgo
 */
public class SalesListLogic {

    private SalesListDAO objDAO = new SalesListDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP03873Filter> getSQP03873Filter(SQP03873Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01558Filter(filter);
    }

    public List<SQP03874Filter> getSQP03874Filter(SQP03874Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03874Filter(filter);
    }

}
