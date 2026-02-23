/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A003;
import net.miatech.praxis.dao.payments.ControlReportDAO;
import net.miatech.praxis.payment.A4169;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF102;
import net.miatech.praxis.payment.MPF102Filter;
import net.miatech.praxis.payment.MPF102RP;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author lmendoza
 */
public class ControlReportLogic {

    private final ControlReportDAO ControlReportDAO = new ControlReportDAO();

    public void setSession(IServerSession ss) {
        ControlReportDAO.setSession(ss);
    }
    
    public List<A4169> loadMPS449(MPF102Filter filter) throws SQLException, Exception {
        return ControlReportDAO.loadMPS449(filter);
    }
    
    public List<MPF102RP> loadMPS390(MPF102Filter filter) throws SQLException, Exception {
        return ControlReportDAO.loadMPS390(filter);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    public List<MPF218> loadMPS415(MPF218Filter filter) throws SQLException, Exception {
        return ControlReportDAO.loadMPS415(filter);
    }
    
    public List<MPF221> loadMPS446(MPF221Filter filter) throws SQLException, Exception {
        return ControlReportDAO.loadMPS446(filter);
    }

}
