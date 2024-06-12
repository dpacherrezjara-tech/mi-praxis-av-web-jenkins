/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.LoadExchangeRateDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.MPF106Filter;

/**
 *
 * @author anthonyBash
 */
public class LoadExchangeRateLogic {

    private final LoadExchangeRateDAO loadExchangeRateDAO = new LoadExchangeRateDAO();

    public void setSession(IServerSession ss) {
        loadExchangeRateDAO.setSession(ss);

    }

    public List<MPF106Filter> loadPX620SQP05106(MPF106Filter filter) throws SQLException, Exception {
        return loadExchangeRateDAO.loadPX620SQP05106(filter);
    }

    public String loadPX620SQP05108(MPF106Filter filter, String option) throws SQLException, Exception {
        return loadExchangeRateDAO.loadPX620SQP05108(filter, option);
    }

    public A2290Filter loadPX620SQP05107(A2290Filter filter) throws SQLException, Exception {
        return loadExchangeRateDAO.loadPX620SQP05107(filter);
    }
    
    public String SQP05099(List<A2290Filter> lstData, UserView user) throws Exception {
        return loadExchangeRateDAO.SQP05099(lstData,user );
    }
    
    public String SQPMPS033(List<A2290Filter> lstData, UserView user) throws Exception {
        return loadExchangeRateDAO.SQPMPS033(lstData,user );
    }

}
