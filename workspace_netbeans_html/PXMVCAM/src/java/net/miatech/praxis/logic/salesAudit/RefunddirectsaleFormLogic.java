/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2728Filter;
import net.miatech.beans.SaleAudit.SQP00957Filter;
import net.miatech.beans.SaleAudit.SQP00964Filter;
import net.miatech.beans.SaleAudit.SQP00976Filter;
import net.miatech.beans.SaleAudit.SQP00977Filter;
import net.miatech.beans.SaleAudit.SQP01064Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RefunddirectsaleFormDAO;

/**
 *
 * @author zperez
 */
public class RefunddirectsaleFormLogic {

    private RefunddirectsaleFormDAO RefunddireDAO = new RefunddirectsaleFormDAO();

    public void setSession(IServerSession ss) {
        RefunddireDAO.setSession(ss);
    }

    public List<SQP00957Filter> search(SQP00957Filter filter) throws SQLException, Exception {
        return RefunddireDAO.search(filter);
    }

    public List<SQP00964Filter> searchExch1(SQP00964Filter filter) throws SQLException, Exception {
        return RefunddireDAO.searchExch1(filter);
    }

    public List<SQP00976Filter> searchExch2(SQP00976Filter filter) throws SQLException, Exception {
        return RefunddireDAO.searchExch2(filter);
    }

    public String ProcesarSale(SQP00957Filter filter) throws SQLException, Exception {
        return RefunddireDAO.ProcesarSale(filter);
    }

    public String ProcesarExch1(SQP00964Filter filter) throws SQLException, Exception {
        return RefunddireDAO.ProcesarExch1(filter);
    }

    public String ProcesarExch2(SQP00976Filter filter) throws SQLException, Exception {
        return RefunddireDAO.ProcesarExch2(filter);
    }

    public String ProcesarTKTATOS(SQP00977Filter filter) throws SQLException, Exception {
        return RefunddireDAO.ProcesarTKTATOS(filter);
    }

    public List<SQP00977Filter> searchTKTATOS(SQP00977Filter filter) throws SQLException, Exception {
        return RefunddireDAO.searchTKTATOS(filter);
    }

    public String ProcesarTKTIATAS(A2728Filter filter) throws SQLException, Exception {
        return RefunddireDAO.ProcesarTKTIATAS(filter);
    }

    public List<A2728Filter> searchTKTIATAS(A2728Filter filter) throws SQLException, Exception {
        return RefunddireDAO.searchTKTIATAS(filter);
    }

    public List<SQP01064Filter> searchRefund(SQP00957Filter filter) throws SQLException, Exception {
        return RefunddireDAO.searchRefund(filter);
    }

    public List<SQP01064Filter> ProcesarRefund(SQP00957Filter filter) throws SQLException, Exception {
        return RefunddireDAO.ProcesarRefund(filter);
    }

}
