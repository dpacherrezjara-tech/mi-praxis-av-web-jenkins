/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.EstimationReverseProcessDAO;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.A2016Filter;
import net.miatech.beans.A2017Filter;
import net.miatech.beans.A2056Filter;
import net.miatech.praxis.A2016;

/**
 *
 * @author lmendoza
 */
public class EstimationReverseProcessLogic {

    private final EstimationReverseProcessDAO estimationReverseProcessDAO = new EstimationReverseProcessDAO();

    public void setSession(IServerSession ss) {
        estimationReverseProcessDAO.setSession(ss);

    }

    //Browser
    public List<A2017Filter> loadPX251S01A2017(A2017Filter filter) throws SQLException, Exception {
        return estimationReverseProcessDAO.loadPX251S01A2017(filter);
    }

    //Lista Cuentas
    public List<A2016> loadPX251S01A2016(A2017Filter filter) throws SQLException, Exception {
        return estimationReverseProcessDAO.loadPX251S01A2016(filter);
    }

    //CRUDs 
    //Cabecera
    public String CRUDPX180S02A1843(A2017Filter filter, String strOption) throws SQLException, Exception {
        return estimationReverseProcessDAO.CRUDPX251S02A2017(filter, strOption);
    }

    //Estimados
    public String CRUDPX180S02A1822(A2016 filter, String strOption) throws SQLException, Exception {
        return estimationReverseProcessDAO.CRUDPX251S02A2016(filter, strOption);
    }

    //Lista NRO GRUPO 
    public List<A2017Filter> loadPX251S03A2017() throws SQLException, Exception {
        return estimationReverseProcessDAO.loadPX251S03A2017();
    }

    //Lista CUENTAS
    public List<A1740Filter> loadCuentas() throws SQLException, Exception {
        return estimationReverseProcessDAO.loadCuentas();
    }

    //Reversa
    public String Reversa(List<A2017Filter> filter) throws SQLException, Exception {
        return estimationReverseProcessDAO.Reversa(filter);
    }

    //Estimados
    public String Estimados(List<A2017Filter> filter) throws SQLException, Exception {
        return estimationReverseProcessDAO.Estimados(filter);
    }

    //Polizas Procesadas
    public List<A2056Filter> loadResultadoDownload(String filter) throws SQLException, Exception {
        return estimationReverseProcessDAO.loadResultadoDownload(filter);
    }

    public List<A2056Filter> getTramaFile(A2056Filter filter) throws SQLException, Exception {
        return estimationReverseProcessDAO.getTramaFile(filter);
    }

}
