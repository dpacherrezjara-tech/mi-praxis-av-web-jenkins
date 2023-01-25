/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3404Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.BwrRFNDReasaonsMaintenanceDAO;

/**
 *
 * @author lremicio
 */
public class BwrRFNDReasaonsMaintenanceLogic {
    
    private BwrRFNDReasaonsMaintenanceDAO objDAO = new BwrRFNDReasaonsMaintenanceDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A3404Filter> SearchRFNDReasaons(A3404Filter filter) throws SQLException, Exception {
        return objDAO.SearchRFNDReasaons(filter);
    }
    
    public String insertTKT(A3404Filter filter) throws SQLException, Exception {
        return objDAO.insertTKT(filter);
    }
    
}
