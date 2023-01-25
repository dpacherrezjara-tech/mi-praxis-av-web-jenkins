/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A2865Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.LogCouponsUpdateDAO;

/**
 *
 * @author lmendoza
 */
public class LogCouponsUpdateLogic {

    private final LogCouponsUpdateDAO logCouponsUpdateDAO = new LogCouponsUpdateDAO();

    public void setSession(IServerSession ss) {
        logCouponsUpdateDAO.setSession(ss);

    }

    public List<A2865Filter> SQP01298(A2865Filter filter) throws SQLException, Exception {
        return logCouponsUpdateDAO.SQP01369(filter);
    }
}
