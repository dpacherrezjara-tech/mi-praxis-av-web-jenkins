/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.DetalleSaldoDAO;
import net.miatech.praxis.eecta.SQP04000Filter;
/**
 *
 * @author vhidalgo
 */
public class DetalleSaldoLogic {
    private DetalleSaldoDAO objDAO = new DetalleSaldoDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP04000Filter> getSQP04000(SQP04000Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04000(filter);
    }
}
