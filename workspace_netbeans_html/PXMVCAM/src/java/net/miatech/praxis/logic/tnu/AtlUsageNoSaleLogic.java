/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.tnu;

import java.util.List;
import net.miatech.beans.A1544Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.tnu.AtlUsageNoSaleDAO;

/**
 *
 * @author vhidalgo
 */
public class AtlUsageNoSaleLogic {
    private AtlUsageNoSaleDAO objDAO = new AtlUsageNoSaleDAO();
    
    public void setSession(IServerSession ss) {                
        objDAO.setSession(ss);
    }

    public List<A1544Filter> loadPX224S01A1544(A1544Filter filter) throws Exception
    {
        return objDAO.loadPX224S01A1544(filter);
    }
}
