/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3456Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RejectedReportFormDAO;

/**
 *
 * @author zperez
 */
public class RejectedReportFormLogic {

    private RejectedReportFormDAO RejectedDAO = new RejectedReportFormDAO();

    public void setSession(IServerSession ss) {
        RejectedDAO.setSession(ss);
    }

    public List<A3456Filter> searchDowloadFiles(A3456Filter filter) throws SQLException, Exception {
        return RejectedDAO.searchDowloadFiles(filter);
    }
    public List<A3456Filter> SearchRejectedDocDetail(A3456Filter filter) throws SQLException, Exception {
        return RejectedDAO.SearchRejectedDocDetail(filter);
    }
}
