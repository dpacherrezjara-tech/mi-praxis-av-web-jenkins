/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A4718Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ExecutionScheduleDAO;

/**
 *
 * @author zperez
 */
public class ExecutionScheduleLogic {

    private ExecutionScheduleDAO objDAO = new ExecutionScheduleDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A4718Filter> SearchCalendar(A4718Filter filter) throws SQLException, Exception {
        return objDAO.SearchCalendar(filter);
    }

    public String mantenimientoCalendar(A4718Filter filter) throws SQLException, Exception {
        return objDAO.mantenimientoCalendar(filter);
    }

}
