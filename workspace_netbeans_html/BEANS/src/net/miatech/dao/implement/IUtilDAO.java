/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.dao.implement;

import java.sql.SQLException;
import java.util.List;
import net.miatech.libcust.A005;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;

/**
 *
 * @author rmayta
 */
public interface IUtilDAO {
    public List<A005> obtainAirlines() throws SQLException;
    public List<A005> obtainAirlines(A005 filter) throws SQLException;
    public List<A006> obtainCountries() throws SQLException;
    public List<A006> obtainCountries(A006 filter) throws SQLException;
    public List<A1007> obtainCities() throws SQLException;
    public List<A1007> obtainCities(A1007 filter) throws SQLException;
}
