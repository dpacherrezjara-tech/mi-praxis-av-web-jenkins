/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.util.List;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.dao.flown.ZoneMasterFileDAO;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.flown.A1708;

/**
 *
 * @author lmendoza
 */
public class ZoneMasterFileLogic {

    private ZoneMasterFileDAO zoneMFDAO = new ZoneMasterFileDAO();
    private MasterDAO masterDAO = new MasterDAO();

    public void setSession(IServerSession ss) {
        zoneMFDAO.setSession(ss);
        masterDAO.setSession(ss);
    }

    public List<A1007> getCities() throws Exception {
        
        List<A1007> lstCiudades = masterDAO.loadCiudades();
        return lstCiudades;
    }

    public List loadFlownZone(A1708 filter, UserView user) throws Exception {
        return zoneMFDAO.loadFlownZone(filter, user);
    }
    
    public List loadFlownZone2(A1708 filter,  UserView user) throws Exception {
        return zoneMFDAO.loadFlownZone2(filter, user);
    }
    public List loadFlownZone3(A1708 filter,  UserView user) throws Exception {
        return zoneMFDAO.loadFlownZone3(filter, user);
    }
   public int maintanceFlownZone(A1708 filter, String strOption) throws Exception {
        return zoneMFDAO.maintanceFlownZone(filter, strOption);
    }
}
