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
import net.miatech.praxis.dao.payments.CargoStatusDAO;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import java.util.Map;
import net.miatech.praxis.payment.MPF287;
import net.miatech.praxis.payment.MPF287Filter;
import net.miatech.praxis.payment.MPF304;
import net.miatech.praxis.payment.MPF304Filter;
import java.util.List;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author lmendoza
 */
public class CargoStatusLogic {

    private final CargoStatusDAO CargoStatusDAO = new CargoStatusDAO();

    public void setSession(IServerSession ss) {
        CargoStatusDAO.setSession(ss);
    }

    public List<MPF287> loadMPS657(MPF287Filter filter) throws SQLException, Exception {
        return CargoStatusDAO.loadMPS657(filter);
    }

    public List<MPF221> loadMPS446(MPF221Filter filter) throws SQLException, Exception {
        return CargoStatusDAO.loadMPS446(filter);
    }

    public void processFileRecord(String ccust, String dateSett, String fileName, 
                                  String yearFile, String uscr, String fecr, String hocr) throws Exception {

        CargoStatusDAO.insertFileRecord(ccust, dateSett, fileName, yearFile, uscr, fecr, hocr);
    }
    
    public List<MPF304> loadMPS650(MPF304Filter filter) throws Exception {
        return CargoStatusDAO.loadMPS650(filter);
    }

    public List<MPF287> loadMPS658(MPF287Filter filter) throws Exception {
        return CargoStatusDAO.loadMPS658(filter);
    }

    public List<MPF287> loadMPS659(MPF287Filter filter) throws Exception {
        return CargoStatusDAO.loadMPS659(filter);
    }

    public List<Map<String, String>> loadMPS660(MPF287Filter filter) throws Exception {
        return CargoStatusDAO.loadMPS660(filter);
    }

    public List<Map<String, String>> loadMPS661(MPF287Filter filter) throws Exception {
        return CargoStatusDAO.loadMPS661(filter);
    }

    public List<MPF287> loadMPS662(MPF287Filter filter) throws Exception {
        return CargoStatusDAO.loadMPS662(filter);
    }

}
