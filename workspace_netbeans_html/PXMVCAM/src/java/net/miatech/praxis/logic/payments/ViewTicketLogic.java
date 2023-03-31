/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1880Filter;
import net.miatech.beans.A1881Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CommissionsFOBDAO;
import net.miatech.praxis.dao.payments.ViewTicketDAO;

/**
 *
 * @author lmendoza
 */
public class ViewTicketLogic {

    private final ViewTicketDAO viewTicketDAO = new ViewTicketDAO();

    public void setSession(IServerSession ss) {
        viewTicketDAO.setSession(ss);

    }

    public List<A2290Filter> load(A2290Filter filter) throws SQLException, Exception {
        return viewTicketDAO.load(filter);
    }

}
