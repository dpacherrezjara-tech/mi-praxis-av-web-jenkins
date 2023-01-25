/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.dao;


/**
 *
 * @author rmayta
 */
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import net.miatech.beans.S0007INF053Filter;
import net.miatech.beans.S0008INF020Filter;
import net.miatech.beans.spring.S0010INF020Filter;
import net.miatech.praxis.spring.INF001;
import net.miatech.praxis.spring.INF020;
import net.miatech.praxis.spring.INF021;

/**
 *
 * @author rmayta
 */
public interface UserDao {
    public Boolean autentificateUser(INF001 user) throws Exception;
    public Object[] autenthicateUser(INF001 user) throws Exception;
    public List<S0008INF020Filter> validateAirlinesAllowed(S0008INF020Filter filter) throws SQLException, Exception;
    public INF001 obtainUserInfo(INF001 filter) throws SQLException, Exception;
    public S0010INF020Filter obtainCustomerInfo(INF001 user, INF020 filter) throws SQLException, Exception;
    public List<Map<?, ?>> obtainMenu(String appCode) throws SQLException, Exception;
    public boolean accessSecurity(S0007INF053Filter filter) throws SQLException, Exception;
    public List<INF021> getMenu(INF020 customerInfo, String appCode) throws SQLException, Exception;
    public List<INF021> getMenuHTML(INF020 customerInfo, String appCode,String mtypeMenu) throws SQLException, Exception;
}
