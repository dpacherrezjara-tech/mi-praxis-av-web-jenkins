/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.tnu;

import java.util.List;
import net.miatech.beans.A1547Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.tnu.AtlDuplicateUsageDAO;

/**
 *
 * @author vhidalgo
 */
public class AtlDuplicateUsageLogic {
    private AtlDuplicateUsageDAO objDAO = new AtlDuplicateUsageDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A1547Filter> loadPX225S01A1547(A1547Filter filter) throws Exception {
        return objDAO.loadPX225S01A1547(filter);
    }    
}
