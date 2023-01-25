/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.SearchCouponFlightDAO;

/**
 *
 * @author lmendoza
 */
public class SearchCouponFlightLogic {

    private final SearchCouponFlightDAO searchCouponFlightDAO = new SearchCouponFlightDAO();

    public void setSession(IServerSession ss) {
        searchCouponFlightDAO.setSession(ss);

    }

   public List<A1692Filter> loadPX080S01A1692(A1692Filter filter) throws SQLException, Exception {
        return searchCouponFlightDAO.loadPX080S01A1692(filter);
    }

}
