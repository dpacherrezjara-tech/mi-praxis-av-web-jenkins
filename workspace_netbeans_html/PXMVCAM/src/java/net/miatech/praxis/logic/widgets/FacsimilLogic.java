/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.widgets;

import java.sql.SQLException;
import java.util.HashMap;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.dao.widgets.FacsimilDAO;

/**
 *
 * @author jjulca
 */
public class FacsimilLogic {
    private FacsimilDAO loadFacsimileDAO = new FacsimilDAO();
    
    public FacsimilLogic() {
    }
    
    public FacsimilLogic(IServerSession ss) {
        loadFacsimileDAO.setSession(ss);
    }
    
    public void setSession(IServerSession ss) {
        loadFacsimileDAO.setSession(ss);
    }
    
    public  FACSIMILFilter loadBSPFacsimilProrate(BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return loadFacsimileDAO.loadBSPFacsimilProrate(filter, hmCiudades);
    }

    public  FACSIMILFilter loadARCFacsimilProrate(BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return loadFacsimileDAO.loadARCFacsimilProrate(filter, hmCiudades);
    }

    public  FACSIMILFilter loadASRFacsimilProrate(BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return loadFacsimileDAO.loadASRFacsimilProrate(filter, hmCiudades);
    }
}
