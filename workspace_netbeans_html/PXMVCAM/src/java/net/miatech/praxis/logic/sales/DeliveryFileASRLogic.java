/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX019S01A1536Filter;
import net.miatech.beans.ReportEmdDetailsA1530Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.DeliveryFileASRDAO;

/**
 *
 * @author lmendoza
 */
public class DeliveryFileASRLogic {

    private final DeliveryFileASRDAO deliveryASRDAO = new DeliveryFileASRDAO();

    public void setSession(IServerSession ss) {
        deliveryASRDAO.setSession(ss);

    }
    
    public List<PX019S01A1536Filter> loadPX019S01A1536(PX019S01A1536Filter filter) throws SQLException, Exception {
        return deliveryASRDAO.loadPX019S01A1536(filter);
    }

}
