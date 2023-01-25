/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3536Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RobotPostbillingControlDAO;

/**
 *
 * @author zperez
 */
public class RobotPostbillingControlLogic {

    private RobotPostbillingControlDAO objDAO = new RobotPostbillingControlDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3536Filter> SearchPostbillingControl(A3536Filter filter) throws SQLException, Exception {
        return objDAO.SearchPostbillingControl(filter);
    }
}
