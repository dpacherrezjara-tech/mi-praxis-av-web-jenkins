/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX019S01A1347Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.DeliveryFileARCDAO;

/**
 *
 * @author lmendoza
 */
public class DeliveryFileARCLogic {

    private final DeliveryFileARCDAO deliveryFileARCDAO = new DeliveryFileARCDAO();

    public void setSession(IServerSession ss) {
        deliveryFileARCDAO.setSession(ss);

    }

    public List<PX019S01A1347Filter> loadPX019S01A1347(PX019S01A1347Filter filter) throws SQLException, Exception {
        return deliveryFileARCDAO.loadPX019S01A1347(filter);
    }

}
