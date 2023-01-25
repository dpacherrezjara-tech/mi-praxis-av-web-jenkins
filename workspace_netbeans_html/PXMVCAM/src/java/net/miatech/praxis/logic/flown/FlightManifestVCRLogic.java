/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.FlightManifestVCRDAO;

/**
 *
 * @author lmendoza
 */
public class FlightManifestVCRLogic {

    private final FlightManifestVCRDAO flightManifestVCRDAO = new FlightManifestVCRDAO();

    public void setSession(IServerSession ss) {
        flightManifestVCRDAO.setSession(ss);

    }

    public List<A1692Filter> loadPX233S01A1691(A1692Filter filter) throws SQLException, Exception {
        return flightManifestVCRDAO.loadPX233S01A1691(filter);
    }

    public List<A1692Filter> loadPX233S02A1892(A1692Filter filter) throws SQLException, Exception {
        return flightManifestVCRDAO.loadPX233S02A1892(filter);
    }

}
