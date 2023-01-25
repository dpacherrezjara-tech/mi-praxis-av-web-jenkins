/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3949Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.SendingcontrolReportFormDAO;

/**
 *
 * @author zperez
 */
public class SendingcontrolReportFormLogic {

    private SendingcontrolReportFormDAO objDAO = new SendingcontrolReportFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3949Filter> searchDowloadFiles(A3949Filter filter) throws SQLException, Exception {
        return objDAO.searchDowloadFiles(filter);
    }

    public List<A3949Filter> SearchDebitosDetail(A3949Filter filter) throws SQLException, Exception {
        return objDAO.SearchDebitosDetail(filter);
    }

}
