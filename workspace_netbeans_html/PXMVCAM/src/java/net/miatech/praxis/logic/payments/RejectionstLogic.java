/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import net.miatech.praxis.logic.interline.*;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.ReasonCodeReportDAO;
import net.miatech.praxis.dao.payments.RejectionsDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.payment.filter.A2287Filter;

/**
 *
 * @author lmendoza
 */
public class RejectionstLogic {

    private final RejectionsDAO rejectionsDAO = new RejectionsDAO();

    public void setSession(IServerSession ss) {
        rejectionsDAO.setSession(ss);

    }

    public List<A2287Filter> loadPX272SQP00733(A2287Filter filter) throws SQLException, Exception {
        return rejectionsDAO.loadPX272SQP00733(filter);
    }

    public A2287Filter loadPX272SQP00735(A2287Filter filter) throws SQLException, Exception {
        return rejectionsDAO.loadPX272SQP00735(filter);
    }  

    public String loadPX272SQP00734(A2287Filter filter, String option) throws SQLException, Exception {
        return rejectionsDAO.loadPX272SQP00734(filter, option);
    }
   
}
