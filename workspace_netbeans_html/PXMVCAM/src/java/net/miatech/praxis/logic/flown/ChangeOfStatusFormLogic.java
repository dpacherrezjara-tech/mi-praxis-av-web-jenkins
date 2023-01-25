/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A3676Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.ChangeOfStatusFormDAO;

/**
 *
 * @author zperez
 */
public class ChangeOfStatusFormLogic {

    private ChangeOfStatusFormDAO objDAO = new ChangeOfStatusFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3676Filter> Search(A3676Filter filter) throws SQLException, Exception {
        return objDAO.Search(filter);
    }

    public List<A3676Filter> SearchControl(A3676Filter filter) throws SQLException, Exception {
        return objDAO.SearchControl(filter);
    }
    public List<A3676Filter> SearchControlEjecu(A3676Filter filter) throws SQLException, Exception {
        return objDAO.SearchControlEjecu(filter);
    }

}
