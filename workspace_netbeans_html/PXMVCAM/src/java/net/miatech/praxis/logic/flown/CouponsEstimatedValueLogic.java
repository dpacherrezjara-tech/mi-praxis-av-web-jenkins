/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.CouponsEstimatedValueDAO;
import net.miatech.praxis.dao.flown.PassengerConciliationDAO;

/**
 *
 * @author lmendoza
 */
public class CouponsEstimatedValueLogic {

    private final CouponsEstimatedValueDAO couponsEstimatedValueDAO = new CouponsEstimatedValueDAO();

    public void setSession(IServerSession ss) {
        couponsEstimatedValueDAO.setSession(ss);

    }

    public List<A1692Filter> loadPX098SQP0007(A1692Filter filter) throws SQLException, Exception {
        return couponsEstimatedValueDAO.loadPX098SQP0007(filter);
    }

}
