/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.SalesConciliationManualDAO;
import net.miatech.praxis.payment.filter.A2295Filter;

/**
 *
 * @author 
 */
public class SalesConciliationManualLogic {

    private final SalesConciliationManualDAO SalesConciliationManualDAO = new SalesConciliationManualDAO();

    public void setSession(IServerSession ss) {
        SalesConciliationManualDAO.setSession(ss);
    }
    
    public List<A2295Filter> loadPX290MPS077(A2295Filter filter) throws SQLException, Exception {
        return SalesConciliationManualDAO.loadPX290MPS077(filter);
    }
    
    public List<A2295Filter> loadPX290MPS077_MONTH(A2295Filter filter) throws SQLException, Exception {
        return SalesConciliationManualDAO.loadPX290MPS077_MONTH(filter);
    }
    
    public List<A2295Filter> loadPX290MPS077_DAY(A2295Filter filter) throws SQLException, Exception {
        return SalesConciliationManualDAO.loadPX290MPS077_DAY(filter);
    }
    
    public List<A2295Filter> loadPX290MPS077_DET(A2295Filter filter) throws SQLException, Exception {
        return SalesConciliationManualDAO.loadPX290MPS077_DET(filter);
    }
    
    public List<A2295Filter> loadPX290MPS077_DET_BYF(A2295Filter filter) throws SQLException, Exception {
        return SalesConciliationManualDAO.loadPX290MPS077_DET_BYF(filter);
    }
    public List<A2295Filter> loadPX290MPS077_DET_BYD(A2295Filter filter) throws SQLException, Exception {
        return SalesConciliationManualDAO.loadPX290MPS077_DET_BYD(filter);
    }
    
    public List<A2295Filter> loadPX290MPS077_DET_BYS(A2295Filter filter) throws SQLException, Exception {
        return SalesConciliationManualDAO.loadPX290MPS077_DET_BYS(filter);
    }
}
