/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.dao.payments.ManualConciliationDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.spring.INF020;

/**
 *
 * @author jsolano
 */
public class ManualConciliationLogic {

    private final ManualConciliationDAO manualConciliationDAO = new ManualConciliationDAO();

    public void setSession(IServerSession ss) {
        manualConciliationDAO.setSession(ss);
    }

    public A2290Filter loadPX269SQPXXX(A2290Filter filter) throws SQLException, Exception {
        return manualConciliationDAO.loadPX269SQPXXX(filter);
    }
    
    public String loadPX269SQP00834GRILL(List<A2290Filter> filters, UserView user, String beanIntercompany) throws SQLException, Exception {
        return manualConciliationDAO.loadPX269SQP00834GRILL(filters, user,beanIntercompany);
    }
    
    public String loadPX269SQP00834ALL(A2290Filter filters, UserView user, String beanIntercompany) throws SQLException, Exception {
        return manualConciliationDAO.loadPX269SQP00834ALL(filters, user, beanIntercompany);
    }
    
    public String loadPX269SQP00834(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return manualConciliationDAO.loadPX269SQP00834(filters, user);
    }
    
    public List<A2290Filter> loadPX269SQP00833_MDP_SCAN(A2290Filter filter) throws SQLException, Exception {
        return manualConciliationDAO.loadPX269SQP00833_MDP_SCAN(filter);
    }

    public List<A2290Filter> loadPX269SQP00833_MDP_SCAN_PENDING(A2290Filter filter) throws SQLException, Exception {
        return manualConciliationDAO.loadPX269SQP00833_MDP_SCAN_PENDING(filter);
    }

    public List<A2290Filter> loadRules() throws Exception {
        return manualConciliationDAO.loadRules();
    }
    
    public List<A2290Filter> loadPX269SQP00871JS(A2290Filter filter) throws SQLException, Exception {
        return manualConciliationDAO.loadPX269SQP00871JS(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00871JS_LIQ(A2290Filter filter) throws SQLException, Exception {
        return manualConciliationDAO.loadPX269SQP00871JS_LIQ(filter);
    }

    public List<A1248> loadSQP03739(String tabla) throws Exception {
        return manualConciliationDAO.loadSQP03739(tabla);
    }

    public List<A1248> loadOperadores() throws Exception {
        return manualConciliationDAO.loadOperadores();
    }

    public INF020 loadUserInfo() throws Exception {
        return manualConciliationDAO.loadUserInfo();
    }
    
    public A2290Filter loadPX285SQP00829Search(A2290Filter filter) throws Exception {
        return manualConciliationDAO.loadPX285SQP00829Search(filter);
    }
    
    public String loadPX285SQP00829Update(A2290Filter filter, String option) throws SQLException, Exception {
        return manualConciliationDAO.loadPX285SQP00829Update(filter, option);
    }
}
