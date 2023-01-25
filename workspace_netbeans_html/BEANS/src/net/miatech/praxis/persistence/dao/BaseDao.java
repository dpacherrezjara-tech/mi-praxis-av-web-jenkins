/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.dao;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.spring.Application;

/**
 *
 * @author rmayta
 */
public interface BaseDao {
    public void setSession(IServerSession ss);
    public void setApp(Application application);
}
