/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import net.miatech.praxisbi.A1955Filter;
import net.miatech.praxisbi.A1956;
import net.miatech.praxisbi.A2160;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.SalesOracleAcknowledgementDAO;
import java.util.List;
/**
 *
 * @author asifuentes
 */
public class SalesOracleAcknowledgementLogic {
    private SalesOracleAcknowledgementDAO objDAO = new SalesOracleAcknowledgementDAO();
    
    public void setSession(IServerSession ss) {                
        objDAO.setSession(ss);
    }

    public List<A1955Filter> loadPX247S01A1955(A1955Filter filter) throws SQLException, Exception
    {
        return objDAO.loadPX247S01A1955(filter);
    }

    public String loadPX247S02A1955(A1955Filter filter) throws SQLException, Exception{
        return objDAO.loadPX247S02A1955(filter);
    }
    
    public List<A1956> loadPX247S01A1956(A1955Filter filter) throws SQLException, Exception
    {
        return objDAO.loadPX247S01A1956(filter);
    }  
    
    public List<A2160> loadPX247S01A2160(A1956 filter) throws SQLException, Exception
    {
        return objDAO.loadPX247S01A2160(filter);
    }
    
    public String insPX247S03A1955(A1955Filter filter) throws SQLException, Exception{
         return objDAO.insPX247S03A1955(filter);
    }
    
    public List<A1955Filter> SQP01206(A1955Filter filter) throws SQLException, Exception
    {
        return objDAO.SQP01206(filter);
    }
    
    public List<A1955Filter> SQP01252(A1955Filter filter) throws SQLException, Exception
    {
        return objDAO.SQP01252(filter);
    }
    
}