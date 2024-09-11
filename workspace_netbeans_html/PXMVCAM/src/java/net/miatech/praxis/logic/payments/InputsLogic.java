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
import net.miatech.beans.A1686Filter;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.ReasonCodeReportDAO;
import net.miatech.praxis.dao.payments.BanksCatalogDAO;
import net.miatech.praxis.dao.payments.InputsDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.A2359;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;

/**
 *
 * @author lmendoza
 */
public class InputsLogic {

    private final InputsDAO InputsDAO = new InputsDAO();

    public void setSession(IServerSession ss) {
        InputsDAO.setSession(ss);

    }

    public List<A2281> loadPX267SQP00671(A2280Filter filter) throws SQLException, Exception {
        return InputsDAO.loadPX267SQP00671(filter);
    }

   
   public String loadPX267SQP00672(A2281 filter, String option) throws SQLException, Exception {
        return InputsDAO.loadPX267SQP00672(filter, option);
    }
   public A2281 loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {
     return InputsDAO.loadPX267SQP00673(filter);
   }
   
   public List<A1691Filter> loadPX330SQP01039(A1691Filter filter) throws SQLException, Exception {
        return InputsDAO.loadPX330SQP01039(filter);
    }
 
   public int loadPXSQPCLP(A1691Filter filter) throws Exception {
        return InputsDAO.loadPXSQPCLP(filter);
    }
   
   public A1691Filter loadPX265SQP01449(A1691Filter filter) throws Exception {
        return InputsDAO.loadPX265SQP01449(filter);
    }
   
   public String loadPX265SQP01448(A1691Filter filter, String option) throws SQLException, Exception {
        return InputsDAO.loadPX265SQP01448(filter, option);
    }
   
   
   public HashMap loadPX264SQP00664(A1686Filter filter, String consulta) throws SQLException, Exception {
        return InputsDAO.loadPX264SQP00664(filter, consulta);
    }
   
   public List<A1686Filter> loadPX264SQP00665(A1686Filter filter, String consulta) throws SQLException, Exception {
        return InputsDAO.loadPX264SQP00665(filter, consulta);
    }
   
   public List<A1686Filter> loadPX264SQP002464(A1686Filter filter) throws SQLException, Exception {
        return InputsDAO.loadPX264SQP002464(filter);
    }
  
   public List<A1686Filter> loadPX264SQP00667(A1686Filter filter, String consulta) throws Exception {
        return InputsDAO.loadPX264SQP00667(filter, consulta);
    }
   
   public List<A1686Filter> loadPX264SQP00691(A1686Filter filter, String consulta) throws SQLException, Exception {
        return InputsDAO.loadPX264SQP00691(filter, consulta);
    }
   
   public List<A1686Filter> loadPX264SQP02957(A1686Filter filter) throws SQLException, Exception {
        return InputsDAO.loadPX264SQP02957(filter);
   }
   
   public List<A2359> loadPX264SQP02958(A1686Filter filter) throws SQLException, Exception {
        return InputsDAO.loadPX264SQP02958(filter);
   }
   
   public List<A2359> loadPX264SQP02958Det(A1686Filter filter) throws SQLException, Exception {
        return InputsDAO.loadPX264SQP02958Det(filter);
   }
   
   public List<A1686Filter> loadPX264SQP04615Log(A1686Filter filter) throws SQLException, Exception {
        return InputsDAO.loadPX264SQP04615Log(filter);
    }
   
   public List<A1686Filter> loadPX264SQP04615(A1686Filter filter) throws SQLException , Exception{
        return InputsDAO.loadPX264SQP04615(filter);
    }
   
   
}
