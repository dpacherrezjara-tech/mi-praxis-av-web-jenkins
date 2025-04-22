/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.panel;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.PX075S01INF001Filter;
import net.miatech.beans.PX075S02INF001Filter;
import net.miatech.beans.PX076S01INF053Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.panel.PanelDAO;

/**
 *
 * @author lzambrano
 */
public class PanelLogic {
    private PanelDAO panelDAO = new PanelDAO();
    public void setSession(IServerSession ss) {                
        panelDAO.setSession(ss);
    }
    
    public List <PX041S01INF001Filter>  loadPX041S01INF001( PX041S01INF001Filter filter) throws SQLException , Exception{
        return panelDAO.loadPX038S01A1698(filter);
    }
    
    public List <PX075S01INF001Filter>  loadPX075S01INF001( PX075S01INF001Filter filter) throws SQLException , Exception{
        return panelDAO.loadPX075S01INF001(filter);
    }
     
    public PX076S01INF053Filter setPX076S01INF053(PX076S01INF053Filter filter ) throws SQLException , Exception{ 
        return panelDAO.setPX076S01INF053(filter);
    }
    public PX076S01INF053Filter setSQP05412(PX076S01INF053Filter filter ) throws SQLException , Exception{ 
        return panelDAO.setSQP05412(filter);
    }
    
    public PX075S02INF001Filter setPX075S02INF001(PX075S02INF001Filter filter ) throws SQLException , Exception{ 
        return panelDAO.setPX075S02INF001(filter);
    }
     
}
