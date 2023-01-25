/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.facadeimpl;


import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.S0007INF053Filter;
import net.miatech.beans.S0008INF020Filter;
import net.miatech.beans.spring.S0010INF020Filter;
import net.miatech.beans.spring.ServerSession;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.spring.INF001;
import net.miatech.praxis.spring.INF020;
import net.miatech.praxis.persistence.daoimpl.UserDaoImpl;
import net.miatech.praxis.persistence.facade.UserFacade;
import net.miatech.praxis.spring.INF021;
import net.miatech.utils.spring.Application;

/**
 *
 * @author lzambrano
 */

public class UserFacadeImpl implements UserFacade{
    private UserDaoImpl userDAO;
    
    /**
     * Creates a new instance of UserLogic
     */

    public UserFacadeImpl()
    {
    	userDAO = new UserDaoImpl();
    }
    
    public void setSession(ServerSession ss){
        userDAO.setSession(ss);
    }
    
    public void setApp(Application app){
        userDAO.setApp(app);
    }
    
    public List<S0008INF020Filter> validateAirlinesAllowed(S0008INF020Filter filter) throws Exception
    {
        return userDAO.validateAirlinesAllowed(filter);
    }
    
    public INF001 obtainUserInfo(INF001 filter) throws Exception{
        return userDAO.obtainUserInfo(filter);
    }
    
    public S0010INF020Filter obtainCustomerInfo(INF001 user, INF020 filter) throws Exception{
        return userDAO.obtainCustomerInfo(user, filter);
    }

    public Boolean autentificateUser(INF001 user) throws Exception{
        return userDAO.autentificateUser(user);
    }
    
    public Object[] autenthicateUser(INF001 user) throws Exception{
        return userDAO.autenthicateUser(user);
    }    

    public List<Map<?, ?>> obtainMenu(String appCode) throws SQLException, Exception {
        return userDAO.obtainMenu(appCode);
    }
    
    public List<INF021> getMenu(INF020 customerInfo, String appCode) throws SQLException, Exception {
        return userDAO.getMenu(customerInfo, appCode);
    }
    
    public List<INF021> getMenuHTML(INF020 customerInfo, String appCode,String mtypeMenu) throws SQLException, Exception {
        return userDAO.getMenuHTML(customerInfo, appCode,mtypeMenu);
    }
    
    public boolean accessSecurity(S0007INF053Filter filter) throws SQLException, Exception {
        return userDAO.accessSecurity(filter);
    }
    
    
    public PX041S01INF001Filter accessProgram(PX041S01INF001Filter filter) throws Exception{
        return userDAO.accessProgram(filter);
    }
    
    public List<PX041S01INF001Filter> accessUser(PX041S01INF001Filter filter) throws Exception{
        return userDAO.accessUser(filter);
    }
    
    public void logAccessProgram(PX041S01INF001Filter filter) throws Exception{
        userDAO.logAccessProgram(filter);
    }    

    public void setSession(IServerSession ss) {
        userDAO.setSession(ss);
    }
}