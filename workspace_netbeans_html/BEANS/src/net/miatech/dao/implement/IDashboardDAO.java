/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.dao.implement;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import net.miatech.beans.DashboardFilter;
import net.miatech.beans.Pagination;

/**
 *
 * @author rmayta
 */
public interface IDashboardDAO {
    public Map<Byte,List<DashboardFilter>> obtaingData(DashboardFilter filter) throws SQLException;
    public Map<Byte,List<DashboardFilter>> obtaingData(DashboardFilter filter, Pagination page) throws SQLException;
}
