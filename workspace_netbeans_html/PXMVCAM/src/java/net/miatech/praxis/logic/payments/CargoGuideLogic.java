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
import net.miatech.praxis.payment.MPF291;
import net.miatech.praxis.payment.MPF291Filter;
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

    public List<MPF291> loadMPS600(MPF291Filter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS600(filter);
    }

    public List<MPF291> loadMPS602(MPF291Filter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS602(filter);
    }

    public Map<String, Object> updateMPS601(MPF291Filter bean) throws SQLException, Exception {
        return CargoGuideDAO.updateMPS601(bean);
    }

    public List<Map<String, Object>> loadMPS603(String country, String sfile) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS603(country, sfile);
    }

    public Map<String, Object> runMPS556() throws Exception {
        return CargoGuideDAO.runMPS556();
    }

    public Map<String, Object> runMPS557() throws Exception {
        return CargoGuideDAO.runMPS557();
    }

}
