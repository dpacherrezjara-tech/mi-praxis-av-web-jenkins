/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX245S01A1980Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.CalendarAccountingDAO;

/**
 *
 * @author lmendoza
 */
public class CalendarAccountingLogic {

    private final CalendarAccountingDAO calendarAccountingDAO = new CalendarAccountingDAO();

    public void setSession(IServerSession ss) {
        calendarAccountingDAO.setSession(ss);

    }

    public List<PX245S01A1980Filter> loadPX245S01A1980(PX245S01A1980Filter filter) throws SQLException, Exception {
        return calendarAccountingDAO.loadPX245S01A1980(filter);
    }

    public PX245S01A1980Filter setPX112S02A1757(PX245S01A1980Filter filter) throws SQLException, Exception {
        return calendarAccountingDAO.setPX112S02A1757(filter);
    }
}
