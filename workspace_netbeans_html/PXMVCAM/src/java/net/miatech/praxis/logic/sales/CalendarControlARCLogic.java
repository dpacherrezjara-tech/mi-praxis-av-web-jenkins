/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX036S01A1527Filter;
import net.miatech.beans.SQP00146Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CalendarControlARCDAO;

/**
 *
 * @author lmendoza
 */
public class CalendarControlARCLogic {

    private final CalendarControlARCDAO calendarControlARCDAO = new CalendarControlARCDAO();

    public void setSession(IServerSession ss) {
        calendarControlARCDAO.setSession(ss);

    }

    public List<PX036S01A1527Filter> loadPX036S01A1527(PX036S01A1527Filter filter) throws SQLException, Exception {
        return calendarControlARCDAO.loadPX036S01A1527(filter);
    }

    public void setSQP00146(SQP00146Filter filter) throws SQLException, Exception {
        calendarControlARCDAO.setSQP00146(filter);
    }

}
