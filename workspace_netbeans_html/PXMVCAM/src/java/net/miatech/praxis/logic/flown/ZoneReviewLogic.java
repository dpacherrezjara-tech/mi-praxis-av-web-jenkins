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
import net.miatech.beans.A2826Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.PassengerConciliationDAO;
import net.miatech.praxis.dao.flown.ZoneReviewDAO;

/**
 *
 * @author lmendoza
 */
public class ZoneReviewLogic {

    private final ZoneReviewDAO zoneReviewDAO = new ZoneReviewDAO();

    public void setSession(IServerSession ss) {
        zoneReviewDAO.setSession(ss);
    }

    public HashMap loadSQP01278(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01278(filter);
    }

    public List<A2826Filter> loadSQP01317(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01317(filter);
    }

    public List<A2826Filter> loadSQP01318(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01318(filter);
    }

    public List<A2826Filter> loadSQP01297(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01297(filter);
    }

    public List<A2826Filter> loadSQP01302(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01302(filter);
    }

    public List<A2826Filter> loadSQP01324(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01324(filter);
    }

    public List<A2826Filter> loadSQP01325(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01325(filter);
    }

    public List<A2826Filter> loadSQP01327(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01327(filter);
    }

    public List<A2826Filter> loadSQP01328(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01328(filter);
    }

    public HashMap loadSQP01278OAL(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01278OAL(filter);
    }

    public List<A2826Filter> loadSQP01317OAL(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01317OAL(filter);
    }

    public List<A2826Filter> loadSQP01318OAL(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01318OAL(filter);
    }

    public List<A2826Filter> loadSQP01297OAL(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01297OAL(filter);
    }

    public List<A2826Filter> loadSQP01302OALPax(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01302OALPax(filter);
    }

    public List<A2826Filter> loadSQP01302OALFli(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01302OALFli(filter);
    }

    public List<A2826Filter> loadSQP01324OAL(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01324OAL(filter);
    }

    public List<A2826Filter> loadSQP01325OAL(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01325OAL(filter);
    }

    public List<A2826Filter> loadSQP01327OALPax(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01327OALPax(filter);
    }
    public List<A2826Filter> loadSQP01327OALFli(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01327OALFli(filter);
    }
    public List<A2826Filter> loadSQP01328OALPax(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01328OALPax(filter);
    }
     public List<A2826Filter> loadSQP01328OALFli(A2826Filter filter) throws Exception {
        return zoneReviewDAO.loadSQP01328OALFli(filter);
    }


}
