/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2390Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.FareclassatpcoFormDAO;

/**
 *
 * @author zperez
 */
public class FareclassatpcoFormLogic {

    public FareclassatpcoFormDAO FareclassDAO = new FareclassatpcoFormDAO();

    public void setSession(IServerSession ss) {
        FareclassDAO.setSession(ss);
    }

    public List<A2390Filter> lst_search(A2390Filter filter) throws SQLException, Exception {
        return FareclassDAO.lstsearch(filter);
    }

}
