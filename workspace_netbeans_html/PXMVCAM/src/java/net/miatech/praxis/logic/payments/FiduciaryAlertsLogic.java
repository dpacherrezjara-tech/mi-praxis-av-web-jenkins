/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import net.miatech.praxis.logic.payments.*;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP04091Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.FiduciaryAlertsDAO;
import net.miatech.praxis.payment.filter.A2290Filter;

/**
 *
 * @author vhidalgo
 */
public class FiduciaryAlertsLogic {
    private FiduciaryAlertsDAO objDAO = new FiduciaryAlertsDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<SQP04091Filter> searchAccountingInterfaces(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchAccountingInterfaces(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00698Detalle(A2290Filter filter) throws SQLException, Exception {
        return objDAO.loadPX269SQP00698Detalle(filter);
    }
}
