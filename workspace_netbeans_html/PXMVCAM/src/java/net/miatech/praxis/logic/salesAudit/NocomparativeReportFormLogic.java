/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3951Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.NocomparativeReportFormDAO;

/**
 *
 * @author zperez
 */
public class NocomparativeReportFormLogic {
    private NocomparativeReportFormDAO NocomparativeDAO = new NocomparativeReportFormDAO();
    public void setSession(IServerSession ss) {
        NocomparativeDAO.setSession(ss);
    }

    public List<A3951Filter> Search(A3951Filter filter) throws SQLException, Exception {
        return NocomparativeDAO.Search(filter);
    }
    
}
