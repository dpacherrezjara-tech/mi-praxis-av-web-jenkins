/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.ChangeCouponStatusDAO;

/**
 *
 * @author lmendoza
 */
public class ChangeCouponStatusLogic {

    private final ChangeCouponStatusDAO changeCouponStatusDAO = new ChangeCouponStatusDAO();

    public void setSession(IServerSession ss) {
        changeCouponStatusDAO.setSession(ss);
    }

    public List<A1692Filter> loadPX067S01A1692(A1692Filter filter, HashMap<String, String> hmPaises, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return changeCouponStatusDAO.loadPX067S01A1692(filter, hmPaises, hmAeropuertos);
    }

    public List<A1692Filter> loadPX067S04A1792(A1692Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return changeCouponStatusDAO.loadPX067S04A1792(filter, hmAeropuertos);
    }

    public A1692Filter loadPX095S06A1692(String strTicket, String strSeq, HashMap<String, String> hmAeropuertos, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return changeCouponStatusDAO.loadPX095S06A1692(strTicket, strSeq, hmAeropuertos, hmPaises);
    }
    public String loadPX067S02A1692(A1692Filter filter, String strOption, UserView user) throws SQLException, Exception {
        return changeCouponStatusDAO.loadPX067S02A1692(filter, strOption, user);
    }
    
    public String loadPX095S12QCAL(UserView user, A1692Filter filter, String recalculo) throws SQLException, Exception {
        return changeCouponStatusDAO.loadPX095S12QCAL(user, filter, recalculo);
    }
}
