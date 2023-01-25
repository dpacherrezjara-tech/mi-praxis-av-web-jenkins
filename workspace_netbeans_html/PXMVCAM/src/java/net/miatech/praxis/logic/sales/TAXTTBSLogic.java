/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX036S01A1549Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.TAXTTBSDAO;

/**
 *
 * @author lmendoza
 */
public class TAXTTBSLogic {

    private final TAXTTBSDAO taxTTBSDAO = new TAXTTBSDAO();

    public void setSession(IServerSession ss) {
        taxTTBSDAO.setSession(ss);

    }
     public  List<PX036S01A1549Filter> loadPX036S01A1549(PX036S01A1549Filter filter) throws SQLException,Exception {
        return taxTTBSDAO.loadPX036S01A1549(filter);
    }
  

}
