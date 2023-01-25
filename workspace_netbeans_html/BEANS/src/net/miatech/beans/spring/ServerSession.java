/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans.spring;

import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Map;
import java.util.Properties;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.provider.ConnectionIBMDB2Server;

/**
 *
 * @author rmayta
 */
//@Stateless (mappedName="ServerSession")
public class ServerSession implements IServerSession {
    private Map<String,Object> propertySession;

    public ServerSession(Map<String,Object> propertySession){
        this.propertySession = propertySession;
    }

    @Override
    public Map<String, Object> getPropertySession() {
        return propertySession;
    }

    @Override
    public void setPropertySession(Map<String, Object> propertySession) {
        this.propertySession = propertySession;
    }

    @Override
    public void setAttribute(String name, Object value) throws Exception {
        propertySession.put(name,value);
    }

    @Override
    public Object getAttribute(String name) throws Exception {
        return propertySession.get(name);
    }

    @Override
    public ConnectionIBMDB2Server getCNXIBMDB2() throws Exception {
        ConnectionIBMDB2Server cnx = null;

        if(propertySession != null){
            if(propertySession.get("CNXIBMDB2") == null){
                cnx = null;
            }else{
                cnx = (ConnectionIBMDB2Server)propertySession.get("CNXIBMDB2");
            }
        }

        return cnx;
    }

    @Override
    public void setCNXIBMDB2(ConnectionIBMDB2Server cnxIBMDB2) throws Exception {
        if(propertySession != null){
            propertySession.put("CNXIBMDB2", cnxIBMDB2);
        }
    }

    @Override
    public Boolean getACCCNX() throws Exception {
        Boolean bolReturn = false;

        if(propertySession != null){
            if(propertySession.get("ACCCNX") == null){
                bolReturn = false;
            }else{
                bolReturn = (Boolean)propertySession.get("ACCCNX");
            }
        }

        return bolReturn;
    }

    @Override
    public void setACCCNX(Boolean ACCCNX) throws Exception {
        if(propertySession != null){
            propertySession.put("ACCCNX", ACCCNX);
        }
    }

    @Override
    public void setUserView(UserView user) throws Exception {
        if(propertySession != null){
            propertySession.put("USER_VIEW", user);
        }
    }

    @Override
    public UserView getUserView() throws Exception {
        return (UserView)propertySession.get("USER_VIEW");
    }

    @Override
    public void setMainLibrary(String mlib) throws Exception {
        if(propertySession != null){
            propertySession.put("MAIN_LIBRARY", mlib);
        }
    }

    @Override
    public String getMainLibrary() throws Exception {
        return (String)propertySession.get("MAIN_LIBRARY");
    }
}
