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
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.PassengerConciliationDAO;

/**
 *
 * @author lmendoza
 */
public class PassengerConciliationLogic {

    private final PassengerConciliationDAO passengerConciliationDAO = new PassengerConciliationDAO();

    public void setSession(IServerSession ss) {
        passengerConciliationDAO.setSession(ss);

    }

    public List<A1691Filter> loadPX072S01A1691(A1691Filter filter) throws SQLException, Exception {
        return passengerConciliationDAO.loadPX072S01A1691(filter);
    }

    public List<A1691Filter> loadPX072S02A1691(A1691Filter filter, String strTipo, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return passengerConciliationDAO.loadPX072S02A1691(filter, strTipo, hmAeropuertos);
    }
     public List<A1692Filter> loadPX072S03A1692(A1691Filter filter, String strTipo, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return passengerConciliationDAO.loadPX072S03A1692(filter, strTipo, hmPaises);
    }
     public List<A1692Filter> loadPX095S09A1692(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return passengerConciliationDAO.loadPX095S09A1692(filter, hmAeropuertos);
    }
     
    public A1691Filter loadPX095S04A1691(A1691Filter filter, HashMap<String, String> hmAeropuertos, UserView user) throws SQLException, Exception {
        return passengerConciliationDAO.loadPX095S04A1691(filter, hmAeropuertos, user);
    }

}
