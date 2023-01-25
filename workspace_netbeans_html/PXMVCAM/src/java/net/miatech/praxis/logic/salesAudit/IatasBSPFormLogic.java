/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2844Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.IatasBSPFormDAO;

/**
 *
 * @author zperez
 */
public class IatasBSPFormLogic {

    private IatasBSPFormDAO BSPFormDAO = new IatasBSPFormDAO();

    public void setSession(IServerSession ss) {
        BSPFormDAO.setSession(ss);

    }

    public List<A2844Filter> SearchBspIATAS(A2844Filter filter) throws SQLException, Exception {

        return BSPFormDAO.SearchBspIATAS(filter);
    }

}
