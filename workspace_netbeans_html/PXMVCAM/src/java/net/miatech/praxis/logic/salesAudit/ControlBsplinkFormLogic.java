/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3093Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.ControlBsplinkFormDAO;

/**
 *
 * @author zperez
 */
public class ControlBsplinkFormLogic {

    private ControlBsplinkFormDAO objDAO = new ControlBsplinkFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3093Filter> SearchReport(A3093Filter filter) throws SQLException, Exception {
        return objDAO.SearchReport(filter);
    }

    public String ProcesaMantenimiento(A3093Filter beanGuardar) throws SQLException, Exception {
        return objDAO.ProcesaMantenimiento(beanGuardar);
    }

}
