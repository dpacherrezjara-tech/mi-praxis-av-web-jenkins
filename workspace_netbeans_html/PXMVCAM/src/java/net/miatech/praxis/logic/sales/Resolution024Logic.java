/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import net.miatech.praxis.logic.flown.*;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1952Filter;
import net.miatech.beans.PX019S01A823Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A881;
import net.miatech.praxis.dao.flown.CatalogueFlightDAO;
import net.miatech.praxis.dao.sales.ProvisosTextDAO;
import net.miatech.praxis.dao.sales.Resolution024DAO;

/**
 *
 * @author lmendoza
 */
public class Resolution024Logic {

    private final Resolution024DAO resolution024DAO = new Resolution024DAO();

    public void setSession(IServerSession ss) {
        resolution024DAO.setSession(ss);
    }

    public List loadResolution024(A881 filter) throws SQLException, Exception {
        return resolution024DAO.loadResolution024(filter);
    }

    public int maintanceA881(A881 filter, String strOption) throws SQLException {
        return resolution024DAO.maintanceA881(filter, strOption);
    }

}
