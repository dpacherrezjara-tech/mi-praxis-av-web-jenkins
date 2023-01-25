/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.DocumentsControlDAO;

/**
 *
 * @author zperez
 */
public class DocumentsControlLogic {

    private DocumentsControlDAO objDAO = new DocumentsControlDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP00911Filter> SearchReportGeneral(SQP00911Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportGeneral(filter);
    }

    public List<SQP00911Filter> SearchReportStatus(SQP00911Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportStatus(filter);
    }

    public List<SQP00911Filter> SearchReportrazon(SQP00911Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportrazon(filter);
    }
     public List<SQP00911Filter> SearchReportADM(SQP00911Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportADM(filter);
    }
    

}
