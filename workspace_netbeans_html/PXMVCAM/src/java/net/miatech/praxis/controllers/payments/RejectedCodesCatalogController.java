package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.logic.payments.RejectedCodesCatalogLogic;
import net.miatech.praxis.payment.dto.SPRCC001Filter;
import net.miatech.praxis.payment.dto.SPRCC002Filter;
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
@RequestMapping("/RejectedCodesCatalog")
@Scope("request")
public class RejectedCodesCatalogController {
    
    @Autowired
    private RejectedCodesCatalogLogic logic;
    
    @RequestMapping(value = "loadMain")
    public ResponseEntity<?> loadMain(SPRCC001Filter params) throws Exception {
        System.out.println("***** AccountingMaster - loadMain *****");
        SPRCC001Filter filter = logic.loadSPRCC001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "maintenance")
    public ResponseEntity<?> maintenance(@RequestBody SPRCC002Filter params) throws Exception {
        System.out.println("***** AccountingMaster - loadMain *****");
        logic.loadSPRCC002Filter(params);
        return ResponseUtils.create();
    }
}
