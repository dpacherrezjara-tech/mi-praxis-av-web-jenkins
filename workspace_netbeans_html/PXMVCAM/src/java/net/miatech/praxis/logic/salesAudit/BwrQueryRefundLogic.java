/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.SaleAudit.A3908Filter;
import net.miatech.praxis.dao.salesAudit.BwrQueryRefundDAO;
import net.miatech.beans.spring.implement.IServerSession;

/**
 *
 * @author lremicio
 */
public class BwrQueryRefundLogic {

    private BwrQueryRefundDAO objDAO = new BwrQueryRefundDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A3389Filter> SearchReportQueryRFND(A3389Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportQueryRFND(filter);
    }
    public A3389Filter SearchQueryRFNDetail(A3389Filter filter) throws SQLException, Exception {
        return objDAO.SearchQueryRFNDetail(filter);
    }
    public List<A3389Filter> loadDataInit() throws SQLException, Exception {
        return objDAO.loadDataInit();
    }
    public List<A3389Filter> SearchRefundControlDetail(A3389Filter filter) throws SQLException, Exception {
        return objDAO.SearchRefundControlDetail(filter);
    }
    public List<A3389Filter> searchLstRFND(A3389Filter filter) throws SQLException, Exception {
        return objDAO.searchLstRFND(filter);
    }
     public String ProcesaMantenimiento(A3389Filter beanGuardarA3389) throws SQLException, Exception {
        return objDAO.ProcesaMantenimiento(beanGuardarA3389);
    }
     
      public List<A3908Filter> searchSabreLst(A3908Filter filter) throws SQLException, Exception {
        return objDAO.searchSabreLst(filter);
    }
}
