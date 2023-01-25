/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX038S01A1779Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.FlightInteractPraxisDAO;

/**
 *
 * @author lmendoza
 */
public class FlightInteractPraxisLogic {

    private final FlightInteractPraxisDAO flightInteractPraxisDAO = new FlightInteractPraxisDAO();

    public void setSession(IServerSession ss) {
        flightInteractPraxisDAO.setSession(ss);

    }

     public List<PX038S01A1779Filter> loadPX038S01A1797(PX038S01A1779Filter filter) throws SQLException, Exception {
        return flightInteractPraxisDAO.loadPX038S01A1797(filter);
    }

}
