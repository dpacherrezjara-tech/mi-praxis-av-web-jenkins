/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.interline;

import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.SISAccountRMDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;

/**
 *
 * @author jtorres
 */
public class SISAccountRMLogic {

    private SISAccountRMDAO objDAO = new SISAccountRMDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    
    public List<SFI021Filter> loadPX280SQP00773(SFI021Filter filter) throws Exception {
        return objDAO.loadPX280SQP00773(filter);
    }
    
}
