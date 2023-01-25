/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.SaleAudit.A3650Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RFNDUserMaintenanceDAO;

/**
 *
 * @author zperez
 */
public class RFNDUserMaintenanceLogic {

    public RFNDUserMaintenanceDAO objDAO = new RFNDUserMaintenanceDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    public List<A3650Filter> SearchRefundUser(A3650Filter filter) throws SQLException, Exception {
        return objDAO.SearchRefundUser(filter);
    }
    
    public String insertTKT(A3650Filter filter) throws SQLException, Exception {
        return objDAO.insertTKT(filter);
    }
     public List<A3389Filter> loadDataInit() throws SQLException, Exception {
        return objDAO.loadDataInit();
     }


}
