package net.miatech.praxis.logic.payments;

import net.miatech.praxis.logic.interline.*;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.praxis.payment.filter.A2358Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.DuplicateSettlementsDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.payment.A2358;

public class DuplicateSettlementsLogic {

    private final DuplicateSettlementsDAO DuplicateSettlementsDAO = new DuplicateSettlementsDAO();

    public void setSession(IServerSession ss) {
        DuplicateSettlementsDAO.setSession(ss);
    }

   public List<A2358Filter> loadPX602SQP04601(A2358Filter filter) throws SQLException, Exception {
        return DuplicateSettlementsDAO.loadPX602SQP04601(filter);
    }
   
   public List<A2358Filter> loadPX602SQP04601Delete(A2358Filter filter) throws SQLException, Exception {
        return DuplicateSettlementsDAO.loadPX602SQP04601Delete(filter);
    }
   
   public A2358Filter loadPX602SQP04602(A2358Filter filter) throws Exception {
        return DuplicateSettlementsDAO.loadPX602SQP04602(filter);
    }
   
   public String loadPX602SQP04603(A2358 filter, String option) throws SQLException, Exception {
        return DuplicateSettlementsDAO.loadPX602SQP04603(filter, option);
    }
   
   public String loadPX287MPS106(List<A2358> lst, A2358 filter) throws SQLException, Exception {
        return DuplicateSettlementsDAO.loadPX287MPS106(lst, filter);
    }
   
   public String loadPX287MPS106Reverse(List<A2358> lst, A2358 filter) throws SQLException, Exception {
        return DuplicateSettlementsDAO.loadPX287MPS106Reverse(lst, filter);
    }
}
