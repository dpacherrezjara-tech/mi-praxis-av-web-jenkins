/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2393Filter;
import net.miatech.beans.SaleAudit.A2684Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RulesatpcoFormDAO;

/**
 *
 * @author zperez
 */
public class RulesatpcoFormLogic {

    public RulesatpcoFormDAO RulesatpcoDAO = new RulesatpcoFormDAO();

    public void setSession(IServerSession ss) {
        RulesatpcoDAO.setSession(ss);
    }

    public List<A2393Filter> lst_search(A2393Filter filter) throws SQLException, Exception {
        return RulesatpcoDAO.lstsearch(filter);
    }

    public List<A2393Filter> lst_searchTbls(A2393Filter filter) throws SQLException, Exception {
        return RulesatpcoDAO.lst_searchTbls(filter);
    }

    public List<A2684Filter> loadRulesSearch(A2684Filter filter) throws SQLException, Exception {
        return RulesatpcoDAO.loadRulesSearch(filter);
    }

}
