/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1693Filter;
import net.miatech.beans.A1744Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.PassengerConciliationDAO;
import net.miatech.praxis.dao.flown.PassengerStatisticsDAO;
import net.miatech.praxis.dao.flown.RevenueZoneDAO;

/**
 *
 * @author lmendoza
 */
public class PassengerStatisticsLogic {

    private final PassengerStatisticsDAO passengerStatisticsDAO = new PassengerStatisticsDAO();

    public void setSession(IServerSession ss) {
        passengerStatisticsDAO.setSession(ss);

    }

    public List<A1693Filter> loadPX035S01A1693(A1693Filter filter) throws SQLException, Exception {
        return passengerStatisticsDAO.loadPX035S01A1693(filter);
    }

    public List<A1691Filter> loadPX095S13A1791(A1693Filter filter, String flag, boolean Excel) throws SQLException, Exception {
        return passengerStatisticsDAO.loadPX095S13A1791(filter, flag, Excel);
    }

    public List<A1691Filter> loadPX095S10A1691(A1693Filter filter, String flag, boolean Excel) throws SQLException, Exception {
        return passengerStatisticsDAO.loadPX095S10A1691(filter, flag, Excel);
    }

}
