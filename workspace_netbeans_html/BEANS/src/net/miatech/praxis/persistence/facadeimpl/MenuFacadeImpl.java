/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.facadeimpl;

import java.util.List;

import net.miatech.beans.ServerSession;
import net.miatech.praxis.persistence.dao.MenuDao;
import net.miatech.praxis.persistence.daoimpl.MenuDaoImpl;
import net.miatech.praxis.persistence.facade.MenuFacade;
import net.miatech.praxis.persistence.filters.MenuFilter;
/**
 *
 * @author lremicio
 */
public class MenuFacadeImpl implements MenuFacade{
    
    private MenuDao menuDao = new MenuDaoImpl();
    
    @Override
    public void setSession(ServerSession ss){
        menuDao.setSession(ss);
    }
    
    @Override
    public List<MenuFilter> listMenu(MenuFilter filter) throws Exception{
        return menuDao.listMenu(filter);
    }
    
}
