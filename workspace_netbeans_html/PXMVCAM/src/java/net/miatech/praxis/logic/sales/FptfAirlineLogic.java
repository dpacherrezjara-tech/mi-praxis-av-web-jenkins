/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX019S01A004Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.FptfAirlineDAO;

/**
 *
 * @author lmendoza
 */
public class FptfAirlineLogic {

    private final FptfAirlineDAO fptfAirlineDAO = new FptfAirlineDAO();

    public void setSession(IServerSession ss) {
        fptfAirlineDAO.setSession(ss);
    }

    public List<PX019S01A004Filter> loadPX019S01A004(PX019S01A004Filter filter) throws SQLException, Exception {
        return fptfAirlineDAO.loadPX019S01A004(filter);
    }
}
