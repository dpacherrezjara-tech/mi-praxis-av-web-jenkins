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
import net.miatech.praxis.dao.payments.InputsDesignDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author jsolano
 */
public class InputsDesignLogic {

    private final InputsDesignDAO InputsDesignDAO = new InputsDesignDAO();

    public void setSession(IServerSession ss) {
        InputsDesignDAO.setSession(ss);

    }

    public List<A2353Filter> loadPX285SQPMULTISEARCH(A2353Filter filter) throws SQLException, Exception {
        return InputsDesignDAO.loadPX285SQPMULTISEARCH(filter);
    }
    
    public String loadPX285SQPMULTIUPDATE(A2353Filter filter) throws SQLException, Exception {
        return InputsDesignDAO.loadPX285SQPMULTIUPDATE(filter);
    }
    
    public A2353Filter loadPX285SQPMULTIENTRY(A2353Filter filter) throws Exception {
        return InputsDesignDAO.loadPX285SQPMULTIENTRY(filter);
    }

}
