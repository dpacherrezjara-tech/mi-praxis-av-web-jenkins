/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.BanksCatalogDAO;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.filter.A2280Filter;

/**
 *
 * @author lmendoza
 */
public class BanksCatalogLogic {

    private final BanksCatalogDAO banksCatalogDAO = new BanksCatalogDAO();

    public void setSession(IServerSession ss) {
        banksCatalogDAO.setSession(ss);

    }

    public List<A2281> loadPX267SQP00671(A2281 filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX267SQP00671(filter);
    }

    public String loadPX267SQP00672(A2281 filter, String option) throws SQLException, Exception {
        return banksCatalogDAO.loadPX267SQP00672(filter, option);
    }

    public A2281 loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX267SQP00673(filter);
    }

}
