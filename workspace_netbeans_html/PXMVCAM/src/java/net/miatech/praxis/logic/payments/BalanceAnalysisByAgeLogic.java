/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.BalanceAnalysisByAgeDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.praxis.payment.filter.A2356Filter;

/**
 *
 * @author lmendoza
 */
public class BalanceAnalysisByAgeLogic {

    private final BalanceAnalysisByAgeDAO balanceAnalysisByAge = new BalanceAnalysisByAgeDAO();

    public void setSession(IServerSession ss) {
        balanceAnalysisByAge.setSession(ss);

    }

    public List<A2356Filter> loadSQP05120(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120(filter);
    }

    public List<A2356Filter> loadSQP05120_ST(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_ST(filter);
    }

    public List<A2356Filter> loadSQP05120_ST_BARD(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_ST_BARD(filter);
    }

    public List<A2356Filter> loadSQP05120_CT(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_CT(filter);
    }
    
    public List<A2356Filter> loadSQP05120_CT2(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_CT2(filter);
    }
    
    public List<A2356Filter> loadSQP05120_RD(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_RD(filter);
    }

    public List<A2356Filter> loadSQP05120_RD2(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_RD2(filter);
    }

    public List<A2356Filter> loadSQP05120_RM(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_RM(filter);
    }

    public List<A2356Filter> loadSQP05120_RM2(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_RM2(filter);
    }

    public List<A2356Filter> loadSQP05120_RC(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_RC(filter);
    }

    public List<A2356Filter> loadSQP05120_RC2(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_RC2(filter);
    }

    public List<A2356Filter> loadSQP05120_RP(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_RP(filter);
    }

    public List<A2356Filter> loadSQP05120_RP2(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_RP2(filter);
    }

    public List<A2356Filter> loadSQP05120_RS(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_RS(filter);
    }

    public List<A2356Filter> loadSQP05120_RS2(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_RS2(filter);
    }

    public A2356Filter loadSQP05120_AD() throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP05120_AD();
    }

    public A2356Filter loadSQP02856(A2356Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP02856(filter);
    }

    public String loadSQP02857(A2356Filter filter, String option) throws SQLException, Exception {
        return balanceAnalysisByAge.loadSQP02857(filter, option);
    }

    public List<A2290Filter> loadPX269SQP05103_DEBITYPE(A2290Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadPX269SQP05103_DEBITYPE(filter);
    }

    public List<A2331Filter> loadPX419SQP03203(A2331Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadPX419SQP03203(filter);
    }

    public List<A2331Filter> loadPX419SQP02079(A2331Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadPX419SQP02079(filter);
    }

    public List<A2331Filter> loadPX419SQP02104(A2331Filter filter) throws SQLException, Exception {
        return balanceAnalysisByAge.loadPX419SQP02104(filter);
    }
}
