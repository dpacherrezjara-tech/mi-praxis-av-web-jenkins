/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3388Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RefundControlDAO;

/**
 *
 * @author zperez
 */
public class RefundControlLogic { 
    
    private RefundControlDAO objDAO= new RefundControlDAO();
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    public List<A3388Filter> searchRefundControl(A3388Filter filter) throws SQLException, Exception {
        return objDAO.searchRefundControl(filter);
    }
     public List<A3388Filter> SearchRefundDetail(A3388Filter filter) throws SQLException, Exception {
        return objDAO.SearchRefundDetail(filter);
    }
    
}
