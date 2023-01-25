/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.gerencial;

import java.util.List;
import net.miatech.beans.SQP00768;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.dao.gerencial.BusinessToolsDAO;

/**
 *
 * @author lmendoza
 */
public class BusinessToolsLogic {

    private final BusinessToolsDAO businessToolsDAO = new BusinessToolsDAO();

    public void setSession(IServerSession ss) {
        businessToolsDAO.setSession(ss);
    }

    public List<A1248> loadPX275SQP01033(String tabla1, String tabla2) throws Exception {
        return businessToolsDAO.loadPX275SQP01033(tabla1, tabla2);
    }

    public List<A1248> loadFiles(String tabla) throws Exception {
        return businessToolsDAO.loadFiles(tabla);
    }

    public List<SQP00768> loadPX275SQP01034(String tabla1) throws Exception {
        return businessToolsDAO.loadPX275SQP01034(tabla1);
    }

    public List<SQP00768> loadPXPRUEBA(SQP00768 filter) throws Exception {
        return businessToolsDAO.loadPXPRUEBA(filter);
    }

    public List<SQP00768> loadPXPRUEBA2(SQP00768 filter) throws Exception {
        return businessToolsDAO.loadPXPRUEBA2(filter);
    }

    public String loadPX282SQP00777(SQP00768 filter) throws Exception {
        return businessToolsDAO.loadPX282SQP00777(filter);
    }

    public List<SQP00768> loadPX282SQP00808(String tabla, String codigo) throws Exception {
        return businessToolsDAO.loadPX282SQP00808(tabla, codigo);
    }

    public List<A1248> loadOperadores() throws Exception {
        return businessToolsDAO.loadOperadores();
    }
    
    public SQP00768 executeValuation(SQP00768 filter) throws Exception {
        return businessToolsDAO.executeValuation(filter);
    }

}
