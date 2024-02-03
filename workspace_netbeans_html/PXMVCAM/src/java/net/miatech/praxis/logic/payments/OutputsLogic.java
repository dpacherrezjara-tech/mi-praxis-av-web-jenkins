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
import net.miatech.praxis.dao.payments.OutputsDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author lmendoza
 */
public class OutputsLogic {

    private final OutputsDAO OutputsDAO = new OutputsDAO();

    public void setSession(IServerSession ss) {
        OutputsDAO.setSession(ss);
    }

    public List<A2353Filter> loadPX285SQP05104(A2353Filter filter) throws SQLException, Exception {
        return OutputsDAO.loadPX285SQP05104(filter);
    }
    
    public List<A2353Filter> loadPX285SQP05105(A2353Filter filter) throws SQLException, Exception {
        return OutputsDAO.loadPX285SQP05105(filter);
    }
    
}
