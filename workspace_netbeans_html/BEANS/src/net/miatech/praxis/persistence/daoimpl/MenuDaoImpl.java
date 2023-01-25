/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.daoimpl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.ServerSession;
import net.miatech.praxis.persistence.dao.MenuDao;
import net.miatech.praxis.persistence.filters.MenuFilter;
import net.miatech.praxis.persistence.tracking.DaoException;

/**
 *
 * @author lremicio
 */
public class MenuDaoImpl implements MenuDao {
    
    private ServerSession session;
    
    public MenuDaoImpl(){
        
    }
    
    public MenuDaoImpl(ServerSession ss){
        session = ss;
    }
    
    @Override
    public void setSession(ServerSession ss) {
        session = ss;
    }
    
    @Override
    public List<MenuFilter> listMenu(MenuFilter filter) throws Exception{
        
        //session.setMainLibrary("libsap04");
        
        List<MenuFilter> lstRtn = new ArrayList<MenuFilter>();
        MenuFilter objData;
        CallableStatement cstmt01 = null;
        ResultSet rs = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00323(?, ?, ?)}";

        Connection cnx = null;
        try{
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, filter.VP_CCUST);
            cstmt01.setString(2, filter.VP_SISTEMA);
            cstmt01.setString(3, filter.VP_USUARIO);
            
            cstmt01.execute();

            rs = cstmt01.getResultSet();
            while (rs.next()) {
                objData = new MenuFilter();
                
                objData.MENUID = rs.getInt("MENUID");
                objData.MENUNOMBRE = rs.getString("MENUNOMBRE");
                objData.MENUURL = rs.getString("MENUURL");
                objData.MENUICONO = rs.getString("MENUICONO");
                objData.MENUCLASE = rs.getString("MENUCLASE");
                
                lstRtn.add(objData);
            }
        }catch(Exception e){
            throw new DaoException(e, filter);
        }
        return lstRtn;
    }
    
}
