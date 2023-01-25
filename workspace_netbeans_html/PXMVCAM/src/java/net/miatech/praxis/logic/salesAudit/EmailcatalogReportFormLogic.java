/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A3903Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.EmailcatalogReportFormDAO;

/**
 *
 * @author zperez
 */
public class EmailcatalogReportFormLogic {

    public EmailcatalogReportFormDAO ReportFormDAO = new EmailcatalogReportFormDAO();

    public void setSession(IServerSession ss) {
        ReportFormDAO.setSession(ss);
    }

    public List<A3903Filter> search(A3903Filter filter) throws SQLException, Exception {
        return ReportFormDAO.search(filter);
    }
    public String mantenimiento(A3903Filter filter) throws SQLException, Exception {
        return ReportFormDAO.mantenimiento(filter);
    }

}
