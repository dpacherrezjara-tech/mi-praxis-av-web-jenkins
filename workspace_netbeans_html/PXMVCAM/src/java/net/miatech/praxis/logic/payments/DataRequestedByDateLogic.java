/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.DataRequestedByDateDAO;
import net.miatech.praxis.payment.ExcelChargeBack;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.praxis.payment.filter.A2345Filter;
import net.miatech.beans.A3676Filter;

public class DataRequestedByDateLogic {

    private final DataRequestedByDateDAO DataRequestedByDateDAO = new DataRequestedByDateDAO();

    public void setSession(IServerSession ss) {
        DataRequestedByDateDAO.setSession(ss);
    }
    
    public List<A2331Filter> loadPX573SQP04266(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByDateDAO.loadPX573SQP04266(filter);
    } 
    
    public List<A3676Filter> loadPX573SQP04276(A3676Filter filter) throws SQLException, Exception {
        return DataRequestedByDateDAO.loadPX573SQP04276(filter);
    }        
}
