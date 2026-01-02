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
import net.miatech.praxis.payment.MPF060Filter;
import net.miatech.praxis.payment.MPF060;

public class DuplicateSettlementsLogic {

    private final DuplicateSettlementsDAO DuplicateSettlementsDAO = new DuplicateSettlementsDAO();

    public void setSession(IServerSession ss) {
        DuplicateSettlementsDAO.setSession(ss);
    }

   public List<MPF060> loadMPS370(MPF060Filter filter) throws SQLException, Exception {
        return DuplicateSettlementsDAO.loadMPS370(filter);
    }
   
   public String loadMPS371_MPS372(List<MPF060> lst, MPF060Filter filter) throws SQLException, Exception {
        return DuplicateSettlementsDAO.loadMPS371_MPS372(lst, filter);
    }
   
   public List<MPF060> loadMPS439(MPF060Filter filter) throws SQLException, Exception {
        return DuplicateSettlementsDAO.loadMPS439(filter);
    }
   
   public List<MPF060> loadMPS373(MPF060Filter filter) throws SQLException, Exception {
        return DuplicateSettlementsDAO.loadMPS373(filter);
    }
   
   public String loadMPS374_MPS375(List<MPF060> lst, MPF060Filter filter) throws SQLException, Exception {
        return DuplicateSettlementsDAO.loadMPS374_MPS375(lst, filter);
    }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
}
