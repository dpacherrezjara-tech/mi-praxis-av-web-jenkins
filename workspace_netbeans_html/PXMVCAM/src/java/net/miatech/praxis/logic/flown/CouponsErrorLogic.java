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
import net.miatech.praxis.dao.flown.CouponsErrorDAO;

/**
 *
 * @author lmendoza
 */
public class CouponsErrorLogic {

    private final CouponsErrorDAO couponsErrorDAO = new CouponsErrorDAO();

    public void setSession(IServerSession ss) {
        couponsErrorDAO.setSession(ss);

    }

    public List<A1692Filter> loadPX091SQP0006(A1692Filter filter, HashMap<String, String> hmPaises, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return couponsErrorDAO.loadPX091SQP0006(filter, hmPaises, hmAeropuertos);
    }

    public A1692Filter loadPX095S06A1692(String strTicket, String strSeq, HashMap<String, String> hmAeropuertos, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return couponsErrorDAO.loadPX095S06A1692(strTicket, strSeq, hmAeropuertos, hmPaises);
    }

    public String loadPX095S08VALID(UserView user, A1692Filter filter, String flag) throws SQLException, Exception {
        return couponsErrorDAO.loadPX095S08VALID(user, filter, flag);
    }

}
