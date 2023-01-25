/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.RejectionReportDAO;
import net.miatech.praxis.payment.filter.A2288Filter;

/**
 *
 * @author 
 */
public class RejectionReportLogic {

    private final RejectionReportDAO RejectionReportDAO = new RejectionReportDAO();

    public void setSession(IServerSession ss) {
        RejectionReportDAO.setSession(ss);
    }
    
    public List<A2288Filter> loadPX273SQP00737(A2288Filter filter) throws SQLException, Exception {
        return RejectionReportDAO.loadPX273SQP00737(filter);
    }
    
    public List<A2288Filter> loadPX273SQP00758(A2288Filter filter) throws SQLException, Exception {
        return RejectionReportDAO.loadPX273SQP00758(filter);
    }
    

}
