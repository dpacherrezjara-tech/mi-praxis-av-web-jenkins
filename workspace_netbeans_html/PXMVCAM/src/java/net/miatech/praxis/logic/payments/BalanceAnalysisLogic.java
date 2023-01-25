/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.dao.payments.BalanceAnalysisDAO;
import net.miatech.praxis.payment.filter.A2365Filter;

/**
 *
 * @author ctarazona
 */
public class BalanceAnalysisLogic {

    private final BalanceAnalysisDAO balanceAnalysisDAO = new BalanceAnalysisDAO();

    public void setSession(net.miatech.beans.spring.implement.IServerSession ss) {
        balanceAnalysisDAO.setSession(ss);
    }

    public List<A2290Filter> loadPX307SQP00936(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP00936(filter);
    }
    public List<A2290Filter> loadPX307SQP00936_1(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP00936_1(filter);
    }

    public List<A2290Filter> loadPX307SQP00936_2(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP00936_2(filter);
    }

    public List<A2290Filter> loadPX307SQP00936_3(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP00936_3(filter);
    }

    public List<A2290Filter> loadPX307SQP01051(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01051(filter);
    }

    public List<A2290Filter> loadPX307SQP01053(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01053(filter);
    }

    public List<A2290Filter> loadPX307SQP00943(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP00943(filter);
    }

    public List<A2290Filter> loadPX307SQP00945(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP00945(filter);
    }

    public List<A2290Filter> loadPX307SQP01002(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01002(filter);
    }

    public List<A2290Filter> loadPX307SQP01052(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01052(filter);
    }

    public List<A2290Filter> loadPX307SQP01054(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01054(filter);
    }

    public List<A2290Filter> loadPX307SQP01055(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01055(filter);
    }

    public List<A2290Filter> loadPX307SQP01154(A2290Filter filter) throws SQLException, Exception {
        //return balanceAnalysisDAO.loadPX307SQP01154(filter, tipo);
        return balanceAnalysisDAO.loadPX307SQP01154(filter);
    }

    public List<A2290Filter> loadPX307SQP01057(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01057(filter);
    }

    public List<A2290Filter> loadPX307SQP01056(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01056(filter);
    }
    
    /*public List<A2290Filter> loadPX307SQP01155(A2290Filter filter, String tipo) throws SQLException, Exception {
     return balanceAnalysisDAO.loadPX307SQP01155(filter, tipo);
     }*/
    public List<A2290Filter> loadPX307SQP01058(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01058(filter);
    }

    public List<A2290Filter> loadPX307SQP01577(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01577(filter);
    }

    public List<A2290Filter> loadPX307_COBOL_TKT(A2290Filter filter, String tipo) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307_COBOL_TKT(filter, tipo);
    }

    public HashMap loadPX307SQP01806(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01806(filter);
    }

    public List<A2365Filter> loadPX307SQP01812(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01812(filter);
    }

    public A2290Filter loadPX307SQP01052_1(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisDAO.loadPX307SQP01052_1(filter);
    }
    
}
