/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.spring.implement;

import java.util.Map;

import net.miatech.beans.spring.UserView;
import net.miatech.provider.ConnectionIBMDB2Server;

/**
 *
 * @author rmayta
 */
public interface IServerSession {

    public Map<String, Object> getPropertySession();
    public void setPropertySession(Map<String, Object> propertySession);
    public void setAttribute(String name, Object value) throws Exception;
    public Object getAttribute(String name) throws Exception;
    public ConnectionIBMDB2Server getCNXIBMDB2() throws Exception;
    public void setCNXIBMDB2(ConnectionIBMDB2Server cnxIBMDB2) throws Exception;
    public Boolean getACCCNX() throws Exception;
    public void setACCCNX(Boolean ACCCNX) throws Exception;
    public void setUserView(UserView user) throws Exception;
    public UserView getUserView() throws Exception;
    public void setMainLibrary(String mlib) throws Exception;
    public String getMainLibrary() throws Exception;
}
