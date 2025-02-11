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
import net.miatech.praxis.dao.payments.LoadSalesConciliationDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.MPF106Filter;

/**
 *
 * @author anthonyBash
 */
public class LoadSalesConciliationLogic {

    private final LoadSalesConciliationDAO loadSalesConciliationDAO = new LoadSalesConciliationDAO();

    public void setSession(IServerSession ss) {
        loadSalesConciliationDAO.setSession(ss);

    }

    public List<MPF106Filter> loadPX620SQP05106(MPF106Filter filter) throws SQLException, Exception {
        return loadSalesConciliationDAO.loadPX620SQP05106(filter);
    }

    public A2290Filter SQPMPS076_UP(A2290Filter filter, UserView user) throws SQLException, Exception {
        return loadSalesConciliationDAO.SQPMPS076_UP(filter, user);
    }
    
    public A2290Filter SQPMPS076_UP_OPERATIONAL(A2290Filter filter, UserView user) throws SQLException, Exception {
        return loadSalesConciliationDAO.SQPMPS076_UP_OPERATIONAL(filter, user);
    }
    
    public String SQP05099(List<A2290Filter> lstData, UserView user) throws Exception {
        return loadSalesConciliationDAO.SQP05099(lstData,user );
    }
    
    public A2290Filter SQPMPS076(List<A2290Filter> lstData, UserView user) throws Exception {
        return loadSalesConciliationDAO.SQPMPS076(lstData,user );
    }

    public A2290Filter SQPMPF114_PREV(A2290Filter filter, UserView user) throws SQLException, Exception {
        return loadSalesConciliationDAO.SQPMPF114_PREV(filter, user);
    }
    
    public A2290Filter SQP_INSERT_PO_MPF114(List<A2290Filter> lstData, UserView user) throws Exception {
        return loadSalesConciliationDAO.SQP_INSERT_PO_MPF114(lstData,user );
    }
}
