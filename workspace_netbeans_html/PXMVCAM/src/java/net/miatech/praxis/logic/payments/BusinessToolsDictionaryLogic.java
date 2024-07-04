///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.BusinessToolsDictionaryDAO;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author lmendoza
 */
public class BusinessToolsDictionaryLogic {

    private final BusinessToolsDictionaryDAO BusinessToolsDictionaryDAO = new BusinessToolsDictionaryDAO();

    public void setSession(IServerSession ss) {
        BusinessToolsDictionaryDAO.setSession(ss);
    }

    public List<A2353Filter> loadPX643MPS079(A2353Filter filter) throws SQLException, Exception {
        return BusinessToolsDictionaryDAO.loadPX643MPS079(filter);
    }

    public List<A2353Filter> loadPX643MPS079D(A2353Filter filter) throws Exception {
        return BusinessToolsDictionaryDAO.loadPX643MPS079D(filter);
    }

    public String loadPX643MPS079AP(A2353Filter filter, String option) throws Exception {
        return BusinessToolsDictionaryDAO.loadPX643MPS079AP(filter, option);
    }

}
