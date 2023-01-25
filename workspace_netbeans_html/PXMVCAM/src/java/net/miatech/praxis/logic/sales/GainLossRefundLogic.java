/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX152S01A1530Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.GainLossRefundDAO;

/**
 *
 * @author lmendoza
 */
public class GainLossRefundLogic {

    private final GainLossRefundDAO gainLossRefundDAO = new GainLossRefundDAO();

    public void setSession(IServerSession ss) {
        gainLossRefundDAO.setSession(ss);

    }
    public   List<PX152S01A1530Filter>  loadPX152S01A1530( PX152S01A1530Filter filter) throws SQLException, Exception {
        return gainLossRefundDAO.loadPX152S01A1530(filter);
    }

}
