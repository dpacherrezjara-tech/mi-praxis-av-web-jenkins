/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.A003;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.dao.sales.AgentsMasterFileDAO;

/**
 *
 * @author lmendoza
 */
public class AgentsMasterFileLogic {

    private final AgentsMasterFileDAO agentsMasterFileDAO = new AgentsMasterFileDAO();
    private final MasterDAO masterDAO = new MasterDAO();

    public void setSession(IServerSession ss) {
        agentsMasterFileDAO.setSession(ss);
        masterDAO.setSession(ss);

    }

    public List<A003> loadAgentReport(A003 filter) throws SQLException, Exception {
        return agentsMasterFileDAO.loadAgentReport(filter);
    }

    public A003 loadAgentCompleteData(A003 filter) throws SQLException, Exception {
        return agentsMasterFileDAO.loadAgentCompleteData(filter);
    }

    public List<A1007> loadCiudades3() throws SQLException, Exception {
        return masterDAO.loadCiudades3();
    }

    public List<A006> loadPaises() throws SQLException, Exception {
        return masterDAO.loadPaises();
    }

    public A003 setPX018S03A003(A003 filter) throws SQLException, Exception {
        return agentsMasterFileDAO.setPX018S03A003(filter);
    }
    
    public int ValidationDownload(A003 filter) throws SQLException, Exception {
        return agentsMasterFileDAO.ValidationDownload(filter);
    }
}
