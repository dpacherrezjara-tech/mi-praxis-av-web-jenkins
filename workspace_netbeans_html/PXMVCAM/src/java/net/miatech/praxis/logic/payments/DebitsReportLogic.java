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
import net.miatech.praxis.dao.payments.DebitsReportDAO;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF060D;
import net.miatech.praxis.payment.MPF060DFilter;
import net.miatech.praxis.payment.MPF075;
import net.miatech.praxis.payment.MPF075Filter;
import net.miatech.praxis.payment.MPF076;
import net.miatech.praxis.payment.MPF076Filter;
import net.miatech.praxis.payment.MPF077;
import net.miatech.praxis.payment.MPF077Filter;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.praxis.payment.MPF303Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author lmendoza
 */
public class DebitsReportLogic {

    private final DebitsReportDAO DebitsReportDAO = new DebitsReportDAO();

    public void setSession(IServerSession ss) {
        DebitsReportDAO.setSession(ss);
    }

    public List<MPF218> loadMPS415(MPF218Filter filter) throws SQLException, Exception {
        return DebitsReportDAO.loadMPS415(filter);
    }
    
    public List<MPF221> loadMPS446(MPF221Filter filter) throws SQLException, Exception {
        return DebitsReportDAO.loadMPS446(filter);
    }
    
    public List<MPF076> loadMPS640(MPF076Filter filter) throws SQLException, Exception {
        return DebitsReportDAO.loadMPS640(filter);
    }
    
     public List<MPF075> loadMPS641(MPF075Filter filter) throws SQLException, Exception {
        return DebitsReportDAO.loadMPS641(filter);
    }
     
     public List<MPF077> loadMPS642(MPF077Filter filter) throws SQLException, Exception {
        return DebitsReportDAO.loadMPS642(filter);
    }

     public List<MPF060D> loadMPS644(MPF060DFilter filter) throws SQLException, Exception {
        return DebitsReportDAO.loadMPS644(filter);
    }
     
     public Map<String, String> manageComment(MPF303Filter filter) throws SQLException, Exception {
        return DebitsReportDAO.manageComment(filter);
    }
     
     public Map<String, String> assignComment(MPF303Filter filter, String userSession) throws SQLException, Exception {
        return DebitsReportDAO.assignComment(filter);
    }
}
