/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A2149;
import net.miatech.praxis.dao.flown.OwnerlessCouponDAO;
import net.miatech.praxis.interline.filter.A1413Filter;

/**
 *
 * @author lmendoza
 */
public class OwnerlessCouponLogic {

    private OwnerlessCouponDAO ownerlessCouponDAO = new OwnerlessCouponDAO();

    public void setSession(IServerSession ss) {
        ownerlessCouponDAO.setSession(ss);

    }

    public List<A1413Filter> loadPX235SQP00252(A1413Filter filter) throws SQLException, Exception {
        return ownerlessCouponDAO.loadPX235SQP00252(filter);
    }

    public List<A1691Filter> loadPX235SQP00905(A1691Filter filter, HashMap hmAeropuertos) throws SQLException, Exception {
        return ownerlessCouponDAO.loadPX235SQP00905(filter, hmAeropuertos);
    }
    
    public List<A1691Filter> loadPX235SQP04158(A1691Filter filter, HashMap hmAeropuertos) throws SQLException, Exception {
        return ownerlessCouponDAO.loadPX235SQP04158(filter, hmAeropuertos);
    }

    public List<A1413Filter> loadPX235SQP00253(A1413Filter filter) throws SQLException, Exception {
        return ownerlessCouponDAO.loadPX235SQP00253(filter);
    }

    public A1413Filter loadPX235SQP00257(A1413Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return ownerlessCouponDAO.loadPX235SQP00257(filter, hmAeropuertos);
    }

    public String loadPX235SQP00257VALID( A1413Filter filter) throws SQLException, Exception {
        return ownerlessCouponDAO.loadPX235SQP00257VALID( filter);
    }
    public String loadPX235SQP00257ENTRY(A1413Filter filter, String strOption) throws SQLException, Exception {
        return ownerlessCouponDAO.loadPX235SQP00257ENTRY(filter, strOption);
    }
    public A1691Filter loadPX095S04A1691(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException,Exception {
        return ownerlessCouponDAO.loadPX095S04A1691(filter, hmAeropuertos);
    }
    
     public A2149 insertFavoriteMenu(A2149 filter) throws Exception {
        return ownerlessCouponDAO.insertFavoriteMenu(filter);
    }

    public A2149 deleteFavoriteMenu(A2149 filter) throws Exception {
        return ownerlessCouponDAO.deleteFavoriteMenu(filter);
    }
    
    public A1413Filter loadSQP04497(A1413Filter filter, String type) throws SQLException, Exception {
        return ownerlessCouponDAO.loadSQP04497(filter, type);
    }
}
