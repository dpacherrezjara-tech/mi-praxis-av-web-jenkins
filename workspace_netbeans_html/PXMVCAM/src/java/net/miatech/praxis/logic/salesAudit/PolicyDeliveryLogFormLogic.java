/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A4014Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.PolicyDeliveryLogFormDAO;

/**
 *
 * @author zperez
 */
public class PolicyDeliveryLogFormLogic {

    private PolicyDeliveryLogFormDAO LogFormDAO = new PolicyDeliveryLogFormDAO();

    public void setSession(IServerSession ss) {
        LogFormDAO.setSession(ss);
    }
    public List<A4014Filter> Search(A4014Filter filter) throws SQLException, Exception {
        return LogFormDAO.Search(filter);
    }

}
