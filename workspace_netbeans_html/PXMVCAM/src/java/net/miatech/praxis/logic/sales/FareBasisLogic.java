/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.beans.PX019S01A721Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.FareBasisDAO;
import net.miatech.praxis.dao.sales.MinimunRuleDAO;

/**
 *
 * @author lmendoza
 */
public class FareBasisLogic {

    private final FareBasisDAO fareBasisDAO = new FareBasisDAO();

    public void setSession(IServerSession ss) {
        fareBasisDAO.setSession(ss);

    }

    public List<PX019S01A721Filter> loadPX019S01A721(PX019S01A721Filter filter) throws SQLException, Exception {
        return fareBasisDAO.loadPX019S01A721(filter);
    }

    public int ValidationDownload(PX019S01A721Filter filter) throws SQLException, Exception {
        return fareBasisDAO.ValidationDownload(filter);
    }
    
}
