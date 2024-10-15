package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.logic.payments.AccountingReportLogic;
import net.miatech.praxis.payment.dto.SPACR001Filter;
import net.miatech.praxis.payment.dto.SPACR002Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author dvicente
 */
@Controller
@RequestMapping("/AccountingReport")
@Scope("request")
public class AccountingReportController {
    
    @Autowired
    private AccountingReportLogic logic;
    
    @Autowired
    private ExportUtils exportUtils;
    
    @RequestMapping(value = "loadMain")
    public ResponseEntity<?> loadMain(SPACR002Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadMain *****");
        SPACR002Filter filter = logic.loadSPACR002Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "processAccounting")
    public ResponseEntity<?> processAccounting(SPACR001Filter params) throws Exception {
        System.out.println("***** AccountingReport - processAccounting *****");
        logic.loadSPACR001Filter(params);
        return ResponseUtils.create();
    }
}
