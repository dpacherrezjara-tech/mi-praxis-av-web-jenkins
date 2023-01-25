/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX150S01A730Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.TicketsExchangeOALDAO;

/**
 *
 * @author lmendoza
 */
public class TicketsExchangeOALLogic {

    private final TicketsExchangeOALDAO ticketsExchangeOALDAO = new TicketsExchangeOALDAO();

    public void setSession(IServerSession ss) {
        ticketsExchangeOALDAO.setSession(ss);

    }

    public List<PX150S01A730Filter> loadPX150S01A730(PX150S01A730Filter filter) throws SQLException, Exception {
        return ticketsExchangeOALDAO.loadPX150S01A730(filter);
    }

}
