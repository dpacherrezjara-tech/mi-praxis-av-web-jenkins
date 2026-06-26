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
import net.miatech.praxis.dao.payments.CargoSendDAO;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.praxis.payment.MPF304;
import net.miatech.praxis.payment.MPF304Filter;
import net.miatech.praxis.payment.MPF305;
import net.miatech.praxis.payment.MPF305Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author lmendoza
 */
public class CargoSendLogic {

    private final CargoSendDAO CargoSendDAO = new CargoSendDAO();

    public void setSession(IServerSession ss) {
        CargoSendDAO.setSession(ss);
    }

    public List<MPF218> loadMPS415(MPF218Filter filter) throws SQLException, Exception {
        return CargoSendDAO.loadMPS415(filter);
    }

    public List<MPF221> loadMPS446(MPF221Filter filter) throws SQLException, Exception {
        return CargoSendDAO.loadMPS446(filter);
    }

    public void processFileRecord(String ccust, String dateSett, String fileName, 
                                  String yearFile, String uscr, String fecr, String hocr) throws Exception {

        CargoSendDAO.insertFileRecord(ccust, dateSett, fileName, yearFile, uscr, fecr, hocr);
    }
    
    public List<MPF304> loadMPS650(MPF304Filter filter) throws Exception {
        return CargoSendDAO.loadMPS650(filter);
    }

    public List<MPF305> loadMPS715(MPF305Filter filter) throws Exception {
        return CargoSendDAO.loadMPS715(filter);
    }

    public Map<String, Object> executeMPS718(String srepid, String stval) throws Exception {
        return CargoSendDAO.executeMPS718(srepid, stval);
    }

    public Map<String, Object> executeMPS719(String dateFrom, String dateTo) throws Exception {
        return CargoSendDAO.executeMPS719(dateFrom, dateTo);
    }

    public List<Map<String, String>> loadMPS750(String srepid) throws Exception {
        return CargoSendDAO.loadMPS750(srepid);
    }

}
