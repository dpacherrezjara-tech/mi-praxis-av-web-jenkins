/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2468Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.FootnoteatpcoFormDAO;

/**
 *
 * @author zperez
 */
public class FootnoteatpcoFormLogic {

    public FootnoteatpcoFormDAO FootnoteatpcoDAO = new FootnoteatpcoFormDAO();

    public void setSession(IServerSession ss) {
        FootnoteatpcoDAO.setSession(ss);
    }

    public List<A2468Filter> lst_search(A2468Filter filter) throws SQLException, Exception {
        return FootnoteatpcoDAO.lstsearch(filter);
    }

    public List<A2468Filter> lst_searchTbls(A2468Filter filter) throws SQLException, Exception {
        return FootnoteatpcoDAO.lst_searchTbls(filter);
    }

}
