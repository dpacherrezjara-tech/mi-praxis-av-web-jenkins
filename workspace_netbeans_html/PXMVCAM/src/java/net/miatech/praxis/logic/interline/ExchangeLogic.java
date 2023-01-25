/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.interline;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A720Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.ExchangeDAO;

/**
 *
 * @author lmendoza
 */
public class ExchangeLogic {

    private final ExchangeDAO exchangeDAO = new ExchangeDAO();

    public void setSession(IServerSession ss) {
        exchangeDAO.setSession(ss);

    }

    public List<A720Filter> loadPX202S01A730(A720Filter filter) throws SQLException, Exception {
        return exchangeDAO.loadPX202S01A730(filter);
    }
}
