/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.TerminalsCatalogDAO;
import net.miatech.praxis.payment.filter.MPF106Filter;

/**
 *
 * @author anthonyBash
 */
public class TerminalsCatalogLogic {

    private final TerminalsCatalogDAO terminalsCatalogDAO = new TerminalsCatalogDAO();

    public void setSession(IServerSession ss) {
        terminalsCatalogDAO.setSession(ss);

    }

    public List<MPF106Filter> loadPX620SQP05106(MPF106Filter filter) throws SQLException, Exception {
        return terminalsCatalogDAO.loadPX620SQP05106(filter);
    }

    public String loadPX620SQP05108(MPF106Filter filter, String option) throws SQLException, Exception {
        return terminalsCatalogDAO.loadPX620SQP05108(filter, option);
    }

    public MPF106Filter loadPX620SQP05107(MPF106Filter filter) throws SQLException, Exception {
        return terminalsCatalogDAO.loadPX620SQP05107(filter);
    }

}
