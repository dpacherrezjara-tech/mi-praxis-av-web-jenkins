/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2643Filter;
import net.miatech.beans.SaleAudit.A2644Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.dao.salesAudit.ITBulkDAO;

/**
 *
 * @author lmendoza
 */
public class ITBulkLogic {

    private final ITBulkDAO iTBulkDAO = new ITBulkDAO();

    public void setSession(IServerSession ss) {
        iTBulkDAO.setSession(ss);

    }

    public List<A2644Filter> Search(A2644Filter filter) throws SQLException, Exception {

        return iTBulkDAO.Search(filter);
    }

    public A2643Filter SearchDetalle(A2643Filter filter) throws SQLException, Exception {

        return iTBulkDAO.SearchDetalle(filter);
    }

    public List<A2643Filter> SearchReference(String tCode) throws SQLException, Exception {

        return iTBulkDAO.SearchReference(tCode);
    }

    public A2644Filter mantenimientoITNetas(A2644Filter filter) throws SQLException, Exception {
        return iTBulkDAO.mantenimientoITNetas(filter);
    }

    public List<A051> cargarComboType() throws SQLException, Exception {
        return iTBulkDAO.cargarComboType();
    }

}
