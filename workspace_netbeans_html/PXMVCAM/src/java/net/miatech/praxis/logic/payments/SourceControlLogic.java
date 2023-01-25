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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.ReasonCodeReportDAO;
import net.miatech.praxis.dao.payments.BanksCatalogDAO;
import net.miatech.praxis.dao.payments.SourceControlDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;

/**
 *
 * @author lmendoza
 */
public class SourceControlLogic {

    private final SourceControlDAO SourceControlDAO = new SourceControlDAO();

    public void setSession(IServerSession ss) {
        SourceControlDAO.setSession(ss);

    }

    public List<A2280Filter> loadPX267SQP00671(A2280Filter filter) throws SQLException, Exception {
        return SourceControlDAO.loadPX267SQP00671(filter);
    }

   
   public String loadPX267SQP00672(A2280Filter filter, String option) throws SQLException, Exception {
        return SourceControlDAO.loadPX267SQP00672(filter, option);
    }
   public A2280Filter loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {
     return SourceControlDAO.loadPX267SQP00673(filter);
   }
   
   public List<A1691Filter> loadPX330SQP01039(A1691Filter filter) throws SQLException, Exception {
        return SourceControlDAO.loadPX330SQP01039(filter);
    }
 
   public int loadPXSQPCLP(A1691Filter filter) throws Exception {
        return SourceControlDAO.loadPXSQPCLP(filter);
    }
   
   public A1691Filter loadPX265SQP01449(A1691Filter filter) throws Exception {
        return SourceControlDAO.loadPX265SQP01449(filter);
    }
   
   public String loadPX265SQP01448(A1691Filter filter, String option) throws SQLException, Exception {
        return SourceControlDAO.loadPX265SQP01448(filter, option);
    }

}
