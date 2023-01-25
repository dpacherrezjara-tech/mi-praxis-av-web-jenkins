/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1878Filter;
import net.miatech.beans.A1879Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CommissionsGlDAO;

/**
 *
 * @author lmendoza
 */
public class CommissionsGlLogic {

    private final CommissionsGlDAO commissionsGlDAO = new CommissionsGlDAO();

    public void setSession(IServerSession ss) {
        commissionsGlDAO.setSession(ss);

    }

    public List<A1879Filter> setPX153S01A1879(A1879Filter filter) throws SQLException, Exception {
        return commissionsGlDAO.loadPX153S01A1879(filter);
    }

    public List<A1879Filter> setPX153S02A1717(A1879Filter filter) throws SQLException, Exception {
        return commissionsGlDAO.loadPX153S02A1879(filter);
    }

    public List<A1878Filter> setPX153S01A1878(A1878Filter filter) throws SQLException, Exception {
        return commissionsGlDAO.loadPX153S01A1878(filter);
    }
}
