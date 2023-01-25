/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.widgets;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1526Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.PRORATEFilter;
import net.miatech.beans.S0001A713Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A720;
import net.miatech.praxis.dao.widgets.ProrateDAO;
/**
 *
 * @author jjulca
 */
public class ProrateLogic {
    private ProrateDAO loadProrateDAO = new ProrateDAO();
    
    public ProrateLogic(){    
    }
    
    public ProrateLogic(IServerSession ss) {
        loadProrateDAO.setSession(ss);
    }
    
    public void setSession(IServerSession ss) {
        loadProrateDAO.setSession(ss);
    }
    
    public S0001A713Filter searchA720Data(S0001A713Filter filter) throws SQLException, Exception {
        return loadProrateDAO.searchA720Data(filter);
    }
    
    public List<S0001A713Filter> searchA720ListaCupon(S0001A713Filter filter) throws SQLException, Exception {
        return loadProrateDAO.searchA720ListaCupon(filter);
    }
    
    public S0001A713Filter searchA713Data(S0001A713Filter filter) throws SQLException, Exception {
        return loadProrateDAO.searchA713Data(filter);
    }
    
    public List<S0001A713Filter> searchA713ListaCupon(S0001A713Filter filter) throws SQLException, Exception {
        return loadProrateDAO.searchA713ListaCupon(filter);
    }
    
    public A1526Filter searchA1526(A1526Filter filter) throws SQLException, Exception {
        return loadProrateDAO.searchA1526(filter);
    }
    
    public String searchDeliveryRFND(FACSIMILFilter filter, String fuente) throws SQLException, Exception {
        return loadProrateDAO.searchDeliveryRFND(filter, fuente);
    }
    
    public String SQP03439(S0001A713Filter filter) throws SQLException, Exception {
        return loadProrateDAO.SQP03439(filter);
    }
    
    public String SQP03440(S0001A713Filter filter) throws SQLException, Exception {
        return loadProrateDAO.SQP03440(filter);
    }
    
    public List<S0001A713Filter> SQP03441(S0001A713Filter filter) throws SQLException, Exception {
        return loadProrateDAO.SQP03441(filter);
    }
    
    public List<A720> prorateoTicket(PRORATEFilter beanProrate) throws SQLException, Exception {
        return loadProrateDAO.prorateoTicket(beanProrate);
    }
}
