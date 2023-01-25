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
import net.miatech.beans.A1744Filter;
import net.miatech.beans.A1745Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.PassengerConciliationDAO;
import net.miatech.praxis.dao.flown.RevenueFlightDAO;
import net.miatech.praxis.dao.flown.RevenueZoneDAO;

/**
 *
 * @author lmendoza
 */
public class RevenueFlightLogic {

    private final RevenueFlightDAO revenueFlightDAO = new RevenueFlightDAO();

    public void setSession(IServerSession ss) {
        revenueFlightDAO.setSession(ss);

    }

    public List<A1745Filter> loadPX078S01A1745(A1745Filter filter, String tipo) throws SQLException, Exception {
        return revenueFlightDAO.loadPX078S01A1745(filter, tipo);
    }

    public List<A1745Filter> loadPX078S02A1745(A1745Filter filter, String tipo) throws SQLException, Exception {
        return revenueFlightDAO.loadPX078S02A1745(filter, tipo);
    }

    public List<A1745Filter> loadPX078S03A1745(A1745Filter filter, String tipo) throws SQLException, Exception {
        return revenueFlightDAO.loadPX078S03A1745(filter, tipo);
    }

    public List<A1745Filter> loadPX078S04A1745(A1745Filter filter, String tipo) throws SQLException, Exception {
        return revenueFlightDAO.loadPX078S04A1745(filter, tipo);
    }
    public List<A1745Filter> loadPX078S04A1745_3(A1745Filter filter, String tipo) throws SQLException, Exception {
        return revenueFlightDAO.loadPX078S04A1745_3(filter, tipo);
    }
    public List<A1745Filter> loadPX078S05A1745(A1745Filter filter, String tipo) throws SQLException,Exception {
        return revenueFlightDAO.loadPX078S05A1745(filter, tipo);
    }
     public List<A1692Filter> loadPX078S06A1692(A1745Filter filter) throws SQLException, Exception {
        return revenueFlightDAO.loadPX078S06A1692(filter);
    }

}
