/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.MinimunRuleDAO;

/**
 *
 * @author lmendoza
 */
public class MinimunRuleLogic {

    private final MinimunRuleDAO minimunRuleDAO = new MinimunRuleDAO();

    public void setSession(IServerSession ss) {
        minimunRuleDAO.setSession(ss);

    }

    public List<PX019S01A025Filter> loadPX019S01A025(PX019S01A025Filter filter) throws SQLException, Exception {
        return minimunRuleDAO.loadPX019S01A025(filter);
    }

}
