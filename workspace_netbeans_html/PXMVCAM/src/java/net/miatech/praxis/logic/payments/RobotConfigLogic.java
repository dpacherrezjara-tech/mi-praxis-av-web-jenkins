/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A003;
import net.miatech.praxis.dao.payments.RobotConfigDAO;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.praxis.payment.filter.MPFRBTHFilter;
import net.miatech.praxis.payment.filter.MPFRBTDFilter;

/**
 *
 * @author lmendoza
 */
public class RobotConfigLogic {

    private final RobotConfigDAO RobotConfigDAO = new RobotConfigDAO();

    public void setSession(IServerSession ss) {
        RobotConfigDAO.setSession(ss);
    }
    
    public List<MPFRBTHFilter> loadPX622RBTAV_1(MPFRBTHFilter filter) throws SQLException, Exception {
        return RobotConfigDAO.loadPX622RBTAV_1(filter);
    }
        
    public List<MPFRBTDFilter> loadPX622RBTAV_2(MPFRBTDFilter filter) throws SQLException, Exception {
        return RobotConfigDAO.loadPX622RBTAV_2(filter);
    }    
    
    public MPFRBTHFilter loadPX622RBTAV_3(MPFRBTHFilter filter) throws SQLException, Exception {
        return RobotConfigDAO.loadPX622RBTAV_3(filter);
    }
    
    public MPFRBTDFilter loadPX622RBTAV_4(MPFRBTDFilter filter) throws SQLException, Exception {
        return RobotConfigDAO.loadPX622RBTAV_4(filter);
    } 
    
    public String loadPX622RBTAV_5(MPFRBTHFilter filter, String option) throws SQLException, Exception {
        return RobotConfigDAO.loadPX622RBTAV_5(filter, option);
    }
    
    public String loadPX622RBTAV_6(MPFRBTDFilter filter, String option) throws SQLException, Exception {
        return RobotConfigDAO.loadPX622RBTAV_6(filter, option);
    }
    
}
