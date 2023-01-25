/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2393Filter;
import net.miatech.beans.SaleAudit.A2419Filter;
import net.miatech.beans.SaleAudit.A2468Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.FaresatpcoFormDAO;

/**
 *
 * @author zperez
 */
public class FaresatpcoFormLogic {
    public FaresatpcoFormDAO FormDAO= new FaresatpcoFormDAO();
    
     public void setSession(IServerSession ss) {
        FormDAO.setSession(ss);
    }

    public List<A2419Filter> lstsearch(A2419Filter filter) throws SQLException, Exception {
        return FormDAO.lstsearch(filter);
    }
    public List<A2393Filter> loadFareRuleSearch(A2393Filter filter) throws SQLException, Exception {
        return FormDAO.loadFareRuleSearch(filter);
    }
    public List<A2468Filter> loadFareFootSearch(A2468Filter filter) throws SQLException, Exception {
        return FormDAO.loadFareFootSearch(filter);
    }
    public List<A2393Filter> loadTableRuleSearch(A2393Filter filter) throws SQLException, Exception {
        return FormDAO.loadTableRuleSearch(filter);
    }
     public List<A2468Filter> loadTableFootSearch(A2468Filter filter) throws SQLException, Exception {
        return FormDAO.loadTableFootSearch(filter);
    }
}
