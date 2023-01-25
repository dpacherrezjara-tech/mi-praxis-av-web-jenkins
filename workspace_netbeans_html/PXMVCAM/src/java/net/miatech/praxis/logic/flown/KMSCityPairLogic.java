/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1780Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.KMSCityPairDAO;

/**
 *
 * @author lmendoza
 */
public class KMSCityPairLogic {

    private KMSCityPairDAO KMSCityPairDAO = new KMSCityPairDAO();

    public void setSession(IServerSession ss) {
        KMSCityPairDAO.setSession(ss);
    }

    public List<A1780Filter> loadPX085S01A1708(A1780Filter filter) throws SQLException, Exception {
        return KMSCityPairDAO.loadPX085S01A1708(filter);
    }

}
  