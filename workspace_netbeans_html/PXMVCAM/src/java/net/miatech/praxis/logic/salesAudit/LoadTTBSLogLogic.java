/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP00978Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.LoadTTBSLogDAO;

/**
 *
 * @author lmendoza
 */
public class LoadTTBSLogLogic {

    private final LoadTTBSLogDAO loadTTBSLogDAO = new LoadTTBSLogDAO();

    public void setSession(IServerSession ss) {
        loadTTBSLogDAO.setSession(ss);

    }

    public List<SQP00978Filter> Search(SQP00978Filter filter) throws SQLException, Exception {
        return loadTTBSLogDAO.Search(filter);
    }

}
