/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.dao.sales.SalesReportFormDemoDAO;

/**
 *
 * @author lremicio
 */
public class SalesReportFormDemoLogic {
    
    private SalesReportFormDemoDAO objDAO = new SalesReportFormDemoDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A006> loadCountryMasterFile(A006 filter)throws Exception {
        return objDAO.loadCountryMasterFile( filter);
    }
    
    public HashMap setMaintanceA006(A006 filter, String strOption, String strCampo) throws Exception  {
        return objDAO.setMaintanceA006(filter,strOption,strCampo);
    }
    
    public List get_AuditData_A006(String keyTable, String Table)throws Exception {
        return objDAO.get_AuditData_A006( keyTable, Table );
    }
    
}
