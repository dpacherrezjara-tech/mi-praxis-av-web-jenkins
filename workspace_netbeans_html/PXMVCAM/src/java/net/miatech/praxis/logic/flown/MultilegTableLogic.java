/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1737Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.dao.flown.MultilegTableDAO;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.flown.A1737;

/**
 *
 * @author lmendoza
 */
public class MultilegTableLogic {

    private MultilegTableDAO multilegTableDAO = new MultilegTableDAO();
    private MasterDAO masterDAO = new MasterDAO();

    public void setSession(IServerSession ss) {
        multilegTableDAO.setSession(ss);
        masterDAO.setSession(ss);
    }

    public List<A1007> getCities() throws Exception {

        List<A1007> lstCiudades = masterDAO.loadCiudades();
        return lstCiudades;
    }

    public List<A1737Filter> loadPX103S01A1737(A1737Filter filter, HashMap<String, String> hmAeropuertos) throws Exception {
        return multilegTableDAO.loadPX103S01A1737(filter, hmAeropuertos);
    }

    public String loadPX103S03A1737(A1737 filter, String option) throws SQLException, Exception {
        return multilegTableDAO.loadPX103S03A1737(filter, option);
    }

}
