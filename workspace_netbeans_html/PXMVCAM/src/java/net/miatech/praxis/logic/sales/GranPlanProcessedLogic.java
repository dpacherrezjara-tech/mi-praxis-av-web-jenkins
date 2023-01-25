/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1789Filter;
import net.miatech.beans.PX124S01A1789Filter;
import net.miatech.beans.PX125S01A1802Filter;
import net.miatech.beans.SQP00112Filter;
import net.miatech.beans.SQP00168Filter;
import net.miatech.beans.SQP00169Filter;
import net.miatech.beans.SQP01170Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.dao.sales.GranPlanProcessedDAO;
/**
 *
 * @author Pool
 */
public class GranPlanProcessedLogic {
    private GranPlanProcessedDAO commGPDAO = new GranPlanProcessedDAO();

    public void setSession(IServerSession ss) {
        commGPDAO.setSession(ss);
    }

    public List<PX124S01A1789Filter> loadPX124S01A1789(PX124S01A1789Filter filter) throws SQLException, Exception {
        return commGPDAO.loadPX124S01A1789(filter);
    }

    public List<PX125S01A1802Filter> loadPX125S01A1802(PX125S01A1802Filter filter) throws SQLException, Exception {
        return commGPDAO.loadPX125S01A1802(filter);
    }

    public String get_ObtenerIATA(String VP_OPTION, String VP_PARAM) throws SQLException, Exception {
        return commGPDAO.get_ObtenerIATA(VP_OPTION, VP_PARAM);
    }

    public SQP00112Filter setSQP00112(SQP00112Filter filter) throws SQLException, Exception {
        return commGPDAO.setSQP00112(filter);
    }

    public SQP00168Filter set_SQP00168(SQP00168Filter filter) throws SQLException, Exception {
        return commGPDAO.set_SQP00168(filter);
    }

    public List<SQP00169Filter> get_SQP00169(SQP00169Filter filter) throws SQLException, Exception {
        return commGPDAO.get_SQP00169(filter);
    }

    public void setSQP01117(A1789Filter filter) throws SQLException, Exception {
        commGPDAO.setSQP01117(filter);
    }

    public List<SQP01170Filter> loadSQP01170(SQP01170Filter filter) throws SQLException, Exception {
        return commGPDAO.loadSQP01170(filter);
    }
}
