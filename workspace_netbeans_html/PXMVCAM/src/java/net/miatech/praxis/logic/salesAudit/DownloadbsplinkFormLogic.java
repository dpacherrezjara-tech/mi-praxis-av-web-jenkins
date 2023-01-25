/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP00846Filter;
import net.miatech.beans.SaleAudit.SQP00982Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.DownloadbsplinkFormDAO;

/**
 *
 * @author zperez
 */
public class DownloadbsplinkFormLogic {

    private DownloadbsplinkFormDAO bsplinkFormDAO = new DownloadbsplinkFormDAO();

    public void setSession(IServerSession ss) {
        bsplinkFormDAO.setSession(ss);
    }

    public List<SQP00982Filter> search(SQP00982Filter filter) throws SQLException, Exception {
        return bsplinkFormDAO.search(filter);
    }
    public List<SQP00846Filter> searchProcessedBspLink(SQP00846Filter filter) throws SQLException, Exception {
        return bsplinkFormDAO.searchProcessedBspLink(filter);
    }
     public String ProcessedBspLink(SQP00846Filter filter) throws SQLException, Exception {
        return bsplinkFormDAO.ProcessedBspLink(filter);
    }
}
