/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2252Filter;
import net.miatech.beans.SaleAudit.SQP00942Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.ServiceChargePenaltyDAO;

/**
 *
 * @author lmendoza
 */
public class ServiceChargePenaltyLogic {

    private final ServiceChargePenaltyDAO serviceChargePenaltyDAO = new ServiceChargePenaltyDAO();

    public void setSession(IServerSession ss) {
        serviceChargePenaltyDAO.setSession(ss);

    }

   public   List<A2252Filter> Search(A2252Filter filter) throws SQLException, Exception {
        return serviceChargePenaltyDAO.lstsearch(filter);
    }
    public   A2252Filter mantenimientoCharge(A2252Filter filter) throws SQLException, Exception {
        return serviceChargePenaltyDAO.mantenimientoCharge(filter);
    }

}
