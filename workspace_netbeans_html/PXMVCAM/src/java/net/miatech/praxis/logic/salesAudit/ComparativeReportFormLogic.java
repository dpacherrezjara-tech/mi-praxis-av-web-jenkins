/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3950Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.ComparativeReportFormDAO;

/**
 *
 * @author zperez
 */
public class ComparativeReportFormLogic {

    private ComparativeReportFormDAO comparativeDAO = new ComparativeReportFormDAO();

    public void setSession(IServerSession ss) {
        comparativeDAO.setSession(ss);
    }

    public List<A3950Filter> Search(A3950Filter filter) throws SQLException, Exception {
        return comparativeDAO.Search(filter);
    }
}
