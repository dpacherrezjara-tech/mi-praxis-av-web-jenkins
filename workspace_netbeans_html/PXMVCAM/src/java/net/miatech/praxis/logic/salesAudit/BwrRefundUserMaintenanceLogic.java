/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3406Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.BwrRefundUserMaintenanceDAO;

/**
 *
 * @author lremicio
 */
public class BwrRefundUserMaintenanceLogic {
    
    private BwrRefundUserMaintenanceDAO objDAO = new BwrRefundUserMaintenanceDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A3406Filter> SearchRefundUser(A3406Filter filter) throws SQLException, Exception {
        return objDAO.SearchRefundUser(filter);
    }
    
    public String insertTKT(A3406Filter filter) throws SQLException, Exception {
        return objDAO.insertTKT(filter);
    }
    
}
