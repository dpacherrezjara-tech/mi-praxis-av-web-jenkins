/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1952Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.CatalogueFlightDAO;

/**
 *
 * @author lmendoza
 */
public class CatalogueFlightLogic {

    private final CatalogueFlightDAO CatalogueFlightDAO = new CatalogueFlightDAO();

    public void setSession(IServerSession ss) {
        CatalogueFlightDAO.setSession(ss);

    }

    public List<A1952Filter> loadPX244SQP00244(A1952Filter filter) throws SQLException, Exception {
        return CatalogueFlightDAO.loadPX244SQP00244(filter);
    }

    public String loadPX244SQP00244VALID( A1952Filter filter, String flag) throws SQLException, Exception {
        return CatalogueFlightDAO.loadPX244SQP00244VALID( filter, flag);
    }
    
     public String loadPX244SQP00244ENTRY(A1952Filter filter, String strOption) throws SQLException, Exception {
        return CatalogueFlightDAO.loadPX244SQP00244ENTRY(filter, strOption);
    }

}
