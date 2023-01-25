/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.SaleAudit.SQP00989Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.TraceabilitySuggestedDAO;

/**
 *
 * @author zperez
 */
public class TraceabilitySuggestedLogic {

    private TraceabilitySuggestedDAO objDAO = new TraceabilitySuggestedDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public A1672Filter Search(A1672Filter filter) throws SQLException, Exception {
        return objDAO.Search(filter);
    }

    public A1672Filter SearchSumaria(A1672Filter filter) throws SQLException, Exception {
        return objDAO.SearchSumaria(filter);
    }

    public List<SQP00911Filter> SearchDetail(A1672Filter filter) throws SQLException, Exception {
        return objDAO.SearchDetail(filter);
    }

    public List<SQP00911Filter> SearchReportADM(A1672Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportADM(filter);
    }
    public List<SQP00989Filter> SearchDetailPendiente(SQP00989Filter filter) throws SQLException, Exception {
        return objDAO.SearchDetailPendiente(filter);
    }
}
