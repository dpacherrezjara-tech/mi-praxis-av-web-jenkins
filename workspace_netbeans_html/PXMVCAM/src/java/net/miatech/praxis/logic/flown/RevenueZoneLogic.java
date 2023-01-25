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
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.PassengerConciliationDAO;
import net.miatech.praxis.dao.flown.RevenueZoneDAO;

/**
 *
 * @author lmendoza
 */
public class RevenueZoneLogic {

    private final RevenueZoneDAO revenueZoneDAO = new RevenueZoneDAO();

    public void setSession(IServerSession ss) {
        revenueZoneDAO.setSession(ss);

    }
    
     public List<A1744Filter> loadPX079S01A1744(A1744Filter filter, String tipo) throws SQLException, Exception {
        return revenueZoneDAO.loadPX079S01A1744(filter, tipo);
    }
    public List<A1744Filter> loadPX079S03A1744(A1744Filter filter, String tipo) throws SQLException, Exception  {
        return revenueZoneDAO.loadPX079S03A1744(filter, tipo);
    } 
      public List<A1744Filter> loadPX079S04A1800(A1744Filter filter, String tipo) throws SQLException,Exception {
        return revenueZoneDAO.loadPX079S04A1800(filter);
    }
     public List<A1692Filter> loadPX079S05A1692(A1744Filter filter) throws SQLException, Exception {
        return revenueZoneDAO.loadPX079S05A1692(filter);
    }  
     public List<A1744Filter> loadPX079S02A1744(A1744Filter filter, String tipo) throws SQLException, Exception {
        return revenueZoneDAO.loadPX079S02A1744(filter, tipo);
    }
  
}
