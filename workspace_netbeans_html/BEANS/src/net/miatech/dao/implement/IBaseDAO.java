/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.dao.implement;

import net.miatech.beans.implement.IServerSession;
import net.miatech.utils.Application;

/**
 *
 * @author rmayta
 */
public interface IBaseDAO {
    public void setSession(IServerSession ss);
    public void setApp(Application application);
}
