/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.screens;

import java.sql.SQLException;
import java.util.HashMap;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.dao.screens.FacsimilDAO;

/**
 *
 * @author lmendoza
 */
public class FacsimilLogic {

    private final FacsimilDAO facsimilDAO = new FacsimilDAO();

    public void setSession(IServerSession ss) {
        facsimilDAO.setSession(ss);

    }

    public FACSIMILFilter loadARCFacsimil(String ccust, UserView user, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return facsimilDAO.loadARCFacsimil(ccust, user, filter, hmCiudades);
    }

    public FACSIMILFilter loadASRFacsimil(String ccust, UserView user, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return facsimilDAO.loadASRFacsimil(ccust, user, filter, hmCiudades);
    }

    public FACSIMILFilter loadBSPFacsimil(String ccust, UserView user, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return facsimilDAO.loadBSPFacsimil(ccust, user, filter, hmCiudades);
    }
    
    public FACSIMILFilter loadFacsimileInterlineal(String ccust, String calfa, UserView user, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return facsimilDAO.loadFacsimileInterlineal(ccust, calfa, user, filter, hmCiudades);
    }
    
    
}
