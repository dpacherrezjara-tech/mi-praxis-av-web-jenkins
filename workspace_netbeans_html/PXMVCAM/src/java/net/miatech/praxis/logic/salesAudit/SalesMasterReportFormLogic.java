/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.SalesMasterReportFormDAO;

/**
 *
 * @author zperez
 */
public class SalesMasterReportFormLogic {

    private SalesMasterReportFormDAO masterSalesAuditDAO = new SalesMasterReportFormDAO();

    public void setSession(IServerSession ss) {
        masterSalesAuditDAO.setSession(ss);
    }
    
    public   List<A1672Filter> lst_search(A1672Filter filter) throws SQLException, Exception {
        return masterSalesAuditDAO.lst_search(filter);
    }
}
