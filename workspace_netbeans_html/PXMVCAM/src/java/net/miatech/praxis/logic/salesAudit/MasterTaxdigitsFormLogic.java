/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2658Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.MasterTaxdigitsFormDAO;

/**
 *
 * @author zperez
 */
public class MasterTaxdigitsFormLogic {

    public MasterTaxdigitsFormDAO TaxdigiDAO = new MasterTaxdigitsFormDAO();

    public void setSession(IServerSession ss) {
        TaxdigiDAO.setSession(ss);
    }

    public List<A2658Filter> search(A2658Filter filter) throws SQLException, Exception {
        return TaxdigiDAO.search(filter);
    }
    public String mantenimiento(A2658Filter filter) throws SQLException, Exception {
        return TaxdigiDAO.mantenimiento(filter);
    }

}
