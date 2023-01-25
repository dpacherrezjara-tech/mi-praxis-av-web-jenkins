/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.interline;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A094;
import net.miatech.praxis.A096;
import net.miatech.praxis.dao.interline.InvoiceConciliationDAO;
import net.miatech.praxis.interline.filter.A508Filter;

/**
 *
 * @author lmendoza
 */
public class InvoiceConciliationLogic {

    private final InvoiceConciliationDAO invoiceConciliationDAO = new InvoiceConciliationDAO();

    public void setSession(IServerSession ss) {
        invoiceConciliationDAO.setSession(ss);

    }

    public List<A508Filter> loadPX197S01A508(A508Filter filter) throws SQLException, Exception {
        return invoiceConciliationDAO.loadPX197S01A508(filter);
    }

    public List<A094> loadPX197S02A094(A508Filter filter) throws SQLException, Exception {
        return invoiceConciliationDAO.loadPX197S02A094(filter);
    }
    public List<A096> loadPX197S03A096(A094 filter) throws SQLException, Exception {
        return invoiceConciliationDAO.loadPX197S03A096(filter);
    }

}
