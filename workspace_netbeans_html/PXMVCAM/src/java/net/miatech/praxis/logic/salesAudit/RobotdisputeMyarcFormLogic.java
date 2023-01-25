/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A4139Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RobotdisputeMyarcFormDAO;

/**
 *
 * @author zperez
 */
public class RobotdisputeMyarcFormLogic {

    private RobotdisputeMyarcFormDAO objDAO = new RobotdisputeMyarcFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A4139Filter> SearchDisputas(A4139Filter filter) throws SQLException, Exception {
        return objDAO.SearchDisputas(filter);
    }

}
