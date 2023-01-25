/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1686Filter;
import net.miatech.beans.A1690Filter;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1693Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.InputsControlDAO;
import net.miatech.praxis.flown.A1419;
import net.miatech.praxis.flown.A1687;
import net.miatech.praxis.flown.A1688;
import net.miatech.praxis.flown.A1689;
import net.miatech.praxis.interline.filter.A1413Filter;

/**
 *
 * @author lmendoza
 */
public class InputsControlLogic {

    private final InputsControlDAO inputsControlDAO = new InputsControlDAO();

    public void setSession(IServerSession ss) {
        inputsControlDAO.setSession(ss);

    }
    
    public List<A1686Filter> loadPX077S14A1910(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S14A1910(filter);
    }

    public List<A1686Filter> loadPX077S01A1686(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S01A1686(filter);
    }

    public List<A1686Filter> loadPX077S03A1686(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S03A1686(filter);
    }

    public List<A1686Filter> loadPX077S02A1686(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S02A1686(filter);
    }
    
    public List<A1413Filter> loadPX077SQP03979(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077SQP03979(filter);
    }
    
    public List<A1686Filter> loadPX077S04A1696(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S04A1696(filter);
    }

    public List<A1687> loadPX077S05A1687(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S05A1687(filter);
    }

    public List<A1688> loadPX077S06A1688(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S06A1688(filter);
    }

    public List<A1689> loadPX077S07A1689(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S07A1689(filter);
    }

    public List<A1689> loadPX077S09A1413(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S09A1413(filter);
    }

    public List<A1419> loadPX077S11A1419(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S11A1419(filter);
    }

    public List<A1686Filter> loadPX077S12A1690(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S12A1690(filter);
    }

    public List<A1690Filter> loadPX077S08A1690(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S08A1690(filter);
    }

    public List<A1688> loadPX077S06A2735(A1686Filter filter) throws SQLException, Exception {
        return inputsControlDAO.loadPX077S06A2735(filter);
    }

    public List<A1693Filter> loadPX077S10A1686(A1691Filter filter) throws SQLException , Exception{
        return inputsControlDAO.loadPX077S10A1686_PRUEBA(filter);
    }
    
    public List<A1686Filter> loadPX077S13A1910(A1686Filter filter) throws SQLException , Exception{
        return inputsControlDAO.loadPX077S13A1910(filter);
    }
    


}
