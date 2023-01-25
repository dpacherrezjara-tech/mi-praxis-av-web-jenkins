/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A4137Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.DisputemanagementMyarcFormDAO;

/**
 *
 * @author zperez
 */
public class DisputemanagementMyarcFormLogic {

    private DisputemanagementMyarcFormDAO MyarcFormDAO = new DisputemanagementMyarcFormDAO();

    public void setSession(IServerSession ss) {
        MyarcFormDAO.setSession(ss);
    }

    public List<A4137Filter> SearchReportMyarc(A4137Filter filter) throws SQLException, Exception {
        return MyarcFormDAO.SearchReportMyarc(filter);
    }
    public A4137Filter SearchDataDetaill(A4137Filter filter) throws SQLException, Exception {
        return MyarcFormDAO.SearchDataDetaill(filter);
    }
    public String insertTracing(A4137Filter filter) throws SQLException, Exception {
        return MyarcFormDAO.insertTracing(filter);
    }
    public String insertFile(A4137Filter filter) throws SQLException, Exception {
        return MyarcFormDAO.insertFile(filter);
    }
}
