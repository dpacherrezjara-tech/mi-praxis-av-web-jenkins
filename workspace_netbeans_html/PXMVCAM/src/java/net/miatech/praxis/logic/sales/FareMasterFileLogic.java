/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX030S01A1565Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.dao.sales.FareMasterFileDAO;

/**
 *
 * @author lmendoza
 */
public class FareMasterFileLogic {

    private final FareMasterFileDAO fareMasterFileDAO = new FareMasterFileDAO();
    private MasterDAO masterDAO = new MasterDAO();

    public void setSession(IServerSession ss) {
        fareMasterFileDAO.setSession(ss);
        masterDAO.setSession(ss);

    }

    public List<A1007> getCities() throws Exception {

        List<A1007> lstCiudades = masterDAO.loadCiudades();
        return lstCiudades;
    }

    public List<A1007> getCities2() throws Exception {

        List<A1007> lstCiudades = masterDAO.loadCiudades2();
        return lstCiudades;
    }

    public List<PX030S01A1565Filter> loadPX030S01A1565(PX030S01A1565Filter filter) throws SQLException, Exception {
        return fareMasterFileDAO.loadPX030S01A1565(filter);
    }
}
