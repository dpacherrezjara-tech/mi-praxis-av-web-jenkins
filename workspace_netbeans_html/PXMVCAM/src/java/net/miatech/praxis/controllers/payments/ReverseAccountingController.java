package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.logic.payments.ReverseAccountingLogic;
import net.miatech.praxis.payment.dto.SPRAC001Filter;
import net.miatech.praxis.payment.dto.SPRAC002Filter;
import net.miatech.praxis.payment.dto.SPRAC003Filter;
import net.miatech.praxis.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author dvicente
 */
@Controller
@RequestMapping("/ReverseAccounting")
@Scope("request")
public class ReverseAccountingController {
    
    @Autowired
    private ReverseAccountingLogic logic;
    
    @RequestMapping(value = "loadMain")
    public ResponseEntity<?> loadMain(SPRAC001Filter params) throws Exception {
        System.out.println("***** ReverseAccounting - loadMain *****");
        SPRAC001Filter filter = logic.loadSPRAC001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "reverseAccBandoc")
    public ResponseEntity<?> reverseAccBandoc(@RequestBody SPRAC002Filter params) throws Exception {
        System.out.println("***** ReverseAccounting - reverseAccBandoc *****");
        logic.loadSPRAC002Filter(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "loadBandocs")
    public ResponseEntity<?> loadBandocs(SPRAC003Filter params) throws Exception {
        System.out.println("***** ReverseAccounting - loadBandocs *****");
        SPRAC003Filter filter = logic.loadSPRAC003Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
}
