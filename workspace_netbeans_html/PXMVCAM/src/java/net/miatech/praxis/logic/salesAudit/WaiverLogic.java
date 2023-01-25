/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2537Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.WaiverDAO;

/**
 *
 * @author lmendoza
 */
public class WaiverLogic {

    private final WaiverDAO waiverDAO = new WaiverDAO();

    public void setSession(IServerSession ss) {
        waiverDAO.setSession(ss);

    }

    public List<A2537Filter> Search(A2537Filter filter) throws SQLException, Exception {
        return waiverDAO.lstsearch(filter);
    }

    public A2537Filter mantenimientoWaiver(A2537Filter filter) throws SQLException, Exception {
        return waiverDAO.mantenimientoWaiver(filter);
    }
}
