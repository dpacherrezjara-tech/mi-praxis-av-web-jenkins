/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.FirstDataDAO;
import net.miatech.praxis.payment.filter.A2338Filter;

/**
 *
 * @author ctarazona
 */
public class FirstDataLogic {

    private final FirstDataDAO FirstDataDAO = new FirstDataDAO();

    public void setSession(IServerSession ss) {
        FirstDataDAO.setSession(ss);
    }

    public List<A2338Filter> loadPX554SQP03911(A2338Filter filter) throws SQLException, Exception {
        return FirstDataDAO.loadPX554SQP03911(filter);
        
    }

    public List<A2338Filter> loadPX554SQP03911_TV(A2338Filter filter) throws SQLException, Exception {
        return FirstDataDAO.loadPX554SQP03911_TV(filter);
    }
    
    public List<A2338Filter> loadPX554SQP03911_TV_2(A2338Filter filter) throws SQLException, Exception {
        return FirstDataDAO.loadPX554SQP03911_TV_2(filter);
        
    }
}
