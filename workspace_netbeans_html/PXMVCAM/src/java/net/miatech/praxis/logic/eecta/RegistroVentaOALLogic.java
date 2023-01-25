/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.RegistroVentaOALDAO;
import net.miatech.praxis.eecta.SQP04163Filter;
import net.miatech.praxis.eecta.SQP04164Filter;
import net.miatech.praxis.eecta.SQP04173Filter;

/**
 *
 * @author vhidalgo
 */
public class RegistroVentaOALLogic {

    private RegistroVentaOALDAO objDAO = new RegistroVentaOALDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP04163Filter> getSQP04163Filter(SQP04163Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04163Filter(filter);
    }

    public SQP04164Filter setSQP04164Filter(SQP04164Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04164Filter(filter);
    }
    public List<SQP04173Filter> getSQP04173Filter(SQP04173Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04173Filter(filter);
    }
    
}
