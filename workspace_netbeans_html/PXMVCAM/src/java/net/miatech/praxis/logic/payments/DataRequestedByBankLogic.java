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
import net.miatech.praxis.dao.payments.DataRequestedByBankDAO;
import net.miatech.praxis.payment.ExcelChargeBack;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.praxis.payment.filter.A2345Filter;

public class DataRequestedByBankLogic {

    private final DataRequestedByBankDAO DataRequestedByBankDAO = new DataRequestedByBankDAO();

    public void setSession(IServerSession ss) {
        DataRequestedByBankDAO.setSession(ss);
    }
    
    public List<A2331Filter> loadPX404SQP01885(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01885(filter);
    }
    
    public List<A2331Filter> loadPX404SQP01895(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01895(filter);
    }

    public List<A2331Filter> loadPX404SQP01884(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01884(filter);
    }

    public List<A2331Filter> loadPX404SQP01947(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01947(filter);
    }

    public List<A2331Filter> loadPX404SQP01916(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01916(filter);
    }

    public List<A2331Filter> loadPX404SQP01896(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01896(filter);
    }
    
    public List<A2331Filter> loadPX404SQP03286(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP03286(filter);
    }
    
    public List<A2331Filter> loadPX404SQP01949(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01949(filter);
    }
    
    public List<A2331Filter> loadPX404SQP01948(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01948(filter);
    }
    
    public List<A2331Filter> loadPX404SQP03648(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP03648(filter);
    }
    
    public HashMap loadPX404SQP01917(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01917(filter);
    }
    
    public String loadPX404SQP01900(A2331Filter filter, String option) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01900(filter, option);
    }
    
    public List<A2331Filter> loadPX404SQP01899(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01899(filter);
    }
    
    public A2331Filter loadPX404SQP01945(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01945(filter);
    }

    public A2331Filter loadPX404SQP01979(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01979(filter);
    }
    
    public A2331Filter loadPX405SQP01958(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX405SQP01958(filter);
    }
    
    public List<A2331Filter> loadPX404SQP02000(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP02000(filter);
    }
    
    public List<A2331Filter> loadPX404SQP03306(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP03306(filter);
    }
    
    public String loadPX404SQP01946(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP01946(filter);
    }
    
    public String loadPX404SQP02078(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP02078(filter);
    }
    
    public List<ExcelChargeBack> loadPX404SQP03580(A2331Filter filter,String TRFND) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP03580(filter,TRFND);
    }
    
    public List<A2331Filter> loadPX404SQP02680(A2331Filter filter) throws SQLException, Exception {
        return DataRequestedByBankDAO.loadPX404SQP02680(filter);
    }
    
}
