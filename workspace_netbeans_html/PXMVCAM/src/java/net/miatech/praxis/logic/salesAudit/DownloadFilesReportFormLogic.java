/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3280Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.DownloadFilesReportFormDAO;

/**
 *
 * @author zperez
 */
public class DownloadFilesReportFormLogic {

    private DownloadFilesReportFormDAO objDAO = new DownloadFilesReportFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3280Filter> searchDowloadFiles(A3280Filter filter) throws SQLException, Exception {
        return objDAO.searchDowloadFiles(filter);
    }

    public List<A3280Filter> SearchDebitosDetail(A3280Filter filter) throws SQLException, Exception {
        return objDAO.SearchDebitosDetail(filter);
    }

    public List<A3280Filter> listFiles(A3280Filter filter) throws SQLException, Exception {
        return objDAO.listFiles(filter);
    }

}
