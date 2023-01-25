/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.discharges;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX544S01A3963Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.discharges.ObservedCouponsDAO;

/**
 *
 * @author jmeiggs
*/
public class ObservedCouponsLogic {

    private final ObservedCouponsDAO couponRegistrationDAO = new ObservedCouponsDAO();

    public void setSession(IServerSession ss) {
        couponRegistrationDAO.setSession(ss);

    }

    public List<PX544S01A3963Filter> loadPX549S01A1747(PX544S01A3963Filter filter) throws SQLException, Exception {
        return couponRegistrationDAO.loadPX549S01A1747(filter);
    }

}
