package net.miatech.praxis.controllers.payments;

import java.util.List;
import net.miatech.praxis.logic.payments.AccountingReportLogic;
import net.miatech.praxis.payment.dto.SPACR001Filter;
import net.miatech.praxis.payment.dto.SPACR002Filter;
import net.miatech.praxis.payment.dto.SPACR005Filter;
import net.miatech.praxis.payment.dto.SPACR006Filter;
import net.miatech.praxis.payment.dto.SPACR007Filter;
import net.miatech.praxis.payment.dto.SPACR008Filter;
import net.miatech.praxis.payment.filter.SQP05233Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
    
    @RequestMapping(value = "loadErrors")
    public ResponseEntity<?> loadErrors(SPACR006Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadErrors *****");
        SPACR006Filter filter = logic.loadSPACR006Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadLogCont")
    public ResponseEntity<?> loadLogCont(SPACR007Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadLogCont *****");
        SPACR007Filter filter = logic.loadSPACR007Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    

    @RequestMapping(value = "downloadAccounting",method = RequestMethod.POST)
    public ResponseEntity<?> downloadAccounting(@RequestBody SQP05233Filter filter) throws Exception {
        System.out.println("***** AccountingReport - downloadAccounting *****");
        logic.loadSQP05233Filter(filter);
        return ResponseUtils.ok(filter);
	}

     @RequestMapping(value = "reverseAccounting",method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody SPACR005Filter params) throws Exception {
        System.out.println("***** AccountingReport - reverseAccounting *****");
        logic.loadSPACR005Filter(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "processAccounting",method = RequestMethod.POST)
    public ResponseEntity<?> processAccounting(@RequestBody SPACR001Filter params) throws Exception {
        System.out.println("***** AccountingReport - processAccounting *****");
        logic.loadSPACR001Filter(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "reverseSingleBandoc",method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody SPACR008Filter params) throws Exception {
        System.out.println("***** AccountingReport - reverseSingleBandoc *****");
        logic.loadSPACR008Filter(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "reverseMassiveBandoc",method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody List<SPACR008Filter> lst) throws Exception {
        System.out.println("***** AccountingReport - reverseMassiveBandoc *****");
        logic.loadSPACR008FilterMasive(lst);
        return ResponseUtils.create();
    }
}
