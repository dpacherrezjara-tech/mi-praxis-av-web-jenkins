/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.DownloadADMACMReportFormDAO;

/**
 *
 * @author zperez
 */
public class DownloadADMACMReportFormLogic {

    private DownloadADMACMReportFormDAO ReportFormDAO = new DownloadADMACMReportFormDAO();

    public void setSession(IServerSession ss) {
        ReportFormDAO.setSession(ss);
    }

    public List<SQP00911Filter> Search(SQP00911Filter filter) throws SQLException, Exception {
        return ReportFormDAO.Search(filter);
    }

    public List<SQP00911Filter> SearchDownloadASRPDF(SQP00911Filter filter) throws SQLException, Exception {
        return ReportFormDAO.SearchDownloadASRPDF(filter);
    }

    public List<SQP00911Filter> LisDownloadADMPDF(ArrayList<SQP00911Filter> filter) throws SQLException, Exception {
        return ReportFormDAO.LisDownloadADMPDF(filter);
    }

    public List<SQP00911Filter> LisDownloadARCADMPDF(ArrayList<SQP00911Filter> filter) throws SQLException, Exception {
        return ReportFormDAO.LisDownloadARCADMPDF(filter);
    }

}
