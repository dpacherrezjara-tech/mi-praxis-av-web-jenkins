package net.miatech.praxis.controllers.payments;

import java.util.List;
import net.miatech.praxis.logic.payments.InputsPhase2Logic;
import net.miatech.praxis.payment.dto.CalendarPhase2;
import net.miatech.praxis.payment.dto.SPIL001Filter;
import net.miatech.praxis.payment.dto.SPIL002Filter;
import net.miatech.praxis.payment.dto.SPIL003Filter;
import net.miatech.praxis.payment.dto.SPIL004Filter;
import net.miatech.praxis.payment.dto.SPIL005Filter;
import net.miatech.praxis.payment.dto.SPIL006Filter;
import net.miatech.praxis.payment.dto.SPIL007Filter;
import net.miatech.praxis.payment.dto.SPMC002Filter;
import net.miatech.praxis.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author dvicente
 */
@Controller
@RequestMapping("/InputsPhase2")
@Scope("request")
public class InputsPhase2Controller {
    
    @Autowired
    private InputsPhase2Logic logic;
    
    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters() throws Exception{
        System.out.println("***** InputsPhase2 - loadFilters *****");
        SPMC002Filter filter = logic.loadSPMC002Filter();
        System.out.println("Procesadores: " + filter.getProcesadores().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "search")
    public ResponseEntity<?> search(@ModelAttribute SPIL001Filter params) throws Exception{
        System.out.println("***** InputsPhase2 - search *****");
        SPIL001Filter filter = logic.loadSPIL001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "searchCalendar")
    public ResponseEntity<?> searchCalendar(@ModelAttribute SPIL002Filter params) throws Exception{
        System.out.println("***** InputsPhase2 - searchCalendar *****");
        List<CalendarPhase2> filter = logic.loadSPIL002Filter(params);
        System.out.println("Total: " + filter.size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "searchCalendarDateInfo")
    public ResponseEntity<?> searchCalendarDateInfo(@ModelAttribute SPIL007Filter params) throws Exception{
        System.out.println("***** InputsPhase2 - searchCalendarDateInfo *****");
        SPIL007Filter filter = logic.loadSPIL007Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "searchLoaded")
    public ResponseEntity<?> searchLoaded(@ModelAttribute SPIL003Filter params) throws Exception{
        System.out.println("***** InputsPhase2 - searchLoaded *****");
        SPIL003Filter filter = logic.loadSPIL003Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "searchExonerated")
    public ResponseEntity<?> searchExonerated(@ModelAttribute SPIL004Filter params) throws Exception{
        System.out.println("***** InputsPhase2 - searchExonerated *****");
        SPIL004Filter filter = logic.loadSPIL004Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "searchFilesReceived")
    public ResponseEntity<?> searchFilesReceived(@ModelAttribute SPIL005Filter params) throws Exception{
        System.out.println("***** InputsPhase2 - searchFilesReceived *****");
        SPIL005Filter filter = logic.loadSPIL005Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "searchFileDelivery")
    public ResponseEntity<?> searchFileDelivery(@ModelAttribute SPIL006Filter params) throws Exception{
        System.out.println("***** InputsPhase2 - searchFileDelivery *****");
        SPIL006Filter filter = logic.loadSPIL006Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
}
