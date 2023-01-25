/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.LinkOCRDAO;

/**
 *
 * @author lmendoza
 */
public class LinkOCRLogic {

    private final LinkOCRDAO linkOCRDAO = new LinkOCRDAO();

    public void setSession(IServerSession ss) {
        linkOCRDAO.setSession(ss);
    }

    public String loadPX095SQP00155( A1692Filter filter, String flag) throws SQLException, Exception {
        return linkOCRDAO.loadPX095SQP00155( filter, flag);
    }

    public String loadPX095S08VALID( A1692Filter filter, String flag) throws SQLException, Exception {
        return linkOCRDAO.loadPX095S08VALID( filter, flag);
    }

    public String loadPX083SQP0069(A1692Filter filter, String strOption ) throws SQLException, Exception {
        return linkOCRDAO.loadPX083SQP0069(filter, strOption);
    }

    public String loadPX083SQP0070( A1692Filter filter) throws SQLException, Exception {
        return linkOCRDAO.loadPX083SQP0070( filter);
    }

    public String loadPX095SQP0071(A1692Filter filter ) throws SQLException, Exception {
        return linkOCRDAO.loadPX095SQP0071(filter);
    }

    public String loadPX095S12QCAL( A1692Filter filter, String recalculo) throws SQLException, Exception {
        return linkOCRDAO.loadPX095S12QCAL( filter, recalculo);
    }

    public String loadPX187_SQP00118(A1692Filter filter, String fechaScan, String img) throws SQLException, Exception {
        return linkOCRDAO.loadPX187_SQP00118(filter, fechaScan, img);
    }
    
    public String loadPX187_SQP02435(A1692Filter filter, String fechaScan, String img) throws SQLException ,Exception{
        return linkOCRDAO.loadPX187_SQP02435(filter, fechaScan, img);
    }


}
