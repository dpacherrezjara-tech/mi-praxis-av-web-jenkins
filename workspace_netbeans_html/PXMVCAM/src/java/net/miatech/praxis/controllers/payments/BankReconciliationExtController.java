package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.logic.payments.BankReconciliationExtLogic;
import net.miatech.praxis.payment.dto.SPBSR001Filter;
import net.miatech.praxis.payment.dto.SPBSR002Filter;
import net.miatech.praxis.payment.dto.SPBSR003Filter;
import net.miatech.praxis.payment.dto.SPBSR004Filter;
import net.miatech.praxis.payment.dto.SPBSR005Filter;
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
@RequestMapping("/BankReconciliationExt")
@Scope("request")
public class BankReconciliationExtController {
    
    @Autowired
    private BankReconciliationExtLogic logic;
    
    @Autowired
    private ExportUtils exportUtils;
    
    @RequestMapping(value = "loadBankStatements")
    public ResponseEntity<?> loadStatements(SPBSR001Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadStatements *****");
        SPBSR001Filter filter = logic.loadSPBSR001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadStatementInfo")
    public ResponseEntity<?> loadStatementInfo(SPBSR002Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadStatementInfo *****");
        SPBSR002Filter filter = logic.loadSPBSR002Filter(params);
        System.out.println("Item Found");
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadSettlements")
    public ResponseEntity<?> loadSettlements(SPBSR003Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadSettlements *****");
        SPBSR003Filter filter = logic.loadSPBSR003Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadSettlementInfo")
    public ResponseEntity<?> loadSettlementInfo(SPBSR004Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadSettlementInfo *****");
        SPBSR004Filter filter = logic.loadSPBSR004Filter(params);
        System.out.println("Item Found");
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadSettlementScanner")
    public ResponseEntity<?> loadSettlementScanner(SPBSR005Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadSettlementScanner *****");
        SPBSR005Filter filter = logic.loadSPBSR005Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
}
