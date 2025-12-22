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
import net.miatech.praxis.dao.payments.BSPFileDownloadDAO;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author lmendoza
 */
public class BSPFileDownloadLogic {

    private final BSPFileDownloadDAO BSPFileDownloadDAO = new BSPFileDownloadDAO();

    public void setSession(IServerSession ss) {
        BSPFileDownloadDAO.setSession(ss);
    }

    public List<MPF218> loadMPS415(MPF218Filter filter) throws SQLException, Exception {
        return BSPFileDownloadDAO.loadMPS415(filter);
    }
    
    public List<MPF221> loadMPS446(MPF221Filter filter) throws SQLException, Exception {
        return BSPFileDownloadDAO.loadMPS446(filter);
    }

}
