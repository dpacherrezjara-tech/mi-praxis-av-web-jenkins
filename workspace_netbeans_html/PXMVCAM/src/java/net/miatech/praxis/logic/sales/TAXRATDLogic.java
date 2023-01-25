/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX032S01A1202Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.TAXRATDDAO;

/**
 *
 * @author lmendoza
 */
public class TAXRATDLogic {

    private final TAXRATDDAO taxRATDDAO = new TAXRATDDAO();

    public void setSession(IServerSession ss) {
        taxRATDDAO.setSession(ss);

    }

    public List<PX032S01A1202Filter> loadPX032S01A1202(PX032S01A1202Filter filter) throws SQLException ,Exception {
        return taxRATDDAO.loadPX032S01A1202(filter);
    }

}
