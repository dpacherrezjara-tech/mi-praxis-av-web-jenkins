/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.dao;

import java.util.List;

import net.miatech.beans.ServerSession;
import net.miatech.praxis.persistence.filters.MenuFilter;

/**
 *
 * @author lremicio
 */
public interface MenuDao {
    
    public void setSession(ServerSession ss);
    public List<MenuFilter> listMenu(MenuFilter filter) throws Exception;
    
}
