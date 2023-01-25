/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import net.miatech.praxis.logic.payments.*;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.FlownInterlineDAO;
import net.miatech.praxis.flown.filter.A729Filter;
import net.miatech.praxis.payment.filter.A2280Filter;

/**
 *
 * @author jsolano
 */
public class FlownInterlineLogic {

    private final FlownInterlineDAO banksCatalogDAO = new FlownInterlineDAO();

    public void setSession(IServerSession ss) {
        banksCatalogDAO.setSession(ss);

    }

    public List<A729Filter> loadPX613SQP04692(A729Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX613SQP04692(filter);
    }

//    public String loadPX267SQP00672(A729Filter filter, String option) throws SQLException, Exception {
//        return banksCatalogDAO.loadPX267SQP00672(filter, option);
//    }
//
//    public A729Filter loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {
//        return banksCatalogDAO.loadPX267SQP00673(filter);
//    }

}
