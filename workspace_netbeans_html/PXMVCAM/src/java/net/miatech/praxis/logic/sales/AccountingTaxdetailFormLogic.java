/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.ReportTaxA1530Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingTaxdetailFormDAO;

/**
 *
 * @author zperez
 */
public class AccountingTaxdetailFormLogic {

    private final AccountingTaxdetailFormDAO AccountingTaxdetailDAO = new AccountingTaxdetailFormDAO();

    public void setSession(IServerSession ss) {
        AccountingTaxdetailDAO.setSession(ss);
    }

    public List<ReportTaxA1530Filter> loadPXReportTax1530(ReportTaxA1530Filter filter) throws SQLException, Exception {
        return AccountingTaxdetailDAO.loadPXReportTax1530(filter);
    }

}
