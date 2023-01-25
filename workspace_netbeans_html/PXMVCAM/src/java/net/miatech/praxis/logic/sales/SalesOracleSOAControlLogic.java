/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import net.miatech.praxisbi.filter.A3701Filter;
import net.miatech.praxisbi.filter.A3702Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.SalesOracleSOAControlDAO;
import java.util.List;
/**
 *
 * @author asifuentes
 */
public class SalesOracleSOAControlLogic {

    private final SalesOracleSOAControlDAO objDAO = new SalesOracleSOAControlDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);

    }

    public List<A3701Filter> SQP03245(A3701Filter filter) throws SQLException, Exception
    {
        return objDAO.SQP03245(filter);
    }

    public String SQP03246(A3701Filter filter) throws SQLException, Exception
    {
        return objDAO.SQP03246(filter);
    }
    
    public List<A3702Filter> SQP03247(A3701Filter filter) throws SQLException, Exception
    {
        return objDAO.SQP03247(filter);
    }
    
    public String SQP03248(A3701Filter filter) throws SQLException, Exception
    {
        return objDAO.SQP03248(filter);
    }
}
