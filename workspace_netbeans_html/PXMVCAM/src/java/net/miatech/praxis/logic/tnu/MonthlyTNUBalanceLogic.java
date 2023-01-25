/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.tnu;

import java.util.List;
import net.miatech.beans.PX226S01Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.tnu.MonthlyTNUBalanceDAO;

/**
 *
 * @author vhidalgo
 */
public class MonthlyTNUBalanceLogic {
     private MonthlyTNUBalanceDAO objDAO = new MonthlyTNUBalanceDAO();
    
    public void setSession(IServerSession ss) {                
        objDAO.setSession(ss);
    }
     
    public List<PX226S01Filter> loadPX226S01(PX226S01Filter filter) throws Exception
    {
        return objDAO.loadPX226S01(filter);
    }
}
