/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A003;
import net.miatech.praxis.dao.payments.CargoGuideDAO;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.praxis.payment.MPF295;
import net.miatech.praxis.payment.MPF295Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author lmendoza
 */
public class CargoGuideLogic {

    private final CargoGuideDAO CargoGuideDAO = new CargoGuideDAO();

    public void setSession(IServerSession ss) {
        CargoGuideDAO.setSession(ss);
    }

    public List<MPF295> loadMPS587(MPF295Filter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS587(filter);
    }
    
    public Map<String, Object> updateMPS588(MPF295Filter bean) throws SQLException, Exception {
        return CargoGuideDAO.updateMPS588(bean);
    }
    
}
