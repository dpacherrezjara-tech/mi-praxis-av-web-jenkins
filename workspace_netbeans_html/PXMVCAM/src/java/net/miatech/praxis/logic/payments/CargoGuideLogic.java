/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A003;
import net.miatech.praxis.dao.payments.CargoGuideDAO;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.praxis.payment.MPF287Mov;
import net.miatech.praxis.payment.MPF287MovFilter;
import net.miatech.praxis.payment.MPF288;
import net.miatech.praxis.payment.MPF288Filter;
import net.miatech.praxis.payment.MPF291;
import net.miatech.praxis.payment.MPF291Filter;
import net.miatech.praxis.payment.MPF295ReconcilePayload;
import net.miatech.praxis.payment.MPF292;
import net.miatech.praxis.payment.MPF292Filter;
import net.miatech.praxis.payment.MPF293;
import net.miatech.praxis.payment.MPF293Filter;
import net.miatech.praxis.payment.MPF294;
import net.miatech.praxis.payment.MPF294Filter;
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

    public List<MPF291> loadMPS573(MPF291Filter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS573(filter);
    }

    public List<MPF291> loadMPS609(MPF291Filter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS609(filter);
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

    public List<MPF287Mov> loadMPS734(MPF287MovFilter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS734(filter);
    }

    public Map<String, Object> updateMPS735(MPF295ReconcilePayload bean) throws SQLException, Exception {
        return CargoGuideDAO.updateMPS735(bean);
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

    public Map<String, Object> runConciliacionHN(String baseUrl, String fecr) throws Exception {
        return CargoGuideDAO.runConciliacionHN(baseUrl, fecr);
    }

    public Map<String, Object> runConciliacionSV(String baseUrl, String fecr) throws Exception {
        return CargoGuideDAO.runConciliacionSV(baseUrl, fecr);
    }
    
    public List<MPF295> loadMPS603(MPF295Filter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS603(filter);
    }

    public Map<String, Object> deleteMPS604(MPF295Filter filter) throws Exception {
        return CargoGuideDAO.deleteMPS604(filter);
    }
    
    public List<MPF292> loadMPS605(MPF292Filter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS605(filter);
    }
    
    public List<MPF294> loadMPS606(MPF294Filter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS606(filter);
    }
    
    public List<MPF288> loadMPS607(MPF288Filter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS607(filter);
    }
    
    public List<MPF293> loadMPS608(MPF293Filter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS608(filter);
    }

    public List<Map<String, Object>> loadMPS751(MPF295Filter filter) throws SQLException, Exception {
        return CargoGuideDAO.loadMPS751(filter);
    }

    public List<MPF295> loadMPS717(String srepid) throws Exception {
        return CargoGuideDAO.loadMPS717(srepid);
    }

    public Map<String, Object> executeMPS716(String dateFrom, String dateTo, String country) throws Exception {
        return CargoGuideDAO.executeMPS716(dateFrom, dateTo, country);
    }

}
