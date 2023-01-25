/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1838Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingMasterTravelDAO;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterTravelLogic {

    private final AccountingMasterTravelDAO ccountingMasterTravelDAO = new AccountingMasterTravelDAO();

    public void setSession(IServerSession ss) {
        ccountingMasterTravelDAO.setSession(ss);

    }

   public List<A1838Filter> loadPX172S02A1838(A1838Filter filter) throws SQLException, Exception
    {
        return ccountingMasterTravelDAO.loadPX172S01A1838(filter);
    }
    
    public String Maintance(A1838Filter filter, String strOption) throws SQLException, Exception {
        return ccountingMasterTravelDAO.Maintance(filter, strOption);
    }

}
