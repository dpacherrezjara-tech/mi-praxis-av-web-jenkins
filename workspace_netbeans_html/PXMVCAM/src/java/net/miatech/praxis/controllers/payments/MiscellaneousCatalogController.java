package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.logic.payments.MiscellaneousCatalogLogic;
import net.miatech.praxis.payment.dto.SPMC001Filter;
import net.miatech.praxis.payment.dto.SPMC002Filter;
import net.miatech.praxis.payment.dto.SPMC003Filter;
import net.miatech.praxis.payment.dto.SPMC005Filter;
import net.miatech.praxis.payment.dto.SPMC008Filter;
import net.miatech.praxis.payment.dto.SPMC009Filter;
import net.miatech.praxis.payment.dto.SPMC010Filter;
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
@RequestMapping("/MiscellaneousCatalog")
@Scope("request")
public class MiscellaneousCatalogController {
    
    @Autowired
    private MiscellaneousCatalogLogic logic;
    
    @RequestMapping(value = "loadMdpFilters")
    public ResponseEntity<?> loadMdpFilters() throws Exception{
        System.out.println("***** MiscellaneousCatalog - loadMdpFilters *****");
        SPMC001Filter filter = logic.loadSPMC001Filter();
        System.out.println("Total Core Processors: " + filter.getPROCESADORES().size());
        System.out.println("Total Cias: " + filter.getPROCESADORES().size());
        System.out.println("Total Paises: " + filter.getPAISES().size());
        System.out.println("Total Monedas: " + filter.getMONEDAS().size());
        System.out.println("Total Procesadores: " + filter.getCODPRO().size());
        System.out.println("Total Bancos: " + filter.getCODEBANK().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadCodproFilter")
    public ResponseEntity<?> loadCodproFilter() throws Exception{
        System.out.println("***** MiscellaneousCatalog - loadCodproFilter *****");
        SPMC002Filter filter = logic.loadSPMC002Filter();
        System.out.println("Total processors: " + filter.getProcesadores().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadPhase2Filter")
    public ResponseEntity<?> loadPhase2Filter() throws Exception{
        System.out.println("***** MiscellaneousCatalog - loadPhase2Filter *****");
        SPMC003Filter filter = logic.loadSPMC003Filter();
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadAccountingProcs")
    public ResponseEntity<?> loadAccountingProcs() throws Exception{
        System.out.println("***** MiscellaneousCatalog - loadAccountingProcs *****");
        SPMC005Filter filter = logic.loadSPMC005Filter();
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    
    @RequestMapping(value = "loadMiscCatalog")
    public ResponseEntity<?> loadMiscCatalog(SPMC008Filter params) throws Exception{
        System.out.println("***** MiscellaneousCatalog - loadMiscCatalog *****");
        SPMC008Filter filter = logic.loadSPMC008Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadSingleInfo")
    public ResponseEntity<?> loadSingleInfo(SPMC010Filter params) throws Exception{
        System.out.println("***** MiscellaneousCatalog - loadSingleInfo *****");
        SPMC010Filter filter = logic.loadSPMC010Filter(params);
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "saveMiscCatalog")
    public ResponseEntity<?> saveMiscCatalog(@RequestBody SPMC009Filter params) throws Exception{
        System.out.println("***** MiscellaneousCatalog - saveMiscCatalog *****");
        logic.loadSPMC009Filter(params);
        return ResponseUtils.create();
    }
}
