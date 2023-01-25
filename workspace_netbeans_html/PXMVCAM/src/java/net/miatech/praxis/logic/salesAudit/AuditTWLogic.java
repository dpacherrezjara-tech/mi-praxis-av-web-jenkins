/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP00768;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.AuditTWDAO;

/**
 *
 * @author jtorres
 */
public class AuditTWLogic {
    
    private AuditTWDAO auditTWDAO = new AuditTWDAO();

    public void setSession(IServerSession ss) {
        auditTWDAO.setSession(ss);
    }
    

    public String loadPX449SQP02560(SQP00768 filter) throws Exception {
        return auditTWDAO.loadPX449SQP02560(filter);
    }
    public List<SQP00768> loadPX282SQP02561(SQP00768 filter) throws Exception {
        return auditTWDAO.loadPX282SQP02561(filter);
    }
    public String loadPX449SQP02586(SQP00768 filter) throws Exception {
        return auditTWDAO.loadPX449SQP02586(filter);
    }
    public String loadPX449SQP02637(SQP00768 filter) throws Exception {
        return auditTWDAO.loadPX449SQP02637(filter);
    }
    public String loadPX449SQP03587(SQP00768 filter) throws Exception {
        return auditTWDAO.loadPX449SQP03587(filter);
    }

    public List<SQP00768> loadPX449SQP02655(String tabla, String codigo,String flag) throws SQLException, Exception {
        return auditTWDAO.loadPX449SQP02655(tabla, codigo,flag);
    }
    public List<SQP00768> loadPX449SQP02688() throws Exception {
        return auditTWDAO.loadPX449SQP02688();
    }
    public String loadPX449SQP02689(SQP00768 filter) throws Exception {
        return auditTWDAO.loadPX449SQP02689(filter);
    }
    public String loadPX449SQP02690(SQP00768 filter) throws Exception {
        return auditTWDAO.loadPX449SQP02690(filter);
    }
    public String loadPX449SQP02744(SQP00768 filter) throws Exception {
        return auditTWDAO.loadPX449SQP02744(filter);
    }
    public String loadPX449SQP02936(SQP00768 filter) throws Exception {
        return auditTWDAO.loadPX449SQP02936(filter);
    }
    public String loadPX449SQP002XXZZ(List<SQP00768> lstExcel) throws Exception {
        return auditTWDAO.loadPX449SQP002XXZZ(lstExcel);
    }
    public String loadPX449SQP02937(String ruta) throws Exception {
        return auditTWDAO.loadPX449SQP02937(ruta);
    }
    public String loadPX449SQP03744(String archivo) throws Exception {
        return auditTWDAO.loadPX449SQP03744(archivo);
    }
    
    
    
}
