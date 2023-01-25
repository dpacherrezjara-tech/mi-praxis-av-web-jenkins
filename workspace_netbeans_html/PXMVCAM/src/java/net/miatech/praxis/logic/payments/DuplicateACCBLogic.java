/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.DuplicateACCBDAO;
import net.miatech.praxis.payment.filter.A2271Filter;

/**
 *
 * @author 
 */
public class DuplicateACCBLogic {

    private final DuplicateACCBDAO DuplicateACCBDAO = new DuplicateACCBDAO();

    public void setSession(IServerSession ss) {
        DuplicateACCBDAO.setSession(ss);

    }
   
    public List<A2271Filter> loadPX370SQP01475(A2271Filter filter) throws SQLException, Exception {
        return DuplicateACCBDAO.loadPX370SQP01475(filter);
    }
   
    public List<A2271Filter> loadPX370SQP01527(A2271Filter filter) throws SQLException, Exception {
        return DuplicateACCBDAO.loadPX370SQP01527(filter);
    }

}
