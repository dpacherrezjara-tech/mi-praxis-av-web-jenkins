package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.logic.payments.HeadersReportLogic;
import net.miatech.praxis.payment.dto.SPHRP001Filter;
import net.miatech.praxis.payment.dto.SPHRP002Filter;
import net.miatech.praxis.payment.dto.SPHRP003Filter;
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
@RequestMapping("/HeadersReport")
@Scope("request")
public class HeadersReportController {

    @Autowired
    private HeadersReportLogic logic;

    @RequestMapping(value = "loadHeaders")
    public ResponseEntity<?> loadHeaders(SPHRP001Filter params) throws Exception {
        System.out.println("***** HeadersReport - loadHeaders *****");
        SPHRP001Filter filter = logic.loadSPHRP001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadHeaderInfo")
    public ResponseEntity<?> loadHeaderInfo(SPHRP002Filter params) throws Exception {
        System.out.println("***** HeadersReport - loadHeaderInfo *****");
        SPHRP002Filter filter = logic.loadSPHRP002Filter(params);
        System.out.println("Header: " + filter.getIN_IDCONT());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "maintenanceHeader",method = RequestMethod.POST)
    public ResponseEntity<?> maintenanceHeader(@RequestBody SPHRP003Filter params) throws Exception {
        System.out.println("***** HeadersReport - maintenanceHeader *****");
        logic.loadSPHRP003Filter(params);
        return ResponseUtils.create();
    }
}
