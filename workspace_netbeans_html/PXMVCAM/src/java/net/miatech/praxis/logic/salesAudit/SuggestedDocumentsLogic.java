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
import net.miatech.praxis.dao.salesAudit.SuggestedDocumentsDAO;

/**
 *
 * @author zperez
 */
public class SuggestedDocumentsLogic {
     private SuggestedDocumentsDAO objDAO = new SuggestedDocumentsDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1672Filter> SearchReportGeneral(A1672Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportGeneral(filter);
    }
    public List<A1672Filter> SearchReportDetail(A1672Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportDetail(filter);
    }
    public List<A1672Filter> SearchReportGeneral2(A1672Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportGeneral2(filter);
    }
    
}
