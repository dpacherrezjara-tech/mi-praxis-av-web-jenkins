/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.program;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.IMF145Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.program.ProPaymentsControlDAO;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.praxis.payment.filter.A3020Filter;

/**
 *
 * @author ggutierrez
 */
public class ProPaymentsControlLogic {
    
    private final ProPaymentsControlDAO ProPaymentsControlDAO = new ProPaymentsControlDAO();

    public void setSession(IServerSession ss) {
        ProPaymentsControlDAO.setSession(ss);
    }

    public List<A3020Filter> loadPX418SQP02084(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02084(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02085(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02085(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02086(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02086(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02087(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02087(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02240(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02240(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02146(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02146(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02147(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02147(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02148(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02148(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02215(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02215(filter);
    }
    
    public List<A3020Filter> loadPX109SQP02245(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX109SQP02245(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02349(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02349(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02315(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02315(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02323(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02323(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02324(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02324(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02325(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02325(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02326(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02326(filter);
    }
    
    public List<A3020Filter> loadPX418SQP02327(A3020Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX418SQP02327(filter);
    }
    
    public List<A2331Filter> loadPX419SQP03203(A2331Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX419SQP03203(filter);
    }
    
    public List<A2331Filter> loadPX419SQP02079(A2331Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX419SQP02079(filter);
    }
    
    public List<A2331Filter> loadPX419SQP02104(A2331Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadPX419SQP02104(filter);
    }
    
    
    
    
    // -------------------------------------------------------------------------------------------
    
    public List<IMF145Filter> loadSQP04546(IMF145Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadSQP04546(filter);
    }
    
    public List<IMF145Filter> loadSQP04541(IMF145Filter filter) throws SQLException, Exception {
        return ProPaymentsControlDAO.loadSQP04541(filter);
    }
}
