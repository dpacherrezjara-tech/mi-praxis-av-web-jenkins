/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.tnu;

import java.util.List;
import net.miatech.beans.PX229S01Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.tnu.AtlByTransactionTypeDAO;

/**
 *
 * @author vhidalgo
 */
public class AtlByTransactionTypeLogic {

    private AtlByTransactionTypeDAO objDAO = new AtlByTransactionTypeDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX229S01Filter> loadPX229S01(PX229S01Filter filter) throws Exception {
        return objDAO.loadPX229S01(filter);
    }
}
