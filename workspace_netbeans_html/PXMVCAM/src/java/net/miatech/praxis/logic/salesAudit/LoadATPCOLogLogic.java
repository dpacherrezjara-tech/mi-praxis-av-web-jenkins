/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP00967Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.LoadATPCOLogDAO;

/**
 *
 * @author lmendoza
 */
public class LoadATPCOLogLogic {

    private final LoadATPCOLogDAO loadATPCOLogDAO = new LoadATPCOLogDAO();

    public void setSession(IServerSession ss) {
        loadATPCOLogDAO.setSession(ss);

    }

    public List<SQP00967Filter> Search(SQP00967Filter filter) throws SQLException, Exception {
        return loadATPCOLogDAO.Search(filter);
    }
}
