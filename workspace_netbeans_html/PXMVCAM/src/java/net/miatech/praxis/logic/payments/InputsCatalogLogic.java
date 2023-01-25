package net.miatech.praxis.logic.payments;

import net.miatech.praxis.logic.interline.*;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.praxis.payment.filter.A2358Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.InputsCatalogDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.payment.A2358;

public class InputsCatalogLogic {

    private final InputsCatalogDAO InputsCatalogDAO = new InputsCatalogDAO();

    public void setSession(IServerSession ss) {
        InputsCatalogDAO.setSession(ss);
    }

   public List<A2358Filter> loadPX602SQP04601(A2358Filter filter) throws SQLException, Exception {
        return InputsCatalogDAO.loadPX602SQP04601(filter);
    }
   
   public A2358Filter loadPX602SQP04602(A2358Filter filter) throws Exception {
        return InputsCatalogDAO.loadPX602SQP04602(filter);
    }
   
   public String loadPX602SQP04603(A2358 filter, String option) throws SQLException, Exception {
        return InputsCatalogDAO.loadPX602SQP04603(filter, option);
    }
}
