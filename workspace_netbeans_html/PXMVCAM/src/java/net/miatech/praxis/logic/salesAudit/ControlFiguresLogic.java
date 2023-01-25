/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP00942Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.ControlFiguresDAO;

/**
 *
 * @author lmendoza
 */
public class ControlFiguresLogic {

    private final ControlFiguresDAO controlFiguresDAO = new ControlFiguresDAO();

    public void setSession(IServerSession ss) {
        controlFiguresDAO.setSession(ss);

    }

     public List<SQP00942Filter> Search(SQP00942Filter filter) throws SQLException, Exception {
        return controlFiguresDAO.Search(filter);   
    }

}
