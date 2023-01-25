/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans.implement;

import flex.messaging.FlexSession;
import javax.servlet.http.HttpSession;
import net.miatech.beans.MemoSession;
import net.miatech.beans.UserView;
import net.miatech.provider.ConnectionIBMDB2Server;

/**
 *
 * @author rmayta
 */
public interface IServerSession {
    public String getProperty(String name);
    public void setAttribute(String name, Object value);
    public Object getAttribute(String name);
    public void removeAttribute(String name);
    public FlexSession getFlexSession();
    public HttpSession getHttpSession();
    public MemoSession getMemoSession();
    public String getId();
    public ConnectionIBMDB2Server getCNXIBMDB2();
    public void setCNXIBMDB2(ConnectionIBMDB2Server cnxIBMDB2);
    public Boolean getACCCNX();
    public void setACCCNX(Boolean ACCCNX);
    public void setUserSummary(String summary);
    public void setUserView(UserView user);
    public UserView getUserView();
    public void setMainLibrary(String mlib);
    public String getMainLibrary();
}
