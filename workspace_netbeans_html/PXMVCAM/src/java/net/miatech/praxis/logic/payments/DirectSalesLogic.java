/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.DirectSalesDAO;
import net.miatech.praxis.payment.MPF190;
import net.miatech.praxis.payment.MPF190Filter;
import net.miatech.praxis.payment.MPF190ExchangePending;
import net.miatech.praxis.payment.MPF190Update;
import net.miatech.praxis.payment.MPF190Create;
import net.miatech.praxis.MPF300;

/**
 *
 * @author lmendoza
 */
public class DirectSalesLogic {

    private final DirectSalesDAO DirectSalesDAO = new DirectSalesDAO();

    public void setSession(IServerSession ss) {
        DirectSalesDAO.setSession(ss);
    }

    public List<MPF190> loadMPS774(MPF190Filter filter) throws SQLException, Exception {
        return DirectSalesDAO.loadMPS774(filter);
    }

    public List<MPF190> loadMPS775(MPF190Filter filter) throws SQLException, Exception {
        return DirectSalesDAO.loadMPS775(filter);
    }

    public List<MPF190ExchangePending> loadMPS776(MPF190Filter filter) throws SQLException, Exception {
        return DirectSalesDAO.loadMPS776(filter);
    }

    public String updateMPS777(MPF190Update bean) throws SQLException, Exception {
        return DirectSalesDAO.updateMPS777(bean);
    }

    public Map<String, Object> executeMPS320() throws SQLException, Exception {
        return DirectSalesDAO.executeMPS320();
    }

    public Map<String, Object> executeMPS782() throws SQLException, Exception {
        return DirectSalesDAO.executeMPS782();
    }

    public String createMPS781(MPF190Create bean) throws SQLException, Exception {
        return DirectSalesDAO.createMPS781(bean);
    }

    public List<MPF300> loadMPS783(MPF190Filter filter) throws SQLException, Exception {
        return DirectSalesDAO.loadMPS783(filter);
    }

}
