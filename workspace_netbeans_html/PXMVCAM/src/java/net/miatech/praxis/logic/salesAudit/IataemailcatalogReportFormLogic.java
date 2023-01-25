/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3948Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.IataemailcatalogReportFormDAO;

/**
 *
 * @author zperez
 */
public class IataemailcatalogReportFormLogic {

    public IataemailcatalogReportFormDAO ReportFormDAO = new IataemailcatalogReportFormDAO();

    public void setSession(IServerSession ss) {
        ReportFormDAO.setSession(ss);
    }

    public List<A3948Filter> search(A3948Filter filter) throws SQLException, Exception {
        return ReportFormDAO.search(filter);
    }

    public String mantenimiento(A3948Filter filter) throws SQLException, Exception {
        return ReportFormDAO.mantenimiento(filter);
    }

}
