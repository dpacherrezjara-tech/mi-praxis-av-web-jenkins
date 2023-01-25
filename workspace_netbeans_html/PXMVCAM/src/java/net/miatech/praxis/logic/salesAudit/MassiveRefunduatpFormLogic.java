/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A4076Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.MassiveRefunduatpFormDAO;

/**
 *
 * @author zperez
 */
public class MassiveRefunduatpFormLogic {

    public MassiveRefunduatpFormDAO RefunduatpFormDAO = new MassiveRefunduatpFormDAO();

    public void setSession(IServerSession ss) {
        RefunduatpFormDAO.setSession(ss);
    }

    public String subirExcel(ArrayList<A4076Filter> filter) throws SQLException, Exception {
        return RefunduatpFormDAO.subirExcel(filter);
    }

    public List<A4076Filter> search(A4076Filter filter) throws SQLException, Exception {
        return RefunduatpFormDAO.search(filter);
    }

    public A4076Filter SearchUATPRFNDetail(A4076Filter filter) throws SQLException, Exception {
        return RefunduatpFormDAO.SearchUATPRFNDetail(filter);
    }

    public String ProcesaMantenimiento(ArrayList<A4076Filter> beanGuardar) throws SQLException, Exception {
        return RefunduatpFormDAO.ProcesaMantenimiento(beanGuardar);
    }
    public List<A4076Filter> searchDetail(A4076Filter filter) throws SQLException, Exception {
        return RefunduatpFormDAO.searchDetail(filter);
    }
    public String ProcesaManualUATP(A4076Filter filter,String lstaTaxes,String fop) throws SQLException, Exception {
        return RefunduatpFormDAO.ProcesaManualUATP(filter, lstaTaxes, fop);
    }
    public String ProcesaDelete(A4076Filter filter) throws SQLException, Exception {
        return RefunduatpFormDAO.ProcesaDelete(filter);
    }
    public List<A4076Filter> SearchDetailError(A4076Filter filter) throws SQLException, Exception {
        return RefunduatpFormDAO.SearchDetailError(filter);
    }

}
