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
import net.miatech.praxis.dao.flown.CatalogueFlightDAO;
import net.miatech.praxis.dao.sales.ProvisosTextDAO;

/**
 *
 * @author lmendoza
 */
public class ProvisosTextLogic {

    private final ProvisosTextDAO provisosTextDAO = new ProvisosTextDAO();

    public void setSession(IServerSession ss) {
        provisosTextDAO.setSession(ss);

    }

    public List<PX019S01A823Filter> loadPX019S01A823(PX019S01A823Filter filter) throws SQLException ,Exception {
        return provisosTextDAO.loadPX019S01A823(filter);
    }

}
