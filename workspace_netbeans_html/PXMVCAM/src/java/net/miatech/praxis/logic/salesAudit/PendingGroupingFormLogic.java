/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3329Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.PendingGroupingFormDAO;

/**
 *
 * @author zperez
 */
public class PendingGroupingFormLogic {

    private PendingGroupingFormDAO objDAO = new PendingGroupingFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3329Filter> searchgrouping(A3329Filter filter) throws SQLException, Exception {
        return objDAO.searchgrouping(filter);
    }

    public String insertLisTracingFile(A3329Filter filter, List<A3329Filter> lstSelectedTkts,String vl_A3329ARCHI) throws SQLException, Exception {
        return objDAO.insertLisTracingFile(filter, lstSelectedTkts,vl_A3329ARCHI);
    }

}
