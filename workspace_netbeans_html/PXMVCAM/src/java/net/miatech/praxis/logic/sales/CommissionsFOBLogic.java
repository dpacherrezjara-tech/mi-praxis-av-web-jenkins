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
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CommissionsFOBDAO;

/**
 *
 * @author lmendoza
 */
public class CommissionsFOBLogic {

    private final CommissionsFOBDAO commissionsFOBDAO = new CommissionsFOBDAO();

    public void setSession(IServerSession ss) {
        commissionsFOBDAO.setSession(ss);

    }

    public List<A1880Filter> setPX159S01A1880(A1880Filter filter) throws SQLException, Exception {
        return commissionsFOBDAO.loadPX159S01A1880(filter);
    }

    public List<A1881Filter> setPX159S01A1881(A1881Filter filter) throws SQLException, Exception {
        return commissionsFOBDAO.loadPX159S01A1881(filter);
    }

}
