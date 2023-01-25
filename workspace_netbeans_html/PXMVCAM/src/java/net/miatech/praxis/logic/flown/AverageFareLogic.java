/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX086S01A1781Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.AverageFareDAO;
import net.miatech.praxis.flown.A1803;

/**
 *
 * @author lmendoza 
 */
public class AverageFareLogic {

    private AverageFareDAO averageFareDAO = new AverageFareDAO();

    public void setSession(IServerSession ss) {
        averageFareDAO.setSession(ss);
    }

    public List<PX086S01A1781Filter> loadPX086SQP0026(PX086S01A1781Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return averageFareDAO.loadPX086SQP0026(filter, hmAeropuertos);
    }
    public List<A1803> loadPX086SQP00816(PX086S01A1781Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return averageFareDAO.loadPX086SQP00816(filter, hmAeropuertos);
    }

}
