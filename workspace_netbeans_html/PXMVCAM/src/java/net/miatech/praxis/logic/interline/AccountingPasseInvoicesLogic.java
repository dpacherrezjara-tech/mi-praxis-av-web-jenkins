    /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.interline;

import java.util.List;
import net.miatech.beans.A1964Filter;
import net.miatech.beans.A1965Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.AccountingPasseInvoicesDAO;
import net.miatech.praxis.interline.filter.SFI020Filter;
import net.miatech.praxis.interline.filter.SFI100Filter;

/**
 *
 * @author lmendoza
 */
public class AccountingPasseInvoicesLogic {

    private final AccountingPasseInvoicesDAO passengerInvoicesDAO = new AccountingPasseInvoicesDAO();

    public void setSession(IServerSession ss) {
        passengerInvoicesDAO.setSession(ss);

    }
    
    public List<SFI100Filter> SQP04008(SFI100Filter filter) throws Exception {
        return passengerInvoicesDAO.SQP04008(filter);
    }
    
    public List<A1964Filter> SQP04010(SFI100Filter filter) throws Exception {
        return passengerInvoicesDAO.SQP04010(filter);
    }
    
    public List<A1965Filter> SQP04011(SFI100Filter filter) throws Exception {
        return passengerInvoicesDAO.SQP04011(filter);
    }
    
    public List<SFI100Filter> SQP03987(SFI100Filter filter) throws Exception {
        return passengerInvoicesDAO.SQP03987(filter);
    }
    
    
    // --------------------------------------------------------------------------------------------------------------------------
    
    public List<A1964Filter> loadPX538(A1964Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX538(filter);
    }
    
    public List<A1965Filter> loadPX538_Xpagar(A1964Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX538_Xpagar(filter);
    }
    
    public List<SFI020Filter> loadPX538_excel(SFI020Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX538_excel(filter);
    }
}
