/*
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : ConciliationASRLogic                              *
 * Created on : 21-09-2016, 19:28:01                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 21-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX031S02PXF050Filter;
import net.miatech.beans.PX031S03A1530Filter;
import net.miatech.beans.PX108S02PXF053Filter;
import net.miatech.beans.PX108S03A1530Filter;
import net.miatech.beans.PXF051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.PXF053;
import net.miatech.praxis.dao.sales.ConciliationASRDAO;

/**
 *
 * @author rmayta
 */
public class ConciliationASRLogic {
    private ConciliationASRDAO conciliationASRDAO = new ConciliationASRDAO();

    public void setSession(IServerSession ss) {
        conciliationASRDAO.setSession(ss);
    }
    public List<PXF051Filter> loadPXF051(PXF051Filter filter) throws SQLException, Exception {
        return conciliationASRDAO.loadPXF051(filter);
    }
    public void insertPXF051(PXF051Filter filter) throws SQLException, Exception {
        conciliationASRDAO.insertPXF051(filter);
    }

    public void updatePXF051(PXF051Filter filter) throws SQLException, Exception {
        conciliationASRDAO.updatePXF051(filter);
    }
    public List<PX108S02PXF053Filter> loadPX108S02PXF053(PX108S02PXF053Filter filter) throws SQLException, Exception {
        return conciliationASRDAO.loadPX108S02PXF053(filter);
    }
    public List<PX031S03A1530Filter> loadPX031S03A1530(PX031S03A1530Filter filter) throws SQLException, Exception {
        return conciliationASRDAO.loadPX031S03A1530(filter);
    }
    public List<PX108S03A1530Filter> loadPX108S03A1530(PX108S03A1530Filter filter) throws SQLException, Exception {
        return conciliationASRDAO.loadPX108S03A1530(filter);
    }
    public void loadSQP00275(PXF053 filter) throws SQLException, Exception {
        conciliationASRDAO.loadSQP00275(filter);
    }
    public List<PX031S02PXF050Filter> loadPX031S02PXF050(PX031S02PXF050Filter filter) throws SQLException, Exception {
        return conciliationASRDAO.loadPX031S02PXF050(filter);
    }
}
