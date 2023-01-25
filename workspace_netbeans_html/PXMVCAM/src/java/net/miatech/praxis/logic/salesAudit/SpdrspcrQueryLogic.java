/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3540Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.SpdrspcrQueryDAO;

/**
 *
 * @author zperez
 */
public class SpdrspcrQueryLogic {

    private SpdrspcrQueryDAO objDAO = new SpdrspcrQueryDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3540Filter> Search(A3540Filter filter) throws SQLException, Exception {
        return objDAO.Search(filter);
    }

}
