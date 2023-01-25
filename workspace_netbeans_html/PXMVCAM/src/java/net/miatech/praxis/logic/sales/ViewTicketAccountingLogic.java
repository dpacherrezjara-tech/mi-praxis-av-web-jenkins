/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1880Filter;
import net.miatech.beans.A1881Filter;
import net.miatech.beans.PX0241S01A720Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CommissionsFOBDAO;
import net.miatech.praxis.dao.sales.ViewTicketAccountingDAO;

/**
 *
 * @author lmendoza
 */
public class ViewTicketAccountingLogic {

    private final ViewTicketAccountingDAO viewTicketAccountingDAO = new ViewTicketAccountingDAO();

    public void setSession(IServerSession ss) {
        viewTicketAccountingDAO.setSession(ss);

    }

    public List<PX0241S01A720Filter> load(PX0241S01A720Filter filter) throws SQLException, Exception {
        return viewTicketAccountingDAO.load(filter);
    }

}
