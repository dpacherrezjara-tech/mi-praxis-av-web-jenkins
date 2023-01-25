/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP01059Filter;
import net.miatech.beans.SaleAudit.SQP01061Filter;
import net.miatech.beans.SaleAudit.SQP01072Filter;
import net.miatech.beans.SaleAudit.SQP01073Filter;
import net.miatech.beans.SaleAudit.SQP01075Filter;
import net.miatech.beans.SaleAudit.SQP01076Filter;
import net.miatech.beans.SaleAudit.SQP01086Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.TaxesByCodeDAO;

/**
 *
 * @author jmeiggs
 */
public class TaxesByCodeLogic {

    private final TaxesByCodeDAO taxesByCodeDAO = new TaxesByCodeDAO();

    public void setSession(IServerSession ss) {
        taxesByCodeDAO.setSession(ss);

    }
    
    public List<SQP01059Filter> getLoadSQP01059(SQP01059Filter filter) throws SQLException, Exception {
        return taxesByCodeDAO.getLoadSQP01059(filter);
    }
    
    public List<SQP01061Filter> getLoadSQP01061(SQP01061Filter filter) throws SQLException, Exception {
        return taxesByCodeDAO.getLoadSQP01061(filter);
    }
    
    public List<SQP01072Filter> getLoadSQP01072(SQP01072Filter filter) throws SQLException, Exception {
        return taxesByCodeDAO.getLoadSQP01072(filter);
    }
    
    public List<SQP01073Filter> getLoadSQP01073(SQP01073Filter filter) throws SQLException, Exception {
        return taxesByCodeDAO.getLoadSQP01073(filter);
    }
    
    public List<SQP01075Filter> getLoadSQP01075(SQP01075Filter filter) throws SQLException, Exception {
        return taxesByCodeDAO.getLoadSQP01075(filter);
    }
    
    public List<SQP01076Filter> getLoadSQP01076(SQP01076Filter filter) throws SQLException, Exception {
        return taxesByCodeDAO.getLoadSQP01076(filter);
    }
    
    public List<SQP01086Filter> getLoadSQP01086(SQP01086Filter filter) throws SQLException, Exception {
        return taxesByCodeDAO.getLoadSQP01086(filter);
    }
}
