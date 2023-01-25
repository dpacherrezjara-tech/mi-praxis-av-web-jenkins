/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.dao.implement;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import net.miatech.beans.S0007INF053Filter;
import net.miatech.beans.S0008INF020Filter;
import net.miatech.beans.S0010INF020Filter;
import net.miatech.praxis.INF001;
import net.miatech.praxis.INF020;

/**
 *
 * @author rmayta
 */
public interface IUserDAO {
    public Boolean autentificateUser(INF001 user);
    public Object[] autenthicateUser(INF001 user);
    public List<S0008INF020Filter> validateAirlinesAllowed(S0008INF020Filter filter) throws SQLException, Exception;
    public INF001 obtainUserInfo(INF001 filter) throws SQLException, Exception;
    public S0010INF020Filter obtainCustomerInfo(INF001 user, INF020 filter) throws SQLException, Exception;
    public List<Map<?, ?>> obtainMenu(String appCode) throws SQLException, Exception;
    public List<Map<?, ?>> obtainMenu(String appCode, String mnuType) throws SQLException, Exception;
    public boolean accessSecurity(S0007INF053Filter filter) throws SQLException, Exception;
}
