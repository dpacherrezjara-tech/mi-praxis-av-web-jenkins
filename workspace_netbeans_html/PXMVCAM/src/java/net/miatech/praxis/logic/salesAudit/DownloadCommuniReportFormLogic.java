/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3455Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.DownloadCommuniReportFormDAO;

/**
 *
 * @author zperez
 */
public class DownloadCommuniReportFormLogic {

    private DownloadCommuniReportFormDAO DownloadCommu = new DownloadCommuniReportFormDAO();

    public void setSession(IServerSession ss) {
        DownloadCommu.setSession(ss);
    }

    public List<A3455Filter> searchDowloadFiles(A3455Filter filter) throws SQLException, Exception {
        return DownloadCommu.searchDowloadFiles(filter);
    }

    public List<A3455Filter> SearchDowloadFilesDetail(A3455Filter filter) throws SQLException, Exception {
        return DownloadCommu.SearchDowloadFilesDetail(filter);
    }

}
