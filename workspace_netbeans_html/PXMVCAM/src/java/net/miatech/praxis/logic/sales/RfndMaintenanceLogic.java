/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.S0001A713Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.RfndMaintenanceDAO;

/**
 *
 * @author jmeiggs
 */
public class RfndMaintenanceLogic {

    private final RfndMaintenanceDAO rfndMaintenanceDAO = new RfndMaintenanceDAO();

    public void setSession(IServerSession ss) {
        rfndMaintenanceDAO.setSession(ss);
    }
    public S0001A713Filter updateItinerary(S0001A713Filter filter) throws SQLException, Exception {
        return rfndMaintenanceDAO.updateItinerary(filter);
    }
    public S0001A713Filter deleteTKT(S0001A713Filter filter) throws SQLException, Exception {
        return rfndMaintenanceDAO.deleteTKT(filter);
    }
    public String maintenanceRfnd(S0001A713Filter filter,String ListCupones,String ListCuponesEmd) throws SQLException, Exception {
        return rfndMaintenanceDAO.maintenanceRfnd(filter,ListCupones,ListCuponesEmd);
    }
}
